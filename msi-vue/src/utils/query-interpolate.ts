/**
 * Подстановка значений фильтров в SQL — порт боевого QueryInterpolator.
 *
 * Отличие от боевого кода: незаменённые плейсхолдеры не подставляются «тихо»
 * значениями по умолчанию, а возвращаются списком — редактор блокирует запуск
 * и показывает, что осталось незаполненным.
 */

export interface InterpolateResult {
  sql: string;
  /** Плейсхолдеры, для которых не нашлось значения. */
  unresolved: string[];
  /** Что и на что заменили — для протокола запуска. */
  applied: Array<{ token: string; value: string }>;
  /** Сколько условий вырезано из-за пустого массива. */
  removedClauses: number;
}

export interface DateRangeValue {
  start: string;
  end: string;
}

/**
 * Имя плейсхолдера из `var` фильтра:
 * `{name}` заменяется значением поля `field` (для диапазона — границей по `index`).
 *
 * Без этого SQL с латинскими именами (`{fond}`, `{m_start}`) не находил
 * значение: поля в `values` хранятся по ключу фильтра (`ФОНД`, `ПериодМесяцы`).
 */
export interface TokenAlias {
  name: string;
  field: string;
  index: number;
}

const QUOTED_ARRAY_FIELDS = new Set(['calc', 'РасчетыйМесяц', 'РасчетыеМесяцы']);
const PLACEHOLDER_RE = /\{[A-Za-zА-Яа-яЁё0-9_]+\}/g;

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/** Диапазон дат в любом из форматов боевого кода. */
export function asRange(value: unknown): DateRangeValue | null {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return null;
  const rec = value as Record<string, unknown>;
  const start = rec.start ?? rec.Начало;
  const end = rec.end ?? rec.Окончание;
  if (typeof start !== 'string' || typeof end !== 'string') return null;
  if (!start || !end) return null;
  return { start, end };
}

/** Вырезает условие с пустым массивом — как removeClauseWithParam. */
export function removeClauseWithParam(sql: string, key: string): { sql: string; removed: number } {
  const esc = escapeRegExp(key);
  let result = sql;
  let removed = 0;

  const patterns: Array<[RegExp, string]> = [
    [new RegExp(`\\s+(AND|OR)\\s+.+?\\s+IN\\s*\\(\\s*\\{${esc}\\}\\s*\\)`, 'gi'), ''],
    [new RegExp(`(WHERE)\\s+.+?\\s+IN\\s*\\(\\s*\\{${esc}\\}\\s*\\)`, 'gi'), 'WHERE 1=1'],
    [new RegExp(`\\s+(AND|OR)\\s+.+?\\s*=\\s*\\{${esc}\\}`, 'gi'), ''],
    [new RegExp(`(WHERE)\\s+.+?\\s*=\\s*\\{${esc}\\}`, 'gi'), 'WHERE 1=1'],
  ];

  for (const [pattern, replacement] of patterns) {
    const next = result.replace(pattern, replacement);
    if (next !== result) {
      removed += 1;
      result = next;
    }
  }
  return { sql: result, removed };
}

function digits(value: string): string {
  return value.replace(/-/g, '');
}

export function interpolateQuery(
  query: string,
  values: Record<string, unknown>,
  aliases: readonly TokenAlias[] = [],
): InterpolateResult {
  let sql = query;
  const applied: Array<{ token: string; value: string }> = [];
  let removedClauses = 0;

  // SQL бывает двух видов: плейсхолдер с кавычками ('{m_start}') — значение
  // вставляем без своих кавычек, иначе они удвоятся («Incorrect syntax near
  // '2026'»); и без кавычек — вставляем как есть (даты интерполятор квотит сам).
  const replaceToken = (token: string, value: string) => {
    if (!sql.includes(token)) return;
    const quoted = `'${token}'`;
    if (sql.includes(quoted)) {
      const inner = value.startsWith("'") && value.endsWith("'") && value.length > 1
        ? value.slice(1, -1)
        : value;
      sql = sql.split(quoted).join(`'${inner}'`);
    }
    sql = sql.split(token).join(value);
    applied.push({ token, value });
  };

  // Плейсхолдеры из var: {fond}, {m_start}, {m_end}…
  for (const alias of aliases) {
    const raw = values[alias.field];
    if (raw === null || raw === undefined) continue;
    const token = `{${alias.name}}`;

    const range = asRange(raw);
    if (range) {
      const value = alias.index === 0 ? range.start : range.end;
      if (!value) continue;
      replaceToken(token, `'${value}'`);
      replaceToken(`{${alias.name}_num}`, digits(value));
      continue;
    }

    if (Array.isArray(raw)) {
      if (raw.length === 0) continue;
      const joined = raw
        .map((item) => (QUOTED_ARRAY_FIELDS.has(alias.field) ? `'${String(item)}'` : String(item)))
        .join(',');
      replaceToken(token, joined);
      continue;
    }

    if (typeof raw === 'object') continue;

    const text = String(raw);
    if (text === '') continue;
    replaceToken(token, /^\d{8}$/.test(text)
      ? `'${text.slice(0, 4)}-${text.slice(4, 6)}-${text.slice(6, 8)}'`
      : text);
  }

  // Особые алиасы: {start}/{end} для периода, {perStart}/{perEnd} для дней.
  const periodSource = values['Период'] ?? values['ПериодМесяцы'];
  const period = asRange(periodSource);
  if (period) {
    replaceToken('{start}', `'${period.start}'`);
    replaceToken('{end}', `'${period.end}'`);
  }
  const days = asRange(values['ПериодДни']);
  if (days) {
    replaceToken('{perStart}', `'${days.start}'`);
    replaceToken('{perEnd}', `'${days.end}'`);
  }

  for (const [field, raw] of Object.entries(values)) {
    if (field.startsWith('_')) continue;
    if (raw === null || raw === undefined) continue;

    const token = (suffix = '') => `{${field}${suffix}}`;

    if (Array.isArray(raw)) {
      if (raw.length === 0) {
        const cut = removeClauseWithParam(sql, field);
        sql = cut.sql;
        removedClauses += cut.removed;
        continue;
      }
      const joined = raw
        .map((item) => (QUOTED_ARRAY_FIELDS.has(field) ? `'${String(item)}'` : String(item)))
        .join(',');
      replaceToken(token(), joined);
      continue;
    }

    const range = asRange(raw);
    if (range) {
      replaceToken(token('_start_num'), digits(range.start));
      replaceToken(token('_end_num'), digits(range.end));
      replaceToken(token('_start'), `'${range.start}'`);
      replaceToken(token('_end'), `'${range.end}'`);
      replaceToken(token(), `'${range.start}' AND '${range.end}'`);
      continue;
    }

    if (typeof raw === 'object') continue;

    const text = String(raw);
    if (text === '') continue;

    // 8 цифр — дата из фильтра месяцев: в SQL она идёт как 'YYYY-MM-DD'.
    const value = /^\d{8}$/.test(text)
      ? `'${text.slice(0, 4)}-${text.slice(4, 6)}-${text.slice(6, 8)}'`
      : text;
    replaceToken(token(), value);
  }

  const unresolved = [...new Set(sql.match(PLACEHOLDER_RE) ?? [])].sort();
  return { sql, unresolved, applied, removedClauses };
}

/** Плейсхолдеры, встречающиеся в тексте запроса. */
export function queryPlaceholders(query: string): string[] {
  return [...new Set(query.match(PLACEHOLDER_RE) ?? [])].sort();
}
