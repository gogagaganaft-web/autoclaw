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
var o = require("./55285.js");
var a = g(require("./51661.js"));
var r = g(require("./15334.js"));
var s = g(require("./68374.js"));
var l = g(require("./73349.js"));
var u = g(require("./13046.js"));
var d = require("./13306.js");
var c = require("./6415.js");
var h = require("./35922.js");
var f = require("./93407.js");
var p = require("./36583.js");
function g(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
function m(e) {
  return function (e) {
    if (Array.isArray(e)) {
      return x(e);
    }
  }(e) || function (e) {
    if (typeof Symbol != "undefined" && e[Symbol.iterator] != null || e["@@iterator"] != null) {
      return Array.from(e);
    }
  }(e) || b(e) || function () {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }();
}
function _(e, t, n) {
  if ((t = C(t)) in e) {
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
function v() {
  return (v = Object.assign ? Object.assign.bind() : function (e) {
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
function y(e, t) {
  return function (e) {
    if (Array.isArray(e)) {
      return e;
    }
  }(e) || function (e, t) {
    var n = e == null ? null : typeof Symbol != "undefined" && e[Symbol.iterator] || e["@@iterator"];
    if (n != null) {
      var i;
      var o;
      var a;
      var r;
      var s = [];
      var l = true;
      var u = false;
      try {
        a = (n = n.call(e)).next;
        if (t === 0) {
          if (Object(n) !== n) {
            return;
          }
          l = false;
        } else {
          for (; !(l = (i = a.call(n)).done) && (s.push(i.value), s.length !== t); l = true);
        }
      } catch (e) {
        u = true;
        o = e;
      } finally {
        try {
          if (!l && n.return != null && (r = n.return(), Object(r) !== r)) {
            return;
          }
        } finally {
          if (u) {
            throw o;
          }
        }
      }
      return s;
    }
  }(e, t) || b(e, t) || function () {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }();
}
function b(e, t) {
  if (e) {
    if (typeof e == "string") {
      return x(e, t);
    }
    var n = Object.prototype.toString.call(e).slice(8, -1);
    if (n === "Object" && e.constructor) {
      n = e.constructor.name;
    }
    if (n === "Map" || n === "Set") {
      return Array.from(e);
    } else if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) {
      return x(e, t);
    } else {
      return undefined;
    }
  }
}
function x(e, t) {
  if (t == null || t > e.length) {
    t = e.length;
  }
  for (var n = 0, i = new Array(t); n < t; n++) {
    i[n] = e[n];
  }
  return i;
}
function w(e, t) {
  for (var n = 0; n < t.length; n++) {
    var i = t[n];
    i.enumerable = i.enumerable || false;
    i.configurable = true;
    if ("value" in i) {
      i.writable = true;
    }
    Object.defineProperty(e, C(i.key), i);
  }
}
function C(e) {
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
function S(e, t) {
  return (S = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (e, t) {
    e.__proto__ = t;
    return e;
  })(e, t);
}
require("./95429.js");
require("./91633.js");
require("./24028.js");
function k(e, t) {
  return function (n) {
    if (Object.prototype.hasOwnProperty.call(e, n) && e[n] === undefined) {
      e[n] = t(n);
    }
  };
}
var D = function (e) {
  var t;
  var n;
  function i(t, n) {
    var i;
    (i = e.call(this, t, n) || this)._shouldRaiseContentReady = false;
    i.validateKeyDownHandler();
    return i;
  }
  n = e;
  (t = i).prototype = Object.create(n.prototype);
  t.prototype.constructor = t;
  S(t, n);
  var u;
  var g;
  var b;
  var x = i.prototype;
  x.validateKeyDownHandler = function () {
    var e = this.getSupportedKeyNames().length > 0;
    var t = typeof this._viewComponent.prototype.keyDown == "function";
    if (e && !t) {
      throw Error("Component's declaration must have 'keyDown' method.");
    }
  };
  x._checkContentReadyOption = function (e) {
    var t = this._getContentReadyOptions().reduce(function (e, t) {
      e[t] = true;
      return e;
    }, {});
    this._checkContentReadyOption = function (e) {
      return !!t[e];
    };
    return this._checkContentReadyOption(e);
  };
  x._getContentReadyOptions = function () {
    return ["rtlEnabled"];
  };
  x._fireContentReady = function () {
    this._actionsMap.onContentReady({});
  };
  x._getDefaultOptions = function () {
    var t = this;
    var n = this._getViewComponentDefaultProps();
    return (0, d.extend)(true, e.prototype._getDefaultOptions.call(this), n, this._propsInfo.twoWay.reduce(function (e, i) {
      var o;
      var a = y(i, 3);
      var r = a[0];
      var s = a[1];
      var l = a[2];
      return v({}, e, (_(o = {}, r, n[s]), _(o, l, function (e) {
        return t.option(r, e);
      }), o));
    }, {}), this._propsInfo.templates.reduce(function (e, t) {
      return v({}, e, _({}, t, null));
    }, {}));
  };
  x._getUnwrappedOption = function () {
    var e = this;
    var t = {};
    Object.keys(this.option()).forEach(function (n) {
      t[n] = e.option(n);
    });
    return t;
  };
  x._initializeComponent = function () {
    var t;
    var n = this;
    e.prototype._initializeComponent.call(this);
    if ((t = this._templateManager) !== null && t !== undefined) {
      t.addDefaultTemplates(this.getDefaultTemplates());
    }
    var i = this._getUnwrappedOption();
    this._props = this._optionsWithDefaultTemplates(i);
    this._propsInfo.templates.forEach(function (e) {
      n._componentTemplates[e] = n._createTemplateComponent(n._props[e]);
    });
    Object.keys(this._getActionConfigsFull()).forEach(function (e) {
      return n._addAction(e);
    });
    this._viewRef = (0, o.createRef)();
    this.defaultKeyHandlers = this._createDefaultKeyHandlers();
  };
  x._initMarkup = function () {
    var e = this.getProps();
    this._renderWrapper(e);
  };
  x._renderWrapper = function (e) {
    var t = this.$element()[0];
    if (!this._isNodeReplaced) {
      r.default.onPreRender();
    }
    r.default.render(this._viewComponent, e, t, this._isNodeReplaced);
    if (!this._isNodeReplaced) {
      this._isNodeReplaced = true;
      r.default.onAfterRender();
      this._shouldRaiseContentReady = true;
    }
    if (this._shouldRaiseContentReady) {
      this._fireContentReady();
      this._shouldRaiseContentReady = false;
    }
  };
  x._silent = function (e, t) {
    this._options.silent(e, t);
  };
  x._render = function () {};
  x._removeWidget = function () {
    r.default.remove(this.$element()[0]);
  };
  x._dispose = function () {
    this._removeWidget();
    e.prototype._dispose.call(this);
  };
  x._getAdditionalActionConfigs = function () {
    return {
      onContentReady: {
        excludeValidators: ["disabled", "readOnly"]
      }
    };
  };
  x._getAdditionalProps = function () {
    return [];
  };
  x._patchOptionValues = function (e) {
    var t = this;
    var n = this._propsInfo;
    var i = n.allowNull;
    var o = n.elements;
    var a = n.props;
    var r = n.twoWay;
    var s = this._getViewComponentDefaultProps();
    var l = Object.keys(s);
    var u = this._getDefaultOptions();
    var d = e.children;
    var c = e.onKeyboardHandled;
    var f = {
      ref: e.ref,
      children: d,
      onKeyDown: c ? function (e, t) {
        c(t);
      } : undefined
    };
    [].concat(m(a), m(this._getAdditionalProps())).forEach(function (t) {
      if (Object.prototype.hasOwnProperty.call(e, t)) {
        f[t] = e[t];
      }
    });
    i.forEach(k(f, function () {
      return null;
    }));
    l.forEach(k(f, function (e) {
      return u[e];
    }));
    r.forEach(function (e) {
      var t = y(e, 2);
      var n = t[0];
      var i = t[1];
      k(f, function () {
        return u[i];
      })(n);
    });
    o.forEach(function (e) {
      if (e in f) {
        var n = f[e];
        if ((0, h.isRenderer)(n)) {
          f[e] = t._patchElementParam(n);
        }
      }
    });
    return f;
  };
  x.getSupportedKeyNames = function () {
    return [];
  };
  x.prepareStyleProp = function (e) {
    if (typeof e.style == "string") {
      return v({}, e, {
        style: {},
        cssText: e.style
      });
    } else {
      return e;
    }
  };
  x.getProps = function () {
    var n = this;
    var i = this.option().elementAttr;
    var o = this._patchOptionValues(v({}, this._props, {
      ref: this._viewRef,
      children: this._extractDefaultSlot(),
      aria: this._aria
    }));
    this._propsInfo.templates.forEach(function (e) {
      o[e] = n._componentTemplates[e];
    });
    return this.prepareStyleProp(v({}, o, this.elementAttr, i, {
      className: [].concat(m((this.elementAttr.class ?? "").split(" ")), m(((i == null ? undefined : i.class) ?? "").split(" "))).filter(function (e, t, n) {
        return e && n.indexOf(e) === t;
      }).join(" ").trim(),
      class: ""
    }, this._actionsMap));
  };
  x._getActionConfigs = function () {
    return {};
  };
  x._getActionConfigsFull = function () {
    return v({}, this._getActionConfigs(), this._getAdditionalActionConfigs());
  };
  x.getDefaultTemplates = function () {
    var e = Object.values(this._templatesInfo);
    var t = {};
    e.forEach(function (e) {
      t[e] = "dx-renovation-template-mock";
    });
    return t;
  };
  x._optionsWithDefaultTemplates = function (e) {
    var t = Object.entries(this._templatesInfo).reduce(function (t, n) {
      var o = y(n, 2);
      var a = o[0];
      var r = o[1];
      return v({}, t, _({}, a, e[a] ?? r));
    }, {});
    return v({}, e, t);
  };
  x._init = function () {
    e.prototype._init.call(this);
    this.customKeyHandlers = {};
    this._actionsMap = {};
    this._aria = {};
    this._componentTemplates = {};
  };
  x._createDefaultKeyHandlers = function () {
    var e = this;
    var t = {};
    this.getSupportedKeyNames().forEach(function (n) {
      t[n] = function (t) {
        return e.viewRef.keyDown(a.default.createKeyDownOptions(t));
      };
    });
    return t;
  };
  x._addAction = function (e, t) {
    var n = t;
    if (!n) {
      var i = this._createActionByOption(e, this._getActionConfigsFull()[e]);
      n = function (e) {
        Object.keys(e).forEach(function (t) {
          if ((0, h.isDefined)(e[t]) && l.default.isNode(e[t])) {
            e[t] = (0, c.getPublicElement)((0, s.default)(e[t]));
          }
        });
        return i(e);
      };
    }
    this._actionsMap[e] = n;
  };
  x._optionChanged = function (t) {
    var n = t.fullName;
    var i = t.name;
    var o = t.previousValue;
    var a = t.value;
    (0, p.updatePropsImmutable)(this._props, this.option(), i, n);
    if (this._propsInfo.templates.includes(i) && a !== o) {
      this._componentTemplates[i] = this._createTemplateComponent(a);
    }
    if (i && this._getActionConfigsFull()[i]) {
      this._addAction(i);
    }
    this._shouldRaiseContentReady = this._shouldRaiseContentReady || this._checkContentReadyOption(n);
    e.prototype._optionChanged.call(this, t);
    this._invalidate();
  };
  x._extractDefaultSlot = function () {
    if (this.option("_hasAnonymousTemplateContent")) {
      return r.default.createElement(f.TemplateWrapper, {
        template: this._getTemplate(this._templateManager.anonymousTemplateName),
        transclude: true,
        renovated: true
      });
    } else {
      return null;
    }
  };
  x._createTemplateComponent = function (e) {
    if (e) {
      var t = this._getTemplate(e);
      if (!(0, h.isString)(t) || t !== "dx-renovation-template-mock") {
        return function (e) {
          return r.default.createElement(f.TemplateWrapper, (0, f.buildTemplateArgs)(e, t));
        };
      }
    }
  };
  x._wrapKeyDownHandler = function (e) {
    var t = this;
    return function (n) {
      var i = n.keyName;
      var o = n.originalEvent;
      var a = n.which;
      var r = t.customKeyHandlers;
      var s = r[i] || r[a];
      if (s !== undefined && !s.bind(t)(o, n)) {
        o.cancel = true;
        return o;
      }
      if (e == null) {
        return undefined;
      } else {
        return e(o, n);
      }
    };
  };
  x._toPublicElement = function (e) {
    return (0, c.getPublicElement)((0, s.default)(e));
  };
  x._patchElementParam = function (e) {
    try {
      var t = (0, s.default)(e);
      var n = t == null ? undefined : t.get(0);
      if (n != null && n.nodeType) {
        return n;
      } else {
        return e;
      }
    } catch (t) {
      return e;
    }
  };
  x.repaint = function () {
    this._isNodeReplaced = false;
    this._shouldRaiseContentReady = true;
    this._removeWidget();
    this._refresh();
  };
  x._supportedKeys = function () {
    return v({}, this.defaultKeyHandlers, this.customKeyHandlers);
  };
  x.registerKeyHandler = function (e, t) {
    this.customKeyHandlers[e] = t;
  };
  x.setAria = function (e, t) {
    this._aria[e] = t;
    this._initMarkup();
  };
  x._getViewComponentDefaultProps = function () {
    return this._viewComponent.defaultProps || {};
  };
  u = i;
  if (g = [{
    key: "_propsInfo",
    get: function () {
      return {
        allowNull: [],
        twoWay: [],
        elements: [],
        templates: [],
        props: []
      };
    }
  }, {
    key: "viewRef",
    get: function () {
      return this._viewRef?.current;
    }
  }, {
    key: "elementAttr",
    get: function () {
      var e = this;
      var t = this.$element()[0];
      if (!this._elementAttr) {
        var n = t.attributes;
        var i = Array.from(n).filter(function (t) {
          return !e._propsInfo.templates.includes(t.name) && n[t.name]?.specified;
        }).reduce(function (e, n) {
          var i = n.name;
          var o = n.value;
          var a = e;
          var r = i in t;
          a[i] = o === "" && r ? t[i] : o;
          return a;
        }, {});
        this._elementAttr = i;
        this._storedClasses = t.getAttribute("class") || "";
      }
      for (var o = t.style, a = {}, r = 0; r < o.length; r += 1) {
        a[o[r]] = o.getPropertyValue(o[r]);
      }
      this._elementAttr.style = a;
      this._elementAttr.class = this._storedClasses;
      return this._elementAttr;
    }
  }, {
    key: "_templatesInfo",
    get: function () {
      return {};
    }
  }]) {
    w(u.prototype, g);
  }
  if (b) {
    w(u, b);
  }
  Object.defineProperty(u, "prototype", {
    writable: false
  });
  return i;
}(u.default);
exports.default = D;
D.IS_RENOVATED_WIDGET = false;
D.IS_RENOVATED_WIDGET = true;
module.exports = exports.default;
module.exports.default = exports.default;