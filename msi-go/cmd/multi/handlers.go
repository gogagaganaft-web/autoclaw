package main

import (
	"context"
	"database/sql"
	"encoding/json"
	"errors"
	"fmt"
	"log"
	"net/http"
	"os"
	"sort"
	"strconv"
	"strings"
	"time"

	"github.com/gin-gonic/gin"
	"goreport/internal/database"
	"goreport/internal/export"
)

func tableName(token string) string {
	return "#gr_" + token
}

// StringList РїСЂРёРЅРёРјР°РµС‚ JSON-Р·РЅР°С‡РµРЅРёРµ РєР°Рє СЃС‚СЂРѕРєСѓ РёР»Рё РјР°СЃСЃРёРІ СЃС‚СЂРѕРє.
type StringList []string

func (s *StringList) UnmarshalJSON(b []byte) error {
	var arr []string
	if err := json.Unmarshal(b, &arr); err == nil {
		*s = arr
		return nil
	}
	var str string
	if err := json.Unmarshal(b, &str); err == nil {
		*s = []string{str}
		return nil
	}
	return errors.New("dbNames must be a string or an array of strings")
}

type InitRequest struct {
	DBNames    StringList `json:"dbNames"`
	SQL        string     `json:"sql"`
	ReportName string     `json:"reportName"`
	RequestID  string     `json:"requestId"`
}

func reportInitHandler(c *gin.Context) {
	var req InitRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if len(req.DBNames) == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "dbNames is required"})
		return
	}
	if strings.TrimSpace(req.SQL) == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "sql is required"})
		return
	}
	// Страж: пользовательский SQL отчёта не меняет схему stack и не пишет
	// никуда, кроме dbo и #временных таблиц (внутренние temp-таблицы службы
	// создаются её собственным кодом и стражем не затрагиваются).
	if err := database.GuardStackReadOnly(req.SQL); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	token, err := generateToken()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to generate token"})
		return
	}

	requestID := strings.TrimSpace(req.RequestID)
	if requestID == "" || len(requestID) < 8 {
		if t, err := generateToken(); err == nil {
			requestID = t
		} else {
			requestID = fmt.Sprintf("r%d", time.Now().UnixNano())
		}
	}
	initProg := newInitProgress(requestID, req.DBNames)
	defer initProg.setDone()

	ctx := c.Request.Context()
	sess := &Session{
		Token:      token,
		DBs:        req.DBNames,
		ByDB:       make(map[string]*DBSession, len(req.DBNames)),
		CreatedAt:  time.Now(),
		LastAccess: time.Now(),
	}

	dbTimeoutSec := 600
	if v := os.Getenv("INIT_DB_TIMEOUT_SECONDS"); v != "" {
		if n, err := strconv.Atoi(v); err == nil && n > 0 {
			dbTimeoutSec = n
		}
	}
	dbTimeout := time.Duration(dbTimeoutSec) * time.Second

	type dbResult struct {
		dbName string
		err    string
	}
	results := make(chan dbResult, len(req.DBNames))

	for _, dbName := range req.DBNames {
		go func(dbName string) {
			dbCtx, cancel := context.WithTimeout(ctx, dbTimeout)
			defer cancel()
			r := dbResult{dbName: dbName}
			defer func() { results <- r }()
			defer func() {
				if r.err != "" {
					initProg.setState(dbName, "error", 0, r.err)
				}
			}()

			held, err := database.OpenHeldConn(dbCtx, dbName)
			if err != nil {
				if dbCtx.Err() == context.DeadlineExceeded {
					r.err = "timeout: БД не ответила за " + dbTimeout.String()
					return
				}
				r.err = "connect: " + err.Error()
				return
			}
			keep := false
			defer func() {
				if !keep {
					held.Close()
				}
			}()

			initProg.setState(dbName, "exec", 0, "")

			const setup = "SET LANGUAGE Russian; SET DATEFORMAT ymd; SET NOCOUNT ON; "
			tr, err := transformFinalSelect(req.SQL, tableName(token), req.ReportName, database.GetDBDisplayName(dbName))
			if err != nil {
				r.err = err.Error()
				return
			}

			var count int64
			var cols []string
			if tr.Exec != nil {
				stmt := tr.Exec.Stmt
				if strings.TrimSpace(tr.Batch) != "" {
					stmt = tr.Batch + ";" + tr.Exec.Stmt
				}
				cols, count, err = execToTempTable(dbCtx, held.Conn, setup+stmt, tableName(token), req.ReportName, database.GetDBDisplayName(dbName))
				if err != nil {
					if dbCtx.Err() == context.DeadlineExceeded {
						r.err = "timeout: БД не ответила за " + dbTimeout.String()
						return
					}
					r.err = err.Error()
					return
				}
			} else {
				if _, err := held.Conn.ExecContext(dbCtx, setup+tr.Batch); err != nil {
					if dbCtx.Err() == context.DeadlineExceeded {
						r.err = "timeout: БД не ответила за " + dbTimeout.String()
						return
					}
					r.err = "exec: " + err.Error()
					return
				}
				if err := held.Conn.QueryRowContext(dbCtx, "SELECT COUNT(*) FROM "+tableName(token)).Scan(&count); err != nil {
					if dbCtx.Err() == context.DeadlineExceeded {
						r.err = "timeout: БД не ответила за " + dbTimeout.String()
						return
					}
					r.err = "count: " + err.Error()
					return
				}
				cols, err = tableColumns(dbCtx, held.Conn, tableName(token))
				if err != nil {
					if dbCtx.Err() == context.DeadlineExceeded {
						r.err = "timeout: БД не ответила за " + dbTimeout.String()
						return
					}
					r.err = "columns: " + err.Error()
					return
				}
			}

			initProg.setState(dbName, "rows", count, "")

			_, colTypes, terr := tableColumnTypes(dbCtx, held.Conn, tableName(token))
			if terr != nil {
				colTypes = nil
			}

			sessionsMu.Lock()
			sess.ByDB[dbName] = &DBSession{Held: held, Count: count, Cols: cols, ColTypes: colTypes}
			sessionsMu.Unlock()
			keep = true
			initProg.setState(dbName, "ok", count, "")
		}(dbName)
	}

	var errs []string
	for range req.DBNames {
		r := <-results
		if r.err != "" {
			errs = append(errs, r.dbName+": "+r.err)
		}
	}
	if len(errs) == len(req.DBNames) {
		go closeSession(sess)
		c.JSON(http.StatusInternalServerError, gin.H{"error": strings.Join(errs, "\n")})
		return
	}

	var totalRows int64
	dbStats := make([]gin.H, 0, len(req.DBNames))
	var columns []string
	var columnTypes map[string]string
	for _, dbName := range req.DBNames {
		dbSess := sess.ByDB[dbName]
		if dbSess != nil {
			totalRows += dbSess.Count
			dbStats = append(dbStats, gin.H{"db": dbName, "rows": dbSess.Count})
			if len(columns) == 0 {
				columns = dbSess.Cols
				columnTypes = dbSess.ColTypes
			}
		}
	}

	sessionsMu.Lock()
	sess.Columns = columns
	sess.ColumnTypes = columnTypes
	sess.TotalRows = totalRows
	sessions[token] = sess
	sessionsMu.Unlock()

	log.Printf("Report init: token=%s, DBs=%d/%d, columns=%d, totalRows=%d",
		token[:8]+"...", len(sess.ByDB), len(req.DBNames), len(sess.Columns), totalRows)

	resp := gin.H{
		"token":     token,
		"columns":   sess.Columns,
		"totalRows": totalRows,
		"dbStats":   dbStats,
	}
	if len(errs) > 0 {
		resp["errors"] = errs
		resp["ok"] = len(sess.ByDB)
		resp["total"] = len(req.DBNames)
	}
	c.JSON(http.StatusOK, resp)
}

