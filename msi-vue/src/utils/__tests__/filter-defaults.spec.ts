/**
 * Шаги 3–4: границы дат и месяцы для списков.
 *
 * Проверяем поведение, которое видит пользователь: значение диапазона дат
 * обрезается по ручным minDate/maxDate, а список месяцев заполняется сам при
 * dynamicDefault — иначе выбирать нечего.
 */

import { describe, expect, it } from 'vitest';

import { buildFilterFields, initialFilterValues } from '../report-config';

const pad = (n: number) => String(n).padStart(2, '0');
const today = new Date();
const todayIso = `${today.getFullYear()}-${pad(today.getMonth() + 1)}-${pad(today.getDate())}`;
const monthStart = `${today.getFullYear()}-${pad(today.getMonth() + 1)}-01`;

function toolbar(field: Record<string, unknown>): Record<string, unknown>[] {
  return [field];
}

describe('диапазон дат (dateRange)', () => {
  const base = {
    type: 'dateRange',
    field: 'ПериодДни',
    label: 'Диапазон дат',
    dynamicDefault: true,
  };

  it('без ручных границ: с начала месяца по сегодня', () => {
    const fields = buildFilterFields({ filters: { ПериодДни: null } } as never, toolbar(base), []);
    const values = initialFilterValues(fields, { filters: { ПериодДни: null } } as never);
    expect(values.ПериодДни).toEqual({ start: monthStart, end: todayIso });
  });

  it('minDate обрезает начало', () => {
    const def = { ...base, minDate: '2026-10-10' };
    const config = { filters: { ПериодДни: null } };
    const fields = buildFilterFields(config as never, toolbar(def), []);
    const values = initialFilterValues(fields, config as never);
    expect(values.ПериодДни).toEqual({ start: '2026-10-10', end: todayIso });
  });

  it('maxDate обрезает конец', () => {
    const def = { ...base, maxDate: '2026-10-05' };
    const config = { filters: { ПериодДни: null } };
    const fields = buildFilterFields(config as never, toolbar(def), []);
    const values = initialFilterValues(fields, config as never);
    expect(values.ПериодДни).toEqual({ start: monthStart, end: '2026-10-05' });
  });

  it('границы за пределами значения схлопывают диапазон в границу', () => {
    const def = { ...base, minDate: '2027-01-01', maxDate: '2027-12-31' };
    const config = { filters: { ПериодДни: null } };
    const fields = buildFilterFields(config as never, toolbar(def), []);
    const values = initialFilterValues(fields, config as never);
    expect(values.ПериодДни).toEqual({ start: '2027-01-01', end: '2027-01-01' });
  });

  it('без dynamicDefault значение остаётся пустым', () => {
    const def = { ...base, dynamicDefault: false };
    const config = { filters: { ПериодДни: null } };
    const fields = buildFilterFields(config as never, toolbar(def), []);
    const values = initialFilterValues(fields, config as never);
    expect(values.ПериодДни).toEqual({ start: '', end: '' });
  });
});

describe('месяцы для списков (multi / select)', () => {
  it('multi-select-list с dynamicDefault получает месяцы', () => {
    const def = {
      type: 'multi-select-list',
      field: 'РасчетыеМесяцы',
      label: 'Выбраны расчетные месяцы',
      dynamicDefault: true,
      items: [],
    };
    const config = { filters: { РасчетыеМесяцы: null } };
    const fields = buildFilterFields(config as never, toolbar(def), []);
    const field = fields.find((item) => item.field === 'РасчетыеМесяцы');

    expect(field?.items.length).toBeGreaterThanOrEqual(12);
    expect(field?.items[0]).toMatchObject({ name: expect.stringContaining(String(today.getFullYear())) });
    // Формат месяцев — «ГГГГ-ММ-01» (раньше был числовой 20261001): значение
    // уходит в SQL как дата, и единый формат избавляет от неявных приведений.
    expect(String(field?.items[0].id)).toMatch(/^\d{4}-\d{2}-01$/);
  });

  it('готовые items не перетираются', () => {
    const def = {
      type: 'multi-select',
      field: 'Тип',
      items: [{ id: 'a', name: 'Первый' }],
      dynamicDefault: true,
    };
    const config = { filters: { Тип: null } };
    const fields = buildFilterFields(config as never, toolbar(def), []);
    expect(fields[0].items).toEqual([{ id: 'a', name: 'Первый' }]);
  });

  it('список с серверным itemsQuery месяцы не получает', () => {
    const def = {
      type: 'multi-select-list',
      field: 'usl',
      itemsQuery: 'SELECT 1',
      dbName: 'DB1UL',
      dynamicDefault: true,
    };
    const config = { filters: { usl: null } };
    const fields = buildFilterFields(config as never, toolbar(def), []);
    expect(fields[0].items).toEqual([]);
  });
});
