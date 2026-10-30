package main

import (
	"context"
	"database/sql"
	"fmt"
	"log"
	"sync"
	"time"

	"goreport/internal/database"
)

const sessionTTL = 1 * time.Hour
const cleanupInterval = 30 * time.Minute

type DBSession struct {
	Held     *database.HeldConn
	Mu       sync.Mutex
	Count    int64
	Cols     []string
	ColTypes map[string]string
}

// query выполняет запрос на удержанном коннекте под мьютексом.
// Held.Conn — одно физическое соединение (temp-таблицы живут на нём),
// оно не переживает одновременные запросы из нескольких горутин
// (TDS-поток портится). Возвращает rows и unlock; вызывающий обязан
// закрыть rows и вызвать unlock после полного чтения результатов.
func (d *DBSession) query(ctx context.Context, q string) (*sql.Rows, func(), error) {
	d.Mu.Lock()
	rows, err := d.Held.Conn.QueryContext(ctx, q)
	if err != nil {
		d.Mu.Unlock()
		return nil, nil, err
	}
	return rows, d.Mu.Unlock, nil
}

// queryRow выполняет запрос одной строки под мьютексом; unlock вызывать
// после Scan.
func (d *DBSession) queryRow(ctx context.Context, q string) (*sql.Row, func()) {
	d.Mu.Lock()
	return d.Held.Conn.QueryRowContext(ctx, q), d.Mu.Unlock
}

// exec выполняет запрос без результата под мьютексом.
func (d *DBSession) exec(ctx context.Context, q string) (sql.Result, error) {
	d.Mu.Lock()
	defer d.Mu.Unlock()
	return d.Held.Conn.ExecContext(ctx, q)
}

type Session struct {
	Token       string
	DBs         []string
	Columns     []string
	ColumnTypes map[string]string
	TotalRows   int64
	ByDB        map[string]*DBSession
	CreatedAt   time.Time
	LastAccess  time.Time
}

var (
	sessions           = make(map[string]*Session)
	sessionsMu         sync.RWMutex
	sessionCleanupOnce sync.Once
)

func startSessionCleanup() {
	sessionCleanupOnce.Do(func() {
		go func() {
			for {
				time.Sleep(cleanupInterval)
				now := time.Now()
				sessionsMu.Lock()
				var expired []*Session
				for token, s := range sessions {
					if now.Sub(s.LastAccess) > sessionTTL {
						expired = append(expired, s)
						delete(sessions, token)
					}
				}
				sessionsMu.Unlock()
				for _, s := range expired {
					closeSession(s)
					log.Printf("Session %s expired, temp tables dropped", s.Token[:8]+"...")
				}
			}
		}()
	})
}

func getSession(token string) (*Session, bool) {
	sessionsMu.RLock()
	s, ok := sessions[token]
	if ok {
		s.LastAccess = time.Now()
	}
	sessionsMu.RUnlock()
	return s, ok
}

// closeSession удаляет temp-таблицы сессии и закрывает удержанные коннекты.
func closeSession(s *Session) {
	if s == nil {
		return
	}
	for _, dbSess := range s.ByDB {
		ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
		_, _ = dbSess.exec(ctx, fmt.Sprintf(
			"IF OBJECT_ID('tempdb..#gr_%s') IS NOT NULL DROP TABLE #gr_%s", s.Token, s.Token))
		cancel()
		dbSess.Held.Close()
	}
}
