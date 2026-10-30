var i;
function o(e) {
  return (o = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function (e) {
    return typeof e;
  } : function (e) {
    if (e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype) {
      return "symbol";
    } else {
      return typeof e;
    }
  })(e);
}
function a(e, t) {
  for (var n = 0; n < t.length; n++) {
    var i = t[n];
    i.enumerable = i.enumerable || false;
    i.configurable = true;
    if ("value" in i) {
      i.writable = true;
    }
    Object.defineProperty(e, (a = i.key, r = undefined, r = function (e, t) {
      if (o(e) !== "object" || e === null) {
        return e;
      }
      var n = e[Symbol.toPrimitive];
      if (n !== undefined) {
        var i = n.call(e, t || "default");
        if (o(i) !== "object") {
          return i;
        }
        throw new TypeError("@@toPrimitive must return a primitive value.");
      }
      return (t === "string" ? String : Number)(e);
    }(a, "string"), o(r) === "symbol" ? r : String(r)), i);
  }
  var a;
  var r;
}
exports.default = undefined;
var r = ((i = require("./91198.js")) && i.__esModule ? i : {
  default: i
}).default.dateToMilliseconds;
var s = function () {
  function e(e) {
    this._source = new Date(e.getTime ? e.getTime() : e);
  }
  var t;
  var n;
  var i;
  var o = e.prototype;
  o.result = function () {
    return this._source;
  };
  o.getTimezoneOffset = function (e = undefined) {
    var t = this._source.getTimezoneOffset();
    if (e === "minute") {
      return t * r("minute");
    } else {
      return t;
    }
  };
  o.getTime = function () {
    return this._source.getTime();
  };
  o.setTime = function (e) {
    this._source.setTime(e);
    return this;
  };
  o.addTime = function (e) {
    this._source.setTime(this._source.getTime() + e);
    return this;
  };
  o.setMinutes = function (e) {
    this._source.setMinutes(e);
    return this;
  };
  o.addMinutes = function (e) {
    this._source.setMinutes(this._source.getMinutes() + e);
    return this;
  };
  o.subtractMinutes = function (e) {
    this._source.setMinutes(this._source.getMinutes() - e);
    return this;
  };
  t = e;
  if (n = [{
    key: "source",
    get: function () {
      return this._source;
    }
  }]) {
    a(t.prototype, n);
  }
  if (i) {
    a(t, i);
  }
  Object.defineProperty(t, "prototype", {
    writable: false
  });
  return e;
}();
function l(e) {
  return new s(e);
}
exports.default = l;
module.exports = exports.default;
module.exports.default = exports.default;