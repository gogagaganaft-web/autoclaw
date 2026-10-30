package database

import (
	"context"
	"database/sql"
	"log"
	"sort"
	"sync"
	"time"
)

// DBStatus — результат проверки подключения к одной БД.
type DBStatus struct {
	Name    string `json:"name"`
	Display string `json:"display"`
	OK      bool   `json:"ok"`
	Error   string `json:"error,omitempty"`
}

// CheckAllDBs проверяет подключение ко всем сконфигурированным БД.
// Пропускает незаполненные конфиги (пустой Server). Проверки идут
// параллельно (до 8 одновременно) с индивидуальным таймаутом perDB.
func CheckAllDBs(ctx context.Context, perDB time.Duration) []DBStatus {
	names := make([]string, 0, len(dbConfigs))
	for name, cfg := range dbConfigs {
		if cfg.Server != "" {
			names = append(names, name)
		}
	}
	sort.Strings(names)

	statuses := make([]DBStatus, len(names))
	var wg sync.WaitGroup
	sem := make(chan struct{}, 8)

	for i, name := range names {
		wg.Add(1)
		go func(i int, name string) {
			defer wg.Done()
			sem <- struct{}{}
			defer func() { <-sem }()

			st := DBStatus{Name: name, Display: GetDBDisplayName(name)}

			cfg, ok := dbConfigs[name]
			if !ok {
				st.Error = "not configured"
				statuses[i] = st
				return
			}

			checkCtx, cancel := context.WithTimeout(ctx, perDB)
			defer cancel()

			db, err := sql.Open("sqlserver", getConnectionString(cfg))
			if err != nil {
				st.Error = err.Error()
				statuses[i] = st
				return
			}

			if err := db.PingContext(checkCtx); err != nil {
				st.Error = err.Error()
			} else {
				st.OK = true
			}
			_ = db.Close()
			statuses[i] = st
		}(i, name)
	}

	wg.Wait()

	// Логирование итога
	okCount := 0
	for _, s := range statuses {
		if s.OK {
			okCount++
		} else {
			log.Printf("DB status %s (%s): FAIL - %s", s.Name, s.Display, s.Error)
		}
	}
	log.Printf("DB status: %d/%d OK", okCount, len(statuses))

	return statuses
}