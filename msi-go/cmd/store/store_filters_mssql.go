package main

import (
	"database/sql"
	"encoding/json"
	"errors"
	"log"
	"strings"
)

const msFilterColumns = "field, type, COALESCE(label, ''), config, sort_order, updated_at, COALESCE(updated_by, '')"

func scanMSFilter(sc interface{ Scan(dest ...interface{}) error }) (*FilterDef, error) {
	var (
		f   FilterDef
		cfg string
	)
	if err := sc.Scan(&f.Field, &f.Type, &f.Label, &cfg, &f.SortOrder, &f.UpdatedAt, &f.UpdatedBy); err != nil {
		return nil, err
	}
	f.Config = json.RawMessage(cfg)
	return &f, nil
}

func (s *msStore) ListFilters() ([]*FilterDef, error) {
	rows, err := s.db.Query("SELECT " + msFilterColumns + " FROM dbo.filter_def ORDER BY sort_order, id")
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	list := []*FilterDef{}
	for rows.Next() {
		f, err := scanMSFilter(rows)
		if err != nil {
			return nil, err
		}
		list = append(list, f)
	}
	return list, rows.Err()
}

func (s *msStore) GetFilter(field string) (*FilterDef, error) {
	row := s.db.QueryRow("SELECT "+msFilterColumns+" FROM dbo.filter_def WHERE field = @p1", field)
	f, err := scanMSFilter(row)
	if errors.Is(err, sql.ErrNoRows) {
		return nil, errFilterNotFound
	}
	if err != nil {
		return nil, err
	}
	return f, nil
}

// addFilterRevision пишет снимок изменения в историю.
func (s *msStore) addFilterRevision(field, action, config, login string) {
	_, err := s.db.Exec(
		`INSERT INTO dbo.filter_def_rev (field, action, config, changed_by)
		 VALUES (@p1, @p2, CAST(@p3 AS NVARCHAR(MAX)), @p4)`,
		field, action, config, login)
	if err != nil {
		// История не должна ломать сохранение фильтра.
		log.Printf("filter_def_rev: не удалось записать %s %s: %v", action, field, err)
	}
}

func (s *msStore) CreateFilter(in FilterPayload) (*FilterDef, error) {
	p, err := in.normalize()
	if err != nil {
		return nil, err
	}

	var sortOrder int
	if p.SortOrder != nil {
		sortOrder = *p.SortOrder
	} else if err := s.db.QueryRow(
		"SELECT ISNULL(MAX(sort_order), -1) + 1 FROM dbo.filter_def").Scan(&sortOrder); err != nil {
		return nil, err
	}

	if _, err := s.db.Exec(
		`INSERT INTO dbo.filter_def (field, type, label, config, sort_order, updated_by)
		 VALUES (@p1, @p2, @p3, CAST(@p4 AS NVARCHAR(MAX)), @p5, @p6)`,
		p.Field, p.Type, p.Label, string(p.Config), sortOrder, p.UpdatedBy); err != nil {
		if isMSUniqueViolation(err) {
			return nil, errConflict
		}
		return nil, err
	}

	s.addFilterRevision(p.Field, "create", string(p.Config), p.UpdatedBy)
	if err := s.syncToolbar(); err != nil {
		log.Printf("filter_def: toolbar не синхронизирован: %v", err)
	}
	return s.GetFilter(p.Field)
}

func (s *msStore) UpdateFilter(field string, in FilterPayload) (*FilterDef, error) {
	field = strings.TrimSpace(field)
	p, err := in.normalize()
	if err != nil {
		return nil, err
	}
	// Ключ фильтра — часть идентичности: переименование делается create+delete.
	if p.Field != field {
		p.Field = field
		if normalized, errNorm := p.normalize(); errNorm == nil {
			p = normalized
		}
	}

	var sortOrder interface{}
	if p.SortOrder != nil {
		sortOrder = *p.SortOrder
	}

	res, err := s.db.Exec(
		`UPDATE dbo.filter_def
		 SET type = @p2, label = @p3, config = CAST(@p4 AS NVARCHAR(MAX)),
		     sort_order = COALESCE(@p5, sort_order),
		     updated_at = SYSUTCDATETIME(), updated_by = @p6
		 WHERE field = @p1`,
		field, p.Type, p.Label, string(p.Config), sortOrder, p.UpdatedBy)
	if err != nil {
		return nil, err
	}
	affected, err := res.RowsAffected()
	if err != nil {
		return nil, err
	}
	if affected == 0 {
		return nil, errFilterNotFound
	}

	s.addFilterRevision(field, "update", string(p.Config), p.UpdatedBy)
	if err := s.syncToolbar(); err != nil {
		log.Printf("filter_def: toolbar не синхронизирован: %v", err)
	}
	return s.GetFilter(field)
}

func (s *msStore) DeleteFilter(field, login string) error {
	// Снимок нужен в истории: после удаления восстанавливать неоткуда.
	current, err := s.GetFilter(field)
	if err != nil {
		return err
	}

	res, err := s.db.Exec("DELETE FROM dbo.filter_def WHERE field = @p1", field)
	if err != nil {
		return err
	}
	affected, err := res.RowsAffected()
	if err != nil {
		return err
	}
	if affected == 0 {
		return errFilterNotFound
	}

	s.addFilterRevision(field, "delete", string(current.Config), login)
	if err := s.syncToolbar(); err != nil {
		log.Printf("filter_def: toolbar не синхронизирован: %v", err)
	}
	return nil
}

// ReorderFilters проставляет sort_order по порядку переданных ключей.
func (s *msStore) ReorderFilters(fields []string) ([]*FilterDef, error) {
	if len(fields) == 0 {
		return nil, errors.New("fields is required")
	}

	tx, err := s.db.Begin()
	if err != nil {
		return nil, err
	}
	for index, field := range fields {
		if _, err := tx.Exec(
			"UPDATE dbo.filter_def SET sort_order = @p1, updated_at = SYSUTCDATETIME() WHERE field = @p2",
			index, strings.TrimSpace(field)); err != nil {
			tx.Rollback()
			return nil, err
		}
	}
	if err := tx.Commit(); err != nil {
		return nil, err
	}

	if err := s.syncToolbar(); err != nil {
		log.Printf("filter_def: toolbar не синхронизирован: %v", err)
	}
	return s.ListFilters()
}

func (s *msStore) FilterHistory(field string, limit int) ([]*FilterRevision, error) {
	if limit <= 0 || limit > 200 {
		limit = 50
	}

	rows, err := s.db.Query(
		`SELECT TOP (@p2) id, field, action, COALESCE(config, ''), changed_at, COALESCE(changed_by, '')
		 FROM dbo.filter_def_rev
		 WHERE field = @p1
		 ORDER BY changed_at DESC, id DESC`, field, limit)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	list := []*FilterRevision{}
	for rows.Next() {
		var (
			rev  FilterRevision
			cfg  string
			when sql.NullTime
		)
		if err := rows.Scan(&rev.ID, &rev.Field, &rev.Action, &cfg, &when, &rev.ChangedBy); err != nil {
			return nil, err
		}
		if cfg != "" {
			rev.Config = json.RawMessage(cfg)
		}
		if when.Valid {
			at := when.Time
			rev.ChangedAt = &at
		}
		list = append(list, &rev)
	}
	return list, rows.Err()
}
