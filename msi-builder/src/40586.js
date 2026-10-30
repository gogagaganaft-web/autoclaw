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
exports.viewFunction = exports.PagesLarge = undefined;
var o = require("./55285.js");
var a = require("./44105.js");
var r = require("./48402.js");
var s = require("./96529.js");
var l = require("./49697.js");
var u = ["pageIndexes"];
var d = ["maxPagesCount", "pageCount", "pageIndex", "pageIndexChange"];
function c() {
  return (c = Object.assign ? Object.assign.bind() : function (e) {
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
function h(e, t) {
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
function f(e, t) {
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
function m(e) {
  return function (e) {
    if (Array.isArray(e)) {
      return _(e);
    }
  }(e) || function (e) {
    if (typeof Symbol != "undefined" && e[Symbol.iterator] != null || e["@@iterator"] != null) {
      return Array.from(e);
    }
  }(e) || function (e, t) {
    if (!e) {
      return;
    }
    if (typeof e == "string") {
      return _(e, t);
    }
    var n = Object.prototype.toString.call(e).slice(8, -1);
    if (n === "Object" && e.constructor) {
      n = e.constructor.name;
    }
    if (n === "Map" || n === "Set") {
      return Array.from(e);
    }
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) {
      return _(e, t);
    }
  }(e) || function () {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }();
}
function _(e, t) {
  if (t == null || t > e.length) {
    t = e.length;
  }
  for (var n = 0, i = new Array(t); n < t; n++) {
    i[n] = e[n];
  }
  return i;
}
function v(e) {
  var t = e.pages.map(function (e) {
    var t = e.key;
    var n = e.pageProps;
    if (n) {
      return (0, o.createComponentVNode)(2, r.Page, {
        index: n.index,
        selected: n.selected,
        onClick: n.onClick
      }, t);
    } else {
      return (0, o.createVNode)(1, "div", "dx-separator", ". . .", 16, null, t);
    }
  });
  return (0, o.createFragment)(t, 0);
}
exports.viewFunction = v;
function y(e, t, n) {
  if (e === 1) {
    return "high";
  } else if (e + t === n - 1) {
    return "low";
  } else {
    return "both";
  }
}
function b(e, t, n) {
  var i = [];
  var o = [];
  switch (n) {
    case "none":
      i = m(e);
      break;
    case "both":
      i = [0, "low"].concat(m(e), ["high", t - 1]);
      o = e.slice(1, -1);
      break;
    case "high":
      i = [0].concat(m(e), ["high", t - 1]);
      o = e.slice(0, -1);
      break;
    case "low":
      i = [0, "low"].concat(m(e), [t - 1]);
      o = e.slice(1);
  }
  return {
    slidingWindowIndexes: e,
    indexesForReuse: o,
    pageIndexes: i
  };
}
function x(e, t, n, i) {
  var o = [];
  for (var a = 0; a < t; a += 1) {
    o.push(a + e);
  }
  return b(o, n, i);
}
var w = Object.defineProperties({}, {
  pageIndex: {
    get: function () {
      return s.InternalPagerProps.pageIndex;
    },
    configurable: true,
    enumerable: true
  },
  maxPagesCount: {
    get: function () {
      return s.InternalPagerProps.maxPagesCount;
    },
    configurable: true,
    enumerable: true
  },
  pageCount: {
    get: function () {
      return s.InternalPagerProps.pageCount;
    },
    configurable: true,
    enumerable: true
  }
});
var C = function (e) {
  var t;
  var n;
  function i(t) {
    var n;
    (n = e.call(this, t) || this).state = {};
    n.canReuseSlidingWindow = n.canReuseSlidingWindow.bind(p(n));
    n.generatePageIndexes = n.generatePageIndexes.bind(p(n));
    n.isSlidingWindowMode = n.isSlidingWindowMode.bind(p(n));
    n.onPageClick = n.onPageClick.bind(p(n));
    return n;
  }
  n = e;
  (t = i).prototype = Object.create(n.prototype);
  t.prototype.constructor = t;
  g(t, n);
  var o;
  var a;
  var r;
  var s = i.prototype;
  s.canReuseSlidingWindow = function (e, t) {
    var n = this.slidingWindowState.indexesForReuse;
    var i = n.slice(-1)[0] < e - 1;
    var o = n.includes(t);
    return i && o;
  };
  s.generatePageIndexes = function () {
    var e = this.props;
    var t = e.pageCount;
    var n = e.pageIndex;
    var i = 0;
    var o = this.slidingWindowState.slidingWindowIndexes;
    var a = x(i = n === o[0] ? n - 1 : n === o[o.length - 1] ? n + 2 - 4 : n < 4 ? 1 : n >= t - 4 ? t - 4 - 1 : n - 1, 4, t, y(i, 4, t));
    var r = a.pageIndexes;
    var s = h(a, u);
    this.slidingWindowStateHolder = s;
    return r;
  };
  s.isSlidingWindowMode = function () {
    var e = this.props;
    var t = e.maxPagesCount;
    var n = e.pageCount;
    return n <= 4 || n <= t;
  };
  s.onPageClick = function (e) {
    this.props.pageIndexChange(e);
  };
  s.render = function () {
    var e = this.props;
    return v({
      props: c({}, e),
      config: this.config,
      pageIndexes: this.pageIndexes,
      pages: this.pages,
      restAttributes: this.restAttributes
    });
  };
  o = i;
  if (a = [{
    key: "config",
    get: function () {
      if (this.context[l.ConfigContext.id]) {
        return this.context[l.ConfigContext.id];
      } else {
        return l.ConfigContext.defaultValue;
      }
    }
  }, {
    key: "slidingWindowState",
    get: function () {
      var e = this.slidingWindowStateHolder;
      return e || {
        indexesForReuse: [],
        slidingWindowIndexes: []
      };
    }
  }, {
    key: "pageIndexes",
    get: function () {
      var e = this.props.pageCount;
      if (this.isSlidingWindowMode()) {
        return x(0, e, e, "none").pageIndexes;
      }
      if (this.canReuseSlidingWindow(e, this.props.pageIndex)) {
        var t = this.slidingWindowState.slidingWindowIndexes;
        return b(t, e, y(t[0], 4, e)).pageIndexes;
      }
      return this.generatePageIndexes();
    }
  }, {
    key: "pages",
    get: function () {
      var e;
      var t = this;
      var n = this.props.pageIndex;
      return ((e = this.config) !== null && e !== undefined && e.rtlEnabled ? m(this.pageIndexes).reverse() : this.pageIndexes).map(function (e) {
        return function (e) {
          var i = e === "low" || e === "high" ? null : {
            index: e,
            onClick: function () {
              return t.onPageClick(e);
            },
            selected: n === e
          };
          return {
            key: e.toString(),
            pageProps: i
          };
        }(e);
      });
    }
  }, {
    key: "restAttributes",
    get: function () {
      var e = this.props;
      e.maxPagesCount;
      e.pageCount;
      e.pageIndex;
      e.pageIndexChange;
      return h(e, d);
    }
  }]) {
    f(o.prototype, a);
  }
  if (r) {
    f(o, r);
  }
  Object.defineProperty(o, "prototype", {
    writable: false
  });
  return i;
}(a.BaseInfernoComponent);
exports.PagesLarge = C;
C.defaultProps = w;