exports.validateData = function (e, t, n, o) {
  e = function (e, t) {
    var n;
    var o;
    var a;
    var r;
    var s = [];
    var u = (0, i.isDefined)(e);
    var d = u && !l(e);
    if (u && !d) {
      n = 0;
      o = e.length;
      a = 0;
      for (; n < o; ++n) {
        r = e[n];
        if ((0, i.isObject)(r)) {
          s[a++] = r;
        } else if (r) {
          d = true;
        }
      }
    }
    if (d) {
      t("E2001");
    }
    return s;
  }(e, n);
  t.argumentType = t.argumentAxisType = null;
  r = t.groups;
  r.forEach(function (e) {
    e.valueType = e.valueAxisType = null;
    e.series.forEach(function (e) {
      e.updateDataType({});
    });
    if (e.valueAxis) {
      e.valueAxis.resetTypes("valueType");
    }
  });
  a = t.argumentAxes;
  if (a) {
    a.forEach(function (e) {
      e.resetTypes("argumentType");
    });
  }
  (function (e, t, n) {
    var i;
    var o = [];
    var a = [];
    var r = t.argumentOptions && s(t.argumentOptions.argumentType);
    t.groups.forEach(function (e) {
      if (e.series.length) {
        var n = e.valueOptions && s(e.valueOptions.valueType);
        e.valueType = n;
        t.argumentType = r;
        if (!n) {
          o.push(e);
        }
        if (!r) {
          a.push(e);
        }
      }
    });
    if (o.length || a.length) {
      i = o.map(function (e, t) {
        return t;
      });
      e.some(function (e) {
        var r;
        o.forEach(function (t, n) {
          if (function (e, t) {
            e.series.forEach(function (n) {
              n.getValueFields().forEach(function (n) {
                e.valueType = h(t[n], e.valueType);
              });
            });
            return e.valueType;
          }(t, e) && i.indexOf(n) >= 0) {
            i.splice(n, 1);
          }
        });
        if (!r) {
          a.forEach(function (n) {
            r = function (e, t, n) {
              e.forEach(function (e) {
                n.argumentType = h(t[e.getArgumentField()], n.argumentType);
              });
              return n.argumentType;
            }(n.series, e, t);
          });
        }
        if (!n && r && i.length === 0) {
          return true;
        }
      });
    }
  })(e, t, o.checkTypeForAllData);
  (function (e, t) {
    var n = e.argumentOptions || {};
    var i = n && n.categories || [];
    var o = f(e.argumentType, n.type, !!i.length, t);
    e.groups.forEach(function (n) {
      var i = n.valueOptions || {};
      var a = i.categories || [];
      var r = f(n.valueType, i.type, !!a.length, t);
      n.series.forEach(function (t) {
        var a = {
          argumentAxisType: o,
          valueAxisType: r
        };
        e.argumentAxisType = e.argumentAxisType || a.argumentAxisType;
        n.valueAxisType = n.valueAxisType || a.valueAxisType;
        a.argumentType = e.argumentType;
        a.valueType = n.valueType;
        a.showZero = i.showZero;
        t.updateDataType(a);
      });
      n.valueAxisType = n.valueAxisType || r;
      if (n.valueAxis) {
        n.valueAxis.setTypes(n.valueAxisType, n.valueType, "valueType");
        n.valueAxis.validate();
      }
    });
    e.argumentAxisType = e.argumentAxisType || o;
    if (e.argumentAxes) {
      e.argumentAxes.forEach(function (t) {
        t.setTypes(e.argumentAxisType, e.argumentType, "argumentType");
        t.validate();
      });
    }
  })(t, n);
  if (o.convertToAxisDataType) {
    e = function (e, t) {
      var n;
      var i = [];
      var o = e.length;
      i.length = o;
      n = 0;
      for (; n < o; ++n) {
        i[n] = g(e[n], t);
      }
      return i;
    }(e, function (e, t) {
      var n;
      var i;
      var o = p(e.argumentType, e.argumentAxisType, t);
      var a = [o];
      var r = {};
      var s = [];
      e.groups.forEach(function (e, s) {
        e.series.forEach(function (l) {
          i = p(e.valueType, e.valueAxisType, t);
          n = p("numeric", "continuous", t);
          r[l.getArgumentField()] = o;
          l.getValueFields().forEach(function (e) {
            a[s + 1] = i;
            r[e] = i;
          });
          if (l.getSizeField()) {
            r[l.getSizeField()] = n;
          }
        });
      });
      for (var l in r) {
        s.push([l, r[l]]);
      }
      if (s.length) {
        (function (e, t) {
          var n = e.argumentOptions && e.argumentOptions.categories;
          e.groups.forEach(function (e, n) {
            var i = e.valueOptions && e.valueOptions.categories;
            if (i) {
              e.valueOptions.categories = d(i, t[n + 1]);
            }
          });
          if (n) {
            e.argumentOptions.categories = d(n, t[0]);
          }
        })(e, a);
      }
      return s;
    }(t, n));
  }
  var a;
  var r;
  (function (e, t) {
    var n = t.groups[0] && t.groups[0].series[0];
    if (!n || n.type !== "pie" && n.type !== "doughnut" && n.type !== "donut") {
      return;
    }
    t.groups.forEach(function (t) {
      t.series.forEach(function (t) {
        (function (e, t, n, o) {
          var a = (o = o || {}).mode;
          var r = {};
          if (!a || a === "none") {
            return;
          }
          r[t] = String(o.groupName || "others");
          r[n] = 0;
          var s = u(e.slice(), false, function (e) {
            return e[n];
          });
          (function (e, t, n, o) {
            if (o >= 0) {
              e.slice(o).forEach(function (e) {
                if ((0, i.isDefined)(e[n])) {
                  t[n] += e[n];
                  e[n] = undefined;
                }
              });
            }
          })(s, r, n, a === "smallValueThreshold" ? function (e, t, n) {
            var o;
            var a;
            var r = e.length;
            for (o = 0; o < r && (a = e[o][t], !(0, i.isDefined)(a) || !(n > a)); ++o);
            return o;
          }(s, n, o.threshold) : o.topCount);
          if (r[n]) {
            e.push(r);
          }
        })(e, t.getArgumentField(), t.getValueFields()[0], t.getOptions().smallValuesGrouping);
      });
    });
  })(e, t);
  return function (e, t, n, o) {
    var a;
    var r = {};
    var s = t.argumentAxisType === "discrete";
    var l = s && t.argumentOptions && t.argumentOptions.categories;
    function d(e) {
      return e;
    }
    var c = n.sortingMethod;
    if (!l && (0, i.isFunction)(c)) {
      e = function (e, t) {
        return e.slice().sort(t);
      }(e, c);
    }
    if (s) {
      t.categories = function (e, t, n) {
        var o = n ? n.slice() : [];
        t.forEach(function (t) {
          e.forEach(function (e) {
            var n = e[t];
            if ((0, i.isDefined)(n) && function (e, t) {
              return e.map(function (e) {
                return e.valueOf();
              }).indexOf(t.valueOf()) === -1;
            }(o, n)) {
              o.push(n);
            }
          });
        });
        return o;
      }(e, o, l);
    }
    if (l || !(0, i.isFunction)(c) && t.argumentType === "string" && !n._skipArgumentSorting) {
      h = t.categories;
      f = {};
      h.forEach(function (e, t) {
        f[e] = t;
      });
      d = function (e, t) {
        return u(e.slice(), true, function (e) {
          return f[e[t]];
        });
      };
    } else if (c === true && t.argumentType !== "string") {
      d = _;
      a = s;
    }
    var h;
    var f;
    o.forEach(function (t) {
      r[t] = d(e, t);
    });
    if (a) {
      t.categories = t.categories.sort(m);
    }
    return r;
  }(e, t, o, function (e) {
    var t = [];
    var n = {};
    e.groups.forEach(function (e) {
      e.series.forEach(function (e) {
        var i;
        var o;
        var a;
        i = e.getArgumentField();
        o = t;
        if (!(a = n)[i]) {
          o.push(i);
          a[i] = true;
        }
      });
    });
    return t;
  }(t));
};
var i = require("./35922.js");
var o = require("./13306.js");
var a = require("./19157.js");
var r = require("./8587.js");
var s = (0, a.enumParser)(["string", "numeric", "datetime"]);
var l = Array.isArray;
function u(e, t, n) {
  var o = t ? function (e, t) {
    return e - t;
  } : function (e, t) {
    return t - e;
  };
  e.sort(function (e, t) {
    var a = n(e);
    var r = n(t);
    var s = (0, i.isDefined)(a) ? 1 : 0;
    var l = (0, i.isDefined)(r) ? 1 : 0;
    if (s && l) {
      return o(a, r);
    } else {
      return o(s, l);
    }
  });
  return e;
}
function d(e, t) {
  var n = [];
  e.forEach(function (e) {
    var i = t(e);
    if (i !== undefined) {
      n.push(i);
    }
  });
  return n;
}
function c(e) {
  return e;
}
function h(e, t) {
  var n = t;
  if (t === "string" || (0, i.isString)(e)) {
    n = "string";
  } else if (t === "datetime" || (0, i.isDate)(e)) {
    n = "datetime";
  } else if ((0, i.isNumeric)(e)) {
    n = "numeric";
  }
  return n;
}
function f(e, t, n, i) {
  if (e === "string" && (t === "continuous" || t === "logarithmic" || t === "semidiscrete")) {
    i("E2002");
  }
  if (t === "logarithmic") {
    return "logarithmic";
  } else if (n || t === "discrete" || e === "string") {
    return "discrete";
  } else if (t === "semidiscrete") {
    return "semidiscrete";
  } else {
    return "continuous";
  }
}
function p(e, t, n) {
  var o = e ? (0, r.getParser)(e) : c;
  var a = t !== "discrete" ? function (e) {
    if (isFinite(e) || e === undefined) {
      return e;
    } else {
      return null;
    }
  } : c;
  return function (e, t) {
    var r = a(o(e));
    if (r === undefined) {
      (function (e, t, n) {
        if (e) {
          n((0, i.isNumeric)(e) || (0, i.isDate)(e) || (0, i.isString)(e) ? "E2004" : "E2003", [t]);
        }
      })(e, t, n);
    }
    return r;
  };
}
function g(e, t) {
  var n;
  var i;
  var a;
  var r = t.length;
  var s = (0, o.extend)({}, e);
  for (n = 0; n < r; ++n) {
    a = e[i = t[n][0]];
    s[i] = t[n][1](a, i);
  }
  return s;
}
function m(e, t) {
  var n = e - t;
  if (isNaN(n)) {
    if ((0, i.isDefined)(e)) {
      if ((0, i.isDefined)(t)) {
        return 0;
      } else {
        return -1;
      }
    } else {
      return 1;
    }
  } else {
    return n;
  }
}
function _(e, t) {
  return e.slice().sort(function (e, n) {
    return m(e[t], n[t]);
  });
}