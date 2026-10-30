package main

import (
	"flag"
	"fmt"
	"log"
	"net"
	"net/http"
	"os"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"goreport/internal/database"
	"goreport/internal/meminfo"
	"goreport/internal/service"
)

const defaultPort = "7503"
const serviceName = "GOREPORT_7503"
const serviceDisplayName = "GOREPORT Preload (port 7503)"
const serviceDescription = "Background tree preloading for address trees"

type Query struct {
	DBName string `json:"dbName"`
	SQL    string `json:"sql"`
}

type MultiQuery struct {
	DBNames []string `json:"dbNames"`
	SQL     string   `json:"sql"`
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

	r.POST("/api/tree-find-all", func(c *gin.Context) {
		var mq MultiQuery
		if err := c.ShouldBindJSON(&mq); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		type queryResult struct {
			DB  string
			QR  database.QueryResult
			Err error
		}

		ch := make(chan queryResult, len(mq.DBNames))
		ctx := c.Request.Context()
		for _, db := range mq.DBNames {
			go func(name string) {
				qr, err := database.ExecuteQueryContext(ctx, name, mq.SQL)
				ch <- queryResult{DB: name, QR: qr, Err: err}
			}(db)
		}

		nodes := make([]map[string]interface{}, 0)
		for range mq.DBNames {
			result := <-ch
			if result.Err != nil {
				log.Printf("Error querying DB %s: %v", result.DB, result.Err)
				continue
			}

			displayName := database.GetDBDisplayName(result.DB)

			for _, row := range result.QR.Rows {
				node := make(map[string]interface{})
				for j, col := range result.QR.Columns {
					if val, ok := row[j].([]byte); ok {
						node[col] = string(val)
					} else {
						node[col] = row[j]
					}
				}
				node["_db"] = displayName
				node["_dbId"] = result.DB

				if _, ok := node["ID"]; !ok {
					log.Printf("Missing ID field in node from DB %s", result.DB)
					continue
				}
				node["_uniqueId"] = fmt.Sprintf("%s_%v", result.DB, node["ID"])

				nodes = append(nodes, node)
			}
		}

		hierarchy := buildHierarchy(nodes)
		c.JSON(http.StatusOK, gin.H{
			"nodes":     nodes,
			"hierarchy": hierarchy,
		})
	})

	return r
}

func buildHierarchy(nodes []map[string]interface{}) []map[string]interface{} {
	byParent := make(map[string][]map[string]interface{})
	roots := make([]map[string]interface{}, 0)

	log.Printf("Building hierarchy from %d nodes", len(nodes))

	for _, n := range nodes {
		pid, ok := n["PARENT"].(string)
		if !ok {
			if pidNum, ok := n["PARENT"].(int64); ok {
				pid = fmt.Sprintf("%d", pidNum)
			} else {
				log.Printf("Invalid PARENT type in node %v", n["_uniqueId"])
				continue
			}
		}

		key := fmt.Sprintf("%v_%s", n["_dbId"], pid)
		byParent[key] = append(byParent[key], n)

		if pid == "-10" || pid == "-10.0" {
			roots = append(roots, n)
		}
	}

	log.Printf("Found %d root nodes", len(roots))

	queue := make([]map[string]interface{}, len(roots))
	copy(queue, roots)

	for len(queue) > 0 {
		cur := queue[0]
		queue = queue[1:]
		uid := fmt.Sprintf("%v", cur["_uniqueId"])

		if children, ok := byParent[uid]; ok {
			cur["children"] = children
			queue = append(queue, children...)
		}
	}

	return roots
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
		log.Printf("Starting preload server on :%s (HTTPS)", port)
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
