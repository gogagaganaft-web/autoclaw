package main

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"log"
	"math"
	"net/http"
	"regexp"
	"sort"
	"strconv"
	"strings"
	"time"

	"github.com/gin-gonic/gin"

	"goreport/internal/database"
)

// ─── ДАННЫЕ ОТЧЁТА: POST /api/reports/:key/data ──────────────────────────────
//
// Порт обработчика из прототипа gr-backend (report_data.go). Логика та же:
// SQL отчёта + значения фильтров → готовый запрос → выполнение на выбранных
// MS SQL-базах → колонки и строки. Отличие окружения: конфигурация баз живёт
// в пакете database (msi-go), а не в локальной map прототипа.

type reportFilterSpec struct {
	Name    string `json:"name"`
	Label   string `json:"label"`
	Type    string `json:"type"`
	Default any    `json:"default"`
}

type dataRequest struct {
	Filters map[string]any `json:"filters"`
}

type reportDataResult struct {
	Columns []string        `json:"columns"`
	Rows    [][]interface{} `json:"rows"`
	Error   string          `json:"error,omitempty"`
}

var newPlaceholderRe = regexp.MustCompile(`\{\{\s*([A-Za-z0-9_А-Яа-яЁё]+)\s*\}\}`)

// isDBNamed — настроено ли подключение: в .env задан сервер.
func isDBNamed(name string) bool {
	cfg, ok := database.GetDBConfig(name)
	return ok && strings.TrimSpace(cfg.Server) != ""
}

// firstConfiguredDB — первая настроенная база в привычном порядке.
func firstConfiguredDB() string {
	order := []string{"DB1UL", "DB2UL", "DB1FL", "DB2FL", "DB3UL", "DB3FL", "DB4UL", "DB4FL"}
	for _, name := range order {
		if isDBNamed(name) {
			return name
		}
	}
	for _, name := range []string{
		"DB5UL", "DB6UL", "DB7UL", "DB8UL", "DB9UL",
		"DB5FL", "DB6FL", "DB7FL", "DB8FL", "DB9FL",
	} {
		if isDBNamed(name) {
			return name
		}
	}
	return ""
}

func reportData(c *gin.Context) {
	if !requireStore(c) {
		return
	}

	key := c.Param("key")
	sqlText, cfgText, err := store.GetReportSQL(key)
	if errors.Is(err, errNotFound) {
		c.JSON(http.StatusNotFound, gin.H{"error": "report not found"})
		return
	}
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	if strings.TrimSpace(sqlText) == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "у отчёта не задан SQL-запрос"})
		return
	}

	config := map[string]any{}
	if strings.TrimSpace(cfgText) != "" {
		_ = json.Unmarshal([]byte(cfgText), &config)
	}

	// Тело запроса необязательно: без него используются значения по умолчанию.
	req := dataRequest{Filters: map[string]any{}}
	_ = c.ShouldBindJSON(&req)
	if req.Filters == nil {
		req.Filters = map[string]any{}
	}

	finalSQL, err := interpolateReportQuery(sqlText, config, req.Filters)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	dbNames := resolveDBNames(config, req.Filters)
	if len(dbNames) == 0 {
		c.JSON(http.StatusServiceUnavailable, gin.H{
			"error": "не настроена ни одна MS SQL-база (нет ни БД_ЮЛ/БД_ФЛ, ни config.db)",
		})
		return
	}

	// Сводные по нескольким филиалам — только SuperAdmin; остальные выполняются
	// на базах своего филиала.
	if allowed := currentUser(c).AllowedDBKeys(); allowed != nil {
		for _, name := range dbNames {
			if !allowed[name] {
				c.JSON(http.StatusForbidden, gin.H{
					"error": "нет доступа к базе " + name + " — сводные по филиалам доступны SuperAdmin",
				})
				return
			}
		}
	}

	log.Printf("Report %s: executing on %v", key, dbNames)
	res := runReportMultiQuery(dbNames, finalSQL)

	// Если MS SQL вернул ошибку и строк нет — показываем ошибку, а не «пусто».
	if res.Error != "" && len(res.Rows) == 0 {
		c.JSON(http.StatusBadGateway, gin.H{"error": "MS SQL: " + res.Error})
		return
	}
	c.JSON(http.StatusOK, res)
}

