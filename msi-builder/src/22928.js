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
var a = require("./83866.js");
var r = l(require("./4453.js"));
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
  var i;
  var o;
  var r;
  function l() {
    var t;
    for (var n = arguments.length, i = new Array(n), o = 0; o < n; o++) {
      i[o] = arguments[o];
    }
    (t = e.call.apply(e, [this].concat(i)) || this)._getWeekendsCount = a.getWeekendsCount;
    return t;
  }
  n = e;
  (t = l).prototype = Object.create(n.prototype);
  t.prototype.constructor = t;
  d(t, n);
  l.prototype._getElementClass = function () {
    return "dx-scheduler-work-space-work-week";
  };
  i = l;
  if (o = [{
    key: "type",
    get: function () {
      return s.VIEWS.WORK_WEEK;
    }
  }]) {
    u(i.prototype, o);
  }
  if (r) {
    u(i, r);
  }
  Object.defineProperty(i, "prototype", {
    writable: false
  });
  return l;
}(r.default);
(0, o.default)("dxSchedulerWorkSpaceWorkWeek", c);
var h = c;
exports.default = h;
module.exports = exports.default;
module.exports.default = exports.default;