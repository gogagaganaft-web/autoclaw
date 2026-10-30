package main

import (
	"fmt"
	"net/http"
	"strings"

	"goreport/internal/database"

	"github.com/gin-gonic/gin"
)

// itemsRequest — запрос элементов списка с серверным поиском и постраничной выдачей.
// Используется фильтрами multi-select-list (УК, УСЛ, ПОСТ): sql — это itemsQuery
// из toolbar, nameField — колонка подписи, idField — колонка значения.
type itemsRequest struct {
	DBName    string `json:"dbName"`
	SQL       string `json:"sql"`
	IDField   string `json:"idField"`
	NameField string `json:"nameField"`
	Search    string `json:"search"`
	Skip      int    `json:"skip"`
	Take      int    `json:"take"`
}

// stripOrderBy убирает последний ORDER BY верхнего уровня: внутри подзапроса
// он недопустим, а регекс по хвосту ненадёжен (переводы строк, скобки, CTE).
func stripOrderBy(query string) string {
	lower := strings.ToLower(query)
	depth := 0
	last := -1
	for i := 0; i < len(lower); i++ {
		switch lower[i] {
		case '(':
			depth++
		case ')':
			depth--
		}
		if depth != 0 || !strings.HasPrefix(lower[i:], "order by") {
			continue
		}
		if i > 0 {
			prev := lower[i-1]
			if (prev >= 'a' && prev <= 'z') || (prev >= '0' && prev <= '9') || prev == '_' || prev == ']' {
				continue
			}
		}
		last = i
	}
	if last < 0 {
		return strings.TrimSpace(query)
	}
	return strings.TrimSpace(query[:last])
}

func quoteIdent(name string) string {
	return "[" + strings.ReplaceAll(name, "]", "]]") + "]"
}


// splitPrologue отделяет ведущие операторы (DECLARE/SET) от финального SELECT:
// itemsQuery в toolbar часто начинается с DECLARE, и обернуть всё в подзапрос нельзя.
func splitPrologue(query string) (string, string) {
	lower := strings.ToLower(query)
	depth := 0
	lastSelect := -1
	for i := 0; i < len(lower); i++ {
		switch lower[i] {
		case '(':
			depth++
		case ')':
			depth--
		}
		if depth != 0 || !strings.HasPrefix(lower[i:], "select") {
			continue
		}
		if i > 0 {
			prev := lower[i-1]
			if (prev >= 'a' && prev <= 'z') || (prev >= '0' && prev <= '9') || prev == '_' {
				continue
			}
		}
		lastSelect = i
	}
	if lastSelect <= 0 {
		return "", strings.TrimSpace(query)
	}
	return strings.TrimSpace(query[:lastSelect]), strings.TrimSpace(query[lastSelect:])
}

func listItems(c *gin.Context) {
	var req itemsRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if req.DBName == "" || strings.TrimSpace(req.SQL) == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "dbName и sql обязательны"})
		return
	}
	if req.NameField == "" {
		// Колонку подписи не передали — берём вторую из результата.
		// itemsQuery у УК/ПОСТ/УСЛ отдаёт (ID, Название), у деревьев (…, NODE).
		probe, perr := database.ExecuteQuery(req.DBName,
			"SELECT TOP 1 * FROM ( "+stripOrderBy(req.SQL)+" ) AS p")
		if perr != nil || probe.Error != "" || len(probe.Columns) < 2 {
			msg := "не удалось определить nameField"
			if perr != nil {
				msg += ": " + perr.Error()
			} else if probe.Error != "" {
				msg += ": " + probe.Error
			}
			c.JSON(http.StatusBadRequest, gin.H{"error": msg})
			return
		}
		req.NameField = probe.Columns[1]
		if req.IDField == "" {
			req.IDField = probe.Columns[0]
		}
	}
	if req.Take <= 0 || req.Take > 500 {
		req.Take = 50
	}
	if req.Skip < 0 {
		req.Skip = 0
	}

	// Параметров у database.ExecuteQuery нет, поэтому значения подставляем
	// строкой: кавычки экранируем, числа приводим к int.
	search := strings.ReplaceAll(req.Search, "'", "''")
	name := quoteIdent(req.NameField)

	prologue, body := splitPrologue(req.SQL)
	query := fmt.Sprintf(
		"%s\nSELECT * FROM ( %s ) AS src WHERE ('%s' = '' OR CAST(src.%s AS NVARCHAR(MAX)) LIKE N'%%%s%%') "+
			"ORDER BY src.%s OFFSET %d ROWS FETCH NEXT %d ROWS ONLY",
		prologue, stripOrderBy(body), search, name, search, name, req.Skip, req.Take)

	res, err := database.ExecuteQuery(req.DBName, query)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	if res.Error != "" {
		c.JSON(http.StatusInternalServerError, gin.H{"error": res.Error})
		return
	}

	idIdx, nameIdx := 0, 0
	for i, col := range res.Columns {
		if col == req.IDField {
			idIdx = i
		}
		if col == req.NameField {
			nameIdx = i
		}
	}
	items := make([]gin.H, 0, len(res.Rows))
	for _, row := range res.Rows {
		var id interface{}
		var label interface{}
		if idIdx < len(row) {
			id = row[idIdx]
		}
		if nameIdx < len(row) {
			label = row[nameIdx]
		}
		items = append(items, gin.H{"id": id, "name": label})
	}
	c.JSON(http.StatusOK, gin.H{"items": items, "count": len(items)})
}