// resolveDBNames определяет список MS SQL-баз: из фильтров БД_ЮЛ/БД_ФЛ,
// иначе config.db, иначе первая настроенная. Возвращаются только настроенные.
func resolveDBNames(config map[string]any, values map[string]any) []string {
	var raw []any
	for _, field := range []string{"БД_ЮЛ", "БД_ФЛ"} {
		if v, ok := values[field]; ok {
			if list, err := toSlice(v); err == nil && len(list) > 0 {
				raw = list
				break
			}
		}
	}

	if len(raw) == 0 {
		if db, ok := config["db"].(string); ok && strings.TrimSpace(db) != "" {
			raw = []any{db}
		}
	}
	if len(raw) == 0 {
		if db := firstConfiguredDB(); db != "" {
			raw = []any{db}
		}
	}

	seen := map[string]bool{}
	out := make([]string, 0, len(raw))
	for _, item := range raw {
		name := strings.TrimSpace(fmt.Sprintf("%v", item))
		if name == "" || seen[name] {
			continue
		}
		if !isDBNamed(name) {
			log.Printf("Report data: база %q не настроена, пропускаю", name)
			continue
		}
		seen[name] = true
		out = append(out, name)
	}
	return out
}

// runReportMultiQuery выполняет один и тот же SQL на нескольких базах и
// объединяет результат, добавляя первой колонкой имя подключения
// (connectionName) — как это делает оригинальный MSI-фронтенд.
func runReportMultiQuery(dbNames []string, sqlText string) reportDataResult {
	if len(dbNames) == 0 {
		return reportDataResult{Columns: []string{}, Rows: [][]interface{}{}}
	}

	type res struct {
		DB string
		QR database.QueryResult
	}
	ch := make(chan res, len(dbNames))

	for _, db := range dbNames {
		go func(name string) {
			log.Printf("Executing multi-query for DB: %s", name)
			qr, err := database.ExecuteQueryContext(context.Background(), name, "SET LANGUAGE Russian; "+sqlText)
			if err != nil {
				log.Printf("Error in multi-query for DB %s: %v", name, err)
			} else if qr.Error != "" {
				log.Printf("Query error for DB %s: %s", name, qr.Error)
			}
			ch <- res{DB: name, QR: qr}
		}(db)
	}

	cols := []string{"connectionName"}
	rows := [][]interface{}{}
	errs := []string{}

	for i := 0; i < len(dbNames); i++ {
		r := <-ch
		if len(r.QR.Columns) > 0 && len(cols) == 1 {
			cols = append(cols, r.QR.Columns...)
		}

		displayName := database.GetDBDisplayName(r.DB)

		if r.QR.Error != "" {
			errs = append(errs, fmt.Sprintf("%s: %s", displayName, r.QR.Error))
		}

		for _, row := range r.QR.Rows {
			rows = append(rows, append([]interface{}{displayName}, row...))
		}
	}
	return reportDataResult{Columns: cols, Rows: rows, Error: strings.Join(errs, "; ")}
}

// interpolateReportQuery выбирает схему подстановки по виду config.filters:
// массив → новая схема, объект/отсутствует → легаси-схема MSI.
func interpolateReportQuery(sqlText string, config map[string]any, values map[string]any) (string, error) {
	if specs, ok := parseFilterSpecs(config["filters"]); ok {
		return applyFilterSpecs(sqlText, specs, values)
	}
	defaults, _ := config["filters"].(map[string]any)
	return interpolateLegacy(sqlText, values, defaults), nil
}

// ─── НОВАЯ СХЕМА ──────────────────────────────────────────────────────────────

func parseFilterSpecs(raw any) ([]reportFilterSpec, bool) {
	list, ok := raw.([]any)
	if !ok {
		return nil, false
	}
	specs := make([]reportFilterSpec, 0, len(list))
	for _, item := range list {
		data, err := json.Marshal(item)
		if err != nil {
			continue
		}
		var spec reportFilterSpec
		if err := json.Unmarshal(data, &spec); err == nil && spec.Name != "" {
			specs = append(specs, spec)
		}
	}
	return specs, true
}

