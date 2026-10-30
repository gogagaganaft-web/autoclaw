package main

import (
	"archive/zip"
	"bytes"
	"fmt"
	"net/http"
	"net/url"
	"os"
	"path/filepath"
	"runtime"
	"sort"
	"strings"
	"time"

	"github.com/gin-gonic/gin"

	"goreport/internal/database"
	"goreport/internal/export"
)

// PivotExportRequest - запрос серверного экспорта свода (XLSX).
type PivotExportRequest struct {
	Token        string              `json:"token"`
	Group        []PivotGroupField   `json:"group"`
	GroupColumns []PivotGroupField   `json:"groupColumns"`
	GroupSummary []PivotSummaryField `json:"groupSummary"`
	Filter       interface{}         `json:"filter"`
	ReportName   string              `json:"reportName"`
}

const (
	pivotExportMaxRows = 1_048_576 // лимит строк Excel
	pivotExportMaxCols = 16_384    // лимит колонок Excel
)

type pivotCombo struct {
	vals []interface{}
}

func pivotComboKey(vals []interface{}) string {
	var b strings.Builder
	for _, v := range vals {
		b.WriteString(fmtVal(v))
		b.WriteByte('\x00')
	}
	return b.String()
}

func pivotAggCaption(ag pivotAgg) string {
	switch ag.kind {
	case "sum":
		return ag.field
	case "count":
		return ag.field + " (кол-во)"
	default:
		return ag.field + " (" + ag.kind + ")"
	}
}

func pivotFileSanitize(name string) string {
	name = strings.TrimSpace(name)
	var b strings.Builder
	for _, r := range name {
		switch {
		case r >= 'a' && r <= 'z', r >= 'A' && r <= 'Z', r >= '0' && r <= '9':
			b.WriteRune(r)
		case r >= 0x0400 && r <= 0x04FF: // Cyrillic
			b.WriteRune(r)
		case r == ' ' || r == '_' || r == '-' || r == '.':
			b.WriteRune(r)
		default:
			b.WriteRune('_')
		}
	}
	s := strings.Trim(b.String(), " ._")
	if s == "" {
		s = "Свод"
	}
	if len(s) > 120 {
		s = s[:120]
	}
	return s
}

func pivotFileSuffix() string {
	return fmt.Sprintf("%d", time.Now().UnixNano()%1_000_000_000)
}

func pivotExportDir() string {
	if d := os.Getenv("EXPORT_DIR"); d != "" {
		return d
	}
	if runtime.GOOS == "windows" {
		return `C:\xampp\htdocs\report\data\exports`
	}
	return "/var/www/html/report/data/exports"
}

