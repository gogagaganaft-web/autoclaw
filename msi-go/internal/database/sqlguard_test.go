package database

import "testing"

func TestGuardStackReadOnly(t *testing.T) {
	ok := []string{
		"SELECT * FROM stack.[Лицевые счета]",
		"SELECT TOP 10 * FROM [stack].[Лицевые счета] ls CROSS APPLY stack.AddrLs_Table(ls.ROW_ID, 0) a",
		"SET NOCOUNT ON; SELECT 1",
		"DECLARE @d DATE = GETDATE(); SELECT @d",
		"IF OBJECT_ID('tempdb..#t') IS NOT NULL DROP TABLE #t; SELECT 1 AS x INTO #t FROM stack.x",
		"CREATE TABLE #t (id INT); INSERT INTO #t VALUES (1); SELECT * FROM #t",
		"CREATE TABLE dbo.Log (id INT); INSERT INTO dbo.Log VALUES (1); DELETE FROM dbo.Log",
		"UPDATE dbo.t SET x = 1 WHERE id = 2",
		"SELECT cols INTO ##global_tmp FROM stack.[x]",
		// ключевые слова в литералах и комментариях не считаются
		"SELECT 'DROP TABLE stack.x' AS hint, -- UPDATE stack.y\n 1 AS v",
		"SELECT [update] FROM [stack].[deleted] WHERE [insert] = 1",
		"SELECT * FROM INFORMATION_SCHEMA.TABLES",
		// FROM-хвост с именем, начинающимся на FROM…, не съедается
		"SELECT * FROM FrombierTable",
	}
	for _, q := range ok {
		if err := GuardStackReadOnly(q); err != nil {
			t.Errorf("ожидалось разрешение, получен запрет: %q → %v", q, err)
		}
	}

	deny := map[string]string{
		"INSERT INTO stack.x VALUES (1)":                            "схему stack",
		"INSERT stack.[Лицевые счета] (id) VALUES (1)":              "схему stack",
		"UPDATE [stack].ls SET Номер = '1'":                          "схему stack",
		"DELETE FROM stack.x":                                        "схему stack",
		"DELETE stack.x":                                             "схему stack",
		"MERGE INTO stack.t USING src ON 1=1":                        "схему stack",
		"TRUNCATE TABLE stack.t":                                     "схему stack",
		"DROP TABLE stack.x":                                         "схему stack",
		"DROP VIEW [stack].v":                                        "схему stack",
		"ALTER TABLE stack.t ADD c INT":                              "схему stack",
		"CREATE TABLE stack.tmp (id INT)":                            "схему stack",
		"CREATE VIEW stack.v AS SELECT 1":                            "схему stack",
		"SELECT a, b INTO stack.copy FROM stack.src":                 "схему stack",
		"SELECT a INTO other.t FROM stack.src":                       "запись разрешена только",
		"CREATE TABLE other.t (id INT)":                              "запись разрешена только",
		"INSERT INTO other.t VALUES (1)":                             "запись разрешена только",
		"UPDATE other.t SET x = 1":                                   "запись разрешена только",
		"CREATE INDEX ix ON stack.t (c)":                             "схему stack",
		"EXEC stack.DoSomething":                                     "EXEC",
		"EXECUTE (@sql)":                                             "EXECUTE",
		"GRANT SELECT ON stack.x TO public":                          "GRANT",
		"BACKUP DATABASE kand TO DISK = 'x'":                         "BACKUP",
		"ALTER DATABASE kand SET SINGLE_USER":                        "ALTER",
		"-- комментарий\nINSERT INTO stack.x VALUES (1)":            "схему stack",
		"DECLARE @s NVARCHAR(MAX) = 'x'; EXEC sp_executesql @s":      "EXEC",
	}
	for q, marker := range deny {
		err := GuardStackReadOnly(q)
		if err == nil {
			t.Errorf("ожидался запрет: %q", q)
			continue
		}
		if !containsFold(err.Error(), marker) {
			t.Errorf("запрос %q: сообщение %q не содержит %q", q, err.Error(), marker)
		}
	}
}

func containsFold(haystack, needle string) bool {
	h, n := len(haystack), len(needle)
	if n == 0 || n > h {
		return false
	}
	for i := 0; i+n <= h; i++ {
		match := true
		for j := 0; j < n; j++ {
			a, b := haystack[i+j], needle[j]
			if a >= 'A' && a <= 'Z' {
				a += 32
			}
			if b >= 'A' && b <= 'Z' {
				b += 32
			}
			if a != b {
				match = false
				break
			}
		}
		if match {
			return true
		}
	}
	return false
}
