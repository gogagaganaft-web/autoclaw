/* ==========================================================================
 * 08_filter_taxonomy.sql — единая таксономия фильтров (восстановлено).
 *
 * Приводит dbo.filter_def к целевому состоянию: подписи без двоеточий,
 * плейсхолдеры «Выберите период» / «Укажите <объект>», типы range-months
 * (шкала месяцев) и range-number (числовая шкала), itemsKind (months/query/
 * databases) и dbSuffix (UL/FL) в config. Полная замена config — состояние
 * снято с dev-контура после выверки (07:24 27.10.2026, updated_by=deploy).
 *
 * Идемпотентно: повторный прогон даёт то же состояние.
 * Демо-фильтр Набор_ЛС (range-number) создаётся через UI и тут не входит.
 * Prod-only: БД (иерархия по уровням) — правка только подписи/плейсхолдера.
 * ========================================================================== */
SET NOCOUNT ON;
SET XACT_ABORT ON;
BEGIN TRANSACTION;

DECLARE @touched INT = 0;

-- ФОНД: Фонд (hr-fond)
UPDATE dbo.filter_def
   SET type = N'hr-fond',
       label = N'Фонд',
       config = CAST(N'{"dbName":"DB1FL","dynamicDefault":false,"field":"ФОНД","formColSpan":2,"formOrder":1,"height":"100%","itemsQuery":";WITH trvw_raw AS (\r\n    SELECT IIF(li.РодительТип = 0 AND li.ПотомокТип = 0, 0, li.Родитель) PARENT,\r\n           li.Потомок ID,\r\n           IIF(li.ПотомокТип != 3, 1, 0) GRP,\r\n           li.ПотомокТип LVL\r\n    FROM [stack].[Лицевые иерархия] li\r\n    WHERE (li.РодительТип = 0  AND li.ПотомокТип = 0  AND li.Потомок NOT IN (1329609,1408059))\r\n       OR (li.РодительТип = 0  AND li.ПотомокТип = 1)\r\n       OR (li.РодительТип = 1  AND li.ПотомокТип = 14)\r\n       OR (li.РодительТип = 14 AND li.ПотомокТип = 12)\r\n       OR (li.РодительТип = 12 AND li.ПотомокТип = 2)\r\n       OR (li.РодительТип = 12 AND li.ПотомокТип = 3)\r\n       OR (li.РодительТип = 2  AND li.ПотомокТип = 3)\r\n),\r\ntrvw AS (\r\n    SELECT *,\r\n           ROW_NUMBER() OVER (PARTITION BY ID, LVL ORDER BY PARENT DESC) AS rn\r\n    FROM trvw_raw\r\n)\r\nSELECT trvw.ID, trvw.PARENT,\r\n       CASE\r\n           WHEN trvw.LVL = 0  THEN adr.Район\r\n           WHEN trvw.LVL = 1  THEN adr.Участок\r\n           WHEN trvw.LVL = 14 THEN ls.Фамилия\r\n           WHEN trvw.LVL = 12 THEN adr.НП\r\n           WHEN trvw.LVL = 2  THEN IIF(adr.Улица='''', adr.НП, adr.Улица)\r\n           WHEN trvw.LVL = 3  THEN IIF(adr.Улица='''', IIF(adr.ПлСтр='''',adr.НП,adr.ПлСтр)+'', '', adr.Улица+'', '')+''д.''+adr.Дом\r\n           ELSE ''''\r\n       END AS NODE\r\n       , trvw.GRP, trvw.LVL       \r\nFROM trvw\r\nJOIN [stack].[Лицевые счета] ls ON ls.ROW_ID = trvw.ID\r\nCROSS APPLY stack.AddrLs_Table(trvw.ID, 0) adr\r\nWHERE trvw.rn = 1","label":"Фонд","labelMode":"static","locateInMenu":"always","location":"before","placeholder":"Выберите фонд","preload":true,"rootValue":163863,"searchEnabled":true,"showClearButton":false,"type":"hr-fond","var":["ФОНД"]}' AS NVARCHAR(MAX)),
       updated_at = SYSUTCDATETIME(),
       updated_by = 'deploy'
 WHERE field = N'ФОНД';
SET @touched += @@ROWCOUNT;

