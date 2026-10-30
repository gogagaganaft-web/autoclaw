-- ============================================================================
--  Импорт боевого каталога: панель фильтров (env.js) и отчёты (rpt.js).
--  Сгенерировано tools/convert_prod_catalog.js
--  Фильтров: 15; узлов каталога: 23 (разделы: 4, отчёты: 19)
--  Идемпотентно: по report_key существующие строки обновляются, новые добавляются.
-- ============================================================================
USE report;
SET NOCOUNT ON;
GO

-- 0. Разделы могут быть вложенными (ФЛ -> КТР -> отчёты), поэтому старое
--    ограничение "раздел только верхнего уровня" снимаем, если оно есть.
IF OBJECT_ID('dbo.reports', 'U') IS NOT NULL AND EXISTS (SELECT 1 FROM sys.check_constraints WHERE name = 'ck_reports_section' AND parent_object_id = OBJECT_ID('dbo.reports'))
    ALTER TABLE dbo.reports DROP CONSTRAINT ck_reports_section;
GO

-- 0.5 НЕОБЯЗАТЕЛЬНО: очистка seed-строк (ОРН_5, ОРН_9, SEC_ОРН),
--     чтобы в меню не было дублей с боевым каталогом. По умолчанию выключено.
DECLARE @cleanup_seed BIT = 0;   -- 1 = удалить seed-строки

IF @cleanup_seed = 1
BEGIN
    -- 1) состояния и виды пользователей ссылаются на report_key
    DELETE v FROM dbo.user_report_view  AS v WHERE v.report_key  IN (N'ОРН_5', N'ОРН_9', N'SEC_ОРН');
    DELETE s FROM dbo.user_report_state AS s WHERE s.report_key  IN (N'ОРН_5', N'ОРН_9', N'SEC_ОРН');

    -- 2) пресеты фильтров ссылаются на id
    DELETE d FROM dbo.report_filter_default AS d
        JOIN dbo.reports AS r ON r.id = d.report_id
        WHERE r.report_key IN (N'ОРН_5', N'ОРН_9', N'SEC_ОРН');

    -- 3) сначала дети удаляемых разделов, потом сами строки (FK fk_reports_parent)
    DELETE c FROM dbo.reports AS c
        WHERE c.parent_id IN (SELECT id FROM dbo.reports WHERE report_key IN (N'ОРН_5', N'ОРН_9', N'SEC_ОРН'));
    DELETE r FROM dbo.reports AS r WHERE r.report_key IN (N'ОРН_5', N'ОРН_9', N'SEC_ОРН');

    PRINT 'seed-строки удалены';
END
GO

-- 1. Панель фильтров
MERGE dbo.ui_config AS target
USING (SELECT N'toolbar' AS setting_key, CAST(N'{"source":"env.js","toolbar":[{"type":"hierarchical-list","var":["БД"],"field":"БД","label":"Выбран Фонд ","placeholder":"Укажите фонд","formOrder":1,"formColSpan":2,"height":"60vh","location":"before","locateInMenu":"always","showClearButton":true,"itemsQuery":"","dbName":"DB4FL","labelMode":"static"},{"type":"hr-fond","var":["ФОНД"],"field":"ФОНД","label":"Выбран Фонд ","dbName":"DB4FL","placeholder":"Укажите фонд","formOrder":1,"formColSpan":2,"height":"100%","location":"before","locateInMenu":"always","showClearButton":true,"labelMode":"static","preload":true,"itemsQuery":"\n;WITH trvw_raw AS (\n    SELECT IIF(li.РодительТип = 0 AND li.ПотомокТип = 0, 0, li.Родитель) PARENT,\n           li.Потомок ID,\n           IIF(li.ПотомокТип != 3, 1, 0) GRP,\n           li.ПотомокТип LVL\n    FROM [stack].[Лицевые иерархия] li\n    WHERE (li.РодительТип = 0  AND li.ПотомокТип = 0  AND li.Потомок NOT IN (1329609,1408059))\n       OR (li.РодительТип = 0  AND li.ПотомокТип = 1)\n       OR (li.РодительТип = 1  AND li.ПотомокТип = 14)\n       OR (li.РодительТип = 14 AND li.ПотомокТип = 12)\n       OR (li.РодительТип = 12 AND li.ПотомокТип = 2)\n       OR (li.РодительТип = 12 AND li.ПотомокТип = 3)\n       OR (li.РодительТип = 2  AND li.ПотомокТип = 3)\n),\ntrvw AS (\n    SELECT *,\n           ROW_NUMBER() OVER (PARTITION BY ID, LVL ORDER BY PARENT DESC) AS rn\n    FROM trvw_raw\n)\nSELECT trvw.ID, trvw.PARENT, trvw.GRP, trvw.LVL,\n       CASE\n           WHEN trvw.LVL = 0  THEN adr.Район\n           WHEN trvw.LVL = 1  THEN adr.Участок\n           WHEN trvw.LVL = 14 THEN ls.Фамилия\n           WHEN trvw.LVL = 12 THEN adr.НП\n           WHEN trvw.LVL = 2  THEN IIF(adr.Улица='''', adr.НП, adr.Улица)\n           WHEN trvw.LVL = 3  THEN IIF(adr.Улица='''', IIF(adr.ПлСтр='''',adr.НП,adr.ПлСтр)+'', '', adr.Улица+'', '')+''д.''+adr.Дом\n           ELSE ''''\n       END AS NODE\nFROM trvw\nJOIN [stack].[Лицевые счета] ls ON ls.ROW_ID = trvw.ID\nCROSS APPLY stack.AddrLs_Table(trvw.ID, 0) adr\nWHERE trvw.rn = 1\nORDER BY NODE;\n"},{"type":"multi-select","var":["БД_ЮЛ"],"field":"БД_ЮЛ","label":"Выбраны БД_ЮЛ","placeholder":"Укажите БД ЮЛ филиалов","dbName":"DB4UL","formOrder":1,"formColSpan":2,"items":[{"id":"DB1UL","name":"Курск"},{"id":"DB2UL","name":"Тверь"},{"id":"DB3UL","name":"Смоленск"},{"id":"DB4UL","name":"Мурманск"},{"id":"DB5UL","name":"Хакасия"}]},{"type":"multi-select-fl","var":["БД_ФЛ"],"field":"БД_ФЛ","label":"Выбраны БД ФЛ","placeholder":"Укажите БД ФЛ филиалов","formOrder":1,"formColSpan":2,"items":[{"id":"DB1FL","name":"Курск"},{"id":"DB2FL","name":"Тверь"},{"id":"DB3FL","name":"Смоленск"},{"id":"DB4FL","name":"Мурманск"},{"id":"DB5FL","name":"Хакасия"}]},{"type":"multi-select-list","var":["usl"],"field":"usl","label":"Выбраны услуги","placeholder":"Укажите услуги","formOrder":2,"formColSpan":2,"width":800,"showClearButton":false,"showSelectionControls":true,"selectAllMode":"allPages","searchEnabled":true,"searchExpr":["name"],"searchMode":"contains","searchTimeout":500,"searchPlaceholder":"Поиск...","pageLoadMode":"scrollBottom","showScrollbar":"onHover","location":"before","locateInMenu":"always","items":["Теплоноситель","Отопление"]},{"type":"select","var":["РасчетыйМесяц"],"field":"РасчетыйМесяц","label":"Выбран расчетный месяц","placeholder":"Укажите расчетный месяц","formOrder":3,"formColSpan":1,"formColIndex":1,"width":350,"location":"before","locateInMenu":"always","showInForm":true,"dynamicDefault":true,"items":[]},{"type":"dateRangeMonths","var":["ПериодМесяцы_start","ПериодМесяцы_end"],"field":"ПериодМесяцы","label":"Период расчета","placeholder":"Укажите период расчета","dynamicDefault":true,"formOrder":4,"formColSpan":2,"formColIndex":2,"width":350,"displayFormat":"MMM yyyy","pickerType":"calendar","location":"before","locateInMenu":"always","calendarOptions":{"zoomLevel":"year","calendarView":"month","maxZoomLevel":"year","minZoomLevel":"year","selectionMode":"range"}},{"type":"range-months","var":["Период_start","Период_end"],"formOrder":10,"formColSpan":2,"formColIndex":0,"field":"Период","label":"Диапазон:","maxRange":{"months":12},"location":"before","locateInMenu":"never"},{"type":"dateRange","var":["ПериодДни_start","ПериодДни_end"],"field":"ПериодДни","label":"Диапазон дат","width":350,"formOrder":5,"formColSpan":1,"formColIndex":1,"displayFormat":"dd.MM.yyyy","placeholder":"Выберите период","applyValueMode":"instantly","calendarZoomLevel":"month","firstDayOfWeek":1,"dynamicDefault":true,"location":"before","locateInMenu":"always"},{"type":"multi-select-list","var":["РасчетыеМесяцы"],"field":"РасчетыеМесяцы","label":"Выбраны расчетные месяцы","placeholder":"Укажите расчетные месяцы","width":350,"formOrder":6,"formColSpan":2,"formColIndex":0,"showClearButton":true,"showSelectionControls":true,"searchEnabled":false,"pageLoadMode":"scrollBottom","showScrollbar":"onHover","location":"before","locateInMenu":"always","dynamicDefault":true,"items":[]},{"type":"multi-select-list","var":["УК"],"field":"УК","label":"Выбран договор УК","placeholder":"Укажите договор УК","formOrder":7,"formColSpan":2,"formColIndex":0,"width":800,"showClearButton":true,"showSelectionControls":true,"selectAllMode":"allPages","searchEnabled":true,"searchExpr":["name"],"searchMode":"contains","searchTimeout":500,"searchPlaceholder":"Поиск...","pageLoadMode":"scrollBottom","showScrollbar":"onHover","location":"before","locateInMenu":"always","itemsQuery":"SELECT DISTINCT uk.ROW_ID, IIF(uk.[Тема]='''',org.Название,CONCAT(org.Название,'' ['',uk.[Тема],'']'')) Название FROM [stack].[УК Договоры] uk JOIN [stack].[Организации] org ON org.ROW_ID=uk.[Организация-УКДоговор] WHERE uk.Папки=802 ORDER BY 2","dbName":"DB4FL"},{"type":"multi-select-list","var":["УКП"],"field":"УКП","label":"Выбран договор УК","placeholder":"Укажите договор УК","formOrder":8,"formColSpan":2,"formColIndex":0,"width":800,"showClearButton":true,"showSelectionControls":true,"selectAllMode":"allPages","searchEnabled":true,"searchExpr":["name"],"searchMode":"contains","searchTimeout":500,"searchPlaceholder":"Поиск...","pageLoadMode":"scrollBottom","showScrollbar":"onHover","location":"before","locateInMenu":"always","itemsQuery":"SELECT DISTINCT org.ROW_ID, org.Название  FROM [stack].[УК Договоры] uk JOIN [stack].[Организации] org ON org.ROW_ID=uk.[Организация-УКДоговор] WHERE uk.Папки=802 ORDER BY 2","dbName":"DB4FL"},{"type":"multi-select-list","var":["ПОСТ"],"field":"ПОСТ","label":"Выбраны поставщики","placeholder":"Укажите поставщиков","formOrder":9,"formColSpan":2,"formColIndex":2,"width":800,"showClearButton":true,"showSelectionControls":true,"selectAllMode":"allPages","searchEnabled":true,"searchExpr":["name"],"searchMode":"contains","searchTimeout":500,"searchPlaceholder":"Поиск...","pageLoadMode":"scrollBottom","showScrollbar":"onHover","location":"before","locateInMenu":"always","itemsQuery":"SELECT DISTINCT ps.[Поставщики-Список], org.Название FROM [stack].[Поставщики] ps JOIN stack.Организации org ON org.ROW_ID=ps.[Поставщики-Список] ORDER BY 1","dbName":"DB4FL"},{"type":"button-group","var":["status"],"field":"status","label":"Статус","multiple":false,"items":[{"id":"all","text":"Все","icon":"list"},{"id":"open","text":"Открытые","icon":"unlock"},{"id":"closed","text":"Закрытые","icon":"lock"}]},{"type":"button-group","var":["categories"],"field":"categories","label":"Категории","multiple":true,"items":[{"id":"A","text":"Категория A"},{"id":"B","text":"Категория B"},{"id":"C","text":"Категория C"}]}]}' AS NVARCHAR(MAX)) AS config) AS src
   ON target.setting_key = src.setting_key
WHEN MATCHED THEN UPDATE SET config = src.config, updated_at = SYSUTCDATETIME()
WHEN NOT MATCHED THEN INSERT (setting_key, config) VALUES (src.setting_key, src.config);
GO

-- 2. Отчёты и разделы: вставка/обновление по report_key, родитель — по ключу
MERGE dbo.reports AS target
USING (SELECT N'ФЛ' AS report_key, NULL AS parent_id, N'ФЛ' AS title, N'' AS icon, N'' AS image, N'' AS query_text, CAST(N'{}' AS NVARCHAR(MAX)) AS config, 1 AS is_section, 0 AS sort_order) AS src
   ON target.report_key = src.report_key
WHEN MATCHED THEN UPDATE SET title = src.title, icon = src.icon, image = src.image,
    query_text = src.query_text, config = src.config, parent_id = src.parent_id,
    is_section = src.is_section, sort_order = src.sort_order, is_deleted = 0,
    updated_at = SYSUTCDATETIME()
WHEN NOT MATCHED THEN INSERT (report_key, parent_id, title, icon, image, query_text,
    config, is_section, sort_order)
    VALUES (src.report_key, src.parent_id, src.title, src.icon, src.image,
    src.query_text, src.config, src.is_section, src.sort_order);
GO
MERGE dbo.reports AS target
USING (SELECT N'ЮЛ' AS report_key, NULL AS parent_id, N'ЮЛ' AS title, N'' AS icon, N'' AS image, N'' AS query_text, CAST(N'{}' AS NVARCHAR(MAX)) AS config, 1 AS is_section, 1 AS sort_order) AS src
   ON target.report_key = src.report_key
WHEN MATCHED THEN UPDATE SET title = src.title, icon = src.icon, image = src.image,
    query_text = src.query_text, config = src.config, parent_id = src.parent_id,
    is_section = src.is_section, sort_order = src.sort_order, is_deleted = 0,
    updated_at = SYSUTCDATETIME()
WHEN NOT MATCHED THEN INSERT (report_key, parent_id, title, icon, image, query_text,
    config, is_section, sort_order)
    VALUES (src.report_key, src.parent_id, src.title, src.icon, src.image,
    src.query_text, src.config, src.is_section, src.sort_order);
GO
MERGE dbo.reports AS target
USING (SELECT N'КТР' AS report_key, (SELECT id FROM dbo.reports WHERE report_key = N'ФЛ') AS parent_id, N'КТР' AS title, N'' AS icon, N'' AS image, N'' AS query_text, CAST(N'{}' AS NVARCHAR(MAX)) AS config, 1 AS is_section, 0 AS sort_order) AS src
   ON target.report_key = src.report_key
WHEN MATCHED THEN UPDATE SET title = src.title, icon = src.icon, image = src.image,
    query_text = src.query_text, config = src.config, parent_id = src.parent_id,
    is_section = src.is_section, sort_order = src.sort_order, is_deleted = 0,
    updated_at = SYSUTCDATETIME()
WHEN NOT MATCHED THEN INSERT (report_key, parent_id, title, icon, image, query_text,
    config, is_section, sort_order)
    VALUES (src.report_key, src.parent_id, src.title, src.icon, src.image,
    src.query_text, src.config, src.is_section, src.sort_order);
GO
MERGE dbo.reports AS target
USING (SELECT N'RPT_2001' AS report_key, (SELECT id FROM dbo.reports WHERE report_key = N'ЮЛ') AS parent_id, N'ОСВ (Новый)' AS title, N'chart' AS icon, N'' AS image, N'
SET ANSI_NULLS ON
SET QUOTED_IDENTIFIER ON
-- ============================================================================
-- Параметры запуска
-- ============================================================================
DECLARE @root INT = -10;
DECLARE @data_start DATETIME = {Период_start};
DECLARE @data_end DATETIME = {Период_end};

-- ============================================================================
-- Настройки
-- ============================================================================
SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;
SET NOCOUNT ON;
SET DEADLOCK_PRIORITY LOW;

-- ============================================================================
-- Очистка временных таблиц в начале
-- ============================================================================
IF OBJECT_ID(''tempdb..#FinalReport'') IS NOT NULL DROP TABLE #FinalReport;
IF OBJECT_ID(''tempdb..#AllCateries'') IS NOT NULL DROP TABLE #AllCateries;
IF OBJECT_ID(''tempdb..#MonthData'') IS NOT NULL DROP TABLE #MonthData;
IF OBJECT_ID(''tempdb..#PeriodData'') IS NOT NULL DROP TABLE #PeriodData;

-- ============================================================================
-- Итоговая таблица по всем месяцам
-- ============================================================================
CREATE TABLE #FinalReport (
	[ИНН] VARCHAR(20),
	[Договор] VARCHAR(500),
	[Дата расторжения договора] DATETIME,
	[ОТДЕЛЕНИЕ] NVARCHAR(500),
	[УЧАСТОК] NVARCHAR(500),
	[КАТЕГОРИЯ] NVARCHAR(600),
	[КАТЕГОРИЯ уровень 1] NVARCHAR(600),
	[Месяц] NVARCHAR(50),
	[Контрагент] NVARCHAR(1000),
	[ДЗН] FLOAT,
	[ДЗн текущая] FLOAT,
	[ДЗн просроченная] FLOAT,
	[ДЗн периоды] NVARCHAR(100),
	[ДЗн кол-во периодов] INT,
	[КЗн] FLOAT,
	[Объем] INT,
	[Дебет] FLOAT,
	[Списание ДЗ] FLOAT,
	[Восстановление ДЗ] FLOAT,
	[Кредит] FLOAT,
	[Списание КЗ] FLOAT,
	[Восстановление КЗ] FLOAT,
	[ДЗк] FLOAT,
	[ДЗк текущая] FLOAT,
	[ДЗк просроченная] FLOAT,
	[ДЗк периоды] NVARCHAR(100),
	[ДЗк кол-во периодов] INT,
	[КЗк] FLOAT,
	[Дополнительно] FLOAT
);

-- ============================================================================
-- Предварительная загрузка справочников, не зависящих от месяца
-- ============================================================================
SELECT 
	ROW_ID,
	Код,
	Название,
	[Папки] AS ParentId
INTO #AllCateries
FROM stack.[Категории договоров] (NOLOCK);

-- Создаем индексы для ускорения
CREATE CLUSTERED INDEX IX_AllCateries_Id ON #AllCateries (ROW_ID);
CREATE INDEX IX_AllCateries_Parent ON #AllCateries (ParentId);

-- ============================================================================
-- Цикл по месяцам от @data_start до @data_end
-- ============================================================================
DECLARE @dt1 DATETIME = @data_start;
DECLARE @dt2 DATETIME;

WHILE @dt1 <= @data_end
BEGIN
	SET @dt2 = EOMONTH(@dt1);

	-- ============================================================================
	-- Получаем обороты за текущий месяц
	-- ============================================================================
	IF OBJECT_ID(''tempdb..#Footing'') IS NOT NULL DROP TABLE #Footing;
	SELECT 
		f.Договор AS ДогНомЗап,
		f.НомерДоговора AS ДогНом,
		dog.Тема AS ДогТема,
		dog.[Дата расторжения] AS ДатаРасторж,
		f.Наименование AS ДогНаименование,
		f.Тип,
		f.ТипСальдо,
		f.Сумма,
		f.Кол_во,
		f.Аналитика,
		f.ИНН,
		f.ВидСчета,
		f.ТипДокумента AS ДокТип,
		f.Участок AS грУчасток,
		f.Отделение AS грОтделение,
		CASE WHEN f.УчастокНЗ>0 THEN f.УчастокНЗ
			 WHEN f.ОтделениеНЗ>0 THEN f.ОтделениеНЗ
			 ELSE -1
		END AS грПодразделение,
		CASE WHEN RTRIM(LTRIM(ISNULL(f.Аналитика,'''')))='''' THEN ''_''  
			 ELSE RTRIM(LTRIM(ISNULL(f.Аналитика,''''))) 
		END AS грВидДеятельности,
		f.идБюджета AS грБюджет,
		f.идОтрасли AS грОтрасль,
		dog.[Тип договора] AS грТипДоговора,
		dog.Папки AS грПапки,
		doc1.РасчМесяц,
		dog.[Категория-Договоры] AS DefaultCateryId
	INTO #Footing
	FROM stack.[contracts_footing](@root, @dt1, @dt2) f
	JOIN stack.[Договор] dog (NOLOCK) ON dog.row_id = f.Договор
	LEFT JOIN stack.[Документ] doc1 (NOLOCK) ON doc1.row_id = f.Документ
	WHERE f.Тип IN (1,2,3,5,6,10,11)
	  AND UPPER(ISNULL(f.Аналитика,'''')) IN ('''');

	-- Если нет данных за месяц, переходим к следующему
	IF NOT EXISTS (SELECT 1 FROM #Footing)
	BEGIN
		SET @dt1 = DATEADD(MONTH, 1, @dt1);
		CONTINUE;
	END

	-- ============================================================================
	-- Список договоров месяца для получения истории категорий
	-- ============================================================================
	IF OBJECT_ID(''tempdb..#ContractList'') IS NOT NULL DROP TABLE #ContractList;
	SELECT DISTINCT ДогНомЗап AS Договор
	INTO #ContractList
	FROM #Footing;

	DECLARE @strContractList NVARCHAR(MAX) = STUFF((
		SELECT '','' + CAST(Договор AS NVARCHAR(MAX))
		FROM #ContractList
		ORDER BY Договор
		FOR XML PATH(''''), TYPE
	).value(''.'', ''NVARCHAR(MAX)''), 1, 1, '''');

	-- ============================================================================
	-- История категорий для договоров месяца
	-- ============================================================================
	IF OBJECT_ID(''tempdb..#Cateries'') IS NOT NULL DROP TABLE #Cateries;
	CREATE TABLE #Cateries (
		Договор INT,
		идКатегории INT,
		ДатНач DATETIME,
		ДатКнц DATETIME
	);

	IF @strContractList IS NOT NULL AND @strContractList <> ''''
	BEGIN
		INSERT INTO #Cateries (Договор, идКатегории, ДатНач, ДатКнц)
		SELECT cc.Договор, cc.идКатегории, cc.ДатНач, cc.ДатКнц
		FROM stack.[contracts_characteristics] (@strContractList) cc;
	END

	CREATE CLUSTERED INDEX IX_Cateries_Contract ON #Cateries (Договор, ДатНач, ДатКнц);

	-- ============================================================================
	-- Основная таблица с данными договоров за месяц + категории
	-- ============================================================================
	IF OBJECT_ID(''tempdb..#data'') IS NOT NULL DROP TABLE #data;
	SELECT 
		mf.*,
		ISNULL(cat.Код, def.Код) AS грКатегорияКод,
		ISNULL(cat.Название, def.Название) AS грКатегорияНаим,
		ISNULL(CAST(cat.Код AS NVARCHAR(20)) + '' '' + cat.Название, 
			   CAST(def.Код AS NVARCHAR(20)) + '' '' + def.Название) AS грКатегорияПолное,
		ISNULL(ISNULL(parent.Код, def_parent.Код),ISNULL(cat.Код, def.Код)) AS грКатегорияРодительКод,
		ISNULL(ISNULL(parent.Название, def_parent.Название),ISNULL(cat.Название, def.Название)) AS грКатегорияРодительНаим, 
		ISNULL(ISNULL(CAST(parent.Код AS NVARCHAR(20)) + '' '' + parent.Название,
			   ISNULL(CAST(cat.Код AS NVARCHAR(20)) + '' '' + cat.Название, 
			   CAST(def_parent.Код AS NVARCHAR(20)) + '' '' + def_parent.Название)),
			   ISNULL(CAST(cat.Код AS NVARCHAR(20)) + '' '' + cat.Название, 
			   CAST(def.Код AS NVARCHAR(20)) + '' '' + def.Название)) AS грКатегорияРодительПолное
	INTO #data
	FROM #Footing mf
	OUTER APPLY (
		SELECT TOP 1 cc.идКатегории
		FROM #Cateries cc
		WHERE cc.Договор = mf.ДогНомЗап
		  AND mf.РасчМесяц BETWEEN cc.ДатНач AND cc.ДатКнц
		ORDER BY cc.ДатКнц DESC
	) AS selectedCatery
	LEFT JOIN #AllCateries cat ON cat.ROW_ID = selectedCatery.идКатегории
	LEFT JOIN #AllCateries parent ON parent.ROW_ID = cat.ParentId
	LEFT JOIN #AllCateries def ON def.ROW_ID = mf.DefaultCateryId
	LEFT JOIN #AllCateries def_parent ON def_parent.ROW_ID = def.ParentId;

	-- Создаем индексы для #data
	CREATE CLUSTERED INDEX IX_data_Contract ON #data (ДогНом, грКатегорияПолное);
	CREATE INDEX IX_data_Type ON #data (Тип, ТипСальдо);

	-- ============================================================================
	-- ПЕРЕНОС ОПЕРАЦИЙ: Если сумма кредита равна входящему сальдо старой категории,
	-- переносим операцию в старую категорию (чтобы закрыть долг корректно)
	-- ============================================================================
	;WITH OldCatData AS (
		SELECT ДогНом, 
			   грКатегорияПолное, грКатегорияРодительПолное, 
			   грКатегорияКод, грКатегорияНаим, грКатегорияРодительКод, грКатегорияРодительНаим,
			   SUM(Сумма) AS DebtSum
		FROM #data
		WHERE Тип = 5 AND ТипСальдо = 1
		GROUP BY ДогНом, грКатегорияПолное, грКатегорияРодительПолное, 
				 грКатегорияКод, грКатегорияНаим, грКатегорияРодительКод, грКатегорияРодительНаим
	)
	UPDATE d
	SET 
		d.грКатегорияПолное = ocd.грКатегорияПолное,
		d.грКатегорияРодительПолное = ocd.грКатегорияРодительПолное,
		d.грКатегорияКод = ocd.грКатегорияКод,
		d.грКатегорияНаим = ocd.грКатегорияНаим,
		d.грКатегорияРодительКод = ocd.грКатегорияРодительКод,
		d.грКатегорияРодительНаим = ocd.грКатегорияРодительНаим
	FROM #data d
	JOIN OldCatData ocd ON d.ДогНом = ocd.ДогНом
	WHERE d.Тип = 2 
	  AND ABS(d.Сумма - ocd.DebtSum) < 0.01
	  AND d.грКатегорияПолное <> ocd.грКатегорияПолное;

	-- ============================================================================
	-- Предварительный расчет периодов для ДЗн и ДЗк
	-- ============================================================================
	IF OBJECT_ID(''tempdb..#PeriodData'') IS NOT NULL DROP TABLE #PeriodData;
	SELECT 
		ДогНом,
		грКатегорияПолное,
		Тип,
		РасчМесяц
	INTO #PeriodData
	FROM #data
	WHERE Тип IN (5, 6) 
	  AND ТипСальдо = 1
	  AND РасчМесяц < @dt1;

	-- Добавляем индексы для #PeriodData
	CREATE CLUSTERED INDEX IX_PeriodData ON #PeriodData (ДогНом, грКатегорияПолное, Тип, РасчМесяц);

	-- ============================================================================
	-- Вставка результатов месяца в итоговую таблицу
	-- ============================================================================
	INSERT INTO #FinalReport
	SELECT             
		tc.ИНН,
		tc.ДогНом AS [Договор],
		tc.ДатаРасторж AS [Дата расторжения договора],
		tc.грОтделение AS [ОТДЕЛЕНИЕ],
		tc.грУчасток AS [УЧАСТОК],
		tc.грКатегорияРодительПолное AS [КАТЕГОРИЯ],
		tc.грКатегорияПолное AS [КАТЕГОРИЯ уровень 1],
		FORMAT(@dt1, ''[yyyy-MM] MMMM'', ''ru-RU'') AS [Месяц],
		tc.ДогНаименование AS [Контрагент],
		SUM(CASE WHEN tc.Тип = 5 AND tc.ТипСальдо = 1 THEN tc.Сумма ELSE 0 END) AS [ДЗН],
		SUM(CASE WHEN tc.Тип = 5 AND tc.ТипСальдо = 1 AND tc.РасчМесяц >= DATEADD(MONTH, -1, @dt1) THEN tc.Сумма ELSE 0 END) AS [ДЗн текущая],
		SUM(CASE WHEN tc.Тип = 5 AND tc.ТипСальдо = 1 AND tc.РасчМесяц < DATEADD(MONTH, -2, @dt1) THEN tc.Сумма ELSE 0 END) AS [ДЗн просроченная],
		(
			SELECT 
				CASE 
					WHEN MIN(pd.РасчМесяц) IS NULL THEN ''''
					WHEN MIN(pd.РасчМесяц) = MAX(pd.РасчМесяц) THEN
						CASE MONTH(MIN(pd.РасчМесяц)) 
							WHEN 1 THEN ''январь'' WHEN 2 THEN ''февраль'' WHEN 3 THEN ''март'' WHEN 4 THEN ''апрель'' 
							WHEN 5 THEN ''май'' WHEN 6 THEN ''июнь'' WHEN 7 THEN ''июль'' WHEN 8 THEN ''август'' 
							WHEN 9 THEN ''сентябрь'' WHEN 10 THEN ''октябрь'' WHEN 11 THEN ''ноябрь'' WHEN 12 THEN ''декабрь'' 
						END + '' '' + CAST(YEAR(MIN(pd.РасчМесяц)) AS VARCHAR(4))
					ELSE 
						CASE MONTH(MIN(pd.РасчМесяц)) 
							WHEN 1 THEN ''январь'' WHEN 2 THEN ''февраль'' WHEN 3 THEN ''март'' WHEN 4 THEN ''апрель'' 
							WHEN 5 THEN ''май'' WHEN 6 THEN ''июнь'' WHEN 7 THEN ''июль'' WHEN 8 THEN ''август'' 
							WHEN 9 THEN ''сентябрь'' WHEN 10 THEN ''октябрь'' WHEN 11 THEN ''ноябрь'' WHEN 12 THEN ''декабрь'' 
						END + '' '' + CAST(YEAR(MIN(pd.РасчМесяц)) AS VARCHAR(4))
						+ '' - '' + 
						CASE MONTH(MAX(pd.РасчМесяц)) 
							WHEN 1 THEN ''январь'' WHEN 2 THEN ''февраль'' WHEN 3 THEN ''март'' WHEN 4 THEN ''апрель'' 
							WHEN 5 THEN ''май'' WHEN 6 THEN ''июнь'' WHEN 7 THEN ''июль'' WHEN 8 THEN ''август'' 
							WHEN 9 THEN ''сентябрь'' WHEN 10 THEN ''октябрь'' WHEN 11 THEN ''ноябрь'' WHEN 12 THEN ''декабрь'' 
						END + '' '' + CAST(YEAR(MAX(pd.РасчМесяц)) AS VARCHAR(4))
				END
			FROM #PeriodData pd
			WHERE pd.ДогНом = tc.ДогНом 
			  AND pd.Тип = 5
			  AND pd.грКатегорияПолное = tc.грКатегорияПолное
		) AS [ДЗн периоды],
		(
			SELECT COUNT(DISTINCT pd.РасчМесяц) 
			FROM #PeriodData pd
			WHERE pd.ДогНом = tc.ДогНом 
			  AND pd.Тип = 5
			  AND pd.грКатегорияПолное = tc.грКатегорияПолное
		) AS [ДЗн кол-во периодов],
		SUM(CASE WHEN tc.Тип = 5 AND tc.ТипСальдо <> 1 THEN -tc.Сумма ELSE 0 END) AS [КЗн],
		SUM(CASE WHEN tc.Тип IN (1) THEN tc.Кол_во ELSE 0 END) AS [Объем],
		SUM(CASE WHEN (tc.Тип = 1 AND tc.ДокТип = 91 AND tc.ВидСчета NOT IN (4,15)) OR (tc.Тип = 1 AND tc.ДокТип <> 91) THEN tc.Сумма ELSE 0 END) AS [Дебет],
		SUM(CASE WHEN tc.Тип = 1 AND tc.ДокТип = 91 AND tc.ВидСчета = 4 THEN tc.Сумма ELSE 0 END) AS [Списание ДЗ],
		SUM(CASE WHEN tc.Тип = 1 AND tc.ДокТип = 91 AND tc.ВидСчета = 15 THEN tc.Сумма ELSE 0 END) AS [Восстановление ДЗ],
		SUM(CASE WHEN tc.Тип IN (10,11) OR (tc.Тип = 2 AND NOT (tc.ДокТип = 91 AND tc.ВидСчета IN (5,16))) THEN tc.Сумма ELSE 0 END) AS [Кредит],
		SUM(CASE WHEN tc.Тип = 2 AND tc.ДокТип = 91 AND tc.ВидСчета = 5 THEN tc.Сумма ELSE 0 END) AS [Списание КЗ],
		SUM(CASE WHEN tc.Тип = 2 AND tc.ДокТип = 91 AND tc.ВидСчета = 16 THEN tc.Сумма ELSE 0 END) AS [Восстановление КЗ],
		SUM(CASE WHEN tc.Тип = 6 AND tc.ТипСальдо = 1 THEN tc.Сумма ELSE 0 END) AS [ДЗк],
		SUM(CASE WHEN tc.Тип = 6 AND tc.ТипСальдо = 1 AND tc.РасчМесяц >= @dt1 THEN tc.Сумма ELSE 0 END) AS [ДЗк текущая],
		SUM(CASE WHEN tc.Тип = 6 AND tc.ТипСальдо = 1 AND tc.РасчМесяц < @dt1 THEN tc.Сумма ELSE 0 END) AS [ДЗк просроченная],
		(
			SELECT 
				CASE 
					WHEN MIN(pd.РасчМесяц) IS NULL THEN ''''
					WHEN MIN(pd.РасчМесяц) = MAX(pd.РасчМесяц) THEN
						CASE MONTH(MIN(pd.РасчМесяц)) 
							WHEN 1 THEN ''январь'' WHEN 2 THEN ''февраль'' WHEN 3 THEN ''март'' WHEN 4 THEN ''апрель'' 
							WHEN 5 THEN ''май'' WHEN 6 THEN ''июнь'' WHEN 7 THEN ''июль'' WHEN 8 THEN ''август'' 
							WHEN 9 THEN ''сентябрь'' WHEN 10 THEN ''октябрь'' WHEN 11 THEN ''ноябрь'' WHEN 12 THEN ''декабрь'' 
						END + '' '' + CAST(YEAR(MIN(pd.РасчМесяц)) AS VARCHAR(4))
					ELSE 
						CASE MONTH(MIN(pd.РасчМесяц)) 
							WHEN 1 THEN ''январь'' WHEN 2 THEN ''февраль'' WHEN 3 THEN ''март'' WHEN 4 THEN ''апрель'' 
							WHEN 5 THEN ''май'' WHEN 6 THEN ''июнь'' WHEN 7 THEN ''июль'' WHEN 8 THEN ''август'' 
							WHEN 9 THEN ''сентябрь'' WHEN 10 THEN ''октябрь'' WHEN 11 THEN ''ноябрь'' WHEN 12 THEN ''декабрь'' 
						END + '' '' + CAST(YEAR(MIN(pd.РасчМесяц)) AS VARCHAR(4))
						+ '' - '' + 
						CASE MONTH(MAX(pd.РасчМесяц)) 
							WHEN 1 THEN ''январь'' WHEN 2 THEN ''февраль'' WHEN 3 THEN ''март'' WHEN 4 THEN ''апрель'' 
							WHEN 5 THEN ''май'' WHEN 6 THEN ''июнь'' WHEN 7 THEN ''июль'' WHEN 8 THEN ''август'' 
							WHEN 9 THEN ''сентябрь'' WHEN 10 THEN ''октябрь'' WHEN 11 THEN ''ноябрь'' WHEN 12 THEN ''декабрь'' 
						END + '' '' + CAST(YEAR(MAX(pd.РасчМесяц)) AS VARCHAR(4))
				END
			FROM #PeriodData pd
			WHERE pd.ДогНом = tc.ДогНом 
			  AND pd.Тип = 6
			  AND pd.грКатегорияПолное = tc.грКатегорияПолное
		) AS [ДЗк периоды],
		(
			SELECT COUNT(DISTINCT pd.РасчМесяц) 
			FROM #PeriodData pd
			WHERE pd.ДогНом = tc.ДогНом 
			  AND pd.Тип = 6
			  AND pd.грКатегорияПолное = tc.грКатегорияПолное
		) AS [ДЗк кол-во периодов],
		SUM(CASE WHEN tc.Тип = 6 AND tc.ТипСальдо <> 1 THEN -tc.Сумма ELSE 0 END) AS [КЗк],
		SUM(CASE WHEN tc.Тип = 1 AND tc.ДокТип = 91 AND tc.ВидСчета = 4 THEN tc.Сумма ELSE 0 END) AS [Дополнительно]
	FROM #data tc
	GROUP BY tc.ДогНом, tc.грКатегорияПолное, tc.грКатегорияРодительПолное, 
			 tc.ИНН, tc.ДатаРасторж, tc.грОтделение, tc.грУчасток, tc.ДогНаименование;

	-- Очищаем временные таблицы месяца
	DROP TABLE #Footing;
	DROP TABLE #ContractList;
	DROP TABLE #Cateries;
	DROP TABLE #data;
	DROP TABLE #PeriodData;

	SET @dt1 = DATEADD(MONTH, 1, @dt1);
END

-- ============================================================================
-- Итоги
-- ============================================================================
SELECT 
	[ИНН],
	[Договор],
	[Дата расторжения договора],
	[ОТДЕЛЕНИЕ],
	[УЧАСТОК],
	[КАТЕГОРИЯ],
	[КАТЕГОРИЯ уровень 1],
	[Месяц],
	[Контрагент],
	[ДЗН],
	[ДЗн текущая],
	[ДЗн просроченная],
	[ДЗн периоды],
	[ДЗн кол-во периодов],
	[КЗн],
	[Объем],
	[Дебет],
	[Списание ДЗ],
	[Восстановление ДЗ],
	[Кредит],
	[Списание КЗ],
	[Восстановление КЗ],
	[ДЗк],
	[ДЗк текущая],
	[ДЗк просроченная],
	[ДЗк периоды],
	[ДЗк кол-во периодов],
	[КЗк],
	[Дополнительно]
FROM #FinalReport
ORDER BY [Договор], [Месяц], [КАТЕГОРИЯ];

' AS query_text, CAST(N'{"fields":{"statistic":[{"dataField":"Исполнено"},{"dataField":"Время"},{"dataField":"Записей"},{"dataField":"Фильтры"}],"pivot":[{"dataField":"Месяц","area":"row","expanded":true},{"caption":"Филиал","dataField":"Филиал","area":"row","expanded":true},{"dataField":"ИНН","area":"filter"},{"dataField":"Дата расторжения договора","area":"filter"},{"dataField":"ОТДЕЛЕНИЕ","area":"filter"},{"dataField":"УЧАСТОК","area":"filter"},{"dataField":"КАТЕГОРИЯ","area":"row","expanded":true},{"dataField":"КАТЕГОРИЯ уровень 1","area":"row","expanded":false},{"dataField":"Договор","area":"row","expanded":true},{"dataField":"Контрагент","area":"row","expanded":true},{"dataField":"ДЗк периоды","area":"filter"},{"dataField":"ДЗк кол-во периодов","area":"filter"},{"dataField":"Дополнительно","area":"filter"},{"dataField":"ДЗн периоды","area":"filter"},{"dataField":"ДЗн кол-во периодов","area":"filter"},{"caption":"Отчет","dataField":"Отчет","area":"column","expanded":false},{"dataField":"ДЗН","dataType":"number","summaryType":"sum","format":{"type":"fixedPoint","precision":2},"area":"data","unit":"руб"},{"dataField":"ДЗн текущая","dataType":"number","summaryType":"sum","format":{"type":"fixedPoint","precision":2},"area":"data","unit":"руб"},{"dataField":"ДЗн просроченная","dataType":"number","summaryType":"sum","format":{"type":"fixedPoint","precision":2},"area":"data","unit":"руб"},{"dataField":"КЗн","dataType":"number","summaryType":"sum","format":{"type":"fixedPoint","precision":2},"area":"data","unit":"руб"},{"caption":"Объем","dataField":"Объем","dataType":"number","summaryType":"sum","format":{"type":"fixedPoint","precision":3},"area":"data","unit":"руб"},{"dataField":"Дебет","dataType":"number","summaryType":"sum","format":{"type":"fixedPoint","precision":2},"area":"data","unit":"руб"},{"dataField":"Списание ДЗ","dataType":"number","summaryType":"sum","format":{"type":"fixedPoint","precision":2},"area":"data","unit":"руб"},{"dataField":"Восстановление ДЗ","dataType":"number","summaryType":"sum","format":{"type":"fixedPoint","precision":2},"area":"data","unit":"руб"},{"dataField":"Кредит","dataType":"number","summaryType":"sum","format":{"type":"fixedPoint","precision":2},"area":"data","unit":"руб"},{"dataField":"Списание КЗ","dataType":"number","summaryType":"sum","format":{"type":"fixedPoint","precision":2},"area":"data","unit":"руб"},{"dataField":"Восстановление КЗ","dataType":"number","summaryType":"sum","format":{"type":"fixedPoint","precision":2},"area":"data","unit":"руб"},{"dataField":"ДЗк","dataType":"number","summaryType":"sum","format":{"type":"fixedPoint","precision":2},"area":"data","unit":"руб"},{"dataField":"ДЗк текущая","dataType":"number","summaryType":"sum","format":{"type":"fixedPoint","precision":2},"area":"data","unit":"руб"},{"dataField":"ДЗк просроченная","dataType":"number","summaryType":"sum","format":{"type":"fixedPoint","precision":2},"area":"data","unit":"руб"},{"dataField":"КЗк","dataType":"number","summaryType":"sum","format":{"type":"fixedPoint","precision":2},"area":"data","unit":"руб"}],"grid":[{"dataField":"Месяц","groupIndex":0},{"caption":"Филиал","dataField":"Филиал","groupIndex":1},{"dataField":"ИНН"},{"dataField":"Дата расторжения договора"},{"dataField":"ОТДЕЛЕНИЕ"},{"dataField":"УЧАСТОК"},{"dataField":"КАТЕГОРИЯ"},{"dataField":"КАТЕГОРИЯ уровень 1"},{"dataField":"Договор"},{"dataField":"Контрагент"},{"dataField":"ДЗн периоды"},{"dataField":"ДЗн кол-во периодов"},{"dataField":"ДЗН","format":{"type":"fixedPoint","precision":2}},{"dataField":"ДЗн текущая","format":{"type":"fixedPoint","precision":2}},{"dataField":"ДЗн просроченная","format":{"type":"fixedPoint","precision":2}},{"dataField":"КЗн","format":{"type":"fixedPoint","precision":2}},{"dataField":"Объем","format":{"type":"fixedPoint","precision":3}},{"dataField":"Дебет","format":{"type":"fixedPoint","precision":2}},{"dataField":"Списание ДЗ","format":{"type":"fixedPoint","precision":2}},{"dataField":"Восстановление ДЗ","format":{"type":"fixedPoint","precision":2}},{"dataField":"Кредит","format":{"type":"fixedPoint","precision":2}},{"dataField":"Списание КЗ","format":{"type":"fixedPoint","precision":2}},{"dataField":"Восстановление КЗ","format":{"type":"fixedPoint","precision":2}},{"dataField":"ДЗк","format":{"type":"fixedPoint","precision":2}},{"dataField":"ДЗк текущая","format":{"type":"fixedPoint","precision":2}},{"dataField":"ДЗк просроченная","format":{"type":"fixedPoint","precision":2}},{"dataField":"КЗк","format":{"type":"fixedPoint","precision":2}},{"dataField":"ДЗк периоды"},{"dataField":"ДЗк кол-во периодов"},{"dataField":"Дополнительно"}]},"filters":{"БД_ЮЛ":[],"Период":[]},"views":["pivot","grid"],"processing":"server-multi","description":"ОСВ для юридических лиц (новая версия).","mandatory":["БД_ЮЛ"]}' AS NVARCHAR(MAX)) AS config, 0 AS is_section, 0 AS sort_order) AS src
   ON target.report_key = src.report_key
WHEN MATCHED THEN UPDATE SET title = src.title, icon = src.icon, image = src.image,
    query_text = src.query_text, config = src.config, parent_id = src.parent_id,
    is_section = src.is_section, sort_order = src.sort_order, is_deleted = 0,
    updated_at = SYSUTCDATETIME()
WHEN NOT MATCHED THEN INSERT (report_key, parent_id, title, icon, image, query_text,
    config, is_section, sort_order)
    VALUES (src.report_key, src.parent_id, src.title, src.icon, src.image,
    src.query_text, src.config, src.is_section, src.sort_order);
GO
MERGE dbo.reports AS target
USING (SELECT N'ОРН' AS report_key, (SELECT id FROM dbo.reports WHERE report_key = N'ФЛ') AS parent_id, N'ОРН' AS title, N'' AS icon, N'' AS image, N'' AS query_text, CAST(N'{}' AS NVARCHAR(MAX)) AS config, 1 AS is_section, 1 AS sort_order) AS src
   ON target.report_key = src.report_key
WHEN MATCHED THEN UPDATE SET title = src.title, icon = src.icon, image = src.image,
    query_text = src.query_text, config = src.config, parent_id = src.parent_id,
    is_section = src.is_section, sort_order = src.sort_order, is_deleted = 0,
    updated_at = SYSUTCDATETIME()
WHEN NOT MATCHED THEN INSERT (report_key, parent_id, title, icon, image, query_text,
    config, is_section, sort_order)
    VALUES (src.report_key, src.parent_id, src.title, src.icon, src.image,
    src.query_text, src.config, src.is_section, src.sort_order);
GO
MERGE dbo.reports AS target
USING (SELECT N'RPT_2002' AS report_key, (SELECT id FROM dbo.reports WHERE report_key = N'ЮЛ') AS parent_id, N'997 Оплата промежуточных счетов' AS title, N'chart' AS icon, N'' AS image, N'
SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;
DECLARE @mes DATE={РасчетыйМесяц};
select c.Отделение,
c.Участок,
dd.Номер [Договор],
o.Название [Потребитель],
d.Примечание [Процент от реализации],
FORMAT(@mes, ''[yyyy-MMMM]'', ''ru'') [Расчетный месяц],
FORMAT(d.Дата, ''yyyy-MM-dd'', ''ru'') [Дата документа],
d.Сумма [Сумма документа],
FORMAT(s.Дата, ''yyyy-MM-dd'', ''ru'') [Дата оплаты],
s.Сумма [Сумма оплаты],
tt.ИтогоОплат [Итого оплат],
ROUND(tt.ИтогоОплат / d.Сумма  * 100, 2) [Процент]
from stack.Документ d
join stack.Договор dd on dd.ROW_ID = d.[Документы-Договор]
join stack.Организации o on o.ROW_ID = dd.Плательщик
join stack.contracts(-1) c on c.Договор = dd.ROW_ID
left join stack.[Связи документов] s on s.Связка1 = d.ROW_ID
left join stack.Документ d2 on d2.ROW_ID = s.Связка2
left join (select c.Отделение, dd.Номер, o.Название, d.Примечание, @mes ДатНач, d.Дата ДатаДок, d.Сумма СуммаСФ, sum(s.Сумма) ИтогоОплат                                     
from stack.Документ d
join stack.Договор dd on dd.ROW_ID = d.[Документы-Договор]
join stack.Организации o on o.ROW_ID = dd.Плательщик
join stack.contracts(-1) c on c.Договор = dd.ROW_ID
left join stack.[Связи документов] s on s.Связка1 = d.ROW_ID
left join stack.Документ d2 on d2.ROW_ID = s.Связка2
where d.Дата >= @mes and d.Дата < DATEADD(MONTH, 1, @mes) and d.[Тип документа] = 1
group by c.Отделение, dd.Номер, o.Название, d.Примечание, d.Дата, d.Сумма) tt 
on tt.Номер = dd.Номер and tt.Примечание = d.Примечание and tt.СуммаСФ = d.Сумма
where d.Дата >= @mes and d.Дата < DATEADD(MONTH, 1, @mes)and d.[Тип документа] = 1
' AS query_text, CAST(N'{"fields":{"statistic":[{"dataField":"Исполнено"},{"dataField":"Время"},{"dataField":"Записей"},{"dataField":"Фильтры"}],"pivot":[{"caption":"Расчетный месяц","dataField":"Расчетный месяц","area":"filter"},{"caption":"Процент от реализации","dataField":"Процент от реализации","area":"column"},{"caption":"Дата оплаты","dataField":"Дата оплаты","area":"column"},{"caption":"Отделение","dataField":"Отделение","area":"row","expanded":false},{"caption":"Участок","dataField":"Участок","area":"row","expanded":false},{"caption":"Договор","dataField":"Договор","area":"filter","expanded":false},{"caption":"Потребитель","dataField":"Потребитель","area":"filter"},{"caption":"Дата документа","dataField":"Дата документа","area":"filter"},{"caption":"Сумма документа","dataField":"Сумма документа","dataType":"number","summaryType":"sum","format":{"type":"fixedPoint","precision":2},"area":"data","unit":"руб"},{"caption":"Сумма оплаты","dataField":"Сумма оплаты","dataType":"number","summaryType":"sum","format":{"type":"fixedPoint","precision":2},"area":"data","unit":"руб"},{"caption":"Процент оплаты","dataType":"number","format":{"type":"percent","precision":2},"area":"data","unit":"%"}],"chart":{"pvtfld":[{"caption":"Расчетный месяц","dataField":"Расчетный месяц","area":"filter"},{"caption":"Процент от реализации","dataField":"Процент от реализации","area":"column"},{"caption":"Дата оплаты","dataField":"Дата оплаты","area":"column"},{"caption":"Отделение","dataField":"Отделение","area":"row","expanded":false},{"caption":"Договор","dataField":"Договор","area":"filter","expanded":false},{"caption":"Потребитель","dataField":"Потребитель","area":"filter"},{"caption":"Дата документа","dataField":"Дата документа","area":"filter"},{"caption":"Сумма документа","dataField":"Сумма документа","dataType":"number","summaryType":"sum","format":{"type":"fixedPoint","precision":2},"area":"data","unit":"руб"},{"caption":"Сумма оплаты","dataField":"Сумма оплаты","dataType":"number","summaryType":"sum","format":{"type":"fixedPoint","precision":2},"area":"data","unit":"руб"}],"series":[{"field":"СуммаОпл","name":"СуммаОпл","type":"bar"}],"argument":"период","title":"График"}},"filters":{"БД_ЮЛ":[],"РасчетыйМесяц":[]},"description":"Промежуточные счета по коду 997 — оплата и детализация.","mandatory":["БД_ЮЛ"]}' AS NVARCHAR(MAX)) AS config, 0 AS is_section, 1 AS sort_order) AS src
   ON target.report_key = src.report_key
WHEN MATCHED THEN UPDATE SET title = src.title, icon = src.icon, image = src.image,
    query_text = src.query_text, config = src.config, parent_id = src.parent_id,
    is_section = src.is_section, sort_order = src.sort_order, is_deleted = 0,
    updated_at = SYSUTCDATETIME()
WHEN NOT MATCHED THEN INSERT (report_key, parent_id, title, icon, image, query_text,
    config, is_section, sort_order)
    VALUES (src.report_key, src.parent_id, src.title, src.icon, src.image,
    src.query_text, src.config, src.is_section, src.sort_order);
GO
MERGE dbo.reports AS target
USING (SELECT N'RPT_2003' AS report_key, (SELECT id FROM dbo.reports WHERE report_key = N'ЮЛ') AS parent_id, N'Параметр ПОЧАСОВОЙ' AS title, N'chart' AS icon, N'' AS image, N'declare @parametr int = (SELECT ROW_ID FROM stack.[Виды параметров] WHERE Название = ''ПОЧАСОВОЙ'')
declare @parCenKat int = (SELECT ROW_ID FROM stack.[Виды параметров] WHERE Название = ''ЦКАТЕГОРИЯ'')

SELECT
      dog.Номер as НомерДоговора, 
      ls.Номер as НомерТУ,
      Q.ЗаводскойНомер as ЗавНомерСчетчика,
      sotr.ФИО as Расчетчик,
      CASE WHEN sv.Значение = 0 THEN ''Первая''
            WHEN sv.Значение = 1 THEN ''Вторая''
            WHEN sv.Значение = 2 THEN ''Третья''
            WHEN sv.Значение = 3 THEN ''Четвертая''
            WHEN sv.Значение = 4 THEN ''Пятая''
            WHEN sv.Значение = 5 THEN ''Шестая''
            ELSE '''' END AS ЦеноваяКатегория,
      CASE WHEN Q.VAL = '''' THEN ''ДА'' ELSE Q.VAL END as ЗначениеПараметра, 
      Q.VAL2 as ЗначениеПараметра2, 
      CASE WHEN Q.DATEA = '''' THEN ''Параметр действующий'' ELSE Q.DATEA END as СрокПараметра FROM (
select DISTINCT
      CASE WHEN sv.Значение != 1 THEN ''Параметр Почасовой не выставлен в значение ДА'' 
            WHEN sv.Значение = 1 THEN ''''
            ELSE ''Параметр отсутствует'' END VAL,
      CASE WHEN sv.Знач3 != 6 THEN ''В параметре Почасовой не указан источник PIRAMIDA'' 
            WHEN sv.Знач3 = 6 THEN ''''
            ELSE ''Параметр отсутствует'' END VAL2,
      CASE WHEN NOT GETDATE() BETWEEN sv.ДатНач AND sv.ДатКнц THEN ''Параметр Почасовой закрыт (проверьте даты)'' 
            WHEN GETDATE() BETWEEN sv.ДатНач AND sv.ДатКнц THEN ''''
            ELSE ''Параметр отсутствует'' END DATEA,
      so.[Объекты-Счет],
      so.ROW_ID,
      so.ЗаводскойНомер
FROM stack.[Список объектов] so
JOIN [10.51.7.49].[kol_atom_asd].[stack].[АСД Приборы] pr ON pr.ЗавНомер = so.ЗаводскойНомер AND pr.[КолвоКаналов]>0 AND pr.ДатаВремяОбмена>DATEADD(mm, -1, GETDATE())
JOIN [10.51.7.49].[kol_atom_asd].[stack].[АСД Каналы] kan on kan.Прибор = pr.row_id
LEFT JOIN stack.[Свойства] sv ON sv.[Объекты-Параметры] = so.row_id AND sv.[Виды-Параметры] = @parametr
) Q
JOIN stack.[Лицевые счета] ls ON ls.ROW_ID = Q.[Объекты-Счет]
LEFT JOIN stack.[Свойства] sv ON sv.[Счет-Параметры] = Q.[Объекты-Счет] AND sv.[Виды-Параметры] = @parCenKat AND GETDATE() BETWEEN sv.ДатНач AND sv.ДатКнц
LEFT JOIN stack.[Лицевые договора] ld ON ld.Лицевой = Q.[Объекты-Счет] AND GETDATE() BETWEEN ld.ДатНач AND ld.ДатКнц  
LEFT JOIN stack.Договор dog ON dog.ROW_ID = ld.Договор
LEFT JOIN stack.Сотрудники sotr ON sotr.ROW_ID = dog.Сотрудник1
' AS query_text, CAST(N'{"fields":{"statistic":[{"dataField":"Исполнено"},{"dataField":"Время"},{"dataField":"Записей"},{"dataField":"Фильтры"}],"grid":[{"caption":"Филиал","dataField":"Филиал","groupIndex":1},{"caption":"Номер Договора","dataField":"НомерДоговора"},{"caption":"Номер ТУ","dataField":"НомерТУ"},{"caption":"Заводской Номер Счетчика","dataField":"ЗавНомерСчетчика"},{"caption":"Ценовая Категория","dataField":"ЦеноваяКатегория"},{"caption":"Почасовой","dataField":"ЗначениеПараметра"},{"caption":"Протокол","dataField":"ЗначениеПараметра2"},{"caption":"Состояние Параметра","dataField":"СрокПараметра"}]},"filters":{"БД_ЮЛ":[]},"description":"Проверка наличия и состояния параметра Почасовой на лицевых счетах.","mandatory":["БД_ЮЛ"]}' AS NVARCHAR(MAX)) AS config, 0 AS is_section, 2 AS sort_order) AS src
   ON target.report_key = src.report_key
WHEN MATCHED THEN UPDATE SET title = src.title, icon = src.icon, image = src.image,
    query_text = src.query_text, config = src.config, parent_id = src.parent_id,
    is_section = src.is_section, sort_order = src.sort_order, is_deleted = 0,
    updated_at = SYSUTCDATETIME()
WHEN NOT MATCHED THEN INSERT (report_key, parent_id, title, icon, image, query_text,
    config, is_section, sort_order)
    VALUES (src.report_key, src.parent_id, src.title, src.icon, src.image,
    src.query_text, src.config, src.is_section, src.sort_order);
GO
MERGE dbo.reports AS target
USING (SELECT N'RPT_2004' AS report_key, (SELECT id FROM dbo.reports WHERE report_key = N'ЮЛ') AS parent_id, N'ЮЛ ФАС (Итоги)' AS title, N'chart' AS icon, N'' AS image, N'
SET DATEFORMAT ymd
SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED
SET NOCOUNT ON;
DECLARE @month1 DATE = {ПериодМесяцы_start};
DECLARE @month2 DATE = {ПериодМесяцы_end};

DECLARE @date date = getdate();
DECLARE @startOfYear date = DATEFROMPARTS(YEAR(@month1), 1, 1);

-- Константы (день.месяц)
DECLARE @start_str NVARCHAR(10) = (SELECT TOP 1 Значение FROM stack.[Константы] WHERE Имя = ''196_22_НАЧАЛООТОП'');
DECLARE @end_str   NVARCHAR(10) = (SELECT TOP 1 Значение FROM stack.[Константы] WHERE Имя = ''196_22_КОНЕЦОТОП'');

-- Парсим месяц и день
DECLARE @start_month INT = CAST(SUBSTRING(@start_str, 4, 2) AS INT);
DECLARE @start_day   INT = CAST(SUBSTRING(@start_str, 1, 2) AS INT);
DECLARE @end_month   INT = CAST(SUBSTRING(@end_str, 4, 2) AS INT);
DECLARE @end_day     INT = CAST(SUBSTRING(@end_str, 1, 2) AS INT);

DECLARE @p1 int,@p2 int;
set @p1 = (select top 1 row_id from stack.[Виды параметров] where Название = ''КОЛ_ПОМЕЩ'');
set @p2 = (select top 1 row_id from stack.[Виды параметров] where Название = ''ОДНЮЛ'');


-- Очищаем временные таблицы
IF OBJECT_ID(''tempdb..#result'') IS NOT NULL DROP TABLE #result;
IF OBJECT_ID(''tempdb..#exc_contract'') IS NOT NULL DROP TABLE #exc_contract;
IF OBJECT_ID(''tempdb..#service'') IS NOT NULL DROP TABLE #service; 


-- Создаем временную таблицу для результатов
IF OBJECT_ID(''tempdb..#result'') IS NOT NULL DROP TABLE #result;
CREATE TABLE #result (
    БД NVARCHAR(10),
    Месяц DATE,
    Услуга NVARCHAR(256),
    Ф46 NVARCHAR(256),
    Категория NVARCHAR(256),
    Отоп NVARCHAR(10),
    КолПомещ float,
    ТипПомещения NVARCHAR(10),
    Строка_таблицы NVARCHAR(256),
    ОбъемПер float,
    СуммаПер float,
    Объем float,
    Сумма float,
    [<0_Объем] float,
    [0_Объем] float,
    [0_100_Объем] float,
    [100_200_Объем] float,
    [200_300_Объем] float,
    [300_400_Объем] float,
    [400_500_Объем] float,
    [500_600_Объем] float,
    [600_700_Объем] float,
    [700_800_Объем] float,
    [800_900_Объем] float,
    [900_1000_Объем] float,
    [1000_2000_Объем] float,
    [2000_3000_Объем] float,
    [3000_4000_Объем] float,
    [4000_5000_Объем] float,
    [5000_10000_Объем] float,
    [10000_15000_Объем] float,
    [15000_20000_Объем] float,
    [20000_25000_Объем] float,
    [25000_30000_Объем] float,
    [30000_35000_Объем] float,
    [35000_40000_Объем] float,
    [40000_45000_Объем] float,
    [45000_50000_Объем] float,
    [>50000_Объем] float,
    [<0_КолВо] float,
    [0_КолВо] float,
    [0_100_КолВо] float,
    [100_200_КолВо] float,
    [200_300_КолВо] float,
    [300_400_КолВо] float,
    [400_500_КолВо] float,
    [500_600_КолВо] float,
    [600_700_КолВо] float,
    [700_800_КолВо] float,
    [800_900_КолВо] float,
    [900_1000_КолВо] float,
    [1000_2000_КолВо] float,
    [2000_3000_КолВо] float,
    [3000_4000_КолВо] float,
    [4000_5000_КолВо] float,
    [5000_10000_КолВо] float,
    [10000_15000_КолВо] float,
    [15000_20000_КолВо] float,
    [20000_25000_КолВо] float,
    [25000_30000_КолВо] float,
    [30000_35000_КолВо] float,
    [35000_40000_КолВо] float,
    [40000_45000_КолВо] float,
    [45000_50000_КолВо] float,
    [>50000_КолВо] float
);

-- собираем список договоров для исключения из запроса
IF OBJECT_ID(''tempdb..#exc_contract'') IS NOT NULL DROP TABLE #exc_contract;
CREATE TABLE #exc_contract (id int)

declare @exc_contract_folder int = -1 
declare @reg int = (select Значение from stack.Константы where Имя = ''КОДРЕГИОНА'')

if @reg = 67
	begin 
		set @exc_contract_folder = 42086
	end

;WITH ContractHierarchy AS (
    SELECT 
        row_id,  
        папки,                
        CAST(row_id AS VARCHAR(MAX)) AS HierarchyPath,
        1 AS Level
    FROM stack.Договор
    WHERE row_id = @exc_contract_folder

    UNION ALL

    SELECT 
        c.row_id,
        c.папки,
        CAST(ch.HierarchyPath + '' -> '' + CAST(c.row_id AS VARCHAR(20)) AS VARCHAR(MAX)) AS HierarchyPath,
        ch.Level + 1
    FROM stack.Договор c
    INNER JOIN ContractHierarchy ch ON c.папки = ch.row_id
)
insert into #exc_contract
SELECT 
    d.row_id
FROM ContractHierarchy ch
join stack.Договор d on d.row_id = ch.ROW_ID
where d.Папки_ADD = 1

-- Создаем #service
IF OBJECT_ID(''tempdb..#service'') IS NOT NULL DROP TABLE #service;
CREATE TABLE #service (
    an46 NVARCHAR(256),
	heating NVARCHAR(10),
    string NVARCHAR(256)
);

INSERT INTO #service VALUES
(2101,''ОП'',''п. 1.4''), (2102,''ОП'',''п. 3.2''), (2103,''ОП'',''п. 4.3''), (2104,''ОП'',''п. 2.3''),
(2105,''ОП'',''п. 6.1''), (2106,''ОП'',''п. 5.1''), (2107,''ОП'',''п. 7.3''), (2108,''ОП'',''п. 8.1''),
(2109,''ОП'',''п. 9.4''), (2110,''ОП'',''п. 9.4''), (2111,''ОП'',''п. 9.4''), (2112,''ОП'',''п. 9.4''),
(2113,''ОП'',''п. 9.4''), (2114,''ОП'',''п. 9.4''), (2115,''ОП'',''п. 9.4''), (2116,''ОП'',''п. 9.4''),
(2201,''ОП'',''п. 1.6''), (2202,''ОП'',''п. 3.4''), (2203,''ОП'',''п. 8.4''), (2204,''ОП'',''п. 8.4''),
(2205,''ОП'',''п. 7.5''), (2206,''ОП'',''п. 2.5''), (2207,''ОП'',''п. 7.5''), (2208,''ОП'',''п. 5.5''),
(2301,''ОП'',''п. 9.2.2.1''), (2302,''ОП'',''п. 9.2.2.1''), (2303,''ОП'',''п. 9.2.2.1''), (2304,''ОП'',''п. 9.2.2.1''),
(2305,''ОП'',''п. 9.2.2.2''), (2306,''ОП'',''п. 9.2.2.2''), (2307,''ОП'',''п. 9.2.2.2''), (2308,''ОП'',''п. 9.2.2.2''),
(2309,''ОП'',''п. 9.2.2.2''), (2401,''ОП'',''п. 9.3.2''), (2402,''ОП'',''п. 9.3.2''), (2403,''ОП'',''п. 9.3.2''),
(2404,''ОП'',''п. 9.3.2''), (2601,''ОП'',''п. 9.5.2''), (2602,''ОП'',''п. 9.5.2''), (2603,''ОП'',''п. 9.5.2''),
(2604,''ОП'',''п. 9.5.2''),
(2101,''не ОП'',''п. 1.4''), (2102,''не ОП'',''п. 3.2''), (2103,''не ОП'',''п. 4.6''), (2104,''не ОП'',''п. 2.6''),
(2105,''не ОП'',''п. 6.1''), (2106,''не ОП'',''п. 5.2''), (2107,''не ОП'',''п. 7.6''), (2108,''не ОП'',''п. 8.1''),
(2109,''не ОП'',''п. 9.4''), (2110,''не ОП'',''п. 9.4''), (2111,''не ОП'',''п. 9.4''), (2112,''не ОП'',''п. 9.4''),
(2113,''не ОП'',''п. 9.4''), (2114,''не ОП'',''п. 9.4''), (2115,''не ОП'',''п. 9.4''), (2116,''не ОП'',''п. 9.4''),
(2201,''не ОП'',''п. 1.6''), (2202,''не ОП'',''п. 3.4''), (2203,''не ОП'',''п. 8.4''), (2204,''не ОП'',''п. 8.4''),
(2205,''не ОП'',''п. 7.8''), (2206,''не ОП'',''п. 2.8''), (2207,''не ОП'',''п. 7.8''), (2208,''не ОП'',''п. 5.8''),
(2301,''не ОП'',''п. 9.2.2.1''), (2302,''не ОП'',''п. 9.2.2.1''), (2303,''не ОП'',''п. 9.2.2.1''), (2304,''не ОП'',''п. 9.2.2.1''),
(2305,''не ОП'',''п. 9.2.2.3''), (2306,''не ОП'',''п. 9.2.2.3''), (2307,''не ОП'',''п. 9.2.2.3''), (2308,''не ОП'',''п. 9.2.2.3''),
(2309,''не ОП'',''п. 9.2.2.3''), (2401,''не ОП'',''п. 9.3.2''), (2402,''не ОП'',''п. 9.3.2''), (2403,''не ОП'',''п. 9.3.2''),
(2404,''не ОП'',''п. 9.3.2''), (2601,''не ОП'',''п. 9.5.2''), (2602,''не ОП'',''п. 9.5.2''), (2603,''не ОП'',''п. 9.5.2''),
(2604,''не ОП'',''п. 9.5.2''),
(2771,''ОП'',''п. 1.4''), (2772,''ОП'',''п. 2.3''), (2773,''ОП'',''п. 8.2''), (2774,''ОП'',''п. 6.2''),
(2771,''не ОП'',''п. 1.4''), (2772,''не ОП'',''п. 2.6''), (2773,''не ОП'',''п. 8.2''), (2774,''не ОП'',''п. 6.2''),
(2901,''не ОП'',''п. 9.6.2''), (2902,''не ОП'',''п. 9.6.2''), (2903,''не ОП'',''п. 9.6.2''), (2904,''не ОП'',''п. 9.6.2''),
(2901,''ОП'',''п. 9.6.2''), (2902,''ОП'',''п. 9.6.2''), (2903,''ОП'',''п. 9.6.2''), (2904,''ОП'',''п. 9.6.2'');

-- Объявляем переменную для цикла
DECLARE @current_month DATE = @month1;

-- Цикл по месяцам
WHILE @current_month <= @month2
BEGIN
    -- Вставляем данные за текущий месяц
    
    WITH 
    data_calc as(
        SELECT 
        Месяц, dog.Номер Договор,ls.Номер ТУ, anr.Аналитика1 Услуга, la.Код Ф46,k.[Название] Категория,
        isnull(sv.Значение,1) КолПомещ, iif(sv1.row_id is null,0,1) ОДН,
        -- Динамическое определение отопительного периода для каждой даты
        CASE 
            WHEN [Месяц] >= DATEFROMPARTS(IIF(MONTH([Месяц]) >= @start_month, YEAR([Месяц]), YEAR([Месяц]) - 1), @start_month, @start_day) 
             AND [Месяц] <  DATEFROMPARTS(IIF(MONTH([Месяц]) >= @start_month, YEAR([Месяц]), YEAR([Месяц]) - 1) + 1, @end_month, @end_day) 
            THEN ''ОП'' 
            ELSE ''не ОП'' 
        END AS heating,
        0 ОбъемПер, 0 СуммаПер,
        case when [Номер услуги] = anr.Аналитика1 then [Кол_во] else 0 end Объем,
        dns.[Сумма] Сумма
        FROM [stack].[Детализация расчета] dns
        JOIN [stack].[Аналитика расчета] anr on anr.ROW_ID = dns.[Расчет-Аналитика]
        join stack.Договор dog on dog.row_id = [Договор]
        join stack.[Лицевые счета] ls on ls.row_id = [Лицевой]
        join [stack].[Категории договоров] k on k.row_id = dog.[Категория-Договоры]
        join [stack].[Лицевых аналитики] la on la.ROW_ID = anr.Форма46
        left join stack.Свойства sv on sv.[Счет-Параметры] = ls.row_id AND @current_month BETWEEN sv.ДатНач AND sv.ДатКнц and sv.[Виды-Параметры] = @p1
        left join stack.Свойства sv1 on sv1.[Счет-Параметры] = ls.row_id AND @current_month BETWEEN sv1.ДатНач AND sv1.ДатКнц and sv1.[Виды-Параметры] = @p2
        where [Месяц] = @current_month and anr.Аналитика2%65536 in (8050,8060) and [ЗаМесяц] >= @startOfYear
        and dog.row_id not in (select id from #exc_contract)

        union all

        SELECT 
        Месяц, dog.Номер Договор,ls.Номер ТУ, anr.Аналитика1 Услуга, la.Код Ф46,k.[Название] Категория,
        isnull(sv.Значение,1) КолПомещ,iif(sv1.row_id is null,0,1) ОДН,
        -- Динамическое определение отопительного периода для каждой даты
        CASE 
            WHEN [Месяц] >= DATEFROMPARTS(IIF(MONTH([Месяц]) >= @start_month, YEAR([Месяц]), YEAR([Месяц]) - 1), @start_month, @start_day) 
             AND [Месяц] <  DATEFROMPARTS(IIF(MONTH([Месяц]) >= @start_month, YEAR([Месяц]), YEAR([Месяц]) - 1) + 1, @end_month, @end_day) 
            THEN ''ОП'' 
            ELSE ''не ОП'' 
        END AS heating,
        case when [Номер услуги] = anr.Аналитика1 then [Кол_во] else 0 end ОбъемПер, 
        dns.[Сумма] СуммаПер,
        0 Объем,
        0 Сумма
        FROM [stack].[Детализация расчета] dns
        JOIN [stack].[Аналитика расчета] anr on anr.ROW_ID = dns.[Расчет-Аналитика]
        join stack.Договор dog on dog.row_id = [Договор]
        join stack.[Лицевые счета] ls on ls.row_id = [Лицевой]
        join [stack].[Категории договоров] k on k.row_id = dog.[Категория-Договоры]
        join [stack].[Лицевых аналитики] la on la.ROW_ID = anr.Форма46
        left join stack.Свойства sv on sv.[Счет-Параметры] = ls.row_id AND @current_month BETWEEN sv.ДатНач AND sv.ДатКнц and sv.[Виды-Параметры] = @p1
        left join stack.Свойства sv1 on sv1.[Счет-Параметры] = ls.row_id AND @current_month BETWEEN sv1.ДатНач AND sv1.ДатКнц and sv1.[Виды-Параметры] = @p2
        where [Месяц] = @current_month and anr.Аналитика2%65536 in (8050,8060) and [ЗаМесяц] < @startOfYear
        and dog.row_id not in (select id from #exc_contract)

    ),
    data_d as(
        select Месяц, Договор, ТУ, Услуга, Ф46, Категория, d.heating, 
        isnull(s.string,''установить аналитику на ТУ'') string, 
        КолПомещ, ОДН, ОбъемПер, СуммаПер,
        Объем, Сумма
        from data_calc d
        left join #service s on s.an46 = d.Ф46 and s.heating = d.heating
    ),
    data_sum as(
        select ''ЮЛ'' БД, Месяц, Договор, ТУ, Услуга, Ф46, Категория, heating, КолПомещ,''МКД'' ТипПомещения,
        case when (Категория = ''УК, ТСЖ, ЖСК - Дельта ОДН'' or Категория = ''Население'' ) or ОДН = 1 then ''не заполняется'' else string end string,
        sum(ОбъемПер) ОбъемПер, 
        sum(СуммаПер) СуммаПер,
        sum(Объем) Объем, 
        sum(Сумма) Сумма
        from data_d
        group by Месяц, Договор, ТУ, Услуга, Ф46, Категория, heating, КолПомещ, ОДН, string
    ),
    -- Определяем диапазон для каждой записи на основе Объем/КолПомещ
    range_check as (
        SELECT 
            ds.*,
            CASE 
                WHEN ISNULL(ds.КолПомещ, 1) = 0 THEN 1  
                ELSE ds.Объем / ds.КолПомещ 
            END AS ОбъемНаПомещение,
            CASE 
                WHEN (ds.Объем / NULLIF(ds.КолПомещ, 0)) < 0 THEN ''<0''
                WHEN (ds.Объем / NULLIF(ds.КолПомещ, 0)) = 0 THEN ''0''
                WHEN (ds.Объем / NULLIF(ds.КолПомещ, 0)) > 0 AND (ds.Объем / NULLIF(ds.КолПомещ, 0)) <= 100 THEN ''0_100''
                WHEN (ds.Объем / NULLIF(ds.КолПомещ, 0)) > 100 AND (ds.Объем / NULLIF(ds.КолПомещ, 0)) <= 200 THEN ''100_200''
                WHEN (ds.Объем / NULLIF(ds.КолПомещ, 0)) > 200 AND (ds.Объем / NULLIF(ds.КолПомещ, 0)) <= 300 THEN ''200_300''
                WHEN (ds.Объем / NULLIF(ds.КолПомещ, 0)) > 300 AND (ds.Объем / NULLIF(ds.КолПомещ, 0)) <= 400 THEN ''300_400''
                WHEN (ds.Объем / NULLIF(ds.КолПомещ, 0)) > 400 AND (ds.Объем / NULLIF(ds.КолПомещ, 0)) <= 500 THEN ''400_500''
                WHEN (ds.Объем / NULLIF(ds.КолПомещ, 0)) > 500 AND (ds.Объем / NULLIF(ds.КолПомещ, 0)) <= 600 THEN ''500_600''
                WHEN (ds.Объем / NULLIF(ds.КолПомещ, 0)) > 600 AND (ds.Объем / NULLIF(ds.КолПомещ, 0)) <= 700 THEN ''600_700''
                WHEN (ds.Объем / NULLIF(ds.КолПомещ, 0)) > 700 AND (ds.Объем / NULLIF(ds.КолПомещ, 0)) <= 800 THEN ''700_800''
                WHEN (ds.Объем / NULLIF(ds.КолПомещ, 0)) > 800 AND (ds.Объем / NULLIF(ds.КолПомещ, 0)) <= 900 THEN ''800_900''
                WHEN (ds.Объем / NULLIF(ds.КолПомещ, 0)) > 900 AND (ds.Объем / NULLIF(ds.КолПомещ, 0)) <= 1000 THEN ''900_1000''
                WHEN (ds.Объем / NULLIF(ds.КолПомещ, 0)) > 1000 AND (ds.Объем / NULLIF(ds.КолПомещ, 0)) <= 2000 THEN ''1000_2000''
                WHEN (ds.Объем / NULLIF(ds.КолПомещ, 0)) > 2000 AND (ds.Объем / NULLIF(ds.КолПомещ, 0)) <= 3000 THEN ''2000_3000''
                WHEN (ds.Объем / NULLIF(ds.КолПомещ, 0)) > 3000 AND (ds.Объем / NULLIF(ds.КолПомещ, 0)) <= 4000 THEN ''3000_4000''
                WHEN (ds.Объем / NULLIF(ds.КолПомещ, 0)) > 4000 AND (ds.Объем / NULLIF(ds.КолПомещ, 0)) <= 5000 THEN ''4000_5000''
                WHEN (ds.Объем / NULLIF(ds.КолПомещ, 0)) > 5000 AND (ds.Объем / NULLIF(ds.КолПомещ, 0)) <= 10000 THEN ''5000_10000''
                WHEN (ds.Объем / NULLIF(ds.КолПомещ, 0)) > 10000 AND (ds.Объем / NULLIF(ds.КолПомещ, 0)) <= 15000 THEN ''10000_15000''
                WHEN (ds.Объем / NULLIF(ds.КолПомещ, 0)) > 15000 AND (ds.Объем / NULLIF(ds.КолПомещ, 0)) <= 20000 THEN ''15000_20000''
                WHEN (ds.Объем / NULLIF(ds.КолПомещ, 0)) > 20000 AND (ds.Объем / NULLIF(ds.КолПомещ, 0)) <= 25000 THEN ''20000_25000''
                WHEN (ds.Объем / NULLIF(ds.КолПомещ, 0)) > 25000 AND (ds.Объем / NULLIF(ds.КолПомещ, 0)) <= 30000 THEN ''25000_30000''
                WHEN (ds.Объем / NULLIF(ds.КолПомещ, 0)) > 30000 AND (ds.Объем / NULLIF(ds.КолПомещ, 0)) <= 35000 THEN ''30000_35000''
                WHEN (ds.Объем / NULLIF(ds.КолПомещ, 0)) > 35000 AND (ds.Объем / NULLIF(ds.КолПомещ, 0)) <= 40000 THEN ''35000_40000''
                WHEN (ds.Объем / NULLIF(ds.КолПомещ, 0)) > 40000 AND (ds.Объем / NULLIF(ds.КолПомещ, 0)) <= 45000 THEN ''40000_45000''
                WHEN (ds.Объем / NULLIF(ds.КолПомещ, 0)) > 45000 AND (ds.Объем / NULLIF(ds.КолПомещ, 0)) <= 50000 THEN ''45000_50000''
                WHEN (ds.Объем / NULLIF(ds.КолПомещ, 0)) > 50000 THEN ''>50000''
            END AS range_name
        FROM data_sum ds
        WHERE ds.Объем <> 0 OR ds.ОбъемПер <> 0
    ),
    base_agg as (
        SELECT 
            rc.БД, rc.Месяц, rc.Договор, rc.ТУ, rc.Услуга, rc.Ф46, rc.Категория, 
            rc.heating as Отоп, rc.КолПомещ, rc.ТипПомещения, rc.string as Строка_таблицы,
            rc.ОбъемПер, round(rc.СуммаПер,2) СуммаПер,
            rc.Объем, rc.Сумма,
            -- Объемы по диапазонам
            MAX(CASE WHEN rc.range_name = ''<0'' THEN rc.Объем ELSE 0 END) AS [<0_Объем],
            MAX(CASE WHEN rc.range_name = ''0'' THEN rc.Объем ELSE 0 END) AS [0_Объем],
            MAX(CASE WHEN rc.range_name = ''0_100'' THEN rc.Объем ELSE 0 END) AS [0_100_Объем],
            MAX(CASE WHEN rc.range_name = ''100_200'' THEN rc.Объем ELSE 0 END) AS [100_200_Объем],
            MAX(CASE WHEN rc.range_name = ''200_300'' THEN rc.Объем ELSE 0 END) AS [200_300_Объем],
            MAX(CASE WHEN rc.range_name = ''300_400'' THEN rc.Объем ELSE 0 END) AS [300_400_Объем],
            MAX(CASE WHEN rc.range_name = ''400_500'' THEN rc.Объем ELSE 0 END) AS [400_500_Объем],
            MAX(CASE WHEN rc.range_name = ''500_600'' THEN rc.Объем ELSE 0 END) AS [500_600_Объем],
            MAX(CASE WHEN rc.range_name = ''600_700'' THEN rc.Объем ELSE 0 END) AS [600_700_Объем],
            MAX(CASE WHEN rc.range_name = ''700_800'' THEN rc.Объем ELSE 0 END) AS [700_800_Объем],
            MAX(CASE WHEN rc.range_name = ''800_900'' THEN rc.Объем ELSE 0 END) AS [800_900_Объем],
            MAX(CASE WHEN rc.range_name = ''900_1000'' THEN rc.Объем ELSE 0 END) AS [900_1000_Объем],
            MAX(CASE WHEN rc.range_name = ''1000_2000'' THEN rc.Объем ELSE 0 END) AS [1000_2000_Объем],
            MAX(CASE WHEN rc.range_name = ''2000_3000'' THEN rc.Объем ELSE 0 END) AS [2000_3000_Объем],
            MAX(CASE WHEN rc.range_name = ''3000_4000'' THEN rc.Объем ELSE 0 END) AS [3000_4000_Объем],
            MAX(CASE WHEN rc.range_name = ''4000_5000'' THEN rc.Объем ELSE 0 END) AS [4000_5000_Объем],
            MAX(CASE WHEN rc.range_name = ''5000_10000'' THEN rc.Объем ELSE 0 END) AS [5000_10000_Объем],
            MAX(CASE WHEN rc.range_name = ''10000_15000'' THEN rc.Объем ELSE 0 END) AS [10000_15000_Объем],
            MAX(CASE WHEN rc.range_name = ''15000_20000'' THEN rc.Объем ELSE 0 END) AS [15000_20000_Объем],
            MAX(CASE WHEN rc.range_name = ''20000_25000'' THEN rc.Объем ELSE 0 END) AS [20000_25000_Объем],
            MAX(CASE WHEN rc.range_name = ''25000_30000'' THEN rc.Объем ELSE 0 END) AS [25000_30000_Объем],
            MAX(CASE WHEN rc.range_name = ''30000_35000'' THEN rc.Объем ELSE 0 END) AS [30000_35000_Объем],
            MAX(CASE WHEN rc.range_name = ''35000_40000'' THEN rc.Объем ELSE 0 END) AS [35000_40000_Объем],
            MAX(CASE WHEN rc.range_name = ''40000_45000'' THEN rc.Объем ELSE 0 END) AS [40000_45000_Объем],
            MAX(CASE WHEN rc.range_name = ''45000_50000'' THEN rc.Объем ELSE 0 END) AS [45000_50000_Объем],
            MAX(CASE WHEN rc.range_name = ''>50000'' THEN rc.Объем ELSE 0 END) AS [>50000_Объем],
            -- Количества по диапазонам
            MAX(CASE WHEN rc.range_name = ''<0'' THEN rc.КолПомещ ELSE 0 END) AS [<0_КолВо],
            MAX(CASE WHEN rc.range_name = ''0'' THEN rc.КолПомещ ELSE 0 END) AS [0_КолВо],
            MAX(CASE WHEN rc.range_name = ''0_100'' THEN rc.КолПомещ ELSE 0 END) AS [0_100_КолВо],
            MAX(CASE WHEN rc.range_name = ''100_200'' THEN rc.КолПомещ ELSE 0 END) AS [100_200_КолВо],
            MAX(CASE WHEN rc.range_name = ''200_300'' THEN rc.КолПомещ ELSE 0 END) AS [200_300_КолВо],
            MAX(CASE WHEN rc.range_name = ''300_400'' THEN rc.КолПомещ ELSE 0 END) AS [300_400_КолВо],
            MAX(CASE WHEN rc.range_name = ''400_500'' THEN rc.КолПомещ ELSE 0 END) AS [400_500_КолВо],
            MAX(CASE WHEN rc.range_name = ''500_600'' THEN rc.КолПомещ ELSE 0 END) AS [500_600_КолВо],
            MAX(CASE WHEN rc.range_name = ''600_700'' THEN rc.КолПомещ ELSE 0 END) AS [600_700_КолВо],
            MAX(CASE WHEN rc.range_name = ''700_800'' THEN rc.КолПомещ ELSE 0 END) AS [700_800_КолВо],
            MAX(CASE WHEN rc.range_name = ''800_900'' THEN rc.КолПомещ ELSE 0 END) AS [800_900_КолВо],
            MAX(CASE WHEN rc.range_name = ''900_1000'' THEN rc.КолПомещ ELSE 0 END) AS [900_1000_КолВо],
            MAX(CASE WHEN rc.range_name = ''1000_2000'' THEN rc.КолПомещ ELSE 0 END) AS [1000_2000_КолВо],
            MAX(CASE WHEN rc.range_name = ''2000_3000'' THEN rc.КолПомещ ELSE 0 END) AS [2000_3000_КолВо],
            MAX(CASE WHEN rc.range_name = ''3000_4000'' THEN rc.КолПомещ ELSE 0 END) AS [3000_4000_КолВо],
            MAX(CASE WHEN rc.range_name = ''4000_5000'' THEN rc.КолПомещ ELSE 0 END) AS [4000_5000_КолВо],
            MAX(CASE WHEN rc.range_name = ''5000_10000'' THEN rc.КолПомещ ELSE 0 END) AS [5000_10000_КолВо],
            MAX(CASE WHEN rc.range_name = ''10000_15000'' THEN rc.КолПомещ ELSE 0 END) AS [10000_15000_КолВо],
            MAX(CASE WHEN rc.range_name = ''15000_20000'' THEN rc.КолПомещ ELSE 0 END) AS [15000_20000_КолВо],
            MAX(CASE WHEN rc.range_name = ''20000_25000'' THEN rc.КолПомещ ELSE 0 END) AS [20000_25000_КолВо],
            MAX(CASE WHEN rc.range_name = ''25000_30000'' THEN rc.КолПомещ ELSE 0 END) AS [25000_30000_КолВо],
            MAX(CASE WHEN rc.range_name = ''30000_35000'' THEN rc.КолПомещ ELSE 0 END) AS [30000_35000_КолВо],
            MAX(CASE WHEN rc.range_name = ''35000_40000'' THEN rc.КолПомещ ELSE 0 END) AS [35000_40000_КолВо],
            MAX(CASE WHEN rc.range_name = ''40000_45000'' THEN rc.КолПомещ ELSE 0 END) AS [40000_45000_КолВо],
            MAX(CASE WHEN rc.range_name = ''45000_50000'' THEN rc.КолПомещ ELSE 0 END) AS [45000_50000_КолВо],
            MAX(CASE WHEN rc.range_name = ''>50000'' THEN rc.КолПомещ ELSE 0 END) AS [>50000_КолВо]
        FROM range_check rc
        GROUP BY rc.БД, rc.Месяц, rc.Договор, rc.ТУ, rc.Услуга, rc.Ф46, rc.Категория, rc.heating, 
            rc.КолПомещ, rc.ТипПомещения, rc.string, rc.ОбъемПер, rc.СуммаПер, rc.Объем, rc.Сумма
    )
	INSERT INTO #result
    SELECT 
        БД, Месяц, Услуга, Ф46, Категория, Отоп, 
        SUM(КолПомещ) КолПомещ, ТипПомещения, Строка_таблицы,
        SUM(ОбъемПер) as ОбъемПер,
        ROUND(SUM(СуммаПер), 2) as СуммаПер,
        SUM(Объем) as Объем,
        ROUND(SUM(Сумма), 2) as Сумма,
        SUM([<0_Объем]) AS [<0_Объем],
        SUM([0_Объем]) AS [0_Объем],
        SUM([0_100_Объем]) AS [0_100_Объем],
        SUM([100_200_Объем]) AS [100_200_Объем],
        SUM([200_300_Объем]) AS [200_300_Объем],
        SUM([300_400_Объем]) AS [300_400_Объем],
        SUM([400_500_Объем]) AS [400_500_Объем],
        SUM([500_600_Объем]) AS [500_600_Объем],
        SUM([600_700_Объем]) AS [600_700_Объем],
        SUM([700_800_Объем]) AS [700_800_Объем],
        SUM([800_900_Объем]) AS [800_900_Объем],
        SUM([900_1000_Объем]) AS [900_1000_Объем],
        SUM([1000_2000_Объем]) AS [1000_2000_Объем],
        SUM([2000_3000_Объем]) AS [2000_3000_Объем],
        SUM([3000_4000_Объем]) AS [3000_4000_Объем],
        SUM([4000_5000_Объем]) AS [4000_5000_Объем],
        SUM([5000_10000_Объем]) AS [5000_10000_Объем],
        SUM([10000_15000_Объем]) AS [10000_15000_Объем],
        SUM([15000_20000_Объем]) AS [15000_20000_Объем],
        SUM([20000_25000_Объем]) AS [20000_25000_Объем],
        SUM([25000_30000_Объем]) AS [25000_30000_Объем],
        SUM([30000_35000_Объем]) AS [30000_35000_Объем],
        SUM([35000_40000_Объем]) AS [35000_40000_Объем],
        SUM([40000_45000_Объем]) AS [40000_45000_Объем],
        SUM([45000_50000_Объем]) AS [45000_50000_Объем],
        SUM([>50000_Объем]) AS [>50000_Объем],
        SUM([<0_КолВо]) AS [<0_КолВо],
        SUM([0_КолВо]) AS [0_КолВо],
        SUM([0_100_КолВо]) AS [0_100_КолВо],
        SUM([100_200_КолВо]) AS [100_200_КолВо],
        SUM([200_300_КолВо]) AS [200_300_КолВо],
        SUM([300_400_КолВо]) AS [300_400_КолВо],
        SUM([400_500_КолВо]) AS [400_500_КолВо],
        SUM([500_600_КолВо]) AS [500_600_КолВо],
        SUM([600_700_КолВо]) AS [600_700_КолВо],
        SUM([700_800_КолВо]) AS [700_800_КолВо],
        SUM([800_900_КолВо]) AS [800_900_КолВо],
        SUM([900_1000_КолВо]) AS [900_1000_КолВо],
        SUM([1000_2000_КолВо]) AS [1000_2000_КолВо],
        SUM([2000_3000_КолВо]) AS [2000_3000_КолВо],
        SUM([3000_4000_КолВо]) AS [3000_4000_КолВо],
        SUM([4000_5000_КолВо]) AS [4000_5000_КолВо],
        SUM([5000_10000_КолВо]) AS [5000_10000_КолВо],
        SUM([10000_15000_КолВо]) AS [10000_15000_КолВо],
        SUM([15000_20000_КолВо]) AS [15000_20000_КолВо],
        SUM([20000_25000_КолВо]) AS [20000_25000_КолВо],
        SUM([25000_30000_КолВо]) AS [25000_30000_КолВо],
        SUM([30000_35000_КолВо]) AS [30000_35000_КолВо],
        SUM([35000_40000_КолВо]) AS [35000_40000_КолВо],
        SUM([40000_45000_КолВо]) AS [40000_45000_КолВо],
        SUM([45000_50000_КолВо]) AS [45000_50000_КолВо],
        SUM([>50000_КолВо]) AS [>50000_КолВо]
    FROM base_agg
    GROUP BY БД, Месяц, Услуга, Ф46, Категория, Отоп, ТипПомещения, Строка_таблицы;

    -- Переходим к следующему месяцу
    SET @current_month = DATEADD(MONTH, 1, @current_month);
END

-- Выводим результат за весь период
SELECT
    БД, FORMAT(Месяц, ''yyyy [MM] MMMM'', ''ru'') Месяц, Услуга, Ф46, Категория, Отоп, 
    КолПомещ, ТипПомещения, Строка_таблицы,
    ОбъемПер, СуммаПер, Объем, Сумма,
    [<0_Объем], [0_Объем], [0_100_Объем], [100_200_Объем], [200_300_Объем], [300_400_Объем], 
    [400_500_Объем], [500_600_Объем], [600_700_Объем], [700_800_Объем], [800_900_Объем], [900_1000_Объем],
    [1000_2000_Объем], [2000_3000_Объем], [3000_4000_Объем], [4000_5000_Объем], [5000_10000_Объем],
    [10000_15000_Объем], [15000_20000_Объем], [20000_25000_Объем], [25000_30000_Объем], [30000_35000_Объем],
    [35000_40000_Объем], [40000_45000_Объем], [45000_50000_Объем], [>50000_Объем],
    [<0_КолВо], [0_КолВо], [0_100_КолВо], [100_200_КолВо], [200_300_КолВо], [300_400_КолВо],
    [400_500_КолВо], [500_600_КолВо], [600_700_КолВо], [700_800_КолВо], [800_900_КолВо], [900_1000_КолВо],
    [1000_2000_КолВо], [2000_3000_КолВо], [3000_4000_КолВо], [4000_5000_КолВо], [5000_10000_КолВо],
    [10000_15000_КолВо], [15000_20000_КолВо], [20000_25000_КолВо], [25000_30000_КолВо], [30000_35000_КолВо],
    [35000_40000_КолВо], [40000_45000_КолВо], [45000_50000_КолВо], [>50000_КолВо]
FROM #result
ORDER BY БД, Месяц, Услуга, Ф46, Категория, Отоп, ТипПомещения, Строка_таблицы;
' AS query_text, CAST(N'{"fields":{"pivot":[{"dataField":"Месяц","area":"row","expanded":true},{"caption":"Филиал","dataField":"Филиал","area":"row","expanded":true},{"dataField":"Строка_таблицы","area":"row","expanded":true},{"dataField":"Категория","area":"row","expanded":true},{"dataField":"Отчет","area":"column"},{"dataField":"Услуга","area":"filter"},{"dataField":"Ф46","area":"filter"},{"caption":"Отопление","dataField":"Отоп","area":"filter"},{"dataField":"КолПомещ","area":"filter"},{"dataField":"ТипПомещения","area":"filter"},{"dataField":"Сумма","caption":"Сумма","dataType":"number","summaryType":"sum","format":{"type":"fixedPoint","precision":2},"area":"data","allowCrossGroupCalculation":true},{"dataField":"СуммаПер","caption":"Сумма Перерасчетов","dataType":"number","summaryType":"sum","format":{"type":"fixedPoint","precision":2},"area":"data","allowCrossGroupCalculation":true},{"dataField":"Объем","caption":"Объем","dataType":"number","summaryType":"sum","format":{"type":"fixedPoint","precision":3},"area":"data","allowCrossGroupCalculation":true},{"dataField":"ОбъемПер","caption":"Объем Перерасчетов","dataType":"number","summaryType":"sum","format":{"type":"fixedPoint","precision":3},"area":"data","allowCrossGroupCalculation":true},{"dataField":"<0_Объем","caption":"<0_Объем","dataType":"number","summaryType":"sum","format":{"type":"fixedPoint","precision":3},"area":"data","allowCrossGroupCalculation":true},{"dataField":"0_Объем","caption":"0_Объем","dataType":"number","summaryType":"sum","format":{"type":"fixedPoint","precision":3},"area":"data","allowCrossGroupCalculation":true},{"dataField":"0_100_Объем","caption":"0-100 Объем","dataType":"number","summaryType":"sum","format":{"type":"fixedPoint","precision":3},"area":"data","allowCrossGroupCalculation":true},{"dataField":"100_200_Объем","caption":"100-200 Объем","dataType":"number","summaryType":"sum","format":{"type":"fixedPoint","precision":3},"area":"data","allowCrossGroupCalculation":true},{"dataField":"200_300_Объем","caption":"200-300 Объем","dataType":"number","summaryType":"sum","format":{"type":"fixedPoint","precision":3},"area":"data","allowCrossGroupCalculation":true},{"dataField":"300_400_Объем","caption":"300-400 Объем","dataType":"number","summaryType":"sum","format":{"type":"fixedPoint","precision":3},"area":"data","allowCrossGroupCalculation":true},{"dataField":"400_500_Объем","caption":"400-500 Объем","dataType":"number","summaryType":"sum","format":{"type":"fixedPoint","precision":3},"area":"data","allowCrossGroupCalculation":true},{"dataField":"500_600_Объем","caption":"500-600 Объем","dataType":"number","summaryType":"sum","format":{"type":"fixedPoint","precision":3},"area":"data","allowCrossGroupCalculation":true},{"dataField":"600_700_Объем","caption":"600-700 Объем","dataType":"number","summaryType":"sum","format":{"type":"fixedPoint","precision":3},"area":"data","allowCrossGroupCalculation":true},{"dataField":"700_800_Объем","caption":"700-800 Объем","dataType":"number","summaryType":"sum","format":{"type":"fixedPoint","precision":3},"area":"data","allowCrossGroupCalculation":true},{"dataField":"800_900_Объем","caption":"800-900 Объем","dataType":"number","summaryType":"sum","format":{"type":"fixedPoint","precision":3},"area":"data","allowCrossGroupCalculation":true},{"dataField":"900_1000_Объем","caption":"900-1000 Объем","dataType":"number","summaryType":"sum","format":{"type":"fixedPoint","precision":3},"area":"data","allowCrossGroupCalculation":true},{"dataField":"1000_2000_Объем","caption":"1000-2000 Объем","dataType":"number","summaryType":"sum","format":{"type":"fixedPoint","precision":3},"area":"data","allowCrossGroupCalculation":true},{"dataField":"2000_3000_Объем","caption":"2000-3000 Объем","dataType":"number","summaryType":"sum","format":{"type":"fixedPoint","precision":3},"area":"data","allowCrossGroupCalculation":true},{"dataField":"3000_4000_Объем","caption":"3000-4000 Объем","dataType":"number","summaryType":"sum","format":{"type":"fixedPoint","precision":3},"area":"data","allowCrossGroupCalculation":true},{"dataField":"4000_5000_Объем","caption":"4000-5000 Объем","dataType":"number","summaryType":"sum","format":{"type":"fixedPoint","precision":3},"area":"data","allowCrossGroupCalculation":true},{"dataField":"5000_10000_Объем","caption":"5000-10000 Объем","dataType":"number","summaryType":"sum","format":{"type":"fixedPoint","precision":3},"area":"data","allowCrossGroupCalculation":true},{"dataField":"10000_15000_Объем","caption":"10000-15000 Объем","dataType":"number","summaryType":"sum","format":{"type":"fixedPoint","precision":3},"area":"data","allowCrossGroupCalculation":true},{"dataField":"15000_20000_Объем","caption":"15000-20000 Объем","dataType":"number","summaryType":"sum","format":{"type":"fixedPoint","precision":3},"area":"data","allowCrossGroupCalculation":true},{"dataField":"20000_25000_Объем","caption":"20000-25000 Объем","dataType":"number","summaryType":"sum","format":{"type":"fixedPoint","precision":3},"area":"data","allowCrossGroupCalculation":true},{"dataField":"25000_30000_Объем","caption":"25000-30000 Объем","dataType":"number","summaryType":"sum","format":{"type":"fixedPoint","precision":3},"area":"data","allowCrossGroupCalculation":true},{"dataField":"30000_35000_Объем","caption":"30000-35000 Объем","dataType":"number","summaryType":"sum","format":{"type":"fixedPoint","precision":3},"area":"data","allowCrossGroupCalculation":true},{"dataField":"35000_40000_Объем","caption":"35000-40000 Объем","dataType":"number","summaryType":"sum","format":{"type":"fixedPoint","precision":3},"area":"data","allowCrossGroupCalculation":true},{"dataField":"40000_45000_Объем","caption":"40000-45000 Объем","dataType":"number","summaryType":"sum","format":{"type":"fixedPoint","precision":3},"area":"data","allowCrossGroupCalculation":true},{"dataField":"45000_50000_Объем","caption":"45000-50000 Объем","dataType":"number","summaryType":"sum","format":{"type":"fixedPoint","precision":3},"area":"data","allowCrossGroupCalculation":true},{"dataField":">50000_Объем","caption":">50000 Объем","dataType":"number","summaryType":"sum","format":{"type":"fixedPoint","precision":3},"area":"data","allowCrossGroupCalculation":true},{"dataField":"<0_КолВо","caption":"<0 Кол-во ЛС","dataType":"number","summaryType":"sum","format":{"type":"fixedPoint","precision":0},"area":"data","allowCrossGroupCalculation":true},{"dataField":"0_КолВо","caption":"0 Кол-во ЛС","dataType":"number","summaryType":"sum","format":{"type":"fixedPoint","precision":0},"area":"data","allowCrossGroupCalculation":true},{"dataField":"0_100_КолВо","caption":"0-100 Кол-во ЛС","dataType":"number","summaryType":"sum","format":{"type":"fixedPoint","precision":0},"area":"data","allowCrossGroupCalculation":true},{"dataField":"100_200_КолВо","caption":"100-200 Кол-во ЛС","dataType":"number","summaryType":"sum","format":{"type":"fixedPoint","precision":0},"area":"data","allowCrossGroupCalculation":true},{"dataField":"200_300_КолВо","caption":"200-300 Кол-во ЛС","dataType":"number","summaryType":"sum","format":{"type":"fixedPoint","precision":0},"area":"data","allowCrossGroupCalculation":true},{"dataField":"300_400_КолВо","caption":"300-400 Кол-во ЛС","dataType":"number","summaryType":"sum","format":{"type":"fixedPoint","precision":0},"area":"data","allowCrossGroupCalculation":true},{"dataField":"400_500_КолВо","caption":"400-500 Кол-во ЛС","dataType":"number","summaryType":"sum","format":{"type":"fixedPoint","precision":0},"area":"data","allowCrossGroupCalculation":true},{"dataField":"500_600_КолВо","caption":"500-600 Кол-во ЛС","dataType":"number","summaryType":"sum","format":{"type":"fixedPoint","precision":0},"area":"data","allowCrossGroupCalculation":true},{"dataField":"600_700_КолВо","caption":"600-700 Кол-во ЛС","dataType":"number","summaryType":"sum","format":{"type":"fixedPoint","precision":0},"area":"data","allowCrossGroupCalculation":true},{"dataField":"700_800_КолВо","caption":"700-800 Кол-во ЛС","dataType":"number","summaryType":"sum","format":{"type":"fixedPoint","precision":0},"area":"data","allowCrossGroupCalculation":true},{"dataField":"800_900_КолВо","caption":"800-900 Кол-во ЛС","dataType":"number","summaryType":"sum","format":{"type":"fixedPoint","precision":0},"area":"data","allowCrossGroupCalculation":true},{"dataField":"900_1000_КолВо","caption":"900-1000 Кол-во ЛС","dataType":"number","summaryType":"sum","format":{"type":"fixedPoint","precision":0},"area":"data","allowCrossGroupCalculation":true},{"dataField":"1000_2000_КолВо","caption":"1000-2000 Кол-во ЛС","dataType":"number","summaryType":"sum","format":{"type":"fixedPoint","precision":0},"area":"data","allowCrossGroupCalculation":true},{"dataField":"2000_3000_КолВо","caption":"2000-3000 Кол-во ЛС","dataType":"number","summaryType":"sum","format":{"type":"fixedPoint","precision":0},"area":"data","allowCrossGroupCalculation":true},{"dataField":"3000_4000_КолВо","caption":"3000-4000 Кол-во ЛС","dataType":"number","summaryType":"sum","format":{"type":"fixedPoint","precision":0},"area":"data","allowCrossGroupCalculation":true},{"dataField":"4000_5000_КолВо","caption":"4000-5000 Кол-во ЛС","dataType":"number","summaryType":"sum","format":{"type":"fixedPoint","precision":0},"area":"data","allowCrossGroupCalculation":true},{"dataField":"5000_10000_КолВо","caption":"5000-10000 Кол-во ЛС","dataType":"number","summaryType":"sum","format":{"type":"fixedPoint","precision":0},"area":"data","allowCrossGroupCalculation":true},{"dataField":"10000_15000_КолВо","caption":"10000-15000 Кол-во ЛС","dataType":"number","summaryType":"sum","format":{"type":"fixedPoint","precision":0},"area":"data","allowCrossGroupCalculation":true},{"dataField":"15000_20000_КолВо","caption":"15000-20000 Кол-во ЛС","dataType":"number","summaryType":"sum","format":{"type":"fixedPoint","precision":0},"area":"data","allowCrossGroupCalculation":true},{"dataField":"20000_25000_КолВо","caption":"20000-25000 Кол-во ЛС","dataType":"number","summaryType":"sum","format":{"type":"fixedPoint","precision":0},"area":"data","allowCrossGroupCalculation":true},{"dataField":"25000_30000_КолВо","caption":"25000-30000 Кол-во ЛС","dataType":"number","summaryType":"sum","format":{"type":"fixedPoint","precision":0},"area":"data","allowCrossGroupCalculation":true},{"dataField":"30000_35000_КолВо","caption":"30000-35000 Кол-во ЛС","dataType":"number","summaryType":"sum","format":{"type":"fixedPoint","precision":0},"area":"data","allowCrossGroupCalculation":true},{"dataField":"35000_40000_КолВо","caption":"35000-40000 Кол-во ЛС","dataType":"number","summaryType":"sum","format":{"type":"fixedPoint","precision":0},"area":"data","allowCrossGroupCalculation":true},{"dataField":"40000_45000_КолВо","caption":"40000-45000 Кол-во ЛС","dataType":"number","summaryType":"sum","format":{"type":"fixedPoint","precision":0},"area":"data","allowCrossGroupCalculation":true},{"dataField":"45000_50000_КолВо","caption":"45000-50000 Кол-во ЛС","dataType":"number","summaryType":"sum","format":{"type":"fixedPoint","precision":0},"area":"data","allowCrossGroupCalculation":true},{"dataField":">50000_КолВо","caption":">50000 Кол-во ЛС","dataType":"number","summaryType":"sum","format":{"type":"fixedPoint","precision":0},"area":"data","allowCrossGroupCalculation":true}],"grid":[{"caption":"Филиал","dataField":"Филиал","groupIndex":0},{"dataField":"Месяц","groupIndex":1},{"dataField":"Услуга"},{"dataField":"Ф46"},{"dataField":"Категория"},{"dataField":"Отоп"},{"dataField":"КолПомещ"},{"dataField":"ТипПомещения"},{"dataField":"Строка_таблицы"},{"dataField":"ОбъемПер"},{"dataField":"СуммаПер"},{"dataField":"<0_Объем"},{"dataField":"0_Объем"},{"dataField":"0_100_Объем"},{"dataField":"100_200_Объем"},{"dataField":"200_300_Объем"},{"dataField":"300_400_Объем"},{"dataField":"400_500_Объем"},{"dataField":"500_600_Объем"},{"dataField":"600_700_Объем"},{"dataField":"700_800_Объем"},{"dataField":"800_900_Объем"},{"dataField":"900_1000_Объем"},{"dataField":"1000_2000_Объем"},{"dataField":"2000_3000_Объем"},{"dataField":"3000_4000_Объем"},{"dataField":"4000_5000_Объем"},{"dataField":"5000_10000_Объем"},{"dataField":"10000_15000_Объем"},{"dataField":"15000_20000_Объем"},{"dataField":"20000_25000_Объем"},{"dataField":"25000_30000_Объем"},{"dataField":"30000_35000_Объем"},{"dataField":"35000_40000_Объем"},{"dataField":"40000_45000_Объем"},{"dataField":"45000_50000_Объем"},{"dataField":">50000_Объем"},{"dataField":"<0_КолВо"},{"dataField":"0_КолВо"},{"dataField":"0_100_КолВо"},{"dataField":"100_200_КолВо"},{"dataField":"200_300_КолВо"},{"dataField":"300_400_КолВо"},{"dataField":"400_500_КолВо"},{"dataField":"500_600_КолВо"},{"dataField":"600_700_КолВо"},{"dataField":"700_800_КолВо"},{"dataField":"800_900_КолВо"},{"dataField":"900_1000_КолВо"},{"dataField":"1000_2000_КолВо"},{"dataField":"2000_3000_КолВо"},{"dataField":"3000_4000_КолВо"},{"dataField":"4000_5000_КолВо"},{"dataField":"5000_10000_КолВо"},{"dataField":"10000_15000_КолВо"},{"dataField":"15000_20000_КолВо"},{"dataField":"20000_25000_КолВо"},{"dataField":"25000_30000_КолВо"},{"dataField":"30000_35000_КолВо"},{"dataField":"35000_40000_КолВо"},{"dataField":"40000_45000_КолВо"},{"dataField":"45000_50000_КолВо"},{"dataField":">50000_КолВо"}],"chart":{}},"filters":{"БД_ЮЛ":[],"ПериодМесяцы":{}},"views":["pivot"],"processing":"server-multi","description":"ЮЛ ФАС (Итоги)","mandatory":["БД_ЮЛ"]}' AS NVARCHAR(MAX)) AS config, 0 AS is_section, 3 AS sort_order) AS src
   ON target.report_key = src.report_key
WHEN MATCHED THEN UPDATE SET title = src.title, icon = src.icon, image = src.image,
    query_text = src.query_text, config = src.config, parent_id = src.parent_id,
    is_section = src.is_section, sort_order = src.sort_order, is_deleted = 0,
    updated_at = SYSUTCDATETIME()
WHEN NOT MATCHED THEN INSERT (report_key, parent_id, title, icon, image, query_text,
    config, is_section, sort_order)
    VALUES (src.report_key, src.parent_id, src.title, src.icon, src.image,
    src.query_text, src.config, src.is_section, src.sort_order);
GO
MERGE dbo.reports AS target
USING (SELECT N'RPT_1101' AS report_key, (SELECT id FROM dbo.reports WHERE report_key = N'КТР') AS parent_id, N'КТР сводный отчет за период' AS title, N'chart' AS icon, N'' AS image, N'
SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED
SET NOCOUNT ON;
DECLARE @dstart DATE={ПериодМесяцы_start};
DECLARE @dfinish DATE={ПериодМесяцы_end};
--DECLARE @parent VARCHAR(MAX) = ''{ФОНД}'';

IF OBJECT_ID(''tempdb..#parent_ids'') IS NOT NULL
    DROP TABLE #parent_ids;

DECLARE @xml XML = CAST(''<i>'' + REPLACE(''{ФОНД}'', '','', ''</i><i>'') + ''</i>'' AS XML);
-- Создаем временную таблицу с ID родителей
SELECT t.value(''.'', ''INT'') AS Родитель INTO #parent_ids FROM @xml.nodes(''i'') AS x(t);
--JOIN ( SELECT DISTINCT Потомок FROM [stack].[Лицевые иерархия] WHERE ПотомокТип = 5 AND Родитель IN (SELECT Родитель FROM #parent_ids) ) li ON li.Потомок=ls.ROW_ID

WITH AreaLS AS (
	SELECT ls.ROW_ID Счет, ls.Тип, ls.Номер
	FROM stack.[Лицевые счета] ls
        JOIN ( SELECT DISTINCT Потомок FROM [stack].[Лицевые иерархия] WHERE ПотомокТип = 5 AND Родитель IN (SELECT Родитель FROM #parent_ids) ) li ON li.Потомок=ls.ROW_ID
),
ParamData AS (
    SELECT ls.Счет,	
        MAX(CASE WHEN vp.Название = ''СОСТОЯНИЕ'' THEN ISNULL(sv.Значение,-1) END) AS [СОСТОЯНИЕ],
    	MAX(CASE WHEN vp.Название = ''СОСТОЯНИЕ'' THEN sv.ДатНач END) AS [НАЧАЛО],
    	MAX(CASE WHEN vp.Название = ''СОСТОЯНИЕ'' THEN sv.ДатКнц END) AS [ОКОНЧАНИЕ],
	MAX(CASE WHEN vp.Название = ''ГОР_СЕЛО'' THEN ISNULL(sv.Значение,-1) END) AS [ГОР_СЕЛО],
        MAX(CASE WHEN vp.Название = ''ТИПСТРОЙ'' THEN ISNULL(sv.Значение,-1) END) AS [ТИПСТРОЙ],
        MAX(CASE WHEN vp.Название = ''ТИППЛИТЫ'' THEN ISNULL(sv.Значение,-1) END) AS [ТИППЛИТЫ],
        MAX(CASE WHEN vp.Название = ''ТИПОТОП'' THEN ISNULL(sv.Значение,-1) END) AS [ТИПОТОП],
        MAX(CASE WHEN vp.Название = ''СПОДМДСЕМ'' THEN ISNULL(sv.Значение,-1) END) AS [СПОДМДСЕМ]
    FROM AreaLS ls
    LEFT JOIN stack.[Лицевые иерархия] lh ON lh.Потомок = ls.Счет
    LEFT JOIN stack.[Виды параметров] vp ON vp.Название IN (''СОСТОЯНИЕ'',''ГОР_СЕЛО'',''ТИПСТРОЙ'',''ТИППЛИТЫ'',''ТИПОТОП'',''СПОДМДСЕМ'') 
    LEFT JOIN stack.[Свойства] sv ON sv.[Виды-Параметры] = vp.row_id AND sv.[Счет-параметры] = lh.Родитель AND GETDATE() BETWEEN sv.ДатНач AND sv.ДатКнц AND sv.Значение IS NOT NULL
    GROUP BY ls.Счет
),
ovn AS (
SELECT [Месяц расчета] [Месяц] 
,org.Наименование [УК]
,pst.Название [Поставщик]
,nl.Счет
,nl.[Номер услуги] [Услуга]
,[Тип]
,CASE [Аналитика2]
WHEN -1 THEN ''по показанию''
WHEN 47 THEN ''по нормативу''
WHEN 49 THEN ''замещение по среднему''
WHEN 51 THEN ''временное отсутствие''
WHEN 84 THEN ''ОКПУ''
WHEN 85 THEN ''ОКПУ''
WHEN 86 THEN ''ОКПУ''
WHEN 149 THEN ''по среднему (снят ПУ)''
WHEN 549 THEN ''замещение по норме''
WHEN 4001 THEN ''по показанию''
WHEN 777 THEN ''проценты по рассрочке платежа''
WHEN 910 THEN ''услуги по СОИМД''
WHEN 551 THEN ''временное отсутствие по счетчику''
ELSE ''''
END [Аналитика]
,nl.[ИспользованТариф] [Тариф]
,ROUND(nl.[Объем],2) Объем
,nl.[Сумма]
, CASE 
WHEN ROUND(nl.[Объем],2) < 0 THEN ''Mеньше 0''
WHEN ROUND(nl.[Объем],2) = 0 THEN ''Pавно 0''
WHEN ROUND(nl.[Объем],2) BETWEEN 0.01 AND 100.99 THEN ''[01] от 0 до 100''
WHEN ROUND(nl.[Объем],2) BETWEEN 101 AND 200.99 THEN ''[02] от 101 до 200''
WHEN ROUND(nl.[Объем],2) BETWEEN 201 AND 300.99 THEN ''[03] от 201 до 300''
WHEN ROUND(nl.[Объем],2) BETWEEN 301 AND 400.99 THEN ''[04] от 301 до 400''
WHEN ROUND(nl.[Объем],2) BETWEEN 401 AND 500.99 THEN ''[05] от 401 до 500''
WHEN ROUND(nl.[Объем],2) BETWEEN 501 AND 600.99 THEN ''[06] от 501 до 600''
WHEN ROUND(nl.[Объем],2) BETWEEN 601 AND 700.99 THEN ''[07] от 601 до 700''
WHEN ROUND(nl.[Объем],2) BETWEEN 701 AND 800.99 THEN ''[08] от 701 до 800''
WHEN ROUND(nl.[Объем],2) BETWEEN 801 AND 900.99 THEN ''[09] от 801 до 900''
WHEN ROUND(nl.[Объем],2) BETWEEN 901 AND 1000.99 THEN ''[10] от 901 до 1000''
WHEN ROUND(nl.[Объем],2) BETWEEN 1001 AND 1100.99 THEN ''[11] от 1001 до 1100''
WHEN ROUND(nl.[Объем],2) BETWEEN 1101 AND 1200.99 THEN ''[12] от 1101 до 1200''
WHEN ROUND(nl.[Объем],2) BETWEEN 1201 AND 1300.99 THEN ''[13] от 1201 до 1300''
WHEN ROUND(nl.[Объем],2) BETWEEN 1301 AND 1400.99 THEN ''[14] от 1301 до 1400''
WHEN ROUND(nl.[Объем],2) BETWEEN 1401 AND 1500.99 THEN ''[15] от 1401 до 1500''
WHEN ROUND(nl.[Объем],2) BETWEEN 1501 AND 1600.99 THEN ''[16] от 1501 до 1600''
WHEN ROUND(nl.[Объем],2) BETWEEN 1601 AND 1700.99 THEN ''[17] от 1601 до 1700''
WHEN ROUND(nl.[Объем],2) BETWEEN 1701 AND 1800.99 THEN ''[18] от 1701 до 1800''
WHEN ROUND(nl.[Объем],2) BETWEEN 1801 AND 1900.99 THEN ''[19] от 1801 до 1900''
WHEN ROUND(nl.[Объем],2) BETWEEN 1901 AND 2000.99 THEN ''[20] от 1901 до 2000''
WHEN ROUND(nl.[Объем],2) BETWEEN 2001 AND 2500.99 THEN ''[21] от 2001 до 2500''
WHEN ROUND(nl.[Объем],2) BETWEEN 2501 AND 3000.99 THEN ''[22] от 2501 до 3000''
WHEN ROUND(nl.[Объем],2) BETWEEN 3001 AND 3500.99 THEN ''[23] от 3001 до 3500''
WHEN ROUND(nl.[Объем],2) BETWEEN 3501 AND 4000.99 THEN ''[24] от 3501 до 4000''
WHEN ROUND(nl.[Объем],2) BETWEEN 4001 AND 4500.99 THEN ''[25] от 4001 до 4500''
WHEN ROUND(nl.[Объем],2) BETWEEN 4501 AND 5000.99 THEN ''[26] от 4501 до 5000''
WHEN ROUND(nl.[Объем],2) BETWEEN 5001 AND 5500.99 THEN ''[27] от 5001 до 5500''
WHEN ROUND(nl.[Объем],2) BETWEEN 5501 AND 6000.99 THEN ''[28] от 5501 до 6000''
WHEN ROUND(nl.[Объем],2) BETWEEN 6001 AND 6500.99 THEN ''[29] от 6001 до 6500''
WHEN ROUND(nl.[Объем],2) BETWEEN 6501 AND 7000.99 THEN ''[30] от 6501 до 7000''
WHEN ROUND(nl.[Объем],2) BETWEEN 7001 AND 7500.99 THEN ''[31] от 7001 до 7500''
WHEN ROUND(nl.[Объем],2) BETWEEN 7501 AND 8000.99 THEN ''[32] от 7501 до 8000''
WHEN ROUND(nl.[Объем],2) BETWEEN 8001 AND 8500.99 THEN ''[33] от 8001 до 8500''
WHEN ROUND(nl.[Объем],2) BETWEEN 8501 AND 9000.99 THEN ''[34] от 8501 до 9000''
WHEN ROUND(nl.[Объем],2) BETWEEN 9001 AND 9500.99 THEN ''[35] от 9001 до 9500''
WHEN ROUND(nl.[Объем],2) BETWEEN 9501 AND 10000.99 THEN ''[36] от 9501 до 10000''
WHEN ROUND(nl.[Объем],2) BETWEEN 10001 AND 11000.99 THEN ''[37] от 10001 до 11000''
WHEN ROUND(nl.[Объем],2) BETWEEN 11001 AND 12000.99 THEN ''[38] от 11001 до 12000''
WHEN ROUND(nl.[Объем],2) BETWEEN 12001 AND 13000.99 THEN ''[39] от 12001 до 13000''
WHEN ROUND(nl.[Объем],2) BETWEEN 13001 AND 14000.99 THEN ''[40] от 13001 до 14000''
WHEN ROUND(nl.[Объем],2) BETWEEN 14001 AND 15000.99 THEN ''[41] от 14001 до 15000''
WHEN ROUND(nl.[Объем],2) BETWEEN 15001 AND 16000.99 THEN ''[42] от 15001 до 16000''
WHEN ROUND(nl.[Объем],2) BETWEEN 16001 AND 17000.99 THEN ''[43] от 16001 до 17000''
WHEN ROUND(nl.[Объем],2) BETWEEN 17001 AND 18000.99 THEN ''[44] от 17001 до 18000''
WHEN ROUND(nl.[Объем],2) BETWEEN 18001 AND 19000.99 THEN ''[45] от 18001 до 19000''
WHEN ROUND(nl.[Объем],2) BETWEEN 19001 AND 20000.99 THEN ''[46] от 19001 до 20000''
WHEN ROUND(nl.[Объем],2) BETWEEN 20001 AND 21000.99 THEN ''[47] от 20001 до 21000''
WHEN ROUND(nl.[Объем],2) BETWEEN 21001 AND 22000.99 THEN ''[48] от 21001 до 22000''
WHEN ROUND(nl.[Объем],2) BETWEEN 22001 AND 23000.99 THEN ''[49] от 22001 до 23000''
WHEN ROUND(nl.[Объем],2) BETWEEN 23001 AND 24000.99 THEN ''[50] от 23001 до 24000''
WHEN ROUND(nl.[Объем],2) BETWEEN 24001 AND 25000.99 THEN ''[51] от 24001 до 25000''
WHEN ROUND(nl.[Объем],2) BETWEEN 25001 AND 30000.99 THEN ''[52] от 25001 до 30000''
WHEN ROUND(nl.[Объем],2) BETWEEN 30001 AND 35000.99 THEN ''[53] от 30001 до 35000''
WHEN ROUND(nl.[Объем],2) BETWEEN 35001 AND 40000.99 THEN ''[54] от 35001 до 40000''
WHEN ROUND(nl.[Объем],2) BETWEEN 40001 AND 45000.99 THEN ''[55] от 40001 до 45000''
WHEN ROUND(nl.[Объем],2) BETWEEN 45001 AND 50000.99 THEN ''[56] от 45001 до 50000''
WHEN ROUND(nl.[Объем],2) BETWEEN 50001 AND 1000000.99 THEN ''[57] от 50001 до 1000000''
ELSE ''Bне диапазонов''
END Диапазон
FROM [stack].[Начисления лицевых] nl
JOIN [stack].Организации pst ON pst.ROW_ID=nl.Поставщик
JOIN [stack].[УК Договоры] uk ON uk.ROW_ID=nl.ДоговорУК
JOIN [stack].Организации org ON org.ROW_ID=uk.[Организация-УКДоговор]
WHERE nl.[Месяц расчета] BETWEEN @dstart AND @dfinish AND nl.[Номер услуги]<1000
), DataFinal AS (
SELECT als.Номер, als.Счет
, ovn.Месяц, ovn.УК , ovn.Поставщик , ovn.Услуга , ovn.Тип , ovn.Аналитика, ovn.Диапазон
, CASE prm.ГОР_СЕЛО WHEN 0 THEN ''Село'' WHEN 1 THEN ''Город'' WHEN 2 THEN ''Приравненные'' ELSE ''Нет параметра'' END ГОР_СЕЛО
, CASE prm.СОСТОЯНИЕ WHEN 0 THEN ''Используется'' WHEN 1 THEN  ''Не проживает'' WHEN 2  THEN  ''Закрыт'' ELSE ''Нет параметра'' END СОСТОЯНИЕ
, prm.НАЧАЛО
, prm.ОКОНЧАНИЕ
, CASE prm.ТИПОТОП WHEN 0 THEN ''(Не указано)'' WHEN 1 THEN  ''Центральное'' WHEN 2 THEN  ''Инд. газовый нагревательный прибор'' WHEN 3 THEN  ''Инд. электронагревательный прибор'' WHEN 4 THEN  ''Общ. газовый нагревательный прибор'' WHEN 5 THEN  ''Общ. электронагревательный прибор'' WHEN 6 THEN  ''На твердом топливе'' WHEN 7 THEN  ''Электрическое (Чистый воздух)'' ELSE ''Нет параметра'' END ТИПОТОП
, CASE prm.СПОДМДСЕМ WHEN 0 THEN ''Нет'' WHEN 1 THEN  ''Да'' ELSE ''Нет параметра'' END СПОДМДСЕМ
, CASE prm.ТИППЛИТЫ WHEN 0 THEN ''Без указания'' WHEN 1 THEN ''Газовые'' WHEN 2 THEN ''Электрические'' WHEN 3 THEN ''На тв.топливе'' ELSE ''Нет параметра'' END ТИППЛИТЫ
, CASE prm.ТИПСТРОЙ 
	  WHEN 0 THEN ''Многоквартирный''
	  WHEN 1 THEN ''Частный''
	  WHEN 2 THEN ''Общежитие''
	  WHEN 3 THEN ''Дача''
	  WHEN 4 THEN ''Гараж''
	  WHEN 5 THEN ''Баня''
	  WHEN 6 THEN ''Сарай''
	  WHEN 7 THEN ''Прочие''
	  WHEN 8 THEN ''Хозпостройка''
	  WHEN 9 THEN ''Земельный участок''
	  ELSE ''Нет параметра'' 
END ТИПСТРОЙ
,  ovn.Объем
FROM AreaLS als
JOIN ovn ovn ON als.Счет=ovn.Счет
LEFT JOIN ParamData prm ON als.Счет=prm.Счет
)       
SELECT FORMAT([Месяц], ''[yyyy-MM] MMMM'', ''ru'') [Месяц],УК,Поставщик,ГОР_СЕЛО,СОСТОЯНИЕ,СПОДМДСЕМ,ТИПОТОП,ТИППЛИТЫ,ТИПСТРОЙ,Услуга,Тип,Аналитика,Диапазон,SUM(Объем) Объем, COUNT(Счет) ЛСК
FROM DataFinal
GROUP BY Месяц,УК,Поставщик,ГОР_СЕЛО,СОСТОЯНИЕ,СПОДМДСЕМ,ТИПОТОП,ТИППЛИТЫ,ТИПСТРОЙ,Услуга,Тип,Аналитика,Диапазон
' AS query_text, CAST(N'{"fields":{"statistic":[{"dataField":"Исполнено"},{"dataField":"Время"},{"dataField":"Записей"},{"dataField":"Фильтры"}],"grid":[{"caption":"Филиал","dataField":"Филиал"},{"dataField":"Месяц"},{"dataField":"УК"},{"dataField":"Поставщик"},{"dataField":"ГОР_СЕЛО"},{"dataField":"СОСТОЯНИЕ"},{"dataField":"ТИПОТОП"},{"dataField":"СПОДМДСЕМ"},{"dataField":"ТИППЛИТЫ"},{"dataField":"ТИПСТРОЙ"},{"dataField":"Услуга"},{"dataField":"Тип"},{"dataField":"Аналитика"},{"dataField":"Диапазон"},{"dataField":"Объем","format":{"type":"fixedPoint","precision":3}},{"caption":"Кол-во","dataField":"ЛСК","format":{"type":"fixedPoint","precision":0}}],"pivot":[{"caption":"Филиал","dataField":"Филиал","area":"filter","expanded":true},{"dataField":"Месяц","area":"row","expanded":true},{"dataField":"УК","area":"filter","expanded":true},{"dataField":"Поставщик","area":"row","expanded":true},{"dataField":"ГОР_СЕЛО","area":"row","expanded":true},{"dataField":"СОСТОЯНИЕ","area":"filter","expanded":true},{"dataField":"ТИПОТОП","area":"row","expanded":true},{"dataField":"СПОДМДСЕМ","area":"row","expanded":true},{"dataField":"ТИППЛИТЫ","area":"row","expanded":true},{"dataField":"ТИПСТРОЙ","area":"row","expanded":true},{"dataField":"Услуга","area":"filter","expanded":true},{"dataField":"Тип","area":"filter","expanded":true},{"dataField":"Аналитика","area":"filter","expanded":true},{"dataField":"Диапазон","area":"column"},{"caption":"Объем","dataField":"Объем","dataType":"number","summaryType":"sum","format":{"type":"fixedPoint","precision":3},"area":"data"},{"caption":"Кол-во","dataField":"ЛСК","dataType":"number","summaryType":"sum","format":{"type":"fixedPoint","precision":0},"area":"data"}],"chart":{"pvtfld":[{"caption":"Филиал","dataField":"Филиал","area":"filter","expanded":true},{"dataField":"Месяц","area":"row","expanded":true},{"dataField":"УК","area":"filter","expanded":true},{"dataField":"Поставщик","area":"row","expanded":true},{"dataField":"ГОР_СЕЛО","area":"row","expanded":true},{"dataField":"СОСТОЯНИЕ","area":"filter","expanded":true},{"dataField":"ТИПОТОП","area":"row","expanded":true},{"dataField":"СПОДМДСЕМ","area":"row","expanded":true},{"dataField":"ТИППЛИТЫ","area":"row","expanded":true},{"dataField":"ТИПСТРОЙ","area":"row","expanded":true},{"dataField":"Услуга","area":"filter","expanded":true},{"dataField":"Тип","area":"filter","expanded":true},{"dataField":"Аналитика","area":"filter","expanded":true},{"dataField":"Диапазон","area":"column"},{"caption":"Объем","dataField":"Объем","dataType":"number","summaryType":"sum","format":{"type":"fixedPoint","precision":3},"area":"data"},{"caption":"Кол-во","dataField":"ЛСК","dataType":"number","summaryType":"sum","format":{"type":"fixedPoint","precision":0},"area":"data"}],"series":[{"field":"СуммаОпл","name":"СуммаОпл","type":"bar"}],"argument":"период","title":"График"}},"filters":{"ФОНД":[],"ПериодМесяцы":{}},"description":"КТР — сводный отчёт по всем лицевым счетам за указанный период.","mandatory":["ФОНД"]}' AS NVARCHAR(MAX)) AS config, 0 AS is_section, 0 AS sort_order) AS src
   ON target.report_key = src.report_key
WHEN MATCHED THEN UPDATE SET title = src.title, icon = src.icon, image = src.image,
    query_text = src.query_text, config = src.config, parent_id = src.parent_id,
    is_section = src.is_section, sort_order = src.sort_order, is_deleted = 0,
    updated_at = SYSUTCDATETIME()
WHEN NOT MATCHED THEN INSERT (report_key, parent_id, title, icon, image, query_text,
    config, is_section, sort_order)
    VALUES (src.report_key, src.parent_id, src.title, src.icon, src.image,
    src.query_text, src.config, src.is_section, src.sort_order);
GO
MERGE dbo.reports AS target
USING (SELECT N'RPT_1201' AS report_key, (SELECT id FROM dbo.reports WHERE report_key = N'ОРН') AS parent_id, N'ОСВ [Месяц-Обороты-Пени]' AS title, N'chart' AS icon, N'' AS image, N'
        SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;
        DECLARE @dstart DATE = {РасчетыйМесяц};
        DECLARE @dbefore DATE=DateAdd(month,-1,@dstart);
                                                                                                                
        WITH FOND AS (
        SELECT DISTINCT ls.ROW_ID Счет,ls.Номер ЛС
        FROM [stack].[Лицевые счета] ls
        JOIN (SELECT DISTINCT Потомок FROM [stack].[Лицевые иерархия] WHERE ПотомокТип = 5 AND Родитель IN ({ФОНД})) li ON li.Потомок = ls.ROW_ID
        ), balance AS (
        SELECT Счет,Месяц,УК,Поставщик,Услуга
        ,[СальдоВх]=ROUND(SUM(ISNULL(СальдоВх,0)),2) 
        ,[Начислено]=ROUND(SUM(ISNULL(Тариф,0)),2)  
        ,[Перерасчет]=ROUND(SUM(ISNULL(ПТариф,0)),2)  
        ,[Качество]=ROUND(SUM(ISNULL(КТариф,0)),2)  
        ,[Корр]=ROUND(SUM(ISNULL(Корр,0)),2)  
        ,[СальдоИсх]=ROUND(SUM(ISNULL(СальдоИсх,0)),2)  
        ,[ПениВх]=ROUND(SUM(ISNULL(ПениВх,0)),2)  
        ,[ПениНач]=ROUND(SUM(ISNULL(ПениНач,0)),2)  
        ,[ПениИсх]=ROUND(SUM(ISNULL(ПениИсх,0)),2)  
        FROM (
                                    --СальдоВх--
                                    SELECT Счет,@dstart Месяц, ДоговорУК УК,Поставщик,''СальдоВх''Тип,[Номер услуги] Услуга, SUM([Сумма]) Сумма
                                    FROM [stack].[НСальдо]
                                    WHERE [Месяц расчета]=@dbefore AND ДоговорУК IN ({УК})
                                    GROUP BY Счет, ДоговорУК, Поставщик,[Номер услуги]
                                    --СальдоИсх--
                                    UNION ALL
                                    SELECT Счет, @dstart Месяц, ДоговорУК УК,Поставщик,''СальдоИсх''Тип,[Номер услуги] Услуга, SUM([Сумма]) Сумма
                                    FROM [stack].[НСальдо]
                                    WHERE [Месяц расчета]=@dstart AND ДоговорУК IN ({УК})
                                    GROUP BY Счет, ДоговорУК, Поставщик,[Номер услуги]
                                    -- Начислено --
                                    UNION ALL
                                    SELECT Счет,[Месяц расчета] Месяц,ДоговорУК УК,Поставщик,[Тип],[Номер услуги] Услуга
                                    ,SUM([Сумма]) Сумма
                                    FROM [stack].[Начисления лицевых]
                                    WHERE [Месяц расчета]=@dstart AND ДоговорУК IN ({УК})
                                    GROUP BY Счет, [Месяц расчета],[ДоговорУК],[Поставщик],[Тип],[Номер услуги]
                                    -- Коррекция --
                                    UNION ALL
                                    SELECT kz.[Счет-Коррекция]Счет, kz.РасчМесяц Месяц,ISNULL(ks.[УКДоговор-Коррекция],-1) УК,ks.[Поставщик-Коррекция] [Поставщик], ''Корр'' Тип , tu.[Номер услуги] Услуга
                                    ,SUM(ks.Сумма) Сумма
                                    FROM stack.[Коррекция заголовок] kz
                                    JOIN stack.[Коррекция список] ks ON kz.ROW_ID = ks.[КорЗаголовок-Список]
                                    JOIN stack.[Типы услуг] tu ON tu.ROW_ID = ks.[Услуга-Коррекция]
                                    WHERE kz.РасчМесяц=@dstart AND ISNULL(ks.[УКДоговор-Коррекция],-1) IN ({УК})
                                    GROUP BY kz.[Счет-Коррекция], ISNULL(ks.[УКДоговор-Коррекция],-1),kz.РасчМесяц,ks.[Поставщик-Коррекция],tu.[Номер услуги]
                                    -------------- Пени Сальдо Вход---------------------------------
                                    UNION ALL
                                    SELECT [Счет], @dstart Месяц,[ДоговорУК],[Поставщик],''ПениВх''Тип, [Номер услуги] Услуга
                                    ,SUM(Сумма) Сумма						
                                    FROM [stack].[ПениСальдо] ps
                                    WHERE ps.[Месяц расчета]=@dbefore AND ps.ДоговорУК IN ({УК})
                                    GROUP BY Счет, [ДоговорУК],[Поставщик], [Номер услуги]
                                    -------------- Пени Нач---------------------------------
                                    UNION ALL
                                    SELECT [Счет], [Месяц расчета] Месяц,[ДоговорУК],[Поставщик],''ПениНач''Тип, [Номер услуги] Услуга
                                    ,SUM(Сумма) Сумма
                                    FROM stack.[ПениНачисление] pns
                                    WHERE pns.[Месяц расчета]=@dstart AND pns.ДоговорУК IN ({УК})
                                                                GROUP BY Счет, [Месяц расчета],[ДоговорУК],[Поставщик], [Номер услуги]
                                    -------------- Пени Сальдо Исход---------------------------------
                                    UNION ALL
                                    SELECT [Счет], [Месяц расчета] Месяц,[ДоговорУК],[Поставщик],''ПениИсх''Тип, [Номер услуги] Услуга
                                    ,SUM(Сумма) Сумма						
                                    FROM [stack].[ПениСальдо] ps
                                    WHERE ps.[Месяц расчета]=@dstart AND ps.ДоговорУК IN ({УК})
                                    GROUP BY Счет, [Месяц расчета],[ДоговорУК],[Поставщик], [Номер услуги]
                )  nl
        PIVOT(SUM(Сумма) FOR [Тип] IN ([СальдоВх],[Тариф], [ПТариф], [КТариф],[Корр],[СальдоИсх],[ПениВх],[ПениНач],[ПениИсх])) pv
        GROUP BY Счет,Месяц,УК,Поставщик,Услуга
        ),ParamData AS (
            SELECT f.Счет,
                MAX(CASE WHEN vp.Название = ''ОБЩПЛОЩАДЬ'' THEN sv.Значение END) AS [ОБЩПЛОЩАДЬ],                
                MAX(CASE WHEN vp.Название = ''СОСТОЯНИЕ'' THEN sv.Значение END) AS [СОСТОЯНИЕ]
            FROM FOND f
            LEFT JOIN stack.[Лицевые иерархия] lh ON lh.Потомок = f.Счет
            LEFT JOIN stack.[Виды параметров] vp ON vp.Название IN (''ОБЩПЛОЩАДЬ'',''СОСТОЯНИЕ'')
            LEFT JOIN stack.[Свойства] sv ON sv.[Виды-Параметры] = vp.row_id AND sv.[Счет-параметры] = lh.Родитель AND @dstart BETWEEN sv.ДатНач AND sv.ДатКнц AND sv.Значение IS NOT NULL
            GROUP BY f.Счет
        ),FinalData AS (
            SELECT 
                FORMAT(bl.Месяц, ''yyyy-MMMM'', ''ru'') AS [Месяц],
                adr.Район,
                adr.Участок,
                adr.НП,
                adr.Улица,
                adr.Дом,
                adr.Квартира,
                adr.Комната,
                f.ЛС,
                kr.ФИО, 
                org_uk.Наименование AS [УК],
                org_sup.Наименование AS [Поставщик],
                tu.Название AS ВидУслуги,
                bl.Услуга AS КодУслуги,
                bl.СальдоВх,
                bl.Начислено,
                bl.Перерасчет,
                bl.Качество,
                bl.Корр,
                Оплата = ROUND(bl.СальдоВх + bl.Начислено + bl.Перерасчет + bl.Качество + bl.Корр - bl.СальдоИсх, 2),
                bl.СальдоИсх,
                bl.ПениВх,
                bl.ПениНач,
                ПениОпл = ROUND(bl.ПениВх + bl.ПениНач - bl.ПениИсх, 2),
                bl.ПениИсх,
                ROUND(ISNULL(pd.[ОБЩПЛОЩАДЬ],0),3) ОБЩПЛОЩАДЬ,
                CASE pd.СОСТОЯНИЕ
                    WHEN 0 THEN ''Используется'' 
                    WHEN 1 THEN ''Не проживает'' 
                    WHEN 2 THEN ''Закрыт'' 
                    ELSE '''' 
                END AS СОСТОЯНИЕ
            FROM FOND f 
            JOIN balance bl ON f.Счет = bl.Счет
            JOIN ParamData pd ON pd.Счет = f.Счет
            JOIN stack.[Типы услуг] tu ON tu.[Номер услуги] = bl.Услуга
            CROSS APPLY stack.AddrLs_Table(f.Счет, 0) adr
            OUTER APPLY (
                SELECT TOP 1 ФИО 
                FROM [stack].[Карточки регистрации] 
                WHERE [Счет-Наниматель] = bl.Счет
            ) kr
            LEFT JOIN [stack].[УК Договоры] ukd ON ukd.ROW_ID = bl.УК
            LEFT JOIN [stack].[Организации] org_uk ON org_uk.ROW_ID = ukd.[Организация-УКДоговор]
            LEFT JOIN [stack].[Организации] org_sup ON org_sup.ROW_ID = bl.Поставщик
        )
        SELECT fd.*
        , СальдоИсхДолг=IIF(fd.СальдоИсх>=0,fd.СальдоИсх,0)
        , СальдоИсхПереплата=IIF(fd.СальдоИсх<0,fd.СальдоИсх,0)
        , Адрес=CONCAT(fd.НП,'', '', fd.Улица, '', д.'', ltrim(fd.Дом), '', кв.'', ltrim(fd.Квартира), IIF(fd.Комната='''','''','',комната ''+fd.Комната))
        FROM FinalData fd
        OPTION (MAXDOP 0, RECOMPILE);
        ' AS query_text, CAST(N'{"fields":{"statistic":[{"dataField":"Исполнено","width":25},{"dataField":"Время","width":25},{"dataField":"Записей","width":25},{"dataField":"Фильтры"}],"grid":[{"dataField":"Месяц"},{"caption":"Адрес","columns":[{"dataField":"Район"},{"dataField":"Участок"},{"dataField":"НП"},{"dataField":"Улица"},{"dataField":"Дом"},{"dataField":"Квартира"},{"dataField":"Комната"}]},{"dataField":"ЛС"},{"dataField":"СОСТОЯНИЕ"},{"dataField":"ОБЩПЛОЩАДЬ"},{"dataField":"ФИО"},{"dataField":"УК"},{"dataField":"Поставщик"},{"dataField":"КодУслуги"},{"dataField":"ВидУслуги"},{"caption":"Обороты","columns":[{"dataField":"СальдоВх"},{"dataField":"Начислено"},{"dataField":"Перерасчет"},{"dataField":"Качество"},{"dataField":"Корр"},{"dataField":"Оплата"},{"dataField":"СальдоИсх"},{"dataField":"СальдоИсхДолг"},{"dataField":"СальдоИсхПереплата"}]},{"caption":"Обороты Пени","columns":[{"dataField":"ПениВх"},{"dataField":"ПениНач"},{"dataField":"ПениОпл"},{"dataField":"ПениИсх"}]}],"pivot":[{"dataField":"Месяц","area":"column"},{"dataField":"Район","area":"filter","expanded":true},{"dataField":"Участок","area":"filter","expanded":true},{"dataField":"НП","area":"filter","expanded":true},{"dataField":"Улица","area":"filter","expanded":true},{"dataField":"Дом","area":"filter","expanded":true},{"dataField":"Квартира","area":"filter","expanded":true},{"dataField":"Комната","area":"filter","expanded":true},{"caption":"Адрес","area":"filter","dataField":"Адрес"},{"caption":"ЛС","dataField":"ЛС","area":"filter","expanded":true,"width":10},{"caption":"Состояние ЛС","dataField":"СОСТОЯНИЕ","area":"filter","expanded":true},{"caption":"Общая площадь","dataField":"ОБЩПЛОЩАДЬ","area":"filter","expanded":true,"format":{"type":"fixedPoint","precision":3}},{"caption":"ФИО","dataField":"ФИО","area":"filter","expanded":true},{"dataField":"УК","area":"row","expanded":true},{"dataField":"Поставщик","area":"row","expanded":false},{"caption":"Услуга","area":"filter","expanded":true},{"caption":"Код услуги","dataField":"КодУслуги","area":"row","expanded":true},{"caption":"Название услуги","dataField":"ВидУслуги","area":"filter","expanded":true},{"caption":"ВхСальдо","dataField":"СальдоВх","dataType":"number","summaryType":"sum","format":{"type":"fixedPoint","precision":2},"area":"data"},{"caption":"Начислено","dataField":"Начислено","dataType":"number","summaryType":"sum","format":{"type":"fixedPoint","precision":2},"area":"data"},{"caption":"Перерасчет","dataField":"Перерасчет","dataType":"number","summaryType":"sum","format":{"type":"fixedPoint","precision":2},"area":"data"},{"caption":"Качество","dataField":"Качество","dataType":"number","summaryType":"sum","format":{"type":"fixedPoint","precision":2},"area":"data"},{"caption":"Коррекция","dataField":"Корр","dataType":"number","summaryType":"sum","format":{"type":"fixedPoint","precision":2},"area":"data"},{"caption":"Оплата","dataField":"Оплата","dataType":"number","summaryType":"sum","format":{"type":"fixedPoint","precision":2},"area":"data"},{"caption":"СальдоИсх","dataField":"СальдоИсх","dataType":"number","summaryType":"sum","format":{"type":"fixedPoint","precision":2},"area":"data"},{"caption":"СальдоИсхДолг","dataField":"СальдоИсхДолг","dataType":"number","summaryType":"sum","format":{"type":"fixedPoint","precision":2},"area":"data"},{"caption":"СальдоИсхПереплата","dataField":"СальдоИсхПереплата","dataType":"number","summaryType":"sum","format":{"type":"fixedPoint","precision":2},"area":"data"},{"caption":"ПениВх","dataField":"ПениВх","dataType":"number","summaryType":"sum","format":{"type":"fixedPoint","precision":2},"area":"data"},{"caption":"ПениНач","dataField":"ПениНач","dataType":"number","summaryType":"sum","format":{"type":"fixedPoint","precision":2},"area":"data"},{"caption":"ПениОпл","dataField":"ПениОпл","dataType":"number","summaryType":"sum","format":{"type":"fixedPoint","precision":2},"area":"data"},{"caption":"ПениИсх","dataField":"ПениИсх","dataType":"number","summaryType":"sum","format":{"type":"fixedPoint","precision":2},"area":"data"}],"chart":{}},"filters":{"ФОНД":[],"УК":[],"РасчетыйМесяц":[]},"views":["pivot","grid","dashboard"],"description":"Оборотно-сальдовая ведомость (ОСВ) — отчёт, где отображаются остатки на начало периода, движение (обороты) и остатки на конец периода по всем используемым аналитикам.","mandatory":["ФОНД","РасчетыйМесяц"]}' AS NVARCHAR(MAX)) AS config, 0 AS is_section, 0 AS sort_order) AS src
   ON target.report_key = src.report_key
WHEN MATCHED THEN UPDATE SET title = src.title, icon = src.icon, image = src.image,
    query_text = src.query_text, config = src.config, parent_id = src.parent_id,
    is_section = src.is_section, sort_order = src.sort_order, is_deleted = 0,
    updated_at = SYSUTCDATETIME()
WHEN NOT MATCHED THEN INSERT (report_key, parent_id, title, icon, image, query_text,
    config, is_section, sort_order)
    VALUES (src.report_key, src.parent_id, src.title, src.icon, src.image,
    src.query_text, src.config, src.is_section, src.sort_order);
GO
MERGE dbo.reports AS target
USING (SELECT N'RPT_1102' AS report_key, (SELECT id FROM dbo.reports WHERE report_key = N'КТР') AS parent_id, N'КТР по ЛС за период' AS title, N'chart' AS icon, N'' AS image, N'
SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED
SET NOCOUNT ON;
DECLARE @dstart DATE = {ПериодМесяцы_start};
DECLARE @dend DATE = {ПериодМесяцы_end};

WITH AreaLS AS (
	SELECT ls.ROW_ID Счет, ls.Тип, ls.Номер
	FROM stack.[Лицевые счета] ls
        JOIN ( SELECT DISTINCT Потомок FROM [stack].[Лицевые иерархия] WHERE ПотомокТип = 5 AND Родитель IN ({ФОНД})) li ON li.Потомок=ls.ROW_ID	
),
ParamData AS (
    SELECT ls.Счет,	
        MAX(CASE WHEN vp.Название = ''ЮРЛИЦО'' THEN ISNULL(sv.Значение,-1) END) AS [ЮРЛИЦО],
        MAX(CASE WHEN vp.Название = ''ПУСТУЮЩАЯ'' THEN ISNULL(sv.Значение,-1) END) AS [ПУСТУЮЩАЯ],
        MAX(CASE WHEN vp.Название = ''СОСТОЯНИЕ'' THEN ISNULL(sv.Значение,-1) END) AS [СОСТОЯНИЕ],
	MAX(CASE WHEN vp.Название = ''СОСТОЯНИЕ'' THEN sv.ДатНач END) AS [НАЧАЛО],
        MAX(CASE WHEN vp.Название = ''ТИПОТОП'' THEN ISNULL(sv.Значение,-1) END) AS [ТИПОТОП],		
        MAX(CASE WHEN vp.Название = ''КОМНАТЫ'' THEN ISNULL(sv.Значение,-1) END) AS [КОМНАТЫ],
 	MAX(CASE WHEN vp.Название = ''ГОР_СЕЛО'' THEN ISNULL(sv.Значение,-1) END) AS [ГОР_СЕЛО],
        MAX(CASE WHEN vp.Название = ''ТИПСТРОЙ'' THEN ISNULL(sv.Значение,-1) END) AS [ТИПСТРОЙ],
        MAX(CASE WHEN vp.Название = ''ТИППЛИТЫ'' THEN ISNULL(sv.Значение,-1) END) AS [ТИППЛИТЫ],
        MAX(CASE WHEN vp.Название = ''СПОДМДСЕМ'' THEN ISNULL(sv.Значение,-1) END) AS [СПОДМДСЕМ]
    FROM AreaLS ls
    LEFT JOIN stack.[Лицевые иерархия] lh ON lh.Потомок = ls.Счет
    LEFT JOIN stack.[Виды параметров] vp ON vp.Название IN (''ЮРЛИЦО'', ''ПУСТУЮЩАЯ'', ''СОСТОЯНИЕ'',''ТИПОТОП'',''ГОР_СЕЛО'',''ТИПСТРОЙ'',''ТИППЛИТЫ'',''СПОДМДСЕМ'') 
    LEFT JOIN stack.[Свойства] sv ON sv.[Виды-Параметры] = vp.row_id AND sv.[Счет-параметры] = lh.Родитель AND GETDATE() BETWEEN sv.ДатНач AND sv.ДатКнц AND sv.Значение IS NOT NULL
    GROUP BY ls.Счет
),
ovn AS (
SELECT [Месяц расчета] [Месяц] 
--,org.Наименование [УК]
--,pst.Название [Поставщик]
,nl.Счет
,nl.[Номер услуги] [Услуга]
,[Тип]
,CASE [Аналитика2]
WHEN -1 THEN ''по показанию''
WHEN 47 THEN ''по нормативу''
WHEN 49 THEN ''замещение по среднему''
WHEN 51 THEN ''временное отсутствие''
WHEN 84 THEN ''ОКПУ''
WHEN 85 THEN ''ОКПУ''
WHEN 86 THEN ''ОКПУ''
WHEN 149 THEN ''по среднему (снят ПУ)''
WHEN 549 THEN ''замещение по норме''
WHEN 4001 THEN ''по показанию''
WHEN 777 THEN ''проценты по рассрочке платежа''
WHEN 910 THEN ''услуги по СОИМД''
WHEN 551 THEN ''временное отсутствие по счетчику''
ELSE ''''
END [Аналитика]
,nl.[ИспользованТариф] [Тариф]
,nl.[Объем]
,nl.[Сумма]
FROM [stack].[Начисления лицевых] nl
--JOIN [stack].Организации pst ON pst.ROW_ID=nl.Поставщик
--JOIN [stack].[УК Договоры] uk ON uk.ROW_ID=nl.ДоговорУК
--JOIN [stack].Организации org ON org.ROW_ID=uk.[Организация-УКДоговор]
WHERE nl.[Месяц расчета] BETWEEN @dstart  AND  @dend
AND nl.[Номер услуги]<1000
)
--, ols AS (
--SELECT [Счет],[ЗаводскойНомер],[Тарифность],[Основной] ,[ДатНач],[ДатКнц],[Услуга],[Тип]
--FROM [stack].[Объекты лицевого]
--)
SELECT als.Номер
, adr.Район
, adr.Участок
, adr.НП
, adr.Улица
, adr.Дом
, adr.Квартира
, adr.Комната
, FORMAT(ovn.Месяц,''[yyyy-MM] MMMM'',''ru'') [Месяц]
--, ovn.УК
--, ovn.Поставщик
, ovn.Услуга
, ovn.Тип
, ovn.Счет
, ovn.Аналитика
, ovn.Тариф
, ovn.Объем
, ovn.Сумма
, ISNULL(ols.C_1_Т,0) C_1_Т
, ISNULL(ols.C_2_Т,0) C_2_Т
, ISNULL(ols.C_3_Т,0) C_3_Т
, CASE prm.ЮРЛИЦО WHEN -1 THEN ''Нет параметра'' WHEN 0 THEN ''(Не указано)'' WHEN 1 THEN  ''Без расчета'' WHEN 2 THEN  ''С расчетом'' ELSE ''Нет параметра'' END ЮРЛИЦО
, CASE prm.ПУСТУЮЩАЯ WHEN -1 THEN ''Нет параметра'' WHEN 0  THEN  ''Нет'' WHEN 1 THEN  ''Без расчета'' WHEN 2 THEN  ''Перерасчет'' ELSE ''Нет параметра'' END ПУСТУЮЩАЯ
, CASE prm.ГОР_СЕЛО WHEN 0 THEN ''Село'' WHEN 1 THEN ''Город'' WHEN 2 THEN ''Приравненные'' ELSE ''Нет параметра'' END ГОР_СЕЛО
, CASE prm.СОСТОЯНИЕ WHEN 0 THEN ''Используется'' WHEN 1 THEN  ''Не проживает'' WHEN 2  THEN  ''Закрыт'' ELSE ''Нет параметра'' END СОСТОЯНИЕ
, FORMAT(prm.НАЧАЛО,''yyyy-MM-dd'',''ru'') ДАТА_СОСТОЯНИЯ
, CASE prm.ТИПОТОП WHEN 0 THEN ''(Не указано)'' WHEN 1 THEN  ''Центральное'' WHEN 2 THEN  ''Инд. газовый нагревательный прибор'' WHEN 3 THEN  ''Инд. электронагревательный прибор'' WHEN 4 THEN  ''Общ. газовый нагревательный прибор'' WHEN 5 THEN  ''Общ. электронагревательный прибор'' WHEN 6 THEN  ''На твердом топливе'' WHEN 7 THEN  ''Электрическое (Чистый воздух)'' ELSE ''Нет параметра'' END ТИПОТОП
, CASE prm.СПОДМДСЕМ WHEN 0 THEN ''Нет'' WHEN 1 THEN  ''Да'' ELSE ''Нет параметра'' END СПОДМДСЕМ
, CASE prm.ТИППЛИТЫ WHEN 0 THEN ''Без указания'' WHEN 1 THEN ''Газовые'' WHEN 2 THEN ''Электрические'' WHEN 3 THEN ''На тв.топливе'' ELSE ''Нет параметра'' END ТИППЛИТЫ
, CASE prm.ТИПСТРОЙ 
	  WHEN 0 THEN ''Многоквартирный''
	  WHEN 1 THEN ''Частный''
	  WHEN 2 THEN ''Общежитие''
	  WHEN 3 THEN ''Дача''
	  WHEN 4 THEN ''Гараж''
	  WHEN 5 THEN ''Баня''
	  WHEN 6 THEN ''Сарай''
	  WHEN 7 THEN ''Прочие''
	  WHEN 8 THEN ''Хозпостройка''
	  WHEN 9 THEN ''Земельный участок''
	  ELSE ''Нет параметра'' 
END ТИПСТРОЙ
FROM AreaLS als
CROSS APPLY stack.AddrLs_Table(als.Счет, 0) adr
JOIN ovn ovn ON als.Счет=ovn.Счет
LEFT JOIN ParamData prm ON als.Счет=prm.Счет
LEFT JOIN (
    SELECT 
        Счет,
        MAX(CASE WHEN rn = 1 THEN [Тарифность] END) AS C_1_Т,
        MAX(CASE WHEN rn = 2 THEN [Тарифность] END) AS C_2_Т,
        MAX(CASE WHEN rn = 3 THEN [Тарифность] END) AS C_3_Т
		FROM (
        SELECT 
            Счет,
            [Тарифность],
            [ЗаводскойНомер],
            ROW_NUMBER() OVER (PARTITION BY Счет ORDER BY ДатНач DESC) AS rn
        FROM [stack].[Объекты лицевого]
        WHERE [Услуга] = 1790 AND @dstart BETWEEN ДатНач AND ДатКнц AND Тип IN (''ИПУ'',''ОКПУ'') 
    ) t
    WHERE rn <= 3
    GROUP BY Счет
) ols ON ols.Счет = als.Счет
OPTION (MAXDOP 0, RECOMPILE);
' AS query_text, CAST(N'{"fields":{"statistic":[{"dataField":"Исполнено"},{"dataField":"Время"},{"dataField":"Записей"},{"dataField":"Фильтры"}],"grid":[{"caption":"Филиал","dataField":"Филиал"},{"dataField":"Месяц"},{"dataField":"Номер"},{"dataField":"Район"},{"dataField":"Участок"},{"dataField":"НП"},{"dataField":"Улица"},{"dataField":"Дом"},{"dataField":"Квартира"},{"dataField":"УК"},{"dataField":"Поставщик"},{"dataField":"Услуга"},{"dataField":"Тип"},{"dataField":"Аналитика"},{"dataField":"СОСТОЯНИЕ"},{"dataField":"НАЧАЛО"},{"dataField":"ОКОНЧАНИЕ"},{"dataField":"ЮРЛИЦО"},{"dataField":"ПУСТУЮЩАЯ"},{"dataField":"ГОР_СЕЛО"},{"dataField":"ТИППЛИТЫ"},{"dataField":"ТИПСТРОЙ"},{"dataField":"ТИПОТОП"},{"dataField":"СПОДМДСЕМ"},{"dataField":"C_1_Т"},{"dataField":"C_2_Т"},{"dataField":"C_3_Т"},{"dataField":"Тариф","format":{"type":"fixedPoint","precision":3}},{"dataField":"Объем","format":{"type":"fixedPoint","precision":3}},{"dataField":"Сумма","format":{"type":"fixedPoint","precision":2}}],"pivot":[{"caption":"Отделение","dataField":"Район","area":"filter","expanded":true},{"dataField":"Участок","area":"filter","expanded":true},{"dataField":"Улица","area":"filter","expanded":false},{"dataField":"Дом","area":"filter","expanded":false},{"dataField":"Квартира","area":"filter","expanded":false},{"dataField":"C_1_Т","area":"filter","expanded":true},{"dataField":"C_2_Т","area":"filter","expanded":true},{"dataField":"C_3_Т","area":"filter","expanded":true},{"dataField":"ЮРЛИЦО","area":"filter","expanded":true},{"dataField":"ПУСТУЮЩАЯ","area":"filter","expanded":true},{"dataField":"СОСТОЯНИЕ","area":"filter","expanded":true},{"dataField":"Услуга","area":"filter","expanded":true},{"dataField":"Тип","area":"filter","expanded":true},{"caption":"Филиал","dataField":"Филиал","area":"filter","expanded":true},{"dataField":"Месяц","area":"column","expanded":true},{"dataField":"ГОР_СЕЛО","area":"row","expanded":true},{"dataField":"НП","area":"row","expanded":false},{"caption":"ЛС","dataField":"Номер","area":"row","expanded":false},{"dataField":"ТИПСТРОЙ","area":"row","expanded":false},{"dataField":"ТИППЛИТЫ","area":"row","expanded":false},{"dataField":"ТИПОТОП","area":"row","expanded":false},{"dataField":"СПОДМДСЕМ","area":"row","expanded":false},{"caption":"Адрес","area":"row","expanded":false,"width":10},{"dataField":"Аналитика","area":"row","expanded":false},{"caption":"Сч.(Тарифность)","area":"row","expanded":true,"width":10},{"caption":"Объем","dataField":"Объем","dataType":"number","summaryType":"sum","format":{"type":"fixedPoint","precision":3},"area":"data"},{"caption":"Сумма","dataField":"Сумма","dataType":"number","summaryType":"sum","format":{"type":"fixedPoint","precision":2},"area":"data"}],"chart":{"pvtfld":[{"caption":"Филиал","dataField":"Филиал","area":"filter","expanded":true},{"dataField":"Месяц","area":"row","expanded":true},{"dataField":"Аналитика","area":"filter","expanded":true},{"dataField":"Диапазон","area":"column"},{"caption":"Объем","dataField":"Объем","dataType":"number","summaryType":"sum","format":{"type":"fixedPoint","precision":3},"area":"data"},{"caption":"Кол-во","dataField":"ЛСК","dataType":"number","summaryType":"sum","format":{"type":"fixedPoint","precision":0},"area":"data"}],"series":[{"field":"СуммаОпл","name":"СуммаОпл","type":"bar"}],"argument":"период","title":"График"}},"filters":{"ФОНД":[],"ПериодМесяцы":{"Начало":"2025-01-01","Окончание":"2025-12-01"}},"description":"КТР по лицевым счетам — детализация начислений и расчётов по каждому ЛС.","mandatory":["ФОНД"]}' AS NVARCHAR(MAX)) AS config, 0 AS is_section, 1 AS sort_order) AS src
   ON target.report_key = src.report_key
WHEN MATCHED THEN UPDATE SET title = src.title, icon = src.icon, image = src.image,
    query_text = src.query_text, config = src.config, parent_id = src.parent_id,
    is_section = src.is_section, sort_order = src.sort_order, is_deleted = 0,
    updated_at = SYSUTCDATETIME()
WHEN NOT MATCHED THEN INSERT (report_key, parent_id, title, icon, image, query_text,
    config, is_section, sort_order)
    VALUES (src.report_key, src.parent_id, src.title, src.icon, src.image,
    src.query_text, src.config, src.is_section, src.sort_order);
GO
MERGE dbo.reports AS target
USING (SELECT N'RPT_1202' AS report_key, (SELECT id FROM dbo.reports WHERE report_key = N'ОРН') AS parent_id, N'ОСВ [Период-Обороты-Объем-Пени]' AS title, N'chart' AS icon, N'' AS image, N'
SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;
-- Безопасное удаление временных таблиц
IF OBJECT_ID(''tempdb..#Accounts'') IS NOT NULL DROP TABLE #Accounts;
IF OBJECT_ID(''tempdb..#FilteredData'') IS NOT NULL DROP TABLE #FilteredData;
IF OBJECT_ID(''tempdb..#AllMonths'') IS NOT NULL DROP TABLE #AllMonths;
IF OBJECT_ID(''tempdb..#AllCombos'') IS NOT NULL DROP TABLE #AllCombos;
IF OBJECT_ID(''tempdb..#RawSaldo'') IS NOT NULL DROP TABLE #RawSaldo;
IF OBJECT_ID(''tempdb..#SaldoGrid'') IS NOT NULL DROP TABLE #SaldoGrid;
IF OBJECT_ID(''tempdb..#MonthlyBalances'') IS NOT NULL DROP TABLE #MonthlyBalances;
IF OBJECT_ID(''tempdb..#NchUsl'') IS NOT NULL DROP TABLE #NchUsl;
IF OBJECT_ID(''tempdb..#PeniNl'') IS NOT NULL DROP TABLE #PeniNl;
IF OBJECT_ID(''tempdb..#RawPeniSaldo'') IS NOT NULL DROP TABLE #RawPeniSaldo;
IF OBJECT_ID(''tempdb..#AllPeniCombos'') IS NOT NULL DROP TABLE #AllPeniCombos;
IF OBJECT_ID(''tempdb..#PeniGrid'') IS NOT NULL DROP TABLE #PeniGrid;
IF OBJECT_ID(''tempdb..#PeniBalances'') IS NOT NULL DROP TABLE #PeniBalances;

-- Параметры
DECLARE @dstart DATE = {ПериодМесяцы_start};
DECLARE @dfinal DATE = {ПериодМесяцы_end};
DECLARE @dstart_saldo DATE = DATEADD(MONTH, -1, @dstart);

-- 1. Временная таблица счетов
CREATE TABLE #Accounts (Счет INT PRIMARY KEY, ЛС VARCHAR(50));

INSERT INTO #Accounts (Счет, ЛС)
SELECT ls.ROW_ID, ls.Номер
FROM [stack].[Лицевые счета] ls
WHERE EXISTS (
    SELECT 1 
    FROM [stack].[Лицевые иерархия] li 
    WHERE li.Потомок = ls.ROW_ID 
      AND li.ПотомокТип = 5 
      AND li.Родитель IN ({ФОНД})
);

-- 2. FilteredData с объемом
CREATE TABLE #FilteredData (
    Счет INT,
    ЛС VARCHAR(50),
    Поставщик INT,
    ДоговорУК INT,
    [Месяц расчета] DATE,
    [Номер услуги] INT,
    СальдоСумма FLOAT,
    СальдоОбъем FLOAT,
    НачислениеСумма FLOAT,
    НачислениеОбъем FLOAT,
    НачислениеТип VARCHAR(50),
    Источник VARCHAR(20)
);

-- Сальдо (с объемом)
INSERT INTO #FilteredData (Счет, ЛС, Поставщик, ДоговорУК, [Месяц расчета], [Номер услуги], 
                           СальдоСумма, СальдоОбъем, НачислениеСумма, НачислениеОбъем, НачислениеТип, Источник)
SELECT 
    fnd.Счет,
    fnd.ЛС,
    ns.Поставщик,
    ns.ДоговорУК,
    ns.[Месяц расчета],
    ns.[Номер услуги],
    ISNULL(ns.Сумма, 0),
    ISNULL(ns.Объем, 0),
    NULL,
    NULL,
    NULL,
    ''Сальдо''
FROM #Accounts fnd
JOIN [stack].НСальдо ns ON fnd.Счет = ns.Счет
WHERE ns.Поставщик IN ({ПОСТ})
    AND ns.ДоговорУК IN ({УК})
    AND ns.[Месяц расчета] BETWEEN @dstart_saldo AND @dfinal
    AND ns.[Номер услуги] > 0;

-- Начисления (с объемом)
INSERT INTO #FilteredData (Счет, ЛС, Поставщик, ДоговорУК, [Месяц расчета], [Номер услуги], 
                           СальдоСумма, СальдоОбъем, НачислениеСумма, НачислениеОбъем, НачислениеТип, Источник)
SELECT 
    fnd.Счет,
    fnd.ЛС,
    nl.Поставщик,
    nl.ДоговорУК,
    nl.[Месяц расчета],
    nl.[Номер услуги],
    NULL,
    NULL,
    ISNULL(nl.Сумма, 0),
    ISNULL(nl.Объем, 0),
    nl.[Тип],
    ''Начисление''
FROM #Accounts fnd
JOIN [stack].[Начисления лицевых] nl ON fnd.Счет = nl.Счет
WHERE nl.Поставщик IN ({ПОСТ}) 
    AND nl.ДоговорУК IN ({УК})
    AND nl.[Месяц расчета] BETWEEN @dstart AND @dfinal;

-- Коррекция (объем = 0)
INSERT INTO #FilteredData (Счет, ЛС, Поставщик, ДоговорУК, [Месяц расчета], [Номер услуги], 
                           СальдоСумма, СальдоОбъем, НачислениеСумма, НачислениеОбъем, НачислениеТип, Источник)
SELECT 
    fnd.Счет,
    fnd.ЛС,
    ks.[Поставщик-Коррекция],
    ks.[УКДоговор-Коррекция],
    kz.РасчМесяц,
    tu.[Номер услуги],
    NULL,
    NULL,
    ISNULL(ks.Сумма, 0),
    0.0,
    ''Перерасчет'',
    ''Коррекция''
FROM #Accounts fnd
JOIN [stack].[Коррекция заголовок] kz ON fnd.Счет = kz.[Счет-Коррекция]
JOIN [stack].[Коррекция список] ks ON kz.ROW_ID = ks.[КорЗаголовок-Список]
JOIN [stack].[Типы услуг] tu ON tu.ROW_ID = ks.[Услуга-Коррекция]
WHERE ks.[Поставщик-Коррекция] IN ({ПОСТ}) 
    AND ks.[УКДоговор-Коррекция] IN ({УК})
    AND kz.РасчМесяц BETWEEN @dstart AND @dfinal;

-- РН (объем = 0)
INSERT INTO #FilteredData (Счет, ЛС, Поставщик, ДоговорУК, [Месяц расчета], [Номер услуги], 
                           СальдоСумма, СальдоОбъем, НачислениеСумма, НачислениеОбъем, НачислениеТип, Источник)
SELECT 
    fnd.Счет,
    fnd.ЛС,
    rn.Поставщик,
    rn.ДоговорУК,
    rn.[Месяц расчета],
    rn.[Номер услуги],
    NULL,
    NULL,
    ISNULL(rn.Сумма, 0),
    0.0,
    ''Перерасчет'',
    ''РН''
FROM #Accounts fnd
JOIN [stack].[РН список] rn ON fnd.Счет = rn.[Счет]
WHERE rn.Поставщик IN ({ПОСТ}) 
    AND rn.ДоговорУК IN ({УК})
    AND rn.[Месяц расчета] BETWEEN @dstart AND @dfinal;

-- ============================================
-- 3. БЛОК САЛЬДО (с объемом)
-- ============================================

-- 3a. Все месяцы диапазона
CREATE TABLE #AllMonths ([Месяц расчета] DATE PRIMARY KEY);

WITH Months AS (
    SELECT @dstart_saldo AS m
    UNION ALL
    SELECT DATEADD(MONTH, 1, m) FROM Months WHERE m < @dfinal
)
INSERT INTO #AllMonths
SELECT m FROM Months
OPTION (MAXRECURSION 0);

-- 3b. Все уникальные комбинации
CREATE TABLE #AllCombos (
    Счет INT,
    [Номер услуги] INT,
    Поставщик INT,
    ДоговорУК INT,
    PRIMARY KEY (Счет, [Номер услуги], Поставщик, ДоговорУК)
);

INSERT INTO #AllCombos
SELECT DISTINCT Счет, [Номер услуги], Поставщик, ДоговорУК
FROM #FilteredData;

-- 3c. Фактические записи сальдо (с объемом)
CREATE TABLE #RawSaldo (
    Счет INT,
    [Номер услуги] INT,
    Поставщик INT,
    ДоговорУК INT,
    [Месяц расчета] DATE,
    ИсхСальдо FLOAT,
    ИсхОбъем FLOAT
);

INSERT INTO #RawSaldo
SELECT 
    Счет,
    [Номер услуги],
    Поставщик,
    ДоговорУК,
    [Месяц расчета],
    ROUND(SUM(СальдоСумма), 2),
    SUM(СальдоОбъем)
FROM #FilteredData
WHERE Источник = ''Сальдо''
GROUP BY Счет, [Номер услуги], Поставщик, ДоговорУК, [Месяц расчета];

-- 3d. Декартово произведение
CREATE TABLE #SaldoGrid (
    Счет INT,
    [Номер услуги] INT,
    Поставщик INT,
    ДоговорУК INT,
    [Месяц расчета] DATE,
    ИсхСальдо_факт FLOAT,
    ИсхОбъем_факт FLOAT
);

INSERT INTO #SaldoGrid
SELECT 
    ac.Счет,
    ac.[Номер услуги],
    ac.Поставщик,
    ac.ДоговорУК,
    am.[Месяц расчета],
    NULL,
    NULL
FROM #AllCombos ac
CROSS JOIN #AllMonths am;

UPDATE sg
SET 
    sg.ИсхСальдо_факт = rs.ИсхСальдо,
    sg.ИсхОбъем_факт = rs.ИсхОбъем
FROM #SaldoGrid sg
INNER JOIN #RawSaldo rs 
    ON sg.Счет = rs.Счет 
    AND sg.[Номер услуги] = rs.[Номер услуги]
    AND sg.Поставщик = rs.Поставщик
    AND sg.ДоговорУК = rs.ДоговорУК
    AND sg.[Месяц расчета] = rs.[Месяц расчета];

-- 3e. MonthlyBalances (с объемом)
CREATE TABLE #MonthlyBalances (
    Поставщик INT,
    ДоговорУК INT,
    Счет INT,
    [Месяц расчета] DATE,
    [Номер услуги] INT,
    ВхСальдо FLOAT,
    ИсхСальдо FLOAT,
    ВхОбъем FLOAT,
    ИсхОбъем FLOAT
);

INSERT INTO #MonthlyBalances (Поставщик, ДоговорУК, Счет, [Месяц расчета], [Номер услуги], 
                              ВхСальдо, ИсхСальдо, ВхОбъем, ИсхОбъем)
SELECT 
    sg.Поставщик,
    sg.ДоговорУК,
    sg.Счет,
    sg.[Месяц расчета],
    sg.[Номер услуги],
    ISNULL(
        (SELECT TOP 1 sg2.ИсхСальдо_факт
         FROM #SaldoGrid sg2
         WHERE sg2.Счет = sg.Счет
           AND sg2.[Номер услуги] = sg.[Номер услуги]
           AND sg2.[Месяц расчета] = DATEADD(MONTH, -1, sg.[Месяц расчета])
        ), 0) AS ВхСальдо,
    ISNULL(sg.ИсхСальдо_факт, 0) AS ИсхСальдо,
    ISNULL(
        (SELECT TOP 1 sg2.ИсхОбъем_факт
         FROM #SaldoGrid sg2
         WHERE sg2.Счет = sg.Счет
           AND sg2.[Номер услуги] = sg.[Номер услуги]
           AND sg2.[Месяц расчета] = DATEADD(MONTH, -1, sg.[Месяц расчета])
        ), 0) AS ВхОбъем,
    ISNULL(sg.ИсхОбъем_факт, 0) AS ИсхОбъем
FROM #SaldoGrid sg
WHERE sg.[Месяц расчета] BETWEEN @dstart AND @dfinal;

-- ============================================
-- 4. Начисления (с объемом)
-- ============================================
CREATE TABLE #NchUsl (
    Поставщик INT,
    ДоговорУК INT,
    Счет INT,
    [Месяц расчета] DATE,
    [Номер услуги] INT,
    Начислено FLOAT,
    Перерасчет FLOAT,
    НачисленоОбъем FLOAT,
    ПерерасчетОбъем FLOAT
);

INSERT INTO #NchUsl (Поставщик, ДоговорУК, Счет, [Месяц расчета], [Номер услуги], 
                     Начислено, Перерасчет, НачисленоОбъем, ПерерасчетОбъем)
SELECT 
    Поставщик,
    ДоговорУК,
    Счет,
    [Месяц расчета],
    [Номер услуги],
    SUM(CASE WHEN НачислениеТип = ''Тариф'' THEN НачислениеСумма ELSE 0 END) AS [Начислено],
    SUM(CASE WHEN НачислениеТип IN (''Перерасчет'',''ПТариф'',''КТариф'') THEN НачислениеСумма ELSE 0 END) AS [Перерасчет],
    SUM(CASE WHEN НачислениеТип = ''Тариф'' THEN НачислениеОбъем ELSE 0 END) AS [НачисленоОбъем],
    SUM(CASE WHEN НачислениеТип IN (''Перерасчет'',''ПТариф'',''КТариф'') THEN НачислениеОбъем ELSE 0 END) AS [ПерерасчетОбъем]
FROM #FilteredData
WHERE Источник IN (''Начисление'', ''Коррекция'', ''РН'')
GROUP BY Поставщик, ДоговорУК, Счет, [Месяц расчета], [Номер услуги];

-- ============================================
-- 5. Пени — начисления
-- ============================================
CREATE TABLE #PeniNl (
    Поставщик INT,
    ДоговорУК INT,
    Счет INT,
    [Месяц расчета] DATE,
    [Номер услуги] INT,
    ПениНач FLOAT
);

INSERT INTO #PeniNl (Поставщик, ДоговорУК, Счет, [Месяц расчета], [Номер услуги], ПениНач)
SELECT 
    pn.Поставщик,
    pn.ДоговорУК,
    pn.Счет,
    pn.[Месяц расчета],
    pn.[Номер услуги],
    ROUND(SUM(Сумма),2) ПениНач
FROM [stack].[ПениНачисление] pn
JOIN #Accounts ON #Accounts.Счет = pn.Счет
WHERE pn.[Месяц расчета] BETWEEN @dstart AND @dfinal
    AND pn.ДоговорУК IN ({УК})
    AND pn.Поставщик IN ({ПОСТ})
GROUP BY pn.Поставщик, pn.ДоговорУК, pn.Счет, pn.[Месяц расчета], pn.[Номер услуги];

-- ============================================
-- 6. Пени — сальдо
-- ============================================

-- 6a. Фактические записи сальдо пени
CREATE TABLE #RawPeniSaldo (
    Счет INT,
    [Номер услуги] INT,
    Поставщик INT,
    ДоговорУК INT,
    [Месяц расчета] DATE,
    ИсхСальдо FLOAT
);

INSERT INTO #RawPeniSaldo
SELECT 
    ps.Счет,
    ps.[Номер услуги],
    ps.Поставщик,
    ps.ДоговорУК,
    ps.[Месяц расчета],
    ROUND(SUM(Сумма), 2)
FROM [stack].[ПениСальдо] ps
JOIN #Accounts ON #Accounts.Счет = ps.Счет
WHERE ps.[Месяц расчета] BETWEEN @dstart_saldo AND @dfinal 
    AND ps.ДоговорУК IN ({УК})
    AND ps.Поставщик IN ({ПОСТ})
GROUP BY ps.Счет, ps.[Номер услуги], ps.Поставщик, ps.ДоговорУК, ps.[Месяц расчета];

-- 6b. Все комбинации для пени
CREATE TABLE #AllPeniCombos (
    Счет INT,
    [Номер услуги] INT,
    Поставщик INT,
    ДоговорУК INT,
    PRIMARY KEY (Счет, [Номер услуги], Поставщик, ДоговорУК)
);

INSERT INTO #AllPeniCombos
SELECT DISTINCT 
    Счет, 
    [Номер услуги], 
    Поставщик, 
    ДоговорУК
FROM (
    SELECT Счет, [Номер услуги], Поставщик, ДоговорУК FROM #RawPeniSaldo
    UNION
    SELECT Счет, [Номер услуги], Поставщик, ДоговорУК FROM #PeniNl
) AS AllPeniSources;

-- 6c. Декартово произведение пени × месяцы
CREATE TABLE #PeniGrid (
    Счет INT,
    [Номер услуги] INT,
    Поставщик INT,
    ДоговорУК INT,
    [Месяц расчета] DATE,
    ИсхСальдо_факт FLOAT
);

INSERT INTO #PeniGrid
SELECT 
    ac.Счет,
    ac.[Номер услуги],
    ac.Поставщик,
    ac.ДоговорУК,
    am.[Месяц расчета],
    NULL
FROM #AllPeniCombos ac
CROSS JOIN #AllMonths am;

UPDATE pg
SET pg.ИсхСальдо_факт = rs.ИсхСальдо
FROM #PeniGrid pg
INNER JOIN #RawPeniSaldo rs 
    ON pg.Счет = rs.Счет 
    AND pg.[Номер услуги] = rs.[Номер услуги]
    AND pg.Поставщик = rs.Поставщик
    AND pg.ДоговорУК = rs.ДоговорУК
    AND pg.[Месяц расчета] = rs.[Месяц расчета];

-- 6d. PeniBalances
CREATE TABLE #PeniBalances (
    Счет INT,
    [Месяц расчета] DATE,
    [Номер услуги] INT,
    Поставщик INT,
    ДоговорУК INT,
    ПениВхСальдо FLOAT,
    ПениИсхСальдо FLOAT
);

INSERT INTO #PeniBalances (Счет, [Месяц расчета], [Номер услуги], Поставщик, ДоговорУК, 
                           ПениВхСальдо, ПениИсхСальдо)
SELECT 
    pg.Счет,
    pg.[Месяц расчета],
    pg.[Номер услуги],
    pg.Поставщик,
    pg.ДоговорУК,
    ISNULL(
        (SELECT TOP 1 pg2.ИсхСальдо_факт
         FROM #PeniGrid pg2
         WHERE pg2.Счет = pg.Счет
           AND pg2.[Номер услуги] = pg.[Номер услуги]
           AND pg2.[Месяц расчета] = DATEADD(MONTH, -1, pg.[Месяц расчета])
        ), 0) AS ПениВхСальдо,
    ISNULL(pg.ИсхСальдо_факт, 0) AS ПениИсхСальдо
FROM #PeniGrid pg
WHERE pg.[Месяц расчета] BETWEEN @dstart AND @dfinal;
-- ============================================
-- 7. Финальный запрос (исправленный)
-- ============================================
WITH FullFinal AS (
    SELECT 
        mb.[Месяц расчета],
        mb.Поставщик,
        mb.ДоговорУК,
        mb.Счет,
        fnd.ЛС,
        mb.[Номер услуги],
        tu.Название AS [Название услуги],
        mb.ВхСальдо,
        mb.ВхОбъем,
        ISNULL(nu.Начислено, 0) AS Начислено,
        ISNULL(nu.НачисленоОбъем, 0) AS НачисленоОбъем,
        ISNULL(nu.Перерасчет, 0) AS Перерасчет,
        ISNULL(nu.ПерерасчетОбъем, 0) AS ПерерасчетОбъем,
        mb.ИсхСальдо,
        mb.ИсхОбъем,
        0 AS ПениВх,
        0 AS ПениНач,
        0 AS ПениИсх,
        0 AS IsPeni
    FROM #MonthlyBalances mb
    JOIN #Accounts fnd ON fnd.Счет = mb.Счет
    LEFT JOIN #NchUsl nu ON mb.Счет = nu.Счет 
        AND mb.[Месяц расчета] = nu.[Месяц расчета] 
        AND mb.[Номер услуги] = nu.[Номер услуги]
    LEFT JOIN [stack].[Типы услуг] tu ON tu.[Номер услуги] = mb.[Номер услуги]
    
    UNION ALL
    
    SELECT 
        pb.[Месяц расчета],
        pb.Поставщик,
        pb.ДоговорУК,
        pb.Счет,
        fnd.ЛС,
        pb.[Номер услуги],
        ''Пени'' AS [Название услуги],
        0 AS ВхСальдо,
        0 AS ВхОбъем,
        0 AS Начислено,           -- Очищаем
        0 AS НачисленоОбъем,      -- Очищаем
        0 AS Перерасчет,          -- Очищаем
        0 AS ПерерасчетОбъем,     -- Очищаем
        0 AS ИсхСальдо,
        0 AS ИсхОбъем,
        pb.ПениВхСальдо AS ПениВх,
        ISNULL(pn.ПениНач, 0) AS ПениНач,
        pb.ПениИсхСальдо AS ПениИсх,
        1 AS IsPeni
    FROM #PeniBalances pb
    JOIN #Accounts fnd ON fnd.Счет = pb.Счет
    LEFT JOIN #PeniNl pn ON pn.Счет = pb.Счет 
        AND pn.[Месяц расчета] = pb.[Месяц расчета] 
        AND pn.[Номер услуги] = pb.[Номер услуги]
)
, Params AS (
    SELECT 
        fn.Счет,    
        MAX(CASE WHEN vp.Название = ''ЮРЛИЦО'' THEN sv.Значение END) AS ЮРЛИЦО,
        MAX(CASE WHEN vp.Название = ''ПУСТУЮЩАЯ'' THEN sv.Значение END) AS ПУСТУЮЩАЯ,
        MAX(CASE WHEN vp.Название = ''СОСТОЯНИЕ'' THEN sv.Значение END) AS СОСТОЯНИЕ
    FROM FullFinal fn
    LEFT JOIN [stack].[Лицевые иерархия] lh ON lh.Потомок = fn.Счет
    LEFT JOIN [stack].[Виды параметров] vp ON vp.Название IN (''ЮРЛИЦО'', ''ПУСТУЮЩАЯ'',''СОСТОЯНИЕ'')
    LEFT JOIN [stack].[Свойства] sv ON sv.[Виды-Параметры] = vp.row_id 
        AND sv.[Счет-параметры] = lh.Родитель 
        AND @dfinal BETWEEN sv.ДатНач AND sv.ДатКнц 
        AND sv.Значение IS NOT NULL
    GROUP BY fn.Счет
)
SELECT 
    CONVERT(VARCHAR(7), f.[Месяц расчета], 126) AS Месяц,
    adr.Район,
    adr.Участок,
    adr.МР,
    adr.НП,
    adr.ПлСтр,
    adr.Улица,
    adr.Дом,
    adr.Квартира,
    adr.Комната,
    CONCAT(adr.НП,'', '', adr.Улица, '', д.'', ltrim(adr.Дом), '', кв.'', ltrim(adr.Квартира), IIF(adr.Комната='''','''','',комната ''+adr.Комната)) Адрес,
    IIF(f.[Поставщик] < 0, ''Не указан'', CONCAT(''['', f.[Поставщик], ''] '', pst.Название)) AS [Поставщик],
    IIF(f.[ДоговорУК] < 0, ''Не указан'', CONCAT(''['', f.[ДоговорУК], ''] '', duk.Название)) AS [ДоговорУК],
    f.Счет,
    f.ЛС,
    CASE prm.[СОСТОЯНИЕ] 
        WHEN 0 THEN ''Используется'' 
        WHEN 1 THEN ''Не проживает'' 
        WHEN 2 THEN ''Закрыт'' 
        ELSE '''' 
    END AS СОСТОЯНИЕ,
    CASE prm.[ЮРЛИЦО] 
        WHEN 0 THEN ''Нет'' 
        WHEN 1 THEN ''Без расчета'' 
        WHEN 2 THEN ''С расчетом'' 
        ELSE '''' 
    END AS ЮРЛИЦО,
    CASE prm.[ПУСТУЮЩАЯ] 
        WHEN 0 THEN ''Нет'' 
        WHEN 1 THEN ''Без расчета'' 
        WHEN 2 THEN ''Перерасчет'' 
        ELSE '''' 
    END AS ПУСТУЮЩАЯ,
    grpusl.[Группа услуг],
    CONCAT(''['', f.[Номер услуги], ''] '', f.[Название услуги]) AS [Услуга],
    f.[Номер услуги],
    f.[Название услуги],
    -- Деньги (2 знака)
    CAST(ROUND(ISNULL(f.ВхСальдо, 0), 2) AS DECIMAL(18,2)) AS ВхСальдо,
    CAST(ROUND(ISNULL(f.Начислено, 0), 2) AS DECIMAL(18,2)) AS Начислено,
    CAST(ROUND(ISNULL(f.Перерасчет, 0), 2) AS DECIMAL(18,2)) AS Перерасчет,
    CAST(ROUND(ISNULL(f.Начислено, 0) + ISNULL(f.Перерасчет, 0), 2) AS DECIMAL(18,2)) AS [ФактНач],
    CAST(ROUND(ISNULL(f.ВхСальдо, 0) + ISNULL(f.Начислено, 0) + ISNULL(f.Перерасчет, 0) - ISNULL(f.ИсхСальдо, 0), 2) AS DECIMAL(18,2)) AS Оплата,
    CAST(ROUND(ISNULL(f.ИсхСальдо, 0), 2) AS DECIMAL(18,2)) AS ИсхСальдо,
    -- Объемы (4 знака)
    CAST(ROUND(ISNULL(f.ВхОбъем, 0), 4) AS DECIMAL(18,4)) AS ВхОбъем,
    CAST(ROUND(ISNULL(f.НачисленоОбъем, 0), 4) AS DECIMAL(18,4)) AS НачисленоОбъем,
    CAST(ROUND(ISNULL(f.ПерерасчетОбъем, 0), 4) AS DECIMAL(18,4)) AS ПерерасчетОбъем,
    CAST(ROUND(ISNULL(f.НачисленоОбъем, 0) + ISNULL(f.ПерерасчетОбъем, 0), 4) AS DECIMAL(18,4)) AS [ФактНачОбъем],    
    CAST(ROUND(ISNULL(f.ИсхОбъем, 0), 4) AS DECIMAL(18,4)) AS ИсхОбъем,
    -- Пени (2 знака)
    CAST(ROUND(ISNULL(f.ПениВх, 0), 2) AS DECIMAL(18,2)) AS ПениВх,
    CAST(ROUND(ISNULL(f.ПениНач, 0), 2) AS DECIMAL(18,2)) AS ПениНач,
    CAST(ROUND(ISNULL(f.ПениВх, 0) + ISNULL(f.ПениНач, 0) - ISNULL(f.ПениИсх, 0), 2) AS DECIMAL(18,2)) AS ПениОплата,
    CAST(ROUND(ISNULL(f.ПениИсх, 0), 2) AS DECIMAL(18,2)) AS ПениИсх
FROM FullFinal f
LEFT JOIN Params prm ON prm.Счет = f.Счет
OUTER APPLY (
    SELECT TOP(1) CONCAT(''['', tu.[Номер услуги], ''] '', tu.Название) [Группа услуг]
    FROM [stack].[Типы услуг иерархия] ti
    JOIN [stack].[Типы услуг] tu ON tu.ROW_ID = ti.Родитель
    WHERE ti.[ПотомокНомер] = f.[Номер услуги] 
        AND ti.РодительТип = 2
) grpusl
OUTER APPLY (
    SELECT Название 
    FROM [stack].[Организации] org 
    WHERE org.ROW_ID = f.Поставщик
) pst
OUTER APPLY (
    SELECT org.Название 
    FROM [stack].[УК Договоры] ukd 
    JOIN [stack].[Организации] org ON org.ROW_ID = ukd.[Организация-УКДоговор]
    WHERE ukd.ROW_ID = f.ДоговорУК
) duk
CROSS APPLY stack.AddrLs_Table(f.Счет, 0) adr
WHERE f.[Месяц расчета] BETWEEN @dstart AND @dfinal
    AND NOT (
        f.IsPeni = 1 
        AND ISNULL(f.ПениВх, 0) = 0 
        AND ISNULL(f.ПениНач, 0) = 0 
        AND ISNULL(f.ПениВх, 0) + ISNULL(f.ПениНач, 0) - ISNULL(f.ПениИсх, 0) = 0 
        AND ISNULL(f.ПениИсх, 0) = 0
    )
ORDER BY adr.НП, adr.Улица, adr.Дом, adr.Квартира
OPTION (MAXDOP 0, RECOMPILE);
' AS query_text, CAST(N'{"fields":{"statistic":[{"dataField":"Исполнено"},{"dataField":"Время"},{"dataField":"Записей"},{"dataField":"Фильтры"}],"grid":[{"dataField":"Месяц"},{"caption":"Адрес","columns":[{"dataField":"Район"},{"dataField":"Участок"},{"dataField":"НП"},{"dataField":"Улица"},{"dataField":"Дом"},{"dataField":"Квартира"},{"dataField":"Комната"}]},{"dataField":"Поставщик"},{"dataField":"ДоговорУК"},{"dataField":"ЛС","dataType":"number","format":{"type":"fixedPoint","precision":0}},{"dataField":"СОСТОЯНИЕ"},{"dataField":"ЮРЛИЦО"},{"dataField":"ПУСТУЮЩАЯ"},{"dataField":"Группа услуг"},{"dataField":"Услуга"},{"caption":"Обороты","columns":[{"dataField":"ВхСальдо"},{"dataField":"Начислено"},{"dataField":"Перерасчет"},{"dataField":"ФактНач"},{"dataField":"Оплата"},{"dataField":"ИсхСальдо"}]},{"caption":"Объемы","columns":[{"caption":"ВхОбъем","dataField":"ВхОбъем","dataType":"number","summaryType":"sum","format":{"type":"fixedPoint","precision":4}},{"caption":"НачисленоОбъем","dataField":"НачисленоОбъем","dataType":"number","summaryType":"sum","format":{"type":"fixedPoint","precision":4}},{"caption":"ПерерасчетОбъем","dataField":"ПерерасчетОбъем","dataType":"number","summaryType":"sum","format":{"type":"fixedPoint","precision":4}},{"caption":"ФактНачОбъем","dataField":"ФактНачОбъем","dataType":"number","summaryType":"sum","format":{"type":"fixedPoint","precision":4}},{"caption":"ИсхОбъем","dataField":"ИсхОбъем","dataType":"number","summaryType":"sum","format":{"type":"fixedPoint","precision":4}}]},{"caption":"Пени","columns":[{"caption":"ПениВх","dataField":"ПениВх","dataType":"number","summaryType":"sum","format":{"type":"fixedPoint","precision":2}},{"caption":"ПениНач","dataField":"ПениНач","dataType":"number","summaryType":"sum","format":{"type":"fixedPoint","precision":2}},{"caption":"ПениОплата","dataField":"ПениОплата","dataType":"number","summaryType":"sum","format":{"type":"fixedPoint","precision":2}},{"caption":"ПениИсх","dataField":"ПениИсх","dataType":"number","summaryType":"sum","format":{"type":"fixedPoint","precision":2}}]}],"pivot":[{"dataField":"Месяц","area":"column"},{"dataField":"Район","area":"filter","expanded":true},{"dataField":"Участок","area":"filter","expanded":true},{"dataField":"НП","area":"row","expanded":true},{"dataField":"Улица","area":"row","expanded":true},{"dataField":"Дом","area":"row","expanded":true},{"dataField":"Квартира","area":"filter","expanded":true},{"dataField":"Комната","area":"filter","expanded":true},{"caption":"Адрес","dataField":"Адрес","area":"filter","expanded":true,"width":5},{"caption":"ЛС","dataField":"ЛС","area":"filter","expanded":true,"width":10},{"caption":"СОСТОЯНИЕ","dataField":"СОСТОЯНИЕ","area":"filter","expanded":true},{"caption":"ЮРЛИЦО","dataField":"ЮРЛИЦО","area":"filter","expanded":true,"width":2},{"caption":"ПУСТУЮЩАЯ","dataField":"ПУСТУЮЩАЯ","area":"filter","expanded":true,"width":2},{"dataField":"ДоговорУК","area":"filter","expanded":true},{"dataField":"Поставщик","area":"filter","expanded":true},{"dataField":"Группа услуг","area":"filter","expanded":true},{"dataField":"Название услуги","area":"filter","expanded":true},{"dataField":"Услуга","area":"filter","expanded":true},{"dataField":"Номер услуги","area":"row","expanded":true},{"caption":"ВхСальдо","dataField":"ВхСальдо","dataType":"number","summaryType":"sum","format":{"type":"fixedPoint","precision":2},"area":"data"},{"caption":"Начислено","dataField":"Начислено","dataType":"number","summaryType":"sum","format":{"type":"fixedPoint","precision":2},"area":"data"},{"caption":"Перерасчет","dataField":"Перерасчет","dataType":"number","summaryType":"sum","format":{"type":"fixedPoint","precision":2},"area":"data"},{"caption":"ФактНач","dataField":"ФактНач","dataType":"number","summaryType":"sum","format":{"type":"fixedPoint","precision":2},"area":"data"},{"caption":"Оплата","dataField":"Оплата","dataType":"number","summaryType":"sum","format":{"type":"fixedPoint","precision":2},"area":"data"},{"caption":"ИсхСальдо","dataField":"ИсхСальдо","dataType":"number","summaryType":"sum","format":{"type":"fixedPoint","precision":2},"area":"data"},{"caption":"ВхОбъем","dataField":"ВхОбъем","dataType":"number","summaryType":"sum","format":{"type":"fixedPoint","precision":4},"area":"data"},{"caption":"НачисленоОбъем","dataField":"НачисленоОбъем","dataType":"number","summaryType":"sum","format":{"type":"fixedPoint","precision":4},"area":"data"},{"caption":"ПерерасчетОбъем","dataField":"ПерерасчетОбъем","dataType":"number","summaryType":"sum","format":{"type":"fixedPoint","precision":4},"area":"data"},{"caption":"ФактНачОбъем","dataField":"ФактНачОбъем","dataType":"number","summaryType":"sum","format":{"type":"fixedPoint","precision":4},"area":"data"},{"caption":"ИсхОбъем","dataField":"ИсхОбъем","dataType":"number","summaryType":"sum","format":{"type":"fixedPoint","precision":4},"area":"data"},{"caption":"ПениВх","dataField":"ПениВх","dataType":"number","summaryType":"sum","format":{"type":"fixedPoint","precision":2},"area":"data"},{"caption":"ПениНач","dataField":"ПениНач","dataType":"number","summaryType":"sum","format":{"type":"fixedPoint","precision":2},"area":"data"},{"caption":"ПениОплата","dataField":"ПениОплата","dataType":"number","summaryType":"sum","format":{"type":"fixedPoint","precision":2},"area":"data"},{"caption":"ПениИсх","dataField":"ПениИсх","dataType":"number","summaryType":"sum","format":{"type":"fixedPoint","precision":2},"area":"data"}]},"filters":{"ФОНД":[],"УК":[],"ПОСТ":[],"ПериодМесяцы":{}},"views":["pivot","grid"],"processing":"server","description":"ОСВ за произвольный период — остатки и обороты по счетам.","mandatory":["ФОНД","ПериодМесяцы"]}' AS NVARCHAR(MAX)) AS config, 0 AS is_section, 1 AS sort_order) AS src
   ON target.report_key = src.report_key
WHEN MATCHED THEN UPDATE SET title = src.title, icon = src.icon, image = src.image,
    query_text = src.query_text, config = src.config, parent_id = src.parent_id,
    is_section = src.is_section, sort_order = src.sort_order, is_deleted = 0,
    updated_at = SYSUTCDATETIME()
WHEN NOT MATCHED THEN INSERT (report_key, parent_id, title, icon, image, query_text,
    config, is_section, sort_order)
    VALUES (src.report_key, src.parent_id, src.title, src.icon, src.image,
    src.query_text, src.config, src.is_section, src.sort_order);
GO
MERGE dbo.reports AS target
USING (SELECT N'RPT_1103' AS report_key, (SELECT id FROM dbo.reports WHERE report_key = N'КТР') AS parent_id, N'КТР за год 2025 (ЛС)' AS title, N'chart' AS icon, N'' AS image, N'
SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED
SET NOCOUNT ON;
DECLARE @year INT=2025;
WITH AreaLS AS (
	SELECT ls.ROW_ID Счет, ls.Тип, ls.Номер ,adr.*
	FROM stack.[Лицевые счета] ls
        JOIN ( SELECT DISTINCT Потомок FROM [stack].[Лицевые иерархия] WHERE ПотомокТип = 5 AND Родитель IN ({ФОНД})) li ON li.Потомок=ls.ROW_ID	
        CROSS APPLY stack.AddrLs_Table(ls.ROW_ID, 0) adr
),
ParamData AS (
    SELECT ls.Счет,	
        MAX(CASE WHEN vp.Название = ''ЮРЛИЦО'' THEN ISNULL(sv.Значение,-1) END) AS [ЮРЛИЦО],
        MAX(CASE WHEN vp.Название = ''ПУСТУЮЩАЯ'' THEN ISNULL(sv.Значение,-1) END) AS [ПУСТУЮЩАЯ],
        MAX(CASE WHEN vp.Название = ''СОСТОЯНИЕ'' THEN ISNULL(sv.Значение,-1) END) AS [СОСТОЯНИЕ],
	MAX(CASE WHEN vp.Название = ''СОСТОЯНИЕ'' THEN sv.ДатНач END) AS [НАЧАЛО],
    	MAX(CASE WHEN vp.Название = ''СОСТОЯНИЕ'' THEN sv.ДатКнц END) AS [ОКОНЧАНИЕ],
        MAX(CASE WHEN vp.Название = ''ТИПОТОП'' THEN ISNULL(sv.Значение,-1) END) AS [ТИПОТОП],		
        MAX(CASE WHEN vp.Название = ''КОМНАТЫ'' THEN ISNULL(sv.Значение,-1) END) AS [КОМНАТЫ],
	MAX(CASE WHEN vp.Название = ''ГОР_СЕЛО'' THEN ISNULL(sv.Значение,-1) END) AS [ГОР_СЕЛО],
        MAX(CASE WHEN vp.Название = ''ТИПСТРОЙ'' THEN ISNULL(sv.Значение,-1) END) AS [ТИПСТРОЙ],
        MAX(CASE WHEN vp.Название = ''ТИППЛИТЫ'' THEN ISNULL(sv.Значение,-1) END) AS [ТИППЛИТЫ],
        MAX(CASE WHEN vp.Название = ''СПОДМДСЕМ'' THEN ISNULL(sv.Значение,-1) END) AS [СПОДМДСЕМ]
    FROM AreaLS ls
    LEFT JOIN stack.[Лицевые иерархия] lh ON lh.Потомок = ls.Счет
    LEFT JOIN stack.[Виды параметров] vp ON vp.Название IN (''ЮРЛИЦО'', ''ПУСТУЮЩАЯ'', ''СОСТОЯНИЕ'',''ТИПОТОП'',''ГОР_СЕЛО'',''ТИПСТРОЙ'',''ТИППЛИТЫ'',''СПОДМДСЕМ'') 
    LEFT JOIN stack.[Свойства] sv ON sv.[Виды-Параметры] = vp.row_id AND sv.[Счет-параметры] = lh.Родитель AND GETDATE() BETWEEN sv.ДатНач AND sv.ДатКнц AND sv.Значение IS NOT NULL
    GROUP BY ls.Счет
),
ovn AS (
SELECT 
    [УК],
    [Поставщик],
    [Счет],
    [Услуга],
    [Аналитика],
    -- Объемы по месяцам
    SUM(CASE WHEN [Месяц] = ''2025-01'' THEN [Объем] ELSE 0 END) AS [2025-01_Объем],
    SUM(CASE WHEN [Месяц] = ''2025-02'' THEN [Объем] ELSE 0 END) AS [2025-02_Объем],
    SUM(CASE WHEN [Месяц] = ''2025-03'' THEN [Объем] ELSE 0 END) AS [2025-03_Объем],
    SUM(CASE WHEN [Месяц] = ''2025-04'' THEN [Объем] ELSE 0 END) AS [2025-04_Объем],
    SUM(CASE WHEN [Месяц] = ''2025-05'' THEN [Объем] ELSE 0 END) AS [2025-05_Объем],
    SUM(CASE WHEN [Месяц] = ''2025-06'' THEN [Объем] ELSE 0 END) AS [2025-06_Объем],
    SUM(CASE WHEN [Месяц] = ''2025-07'' THEN [Объем] ELSE 0 END) AS [2025-07_Объем],
    SUM(CASE WHEN [Месяц] = ''2025-08'' THEN [Объем] ELSE 0 END) AS [2025-08_Объем],
    SUM(CASE WHEN [Месяц] = ''2025-09'' THEN [Объем] ELSE 0 END) AS [2025-09_Объем],
    SUM(CASE WHEN [Месяц] = ''2025-10'' THEN [Объем] ELSE 0 END) AS [2025-10_Объем],
    SUM(CASE WHEN [Месяц] = ''2025-11'' THEN [Объем] ELSE 0 END) AS [2025-11_Объем],
    SUM(CASE WHEN [Месяц] = ''2025-12'' THEN [Объем] ELSE 0 END) AS [2025-12_Объем],
    -- Суммы по месяцам
    SUM(CASE WHEN [Месяц] = ''2025-01'' THEN [Сумма] ELSE 0 END) AS [2025-01_Сумма],
    SUM(CASE WHEN [Месяц] = ''2025-02'' THEN [Сумма] ELSE 0 END) AS [2025-02_Сумма],
    SUM(CASE WHEN [Месяц] = ''2025-03'' THEN [Сумма] ELSE 0 END) AS [2025-03_Сумма],
    SUM(CASE WHEN [Месяц] = ''2025-04'' THEN [Сумма] ELSE 0 END) AS [2025-04_Сумма],
    SUM(CASE WHEN [Месяц] = ''2025-05'' THEN [Сумма] ELSE 0 END) AS [2025-05_Сумма],
    SUM(CASE WHEN [Месяц] = ''2025-06'' THEN [Сумма] ELSE 0 END) AS [2025-06_Сумма],
    SUM(CASE WHEN [Месяц] = ''2025-07'' THEN [Сумма] ELSE 0 END) AS [2025-07_Сумма],
    SUM(CASE WHEN [Месяц] = ''2025-08'' THEN [Сумма] ELSE 0 END) AS [2025-08_Сумма],
    SUM(CASE WHEN [Месяц] = ''2025-09'' THEN [Сумма] ELSE 0 END) AS [2025-09_Сумма],
    SUM(CASE WHEN [Месяц] = ''2025-10'' THEN [Сумма] ELSE 0 END) AS [2025-10_Сумма],
    SUM(CASE WHEN [Месяц] = ''2025-11'' THEN [Сумма] ELSE 0 END) AS [2025-11_Сумма],
    SUM(CASE WHEN [Месяц] = ''2025-12'' THEN [Сумма] ELSE 0 END) AS [2025-12_Сумма]
FROM
(
    SELECT 
        org.Наименование AS [УК],
        pst.Название AS [Поставщик],
        nl.Счет,
        nl.[Номер услуги] AS [Услуга],
        CASE nl.[Аналитика2]
            WHEN -1 THEN ''по показанию''
            WHEN 47 THEN ''по нормативу''
            WHEN 49 THEN ''замещение по среднему''
            WHEN 51 THEN ''временное отсутствие''
            WHEN 84 THEN ''ОКПУ''
            WHEN 85 THEN ''ОКПУ''
            WHEN 86 THEN ''ОКПУ''
            WHEN 149 THEN ''по среднему (снят ПУ)''
            WHEN 549 THEN ''замещение по норме''
            WHEN 4001 THEN ''по показанию''
            WHEN 777 THEN ''проценты по рассрочке платежа''
            WHEN 910 THEN ''услуги по СОИМД''
            WHEN 551 THEN ''временное отсутствие по счетчику''
            ELSE ''''
        END AS [Аналитика],
        CONVERT(VARCHAR(7), nl.[Месяц расчета], 120) AS [Месяц],
        nl.[Объем],
        nl.[Сумма]
    FROM [stack].[Начисления лицевых] nl
    JOIN [stack].Организации pst ON pst.ROW_ID = nl.Поставщик
    JOIN [stack].[УК Договоры] uk ON uk.ROW_ID = nl.ДоговорУК
    JOIN [stack].Организации org ON org.ROW_ID = uk.[Организация-УКДоговор]
    WHERE YEAR(nl.[Месяц расчета]) = 2025
        AND nl.[Номер услуги] < 1000
) AS SourceData
GROUP BY 
    [УК], 
    [Поставщик], 
    [Счет], 
    [Услуга], 
    [Аналитика]
)
SELECT 
2025 ''Год''
, als.Номер
, als.Район
, als.Участок
, als.НП
, als.Улица
, als.Дом
, als.Квартира
, als.Комната
, ovn.УК
, ovn.Поставщик
, ovn.Счет
, ovn.Услуга
, ovn.Аналитика,
 -- Объемы по месяцам
ISNULL(ovn.[2025-01_Объем], 0) AS [2025-01_Объем],
ISNULL(ovn.[2025-02_Объем], 0) AS [2025-02_Объем],
ISNULL(ovn.[2025-03_Объем], 0) AS [2025-03_Объем],
ISNULL(ovn.[2025-04_Объем], 0) AS [2025-04_Объем],
ISNULL(ovn.[2025-05_Объем], 0) AS [2025-05_Объем],
ISNULL(ovn.[2025-06_Объем], 0) AS [2025-06_Объем],
ISNULL(ovn.[2025-07_Объем], 0) AS [2025-07_Объем],
ISNULL(ovn.[2025-08_Объем], 0) AS [2025-08_Объем],
ISNULL(ovn.[2025-09_Объем], 0) AS [2025-09_Объем],
ISNULL(ovn.[2025-10_Объем], 0) AS [2025-10_Объем],
ISNULL(ovn.[2025-11_Объем], 0) AS [2025-11_Объем],
ISNULL(ovn.[2025-12_Объем], 0) AS [2025-12_Объем],
-- Суммы по месяцам
ISNULL(ovn.[2025-01_Сумма], 0) AS [2025-01_Сумма],
ISNULL(ovn.[2025-02_Сумма], 0) AS [2025-02_Сумма],
ISNULL(ovn.[2025-03_Сумма], 0) AS [2025-03_Сумма],
ISNULL(ovn.[2025-04_Сумма], 0) AS [2025-04_Сумма],
ISNULL(ovn.[2025-05_Сумма], 0) AS [2025-05_Сумма],
ISNULL(ovn.[2025-06_Сумма], 0) AS [2025-06_Сумма],
ISNULL(ovn.[2025-07_Сумма], 0) AS [2025-07_Сумма],
ISNULL(ovn.[2025-08_Сумма], 0) AS [2025-08_Сумма],
ISNULL(ovn.[2025-09_Сумма], 0) AS [2025-09_Сумма],
ISNULL(ovn.[2025-10_Сумма], 0) AS [2025-10_Сумма],
ISNULL(ovn.[2025-11_Сумма], 0) AS [2025-11_Сумма],
ISNULL(ovn.[2025-12_Сумма], 0) AS [2025-12_Сумма]
, ISNULL(ols.C_1_Т,0) C_1_Т
, ISNULL(ols.C_2_Т,0) C_2_Т
, ISNULL(ols.C_3_Т,0) C_3_Т
, CASE  prm.ЮРЛИЦО WHEN -1 THEN ''Нет параметра'' WHEN 0 THEN ''(Не указано)'' WHEN 1 THEN  ''Без расчета'' WHEN 2 THEN  ''С расчетом'' ELSE ''Нет параметра'' END ЮРЛИЦО
, CASE  prm.ПУСТУЮЩАЯ WHEN -1 THEN ''Нет параметра'' WHEN 0  THEN  ''Нет'' WHEN 1 THEN  ''Без расчета'' WHEN 2 THEN  ''Перерасчет'' ELSE ''Нет параметра'' END ПУСТУЮЩАЯ
, CASE prm.ГОР_СЕЛО WHEN 0 THEN ''Село'' WHEN 1 THEN ''Город'' WHEN 2 THEN ''Приравненные'' ELSE ''Нет параметра'' END ГОР_СЕЛО
, CASE prm.СОСТОЯНИЕ WHEN 0 THEN ''Используется'' WHEN 1 THEN  ''Не проживает'' WHEN 2  THEN  ''Закрыт'' ELSE ''Нет параметра'' END СОСТОЯНИЕ
, FORMAT(prm.НАЧАЛО,''yyyy MMMM dd'',''ru'') НАЧАЛО
, FORMAT(prm.ОКОНЧАНИЕ,''yyyy MMMM dd'',''ru'') ОКОНЧАНИЕ
, CASE prm.ТИПОТОП WHEN 0 THEN ''(Не указано)'' WHEN 1 THEN  ''Центральное'' WHEN 2 THEN  ''Инд. газовый нагревательный прибор'' WHEN 3 THEN  ''Инд. электронагревательный прибор'' WHEN 4 THEN  ''Общ. газовый нагревательный прибор'' WHEN 5 THEN  ''Общ. электронагревательный прибор'' WHEN 6 THEN  ''На твердом топливе'' WHEN 7 THEN  ''Электрическое (Чистый воздух)'' ELSE ''Нет параметра'' END ТИПОТОП
, CASE prm.СПОДМДСЕМ WHEN 0 THEN ''Нет'' WHEN 1 THEN  ''Да'' ELSE ''Нет параметра'' END СПОДМДСЕМ
, CASE prm.ТИППЛИТЫ WHEN 0 THEN ''Без указания'' WHEN 1 THEN ''Газовые'' WHEN 2 THEN ''Электрические'' WHEN 3 THEN ''На тв.топливе'' ELSE ''Нет параметра'' END ТИППЛИТЫ
, CASE prm.ТИПСТРОЙ 
	  WHEN 0 THEN ''Многоквартирный''
	  WHEN 1 THEN ''Частный''
	  WHEN 2 THEN ''Общежитие''
	  WHEN 3 THEN ''Дача''
	  WHEN 4 THEN ''Гараж''
	  WHEN 5 THEN ''Баня''
	  WHEN 6 THEN ''Сарай''
	  WHEN 7 THEN ''Прочие''
	  WHEN 8 THEN ''Хозпостройка''
	  WHEN 9 THEN ''Земельный участок''
	  ELSE ''Нет параметра'' 
END ТИПСТРОЙ
FROM AreaLS als
JOIN ovn ovn ON als.Счет=ovn.Счет
LEFT JOIN ParamData prm ON als.Счет=prm.Счет
LEFT JOIN (
    SELECT 
        Счет,
        MAX(CASE WHEN rn = 1 THEN [Тарифность] END) AS C_1_Т,
        MAX(CASE WHEN rn = 2 THEN [Тарифность] END) AS C_2_Т,
        MAX(CASE WHEN rn = 3 THEN [Тарифность] END) AS C_3_Т
		FROM (
        SELECT 
            Счет,
            [Тарифность],
            [ЗаводскойНомер],
            ROW_NUMBER() OVER (PARTITION BY Счет ORDER BY ДатНач DESC) AS rn
        FROM [stack].[Объекты лицевого]
        WHERE [Услуга] = 1790 AND YEAR(ДатНач)=@year AND YEAR(ДатКнц)=@year AND Тип IN (''ИПУ'',''ОКПУ'') 
    ) t
    WHERE rn <= 3
    GROUP BY Счет
) ols ON ols.Счет = als.Счет
' AS query_text, CAST(N'{"fields":{"statistic":[{"dataField":"Исполнено"},{"dataField":"Время"},{"dataField":"Записей"},{"dataField":"Фильтры"}],"grid":[{"caption":"Филиал","dataField":"Филиал"},{"dataField":"Год"},{"dataField":"Номер"},{"dataField":"Район"},{"dataField":"Участок"},{"dataField":"НП"},{"dataField":"Улица"},{"dataField":"Дом"},{"dataField":"Квартира"},{"dataField":"УК"},{"dataField":"Поставщик"},{"dataField":"Услуга"},{"dataField":"Аналитика"},{"dataField":"СОСТОЯНИЕ"},{"dataField":"НАЧАЛО"},{"dataField":"ОКОНЧАНИЕ"},{"dataField":"ЮРЛИЦО"},{"dataField":"ПУСТУЮЩАЯ"},{"dataField":"ГОР_СЕЛО"},{"dataField":"ТИППЛИТЫ"},{"dataField":"ТИПСТРОЙ"},{"dataField":"ТИПОТОП"},{"dataField":"СПОДМДСЕМ"},{"dataField":"C_1_Т"},{"dataField":"C_2_Т"},{"dataField":"C_3_Т"},{"dataField":"2025-01_Объем","format":{"type":"fixedPoint","precision":3}},{"dataField":"2025-02_Объем","format":{"type":"fixedPoint","precision":3}},{"dataField":"2025-03_Объем","format":{"type":"fixedPoint","precision":3}},{"dataField":"2025-04_Объем","format":{"type":"fixedPoint","precision":3}},{"dataField":"2025-05_Объем","format":{"type":"fixedPoint","precision":3}},{"dataField":"2025-06_Объем","format":{"type":"fixedPoint","precision":3}},{"dataField":"2025-07_Объем","format":{"type":"fixedPoint","precision":3}},{"dataField":"2025-08_Объем","format":{"type":"fixedPoint","precision":3}},{"dataField":"2025-09_Объем","format":{"type":"fixedPoint","precision":3}},{"dataField":"2025-10_Объем","format":{"type":"fixedPoint","precision":3}},{"dataField":"2025-11_Объем","format":{"type":"fixedPoint","precision":3}},{"dataField":"2025-12_Объем","format":{"type":"fixedPoint","precision":3}},{"dataField":"2025-01_Сумма","format":{"type":"fixedPoint","precision":2}},{"dataField":"2025-02_Сумма","format":{"type":"fixedPoint","precision":2}},{"dataField":"2025-03_Сумма","format":{"type":"fixedPoint","precision":2}},{"dataField":"2025-04_Сумма","format":{"type":"fixedPoint","precision":2}},{"dataField":"2025-05_Сумма","format":{"type":"fixedPoint","precision":2}},{"dataField":"2025-06_Сумма","format":{"type":"fixedPoint","precision":2}},{"dataField":"2025-07_Сумма","format":{"type":"fixedPoint","precision":2}},{"dataField":"2025-08_Сумма","format":{"type":"fixedPoint","precision":2}},{"dataField":"2025-09_Сумма","format":{"type":"fixedPoint","precision":2}},{"dataField":"2025-10_Сумма","format":{"type":"fixedPoint","precision":2}},{"dataField":"2025-11_Сумма","format":{"type":"fixedPoint","precision":2}},{"dataField":"2025-12_Сумма","format":{"type":"fixedPoint","precision":2}}],"pivot":[{"caption":"Филиал","dataField":"Филиал","area":"filter","expanded":true},{"dataField":"C_1_Т","area":"filter","expanded":true},{"dataField":"C_2_Т","area":"filter","expanded":true},{"dataField":"C_3_Т","area":"filter","expanded":true},{"dataField":"СОСТОЯНИЕ","area":"filter","expanded":true},{"dataField":"Услуга","area":"filter","expanded":true},{"dataField":"УК","area":"filter","expanded":true},{"dataField":"Поставщик","area":"filter","expanded":true},{"dataField":"Район","area":"filter","expanded":true},{"dataField":"Участок","area":"filter","expanded":true},{"dataField":"Улица","area":"filter","expanded":true},{"dataField":"Дом","area":"filter","expanded":true},{"dataField":"Квартира","area":"filter","expanded":true},{"dataField":"Год","area":"column","expanded":true},{"dataField":"ГОР_СЕЛО","area":"row","expanded":true},{"caption":"ЛС","dataField":"Номер","area":"row","expanded":true},{"dataField":"НП","area":"row","expanded":true},{"caption":"Адрес","area":"row","expanded":true,"width":10},{"dataField":"ТИПСТРОЙ","area":"row","expanded":true},{"dataField":"ТИППЛИТЫ","area":"row","expanded":true},{"dataField":"ТИПОТОП","area":"row","expanded":true},{"dataField":"СПОДМДСЕМ","area":"row","expanded":true},{"dataField":"Аналитика","area":"row","expanded":true},{"caption":"Сч.(Тарифность)","area":"row","expanded":true,"width":10},{"dataField":"ЮРЛИЦО","area":"row","expanded":true},{"dataField":"ПУСТУЮЩАЯ","area":"row","expanded":true},{"dataField":"2025-01_Объем","format":{"type":"fixedPoint","precision":3},"dataType":"number","summaryType":"sum","area":"data"},{"dataField":"2025-02_Объем","format":{"type":"fixedPoint","precision":3},"dataType":"number","summaryType":"sum","area":"data"},{"dataField":"2025-03_Объем","format":{"type":"fixedPoint","precision":3},"dataType":"number","summaryType":"sum","area":"data"},{"dataField":"2025-04_Объем","format":{"type":"fixedPoint","precision":3},"dataType":"number","summaryType":"sum","area":"data"},{"dataField":"2025-05_Объем","format":{"type":"fixedPoint","precision":3},"dataType":"number","summaryType":"sum","area":"data"},{"dataField":"2025-06_Объем","format":{"type":"fixedPoint","precision":3},"dataType":"number","summaryType":"sum","area":"data"},{"dataField":"2025-07_Объем","format":{"type":"fixedPoint","precision":3},"dataType":"number","summaryType":"sum","area":"data"},{"dataField":"2025-08_Объем","format":{"type":"fixedPoint","precision":3},"dataType":"number","summaryType":"sum","area":"data"},{"dataField":"2025-09_Объем","format":{"type":"fixedPoint","precision":3},"dataType":"number","summaryType":"sum","area":"data"},{"dataField":"2025-10_Объем","format":{"type":"fixedPoint","precision":3},"dataType":"number","summaryType":"sum","area":"data"},{"dataField":"2025-11_Объем","format":{"type":"fixedPoint","precision":3},"dataType":"number","summaryType":"sum","area":"data"},{"dataField":"2025-12_Объем","format":{"type":"fixedPoint","precision":3},"dataType":"number","summaryType":"sum","area":"data"},{"dataField":"2025-01_Сумма","format":{"type":"fixedPoint","precision":2},"dataType":"number","summaryType":"sum","area":"data"},{"dataField":"2025-02_Сумма","format":{"type":"fixedPoint","precision":2},"dataType":"number","summaryType":"sum","area":"data"},{"dataField":"2025-03_Сумма","format":{"type":"fixedPoint","precision":2},"dataType":"number","summaryType":"sum","area":"data"},{"dataField":"2025-04_Сумма","format":{"type":"fixedPoint","precision":2},"dataType":"number","summaryType":"sum","area":"data"},{"dataField":"2025-05_Сумма","format":{"type":"fixedPoint","precision":2},"dataType":"number","summaryType":"sum","area":"data"},{"dataField":"2025-06_Сумма","format":{"type":"fixedPoint","precision":2},"dataType":"number","summaryType":"sum","area":"data"},{"dataField":"2025-07_Сумма","format":{"type":"fixedPoint","precision":2},"dataType":"number","summaryType":"sum","area":"data"},{"dataField":"2025-08_Сумма","format":{"type":"fixedPoint","precision":2},"dataType":"number","summaryType":"sum","area":"data"},{"dataField":"2025-09_Сумма","format":{"type":"fixedPoint","precision":2},"dataType":"number","summaryType":"sum","area":"data"},{"dataField":"2025-10_Сумма","format":{"type":"fixedPoint","precision":2},"dataType":"number","summaryType":"sum","area":"data"},{"dataField":"2025-11_Сумма","format":{"type":"fixedPoint","precision":2},"dataType":"number","summaryType":"sum","area":"data"},{"dataField":"2025-12_Сумма","format":{"type":"fixedPoint","precision":2},"dataType":"number","summaryType":"sum","area":"data"}]},"filters":{"ФОНД":[]},"description":"КТР за год 2025 — итоговые показатели по лицевым счетам за год.","mandatory":["ФОНД"]}' AS NVARCHAR(MAX)) AS config, 0 AS is_section, 2 AS sort_order) AS src
   ON target.report_key = src.report_key
WHEN MATCHED THEN UPDATE SET title = src.title, icon = src.icon, image = src.image,
    query_text = src.query_text, config = src.config, parent_id = src.parent_id,
    is_section = src.is_section, sort_order = src.sort_order, is_deleted = 0,
    updated_at = SYSUTCDATETIME()
WHEN NOT MATCHED THEN INSERT (report_key, parent_id, title, icon, image, query_text,
    config, is_section, sort_order)
    VALUES (src.report_key, src.parent_id, src.title, src.icon, src.image,
    src.query_text, src.config, src.is_section, src.sort_order);
GO
MERGE dbo.reports AS target
USING (SELECT N'RPT_1203' AS report_key, (SELECT id FROM dbo.reports WHERE report_key = N'ОРН') AS parent_id, N'ОСВ [Период]' AS title, N'chart' AS icon, N'' AS image, N'
SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;
-- Безопасное удаление временных таблиц
IF OBJECT_ID(''tempdb..#Accounts'') IS NOT NULL DROP TABLE #Accounts;
IF OBJECT_ID(''tempdb..#FilteredData'') IS NOT NULL DROP TABLE #FilteredData;
IF OBJECT_ID(''tempdb..#AllMonths'') IS NOT NULL DROP TABLE #AllMonths;
IF OBJECT_ID(''tempdb..#AllCombos'') IS NOT NULL DROP TABLE #AllCombos;
IF OBJECT_ID(''tempdb..#RawSaldo'') IS NOT NULL DROP TABLE #RawSaldo;
IF OBJECT_ID(''tempdb..#SaldoGrid'') IS NOT NULL DROP TABLE #SaldoGrid;
IF OBJECT_ID(''tempdb..#MonthlyBalances'') IS NOT NULL DROP TABLE #MonthlyBalances;
IF OBJECT_ID(''tempdb..#NchUsl'') IS NOT NULL DROP TABLE #NchUsl;
IF OBJECT_ID(''tempdb..#PeniNl'') IS NOT NULL DROP TABLE #PeniNl;
IF OBJECT_ID(''tempdb..#RawPeniSaldo'') IS NOT NULL DROP TABLE #RawPeniSaldo;
IF OBJECT_ID(''tempdb..#AllPeniCombos'') IS NOT NULL DROP TABLE #AllPeniCombos;
IF OBJECT_ID(''tempdb..#PeniGrid'') IS NOT NULL DROP TABLE #PeniGrid;
IF OBJECT_ID(''tempdb..#PeniBalances'') IS NOT NULL DROP TABLE #PeniBalances;
-- Параметры
DECLARE @dstart DATE = {ПериодМесяцы_start};
DECLARE @dfinal DATE = {ПериодМесяцы_end};
DECLARE @dstart_saldo DATE = DATEADD(MONTH, -1, @dstart);

-- 1. Временная таблица счетов
CREATE TABLE #Accounts (Счет INT PRIMARY KEY, ЛС VARCHAR(50));

INSERT INTO #Accounts (Счет, ЛС)
SELECT ls.ROW_ID, ls.Номер
FROM [stack].[Лицевые счета] ls
WHERE EXISTS (
    SELECT 1 
    FROM [stack].[Лицевые иерархия] li 
    WHERE li.Потомок = ls.ROW_ID 
      AND li.ПотомокТип = 5 
      AND li.Родитель IN ({ФОНД})
);

-- 2. FilteredData
CREATE TABLE #FilteredData (
    Счет INT,
    ЛС VARCHAR(50),
    Поставщик INT,
    ДоговорУК INT,
    [Месяц расчета] DATE,
    [Номер услуги] INT,
    СальдоСумма DECIMAL(18,2),
    НачислениеСумма DECIMAL(18,2),
    НачислениеТип VARCHAR(50),
    Источник VARCHAR(20)
);

-- Сальдо
INSERT INTO #FilteredData (Счет, ЛС, Поставщик, ДоговорУК, [Месяц расчета], [Номер услуги], СальдоСумма, НачислениеСумма, НачислениеТип, Источник)
SELECT 
    fnd.Счет,
    fnd.ЛС,
    ns.Поставщик,
    ns.ДоговорУК,
    ns.[Месяц расчета],
    ns.[Номер услуги],
    ns.Сумма,
    NULL,
    NULL,
    ''Сальдо''
FROM #Accounts fnd
JOIN [stack].НСальдо ns ON fnd.Счет = ns.Счет
WHERE ns.Поставщик IN({ПОСТ})
    AND ns.ДоговорУК IN({УК})
    AND ns.[Месяц расчета] BETWEEN @dstart_saldo AND @dfinal
    AND ns.[Номер услуги]>0;
-- Начисления
INSERT INTO #FilteredData (Счет, ЛС, Поставщик, ДоговорУК, [Месяц расчета], [Номер услуги], СальдоСумма, НачислениеСумма, НачислениеТип, Источник)
SELECT 
    fnd.Счет,
    fnd.ЛС,
    nl.Поставщик,
    nl.ДоговорУК,
    nl.[Месяц расчета],
    nl.[Номер услуги],
    NULL,
    nl.Сумма,
    nl.[Тип],
    ''Начисление''
FROM #Accounts fnd
JOIN [stack].[Начисления лицевых] nl ON fnd.Счет = nl.Счет
WHERE nl.Поставщик IN({ПОСТ}) 
    AND nl.ДоговорУК IN({УК})
    AND nl.[Месяц расчета] BETWEEN @dstart AND @dfinal;

-- Коррекция
INSERT INTO #FilteredData (Счет, ЛС, Поставщик, ДоговорУК, [Месяц расчета], [Номер услуги], СальдоСумма, НачислениеСумма, НачислениеТип, Источник)
SELECT 
    fnd.Счет,
    fnd.ЛС,
    ks.[Поставщик-Коррекция],
    ks.[УКДоговор-Коррекция],
    kz.РасчМесяц,
    tu.[Номер услуги],
    NULL,
    ks.Сумма,
    ''Перерасчет'',
    ''Коррекция''
FROM #Accounts fnd
JOIN [stack].[Коррекция заголовок] kz ON fnd.Счет = kz.[Счет-Коррекция]
JOIN [stack].[Коррекция список] ks ON kz.ROW_ID = ks.[КорЗаголовок-Список]
JOIN [stack].[Типы услуг] tu ON tu.ROW_ID = ks.[Услуга-Коррекция]
WHERE ks.[Поставщик-Коррекция] IN({ПОСТ}) 
    AND ks.[УКДоговор-Коррекция] IN({УК})
    AND kz.РасчМесяц BETWEEN @dstart AND @dfinal;

-- РН
INSERT INTO #FilteredData (Счет, ЛС, Поставщик, ДоговорУК, [Месяц расчета], [Номер услуги], СальдоСумма, НачислениеСумма, НачислениеТип, Источник)
SELECT 
    fnd.Счет,
    fnd.ЛС,
    rn.Поставщик,
    rn.ДоговорУК,
    rn.[Месяц расчета],
    rn.[Номер услуги],
    NULL,
    rn.Сумма,
    ''Перерасчет'',
    ''РН''
FROM #Accounts fnd
JOIN [stack].[РН список] rn ON fnd.Счет = rn.[Счет]
WHERE rn.Поставщик IN({ПОСТ}) 
    AND rn.ДоговорУК IN({УК})
    AND rn.[Месяц расчета] BETWEEN @dstart AND @dfinal;

-- ============================================
-- 3. БЛОК САЛЬДО (исправленный, сальдо=0 если нет записи)
-- ============================================

-- 3a. Все месяцы диапазона
CREATE TABLE #AllMonths ([Месяц расчета] DATE PRIMARY KEY);

WITH Months AS (
    SELECT @dstart_saldo AS m
    UNION ALL
    SELECT DATEADD(MONTH, 1, m) FROM Months WHERE m < @dfinal
)
INSERT INTO #AllMonths
SELECT m FROM Months
OPTION (MAXRECURSION 0);

-- 3b. Все уникальные комбинации Счет + Услуга ИЗ ВСЕХ ИСТОЧНИКОВ
CREATE TABLE #AllCombos (
    Счет INT,
    [Номер услуги] INT,
    Поставщик INT,
    ДоговорУК INT,
    PRIMARY KEY (Счет, [Номер услуги], Поставщик, ДоговорУК)
);

INSERT INTO #AllCombos
SELECT DISTINCT Счет, [Номер услуги], Поставщик, ДоговорУК
FROM #FilteredData;

-- 3c. Фактические записи сальдо по месяцам
CREATE TABLE #RawSaldo (
    Счет INT,
    [Номер услуги] INT,
    Поставщик INT,
    ДоговорУК INT,
    [Месяц расчета] DATE,
    ИсхСальдо DECIMAL(18,2)
);

INSERT INTO #RawSaldo
SELECT 
    Счет,
    [Номер услуги],
    Поставщик,
    ДоговорУК,
    [Месяц расчета],
    ROUND(SUM(СальдоСумма), 2)
FROM #FilteredData
WHERE Источник = ''Сальдо''
GROUP BY Счет, [Номер услуги], Поставщик, ДоговорУК, [Месяц расчета];

-- 3d. Декартово произведение: все комбинации × все месяцы
CREATE TABLE #SaldoGrid (
    Счет INT,
    [Номер услуги] INT,
    Поставщик INT,
    ДоговорУК INT,
    [Месяц расчета] DATE,
    ИсхСальдо_факт DECIMAL(18,2)
);

INSERT INTO #SaldoGrid
SELECT 
    ac.Счет,
    ac.[Номер услуги],
    ac.Поставщик,
    ac.ДоговорУК,
    am.[Месяц расчета],
    NULL
FROM #AllCombos ac
CROSS JOIN #AllMonths am;

-- Проставляем фактические значения сальдо (NULL если нет записи)
UPDATE sg
SET sg.ИсхСальдо_факт = rs.ИсхСальдо
FROM #SaldoGrid sg
INNER JOIN #RawSaldo rs 
    ON sg.Счет = rs.Счет 
    AND sg.[Номер услуги] = rs.[Номер услуги]
    AND sg.Поставщик = rs.Поставщик
    AND sg.ДоговорУК = rs.ДоговорУК
    AND sg.[Месяц расчета] = rs.[Месяц расчета];

-- 3e. MonthlyBalances - сальдо не переносится, если нет записи!
CREATE TABLE #MonthlyBalances (
    Поставщик INT,
    ДоговорУК INT,
    Счет INT,
    [Месяц расчета] DATE,
    [Номер услуги] INT,
    ВхСальдо DECIMAL(18,2),
    ИсхСальдо DECIMAL(18,2)
);

INSERT INTO #MonthlyBalances (Поставщик, ДоговорУК, Счет, [Месяц расчета], [Номер услуги], ВхСальдо, ИсхСальдо)
SELECT 
    sg.Поставщик,
    sg.ДоговорУК,
    sg.Счет,
    sg.[Месяц расчета],
    sg.[Номер услуги],
    -- ВхСальдо = ИсхСальдо из предыдущего месяца ТОЛЬКО если есть запись в предыдущем месяце
    ISNULL(
        (SELECT TOP 1 sg2.ИсхСальдо_факт
         FROM #SaldoGrid sg2
         WHERE sg2.Счет = sg.Счет
           AND sg2.[Номер услуги] = sg.[Номер услуги]
           AND sg2.[Месяц расчета] = DATEADD(MONTH, -1, sg.[Месяц расчета])
        ), 0) AS ВхСальдо,
    -- ИсхСальдо = факт если есть, иначе 0 (НЕ переносим!)
    ISNULL(sg.ИсхСальдо_факт, 0) AS ИсхСальдо
FROM #SaldoGrid sg
WHERE sg.[Месяц расчета] BETWEEN @dstart AND @dfinal;

-- ============================================
-- 4. Начисления
-- ============================================
CREATE TABLE #NchUsl (
    Поставщик INT,
    ДоговорУК INT,
    Счет INT,
    [Месяц расчета] DATE,
    [Номер услуги] INT,
    Начислено DECIMAL(18,2),
    Перерасчет DECIMAL(18,2)
);

INSERT INTO #NchUsl (Поставщик, ДоговорУК, Счет, [Месяц расчета], [Номер услуги], Начислено, Перерасчет)
SELECT 
    Поставщик,
    ДоговорУК,
    Счет,
    [Месяц расчета],
    [Номер услуги],
    SUM(CASE WHEN НачислениеТип = ''Тариф'' THEN НачислениеСумма ELSE 0 END) AS [Начислено],
    SUM(CASE WHEN НачислениеТип IN (''Перерасчет'',''ПТариф'',''КТариф'') THEN НачислениеСумма ELSE 0 END) AS [Перерасчет]
FROM #FilteredData
WHERE Источник IN (''Начисление'', ''Коррекция'', ''РН'')
GROUP BY Поставщик, ДоговорУК, Счет, [Месяц расчета], [Номер услуги];

-- ============================================
-- 5. Пени — начисления
-- ============================================
CREATE TABLE #PeniNl (
    Поставщик INT,
    ДоговорУК INT,
    Счет INT,
    [Месяц расчета] DATE,
    [Номер услуги] INT,
    ПениНач DECIMAL(18,2)
);

INSERT INTO #PeniNl (Поставщик, ДоговорУК, Счет, [Месяц расчета], [Номер услуги], ПениНач)
SELECT 
    pn.Поставщик,
    pn.ДоговорУК,
    pn.Счет,
    pn.[Месяц расчета],
    pn.[Номер услуги],
    ROUND(SUM(Сумма),2) ПениНач
FROM [stack].[ПениНачисление] pn
JOIN #Accounts ON #Accounts.Счет = pn.Счет
WHERE pn.[Месяц расчета] BETWEEN @dstart AND @dfinal
    AND pn.ДоговорУК IN({УК})
    AND pn.Поставщик IN({ПОСТ})
GROUP BY pn.Поставщик, pn.ДоговорУК, pn.Счет, pn.[Месяц расчета], pn.[Номер услуги];

-- ============================================
-- 6. Пени — сальдо (исправленный, сальдо=0 если нет записи)
-- ============================================

-- 6a. Фактические записи сальдо пени
CREATE TABLE #RawPeniSaldo (
    Счет INT,
    [Номер услуги] INT,
    Поставщик INT,
    ДоговорУК INT,
    [Месяц расчета] DATE,
    ИсхСальдо DECIMAL(18,2)
);

INSERT INTO #RawPeniSaldo
SELECT 
    ps.Счет,
    ps.[Номер услуги],
    ps.Поставщик,
    ps.ДоговорУК,
    ps.[Месяц расчета],
    ROUND(SUM(Сумма), 2)
FROM [stack].[ПениСальдо] ps
JOIN #Accounts ON #Accounts.Счет = ps.Счет
WHERE ps.[Месяц расчета] BETWEEN @dstart_saldo AND @dfinal 
    AND ps.ДоговорУК IN({УК})
    AND ps.Поставщик IN({ПОСТ})
GROUP BY ps.Счет, ps.[Номер услуги], ps.Поставщик, ps.ДоговорУК, ps.[Месяц расчета];

-- 6b. Все комбинации для пени (из ВСЕХ источников пени)
CREATE TABLE #AllPeniCombos (
    Счет INT,
    [Номер услуги] INT,
    Поставщик INT,
    ДоговорУК INT,
    PRIMARY KEY (Счет, [Номер услуги], Поставщик, ДоговорУК)
);

INSERT INTO #AllPeniCombos
SELECT DISTINCT 
    Счет, 
    [Номер услуги], 
    Поставщик, 
    ДоговорУК
FROM (
    -- Комбинации из сальдо пени
    SELECT Счет, [Номер услуги], Поставщик, ДоговорУК
    FROM #RawPeniSaldo
    UNION
    -- Комбинации из начислений пени
    SELECT Счет, [Номер услуги], Поставщик, ДоговорУК
    FROM #PeniNl
) AS AllPeniSources;

-- 6c. Декартово произведение пени × месяцы
CREATE TABLE #PeniGrid (
    Счет INT,
    [Номер услуги] INT,
    Поставщик INT,
    ДоговорУК INT,
    [Месяц расчета] DATE,
    ИсхСальдо_факт DECIMAL(18,2)
);

INSERT INTO #PeniGrid
SELECT 
    ac.Счет,
    ac.[Номер услуги],
    ac.Поставщик,
    ac.ДоговорУК,
    am.[Месяц расчета],
    NULL
FROM #AllPeniCombos ac
CROSS JOIN #AllMonths am;

-- Проставляем фактические значения
UPDATE pg
SET pg.ИсхСальдо_факт = rs.ИсхСальдо
FROM #PeniGrid pg
INNER JOIN #RawPeniSaldo rs 
    ON pg.Счет = rs.Счет 
    AND pg.[Номер услуги] = rs.[Номер услуги]
    AND pg.Поставщик = rs.Поставщик
    AND pg.ДоговорУК = rs.ДоговорУК
    AND pg.[Месяц расчета] = rs.[Месяц расчета];

-- 6d. PeniBalances - сальдо не переносится, если нет записи!
CREATE TABLE #PeniBalances (
    Счет INT,
    [Месяц расчета] DATE,
    [Номер услуги] INT,
    Поставщик INT,
    ДоговорУК INT,
    ПениВхСальдо DECIMAL(18,2),
    ПениИсхСальдо DECIMAL(18,2)
);

INSERT INTO #PeniBalances (Счет, [Месяц расчета], [Номер услуги], Поставщик, ДоговорУК, ПениВхСальдо, ПениИсхСальдо)
SELECT 
    pg.Счет,
    pg.[Месяц расчета],
    pg.[Номер услуги],
    pg.Поставщик,
    pg.ДоговорУК,
    -- ПениВхСальдо = ИсхСальдо из предыдущего месяца ТОЛЬКО если есть запись в предыдущем месяце
    ISNULL(
        (SELECT TOP 1 pg2.ИсхСальдо_факт
         FROM #PeniGrid pg2
         WHERE pg2.Счет = pg.Счет
           AND pg2.[Номер услуги] = pg.[Номер услуги]
           AND pg2.[Месяц расчета] = DATEADD(MONTH, -1, pg.[Месяц расчета])
        ), 0) AS ПениВхСальдо,
    -- ПениИсхСальдо = факт если есть, иначе 0 (НЕ переносим!)
    ISNULL(pg.ИсхСальдо_факт, 0) AS ПениИсхСальдо
FROM #PeniGrid pg
WHERE pg.[Месяц расчета] BETWEEN @dstart AND @dfinal;

-- ============================================
-- 7. Финальный запрос
-- ============================================
WITH FullFinal AS (
    SELECT 
        mb.[Месяц расчета],
        mb.Поставщик,
        mb.ДоговорУК,
        mb.Счет,
        fnd.ЛС,
        mb.[Номер услуги],
        tu.Название AS [Название услуги],
        mb.ВхСальдо,
        ISNULL(nu.Начислено, 0) AS Начислено,
        ISNULL(nu.Перерасчет, 0) AS Перерасчет,
        mb.ИсхСальдо
    FROM #MonthlyBalances mb
    JOIN #Accounts fnd ON fnd.Счет = mb.Счет
    LEFT JOIN #NchUsl nu ON mb.Счет = nu.Счет 
        AND mb.[Месяц расчета] = nu.[Месяц расчета] 
        AND mb.[Номер услуги] = nu.[Номер услуги]
    LEFT JOIN [stack].[Типы услуг] tu ON tu.[Номер услуги] = mb.[Номер услуги]
    
    UNION ALL
    
    SELECT 
        pb.[Месяц расчета],
        pb.Поставщик,
        pb.ДоговорУК,
        pb.Счет,
        fnd.ЛС,
        pb.[Номер услуги],
        ''Пени'' AS [Название услуги],
        pb.ПениВхСальдо AS ВхСальдо,
        ISNULL(pn.ПениНач, 0) AS Начислено,
        0 AS Перерасчет,
        pb.ПениИсхСальдо AS ИсхСальдо
    FROM #PeniBalances pb
    JOIN #Accounts fnd ON fnd.Счет = pb.Счет
    LEFT JOIN #PeniNl pn ON pn.Счет = pb.Счет 
        AND pn.[Месяц расчета] = pb.[Месяц расчета] 
        AND pn.[Номер услуги] = pb.[Номер услуги]
)
, Params AS (
    SELECT 
        fn.Счет,    
        MAX(CASE WHEN vp.Название = ''ЮРЛИЦО'' THEN sv.Значение END) AS ЮРЛИЦО,
        MAX(CASE WHEN vp.Название = ''ПУСТУЮЩАЯ'' THEN sv.Значение END) AS ПУСТУЮЩАЯ,
        MAX(CASE WHEN vp.Название = ''СОСТОЯНИЕ'' THEN sv.Значение END) AS СОСТОЯНИЕ
    FROM FullFinal fn
    LEFT JOIN [stack].[Лицевые иерархия] lh ON lh.Потомок = fn.Счет
    LEFT JOIN [stack].[Виды параметров] vp ON vp.Название IN (''ЮРЛИЦО'', ''ПУСТУЮЩАЯ'',''СОСТОЯНИЕ'')
    LEFT JOIN [stack].[Свойства] sv ON sv.[Виды-Параметры] = vp.row_id 
        AND sv.[Счет-параметры] = lh.Родитель 
        AND @dfinal BETWEEN sv.ДатНач AND sv.ДатКнц 
        AND sv.Значение IS NOT NULL
    GROUP BY fn.Счет
)
SELECT 
    CONVERT(VARCHAR(7), f.[Месяц расчета], 126) AS Месяц,
    adr.Район,
    adr.Участок,
    adr.МР,
    adr.НП,
    adr.ПлСтр,
    adr.Улица,
    adr.Дом,
    adr.Квартира,
    adr.Комната,
    IIF(f.[Поставщик]<0,''Не указан'',CONCAT(''['', f.[Поставщик], ''] '', pst.Название)) AS [Поставщик],
    IIF(f.[ДоговорУК]<0,''Не указан'',CONCAT(''['', f.[ДоговорУК], ''] '', duk.Название)) AS [ДоговорУК],
    f.Счет,
    f.ЛС,
    CASE prm.[СОСТОЯНИЕ] 
        WHEN 0 THEN ''Используется'' 
        WHEN 1 THEN ''Не проживает'' 
        WHEN 2 THEN ''Закрыт'' 
        ELSE '''' 
    END AS СОСТОЯНИЕ,
    CASE prm.[ЮРЛИЦО] 
        WHEN 0 THEN ''Нет'' 
        WHEN 1 THEN ''Без расчета'' 
        WHEN 2 THEN ''С расчетом'' 
        ELSE '''' 
    END AS ЮРЛИЦО,
    CASE prm.[ПУСТУЮЩАЯ] 
        WHEN 0 THEN ''Нет'' 
        WHEN 1 THEN ''Без расчета'' 
        WHEN 2 THEN ''Перерасчет'' 
        ELSE '''' 
    END AS ПУСТУЮЩАЯ,
    grpusl.[Группа услуг],
    f.[Номер услуги],
    f.[Название услуги],
    f.ВхСальдо,
    ISNULL(f.Начислено, 0) AS Начислено,
    ISNULL(f.Перерасчет, 0) AS Перерасчет,
    ISNULL(f.Начислено, 0) + ISNULL(f.Перерасчет, 0) AS [ФактНач],
    -- Оплата = ВхСальдо + Начислено + Перерасчет - ИсхСальдо
    ROUND(f.ВхСальдо + ISNULL(f.Начислено, 0) + ISNULL(f.Перерасчет, 0) - f.ИсхСальдо, 2) AS Оплата,
    f.ИсхСальдо
FROM FullFinal f
LEFT JOIN Params prm ON prm.Счет = f.Счет
OUTER APPLY (
    SELECT TOP(1) CONCAT(''['', tu.[Номер услуги], ''] '', tu.Название) [Группа услуг]
    FROM [stack].[Типы услуг иерархия] ti
    JOIN [stack].[Типы услуг] tu ON tu.ROW_ID = ti.Родитель
    WHERE ti.[ПотомокНомер] = f.[Номер услуги] 
        AND ti.РодительТип = 2
) grpusl
OUTER APPLY (
    SELECT Название 
    FROM [stack].[Организации] org 
    WHERE org.ROW_ID = f.Поставщик
) pst
OUTER APPLY (
    SELECT org.Название 
    FROM [stack].[УК Договоры] ukd 
    JOIN [stack].[Организации] org ON org.ROW_ID = ukd.[Организация-УКДоговор]
    WHERE ukd.ROW_ID = f.ДоговорУК
) duk
CROSS APPLY stack.AddrLs_Table(f.Счет, 0) adr
WHERE f.[Месяц расчета] BETWEEN @dstart AND @dfinal
OPTION (MAXDOP 0, RECOMPILE);
' AS query_text, CAST(N'{"fields":{"statistic":[{"dataField":"Исполнено"},{"dataField":"Время"},{"dataField":"Записей"},{"dataField":"Фильтры"}],"grid":[{"dataField":"Месяц","groupIndex":0},{"caption":"Адрес","columns":[{"dataField":"Район"},{"dataField":"Участок"},{"dataField":"НП"},{"dataField":"Улица"},{"dataField":"Дом"},{"dataField":"Квартира"},{"dataField":"Комната"}]},{"dataField":"ДоговорУК"},{"dataField":"Поставщик"},{"dataField":"ЛС","dataType":"number","format":{"type":"fixedPoint","precision":0}},{"dataField":"СОСТОЯНИЕ"},{"dataField":"ЮРЛИЦО"},{"dataField":"ПУСТУЮЩАЯ"},{"dataField":"Группа услуг"},{"dataField":"Номер услуги"},{"dataField":"Название услуги"},{"caption":"Обороты","columns":[{"dataField":"ВхСальдо"},{"dataField":"Начислено"},{"dataField":"Перерасчет"},{"dataField":"ФактНач"},{"dataField":"Оплата"},{"dataField":"ИсхСальдо"}]}],"pivot":[{"dataField":"Месяц","area":"column"},{"dataField":"Район","area":"filter","expanded":true},{"dataField":"Участок","area":"filter","expanded":true},{"dataField":"НП","area":"filter","expanded":true},{"dataField":"Улица","area":"filter","expanded":true},{"dataField":"Дом","area":"filter","expanded":true},{"dataField":"Квартира","area":"filter","expanded":true},{"dataField":"Комната","area":"filter","expanded":true},{"caption":"Адрес","area":"filter","expanded":true,"width":5},{"caption":"ЛС","dataField":"ЛС","area":"filter","expanded":true,"width":10},{"caption":"СОСТОЯНИЕ","dataField":"СОСТОЯНИЕ","area":"filter","expanded":true},{"caption":"ЮРЛИЦО","dataField":"ЮРЛИЦО","area":"filter","expanded":true,"width":2},{"caption":"ПУСТУЮЩАЯ","dataField":"ПУСТУЮЩАЯ","area":"filter","expanded":true,"width":2},{"dataField":"ДоговорУК","area":"row","expanded":true},{"dataField":"Поставщик","area":"row","expanded":true},{"dataField":"Группа услуг","area":"row","expanded":true},{"dataField":"Номер услуги","area":"row","expanded":true},{"dataField":"Название услуги","area":"row","expanded":true},{"caption":"ВхСальдо","dataField":"ВхСальдо","dataType":"number","summaryType":"sum","format":{"type":"fixedPoint","precision":2},"area":"data"},{"caption":"Начислено","dataField":"Начислено","dataType":"number","summaryType":"sum","format":{"type":"fixedPoint","precision":2},"area":"data"},{"caption":"Перерасчет","dataField":"Перерасчет","dataType":"number","summaryType":"sum","format":{"type":"fixedPoint","precision":2},"area":"data"},{"caption":"ФактНач","dataField":"ФактНач","dataType":"number","summaryType":"sum","format":{"type":"fixedPoint","precision":2},"area":"data"},{"caption":"Оплата","dataField":"Оплата","dataType":"number","summaryType":"sum","format":{"type":"fixedPoint","precision":2},"area":"data"},{"caption":"ИсхСальдо","dataField":"ИсхСальдо","dataType":"number","summaryType":"sum","format":{"type":"fixedPoint","precision":2},"area":"data"}],"chart":{}},"filters":{"ФОНД":[],"УК":[],"ПОСТ":[],"ПериодМесяцы":{}},"views":["pivot","dashboard"],"processing":"server","description":"ОСВ за произвольный период (серверная обработка) — остатки и обороты по счетам на сервере.","mandatory":["ФОНД"]}' AS NVARCHAR(MAX)) AS config, 0 AS is_section, 2 AS sort_order) AS src
   ON target.report_key = src.report_key
WHEN MATCHED THEN UPDATE SET title = src.title, icon = src.icon, image = src.image,
    query_text = src.query_text, config = src.config, parent_id = src.parent_id,
    is_section = src.is_section, sort_order = src.sort_order, is_deleted = 0,
    updated_at = SYSUTCDATETIME()
WHEN NOT MATCHED THEN INSERT (report_key, parent_id, title, icon, image, query_text,
    config, is_section, sort_order)
    VALUES (src.report_key, src.parent_id, src.title, src.icon, src.image,
    src.query_text, src.config, src.is_section, src.sort_order);
GO
MERGE dbo.reports AS target
USING (SELECT N'RPT_1104' AS report_key, (SELECT id FROM dbo.reports WHERE report_key = N'КТР') AS parent_id, N'КТР [Объемы по диапазонам]' AS title, N'chart' AS icon, N'' AS image, N'
SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED
SET NOCOUNT ON;
DECLARE @dstart DATE = {ПериодМесяцы_start};
DECLARE @dend DATE = {ПериодМесяцы_end};

WITH AreaLS AS (
	SELECT ls.ROW_ID Счет, ls.Тип, ls.Номер
	FROM stack.[Лицевые счета] ls
        JOIN ( SELECT DISTINCT Потомок FROM [stack].[Лицевые иерархия] WHERE ПотомокТип = 5 AND Родитель IN ({ФОНД})) li ON li.Потомок=ls.ROW_ID	
),
ParamData AS (
    SELECT ls.Счет,	
        MAX(CASE WHEN vp.Название = ''ЮРЛИЦО'' THEN ISNULL(sv.Значение,-1) END) AS [ЮРЛИЦО],
        MAX(CASE WHEN vp.Название = ''ПУСТУЮЩАЯ'' THEN ISNULL(sv.Значение,-1) END) AS [ПУСТУЮЩАЯ],
        MAX(CASE WHEN vp.Название = ''СОСТОЯНИЕ'' THEN ISNULL(sv.Значение,-1) END) AS [СОСТОЯНИЕ],
	    MAX(CASE WHEN vp.Название = ''СОСТОЯНИЕ'' THEN sv.ДатНач END) AS [НАЧАЛО],
        MAX(CASE WHEN vp.Название = ''ТИПСТРОЙ'' THEN ISNULL(sv.Значение,-1) END) AS [ТИПСТРОЙ],
        MAX(CASE WHEN vp.Название = ''ТИППЛИТЫ'' THEN ISNULL(sv.Значение,-1) END) AS [ТИППЛИТЫ]
    FROM AreaLS ls
    LEFT JOIN stack.[Лицевые иерархия] lh ON lh.Потомок = ls.Счет
    LEFT JOIN stack.[Виды параметров] vp ON vp.Название IN (''ЮРЛИЦО'', ''ПУСТУЮЩАЯ'', ''СОСТОЯНИЕ'',''ТИПСТРОЙ'',''ТИППЛИТЫ'') 
    LEFT JOIN stack.[Свойства] sv ON sv.[Виды-Параметры] = vp.row_id AND sv.[Счет-параметры] = lh.Родитель AND GETDATE() BETWEEN sv.ДатНач AND sv.ДатКнц AND sv.Значение IS NOT NULL
    GROUP BY ls.Счет
),
ovn AS (
SELECT [Месяц расчета] [Месяц] 
--,org.Наименование [УК]
--,pst.Название [Поставщик]
,nl.Счет
,nl.[Номер услуги] [Услуга]
,[Тип]
,CASE [Аналитика2]
WHEN -1 THEN ''по показанию''
WHEN 47 THEN ''по нормативу''
WHEN 49 THEN ''замещение по среднему''
WHEN 51 THEN ''временное отсутствие''
WHEN 84 THEN ''ОКПУ''
WHEN 85 THEN ''ОКПУ''
WHEN 86 THEN ''ОКПУ''
WHEN 149 THEN ''по среднему (снят ПУ)''
WHEN 549 THEN ''замещение по норме''
WHEN 4001 THEN ''по показанию''
WHEN 777 THEN ''проценты по рассрочке платежа''
WHEN 910 THEN ''услуги по СОИМД''
WHEN 551 THEN ''временное отсутствие по счетчику''
ELSE ''''
END [Аналитика]
,nl.[ИспользованТариф] [Тариф]
,nl.[Объем]
,nl.[Сумма]
FROM [stack].[Начисления лицевых] nl
--JOIN [stack].Организации pst ON pst.ROW_ID=nl.Поставщик
--JOIN [stack].[УК Договоры] uk ON uk.ROW_ID=nl.ДоговорУК
--JOIN [stack].Организации org ON org.ROW_ID=uk.[Организация-УКДоговор]
WHERE nl.[Месяц расчета] BETWEEN @dstart  AND  @dend
AND nl.[Номер услуги]<1000
)
--, ols AS (
--SELECT [Счет],[ЗаводскойНомер],[Тарифность],[Основной] ,[ДатНач],[ДатКнц],[Услуга],[Тип]
--FROM [stack].[Объекты лицевого]
--)
SELECT als.Номер
, adr.Район
, adr.Участок
, adr.НП
, adr.Улица
, adr.Дом
, adr.Квартира
, adr.Комната
, FORMAT(ovn.Месяц,''[yyyy-MM] MMMM'',''ru'') [Месяц]
--, ovn.УК
--, ovn.Поставщик
, grusl.[Группы услуг]
, ovn.Услуга
, ovn.Тип
, ovn.Счет
, ovn.Аналитика
, ovn.Тариф
, ovn.Объем
, ovn.Сумма
, CASE prm.ЮРЛИЦО WHEN -1 THEN ''Нет параметра'' WHEN 0 THEN ''(Не указано)'' WHEN 1 THEN  ''Без расчета'' WHEN 2 THEN  ''С расчетом'' ELSE ''Нет параметра'' END ЮРЛИЦО
, CASE prm.ПУСТУЮЩАЯ WHEN -1 THEN ''Нет параметра'' WHEN 0  THEN  ''Нет'' WHEN 1 THEN  ''Без расчета'' WHEN 2 THEN  ''Перерасчет'' ELSE ''Нет параметра'' END ПУСТУЮЩАЯ
, CASE prm.СОСТОЯНИЕ WHEN 0 THEN ''Используется'' WHEN 1 THEN  ''Не проживает'' WHEN 2  THEN  ''Закрыт'' ELSE ''Нет параметра'' END СОСТОЯНИЕ
, FORMAT(prm.НАЧАЛО,''yyyy-MM-dd'',''ru'') ДАТА_СОСТОЯНИЯ
, CASE prm.ТИППЛИТЫ WHEN 0 THEN ''Без указания'' WHEN 1 THEN ''Газовые'' WHEN 2 THEN ''Электрические'' WHEN 3 THEN ''На тв.топливе'' ELSE ''Нет параметра'' END ТИППЛИТЫ
, CASE prm.ТИПСТРОЙ 
	  WHEN 0 THEN ''Многоквартирный''
	  WHEN 1 THEN ''Частный''
	  WHEN 2 THEN ''Общежитие''
	  WHEN 3 THEN ''Дача''
	  WHEN 4 THEN ''Гараж''
	  WHEN 5 THEN ''Баня''
	  WHEN 6 THEN ''Сарай''
	  WHEN 7 THEN ''Прочие''
	  WHEN 8 THEN ''Хозпостройка''
	  WHEN 9 THEN ''Земельный участок''
	  ELSE ''Нет параметра'' 
END ТИПСТРОЙ
FROM AreaLS als
CROSS APPLY stack.AddrLs_Table(als.Счет, 0) adr
JOIN ovn ovn ON als.Счет=ovn.Счет
LEFT JOIN ParamData prm ON als.Счет=prm.Счет
OUTER APPLY (SELECT TOP(1) CONCAT(''[''+CAST(tui.[РодительНомер] AS varchar(20))+''] '',tu.Название) ''Группы услуг''
FROM [stack].[Типы услуг иерархия] tui
JOIN [stack].[Типы услуг] tu ON tu.[Номер услуги]=tui.РодительНомер
WHERE [ПотомокНомер]=ovn.Услуга 
ORDER BY tui.Уровень DESC
 ) grusl
OPTION (MAXDOP 0, RECOMPILE);
' AS query_text, CAST(N'{"fields":{"pivot":[{"caption":"Отделение","dataField":"Район","area":"filter","expanded":true},{"caption":"ЛС","dataField":"Номер","area":"filter","expanded":false},{"dataField":"Улица","area":"filter","expanded":false},{"dataField":"НП","area":"filter","expanded":false},{"dataField":"Дом","area":"filter","expanded":false},{"dataField":"Квартира","area":"filter","expanded":false},{"dataField":"ЮРЛИЦО","area":"filter","expanded":true},{"dataField":"ПУСТУЮЩАЯ","area":"filter","expanded":true},{"dataField":"СОСТОЯНИЕ","area":"filter","expanded":true},{"dataField":"Аналитика","area":"filter","expanded":false},{"dataField":"ТИППЛИТЫ","area":"filter","expanded":false},{"dataField":"Услуга","area":"filter","expanded":true},{"dataField":"Тип","area":"filter","expanded":true},{"dataField":"Месяц","area":"filter","expanded":true},{"dataField":"Отчет","area":"column","expanded":true},{"dataField":"Группы услуг","area":"column","expanded":true},{"dataField":"ТИПСТРОЙ","area":"row","expanded":false},{"dataField":"Участок","area":"row","expanded":true},{"caption":"Объем","dataField":"Объем","dataType":"number","summaryType":"sum","format":{"type":"fixedPoint","precision":3},"area":"data"},{"caption":"Сумма","dataField":"Сумма","dataType":"number","summaryType":"sum","format":{"type":"fixedPoint","precision":2},"area":"filter"}]},"filters":{"ФОНД":[],"ПериодМесяцы":{}},"views":["pivot"],"processing":"server-multi","description":"КТР — объёмы потребления по группам услуг"}' AS NVARCHAR(MAX)) AS config, 0 AS is_section, 3 AS sort_order) AS src
   ON target.report_key = src.report_key
WHEN MATCHED THEN UPDATE SET title = src.title, icon = src.icon, image = src.image,
    query_text = src.query_text, config = src.config, parent_id = src.parent_id,
    is_section = src.is_section, sort_order = src.sort_order, is_deleted = 0,
    updated_at = SYSUTCDATETIME()
WHEN NOT MATCHED THEN INSERT (report_key, parent_id, title, icon, image, query_text,
    config, is_section, sort_order)
    VALUES (src.report_key, src.parent_id, src.title, src.icon, src.image,
    src.query_text, src.config, src.is_section, src.sort_order);
GO
MERGE dbo.reports AS target
USING (SELECT N'RPT_1204' AS report_key, (SELECT id FROM dbo.reports WHERE report_key = N'ОРН') AS parent_id, N'Анализ ЭЭ ОИ' AS title, N'chart' AS icon, N'' AS image, N'
        SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;
        DECLARE @dopl DATE={РасчетыйМесяц};
        DECLARE @dsld DATE=DateAdd(month,-1,@dopl);

        WITH opl AS (
        SELECT 
            Счет,
            ISNULL([100], 0) AS Сумма_100,
            ISNULL([200], 0) AS Сумма_200,
            ISNULL([300], 0) AS Сумма_300,
            ISNULL([400], 0) AS Сумма_400,
            ISNULL([500], 0) AS Сумма_500,
            ISNULL([600], 0) AS Сумма_600,
            ISNULL([700], 0) AS Сумма_700,
            ISNULL([800], 0) AS Сумма_800,
            ISNULL([10100], 0) AS Сумма_10100
        FROM (
            SELECT 
                so.[Счет-Оплата] AS Счет,
                ti.РодительНомер,
                ov.Сумма
            FROM [stack].[Оплата по видам] ov
            JOIN [stack].[Список оплаты] so 
                ON so.ROW_ID = ov.[Распределение-Платеж] 
                AND so.РасчМесяц = @dopl
            JOIN [stack].[Типы услуг иерархия] ti 
                ON ov.[Распределение-Услуга] = ti.Потомок 
                AND ti.РодительТип = 2 
                AND ti.РодительНомер IN (100, 200, 300, 400, 500, 600, 700, 800, 10100)
        ) AS SourceTable
        PIVOT (
            SUM(Сумма) 
            FOR РодительНомер IN ([100], [200], [300], [400], [500], [600], [700], [800], [10100])
        ) AS PivotTable
    ),
    saldo AS (
        SELECT 
            Счет,
            ISNULL([100], 0) AS Сальдо_100,
            ISNULL([200], 0) AS Сальдо_200,
            ISNULL([300], 0) AS Сальдо_300,
            ISNULL([400], 0) AS Сальдо_400,
            ISNULL([500], 0) AS Сальдо_500,
            ISNULL([600], 0) AS Сальдо_600,
            ISNULL([700], 0) AS Сальдо_700,
            ISNULL([800], 0) AS Сальдо_800,
            ISNULL([10100], 0) AS Сальдо_10100
        FROM (
            SELECT 
                ns.Счет,
                ti.РодительНомер,
                ns.Сумма
            FROM [stack].НСальдо ns 
            JOIN [stack].[Типы услуг иерархия] ti 
                ON ns.[Номер услуги] = ti.ПотомокНомер 
                AND ti.РодительТип = 2 
                AND ti.РодительНомер IN (100, 200, 300, 400, 500, 600, 700, 800, 10100)
            WHERE ns.[Месяц расчета] = @dsld
        ) AS SourceTable
        PIVOT (
            SUM(Сумма)
            FOR РодительНомер IN ([100], [200], [300], [400], [500], [600], [700], [800], [10100])
        ) AS PivotTable
    ), outsaldo AS (
        SELECT 
            Счет,
            ISNULL([100], 0) AS Сальдо_100,
            ISNULL([200], 0) AS Сальдо_200,
            ISNULL([300], 0) AS Сальдо_300,
            ISNULL([400], 0) AS Сальдо_400,
            ISNULL([500], 0) AS Сальдо_500,
            ISNULL([600], 0) AS Сальдо_600,
            ISNULL([700], 0) AS Сальдо_700,
            ISNULL([800], 0) AS Сальдо_800,
            ISNULL([10100], 0) AS Сальдо_10100
        FROM (
            SELECT 
                ns.Счет,
                ti.РодительНомер,
                ns.Сумма
            FROM [stack].НСальдо ns 
            JOIN [stack].[Типы услуг иерархия] ti 
                ON ns.[Номер услуги] = ti.ПотомокНомер 
                AND ti.РодительТип = 2 
                AND ti.РодительНомер IN (100, 200, 300, 400, 500, 600, 700, 800, 10100)
            WHERE ns.[Месяц расчета] = @dopl
        ) AS SourceTable
        PIVOT (
            SUM(Сумма)
            FOR РодительНомер IN ([100], [200], [300], [400], [500], [600], [700], [800], [10100])
        ) AS PivotTable
    ), Final AS (
    SELECT 
        FORMAT(@dopl, ''yyyy-MMMM'', ''ru'') [Месяц],
        ls.ROW_ID,
        ls.Номер,
        Сальдо_ЭЭ=ROUND(s.Сальдо_100+s.Сальдо_200+s.Сальдо_300+ s.Сальдо_400+s.Сальдо_500+s.Сальдо_600+s.Сальдо_700+s.Сальдо_800,2),
        Сальдо_ОИ=ROUND(s.Сальдо_10100,2),
        Сальдо_ЭЭ_Исх=ROUND(os.Сальдо_100+os.Сальдо_200+os.Сальдо_300+os.Сальдо_400+os.Сальдо_500+os.Сальдо_600+os.Сальдо_700+os.Сальдо_800,2),
        Сальдо_ОИ_Исх=ROUND(os.Сальдо_10100,2),
        Оплата_ЭЭ=ROUND(o.Сумма_100+o.Сумма_200+o.Сумма_300+o.Сумма_400+o.Сумма_500+o.Сумма_600+o.Сумма_700+o.Сумма_800,2),
        Оплата_ОИ=ROUND(o.Сумма_10100,2)
    FROM opl o
    JOIN saldo s ON s.Счет = o.Счет
    JOIN outsaldo os ON os.Счет = o.Счет
    JOIN [stack].[Лицевые счета] ls ON ls.ROW_ID = o.Счет
    ) 
    SELECT FORMAT(@dopl, ''yyyy-MMMM'', ''ru'') [Месяц],
    f.Номер ЛС,
    adr.*,
    vd.Значение Договор_ЮЛ,
    f.Сальдо_ЭЭ,
    f.Оплата_ЭЭ,
    f.Сальдо_ЭЭ_Исх,
    f.Сальдо_ОИ,
    f.Оплата_ОИ,
    f.Сальдо_ОИ_Исх
    FROM Final f
    CROSS APPLY stack.AddrLs_Table(f.ROW_ID, 0) adr
    CROSS APPLY (SELECT DISTINCT addr.Участок, sv.Значение FROM stack.Свойства sv CROSS APPLY stack.AddrLs_Table(sv.[Счет-Параметры], 0) addr WHERE sv.[Виды-Параметры]=677 AND adr.Участок=addr.Участок) vd
    JOIN (SELECT DISTINCT Потомок FROM [stack].[Лицевые иерархия] WHERE ПотомокТип = 5 AND Родитель IN ({ФОНД})) li ON li.Потомок = f.ROW_ID
    WHERE f.Сальдо_ОИ_Исх<0
    ORDER BY 2
    OPTION (MAXDOP 0, RECOMPILE);
    ' AS query_text, CAST(N'{"fields":{"statistic":[{"dataField":"Исполнено"},{"dataField":"Время"},{"dataField":"Записей"},{"dataField":"Фильтры"}],"grid":[{"dataField":"Месяц"},{"dataField":"ЛС"},{"caption":"Адрес","columns":[{"dataField":"Район"},{"dataField":"Участок"},{"dataField":"НП"},{"dataField":"Улица"},{"dataField":"Дом"},{"dataField":"Квартира"},{"dataField":"Комната"}]},{"dataField":"Договор_ЮЛ"},{"dataField":"Сальдо_ЭЭ"},{"dataField":"Оплата_ЭЭ"},{"dataField":"Сальдо_ЭЭ_Исх"},{"dataField":"Сальдо_ОИ"},{"dataField":"Оплата_ОИ"},{"dataField":"Сальдо_ОИ_Исх"}],"pivot":[{"dataField":"Месяц","area":"column"},{"dataField":"Договор_ЮЛ","area":"row","expanded":true},{"dataField":"Участок","area":"row","expanded":true},{"dataField":"НП","area":"row","expanded":true},{"dataField":"Улица","area":"row","expanded":true},{"dataField":"Дом","area":"row","expanded":true},{"dataField":"Квартира","area":"row","expanded":true},{"dataField":"Комната","area":"row","expanded":true},{"caption":"Адрес","area":"filter","expanded":true},{"caption":"ЛС","dataField":"ЛС","area":"row","expanded":true},{"caption":"Сальдо_ЭЭ","dataField":"Сальдо_ЭЭ","dataType":"number","summaryType":"sum","format":{"type":"fixedPoint","precision":2},"area":"data","unit":"руб"},{"caption":"Оплата_ЭЭ","dataField":"Оплата_ЭЭ","dataType":"number","summaryType":"sum","format":{"type":"fixedPoint","precision":2},"area":"data","unit":"руб"},{"caption":"Сальдо_ЭЭ_Исх","dataField":"Сальдо_ЭЭ_Исх","dataType":"number","summaryType":"sum","format":{"type":"fixedPoint","precision":2},"area":"data","unit":"руб"},{"caption":"Сальдо_ОИ","dataField":"Сальдо_ОИ","dataType":"number","summaryType":"sum","format":{"type":"fixedPoint","precision":2},"area":"data","unit":"руб"},{"caption":"Оплата_ОИ","dataField":"Оплата_ОИ","dataType":"number","summaryType":"sum","format":{"type":"fixedPoint","precision":2},"area":"data","unit":"руб"},{"caption":"Сальдо_ОИ_Исх","dataField":"Сальдо_ОИ_Исх","dataType":"number","summaryType":"sum","format":{"type":"fixedPoint","precision":2},"area":"data","unit":"руб"}]},"filters":{"ФОНД":[],"РасчетыйМесяц":[]},"description":"Анализ электропотребления по объектам инфраструктуры.","mandatory":["ФОНД"]}' AS NVARCHAR(MAX)) AS config, 0 AS is_section, 3 AS sort_order) AS src
   ON target.report_key = src.report_key
WHEN MATCHED THEN UPDATE SET title = src.title, icon = src.icon, image = src.image,
    query_text = src.query_text, config = src.config, parent_id = src.parent_id,
    is_section = src.is_section, sort_order = src.sort_order, is_deleted = 0,
    updated_at = SYSUTCDATETIME()
WHEN NOT MATCHED THEN INSERT (report_key, parent_id, title, icon, image, query_text,
    config, is_section, sort_order)
    VALUES (src.report_key, src.parent_id, src.title, src.icon, src.image,
    src.query_text, src.config, src.is_section, src.sort_order);
GO
MERGE dbo.reports AS target
USING (SELECT N'RPT_1105' AS report_key, (SELECT id FROM dbo.reports WHERE report_key = N'КТР') AS parent_id, N'ФЛ Оплаты подробно' AS title, N'chart' AS icon, N'' AS image, N'
SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;
--DECLARE @parent VARCHAR(MAX) = ''{ФОНД}'';

IF OBJECT_ID(''tempdb..#parent_ids'') IS NOT NULL
    DROP TABLE #parent_ids;

DECLARE @xml XML = CAST(''<i>'' + REPLACE(''{ФОНД}'', '','', ''</i><i>'') + ''</i>'' AS XML);
-- Создаем временную таблицу с ID родителей
SELECT t.value(''.'', ''INT'') AS Родитель INTO #parent_ids FROM @xml.nodes(''i'') AS x(t);

DECLARE @month DATE = {РасчетыйМесяц};
DECLARE @emonth DATETIME = EOMONTH(@month);
DECLARE @date DATE = GETDATE();

WITH service AS (
    -- Собираем все услуги по ЭЭ
    SELECT DISTINCT tui.Потомок AS id, tui.ПотомокНомер AS num
    FROM stack.[Типы услуг иерархия] tui
    WHERE tui.РодительНомер IN (100, 200, 500, 600, 700, 800)
),

payment_all AS (
    -- Собираем все оплаты за период
    SELECT 
        so.ROW_ID AS id,
        so.[Счет-Оплата] AS ls_id, 
        so.Сумма AS pay_sum, 
        so.[Дата] AS pay_date
    FROM [stack].[Список оплаты] so
    JOIN stack.[Документ] doc ON doc.row_id = so.[Платеж-список]
    JOIN ( SELECT DISTINCT Потомок FROM [stack].[Лицевые иерархия] WHERE ПотомокТип = 5 AND Родитель IN (SELECT Родитель FROM #parent_ids) ) li ON li.Потомок=so.[Счет-Оплата]
    WHERE so.[Дата] BETWEEN @month AND @emonth 
        AND so.Сумма > 0
),

payment_division AS (
    -- Собираем все оплаты с распределением не по ЭЭ
    SELECT 
        pa.id AS so_id, 
        SUM(ov.[Сумма]) AS pay_sum
    FROM stack.[Оплата по видам] ov
    JOIN payment_all pa ON pa.id = ov.[Распределение-Платеж] 
    WHERE ov.[Распределение-Услуга] NOT IN (SELECT id FROM service)
    GROUP BY pa.id
),

payment_energy AS (
    -- Минусуем из общей суммы документа распределение не на услуги ЭЭ
    SELECT 
        pa.id,
        pa.ls_id,
        pa.pay_sum - ISNULL(pd.pay_sum, 0) AS pay_sum,
        pa.pay_sum AS pay_sum_all,
        pa.pay_date,
        ls.Номер AS ls_num,
        CASE WHEN pa.pay_date < @Date THEN pa.pay_sum - ISNULL(pd.pay_sum, 0) ELSE 0 END AS pay_sum_cur
    FROM payment_all pa
    JOIN stack.[Лицевые счета] ls ON ls.row_id = pa.ls_id
    LEFT JOIN payment_division pd ON pd.so_id = pa.id
),

grouped_payments AS (
    SELECT 
        pe.ls_id,
        FORMAT(pe.pay_date, ''yyyy-MM-dd'') AS [Дата оплаты],
        ROUND(SUM(pe.pay_sum), 2) AS [Сумма оплаты],
        ROUND(SUM(pe.pay_sum_cur), 2) AS [Сумма оплаты тек]
    FROM payment_energy pe
    WHERE pe.pay_sum <> 0
    GROUP BY pe.ls_id, pe.pay_date
)

SELECT 
    FORMAT(@month, ''yyyy [MM] MMMM'', ''ru'') AS Месяц,
    adr.Район AS Отделение,
    adr.Участок,
    adr.НП,
    adr.Улица,
    adr.Дом,
    adr.Квартира,
    adr.Комната,
    ls.Номер AS ЛС,
    grf.*
FROM grouped_payments grf
JOIN stack.[Лицевые счета] ls ON ls.ROW_ID = grf.ls_id
CROSS APPLY stack.AddrLs_Table(ls.ROW_ID, 0) adr;
' AS query_text, CAST(N'{"fields":{"statistic":[{"dataField":"Исполнено"},{"dataField":"Время"},{"dataField":"Записей"},{"dataField":"Фильтры"}],"grid":[{"caption":"Филиал","dataField":"Филиал"},{"dataField":"Месяц"},{"dataField":"ЛС"},{"dataField":"Отделение"},{"dataField":"Участок"},{"dataField":"НП"},{"dataField":"Улица"},{"dataField":"Дом"},{"dataField":"Квартира"},{"dataField":"Комната"},{"dataField":"Дата оплаты"},{"dataField":"Сумма оплаты","format":{"type":"fixedPoint","precision":2}},{"dataField":"Сумма оплаты тек","format":{"type":"fixedPoint","precision":2}}],"pivot":[{"caption":"Филиал","dataField":"Филиал","area":"row","expanded":true},{"dataField":"Месяц","area":"column"},{"dataField":"ЛС","area":"filter"},{"dataField":"Отделение","area":"row","expanded":true},{"dataField":"Участок","area":"row","expanded":true},{"dataField":"НП","area":"filter"},{"dataField":"Улица","area":"filter"},{"dataField":"Дом","area":"filter"},{"dataField":"Квартира","area":"filter"},{"dataField":"Комната","area":"filter"},{"dataField":"Дата оплаты","area":"filter"},{"caption":"Сумма оплаты","dataField":"Сумма оплаты","dataType":"number","summaryType":"sum","format":{"type":"fixedPoint","precision":2},"area":"data"},{"caption":"Сумма оплаты тек","dataField":"Сумма оплаты тек","dataType":"number","summaryType":"sum","format":{"type":"fixedPoint","precision":2},"area":"data"}]},"filters":{"ФОНД":[],"РасчетыйМесяц":[]},"description":"Детализация оплат по лицевым счетам.","mandatory":["ФОНД"]}' AS NVARCHAR(MAX)) AS config, 0 AS is_section, 4 AS sort_order) AS src
   ON target.report_key = src.report_key
WHEN MATCHED THEN UPDATE SET title = src.title, icon = src.icon, image = src.image,
    query_text = src.query_text, config = src.config, parent_id = src.parent_id,
    is_section = src.is_section, sort_order = src.sort_order, is_deleted = 0,
    updated_at = SYSUTCDATETIME()
WHEN NOT MATCHED THEN INSERT (report_key, parent_id, title, icon, image, query_text,
    config, is_section, sort_order)
    VALUES (src.report_key, src.parent_id, src.title, src.icon, src.image,
    src.query_text, src.config, src.is_section, src.sort_order);
GO
MERGE dbo.reports AS target
USING (SELECT N'RPT_1205' AS report_key, (SELECT id FROM dbo.reports WHERE report_key = N'ОРН') AS parent_id, N'ОСВ (Договор ЮЛ)' AS title, N'chart' AS icon, N'' AS image, N'
        SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;

        DECLARE @dstart DATE = {РасчетыйМесяц};
        DECLARE @dbefore DATE=DateAdd(month,-1,@dstart);

        WITH FOND AS (
        SELECT DISTINCT ls.ROW_ID Счет,ls.Номер ЛС
        FROM [stack].[Лицевые счета] ls
        JOIN (SELECT DISTINCT Потомок FROM [stack].[Лицевые иерархия] WHERE ПотомокТип = 5 AND Родитель IN ({ФОНД})) li ON li.Потомок = ls.ROW_ID
        ), PrmDat AS (
        SELECT f.Счет, MAX(CASE WHEN vp.Название = ''ДОГОВОРЮЛ'' THEN sv.Значение END) AS [ДОГОВОРЮЛ]
        FROM FOND f
        LEFT JOIN stack.[Лицевые иерархия] lh ON lh.Потомок = f.Счет
        LEFT JOIN stack.[Виды параметров] vp ON vp.Название IN (''ДОГОВОРЮЛ'')
        LEFT JOIN stack.[Свойства] sv ON sv.[Виды-Параметры] = vp.row_id AND sv.[Счет-параметры] = lh.Родитель AND @dstart BETWEEN sv.ДатНач AND sv.ДатКнц AND sv.Значение IS NOT NULL
        GROUP BY f.Счет
        ), header AS (
        SELECT sv.Значение  ДоговорЮЛ,stack.AddrLs(sv.[Счет-Параметры],1) Участок
        FROM stack.Свойства sv 
        JOIN [stack].[Лицевые иерархия]  li ON li.Потомок=sv.[Счет-Параметры]  AND li.ПотомокТип=li.РодительТип AND li.Родитель=li.Потомок
        WHERE sv.[Виды-Параметры]=677 
        ), fndprm AS (
        SELECT prm.Счет
        , ДоговорЮЛ=(SELECT TOP 1 ДоговорЮЛ FROM header WHERE ДоговорЮЛ=prm.ДОГОВОРЮЛ) 
        , Участок=(SELECT TOP 1 Участок FROM header WHERE ДоговорЮЛ=prm.ДОГОВОРЮЛ)
        FROM PrmDat prm
        ), balance AS (
        SELECT Счет,Месяц,УК,Поставщик,Услуга
        ,[СальдоВх]=ROUND(SUM(ISNULL(СальдоВх,0)),2) 
        ,[Начислено]=ROUND(SUM(ISNULL(Тариф,0)),2)  
        ,[Перерасчет]=ROUND(SUM(ISNULL(ПТариф,0)),2)  
        ,[Качество]=ROUND(SUM(ISNULL(КТариф,0)),2)  
        ,[Корр]=ROUND(SUM(ISNULL(Корр,0)),2)  
        ,[СальдоИсх]=ROUND(SUM(ISNULL(СальдоИсх,0)),2)  
        ,[ПениВх]=ROUND(SUM(ISNULL(ПениВх,0)),2)  
        ,[ПениНач]=ROUND(SUM(ISNULL(ПениНач,0)),2)  
        ,[ПениИсх]=ROUND(SUM(ISNULL(ПениИсх,0)),2)  
        FROM (
                                    --СальдоВх--
                                    SELECT Счет,@dstart Месяц, ДоговорУК УК,Поставщик,''СальдоВх''Тип,[Номер услуги] Услуга, SUM([Сумма]) Сумма
                                    FROM [stack].[НСальдо]
                                    WHERE [Месяц расчета]=@dbefore AND ДоговорУК IN ({УК})
                                    GROUP BY Счет, ДоговорУК, Поставщик,[Номер услуги]
                                    --СальдоИсх--
                                    UNION ALL
                                    SELECT Счет, @dstart Месяц, ДоговорУК УК,Поставщик,''СальдоИсх''Тип,[Номер услуги] Услуга, SUM([Сумма]) Сумма
                                    FROM [stack].[НСальдо]
                                    WHERE [Месяц расчета]=@dstart AND ДоговорУК  IN ({УК})
                                    GROUP BY Счет, ДоговорУК, Поставщик,[Номер услуги]
                                    -- Начислено --
                                    UNION ALL
                                    SELECT Счет,[Месяц расчета] Месяц,ДоговорУК УК,Поставщик,[Тип],[Номер услуги] Услуга
                                    ,SUM([Сумма]) Сумма
                                    FROM [stack].[Начисления лицевых]
                                    WHERE [Месяц расчета]=@dstart AND ДоговорУК  IN ({УК})
                                    GROUP BY Счет, [Месяц расчета],[ДоговорУК],[Поставщик],[Тип],[Номер услуги]
                                    -- Коррекция --
                                    UNION ALL
                                    SELECT kz.[Счет-Коррекция]Счет, kz.РасчМесяц Месяц,ks.[Поставщик-Коррекция] [Поставщик], ISNULL(ks.[УКДоговор-Коррекция],-1) УК, ''Корр'' Тип , tu.[Номер услуги] Услуга
                                    ,SUM(ks.Сумма) Сумма
                                    FROM stack.[Коррекция заголовок] kz
                                    JOIN stack.[Коррекция список] ks ON kz.ROW_ID = ks.[КорЗаголовок-Список]
                                    JOIN stack.[Типы услуг] tu ON tu.ROW_ID = ks.[Услуга-Коррекция]
                                    WHERE kz.РасчМесяц=@dstart AND ISNULL(ks.[УКДоговор-Коррекция],-1) IN ({УК})
                                    GROUP BY kz.[Счет-Коррекция], ISNULL(ks.[УКДоговор-Коррекция],-1),kz.РасчМесяц,ks.[Поставщик-Коррекция],tu.[Номер услуги]
                                    -------------- Пени Сальдо Вход---------------------------------
                                    UNION ALL
                                    SELECT [Счет], @dstart Месяц,[ДоговорУК],[Поставщик],''ПениВх''Тип, [Номер услуги] Услуга
                                    ,SUM(Сумма) Сумма						
                                    FROM [stack].[ПениСальдо] ps
                                    WHERE ps.[Месяц расчета]=@dbefore AND ps.ДоговорУК  IN ({УК})
                                    GROUP BY Счет, [ДоговорУК],[Поставщик], [Номер услуги]
                                    -------------- Пени Нач---------------------------------
                                    UNION ALL
                                    SELECT [Счет], [Месяц расчета] Месяц,[ДоговорУК],[Поставщик],''ПениНач''Тип, [Номер услуги] Услуга
                                    ,SUM(Сумма) Сумма
                                    FROM stack.[ПениНачисление] pns
                                    WHERE pns.[Месяц расчета]=@dstart AND pns.ДоговорУК  IN ({УК})
                                    GROUP BY Счет, [Месяц расчета],[ДоговорУК],[Поставщик], [Номер услуги]
                                    -------------- Пени Сальдо Исход---------------------------------
                                    UNION ALL
                                    SELECT [Счет], [Месяц расчета] Месяц,[ДоговорУК],[Поставщик],''ПениИсх''Тип, [Номер услуги] Услуга
                                    ,SUM(Сумма) Сумма						
                                    FROM [stack].[ПениСальдо] ps
                                    WHERE ps.[Месяц расчета]=@dstart AND ps.ДоговорУК  IN ({УК})
                                    GROUP BY Счет, [Месяц расчета],[ДоговорУК],[Поставщик], [Номер услуги]
                )  nl
        PIVOT(SUM(Сумма) FOR [Тип] IN ([СальдоВх],[Тариф], [ПТариф], [КТариф],[Корр],[СальдоИсх],[ПениВх],[ПениНач],[ПениИсх])) pv
        GROUP BY Счет,Месяц,УК,Поставщик,Услуга
        ) ,FinalData AS (
            SELECT FORMAT(bl.Месяц, ''yyyy-MMMM'', ''ru'') AS [Месяц],
                f.ДоговорЮЛ,
                f.Участок,
                org_uk.Наименование AS [УК],
                org_sup.Наименование AS [Поставщик],
                tu.Название AS ВидУслуги,
                bl.Услуга AS КодУслуги,
                bl.СальдоВх,
                bl.Начислено,
                bl.Перерасчет,
                bl.Качество,
                bl.Корр,
                Оплата = ROUND(bl.СальдоВх + bl.Начислено + bl.Перерасчет + bl.Качество + bl.Корр - bl.СальдоИсх, 2),
                bl.СальдоИсх,
                bl.ПениВх,
                bl.ПениНач,
                ПениОпл = ROUND(bl.ПениВх + bl.ПениНач - bl.ПениИсх, 2),
                bl.ПениИсх
            FROM fndprm f 
            JOIN balance bl ON f.Счет = bl.Счет
            JOIN stack.[Типы услуг] tu ON tu.[Номер услуги] = bl.Услуга
            LEFT JOIN [stack].[УК Договоры] ukd ON ukd.ROW_ID = bl.УК
            LEFT JOIN [stack].[Организации] org_uk ON org_uk.ROW_ID = ukd.[Организация-УКДоговор]
            LEFT JOIN [stack].[Организации] org_sup ON org_sup.ROW_ID = bl.Поставщик
        ), postFinal AS (
        SELECT fd.Месяц
        , fd.ДоговорЮЛ
        , fd.Участок
        , fd.УК
        , Поставщик=ISNULL(fd.Поставщик,'''')
        , fd.КодУслуги
        , fd.ВидУслуги
        , fd.СальдоВх
        , fd.Начислено
        , fd.Перерасчет
        , fd.Качество
        , fd.Корр
        , fd.Оплата
        , fd.СальдоИсх
        , fd.ПениВх
        , fd.ПениНач
        , fd.ПениОпл
        , fd.ПениИсх 
        , СальдоИсхДолг=IIF(fd.СальдоИсх>=0,fd.СальдоИсх,0)
        , СальдоИсхПереплата=IIF(fd.СальдоИсх<0,fd.СальдоИсх,0)
        FROM FinalData fd
        )  
        SELECT Месяц, ДоговорЮЛ, Участок , УК, Поставщик, КодУслуги, ВидУслуги
        , СальдоВх=SUM(СальдоВх), Начислено=SUM(Начислено), Перерасчет=SUM(Перерасчет), Качество=SUM(Качество), Корр=SUM(Корр), Оплата=SUM(Оплата), СальдоИсх=SUM(СальдоИсх)
        , СальдоИсхДолг=SUM(СальдоИсхДолг), СальдоИсхПереплата=SUM(СальдоИсхПереплата)
        , ПениВх=SUM(ПениВх), ПениНач=SUM(ПениНач), ПениОпл=SUM(ПениОпл), ПениИсх=SUM(ПениИсх)
        FROM postFinal pf
        GROUP BY Месяц, ДоговорЮЛ, Участок , УК, Поставщик, КодУслуги, ВидУслуги
        OPTION (MAXDOP 0, RECOMPILE);
        ' AS query_text, CAST(N'{"fields":{"statistic":[{"dataField":"Исполнено"},{"dataField":"Время"},{"dataField":"Записей"},{"dataField":"Фильтры"}],"grid":[{"dataField":"Месяц"},{"dataField":"ДоговорЮЛ"},{"dataField":"Участок"},{"dataField":"УК"},{"dataField":"Поставщик"},{"dataField":"КодУслуги"},{"dataField":"ВидУслуги"},{"caption":"Обороты","columns":[{"dataField":"СальдоВх"},{"dataField":"Начислено"},{"dataField":"Перерасчет"},{"dataField":"Качество"},{"dataField":"Корр"},{"dataField":"Оплата"},{"dataField":"СальдоИсх"},{"dataField":"СальдоИсхДолг"},{"dataField":"СальдоИсхПереплата"}]},{"caption":"Обороты Пени","columns":[{"dataField":"ПениВх"},{"dataField":"ПениНач"},{"dataField":"ПениОпл"},{"dataField":"ПениИсх"}]}],"pivot":[{"dataField":"Месяц","area":"column"},{"dataField":"ДоговорЮЛ","area":"row","expanded":true},{"dataField":"Участок","area":"row","expanded":true},{"dataField":"УК","area":"row","expanded":true},{"dataField":"Поставщик","area":"row","expanded":true},{"caption":"Услуга","area":"row","expanded":true},{"caption":"Код услуги","dataField":"КодУслуги","area":"filter","expanded":true},{"caption":"Название услуги","dataField":"ВидУслуги","area":"filter","expanded":true},{"caption":"ВхСальдо","dataField":"СальдоВх","dataType":"number","summaryType":"sum","format":{"type":"fixedPoint","precision":2},"area":"data","unit":"руб"},{"caption":"Начислено","dataField":"Начислено","dataType":"number","summaryType":"sum","format":{"type":"fixedPoint","precision":2},"area":"data","unit":"руб"},{"caption":"Перерасчет","dataField":"Перерасчет","dataType":"number","summaryType":"sum","format":{"type":"fixedPoint","precision":2},"area":"data","unit":"руб"},{"caption":"Качество","dataField":"Качество","dataType":"number","summaryType":"sum","format":{"type":"fixedPoint","precision":2},"area":"data","unit":"руб"},{"caption":"Коррекция","dataField":"Корр","dataType":"number","summaryType":"sum","format":{"type":"fixedPoint","precision":2},"area":"data","unit":"руб"},{"caption":"Оплата","dataField":"Оплата","dataType":"number","summaryType":"sum","format":{"type":"fixedPoint","precision":2},"area":"data","unit":"руб"},{"caption":"СальдоИсх","dataField":"СальдоИсх","dataType":"number","summaryType":"sum","format":{"type":"fixedPoint","precision":2},"area":"data","unit":"руб"},{"caption":"СальдоИсхДолг","dataField":"СальдоИсхДолг","dataType":"number","summaryType":"sum","format":{"type":"fixedPoint","precision":2},"area":"data","unit":"руб"},{"caption":"СальдоИсхПереплата","dataField":"СальдоИсхПереплата","dataType":"number","summaryType":"sum","format":{"type":"fixedPoint","precision":2},"area":"data","unit":"руб"},{"caption":"ПениВх","dataField":"ПениВх","dataType":"number","summaryType":"sum","format":{"type":"fixedPoint","precision":2},"area":"data","unit":"руб"},{"caption":"ПениНач","dataField":"ПениНач","dataType":"number","summaryType":"sum","format":{"type":"fixedPoint","precision":2},"area":"data","unit":"руб"},{"caption":"ПениОпл","dataField":"ПениОпл","dataType":"number","summaryType":"sum","format":{"type":"fixedPoint","precision":2},"area":"data","unit":"руб"},{"caption":"ПениИсх","dataField":"ПениИсх","dataType":"number","summaryType":"sum","format":{"type":"fixedPoint","precision":2},"area":"data","unit":"руб"}]},"filters":{"ФОНД":[],"РасчетыйМесяц":[],"УК":[]},"description":"Оборотно-сальдовая ведомость по договорам юридических лиц.","mandatory":["ФОНД"]}' AS NVARCHAR(MAX)) AS config, 0 AS is_section, 4 AS sort_order) AS src
   ON target.report_key = src.report_key
WHEN MATCHED THEN UPDATE SET title = src.title, icon = src.icon, image = src.image,
    query_text = src.query_text, config = src.config, parent_id = src.parent_id,
    is_section = src.is_section, sort_order = src.sort_order, is_deleted = 0,
    updated_at = SYSUTCDATETIME()
WHEN NOT MATCHED THEN INSERT (report_key, parent_id, title, icon, image, query_text,
    config, is_section, sort_order)
    VALUES (src.report_key, src.parent_id, src.title, src.icon, src.image,
    src.query_text, src.config, src.is_section, src.sort_order);
GO
MERGE dbo.reports AS target
USING (SELECT N'RPT_1206' AS report_key, (SELECT id FROM dbo.reports WHERE report_key = N'ОРН') AS parent_id, N'Платежи' AS title, N'chart' AS icon, N'' AS image, N'DECLARE @month DATE={РасчетыйМесяц};
SELECT final.ЛС
, adr.Район
, adr.Участок
, adr.НП
, adr.Улица
, adr.Дом
, adr.Квартира
, adr.Комната
, kr.ФИО Абонент
, FORMAT(final.Дата, ''yyyy-MM-dd'') [Дата платежа]
, FORMAT(doc.[Дата], ''yyyy-MM-dd'') [Дата выписки]
, orgsource.Наименование [Источник платежа]
, final.Сумма
, 
CASE 
WHEN final.[Распределение-Услуга]=-1 AND final.Тип=2 THEN ''[2] Пени''
WHEN final.[Распределение-Услуга]=-1 AND final.Тип=1 THEN ''[3] Сторно''
WHEN final.[Распределение-Услуга]>0 THEN CONCAT (''['', tu.[Номер услуги], ''] '', tu.Название )
WHEN final.[Распределение-Услуга]=-100 THEN CONCAT (''[Группа] '',  orgsouk.Наименование )
ELSE ''''
END Услуга
, CASE final.Тип WHEN 0 THEN ''[1] Платеж'' WHEN 1 THEN ''[3] Сторно'' WHEN 2 THEN ''[2] Пени'' ELSE '''' END [Тип]
, orgsouk.Наименование [УК]
, orgovuk.Наименование [УК вид оплаты]
, ISNULL(orgpost.Наименование,''Не указан'') Поставщик
, doc.Номер [Номер документа]
, doc.Примечание
, FORMAT(final.РасчМесяц, ''MMMM yyyy'',''ru'') [Расчетный месяц]
FROM (
-------------   Только Список Оплат
SELECT prepay.ROW_ID
, prepay.Номер ЛС
, prepay.Строк
, IIF(prepay.ИтогОВ IS NULL AND prepay.СуммаОВ IS NULL, prepay.СуммаСО,0) Сумма
, prepay.Пени
, prepay.Тип
, prepay.[Платеж-Список]
, prepay.Дата
, prepay.[УК-Оплата]
, prepay.РасчМесяц
, prepay.[Распределение-Платеж]
, prepay.[Распределение-УК]
, prepay.[Распределение-Услуга]
, prepay.[Распределение-Пост]
FROM (
SELECT ls.ROW_ID
, ls.Номер
, so.Сумма СуммаСО
, SUM(ov.Сумма) OVER (PARTITION BY ov.[Распределение-Платеж]) ИтогОВ
, COUNT(ov.Сумма) OVER (PARTITION BY ov.[Распределение-Платеж]) Строк
, ov.Сумма СуммаОВ
, so.Пени
, Тип = 0
, so.[Платеж-Список]
, so.Дата
, so.[УК-Оплата]
, so.РасчМесяц
, [Распределение-Платеж]=so.ROW_ID
, [Распределение-УК]=so.[УК-Оплата]
, [Распределение-Услуга]=-100
, [Распределение-Пост]=-100
FROM stack.[Список оплаты] so 
JOIN [stack].[Лицевые счета] ls ON so.[Счет-Оплата]=ls.ROW_ID
JOIN [stack].[Лицевые иерархия] li ON li.Потомок=ls.ROW_ID AND li.ПотомокТип=5 AND li.Родитель IN ({ФОНД})
LEFT JOIN [stack].[Оплата по видам] ov ON ov.[Распределение-Платеж]=so.ROW_ID
WHERE so.РасчМесяц=@month
) prepay
WHERE prepay.Строк=0
UNION ALL
------------------------------Строк=1  Первая запись ОВ ----------------------
SELECT prepay.ROW_ID
, prepay.Номер ЛС
, prepay.Строк
, prepay.СуммаОВ Сумма
, prepay.Пени
, prepay.Тип
, prepay.[Платеж-Список]
, prepay.Дата
, prepay.[УК-Оплата]
, prepay.РасчМесяц
, prepay.[Распределение-Платеж]
, prepay.[Распределение-УК]
, prepay.[Распределение-Услуга]
, prepay.[Распределение-Пост]
FROM (
SELECT ls.ROW_ID
, ls.Номер
,so.Сумма СуммаСО
, SUM(ov.Сумма) OVER (PARTITION BY ov.[Распределение-Платеж]) ИтогОВ
, COUNT(ov.Сумма) OVER (PARTITION BY ov.[Распределение-Платеж]) Строк
, ov.Сумма СуммаОВ
, so.Пени
, ov.Тип
, so.[Платеж-Список]
, so.Дата
, so.[УК-Оплата]
, so.РасчМесяц
, ov.[Распределение-Платеж]
, ov.[Распределение-УК]
, ov.[Распределение-Услуга]
, ov.[Распределение-Пост]
FROM stack.[Список оплаты] so 
JOIN [stack].[Лицевые счета] ls ON so.[Счет-Оплата]=ls.ROW_ID
JOIN [stack].[Лицевые иерархия] li ON li.Потомок=ls.ROW_ID AND li.ПотомокТип=5 AND li.Родитель IN ({ФОНД})
LEFT JOIN [stack].[Оплата по видам] ov ON ov.[Распределение-Платеж]=so.ROW_ID
WHERE so.РасчМесяц=@month
) prepay
WHERE prepay.Строк=1
UNION ALL
------------------------------Строк=1 Остаток СО -------------
SELECT prepay.ROW_ID
, prepay.Номер ЛС
, prepay.Строк
, ROUND(prepay.СуммаСО-prepay.СуммаОВ,2) Сумма
, Пени=0
, Тип=0
, prepay.[Платеж-Список]
, prepay.Дата
, prepay.[УК-Оплата]
, prepay.РасчМесяц
, prepay.[Распределение-Платеж]
, prepay.[Распределение-УК]
, prepay.[Распределение-Услуга]
, prepay.[Распределение-Пост]
FROM (
SELECT ls.ROW_ID
, ls.Номер
, so.Сумма СуммаСО
, SUM(ov.Сумма) OVER (PARTITION BY ov.[Распределение-Платеж]) ИтогОВ
, COUNT(ov.Сумма) OVER (PARTITION BY ov.[Распределение-Платеж]) Строк
, ov.Сумма СуммаОВ
, so.Пени
, ov.Тип
, so.[Платеж-Список]
, so.Дата
, so.[УК-Оплата]
, so.РасчМесяц
, ov.[Распределение-Платеж]
, ov.[Распределение-УК]
, ov.[Распределение-Услуга]
, ov.[Распределение-Пост]
FROM stack.[Список оплаты] so 
JOIN [stack].[Лицевые счета] ls ON so.[Счет-Оплата]=ls.ROW_ID
JOIN [stack].[Лицевые иерархия] li ON li.Потомок=ls.ROW_ID AND li.ПотомокТип=5 AND li.Родитель IN ({ФОНД})
LEFT JOIN [stack].[Оплата по видам] ov ON ov.[Распределение-Платеж]=so.ROW_ID
WHERE so.РасчМесяц=@month
) prepay
WHERE prepay.Строк=1 AND prepay.СуммаСО<>prepay.ИтогОВ
UNION ALL
------------------------------Строк>1 Указанные в ОВ ----------------------
SELECT prepay.ROW_ID
, prepay.Номер ЛС
, prepay.Строк
, prepay.СуммаОВ Сумма
, prepay.Пени
, prepay.Тип
, prepay.[Платеж-Список]
, prepay.Дата
, prepay.[УК-Оплата]
, prepay.РасчМесяц
, prepay.[Распределение-Платеж]
, prepay.[Распределение-УК]
, prepay.[Распределение-Услуга]
, prepay.[Распределение-Пост]
FROM (
SELECT ls.ROW_ID
, ls.Номер
, so.Сумма СуммаСО
, SUM(ov.Сумма) OVER (PARTITION BY ov.[Распределение-Платеж]) ИтогОВ
, COUNT(ov.Сумма) OVER (PARTITION BY ov.[Распределение-Платеж]) Строк
, ov.Сумма СуммаОВ
, so.Пени
, ov.Тип
, so.[Платеж-Список]
, so.Дата
, so.[УК-Оплата]
, so.РасчМесяц
, ov.[Распределение-Платеж]
, ov.[Распределение-УК]
, ov.[Распределение-Услуга]
, ov.[Распределение-Пост]
FROM stack.[Список оплаты] so 
JOIN [stack].[Лицевые счета] ls ON so.[Счет-Оплата]=ls.ROW_ID
JOIN [stack].[Лицевые иерархия] li ON li.Потомок=ls.ROW_ID AND li.ПотомокТип=5 AND li.Родитель IN ({ФОНД})
LEFT JOIN [stack].[Оплата по видам] ov ON ov.[Распределение-Платеж]=so.ROW_ID
WHERE so.РасчМесяц=@month
) prepay
WHERE prepay.Строк>1
UNION ALL
------------------------------ Остаток СО -------------
SELECT pay.ROW_ID
, pay.ЛС
, pay.Строк
, Сумма=(pay.СуммаСО-pay.ИтогОВ)
, Пени=0
, Тип=0
, pay.[Платеж-Список]
, pay.Дата
, pay.[УК-Оплата]
, pay.РасчМесяц
, pay.[Распределение-Платеж]
, [Распределение-УК]=pay.[УК-Оплата]
, [Распределение-Услуга]=-100
, [Распределение-Пост]=-100
FROM (
				SELECT prepay.ROW_ID
				, prepay.Номер ЛС
				, prepay.Строк
				, prepay.СуммаСО
				, ROUND(prepay.ИтогОВ,2) ИтогОВ
				, prepay.[Платеж-Список]
				, prepay.Дата
				, prepay.[УК-Оплата]
				, prepay.РасчМесяц
				, prepay.[Распределение-Платеж]
				, COUNT(*) КолВо
								FROM (
													SELECT ls.ROW_ID
													, ls.Номер
													, so.Сумма СуммаСО
													, SUM(ov.Сумма) OVER (PARTITION BY ov.[Распределение-Платеж]) ИтогОВ
													, COUNT(ov.Сумма) OVER (PARTITION BY ov.[Распределение-Платеж]) Строк
													, ov.Сумма СуммаОВ
													, so.Пени
													, ov.Тип
													, so.[Платеж-Список]
													, so.Дата
													, so.[УК-Оплата]
													, so.РасчМесяц
													, ov.[Распределение-Платеж]
													, ov.[Распределение-УК]
													, ov.[Распределение-Услуга]
													, ov.[Распределение-Пост]
													FROM stack.[Список оплаты] so 
													JOIN [stack].[Лицевые счета] ls ON so.[Счет-Оплата]=ls.ROW_ID
													JOIN [stack].[Лицевые иерархия] li ON li.Потомок=ls.ROW_ID AND li.ПотомокТип=5 AND li.Родитель IN ({ФОНД})
													LEFT JOIN [stack].[Оплата по видам] ov ON ov.[Распределение-Платеж]=so.ROW_ID
													WHERE so.РасчМесяц=@month
								) prepay
								WHERE prepay.Строк>1 AND ROUND(prepay.СуммаСО,2)>ROUND(prepay.ИтогОВ,2)
				GROUP BY prepay.ROW_ID
				, prepay.Номер
				, prepay.Строк
				, prepay.СуммаСО
				, prepay.ИтогОВ
				, prepay.[Платеж-Список]
				, prepay.Дата
				, prepay.[УК-Оплата]
				, prepay.РасчМесяц
				, prepay.[Распределение-Платеж]
 ) pay
) final
LEFT JOIN [stack].Документ doc ON doc.ROW_ID=final.[Платеж-Список]
LEFT JOIN [stack].[Типы услуг] tu ON tu.ROW_ID=final.[Распределение-Услуга]
OUTER APPLY (SELECT Наименование FROM [stack].Организации WHERE ROW_ID=doc.[Источник-Платежи]) orgsource
OUTER APPLY (SELECT * FROM [stack].Организации WHERE ROW_ID=final.[УК-Оплата]) orgsouk
OUTER APPLY (SELECT Наименование FROM [stack].Организации WHERE ROW_ID=final.[Распределение-УК]) orgovuk
OUTER APPLY (SELECT Наименование FROM [stack].Организации WHERE ROW_ID=final.[Распределение-Пост]) orgpost
OUTER APPLY (SELECT ФИО FROM [stack].[Карточки регистрации] WHERE [Счет-Наниматель]=final.ROW_ID) kr
CROSS APPLY stack.AddrLs_Table(final.ROW_ID, 0) adr
WHERE final.[УК-Оплата] IN ({УКП}) AND final.Дата BETWEEN {perStart} AND {perEnd}
OPTION (MAXDOP 0, RECOMPILE);
        ' AS query_text, CAST(N'{"fields":{"statistic":[{"dataField":"Исполнено"},{"dataField":"Время"},{"dataField":"Записей"},{"dataField":"Фильтры"}],"grid":[{"dataField":"Месяц"},{"caption":"Адрес","columns":[{"dataField":"Район"},{"dataField":"Участок"},{"dataField":"НП"},{"dataField":"Улица"},{"dataField":"Дом"},{"dataField":"Квартира"},{"dataField":"Комната"},{"dataField":"УК вид оплаты"},{"dataField":"Поставщик"},{"dataField":"ЛС"},{"dataField":"Абонент"},{"dataField":"УК"},{"dataField":"Услуга"},{"dataField":"Тип"},{"dataField":"Источник платежа"},{"dataField":"Дата платежа"},{"dataField":"Дата выписки"},{"dataField":"Номер документа"},{"dataField":"Примечание"},{"dataField":"Сумма","dataType":"number","format":{"type":"fixedPoint","precision":2}}]}],"pivot":[{"dataField":"Расчетный месяц","area":"column","expanded":true},{"dataField":"Район","area":"filter"},{"dataField":"Участок","area":"row","expanded":true},{"dataField":"НП","area":"filter"},{"dataField":"Улица","area":"filter"},{"dataField":"Дом","area":"filter"},{"dataField":"Квартира","area":"filter"},{"dataField":"Комната","area":"filter"},{"dataField":"УК вид оплаты","area":"filter"},{"dataField":"ЛС","area":"filter","expanded":true},{"dataField":"Абонент","area":"filter","expanded":true},{"dataField":"УК","area":"row","expanded":true},{"dataField":"Источник платежа","area":"row","expanded":true},{"dataField":"Поставщик","area":"row","expanded":true},{"dataField":"Услуга","area":"row","expanded":true},{"dataField":"Тип","area":"column","expanded":true},{"dataField":"Дата платежа","area":"filter"},{"dataField":"Дата выписки","area":"filter"},{"dataField":"Номер документа","area":"filter"},{"dataField":"Примечание","area":"filter"},{"caption":"Сумма","dataField":"Сумма","dataType":"number","summaryType":"sum","format":{"type":"fixedPoint","precision":2},"area":"data","unit":"руб"}],"chart":{"pvtfld":[{"dataField":"Расчетный месяц","area":"column","expanded":true},{"dataField":"Район","area":"filter"},{"dataField":"Участок","area":"row","expanded":true},{"dataField":"НП","area":"filter"},{"dataField":"Улица","area":"filter"},{"dataField":"Дом","area":"filter"},{"dataField":"Квартира","area":"filter"},{"dataField":"Комната","area":"filter"},{"dataField":"УК вид оплаты","area":"filter"},{"dataField":"ЛС","area":"filter","expanded":true},{"dataField":"Абонент","area":"filter","expanded":true},{"dataField":"УК","area":"row","expanded":true},{"dataField":"Источник платежа","area":"row","expanded":true},{"dataField":"Поставщик","area":"row","expanded":true},{"dataField":"Услуга","area":"row","expanded":true},{"dataField":"Тип","area":"column","expanded":true},{"dataField":"Дата платежа","area":"filter"},{"dataField":"Дата выписки","area":"filter"},{"dataField":"Номер документа","area":"filter"},{"dataField":"Примечание","area":"filter"},{"caption":"Сумма","dataField":"Сумма","dataType":"number","summaryType":"sum","format":{"type":"fixedPoint","precision":2},"area":"data","unit":"руб"}],"series":[{"field":"сумма","name":"Сумма","type":"bar"}],"argument":"период","title":"График"}},"filters":{"ФОНД":[],"РасчетыйМесяц":[],"ПериодДни":[],"УКП":[]},"description":"Отчёт по платежам — детализация поступлений от абонентов.","mandatory":["ФОНД"]}' AS NVARCHAR(MAX)) AS config, 0 AS is_section, 5 AS sort_order) AS src
   ON target.report_key = src.report_key
WHEN MATCHED THEN UPDATE SET title = src.title, icon = src.icon, image = src.image,
    query_text = src.query_text, config = src.config, parent_id = src.parent_id,
    is_section = src.is_section, sort_order = src.sort_order, is_deleted = 0,
    updated_at = SYSUTCDATETIME()
WHEN NOT MATCHED THEN INSERT (report_key, parent_id, title, icon, image, query_text,
    config, is_section, sort_order)
    VALUES (src.report_key, src.parent_id, src.title, src.icon, src.image,
    src.query_text, src.config, src.is_section, src.sort_order);
GO
MERGE dbo.reports AS target
USING (SELECT N'RPT_1207' AS report_key, (SELECT id FROM dbo.reports WHERE report_key = N'ОРН') AS parent_id, N'Платежи с Адресами' AS title, N'chart' AS icon, N'' AS image, N'SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;
DECLARE @month DATE={РасчетыйМесяц};
WITH 
-- 1. Получение счетов через иерархию (новый подход)
AccountHierarchy AS (
    SELECT 
        x.Дом,
        dm.address,
        dm.geo_lat,
        dm.geo_lon,
        x.Счет,
        x.ЛС,
        x.Код_НСИ
    FROM (
        SELECT 
            lss.Код_НСИ, 
            lii.Родитель AS Дом, 
            ls.Номер AS ЛС, 
            lii.Потомок AS Счет
        FROM [stack].[Лицевые иерархия] li
        JOIN [stack].[Лицевые иерархия] lii ON li.Потомок = lii.Родитель
        JOIN [stack].[Лицевые счета] ls ON ls.ROW_ID = lii.Потомок
        JOIN [stack].[Лицевые счета] lss ON lss.ROW_ID = lii.Родитель
        WHERE li.Родитель IN ({ФОНД}) AND li.ПотомокТип = 3 AND lii.ПотомокТип = 5
    ) x
    LEFT JOIN [nsiaddresscache].[dbo].houses dm ON dm.id=x.[Код_НСИ]
),
-- 2. Базовые данные с оконными функциями
BaseData AS (
    SELECT 
        ah.Счет AS ROW_ID,
        ah.ЛС AS Номер,
        ah.Дом,
        ah.address,
        ah.geo_lat,
        ah.geo_lon,
        so.Сумма AS СуммаСО,
        so.Пени,
        so.[Платеж-Список],
        so.Дата,
        so.[УК-Оплата],
        so.РасчМесяц,
        ov.[Распределение-Платеж],
        ov.[Распределение-УК],
        ov.[Распределение-Услуга],
        ov.[Распределение-Пост],
        ov.Сумма AS СуммаОВ,
        ov.Тип,
        SUM(ov.Сумма) OVER (PARTITION BY ov.[Распределение-Платеж]) AS ИтогОВ,
        COUNT(ov.Сумма) OVER (PARTITION BY ov.[Распределение-Платеж]) AS Строк
    FROM stack.[Список оплаты] so 
    JOIN AccountHierarchy ah ON ah.Счет = so.[Счет-Оплата]
    LEFT JOIN [stack].[Оплата по видам] ov ON ov.[Распределение-Платеж] = so.ROW_ID
    WHERE so.РасчМесяц=@month AND so.[УК-Оплата] IN ({УКП})
),

-- 3. Логика распределения строк
DistributedData AS (
    SELECT 
        ROW_ID,
        Номер AS ЛС,
        Дом,
        address,
        geo_lat,
        geo_lon,
        Строк,
        CASE 
            WHEN Строк = 0 THEN ISNULL(СуммаСО, 0)
            WHEN Строк = 1 AND СуммаСО <> ИтогОВ THEN ROUND(СуммаСО - ИтогОВ, 2)
            ELSE ISNULL(СуммаОВ, 0)
        END AS Сумма,
        Пени,
        Тип,
        [Платеж-Список],
        Дата,
        [УК-Оплата],
        РасчМесяц,
        [Распределение-Платеж],
        [Распределение-УК],
        [Распределение-Услуга],
        [Распределение-Пост],
        CASE WHEN Строк > 1 AND ROUND(СуммаСО, 2) > ROUND(ИтогОВ, 2) THEN 1 ELSE 0 END AS HasRemainder
    FROM BaseData
    WHERE Строк = 0 OR Строк = 1 OR (Строк > 1 AND СуммаСО <> ИтогОВ)
    
    UNION ALL
    
    SELECT 
        ROW_ID,
        Номер AS ЛС,
        Дом,
        address,
        geo_lat,
        geo_lon,
        Строк,
        ROUND(СуммаСО - ИтогОВ, 2) AS Сумма,
        0 AS Пени,
        0 AS Тип,
        [Платеж-Список],
        Дата,
        [УК-Оплата],
        РасчМесяц,
        [Распределение-Платеж],
        [УК-Оплата] AS [Распределение-УК],
        -100 AS [Распределение-Услуга],
        -100 AS [Распределение-Пост],
        0 AS HasRemainder
    FROM BaseData
    WHERE Строк > 1 AND ROUND(СуммаСО, 2) > ROUND(ИтогОВ, 2)
),

-- 4. Предварительное соединение с организациями
OrgData AS (
    SELECT 
        dd.*,
        orgsouk.Название AS УК_Наименование,
        orgovuk.Название AS УК_Вид_Оплаты,
        orgpost.Название AS Поставщик_Наименование
    FROM DistributedData dd
    LEFT JOIN [stack].Организации orgsouk ON orgsouk.ROW_ID = dd.[УК-Оплата]
    LEFT JOIN [stack].Организации orgovuk ON orgovuk.ROW_ID = dd.[Распределение-УК]
    LEFT JOIN [stack].Организации orgpost ON orgpost.ROW_ID = dd.[Распределение-Пост]
)

-- 5. Финальный SELECT
SELECT 
    od.ЛС,
    -- Адрес из кэша (быстрее чем AddrLs_Table)
    od.address AS Адрес,
    od.Дом,
    od.geo_lat,
    od.geo_lon,
    kr.ФИО AS Абонент,
    FORMAT(od.Дата, ''yyyy-MM-dd'',''ru'') AS [Дата платежа],
    FORMAT(doc.[Дата], ''yyyy-MM-dd'',''ru'') AS [Дата выписки],
    COALESCE(NULLIF(orgsource.Наименование, ''(Не указано)''),NULLIF(doc.Примечание, ''(Не указано)''),''(Не указано)'') AS [Источник платежа],
    od.Сумма,
    CASE 
        WHEN od.[Распределение-Услуга] = -1 AND od.Тип = 2 THEN ''[2] Пени''
        WHEN od.[Распределение-Услуга] = -1 AND od.Тип = 1 THEN ''[3] Сторно''
        WHEN od.[Распределение-Услуга] > 0 THEN CONCAT(''['', tu.[Номер услуги], ''] '', tu.Название)
        WHEN od.[Распределение-Услуга] = -100 THEN CONCAT(''[Группа] '', od.УК_Наименование)
        ELSE ''(Не указано)''
    END AS Услуга,
    CASE od.Тип  
        WHEN 0 THEN ''[1] Платеж'' 
        WHEN 1 THEN ''[3] Сторно'' 
        WHEN 2 THEN ''[2] Пени'' 
        ELSE ''[1] Платеж'' 
    END AS [Тип],
    ISNULL(od.УК_Наименование, ''(Не указано)'') AS [УК],
    ISNULL(od.УК_Вид_Оплаты, ''(Не указано)'') AS [УК вид оплаты],
    ISNULL(od.Поставщик_Наименование, ''(Не указано)'') AS Поставщик,
    doc.Номер AS [Номер документа],
    doc.Примечание,
    FORMAT(od.РасчМесяц, ''MMMM yyyy'',''ru'') AS [Расчетный месяц]
FROM OrgData od
LEFT JOIN [stack].Документ doc ON doc.ROW_ID = od.[Платеж-Список]
LEFT JOIN [stack].[Типы услуг] tu ON tu.ROW_ID = od.[Распределение-Услуга]
OUTER APPLY (SELECT Название Наименование FROM [stack].Организации WHERE ROW_ID = doc.[Источник-Платежи]) orgsource
OUTER APPLY (SELECT ФИО FROM [stack].[Карточки регистрации] WHERE [Счет-Наниматель] = od.ROW_ID) kr
WHERE od.Дата BETWEEN {ПериодДни_start} AND {ПериодДни_end}
OPTION (MAXDOP 0, RECOMPILE);
        ' AS query_text, CAST(N'{"fields":{"statistic":[{"dataField":"Исполнено"},{"dataField":"Время"},{"dataField":"Записей"},{"dataField":"Фильтры"}],"grid":[{"dataField":"Расчетный месяц"},{"dataField":"Адрес"},{"dataField":"Дом"},{"dataField":"УК вид оплаты"},{"dataField":"Поставщик"},{"dataField":"ЛС"},{"dataField":"Абонент"},{"dataField":"УК"},{"dataField":"Услуга"},{"dataField":"Тип"},{"dataField":"Источник платежа"},{"dataField":"Дата платежа"},{"dataField":"Дата выписки"},{"dataField":"Номер документа"},{"dataField":"Примечание"},{"dataField":"Сумма","dataType":"number","format":{"type":"fixedPoint","precision":2}}],"pivot":[{"dataField":"Расчетный месяц","area":"column","expanded":true},{"dataField":"Адрес","area":"filter"},{"dataField":"Дом","area":"filter"},{"dataField":"УК вид оплаты","area":"filter"},{"dataField":"ЛС","area":"filter","expanded":true},{"dataField":"Абонент","area":"filter","expanded":true},{"dataField":"УК","area":"row","expanded":true},{"dataField":"Источник платежа","area":"row","expanded":true},{"dataField":"Поставщик","area":"row","expanded":true},{"dataField":"Услуга","area":"row","expanded":true},{"dataField":"Тип","area":"column","expanded":true},{"dataField":"Дата платежа","area":"filter"},{"dataField":"Дата выписки","area":"filter"},{"dataField":"Номер документа","area":"filter"},{"dataField":"Примечание","area":"filter"},{"caption":"Сумма","dataField":"Сумма","dataType":"number","summaryType":"sum","format":{"type":"fixedPoint","precision":2},"area":"data","unit":"руб"}],"chart":{"pvtfld":[{"dataField":"Расчетный месяц","area":"filter","expanded":true},{"dataField":"Адрес","area":"filter"},{"dataField":"Дом","area":"filter"},{"dataField":"УК вид оплаты","area":"filter"},{"dataField":"ЛС","area":"filter","expanded":true},{"dataField":"Абонент","area":"filter","expanded":true},{"dataField":"Источник платежа","area":"row","expanded":false},{"dataField":"УК","area":"row","expanded":true},{"dataField":"Поставщик","area":"row","expanded":true},{"dataField":"Услуга","area":"row","expanded":true},{"dataField":"Тип","area":"filter","expanded":true},{"dataField":"Дата платежа","area":"column"},{"dataField":"Дата выписки","area":"filter"},{"dataField":"Номер документа","area":"filter"},{"dataField":"Примечание","area":"filter"},{"caption":"Сумма","dataField":"Сумма","dataType":"number","summaryType":"sum","format":{"type":"fixedPoint","precision":2},"area":"data","unit":"руб"}],"series":[{"field":"сумма","name":"Сумма","type":"bar"}],"argument":"период","title":"График"},"map":{}},"filters":{"ФОНД":[],"РасчетыйМесяц":[],"УКП":[],"ПериодДни":[]},"description":"Платежи с привязкой к адресам лицевых счетов.","mandatory":["ФОНД","РасчетыйМесяц"]}' AS NVARCHAR(MAX)) AS config, 0 AS is_section, 6 AS sort_order) AS src
   ON target.report_key = src.report_key
WHEN MATCHED THEN UPDATE SET title = src.title, icon = src.icon, image = src.image,
    query_text = src.query_text, config = src.config, parent_id = src.parent_id,
    is_section = src.is_section, sort_order = src.sort_order, is_deleted = 0,
    updated_at = SYSUTCDATETIME()
WHEN NOT MATCHED THEN INSERT (report_key, parent_id, title, icon, image, query_text,
    config, is_section, sort_order)
    VALUES (src.report_key, src.parent_id, src.title, src.icon, src.image,
    src.query_text, src.config, src.is_section, src.sort_order);
GO
MERGE dbo.reports AS target
USING (SELECT N'RPT_1001' AS report_key, (SELECT id FROM dbo.reports WHERE report_key = N'ОРН') AS parent_id, N'Анализ СМС (2025 год)' AS title, N'chart' AS icon, N'' AS image, N'
SELECT [Логин],[Оператор],[Номер]
,FORMAT([Время получения статуса], ''[yyyy-MM-dd]'', ''ru'') [Время получения статуса]
,FORMAT([Время отправки], ''[yyyy-MM] MMMM'', ''ru'') [Месяц]
,[Текст SMS] Текст
,[Частей] Количество
FROM [dbo].[LSV_Temp_SMS_STAT_20260122_1]
WHERE [Время отправки] BETWEEN {ПериодМесяцы_start} AND {ПериодМесяцы_end}
' AS query_text, CAST(N'{"fields":{"statistic":[{"dataField":"Исполнено"},{"dataField":"Время"},{"dataField":"Записей"},{"dataField":"Фильтры"}],"pivot":[{"caption":"Время получения статуса","dataField":"Время получения статуса","area":"filter","expanded":false},{"caption":"Текст","dataField":"Текст","area":"filter","expanded":false},{"caption":"Номер","dataField":"Номер","area":"filter","expanded":false},{"caption":"Месяц","dataField":"Месяц","area":"column"},{"caption":"Логин","dataField":"Логин","area":"row","expanded":true},{"caption":"Оператор","dataField":"Оператор","area":"row","expanded":false},{"caption":"Количество","dataField":"Количество","dataType":"number","summaryType":"sum","format":{"type":"fixedPoint","precision":0},"area":"data","unit":"смс"}],"chart":{"pvtfld":[{"caption":"Время получения статуса","dataField":"Время получения статуса","area":"filter","expanded":false},{"caption":"Текст","dataField":"Текст","area":"filter","expanded":false},{"caption":"Месяц","dataField":"Месяц","area":"column"},{"caption":"Логин","dataField":"Логин","area":"row","expanded":true},{"caption":"Оператор","dataField":"Оператор","area":"row","expanded":true},{"caption":"Номер","dataField":"Номер","area":"row","expanded":false},{"caption":"Количество","dataField":"Количество","dataType":"number","summaryType":"sum","format":{"type":"fixedPoint","precision":0},"area":"data","unit":"смс"}],"series":[{"field":"СуммаОпл","name":"СуммаОпл","type":"bar"}],"argument":"период","title":"График"}},"filters":{"ПериодМесяцы":{"Начало":"2025-01-01","Окончание":"2025-12-31"}},"description":"Статистический анализ отправленных СМС-сообщений за 2025 год."}' AS NVARCHAR(MAX)) AS config, 0 AS is_section, 7 AS sort_order) AS src
   ON target.report_key = src.report_key
WHEN MATCHED THEN UPDATE SET title = src.title, icon = src.icon, image = src.image,
    query_text = src.query_text, config = src.config, parent_id = src.parent_id,
    is_section = src.is_section, sort_order = src.sort_order, is_deleted = 0,
    updated_at = SYSUTCDATETIME()
WHEN NOT MATCHED THEN INSERT (report_key, parent_id, title, icon, image, query_text,
    config, is_section, sort_order)
    VALUES (src.report_key, src.parent_id, src.title, src.icon, src.image,
    src.query_text, src.config, src.is_section, src.sort_order);
GO
MERGE dbo.reports AS target
USING (SELECT N'RPT_1002' AS report_key, (SELECT id FROM dbo.reports WHERE report_key = N'ОРН') AS parent_id, N'Статистика квитанций (по месяцам)' AS title, N'chart' AS icon, N'' AS image, N'
SELECT  FORMAT(ki.Месяц, ''[yyyy-MM] MMMM'', ''ru'') [Месяц],
               		   adr.Участок,
			   org.ЛУ Название,
			   org.ДЕЗНаим Наименование,
			   COUNT(*) Количество
FROM [stack].Квит_Исполнители ki
JOIN [stack].[Квит_Организации] org ON org.ROW_ID=ki.[КвитИсполнители-ОргИсп]
CROSS APPLY stack.AddrLs_Table(ki.[КвитИсполнители-Счет], 0) adr
WHERE ki.Месяц BETWEEN {ПериодМесяцы_start} AND {ПериодМесяцы_end}
GROUP BY ki.Месяц,adr.Участок, org.ЛУ, org.ДЕЗНаим
ORDER BY 1
' AS query_text, CAST(N'{"fields":{"statistic":[{"dataField":"Исполнено"},{"dataField":"Время"},{"dataField":"Записей"},{"dataField":"Фильтры"}],"pivot":[{"caption":"Название","dataField":"Название","area":"filter","expanded":false},{"caption":"Месяц","dataField":"Месяц","area":"column"},{"caption":"Участок","dataField":"Участок","area":"row","expanded":true},{"caption":"Наименование","dataField":"Наименование","area":"row","expanded":true},{"caption":"Количество","dataField":"Количество","dataType":"number","summaryType":"sum","format":{"type":"fixedPoint","precision":0},"area":"data","unit":"квит."}],"chart":{"pvtfld":[{"caption":"Название","dataField":"Название","area":"filter","expanded":false},{"caption":"Месяц","dataField":"Месяц","area":"column"},{"caption":"Участок","dataField":"Участок","area":"row","expanded":true},{"caption":"Наименование","dataField":"Наименование","area":"row","expanded":true},{"caption":"Количество","dataField":"Количество","dataType":"number","summaryType":"sum","format":{"type":"fixedPoint","precision":0},"area":"data","unit":"квит."}],"series":[{"field":"Количество","name":"Количество","type":"bar"}],"argument":"Период","title":"График"}},"filters":{"ПериодМесяцы":{"Начало":"2026-01-01","Окончание":"2026-04-01"}},"description":"Статистика выпущенных квитанций с группировкой по месяцам."}' AS NVARCHAR(MAX)) AS config, 0 AS is_section, 8 AS sort_order) AS src
   ON target.report_key = src.report_key
WHEN MATCHED THEN UPDATE SET title = src.title, icon = src.icon, image = src.image,
    query_text = src.query_text, config = src.config, parent_id = src.parent_id,
    is_section = src.is_section, sort_order = src.sort_order, is_deleted = 0,
    updated_at = SYSUTCDATETIME()
WHEN NOT MATCHED THEN INSERT (report_key, parent_id, title, icon, image, query_text,
    config, is_section, sort_order)
    VALUES (src.report_key, src.parent_id, src.title, src.icon, src.image,
    src.query_text, src.config, src.is_section, src.sort_order);
GO
MERGE dbo.reports AS target
USING (SELECT N'RPT_1003' AS report_key, (SELECT id FROM dbo.reports WHERE report_key = N'ОРН') AS parent_id, N'Умные приборы учета' AS title, N'chart' AS icon, N'' AS image, N'
SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;
DECLARE @month DATE={РасчетыйМесяц};

;WITH pkz AS(
SELECT ЗавНомер,ДатаОпрос,ДатаПоказания,
ROUND(ISNULL([1000],0),2)[1000],
ROUND(ISNULL([1001],0),2)[1001],
ROUND(ISNULL([1002],0),2)[1002],
ROUND(ISNULL([1003],0),2)[1003],
ROUND(ISNULL([1004],0),2)[1004]
FROM
(
    SELECT 
        pr.ЗавНомер, 
        kn.ТипКанала, 
        pk.ДатаОпрос,
		pk.ДатаПоказания,
        pk.Показание
    FROM [10.51.7.49].[kol_atom_asd].[stack].[АСД Приборы] pr
    JOIN [10.51.7.49].[kol_atom_asd].[stack].[АСД Каналы] kn 
        ON kn.Прибор = pr.row_id
    OUTER APPLY (
        SELECT 
            ds.Канал, 
            MAX(CAST(ds.ДатаВремяПоступления AS DATE)) AS ДатаОпрос, 
            MAX(CAST(ds.ДатаВремя AS DATE)) AS ДатаПоказания, 
            MAX(ds.Значение) AS Показание
        FROM [10.51.7.49].[kol_atom_asd].[stack].[АСД ДанНаСут] ds
        WHERE ds.Канал = kn.row_id AND kn.ТипКанала IN (1000,1001,1002,1003,1004)AND ds.ДатаВремяПоступления IS NOT NULL
        GROUP BY ds.Канал
    ) pk
) AS SourceTable
PIVOT
(
    MAX(Показание)
    FOR ТипКанала IN ([1000], [1001], [1002], [1003], [1004])
) AS PivotTable
), pkzstek AS(
SELECT 
    [Объект-Показания],
	Дата,
    ROUND(ISNULL([0],0),2)[0],
    ROUND(ISNULL([1],0),2)[1],
    ROUND(ISNULL([2],0),2)[2],
    ROUND(ISNULL([3],0),2)[3]
FROM (
    SELECT 
        ps.[Объект-Показания], 
		MAX(CAST(ps.Дата AS DATE)) Дата,
        ps.Тариф, 
        MAX(ps.Показание) AS Показание
    FROM [stack].[Показания счетчиков] ps 
    WHERE ps.[Расчетный месяц] = @month
        AND ps.ТипВвода = 25
        AND ps.Тип = 1
    GROUP BY ps.[Объект-Показания], ps.Тариф
) AS SourceTable
PIVOT (
    MAX(Показание)
    FOR Тариф IN ([0], [1], [2], [3])
) AS PivotTable
), Final AS(
SELECT pkz.*, pkzs.*, so.[Объекты-Счет], so.ROW_ID
FROM pkz
JOIN [stack].[Список объектов] so ON pkz.ЗавНомер=so.ЗаводскойНомер
JOIN pkzstek pkzs ON pkzs.[Объект-Показания]=so.ROW_ID --AND pkz.ДатаПоказания=pkzs.Дата
WHERE pkz.ДатаОпрос IS NOT NULL
),
 PrStatus AS(
    SELECT f.[Объекты-Счет], MAX(CASE WHEN vp.Название = ''СОСТОЯНИЕ'' THEN sv.Значение END) AS СОСТОЯНИЕ
    FROM Final f
    LEFT JOIN stack.[Виды параметров] vp ON vp.Название=''СОСТОЯНИЕ''
    LEFT JOIN stack.[Свойства] sv ON sv.[Виды-Параметры] = vp.row_id 
        AND sv.[Счет-параметры] = f.[Объекты-Счет] 
        AND GETDATE() BETWEEN sv.ДатНач AND sv.ДатКнц
        AND sv.Значение IS NOT NULL
    GROUP BY f.[Объекты-Счет]
),
 PrSmart AS(
    SELECT f.[Объект-Показания], MAX(CASE WHEN vp.Название = ''ПОЧАСОВОЙ'' THEN sv.Значение END) AS ПОЧАСОВОЙ
    FROM Final f
    LEFT JOIN stack.[Виды параметров] vp ON vp.Название =''ПОЧАСОВОЙ''
    LEFT JOIN stack.[Свойства] sv ON sv.[Виды-Параметры] = vp.row_id 
        AND sv.[Объекты-Параметры] = f.[Объект-Показания] 
        AND GETDATE() BETWEEN sv.ДатНач AND sv.ДатКнц
        AND sv.Значение IS NOT NULL
    GROUP BY f.[Объект-Показания]
)
SELECT FORMAT(@month, ''[yyyy-MM] MMMM'', ''ru'') [Месяц]
, x.Дом
, dm.address
, dm.geo_lat
, dm.geo_lon
, x.Счет
, x.ЛС
, x.Код_НСИ
, f.ЗавНомер Прибор
, FORMAT(f.ДатаОпрос, ''[yyyy-MM-dd]'', ''ru'') Опрос
, FORMAT(f.ДатаПоказания, ''[yyyy-MM-dd]'', ''ru'') [Дата_АСД]
, CONVERT(DECIMAL(18,2), f.[1000]) [Показание_АСД]
, CONVERT(DECIMAL(18,2), f.[1001]) [Показание_АСД_День]
, CONVERT(DECIMAL(18,2), f.[1002]) [Показание_АСД_Ночь]
, CONVERT(DECIMAL(18,2), f.[0]+f.[1]) [Показание_СТЕК]
, CONVERT(DECIMAL(18,2), IIF(f.[1]=0,0,f.[0])) [Показание_СТЕК_День]
, CONVERT(DECIMAL(18,2),f.[1]) [Показание_СТЕК_Ночь]
, sm.ПОЧАСОВОЙ
, CASE st.СОСТОЯНИЕ WHEN 0 THEN ''Используется'' WHEN 1 THEN ''Не проживает'' WHEN 2 THEN ''Закрыт'' ELSE '''' END AS СОСТОЯНИЕ
    FROM (
        SELECT DISTINCT
            lss.Код_НСИ, 
            lii.Родитель AS Дом, 
            ls.Номер AS ЛС, 
            lii.Потомок AS Счет
        FROM [stack].[Лицевые иерархия] li
        JOIN [stack].[Лицевые иерархия] lii ON li.Потомок = lii.Родитель
        JOIN [stack].[Лицевые счета] ls ON ls.ROW_ID = lii.Потомок
        JOIN Final f ON f.[Объекты-Счет] = ls.ROW_ID
        JOIN [stack].[Лицевые счета] lss ON lss.ROW_ID = lii.Родитель		 
        WHERE li.ПотомокТип = 3 AND lii.ПотомокТип = 5  
    ) x
LEFT JOIN [nsiaddresscache].[dbo].houses dm ON dm.id=x.[Код_НСИ]
JOIN Final f ON x.Счет=f.[Объекты-Счет]
LEFT JOIN PrSmart  sm ON sm.[Объект-Показания]=f.[Объект-Показания]
LEFT JOIN PrStatus st ON st.[Объекты-Счет]=f.[Объекты-Счет]
OPTION (MAXDOP 0, RECOMPILE);

' AS query_text, CAST(N'{"fields":{"statistic":[{"dataField":"Исполнено"},{"dataField":"Время"},{"dataField":"Записей"},{"dataField":"Фильтры"}],"pivot":[{"caption":"Месяц","dataField":"Месяц","area":"column"},{"caption":"Дата Опроса","dataField":"Опрос","area":"column"},{"caption":"Дата АСД","dataField":"Дата_АСД","area":"column"},{"caption":"ИдДом","dataField":"Дом","area":"row","expanded":false},{"caption":"Адрес","dataField":"address","area":"filter","expanded":false},{"caption":"ЛС","dataField":"ЛС","area":"filter","expanded":true},{"caption":"Прибор","dataField":"Прибор","area":"row","expanded":true},{"caption":"ПОЧАСОВОЙ","dataField":"ПОЧАСОВОЙ","area":"filter","expanded":true},{"caption":"СОСТОЯНИЕ","dataField":"СОСТОЯНИЕ","area":"filter","expanded":true},{"caption":"Показание АСД","dataField":"Показание_АСД","dataType":"number","summaryType":"sum","format":{"type":"fixedPoint","precision":2},"area":"data"},{"caption":"Показание АСД День","dataField":"Показание_АСД_День","dataType":"number","summaryType":"sum","format":{"type":"fixedPoint","precision":2},"area":"filter"},{"caption":"Показание АСД Ночь","dataField":"Показание_АСД_Ночь","dataType":"number","summaryType":"sum","format":{"type":"fixedPoint","precision":2},"area":"filter"},{"caption":"Показание СТЕК","dataField":"Показание_СТЕК","dataType":"number","summaryType":"sum","format":{"type":"fixedPoint","precision":2},"area":"data"},{"caption":"Показание СТЕК День","dataField":"Показание_СТЕК_День","dataType":"number","summaryType":"sum","format":{"type":"fixedPoint","precision":2},"area":"filter"},{"caption":"Показание СТЕК Ночь","dataField":"Показание_СТЕК_Ночь","dataType":"number","summaryType":"sum","format":{"type":"fixedPoint","precision":2},"area":"filter"}],"map":{}},"filters":{"РасчетыйМесяц":[]},"description":"Информация по умным приборам учёта с каналами связи."}' AS NVARCHAR(MAX)) AS config, 0 AS is_section, 9 AS sort_order) AS src
   ON target.report_key = src.report_key
WHEN MATCHED THEN UPDATE SET title = src.title, icon = src.icon, image = src.image,
    query_text = src.query_text, config = src.config, parent_id = src.parent_id,
    is_section = src.is_section, sort_order = src.sort_order, is_deleted = 0,
    updated_at = SYSUTCDATETIME()
WHEN NOT MATCHED THEN INSERT (report_key, parent_id, title, icon, image, query_text,
    config, is_section, sort_order)
    VALUES (src.report_key, src.parent_id, src.title, src.icon, src.image,
    src.query_text, src.config, src.is_section, src.sort_order);
GO

-- 3. Сводка
SELECT COUNT(*) AS всего_узлов,
       SUM(CASE WHEN is_section = 1 THEN 1 ELSE 0 END) AS разделов,
       SUM(CASE WHEN is_section = 0 THEN 1 ELSE 0 END) AS отчётов,
       SUM(CASE WHEN is_section = 0 AND LEN(query_text) = 0 THEN 1 ELSE 0 END) AS без_sql
FROM dbo.reports WHERE is_deleted = 0;
GO
