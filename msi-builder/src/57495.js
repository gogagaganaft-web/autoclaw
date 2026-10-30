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
exports.viewFunction = exports.PAGER_INFO_CLASS = exports.InfoTextProps = exports.InfoText = undefined;
var o;
var a = require("./55285.js");
var r = require("./44105.js");
var s = require("./68752.js");
var l = (o = require("./28109.js")) && o.__esModule ? o : {
  default: o
};
var u = require("./96529.js");
var d = ["infoText", "pageCount", "pageIndex", "rootElementRef", "totalCount"];
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
function h() {
  return (h = Object.assign ? Object.assign.bind() : function (e) {
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
function p(e, t) {
  return (p = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (e, t) {
    e.__proto__ = t;
    return e;
  })(e, t);
}
exports.PAGER_INFO_CLASS = "dx-info";
function g(e) {
  var t = e.props.rootElementRef;
  var n = e.text;
  return (0, a.createVNode)(1, "div", "dx-info", n, 0, null, null, t);
}
exports.viewFunction = g;
exports.InfoTextProps = {};
var m = Object.defineProperties({}, {
  pageIndex: {
    get: function () {
      return u.InternalPagerProps.pageIndex;
    },
    configurable: true,
    enumerable: true
  },
  pageCount: {
    get: function () {
      return u.InternalPagerProps.pageCount;
    },
    configurable: true,
    enumerable: true
  },
  totalCount: {
    get: function () {
      return u.InternalPagerProps.totalCount;
    },
    configurable: true,
    enumerable: true
  }
});
var _ = function (e) {
  var t;
  var n;
  var i;
  var o;
  var a;
  function r(t) {
    var n;
    (n = e.call(this, t) || this).state = {};
    return n;
  }
  n = e;
  (t = r).prototype = Object.create(n.prototype);
  t.prototype.constructor = t;
  p(t, n);
  r.prototype.render = function () {
    var e = this.props;
    return g({
      props: h({}, e),
      infoText: this.infoText,
      text: this.text,
      restAttributes: this.restAttributes
    });
  };
  i = r;
  if (o = [{
    key: "infoText",
    get: function () {
      return (this.props.infoText ?? "") || l.default.getFormatter("dxPager-infoText")();
    }
  }, {
    key: "text",
    get: function () {
      var e = this.props;
      var t = e.pageCount;
      var n = e.pageIndex;
      var i = e.totalCount;
      return (0, s.format)(this.infoText, (n + 1).toString(), t.toString(), i.toString());
    }
  }, {
    key: "restAttributes",
    get: function () {
      var e = this.props;
      e.infoText;
      e.pageCount;
      e.pageIndex;
      e.rootElementRef;
      e.totalCount;
      return c(e, d);
    }
  }]) {
    f(i.prototype, o);
  }
  if (a) {
    f(i, a);
  }
  Object.defineProperty(i, "prototype", {
    writable: false
  });
  return r;
}(r.BaseInfernoComponent);
exports.InfoText = _;
_.defaultProps = m;