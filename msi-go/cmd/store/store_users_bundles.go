package main

// Пользователи (dbo.app_user) и наборы каталога (dbo.bundle): хранение в MS SQL.

import (
	"database/sql"
	"encoding/json"
	"errors"
	"fmt"
	"strings"
	"time"
)

// ─── Пользователи ────────────────────────────────────────────────────────────

func (s *msStore) GetUser(login string) (*AppUser, error) {
	var u AppUser
	var branch sql.NullString
	var provider sql.NullString
	err := s.db.QueryRow(
		`SELECT login, COALESCE(display_name, ''), role_code, branch_code, provider
		 FROM dbo.app_user WHERE login = @p1`, login,
	).Scan(&u.Login, &u.DisplayName, &u.Role, &branch, &provider)
	if errors.Is(err, sql.ErrNoRows) {
		return nil, nil
	}
	if err != nil {
		return nil, err
	}
	u.Branch = branch.String
	u.Provider = provider.String
	return &u, nil
}

func (s *msStore) EnsureUser(login string) error {
	if strings.TrimSpace(login) == "" {
		return errors.New("пустой логин")
	}
	_, err := s.db.Exec(
		`IF NOT EXISTS (SELECT 1 FROM dbo.app_user WHERE login = @p1)
		 INSERT INTO dbo.app_user (login, display_name, role_code, is_active)
		 VALUES (@p1, @p1, N'user', 1)`, login)
	return err
}

func (s *msStore) ListUsers() ([]*AppUser, error) {
	rows, err := s.db.Query(
		`SELECT login, COALESCE(display_name, ''), role_code, COALESCE(branch_code, ''),
		        COALESCE(provider, 'local')
		 FROM dbo.app_user WHERE is_active = 1 ORDER BY login`)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var out []*AppUser
	for rows.Next() {
		var u AppUser
		if err := rows.Scan(&u.Login, &u.DisplayName, &u.Role, &u.Branch, &u.Provider); err != nil {
			return nil, err
		}
		out = append(out, &u)
	}
	return out, rows.Err()
}

// ─── Наборы ──────────────────────────────────────────────────────────────────

// BundleInfo — строка списка наборов (без payload).
type BundleInfo struct {
	ID          int        `json:"id"`
	Name        string     `json:"name"`
	Description string     `json:"description"`
	Version     int        `json:"version"`
	ItemCounts  string     `json:"item_counts"`
	CreatedBy   string     `json:"created_by"`
	CreatedAt   *time.Time `json:"created_at,omitempty"`
	UpdatedAt   *time.Time `json:"updated_at,omitempty"`
}

// Bundle — набор целиком.
type Bundle struct {
	BundleInfo
	Payload string `json:"payload"`
}

// BundleLogEntry — история применений.
type BundleLogEntry struct {
	ID         int        `json:"id"`
	Action     string     `json:"action"`
	Branches   string     `json:"branches"`
	AppliedBy  string     `json:"applied_by"`
	AppliedAt  *time.Time `json:"applied_at"`
	Details    string     `json:"details"`
}

func (s *msStore) ListBundles() ([]*BundleInfo, error) {
	rows, err := s.db.Query(
		`SELECT id, name, description, version, item_counts, created_by, created_at, updated_at
		 FROM dbo.bundle ORDER BY updated_at DESC`)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var out []*BundleInfo
	for rows.Next() {
		var b BundleInfo
		if err := rows.Scan(&b.ID, &b.Name, &b.Description, &b.Version, &b.ItemCounts,
			&b.CreatedBy, &b.CreatedAt, &b.UpdatedAt); err != nil {
			return nil, err
		}
		out = append(out, &b)
	}
	return out, rows.Err()
}

func (s *msStore) GetBundle(id int) (*Bundle, error) {
	var b Bundle
	err := s.db.QueryRow(
		`SELECT id, name, description, version, item_counts, created_by, created_at, updated_at, payload
		 FROM dbo.bundle WHERE id = @p1`, id,
	).Scan(&b.ID, &b.Name, &b.Description, &b.Version, &b.ItemCounts,
		&b.CreatedBy, &b.CreatedAt, &b.UpdatedAt, &b.Payload)
	if errors.Is(err, sql.ErrNoRows) {
		return nil, errNotFound
	}
	if err != nil {
		return nil, err
	}
	return &b, nil
}