// applyFilterSpecs заменяет {{name}} и {name} на типизированные SQL-литералы.
func applyFilterSpecs(sqlText string, specs []reportFilterSpec, values map[string]any) (string, error) {
	var firstErr error
	out := newPlaceholderRe.ReplaceAllStringFunc(sqlText, func(m string) string {
		name := newPlaceholderRe.FindStringSubmatch(m)[1]
		value, has := lookupFilter(specs, values, name)
		if !has {
			return "NULL"
		}
		lit, err := sqlLiteral(typeOf(specs, name), value)
		if err != nil {
			if firstErr == nil {
				firstErr = fmt.Errorf("фильтр %s: %w", name, err)
			}
			return m
		}
		return lit
	})
	if firstErr != nil {
		return "", firstErr
	}

	// Совместимость: поддержать и одиночные {name} для объявленных фильтров.
	for _, spec := range specs {
		value, has := lookupFilter(specs, values, spec.Name)
		if !has {
			continue
		}
		lit, err := sqlLiteral(spec.Type, value)
		if err != nil {
			continue
		}
		out = strings.ReplaceAll(out, "{"+spec.Name+"}", lit)
	}
	return out, nil
}

func lookupFilter(specs []reportFilterSpec, values map[string]any, name string) (any, bool) {
	if v, ok := values[name]; ok && !isEmptyValue(v) {
		return v, true
	}
	for _, spec := range specs {
		if spec.Name == name && spec.Default != nil && !isEmptyValue(spec.Default) {
			return spec.Default, true
		}
	}
	return nil, false
}

func typeOf(specs []reportFilterSpec, name string) string {
	for _, spec := range specs {
		if spec.Name == name {
			return spec.Type
		}
	}
	return ""
}

// sqlLiteral превращает значение фильтра в безопасный SQL-литерал.
func sqlLiteral(typ string, v any) (string, error) {
	switch strings.ToLower(strings.TrimSpace(typ)) {
	case "number", "int", "integer", "float", "decimal", "double":
		f, err := toFloat(v)
		if err != nil {
			return "", fmt.Errorf("ожидалось число: %w", err)
		}
		return strconv.FormatFloat(f, 'f', -1, 64), nil
	case "bool", "boolean", "check":
		return boolLiteral(v), nil
	case "date", "datetime":
		if v == nil {
			return "NULL", nil
		}
		return "N'" + escapeSQLString(toDateString(v)) + "'", nil
	case "numberlist", "intlist":
		return numberListLiteral(v)
	case "stringlist", "list":
		return stringListLiteral(v)
	default:
		if v == nil {
			return "NULL", nil
		}
		return "N'" + escapeSQLString(formatScalar(v)) + "'", nil
	}
}

func boolLiteral(v any) string {
	switch t := v.(type) {
	case bool:
		if t {
			return "1"
		}
		return "0"
	case nil:
		return "0"
	default:
		s := strings.ToLower(strings.TrimSpace(fmt.Sprintf("%v", v)))
		if s == "1" || s == "true" || s == "yes" || s == "да" {
			return "1"
		}
		return "0"
	}
}

func numberListLiteral(v any) (string, error) {
	list, err := toSlice(v)
	if err != nil {
		return "", err
	}
	if len(list) == 0 {
		return "NULL", nil
	}
	parts := make([]string, 0, len(list))
	for _, item := range list {
		f, err := toFloat(item)
		if err != nil {
			return "", fmt.Errorf("в списке ожидалось число: %w", err)
		}
		parts = append(parts, strconv.FormatFloat(f, 'f', -1, 64))
	}
	return strings.Join(parts, ", "), nil
}

func stringListLiteral(v any) (string, error) {
	list, err := toSlice(v)
	if err != nil {
		return "", err
	}
	if len(list) == 0 {
		return "NULL", nil
	}
	parts := make([]string, 0, len(list))
	for _, item := range list {
		parts = append(parts, "N'"+escapeSQLString(formatScalar(item))+"'")
	}
	return strings.Join(parts, ", "), nil
}

func toFloat(v any) (float64, error) {
	switch t := v.(type) {
	case float64:
		return t, nil
	case float32:
		return float64(t), nil
	case int:
		return float64(t), nil
	case int64:
		return float64(t), nil
	case json.Number:
		return t.Float64()
	case string:
		s := strings.TrimSpace(t)
		if s == "" {
			return 0, errors.New("пустое значение")
		}
		return strconv.ParseFloat(strings.Replace(s, ",", ".", 1), 64)
	default:
		return 0, fmt.Errorf("неподдерживаемый тип %T", v)
	}
}

func toSlice(v any) ([]any, error) {
	switch t := v.(type) {
	case nil:
		return nil, nil
	case []any:
		return t, nil
	case string:
		if strings.TrimSpace(t) == "" {
			return nil, nil
		}
		parts := strings.Split(t, ",")
		out := make([]any, 0, len(parts))
		for _, p := range parts {
			out = append(out, strings.TrimSpace(p))
		}
		return out, nil
	default:
		return []any{v}, nil
	}
}

