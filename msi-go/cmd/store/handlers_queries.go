package main

import (
	"errors"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

// ─── HTTP: ЗАПРОСЫ ──────────────────────────────────────────────────────────

func queryError(c *gin.Context, err error) {
	switch {
	case errors.Is(err, errQueryNotFound):
		c.JSON(http.StatusNotFound, gin.H{"error": "query not found"})
	case errors.Is(err, errConflict):
		c.JSON(http.StatusConflict, gin.H{"error": "query with this key already exists"})
	default:
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	}
}

func listQueries(c *gin.Context) {
	if !requireStore(c) {
		return
	}
	list, err := store.ListQueries()
	if err != nil {
		storeError(c, err)
		return
	}
	c.JSON(http.StatusOK, gin.H{"queries": list, "total": len(list)})
}

func getQuery(c *gin.Context) {
	if !requireStore(c) {
		return
	}
	item, err := store.GetQuery(c.Param("key"))
	if err != nil {
		queryError(c, err)
		return
	}
	c.JSON(http.StatusOK, item)
}

func createQuery(c *gin.Context) {
	if !requireStore(c) {
		return
	}
	if !requireCatalogEditor(c) {
		return
	}
	var payload QueryPayload
	if err := c.ShouldBindJSON(&payload); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	payload.UpdatedBy = currentUser(c).Login

	item, err := store.CreateQuery(payload)
	if err != nil {
		queryError(c, err)
		return
	}
	c.JSON(http.StatusCreated, item)
}

func updateQuery(c *gin.Context) {
	if !requireStore(c) {
		return
	}
	if !requireCatalogEditor(c) {
		return
	}
	var payload QueryPayload
	if err := c.ShouldBindJSON(&payload); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	payload.UpdatedBy = currentUser(c).Login

	item, err := store.UpdateQuery(c.Param("key"), payload)
	if err != nil {
		queryError(c, err)
		return
	}
	c.JSON(http.StatusOK, item)
}

func deleteQuery(c *gin.Context) {
	if !requireStore(c) {
		return
	}
	if !requireCatalogEditor(c) {
		return
	}
	if err := store.DeleteQuery(c.Param("key"), currentUser(c).Login); err != nil {
		queryError(c, err)
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "deleted"})
}

func saveQueryColumns(c *gin.Context) {
	if !requireStore(c) {
		return
	}
	if !requireCatalogEditor(c) {
		return
	}
	var payload QueryColumnsPayload
	if err := c.ShouldBindJSON(&payload); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	payload.Login = currentUser(c).Login

	item, err := store.SaveQueryColumns(c.Param("key"), payload)
	if err != nil {
		queryError(c, err)
		return
	}
	c.JSON(http.StatusOK, item)
}

func queryHistory(c *gin.Context) {
	if !requireStore(c) {
		return
	}
	limit, _ := strconv.Atoi(c.DefaultQuery("limit", "50"))

	list, err := store.QueryRevisions(c.Param("key"), limit)
	if err != nil {
		storeError(c, err)
		return
	}
	c.JSON(http.StatusOK, gin.H{"revisions": list, "total": len(list)})
}
