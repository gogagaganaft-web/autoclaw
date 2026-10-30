import { currentUser } from '@/auth';

/**
 * Единая точка выбора БД по умолчанию — по филиалу текущего пользователя:
 * сначала DB<филиал>UL, затем DB<филиал>FL, иначе первая доступная база.
 *
 * Умолчание применяется только там, где БД не задана явно — у фильтра
 * (config.dbName), у запроса (db_key) или у отчёта (config.db). Явная БД
 * всегда важнее умолчания, поэтому SuperAdmin без ограничений открывает
 * отчёты любых филиалов: подстановка его умолчания их не перекрывает.
 */
export function userDefaultDbId(databases: Array<{ id: string }>): string {
  const branch = currentUser.value?.branch || '';
  if (branch) {
    const ul = databases.find((db) => db.id === `DB${branch}UL`);
    if (ul) return ul.id;
    const fl = databases.find((db) => db.id === `DB${branch}FL`);
    if (fl) return fl.id;
  }
  return databases[0]?.id ?? '';
}
