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
exports.viewFunction = exports.PagesSmall = exports.PagerSmallProps = undefined;
var o;
var a = require("./55285.js");
var r = require("./44105.js");
var s = require("./48402.js");
var l = require("./57495.js");
var u = require("./15560.js");
var d = (o = require("./28109.js")) && o.__esModule ? o : {
  default: o
};
var c = require("./7750.js");
var h = require("./95116.js");
var f = require("./96529.js");
var p = ["inputAttr", "pageCount", "pageIndex", "pageIndexChange", "pagesCountText"];
function g(e, t) {
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
function v(e) {
  if (e === undefined) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return e;
}
function y(e, t) {
  return (y = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (e, t) {
    e.__proto__ = t;
    return e;
  })(e, t);
}
var b = `${l.PAGER_INFO_CLASS}  dx-info-text`;
function x(e) {
  var t = e.pageIndexRef;
  var n = e.pagesCountText;
  var i = e.props;
  var o = i.inputAttr;
  var r = i.pageCount;
  var l = e.selectLastPageIndex;
  var d = e.value;
  var c = e.valueChange;
  var h = e.width;
  return (0, a.createVNode)(1, "div", "dx-light-pages", [(0, a.createComponentVNode)(2, u.NumberBox, {
    className: "dx-page-index",
    min: 1,
    max: r,
    width: h,
    value: d,
    valueChange: c,
    inputAttr: o
  }), (0, a.createVNode)(1, "span", b, n, 0), (0, a.createComponentVNode)(2, s.Page, {
    className: "dx-pages-count",
    selected: false,
    index: r - 1,
    onClick: l
  })], 4, null, null, t);
}
exports.viewFunction = x;
var w = {
  inputAttr: Object.freeze({
    "aria-label": d.default.format("dxPager-ariaPageNumber")
  })
};
exports.PagerSmallProps = w;
var C = Object.defineProperties({}, {
  pageIndex: {
    get: function () {
      return f.InternalPagerProps.pageIndex;
    },
    configurable: true,
    enumerable: true
  },
  pageCount: {
    get: function () {
      return f.InternalPagerProps.pageCount;
    },
    configurable: true,
    enumerable: true
  },
  inputAttr: {
    get: function () {
      return w.inputAttr;
    },
    configurable: true,
    enumerable: true
  }
});
var S = function (e) {
  var t;
  var n;
  function i(t) {
    var n;
    (n = e.call(this, t) || this).pageIndexRef = (0, a.createRef)();
    n.state = {
      minWidth: 10
    };
    n.updateWidth = n.updateWidth.bind(v(n));
    n.selectLastPageIndex = n.selectLastPageIndex.bind(v(n));
    n.valueChange = n.valueChange.bind(v(n));
    return n;
  }
  n = e;
  (t = i).prototype = Object.create(n.prototype);
  t.prototype.constructor = t;
  y(t, n);
  var o;
  var s;
  var l;
  var u = i.prototype;
  u.createEffects = function () {
    return [new r.InfernoEffect(this.updateWidth, [this.state.minWidth])];
  };
  u.updateEffects = function () {
    var e;
    if ((e = this._effects[0]) !== null && e !== undefined) {
      e.update([this.state.minWidth]);
    }
  };
  u.updateWidth = function () {
    var e;
    var t = (e = this.pageIndexRef.current) === null || e === undefined ? undefined : e.querySelector(`.dx-page-index`);
    this.setState(function (e) {
      return {
        minWidth: t && (0, h.getElementMinWidth)(t) || e.minWidth
      };
    });
  };
  u.selectLastPageIndex = function () {
    this.props.pageIndexChange(this.props.pageCount - 1);
  };
  u.valueChange = function (e) {
    this.props.pageIndexChange(e - 1);
  };
  u.render = function () {
    var e = this.props;
    return x({
      props: m({}, e),
      pageIndexRef: this.pageIndexRef,
      value: this.value,
      width: this.width,
      pagesCountText: this.pagesCountText,
      selectLastPageIndex: this.selectLastPageIndex,
      valueChange: this.valueChange,
      restAttributes: this.restAttributes
    });
  };
  o = i;
  if (s = [{
    key: "value",
    get: function () {
      return this.props.pageIndex + 1;
    }
  }, {
    key: "width",
    get: function () {
      var e = this.props.pageCount;
      return (0, c.calculateValuesFittedWidth)(this.state.minWidth, [e]);
    }
  }, {
    key: "pagesCountText",
    get: function () {
      return (this.props.pagesCountText ?? "") || d.default.getFormatter("dxPager-pagesCountText")();
    }
  }, {
    key: "restAttributes",
    get: function () {
      var e = this.props;
      e.inputAttr;
      e.pageCount;
      e.pageIndex;
      e.pageIndexChange;
      e.pagesCountText;
      return g(e, p);
    }
  }]) {
    _(o.prototype, s);
  }
  if (l) {
    _(o, l);
  }
  Object.defineProperty(o, "prototype", {
    writable: false
  });
  return i;
}(r.InfernoComponent);
exports.PagesSmall = S;
S.defaultProps = C;