func (s *msStore) CreateBundle(b *Bundle) (int, error) {
	var id int
	err := s.db.QueryRow(
		`INSERT INTO dbo.bundle (name, description, version, payload, item_counts, created_by)
		 OUTPUT INSERTED.id
		 VALUES (@p1, @p2, 1, @p3, @p4, @p5)`,
		b.Name, b.Description, b.Payload, b.ItemCounts, b.CreatedBy).Scan(&id)
	if isMSUniqueViolation(err) {
		return 0, errConflict
	}
	return id, err
}

func (s *msStore) SaveBundleSnapshot(id int, payload, counts, by string) error {
	res, err := s.db.Exec(
		`UPDATE dbo.bundle
		 SET payload = @p1, item_counts = @p2, version = version + 1, updated_at = SYSUTCDATETIME()
		 WHERE id = @p3`, payload, counts, id)
	if err != nil {
		return err
	}
	if n, _ := res.RowsAffected(); n == 0 {
		return errNotFound
	}
	return nil
}

func (s *msStore) DeleteBundle(id int) error {
	res, err := s.db.Exec(`DELETE FROM dbo.bundle WHERE id = @p1`, id)
	if err != nil {
		return err
	}
	if n, _ := res.RowsAffected(); n == 0 {
		return errNotFound
	}
	return nil
}

