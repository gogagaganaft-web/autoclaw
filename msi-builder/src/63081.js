exports.default = undefined;
var i = require("./77869.js");
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
require("./54263.js");
var r = function () {
  function e(e) {
    e = e || {};
    this._url = String(e.url).replace(/\/+$/, "");
    this._beforeSend = e.beforeSend;
    this._jsonp = e.jsonp;
    this._version = e.version || 2;
    this._withCredentials = e.withCredentials;
    this._deserializeDates = e.deserializeDates;
    this._filterToLower = e.filterToLower;
  }
  var t;
  var n;
  var o;
  e.prototype.sendRequest = function (e, t, n, o) {
    return (0, i.sendRequest)(this.version, {
      url: e,
      method: t,
      params: n || {},
      payload: o
    }, {
      beforeSend: this._beforeSend,
      jsonp: this._jsonp,
      withCredentials: this._withCredentials,
      deserializeDates: this._deserializeDates
    });
  };
  t = e;
  if (n = [{
    key: "version",
    get: function () {
      return this._version;
    }
  }, {
    key: "beforeSend",
    get: function () {
      return this._beforeSend;
    }
  }, {
    key: "url",
    get: function () {
      return this._url;
    }
  }, {
    key: "jsonp",
    get: function () {
      return this._jsonp;
    }
  }, {
    key: "filterToLower",
    get: function () {
      return this._filterToLower;
    }
  }]) {
    a(t.prototype, n);
  }
  if (o) {
    a(t, o);
  }
  Object.defineProperty(t, "prototype", {
    writable: false
  });
  return e;
}();
exports.default = r;
module.exports = exports.default;
module.exports.default = exports.default;