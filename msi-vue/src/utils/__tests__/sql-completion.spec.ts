import { describe, expect, it } from 'vitest';
import {
  bracketName,
  completionContext,
  dotPrefixBefore,
  parseAliases,
  splitQualifiedName,
} from '@/utils/sql-completion';

describe('sql-completion: разбор запроса', () => {
  it('простой алиас: FROM stack.[X] AS x', () => {
    expect(parseAliases('SELECT 1 FROM stack.[Лицевые счета] AS x WHERE 1=1'))
      .toEqual([{ alias: 'x', schema: 'stack', table: 'Лицевые счета' }]);
  });

  it('алиас без AS и с JOIN', () => {
    const aliases = parseAliases(
      'FROM dbo.Reports r JOIN dbo.Users u ON u.Id = r.UserId',
    );
    expect(aliases).toEqual([
      { alias: 'r', schema: 'dbo', table: 'Reports' },
      { alias: 'u', schema: 'dbo', table: 'Users' },
    ]);
  });

  it('ключевое слово после таблицы — не алиас', () => {
    expect(parseAliases('FROM dbo.Reports WHERE x = 1')).toEqual([]);
    expect(parseAliases('FROM dbo.Reports ORDER BY 1')).toEqual([]);
  });

  it('имя без схемы', () => {
    expect(parseAliases('FROM Reports r')).toEqual([{ alias: 'r', schema: '', table: 'Reports' }]);
  });

  it('кириллица в алиасе и таблице', () => {
    expect(parseAliases('FROM [stack].[Лицевые счета] лс')).toEqual([
      { alias: 'лс', schema: 'stack', table: 'Лицевые счета' },
    ]);
  });

  it('splitQualifiedName разбирает многочастные имена', () => {
    expect(splitQualifiedName('stack.[Лицевые счета]')).toEqual({
      schema: 'stack',
      table: 'Лицевые счета',
    });
    expect(splitQualifiedName('report.dbo.reports')).toEqual({
      schema: 'dbo',
      table: 'reports',
    });
    expect(splitQualifiedName('Reports')).toEqual({ schema: '', table: 'Reports' });
  });

  it('dotPrefixBefore ловит «алиас.» и «алиас.начало_имени»', () => {
    expect(dotPrefixBefore('SELECT x.')).toEqual({ prefix: 'x', typed: '' });
    expect(dotPrefixBefore('SELECT x.Ro')).toEqual({ prefix: 'x', typed: 'Ro' });
    expect(dotPrefixBefore('SELECT x . Row_Id')).toEqual({ prefix: 'x', typed: 'Row_Id' });
    expect(dotPrefixBefore('SELECT value')).toBeNull();
  });

  it('completionContext: слово без точки', () => {
    expect(completionContext('SELECT * FROM Li')).toEqual({ word: 'Li' });
    expect(completionContext('SELECT col1')).toEqual({ word: 'col1' });
    expect(completionContext('SELECT (')).toEqual({ word: '' });
  });

  it('bracketName экранирует спецсимволы', () => {
    expect(bracketName('Простое')).toBe('Простое');
    expect(bracketName('Лицевые счета')).toBe('[Лицевые счета]');
    expect(bracketName('Сх]ема')).toBe('[Сх]]ема]');
  });
});
