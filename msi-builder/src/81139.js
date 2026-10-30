exports.default = undefined;
var i = require("./58664.js");
var o = c(require("./68374.js"));
var a = c(require("./55994.js"));
var r = require("./20576.js");
var s = c(require("./61225.js"));
var l = require("./39611.js");
var u = c(require("./93786.js"));
var d = require("./91633.js");
function c(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
var h = s.default.abstract;
var f = (0, l.addNamespace)(u.default.down, "dxListEditDecorator");
var p = (0, l.addNamespace)(d.active, "dxListEditDecorator");
var g = s.default.inherit({
  _init: function () {
    this._$topShield = (0, o.default)("<div>").addClass("dx-list-switchable-delete-top-shield");
    this._$bottomShield = (0, o.default)("<div>").addClass("dx-list-switchable-delete-bottom-shield");
    this._$itemContentShield = (0, o.default)("<div>").addClass("dx-list-switchable-delete-item-content-shield");
    a.default.on(this._$topShield, f, this._cancelDeleteReadyItem.bind(this));
    a.default.on(this._$bottomShield, f, this._cancelDeleteReadyItem.bind(this));
    this._list.$element().append(this._$topShield.toggle(false)).append(this._$bottomShield.toggle(false));
  },
  handleClick: function () {
    return this._cancelDeleteReadyItem();
  },
  _cancelDeleteReadyItem: function () {
    return !!this._$readyToDeleteItem && (this._cancelDelete(this._$readyToDeleteItem), true);
  },
  _cancelDelete: function (e) {
    this._toggleDeleteReady(e, false);
  },
  _toggleDeleteReady: function (e, t = !this._isReadyToDelete(e)) {
    this._toggleShields(e, t);
    this._toggleScrolling(t);
    this._cacheReadyToDeleteItem(e, t);
    this._animateToggleDelete(e, t);
  },
  _isReadyToDelete: function (e) {
    return e.hasClass("dx-list-switchable-delete-ready");
  },
  _toggleShields: function (e, t) {
    this._list.$element().toggleClass("dx-list-switchable-menu-shield-positioning", t);
    this._$topShield.toggle(t);
    this._$bottomShield.toggle(t);
    if (t) {
      this._updateShieldsHeight(e);
    }
    this._toggleContentShield(e, t);
  },
  _updateShieldsHeight: function (e) {
    var t = this._list.$element();
    var n = t.offset().top;
    var o = (0, i.getOuterHeight)(t);
    var a = e.offset().top - n;
    var r = o - (0, i.getOuterHeight)(e) - a;
    (0, i.setHeight)(this._$topShield, Math.max(a, 0));
    (0, i.setHeight)(this._$bottomShield, Math.max(r, 0));
  },
  _toggleContentShield: function (e, t) {
    if (t) {
      e.find(".dx-list-item-content").first().append(this._$itemContentShield);
    } else {
      this._$itemContentShield.detach();
    }
  },
  _toggleScrolling: function (e) {
    var t = this._list.$element().dxScrollView("instance");
    if (e) {
      t.on("start", this._cancelScrolling);
    } else {
      t.off("start", this._cancelScrolling);
    }
  },
  _cancelScrolling: function (e) {
    e.event.cancel = true;
  },
  _cacheReadyToDeleteItem: function (e, t) {
    if (t) {
      this._$readyToDeleteItem = e;
    } else {
      delete this._$readyToDeleteItem;
    }
  },
  _animateToggleDelete: function (e, t) {
    if (t) {
      this._enablePositioning(e);
      this._prepareDeleteReady(e);
      this._animatePrepareDeleteReady(e);
      a.default.off(e, u.default.up);
    } else {
      this._forgetDeleteReady(e);
      this._animateForgetDeleteReady(e).done(this._disablePositioning.bind(this, e));
    }
  },
  _enablePositioning: function (e) {
    e.addClass("dx-list-switchable-menu-item-shield-positioning");
    a.default.on(e, p, r.noop);
    a.default.one(e, u.default.up, this._disablePositioning.bind(this, e));
  },
  _disablePositioning: function (e) {
    e.removeClass("dx-list-switchable-menu-item-shield-positioning");
    a.default.off(e, p);
  },
  _prepareDeleteReady: function (e) {
    e.addClass("dx-list-switchable-delete-ready");
  },
  _forgetDeleteReady: function (e) {
    e.removeClass("dx-list-switchable-delete-ready");
  },
  _animatePrepareDeleteReady: h,
  _animateForgetDeleteReady: h,
  _getDeleteButtonContainer: function (e) {
    return (e = e || this._$readyToDeleteItem).children(".dx-list-switchable-delete-button-container");
  },
  _deleteItem: function (e) {
    e = e || this._$readyToDeleteItem;
    this._getDeleteButtonContainer(e).detach();
    if (!e.is(".dx-state-disabled, .dx-state-disabled *")) {
      this._list.deleteItem(e).always(this._cancelDelete.bind(this, e));
    }
  },
  _isRtlEnabled: function () {
    return this._list.option("rtlEnabled");
  },
  dispose: function () {
    if (this._$topShield) {
      this._$topShield.remove();
    }
    if (this._$bottomShield) {
      this._$bottomShield.remove();
    }
    this.callBase.apply(this, arguments);
  }
});
exports.default = g;
module.exports = exports.default;
module.exports.default = exports.default;