package main

import (
	"context"
	"database/sql"
	"errors"
	"fmt"
	"os"
	"sort"
	"strconv"
	"strings"

	"goreport/internal/database"
)

// ExecSpec — последний оператор батча является вызовом хранимой процедуры.
type ExecSpec struct {
	Stmt string
}

// TransformResult — результат трансформации батча.
type TransformResult struct {
	Batch string    // батч для выполнения (с обёрнутым SELECT или предыдущие операторы)
	Exec  *ExecSpec // не nil, если батч заканчивается EXEC
}

// execToTempTable выполняет EXEC на удержанном коннекте, создаёт temp-таблицу
// с первыми колонками reportName/connectionName и наполняет её результатом.
// По умолчанию результат читается потоково и материализуется в temp-таблицу
// пакетными INSERT (процедура выполняется с параллелизмом, память не растёт
// с числом строк). Путь describe + INSERT...EXEC (выполняет процедуру
// однопоточно и заметно медленнее) включается переменной окружения
// EXEC_USE_INSERTEXEC=1.
func execToTempTable(ctx context.Context, conn *sql.Conn, stmt, table, reportName, connectionName string) ([]string, int64, error) {
	if _, err := conn.ExecContext(ctx, "SET NOCOUNT ON"); err != nil {
		// не фатально
	}
	if os.Getenv("EXEC_USE_INSERTEXEC") == "1" {
		cols, err := describeAndCreate(ctx, conn, stmt, table, reportName, connectionName)
		if err == nil {
			ins := "INSERT INTO " + table + " (" + quotedList(cols) + ") " + stmt
			if _, err := conn.ExecContext(ctx, ins); err != nil {
				return nil, 0, fmt.Errorf("insert exec: %v", err)
			}

			var count int64
			if err := conn.QueryRowContext(ctx, "SELECT COUNT(*) FROM "+table).Scan(&count); err != nil {
				return nil, 0, fmt.Errorf("count: %v", err)
			}
			return cols, count, nil
		}
	}
	return execFallbackToMemory(ctx, conn, stmt, table, reportName, connectionName)
}

// describeAndCreate описывает первый результирующий набор EXEC через
// sp_describe_first_result_set и создаёт temp-таблицу нужной формы.
func describeAndCreate(ctx context.Context, conn *sql.Conn, stmt, table, reportName, connectionName string) ([]string, error) {
	descSQL := "EXEC sp_describe_first_result_set @tsql = N'" +
		strings.ReplaceAll(stmt, "'", "''") +
		"', @params = NULL, @browse_information_mode = 0"

	rows, err := conn.QueryContext(ctx, descSQL)
	if err != nil {
		return nil, err
	}
	descCols, err := rows.Columns()
	if err != nil {
		rows.Close()
		return nil, err
	}
	md, err := database.ScanAllRows(rows, descCols)
	rows.Close()
	if err != nil {
		return nil, err
	}

	if len(md) == 0 {
		return nil, errors.New("describe: пустой результат")
	}
	// строка ошибки описания (error_number не NULL)
	for _, row := range md {
		for i, c := range descCols {
			if c == "error_number" && row[i] != nil {
				msg := "describe: ошибка описания"
				for j, c2 := range descCols {
					if c2 == "error_message" && row[j] != nil {
						msg = fmt.Sprintf("%s: %v", msg, row[j])
					}
				}
				return nil, errors.New(msg)
			}
		}
	}

	// сортировка по column_ordinal
	ordIdx, nameIdx, typeIdx := -1, -1, -1
	for i, c := range descCols {
		switch c {
		case "column_ordinal":
			ordIdx = i
		case "name":
			nameIdx = i
		case "system_type_name":
			typeIdx = i
		}
	}
	if ordIdx >= 0 {
		sort.SliceStable(md, func(a, b int) bool {
			av, aok := asFloat(md[a][ordIdx])
			bv, bok := asFloat(md[b][ordIdx])
			if aok && bok {
				return av < bv
			}
			return a < b
		})
	}

	cols, ddl := buildTableDDL(table, reportName, connectionName, nameIdx, typeIdx, md)
	if _, err := conn.ExecContext(ctx, ddl); err != nil {
		return nil, fmt.Errorf("create table: %v", err)
	}
	return cols, nil
}