IF EXISTS (SELECT 1 FROM dbo.filter_def WHERE field = N'ФОНД')
    INSERT INTO dbo.filter_def_rev (field, action, config, changed_by)
    SELECT N'ФОНД', 'update', CAST(N'{"dbName":"DB1FL","dynamicDefault":false,"field":"ФОНД","formColSpan":2,"formOrder":1,"height":"100%","itemsQuery":";WITH trvw_raw AS (\r\n    SELECT IIF(li.РодительТип = 0 AND li.ПотомокТип = 0, 0, li.Родитель) PARENT,\r\n           li.Потомок ID,\r\n           IIF(li.ПотомокТип != 3, 1, 0) GRP,\r\n           li.ПотомокТип LVL\r\n    FROM [stack].[Лицевые иерархия] li\r\n    WHERE (li.РодительТип = 0  AND li.ПотомокТип = 0  AND li.Потомок NOT IN (1329609,1408059))\r\n       OR (li.РодительТип = 0  AND li.ПотомокТип = 1)\r\n       OR (li.РодительТип = 1  AND li.ПотомокТип = 14)\r\n       OR (li.РодительТип = 14 AND li.ПотомокТип = 12)\r\n       OR (li.РодительТип = 12 AND li.ПотомокТип = 2)\r\n       OR (li.РодительТип = 12 AND li.ПотомокТип = 3)\r\n       OR (li.РодительТип = 2  AND li.ПотомокТип = 3)\r\n),\r\ntrvw AS (\r\n    SELECT *,\r\n           ROW_NUMBER() OVER (PARTITION BY ID, LVL ORDER BY PARENT DESC) AS rn\r\n    FROM trvw_raw\r\n)\r\nSELECT trvw.ID, trvw.PARENT,\r\n       CASE\r\n           WHEN trvw.LVL = 0  THEN adr.Район\r\n           WHEN trvw.LVL = 1  THEN adr.Участок\r\n           WHEN trvw.LVL = 14 THEN ls.Фамилия\r\n           WHEN trvw.LVL = 12 THEN adr.НП\r\n           WHEN trvw.LVL = 2  THEN IIF(adr.Улица='''', adr.НП, adr.Улица)\r\n           WHEN trvw.LVL = 3  THEN IIF(adr.Улица='''', IIF(adr.ПлСтр='''',adr.НП,adr.ПлСтр)+'', '', adr.Улица+'', '')+''д.''+adr.Дом\r\n           ELSE ''''\r\n       END AS NODE\r\n       , trvw.GRP, trvw.LVL       \r\nFROM trvw\r\nJOIN [stack].[Лицевые счета] ls ON ls.ROW_ID = trvw.ID\r\nCROSS APPLY stack.AddrLs_Table(trvw.ID, 0) adr\r\nWHERE trvw.rn = 1","label":"Фонд","labelMode":"static","locateInMenu":"always","location":"before","placeholder":"Выберите фонд","preload":true,"rootValue":163863,"searchEnabled":true,"showClearButton":false,"type":"hr-fond","var":["ФОНД"]}' AS NVARCHAR(MAX)), 'deploy'
    WHERE NOT EXISTS (SELECT 1 FROM dbo.filter_def_rev
                       WHERE field = N'ФОНД' AND changed_by = 'deploy'
                         AND action = 'update');

-- БД_ЮЛ: Подключения ЮЛ (multi-select)
UPDATE dbo.filter_def
   SET type = N'multi-select',
       label = N'Подключения ЮЛ',
       config = CAST(N'{"dbName":"","dynamicDefault":false,"field":"БД_ЮЛ","formColSpan":2,"formOrder":1,"items":[{"id":"DB1UL","name":"Курск"},{"id":"DB2UL","name":"Тверь"},{"id":"DB3UL","name":"Смоленск"},{"id":"DB4UL","name":"Мурманск"},{"id":"DB5UL","name":"Хакасия"}],"label":"Подключения ЮЛ","labelMode":"static","multiline":false,"placeholder":"Укажите подключения ЮЛ","preload":false,"showSelectionControls":true,"type":"multi-select","var":["БД_ЮЛ"],"itemsKind":"databases","dbSuffix":"UL"}' AS NVARCHAR(MAX)),
       updated_at = SYSUTCDATETIME(),
       updated_by = 'deploy'
 WHERE field = N'БД_ЮЛ';
SET @touched += @@ROWCOUNT;

