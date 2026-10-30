exports.default = undefined;
var i = require("./58664.js");
var o = d(require("./68374.js"));
var a = d(require("./87209.js"));
var r = d(require("./63008.js"));
var s = d(require("./28109.js"));
var l = require("./40245.js");
var u = d(require("./81139.js"));
function d(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
var c = u.default.inherit({
  _init: function () {
    this.callBase.apply(this, arguments);
    var e = (0, o.default)("<div>").addClass("dx-list-switchable-delete-button-container");
    var t = (0, o.default)("<div>").addClass("dx-list-switchable-delete-button-wrapper");
    var n = (0, o.default)("<div>").addClass("dx-list-switchable-delete-button-inner-wrapper");
    var i = (0, o.default)("<div>").addClass("dx-list-switchable-delete-button");
    this._list._createComponent(i, r.default, {
      text: s.default.format("dxListEditDecorator-delete"),
      type: "danger",
      onClick: function (e) {
        this._deleteItem();
        e.event.stopPropagation();
      }.bind(this),
      integrationOptions: {}
    });
    e.append(t);
    t.append(n);
    n.append(i);
    this._$buttonContainer = e;
  },
  _enablePositioning: function (e) {
    this.callBase.apply(this, arguments);
    a.default.stop(this._$buttonContainer, true);
    this._$buttonContainer.appendTo(e);
  },
  _disablePositioning: function () {
    this.callBase.apply(this, arguments);
    this._$buttonContainer.detach();
  },
  _animatePrepareDeleteReady: function () {
    var e = this._isRtlEnabled();
    var t = (0, i.getWidth)(this._list.$element());
    var n = this._buttonWidth();
    var o = e ? t : -n;
    var r = e ? t - n : 0;
    return a.default.animate(this._$buttonContainer, {
      type: "custom",
      duration: 200,
      from: {
        right: o
      },
      to: {
        right: r
      }
    });
  },
  _animateForgetDeleteReady: function () {
    var e = this._isRtlEnabled();
    var t = (0, i.getWidth)(this._list.$element());
    var n = this._buttonWidth();
    var o = e ? t - n : 0;
    var r = e ? t : -n;
    return a.default.animate(this._$buttonContainer, {
      type: "custom",
      duration: 200,
      from: {
        right: o
      },
      to: {
        right: r
      }
    });
  },
  _buttonWidth: function () {
    this._buttonContainerWidth ||= (0, i.getOuterWidth)(this._$buttonContainer);
    return this._buttonContainerWidth;
  },
  dispose: function () {
    if (this._$buttonContainer) {
      this._$buttonContainer.remove();
    }
    this.callBase.apply(this, arguments);
  }
});
(0, l.register)("delete", "toggle", c.inherit({
  beforeBag: function (e) {
    var t = e.$itemElement;
    var n = e.$container;
    var i = (0, o.default)("<div>").addClass("dx-list-toggle-delete-switch");
    this._list._createComponent(i, r.default, {
      icon: "toggle-delete",
      onClick: function (e) {
        a.default.stop(this._$buttonContainer, false);
        this._toggleDeleteReady(t);
        e.event.stopPropagation();
      }.bind(this),
      integrationOptions: {}
    });
    n.addClass("dx-list-toggle-delete-switch-container");
    n.append(i);
  }
}));
(0, l.register)("delete", "slideButton", c.inherit({
  _shouldHandleSwipe: true,
  _swipeEndHandler: function (e, t) {
    if (t.targetOffset !== 0) {
      a.default.stop(this._$buttonContainer, false);
      this._toggleDeleteReady(e);
    }
    return true;
  }
}));
var h = c;
exports.default = h;
module.exports = exports.default;
module.exports.default = exports.default;