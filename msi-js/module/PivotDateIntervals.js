// PivotDateIntervals.js
// Иерархия дат для DevExpress PivotGrid (Год → Квартал → Месяц → Неделя → День).
//
// Проблемы DevExpress, которые решает модуль:
//  1) поля с одинаковым dataField в одной области схлопываются в один уровень;
//  2) feature groupName авто-строит только year/quarter/month и игнорирует
//     пользовательские week/day;
//  3) groupInterval "week" не поддерживается (не сворачивает и не форматирует).
//
// Решение: заранее считаем для каждого уровня отдельную колонку (уникальный
// dataField) с уже усечённым значением и раскладываем уровни как независимые
// поля в ту же область, что и родительское поле даты (по groupName). Неделя
// дополнительно получает подпись диапазона "пп.ММ–пп.ММ".

function toDate(value) {
  if (value instanceof Date) return isNaN(value.getTime()) ? null : value;
  if (value === null || value === undefined) return null;
  const s = String(value).trim();
  // Дата + необязательное время (YYYY-MM-DD[ T]HH:MM[:SS]) — локально, без UTC-сдвига.
  const m = /^(\d{4})-(\d{2})-(\d{2})(?:[ T](\d{2}):(\d{2})(?::(\d{2}))?)?/.exec(s);
  if (m) {
    return new Date(+m[1], +m[2] - 1, +m[3], +(m[4] || 0), +(m[5] || 0), +(m[6] || 0));
  }
  const d = new Date(s);
  return isNaN(d.getTime()) ? null : d;
}

function startOfDay(d) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

function startOfHour(d) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate(), d.getHours(), 0, 0, 0);
}

function startOfMinute(d) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate(), d.getHours(), d.getMinutes(), 0, 0);
}

function startOfSecond(d) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate(), d.getHours(), d.getMinutes(), d.getSeconds(), 0);
}

// Понедельник ISO-недели.
export function isoMonday(value) {
  const d = toDate(value);
  if (!d) return null;
  const t = startOfDay(d);
  t.setDate(t.getDate() - ((t.getDay() + 6) % 7)); // getDay(): 0=вс..6=сб
  return t;
}

function pad2(n) { return (n < 10 ? '0' : '') + n; }

// "пп.ММ–пп.ММ" для недели, начинающейся с понедельника.
export function fmtWeekRange(monday) {
  const s = toDate(monday);
  if (!s) return '';
  const e = new Date(s.getFullYear(), s.getMonth(), s.getDate() + 6);
  return pad2(s.getDate()) + '.' + pad2(s.getMonth() + 1) + '\u2013' +
         pad2(e.getDate()) + '.' + pad2(e.getMonth() + 1);
}

function truncate(kind, value) {
  const d = toDate(value);
  if (!d) return null;
  switch (kind) {
    case 'year':    return new Date(d.getFullYear(), 0, 1);
    case 'quarter': return new Date(d.getFullYear(), 3 * Math.floor(d.getMonth() / 3), 1);
    case 'month':   return new Date(d.getFullYear(), d.getMonth(), 1);
    case 'week':    return isoMonday(d);
    case 'day':     return startOfDay(d);
    case 'hour':    return startOfHour(d);
    case 'minute':  return startOfMinute(d);
    case 'second':  return startOfSecond(d);
    default:        return d;
  }
}

// Формат заголовка по уровню (DevExpress named formats / Globalize patterns).
const FORMAT_BY_KIND = {
  year: 'yyyy',
  quarter: 'quarter',
  month: 'month',
  day: 'day',
  hour: 'HH:mm:ss',
  minute: 'HH:mm:ss',
  second: 'HH:mm:ss'
};

// Уровни со временем требуют dataType 'datetime'.
const TIME_KINDS = { hour: true, minute: true, second: true };
// Иерархия обнаружена, если есть поле-родитель (с area) и ссылающиеся на него
// по groupName поля с groupInterval.
function findHierarchy(fields) {
  const byName = {};
  fields.forEach(function (f) {
    if (f && f.dataField) byName[f.dataField] = f;
  });
  for (let i = 0; i < fields.length; i++) {
    const f = fields[i];
    if (!f || !f.groupName || !f.groupInterval) continue;
    const parent = byName[f.groupName];
    // Трансформируем только когда родитель стоит в области строк/колонок.
    if (parent && (parent.area === 'row' || parent.area === 'column' || parent.area === 'filter')) {
      return { parent: parent, groupName: f.groupName };
    }
  }
  return null;
}

// Переписывает иерархию дат и дополняет строки производными колонками.
// Идемпотентно: повторный вызов не плодит колонки и не переписывает снова.
export function preparePivotDateIntervals(fields, rows) {
  const srcFields = fields || [];
  if (!Array.isArray(srcFields)) return { fields: srcFields, rows: rows };

  const hier = findHierarchy(srcFields);
  if (!hier) return { fields: srcFields, rows: srcFields };

  const data = rows || [];
  const parent = hier.parent;
  const G = hier.groupName;
  const area = parent.area;
  const used = {};

  const newFields = [];
  srcFields.forEach(function (f) {
    if (!f) return;
    if (f === parent) {
      // Поле-анкер (напр. "Дата") тоже выводим как уровень — со своим area/format.
      newFields.push(Object.assign({}, f));
      return;
    }
    if (f.groupName === G && f.groupInterval) {
      if (f.visible === false) return; // скрытые уровни не добавляем
      const kind = String(f.groupInterval).toLowerCase();
      const col = '__gi_' + kind + '__' + G;
      if (!used[col]) {
        used[col] = true;
        for (let i = 0; i < data.length; i++) {
          const row = data[i];
          if (row && typeof row === 'object' && row[col] === undefined) {
            row[col] = truncate(kind, row[G]);
          }
        }
      }
      const nf = {
        dataField: col,
        caption: f.caption,
        dataType: TIME_KINDS[kind] ? 'datetime' : 'date',
        area: area
      };
      if (f.expanded !== undefined) nf.expanded = f.expanded;
      if (kind === 'week') {
        // Подпись диапазона "пп.ММ–пп.ММ" (проверено: customizeText на дату-поле).
        nf.customizeText = function (e) { return fmtWeekRange(e.value); };
      } else {
        // Явный format из rpt.js имеет приоритет над форматом по умолчанию.
        nf.format = f.format || FORMAT_BY_KIND[kind] || 'shortDate';
      }
      newFields.push(nf);
      return;
    }
    newFields.push(f);
  });

  return { fields: newFields, rows: data };
}
