exports.default = undefined;
var i = require("./58664.js");
var o = d(require("./68374.js"));
var a = d(require("./55994.js"));
var r = require("./20576.js");
var s = d(require("./38377.js"));
var l = require("./34309.js");
var u = require("./39611.js");
function d(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
var c = (0, u.addNamespace)(l.start, "dxListEditDecorator");
var h = (0, u.addNamespace)(l.swipe, "dxListEditDecorator");
var f = (0, u.addNamespace)(l.end, "dxListEditDecorator");
var p = s.default.inherit({
  ctor: function (e) {
    this._list = e;
    this._init();
  },
  _init: r.noop,
  _shouldHandleSwipe: false,
  _attachSwipeEvent: function (e) {
    var t = {
      itemSizeFunc: function () {
        if (this._clearSwipeCache) {
          this._itemWidthCache = (0, i.getWidth)(this._list.$element());
          this._clearSwipeCache = false;
        }
        return this._itemWidthCache;
      }.bind(this)
    };
    a.default.on(e.$itemElement, c, t, this._itemSwipeStartHandler.bind(this));
    a.default.on(e.$itemElement, h, this._itemSwipeUpdateHandler.bind(this));
    a.default.on(e.$itemElement, f, this._itemSwipeEndHandler.bind(this));
  },
  _itemSwipeStartHandler: function (e) {
    var t = (0, o.default)(e.currentTarget);
    if (t.is(".dx-state-disabled, .dx-state-disabled *")) {
      e.cancel = true;
    } else {
      clearTimeout(this._list._inkRippleTimer);
      this._swipeStartHandler(t, e);
    }
  },
  _itemSwipeUpdateHandler: function (e) {
    var t = (0, o.default)(e.currentTarget);
    this._swipeUpdateHandler(t, e);
  },
  _itemSwipeEndHandler: function (e) {
    var t = (0, o.default)(e.currentTarget);
    this._swipeEndHandler(t, e);
    this._clearSwipeCache = true;
  },
  beforeBag: r.noop,
  afterBag: r.noop,
  _commonOptions: function () {
    return {
      activeStateEnabled: this._list.option("activeStateEnabled"),
      hoverStateEnabled: this._list.option("hoverStateEnabled"),
      focusStateEnabled: this._list.option("focusStateEnabled")
    };
  },
  modifyElement: function (e) {
    if (this._shouldHandleSwipe) {
      this._attachSwipeEvent(e);
      this._clearSwipeCache = true;
    }
  },
  afterRender: r.noop,
  handleClick: r.noop,
  handleKeyboardEvents: r.noop,
  handleEnterPressing: r.noop,
  handleContextMenu: r.noop,
  _swipeStartHandler: r.noop,
  _swipeUpdateHandler: r.noop,
  _swipeEndHandler: r.noop,
  visibilityChange: r.noop,
  getExcludedSelectors: r.noop,
  dispose: r.noop
});
exports.default = p;
module.exports = exports.default;
module.exports.default = exports.default;