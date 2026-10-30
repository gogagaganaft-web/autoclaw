// ColumnsUtil.js
// Рекурсивная дедупликация колонок по dataField (или caption, если dataField нет).
// Первое вхождение побеждает, пустые группы отбрасываются.
// Защищает DevExpress DataGrid от E1059 "column names are not unique".
export function dedupeColumns(cols) {
  var seen = Object.create(null);

  function fieldKey(col) {
    return col.dataField || col.caption || null;
  }

  function walk(list) {
    var out = [];
    (list || []).forEach(function(col) {
      if (!col) return;

      if (col.columns && col.columns.length) {
        var sub = walk(col.columns);
        if (sub.length) out.push(Object.assign({}, col, { columns: sub }));
        return;
      }

      var key = fieldKey(col);
      if (!key) { out.push(col); return; }

      if (seen[key]) return;
      seen[key] = true;
      out.push(col);
    });
    return out;
  }

  return walk(cols);
}
