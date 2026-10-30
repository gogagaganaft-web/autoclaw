#!/usr/bin/env node
/**
 * gen-classes.js — генерирует dist/CLASSES.md:
 *   1) публичный API (MSI.ui.*, MSI.viz.*, MSI.*) из модулей регистрации;
 *   2) список реконструированных ES6-классов из docs/CLASS_MAP.md.
 *
 * Запуск: node gen-classes.js
 */
const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const SRC = path.join(ROOT, 'src');
const DOCS = path.join(ROOT, 'docs');
const DIST = path.join(ROOT, 'dist');

// Какому неймспейсу MSI соответствует локальный объект в каждом модуле регистрации
const NAMESPACES = [
  { file: '2025.js', vars: { i: 'MSI', o: 'MSI.ui' } },
  { file: '50779.js', vars: { i: 'MSI', o: 'MSI.ui' } },
  { file: '66312.js', vars: { i: 'MSI', o: 'MSI.viz' } },
];

const api = {}; // ns -> Set(prop)

for (const { file, vars } of NAMESPACES) {
  const full = path.join(SRC, file);
  if (!fs.existsSync(full)) continue;
  const text = fs.readFileSync(full, 'utf8');
  const re = /([A-Za-z_$][\w$]*)\.([A-Za-z_$][\w$]*)\s*=\s*require\(/g;
  let m;
  while ((m = re.exec(text)) !== null) {
    const ns = vars[m[1]];
    if (!ns) continue;
    (api[ns] = api[ns] || new Set()).add(m[2]);
  }
}

// Классы из карты классов
const classes = [];
const mapPath = path.join(DOCS, 'CLASS_MAP.md');
if (fs.existsSync(mapPath)) {
  const map = fs.readFileSync(mapPath, 'utf8');
  const re = /^\|\s*`([A-Za-z0-9_$]+)`\s*\|\s*`(\d+\.js)`/gm;
  let m;
  while ((m = re.exec(map)) !== null) classes.push({ name: m[1], module: m[2] });
}

const sorted = (set) => Array.from(set || []).sort((a, b) => a.localeCompare(b));
const uiApi = sorted(api['MSI.ui']);
const vizApi = sorted(api['MSI.viz']);
const rootApi = sorted(api['MSI']);
const now = new Date().toISOString().slice(0, 10);

let md = '';
md += '# MSI Library — список классов и виджетов\n\n';
md += `_Сгенерировано автоматически из \`src/\` (gen-classes.js), ${now}._\n\n`;
md += 'Глобальное имя: `MSI`. Пример: `new MSI.ui.dxDataGrid(element, options)`.\n\n';

md += `## MSI.ui (${uiApi.length})\n\n`;
for (const w of uiApi) md += `- \`MSI.ui.${w}\`\n`;
md += '\n';

md += `## MSI.viz (${vizApi.length})\n\n`;
for (const v of vizApi) md += `- \`MSI.viz.${v}\`\n`;
md += '\n';

md += `## MSI — корневой объект (${rootApi.length})\n\n`;
for (const r of rootApi) md += `- \`MSI.${r}\`\n`;
md += '\n';

md += '## Прочие неймспейсы\n\n';
md += '- `MSI.data` — данные (DataSource, stores)\n';
md += '- `MSI.ui.dialog`, `MSI.ui.notify`, `MSI.ui.themes` — сервисы UI\n\n';

md += `## Реконструированные ES6-классы (${classes.length})\n\n`;
md += '_Вспомогательная реконструкция исходников; в рантайме работают модули из `src/`._\n\n';
md += '| Класс | Модуль |\n|-------|--------|\n';
for (const c of classes) md += `| \`${c.name}\` | \`${c.module}\` |\n`;
md += '\n';

fs.mkdirSync(DIST, { recursive: true });
fs.writeFileSync(path.join(DIST, 'CLASSES.md'), md, 'utf8');
console.log(
  `✅ dist/CLASSES.md: MSI.ui=${uiApi.length}, MSI.viz=${vizApi.length}, MSI=${rootApi.length}, классов=${classes.length}`
);
