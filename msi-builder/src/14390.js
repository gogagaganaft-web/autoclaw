exports.default = undefined;
var i = p(require("./68374.js"));
var o = p(require("./62414.js"));
var a = p(require("./13046.js"));
var r = require("./72918.js");
var s = require("./20576.js");
var l = require("./95479.js");
var u = require("./13306.js");
var d = require("./31421.js");
var c = require("./35922.js");
var h = p(require("./20530.js"));
var f = require("./58020.js");
function p(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
function g(e) {
  return (g = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function (e) {
    return typeof e;
  } : function (e) {
    if (e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype) {
      return "symbol";
    } else {
      return typeof e;
    }
  })(e);
}
function m(e, t, n) {
  if ((t = function (e) {
    var t = function (e, t) {
      if (g(e) !== "object" || e === null) {
        return e;
      }
      var n = e[Symbol.toPrimitive];
      if (n !== undefined) {
        var i = n.call(e, t || "default");
        if (g(i) !== "object") {
          return i;
        }
        throw new TypeError("@@toPrimitive must return a primitive value.");
      }
      return (t === "string" ? String : Number)(e);
    }(e, "string");
    if (g(t) === "symbol") {
      return t;
    } else {
      return String(t);
    }
  }(t)) in e) {
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
function _(e, t, n) {
  e = e === "role" || e === "id" ? e : `aria-${e}`;
  t = (0, c.isDefined)(t) ? t.toString() : null;
  n.attr(e, t);
}
require("./95429.js");
require("./91633.js");
require("./24028.js");
var v = a.default.inherit({
  _feedbackHideTimeout: 400,
  _feedbackShowTimeout: 30,
  _supportedKeys: function () {
    return {};
  },
  _getDefaultOptions: function () {
    return (0, u.extend)(this.callBase(), {
      hoveredElement: null,
      isActive: false,
      disabled: false,
      visible: true,
      hint: undefined,
      activeStateEnabled: false,
      onContentReady: null,
      hoverStateEnabled: false,
      focusStateEnabled: false,
      tabIndex: 0,
      accessKey: undefined,
      onFocusIn: null,
      onFocusOut: null,
      onKeyboardHandled: null,
      ignoreParentReadOnly: false,
      useResizeObserver: true
    });
  },
  _defaultOptionsRules: function () {
    return this.callBase().concat([{
      device: function () {
        var e = h.default.real();
        var t = e.platform;
        var n = e.version;
        return t === "ios" && (0, f.compare)(n, "13.3") <= 0;
      },
      options: {
        useResizeObserver: false
      }
    }]);
  },
  _init: function () {
    this.callBase();
    this._initContentReadyAction();
  },
  _innerWidgetOptionChanged: function (e, t) {
    var n = v.getOptionsFromContainer(t);
    if (e) {
      e.option(n);
    }
    this._options.cache(t.name, n);
  },
  _bindInnerWidgetOptions: function (e, t) {
    var n = this;
    function i() {
      return n._options.silent(t, (0, u.extend)({}, e.option()));
    }
    i();
    e.on("optionChanged", i);
  },
  _getAriaTarget: function () {
    return this._focusTarget();
  },
  _initContentReadyAction: function () {
    this._contentReadyAction = this._createActionByOption("onContentReady", {
      excludeValidators: ["disabled", "readOnly"]
    });
  },
  _initMarkup: function () {
    var e = this.option();
    var t = e.disabled;
    var n = e.visible;
    this.$element().addClass("dx-widget");
    this._toggleDisabledState(t);
    this._toggleVisibility(n);
    this._renderHint();
    if (this._isFocusable()) {
      this._renderFocusTarget();
    }
    this.callBase();
  },
  _render: function () {
    this.callBase();
    this._renderContent();
    this._renderFocusState();
    this._attachFeedbackEvents();
    this._attachHoverEvents();
    this._toggleIndependentState();
  },
  _renderHint: function () {
    var e = this.option().hint;
    this.$element().attr("title", e || null);
  },
  _renderContent: function () {
    var e = this;
    (0, s.deferRender)(function () {
      if (e._disposed) {
        return undefined;
      } else {
        return e._renderContentImpl();
      }
    }).done(function () {
      if (e._disposed) {
        return undefined;
      } else {
        return e._fireContentReadyAction();
      }
    });
  },
  _renderContentImpl: s.noop,
  _fireContentReadyAction: (0, s.deferRenderer)(function () {
    return this._contentReadyAction();
  }),
  _dispose: function () {
    this._contentReadyAction = null;
    this._detachKeyboardEvents();
    this.callBase();
  },
  _resetActiveState: function () {
    this._toggleActiveState(this._eventBindingTarget(), false);
  },
  _clean: function () {
    this._cleanFocusState();
    this._resetActiveState();
    this.callBase();
    this.$element().empty();
  },
  _toggleVisibility: function (e) {
    this.$element().toggleClass("dx-state-invisible", !e);
  },
  _renderFocusState: function () {
    this._attachKeyboardEvents();
    if (this._isFocusable()) {
      this._renderFocusTarget();
      this._attachFocusEvents();
      this._renderAccessKey();
    }
  },
  _renderAccessKey: function () {
    var e = this._focusTarget();
    var t = this.option().accessKey;
    e.attr("accesskey", t);
  },
  _isFocusable: function () {
    var e = this.option();
    var t = e.focusStateEnabled;
    var n = e.disabled;
    return t && !n;
  },
  _eventBindingTarget: function () {
    return this.$element();
  },
  _focusTarget: function () {
    return this._getActiveElement();
  },
  _isFocusTarget: function (e) {
    return (0, i.default)(this._focusTarget()).toArray().includes(e);
  },
  _findActiveTarget: function (e) {
    return e.find(this._activeStateUnit).not(".dx-state-disabled");
  },
  _getActiveElement: function () {
    var e = this._eventBindingTarget();
    if (this._activeStateUnit) {
      return this._findActiveTarget(e);
    } else {
      return e;
    }
  },
  _renderFocusTarget: function () {
    var e = this.option().tabIndex;
    this._focusTarget().attr("tabIndex", e);
  },
  _keyboardEventBindingTarget: function () {
    return this._eventBindingTarget();
  },
  _refreshFocusEvent: function () {
    this._detachFocusEvents();
    this._attachFocusEvents();
  },
  _focusEventTarget: function () {
    return this._focusTarget();
  },
  _focusInHandler: function (e) {
    var t = this;
    if (!e.isDefaultPrevented()) {
      this._createActionByOption("onFocusIn", {
        beforeExecute: function () {
          return t._updateFocusState(e, true);
        },
        excludeValidators: ["readOnly"]
      })({
        event: e
      });
    }
  },
  _focusOutHandler: function (e) {
    var t = this;
    if (!e.isDefaultPrevented()) {
      this._createActionByOption("onFocusOut", {
        beforeExecute: function () {
          return t._updateFocusState(e, false);
        },
        excludeValidators: ["readOnly", "disabled"]
      })({
        event: e
      });
    }
  },
  _updateFocusState: function (e, t) {
    var n = e.target;
    if (this._isFocusTarget(n)) {
      this._toggleFocusClass(t, (0, i.default)(n));
    }
  },
  _toggleFocusClass: function (e, t) {
    (t && t.length ? t : this._focusTarget()).toggleClass("dx-state-focused", e);
  },
  _hasFocusClass: function (e) {
    return (0, i.default)(e || this._focusTarget()).hasClass("dx-state-focused");
  },
  _isFocused: function () {
    return this._hasFocusClass();
  },
  _getKeyboardListeners: function () {
    return [];
  },
  _attachKeyboardEvents: function () {
    var e = this;
    this._detachKeyboardEvents();
    var t = this.option();
    var n = t.focusStateEnabled;
    var i = t.onKeyboardHandled;
    var o = this._getKeyboardListeners().length;
    if (n || o || !!i) {
      this._keyboardListenerId = r.keyboard.on(this._keyboardEventBindingTarget(), this._focusTarget(), function (t) {
        return e._keyboardHandler(t);
      });
    }
  },
  _keyboardHandler: function (e, t) {
    if (!t) {
      var n = e.originalEvent;
      var i = e.keyName;
      var o = e.which;
      var a = this._supportedKeys(n);
      var r = a[i] || a[o];
      if (r !== undefined) {
        if (!r.bind(this)(n, e)) {
          return false;
        }
      }
    }
    var s = this._getKeyboardListeners();
    var l = this.option().onKeyboardHandled;
    s.forEach(function (t) {
      return t && t._keyboardHandler(e);
    });
    if (l) {
      l(e);
    }
    return true;
  },
  _refreshFocusState: function () {
    this._cleanFocusState();
    this._renderFocusState();
  },
  _cleanFocusState: function () {
    this._focusTarget().removeAttr("tabIndex");
    this._toggleFocusClass(false);
    this._detachFocusEvents();
    this._detachKeyboardEvents();
  },
  _detachKeyboardEvents: function () {
    r.keyboard.off(this._keyboardListenerId);
    this._keyboardListenerId = null;
  },
  _attachHoverEvents: function () {
    var e = this;
    var t = this.option().hoverStateEnabled;
    var n = this._activeStateUnit;
    var a = this._eventBindingTarget();
    r.hover.off(a, {
      selector: n,
      namespace: "UIFeedback"
    });
    if (t) {
      r.hover.on(a, new o.default(function (t) {
        var n = t.event;
        var o = t.element;
        e._hoverStartHandler(n);
        e.option("hoveredElement", (0, i.default)(o));
      }, {
        excludeValidators: ["readOnly"]
      }), function (t) {
        e.option("hoveredElement", null);
        e._hoverEndHandler(t);
      }, {
        selector: n,
        namespace: "UIFeedback"
      });
    }
  },
  _attachFeedbackEvents: function () {
    var e = this;
    var t = this.option().activeStateEnabled;
    var n = this._activeStateUnit;
    var a = this._eventBindingTarget();
    r.active.off(a, {
      namespace: "UIFeedback",
      selector: n
    });
    if (t) {
      r.active.on(a, new o.default(function (t) {
        var n = t.event;
        var o = t.element;
        return e._toggleActiveState((0, i.default)(o), true, n);
      }), new o.default(function (t) {
        var n = t.event;
        var o = t.element;
        return e._toggleActiveState((0, i.default)(o), false, n);
      }, {
        excludeValidators: ["disabled", "readOnly"]
      }), {
        showTimeout: this._feedbackShowTimeout,
        hideTimeout: this._feedbackHideTimeout,
        selector: n,
        namespace: "UIFeedback"
      });
    }
  },
  _detachFocusEvents: function () {
    var e = this._focusEventTarget();
    r.focus.off(e, {
      namespace: `${this.NAME}Focus`
    });
  },
  _attachFocusEvents: function () {
    var e = this;
    var t = this._focusEventTarget();
    r.focus.on(t, function (t) {
      return e._focusInHandler(t);
    }, function (t) {
      return e._focusOutHandler(t);
    }, {
      namespace: `${this.NAME}Focus`,
      isFocusable: function (e, t) {
        return (0, i.default)(t).is(d.focusable);
      }
    });
  },
  _hoverStartHandler: s.noop,
  _hoverEndHandler: s.noop,
  _toggleActiveState: function (e, t) {
    this.option("isActive", t);
    e.toggleClass("dx-state-active", t);
  },
  _updatedHover: function () {
    var e = this._options.silent("hoveredElement");
    this._hover(e, e);
  },
  _findHoverTarget: function (e) {
    return e && e.closest(this._activeStateUnit || this._eventBindingTarget());
  },
  _hover: function (e, t) {
    var n = this.option();
    var i = n.hoverStateEnabled;
    var o = n.disabled;
    var a = n.isActive;
    if (t = this._findHoverTarget(t)) {
      t.toggleClass("dx-state-hover", false);
    }
    if (e && i && !o && !a) {
      var r = this._findHoverTarget(e);
      if (r) {
        r.toggleClass("dx-state-hover", true);
      }
    }
  },
  _toggleDisabledState: function (e) {
    this.$element().toggleClass("dx-state-disabled", Boolean(e));
    this.setAria("disabled", e || undefined);
  },
  _toggleIndependentState: function () {
    this.$element().toggleClass("dx-state-independent", this.option("ignoreParentReadOnly"));
  },
  _setWidgetOption: function (e, t) {
    var n = this;
    if (this[e]) {
      if ((0, c.isPlainObject)(t[0])) {
        (0, l.each)(t[0], function (t, i) {
          return n._setWidgetOption(e, [t, i]);
        });
      } else {
        var i = t[0];
        var o = t[1];
        if (t.length === 1) {
          o = this.option(i);
        }
        var a = this[`${e}OptionMap`];
        this[e].option(a ? a(i) : i, o);
      }
    }
  },
  _optionChanged: function (e) {
    var t = e.name;
    var n = e.value;
    var i = e.previousValue;
    switch (t) {
      case "disabled":
        this._toggleDisabledState(n);
        this._updatedHover();
        this._refreshFocusState();
        break;
      case "hint":
        this._renderHint();
        break;
      case "ignoreParentReadOnly":
        this._toggleIndependentState();
        break;
      case "activeStateEnabled":
        this._attachFeedbackEvents();
        break;
      case "hoverStateEnabled":
        this._attachHoverEvents();
        this._updatedHover();
        break;
      case "tabIndex":
      case "focusStateEnabled":
        this._refreshFocusState();
        break;
      case "onFocusIn":
      case "onFocusOut":
      case "useResizeObserver":
        break;
      case "accessKey":
        this._renderAccessKey();
        break;
      case "hoveredElement":
        this._hover(n, i);
        break;
      case "isActive":
        this._updatedHover();
        break;
      case "visible":
        this._toggleVisibility(n);
        if (this._isVisibilityChangeSupported()) {
          this._checkVisibilityChanged(n ? "shown" : "hiding");
        }
        break;
      case "onKeyboardHandled":
        this._attachKeyboardEvents();
        break;
      case "onContentReady":
        this._initContentReadyAction();
        break;
      default:
        this.callBase(e);
    }
  },
  _isVisible: function () {
    var e = this.option().visible;
    return this.callBase() && e;
  },
  beginUpdate: function () {
    this._ready(false);
    this.callBase();
  },
  endUpdate: function () {
    this.callBase();
    if (this._initialized) {
      this._ready(true);
    }
  },
  _ready: function (e) {
    if (arguments.length === 0) {
      return this._isReady;
    }
    this._isReady = e;
  },
  setAria: function () {
    if ((0, c.isPlainObject)(arguments.length <= 0 ? undefined : arguments[0])) {
      var e = (arguments.length <= 1 ? undefined : arguments[1]) || this._getAriaTarget();
      (0, l.each)(arguments.length <= 0 ? undefined : arguments[0], function (t, n) {
        return _(t, n, e);
      });
    } else {
      _(arguments.length <= 0 ? undefined : arguments[0], arguments.length <= 1 ? undefined : arguments[1], (arguments.length <= 2 ? undefined : arguments[2]) || this._getAriaTarget());
    }
  },
  isReady: function () {
    return this._ready();
  },
  repaint: function () {
    this._refresh();
  },
  focus: function () {
    r.focus.trigger(this._focusTarget());
  },
  registerKeyHandler: function (e, t) {
    var n = this._supportedKeys();
    this._supportedKeys = function () {
      return (0, u.extend)(n, m({}, e, t));
    };
  }
});
v.getOptionsFromContainer = function (e) {
  var t = e.name;
  var n = e.fullName;
  var i = e.value;
  var o = {};
  if (t === n) {
    o = i;
  } else {
    o[n.split(".").pop()] = i;
  }
  return o;
};
var y = v;
exports.default = y;
module.exports = exports.default;
module.exports.default = exports.default;