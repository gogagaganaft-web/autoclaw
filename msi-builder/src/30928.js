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
exports.viewFunction = exports.PagerContentProps = exports.PagerContent = undefined;
var o = require("./55285.js");
var a = require("./44105.js");
var r = require("./57495.js");
var s = require("./32854.js");
var l = require("./41936.js");
var u = require("./39853.js");
var d = require("./96529.js");
var c = require("./86237.js");
var h = require("./73687.js");
var f = require("./56756.js");
var p = require("./44133.js");
var g = ["className", "displayMode", "gridCompatibility", "hasKnownLastPage", "infoText", "infoTextRef", "infoTextVisible", "isLargeDisplayMode", "label", "lightModeEnabled", "maxPagesCount", "onKeyDown", "pageCount", "pageIndex", "pageIndexChange", "pageSize", "pageSizeChange", "pageSizes", "pageSizesRef", "pagesCountText", "pagesNavigatorVisible", "pagesRef", "rootElementRef", "rtlEnabled", "showInfo", "showNavigationButtons", "showPageSizes", "totalCount", "visible"];
function m(e, t) {
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
function _(e, t, n) {
  if ((t = y(t)) in e) {
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
function v(e, t) {
  for (var n = 0; n < t.length; n++) {
    var i = t[n];
    i.enumerable = i.enumerable || false;
    i.configurable = true;
    if ("value" in i) {
      i.writable = true;
    }
    Object.defineProperty(e, y(i.key), i);
  }
}
function y(e) {
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
function b(e) {
  if (e === undefined) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return e;
}
function x(e, t) {
  return (x = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (e, t) {
    e.__proto__ = t;
    return e;
  })(e, t);
}
function w() {
  return (w = Object.assign ? Object.assign.bind() : function (e) {
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
function C(e) {
  var t = e.aria;
  var n = e.classes;
  var i = e.infoVisible;
  var d = e.isLargeDisplayMode;
  var c = e.pageIndexSelectorVisible;
  var f = e.pagesContainerVisibility;
  var p = e.pagesContainerVisible;
  var g = e.props;
  var m = g.hasKnownLastPage;
  var _ = g.infoText;
  var v = g.infoTextRef;
  var y = g.maxPagesCount;
  var b = g.pageCount;
  var x = g.pageIndex;
  var C = g.pageIndexChange;
  var S = g.pageSize;
  var k = g.pageSizeChange;
  var D = g.pageSizes;
  var I = g.pageSizesRef;
  var T = g.pagesCountText;
  var E = g.pagesRef;
  var O = g.rtlEnabled;
  var A = g.showNavigationButtons;
  var P = g.showPageSizes;
  var M = g.totalCount;
  var R = g.visible;
  var B = e.restAttributes;
  var L = e.widgetRootElementRef;
  return (0, o.normalizeProps)((0, o.createComponentVNode)(2, h.Widget, w({
    rootElementRef: L,
    rtlEnabled: O,
    classes: n,
    visible: R,
    aria: t
  }, B, {
    children: [P && (0, o.createComponentVNode)(2, l.PageSizeSelector, {
      rootElementRef: I,
      isLargeDisplayMode: d,
      pageSize: S,
      pageSizeChange: k,
      pageSizes: D
    }), p && (0, o.createVNode)(1, "div", u.PAGER_PAGES_CLASS, [i && (0, o.createComponentVNode)(2, r.InfoText, {
      rootElementRef: v,
      infoText: _,
      pageCount: b,
      pageIndex: x,
      totalCount: M
    }), c && (0, o.createVNode)(1, "div", u.PAGER_PAGE_INDEXES_CLASS, (0, o.createComponentVNode)(2, s.PageIndexSelector, {
      hasKnownLastPage: m,
      isLargeDisplayMode: d,
      maxPagesCount: y,
      pageCount: b,
      pageIndex: x,
      pageIndexChange: C,
      pagesCountText: T,
      showNavigationButtons: A,
      totalCount: M
    }), 2, null, null, E)], 0, {
      style: (0, a.normalizeStyles)({
        visibility: f
      })
    })]
  })));
}
exports.viewFunction = C;
var S = Object.create(Object.prototype, w(Object.getOwnPropertyDescriptors(d.InternalPagerProps), Object.getOwnPropertyDescriptors({
  infoTextVisible: true,
  isLargeDisplayMode: true
})));
exports.PagerContentProps = S;
var k = function (e) {
  var t;
  var n;
  function i(t) {
    var n;
    (n = e.call(this, t) || this).state = {};
    n.widgetRootElementRef = (0, o.createRef)();
    n.__getterCache = {};
    n.setRootElementRef = n.setRootElementRef.bind(b(n));
    n.createFakeInstance = n.createFakeInstance.bind(b(n));
    return n;
  }
  n = e;
  (t = i).prototype = Object.create(n.prototype);
  t.prototype.constructor = t;
  x(t, n);
  var r;
  var s;
  var l;
  var d = i.prototype;
  d.createEffects = function () {
    return [new a.InfernoEffect(this.setRootElementRef, [])];
  };
  d.getChildContext = function () {
    return w({}, this.context, _({}, p.KeyboardActionContext.id, this.keyboardAction || p.KeyboardActionContext.defaultValue));
  };
  d.setRootElementRef = function () {
    var e = this.props.rootElementRef;
    if (e) {
      e.current = this.widgetRootElementRef.current;
    }
  };
  d.createFakeInstance = function () {
    var e = this;
    return {
      option: function () {
        return false;
      },
      element: function () {
        return e.widgetRootElementRef.current;
      },
      _createActionByOption: function () {
        return function (t) {
          var n;
          var i;
          if ((n = (i = e.props).onKeyDown) !== null && n !== undefined) {
            n.call(i, t);
          }
        };
      }
    };
  };
  d.componentWillUpdate = function (t, n, i) {
    e.prototype.componentWillUpdate.call(this);
    if (this.props.onKeyDown !== t.onKeyDown) {
      this.__getterCache.keyboardAction = undefined;
    }
  };
  d.render = function () {
    var e = this.props;
    return C({
      props: w({}, e),
      widgetRootElementRef: this.widgetRootElementRef,
      keyboardAction: this.keyboardAction,
      infoVisible: this.infoVisible,
      pageIndexSelectorVisible: this.pageIndexSelectorVisible,
      pagesContainerVisible: this.pagesContainerVisible,
      pagesContainerVisibility: this.pagesContainerVisibility,
      isLargeDisplayMode: this.isLargeDisplayMode,
      classes: this.classes,
      aria: this.aria,
      restAttributes: this.restAttributes
    });
  };
  r = i;
  if (s = [{
    key: "keyboardAction",
    get: function () {
      var e = this;
      if (this.__getterCache.keyboardAction !== undefined) {
        return this.__getterCache.keyboardAction;
      } else {
        return this.__getterCache.keyboardAction = {
          registerKeyboardAction: function (t, n) {
            var i = e.createFakeInstance();
            return (0, f.registerKeyboardAction)("pager", i, t, undefined, n);
          }
        };
      }
    }
  }, {
    key: "infoVisible",
    get: function () {
      var e = this.props;
      var t = e.infoTextVisible;
      return e.showInfo && t;
    }
  }, {
    key: "pageIndexSelectorVisible",
    get: function () {
      return this.props.pageSize !== 0;
    }
  }, {
    key: "normalizedDisplayMode",
    get: function () {
      var e = this.props;
      var t = e.displayMode;
      var n = e.lightModeEnabled;
      if (t === "adaptive" && n !== undefined) {
        if (n) {
          return "compact";
        } else {
          return "full";
        }
      } else {
        return t;
      }
    }
  }, {
    key: "pagesContainerVisible",
    get: function () {
      return !!this.props.pagesNavigatorVisible && this.props.pageCount > 0;
    }
  }, {
    key: "pagesContainerVisibility",
    get: function () {
      if (this.props.pagesNavigatorVisible === "auto" && this.props.pageCount === 1 && this.props.hasKnownLastPage) {
        return "hidden";
      }
    }
  }, {
    key: "isLargeDisplayMode",
    get: function () {
      var e = this.normalizedDisplayMode;
      if (e === "adaptive") {
        return this.props.isLargeDisplayMode;
      } else {
        return e === "full";
      }
    }
  }, {
    key: "classes",
    get: function () {
      var e;
      _(e = {}, `${this.props.className}`, !!this.props.className);
      _(e, u.PAGER_CLASS, true);
      _(e, u.LIGHT_MODE_CLASS, !this.isLargeDisplayMode);
      var t = e;
      return (0, c.combineClasses)(t);
    }
  }, {
    key: "aria",
    get: function () {
      return {
        role: "navigation",
        label: this.props.label
      };
    }
  }, {
    key: "restAttributes",
    get: function () {
      var e = this.props;
      e.className;
      e.displayMode;
      e.gridCompatibility;
      e.hasKnownLastPage;
      e.infoText;
      e.infoTextRef;
      e.infoTextVisible;
      e.isLargeDisplayMode;
      e.label;
      e.lightModeEnabled;
      e.maxPagesCount;
      e.onKeyDown;
      e.pageCount;
      e.pageIndex;
      e.pageIndexChange;
      e.pageSize;
      e.pageSizeChange;
      e.pageSizes;
      e.pageSizesRef;
      e.pagesCountText;
      e.pagesNavigatorVisible;
      e.pagesRef;
      e.rootElementRef;
      e.rtlEnabled;
      e.showInfo;
      e.showNavigationButtons;
      e.showPageSizes;
      e.totalCount;
      e.visible;
      return m(e, g);
    }
  }]) {
    v(r.prototype, s);
  }
  if (l) {
    v(r, l);
  }
  Object.defineProperty(r, "prototype", {
    writable: false
  });
  return i;
}(a.InfernoComponent);
exports.PagerContent = k;
k.defaultProps = S;