#!/usr/bin/env node
/**
 * Smoke-тест собранного бандла.
 *
 * Загружает dist/msi.js в JSDOM и проверяет, что библиотека рабочая:
 *   - глобальный объект MSI существует;
 *   - есть неймспейсы MSI.ui и MSI.viz;
 *   - MSI.ui.dxDataGrid зарегистрирован как функция (класс виджета);
 *   - `new MSI.ui.dxDataGrid(element, options)` создаёт экземпляр.
 *
 * Запуск: node scripts/smoke_test.js   (нужен пакет jsdom — devDependency)
 */
const fs = require('fs');
const path = require('path');

let JSDOM;
try {
  ({ JSDOM } = require('jsdom'));
} catch (e) {
  console.error('Не установлен jsdom. Выполните: npm install');
  process.exit(1);
}

const bundlePath = path.join(__dirname, 'dist', 'msi.js');
if (!fs.existsSync(bundlePath)) {
  console.error(`Бандл не найден: ${bundlePath}. Сначала соберите: npm run build:only`);
  process.exit(1);
}

const code = fs.readFileSync(bundlePath, 'utf8');

const dom = new JSDOM(
  '<!DOCTYPE html><html><head></head><body><div id="grid"></div></body></html>',
  { runScripts: 'outside-only', pretendToBeVisual: true, url: 'http://localhost/' }
);
const { window } = dom;

try {
  window.eval(code);
} catch (e) {
  console.error('LOAD ERROR:', (e && e.stack) || e);
  process.exit(1);
}

const M = window.MSI;
const checks = [];
function check(name, ok, extra) {
  checks.push(ok);
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}${extra ? ' -> ' + extra : ''}`);
}

check('typeof MSI === "object"', typeof M === 'object' && M !== null, typeof M);
check('typeof MSI.ui === "object"', M && typeof M.ui === 'object');
check('typeof MSI.viz === "object"', M && typeof M.viz === 'object');
check(
  'typeof MSI.ui.dxDataGrid === "function"',
  M && M.ui && typeof M.ui.dxDataGrid === 'function'
);

let instance = null;
try {
  instance = new M.ui.dxDataGrid(window.document.getElementById('grid'), {
    dataSource: [
      { id: 1, name: 'Иван', age: 30 },
      { id: 2, name: 'Мария', age: 25 },
    ],
    columns: ['id', 'name', 'age'],
    showBorders: true,
  });
} catch (e) {
  console.error('WIDGET ERROR:', (e && e.message) || e);
}
check(
  'new MSI.ui.dxDataGrid(element, options) создаёт экземпляр',
  instance != null && instance.NAME === 'dxDataGrid',
  instance && instance.NAME
);

const passed = checks.every(Boolean);
console.log();
console.log(passed ? '=== SMOKE: OK ===' : '=== SMOKE: FAILED ===');
process.exit(passed ? 0 : 1);
