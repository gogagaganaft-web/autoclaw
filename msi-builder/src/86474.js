exports.ExpressionUtils = undefined;
var i = require("./35922.js");
var o = {
  getField: function (e, t, n) {
    if ((0, i.isDefined)(e.getter[t])) {
      return e.getter[t](n);
    }
  },
  setField: function (e, t, n, o) {
    if ((0, i.isDefined)(e.setter[t])) {
      e.setter[t](n, o);
      return n;
    }
  }
};
exports.ExpressionUtils = o;