IF EXISTS (SELECT 1 FROM dbo.filter_def WHERE field = N'БД_ЮЛ')
    INSERT INTO dbo.filter_def_rev (field, action, config, changed_by)
    SELECT N'БД_ЮЛ', 'update', CAST(N'{"dbName":"","dynamicDefault":false,"field":"БД_ЮЛ","formColSpan":2,"formOrder":1,"items":[{"id":"DB1UL","name":"Курск"},{"id":"DB2UL","name":"Тверь"},{"id":"DB3UL","name":"Смоленск"},{"id":"DB4UL","name":"Мурманск"},{"id":"DB5UL","name":"Хакасия"}],"label":"Подключения ЮЛ","labelMode":"static","multiline":false,"placeholder":"Укажите подключения ЮЛ","preload":false,"showSelectionControls":true,"type":"multi-select","var":["БД_ЮЛ"],"itemsKind":"databases","dbSuffix":"UL"}' AS NVARCHAR(MAX)), 'deploy'
    WHERE NOT EXISTS (SELECT 1 FROM dbo.filter_def_rev
                       WHERE field = N'БД_ЮЛ' AND changed_by = 'deploy'
                         AND action = 'update');

-- БД_ФЛ: Подключения ФЛ (multi-select)
UPDATE dbo.filter_def
   SET type = N'multi-select',
       label = N'Подключения ФЛ',
       config = CAST(N'{"type":"multi-select","var":["БД_ФЛ"],"field":"БД_ФЛ","label":"Подключения ФЛ","placeholder":"Укажите подключения ФЛ","formOrder":1,"formColSpan":2,"items":[{"id":"DB1FL","name":"Курск"},{"id":"DB2FL","name":"Тверь"},{"id":"DB3FL","name":"Смоленск"},{"id":"DB4FL","name":"Мурманск"},{"id":"DB5FL","name":"Хакасия"}],"itemsKind":"databases","dbSuffix":"FL"}' AS NVARCHAR(MAX)),
       updated_at = SYSUTCDATETIME(),
       updated_by = 'deploy'
 WHERE field = N'БД_ФЛ';
SET @touched += @@ROWCOUNT;

IF EXISTS (SELECT 1 FROM dbo.filter_def WHERE field = N'БД_ФЛ')
    INSERT INTO dbo.filter_def_rev (field, action, config, changed_by)
    SELECT N'БД_ФЛ', 'update', CAST(N'{"type":"multi-select","var":["БД_ФЛ"],"field":"БД_ФЛ","label":"Подключения ФЛ","placeholder":"Укажите подключения ФЛ","formOrder":1,"formColSpan":2,"items":[{"id":"DB1FL","name":"Курск"},{"id":"DB2FL","name":"Тверь"},{"id":"DB3FL","name":"Смоленск"},{"id":"DB4FL","name":"Мурманск"},{"id":"DB5FL","name":"Хакасия"}],"itemsKind":"databases","dbSuffix":"FL"}' AS NVARCHAR(MAX)), 'deploy'
    WHERE NOT EXISTS (SELECT 1 FROM dbo.filter_def_rev
                       WHERE field = N'БД_ФЛ' AND changed_by = 'deploy'
                         AND action = 'update');

-- РасчетыйМесяц: Расчётный месяц (select)
UPDATE dbo.filter_def
   SET type = N'select',
       label = N'Расчётный месяц',
       config = CAST(N'{"dynamicDefault":false,"field":"РасчетыйМесяц","formColIndex":1,"formColSpan":1,"formOrder":3,"items":[],"itemsKind":"months","label":"Расчётный месяц","labelMode":"static","locateInMenu":"always","location":"before","placeholder":"Укажите расчётный месяц","showInForm":true,"type":"select","var":["РасчетыйМесяц"],"width":350}' AS NVARCHAR(MAX)),
       updated_at = SYSUTCDATETIME(),
       updated_by = 'deploy'
 WHERE field = N'РасчетыйМесяц';
SET @touched += @@ROWCOUNT;

IF EXISTS (SELECT 1 FROM dbo.filter_def WHERE field = N'РасчетыйМесяц')
    INSERT INTO dbo.filter_def_rev (field, action, config, changed_by)
    SELECT N'РасчетыйМесяц', 'update', CAST(N'{"dynamicDefault":false,"field":"РасчетыйМесяц","formColIndex":1,"formColSpan":1,"formOrder":3,"items":[],"itemsKind":"months","label":"Расчётный месяц","labelMode":"static","locateInMenu":"always","location":"before","placeholder":"Укажите расчётный месяц","showInForm":true,"type":"select","var":["РасчетыйМесяц"],"width":350}' AS NVARCHAR(MAX)), 'deploy'
    WHERE NOT EXISTS (SELECT 1 FROM dbo.filter_def_rev
                       WHERE field = N'РасчетыйМесяц' AND changed_by = 'deploy'
                         AND action = 'update');

