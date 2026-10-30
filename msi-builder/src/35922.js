function n(e) {
  return (n = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function (e) {
    return typeof e;
  } : function (e) {
    if (e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype) {
      return "symbol";
    } else {
      return typeof e;
    }
  })(e);
}
exports.type = exports.isWindow = exports.isString = exports.isRenderer = exports.isPromise = exports.isPrimitive = exports.isPlainObject = exports.isObject = exports.isNumeric = exports.isFunction = exports.isExponential = exports.isEvent = exports.isEmptyObject = exports.isDefined = exports.isDeferred = exports.isDate = exports.isBoolean = undefined;
var i = {
  "[object Array]": "array",
  "[object Date]": "date",
  "[object Object]": "object",
  "[object String]": "string"
};
function o(e) {
  if (e === null) {
    return "null";
  }
  var t = Object.prototype.toString.call(e);
  if (n(e) === "object") {
    return i[t] || "object";
  } else {
    return n(e);
  }
}
exports.type = o;
exports.isBoolean = function (e) {
  return typeof e == "boolean";
};
exports.isExponential = function (e) {
  return r(e) && e.toString().indexOf("e") !== -1;
};
exports.isDate = function (e) {
  return o(e) === "date";
};
exports.isDefined = function (e) {
  return e != null;
};
function a(e) {
  return typeof e == "function";
}
exports.isFunction = a;
exports.isString = function (e) {
  return typeof e == "string";
};
function r(e) {
  return typeof e == "number" && isFinite(e) || !isNaN(e - parseFloat(e));
}
exports.isNumeric = r;
exports.isObject = function (e) {
  return o(e) === "object";
};
exports.isEmptyObject = function (e) {
  var t;
  for (t in e) {
    return false;
  }
  return true;
};
exports.isPlainObject = function (e) {
  if (!e || o(e) !== "object") {
    return false;
  }
  var t = Object.getPrototypeOf(e);
  if (!t) {
    return true;
  }
  var n = Object.hasOwnProperty.call(t, "constructor") && t.constructor;
  return typeof n == "function" && Object.toString.call(n) === Object.toString.call(Object);
};
exports.isPrimitive = function (e) {
  return ["object", "array", "function"].indexOf(o(e)) === -1;
};
exports.isWindow = function (e) {
  return e != null && e === e.window;
};
exports.isRenderer = function (e) {
  return !!e && (!!e.jquery || !!e.dxRenderer);
};
exports.isPromise = function (e) {
  return !!e && a(e.then);
};
exports.isDeferred = function (e) {
  return !!e && a(e.done) && a(e.fail);
};
exports.isEvent = function (e) {
  return !!e && !!e.preventDefault;
};