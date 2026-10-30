package main

import (
	"encoding/json"
	"errors"
	"regexp"
	"strings"
	"time"
)

// ─── ЗАПРОСЫ ОТЧЁТОВ ─────────────────────────────────────────────────────────
// SQL переиспользуется отчётами и визардом: тему задают теги, состав фильтров —
// filter_names (из него страница строит форму значений), колонки сохраняются
// после удачного запуска и используются при настройке видов.

// QueryDef — запрос в ответе API.
type QueryDef struct {
	Key       string          `json:"key"`
	Title     string          `json:"title"`
	Tags      []string        `json:"tags"`
	DBKey     string          `json:"db_key,omitempty"`
	Filters   []string        `json:"filters"`
	SQL       string          `json:"sql"`
	Columns   json.RawMessage `json:"columns,omitempty"`
	UpdatedAt *time.Time      `json:"updated_at,omitempty"`
	UpdatedBy string          `json:"updated_by,omitempty"`
}

// QueryPayload — тело POST/PUT /api/queries.
type QueryPayload struct {
	Key       string          `json:"key"`
	Title     string          `json:"title"`
	Tags      []string        `json:"tags"`
	DBKey     string          `json:"db_key"`
	Filters   []string        `json:"filters"`
	SQL       string          `json:"sql"`
	Columns   json.RawMessage `json:"columns"`
	UpdatedBy string          `json:"-"`
}

// QueryColumnsPayload — снимок колонок после запуска.
type QueryColumnsPayload struct {
	Columns json.RawMessage `json:"columns"`
	Login   string          `json:"-"`
}

var errQueryNotFound = errors.New("query not found")

// Ключ запроса — либо привычный «Читаемый_Ключ», либо GUID нового запроса:
// поэтому разрешены дефисы и цифра в начале (36 символов GUID влезают в NVARCHAR(64)).
var queryKeyRe = regexp.MustCompile(`^[A-Za-zА-Яа-яЁё0-9_-]+$`)

func (p QueryPayload) normalize() (QueryPayload, error) {
	p.Key = strings.TrimSpace(p.Key)
	p.Title = strings.TrimSpace(p.Title)
	p.DBKey = strings.TrimSpace(p.DBKey)
	p.SQL = strings.TrimSpace(p.SQL)

	if p.Key == "" {
		return p, errors.New("key is required")
	}
	if !queryKeyRe.MatchString(p.Key) {
		return p, errors.New("key: буквы, цифры, дефис и подчёркивание, без пробелов")
	}
	if p.Title == "" {
		return p, errors.New("title is required")
	}
	if p.SQL == "" {
		return p, errors.New("sql is required")
	}

	if p.Tags == nil {
		p.Tags = []string{}
	}
	if p.Filters == nil {
		p.Filters = []string{}
	}
	return p, nil
}

func (s *msStore) addQueryRevision(key, action, sqlText, login string) {
	_, err := s.db.Exec(
		`INSERT INTO dbo.report_query_rev (query_key, action, sql_text, changed_by)
		 VALUES (@p1, @p2, CAST(@p3 AS NVARCHAR(MAX)), @p4)`,
		key, action, sqlText, login)
	if err != nil {
		// История не должна ломать сохранение запроса.
		_ = err
	}
}
