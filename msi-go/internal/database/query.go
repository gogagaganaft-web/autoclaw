package database

import (
	"context"
	"database/sql"
	"fmt"

	_ "github.com/microsoft/go-mssqldb"
)

type QueryResult struct {
	Columns []string        `json:"columns"`
	Rows    [][]interface{} `json:"rows"`
	Error   string          `json:"error,omitempty"`
}

func getConnectionString(cfg DBConfig) string {
	return fmt.Sprintf(
		"server=%s;port=%s;user id=%s;password=%s;database=%s",
		cfg.Server, cfg.Port, cfg.User, cfg.Password, cfg.Database,
	)
}

func ExecuteQueryContext(ctx context.Context, dbName, query string) (QueryResult, error) {
	// Страж: пользовательский SQL не может менять схему stack и писать
	// куда-либо, кроме dbo и #временных таблиц.
	if err := GuardStackReadOnly(query); err != nil {
		return QueryResult{}, err
	}
	cfg, ok := dbConfigs[dbName]
	if !ok {
		return QueryResult{}, fmt.Errorf("database %s not found", dbName)
	}
	connStr := getConnectionString(cfg)
	db, err := sql.Open("sqlserver", connStr)
	if err != nil {
		return QueryResult{}, err
	}
	defer db.Close()

	setupQuery := "SET LANGUAGE Russian; SET DATEFORMAT ymd; SET NOCOUNT ON; "
	fullQuery := setupQuery + query

	rows, err := db.QueryContext(ctx, fullQuery)
	if err != nil {
		return QueryResult{Error: err.Error()}, nil
	}
	defer rows.Close()

	qr := QueryResult{}

	for {
		cols, err := rows.Columns()
		if err != nil {
			return QueryResult{Error: err.Error()}, nil
		}

		if len(cols) > 0 {
			colTypes, err := rows.ColumnTypes()
			if err != nil {
				return executeQueryFallback(db, query)
			}

			qr = QueryResult{Columns: cols}

			for rows.Next() {
				vals := make([]interface{}, len(cols))
				for i := range vals {
					dbType := colTypes[i].DatabaseTypeName()
					switch dbType {
					case "INT", "INT IDENTITY", "BIGINT", "SMALLINT", "TINYINT":
						var v sql.NullInt64
						vals[i] = &v
					case "FLOAT", "REAL", "DECIMAL", "NUMERIC", "MONEY", "SMALLMONEY":
						var v sql.NullFloat64
						vals[i] = &v
					case "BIT":
						var v sql.NullBool
						vals[i] = &v
					case "DATETIME", "DATE", "TIME", "DATETIME2", "SMALLDATETIME":
						var v sql.NullTime
						vals[i] = &v
					case "CHAR", "VARCHAR", "NCHAR", "NVARCHAR", "TEXT", "NTEXT":
						var v sql.NullString
						vals[i] = &v
					default:
						var v []byte
						vals[i] = &v
					}
				}

				if err := rows.Scan(vals...); err != nil {
					return QueryResult{Error: err.Error()}, nil
				}

				row := make([]interface{}, len(cols))
				for i, v := range vals {
					switch val := v.(type) {
					case *sql.NullInt64:
						if val.Valid {
							row[i] = val.Int64
						} else {
							row[i] = nil
						}
					case *sql.NullFloat64:
						if val.Valid {
							row[i] = val.Float64
						} else {
							row[i] = nil
						}
					case *sql.NullBool:
						if val.Valid {
							row[i] = val.Bool
						} else {
							row[i] = nil
						}
					case *sql.NullTime:
						if val.Valid {
							row[i] = val.Time
						} else {
							row[i] = nil
						}
					case *sql.NullString:
						if val.Valid {
							row[i] = val.String
						} else {
							row[i] = nil
						}
					case *[]byte:
						if val != nil && len(*val) > 0 {
							row[i] = string(*val)
						} else {
							row[i] = nil
						}
					default:
						row[i] = v
					}
				}
				qr.Rows = append(qr.Rows, row)
			}

			break
		}

		if !rows.NextResultSet() {
			break
		}
	}

	if err := rows.Err(); err != nil {
		return QueryResult{Error: err.Error()}, nil
	}

	return qr, nil
}

func ExecuteQuery(dbName, query string) (QueryResult, error) {
	return ExecuteQueryContext(context.Background(), dbName, query)
}