func toDateString(v any) string {
	if t, ok := v.(string); ok {
		return t
	}
	return formatScalar(v)
}

// escapeSQLString экранирует одиночные кавычки для MS SQL ('' внутри строки).
func escapeSQLString(s string) string {
	s = strings.ReplaceAll(s, "'", "''")
	s = strings.ReplaceAll(s, "\x00", "")
	return s
}

func isEmptyValue(v any) bool {
	if v == nil {
		return true
	}
	if s, ok := v.(string); ok {
		return strings.TrimSpace(s) == ""
	}
	if list, ok := v.([]any); ok {
		return len(list) == 0
	}
	if m, ok := v.(map[string]any); ok {
		return len(m) == 0
	}
	return false
}

// ─── ЛЕГАСИ-СХЕМА (формат оригинала MSI) ──────────────────────────────────────

// interpolateLegacy повторяет ReportRenderer.interpolateQuery: одинарные
// скобки {name}, спец-обработка периодов и подстановка «как есть».
func interpolateLegacy(query string, values map[string]any, defaults map[string]any) string {
	params := map[string]any{}
	for k, v := range defaults {
		params[k] = v
	}
	for k, v := range values {
		if v != nil {
			params[k] = v
		}
	}

	// Период по умолчанию: с 1 января текущего года по сегодня.
	if !hasPeriod(params["ПериодМесяцы"]) {
		if d, ok := defaults["ПериодМесяцы"]; ok && hasPeriod(d) {
			params["ПериодМесяцы"] = d
		} else {
			now := time.Now()
			params["ПериодМесяцы"] = map[string]any{
				"start": fmt.Sprintf("%d-01-01", now.Year()),
				"end":   now.Format("2006-01-02"),
			}
		}
	}

	// Период обрабатываем первым (как в оригинале), остальные ключи — по
	// алфавиту, чтобы результат не зависел от порядка обхода map.
	//
	// Ключ ПериодМесяцы ниже исключён из общего цикла, поэтому его именованные
	// токены раскрываются здесь. Без этого {ПериодМесяцы_start} уходил в MS SQL
	// литералом '{…}' и батч падал с «Must declare the scalar variable».
	if pm := params["ПериодМесяцы"]; hasPeriod(pm) {
		start, end := periodBounds(pm)
		query = replaceTokenBoth(query, "{perStart}", quoteLegacy(start))
		query = replaceTokenBoth(query, "{perEnd}", quoteLegacy(end))
		query = replaceTokenBoth(query, "{start}", quoteLegacy(start))
		query = replaceTokenBoth(query, "{end}", quoteLegacy(end))
		query = strings.ReplaceAll(query, "{ПериодМесяцы_start}", quoteLegacy(start))
		query = strings.ReplaceAll(query, "{ПериодМесяцы_end}", quoteLegacy(end))
		query = strings.ReplaceAll(query, "{ПериодМесяцы_start_num}", strings.ReplaceAll(start, "-", ""))
		query = strings.ReplaceAll(query, "{ПериодМесяцы_end_num}", strings.ReplaceAll(end, "-", ""))
		query = strings.ReplaceAll(query, "{ПериодМесяцы}", quoteLegacy(start)+" AND "+quoteLegacy(end))
	}

	keys := make([]string, 0, len(params))
	for k := range params {
		if k == "ПериодМесяцы" {
			continue
		}
		keys = append(keys, k)
	}
	sort.Strings(keys)

	for _, key := range keys {
		raw := params[key]
		if raw == nil {
			continue
		}

		// Диапазон дат: значение { start, end }.
		if m, ok := raw.(map[string]any); ok {
			start, _ := m["start"].(string)
			end, _ := m["end"].(string)
			if start == "" || end == "" {
				start, end = periodBounds(m)
			}
			if start != "" && end != "" {
				query = replaceTokenBoth(query, "{"+key+"_start}", quoteLegacy(start))
				query = replaceTokenBoth(query, "{"+key+"_end}", quoteLegacy(end))
				query = strings.ReplaceAll(query, "{"+key+"_start_num}", strings.ReplaceAll(start, "-", ""))
				query = strings.ReplaceAll(query, "{"+key+"_end_num}", strings.ReplaceAll(end, "-", ""))
				query = replaceTokenBoth(query, "{"+key+"}", quoteLegacy(start)+" AND "+quoteLegacy(end))
				query = replaceTokenBoth(query, "{start}", quoteLegacy(start))
				query = replaceTokenBoth(query, "{end}", quoteLegacy(end))
				continue
			}
		}

		value := legacyScalar(key, raw)
		query = replaceTokenBoth(query, "{"+key+"}", value)
	}

	return query
}

