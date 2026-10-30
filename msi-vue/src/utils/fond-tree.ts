// Дерево фондов для фильтра типа "hierarchical-list" («Фонд»).
//
// Перенос sysrequest[0] из MSI (frontend/data/env.js). Запрос лениво
// подгружает узлы иерархии лицевых счетов: для каждого раскрытого узла
// выполняется один запрос с подстановкой списка родительских ID вместо
// {finalIds}. Колонки: ID, PARENT, GRP (1 — есть дети), LVL, NODE.

/** Корень иерархии фондов (как в оригинале MSI). */
export const DEFAULT_FOND_ROOT = 163863;

export const FOND_TREE_SQL = `DECLARE @dt DATE=GETDATE();
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
ORDER BY NODE
`;

export interface FondNode {
  ID: number;
  PARENT: number;
  GRP: number;
  LVL: number;
  NODE: string;
}

export interface FondItem { id: number; name: string; parent?: number }

/** Подставляет список родительских ID вместо {finalIds} (как в MSI). */
export function fondTreeSql(template: string, parentIds: Array<number | string>): string {
  const ids = parentIds.length ? parentIds.join(',') : String(DEFAULT_FOND_ROOT);
  return template.replace('{finalIds}', ids);
}

/** Превращает ответ /api/execute ({columns, rows}) в массив объектов. */
export function toNodeObjects(columns: string[], rows: unknown[][]): FondNode[] {
  return rows.map((row) => {
    const obj: Record<string, unknown> = {};
    columns.forEach((col, i) => { obj[col] = row[i]; });
    return obj as unknown as FondNode;
  });
}
