exports.default = undefined;
var i;
var o = require("./58664.js");
var a = (i = require("./68374.js")) && i.__esModule ? i : {
  default: i
};
var r = require("./68890.js");
var s = require("./62754.js");
var l = function () {
  function e(e) {
    this._drawer = e;
  }
  var t = e.prototype;
  t.getDrawerInstance = function () {
    return this._drawer;
  };
  t.renderPanelContent = function (e) {
    var t = this.getDrawerInstance();
    var n = t._getTemplate(t.option("template"));
    if (n) {
      n.render({
        container: t.content(),
        onRendered: function () {
          e.resolve();
        }
      });
    }
  };
  t.renderPosition = function (e, t) {
    var n = new s.Deferred();
    var i = new s.Deferred();
    var o = this.getDrawerInstance();
    if (e) {
      s.when.apply(a.default, [n, i]).done(function () {
        o._animationCompleteHandler();
      });
    }
    this._internalRenderPosition(e, n);
    if (!e) {
      o.resizeViewContent();
    }
    this.renderShaderVisibility(e, t, i);
  };
  t._getPanelOffset = function (e) {
    var t = this.getDrawerInstance();
    var n = t.isHorizontalDirection() ? t.getRealPanelWidth() : t.getRealPanelHeight();
    if (e) {
      return -(n - t.getMaxSize());
    } else {
      return -(n - t.getMinSize());
    }
  };
  t._getPanelSize = function (e) {
    if (e) {
      return this.getDrawerInstance().getMaxSize();
    } else {
      return this.getDrawerInstance().getMinSize();
    }
  };
  t.renderShaderVisibility = function (e, t, n) {
    var i = this;
    var o = this.getDrawerInstance();
    var s = o.option("opened");
    var l = s ? {
      from: 0,
      to: 1
    } : {
      from: 1,
      to: 0
    };
    if (e) {
      r.animation.fade((0, a.default)(o._$shader), l, t, function () {
        i._drawer._toggleShaderVisibility(s);
        n.resolve();
      });
    } else {
      o._toggleShaderVisibility(s);
      o._$shader.css("opacity", l.to);
    }
  };
  t.getPanelContent = function () {
    return (0, a.default)(this.getDrawerInstance().content());
  };
  t.setPanelSize = function (e) {
    this.refreshPanelElementSize(e);
  };
  t.refreshPanelElementSize = function (e) {
    var t = this.getDrawerInstance();
    var n = this._getPanelSize(t.option("opened"));
    if (t.isHorizontalDirection()) {
      (0, o.setWidth)((0, a.default)(t.content()), e ? t.getRealPanelWidth() : n);
    } else {
      (0, o.setHeight)((0, a.default)(t.content()), e ? t.getRealPanelHeight() : n);
    }
  };
  t.isViewContentFirst = function () {
    return false;
  };
  t.onPanelContentRendered = function () {};
  return e;
}();
exports.default = l;
module.exports = exports.default;
module.exports.default = exports.default;