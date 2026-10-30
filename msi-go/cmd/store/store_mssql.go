package main

import (
	"database/sql"
	"encoding/json"
	"errors"
	"fmt"
	"log"
	"os"
	"strings"
	"time"
)

// ─── MS SQL: основное хранилище (БД report) ──────────────────────────────────

type msStore struct {
	db *sql.DB
}

func newMSStore() (Store, error) {
	// БД report живёт на том же инстансе, что и kand, поэтому по умолчанию
	// наследуем реквизиты DB1UL — секреты не дублируются в compose.
	server := firstNonEmpty(os.Getenv("REPORT_DB_SERVER"), os.Getenv("DB1UL_SERVER"), "localhost")
	port := firstNonEmpty(os.Getenv("REPORT_DB_PORT"), os.Getenv("DB1UL_PORT"), "1433")
	user := firstNonEmpty(os.Getenv("REPORT_DB_USER"), os.Getenv("DB1UL_USER"), "sa")
	pass := firstNonEmpty(os.Getenv("REPORT_DB_PASSWORD"), os.Getenv("DB1UL_PASSWORD"))
	database := firstNonEmpty(os.Getenv("REPORT_DB_DATABASE"), "report")

	dsn := fmt.Sprintf("server=%s;port=%s;user id=%s;password=%s;database=%s;encrypt=disable",
		server, port, user, pass, database)

	db, err := sql.Open("sqlserver", dsn)
	if err != nil {
		return nil, err
	}
	db.SetMaxOpenConns(10)
	db.SetMaxIdleConns(2)
	db.SetConnMaxLifetime(5 * time.Minute)

	var lastErr error
	for attempt := 0; attempt < 15; attempt++ {
		if lastErr = db.Ping(); lastErr == nil {
			log.Printf("MS SQL connected: %s:%s/%s", server, port, database)
			return &msStore{db: db}, nil
		}
		time.Sleep(2 * time.Second)
	}
	db.Close()
	return nil, fmt.Errorf("mssql unreachable: %w", lastErr)
}

func (s *msStore) Name() string { return "mssql" }
func (s *msStore) Close() error { return s.db.Close() }

func firstNonEmpty(values ...string) string {
	for _, v := range values {
		if strings.TrimSpace(v) != "" {
			return v
		}
	}
	return ""
}

const msReportColumns = "id, report_key, title, COALESCE(icon, ''), COALESCE(image, ''), " +
	"COALESCE(query_text, ''), COALESCE(config, '{}'), COALESCE(query_key, ''), parent_id, is_section, sort_order, branch_code, updated_at"

func scanMSReport(sc interface{ Scan(dest ...interface{}) error }) (*Report, error) {
	var (
		r      Report
		cfg    string
		branch sql.NullString
	)
	if err := sc.Scan(
		&r.ID, &r.Key, &r.Title, &r.Icon, &r.Image, &r.QueryText, &cfg, &r.QueryKey,
		&r.ParentID, &r.IsSection, &r.SortOrder, &branch, &r.UpdatedAt,
	); err != nil {
		return nil, err
	}
	r.Config = json.RawMessage(cfg)
	r.BranchCode = branch.String
	return &r, nil
}

// isMSUniqueViolation — 2601 (дубликат индекса) и 2627 (нарушение UNIQUE).
func isMSUniqueViolation(err error) bool {
	if err == nil {
		return false
	}
	msg := err.Error()
	return strings.Contains(msg, "2601") || strings.Contains(msg, "2627") ||
		strings.Contains(msg, "duplicate key")
}

func (s *msStore) ListReports() ([]*Report, error) {
	rows, err := s.db.Query(
		"SELECT "+msReportColumns+" FROM dbo.reports WHERE is_deleted = 0 AND report_key <> @p1 "+
			"ORDER BY sort_order, title, id", toolbarKey)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	list := []*Report{}
	for rows.Next() {
		r, err := scanMSReport(rows)
		if err != nil {
			return nil, err
		}
		list = append(list, r)
	}
	return list, rows.Err()
}