func tableColumns(ctx context.Context, conn *sql.Conn, table string) ([]string, error) {
	rows, err := conn.QueryContext(ctx, "SELECT TOP 0 * FROM "+table)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	return rows.Columns()
}

// tableColumnTypes возвращает имена колонок temp-таблицы и их SQL-типы
// (DatabaseTypeName). Нужно для выбора правильного выражения groupInterval.
func tableColumnTypes(ctx context.Context, conn *sql.Conn, table string) ([]string, map[string]string, error) {
	rows, err := conn.QueryContext(ctx, "SELECT TOP 0 * FROM "+table)
	if err != nil {
		return nil, nil, err
	}
	defer rows.Close()
	names, err := rows.Columns()
	if err != nil {
		return nil, nil, err
	}
	cts, err := rows.ColumnTypes()
	if err != nil {
		return nil, nil, err
	}
	types := make(map[string]string, len(names))
	for i, n := range names {
		if i < len(cts) {
			types[n] = cts[i].DatabaseTypeName()
		}
	}
	return names, types, nil
}

// columnKind классифицирует SQL-тип колонки: date | number | string.
func columnKind(typeName string) string {
	switch strings.ToUpper(strings.TrimSpace(typeName)) {
	case "DATETIME", "DATE", "DATETIME2", "SMALLDATETIME", "TIME", "DATETIMEOFFSET":
		return "date"
	case "INT", "INT IDENTITY", "BIGINT", "SMALLINT", "TINYINT", "FLOAT", "REAL",
		"DECIMAL", "NUMERIC", "MONEY", "SMALLMONEY":
		return "number"
	case "CHAR", "VARCHAR", "NCHAR", "NVARCHAR", "TEXT", "NTEXT", "UNIQUEIDENTIFIER":
		return "string"
	}
	return ""
}

// groupIntervalExpr возвращает SQL-выражение значения группы для поля свода.
//   - строковый интервал ("year"/"quarter"/"month"/"week"/"day"/"hour"/"minute"/"second")
//     применяется к датовым колонкам (начало периода);
//   - числовой интервал N>0 для числовых колонок — округление вниз до кратного N,
//     для строковых — первые N символов;
//   - иначе — исходный столбец.
func groupIntervalExpr(selector string, raw json.RawMessage, kind string) string {
	col := "[" + selector + "]"
	s := strings.TrimSpace(string(raw))
	if s == "" || s == "null" {
		return col
	}
	if raw[0] == '"' {
		var kw string
		if json.Unmarshal(raw, &kw) != nil {
			return col
		}
		if kind == "date" {
			switch strings.ToLower(strings.TrimSpace(kw)) {
			case "year":
				return "DATEADD(year, DATEDIFF(year, 0, " + col + "), 0)"
			case "quarter":
				return "DATEADD(quarter, DATEDIFF(quarter, 0, " + col + "), 0)"
			case "month":
				return "DATEADD(month, DATEDIFF(month, 0, " + col + "), 0)"
			case "week": // начало недели — понедельник, независимо от DATEFIRST
				return "DATEADD(day, -((DATEDIFF(day, '19000101', " + col + ")) % 7), CAST(" + col + " AS date))"
			case "day":
				return "CAST(" + col + " AS date)"
			case "hour":
				return "DATEADD(hour, DATEDIFF(hour, 0, " + col + "), 0)"
			case "minute":
				return "DATEADD(minute, DATEDIFF(minute, 0, " + col + "), 0)"
			case "second":
				return "DATEADD(second, DATEDIFF(second, 0, " + col + "), 0)"
			}
		}
		return col
	}
	var n float64
	if json.Unmarshal(raw, &n) == nil && n > 0 {
		ns := strconv.FormatFloat(n, 'f', -1, 64)
		switch kind {
		case "number":
			return "FLOOR(CAST(" + col + " AS float) / " + ns + ") * " + ns
		case "string":
			return "LEFT(" + col + ", " + ns + ")"
		}
	}
	return col
}

// ruMonthsGen — русские месяцы (родительный падеж, как отдаёт CLDR/DevExpress).
var ruMonthsGen = []string{
	"января", "февраля", "марта", "апреля", "мая", "июня",
	"июля", "августа", "сентября", "октября", "ноября", "декабря",
}

// groupIntervalKeyword возвращает ключевое слово датового интервала поля
// (только если колонка действительно датовая), иначе "".
func groupIntervalKeyword(g PivotGroupField, kind string) string {
	if kind != "date" || len(g.GroupInterval) == 0 || g.GroupInterval[0] != '"' {
		return ""
	}
	var kw string
	if json.Unmarshal(g.GroupInterval, &kw) != nil {
		return ""
	}
	switch strings.ToLower(strings.TrimSpace(kw)) {
	case "year", "quarter", "month", "week", "day", "hour", "minute", "second":
		return strings.ToLower(strings.TrimSpace(kw))
	}
	return ""
}

