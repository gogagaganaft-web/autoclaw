exports.default = undefined;
var i = require("./58664.js");
var o = p(require("./68374.js"));
var a = p(require("./20530.js"));
var r = require("./13306.js");
var s = p(require("./14390.js"));
var l = p(require("./63008.js"));
var u = p(require("./64017.js"));
var d = require("./75811.js");
var c = require("./91627.js");
var h = require("./61939.js");
var f = require("./58201.js");
function p(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
function g(e, t) {
  return (g = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (e, t) {
    e.__proto__ = t;
    return e;
  })(e, t);
}
require("./39114.js");
var m = function (e) {
  var t;
  var n;
  function s() {
    return e.apply(this, arguments) || this;
  }
  n = e;
  (t = s).prototype = Object.create(n.prototype);
  t.prototype.constructor = t;
  g(t, n);
  var p = s.prototype;
  p._supportedKeys = function () {
    var t = {};
    if (!this.option("opened") || !this._list.option("focusedElement")) {
      t = this._button._supportedKeys();
    }
    return (0, r.extend)(e.prototype._supportedKeys.call(this), t, {
      tab: function () {
        if (this._popup) {
          this._popup.hide();
        }
      }
    });
  };
  p._getDefaultOptions = function () {
    return (0, r.extend)(e.prototype._getDefaultOptions.call(this), {
      items: [],
      onItemClick: null,
      dataSource: null,
      itemTemplate: "item",
      onButtonClick: null,
      activeStateEnabled: true,
      hoverStateEnabled: true,
      opened: false,
      onItemRendered: null,
      closeOnClick: true,
      useInkRipple: false,
      container: undefined,
      animation: {
        show: {
          type: "fade",
          from: 0,
          to: 1
        },
        hide: {
          type: "fade",
          to: 0
        }
      }
    });
  };
  p._defaultOptionsRules = function () {
    return e.prototype._defaultOptionsRules.call(this).concat([{
      device: function () {
        return a.default.real().deviceType === "desktop" && !a.default.isSimulator();
      },
      options: {
        focusStateEnabled: true
      }
    }, {
      device: function () {
        return (0, d.isMaterial)();
      },
      options: {
        useInkRipple: true,
        animation: {
          show: {
            type: "pop",
            duration: 200,
            from: {
              scale: 0
            },
            to: {
              scale: 1
            }
          },
          hide: {
            type: "pop",
            duration: 200,
            from: {
              scale: 1
            },
            to: {
              scale: 0
            }
          }
        }
      }
    }]);
  };
  p._init = function () {
    e.prototype._init.call(this);
    this.$element().addClass("dx-dropdownmenu");
    this._initItemClickAction();
    this._initButtonClickAction();
  };
  p._initItemClickAction = function () {
    this._itemClickAction = this._createActionByOption("onItemClick");
  };
  p._initButtonClickAction = function () {
    this._buttonClickAction = this._createActionByOption("onButtonClick");
  };
  p._initTemplates = function () {
    this._templateManager.addDefaultTemplates({
      content: new c.ChildDefaultTemplate("content")
    });
    e.prototype._initTemplates.call(this);
  };
  p._initMarkup = function () {
    this._renderButton();
    e.prototype._initMarkup.call(this);
  };
  p._render = function () {
    e.prototype._render.call(this);
    this.setAria({
      haspopup: true,
      expanded: this.option("opened")
    });
  };
  p._renderContentImpl = function () {
    if (this.option("opened")) {
      this._renderPopup();
    }
  };
  p._clean = function () {
    this._cleanFocusState();
    if (this._list) {
      this._list.$element().remove();
    }
    if (this._popup) {
      this._popup.$element().remove();
    }
    delete this._list;
    delete this._popup;
  };
  p._renderButton = function () {
    var e = this;
    var t = this.$element().addClass("dx-dropdownmenu-button");
    this._button = this._createComponent(t, l.default, {
      icon: "overflow",
      template: "content",
      useInkRipple: this.option("useInkRipple"),
      hoverStateEnabled: false,
      focusStateEnabled: false,
      onClick: function (t) {
        e.option("opened", !e.option("opened"));
        e._buttonClickAction(t);
      }
    });
  };
  p._toggleActiveState = function (e, t, n) {
    this._button._toggleActiveState(e, t, n);
  };
  p._toggleMenuVisibility = function (e) {
    var t = e ?? !this._popup.option("visible");
    if (e) {
      this._renderPopup();
    }
    this._popup.toggle(t);
    this.setAria("expanded", t);
  };
  p._renderPopup = function () {
    var e = this;
    if (!this._$popup) {
      this._$popup = (0, o.default)("<div>").appendTo(this.$element());
      var t = this.option();
      var n = t.rtlEnabled;
      var i = t.container;
      var a = t.animation;
      this._popup = this._createComponent(this._$popup, "dxPopup", {
        onInitialized: function (e) {
          e.component.$wrapper().addClass("dx-dropdownmenu-popup-wrapper").addClass("dx-dropdownmenu-popup");
        },
        deferRendering: false,
        contentTemplate: function (t) {
          return e._renderList(t);
        },
        _ignoreFunctionValueDeprecation: true,
        maxHeight: function () {
          return e._getMaxHeight();
        },
        position: {
          my: `top ${n ? "left" : "right"}`,
          at: `bottom ${n ? "left" : "right"}`,
          collision: "fit flip",
          offset: {
            v: 3
          },
          of: this.$element()
        },
        animation: a,
        onOptionChanged: function (t) {
          var n = t.name;
          var i = t.value;
          if (n === "visible") {
            e.option("opened", i);
          }
        },
        container: i,
        autoResizeEnabled: false,
        height: "auto",
        width: "auto",
        hideOnOutsideClick: function (t) {
          return e._closeOutsideDropDownHandler(t);
        },
        hideOnParentScroll: true,
        shading: false,
        dragEnabled: false,
        showTitle: false,
        fullScreen: false,
        _fixWrapperPosition: true
      });
    }
  };
  p._getMaxHeight = function () {
    var e = this.$element();
    var t = e.offset().top;
    var n = (0, i.getOuterHeight)((0, f.getWindow)());
    var o = Math.max(t, n - t - (0, i.getOuterHeight)(e));
    return Math.min(n, o - 3 - 10);
  };
  p._closeOutsideDropDownHandler = function (e) {
    return !(0, o.default)(e.target).closest(this.$element()).length;
  };
  p._renderList = function (e) {
    var t = this;
    var n = (0, o.default)(e);
    n.addClass("dx-dropdownmenu-list");
    this._list = this._createComponent(n, u.default, {
      dataSource: this._getListDataSource(),
      pageLoadMode: "scrollBottom",
      indicateLoading: false,
      noDataText: "",
      itemTemplate: this.option("itemTemplate"),
      onItemClick: function (e) {
        if (t.option("closeOnClick")) {
          t.option("opened", false);
        }
        t._itemClickAction(e);
      },
      tabIndex: -1,
      focusStateEnabled: false,
      activeStateEnabled: true,
      onItemRendered: this.option("onItemRendered"),
      _itemAttributes: {
        role: "menuitem"
      }
    });
  };
  p._itemOptionChanged = function (e, t, n) {
    var i;
    if ((i = this._list) !== null && i !== undefined) {
      i._itemOptionChanged(e, t, n);
    }
    (0, h.toggleItemFocusableElementTabIndex)(this._list, e);
  };
  p._getListDataSource = function () {
    return this.option("dataSource") ?? this.option("items");
  };
  p._setListDataSource = function () {
    var e;
    if ((e = this._list) !== null && e !== undefined) {
      e.option("dataSource", this._getListDataSource());
    }
    delete this._deferRendering;
  };
  p._getKeyboardListeners = function () {
    return e.prototype._getKeyboardListeners.call(this).concat([this._list]);
  };
  p._toggleVisibility = function (t) {
    e.prototype._toggleVisibility.call(this, t);
    this._button.option("visible", t);
  };
  p._optionChanged = function (t) {
    var n;
    var i;
    var o;
    var a = t.name;
    var r = t.value;
    switch (a) {
      case "items":
      case "dataSource":
        if (this.option("opened")) {
          this._setListDataSource();
        } else {
          this._deferRendering = true;
        }
        break;
      case "itemTemplate":
        if ((n = this._list) !== null && n !== undefined) {
          n.option(a, this._getTemplate(r));
        }
        break;
      case "onItemClick":
        this._initItemClickAction();
        break;
      case "onButtonClick":
        this._buttonClickAction();
        break;
      case "useInkRipple":
        this._invalidate();
        break;
      case "focusStateEnabled":
        if ((i = this._list) !== null && i !== undefined) {
          i.option(a, r);
        }
        e.prototype._optionChanged.call(this, t);
        break;
      case "onItemRendered":
        if ((o = this._list) !== null && o !== undefined) {
          o.option(a, r);
        }
        break;
      case "opened":
        if (this._deferRendering) {
          this._setListDataSource();
        }
        this._toggleMenuVisibility(r);
        this._updateFocusableItemsTabIndex();
        break;
      case "closeOnClick":
        break;
      case "container":
        if (this._popup) {
          this._popup.option(a, r);
        }
        break;
      case "disabled":
        if (this._list) {
          this._updateFocusableItemsTabIndex();
        }
        break;
      default:
        e.prototype._optionChanged.call(this, t);
    }
  };
  p._updateFocusableItemsTabIndex = function () {
    var e = this;
    this.option("items").forEach(function (t) {
      return (0, h.toggleItemFocusableElementTabIndex)(e._list, t);
    });
  };
  return s;
}(s.default);
exports.default = m;
module.exports = exports.default;
module.exports.default = exports.default;