exports.addItem = function (e, t) {
  var n = C(t);
  var i = k(n);
  if (n.length === 1) {
    n.unshift(e);
  } else {
    n.push(e, i);
  }
  return t;
};
exports.convertToInnerStructure = z;
exports.createCondition = function (e, t) {
  var n = [e.dataField, "", ""];
  var i = E(e);
  Q(n, i, t);
  return n;
};
exports.createEmptyGroup = A;
exports.filterHasField = function e(t, n) {
  if (t === null || t.length === 0) {
    return false;
  }
  if (R(t)) {
    return t[0] === n;
  }
  return t.some(function (t) {
    return (R(t) || M(t)) && e(t, n);
  });
};
exports.getAvailableOperations = function (e, t, n) {
  var i = D(e);
  var o = !!e.lookup;
  n.forEach(function (t) {
    if (!e.filterOperations && i.indexOf(t.name) === -1) {
      var n = t && t.dataTypes;
      if ((!o || !t.notForLookup) && n && n.indexOf(e.dataType || "string") >= 0) {
        i.push(t.name);
      }
    }
  });
  return i.map(function (e) {
    var i = T(n, e);
    if (i) {
      return {
        icon: i.icon || "icon-none",
        text: i.caption || (0, h.captionize)(i.name),
        value: i.name,
        isCustom: true
      };
    } else {
      return {
        icon: m.default.getIconByFilterOperation(e) || "icon-none",
        text: I(e, t),
        value: e
      };
    }
  });
};
exports.getCaptionByOperation = I;
exports.getCaptionWithParents = function e(t, n) {
  if (Y(t.dataField)) {
    var i = X(t.dataField);
    for (var o = 0; o < n.length; o++) {
      if (n[o].dataField === i) {
        return e(n[o], n) + "." + t.caption;
      }
    }
  }
  return t.caption;
};
exports.getCurrentLookupValueText = function (e, t, n) {
  if (t === "") {
    n("");
    return;
  }
  var i = e.lookup;
  if (i.items) {
    n(i.calculateCellValue(t) || "");
  } else {
    var o = (0, r.isFunction)(i.dataSource) ? i.dataSource({}) : i.dataSource;
    new g.DataSource(o).loadSingle(i.valueExpr, t).done(function (o) {
      var a = "";
      if (o) {
        a = i.displayExpr ? (0, s.compileGetter)(i.displayExpr)(o) : o;
      }
      if (e.customizeText) {
        a = e.customizeText({
          value: t,
          valueText: a
        });
      }
      n(a);
    }).fail(function () {
      n("");
    });
  }
};
exports.getCurrentValueText = function (e, t, n, i = "filterBuilder") {
  if (q(t)) {
    return "";
  }
  if (Array.isArray(t)) {
    var a = new o.Deferred();
    o.when.apply(this, G(e, t, n, i)).done(function () {
      for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) {
        t[n] = arguments[n];
      }
      var i = t.some(function (e) {
        return !q(e);
      }) ? t.map(function (e) {
        if (q(e)) {
          return "?";
        } else {
          return e;
        }
      }) : "";
      a.resolve(i);
    });
    return a;
  }
  return W(e, t, n, i);
};
exports.getCustomOperation = T;
exports.getDefaultOperation = E;
exports.getField = P;
exports.getFilterExpression = function e(t, n, i, o) {
  if (!(0, r.isDefined)(t)) {
    return null;
  }
  if (w(t)) {
    return ["!", e(t[1], n, i, o)];
  }
  var a = C(t);
  if (R(a)) {
    return j(a, n, i, o) || null;
  }
  var s;
  var l = [];
  var u = k(a);
  for (var d = 0; d < a.length; d++) {
    if (M(a[d])) {
      if (s = e(a[d], n, i, o)) {
        if (d) {
          l.push(u);
        }
        l.push(s);
      }
    } else if (R(a[d]) && (s = j(a[d], n, i, o))) {
      if (l.length) {
        l.push(u);
      }
      l.push(s);
    }
  }
  if (l.length === 1) {
    l = l[0];
  }
  if (l.length) {
    return l;
  } else {
    return null;
  }
};
exports.getFilterOperations = D;
exports.getGroupCriteria = C;
exports.getGroupMenuItem = function (e, t) {
  var n = k(e);
  return t.filter(function (e) {
    return e.value === n;
  })[0];
};
exports.getGroupValue = k;
exports.getItems = Z;
exports.getMatchedConditions = function (e, t) {
  if (e === null || e.length === 0) {
    return [];
  }
  if (R(e)) {
    if (ee(e, t)) {
      return [e];
    } else {
      return [];
    }
  }
  if (k(e) !== "and") {
    return [];
  }
  return e.filter(function (e) {
    return R(e) && ee(e, t);
  });
};
exports.getMergedOperations = function (e, t, n) {
  var i = (0, c.extend)(true, [], e);
  var o = -1;
  i.some(function (e, t) {
    if (e.name === "between") {
      o = t;
      return true;
    }
  });
  if (o !== -1) {
    i[o] = (0, c.extend)((0, f.getConfig)(t, n), i[o]);
  } else {
    i.unshift((0, f.getConfig)(t, n));
  }
  return i;
};
exports.getNormalizedFields = function (e) {
  return e.reduce(function (e, t) {
    if ((0, r.isDefined)(t.dataField)) {
      var n = {};
      for (var i in t) {
        if (t[i] && x.indexOf(i) > -1) {
          n[i] = t[i];
        }
      }
      n.defaultCalculateFilterExpression = u.default.defaultCalculateFilterExpression;
      if (!(0, r.isDefined)(n.dataType)) {
        n.dataType = "string";
      }
      if (!(0, r.isDefined)(n.trueText)) {
        n.trueText = p.default.format("dxDataGrid-trueText");
      }
      if (!(0, r.isDefined)(n.falseText)) {
        n.falseText = p.default.format("dxDataGrid-falseText");
      }
      e.push(n);
    }
    return e;
  }, []);
};
exports.getNormalizedFilter = function e(t) {
  var n;
  var i = C(t);
  if (i.length === 0) {
    return null;
  }
  var o = [];
  for (n = 0; n < i.length; n++) {
    if (M(i[n])) {
      var a = e(i[n]);
      if (a) {
        i[n] = a;
      } else {
        o.push(i[n]);
      }
    } else if (R(i[n])) {
      if (!J(i[n])) {
        o.push(i[n]);
      }
    }
  }
  for (n = 0; n < o.length; n++) {
    O(i, o[n]);
  }
  if (i.length === 1) {
    return null;
  }
  i.splice(i.length - 1, 1);
  if (i.length === 1) {
    t = function (e, t) {
      if (w(e)) {
        e[1] = t;
      } else {
        e = t;
      }
      return e;
    }(t, i[0]);
  }
  if (t.length === 0) {
    return null;
  }
  return t;
};
exports.getOperationFromAvailable = function (e, t) {
  for (var n = 0; n < t.length; n++) {
    if (t[n].value === e) {
      return t[n];
    }
  }
  throw new l.default.Error("E1048", e);
};
exports.getOperationValue = function (e) {
  var t;
  t = e[2] === null ? e[1] === "=" ? "isblank" : "isnotblank" : e[1];
  return t;
};
exports.isCondition = R;
exports.isEmptyGroup = function (e) {
  var t = C(e);
  if (R(t)) {
    return false;
  }
  return !t.some(function (e) {
    return R(e);
  });
};
exports.isGroup = M;
exports.isValidCondition = J;
exports.removeFieldConditionsFromFilter = function (e, t) {
  if (!e || e.length === 0) {
    return null;
  }
  if (R(e)) {
    if (ee(e, t)) {
      return null;
    } else {
      return e;
    }
  } else {
    return te(e, [t], false);
  }
};
exports.removeItem = O;
exports.renderValueText = undefined;
exports.setGroupValue = function (e, t) {
  (function (e, t) {
    if (!function (e) {
      return e.indexOf("!") !== -1;
    }(t)) {
      if (w(e)) {
        (function (e) {
          var t = C(e);
          e.length = 0;
          [].push.apply(e, t);
        })(e);
      }
    } else if (!w(e)) {
      (function (e) {
        var t = e.slice(0);
        e.length = 0;
        e.push("!", t);
      })(e);
    }
  })(e, t);
  var n;
  var i = C(e);
  t = function (e) {
    if (e.indexOf("!") === -1) {
      return e;
    } else {
      return e.substring(1);
    }
  }(t);
  (function (e, t) {
    for (n = 0; n < e.length; n++) {
      if (!Array.isArray(e[n])) {
        e[n] = t;
      }
    }
  })(i, t);
  return e;
};
exports.syncFilters = function (e, t) {
  if (e === null || e.length === 0) {
    return t;
  }
  if (R(e)) {
    if (ee(e, t[0])) {
      return t;
    } else {
      return [e, "and", t];
    }
  }
  if (k(e) !== "and") {
    return [t, "and", e];
  }
  return te(e, t, true);
};
exports.updateConditionByOperation = Q;
var i = _(require("./68374.js"));
var o = require("./62754.js");
var a = require("./18438.js");
var r = require("./35922.js");
var s = require("./47617.js");
var l = _(require("./96688.js"));
var u = _(require("./18740.js"));
var d = _(require("./30343.js"));
var c = require("./13306.js");
var h = require("./78008.js");
var f = require("./25460.js");
var p = _(require("./28109.js"));
var g = require("./85273.js");
var m = _(require("./8859.js"));
function _(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
var v = {
  number: ["=", "<>", "<", ">", "<=", ">=", "isblank", "isnotblank"],
  string: ["contains", "notcontains", "startswith", "endswith", "=", "<>", "isblank", "isnotblank"],
  date: ["=", "<>", "<", ">", "<=", ">=", "isblank", "isnotblank"],
  datetime: ["=", "<>", "<", ">", "<=", ">=", "isblank", "isnotblank"],
  boolean: ["=", "<>", "isblank", "isnotblank"],
  object: ["isblank", "isnotblank"]
};
var y = {
  date: "shortDate",
  datetime: "shortDateShortTime"
};
var b = ["=", "<>", "isblank", "isnotblank"];
var x = ["caption", "customizeText", "dataField", "dataType", "editorTemplate", "falseText", "editorOptions", "filterOperations", "format", "lookup", "trueText", "calculateFilterExpression", "name"];
function w(e) {
  return e && e.length > 1 && e[0] === "!" && !R(e);
}
function C(e) {
  if (w(e)) {
    return e[1];
  } else {
    return e;
  }
}
function S(e) {
  if (R(e)) {
    return "and";
  }
  var t = "";
  for (var n = 0; n < e.length; n++) {
    var i = e[n];
    if (!Array.isArray(i)) {
      if (t && t !== i) {
        throw new a.errors.Error("E4019");
      }
      if (i !== "!") {
        t = i;
      }
    }
  }
  return t;
}
function k(e) {
  var t = C(e);
  var n = S(t);
  n ||= "and";
  if (t !== e) {
    n = "!" + n;
  }
  return n;
}
function D(e) {
  var t;
  t = e.filterOperations;
  var n = Array.isArray(t) && t.length ? e.filterOperations : function (e) {
    return e.lookup && b || v[e.dataType || "string"];
  }(e);
  return (0, c.extend)([], n);
}
function I(e, t) {
  var n = m.default.getNameByFilterOperation(e);
  if (t && t[n]) {
    return t[n];
  } else {
    return n;
  }
}
function T(e, t) {
  var n = e.filter(function (e) {
    return e.name === t;
  });
  if (n.length) {
    return n[0];
  } else {
    return null;
  }
}
function E(e) {
  return e.defaultFilterOperation || D(e)[0];
}
function O(e, t) {
  var n = C(e);
  var i = n.indexOf(t);
  n.splice(i, 1);
  if (n.length !== 1) {
    n.splice(i, 1);
  }
  return e;
}
function A(e) {
  var t = V(e);
  var n = t ? F(e) : e;
  if (t) {
    return ["!", [n]];
  } else {
    return [n];
  }
}
function P(e, t) {
  for (var n = 0; n < t.length; n++) {
    if (t[n].name === e) {
      return t[n];
    }
    if (t[n].dataField.toLowerCase() === e.toLowerCase()) {
      return t[n];
    }
  }
  var i = Z(t, true).filter(function (t) {
    return t.dataField.toLowerCase() === e.toLowerCase();
  });
  if (i.length > 0) {
    return i[0];
  }
  throw new l.default.Error("E1047", e);
}
function M(e) {
  return !!Array.isArray(e) && (e.length < 2 || Array.isArray(e[0]) || Array.isArray(e[1]));
}
function R(e) {
  return !!Array.isArray(e) && e.length > 1 && !Array.isArray(e[0]) && !Array.isArray(e[1]);
}
function B(e, t, n) {
  n = n || "and";
  var i = S(e).toLowerCase() || n;
  var o = [];
  for (var a = 0; a < e.length; a++) {
    if (M(e[a])) {
      o.push(z(e[a], t, n));
      o = N(o, i);
    } else if (R(e[a])) {
      o.push(L(e[a], t));
      o = N(o, i);
    }
  }
  if (o.length === 0) {
    o = N(o, i);
  }
  return o;
}
function L(e, t) {
  if (!function (e, t) {
    var n = T(t, e[1]);
    return n && n.name === e[1];
  }(e, t)) {
    if (e.length < 3) {
      e[2] = e[1];
      e[1] = "=";
    }
  }
  return e;
}
function V(e) {
  return e.indexOf("not") !== -1;
}
function F(e) {
  return e.substring(3).toLowerCase();
}
function H(e, t) {
  var n = V(t);
  t = n ? F(t) : t;
  if (n) {
    return ["!", e, t];
  } else {
    return [e, t];
  }
}
function N(e, t) {
  var n = V(t);
  t = n ? F(t) : t;
  e.push(t);
  var i = e;
  if (n) {
    i = ["!", i];
  }
  return i;
}
function z(e, t, n) {
  n = n || "and";
  if (e) {
    if (R(e = (0, c.extend)(true, [], e))) {
      return H(L(e, t), n);
    } else if (w(e)) {
      return ["!", R(e[1]) ? H(L(e[1], t), n) : w(e[1]) ? H(z(e[1], t), n) : B(e[1], t, n)];
    } else {
      return B(e, t, n);
    }
  } else {
    return A(n);
  }
}
function j(e, t, n, i) {
  var o = P(e[0], t);
  var a = L(e, n);
  var r = n.length && T(n, a[1]);
  if (r && r.calculateFilterExpression) {
    return r.calculateFilterExpression.apply(r, [a[2], o, t]);
  } else if (o.createFilterExpression) {
    return o.createFilterExpression.apply(o, [a[2], a[1], i]);
  } else if (o.calculateFilterExpression) {
    return o.calculateFilterExpression.apply(o, [a[2], a[1], i]);
  } else {
    return o.defaultCalculateFilterExpression.apply(o, [a[2], a[1], i]);
  }
}
function W(e, t, n, i, o) {
  var a;
  a = t === true ? e.trueText || p.default.format("dxDataGrid-trueText") : t === false ? e.falseText || p.default.format("dxDataGrid-falseText") : function (e, t) {
    var n = e.format || y[e.dataType];
    return d.default.format(t, n);
  }(e, t);
  if (e.customizeText) {
    a = e.customizeText.call(e, {
      value: t,
      valueText: a,
      target: i
    });
  }
  if (n && n.customizeText) {
    a = n.customizeText.call(n, {
      value: t,
      valueText: a,
      field: e,
      target: i
    }, o);
  }
  return a;
}
function G(e, t, n, i) {
  var o = {
    values: t
  };
  return t.map(function (t) {
    return W(e, t, n, i, o);
  });
}
function q(e) {
  return e === "" || e === null;
}
function $(e, t) {
  return e.some(function (e) {
    return e.dataField === t;
  });
}
function U(e, t, n) {
  var i = n.dataField;
  if (Y(i)) {
    n.parentId = X(i);
    if (!$(t, n.parentId) && !$(e, n.parentId)) {
      U(e, t, {
        id: n.parentId,
        dataType: "object",
        dataField: n.parentId,
        caption: K(n.parentId, true),
        filterOperations: ["isblank", "isnotblank"]
      });
    }
  }
  t.push(n);
}
function K(e, t) {
  var n = "";
  if (t) {
    e = e.substring(e.lastIndexOf(".") + 1);
  } else if (Y(e)) {
    e.split(".").forEach(function (e, t, i) {
      n += (0, h.captionize)(e);
      if (t !== i.length - 1) {
        n += ".";
      }
    });
    return n;
  }
  return (0, h.captionize)(e);
}
function Z(e, t) {
  var n = [];
  for (var i = 0; i < e.length; i++) {
    var o = (0, c.extend)(true, {
      caption: K(e[i].dataField, t)
    }, e[i]);
    o.id = o.name || o.dataField;
    if (t) {
      U(e, n, o);
    } else {
      n.push(o);
    }
  }
  return n;
}
function Y(e) {
  return e.lastIndexOf(".") !== -1;
}
function X(e) {
  return e.substring(0, e.lastIndexOf("."));
}
function Q(e, t, n) {
  var i = T(n, t);
  if (i) {
    if (i.hasValue === false) {
      e[1] = t;
      e.length = 2;
    } else {
      e[1] = t;
      e[2] = "";
    }
    return e;
  } else {
    if (t === "isblank") {
      e[1] = "=";
      e[2] = null;
    } else if (t === "isnotblank") {
      e[1] = "<>";
      e[2] = null;
    } else {
      if ((i = T(n, e[1])) || e.length === 2 || e[2] === null) {
        e[2] = "";
      }
      e[1] = t;
    }
    return e;
  }
}
function J(e) {
  return e[2] !== "";
}
function ee(e, t) {
  return e[0] === t;
}
function te(e, t, n) {
  var i = [];
  e.forEach(function (e) {
    if (R(e)) {
      if (ee(e, t[0])) {
        if (n) {
          i.push(t);
          n = false;
        } else {
          i.splice(i.length - 1, 1);
        }
      } else {
        i.push(e);
      }
    } else if (i.length || M(e)) {
      i.push(e);
    }
  });
  if (i.length === 0) {
    return null;
  } else {
    if (n) {
      i.push("and");
      i.push(t);
    }
    if (i.length === 1) {
      return i[0];
    } else {
      return i;
    }
  }
}
exports.renderValueText = function (e, t, n) {
  if (Array.isArray(t)) {
    var o = t.length - 1;
    e.empty();
    t.forEach(function (t, a) {
      (0, i.default)("<span>").addClass("dx-filterbuilder-text-part").text(t).appendTo(e);
      if (a !== o) {
        (0, i.default)("<span>").addClass("dx-filterbuilder-text-separator").text(n && n.valueSeparator ? n.valueSeparator : "|").addClass("dx-filterbuilder-text-separator-empty").appendTo(e);
      }
    });
  } else if (t) {
    e.text(t);
  } else {
    e.text(p.default.format("dxFilterBuilder-enterValueText"));
  }
};