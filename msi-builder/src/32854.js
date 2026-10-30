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
exports.viewFunction = exports.PageIndexSelectorProps = exports.PageIndexSelector = exports.PAGER_BUTTON_DISABLE_CLASS = undefined;
var o;
var a = require("./55285.js");
var r = require("./44105.js");
var s = require("./93961.js");
var l = require("./40586.js");
var u = require("./50570.js");
var d = require("./96529.js");
var c = require("./49697.js");
var h = (o = require("./28109.js")) && o.__esModule ? o : {
  default: o
};
var f = ["hasKnownLastPage", "isLargeDisplayMode", "maxPagesCount", "pageCount", "pageIndex", "pageIndexChange", "pagesCountText", "showNavigationButtons", "totalCount"];
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
function g() {
  return (g = Object.assign ? Object.assign.bind() : function (e) {
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
function m(e, t) {
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
function _(e) {
  if (e === undefined) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return e;
}
function v(e, t) {
  return (v = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (e, t) {
    e.__proto__ = t;
    return e;
  })(e, t);
}
exports.PAGER_BUTTON_DISABLE_CLASS = "dx-button-disable";
var y = {
  nextEnabledClass: `dx-navigate-button dx-next-button`,
  prevEnabledClass: `dx-navigate-button dx-prev-button`,
  nextDisabledClass: `dx-button-disable dx-navigate-button dx-next-button`,
  prevDisabledClass: `dx-button-disable dx-navigate-button dx-prev-button`
};
var b = {
  next: "prev",
  prev: "next"
};
function x(e) {
  var t = e.nextButtonProps;
  var n = e.pageIndexChange;
  var i = e.prevButtonProps;
  var o = e.props;
  var r = o.isLargeDisplayMode;
  var d = o.maxPagesCount;
  var c = o.pageCount;
  var f = o.pageIndex;
  var p = o.pagesCountText;
  var g = e.renderNextButton;
  var m = e.renderPrevButton;
  return (0, a.createFragment)([m && (0, a.createComponentVNode)(2, s.LightButton, {
    label: h.default.getFormatter("dxPager-prevPage")(),
    className: i.className,
    tabIndex: i.tabIndex,
    onClick: i.navigate
  }), r && (0, a.createComponentVNode)(2, l.PagesLarge, {
    maxPagesCount: d,
    pageCount: c,
    pageIndex: f,
    pageIndexChange: n
  }), !r && (0, a.createComponentVNode)(2, u.PagesSmall, {
    pageCount: c,
    pageIndex: f,
    pageIndexChange: n,
    pagesCountText: p
  }), g && (0, a.createComponentVNode)(2, s.LightButton, {
    label: h.default.getFormatter("dxPager-nextPage")(),
    className: t.className,
    tabIndex: t.tabIndex,
    onClick: t.navigate
  })], 0);
}
exports.viewFunction = x;
var w = {
  isLargeDisplayMode: true
};
exports.PageIndexSelectorProps = w;
var C = Object.defineProperties({}, {
  pageIndex: {
    get: function () {
      return d.InternalPagerProps.pageIndex;
    },
    configurable: true,
    enumerable: true
  },
  maxPagesCount: {
    get: function () {
      return d.InternalPagerProps.maxPagesCount;
    },
    configurable: true,
    enumerable: true
  },
  pageCount: {
    get: function () {
      return d.InternalPagerProps.pageCount;
    },
    configurable: true,
    enumerable: true
  },
  hasKnownLastPage: {
    get: function () {
      return d.InternalPagerProps.hasKnownLastPage;
    },
    configurable: true,
    enumerable: true
  },
  showNavigationButtons: {
    get: function () {
      return d.InternalPagerProps.showNavigationButtons;
    },
    configurable: true,
    enumerable: true
  },
  totalCount: {
    get: function () {
      return d.InternalPagerProps.totalCount;
    },
    configurable: true,
    enumerable: true
  },
  isLargeDisplayMode: {
    get: function () {
      return w.isLargeDisplayMode;
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
    (n = e.call(this, t) || this).state = {};
    n.__getterCache = {};
    n.pageIndexChange = n.pageIndexChange.bind(_(n));
    n.getButtonProps = n.getButtonProps.bind(_(n));
    n.canNavigateToPage = n.canNavigateToPage.bind(_(n));
    n.getNextPageIndex = n.getNextPageIndex.bind(_(n));
    n.canNavigateTo = n.canNavigateTo.bind(_(n));
    n.navigateToPage = n.navigateToPage.bind(_(n));
    return n;
  }
  n = e;
  (t = i).prototype = Object.create(n.prototype);
  t.prototype.constructor = t;
  v(t, n);
  var o;
  var a;
  var r;
  var s = i.prototype;
  s.pageIndexChange = function (e) {
    if (this.canNavigateToPage(e)) {
      this.props.pageIndexChange(e);
    }
  };
  s.getButtonProps = function (e) {
    var t;
    var n = this;
    var i = (t = this.config) !== null && t !== undefined && t.rtlEnabled ? b[e] : e;
    var o = this.canNavigateTo(i);
    return {
      className: y[`${e}${o ? "Enabled" : "Disabled"}Class`],
      tabIndex: o ? 0 : -1,
      navigate: function () {
        return n.navigateToPage(i);
      }
    };
  };
  s.canNavigateToPage = function (e) {
    if (this.props.hasKnownLastPage) {
      return e >= 0 && e <= this.props.pageCount - 1;
    } else {
      return e >= 0;
    }
  };
  s.getNextPageIndex = function (e) {
    return this.props.pageIndex + function (e) {
      if (e === "next") {
        return 1;
      } else {
        return -1;
      }
    }(e);
  };
  s.canNavigateTo = function (e) {
    return this.canNavigateToPage(this.getNextPageIndex(e));
  };
  s.navigateToPage = function (e) {
    this.pageIndexChange(this.getNextPageIndex(e));
  };
  s.componentWillUpdate = function (e, t, n) {
    if (this.context[c.ConfigContext.id] !== n[c.ConfigContext.id] || this.props.hasKnownLastPage !== e.hasKnownLastPage || this.props.pageCount !== e.pageCount || this.props.pageIndex !== e.pageIndex || this.props.pageIndexChange !== e.pageIndexChange) {
      this.__getterCache.prevButtonProps = undefined;
    }
    if (this.context[c.ConfigContext.id] !== n[c.ConfigContext.id] || this.props.hasKnownLastPage !== e.hasKnownLastPage || this.props.pageCount !== e.pageCount || this.props.pageIndex !== e.pageIndex || this.props.pageIndexChange !== e.pageIndexChange) {
      this.__getterCache.nextButtonProps = undefined;
    }
  };
  s.render = function () {
    var e = this.props;
    return x({
      props: g({}, e),
      config: this.config,
      pageIndexChange: this.pageIndexChange,
      renderPrevButton: this.renderPrevButton,
      renderNextButton: this.renderNextButton,
      prevButtonProps: this.prevButtonProps,
      nextButtonProps: this.nextButtonProps,
      restAttributes: this.restAttributes
    });
  };
  o = i;
  if (a = [{
    key: "config",
    get: function () {
      if (this.context[c.ConfigContext.id]) {
        return this.context[c.ConfigContext.id];
      } else {
        return c.ConfigContext.defaultValue;
      }
    }
  }, {
    key: "renderPrevButton",
    get: function () {
      var e = this.props;
      var t = e.isLargeDisplayMode;
      var n = e.showNavigationButtons;
      return !t || n;
    }
  }, {
    key: "renderNextButton",
    get: function () {
      return this.renderPrevButton || !this.props.hasKnownLastPage;
    }
  }, {
    key: "prevButtonProps",
    get: function () {
      var e = this;
      if (this.__getterCache.prevButtonProps !== undefined) {
        return this.__getterCache.prevButtonProps;
      } else {
        return this.__getterCache.prevButtonProps = e.getButtonProps("prev");
      }
    }
  }, {
    key: "nextButtonProps",
    get: function () {
      var e = this;
      if (this.__getterCache.nextButtonProps !== undefined) {
        return this.__getterCache.nextButtonProps;
      } else {
        return this.__getterCache.nextButtonProps = e.getButtonProps("next");
      }
    }
  }, {
    key: "restAttributes",
    get: function () {
      var e = this.props;
      e.hasKnownLastPage;
      e.isLargeDisplayMode;
      e.maxPagesCount;
      e.pageCount;
      e.pageIndex;
      e.pageIndexChange;
      e.pagesCountText;
      e.showNavigationButtons;
      e.totalCount;
      return p(e, f);
    }
  }]) {
    m(o.prototype, a);
  }
  if (r) {
    m(o, r);
  }
  Object.defineProperty(o, "prototype", {
    writable: false
  });
  return i;
}(r.BaseInfernoComponent);
exports.PageIndexSelector = S;
S.defaultProps = C;