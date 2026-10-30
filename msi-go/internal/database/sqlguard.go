package database

// Страж безопасности: SQL отчётов работает с чужими БД, где основная схема
// данных — stack. Через службу выполнения проходит только пользовательский
// SQL (редакторы отчётов/фильтров/запросов), поэтому здесь жёстко:
//
//   - из схемы stack разрешён ТОЛЬКО SELECT (в т.ч. вызовы функций stack.*);
//   - любые INSERT/UPDATE/DELETE/CREATE/DROP/ALTER и т.п. разрешены только
//     для схемы dbo и #временных таблиц;
//   - EXEC/EXECUTE, GRANT, BACKUP и прочее вне контекста чтения — запрещены.
//
// Правило применяется до отправки запроса на сервер, в ExecuteQueryContext.

import (
	"fmt"
	"regexp"
	"strings"
)

// replaceSQLNoise убирает строковые литералы и комментарии, чтобы ключевые
// слова внутри них не давали ложных срабатываний. Идентификаторы в [скобках]
// сохраняются: по ним определяется схема цели.
func replaceSQLNoise(sqlText string) string {
	var b strings.Builder
	b.Grow(len(sqlText))
	i := 0
	n := len(sqlText)
	for i < n {
		c := sqlText[i]
		switch {
		case c == '\'' || (c == 'N' || c == 'n') && i+1 < n && sqlText[i+1] == '\'':
			if c != '\'' {
				b.WriteByte(' ')
				i++
			}
			// строка до закрывающей кавычки ('' — экранированная)
			i++
			for i < n {
				if sqlText[i] == '\'' {
					if i+1 < n && sqlText[i+1] == '\'' {
						i += 2
						continue
					}
					i++
					break
				}
				i++
			}
			b.WriteByte(' ')
		case c == '-' && i+1 < n && sqlText[i+1] == '-':
			// однострочный комментарий
			for i < n && sqlText[i] != '\n' {
				i++
			}
			b.WriteByte(' ')
		case c == '/' && i+1 < n && sqlText[i+1] == '*':
			// блочный комментарий
			i += 2
			for i+1 < n && !(sqlText[i] == '*' && sqlText[i+1] == '/') {
				i++
			}
			if i+1 < n {
				i += 2
			}
			b.WriteByte(' ')
		default:
			b.WriteByte(c)
			i++
		}
	}
	return b.String()
}

// writeVerbRe — глаголы изменения данных/схемы с опциональным хвостом
// (INTO/FROM/TABLE). Для каждого совпадения далее разбирается цель.
var writeVerbRe = regexp.MustCompile(
	`(?i)\b(INSERT(?:\s+INTO)?|UPDATE|DELETE(?:\s+FROM)?|MERGE(?:\s+INTO)?|` +
		`TRUNCATE(?:\s+TABLE)?|ALTER\s+TABLE|DROP\s+(?:TABLE|VIEW|PROC|PROCEDURE|FUNCTION|INDEX|SCHEMA)|` +
		`CREATE\s+(?:TABLE|VIEW|PROC|PROCEDURE|FUNCTION))\b`)

// deniedVerbRe — запрещено безусловно: выполнение кода и администрирование.
var deniedVerbRe = regexp.MustCompile(
	`(?i)\b(EXEC|EXECUTE|SP_EXECUTESQL|SP_RENAME|GRANT|REVOKE|DENY|BACKUP|RESTORE|KILL|SHUTDOWN|BULK|OPENROWSET|OPENDATASOURCE)\b`)

// alterOtherRe — ALTER не по таблице (DATABASE/SCHEMA/VIEW/PROC…).
var alterOtherRe = regexp.MustCompile(`(?i)\bALTER\s+(DATABASE|SCHEMA|VIEW|PROC|PROCEDURE|FUNCTION|TRIGGER|INDEX)\b`)

// intoRe — цели всех INTO: ловит SELECT … INTO и дублирует разбор INSERT/MERGE
// (для единообразия это не мешает). @переменные пропускаются.
var intoRe = regexp.MustCompile(`(?i)\bINTO\s+`)

// createIndexOnRe — CREATE INDEX … ON <цель>.
var createIndexOnRe = regexp.MustCompile(`(?i)\bCREATE\s+(?:UNIQUE\s+)?(?:CLUSTERED\s+|NONCLUSTERED\s+)?INDEX\s+[^\s]+\s+ON\s+`)

const identChars = "abcdefghijklmnopqrstuvwxyz_#@$0123456789"

// readIdentifier читает с позиции i имя (простое или [в скобках]); возвращает
// имя без скобок и новую позицию.
func readIdentifier(s string, i int) (string, int) {
	n := len(s)
	for i < n && (s[i] == ' ' || s[i] == '\t' || s[i] == '\n' || s[i] == '\r') {
		i++
	}
	if i >= n {
		return "", i
	}
	if s[i] == '[' {
		j := i + 1
		for j < n && s[j] != ']' {
			j++
		}
		if j < n {
			return strings.TrimSpace(s[i+1 : j]), j + 1
		}
		return s[i+1:], n
	}
	j := i
	for j < n && strings.IndexByte(identChars, toLower(s[j])) >= 0 {
		j++
	}
	return s[i:j], j
}

