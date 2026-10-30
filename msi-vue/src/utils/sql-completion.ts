/**
 * Подсказки SQL для редактора отчётов — аналог SQL Server Management Studio:
 *
 *  - «алиас.» → список колонок таблицы (FROM stack.[X] AS x → x. подсказывает
 *    колонки X);
 *  - «схема.» → таблицы схемы;
 *  - после FROM/JOIN — таблицы базы;
 *  - всегда — ключевые слова T-SQL и алиасы в тексте.
 *
 * Схема берётся из INFORMATION_SCHEMA выбранного подключения через
 * POST /api/execute и кэшируется на время жизни страницы.
 */

import { reportsApi } from '@/services/reports-api';

export interface SqlTable {
  schema: string;
  name: string;
}

export interface AliasEntry {
  alias: string;
  schema: string;
  table: string;
}

const tablesCache = new Map<string, SqlTable[]>();
const columnsCache = new Map<string, string[]>();
const inflight = new Map<string, Promise<SqlTable[] | string[]>>();

/** Ключевые слова, которые нельзя принять за алиас после имени таблицы. */
const NOT_ALIAS = new Set([
  'on', 'where', 'group', 'order', 'inner', 'left', 'right', 'outer', 'full',
  'cross', 'join', 'union', 'all', 'set', 'values', 'having', 'and', 'or',
  'not', 'as', 'with', 'option', 'when', 'then', 'else', 'end', 'select',
  'from', 'top', 'distinct', 'with(', 'apply',
]);

/** Ключевые слова для общего списка подсказок. */
export const SQL_KEYWORDS = [
  'SELECT', 'FROM', 'WHERE', 'GROUP BY', 'ORDER BY', 'HAVING', 'JOIN',
  'LEFT JOIN', 'RIGHT JOIN', 'INNER JOIN', 'FULL JOIN', 'CROSS JOIN', 'OUTER APPLY',
  'CROSS APPLY', 'AS', 'ON', 'AND', 'OR', 'NOT', 'IN', 'BETWEEN', 'LIKE', 'IS NULL',
  'IS NOT NULL', 'CASE', 'WHEN', 'THEN', 'ELSE', 'END', 'UNION', 'UNION ALL',
  'EXISTS', 'DISTINCT', 'TOP', 'WITH (NOLOCK)', 'DECLARE', 'SET', 'IF',
  'BEGIN', 'INSERT INTO', 'VALUES', 'UPDATE', 'DELETE', 'IIF', 'ISNULL',
  'COALESCE', 'CAST', 'CONVERT', 'ROW_NUMBER', 'OVER', 'PARTITION BY',
];

function quote(name: string): string {
  return `'${name.replace(/'/g, "''")}'`;
}

/** Имя со спецсимволами — в квадратных скобках, как пишет SQL Studio. */
export function bracketName(name: string): string {
  return /^[\wА-Яа-яЁё]+$/.test(name) ? name : `[${name.replace(/]/g, ']]')}]`;
}

function track<T>(key: string, run: () => Promise<T>): Promise<T> {
  const existing = inflight.get(key) as Promise<T> | undefined;
  if (existing) return existing;
  const promise = run().finally(() => inflight.delete(key));
  inflight.set(key, promise as Promise<SqlTable[] | string[]>);
  return promise;
}

/** Таблицы подключения (INFORMATION_SCHEMA.TABLES), с кэшем. */
export async function fetchTables(dbName: string): Promise<SqlTable[]> {
  if (!dbName) return [];
  const cached = tablesCache.get(dbName);
  if (cached) return cached;
  return track(`t:${dbName}`, async () => {
    const res = await reportsApi.execute(dbName,
      'SELECT TABLE_SCHEMA, TABLE_NAME FROM INFORMATION_SCHEMA.TABLES '
      + "WHERE TABLE_TYPE = 'BASE TABLE' ORDER BY TABLE_SCHEMA, TABLE_NAME");
    if (res.error) return [];
    const tables = (res.rows || [])
      .map((row) => ({ schema: String(row[0] ?? ''), name: String(row[1] ?? '') }))
      .filter((t) => t.name);
    tablesCache.set(dbName, tables);
    return tables;
  });
}