func (s *msStore) GetReport(key string) (*Report, error) {
	row := s.db.QueryRow(
		"SELECT "+msReportColumns+" FROM dbo.reports WHERE report_key = @p1 AND is_deleted = 0", key)
	r, err := scanMSReport(row)
	if errors.Is(err, sql.ErrNoRows) {
		return nil, errNotFound
	}
	if err != nil {
		return nil, err
	}
	return r, nil
}

func (s *msStore) GetReportSQL(key string) (string, string, error) {
	var sqlText, cfg string
	err := s.db.QueryRow(
		"SELECT COALESCE(query_text, ''), COALESCE(config, '{}') FROM dbo.reports "+
			"WHERE report_key = @p1 AND is_deleted = 0", key).Scan(&sqlText, &cfg)
	if errors.Is(err, sql.ErrNoRows) {
		return "", "", errNotFound
	}
	if err != nil {
		return "", "", err
	}
	return sqlText, cfg, nil
}

func (s *msStore) validateParentSection(reportID int, parentID *int) error {
	if parentID == nil {
		return nil
	}
	if reportID != 0 && *parentID == reportID {
		return errors.New("раздел не может быть родителем самому себе")
	}

	var isSection bool
	err := s.db.QueryRow(
		"SELECT is_section FROM dbo.reports WHERE id = @p1 AND is_deleted = 0", *parentID).Scan(&isSection)
	if errors.Is(err, sql.ErrNoRows) {
		return errors.New("родительский раздел не найден")
	}
	if err != nil {
		return err
	}
	if !isSection {
		return errors.New("родителем может быть только раздел")
	}
	if reportID == 0 {
		return nil
	}

	var cycle int
	err = s.db.QueryRow(
		`WITH anc AS (
		     SELECT id, parent_id FROM dbo.reports WHERE id = @p1
		     UNION ALL
		     SELECT r.id, r.parent_id FROM dbo.reports r JOIN anc ON r.id = anc.parent_id
		 ) SELECT COUNT(1) FROM anc WHERE id = @p2 OPTION (MAXRECURSION 32)`,
		*parentID, reportID).Scan(&cycle)
	if err != nil {
		return err
	}
	if cycle > 0 {
		return errors.New("нельзя вложить раздел в собственный потомок")
	}
	return nil
}

func (s *msStore) countChildren(reportID int) (int, error) {
	var n int
	err := s.db.QueryRow(
		"SELECT COUNT(1) FROM dbo.reports WHERE parent_id = @p1 AND is_deleted = 0", reportID).Scan(&n)
	return n, err
}

func (s *msStore) CreateReport(p ReportPayload) (int, error) {
	if p.Key == "" || p.Title == "" {
		return 0, errors.New("key and title are required")
	}
	cfg, err := normalizeConfig(p.Config)
	if err != nil {
		return 0, err
	}
	if err := s.validateParentSection(0, p.ParentID); err != nil {
		return 0, err
	}

	if p.IsSection && p.BranchCode != nil {
		if err := validateBranchCode(*p.BranchCode); err != nil {
			return 0, err
		}
	}

	var id int
	err = s.db.QueryRow(
		`INSERT INTO dbo.reports (report_key, title, icon, image, query_text, config, query_key, parent_id, is_section, sort_order, branch_code)
		 OUTPUT INSERTED.id
		 VALUES (@p1, @p2, @p3, @p4, @p5, @p6, NULLIF(@p7, ''), @p8, @p9, @p10, NULLIF(@p11, ''))`,
		p.Key, p.Title, p.Icon, p.Image, p.QueryText, cfg, p.QueryKey,
		p.ParentID, p.IsSection, p.SortOrder, branchOrNull(p)).Scan(&id)
	if isMSUniqueViolation(err) {
		return 0, errConflict
	}
	if err != nil {
		return 0, err
	}
	return id, nil
}

