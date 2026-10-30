exports.default = undefined;
var i = require("./58664.js");
var o = c(require("./68374.js"));
var a = require("./13306.js");
var r = require("./35922.js");
var s = require("./58201.js");
var l = c(require("./14390.js"));
var u = c(require("./32089.js"));
var d = c(require("./93288.js"));
function c(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
function h(e, t) {
  return (h = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (e, t) {
    e.__proto__ = t;
    return e;
  })(e, t);
}
var f = (0, s.getWindow)();
var p = function (e) {
  var t;
  var n;
  function l() {
    return e.apply(this, arguments) || this;
  }
  n = e;
  (t = l).prototype = Object.create(n.prototype);
  t.prototype.constructor = t;
  h(t, n);
  var c = l.prototype;
  c._initMarkup = function () {
    e.prototype._initMarkup.call(this);
    this._initActions();
    this._isInAdaptiveState = false;
    var t = (0, o.default)("<div>").appendTo(this.$element());
    (0, o.default)("<div>").addClass("dx-filemanager-adaptivity-drawer-panel").appendTo(t);
    this._drawer = this._createComponent(t, u.default);
    this._drawer.option({
      opened: true,
      template: this._createDrawerTemplate.bind(this)
    });
    (0, o.default)(this._drawer.content()).addClass("dx-drawer-panel-content-initial");
    var n = t.find(`.dx-filemanager-adaptivity-drawer-panel`).first();
    var i = this.option("contentTemplate");
    if ((0, r.isFunction)(i)) {
      i(n);
    }
    this._updateDrawerMaxSize();
  };
  c._createDrawerTemplate = function (e) {
    this.option("drawerTemplate")(e);
    this._splitter = this._createComponent("<div>", d.default, {
      container: this.$element(),
      leftElement: (0, o.default)(this._drawer.content()),
      rightElement: (0, o.default)(this._drawer.viewContent()),
      onApplyPanelSize: this._onApplyPanelSize.bind(this),
      onActiveStateChanged: this._onActiveStateChanged.bind(this)
    });
    this._splitter.$element().appendTo(e);
    this._splitter.disableSplitterCalculation(true);
  };
  c._render = function () {
    e.prototype._render.call(this);
    this._checkAdaptiveState();
  };
  c._onApplyPanelSize = function (e) {
    if ((0, s.hasWindow)()) {
      if (this._splitter.isSplitterMoved()) {
        (0, o.default)(this._drawer.content()).removeClass("dx-drawer-panel-content-initial");
        this._setDrawerWidth(e.leftPanelWidth);
      } else {
        this._setDrawerWidth("");
      }
    }
  };
  c._onActiveStateChanged = function (e) {
    var t = e.isActive;
    this._splitter.disableSplitterCalculation(!t);
    if (!t) {
      this._splitter.$element().css("left", "auto");
    }
  };
  c._setDrawerWidth = function (e) {
    (0, o.default)(this._drawer.content()).css("width", e);
    this._updateDrawerMaxSize();
    this._drawer.resizeViewContent();
  };
  c._updateDrawerMaxSize = function () {
    this._drawer.option("maxSize", this._drawer.getRealPanelWidth());
  };
  c._dimensionChanged = function (e) {
    if (!e || e !== "height") {
      this._checkAdaptiveState();
    }
  };
  c._checkAdaptiveState = function () {
    var e = this._isInAdaptiveState;
    this._isInAdaptiveState = this._isSmallScreen();
    if (e !== this._isInAdaptiveState) {
      this.toggleDrawer(!this._isInAdaptiveState, true);
      (0, o.default)(this._drawer.content()).toggleClass("dx-drawer-panel-content-adaptive", this._isInAdaptiveState);
      this._raiseAdaptiveStateChanged(this._isInAdaptiveState);
    }
    if (this._isInAdaptiveState && this._isDrawerOpened()) {
      this._updateDrawerMaxSize();
    }
  };
  c._isSmallScreen = function () {
    return (0, i.getWidth)(f) <= 573;
  };
  c._isDrawerOpened = function () {
    return this._drawer.option("opened");
  };
  c._initActions = function () {
    this._actions = {
      onAdaptiveStateChanged: this._createActionByOption("onAdaptiveStateChanged")
    };
  };
  c._raiseAdaptiveStateChanged = function (e) {
    this._actions.onAdaptiveStateChanged({
      enabled: e
    });
  };
  c._getDefaultOptions = function () {
    return (0, a.extend)(e.prototype._getDefaultOptions.call(this), {
      drawerTemplate: null,
      contentTemplate: null,
      onAdaptiveStateChanged: null
    });
  };
  c._optionChanged = function (t) {
    var n = t.name;
    switch (n) {
      case "drawerTemplate":
      case "contentTemplate":
        this.repaint();
        break;
      case "onAdaptiveStateChanged":
        this._actions[n] = this._createActionByOption(n);
        break;
      default:
        e.prototype._optionChanged.call(this, t);
    }
  };
  c.isInAdaptiveState = function () {
    return this._isInAdaptiveState;
  };
  c.toggleDrawer = function (e, t) {
    this._updateDrawerMaxSize();
    this._drawer.option("animationEnabled", !t);
    this._drawer.toggle(e);
    var n = this._isDrawerOpened() && !this.isInAdaptiveState();
    this._splitter.toggleDisabled(!n);
  };
  c.getSplitterElement = function () {
    return this._splitter.getSplitterBorderElement().get(0);
  };
  return l;
}(l.default);
exports.default = p;
module.exports = exports.default;
module.exports.default = exports.default;