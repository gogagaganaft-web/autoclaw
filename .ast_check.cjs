// Диагностика AST queries-admin.vue
const { parse } = require('C:/AUTOCLAW/msi-vue/node_modules/.pnpm/@vue+compiler-sfc@3.5.44/node_modules/@vue/compiler-sfc/dist/compiler-sfc.cjs.js');
const { readFileSync } = require('fs');
const { descriptor } = parse(readFileSync('C:/AUTOCLAW/msi-vue/src/pages/queries-admin.vue', 'utf8'));
const walk = (n, d) => {
  if (!n || !n.tag) return;
  const clsP = (n.props || []).find(p => p.name === 'class');
  const cls = clsP ? String((clsP.value && clsP.value.content) || '') : '';
  if (d <= 3) {
    const cond = (n.props || []).find(p => ['if', 'else', 'else-if'].includes(p.name));
    console.log('  '.repeat(d) + n.tag + '[' + cls.slice(0, 40) + ']' + (cond ? ' IF=' + String(cond.exp && cond.exp.content).slice(0, 45) : '') + ' ch=' + (n.children ? n.children.filter(c => c.tag).length : 0));
  }
  (n.children || []).forEach(c => walk(c, d + 1));
};
walk(descriptor.template.ast, 0);
