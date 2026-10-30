const { parse } = require('C:/AUTOCLAW/msi-vue/node_modules/.pnpm/@vue+compiler-sfc@3.5.44/node_modules/@vue/compiler-sfc/dist/compiler-sfc.cjs.js');
const { readFileSync } = require('fs');
const { descriptor } = parse(readFileSync('C:/AUTOCLAW/msi-vue/src/pages/queries-admin.vue', 'utf8'));
const out = [];
const walk = (n, d) => {
  if (!n) return;
  if (n.tag) {
    let cls = '';
    for (const p of n.props || []) if (p.name === 'class') cls = String(p.value && p.value.content || '').slice(0, 45);
    let cond = '';
    for (const p of n.props || []) if (['if', 'else', 'else-if'].includes(p.name)) cond = 'IF=' + String(p.exp && p.exp.content).slice(0, 40);
    out.push('  '.repeat(d) + n.tag + '[' + cls + ']' + (cond ? ' ' + cond : '') + ' ch=' + (n.children ? n.children.filter(c => c.tag).length : 0));
  }
  for (const c of n.children || []) walk(c, d + 1);
};
walk(descriptor.template.ast, 0);
require('fs').writeFileSync('C:/AUTOCLAW/.ast_out.txt', out.join('\n'), 'utf-8');
console.log('written', out.length);
