exports.addColorizer = function (e, t) {
  r[e] = t;
};
exports.createColorCodeGetter = function (e) {
  if (e.colorCodeField) {
    t = e.colorCodeField;
    return function (e) {
      return Number(e.data[t]);
    };
  } else {
    return u;
  }
  var t;
};
exports.getColorizer = function (e, t, n) {
  var u = (0, o.normalizeEnum)(e.type || i);
  var d = r[u] && r[u](e, t, n);
  if (d) {
    return (e.colorizeGroups ? l : s)(d);
  } else {
    return a.noop;
  }
};
exports.setDefaultColorizer = function (e) {
  i = e;
};
var i;
var o = require("./19157.js");
var a = require("./20576.js");
var r = {};
function s(e) {
  return function (t) {
    if (t.isNode()) {
      return undefined;
    } else {
      return e(t);
    }
  };
}
function l(e) {
  return function (t) {
    var n = !t.isNode() && t.parent;
    if (n) {
      return n._groupColor = n._groupColor || e(n);
    } else {
      return undefined;
    }
  };
}
function u(e) {
  return e.value;
}