-- ПериодМесяцы: Период, месяцы (range-months)
UPDATE dbo.filter_def
   SET type = N'range-months',
       label = N'Период, месяцы',
       config = CAST(N'{"calendarOptions":{"calendarView":"month","maxZoomLevel":"year","minZoomLevel":"year","selectionMode":"range","zoomLevel":"year"},"displayFormat":"MMM yyyy","dynamicDefault":true,"field":"ПериодМесяцы","formColIndex":2,"formColSpan":2,"formOrder":4,"height":65,"label":"Период, месяцы","labelMode":"static","locateInMenu":"always","location":"before","maxDate":"","minDate":"","pickerType":"calendar","placeholder":"Выберите период","type":"range-months","var":["ПериодМесяцы_start","ПериодМесяцы_end"],"width":350}' AS NVARCHAR(MAX)),
       updated_at = SYSUTCDATETIME(),
       updated_by = 'deploy'
 WHERE field = N'ПериодМесяцы';
SET @touched += @@ROWCOUNT;

IF EXISTS (SELECT 1 FROM dbo.filter_def WHERE field = N'ПериодМесяцы')
    INSERT INTO dbo.filter_def_rev (field, action, config, changed_by)
    SELECT N'ПериодМесяцы', 'update', CAST(N'{"calendarOptions":{"calendarView":"month","maxZoomLevel":"year","minZoomLevel":"year","selectionMode":"range","zoomLevel":"year"},"displayFormat":"MMM yyyy","dynamicDefault":true,"field":"ПериодМесяцы","formColIndex":2,"formColSpan":2,"formOrder":4,"height":65,"label":"Период, месяцы","labelMode":"static","locateInMenu":"always","location":"before","maxDate":"","minDate":"","pickerType":"calendar","placeholder":"Выберите период","type":"range-months","var":["ПериодМесяцы_start","ПериодМесяцы_end"],"width":350}' AS NVARCHAR(MAX)), 'deploy'
    WHERE NOT EXISTS (SELECT 1 FROM dbo.filter_def_rev
                       WHERE field = N'ПериодМесяцы' AND changed_by = 'deploy'
                         AND action = 'update');

-- Период: Период, месяцы (range-months)
UPDATE dbo.filter_def
   SET type = N'range-months',
       label = N'Период, месяцы',
       config = CAST(N'{"dynamicDefault":false,"field":"Период","formColIndex":0,"formColSpan":2,"formOrder":10,"height":65,"label":"Период, месяцы","labelMode":"static","locateInMenu":"never","location":"before","maxDate":"","maxRange":{"months":24},"minDate":"","placeholder":"Выберите период","type":"range-months","var":["Период_start","Период_end"]}' AS NVARCHAR(MAX)),
       updated_at = SYSUTCDATETIME(),
       updated_by = 'deploy'
 WHERE field = N'Период';
SET @touched += @@ROWCOUNT;

IF EXISTS (SELECT 1 FROM dbo.filter_def WHERE field = N'Период')
    INSERT INTO dbo.filter_def_rev (field, action, config, changed_by)
    SELECT N'Период', 'update', CAST(N'{"dynamicDefault":false,"field":"Период","formColIndex":0,"formColSpan":2,"formOrder":10,"height":65,"label":"Период, месяцы","labelMode":"static","locateInMenu":"never","location":"before","maxDate":"","maxRange":{"months":24},"minDate":"","placeholder":"Выберите период","type":"range-months","var":["Период_start","Период_end"]}' AS NVARCHAR(MAX)), 'deploy'
    WHERE NOT EXISTS (SELECT 1 FROM dbo.filter_def_rev
                       WHERE field = N'Период' AND changed_by = 'deploy'
                         AND action = 'update');

