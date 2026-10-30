#!/usr/bin/env node
/**
 * Шаг 4: Сборка единого бандла dist/msi.js (IIFE формат, глобальное имя MSI)
 * Запуск: node build.js [--minify]
 *
 * Вход:
 *   - entry.js (точка входа: регистрация виджетов + объект MSI)
 *   - src/*.js (модули библиотеки)
 * Выход:
 *   - dist/msi.js (готовый файл для <script src="msi.js">)
 */

const fs = require('fs');
const path = require('path');
const esbuild = require('esbuild');

const ROOT = __dirname;
const SRC_DIR = path.join(ROOT, 'src');
const DIST_DIR = path.join(ROOT, 'dist');
// Точка входа — entry.js: запускает регистрацию виджетов (src/2025.js)
// и отдаёт корневой объект MSI (MSI.ui.dxDataGrid и т.д.)
const ENTRY = path.join(ROOT, 'entry.js');
const OUTPUT_FILE = path.join(DIST_DIR, 'msi.js');

// === Проверка наличия файлов ===
console.log('=== Сборка msi.js (IIFE, глобальное имя MSI) ===');

if (!fs.existsSync(ENTRY)) {
  console.error(`❌ Файл точки входа не найден: ${ENTRY}`);
  console.error('Ожидается entry.js (точка входа бандла).');
  process.exit(1);
}
if (!fs.existsSync(SRC_DIR)) {
  console.error(`❌ Папка исходных модулей не найдена: ${SRC_DIR}`);
  console.error('Ожидается папка src/ с модулями библиотеки.');
  process.exit(1);
}

// Проверяем что esbuild установлен
try {
  require.resolve('esbuild');
} catch (e) {
  console.error('\n❌ esbuild не установлен. Выполните: npm install');
  process.exit(1);
}

// Создаём dist/ если нет
if (!fs.existsSync(DIST_DIR)) fs.mkdirSync(DIST_DIR, { recursive: true });

console.log(`Точка входа: ${ENTRY}`);
console.log(`Выходной файл: ${OUTPUT_FILE}`);
console.log();

// === Plugin для разрешения числовых импортов (./12345.js -> src/12345.js) ===
const numericImportPlugin = {
  name: 'numeric-import-resolver',
  setup(build) {
    build.onResolve({ filter: /^\.\/\d+\.js$/ }, (args) => {
      const fileName = path.basename(args.path);
      const inSrc = path.join(SRC_DIR, fileName);
      if (fs.existsSync(inSrc)) return { path: inSrc };
      return { errors: [{ text: `Module not found: ${args.path} (from ${args.importer})` }] };
    });
  },
};

// === Plugin-шим для артефактов webcrack ===
// 1) Некоторые модули используют webpack-хелпер require.d(exports, {...})
//    (это __webpack_require__.d — определение getter-экспортов). esbuild такого
//    не предоставляет, поэтому подменяем на локальный __wp_d.
// 2) Единственный ESM-модуль (87456.js) содержит import + require.d(exports,...),
//    поэтому сначала конвертируем его в CommonJS.
const webpackShimPlugin = {
  name: 'webpack-shim',
  setup(build) {
    build.onLoad({ filter: /[\\/]src[\\/]\d+\.js$/ }, (args) => {
      let contents = fs.readFileSync(args.path, 'utf8');
      const hasEsm = /^\s*(import|export)\s/m.test(contents);
      const hasRequireD = /require\.d\(/.test(contents);

      // Обычный CommonJS-модуль — отдаём esbuild как есть
      if (!hasEsm && !hasRequireD) return null;

      if (hasEsm) {
        contents = esbuild.transformSync(contents, { loader: 'js', format: 'cjs' }).code;
      }

      if (hasRequireD) {
        const helper = [
          'var __wp_d = function(exports, definition) {',
          '  for (var key in definition) {',
          '    if (Object.prototype.hasOwnProperty.call(definition, key) && !Object.prototype.hasOwnProperty.call(exports, key)) {',
          '      Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });',
          '    }',
          '  }',
          '};',
        ].join('\n');
        contents = helper + '\n' + contents.replace(/require\.d\(/g, '__wp_d(');
      }

      return { contents, loader: 'js' };
    });
  },
};

// === Запуск esbuild ===
const startTime = Date.now();
const minify = process.argv.includes('--minify');

const GLOBAL_NAME = 'MSI';

console.log(`Минификация: ${minify ? 'ВКЛ' : 'выкл'}`);
console.log(`Глобальное имя: ${GLOBAL_NAME}`);
console.log('Запускаю esbuild...\n');

esbuild.build({
  entryPoints: [ENTRY],
  bundle: true,
  outfile: OUTPUT_FILE,
  format: 'iife',
  globalName: GLOBAL_NAME,
  target: ['es2019'],
  platform: 'browser',
  minify: minify,
  sourcemap: false,
  legalComments: 'none',
  logLevel: 'warning',
  plugins: [numericImportPlugin, webpackShimPlugin],
  mainFields: ['module', 'main'],
  splitting: false,
  write: true,
  allowOverwrite: true,
  // Гарантируем доступность глобального объекта MSI в браузере
  footer: {
    js: 'if (typeof window !== "undefined") { window.MSI = MSI; }\nif (typeof globalThis !== "undefined") { globalThis.MSI = MSI; }',
  },
}).then((result) => {
  const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
  const size = (fs.statSync(OUTPUT_FILE).size / 1024).toFixed(0);
  console.log(`\n=== ✅ Готово за ${elapsed} сек ===`);
  console.log(`Файл: ${OUTPUT_FILE}`);
  console.log(`Размер: ${size} КБ`);
  console.log();
  console.log('=== Как подключить к проекту ===');
  console.log('  1. Скопируйте dist/msi.js в свой проект');
  console.log('  2. Подключайте в HTML:');
  console.log('     <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>');
  console.log('     <script src="msi.js"></script>');
  console.log(`  3. Используйте глобально: new ${GLOBAL_NAME}.ui.dxDataGrid(element, options)`);
  if (result.warnings.length > 0) {
    console.log(`\n⚠️ Предупреждений: ${result.warnings.length} (не блокируют сборку)`);
  }
}).catch((err) => {
  console.error('\n=== ❌ Ошибка сборки ===');
  console.error(err.message);
  if (err.errors) {
    console.error('\nПодробности:');
    err.errors.slice(0, 10).forEach((e, i) => {
      console.error(`  ${i + 1}. ${e.text}`);
      if (e.location) console.error(`     Файл: ${e.location.file}:${e.location.line}:${e.location.column}`);
    });
    if (err.errors.length > 10) console.error(`  ... и ещё ${err.errors.length - 10} ошибок`);
  }
  process.exit(1);
});
