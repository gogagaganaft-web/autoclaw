-- ============================================================================
--  GOREPORT: восстановление БД report из .bak
--
--  Бэкап снят с dev: report_full.bak (логические файлы: report, report_log).
--  Содержит структуру и данные: reports, ui_config, filter_def,
--  filter_def_rev, report_query, report_query_rev, app_user,
--  user_report_state, user_report_view, report_filter_default.
--
--  Запускать на сервере MS SQL (Windows) под sa или учёткой с правами
--  dbcreator + restore. Файл .bak положить туда, куда имеет доступ служба
--  SQL Server (например, C:\backup\).
-- ============================================================================
SET NOCOUNT ON;
GO
-- 1. Посмотреть логические имена файлов в бэкапе (ожидаются report и report_log)
RESTORE FILELISTONLY FROM DISK = N'C:\backup\report_full.bak';
GO
-- 2. Если база report уже существует — освободить её
IF DB_ID('report') IS NOT NULL
BEGIN
    ALTER DATABASE report SET SINGLE_USER WITH ROLLBACK IMMEDIATE;
END
GO
-- 3. Восстановление с переносом файлов.
--    Пути в MOVE заменить на реальные каталоги данных вашего сервера,
--    иначе RESTORE создаст файлы по путям из бэкапа (Linux-пути из контейнера).
RESTORE DATABASE report
FROM DISK = N'C:\backup\report_full.bak'
WITH REPLACE,
     RECOVERY,
     STATS = 25,
     MOVE N'report'     TO N'C:\Program Files\Microsoft SQL Server\MSSQL16.MSSQLSERVER\MSSQL\DATA\report.mdf',
     MOVE N'report_log' TO N'C:\Program Files\Microsoft SQL Server\MSSQL16.MSSQLSERVER\MSSQL\DATA\report_log.ldf';
GO
-- 4. Вернуть многопользовательский режим
IF DB_ID('report') IS NOT NULL
BEGIN
    ALTER DATABASE report SET MULTI_USER;
END
GO
-- 5. Проверка
USE report;
GO
SELECT COUNT(*) AS reports      FROM dbo.reports;
SELECT COUNT(*) AS filters      FROM dbo.filter_def;
SELECT COUNT(*) AS queries      FROM dbo.report_query;
SELECT COUNT(*) AS users        FROM dbo.app_user;
SELECT COUNT(*) AS tables_count FROM sys.tables;
SELECT name, collation_name, compatibility_level
FROM sys.databases WHERE name = 'report';
GO
