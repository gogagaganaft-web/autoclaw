exports.default = undefined;
var i = require("./58664.js");
var o = d(require("./68374.js"));
var a = require("./20576.js");
var r = require("./6415.js");
var s = d(require("./49387.js"));
var l = require("./13306.js");
var u = d(require("./10042.js"));
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
  function u() {
    return e.apply(this, arguments) || this;
  }
  n = e;
  (t = u).prototype = Object.create(n.prototype);
  t.prototype.constructor = t;
  c(t, n);
  var d = u.prototype;
  d._getDefaultOptions = function () {
    return (0, l.extend)(e.prototype._getDefaultOptions.call(this), {
      orientation: "horizontal",
      tabIndex: null,
      onHoverStart: a.noop
    });
  };
  d._initDataAdapter = function () {
    this._dataAdapter = this.option("_dataAdapter");
    if (!this._dataAdapter) {
      e.prototype._initDataAdapter.call(this);
    }
  };
  d._renderContentImpl = function () {
    this._renderContextMenuOverlay();
    e.prototype._renderContentImpl.call(this);
    var t = this._dataAdapter.getNodeByKey(this.option("_parentKey"));
    if (t) {
      this._renderItems(this._getChildNodes(t));
    }
    this._renderDelimiter();
  };
  d._renderDelimiter = function () {
    this.$contentDelimiter = (0, o.default)("<div>").appendTo(this._itemContainer()).addClass("dx-context-menu-content-delimiter");
  };
  d._getOverlayOptions = function () {
    return (0, l.extend)(e.prototype._getOverlayOptions.call(this), {
      onPositioned: this._overlayPositionedActionHandler.bind(this)
    });
  };
  d._overlayPositionedActionHandler = function (e) {
    this._showDelimiter(e);
  };
  d._hoverEndHandler = function (t) {
    e.prototype._hoverEndHandler.call(this, t);
    this._toggleFocusClass(false, t.currentTarget);
  };
  d._isMenuHorizontal = function () {
    return this.option("orientation") === "horizontal";
  };
  d._hoverStartHandler = function (t) {
    this.option("onHoverStart")(t);
    e.prototype._hoverStartHandler.call(this, t);
    this._toggleFocusClass(true, t.currentTarget);
  };
  d._drawSubmenu = function (t) {
    this._actions.onShowing({
      rootItem: (0, r.getPublicElement)(t),
      submenu: this
    });
    e.prototype._drawSubmenu.call(this, t);
    this._actions.onShown({
      rootItem: (0, r.getPublicElement)(t),
      submenu: this
    });
  };
  d._hideSubmenu = function (t) {
    this._actions.onHiding({
      cancel: true,
      rootItem: (0, r.getPublicElement)(t),
      submenu: this
    });
    e.prototype._hideSubmenu.call(this, t);
    this._actions.onHidden({
      rootItem: (0, r.getPublicElement)(t),
      submenu: this
    });
  };
  d._showDelimiter = function (e) {
    if (this.$contentDelimiter) {
      var t = this._itemContainer().children(`.dx-submenu`).eq(0);
      var n = this.option("position").of;
      var o = {
        of: t
      };
      var a = e.position;
      var r = a.v.location;
      var l = a.h.location;
      var u = n.offset();
      var d = Math.round(u.left);
      var c = Math.round(u.top);
      var h = (0, i.getWidth)(n);
      var f = (0, i.getHeight)(n);
      var p = (0, i.getWidth)(t);
      var g = (0, i.getHeight)(t);
      this.$contentDelimiter.css("display", "block");
      (0, i.setWidth)(this.$contentDelimiter, this._isMenuHorizontal() ? h < p ? h - 2 : p : 2);
      (0, i.setHeight)(this.$contentDelimiter, this._isMenuHorizontal() ? 2 : f < g ? f - 2 : g);
      if (this._isMenuHorizontal()) {
        if (r > c) {
          if (Math.round(l) === d) {
            o.offset = "1 -1";
            o.at = o.my = "left top";
          } else {
            o.offset = "-1 -1";
            o.at = o.my = "right top";
          }
        } else {
          (0, i.setHeight)(this.$contentDelimiter, 5);
          if (Math.round(l) === d) {
            o.offset = "1 4";
            o.at = o.my = "left bottom";
          } else {
            o.offset = "-1 2";
            o.at = o.my = "right bottom";
          }
        }
      } else if (l > d) {
        if (Math.round(r) === c) {
          o.offset = "-1 1";
          o.at = o.my = "left top";
        } else {
          o.offset = "-1 -1";
          o.at = o.my = "left bottom";
        }
      } else if (Math.round(r) === c) {
        o.offset = "1 1";
        o.at = o.my = "right top";
      } else {
        o.offset = "1 -1";
        o.at = o.my = "right bottom";
      }
      s.default.setup(this.$contentDelimiter, o);
    }
  };
  d._getContextMenuPosition = function () {
    return this.option("position");
  };
  d.isOverlayVisible = function () {
    return this._overlay.option("visible");
  };
  d.getOverlayContent = function () {
    return this._overlay.$content();
  };
  return u;
}(u.default);
exports.default = h;
module.exports = exports.default;
module.exports.default = exports.default;