-- ПериодДни: Период, дни (dateRange)
UPDATE dbo.filter_def
   SET type = N'dateRange',
       label = N'Период, дни',
       config = CAST(N'{"applyValueMode":"instantly","calendarZoomLevel":"month","displayFormat":"dd.MM.yyyy","dynamicDefault":true,"field":"ПериодДни","firstDayOfWeek":1,"formColIndex":1,"formColSpan":1,"formOrder":5,"label":"Период, дни","locateInMenu":"always","location":"before","placeholder":"Выберите период","type":"dateRange","var":["ПериодДни_start","ПериодДни_end"],"width":350}' AS NVARCHAR(MAX)),
       updated_at = SYSUTCDATETIME(),
       updated_by = 'deploy'
 WHERE field = N'ПериодДни';
SET @touched += @@ROWCOUNT;

IF EXISTS (SELECT 1 FROM dbo.filter_def WHERE field = N'ПериодДни')
    INSERT INTO dbo.filter_def_rev (field, action, config, changed_by)
    SELECT N'ПериодДни', 'update', CAST(N'{"applyValueMode":"instantly","calendarZoomLevel":"month","displayFormat":"dd.MM.yyyy","dynamicDefault":true,"field":"ПериодДни","firstDayOfWeek":1,"formColIndex":1,"formColSpan":1,"formOrder":5,"label":"Период, дни","locateInMenu":"always","location":"before","placeholder":"Выберите период","type":"dateRange","var":["ПериодДни_start","ПериодДни_end"],"width":350}' AS NVARCHAR(MAX)), 'deploy'
    WHERE NOT EXISTS (SELECT 1 FROM dbo.filter_def_rev
                       WHERE field = N'ПериодДни' AND changed_by = 'deploy'
                         AND action = 'update');

-- РасчетыеМесяцы: Расчётные месяцы (multi-select-list)
UPDATE dbo.filter_def
   SET type = N'multi-select-list',
       label = N'Расчётные месяцы',
       config = CAST(N'{"dynamicDefault":true,"field":"РасчетыеМесяцы","formColIndex":0,"formColSpan":2,"formOrder":6,"items":[],"itemsKind":"months","label":"Расчётные месяцы","locateInMenu":"always","location":"before","pageLoadMode":"scrollBottom","placeholder":"Укажите расчётные месяцы","searchEnabled":true,"showClearButton":true,"showScrollbar":"onHover","showSelectionControls":true,"type":"multi-select-list","var":["РасчетыеМесяцы"],"width":350}' AS NVARCHAR(MAX)),
       updated_at = SYSUTCDATETIME(),
       updated_by = 'deploy'
 WHERE field = N'РасчетыеМесяцы';
SET @touched += @@ROWCOUNT;

IF EXISTS (SELECT 1 FROM dbo.filter_def WHERE field = N'РасчетыеМесяцы')
    INSERT INTO dbo.filter_def_rev (field, action, config, changed_by)
    SELECT N'РасчетыеМесяцы', 'update', CAST(N'{"dynamicDefault":true,"field":"РасчетыеМесяцы","formColIndex":0,"formColSpan":2,"formOrder":6,"items":[],"itemsKind":"months","label":"Расчётные месяцы","locateInMenu":"always","location":"before","pageLoadMode":"scrollBottom","placeholder":"Укажите расчётные месяцы","searchEnabled":true,"showClearButton":true,"showScrollbar":"onHover","showSelectionControls":true,"type":"multi-select-list","var":["РасчетыеМесяцы"],"width":350}' AS NVARCHAR(MAX)), 'deploy'
    WHERE NOT EXISTS (SELECT 1 FROM dbo.filter_def_rev
                       WHERE field = N'РасчетыеМесяцы' AND changed_by = 'deploy'
                         AND action = 'update');

