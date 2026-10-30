package main

import (
	"errors"
	"fmt"
	"regexp"
	"strings"
)

const (
	stCode = iota
	stQuote
	stLineComment
	stBlockComment
)

func isWordStart(ch byte) bool {
	return ch == '_' || (ch >= 'a' && ch <= 'z') || (ch >= 'A' && ch <= 'Z')
}

// snippet нормализует фрагмент SQL для сообщения об ошибке.
func snippet(s string, n int) string {
	s = strings.Join(strings.Fields(s), " ")
	if len(s) > n {
		s = s[:n] + "..."
	}
	return s
}

func isWordChar(ch byte) bool {
	return isWordStart(ch) || (ch >= '0' && ch <= '9') || ch == '@' || ch == '#' || ch == '$'
}

// splitTopLevel разделяет SQL-батч на операторы по ';' вне кавычек,
// комментариев и скобок. Операторы вида "GO" пропускаются.
func splitTopLevel(sql string) []string {
	var stmts []string
	var cur strings.Builder
	depth := 0
	state := stCode
	i, n := 0, len(sql)
	for i < n {
		ch := sql[i]
		switch state {
		case stCode:
			switch {
			case ch == '\'':
				state = stQuote
				cur.WriteByte(ch)
			case ch == '-' && i+1 < n && sql[i+1] == '-':
				state = stLineComment
				cur.WriteString("--")
				i++
			case ch == '/' && i+1 < n && sql[i+1] == '*':
				state = stBlockComment
				cur.WriteString("/*")
				i++
			case ch == '(':
				depth++
				cur.WriteByte(ch)
			case ch == ')':
				if depth > 0 {
					depth--
				}
				cur.WriteByte(ch)
			case ch == ';' && depth == 0:
				stmts = append(stmts, cur.String())
				cur.Reset()
			default:
				cur.WriteByte(ch)
			}
		case stQuote:
			cur.WriteByte(ch)
			if ch == '\'' {
				if i+1 < n && sql[i+1] == '\'' {
					cur.WriteByte(sql[i+1])
					i++
				} else {
					state = stCode
				}
			}
		case stLineComment:
			cur.WriteByte(ch)
			if ch == '\n' {
				state = stCode
			}
		case stBlockComment:
			cur.WriteByte(ch)
			if ch == '*' && i+1 < n && sql[i+1] == '/' {
				cur.WriteByte('/')
				i++
				state = stCode
			}
		}
		i++
	}
	rest := cur.String()
	if strings.TrimSpace(rest) != "" {
		stmts = append(stmts, rest)
	}

	var out []string
	for _, s := range stmts {
		t := strings.ToUpper(strings.TrimSpace(s))
		if t == "GO" || strings.HasPrefix(t, "GO ") || strings.HasPrefix(t, "GO\t") {
			continue
		}
		out = append(out, s)
	}
	return out
}

// firstWord возвращает первое слово оператора, пропуская комментарии,
// строковые литералы и скобочные конструкции в начале.
func firstWord(s string) string {
	i, n := 0, len(s)
	for i < n {
		ch := s[i]
		switch {
		case ch == '\'' || ch == '"' || ch == '`':
			i++
			for i < n && s[i] != ch {
				i++
			}
			i++
		case ch == '-' && i+1 < n && s[i+1] == '-':
			i += 2
			for i < n && s[i] != '\n' {
				i++
			}
		case ch == '/' && i+1 < n && s[i+1] == '*':
			i += 2
			for i+1 < n && !(s[i] == '*' && s[i+1] == '/') {
				i++
			}
			i += 2
		case ch == '(':
			depth := 1
			i++
			for i < n && depth > 0 {
				if s[i] == '(' {
					depth++
				} else if s[i] == ')' {
					depth--
				}
				i++
			}
		case ch == ' ' || ch == '\t' || ch == '\r' || ch == '\n':
			i++
		case isWordStart(ch):
			j := i
			for j < n && isWordChar(s[j]) {
				j++
			}
			return s[i:j]
		default:
			return s[i : i+1]
		}
	}
	return ""
}

