exports.default = undefined;
var i = g(require("./68374.js"));
var o = require("./58201.js");
var a = require("./20576.js");
var r = g(require("./28109.js"));
var s = g(require("./99393.js"));
var l = require("./13306.js");
var u = g(require("./63008.js"));
var d = g(require("./11050.js"));
var c = g(require("./51495.js"));
var h = g(require("./17287.js"));
var f = require("./93280.js");
var p = require("./62754.js");
function g(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
var m = (0, o.getWindow)();
var _ = d.default.inherit({
  _getDefaultOptions: function () {
    return (0, l.extend)(this.callBase(), {
      usePopover: false,
      target: null,
      title: "",
      showTitle: true,
      showCancelButton: true,
      cancelText: r.default.format("Cancel"),
      onCancelClick: null,
      visible: false,
      noDataText: "",
      focusStateEnabled: false,
      selectByClick: false
    });
  },
  _defaultOptionsRules: function () {
    return this.callBase().concat([{
      device: {
        platform: "ios",
        tablet: true
      },
      options: {
        usePopover: true
      }
    }]);
  },
  _initTemplates: function () {
    this.callBase();
    this._templateManager.addDefaultTemplates({
      item: new f.BindableTemplate(function (e, t) {
        var n = new u.default((0, i.default)("<div>"), (0, l.extend)({
          onClick: t && t.click,
          stylingMode: t && t.stylingMode || "outlined"
        }, t));
        e.append(n.$element());
      }, ["disabled", "icon", "text", "type", "onClick", "click", "stylingMode"], this.option("integrationOptions.watchMethod"))
    });
  },
  _itemContainer: function () {
    return this._$itemContainer;
  },
  _itemClass: function () {
    return "dx-actionsheet-item";
  },
  _itemDataKey: function () {
    return "dxActionSheetItemData";
  },
  _toggleVisibility: a.noop,
  _renderDimensions: a.noop,
  _initMarkup: function () {
    this.callBase();
    this.$element().addClass("dx-actionsheet");
    this._createItemContainer();
  },
  _render: function () {
    this._renderPopup();
  },
  _createItemContainer: function () {
    this._$itemContainer = (0, i.default)("<div>").addClass("dx-actionsheet-container");
    this._renderDisabled();
  },
  _renderDisabled: function () {
    this._$itemContainer.toggleClass("dx-state-disabled", this.option("disabled"));
  },
  _renderPopup: function () {
    this._$popup = (0, i.default)("<div>").appendTo(this.$element());
    if (this._isPopoverMode()) {
      this._createPopover();
    } else {
      this._createPopup();
    }
    this._renderPopupTitle();
    this._mapPopupOption("visible");
  },
  _mapPopupOption: function (e) {
    if (this._popup) {
      this._popup.option(e, this.option(e));
    }
  },
  _isPopoverMode: function () {
    return this.option("usePopover") && this.option("target");
  },
  _renderPopupTitle: function () {
    this._mapPopupOption("showTitle");
    if (this._popup) {
      this._popup.$wrapper().toggleClass("dx-actionsheet-without-title", !this.option("showTitle"));
    }
  },
  _clean: function () {
    if (this._$popup) {
      this._$popup.remove();
    }
    this.callBase();
  },
  _overlayConfig: function () {
    return {
      onInitialized: function (e) {
        this._popup = e.component;
      }.bind(this),
      disabled: false,
      showTitle: true,
      title: this.option("title"),
      deferRendering: !m.angular,
      onContentReady: this._popupContentReadyAction.bind(this),
      onHidden: this.hide.bind(this)
    };
  },
  _createPopover: function () {
    this._createComponent(this._$popup, h.default, (0, l.extend)(this._overlayConfig(), {
      width: this.option("width") || 200,
      height: this.option("height") || "auto",
      target: this.option("target")
    }));
    this._popup.$overlayContent().attr("role", "dialog");
    this._popup.$wrapper().addClass("dx-actionsheet-popover-wrapper");
  },
  _createPopup: function () {
    this._createComponent(this._$popup, c.default, (0, l.extend)(this._overlayConfig(), {
      dragEnabled: false,
      width: this.option("width") || "100%",
      height: this.option("height") || "auto",
      showCloseButton: false,
      position: {
        my: "bottom",
        at: "bottom",
        of: m
      },
      animation: {
        show: {
          type: "slide",
          duration: 400,
          from: {
            position: {
              my: "top",
              at: "bottom",
              of: m
            }
          },
          to: {
            position: {
              my: "bottom",
              at: "bottom",
              of: m
            }
          }
        },
        hide: {
          type: "slide",
          duration: 400,
          from: {
            position: {
              my: "bottom",
              at: "bottom",
              of: m
            }
          },
          to: {
            position: {
              my: "top",
              at: "bottom",
              of: m
            }
          }
        }
      }
    }));
    this._popup.$wrapper().addClass("dx-actionsheet-popup-wrapper");
  },
  _popupContentReadyAction: function () {
    this._popup.$content().append(this._$itemContainer);
    this._attachClickEvent();
    this._attachHoldEvent();
    this._prepareContent();
    this._renderContent();
    this._renderCancelButton();
  },
  _renderCancelButton: function () {
    if (!this._isPopoverMode() && (this._$cancelButton && this._$cancelButton.remove(), this.option("showCancelButton"))) {
      var e = this._createActionByOption("onCancelClick") || a.noop;
      var t = this;
      this._$cancelButton = (0, i.default)("<div>").addClass("dx-actionsheet-cancel").appendTo(this._popup && this._popup.$content());
      this._createComponent(this._$cancelButton, u.default, {
        disabled: false,
        stylingMode: "outlined",
        text: this.option("cancelText"),
        onClick: function (n) {
          var i = {
            event: n,
            cancel: false
          };
          e(i);
          if (!i.cancel) {
            t.hide();
          }
        },
        integrationOptions: {}
      });
    }
  },
  _attachItemClickEvent: a.noop,
  _itemClickHandler: function (e) {
    this.callBase(e);
    if (!(0, i.default)(e.target).is(".dx-state-disabled, .dx-state-disabled *")) {
      this.hide();
    }
  },
  _itemHoldHandler: function (e) {
    this.callBase(e);
    if (!(0, i.default)(e.target).is(".dx-state-disabled, .dx-state-disabled *")) {
      this.hide();
    }
  },
  _optionChanged: function (e) {
    switch (e.name) {
      case "width":
      case "height":
      case "visible":
      case "title":
        this._mapPopupOption(e.name);
        break;
      case "disabled":
        this._renderDisabled();
        break;
      case "showTitle":
        this._renderPopupTitle();
        break;
      case "showCancelButton":
      case "onCancelClick":
      case "cancelText":
        this._renderCancelButton();
        break;
      case "target":
      case "usePopover":
      case "items":
        this._invalidate();
        break;
      default:
        this.callBase(e);
    }
  },
  toggle: function (e) {
    var t = this;
    var n = new p.Deferred();
    t._popup.toggle(e).done(function () {
      t.option("visible", e);
      n.resolveWith(t);
    });
    return n.promise();
  },
  show: function () {
    return this.toggle(true);
  },
  hide: function () {
    return this.toggle(false);
  }
});
(0, s.default)("dxActionSheet", _);
var v = _;
exports.default = v;
module.exports = exports.default;
module.exports.default = exports.default;