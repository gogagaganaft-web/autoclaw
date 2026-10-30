package main

import (
	"context"
	"crypto/rand"
	"encoding/hex"
	"encoding/json"
	"flag"
	"fmt"
	"log"
	"net"
	"net/http"
	"os"
	"strings"
	"sync"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"goreport/internal/database"
	"goreport/internal/export"
	"goreport/internal/meminfo"
	"goreport/internal/service"
)

const defaultPort = "7502"
const serviceName = "GOREPORT_7502"
const serviceDisplayName = "GOREPORT Report (port 7502)"
const serviceDescription = "Big report server with server-side filter/sort/distinct"

type MultiQuery struct {
	DBNames []string `json:"dbNames"`
	SQL     string   `json:"sql"`
}

type ReportSession struct {
	Columns    []string
	Rows       [][]interface{}
	TotalRows  int
	CreatedAt  time.Time
	LastAccess time.Time
}

var (
	reportSessions     = make(map[string]*ReportSession)
	reportSessionsMu   sync.RWMutex
	sessionCleanupOnce sync.Once
)

const sessionTTL = 1 * time.Hour
const cleanupInterval = 30 * time.Minute

func startSessionCleanup() {
	sessionCleanupOnce.Do(func() {
		go func() {
			for {
				time.Sleep(cleanupInterval)
				reportSessionsMu.Lock()
				now := time.Now()
				for token, s := range reportSessions {
					if now.Sub(s.LastAccess) > sessionTTL {
						delete(reportSessions, token)
						log.Printf("Session %s expired, deleted", token[:8]+"...")
					}
				}
				reportSessionsMu.Unlock()
			}
		}()
	})
}

func generateToken() (string, error) {
	b := make([]byte, 16)
	if _, err := rand.Read(b); err != nil {
		return "", err
	}
	return hex.EncodeToString(b), nil
}

type ReportInitRequest struct {
	DBNames    json.RawMessage `json:"dbNames"`
	SQL        string          `json:"sql"`
	ReportName string          `json:"reportName"`
}

type ReportPageRequest struct {
	Token    string          `json:"token"`
	Page     int             `json:"page"`
	PageSize int             `json:"pageSize"`
	Filter   json.RawMessage `json:"filter"`
	Sort     json.RawMessage `json:"sort"`
}

type ReportAllRequest struct {
	Token string `json:"token"`
}

type ReportDistinctRequest struct {
	Token     string          `json:"token"`
	FieldName string          `json:"fieldName"`
	Filter    json.RawMessage `json:"filter"`
}

type ReportCloseRequest struct {
	Token string `json:"token"`
}

const reportDefaultPageSize = 100
const reportMaxPageSize = 100000

func createRouter() *gin.Engine {
	gin.SetMode(gin.ReleaseMode)
	r := gin.Default()

	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"*"},
		AllowMethods:     []string{"GET", "POST", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: false,
		MaxAge:           12 * time.Hour,
	}))

	reportGroup := r.Group("/api/report")
	{
		reportGroup.POST("/init", reportInitHandler)
		reportGroup.POST("/page", reportPageHandler)
		reportGroup.POST("/all", reportAllHandler)
		reportGroup.POST("/distinct", reportDistinctHandler)
		reportGroup.POST("/close", reportCloseHandler)
		reportGroup.POST("/export", reportExportHandler)
	}
	r.GET("/api/mem", func(c *gin.Context) {
		rss := meminfo.RSSMB()
		total := meminfo.TotalMB()
		c.JSON(http.StatusOK, gin.H{"rssMB": rss, "totalMB": total, "percent": meminfo.Percent(rss, total)})
	})
	r.GET("/api/export-download", func(c *gin.Context) {
		export.DownloadHandler(c.Writer, c.Request)
	})
	r.GET("/api/report/export/status", reportExportStatusHandler)

	return r
}

