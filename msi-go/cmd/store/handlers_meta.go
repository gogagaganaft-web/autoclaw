package main

import (
	"net/http"

	"goreport/internal/database"

	"github.com/gin-gonic/gin"
)

// dbKeys — те же 18 логических баз, что видит остальной msi-go.
var dbKeys = []string{
	"DB1UL", "DB2UL", "DB3UL", "DB4UL", "DB5UL", "DB6UL", "DB7UL", "DB8UL", "DB9UL",
	"DB1FL", "DB2FL", "DB3FL", "DB4FL", "DB5FL", "DB6FL", "DB7FL", "DB8FL", "DB9FL",
}

// listDatabases — список баз, настроенных в .env. Фронт использует его для
// фильтров «БД_ЮЛ» / «БД_ФЛ» и для выбора базы при выполнении отчёта.
func listDatabases(c *gin.Context) {
	// SuperAdmin видит все настроенные базы (сводные по филиалам);
	// admin/user — только ЮЛ и ФЛ своего филиала.
	allowed := currentUser(c).AllowedDBKeys()
	list := make([]gin.H, 0, len(dbKeys))
	for _, key := range dbKeys {
		if allowed != nil && !allowed[key] {
			continue
		}
		cfg, ok := database.GetDBConfig(key)
		if !ok || cfg.Server == "" {
			continue
		}
		list = append(list, gin.H{
			"id":       key,
			"name":     database.GetDBDisplayName(key),
			"server":   cfg.Server,
			"database": cfg.Database,
		})
	}
	c.JSON(http.StatusOK, gin.H{"databases": list})
}
