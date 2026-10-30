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
var r = require("./97827.js");
var s = require("./59968.js");
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
  r.prototype.getProps = function () {
    var t = e.prototype.getProps.call(this);
    t.onKeyDown = this._wrapKeyDownHandler(t.onKeyDown);
    return t;
  };
  i = r;
  if (o = [{
    key: "_propsInfo",
    get: function () {
      return {
        twoWay: [["pageSize", "defaultPageSize", "pageSizeChange"], ["pageIndex", "defaultPageIndex", "pageIndexChange"]],
        allowNull: [],
        elements: [],
        templates: [],
        props: ["defaultPageSize", "pageSizeChange", "defaultPageIndex", "pageIndexChange", "gridCompatibility", "className", "showInfo", "infoText", "lightModeEnabled", "displayMode", "maxPagesCount", "pageCount", "pagesCountText", "visible", "hasKnownLastPage", "pagesNavigatorVisible", "showPageSizes", "pageSizes", "rtlEnabled", "showNavigationButtons", "totalCount", "label", "onKeyDown", "pageSize", "pageIndex"]
      };
    }
  }, {
    key: "_viewComponent",
    get: function () {
      return s.Pager;
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
}(r.GridPagerWrapper);
exports.default = d;
(0, a.default)("dxPager", d);
module.exports = exports.default;
module.exports.default = exports.default;