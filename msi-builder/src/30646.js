exports.normalizeBoundaryValue = o;
exports.normalizeRowsInfo = function (e) {
  e.forEach(function (e) {
    e.cells.forEach(function (e) {
      var t = e.pdfCell;
      t.padding = o(t.padding);
    });
  });
};
var i = require("./35922.js");
function o(e) {
  if ((0, i.isNumeric)(e)) {
    return {
      top: e,
      right: e,
      bottom: e,
      left: e
    };
  } else {
    return {
      top: (e == null ? undefined : e.top) ?? 0,
      right: (e == null ? undefined : e.right) ?? 0,
      bottom: (e == null ? undefined : e.bottom) ?? 0,
      left: (e == null ? undefined : e.left) ?? 0
    };
  }
}