// formatScalar приводит значение к строке так же, как это делал JS:
// целые числа (из JSON приходят float64) — без экспоненты и без «.0».
func formatScalar(v any) string {
	switch t := v.(type) {
	case nil:
		return ""
	case float64:
		if t == math.Trunc(t) && math.Abs(t) < 1e15 {
			return strconv.FormatInt(int64(t), 10)
		}
		return strconv.FormatFloat(t, 'f', -1, 64)
	case float32:
		f := float64(t)
		if f == math.Trunc(f) && math.Abs(f) < 1e15 {
			return strconv.FormatInt(int64(f), 10)
		}
		return strconv.FormatFloat(f, 'f', -1, 32)
	case int:
		return strconv.FormatInt(int64(t), 10)
	case int64:
		return strconv.FormatInt(t, 10)
	case int32:
		return strconv.FormatInt(int64(t), 10)
	case uint64:
		return strconv.FormatUint(t, 10)
	case bool:
		if t {
			return "true"
		}
		return "false"
	default:
		return fmt.Sprintf("%v", v)
	}
}

// isDateLike отлавливает строки-даты (2026-09-01, 2026-09-01T00:00:00).
// Без кавычек MS SQL трактует «2026-09-01» как вычитание целых, и присвоение
// в DATE/сравнение с DATE падает с «Operand type clash: int is incompatible
// with date» (например, {m_start} в отчетах с периодом).
func isDateLike(s string) bool {
	if len(s) < 10 {
		return false
	}
	for i, ch := range s[:10] {
		if i == 4 || i == 7 {
			if ch != '-' {
				return false
			}
			continue
		}
		if ch < '0' || ch > '9' {
			return false
		}
	}
	return len(s) == 10 || s[10] == 'T' || s[10] == ' '
}

// legacyScalar повторяет правила аргументов оригинала: даты/месяцы
// («calc», «РасчетыйМесяц») — в кавычках; остальные массивы — через запятую
// без кавычек; прочие значения — как есть, кроме строк-дат — те в кавычках.

// replaceTokenBoth — подстановка с учётом SQL, где плейсхолдер уже обёрнут
// в одинарные кавычки ('{m_start}'): туда значение вставляется без кавычек,
// иначе они удвоятся и батч падает с «Incorrect syntax near '2026'».
func replaceTokenBoth(query, token, quotedValue string) string {
	raw := quotedValue
	if len(raw) >= 2 && strings.HasPrefix(raw, "'") && strings.HasSuffix(raw, "'") {
		raw = raw[1 : len(raw)-1]
	}
	if strings.Contains(query, "'"+token+"'") {
		query = strings.ReplaceAll(query, "'"+token+"'", "'"+raw+"'")
	}
	return strings.ReplaceAll(query, token, quotedValue)
}

func legacyScalar(key string, raw any) string {
	quoted := key == "calc" || key == "РасчетыйМесяц" || key == "РасчетныйМесяц"

	if list, ok := raw.([]any); ok {
		// Пустой список не должен давать IN (): это синтаксическая ошибка MS SQL.
		if len(list) == 0 {
			return "NULL"
		}
		parts := make([]string, 0, len(list))
		for _, item := range list {
			s := formatScalar(item)
			if quoted || isDateLike(s) {
				s = "'" + s + "'"
			}
			parts = append(parts, s)
		}
		return strings.Join(parts, ",")
	}

	if quoted {
		return "'" + formatScalar(raw) + "'"
	}
	s := formatScalar(raw)
	if isDateLike(s) {
		return "'" + s + "'"
	}
	return s
}

func quoteLegacy(s string) string {
	return "'" + s + "'"
}

// hasPeriod сообщает, задан ли период в виде { Начало/Окончание } или { start/end }.
func hasPeriod(v any) bool {
	if v == nil {
		return false
	}
	if _, ok := v.(map[string]any); !ok {
		return false
	}
	start, end := periodBounds(v)
	return start != "" && end != ""
}

func periodBounds(v any) (string, string) {
	m, ok := v.(map[string]any)
	if !ok {
		return "", ""
	}
	start, _ := m["Начало"].(string)
	end, _ := m["Окончание"].(string)
	if start == "" {
		start, _ = m["start"].(string)
	}
	if end == "" {
		end, _ = m["end"].(string)
	}
	return start, end
}
