exports.exportGantt = function (e) {
  var t = e.component;
  if (t == null) {
    return undefined;
  } else {
    return t.exportToPdf(e);
  }
};