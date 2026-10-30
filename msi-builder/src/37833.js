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
exports.default = undefined;
var o = s(require("./99393.js"));
var a = require("./27728.js");
var r = s(require("./10373.js"));
function s(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
function l(e, t) {
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
function u(e, t) {
  return (u = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (e, t) {
    e.__proto__ = t;
    return e;
  })(e, t);
}
var d = function (e) {
  var t;
  var n;
  function i() {
    return e.apply(this, arguments) || this;
  }
  n = e;
  (t = i).prototype = Object.create(n.prototype);
  t.prototype.constructor = t;
  u(t, n);
  var o;
  var r;
  var s;
  var d = i.prototype;
  d._getElementClass = function () {
    return "dx-scheduler-timeline-day";
  };
  d._needRenderWeekHeader = function () {
    return this._isWorkSpaceWithCount();
  };
  o = i;
  if (r = [{
    key: "type",
    get: function () {
      return a.VIEWS.TIMELINE_DAY;
    }
  }]) {
    l(o.prototype, r);
  }
  if (s) {
    l(o, s);
  }
  Object.defineProperty(o, "prototype", {
    writable: false
  });
  return i;
}(r.default);
(0, o.default)("dxSchedulerTimelineDay", d);
var c = d;
exports.default = c;
module.exports = exports.default;
module.exports.default = exports.default;