// formatGroupDisplay формирует подпись узла свода для датового интервала
// (DevExpress в remote-режиме берёт её из node.displayText).
func formatGroupDisplay(v interface{}, keyword string) interface{} {
	t, ok := v.(time.Time)
	if !ok || keyword == "" {
		return nil
	}
	switch keyword {
	case "year":
		return t.Format("2006")
	case "quarter":
		return fmt.Sprintf("Q%d", (int(t.Month())-1)/3+1)
	case "month":
		return ruMonthsGen[int(t.Month())-1]
	case "week":
		// t — понедельник ISO-недели; подпись "пп.ММ–пп.ММ" (как на клиенте).
		end := t.AddDate(0, 0, 6)
		return t.Format("02.01") + "\u2013" + end.Format("02.01")
	case "day":
		return t.Format("02.01.2006")
	case "hour", "minute", "second":
		return t.Format("15:04:05")
	}
	return nil
}

// pivotSelectGroup — готовая группа (имя выходной колонки + SQL-выражение).
type pivotSelectGroup struct {
	name string
	expr string
}

// buildPivotGroups собирает группы из полей запроса с проверкой колонок.
func buildPivotGroups(fields []PivotGroupField, cols map[string]bool, types map[string]string) ([]pivotSelectGroup, error) {
	groups := make([]pivotSelectGroup, 0, len(fields))
	used := map[string]int{}
	for _, g := range fields {
		if g.Selector == "" || !cols[g.Selector] {
			return nil, fmt.Errorf("unknown group column %q", g.Selector)
		}
		name := g.Selector
		if used[name] > 0 {
			name = fmt.Sprintf("%s_%d", g.Selector, used[g.Selector]+1)
		}
		used[g.Selector]++
		groups = append(groups, pivotSelectGroup{
			name: name,
			expr: groupIntervalExpr(g.Selector, g.GroupInterval, columnKind(types[g.Selector])),
		})
	}
	return groups, nil
}

// ---------- pivot (DevExpress RemoteStore protocol) ----------

type PivotGroupField struct {
	Selector      string          `json:"selector"`
	GroupInterval json.RawMessage `json:"groupInterval"` // строка ("year"/"quarter"/...) или число (10, 100)
	Desc          bool            `json:"desc"`
	IsExpanded    bool            `json:"isExpanded"`
}

type PivotSummaryField struct {
	Selector    string `json:"selector"`
	SummaryType string `json:"summaryType"`
}

type PivotRequest struct {
	Token             string              `json:"token"`
	Group             []PivotGroupField   `json:"group"`
	GroupSummary      []PivotSummaryField `json:"groupSummary"`
	TotalSummary      []PivotSummaryField `json:"totalSummary"`
	Filter            interface{}         `json:"filter"`
	Skip              int                 `json:"skip"`
	Take              int                 `json:"take"`
	RequireGroupCount bool                `json:"requireGroupCount"`
}

type pivotAgg struct {
	field  string
	kind   string
	colPos int
	cntPos int
}

var filterOps = map[string]bool{
	"=": true, "<>": true, "!=": true,
	"<": true, "<=": true, ">": true, ">=": true,
	"contains": true, "notcontains": true, "startswith": true, "endswith": true,
	"anyof": true, "notanyof": true, "between": true,
	"isblank": true, "isnotblank": true,
}

func quoteSQLValue(v interface{}) (string, bool) {
	switch t := v.(type) {
	case nil:
		return "NULL", true
	case string:
		return "'" + strings.ReplaceAll(t, "'", "''") + "'", true
	case float64:
		return strconv.FormatFloat(t, 'f', -1, 64), true
	case bool:
		if t {
			return "1", true
		}
		return "0", true
	default:
		return "", false
	}
}

func filterLeaf(arr []interface{}, cols map[string]bool) (string, error) {
	field, ok := arr[0].(string)
	if !ok {
		return "", errors.New("pivot: invalid filter field")
	}
	if !cols[field] {
		return "", fmt.Errorf("pivot: unknown filter column %q", field)
	}
	op, ok := arr[1].(string)
	if !ok {
		return "", errors.New("pivot: invalid filter operator")
	}
	q := "[" + field + "]"
	switch op {
	case "=", "<>", "!=":
		sqlOp := op
		if sqlOp == "!=" {
			sqlOp = "<>"
		}
		if arr[2] == nil {
			if sqlOp == "=" {
				return q + " IS NULL", nil
			}
			return q + " IS NOT NULL", nil
		}
		s, ok := quoteSQLValue(arr[2])
		if !ok {
			return "", errors.New("pivot: unsupported filter value")
		}
		return q + " " + sqlOp + " " + s, nil
	case "<", "<=", ">", ">=":
		s, ok := quoteSQLValue(arr[2])
		if !ok {
			return "", errors.New("pivot: unsupported filter value")
		}
		return q + " " + op + " " + s, nil
	case "anyof", "notanyof":
		vals, ok := arr[2].([]interface{})
		if !ok || len(vals) == 0 {
			if op == "anyof" {
				return "1=0", nil
			}
			return "1=1", nil
		}
		parts := make([]string, 0, len(vals))
		hasNull := false
		for _, v := range vals {
			if v == nil {
				hasNull = true
				continue
			}
			if s, ok := quoteSQLValue(v); ok {
				parts = append(parts, s)
			}
		}
		clause := q + " IN (" + strings.Join(parts, ", ") + ")"
		if hasNull {
			clause = "(" + clause + " OR " + q + " IS NULL)"
		}
		if op == "notanyof" {
			clause = "(NOT " + clause + ")"
		}
		return clause, nil
	case "contains", "notcontains", "startswith", "endswith":
		s, ok := arr[2].(string)
		if !ok {
			return "1=1", nil
		}
		s = strings.ReplaceAll(s, "'", "''")
		s = strings.ReplaceAll(s, "%", "[%]")
		s = strings.ReplaceAll(s, "_", "[_]")
		var like string
		switch op {
		case "contains":
			like = "%" + s + "%"
		case "notcontains":
			like = "%" + s + "%"
		case "startswith":
			like = s + "%"
		case "endswith":
			like = "%" + s
		}
		clause := q + " LIKE '" + like + "'"
		if op == "notcontains" {
			clause = "(NOT " + clause + ")"
		}
		return clause, nil
	case "between":
		vals, ok := arr[2].([]interface{})
		if !ok || len(vals) != 2 {
			return "", errors.New("pivot: between requires 2 values")
		}
		a, ok1 := quoteSQLValue(vals[0])
		b, ok2 := quoteSQLValue(vals[1])
		if !ok1 || !ok2 {
			return "", errors.New("pivot: unsupported between values")
		}
		return "(" + q + " >= " + a + " AND " + q + " <= " + b + ")", nil
	case "isblank":
		return "(" + q + " IS NULL OR " + q + " = '')", nil
	case "isnotblank":
		return "(" + q + " IS NOT NULL AND " + q + " <> '')", nil
	}
	return "", fmt.Errorf("pivot: unsupported filter operator %q", op)
}