func (s *msStore) UpdateReport(key string, p ReportPayload) (int, error) {
	cfg, err := normalizeConfig(p.Config)
	if err != nil {
		return 0, err
	}

	var (
		id         int
		childCount int
	)
	err = s.db.QueryRow(
		`SELECT r.id, (SELECT COUNT(1) FROM dbo.reports c WHERE c.parent_id = r.id AND c.is_deleted = 0)
		 FROM dbo.reports r WHERE r.report_key = @p1 AND r.is_deleted = 0`, key).Scan(&id, &childCount)
	if errors.Is(err, sql.ErrNoRows) {
		return 0, errNotFound
	}
	if err != nil {
		return 0, err
	}
	if childCount > 0 && !p.IsSection {
		return 0, errors.New("у раздела есть вложенные элементы — его нельзя сделать отчётом")
	}
	if err := s.validateParentSection(id, p.ParentID); err != nil {
		return 0, err
	}

	if p.IsSection && p.BranchCode != nil {
		if err := validateBranchCode(*p.BranchCode); err != nil {
			return 0, err
		}
	}

	res, err := s.db.Exec(
		`UPDATE dbo.reports
		 SET title = @p2, icon = @p3, image = @p4, query_text = @p5, config = @p6,
		     query_key = NULLIF(@p7, ''), parent_id = @p8, is_section = @p9,
		     sort_order = @p10,
		     branch_code = CASE WHEN @p11 = 1 THEN NULLIF(@p12, '') ELSE NULL END,
		     updated_at = SYSUTCDATETIME()
		 WHERE report_key = @p1 AND is_deleted = 0`,
		key, p.Title, p.Icon, p.Image, p.QueryText, cfg, p.QueryKey,
		p.ParentID, p.IsSection, p.SortOrder, p.IsSection, branchOrNull(p))
	if err != nil {
		return 0, err
	}
	if n, _ := res.RowsAffected(); n == 0 {
		return 0, errNotFound
	}
	return id, nil
}

// DeleteReport — мягкое удаление: ссылки из user_report_state остаются валидными.
func (s *msStore) DeleteReport(key string) error {
	var id int
	err := s.db.QueryRow(
		"SELECT id FROM dbo.reports WHERE report_key = @p1 AND is_deleted = 0", key).Scan(&id)
	if errors.Is(err, sql.ErrNoRows) {
		return errNotFound
	}
	if err != nil {
		return err
	}

	n, err := s.countChildren(id)
	if err != nil {
		return err
	}
	if n > 0 {
		return errors.New("у раздела есть вложенные элементы — сначала удалите их")
	}

	_, err = s.db.Exec(
		"UPDATE dbo.reports SET is_deleted = 1, updated_at = SYSUTCDATETIME() "+
			"WHERE id = @p1 AND is_deleted = 0", id)
	return err
}

func (s *msStore) GetConfig(key string) (string, error) {
	var cfg string
	err := s.db.QueryRow(
		"SELECT config FROM dbo.ui_config WHERE setting_key = @p1", key).Scan(&cfg)
	if errors.Is(err, sql.ErrNoRows) {
		return `{"source": "env.js", "toolbar": []}`, nil
	}
	if err != nil {
		return "", err
	}
	return cfg, nil
}

func (s *msStore) PutConfig(cfg string) error {
	_, err := s.db.Exec(
		`MERGE dbo.ui_config AS t
		 USING (SELECT @p1 AS setting_key, CAST(@p2 AS NVARCHAR(MAX)) AS config) AS src
		 ON t.setting_key = src.setting_key
		 WHEN MATCHED THEN
		     UPDATE SET config = src.config, updated_at = SYSUTCDATETIME()
		 WHEN NOT MATCHED THEN
		     INSERT (setting_key, config) VALUES (src.setting_key, src.config);`,
		toolbarSettingKey, cfg)
	return err
}

