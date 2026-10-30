exports.default = undefined;
var i = f(require("./68374.js"));
var o = require("./13306.js");
var a = f(require("./20530.js"));
var r = require("./20576.js");
var s = require("./35922.js");
var l = f(require("./99393.js"));
var u = f(require("./11050.js"));
var d = f(require("./88718.js"));
var c = f(require("./96452.js"));
var h = require("./62754.js");
function f(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
function p(e, t) {
  e.prototype = Object.create(t.prototype);
  e.prototype.constructor = e;
  g(e, t);
}
function g(e, t) {
  return (g = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (e, t) {
    e.__proto__ = t;
    return e;
  })(e, t);
}
var m = function (e) {
  function t() {
    return e.apply(this, arguments) || this;
  }
  p(t, e);
  var n = t.prototype;
  n._focusTarget = function () {
    return this.$element().parent();
  };
  n._nullValueSelectionSupported = function () {
    return true;
  };
  n._getDefaultOptions = function () {
    var t = e.prototype._getDefaultOptions.call(this);
    return (0, o.extend)(t, d.default._dataExpressionDefaultOptions(), {
      _itemAttributes: {
        role: "radio"
      }
    });
  };
  n._initMarkup = function () {
    var t = this;
    e.prototype._initMarkup.call(this);
    (0, r.deferRender)(function () {
      t.itemElements().addClass("dx-radiobutton");
    });
  };
  n._keyboardEventBindingTarget = function () {
    return this._focusTarget();
  };
  n._postprocessRenderItem = function (t) {
    var n = t.itemData.html;
    var o = t.itemElement;
    if (!n) {
      var a = (0, i.default)("<div>").addClass("dx-radiobutton-icon");
      (0, i.default)("<div>").addClass("dx-radiobutton-icon-dot").appendTo(a);
      var r = (0, i.default)("<div>").append(a).addClass("dx-radio-value-container");
      (0, i.default)(o).prepend(r);
    }
    e.prototype._postprocessRenderItem.call(this, t);
  };
  n._processSelectableItem = function (t, n) {
    e.prototype._processSelectableItem.call(this, t, n);
    t.toggleClass("dx-radiobutton-checked", n).find(`.dx-radiobutton-icon`).first().toggleClass("dx-radiobutton-icon-checked", n);
    this.setAria("checked", n, t);
  };
  n._refreshContent = function () {
    this._prepareContent();
    this._renderContent();
  };
  n._supportedKeys = function () {
    var t = e.prototype._supportedKeys.call(this);
    return (0, o.extend)({}, t, {
      enter: function (e) {
        e.preventDefault();
        return t.enter.apply(this, arguments);
      },
      space: function (e) {
        e.preventDefault();
        return t.space.apply(this, arguments);
      }
    });
  };
  n._itemElements = function () {
    return this._itemContainer().children(this._itemSelector());
  };
  n._setAriaSelectionAttribute = function () {};
  return t;
}(u.default);
var _ = function (e) {
  function t() {
    return e.apply(this, arguments) || this;
  }
  p(t, e);
  var n = t.prototype;
  n._dataSourceOptions = function () {
    return {
      paginate: false
    };
  };
  n._defaultOptionsRules = function () {
    return e.prototype._defaultOptionsRules.call(this).concat([{
      device: {
        tablet: true
      },
      options: {
        layout: "horizontal"
      }
    }, {
      device: function () {
        return a.default.real().deviceType === "desktop" && !a.default.isSimulator();
      },
      options: {
        focusStateEnabled: true
      }
    }]);
  };
  n._fireContentReadyAction = function (t) {
    if (t) {
      e.prototype._fireContentReadyAction.call(this);
    }
  };
  n._focusTarget = function () {
    return this.$element();
  };
  n._getAriaTarget = function () {
    return this.$element();
  };
  n._getDefaultOptions = function () {
    var t = e.prototype._getDefaultOptions.call(this);
    return (0, o.extend)(t, (0, o.extend)(d.default._dataExpressionDefaultOptions(), {
      hoverStateEnabled: true,
      activeStateEnabled: true,
      layout: "vertical"
    }));
  };
  n._getItemValue = function (e) {
    if (this._valueGetter) {
      return this._valueGetter(e);
    } else {
      return e.text;
    }
  };
  n._getSubmitElement = function () {
    return this._$submitElement;
  };
  n._init = function () {
    e.prototype._init.call(this);
    this._activeStateUnit = `.dx-radiobutton`;
    this._feedbackHideTimeout = 100;
    this._initDataExpressions();
  };
  n._initMarkup = function () {
    this.$element().addClass("dx-radiogroup");
    this._renderSubmitElement();
    this.setAria("role", "radiogroup");
    this._renderRadios();
    this._renderLayout();
    e.prototype._initMarkup.call(this);
  };
  n._itemClickHandler = function (e) {
    var t = e.itemElement;
    var n = e.event;
    var i = e.itemData;
    if (this.itemElements().is(t)) {
      var o = this._getItemValue(i);
      if (o !== this.option("value")) {
        this._saveValueChangeEvent(n);
        this.option("value", o);
      }
    }
  };
  n._getSelectedItemKeys = function (e = this.option("value")) {
    var t = this.option("valueExpr") !== "this";
    var n = t && e === null || (0, s.isDefined)(e);
    if (n) {
      return [e];
    } else {
      return [];
    }
  };
  n._setSelection = function (e) {
    var t = this._unwrappedValue(e);
    this._setCollectionWidgetOption("selectedItemKeys", this._getSelectedItemKeys(t));
  };
  n._optionChanged = function (t) {
    var n = t.name;
    var i = t.value;
    this._dataExpressionOptionChanged(t);
    switch (n) {
      case "dataSource":
        this._invalidate();
        break;
      case "focusStateEnabled":
      case "accessKey":
      case "tabIndex":
        this._setCollectionWidgetOption(n, i);
        break;
      case "disabled":
        e.prototype._optionChanged.call(this, t);
        this._setCollectionWidgetOption(n, i);
        break;
      case "valueExpr":
        this._setCollectionWidgetOption("keyExpr", this._getCollectionKeyExpr());
        break;
      case "value":
        this._setSelection(i);
        this._setSubmitValue(i);
        e.prototype._optionChanged.call(this, t);
        break;
      case "items":
        this._setSelection(this.option("value"));
        break;
      case "itemTemplate":
      case "displayExpr":
        break;
      case "layout":
        this._renderLayout();
        this._updateItemsSize();
        break;
      default:
        e.prototype._optionChanged.call(this, t);
    }
  };
  n._render = function () {
    e.prototype._render.call(this);
    this._updateItemsSize();
  };
  n._renderLayout = function () {
    var e = this.option("layout");
    var t = this.$element();
    t.toggleClass("dx-radiogroup-vertical", e === "vertical");
    t.toggleClass("dx-radiogroup-horizontal", e === "horizontal");
  };
  n._renderRadios = function () {
    var e = this;
    this._areRadiosCreated = new h.Deferred();
    var t = (0, i.default)("<div>").appendTo(this.$element());
    var n = this.option();
    var o = n.displayExpr;
    var a = n.accessKey;
    var r = n.focusStateEnabled;
    var s = n.itemTemplate;
    var l = n.tabIndex;
    this._createComponent(t, m, {
      onInitialized: function (t) {
        var n = t.component;
        e._radios = n;
      },
      onContentReady: function (t) {
        e._fireContentReadyAction(true);
      },
      onItemClick: this._itemClickHandler.bind(this),
      displayExpr: o,
      accessKey: a,
      dataSource: this._dataSource,
      focusStateEnabled: r,
      itemTemplate: s,
      keyExpr: this._getCollectionKeyExpr(),
      noDataText: "",
      scrollingEnabled: false,
      selectByClick: false,
      selectionMode: "single",
      selectedItemKeys: this._getSelectedItemKeys(),
      tabIndex: l
    });
    this._areRadiosCreated.resolve();
  };
  n._renderSubmitElement = function () {
    this._$submitElement = (0, i.default)("<input>").attr("type", "hidden").appendTo(this.$element());
    this._setSubmitValue();
  };
  n._setOptionsByReference = function () {
    e.prototype._setOptionsByReference.call(this);
    (0, o.extend)(this._optionsByReference, {
      value: true
    });
  };
  n._setSubmitValue = function (e) {
    e = e ?? this.option("value");
    var n = this.option("valueExpr") === "this" ? this._displayGetter(e) : e;
    this._$submitElement.val(n);
  };
  n._setCollectionWidgetOption = function () {
    this._areRadiosCreated.done(this._setWidgetOption.bind(this, "_radios", arguments));
  };
  n._updateItemsSize = function () {
    if (this.option("layout") === "horizontal") {
      this.itemElements().css("height", "auto");
    } else {
      var e = this.option("items").length;
      this.itemElements().css("height", 100 / e + "%");
    }
  };
  n.focus = function () {
    var e;
    if ((e = this._radios) !== null && e !== undefined) {
      e.focus();
    }
  };
  n.itemElements = function () {
    var e;
    if ((e = this._radios) === null || e === undefined) {
      return undefined;
    } else {
      return e.itemElements();
    }
  };
  return t;
}(c.default);
_.include(d.default);
(0, l.default)("dxRadioGroup", _);
var v = _;
exports.default = v;
module.exports = exports.default;
module.exports.default = exports.default;