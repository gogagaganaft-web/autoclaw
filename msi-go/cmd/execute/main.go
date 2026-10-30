package main

import (
	"context"
	"encoding/json"
	"errors"
	"flag"
	"fmt"
	"log"
	"net"
	"net/http"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/xuri/excelize/v2"

	"goreport/internal/database"
	"goreport/internal/export"
	"goreport/internal/meminfo"
	"goreport/internal/service"
)

const defaultPort = "7501"
const serviceName = "GOREPORT_7501"
const serviceDisplayName = "GOREPORT Execute (port 7501)"
const serviceDescription = "Light SQL queries, filters, trees, Excel export"

type Query struct {
	Name   string `json:"name"`
	DBName string `json:"dbName"`
	SQL    string `json:"sql"`
}

type MultiQuery struct {
	DBNames    []string `json:"dbNames"`
	SQL        string   `json:"sql"`
	ReportName string   `json:"reportName,omitempty"`
}

type SavedQueries struct {
	Queries []Query `json:"queries"`
}

type DeleteQueryRequest struct {
	Name string `json:"name"`
}

// mapRows — источник строк для export из данных, присланных клиентом
// ([]map[string]interface{} по dataField).
type mapRows struct {
	columns    []string
	fieldNames []string
	data       []map[string]interface{}
}

func (m *mapRows) Titles() []string { return m.columns }
func (m *mapRows) TotalRows() int64 { return int64(len(m.data)) }
func (m *mapRows) Fetch(_ context.Context, offset, limit int64) ([][]interface{}, error) {
	if offset >= int64(len(m.data)) {
		return [][]interface{}{}, nil
	}
	end := offset + limit
	if end > int64(len(m.data)) {
		end = int64(len(m.data))
	}
	out := make([][]interface{}, 0, end-offset)
	for _, row := range m.data[offset:end] {
		vals := make([]interface{}, len(m.fieldNames))
		for i, f := range m.fieldNames {
			if v, ok := row[f]; ok {
				vals[i] = v
			} else {
				vals[i] = ""
			}
		}
		out = append(out, vals)
	}
	return out, nil
}

type SaveFileRequest struct {
	Path    string `json:"path"`
	Content string `json:"content"`
}

type ExecSelectRequest struct {
	DBName string `json:"dbName"`
	SQL    string `json:"sql"`
}

type SelectItem struct {
	ID   interface{} `json:"id"`
	Name string      `json:"name"`
}

var FRONTEND_DATA_DIR string

func init() {
	// Приоритет: FRONTEND_DATA_DIR > FRONTEND_DATA_DIR_WINDOWS/FRONTEND_DATA_DIR_LINUX > встроенный дефолт
	FRONTEND_DATA_DIR = os.Getenv("FRONTEND_DATA_DIR")
	if FRONTEND_DATA_DIR == "" {
		if runtime.GOOS == "windows" {
			FRONTEND_DATA_DIR = os.Getenv("FRONTEND_DATA_DIR_WINDOWS")
			if FRONTEND_DATA_DIR == "" {
				FRONTEND_DATA_DIR = `C:\xampp\htdocs\report\data`
			}
		} else {
			FRONTEND_DATA_DIR = os.Getenv("FRONTEND_DATA_DIR_LINUX")
			if FRONTEND_DATA_DIR == "" {
				FRONTEND_DATA_DIR = `/var/www/html/report/data`
			}
		}
	}
	if err := os.MkdirAll(FRONTEND_DATA_DIR, 0755); err != nil {
		log.Printf("FRONTEND_DATA_DIR: невозможно создать %s: %v", FRONTEND_DATA_DIR, err)
	} else {
		log.Printf("FRONTEND_DATA_DIR = %s", FRONTEND_DATA_DIR)
	}
}

// resolveDataPath — путь для save-file/load-file.
// Абсолютный путь (фронт сам знает свой data-каталог через FRONTEND_DATA_DIR app_*.js)
// используется как есть; относительный — складывается с FRONTEND_DATA_DIR сервера.
// Запрещены "..", пустые и некорректные пути.
func resolveDataPath(rel string) (string, error) {
	if rel == "" {
		return "", errors.New("пустой путь")
	}
	cleaned := filepath.Clean(filepath.FromSlash(rel))
	if cleaned == "." || cleaned == ".." || strings.HasPrefix(cleaned, ".."+string(filepath.Separator)) {
		return "", errors.New("недопустимый путь")
	}
	if filepath.IsAbs(cleaned) {
		return cleaned, nil
	}
	return filepath.Join(FRONTEND_DATA_DIR, cleaned), nil
}

func saveQueries(sq *SavedQueries) error {
	out, err := json.MarshalIndent(sq, "", "  ")
	if err != nil {
		return err
	}
	return os.WriteFile("queries.json", out, 0644)
}

func saveQuery(q Query) error {
	var sq SavedQueries
	if data, err := os.ReadFile("queries.json"); err == nil {
		_ = json.Unmarshal(data, &sq)
	}
	replaced := false
	for i, v := range sq.Queries {
		if v.Name == q.Name {
			sq.Queries[i] = q
			replaced = true
			break
		}
	}
	if !replaced {
		sq.Queries = append(sq.Queries, q)
	}
	return saveQueries(&sq)
}

