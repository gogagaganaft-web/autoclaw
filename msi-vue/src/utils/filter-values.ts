/**
 * Значения фильтров: пустые, динамические по умолчанию и список плейсхолдеров.
 *
 * Повторяет поведение FormItemBuilder.buildFormItems(): для `dateRange` —
 * начало текущего месяца и сегодня, для `dateRangeMonths` — прошлый месяц,
 * для `select` / `multi-select-list` с `dynamicDefault` — месяцы текущего и прошлого года.
 */

import {
  filterPrototypeProps,
  type FilterPrototype,
} from './filter-prototypes';

const MONTH_NAMES = [
  'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
  'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь',
];

export interface MonthItem {
  /** Первое число месяца в ISO: `ГГГГ-ММ-01` — без преобразований уходит в SQL. */
  id: string;
  name: string;
}

export interface DateRangeValue {
  start: string;
  end: string;
}

function pad2(value: number): string {
  return String(value).padStart(2, '0');
}

/** `2026-03-01` — как DateUtils.toISODate в боевом коде. */
export function toIsoDate(date: Date): string {
  return `${date.getFullYear()}-${pad2(date.getMonth() + 1)}-${pad2(date.getDate())}`;
}

/** `2026-03-01` — первое число месяца: единый формат месяцев во всех фильтрах. */
export function toMonthKey(date: Date): string {
  return `${date.getFullYear()}-${pad2(date.getMonth() + 1)}-01`;
}

/** Пустое значение под форму значения: массив, диапазон или скаляр. */
export function emptyFilterValue(proto: FilterPrototype): unknown {
  switch (proto.valueKind) {
    case 'array':
      return [];
    case 'range':
    case 'months':
      return { start: '', end: '' };
    case 'numberRange':
      return { start: null, end: null };
    case 'scalar':
    default:
      return null;
  }
}

/** Пусто ли значение — с учётом форматов `start/end` и `Начало/Окончание`. */
export function isFilterValueEmpty(value: unknown): boolean {
  if (value === null || value === undefined || value === '') return true;
  if (Array.isArray(value)) return value.length === 0;
  if (typeof value === 'object') {
    const rec = value as Record<string, unknown>;
    return !rec.start && !rec.end && !rec.Начало && !rec.Окончание;
  }
  return false;
}

/** Месяцы текущего и прошлого года — как в FormItemBuilder. */
export function monthItems(now: Date = new Date(), yearsBack = 1): MonthItem[] {
  const items: MonthItem[] = [];
  const endYear = now.getFullYear();
  const endMonth = now.getMonth();
  const startYear = endYear - yearsBack;

  for (let year = endYear; year >= startYear; year -= 1) {
    const monthFrom = year === endYear ? endMonth : 11;
    for (let month = monthFrom; month >= 0; month -= 1) {
      items.push({
        id: toMonthKey(new Date(year, month, 1)),
        name: `${year} ${MONTH_NAMES[month]}`,
      });
    }
  }
  return items;
}

/**
 * Значение по умолчанию для `dynamicDefault`.
 *
 * `undefined` — тип не имеет динамического значения (скаляр, список):
 * у них при `dynamicDefault` заполняются элементы, а не значение.
 */
export function dynamicFilterValue(
  proto: FilterPrototype,
  now: Date = new Date(),
): unknown {
  if (proto.valueKind === 'months') {
    const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const key = toMonthKey(lastMonth);
    return { start: key, end: key };
  }

  if (proto.valueKind === 'range') {
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    return { start: toIsoDate(monthStart), end: toIsoDate(now) };
  }

  return undefined;
}

/** Элементы, которые FormItemBuilder досоздаёт при `dynamicDefault`. */
export function dynamicFilterItems(
  proto: FilterPrototype,
  items: unknown[] | undefined,
  now: Date = new Date(),
): MonthItem[] | undefined {
  const supported = proto.code === 'select' || proto.code === 'multi-select-list';
  if (!supported) return undefined;
  if (Array.isArray(items) && items.length > 0) return undefined;
  return monthItems(now);
}

/** Стартовая конфигурация фильтра: пример прототипа плюс ключ поля. */
export function defaultFilterDef(proto: FilterPrototype, field = ''): Record<string, unknown> {
  const def: Record<string, unknown> = {
    ...proto.example,
    type: proto.code,
    field: field || '',
  };
  // var привязан к ключу поля: для нового фильтра он не должен оставаться чужим.
  if (!Array.isArray(def.var) || !(def.var as unknown[]).length) {
    def.var = defaultVarNames(proto, field);
  }
  if (!field) {
    def.label = proto.title;
    def.placeholder = '';
  }
  return def;
}

/** Значения по умолчанию для свойств прототипа (для формы редактора). */
export function filterPropDefaults(proto: FilterPrototype): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const prop of filterPrototypeProps(proto.code)) {
    if (prop.default !== undefined) out[prop.name] = prop.default;
  }
  return out;
}

/**
 * Плейсхолдеры фильтра.
 *
 * `var` из конфигурации — жёсткий список имён (без скобок): в SQL предлагаются
 * ровно эти токены. Если `var` пуст, работают правила по типу значения.
 */
export function defaultVarNames(proto: FilterPrototype, field: string): string[] {
  if (!field) return [];
  // Стандартные плейсхолдеры таксономии: диапазоны — d/m/n_start+end
  // по виду значения, списки — транслит ключа поля строчными.
  if (proto.valueKind === 'months') return ['m_start', 'm_end'];
  if (proto.valueKind === 'range') return ['d_start', 'd_end'];
  if (proto.valueKind === 'numberRange') return ['n_start', 'n_end'];
  return [translitField(field)];
}

/**
 * Транслитерация ключа поля в латиницу строчными (контракт списков):
 * «ФОНД» → fond, «УК» → uk, «РасчетыеМесяцы» → raschetesymesyacy.
 * Символы вне букв/цифр становятся «_».
 */
export function translitField(field: string): string {
  const map: Record<string, string> = {
    а: 'a', б: 'b', в: 'v', г: 'g', д: 'd', е: 'e', ё: 'e', ж: 'zh', з: 'z',
    и: 'i', й: 'y', к: 'k', л: 'l', м: 'm', н: 'n', о: 'o', п: 'p', р: 'r',
    с: 's', т: 't', у: 'u', ф: 'f', х: 'h', ц: 'c', ч: 'ch', ш: 'sh',
    щ: 'sch', ъ: '', ы: 'y', ь: '', э: 'e', ю: 'yu', я: 'ya',
  };
  const lower = field.toLowerCase();
  let out = '';
  for (const ch of lower) {
    if (map[ch] !== undefined) out += map[ch];
    else if (/[a-z0-9]/.test(ch)) out += ch;
    else out += '_';
  }
  return out.replace(/_+/g, '_').replace(/^_|_$/g, '') || 'f';
}

export function placeholderTokens(
  proto: FilterPrototype,
  field: string,
  varNames?: readonly string[],
): string[] {
  const declared = (varNames ?? [])
    .map((name) => String(name).trim().replace(/^\{|\}$/g, ''))
    .filter(Boolean);

  if (declared.length) {
    return [...new Set(declared.map((name) => `{${name}}`))];
  }

  if (!field) return [];
  const fallback = defaultVarNames(proto, field);
  return [...new Set(fallback.map((name) => `{${name}}`))];
}