func reportInitHandler(c *gin.Context) {
	var req ReportInitRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// dbNames может быть строкой (одна БД) или массивом (несколько БД)
	var dbNames []string
	raw := strings.TrimSpace(string(req.DBNames))
	if raw == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "dbNames is required"})
		return
	}
	if strings.HasPrefix(raw, "[") {
		if err := json.Unmarshal(req.DBNames, &dbNames); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "dbNames must be string or array"})
			return
		}
	} else {
		var single string
		if err := json.Unmarshal(req.DBNames, &single); err != nil || single == "" {
			c.JSON(http.StatusBadRequest, gin.H{"error": "dbNames must be string or array"})
			return
		}
		dbNames = []string{single}
	}
	if len(dbNames) == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "dbNames is required"})
		return
	}

	ctx := c.Request.Context()

	type dbResult struct {
		db string
		qr database.QueryResult
	}
	ch := make(chan dbResult, len(dbNames))
	for _, db := range dbNames {
		go func(name string) {
			qr, err := database.ExecuteQueryContext(ctx, name, req.SQL)
			if err != nil {
				log.Printf("Error querying DB %s: %v", name, err)
			} else if qr.Error != "" {
				log.Printf("Query error DB %s: %s", name, qr.Error)
			}
			ch <- dbResult{db: name, qr: qr}
		}(db)
	}

	columns := []string{"Отчет", "Филиал"}
	var allRows [][]interface{}
	for i := 0; i < len(dbNames); i++ {
		r := <-ch
		if len(r.qr.Columns) > 0 && len(columns) == 2 {
			columns = append(columns, r.qr.Columns...)
		}
		displayName := database.GetDBDisplayName(r.db)
		for _, row := range r.qr.Rows {
			prefixed := make([]interface{}, 0, len(row)+2)
			prefixed = append(prefixed, req.ReportName, displayName)
			prefixed = append(prefixed, row...)
			allRows = append(allRows, prefixed)
		}
	}

	if len(allRows) == 0 {
		c.JSON(http.StatusOK, gin.H{
			"token":     "",
			"columns":   columns,
			"totalRows": 0,
		})
		return
	}

	token, err := generateToken()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to generate token"})
		return
	}

	reportSessionsMu.Lock()
	reportSessions[token] = &ReportSession{
		Columns:    columns,
		Rows:       allRows,
		TotalRows:  len(allRows),
		CreatedAt:  time.Now(),
		LastAccess: time.Now(),
	}
	reportSessionsMu.Unlock()

	log.Printf("Report init: token=%s, DBs=%d (%v), columns=%d, rows=%d",
		token[:8]+"...", len(dbNames), dbNames, len(columns), len(allRows))

	c.JSON(http.StatusOK, gin.H{
		"token":     token,
		"columns":   columns,
		"totalRows": len(allRows),
	})
}

func reportPageHandler(c *gin.Context) {
	var req ReportPageRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	reportSessionsMu.RLock()
	session, ok := reportSessions[req.Token]
	if !ok {
		reportSessionsMu.RUnlock()
		c.JSON(http.StatusNotFound, gin.H{"error": "Session not found or expired"})
		return
	}
	session.LastAccess = time.Now()
	reportSessionsMu.RUnlock()

	filtered := session.Rows

	if req.Filter != nil && string(req.Filter) != "null" {
		matcher, err := parseFilter(req.Filter, session.Columns)
		if err == nil && matcher != nil {
			var result [][]interface{}
			for _, row := range filtered {
				if matcher(row) {
					result = append(result, row)
				}
			}
			filtered = result
		}
	}

	if req.Sort != nil && string(req.Sort) != "null" {
		if err := applySort(filtered, session.Columns, req.Sort); err != nil {
			log.Printf("Sort error: %v", err)
		}
	}

	totalRows := len(filtered)

	page := req.Page
	if page < 1 {
		page = 1
	}
	pageSize := req.PageSize
	if pageSize < 1 {
		pageSize = reportDefaultPageSize
	} else if pageSize > reportMaxPageSize {
		pageSize = reportMaxPageSize
	}

	start := (page - 1) * pageSize
	end := start + pageSize
	if end > totalRows {
		end = totalRows
	}
	if start > totalRows {
		start = totalRows
	}

	totalPages := 0
	if pageSize > 0 {
		totalPages = (totalRows + pageSize - 1) / pageSize
	}

	c.JSON(http.StatusOK, gin.H{
		"rows":       filtered[start:end],
		"totalRows":  totalRows,
		"page":       page,
		"pageSize":   pageSize,
		"totalPages": totalPages,
	})
}

func reportAllHandler(c *gin.Context) {
	var req ReportAllRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	reportSessionsMu.RLock()
	session, ok := reportSessions[req.Token]
	if ok {
		session.LastAccess = time.Now()
	}
	reportSessionsMu.RUnlock()

	if !ok {
		c.JSON(http.StatusNotFound, gin.H{"error": "Session not found or expired"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"columns":   session.Columns,
		"rows":      session.Rows,
		"totalRows": session.TotalRows,
	})
}

func reportDistinctHandler(c *gin.Context) {
	var req ReportDistinctRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	reportSessionsMu.RLock()
	session, ok := reportSessions[req.Token]
	if !ok {
		reportSessionsMu.RUnlock()
		c.JSON(http.StatusNotFound, gin.H{"error": "Session not found or expired"})
		return
	}
	session.LastAccess = time.Now()
	reportSessionsMu.RUnlock()

	colIndex := -1
	for i, col := range session.Columns {
		if col == req.FieldName {
			colIndex = i
			break
		}
	}
	if colIndex < 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": fmt.Sprintf("Column %s not found", req.FieldName)})
		return
	}

	filtered := session.Rows
	if req.Filter != nil && string(req.Filter) != "null" {
		matcher, err := parseFilter(req.Filter, session.Columns)
		if err == nil && matcher != nil {
			var result [][]interface{}
			for _, row := range filtered {
				if matcher(row) {
					result = append(result, row)
				}
			}
			filtered = result
		}
	}

	values := getDistinctValues(filtered, colIndex)

	c.JSON(http.StatusOK, gin.H{
		"values": values,
	})
}