func (s *msStore) BundleLogEntries(bundleID int, limit int) ([]BundleLogEntry, error) {
	rows, err := s.db.Query(
		`SELECT TOP (@p1) id, action, branches, applied_by, applied_at, details
		 FROM dbo.bundle_log WHERE bundle_id = @p2
		 ORDER BY applied_at DESC`, limit, bundleID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var out []BundleLogEntry
	for rows.Next() {
		var e BundleLogEntry
		if err := rows.Scan(&e.ID, &e.Action, &e.Branches, &e.AppliedBy, &e.AppliedAt, &e.Details); err != nil {
			return nil, err
		}
		out = append(out, e)
	}
	return out, rows.Err()
}

func (s *msStore) AddBundleLog(bundleID int, action, branches, by, details string) error {
	_, err := s.db.Exec(
		`INSERT INTO dbo.bundle_log (bundle_id, action, branches, applied_by, details)
		 VALUES (@p1, @p2, @p3, @p4, @p5)`, bundleID, action, branches, by, details)
	return err
}

func (s *msStore) GetToolbarConfig() (string, error) {
	var cfg string
	err := s.db.QueryRow(
		"SELECT config FROM dbo.ui_config WHERE setting_key = @p1", toolbarSettingKey).Scan(&cfg)
	if errors.Is(err, sql.ErrNoRows) {
		return "{}", nil
	}
	return cfg, err
}

// ─── Применение набора ───────────────────────────────────────────────────────

// bundlePayload — структура payload набора. Совпадает с экспортным JSON.
type bundlePayload struct {
	Filters []struct {
		Field     string          `json:"field"`
		Type      string          `json:"type"`
		Label     string          `json:"label"`
		SortOrder int             `json:"sort_order"`
		Config    json.RawMessage `json:"config"`
	} `json:"filters"`
	Queries []struct {
		Key         string          `json:"key"`
		Title       string          `json:"title"`
		Tags        []string        `json:"tags"`
		DBKey       string          `json:"db_key"`
		FilterNames []string        `json:"filter_names"`
		SQLText     string          `json:"sql_text"`
		Columns     json.RawMessage `json:"columns"`
	} `json:"queries"`
	Reports []struct {
		Key        string          `json:"key"`
		Title      string          `json:"title"`
		Icon       string          `json:"icon"`
		Image      string          `json:"image"`
		QueryText  string          `json:"query_text"`
		QueryKey   string          `json:"query_key"`
		Config     json.RawMessage `json:"config"`
		ParentKey  string          `json:"parent_key"`
		BranchCode string          `json:"branch_code"`
		IsSection  bool            `json:"is_section"`
		SortOrder  int             `json:"sort_order"`
	} `json:"reports"`
	Toolbar json.RawMessage `json:"toolbar"`
}

// ApplyBundlePayload применяет набор в одной транзакции:
// фильтры — MERGE по field, запросы — по query_key, отчёты (сначала разделы,
// затем отчёты) — по report_key с parent по ключам; replace — soft-delete
// отчётов выбранных филиалов, не вошедших в набор.
func (s *msStore) ApplyBundlePayload(payload string, mode string, branches []string, by string) (string, error) {
	var bp bundlePayload
	if err := json.Unmarshal([]byte(payload), &bp); err != nil {
		return "", fmt.Errorf("повреждён payload набора: %w", err)
	}
	if len(bp.Filters) == 0 && len(bp.Queries) == 0 && len(bp.Reports) == 0 {
		return "", errors.New("набор пуст: нечего применять")
	}

	tx, err := s.db.Begin()
	if err != nil {
		return "", err
	}
	defer tx.Rollback()

	// 1. Фильтры.
	for _, f := range bp.Filters {
		if strings.TrimSpace(f.Field) == "" {
			continue
		}
		if _, err := tx.Exec(
			`IF EXISTS (SELECT 1 FROM dbo.filter_def WHERE field = @p1)
			 UPDATE dbo.filter_def
			    SET type = @p2, label = @p3, config = CAST(@p4 AS NVARCHAR(MAX)),
			        sort_order = @p5, updated_at = SYSUTCDATETIME(), updated_by = @p6
			  WHERE field = @p1
			ELSE
			 INSERT INTO dbo.filter_def (field, type, label, config, sort_order, updated_by)
			 VALUES (@p1, @p2, @p3, CAST(@p4 AS NVARCHAR(MAX)), @p5, @p6)`,
			f.Field, f.Type, f.Label, string(f.Config), f.SortOrder, by); err != nil {
			return "", fmt.Errorf("фильтр %s: %w", f.Field, err)
		}
		if _, err := tx.Exec(
			`INSERT INTO dbo.filter_def_rev (field, action, config, changed_by)
			 SELECT @p1, 'update', CAST(@p2 AS NVARCHAR(MAX)), @p3
			  WHERE NOT EXISTS (SELECT 1 FROM dbo.filter_def_rev
			                    WHERE field = @p1 AND changed_by = @p3 AND action = 'update')`,
			f.Field, string(f.Config), by); err != nil {
			return "", err
		}
	}

	// 2. Запросы.
	for _, q := range bp.Queries {
		if strings.TrimSpace(q.Key) == "" {
			continue
		}
		tags, _ := json.Marshal(q.Tags)
		if q.Tags == nil {
			tags = []byte("[]")
		}
		names, _ := json.Marshal(q.FilterNames)
		if q.FilterNames == nil {
			names = []byte("[]")
		}
		cols := string(q.Columns)
		if strings.TrimSpace(cols) == "" {
			cols = "[]"
		}
		if _, err := tx.Exec(
			`IF EXISTS (SELECT 1 FROM dbo.report_query WHERE query_key = @p1)
			 UPDATE dbo.report_query
			    SET title = @p2, tags = CAST(@p3 AS NVARCHAR(MAX)), db_key = @p4,
			        filter_names = CAST(@p5 AS NVARCHAR(MAX)), sql_text = @p6,
			        columns_json = CAST(@p7 AS NVARCHAR(MAX)),
			        updated_at = SYSUTCDATETIME(), updated_by = @p8
			  WHERE query_key = @p1
			ELSE
			 INSERT INTO dbo.report_query (query_key, title, tags, db_key, filter_names, sql_text, columns_json, updated_by)
			 VALUES (@p1, @p2, CAST(@p3 AS NVARCHAR(MAX)), @p4, CAST(@p5 AS NVARCHAR(MAX)), @p6, CAST(@p7 AS NVARCHAR(MAX)), @p8)`,
			q.Key, q.Title, string(tags), q.DBKey, string(names), q.SQLText, cols, by); err != nil {
			return "", fmt.Errorf("запрос %s: %w", q.Key, err)
		}
	}

	// 3. Отчёты: разделы и отчёты одним списком, но родителями становятся
	// только уже применённые ключи (разделы идут раньше своих потомков —
	// применяем двумя проходами: сначала разделы, затем отчёты).
	applyReport := func(r bundleReport) error {
		branch := r.BranchCode
		if !r.IsSection {
			branch = "" // филиал живёт только на разделах
		}
		if _, err := tx.Exec(
			`DECLARE @parent INT =
			     (SELECT id FROM dbo.reports WHERE report_key = @p1)
			 IF EXISTS (SELECT 1 FROM dbo.reports WHERE report_key = @p2)
			 UPDATE dbo.reports
			    SET title = @p3, icon = @p4, image = @p5, query_text = @p6,
			        config = CAST(@p7 AS NVARCHAR(MAX)),
			        query_key = NULLIF(@p8, ''), parent_id = @parent,
			        is_section = @p9, sort_order = @p10,
			        branch_code = NULLIF(@p11, ''),
			        is_deleted = 0, updated_at = SYSUTCDATETIME()
			  WHERE report_key = @p2
			 ELSE
			 INSERT INTO dbo.reports (report_key, title, icon, image, query_text, config,
			                          query_key, parent_id, is_section, sort_order, branch_code)
			 VALUES (@p2, @p3, @p4, @p5, @p6, CAST(@p7 AS NVARCHAR(MAX)),
			         NULLIF(@p8, ''), @parent, @p9, @p10, NULLIF(@p11, ''))`,
			r.ParentKey, r.Key, r.Title, r.Icon, r.Image, r.QueryText, string(r.Config),
			r.QueryKey, r.IsSection, r.SortOrder, branch); err != nil {
			return fmt.Errorf("отчёт %s: %w", r.Key, err)
		}
		return nil
	}
	var sections, plain []bundleReport
	for _, r := range bp.Reports {
		rr := bundleReport{
			Key: r.Key, Title: r.Title, Icon: r.Icon, Image: r.Image,
			QueryText: r.QueryText, QueryKey: r.QueryKey, Config: r.Config,
			ParentKey: r.ParentKey, BranchCode: r.BranchCode,
			IsSection: r.IsSection, SortOrder: r.SortOrder,
		}
		if rr.IsSection {
			sections = append(sections, rr)
		} else {
			plain = append(plain, rr)
		}
	}
	for _, r := range sections {
		if err := applyReport(r); err != nil {
			return "", err
		}
	}
	for _, r := range plain {
		if err := applyReport(r); err != nil {
			return "", err
		}
	}

	// 4. Replace: отчёты выбранных филиалов, не вошедшие в набор, прячем.
	if mode == "replace" && len(branches) > 0 {
		inSet := make([]string, 0, len(bp.Reports))
		for _, r := range bp.Reports {
			inSet = append(inSet, "'"+strings.ReplaceAll(r.Key, "'", "''")+"'")
		}
		notIn := "''"
		if len(inSet) > 0 {
			notIn = strings.Join(inSet, ",")
		}
		branchList := make([]string, 0, len(branches))
		for _, b := range branches {
			branchList = append(branchList, "'"+strings.ReplaceAll(b, "'", "''")+"'")
		}
		if _, err := tx.Exec(
			`WITH tree AS (
			     SELECT id, branch_code, report_key FROM dbo.reports WHERE parent_id IS NULL
			     UNION ALL
			     SELECT r.id, COALESCE(r.branch_code, t.branch_code), r.report_key
			       FROM dbo.reports r JOIN tree t ON r.parent_id = t.id
			 )
			 UPDATE r SET is_deleted = 1, updated_at = SYSUTCDATETIME()
			   FROM dbo.reports r JOIN tree t ON t.id = r.id
			  WHERE t.branch_code IN (`+strings.Join(branchList, ",")+`)
			    AND r.report_key NOT IN (`+notIn+`)
			    AND r.report_key <> @p1`, toolbarKey); err != nil {
			return "", fmt.Errorf("replace: %w", err)
		}
	}

	// 5. Снимок панели, если в наборе есть.
	if strings.TrimSpace(string(bp.Toolbar)) != "" && string(bp.Toolbar) != "null" {
		if _, err := tx.Exec(
			`MERGE dbo.ui_config AS t
			 USING (SELECT @p1 AS setting_key) AS src ON t.setting_key = src.setting_key
			 WHEN MATCHED THEN UPDATE SET config = CAST(@p2 AS NVARCHAR(MAX))
			 WHEN NOT MATCHED THEN INSERT (setting_key, config) VALUES (src.setting_key, CAST(@p2 AS NVARCHAR(MAX)));`,
			toolbarSettingKey, string(bp.Toolbar)); err != nil {
			return "", fmt.Errorf("toolbar: %w", err)
		}
	}

	if err := tx.Commit(); err != nil {
		return "", err
	}
	return fmt.Sprintf("фильтров: %d · запросов: %d · отчётов: %d",
		len(bp.Filters), len(bp.Queries), len(bp.Reports)), nil
}

type bundleReport struct {
	Key        string
	Title      string
	Icon       string
	Image      string
	QueryText  string
	QueryKey   string
	Config     json.RawMessage
	ParentKey  string
	BranchCode string
	IsSection  bool
	SortOrder  int
}
