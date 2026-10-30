exports.Range = undefined;
var i = require("./35922.js");
var o = require("./13306.js");
var a = require("./19157.js");
var r = i.isDefined;
var s = i.isDate;
var l = i.isFunction;
function u(e, t) {
  return t < e;
}
function d(e, t) {
  return t > e;
}
function c(e, t, n, i) {
  var o = r(t);
  if (r(e)) {
    if (o && i(e, t)) {
      n(t);
    }
  } else if (o) {
    n(t);
  }
}
function h(e) {
  if (e) {
    (0, o.extend)(this, e);
  }
}
exports.Range = h;
var f = h;
f.prototype = {
  constructor: f,
  addRange: function (e) {
    var t = this;
    var n = t.categories;
    var i = e.categories;
    var o = t.axisType === "discrete";
    function s(n, i) {
      c(t[n], e[n], function (e) {
        t[n] = e;
      }, i);
    }
    function l(e, n, i) {
      c(t[e], t[n], function (n) {
        if (r(t[e])) {
          t[e] = n;
        }
      }, i);
    }
    function h(n) {
      t[n] = t[n] || e[n];
    }
    h("invert");
    h("containsConstantLine");
    h("axisType");
    h("dataType");
    h("isSpacedMargin");
    if (t.axisType === "logarithmic") {
      h("base");
    } else {
      t.base = undefined;
    }
    s("min", u);
    s("max", d);
    if (o) {
      h("minVisible");
      h("maxVisible");
    } else {
      s("minVisible", u);
      s("maxVisible", d);
    }
    s("interval", u);
    if (!o) {
      l("min", "minVisible", u);
      l("min", "maxVisible", u);
      l("max", "maxVisible", d);
      l("max", "minVisible", d);
    }
    t.categories = n === undefined ? i : i ? (0, a.unique)(n.concat(i)) : n;
    if (t.axisType === "logarithmic") {
      h("allowNegatives");
      s("linearThreshold", u);
    }
    return t;
  },
  isEmpty: function () {
    return (!r(this.min) || !r(this.max)) && (!this.categories || this.categories.length === 0);
  },
  correctValueZeroLevel: function () {
    var e = this;
    if (s(e.max) || s(e.min)) {
      return e;
    }
    function t(t, n) {
      if (e[t] < 0 && e[n] < 0) {
        e[n] = 0;
      }
      if (e[t] > 0 && e[n] > 0) {
        e[t] = 0;
      }
    }
    t("min", "max");
    t("minVisible", "maxVisible");
    return e;
  },
  sortCategories: function (e) {
    if (e !== false && this.categories) {
      if (Array.isArray(e)) {
        var t = e.map(function (e) {
          return e.valueOf();
        });
        var n = this.categories.filter(function (e) {
          return t.indexOf(e.valueOf()) === -1;
        });
        this.categories = e.concat(n);
      } else {
        var i = !l(e);
        if (i && this.dataType !== "string") {
          e = function (e, t) {
            return e.valueOf() - t.valueOf();
          };
        } else if (i) {
          e = false;
        }
        if (e) {
          this.categories.sort(e);
        }
      }
    }
  }
};