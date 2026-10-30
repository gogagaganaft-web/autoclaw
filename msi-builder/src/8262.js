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
var o;
var a = (o = require("./99393.js")) && o.__esModule ? o : {
  default: o
};
var r = require("./86214.js");
var s = require("./377.js");
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
  var i;
  var o;
  var a;
  function r() {
    return e.apply(this, arguments) || this;
  }
  n = e;
  (t = r).prototype = Object.create(n.prototype);
  t.prototype.constructor = t;
  u(t, n);
  i = r;
  if (o = [{
    key: "_propsInfo",
    get: function () {
      return {
        twoWay: [],
        allowNull: [],
        elements: [],
        templates: ["dateCellTemplate", "timeCellTemplate", "dateHeaderTemplate", "resourceCellTemplate"],
        props: ["dateHeaderData", "isRenderDateHeader", "dateCellTemplate", "timeCellTemplate", "dateHeaderTemplate", "groups", "groupOrientation", "groupPanelData", "groupByDate", "height", "className", "resourceCellTemplate"]
      };
    }
  }, {
    key: "_viewComponent",
    get: function () {
      return s.TimelineHeaderPanelLayout;
    }
  }]) {
    l(i.prototype, o);
  }
  if (a) {
    l(i, a);
  }
  Object.defineProperty(i, "prototype", {
    writable: false
  });
  return r;
}(r.HeaderPanel);
exports.default = d;
(0, a.default)("dxTimelineHeaderPanelLayout", d);
module.exports = exports.default;
module.exports.default = exports.default;