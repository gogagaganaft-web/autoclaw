package main

// Контекст пользователя и роли. Сейчас dev-режим: логин приходит в заголовке
// X-Dev-User (или из окружения службы), роль и филиал — из dbo.app_user.
// На проде логины придёт из синка с Bitrix24 (app_user.provider/bitrix_user_id),
// механика прав не меняется.

import (
	"net/http"
	"os"
	"strings"

	"github.com/gin-gonic/gin"
)

const (
	RoleSuperAdmin = "superadmin"
	RoleAdmin      = "admin"
	RoleUser       = "user"
)

// AppUser — строка dbo.app_user.
type AppUser struct {
	Login       string `json:"login"`
	DisplayName string `json:"display_name"`
	Role        string `json:"role_code"`
	Branch      string `json:"branch_code"` // '1'..'9', '' = не привязан
	Provider    string `json:"provider"`
}

// devLoginNow — откуда берём логин: заголовок подмены пользователя (dev),
// затем переменные окружения службы.
func devLoginNow(c *gin.Context) string {
	if v := strings.TrimSpace(c.GetHeader("X-Dev-User")); v != "" {
		return v
	}
	if v := strings.TrimSpace(os.Getenv("DEV_USER")); v != "" {
		return v
	}
	if v := strings.TrimSpace(os.Getenv("USERNAME")); v != "" {
		return v
	}
	return "Windows.User"
}

// currentUser грузит пользователя из app_user; неизвестный логин создаётся
// с минимальной ролью user (как раньше при сохранении видов).
func currentUser(c *gin.Context) AppUser {
	login := devLoginNow(c)
	u, err := store.GetUser(login)
	if err != nil || u == nil {
		_ = store.EnsureUser(login)
		u = &AppUser{Login: login, DisplayName: login, Role: RoleUser, Provider: "dev"}
	}
	if u.Provider == "" {
		u.Provider = "local"
	}
	return *u
}

func (u AppUser) IsSuperAdmin() bool { return u.Role == RoleSuperAdmin }
func (u AppUser) IsAdmin() bool      { return u.Role == RoleAdmin || u.IsSuperAdmin() }

// CanEditCatalog — фильтры и запросы общие: правят admin и superadmin.
func (u AppUser) CanEditCatalog() bool { return u.IsAdmin() }

// CanEditBranch — отчёты ветки филиала: superadmin — любые, admin — свой.
func (u AppUser) CanEditBranch(branch string) bool {
	if u.IsSuperAdmin() {
		return true
	}
	return u.Role == RoleAdmin && u.Branch != "" && u.Branch == branch
}

// AllowedDBKeys — базы, доступные пользователю. nil = все настроенные.
func (u AppUser) AllowedDBKeys() map[string]bool {
	if u.IsSuperAdmin() || u.Branch == "" {
		return nil
	}
	return map[string]bool{
		"DB" + u.Branch + "UL": true,
		"DB" + u.Branch + "FL": true,
	}
}

// requireRole отвечает 403 и false, если роль не входит в список.
func requireRole(c *gin.Context, user AppUser, roles ...string) bool {
	for _, r := range roles {
		if user.Role == r {
			return true
		}
	}
	c.JSON(http.StatusForbidden, gin.H{
		"error": "недостаточно прав: требуется роль " + strings.Join(roles, " или "),
	})
	return false
}

// requireCatalogEditor — мутации общих фильтров/запросов/панели: admin и выше.
func requireCatalogEditor(c *gin.Context) bool {
	u := currentUser(c)
	if u.CanEditCatalog() {
		return true
	}
	c.JSON(http.StatusForbidden, gin.H{
		"error": "недостаточно прав: фильтры и запросы правят администраторы",
	})
	return false
}
