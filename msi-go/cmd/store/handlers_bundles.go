package main

// Наборы каталога «фильтры+запросы+отчёты»: снимок текущего состояния,
// экспорт/импорт JSON, применение к филиалам. Управление — SuperAdmin.

import (
	"encoding/json"
	"net/http"
	"strconv"
	"strings"
	"time"

	"github.com/gin-gonic/gin"

	"goreport/internal/database"
)

type bundleScope struct {
	/** Все фильтры/запросы или только нужные отчётам набора. */
	Filters  string   `json:"filters"`  // 'all' | 'used'
	Queries  string   `json:"queries"`  // 'all' | 'used'
	ReportRoots []string `json:"report_roots"` // пусто = всё дерево
	WithToolbar bool  `json:"with_toolbar"`
}

type createBundleRequest struct {
	Name        string      `json:"name"`
	Description string      `json:"description"`
	Scope       bundleScope `json:"scope"`
}

type importBundleRequest struct {
	Name        string `json:"name"`
	Description string `json:"description"`
	Payload     string `json:"payload"`
}

type applyBundleRequest struct {
	Mode     string   `json:"mode"` // merge | replace
	Branches []string `json:"branches"`
}

// buildBundlePayload собирает снимок каталога.
func buildBundlePayload(scope bundleScope) (string, string, error) {
	type bundleFilter struct {
		Field     string          `json:"field"`
		Type      string          `json:"type"`
		Label     string          `json:"label"`
		SortOrder int             `json:"sort_order"`
		Config    json.RawMessage `json:"config"`
	}
	type bundleQuery struct {
		Key         string          `json:"key"`
		Title       string          `json:"title"`
		Tags        []string        `json:"tags"`
		DBKey       string          `json:"db_key"`
		FilterNames []string        `json:"filter_names"`
		SQLText     string          `json:"sql_text"`
		Columns     json.RawMessage `json:"columns"`
	}
	type bundleReport struct {
		Key        string          `json:"key"`
		Title      string          `json:"title"`
		Icon       string          `json:"icon"`
		Image      string          `json:"image"`
		QueryText  string          `json:"query_text"`
		QueryKey   string          `json:"query_key"`
		Config     json.RawMessage `json:"config"`
		ParentKey  string          `json:"parent_key"`
		BranchCode string          `json:"branch_code"`
		IsSection  bool            `json:"is_section"`
		SortOrder  int             `json:"sort_order"`
	}
	type payload struct {
		Filters  []bundleFilter  `json:"filters"`
		Queries  []bundleQuery   `json:"queries"`
		Reports  []bundleReport  `json:"reports"`
		Toolbar  json.RawMessage `json:"toolbar,omitempty"`
		Format   string          `json:"format"` // версия схемы
	}

	reports, err := store.ListReports()
	if err != nil {
		return "", "", err
	}
	byID := byIDMap(reports)
	keyByID := make(map[int]string, len(reports))
	byKey := make(map[string]*Report, len(reports))
	for _, r := range reports {
		keyByID[r.ID] = r.Key
		byKey[r.Key] = r
	}

	// Охват отчётов: всё дерево или выбранные корни (+их потомки).
	include := make(map[string]bool, len(reports))
	if len(scope.ReportRoots) == 0 {
		for _, r := range reports {
			include[r.Key] = true
		}
	} else {
		var add func(r *Report)
		add = func(r *Report) {
			if r == nil || include[r.Key] {
				return
			}
			include[r.Key] = true
			for _, child := range reports {
				if child.ParentID != nil && *child.ParentID == r.ID {
					add(child)
				}
			}
		}
		for _, root := range scope.ReportRoots {
			add(byKey[root])
		}
		// Родители корней тоже нужны, иначе дерево разорвётся.
		for _, root := range scope.ReportRoots {
			for r := byKey[root]; r != nil && r.ParentID != nil; r = byID[*r.ParentID] {
				include[r.Key] = true
			}
		}
	}

	out := payload{Format: "goreport.bundle/1"}

	// Отчёты: разделы с branch_code, parent по ключам.
	for _, r := range reports {
		if !include[r.Key] {
			continue
		}
		item := bundleReport{
			Key: r.Key, Title: r.Title, Icon: r.Icon, Image: r.Image,
			QueryText: r.QueryText, QueryKey: r.QueryKey, Config: r.Config,
			BranchCode: r.BranchCode, IsSection: r.IsSection, SortOrder: r.SortOrder,
		}
		if r.ParentID != nil {
			item.ParentKey = keyByID[*r.ParentID]
		}
		out.Reports = append(out.Reports, item)
	}

	// Запросы: все или только используемые отчётами набора.
	usedQueries := map[string]bool{}
	for _, r := range out.Reports {
		if r.QueryKey != "" {
			usedQueries[r.QueryKey] = true
		}
	}
	queries, err := store.ListQueries()
	if err != nil {
		return "", "", err
	}
	for _, q := range queries {
		if scope.Queries == "used" && !usedQueries[q.Key] {
			continue
		}
		out.Queries = append(out.Queries, bundleQuery{
			Key: q.Key, Title: q.Title, Tags: q.Tags, DBKey: q.DBKey,
			FilterNames: q.Filters, SQLText: q.SQL, Columns: q.Columns,
		})
	}

	// Фильтры: все или использованные запросами набора.
	usedFilters := map[string]bool{}
	for _, q := range out.Queries {
		for _, f := range q.FilterNames {
			usedFilters[f] = true
		}
	}
	filters, err := store.ListFilters()
	if err != nil {
		return "", "", err
	}
	for _, f := range filters {
		if scope.Filters == "used" && !usedFilters[f.Field] {
			continue
		}
		out.Filters = append(out.Filters, bundleFilter{
			Field: f.Field, Type: f.Type, Label: f.Label,
			SortOrder: f.SortOrder, Config: json.RawMessage(f.Config),
		})
	}

	if scope.WithToolbar {
		if cfg, err := store.GetToolbarConfig(); err == nil && cfg != "" && cfg != "{}" {
			out.Toolbar = json.RawMessage(cfg)
		}
	}

	raw, err := json.MarshalIndent(out, "", "  ")
	if err != nil {
		return "", "", err
	}
	counts := strings.TrimSpace(
		"фильтров: " + strconv.Itoa(len(out.Filters)) +
			" · запросов: " + strconv.Itoa(len(out.Queries)) +
			" · отчётов: " + strconv.Itoa(len(out.Reports)))
	return string(raw), counts, nil
}