// stripTrailingOrderBy отрезает хвостовое предложение ORDER BY верхнего
// уровня (за ним в SELECT больше ничего не бывает). Внутренние ORDER BY
// в подзапросах/скобках не затрагиваются. Возвращает тело без него.
func stripTrailingOrderBy(s string) string {
	depth := 0
	state := stCode
	cut := -1
	i, n := 0, len(s)
	for i < n {
		ch := s[i]
		switch state {
		case stCode:
			switch {
			case ch == '\'':
				state = stQuote
				i++
			case ch == '-' && i+1 < n && s[i+1] == '-':
				state = stLineComment
				i += 2
			case ch == '/' && i+1 < n && s[i+1] == '*':
				state = stBlockComment
				i += 2
			case ch == '(':
				depth++
				i++
			case ch == ')':
				if depth > 0 {
					depth--
				}
				i++
			case isWordStart(ch):
				j := i
				for j < n && isWordChar(s[j]) {
					j++
				}
				if depth == 0 && strings.EqualFold(s[i:j], "ORDER") {
					k := j
					for k < n && (s[k] == ' ' || s[k] == '\t' || s[k] == '\r' || s[k] == '\n') {
						k++
					}
					if k+1 < n && strings.EqualFold(s[k:k+2], "BY") &&
						(k+2 >= n || !isWordChar(s[k+2])) {
						cut = i
						i = k + 2
						continue
					}
				}
				i = j
			default:
				i++
			}
		case stQuote:
			if ch == '\'' {
				if i+1 < n && s[i+1] == '\'' {
					i += 2
				} else {
					state = stCode
					i++
				}
			} else {
				i++
			}
		case stLineComment:
			if ch == '\n' {
				state = stCode
			}
			i++
		case stBlockComment:
			if ch == '*' && i+1 < n && s[i+1] == '/' {
				i += 2
				state = stCode
			} else {
				i++
			}
		}
	}
	if cut >= 0 {
		return s[:cut]
	}
	return s
}

// stripTrailingOption отрезает хвостовую подсказку OPTION (...) верхнего
// уровня (идёт самой последней в SELECT). Возвращает тело без неё и саму
// подсказку. Внутренние OPTION в подзапросах не затрагиваются.
func stripTrailingOption(s string) (string, string) {
	depth := 0
	state := stCode
	cut := -1
	i, n := 0, len(s)
	for i < n {
		ch := s[i]
		switch state {
		case stCode:
			switch {
			case ch == '\'':
				state = stQuote
				i++
			case ch == '-' && i+1 < n && s[i+1] == '-':
				state = stLineComment
				i += 2
			case ch == '/' && i+1 < n && s[i+1] == '*':
				state = stBlockComment
				i += 2
			case ch == '(':
				depth++
				i++
			case ch == ')':
				if depth > 0 {
					depth--
				}
				i++
			case isWordStart(ch):
				j := i
				for j < n && isWordChar(s[j]) {
					j++
				}
				if depth == 0 && strings.EqualFold(s[i:j], "OPTION") {
					k := j
					for k < n && (s[k] == ' ' || s[k] == '\t' || s[k] == '\r' || s[k] == '\n') {
						k++
					}
					if k < n && s[k] == '(' {
						cut = i
						i = j
						continue
					}
				}
				i = j
			default:
				i++
			}
		case stQuote:
			if ch == '\'' {
				if i+1 < n && s[i+1] == '\'' {
					i += 2
				} else {
					state = stCode
					i++
				}
			} else {
				i++
			}
		case stLineComment:
			if ch == '\n' {
				state = stCode
			}
			i++
		case stBlockComment:
			if ch == '*' && i+1 < n && s[i+1] == '/' {
				i += 2
				state = stCode
			} else {
				i++
			}
		}
	}
	if cut >= 0 {
		return strings.TrimSpace(s[:cut]), strings.TrimSpace(s[cut:])
	}
	return s, ""
}

// mainSelectPos возвращает позицию первого SELECT на глубине 0.
func mainSelectPos(s string) (int, error) {
	depth := 0
	state := stCode
	i, n := 0, len(s)
	for i < n {
		ch := s[i]
		switch state {
		case stCode:
			switch {
			case ch == '\'':
				state = stQuote
				i++
			case ch == '-' && i+1 < n && s[i+1] == '-':
				state = stLineComment
				i += 2
			case ch == '/' && i+1 < n && s[i+1] == '*':
				state = stBlockComment
				i += 2
			case ch == '(':
				depth++
				i++
			case ch == ')':
				if depth > 0 {
					depth--
				}
				i++
			case isWordStart(ch):
				j := i
				for j < n && isWordChar(s[j]) {
					j++
				}
				word := s[i:j]
				if depth == 0 && strings.EqualFold(word, "SELECT") {
					return i, nil
				}
				i = j
			default:
				i++
			}
		case stQuote:
			if ch == '\'' {
				if i+1 < n && s[i+1] == '\'' {
					i += 2
				} else {
					state = stCode
					i++
				}
			} else {
				i++
			}
		case stLineComment:
			if ch == '\n' {
				state = stCode
			}
			i++
		case stBlockComment:
			if ch == '*' && i+1 < n && s[i+1] == '/' {
				i += 2
				state = stCode
			} else {
				i++
			}
		}
	}
	return -1, errors.New("в последнем операторе не найден SELECT")
}

