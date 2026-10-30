exports.Cache = undefined;
var i = require("./35922.js");
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
var r = function () {
  function e() {
    this._cache = new Map();
  }
  var t;
  var n;
  var o;
  var r = e.prototype;
  r.clear = function () {
    this._cache.clear();
  };
  r.get = function (e, t) {
    if (!this._cache.has(e) && t) {
      this.set(e, t());
    }
    return this._cache.get(e);
  };
  r.set = function (e, t) {
    if ((0, i.isDefined)(t)) {
      this._cache.set(e, t);
    }
  };
  t = e;
  if (n = [{
    key: "size",
    get: function () {
      return this._cache.size;
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
exports.Cache = r;