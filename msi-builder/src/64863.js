exports.default = undefined;
var i = require("./58664.js");
var o = d(require("./68374.js"));
var a = require("./13306.js");
var r = d(require("./4741.js"));
var s = d(require("./21807.js"));
var l = d(require("./99967.js"));
var u = d(require("./72321.js"));
function d(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
function c(e, t) {
  return (c = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (e, t) {
    e.__proto__ = t;
    return e;
  })(e, t);
}
var h = function (e) {
  var t;
  var n;
  function l() {
    return e.apply(this, arguments) || this;
  }
  n = e;
  (t = l).prototype = Object.create(n.prototype);
  t.prototype.constructor = t;
  c(t, n);
  var d = l.prototype;
  d._init = function () {
    e.prototype._init.call(this);
    this._commandTabs = u.default.getPropertyPanelCommandTabs(this.option("propertyTabs"));
    this._createOnCreateToolbar();
    this._createOnSelectedGroupChanged();
  };
  d._initMarkup = function () {
    this._toolbars = [];
    this._selectedToolbar = undefined;
    e.prototype._initMarkup.call(this);
  };
  d._getPopupClass = function () {
    var e = "dx-diagram-properties-popup";
    if (!this._hasTabPanel()) {
      e += " dx-diagram-properties-popup-notabs";
    }
    return e;
  };
  d._getPopupWidth = function () {
    if (this.isMobileView()) {
      return "100%";
    } else {
      return 420;
    }
  };
  d._getPopupHeight = function () {
    return 340;
  };
  d._getPopupPosition = function () {
    var e = this.option("offsetParent");
    if (this.isMobileView()) {
      return {
        my: "left bottom",
        at: "left bottom",
        of: e
      };
    } else {
      return {
        my: "right bottom",
        at: "right bottom",
        of: e,
        offset: "-" + this.option("offsetX") + " -" + this.option("offsetY")
      };
    }
  };
  d._getPopupAnimation = function () {
    var t = this.option("offsetParent");
    if (this.isMobileView()) {
      return {
        hide: this._getPopupSlideAnimationObject({
          direction: "bottom",
          from: {
            position: {
              my: "left bottom",
              at: "left bottom",
              of: t
            }
          },
          to: {
            position: {
              my: "left top",
              at: "left bottom",
              of: t
            }
          }
        }),
        show: this._getPopupSlideAnimationObject({
          direction: "top",
          from: {
            position: {
              my: "left top",
              at: "left bottom",
              of: t
            }
          },
          to: {
            position: {
              my: "left bottom",
              at: "left bottom",
              of: t
            }
          }
        })
      };
    } else {
      return e.prototype._getPopupAnimation.call(this);
    }
  };
  d._getPopupOptions = function () {
    return (0, a.extend)(e.prototype._getPopupOptions.call(this), {
      showTitle: this.isMobileView(),
      showCloseButton: this.isMobileView()
    });
  };
  d._renderPopupContent = function (e) {
    if (this._commandTabs.length) {
      var t = (0, o.default)("<div>").addClass("dx-diagram-properties-panel").appendTo(e);
      if (this._hasTabPanel()) {
        this._renderTabPanel(t);
      } else {
        this._renderTabContent(t, this._commandTabs[0], 0, true);
      }
    }
  };
  d._hasTabPanel = function () {
    return this._commandTabs.length > 1;
  };
  d._renderTabPanel = function (e) {
    var t = this;
    var n = (0, o.default)("<div>").appendTo(e);
    this._tabPanel = this._createComponent(n, s.default, {
      focusStateEnabled: false,
      dataSource: this._commandTabs,
      itemTemplate: function (e, n, i) {
        t._renderTabContent(i, e, n);
      },
      onSelectionChanged: function (e) {
        t._onSelectedGroupChangedAction();
        t._onPointerUpAction();
      },
      onContentReady: function (e) {
        t._popup.option("height", (0, i.getHeight)(e.component.$element()) + t._getVerticalPaddingsAndBorders());
        if (t._firstScrollView) {
          t._scrollViewHeight = (0, i.getOuterHeight)(t._firstScrollView.$element());
          t._firstScrollView.option("height", t._scrollViewHeight);
        }
      }
    });
  };
  d._renderTabContent = function (e, t, n, a) {
    var s = (0, o.default)("<div>").appendTo(e);
    var l = this._createComponent(s, r.default, {
      height: this._scrollViewHeight
    });
    this._renderTabInnerContent(l.content(), t, n);
    if (a) {
      this._popup.option("height", (0, i.getHeight)(l.$element()) + this._getVerticalPaddingsAndBorders());
    } else {
      this._firstScrollView = this._firstScrollView || l;
    }
  };
  d._renderTabInnerContent = function (e, t, n) {
    var i = this;
    if (t.groups) {
      t.groups.forEach(function (t, o) {
        i._renderTabGroupContent(e, n, t.title, t.commands);
      });
    } else if (t.commands) {
      this._renderTabGroupContent(e, n, undefined, t.commands);
    }
  };
  d._renderTabGroupContent = function (e, t, n, i) {
    if (n) {
      (0, o.default)("<div>").addClass("dx-diagram-properties-panel-group-title").appendTo(e).text(n);
    }
    var a = {
      $parent: (0, o.default)("<div>").addClass("dx-diagram-properties-panel-group-toolbar").appendTo(e),
      commands: i
    };
    this._onCreateToolbarAction(a);
    this._toolbars[t] ||= [];
    this._toolbars[t].push(a.toolbar);
    this._selectedToolbar = a.toolbar;
  };
  d.getActiveToolbars = function () {
    var e = this._tabPanel ? this._tabPanel.option("selectedIndex") : 0;
    return this._toolbars[e];
  };
  d._createOnCreateToolbar = function () {
    this._onCreateToolbarAction = this._createActionByOption("onCreateToolbar");
  };
  d._createOnSelectedGroupChanged = function () {
    this._onSelectedGroupChangedAction = this._createActionByOption("onSelectedGroupChanged");
  };
  d._optionChanged = function (t) {
    switch (t.name) {
      case "onCreateToolbar":
        this._createOnCreateToolbar();
        break;
      case "onSelectedGroupChanged":
        this._createOnSelectedGroupChanged();
        break;
      case "propertyTabs":
        this._invalidate();
        break;
      default:
        e.prototype._optionChanged.call(this, t);
    }
  };
  return l;
}(l.default);
exports.default = h;
module.exports = exports.default;
module.exports.default = exports.default;