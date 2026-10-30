# -*- coding: utf-8 -*-
"""Восстановление миграций 08/09 из целевого состояния dev-каталога.

Прошлая сессия применила их на dev (filter_def.updated_by='deploy',
2026-10-27 04:24 UTC), но файлы в рабочих зеркалах не сохранились.
Скрипт снимает актуальные конфиги через /api/filters и собирает
идемпотентные SQL-файлы для прогона на проде.
"""
import json
import urllib.request

API = "http://127.0.0.1:7505/api/filters"
OUT08 = r"C:/AUTOCLAW/08_filter_taxonomy.sql"
OUT09 = r"C:/AUTOCLAW/09_report_fixes.sql"

with urllib.request.urlopen(API) as r:
    filters = json.load(r)["filters"]

# Набор_ЛС создан через UI как демо числовой шкалы — в миграцию не входит.
FIELDS = [f for f in filters if f["field"] != "Набор_ЛС"]


def sqlstr(s: str) -> str:
    return "N'" + s.replace("'", "''") + "'"


def compact(obj) -> str:
    return json.dumps(obj, ensure_ascii=False, separators=(",", ":"))


lines = []
a = lines.append
a("/* ==========================================================================")
a(" * 08_filter_taxonomy.sql — единая таксономия фильтров (восстановлено).")
a(" *")
a(" * Приводит dbo.filter_def к целевому состоянию: подписи без двоеточий,")
a(" * плейсхолдеры «Выберите период» / «Укажите <объект>», типы range-months")
a(" * (шкала месяцев) и range-number (числовая шкала), itemsKind (months/query/")
a(" * databases) и dbSuffix (UL/FL) в config. Полная замена config — состояние")
a(" * снято с dev-контура после выверки (07:24 27.10.2026, updated_by=deploy).")
a(" *")
a(" * Идемпотентно: повторный прогон даёт то же состояние.")
a(" * Демо-фильтр Набор_ЛС (range-number) создаётся через UI и тут не входит.")
a(" * Prod-only: БД (иерархия по уровням) — правка только подписи/плейсхолдера.")
a(" * ========================================================================== */")
a("SET NOCOUNT ON;")
a("SET XACT_ABORT ON;")
a("BEGIN TRANSACTION;")
a("")
a("DECLARE @touched INT = 0;")
a("")
for f in FIELDS:
    field = f["field"]
    cfg = f["config"]
    typ = f["type"]
    label = cfg.get("label") or ""
    cfg_txt = sqlstr(compact(cfg))
    a(f"-- {field}: {label} ({typ})")
    a(f"UPDATE dbo.filter_def")
    a(f"   SET type = {sqlstr(typ)},")
    a(f"       label = {sqlstr(label)},")
    a(f"       config = CAST({cfg_txt} AS NVARCHAR(MAX)),")
    a(f"       updated_at = SYSUTCDATETIME(),")
    a(f"       updated_by = 'deploy'")
    a(f" WHERE field = {sqlstr(field)};")
    a("SET @touched += @@ROWCOUNT;")
    a("")
    a(f"IF EXISTS (SELECT 1 FROM dbo.filter_def WHERE field = {sqlstr(field)})")
    a(f"    INSERT INTO dbo.filter_def_rev (field, action, config, changed_by)")
    a(f"    SELECT {sqlstr(field)}, 'update', CAST({cfg_txt} AS NVARCHAR(MAX)), 'deploy'")
    a(f"    WHERE NOT EXISTS (SELECT 1 FROM dbo.filter_def_rev")
    a(f"                       WHERE field = {sqlstr(field)} AND changed_by = 'deploy'")
    a(f"                         AND action = 'update');")
    a("")

a("-- Prod-only: БД — иерархический справочник по уровням (LVL).")
a("-- На dev фильтра нет, UPDATE молча пропустит. itemsQuery не трогаем.")
a("UPDATE dbo.filter_def")
a("   SET label = N'Фонд по уровням',")
a("       config = CAST(")
a("            JSON_MODIFY(JSON_MODIFY(config, '$.label', N'Фонд по уровням'),")
a("                        '$.placeholder', N'Выберите фонд')")
a("            AS NVARCHAR(MAX)),")
a("       updated_at = SYSUTCDATETIME(),")
a("       updated_by = 'deploy'")
a(" WHERE field = N'БД' AND type = N'hierarchical-list';")
a("SET @touched += @@ROWCOUNT;")
a("")
a("-- Пересборка снимка панели для старой оболочки (аналог syncToolbar).")
a("DECLARE @toolbar NVARCHAR(MAX) =")
a("    (SELECT N'{\"source\":\"filter_def\",\"toolbar\":['")
a("           + STRING_AGG(config, N',') + N']}'")
a("       FROM dbo.filter_def);")
a("")
a("MERGE dbo.ui_config AS t")
a("USING (SELECT 'toolbar' AS setting_key, CAST(@toolbar AS NVARCHAR(MAX)) AS config) AS src")
a("   ON t.setting_key = src.setting_key")
a("WHEN MATCHED THEN")
a("    UPDATE SET config = src.config, updated_at = SYSUTCDATETIME()")
a("WHEN NOT MATCHED THEN")
a("    INSERT (setting_key, config) VALUES (src.setting_key, src.config);")
a("")
a("COMMIT TRANSACTION;")
a("PRINT CONCAT('08: фильтров обновлено: ', @touched);")
a("")
with open(OUT08, "w", encoding="utf-8-sig") as fh:
    fh.write("\n".join(lines))

q = []
b = q.append
b("/* ==========================================================================")
b(" * 09_report_fixes.sql — фиксы токенов в SQL отчётов (восстановлено).")
b(" *")
b(" * RPT_1206: отчёт объявляет фильтр ПериодДни, а в SQL стояли алиасы")
b(" * {perStart}/{perEnd} (контракт ПериодМесяцы) — выбор пользователя")
b(" * игнорировался, подставлялся страховочный период «1 января — сегодня».")
b(" * Токены меняются на контракт ПериодДни: {ПериодДни_start}/{ПериодДни_end}.")
b(" *")
b(" * Идемпотентно: целевые токены не содержат исходных паттернов.")
b(" * ========================================================================== */")
b("SET NOCOUNT ON;")
b("SET XACT_ABORT ON;")
b("")
b("UPDATE dbo.reports")
b("   SET query_text = REPLACE(REPLACE(query_text,")
b("                            N'{perStart}', N'{ПериодДни_start}'),")
b("                        N'{perEnd}',   N'{ПериодДни_end}'),")
b("       updated_at = SYSUTCDATETIME()")
b(" WHERE report_key = N'RPT_1206'")
b("   AND (query_text LIKE N'%{perStart}%' OR query_text LIKE N'%{perEnd}%');")
b("PRINT CONCAT('09: RPT_1206 строк обновлено: ', @@ROWCOUNT);")
b("")
with open(OUT09, "w", encoding="utf-8-sig") as fh:
    fh.write("\n".join(q))

print("OK:", OUT08, OUT09)
print("filters in 08:", [f["field"] for f in FIELDS])