// parseFilter вЂ” СЂРµРєСѓСЂСЃРёРІРЅС‹Р№ СЂР°Р·Р±РѕСЂ РІС‹СЂР°Р¶РµРЅРёСЏ С„РёР»СЊС‚СЂР° DevExpress.
func parseFilter(expr interface{}, cols map[string]bool) (string, error) {
	arr, ok := expr.([]interface{})
	if !ok || len(arr) == 0 {
		return "", errors.New("pivot: invalid filter expression")
	}
	if len(arr) == 2 {
		if s, ok := arr[0].(string); ok && s == "!" {
			inner, err := parseFilter(arr[1], cols)
			if err != nil {
				return "", err
			}
			return "(NOT (" + inner + "))", nil
		}
	}
	if len(arr) == 3 {
		if s, ok := arr[1].(string); ok && filterOps[s] {
			return filterLeaf(arr, cols)
		}
	}
	var out string
	connector := ""
	i := 0
	for i < len(arr) {
		if i > 0 {
			if i+1 >= len(arr) {
				return "", errors.New("pivot: invalid filter expression")
			}
			cs, ok := arr[i].(string)
			if !ok || (cs != "and" && cs != "or") {
				return "", errors.New("pivot: unsupported filter connector")
			}
			connector = " " + strings.ToUpper(cs) + " "
			i++
		}
		part, err := parseFilter(arr[i], cols)
		if err != nil {
			return "", err
		}
		if out == "" {
			out = part
		} else {
			out = "(" + out + ")" + connector + "(" + part + ")"
		}
		i++
	}
	return out, nil
}

func buildPivotSelect(groups []pivotSelectGroup, specs []PivotSummaryField) (sel, colNames []string, aggs []pivotAgg, err error) {
	for _, g := range groups {
		sel = append(sel, g.expr+" AS ["+g.name+"]")
		colNames = append(colNames, g.name)
	}
	for _, f := range specs {
		kind := strings.ToLower(f.SummaryType)
		if kind == "" {
			kind = "sum"
		}
		pos := len(colNames)
		switch kind {
		case "count":
			sel = append(sel, "COUNT(*) AS ["+f.Selector+"]")
			colNames = append(colNames, f.Selector)
			aggs = append(aggs, pivotAgg{field: f.Selector, kind: "count", colPos: pos, cntPos: -1})
		case "sum", "min", "max":
			sel = append(sel, strings.ToUpper(kind)+"(["+f.Selector+"]) AS ["+f.Selector+"]")
			colNames = append(colNames, f.Selector)
			aggs = append(aggs, pivotAgg{field: f.Selector, kind: kind, colPos: pos, cntPos: -1})
		case "avg":
			sel = append(sel, "SUM(["+f.Selector+"]) AS ["+f.Selector+"]")
			colNames = append(colNames, f.Selector)
			cntPos := len(colNames)
			sel = append(sel, "COUNT(*) AS [__cnt_"+f.Selector+"]")
			colNames = append(colNames, "__cnt_"+f.Selector)
			aggs = append(aggs, pivotAgg{field: f.Selector, kind: "avg", colPos: pos, cntPos: cntPos})
		default:
			return nil, nil, nil, fmt.Errorf("pivot: unsupported summaryType %q", f.SummaryType)
		}
	}
	return sel, colNames, aggs, nil
}

type pivotCell struct {
	groupVals []interface{}
	sums      map[string]float64
	cnts      map[string]float64
	mins      map[string]float64
	maxs      map[string]float64
}

func newPivotCell(groupVals []interface{}) *pivotCell {
	return &pivotCell{
		groupVals: groupVals,
		sums:      make(map[string]float64),
		cnts:      make(map[string]float64),
		mins:      make(map[string]float64),
		maxs:      make(map[string]float64),
	}
}

func addPivotCell(dst, src *pivotCell, aggs []pivotAgg) {
	for _, ag := range aggs {
		switch ag.kind {
		case "count", "sum":
			dst.sums[ag.field] += src.sums[ag.field]
		case "avg":
			dst.sums[ag.field] += src.sums[ag.field]
			dst.cnts[ag.field] += src.cnts[ag.field]
		case "min":
			if v, seen := src.mins[ag.field]; seen {
				if m, ok := dst.mins[ag.field]; !ok || v < m {
					dst.mins[ag.field] = v
				}
			}
		case "max":
			if v, seen := src.maxs[ag.field]; seen {
				if m, ok := dst.maxs[ag.field]; !ok || v > m {
					dst.maxs[ag.field] = v
				}
			}
		}
	}
}

func cellFromRow(row []interface{}, groupVals []interface{}, aggs []pivotAgg) *pivotCell {
	c := newPivotCell(groupVals)
	for _, ag := range aggs {
		if ag.colPos >= len(row) {
			continue
		}
		raw, has := asFloat(row[ag.colPos])
		if !has {
			continue
		}
		switch ag.kind {
		case "count", "sum":
			c.sums[ag.field] += raw
		case "avg":
			c.sums[ag.field] += raw
			if ag.cntPos >= 0 && ag.cntPos < len(row) {
				if cnt, ok := asFloat(row[ag.cntPos]); ok {
					c.cnts[ag.field] += cnt
				}
			}
		case "min":
			if _, seen := c.mins[ag.field]; !seen || raw < c.mins[ag.field] {
				c.mins[ag.field] = raw
			}
		case "max":
			if _, seen := c.maxs[ag.field]; !seen || raw > c.maxs[ag.field] {
				c.maxs[ag.field] = raw
			}
		}
	}
	return c
}

func pivotValue(c *pivotCell, ag pivotAgg) interface{} {
	switch ag.kind {
	case "avg":
		if c.cnts[ag.field] > 0 {
			return c.sums[ag.field] / c.cnts[ag.field]
		}
		return nil
	case "min":
		return c.mins[ag.field]
	case "max":
		return c.maxs[ag.field]
	default:
		return c.sums[ag.field]
	}
}

func compareVal(a, b interface{}) int {
	af, aok := asFloat(a)
	bf, bok := asFloat(b)
	if aok && bok {
		if af < bf {
			return -1
		}
		if af > bf {
			return 1
		}
		return 0
	}
	as, aok2 := a.(string)
	bs, bok2 := b.(string)
	if aok2 && bok2 {
		return strings.Compare(as, bs)
	}
	return strings.Compare(fmtVal(a), fmtVal(b))
}

type pivotNode struct {
	Key         interface{}   `json:"key"`
	DisplayText interface{}   `json:"displayText,omitempty"`
	Summary     []interface{} `json:"summary,omitempty"`
	Items       []*pivotNode  `json:"items,omitempty"`
}