// validateBundlePayload проверяет структуру и безопасность SQL набора.
func validateBundlePayload(payload string) (string, error) {
	var probe struct {
		Filters  []json.RawMessage `json:"filters"`
		Queries  []struct {
			Key     string `json:"key"`
			SQLText string `json:"sql_text"`
		} `json:"queries"`
		Reports []json.RawMessage `json:"reports"`
	}
	if err := json.Unmarshal([]byte(payload), &probe); err != nil {
		return "", err
	}
	if len(probe.Filters) == 0 && len(probe.Queries) == 0 && len(probe.Reports) == 0 {
		return "", errUnsupported
	}
	// Страж: SQL набора не может менять схему stack и писать вне dbo/#temp.
	for _, q := range probe.Queries {
		if err := database.GuardStackReadOnly(q.SQLText); err != nil {
			return q.Key, err
		}
	}
	return "", nil
}

// ─── Обработчики ─────────────────────────────────────────────────────────────

func listBundles(c *gin.Context) {
	if !requireStore(c) {
		return
	}
	if !requireRole(c, currentUser(c), RoleAdmin, RoleSuperAdmin) {
		return
	}
	list, err := store.ListBundles()
	if err != nil {
		storeError(c, err)
		return
	}
	c.JSON(http.StatusOK, gin.H{"bundles": list})
}

func getBundle(c *gin.Context) {
	if !requireStore(c) {
		return
	}
	if !requireRole(c, currentUser(c), RoleAdmin, RoleSuperAdmin) {
		return
	}
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "id должен быть числом"})
		return
	}
	b, err := store.GetBundle(id)
	if err != nil {
		storeError(c, err)
		return
	}
	c.JSON(http.StatusOK, b)
}

func createBundle(c *gin.Context) {
	if !requireStore(c) {
		return
	}
	user := currentUser(c)
	if !requireRole(c, user, RoleSuperAdmin) {
		return
	}
	var req createBundleRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if strings.TrimSpace(req.Name) == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "укажите имя набора"})
		return
	}
	payload, counts, err := buildBundlePayload(req.Scope)
	if err != nil {
		storeError(c, err)
		return
	}
	id, err := store.CreateBundle(&Bundle{
		BundleInfo: BundleInfo{
			Name: strings.TrimSpace(req.Name), Description: req.Description,
			ItemCounts: counts, CreatedBy: user.Login,
		},
		Payload: payload,
	})
	if err != nil {
		storeError(c, err)
		return
	}
	_ = store.AddBundleLog(id, "create", "", user.Login, counts)
	c.JSON(http.StatusCreated, gin.H{"id": id, "item_counts": counts})
}

func resnapshotBundle(c *gin.Context) {
	if !requireStore(c) {
		return
	}
	user := currentUser(c)
	if !requireRole(c, user, RoleSuperAdmin) {
		return
	}
	id, _ := strconv.Atoi(c.Param("id"))
	var req createBundleRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	payload, counts, err := buildBundlePayload(req.Scope)
	if err != nil {
		storeError(c, err)
		return
	}
	if err := store.SaveBundleSnapshot(id, payload, counts, user.Login); err != nil {
		storeError(c, err)
		return
	}
	_ = store.AddBundleLog(id, "create", "", user.Login, counts)
	c.JSON(http.StatusOK, gin.H{"id": id, "item_counts": counts})
}

