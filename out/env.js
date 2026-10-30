var DEFAULT_DB_FL = window.USER_DB_FL || 'DB4FL';
var DEFAULT_DB_UL = window.USER_DB_UL || 'DB4UL';

window.EDITOR_GROUP_IDS = [23];
window.USER_ID = Number(window.USER_ID) || Number(window.BitrixUserData && window.BitrixUserData.profile && window.BitrixUserData.profile.ID);

window.isEditorAllowed = function () {
    if (window.location.hostname !== 'sp.kaesbt.ru') return true;
    var groups = (window.EDITOR_GROUP_IDS || []).map(Number);
    var userGroups = (window.BitrixUserData && window.BitrixUserData.groupIds) || [];
    return userGroups.some(function (g) { return groups.indexOf(Number(g)) !== -1; });
};

const toolbar = [
{
    type: "hierarchical-list",
    var: ["БД"],
    field: "БД",
    label: "Выбран Фонд ",
    placeholder: "Укажите фонд",
    formOrder: 1,
    formColSpan: 2,
    height: "60vh",
    location: "before",
    locateInMenu: "always",
    showClearButton: true,
    itemsQuery: "",
    dbName: DEFAULT_DB_FL,
    labelMode: "static"

},

{
    type: "hr-fond",
    var: ["ФОНД"],
    field: "ФОНД",
    label: "Выбран Фонд ",
    dbName: DEFAULT_DB_FL,
    placeholder: "Укажите фонд",
    formOrder: 1,
    formColSpan: 2,
    height: "100%",
    location: "before",
    locateInMenu: "always",
    showClearButton: true,
    labelMode: "static",
    preload:true,
    itemsQuery: `
;WITH trvw_raw AS (
    SELECT IIF(li.РодительТип = 0 AND li.ПотомокТип = 0, 0, li.Родитель) PARENT,
           li.Потомок ID,
           IIF(li.ПотомокТип != 3, 1, 0) GRP,
           li.ПотомокТип LVL
    FROM [stack].[Лицевые иерархия] li
    WHERE (li.РодительТип = 0  AND li.ПотомокТип = 0  AND li.Потомок NOT IN (1329609,1408059))
       OR (li.РодительТип = 0  AND li.ПотомокТип = 1)
       OR (li.РодительТип = 1  AND li.ПотомокТип = 14)
       OR (li.РодительТип = 14 AND li.ПотомокТип = 12)
       OR (li.РодительТип = 12 AND li.ПотомокТип = 2)
       OR (li.РодительТип = 12 AND li.ПотомокТип = 3)
       OR (li.РодительТип = 2  AND li.ПотомокТип = 3)
),
trvw AS (
    SELECT *,
           ROW_NUMBER() OVER (PARTITION BY ID, LVL ORDER BY PARENT DESC) AS rn
    FROM trvw_raw
)
SELECT trvw.ID, trvw.PARENT, trvw.GRP, trvw.LVL,
       CASE
           WHEN trvw.LVL = 0  THEN adr.Район
           WHEN trvw.LVL = 1  THEN adr.Участок
           WHEN trvw.LVL = 14 THEN ls.Фамилия
           WHEN trvw.LVL = 12 THEN adr.НП
           WHEN trvw.LVL = 2  THEN IIF(adr.Улица='', adr.НП, adr.Улица)
           WHEN trvw.LVL = 3  THEN IIF(adr.Улица='', IIF(adr.ПлСтр='',adr.НП,adr.ПлСтр)+', ', adr.Улица+', ')+'д.'+adr.Дом
           ELSE ''
       END AS NODE
FROM trvw
JOIN [stack].[Лицевые счета] ls ON ls.ROW_ID = trvw.ID
CROSS APPLY stack.AddrLs_Table(trvw.ID, 0) adr
WHERE trvw.rn = 1
ORDER BY NODE;
`
},


{
  type: "multi-select",
  var: ["БД_ЮЛ"],
  field: "БД_ЮЛ",
  label: "Выбраны БД_ЮЛ",
  placeholder: "Укажите БД ЮЛ филиалов",
  dbName: DEFAULT_DB_UL,
  formOrder: 1,
  formColSpan: 2,
  items: [
   { id: "DB1UL", name: "Курск" },
   { id: "DB2UL", name: "Тверь" },
   { id: "DB3UL", name: "Смоленск" },
   { id: "DB4UL", name: "Мурманск" },
   { id: "DB5UL", name: "Хакасия" }  
    ]
},

{
  type: "multi-select-fl",
  var: ["БД_ФЛ"],
  field: "БД_ФЛ",
  label: "Выбраны БД ФЛ",
  placeholder: "Укажите БД ФЛ филиалов",
  formOrder: 1,
  formColSpan: 2,
  items: [
    { id: "DB1FL", name: "Курск" },
    { id: "DB2FL", name: "Тверь" },
    { id: "DB3FL", name: "Смоленск" },
    { id: "DB4FL", name: "Мурманск" },
    { id: "DB5FL", name: "Хакасия" }
    ]
},
// Multi-select-list (список с поиском)
{
    type: "multi-select-list",
    var: ["usl"],
    field: "usl",
    label: "Выбраны услуги",
    placeholder: "Укажите услуги",
    formOrder: 2,
    formColSpan: 2,
    width: 800,
    showClearButton: false,
    showSelectionControls: true,
    selectAllMode: "allPages",
    searchEnabled: true,
    searchExpr: ["name"],
    searchMode: "contains",
    searchTimeout: 500,
    searchPlaceholder: "Поиск...",
    pageLoadMode: "scrollBottom",
    showScrollbar: "onHover",
    location: "before",
    locateInMenu: "always",
    items: ["Теплоноситель", "Отопление"]
  },

// SelectBox
{
    type: "select",
    var: ["РасчетыйМесяц"],
    field: "РасчетыйМесяц",
    label: "Выбран расчетный месяц",
    placeholder: "Укажите расчетный месяц",
    formOrder: 3,
    formColSpan: 1,
    formColIndex: 1,
    width: 350,
    location: "before",
    locateInMenu: "always",
    showInForm: true,
    dynamicDefault: true,
    items: []
},

// Диапазон месяцев
{
    type: "dateRangeMonths",
    var: ["ПериодМесяцы_start", "ПериодМесяцы_end"],
    field: "ПериодМесяцы",
    label: "Период расчета",
    placeholder: "Укажите период расчета",
    dynamicDefault: true,
    formOrder: 4,
    formColSpan: 2,
    formColIndex: 2,
    width: 350,
    displayFormat: "MMM yyyy",
    pickerType: "calendar",
    location: "before",
    locateInMenu: "always",
    calendarOptions: {
      zoomLevel: "year",
      calendarView: "month",
      maxZoomLevel: "year",
      minZoomLevel: "year",
      //min: new Date(2025, 0, 1),
      //max: new Date(2026, 5, 30),
      selectionMode: "range"
    }
  },

  {
  	type: "range-months",
  	var: ["Период_start", "Период_end"],
  	formOrder: 10,
  	formColSpan: 2,
  	formColIndex: 0,
  	field: "Период",
  	label: "Диапазон:",
  	maxRange: { months: 12 },
  	location: "before",
  	locateInMenu: "never",
  },
 

  // Диапазон дат (дни)
  {
    type: "dateRange",
    var: ["ПериодДни_start", "ПериодДни_end"],
    field: "ПериодДни",
    label: "Диапазон дат",
    width: 350,
    formOrder: 5,
    formColSpan: 1,
    formColIndex: 1,
    displayFormat: "dd.MM.yyyy",
    placeholder: "Выберите период",
    applyValueMode: "instantly",
    calendarZoomLevel: "month",
    //minDate: "2025-01-01",
    //maxDate: "2026-06-30",
    firstDayOfWeek: 1,
    dynamicDefault: true,
    location: "before",
    locateInMenu: "always",
    onValueChanged: (e, value) => {
      if (value) {
        console.log('Выбран диапазон:', value.start, '-', value.end);
      }
    }
  },

  // Multi-select-list для расчетного месяца
  {
    type: "multi-select-list",
    var: ["РасчетыеМесяцы"],
    field: "РасчетыеМесяцы",
    label: "Выбраны расчетные месяцы",
    placeholder: "Укажите расчетные месяцы",
    width: 350,
    formOrder: 6,
    formColSpan: 2,
    formColIndex: 0,
    showClearButton: true,
    showSelectionControls: true,
    //selectAllMode: "allPages",
    searchEnabled: false,
    //searchExpr: ["name"],
    //searchMode: "contains",
    //searchTimeout: 500,
    //searchPlaceholder: "Поиск...",
    pageLoadMode: "scrollBottom",
    showScrollbar: "onHover",
    location: "before",
    locateInMenu: "always",
    dynamicDefault: true,
    items: []
  },
//Для САЛЬДО uk.ROW_ID
  {
    type: "multi-select-list",
    var: ["УК"],
    field: "УК",
    label: "Выбран договор УК",
    placeholder: "Укажите договор УК",
    formOrder: 7,
    formColSpan: 2,
    formColIndex: 0,
    width: 800,
    showClearButton: true,
    showSelectionControls: true,
    selectAllMode: "allPages",
    searchEnabled: true,
    searchExpr: ["name"],
    searchMode: "contains",
    searchTimeout: 500,
    searchPlaceholder: "Поиск...",
    pageLoadMode: "scrollBottom",
    showScrollbar: "onHover",
    location: "before",
    locateInMenu: "always",
    itemsQuery: "SELECT DISTINCT uk.ROW_ID, IIF(uk.[Тема]='',org.Название,CONCAT(org.Название,' [',uk.[Тема],']')) Название FROM [stack].[УК Договоры] uk JOIN [stack].[Организации] org ON org.ROW_ID=uk.[Организация-УКДоговор] WHERE uk.Папки=802 ORDER BY 2", //Мурманск
    //itemsQuery: "SELECT DISTINCT uk.ROW_ID, IIF(uk.[Тема]='',org.Название,CONCAT(org.Название,' [',uk.[Тема],']')) Название FROM [stack].[УК Договоры] uk JOIN [stack].[Организации] org ON org.ROW_ID=uk.[Организация-УКДоговор] ORDER BY 2",
    dbName: DEFAULT_DB_FL
  },
//Для платежей  org.ROW_ID
  {
    type: "multi-select-list",
    var: ["УКП"],
    field: "УКП",
    label: "Выбран договор УК",
    placeholder: "Укажите договор УК",
    formOrder: 8,
    formColSpan: 2,
    formColIndex: 0,
    width: 800,
    showClearButton: true,
    showSelectionControls: true,
    selectAllMode: "allPages",
    searchEnabled: true,
    searchExpr: ["name"],
    searchMode: "contains",
    searchTimeout: 500,
    searchPlaceholder: "Поиск...",
    pageLoadMode: "scrollBottom",
    showScrollbar: "onHover",
    location: "before",
    locateInMenu: "always",
    itemsQuery: "SELECT DISTINCT org.ROW_ID, org.Название  FROM [stack].[УК Договоры] uk JOIN [stack].[Организации] org ON org.ROW_ID=uk.[Организация-УКДоговор] WHERE uk.Папки=802 ORDER BY 2", //Мурманск
    //itemsQuery: "SELECT DISTINCT org.ROW_ID, org.Название  FROM [stack].[УК Договоры] uk JOIN [stack].[Организации] org ON org.ROW_ID=uk.[Организация-УКДоговор] ORDER BY 2", //Мурманск
    dbName: DEFAULT_DB_FL
  },
  {
  type: "multi-select-list",
  var: ["ПОСТ"],
  field: "ПОСТ",
  label: "Выбраны поставщики",
    placeholder: "Укажите поставщиков",
    formOrder: 9,
    formColSpan: 2,
    formColIndex: 2,
    width: 800,
    showClearButton: true,
    showSelectionControls: true,
    selectAllMode: "allPages",
    searchEnabled: true,
    searchExpr: ["name"],
    searchMode: "contains",
    searchTimeout: 500,
    searchPlaceholder: "Поиск...",
    pageLoadMode: "scrollBottom",
    showScrollbar: "onHover",
    location: "before",
    locateInMenu: "always",
    itemsQuery: "SELECT DISTINCT ps.[Поставщики-Список], org.Название FROM [stack].[Поставщики] ps JOIN stack.Организации org ON org.ROW_ID=ps.[Поставщики-Список] ORDER BY 1",
    dbName: DEFAULT_DB_FL
  },
  {
    type: "button-group",
    var: ["status"],
    field: "status",        // название поля в JSON filters
    label: "Статус", // необязательно, можно вывести отдельным лейблом
    multiple: false,        // single-select
    items: [
      { id: "all",    text: "Все",      icon: "list"    },
      { id: "open",   text: "Открытые", icon: "unlock"  },
      { id: "closed", text: "Закрытые", icon: "lock"    }
    ]
  },

  {
    type: "button-group",
    var: ["categories"],
    field: "categories",    // пример множественного выбора
    label: "Категории",
    multiple: true,         // multi-select
    items: [
      { id: "A", text: "Категория A" },
      { id: "B", text: "Категория B" },
      { id: "C", text: "Категория C" }
    ]
  },


];


