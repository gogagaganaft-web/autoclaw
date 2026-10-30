-- ============================================================================
--  Первичное наполнение БД report: определения отчётов и панель фильтров.
--  Сгенерировано из dev-БД tools/export_reports_seed.py.
--  Идемпотентно: существующие записи обновляются, id сохраняются.
-- ============================================================================
USE report;
SET NOCOUNT ON;
GO

SET IDENTITY_INSERT dbo.reports ON;
GO

IF EXISTS (SELECT 1 FROM dbo.reports WHERE report_key = N'SEC_ОРН')
    UPDATE dbo.reports SET title = N'ОРН', icon = N'folder', image = N'',
        query_text = N'', config = N'{}', parent_id = NULL, is_section = 1,
        sort_order = 100, is_deleted = 0, updated_at = SYSUTCDATETIME()
    WHERE report_key = N'SEC_ОРН'
ELSE
    INSERT INTO dbo.reports (id, report_key, title, icon, image, query_text, config,
        parent_id, is_section, sort_order)
    VALUES (24, N'SEC_ОРН', N'ОРН', N'folder', N'', N'', N'{}', NULL, 1, 100);
GO
IF EXISTS (SELECT 1 FROM dbo.reports WHERE report_key = N'ОРН_5')
    UPDATE dbo.reports SET title = N'ОСВ', icon = N'chart', image = N'',
        query_text = N'
        SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;
        DECLARE @dstart DATE = {РасчетыйМесяц};
        DECLARE @dbefore DATE=DateAdd(month,-1,@dstart);
                                                                                                                
        WITH FOND AS (
        SELECT DISTINCT ls.ROW_ID Счет,ls.Номер ЛС
        FROM [stack].[Лицевые счета] ls
        JOIN (SELECT DISTINCT Потомок FROM [stack].[Лицевые иерархия] WHERE ПотомокТип = 5 AND Родитель IN ({БД})) li ON li.Потомок = ls.ROW_ID
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
                MAX(CASE WHEN vp.Название = ''СОСТОЯНИЕ'' THEN sv.Значение END) AS [СОСТОЯНИЕ]
            FROM FOND f
            LEFT JOIN stack.[Лицевые иерархия] lh ON lh.Потомок = f.Счет
            LEFT JOIN stack.[Виды параметров] vp ON vp.Название IN (''СОСТОЯНИЕ'')
            LEFT JOIN stack.[Свойства] sv ON sv.[Виды-Параметры] = vp.row_id AND sv.[Счет-параметры] = lh.Родитель AND @dstart BETWEEN sv.ДатНач AND sv.ДатКнц AND sv.Значение IS NOT NULL
            GROUP BY f.Счет
        ),FinalData AS (
            SELECT 
                FORMAT(bl.Месяц, ''yyyy-MMMM'', ''ru'') AS [Месяц],
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
        FROM FinalData fd
        OPTION (MAXDOP 0, RECOMPILE);
        ', config = N'{"fields": {"map": {}, "grid": [{"dataField": "Месяц"}, {"dataField": "ЛС"}, {"dataField": "СОСТОЯНИЕ"}, {"dataField": "ФИО"}, {"dataField": "УК"}, {"dataField": "Поставщик"}, {"dataField": "КодУслуги"}, {"dataField": "ВидУслуги"}, {"caption": "Обороты", "columns": [{"dataField": "СальдоВх"}, {"dataField": "Начислено"}, {"dataField": "Перерасчет"}, {"dataField": "Качество"}, {"dataField": "Корр"}, {"dataField": "Оплата"}, {"dataField": "СальдоИсх"}, {"dataField": "СальдоИсхДолг"}, {"dataField": "СальдоИсхПереплата"}]}, {"caption": "Обороты Пени", "columns": [{"dataField": "ПениВх"}, {"dataField": "ПениНач"}, {"dataField": "ПениОпл"}, {"dataField": "ПениИсх"}]}], "chart": {"title": "График", "pvtfld": [{"area": "row", "expanded": false, "dataField": "Поставщик"}, {"area": "column", "caption": "Услуга", "expanded": true}, {"area": "filter", "caption": "Код услуги", "expanded": true, "dataField": "КодУслуги"}, {"area": "filter", "caption": "Название услуги", "expanded": true, "dataField": "ВидУслуги"}, {"area": "filter", "format": {"type": "fixedPoint", "precision": 2}, "caption": "ВхСальдо", "dataType": "number", "dataField": "СальдоВх", "summaryType": "sum"}, {"area": "filter", "format": {"type": "fixedPoint", "precision": 2}, "caption": "Начислено", "dataType": "number", "dataField": "Начислено", "summaryType": "sum"}, {"area": "filter", "format": {"type": "fixedPoint", "precision": 2}, "caption": "Перерасчет", "dataType": "number", "dataField": "Перерасчет", "summaryType": "sum"}, {"area": "filter", "format": {"type": "fixedPoint", "precision": 2}, "caption": "Качество", "dataType": "number", "dataField": "Качество", "summaryType": "sum"}, {"area": "filter", "format": {"type": "fixedPoint", "precision": 2}, "caption": "Коррекция", "dataType": "number", "dataField": "Корр", "summaryType": "sum"}, {"area": "filter", "format": {"type": "fixedPoint", "precision": 2}, "caption": "Оплата", "dataType": "number", "dataField": "Оплата", "summaryType": "sum"}, {"area": "data", "format": {"type": "fixedPoint", "precision": 2}, "caption": "СальдоИсх", "dataType": "number", "dataField": "СальдоИсх", "summaryType": "sum"}, {"area": "filter", "format": {"type": "fixedPoint", "precision": 2}, "caption": "СальдоИсхДолг", "dataType": "number", "dataField": "СальдоИсхДолг", "summaryType": "sum"}, {"area": "filter", "format": {"type": "fixedPoint", "precision": 2}, "caption": "СальдоИсхПереплата", "dataType": "number", "dataField": "СальдоИсхПереплата", "summaryType": "sum"}], "series": [{"name": "СальдоИсх", "type": "bar", "field": "СальдоИсх"}], "argument": "период"}, "pivot": [{"area": "column", "dataField": "Месяц"}, {"area": "filter", "width": 10, "caption": "ЛС", "expanded": true, "dataField": "ЛС"}, {"area": "filter", "caption": "Состояние ЛС", "expanded": true, "dataField": "СОСТОЯНИЕ"}, {"area": "filter", "caption": "ФИО", "expanded": true, "dataField": "ФИО"}, {"area": "row", "expanded": true, "dataField": "УК"}, {"area": "row", "expanded": false, "dataField": "Поставщик"}, {"area": "row", "caption": "Услуга", "expanded": true}, {"area": "filter", "caption": "Код услуги", "expanded": true, "dataField": "КодУслуги"}, {"area": "filter", "caption": "Название услуги", "expanded": true, "dataField": "ВидУслуги"}, {"area": "data", "format": {"type": "fixedPoint", "precision": 2}, "caption": "ВхСальдо", "dataType": "number", "dataField": "СальдоВх", "summaryType": "sum"}, {"area": "data", "format": {"type": "fixedPoint", "precision": 2}, "caption": "Начислено", "dataType": "number", "dataField": "Начислено", "summaryType": "sum"}, {"area": "data", "format": {"type": "fixedPoint", "precision": 2}, "caption": "Перерасчет", "dataType": "number", "dataField": "Перерасчет", "summaryType": "sum"}, {"area": "data", "format": {"type": "fixedPoint", "precision": 2}, "caption": "Качество", "dataType": "number", "dataField": "Качество", "summaryType": "sum"}, {"area": "data", "format": {"type": "fixedPoint", "precision": 2}, "caption": "Коррекция", "dataType": "number", "dataField": "Корр", "summaryType": "sum"}, {"area": "data", "format": {"type": "fixedPoint", "precision": 2}, "caption": "Оплата", "dataType": "number", "dataField": "Оплата", "summaryType": "sum"}, {"area": "data", "format": {"type": "fixedPoint", "precision": 2}, "caption": "СальдоИсх", "dataType": "number", "dataField": "СальдоИсх", "summaryType": "sum"}, {"area": "data", "format": {"type": "fixedPoint", "precision": 2}, "caption": "СальдоИсхДолг", "dataType": "number", "dataField": "СальдоИсхДолг", "summaryType": "sum"}, {"area": "data", "format": {"type": "fixedPoint", "precision": 2}, "caption": "СальдоИсхПереплата", "dataType": "number", "dataField": "СальдоИсхПереплата", "summaryType": "sum"}, {"area": "data", "format": {"type": "fixedPoint", "precision": 2}, "caption": "ПениВх", "dataType": "number", "dataField": "ПениВх", "summaryType": "sum"}, {"area": "data", "format": {"type": "fixedPoint", "precision": 2}, "caption": "ПениНач", "dataType": "number", "dataField": "ПениНач", "summaryType": "sum"}, {"area": "data", "format": {"type": "fixedPoint", "precision": 2}, "caption": "ПениОпл", "dataType": "number", "dataField": "ПениОпл", "summaryType": "sum"}, {"area": "data", "format": {"type": "fixedPoint", "precision": 2}, "caption": "ПениИсх", "dataType": "number", "dataField": "ПениИсх", "summaryType": "sum"}]}, "filters": {"БД": [], "УК": [], "РасчетыйМесяц": []}, "groupKey": "ОРН"}', parent_id = 24, is_section = 0,
        sort_order = 0, is_deleted = 0, updated_at = SYSUTCDATETIME()
    WHERE report_key = N'ОРН_5'
ELSE
    INSERT INTO dbo.reports (id, report_key, title, icon, image, query_text, config,
        parent_id, is_section, sort_order)
    VALUES (5, N'ОРН_5', N'ОСВ', N'chart', N'', N'
        SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;
        DECLARE @dstart DATE = {РасчетыйМесяц};
        DECLARE @dbefore DATE=DateAdd(month,-1,@dstart);
                                                                                                                
        WITH FOND AS (
        SELECT DISTINCT ls.ROW_ID Счет,ls.Номер ЛС
        FROM [stack].[Лицевые счета] ls
        JOIN (SELECT DISTINCT Потомок FROM [stack].[Лицевые иерархия] WHERE ПотомокТип = 5 AND Родитель IN ({БД})) li ON li.Потомок = ls.ROW_ID
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
                MAX(CASE WHEN vp.Название = ''СОСТОЯНИЕ'' THEN sv.Значение END) AS [СОСТОЯНИЕ]
            FROM FOND f
            LEFT JOIN stack.[Лицевые иерархия] lh ON lh.Потомок = f.Счет
            LEFT JOIN stack.[Виды параметров] vp ON vp.Название IN (''СОСТОЯНИЕ'')
            LEFT JOIN stack.[Свойства] sv ON sv.[Виды-Параметры] = vp.row_id AND sv.[Счет-параметры] = lh.Родитель AND @dstart BETWEEN sv.ДатНач AND sv.ДатКнц AND sv.Значение IS NOT NULL
            GROUP BY f.Счет
        ),FinalData AS (
            SELECT 
                FORMAT(bl.Месяц, ''yyyy-MMMM'', ''ru'') AS [Месяц],
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
        FROM FinalData fd
        OPTION (MAXDOP 0, RECOMPILE);
        ', N'{"fields": {"map": {}, "grid": [{"dataField": "Месяц"}, {"dataField": "ЛС"}, {"dataField": "СОСТОЯНИЕ"}, {"dataField": "ФИО"}, {"dataField": "УК"}, {"dataField": "Поставщик"}, {"dataField": "КодУслуги"}, {"dataField": "ВидУслуги"}, {"caption": "Обороты", "columns": [{"dataField": "СальдоВх"}, {"dataField": "Начислено"}, {"dataField": "Перерасчет"}, {"dataField": "Качество"}, {"dataField": "Корр"}, {"dataField": "Оплата"}, {"dataField": "СальдоИсх"}, {"dataField": "СальдоИсхДолг"}, {"dataField": "СальдоИсхПереплата"}]}, {"caption": "Обороты Пени", "columns": [{"dataField": "ПениВх"}, {"dataField": "ПениНач"}, {"dataField": "ПениОпл"}, {"dataField": "ПениИсх"}]}], "chart": {"title": "График", "pvtfld": [{"area": "row", "expanded": false, "dataField": "Поставщик"}, {"area": "column", "caption": "Услуга", "expanded": true}, {"area": "filter", "caption": "Код услуги", "expanded": true, "dataField": "КодУслуги"}, {"area": "filter", "caption": "Название услуги", "expanded": true, "dataField": "ВидУслуги"}, {"area": "filter", "format": {"type": "fixedPoint", "precision": 2}, "caption": "ВхСальдо", "dataType": "number", "dataField": "СальдоВх", "summaryType": "sum"}, {"area": "filter", "format": {"type": "fixedPoint", "precision": 2}, "caption": "Начислено", "dataType": "number", "dataField": "Начислено", "summaryType": "sum"}, {"area": "filter", "format": {"type": "fixedPoint", "precision": 2}, "caption": "Перерасчет", "dataType": "number", "dataField": "Перерасчет", "summaryType": "sum"}, {"area": "filter", "format": {"type": "fixedPoint", "precision": 2}, "caption": "Качество", "dataType": "number", "dataField": "Качество", "summaryType": "sum"}, {"area": "filter", "format": {"type": "fixedPoint", "precision": 2}, "caption": "Коррекция", "dataType": "number", "dataField": "Корр", "summaryType": "sum"}, {"area": "filter", "format": {"type": "fixedPoint", "precision": 2}, "caption": "Оплата", "dataType": "number", "dataField": "Оплата", "summaryType": "sum"}, {"area": "data", "format": {"type": "fixedPoint", "precision": 2}, "caption": "СальдоИсх", "dataType": "number", "dataField": "СальдоИсх", "summaryType": "sum"}, {"area": "filter", "format": {"type": "fixedPoint", "precision": 2}, "caption": "СальдоИсхДолг", "dataType": "number", "dataField": "СальдоИсхДолг", "summaryType": "sum"}, {"area": "filter", "format": {"type": "fixedPoint", "precision": 2}, "caption": "СальдоИсхПереплата", "dataType": "number", "dataField": "СальдоИсхПереплата", "summaryType": "sum"}], "series": [{"name": "СальдоИсх", "type": "bar", "field": "СальдоИсх"}], "argument": "период"}, "pivot": [{"area": "column", "dataField": "Месяц"}, {"area": "filter", "width": 10, "caption": "ЛС", "expanded": true, "dataField": "ЛС"}, {"area": "filter", "caption": "Состояние ЛС", "expanded": true, "dataField": "СОСТОЯНИЕ"}, {"area": "filter", "caption": "ФИО", "expanded": true, "dataField": "ФИО"}, {"area": "row", "expanded": true, "dataField": "УК"}, {"area": "row", "expanded": false, "dataField": "Поставщик"}, {"area": "row", "caption": "Услуга", "expanded": true}, {"area": "filter", "caption": "Код услуги", "expanded": true, "dataField": "КодУслуги"}, {"area": "filter", "caption": "Название услуги", "expanded": true, "dataField": "ВидУслуги"}, {"area": "data", "format": {"type": "fixedPoint", "precision": 2}, "caption": "ВхСальдо", "dataType": "number", "dataField": "СальдоВх", "summaryType": "sum"}, {"area": "data", "format": {"type": "fixedPoint", "precision": 2}, "caption": "Начислено", "dataType": "number", "dataField": "Начислено", "summaryType": "sum"}, {"area": "data", "format": {"type": "fixedPoint", "precision": 2}, "caption": "Перерасчет", "dataType": "number", "dataField": "Перерасчет", "summaryType": "sum"}, {"area": "data", "format": {"type": "fixedPoint", "precision": 2}, "caption": "Качество", "dataType": "number", "dataField": "Качество", "summaryType": "sum"}, {"area": "data", "format": {"type": "fixedPoint", "precision": 2}, "caption": "Коррекция", "dataType": "number", "dataField": "Корр", "summaryType": "sum"}, {"area": "data", "format": {"type": "fixedPoint", "precision": 2}, "caption": "Оплата", "dataType": "number", "dataField": "Оплата", "summaryType": "sum"}, {"area": "data", "format": {"type": "fixedPoint", "precision": 2}, "caption": "СальдоИсх", "dataType": "number", "dataField": "СальдоИсх", "summaryType": "sum"}, {"area": "data", "format": {"type": "fixedPoint", "precision": 2}, "caption": "СальдоИсхДолг", "dataType": "number", "dataField": "СальдоИсхДолг", "summaryType": "sum"}, {"area": "data", "format": {"type": "fixedPoint", "precision": 2}, "caption": "СальдоИсхПереплата", "dataType": "number", "dataField": "СальдоИсхПереплата", "summaryType": "sum"}, {"area": "data", "format": {"type": "fixedPoint", "precision": 2}, "caption": "ПениВх", "dataType": "number", "dataField": "ПениВх", "summaryType": "sum"}, {"area": "data", "format": {"type": "fixedPoint", "precision": 2}, "caption": "ПениНач", "dataType": "number", "dataField": "ПениНач", "summaryType": "sum"}, {"area": "data", "format": {"type": "fixedPoint", "precision": 2}, "caption": "ПениОпл", "dataType": "number", "dataField": "ПениОпл", "summaryType": "sum"}, {"area": "data", "format": {"type": "fixedPoint", "precision": 2}, "caption": "ПениИсх", "dataType": "number", "dataField": "ПениИсх", "summaryType": "sum"}]}, "filters": {"БД": [], "УК": [], "РасчетыйМесяц": []}, "groupKey": "ОРН"}', 24, 0, 0);
GO
IF EXISTS (SELECT 1 FROM dbo.reports WHERE report_key = N'ОРН_9')
    UPDATE dbo.reports SET title = N'Платежи', icon = N'chart', image = N'',
        query_text = N'DECLARE @month DATE={РасчетыйМесяц};
SELECT final.ЛС
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
, FORMAT(final.РасчМесяц, ''MMMM yyyy'') [Расчетный месяц]
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
JOIN [stack].[Лицевые иерархия] li ON li.Потомок=ls.ROW_ID AND li.ПотомокТип=5 AND li.Родитель IN ({БД})
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
JOIN [stack].[Лицевые иерархия] li ON li.Потомок=ls.ROW_ID AND li.ПотомокТип=5 AND li.Родитель IN ({БД})
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
JOIN [stack].[Лицевые иерархия] li ON li.Потомок=ls.ROW_ID AND li.ПотомокТип=5 AND li.Родитель IN ({БД})
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
JOIN [stack].[Лицевые иерархия] li ON li.Потомок=ls.ROW_ID AND li.ПотомокТип=5 AND li.Родитель IN ({БД})
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
													JOIN [stack].[Лицевые иерархия] li ON li.Потомок=ls.ROW_ID AND li.ПотомокТип=5 AND li.Родитель IN ({БД})
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
WHERE  final.[УК-Оплата] IN ({УКП})
        OPTION (MAXDOP 0, RECOMPILE);
        ', config = N'{"fields": {"map": {}, "grid": [{"dataField": "Месяц"}, {"caption": "Адрес", "columns": [{"dataField": "Район"}, {"dataField": "Участок"}, {"dataField": "НП"}, {"dataField": "Улица"}, {"dataField": "Дом"}, {"dataField": "Квартира"}, {"dataField": "Комната"}, {"dataField": "УК вид оплаты"}, {"dataField": "Поставщик"}, {"dataField": "ЛС"}, {"dataField": "Абонент"}, {"dataField": "УК"}, {"dataField": "Услуга"}, {"dataField": "Тип"}, {"dataField": "Источник платежа"}, {"dataField": "Дата платежа"}, {"dataField": "Дата выписки"}, {"dataField": "Номер документа"}, {"dataField": "Примечание"}, {"format": {"type": "fixedPoint", "precision": 2}, "dataType": "number", "dataField": "Сумма"}]}], "chart": {"title": "График", "pvtfld": [{"area": "column", "expanded": true, "dataField": "Расчетный месяц"}, {"area": "filter", "dataField": "Район"}, {"area": "row", "expanded": true, "dataField": "Участок"}, {"area": "filter", "dataField": "НП"}, {"area": "filter", "dataField": "Улица"}, {"area": "filter", "dataField": "Дом"}, {"area": "filter", "dataField": "Квартира"}, {"area": "filter", "dataField": "Комната"}, {"area": "filter", "dataField": "УК вид оплаты"}, {"area": "filter", "expanded": true, "dataField": "ЛС"}, {"area": "filter", "expanded": true, "dataField": "Абонент"}, {"area": "row", "expanded": true, "dataField": "УК"}, {"area": "row", "expanded": true, "dataField": "Источник платежа"}, {"area": "row", "expanded": true, "dataField": "Поставщик"}, {"area": "row", "expanded": true, "dataField": "Услуга"}, {"area": "column", "expanded": true, "dataField": "Тип"}, {"area": "filter", "dataField": "Дата платежа"}, {"area": "filter", "dataField": "Дата выписки"}, {"area": "filter", "dataField": "Номер документа"}, {"area": "filter", "dataField": "Примечание"}, {"area": "data", "format": {"type": "fixedPoint", "precision": 2}, "caption": "Сумма", "dataType": "number", "dataField": "Сумма", "summaryType": "sum"}], "series": [{"name": "Сумма", "type": "bar", "field": "сумма"}], "argument": "период"}, "pivot": [{"area": "column", "expanded": true, "dataField": "Расчетный месяц"}, {"area": "filter", "dataField": "Район"}, {"area": "row", "expanded": true, "dataField": "Участок"}, {"area": "filter", "dataField": "НП"}, {"area": "filter", "dataField": "Улица"}, {"area": "filter", "dataField": "Дом"}, {"area": "filter", "dataField": "Квартира"}, {"area": "filter", "dataField": "Комната"}, {"area": "filter", "dataField": "УК вид оплаты"}, {"area": "filter", "expanded": true, "dataField": "ЛС"}, {"area": "filter", "expanded": true, "dataField": "Абонент"}, {"area": "row", "expanded": true, "dataField": "УК"}, {"area": "row", "expanded": true, "dataField": "Источник платежа"}, {"area": "row", "expanded": true, "dataField": "Поставщик"}, {"area": "row", "expanded": true, "dataField": "Услуга"}, {"area": "column", "expanded": true, "dataField": "Тип"}, {"area": "filter", "dataField": "Дата платежа"}, {"area": "filter", "dataField": "Дата выписки"}, {"area": "filter", "dataField": "Номер документа"}, {"area": "filter", "dataField": "Примечание"}, {"area": "data", "format": {"type": "fixedPoint", "precision": 2}, "caption": "Сумма", "dataType": "number", "dataField": "Сумма", "summaryType": "sum"}]}, "filters": {"БД": [], "УКП": [], "ПериодДни": [], "РасчетыйМесяц": []}, "groupKey": "ОРН"}', parent_id = 24, is_section = 0,
        sort_order = 0, is_deleted = 0, updated_at = SYSUTCDATETIME()
    WHERE report_key = N'ОРН_9'
ELSE
    INSERT INTO dbo.reports (id, report_key, title, icon, image, query_text, config,
        parent_id, is_section, sort_order)
    VALUES (9, N'ОРН_9', N'Платежи', N'chart', N'', N'DECLARE @month DATE={РасчетыйМесяц};
SELECT final.ЛС
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
, FORMAT(final.РасчМесяц, ''MMMM yyyy'') [Расчетный месяц]
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
JOIN [stack].[Лицевые иерархия] li ON li.Потомок=ls.ROW_ID AND li.ПотомокТип=5 AND li.Родитель IN ({БД})
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
JOIN [stack].[Лицевые иерархия] li ON li.Потомок=ls.ROW_ID AND li.ПотомокТип=5 AND li.Родитель IN ({БД})
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
JOIN [stack].[Лицевые иерархия] li ON li.Потомок=ls.ROW_ID AND li.ПотомокТип=5 AND li.Родитель IN ({БД})
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
JOIN [stack].[Лицевые иерархия] li ON li.Потомок=ls.ROW_ID AND li.ПотомокТип=5 AND li.Родитель IN ({БД})
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
													JOIN [stack].[Лицевые иерархия] li ON li.Потомок=ls.ROW_ID AND li.ПотомокТип=5 AND li.Родитель IN ({БД})
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
WHERE  final.[УК-Оплата] IN ({УКП})
        OPTION (MAXDOP 0, RECOMPILE);
        ', N'{"fields": {"map": {}, "grid": [{"dataField": "Месяц"}, {"caption": "Адрес", "columns": [{"dataField": "Район"}, {"dataField": "Участок"}, {"dataField": "НП"}, {"dataField": "Улица"}, {"dataField": "Дом"}, {"dataField": "Квартира"}, {"dataField": "Комната"}, {"dataField": "УК вид оплаты"}, {"dataField": "Поставщик"}, {"dataField": "ЛС"}, {"dataField": "Абонент"}, {"dataField": "УК"}, {"dataField": "Услуга"}, {"dataField": "Тип"}, {"dataField": "Источник платежа"}, {"dataField": "Дата платежа"}, {"dataField": "Дата выписки"}, {"dataField": "Номер документа"}, {"dataField": "Примечание"}, {"format": {"type": "fixedPoint", "precision": 2}, "dataType": "number", "dataField": "Сумма"}]}], "chart": {"title": "График", "pvtfld": [{"area": "column", "expanded": true, "dataField": "Расчетный месяц"}, {"area": "filter", "dataField": "Район"}, {"area": "row", "expanded": true, "dataField": "Участок"}, {"area": "filter", "dataField": "НП"}, {"area": "filter", "dataField": "Улица"}, {"area": "filter", "dataField": "Дом"}, {"area": "filter", "dataField": "Квартира"}, {"area": "filter", "dataField": "Комната"}, {"area": "filter", "dataField": "УК вид оплаты"}, {"area": "filter", "expanded": true, "dataField": "ЛС"}, {"area": "filter", "expanded": true, "dataField": "Абонент"}, {"area": "row", "expanded": true, "dataField": "УК"}, {"area": "row", "expanded": true, "dataField": "Источник платежа"}, {"area": "row", "expanded": true, "dataField": "Поставщик"}, {"area": "row", "expanded": true, "dataField": "Услуга"}, {"area": "column", "expanded": true, "dataField": "Тип"}, {"area": "filter", "dataField": "Дата платежа"}, {"area": "filter", "dataField": "Дата выписки"}, {"area": "filter", "dataField": "Номер документа"}, {"area": "filter", "dataField": "Примечание"}, {"area": "data", "format": {"type": "fixedPoint", "precision": 2}, "caption": "Сумма", "dataType": "number", "dataField": "Сумма", "summaryType": "sum"}], "series": [{"name": "Сумма", "type": "bar", "field": "сумма"}], "argument": "период"}, "pivot": [{"area": "column", "expanded": true, "dataField": "Расчетный месяц"}, {"area": "filter", "dataField": "Район"}, {"area": "row", "expanded": true, "dataField": "Участок"}, {"area": "filter", "dataField": "НП"}, {"area": "filter", "dataField": "Улица"}, {"area": "filter", "dataField": "Дом"}, {"area": "filter", "dataField": "Квартира"}, {"area": "filter", "dataField": "Комната"}, {"area": "filter", "dataField": "УК вид оплаты"}, {"area": "filter", "expanded": true, "dataField": "ЛС"}, {"area": "filter", "expanded": true, "dataField": "Абонент"}, {"area": "row", "expanded": true, "dataField": "УК"}, {"area": "row", "expanded": true, "dataField": "Источник платежа"}, {"area": "row", "expanded": true, "dataField": "Поставщик"}, {"area": "row", "expanded": true, "dataField": "Услуга"}, {"area": "column", "expanded": true, "dataField": "Тип"}, {"area": "filter", "dataField": "Дата платежа"}, {"area": "filter", "dataField": "Дата выписки"}, {"area": "filter", "dataField": "Номер документа"}, {"area": "filter", "dataField": "Примечание"}, {"area": "data", "format": {"type": "fixedPoint", "precision": 2}, "caption": "Сумма", "dataType": "number", "dataField": "Сумма", "summaryType": "sum"}]}, "filters": {"БД": [], "УКП": [], "ПериодДни": [], "РасчетыйМесяц": []}, "groupKey": "ОРН"}', 24, 0, 0);
GO
SET IDENTITY_INSERT dbo.reports OFF;
GO

MERGE dbo.ui_config AS target
USING (SELECT N'toolbar' AS setting_key, CAST(N'{"source": "env.js", "toolbar": [{"type": "hierarchical-list", "field": "БД", "label": "Фонд ", "dbName": "DB2UL", "height": 400, "location": "before", "formOrder": 1, "labelMode": "static", "formColSpan": 2, "placeholder": "Выберите фонд", "locateInMenu": "always", "showClearButton": true}, {"type": "multi-select", "field": "БД_ЮЛ", "items": [{"id": "DB1UL", "name": "Курск"}, {"id": "DB4UL", "name": "Тверь"}, {"id": "DB3UL", "name": "Смоленск"}, {"id": "DB2UL", "name": "Мурманск"}, {"id": "DB5UL", "name": "Хакасия"}], "label": "Выбраны БД ЮЛ"}, {"type": "multi-select-fl", "field": "БД_ФЛ", "items": [{"id": "DB1FL", "name": "Курск"}, {"id": "DB4FL", "name": "Тверь"}, {"id": "DB3FL", "name": "Смоленск"}, {"id": "DB2FL", "name": "Мурманск"}, {"id": "DB5FL", "name": "Хакасия"}], "label": "Выбраны БД ФЛ"}, {"type": "multi-select-list", "field": "usl", "items": ["Теплоноситель", "Отопление"], "label": "Услуги", "width": 800, "location": "before", "formOrder": 2, "searchExpr": ["name"], "searchMode": "contains", "formColSpan": 2, "locateInMenu": "always", "pageLoadMode": "scrollBottom", "searchEnabled": true, "searchTimeout": 500, "selectAllMode": "allPages", "showScrollbar": "onHover", "showClearButton": true, "searchPlaceholder": "Поиск...", "showSelectionControls": true}, {"type": "select", "field": "РасчетыйМесяц", "items": [{"id": 20241201, "name": "2024 Декабрь"}, {"id": 20241101, "name": "2024 Ноябрь"}, {"id": 20241001, "name": "2024 Октябрь"}, {"id": 20240901, "name": "2024 Сентябрь"}, {"id": 20240801, "name": "2024 Август"}, {"id": 20240701, "name": "2024 Июль"}, {"id": 20240601, "name": "2024 Июнь"}, {"id": 20240501, "name": "2024 Май"}, {"id": 20240401, "name": "2024 Апрель"}, {"id": 20240301, "name": "2024 Март"}, {"id": 20240201, "name": "2024 Февраль"}, {"id": 20240101, "name": "2024 Январь"}], "label": "Расчетный месяц", "width": 350, "location": "before", "formOrder": 3, "showInForm": true, "formColSpan": 1, "formColIndex": 0, "locateInMenu": "always"}, {"type": "dateRangeMonths", "field": "ПериодМесяцы", "label": "Укажите период", "width": 350, "location": "before", "formOrder": 4, "pickerType": "calendar", "formColSpan": 1, "formColIndex": 0, "locateInMenu": "always", "displayFormat": "MMM yyyy", "calendarOptions": {"max": "2026-10-18T08:26:50.810Z", "min": "2023-12-31T21:00:00.000Z", "zoomLevel": "year", "calendarView": "month", "maxZoomLevel": "year", "minZoomLevel": "year", "selectionMode": "range"}}, {"type": "dateRange", "field": "ПериодДни", "label": "Диапазон дат", "width": 350, "maxDate": "2026-10-18", "minDate": "2024-01-01", "location": "before", "formOrder": 3, "formColSpan": 1, "placeholder": "Выберите период", "formColIndex": 1, "locateInMenu": "always", "displayFormat": "dd.MM.yyyy", "applyValueMode": "instantly", "firstDayOfWeek": 1, "calendarZoomLevel": "month"}, {"type": "multi-select-list", "field": "calc", "items": [{"id": 20240101, "name": "2024 Январь"}, {"id": 20240201, "name": "2024 Февраль"}, {"id": 20240301, "name": "2024 Март"}, {"id": 20240401, "name": "2024 Апрель"}, {"id": 20240501, "name": "2024 Май"}, {"id": 20240601, "name": "2024 Июнь"}, {"id": 20240701, "name": "2024 Июль"}, {"id": 20240801, "name": "2024 Август"}, {"id": 20240901, "name": "2024 Сентябрь"}, {"id": 20241001, "name": "2024 Октябрь"}, {"id": 20241101, "name": "2024 Ноябрь"}, {"id": 20241201, "name": "2024 Декабрь"}], "label": "Расчетный месяц", "width": 600, "location": "before", "formOrder": 5, "searchExpr": ["name"], "searchMode": "contains", "formColSpan": 1, "formColIndex": 0, "locateInMenu": "always", "pageLoadMode": "scrollBottom", "searchEnabled": true, "searchTimeout": 500, "selectAllMode": "allPages", "showScrollbar": "onHover", "showClearButton": true, "searchPlaceholder": "Поиск...", "showSelectionControls": true}, {"type": "multi-select-list", "field": "УКП", "items": [{"id": -1, "name": "Не указана"}, {"id": 1, "name": "\"Росатом Энергосбыт\" Мурманск"}, {"id": 1346, "name": "АО \"Ситиматик\""}, {"id": 1389, "name": "МУП \"Энергия\""}, {"id": 1427, "name": "ООО \"КОД\""}, {"id": 1454, "name": "ГОУП \"Сети Никеля\""}, {"id": 1462, "name": "МУП \"Сети Никеля\" долг"}, {"id": 1488, "name": "ТСН \"Энергетик\""}, {"id": 1686, "name": "ТСН (жилья) \"Процветание\""}, {"id": 1714, "name": "ТСЖ \"Гончарова\""}, {"id": 1715, "name": "ТСЖ \"Гончарова\"_капремонт_15д"}, {"id": 1735, "name": "МУП Кольского округа \"УЖКХ\""}, {"id": 1864, "name": "ГОУП \"Водоканал-Ревда\""}, {"id": 1866, "name": "МУП \"Ена\""}, {"id": 1932, "name": "МУП Кольского района \"УЖКХ\" цессия 2014 г."}, {"id": 1933, "name": "МУП Кольского района \"УЖКХ\" цессия 2015 г."}, {"id": 1948, "name": "ТСЖ \"Гончарова\"_капремонт_11д"}, {"id": 1998, "name": "ТСН (жилья) \"Процветание\"_кап.ремонт"}, {"id": 1999, "name": "Филиал \"АТЭС-Полярные Зори\" г Полярные Зори"}, {"id": 2015, "name": "Филиал \"АТЭС-Полярные Зори\" нп Зашеек"}, {"id": 2072, "name": "ТСЖ \"Гончарова\"_капремонт_7д"}, {"id": 2097, "name": "ООО \"КОД\" тепло"}, {"id": 2218, "name": "НКО \"ФКР МО\""}, {"id": 2444, "name": "НКО \"ФКР МО\"_Задолженность за предыдущие периоды"}, {"id": 2455, "name": "ООО \"Управляющая компания Полярные Зори\""}, {"id": 2463, "name": "ООО \"УК Инициатива\""}, {"id": 2464, "name": "\"ТСЖ\" 59"}, {"id": 2475, "name": "ООО \"УК Инициатива\"_капремонт"}, {"id": 2500, "name": "ГОУП \"Мурманскводоканал\""}, {"id": 2611, "name": "ТСЖ \"Строительная 50\""}, {"id": 2613, "name": "ТСЖ \"Строительная 50\"_капремонт"}, {"id": 2753, "name": "ИП Белоцкая М.В."}, {"id": 2792, "name": "МУП \"Ресурс\""}, {"id": 2793, "name": "МУП ЖКХ \"Вымпел\""}, {"id": 2794, "name": "МУП \"ВКХ\""}, {"id": 2816, "name": "ООО \"УК \"КовдорЛидер\""}, {"id": 2818, "name": "АО \"МЭС\""}, {"id": 3125, "name": "ТСН \"Кандалакшское шоссе 45\""}, {"id": 3162, "name": "ООО \"УК Сияние Севера\""}, {"id": 3165, "name": "ООО \"Сервис 24/7\""}], "label": "УК Платежи", "width": 800, "location": "before", "formOrder": 7, "searchExpr": ["name"], "searchMode": "contains", "formColSpan": 2, "locateInMenu": "always", "pageLoadMode": "scrollBottom", "searchEnabled": true, "searchTimeout": 500, "selectAllMode": "allPages", "showScrollbar": "onHover", "showClearButton": true, "searchPlaceholder": "Поиск...", "showSelectionControls": true}, {"type": "multi-select-list", "field": "УК", "items": [{"id": -1, "name": "Не указана"}, {"id": 674, "name": "АО \"Ситиматик\""}, {"id": 676, "name": "МУП \"Энергия\""}, {"id": 677, "name": "филиал \"Росатом Энергосбыт\" Мурманск"}, {"id": 686, "name": "ООО \"Комплексное Обслуживание Домов\""}, {"id": 699, "name": "Государственное областное унитарное предприятие \"Сети Никеля\""}, {"id": 712, "name": "ТСН \"Энергетик\""}, {"id": 793, "name": "ТСН (жилья) \"Процветание\""}, {"id": 803, "name": "ТСЖ \"Гончарова\""}, {"id": 804, "name": "ТСЖ \"Гончарова\"_капремонт_15д"}, {"id": 814, "name": "Муниципальное унитарное предприятие Кольского округа \"Управление жилищно-коммунальным хозяйством\""}, {"id": 822, "name": "Государственное областное унитарное предприятие \"Водоканал-Ревда\""}, {"id": 823, "name": "Муниципальное унитарное предприятие \"Ена\""}, {"id": 836, "name": "Муниципальное унитарное предприятие Кольского района \"Управление жилищно-коммунальным хозяйством\" цессия 2014 г."}, {"id": 837, "name": "Муниципальное унитарное предприятие Кольского района \"Управление жилищно-коммунальным хозяйством\" цессия 2015 г."}, {"id": 845, "name": "ТСЖ \"Гончарова\"_капремонт_11д"}, {"id": 858, "name": "Филиал ООО \"АтомТеплоЭлектроСеть\" в г. Полярные Зори"}, {"id": 878, "name": "АО \"Ситиматик\""}, {"id": 879, "name": "ТСЖ \"Гончарова\"_капремонт_7д"}, {"id": 891, "name": "ООО \"Комплексное Обслуживание Домов\" тепло"}, {"id": 924, "name": "Некоммерческая организация \"Фонд капитального ремонта общего имущества в многоквартирных домах в Мурманской области\""}, {"id": 972, "name": "ООО \"Управляющая компания Полярные Зори\""}, {"id": 973, "name": "ООО \"УК Инициатива\""}, {"id": 974, "name": "\"ТСЖ\" 59"}, {"id": 975, "name": "ООО \"УК Инициатива\"_капремонт"}, {"id": 978, "name": "ГОУП \"Мурманскводоканал\""}, {"id": 982, "name": "Товарищество собственников жилья \"Строительная 50\""}, {"id": 985, "name": "Товарищество собственников жилья \"Строительная 50\"_капремонт"}, {"id": 994, "name": "Индивидуальный предприниматель Белоцкая Марина Владимировна"}, {"id": 998, "name": "Муниципальное унитарное предприятие \"Ресурс\""}, {"id": 1000, "name": "Муниципальное унитарное предприятие ЖКХ \"Вымпел\""}, {"id": 1001, "name": "Муниципальное унитарное предприятие \"Водопроводно-канализационное хозяйство\""}, {"id": 1007, "name": "Общество с ограниченной ответственностью \"Управляющая компания \"КовдорЛидер\""}, {"id": 1008, "name": "Акционерное общество \"МУРМАНЭНЕРГОСБЫТ\""}, {"id": 1043, "name": "Товарищество собственников населения \"Кандалакшское шоссе 45\""}, {"id": 1046, "name": "Общество с ограниченной ответственностью \"Управляющая компания Сияние Севера\""}, {"id": 1047, "name": "Общество с ограниченной ответственностью \"Сервис 24/7\""}], "label": "Договор УК", "width": 800, "location": "before", "formOrder": 2, "searchExpr": ["name"], "searchMode": "contains", "formColSpan": 2, "locateInMenu": "always", "pageLoadMode": "scrollBottom", "searchEnabled": true, "searchTimeout": 500, "selectAllMode": "allPages", "showScrollbar": "onHover", "showClearButton": true, "searchPlaceholder": "Поиск...", "showSelectionControls": true}, {"type": "range-months", "field": "Период", "label": "Диапазон:", "location": "before", "maxRange": {"months": 6}, "formOrder": 9, "formColSpan": 2, "locateInMenu": "never"}, {"type": "button-group", "field": "status", "items": [{"id": "all", "icon": "list", "text": "Все"}, {"id": "open", "icon": "unlock", "text": "Открытые"}, {"id": "closed", "icon": "lock", "text": "Закрытые"}], "label": "Статус", "multiple": false}, {"type": "button-group", "field": "categories", "items": [{"id": "A", "text": "Категория A"}, {"id": "B", "text": "Категория B"}, {"id": "C", "text": "Категория C"}], "label": "Категории", "multiple": true}]}' AS NVARCHAR(MAX)) AS config) AS src
ON target.setting_key = src.setting_key
WHEN MATCHED THEN UPDATE SET config = src.config, updated_at = SYSUTCDATETIME()
WHEN NOT MATCHED THEN INSERT (setting_key, config) VALUES (src.setting_key, src.config);
GO

SELECT report_key, LEN(query_text) AS query_len, is_section
FROM dbo.reports ORDER BY id;
GO