// ─── СОСТОЯНИЕ ПОЛЬЗОВАТЕЛЯ ──────────────────────────────────────────────────

func (s *msStore) loadViews(login, reportKey string) ([]SavedView, error) {
	rows, err := s.db.Query(
		`SELECT view_id, mode, name, COALESCE(widget_state, ''), COALESCE(ui_state, ''),
		        COALESCE(filters, ''), saved_at
		 FROM dbo.user_report_view
		 WHERE user_login = @p1 AND report_key = @p2
		 ORDER BY mode, saved_at`, login, reportKey)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	views := []SavedView{}
	for rows.Next() {
		var (
			v                    SavedView
			widget, ui, flt      string
			savedAt              time.Time
		)
		if err := rows.Scan(&v.ViewID, &v.Mode, &v.Name, &widget, &ui, &flt, &savedAt); err != nil {
			return nil, err
		}
		if widget != "" {
			v.Widget = json.RawMessage(widget)
		}
		if ui != "" {
			v.UI = json.RawMessage(ui)
		}
		if flt != "" {
			v.Filters = json.RawMessage(flt)
		}
		t := savedAt
		v.SavedAt = &t
		views = append(views, v)
	}
	return views, rows.Err()
}

func (s *msStore) GetUserState(login, reportKey string) (*UserState, error) {
	var (
		stFilters, stSelected, activeMode string
		version                           int
		updatedAt                         time.Time
	)
	err := s.db.QueryRow(
		`SELECT COALESCE(filters, ''), COALESCE(selected, ''), COALESCE(active_mode, ''),
		        version, updated_at
		 FROM dbo.user_report_state
		 WHERE user_login = @p1 AND report_key = @p2`, login, reportKey).
		Scan(&stFilters, &stSelected, &activeMode, &version, &updatedAt)

	state := &UserState{Views: []SavedView{}, Version: 0}
	if errors.Is(err, sql.ErrNoRows) {
		views, verr := s.loadViews(login, reportKey)
		if verr != nil {
			return nil, verr
		}
		state.Views = views
		return state, nil
	}
	if err != nil {
		return nil, err
	}

	state.Version = version
	state.ActiveMode = activeMode
	state.UpdatedAt = &updatedAt
	if stFilters != "" {
		state.Filters = json.RawMessage(stFilters)
	}
	if stSelected != "" {
		state.Selected = json.RawMessage(stSelected)
	}

	views, err := s.loadViews(login, reportKey)
	if err != nil {
		return nil, err
	}
	state.Views = views
	return state, nil
}