const sysrequest = [
{
id : '0',
name  : 'ФОНД',
query: `DECLARE @dt DATE=GETDATE();
SELECT trvw.ID 
            , trvw.PARENT , trvw.GRP , trvw.LVL 
			, CASE
				when  trvw.LVL  = 0  then adr.Район
				when  trvw.LVL  = 1  then adr.Участок
				when  trvw.LVL  = 12 then adr.НП
				when  trvw.LVL  = 2  then adr.НП+' '+adr.Улица
				when  trvw.LVL  = 3  then IIF(adr.Улица='','', adr.Улица+', ')+'д.'+adr.Дом
				when  trvw.LVL  = 4  then IIF(adr.Улица='','', adr.Улица+', ')+'д.'+adr.Дом+' кв.'+adr.Квартира
				when  trvw.LVL  = 5  then CAST(prm.ЛС AS nvarchar(15)) +' '+ IIF(adr.Улица='','', adr.Улица+', ')+'д.'+adr.Дом+' кв.'+adr.Квартира+' '+adr.Комната +' ( '+ISNULL(kr.ФИО,'') +' )  '+ prm.СОСТОЯНИЕ+'  c  '+ prm.[СОСТОЯНИЕ ДАТА]
			ELSE '' 
			END NODE
FROM (
SELECT hr.ID , hr.PARENT , hr.GRP , hr.ПотомокТип LVL 
FROM (
SELECT 0 PARENT , li.Потомок ID , IIF(li.ПотомокТип!=5, 1, 0) GRP, li.ПотомокТип FROM [stack].[Лицевые иерархия] li WHERE li.РодительТип=0 AND li.ПотомокТип =0 AND li.Потомок NOT IN (1329609,1408059)
UNION ALL
SELECT li.Родитель PARENT , li.Потомок ID , IIF(li.ПотомокТип!=5, 1, 0) GRP, li.ПотомокТип FROM [stack].[Лицевые иерархия] li WHERE li.РодительТип=0 AND li.ПотомокТип =1
UNION ALL
SELECT li.Родитель PARENT , li.Потомок ID , IIF(li.ПотомокТип!=5, 1, 0) GRP, li.ПотомокТип FROM [stack].[Лицевые иерархия] li WHERE li.РодительТип=1 AND li.ПотомокТип =12
UNION ALL
SELECT li.Родитель PARENT , li.Потомок ID , IIF(li.ПотомокТип!=5, 1, 0) GRP, li.ПотомокТип FROM [stack].[Лицевые иерархия] li WHERE  li.РодительТип=12 AND li.ПотомокТип =2
UNION ALL
SELECT li.Родитель PARENT , li.Потомок ID , IIF(li.ПотомокТип!=5, 1, 0) GRP, li.ПотомокТип FROM [stack].[Лицевые иерархия] li WHERE  li.РодительТип=2 AND li.ПотомокТип =3
UNION ALL
SELECT li.Родитель PARENT , li.Потомок ID , IIF(li.ПотомокТип!=5, 1, 0) GRP, li.ПотомокТип FROM [stack].[Лицевые иерархия] li WHERE  li.РодительТип=3 AND li.ПотомокТип =4
UNION ALL
SELECT li.Родитель PARENT , li.Потомок ID , IIF(li.ПотомокТип!=5, 1, 0) GRP, li.ПотомокТип FROM [stack].[Лицевые иерархия] li WHERE li.РодительТип=4 AND li.ПотомокТип =5
) hr
) trvw
CROSS APPLY stack.AddrLs_Table(trvw.ID, 0) adr
OUTER APPLY (SELECT ФИО FROM [stack].[Карточки регистрации] WHERE [Счет-Наниматель]=trvw.ID AND trvw.LVL=5) kr
OUTER APPLY (SELECT ls.Номер ЛС
, CASE  
		WHEN p76.Значение=0  THEN  'Используется'
		WHEN p76.Значение=1  THEN  'Не проживает'
		WHEN p76.Значение=2  THEN  'Закрыт'
		ELSE ''
  END СОСТОЯНИЕ
, CAST(p76.ДатНач AS varchar(12)) [СОСТОЯНИЕ ДАТА]
FROM [stack].[Лицевые счета] ls
CROSS APPLY (SELECT TOP 1 [Значение], ДатНач, Примечание FROM stack.[Свойства] sv 
JOIN stack.[Виды параметров] as vpar WITH (NOLOCK) on sv.[Виды-Параметры]=vpar.ROW_ID
WHERE sv.[Счет-Параметры]=ls.ROW_ID AND vpar.Название='СОСТОЯНИЕ' AND  GETDATE() BETWEEN sv.[ДатНач] AND sv.[ДатКнц]) p76
WHERE ROW_ID=trvw.ID AND Тип=5) prm
WHERE trvw.PARENT IN ({finalIds})
ORDER BY NODE
`
},
]




