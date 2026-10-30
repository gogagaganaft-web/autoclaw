package main

import (
	"flag"
	"log"
	"net/http"
	"os"
	"path/filepath"
	"time"

	"goreport/internal/database"
	"goreport/internal/service"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	_ "github.com/microsoft/go-mssqldb"
)

// Пятая служба msi-go: хранилище отчётов, панели фильтров и состояний видов.
// Данные отчётов (SQL) она не выполняет — это делают 7501/7502/7504.
const (
	defaultStorePort   = "7505"
	serviceName        = "GOREPORT_7505"
	serviceDisplayName = "GOREPORT Store (port 7505)"
	serviceDescription = "Хранилище отчётов, панели фильтров и состояний видов"
)

// exeDir — каталог исполняемого файла. Служба Windows стартует из System32,
// поэтому относительные пути и godotenv.Load() без аргументов там бесполезны:
// конфиг и лог должны лежать рядом с exe, как у остальных четырёх служб.
func exeDir() string {
	exe, err := os.Executable()
	if err != nil {
		return "."
	}
	return filepath.Dir(exe)
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

	dir := exeDir()

	// У службы нет консоли: без файла лога причина падения не видна вообще.
	if f, err := os.OpenFile(filepath.Join(dir, "server-7505.log"),
		os.O_CREATE|os.O_APPEND|os.O_WRONLY, 0o644); err == nil {
		log.SetOutput(f)
		defer f.Close()
	}

	if err := godotenv.Load(filepath.Join(dir, ".env")); err != nil {
		log.Printf("store: .env рядом с exe не найден (%s), используем окружение процесса", dir)
	}

	database.InitDB()

	if err := initStore(); err != nil {
		log.Fatalf("store: хранилище недоступно: %v", err)
	}

	gin.SetMode(gin.ReleaseMode)
	r := gin.Default()
	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"*"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization", "If-Match", "X-Dev-User"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: false,
		MaxAge:           12 * time.Hour,
	}))

	r.GET("/healthz", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{"status": "ok", "storage": store.Name()})
	})

	r.GET("/api/me", getMe)
	r.GET("/api/user-state/:key", getUserState)
	r.PUT("/api/user-state/:key", putUserState)

	r.GET("/api/reports", listReports)
	r.GET("/api/reports/:key", getReport)
	// Данные отчёта: подстановка фильтров и выполнение на выбранных базах.
	r.POST("/api/reports/:key/data", reportData)
	r.POST("/api/reports", createReport)
	r.PUT("/api/reports/:key", updateReport)
	r.DELETE("/api/reports/:key", deleteReport)

	r.POST("/api/items", listItems)

	r.GET("/api/meta/databases", listDatabases)

	r.GET("/api/toolbar", getToolbar)
	r.PUT("/api/toolbar", putToolbar)

	// Фильтры «Контура данных»: поштучный CRUD, порядок и история.
	r.POST("/api/filters/reorder", reorderFilters)
	r.GET("/api/filters", listFilters)
	r.POST("/api/filters", createFilter)
	r.GET("/api/filters/:field", getFilter)
	r.PUT("/api/filters/:field", updateFilter)
	r.DELETE("/api/filters/:field", deleteFilter)
	r.GET("/api/filters/:field/history", filterHistory)

	// Пользователи и наборы каталога.
	r.GET("/api/users", listUsers)
	r.GET("/api/bundles", listBundles)
	r.POST("/api/bundles", createBundle)
	r.POST("/api/bundles/import", importBundle)
	r.GET("/api/bundles/:id", getBundle)
	r.PUT("/api/bundles/:id", resnapshotBundle)
	r.DELETE("/api/bundles/:id", deleteBundle)
	r.GET("/api/bundles/:id/export", exportBundle)
	r.POST("/api/bundles/:id/apply", applyBundle)
	r.GET("/api/bundles/:id/log", bundleLogHandler)

	// Запросы: SQL, теги, состав фильтров, снимок колонок.
	r.GET("/api/queries", listQueries)
	r.POST("/api/queries", createQuery)
	r.GET("/api/queries/:key", getQuery)
	r.PUT("/api/queries/:key", updateQuery)
	r.DELETE("/api/queries/:key", deleteQuery)
	r.PUT("/api/queries/:key/columns", saveQueryColumns)
	r.GET("/api/queries/:key/history", queryHistory)

	port := os.Getenv("SERVER_PORT")
	if port == "" {
		port = defaultStorePort
	}

	httpServer := &http.Server{
		Addr:    "0.0.0.0:" + port,
		Handler: r,
	}

	log.Printf("report store on :%s (backend %s)", port, store.Name())

	go func() {
		if err := httpServer.ListenAndServe(); err != nil && err != http.ErrServerClosed {
			log.Fatalf("store: сервер остановлен: %v", err)
		}
	}()

	if service.ShouldRunAsService() {
		service.Run(serviceName, httpServer)
		return
	}

	select {}
}
