// Конвертер боевых env.js / rpt.js в SQL для БД report.
//   node tools/convert_prod_catalog.js <env.js> <rpt.js> <out.sql>
const fs = require('fs');
const vm = require('vm');

function load(file) {
  const code = fs.readFileSync(file, 'utf8');
  const sandbox = { window: {}, console: { log() {}, warn() {}, error() {} } };
  sandbox.window.window = sandbox.window;
  vm.createContext(sandbox);
  vm.runInContext(code, sandbox, { filename: file, timeout: 30000 });
  return sandbox;
}

function get(sandbox, names) {
  for (const n of names) {
    try {
      const v = vm.runInContext(`typeof ${n} !== 'undefined' ? ${n} : undefined`, sandbox);
      if (v !== undefined) return v;
    } catch { /* нет такого имени */ }
  }
  return undefined;
}

const lit = (v) => (v === null || v === undefined ? 'NULL' : "N'" + String(v).replace(/'/g, "''") + "'");
const num = (v) => (v === null || v === undefined ? 'NULL' : String(Number(v)));

const env = get(load(process.argv[2]), ['toolbar', 'sharedToolbar']);
const reports = get(load(process.argv[3]), ['reports', 'rpt']);

if (!Array.isArray(env)) throw new Error('в env.js не найден массив toolbar');
if (!Array.isArray(reports)) throw new Error('в rpt.js не найден массив reports');

// ─── обход дерева отчётов ───────────────────────────────────────────────────
const rows = [];
const usedKeys = new Set();

function keyOf(node, isSection) {
  const base = (node.key && String(node.key).trim())
    || (isSection ? `SEC_${node.id}` : `RPT_${node.id}`);
  let key = base;
  let n = 2;
  while (usedKeys.has(key)) key = `${base}_${n++}`;
  usedKeys.add(key);
  return key;
}

function walk(nodes, parentKey, depth) {
  (nodes || []).forEach((node, index) => {
    if (!node || node.id === undefined) return;
    const children = Array.isArray(node.items) ? node.items : null;
    const isSection = !!children;
    const key = keyOf(node, isSection);

    const config = {};
    for (const k of ['fields', 'filters', 'views', 'processing', 'description',
      'mandatory', 'groupKey', 'defaultView', 'hidden']) {
      if (node[k] !== undefined) config[k] = node[k];
    }

    rows.push({
      depth,
      order: index,
      key,
      parentKey: parentKey || null,
      title: node.text || node.title || key,
      icon: node.icon || '',
      image: node.image || '',
      query: isSection ? '' : (node.query || node.query_text || ''),
      config: JSON.stringify(config),
      isSection,
    });

    if (children) walk(children, key, depth + 1);
  });
}

walk(reports, null, 0);

// родители строго раньше детей
rows.sort((a, b) => (a.depth - b.depth) || (a.order - b.order));

// ─── SQL ────────────────────────────────────────────────────────────────────
const toolbarJson = JSON.stringify({ source: 'env.js', toolbar: env });

const parts = [];
parts.push('-- ============================================================================');
parts.push('--  Импорт боевого каталога: панель фильтров (env.js) и отчёты (rpt.js).');
parts.push('--  Сгенерировано tools/convert_prod_catalog.js');
parts.push(`--  Фильтров: ${env.length}; узлов каталога: ${rows.length} ` +
  `(разделы: ${rows.filter((r) => r.isSection).length}, отчёты: ${rows.filter((r) => !r.isSection).length})`);
parts.push('--  Идемпотентно: по report_key существующие строки обновляются, новые добавляются.');
parts.push('-- ============================================================================');
parts.push('USE report;');
parts.push('SET NOCOUNT ON;');
parts.push('GO');
parts.push('');
parts.push('-- 0. Разделы могут быть вложенными (ФЛ -> КТР -> отчёты), поэтому старое');
parts.push('--    ограничение "раздел только верхнего уровня" снимаем, если оно есть.');
parts.push("IF OBJECT_ID('dbo.reports', 'U') IS NOT NULL AND EXISTS (SELECT 1 FROM sys.check_constraints WHERE name = 'ck_reports_section' AND parent_object_id = OBJECT_ID('dbo.reports'))");
parts.push('    ALTER TABLE dbo.reports DROP CONSTRAINT ck_reports_section;');
parts.push('GO');
parts.push('');
parts.push('-- 1. Панель фильтров');
parts.push('MERGE dbo.ui_config AS target');
parts.push("USING (SELECT N'toolbar' AS setting_key, CAST(" + lit(toolbarJson) + ' AS NVARCHAR(MAX)) AS config) AS src');
parts.push('   ON target.setting_key = src.setting_key');
parts.push('WHEN MATCHED THEN UPDATE SET config = src.config, updated_at = SYSUTCDATETIME()');
parts.push('WHEN NOT MATCHED THEN INSERT (setting_key, config) VALUES (src.setting_key, src.config);');
parts.push('GO');
parts.push('');

parts.push('-- 2. Отчёты и разделы: вставка/обновление по report_key, родитель — по ключу');
for (const r of rows) {
  const parentExpr = r.parentKey
    ? `(SELECT id FROM dbo.reports WHERE report_key = ${lit(r.parentKey)})`
    : 'NULL';
  parts.push('MERGE dbo.reports AS target');
  parts.push('USING (SELECT ' + [
    `${lit(r.key)} AS report_key`,
    `${parentExpr} AS parent_id`,
    `${lit(r.title)} AS title`,
    `${lit(r.icon)} AS icon`,
    `${lit(r.image)} AS image`,
    `${lit(r.query || '')} AS query_text`,
    `CAST(${lit(r.config)} AS NVARCHAR(MAX)) AS config`,
    `${r.isSection ? 1 : 0} AS is_section`,
    `${num(r.order)} AS sort_order`,
  ].join(', ') + ') AS src');
  parts.push('   ON target.report_key = src.report_key');
  parts.push('WHEN MATCHED THEN UPDATE SET title = src.title, icon = src.icon, image = src.image,');
  parts.push('    query_text = src.query_text, config = src.config, parent_id = src.parent_id,');
  parts.push('    is_section = src.is_section, sort_order = src.sort_order, is_deleted = 0,');
  parts.push('    updated_at = SYSUTCDATETIME()');
  parts.push('WHEN NOT MATCHED THEN INSERT (report_key, parent_id, title, icon, image, query_text,');
  parts.push('    config, is_section, sort_order)');
  parts.push('    VALUES (src.report_key, src.parent_id, src.title, src.icon, src.image,');
  parts.push('    src.query_text, src.config, src.is_section, src.sort_order);');
  parts.push('GO');
}

parts.push('');
parts.push('-- 3. Сводка');
parts.push('SELECT COUNT(*) AS всего_узлов,');
parts.push('       SUM(CASE WHEN is_section = 1 THEN 1 ELSE 0 END) AS разделов,');
parts.push('       SUM(CASE WHEN is_section = 0 THEN 1 ELSE 0 END) AS отчётов,');
parts.push('       SUM(CASE WHEN is_section = 0 AND LEN(query_text) = 0 THEN 1 ELSE 0 END) AS без_sql');
parts.push('FROM dbo.reports WHERE is_deleted = 0;');
parts.push('GO');

const out = parts.join('\n') + '\n';
fs.writeFileSync(process.argv[4], out, 'utf8');

console.log('SQL:', process.argv[4], `${(out.length / 1024).toFixed(0)} КБ`);
console.log('фильтров:', env.length, '| узлов:', rows.length,
  '| разделов:', rows.filter((r) => r.isSection).length,
  '| отчётов:', rows.filter((r) => !r.isSection).length);
console.log('без SQL среди листьев:', rows.filter((r) => !r.isSection && !r.query).length);
console.log('примеры ключей:', rows.slice(0, 6).map((r) => r.key).join(', '));