func pivotKey(v interface{}) interface{} {
	if t, ok := v.(time.Time); ok {
		if t.Hour() == 0 && t.Minute() == 0 && t.Second() == 0 {
			return t.Format("2006-01-02")
		}
		return t.Format("2006-01-02 15:04:05")
	}
	return v
}

func cellSummaries(c *pivotCell, aggs []pivotAgg) []interface{} {
	out := make([]interface{}, len(aggs))
	for i, ag := range aggs {
		out[i] = pivotValue(c, ag)
	}
	return out
}

func buildPivotNodes(cells []*pivotCell, level int, selectors []string, aggs []pivotAgg, intervals []string) []*pivotNode {
	if len(selectors) == 0 || level >= len(selectors) {
		nodes := make([]*pivotNode, 0, len(cells))
		for _, c := range cells {
			nodes = append(nodes, &pivotNode{Summary: cellSummaries(c, aggs)})
		}
		return nodes
	}
	var nodes []*pivotNode
	i := 0
	for i < len(cells) {
		j := i
		for j < len(cells) && fmtVal(cells[j].groupVals[level]) == fmtVal(cells[i].groupVals[level]) {
			j++
		}
		group := cells[i:j]
		node := &pivotNode{Key: pivotKey(cells[i].groupVals[level])}
		if level < len(intervals) {
			node.DisplayText = formatGroupDisplay(cells[i].groupVals[level], intervals[level])
		}
		if level == len(selectors)-1 {
			node.Summary = cellSummaries(group[0], aggs)
		} else {
			node.Items = buildPivotNodes(group, level+1, selectors, aggs, intervals)
			agg := newPivotCell(nil)
			for _, c := range group {
				addPivotCell(agg, c, aggs)
			}
			node.Summary = cellSummaries(agg, aggs)
		}
		nodes = append(nodes, node)
		i = j
	}
	return nodes
}

func reportPivotHandler(c *gin.Context) {
	var req PivotRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	sess, ok := getSession(req.Token)
	if !ok {
		c.JSON(http.StatusNotFound, gin.H{"error": "Session not found or expired"})
		return
	}

	cols := make(map[string]bool, len(sess.Columns))
	for _, col := range sess.Columns {
		cols[col] = true
	}

	var where string
	if req.Filter != nil {
		w, err := parseFilter(req.Filter, cols)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		where = w
	}

	groups, err := buildPivotGroups(req.Group, cols, sess.ColumnTypes)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "pivot: " + err.Error()})
		return
	}
	selectors := make([]string, len(groups))
	intervals := make([]string, len(groups))
	for i, g := range groups {
		selectors[i] = g.name
		if i < len(req.Group) {
			intervals[i] = groupIntervalKeyword(req.Group[i], columnKind(sess.ColumnTypes[req.Group[i].Selector]))
		}
	}
	for _, f := range req.GroupSummary {
		if f.Selector == "" || !cols[f.Selector] {
			c.JSON(http.StatusBadRequest, gin.H{"error": fmt.Sprintf("pivot: unknown summary column %q", f.Selector)})
			return
		}
	}
	for _, f := range req.TotalSummary {
		if f.Selector == "" || !cols[f.Selector] {
			c.JSON(http.StatusBadRequest, gin.H{"error": fmt.Sprintf("pivot: unknown summary column %q", f.Selector)})
			return
		}
	}

	// Р Р°Р·РІРµРґРєР° РїРѕР»РµР№ / СЃС‹СЂР°СЏ СЃС‚СЂР°РЅРёС†Р° (Р·Р°РїСЂРѕСЃ Р±РµР· group Рё groupSummary)
	if len(selectors) == 0 && len(req.GroupSummary) == 0 {
		take := req.Take
		if take <= 0 {
			take = 20
		}
		rows, total, err := fetchPage(c.Request.Context(), sess, where, int64(req.Skip), int64(take))
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		out := make([]map[string]interface{}, 0, len(rows))
		for _, row := range rows {
			obj := make(map[string]interface{}, len(sess.Columns))
			for i, col := range sess.Columns {
				if i < len(row) {
					obj[col] = row[i]
				}
			}
			out = append(out, obj)
		}
		resp := gin.H{"data": out, "totalCount": total}
		if req.RequireGroupCount {
			resp["groupCount"] = total
		}
		c.JSON(http.StatusOK, resp)
		return
	}

	sel, colNames, aggs, err := buildPivotSelect(groups, req.GroupSummary)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	var summaryAggs []pivotAgg
	var summarySel []string
	var summaryCols []string
	var hasSummary bool
	if len(req.TotalSummary) > 0 {
		summarySel, summaryCols, summaryAggs, err = buildPivotSelect(nil, req.TotalSummary)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		hasSummary = true
	}

	table := tableName(req.Token)
	query := "SELECT " + strings.Join(sel, ", ") + " FROM " + table
	if where != "" {
		query += " WHERE " + where
	}
	if len(groups) > 0 {
		gb := make([]string, len(groups))
		for i, g := range groups {
			gb[i] = g.expr
		}
		query += " GROUP BY " + strings.Join(gb, ", ") + " ORDER BY " + strings.Join(gb, ", ")
	}

	summaryQuery := ""
	if hasSummary {
		summaryQuery = "SELECT " + strings.Join(summarySel, ", ") + " FROM " + table
		if where != "" {
			summaryQuery += " WHERE " + where
		}
	}

	ctx := c.Request.Context()
	type pivotDBResult struct {
		dbName  string
		cells   []*pivotCell
		summary *pivotCell
		err     string
	}
	results := make(chan pivotDBResult, len(sess.ByDB))

	for dbName, dbSess := range sess.ByDB {
		go func(dbName string, dbSess *DBSession) {
			r := pivotDBResult{dbName: dbName}
			defer func() { results <- r }()

			rows, unlock, err := dbSess.query(ctx, query)
			if err != nil {
				r.err = err.Error()
				return
			}
			vals, err := database.ScanAllRows(rows, colNames)
			rows.Close()
			unlock()
			if err != nil {
				r.err = err.Error()
				return
			}
			for _, row := range vals {
				gv := make([]interface{}, len(selectors))
				for i := range selectors {
					gv[i] = row[i]
				}
				r.cells = append(r.cells, cellFromRow(row, gv, aggs))
			}

			if hasSummary {
				srows, unlock, err := dbSess.query(ctx, summaryQuery)
				if err != nil {
					r.err = err.Error()
					return
				}
				svals, err := database.ScanAllRows(srows, summaryCols)
				srows.Close()
				unlock()
				if err != nil {
					r.err = err.Error()
					return
				}
				if len(svals) > 0 {
					r.summary = cellFromRow(svals[0], nil, summaryAggs)
				} else {
					r.summary = newPivotCell(nil)
				}
			}
		}(dbName, dbSess)
	}

	merged := map[string]*pivotCell{}
	var summary *pivotCell
	var errs []string
	for range sess.ByDB {
		r := <-results
		if r.err != "" {
			errs = append(errs, r.dbName+": "+r.err)
			continue
		}
		for _, cell := range r.cells {
			key := ""
			for _, v := range cell.groupVals {
				key += fmtVal(v) + "\x00"
			}
			existing, ok := merged[key]
			if !ok {
				merged[key] = cell
				continue
			}
			addPivotCell(existing, cell, aggs)
		}
		if r.summary != nil {
			if summary == nil {
				summary = r.summary
			} else {
				addPivotCell(summary, r.summary, summaryAggs)
			}
		}
	}
	if len(errs) > 0 {
		c.JSON(http.StatusInternalServerError, gin.H{"error": strings.Join(errs, "\n")})
		return
	}

	cells := make([]*pivotCell, 0, len(merged))
	for _, cell := range merged {
		cells = append(cells, cell)
	}
	sort.SliceStable(cells, func(i, j int) bool {
		for k := range selectors {
			cmp := compareVal(cells[i].groupVals[k], cells[j].groupVals[k])
			if cmp != 0 {
				return cmp < 0
			}
		}
		return false
	})

	nodes := buildPivotNodes(cells, 0, selectors, aggs, intervals)
	groupCount := len(nodes)
	if req.Take > 0 {
		start := req.Skip
		if start > len(nodes) {
			start = len(nodes)
		}
		end := start + req.Take
		if end > len(nodes) {
			end = len(nodes)
		}
		nodes = nodes[start:end]
	}

	resp := gin.H{
		"data":       nodes,
		"totalCount": groupCount,
	}
	if req.RequireGroupCount {
		resp["groupCount"] = groupCount
	}
	if hasSummary {
		sumArr := make([]interface{}, 0, len(summaryAggs))
		if summary == nil {
			summary = newPivotCell(nil)
		}
		for _, ag := range summaryAggs {
			sumArr = append(sumArr, pivotValue(summary, ag))
		}
		resp["summary"] = sumArr
	}

	c.JSON(http.StatusOK, resp)
}

