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
var o = l(require("./99393.js"));
var a = l(require("./10373.js"));
var r = require("./37518.js");
var s = require("./27728.js");
function l(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
function u(e, t) {
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
function d(e, t) {
  return (d = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (e, t) {
    e.__proto__ = t;
    return e;
  })(e, t);
}
var c = function (e) {
  var t;
  var n;
  function i() {
    return e.apply(this, arguments) || this;
  }
  n = e;
  (t = i).prototype = Object.create(n.prototype);
  t.prototype.constructor = t;
  d(t, n);
  var o;
  var a;
  var l;
  var c = i.prototype;
  c._getElementClass = function () {
    return "dx-scheduler-timeline-week";
  };
  c._getHeaderPanelCellWidth = function (e) {
    return (0, r.getBoundingRect)(e.children().first().get(0)).width;
  };
  c._needRenderWeekHeader = function () {
    return true;
  };
  c._incrementDate = function (e) {
    e.setDate(e.getDate() + 1);
  };
  o = i;
  if (a = [{
    key: "type",
    get: function () {
      return s.VIEWS.TIMELINE_WEEK;
    }
  }]) {
    u(o.prototype, a);
  }
  if (l) {
    u(o, l);
  }
  Object.defineProperty(o, "prototype", {
    writable: false
  });
  return i;
}(a.default);
exports.default = c;
(0, o.default)("dxSchedulerTimelineWeek", c);
module.exports = exports.default;
module.exports.default = exports.default;