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
exports.viewFunction = exports.PageSizeLargeProps = exports.PageSizeLarge = undefined;
var o;
var a = require("./55285.js");
var r = require("./44105.js");
var s = require("./86237.js");
var l = require("./93961.js");
var u = require("./96529.js");
var d = require("./39853.js");
var c = (o = require("./28109.js")) && o.__esModule ? o : {
  default: o
};
var h = require("./68752.js");
var f = ["pageSize", "pageSizeChange", "pageSizes"];
function p(e, t) {
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
function g(e, t, n) {
  if ((t = v(t)) in e) {
    Object.defineProperty(e, t, {
      value: n,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    e[t] = n;
  }
  return e;
}
function m() {
  return (m = Object.assign ? Object.assign.bind() : function (e) {
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
function _(e, t) {
  for (var n = 0; n < t.length; n++) {
    var i = t[n];
    i.enumerable = i.enumerable || false;
    i.configurable = true;
    if ("value" in i) {
      i.writable = true;
    }
    Object.defineProperty(e, v(i.key), i);
  }
}
function v(e) {
  var t = function (e, t) {
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
  }(e, "string");
  if (i(t) === "symbol") {
    return t;
  } else {
    return String(t);
  }
}
function y(e, t) {
  return (y = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (e, t) {
    e.__proto__ = t;
    return e;
  })(e, t);
}
function b(e) {
  var t = e.pageSizesText;
  return (0, a.createFragment)(t.map(function (e) {
    var t = e.className;
    var n = e.click;
    var i = e.label;
    var o = e.text;
    return (0, a.createComponentVNode)(2, l.LightButton, {
      className: t,
      label: i,
      onClick: n,
      children: o
    }, o);
  }), 0);
}
exports.viewFunction = b;
exports.PageSizeLargeProps = {};
var x = Object.defineProperties({}, {
  pageSize: {
    get: function () {
      return u.InternalPagerProps.pageSize;
    },
    configurable: true,
    enumerable: true
  }
});
var w = function (e) {
  var t;
  var n;
  function i(t) {
    var n;
    (n = e.call(this, t) || this).state = {};
    n.__getterCache = {};
    n.onPageSizeChange = n.onPageSizeChange.bind(function (e) {
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
  y(t, n);
  var o;
  var a;
  var r;
  var l = i.prototype;
  l.onPageSizeChange = function (e) {
    var t = this;
    return function () {
      t.props.pageSizeChange(e);
      return t.props.pageSize;
    };
  };
  l.componentWillUpdate = function (e, t, n) {
    if (this.props.pageSize !== e.pageSize || this.props.pageSizes !== e.pageSizes || this.props.pageSizeChange !== e.pageSizeChange) {
      this.__getterCache.pageSizesText = undefined;
    }
  };
  l.render = function () {
    var e = this.props;
    return b({
      props: m({}, e),
      pageSizesText: this.pageSizesText,
      restAttributes: this.restAttributes
    });
  };
  o = i;
  if (a = [{
    key: "pageSizesText",
    get: function () {
      var e;
      var t;
      var n = this;
      if (this.__getterCache.pageSizesText !== undefined) {
        return this.__getterCache.pageSizesText;
      } else {
        return this.__getterCache.pageSizesText = (e = n.props, t = e.pageSize, e.pageSizes.map(function (e, i) {
          var o;
          var a = e.text;
          var r = e.value;
          var l = r === t;
          return {
            className: (0, s.combineClasses)((g(o = {}, l ? d.PAGER_SELECTED_PAGE_SIZE_CLASS : d.PAGER_PAGE_SIZE_CLASS, true), g(o, d.FIRST_CHILD_CLASS, i === 0), o)),
            click: n.onPageSizeChange(r),
            label: (0, h.format)(c.default.getFormatter("dxPager-pageSize"), r || c.default.getFormatter("dxPager-pageSizesAllText")),
            text: a
          };
        }));
      }
    }
  }, {
    key: "restAttributes",
    get: function () {
      var e = this.props;
      e.pageSize;
      e.pageSizeChange;
      e.pageSizes;
      return p(e, f);
    }
  }]) {
    _(o.prototype, a);
  }
  if (r) {
    _(o, r);
  }
  Object.defineProperty(o, "prototype", {
    writable: false
  });
  return i;
}(r.BaseInfernoComponent);
exports.PageSizeLarge = w;
w.defaultProps = x;