/** Колонки таблицы (INFORMATION_SCHEMA.COLUMNS), с кэшем. */
export async function fetchColumns(dbName: string, schema: string, table: string): Promise<string[]> {
  if (!dbName || !table) return [];
  const key = `c:${dbName}:${schema}.${table}`;
  const cached = columnsCache.get(key);
  if (cached) return cached;
  return track(key, async () => {
    const schemaFilter = schema ? `AND TABLE_SCHEMA = ${quote(schema)}` : '';
    const res = await reportsApi.execute(dbName,
      'SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS '
      + `WHERE TABLE_NAME = ${quote(table)} ${schemaFilter} `
      + 'ORDER BY ORDINAL_POSITION');
    if (res.error) return [];
    const columns = (res.rows || []).map((row) => String(row[0] ?? '')).filter(Boolean);
    columnsCache.set(key, columns);
    return columns;
  });
}

/** Разбор многочастного имени: stack.[Лицевые счета] → {schema: 'stack', table: 'Лицевые счета'}. */
export function splitQualifiedName(raw: string): { schema: string; table: string } {
  const parts: string[] = [];
  const re = /\[[^\]]+\]|[^\s.]+/g;
  let match: RegExpExecArray | null;
  while ((match = re.exec(raw)) !== null) {
    const part = match[0].replace(/^\[|\]$/g, '').trim();
    if (part) parts.push(part);
  }
  if (!parts.length) return { schema: '', table: '' };
  if (parts.length === 1) return { schema: '', table: parts[0] };
  return { schema: parts[parts.length - 2], table: parts[parts.length - 1] };
}

/** Идентификатор SQL: буквы (включая кириллицу), цифры, _ и $. */
const IDENT = '[A-Za-z_А-Яа-яЁё][\\w$А-Яа-яЁё]*';

/**
 * Алиасы таблиц в тексте запроса: FROM/JOIN + имя + [AS] + алиас.
 * Ключевые слова алиасом не считаются (FROM x WHERE → без алиаса).
 */
export function parseAliases(text: string): AliasEntry[] {
  const name = `(?:\\[[^\\]]+\\]|${IDENT})(?:\\s*\\.\\s*(?:\\[[^\\]]+\\]|${IDENT}))*`;
  const re = new RegExp(`\\b(from|join)\\s+(${name})(?:\\s+(?:as\\s+)?(${IDENT}))?`, 'gi');
  const out: AliasEntry[] = [];
  let match: RegExpExecArray | null;
  while ((match = re.exec(text)) !== null) {
    const alias = (match[3] || '').toLowerCase();
    if (!alias || NOT_ALIAS.has(alias)) continue;
    const { schema, table } = splitQualifiedName(match[2]);
    if (!table) continue;
    out.push({ alias, schema, table });
  }
  return out;
}

/** Слово с точкой перед курсором: «x.col» → { prefix: 'x', typed: 'col' }. */
export function dotPrefixBefore(text: string): { prefix: string; typed: string } | null {
  const re = new RegExp(`(${IDENT})\\s*\\.\\s*([\\w$А-Яа-яЁё]*)$`, 'i');
  const match = re.exec(text);
  if (!match) return null;
  return { prefix: match[1], typed: match[2] };
}

export interface CompletionContextInfo {
  /** Курсор после «префикс.» — подсказываем колонки/таблицы схемы. */
  dot?: { prefix: string; typed: string };
  /** Частично набранное слово для общего списка. */
  word: string;
}

export function completionContext(textBeforeCursor: string): CompletionContextInfo {
  const dot = dotPrefixBefore(textBeforeCursor);
  const wordMatch = /[\w$А-Яа-яЁё]*$/.exec(textBeforeCursor);
  return { dot: dot ?? undefined, word: wordMatch ? wordMatch[0] : '' };
}
