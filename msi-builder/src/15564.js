exports.default = undefined;
var i = require("./95479.js");
var o = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var a = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
var r = ["AM", "PM"];
var s = ["Q1", "Q2", "Q3", "Q4"];
function l(e, t) {
  var n = {
    abbreviated: 3,
    short: 2,
    narrow: 1
  };
  return (0, i.map)(e, function (e) {
    return e.substr(0, n[t]);
  });
}
var u = {
  getMonthNames: function (e) {
    return l(o, e);
  },
  getDayNames: function (e) {
    return l(a, e);
  },
  getQuarterNames: function (e) {
    return s;
  },
  getPeriodNames: function (e) {
    return r;
  }
};
exports.default = u;
module.exports = exports.default;
module.exports.default = exports.default;