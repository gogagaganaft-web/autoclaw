exports.default = undefined;
var i = require("./20576.js");
var o = require("./13306.js");
var a = l(require("./69434.js"));
var r = require("./35922.js");
var s = l(require("./97601.js"));
function l(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
function u(e) {
  return (u = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function (e) {
    return typeof e;
  } : function (e) {
    if (e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype) {
      return "symbol";
    } else {
      return typeof e;
    }
  })(e);
}
function d(e, t) {
  return function (e) {
    if (Array.isArray(e)) {
      return e;
    }
  }(e) || function (e, t) {
    var n = e == null ? null : typeof Symbol != "undefined" && e[Symbol.iterator] || e["@@iterator"];
    if (n != null) {
      var i;
      var o;
      var a;
      var r;
      var s = [];
      var l = true;
      var u = false;
      try {
        a = (n = n.call(e)).next;
        if (t === 0) {
          if (Object(n) !== n) {
            return;
          }
          l = false;
        } else {
          for (; !(l = (i = a.call(n)).done) && (s.push(i.value), s.length !== t); l = true);
        }
      } catch (e) {
        u = true;
        o = e;
      } finally {
        try {
          if (!l && n.return != null && (r = n.return(), Object(r) !== r)) {
            return;
          }
        } finally {
          if (u) {
            throw o;
          }
        }
      }
      return s;
    }
  }(e, t) || function (e, t) {
    if (!e) {
      return;
    }
    if (typeof e == "string") {
      return c(e, t);
    }
    var n = Object.prototype.toString.call(e).slice(8, -1);
    if (n === "Object" && e.constructor) {
      n = e.constructor.name;
    }
    if (n === "Map" || n === "Set") {
      return Array.from(e);
    }
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) {
      return c(e, t);
    }
  }(e, t) || function () {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }();
}
function c(e, t) {
  if (t == null || t > e.length) {
    t = e.length;
  }
  for (var n = 0, i = new Array(t); n < t; n++) {
    i[n] = e[n];
  }
  return i;
}
function h(e, t) {
  for (var n = 0; n < t.length; n++) {
    var i = t[n];
    i.enumerable = i.enumerable || false;
    i.configurable = true;
    if ("value" in i) {
      i.writable = true;
    }
    Object.defineProperty(e, (o = i.key, a = undefined, a = function (e, t) {
      if (u(e) !== "object" || e === null) {
        return e;
      }
      var n = e[Symbol.toPrimitive];
      if (n !== undefined) {
        var i = n.call(e, t || "default");
        if (u(i) !== "object") {
          return i;
        }
        throw new TypeError("@@toPrimitive must return a primitive value.");
      }
      return (t === "string" ? String : Number)(e);
    }(o, "string"), u(a) === "symbol" ? a : String(a)), i);
  }
  var o;
  var a;
}
var f = 0;
var p = 1;
var g = function () {
  function e(e) {
    this.options = e;
  }
  var t;
  var n;
  var l;
  var u = e.prototype;
  u.makeDateFilter = function (e, t) {
    var n = this.dataAccessors.expr;
    var i = n.endDateExpr;
    var o = n.recurrenceRuleExpr;
    var a = n.startDateExpr;
    var r = [[[i, ">=", e], [a, "<", t]], "or", [o, "startswith", "freq"], "or", [[i, e], [a, e]]];
    if (!o) {
      r.splice(1, 2);
    }
    return r;
  };
  u.combineFilters = function (e, t) {
    var n = [];
    if (e) {
      n.push(e);
    }
    if (t) {
      n.push(t);
    }
    return this.serializeRemoteFilter(n);
  };
  u.serializeRemoteFilter = function (e) {
    if (!Array.isArray(e)) {
      return e;
    }
    var t = this.dataAccessors.expr;
    var n = t.endDateExpr;
    var i = t.startDateExpr;
    var s = (0, o.extend)([], e);
    if ((0, r.isString)(s[0]) && this.forceIsoDateParsing && s.length > 1 && (s[0] === i || s[0] === n)) {
      var l = s[s.length - 1];
      s[s.length - 1] = a.default.serializeDate(new Date(l), this.dateSerializationFormat);
    }
    for (var u = 0; u < s.length; u += 1) {
      s[u] = this.serializeRemoteFilter(s[u]);
    }
    return s;
  };
  u.getUserFilter = function (e) {
    if (this.dataSourceFilter && !(0, i.equalByValue)(this.dataSourceFilter, e)) {
      if (this.dataSourceFilter.length > 0 && (0, i.equalByValue)(this.dataSourceFilter[f], e)) {
        return this.dataSourceFilter[p];
      } else {
        return this.dataSourceFilter;
      }
    }
  };
  u.combine = function (e, t) {
    var n = d((0, s.default)(e, t), 2);
    var i = n[0];
    var o = n[1];
    var a = this.makeDateFilter(i, o);
    var r = this.getUserFilter(a);
    return this.combineFilters(a, r);
  };
  t = e;
  if (n = [{
    key: "dataAccessors",
    get: function () {
      return this.options.dataAccessors;
    }
  }, {
    key: "dataSourceFilter",
    get: function () {
      return this.options.dataSourceFilter;
    }
  }, {
    key: "dateSerializationFormat",
    get: function () {
      return this.options.dateSerializationFormat;
    }
  }, {
    key: "forceIsoDateParsing",
    get: function () {
      return !(0, r.isDefined)(this.options.forceIsoDateParsing) || this.options.forceIsoDateParsing;
    }
  }]) {
    h(t.prototype, n);
  }
  if (l) {
    h(t, l);
  }
  Object.defineProperty(t, "prototype", {
    writable: false
  });
  return e;
}();
function m(e) {
  return new g(e).combine(e.min, e.max);
}
exports.default = m;
module.exports = exports.default;
module.exports.default = exports.default;