func reportCloseHandler(c *gin.Context) {
	var req ReportCloseRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	reportSessionsMu.Lock()
	delete(reportSessions, req.Token)
	reportSessionsMu.Unlock()

	log.Printf("Session %s closed", req.Token[:8]+"...")
	c.JSON(http.StatusOK, gin.H{"message": "closed"})
}

// sessionRows — источник строк для экспорта из сессии в памяти.
type sessionRows struct {
	columns []string
	rows    [][]interface{}
}

func (s *sessionRows) Titles() []string      { return s.columns }
func (s *sessionRows) TotalRows() int64      { return int64(len(s.rows)) }
func (s *sessionRows) Fetch(_ context.Context, offset, limit int64) ([][]interface{}, error) {
	if offset >= int64(len(s.rows)) {
		return [][]interface{}{}, nil
	}
	end := offset + limit
	if end > int64(len(s.rows)) {
		end = int64(len(s.rows))
	}
	return s.rows[offset:end], nil
}

type ReportExportRequest struct {
	Token      string `json:"token"`
	ReportName string `json:"reportName"`
}

func reportExportHandler(c *gin.Context) {
	var req ReportExportRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	reportSessionsMu.RLock()
	session, ok := reportSessions[req.Token]
	if ok {
		session.LastAccess = time.Now()
	}
	reportSessionsMu.RUnlock()

	if !ok {
		c.JSON(http.StatusNotFound, gin.H{"error": "Session not found or expired"})
		return
	}

	name := req.ReportName
	if name == "" {
		name = "Отчет"
	}
	jobID := export.StartJob(func(progress func(done, total int)) (*export.Manifest, error) {
		return export.Generate(context.Background(), &sessionRows{
			columns: session.Columns,
			rows:    session.Rows,
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

func main() {
	install := flag.Bool("install", false, "Install Windows service")
	remove := flag.Bool("remove", false, "Remove Windows service")
	flag.Parse()

	if *install {
		if err := service.Install(service.Config{
			Name:        serviceName,
			DisplayName: serviceDisplayName,
			Description: serviceDescription,
		}); err != nil {
			log.Fatalf("Failed to install service: %v", err)
		}
		log.Printf("Service %s installed successfully", serviceName)
		return
	}

	if *remove {
		if err := service.Remove(serviceName); err != nil {
			log.Fatalf("Failed to remove service: %v", err)
		}
		log.Printf("Service %s removed successfully", serviceName)
		return
	}

	database.InitDB()
	startSessionCleanup()
	export.Ensure("")

	port := os.Getenv("SERVER_PORT")
	if port == "" {
		port = defaultPort
	}

	router := createRouter()
	httpServer := &http.Server{
		Addr:    "0.0.0.0:" + port,
		Handler: router,
	}

	sslCert := os.Getenv("SSL_CERT_PATH")
	sslKey := os.Getenv("SSL_KEY_PATH")
	useSSL := sslCert != "" && sslKey != ""

	if useSSL {
		log.Printf("Starting report server on :%s (HTTPS)", port)
		if addrs, err := net.InterfaceAddrs(); err == nil {
			for _, a := range addrs {
				if ipnet, ok := a.(*net.IPNet); ok && !ipnet.IP.IsLoopback() && ipnet.IP.To4() != nil {
					log.Printf("  https://%s:%s", ipnet.IP, port)
				}
			}
		}
	} else {
		log.Printf("SSL not configured, starting HTTP on :%s", port)
		if addrs, err := net.InterfaceAddrs(); err == nil {
			for _, a := range addrs {
				if ipnet, ok := a.(*net.IPNet); ok && !ipnet.IP.IsLoopback() && ipnet.IP.To4() != nil {
					log.Printf("  http://%s:%s", ipnet.IP, port)
				}
			}
		}
	}

	go func() {
		var err error
		if useSSL {
			err = httpServer.ListenAndServeTLS(sslCert, sslKey)
		} else {
			err = httpServer.ListenAndServe()
		}
		if err != nil && err != http.ErrServerClosed {
			log.Fatalf("ListenAndServe error: %v", err)
		}
	}()

	if service.ShouldRunAsService() {
		service.Run(serviceName, httpServer)
		return
	}

	select {}
}
