exports.default = undefined;
var i = require("./58664.js");
var o = u(require("./68374.js"));
var a = require("./13306.js");
var r = require("./58201.js");
var s = u(require("./51495.js"));
var l = u(require("./47596.js"));
function u(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
function d(e, t) {
  return (d = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (e, t) {
    e.__proto__ = t;
    return e;
  })(e, t);
}
var c = function (e) {
  var t;
  var n;
  function l() {
    return e.apply(this, arguments) || this;
  }
  n = e;
  (t = l).prototype = Object.create(n.prototype);
  t.prototype.constructor = t;
  d(t, n);
  var u = l.prototype;
  u._init = function () {
    e.prototype._init.call(this);
    this._createOnVisibilityChangingAction();
    this._createOnVisibilityChangedAction();
  };
  u.isVisible = function () {
    return this.option("isVisible");
  };
  u.isMobileView = function () {
    return this.option("isMobileView");
  };
  u._initMarkup = function () {
    e.prototype._initMarkup.call(this);
    var t = this.$element();
    var n = (0, o.default)("<div>").addClass(this._getPopupClass()).addClass(this.isMobileView() && "dx-diagram-mobile-popup").appendTo(t);
    this._popup = this._createComponent(n, s.default, this._getPopupOptions());
    this._updatePopupVisible();
  };
  u.show = function () {
    this.option("isVisible", true);
  };
  u.hide = function () {
    this.option("isVisible", false);
  };
  u.toggle = function () {
    this.option("isVisible", !this.isVisible());
  };
  u.repaint = function () {
    this._popup.repaint();
  };
  u._getPopupContent = function () {
    return this._popup.content();
  };
  u._getPopupTitle = function () {
    return (0, o.default)(this._getPopupContent()).parent().find(".dx-popup-title");
  };
  u._getPointerUpElements = function () {
    return [this._getPopupContent(), this._getPopupTitle()];
  };
  u._getVerticalPaddingsAndBorders = function () {
    var e = (0, o.default)(this._getPopupContent());
    return (0, i.getOuterHeight)(e) - (0, i.getHeight)(e);
  };
  u._getHorizontalPaddingsAndBorders = function () {
    var e = (0, o.default)(this._getPopupContent());
    return (0, i.getOuterWidth)(e) - (0, i.getWidth)(e);
  };
  u._getPopupClass = function () {
    return "";
  };
  u._getPopupWidth = function () {
    return this.option("width") || "auto";
  };
  u._getPopupMaxWidth = function () {
    return this.option("maxWidth");
  };
  u._getPopupMinWidth = function () {
    return this.option("minWidth");
  };
  u._getPopupHeight = function () {
    return this.option("height") || "auto";
  };
  u._getPopupMaxHeight = function () {
    return this.option("maxHeight");
  };
  u._getPopupMinHeight = function () {
    return this.option("minHeight");
  };
  u._getPopupPosition = function () {
    return {};
  };
  u._getPopupContainer = function () {
    return this.option("container");
  };
  u._getPopupSlideAnimationObject = function (e) {
    return (0, a.extend)({
      type: "slide",
      start: function () {
        (0, o.default)("body").css("overflow", "hidden");
      },
      complete: function () {
        (0, o.default)("body").css("overflow", "");
      }
    }, e);
  };
  u._getPopupAnimation = function () {
    return {
      hide: {
        type: "fadeOut"
      },
      show: {
        type: "fadeIn"
      }
    };
  };
  u._getPopupOptions = function () {
    var e = this;
    var t = this;
    return {
      animation: (0, r.hasWindow)() ? this._getPopupAnimation() : null,
      shading: false,
      showTitle: false,
      focusStateEnabled: false,
      container: this._getPopupContainer(),
      width: this._getPopupWidth(),
      height: this._getPopupHeight(),
      maxWidth: this._getPopupMaxWidth(),
      maxHeight: this._getPopupMaxHeight(),
      minWidth: this._getPopupMinWidth(),
      minHeight: this._getPopupMinHeight(),
      position: this._getPopupPosition(),
      showCloseButton: true,
      copyRootClassesToWrapper: true,
      _ignoreCopyRootClassesToWrapperDeprecation: true,
      onContentReady: function () {
        t._renderPopupContent(t._popup.content());
      },
      onShowing: function () {
        e._onVisibilityChangingAction({
          visible: true,
          component: e
        });
      },
      onShown: function () {
        e.option("isVisible", true);
        e._onVisibilityChangedAction({
          visible: true,
          component: e
        });
      },
      onHiding: function () {
        e._onVisibilityChangingAction({
          visible: false,
          component: e
        });
      },
      onHidden: function () {
        e.option("isVisible", false);
        e._onVisibilityChangedAction({
          visible: false,
          component: e
        });
      }
    };
  };
  u._renderPopupContent = function (e) {};
  u._updatePopupVisible = function () {
    this._popup.option("visible", this.isVisible());
  };
  u._createOnVisibilityChangingAction = function () {
    this._onVisibilityChangingAction = this._createActionByOption("onVisibilityChanging");
  };
  u._createOnVisibilityChangedAction = function () {
    this._onVisibilityChangedAction = this._createActionByOption("onVisibilityChanged");
  };
  u._optionChanged = function (t) {
    switch (t.name) {
      case "onVisibilityChanging":
        this._createOnVisibilityChangingAction();
        break;
      case "onVisibilityChanged":
        this._createOnVisibilityChangedAction();
        break;
      case "container":
        this._popup.option("container", this._getPopupContainer());
        break;
      case "width":
        this._popup.option("width", this._getPopupWidth());
        break;
      case "height":
        this._popup.option("height", this._getPopupHeight());
        break;
      case "maxWidth":
        this._popup.option("maxWidth", this._getPopupMaxWidth());
        break;
      case "maxHeight":
        this._popup.option("maxHeight", this._getPopupMaxHeight());
        break;
      case "minWidth":
        this._popup.option("minWidth", this._getPopupMinWidth());
        break;
      case "minHeight":
        this._popup.option("minHeight", this._getPopupMinHeight());
        break;
      case "isMobileView":
        this._invalidate();
        break;
      case "isVisible":
        this._updatePopupVisible();
        break;
      default:
        e.prototype._optionChanged.call(this, t);
    }
  };
  u._getDefaultOptions = function () {
    return (0, a.extend)(e.prototype._getDefaultOptions.call(this), {
      isVisible: true,
      isMobileView: false,
      offsetX: 0,
      offsetY: 0
    });
  };
  return l;
}(l.default);
exports.default = c;
module.exports = exports.default;
module.exports.default = exports.default;