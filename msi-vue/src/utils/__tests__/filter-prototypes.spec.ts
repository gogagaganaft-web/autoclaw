/**
 * Проверка прототипов против боевого каталога фильтров.
 *
 * Читает `msi-js/data/env.js` (путь можно переопределить переменной MSI_CATALOG)
 * и сверяет: каждый тип каталога описан прототипом, каждое свойство каталога
 * либо читается FormItemBuilder, либо внесено в IGNORED_CATALOG_PROPS.
 */

import { existsSync, readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

import {
  COMMON_FILTER_PROPS,
  FILTER_PROTOTYPES,
  IGNORED_CATALOG_PROPS,
  filterPrototype,
  filterPrototypeProps,
} from '../filter-prototypes';
import {
  defaultFilterDef,
  dynamicFilterValue,
  emptyFilterValue,
  isFilterValueEmpty,
  monthItems,
  placeholderTokens,
  toMonthKey,
} from '../filter-values';

const CATALOG_PATH = process.env.MSI_CATALOG ?? 'C:\\AUTOCLAW\\msi-js\\data\\env.js';

interface CatalogItem {
  type: string;
  props: string[];
}

const NAME_RE = /^( +)([A-Za-zА-Яа-яЁё_][A-Za-zА-Яа-яЁё0-9_]*)\s*:/;

/** Разбирает верхнеуровневые объекты массива `const toolbar = [...]`. */
function extractToolbarItems(source: string): CatalogItem[] {
  const start = source.indexOf('const toolbar = [');
  const end = start >= 0 ? source.indexOf('];', start) : -1;
  if (start < 0 || end < 0) return [];

  const body = source.slice(start, end);
  const items: CatalogItem[] = [];
  let depth = 0;
  let objectStart = -1;

  for (let i = 0; i < body.length; i += 1) {
    const char = body[i];
    if (char === '{') {
      depth += 1;
      if (depth === 1) objectStart = i;
    } else if (char === '}') {
      if (depth === 1 && objectStart >= 0) {
        items.push(parseItem(body.slice(objectStart, i + 1)));
        objectStart = -1;
      }
      depth -= 1;
    }
  }
  return items;
}

function parseItem(text: string): CatalogItem {
  // Табы в каталоге встречаются вперемешку с пробелами: приводим к 4 пробелам,
  // затем берём свойства на минимальном отступе — это свойства самого фильтра,
  // вложенные объекты (calendarOptions, maxRange) сидят глубже.
  const lines = text.split('\n').map((line) => line.replace(/\t/g, '    '));
  const candidates: Array<{ indent: number; name: string }> = [];

  for (const line of lines) {
    const match = NAME_RE.exec(line);
    if (!match) continue;
    candidates.push({ indent: match[1].length, name: match[2] });
  }

  const minIndent = candidates.length ? Math.min(...candidates.map((c) => c.indent)) : 0;
  const props = candidates
    .filter((candidate) => candidate.indent === minIndent)
    .map((candidate) => candidate.name);

  const typeMatch = /type\s*:\s*['"]([^'"]+)['"]/.exec(text);
  return { type: typeMatch ? typeMatch[1] : '', props };
}


const catalog: CatalogItem[] = existsSync(CATALOG_PATH)
  ? extractToolbarItems(readFileSync(CATALOG_PATH, 'utf8'))
  : [];

describe('прототипы фильтров', () => {
  it('библиотека покрывает все типы боевого каталога', () => {
    expect(FILTER_PROTOTYPES.length).toBeGreaterThanOrEqual(10);
    if (catalog.length === 0) {
      // Каталог недоступен (нет доступа к msi-js) — проверяем только состав.
      console.warn(`каталог не найден: ${CATALOG_PATH}`);
      return;
    }
    // Каталог живой: фильтры добавляют и удаляют. Проверяем, что разбор дал
    // непустой список и тип у каждой записи, иначе проверка ниже бессмысленна.
    expect(catalog.length).toBeGreaterThanOrEqual(10);
    expect(catalog.filter((item) => !item.type)).toEqual([]);

    const missing = [...new Set(catalog.map((item) => item.type))]
      .filter((type) => !filterPrototype(type));
    expect(missing).toEqual([]);
  });

  it('описывает все свойства каталога', () => {
    if (catalog.length === 0) return;

    const problems: string[] = [];
    for (const item of catalog) {
      const proto = filterPrototype(item.type);
      if (!proto) continue;
      const known = new Set([
        ...COMMON_FILTER_PROPS.map((p) => p.name),
        ...filterPrototypeProps(proto.code).map((p) => p.name),
        ...(proto.ignoredProps ?? []),
        ...IGNORED_CATALOG_PROPS,
      ]);
      for (const prop of item.props) {
        if (prop === 'type') continue;
        if (!known.has(prop)) problems.push(`${item.type}: ${prop}`);
      }
    }
    expect(problems).toEqual([]);
  });

  it('у каждого типа есть виджет, форма значения и плейсхолдеры', () => {
    for (const proto of FILTER_PROTOTYPES) {
      expect(proto.widget.length).toBeGreaterThan(0);
      expect(proto.placeholders.length).toBeGreaterThan(0);
      expect(proto.example.type).toBe(proto.code);
      const fieldProp = filterPrototypeProps(proto.code).find((p) => p.name === 'field');
      expect(fieldProp?.required).toBe(true);
    }
  });

  it('диапазоны объявляют границы', () => {
    for (const proto of FILTER_PROTOTYPES) {
      if (proto.valueKind !== 'range' && proto.valueKind !== 'months' && proto.valueKind !== 'numberRange') continue;
      expect(proto.placeholders).toContain('{field}_start');
      expect(proto.placeholders).toContain('{field}_end');
    }
  });

  it('названия в едином виде: с заглавной, без лишних пробелов, устаревшие помечены', () => {
    for (const proto of FILTER_PROTOTYPES) {
      expect(proto.title).toMatch(/^[А-ЯЁ]/);
      expect(proto.title).toBe(proto.title.trim());
      expect(proto.title).not.toMatch(/\s{2,}/);
      expect(proto.title.includes('устаревший')).toBe(proto.legacy === true);
    }
  });

  it('подписи и плейсхолдеры примеров без хвостовых пробелов', () => {
    for (const proto of FILTER_PROTOTYPES) {
      if (typeof proto.example.label === 'string') expect(proto.example.label).toBe(proto.example.label.trim());
      if (typeof proto.example.placeholder === 'string') expect(proto.example.placeholder).toBe(proto.example.placeholder.trim());
    }
  });
});

describe('значения фильтров', () => {
  const now = new Date(2026, 9, 23); // 23 октября 2026

  it('пустое значение соответствует форме типа', () => {
    expect(emptyFilterValue(filterPrototype('multi-select-list')!)).toEqual([]);
    expect(emptyFilterValue(filterPrototype('dateRange')!)).toEqual({ start: '', end: '' });
    expect(emptyFilterValue(filterPrototype('select')!)).toBeNull();
    expect(emptyFilterValue(filterPrototype('range-number')!)).toEqual({ start: null, end: null });
  });

  it('пустота распознаётся и для start/end, и для Начало/Окончание', () => {
    expect(isFilterValueEmpty([])).toBe(true);
    expect(isFilterValueEmpty({ start: '', end: '' })).toBe(true);
    expect(isFilterValueEmpty({ start: '2026-10-01', end: '2026-10-23' })).toBe(false);
    expect(isFilterValueEmpty({ Начало: '2026-09-01', Окончание: '2026-09-30' })).toBe(false);
  });

  it('динамическое значение: прошлый месяц и начало текущего', () => {
    expect(dynamicFilterValue(filterPrototype('dateRangeMonths')!, now))
      .toEqual({ start: '2026-09-01', end: '2026-09-01' });
    expect(dynamicFilterValue(filterPrototype('range-months')!, now))
      .toEqual({ start: '2026-09-01', end: '2026-09-01' });
    expect(dynamicFilterValue(filterPrototype('dateRange')!, now))
      .toEqual({ start: '2026-10-01', end: '2026-10-23' });
    expect(dynamicFilterValue(filterPrototype('select')!, now)).toBeUndefined();
  });

  it('список месяцев начинается с текущего и отдаёт первое число в ISO', () => {
    const items = monthItems(now);
    expect(items[0]).toEqual({ id: '2026-10-01', name: '2026 Октябрь' });
    expect(items.length).toBe(22); // 10 месяцев 2026 + 12 месяцев 2025
    expect(items.every((item) => /^\d{4}-\d{2}-01$/.test(item.id))).toBe(true);
    expect(toMonthKey(now)).toBe('2026-10-01');
  });

  it('плейсхолдеры по типу: диапазон — только границы', () => {
    const months = filterPrototype('dateRangeMonths')!;
    expect(placeholderTokens(months, 'ПериодМесяцы')).toEqual([
      '{m_start}', '{m_end}',
    ]);
  });

  it('стартовая конфигурация берётся из примера прототипа', () => {
    const proto = filterPrototype('multi-select-list')!;
    const def = defaultFilterDef(proto, 'РасчетыеМесяцы');
    expect(def.type).toBe('multi-select-list');
    expect(def.field).toBe('РасчетыеМесяцы');
    expect(def.formColSpan).toBe(2);
    expect(def.showSelectionControls).toBe(true);
  });
});
