package main

import (
	"errors"
	"net/http"
	"strconv"
	"strings"

	"github.com/gin-gonic/gin"
)

// toolbarKey — ключ настройки панели фильтров. В MS SQL панель живёт в dbo.ui_config;
// константа осталась для совместимости с Postgres-хранилищем.
const toolbarKey = "__toolbar_config__"

// toolbarSettingKey — ключ ui_config, под которым лежит панель фильтров.
// Раньше PutConfig писал в toolbarKey, а читатель брал "toolbar" — запись
// уходила в другую строку и панель не обновлялась.
const toolbarSettingKey = "toolbar"

func requireStore(c *gin.Context) bool {
	if store == nil {
		c.JSON(http.StatusServiceUnavailable, gin.H{"error": "storage is not connected"})
		return false
	}
	return true
}

func storeError(c *gin.Context, err error) {
	switch {
	case errors.Is(err, errNotFound):
		c.JSON(http.StatusNotFound, gin.H{"error": "report not found"})
	case errors.Is(err, errConflict):
		c.JSON(http.StatusConflict, gin.H{"error": "conflict"})
	case errors.Is(err, errUnsupported):
		c.JSON(http.StatusNotImplemented, gin.H{"error": err.Error()})
	default:
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
	}
}

// ─── ОТЧЁТЫ ──────────────────────────────────────────────────────────────────

func listReports(c *gin.Context) {
	if !requireStore(c) {
		return
	}
	list, err := store.ListReports()
	if err != nil {
		storeError(c, err)
		return
	}
	user := currentUser(c)
	if !user.IsSuperAdmin() {
		list = visibleReports(list, user.Branch)
	}
	c.JSON(http.StatusOK, list)
}

// effectiveBranch — филиал элемента: ближайший раздел-предок с branch_code.
func effectiveBranch(r *Report, byID map[int]*Report) string {
	seen := 0
	for r != nil && seen < 32 {
		if r.IsSection && r.BranchCode != "" {
			return r.BranchCode
		}
		if r.ParentID == nil {
			return ""
		}
		r = byID[*r.ParentID]
		seen++
	}
	return ""
}

// visibleReports — superadmin видит всё; остальные — общие ветки и свой филиал.
func visibleReports(list []*Report, branch string) []*Report {
	byID := make(map[int]*Report, len(list))
	for _, r := range list {
		byID[r.ID] = r
	}
	out := make([]*Report, 0, len(list))
	for _, r := range list {
		b := effectiveBranch(r, byID)
		if b == "" || b == branch {
			out = append(out, r)
		}
	}
	return out
}

// reportBranchByKey — эффективный филиал отчёта по ключу (для проверки прав).
func reportBranchByKey(list []*Report, key string) string {
	byID := make(map[int]*Report, len(list))
	var target *Report
	for _, r := range list {
		byID[r.ID] = r
		if r.Key == key {
			target = r
		}
	}
	if target == nil {
		return ""
	}
	return effectiveBranch(target, byID)
}

// canEditReportPayload — право на создание/изменение: филиал цели.
// Для раздела — его собственный branch_code, для отчёта — ветка родителя.
func canEditReportPayload(user AppUser, p ReportPayload) bool {
	if user.IsSuperAdmin() {
		return true
	}
	if user.Role != RoleAdmin {
		return false
	}
	if p.IsSection {
		if p.BranchCode == nil {
			return false // общие разделы — только superadmin
		}
		return *p.BranchCode == user.Branch
	}
	if p.ParentID == nil {
		return false
	}
	list, err := store.ListReports()
	if err != nil {
		return false
	}
	for _, r := range list {
		if r.ID == *p.ParentID {
			return effectiveBranch(r, byIDMap(list)) == user.Branch
		}
	}
	return false
}

func byIDMap(list []*Report) map[int]*Report {
	m := make(map[int]*Report, len(list))
	for _, r := range list {
		m[r.ID] = r
	}
	return m
}

func getReport(c *gin.Context) {
	if !requireStore(c) {
		return
	}
	r, err := store.GetReport(c.Param("key"))
	if err != nil {
		storeError(c, err)
		return
	}
	c.JSON(http.StatusOK, r)
}

