exports.correctValueType = l;
exports.getParser = undefined;
var i;
var o = require("./20576.js");
var a = (i = require("./69434.js")) && i.__esModule ? i : {
  default: i
};
var r = require("./35922.js");
var s = {
  string: function (e) {
    if ((0, r.isDefined)(e)) {
      return "" + e;
    } else {
      return e;
    }
  },
  numeric: function (e) {
    if (!(0, r.isDefined)(e)) {
      return e;
    }
    var t = Number(e);
    if (isNaN(t)) {
      t = undefined;
    }
    return t;
  },
  datetime: function (e) {
    if (!(0, r.isDefined)(e)) {
      return e;
    }
    var t;
    var n = Number(e);
    t = isNaN(n) ? a.default.deserializeDate(e) : new Date(n);
    if (isNaN(Number(t))) {
      t = undefined;
    }
    return t;
  }
};
function l(e) {
  if (e === "numeric" || e === "datetime" || e === "string") {
    return e;
  } else {
    return "";
  }
}
exports.getParser = function (e) {
  return s[l(e)] || o.noop;
};