func fmtVal(v interface{}) string {
	switch t := v.(type) {
	case nil:
		return "NULL"
	case float64:
		return strconv.FormatFloat(t, 'f', -1, 64)
	case int64:
		return strconv.FormatInt(t, 10)
	case bool:
		return strconv.FormatBool(t)
	case time.Time:
		return t.Format("2006-01-02 15:04:05")
	default:
		return fmt.Sprintf("%v", v)
	}
}

func asFloat(v interface{}) (float64, bool) {
	switch t := v.(type) {
	case nil:
		return 0, false
	case int64:
		return float64(t), true
	case float64:
		return t, true
	case string:
		f, err := strconv.ParseFloat(strings.TrimSpace(t), 64)
		return f, err == nil
	default:
		return 0, false
	}
}

// ---------- page (РѕР±С‰Р°СЏ РІС‹Р±РѕСЂРєР°) ----------

// ---------- pivot count (aggregated pivot size) ----------

type PivotCountRequest struct {
	Token        string            `json:"token"`
	Group        []PivotGroupField `json:"group"`
	GroupColumns []PivotGroupField `json:"groupColumns"`
	Filter       interface{}       `json:"filter"`
}

// countDistinctCombos returns the number of unique value combinations of
// selectors across all DBs of the session (respecting the optional WHERE).
func countDistinctCombos(ctx context.Context, sess *Session, groups []pivotSelectGroup, where string) (int64, error) {
	table := tableName(sess.Token)
	sel := make([]string, len(groups))
	names := make([]string, len(groups))
	for i, g := range groups {
		sel[i] = g.expr + " AS [" + g.name + "]"
		names[i] = g.name
	}
	query := "SELECT DISTINCT " + strings.Join(sel, ", ") + " FROM " + table
	if where != "" {
		query += " WHERE " + where
	}

	type cResult struct {
		dbName string
		keys   map[string]bool
		err    string
	}
	results := make(chan cResult, len(sess.ByDB))
	for dbName, dbSess := range sess.ByDB {
		go func(dbName string, dbSess *DBSession) {
			r := cResult{dbName: dbName, keys: map[string]bool{}}
			defer func() { results <- r }()
			rows, unlock, err := dbSess.query(ctx, query)
			if err != nil {
				r.err = err.Error()
				return
			}
			vals, err := database.ScanAllRows(rows, names)
			rows.Close()
			unlock()
			if err != nil {
				r.err = err.Error()
				return
			}
			for _, row := range vals {
				key := ""
				for i, v := range row {
					if i > 0 {
						key += "\x00"
					}
					key += fmtVal(v)
				}
				r.keys[key] = true
			}
		}(dbName, dbSess)
	}

	unique := map[string]bool{}
	var errs []string
	for range sess.ByDB {
		r := <-results
		if r.err != "" {
			errs = append(errs, r.dbName+": "+r.err)
			continue
		}
		for k := range r.keys {
			unique[k] = true
		}
	}
	if len(errs) > 0 {
		return 0, errors.New(strings.Join(errs, "\n"))
	}
	return int64(len(unique)), nil
}

func reportPivotCountHandler(c *gin.Context) {
	var req PivotCountRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	sess, ok := getSession(req.Token)
	if !ok {
		c.JSON(http.StatusNotFound, gin.H{"error": "Session not found or expired"})
		return
	}

	cols := make(map[string]bool, len(sess.Columns))
	for _, col := range sess.Columns {
		cols[col] = true
	}

	rowGroups, err := buildPivotGroups(req.Group, cols, sess.ColumnTypes)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "pivot/count: " + err.Error()})
		return
	}
	colGroups, err := buildPivotGroups(req.GroupColumns, cols, sess.ColumnTypes)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "pivot/count: " + err.Error()})
		return
	}

	var where string
	if req.Filter != nil {
		w, err := parseFilter(req.Filter, cols)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		where = w
	}

	ctx := c.Request.Context()
	rows := int64(1)
	columns := int64(1)
	if len(rowGroups) > 0 {
		n, err := countDistinctCombos(ctx, sess, rowGroups, where)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		rows = n
	}
	if len(colGroups) > 0 {
		n, err := countDistinctCombos(ctx, sess, colGroups, where)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		columns = n
	}

	cells := rows * columns
	log.Printf("pivot/count: token=%s rows=%d columns=%d cells=%d", req.Token[:8]+"...", rows, columns, cells)
	c.JSON(http.StatusOK, gin.H{"rows": rows, "columns": columns, "cells": cells})
}