func buildTableDDL(table, reportName, connectionName string, nameIdx, typeIdx int, md [][]interface{}) ([]string, string) {
	cols := []string{"Отчет", "Филиал"}
	defs := []string{
		quoteName("Отчет") + " nvarchar(200) NULL",
		quoteName("Филиал") + " nvarchar(200) NULL",
	}
	used := map[string]bool{"Отчет": true, "Филиал": true}
	ordinal := 0
	for _, row := range md {
		ordinal++
		name := ""
		if nameIdx >= 0 && row[nameIdx] != nil {
			name = fmt.Sprintf("%v", row[nameIdx])
		}
		if name == "" {
			name = fmt.Sprintf("C%d", ordinal)
		}
		base := name
		for i := 2; used[base]; i++ {
			base = name + "_" + strconv.Itoa(i)
		}
		used[base] = true

		typ := "nvarchar(max)"
		if typeIdx >= 0 && row[typeIdx] != nil {
			typ = fmt.Sprintf("%v", row[typeIdx])
		}
		cols = append(cols, base)
		defs = append(defs, quoteName(base)+" "+typ+" NULL")
	}
	return cols, "CREATE TABLE " + table + " (" + strings.Join(defs, ", ") + ")"
}

// execFallbackToMemory запускает EXEC, читает ВСЕ строки в память,
// закрывает результирующий набор (очищая TDS-поток), затем создаёт
// temp-таблицу и вставляет данные батчами.
func execFallbackToMemory(ctx context.Context, conn *sql.Conn, stmt, table, reportName, connectionName string) ([]string, int64, error) {
	if _, err := conn.ExecContext(ctx, "SET NOCOUNT ON"); err != nil {
		// не фатально — пробуем дальше
	}
	rows, err := conn.QueryContext(ctx, stmt)
	if err != nil {
		return nil, 0, fmt.Errorf("exec: %v", err)
	}

	// Читаем все результирующие наборы; берём ПОСЛЕДНИЙ, у которого есть
	// колонки — для батча, заканчивающегося EXEC, это результат именно
	// финального SELECT/процедуры, а промежуточные наборы отбрасываются.
	var allRows [][]interface{}
	var srcCols []string
	var colTypes []*sql.ColumnType

	for {
		cts, cerr := rows.ColumnTypes()
		if cerr != nil {
			cts = nil
		}
		curCols := make([]string, len(cts))
		for i, ct := range cts {
			curCols[i] = ct.Name()
		}

		if len(cts) > 0 {
			var curRows [][]interface{}
			for rows.Next() {
				vals := make([]interface{}, len(cts))
				for i := range vals {
					vals[i] = execScanDest(cts[i])
				}
				if err := rows.Scan(vals...); err != nil {
					rows.Close()
					return nil, 0, fmt.Errorf("exec scan: %v", err)
				}
				row := make([]interface{}, len(cts))
				for i, v := range vals {
					row[i] = execScanVal(v)
				}
				curRows = append(curRows, row)
			}
			if err := rows.Err(); err != nil {
				rows.Close()
				return nil, 0, fmt.Errorf("exec rows: %v", err)
			}
			allRows = curRows
			srcCols = curCols
			colTypes = cts
		}

		if !rows.NextResultSet() {
			break
		}
	}
	rows.Close()

	if len(srcCols) == 0 {
		return nil, 0, errors.New("exec: процедура не вернула результирующий набор")
	}

	cols := make([]string, 0, len(srcCols)+2)
	cols = append(cols, "Отчет", "Филиал")
	used := map[string]bool{"Отчет": true, "Филиал": true}
	for _, c := range srcCols {
		base := c
		if base == "" {
			base = "C" + strconv.Itoa(len(cols)+1)
		}
		for i := 2; used[base]; i++ {
			base = c + "_" + strconv.Itoa(i)
		}
		used[base] = true
		cols = append(cols, base)
	}

	var defs []string
	defs = append(defs, quoteName("Отчет")+" nvarchar(200) NULL")
	defs = append(defs, quoteName("Филиал")+" nvarchar(200) NULL")
	for i := 2; i < len(cols); i++ {
		typ := "nvarchar(max)"
		if colTypes != nil {
			typ = execColTypeDDL(colTypes[i-2])
		}
		defs = append(defs, quoteName(cols[i])+" "+typ+" NULL")
	}
	ddl := "CREATE TABLE " + table + " (" + strings.Join(defs, ", ") + ")"
	if _, err := conn.ExecContext(ctx, ddl); err != nil {
		return nil, 0, fmt.Errorf("create table (fallback): %v", err)
	}

	placeholders := strings.TrimSuffix(strings.Repeat("?, ", len(cols)), ", ")

	batchRows := 1000
	if maxByParams := 2000 / len(cols); maxByParams < batchRows {
		batchRows = maxByParams
	}
	if batchRows < 1 {
		batchRows = 1
	}

	var count int64
	batch := make([][]interface{}, 0, batchRows)
	flush := func() error {
		if len(batch) == 0 {
			return nil
		}
		var sb strings.Builder
		sb.WriteString("INSERT INTO " + table + " (" + quotedList(cols) + ") VALUES ")
		args := make([]interface{}, 0, len(batch)*len(cols))
		for ri, row := range batch {
			if ri > 0 {
				sb.WriteString(", ")
			}
			sb.WriteString("(" + placeholders + ")")
			args = append(args, reportName, connectionName)
			args = append(args, row...)
		}
		if _, err := conn.ExecContext(ctx, sb.String(), args...); err != nil {
			return fmt.Errorf("insert (fallback): %v", err)
		}
		count += int64(len(batch))
		batch = batch[:0]
		return nil
	}

	for _, row := range allRows {
		batch = append(batch, row)
		if len(batch) >= batchRows {
			if err := flush(); err != nil {
				return nil, count, err
			}
		}
	}
	if err := flush(); err != nil {
		return nil, count, err
	}

	return cols, count, nil
}