func loadQueries() (SavedQueries, error) {
	var sq SavedQueries
	if data, err := os.ReadFile("queries.json"); err == nil {
		err = json.Unmarshal(data, &sq)
		return sq, err
	}
	return sq, nil
}

func createRouter() *gin.Engine {
	gin.SetMode(gin.ReleaseMode)
	r := gin.Default()

	r.Use(cors.New(cors.Config{
		AllowOrigins: []string{"*"},
		AllowMethods: []string{"GET", "POST", "OPTIONS"},
		AllowHeaders: []string{"Origin", "Content-Type"},
		ExposeHeaders:    []string{"Content-Length"},
		MaxAge: 12 * time.Hour,
	}))

	r.GET("/api/mem", func(c *gin.Context) {
		rss := meminfo.RSSMB()
		total := meminfo.TotalMB()
		c.JSON(http.StatusOK, gin.H{"rssMB": rss, "totalMB": total, "percent": meminfo.Percent(rss, total)})
	})

	r.GET("/api/db-status", func(c *gin.Context) {
		ctx, cancel := context.WithTimeout(c.Request.Context(), 20*time.Second)
		defer cancel()
		statuses := database.CheckAllDBs(ctx, 5*time.Second)
		c.JSON(http.StatusOK, gin.H{
			"statuses":  statuses,
			"checkedAt": time.Now().Format(time.RFC3339),
		})
	})

	r.POST("/api/execute", func(c *gin.Context) {
		var q Query
		if err := c.ShouldBindJSON(&q); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		res, err := database.ExecuteQueryContext(c.Request.Context(), q.DBName, q.SQL)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		c.JSON(http.StatusOK, res)
	})

	r.POST("/api/execute-multi", func(c *gin.Context) {
		var mq MultiQuery
		if err := c.ShouldBindJSON(&mq); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		type res struct {
			DB string
			QR database.QueryResult
		}
		ch := make(chan res, len(mq.DBNames))
		ctx := c.Request.Context()

		for _, db := range mq.DBNames {
			go func(name string) {
				log.Printf("Запрос для DB: %s", name)
				qr, err := database.ExecuteQueryContext(ctx, name, mq.SQL)
				if err != nil {
					log.Printf("Ошибка запроса DB %s: %v", name, err)
				} else if qr.Error != "" {
					log.Printf("Ошибка запроса DB %s: %s", name, qr.Error)
				}
				ch <- res{DB: name, QR: qr}
			}(db)
		}

		hasReportName := mq.ReportName != ""
		cols := []string{}
		if hasReportName {
			cols = append(cols, "Отчет")
		}
		cols = append(cols, "Филиал")
		colBaseLen := len(cols)
		rows := [][]interface{}{}
		for i := 0; i < len(mq.DBNames); i++ {
			r := <-ch
			if len(r.QR.Columns) > 0 && len(cols) == colBaseLen {
				cols = append(cols, r.QR.Columns...)
			}
			dbDisplay := database.GetDBDisplayName(r.DB)
			for _, row := range r.QR.Rows {
				finalRow := []interface{}{}
				if hasReportName {
					finalRow = append(finalRow, mq.ReportName)
				}
				finalRow = append(finalRow, dbDisplay)
				finalRow = append(finalRow, row...)
				rows = append(rows, finalRow)
			}
		}
		c.JSON(http.StatusOK, database.QueryResult{Columns: cols, Rows: rows})
	})

	r.POST("/api/exec-select", func(c *gin.Context) {
		var req ExecSelectRequest
		if err := c.ShouldBindJSON(&req); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		qr, err := database.ExecuteQueryContext(c.Request.Context(), req.DBName, req.SQL)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		if qr.Error != "" {
			c.JSON(http.StatusOK, gin.H{"error": qr.Error, "items": []SelectItem{}})
			return
		}
		items := []SelectItem{}
		for _, row := range qr.Rows {
			if len(row) >= 2 {
				items = append(items, SelectItem{ID: row[0], Name: fmt.Sprintf("%v", row[1])})
			}
		}
		c.JSON(http.StatusOK, gin.H{"items": items})
	})

	r.POST("/api/save-file", func(c *gin.Context) {
		var req SaveFileRequest
		if err := c.ShouldBindJSON(&req); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		fullPath, err := resolveDataPath(req.Path)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		if err := os.MkdirAll(filepath.Dir(fullPath), 0755); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		if err := os.WriteFile(fullPath, []byte(req.Content), 0644); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		c.JSON(http.StatusOK, gin.H{"message": "saved"})
	})

	r.GET("/api/load-file", func(c *gin.Context) {
		path := c.Query("path")
		if path == "" {
			c.JSON(http.StatusBadRequest, gin.H{"error": "path param required"})
			return
		}
		fullPath, err := resolveDataPath(path)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		data, err := os.ReadFile(fullPath)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		c.JSON(http.StatusOK, gin.H{"content": string(data)})
	})

	r.POST("/api/save", func(c *gin.Context) {
		var q Query
		if err := c.ShouldBindJSON(&q); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		if err := saveQuery(q); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		c.JSON(http.StatusOK, gin.H{"message": "saved"})
	})

	r.GET("/api/queries", func(c *gin.Context) {
		sq, err := loadQueries()
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		c.JSON(http.StatusOK, sq)
	})

	r.POST("/api/delete-query", func(c *gin.Context) {
		var req DeleteQueryRequest
		if err := c.ShouldBindJSON(&req); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		sq, err := loadQueries()
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		found := false
		for i, v := range sq.Queries {
			if v.Name == req.Name {
				sq.Queries = append(sq.Queries[:i], sq.Queries[i+1:]...)
				found = true
				break
			}
		}
		if !found {
			c.JSON(http.StatusNotFound, gin.H{"error": "not found"})
			return
		}
		if err := saveQueries(&sq); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		c.JSON(http.StatusOK, gin.H{"message": "deleted"})
	})

	r.POST("/api/export-excel", func(c *gin.Context) {
		var request struct {
			Data    []map[string]interface{} `json:"data"`
			Columns []struct {
				DataField string `json:"dataField"`
				Caption   string `json:"caption"`
			} `json:"columns"`
		}

		if err := c.ShouldBindJSON(&request); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request format"})
			return
		}

		if len(request.Data) == 0 || len(request.Columns) == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "No data or columns provided"})
			return
		}

		f := excelize.NewFile()
		sheet := "Data"
		f.NewSheet(sheet)
		f.DeleteSheet("Sheet1")

		headers := make([]interface{}, len(request.Columns))
		for i, col := range request.Columns {
			if col.Caption != "" {
				headers[i] = col.Caption
			} else {
				headers[i] = col.DataField
			}
		}
		f.SetSheetRow(sheet, "A1", &headers)

		for rowIdx, row := range request.Data {
			values := make([]interface{}, len(request.Columns))
			for i, col := range request.Columns {
				if val, exists := row[col.DataField]; exists {
					values[i] = val
				} else {
					values[i] = ""
				}
			}
			f.SetSheetRow(sheet, fmt.Sprintf("A%d", rowIdx+2), &values)
		}

		for i := range request.Columns {
			colName, _ := excelize.ColumnNumberToName(i + 1)
			f.SetColWidth(sheet, colName, colName, 20)
		}

		c.Header("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
		c.Header("Content-Disposition", "attachment; filename=export.xlsx")

		if err := f.Write(c.Writer); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to generate Excel file"})
		}
	})

	r.POST("/api/export", func(c *gin.Context) {
		var request struct {
			Data     []map[string]interface{} `json:"data"`
			Columns  []struct {
				DataField string `json:"dataField"`
				Caption   string `json:"caption"`
			} `json:"columns"`
			ReportName string `json:"reportName"`
		}

		if err := c.ShouldBindJSON(&request); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request format"})
			return
		}
		if len(request.Data) == 0 || len(request.Columns) == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "No data or columns provided"})
			return
		}

		titles := make([]string, len(request.Columns))
		fields := make([]string, len(request.Columns))
		for i, col := range request.Columns {
			if col.Caption != "" {
				titles[i] = col.Caption
			} else {
				titles[i] = col.DataField
			}
			fields[i] = col.DataField
		}

		// до 1 млн — прямой XLSX в ответ (как раньше), без архива
		if int64(len(request.Data)) <= export.MaxRowsForExcel {
			f := excelize.NewFile()
			sheet := "Data"
			f.NewSheet(sheet)
			f.DeleteSheet("Sheet1")

			headers := make([]interface{}, len(request.Columns))
			for i, col := range request.Columns {
				if col.Caption != "" {
					headers[i] = col.Caption
				} else {
					headers[i] = col.DataField
				}
			}
			f.SetSheetRow(sheet, "A1", &headers)

			for rowIdx, row := range request.Data {
				values := make([]interface{}, len(request.Columns))
				for i, col := range request.Columns {
					if val, exists := row[col.DataField]; exists {
						values[i] = val
					} else {
						values[i] = ""
					}
				}
				f.SetSheetRow(sheet, fmt.Sprintf("A%d", rowIdx+2), &values)
			}

			for i := range request.Columns {
				colName, _ := excelize.ColumnNumberToName(i + 1)
				f.SetColWidth(sheet, colName, colName, 20)
			}

			c.Header("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
			c.Header("Content-Disposition", "attachment; filename=export.xlsx")
			if err := f.Write(c.Writer); err != nil {
				c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to generate Excel file"})
			}
			return
		}

		// более 1 млн — CSV-части по 1 млн, каждая в своём ZIP
		reportName := request.ReportName
		if reportName == "" {
			reportName = "Отчет"
		}
		manifest, err := export.Generate(c.Request.Context(), &mapRows{
			columns:    titles,
			fieldNames: fields,
			data:       request.Data,
		}, reportName, nil)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		c.JSON(http.StatusOK, manifest)
	})

	r.GET("/api/export-download", func(c *gin.Context) {
		export.DownloadHandler(c.Writer, c.Request)
	})

	return r
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
		log.Printf("Starting execute server on :%s (HTTPS)", port)
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
