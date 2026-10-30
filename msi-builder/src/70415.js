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
exports.viewFunction = exports.PageSizeSmallProps = exports.PageSizeSmall = undefined;
var o;
var a = require("./55285.js");
var r = require("./44105.js");
var s = (o = require("./28109.js")) && o.__esModule ? o : {
  default: o
};
var l = require("./79708.js");
var u = require("./7750.js");
var d = require("./95116.js");
var c = require("./96529.js");
var h = ["inputAttr", "pageSize", "pageSizeChange", "pageSizes", "parentRef"];
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
  var t = e.props;
  var n = t.inputAttr;
  var i = t.pageSize;
  var o = t.pageSizeChange;
  var r = t.pageSizes;
  var s = e.width;
  return (0, a.createComponentVNode)(2, l.SelectBox, {
    displayExpr: "text",
    valueExpr: "value",
    dataSource: r,
    value: i,
    valueChange: o,
    width: s,
    inputAttr: n
  });
}
exports.viewFunction = _;
var v = {
  inputAttr: Object.freeze({
    "aria-label": s.default.format("dxPager-ariaPageSize")
  })
};
exports.PageSizeSmallProps = v;
var y = Object.defineProperties({}, {
  pageSize: {
    get: function () {
      return c.InternalPagerProps.pageSize;
    },
    configurable: true,
    enumerable: true
  },
  inputAttr: {
    get: function () {
      return v.inputAttr;
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
    (n = e.call(this, t) || this).state = {
      minWidth: 10
    };
    n.updateWidth = n.updateWidth.bind(function (e) {
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
  var a;
  var s;
  var l = i.prototype;
  l.createEffects = function () {
    return [new r.InfernoEffect(this.updateWidth, [this.props, this.state.minWidth, this.props.pageSize, this.props.pageSizeChange, this.props.pageSizes, this.props.inputAttr])];
  };
  l.updateEffects = function () {
    var e;
    if ((e = this._effects[0]) !== null && e !== undefined) {
      e.update([this.props, this.state.minWidth, this.props.pageSize, this.props.pageSizeChange, this.props.pageSizes, this.props.inputAttr]);
    }
  };
  l.updateWidth = function () {
    var e = this;
    this.setState(function (t) {
      return {
        minWidth: (0, d.getElementMinWidth)(e.props.parentRef.current) || t.minWidth
      };
    });
  };
  l.render = function () {
    var e = this.props;
    return _({
      props: p({}, e),
      width: this.width,
      restAttributes: this.restAttributes
    });
  };
  o = i;
  if (a = [{
    key: "width",
    get: function () {
      return (0, u.calculateValuesFittedWidth)(this.state.minWidth, this.props.pageSizes.map(function (e) {
        return e.value;
      }));
    }
  }, {
    key: "restAttributes",
    get: function () {
      var e = this.props;
      e.inputAttr;
      e.pageSize;
      e.pageSizeChange;
      e.pageSizes;
      e.parentRef;
      return f(e, h);
    }
  }]) {
    g(o.prototype, a);
  }
  if (s) {
    g(o, s);
  }
  Object.defineProperty(o, "prototype", {
    writable: false
  });
  return i;
}(r.InfernoComponent);
exports.PageSizeSmall = b;
b.defaultProps = y;