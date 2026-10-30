exports.normalizeOptions = exports.getParentName = exports.getNestedOptionValue = exports.getFieldName = exports.deviceMatch = exports.createDefaultOptionRules = exports.convertRulesToOptions = undefined;
var i;
var o = (i = require("./20530.js")) && i.__esModule ? i : {
  default: i
};
var a = require("./35922.js");
var r = require("./20576.js");
var s = require("./13306.js");
var l = require("./47617.js");
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
function d(e, t, n) {
  if ((t = function (e) {
    var t = function (e, t) {
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
    }(e, "string");
    if (u(t) === "symbol") {
      return t;
    } else {
      return String(t);
    }
  }(t)) in e) {
    Object.defineProperty(e, t, {
      value: n,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    e[t] = n;
  }
  return e;
}
var c = {};
exports.convertRulesToOptions = function (e) {
  var t = o.default.current();
  return e.reduce(function (e, n) {
    var i = n.device;
    var o = n.options;
    var r = i || {};
    if ((0, a.isFunction)(r) ? r(t) : h(t, r)) {
      (0, s.extend)(true, e, o);
    }
    return e;
  }, {});
};
exports.normalizeOptions = function (e, t) {
  if (typeof e != "string") {
    return e;
  } else {
    return d({}, e, t);
  }
};
function h(e, t) {
  return (0, a.isEmptyObject)(t) || (0, r.findBestMatches)(e, [t]).length > 0;
}
exports.deviceMatch = h;
exports.getFieldName = function (e) {
  return e.substr(e.lastIndexOf(".") + 1);
};
exports.getParentName = function (e) {
  return e.substr(0, e.lastIndexOf("."));
};
exports.getNestedOptionValue = function (e, t) {
  c[t] = c[t] || (0, l.compileGetter)(t);
  return c[t](e, {
    functionsAsIs: true
  });
};
exports.createDefaultOptionRules = function (e = []) {
  return e;
};