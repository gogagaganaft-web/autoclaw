exports.isDataOnWeekend = exports.getWeekendsCount = exports.calculateStartViewDate = undefined;
var i;
var o = (i = require("./91198.js")) && i.__esModule ? i : {
  default: i
};
var a = require("./45985.js");
var r = require("./34279.js");
function s(e) {
  var t = e.getDay();
  return t === 6 || t === 0;
}
exports.isDataOnWeekend = s;
exports.getWeekendsCount = function (e) {
  return Math.floor(e / 7) * 2;
};
exports.calculateStartViewDate = function (e, t, n, i, l) {
  var u = (0, a.getViewStartByOptions)(n, e, i, (0, r.getValidStartDate)(n, l));
  var d = o.default.getFirstWeekDate(u, l);
  if (s(d)) {
    var c = (8 - d.getDay()) % 7;
    d.setDate(d.getDate() + c);
  }
  return (0, a.setOptionHour)(d, t);
};