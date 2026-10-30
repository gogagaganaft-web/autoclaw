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
exports.viewFunction = exports.CheckBoxIconProps = exports.CheckBoxIcon = undefined;
var o;
var a = require("./55285.js");
var r = require("./44105.js");
var s = (o = require("./89357.js")) && o.__esModule ? o : {
  default: o
};
var l = require("./58201.js");
var u = require("./80968.js");
var d = require("./35922.js");
var c = require("./71591.js");
var h = ["isChecked", "size"];
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
function m(e) {
  if (e === undefined) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return e;
}
function _(e, t) {
  return (_ = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (e, t) {
    e.__proto__ = t;
    return e;
  })(e, t);
}
function v(e) {
  var t = e.cssStyles;
  var n = e.elementRef;
  return (0, a.createVNode)(1, "span", "dx-checkbox-icon", null, 1, {
    style: (0, r.normalizeStyles)(t)
  }, null, n);
}
exports.viewFunction = v;
var y = {
  isChecked: false
};
exports.CheckBoxIconProps = y;
var b = function (e) {
  var t;
  var n;
  function i(t) {
    var n;
    (n = e.call(this, t) || this).state = {};
    n.elementRef = (0, a.createRef)();
    n.__getterCache = {};
    n.updateFontSize = n.updateFontSize.bind(m(n));
    n.setIconFontSize = n.setIconFontSize.bind(m(n));
    n.getIconSize = n.getIconSize.bind(m(n));
    n.getComputedIconSize = n.getComputedIconSize.bind(m(n));
    return n;
  }
  n = e;
  (t = i).prototype = Object.create(n.prototype);
  t.prototype.constructor = t;
  _(t, n);
  var o;
  var y;
  var b;
  var x = i.prototype;
  x.createEffects = function () {
    return [new r.InfernoEffect(this.updateFontSize, [this.props.isChecked, this.props.size])];
  };
  x.updateEffects = function () {
    var e;
    if ((e = this._effects[0]) !== null && e !== undefined) {
      e.update([this.props.isChecked, this.props.size]);
    }
  };
  x.updateFontSize = function () {
    var e = this.props;
    var t = e.isChecked;
    var n = e.size;
    if ((0, l.hasWindow)() && n) {
      var i = this.getIconSize(n);
      var o = (0, c.getFontSizeByIconSize)(i, t);
      this.setIconFontSize(o);
    }
  };
  x.setIconFontSize = function (e) {
    this.elementRef.current.style.fontSize = `${e}px`;
  };
  x.getIconSize = function (e) {
    if ((0, d.isNumeric)(e)) {
      return e;
    } else if (e.endsWith("px")) {
      return parseInt(e, 10);
    } else {
      return this.getComputedIconSize();
    }
  };
  x.getComputedIconSize = function () {
    var e = this.elementRef.current;
    var t = (0, s.default)(e);
    return parseInt(t == null ? undefined : t.width, 10);
  };
  x.componentWillUpdate = function (t, n, i) {
    e.prototype.componentWillUpdate.call(this);
    if (this.props.size !== t.size) {
      this.__getterCache.cssStyles = undefined;
    }
  };
  x.render = function () {
    var e = this.props;
    return v({
      props: p({}, e),
      elementRef: this.elementRef,
      setIconFontSize: this.setIconFontSize,
      getIconSize: this.getIconSize,
      getComputedIconSize: this.getComputedIconSize,
      cssStyles: this.cssStyles,
      restAttributes: this.restAttributes
    });
  };
  o = i;
  if (y = [{
    key: "cssStyles",
    get: function () {
      var e;
      var t;
      var n = this;
      if (this.__getterCache.cssStyles !== undefined) {
        return this.__getterCache.cssStyles;
      } else {
        return this.__getterCache.cssStyles = (e = n.props.size, t = (0, u.normalizeStyleProp)("width", e), {
          height: (0, u.normalizeStyleProp)("height", e),
          width: t
        });
      }
    }
  }, {
    key: "restAttributes",
    get: function () {
      var e = this.props;
      e.isChecked;
      e.size;
      return f(e, h);
    }
  }]) {
    g(o.prototype, y);
  }
  if (b) {
    g(o, b);
  }
  Object.defineProperty(o, "prototype", {
    writable: false
  });
  return i;
}(r.InfernoComponent);
exports.CheckBoxIcon = b;
b.defaultProps = y;