package main

import (
	"database/sql"
	"encoding/json"
	"errors"
	"strings"
)

const msQueryColumns = "query_key, title, COALESCE(tags, '[]'), COALESCE(db_key, ''), " +
	"COALESCE(filter_names, '[]'), sql_text, COALESCE(columns_json, ''), updated_at, COALESCE(updated_by, '')"

func scanMSQuery(sc interface{ Scan(dest ...interface{}) error }) (*QueryDef, error) {
	var (
		q               QueryDef
		tags, filters   string
		columns         string
	)
	if err := sc.Scan(&q.Key, &q.Title, &tags, &q.DBKey, &filters, &q.SQL,
		&columns, &q.UpdatedAt, &q.UpdatedBy); err != nil {
		return nil, err
	}

	q.Tags = []string{}
	if tags != "" {
		_ = json.Unmarshal([]byte(tags), &q.Tags)
	}
	q.Filters = []string{}
	if filters != "" {
		_ = json.Unmarshal([]byte(filters), &q.Filters)
	}
	if columns != "" {
		q.Columns = json.RawMessage(columns)
	}
	return &q, nil
}

func (s *msStore) ListQueries() ([]*QueryDef, error) {
	rows, err := s.db.Query("SELECT " + msQueryColumns + " FROM dbo.report_query ORDER BY title, query_key")
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	list := []*QueryDef{}
	for rows.Next() {
		q, err := scanMSQuery(rows)
		if err != nil {
			return nil, err
		}
		list = append(list, q)
	}
	return list, rows.Err()
}

func (s *msStore) GetQuery(key string) (*QueryDef, error) {
	row := s.db.QueryRow("SELECT "+msQueryColumns+" FROM dbo.report_query WHERE query_key = @p1", key)
	q, err := scanMSQuery(row)
	if errors.Is(err, sql.ErrNoRows) {
		return nil, errQueryNotFound
	}
	if err != nil {
		return nil, err
	}
	return q, nil
}

func queryTagsJSON(tags []string) string {
	if tags == nil {
		tags = []string{}
	}
	raw, err := json.Marshal(tags)
	if err != nil {
		return "[]"
	}
	return string(raw)
}

func (s *msStore) CreateQuery(in QueryPayload) (*QueryDef, error) {
	p, err := in.normalize()
	if err != nil {
		return nil, err
	}

	if _, err := s.db.Exec(
		`INSERT INTO dbo.report_query (query_key, title, tags, db_key, filter_names, sql_text, columns_json, updated_by)
		 VALUES (@p1, @p2, CAST(@p3 AS NVARCHAR(400)), @p4, CAST(@p5 AS NVARCHAR(MAX)),
		         CAST(@p6 AS NVARCHAR(MAX)), CAST(NULLIF(@p7, '') AS NVARCHAR(MAX)), @p8)`,
		p.Key, p.Title, queryTagsJSON(p.Tags), p.DBKey, queryTagsJSON(p.Filters),
		p.SQL, string(p.Columns), p.UpdatedBy); err != nil {
		if isMSUniqueViolation(err) {
			return nil, errConflict
		}
		return nil, err
	}

	s.addQueryRevision(p.Key, "create", p.SQL, p.UpdatedBy)
	return s.GetQuery(p.Key)
}

func (s *msStore) UpdateQuery(key string, in QueryPayload) (*QueryDef, error) {
	key = strings.TrimSpace(key)
	p, err := in.normalize()
	if err != nil {
		return nil, err
	}
	p.Key = key

	res, err := s.db.Exec(
		`UPDATE dbo.report_query
		 SET title = @p2,
		     tags = CAST(@p3 AS NVARCHAR(400)),
		     db_key = @p4,
		     filter_names = CAST(@p5 AS NVARCHAR(MAX)),
		     sql_text = CAST(@p6 AS NVARCHAR(MAX)),
		     columns_json = CAST(NULLIF(@p7, '') AS NVARCHAR(MAX)),
		     updated_at = SYSUTCDATETIME(),
		     updated_by = @p8
		 WHERE query_key = @p1`,
		key, p.Title, queryTagsJSON(p.Tags), p.DBKey, queryTagsJSON(p.Filters),
		p.SQL, string(p.Columns), p.UpdatedBy)
	if err != nil {
		return nil, err
	}
	affected, err := res.RowsAffected()
	if err != nil {
		return nil, err
	}
	if affected == 0 {
		return nil, errQueryNotFound
	}

	s.addQueryRevision(key, "update", p.SQL, p.UpdatedBy)
	return s.GetQuery(key)
}

func (s *msStore) DeleteQuery(key, login string) error {
	current, err := s.GetQuery(key)
	if err != nil {
		return err
	}

	res, err := s.db.Exec("DELETE FROM dbo.report_query WHERE query_key = @p1", key)
	if err != nil {
		return err
	}
	affected, err := res.RowsAffected()
	if err != nil {
		return err
	}
	if affected == 0 {
		return errQueryNotFound
	}

	s.addQueryRevision(key, "delete", current.SQL, login)
	return nil
}

// SaveQueryColumns — снимок колонок после удачного запуска (не меняет SQL).
func (s *msStore) SaveQueryColumns(key string, in QueryColumnsPayload) (*QueryDef, error) {
	if len(in.Columns) == 0 || !json.Valid(in.Columns) {
		return nil, errors.New("columns must be valid JSON")
	}

	res, err := s.db.Exec(
		`UPDATE dbo.report_query
		 SET columns_json = CAST(@p2 AS NVARCHAR(MAX)), updated_at = SYSUTCDATETIME(), updated_by = @p3
		 WHERE query_key = @p1`,
		key, string(in.Columns), in.Login)
	if err != nil {
		return nil, err
	}
	affected, err := res.RowsAffected()
	if err != nil {
		return nil, err
	}
	if affected == 0 {
		return nil, errQueryNotFound
	}
	return s.GetQuery(key)
}

// QueryRevisions — история изменений запроса.
func (s *msStore) QueryRevisions(key string, limit int) ([]map[string]interface{}, error) {
	if limit <= 0 || limit > 200 {
		limit = 50
	}

	rows, err := s.db.Query(
		`SELECT TOP (@p2) id, action, COALESCE(sql_text, ''), changed_at, COALESCE(changed_by, '')
		 FROM dbo.report_query_rev WHERE query_key = @p1
		 ORDER BY changed_at DESC, id DESC`, key, limit)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	list := []map[string]interface{}{}
	for rows.Next() {
		var (
			id     int64
			action  string
			sqlText string
			at     sql.NullTime
			by     string
		)
		if err := rows.Scan(&id, &action, &sqlText, &at, &by); err != nil {
			return nil, err
		}
		item := map[string]interface{}{
			"id": id, "action": action, "sql": sqlText, "changed_by": by,
		}
		if at.Valid {
			item["changed_at"] = at.Time
		}
		list = append(list, item)
	}
	return list, rows.Err()
}