func createReport(c *gin.Context) {
	if !requireStore(c) {
		return
	}
	user := currentUser(c)
	var p ReportPayload
	if err := c.ShouldBindJSON(&p); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if !canEditReportPayload(user, p) {
		c.JSON(http.StatusForbidden, gin.H{"error": "нет прав: доступна только своя ветка филиала"})
		return
	}
	id, err := store.CreateReport(p)
	if err != nil {
		if errors.Is(err, errConflict) {
			c.JSON(http.StatusConflict, gin.H{"error": "report with this key already exists"})
			return
		}
		if isValidationError(err) {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		storeError(c, err)
		return
	}
	c.JSON(http.StatusCreated, gin.H{"id": id})
}

func updateReport(c *gin.Context) {
	if !requireStore(c) {
		return
	}
	user := currentUser(c)
	var p ReportPayload
	if err := c.ShouldBindJSON(&p); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	// Права: и по текущей ветке отчёта, и по целевой (перенос между ветками).
	if list, err := store.ListReports(); err == nil {
		if !user.CanEditBranch(reportBranchByKey(list, c.Param("key"))) || !canEditReportPayload(user, p) {
			c.JSON(http.StatusForbidden, gin.H{"error": "нет прав на изменение этого отчёта: только своя ветка филиала"})
			return
		}
	}
	id, err := store.UpdateReport(c.Param("key"), p)
	if err != nil {
		if isValidationError(err) {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		storeError(c, err)
		return
	}
	c.JSON(http.StatusOK, gin.H{"id": id})
}

func deleteReport(c *gin.Context) {
	if !requireStore(c) {
		return
	}
	user := currentUser(c)
	if list, err := store.ListReports(); err == nil {
		if !user.CanEditBranch(reportBranchByKey(list, c.Param("key"))) {
			c.JSON(http.StatusForbidden, gin.H{"error": "нет прав на удаление этого отчёта: только своя ветка филиала"})
			return
		}
	}
	if err := store.DeleteReport(c.Param("key")); err != nil {
		if isValidationError(err) {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		storeError(c, err)
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "deleted"})
}

// isValidationError отличает ошибки валидации (400) от ошибок БД (500).
func isValidationError(err error) bool {
	if err == nil {
		return false
	}
	if errors.Is(err, errNotFound) || errors.Is(err, errConflict) || errors.Is(err, errUnsupported) {
		return false
	}
	msg := err.Error()
	for _, marker := range []string{
		"required", "не может", "не найден", "только раздел", "нельзя", "недопустим",
		"is not valid JSON", "обязательны", "сначала удалите",
	} {
		if strings.Contains(msg, marker) {
			return true
		}
	}
	return false
}

// ─── ПАНЕЛЬ ФИЛЬТРОВ ─────────────────────────────────────────────────────────

func getToolbar(c *gin.Context) {
	if !requireStore(c) {
		return
	}
	cfg, err := store.GetConfig("toolbar")
	if err != nil {
		storeError(c, err)
		return
	}
	c.Data(http.StatusOK, "application/json; charset=utf-8", []byte(cfg))
}

func putToolbar(c *gin.Context) {
	if !requireStore(c) {
		return
	}
	if !requireCatalogEditor(c) {
		return
	}
	raw, err := c.GetRawData()
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	cfg, err := normalizeConfig(raw)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if err := store.PutConfig(cfg); err != nil {
		storeError(c, err)
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "saved"})
}

// ─── ИДЕНТИЧНОСТЬ (условная, dev) ────────────────────────────────────────────

func getMe(c *gin.Context) {
	u := currentUser(c)
	c.JSON(http.StatusOK, gin.H{
		"login":        u.Login,
		"display_name": u.DisplayName,
		"role":         u.Role,
		"roles":        []string{u.Role},
		"branch":       u.Branch,
		"provider":     "dev",
		"isDevAuth":    true,
	})
}

// listUsers — активные пользователи для dev-переключателя «Войти как…».
func listUsers(c *gin.Context) {
	if !requireStore(c) {
		return
	}
	users, err := store.ListUsers()
	if err != nil {
		storeError(c, err)
		return
	}
	c.JSON(http.StatusOK, gin.H{"users": users})
}

// ─── СОСТОЯНИЕ ПОЛЬЗОВАТЕЛЯ ──────────────────────────────────────────────────

func getUserState(c *gin.Context) {
	if !requireStore(c) {
		return
	}
	st, err := store.GetUserState(currentUser(c).Login, c.Param("key"))
	if err != nil {
		storeError(c, err)
		return
	}
	c.JSON(http.StatusOK, st)
}

func putUserState(c *gin.Context) {
	if !requireStore(c) {
		return
	}
	var in UserState
	if err := c.ShouldBindJSON(&in); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	ifMatch := 0
	if h := strings.TrimSpace(c.GetHeader("If-Match")); h != "" {
		ifMatch, _ = strconv.Atoi(strings.Trim(h, `"`))
	}

	login := currentUser(c).Login
	st, err := store.PutUserState(login, c.Param("key"), in, ifMatch)
	if err != nil {
		if errors.Is(err, errConflict) {
			current, _ := store.GetUserState(login, c.Param("key"))
			c.JSON(http.StatusConflict, gin.H{
				"error": "version conflict",
				"state": current,
			})
			return
		}
		if isValidationError(err) {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		storeError(c, err)
		return
	}
	c.JSON(http.StatusOK, st)
}
