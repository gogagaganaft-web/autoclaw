exports.calculateStartViewDate = undefined;
var i = require("./45985.js");
exports.calculateStartViewDate = function (e, t, n, o) {
  var a = (0, i.getViewStartByOptions)(n, e, o, n);
  return (0, i.setOptionHour)(a, t);
};