/*
const sysrequest = [
{
id : '0',
name  : 'ФОНД',
query: `DECLARE @dt DATE=GETDATE();
SELECT trvw.ID , trvw.PARENT , trvw.GRP , trvw.LVL , COALESCE(prm.АдресЛС,'Объект :'+CONVERT(VARCHAR(10), trvw.ID)) NODE
FROM (
SELECT hr.ID
, hr.PARENT
, hr.GRP
, hr.ПотомокТип LVL
FROM (
-- ТБО и СТАРЫЙ ФКР 1329609,1408059
SELECT 0 PARENT , li.Потомок ID , IIF(li.ПотомокТип!=5, 1, 0) GRP, li.ПотомокТип FROM [stack].[Лицевые иерархия] li WHERE li.Родитель = 193650 AND li.РодительТип=0 AND li.ПотомокТип =0
UNION ALL
SELECT li.Родитель PARENT , li.Потомок ID , IIF(li.ПотомокТип!=5, 1, 0) GRP, li.ПотомокТип FROM [stack].[Лицевые иерархия] li WHERE li.РодительТип=0 AND li.ПотомокТип =1
UNION ALL
SELECT li.Родитель PARENT , li.Потомок ID , IIF(li.ПотомокТип!=5, 1, 0) GRP, li.ПотомокТип FROM [stack].[Лицевые иерархия] li WHERE li.РодительТип=1 AND li.ПотомокТип =12
UNION ALL
SELECT li.Родитель PARENT , li.Потомок ID , IIF(li.ПотомокТип!=5, 1, 0) GRP, li.ПотомокТип FROM [stack].[Лицевые иерархия] li WHERE  li.РодительТип=12 AND li.ПотомокТип =2
UNION ALL
SELECT li.Родитель PARENT , li.Потомок ID , IIF(li.ПотомокТип!=5, 1, 0) GRP, li.ПотомокТип FROM [stack].[Лицевые иерархия] li WHERE  li.РодительТип=2 AND li.ПотомокТип =3
UNION ALL
SELECT li.Родитель PARENT , li.Потомок ID , IIF(li.ПотомокТип!=5, 1, 0) GRP, li.ПотомокТип FROM [stack].[Лицевые иерархия] li WHERE  li.РодительТип=3 AND li.ПотомокТип =4
UNION ALL
SELECT li.Родитель PARENT , li.Потомок ID , IIF(li.ПотомокТип!=5, 1, 0) GRP, li.ПотомокТип FROM [stack].[Лицевые иерархия] li WHERE li.РодительТип=4 AND li.ПотомокТип =5
) hr
) trvw
OUTER APPLY (SELECT ФИО FROM [stack].[Карточки регистрации] WHERE [Счет-Наниматель]=trvw.ID AND trvw.LVL=5) kr
OUTER APPLY (SELECT ls.Номер ЛС 
, ls.АдресЛС
, CASE  
		WHEN p76.Значение=0  THEN  'Используется'
		WHEN p76.Значение=1  THEN  'Не проживает'
		WHEN p76.Значение=2  THEN  'Закрыт'
		ELSE ''
  END СОСТОЯНИЕ
, CAST(p76.ДатНач AS varchar(12)) [СОСТОЯНИЕ ДАТА]
FROM [stack].[Лицевые счета] ls
CROSS APPLY (SELECT TOP 1 [Значение], ДатНач, Примечание FROM stack.[Свойства] sv 
JOIN stack.[Виды параметров] as vpar WITH (NOLOCK) on sv.[Виды-Параметры]=vpar.ROW_ID
WHERE sv.[Счет-Параметры]=ls.ROW_ID AND vpar.Название='СОСТОЯНИЕ' AND  GETDATE() BETWEEN sv.[ДатНач] AND sv.[ДатКнц]) p76
WHERE ROW_ID=trvw.ID AND Тип=5) prm 
WHERE trvw.PARENT IN ({finalIds})
ORDER BY NODE`
},
]
*/