-- УК: Договор УК (multi-select-list)
UPDATE dbo.filter_def
   SET type = N'multi-select-list',
       label = N'Договор УК',
       config = CAST(N'{"dbName":"DB1UL","field":"УК","formColIndex":0,"formColSpan":2,"formOrder":7,"itemsQuery":"SELECT DISTINCT \r\nuk.ROW_ID id,\r\nIIF(uk.[Тема]='''',org.Название,CONCAT(org.Название,'' ['',uk.[Тема],'']'')) name\r\nFROM [stack].[УК Договоры] uk \r\nJOIN [stack].[Организации] org \r\nON org.ROW_ID=uk.[Организация-УКДоговор] \r\nWHERE uk.Папки=802 \r\nORDER BY 2","label":"Договор УК","locateInMenu":"always","location":"before","pageLoadMode":"scrollBottom","placeholder":"Укажите договор УК","searchEnabled":true,"searchExpr":["name"],"searchMode":"contains","searchPlaceholder":"Поиск...","searchTimeout":500,"selectAllMode":"allPages","showClearButton":true,"showScrollbar":"onHover","showSelectionControls":true,"type":"multi-select-list","var":["УК"],"width":800,"itemsKind":"query"}' AS NVARCHAR(MAX)),
       updated_at = SYSUTCDATETIME(),
       updated_by = 'deploy'
 WHERE field = N'УК';
SET @touched += @@ROWCOUNT;

IF EXISTS (SELECT 1 FROM dbo.filter_def WHERE field = N'УК')
    INSERT INTO dbo.filter_def_rev (field, action, config, changed_by)
    SELECT N'УК', 'update', CAST(N'{"dbName":"DB1UL","field":"УК","formColIndex":0,"formColSpan":2,"formOrder":7,"itemsQuery":"SELECT DISTINCT \r\nuk.ROW_ID id,\r\nIIF(uk.[Тема]='''',org.Название,CONCAT(org.Название,'' ['',uk.[Тема],'']'')) name\r\nFROM [stack].[УК Договоры] uk \r\nJOIN [stack].[Организации] org \r\nON org.ROW_ID=uk.[Организация-УКДоговор] \r\nWHERE uk.Папки=802 \r\nORDER BY 2","label":"Договор УК","locateInMenu":"always","location":"before","pageLoadMode":"scrollBottom","placeholder":"Укажите договор УК","searchEnabled":true,"searchExpr":["name"],"searchMode":"contains","searchPlaceholder":"Поиск...","searchTimeout":500,"selectAllMode":"allPages","showClearButton":true,"showScrollbar":"onHover","showSelectionControls":true,"type":"multi-select-list","var":["УК"],"width":800,"itemsKind":"query"}' AS NVARCHAR(MAX)), 'deploy'
    WHERE NOT EXISTS (SELECT 1 FROM dbo.filter_def_rev
                       WHERE field = N'УК' AND changed_by = 'deploy'
                         AND action = 'update');

-- УКП: Договор УКП (multi-select-list)
UPDATE dbo.filter_def
   SET type = N'multi-select-list',
       label = N'Договор УКП',
       config = CAST(N'{"dbName":"DB1UL","field":"УКП","formColIndex":0,"formColSpan":2,"formOrder":8,"itemsQuery":"SELECT DISTINCT \r\norg.ROW_ID id, \r\norg.Название name \r\nFROM [stack].[УК Договоры] uk \r\nJOIN [stack].[Организации] org \r\nON org.ROW_ID=uk.[Организация-УКДоговор] ","label":"Договор УКП","locateInMenu":"always","location":"before","pageLoadMode":"scrollBottom","placeholder":"Укажите договор УКП","searchEnabled":true,"searchExpr":["name"],"searchMode":"contains","searchPlaceholder":"Поиск...","searchTimeout":500,"selectAllMode":"allPages","showClearButton":true,"showScrollbar":"onHover","showSelectionControls":true,"type":"multi-select-list","var":["УКП"],"width":800,"itemsKind":"query"}' AS NVARCHAR(MAX)),
       updated_at = SYSUTCDATETIME(),
       updated_by = 'deploy'
 WHERE field = N'УКП';
SET @touched += @@ROWCOUNT;

IF EXISTS (SELECT 1 FROM dbo.filter_def WHERE field = N'УКП')
    INSERT INTO dbo.filter_def_rev (field, action, config, changed_by)
    SELECT N'УКП', 'update', CAST(N'{"dbName":"DB1UL","field":"УКП","formColIndex":0,"formColSpan":2,"formOrder":8,"itemsQuery":"SELECT DISTINCT \r\norg.ROW_ID id, \r\norg.Название name \r\nFROM [stack].[УК Договоры] uk \r\nJOIN [stack].[Организации] org \r\nON org.ROW_ID=uk.[Организация-УКДоговор] ","label":"Договор УКП","locateInMenu":"always","location":"before","pageLoadMode":"scrollBottom","placeholder":"Укажите договор УКП","searchEnabled":true,"searchExpr":["name"],"searchMode":"contains","searchPlaceholder":"Поиск...","searchTimeout":500,"selectAllMode":"allPages","showClearButton":true,"showScrollbar":"onHover","showSelectionControls":true,"type":"multi-select-list","var":["УКП"],"width":800,"itemsKind":"query"}' AS NVARCHAR(MAX)), 'deploy'
    WHERE NOT EXISTS (SELECT 1 FROM dbo.filter_def_rev
                       WHERE field = N'УКП' AND changed_by = 'deploy'
                         AND action = 'update');

