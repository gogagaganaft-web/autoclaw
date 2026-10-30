exports.calculateStartViewDate = undefined;
var i = require("./45985.js");
exports.calculateStartViewDate = function (e, t) {
  var n = new Date(e);
  return (0, i.setOptionHour)(n, t);
};