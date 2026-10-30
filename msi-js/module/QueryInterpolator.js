export function removeClauseWithParam(sql, key) {
  var esc = key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  // AND/OR ... IN ({key})  → remove the clause
  sql = sql.replace(new RegExp('\\s+(AND|OR)\\s+.+?\\s+IN\\s*\\(\\s*\\{' + esc + '\\}\\s*\\)', 'gi'), '');
  // WHERE ... IN ({key})  → keep WHERE, replace with 1=1
  sql = sql.replace(new RegExp('(WHERE)\\s+.+?\\s+IN\\s*\\(\\s*\\{' + esc + '\\}\\s*\\)', 'gi'), 'WHERE 1=1');
  // AND/OR ... = {key}
  sql = sql.replace(new RegExp('\\s+(AND|OR)\\s+.+?\\s*=\\s*\\{' + esc + '\\}', 'gi'), '');
  // WHERE ... = {key}
  sql = sql.replace(new RegExp('(WHERE)\\s+.+?\\s*=\\s*\\{' + esc + '\\}', 'gi'), 'WHERE 1=1');
  // Fallback: replace bare {key} with NULL
  sql = sql.replace(new RegExp('\\{' + esc + '\\}', 'g'), 'NULL');
  return sql;
}

export function interpolateQuery(query, params) {
  let interpolated = query;

  const effectiveParams = { ...params };

  console.group('🔍 interpolateQuery — подстановка значений в SQL');
  console.log('Параметры фильтров:', JSON.parse(JSON.stringify(effectiveParams)));

  for (const key in effectiveParams) {
    if (!effectiveParams.hasOwnProperty(key)) continue;

    if (key === 'ПериодМесяцы' || key === 'Период') {
      const period = effectiveParams[key];
      console.log('Обработка периода (' + key + '):', period);

      let startValue = '';
      let endValue = '';

      if (period && period.Начало && period.Окончание) {
        startValue = period.Начало;
        endValue = period.Окончание;
      } else if (period && period.start && period.end) {
        startValue = period.start;
        endValue = period.end;
      } else {
        console.warn('interpolateQuery: период ' + key + ' не заполнен — используются значения по умолчанию (последние 3 месяца)');
        var now = new Date();
        var defEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0);
        var defStart = new Date(now.getFullYear(), now.getMonth() - 2, 1);
        startValue = defStart.toISOString().slice(0, 10);
        endValue = defEnd.toISOString().slice(0, 10);
      }

      if (startValue && endValue && endValue < startValue) endValue = startValue;

      interpolated = interpolated.replace(/{start}/g, `'${startValue}'`);
      interpolated = interpolated.replace(/{end}/g, `'${endValue}'`);
      interpolated = interpolated.replace(new RegExp(`{${key}_start}`, 'g'), `'${startValue}'`);
      interpolated = interpolated.replace(new RegExp(`{${key}_end}`, 'g'), `'${endValue}'`);
      const startNum = startValue.replace(/-/g, '');
      const endNum = endValue.replace(/-/g, '');
      interpolated = interpolated.replace(new RegExp(`{${key}_start_num}`, 'g'), startNum);
      interpolated = interpolated.replace(new RegExp(`{${key}_end_num}`, 'g'), endNum);
      continue;
    }

    if (key === 'ПериодДни' && effectiveParams[key] &&
        typeof effectiveParams[key] === 'object' &&
        effectiveParams[key].start &&
        effectiveParams[key].end) {
      const dr = effectiveParams[key];
      interpolated = interpolated.replace(/{perStart}/g, `'${dr.start}'`);
      interpolated = interpolated.replace(/{perEnd}/g, `'${dr.end}'`);
      interpolated = interpolated.replace(new RegExp(`{${key}_start}`, 'g'), `'${dr.start}'`);
      interpolated = interpolated.replace(new RegExp(`{${key}_end}`, 'g'), `'${dr.end}'`);
      continue;
    }

    if (effectiveParams[key] &&
        typeof effectiveParams[key] === 'object' &&
        effectiveParams[key].start &&
        effectiveParams[key].end) {

      const dateRange = effectiveParams[key];
      let startValue = dateRange.start;
      let endValue = dateRange.end;
      if (startValue && endValue && endValue < startValue) endValue = startValue;

      interpolated = interpolated.replace(/{start}/g, `'${startValue}'`);
      interpolated = interpolated.replace(/{end}/g, `'${endValue}'`);
      interpolated = interpolated.replace(new RegExp(`{${key}_start}`, 'g'), `'${startValue}'`);
      interpolated = interpolated.replace(new RegExp(`{${key}_end}`, 'g'), `'${endValue}'`);

      const startNum = startValue.replace(/-/g, '');
      const endNum = endValue.replace(/-/g, '');
      interpolated = interpolated.replace(new RegExp(`{${key}_start_num}`, 'g'), startNum);
      interpolated = interpolated.replace(new RegExp(`{${key}_end_num}`, 'g'), endNum);

      interpolated = interpolated.replace(new RegExp(`{${key}}`, 'g'), `'${startValue}' AND '${endValue}'`);

      continue;
    }

    if (Array.isArray(effectiveParams[key]) && effectiveParams[key].length === 0) {
      interpolated = removeClauseWithParam(interpolated, key);
      continue;
    }

    let value;
    if (key === 'calc' || key === 'РасчетыйМесяц' || key === 'РасчетыеМесяцы') {
      value = Array.isArray(effectiveParams[key])
        ? effectiveParams[key].map(item => `'${item}'`).join(',')
        : `'${effectiveParams[key]}'`;
    } else {
      value = Array.isArray(effectiveParams[key])
        ? effectiveParams[key].join(',')
        : effectiveParams[key];
    }
    interpolated = interpolated.replace(new RegExp(`{${key}}`, 'g'), value);
  }

  interpolated = interpolated.replace(/\{[A-Za-zА-Яа-я0-9_]+}/g, function(match) {
    console.warn('interpolateQuery: незаменённый плейсхолдер ' + match + ' — заменён на значение по умолчанию. Проверьте параметры фильтров.');
    if (/_start\b/.test(match)) return "'2026-01-01'";
    if (/_end\b/.test(match)) return "'2026-03-01'";
    if (/_start_num\b/.test(match)) return '20260101';
    if (/_end_num\b/.test(match)) return '20260301';
    return "''";
  });

  console.log('📝 SQL после подстановки:', interpolated);
  console.groupEnd();

  return interpolated;
}
