package main

import (
	"encoding/json"
	"errors"
	"log"
	"os"
	"strings"
	"time"
)

// ─── МОДЕЛИ ХРАНИЛИЩА ────────────────────────────────────────────────────────

// Report — определение отчёта. JSON-контракт не меняется относительно Postgres-версии:
// поле "key" в ответе остаётся "key", хотя колонка в MS SQL называется report_key.
type Report struct {
	ID        int             `json:"id"`
	Key       string          `json:"key"`
	Title     string          `json:"title"`
	Icon      string          `json:"icon"`
	Image     string          `json:"image"`
	QueryText string          `json:"query_text"`
	QueryKey  string          `json:"query_key,omitempty"`
	Config    json.RawMessage `json:"config"`
	ParentID  *int            `json:"parent_id"`
	IsSection bool            `json:"is_section"`
	SortOrder int             `json:"sort_order"`
	/** Филиал раздела дерева (is_section=1); отчёты наследуют его. */
	BranchCode string     `json:"branch_code,omitempty"`
	UpdatedAt  *time.Time `json:"updated_at,omitempty"`
}

// ReportPayload — тело запроса на создание/изменение отчёта.
type ReportPayload struct {
	Key       string          `json:"key"`
	Title     string          `json:"title"`
	Icon      string          `json:"icon"`
	Image     string          `json:"image"`
	QueryText string          `json:"query_text"`
	QueryKey  string          `json:"query_key"`
	Config    json.RawMessage `json:"config"`
	ParentID  *int            `json:"parent_id"`
	IsSection bool            `json:"is_section"`
	SortOrder int             `json:"sort_order"`
	/** Филиал раздела; для обычного отчёта игнорируется (наследует раздел). */
	BranchCode *string `json:"branch_code,omitempty"`
}

// SavedView — сохранённый вид пользователя. Формат совпадает с SavedModeView во фронте:
// { id, name, widget: {kind, value}, ui: {...}, filters: {...}, savedAt }.
type SavedView struct {
	ViewID  string          `json:"id"`
	Mode    string          `json:"mode"`
	Name    string          `json:"name"`
	Widget  json.RawMessage `json:"widget,omitempty"`
	UI      json.RawMessage `json:"ui,omitempty"`
	Filters json.RawMessage `json:"filters,omitempty"`
	SavedAt *time.Time      `json:"savedAt,omitempty"`
}

// UserState — состояние пользователя по отчёту: последние фильтры, выбранные виды
// и сами виды. Раньше жило в localStorage (gr.reportView.<key>).
type UserState struct {
	Filters    json.RawMessage `json:"filters,omitempty"`
	Selected   json.RawMessage `json:"selected,omitempty"`
	ActiveMode string          `json:"activeMode,omitempty"`
	Views      []SavedView     `json:"views"`
	Version    int             `json:"version"`
	UpdatedAt  *time.Time      `json:"updatedAt,omitempty"`
}

// ─── ОШИБКИ ──────────────────────────────────────────────────────────────────

var (
	errNotFound    = errors.New("not found")
	errConflict    = errors.New("version conflict")
	errUnsupported = errors.New("storage backend does not support this operation")
)

// ─── ИНТЕРФЕЙС ───────────────────────────────────────────────────────────────

// Store — хранилище отчётов, панели фильтров и пользовательских состояний.
// Реализации: MS SQL (новая, основная) и PostgreSQL (старая, путь отката).
type Store interface {
	Name() string
	Close() error

	ListReports() ([]*Report, error)
	GetReport(key string) (*Report, error)
	GetReportSQL(key string) (sqlText string, config string, err error)
	CreateReport(p ReportPayload) (int, error)
	UpdateReport(key string, p ReportPayload) (int, error)
	DeleteReport(key string) error

	GetConfig(key string) (string, error)
	PutConfig(cfg string) error

	GetUserState(login, reportKey string) (*UserState, error)
	PutUserState(login, reportKey string, in UserState, ifMatch int) (*UserState, error)

	// Фильтры «Контура данных» (dbo.filter_def).
	ListFilters() ([]*FilterDef, error)
	GetFilter(field string) (*FilterDef, error)
	CreateFilter(in FilterPayload) (*FilterDef, error)
	UpdateFilter(field string, in FilterPayload) (*FilterDef, error)
	DeleteFilter(field, login string) error
	ReorderFilters(fields []string) ([]*FilterDef, error)
	FilterHistory(field string, limit int) ([]*FilterRevision, error)

	// Пользователи (dbo.app_user): роли и филиалы.
	GetUser(login string) (*AppUser, error)
	EnsureUser(login string) error
	ListUsers() ([]*AppUser, error)

	// Именованные наборы каталога (dbo.bundle).
	ListBundles() ([]*BundleInfo, error)
	GetBundle(id int) (*Bundle, error)
	CreateBundle(b *Bundle) (int, error)
	SaveBundleSnapshot(id int, payload, counts, by string) error
	DeleteBundle(id int) error
	BundleLogEntries(bundleID int, limit int) ([]BundleLogEntry, error)
	AddBundleLog(bundleID int, action, branches, by, details string) error
	ApplyBundlePayload(payload string, mode string, branches []string, by string) (string, error)
	GetToolbarConfig() (string, error)

	// Запросы отчётов (dbo.report_query).
	ListQueries() ([]*QueryDef, error)
	GetQuery(key string) (*QueryDef, error)
	CreateQuery(in QueryPayload) (*QueryDef, error)
	UpdateQuery(key string, in QueryPayload) (*QueryDef, error)
	DeleteQuery(key, login string) error
	SaveQueryColumns(key string, in QueryColumnsPayload) (*QueryDef, error)
	QueryRevisions(key string, limit int) ([]map[string]interface{}, error)
}

var store Store

// ─── ВЫБОР РЕАЛИЗАЦИИ ────────────────────────────────────────────────────────

func initStore() error {
	backend := strings.ToLower(strings.TrimSpace(os.Getenv("STORE_BACKEND")))
	if backend == "" {
		backend = "mssql"
	}

	var (
		s   Store
		err error
	)

	switch backend {
	case "mssql", "sqlserver", "ms":
		s, err = newMSStore()
	default:
		log.Printf("WARNING: unknown STORE_BACKEND=%q, falling back to mssql", backend)
		s, err = newMSStore()
	}
	if err != nil {
		return err
	}
	store = s
	log.Printf("storage backend: %s", s.Name())
	return nil
}

// devLogin — условная авторизация dev-этапа: переменная окружения, иначе имя
// пользователя Windows, иначе константа.
func devLogin() string {
	if v := strings.TrimSpace(os.Getenv("DEV_USER")); v != "" {
		return v
	}
	if v := strings.TrimSpace(os.Getenv("USERNAME")); v != "" {
		return v
	}
	return "Windows.User"
}

// normalizeConfig принимает произвольный JSON, подставляя {} по умолчанию.
func normalizeConfig(raw json.RawMessage) (string, error) {
	s := strings.TrimSpace(string(raw))
	if s == "" || s == "null" {
		s = "{}"
	}
	if !json.Valid([]byte(s)) {
		return "", errors.New("config is not valid JSON")
	}
	return s, nil
}

// nullJSON превращает пустой/невалидный JSON в NULL: колонки имеют CHECK (ISJSON).
func nullJSON(raw json.RawMessage) (interface{}, error) {
	s := strings.TrimSpace(string(raw))
	if s == "" || s == "null" {
		return nil, nil
	}
	if !json.Valid([]byte(s)) {
		return nil, errors.New("value is not valid JSON")
	}
	return s, nil
}
