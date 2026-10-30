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
exports.viewFunction = exports.Pager = undefined;
var o = require("./55285.js");
var a = require("./44105.js");
var r = require("./97239.js");
var s = require("./96529.js");
var l = require("./30928.js");
var u = require("./86237.js");
var d = ["className", "defaultPageIndex", "defaultPageSize", "displayMode", "gridCompatibility", "hasKnownLastPage", "infoText", "label", "lightModeEnabled", "maxPagesCount", "onKeyDown", "pageCount", "pageIndex", "pageIndexChange", "pageSize", "pageSizeChange", "pageSizes", "pagesCountText", "pagesNavigatorVisible", "rtlEnabled", "showInfo", "showNavigationButtons", "showPageSizes", "totalCount", "visible"];
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
    var i = t[n];
    i.enumerable = i.enumerable || false;
    i.configurable = true;
    if ("value" in i) {
      i.writable = true;
    }
    Object.defineProperty(e, f(i.key), i);
  }
}
function f(e) {
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
function p(e) {
  if (e === undefined) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return e;
}
function g(e, t) {
  return (g = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (e, t) {
    e.__proto__ = t;
    return e;
  })(e, t);
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
function _(e) {
  var t = e.pagerProps;
  var n = e.restAttributes;
  return (0, o.normalizeProps)((0, o.createComponentVNode)(2, r.ResizableContainer, m({
    contentTemplate: l.PagerContent,
    pagerProps: t
  }, n)));
}
exports.viewFunction = _;
var v = function (e) {
  var t;
  var n;
  function i(t) {
    var n;
    (n = e.call(this, t) || this).__getterCache = {};
    n.state = {
      pageSize: n.props.pageSize !== undefined ? n.props.pageSize : n.props.defaultPageSize,
      pageIndex: n.props.pageIndex !== undefined ? n.props.pageIndex : n.props.defaultPageIndex
    };
    n.pageIndexChange = n.pageIndexChange.bind(p(n));
    n.pageSizeChange = n.pageSizeChange.bind(p(n));
    return n;
  }
  n = e;
  (t = i).prototype = Object.create(n.prototype);
  t.prototype.constructor = t;
  g(t, n);
  var o;
  var r;
  var s;
  var l = i.prototype;
  l.createEffects = function () {
    return [(0, a.createReRenderEffect)()];
  };
  l.pageIndexChange = function (e) {
    var t;
    var n;
    if (this.props.gridCompatibility) {
      this.setState(function (n) {
        return {
          pageIndex: t = e + 1
        };
      });
      this.props.pageIndexChange(t);
    } else {
      this.setState(function (t) {
        return {
          pageIndex: n = e
        };
      });
      this.props.pageIndexChange(n);
    }
  };
  l.pageSizeChange = function (e) {
    var t;
    this.setState(function (n) {
      return {
        pageSize: t = e
      };
    });
    this.props.pageSizeChange(t);
  };
  l.componentWillUpdate = function (t, n, i) {
    e.prototype.componentWillUpdate.call(this);
    if (this.props !== t || this.props.gridCompatibility !== t.gridCompatibility || this.props.className !== t.className || this.state.pageIndex !== n.pageIndex || this.props.pageIndex !== t.pageIndex || this.props.pageIndexChange !== t.pageIndexChange || this.props.pageSizeChange !== t.pageSizeChange) {
      this.__getterCache.pagerProps = undefined;
    }
  };
  l.render = function () {
    var e = this.props;
    return _({
      props: m({}, e, {
        pageSize: this.props.pageSize !== undefined ? this.props.pageSize : this.state.pageSize,
        pageIndex: this.props.pageIndex !== undefined ? this.props.pageIndex : this.state.pageIndex
      }),
      pageIndexChange: this.pageIndexChange,
      pageIndex: this.pageIndex,
      pageSizeChange: this.pageSizeChange,
      className: this.className,
      pagerProps: this.pagerProps,
      restAttributes: this.restAttributes
    });
  };
  o = i;
  if (r = [{
    key: "pageIndex",
    get: function () {
      if (this.props.gridCompatibility) {
        return (this.props.pageIndex !== undefined ? this.props.pageIndex : this.state.pageIndex) - 1;
      } else if (this.props.pageIndex !== undefined) {
        return this.props.pageIndex;
      } else {
        return this.state.pageIndex;
      }
    }
  }, {
    key: "className",
    get: function () {
      if (this.props.gridCompatibility) {
        return (0, u.combineClasses)((e = {
          "dx-datagrid-pager": true
        }, t = `${this.props.className}`, n = !!this.props.className, (t = f(t)) in e ? Object.defineProperty(e, t, {
          value: n,
          enumerable: true,
          configurable: true,
          writable: true
        }) : e[t] = n, e));
      } else {
        return this.props.className;
      }
      var e;
      var t;
      var n;
    }
  }, {
    key: "pagerProps",
    get: function () {
      var e = this;
      if (this.__getterCache.pagerProps !== undefined) {
        return this.__getterCache.pagerProps;
      } else {
        return this.__getterCache.pagerProps = m({}, m({}, e.props, {
          pageSize: e.props.pageSize !== undefined ? e.props.pageSize : e.state.pageSize,
          pageIndex: e.props.pageIndex !== undefined ? e.props.pageIndex : e.state.pageIndex
        }), {
          className: e.className,
          pageIndex: e.pageIndex,
          pageIndexChange: function (t) {
            return e.pageIndexChange(t);
          },
          pageSizeChange: function (t) {
            return e.pageSizeChange(t);
          }
        });
      }
    }
  }, {
    key: "restAttributes",
    get: function () {
      var e = m({}, this.props, {
        pageSize: this.props.pageSize !== undefined ? this.props.pageSize : this.state.pageSize,
        pageIndex: this.props.pageIndex !== undefined ? this.props.pageIndex : this.state.pageIndex
      });
      e.className;
      e.defaultPageIndex;
      e.defaultPageSize;
      e.displayMode;
      e.gridCompatibility;
      e.hasKnownLastPage;
      e.infoText;
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
      e.pagesCountText;
      e.pagesNavigatorVisible;
      e.rtlEnabled;
      e.showInfo;
      e.showNavigationButtons;
      e.showPageSizes;
      e.totalCount;
      e.visible;
      return c(e, d);
    }
  }]) {
    h(o.prototype, r);
  }
  if (s) {
    h(o, s);
  }
  Object.defineProperty(o, "prototype", {
    writable: false
  });
  return i;
}(a.InfernoWrapperComponent);
exports.Pager = v;
v.defaultProps = s.PagerProps;