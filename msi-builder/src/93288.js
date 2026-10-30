exports.default = undefined;
var i = c(require("./68374.js"));
var o = c(require("./14390.js"));
var a = c(require("./73349.js"));
var r = c(require("./55994.js"));
var s = c(require("./93786.js"));
var l = require("./58201.js");
var u = require("./39611.js");
var d = c(require("./73176.js"));
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
var f = (0, l.getWindow)();
var p = `dx-splitter-wrapper`;
var g = `dx-splitter-inactive`;
var m = `dx-splitter-border`;
var _ = `dx-splitter-initial`;
var v = function (e) {
  var t;
  var n;
  function o() {
    return e.apply(this, arguments) || this;
  }
  n = e;
  (t = o).prototype = Object.create(n.prototype);
  t.prototype.constructor = t;
  h(t, n);
  var l = o.prototype;
  l._init = function () {
    e.prototype._init.call(this);
    var t = new d.default().toString();
    this.SPLITTER_POINTER_DOWN_EVENT_NAME = (0, u.addNamespace)(s.default.down, "dxSplitterResizing" + t);
    this.SPLITTER_POINTER_MOVE_EVENT_NAME = (0, u.addNamespace)(s.default.move, "dxSplitterResizing" + t);
    this.SPLITTER_POINTER_UP_EVENT_NAME = (0, u.addNamespace)(s.default.up, "dxSplitterResizing" + t);
  };
  l._initMarkup = function () {
    e.prototype._initMarkup.call(this);
    this._initActions();
    this._$container = this.option("container");
    this._$leftElement = this.option("leftElement");
    this._$rightElement = this.option("rightElement");
    this.$element().addClass(p).addClass(_);
    this._$splitterBorder = (0, i.default)("<div>").addClass(m).appendTo(this.$element());
    this._$splitter = (0, i.default)("<div>").addClass("dx-splitter").addClass(g).appendTo(this._$splitterBorder);
  };
  l._initActions = function () {
    this._actions = {
      onApplyPanelSize: this._createActionByOption("onApplyPanelSize"),
      onActiveStateChanged: this._createActionByOption("onActiveStateChanged")
    };
  };
  l._render = function () {
    e.prototype._render.call(this);
    this._detachEventHandlers();
    this._attachEventHandlers();
  };
  l._clean = function () {
    this._detachEventHandlers();
    e.prototype._clean.call(this);
  };
  l._attachEventHandlers = function () {
    var e = a.default.getDocument();
    r.default.on(this._$splitterBorder, this.SPLITTER_POINTER_DOWN_EVENT_NAME, this._onMouseDownHandler.bind(this));
    r.default.on(e, this.SPLITTER_POINTER_MOVE_EVENT_NAME, this._onMouseMoveHandler.bind(this));
    r.default.on(e, this.SPLITTER_POINTER_UP_EVENT_NAME, this._onMouseUpHandler.bind(this));
  };
  l._detachEventHandlers = function () {
    var e = a.default.getDocument();
    r.default.off(this._$splitterBorder, this.SPLITTER_POINTER_DOWN_EVENT_NAME);
    r.default.off(e, this.SPLITTER_POINTER_MOVE_EVENT_NAME);
    r.default.off(e, this.SPLITTER_POINTER_UP_EVENT_NAME);
  };
  l._dimensionChanged = function (e) {
    if (!e || e !== "height") {
      this._containerWidth = this._$container.get(0).clientWidth;
      this._setSplitterPositionLeft({
        needUpdatePanels: true,
        usePercentagePanelsWidth: true
      });
    }
  };
  l._onMouseDownHandler = function (e) {
    e.preventDefault();
    this._offsetX = e.pageX - this._$splitterBorder.offset().left <= this._getSplitterBorderWidth() ? e.pageX - this._$splitterBorder.offset().left : 0;
    this._containerWidth = this._$container.get(0).clientWidth;
    this.$element().removeClass(_);
    this._toggleActive(true);
    this._setSplitterPositionLeft({
      needUpdatePanels: true
    });
  };
  l._onMouseMoveHandler = function (e) {
    if (this._isSplitterActive) {
      this._setSplitterPositionLeft({
        splitterPositionLeft: this._getNewSplitterPositionLeft(e),
        needUpdatePanels: true
      });
    }
  };
  l._onMouseUpHandler = function () {
    if (this._isSplitterActive) {
      this._leftPanelPercentageWidth = null;
      this._toggleActive(false);
      this._setSplitterPositionLeft({
        needUpdatePanels: true,
        usePercentagePanelsWidth: true
      });
    }
  };
  l._getNewSplitterPositionLeft = function (e) {
    var t = e.pageX - this._getContainerLeftOffset() - this._offsetX;
    t = Math.max(0 - this._getSplitterOffset(), t);
    return t = Math.min(this._containerWidth - this._getSplitterOffset() - this._getSplitterWidth(), t);
  };
  l._getContainerLeftOffset = function () {
    var e = this._$container.offset().left;
    if (f) {
      var t = f.getComputedStyle(this._$container.get(0));
      e += (parseFloat(t.paddingLeft) || 0) + (parseFloat(t.borderLeftWidth) || 0);
    }
    return e;
  };
  l._getSplitterOffset = function () {
    return (this._getSplitterBorderWidth() - this._getSplitterWidth()) / 2;
  };
  l._getSplitterWidth = function () {
    return this._$splitter.get(0).clientWidth;
  };
  l._getSplitterBorderWidth = function () {
    return this._$splitterBorder.get(0).clientWidth;
  };
  l._getLeftPanelWidth = function () {
    return this._$leftElement.get(0).clientWidth;
  };
  l.getSplitterBorderElement = function () {
    return this._$splitterBorder;
  };
  l._toggleActive = function (e) {
    this.$element().toggleClass(g, !e);
    this._$splitter.toggleClass(g, !e);
    this._isSplitterActive = e;
    this._actions.onActiveStateChanged({
      isActive: e
    });
  };
  l.toggleDisabled = function (e) {
    this.$element().toggleClass("dx-state-disabled", e);
    this._$splitter.toggleClass("dx-state-disabled", e);
  };
  l.isSplitterMoved = function () {
    return !this.$element().hasClass(_);
  };
  l.disableSplitterCalculation = function (e) {
    this._isSplitterCalculationDisabled = e;
  };
  l._setSplitterPositionLeft = function (e = {}) {
    var t = e.splitterPositionLeft;
    var n = t === undefined ? null : t;
    var i = e.needUpdatePanels;
    var o = i !== undefined && i;
    var a = e.usePercentagePanelsWidth;
    var r = a !== undefined && a;
    var s = (n = n || this._getLeftPanelWidth() - this._getSplitterOffset()) + this._getSplitterOffset();
    var l = this._containerWidth - s;
    if (!this._isSplitterCalculationDisabled) {
      this.$element().css("left", n);
    }
    this._leftPanelPercentageWidth = this._leftPanelPercentageWidth || this._convertToPercentage(s);
    var u = this._convertToPercentage(this._containerWidth - this._convertToPixels(this._leftPanelPercentageWidth));
    if (o) {
      this._actions.onApplyPanelSize({
        leftPanelWidth: r ? `${this._leftPanelPercentageWidth}%` : s,
        rightPanelWidth: r ? `${u}%` : l
      });
    }
  };
  l._optionChanged = function (t) {
    switch (t.name) {
      case "initialLeftPanelWidth":
        this._leftPanelPercentageWidth = this._convertToPercentage(t.value);
        this._dimensionChanged();
        break;
      case "leftElement":
        this.repaint();
        break;
      case "onActiveStateChanged":
      case "onApplyPanelSize":
        this._actions[t.name] = this._createActionByOption(t.name);
        break;
      default:
        e.prototype._optionChanged.call(this, t);
    }
  };
  l._convertToPercentage = function (e) {
    return e / this._$container.get(0).clientWidth * 100;
  };
  l._convertToPixels = function (e) {
    return e / 100 * this._$container.get(0).clientWidth;
  };
  return o;
}(o.default);
exports.default = v;
module.exports = exports.default;
module.exports.default = exports.default;