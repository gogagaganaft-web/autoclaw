/* ==========================================================================
 * 11_prototype_groups.sql — таксономия: Диапазон и Список, стандартные var.
 *
 * 1) var в каталоге фильтров: m_start/m_end (месяцы), d_start/d_end (дни),
 *    n_start/n_end (числа), транслит ключа у списков (fond, uk, ukp, post…).
 * 2) Плейсхолдеры в SQL отчётов и запросов переводятся на новые имена.
 *    Токены дат шли в SQL без кавычек (легаси-подстановка добавляла их сама),
 *    новая схема присылает скаляр как есть — кавычки переезжают в текст SQL.
 *    Токены списков меняются один-в-один (кавычки уже в тексте где нужны).
 *    {РасчетыйМесяц} и {БД} — легаси-типы вне новой таксономии, не трогаем.
 *
 * Идемпотентно: повторный прогон ничего не меняет.
 * ========================================================================== */
SET NOCOUNT ON;
SET XACT_ABORT ON;
BEGIN TRANSACTION;

-- ─── 1. var в каталоге фильтров ─────────────────────────────────────────────
-- Диапазоны
UPDATE dbo.filter_def
   SET config = JSON_MODIFY(config, '$.var', JSON_QUERY(N'["m_start","m_end"]')),
       updated_at = SYSUTCDATETIME(), updated_by = 'deploy'
 WHERE field = N'ПериодМесяцы' AND type = N'range-months';

UPDATE dbo.filter_def
   SET config = JSON_MODIFY(config, '$.var', JSON_QUERY(N'["m_start","m_end"]')),
       updated_at = SYSUTCDATETIME(), updated_by = 'deploy'
 WHERE field = N'Период' AND type = N'range-months';

UPDATE dbo.filter_def
   SET config = JSON_MODIFY(config, '$.var', JSON_QUERY(N'["d_start","d_end"]')),
       updated_at = SYSUTCDATETIME(), updated_by = 'deploy'
 WHERE field = N'ПериодДни';

UPDATE dbo.filter_def
   SET config = JSON_MODIFY(config, '$.var', JSON_QUERY(N'["n_start","n_end"]')),
       updated_at = SYSUTCDATETIME(), updated_by = 'deploy'
 WHERE field = N'Набор_ЛС' AND type = N'range-number';

-- Списки: транслит ключа поля
UPDATE dbo.filter_def
   SET config = JSON_MODIFY(config, '$.var', JSON_QUERY(N'["fond"]')),
       updated_at = SYSUTCDATETIME(), updated_by = 'deploy'
 WHERE field = N'ФОНД';

UPDATE dbo.filter_def
   SET config = JSON_MODIFY(config, '$.var', JSON_QUERY(N'["uk"]')),
       updated_at = SYSUTCDATETIME(), updated_by = 'deploy'
 WHERE field = N'УК';

UPDATE dbo.filter_def
   SET config = JSON_MODIFY(config, '$.var', JSON_QUERY(N'["ukp"]')),
       updated_at = SYSUTCDATETIME(), updated_by = 'deploy'
 WHERE field = N'УКП';

UPDATE dbo.filter_def
   SET config = JSON_MODIFY(config, '$.var', JSON_QUERY(N'["post"]')),
       updated_at = SYSUTCDATETIME(), updated_by = 'deploy'
 WHERE field = N'ПОСТ';

UPDATE dbo.filter_def
   SET config = JSON_MODIFY(config, '$.var', JSON_QUERY(N'["raschetyemesyacy"]')),
       updated_at = SYSUTCDATETIME(), updated_by = 'deploy'
 WHERE field = N'РасчетыеМесяцы';

-- ─── 2. Плейсхолдеры в SQL отчётов ──────────────────────────────────────────
-- Даты: токен был без кавычек — кавычки переезжают в текст.
UPDATE dbo.reports
   SET query_text = REPLACE(query_text, N'{ПериодМесяцы_start}', N'''{m_start}'''),
       updated_at = SYSUTCDATETIME()
 WHERE query_text LIKE N'%{ПериодМесяцы_start}%';

UPDATE dbo.reports
   SET query_text = REPLACE(query_text, N'{ПериодМесяцы_end}', N'''{m_end}'''),
       updated_at = SYSUTCDATETIME()
 WHERE query_text LIKE N'%{ПериодМесяцы_end}%';

UPDATE dbo.reports
   SET query_text = REPLACE(query_text, N'{ПериодДни_start}', N'''{d_start}'''),
       updated_at = SYSUTCDATETIME()
 WHERE query_text LIKE N'%{ПериодДни_start}%';

UPDATE dbo.reports
   SET query_text = REPLACE(query_text, N'{ПериодДни_end}', N'''{d_end}'''),
       updated_at = SYSUTCDATETIME()
 WHERE query_text LIKE N'%{ПериодДни_end}%';

