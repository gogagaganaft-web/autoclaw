/**
 * Проверка подстановки значений в SQL.
 *
 * Ожидания взяты из боевого QueryInterpolator.js: диапазон → 'a' AND 'b',
 * массив → через запятую, пустой массив → условие вырезается, 8 цифр →
 * дата в кавычках. Плюс наше отличие: незаменённые плейсхолдеры возвращаются
 * списком, а не подставляются значениями по умолчанию.
 */

import { describe, expect, it } from 'vitest';

import {
  asRange,
  interpolateQuery,
  queryPlaceholders,
  removeClauseWithParam,
} from '../query-interpolate';

describe('подстановка значений в SQL', () => {
  it('диапазон дат: {field}, границы и числовые ключи', () => {
    const result = interpolateQuery(
      'SELECT * FROM t WHERE d BETWEEN {Период} AND x >= {Период_start} AND y <= {Период_end_num}',
      { Период: { start: '2026-01-01', end: '2026-01-31' } },
    );

    expect(result.sql).toContain("d BETWEEN '2026-01-01' AND '2026-01-31'");
    expect(result.sql).toContain("x >= '2026-01-01'");
    expect(result.sql).toContain('y <= 20260131');
    expect(result.unresolved).toEqual([]);
    expect(result.applied.map((item) => item.token)).toContain('{Период}');
  });

  it('особые алиасы {start}/{end} берутся из периода', () => {
    const result = interpolateQuery(
      'WHERE dt BETWEEN {start} AND {end}',
      { Период: { start: '2026-02-01', end: '2026-02-28' } },
    );
    expect(result.sql).toBe("WHERE dt BETWEEN '2026-02-01' AND '2026-02-28'");
  });

  it('{perStart}/{perEnd} берутся из ПериодДни', () => {
    const result = interpolateQuery(
      'WHERE dt >= {perStart} AND dt <= {perEnd}',
      { ПериодДни: { start: '2026-03-01', end: '2026-03-15' } },
    );
    expect(result.sql).toBe("WHERE dt >= '2026-03-01' AND dt <= '2026-03-15'");
  });

  it('массив подставляется через запятую', () => {
    const result = interpolateQuery('WHERE db IN ({БД_ЮЛ})', {
      БД_ЮЛ: ['DB1UL', 'DB2UL'],
    });
    expect(result.sql).toBe('WHERE db IN (DB1UL,DB2UL)');
  });

  it('расчётные месяцы идут в кавычках', () => {
    const result = interpolateQuery('WHERE m IN ({РасчетыеМесяцы})', {
      РасчетыеМесяцы: [20260101, 20260201],
    });
    expect(result.sql).toBe("WHERE m IN ('20260101','20260201')");
  });

  it('пустой массив вырезает условие', () => {
    const result = interpolateQuery(
      'SELECT * FROM t WHERE 1=1 AND db IN ({БД_ЮЛ}) AND x > 0',
      { БД_ЮЛ: [] },
    );
    expect(result.sql).toBe('SELECT * FROM t WHERE 1=1 AND x > 0');
    expect(result.removedClauses).toBe(1);
  });

  it('пустой массив в начале WHERE превращается в 1=1', () => {
    const cut = removeClauseWithParam('SELECT * FROM t WHERE db IN ({БД_ЮЛ})', 'БД_ЮЛ');
    expect(cut.sql).toBe('SELECT * FROM t WHERE 1=1');
    expect(cut.removed).toBe(1);
  });

  it('восемь цифр превращаются в дату', () => {
    const result = interpolateQuery('WHERE m = {РасчетыйМесяц}', {
      РасчетыйМесяц: '20260301',
    });
    expect(result.sql).toBe("WHERE m = '2026-03-01'");
  });

  it('незаменённые плейсхолдеры попадают в unresolved', () => {
    const result = interpolateQuery(
      'SELECT * FROM t WHERE a = {Период_start} AND b = {Неизвестно}',
      { Период: { start: '2026-01-01', end: '2026-01-31' } },
    );
    expect(result.unresolved).toEqual(['{Неизвестно}']);
    expect(queryPlaceholders(result.sql)).toEqual(['{Неизвестно}']);
  });

  it('формат Начало/Окончание тоже распознаётся', () => {
    expect(asRange({ Начало: '2026-01-01', Окончание: '2026-01-31' }))
      .toEqual({ start: '2026-01-01', end: '2026-01-31' });
    expect(asRange({ start: '', end: '' })).toBeNull();
    expect(asRange(['2026-01-01'])).toBeNull();
  });

  it('служебные поля с подчёркиванием не участвуют в подстановке', () => {
    const result = interpolateQuery('SELECT 1', { _Период_displayText: 'январь' });
    expect(result.applied).toEqual([]);
  });

  describe('токены из var', () => {
    it('{fond} подставляет список id из поля ФОНД', () => {
      const result = interpolateQuery(
        'SELECT * FROM t WHERE Родитель IN ({fond})',
        { ФОНД: [163766, 163960] },
        [{ name: 'fond', field: 'ФОНД', index: 0 }],
      );
      expect(result.sql).toBe('SELECT * FROM t WHERE Родитель IN (163766,163960)');
      expect(result.unresolved).toEqual([]);
    });

    it('{m_start}/{m_end} берут границы диапазона по порядку var', () => {
      const result = interpolateQuery(
        'DECLARE @s DATE={m_start}; DECLARE @e DATE={m_end};',
        { ПериодМесяцы: { start: '2025-01-01', end: '2025-12-01' } },
        [
          { name: 'm_start', field: 'ПериодМесяцы', index: 0 },
          { name: 'm_end', field: 'ПериодМесяцы', index: 1 },
        ],
      );
      expect(result.sql).toContain("DECLARE @s DATE='2025-01-01'");
      expect(result.sql).toContain("DECLARE @e DATE='2025-12-01'");
      expect(result.unresolved).toEqual([]);
    });

    it('без значения токен из var остаётся и попадает в unresolved', () => {
      const result = interpolateQuery(
        'SELECT * FROM t WHERE a IN ({uk})',
        { УК: [] },
        [{ name: 'uk', field: 'УК', index: 0 }],
      );
      expect(result.unresolved).toEqual(['{uk}']);
    });

    it('имя поля по-прежнему работает без var-алиаса', () => {
      const result = interpolateQuery('SELECT * FROM t WHERE a IN ({УК})', { УК: [7, 8] });
      expect(result.sql).toBe('SELECT * FROM t WHERE a IN (7,8)');
    });
  });
});
