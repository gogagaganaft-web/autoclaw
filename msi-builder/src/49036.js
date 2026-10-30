exports.equals = undefined;
var i;
var o = (i = require("./73349.js")) && i.__esModule ? i : {
  default: i
};
var a = require("./47617.js");
var r = require("./35922.js");
function s(e) {
  return (s = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function (e) {
    return typeof e;
  } : function (e) {
    if (e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype) {
      return "symbol";
    } else {
      return typeof e;
    }
  })(e);
}
exports.equals = function (e, t) {
  e = (0, a.toComparable)(e, true);
  t = (0, a.toComparable)(t, true);
  if (e && t && (0, r.isRenderer)(e) && (0, r.isRenderer)(t)) {
    return t.is(e);
  } else {
    return e != e && t != t || (e === 0 && t === 0 ? function (e, t) {
      return 1 / e == 1 / t;
    }(e, t) : (e === null || s(e) !== "object" || !!o.default.isElementNode(e)) && e === t);
  }
};