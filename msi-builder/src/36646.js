exports.default = undefined;
var i = b(require("./44687.js"));
var o = b(require("./88718.js"));
var a = require("./20576.js");
var r = require("./35922.js");
var s = require("./95479.js");
var l = require("./31421.js");
var u = require("./62754.js");
var d = b(require("./68374.js"));
var c = b(require("./55994.js"));
var h = require("./13306.js");
var f = require("./13660.js");
var p = b(require("./99393.js"));
var g = require("./39611.js");
var m = require("./72918.js");
var _ = b(require("./20530.js"));
var v = b(require("./73349.js"));
var y = require("./6415.js");
function b(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
var x = v.default.getActiveElement;
var w = _.default.real();
var C = i.default.inherit({
  _supportedKeys: function () {
    return (0, h.extend)({}, this.callBase(), {
      tab: function (e) {
        if (this.option("opened")) {
          var t = this._getTabbableElements();
          var n = e.shiftKey ? t.last() : t.first();
          if (n) {
            c.default.trigger(n, "focus");
          }
          e.preventDefault();
        }
      }
    });
  },
  _getTabbableElements: function () {
    return this._getElements().filter(l.tabbable);
  },
  _getElements: function () {
    return (0, d.default)(this.content()).find("*");
  },
  _getDefaultOptions: function () {
    return (0, h.extend)(this.callBase(), {
      acceptCustomValue: false,
      contentTemplate: "content",
      openOnFieldClick: true,
      displayValueFormatter: function (e) {
        if (Array.isArray(e)) {
          return e.join(", ");
        } else {
          return e;
        }
      },
      useHiddenSubmitElement: true
    });
  },
  _getAnonymousTemplateName: function () {
    return "content";
  },
  _initTemplates: function () {
    this.callBase();
  },
  _initMarkup: function () {
    this._initDataExpressions();
    this.$element().addClass("dx-dropdownbox");
    this.callBase();
  },
  _setSubmitValue: function () {
    var e = this.option("value");
    var t = this._shouldUseDisplayValue(e) ? this._displayGetter(e) : e;
    this._getSubmitElement().val(t);
  },
  _shouldUseDisplayValue: function (e) {
    return this.option("valueExpr") === "this" && (0, r.isObject)(e);
  },
  _renderInputValue: function () {
    var e = this;
    this._rejectValueLoading();
    var t = [];
    if (!this._dataSource) {
      this.callBase(t);
      return new u.Deferred().resolve();
    }
    var n = this._getCurrentValue();
    var i = n ?? [];
    i = Array.isArray(i) ? i : [i];
    var o = (0, s.map)(i, function (n) {
      var i = new u.Deferred();
      e._loadItem(n).always(function (o) {
        var a = e._displayGetter(o);
        if ((0, r.isDefined)(a)) {
          t.push(a);
        } else if (e.option("acceptCustomValue")) {
          t.push(n);
        }
        i.resolve();
      });
      return i;
    });
    var a = this.callBase.bind(this);
    return u.when.apply(this, o).always(function () {
      e.option("displayValue", t);
      a(t.length && t);
    });
  },
  _loadItem: function (e) {
    var t = new u.Deferred();
    var n = this;
    var i = (0, a.grep)(this.option("items") || [], function (t) {
      return this._isValueEquals(this._valueGetter(t), e);
    }.bind(this))[0];
    if (i !== undefined) {
      t.resolve(i);
    } else {
      this._loadValue(e).done(function (e) {
        t.resolve(e);
      }).fail(function (i) {
        if (i == null || !i.shouldSkipCallback) {
          if (n.option("acceptCustomValue")) {
            t.resolve(e);
          } else {
            t.reject();
          }
        }
      });
    }
    return t.promise();
  },
  _popupElementTabHandler: function (e) {
    if ((0, g.normalizeKeyName)(e) === "tab") {
      var t = this._getTabbableElements().first().get(0);
      var n = this._getTabbableElements().last().get(0);
      var i = e.originalEvent.target;
      var o = i === t && !!e.shift;
      var a = i === n && !e.shift;
      if (o || a) {
        this.close();
        c.default.trigger(this._input(), "focus");
        if (o) {
          e.originalEvent.preventDefault();
        }
      }
    }
  },
  _renderPopup: function (e) {
    var t = this;
    this.callBase();
    if (this.option("focusStateEnabled")) {
      m.keyboard.on(this.content(), null, function (e) {
        return t._popupElementTabHandler(e);
      });
    }
  },
  _renderPopupContent: function () {
    if (this.option("contentTemplate") !== "content") {
      var e = this._getTemplateByOption("contentTemplate");
      if (e && this.option("contentTemplate")) {
        var t = this._popup.$content();
        var n = {
          value: this._fieldRenderData(),
          component: this
        };
        t.empty();
        e.render({
          container: (0, y.getPublicElement)(t),
          model: n
        });
      }
    }
  },
  _canShowVirtualKeyboard: function () {
    return w.mac;
  },
  _isNestedElementActive: function () {
    var e = x();
    return e && this._popup.$content().get(0).contains(e);
  },
  _shouldHideOnParentScroll: function () {
    return w.deviceType === "desktop" && this._canShowVirtualKeyboard() && this._isNestedElementActive();
  },
  _popupHiddenHandler: function () {
    this.callBase();
    this._popupPosition = undefined;
  },
  _popupPositionedHandler: function (e) {
    this.callBase(e);
    this._popupPosition = e.position;
  },
  _getDefaultPopupPosition: function (e) {
    var t = this.callBase(e);
    return {
      my: t.my,
      at: t.at,
      offset: {
        v: -1
      },
      collision: "flipfit"
    };
  },
  _popupConfig: function () {
    var e = this;
    var t = this.option().focusStateEnabled;
    return (0, h.extend)(this.callBase(), {
      tabIndex: -1,
      dragEnabled: false,
      focusStateEnabled: t,
      contentTemplate: "content",
      hideOnParentScroll: this._shouldHideOnParentScroll.bind(this),
      position: (0, h.extend)(this.option("popupPosition"), {
        of: this.$element()
      }),
      onKeyboardHandled: function (t) {
        return e.option("focusStateEnabled") && e._popupElementTabHandler(t);
      },
      _ignoreFunctionValueDeprecation: true,
      maxHeight: function () {
        var e;
        var t = (e = this._popupPosition) === null || e === undefined ? undefined : e.v.location;
        return (0, f.getElementMaxHeightByWindow)(this.$element(), t);
      }.bind(this)
    });
  },
  _popupShownHandler: function () {
    this.callBase();
    var e = this._getTabbableElements().first();
    c.default.trigger(e, "focus");
  },
  _setCollectionWidgetOption: a.noop,
  _optionChanged: function (e) {
    this._dataExpressionOptionChanged(e);
    switch (e.name) {
      case "dataSource":
        this._renderInputValue();
        break;
      case "displayValue":
        this.option("text", e.value);
        break;
      case "displayExpr":
        this._renderValue();
        break;
      case "contentTemplate":
        this._invalidate();
        break;
      default:
        this.callBase(e);
    }
  }
}).include(o.default);
(0, p.default)("dxDropDownBox", C);
var S = C;
exports.default = S;
module.exports = exports.default;
module.exports.default = exports.default;