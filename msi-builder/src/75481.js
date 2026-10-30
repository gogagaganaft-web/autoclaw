exports.calculateStartViewDate = undefined;
var i;
var o = (i = require("./91198.js")) && i.__esModule ? i : {
  default: i
};
var a = require("./45985.js");
var r = require("./19097.js");
exports.calculateStartViewDate = function (e, t, n, i) {
  var s = o.default.getFirstMonthDate((0, r.getViewStartByOptions)(n, e, i, o.default.getFirstMonthDate(n)));
  return (0, a.setOptionHour)(s, t);
};