func deleteBundle(c *gin.Context) {
	if !requireStore(c) {
		return
	}
	if !requireRole(c, currentUser(c), RoleSuperAdmin) {
		return
	}
	id, _ := strconv.Atoi(c.Param("id"))
	if err := store.DeleteBundle(id); err != nil {
		storeError(c, err)
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "deleted"})
}

func exportBundle(c *gin.Context) {
	if !requireStore(c) {
		return
	}
	user := currentUser(c)
	if !requireRole(c, user, RoleSuperAdmin) {
		return
	}
	id, _ := strconv.Atoi(c.Param("id"))
	b, err := store.GetBundle(id)
	if err != nil {
		storeError(c, err)
		return
	}
	_ = store.AddBundleLog(id, "export", "", user.Login, b.Name)
	safeName := strings.Map(func(r rune) rune {
		if r == ' ' || r == '_' || r == '-' || (r >= '0' && r <= '9') ||
			(r >= 'а' && r <= 'я') || (r >= 'А' && r <= 'Я') || r == 'ё' || r == 'Ё' {
			return r
		}
		return '_'
	}, b.Name)
	c.Header("Content-Disposition", `attachment; filename="bundle-`+safeName+`.json"`)
	c.Data(http.StatusOK, "application/json; charset=utf-8", []byte(b.Payload))
}

func importBundle(c *gin.Context) {
	if !requireStore(c) {
		return
	}
	user := currentUser(c)
	if !requireRole(c, user, RoleSuperAdmin) {
		return
	}
	var req importBundleRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if strings.TrimSpace(req.Payload) == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "payload пуст"})
		return
	}
	if badQuery, err := validateBundlePayload(req.Payload); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "набот отклонён: " + err.Error() + " (запрос " + badQuery + ")"})
		return
	}
	var counts string
	var probe struct {
		Filters  []json.RawMessage `json:"filters"`
		Queries  []json.RawMessage `json:"queries"`
		Reports  []json.RawMessage `json:"reports"`
	}
	_ = json.Unmarshal([]byte(req.Payload), &probe)
	counts = "фильтров: " + strconv.Itoa(len(probe.Filters)) +
		" · запросов: " + strconv.Itoa(len(probe.Queries)) +
		" · отчётов: " + strconv.Itoa(len(probe.Reports))

	name := strings.TrimSpace(req.Name)
	if name == "" {
		name = "Импорт " + time.Now().Format("02.01.2006 15:04")
	}
	id, err := store.CreateBundle(&Bundle{
		BundleInfo: BundleInfo{Name: name, Description: req.Description, ItemCounts: counts, CreatedBy: user.Login},
		Payload:    req.Payload,
	})
	if err != nil {
		storeError(c, err)
		return
	}
	_ = store.AddBundleLog(id, "import", "", user.Login, counts)
	c.JSON(http.StatusCreated, gin.H{"id": id, "item_counts": counts})
}

func applyBundle(c *gin.Context) {
	if !requireStore(c) {
		return
	}
	user := currentUser(c)
	if !requireRole(c, user, RoleSuperAdmin) {
		return
	}
	id, _ := strconv.Atoi(c.Param("id"))
	var req applyBundleRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if req.Mode == "" {
		req.Mode = "merge"
	}
	if req.Mode != "merge" && req.Mode != "replace" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "mode: merge или replace"})
		return
	}
	for _, b := range req.Branches {
		if len(b) != 1 || b[0] < '1' || b[0] > '9' {
			c.JSON(http.StatusBadRequest, gin.H{"error": "branches — номера филиалов 1–9"})
			return
		}
	}
	b, err := store.GetBundle(id)
	if err != nil {
		storeError(c, err)
		return
	}
	if badQuery, err := validateBundlePayload(b.Payload); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "набор отклонён стражем: " + err.Error() + " (запрос " + badQuery + ")"})
		return
	}
	summary, err := store.ApplyBundlePayload(b.Payload, req.Mode, req.Branches, user.Login)
	if err != nil {
		storeError(c, err)
		return
	}
	_ = store.AddBundleLog(id, "apply", strings.Join(req.Branches, ","), user.Login, req.Mode+": "+summary)
	c.JSON(http.StatusOK, gin.H{"message": "применено: " + summary})
}

func bundleLogHandler(c *gin.Context) {
	if !requireStore(c) {
		return
	}
	if !requireRole(c, currentUser(c), RoleAdmin, RoleSuperAdmin) {
		return
	}
	id, _ := strconv.Atoi(c.Param("id"))
	entries, err := store.BundleLogEntries(id, 50)
	if err != nil {
		storeError(c, err)
		return
	}
	c.JSON(http.StatusOK, gin.H{"log": entries})
}
