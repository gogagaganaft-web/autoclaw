package main

import (
	"crypto/rand"
	"encoding/hex"
	"flag"
	"log"
	"net"
	"net/http"
	"os"
	"sync/atomic"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"goreport/internal/database"
	"goreport/internal/export"
	"goreport/internal/meminfo"
	"goreport/internal/service"
)

const defaultPort = "7504"
const serviceName = "GOREPORT_7504"
const serviceDisplayName = "GOREPORT Multi-DB (port 7504)"
const serviceDescription = "Universal multi-database report server with pivot and drilldown"

var activeRequests int64

func generateToken() (string, error) {
	b := make([]byte, 16)
	if _, err := rand.Read(b); err != nil {
		return "", err
	}
	return hex.EncodeToString(b), nil
}

func requestCounter(c *gin.Context) {
	atomic.AddInt64(&activeRequests, 1)
	defer atomic.AddInt64(&activeRequests, -1)
	c.Next()
}

func healthHandler(c *gin.Context) {
	sessionsMu.RLock()
	n := len(sessions)
	sessionsMu.RUnlock()
	c.JSON(http.StatusOK, gin.H{
		"status":   "ok",
		"load":     atomic.LoadInt64(&activeRequests),
		"sessions": n,
	})
}

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
	r.Use(requestCounter)

	r.GET("/api/health", healthHandler)

	reportGroup := r.Group("/api/report")
	{
		reportGroup.POST("/init", reportInitHandler)
		reportGroup.POST("/page", reportPageHandler)
		reportGroup.POST("/pivot", reportPivotHandler)
		reportGroup.POST("/pivot/count", reportPivotCountHandler)
		reportGroup.POST("/pivot/export", reportPivotExportHandler)
		reportGroup.POST("/drilldown", reportDrilldownHandler)
		reportGroup.POST("/distinct", reportDistinctHandler)
		reportGroup.POST("/close", reportCloseHandler)
		reportGroup.POST("/export", reportExportHandler)
	}
	r.GET("/api/mem", func(c *gin.Context) {
		rss := meminfo.RSSMB()
		total := meminfo.TotalMB()
		c.JSON(http.StatusOK, gin.H{"rssMB": rss, "totalMB": total, "percent": meminfo.Percent(rss, total)})
	})
	r.GET("/api/multi/progress", func(c *gin.Context) {
		requestID := c.Query("requestId")
		if requestID == "" {
			c.JSON(http.StatusBadRequest, gin.H{"error": "requestId is required"})
			return
		}
		p, ok := getProgress(requestID)
		if !ok {
			c.JSON(http.StatusNotFound, gin.H{"error": "progress not found"})
			return
		}
		c.JSON(http.StatusOK, p.snapshot())
	})
	r.GET("/api/export-download", func(c *gin.Context) {
		export.DownloadHandler(c.Writer, c.Request)
	})
	r.GET("/api/report/export/status", reportExportStatusHandler)

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
		log.Printf("Starting multi-DB server on :%s (HTTPS)", port)
	} else {
		log.Printf("SSL not configured, starting multi-DB server on :%s (HTTP)", port)
	}
	if addrs, err := net.InterfaceAddrs(); err == nil {
		for _, a := range addrs {
			if ipnet, ok := a.(*net.IPNet); ok && !ipnet.IP.IsLoopback() && ipnet.IP.To4() != nil {
				scheme := "http"
				if useSSL {
					scheme = "https"
				}
				log.Printf("  %s://%s:%s", scheme, ipnet.IP, port)
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
