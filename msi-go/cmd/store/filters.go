package main

import (
	"encoding/json"
	"errors"
	"fmt"
	"strings"
	"time"
)

// ─── ФИЛЬТРЫ «КОНТУРА ДАННЫХ» ────────────────────────────────────────────────
// Фильтр хранится в dbo.filter_def: служебные колонки для грида (field, type,
// label, sort_order) плюс config — весь объект фильтра, как он лежал в
// ui_config.toolbar. Так новые свойства не требуют миграции схемы.

// FilterDef — фильтр в ответе API.
type FilterDef struct {
	Field     string          `json:"field"`
	Type      string          `json:"type"`
	Label     string          `json:"label,omitempty"`
	SortOrder int             `json:"sort_order"`
	Config    json.RawMessage `json:"config"`
	UpdatedAt *time.Time      `json:"updated_at,omitempty"`
	UpdatedBy string          `json:"updated_by,omitempty"`
}

// FilterPayload — тело POST/PUT /api/filters.
type FilterPayload struct {
	Field     string          `json:"field"`
	Type      string          `json:"type"`
	Label     string          `json:"label"`
	SortOrder *int            `json:"sort_order"`
	Config    json.RawMessage `json:"config"`
	UpdatedBy string          `json:"-"`
}

// FilterRevision — запись истории изменений фильтра.
type FilterRevision struct {
	ID        int64           `json:"id"`
	Field     string          `json:"field"`
	Action    string          `json:"action"`
	Config    json.RawMessage `json:"config,omitempty"`
	ChangedAt *time.Time      `json:"changed_at,omitempty"`
	ChangedBy string          `json:"changed_by,omitempty"`
}

var errFilterNotFound = errors.New("filter not found")

// normalize приводит тело запроса к согласованному виду: обязательные field и
// type, config — валидный JSON-объект, внутри config те же field/type/label.
func (p FilterPayload) normalize() (FilterPayload, error) {
	p.Field = strings.TrimSpace(p.Field)
	p.Type = strings.TrimSpace(p.Type)

	if p.Field == "" {
		return p, errors.New("field is required")
	}
	if p.Type == "" {
		return p, errors.New("type is required")
	}

	obj := map[string]interface{}{}
	if len(p.Config) > 0 {
		if err := json.Unmarshal(p.Config, &obj); err != nil {
			return p, fmt.Errorf("config must be a JSON object: %w", err)
		}
	}

	obj["field"] = p.Field
	obj["type"] = p.Type
	if p.Label != "" {
		obj["label"] = p.Label
	} else if raw, ok := obj["label"]; ok {
		p.Label = strings.TrimSpace(fmt.Sprint(raw))
	}

	cfg, err := json.Marshal(obj)
	if err != nil {
		return p, err
	}
	p.Config = cfg
	return p, nil
}

// syncToolbar пересобирает ui_config.toolbar из dbo.filter_def: старые
// читатели (GET /api/toolbar) видят тот же набор фильтров, что и новый редактор.
func (s *msStore) syncToolbar() error {
	list, err := s.ListFilters()
	if err != nil {
		return err
	}

	items := make([]json.RawMessage, 0, len(list))
	for _, f := range list {
		items = append(items, f.Config)
	}

	payload, err := json.Marshal(map[string]interface{}{
		"source":  "filter_def",
		"toolbar": items,
	})
	if err != nil {
		return err
	}
	return s.PutConfig(string(payload))
}
