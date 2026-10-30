package export

import (
	"crypto/rand"
	"encoding/hex"
	"fmt"
	"log"
	"sync"
	"time"
)

const (
	jobTTL             = 15 * time.Minute
	jobCleanupInterval = 5 * time.Minute
)

// JobState — состояние фоновой задачи выгрузки.
type JobState string

const (
	JobRunning JobState = "running"
	JobDone    JobState = "done"
	JobError   JobState = "error"
)

// Job — фоновая задача выгрузки (асинхронный экспорт).
type Job struct {
	ID         string    `json:"jobId"`
	State      JobState  `json:"state"`
	Part       int       `json:"part,omitempty"`
	TotalParts int       `json:"totalParts,omitempty"`
	Parts      []Part    `json:"parts,omitempty"`
	Error      string    `json:"error,omitempty"`
	LastAccess time.Time `json:"-"`

	mu sync.Mutex
}

var (
	jobs     = make(map[string]*Job)
	jobsMu   sync.RWMutex
	jobsOnce sync.Once
)

func newJobID() string {
	b := make([]byte, 16)
	if _, err := rand.Read(b); err != nil {
		return fmt.Sprintf("%d", time.Now().UnixNano())
	}
	return hex.EncodeToString(b)
}

// StartJob запускает работу в горутине и возвращает её ID. work получает
// колбэк прогресса (готово, всего частей) и возвращает манифест или ошибку.
func StartJob(work func(progress func(done, total int)) (*Manifest, error)) string {
	id := newJobID()
	j := &Job{ID: id, State: JobRunning, LastAccess: time.Now()}
	jobsMu.Lock()
	jobs[id] = j
	jobsMu.Unlock()
	jobsOnce.Do(startJobsCleanup)

	go func() {
		m, err := work(func(done, total int) {
			j.mu.Lock()
			j.Part = done
			j.TotalParts = total
			j.LastAccess = time.Now()
			j.mu.Unlock()
		})
		j.mu.Lock()
		defer j.mu.Unlock()
		j.LastAccess = time.Now()
		if err != nil {
			j.State = JobError
			j.Error = err.Error()
		} else if m != nil {
			j.State = JobDone
			j.Parts = m.Parts
		} else {
			j.State = JobError
			j.Error = "пустой манифест выгрузки"
		}
	}()
	return id
}

// GetJob возвращает задачу по ID.
func GetJob(id string) (*Job, bool) {
	jobsMu.RLock()
	j, ok := jobs[id]
	jobsMu.RUnlock()
	return j, ok
}

// Snapshot возвращает копию задачи для ответа API.
func (j *Job) Snapshot() Job {
	j.mu.Lock()
	defer j.mu.Unlock()
	j.LastAccess = time.Now()
	return Job{
		ID:         j.ID,
		State:      j.State,
		Part:       j.Part,
		TotalParts: j.TotalParts,
		Parts:      append([]Part(nil), j.Parts...),
		Error:      j.Error,
	}
}

func startJobsCleanup() {
	go func() {
		for {
			time.Sleep(jobCleanupInterval)
			now := time.Now()
			jobsMu.Lock()
			for id, j := range jobs {
				j.mu.Lock()
				stale := now.Sub(j.LastAccess) > jobTTL
				j.mu.Unlock()
				if stale {
					delete(jobs, id)
					log.Printf("Export job %s expired", id[:8]+"...")
				}
			}
			jobsMu.Unlock()
		}
	}()
}
