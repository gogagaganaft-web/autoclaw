exports.default = undefined;
var i = require("./58664.js");
var o = v(require("./68374.js"));
var a = require("./60137.js");
var r = require("./13306.js");
var s = v(require("./20530.js"));
var l = v(require("./73349.js"));
var u = v(require("./99393.js"));
var d = v(require("./86478.js"));
var c = v(require("./13453.js"));
var h = v(require("./31590.js"));
var f = require("./44899.js");
var p = require("./6415.js");
var g = require("./35922.js");
var m = require("./93280.js");
var _ = require("./58201.js");
function v(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
var y = d.default.inherit({
  _getDefaultOptions: function () {
    return (0, r.extend)(this.callBase(), {
      itemTitleTemplate: "title",
      hoverStateEnabled: true,
      showNavButtons: false,
      scrollByContent: true,
      scrollingEnabled: true,
      onTitleClick: null,
      onTitleHold: null,
      onTitleRendered: null,
      badgeExpr: function (e) {
        if (e) {
          return e.badge;
        } else {
          return undefined;
        }
      }
    });
  },
  _defaultOptionsRules: function () {
    return this.callBase().concat([{
      device: function () {
        return s.default.real().deviceType === "desktop" && !s.default.isSimulator();
      },
      options: {
        focusStateEnabled: true
      }
    }, {
      device: function () {
        return !a.touch;
      },
      options: {
        swipeEnabled: false
      }
    }, {
      device: {
        platform: "generic"
      },
      options: {
        animationEnabled: false
      }
    }]);
  },
  _init: function () {
    this.callBase();
    this.$element().addClass("dx-tabpanel");
    this.setAria("role", "tabpanel");
  },
  _initMarkup: function () {
    this.callBase();
    this._createTitleActions();
    this._renderLayout();
  },
  _initTemplates: function () {
    this.callBase();
    this._templateManager.addDefaultTemplates({
      title: new m.BindableTemplate(function (e, t) {
        if ((0, g.isPlainObject)(t)) {
          var n = (0, f.getImageContainer)(t.icon);
          if (n) {
            e.append(n);
          }
          if ((0, g.isDefined)(t.title) && !(0, g.isPlainObject)(t.title)) {
            e.append(l.default.createTextNode(t.title));
          }
        } else if ((0, g.isDefined)(t)) {
          e.text(String(t));
        }
        e.wrapInner((0, o.default)("<span>").addClass("dx-tab-text"));
      }, ["title", "icon"], this.option("integrationOptions.watchMethod"))
    });
  },
  _createTitleActions: function () {
    this._createTitleClickAction();
    this._createTitleHoldAction();
    this._createTitleRenderedAction();
  },
  _createTitleClickAction: function () {
    this._titleClickAction = this._createActionByOption("onTitleClick");
  },
  _createTitleHoldAction: function () {
    this._titleHoldAction = this._createActionByOption("onTitleHold");
  },
  _createTitleRenderedAction: function () {
    this._titleRenderedAction = this._createActionByOption("onTitleRendered");
  },
  _renderContent: function () {
    var e = this;
    this.callBase();
    if (this.option("templatesRenderAsynchronously")) {
      this._resizeEventTimer = setTimeout(function () {
        e._updateLayout();
      }, 0);
    }
  },
  _renderLayout: function () {
    if (this._tabs) {
      this._updateLayout();
    } else {
      var e = this.$element();
      this._$tabContainer = (0, o.default)("<div>").addClass("dx-tabpanel-tabs").appendTo(e);
      var t = (0, o.default)("<div>").appendTo(this._$tabContainer);
      this._tabs = this._createComponent(t, c.default, this._tabConfig());
      this._$container = (0, o.default)("<div>").addClass("dx-tabpanel-container").appendTo(e);
      this._$container.append(this._$wrapper);
      this._updateLayout();
    }
  },
  _updateLayout: function () {
    if ((0, _.hasWindow)()) {
      var e = (0, i.getOuterHeight)(this._$tabContainer);
      this._$container.css({
        marginTop: -e,
        paddingTop: e
      });
    }
  },
  _refreshActiveDescendant: function () {
    if (this._tabs) {
      var e = this._tabs;
      var t = e.itemElements();
      var n = (0, o.default)(t[e.option("selectedIndex")]);
      var i = this.getFocusedItemId();
      this.setAria("controls", undefined, (0, o.default)(t));
      this.setAria("controls", i, n);
    }
  },
  _tabConfig: function () {
    return {
      selectOnFocus: true,
      focusStateEnabled: this.option("focusStateEnabled"),
      hoverStateEnabled: this.option("hoverStateEnabled"),
      repaintChangesOnly: this.option("repaintChangesOnly"),
      tabIndex: this.option("tabIndex"),
      selectedIndex: this.option("selectedIndex"),
      badgeExpr: this.option("badgeExpr"),
      onItemClick: this._titleClickAction.bind(this),
      onItemHold: this._titleHoldAction.bind(this),
      itemHoldTimeout: this.option("itemHoldTimeout"),
      onSelectionChanged: function (e) {
        this.option("selectedIndex", e.component.option("selectedIndex"));
        this._refreshActiveDescendant();
      }.bind(this),
      onItemRendered: this._titleRenderedAction.bind(this),
      itemTemplate: this._getTemplateByOption("itemTitleTemplate"),
      items: this.option("items"),
      noDataText: null,
      scrollingEnabled: this.option("scrollingEnabled"),
      scrollByContent: this.option("scrollByContent"),
      showNavButtons: this.option("showNavButtons"),
      itemTemplateProperty: "tabTemplate",
      loopItemFocus: this.option("loop"),
      selectionRequired: true,
      onOptionChanged: function (e) {
        if (e.name === "focusedElement") {
          if (e.value) {
            var t = (0, o.default)(e.value);
            var n = this._itemElements().eq(t.index());
            this.option("focusedElement", (0, p.getPublicElement)(n));
          } else {
            this.option("focusedElement", e.value);
          }
        }
      }.bind(this),
      onFocusIn: function (e) {
        this._focusInHandler(e.event);
      }.bind(this),
      onFocusOut: function (e) {
        if (!this._isFocusOutHandlerExecuting) {
          this._focusOutHandler(e.event);
        }
      }.bind(this)
    };
  },
  _renderFocusTarget: function () {
    this._focusTarget().attr("tabIndex", -1);
  },
  _toggleWrapperFocusedClass: function (e) {
    this._toggleFocusClass(e, this._$wrapper);
  },
  _toggleDisabledFocusedClass: function (e) {
    this._focusTarget().toggleClass("dx-disabled-focused-tab", e);
  },
  _updateFocusState: function (e, t) {
    this.callBase(e, t);
    var n = e.target === this._tabs._focusTarget().get(0);
    var i = e.target === this._focusTarget().get(0);
    if (n) {
      this._toggleFocusClass(t, this._focusTarget());
    }
    if (n || i) {
      var o = this._isDisabled(this.option("focusedElement"));
      this._toggleWrapperFocusedClass(t && !o);
      this._toggleDisabledFocusedClass(t && o);
    }
    if (i) {
      this._toggleFocusClass(t, this._tabs.option("focusedElement"));
    }
  },
  _focusOutHandler: function (e) {
    this._isFocusOutHandlerExecuting = true;
    this.callBase.apply(this, arguments);
    this._tabs._focusOutHandler(e);
    this._isFocusOutHandlerExecuting = false;
  },
  _setTabsOption: function (e, t) {
    if (this._tabs) {
      this._tabs.option(e, t);
    }
  },
  _visibilityChanged: function (e) {
    if (e) {
      this._tabs._dimensionChanged();
      this._updateLayout();
    }
  },
  registerKeyHandler: function (e, t) {
    this.callBase(e, t);
    if (this._tabs) {
      this._tabs.registerKeyHandler(e, t);
    }
  },
  repaint: function () {
    this.callBase();
    this._tabs.repaint();
  },
  _optionChanged: function (e) {
    var t = e.name;
    var n = e.value;
    var i = e.fullName;
    switch (t) {
      case "dataSource":
        this.callBase(e);
        break;
      case "items":
        this._setTabsOption(t, this.option(t));
        this._updateLayout();
        if (!this.option("repaintChangesOnly")) {
          this._tabs.repaint();
        }
        this.callBase(e);
        break;
      case "width":
        this.callBase(e);
        this._tabs.repaint();
        break;
      case "selectedIndex":
      case "selectedItem":
        this._setTabsOption(i, n);
        this.callBase(e);
        if (this.option("focusStateEnabled") === true) {
          var a = this.option("selectedIndex");
          var r = this._itemElements().eq(a);
          this.option("focusedElement", (0, p.getPublicElement)(r));
        }
        break;
      case "itemHoldTimeout":
      case "focusStateEnabled":
      case "hoverStateEnabled":
        this._setTabsOption(i, n);
        this.callBase(e);
        break;
      case "scrollingEnabled":
      case "scrollByContent":
      case "showNavButtons":
        this._setTabsOption(i, n);
        break;
      case "focusedElement":
        var s = n ? (0, o.default)(n).index() : n;
        var l = n ? this._tabs._itemElements().eq(s) : n;
        this._setTabsOption("focusedElement", (0, p.getPublicElement)(l));
        var u = this._isDisabled(n);
        this._toggleWrapperFocusedClass(!u);
        this._toggleDisabledFocusedClass(u);
        this.callBase(e);
        break;
      case "itemTitleTemplate":
        this._setTabsOption("itemTemplate", this._getTemplateByOption("itemTitleTemplate"));
        break;
      case "onTitleClick":
        this._createTitleClickAction();
        this._setTabsOption("onItemClick", this._titleClickAction.bind(this));
        break;
      case "onTitleHold":
        this._createTitleHoldAction();
        this._setTabsOption("onItemHold", this._titleHoldAction.bind(this));
        break;
      case "onTitleRendered":
        this._createTitleRenderedAction();
        this._setTabsOption("onItemRendered", this._titleRenderedAction.bind(this));
        break;
      case "loop":
        this._setTabsOption("loopItemFocus", n);
        break;
      case "badgeExpr":
        this._invalidate();
        break;
      default:
        this.callBase(e);
    }
  },
  _clean: function () {
    clearTimeout(this._resizeEventTimer);
    this.callBase();
  }
});
y.ItemClass = h.default;
(0, u.default)("dxTabPanel", y);
var b = y;
exports.default = b;
module.exports = exports.default;
module.exports.default = exports.default;