type PageRequest struct {
	Token    string `json:"token"`
	Page     int    `json:"page"`
	PageSize int    `json:"pageSize"`
}

func reportPageHandler(c *gin.Context) {
	var req PageRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	sess, ok := getSession(req.Token)
	if !ok {
		c.JSON(http.StatusNotFound, gin.H{"error": "Session not found or expired"})
		return
	}

	page := req.Page
	if page < 1 {
		page = 1
	}
	pageSize := req.PageSize
	if pageSize < 1 {
		pageSize = 100
	} else if pageSize > 100000 {
		pageSize = 100000
	}

	offset := int64(page-1) * int64(pageSize)
	rows, total, err := fetchPage(c.Request.Context(), sess, "", offset, int64(pageSize))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	totalPages := int64(0)
	if pageSize > 0 {
		totalPages = (total + int64(pageSize) - 1) / int64(pageSize)
	}

	c.JSON(http.StatusOK, gin.H{
		"rows":       rows,
		"totalRows":  total,
		"page":       page,
		"pageSize":   pageSize,
		"totalPages": totalPages,
	})
}

// fetchPage РґРѕСЃС‚Р°С‘С‚ СЃС‚СЂРѕРєРё РёР· temp-С‚Р°Р±Р»РёС† РІСЃРµС… Р‘Р” РІ РїРѕСЂСЏРґРєРµ sess.DBs,
// РѕР±С…РѕРґСЏ РёС… РїРѕ СЃРµРіРјРµРЅС‚Р°Рј (OFFSET/FETCH РЅР° РєР°Р¶РґРѕР№ Р‘Р”). Data РѕСЃС‚Р°С‘С‚СЃСЏ РІ SQL.
func fetchPage(ctx context.Context, sess *Session, where string, offset, limit int64) ([][]interface{}, int64, error) {
	table := tableName(sess.Token)
	countQuery := "SELECT COUNT(*) FROM " + table
	if where != "" {
		countQuery += " WHERE " + where
	}

	type countResult struct {
		dbName string
		count  int64
		err    error
	}
	counts := make(chan countResult, len(sess.ByDB))
	for dbName, dbSess := range sess.ByDB {
		go func(dbName string, dbSess *DBSession) {
			r := countResult{dbName: dbName}
			defer func() { counts <- r }()
			row, unlock := dbSess.queryRow(ctx, countQuery)
			if err := row.Scan(&r.count); err != nil {
				r.err = err
			}
			unlock()
		}(dbName, dbSess)
	}

	perDB := make(map[string]int64, len(sess.ByDB))
	var total int64
	for range sess.ByDB {
		r := <-counts
		if r.err != nil {
			return nil, 0, fmt.Errorf("%s: %v", r.dbName, r.err)
		}
		perDB[r.dbName] = r.count
		total += r.count
	}

	var segments []struct {
		dbName string
		start  int64
		length int64
	}
	consumed := int64(0)
	remaining := limit
	for _, dbName := range sess.DBs {
		cnt := perDB[dbName]
		if offset >= consumed+cnt {
			consumed += cnt
			continue
		}
		segStart := offset - consumed
		if segStart < 0 {
			segStart = 0
		}
		length := cnt - segStart
		if length > remaining {
			length = remaining
		}
		if length > 0 {
			segments = append(segments, struct {
				dbName string
				start  int64
				length int64
			}{dbName, segStart, length})
		}
		remaining -= length
		consumed += cnt
		if remaining == 0 {
			break
		}
	}

	type fetchResult struct {
		dbName string
		rows   [][]interface{}
		err    error
	}
	fetches := make(chan fetchResult, len(segments))
	for _, seg := range segments {
		dbSess := sess.ByDB[seg.dbName]
		seg := seg
		go func() {
			r := fetchResult{dbName: seg.dbName}
			defer func() { fetches <- r }()
			query := fmt.Sprintf(
				"SELECT * FROM %s%s ORDER BY (SELECT NULL) OFFSET %d ROWS FETCH NEXT %d ROWS ONLY",
				table, map[bool]string{true: " WHERE " + where, false: ""}[where != ""], seg.start, seg.length)
			rows, unlock, err := dbSess.query(ctx, query)
			if err != nil {
				r.err = err
				return
			}
			vals, err := database.ScanAllRows(rows, sess.Columns)
			rows.Close()
			unlock()
			if err != nil {
				r.err = err
				return
			}
			r.rows = vals
		}()
	}

	out := [][]interface{}{}
	for i := 0; i < len(segments); i++ {
		fr := <-fetches
		if fr.err != nil {
			return nil, 0, fmt.Errorf("%s: %v", fr.dbName, fr.err)
		}
		out = append(out, fr.rows...)
	}
	return out, total, nil
}

// ---------- drilldown ----------

type DrillRequest struct {
	Token     string                 `json:"token"`
	RowValues map[string]interface{} `json:"rowValues"`
	ColValues map[string]interface{} `json:"colValues"`
	Page      int                    `json:"page"`
	PageSize  int                    `json:"pageSize"`
}

func drilldownWhere(rowValues, colValues map[string]interface{}) (string, error) {
	var clauses []string
	vals := make(map[string]interface{})
	for k, v := range rowValues {
		vals[k] = v
	}
	for k, v := range colValues {
		vals[k] = v
	}
	for field, v := range vals {
		if vs, ok := v.([]interface{}); ok {
			var parts []string
			for _, x := range vs {
				switch t := x.(type) {
				case string:
					parts = append(parts, "'"+strings.ReplaceAll(t, "'", "''")+"'")
				case float64:
					parts = append(parts, strconv.FormatFloat(t, 'f', -1, 64))
				case nil:
					parts = append(parts, "NULL")
				default:
					parts = append(parts, fmt.Sprintf("%v", x))
				}
			}
			if len(parts) == 0 {
				return "", errors.New("drilldown: empty filter values for " + field)
			}
			clauses = append(clauses, "["+field+"] IN ("+strings.Join(parts, ", ")+")")
			continue
		}
		switch t := v.(type) {
		case string:
			clauses = append(clauses, "["+field+"] = '"+strings.ReplaceAll(t, "'", "''")+"'")
		case float64:
			clauses = append(clauses, "["+field+"] = "+strconv.FormatFloat(t, 'f', -1, 64))
		case nil:
			clauses = append(clauses, "["+field+"] IS NULL")
		default:
			clauses = append(clauses, "["+field+"] = "+fmt.Sprintf("%v", v))
		}
	}
	return strings.Join(clauses, " AND "), nil
}

