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
exports.default = undefined;
var o = s(require("./99393.js"));
var a = s(require("./8668.js"));
var r = require("./36729.js");
function s(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
function l(e, t) {
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
function u(e, t) {
  return (u = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (e, t) {
    e.__proto__ = t;
    return e;
  })(e, t);
}
var d = function (e) {
  var t;
  var n;
  function i() {
    return e.apply(this, arguments) || this;
  }
  n = e;
  (t = i).prototype = Object.create(n.prototype);
  t.prototype.constructor = t;
  u(t, n);
  var o;
  var a;
  var s;
  var d = i.prototype;
  d.getProps = function () {
    var t = e.prototype.getProps.call(this);
    t.onKeyDown = this._wrapKeyDownHandler(t.onKeyDown);
    return t;
  };
  d.focus = function () {
    var e;
    if ((e = this.viewRef) === null || e === undefined) {
      return undefined;
    } else {
      return e.focus.apply(e, arguments);
    }
  };
  d.activate = function () {
    var e;
    if ((e = this.viewRef) === null || e === undefined) {
      return undefined;
    } else {
      return e.activate.apply(e, arguments);
    }
  };
  d.deactivate = function () {
    var e;
    if ((e = this.viewRef) === null || e === undefined) {
      return undefined;
    } else {
      return e.deactivate.apply(e, arguments);
    }
  };
  d._getActionConfigs = function () {
    return {
      onClick: {
        excludeValidators: ["readOnly"]
      },
      onSubmit: {}
    };
  };
  o = i;
  if (a = [{
    key: "_propsInfo",
    get: function () {
      return {
        twoWay: [],
        allowNull: [],
        elements: ["onSubmit"],
        templates: ["template", "iconTemplate"],
        props: ["activeStateEnabled", "hoverStateEnabled", "icon", "iconPosition", "onClick", "onSubmit", "pressed", "stylingMode", "template", "iconTemplate", "text", "type", "useInkRipple", "useSubmitBehavior", "templateData", "className", "accessKey", "disabled", "focusStateEnabled", "height", "hint", "onKeyDown", "rtlEnabled", "tabIndex", "visible", "width"]
      };
    }
  }, {
    key: "_viewComponent",
    get: function () {
      return r.Button;
    }
  }]) {
    l(o.prototype, a);
  }
  if (s) {
    l(o, s);
  }
  Object.defineProperty(o, "prototype", {
    writable: false
  });
  return i;
}(a.default);
exports.default = d;
(0, o.default)("dxButton", d);
d.defaultOptions = r.defaultOptions;
module.exports = exports.default;
module.exports.default = exports.default;