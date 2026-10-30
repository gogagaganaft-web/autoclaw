Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.calculateScrollbarWidth = undefined;
exports.capitalizeFirstLetter = V;
exports.createPath = D;
exports.default = undefined;
exports.discoverObjectFields = A;
exports.findField = C;
exports.foreachDataLevel = I;
exports.foreachTreeAsync = exports.foreachTree = undefined;
exports.formatValue = S;
exports.getCompareFunction = k;
exports.getExpandedLevel = E;
exports.getFieldsDataType = P;
exports.getFiltersByPath = B;
exports.getScrollbarWidth = undefined;
exports.mergeArraysByMaxValue = T;
exports.sendRequest = v;
exports.setDefaultFieldValueFormatting = R;
exports.storeDrillDownMixin = exports.setFieldProperty = undefined;
var i = m(require("./73349.js"));
var o = m(require("./37208.js"));
var a = m(require("./39618.js"));
var r = require("./47617.js");
var s = require("./62754.js");
var l = require("./13306.js");
var u = require("./95479.js");
var d = require("./35922.js");
var c = m(require("./26562.js"));
var h = require("./85273.js");
var f = m(require("./30343.js"));
var p = m(require("./91500.js"));
var g = require("./18813.js");
function m(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
function _(e, t, n, i) {
  var o = e._initProperties = e._initProperties || {};
  var a = i ? n : e[t];
  if ((!Object.prototype.hasOwnProperty.call(o, t) || i) && t !== "_initProperties") {
    o[t] = a;
  }
  e[t] = n;
}
function v(e) {
  return o.default.sendRequest(e);
}
exports.setFieldProperty = _;
var y = new Date();
function b(e) {
  return function t(n, i, o, a, r, l) {
    var u;
    var d;
    function c(e, r, l) {
      (0, s.when)(t(n, i, o, a, r, l)).done(e.resolve);
    }
    a = a || [];
    n = n || [];
    u = r = r || 0;
    for (; u < n.length; u += 1) {
      if (e && u > r && u % 10000 == 0 && new Date() - y >= 300) {
        y = new Date();
        c(d = new s.Deferred(), u, false);
        return d;
      }
      var h = n[u];
      if (!l) {
        a.unshift(h);
        if (o && i(a, u) === false) {
          return;
        }
        if (h.children) {
          var f = t(h.children, i, o, a);
          if (e && f) {
            d = new s.Deferred();
            f.done(c(d, u, true));
            return d;
          }
        }
      }
      l = false;
      if (!o && i(a, u) === false) {
        return;
      }
      a.shift();
      if (n[u] !== h) {
        u -= 1;
      }
    }
  };
}
var x = b(false);
exports.foreachTree = x;
var w = b(true);
function C(e, t) {
  if (e && (0, d.isDefined)(t)) {
    for (var n = 0; n < e.length; n += 1) {
      var i = e[n];
      if (i.name === t || i.caption === t || i.dataField === t || i.index === t) {
        return n;
      }
    }
  }
  return -1;
}
function S(e, t) {
  var n = {
    value: e,
    valueText: e == e && f.default.format(e, t.format) || ""
  };
  if (t.customizeText) {
    return t.customizeText.call(t, n);
  } else {
    return n.valueText;
  }
}
function k(e) {
  return function (t, n) {
    var i = 0;
    var o = e(t);
    var a = e(n);
    var r = (0, d.isDefined)(o);
    var s = (0, d.isDefined)(a);
    if (r && s) {
      if (o > a) {
        i = 1;
      } else if (o < a) {
        i = -1;
      }
    }
    if (r && !s) {
      i = 1;
    }
    if (!r && s) {
      i = -1;
    }
    return i;
  };
}
function D(e) {
  var t = [];
  for (var n = e.length - 1; n >= 0; n -= 1) {
    t.push(e[n].key || e[n].value);
  }
  return t;
}
function I(e, t, n, i) {
  n = n || 0;
  i = i || "children";
  if (e.length) {
    t(e, n);
  }
  for (var o = 0; o < e.length; o += 1) {
    var a = e[o];
    if (a[i] && a[i].length) {
      I(a[i], t, n + 1, i);
    }
  }
}
function T(e, t) {
  var n = [];
  for (var i = 0; i < e.length; i += 1) {
    n.push(Math.max(e[i] || 0, t[i] || 0));
  }
  return n;
}
function E(e, t) {
  var n = e[t];
  var i = 0;
  var o = (t === "columns" ? e.columnExpandedPaths : e.rowExpandedPaths) || [];
  for (e.headerName === t ? i = e.path.length : e.headerName && e.headerName !== t && e.oppositePath ? i = e.oppositePath.length : (0, u.each)(o, function (e, t) {
    i = Math.max(i, t.length);
  }); n[i + 1] && n[i].expanded;) {
    i += 1;
  }
  return i;
}
function O(e, t, n, i) {
  var o = [];
  Object.keys(t || []).forEach(function (a) {
    if (!a || !a.startsWith("__")) {
      var s;
      var c;
      for (var h = 1, f = n.length ? `${n}.${a}` : a, p = i[f], g = (0, r.compileGetter)(f), m = t[a]; !(0, d.isDefined)(m) && e[h];) {
        m = g(e[h]);
        h += 1;
      }
      if (!p && (0, d.isDefined)(m)) {
        p = (0, d.type)(m);
      }
      s = [{
        dataField: f,
        dataType: p,
        groupName: p === "date" ? a : undefined,
        groupInterval: undefined,
        displayFolder: n
      }];
      if (p === "date") {
        s = s.concat((c = s[0], (0, u.map)(["year", "quarter", "month"], function (e, t) {
          return (0, l.extend)({}, c, {
            groupInterval: e,
            groupIndex: t
          });
        })));
      } else if (p === "object") {
        s = O(e, m, f, i);
      }
      o.push.apply(o, s);
    }
  });
  return o;
}
function A(e, t) {
  var n = P(t);
  return O(e, e[0], "", n);
}
function P(e) {
  var t = {};
  (0, u.each)(e, function (e, n) {
    t[n.dataField] = t[n.dataField] || n.dataType;
  });
  return t;
}
exports.foreachTreeAsync = w;
var M = {
  month: function (e) {
    return p.default.getMonthNames()[e - 1];
  },
  quarter: function (e) {
    return p.default.format(new Date(2000, e * 3 - 1), "quarter");
  },
  dayOfWeek: function (e) {
    return p.default.getDayNames()[e];
  }
};
function R(e) {
  if (e.dataType === "date") {
    if (!e.format) {
      _(e, "format", M[e.groupInterval]);
    }
  } else if (e.dataType === "number") {
    var t = (0, d.isNumeric)(e.groupInterval) && e.groupInterval > 0 && e.groupInterval;
    if (t && !e.customizeText) {
      _(e, "customizeText", function (n) {
        var i = n.value + t;
        var o = f.default.format(i, e.format);
        if (n.valueText && o) {
          return `${n.valueText} - ${o}`;
        } else {
          return "";
        }
      });
    }
  }
}
function B(e, t) {
  var n = [];
  t = t || [];
  for (var i = 0; i < t.length; i += 1) {
    n.push((0, l.extend)({}, e[i], {
      groupIndex: null,
      groupName: null,
      filterType: "include",
      filterValues: [t[i]]
    }));
  }
  return n;
}
var L = {
  createDrillDownDataSource: function (e, t) {
    var n = this.getDrillDownItems(e, t);
    function i(e) {
      return function (t) {
        var i;
        i = new s.Deferred();
        (0, s.when)(n).done(function (n) {
          new c.default(n)[e](t).done(i.resolve).fail(i.reject);
        }).fail(i.reject);
        return i;
      };
    }
    return new h.DataSource({
      load: i("load"),
      totalCount: i("totalCount"),
      key: this.key()
    });
  }
};
function V(e) {
  return e.charAt(0).toUpperCase() + e.slice(1);
}
exports.storeDrillDownMixin = L;
function F(e) {
  return e.offsetWidth - e.clientWidth;
}
exports.getScrollbarWidth = F;
var H = (0, a.default)(function () {
  var e = i.default.getDocument();
  e.body.insertAdjacentHTML("beforeend", `<div class="${g.CLASSES.scrollBarMeasureElement}"></div>`);
  var t = e.body.lastElementChild;
  var n = F(t);
  if (t) {
    e.body.removeChild(t);
  }
  return n;
});
exports.calculateScrollbarWidth = H;
var N = {
  setFieldProperty: _,
  sendRequest: v,
  foreachTree: x,
  foreachTreeAsync: w,
  findField: C,
  formatValue: S,
  getCompareFunction: k,
  createPath: D,
  foreachDataLevel: I,
  mergeArraysByMaxValue: T,
  getExpandedLevel: E,
  discoverObjectFields: A,
  getFieldsDataType: P,
  setDefaultFieldValueFormatting: R,
  getFiltersByPath: B,
  storeDrillDownMixin: L,
  capitalizeFirstLetter: V,
  getScrollbarWidth: F,
  calculateScrollbarWidth: H
};
exports.default = N;