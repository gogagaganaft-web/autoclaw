exports.default = undefined;
var i = require("./58664.js");
var o = h(require("./68374.js"));
var a = require("./58201.js");
var r = require("./60137.js");
var s = require("./75811.js");
var l = require("./13306.js");
var u = h(require("./20530.js"));
var d = h(require("./99393.js"));
var c = h(require("./14390.js"));
function h(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
var f = (0, a.getNavigator)();
var p = c.default.inherit({
  _getDefaultOptions: function () {
    return (0, l.extend)(this.callBase(), {
      indicatorSrc: "",
      activeStateEnabled: false,
      hoverStateEnabled: false,
      _animatingSegmentCount: 1,
      _animatingSegmentInner: false
    });
  },
  _defaultOptionsRules: function () {
    var e = (0, s.current)();
    return this.callBase().concat([{
      device: function () {
        return u.default.real().platform === "android" && !/chrome/i.test(f.userAgent);
      },
      options: {
        viaImage: true
      }
    }, {
      device: function () {
        return (0, s.isMaterial)(e);
      },
      options: {
        _animatingSegmentCount: 2,
        _animatingSegmentInner: true
      }
    }, {
      device: function () {
        return (0, s.isGeneric)(e);
      },
      options: {
        _animatingSegmentCount: 7
      }
    }]);
  },
  _useTemplates: function () {
    return false;
  },
  _init: function () {
    this.callBase();
    this.$element().addClass("dx-loadindicator");
  },
  _initMarkup: function () {
    this.callBase();
    this._renderWrapper();
    this._renderIndicatorContent();
    this._renderMarkup();
  },
  _renderWrapper: function () {
    this._$wrapper = (0, o.default)("<div>").addClass("dx-loadindicator-wrapper");
    this.$element().append(this._$wrapper);
  },
  _renderIndicatorContent: function () {
    this._$content = (0, o.default)("<div>").addClass("dx-loadindicator-content");
    this._$wrapper.append(this._$content);
  },
  _renderMarkup: function () {
    if (!(0, r.animation)() || this.option("viaImage") || this.option("indicatorSrc")) {
      this._renderMarkupForImage();
    } else {
      this._renderMarkupForAnimation();
    }
  },
  _renderMarkupForAnimation: function () {
    var e = this.option("_animatingSegmentInner");
    this._$indicator = (0, o.default)("<div>").addClass("dx-loadindicator-icon");
    this._$content.append(this._$indicator);
    for (var t = this.option("_animatingSegmentCount"); t >= 0; --t) {
      var n = (0, o.default)("<div>").addClass("dx-loadindicator-segment").addClass("dx-loadindicator-segment" + t);
      if (e) {
        n.append((0, o.default)("<div>").addClass("dx-loadindicator-segment-inner"));
      }
      this._$indicator.append(n);
    }
  },
  _renderMarkupForImage: function () {
    var e = this.option("indicatorSrc");
    this._$wrapper.addClass("dx-loadindicator-image");
    if (e) {
      this._$wrapper.css("backgroundImage", "url(" + e + ")");
    }
  },
  _renderDimensions: function () {
    this.callBase();
    this._updateContentSizeForAnimation();
  },
  _updateContentSizeForAnimation: function () {
    if (this._$indicator) {
      var e = this.option("width");
      var t = this.option("height");
      if (e || t) {
        e = (0, i.getWidth)(this.$element());
        t = (0, i.getHeight)(this.$element());
        var n = Math.min(t, e);
        this._$wrapper.css({
          height: n,
          width: n,
          fontSize: n
        });
      }
    }
  },
  _clean: function () {
    this.callBase();
    this._removeMarkupForAnimation();
    this._removeMarkupForImage();
  },
  _removeMarkupForAnimation: function () {
    if (this._$indicator) {
      this._$indicator.remove();
      delete this._$indicator;
    }
  },
  _removeMarkupForImage: function () {
    this._$wrapper.css("backgroundImage", "none");
  },
  _optionChanged: function (e) {
    switch (e.name) {
      case "_animatingSegmentCount":
      case "_animatingSegmentInner":
      case "indicatorSrc":
        this._invalidate();
        break;
      default:
        this.callBase(e);
    }
  }
});
(0, d.default)("dxLoadIndicator", p);
var g = p;
exports.default = g;
module.exports = exports.default;
module.exports.default = exports.default;