// reportPivotExportHandler - POST /api/report/pivot/export:
// агрегирует свод (строки x столбцы) на сервере и формирует XLSX (внутри ZIP).
func reportPivotExportHandler(c *gin.Context) {
	var req PivotExportRequest
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

	rowGroups, err := buildPivotGroups(req.Group, cols, sess.ColumnTypes)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "pivot/export: " + err.Error()})
		return
	}
	colGroups, err := buildPivotGroups(req.GroupColumns, cols, sess.ColumnTypes)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "pivot/export: " + err.Error()})
		return
	}
	for _, f := range req.GroupSummary {
		if f.Selector == "" || !cols[f.Selector] {
			c.JSON(http.StatusBadRequest, gin.H{"error": fmt.Sprintf("pivot/export: unknown summary column %q", f.Selector)})
			return
		}
	}
	if len(req.GroupSummary) == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "pivot/export: groupSummary is required"})
		return
	}

	combinedGroups := make([]pivotSelectGroup, 0, len(rowGroups)+len(colGroups))
	combinedGroups = append(combinedGroups, rowGroups...)
	combinedGroups = append(combinedGroups, colGroups...)

	rowSelectors := make([]string, len(rowGroups))
	for i, g := range rowGroups {
		rowSelectors[i] = g.name
	}
	colSelectors := make([]string, len(colGroups))
	for i, g := range colGroups {
		colSelectors[i] = g.name
	}
	combined := make([]string, 0, len(rowSelectors)+len(colSelectors))
	combined = append(combined, rowSelectors...)
	combined = append(combined, colSelectors...)

	sel, colNames, aggs, err := buildPivotSelect(combinedGroups, req.GroupSummary)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	table := tableName(req.Token)
	query := "SELECT " + strings.Join(sel, ", ") + " FROM " + table
	if where != "" {
		query += " WHERE " + where
	}
	if len(combinedGroups) > 0 {
		gb := make([]string, len(combinedGroups))
		for i, g := range combinedGroups {
			gb[i] = g.expr
		}
		query += " GROUP BY " + strings.Join(gb, ", ") + " ORDER BY " + strings.Join(gb, ", ")
	}

	ctx := c.Request.Context()
	type cellResult struct {
		cells map[string]*pivotCell
		err   string
	}
	results := make(chan cellResult, len(sess.ByDB))

	for dbName, dbSess := range sess.ByDB {
		go func(dbName string, dbSess *DBSession) {
			r := cellResult{cells: map[string]*pivotCell{}}
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
				gv := make([]interface{}, len(combined))
				for i := range combined {
					gv[i] = row[i]
				}
				cell := cellFromRow(row, gv, aggs)
				key := pivotComboKey(gv)
				if existing, ok := r.cells[key]; ok {
					addPivotCell(existing, cell, aggs)
				} else {
					r.cells[key] = cell
				}
			}
		}(dbName, dbSess)
	}

	merged := map[string]*pivotCell{}
	var errs []string
	for range sess.ByDB {
		r := <-results
		if r.err != "" {
			errs = append(errs, r.err)
			continue
		}
		for key, cell := range r.cells {
			if existing, ok := merged[key]; ok {
				addPivotCell(existing, cell, aggs)
			} else {
				merged[key] = cell
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
		for k := range combined {
			if cmp := compareVal(cells[i].groupVals[k], cells[j].groupVals[k]); cmp != 0 {
				return cmp < 0
			}
		}
		return false
	})

	nR := len(rowSelectors)
	var rowCombos, colCombos []*pivotCombo
	rowIdx := map[string]int{}
	colIdx := map[string]int{}
	for _, cell := range cells {
		rk := pivotComboKey(cell.groupVals[:nR])
		if _, ok := rowIdx[rk]; !ok {
			rowIdx[rk] = len(rowCombos)
			rowCombos = append(rowCombos, &pivotCombo{vals: cell.groupVals[:nR]})
		}
		ck := pivotComboKey(cell.groupVals[nR:])
		if _, ok := colIdx[ck]; !ok {
			colIdx[ck] = len(colCombos)
			colCombos = append(colCombos, &pivotCombo{vals: cell.groupVals[nR:]})
		}
	}
	if len(rowCombos) == 0 {
		rowCombos = append(rowCombos, &pivotCombo{})
	}
	if len(colCombos) == 0 {
		colCombos = append(colCombos, &pivotCombo{})
	}

	if len(rowCombos)+2 > pivotExportMaxRows {
		c.JSON(http.StatusBadRequest, gin.H{"error": "pivot/export: свод слишком большой для Excel (строк > 1 млн)"})
		return
	}
	K := len(aggs)
	totalCols := nR + (len(colCombos)+1)*K
	if totalCols > pivotExportMaxCols {
		c.JSON(http.StatusBadRequest, gin.H{"error": "pivot/export: свод слишком большой для Excel (колонок > 16384)"})
		return
	}

	mat := make([][]*pivotCell, len(rowCombos))
	for i := range mat {
		mat[i] = make([]*pivotCell, len(colCombos))
	}
	rowTotals := make([]*pivotCell, len(rowCombos))
	colTotals := make([]*pivotCell, len(colCombos))
	var grand *pivotCell
	for _, cell := range cells {
		ri := rowIdx[pivotComboKey(cell.groupVals[:nR])]
		ci := colIdx[pivotComboKey(cell.groupVals[nR:])]
		mat[ri][ci] = cell
		if rowTotals[ri] == nil {
			rowTotals[ri] = newPivotCell(nil)
		}
		addPivotCell(rowTotals[ri], cell, aggs)
		if colTotals[ci] == nil {
			colTotals[ci] = newPivotCell(nil)
		}
		addPivotCell(colTotals[ci], cell, aggs)
		if grand == nil {
			grand = newPivotCell(nil)
		}
		addPivotCell(grand, cell, aggs)
	}

	f, err := buildPivotWorkbook(req.ReportName, rowSelectors, colSelectors, aggs, rowCombos, colCombos, mat, rowTotals, colTotals, grand)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	defer f.Close()

	export.Ensure("")
	dir := pivotExportDir()
	if err := os.MkdirAll(dir, 0o755); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	base := pivotFileSanitize(req.ReportName)
	name := fmt.Sprintf("%s_%s.zip", base, pivotFileSuffix())
	path := filepath.Join(dir, name)

	var buf bytes.Buffer
	if _, err := f.WriteTo(&buf); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	zf, err := os.Create(path)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	zw := zip.NewWriter(zf)
	entry, err := zw.CreateHeader(&zip.FileHeader{
		Name:   base + ".xlsx",
		Method: zip.Deflate,
	})
	if err == nil {
		_, err = entry.Write(buf.Bytes())
	}
	if err == nil {
		err = zw.Close()
	}
	cerr := zf.Close()
	if err != nil {
		_ = os.Remove(path)
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	if cerr != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": cerr.Error()})
		return
	}
	info, err := os.Stat(path)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, export.Manifest{
		Format:    "xlsx",
		TotalRows: int64(len(rowCombos)),
		Parts: []export.Part{{
			Name: name,
			URL:  "/api/export-download?id=" + url.QueryEscape(name) + "&filename=" + url.QueryEscape(name),
			Size: info.Size(),
		}},
	})
}
