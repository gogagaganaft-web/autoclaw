/**
 * Плейсхолдеры фильтра: `var` — жёсткий список, без него — правила по типу.
 */

import { describe, expect, it } from 'vitest';

import { FILTER_PROTOTYPES, filterPrototype } from '../filter-prototypes';
import {
  defaultFilterDef,
  defaultVarNames,
  placeholderTokens,
} from '../filter-values';

describe('группы типов', () => {
  it('даты, справочники, числа и прочее разложены явно', () => {
    const groups = FILTER_PROTOTYPES.reduce<Record<string, string[]>>((acc, proto) => {
      acc[proto.group] = acc[proto.group] ?? [];
      acc[proto.group].push(proto.code);
      return acc;
    }, {});

    expect(groups.range).toEqual(['dateRange', 'dateRangeMonths', 'range-months', 'range-days', 'range-number']);
    expect(groups.list).toEqual([
      'hierarchical-list', 'hr-fond', 'select',
      'multi-select', 'multi-select-fl', 'multi-select-list',
    ]);
    expect(groups.other).toEqual(['button-group']);
  });

  it('устаревшие типы не попадают в список новых, но остаются в библиотеке', () => {
    for (const code of ['button-group', 'select', 'multi-select', 'hierarchical-list']) {
      expect(filterPrototype(code)?.legacy).toBe(true);
    }
    const available = FILTER_PROTOTYPES.filter((proto) => !proto.legacy).map((proto) => proto.code);
    expect(available).toContain('range-months');
    expect(available).toContain('range-days');
    expect(available).toContain('range-number');
    expect(available).toContain('dateRangeMonths');
    expect(available).toContain('multi-select-list');
    expect(available).toContain('hr-fond');
  });
});

describe('var → плейсхолдеры', () => {
  const dateRange = filterPrototype('dateRange')!;
  const months = filterPrototype('dateRangeMonths')!;
  const multi = filterPrototype('multi-select-list')!;

  it('объявленный var главнее типа', () => {
    expect(placeholderTokens(dateRange, 'ПериодДни', ['ПериодДни_start', 'ПериодДни_end']))
      .toEqual(['{ПериодДни_start}', '{ПериодДни_end}']);
  });

  it('var — ровно то, что указано: полный {field} не добавляется', () => {
    const tokens = placeholderTokens(dateRange, 'ПериодДни', ['ПериодДни_start', 'ПериодДни_end']);
    expect(tokens).not.toContain('{ПериодДни}');
    expect(tokens).not.toContain('{ПериодДни_start_num}');
  });

  it('пустой var работает по стандартам таксономии', () => {
    expect(placeholderTokens(dateRange, 'ПериодДни')).toEqual(['{d_start}', '{d_end}']);
    expect(placeholderTokens(months, 'ПериодМесяцы')).toEqual(['{m_start}', '{m_end}']);
    expect(placeholderTokens(multi, 'РасчетыеМесяцы')).toEqual(['{raschetyemesyacy}']);
  });

  it('скобки в var можно писать как угодно — нормализуются', () => {
    expect(placeholderTokens(dateRange, 'X', ['{X_start}', ' X_end ']))
      .toEqual(['{X_start}', '{X_end}']);
  });

  it('дубликаты схлопываются', () => {
    expect(placeholderTokens(dateRange, 'X', ['X_start', 'X_start']))
      .toEqual(['{X_start}']);
  });

  it('по типу значения: d/m/n-границы, список — транслит ключа', () => {
    expect(defaultVarNames(dateRange, 'ПериодДни')).toEqual(['d_start', 'd_end']);
    expect(defaultVarNames(months, 'ПериодМесяцы')).toEqual(['m_start', 'm_end']);
    expect(defaultVarNames(filterPrototype('range-number')!, 'Сумма')).toEqual(['n_start', 'n_end']);
    expect(defaultVarNames(filterPrototype('multi-select-list')!, 'ФОНД')).toEqual(['fond']);
    expect(defaultVarNames(filterPrototype('multi-select-list')!, 'РасчетыеМесяцы')).toEqual(['raschetyemesyacy']);
  });

  it('новый фильтр получает стандартный var', () => {
    const def = defaultFilterDef(dateRange, 'ПериодДни');
    expect(def.var).toEqual(['d_start', 'd_end']);
    const list = defaultFilterDef(filterPrototype('multi-select-list')!, 'УК');
    expect(list.var).toEqual(['uk']);
  });
});
