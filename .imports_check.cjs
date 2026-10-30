// Диагностика: почему qq/qa страница не рендерится. Проверим, что возвращает
// браузер для модуля страницы в момент работы живого приложения — вдруг
// import обрывается из-за цикла (queries-admin → auth → …).
const { parse, compileScript } = require('C:/AUTOCLAW/msi-vue/node_modules/.pnpm/@vue+compiler-sfc@3.5.44/node_modules/@vue/compiler-sfc/dist/compiler-sfc.cjs.js');
const { readFileSync } = require('fs');
const { descriptor } = parse(readFileSync('C:/AUTOCLAW/msi-vue/src/pages/queries-admin.vue', 'utf8'), { filename: 'queries-admin.vue' });
const script = compileScript(descriptor, { id: 'x' });
// Найдём импорты, создающие цикл: страница импортирует auth? router?
const imports = script.content.match(/^import[^\n]*$/gm) || [];
console.log(imports.join('\n'));