// PutUserState сохраняет состояние целиком: одна транзакция, полная замена набора видов.
// ifMatch — ожидаемая версия (0 при первой записи); при расхождении возвращается errConflict.
func (s *msStore) PutUserState(login, reportKey string, in UserState, ifMatch int) (*UserState, error) {
	stFilters, err := nullJSON(in.Filters)
	if err != nil {
		return nil, fmt.Errorf("filters: %w", err)
	}
	stSelected, err := nullJSON(in.Selected)
	if err != nil {
		return nil, fmt.Errorf("selected: %w", err)
	}

	type preparedView struct {
		id, mode, name string
		widget, ui, flt interface{}
		savedAt        time.Time
	}
	prepared := make([]preparedView, 0, len(in.Views))
	for _, v := range in.Views {
		if v.ViewID == "" || v.Mode == "" || v.Name == "" {
			return nil, errors.New("view id, mode и name обязательны")
		}
		switch v.Mode {
		case "grid", "pivot", "map", "dashboard":
		default:
			return nil, fmt.Errorf("недопустимый режим вида: %q", v.Mode)
		}
		widget, err := nullJSON(v.Widget)
		if err != nil {
			return nil, fmt.Errorf("view %s widget: %w", v.ViewID, err)
		}
		ui, err := nullJSON(v.UI)
		if err != nil {
			return nil, fmt.Errorf("view %s ui: %w", v.ViewID, err)
		}
		flt, err := nullJSON(v.Filters)
		if err != nil {
			return nil, fmt.Errorf("view %s filters: %w", v.ViewID, err)
		}
		savedAt := time.Now().UTC()
		if v.SavedAt != nil {
			savedAt = *v.SavedAt
		}
		prepared = append(prepared, preparedView{
			id: v.ViewID, mode: v.Mode, name: v.Name,
			widget: widget, ui: ui, flt: flt, savedAt: savedAt,
		})
	}

	tx, err := s.db.Begin()
	if err != nil {
		return nil, err
	}
	defer tx.Rollback()

	// Логин приходит из Windows-авторизации и может отсутствовать в app_user.
	// Без этой записи INSERT упирается в FK fk_urs_user — сохранить вид нельзя.
	if _, err := tx.Exec(
		`IF NOT EXISTS (SELECT 1 FROM dbo.app_user WHERE login = @p1)
		 INSERT INTO dbo.app_user (login, display_name, role_code, is_active)
		 VALUES (@p1, @p1, N'user', 1)`, login); err != nil {
		return nil, err
	}

	res, err := tx.Exec(
		`UPDATE dbo.user_report_state
		 SET filters = @p1, selected = @p2, active_mode = @p3,
		     version = version + 1, updated_at = SYSUTCDATETIME()
		 WHERE user_login = @p4 AND report_key = @p5 AND version = @p6`,
		stFilters, stSelected, nullStr(in.ActiveMode), login, reportKey, ifMatch)
	if err != nil {
		return nil, err
	}

	if n, _ := res.RowsAffected(); n == 0 {
		var cur int
		err = tx.QueryRow(
			"SELECT version FROM dbo.user_report_state WHERE user_login = @p1 AND report_key = @p2",
			login, reportKey).Scan(&cur)

		switch {
		case errors.Is(err, sql.ErrNoRows):
			if ifMatch > 0 {
				return nil, errConflict
			}
			_, err = tx.Exec(
				`INSERT INTO dbo.user_report_state (user_login, report_key, filters, selected, active_mode)
				 VALUES (@p1, @p2, @p3, @p4, @p5)`,
				login, reportKey, stFilters, stSelected, nullStr(in.ActiveMode))
			if err != nil {
				return nil, err
			}
		case err != nil:
			return nil, err
		default:
			return nil, errConflict
		}
	}

	if _, err = tx.Exec(
		"DELETE FROM dbo.user_report_view WHERE user_login = @p1 AND report_key = @p2",
		login, reportKey); err != nil {
		return nil, err
	}

	for _, v := range prepared {
		if _, err = tx.Exec(
			`INSERT INTO dbo.user_report_view
			     (user_login, report_key, view_id, mode, name, widget_state, ui_state, filters, saved_at)
			 VALUES (@p1, @p2, @p3, @p4, @p5, @p6, @p7, @p8, @p9)`,
			login, reportKey, v.id, v.mode, v.name, v.widget, v.ui, v.flt, v.savedAt); err != nil {
			return nil, err
		}
	}

	if err = tx.Commit(); err != nil {
		return nil, err
	}
	return s.GetUserState(login, reportKey)
}

func nullStr(s string) interface{} {
	if s == "" {
		return nil
	}
	return s
}

// validateBranchCode — филиал задаётся номером 1..9.
func validateBranchCode(code string) error {
	if code == "" {
		return nil
	}
	if len(code) == 1 && code[0] >= '1' && code[0] <= '9' {
		return nil
	}
	return errors.New("филиал задаётся номером 1–9 или пусто (общий)")
}

// branchOrNull — филиал имеет смысл только у раздела дерева.
func branchOrNull(p ReportPayload) string {
	if !p.IsSection || p.BranchCode == nil {
		return ""
	}
	return strings.TrimSpace(*p.BranchCode)
}