func reportDrilldownHandler(c *gin.Context) {
	var req DrillRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	sess, ok := getSession(req.Token)
	if !ok {
		c.JSON(http.StatusNotFound, gin.H{"error": "Session not found or expired"})
		return
	}
	if len(req.RowValues)+len(req.ColValues) == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "rowValues/colValues required"})
		return
	}
	where, err := drilldownWhere(req.RowValues, req.ColValues)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	page := req.Page
	if page < 1 {
		page = 1
	}
	pageSize := req.PageSize
	if pageSize < 1 {
		pageSize = 100
	} else if pageSize > 100000 {
		pageSize = 100000
	}

	ctx := c.Request.Context()

	offset := int64(page-1) * int64(pageSize)
	rows, total, err := fetchPage(ctx, sess, where, offset, int64(pageSize))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	// Конвертируем массивы в объекты с ключами из sess.Columns, чтобы
	// DataGrid на фронтенде мог мапить по dataField (порядок колонок
	// в report.fields.grid может не совпадать с порядком в temp-таблице).
	objs := make([]map[string]interface{}, len(rows))
	cols := sess.Columns
	for ri, row := range rows {
		obj := make(map[string]interface{}, len(cols))
		for i, col := range cols {
			if i < len(row) {
				obj[col] = row[i]
			}
		}
		objs[ri] = obj
	}

	totalPages := int64(0)
	if pageSize > 0 {
		totalPages = (total + int64(pageSize) - 1) / int64(pageSize)
	}

	c.JSON(http.StatusOK, gin.H{
		"rows":       objs,
		"totalRows":  total,
		"page":       page,
		"pageSize":   pageSize,
		"totalPages": totalPages,
	})
}

// ---------- distinct ----------

type DistinctRequest struct {
	Token     string `json:"token"`
	FieldName string `json:"fieldName"`
}

func reportDistinctHandler(c *gin.Context) {
	var req DistinctRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	sess, ok := getSession(req.Token)
	if !ok {
		c.JSON(http.StatusNotFound, gin.H{"error": "Session not found or expired"})
		return
	}
	if req.FieldName == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "fieldName is required"})
		return
	}
	colIdx := -1
	for i, col := range sess.Columns {
		if col == req.FieldName {
			colIdx = i
			break
		}
	}
	if colIdx < 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": fmt.Sprintf("Column %s not found", req.FieldName)})
		return
	}

	ctx := c.Request.Context()
	table := tableName(req.Token)

	type dResult struct {
		dbName string
		vals   []interface{}
		err    string
	}
	results := make(chan dResult, len(sess.ByDB))
	for dbName, dbSess := range sess.ByDB {
		go func(dbName string, dbSess *DBSession) {
			r := dResult{dbName: dbName}
			defer func() { results <- r }()
			query := "SELECT DISTINCT [" + req.FieldName + "] FROM " + table + " WHERE [" + req.FieldName + "] IS NOT NULL"
			rows, unlock, err := dbSess.query(ctx, query)
			if err != nil {
				r.err = err.Error()
				return
			}
			vals, err := database.ScanAllRows(rows, []string{req.FieldName})
			rows.Close()
			unlock()
			if err != nil {
				r.err = err.Error()
				return
			}
			for _, row := range vals {
				r.vals = append(r.vals, row[0])
			}
		}(dbName, dbSess)
	}

	unique := map[string]interface{}{}
	var errs []string
	for range sess.ByDB {
		r := <-results
		if r.err != "" {
			errs = append(errs, r.dbName+": "+r.err)
			continue
		}
		for _, v := range r.vals {
			unique[fmtVal(v)] = v
		}
	}
	if len(errs) > 0 {
		c.JSON(http.StatusInternalServerError, gin.H{"error": strings.Join(errs, "\n")})
		return
	}

	keys := make([]string, 0, len(unique))
	for k := range unique {
		keys = append(keys, k)
	}
	sort.Strings(keys)
	values := make([]interface{}, 0, len(keys))
	for _, k := range keys {
		values = append(values, unique[k])
	}

	c.JSON(http.StatusOK, gin.H{"values": values})
}

// ---------- close / health ----------

type CloseRequest struct {
	Token string `json:"token"`
}

func reportCloseHandler(c *gin.Context) {
	var req CloseRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	sessionsMu.Lock()
	sess, ok := sessions[req.Token]
	if ok {
		delete(sessions, req.Token)
	}
	sessionsMu.Unlock()

	if !ok {
		c.JSON(http.StatusNotFound, gin.H{"error": "Session not found or expired"})
		return
	}

	go closeSession(sess)
	log.Printf("Session %s closed, temp tables dropped", req.Token[:8]+"...")
	c.JSON(http.StatusOK, gin.H{"message": "closed"})
}

// sessionSQLRows — источник строк экспорта из temp-таблиц SQL страницами.
type sessionSQLRows struct {
	sess    *Session
	columns []string
}

func (s *sessionSQLRows) Titles() []string { return s.columns }
func (s *sessionSQLRows) TotalRows() int64 { return s.sess.TotalRows }

func (s *sessionSQLRows) Fetch(ctx context.Context, offset, limit int64) ([][]interface{}, error) {
	rows, _, err := fetchPage(ctx, s.sess, "", offset, limit)
	return rows, err
}

type ExportRequest struct {
	Token      string `json:"token"`
	ReportName string `json:"reportName"`
}

func reportExportHandler(c *gin.Context) {
	var req ExportRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	sess, ok := getSession(req.Token)
	if !ok {
		c.JSON(http.StatusNotFound, gin.H{"error": "Session not found or expired"})
		return
	}

	name := req.ReportName
	if name == "" {
		name = "Отчет"
	}
	jobID := export.StartJob(func(progress func(done, total int)) (*export.Manifest, error) {
		return export.Generate(context.Background(), &sessionSQLRows{
			sess:    sess,
			columns: sess.Columns,
		}, name, progress)
	})
	c.JSON(http.StatusOK, gin.H{"jobId": jobID})
}

func reportExportStatusHandler(c *gin.Context) {
	jobID := c.Query("jobId")
	if jobID == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "jobId is required"})
		return
	}
	j, ok := export.GetJob(jobID)
	if !ok {
		c.JSON(http.StatusNotFound, gin.H{"error": "job not found"})
		return
	}
	c.JSON(http.StatusOK, j.Snapshot())
}
