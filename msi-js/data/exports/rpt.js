const reports = [
{ id: 0, parent: 0, key:'Основные отчеты', text:'Основные отчеты', expanded:true,
items: [
{ id: 1000, parent: 0, key:'ЮЛ', text:'ЮЛ', expanded:true,
items: [
{ id: 1005, parent: 1000, text: 'ОСВ (Новый)', icon: 'chart',
query:`
SET LANGUAGE Russian;
SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;
SET DATEFORMAT ymd;
SET NOCOUNT ON;
EXEC dbo.report_osv -10,{Период_start},{Период_end}
`, 
views: ["pivot","grid"],
filters: { БД_ЮЛ: [], Период:{},},     
processing:"server-multi",
fields: {
grid: [
  { dataField: 'Филиал', groupIndex: 0},
  { dataField: 'Месяц', groupIndex: 1},
  { dataField: 'ИНН'},  
  { dataField: 'Дата расторжения договора'},  
  { dataField: 'ОТДЕЛЕНИЕ'},
  { dataField: 'УЧАСТОК'},
  { dataField: 'КАТЕГОРИЯ'},
  { dataField: 'КАТЕГОРИЯ уровень 1'},
  { dataField: 'Договор'},  
  { dataField: 'Контрагент'},  

    { dataField: 'ДЗн периоды'},  
    { dataField: 'ДЗн кол-во периодов'},  

    { dataField: 'ДЗН',"format": { "type": "fixedPoint","precision": 2}},
    { dataField: 'ДЗн текущая',"format": { "type": "fixedPoint","precision": 2}},
    { dataField: 'ДЗн просроченная',"format": { "type": "fixedPoint","precision": 2}},
    { dataField: 'КЗн',"format": { "type": "fixedPoint","precision": 2}},

    { dataField: 'Объем',"format": { "type": "fixedPoint","precision": 3}},

    { dataField: 'Дебет',"format": { "type": "fixedPoint","precision": 2}},
    { dataField: 'Списание ДЗ',"format": { "type": "fixedPoint","precision": 2}},
    { dataField: 'Восстановление ДЗ',"format": { "type": "fixedPoint","precision": 2}},
    { dataField: 'Кредит',"format": { "type": "fixedPoint","precision": 2}},
    { dataField: 'Списание КЗ',"format": { "type": "fixedPoint","precision": 2}},
    { dataField: 'Восстановление КЗ',"format": { "type": "fixedPoint","precision": 2}},
    { dataField: 'ДЗк',"format": { "type": "fixedPoint","precision": 2}},
    { dataField: 'ДЗк текущая',"format": { "type": "fixedPoint","precision": 2}},
    { dataField: 'ДЗк просроченная',"format": { "type": "fixedPoint","precision": 2}},
    { dataField: 'КЗк',"format": { "type": "fixedPoint","precision": 2}},

    { dataField: 'ДЗк периоды'},  
    { dataField: 'ДЗк кол-во периодов'},  
    { dataField: 'Дополнительно'},  
    ],
pivot: [
  { dataField: 'Отчет', area: "column",expanded:true,},
  { dataField: 'Филиал', area: "row",expanded:true,},
  { dataField: 'Месяц', area: "row", expanded:true,},
  { dataField: 'ИНН', area: "filter",},  
  { dataField: 'Дата расторжения договора', area: "filter",},  
  { dataField: 'ОТДЕЛЕНИЕ', area: "filter",},
  { dataField: 'УЧАСТОК', area: "filter",},
  { dataField: 'КАТЕГОРИЯ', area: "row", expanded:true},
  { dataField: 'КАТЕГОРИЯ уровень 1', area: "row", expanded:false},
  { dataField: 'Договор', "area": "row", expanded:true},  
  { dataField: 'Контрагент', area: "row", expanded:true},  

    { dataField: 'ДЗк периоды', area: "filter",},  
    { dataField: 'ДЗк кол-во периодов', area: "filter",},  
    { dataField: 'Дополнительно', area: "filter",},  
    { dataField: 'ДЗн периоды', area: "filter",},  
    { dataField: 'ДЗн кол-во периодов', area: "filter",},  

    { dataField: 'Отчет', area: "column",expanded:true,},

    { dataField: 'ДЗН',"dataType": "number", "summaryType": "sum","format": { "type": "fixedPoint","precision": 2}, "area": "data"},
    { dataField: 'ДЗн текущая',"dataType": "number", "summaryType": "sum","format": { "type": "fixedPoint","precision": 2}, "area": "data"},
    { dataField: 'ДЗн просроченная',"dataType": "number", "summaryType": "sum","format": { "type": "fixedPoint","precision": 2}, "area": "data"},
    { dataField: 'КЗн',"dataType": "number", "summaryType": "sum","format": { "type": "fixedPoint","precision": 2}, "area": "data"},

    { caption  : "Объем",dataField: 'Объем',"dataType": "number", "summaryType": "sum","format": { "type": "fixedPoint","precision": 3}, "area": "data"},

    { dataField: 'Дебет',"dataType": "number", "summaryType": "sum","format": { "type": "fixedPoint","precision": 2}, "area": "data"},
    { dataField: 'Списание ДЗ',"dataType": "number", "summaryType": "sum","format": { "type": "fixedPoint","precision": 2}, "area": "data"},
    { dataField: 'Восстановление ДЗ',"dataType": "number", "summaryType": "sum","format": { "type": "fixedPoint","precision": 2}, "area": "data"},
    { dataField: 'Кредит',"dataType": "number", "summaryType": "sum","format": { "type": "fixedPoint","precision": 2}, "area": "data"},
    { dataField: 'Списание КЗ',"dataType": "number", "summaryType": "sum","format": { "type": "fixedPoint","precision": 2}, "area": "data"},
    { dataField: 'Восстановление КЗ',"dataType": "number", "summaryType": "sum","format": { "type": "fixedPoint","precision": 2}, "area": "data"},
    { dataField: 'ДЗк',"dataType": "number", "summaryType": "sum","format": { "type": "fixedPoint","precision": 2}, "area": "data"},
    { dataField: 'ДЗк текущая',"dataType": "number", "summaryType": "sum","format": { "type": "fixedPoint","precision": 2}, "area": "data"},
    { dataField: 'ДЗк просроченная',"dataType": "number", "summaryType": "sum","format": { "type": "fixedPoint","precision": 2}, "area": "data"},
    { dataField: 'КЗк',"dataType": "number", "summaryType": "sum","format": { "type": "fixedPoint","precision": 2}, "area": "data"},
]
,chart: {}
}                     
},
{ id: 1006, parent: 1000, text: 'ЮЛ Ежемесячный отчет в ФАС', icon: 'chart',
query:`
SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED
SET DATEFORMAT ymd
SET NOCOUNT ON;
DECLARE @month1 DATE = {Период_start};
DECLARE @month2 DATE = {Период_end};
DECLARE @date date = getdate();

DECLARE @startOfYear date = DATEFROMPARTS(YEAR(@month1), 1, 1);
DECLARE @heating1 date;
DECLARE @heating2 date;

-- Константы (день.месяц)
DECLARE @start_str NVARCHAR(10) = (SELECT TOP 1 Значение FROM stack.[Константы] WHERE Имя = '196_22_НАЧАЛООТОП');
DECLARE @end_str   NVARCHAR(10) = (SELECT TOP 1 Значение FROM stack.[Константы] WHERE Имя = '196_22_КОНЕЦОТОП');

-- Парсим месяц и день
DECLARE @start_month INT = CAST(SUBSTRING(@start_str, 4, 2) AS INT);
DECLARE @start_day   INT = CAST(SUBSTRING(@start_str, 1, 2) AS INT);
DECLARE @end_month   INT = CAST(SUBSTRING(@end_str, 4, 2) AS INT);
DECLARE @end_day     INT = CAST(SUBSTRING(@end_str, 1, 2) AS INT);

-- Определяем год начала отопительного сезона для @month1
DECLARE @heating_year_start INT;
IF MONTH(@month1) >= @start_month
    SET @heating_year_start = YEAR(@month1);
ELSE
    SET @heating_year_start = YEAR(@month1) - 1;

-- Формируем даты начала и конца сезона
SET @heating1 = DATEFROMPARTS(@heating_year_start, @start_month, @start_day);
SET @heating2 = DATEFROMPARTS(@heating_year_start + 1, @end_month, @end_day);

DECLARE @p1 int,@p2 int,@p3 int;
set @p1	   = (select top 1 row_id from stack.[Виды параметров] where Название = 'КОЛ_ПОМЕЩ');
set @p2	   = (select top 1 row_id from stack.[Виды параметров] where Название = 'ОДНЮЛ');

IF OBJECT_ID('tempdb..#service') IS NOT NULL DROP TABLE #service;
CREATE TABLE #service (
    an46 NVARCHAR(256),
	heating NVARCHAR(10),
    string NVARCHAR(256)
);

-- Вставка данных
INSERT INTO #service VALUES
(2101,'ОП','п. 1.4'),
(2102,'ОП','п. 3.2'),
(2103,'ОП','п. 4.3'),
(2104,'ОП','п. 2.3'),
(2105,'ОП','п. 6.1'),
(2106,'ОП','п. 5.1'),
(2107,'ОП','п. 7.3'),
(2108,'ОП','п. 8.1'),
(2109,'ОП','п. 9.4'),
(2110,'ОП','п. 9.4'),
(2111,'ОП','п. 9.4'),
(2112,'ОП','п. 9.4'),
(2113,'ОП','п. 9.4'),
(2114,'ОП','п. 9.4'),
(2115,'ОП','п. 9.4'),
(2116,'ОП','п. 9.4'),
(2201,'ОП','п. 1.6'),
(2202,'ОП','п. 3.4'),
(2203,'ОП','п. 8.4'),
(2204,'ОП','п. 8.4'),
(2205,'ОП','п. 7.5'),
(2206,'ОП','п. 2.5'),
(2207,'ОП','п. 7.5'),
(2208,'ОП','п. 5.5'),
(2301,'ОП','п. 9.2.2.1'),
(2302,'ОП','п. 9.2.2.1'),
(2303,'ОП','п. 9.2.2.1'),
(2304,'ОП','п. 9.2.2.1'),
(2305,'ОП','п. 9.2.2.2'),
(2306,'ОП','п. 9.2.2.2'),
(2307,'ОП','п. 9.2.2.2'),
(2308,'ОП','п. 9.2.2.2'),
(2309,'ОП','п. 9.2.2.2'),
(2401,'ОП','п. 9.3.2'),
(2402,'ОП','п. 9.3.2'),
(2403,'ОП','п. 9.3.2'),
(2404,'ОП','п. 9.3.2'),
(2601,'ОП','п. 9.5.2'),
(2602,'ОП','п. 9.5.2'),
(2603,'ОП','п. 9.5.2'),
(2604,'ОП','п. 9.5.2'),
(2101,'не ОП','п. 1.4'),
(2102,'не ОП','п. 3.2'),
(2103,'не ОП','п. 4.6'),
(2104,'не ОП','п. 2.6'),
(2105,'не ОП','п. 6.1'),
(2106,'не ОП','п. 5.2'),
(2107,'не ОП','п. 7.6'),
(2108,'не ОП','п. 8.1'),
(2109,'не ОП','п. 9.4'),
(2110,'не ОП','п. 9.4'),
(2111,'не ОП','п. 9.4'),
(2112,'не ОП','п. 9.4'),
(2113,'не ОП','п. 9.4'),
(2114,'не ОП','п. 9.4'),
(2115,'не ОП','п. 9.4'),
(2116,'не ОП','п. 9.4'),
(2201,'не ОП','п. 1.6'),
(2202,'не ОП','п. 3.4'),
(2203,'не ОП','п. 8.4'),
(2204,'не ОП','п. 8.4'),
(2205,'не ОП','п. 7.8'),
(2206,'не ОП','п. 2.8'),
(2207,'не ОП','п. 7.8'),
(2208,'не ОП','п. 5.8'),
(2301,'не ОП','п. 9.2.2.1'),
(2302,'не ОП','п. 9.2.2.1'),
(2303,'не ОП','п. 9.2.2.1'),
(2304,'не ОП','п. 9.2.2.1'),
(2305,'не ОП','п. 9.2.2.3'),
(2306,'не ОП','п. 9.2.2.3'),
(2307,'не ОП','п. 9.2.2.3'),
(2308,'не ОП','п. 9.2.2.3'),
(2309,'не ОП','п. 9.2.2.3'),
(2401,'не ОП','п. 9.3.2'),
(2402,'не ОП','п. 9.3.2'),
(2403,'не ОП','п. 9.3.2'),
(2404,'не ОП','п. 9.3.2'),
(2601,'не ОП','п. 9.5.2'),
(2602,'не ОП','п. 9.5.2'),
(2603,'не ОП','п. 9.5.2'),
(2604,'не ОП','п. 9.5.2'),(2771,'ОП','п. 1.4'),
(2772,'ОП','п. 2.3'),
(2773,'ОП','п. 8.2'),
(2774,'ОП','п. 6.2'),
(2771,'не ОП','п. 1.4'),
(2772,'не ОП','п. 2.6'),
(2773,'не ОП','п. 8.2'),
(2774,'не ОП','п. 6.2'),
(2901,'не ОП','п. 9.6.2'),
(2902,'не ОП','п. 9.6.2'),
(2903,'не ОП','п. 9.6.2'),
(2904,'не ОП','п. 9.6.2'),
(2901,'ОП','п. 9.6.2'),
(2902,'ОП','п. 9.6.2'),
(2903,'ОП','п. 9.6.2'),
(2904,'ОП','п. 9.6.2')

;with 
data_calc as(
	SELECT 
	Месяц, dog.Номер Договор,ls.Номер ТУ, anr.Аналитика1 Услуга, la.Код Ф46,k.[Название] Категория,
	isnull(sv.Значение,1) КолПомещ, iif(sv1.row_id is null,0,1) ОДН,
	case when [Месяц] >= @heating1 and [Месяц] < @heating2 then  'ОП' else 'не ОП' end heating,
	0 ОбъемПер, 0 СуммаПер,
	case when [Номер услуги] = anr.Аналитика1 then [Кол_во] else 0 end Объем,dns.[Сумма],
	stack.ufnULTypeOfService('НАСЕЛЕНИЕУР1',[Номер услуги],anr.Аналитика1,anr.Аналитика2) Д1,
	stack.ufnULTypeOfService('НАСЕЛЕНИЕУР2',[Номер услуги],anr.Аналитика1,anr.Аналитика2) Д2,
	stack.ufnULTypeOfService('НАСЕЛЕНИЕУР3',[Номер услуги],anr.Аналитика1,anr.Аналитика2) Д3
	FROM [stack].[Детализация расчета] dns
	JOIN [stack].[Аналитика расчета] anr on anr.ROW_ID = dns.[Расчет-Аналитика]
	join stack.Договор dog on dog.row_id = [Договор]
	join stack.[Лицевые счета] ls on ls.row_id = [Лицевой]
	join [stack].[Категории договоров] k on k.row_id = dog.[Категория-Договоры]
	join [stack].[Лицевых аналитики] la on la.ROW_ID = anr.Форма46
	left join stack.Свойства sv on sv.[Счет-Параметры] = ls.row_id AND @month1 BETWEEN sv.ДатНач AND sv.ДатКнц and sv.[Виды-Параметры] = @p1
	left join stack.Свойства sv1 on sv1.[Счет-Параметры] = ls.row_id AND @month1 BETWEEN sv1.ДатНач AND sv1.ДатКнц and sv1.[Виды-Параметры] = @p2
	where [Месяц] between @month1 and @month2 and anr.Аналитика2%65536 in  (8050,8060) and [ЗаМесяц] >= @startOfYear

		union all

	SELECT 
	Месяц, dog.Номер Договор,ls.Номер ТУ, anr.Аналитика1 Услуга, la.Код Ф46,k.[Название] Категория,
	isnull(sv.Значение,1) КолПомещ,iif(sv1.row_id is null,0,1) ОДН,
	case when [Месяц] >= @heating1 and [Месяц] < @heating2 then  'ОП' else 'не ОП' end heating,
	case when [Номер услуги] = anr.Аналитика1 then [Кол_во] else 0 end ОбъемПер, dns.[Сумма] СуммаПер,
	0 Объем,0 Сумма,
	stack.ufnULTypeOfService('НАСЕЛЕНИЕУР1',[Номер услуги],anr.Аналитика1,anr.Аналитика2) Д1,
	stack.ufnULTypeOfService('НАСЕЛЕНИЕУР2',[Номер услуги],anr.Аналитика1,anr.Аналитика2) Д2,
	stack.ufnULTypeOfService('НАСЕЛЕНИЕУР3',[Номер услуги],anr.Аналитика1,anr.Аналитика2) Д3
	FROM [stack].[Детализация расчета] dns
	JOIN [stack].[Аналитика расчета] anr on anr.ROW_ID = dns.[Расчет-Аналитика]
	join stack.Договор dog on dog.row_id = [Договор]
	join stack.[Лицевые счета] ls on ls.row_id = [Лицевой]
	join [stack].[Категории договоров] k on k.row_id = dog.[Категория-Договоры]
	join [stack].[Лицевых аналитики] la on la.ROW_ID = anr.Форма46
	left join stack.Свойства sv on sv.[Счет-Параметры] = ls.row_id AND @month1 BETWEEN sv.ДатНач AND sv.ДатКнц and sv.[Виды-Параметры] = @p1
	left join stack.Свойства sv1 on sv1.[Счет-Параметры] = ls.row_id AND @month1 BETWEEN sv1.ДатНач AND sv1.ДатКнц and sv1.[Виды-Параметры] = @p2
	where [Месяц] between @month1 and @month2 and anr.Аналитика2%65536 in  (8050,8060) and [ЗаМесяц] < @startOfYear),
data_d as(
	select Месяц, Договор, ТУ, Услуга, Ф46, Категория, d.heating, isnull(s.string,'установить аналитику на ТУ') string, КолПомещ, ОДН, ОбъемПер, СуммаПер,
	case when Д1 = 1 then Объем else 0 end Объем1,
	case when Д2 = 1 then Объем else 0 end Объем2,
	case when Д3 = 1 then Объем else 0 end Объем3,
	case when Д1 = 1 then Сумма else 0 end Сумма1,
	case when Д2 = 1 then Сумма else 0 end Сумма2,
	case when Д3 = 1 then Сумма else 0 end Сумма3
	from data_calc d
	left join #service s on s.an46 =  d.Ф46 and s.heating = d.heating),
data_sum as(
select 'ЮЛ' ТипБД, Месяц, Договор, ТУ, Услуга, Ф46, Категория, heating, КолПомещ,'МКД' ТипПомещения,
case when (Категория = 'УК, ТСЖ, ЖСК - Дельта ОДН' or Категория = 'Население' ) or ОДН = 1 then 'не заполняется' else string end string,
sum(ОбъемПер) ОбъемПер, sum(СуммаПер) СуммаПер,
sum(Объем1) Объем1, sum(Объем2) Объем2, sum(Объем3) Объем3,
sum(Сумма1) Сумма1, sum(Сумма2) Сумма2, sum(Сумма3) Сумма3
from data_d
group by Месяц, Договор, ТУ, Услуга, Ф46, Категория, heating, КолПомещ, ОДН, string),
data_all as(
select ТипБД, Месяц, Договор, ТУ, Услуга, Ф46, Категория, heating Отоп, КолПомещ,ТипПомещения,string Строка_таблицы,
ОбъемПер, round(СуммаПер,0.01) СуммаПер,
Объем1, Объем2, Объем3,
case when Объем1 <> 0 then КолПомещ else 0 end КолВо1,case when Объем2 <> 0 then КолПомещ else 0 end КолВо2,case when Объем3 <> 0 then КолПомещ else 0 end КолВо3,
Сумма1, Сумма2, Сумма3
from data_sum
where Объем1<>0 or Объем2<>0 or Объем3<>0),
data_num as (
select ТипБД, FORMAT(Месяц, 'yyyy [MM] MMMM', 'ru') Месяц, Договор, ТУ, Услуга, Ф46, Категория, Отоп, КолПомещ,ТипПомещения,Строка_таблицы,ОбъемПер,СуммаПер,
Объем1, Объем2, Объем3,КолВо1,КолВо2,КолВо3,Сумма1, Сумма2, Сумма3, row_number() over(partition by ТипБД, Месяц, Договор, ТУ,Строка_таблицы order by Услуга) rn
from data_all)
select ТипБД, Месяц, Договор, ТУ, Услуга, Ф46, Категория, Отоп, КолПомещ,ТипПомещения,Строка_таблицы,ОбъемПер,СуммаПер,
Объем1, Объем2, Объем3,
case when rn = 1 then КолВо1 else 0 end КолВо1,
case when rn = 1 then КолВо2 else 0 end КолВо2,
case when rn = 1 then КолВо3 else 0 end КолВо3,
Сумма1, Сумма2, Сумма3
from data_num
order by Месяц, Договор, ТУ, Услуга
`, 
filters: { БД_ЮЛ: [], Период: {}},     
processing:"server-multi",
fields: {
grid: [
          { dataField: 'Филиал'},
          { dataField: 'ТипБД',},
          { dataField: 'Месяц',},
          { dataField: 'Договор',},
          { dataField: 'ТУ',},
          { dataField: 'Услуга',},
          { dataField: 'Ф46',},
          { dataField: 'Категория',},
          { dataField: 'Отоп',},      
          { dataField: 'КолПомещ',},  
          { dataField: 'ТипПомещения',},
          { dataField: 'Строка_таблицы', },
          { dataField: 'ОбъемПер',format: { type: 'fixedPoint',precision: 3},},
          { dataField: 'СуммаПер',format: { type: 'fixedPoint',precision: 2},},
          { dataField: 'Объем1',format: { type: 'fixedPoint',precision: 3},},
          { dataField: 'Объем2',format: { type: 'fixedPoint',precision: 3},},
          { dataField: 'Объем3',format: { type: 'fixedPoint',precision: 3},},
          { dataField: 'КолВо1',},
          { dataField: 'КолВо2',},
          { dataField: 'КолВо3',},
          { dataField: 'Сумма1',format: { type: 'fixedPoint',precision: 2},},
          { dataField: 'Сумма2',format: { type: 'fixedPoint',precision: 2},},
          { dataField: 'Сумма3',format: { type: 'fixedPoint',precision: 2},},
                      ],
pivot: [
          { dataField: 'Отчет', area: "column",expanded:true,},
          { dataField: 'Филиал', area: "row",expanded:true,},
          { dataField: 'Месяц', area: "row", expanded:true },
          { dataField: 'Строка_таблицы',area: "row",expanded:true, },    
          { dataField: 'Категория', area: "row",expanded:true,},
          { dataField: 'ТипБД', area: "filter",},      
          { dataField: 'Договор', area: "filter",},      
          { dataField: 'ТУ', area: "filter",},      
          { dataField: 'Услуга', area: "filter",},      
          { dataField: 'Ф46', area: "filter",},      
          { caption: "Отопление", dataField: 'Отоп', area: "filter",},      
          { dataField: 'КолПомещ', area: "filter",},      
          { dataField: 'ТипПомещения', area: "filter",},      
          { caption: "Объем перерасчета", dataField: 'ОбъемПер',"dataType": "number", "summaryType": "sum","format": { "type": "fixedPoint","precision": 3}, "area": "data", "allowCrossGroupCalculation": true},
          { caption: "Сумма перерасчета", dataField: 'СуммаПер',"dataType": "number", "summaryType": "sum","format": { "type": "fixedPoint","precision": 2}, "area": "data", "allowCrossGroupCalculation": true},
          { caption: "Объем 1", dataField: 'Объем1',"dataType": "number", "summaryType": "sum","format": { "type": "fixedPoint","precision": 3}, "area": "data", "allowCrossGroupCalculation": true},
          { caption: "Объем 2", dataField: 'Объем2',"dataType": "number", "summaryType": "sum","format": { "type": "fixedPoint","precision": 3}, "area": "data", "allowCrossGroupCalculation": true},
          { caption: "Объем 3", dataField: 'Объем3',"dataType": "number", "summaryType": "sum","format": { "type": "fixedPoint","precision": 3}, "area": "data", "allowCrossGroupCalculation": true},
          { caption: "Кол-во ЛС 1", dataField: 'КолВо1',"dataType": "number", "summaryType": "sum","format": { "type": "fixedPoint","precision": 0}, "area": "data", "allowCrossGroupCalculation": true},
          { caption: "Кол-во ЛС 2", dataField: 'КолВо2',"dataType": "number", "summaryType": "sum","format": { "type": "fixedPoint","precision": 0}, "area": "data", "allowCrossGroupCalculation": true},
          { caption: "Кол-во ЛС 3", dataField: 'КолВо3',"dataType": "number", "summaryType": "sum","format": { "type": "fixedPoint","precision": 0}, "area": "data", "allowCrossGroupCalculation": true},
          { caption: "Сумма 1", dataField: 'Сумма1',"dataType": "number", "summaryType": "sum","format": { "type": "fixedPoint","precision": 2}, "area": "data", "allowCrossGroupCalculation": true},
          { caption: "Сумма 2", dataField: 'Сумма2',"dataType": "number", "summaryType": "sum","format": { "type": "fixedPoint","precision": 2}, "area": "data", "allowCrossGroupCalculation": true},
          { caption: "Сумма 3", dataField: 'Сумма3',"dataType": "number", "summaryType": "sum","format": { "type": "fixedPoint","precision": 2}, "area": "data", "allowCrossGroupCalculation": true},
                      ]


}                     
},
{ id: 1008, parent: 1000, text: 'ЮЛ ФАС (Итоги)', icon: 'chart',
filters: { БД_ЮЛ: [], Период: {}},     
processing: "server-multi",
fields: {
pivot: [
        { dataField: 'Отчет', area: "column",expanded:true,},
        { dataField: 'Филиал', area: "row",expanded:true,},
        { dataField: 'Месяц', area: "row",expanded:true,},
        { dataField: 'Строка_таблицы',area: "row",expanded:true },    
        { dataField: 'Категория',area: "row",expanded:true },
        { dataField: 'Услуга', area: "filter",},      
        { dataField: 'Ф46', area: "filter",},      
        { caption: "Отопление", dataField: 'Отоп', area: "filter",},      
        { dataField: 'КолПомещ', area: "filter",},      
        { dataField: 'ТипПомещения', area: "filter",},      
        { dataField: 'Сумма', caption: 'Сумма', dataType: "number", summaryType: "sum", format: { type: "fixedPoint", precision: 2 }, area: "data", allowCrossGroupCalculation: true },
        { dataField: 'СуммаПер', caption: 'Сумма Перерасчетов', dataType: "number", summaryType: "sum", format: { type: "fixedPoint", precision: 2 }, area: "data", allowCrossGroupCalculation: true },
        { dataField: 'Объем', caption: 'Объем', dataType: "number", summaryType: "sum", format: { type: "fixedPoint", precision: 3 }, area: "data", allowCrossGroupCalculation: true  },
        { dataField: 'ОбъемПер', caption: 'Объем Перерасчетов', dataType: "number", summaryType: "sum", format: { type: "fixedPoint", precision: 3 }, area: "data", allowCrossGroupCalculation: true  },

{ dataField: '<0_Объем', caption: '<0_Объем', dataType: "number", summaryType: "sum", format: { type: "fixedPoint", precision: 3 }, area: "data", allowCrossGroupCalculation: true },
{ dataField: '0_Объем', caption: '0_Объем', dataType: "number", summaryType: "sum", format: { type: "fixedPoint", precision: 3 }, area: "data", allowCrossGroupCalculation: true },
{ dataField: '0_100_Объем', caption: '0-100 Объем', dataType: "number", summaryType: "sum", format: { type: "fixedPoint", precision: 3 }, area: "data", allowCrossGroupCalculation: true },
{ dataField: '100_200_Объем', caption: '100-200 Объем', dataType: "number", summaryType: "sum", format: { type: "fixedPoint", precision: 3 }, area: "data", allowCrossGroupCalculation: true },
{ dataField: '200_300_Объем', caption: '200-300 Объем', dataType: "number", summaryType: "sum", format: { type: "fixedPoint", precision: 3 }, area: "data", allowCrossGroupCalculation: true },
{ dataField: '300_400_Объем', caption: '300-400 Объем', dataType: "number", summaryType: "sum", format: { type: "fixedPoint", precision: 3 }, area: "data", allowCrossGroupCalculation: true },
{ dataField: '400_500_Объем', caption: '400-500 Объем', dataType: "number", summaryType: "sum", format: { type: "fixedPoint", precision: 3 }, area: "data", allowCrossGroupCalculation: true },
{ dataField: '500_600_Объем', caption: '500-600 Объем', dataType: "number", summaryType: "sum", format: { type: "fixedPoint", precision: 3 }, area: "data", allowCrossGroupCalculation: true },
{ dataField: '600_700_Объем', caption: '600-700 Объем', dataType: "number", summaryType: "sum", format: { type: "fixedPoint", precision: 3 }, area: "data", allowCrossGroupCalculation: true },
{ dataField: '700_800_Объем', caption: '700-800 Объем', dataType: "number", summaryType: "sum", format: { type: "fixedPoint", precision: 3 }, area: "data", allowCrossGroupCalculation: true },
{ dataField: '800_900_Объем', caption: '800-900 Объем', dataType: "number", summaryType: "sum", format: { type: "fixedPoint", precision: 3 }, area: "data", allowCrossGroupCalculation: true },
{ dataField: '900_1000_Объем', caption: '900-1000 Объем', dataType: "number", summaryType: "sum", format: { type: "fixedPoint", precision: 3 }, area: "data", allowCrossGroupCalculation: true },
{ dataField: '1000_2000_Объем', caption: '1000-2000 Объем', dataType: "number", summaryType: "sum", format: { type: "fixedPoint", precision: 3 }, area: "data", allowCrossGroupCalculation: true },
{ dataField: '2000_3000_Объем', caption: '2000-3000 Объем', dataType: "number", summaryType: "sum", format: { type: "fixedPoint", precision: 3 }, area: "data", allowCrossGroupCalculation: true },
{ dataField: '3000_4000_Объем', caption: '3000-4000 Объем', dataType: "number", summaryType: "sum", format: { type: "fixedPoint", precision: 3 }, area: "data", allowCrossGroupCalculation: true },
{ dataField: '4000_5000_Объем', caption: '4000-5000 Объем', dataType: "number", summaryType: "sum", format: { type: "fixedPoint", precision: 3 }, area: "data", allowCrossGroupCalculation: true },
{ dataField: '5000_10000_Объем', caption: '5000-10000 Объем', dataType: "number", summaryType: "sum", format: { type: "fixedPoint", precision: 3 }, area: "data", allowCrossGroupCalculation: true },
{ dataField: '10000_15000_Объем', caption: '10000-15000 Объем', dataType: "number", summaryType: "sum", format: { type: "fixedPoint", precision: 3 }, area: "data", allowCrossGroupCalculation: true },
{ dataField: '15000_20000_Объем', caption: '15000-20000 Объем', dataType: "number", summaryType: "sum", format: { type: "fixedPoint", precision: 3 }, area: "data", allowCrossGroupCalculation: true },
{ dataField: '20000_25000_Объем', caption: '20000-25000 Объем', dataType: "number", summaryType: "sum", format: { type: "fixedPoint", precision: 3 }, area: "data", allowCrossGroupCalculation: true },
{ dataField: '25000_30000_Объем', caption: '25000-30000 Объем', dataType: "number", summaryType: "sum", format: { type: "fixedPoint", precision: 3 }, area: "data", allowCrossGroupCalculation: true },
{ dataField: '30000_35000_Объем', caption: '30000-35000 Объем', dataType: "number", summaryType: "sum", format: { type: "fixedPoint", precision: 3 }, area: "data", allowCrossGroupCalculation: true },
{ dataField: '35000_40000_Объем', caption: '35000-40000 Объем', dataType: "number", summaryType: "sum", format: { type: "fixedPoint", precision: 3 }, area: "data", allowCrossGroupCalculation: true },
{ dataField: '40000_45000_Объем', caption: '40000-45000 Объем', dataType: "number", summaryType: "sum", format: { type: "fixedPoint", precision: 3 }, area: "data", allowCrossGroupCalculation: true },
{ dataField: '45000_50000_Объем', caption: '45000-50000 Объем', dataType: "number", summaryType: "sum", format: { type: "fixedPoint", precision: 3 }, area: "data", allowCrossGroupCalculation: true },
{ dataField: '>50000_Объем', caption: '>50000 Объем', dataType: "number", summaryType: "sum", format: { type: "fixedPoint", precision: 3 }, area: "data", allowCrossGroupCalculation: true },
{ dataField: '<0_КолВо', caption: '<0 Кол-во ЛС', dataType: "number", summaryType: "sum", format: { type: "fixedPoint", precision: 0 }, area: "data", allowCrossGroupCalculation: true },
{ dataField: '0_КолВо', caption: '0 Кол-во ЛС', dataType: "number", summaryType: "sum", format: { type: "fixedPoint", precision: 0 }, area: "data", allowCrossGroupCalculation: true },
{ dataField: '0_100_КолВо', caption: '0-100 Кол-во ЛС', dataType: "number", summaryType: "sum", format: { type: "fixedPoint", precision: 0 }, area: "data", allowCrossGroupCalculation: true },
{ dataField: '100_200_КолВо', caption: '100-200 Кол-во ЛС', dataType: "number", summaryType: "sum", format: { type: "fixedPoint", precision: 0 }, area: "data", allowCrossGroupCalculation: true },
{ dataField: '200_300_КолВо', caption: '200-300 Кол-во ЛС', dataType: "number", summaryType: "sum", format: { type: "fixedPoint", precision: 0 }, area: "data", allowCrossGroupCalculation: true },
{ dataField: '300_400_КолВо', caption: '300-400 Кол-во ЛС', dataType: "number", summaryType: "sum", format: { type: "fixedPoint", precision: 0 }, area: "data", allowCrossGroupCalculation: true },
{ dataField: '400_500_КолВо', caption: '400-500 Кол-во ЛС', dataType: "number", summaryType: "sum", format: { type: "fixedPoint", precision: 0 }, area: "data", allowCrossGroupCalculation: true },
{ dataField: '500_600_КолВо', caption: '500-600 Кол-во ЛС', dataType: "number", summaryType: "sum", format: { type: "fixedPoint", precision: 0 }, area: "data", allowCrossGroupCalculation: true },
{ dataField: '600_700_КолВо', caption: '600-700 Кол-во ЛС', dataType: "number", summaryType: "sum", format: { type: "fixedPoint", precision: 0 }, area: "data", allowCrossGroupCalculation: true },
{ dataField: '700_800_КолВо', caption: '700-800 Кол-во ЛС', dataType: "number", summaryType: "sum", format: { type: "fixedPoint", precision: 0 }, area: "data", allowCrossGroupCalculation: true },
{ dataField: '800_900_КолВо', caption: '800-900 Кол-во ЛС', dataType: "number", summaryType: "sum", format: { type: "fixedPoint", precision: 0 }, area: "data", allowCrossGroupCalculation: true },
{ dataField: '900_1000_КолВо', caption: '900-1000 Кол-во ЛС', dataType: "number", summaryType: "sum", format: { type: "fixedPoint", precision: 0 }, area: "data", allowCrossGroupCalculation: true },
{ dataField: '1000_2000_КолВо', caption: '1000-2000 Кол-во ЛС', dataType: "number", summaryType: "sum", format: { type: "fixedPoint", precision: 0 }, area: "data", allowCrossGroupCalculation: true },
{ dataField: '2000_3000_КолВо', caption: '2000-3000 Кол-во ЛС', dataType: "number", summaryType: "sum", format: { type: "fixedPoint", precision: 0 }, area: "data", allowCrossGroupCalculation: true },
{ dataField: '3000_4000_КолВо', caption: '3000-4000 Кол-во ЛС', dataType: "number", summaryType: "sum", format: { type: "fixedPoint", precision: 0 }, area: "data", allowCrossGroupCalculation: true },
{ dataField: '4000_5000_КолВо', caption: '4000-5000 Кол-во ЛС', dataType: "number", summaryType: "sum", format: { type: "fixedPoint", precision: 0 }, area: "data", allowCrossGroupCalculation: true },
{ dataField: '5000_10000_КолВо', caption: '5000-10000 Кол-во ЛС', dataType: "number", summaryType: "sum", format: { type: "fixedPoint", precision: 0 }, area: "data", allowCrossGroupCalculation: true },
{ dataField: '10000_15000_КолВо', caption: '10000-15000 Кол-во ЛС', dataType: "number", summaryType: "sum", format: { type: "fixedPoint", precision: 0 }, area: "data", allowCrossGroupCalculation: true },
{ dataField: '15000_20000_КолВо', caption: '15000-20000 Кол-во ЛС', dataType: "number", summaryType: "sum", format: { type: "fixedPoint", precision: 0 }, area: "data", allowCrossGroupCalculation: true },
{ dataField: '20000_25000_КолВо', caption: '20000-25000 Кол-во ЛС', dataType: "number", summaryType: "sum", format: { type: "fixedPoint", precision: 0 }, area: "data", allowCrossGroupCalculation: true },
{ dataField: '25000_30000_КолВо', caption: '25000-30000 Кол-во ЛС', dataType: "number", summaryType: "sum", format: { type: "fixedPoint", precision: 0 }, area: "data", allowCrossGroupCalculation: true },
{ dataField: '30000_35000_КолВо', caption: '30000-35000 Кол-во ЛС', dataType: "number", summaryType: "sum", format: { type: "fixedPoint", precision: 0 }, area: "data", allowCrossGroupCalculation: true },
{ dataField: '35000_40000_КолВо', caption: '35000-40000 Кол-во ЛС', dataType: "number", summaryType: "sum", format: { type: "fixedPoint", precision: 0 }, area: "data", allowCrossGroupCalculation: true },
{ dataField: '40000_45000_КолВо', caption: '40000-45000 Кол-во ЛС', dataType: "number", summaryType: "sum", format: { type: "fixedPoint", precision: 0 }, area: "data", allowCrossGroupCalculation: true },
{ dataField: '45000_50000_КолВо', caption: '45000-50000 Кол-во ЛС', dataType: "number", summaryType: "sum", format: { type: "fixedPoint", precision: 0 }, area: "data", allowCrossGroupCalculation: true },
{ dataField: '>50000_КолВо', caption: '>50000 Кол-во ЛС', dataType: "number", summaryType: "sum", format: { type: "fixedPoint", precision: 0 }, area: "data", allowCrossGroupCalculation: true },
      ],
grid: [
        { dataField: 'Филиал'},
        { dataField: 'Месяц'},
        { dataField: 'Услуга' },
        { dataField: 'Ф46' },
        { dataField: 'Категория' },
        { dataField: 'Отоп' },
        { dataField: 'КолПомещ' },
        { dataField: 'ТипПомещения' },
        { dataField: 'Строка_таблицы' },
        { dataField: 'ОбъемПер' },
        { dataField: 'СуммаПер' },
        { dataField: '<0_Объем' },
        { dataField: '0_Объем' },
        { dataField: '0_100_Объем' },
        { dataField: '100_200_Объем' },
        { dataField: '200_300_Объем' },
        { dataField: '300_400_Объем' },
        { dataField: '400_500_Объем' },
        { dataField: '500_600_Объем' },
        { dataField: '600_700_Объем' },
        { dataField: '700_800_Объем' },
        { dataField: '800_900_Объем' },
        { dataField: '900_1000_Объем' },
        { dataField: '1000_2000_Объем' },
        { dataField: '2000_3000_Объем' },
        { dataField: '3000_4000_Объем' },
        { dataField: '4000_5000_Объем' },
        { dataField: '5000_10000_Объем' },
        { dataField: '10000_15000_Объем' },
        { dataField: '15000_20000_Объем' },
        { dataField: '20000_25000_Объем' },
        { dataField: '25000_30000_Объем' },
        { dataField: '30000_35000_Объем' },
        { dataField: '35000_40000_Объем' },
        { dataField: '40000_45000_Объем' },
        { dataField: '45000_50000_Объем' },
        { dataField: '>50000_Объем' },
        { dataField: '<0_КолВо' },
        { dataField: '0_КолВо' },
        { dataField: '0_100_КолВо' },
        { dataField: '100_200_КолВо' },
        { dataField: '200_300_КолВо' },
        { dataField: '300_400_КолВо' },
        { dataField: '400_500_КолВо' },
        { dataField: '500_600_КолВо' },
        { dataField: '600_700_КолВо' },
        { dataField: '700_800_КолВо' },
        { dataField: '800_900_КолВо' },
        { dataField: '900_1000_КолВо' },
        { dataField: '1000_2000_КолВо' },
        { dataField: '2000_3000_КолВо' },
        { dataField: '3000_4000_КолВо' },
        { dataField: '4000_5000_КолВо' },
        { dataField: '5000_10000_КолВо' },
        { dataField: '10000_15000_КолВо' },
        { dataField: '15000_20000_КолВо' },
        { dataField: '20000_25000_КолВо' },
        { dataField: '25000_30000_КолВо' },
        { dataField: '30000_35000_КолВо' },
        { dataField: '35000_40000_КолВо' },
        { dataField: '40000_45000_КолВо' },
        { dataField: '45000_50000_КолВо' },
        { dataField: '>50000_КолВо' }
    ]
  },                     
query:`
SET DATEFORMAT ymd
SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED
SET NOCOUNT ON;
DECLARE @month1 DATE = {Период_start};
DECLARE @month2 DATE = {Период_end};

DECLARE @date date = getdate();
DECLARE @startOfYear date = DATEFROMPARTS(YEAR(@month1), 1, 1);

-- Константы (день.месяц)
DECLARE @start_str NVARCHAR(10) = (SELECT TOP 1 Значение FROM stack.[Константы] WHERE Имя = '196_22_НАЧАЛООТОП');
DECLARE @end_str   NVARCHAR(10) = (SELECT TOP 1 Значение FROM stack.[Константы] WHERE Имя = '196_22_КОНЕЦОТОП');

-- Парсим месяц и день
DECLARE @start_month INT = CAST(SUBSTRING(@start_str, 4, 2) AS INT);
DECLARE @start_day   INT = CAST(SUBSTRING(@start_str, 1, 2) AS INT);
DECLARE @end_month   INT = CAST(SUBSTRING(@end_str, 4, 2) AS INT);
DECLARE @end_day     INT = CAST(SUBSTRING(@end_str, 1, 2) AS INT);

DECLARE @p1 int,@p2 int;
set @p1 = (select top 1 row_id from stack.[Виды параметров] where Название = 'КОЛ_ПОМЕЩ');
set @p2 = (select top 1 row_id from stack.[Виды параметров] where Название = 'ОДНЮЛ');

-- Создаем временную таблицу для результатов
IF OBJECT_ID('tempdb..#result') IS NOT NULL DROP TABLE #result;
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
IF OBJECT_ID('tempdb..#exc_contract') IS NOT NULL DROP TABLE #exc_contract;
CREATE TABLE #exc_contract (id int)

declare @exc_contract_folder int = -1 
declare @reg int = (select Значение from stack.Константы where Имя = 'КОДРЕГИОНА')

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
        CAST(ch.HierarchyPath + ' -> ' + CAST(c.row_id AS VARCHAR(20)) AS VARCHAR(MAX)) AS HierarchyPath,
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
IF OBJECT_ID('tempdb..#service') IS NOT NULL DROP TABLE #service;
CREATE TABLE #service (
    an46 NVARCHAR(256),
	heating NVARCHAR(10),
    string NVARCHAR(256)
);

INSERT INTO #service VALUES
(2101,'ОП','п. 1.4'), (2102,'ОП','п. 3.2'), (2103,'ОП','п. 4.3'), (2104,'ОП','п. 2.3'),
(2105,'ОП','п. 6.1'), (2106,'ОП','п. 5.1'), (2107,'ОП','п. 7.3'), (2108,'ОП','п. 8.1'),
(2109,'ОП','п. 9.4'), (2110,'ОП','п. 9.4'), (2111,'ОП','п. 9.4'), (2112,'ОП','п. 9.4'),
(2113,'ОП','п. 9.4'), (2114,'ОП','п. 9.4'), (2115,'ОП','п. 9.4'), (2116,'ОП','п. 9.4'),
(2201,'ОП','п. 1.6'), (2202,'ОП','п. 3.4'), (2203,'ОП','п. 8.4'), (2204,'ОП','п. 8.4'),
(2205,'ОП','п. 7.5'), (2206,'ОП','п. 2.5'), (2207,'ОП','п. 7.5'), (2208,'ОП','п. 5.5'),
(2301,'ОП','п. 9.2.2.1'), (2302,'ОП','п. 9.2.2.1'), (2303,'ОП','п. 9.2.2.1'), (2304,'ОП','п. 9.2.2.1'),
(2305,'ОП','п. 9.2.2.2'), (2306,'ОП','п. 9.2.2.2'), (2307,'ОП','п. 9.2.2.2'), (2308,'ОП','п. 9.2.2.2'),
(2309,'ОП','п. 9.2.2.2'), (2401,'ОП','п. 9.3.2'), (2402,'ОП','п. 9.3.2'), (2403,'ОП','п. 9.3.2'),
(2404,'ОП','п. 9.3.2'), (2601,'ОП','п. 9.5.2'), (2602,'ОП','п. 9.5.2'), (2603,'ОП','п. 9.5.2'),
(2604,'ОП','п. 9.5.2'),
(2101,'не ОП','п. 1.4'), (2102,'не ОП','п. 3.2'), (2103,'не ОП','п. 4.6'), (2104,'не ОП','п. 2.6'),
(2105,'не ОП','п. 6.1'), (2106,'не ОП','п. 5.2'), (2107,'не ОП','п. 7.6'), (2108,'не ОП','п. 8.1'),
(2109,'не ОП','п. 9.4'), (2110,'не ОП','п. 9.4'), (2111,'не ОП','п. 9.4'), (2112,'не ОП','п. 9.4'),
(2113,'не ОП','п. 9.4'), (2114,'не ОП','п. 9.4'), (2115,'не ОП','п. 9.4'), (2116,'не ОП','п. 9.4'),
(2201,'не ОП','п. 1.6'), (2202,'не ОП','п. 3.4'), (2203,'не ОП','п. 8.4'), (2204,'не ОП','п. 8.4'),
(2205,'не ОП','п. 7.8'), (2206,'не ОП','п. 2.8'), (2207,'не ОП','п. 7.8'), (2208,'не ОП','п. 5.8'),
(2301,'не ОП','п. 9.2.2.1'), (2302,'не ОП','п. 9.2.2.1'), (2303,'не ОП','п. 9.2.2.1'), (2304,'не ОП','п. 9.2.2.1'),
(2305,'не ОП','п. 9.2.2.3'), (2306,'не ОП','п. 9.2.2.3'), (2307,'не ОП','п. 9.2.2.3'), (2308,'не ОП','п. 9.2.2.3'),
(2309,'не ОП','п. 9.2.2.3'), (2401,'не ОП','п. 9.3.2'), (2402,'не ОП','п. 9.3.2'), (2403,'не ОП','п. 9.3.2'),
(2404,'не ОП','п. 9.3.2'), (2601,'не ОП','п. 9.5.2'), (2602,'не ОП','п. 9.5.2'), (2603,'не ОП','п. 9.5.2'),
(2604,'не ОП','п. 9.5.2'),
(2771,'ОП','п. 1.4'), (2772,'ОП','п. 2.3'), (2773,'ОП','п. 8.2'), (2774,'ОП','п. 6.2'),
(2771,'не ОП','п. 1.4'), (2772,'не ОП','п. 2.6'), (2773,'не ОП','п. 8.2'), (2774,'не ОП','п. 6.2'),
(2901,'не ОП','п. 9.6.2'), (2902,'не ОП','п. 9.6.2'), (2903,'не ОП','п. 9.6.2'), (2904,'не ОП','п. 9.6.2'),
(2901,'ОП','п. 9.6.2'), (2902,'ОП','п. 9.6.2'), (2903,'ОП','п. 9.6.2'), (2904,'ОП','п. 9.6.2');

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
            THEN 'ОП' 
            ELSE 'не ОП' 
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
            THEN 'ОП' 
            ELSE 'не ОП' 
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
        isnull(s.string,'установить аналитику на ТУ') string, 
        КолПомещ, ОДН, ОбъемПер, СуммаПер,
        Объем, Сумма
        from data_calc d
        left join #service s on s.an46 = d.Ф46 and s.heating = d.heating
    ),
    data_sum as(
        select 'ЮЛ' БД, Месяц, Договор, ТУ, Услуга, Ф46, Категория, heating, КолПомещ,'МКД' ТипПомещения,
        case when (Категория = 'УК, ТСЖ, ЖСК - Дельта ОДН' or Категория = 'Население' ) or ОДН = 1 then 'не заполняется' else string end string,
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
                WHEN (ds.Объем / NULLIF(ds.КолПомещ, 0)) < 0 THEN '<0'
                WHEN (ds.Объем / NULLIF(ds.КолПомещ, 0)) = 0 THEN '0'
                WHEN (ds.Объем / NULLIF(ds.КолПомещ, 0)) > 0 AND (ds.Объем / NULLIF(ds.КолПомещ, 0)) <= 100 THEN '0_100'
                WHEN (ds.Объем / NULLIF(ds.КолПомещ, 0)) > 100 AND (ds.Объем / NULLIF(ds.КолПомещ, 0)) <= 200 THEN '100_200'
                WHEN (ds.Объем / NULLIF(ds.КолПомещ, 0)) > 200 AND (ds.Объем / NULLIF(ds.КолПомещ, 0)) <= 300 THEN '200_300'
                WHEN (ds.Объем / NULLIF(ds.КолПомещ, 0)) > 300 AND (ds.Объем / NULLIF(ds.КолПомещ, 0)) <= 400 THEN '300_400'
                WHEN (ds.Объем / NULLIF(ds.КолПомещ, 0)) > 400 AND (ds.Объем / NULLIF(ds.КолПомещ, 0)) <= 500 THEN '400_500'
                WHEN (ds.Объем / NULLIF(ds.КолПомещ, 0)) > 500 AND (ds.Объем / NULLIF(ds.КолПомещ, 0)) <= 600 THEN '500_600'
                WHEN (ds.Объем / NULLIF(ds.КолПомещ, 0)) > 600 AND (ds.Объем / NULLIF(ds.КолПомещ, 0)) <= 700 THEN '600_700'
                WHEN (ds.Объем / NULLIF(ds.КолПомещ, 0)) > 700 AND (ds.Объем / NULLIF(ds.КолПомещ, 0)) <= 800 THEN '700_800'
                WHEN (ds.Объем / NULLIF(ds.КолПомещ, 0)) > 800 AND (ds.Объем / NULLIF(ds.КолПомещ, 0)) <= 900 THEN '800_900'
                WHEN (ds.Объем / NULLIF(ds.КолПомещ, 0)) > 900 AND (ds.Объем / NULLIF(ds.КолПомещ, 0)) <= 1000 THEN '900_1000'
                WHEN (ds.Объем / NULLIF(ds.КолПомещ, 0)) > 1000 AND (ds.Объем / NULLIF(ds.КолПомещ, 0)) <= 2000 THEN '1000_2000'
                WHEN (ds.Объем / NULLIF(ds.КолПомещ, 0)) > 2000 AND (ds.Объем / NULLIF(ds.КолПомещ, 0)) <= 3000 THEN '2000_3000'
                WHEN (ds.Объем / NULLIF(ds.КолПомещ, 0)) > 3000 AND (ds.Объем / NULLIF(ds.КолПомещ, 0)) <= 4000 THEN '3000_4000'
                WHEN (ds.Объем / NULLIF(ds.КолПомещ, 0)) > 4000 AND (ds.Объем / NULLIF(ds.КолПомещ, 0)) <= 5000 THEN '4000_5000'
                WHEN (ds.Объем / NULLIF(ds.КолПомещ, 0)) > 5000 AND (ds.Объем / NULLIF(ds.КолПомещ, 0)) <= 10000 THEN '5000_10000'
                WHEN (ds.Объем / NULLIF(ds.КолПомещ, 0)) > 10000 AND (ds.Объем / NULLIF(ds.КолПомещ, 0)) <= 15000 THEN '10000_15000'
                WHEN (ds.Объем / NULLIF(ds.КолПомещ, 0)) > 15000 AND (ds.Объем / NULLIF(ds.КолПомещ, 0)) <= 20000 THEN '15000_20000'
                WHEN (ds.Объем / NULLIF(ds.КолПомещ, 0)) > 20000 AND (ds.Объем / NULLIF(ds.КолПомещ, 0)) <= 25000 THEN '20000_25000'
                WHEN (ds.Объем / NULLIF(ds.КолПомещ, 0)) > 25000 AND (ds.Объем / NULLIF(ds.КолПомещ, 0)) <= 30000 THEN '25000_30000'
                WHEN (ds.Объем / NULLIF(ds.КолПомещ, 0)) > 30000 AND (ds.Объем / NULLIF(ds.КолПомещ, 0)) <= 35000 THEN '30000_35000'
                WHEN (ds.Объем / NULLIF(ds.КолПомещ, 0)) > 35000 AND (ds.Объем / NULLIF(ds.КолПомещ, 0)) <= 40000 THEN '35000_40000'
                WHEN (ds.Объем / NULLIF(ds.КолПомещ, 0)) > 40000 AND (ds.Объем / NULLIF(ds.КолПомещ, 0)) <= 45000 THEN '40000_45000'
                WHEN (ds.Объем / NULLIF(ds.КолПомещ, 0)) > 45000 AND (ds.Объем / NULLIF(ds.КолПомещ, 0)) <= 50000 THEN '45000_50000'
                WHEN (ds.Объем / NULLIF(ds.КолПомещ, 0)) > 50000 THEN '>50000'
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
            MAX(CASE WHEN rc.range_name = '<0' THEN rc.Объем ELSE 0 END) AS [<0_Объем],
            MAX(CASE WHEN rc.range_name = '0' THEN rc.Объем ELSE 0 END) AS [0_Объем],
            MAX(CASE WHEN rc.range_name = '0_100' THEN rc.Объем ELSE 0 END) AS [0_100_Объем],
            MAX(CASE WHEN rc.range_name = '100_200' THEN rc.Объем ELSE 0 END) AS [100_200_Объем],
            MAX(CASE WHEN rc.range_name = '200_300' THEN rc.Объем ELSE 0 END) AS [200_300_Объем],
            MAX(CASE WHEN rc.range_name = '300_400' THEN rc.Объем ELSE 0 END) AS [300_400_Объем],
            MAX(CASE WHEN rc.range_name = '400_500' THEN rc.Объем ELSE 0 END) AS [400_500_Объем],
            MAX(CASE WHEN rc.range_name = '500_600' THEN rc.Объем ELSE 0 END) AS [500_600_Объем],
            MAX(CASE WHEN rc.range_name = '600_700' THEN rc.Объем ELSE 0 END) AS [600_700_Объем],
            MAX(CASE WHEN rc.range_name = '700_800' THEN rc.Объем ELSE 0 END) AS [700_800_Объем],
            MAX(CASE WHEN rc.range_name = '800_900' THEN rc.Объем ELSE 0 END) AS [800_900_Объем],
            MAX(CASE WHEN rc.range_name = '900_1000' THEN rc.Объем ELSE 0 END) AS [900_1000_Объем],
            MAX(CASE WHEN rc.range_name = '1000_2000' THEN rc.Объем ELSE 0 END) AS [1000_2000_Объем],
            MAX(CASE WHEN rc.range_name = '2000_3000' THEN rc.Объем ELSE 0 END) AS [2000_3000_Объем],
            MAX(CASE WHEN rc.range_name = '3000_4000' THEN rc.Объем ELSE 0 END) AS [3000_4000_Объем],
            MAX(CASE WHEN rc.range_name = '4000_5000' THEN rc.Объем ELSE 0 END) AS [4000_5000_Объем],
            MAX(CASE WHEN rc.range_name = '5000_10000' THEN rc.Объем ELSE 0 END) AS [5000_10000_Объем],
            MAX(CASE WHEN rc.range_name = '10000_15000' THEN rc.Объем ELSE 0 END) AS [10000_15000_Объем],
            MAX(CASE WHEN rc.range_name = '15000_20000' THEN rc.Объем ELSE 0 END) AS [15000_20000_Объем],
            MAX(CASE WHEN rc.range_name = '20000_25000' THEN rc.Объем ELSE 0 END) AS [20000_25000_Объем],
            MAX(CASE WHEN rc.range_name = '25000_30000' THEN rc.Объем ELSE 0 END) AS [25000_30000_Объем],
            MAX(CASE WHEN rc.range_name = '30000_35000' THEN rc.Объем ELSE 0 END) AS [30000_35000_Объем],
            MAX(CASE WHEN rc.range_name = '35000_40000' THEN rc.Объем ELSE 0 END) AS [35000_40000_Объем],
            MAX(CASE WHEN rc.range_name = '40000_45000' THEN rc.Объем ELSE 0 END) AS [40000_45000_Объем],
            MAX(CASE WHEN rc.range_name = '45000_50000' THEN rc.Объем ELSE 0 END) AS [45000_50000_Объем],
            MAX(CASE WHEN rc.range_name = '>50000' THEN rc.Объем ELSE 0 END) AS [>50000_Объем],
            -- Количества по диапазонам
            MAX(CASE WHEN rc.range_name = '<0' THEN rc.КолПомещ ELSE 0 END) AS [<0_КолВо],
            MAX(CASE WHEN rc.range_name = '0' THEN rc.КолПомещ ELSE 0 END) AS [0_КолВо],
            MAX(CASE WHEN rc.range_name = '0_100' THEN rc.КолПомещ ELSE 0 END) AS [0_100_КолВо],
            MAX(CASE WHEN rc.range_name = '100_200' THEN rc.КолПомещ ELSE 0 END) AS [100_200_КолВо],
            MAX(CASE WHEN rc.range_name = '200_300' THEN rc.КолПомещ ELSE 0 END) AS [200_300_КолВо],
            MAX(CASE WHEN rc.range_name = '300_400' THEN rc.КолПомещ ELSE 0 END) AS [300_400_КолВо],
            MAX(CASE WHEN rc.range_name = '400_500' THEN rc.КолПомещ ELSE 0 END) AS [400_500_КолВо],
            MAX(CASE WHEN rc.range_name = '500_600' THEN rc.КолПомещ ELSE 0 END) AS [500_600_КолВо],
            MAX(CASE WHEN rc.range_name = '600_700' THEN rc.КолПомещ ELSE 0 END) AS [600_700_КолВо],
            MAX(CASE WHEN rc.range_name = '700_800' THEN rc.КолПомещ ELSE 0 END) AS [700_800_КолВо],
            MAX(CASE WHEN rc.range_name = '800_900' THEN rc.КолПомещ ELSE 0 END) AS [800_900_КолВо],
            MAX(CASE WHEN rc.range_name = '900_1000' THEN rc.КолПомещ ELSE 0 END) AS [900_1000_КолВо],
            MAX(CASE WHEN rc.range_name = '1000_2000' THEN rc.КолПомещ ELSE 0 END) AS [1000_2000_КолВо],
            MAX(CASE WHEN rc.range_name = '2000_3000' THEN rc.КолПомещ ELSE 0 END) AS [2000_3000_КолВо],
            MAX(CASE WHEN rc.range_name = '3000_4000' THEN rc.КолПомещ ELSE 0 END) AS [3000_4000_КолВо],
            MAX(CASE WHEN rc.range_name = '4000_5000' THEN rc.КолПомещ ELSE 0 END) AS [4000_5000_КолВо],
            MAX(CASE WHEN rc.range_name = '5000_10000' THEN rc.КолПомещ ELSE 0 END) AS [5000_10000_КолВо],
            MAX(CASE WHEN rc.range_name = '10000_15000' THEN rc.КолПомещ ELSE 0 END) AS [10000_15000_КолВо],
            MAX(CASE WHEN rc.range_name = '15000_20000' THEN rc.КолПомещ ELSE 0 END) AS [15000_20000_КолВо],
            MAX(CASE WHEN rc.range_name = '20000_25000' THEN rc.КолПомещ ELSE 0 END) AS [20000_25000_КолВо],
            MAX(CASE WHEN rc.range_name = '25000_30000' THEN rc.КолПомещ ELSE 0 END) AS [25000_30000_КолВо],
            MAX(CASE WHEN rc.range_name = '30000_35000' THEN rc.КолПомещ ELSE 0 END) AS [30000_35000_КолВо],
            MAX(CASE WHEN rc.range_name = '35000_40000' THEN rc.КолПомещ ELSE 0 END) AS [35000_40000_КолВо],
            MAX(CASE WHEN rc.range_name = '40000_45000' THEN rc.КолПомещ ELSE 0 END) AS [40000_45000_КолВо],
            MAX(CASE WHEN rc.range_name = '45000_50000' THEN rc.КолПомещ ELSE 0 END) AS [45000_50000_КолВо],
            MAX(CASE WHEN rc.range_name = '>50000' THEN rc.КолПомещ ELSE 0 END) AS [>50000_КолВо]
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
SELECT БД, FORMAT(Месяц, 'yyyy [MM] MMMM', 'ru') Месяц, Услуга, Ф46, Категория, Отоп, 
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

-- Очищаем временные таблицы
DROP TABLE #result;
DROP TABLE #exc_contract;
DROP TABLE #service; 
` 
},
]},
{ id: 2000, parent: 0, key:'ФЛ', text:'ФЛ', expanded:true,
items: [
{ id: 2001, parent: 2000, text: 'ФЛ Ежемесячный отчет в ФАС', icon: 'chart' , visible: false,
filters: { БД_ФЛ: [], Период: {}, },
processing:"server-multi",
query:`
SET DATEFORMAT ymd
SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED
SET NOCOUNT ON;
DECLARE @dn DATE = {Период_start};
DECLARE @dk DATE = {Период_end};

DECLARE @startOfYear date = DATEFROMPARTS(YEAR(@dn), 1, 1);

declare @p1 int,@p2 int,@p3 int;
set @p1	   = (select top 1 row_id from stack.[Виды параметров] where Название = 'СПОДМДСЕМ');

declare @reg int = (select top 1 Значение from stack.Константы where имя = 'РЕГИОН')

IF OBJECT_ID('tempdb..#heating_season') IS NOT NULL DROP TABLE #heating_season;
CREATE TABLE #heating_season (
    date date,
    value varchar(10)
);

IF OBJECT_ID('tempdb..#data') IS NOT NULL DROP TABLE #data;
CREATE TABLE #data (ls_id int,calc_month date, int1 int, int2 int, int3 int );

IF OBJECT_ID('tempdb..#ls') IS NOT NULL DROP TABLE #ls;
CREATE TABLE #ls ( ls_id int, house_id int, house_type varchar(256), privileged varchar(10));

IF OBJECT_ID('tempdb..#service') IS NOT NULL DROP TABLE #service;
CREATE TABLE #service (
    Услуга INT,
    ТипСтрой NVARCHAR(50),
    Сезон NVARCHAR(10),
    Диапазон INT,
    Строка_таблицы NVARCHAR(50)
);

;WITH Months AS (
    SELECT CAST(DATEFROMPARTS(YEAR(@dn), MONTH(@dn), 1) AS DATE) AS MonthStart
    UNION ALL
    SELECT DATEADD(MONTH, 1, MonthStart)
    FROM Months
    WHERE DATEADD(MONTH, 1, MonthStart) <= @dk
),
HistoricalValues AS (
    SELECT 
        DATEFROMPARTS(YEAR(hc.[Дата]), MONTH(hc.[Дата]), 1) [Дата],
        cast(iif(hc.[Значение]='',0,hc.[Значение]) as int) [Значение]
    FROM [stack].[История констант] hc
    JOIN stack.Константы c ON hc.[Константа-История] = c.row_id
    WHERE c.Имя = 'ТЕК_СЕЗОН_ОТОП_ДИФ'
)
insert into #heating_season
SELECT 
    m.MonthStart AS [Дата],
    case when ISNULL(hv.[Значение], (
        SELECT TOP 1 hv2.[Значение]
        FROM HistoricalValues hv2
        WHERE hv2.[Дата] <= m.MonthStart
        ORDER BY hv2.[Дата] DESC
    )) = 1 then 'ОП' else 'не ОП' end [Значение]
FROM Months m
LEFT JOIN HistoricalValues hv ON hv.[Дата] = m.MonthStart
ORDER BY m.MonthStart


-- Заполнение таблицы данными
INSERT INTO #service (Услуга, ТипСтрой, Сезон, Диапазон, Строка_таблицы)
VALUES
(101,'частный','ОП',1,'п. 1.1'),
(102,'частный','ОП',1,'п. 3.1'),
(103,'частный','ОП',1,'п. 8.1'),
(104,'частный','ОП',1,'п. 4.1'),
(105,'частный','ОП',1,'п. 2.1'),
(151,'частный','ОП',1,'п. 1.1'),
(152,'частный','ОП',1,'п. 3.1'),
(153,'частный','ОП',1,'п. 8.1'),
(154,'частный','ОП',1,'п. 1.1'),
(155,'частный','ОП',1,'п. 3.1'),
(156,'частный','ОП',1,'п. 8.1'),
(157,'частный','ОП',1,'п. 1.1'),
(158,'частный','ОП',1,'п. 3.1'),
(159,'частный','ОП',1,'п. 8.1'),
(160,'частный','ОП',1,'п. 1.1'),
(161,'частный','ОП',1,'п. 3.1'),
(162,'частный','ОП',1,'п. 8.1'),
(163,'частный','ОП',1,'п. 1.1'),
(164,'частный','ОП',1,'п. 3.1'),
(165,'частный','ОП',1,'п. 8.1'),
(166,'частный','ОП',1,'п. 1.1'),
(167,'частный','ОП',1,'п. 3.1'),
(168,'частный','ОП',1,'п. 8.1'),
(169,'частный','ОП',1,'п. 4.1'),
(170,'частный','ОП',1,'п. 2.1'),
(171,'частный','ОП',1,'п. 4.1'),
(172,'частный','ОП',1,'п. 2.1'),
(173,'частный','ОП',1,'п. 4.1'),
(174,'частный','ОП',1,'п. 2.1'),
(175,'частный','ОП',1,'п. 4.1'),
(176,'частный','ОП',1,'п. 2.1'),
(177,'частный','ОП',1,'п. 4.1'),
(178,'частный','ОП',1,'п. 2.1'),
(179,'частный','ОП',1,'п. 4.1'),
(180,'частный','ОП',1,'п. 2.1'),
(401,'частный','ОП',1,'п. 1.1'),
(402,'частный','ОП',1,'п. 3.1'),
(403,'частный','ОП',1,'п. 8.1'),
(404,'частный','ОП',1,'п. 4.1'),
(405,'частный','ОП',1,'п. 2.1'),
(406,'частный','ОП',1,'п. 7.1'),
(407,'частный','ОП',1,'п. 6.1'),
(408,'частный','ОП',1,'п. 5.1'),
(501,'частный','ОП',1,'п. 7.1'),
(502,'частный','ОП',1,'п. 6.1'),
(503,'частный','ОП',1,'п. 5.1'),
(551,'частный','ОП',1,'п. 7.1'),
(552,'частный','ОП',1,'п. 6.1'),
(553,'частный','ОП',1,'п. 5.1'),
(554,'частный','ОП',1,'п. 7.1'),
(555,'частный','ОП',1,'п. 6.1'),
(556,'частный','ОП',1,'п. 5.1'),
(557,'частный','ОП',1,'п. 7.1'),
(558,'частный','ОП',1,'п. 6.1'),
(559,'частный','ОП',1,'п. 5.1'),
(560,'частный','ОП',1,'п. 7.1'),
(561,'частный','ОП',1,'п. 6.1'),
(562,'частный','ОП',1,'п. 5.1'),
(563,'частный','ОП',1,'п. 7.1'),
(564,'частный','ОП',1,'п. 6.1'),
(565,'частный','ОП',1,'п. 5.1'),
(566,'частный','ОП',1,'п. 7.1'),
(567,'частный','ОП',1,'п. 6.1'),
(568,'частный','ОП',1,'п. 5.1'),
(201,'частный','ОП',2,'п. 1.1'),
(202,'частный','ОП',2,'п. 3.1'),
(203,'частный','ОП',2,'п. 8.1'),
(204,'частный','ОП',2,'п. 4.1'),
(205,'частный','ОП',2,'п. 2.1'),
(251,'частный','ОП',2,'п. 1.1'),
(252,'частный','ОП',2,'п. 3.1'),
(253,'частный','ОП',2,'п. 8.1'),
(254,'частный','ОП',2,'п. 1.1'),
(255,'частный','ОП',2,'п. 3.1'),
(256,'частный','ОП',2,'п. 8.1'),
(257,'частный','ОП',2,'п. 1.1'),
(258,'частный','ОП',2,'п. 3.1'),
(259,'частный','ОП',2,'п. 8.1'),
(260,'частный','ОП',2,'п. 1.1'),
(261,'частный','ОП',2,'п. 3.1'),
(262,'частный','ОП',2,'п. 8.1'),
(263,'частный','ОП',2,'п. 1.1'),
(264,'частный','ОП',2,'п. 3.1'),
(265,'частный','ОП',2,'п. 8.1'),
(266,'частный','ОП',2,'п. 1.1'),
(267,'частный','ОП',2,'п. 3.1'),
(268,'частный','ОП',2,'п. 8.1'),
(269,'частный','ОП',2,'п. 4.1'),
(270,'частный','ОП',2,'п. 2.1'),
(271,'частный','ОП',2,'п. 4.1'),
(272,'частный','ОП',2,'п. 2.1'),
(273,'частный','ОП',2,'п. 4.1'),
(274,'частный','ОП',2,'п. 2.1'),
(275,'частный','ОП',2,'п. 4.1'),
(276,'частный','ОП',2,'п. 2.1'),
(277,'частный','ОП',2,'п. 4.1'),
(278,'частный','ОП',2,'п. 2.1'),
(279,'частный','ОП',2,'п. 4.1'),
(280,'частный','ОП',2,'п. 2.1'),
(409,'частный','ОП',2,'п. 1.1'),
(410,'частный','ОП',2,'п. 3.1'),
(411,'частный','ОП',2,'п. 8.1'),
(412,'частный','ОП',2,'п. 4.1'),
(413,'частный','ОП',2,'п. 2.1'),
(414,'частный','ОП',2,'п. 7.1'),
(415,'частный','ОП',2,'п. 6.1'),
(416,'частный','ОП',2,'п. 5.1'),
(701,'частный','ОП',2,'п. 7.1'),
(702,'частный','ОП',2,'п. 6.1'),
(703,'частный','ОП',2,'п. 5.1'),
(751,'частный','ОП',2,'п. 7.1'),
(752,'частный','ОП',2,'п. 6.1'),
(753,'частный','ОП',2,'п. 5.1'),
(754,'частный','ОП',2,'п. 7.1'),
(755,'частный','ОП',2,'п. 6.1'),
(756,'частный','ОП',2,'п. 5.1'),
(757,'частный','ОП',2,'п. 7.1'),
(758,'частный','ОП',2,'п. 6.1'),
(759,'частный','ОП',2,'п. 5.1'),
(760,'частный','ОП',2,'п. 7.1'),
(761,'частный','ОП',2,'п. 6.1'),
(762,'частный','ОП',2,'п. 5.1'),
(763,'частный','ОП',2,'п. 7.1'),
(764,'частный','ОП',2,'п. 6.1'),
(765,'частный','ОП',2,'п. 5.1'),
(766,'частный','ОП',2,'п. 7.1'),
(767,'частный','ОП',2,'п. 6.1'),
(768,'частный','ОП',2,'п. 5.1'),
(417,'частный','ОП',3,'п. 1.1'),
(418,'частный','ОП',3,'п. 3.1'),
(419,'частный','ОП',3,'п. 8.1'),
(420,'частный','ОП',3,'п. 4.1'),
(421,'частный','ОП',3,'п. 2.1'),
(422,'частный','ОП',3,'п. 7.1'),
(423,'частный','ОП',3,'п. 6.1'),
(424,'частный','ОП',3,'п. 5.1'),
(601,'частный','ОП',3,'п. 1.1'),
(602,'частный','ОП',3,'п. 3.1'),
(603,'частный','ОП',3,'п. 8.1'),
(604,'частный','ОП',3,'п. 4.1'),
(605,'частный','ОП',3,'п. 2.1'),
(651,'частный','ОП',3,'п. 1.1'),
(652,'частный','ОП',3,'п. 3.1'),
(653,'частный','ОП',3,'п. 8.1'),
(654,'частный','ОП',3,'п. 1.1'),
(655,'частный','ОП',3,'п. 3.1'),
(656,'частный','ОП',3,'п. 8.1'),
(657,'частный','ОП',3,'п. 1.1'),
(658,'частный','ОП',3,'п. 3.1'),
(659,'частный','ОП',3,'п. 8.1'),
(660,'частный','ОП',3,'п. 1.1'),
(661,'частный','ОП',3,'п. 3.1'),
(662,'частный','ОП',3,'п. 8.1'),
(663,'частный','ОП',3,'п. 1.1'),
(664,'частный','ОП',3,'п. 3.1'),
(665,'частный','ОП',3,'п. 8.1'),
(666,'частный','ОП',3,'п. 1.1'),
(667,'частный','ОП',3,'п. 3.1'),
(668,'частный','ОП',3,'п. 8.1'),
(669,'частный','ОП',3,'п. 4.1'),
(670,'частный','ОП',3,'п. 2.1'),
(671,'частный','ОП',3,'п. 4.1'),
(672,'частный','ОП',3,'п. 2.1'),
(673,'частный','ОП',3,'п. 4.1'),
(674,'частный','ОП',3,'п. 2.1'),
(675,'частный','ОП',3,'п. 4.1'),
(676,'частный','ОП',3,'п. 2.1'),
(677,'частный','ОП',3,'п. 4.1'),
(678,'частный','ОП',3,'п. 2.1'),
(679,'частный','ОП',3,'п. 4.1'),
(680,'частный','ОП',3,'п. 2.1'),
(801,'частный','ОП',3,'п. 7.1'),
(802,'частный','ОП',3,'п. 6.1'),
(803,'частный','ОП',3,'п. 5.1'),
(851,'частный','ОП',3,'п. 7.1'),
(852,'частный','ОП',3,'п. 6.1'),
(853,'частный','ОП',3,'п. 5.1'),
(854,'частный','ОП',3,'п. 7.1'),
(855,'частный','ОП',3,'п. 6.1'),
(856,'частный','ОП',3,'п. 5.1'),
(857,'частный','ОП',3,'п. 7.1'),
(858,'частный','ОП',3,'п. 6.1'),
(859,'частный','ОП',3,'п. 5.1'),
(860,'частный','ОП',3,'п. 7.1'),
(861,'частный','ОП',3,'п. 6.1'),
(862,'частный','ОП',3,'п. 5.1'),
(863,'частный','ОП',3,'п. 7.1'),
(864,'частный','ОП',3,'п. 6.1'),
(865,'частный','ОП',3,'п. 5.1'),
(866,'частный','ОП',3,'п. 7.1'),
(867,'частный','ОП',3,'п. 6.1'),
(868,'частный','ОП',3,'п. 5.1'),
(197,'частный','ОП',1,'не заполняется'),
(199,'частный','ОП',1,'не заполняется'),
(297,'частный','ОП',2,'не заполняется'),
(697,'частный','ОП',3,'не заполняется'),
(146,'частный','ОП',1,'не заполняется'),
(191,'частный','ОП',1,'не заполняется'),
(192,'частный','ОП',1,'не заполняется'),
(193,'частный','ОП',1,'не заполняется'),
(194,'частный','ОП',1,'не заполняется'),
(546,'частный','ОП',1,'не заполняется'),
(591,'частный','ОП',1,'не заполняется'),
(592,'частный','ОП',1,'не заполняется'),
(593,'частный','ОП',1,'не заполняется'),
(594,'частный','ОП',1,'не заполняется'),
(101,'частный','не ОП',1,'п. 1.1'),
(102,'частный','не ОП',1,'п. 3.1'),
(103,'частный','не ОП',1,'п. 8.1'),
(104,'частный','не ОП',1,'п. 4.2'),
(105,'частный','не ОП',1,'п. 2.2'),
(151,'частный','не ОП',1,'п. 1.1'),
(152,'частный','не ОП',1,'п. 3.1'),
(153,'частный','не ОП',1,'п. 8.1'),
(154,'частный','не ОП',1,'п. 1.1'),
(155,'частный','не ОП',1,'п. 3.1'),
(156,'частный','не ОП',1,'п. 8.1'),
(157,'частный','не ОП',1,'п. 1.1'),
(158,'частный','не ОП',1,'п. 3.1'),
(159,'частный','не ОП',1,'п. 8.1'),
(160,'частный','не ОП',1,'п. 1.1'),
(161,'частный','не ОП',1,'п. 3.1'),
(162,'частный','не ОП',1,'п. 8.1'),
(163,'частный','не ОП',1,'п. 1.1'),
(164,'частный','не ОП',1,'п. 3.1'),
(165,'частный','не ОП',1,'п. 8.1'),
(166,'частный','не ОП',1,'п. 1.1'),
(167,'частный','не ОП',1,'п. 3.1'),
(168,'частный','не ОП',1,'п. 8.1'),
(169,'частный','не ОП',1,'п. 4.2'),
(170,'частный','не ОП',1,'п. 2.2'),
(171,'частный','не ОП',1,'п. 4.2'),
(172,'частный','не ОП',1,'п. 2.2'),
(173,'частный','не ОП',1,'п. 4.2'),
(174,'частный','не ОП',1,'п. 2.2'),
(175,'частный','не ОП',1,'п. 4.2'),
(176,'частный','не ОП',1,'п. 2.2'),
(177,'частный','не ОП',1,'п. 4.2'),
(178,'частный','не ОП',1,'п. 2.2'),
(179,'частный','не ОП',1,'п. 4.2'),
(180,'частный','не ОП',1,'п. 2.2'),
(401,'частный','не ОП',1,'п. 1.1'),
(402,'частный','не ОП',1,'п. 3.1'),
(403,'частный','не ОП',1,'п. 8.1'),
(404,'частный','не ОП',1,'п. 4.2'),
(405,'частный','не ОП',1,'п. 2.2'),
(406,'частный','не ОП',1,'п. 7.2'),
(407,'частный','не ОП',1,'п. 6.1'),
(408,'частный','не ОП',1,'п. 5.2'),
(501,'частный','не ОП',1,'п. 7.2'),
(502,'частный','не ОП',1,'п. 6.1'),
(503,'частный','не ОП',1,'п. 5.2'),
(551,'частный','не ОП',1,'п. 7.2'),
(552,'частный','не ОП',1,'п. 6.1'),
(553,'частный','не ОП',1,'п. 5.2'),
(554,'частный','не ОП',1,'п. 7.2'),
(555,'частный','не ОП',1,'п. 6.1'),
(556,'частный','не ОП',1,'п. 5.2'),
(557,'частный','не ОП',1,'п. 7.2'),
(558,'частный','не ОП',1,'п. 6.1'),
(559,'частный','не ОП',1,'п. 5.2'),
(560,'частный','не ОП',1,'п. 7.2'),
(561,'частный','не ОП',1,'п. 6.1'),
(562,'частный','не ОП',1,'п. 5.2'),
(563,'частный','не ОП',1,'п. 7.2'),
(564,'частный','не ОП',1,'п. 6.1'),
(565,'частный','не ОП',1,'п. 5.2'),
(566,'частный','не ОП',1,'п. 7.2'),
(567,'частный','не ОП',1,'п. 6.1'),
(568,'частный','не ОП',1,'п. 5.2'),
(201,'частный','не ОП',2,'п. 1.1'),
(202,'частный','не ОП',2,'п. 3.1'),
(203,'частный','не ОП',2,'п. 8.1'),
(204,'частный','не ОП',2,'п. 4.2'),
(205,'частный','не ОП',2,'п. 2.2'),
(251,'частный','не ОП',2,'п. 1.1'),
(252,'частный','не ОП',2,'п. 3.1'),
(253,'частный','не ОП',2,'п. 8.1'),
(254,'частный','не ОП',2,'п. 1.1'),
(255,'частный','не ОП',2,'п. 3.1'),
(256,'частный','не ОП',2,'п. 8.1'),
(257,'частный','не ОП',2,'п. 1.1'),
(258,'частный','не ОП',2,'п. 3.1'),
(259,'частный','не ОП',2,'п. 8.1'),
(260,'частный','не ОП',2,'п. 1.1'),
(261,'частный','не ОП',2,'п. 3.1'),
(262,'частный','не ОП',2,'п. 8.1'),
(263,'частный','не ОП',2,'п. 1.1'),
(264,'частный','не ОП',2,'п. 3.1'),
(265,'частный','не ОП',2,'п. 8.1'),
(266,'частный','не ОП',2,'п. 1.1'),
(267,'частный','не ОП',2,'п. 3.1'),
(268,'частный','не ОП',2,'п. 8.1'),
(269,'частный','не ОП',2,'п. 4.2'),
(270,'частный','не ОП',2,'п. 2.2'),
(271,'частный','не ОП',2,'п. 4.2'),
(272,'частный','не ОП',2,'п. 2.2'),
(273,'частный','не ОП',2,'п. 4.2'),
(274,'частный','не ОП',2,'п. 2.2'),
(275,'частный','не ОП',2,'п. 4.2'),
(276,'частный','не ОП',2,'п. 2.2'),
(277,'частный','не ОП',2,'п. 4.2'),
(278,'частный','не ОП',2,'п. 2.2'),
(279,'частный','не ОП',2,'п. 4.2'),
(280,'частный','не ОП',2,'п. 2.2'),
(409,'частный','не ОП',2,'п. 1.1'),
(410,'частный','не ОП',2,'п. 3.1'),
(411,'частный','не ОП',2,'п. 8.1'),
(412,'частный','не ОП',2,'п. 4.2'),
(413,'частный','не ОП',2,'п. 2.2'),
(414,'частный','не ОП',2,'п. 7.2'),
(415,'частный','не ОП',2,'п. 6.1'),
(416,'частный','не ОП',2,'п. 5.2'),
(701,'частный','не ОП',2,'п. 7.2'),
(702,'частный','не ОП',2,'п. 6.1'),
(703,'частный','не ОП',2,'п. 5.2'),
(751,'частный','не ОП',2,'п. 7.2'),
(752,'частный','не ОП',2,'п. 6.1'),
(753,'частный','не ОП',2,'п. 5.2'),
(754,'частный','не ОП',2,'п. 7.2'),
(755,'частный','не ОП',2,'п. 6.1'),
(756,'частный','не ОП',2,'п. 5.2'),
(757,'частный','не ОП',2,'п. 7.2'),
(758,'частный','не ОП',2,'п. 6.1'),
(759,'частный','не ОП',2,'п. 5.2'),
(760,'частный','не ОП',2,'п. 7.2'),
(761,'частный','не ОП',2,'п. 6.1'),
(762,'частный','не ОП',2,'п. 5.2'),
(763,'частный','не ОП',2,'п. 7.2'),
(764,'частный','не ОП',2,'п. 6.1'),
(765,'частный','не ОП',2,'п. 5.2'),
(766,'частный','не ОП',2,'п. 7.2'),
(767,'частный','не ОП',2,'п. 6.1'),
(768,'частный','не ОП',2,'п. 5.2'),
(417,'частный','не ОП',3,'п. 1.1'),
(418,'частный','не ОП',3,'п. 3.1'),
(419,'частный','не ОП',3,'п. 8.1'),
(420,'частный','не ОП',3,'п. 4.2'),
(421,'частный','не ОП',3,'п. 2.2'),
(422,'частный','не ОП',3,'п. 7.2'),
(423,'частный','не ОП',3,'п. 6.1'),
(424,'частный','не ОП',3,'п. 5.2'),
(601,'частный','не ОП',3,'п. 1.1'),
(602,'частный','не ОП',3,'п. 3.1'),
(603,'частный','не ОП',3,'п. 8.1'),
(604,'частный','не ОП',3,'п. 4.2'),
(605,'частный','не ОП',3,'п. 2.2'),
(651,'частный','не ОП',3,'п. 1.1'),
(652,'частный','не ОП',3,'п. 3.1'),
(653,'частный','не ОП',3,'п. 8.1'),
(654,'частный','не ОП',3,'п. 1.1'),
(655,'частный','не ОП',3,'п. 3.1'),
(656,'частный','не ОП',3,'п. 8.1'),
(657,'частный','не ОП',3,'п. 1.1'),
(658,'частный','не ОП',3,'п. 3.1'),
(659,'частный','не ОП',3,'п. 8.1'),
(660,'частный','не ОП',3,'п. 1.1'),
(661,'частный','не ОП',3,'п. 3.1'),
(662,'частный','не ОП',3,'п. 8.1'),
(663,'частный','не ОП',3,'п. 1.1'),
(664,'частный','не ОП',3,'п. 3.1'),
(665,'частный','не ОП',3,'п. 8.1'),
(666,'частный','не ОП',3,'п. 1.1'),
(667,'частный','не ОП',3,'п. 3.1'),
(668,'частный','не ОП',3,'п. 8.1'),
(669,'частный','не ОП',3,'п. 4.2'),
(670,'частный','не ОП',3,'п. 2.2'),
(671,'частный','не ОП',3,'п. 4.2'),
(672,'частный','не ОП',3,'п. 2.2'),
(673,'частный','не ОП',3,'п. 4.2'),
(674,'частный','не ОП',3,'п. 2.2'),
(675,'частный','не ОП',3,'п. 4.2'),
(676,'частный','не ОП',3,'п. 2.2'),
(677,'частный','не ОП',3,'п. 4.2'),
(678,'частный','не ОП',3,'п. 2.2'),
(679,'частный','не ОП',3,'п. 4.2'),
(680,'частный','не ОП',3,'п. 2.2'),
(801,'частный','не ОП',3,'п. 7.2'),
(802,'частный','не ОП',3,'п. 6.1'),
(803,'частный','не ОП',3,'п. 5.2'),
(851,'частный','не ОП',3,'п. 7.2'),
(852,'частный','не ОП',3,'п. 6.1'),
(853,'частный','не ОП',3,'п. 5.2'),
(854,'частный','не ОП',3,'п. 7.2'),
(855,'частный','не ОП',3,'п. 6.1'),
(856,'частный','не ОП',3,'п. 5.2'),
(857,'частный','не ОП',3,'п. 7.2'),
(858,'частный','не ОП',3,'п. 6.1'),
(859,'частный','не ОП',3,'п. 5.2'),
(860,'частный','не ОП',3,'п. 7.2'),
(861,'частный','не ОП',3,'п. 6.1'),
(862,'частный','не ОП',3,'п. 5.2'),
(863,'частный','не ОП',3,'п. 7.2'),
(864,'частный','не ОП',3,'п. 6.1'),
(865,'частный','не ОП',3,'п. 5.2'),
(866,'частный','не ОП',3,'п. 7.2'),
(867,'частный','не ОП',3,'п. 6.1'),
(868,'частный','не ОП',3,'п. 5.2'),
(197,'частный','не ОП',1,'не заполняется'),
(199,'частный','не ОП',1,'не заполняется'),
(297,'частный','не ОП',1,'не заполняется'),
(697,'частный','не ОП',1,'не заполняется'),
(146,'частный','не ОП',1,'не заполняется'),
(191,'частный','не ОП',1,'не заполняется'),
(192,'частный','не ОП',1,'не заполняется'),
(193,'частный','не ОП',1,'не заполняется'),
(194,'частный','не ОП',1,'не заполняется'),
(546,'частный','не ОП',1,'не заполняется'),
(591,'частный','не ОП',1,'не заполняется'),
(592,'частный','не ОП',1,'не заполняется'),
(593,'частный','не ОП',1,'не заполняется'),
(594,'частный','не ОП',1,'не заполняется'),
(101,'МКД','ОП',1,'п. 1.4'),
(102,'МКД','ОП',1,'п. 3.2'),
(103,'МКД','ОП',1,'п. 8.2'),
(104,'МКД','ОП',1,'п. 4.3'),
(105,'МКД','ОП',1,'п. 2.3'),
(151,'МКД','ОП',1,'п. 1.4'),
(152,'МКД','ОП',1,'п. 3.2'),
(153,'МКД','ОП',1,'п. 8.2'),
(154,'МКД','ОП',1,'п. 1.4'),
(155,'МКД','ОП',1,'п. 3.2'),
(156,'МКД','ОП',1,'п. 8.2'),
(157,'МКД','ОП',1,'п. 1.4'),
(158,'МКД','ОП',1,'п. 3.2'),
(159,'МКД','ОП',1,'п. 8.2'),
(160,'МКД','ОП',1,'п. 1.4'),
(161,'МКД','ОП',1,'п. 3.2'),
(162,'МКД','ОП',1,'п. 8.2'),
(163,'МКД','ОП',1,'п. 1.4'),
(164,'МКД','ОП',1,'п. 3.2'),
(165,'МКД','ОП',1,'п. 8.2'),
(166,'МКД','ОП',1,'п. 1.4'),
(167,'МКД','ОП',1,'п. 3.2'),
(168,'МКД','ОП',1,'п. 8.2'),
(169,'МКД','ОП',1,'п. 4.3'),
(170,'МКД','ОП',1,'п. 2.3'),
(171,'МКД','ОП',1,'п. 4.3'),
(172,'МКД','ОП',1,'п. 2.3'),
(173,'МКД','ОП',1,'п. 4.3'),
(174,'МКД','ОП',1,'п. 2.3'),
(175,'МКД','ОП',1,'п. 4.3'),
(176,'МКД','ОП',1,'п. 2.3'),
(177,'МКД','ОП',1,'п. 4.3'),
(178,'МКД','ОП',1,'п. 2.3'),
(179,'МКД','ОП',1,'п. 4.3'),
(180,'МКД','ОП',1,'п. 2.3'),
(401,'МКД','ОП',1,'п. 1.4'),
(402,'МКД','ОП',1,'п. 3.2'),
(403,'МКД','ОП',1,'п. 8.2'),
(404,'МКД','ОП',1,'п. 4.3'),
(405,'МКД','ОП',1,'п. 2.3'),
(406,'МКД','ОП',1,'п. 7.3'),
(407,'МКД','ОП',1,'п. 6.2'),
(408,'МКД','ОП',1,'п. 5.3'),
(501,'МКД','ОП',1,'п. 7.3'),
(502,'МКД','ОП',1,'п. 6.2'),
(503,'МКД','ОП',1,'п. 5.3'),
(551,'МКД','ОП',1,'п. 7.3'),
(552,'МКД','ОП',1,'п. 6.2'),
(553,'МКД','ОП',1,'п. 5.3'),
(554,'МКД','ОП',1,'п. 7.3'),
(555,'МКД','ОП',1,'п. 6.2'),
(556,'МКД','ОП',1,'п. 5.3'),
(557,'МКД','ОП',1,'п. 7.3'),
(558,'МКД','ОП',1,'п. 6.2'),
(559,'МКД','ОП',1,'п. 5.3'),
(560,'МКД','ОП',1,'п. 7.3'),
(561,'МКД','ОП',1,'п. 6.2'),
(562,'МКД','ОП',1,'п. 5.3'),
(563,'МКД','ОП',1,'п. 7.3'),
(564,'МКД','ОП',1,'п. 6.2'),
(565,'МКД','ОП',1,'п. 5.3'),
(566,'МКД','ОП',1,'п. 7.3'),
(567,'МКД','ОП',1,'п. 6.2'),
(568,'МКД','ОП',1,'п. 5.3'),
(201,'МКД','ОП',2,'п. 1.4'),
(202,'МКД','ОП',2,'п. 3.2'),
(203,'МКД','ОП',2,'п. 8.2'),
(204,'МКД','ОП',2,'п. 4.3'),
(205,'МКД','ОП',2,'п. 2.3'),
(251,'МКД','ОП',2,'п. 1.4'),
(252,'МКД','ОП',2,'п. 3.2'),
(253,'МКД','ОП',2,'п. 8.2'),
(254,'МКД','ОП',2,'п. 1.4'),
(255,'МКД','ОП',2,'п. 3.2'),
(256,'МКД','ОП',2,'п. 8.2'),
(257,'МКД','ОП',2,'п. 1.4'),
(258,'МКД','ОП',2,'п. 3.2'),
(259,'МКД','ОП',2,'п. 8.2'),
(260,'МКД','ОП',2,'п. 1.4'),
(261,'МКД','ОП',2,'п. 3.2'),
(262,'МКД','ОП',2,'п. 8.2'),
(263,'МКД','ОП',2,'п. 1.4'),
(264,'МКД','ОП',2,'п. 3.2'),
(265,'МКД','ОП',2,'п. 8.2'),
(266,'МКД','ОП',2,'п. 1.4'),
(267,'МКД','ОП',2,'п. 3.2'),
(268,'МКД','ОП',2,'п. 8.2'),
(269,'МКД','ОП',2,'п. 4.3'),
(270,'МКД','ОП',2,'п. 2.3'),
(271,'МКД','ОП',2,'п. 4.3'),
(272,'МКД','ОП',2,'п. 2.3'),
(273,'МКД','ОП',2,'п. 4.3'),
(274,'МКД','ОП',2,'п. 2.3'),
(275,'МКД','ОП',2,'п. 4.3'),
(276,'МКД','ОП',2,'п. 2.3'),
(277,'МКД','ОП',2,'п. 4.3'),
(278,'МКД','ОП',2,'п. 2.3'),
(279,'МКД','ОП',2,'п. 4.3'),
(280,'МКД','ОП',2,'п. 2.3'),
(409,'МКД','ОП',2,'п. 1.4'),
(410,'МКД','ОП',2,'п. 3.2'),
(411,'МКД','ОП',2,'п. 8.2'),
(412,'МКД','ОП',2,'п. 4.3'),
(413,'МКД','ОП',2,'п. 2.3'),
(414,'МКД','ОП',2,'п. 7.3'),
(415,'МКД','ОП',2,'п. 6.2'),
(416,'МКД','ОП',2,'п. 5.3'),
(701,'МКД','ОП',2,'п. 7.3'),
(702,'МКД','ОП',2,'п. 6.2'),
(703,'МКД','ОП',2,'п. 5.3'),
(751,'МКД','ОП',2,'п. 7.3'),
(752,'МКД','ОП',2,'п. 6.2'),
(753,'МКД','ОП',2,'п. 5.3'),
(754,'МКД','ОП',2,'п. 7.3'),
(755,'МКД','ОП',2,'п. 6.2'),
(756,'МКД','ОП',2,'п. 5.3'),
(757,'МКД','ОП',2,'п. 7.3'),
(758,'МКД','ОП',2,'п. 6.2'),
(759,'МКД','ОП',2,'п. 5.3'),
(760,'МКД','ОП',2,'п. 7.3'),
(761,'МКД','ОП',2,'п. 6.2'),
(762,'МКД','ОП',2,'п. 5.3'),
(763,'МКД','ОП',2,'п. 7.3'),
(764,'МКД','ОП',2,'п. 6.2'),
(765,'МКД','ОП',2,'п. 5.3'),
(766,'МКД','ОП',2,'п. 7.3'),
(767,'МКД','ОП',2,'п. 6.2'),
(768,'МКД','ОП',2,'п. 5.3'),
(417,'МКД','ОП',3,'п. 1.4'),
(418,'МКД','ОП',3,'п. 3.2'),
(419,'МКД','ОП',3,'п. 8.2'),
(420,'МКД','ОП',3,'п. 4.3'),
(421,'МКД','ОП',3,'п. 2.3'),
(422,'МКД','ОП',3,'п. 7.3'),
(423,'МКД','ОП',3,'п. 6.2'),
(424,'МКД','ОП',3,'п. 5.3'),
(601,'МКД','ОП',3,'п. 1.4'),
(602,'МКД','ОП',3,'п. 3.2'),
(603,'МКД','ОП',3,'п. 8.2'),
(604,'МКД','ОП',3,'п. 4.3'),
(605,'МКД','ОП',3,'п. 2.3'),
(651,'МКД','ОП',3,'п. 1.4'),
(652,'МКД','ОП',3,'п. 3.2'),
(653,'МКД','ОП',3,'п. 8.2'),
(654,'МКД','ОП',3,'п. 1.4'),
(655,'МКД','ОП',3,'п. 3.2'),
(656,'МКД','ОП',3,'п. 8.2'),
(657,'МКД','ОП',3,'п. 1.4'),
(658,'МКД','ОП',3,'п. 3.2'),
(659,'МКД','ОП',3,'п. 8.2'),
(660,'МКД','ОП',3,'п. 1.4'),
(661,'МКД','ОП',3,'п. 3.2'),
(662,'МКД','ОП',3,'п. 8.2'),
(663,'МКД','ОП',3,'п. 1.4'),
(664,'МКД','ОП',3,'п. 3.2'),
(665,'МКД','ОП',3,'п. 8.2'),
(666,'МКД','ОП',3,'п. 1.4'),
(667,'МКД','ОП',3,'п. 3.2'),
(668,'МКД','ОП',3,'п. 8.2'),
(669,'МКД','ОП',3,'п. 4.3'),
(670,'МКД','ОП',3,'п. 2.3'),
(671,'МКД','ОП',3,'п. 4.3'),
(672,'МКД','ОП',3,'п. 2.3'),
(673,'МКД','ОП',3,'п. 4.3'),
(674,'МКД','ОП',3,'п. 2.3'),
(675,'МКД','ОП',3,'п. 4.3'),
(676,'МКД','ОП',3,'п. 2.3'),
(677,'МКД','ОП',3,'п. 4.3'),
(678,'МКД','ОП',3,'п. 2.3'),
(679,'МКД','ОП',3,'п. 4.3'),
(680,'МКД','ОП',3,'п. 2.3'),
(801,'МКД','ОП',3,'п. 7.3'),
(802,'МКД','ОП',3,'п. 6.2'),
(803,'МКД','ОП',3,'п. 5.3'),
(851,'МКД','ОП',3,'п. 7.3'),
(852,'МКД','ОП',3,'п. 6.2'),
(853,'МКД','ОП',3,'п. 5.3'),
(854,'МКД','ОП',3,'п. 7.3'),
(855,'МКД','ОП',3,'п. 6.2'),
(856,'МКД','ОП',3,'п. 5.3'),
(857,'МКД','ОП',3,'п. 7.3'),
(858,'МКД','ОП',3,'п. 6.2'),
(859,'МКД','ОП',3,'п. 5.3'),
(860,'МКД','ОП',3,'п. 7.3'),
(861,'МКД','ОП',3,'п. 6.2'),
(862,'МКД','ОП',3,'п. 5.3'),
(863,'МКД','ОП',3,'п. 7.3'),
(864,'МКД','ОП',3,'п. 6.2'),
(865,'МКД','ОП',3,'п. 5.3'),
(866,'МКД','ОП',3,'п. 7.3'),
(867,'МКД','ОП',3,'п. 6.2'),
(868,'МКД','ОП',3,'п. 5.3'),
(197,'МКД','ОП',1,'не заполняется'),
(199,'МКД','ОП',1,'не заполняется'),
(297,'МКД','ОП',2,'не заполняется'),
(697,'МКД','ОП',3,'не заполняется'),
(146,'МКД','ОП',1,'не заполняется'),
(191,'МКД','ОП',1,'не заполняется'),
(192,'МКД','ОП',1,'не заполняется'),
(193,'МКД','ОП',1,'не заполняется'),
(194,'МКД','ОП',1,'не заполняется'),
(546,'МКД','ОП',1,'не заполняется'),
(591,'МКД','ОП',1,'не заполняется'),
(592,'МКД','ОП',1,'не заполняется'),
(593,'МКД','ОП',1,'не заполняется'),
(594,'МКД','ОП',1,'не заполняется'),
(101,'МКД','не ОП',1,'п. 1.4'),
(102,'МКД','не ОП',1,'п. 3.2'),
(103,'МКД','не ОП',1,'п. 8.2'),
(104,'МКД','не ОП',1,'п. 4.6'),
(105,'МКД','не ОП',1,'п. 2.6'),
(151,'МКД','не ОП',1,'п. 1.4'),
(152,'МКД','не ОП',1,'п. 3.2'),
(153,'МКД','не ОП',1,'п. 8.2'),
(154,'МКД','не ОП',1,'п. 1.4'),
(155,'МКД','не ОП',1,'п. 3.2'),
(156,'МКД','не ОП',1,'п. 8.2'),
(157,'МКД','не ОП',1,'п. 1.4'),
(158,'МКД','не ОП',1,'п. 3.2'),
(159,'МКД','не ОП',1,'п. 8.2'),
(160,'МКД','не ОП',1,'п. 1.4'),
(161,'МКД','не ОП',1,'п. 3.2'),
(162,'МКД','не ОП',1,'п. 8.2'),
(163,'МКД','не ОП',1,'п. 1.4'),
(164,'МКД','не ОП',1,'п. 3.2'),
(165,'МКД','не ОП',1,'п. 8.2'),
(166,'МКД','не ОП',1,'п. 1.4'),
(167,'МКД','не ОП',1,'п. 3.2'),
(168,'МКД','не ОП',1,'п. 8.2'),
(169,'МКД','не ОП',1,'п. 4.6'),
(170,'МКД','не ОП',1,'п. 2.6'),
(171,'МКД','не ОП',1,'п. 4.6'),
(172,'МКД','не ОП',1,'п. 2.6'),
(173,'МКД','не ОП',1,'п. 4.6'),
(174,'МКД','не ОП',1,'п. 2.6'),
(175,'МКД','не ОП',1,'п. 4.6'),
(176,'МКД','не ОП',1,'п. 2.6'),
(177,'МКД','не ОП',1,'п. 4.6'),
(178,'МКД','не ОП',1,'п. 2.6'),
(179,'МКД','не ОП',1,'п. 4.6'),
(180,'МКД','не ОП',1,'п. 2.6'),
(401,'МКД','не ОП',1,'п. 1.4'),
(402,'МКД','не ОП',1,'п. 3.2'),
(403,'МКД','не ОП',1,'п. 8.2'),
(404,'МКД','не ОП',1,'п. 4.6'),
(405,'МКД','не ОП',1,'п. 2.6'),
(406,'МКД','не ОП',1,'п. 7.6'),
(407,'МКД','не ОП',1,'п. 6.2'),
(408,'МКД','не ОП',1,'п. 5.6'),
(501,'МКД','не ОП',1,'п. 7.6'),
(502,'МКД','не ОП',1,'п. 6.2'),
(503,'МКД','не ОП',1,'п. 5.6'),
(551,'МКД','не ОП',1,'п. 7.6'),
(552,'МКД','не ОП',1,'п. 6.2'),
(553,'МКД','не ОП',1,'п. 5.6'),
(554,'МКД','не ОП',1,'п. 7.6'),
(555,'МКД','не ОП',1,'п. 6.2'),
(556,'МКД','не ОП',1,'п. 5.6'),
(557,'МКД','не ОП',1,'п. 7.6'),
(558,'МКД','не ОП',1,'п. 6.2'),
(559,'МКД','не ОП',1,'п. 5.6'),
(560,'МКД','не ОП',1,'п. 7.6'),
(561,'МКД','не ОП',1,'п. 6.2'),
(562,'МКД','не ОП',1,'п. 5.6'),
(563,'МКД','не ОП',1,'п. 7.6'),
(564,'МКД','не ОП',1,'п. 6.2'),
(565,'МКД','не ОП',1,'п. 5.6'),
(566,'МКД','не ОП',1,'п. 7.6'),
(567,'МКД','не ОП',1,'п. 6.2'),
(568,'МКД','не ОП',1,'п. 5.6'),
(201,'МКД','не ОП',2,'п. 1.4'),
(202,'МКД','не ОП',2,'п. 3.2'),
(203,'МКД','не ОП',2,'п. 8.2'),
(204,'МКД','не ОП',2,'п. 4.6'),
(205,'МКД','не ОП',2,'п. 2.6'),
(251,'МКД','не ОП',2,'п. 1.4'),
(252,'МКД','не ОП',2,'п. 3.2'),
(253,'МКД','не ОП',2,'п. 8.2'),
(254,'МКД','не ОП',2,'п. 1.4'),
(255,'МКД','не ОП',2,'п. 3.2'),
(256,'МКД','не ОП',2,'п. 8.2'),
(257,'МКД','не ОП',2,'п. 1.4'),
(258,'МКД','не ОП',2,'п. 3.2'),
(259,'МКД','не ОП',2,'п. 8.2'),
(260,'МКД','не ОП',2,'п. 1.4'),
(261,'МКД','не ОП',2,'п. 3.2'),
(262,'МКД','не ОП',2,'п. 8.2'),
(263,'МКД','не ОП',2,'п. 1.4'),
(264,'МКД','не ОП',2,'п. 3.2'),
(265,'МКД','не ОП',2,'п. 8.2'),
(266,'МКД','не ОП',2,'п. 1.4'),
(267,'МКД','не ОП',2,'п. 3.2'),
(268,'МКД','не ОП',2,'п. 8.2'),
(269,'МКД','не ОП',2,'п. 4.6'),
(270,'МКД','не ОП',2,'п. 2.6'),
(271,'МКД','не ОП',2,'п. 4.6'),
(272,'МКД','не ОП',2,'п. 2.6'),
(273,'МКД','не ОП',2,'п. 4.6'),
(274,'МКД','не ОП',2,'п. 2.6'),
(275,'МКД','не ОП',2,'п. 4.6'),
(276,'МКД','не ОП',2,'п. 2.6'),
(277,'МКД','не ОП',2,'п. 4.6'),
(278,'МКД','не ОП',2,'п. 2.6'),
(279,'МКД','не ОП',2,'п. 4.6'),
(280,'МКД','не ОП',2,'п. 2.6'),
(409,'МКД','не ОП',2,'п. 1.4'),
(410,'МКД','не ОП',2,'п. 3.2'),
(411,'МКД','не ОП',2,'п. 8.2'),
(412,'МКД','не ОП',2,'п. 4.6'),
(413,'МКД','не ОП',2,'п. 2.6'),
(414,'МКД','не ОП',2,'п. 7.6'),
(415,'МКД','не ОП',2,'п. 6.2'),
(416,'МКД','не ОП',2,'п. 5.6'),
(701,'МКД','не ОП',2,'п. 7.6'),
(702,'МКД','не ОП',2,'п. 6.2'),
(703,'МКД','не ОП',2,'п. 5.6'),
(751,'МКД','не ОП',2,'п. 7.6'),
(752,'МКД','не ОП',2,'п. 6.2'),
(753,'МКД','не ОП',2,'п. 5.6'),
(754,'МКД','не ОП',2,'п. 7.6'),
(755,'МКД','не ОП',2,'п. 6.2'),
(756,'МКД','не ОП',2,'п. 5.6'),
(757,'МКД','не ОП',2,'п. 7.6'),
(758,'МКД','не ОП',2,'п. 6.2'),
(759,'МКД','не ОП',2,'п. 5.6'),
(760,'МКД','не ОП',2,'п. 7.6'),
(761,'МКД','не ОП',2,'п. 6.2'),
(762,'МКД','не ОП',2,'п. 5.6'),
(763,'МКД','не ОП',2,'п. 7.6'),
(764,'МКД','не ОП',2,'п. 6.2'),
(765,'МКД','не ОП',2,'п. 5.6'),
(766,'МКД','не ОП',2,'п. 7.6'),
(767,'МКД','не ОП',2,'п. 6.2'),
(768,'МКД','не ОП',2,'п. 5.6'),
(417,'МКД','не ОП',3,'п. 1.4'),
(418,'МКД','не ОП',3,'п. 3.2'),
(419,'МКД','не ОП',3,'п. 8.2'),
(420,'МКД','не ОП',3,'п. 4.6'),
(421,'МКД','не ОП',3,'п. 2.6'),
(422,'МКД','не ОП',3,'п. 7.6'),
(423,'МКД','не ОП',3,'п. 6.2'),
(424,'МКД','не ОП',3,'п. 5.6'),
(601,'МКД','не ОП',3,'п. 1.4'),
(602,'МКД','не ОП',3,'п. 3.2'),
(603,'МКД','не ОП',3,'п. 8.2'),
(604,'МКД','не ОП',3,'п. 4.6'),
(605,'МКД','не ОП',3,'п. 2.6'),
(651,'МКД','не ОП',3,'п. 1.4'),
(652,'МКД','не ОП',3,'п. 3.2'),
(653,'МКД','не ОП',3,'п. 8.2'),
(654,'МКД','не ОП',3,'п. 1.4'),
(655,'МКД','не ОП',3,'п. 3.2'),
(656,'МКД','не ОП',3,'п. 8.2'),
(657,'МКД','не ОП',3,'п. 1.4'),
(658,'МКД','не ОП',3,'п. 3.2'),
(659,'МКД','не ОП',3,'п. 8.2'),
(660,'МКД','не ОП',3,'п. 1.4'),
(661,'МКД','не ОП',3,'п. 3.2'),
(662,'МКД','не ОП',3,'п. 8.2'),
(663,'МКД','не ОП',3,'п. 1.4'),
(664,'МКД','не ОП',3,'п. 3.2'),
(665,'МКД','не ОП',3,'п. 8.2'),
(666,'МКД','не ОП',3,'п. 1.4'),
(667,'МКД','не ОП',3,'п. 3.2'),
(668,'МКД','не ОП',3,'п. 8.2'),
(669,'МКД','не ОП',3,'п. 4.6'),
(670,'МКД','не ОП',3,'п. 2.6'),
(671,'МКД','не ОП',3,'п. 4.6'),
(672,'МКД','не ОП',3,'п. 2.6'),
(673,'МКД','не ОП',3,'п. 4.6'),
(674,'МКД','не ОП',3,'п. 2.6'),
(675,'МКД','не ОП',3,'п. 4.6'),
(676,'МКД','не ОП',3,'п. 2.6'),
(677,'МКД','не ОП',3,'п. 4.6'),
(678,'МКД','не ОП',3,'п. 2.6'),
(679,'МКД','не ОП',3,'п. 4.6'),
(680,'МКД','не ОП',3,'п. 2.6'),
(801,'МКД','не ОП',3,'п. 7.6'),
(802,'МКД','не ОП',3,'п. 6.2'),
(803,'МКД','не ОП',3,'п. 5.6'),
(851,'МКД','не ОП',3,'п. 7.6'),
(852,'МКД','не ОП',3,'п. 6.2'),
(853,'МКД','не ОП',3,'п. 5.6'),
(854,'МКД','не ОП',3,'п. 7.6'),
(855,'МКД','не ОП',3,'п. 6.2'),
(856,'МКД','не ОП',3,'п. 5.6'),
(857,'МКД','не ОП',3,'п. 7.6'),
(858,'МКД','не ОП',3,'п. 6.2'),
(859,'МКД','не ОП',3,'п. 5.6'),
(860,'МКД','не ОП',3,'п. 7.6'),
(861,'МКД','не ОП',3,'п. 6.2'),
(862,'МКД','не ОП',3,'п. 5.6'),
(863,'МКД','не ОП',3,'п. 7.6'),
(864,'МКД','не ОП',3,'п. 6.2'),
(865,'МКД','не ОП',3,'п. 5.6'),
(866,'МКД','не ОП',3,'п. 7.6'),
(867,'МКД','не ОП',3,'п. 6.2'),
(868,'МКД','не ОП',3,'п. 5.6'),
(197,'МКД','не ОП',1,'не заполняется'),
(199,'МКД','не ОП',1,'не заполняется'),
(297,'МКД','не ОП',2,'не заполняется'),
(697,'МКД','не ОП',3,'не заполняется'),
(146,'МКД','не ОП',1,'не заполняется'),
(191,'МКД','не ОП',1,'не заполняется'),
(192,'МКД','не ОП',1,'не заполняется'),
(193,'МКД','не ОП',1,'не заполняется'),
(194,'МКД','не ОП',1,'не заполняется'),
(546,'МКД','не ОП',1,'не заполняется'),
(591,'МКД','не ОП',1,'не заполняется'),
(592,'МКД','не ОП',1,'не заполняется'),
(593,'МКД','не ОП',1,'не заполняется'),
(594,'МКД','не ОП',1,'не заполняется');

DECLARE @Date datetime = getDate();

;with data as(
select distinct l.row_id,li.Родитель,
case isnull(ts_ls.Значение,ts.Значение ) 
			when '0' then 'МКД' 			
			when '2' then 'МКД'			
			else 'Частный' end [Тип строения],
case when lgot.Значение is null then 'нет' else 'да' end [Льготник],
row_number() over (partition by li.Потомок order by li.Уровень) rn
from
stack.[Лицевые счета] l 
join stack.[Лицевые иерархия] li on li.Потомок  = l.row_id and li.РодительТип  in (3,12,14,13,1,0)
outer apply
(
select top 1 sv.Значение  
from stack.Свойства sv
JOIN stack.[Виды параметров] vp ON sv.[Виды-Параметры] = vp.ROW_ID AND vp.Название = 'ТИПСТРОЙ'
where sv.[Счет-Параметры] = li.Родитель AND @dn BETWEEN sv.ДатНач AND sv.ДатКнц
order by sv.ДатКнц desc) ts
outer apply
(
select top 1 sv.Значение  
from stack.Свойства sv
JOIN stack.[Виды параметров] vp ON sv.[Виды-Параметры] = vp.ROW_ID AND vp.Название = 'ТИПСТРОЙ'
where sv.[Счет-Параметры] = l.row_id AND @dn BETWEEN sv.ДатНач AND sv.ДатКнц
order by sv.ДатКнц desc) ts_ls
outer apply
(
select top 1 sv.Значение  
from stack.Свойства sv
where sv.[Счет-Параметры] = l.row_id AND @dn BETWEEN sv.ДатНач AND sv.ДатКнц and sv.[Виды-Параметры] = @p1 and sv.Значение = 1 
order by sv.ДатКнц desc) lgot
where l.тип = 5 
)

insert into #ls
select row_id, Родитель, [Тип строения], [Льготник]
from data
where rn = 1

;with data_tarif as(
	--начисление отчетного периода
	select 'ФЛ' БД, nl.[Месяц расчета] Месяц, ls.Номер ЛС,l.privileged,hs.value, l.house_type, nl.[Номер услуги] Услуга,nl.ДоговорУК, nl.Поставщик,
	hs.value heating, s.Диапазон, 
	case when (l.privileged = 'да') or (@reg in (51,67) and org.Наименование not like '%Росатом Энергосбыт%') then 'не заполняется' else s.Строка_таблицы end Строка_таблицы, 
	0 ОбъемПер, 0 СуммаПер,
	case when s.Диапазон = 1 then cast(nl.Объем as numeric (16,2)) else 0 end Объем1,
	case when s.Диапазон = 2 then cast(nl.Объем as numeric (16,2)) else 0 end Объем2,
	case when s.Диапазон = 3 then cast(nl.Объем as numeric (16,2)) else 0 end Объем3,
	case when s.Диапазон = 1 then cast(nl.Сумма as numeric (16,2))  else 0 end Сумма1,
	case when s.Диапазон = 2 then cast(nl.Сумма as numeric (16,2))  else 0 end Сумма2,
	case when s.Диапазон = 3 then cast(nl.Сумма as numeric (16,2))  else 0 end Сумма3
	from stack.НТариф nl
	join #ls l on l.ls_id = nl.Счет
	join #heating_season hs on hs.date = nl.[Месяц расчета]
	join stack.[Лицевые счета] ls on ls.row_id = l.ls_id
	join #service s on s.Услуга = nl.[Номер услуги] and s.Сезон = hs.value and lower(s.ТипСтрой) = lower(l.house_type)
	left join stack.[УК Договоры] ukd on ukd.row_id = nl.ДоговорУК
	left join stack.Организации org on org.row_id = ukd.[Организация-УКДоговор]
	where nl.[Месяц расчета] between @dn and @dk
		
	--перерасчеты отчетного периода
		union all
	select 'ФЛ' БД, nl.[Месяц расчета] Месяц, ls.Номер,l.privileged,hs.value, l.house_type, nl.[Номер услуги] Услуга,nl.ДоговорУК, nl.Поставщик,
	hs.value heating, s.Диапазон, 
	case when (l.privileged = 'да') or (@reg in (51,67) and org.Наименование not like '%Росатом Энергосбыт%') then 'не заполняется' else s.Строка_таблицы end Строка_таблицы, 
	0 ОбъемПер, 0 СуммаПер,
	case when s.Диапазон = 1 then cast(nl.Объем as numeric (16,2)) else 0 end Объем1,
	case when s.Диапазон = 2 then cast(nl.Объем as numeric (16,2)) else 0 end Объем2,
	case when s.Диапазон = 3 then cast(nl.Объем as numeric (16,2)) else 0 end Объем3,
	case when s.Диапазон = 1 then cast(nl.Сумма as numeric (16,2)) else 0 end Сумма1,
	case when s.Диапазон = 2 then cast(nl.Сумма as numeric (16,2)) else 0 end Сумма2,
	case when s.Диапазон = 3 then cast(nl.Сумма as numeric (16,2)) else 0 end Сумма3
	from stack.НПТариф nl
	join #ls l on l.ls_id = nl.Счет
	join #heating_season hs on hs.date = nl.[Месяц расчета]
	join stack.[Лицевые счета] ls on ls.row_id = l.ls_id
	join #service s on s.Услуга = nl.[Номер услуги] and s.Сезон = hs.value and lower(s.ТипСтрой) = lower(l.house_type)
	left join stack.[УК Договоры] ukd on ukd.row_id = nl.ДоговорУК
	left join stack.Организации org on org.row_id = ukd.[Организация-УКДоговор]
	where nl.[Месяц расчета] between @dn and @dk and nl.Перерасчет >= @startOfYear

	--перерасчеты за пределами отчетного периода
		union all
	select 'ФЛ' БД, nl.[Месяц расчета] Месяц, ls.Номер,l.privileged,hs.value, l.house_type, nl.[Номер услуги] Услуга,nl.ДоговорУК, nl.Поставщик,
	hs.value heating, s.Диапазон, 
	case when (l.privileged = 'да') or (@reg in (51,67) and org.Наименование not like '%Росатом Энергосбыт%') then 'не заполняется' else s.Строка_таблицы end Строка_таблицы,
	nl.Объем ОбъемПер, nl.Сумма СуммаПер,
	0 Объем1,
	0 Объем2,
	0 Объем3,
	0 Сумма1,
	0 Сумма2,
	0 Сумма3
	from stack.НПТариф nl
	join #ls l on l.ls_id = nl.Счет
	join #heating_season hs on hs.date = nl.[Месяц расчета]
	join stack.[Лицевые счета] ls on ls.row_id = l.ls_id
	join #service s on s.Услуга = nl.[Номер услуги] and s.Сезон = hs.value and lower(s.ТипСтрой) = lower(l.house_type)
	left join stack.[УК Договоры] ukd on ukd.row_id = nl.ДоговорУК
	left join stack.Организации org on org.row_id = ukd.[Организация-УКДоговор]
	where nl.[Месяц расчета] between @dn and @dk and nl.Перерасчет < @startOfYear
),
data_group as(
select БД, Месяц, ЛС ,privileged СоцПоддержка,value Отоп, house_type ТипСтрой, isnull(uk.Наименование,'') УК,'' Поставщик,
--, isnull(p.Наименование,'') Поставщик,
	--STUFF((SELECT ',' + cast(t.Услуга as varchar(10)) FROM data_tarif t where t.Месяц = d.Месяц and  t.ЛС = d.ЛС FOR XML PATH('')), 1, 1, '') Услуга,
	heating, Строка_таблицы, sum(ОбъемПер) ОбъемПер, sum(СуммаПер) СуммаПер, 
	sum(Объем1) Объем1, sum(Объем2) Объем2, sum(Объем3) Объем3,
	sum(Сумма1) Сумма1, sum(Сумма2) Сумма2, sum(Сумма3) Сумма3
from data_tarif d
left join stack.[УК договоры] ukd on ukd.row_id = ДоговорУК
left join stack.Организации uk on uk.row_id = ukd.[Организация-УКДоговор]
--left join stack.Организации p on p.row_id = Поставщик
group by БД, Месяц, ЛС ,privileged,value, house_type, isnull(uk.Наименование,'')--, isnull(p.Наименование,''),
	,heating, Строка_таблицы),
data_col as(
select БД, Месяц, ЛС ,СоцПоддержка,Отоп, ТипСтрой, УК, Поставщик, Строка_таблицы, ОбъемПер, СуммаПер, Объем1, Объем2, Объем3,
case when Объем1 <> 0 or Сумма1 <> 0 then 1 else 0 end КолВо1,case when Объем2 <> 0 or Сумма2 <> 0 then 1 else 0 end КолВо2,case when Объем3 <> 0 or Сумма3 <> 0 then 1 else 0 end КолВо3,	
Сумма1,Сумма2, Сумма3
from data_group)

select БД, FORMAT(Месяц, 'yyyy [MM] MMMM', 'ru') Месяц, 1 ЛС ,СоцПоддержка, Отоп, ТипСтрой, УК, Поставщик, Строка_таблицы, 
cast(sum(ОбъемПер) as float) ОбъемПер, cast(sum(СуммаПер) as float) СуммаПер, 
cast(sum(Объем1) as float) Объем1, cast(sum(Объем2) as float) Объем2, cast(sum(Объем3) as float) Объем3,
cast(sum(КолВо1) as float) КолВо1, cast(sum(КолВо2) as float) КолВо2, cast(sum(КолВо3) as float) КолВо3, 
cast(sum(Сумма1) as float) Сумма1, cast(sum(Сумма2) as float) Сумма2, cast(sum(Сумма3) as float) Сумма3
from data_col
group by БД, Месяц,СоцПоддержка,Отоп, ТипСтрой, УК, Поставщик, Отоп, Строка_таблицы
order by Месяц, УК, Поставщик, Строка_таблицы
`,
fields: {
processing:"server-multi",
grid: [
          { dataField: 'Филиал',},
          { dataField: 'Месяц',},
          { dataField: 'СоцПоддержка',},
          { dataField: 'СоцПоддержка',},
          { dataField: 'Отоп',},      
          { dataField: 'ТипСтрой',},  
          { dataField: 'УК',},  
          { dataField: 'Поставщик',},
          { dataField: 'Строка_таблицы', },
          { dataField: 'ОбъемПер',format: { type: 'fixedPoint',precision: 3},},
          { dataField: 'СуммаПер',format: { type: 'fixedPoint',precision: 2},},
          { dataField: 'Объем1',format: { type: 'fixedPoint',precision: 3},},
          { dataField: 'Объем2',format: { type: 'fixedPoint',precision: 3},},
          { dataField: 'Объем3',format: { type: 'fixedPoint',precision: 3},},
          { dataField: 'КолВо1',},
          { dataField: 'КолВо2',},
          { dataField: 'КолВо3',},
          { dataField: 'Сумма1',format: { type: 'fixedPoint',precision: 2},},
          { dataField: 'Сумма2',format: { type: 'fixedPoint',precision: 2},},
          { dataField: 'Сумма3',format: { type: 'fixedPoint',precision: 2},},
                      ],
                      pivot: [
          { dataField: 'Отчет', area: "column",expanded:true,},
          { dataField: 'Месяц', area: "row",expanded:true,},
          { dataField: 'Филиал', area: "row",expanded:true,},
          { dataField: 'Строка_таблицы',area: "row",expanded:true, },    
          { caption: "Отопление", dataField: 'Отоп', area: "filter",},      
          { dataField: 'Поставщик', area: "filter",},  
          { dataField: 'УК', area: "filter",},  
          { dataField: 'СоцПоддержка', area: "row", expanded:true,},  
          { caption: "Тип строения", dataField: 'ТипСтрой', area: "row", expanded:true,},
          { caption: "Объем перерасчета", dataField: 'ОбъемПер',"dataType": "number", "summaryType": "sum","format": { "type": "fixedPoint","precision": 3}, "area": "data"},
          { caption: "Сумма перерасчета", dataField: 'СуммаПер',"dataType": "number", "summaryType": "sum","format": { "type": "fixedPoint","precision": 2}, "area": "data"},
          { caption: "Объем 1", dataField: 'Объем1',"dataType": "number", "summaryType": "sum","format": { "type": "fixedPoint","precision": 3}, "area": "data"},
          { caption: "Объем 2", dataField: 'Объем2',"dataType": "number", "summaryType": "sum","format": { "type": "fixedPoint","precision": 3}, "area": "data"},
          { caption: "Объем 3", dataField: 'Объем3',"dataType": "number", "summaryType": "sum","format": { "type": "fixedPoint","precision": 3}, "area": "data"},
          { caption: "Кол-во ЛС 1", dataField: 'КолВо1',"dataType": "number", "summaryType": "sum","format": { "type": "fixedPoint","precision": 0}, "area": "data"},
          { caption: "Кол-во ЛС 2", dataField: 'КолВо2',"dataType": "number", "summaryType": "sum","format": { "type": "fixedPoint","precision": 0}, "area": "data"},
          { caption: "Кол-во ЛС 3", dataField: 'КолВо3',"dataType": "number", "summaryType": "sum","format": { "type": "fixedPoint","precision": 0}, "area": "data"},
          { caption: "Сумма 1", dataField: 'Сумма1',"dataType": "number", "summaryType": "sum","format": { "type": "fixedPoint","precision": 2}, "area": "data"},
          { caption: "Сумма 2", dataField: 'Сумма2',"dataType": "number", "summaryType": "sum","format": { "type": "fixedPoint","precision": 2}, "area": "data"},
          { caption: "Сумма 3", dataField: 'Сумма3',"dataType": "number", "summaryType": "sum","format": { "type": "fixedPoint","precision": 2}, "area": "data"},
                      ]

                   }                     


},

{ id: 2011, parent: 2000, text: 'ФЛ Ежемесячный отчет в ФАС(ЛС)', icon: 'chart' ,
processing:"server-multi",
views: ["grid","pivot"],
query:`
SET DATEFORMAT ymd
SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED
SET NOCOUNT ON;
DECLARE @dn DATE = {Период_start};
DECLARE @dk DATE = {Период_end};

DECLARE @startOfYear date = DATEFROMPARTS(YEAR(@dn), 1, 1);

declare @p1 int,@p2 int,@p3 int;
set @p1	   = (select top 1 row_id from stack.[Виды параметров] where Название = 'СПОДМДСЕМ');

declare @reg int = (select top 1 Значение from stack.Константы where имя = 'РЕГИОН')

IF OBJECT_ID('tempdb..#heating_season') IS NOT NULL DROP TABLE #heating_season;
CREATE TABLE #heating_season (
    date date,
    value varchar(10)
);

IF OBJECT_ID('tempdb..#data') IS NOT NULL DROP TABLE #data;
CREATE TABLE #data (ls_id int,calc_month date, int1 int, int2 int, int3 int );

IF OBJECT_ID('tempdb..#ls') IS NOT NULL DROP TABLE #ls;
CREATE TABLE #ls ( ls_id int, house_id int, house_type varchar(256), privileged varchar(10));

IF OBJECT_ID('tempdb..#service') IS NOT NULL DROP TABLE #service;
CREATE TABLE #service (
    Услуга INT,
    ТипСтрой NVARCHAR(50),
    Сезон NVARCHAR(10),
    Диапазон INT,
    Строка_таблицы NVARCHAR(50)
);

;WITH Months AS (
    SELECT CAST(DATEFROMPARTS(YEAR(@dn), MONTH(@dn), 1) AS DATE) AS MonthStart
    UNION ALL
    SELECT DATEADD(MONTH, 1, MonthStart)
    FROM Months
    WHERE DATEADD(MONTH, 1, MonthStart) <= @dk
),
HistoricalValues AS (
    SELECT 
        DATEFROMPARTS(YEAR(hc.[Дата]), MONTH(hc.[Дата]), 1) [Дата],
        cast(iif(hc.[Значение]='',0,hc.[Значение]) as int) [Значение]
    FROM [stack].[История констант] hc
    JOIN stack.Константы c ON hc.[Константа-История] = c.row_id
    WHERE c.Имя = 'ТЕК_СЕЗОН_ОТОП_ДИФ'
)
insert into #heating_season
SELECT 
    m.MonthStart AS [Дата],
    case when ISNULL(hv.[Значение], (
        SELECT TOP 1 hv2.[Значение]
        FROM HistoricalValues hv2
        WHERE hv2.[Дата] <= m.MonthStart
        ORDER BY hv2.[Дата] DESC
    )) = 1 then 'ОП' else 'не ОП' end [Значение]
FROM Months m
LEFT JOIN HistoricalValues hv ON hv.[Дата] = m.MonthStart
ORDER BY m.MonthStart


-- Заполнение таблицы данными
INSERT INTO #service (Услуга, ТипСтрой, Сезон, Диапазон, Строка_таблицы)
VALUES
(101,'частный','ОП',1,'п. 1.1'),
(102,'частный','ОП',1,'п. 3.1'),
(103,'частный','ОП',1,'п. 8.1'),
(104,'частный','ОП',1,'п. 4.1'),
(105,'частный','ОП',1,'п. 2.1'),
(151,'частный','ОП',1,'п. 1.1'),
(152,'частный','ОП',1,'п. 3.1'),
(153,'частный','ОП',1,'п. 8.1'),
(154,'частный','ОП',1,'п. 1.1'),
(155,'частный','ОП',1,'п. 3.1'),
(156,'частный','ОП',1,'п. 8.1'),
(157,'частный','ОП',1,'п. 1.1'),
(158,'частный','ОП',1,'п. 3.1'),
(159,'частный','ОП',1,'п. 8.1'),
(160,'частный','ОП',1,'п. 1.1'),
(161,'частный','ОП',1,'п. 3.1'),
(162,'частный','ОП',1,'п. 8.1'),
(163,'частный','ОП',1,'п. 1.1'),
(164,'частный','ОП',1,'п. 3.1'),
(165,'частный','ОП',1,'п. 8.1'),
(166,'частный','ОП',1,'п. 1.1'),
(167,'частный','ОП',1,'п. 3.1'),
(168,'частный','ОП',1,'п. 8.1'),
(169,'частный','ОП',1,'п. 4.1'),
(170,'частный','ОП',1,'п. 2.1'),
(171,'частный','ОП',1,'п. 4.1'),
(172,'частный','ОП',1,'п. 2.1'),
(173,'частный','ОП',1,'п. 4.1'),
(174,'частный','ОП',1,'п. 2.1'),
(175,'частный','ОП',1,'п. 4.1'),
(176,'частный','ОП',1,'п. 2.1'),
(177,'частный','ОП',1,'п. 4.1'),
(178,'частный','ОП',1,'п. 2.1'),
(179,'частный','ОП',1,'п. 4.1'),
(180,'частный','ОП',1,'п. 2.1'),
(401,'частный','ОП',1,'п. 1.1'),
(402,'частный','ОП',1,'п. 3.1'),
(403,'частный','ОП',1,'п. 8.1'),
(404,'частный','ОП',1,'п. 4.1'),
(405,'частный','ОП',1,'п. 2.1'),
(406,'частный','ОП',1,'п. 7.1'),
(407,'частный','ОП',1,'п. 6.1'),
(408,'частный','ОП',1,'п. 5.1'),
(501,'частный','ОП',1,'п. 7.1'),
(502,'частный','ОП',1,'п. 6.1'),
(503,'частный','ОП',1,'п. 5.1'),
(551,'частный','ОП',1,'п. 7.1'),
(552,'частный','ОП',1,'п. 6.1'),
(553,'частный','ОП',1,'п. 5.1'),
(554,'частный','ОП',1,'п. 7.1'),
(555,'частный','ОП',1,'п. 6.1'),
(556,'частный','ОП',1,'п. 5.1'),
(557,'частный','ОП',1,'п. 7.1'),
(558,'частный','ОП',1,'п. 6.1'),
(559,'частный','ОП',1,'п. 5.1'),
(560,'частный','ОП',1,'п. 7.1'),
(561,'частный','ОП',1,'п. 6.1'),
(562,'частный','ОП',1,'п. 5.1'),
(563,'частный','ОП',1,'п. 7.1'),
(564,'частный','ОП',1,'п. 6.1'),
(565,'частный','ОП',1,'п. 5.1'),
(566,'частный','ОП',1,'п. 7.1'),
(567,'частный','ОП',1,'п. 6.1'),
(568,'частный','ОП',1,'п. 5.1'),
(201,'частный','ОП',2,'п. 1.1'),
(202,'частный','ОП',2,'п. 3.1'),
(203,'частный','ОП',2,'п. 8.1'),
(204,'частный','ОП',2,'п. 4.1'),
(205,'частный','ОП',2,'п. 2.1'),
(251,'частный','ОП',2,'п. 1.1'),
(252,'частный','ОП',2,'п. 3.1'),
(253,'частный','ОП',2,'п. 8.1'),
(254,'частный','ОП',2,'п. 1.1'),
(255,'частный','ОП',2,'п. 3.1'),
(256,'частный','ОП',2,'п. 8.1'),
(257,'частный','ОП',2,'п. 1.1'),
(258,'частный','ОП',2,'п. 3.1'),
(259,'частный','ОП',2,'п. 8.1'),
(260,'частный','ОП',2,'п. 1.1'),
(261,'частный','ОП',2,'п. 3.1'),
(262,'частный','ОП',2,'п. 8.1'),
(263,'частный','ОП',2,'п. 1.1'),
(264,'частный','ОП',2,'п. 3.1'),
(265,'частный','ОП',2,'п. 8.1'),
(266,'частный','ОП',2,'п. 1.1'),
(267,'частный','ОП',2,'п. 3.1'),
(268,'частный','ОП',2,'п. 8.1'),
(269,'частный','ОП',2,'п. 4.1'),
(270,'частный','ОП',2,'п. 2.1'),
(271,'частный','ОП',2,'п. 4.1'),
(272,'частный','ОП',2,'п. 2.1'),
(273,'частный','ОП',2,'п. 4.1'),
(274,'частный','ОП',2,'п. 2.1'),
(275,'частный','ОП',2,'п. 4.1'),
(276,'частный','ОП',2,'п. 2.1'),
(277,'частный','ОП',2,'п. 4.1'),
(278,'частный','ОП',2,'п. 2.1'),
(279,'частный','ОП',2,'п. 4.1'),
(280,'частный','ОП',2,'п. 2.1'),
(409,'частный','ОП',2,'п. 1.1'),
(410,'частный','ОП',2,'п. 3.1'),
(411,'частный','ОП',2,'п. 8.1'),
(412,'частный','ОП',2,'п. 4.1'),
(413,'частный','ОП',2,'п. 2.1'),
(414,'частный','ОП',2,'п. 7.1'),
(415,'частный','ОП',2,'п. 6.1'),
(416,'частный','ОП',2,'п. 5.1'),
(701,'частный','ОП',2,'п. 7.1'),
(702,'частный','ОП',2,'п. 6.1'),
(703,'частный','ОП',2,'п. 5.1'),
(751,'частный','ОП',2,'п. 7.1'),
(752,'частный','ОП',2,'п. 6.1'),
(753,'частный','ОП',2,'п. 5.1'),
(754,'частный','ОП',2,'п. 7.1'),
(755,'частный','ОП',2,'п. 6.1'),
(756,'частный','ОП',2,'п. 5.1'),
(757,'частный','ОП',2,'п. 7.1'),
(758,'частный','ОП',2,'п. 6.1'),
(759,'частный','ОП',2,'п. 5.1'),
(760,'частный','ОП',2,'п. 7.1'),
(761,'частный','ОП',2,'п. 6.1'),
(762,'частный','ОП',2,'п. 5.1'),
(763,'частный','ОП',2,'п. 7.1'),
(764,'частный','ОП',2,'п. 6.1'),
(765,'частный','ОП',2,'п. 5.1'),
(766,'частный','ОП',2,'п. 7.1'),
(767,'частный','ОП',2,'п. 6.1'),
(768,'частный','ОП',2,'п. 5.1'),
(417,'частный','ОП',3,'п. 1.1'),
(418,'частный','ОП',3,'п. 3.1'),
(419,'частный','ОП',3,'п. 8.1'),
(420,'частный','ОП',3,'п. 4.1'),
(421,'частный','ОП',3,'п. 2.1'),
(422,'частный','ОП',3,'п. 7.1'),
(423,'частный','ОП',3,'п. 6.1'),
(424,'частный','ОП',3,'п. 5.1'),
(601,'частный','ОП',3,'п. 1.1'),
(602,'частный','ОП',3,'п. 3.1'),
(603,'частный','ОП',3,'п. 8.1'),
(604,'частный','ОП',3,'п. 4.1'),
(605,'частный','ОП',3,'п. 2.1'),
(651,'частный','ОП',3,'п. 1.1'),
(652,'частный','ОП',3,'п. 3.1'),
(653,'частный','ОП',3,'п. 8.1'),
(654,'частный','ОП',3,'п. 1.1'),
(655,'частный','ОП',3,'п. 3.1'),
(656,'частный','ОП',3,'п. 8.1'),
(657,'частный','ОП',3,'п. 1.1'),
(658,'частный','ОП',3,'п. 3.1'),
(659,'частный','ОП',3,'п. 8.1'),
(660,'частный','ОП',3,'п. 1.1'),
(661,'частный','ОП',3,'п. 3.1'),
(662,'частный','ОП',3,'п. 8.1'),
(663,'частный','ОП',3,'п. 1.1'),
(664,'частный','ОП',3,'п. 3.1'),
(665,'частный','ОП',3,'п. 8.1'),
(666,'частный','ОП',3,'п. 1.1'),
(667,'частный','ОП',3,'п. 3.1'),
(668,'частный','ОП',3,'п. 8.1'),
(669,'частный','ОП',3,'п. 4.1'),
(670,'частный','ОП',3,'п. 2.1'),
(671,'частный','ОП',3,'п. 4.1'),
(672,'частный','ОП',3,'п. 2.1'),
(673,'частный','ОП',3,'п. 4.1'),
(674,'частный','ОП',3,'п. 2.1'),
(675,'частный','ОП',3,'п. 4.1'),
(676,'частный','ОП',3,'п. 2.1'),
(677,'частный','ОП',3,'п. 4.1'),
(678,'частный','ОП',3,'п. 2.1'),
(679,'частный','ОП',3,'п. 4.1'),
(680,'частный','ОП',3,'п. 2.1'),
(801,'частный','ОП',3,'п. 7.1'),
(802,'частный','ОП',3,'п. 6.1'),
(803,'частный','ОП',3,'п. 5.1'),
(851,'частный','ОП',3,'п. 7.1'),
(852,'частный','ОП',3,'п. 6.1'),
(853,'частный','ОП',3,'п. 5.1'),
(854,'частный','ОП',3,'п. 7.1'),
(855,'частный','ОП',3,'п. 6.1'),
(856,'частный','ОП',3,'п. 5.1'),
(857,'частный','ОП',3,'п. 7.1'),
(858,'частный','ОП',3,'п. 6.1'),
(859,'частный','ОП',3,'п. 5.1'),
(860,'частный','ОП',3,'п. 7.1'),
(861,'частный','ОП',3,'п. 6.1'),
(862,'частный','ОП',3,'п. 5.1'),
(863,'частный','ОП',3,'п. 7.1'),
(864,'частный','ОП',3,'п. 6.1'),
(865,'частный','ОП',3,'п. 5.1'),
(866,'частный','ОП',3,'п. 7.1'),
(867,'частный','ОП',3,'п. 6.1'),
(868,'частный','ОП',3,'п. 5.1'),
(197,'частный','ОП',1,'не заполняется'),
(199,'частный','ОП',1,'не заполняется'),
(297,'частный','ОП',2,'не заполняется'),
(697,'частный','ОП',3,'не заполняется'),
(146,'частный','ОП',1,'не заполняется'),
(191,'частный','ОП',1,'не заполняется'),
(192,'частный','ОП',1,'не заполняется'),
(193,'частный','ОП',1,'не заполняется'),
(194,'частный','ОП',1,'не заполняется'),
(546,'частный','ОП',1,'не заполняется'),
(591,'частный','ОП',1,'не заполняется'),
(592,'частный','ОП',1,'не заполняется'),
(593,'частный','ОП',1,'не заполняется'),
(594,'частный','ОП',1,'не заполняется'),
(101,'частный','не ОП',1,'п. 1.1'),
(102,'частный','не ОП',1,'п. 3.1'),
(103,'частный','не ОП',1,'п. 8.1'),
(104,'частный','не ОП',1,'п. 4.2'),
(105,'частный','не ОП',1,'п. 2.2'),
(151,'частный','не ОП',1,'п. 1.1'),
(152,'частный','не ОП',1,'п. 3.1'),
(153,'частный','не ОП',1,'п. 8.1'),
(154,'частный','не ОП',1,'п. 1.1'),
(155,'частный','не ОП',1,'п. 3.1'),
(156,'частный','не ОП',1,'п. 8.1'),
(157,'частный','не ОП',1,'п. 1.1'),
(158,'частный','не ОП',1,'п. 3.1'),
(159,'частный','не ОП',1,'п. 8.1'),
(160,'частный','не ОП',1,'п. 1.1'),
(161,'частный','не ОП',1,'п. 3.1'),
(162,'частный','не ОП',1,'п. 8.1'),
(163,'частный','не ОП',1,'п. 1.1'),
(164,'частный','не ОП',1,'п. 3.1'),
(165,'частный','не ОП',1,'п. 8.1'),
(166,'частный','не ОП',1,'п. 1.1'),
(167,'частный','не ОП',1,'п. 3.1'),
(168,'частный','не ОП',1,'п. 8.1'),
(169,'частный','не ОП',1,'п. 4.2'),
(170,'частный','не ОП',1,'п. 2.2'),
(171,'частный','не ОП',1,'п. 4.2'),
(172,'частный','не ОП',1,'п. 2.2'),
(173,'частный','не ОП',1,'п. 4.2'),
(174,'частный','не ОП',1,'п. 2.2'),
(175,'частный','не ОП',1,'п. 4.2'),
(176,'частный','не ОП',1,'п. 2.2'),
(177,'частный','не ОП',1,'п. 4.2'),
(178,'частный','не ОП',1,'п. 2.2'),
(179,'частный','не ОП',1,'п. 4.2'),
(180,'частный','не ОП',1,'п. 2.2'),
(401,'частный','не ОП',1,'п. 1.1'),
(402,'частный','не ОП',1,'п. 3.1'),
(403,'частный','не ОП',1,'п. 8.1'),
(404,'частный','не ОП',1,'п. 4.2'),
(405,'частный','не ОП',1,'п. 2.2'),
(406,'частный','не ОП',1,'п. 7.2'),
(407,'частный','не ОП',1,'п. 6.1'),
(408,'частный','не ОП',1,'п. 5.2'),
(501,'частный','не ОП',1,'п. 7.2'),
(502,'частный','не ОП',1,'п. 6.1'),
(503,'частный','не ОП',1,'п. 5.2'),
(551,'частный','не ОП',1,'п. 7.2'),
(552,'частный','не ОП',1,'п. 6.1'),
(553,'частный','не ОП',1,'п. 5.2'),
(554,'частный','не ОП',1,'п. 7.2'),
(555,'частный','не ОП',1,'п. 6.1'),
(556,'частный','не ОП',1,'п. 5.2'),
(557,'частный','не ОП',1,'п. 7.2'),
(558,'частный','не ОП',1,'п. 6.1'),
(559,'частный','не ОП',1,'п. 5.2'),
(560,'частный','не ОП',1,'п. 7.2'),
(561,'частный','не ОП',1,'п. 6.1'),
(562,'частный','не ОП',1,'п. 5.2'),
(563,'частный','не ОП',1,'п. 7.2'),
(564,'частный','не ОП',1,'п. 6.1'),
(565,'частный','не ОП',1,'п. 5.2'),
(566,'частный','не ОП',1,'п. 7.2'),
(567,'частный','не ОП',1,'п. 6.1'),
(568,'частный','не ОП',1,'п. 5.2'),
(201,'частный','не ОП',2,'п. 1.1'),
(202,'частный','не ОП',2,'п. 3.1'),
(203,'частный','не ОП',2,'п. 8.1'),
(204,'частный','не ОП',2,'п. 4.2'),
(205,'частный','не ОП',2,'п. 2.2'),
(251,'частный','не ОП',2,'п. 1.1'),
(252,'частный','не ОП',2,'п. 3.1'),
(253,'частный','не ОП',2,'п. 8.1'),
(254,'частный','не ОП',2,'п. 1.1'),
(255,'частный','не ОП',2,'п. 3.1'),
(256,'частный','не ОП',2,'п. 8.1'),
(257,'частный','не ОП',2,'п. 1.1'),
(258,'частный','не ОП',2,'п. 3.1'),
(259,'частный','не ОП',2,'п. 8.1'),
(260,'частный','не ОП',2,'п. 1.1'),
(261,'частный','не ОП',2,'п. 3.1'),
(262,'частный','не ОП',2,'п. 8.1'),
(263,'частный','не ОП',2,'п. 1.1'),
(264,'частный','не ОП',2,'п. 3.1'),
(265,'частный','не ОП',2,'п. 8.1'),
(266,'частный','не ОП',2,'п. 1.1'),
(267,'частный','не ОП',2,'п. 3.1'),
(268,'частный','не ОП',2,'п. 8.1'),
(269,'частный','не ОП',2,'п. 4.2'),
(270,'частный','не ОП',2,'п. 2.2'),
(271,'частный','не ОП',2,'п. 4.2'),
(272,'частный','не ОП',2,'п. 2.2'),
(273,'частный','не ОП',2,'п. 4.2'),
(274,'частный','не ОП',2,'п. 2.2'),
(275,'частный','не ОП',2,'п. 4.2'),
(276,'частный','не ОП',2,'п. 2.2'),
(277,'частный','не ОП',2,'п. 4.2'),
(278,'частный','не ОП',2,'п. 2.2'),
(279,'частный','не ОП',2,'п. 4.2'),
(280,'частный','не ОП',2,'п. 2.2'),
(409,'частный','не ОП',2,'п. 1.1'),
(410,'частный','не ОП',2,'п. 3.1'),
(411,'частный','не ОП',2,'п. 8.1'),
(412,'частный','не ОП',2,'п. 4.2'),
(413,'частный','не ОП',2,'п. 2.2'),
(414,'частный','не ОП',2,'п. 7.2'),
(415,'частный','не ОП',2,'п. 6.1'),
(416,'частный','не ОП',2,'п. 5.2'),
(701,'частный','не ОП',2,'п. 7.2'),
(702,'частный','не ОП',2,'п. 6.1'),
(703,'частный','не ОП',2,'п. 5.2'),
(751,'частный','не ОП',2,'п. 7.2'),
(752,'частный','не ОП',2,'п. 6.1'),
(753,'частный','не ОП',2,'п. 5.2'),
(754,'частный','не ОП',2,'п. 7.2'),
(755,'частный','не ОП',2,'п. 6.1'),
(756,'частный','не ОП',2,'п. 5.2'),
(757,'частный','не ОП',2,'п. 7.2'),
(758,'частный','не ОП',2,'п. 6.1'),
(759,'частный','не ОП',2,'п. 5.2'),
(760,'частный','не ОП',2,'п. 7.2'),
(761,'частный','не ОП',2,'п. 6.1'),
(762,'частный','не ОП',2,'п. 5.2'),
(763,'частный','не ОП',2,'п. 7.2'),
(764,'частный','не ОП',2,'п. 6.1'),
(765,'частный','не ОП',2,'п. 5.2'),
(766,'частный','не ОП',2,'п. 7.2'),
(767,'частный','не ОП',2,'п. 6.1'),
(768,'частный','не ОП',2,'п. 5.2'),
(417,'частный','не ОП',3,'п. 1.1'),
(418,'частный','не ОП',3,'п. 3.1'),
(419,'частный','не ОП',3,'п. 8.1'),
(420,'частный','не ОП',3,'п. 4.2'),
(421,'частный','не ОП',3,'п. 2.2'),
(422,'частный','не ОП',3,'п. 7.2'),
(423,'частный','не ОП',3,'п. 6.1'),
(424,'частный','не ОП',3,'п. 5.2'),
(601,'частный','не ОП',3,'п. 1.1'),
(602,'частный','не ОП',3,'п. 3.1'),
(603,'частный','не ОП',3,'п. 8.1'),
(604,'частный','не ОП',3,'п. 4.2'),
(605,'частный','не ОП',3,'п. 2.2'),
(651,'частный','не ОП',3,'п. 1.1'),
(652,'частный','не ОП',3,'п. 3.1'),
(653,'частный','не ОП',3,'п. 8.1'),
(654,'частный','не ОП',3,'п. 1.1'),
(655,'частный','не ОП',3,'п. 3.1'),
(656,'частный','не ОП',3,'п. 8.1'),
(657,'частный','не ОП',3,'п. 1.1'),
(658,'частный','не ОП',3,'п. 3.1'),
(659,'частный','не ОП',3,'п. 8.1'),
(660,'частный','не ОП',3,'п. 1.1'),
(661,'частный','не ОП',3,'п. 3.1'),
(662,'частный','не ОП',3,'п. 8.1'),
(663,'частный','не ОП',3,'п. 1.1'),
(664,'частный','не ОП',3,'п. 3.1'),
(665,'частный','не ОП',3,'п. 8.1'),
(666,'частный','не ОП',3,'п. 1.1'),
(667,'частный','не ОП',3,'п. 3.1'),
(668,'частный','не ОП',3,'п. 8.1'),
(669,'частный','не ОП',3,'п. 4.2'),
(670,'частный','не ОП',3,'п. 2.2'),
(671,'частный','не ОП',3,'п. 4.2'),
(672,'частный','не ОП',3,'п. 2.2'),
(673,'частный','не ОП',3,'п. 4.2'),
(674,'частный','не ОП',3,'п. 2.2'),
(675,'частный','не ОП',3,'п. 4.2'),
(676,'частный','не ОП',3,'п. 2.2'),
(677,'частный','не ОП',3,'п. 4.2'),
(678,'частный','не ОП',3,'п. 2.2'),
(679,'частный','не ОП',3,'п. 4.2'),
(680,'частный','не ОП',3,'п. 2.2'),
(801,'частный','не ОП',3,'п. 7.2'),
(802,'частный','не ОП',3,'п. 6.1'),
(803,'частный','не ОП',3,'п. 5.2'),
(851,'частный','не ОП',3,'п. 7.2'),
(852,'частный','не ОП',3,'п. 6.1'),
(853,'частный','не ОП',3,'п. 5.2'),
(854,'частный','не ОП',3,'п. 7.2'),
(855,'частный','не ОП',3,'п. 6.1'),
(856,'частный','не ОП',3,'п. 5.2'),
(857,'частный','не ОП',3,'п. 7.2'),
(858,'частный','не ОП',3,'п. 6.1'),
(859,'частный','не ОП',3,'п. 5.2'),
(860,'частный','не ОП',3,'п. 7.2'),
(861,'частный','не ОП',3,'п. 6.1'),
(862,'частный','не ОП',3,'п. 5.2'),
(863,'частный','не ОП',3,'п. 7.2'),
(864,'частный','не ОП',3,'п. 6.1'),
(865,'частный','не ОП',3,'п. 5.2'),
(866,'частный','не ОП',3,'п. 7.2'),
(867,'частный','не ОП',3,'п. 6.1'),
(868,'частный','не ОП',3,'п. 5.2'),
(197,'частный','не ОП',1,'не заполняется'),
(199,'частный','не ОП',1,'не заполняется'),
(297,'частный','не ОП',1,'не заполняется'),
(697,'частный','не ОП',1,'не заполняется'),
(146,'частный','не ОП',1,'не заполняется'),
(191,'частный','не ОП',1,'не заполняется'),
(192,'частный','не ОП',1,'не заполняется'),
(193,'частный','не ОП',1,'не заполняется'),
(194,'частный','не ОП',1,'не заполняется'),
(546,'частный','не ОП',1,'не заполняется'),
(591,'частный','не ОП',1,'не заполняется'),
(592,'частный','не ОП',1,'не заполняется'),
(593,'частный','не ОП',1,'не заполняется'),
(594,'частный','не ОП',1,'не заполняется'),
(101,'МКД','ОП',1,'п. 1.4'),
(102,'МКД','ОП',1,'п. 3.2'),
(103,'МКД','ОП',1,'п. 8.2'),
(104,'МКД','ОП',1,'п. 4.3'),
(105,'МКД','ОП',1,'п. 2.3'),
(151,'МКД','ОП',1,'п. 1.4'),
(152,'МКД','ОП',1,'п. 3.2'),
(153,'МКД','ОП',1,'п. 8.2'),
(154,'МКД','ОП',1,'п. 1.4'),
(155,'МКД','ОП',1,'п. 3.2'),
(156,'МКД','ОП',1,'п. 8.2'),
(157,'МКД','ОП',1,'п. 1.4'),
(158,'МКД','ОП',1,'п. 3.2'),
(159,'МКД','ОП',1,'п. 8.2'),
(160,'МКД','ОП',1,'п. 1.4'),
(161,'МКД','ОП',1,'п. 3.2'),
(162,'МКД','ОП',1,'п. 8.2'),
(163,'МКД','ОП',1,'п. 1.4'),
(164,'МКД','ОП',1,'п. 3.2'),
(165,'МКД','ОП',1,'п. 8.2'),
(166,'МКД','ОП',1,'п. 1.4'),
(167,'МКД','ОП',1,'п. 3.2'),
(168,'МКД','ОП',1,'п. 8.2'),
(169,'МКД','ОП',1,'п. 4.3'),
(170,'МКД','ОП',1,'п. 2.3'),
(171,'МКД','ОП',1,'п. 4.3'),
(172,'МКД','ОП',1,'п. 2.3'),
(173,'МКД','ОП',1,'п. 4.3'),
(174,'МКД','ОП',1,'п. 2.3'),
(175,'МКД','ОП',1,'п. 4.3'),
(176,'МКД','ОП',1,'п. 2.3'),
(177,'МКД','ОП',1,'п. 4.3'),
(178,'МКД','ОП',1,'п. 2.3'),
(179,'МКД','ОП',1,'п. 4.3'),
(180,'МКД','ОП',1,'п. 2.3'),
(401,'МКД','ОП',1,'п. 1.4'),
(402,'МКД','ОП',1,'п. 3.2'),
(403,'МКД','ОП',1,'п. 8.2'),
(404,'МКД','ОП',1,'п. 4.3'),
(405,'МКД','ОП',1,'п. 2.3'),
(406,'МКД','ОП',1,'п. 7.3'),
(407,'МКД','ОП',1,'п. 6.2'),
(408,'МКД','ОП',1,'п. 5.3'),
(501,'МКД','ОП',1,'п. 7.3'),
(502,'МКД','ОП',1,'п. 6.2'),
(503,'МКД','ОП',1,'п. 5.3'),
(551,'МКД','ОП',1,'п. 7.3'),
(552,'МКД','ОП',1,'п. 6.2'),
(553,'МКД','ОП',1,'п. 5.3'),
(554,'МКД','ОП',1,'п. 7.3'),
(555,'МКД','ОП',1,'п. 6.2'),
(556,'МКД','ОП',1,'п. 5.3'),
(557,'МКД','ОП',1,'п. 7.3'),
(558,'МКД','ОП',1,'п. 6.2'),
(559,'МКД','ОП',1,'п. 5.3'),
(560,'МКД','ОП',1,'п. 7.3'),
(561,'МКД','ОП',1,'п. 6.2'),
(562,'МКД','ОП',1,'п. 5.3'),
(563,'МКД','ОП',1,'п. 7.3'),
(564,'МКД','ОП',1,'п. 6.2'),
(565,'МКД','ОП',1,'п. 5.3'),
(566,'МКД','ОП',1,'п. 7.3'),
(567,'МКД','ОП',1,'п. 6.2'),
(568,'МКД','ОП',1,'п. 5.3'),
(201,'МКД','ОП',2,'п. 1.4'),
(202,'МКД','ОП',2,'п. 3.2'),
(203,'МКД','ОП',2,'п. 8.2'),
(204,'МКД','ОП',2,'п. 4.3'),
(205,'МКД','ОП',2,'п. 2.3'),
(251,'МКД','ОП',2,'п. 1.4'),
(252,'МКД','ОП',2,'п. 3.2'),
(253,'МКД','ОП',2,'п. 8.2'),
(254,'МКД','ОП',2,'п. 1.4'),
(255,'МКД','ОП',2,'п. 3.2'),
(256,'МКД','ОП',2,'п. 8.2'),
(257,'МКД','ОП',2,'п. 1.4'),
(258,'МКД','ОП',2,'п. 3.2'),
(259,'МКД','ОП',2,'п. 8.2'),
(260,'МКД','ОП',2,'п. 1.4'),
(261,'МКД','ОП',2,'п. 3.2'),
(262,'МКД','ОП',2,'п. 8.2'),
(263,'МКД','ОП',2,'п. 1.4'),
(264,'МКД','ОП',2,'п. 3.2'),
(265,'МКД','ОП',2,'п. 8.2'),
(266,'МКД','ОП',2,'п. 1.4'),
(267,'МКД','ОП',2,'п. 3.2'),
(268,'МКД','ОП',2,'п. 8.2'),
(269,'МКД','ОП',2,'п. 4.3'),
(270,'МКД','ОП',2,'п. 2.3'),
(271,'МКД','ОП',2,'п. 4.3'),
(272,'МКД','ОП',2,'п. 2.3'),
(273,'МКД','ОП',2,'п. 4.3'),
(274,'МКД','ОП',2,'п. 2.3'),
(275,'МКД','ОП',2,'п. 4.3'),
(276,'МКД','ОП',2,'п. 2.3'),
(277,'МКД','ОП',2,'п. 4.3'),
(278,'МКД','ОП',2,'п. 2.3'),
(279,'МКД','ОП',2,'п. 4.3'),
(280,'МКД','ОП',2,'п. 2.3'),
(409,'МКД','ОП',2,'п. 1.4'),
(410,'МКД','ОП',2,'п. 3.2'),
(411,'МКД','ОП',2,'п. 8.2'),
(412,'МКД','ОП',2,'п. 4.3'),
(413,'МКД','ОП',2,'п. 2.3'),
(414,'МКД','ОП',2,'п. 7.3'),
(415,'МКД','ОП',2,'п. 6.2'),
(416,'МКД','ОП',2,'п. 5.3'),
(701,'МКД','ОП',2,'п. 7.3'),
(702,'МКД','ОП',2,'п. 6.2'),
(703,'МКД','ОП',2,'п. 5.3'),
(751,'МКД','ОП',2,'п. 7.3'),
(752,'МКД','ОП',2,'п. 6.2'),
(753,'МКД','ОП',2,'п. 5.3'),
(754,'МКД','ОП',2,'п. 7.3'),
(755,'МКД','ОП',2,'п. 6.2'),
(756,'МКД','ОП',2,'п. 5.3'),
(757,'МКД','ОП',2,'п. 7.3'),
(758,'МКД','ОП',2,'п. 6.2'),
(759,'МКД','ОП',2,'п. 5.3'),
(760,'МКД','ОП',2,'п. 7.3'),
(761,'МКД','ОП',2,'п. 6.2'),
(762,'МКД','ОП',2,'п. 5.3'),
(763,'МКД','ОП',2,'п. 7.3'),
(764,'МКД','ОП',2,'п. 6.2'),
(765,'МКД','ОП',2,'п. 5.3'),
(766,'МКД','ОП',2,'п. 7.3'),
(767,'МКД','ОП',2,'п. 6.2'),
(768,'МКД','ОП',2,'п. 5.3'),
(417,'МКД','ОП',3,'п. 1.4'),
(418,'МКД','ОП',3,'п. 3.2'),
(419,'МКД','ОП',3,'п. 8.2'),
(420,'МКД','ОП',3,'п. 4.3'),
(421,'МКД','ОП',3,'п. 2.3'),
(422,'МКД','ОП',3,'п. 7.3'),
(423,'МКД','ОП',3,'п. 6.2'),
(424,'МКД','ОП',3,'п. 5.3'),
(601,'МКД','ОП',3,'п. 1.4'),
(602,'МКД','ОП',3,'п. 3.2'),
(603,'МКД','ОП',3,'п. 8.2'),
(604,'МКД','ОП',3,'п. 4.3'),
(605,'МКД','ОП',3,'п. 2.3'),
(651,'МКД','ОП',3,'п. 1.4'),
(652,'МКД','ОП',3,'п. 3.2'),
(653,'МКД','ОП',3,'п. 8.2'),
(654,'МКД','ОП',3,'п. 1.4'),
(655,'МКД','ОП',3,'п. 3.2'),
(656,'МКД','ОП',3,'п. 8.2'),
(657,'МКД','ОП',3,'п. 1.4'),
(658,'МКД','ОП',3,'п. 3.2'),
(659,'МКД','ОП',3,'п. 8.2'),
(660,'МКД','ОП',3,'п. 1.4'),
(661,'МКД','ОП',3,'п. 3.2'),
(662,'МКД','ОП',3,'п. 8.2'),
(663,'МКД','ОП',3,'п. 1.4'),
(664,'МКД','ОП',3,'п. 3.2'),
(665,'МКД','ОП',3,'п. 8.2'),
(666,'МКД','ОП',3,'п. 1.4'),
(667,'МКД','ОП',3,'п. 3.2'),
(668,'МКД','ОП',3,'п. 8.2'),
(669,'МКД','ОП',3,'п. 4.3'),
(670,'МКД','ОП',3,'п. 2.3'),
(671,'МКД','ОП',3,'п. 4.3'),
(672,'МКД','ОП',3,'п. 2.3'),
(673,'МКД','ОП',3,'п. 4.3'),
(674,'МКД','ОП',3,'п. 2.3'),
(675,'МКД','ОП',3,'п. 4.3'),
(676,'МКД','ОП',3,'п. 2.3'),
(677,'МКД','ОП',3,'п. 4.3'),
(678,'МКД','ОП',3,'п. 2.3'),
(679,'МКД','ОП',3,'п. 4.3'),
(680,'МКД','ОП',3,'п. 2.3'),
(801,'МКД','ОП',3,'п. 7.3'),
(802,'МКД','ОП',3,'п. 6.2'),
(803,'МКД','ОП',3,'п. 5.3'),
(851,'МКД','ОП',3,'п. 7.3'),
(852,'МКД','ОП',3,'п. 6.2'),
(853,'МКД','ОП',3,'п. 5.3'),
(854,'МКД','ОП',3,'п. 7.3'),
(855,'МКД','ОП',3,'п. 6.2'),
(856,'МКД','ОП',3,'п. 5.3'),
(857,'МКД','ОП',3,'п. 7.3'),
(858,'МКД','ОП',3,'п. 6.2'),
(859,'МКД','ОП',3,'п. 5.3'),
(860,'МКД','ОП',3,'п. 7.3'),
(861,'МКД','ОП',3,'п. 6.2'),
(862,'МКД','ОП',3,'п. 5.3'),
(863,'МКД','ОП',3,'п. 7.3'),
(864,'МКД','ОП',3,'п. 6.2'),
(865,'МКД','ОП',3,'п. 5.3'),
(866,'МКД','ОП',3,'п. 7.3'),
(867,'МКД','ОП',3,'п. 6.2'),
(868,'МКД','ОП',3,'п. 5.3'),
(197,'МКД','ОП',1,'не заполняется'),
(199,'МКД','ОП',1,'не заполняется'),
(297,'МКД','ОП',2,'не заполняется'),
(697,'МКД','ОП',3,'не заполняется'),
(146,'МКД','ОП',1,'не заполняется'),
(191,'МКД','ОП',1,'не заполняется'),
(192,'МКД','ОП',1,'не заполняется'),
(193,'МКД','ОП',1,'не заполняется'),
(194,'МКД','ОП',1,'не заполняется'),
(546,'МКД','ОП',1,'не заполняется'),
(591,'МКД','ОП',1,'не заполняется'),
(592,'МКД','ОП',1,'не заполняется'),
(593,'МКД','ОП',1,'не заполняется'),
(594,'МКД','ОП',1,'не заполняется'),
(101,'МКД','не ОП',1,'п. 1.4'),
(102,'МКД','не ОП',1,'п. 3.2'),
(103,'МКД','не ОП',1,'п. 8.2'),
(104,'МКД','не ОП',1,'п. 4.6'),
(105,'МКД','не ОП',1,'п. 2.6'),
(151,'МКД','не ОП',1,'п. 1.4'),
(152,'МКД','не ОП',1,'п. 3.2'),
(153,'МКД','не ОП',1,'п. 8.2'),
(154,'МКД','не ОП',1,'п. 1.4'),
(155,'МКД','не ОП',1,'п. 3.2'),
(156,'МКД','не ОП',1,'п. 8.2'),
(157,'МКД','не ОП',1,'п. 1.4'),
(158,'МКД','не ОП',1,'п. 3.2'),
(159,'МКД','не ОП',1,'п. 8.2'),
(160,'МКД','не ОП',1,'п. 1.4'),
(161,'МКД','не ОП',1,'п. 3.2'),
(162,'МКД','не ОП',1,'п. 8.2'),
(163,'МКД','не ОП',1,'п. 1.4'),
(164,'МКД','не ОП',1,'п. 3.2'),
(165,'МКД','не ОП',1,'п. 8.2'),
(166,'МКД','не ОП',1,'п. 1.4'),
(167,'МКД','не ОП',1,'п. 3.2'),
(168,'МКД','не ОП',1,'п. 8.2'),
(169,'МКД','не ОП',1,'п. 4.6'),
(170,'МКД','не ОП',1,'п. 2.6'),
(171,'МКД','не ОП',1,'п. 4.6'),
(172,'МКД','не ОП',1,'п. 2.6'),
(173,'МКД','не ОП',1,'п. 4.6'),
(174,'МКД','не ОП',1,'п. 2.6'),
(175,'МКД','не ОП',1,'п. 4.6'),
(176,'МКД','не ОП',1,'п. 2.6'),
(177,'МКД','не ОП',1,'п. 4.6'),
(178,'МКД','не ОП',1,'п. 2.6'),
(179,'МКД','не ОП',1,'п. 4.6'),
(180,'МКД','не ОП',1,'п. 2.6'),
(401,'МКД','не ОП',1,'п. 1.4'),
(402,'МКД','не ОП',1,'п. 3.2'),
(403,'МКД','не ОП',1,'п. 8.2'),
(404,'МКД','не ОП',1,'п. 4.6'),
(405,'МКД','не ОП',1,'п. 2.6'),
(406,'МКД','не ОП',1,'п. 7.6'),
(407,'МКД','не ОП',1,'п. 6.2'),
(408,'МКД','не ОП',1,'п. 5.6'),
(501,'МКД','не ОП',1,'п. 7.6'),
(502,'МКД','не ОП',1,'п. 6.2'),
(503,'МКД','не ОП',1,'п. 5.6'),
(551,'МКД','не ОП',1,'п. 7.6'),
(552,'МКД','не ОП',1,'п. 6.2'),
(553,'МКД','не ОП',1,'п. 5.6'),
(554,'МКД','не ОП',1,'п. 7.6'),
(555,'МКД','не ОП',1,'п. 6.2'),
(556,'МКД','не ОП',1,'п. 5.6'),
(557,'МКД','не ОП',1,'п. 7.6'),
(558,'МКД','не ОП',1,'п. 6.2'),
(559,'МКД','не ОП',1,'п. 5.6'),
(560,'МКД','не ОП',1,'п. 7.6'),
(561,'МКД','не ОП',1,'п. 6.2'),
(562,'МКД','не ОП',1,'п. 5.6'),
(563,'МКД','не ОП',1,'п. 7.6'),
(564,'МКД','не ОП',1,'п. 6.2'),
(565,'МКД','не ОП',1,'п. 5.6'),
(566,'МКД','не ОП',1,'п. 7.6'),
(567,'МКД','не ОП',1,'п. 6.2'),
(568,'МКД','не ОП',1,'п. 5.6'),
(201,'МКД','не ОП',2,'п. 1.4'),
(202,'МКД','не ОП',2,'п. 3.2'),
(203,'МКД','не ОП',2,'п. 8.2'),
(204,'МКД','не ОП',2,'п. 4.6'),
(205,'МКД','не ОП',2,'п. 2.6'),
(251,'МКД','не ОП',2,'п. 1.4'),
(252,'МКД','не ОП',2,'п. 3.2'),
(253,'МКД','не ОП',2,'п. 8.2'),
(254,'МКД','не ОП',2,'п. 1.4'),
(255,'МКД','не ОП',2,'п. 3.2'),
(256,'МКД','не ОП',2,'п. 8.2'),
(257,'МКД','не ОП',2,'п. 1.4'),
(258,'МКД','не ОП',2,'п. 3.2'),
(259,'МКД','не ОП',2,'п. 8.2'),
(260,'МКД','не ОП',2,'п. 1.4'),
(261,'МКД','не ОП',2,'п. 3.2'),
(262,'МКД','не ОП',2,'п. 8.2'),
(263,'МКД','не ОП',2,'п. 1.4'),
(264,'МКД','не ОП',2,'п. 3.2'),
(265,'МКД','не ОП',2,'п. 8.2'),
(266,'МКД','не ОП',2,'п. 1.4'),
(267,'МКД','не ОП',2,'п. 3.2'),
(268,'МКД','не ОП',2,'п. 8.2'),
(269,'МКД','не ОП',2,'п. 4.6'),
(270,'МКД','не ОП',2,'п. 2.6'),
(271,'МКД','не ОП',2,'п. 4.6'),
(272,'МКД','не ОП',2,'п. 2.6'),
(273,'МКД','не ОП',2,'п. 4.6'),
(274,'МКД','не ОП',2,'п. 2.6'),
(275,'МКД','не ОП',2,'п. 4.6'),
(276,'МКД','не ОП',2,'п. 2.6'),
(277,'МКД','не ОП',2,'п. 4.6'),
(278,'МКД','не ОП',2,'п. 2.6'),
(279,'МКД','не ОП',2,'п. 4.6'),
(280,'МКД','не ОП',2,'п. 2.6'),
(409,'МКД','не ОП',2,'п. 1.4'),
(410,'МКД','не ОП',2,'п. 3.2'),
(411,'МКД','не ОП',2,'п. 8.2'),
(412,'МКД','не ОП',2,'п. 4.6'),
(413,'МКД','не ОП',2,'п. 2.6'),
(414,'МКД','не ОП',2,'п. 7.6'),
(415,'МКД','не ОП',2,'п. 6.2'),
(416,'МКД','не ОП',2,'п. 5.6'),
(701,'МКД','не ОП',2,'п. 7.6'),
(702,'МКД','не ОП',2,'п. 6.2'),
(703,'МКД','не ОП',2,'п. 5.6'),
(751,'МКД','не ОП',2,'п. 7.6'),
(752,'МКД','не ОП',2,'п. 6.2'),
(753,'МКД','не ОП',2,'п. 5.6'),
(754,'МКД','не ОП',2,'п. 7.6'),
(755,'МКД','не ОП',2,'п. 6.2'),
(756,'МКД','не ОП',2,'п. 5.6'),
(757,'МКД','не ОП',2,'п. 7.6'),
(758,'МКД','не ОП',2,'п. 6.2'),
(759,'МКД','не ОП',2,'п. 5.6'),
(760,'МКД','не ОП',2,'п. 7.6'),
(761,'МКД','не ОП',2,'п. 6.2'),
(762,'МКД','не ОП',2,'п. 5.6'),
(763,'МКД','не ОП',2,'п. 7.6'),
(764,'МКД','не ОП',2,'п. 6.2'),
(765,'МКД','не ОП',2,'п. 5.6'),
(766,'МКД','не ОП',2,'п. 7.6'),
(767,'МКД','не ОП',2,'п. 6.2'),
(768,'МКД','не ОП',2,'п. 5.6'),
(417,'МКД','не ОП',3,'п. 1.4'),
(418,'МКД','не ОП',3,'п. 3.2'),
(419,'МКД','не ОП',3,'п. 8.2'),
(420,'МКД','не ОП',3,'п. 4.6'),
(421,'МКД','не ОП',3,'п. 2.6'),
(422,'МКД','не ОП',3,'п. 7.6'),
(423,'МКД','не ОП',3,'п. 6.2'),
(424,'МКД','не ОП',3,'п. 5.6'),
(601,'МКД','не ОП',3,'п. 1.4'),
(602,'МКД','не ОП',3,'п. 3.2'),
(603,'МКД','не ОП',3,'п. 8.2'),
(604,'МКД','не ОП',3,'п. 4.6'),
(605,'МКД','не ОП',3,'п. 2.6'),
(651,'МКД','не ОП',3,'п. 1.4'),
(652,'МКД','не ОП',3,'п. 3.2'),
(653,'МКД','не ОП',3,'п. 8.2'),
(654,'МКД','не ОП',3,'п. 1.4'),
(655,'МКД','не ОП',3,'п. 3.2'),
(656,'МКД','не ОП',3,'п. 8.2'),
(657,'МКД','не ОП',3,'п. 1.4'),
(658,'МКД','не ОП',3,'п. 3.2'),
(659,'МКД','не ОП',3,'п. 8.2'),
(660,'МКД','не ОП',3,'п. 1.4'),
(661,'МКД','не ОП',3,'п. 3.2'),
(662,'МКД','не ОП',3,'п. 8.2'),
(663,'МКД','не ОП',3,'п. 1.4'),
(664,'МКД','не ОП',3,'п. 3.2'),
(665,'МКД','не ОП',3,'п. 8.2'),
(666,'МКД','не ОП',3,'п. 1.4'),
(667,'МКД','не ОП',3,'п. 3.2'),
(668,'МКД','не ОП',3,'п. 8.2'),
(669,'МКД','не ОП',3,'п. 4.6'),
(670,'МКД','не ОП',3,'п. 2.6'),
(671,'МКД','не ОП',3,'п. 4.6'),
(672,'МКД','не ОП',3,'п. 2.6'),
(673,'МКД','не ОП',3,'п. 4.6'),
(674,'МКД','не ОП',3,'п. 2.6'),
(675,'МКД','не ОП',3,'п. 4.6'),
(676,'МКД','не ОП',3,'п. 2.6'),
(677,'МКД','не ОП',3,'п. 4.6'),
(678,'МКД','не ОП',3,'п. 2.6'),
(679,'МКД','не ОП',3,'п. 4.6'),
(680,'МКД','не ОП',3,'п. 2.6'),
(801,'МКД','не ОП',3,'п. 7.6'),
(802,'МКД','не ОП',3,'п. 6.2'),
(803,'МКД','не ОП',3,'п. 5.6'),
(851,'МКД','не ОП',3,'п. 7.6'),
(852,'МКД','не ОП',3,'п. 6.2'),
(853,'МКД','не ОП',3,'п. 5.6'),
(854,'МКД','не ОП',3,'п. 7.6'),
(855,'МКД','не ОП',3,'п. 6.2'),
(856,'МКД','не ОП',3,'п. 5.6'),
(857,'МКД','не ОП',3,'п. 7.6'),
(858,'МКД','не ОП',3,'п. 6.2'),
(859,'МКД','не ОП',3,'п. 5.6'),
(860,'МКД','не ОП',3,'п. 7.6'),
(861,'МКД','не ОП',3,'п. 6.2'),
(862,'МКД','не ОП',3,'п. 5.6'),
(863,'МКД','не ОП',3,'п. 7.6'),
(864,'МКД','не ОП',3,'п. 6.2'),
(865,'МКД','не ОП',3,'п. 5.6'),
(866,'МКД','не ОП',3,'п. 7.6'),
(867,'МКД','не ОП',3,'п. 6.2'),
(868,'МКД','не ОП',3,'п. 5.6'),
(197,'МКД','не ОП',1,'не заполняется'),
(199,'МКД','не ОП',1,'не заполняется'),
(297,'МКД','не ОП',2,'не заполняется'),
(697,'МКД','не ОП',3,'не заполняется'),
(146,'МКД','не ОП',1,'не заполняется'),
(191,'МКД','не ОП',1,'не заполняется'),
(192,'МКД','не ОП',1,'не заполняется'),
(193,'МКД','не ОП',1,'не заполняется'),
(194,'МКД','не ОП',1,'не заполняется'),
(546,'МКД','не ОП',1,'не заполняется'),
(591,'МКД','не ОП',1,'не заполняется'),
(592,'МКД','не ОП',1,'не заполняется'),
(593,'МКД','не ОП',1,'не заполняется'),
(594,'МКД','не ОП',1,'не заполняется');

DECLARE @Date datetime = getDate();

;with data as(
select distinct l.row_id,li.Родитель,
case isnull(ts_ls.Значение,ts.Значение ) 
			when '0' then 'МКД' 			
			when '2' then 'МКД'			
			else 'Частный' end [Тип строения],
case when lgot.Значение is null then 'нет' else 'да' end [Льготник],
row_number() over (partition by li.Потомок order by li.Уровень) rn
from
stack.[Лицевые счета] l 
join stack.[Лицевые иерархия] li on li.Потомок  = l.row_id and li.РодительТип  in (3,12,14,13,1,0)
outer apply
(
select top 1 sv.Значение  
from stack.Свойства sv
JOIN stack.[Виды параметров] vp ON sv.[Виды-Параметры] = vp.ROW_ID AND vp.Название = 'ТИПСТРОЙ'
where sv.[Счет-Параметры] = li.Родитель AND @dn BETWEEN sv.ДатНач AND sv.ДатКнц
order by sv.ДатКнц desc) ts
outer apply
(
select top 1 sv.Значение  
from stack.Свойства sv
JOIN stack.[Виды параметров] vp ON sv.[Виды-Параметры] = vp.ROW_ID AND vp.Название = 'ТИПСТРОЙ'
where sv.[Счет-Параметры] = l.row_id AND @dn BETWEEN sv.ДатНач AND sv.ДатКнц
order by sv.ДатКнц desc) ts_ls
outer apply
(
select top 1 sv.Значение  
from stack.Свойства sv
where sv.[Счет-Параметры] = l.row_id AND @dn BETWEEN sv.ДатНач AND sv.ДатКнц and sv.[Виды-Параметры] = @p1 and sv.Значение = 1 
order by sv.ДатКнц desc) lgot
where l.тип = 5 
)

insert into #ls
select row_id, Родитель, [Тип строения], [Льготник]
from data
where rn = 1

;with data_tarif as(
	--начисление отчетного периода
	select 'ФЛ' БД, nl.[Месяц расчета] Месяц, ls.Номер ЛС,l.privileged,hs.value, l.house_type, nl.[Номер услуги] Услуга,nl.ДоговорУК, nl.Поставщик,
	hs.value heating, s.Диапазон, 
	case when (l.privileged = 'да') or (@reg in (51,67) and org.Наименование not like '%Росатом Энергосбыт%') then 'не заполняется' else s.Строка_таблицы end Строка_таблицы, 
	0 ОбъемПер, 0 СуммаПер,
	case when s.Диапазон = 1 then cast(nl.Объем as numeric (16,2)) else 0 end Объем1,
	case when s.Диапазон = 2 then cast(nl.Объем as numeric (16,2)) else 0 end Объем2,
	case when s.Диапазон = 3 then cast(nl.Объем as numeric (16,2)) else 0 end Объем3,
	case when s.Диапазон = 1 then cast(nl.Сумма as numeric (16,2))  else 0 end Сумма1,
	case when s.Диапазон = 2 then cast(nl.Сумма as numeric (16,2))  else 0 end Сумма2,
	case when s.Диапазон = 3 then cast(nl.Сумма as numeric (16,2))  else 0 end Сумма3
	from stack.НТариф nl
	join #ls l on l.ls_id = nl.Счет
	join #heating_season hs on hs.date = nl.[Месяц расчета]
	join stack.[Лицевые счета] ls on ls.row_id = l.ls_id
	join #service s on s.Услуга = nl.[Номер услуги] and s.Сезон = hs.value and lower(s.ТипСтрой) = lower(l.house_type)
	left join stack.[УК Договоры] ukd on ukd.row_id = nl.ДоговорУК
	left join stack.Организации org on org.row_id = ukd.[Организация-УКДоговор]
	where nl.[Месяц расчета] between @dn and @dk
		
	--перерасчеты отчетного периода
		union all
	select 'ФЛ' БД, nl.[Месяц расчета] Месяц, ls.Номер,l.privileged,hs.value, l.house_type, nl.[Номер услуги] Услуга,nl.ДоговорУК, nl.Поставщик,
	hs.value heating, s.Диапазон, 
	case when (l.privileged = 'да') or (@reg in (51,67) and org.Наименование not like '%Росатом Энергосбыт%') then 'не заполняется' else s.Строка_таблицы end Строка_таблицы, 
	0 ОбъемПер, 0 СуммаПер,
	case when s.Диапазон = 1 then cast(nl.Объем as numeric (16,2)) else 0 end Объем1,
	case when s.Диапазон = 2 then cast(nl.Объем as numeric (16,2)) else 0 end Объем2,
	case when s.Диапазон = 3 then cast(nl.Объем as numeric (16,2)) else 0 end Объем3,
	case when s.Диапазон = 1 then cast(nl.Сумма as numeric (16,2)) else 0 end Сумма1,
	case when s.Диапазон = 2 then cast(nl.Сумма as numeric (16,2)) else 0 end Сумма2,
	case when s.Диапазон = 3 then cast(nl.Сумма as numeric (16,2)) else 0 end Сумма3
	from stack.НПТариф nl
	join #ls l on l.ls_id = nl.Счет
	join #heating_season hs on hs.date = nl.[Месяц расчета]
	join stack.[Лицевые счета] ls on ls.row_id = l.ls_id
	join #service s on s.Услуга = nl.[Номер услуги] and s.Сезон = hs.value and lower(s.ТипСтрой) = lower(l.house_type)
	left join stack.[УК Договоры] ukd on ukd.row_id = nl.ДоговорУК
	left join stack.Организации org on org.row_id = ukd.[Организация-УКДоговор]
	where nl.[Месяц расчета] between @dn and @dk and nl.Перерасчет >= @startOfYear

	--перерасчеты за пределами отчетного периода
		union all
	select 'ФЛ' БД, nl.[Месяц расчета] Месяц, ls.Номер,l.privileged,hs.value, l.house_type, nl.[Номер услуги] Услуга,nl.ДоговорУК, nl.Поставщик,
	hs.value heating, s.Диапазон, 
	case when (l.privileged = 'да') or (@reg in (51,67) and org.Наименование not like '%Росатом Энергосбыт%') then 'не заполняется' else s.Строка_таблицы end Строка_таблицы,
	nl.Объем ОбъемПер, nl.Сумма СуммаПер,
	0 Объем1,
	0 Объем2,
	0 Объем3,
	0 Сумма1,
	0 Сумма2,
	0 Сумма3
	from stack.НПТариф nl
	join #ls l on l.ls_id = nl.Счет
	join #heating_season hs on hs.date = nl.[Месяц расчета]
	join stack.[Лицевые счета] ls on ls.row_id = l.ls_id
	join #service s on s.Услуга = nl.[Номер услуги] and s.Сезон = hs.value and lower(s.ТипСтрой) = lower(l.house_type)
	left join stack.[УК Договоры] ukd on ukd.row_id = nl.ДоговорУК
	left join stack.Организации org on org.row_id = ukd.[Организация-УКДоговор]
	where nl.[Месяц расчета] between @dn and @dk and nl.Перерасчет < @startOfYear
),
data_group as(
select БД, Месяц, ЛС ,privileged СоцПоддержка,value Отоп, house_type ТипСтрой, isnull(uk.Наименование,'') УК,'' Поставщик,
--, isnull(p.Наименование,'') Поставщик,
	--STUFF((SELECT ',' + cast(t.Услуга as varchar(10)) FROM data_tarif t where t.Месяц = d.Месяц and  t.ЛС = d.ЛС FOR XML PATH('')), 1, 1, '') Услуга,
	heating, Строка_таблицы, sum(ОбъемПер) ОбъемПер, sum(СуммаПер) СуммаПер, 
	sum(Объем1) Объем1, sum(Объем2) Объем2, sum(Объем3) Объем3,
	sum(Сумма1) Сумма1, sum(Сумма2) Сумма2, sum(Сумма3) Сумма3
from data_tarif d
left join stack.[УК договоры] ukd on ukd.row_id = ДоговорУК
left join stack.Организации uk on uk.row_id = ukd.[Организация-УКДоговор]
--left join stack.Организации p on p.row_id = Поставщик
group by БД, Месяц, ЛС ,privileged,value, house_type, isnull(uk.Наименование,'')--, isnull(p.Наименование,''),
	,heating, Строка_таблицы),
data_col as(
select БД, Месяц, ЛС ,СоцПоддержка,Отоп, ТипСтрой, УК, Поставщик, Строка_таблицы, ОбъемПер, СуммаПер, Объем1, Объем2, Объем3,
case when Объем1 <> 0 or Сумма1 <> 0 then 1 else 0 end КолВо1,case when Объем2 <> 0 or Сумма2 <> 0 then 1 else 0 end КолВо2,case when Объем3 <> 0 or Сумма3 <> 0 then 1 else 0 end КолВо3,	
Сумма1,Сумма2, Сумма3
from data_group)

select БД, FORMAT(Месяц, 'yyyy [MM] MMMM', 'ru') Месяц, ЛС ,СоцПоддержка,Отоп, ТипСтрой, УК, Поставщик, Строка_таблицы, 
cast(sum(ОбъемПер) as float) ОбъемПер, cast(sum(СуммаПер) as float) СуммаПер, 
cast(sum(Объем1) as float) Объем1, cast(sum(Объем2) as float) Объем2, cast(sum(Объем3) as float) Объем3,
cast(sum(КолВо1) as float) КолВо1, cast(sum(КолВо2) as float) КолВо2, cast(sum(КолВо3) as float) КолВо3, 
cast(sum(Сумма1) as float) Сумма1, cast(sum(Сумма2) as float) Сумма2, cast(sum(Сумма3) as float) Сумма3
from data_col
group by БД, Месяц,ЛС ,СоцПоддержка,Отоп, ТипСтрой, УК, Поставщик, Отоп, Строка_таблицы
order by Месяц, УК, Поставщик, Строка_таблицы
`,
filters: { БД_ФЛ: [], Период: {}, },
 fields: {
    grid: [
          { dataField: 'Филиал',},
          { dataField: 'Месяц',},
          { dataField: 'ЛС',},
          { dataField: 'СоцПоддержка',},
          { dataField: 'Отоп',},      
          { dataField: 'ТипСтрой',},  
          { dataField: 'УК',},  
          { dataField: 'Поставщик',},
          { dataField: 'Строка_таблицы', },
          { dataField: 'ОбъемПер',format: { type: 'fixedPoint',precision: 3},},
          { dataField: 'СуммаПер',format: { type: 'fixedPoint',precision: 2},},
          { dataField: 'Объем1',format: { type: 'fixedPoint',precision: 3},},
          { dataField: 'Объем2',format: { type: 'fixedPoint',precision: 3},},
          { dataField: 'Объем3',format: { type: 'fixedPoint',precision: 3},},
          { dataField: 'КолВо1',},
          { dataField: 'КолВо2',},
          { dataField: 'КолВо3',},
          { dataField: 'Сумма1',format: { type: 'fixedPoint',precision: 2},},
          { dataField: 'Сумма2',format: { type: 'fixedPoint',precision: 2},},
          { dataField: 'Сумма3',format: { type: 'fixedPoint',precision: 2},},
          ],
   pivot: [
          { dataField: 'Отчет', area: "column",expanded:true,},
          { dataField: 'Месяц', area: "row",expanded:true,},
          { dataField: 'Филиал', area: "row",expanded:true,},
          { dataField: 'ЛС', area: "filter",},
          { dataField: 'Строка_таблицы',area: "row",expanded:true, },    
          { caption: "Отопление", dataField: 'Отоп', area: "filter",},      
          { dataField: 'Поставщик', area: "filter",},  
          { dataField: 'УК', area: "filter",},  
          { dataField: 'СоцПоддержка', area: "row", expanded:true,},  
          { caption: "Тип строения", dataField: 'ТипСтрой', area: "row", expanded:true, },  
          { caption: "Объем перерасчета", dataField: 'ОбъемПер',"dataType": "number", "summaryType": "sum","format": { "type": "fixedPoint","precision": 3}, "area": "data"},
          { caption: "Сумма перерасчета", dataField: 'СуммаПер',"dataType": "number", "summaryType": "sum","format": { "type": "fixedPoint","precision": 2}, "area": "data"},
          { caption: "Объем 1", dataField: 'Объем1',"dataType": "number", "summaryType": "sum","format": { "type": "fixedPoint","precision": 3}, "area": "data"},
          { caption: "Объем 2", dataField: 'Объем2',"dataType": "number", "summaryType": "sum","format": { "type": "fixedPoint","precision": 3}, "area": "data"},
          { caption: "Объем 3", dataField: 'Объем3',"dataType": "number", "summaryType": "sum","format": { "type": "fixedPoint","precision": 3}, "area": "data"},
          { caption: "Кол-во ЛС 1", dataField: 'КолВо1',"dataType": "number", "summaryType": "sum","format": { "type": "fixedPoint","precision": 0}, "area": "data"},
          { caption: "Кол-во ЛС 2", dataField: 'КолВо2',"dataType": "number", "summaryType": "sum","format": { "type": "fixedPoint","precision": 0}, "area": "data"},
          { caption: "Кол-во ЛС 3", dataField: 'КолВо3',"dataType": "number", "summaryType": "sum","format": { "type": "fixedPoint","precision": 0}, "area": "data"},
          { caption: "Сумма 1", dataField: 'Сумма1',"dataType": "number", "summaryType": "sum","format": { "type": "fixedPoint","precision": 2}, "area": "data"},
          { caption: "Сумма 2", dataField: 'Сумма2',"dataType": "number", "summaryType": "sum","format": { "type": "fixedPoint","precision": 2}, "area": "data"},
          { caption: "Сумма 3", dataField: 'Сумма3',"dataType": "number", "summaryType": "sum","format": { "type": "fixedPoint","precision": 2}, "area": "data"},
          ]

          }                     


},

{ id: 2012, parent: 2000, text: 'Данные по должникам (нарастающим итогом)', icon: 'chart', 
processing:"server-multi",
query:`
SET NOCOUNT ON;
SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;
SET DATEFORMAT ymd
DECLARE @value int = 0;
DECLARE @ReportDate DATE = DATEFROMPARTS(YEAR(GETDATE()), MONTH(GETDATE()), 1);
DECLARE @ReportDateEnd DATE = EOMONTH(@ReportDate);
DECLARE @PrevReportDate DATE = DATEADD(MONTH, -1, @ReportDate);
DECLARE @Date DATE = GETDATE();
DECLARE @reg varchar(100) = (SELECT Значение FROM stack.Константы WHERE Имя = 'РЕГИОН');
DECLARE @StartYearDate DATETIME;
DECLARE @PrevStartYearDate DATETIME;
DECLARE @email int = (SELECT TOP 1 row_id FROM stack.[Виды параметров] WHERE Название = 'EMAIL');

-- Расчет дат
SET @StartYearDate = DATEFROMPARTS(YEAR(@ReportDate) - IIF(MONTH(@ReportDate) = 1, 1, 0), 1, 1);
SET @PrevStartYearDate = DATEADD(MONTH, -1, @StartYearDate);

-- Единый запрос с CTE
WITH 
-- 1. Рекурсивный CTE для услуг ЭЭ
osnd_cte AS (
    SELECT tu.row_id, tu.[Номер услуги] 
    FROM stack.[Типы услуг] tu 
    WHERE tu.Наименование LIKE '%Электроснабжение%' 
       OR tu.Наименование LIKE '%ЭЭ сверх СН%' 
       OR tu.Наименование LIKE '%Долги электроснабжения%'
       OR tu.Наименование LIKE '%э/э%' 
       OR tu.Наименование LIKE '%ЭС:%'
    
    UNION ALL
    
    SELECT child.row_id, child.[Номер услуги]
    FROM osnd_cte
    JOIN stack.[Типы услуг] child ON child.[Типы услуг] = osnd_cte.row_id
),

-- 2. Уникальные услуги ЭЭ
osnd AS (
    SELECT DISTINCT [Номер услуги] FROM osnd_cte
),

-- 3. Список ЛС
ls_start AS (
    SELECT ls.row_id AS id
    FROM (VALUES 

('4651201690'),
('4651100154'),
('4651110328'),
('4651114759'),
('4651117003'),
('4671400017'),
('4671109555'),
('4671144255'),
('4671148340'),
('4671148759'),
('4671148936'),
('4671312845'),
('4671401885'),
('4671400216'),
('4671309950'),
('4671402696'),
('4671301742'),
('4671220742'),
('4671431630'),
('4671433755'),
('4651119568'),
('4651120004'),
('4651206380'),
('4651206419'),
('4651120502'),
('4671331789'),
('4671332016'),
('4651124944'),
('4651125924'),
('4671465561'),
('69100451771'),
('69100316459'),
('69100605760'),
('69100401450'),
('69312173438'),
('69312057666'),
('69312055901'),
('69312221251'),
('69312055818'),
('69312114282'),
('69320068130'),
('69615171131'),
('69615171124'),
('69612510441'),
('69620000749'),
('69650107041'),
('69650111121'),
('69740054051'),
('69850801790'),
('69852970520'),
('69100615307'),
('69100616502'),
('69320332415'),
('69320332504'),
('69320333122'),
('69312093478'),
('69270005075'),
('69312070531'),
('69312176561'),
('69312380273'),
('67201009010'),
('67200416136'),
('67502136001'),
('67250917008'),
('67550503018'),
('67211116032'),
('67220904017'),
('67241103039'),
('67540106011'),
('67140401190'),
('67644002040'),
('67404601120'),
('6711803123'),
('6711919041'),
('6712105138'),
('6712610028'),
('673900'),
('671028170'),
('671014315'),
('671009791'),
('6712304374'),
('671005193'),
('67509929033'),
('6712304505'),
('6711904213'),
('67220707093'),
('67200101848'),
('67515002061'),
('67210210069'),
('67210703037'),
('511200106101'),
('511200124366'),
('511200136211'),
('511200138932'),
('512100139392'),
('511200148985'),
('511200026935'),
('511200027021'),
('511200002274'),
('511200004626'),
('511200001184'),
('511200001253'),
('511200002456'),
('514100718627'),
('511200003731'),
('511200004046'),
('512200000690'),
('513100007483'),
('511900000065'),
('511900000066'),
('511900000069'),
('511900001805'),
('511900001809'),
('511200006205'),
('511200006322'),
('511200006463'),
('511200007514'),
('511200011992'),
('511200013183'),
('511200013775'),
('191020000229'),
('191020001077'),
('191120004511'),
('191110001737'),
('191020003155'),
('191020004149'),
('191110003498'),
('191120010254'),
('191110004380'),
('191110005179'),
('191020007017'),
('191060004851'),
('191130007913'),
('191020008045'),
('191020008100'),
('191020008668'),
('191020009106'),
('191110008997'),
('191020010891'),
('191020011786'),
('191060008907'),
('192040012607'),
('192030011384'),
('191110013749'),
('191020015060'),
('191110013804'),
('191110013837'),
('191020015193'),
('191060010244'),
('191110013983')
    ) t(id)
    JOIN stack.[Лицевые счета] ls ON ls.Номер = t.id
),

-- 4. Сальдо на расчетный месяц
lsod AS (
    SELECT ls.row_id AS id, ISNULL(SUM(ns.Сумма), 0) AS Сальдо
    FROM ls_start lss
    JOIN stack.[Лицевые счета] ls ON ls.row_id = lss.id AND ls.тип = 5
    LEFT JOIN stack.НСальдо ns ON ns.Счет = ls.row_id 
        AND ns.[Месяц расчета] = @PrevReportDate 
        AND ns.[Номер услуги]/100 IN (1,4,101,2,5,6,7,8)
    GROUP BY ls.row_id
),

-- 5. Сальдо на начало года
lsodng AS (
    SELECT ns.Счет AS id, ISNULL(SUM(ns.Сумма), 0) AS Сальдо
    FROM lsod ls
    JOIN stack.НСальдо ns ON ns.Счет = ls.id 
        AND ns.[Месяц расчета] = @PrevStartYearDate 
        AND ns.[Номер услуги]/100 IN (1,4,101,2,5,6,7,8)
    GROUP BY ns.Счет
),

-- 6. Оплаты за месяц с разделением по услугам ЭЭ
payments AS (
    SELECT 
        ls.id,
        SUM(so.Сумма) AS pay_all,
        SUM(CASE WHEN osnd.[Номер услуги] IS NOT NULL THEN v.Сумма ELSE 0 END) AS pay_ee_sum
    FROM lsod ls
    JOIN stack.[Список оплаты] so ON so.[Счет-Оплата] = ls.id 
        AND so.Дата BETWEEN @ReportDate AND @ReportDateEnd
    LEFT JOIN [stack].[Оплата по видам] v ON v.[Распределение-Платеж] = so.row_id
    LEFT JOIN stack.[Типы услуг] t ON t.row_id = v.[Распределение-Услуга]
    LEFT JOIN osnd ON osnd.[Номер услуги] = t.[Номер услуги]
    GROUP BY ls.id
),

-- 7. Итоговые оплаты ЭЭ
pay_ee AS (
    SELECT id, SUM(pay_all - pay_ee_sum) AS pay_sum
    FROM payments
    GROUP BY id
),

-- 8. Разбивка долга
t1 AS (
    SELECT Счет AS ls, MIN([Месяц долга]) AS s, MAX([Месяц долга]) AS po
    FROM [stack].[НСальдо] ns
    JOIN lsod ON lsod.id = ns.Счет
    WHERE [Месяц расчета] = @PrevReportDate
        AND [Номер услуги]/100 IN (1,4,101,2,5,6,7,8)
    GROUP BY Счет
),

-- 9. Начисления за период
nach_2021 AS (
    SELECT id, SUM(s) AS summa
    FROM (
        SELECT ls.id, ISNULL(nl.Сумма, 0) AS s
        FROM lsod ls
        LEFT JOIN stack.[Начисления лицевых] nl ON nl.счет = ls.id 
            AND nl.[Месяц расчета] BETWEEN @StartYearDate AND @PrevReportDate 
            AND nl.[Номер услуги]/100 IN (1,4,101,2,5,6,7,8)
        UNION ALL
        SELECT ls.id, ISNULL(ks.Сумма, 0)
        FROM lsod ls
        JOIN stack.[Коррекция заголовок] kz ON kz.[Счет-Коррекция] = ls.id 
            AND kz.Дата BETWEEN @StartYearDate AND @PrevReportDate
        JOIN stack.[Коррекция список] ks ON ks.[КорЗаголовок-Список] = kz.ROW_ID
        JOIN stack.[Типы услуг] tu ON tu.ROW_ID = ks.[Услуга-Коррекция] 
            AND tu.[Номер услуги]/100 IN (1,4,101,2,5,6,7,8)
    ) t
    GROUP BY id
)

-- 10. Финальный SELECT
SELECT  
    ls.Номер,
    ISNULL(k.ФИО, '') AS ФИО,
    stack.AddrLs(lsod.id, 0) AS Адрес,
    ISNULL((
        SELECT TOP 1 sv1.Номер 
        FROM stack.Телефоны sv1
        WHERE sv1.[Счет-Телефон] = ls.row_id
        ORDER BY sv1.[ДатаАктуализации] DESC
    ), '') AS Телефон,
    ISNULL(email.Примечание, ISNULL(p_email.[E-Mail], '')) AS email,
    CAST(ISNULL(lsodng.Сальдо, 0) AS numeric(16,2)) AS [ДЗ на начало года],
    CAST(ISNULL(n2021.summa, 0) AS numeric(16,2)) AS [Начислено за период],
    CAST(ISNULL(lsodng.Сальдо, 0) + ISNULL(n2021.summa, 0) - ISNULL(lsod.Сальдо, 0) AS numeric(16,2)) AS [Оплачено за период],
    CAST(ISNULL(lsod.Сальдо, 0) AS numeric(16,2)) AS [ДЗ на отчетный месяц],
    FORMAT(t1.s, 'd', 'de-de') AS С,
    FORMAT(t1.po, 'd', 'de-de') AS По,
    CAST(ISNULL(p.pay_sum, 0) AS numeric(16,2)) AS [Оплачено за отчетный месяц],
    ISNULL(zad_abon.Название, '') AS Претензия,
    ISNULL(zad_pir.Название, '') AS Иск,
    ISNULL(zad_ogr.Название, '') AS Ограничение,
    ISNULL((
        SELECT TOP 1 
            CASE sv.Значение 
                WHEN 0 THEN 'Используется'
                WHEN 1 THEN 'Не проживает'
                WHEN 2 THEN 'Закрыт'
            END
        FROM stack.Свойства sv
        JOIN stack.[Виды параметров] vp ON sv.[Виды-Параметры] = vp.ROW_ID 
            AND vp.Название = 'СОСТОЯНИЕ'
        WHERE sv.[Счет-Параметры] = lsod.id 
            AND @Date BETWEEN sv.ДатНач AND sv.ДатКнц
        ORDER BY sv.ДатКнц DESC
    ), 'Используется') AS Состояние
FROM lsod lsod
LEFT JOIN lsodng ON lsodng.id = lsod.id
JOIN stack.[Лицевые счета] ls ON ls.ROW_ID = lsod.id
LEFT JOIN t1 ON t1.ls = lsod.id
LEFT JOIN nach_2021 n2021 ON n2021.id = ls.ROW_ID
LEFT JOIN pay_ee p ON p.id = ls.ROW_ID
LEFT JOIN stack.[Карточки регистрации] k ON k.[Счет-Наниматель] = lsod.id
OUTER APPLY (
    SELECT TOP 1 sv.Примечание
    FROM stack.[Свойства] sv
    WHERE sv.[Счет-Параметры] = ls.row_id 
        AND @Date BETWEEN sv.ДатНач AND sv.ДатКнц 
        AND sv.[Виды-Параметры] = @email
    ORDER BY sv.ДатНач DESC
) email
OUTER APPLY (
    SELECT TOP 1 p.[E-Mail]
    FROM stack.[Пароли] p 
    WHERE p.[Пароль-Лицевой] = ls.row_id 
) p_email
OUTER APPLY (
    SELECT TOP 1 vf.Название
    FROM stack.[Взыскание задолженности] vz
    JOIN stack.[Состояние документа] sd ON sd.row_id = vz.[Документ-Фаза]
    JOIN stack.[Виды фаз] vf ON vf.row_id = sd.[Фаза-Состояние]
    WHERE vz.[Счет-Взыскания] = lsod.id
        AND vz.ОкончанияСрок IS NULL 
        AND vf.Тип = 1
    ORDER BY sd.ДатНач DESC
) zad_abon
OUTER APPLY (
    SELECT TOP 1 vf.Название
    FROM stack.[Взыскание задолженности] vz
    JOIN stack.[Состояние документа] sd ON sd.row_id = vz.[Документ-Фаза]
    JOIN stack.[Виды фаз] vf ON vf.row_id = sd.[Фаза-Состояние]
    WHERE vz.[Счет-Взыскания] = lsod.id 
        AND vz.ОкончанияСрок IS NULL 
        AND vf.Тип = 2
    ORDER BY sd.ДатНач DESC
) zad_pir
OUTER APPLY (
    SELECT TOP 1 vf.Название
    FROM stack.[Взыскание задолженности] vz
    JOIN stack.[Состояние документа] sd ON sd.row_id = vz.[Документ-Фаза]
    JOIN stack.[Виды фаз] vf ON vf.row_id = sd.[Фаза-Состояние]
    WHERE vz.[Счет-Взыскания] = lsod.id 
        AND vz.ОкончанияСрок IS NULL 
        AND vf.Тип = 3
    ORDER BY sd.ДатНач DESC
) zad_ogr;
`,
filters: { БД_ФЛ: [],} , 
 fields: {
    grid: [
          { dataField: 'Филиал',},
          { dataField: 'Номер',},
          { dataField: 'ФИО',},
          { dataField: 'Адрес',},
          { dataField: 'Телефон',},
          { dataField: 'email',},
          { dataField: 'ДЗ на начало года',format: { type: 'fixedPoint',precision: 2},},
          { dataField: 'Начислено за период',format: { type: 'fixedPoint',precision: 2},},
          { dataField: 'Оплачено за период',format: { type: 'fixedPoint',precision: 2},},
          { dataField: 'ДЗ на отчетный месяц',format: { type: 'fixedPoint',precision: 2},},
          { dataField: 'С',},
          { dataField: 'По',},
          { dataField: 'Оплачено за отчетный месяц',format: { type: 'fixedPoint',precision: 2},},
          { dataField: 'Претензия',},
          { dataField: 'Иск',},
          { dataField: 'Ограничение',},
          { dataField: 'Состояние',}
          ]
          }                     
},

{ id: 2013, parent: 2000, text: 'ФЛ ФАС (Формат-Свернут)', icon: 'chart',
filters: { БД_ФЛ: [], Период: {}},
processing:"server-multi",
fields:  {
    grid: [
          { dataField: 'Филиал',},
          { caption: "ФЛ/ЮЛ", dataField:"БД",},
          { dataField: 'Месяц',},
          { dataField: 'СоцПоддержка',},
          { dataField: 'Отоп',},
          { dataField: 'ТипСтрой',},
          { dataField: 'Строка_таблицы',},
          { dataField: 'ОбъемПер',},
          { dataField: 'СуммаПер', },
          { dataField: 'КолВо',}
          ]
        },
query:`
SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED
SET NOCOUNT ON;
SET DATEFORMAT ymd;
DECLARE @dn DATE = {Период_start};
DECLARE @dk DATE = {Период_end};
DECLARE @startOfYear DATE = DATEFROMPARTS(YEAR(@dn), 1, 1);
DECLARE @p1 INT = (SELECT TOP 1 row_id FROM stack.[Виды параметров] WHERE Название = 'СПОДМДСЕМ');
DECLARE @reg INT = (SELECT TOP 1 Значение FROM stack.Константы WHERE имя = 'РЕГИОН');

WITH 
Months AS (
    SELECT CAST(DATEFROMPARTS(YEAR(@dn), MONTH(@dn), 1) AS DATE) AS MonthStart
    UNION ALL
    SELECT DATEADD(MONTH, 1, MonthStart)
    FROM Months
    WHERE DATEADD(MONTH, 1, MonthStart) <= @dk
),

HistoricalValues AS (
    SELECT 
        DATEFROMPARTS(YEAR(hc.[Дата]), MONTH(hc.[Дата]), 1) AS [Дата],
        CAST(IIF(hc.[Значение] = '', 0, hc.[Значение]) AS INT) AS [Значение]
    FROM [stack].[История констант] hc
    JOIN stack.Константы c ON hc.[Константа-История] = c.row_id
    WHERE c.Имя = 'ТЕК_СЕЗОН_ОТОП_ДИФ'
),

heating_season AS (
    SELECT 
        m.MonthStart AS [Дата],
        CASE 
            WHEN ISNULL(hv.[Значение], (
                SELECT TOP 1 hv2.[Значение]
                FROM HistoricalValues hv2
                WHERE hv2.[Дата] <= m.MonthStart
                ORDER BY hv2.[Дата] DESC
            )) = 1 THEN 'ОП'
            ELSE 'не ОП'
        END AS [Значение]
    FROM Months m
    LEFT JOIN HistoricalValues hv ON hv.[Дата] = m.MonthStart
),

ls AS (
    SELECT 
        l.row_id AS ls_id,
        li.Родитель AS house_id,
        CASE 
            WHEN ISNULL(ts_ls.Значение, ts.Значение) IN ('0', '2') THEN 'МКД'
            ELSE 'Частный'
        END AS house_type,
        CASE 
            WHEN lgot.Значение IS NULL THEN 'нет'
            ELSE 'да'
        END AS privileged
    FROM stack.[Лицевые счета] l 
    JOIN (
        SELECT 
            Потомок,
            Родитель,
            ROW_NUMBER() OVER (PARTITION BY Потомок ORDER BY Уровень) AS rn
        FROM stack.[Лицевые иерархия]
        WHERE РодительТип IN (3,12,14,13,1,0)
    ) li ON li.Потомок = l.row_id AND li.rn = 1
    OUTER APPLY (
        SELECT TOP 1 sv.Значение  
        FROM stack.Свойства sv
        JOIN stack.[Виды параметров] vp ON sv.[Виды-Параметры] = vp.ROW_ID AND vp.Название = 'ТИПСТРОЙ'
        WHERE sv.[Счет-Параметры] = li.Родитель AND @dn BETWEEN sv.ДатНач AND sv.ДатКнц
        ORDER BY sv.ДатКнц DESC
    ) ts
    OUTER APPLY (
        SELECT TOP 1 sv.Значение  
        FROM stack.Свойства sv
        JOIN stack.[Виды параметров] vp ON sv.[Виды-Параметры] = vp.ROW_ID AND vp.Название = 'ТИПСТРОЙ'
        WHERE sv.[Счет-Параметры] = l.row_id AND @dn BETWEEN sv.ДатНач AND sv.ДатКнц
        ORDER BY sv.ДатКнц DESC
    ) ts_ls
    OUTER APPLY (
        SELECT TOP 1 sv.Значение  
        FROM stack.Свойства sv
        WHERE sv.[Счет-Параметры] = l.row_id 
            AND @dn BETWEEN sv.ДатНач AND sv.ДатКнц 
            AND sv.[Виды-Параметры] = @p1 
            AND sv.Значение = 1 
        ORDER BY sv.ДатКнц DESC
    ) lgot
    WHERE l.тип = 5
),
-- 5. Service mapping (все значения из INSERT)
service AS (
    SELECT Услуга, ТипСтрой, Сезон, Строка_таблицы
    FROM (VALUES
        -- ОП Частный
        (101,'частный','ОП','п. 1.1'), (102,'частный','ОП','п. 3.1'), (103,'частный','ОП','п. 8.1'), (104,'частный','ОП','п. 4.1'), (105,'частный','ОП','п. 2.1'),
        (151,'частный','ОП','п. 1.1'), (152,'частный','ОП','п. 3.1'), (153,'частный','ОП','п. 8.1'), (154,'частный','ОП','п. 1.1'), (155,'частный','ОП','п. 3.1'),
        (156,'частный','ОП','п. 8.1'), (157,'частный','ОП','п. 1.1'), (158,'частный','ОП','п. 3.1'), (159,'частный','ОП','п. 8.1'), (160,'частный','ОП','п. 1.1'),
        (161,'частный','ОП','п. 3.1'), (162,'частный','ОП','п. 8.1'), (163,'частный','ОП','п. 1.1'), (164,'частный','ОП','п. 3.1'), (165,'частный','ОП','п. 8.1'),
        (166,'частный','ОП','п. 1.1'), (167,'частный','ОП','п. 3.1'), (168,'частный','ОП','п. 8.1'), (169,'частный','ОП','п. 4.1'), (170,'частный','ОП','п. 2.1'),
        (171,'частный','ОП','п. 4.1'), (172,'частный','ОП','п. 2.1'), (173,'частный','ОП','п. 4.1'), (174,'частный','ОП','п. 2.1'), (175,'частный','ОП','п. 4.1'),
        (176,'частный','ОП','п. 2.1'), (177,'частный','ОП','п. 4.1'), (178,'частный','ОП','п. 2.1'), (179,'частный','ОП','п. 4.1'), (180,'частный','ОП','п. 2.1'),
        (401,'частный','ОП','п. 1.1'), (402,'частный','ОП','п. 3.1'), (403,'частный','ОП','п. 8.1'), (404,'частный','ОП','п. 4.1'), (405,'частный','ОП','п. 2.1'),
        (406,'частный','ОП','п. 7.1'), (407,'частный','ОП','п. 6.1'), (408,'частный','ОП','п. 5.1'), (501,'частный','ОП','п. 7.1'), (502,'частный','ОП','п. 6.1'),
        (503,'частный','ОП','п. 5.1'), (551,'частный','ОП','п. 7.1'), (552,'частный','ОП','п. 6.1'), (553,'частный','ОП','п. 5.1'), (554,'частный','ОП','п. 7.1'),
        (555,'частный','ОП','п. 6.1'), (556,'частный','ОП','п. 5.1'), (557,'частный','ОП','п. 7.1'), (558,'частный','ОП','п. 6.1'), (559,'частный','ОП','п. 5.1'),
        (560,'частный','ОП','п. 7.1'), (561,'частный','ОП','п. 6.1'), (562,'частный','ОП','п. 5.1'), (563,'частный','ОП','п. 7.1'), (564,'частный','ОП','п. 6.1'),
        (565,'частный','ОП','п. 5.1'), (566,'частный','ОП','п. 7.1'), (567,'частный','ОП','п. 6.1'), (568,'частный','ОП','п. 5.1'),
        (201,'частный','ОП','п. 1.1'), (202,'частный','ОП','п. 3.1'), (203,'частный','ОП','п. 8.1'), (204,'частный','ОП','п. 4.1'), (205,'частный','ОП','п. 2.1'),
        (251,'частный','ОП','п. 1.1'), (252,'частный','ОП','п. 3.1'), (253,'частный','ОП','п. 8.1'), (254,'частный','ОП','п. 1.1'), (255,'частный','ОП','п. 3.1'),
        (256,'частный','ОП','п. 8.1'), (257,'частный','ОП','п. 1.1'), (258,'частный','ОП','п. 3.1'), (259,'частный','ОП','п. 8.1'), (260,'частный','ОП','п. 1.1'),
        (261,'частный','ОП','п. 3.1'), (262,'частный','ОП','п. 8.1'), (263,'частный','ОП','п. 1.1'), (264,'частный','ОП','п. 3.1'), (265,'частный','ОП','п. 8.1'),
        (266,'частный','ОП','п. 1.1'), (267,'частный','ОП','п. 3.1'), (268,'частный','ОП','п. 8.1'), (269,'частный','ОП','п. 4.1'), (270,'частный','ОП','п. 2.1'),
        (271,'частный','ОП','п. 4.1'), (272,'частный','ОП','п. 2.1'), (273,'частный','ОП','п. 4.1'), (274,'частный','ОП','п. 2.1'), (275,'частный','ОП','п. 4.1'),
        (276,'частный','ОП','п. 2.1'), (277,'частный','ОП','п. 4.1'), (278,'частный','ОП','п. 2.1'), (279,'частный','ОП','п. 4.1'), (280,'частный','ОП','п. 2.1'),
        (409,'частный','ОП','п. 1.1'), (410,'частный','ОП','п. 3.1'), (411,'частный','ОП','п. 8.1'), (412,'частный','ОП','п. 4.1'), (413,'частный','ОП','п. 2.1'),
        (414,'частный','ОП','п. 7.1'), (415,'частный','ОП','п. 6.1'), (416,'частный','ОП','п. 5.1'), (701,'частный','ОП','п. 7.1'), (702,'частный','ОП','п. 6.1'),
        (703,'частный','ОП','п. 5.1'), (751,'частный','ОП','п. 7.1'), (752,'частный','ОП','п. 6.1'), (753,'частный','ОП','п. 5.1'), (754,'частный','ОП','п. 7.1'),
        (755,'частный','ОП','п. 6.1'), (756,'частный','ОП','п. 5.1'), (757,'частный','ОП','п. 7.1'), (758,'частный','ОП','п. 6.1'), (759,'частный','ОП','п. 5.1'),
        (760,'частный','ОП','п. 7.1'), (761,'частный','ОП','п. 6.1'), (762,'частный','ОП','п. 5.1'), (763,'частный','ОП','п. 7.1'), (764,'частный','ОП','п. 6.1'),
        (765,'частный','ОП','п. 5.1'), (766,'частный','ОП','п. 7.1'), (767,'частный','ОП','п. 6.1'), (768,'частный','ОП','п. 5.1'),
        (417,'частный','ОП','п. 1.1'), (418,'частный','ОП','п. 3.1'), (419,'частный','ОП','п. 8.1'), (420,'частный','ОП','п. 4.1'), (421,'частный','ОП','п. 2.1'),
        (422,'частный','ОП','п. 7.1'), (423,'частный','ОП','п. 6.1'), (424,'частный','ОП','п. 5.1'), (601,'частный','ОП','п. 1.1'), (602,'частный','ОП','п. 3.1'),
        (603,'частный','ОП','п. 8.1'), (604,'частный','ОП','п. 4.1'), (605,'частный','ОП','п. 2.1'), (651,'частный','ОП','п. 1.1'), (652,'частный','ОП','п. 3.1'),
        (653,'частный','ОП','п. 8.1'), (654,'частный','ОП','п. 1.1'), (655,'частный','ОП','п. 3.1'), (656,'частный','ОП','п. 8.1'), (657,'частный','ОП','п. 1.1'),
        (658,'частный','ОП','п. 3.1'), (659,'частный','ОП','п. 8.1'), (660,'частный','ОП','п. 1.1'), (661,'частный','ОП','п. 3.1'), (662,'частный','ОП','п. 8.1'),
        (663,'частный','ОП','п. 1.1'), (664,'частный','ОП','п. 3.1'), (665,'частный','ОП','п. 8.1'), (666,'частный','ОП','п. 1.1'), (667,'частный','ОП','п. 3.1'),
        (668,'частный','ОП','п. 8.1'), (669,'частный','ОП','п. 4.1'), (670,'частный','ОП','п. 2.1'), (671,'частный','ОП','п. 4.1'), (672,'частный','ОП','п. 2.1'),
        (673,'частный','ОП','п. 4.1'), (674,'частный','ОП','п. 2.1'), (675,'частный','ОП','п. 4.1'), (676,'частный','ОП','п. 2.1'), (677,'частный','ОП','п. 4.1'),
        (678,'частный','ОП','п. 2.1'), (679,'частный','ОП','п. 4.1'), (680,'частный','ОП','п. 2.1'),
        (801,'частный','ОП','п. 7.1'), (802,'частный','ОП','п. 6.1'), (803,'частный','ОП','п. 5.1'), (851,'частный','ОП','п. 7.1'), (852,'частный','ОП','п. 6.1'),
        (853,'частный','ОП','п. 5.1'), (854,'частный','ОП','п. 7.1'), (855,'частный','ОП','п. 6.1'), (856,'частный','ОП','п. 5.1'), (857,'частный','ОП','п. 7.1'),
        (858,'частный','ОП','п. 6.1'), (859,'частный','ОП','п. 5.1'), (860,'частный','ОП','п. 7.1'), (861,'частный','ОП','п. 6.1'), (862,'частный','ОП','п. 5.1'),
        (863,'частный','ОП','п. 7.1'), (864,'частный','ОП','п. 6.1'), (865,'частный','ОП','п. 5.1'), (866,'частный','ОП','п. 7.1'), (867,'частный','ОП','п. 6.1'),
        (868,'частный','ОП','п. 5.1'),
        (197,'частный','ОП','не заполняется'), (199,'частный','ОП','не заполняется'), (297,'частный','ОП','не заполняется'), (697,'частный','ОП','не заполняется'),
        (146,'частный','ОП','не заполняется'), (191,'частный','ОП','не заполняется'), (192,'частный','ОП','не заполняется'), (193,'частный','ОП','не заполняется'),
        (194,'частный','ОП','не заполняется'), (546,'частный','ОП','не заполняется'), (591,'частный','ОП','не заполняется'), (592,'частный','ОП','не заполняется'),
        (593,'частный','ОП','не заполняется'), (594,'частный','ОП','не заполняется'),
        -- не ОП Частный
        (101,'частный','не ОП','п. 1.1'), (102,'частный','не ОП','п. 3.1'), (103,'частный','не ОП','п. 8.1'), (104,'частный','не ОП','п. 4.2'), (105,'частный','не ОП','п. 2.2'),
        (151,'частный','не ОП','п. 1.1'), (152,'частный','не ОП','п. 3.1'), (153,'частный','не ОП','п. 8.1'), (154,'частный','не ОП','п. 1.1'), (155,'частный','не ОП','п. 3.1'),
        (156,'частный','не ОП','п. 8.1'), (157,'частный','не ОП','п. 1.1'), (158,'частный','не ОП','п. 3.1'), (159,'частный','не ОП','п. 8.1'), (160,'частный','не ОП','п. 1.1'),
        (161,'частный','не ОП','п. 3.1'), (162,'частный','не ОП','п. 8.1'), (163,'частный','не ОП','п. 1.1'), (164,'частный','не ОП','п. 3.1'), (165,'частный','не ОП','п. 8.1'),
        (166,'частный','не ОП','п. 1.1'), (167,'частный','не ОП','п. 3.1'), (168,'частный','не ОП','п. 8.1'), (169,'частный','не ОП','п. 4.2'), (170,'частный','не ОП','п. 2.2'),
        (171,'частный','не ОП','п. 4.2'), (172,'частный','не ОП','п. 2.2'), (173,'частный','не ОП','п. 4.2'), (174,'частный','не ОП','п. 2.2'), (175,'частный','не ОП','п. 4.2'),
        (176,'частный','не ОП','п. 2.2'), (177,'частный','не ОП','п. 4.2'), (178,'частный','не ОП','п. 2.2'), (179,'частный','не ОП','п. 4.2'), (180,'частный','не ОП','п. 2.2'),
        (401,'частный','не ОП','п. 1.1'), (402,'частный','не ОП','п. 3.1'), (403,'частный','не ОП','п. 8.1'), (404,'частный','не ОП','п. 4.2'), (405,'частный','не ОП','п. 2.2'),
        (406,'частный','не ОП','п. 7.2'), (407,'частный','не ОП','п. 6.1'), (408,'частный','не ОП','п. 5.2'), (501,'частный','не ОП','п. 7.2'), (502,'частный','не ОП','п. 6.1'),
        (503,'частный','не ОП','п. 5.2'), (551,'частный','не ОП','п. 7.2'), (552,'частный','не ОП','п. 6.1'), (553,'частный','не ОП','п. 5.2'), (554,'частный','не ОП','п. 7.2'),
        (555,'частный','не ОП','п. 6.1'), (556,'частный','не ОП','п. 5.2'), (557,'частный','не ОП','п. 7.2'), (558,'частный','не ОП','п. 6.1'), (559,'частный','не ОП','п. 5.2'),
        (560,'частный','не ОП','п. 7.2'), (561,'частный','не ОП','п. 6.1'), (562,'частный','не ОП','п. 5.2'), (563,'частный','не ОП','п. 7.2'), (564,'частный','не ОП','п. 6.1'),
        (565,'частный','не ОП','п. 5.2'), (566,'частный','не ОП','п. 7.2'), (567,'частный','не ОП','п. 6.1'), (568,'частный','не ОП','п. 5.2'),
        (201,'частный','не ОП','п. 1.1'), (202,'частный','не ОП','п. 3.1'), (203,'частный','не ОП','п. 8.1'), (204,'частный','не ОП','п. 4.2'), (205,'частный','не ОП','п. 2.2'),
        (251,'частный','не ОП','п. 1.1'), (252,'частный','не ОП','п. 3.1'), (253,'частный','не ОП','п. 8.1'), (254,'частный','не ОП','п. 1.1'), (255,'частный','не ОП','п. 3.1'),
        (256,'частный','не ОП','п. 8.1'), (257,'частный','не ОП','п. 1.1'), (258,'частный','не ОП','п. 3.1'), (259,'частный','не ОП','п. 8.1'), (260,'частный','не ОП','п. 1.1'),
        (261,'частный','не ОП','п. 3.1'), (262,'частный','не ОП','п. 8.1'), (263,'частный','не ОП','п. 1.1'), (264,'частный','не ОП','п. 3.1'), (265,'частный','не ОП','п. 8.1'),
        (266,'частный','не ОП','п. 1.1'), (267,'частный','не ОП','п. 3.1'), (268,'частный','не ОП','п. 8.1'), (269,'частный','не ОП','п. 4.2'), (270,'частный','не ОП','п. 2.2'),
        (271,'частный','не ОП','п. 4.2'), (272,'частный','не ОП','п. 2.2'), (273,'частный','не ОП','п. 4.2'), (274,'частный','не ОП','п. 2.2'), (275,'частный','не ОП','п. 4.2'),
        (276,'частный','не ОП','п. 2.2'), (277,'частный','не ОП','п. 4.2'), (278,'частный','не ОП','п. 2.2'), (279,'частный','не ОП','п. 4.2'), (280,'частный','не ОП','п. 2.2'),
        (409,'частный','не ОП','п. 1.1'), (410,'частный','не ОП','п. 3.1'), (411,'частный','не ОП','п. 8.1'), (412,'частный','не ОП','п. 4.2'), (413,'частный','не ОП','п. 2.2'),
        (414,'частный','не ОП','п. 7.2'), (415,'частный','не ОП','п. 6.1'), (416,'частный','не ОП','п. 5.2'), (701,'частный','не ОП','п. 7.2'), (702,'частный','не ОП','п. 6.1'),
        (703,'частный','не ОП','п. 5.2'), (751,'частный','не ОП','п. 7.2'), (752,'частный','не ОП','п. 6.1'), (753,'частный','не ОП','п. 5.2'), (754,'частный','не ОП','п. 7.2'),
        (755,'частный','не ОП','п. 6.1'), (756,'частный','не ОП','п. 5.2'), (757,'частный','не ОП','п. 7.2'), (758,'частный','не ОП','п. 6.1'), (759,'частный','не ОП','п. 5.2'),
        (760,'частный','не ОП','п. 7.2'), (761,'частный','не ОП','п. 6.1'), (762,'частный','не ОП','п. 5.2'), (763,'частный','не ОП','п. 7.2'), (764,'частный','не ОП','п. 6.1'),
        (765,'частный','не ОП','п. 5.2'), (766,'частный','не ОП','п. 7.2'), (767,'частный','не ОП','п. 6.1'), (768,'частный','не ОП','п. 5.2'),
        (417,'частный','не ОП','п. 1.1'), (418,'частный','не ОП','п. 3.1'), (419,'частный','не ОП','п. 8.1'), (420,'частный','не ОП','п. 4.2'), (421,'частный','не ОП','п. 2.2'),
        (422,'частный','не ОП','п. 7.2'), (423,'частный','не ОП','п. 6.1'), (424,'частный','не ОП','п. 5.2'), (601,'частный','не ОП','п. 1.1'), (602,'частный','не ОП','п. 3.1'),
        (603,'частный','не ОП','п. 8.1'), (604,'частный','не ОП','п. 4.2'), (605,'частный','не ОП','п. 2.2'), (651,'частный','не ОП','п. 1.1'), (652,'частный','не ОП','п. 3.1'),
        (653,'частный','не ОП','п. 8.1'), (654,'частный','не ОП','п. 1.1'), (655,'частный','не ОП','п. 3.1'), (656,'частный','не ОП','п. 8.1'), (657,'частный','не ОП','п. 1.1'),
        (658,'частный','не ОП','п. 3.1'), (659,'частный','не ОП','п. 8.1'), (660,'частный','не ОП','п. 1.1'), (661,'частный','не ОП','п. 3.1'), (662,'частный','не ОП','п. 8.1'),
        (663,'частный','не ОП','п. 1.1'), (664,'частный','не ОП','п. 3.1'), (665,'частный','не ОП','п. 8.1'), (666,'частный','не ОП','п. 1.1'), (667,'частный','не ОП','п. 3.1'),
        (668,'частный','не ОП','п. 8.1'), (669,'частный','не ОП','п. 4.2'), (670,'частный','не ОП','п. 2.2'), (671,'частный','не ОП','п. 4.2'), (672,'частный','не ОП','п. 2.2'),
        (673,'частный','не ОП','п. 4.2'), (674,'частный','не ОП','п. 2.2'), (675,'частный','не ОП','п. 4.2'), (676,'частный','не ОП','п. 2.2'), (677,'частный','не ОП','п. 4.2'),
        (678,'частный','не ОП','п. 2.2'), (679,'частный','не ОП','п. 4.2'), (680,'частный','не ОП','п. 2.2'),
        (801,'частный','не ОП','п. 7.2'), (802,'частный','не ОП','п. 6.1'), (803,'частный','не ОП','п. 5.2'), (851,'частный','не ОП','п. 7.2'), (852,'частный','не ОП','п. 6.1'),
        (853,'частный','не ОП','п. 5.2'), (854,'частный','не ОП','п. 7.2'), (855,'частный','не ОП','п. 6.1'), (856,'частный','не ОП','п. 5.2'), (857,'частный','не ОП','п. 7.2'),
        (858,'частный','не ОП','п. 6.1'), (859,'частный','не ОП','п. 5.2'), (860,'частный','не ОП','п. 7.2'), (861,'частный','не ОП','п. 6.1'), (862,'частный','не ОП','п. 5.2'),
        (863,'частный','не ОП','п. 7.2'), (864,'частный','не ОП','п. 6.1'), (865,'частный','не ОП','п. 5.2'), (866,'частный','не ОП','п. 7.2'), (867,'частный','не ОП','п. 6.1'),
        (868,'частный','не ОП','п. 5.2'),
        (197,'частный','не ОП','не заполняется'), (199,'частный','не ОП','не заполняется'), (297,'частный','не ОП','не заполняется'), (697,'частный','не ОП','не заполняется'),
        (146,'частный','не ОП','не заполняется'), (191,'частный','не ОП','не заполняется'), (192,'частный','не ОП','не заполняется'), (193,'частный','не ОП','не заполняется'),
        (194,'частный','не ОП','не заполняется'), (546,'частный','не ОП','не заполняется'), (591,'частный','не ОП','не заполняется'), (592,'частный','не ОП','не заполняется'),
        (593,'частный','не ОП','не заполняется'), (594,'частный','не ОП','не заполняется'),
        -- ОП МКД
        (101,'МКД','ОП','п. 1.4'), (102,'МКД','ОП','п. 3.2'), (103,'МКД','ОП','п. 8.2'), (104,'МКД','ОП','п. 4.3'), (105,'МКД','ОП','п. 2.3'),
        (151,'МКД','ОП','п. 1.4'), (152,'МКД','ОП','п. 3.2'), (153,'МКД','ОП','п. 8.2'), (154,'МКД','ОП','п. 1.4'), (155,'МКД','ОП','п. 3.2'),
        (156,'МКД','ОП','п. 8.2'), (157,'МКД','ОП','п. 1.4'), (158,'МКД','ОП','п. 3.2'), (159,'МКД','ОП','п. 8.2'), (160,'МКД','ОП','п. 1.4'),
        (161,'МКД','ОП','п. 3.2'), (162,'МКД','ОП','п. 8.2'), (163,'МКД','ОП','п. 1.4'), (164,'МКД','ОП','п. 3.2'), (165,'МКД','ОП','п. 8.2'),
        (166,'МКД','ОП','п. 1.4'), (167,'МКД','ОП','п. 3.2'), (168,'МКД','ОП','п. 8.2'), (169,'МКД','ОП','п. 4.3'), (170,'МКД','ОП','п. 2.3'),
        (171,'МКД','ОП','п. 4.3'), (172,'МКД','ОП','п. 2.3'), (173,'МКД','ОП','п. 4.3'), (174,'МКД','ОП','п. 2.3'), (175,'МКД','ОП','п. 4.3'),
        (176,'МКД','ОП','п. 2.3'), (177,'МКД','ОП','п. 4.3'), (178,'МКД','ОП','п. 2.3'), (179,'МКД','ОП','п. 4.3'), (180,'МКД','ОП','п. 2.3'),
        (401,'МКД','ОП','п. 1.4'), (402,'МКД','ОП','п. 3.2'), (403,'МКД','ОП','п. 8.2'), (404,'МКД','ОП','п. 4.3'), (405,'МКД','ОП','п. 2.3'),
        (406,'МКД','ОП','п. 7.3'), (407,'МКД','ОП','п. 6.2'), (408,'МКД','ОП','п. 5.3'), (501,'МКД','ОП','п. 7.3'), (502,'МКД','ОП','п. 6.2'),
        (503,'МКД','ОП','п. 5.3'), (551,'МКД','ОП','п. 7.3'), (552,'МКД','ОП','п. 6.2'), (553,'МКД','ОП','п. 5.3'), (554,'МКД','ОП','п. 7.3'),
        (555,'МКД','ОП','п. 6.2'), (556,'МКД','ОП','п. 5.3'), (557,'МКД','ОП','п. 7.3'), (558,'МКД','ОП','п. 6.2'), (559,'МКД','ОП','п. 5.3'),
        (560,'МКД','ОП','п. 7.3'), (561,'МКД','ОП','п. 6.2'), (562,'МКД','ОП','п. 5.3'), (563,'МКД','ОП','п. 7.3'), (564,'МКД','ОП','п. 6.2'),
        (565,'МКД','ОП','п. 5.3'), (566,'МКД','ОП','п. 7.3'), (567,'МКД','ОП','п. 6.2'), (568,'МКД','ОП','п. 5.3'),
        (201,'МКД','ОП','п. 1.4'), (202,'МКД','ОП','п. 3.2'), (203,'МКД','ОП','п. 8.2'), (204,'МКД','ОП','п. 4.3'), (205,'МКД','ОП','п. 2.3'),
        (251,'МКД','ОП','п. 1.4'), (252,'МКД','ОП','п. 3.2'), (253,'МКД','ОП','п. 8.2'), (254,'МКД','ОП','п. 1.4'), (255,'МКД','ОП','п. 3.2'),
        (256,'МКД','ОП','п. 8.2'), (257,'МКД','ОП','п. 1.4'), (258,'МКД','ОП','п. 3.2'), (259,'МКД','ОП','п. 8.2'), (260,'МКД','ОП','п. 1.4'),
        (261,'МКД','ОП','п. 3.2'), (262,'МКД','ОП','п. 8.2'), (263,'МКД','ОП','п. 1.4'), (264,'МКД','ОП','п. 3.2'), (265,'МКД','ОП','п. 8.2'),
        (266,'МКД','ОП','п. 1.4'), (267,'МКД','ОП','п. 3.2'), (268,'МКД','ОП','п. 8.2'), (269,'МКД','ОП','п. 4.3'), (270,'МКД','ОП','п. 2.3'),
        (271,'МКД','ОП','п. 4.3'), (272,'МКД','ОП','п. 2.3'), (273,'МКД','ОП','п. 4.3'), (274,'МКД','ОП','п. 2.3'), (275,'МКД','ОП','п. 4.3'),
        (276,'МКД','ОП','п. 2.3'), (277,'МКД','ОП','п. 4.3'), (278,'МКД','ОП','п. 2.3'), (279,'МКД','ОП','п. 4.3'), (280,'МКД','ОП','п. 2.3'),
        (409,'МКД','ОП','п. 1.4'), (410,'МКД','ОП','п. 3.2'), (411,'МКД','ОП','п. 8.2'), (412,'МКД','ОП','п. 4.3'), (413,'МКД','ОП','п. 2.3'),
        (414,'МКД','ОП','п. 7.3'), (415,'МКД','ОП','п. 6.2'), (416,'МКД','ОП','п. 5.3'), (701,'МКД','ОП','п. 7.3'), (702,'МКД','ОП','п. 6.2'),
        (703,'МКД','ОП','п. 5.3'), (751,'МКД','ОП','п. 7.3'), (752,'МКД','ОП','п. 6.2'), (753,'МКД','ОП','п. 5.3'), (754,'МКД','ОП','п. 7.3'),
        (755,'МКД','ОП','п. 6.2'), (756,'МКД','ОП','п. 5.3'), (757,'МКД','ОП','п. 7.3'), (758,'МКД','ОП','п. 6.2'), (759,'МКД','ОП','п. 5.3'),
        (760,'МКД','ОП','п. 7.3'), (761,'МКД','ОП','п. 6.2'), (762,'МКД','ОП','п. 5.3'), (763,'МКД','ОП','п. 7.3'), (764,'МКД','ОП','п. 6.2'),
        (765,'МКД','ОП','п. 5.3'), (766,'МКД','ОП','п. 7.3'), (767,'МКД','ОП','п. 6.2'), (768,'МКД','ОП','п. 5.3'),
        (417,'МКД','ОП','п. 1.4'), (418,'МКД','ОП','п. 3.2'), (419,'МКД','ОП','п. 8.2'), (420,'МКД','ОП','п. 4.3'), (421,'МКД','ОП','п. 2.3'),
        (422,'МКД','ОП','п. 7.3'), (423,'МКД','ОП','п. 6.2'), (424,'МКД','ОП','п. 5.3'), (601,'МКД','ОП','п. 1.4'), (602,'МКД','ОП','п. 3.2'),
        (603,'МКД','ОП','п. 8.2'), (604,'МКД','ОП','п. 4.3'), (605,'МКД','ОП','п. 2.3'), (651,'МКД','ОП','п. 1.4'), (652,'МКД','ОП','п. 3.2'),
        (653,'МКД','ОП','п. 8.2'), (654,'МКД','ОП','п. 1.4'), (655,'МКД','ОП','п. 3.2'), (656,'МКД','ОП','п. 8.2'), (657,'МКД','ОП','п. 1.4'),
        (658,'МКД','ОП','п. 3.2'), (659,'МКД','ОП','п. 8.2'), (660,'МКД','ОП','п. 1.4'), (661,'МКД','ОП','п. 3.2'), (662,'МКД','ОП','п. 8.2'),
        (663,'МКД','ОП','п. 1.4'), (664,'МКД','ОП','п. 3.2'), (665,'МКД','ОП','п. 8.2'), (666,'МКД','ОП','п. 1.4'), (667,'МКД','ОП','п. 3.2'),
        (668,'МКД','ОП','п. 8.2'), (669,'МКД','ОП','п. 4.3'), (670,'МКД','ОП','п. 2.3'), (671,'МКД','ОП','п. 4.3'), (672,'МКД','ОП','п. 2.3'),
        (673,'МКД','ОП','п. 4.3'), (674,'МКД','ОП','п. 2.3'), (675,'МКД','ОП','п. 4.3'), (676,'МКД','ОП','п. 2.3'), (677,'МКД','ОП','п. 4.3'),
        (678,'МКД','ОП','п. 2.3'), (679,'МКД','ОП','п. 4.3'), (680,'МКД','ОП','п. 2.3'),
        (801,'МКД','ОП','п. 7.3'), (802,'МКД','ОП','п. 6.2'), (803,'МКД','ОП','п. 5.3'), (851,'МКД','ОП','п. 7.3'), (852,'МКД','ОП','п. 6.2'),
        (853,'МКД','ОП','п. 5.3'), (854,'МКД','ОП','п. 7.3'), (855,'МКД','ОП','п. 6.2'), (856,'МКД','ОП','п. 5.3'), (857,'МКД','ОП','п. 7.3'),
        (858,'МКД','ОП','п. 6.2'), (859,'МКД','ОП','п. 5.3'), (860,'МКД','ОП','п. 7.3'), (861,'МКД','ОП','п. 6.2'), (862,'МКД','ОП','п. 5.3'),
        (863,'МКД','ОП','п. 7.3'), (864,'МКД','ОП','п. 6.2'), (865,'МКД','ОП','п. 5.3'), (866,'МКД','ОП','п. 7.3'), (867,'МКД','ОП','п. 6.2'),
        (868,'МКД','ОП','п. 5.3'),
        (197,'МКД','ОП','не заполняется'), (199,'МКД','ОП','не заполняется'), (297,'МКД','ОП','не заполняется'), (697,'МКД','ОП','не заполняется'),
        (146,'МКД','ОП','не заполняется'), (191,'МКД','ОП','не заполняется'), (192,'МКД','ОП','не заполняется'), (193,'МКД','ОП','не заполняется'),
        (194,'МКД','ОП','не заполняется'), (546,'МКД','ОП','не заполняется'), (591,'МКД','ОП','не заполняется'), (592,'МКД','ОП','не заполняется'),
        (593,'МКД','ОП','не заполняется'), (594,'МКД','ОП','не заполняется'),
        -- не ОП МКД
        (101,'МКД','не ОП','п. 1.4'), (102,'МКД','не ОП','п. 3.2'), (103,'МКД','не ОП','п. 8.2'), (104,'МКД','не ОП','п. 4.6'), (105,'МКД','не ОП','п. 2.6'),
        (151,'МКД','не ОП','п. 1.4'), (152,'МКД','не ОП','п. 3.2'), (153,'МКД','не ОП','п. 8.2'), (154,'МКД','не ОП','п. 1.4'), (155,'МКД','не ОП','п. 3.2'),
        (156,'МКД','не ОП','п. 8.2'), (157,'МКД','не ОП','п. 1.4'), (158,'МКД','не ОП','п. 3.2'), (159,'МКД','не ОП','п. 8.2'), (160,'МКД','не ОП','п. 1.4'),
        (161,'МКД','не ОП','п. 3.2'), (162,'МКД','не ОП','п. 8.2'), (163,'МКД','не ОП','п. 1.4'), (164,'МКД','не ОП','п. 3.2'), (165,'МКД','не ОП','п. 8.2'),
        (166,'МКД','не ОП','п. 1.4'), (167,'МКД','не ОП','п. 3.2'), (168,'МКД','не ОП','п. 8.2'), (169,'МКД','не ОП','п. 4.6'), (170,'МКД','не ОП','п. 2.6'),
        (171,'МКД','не ОП','п. 4.6'), (172,'МКД','не ОП','п. 2.6'), (173,'МКД','не ОП','п. 4.6'), (174,'МКД','не ОП','п. 2.6'), (175,'МКД','не ОП','п. 4.6'),
        (176,'МКД','не ОП','п. 2.6'), (177,'МКД','не ОП','п. 4.6'), (178,'МКД','не ОП','п. 2.6'), (179,'МКД','не ОП','п. 4.6'), (180,'МКД','не ОП','п. 2.6'),
        (401,'МКД','не ОП','п. 1.4'), (402,'МКД','не ОП','п. 3.2'), (403,'МКД','не ОП','п. 8.2'), (404,'МКД','не ОП','п. 4.6'), (405,'МКД','не ОП','п. 2.6'),
        (406,'МКД','не ОП','п. 7.6'), (407,'МКД','не ОП','п. 6.2'), (408,'МКД','не ОП','п. 5.6'), (501,'МКД','не ОП','п. 7.6'), (502,'МКД','не ОП','п. 6.2'),
        (503,'МКД','не ОП','п. 5.6'), (551,'МКД','не ОП','п. 7.6'), (552,'МКД','не ОП','п. 6.2'), (553,'МКД','не ОП','п. 5.6'), (554,'МКД','не ОП','п. 7.6'),
        (555,'МКД','не ОП','п. 6.2'), (556,'МКД','не ОП','п. 5.6'), (557,'МКД','не ОП','п. 7.6'), (558,'МКД','не ОП','п. 6.2'), (559,'МКД','не ОП','п. 5.6'),
        (560,'МКД','не ОП','п. 7.6'), (561,'МКД','не ОП','п. 6.2'), (562,'МКД','не ОП','п. 5.6'), (563,'МКД','не ОП','п. 7.6'), (564,'МКД','не ОП','п. 6.2'),
        (565,'МКД','не ОП','п. 5.6'), (566,'МКД','не ОП','п. 7.6'), (567,'МКД','не ОП','п. 6.2'), (568,'МКД','не ОП','п. 5.6'),
        (201,'МКД','не ОП','п. 1.4'), (202,'МКД','не ОП','п. 3.2'), (203,'МКД','не ОП','п. 8.2'), (204,'МКД','не ОП','п. 4.6'), (205,'МКД','не ОП','п. 2.6'),
        (251,'МКД','не ОП','п. 1.4'), (252,'МКД','не ОП','п. 3.2'), (253,'МКД','не ОП','п. 8.2'), (254,'МКД','не ОП','п. 1.4'), (255,'МКД','не ОП','п. 3.2'),
        (256,'МКД','не ОП','п. 8.2'), (257,'МКД','не ОП','п. 1.4'), (258,'МКД','не ОП','п. 3.2'), (259,'МКД','не ОП','п. 8.2'), (260,'МКД','не ОП','п. 1.4'),
        (261,'МКД','не ОП','п. 3.2'), (262,'МКД','не ОП','п. 8.2'), (263,'МКД','не ОП','п. 1.4'), (264,'МКД','не ОП','п. 3.2'), (265,'МКД','не ОП','п. 8.2'),
        (266,'МКД','не ОП','п. 1.4'), (267,'МКД','не ОП','п. 3.2'), (268,'МКД','не ОП','п. 8.2'), (269,'МКД','не ОП','п. 4.6'), (270,'МКД','не ОП','п. 2.6'),
        (271,'МКД','не ОП','п. 4.6'), (272,'МКД','не ОП','п. 2.6'), (273,'МКД','не ОП','п. 4.6'), (274,'МКД','не ОП','п. 2.6'), (275,'МКД','не ОП','п. 4.6'),
        (276,'МКД','не ОП','п. 2.6'), (277,'МКД','не ОП','п. 4.6'), (278,'МКД','не ОП','п. 2.6'), (279,'МКД','не ОП','п. 4.6'), (280,'МКД','не ОП','п. 2.6'),
        (409,'МКД','не ОП','п. 1.4'), (410,'МКД','не ОП','п. 3.2'), (411,'МКД','не ОП','п. 8.2'), (412,'МКД','не ОП','п. 4.6'), (413,'МКД','не ОП','п. 2.6'),
        (414,'МКД','не ОП','п. 7.6'), (415,'МКД','не ОП','п. 6.2'), (416,'МКД','не ОП','п. 5.6'), (701,'МКД','не ОП','п. 7.6'), (702,'МКД','не ОП','п. 6.2'),
        (703,'МКД','не ОП','п. 5.6'), (751,'МКД','не ОП','п. 7.6'), (752,'МКД','не ОП','п. 6.2'), (753,'МКД','не ОП','п. 5.6'), (754,'МКД','не ОП','п. 7.6'),
        (755,'МКД','не ОП','п. 6.2'), (756,'МКД','не ОП','п. 5.6'), (757,'МКД','не ОП','п. 7.6'), (758,'МКД','не ОП','п. 6.2'), (759,'МКД','не ОП','п. 5.6'),
        (760,'МКД','не ОП','п. 7.6'), (761,'МКД','не ОП','п. 6.2'), (762,'МКД','не ОП','п. 5.6'), (763,'МКД','не ОП','п. 7.6'), (764,'МКД','не ОП','п. 6.2'),
        (765,'МКД','не ОП','п. 5.6'), (766,'МКД','не ОП','п. 7.6'), (767,'МКД','не ОП','п. 6.2'), (768,'МКД','не ОП','п. 5.6'),
        (417,'МКД','не ОП','п. 1.4'), (418,'МКД','не ОП','п. 3.2'), (419,'МКД','не ОП','п. 8.2'), (420,'МКД','не ОП','п. 4.6'), (421,'МКД','не ОП','п. 2.6'),
        (422,'МКД','не ОП','п. 7.6'), (423,'МКД','не ОП','п. 6.2'), (424,'МКД','не ОП','п. 5.6'), (601,'МКД','не ОП','п. 1.4'), (602,'МКД','не ОП','п. 3.2'),
        (603,'МКД','не ОП','п. 8.2'), (604,'МКД','не ОП','п. 4.6'), (605,'МКД','не ОП','п. 2.6'), (651,'МКД','не ОП','п. 1.4'), (652,'МКД','не ОП','п. 3.2'),
        (653,'МКД','не ОП','п. 8.2'), (654,'МКД','не ОП','п. 1.4'), (655,'МКД','не ОП','п. 3.2'), (656,'МКД','не ОП','п. 8.2'), (657,'МКД','не ОП','п. 1.4'),
        (658,'МКД','не ОП','п. 3.2'), (659,'МКД','не ОП','п. 8.2'), (660,'МКД','не ОП','п. 1.4'), (661,'МКД','не ОП','п. 3.2'), (662,'МКД','не ОП','п. 8.2'),
        (663,'МКД','не ОП','п. 1.4'), (664,'МКД','не ОП','п. 3.2'), (665,'МКД','не ОП','п. 8.2'), (666,'МКД','не ОП','п. 1.4'), (667,'МКД','не ОП','п. 3.2'),
        (668,'МКД','не ОП','п. 8.2'), (669,'МКД','не ОП','п. 4.6'), (670,'МКД','не ОП','п. 2.6'), (671,'МКД','не ОП','п. 4.6'), (672,'МКД','не ОП','п. 2.6'),
        (673,'МКД','не ОП','п. 4.6'), (674,'МКД','не ОП','п. 2.6'), (675,'МКД','не ОП','п. 4.6'), (676,'МКД','не ОП','п. 2.6'), (677,'МКД','не ОП','п. 4.6'),
        (678,'МКД','не ОП','п. 2.6'), (679,'МКД','не ОП','п. 4.6'), (680,'МКД','не ОП','п. 2.6'),
        (801,'МКД','не ОП','п. 7.6'), (802,'МКД','не ОП','п. 6.2'), (803,'МКД','не ОП','п. 5.6'), (851,'МКД','не ОП','п. 7.6'), (852,'МКД','не ОП','п. 6.2'),
        (853,'МКД','не ОП','п. 5.6'), (854,'МКД','не ОП','п. 7.6'), (855,'МКД','не ОП','п. 6.2'), (856,'МКД','не ОП','п. 5.6'), (857,'МКД','не ОП','п. 7.6'),
        (858,'МКД','не ОП','п. 6.2'), (859,'МКД','не ОП','п. 5.6'), (860,'МКД','не ОП','п. 7.6'), (861,'МКД','не ОП','п. 6.2'), (862,'МКД','не ОП','п. 5.6'),
        (863,'МКД','не ОП','п. 7.6'), (864,'МКД','не ОП','п. 6.2'), (865,'МКД','не ОП','п. 5.6'), (866,'МКД','не ОП','п. 7.6'), (867,'МКД','не ОП','п. 6.2'),
        (868,'МКД','не ОП','п. 5.6'),
        (197,'МКД','не ОП','не заполняется'), (199,'МКД','не ОП','не заполняется'), (297,'МКД','не ОП','не заполняется'), (697,'МКД','не ОП','не заполняется'),
        (146,'МКД','не ОП','не заполняется'), (191,'МКД','не ОП','не заполняется'), (192,'МКД','не ОП','не заполняется'), (193,'МКД','не ОП','не заполняется'),
        (194,'МКД','не ОП','не заполняется'), (546,'МКД','не ОП','не заполняется'), (591,'МКД','не ОП','не заполняется'), (592,'МКД','не ОП','не заполняется'),
        (593,'МКД','не ОП','не заполняется'), (594,'МКД','не ОП','не заполняется')
    ) AS s(Услуга, ТипСтрой, Сезон, Строка_таблицы)
),


data_tarif AS (
    SELECT 
        'ФЛ' AS БД,
        nl.[Месяц расчета] AS Месяц,
        ls.Номер AS ЛС,
        l.privileged,
        hs.Значение AS heating,
        l.house_type,
        nl.[Номер услуги] AS Услуга,
        nl.ДоговорУК,
        nl.Поставщик,
        CASE 
            WHEN (l.privileged = 'да') OR (@reg IN (51,67) AND org.Наименование NOT LIKE '%Росатом Энергосбыт%') 
            THEN 'не заполняется' 
            ELSE s.Строка_таблицы 
        END AS Строка_таблицы,
        0 AS ОбъемПер,
        0 AS СуммаПер,
        CAST(nl.Объем AS NUMERIC(16,3)) AS Объем,
        CAST(nl.Сумма AS NUMERIC(16,3)) AS Сумма
    FROM stack.НТариф nl
    JOIN ls l ON l.ls_id = nl.Счет
    JOIN heating_season hs ON hs.Дата = nl.[Месяц расчета]
    JOIN stack.[Лицевые счета] ls ON ls.row_id = l.ls_id
    JOIN service s ON s.Услуга = nl.[Номер услуги] 
        AND s.Сезон = hs.Значение 
        AND LOWER(s.ТипСтрой) = LOWER(l.house_type)
    LEFT JOIN stack.[УК Договоры] ukd ON ukd.row_id = nl.ДоговорУК
    LEFT JOIN stack.Организации org ON org.row_id = ukd.[Организация-УКДоговор]
    WHERE nl.[Месяц расчета] BETWEEN @dn AND @dk 
    
    UNION ALL
    
    SELECT 
        'ФЛ', nl.[Месяц расчета], ls.Номер, l.privileged, hs.Значение, l.house_type,
        nl.[Номер услуги], nl.ДоговорУК, nl.Поставщик,
        CASE 
            WHEN (l.privileged = 'да') OR (@reg IN (51,67) AND org.Наименование NOT LIKE '%Росатом Энергосбыт%') 
            THEN 'не заполняется' 
            ELSE s.Строка_таблицы 
        END,
        0, 0,
        CAST(nl.Объем AS NUMERIC(16,3)),
        CAST(nl.Сумма AS NUMERIC(16,3))
    FROM stack.НПТариф nl
    JOIN ls l ON l.ls_id = nl.Счет
    JOIN heating_season hs ON hs.Дата = nl.[Месяц расчета]
    JOIN stack.[Лицевые счета] ls ON ls.row_id = l.ls_id
    JOIN service s ON s.Услуга = nl.[Номер услуги] 
        AND s.Сезон = hs.Значение 
        AND LOWER(s.ТипСтрой) = LOWER(l.house_type)
    LEFT JOIN stack.[УК Договоры] ukd ON ukd.row_id = nl.ДоговорУК
    LEFT JOIN stack.Организации org ON org.row_id = ukd.[Организация-УКДоговор]
    WHERE nl.[Месяц расчета] BETWEEN @dn AND @dk 
        AND nl.Перерасчет >= @startOfYear

    UNION ALL

    SELECT 
        'ФЛ', nl.[Месяц расчета], ls.Номер, l.privileged, hs.Значение, l.house_type,
        nl.[Номер услуги], nl.ДоговорУК, nl.Поставщик,
        CASE 
            WHEN (l.privileged = 'да') OR (@reg IN (51,67) AND org.Наименование NOT LIKE '%Росатом Энергосбыт%') 
            THEN 'не заполняется' 
            ELSE s.Строка_таблицы 
        END,
        nl.Объем, nl.Сумма,
        0, 0
    FROM stack.НПТариф nl
    JOIN ls l ON l.ls_id = nl.Счет
    JOIN heating_season hs ON hs.Дата = nl.[Месяц расчета]
    JOIN stack.[Лицевые счета] ls ON ls.row_id = l.ls_id
    JOIN service s ON s.Услуга = nl.[Номер услуги] 
        AND s.Сезон = hs.Значение 
        AND LOWER(s.ТипСтрой) = LOWER(l.house_type)
    LEFT JOIN stack.[УК Договоры] ukd ON ukd.row_id = nl.ДоговорУК
    LEFT JOIN stack.Организации org ON org.row_id = ukd.[Организация-УКДоговор]
    WHERE nl.[Месяц расчета] BETWEEN @dn AND @dk 
        AND nl.Перерасчет < @startOfYear
),

-- Сначала агрегируем по ЛС (как в оригинале)
ls_totals AS (
    SELECT 
        БД, Месяц, ЛС, privileged AS СоцПоддержка,
        heating AS Отоп,
        house_type AS ТипСтрой,
        ISNULL(uk.Наименование, '') AS УК, 
        '' AS Поставщик,
        heating,
        Строка_таблицы,
        SUM(ОбъемПер) AS ОбъемПер,
        SUM(СуммаПер) AS СуммаПер,
        SUM(Объем) AS Объем,
        SUM(Сумма) AS Сумма
    FROM data_tarif d
    LEFT JOIN stack.[УК договоры] ukd ON ukd.row_id = d.ДоговорУК
    LEFT JOIN stack.Организации uk ON uk.row_id = ukd.[Организация-УКДоговор]
    GROUP BY 
        БД, Месяц, ЛС, privileged, heating, house_type, 
        ISNULL(uk.Наименование, ''), Строка_таблицы
),

-- Генерируем диапазоны
ranges AS (
    SELECT 
        0 AS min_val,
        CASE 
            WHEN 0 < 2000 THEN 100
            WHEN 0 >= 2000 AND 0 < 5000 THEN 500
            WHEN 0 >= 5000 AND 0 < 25000 THEN 1000
            WHEN 0 >= 25000 THEN 5000
        END AS max_val,
        0 AS level
    UNION ALL
    SELECT 
        max_val,
        CASE 
            WHEN max_val < 2000 THEN max_val + 100
            WHEN max_val >= 2000 AND max_val < 5000 THEN max_val + 500
            WHEN max_val >= 5000 AND max_val < 25000 THEN max_val + 1000
            WHEN max_val >= 25000 THEN max_val + 5000
        END,
        level + 1
    FROM ranges
    WHERE max_val < 50000 AND level < 100
),

-- Добавляем специальные диапазоны
all_ranges AS (
    SELECT '<0' AS range_name, -999999999 AS min_val, -0.001 AS max_val
    UNION ALL
    SELECT '0', 0, 0
    UNION ALL
    SELECT 
        CAST(min_val AS VARCHAR) + '_' + CAST(max_val AS VARCHAR),
        min_val,
        max_val
    FROM ranges
    UNION ALL
    SELECT '>50000', 50000, 999999999
)
-- Финальная агрегация с правильным подсчетом
SELECT 
    БД,
    FORMAT(Месяц, 'yyyy [MM] MMMM', 'ru') Месяц,
    СоцПоддержка,
    Отоп,
    ТипСтрой,
    Строка_таблицы,
    ROUND(ОбъемПер,2) ОбъемПер,
    ROUND(СуммаПер,2) СуммаПер,
    COUNT(DISTINCT ЛС) AS КолВо,
    -- <0
    SUM(CASE WHEN Объем < 0 THEN Объем ELSE 0 END) AS [<0],
    SUM(CASE WHEN Объем < 0 THEN 1 ELSE 0 END) AS [<0_количество],
    -- 0
    SUM(CASE WHEN Объем = 0 THEN Объем ELSE 0 END) AS [0],
    SUM(CASE WHEN Объем = 0 THEN 1 ELSE 0 END) AS [0_количество],
    -- 0-100
    SUM(CASE WHEN Объем > 0 AND Объем <= 100 THEN Объем ELSE 0 END) AS [0_100],
    SUM(CASE WHEN Объем > 0 AND Объем <= 100 THEN 1 ELSE 0 END) AS [0_100_количество],
    -- 100-200
    SUM(CASE WHEN Объем > 100 AND Объем <= 200 THEN Объем ELSE 0 END) AS [100_200],
    SUM(CASE WHEN Объем > 100 AND Объем <= 200 THEN 1 ELSE 0 END) AS [100_200_количество],
    -- 200-300
    SUM(CASE WHEN Объем > 200 AND Объем <= 300 THEN Объем ELSE 0 END) AS [200_300],
    SUM(CASE WHEN Объем > 200 AND Объем <= 300 THEN 1 ELSE 0 END) AS [200_300_количество],
    -- 300-400
    SUM(CASE WHEN Объем > 300 AND Объем <= 400 THEN Объем ELSE 0 END) AS [300_400],
    SUM(CASE WHEN Объем > 300 AND Объем <= 400 THEN 1 ELSE 0 END) AS [300_400_количество],
    -- 400-500
    SUM(CASE WHEN Объем > 400 AND Объем <= 500 THEN Объем ELSE 0 END) AS [400_500],
    SUM(CASE WHEN Объем > 400 AND Объем <= 500 THEN 1 ELSE 0 END) AS [400_500_количество],
    -- 500-600
    SUM(CASE WHEN Объем > 500 AND Объем <= 600 THEN Объем ELSE 0 END) AS [500_600],
    SUM(CASE WHEN Объем > 500 AND Объем <= 600 THEN 1 ELSE 0 END) AS [500_600_количество],
    -- 600-700
    SUM(CASE WHEN Объем > 600 AND Объем <= 700 THEN Объем ELSE 0 END) AS [600_700],
    SUM(CASE WHEN Объем > 600 AND Объем <= 700 THEN 1 ELSE 0 END) AS [600_700_количество],
    -- 700-800
    SUM(CASE WHEN Объем > 700 AND Объем <= 800 THEN Объем ELSE 0 END) AS [700_800],
    SUM(CASE WHEN Объем > 700 AND Объем <= 800 THEN 1 ELSE 0 END) AS [700_800_количество],
    -- 800-900
    SUM(CASE WHEN Объем > 800 AND Объем <= 900 THEN Объем ELSE 0 END) AS [800_900],
    SUM(CASE WHEN Объем > 800 AND Объем <= 900 THEN 1 ELSE 0 END) AS [800_900_количество],
    -- 900-1000
    SUM(CASE WHEN Объем > 900 AND Объем <= 1000 THEN Объем ELSE 0 END) AS [900_1000],
    SUM(CASE WHEN Объем > 900 AND Объем <= 1000 THEN 1 ELSE 0 END) AS [900_1000_количество],
    -- 1000-1100
    SUM(CASE WHEN Объем > 1000 AND Объем <= 1100 THEN Объем ELSE 0 END) AS [1000_1100],
    SUM(CASE WHEN Объем > 1000 AND Объем <= 1100 THEN 1 ELSE 0 END) AS [1000_1100_количество],
    -- 1100-1200
    SUM(CASE WHEN Объем > 1100 AND Объем <= 1200 THEN Объем ELSE 0 END) AS [1100_1200],
    SUM(CASE WHEN Объем > 1100 AND Объем <= 1200 THEN 1 ELSE 0 END) AS [1100_1200_количество],
    -- 1200-1300
    SUM(CASE WHEN Объем > 1200 AND Объем <= 1300 THEN Объем ELSE 0 END) AS [1200_1300],
    SUM(CASE WHEN Объем > 1200 AND Объем <= 1300 THEN 1 ELSE 0 END) AS [1200_1300_количество],
    -- 1300-1400
    SUM(CASE WHEN Объем > 1300 AND Объем <= 1400 THEN Объем ELSE 0 END) AS [1300_1400],
    SUM(CASE WHEN Объем > 1300 AND Объем <= 1400 THEN 1 ELSE 0 END) AS [1300_1400_количество],
    -- 1400-1500
    SUM(CASE WHEN Объем > 1400 AND Объем <= 1500 THEN Объем ELSE 0 END) AS [1400_1500],
    SUM(CASE WHEN Объем > 1400 AND Объем <= 1500 THEN 1 ELSE 0 END) AS [1400_1500_количество],
    -- 1500-1600
    SUM(CASE WHEN Объем > 1500 AND Объем <= 1600 THEN Объем ELSE 0 END) AS [1500_1600],
    SUM(CASE WHEN Объем > 1500 AND Объем <= 1600 THEN 1 ELSE 0 END) AS [1500_1600_количество],
    -- 1600-1700
    SUM(CASE WHEN Объем > 1600 AND Объем <= 1700 THEN Объем ELSE 0 END) AS [1600_1700],
    SUM(CASE WHEN Объем > 1600 AND Объем <= 1700 THEN 1 ELSE 0 END) AS [1600_1700_количество],
    -- 1700-1800
    SUM(CASE WHEN Объем > 1700 AND Объем <= 1800 THEN Объем ELSE 0 END) AS [1700_1800],
    SUM(CASE WHEN Объем > 1700 AND Объем <= 1800 THEN 1 ELSE 0 END) AS [1700_1800_количество],
    -- 1800-1900
    SUM(CASE WHEN Объем > 1800 AND Объем <= 1900 THEN Объем ELSE 0 END) AS [1800_1900],
    SUM(CASE WHEN Объем > 1800 AND Объем <= 1900 THEN 1 ELSE 0 END) AS [1800_1900_количество],
    -- 1900-2000
    SUM(CASE WHEN Объем > 1900 AND Объем <= 2000 THEN Объем ELSE 0 END) AS [1900_2000],
    SUM(CASE WHEN Объем > 1900 AND Объем <= 2000 THEN 1 ELSE 0 END) AS [1900_2000_количество],
    -- 2000-2500
    SUM(CASE WHEN Объем > 2000 AND Объем <= 2500 THEN Объем ELSE 0 END) AS [2000_2500],
    SUM(CASE WHEN Объем > 2000 AND Объем <= 2500 THEN 1 ELSE 0 END) AS [2000_2500_количество],
    -- 2500-3000
    SUM(CASE WHEN Объем > 2500 AND Объем <= 3000 THEN Объем ELSE 0 END) AS [2500_3000],
    SUM(CASE WHEN Объем > 2500 AND Объем <= 3000 THEN 1 ELSE 0 END) AS [2500_3000_количество],
    -- 3000-3500
    SUM(CASE WHEN Объем > 3000 AND Объем <= 3500 THEN Объем ELSE 0 END) AS [3000_3500],
    SUM(CASE WHEN Объем > 3000 AND Объем <= 3500 THEN 1 ELSE 0 END) AS [3000_3500_количество],
    -- 3500-4000
    SUM(CASE WHEN Объем > 3500 AND Объем <= 4000 THEN Объем ELSE 0 END) AS [3500_4000],
    SUM(CASE WHEN Объем > 3500 AND Объем <= 4000 THEN 1 ELSE 0 END) AS [3500_4000_количество],
    -- 4000-4500
    SUM(CASE WHEN Объем > 4000 AND Объем <= 4500 THEN Объем ELSE 0 END) AS [4000_4500],
    SUM(CASE WHEN Объем > 4000 AND Объем <= 4500 THEN 1 ELSE 0 END) AS [4000_4500_количество],
    -- 4500-5000
    SUM(CASE WHEN Объем > 4500 AND Объем <= 5000 THEN Объем ELSE 0 END) AS [4500_5000],
    SUM(CASE WHEN Объем > 4500 AND Объем <= 5000 THEN 1 ELSE 0 END) AS [4500_5000_количество],
    -- 5000-6000
    SUM(CASE WHEN Объем > 5000 AND Объем <= 6000 THEN Объем ELSE 0 END) AS [5000_6000],
    SUM(CASE WHEN Объем > 5000 AND Объем <= 6000 THEN 1 ELSE 0 END) AS [5000_6000_количество],
    -- 6000-7000
    SUM(CASE WHEN Объем > 6000 AND Объем <= 7000 THEN Объем ELSE 0 END) AS [6000_7000],
    SUM(CASE WHEN Объем > 6000 AND Объем <= 7000 THEN 1 ELSE 0 END) AS [6000_7000_количество],
    -- 7000-8000
    SUM(CASE WHEN Объем > 7000 AND Объем <= 8000 THEN Объем ELSE 0 END) AS [7000_8000],
    SUM(CASE WHEN Объем > 7000 AND Объем <= 8000 THEN 1 ELSE 0 END) AS [7000_8000_количество],
    -- 8000-9000
    SUM(CASE WHEN Объем > 8000 AND Объем <= 9000 THEN Объем ELSE 0 END) AS [8000_9000],
    SUM(CASE WHEN Объем > 8000 AND Объем <= 9000 THEN 1 ELSE 0 END) AS [8000_9000_количество],
    -- 9000-10000
    SUM(CASE WHEN Объем > 9000 AND Объем <= 10000 THEN Объем ELSE 0 END) AS [9000_10000],
    SUM(CASE WHEN Объем > 9000 AND Объем <= 10000 THEN 1 ELSE 0 END) AS [9000_10000_количество],
    -- 10000-11000
    SUM(CASE WHEN Объем > 10000 AND Объем <= 11000 THEN Объем ELSE 0 END) AS [10000_11000],
    SUM(CASE WHEN Объем > 10000 AND Объем <= 11000 THEN 1 ELSE 0 END) AS [10000_11000_количество],
    -- 11000-12000
    SUM(CASE WHEN Объем > 11000 AND Объем <= 12000 THEN Объем ELSE 0 END) AS [11000_12000],
    SUM(CASE WHEN Объем > 11000 AND Объем <= 12000 THEN 1 ELSE 0 END) AS [11000_12000_количество],
    -- 12000-13000
    SUM(CASE WHEN Объем > 12000 AND Объем <= 13000 THEN Объем ELSE 0 END) AS [12000_13000],
    SUM(CASE WHEN Объем > 12000 AND Объем <= 13000 THEN 1 ELSE 0 END) AS [12000_13000_количество],
    -- 13000-14000
    SUM(CASE WHEN Объем > 13000 AND Объем <= 14000 THEN Объем ELSE 0 END) AS [13000_14000],
    SUM(CASE WHEN Объем > 13000 AND Объем <= 14000 THEN 1 ELSE 0 END) AS [13000_14000_количество],
    -- 14000-15000
    SUM(CASE WHEN Объем > 14000 AND Объем <= 15000 THEN Объем ELSE 0 END) AS [14000_15000],
    SUM(CASE WHEN Объем > 14000 AND Объем <= 15000 THEN 1 ELSE 0 END) AS [14000_15000_количество],
    -- 15000-16000
    SUM(CASE WHEN Объем > 15000 AND Объем <= 16000 THEN Объем ELSE 0 END) AS [15000_16000],
    SUM(CASE WHEN Объем > 15000 AND Объем <= 16000 THEN 1 ELSE 0 END) AS [15000_16000_количество],
    -- 16000-17000
    SUM(CASE WHEN Объем > 16000 AND Объем <= 17000 THEN Объем ELSE 0 END) AS [16000_17000],
    SUM(CASE WHEN Объем > 16000 AND Объем <= 17000 THEN 1 ELSE 0 END) AS [16000_17000_количество],
    -- 17000-18000
    SUM(CASE WHEN Объем > 17000 AND Объем <= 18000 THEN Объем ELSE 0 END) AS [17000_18000],
    SUM(CASE WHEN Объем > 17000 AND Объем <= 18000 THEN 1 ELSE 0 END) AS [17000_18000_количество],
    -- 18000-19000
    SUM(CASE WHEN Объем > 18000 AND Объем <= 19000 THEN Объем ELSE 0 END) AS [18000_19000],
    SUM(CASE WHEN Объем > 18000 AND Объем <= 19000 THEN 1 ELSE 0 END) AS [18000_19000_количество],
    -- 19000-20000
    SUM(CASE WHEN Объем > 19000 AND Объем <= 20000 THEN Объем ELSE 0 END) AS [19000_20000],
    SUM(CASE WHEN Объем > 19000 AND Объем <= 20000 THEN 1 ELSE 0 END) AS [19000_20000_количество],
    -- 20000-21000
    SUM(CASE WHEN Объем > 20000 AND Объем <= 21000 THEN Объем ELSE 0 END) AS [20000_21000],
    SUM(CASE WHEN Объем > 20000 AND Объем <= 21000 THEN 1 ELSE 0 END) AS [20000_21000_количество],
    -- 21000-22000
    SUM(CASE WHEN Объем > 21000 AND Объем <= 22000 THEN Объем ELSE 0 END) AS [21000_22000],
    SUM(CASE WHEN Объем > 21000 AND Объем <= 22000 THEN 1 ELSE 0 END) AS [21000_22000_количество],
    -- 22000-23000
    SUM(CASE WHEN Объем > 22000 AND Объем <= 23000 THEN Объем ELSE 0 END) AS [22000_23000],
    SUM(CASE WHEN Объем > 22000 AND Объем <= 23000 THEN 1 ELSE 0 END) AS [22000_23000_количество],
    -- 23000-24000
    SUM(CASE WHEN Объем > 23000 AND Объем <= 24000 THEN Объем ELSE 0 END) AS [23000_24000],
    SUM(CASE WHEN Объем > 23000 AND Объем <= 24000 THEN 1 ELSE 0 END) AS [23000_24000_количество],
    -- 24000-25000
    SUM(CASE WHEN Объем > 24000 AND Объем <= 25000 THEN Объем ELSE 0 END) AS [24000_25000],
    SUM(CASE WHEN Объем > 24000 AND Объем <= 25000 THEN 1 ELSE 0 END) AS [24000_25000_количество],
    -- 25000-30000
    SUM(CASE WHEN Объем > 25000 AND Объем <= 30000 THEN Объем ELSE 0 END) AS [25000_30000],
    SUM(CASE WHEN Объем > 25000 AND Объем <= 30000 THEN 1 ELSE 0 END) AS [25000_30000_количество],
    -- 30000-35000
    SUM(CASE WHEN Объем > 30000 AND Объем <= 35000 THEN Объем ELSE 0 END) AS [30000_35000],
    SUM(CASE WHEN Объем > 30000 AND Объем <= 35000 THEN 1 ELSE 0 END) AS [30000_35000_количество],
    -- 35000-40000
    SUM(CASE WHEN Объем > 35000 AND Объем <= 40000 THEN Объем ELSE 0 END) AS [35000_40000],
    SUM(CASE WHEN Объем > 35000 AND Объем <= 40000 THEN 1 ELSE 0 END) AS [35000_40000_количество],
    -- 40000-45000
    SUM(CASE WHEN Объем > 40000 AND Объем <= 45000 THEN Объем ELSE 0 END) AS [40000_45000],
    SUM(CASE WHEN Объем > 40000 AND Объем <= 45000 THEN 1 ELSE 0 END) AS [40000_45000_количество],
    -- 45000-50000
    SUM(CASE WHEN Объем > 45000 AND Объем <= 50000 THEN Объем ELSE 0 END) AS [45000_50000],
    SUM(CASE WHEN Объем > 45000 AND Объем <= 50000 THEN 1 ELSE 0 END) AS [45000_50000_количество],
    -- >50000
    SUM(CASE WHEN Объем > 50000 THEN Объем ELSE 0 END) AS [>50000],
    SUM(CASE WHEN Объем > 50000 THEN 1 ELSE 0 END) AS [>50000_количество]
FROM ls_totals
GROUP BY БД, Месяц, СоцПоддержка, Отоп, ТипСтрой, Строка_таблицы,ОбъемПер,СуммаПер
ORDER BY Месяц, Строка_таблицы
OPTION (MAXRECURSION 0);
`
},
{ id: 2014, parent: 2000, text: 'ФЛ ФАС (Итоги)', icon: 'chart', 
filters: { БД_ФЛ: [], Период: {}},
views: ["pivot","grid"],
processing: "server-multi",
fields: {
    pivot: [
          { dataField: 'Отчет', area: "column",expanded:true,},
          { dataField: 'Месяц', area: "row",expanded:true,},
          { dataField: 'Филиал', area: "row",expanded:true,},
          { dataField: 'Строка_таблицы', area: "row",expanded:true, },    
          { dataField: 'ТипСтрой' , area: "row",expanded:true, },
          { caption: "Отопление", dataField: 'Отоп', area: "row",expanded:true, },      
          { dataField: 'СоцПоддержка', area: "row",expanded:true, },

          { caption: "Объем перерасчета", dataField: 'ОбъемПер',"dataType": "number", "summaryType": "sum","format": { "type": "fixedPoint","precision": 3}, "area": "data"},
          { caption: "Сумма перерасчета", dataField: 'СуммаПер',"dataType": "number", "summaryType": "sum","format": { "type": "fixedPoint","precision": 2}, "area": "data"},
          { caption: "Кол-во ", dataField: 'КолВо',"dataType": "number", "summaryType": "sum","format": { "type": "fixedPoint","precision": 0}, "area": "data"},
{ dataField: '<0', caption: '<0 Кол-во ЛС', dataType: "number", summaryType: "sum", format: { type: "fixedPoint", precision: 0 }, area: "data" },
{ dataField: '<0_количество', caption: '<0 Кол-во ЛС', dataType: "number", summaryType: "sum", format: { type: "fixedPoint", precision: 0 }, area: "data" },
{ dataField: '0', caption: '0 Кол-во ЛС', dataType: "number", summaryType: "sum", format: { type: "fixedPoint", precision: 0 }, area: "data" },
{ dataField: '0_количество', caption: '0 Кол-во ЛС', dataType: "number", summaryType: "sum", format: { type: "fixedPoint", precision: 0 }, area: "data" },
{ dataField: '0_100', caption: '0-100 Кол-во ЛС', dataType: "number", summaryType: "sum", format: { type: "fixedPoint", precision: 0 }, area: "data" },
{ dataField: '0_100_количество', caption: '0-100 Кол-во ЛС', dataType: "number", summaryType: "sum", format: { type: "fixedPoint", precision: 0 }, area: "data" },
{ dataField: '100_200', caption: '100-200 Кол-во ЛС', dataType: "number", summaryType: "sum", format: { type: "fixedPoint", precision: 0 }, area: "data" },
{ dataField: '100_200_количество', caption: '100-200 Кол-во ЛС', dataType: "number", summaryType: "sum", format: { type: "fixedPoint", precision: 0 }, area: "data" },
{ dataField: '200_300', caption: '200-300 Кол-во ЛС', dataType: "number", summaryType: "sum", format: { type: "fixedPoint", precision: 0 }, area: "data" },
{ dataField: '200_300_количество', caption: '200-300 Кол-во ЛС', dataType: "number", summaryType: "sum", format: { type: "fixedPoint", precision: 0 }, area: "data" },
{ dataField: '300_400', caption: '300-400 Кол-во ЛС', dataType: "number", summaryType: "sum", format: { type: "fixedPoint", precision: 0 }, area: "data" },
{ dataField: '300_400_количество', caption: '300-400 Кол-во ЛС', dataType: "number", summaryType: "sum", format: { type: "fixedPoint", precision: 0 }, area: "data" },
{ dataField: '400_500', caption: '400-500 Кол-во ЛС', dataType: "number", summaryType: "sum", format: { type: "fixedPoint", precision: 0 }, area: "data" },
{ dataField: '400_500_количество', caption: '400-500 Кол-во ЛС', dataType: "number", summaryType: "sum", format: { type: "fixedPoint", precision: 0 }, area: "data" },
{ dataField: '500_600', caption: '500-600 Кол-во ЛС', dataType: "number", summaryType: "sum", format: { type: "fixedPoint", precision: 0 }, area: "data" },
{ dataField: '500_600_количество', caption: '500-600 Кол-во ЛС', dataType: "number", summaryType: "sum", format: { type: "fixedPoint", precision: 0 }, area: "data" },
{ dataField: '600_700', caption: '600-700 Кол-во ЛС', dataType: "number", summaryType: "sum", format: { type: "fixedPoint", precision: 0 }, area: "data" },
{ dataField: '600_700_количество', caption: '600-700 Кол-во ЛС', dataType: "number", summaryType: "sum", format: { type: "fixedPoint", precision: 0 }, area: "data" },
{ dataField: '700_800', caption: '700-800 Кол-во ЛС', dataType: "number", summaryType: "sum", format: { type: "fixedPoint", precision: 0 }, area: "data" },
{ dataField: '700_800_количество', caption: '700-800 Кол-во ЛС', dataType: "number", summaryType: "sum", format: { type: "fixedPoint", precision: 0 }, area: "data" },
{ dataField: '800_900', caption: '800-900 Кол-во ЛС', dataType: "number", summaryType: "sum", format: { type: "fixedPoint", precision: 0 }, area: "data" },
{ dataField: '800_900_количество', caption: '800-900 Кол-во ЛС', dataType: "number", summaryType: "sum", format: { type: "fixedPoint", precision: 0 }, area: "data" },
{ dataField: '900_1000', caption: '900-1000 Кол-во ЛС', dataType: "number", summaryType: "sum", format: { type: "fixedPoint", precision: 0 }, area: "data" },
{ dataField: '900_1000_количество', caption: '900-1000 Кол-во ЛС', dataType: "number", summaryType: "sum", format: { type: "fixedPoint", precision: 0 }, area: "data" },
{ dataField: '1000_1100', caption: '1000-1100 Кол-во ЛС', dataType: "number", summaryType: "sum", format: { type: "fixedPoint", precision: 0 }, area: "data" },
{ dataField: '1000_1100_количество', caption: '1000-1100 Кол-во ЛС', dataType: "number", summaryType: "sum", format: { type: "fixedPoint", precision: 0 }, area: "data" },
{ dataField: '1100_1200', caption: '1100-1200 Кол-во ЛС', dataType: "number", summaryType: "sum", format: { type: "fixedPoint", precision: 0 }, area: "data" },
{ dataField: '1100_1200_количество', caption: '1100-1200 Кол-во ЛС', dataType: "number", summaryType: "sum", format: { type: "fixedPoint", precision: 0 }, area: "data" },
{ dataField: '1200_1300', caption: '1200-1300 Кол-во ЛС', dataType: "number", summaryType: "sum", format: { type: "fixedPoint", precision: 0 }, area: "data" },
{ dataField: '1200_1300_количество', caption: '1200-1300 Кол-во ЛС', dataType: "number", summaryType: "sum", format: { type: "fixedPoint", precision: 0 }, area: "data" },
{ dataField: '1300_1400', caption: '1300-1400 Кол-во ЛС', dataType: "number", summaryType: "sum", format: { type: "fixedPoint", precision: 0 }, area: "data" },
{ dataField: '1300_1400_количество', caption: '1300-1400 Кол-во ЛС', dataType: "number", summaryType: "sum", format: { type: "fixedPoint", precision: 0 }, area: "data" },
{ dataField: '1400_1500', caption: '1400-1500 Кол-во ЛС', dataType: "number", summaryType: "sum", format: { type: "fixedPoint", precision: 0 }, area: "data" },
{ dataField: '1400_1500_количество', caption: '1400-1500 Кол-во ЛС', dataType: "number", summaryType: "sum", format: { type: "fixedPoint", precision: 0 }, area: "data" },
{ dataField: '1500_1600', caption: '1500-1600 Кол-во ЛС', dataType: "number", summaryType: "sum", format: { type: "fixedPoint", precision: 0 }, area: "data" },
{ dataField: '1500_1600_количество', caption: '1500-1600 Кол-во ЛС', dataType: "number", summaryType: "sum", format: { type: "fixedPoint", precision: 0 }, area: "data" },
{ dataField: '1600_1700', caption: '1600-1700 Кол-во ЛС', dataType: "number", summaryType: "sum", format: { type: "fixedPoint", precision: 0 }, area: "data" },
{ dataField: '1600_1700_количество', caption: '1600-1700 Кол-во ЛС', dataType: "number", summaryType: "sum", format: { type: "fixedPoint", precision: 0 }, area: "data" },
{ dataField: '1700_1800', caption: '1700-1800 Кол-во ЛС', dataType: "number", summaryType: "sum", format: { type: "fixedPoint", precision: 0 }, area: "data" },
{ dataField: '1700_1800_количество', caption: '1700-1800 Кол-во ЛС', dataType: "number", summaryType: "sum", format: { type: "fixedPoint", precision: 0 }, area: "data" },
{ dataField: '1800_1900', caption: '1800-1900 Кол-во ЛС', dataType: "number", summaryType: "sum", format: { type: "fixedPoint", precision: 0 }, area: "data" },
{ dataField: '1800_1900_количество', caption: '1800-1900 Кол-во ЛС', dataType: "number", summaryType: "sum", format: { type: "fixedPoint", precision: 0 }, area: "data" },
{ dataField: '1900_2000', caption: '1900-2000 Кол-во ЛС', dataType: "number", summaryType: "sum", format: { type: "fixedPoint", precision: 0 }, area: "data" },
{ dataField: '1900_2000_количество', caption: '1900-2000 Кол-во ЛС', dataType: "number", summaryType: "sum", format: { type: "fixedPoint", precision: 0 }, area: "data" },
{ dataField: '2000_2500', caption: '2000-2500 Кол-во ЛС', dataType: "number", summaryType: "sum", format: { type: "fixedPoint", precision: 0 }, area: "data" },
{ dataField: '2000_2500_количество', caption: '2000-2500 Кол-во ЛС', dataType: "number", summaryType: "sum", format: { type: "fixedPoint", precision: 0 }, area: "data" },
{ dataField: '2500_3000', caption: '2500-3000 Кол-во ЛС', dataType: "number", summaryType: "sum", format: { type: "fixedPoint", precision: 0 }, area: "data" },
{ dataField: '2500_3000_количество', caption: '2500-3000 Кол-во ЛС', dataType: "number", summaryType: "sum", format: { type: "fixedPoint", precision: 0 }, area: "data" },
{ dataField: '3000_3500', caption: '3000-3500 Кол-во ЛС', dataType: "number", summaryType: "sum", format: { type: "fixedPoint", precision: 0 }, area: "data" },
{ dataField: '3000_3500_количество', caption: '3000-3500 Кол-во ЛС', dataType: "number", summaryType: "sum", format: { type: "fixedPoint", precision: 0 }, area: "data" },
{ dataField: '3500_4000', caption: '3500-4000 Кол-во ЛС', dataType: "number", summaryType: "sum", format: { type: "fixedPoint", precision: 0 }, area: "data" },
{ dataField: '3500_4000_количество', caption: '3500-4000 Кол-во ЛС', dataType: "number", summaryType: "sum", format: { type: "fixedPoint", precision: 0 }, area: "data" },
{ dataField: '4000_4500', caption: '4000-4500 Кол-во ЛС', dataType: "number", summaryType: "sum", format: { type: "fixedPoint", precision: 0 }, area: "data" },
{ dataField: '4000_4500_количество', caption: '4000-4500 Кол-во ЛС', dataType: "number", summaryType: "sum", format: { type: "fixedPoint", precision: 0 }, area: "data" },
{ dataField: '4500_5000', caption: '4500-5000 Кол-во ЛС', dataType: "number", summaryType: "sum", format: { type: "fixedPoint", precision: 0 }, area: "data" },
{ dataField: '4500_5000_количество', caption: '4500-5000 Кол-во ЛС', dataType: "number", summaryType: "sum", format: { type: "fixedPoint", precision: 0 }, area: "data" },
{ dataField: '5000_6000', caption: '5000-6000 Кол-во ЛС', dataType: "number", summaryType: "sum", format: { type: "fixedPoint", precision: 0 }, area: "data" },
{ dataField: '5000_6000_количество', caption: '5000-6000 Кол-во ЛС', dataType: "number", summaryType: "sum", format: { type: "fixedPoint", precision: 0 }, area: "data" },
{ dataField: '6000_7000', caption: '6000-7000 Кол-во ЛС', dataType: "number", summaryType: "sum", format: { type: "fixedPoint", precision: 0 }, area: "data" },
{ dataField: '6000_7000_количество', caption: '6000-7000 Кол-во ЛС', dataType: "number", summaryType: "sum", format: { type: "fixedPoint", precision: 0 }, area: "data" },
{ dataField: '7000_8000', caption: '7000-8000 Кол-во ЛС', dataType: "number", summaryType: "sum", format: { type: "fixedPoint", precision: 0 }, area: "data" },
{ dataField: '7000_8000_количество', caption: '7000-8000 Кол-во ЛС', dataType: "number", summaryType: "sum", format: { type: "fixedPoint", precision: 0 }, area: "data" },
{ dataField: '8000_9000', caption: '8000-9000 Кол-во ЛС', dataType: "number", summaryType: "sum", format: { type: "fixedPoint", precision: 0 }, area: "data" },
{ dataField: '8000_9000_количество', caption: '8000-9000 Кол-во ЛС', dataType: "number", summaryType: "sum", format: { type: "fixedPoint", precision: 0 }, area: "data" },
{ dataField: '9000_10000', caption: '9000-10000 Кол-во ЛС', dataType: "number", summaryType: "sum", format: { type: "fixedPoint", precision: 0 }, area: "data" },
{ dataField: '9000_10000_количество', caption: '9000-10000 Кол-во ЛС', dataType: "number", summaryType: "sum", format: { type: "fixedPoint", precision: 0 }, area: "data" },
{ dataField: '10000_11000', caption: '10000-11000 Кол-во ЛС', dataType: "number", summaryType: "sum", format: { type: "fixedPoint", precision: 0 }, area: "data" },
{ dataField: '10000_11000_количество', caption: '10000-11000 Кол-во ЛС', dataType: "number", summaryType: "sum", format: { type: "fixedPoint", precision: 0 }, area: "data" },
{ dataField: '11000_12000', caption: '11000-12000 Кол-во ЛС', dataType: "number", summaryType: "sum", format: { type: "fixedPoint", precision: 0 }, area: "data" },
{ dataField: '11000_12000_количество', caption: '11000-12000 Кол-во ЛС', dataType: "number", summaryType: "sum", format: { type: "fixedPoint", precision: 0 }, area: "data" },
{ dataField: '12000_13000', caption: '12000-13000 Кол-во ЛС', dataType: "number", summaryType: "sum", format: { type: "fixedPoint", precision: 0 }, area: "data" },
{ dataField: '12000_13000_количество', caption: '12000-13000 Кол-во ЛС', dataType: "number", summaryType: "sum", format: { type: "fixedPoint", precision: 0 }, area: "data" },
{ dataField: '13000_14000', caption: '13000-14000 Кол-во ЛС', dataType: "number", summaryType: "sum", format: { type: "fixedPoint", precision: 0 }, area: "data" },
{ dataField: '13000_14000_количество', caption: '13000-14000 Кол-во ЛС', dataType: "number", summaryType: "sum", format: { type: "fixedPoint", precision: 0 }, area: "data" },
{ dataField: '14000_15000', caption: '14000-15000 Кол-во ЛС', dataType: "number", summaryType: "sum", format: { type: "fixedPoint", precision: 0 }, area: "data" },
{ dataField: '14000_15000_количество', caption: '14000-15000 Кол-во ЛС', dataType: "number", summaryType: "sum", format: { type: "fixedPoint", precision: 0 }, area: "data" },
{ dataField: '15000_16000', caption: '15000-16000 Кол-во ЛС', dataType: "number", summaryType: "sum", format: { type: "fixedPoint", precision: 0 }, area: "data" },
{ dataField: '15000_16000_количество', caption: '15000-16000 Кол-во ЛС', dataType: "number", summaryType: "sum", format: { type: "fixedPoint", precision: 0 }, area: "data" },
{ dataField: '16000_17000', caption: '16000-17000 Кол-во ЛС', dataType: "number", summaryType: "sum", format: { type: "fixedPoint", precision: 0 }, area: "data" },
{ dataField: '16000_17000_количество', caption: '16000-17000 Кол-во ЛС', dataType: "number", summaryType: "sum", format: { type: "fixedPoint", precision: 0 }, area: "data" },
{ dataField: '17000_18000', caption: '17000-18000 Кол-во ЛС', dataType: "number", summaryType: "sum", format: { type: "fixedPoint", precision: 0 }, area: "data" },
{ dataField: '17000_18000_количество', caption: '17000-18000 Кол-во ЛС', dataType: "number", summaryType: "sum", format: { type: "fixedPoint", precision: 0 }, area: "data" },
{ dataField: '18000_19000', caption: '18000-19000 Кол-во ЛС', dataType: "number", summaryType: "sum", format: { type: "fixedPoint", precision: 0 }, area: "data" },
{ dataField: '18000_19000_количество', caption: '18000-19000 Кол-во ЛС', dataType: "number", summaryType: "sum", format: { type: "fixedPoint", precision: 0 }, area: "data" },
{ dataField: '19000_20000', caption: '19000-20000 Кол-во ЛС', dataType: "number", summaryType: "sum", format: { type: "fixedPoint", precision: 0 }, area: "data" },
{ dataField: '19000_20000_количество', caption: '19000-20000 Кол-во ЛС', dataType: "number", summaryType: "sum", format: { type: "fixedPoint", precision: 0 }, area: "data" },
{ dataField: '20000_21000', caption: '20000-21000 Кол-во ЛС', dataType: "number", summaryType: "sum", format: { type: "fixedPoint", precision: 0 }, area: "data" },
{ dataField: '20000_21000_количество', caption: '20000-21000 Кол-во ЛС', dataType: "number", summaryType: "sum", format: { type: "fixedPoint", precision: 0 }, area: "data" },
{ dataField: '21000_22000', caption: '21000-22000 Кол-во ЛС', dataType: "number", summaryType: "sum", format: { type: "fixedPoint", precision: 0 }, area: "data" },
{ dataField: '21000_22000_количество', caption: '21000-22000 Кол-во ЛС', dataType: "number", summaryType: "sum", format: { type: "fixedPoint", precision: 0 }, area: "data" },
{ dataField: '22000_23000', caption: '22000-23000 Кол-во ЛС', dataType: "number", summaryType: "sum", format: { type: "fixedPoint", precision: 0 }, area: "data" },
{ dataField: '22000_23000_количество', caption: '22000-23000 Кол-во ЛС', dataType: "number", summaryType: "sum", format: { type: "fixedPoint", precision: 0 }, area: "data" },
{ dataField: '23000_24000', caption: '23000-24000 Кол-во ЛС', dataType: "number", summaryType: "sum", format: { type: "fixedPoint", precision: 0 }, area: "data" },
{ dataField: '23000_24000_количество', caption: '23000-24000 Кол-во ЛС', dataType: "number", summaryType: "sum", format: { type: "fixedPoint", precision: 0 }, area: "data" },
{ dataField: '24000_25000', caption: '24000-25000 Кол-во ЛС', dataType: "number", summaryType: "sum", format: { type: "fixedPoint", precision: 0 }, area: "data" },
{ dataField: '24000_25000_количество', caption: '24000-25000 Кол-во ЛС', dataType: "number", summaryType: "sum", format: { type: "fixedPoint", precision: 0 }, area: "data" },
{ dataField: '25000_30000', caption: '25000-30000 Кол-во ЛС', dataType: "number", summaryType: "sum", format: { type: "fixedPoint", precision: 0 }, area: "data" },
{ dataField: '25000_30000_количество', caption: '25000-30000 Кол-во ЛС', dataType: "number", summaryType: "sum", format: { type: "fixedPoint", precision: 0 }, area: "data" },
{ dataField: '30000_35000', caption: '30000-35000 Кол-во ЛС', dataType: "number", summaryType: "sum", format: { type: "fixedPoint", precision: 0 }, area: "data" },
{ dataField: '30000_35000_количество', caption: '30000-35000 Кол-во ЛС', dataType: "number", summaryType: "sum", format: { type: "fixedPoint", precision: 0 }, area: "data" },
{ dataField: '35000_40000', caption: '35000-40000 Кол-во ЛС', dataType: "number", summaryType: "sum", format: { type: "fixedPoint", precision: 0 }, area: "data" },
{ dataField: '35000_40000_количество', caption: '35000-40000 Кол-во ЛС', dataType: "number", summaryType: "sum", format: { type: "fixedPoint", precision: 0 }, area: "data" },
{ dataField: '40000_45000', caption: '40000-45000 Кол-во ЛС', dataType: "number", summaryType: "sum", format: { type: "fixedPoint", precision: 0 }, area: "data" },
{ dataField: '40000_45000_количество', caption: '40000-45000 Кол-во ЛС', dataType: "number", summaryType: "sum", format: { type: "fixedPoint", precision: 0 }, area: "data" },
{ dataField: '45000_50000', caption: '45000-50000 Кол-во ЛС', dataType: "number", summaryType: "sum", format: { type: "fixedPoint", precision: 0 }, area: "data" },
{ dataField: '45000_50000_количество', caption: '45000-50000 Кол-во ЛС', dataType: "number", summaryType: "sum", format: { type: "fixedPoint", precision: 0 }, area: "data" },
{ dataField: '>50000', caption: '>50000 Кол-во ЛС', dataType: "number", summaryType: "sum", format: { type: "fixedPoint", precision: 0 }, area: "data" },
{ dataField: '>50000_количество', caption: '>50000 Кол-во ЛС', dataType: "number", summaryType: "sum", format: { type: "fixedPoint", precision: 0 }, area: "data" },


           ],
    grid: [
        { dataField: 'Филиал' },
        { caption: "ФЛ/ЮЛ", dataField: "БД", visible:false },
        { dataField: 'Месяц'},
        { dataField: 'СоцПоддержка' },
        { dataField: 'Отоп' },
        { dataField: 'ТипСтрой' },
        { dataField: 'Строка_таблицы' },
        { dataField: 'ОбъемПер' },
        { dataField: 'СуммаПер' },
        { dataField: 'КолВо' },
        { dataField: '<0' },
        { dataField: '<0_количество' },
        { dataField: '0' },
        { dataField: '0_количество' },
        { dataField: '0_100' },
        { dataField: '0_100_количество' },
        { dataField: '100_200' },
        { dataField: '100_200_количество' },
        { dataField: '200_300' },
        { dataField: '200_300_количество' },
        { dataField: '300_400' },
        { dataField: '300_400_количество' },
        { dataField: '400_500' },
        { dataField: '400_500_количество' },
        { dataField: '500_600' },
        { dataField: '500_600_количество' },
        { dataField: '600_700' },
        { dataField: '600_700_количество' },
        { dataField: '700_800' },
        { dataField: '700_800_количество' },
        { dataField: '800_900' },
        { dataField: '800_900_количество' },
        { dataField: '900_1000' },
        { dataField: '900_1000_количество' },
        { dataField: '1000_1100' },
        { dataField: '1000_1100_количество' },
        { dataField: '1100_1200' },
        { dataField: '1100_1200_количество' },
        { dataField: '1200_1300' },
        { dataField: '1200_1300_количество' },
        { dataField: '1300_1400' },
        { dataField: '1300_1400_количество' },
        { dataField: '1400_1500' },
        { dataField: '1400_1500_количество' },
        { dataField: '1500_1600' },
        { dataField: '1500_1600_количество' },
        { dataField: '1600_1700' },
        { dataField: '1600_1700_количество' },
        { dataField: '1700_1800' },
        { dataField: '1700_1800_количество' },
        { dataField: '1800_1900' },
        { dataField: '1800_1900_количество' },
        { dataField: '1900_2000' },
        { dataField: '1900_2000_количество' },
        { dataField: '2000_2500' },
        { dataField: '2000_2500_количество' },
        { dataField: '2500_3000' },
        { dataField: '2500_3000_количество' },
        { dataField: '3000_3500' },
        { dataField: '3000_3500_количество' },
        { dataField: '3500_4000' },
        { dataField: '3500_4000_количество' },
        { dataField: '4000_4500' },
        { dataField: '4000_4500_количество' },
        { dataField: '4500_5000' },
        { dataField: '4500_5000_количество' },
        { dataField: '5000_6000' },
        { dataField: '5000_6000_количество' },
        { dataField: '6000_7000' },
        { dataField: '6000_7000_количество' },
        { dataField: '7000_8000' },
        { dataField: '7000_8000_количество' },
        { dataField: '8000_9000' },
        { dataField: '8000_9000_количество' },
        { dataField: '9000_10000' },
        { dataField: '9000_10000_количество' },
        { dataField: '10000_11000' },
        { dataField: '10000_11000_количество' },
        { dataField: '11000_12000' },
        { dataField: '11000_12000_количество' },
        { dataField: '12000_13000' },
        { dataField: '12000_13000_количество' },
        { dataField: '13000_14000' },
        { dataField: '13000_14000_количество' },
        { dataField: '14000_15000' },
        { dataField: '14000_15000_количество' },
        { dataField: '15000_16000' },
        { dataField: '15000_16000_количество' },
        { dataField: '16000_17000' },
        { dataField: '16000_17000_количество' },
        { dataField: '17000_18000' },
        { dataField: '17000_18000_количество' },
        { dataField: '18000_19000' },
        { dataField: '18000_19000_количество' },
        { dataField: '19000_20000' },
        { dataField: '19000_20000_количество' },
        { dataField: '20000_21000' },
        { dataField: '20000_21000_количество' },
        { dataField: '21000_22000' },
        { dataField: '21000_22000_количество' },
        { dataField: '22000_23000' },
        { dataField: '22000_23000_количество' },
        { dataField: '23000_24000' },
        { dataField: '23000_24000_количество' },
        { dataField: '24000_25000' },
        { dataField: '24000_25000_количество' },
        { dataField: '25000_30000' },
        { dataField: '25000_30000_количество' },
        { dataField: '30000_35000' },
        { dataField: '30000_35000_количество' },
        { dataField: '35000_40000' },
        { dataField: '35000_40000_количество' },
        { dataField: '40000_45000' },
        { dataField: '40000_45000_количество' },
        { dataField: '45000_50000' },
        { dataField: '45000_50000_количество' },
        { dataField: '>50000' },
        { dataField: '>50000_количество' }
    ]
},
query:`
SET DATEFORMAT ymd
SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED
SET NOCOUNT ON;
DECLARE @dn DATE = {Период_start};
DECLARE @dk DATE = {Период_end};
declare @startOfYear date = DATEFROMPARTS(YEAR(@dn), 1, 1);

declare @p1 int,@p2 int,@p3 int;
set @p1 = (select top 1 row_id from stack.[Виды параметров] where Название = 'СПОДМДСЕМ');

declare @reg int = (select top 1 Значение from stack.Константы where имя = 'РЕГИОН')

IF OBJECT_ID('tempdb..#heating_season') IS NOT NULL DROP TABLE #heating_season;
CREATE TABLE #heating_season (
    date date,
    value varchar(10)
);
IF OBJECT_ID('tempdb..#ls_totals') IS NOT NULL DROP TABLE #ls_totals;

IF OBJECT_ID('tempdb..#ls') IS NOT NULL DROP TABLE #ls;
CREATE TABLE #ls ( ls_id int, house_id int, house_type varchar(256), privileged varchar(10));

IF OBJECT_ID('tempdb..#service') IS NOT NULL DROP TABLE #service;
CREATE TABLE #service (
    Услуга INT,
    ТипСтрой NVARCHAR(50),
    Сезон NVARCHAR(10),
    Строка_таблицы NVARCHAR(50)
);

;WITH Months AS (
    SELECT CAST(DATEFROMPARTS(YEAR(@dn), MONTH(@dn), 1) AS DATE) AS MonthStart
    UNION ALL
    SELECT DATEADD(MONTH, 1, MonthStart)
    FROM Months
    WHERE DATEADD(MONTH, 1, MonthStart) <= @dk
),
HistoricalValues AS (
    SELECT 
        DATEFROMPARTS(YEAR(hc.[Дата]), MONTH(hc.[Дата]), 1) [Дата],
        cast(iif(hc.[Значение]='',0,hc.[Значение]) as int) [Значение]
    FROM [stack].[История констант] hc
    JOIN stack.Константы c ON hc.[Константа-История] = c.row_id
    WHERE c.Имя = 'ТЕК_СЕЗОН_ОТОП_ДИФ'
)
insert into #heating_season
SELECT 
    m.MonthStart AS [Дата],
    case when ISNULL(hv.[Значение], (
        SELECT TOP 1 hv2.[Значение]
        FROM HistoricalValues hv2
        WHERE hv2.[Дата] <= m.MonthStart
        ORDER BY hv2.[Дата] DESC
    )) = 1 then 'ОП' else 'не ОП' end [Значение]
FROM Months m
LEFT JOIN HistoricalValues hv ON hv.[Дата] = m.MonthStart
ORDER BY m.MonthStart

-- Заполнение таблицы данными (убран столбец Диапазон, дубликаты удалены)
INSERT INTO #service (Услуга, ТипСтрой, Сезон, Строка_таблицы)
VALUES
(101,'частный','ОП','п. 1.1'), (102,'частный','ОП','п. 3.1'), (103,'частный','ОП','п. 8.1'), (104,'частный','ОП','п. 4.1'), (105,'частный','ОП','п. 2.1'),
(151,'частный','ОП','п. 1.1'), (152,'частный','ОП','п. 3.1'), (153,'частный','ОП','п. 8.1'), (154,'частный','ОП','п. 1.1'), (155,'частный','ОП','п. 3.1'),
(156,'частный','ОП','п. 8.1'), (157,'частный','ОП','п. 1.1'), (158,'частный','ОП','п. 3.1'), (159,'частный','ОП','п. 8.1'), (160,'частный','ОП','п. 1.1'),
(161,'частный','ОП','п. 3.1'), (162,'частный','ОП','п. 8.1'), (163,'частный','ОП','п. 1.1'), (164,'частный','ОП','п. 3.1'), (165,'частный','ОП','п. 8.1'),
(166,'частный','ОП','п. 1.1'), (167,'частный','ОП','п. 3.1'), (168,'частный','ОП','п. 8.1'), (169,'частный','ОП','п. 4.1'), (170,'частный','ОП','п. 2.1'),
(171,'частный','ОП','п. 4.1'), (172,'частный','ОП','п. 2.1'), (173,'частный','ОП','п. 4.1'), (174,'частный','ОП','п. 2.1'), (175,'частный','ОП','п. 4.1'),
(176,'частный','ОП','п. 2.1'), (177,'частный','ОП','п. 4.1'), (178,'частный','ОП','п. 2.1'), (179,'частный','ОП','п. 4.1'), (180,'частный','ОП','п. 2.1'),
(401,'частный','ОП','п. 1.1'), (402,'частный','ОП','п. 3.1'), (403,'частный','ОП','п. 8.1'), (404,'частный','ОП','п. 4.1'), (405,'частный','ОП','п. 2.1'),
(406,'частный','ОП','п. 7.1'), (407,'частный','ОП','п. 6.1'), (408,'частный','ОП','п. 5.1'), (501,'частный','ОП','п. 7.1'), (502,'частный','ОП','п. 6.1'),
(503,'частный','ОП','п. 5.1'), (551,'частный','ОП','п. 7.1'), (552,'частный','ОП','п. 6.1'), (553,'частный','ОП','п. 5.1'), (554,'частный','ОП','п. 7.1'),
(555,'частный','ОП','п. 6.1'), (556,'частный','ОП','п. 5.1'), (557,'частный','ОП','п. 7.1'), (558,'частный','ОП','п. 6.1'), (559,'частный','ОП','п. 5.1'),
(560,'частный','ОП','п. 7.1'), (561,'частный','ОП','п. 6.1'), (562,'частный','ОП','п. 5.1'), (563,'частный','ОП','п. 7.1'), (564,'частный','ОП','п. 6.1'),
(565,'частный','ОП','п. 5.1'), (566,'частный','ОП','п. 7.1'), (567,'частный','ОП','п. 6.1'), (568,'частный','ОП','п. 5.1'),
(201,'частный','ОП','п. 1.1'), (202,'частный','ОП','п. 3.1'), (203,'частный','ОП','п. 8.1'), (204,'частный','ОП','п. 4.1'), (205,'частный','ОП','п. 2.1'),
(251,'частный','ОП','п. 1.1'), (252,'частный','ОП','п. 3.1'), (253,'частный','ОП','п. 8.1'), (254,'частный','ОП','п. 1.1'), (255,'частный','ОП','п. 3.1'),
(256,'частный','ОП','п. 8.1'), (257,'частный','ОП','п. 1.1'), (258,'частный','ОП','п. 3.1'), (259,'частный','ОП','п. 8.1'), (260,'частный','ОП','п. 1.1'),
(261,'частный','ОП','п. 3.1'), (262,'частный','ОП','п. 8.1'), (263,'частный','ОП','п. 1.1'), (264,'частный','ОП','п. 3.1'), (265,'частный','ОП','п. 8.1'),
(266,'частный','ОП','п. 1.1'), (267,'частный','ОП','п. 3.1'), (268,'частный','ОП','п. 8.1'), (269,'частный','ОП','п. 4.1'), (270,'частный','ОП','п. 2.1'),
(271,'частный','ОП','п. 4.1'), (272,'частный','ОП','п. 2.1'), (273,'частный','ОП','п. 4.1'), (274,'частный','ОП','п. 2.1'), (275,'частный','ОП','п. 4.1'),
(276,'частный','ОП','п. 2.1'), (277,'частный','ОП','п. 4.1'), (278,'частный','ОП','п. 2.1'), (279,'частный','ОП','п. 4.1'), (280,'частный','ОП','п. 2.1'),
(409,'частный','ОП','п. 1.1'), (410,'частный','ОП','п. 3.1'), (411,'частный','ОП','п. 8.1'), (412,'частный','ОП','п. 4.1'), (413,'частный','ОП','п. 2.1'),
(414,'частный','ОП','п. 7.1'), (415,'частный','ОП','п. 6.1'), (416,'частный','ОП','п. 5.1'), (701,'частный','ОП','п. 7.1'), (702,'частный','ОП','п. 6.1'),
(703,'частный','ОП','п. 5.1'), (751,'частный','ОП','п. 7.1'), (752,'частный','ОП','п. 6.1'), (753,'частный','ОП','п. 5.1'), (754,'частный','ОП','п. 7.1'),
(755,'частный','ОП','п. 6.1'), (756,'частный','ОП','п. 5.1'), (757,'частный','ОП','п. 7.1'), (758,'частный','ОП','п. 6.1'), (759,'частный','ОП','п. 5.1'),
(760,'частный','ОП','п. 7.1'), (761,'частный','ОП','п. 6.1'), (762,'частный','ОП','п. 5.1'), (763,'частный','ОП','п. 7.1'), (764,'частный','ОП','п. 6.1'),
(765,'частный','ОП','п. 5.1'), (766,'частный','ОП','п. 7.1'), (767,'частный','ОП','п. 6.1'), (768,'частный','ОП','п. 5.1'),
(417,'частный','ОП','п. 1.1'), (418,'частный','ОП','п. 3.1'), (419,'частный','ОП','п. 8.1'), (420,'частный','ОП','п. 4.1'), (421,'частный','ОП','п. 2.1'),
(422,'частный','ОП','п. 7.1'), (423,'частный','ОП','п. 6.1'), (424,'частный','ОП','п. 5.1'), (601,'частный','ОП','п. 1.1'), (602,'частный','ОП','п. 3.1'),
(603,'частный','ОП','п. 8.1'), (604,'частный','ОП','п. 4.1'), (605,'частный','ОП','п. 2.1'), (651,'частный','ОП','п. 1.1'), (652,'частный','ОП','п. 3.1'),
(653,'частный','ОП','п. 8.1'), (654,'частный','ОП','п. 1.1'), (655,'частный','ОП','п. 3.1'), (656,'частный','ОП','п. 8.1'), (657,'частный','ОП','п. 1.1'),
(658,'частный','ОП','п. 3.1'), (659,'частный','ОП','п. 8.1'), (660,'частный','ОП','п. 1.1'), (661,'частный','ОП','п. 3.1'), (662,'частный','ОП','п. 8.1'),
(663,'частный','ОП','п. 1.1'), (664,'частный','ОП','п. 3.1'), (665,'частный','ОП','п. 8.1'), (666,'частный','ОП','п. 1.1'), (667,'частный','ОП','п. 3.1'),
(668,'частный','ОП','п. 8.1'), (669,'частный','ОП','п. 4.1'), (670,'частный','ОП','п. 2.1'), (671,'частный','ОП','п. 4.1'), (672,'частный','ОП','п. 2.1'),
(673,'частный','ОП','п. 4.1'), (674,'частный','ОП','п. 2.1'), (675,'частный','ОП','п. 4.1'), (676,'частный','ОП','п. 2.1'), (677,'частный','ОП','п. 4.1'),
(678,'частный','ОП','п. 2.1'), (679,'частный','ОП','п. 4.1'), (680,'частный','ОП','п. 2.1'),
(801,'частный','ОП','п. 7.1'), (802,'частный','ОП','п. 6.1'), (803,'частный','ОП','п. 5.1'), (851,'частный','ОП','п. 7.1'), (852,'частный','ОП','п. 6.1'),
(853,'частный','ОП','п. 5.1'), (854,'частный','ОП','п. 7.1'), (855,'частный','ОП','п. 6.1'), (856,'частный','ОП','п. 5.1'), (857,'частный','ОП','п. 7.1'),
(858,'частный','ОП','п. 6.1'), (859,'частный','ОП','п. 5.1'), (860,'частный','ОП','п. 7.1'), (861,'частный','ОП','п. 6.1'), (862,'частный','ОП','п. 5.1'),
(863,'частный','ОП','п. 7.1'), (864,'частный','ОП','п. 6.1'), (865,'частный','ОП','п. 5.1'), (866,'частный','ОП','п. 7.1'), (867,'частный','ОП','п. 6.1'),
(868,'частный','ОП','п. 5.1'),
(197,'частный','ОП','не заполняется'), (199,'частный','ОП','не заполняется'), (297,'частный','ОП','не заполняется'), (697,'частный','ОП','не заполняется'),
(146,'частный','ОП','не заполняется'), (191,'частный','ОП','не заполняется'), (192,'частный','ОП','не заполняется'), (193,'частный','ОП','не заполняется'),
(194,'частный','ОП','не заполняется'), (546,'частный','ОП','не заполняется'), (591,'частный','ОП','не заполняется'), (592,'частный','ОП','не заполняется'),
(593,'частный','ОП','не заполняется'), (594,'частный','ОП','не заполняется'),
(101,'частный','не ОП','п. 1.1'), (102,'частный','не ОП','п. 3.1'), (103,'частный','не ОП','п. 8.1'), (104,'частный','не ОП','п. 4.2'), (105,'частный','не ОП','п. 2.2'),
(151,'частный','не ОП','п. 1.1'), (152,'частный','не ОП','п. 3.1'), (153,'частный','не ОП','п. 8.1'), (154,'частный','не ОП','п. 1.1'), (155,'частный','не ОП','п. 3.1'),
(156,'частный','не ОП','п. 8.1'), (157,'частный','не ОП','п. 1.1'), (158,'частный','не ОП','п. 3.1'), (159,'частный','не ОП','п. 8.1'), (160,'частный','не ОП','п. 1.1'),
(161,'частный','не ОП','п. 3.1'), (162,'частный','не ОП','п. 8.1'), (163,'частный','не ОП','п. 1.1'), (164,'частный','не ОП','п. 3.1'), (165,'частный','не ОП','п. 8.1'),
(166,'частный','не ОП','п. 1.1'), (167,'частный','не ОП','п. 3.1'), (168,'частный','не ОП','п. 8.1'), (169,'частный','не ОП','п. 4.2'), (170,'частный','не ОП','п. 2.2'),
(171,'частный','не ОП','п. 4.2'), (172,'частный','не ОП','п. 2.2'), (173,'частный','не ОП','п. 4.2'), (174,'частный','не ОП','п. 2.2'), (175,'частный','не ОП','п. 4.2'),
(176,'частный','не ОП','п. 2.2'), (177,'частный','не ОП','п. 4.2'), (178,'частный','не ОП','п. 2.2'), (179,'частный','не ОП','п. 4.2'), (180,'частный','не ОП','п. 2.2'),
(401,'частный','не ОП','п. 1.1'), (402,'частный','не ОП','п. 3.1'), (403,'частный','не ОП','п. 8.1'), (404,'частный','не ОП','п. 4.2'), (405,'частный','не ОП','п. 2.2'),
(406,'частный','не ОП','п. 7.2'), (407,'частный','не ОП','п. 6.1'), (408,'частный','не ОП','п. 5.2'), (501,'частный','не ОП','п. 7.2'), (502,'частный','не ОП','п. 6.1'),
(503,'частный','не ОП','п. 5.2'), (551,'частный','не ОП','п. 7.2'), (552,'частный','не ОП','п. 6.1'), (553,'частный','не ОП','п. 5.2'), (554,'частный','не ОП','п. 7.2'),
(555,'частный','не ОП','п. 6.1'), (556,'частный','не ОП','п. 5.2'), (557,'частный','не ОП','п. 7.2'), (558,'частный','не ОП','п. 6.1'), (559,'частный','не ОП','п. 5.2'),
(560,'частный','не ОП','п. 7.2'), (561,'частный','не ОП','п. 6.1'), (562,'частный','не ОП','п. 5.2'), (563,'частный','не ОП','п. 7.2'), (564,'частный','не ОП','п. 6.1'),
(565,'частный','не ОП','п. 5.2'), (566,'частный','не ОП','п. 7.2'), (567,'частный','не ОП','п. 6.1'), (568,'частный','не ОП','п. 5.2'),
(201,'частный','не ОП','п. 1.1'), (202,'частный','не ОП','п. 3.1'), (203,'частный','не ОП','п. 8.1'), (204,'частный','не ОП','п. 4.2'), (205,'частный','не ОП','п. 2.2'),
(251,'частный','не ОП','п. 1.1'), (252,'частный','не ОП','п. 3.1'), (253,'частный','не ОП','п. 8.1'), (254,'частный','не ОП','п. 1.1'), (255,'частный','не ОП','п. 3.1'),
(256,'частный','не ОП','п. 8.1'), (257,'частный','не ОП','п. 1.1'), (258,'частный','не ОП','п. 3.1'), (259,'частный','не ОП','п. 8.1'), (260,'частный','не ОП','п. 1.1'),
(261,'частный','не ОП','п. 3.1'), (262,'частный','не ОП','п. 8.1'), (263,'частный','не ОП','п. 1.1'), (264,'частный','не ОП','п. 3.1'), (265,'частный','не ОП','п. 8.1'),
(266,'частный','не ОП','п. 1.1'), (267,'частный','не ОП','п. 3.1'), (268,'частный','не ОП','п. 8.1'), (269,'частный','не ОП','п. 4.2'), (270,'частный','не ОП','п. 2.2'),
(271,'частный','не ОП','п. 4.2'), (272,'частный','не ОП','п. 2.2'), (273,'частный','не ОП','п. 4.2'), (274,'частный','не ОП','п. 2.2'), (275,'частный','не ОП','п. 4.2'),
(276,'частный','не ОП','п. 2.2'), (277,'частный','не ОП','п. 4.2'), (278,'частный','не ОП','п. 2.2'), (279,'частный','не ОП','п. 4.2'), (280,'частный','не ОП','п. 2.2'),
(409,'частный','не ОП','п. 1.1'), (410,'частный','не ОП','п. 3.1'), (411,'частный','не ОП','п. 8.1'), (412,'частный','не ОП','п. 4.2'), (413,'частный','не ОП','п. 2.2'),
(414,'частный','не ОП','п. 7.2'), (415,'частный','не ОП','п. 6.1'), (416,'частный','не ОП','п. 5.2'), (701,'частный','не ОП','п. 7.2'), (702,'частный','не ОП','п. 6.1'),
(703,'частный','не ОП','п. 5.2'), (751,'частный','не ОП','п. 7.2'), (752,'частный','не ОП','п. 6.1'), (753,'частный','не ОП','п. 5.2'), (754,'частный','не ОП','п. 7.2'),
(755,'частный','не ОП','п. 6.1'), (756,'частный','не ОП','п. 5.2'), (757,'частный','не ОП','п. 7.2'), (758,'частный','не ОП','п. 6.1'), (759,'частный','не ОП','п. 5.2'),
(760,'частный','не ОП','п. 7.2'), (761,'частный','не ОП','п. 6.1'), (762,'частный','не ОП','п. 5.2'), (763,'частный','не ОП','п. 7.2'), (764,'частный','не ОП','п. 6.1'),
(765,'частный','не ОП','п. 5.2'), (766,'частный','не ОП','п. 7.2'), (767,'частный','не ОП','п. 6.1'), (768,'частный','не ОП','п. 5.2'),
(417,'частный','не ОП','п. 1.1'), (418,'частный','не ОП','п. 3.1'), (419,'частный','не ОП','п. 8.1'), (420,'частный','не ОП','п. 4.2'), (421,'частный','не ОП','п. 2.2'),
(422,'частный','не ОП','п. 7.2'), (423,'частный','не ОП','п. 6.1'), (424,'частный','не ОП','п. 5.2'), (601,'частный','не ОП','п. 1.1'), (602,'частный','не ОП','п. 3.1'),
(603,'частный','не ОП','п. 8.1'), (604,'частный','не ОП','п. 4.2'), (605,'частный','не ОП','п. 2.2'), (651,'частный','не ОП','п. 1.1'), (652,'частный','не ОП','п. 3.1'),
(653,'частный','не ОП','п. 8.1'), (654,'частный','не ОП','п. 1.1'), (655,'частный','не ОП','п. 3.1'), (656,'частный','не ОП','п. 8.1'), (657,'частный','не ОП','п. 1.1'),
(658,'частный','не ОП','п. 3.1'), (659,'частный','не ОП','п. 8.1'), (660,'частный','не ОП','п. 1.1'), (661,'частный','не ОП','п. 3.1'), (662,'частный','не ОП','п. 8.1'),
(663,'частный','не ОП','п. 1.1'), (664,'частный','не ОП','п. 3.1'), (665,'частный','не ОП','п. 8.1'), (666,'частный','не ОП','п. 1.1'), (667,'частный','не ОП','п. 3.1'),
(668,'частный','не ОП','п. 8.1'), (669,'частный','не ОП','п. 4.2'), (670,'частный','не ОП','п. 2.2'), (671,'частный','не ОП','п. 4.2'), (672,'частный','не ОП','п. 2.2'),
(673,'частный','не ОП','п. 4.2'), (674,'частный','не ОП','п. 2.2'), (675,'частный','не ОП','п. 4.2'), (676,'частный','не ОП','п. 2.2'), (677,'частный','не ОП','п. 4.2'),
(678,'частный','не ОП','п. 2.2'), (679,'частный','не ОП','п. 4.2'), (680,'частный','не ОП','п. 2.2'),
(801,'частный','не ОП','п. 7.2'), (802,'частный','не ОП','п. 6.1'), (803,'частный','не ОП','п. 5.2'), (851,'частный','не ОП','п. 7.2'), (852,'частный','не ОП','п. 6.1'),
(853,'частный','не ОП','п. 5.2'), (854,'частный','не ОП','п. 7.2'), (855,'частный','не ОП','п. 6.1'), (856,'частный','не ОП','п. 5.2'), (857,'частный','не ОП','п. 7.2'),
(858,'частный','не ОП','п. 6.1'), (859,'частный','не ОП','п. 5.2'), (860,'частный','не ОП','п. 7.2'), (861,'частный','не ОП','п. 6.1'), (862,'частный','не ОП','п. 5.2'),
(863,'частный','не ОП','п. 7.2'), (864,'частный','не ОП','п. 6.1'), (865,'частный','не ОП','п. 5.2'), (866,'частный','не ОП','п. 7.2'), (867,'частный','не ОП','п. 6.1'),
(868,'частный','не ОП','п. 5.2'),
(197,'частный','не ОП','не заполняется'), (199,'частный','не ОП','не заполняется'), (297,'частный','не ОП','не заполняется'), (697,'частный','не ОП','не заполняется'),
(146,'частный','не ОП','не заполняется'), (191,'частный','не ОП','не заполняется'), (192,'частный','не ОП','не заполняется'), (193,'частный','не ОП','не заполняется'),
(194,'частный','не ОП','не заполняется'), (546,'частный','не ОП','не заполняется'), (591,'частный','не ОП','не заполняется'), (592,'частный','не ОП','не заполняется'),
(593,'частный','не ОП','не заполняется'), (594,'частный','не ОП','не заполняется'),
(101,'МКД','ОП','п. 1.4'), (102,'МКД','ОП','п. 3.2'), (103,'МКД','ОП','п. 8.2'), (104,'МКД','ОП','п. 4.3'), (105,'МКД','ОП','п. 2.3'),
(151,'МКД','ОП','п. 1.4'), (152,'МКД','ОП','п. 3.2'), (153,'МКД','ОП','п. 8.2'), (154,'МКД','ОП','п. 1.4'), (155,'МКД','ОП','п. 3.2'),
(156,'МКД','ОП','п. 8.2'), (157,'МКД','ОП','п. 1.4'), (158,'МКД','ОП','п. 3.2'), (159,'МКД','ОП','п. 8.2'), (160,'МКД','ОП','п. 1.4'),
(161,'МКД','ОП','п. 3.2'), (162,'МКД','ОП','п. 8.2'), (163,'МКД','ОП','п. 1.4'), (164,'МКД','ОП','п. 3.2'), (165,'МКД','ОП','п. 8.2'),
(166,'МКД','ОП','п. 1.4'), (167,'МКД','ОП','п. 3.2'), (168,'МКД','ОП','п. 8.2'), (169,'МКД','ОП','п. 4.3'), (170,'МКД','ОП','п. 2.3'),
(171,'МКД','ОП','п. 4.3'), (172,'МКД','ОП','п. 2.3'), (173,'МКД','ОП','п. 4.3'), (174,'МКД','ОП','п. 2.3'), (175,'МКД','ОП','п. 4.3'),
(176,'МКД','ОП','п. 2.3'), (177,'МКД','ОП','п. 4.3'), (178,'МКД','ОП','п. 2.3'), (179,'МКД','ОП','п. 4.3'), (180,'МКД','ОП','п. 2.3'),
(401,'МКД','ОП','п. 1.4'), (402,'МКД','ОП','п. 3.2'), (403,'МКД','ОП','п. 8.2'), (404,'МКД','ОП','п. 4.3'), (405,'МКД','ОП','п. 2.3'),
(406,'МКД','ОП','п. 7.3'), (407,'МКД','ОП','п. 6.2'), (408,'МКД','ОП','п. 5.3'), (501,'МКД','ОП','п. 7.3'), (502,'МКД','ОП','п. 6.2'),
(503,'МКД','ОП','п. 5.3'), (551,'МКД','ОП','п. 7.3'), (552,'МКД','ОП','п. 6.2'), (553,'МКД','ОП','п. 5.3'), (554,'МКД','ОП','п. 7.3'),
(555,'МКД','ОП','п. 6.2'), (556,'МКД','ОП','п. 5.3'), (557,'МКД','ОП','п. 7.3'), (558,'МКД','ОП','п. 6.2'), (559,'МКД','ОП','п. 5.3'),
(560,'МКД','ОП','п. 7.3'), (561,'МКД','ОП','п. 6.2'), (562,'МКД','ОП','п. 5.3'), (563,'МКД','ОП','п. 7.3'), (564,'МКД','ОП','п. 6.2'),
(565,'МКД','ОП','п. 5.3'), (566,'МКД','ОП','п. 7.3'), (567,'МКД','ОП','п. 6.2'), (568,'МКД','ОП','п. 5.3'),
(201,'МКД','ОП','п. 1.4'), (202,'МКД','ОП','п. 3.2'), (203,'МКД','ОП','п. 8.2'), (204,'МКД','ОП','п. 4.3'), (205,'МКД','ОП','п. 2.3'),
(251,'МКД','ОП','п. 1.4'), (252,'МКД','ОП','п. 3.2'), (253,'МКД','ОП','п. 8.2'), (254,'МКД','ОП','п. 1.4'), (255,'МКД','ОП','п. 3.2'),
(256,'МКД','ОП','п. 8.2'), (257,'МКД','ОП','п. 1.4'), (258,'МКД','ОП','п. 3.2'), (259,'МКД','ОП','п. 8.2'), (260,'МКД','ОП','п. 1.4'),
(261,'МКД','ОП','п. 3.2'), (262,'МКД','ОП','п. 8.2'), (263,'МКД','ОП','п. 1.4'), (264,'МКД','ОП','п. 3.2'), (265,'МКД','ОП','п. 8.2'),
(266,'МКД','ОП','п. 1.4'), (267,'МКД','ОП','п. 3.2'), (268,'МКД','ОП','п. 8.2'), (269,'МКД','ОП','п. 4.3'), (270,'МКД','ОП','п. 2.3'),
(271,'МКД','ОП','п. 4.3'), (272,'МКД','ОП','п. 2.3'), (273,'МКД','ОП','п. 4.3'), (274,'МКД','ОП','п. 2.3'), (275,'МКД','ОП','п. 4.3'),
(276,'МКД','ОП','п. 2.3'), (277,'МКД','ОП','п. 4.3'), (278,'МКД','ОП','п. 2.3'), (279,'МКД','ОП','п. 4.3'), (280,'МКД','ОП','п. 2.3'),
(409,'МКД','ОП','п. 1.4'), (410,'МКД','ОП','п. 3.2'), (411,'МКД','ОП','п. 8.2'), (412,'МКД','ОП','п. 4.3'), (413,'МКД','ОП','п. 2.3'),
(414,'МКД','ОП','п. 7.3'), (415,'МКД','ОП','п. 6.2'), (416,'МКД','ОП','п. 5.3'), (701,'МКД','ОП','п. 7.3'), (702,'МКД','ОП','п. 6.2'),
(703,'МКД','ОП','п. 5.3'), (751,'МКД','ОП','п. 7.3'), (752,'МКД','ОП','п. 6.2'), (753,'МКД','ОП','п. 5.3'), (754,'МКД','ОП','п. 7.3'),
(755,'МКД','ОП','п. 6.2'), (756,'МКД','ОП','п. 5.3'), (757,'МКД','ОП','п. 7.3'), (758,'МКД','ОП','п. 6.2'), (759,'МКД','ОП','п. 5.3'),
(760,'МКД','ОП','п. 7.3'), (761,'МКД','ОП','п. 6.2'), (762,'МКД','ОП','п. 5.3'), (763,'МКД','ОП','п. 7.3'), (764,'МКД','ОП','п. 6.2'),
(765,'МКД','ОП','п. 5.3'), (766,'МКД','ОП','п. 7.3'), (767,'МКД','ОП','п. 6.2'), (768,'МКД','ОП','п. 5.3'),
(417,'МКД','ОП','п. 1.4'), (418,'МКД','ОП','п. 3.2'), (419,'МКД','ОП','п. 8.2'), (420,'МКД','ОП','п. 4.3'), (421,'МКД','ОП','п. 2.3'),
(422,'МКД','ОП','п. 7.3'), (423,'МКД','ОП','п. 6.2'), (424,'МКД','ОП','п. 5.3'), (601,'МКД','ОП','п. 1.4'), (602,'МКД','ОП','п. 3.2'),
(603,'МКД','ОП','п. 8.2'), (604,'МКД','ОП','п. 4.3'), (605,'МКД','ОП','п. 2.3'), (651,'МКД','ОП','п. 1.4'), (652,'МКД','ОП','п. 3.2'),
(653,'МКД','ОП','п. 8.2'), (654,'МКД','ОП','п. 1.4'), (655,'МКД','ОП','п. 3.2'), (656,'МКД','ОП','п. 8.2'), (657,'МКД','ОП','п. 1.4'),
(658,'МКД','ОП','п. 3.2'), (659,'МКД','ОП','п. 8.2'), (660,'МКД','ОП','п. 1.4'), (661,'МКД','ОП','п. 3.2'), (662,'МКД','ОП','п. 8.2'),
(663,'МКД','ОП','п. 1.4'), (664,'МКД','ОП','п. 3.2'), (665,'МКД','ОП','п. 8.2'), (666,'МКД','ОП','п. 1.4'), (667,'МКД','ОП','п. 3.2'),
(668,'МКД','ОП','п. 8.2'), (669,'МКД','ОП','п. 4.3'), (670,'МКД','ОП','п. 2.3'), (671,'МКД','ОП','п. 4.3'), (672,'МКД','ОП','п. 2.3'),
(673,'МКД','ОП','п. 4.3'), (674,'МКД','ОП','п. 2.3'), (675,'МКД','ОП','п. 4.3'), (676,'МКД','ОП','п. 2.3'), (677,'МКД','ОП','п. 4.3'),
(678,'МКД','ОП','п. 2.3'), (679,'МКД','ОП','п. 4.3'), (680,'МКД','ОП','п. 2.3'),
(801,'МКД','ОП','п. 7.3'), (802,'МКД','ОП','п. 6.2'), (803,'МКД','ОП','п. 5.3'), (851,'МКД','ОП','п. 7.3'), (852,'МКД','ОП','п. 6.2'),
(853,'МКД','ОП','п. 5.3'), (854,'МКД','ОП','п. 7.3'), (855,'МКД','ОП','п. 6.2'), (856,'МКД','ОП','п. 5.3'), (857,'МКД','ОП','п. 7.3'),
(858,'МКД','ОП','п. 6.2'), (859,'МКД','ОП','п. 5.3'), (860,'МКД','ОП','п. 7.3'), (861,'МКД','ОП','п. 6.2'), (862,'МКД','ОП','п. 5.3'),
(863,'МКД','ОП','п. 7.3'), (864,'МКД','ОП','п. 6.2'), (865,'МКД','ОП','п. 5.3'), (866,'МКД','ОП','п. 7.3'), (867,'МКД','ОП','п. 6.2'),
(868,'МКД','ОП','п. 5.3'),
(197,'МКД','ОП','не заполняется'), (199,'МКД','ОП','не заполняется'), (297,'МКД','ОП','не заполняется'), (697,'МКД','ОП','не заполняется'),
(146,'МКД','ОП','не заполняется'), (191,'МКД','ОП','не заполняется'), (192,'МКД','ОП','не заполняется'), (193,'МКД','ОП','не заполняется'),
(194,'МКД','ОП','не заполняется'), (546,'МКД','ОП','не заполняется'), (591,'МКД','ОП','не заполняется'), (592,'МКД','ОП','не заполняется'),
(593,'МКД','ОП','не заполняется'), (594,'МКД','ОП','не заполняется'),
(101,'МКД','не ОП','п. 1.4'), (102,'МКД','не ОП','п. 3.2'), (103,'МКД','не ОП','п. 8.2'), (104,'МКД','не ОП','п. 4.6'), (105,'МКД','не ОП','п. 2.6'),
(151,'МКД','не ОП','п. 1.4'), (152,'МКД','не ОП','п. 3.2'), (153,'МКД','не ОП','п. 8.2'), (154,'МКД','не ОП','п. 1.4'), (155,'МКД','не ОП','п. 3.2'),
(156,'МКД','не ОП','п. 8.2'), (157,'МКД','не ОП','п. 1.4'), (158,'МКД','не ОП','п. 3.2'), (159,'МКД','не ОП','п. 8.2'), (160,'МКД','не ОП','п. 1.4'),
(161,'МКД','не ОП','п. 3.2'), (162,'МКД','не ОП','п. 8.2'), (163,'МКД','не ОП','п. 1.4'), (164,'МКД','не ОП','п. 3.2'), (165,'МКД','не ОП','п. 8.2'),
(166,'МКД','не ОП','п. 1.4'), (167,'МКД','не ОП','п. 3.2'), (168,'МКД','не ОП','п. 8.2'), (169,'МКД','не ОП','п. 4.6'), (170,'МКД','не ОП','п. 2.6'),
(171,'МКД','не ОП','п. 4.6'), (172,'МКД','не ОП','п. 2.6'), (173,'МКД','не ОП','п. 4.6'), (174,'МКД','не ОП','п. 2.6'), (175,'МКД','не ОП','п. 4.6'),
(176,'МКД','не ОП','п. 2.6'), (177,'МКД','не ОП','п. 4.6'), (178,'МКД','не ОП','п. 2.6'), (179,'МКД','не ОП','п. 4.6'), (180,'МКД','не ОП','п. 2.6'),
(401,'МКД','не ОП','п. 1.4'), (402,'МКД','не ОП','п. 3.2'), (403,'МКД','не ОП','п. 8.2'), (404,'МКД','не ОП','п. 4.6'), (405,'МКД','не ОП','п. 2.6'),
(406,'МКД','не ОП','п. 7.6'), (407,'МКД','не ОП','п. 6.2'), (408,'МКД','не ОП','п. 5.6'), (501,'МКД','не ОП','п. 7.6'), (502,'МКД','не ОП','п. 6.2'),
(503,'МКД','не ОП','п. 5.6'), (551,'МКД','не ОП','п. 7.6'), (552,'МКД','не ОП','п. 6.2'), (553,'МКД','не ОП','п. 5.6'), (554,'МКД','не ОП','п. 7.6'),
(555,'МКД','не ОП','п. 6.2'), (556,'МКД','не ОП','п. 5.6'), (557,'МКД','не ОП','п. 7.6'), (558,'МКД','не ОП','п. 6.2'), (559,'МКД','не ОП','п. 5.6'),
(560,'МКД','не ОП','п. 7.6'), (561,'МКД','не ОП','п. 6.2'), (562,'МКД','не ОП','п. 5.6'), (563,'МКД','не ОП','п. 7.6'), (564,'МКД','не ОП','п. 6.2'),
(565,'МКД','не ОП','п. 5.6'), (566,'МКД','не ОП','п. 7.6'), (567,'МКД','не ОП','п. 6.2'), (568,'МКД','не ОП','п. 5.6'),
(201,'МКД','не ОП','п. 1.4'), (202,'МКД','не ОП','п. 3.2'), (203,'МКД','не ОП','п. 8.2'), (204,'МКД','не ОП','п. 4.6'), (205,'МКД','не ОП','п. 2.6'),
(251,'МКД','не ОП','п. 1.4'), (252,'МКД','не ОП','п. 3.2'), (253,'МКД','не ОП','п. 8.2'), (254,'МКД','не ОП','п. 1.4'), (255,'МКД','не ОП','п. 3.2'),
(256,'МКД','не ОП','п. 8.2'), (257,'МКД','не ОП','п. 1.4'), (258,'МКД','не ОП','п. 3.2'), (259,'МКД','не ОП','п. 8.2'), (260,'МКД','не ОП','п. 1.4'),
(261,'МКД','не ОП','п. 3.2'), (262,'МКД','не ОП','п. 8.2'), (263,'МКД','не ОП','п. 1.4'), (264,'МКД','не ОП','п. 3.2'), (265,'МКД','не ОП','п. 8.2'),
(266,'МКД','не ОП','п. 1.4'), (267,'МКД','не ОП','п. 3.2'), (268,'МКД','не ОП','п. 8.2'), (269,'МКД','не ОП','п. 4.6'), (270,'МКД','не ОП','п. 2.6'),
(271,'МКД','не ОП','п. 4.6'), (272,'МКД','не ОП','п. 2.6'), (273,'МКД','не ОП','п. 4.6'), (274,'МКД','не ОП','п. 2.6'), (275,'МКД','не ОП','п. 4.6'),
(276,'МКД','не ОП','п. 2.6'), (277,'МКД','не ОП','п. 4.6'), (278,'МКД','не ОП','п. 2.6'), (279,'МКД','не ОП','п. 4.6'), (280,'МКД','не ОП','п. 2.6'),
(409,'МКД','не ОП','п. 1.4'), (410,'МКД','не ОП','п. 3.2'), (411,'МКД','не ОП','п. 8.2'), (412,'МКД','не ОП','п. 4.6'), (413,'МКД','не ОП','п. 2.6'),
(414,'МКД','не ОП','п. 7.6'), (415,'МКД','не ОП','п. 6.2'), (416,'МКД','не ОП','п. 5.6'), (701,'МКД','не ОП','п. 7.6'), (702,'МКД','не ОП','п. 6.2'),
(703,'МКД','не ОП','п. 5.6'), (751,'МКД','не ОП','п. 7.6'), (752,'МКД','не ОП','п. 6.2'), (753,'МКД','не ОП','п. 5.6'), (754,'МКД','не ОП','п. 7.6'),
(755,'МКД','не ОП','п. 6.2'), (756,'МКД','не ОП','п. 5.6'), (757,'МКД','не ОП','п. 7.6'), (758,'МКД','не ОП','п. 6.2'), (759,'МКД','не ОП','п. 5.6'),
(760,'МКД','не ОП','п. 7.6'), (761,'МКД','не ОП','п. 6.2'), (762,'МКД','не ОП','п. 5.6'), (763,'МКД','не ОП','п. 7.6'), (764,'МКД','не ОП','п. 6.2'),
(765,'МКД','не ОП','п. 5.6'), (766,'МКД','не ОП','п. 7.6'), (767,'МКД','не ОП','п. 6.2'), (768,'МКД','не ОП','п. 5.6'),
(417,'МКД','не ОП','п. 1.4'), (418,'МКД','не ОП','п. 3.2'), (419,'МКД','не ОП','п. 8.2'), (420,'МКД','не ОП','п. 4.6'), (421,'МКД','не ОП','п. 2.6'),
(422,'МКД','не ОП','п. 7.6'), (423,'МКД','не ОП','п. 6.2'), (424,'МКД','не ОП','п. 5.6'), (601,'МКД','не ОП','п. 1.4'), (602,'МКД','не ОП','п. 3.2'),
(603,'МКД','не ОП','п. 8.2'), (604,'МКД','не ОП','п. 4.6'), (605,'МКД','не ОП','п. 2.6'), (651,'МКД','не ОП','п. 1.4'), (652,'МКД','не ОП','п. 3.2'),
(653,'МКД','не ОП','п. 8.2'), (654,'МКД','не ОП','п. 1.4'), (655,'МКД','не ОП','п. 3.2'), (656,'МКД','не ОП','п. 8.2'), (657,'МКД','не ОП','п. 1.4'),
(658,'МКД','не ОП','п. 3.2'), (659,'МКД','не ОП','п. 8.2'), (660,'МКД','не ОП','п. 1.4'), (661,'МКД','не ОП','п. 3.2'), (662,'МКД','не ОП','п. 8.2'),
(663,'МКД','не ОП','п. 1.4'), (664,'МКД','не ОП','п. 3.2'), (665,'МКД','не ОП','п. 8.2'), (666,'МКД','не ОП','п. 1.4'), (667,'МКД','не ОП','п. 3.2'),
(668,'МКД','не ОП','п. 8.2'), (669,'МКД','не ОП','п. 4.6'), (670,'МКД','не ОП','п. 2.6'), (671,'МКД','не ОП','п. 4.6'), (672,'МКД','не ОП','п. 2.6'),
(673,'МКД','не ОП','п. 4.6'), (674,'МКД','не ОП','п. 2.6'), (675,'МКД','не ОП','п. 4.6'), (676,'МКД','не ОП','п. 2.6'), (677,'МКД','не ОП','п. 4.6'),
(678,'МКД','не ОП','п. 2.6'), (679,'МКД','не ОП','п. 4.6'), (680,'МКД','не ОП','п. 2.6'),
(801,'МКД','не ОП','п. 7.6'), (802,'МКД','не ОП','п. 6.2'), (803,'МКД','не ОП','п. 5.6'), (851,'МКД','не ОП','п. 7.6'), (852,'МКД','не ОП','п. 6.2'),
(853,'МКД','не ОП','п. 5.6'), (854,'МКД','не ОП','п. 7.6'), (855,'МКД','не ОП','п. 6.2'), (856,'МКД','не ОП','п. 5.6'), (857,'МКД','не ОП','п. 7.6'),
(858,'МКД','не ОП','п. 6.2'), (859,'МКД','не ОП','п. 5.6'), (860,'МКД','не ОП','п. 7.6'), (861,'МКД','не ОП','п. 6.2'), (862,'МКД','не ОП','п. 5.6'),
(863,'МКД','не ОП','п. 7.6'), (864,'МКД','не ОП','п. 6.2'), (865,'МКД','не ОП','п. 5.6'), (866,'МКД','не ОП','п. 7.6'), (867,'МКД','не ОП','п. 6.2'),
(868,'МКД','не ОП','п. 5.6'),
(197,'МКД','не ОП','не заполняется'), (199,'МКД','не ОП','не заполняется'), (297,'МКД','не ОП','не заполняется'), (697,'МКД','не ОП','не заполняется'),
(146,'МКД','не ОП','не заполняется'), (191,'МКД','не ОП','не заполняется'), (192,'МКД','не ОП','не заполняется'), (193,'МКД','не ОП','не заполняется'),
(194,'МКД','не ОП','не заполняется'), (546,'МКД','не ОП','не заполняется'), (591,'МКД','не ОП','не заполняется'), (592,'МКД','не ОП','не заполняется'),
(593,'МКД','не ОП','не заполняется'), (594,'МКД','не ОП','не заполняется');

DECLARE @Date datetime = getDate();

;with data as(
select distinct l.row_id,li.Родитель,
case isnull(ts_ls.Значение,ts.Значение ) 
            when '0' then 'МКД'             
            when '2' then 'МКД'             
            else 'Частный' end [Тип строения],
case when lgot.Значение is null then 'нет' else 'да' end [Льготник],
row_number() over (partition by li.Потомок order by li.Уровень) rn
from
stack.[Лицевые счета] l 
join stack.[Лицевые иерархия] li on li.Потомок  = l.row_id and li.РодительТип  in (3,12,14,13,1,0)
--join stack.[Лицевые иерархия] li1 on li1.Потомок  = l.row_id and li1.Родитель  in (@uch)
outer apply
(
select top 1 sv.Значение  
from stack.Свойства sv
JOIN stack.[Виды параметров] vp ON sv.[Виды-Параметры] = vp.ROW_ID AND vp.Название = 'ТИПСТРОЙ'
where sv.[Счет-Параметры] = li.Родитель AND @dn BETWEEN sv.ДатНач AND sv.ДатКнц
order by sv.ДатКнц desc) ts
outer apply
(
select top 1 sv.Значение  
from stack.Свойства sv
JOIN stack.[Виды параметров] vp ON sv.[Виды-Параметры] = vp.ROW_ID AND vp.Название = 'ТИПСТРОЙ'
where sv.[Счет-Параметры] = l.row_id AND @dn BETWEEN sv.ДатНач AND sv.ДатКнц
order by sv.ДатКнц desc) ts_ls
outer apply
(
select top 1 sv.Значение  
from stack.Свойства sv
where sv.[Счет-Параметры] = l.row_id AND @dn BETWEEN sv.ДатНач AND sv.ДатКнц and sv.[Виды-Параметры] = @p1 and sv.Значение = 1 
order by sv.ДатКнц desc) lgot
where l.тип = 5 
)

insert into #ls
select row_id, Родитель, [Тип строения], [Льготник]
from data
where rn = 1

-- Собираем данные по каждому ЛС
;with data_tarif as(
    select 'ФЛ' БД, nl.[Месяц расчета] Месяц, ls.Номер ЛС, l.privileged, hs.value, l.house_type, nl.[Номер услуги] Услуга, nl.ДоговорУК, nl.Поставщик,
    hs.value heating, 
    case when (l.privileged = 'да') or (@reg in (51,67) and org.Наименование not like '%Росатом Энергосбыт%') then 'не заполняется' else s.Строка_таблицы end Строка_таблицы, 
    0 ОбъемПер, 0 СуммаПер,
    cast(nl.Объем as numeric(16,3)) as Объем,
    cast(nl.Сумма as numeric(16,3)) as Сумма
    from stack.НТариф nl
    join #ls l on l.ls_id = nl.Счет
    join #heating_season hs on hs.date = nl.[Месяц расчета]
    join stack.[Лицевые счета] ls on ls.row_id = l.ls_id
    join #service s on s.Услуга = nl.[Номер услуги] and s.Сезон = hs.value and lower(s.ТипСтрой) = lower(l.house_type)
    left join stack.[УК Договоры] ukd on ukd.row_id = nl.ДоговорУК
    left join stack.Организации org on org.row_id = ukd.[Организация-УКДоговор]
    where nl.[Месяц расчета] between @dn and @dk 
        
    union all
    
    select 'ФЛ' БД, nl.[Месяц расчета] Месяц, ls.Номер ЛС, l.privileged, hs.value, l.house_type, nl.[Номер услуги] Услуга, nl.ДоговорУК, nl.Поставщик,
    hs.value heating, 
    case when (l.privileged = 'да') or (@reg in (51,67) and org.Наименование not like '%Росатом Энергосбыт%') then 'не заполняется' else s.Строка_таблицы end Строка_таблицы, 
    0 ОбъемПер, 0 СуммаПер,
    cast(nl.Объем as numeric(16,3)) as Объем,
    cast(nl.Сумма as numeric(16,3)) as Сумма
    from stack.НПТариф nl
    join #ls l on l.ls_id = nl.Счет
    join #heating_season hs on hs.date = nl.[Месяц расчета]
    join stack.[Лицевые счета] ls on ls.row_id = l.ls_id
    join #service s on s.Услуга = nl.[Номер услуги] and s.Сезон = hs.value and lower(s.ТипСтрой) = lower(l.house_type)
    left join stack.[УК Договоры] ukd on ukd.row_id = nl.ДоговорУК
    left join stack.Организации org on org.row_id = ukd.[Организация-УКДоговор]
    where nl.[Месяц расчета] between @dn and @dk and nl.Перерасчет >= @startOfYear

    union all

    select 'ФЛ' БД, nl.[Месяц расчета] Месяц, ls.Номер ЛС, l.privileged, hs.value, l.house_type, nl.[Номер услуги] Услуга, nl.ДоговорУК, nl.Поставщик,
    hs.value heating, 
    case when (l.privileged = 'да') or (@reg in (51,67) and org.Наименование not like '%Росатом Энергосбыт%') then 'не заполняется' else s.Строка_таблицы end Строка_таблицы,
    nl.Объем ОбъемПер, nl.Сумма СуммаПер,
    0 as Объем,
    0 as Сумма
    from stack.НПТариф nl
    join #ls l on l.ls_id = nl.Счет
    join #heating_season hs on hs.date = nl.[Месяц расчета]
    join stack.[Лицевые счета] ls on ls.row_id = l.ls_id
    join #service s on s.Услуга = nl.[Номер услуги] and s.Сезон = hs.value and lower(s.ТипСтрой) = lower(l.house_type)
    left join stack.[УК Договоры] ukd on ukd.row_id = nl.ДоговорУК
    left join stack.Организации org on org.row_id = ukd.[Организация-УКДоговор]
    where nl.[Месяц расчета] between @dn and @dk and nl.Перерасчет < @startOfYear
),
data_group as(
    select БД, Месяц, ЛС, privileged СоцПоддержка, value Отоп, house_type ТипСтрой, 
           isnull(uk.Наименование,'') УК, '' Поставщик, heating, Строка_таблицы, 
           sum(ОбъемПер) ОбъемПер, sum(СуммаПер) СуммаПер, 
           sum(Объем) Объем, sum(Сумма) Сумма
    from data_tarif d
    left join stack.[УК договоры] ukd on ukd.row_id = d.ДоговорУК
    left join stack.Организации uk on uk.row_id = ukd.[Организация-УКДоговор]
    group by БД, Месяц, ЛС, privileged, value, house_type, isnull(uk.Наименование,''), heating, Строка_таблицы
)
select 
    БД, 
    Месяц, 
    ЛС, 
    СоцПоддержка, 
    Отоп, 
    ТипСтрой, 
    '' УК, 
    '' Поставщик, 
    heating, 
    Строка_таблицы, 
    sum(ОбъемПер) ОбъемПер, 
    sum(СуммаПер) СуммаПер, 
    sum(Объем) Объем, 
    sum(Сумма) Сумма
into #ls_totals 
from data_group
group by 
    БД, 
    Месяц, 
    ЛС, 
    СоцПоддержка, 
    Отоп, 
    ТипСтрой, 
    --УК, 
    --Поставщик, 
    heating, 
    Строка_таблицы
	
-- Динамическое создание диапазонов
IF OBJECT_ID('tempdb..#ranges') IS NOT NULL DROP TABLE #ranges;
CREATE TABLE #ranges (
    range_name varchar(50),
    min_vol numeric(16,3),
    max_vol numeric(16,3)
);

declare @cur int = 0, @end int = 50000, @tmp int;

while @cur < @end
begin
    set @tmp = @cur;
    if @cur < 2000 set @cur = @cur + 100;
    else if @cur >= 2000 and @cur < 5000 set @cur = @cur + 500;
    else if @cur >= 5000 and @cur < 25000 set @cur = @cur + 1000;
    else if @cur >= 25000 set @cur = @cur + 5000;

    insert into #ranges (range_name, min_vol, max_vol)
    values (cast(@tmp as varchar) + '_' + cast(@cur as varchar), cast(@tmp as numeric(16,3)), cast(@cur as numeric(16,3)));
end;
insert into #ranges (range_name, min_vol, max_vol) values ('>50000', 50000, 999999999);

-- Создаем итоговую таблицу (без поля ЛС)
IF OBJECT_ID('tempdb..#result') IS NOT NULL DROP TABLE #result;
CREATE TABLE #result (
    БД varchar(10),
    Месяц date,
    СоцПоддержка varchar(10),
    Отоп varchar(10),
    ТипСтрой varchar(50),
    УК nvarchar(256),
    Поставщик nvarchar(256),
    Строка_таблицы nvarchar(50),
    ОбъемПер numeric(16,3),
    СуммаПер numeric(16,3),
    КолВо int
);

-- Добавляем динамические колонки
declare @col_name varchar(100), @command varchar(max), @range_name varchar(50);
declare cur_cols cursor for select range_name from #ranges;
open cur_cols;
fetch next from cur_cols into @col_name;
while @@fetch_status = 0
begin
    set @command = 'alter table #result add [' + @col_name + '] numeric(16,3)';
    exec(@command);
    
    set @command = 'alter table #result add [' + @col_name + '_количество] int';
    exec(@command);
    
    fetch next from cur_cols into @col_name;
end;
close cur_cols;
deallocate cur_cols;

alter table #result add [<0] numeric(16,3);
alter table #result add [<0_количество] int;
alter table #result add [0] numeric(16,3);
alter table #result add [0_количество] int;

-- Формируем динамический SQL
declare @agg_cols varchar(max) = '';
declare @cols_list varchar(max) = '';

DECLARE cur_agg CURSOR FOR 
SELECT range_name FROM #ranges;

OPEN cur_agg;
FETCH NEXT FROM cur_agg INTO @range_name;

WHILE @@FETCH_STATUS = 0
BEGIN
    SET @agg_cols = @agg_cols + 
        'sum(case when assigned_range = ''' + @range_name + ''' then Объем else 0 end) as [' + @range_name + '],' +
        'sum(case when assigned_range = ''' + @range_name + ''' then 1 else 0 end) as [' + @range_name + '_количество],'
    
    SET @cols_list = @cols_list + ',[' + @range_name + '],[' + @range_name + '_количество]'
    
    FETCH NEXT FROM cur_agg INTO @range_name;
END;

CLOSE cur_agg;
DEALLOCATE cur_agg;

IF LEN(@agg_cols) > 0 SET @agg_cols = LEFT(@agg_cols, LEN(@agg_cols) - 1);
IF LEN(@cols_list) > 0 SET @cols_list = STUFF(@cols_list, 1, 1, '');

-- Основной динамический SQL (без ЛС)
declare @sql nvarchar(max) = N'
;with assigned as (
    select 
        t.БД,
        t.Месяц,
        t.СоцПоддержка,
        t.Отоп,
        t.ТипСтрой,
        t.УК,
        t.Поставщик,
        t.Строка_таблицы,
        t.ОбъемПер,
        t.СуммаПер,
        t.Объем,
        t.Сумма,
        t.ЛС,
        case 
            when t.Объем < 0 then ''<0''
            when t.Объем = 0 then ''0''
            else r.range_name
        end as assigned_range
    from #ls_totals t
    left join #ranges r on t.Объем > r.min_vol and t.Объем <= r.max_vol
)
insert into #result (
    БД, 
    Месяц, 
    СоцПоддержка, 
    Отоп, 
    ТипСтрой, 
    УК, 
    Поставщик, 
    Строка_таблицы, 
    ОбъемПер, 
    СуммаПер, 
    КолВо' + 
    CASE WHEN LEN(@cols_list) > 0 THEN ', ' + @cols_list ELSE '' END + 
    ', [<0], [<0_количество], [0], [0_количество]
)
select 
    t.БД, 
    t.Месяц, 
    t.СоцПоддержка, 
    t.Отоп, 
    t.ТипСтрой, 
    t.УК, 
    t.Поставщик, 
    t.Строка_таблицы,
    sum(t.ОбъемПер) as ОбъемПер,
    sum(t.СуммаПер) as СуммаПер,
    count(distinct t.ЛС) as КолВо' + 
    CASE WHEN LEN(@agg_cols) > 0 THEN ', ' + @agg_cols ELSE '' END + 
    ',
    sum(case when assigned_range = ''<0'' then Объем else 0 end) as [<0],
    sum(case when assigned_range = ''<0'' then 1 else 0 end) as [<0_количество],
    sum(case when assigned_range = ''0'' then Объем else 0 end) as [0],
    sum(case when assigned_range = ''0'' then 1 else 0 end) as [0_количество]
from assigned t
group by 
    t.БД, 
    t.Месяц, 
    t.СоцПоддержка, 
    t.Отоп, 
    t.ТипСтрой, 
    t.УК, 
    t.Поставщик, 
    t.Строка_таблицы;
';
exec sp_executesql @sql;

-- Формируем динамический SQL для финального вывода
declare @final_sql nvarchar(max);
declare @select_columns nvarchar(max) = '';
declare @vol_columns nvarchar(max) = '';
declare @cnt_columns nvarchar(max) = '';

-- Собираем все столбцы с объемами (включая <0 и 0)
SELECT @vol_columns = @vol_columns + '[' + range_name + '], '
FROM #ranges;

-- Добавляем <0 и 0 к объемам
SET @vol_columns = @vol_columns + '[<0], [0]';

-- Собираем все столбцы с количествами (включая <0_количество и 0_количество)
SELECT @cnt_columns = @cnt_columns + '[' + range_name + '_количество], '
FROM #ranges;

-- Добавляем <0_количество и 0_количество к количествам
SET @cnt_columns = @cnt_columns + '[<0_количество], [0_количество]';

-- Формируем финальный SELECT: сначала все объемы, потом все количества
SET @select_columns = @vol_columns + ', ' + @cnt_columns;

-- Убираем лишние пробелы и запятые
SET @select_columns = REPLACE(@select_columns, ', ,', ',');
SET @select_columns = REPLACE(@select_columns, '  ', ' ');

-- Формируем финальный запрос (без ЛС)
SET @final_sql = '
SELECT 
    БД,
    FORMAT(Месяц, ''yyyy [MM] MMMM'', ''ru'') Месяц,
    СоцПоддержка,
    Отоп,
    ТипСтрой,
   -- УК,
   -- Поставщик,
    Строка_таблицы,
    ROUND(ОбъемПер,2) ОбъемПер,
    ROUND(СуммаПер,2) СуммаПер,
    КолВо,
    ' + @select_columns + '
FROM #result 
ORDER BY Месяц, УК, Поставщик, Строка_таблицы';

-- Выполняем финальный запрос
EXEC sp_executesql @final_sql;
`
}
]},
]}
]  //--------Final