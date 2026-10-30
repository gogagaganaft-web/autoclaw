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
exports.viewFunction = exports.PageSizeSelector = undefined;
var o;
var a = require("./55285.js");
var r = require("./44105.js");
var s = require("./70415.js");
var l = require("./86857.js");
var u = require("./96529.js");
var d = (o = require("./28109.js")) && o.__esModule ? o : {
  default: o
};
var c = require("./39853.js");
var h = ["isLargeDisplayMode", "pageSize", "pageSizeChange", "pageSizes", "rootElementRef"];
function f(e, t) {
  if (e == null) {
    return {};
  }
  var n;
  var i;
  var o = function (e, t) {
    if (e == null) {
      return {};
    }
    var n;
    var i;
    var o = {};
    var a = Object.keys(e);
    for (i = 0; i < a.length; i++) {
      n = a[i];
      if (!(t.indexOf(n) >= 0)) {
        o[n] = e[n];
      }
    }
    return o;
  }(e, t);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (i = 0; i < a.length; i++) {
      n = a[i];
      if (!(t.indexOf(n) >= 0)) {
        if (Object.prototype.propertyIsEnumerable.call(e, n)) {
          o[n] = e[n];
        }
      }
    }
  }
  return o;
}
function p() {
  return (p = Object.assign ? Object.assign.bind() : function (e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var i in n) {
        if (Object.prototype.hasOwnProperty.call(n, i)) {
          e[i] = n[i];
        }
      }
    }
    return e;
  }).apply(this, arguments);
}
function g(e, t) {
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
function m(e, t) {
  return (m = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (e, t) {
    e.__proto__ = t;
    return e;
  })(e, t);
}
function _(e) {
  var t = e.htmlRef;
  var n = e.normalizedPageSizes;
  var i = e.props;
  var o = i.isLargeDisplayMode;
  var r = i.pageSize;
  var u = i.pageSizeChange;
  return (0, a.createVNode)(1, "div", c.PAGER_PAGE_SIZES_CLASS, [o && (0, a.createComponentVNode)(2, l.PageSizeLarge, {
    pageSizes: n,
    pageSize: r,
    pageSizeChange: u
  }), !o && (0, a.createComponentVNode)(2, s.PageSizeSmall, {
    parentRef: t,
    pageSizes: n,
    pageSize: r,
    pageSizeChange: u
  })], 0, null, null, t);
}
exports.viewFunction = _;
var v = true;
var y = Object.defineProperties({}, {
  pageSize: {
    get: function () {
      return u.InternalPagerProps.pageSize;
    },
    configurable: true,
    enumerable: true
  },
  pageSizes: {
    get: function () {
      return u.InternalPagerProps.pageSizes;
    },
    configurable: true,
    enumerable: true
  },
  isLargeDisplayMode: {
    get: function () {
      return v;
    },
    configurable: true,
    enumerable: true
  }
});
var b = function (e) {
  var t;
  var n;
  function i(t) {
    var n;
    (n = e.call(this, t) || this).state = {};
    n.htmlRef = (0, a.createRef)();
    n.__getterCache = {};
    n.setRootElementRef = n.setRootElementRef.bind(function (e) {
      if (e === undefined) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      }
      return e;
    }(n));
    return n;
  }
  n = e;
  (t = i).prototype = Object.create(n.prototype);
  t.prototype.constructor = t;
  m(t, n);
  var o;
  var s;
  var l;
  var u = i.prototype;
  u.createEffects = function () {
    return [new r.InfernoEffect(this.setRootElementRef, [])];
  };
  u.setRootElementRef = function () {
    var e = this.props.rootElementRef;
    if (e) {
      e.current = this.htmlRef.current;
    }
  };
  u.componentWillUpdate = function (t, n, i) {
    e.prototype.componentWillUpdate.call(this);
    if (this.props.pageSizes !== t.pageSizes) {
      this.__getterCache.normalizedPageSizes = undefined;
    }
  };
  u.render = function () {
    var e = this.props;
    return _({
      props: p({}, e),
      htmlRef: this.htmlRef,
      normalizedPageSizes: this.normalizedPageSizes,
      restAttributes: this.restAttributes
    });
  };
  o = i;
  if (s = [{
    key: "normalizedPageSizes",
    get: function () {
      var e = this;
      if (this.__getterCache.normalizedPageSizes !== undefined) {
        return this.__getterCache.normalizedPageSizes;
      } else {
        return this.__getterCache.normalizedPageSizes = e.props.pageSizes.map(function (e) {
          if (e === "all" || e === 0) {
            return {
              text: d.default.getFormatter("dxPager-pageSizesAllText")(),
              value: 0
            };
          } else {
            return {
              text: String(e),
              value: e
            };
          }
        });
      }
    }
  }, {
    key: "restAttributes",
    get: function () {
      var e = this.props;
      e.isLargeDisplayMode;
      e.pageSize;
      e.pageSizeChange;
      e.pageSizes;
      e.rootElementRef;
      return f(e, h);
    }
  }]) {
    g(o.prototype, s);
  }
  if (l) {
    g(o, l);
  }
  Object.defineProperty(o, "prototype", {
    writable: false
  });
  return i;
}(r.InfernoComponent);
exports.PageSizeSelector = b;
b.defaultProps = y;