func toLower(c byte) byte {
	if c >= 'A' && c <= 'Z' {
		return c + 32
	}
	return c
}

// skipWord пропускает служебное слово (с границей слова), если оно стоит в i.
func skipWord(s string, i int, word string) int {
	rest := s[i:]
	lower := strings.ToLower(rest)
	if !strings.HasPrefix(lower, strings.ToLower(word)) {
		return i
	}
	end := i + len(word)
	// слово должно заканчиваться границей: иначе FROMbier съестся как FROM
	if end < len(s) && strings.IndexByte(identChars, toLower(s[end])) >= 0 {
		return i
	}
	return end
}

// readTarget читает цель оператора: до трёх dot-частей [db.][schema.]object.
// Служебные слова INTO/FROM/TABLE перед целью пропускаются.
func readTarget(masked string, pos int) []string {
	i := pos
	// Пропускаем не более двух служебных слов перед целью.
	for skip := 0; skip < 2; skip++ {
		save := i
		for _, w := range []string{"INTO", "FROM", "TABLE"} {
			ni := skipWord(masked, i, w)
			if ni != i {
				i = ni
				break
			}
		}
		if i == save {
			break
		}
	}
	var parts []string
	for k := 0; k < 3; k++ {
		name, ni := readIdentifier(masked, i)
		if name == "" || k == 0 && !isTargetStart(name) {
			return parts
		}
		parts = append(parts, strings.ToLower(name))
		i = ni
		// точка (возможно с пробелами) — продолжаем, иначе цель закончена
		j := i
		for j < len(masked) && (masked[j] == ' ' || masked[j] == '\t' || masked[j] == '\n') {
			j++
		}
		if j >= len(masked) || masked[j] != '.' {
			break
		}
		i = j + 1
	}
	return parts
}

func isTargetStart(name string) bool {
	if name == "" {
		return false
	}
	c := toLower(name[0])
	return strings.IndexByte("abcdefghijklmnopqrstuvwxyz_#", c) >= 0 || name[0] == '@'
}

// schemaOfTarget вытаскивает схему из частей цели.
func schemaOfTarget(parts []string) string {
	switch len(parts) {
	case 0, 1:
		return "" // схема не указана — по умолчанию dbo
	case 2:
		return parts[0]
	default:
		return parts[1]
	}
}

// GuardStackReadOnly возвращает ошибку, если SQL меняет данные или схему
// вне разрешённого (dbo и #временные таблицы), либо обращается к stack не
// через SELECT.
func GuardStackReadOnly(query string) error {
	if strings.TrimSpace(query) == "" {
		return nil
	}
	masked := replaceSQLNoise(query)

	if m := deniedVerbRe.FindString(masked); m != "" {
		return fmt.Errorf("запрос отклонён: «%s» запрещён — служба выполняет только чтение (SELECT) и запись в dbo/#временные таблицы", strings.ToUpper(strings.TrimSpace(m)))
	}
	if m := alterOtherRe.FindString(masked); m != "" {
		return fmt.Errorf("запрос отклонён: «%s» запрещён — изменение объектов допускается только в схеме dbo", strings.ToUpper(strings.TrimSpace(m)))
	}

	checkTarget := func(pos int, verb string) error {
		parts := readTarget(masked, pos)
		if len(parts) == 0 {
			return nil
		}
		if strings.HasPrefix(parts[0], "#") || strings.HasPrefix(parts[0], "@") {
			return nil // временная таблица или переменная
		}
		schema := schemaOfTarget(parts)
		if schema == "stack" {
			return fmt.Errorf("запрос отклонён: %s затрагивает схему stack — из неё разрешён только SELECT", verb)
		}
		if schema != "" && schema != "dbo" && schema != "tempdb" {
			return fmt.Errorf("запрос отклонён: %s затрагивает схему «%s» — запись разрешена только в dbo и #временные таблицы", verb, schema)
		}
		return nil
	}

	for _, m := range writeVerbRe.FindAllStringSubmatchIndex(masked, -1) {
		verb := strings.ToUpper(strings.TrimSpace(masked[m[0]:m[1]]))
		if m[0] > 0 && masked[m[0]-1] == '[' {
			continue // слово внутри [идентификатора]
		}
		if err := checkTarget(m[1], verb); err != nil {
			return err
		}
	}
	for _, m := range intoRe.FindAllStringIndex(masked, -1) {
		if err := checkTarget(m[1], "SELECT … INTO"); err != nil {
			return err
		}
	}
	for _, m := range createIndexOnRe.FindAllStringIndex(masked, -1) {
		if err := checkTarget(m[1], "CREATE INDEX"); err != nil {
			return err
		}
	}
	return nil
}