// execColTypeDDL преобразует метаданные колонки результата EXEC в тип DDL
// для temp-таблицы. Значения вставляются типизированными параметрами,
// поэтому достаточно корректного типа (varchar/nvarchar(max) для строк).
func execColTypeDDL(ct *sql.ColumnType) string {
	switch strings.ToUpper(strings.TrimSpace(ct.DatabaseTypeName())) {
	case "INT", "INT IDENTITY":
		return "int"
	case "BIGINT":
		return "bigint"
	case "SMALLINT":
		return "smallint"
	case "TINYINT":
		return "tinyint"
	case "FLOAT":
		return "float"
	case "REAL":
		return "real"
	case "MONEY":
		return "money"
	case "SMALLMONEY":
		return "smallmoney"
	case "BIT":
		return "bit"
	case "DECIMAL", "NUMERIC":
		if p, s, ok := ct.DecimalSize(); ok && p > 0 {
			return fmt.Sprintf("decimal(%d,%d)", p, s)
		}
		return "decimal(38,10)"
	case "DATETIME":
		return "datetime"
	case "SMALLDATETIME":
		return "smalldatetime"
	case "DATE":
		return "date"
	case "TIME":
		return "time"
	case "DATETIME2":
		return "datetime2"
	case "DATETIMEOFFSET":
		return "datetimeoffset"
	case "UNIQUEIDENTIFIER":
		return "uniqueidentifier"
	case "VARCHAR", "CHAR":
		if l, ok := ct.Length(); ok && l > 0 && l <= 8000 {
			return strings.ToLower(ct.DatabaseTypeName()) + "(" + strconv.Itoa(int(l)) + ")"
		}
		return "varchar(max)"
	case "NVARCHAR", "NCHAR":
		if l, ok := ct.Length(); ok && l > 0 && l <= 4000 {
			return strings.ToLower(ct.DatabaseTypeName()) + "(" + strconv.Itoa(int(l)) + ")"
		}
		return "nvarchar(max)"
	default:
		// TEXT/NTEXT/IMAGE/VARBINARY/XML/неизвестные типы — строковое представление
		return "nvarchar(max)"
	}
}

// execScanDest создаёт цель сканирования для типа колонки (аналог
// ScanAllRows: int64/float64/bool/time/string).
func execScanDest(ct *sql.ColumnType) interface{} {
	switch strings.ToUpper(strings.TrimSpace(ct.DatabaseTypeName())) {
	case "INT", "INT IDENTITY", "BIGINT", "SMALLINT", "TINYINT":
		return &sql.NullInt64{}
	case "FLOAT", "REAL", "DECIMAL", "NUMERIC", "MONEY", "SMALLMONEY":
		return &sql.NullFloat64{}
	case "BIT":
		return &sql.NullBool{}
	case "DATETIME", "DATE", "TIME", "DATETIME2", "SMALLDATETIME":
		return &sql.NullTime{}
	case "CHAR", "VARCHAR", "NCHAR", "NVARCHAR", "TEXT", "NTEXT":
		return &sql.NullString{}
	default:
		var v []byte
		return &v
	}
}

// execScanVal преобразует цель сканирования в готовое значение строки.
func execScanVal(v interface{}) interface{} {
	switch val := v.(type) {
	case *sql.NullInt64:
		if val.Valid {
			return val.Int64
		}
	case *sql.NullFloat64:
		if val.Valid {
			return val.Float64
		}
	case *sql.NullBool:
		if val.Valid {
			return val.Bool
		}
	case *sql.NullTime:
		if val.Valid {
			return val.Time
		}
	case *sql.NullString:
		if val.Valid {
			return val.String
		}
	case *[]byte:
		if val != nil && len(*val) > 0 {
			return string(*val)
		}
	}
	return nil
}

func quoteName(n string) string {
	return "[" + strings.ReplaceAll(n, "]", "]]") + "]"
}

func quotedList(cols []string) string {
	q := make([]string, len(cols))
	for i, c := range cols {
		q[i] = quoteName(c)
	}
	return strings.Join(q, ", ")
}
