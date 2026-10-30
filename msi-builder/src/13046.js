exports.default = undefined;
var i = y(require("./68374.js"));
var o = y(require("./80209.js"));
var a = y(require("./17381.js"));
var r = y(require("./55814.js"));
var s = require("./44297.js");
var l = require("./14192.js");
var u = require("./9321.js");
var d = require("./90330.js");
var c = require("./97906.js");
var h = require("./95479.js");
var f = require("./13306.js");
var p = require("./6415.js");
var g = require("./20576.js");
var m = require("./35922.js");
var _ = require("./58201.js");
var v = require("./72918.js");
function y(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
var b = s.Component.abstract;
var x = s.Component.inherit({
  _getDefaultOptions: function () {
    return (0, f.extend)(this.callBase(), {
      width: undefined,
      height: undefined,
      rtlEnabled: (0, o.default)().rtlEnabled,
      elementAttr: {},
      disabled: false,
      integrationOptions: {}
    }, this._useTemplates() ? l.TemplateManager.createDefaultOptions() : {});
  },
  ctor: function (e, t) {
    this._customClass = null;
    this._createElement(e);
    (0, u.attachInstanceToElement)(this._$element, this, this._dispose);
    this.callBase(t);
  },
  _createElement: function (e) {
    this._$element = (0, i.default)(e);
  },
  _getSynchronizableOptionsForCreateComponent: function () {
    return ["rtlEnabled", "disabled", "templatesRenderAsynchronously"];
  },
  _checkFunctionValueDeprecation: function (e) {
    var t = this;
    if (!this.option("_ignoreFunctionValueDeprecation")) {
      e.forEach(function (e) {
        if ((0, m.isFunction)(t.option(e))) {
          a.default.log("W0017", e);
        }
      });
    }
  },
  _visibilityChanged: b,
  _dimensionChanged: b,
  _init: function () {
    this.callBase();
    this._checkFunctionValueDeprecation(["width", "height", "maxHeight", "maxWidth", "minHeight", "minWidth", "popupHeight", "popupWidth"]);
    this._attachWindowResizeCallback();
    this._initTemplateManager();
  },
  _setOptionsByDevice: function (e) {
    this.callBase([].concat(this.constructor._classCustomRules || [], e || []));
  },
  _isInitialOptionValue: function (e) {
    return (!this.constructor._classCustomRules || !Object.prototype.hasOwnProperty.call(this._convertRulesToOptions(this.constructor._classCustomRules), e)) && this.callBase(e);
  },
  _attachWindowResizeCallback: function () {
    if (this._isDimensionChangeSupported()) {
      var e = this._windowResizeCallBack = this._dimensionChanged.bind(this);
      r.default.add(e);
    }
  },
  _isDimensionChangeSupported: function () {
    return this._dimensionChanged !== b;
  },
  _renderComponent: function () {
    this._initMarkup();
    if ((0, _.hasWindow)()) {
      this._render();
    }
  },
  _initMarkup: function () {
    var e = (this.option() || {}).rtlEnabled;
    this._renderElementAttributes();
    this._toggleRTLDirection(e);
    this._renderVisibilityChange();
    this._renderDimensions();
  },
  _render: function () {
    this._attachVisibilityChangeHandlers();
    (0, d.addShadowDomStyles)(this.$element());
  },
  _renderElementAttributes: function () {
    var e = (this.option() || {}).elementAttr;
    var t = (0, f.extend)({}, e);
    var n = t.class;
    delete t.class;
    this.$element().attr(t).removeClass(this._customClass).addClass(n);
    this._customClass = n;
  },
  _renderVisibilityChange: function () {
    if (this._isDimensionChangeSupported()) {
      this._attachDimensionChangeHandlers();
    }
    if (this._isVisibilityChangeSupported()) {
      this.$element().addClass("dx-visibility-change-handler");
    }
  },
  _renderDimensions: function () {
    var e = this.$element();
    var t = e.get(0);
    var n = this._getOptionValue("width", t);
    var i = this._getOptionValue("height", t);
    if (this._isCssUpdateRequired(t, i, n)) {
      e.css({
        width: n === null ? "" : n,
        height: i === null ? "" : i
      });
    }
  },
  _isCssUpdateRequired: function (e, t, n) {
    return !!(0, m.isDefined)(n) || !!(0, m.isDefined)(t) || !!e.style.width || !!e.style.height;
  },
  _attachDimensionChangeHandlers: function () {
    var e = this;
    var t = this.$element();
    var n = `${this.NAME}VisibilityChange`;
    v.resize.off(t, {
      namespace: n
    });
    v.resize.on(t, function () {
      return e._dimensionChanged();
    }, {
      namespace: n
    });
  },
  _attachVisibilityChangeHandlers: function () {
    var e = this;
    if (this._isVisibilityChangeSupported()) {
      var t = this.$element();
      var n = `${this.NAME}VisibilityChange`;
      this._isHidden = !this._isVisible();
      v.visibility.off(t, {
        namespace: n
      });
      v.visibility.on(t, function () {
        return e._checkVisibilityChanged("shown");
      }, function () {
        return e._checkVisibilityChanged("hiding");
      }, {
        namespace: n
      });
    }
  },
  _isVisible: function () {
    return this.$element().is(":visible");
  },
  _checkVisibilityChanged: function (e) {
    if (this._isVisible()) {
      if (e !== "hiding" || this._isHidden) {
        if (e === "shown" && this._isHidden) {
          this._isHidden = false;
          this._visibilityChanged(true);
        }
      } else {
        this._visibilityChanged(false);
        this._isHidden = true;
      }
    }
  },
  _isVisibilityChangeSupported: function () {
    return this._visibilityChanged !== b && (0, _.hasWindow)();
  },
  _clean: g.noop,
  _modelByElement: function () {
    var e = this.option().modelByElement;
    var t = this.$element();
    if (e) {
      return e(t);
    } else {
      return undefined;
    }
  },
  _invalidate: function () {
    if (this._isUpdateAllowed()) {
      throw a.default.Error("E0007");
    }
    this._requireRefresh = true;
  },
  _refresh: function () {
    this._clean();
    this._renderComponent();
  },
  _dispose: function () {
    if (this._templateManager) {
      this._templateManager.dispose();
    }
    this.callBase();
    this._clean();
    this._detachWindowResizeCallback();
  },
  _detachWindowResizeCallback: function () {
    if (this._isDimensionChangeSupported()) {
      r.default.remove(this._windowResizeCallBack);
    }
  },
  _toggleRTLDirection: function (e) {
    this.$element().toggleClass("dx-rtl", e);
  },
  _createComponent: function (e, t) {
    var n = this;
    var o = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    var a = (0, g.grep)(this._getSynchronizableOptionsForCreateComponent(), function (e) {
      return !(e in o);
    });
    var r = this.option();
    var s = r.integrationOptions;
    var l = this.option();
    var u = l.nestedComponentOptions;
    u = u || g.noop;
    var d = (0, f.extend)({
      integrationOptions: s
    }, u(this));
    a.forEach(function (e) {
      return d[e] = n.option(e);
    });
    this._extendConfig(o, d);
    var c = undefined;
    if ((0, m.isString)(t)) {
      var h = (0, i.default)(e)[t](o);
      c = h[t]("instance");
    } else if (e) {
      if (c = t.getInstance(e)) {
        c.option(o);
      } else {
        c = new t(e, o);
      }
    }
    if (c) {
      function p(e) {
        var t = e.name;
        var n = e.value;
        if (a.includes(t)) {
          c.option(t, n);
        }
      }
      this.on("optionChanged", p);
      c.on("disposing", function () {
        return n.off("optionChanged", p);
      });
    }
    return c;
  },
  _extendConfig: function (e, t) {
    (0, h.each)(t, function (t, n) {
      if (!Object.prototype.hasOwnProperty.call(e, t)) {
        e[t] = n;
      }
    });
  },
  _defaultActionConfig: function () {
    var e = this.$element();
    var t = this._modelByElement(e);
    return (0, f.extend)(this.callBase(), {
      context: t
    });
  },
  _defaultActionArgs: function () {
    var e = this.$element();
    var t = this._modelByElement(e);
    var n = this.element();
    return (0, f.extend)(this.callBase(), {
      element: n,
      model: t
    });
  },
  _optionChanged: function (e) {
    switch (e.name) {
      case "width":
      case "height":
        this._renderDimensions();
        break;
      case "rtlEnabled":
        this._invalidate();
        break;
      case "elementAttr":
        this._renderElementAttributes();
        break;
      case "disabled":
      case "integrationOptions":
        break;
      default:
        this.callBase(e);
    }
  },
  _removeAttributes: function (e) {
    var t = e.attributes;
    for (var n = t.length - 1; n >= 0; n--) {
      var i = t[n];
      if (i) {
        var o = i.name;
        if (!o.indexOf("aria-") || o.indexOf("dx-") !== -1 || o === "role" || o === "style" || o === "tabindex") {
          e.removeAttribute(o);
        }
      }
    }
  },
  _removeClasses: function (e) {
    e.className = e.className.split(" ").filter(function (e) {
      return e.lastIndexOf("dx-", 0) !== 0;
    }).join(" ");
  },
  _updateDOMComponent: function (e) {
    if (e) {
      this._renderComponent();
    } else if (this._requireRefresh) {
      this._requireRefresh = false;
      this._refresh();
    }
  },
  endUpdate: function () {
    var e = this._isInitializingRequired();
    this.callBase();
    if (this._isUpdateAllowed()) {
      this._updateDOMComponent(e);
    }
  },
  $element: function () {
    return this._$element;
  },
  element: function () {
    var e = this.$element();
    return (0, p.getPublicElement)(e);
  },
  dispose: function () {
    var e = this.$element().get(0);
    (0, c.cleanDataRecursive)(e, true);
    e.textContent = "";
    this._removeAttributes(e);
    this._removeClasses(e);
  },
  resetOption: function (e) {
    this.callBase(e);
    if (e === "width" || e === "height") {
      var t = this.initialOption(e);
      if (!(0, m.isDefined)(t)) {
        this.$element().css(e, "");
      }
    }
  },
  _getAnonymousTemplateName: function () {},
  _initTemplateManager: function () {
    if (!this._templateManager && this._useTemplates()) {
      var e = this.option().integrationOptions;
      var t = (e === undefined ? {} : e).createTemplate;
      this._templateManager = new l.TemplateManager(t, this._getAnonymousTemplateName());
      this._initTemplates();
    }
  },
  _initTemplates: function () {
    var e = this;
    var t = this._templateManager.extractTemplates(this.$element());
    var n = t.templates;
    var i = t.anonymousTemplateMeta;
    var o = this.option(`integrationOptions.templates.${i.name}`);
    n.forEach(function (t) {
      var n = t.name;
      var i = t.template;
      e._options.silent(`integrationOptions.templates.${n}`, i);
    });
    if (i.name && !o) {
      this._options.silent(`integrationOptions.templates.${i.name}`, i.template);
      this._options.silent("_hasAnonymousTemplateContent", true);
    }
  },
  _getTemplateByOption: function (e) {
    return this._getTemplate(this.option(e));
  },
  _getTemplate: function (e) {
    var t = this.option("integrationOptions.templates");
    var n = this.option("templatesRenderAsynchronously");
    var i = this.option("integrationOptions.skipTemplates");
    return this._templateManager.getTemplate(e, t, {
      isAsyncTemplate: n,
      skipTemplates: i
    }, this);
  },
  _saveTemplate: function (e, t) {
    this._setOptionWithoutOptionChange("integrationOptions.templates." + e, this._templateManager._createTemplate(t));
  },
  _useTemplates: function () {
    return true;
  }
});
x.getInstance = function (e) {
  return (0, u.getInstanceByElement)((0, i.default)(e), this);
};
x.defaultOptions = function (e) {
  this._classCustomRules = this._classCustomRules || [];
  this._classCustomRules.push(e);
};
var w = x;
exports.default = w;
module.exports = exports.default;
module.exports.default = exports.default;