// isTrailingStmt возвращает true для операторов, которые не дают данных и
// обычно стоят в конце батча (уборка временных таблиц). Они не могут быть
// "последним оператором" при поиске финального SELECT/WITH/EXEC.
func isTrailingStmt(firstWord string) bool {
	switch firstWord {
	case "DROP", "COMMIT", "ROLLBACK", "PRINT", "RAISERROR", "THROW":
		return true
	}
	return false
}

// reReportName — идентификатор reportName как отдельное слово (не часть
// @reportName / #reportName / another_reportName и т.п.).
var reReportName = regexp.MustCompile(`(?i)(^|[^@#0-9A-Za-z_])reportName([^@#0-9A-Za-z_])`)

// transformFinalSelect разбирает батч. Последний оператор, дающий данные,
// должен быть SELECT/WITH/EXEC: он оборачивается в SELECT 'reportName',
// 'connectionName', t.* INTO #gr_<token> FROM (...) AS t (для SELECT/WITH)
// либо возвращается ExecSpec для захвата результата процедуры (для EXEC).
// Хвостовые операторы очистки (DROP TABLE и т.п.) после него выполняются
// после обёртки.
func transformFinalSelect(sql, tableName, reportName, connectionName string) (*TransformResult, error) {
	stmts := splitTopLevel(sql)

	// отбрасываем операторы из одних комментариев/пробелов (например,
	// хвостовой комментарий после последней ';')
	var meaningful []string
	for _, s := range stmts {
		t := strings.TrimSpace(s)
		if t == "" {
			continue
		}
		if firstWord(t) == "" {
			continue
		}
		meaningful = append(meaningful, s)
	}
	if len(meaningful) == 0 {
		return nil, errors.New("SQL пуст")
	}

	// последний оператор, дающий данные: идём с конца, пропуская уборку.
	// Оператор, начинающийся с END (терминатор блока BEGIN...END без ';'),
	// может содержать финальный SELECT — тогда он и есть последний; если
	// SELECT в нём нет, это просто хвост блока, и его пропускаем.
	lastIdx := -1
	for i := len(meaningful) - 1; i >= 0; i-- {
		fw := strings.ToUpper(firstWord(strings.TrimSpace(meaningful[i])))
		if isTrailingStmt(fw) {
			continue
		}
		if fw == "END" {
			// END без ';' склеен со следующим оператором: если в нём есть
			// SELECT на глубине 0 — это финальный оператор; иначе хвост блока.
			if _, err := mainSelectPos(strings.TrimSpace(meaningful[i])); err != nil {
				continue
			}
		}
		lastIdx = i
		break
	}
	if lastIdx < 0 {
		return nil, errors.New("в батче нет оператора SELECT, WITH или EXEC")
	}

	last := strings.TrimSpace(meaningful[lastIdx])
	prior := meaningful[:lastIdx]
	priorBatch := strings.Join(prior, ";")
	trail := meaningful[lastIdx+1:]
	trailBatch := strings.Join(trail, ";")

	fw := strings.ToUpper(firstWord(last))
	switch fw {
	case "SELECT", "WITH", "END":
		pos, err := mainSelectPos(last)
		if err != nil {
			return nil, err
		}
		prefix := last[:pos]
		body := strings.TrimSpace(stripTrailingOrderBy(last[pos+len("SELECT"):]))
		body, opt := stripTrailingOption(body)

		esq := strings.ReplaceAll(reportName, "'", "''")
		esc := strings.ReplaceAll(connectionName, "'", "''")
		// идентификатор reportName в финальном SELECT подставляется именем
		// отчёта: SELECT reportName Отчет, ... -> SELECT 'ЮЛ ФАС (Итоги)' Отчет, ...
		body = reReportName.ReplaceAllString(body, "$1'"+esq+"'$2")
		wrapped := fmt.Sprintf(
			"SELECT '%s' AS [Отчет], '%s' AS [Филиал], t.* INTO %s FROM (SELECT %s) AS t",
			esq, esc, tableName, body)
		if opt != "" {
			wrapped += " " + opt
		}

		batch := prefix + wrapped
		if priorBatch != "" {
			batch = priorBatch + ";" + batch
		}
		if trailBatch != "" {
			batch = batch + ";" + trailBatch
		}
		return &TransformResult{Batch: batch}, nil
	case "EXEC", "EXECUTE":
		stmt := last
		if trailBatch != "" {
			stmt = stmt + ";" + trailBatch
		}
		return &TransformResult{Batch: priorBatch, Exec: &ExecSpec{Stmt: stmt}}, nil
	default:
		return nil, fmt.Errorf("последний оператор должен начинаться с SELECT, WITH или EXEC, а начинается с %q (фрагмент: %s)",
			fw, snippet(last, 200))
	}
}
