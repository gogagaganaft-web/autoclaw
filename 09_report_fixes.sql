/* ==========================================================================
 * 09_report_fixes.sql — фиксы токенов в SQL отчётов (восстановлено).
 *
 * RPT_1206: отчёт объявляет фильтр ПериодДни, а в SQL стояли алиасы
 * {perStart}/{perEnd} (контракт ПериодМесяцы) — выбор пользователя
 * игнорировался, подставлялся страховочный период «1 января — сегодня».
 * Токены меняются на контракт ПериодДни: {ПериодДни_start}/{ПериодДни_end}.
 *
 * Идемпотентно: целевые токены не содержат исходных паттернов.
 * ========================================================================== */
SET NOCOUNT ON;
SET XACT_ABORT ON;

UPDATE dbo.reports
   SET query_text = REPLACE(REPLACE(query_text,
                            N'{perStart}', N'{ПериодДни_start}'),
                        N'{perEnd}',   N'{ПериодДни_end}'),
       updated_at = SYSUTCDATETIME()
 WHERE report_key = N'RPT_1206'
   AND (query_text LIKE N'%{perStart}%' OR query_text LIKE N'%{perEnd}%');
PRINT CONCAT('09: RPT_1206 строк обновлено: ', @@ROWCOUNT);