UPDATE dbo.reports
   SET query_text = REPLACE(query_text, N'{Период_start}', N'''{m_start}'''),
       updated_at = SYSUTCDATETIME()
 WHERE query_text LIKE N'%{Период_start}%';

UPDATE dbo.reports
   SET query_text = REPLACE(query_text, N'{Период_end}', N'''{m_end}'''),
       updated_at = SYSUTCDATETIME()
 WHERE query_text LIKE N'%{Период_end}%';

-- Легаси-алиасы периодов (подставлялись только при ключе ПериодМесяцы).
UPDATE dbo.reports
   SET query_text = REPLACE(query_text, N'{perStart}', N'''{m_start}'''),
       updated_at = SYSUTCDATETIME()
 WHERE query_text LIKE N'%{perStart}%';

UPDATE dbo.reports
   SET query_text = REPLACE(query_text, N'{perEnd}', N'''{m_end}'''),
       updated_at = SYSUTCDATETIME()
 WHERE query_text LIKE N'%{perEnd}%';

-- Списки: один-в-один (кавычки уже в тексте где нужны).
UPDATE dbo.reports
   SET query_text = REPLACE(query_text, N'{ФОНД}', N'{fond}'),
       updated_at = SYSUTCDATETIME()
 WHERE query_text LIKE N'%{ФОНД}%';

UPDATE dbo.reports
   SET query_text = REPLACE(query_text, N'{УК}', N'{uk}'),
       updated_at = SYSUTCDATETIME()
 WHERE query_text LIKE N'%{УК}%';

UPDATE dbo.reports
   SET query_text = REPLACE(query_text, N'{УКП}', N'{ukp}'),
       updated_at = SYSUTCDATETIME()
 WHERE query_text LIKE N'%{УКП}%';

UPDATE dbo.reports
   SET query_text = REPLACE(query_text, N'{ПОСТ}', N'{post}'),
       updated_at = SYSUTCDATETIME()
 WHERE query_text LIKE N'%{ПОСТ}%';

-- ─── 3. Плейсхолдеры в SQL запросов ─────────────────────────────────────────
UPDATE dbo.report_query
   SET sql_text = REPLACE(sql_text, N'{ПериодМесяцы_start}', N'''{m_start}'''),
       updated_at = SYSUTCDATETIME(), updated_by = 'deploy'
 WHERE sql_text LIKE N'%{ПериодМесяцы_start}%';

UPDATE dbo.report_query
   SET sql_text = REPLACE(sql_text, N'{ПериодМесяцы_end}', N'''{m_end}'''),
       updated_at = SYSUTCDATETIME(), updated_by = 'deploy'
 WHERE sql_text LIKE N'%{ПериодМесяцы_end}%';

UPDATE dbo.report_query
   SET sql_text = REPLACE(sql_text, N'{ПериодДни_start}', N'''{d_start}'''),
       updated_at = SYSUTCDATETIME(), updated_by = 'deploy'
 WHERE sql_text LIKE N'%{ПериодДни_start}%';

UPDATE dbo.report_query
   SET sql_text = REPLACE(sql_text, N'{ПериодДни_end}', N'''{d_end}'''),
       updated_at = SYSUTCDATETIME(), updated_by = 'deploy'
 WHERE sql_text LIKE N'%{ПериодДни_end}%';

UPDATE dbo.report_query
   SET sql_text = REPLACE(sql_text, N'{ФОНД}', N'{fond}'),
       updated_at = SYSUTCDATETIME(), updated_by = 'deploy'
 WHERE sql_text LIKE N'%{ФОНД}%';

UPDATE dbo.report_query
   SET sql_text = REPLACE(sql_text, N'{УК}', N'{uk}'),
       updated_at = SYSUTCDATETIME(), updated_by = 'deploy'
 WHERE sql_text LIKE N'%{УК}%';

UPDATE dbo.report_query
   SET sql_text = REPLACE(sql_text, N'{УКП}', N'{ukp}'),
       updated_at = SYSUTCDATETIME(), updated_by = 'deploy'
 WHERE sql_text LIKE N'%{УКП}%';

UPDATE dbo.report_query
   SET sql_text = REPLACE(sql_text, N'{ПОСТ}', N'{post}'),
       updated_at = SYSUTCDATETIME(), updated_by = 'deploy'
 WHERE sql_text LIKE N'%{ПОСТ}%';

-- ─── 4. Снимок панели для старой оболочки ───────────────────────────────────
MERGE dbo.ui_config AS t
USING (SELECT 'toolbar' AS setting_key) AS src
   ON t.setting_key = src.setting_key
WHEN MATCHED THEN
    UPDATE SET config = CAST(
        (SELECT N'{"source":"filter_def","toolbar":[' + STRING_AGG(config, N',') + N']}'
           FROM dbo.filter_def) AS NVARCHAR(MAX));

COMMIT TRANSACTION;
PRINT '11: таксономия и плейсхолдеры обновлены';
