package main

import (
	"log"
	"sort"
	"sync"
	"time"

	"goreport/internal/database"
)

const (
	progressTTL             = 15 * time.Minute
	progressCleanupInterval = 5 * time.Minute
)

// DBState — статус одной БД в ходе инициализации отчёта.
type DBState struct {
	DB    string `json:"db"`
	Label string `json:"label"`
	State string `json:"state"` // connect | exec | rows | ok | error
	Rows  int64  `json:"rows,omitempty"`
	Error string `json:"error,omitempty"`
}

// InitProgress — прогресс инициализации по филиалам.
type InitProgress struct {
	RequestID  string    `json:"requestId"`
	Done       bool      `json:"done"`
	Total      int       `json:"total"`
	Dbs        []DBState `json:"dbs"`
	LastAccess time.Time `json:"-"`

	mu sync.Mutex
}

var (
	progresses          = make(map[string]*InitProgress)
	progressMu          sync.RWMutex
	progressCleanupOnce sync.Once
)

// newInitProgress создаёт и регистрирует запись прогресса.
func newInitProgress(requestID string, dbNames []string) *InitProgress {
	p := &InitProgress{
		RequestID:  requestID,
		Total:      len(dbNames),
		Dbs:        make([]DBState, len(dbNames)),
		LastAccess: time.Now(),
	}
	for i, db := range dbNames {
		p.Dbs[i] = DBState{DB: db, Label: database.GetDBDisplayName(db), State: "connect"}
	}
	sort.SliceStable(p.Dbs, func(a, b int) bool {
		return p.Dbs[a].Label < p.Dbs[b].Label
	})
	progressMu.Lock()
	progresses[requestID] = p
	progressMu.Unlock()
	progressCleanupOnce.Do(startProgressCleanup)
	return p
}

// setState обновляет статус одной БД (потокобезопасно).
func (p *InitProgress) setState(db, state string, rows int64, errMsg string) {
	p.mu.Lock()
	defer p.mu.Unlock()
	p.LastAccess = time.Now()
	for i := range p.Dbs {
		if p.Dbs[i].DB == db {
			p.Dbs[i].State = state
			p.Dbs[i].Rows = rows
			p.Dbs[i].Error = errMsg
			return
		}
	}
}

// setDone помечает инициализацию завершённой.
func (p *InitProgress) setDone() {
	p.mu.Lock()
	defer p.mu.Unlock()
	p.LastAccess = time.Now()
	p.Done = true
}

// snapshot возвращает копию прогресса для ответа API.
func (p *InitProgress) snapshot() InitProgress {
	p.mu.Lock()
	defer p.mu.Unlock()
	p.LastAccess = time.Now()
	return InitProgress{
		RequestID: p.RequestID,
		Done:      p.Done,
		Total:     p.Total,
		Dbs:       append([]DBState(nil), p.Dbs...),
	}
}

func getProgress(requestID string) (*InitProgress, bool) {
	progressMu.RLock()
	p, ok := progresses[requestID]
	progressMu.RUnlock()
	return p, ok
}

func startProgressCleanup() {
	go func() {
		for {
			time.Sleep(progressCleanupInterval)
			now := time.Now()
			progressMu.Lock()
			for id, p := range progresses {
				p.mu.Lock()
				stale := now.Sub(p.LastAccess) > progressTTL
				p.mu.Unlock()
				if stale {
					delete(progresses, id)
					log.Printf("Progress %s expired", id[:8]+"...")
				}
			}
			progressMu.Unlock()
		}
	}()
}