-- ПОСТ: Поставщики (multi-select-list)
UPDATE dbo.filter_def
   SET type = N'multi-select-list',
       label = N'Поставщики',
       config = CAST(N'{"dbName":"DB1UL","field":"ПОСТ","formColIndex":2,"formColSpan":2,"formOrder":9,"itemsQuery":"SELECT DISTINCT \r\nps.[Поставщики-Список] id,\r\norg.Название name   FROM [stack].[Поставщики] ps\r\nJOIN stack.Организации org ON org.ROW_ID=ps.[Поставщики-Список] \r\nORDER BY 1","label":"Поставщики","locateInMenu":"always","location":"before","pageLoadMode":"scrollBottom","placeholder":"Укажите поставщиков","searchEnabled":true,"searchExpr":["name"],"searchMode":"contains","searchPlaceholder":"Поиск...","searchTimeout":500,"selectAllMode":"allPages","showClearButton":true,"showScrollbar":"onHover","showSelectionControls":true,"type":"multi-select-list","var":["ПОСТ"],"width":800,"itemsKind":"query"}' AS NVARCHAR(MAX)),
       updated_at = SYSUTCDATETIME(),
       updated_by = 'deploy'
 WHERE field = N'ПОСТ';
SET @touched += @@ROWCOUNT;

IF EXISTS (SELECT 1 FROM dbo.filter_def WHERE field = N'ПОСТ')
    INSERT INTO dbo.filter_def_rev (field, action, config, changed_by)
    SELECT N'ПОСТ', 'update', CAST(N'{"dbName":"DB1UL","field":"ПОСТ","formColIndex":2,"formColSpan":2,"formOrder":9,"itemsQuery":"SELECT DISTINCT \r\nps.[Поставщики-Список] id,\r\norg.Название name   FROM [stack].[Поставщики] ps\r\nJOIN stack.Организации org ON org.ROW_ID=ps.[Поставщики-Список] \r\nORDER BY 1","label":"Поставщики","locateInMenu":"always","location":"before","pageLoadMode":"scrollBottom","placeholder":"Укажите поставщиков","searchEnabled":true,"searchExpr":["name"],"searchMode":"contains","searchPlaceholder":"Поиск...","searchTimeout":500,"selectAllMode":"allPages","showClearButton":true,"showScrollbar":"onHover","showSelectionControls":true,"type":"multi-select-list","var":["ПОСТ"],"width":800,"itemsKind":"query"}' AS NVARCHAR(MAX)), 'deploy'
    WHERE NOT EXISTS (SELECT 1 FROM dbo.filter_def_rev
                       WHERE field = N'ПОСТ' AND changed_by = 'deploy'
                         AND action = 'update');

-- Prod-only: БД — иерархический справочник по уровням (LVL).
-- На dev фильтра нет, UPDATE молча пропустит. itemsQuery не трогаем.
UPDATE dbo.filter_def
   SET label = N'Фонд по уровням',
       config = CAST(
            JSON_MODIFY(JSON_MODIFY(config, '$.label', N'Фонд по уровням'),
                        '$.placeholder', N'Выберите фонд')
            AS NVARCHAR(MAX)),
       updated_at = SYSUTCDATETIME(),
       updated_by = 'deploy'
 WHERE field = N'БД' AND type = N'hierarchical-list';
SET @touched += @@ROWCOUNT;

-- Пересборка снимка панели для старой оболочки (аналог syncToolbar).
DECLARE @toolbar NVARCHAR(MAX) =
    (SELECT N'{"source":"filter_def","toolbar":['
           + STRING_AGG(config, N',') + N']}'
       FROM dbo.filter_def);

MERGE dbo.ui_config AS t
USING (SELECT 'toolbar' AS setting_key, CAST(@toolbar AS NVARCHAR(MAX)) AS config) AS src
   ON t.setting_key = src.setting_key
WHEN MATCHED THEN
    UPDATE SET config = src.config, updated_at = SYSUTCDATETIME()
WHEN NOT MATCHED THEN
    INSERT (setting_key, config) VALUES (src.setting_key, src.config);

COMMIT TRANSACTION;
PRINT CONCAT('08: фильтров обновлено: ', @touched);