// ScanAllRows считывает все строки из rows в [][]interface{} с приведением
// типов по метаданным колонок (int64/float64/bool/time/string).
func ScanAllRows(rows *sql.Rows, cols []string) ([][]interface{}, error) {
	colTypes, err := rows.ColumnTypes()
	if err != nil {
		return nil, err
	}
	var out [][]interface{}
	for rows.Next() {
		vals := make([]interface{}, len(cols))
		for i := range vals {
			dbType := ""
			if i < len(colTypes) {
				dbType = colTypes[i].DatabaseTypeName()
			}
			switch dbType {
			case "INT", "INT IDENTITY", "BIGINT", "SMALLINT", "TINYINT":
				var v sql.NullInt64
				vals[i] = &v
			case "FLOAT", "REAL", "DECIMAL", "NUMERIC", "MONEY", "SMALLMONEY":
				var v sql.NullFloat64
				vals[i] = &v
			case "BIT":
				var v sql.NullBool
				vals[i] = &v
			case "DATETIME", "DATE", "TIME", "DATETIME2", "SMALLDATETIME":
				var v sql.NullTime
				vals[i] = &v
			case "CHAR", "VARCHAR", "NCHAR", "NVARCHAR", "TEXT", "NTEXT":
				var v sql.NullString
				vals[i] = &v
			default:
				var v []byte
				vals[i] = &v
			}
		}
		if err := rows.Scan(vals...); err != nil {
			return nil, err
		}
		row := make([]interface{}, len(cols))
		for i, v := range vals {
			switch val := v.(type) {
			case *sql.NullInt64:
				if val.Valid {
					row[i] = val.Int64
				} else {
					row[i] = nil
				}
			case *sql.NullFloat64:
				if val.Valid {
					row[i] = val.Float64
				} else {
					row[i] = nil
				}
			case *sql.NullBool:
				if val.Valid {
					row[i] = val.Bool
				} else {
					row[i] = nil
				}
			case *sql.NullTime:
				if val.Valid {
					row[i] = val.Time
				} else {
					row[i] = nil
				}
			case *sql.NullString:
				if val.Valid {
					row[i] = val.String
				} else {
					row[i] = nil
				}
			case *[]byte:
				if val != nil && len(*val) > 0 {
					row[i] = string(*val)
				} else {
					row[i] = nil
				}
			default:
				row[i] = v
			}
		}
		out = append(out, row)
	}
	return out, rows.Err()
}

// HeldConn — удержанное соединение к источнику. Temp-таблицы, созданные на
// этом коннекте, живут, пока он открыт.
type HeldConn struct {
	DB   *sql.DB
	Conn *sql.Conn
}

func (h *HeldConn) Close() {
	if h == nil {
		return
	}
	if h.Conn != nil {
		_ = h.Conn.Close()
	}
	if h.DB != nil {
		_ = h.DB.Close()
	}
}

// OpenHeldConn открывает отдельное соединение к указанной БД и возвращает
// удержанный *sql.Conn. Требует ctx не отменённым на время жизни сессии.
// Драйвер "mssql" обрабатывает '?'-плейсхолдеры параметров (в отличие от
// "sqlserver", который передаёт запрос как есть).
func OpenHeldConn(ctx context.Context, dbName string) (*HeldConn, error) {
	cfg, ok := dbConfigs[dbName]
	if !ok {
		return nil, fmt.Errorf("database %s not found", dbName)
	}
	db, err := sql.Open("mssql", getConnectionString(cfg))
	if err != nil {
		return nil, err
	}
	conn, err := db.Conn(ctx)
	if err != nil {
		db.Close()
		return nil, err
	}
	return &HeldConn{DB: db, Conn: conn}, nil
}

func executeQueryFallback(db *sql.DB, query string) (QueryResult, error) {
	setupQuery := "SET LANGUAGE Russian; SET DATEFORMAT ymd; SET NOCOUNT ON; "
	fullQuery := setupQuery + query

	rows, err := db.Query(fullQuery)
	if err != nil {
		return QueryResult{Error: err.Error()}, nil
	}
	defer rows.Close()

	qr := QueryResult{}

	for {
		cols, err := rows.Columns()
		if err != nil {
			return QueryResult{Error: err.Error()}, nil
		}

		if len(cols) > 0 {
			qr = QueryResult{Columns: cols}
			for rows.Next() {
				vals := make([]sql.RawBytes, len(cols))
				ptrs := make([]interface{}, len(cols))
				for i := range vals {
					ptrs[i] = &vals[i]
				}
				if err := rows.Scan(ptrs...); err != nil {
					return QueryResult{Error: err.Error()}, nil
				}
				row := make([]interface{}, len(cols))
				for i, v := range vals {
					if v == nil {
						row[i] = nil
					} else {
						row[i] = string(v)
					}
				}
				qr.Rows = append(qr.Rows, row)
			}
			break
		}

		if !rows.NextResultSet() {
			break
		}
	}

	if err := rows.Err(); err != nil {
		return QueryResult{Error: err.Error()}, nil
	}

	return qr, nil
}
