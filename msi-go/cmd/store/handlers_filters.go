package main

import (
	"errors"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

// ─── HTTP: ФИЛЬТРЫ «КОНТУРА ДАННЫХ» ──────────────────────────────────────────

func filterError(c *gin.Context, err error) {
	switch {
	case errors.Is(err, errFilterNotFound):
		c.JSON(http.StatusNotFound, gin.H{"error": "filter not found"})
	case errors.Is(err, errConflict):
		c.JSON(http.StatusConflict, gin.H{"error": "filter with this field already exists"})
	default:
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	}
}

func listFilters(c *gin.Context) {
	if !requireStore(c) {
		return
	}
	list, err := store.ListFilters()
	if err != nil {
		storeError(c, err)
		return
	}
	c.JSON(http.StatusOK, gin.H{"filters": list, "total": len(list)})
}

func getFilter(c *gin.Context) {
	if !requireStore(c) {
		return
	}
	item, err := store.GetFilter(c.Param("field"))
	if err != nil {
		filterError(c, err)
		return
	}
	c.JSON(http.StatusOK, item)
}

func createFilter(c *gin.Context) {
	if !requireStore(c) {
		return
	}
	if !requireCatalogEditor(c) {
		return
	}
	var payload FilterPayload
	if err := c.ShouldBindJSON(&payload); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	payload.UpdatedBy = currentUser(c).Login

	item, err := store.CreateFilter(payload)
	if err != nil {
		filterError(c, err)
		return
	}
	c.JSON(http.StatusCreated, item)
}

func updateFilter(c *gin.Context) {
	if !requireStore(c) {
		return
	}
	if !requireCatalogEditor(c) {
		return
	}
	var payload FilterPayload
	if err := c.ShouldBindJSON(&payload); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	payload.UpdatedBy = currentUser(c).Login

	item, err := store.UpdateFilter(c.Param("field"), payload)
	if err != nil {
		filterError(c, err)
		return
	}
	c.JSON(http.StatusOK, item)
}

func deleteFilter(c *gin.Context) {
	if !requireStore(c) {
		return
	}
	if !requireCatalogEditor(c) {
		return
	}
	if err := store.DeleteFilter(c.Param("field"), currentUser(c).Login); err != nil {
		filterError(c, err)
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "deleted"})
}

func reorderFilters(c *gin.Context) {
	if !requireStore(c) {
		return
	}
	if !requireCatalogEditor(c) {
		return
	}
	var payload struct {
		Fields []string `json:"fields"`
	}
	if err := c.ShouldBindJSON(&payload); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	list, err := store.ReorderFilters(payload.Fields)
	if err != nil {
		filterError(c, err)
		return
	}
	c.JSON(http.StatusOK, gin.H{"filters": list})
}

func filterHistory(c *gin.Context) {
	if !requireStore(c) {
		return
	}
	limit, _ := strconv.Atoi(c.DefaultQuery("limit", "50"))

	list, err := store.FilterHistory(c.Param("field"), limit)
	if err != nil {
		storeError(c, err)
		return
	}
	c.JSON(http.StatusOK, gin.H{"revisions": list, "total": len(list)})
}
