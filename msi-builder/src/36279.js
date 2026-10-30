var i = require("./58664.js");
var o = v(require("./68374.js"));
var a = v(require("./55994.js"));
var r = require("./20576.js");
var s = require("./95429.js");
var l = v(require("./28109.js"));
var u = require("./31648.js");
var d = require("./39611.js");
var c = require("./91633.js");
var h = v(require("./86976.js"));
var f = require("./40245.js");
var p = v(require("./81139.js"));
var g = v(require("./87209.js"));
var m = require("./75811.js");
var _ = v(require("./81476.js"));
function v(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
var y = (0, d.addNamespace)(s.name, "dxListEditDecorator");
var b = (0, d.addNamespace)(c.active, "dxListEditDecorator");
(0, f.register)("menu", "slide", p.default.inherit({
  _shouldHandleSwipe: true,
  _init: function () {
    this.callBase.apply(this, arguments);
    this._$buttonsContainer = (0, o.default)("<div>").addClass("dx-list-slide-menu-buttons-container");
    a.default.on(this._$buttonsContainer, b, r.noop);
    this._$buttons = (0, o.default)("<div>").addClass("dx-list-slide-menu-buttons").appendTo(this._$buttonsContainer);
    this._renderMenu();
    this._renderDeleteButton();
  },
  _renderMenu: function () {
    if (this._menuEnabled()) {
      var e = this._menuItems();
      if (e.length === 1) {
        var t = e[0];
        this._renderMenuButton(t.text, function (e) {
          e.stopPropagation();
          this._fireAction(t);
        }.bind(this));
      } else {
        var n = (0, o.default)("<div>").addClass("dx-list-slide-menu");
        this._menu = this._list._createComponent(n, _.default, {
          showTitle: false,
          items: e,
          onItemClick: function (e) {
            this._fireAction(e.itemData);
          }.bind(this),
          integrationOptions: {}
        });
        n.appendTo(this._list.$element());
        var i = this._renderMenuButton(l.default.format("dxListEditDecorator-more"), function (e) {
          e.stopPropagation();
          this._menu.show();
        }.bind(this));
        this._menu.option("target", i);
      }
    }
  },
  _renderMenuButton: function (e, t) {
    var n = (0, o.default)("<div>").addClass("dx-list-slide-menu-button").addClass("dx-list-slide-menu-button-menu").text(e);
    this._$buttons.append(n);
    a.default.on(n, y, t);
    return n;
  },
  _renderDeleteButton: function () {
    if (this._deleteEnabled()) {
      var e = (0, o.default)("<div>").addClass("dx-list-slide-menu-button").addClass("dx-list-slide-menu-button-delete").text((0, m.isMaterial)() ? "" : l.default.format("dxListEditDecorator-delete"));
      a.default.on(e, y, function (e) {
        e.stopPropagation();
        this._deleteItem();
      }.bind(this));
      this._$buttons.append(e);
    }
  },
  _fireAction: function (e) {
    this._fireMenuAction((0, o.default)(this._cachedNode), e.action);
    this._cancelDeleteReadyItem();
  },
  modifyElement: function (e) {
    this.callBase.apply(this, arguments);
    var t = e.$itemElement;
    t.addClass("dx-list-slide-menu-wrapper");
    var n = (0, o.default)("<div>").addClass("dx-list-slide-menu-content");
    t.wrapInner(n);
  },
  _getDeleteButtonContainer: function () {
    return this._$buttonsContainer;
  },
  handleClick: function (e, t) {
    return !!(0, o.default)(t.target).closest(".dx-list-slide-menu-content").length && this.callBase.apply(this, arguments);
  },
  _swipeStartHandler: function (e) {
    this._enablePositioning(e);
    this._cacheItemData(e);
    this._setPositions(this._getPositions(0));
  },
  _swipeUpdateHandler: function (e, t) {
    var n = this._isRtlEnabled() ? -1 : 1;
    var i = this._isReadyToDelete(e);
    if (this._getCurrentPositions().content !== this._getStartPositions().content || i || !(t.offset * n > 0)) {
      var o = this._cachedItemWidth * t.offset;
      var a = i ? -this._cachedButtonWidth * n : 0;
      var r = (o + a) * n < 0 ? Math.abs((o + a) / this._cachedButtonWidth) : 0;
      this._setPositions(this._getPositions(r));
      return true;
    }
    t.cancel = true;
  },
  _getStartPositions: function () {
    var e = this._isRtlEnabled();
    var t = e ? -1 : 1;
    return {
      content: 0,
      buttonsContainer: e ? -this._cachedButtonWidth : this._cachedItemWidth,
      buttons: -this._cachedButtonWidth * t
    };
  },
  _getPositions: function (e) {
    var t = this._isRtlEnabled() ? -1 : 1;
    var n = this._getStartPositions();
    return {
      content: n.content - e * this._cachedButtonWidth * t,
      buttonsContainer: n.buttonsContainer - Math.min(e, 1) * this._cachedButtonWidth * t,
      buttons: n.buttons + Math.min(e, 1) * this._cachedButtonWidth * t
    };
  },
  _getCurrentPositions: function () {
    return {
      content: (0, u.locate)(this._$cachedContent).left,
      buttonsContainer: (0, u.locate)(this._$buttonsContainer).left,
      buttons: (0, u.locate)(this._$buttons).left
    };
  },
  _setPositions: function (e) {
    (0, u.move)(this._$cachedContent, {
      left: e.content
    });
    (0, u.move)(this._$buttonsContainer, {
      left: e.buttonsContainer
    });
    (0, u.move)(this._$buttons, {
      left: e.buttons
    });
  },
  _cacheItemData: function (e) {
    if (e[0] !== this._cachedNode) {
      this._$cachedContent = e.find(".dx-list-slide-menu-content");
      this._cachedItemWidth = (0, i.getOuterWidth)(e);
      this._cachedButtonWidth = this._cachedButtonWidth || (0, i.getOuterWidth)(this._$buttons);
      (0, i.setWidth)(this._$buttonsContainer, this._cachedButtonWidth);
      if (this._$cachedContent.length) {
        this._cachedNode = e[0];
      }
    }
  },
  _minButtonContainerLeftOffset: function () {
    return this._cachedItemWidth - this._cachedButtonWidth;
  },
  _swipeEndHandler: function (e, t) {
    this._cacheItemData(e);
    var n = this._isRtlEnabled() ? 1 : -1;
    var i = this._cachedItemWidth * t.offset;
    var o = !this._isReadyToDelete(e) && i * n > this._cachedButtonWidth * 0.2;
    var a = t.targetOffset === n && o;
    this._toggleDeleteReady(e, a);
    return true;
  },
  _enablePositioning: function (e) {
    g.default.stop(this._$cachedContent, true);
    this.callBase.apply(this, arguments);
    this._$buttonsContainer.appendTo(e);
  },
  _disablePositioning: function () {
    this.callBase.apply(this, arguments);
    this._$buttonsContainer.detach();
  },
  _animatePrepareDeleteReady: function () {
    return this._animateToPositions(this._getPositions(1));
  },
  _animateForgetDeleteReady: function (e) {
    this._cacheItemData(e);
    return this._animateToPositions(this._getPositions(0));
  },
  _animateToPositions: function (e) {
    var t = this;
    var n = this._getCurrentPositions();
    var i = Math.min(Math.abs(n.content - e.content) / this._cachedButtonWidth, 1);
    return g.default.animate(this._$cachedContent, {
      from: n,
      to: e,
      easing: "cubic-bezier(0.075, 0.82, 0.165, 1)",
      duration: i * 400,
      strategy: "frame",
      draw: function (e) {
        t._setPositions(e);
      }
    });
  },
  dispose: function () {
    if (this._menu) {
      this._menu.$element().remove();
    }
    if (this._$buttonsContainer) {
      this._$buttonsContainer.remove();
    }
    this.callBase.apply(this, arguments);
  }
}).include(h.default));