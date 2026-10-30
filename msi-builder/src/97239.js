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
exports.ResizableContainerProps = exports.ResizableContainer = undefined;
exports.calculateInfoTextVisible = v;
exports.calculateLargeDisplayMode = _;
exports.viewFunction = undefined;
var o;
var a = require("./55285.js");
var r = require("./44105.js");
var s = (o = require("./55814.js")) && o.__esModule ? o : {
  default: o
};
var l = require("./95116.js");
var u = require("./35922.js");
var d = ["contentTemplate", "pagerProps"];
function c(e, t) {
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
function h(e, t) {
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
function f(e) {
  if (e === undefined) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return e;
}
function p(e, t) {
  return (p = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (e, t) {
    e.__proto__ = t;
    return e;
  })(e, t);
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
function m(e) {
  var t = e.contentAttributes;
  var n = e.infoTextRef;
  var i = e.infoTextVisible;
  var o = e.isLargeDisplayMode;
  var a = e.pageSizesRef;
  var r = e.pagesRef;
  var s = e.parentRef;
  return (0, e.props.contentTemplate)(g({
    rootElementRef: s,
    pageSizesRef: a,
    infoTextRef: n,
    pagesRef: r,
    infoTextVisible: i,
    isLargeDisplayMode: o
  }, t));
}
function _(e) {
  var t = e.pageSizes;
  var n = e.pages;
  return e.parent - (t + n) > 0;
}
function v(e) {
  var t = e.info;
  var n = e.pageSizes;
  var i = e.pages;
  return e.parent - (n + i + t) > 0;
}
exports.viewFunction = m;
var y = {};
exports.ResizableContainerProps = y;
var b = function (e) {
  var t;
  var n;
  function i(t) {
    var n;
    (n = e.call(this, t) || this).parentRef = (0, a.createRef)();
    n.pageSizesRef = (0, a.createRef)();
    n.infoTextRef = (0, a.createRef)();
    n.pagesRef = (0, a.createRef)();
    n.actualIsLargeDisplayMode = true;
    n.actualInfoTextVisible = true;
    n.state = {
      infoTextVisible: true,
      isLargeDisplayMode: true
    };
    n.subscribeToResize = n.subscribeToResize.bind(f(n));
    n.effectUpdateChildProps = n.effectUpdateChildProps.bind(f(n));
    n.updateAdaptivityProps = n.updateAdaptivityProps.bind(f(n));
    return n;
  }
  n = e;
  (t = i).prototype = Object.create(n.prototype);
  t.prototype.constructor = t;
  p(t, n);
  var o;
  var y;
  var b;
  var x = i.prototype;
  x.createEffects = function () {
    return [new r.InfernoEffect(this.subscribeToResize, [this.state.infoTextVisible, this.state.isLargeDisplayMode]), new r.InfernoEffect(this.effectUpdateChildProps, [this.props, this.state.infoTextVisible, this.state.isLargeDisplayMode, this.props.pagerProps, this.props.contentTemplate])];
  };
  x.updateEffects = function () {
    var e;
    var t;
    if ((e = this._effects[0]) !== null && e !== undefined) {
      e.update([this.state.infoTextVisible, this.state.isLargeDisplayMode]);
    }
    if ((t = this._effects[1]) !== null && t !== undefined) {
      t.update([this.props, this.state.infoTextVisible, this.state.isLargeDisplayMode, this.props.pagerProps, this.props.contentTemplate]);
    }
  };
  x.subscribeToResize = function () {
    var e = this;
    function t() {
      if (e.parentWidth > 0) {
        e.updateAdaptivityProps();
      }
    }
    s.default.add(t);
    return function () {
      s.default.remove(t);
    };
  };
  x.effectUpdateChildProps = function () {
    if (this.parentWidth > 0) {
      this.updateAdaptivityProps();
    }
  };
  x.updateAdaptivityProps = function () {
    var e;
    var t;
    var n;
    var i;
    var o;
    var a;
    var r;
    var s;
    var d;
    var c = this;
    e = {
      parent: this.parentRef.current,
      pageSizes: this.pageSizesRef.current,
      info: this.infoTextRef.current,
      pages: this.pagesRef.current
    };
    t = e.info;
    n = e.pageSizes;
    i = e.pages;
    o = e.parent;
    a = (0, l.getElementContentWidth)(o);
    r = (0, l.getElementWidth)(n);
    s = (0, l.getElementWidth)(t);
    d = (0, l.getElementWidth)(i);
    var h = {
      parent: a,
      pageSizes: r,
      info: s + (0, l.getElementStyle)("marginLeft", t) + (0, l.getElementStyle)("marginRight", t),
      pages: d
    };
    if (this.actualInfoTextVisible === this.state.infoTextVisible && this.actualIsLargeDisplayMode === this.state.isLargeDisplayMode) {
      var f = !(0, u.isDefined)(this.elementsWidth);
      if (f) {
        this.elementsWidth = {};
      }
      if (f || this.state.isLargeDisplayMode) {
        this.elementsWidth.pageSizes = h.pageSizes;
        this.elementsWidth.pages = h.pages;
      }
      if (f || this.state.infoTextVisible) {
        this.elementsWidth.info = h.info;
      }
      this.actualIsLargeDisplayMode = _(g({
        parent: h.parent
      }, {
        pageSizes: this.elementsWidth.pageSizes,
        pages: this.elementsWidth.pages
      }));
      this.actualInfoTextVisible = v(g({}, h, {
        info: this.elementsWidth.info
      }));
      this.setState(function (e) {
        return {
          infoTextVisible: c.actualInfoTextVisible
        };
      });
      this.setState(function (e) {
        return {
          isLargeDisplayMode: c.actualIsLargeDisplayMode
        };
      });
    }
  };
  x.render = function () {
    var e;
    var t = this.props;
    return m({
      props: g({}, t, {
        contentTemplate: (e = t.contentTemplate, e && (e.defaultProps ? function (t) {
          return (0, a.normalizeProps)((0, a.createComponentVNode)(2, e, g({}, t)));
        } : e))
      }),
      infoTextVisible: this.state.infoTextVisible,
      isLargeDisplayMode: this.state.isLargeDisplayMode,
      parentRef: this.parentRef,
      pageSizesRef: this.pageSizesRef,
      infoTextRef: this.infoTextRef,
      pagesRef: this.pagesRef,
      contentAttributes: this.contentAttributes,
      parentWidth: this.parentWidth,
      updateAdaptivityProps: this.updateAdaptivityProps,
      restAttributes: this.restAttributes
    });
  };
  o = i;
  if (y = [{
    key: "contentAttributes",
    get: function () {
      var e = this.props.pagerProps;
      var t = e.className;
      var n = e.displayMode;
      var i = e.gridCompatibility;
      var o = e.hasKnownLastPage;
      var a = e.infoText;
      var r = e.label;
      var s = e.lightModeEnabled;
      var l = e.maxPagesCount;
      var u = e.onKeyDown;
      var d = e.pageCount;
      var c = e.pageIndex;
      var h = e.pageIndexChange;
      var f = e.pageSize;
      var p = e.pageSizeChange;
      var m = e.pageSizes;
      var _ = e.pagesCountText;
      var v = e.pagesNavigatorVisible;
      var y = e.rtlEnabled;
      var b = e.showInfo;
      var x = e.showNavigationButtons;
      var w = e.showPageSizes;
      var C = e.totalCount;
      var S = e.visible;
      return g({}, this.restAttributes, {
        pageSize: f,
        pageIndex: c,
        pageIndexChange: h,
        pageSizeChange: p,
        gridCompatibility: i,
        className: t,
        showInfo: b,
        infoText: a,
        lightModeEnabled: s,
        displayMode: n,
        maxPagesCount: l,
        pageCount: d,
        pagesCountText: _,
        visible: S,
        hasKnownLastPage: o,
        pagesNavigatorVisible: v,
        showPageSizes: w,
        pageSizes: m,
        rtlEnabled: y,
        showNavigationButtons: x,
        totalCount: C,
        onKeyDown: u,
        label: r
      });
    }
  }, {
    key: "parentWidth",
    get: function () {
      if (this.parentRef.current) {
        return (0, l.getElementWidth)(this.parentRef.current);
      } else {
        return 0;
      }
    }
  }, {
    key: "restAttributes",
    get: function () {
      var e = this.props;
      e.contentTemplate;
      e.pagerProps;
      return c(e, d);
    }
  }]) {
    h(o.prototype, y);
  }
  if (b) {
    h(o, b);
  }
  Object.defineProperty(o, "prototype", {
    writable: false
  });
  return i;
}(r.InfernoComponent);
exports.ResizableContainer = b;
b.defaultProps = y;