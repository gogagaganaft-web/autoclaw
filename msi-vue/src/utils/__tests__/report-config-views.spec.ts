/**
 * Связка «виды отчёта → колонки/поля виджетов».
 *
 * Проверяем, что настройки из редактора видов (порядок, подписи, ширина,
 * видимость, формат, область свода) действительно доходят до dxDataGrid и
 * dxPivotGrid, и что колонки, которых нет в результате запроса, отбрасываются.
 */

import { describe, expect, it } from 'vitest';

import { gridColumnsFor, pivotFieldsFor } from '../report-config';
import { toColumnFormat, toPivotArea, viewColumnsFromFields } from '../report-views';

const config = {
  views: [{
    key: 'grid',
    type: 'grid',
    title: 'ТАБЛИЦА',
    fields: [
      { name: 'Сумма', caption: 'Сумма, руб.', visible: true, width: 140, format: '0.00' },
      { name: 'ID', caption: 'Код', visible: false },
      { name: 'НетВДанных', caption: 'Лишнее', visible: true },
    ],
  }],
};

const mode = { key: 'grid', type: 'grid', title: 'ТАБЛИЦА' } as const;

describe('колонки грида из видов', () => {
  it('берут порядок, подписи, ширину, видимость и формат', () => {
    const columns = gridColumnsFor(config as never, mode, ['ID', 'Сумма']);
    expect(columns).toHaveLength(2);
    expect(columns[0]).toMatchObject({
      dataField: 'Сумма', caption: 'Сумма, руб.', width: 140, visible: true,
    });
    expect(columns[0].format).toEqual({ type: 'fixedPoint', precision: 2, useThousandsSeparator: false });
    expect(columns[1]).toMatchObject({ dataField: 'ID', visible: false });
  });

  it('колонка вне результата запроса отбрасывается', () => {
    const columns = viewColumnsFromFields(
      [{ name: 'Есть', caption: 'Есть', visible: true }, { name: 'Нет', caption: 'Нет', visible: true }],
      ['Есть'],
    );
    expect(columns.map((column) => column.dataField)).toEqual(['Есть']);
  });

  it('без полей виды не ломают поведение: колонки строятся из данных', () => {
    const empty = { views: [{ key: 'grid', type: 'grid', fields: [] }] };
    const columns = gridColumnsFor(empty as never, mode, ['A', 'B']);
    expect(columns).toEqual([
      { dataField: 'A', caption: 'A' },
      { dataField: 'B', caption: 'B' },
    ]);
  });
});

describe('поля свода из видов', () => {
  it('области маппятся в термины DevExtreme', () => {
    expect(toPivotArea('rows')).toBe('row');
    expect(toPivotArea('columns')).toBe('column');
    expect(toPivotArea('data')).toBe('data');
    expect(toPivotArea('filter')).toBe('filter');
    expect(toPivotArea('')).toBeUndefined();
  });

  it('поле свода получает область и формат', () => {
    const pivotConfig = {
      views: [{
        key: 'pivot',
        type: 'pivot',
        fields: [
          { name: 'Филиал', caption: 'Филиал', visible: true, area: 'rows' },
          { name: 'Сумма', caption: 'Сумма', visible: true, area: 'data', format: '0.00' },
        ],
      }],
    };
    const fields = pivotFieldsFor(pivotConfig as never, { key: 'pivot', type: 'pivot', title: 'СВОД' } as never);

    expect(fields).toHaveLength(2);
    expect(fields[0]).toMatchObject({ dataField: 'Филиал', area: 'row', caption: 'Филиал' });
    expect(fields[1]).toMatchObject({ dataField: 'Сумма', area: 'data' });
    expect(fields[1].format).toEqual({ type: 'fixedPoint', precision: 2, useThousandsSeparator: false });
  });
});

describe('форматы', () => {
  it('шаблоны чисел и именованные форматы', () => {
    expect(toColumnFormat('0')).toEqual({ type: 'fixedPoint', precision: 0, useThousandsSeparator: false });
    expect(toColumnFormat('#,##0.00')).toEqual({ type: 'fixedPoint', precision: 2, useThousandsSeparator: true });
    expect(toColumnFormat('percent')).toEqual({ type: 'percent', precision: 0 });
    expect(toColumnFormat('currency')).toEqual({ type: 'currency', precision: 2 });
    expect(toColumnFormat('date')).toEqual({ type: 'date', dateType: 'date' });
    expect(toColumnFormat('что-то')).toBeUndefined();
    expect(toColumnFormat('')).toBeUndefined();
  });
});
