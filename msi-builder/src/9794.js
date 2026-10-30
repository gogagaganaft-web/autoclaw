function i(e) {
  return (i = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function (e) {
    return typeof e;
  } : function (e) {
    if (e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype) {
      return "symbol";
    } else {
      return typeof e;
    }
  })(e);
}
exports.ViewDataGeneratorWeek = undefined;
var o = require("./34279.js");
function a(e, t) {
  for (var n = 0; n < t.length; n++) {
    var o = t[n];
    o.enumerable = o.enumerable || false;
    o.configurable = true;
    if ("value" in o) {
      o.writable = true;
    }
    Object.defineProperty(e, (a = o.key, r = undefined, r = function (e, t) {
      if (i(e) !== "object" || e === null) {
        return e;
      }
      var n = e[Symbol.toPrimitive];
      if (n !== undefined) {
        var o = n.call(e, t || "default");
        if (i(o) !== "object") {
          return o;
        }
        throw new TypeError("@@toPrimitive must return a primitive value.");
      }
      return (t === "string" ? String : Number)(e);
    }(a, "string"), i(r) === "symbol" ? r : String(r)), o);
  }
  var a;
  var r;
}
function r(e, t) {
  return (r = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (e, t) {
    e.__proto__ = t;
    return e;
  })(e, t);
}
var s = function (e) {
  var t;
  var n;
  function i() {
    return e.apply(this, arguments) || this;
  }
  n = e;
  (t = i).prototype = Object.create(n.prototype);
  t.prototype.constructor = t;
  r(t, n);
  var s;
  var l;
  var u;
  var d = i.prototype;
  d._getIntervalDuration = function (e) {
    return (0, o.getIntervalDuration)(e);
  };
  d._calculateStartViewDate = function (e) {
    return (0, o.calculateStartViewDate)(e.currentDate, e.startDayHour, e.startDate, this._getIntervalDuration(e.intervalCount), this.getFirstDayOfWeek(e.firstDayOfWeek));
  };
  s = i;
  if (l = [{
    key: "daysInInterval",
    get: function () {
      return 7;
    }
  }]) {
    a(s.prototype, l);
  }
  if (u) {
    a(s, u);
  }
  Object.defineProperty(s, "prototype", {
    writable: false
  });
  return i;
}(require("./18177.js").ViewDataGenerator);
exports.ViewDataGeneratorWeek = s;