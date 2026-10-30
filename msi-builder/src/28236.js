exports.default = undefined;
var i = c(require("./68374.js"));
var o = c(require("./14390.js"));
var a = c(require("./63008.js"));
var r = c(require("./11050.js"));
var s = c(require("./99393.js"));
var l = require("./13306.js");
var u = require("./35922.js");
var d = require("./93280.js");
function c(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
var h = r.default.inherit({
  _initTemplates: function () {
    var e = this;
    this.callBase();
    this._templateManager.addDefaultTemplates({
      item: new d.BindableTemplate(function (t, n, i) {
        e._prepareItemStyles(t);
        var o = e.option("buttonTemplate");
        e._createComponent(t, a.default, (0, l.extend)({}, i, n, e._getBasicButtonOptions(), {
          _templateData: e._hasCustomTemplate(o) ? i : {},
          template: i.template || o
        }));
      }, ["text", "type", "icon", "disabled", "visible", "hint"], this.option("integrationOptions.watchMethod"))
    });
  },
  _getBasicButtonOptions: function () {
    return {
      focusStateEnabled: false,
      onClick: null,
      hoverStateEnabled: this.option("hoverStateEnabled"),
      activeStateEnabled: this.option("activeStateEnabled"),
      stylingMode: this.option("stylingMode")
    };
  },
  _getDefaultOptions: function () {
    return (0, l.extend)(this.callBase(), {
      itemTemplateProperty: null
    });
  },
  _hasCustomTemplate: function (e) {
    return (0, u.isFunction)(e) || this.option("integrationOptions.templates")[e];
  },
  _prepareItemStyles: function (e) {
    var t = e.data("dxItemIndex");
    if (t === 0) {
      e.addClass("dx-buttongroup-first-item");
    }
    var n = this.option("items");
    if (n && t === n.length - 1) {
      e.addClass("dx-buttongroup-last-item");
    }
    e.addClass("dx-shape-standard");
  },
  _renderItemContent: function (e) {
    e.container = (0, i.default)(e.container).parent();
    return this.callBase(e);
  },
  _setAriaSelectionAttribute: function (e, t) {
    this.setAria("pressed", t, e);
  },
  _renderItemContentByNode: function (e, t) {
    e.container = (0, i.default)(e.container.children().first());
    return this.callBase(e, t);
  },
  _focusTarget: function () {
    return this.$element().parent();
  },
  _keyboardEventBindingTarget: function () {
    return this._focusTarget();
  },
  _refreshContent: function () {
    this._prepareContent();
    this._renderContent();
  },
  _itemClass: function () {
    return "dx-buttongroup-item";
  },
  _itemSelectHandler: function (e) {
    if (this.option("selectionMode") !== "single" || !this.isItemSelected(e.currentTarget)) {
      this.callBase(e);
    }
  }
});
var f = o.default.inherit({
  _getDefaultOptions: function () {
    return (0, l.extend)(this.callBase(), {
      hoverStateEnabled: true,
      focusStateEnabled: true,
      selectionMode: "single",
      selectedItems: [],
      selectedItemKeys: [],
      stylingMode: "contained",
      keyExpr: "text",
      items: [],
      buttonTemplate: "content",
      onSelectionChanged: null,
      onItemClick: null
    });
  },
  _init: function () {
    this.callBase();
    this._createItemClickAction();
  },
  _createItemClickAction: function () {
    this._itemClickAction = this._createActionByOption("onItemClick");
  },
  _initMarkup: function () {
    this.setAria("role", "group");
    this.$element().addClass("dx-buttongroup");
    this._renderButtons();
    this._syncSelectionOptions();
    this.callBase();
  },
  _fireSelectionChangeEvent: function (e, t) {
    this._createActionByOption("onSelectionChanged", {
      excludeValidators: ["disabled", "readOnly"]
    })({
      addedItems: e,
      removedItems: t
    });
  },
  _renderButtons: function () {
    var e = this;
    var t = (0, i.default)("<div>").addClass("dx-buttongroup-wrapper").appendTo(this.$element());
    var n = this.option("selectedItems");
    var o = {
      selectionMode: this.option("selectionMode"),
      items: this.option("items"),
      keyExpr: this.option("keyExpr"),
      buttonTemplate: this.option("buttonTemplate"),
      scrollingEnabled: false,
      selectedItemKeys: this.option("selectedItemKeys"),
      focusStateEnabled: this.option("focusStateEnabled"),
      hoverStateEnabled: this.option("hoverStateEnabled"),
      activeStateEnabled: this.option("activeStateEnabled"),
      stylingMode: this.option("stylingMode"),
      accessKey: this.option("accessKey"),
      tabIndex: this.option("tabIndex"),
      noDataText: "",
      selectionRequired: false,
      onItemRendered: function (t) {
        var n = e.option("width");
        if ((0, u.isDefined)(n)) {
          (0, i.default)(t.itemElement).addClass("dx-buttongroup-item-has-width");
        }
      },
      onSelectionChanged: function (t) {
        e._syncSelectionOptions();
        e._fireSelectionChangeEvent(t.addedItems, t.removedItems);
      },
      onItemClick: function (t) {
        e._itemClickAction(t);
      }
    };
    if ((0, u.isDefined)(n) && n.length) {
      o.selectedItems = n;
    }
    this._buttonsCollection = this._createComponent(t, h, o);
  },
  _syncSelectionOptions: function () {
    this._setOptionWithoutOptionChange("selectedItems", this._buttonsCollection.option("selectedItems"));
    this._setOptionWithoutOptionChange("selectedItemKeys", this._buttonsCollection.option("selectedItemKeys"));
  },
  _optionChanged: function (e) {
    switch (e.name) {
      case "stylingMode":
      case "selectionMode":
      case "keyExpr":
      case "buttonTemplate":
      case "items":
      case "activeStateEnabled":
      case "focusStateEnabled":
      case "hoverStateEnabled":
      case "tabIndex":
        this._invalidate();
        break;
      case "selectedItemKeys":
      case "selectedItems":
        this._buttonsCollection.option(e.name, e.value);
        break;
      case "onItemClick":
        this._createItemClickAction();
        break;
      case "onSelectionChanged":
        break;
      case "width":
        this.callBase(e);
        this._buttonsCollection.itemElements().toggleClass("dx-buttongroup-item-has-width", !!e.value);
        break;
      default:
        this.callBase(e);
    }
  }
});
(0, s.default)("dxButtonGroup", f);
var p = f;
exports.default = p;
module.exports = exports.default;
module.exports.default = exports.default;