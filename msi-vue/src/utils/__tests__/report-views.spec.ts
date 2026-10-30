/**
 * Проверка нормализации видов и слияния колонок запроса с настройками полей.
 */

import { describe, expect, it } from 'vitest';

import {
  createView,
  mergeViewFields,
  normalizeField,
  normalizeViews,
  visibleFields,
  type ViewField,
} from '../report-views';

describe('виды отчёта', () => {
  it('строки старого формата превращаются в объекты', () => {
    const views = normalizeViews(['pivot', 'grid']);
    expect(views.map((view) => view.type)).toEqual(['pivot', 'grid']);
    expect(views[0].title).toBe('СВОД');
    expect(views[0].fields).toEqual([]);
  });

  it('объекты с полями читаются как есть', () => {
    const views = normalizeViews([{
      key: 'grid',
      type: 'grid',
      title: 'ТАБЛИЦА',
      fields: [
        { name: 'ID', caption: 'Код', visible: true, width: 90 },
        { name: 'Сумма', caption: 'Сумма', visible: false },
      ],
    }]);

    expect(views).toHaveLength(1);
    expect(views[0].fields).toHaveLength(2);
    expect(views[0].fields[0]).toEqual({
      name: 'ID', caption: 'Код', visible: true, width: 90,
    });
    expect(views[0].fields[1].visible).toBe(false);
  });

  it('неизвестный тип не роняет разбор', () => {
    const views = normalizeViews([{ type: 'unknown', fields: [] }]);
    expect(views[0].type).toBe('grid');
    expect(views[0].key).toBe('unknown');
  });

  it('мусор в полях отбрасывается', () => {
    expect(normalizeField(null)).toBeNull();
    expect(normalizeField({ name: '' })).toBeNull();
    expect(normalizeField({ dataField: 'X' })?.name).toBe('X');
    expect(normalizeField({ name: 'X', width: 'abc' })?.width).toBeUndefined();
  });

  it('слияние колонок сохраняет настройки и добавляет новые', () => {
    const existing: ViewField[] = [
      { name: 'ID', caption: 'Код', visible: false, width: 120 },
      { name: 'Старое', caption: 'Старое', visible: true },
    ];
    const merged = mergeViewFields(
      [{ name: 'ID', caption: 'ID из запроса' }, { name: 'Сумма' }],
      existing,
    );

    expect(merged.map((field) => field.name)).toEqual(['ID', 'Сумма']);
    expect(merged[0]).toMatchObject({ caption: 'Код', visible: false, width: 120 });
    expect(merged[1]).toMatchObject({ caption: 'Сумма', visible: true });
    expect(merged.some((field) => field.name === 'Старое')).toBe(false);
  });

  it('видимые поля фильтруются по флагу', () => {
    const view = createView('grid', [{ name: 'A' }, { name: 'B' }]);
    view.fields[1].visible = false;
    expect(visibleFields(view).map((field) => field.name)).toEqual(['A']);
  });

  it('новый вид получает все колонки видимыми', () => {
    const view = createView('pivot', [{ name: 'A', caption: 'А' }]);
    expect(view.type).toBe('pivot');
    expect(view.title).toBe('СВОД');
    expect(view.fields[0]).toMatchObject({ name: 'A', caption: 'А', visible: true });
  });
});
