exports.ScrollDirection = undefined;
var i = require("./23842.js");
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
  function e(e) {
    this.DIRECTION_HORIZONTAL = "horizontal";
    this.DIRECTION_VERTICAL = "vertical";
    this.DIRECTION_BOTH = "both";
    this.direction = e ?? i.DIRECTION_VERTICAL;
  }
  var t;
  var n;
  var o;
  t = e;
  if (n = [{
    key: "isHorizontal",
    get: function () {
      return this.direction === i.DIRECTION_HORIZONTAL || this.direction === i.DIRECTION_BOTH;
    }
  }, {
    key: "isVertical",
    get: function () {
      return this.direction === i.DIRECTION_VERTICAL || this.direction === i.DIRECTION_BOTH;
    }
  }, {
    key: "isBoth",
    get: function () {
      return this.direction === i.DIRECTION_BOTH;
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
exports.ScrollDirection = r;