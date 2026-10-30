exports.default = undefined;
var i = x(require("./68374.js"));
var o = x(require("./55994.js"));
var a = require("./35922.js");
var r = require("./6415.js");
var s = x(require("./99393.js"));
var l = require("./13306.js");
var u = require("./37518.js");
var d = x(require("./14390.js"));
var c = require("./10688.js");
var h = require("./58201.js");
var f = x(require("./89266.js"));
var p = x(require("./74780.js"));
var g = x(require("./5738.js"));
var m = require("./68890.js");
var _ = require("./95429.js");
var v = x(require("./87209.js"));
var y = require("./62754.js");
var b = require("./80506.js");
function x(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
var w = d.default.inherit({
  _getDefaultOptions: function () {
    return (0, l.extend)(this.callBase(), {
      position: "left",
      opened: false,
      minSize: null,
      maxSize: null,
      shading: false,
      template: "panel",
      openedStateMode: "shrink",
      revealMode: "slide",
      animationEnabled: true,
      animationDuration: 400,
      closeOnOutsideClick: false,
      contentTemplate: "content"
    });
  },
  _init: function () {
    this.callBase();
    this._initStrategy();
    this.$element().addClass("dx-drawer");
    this._whenAnimationCompleted = undefined;
    this._whenPanelContentRendered = undefined;
    this._whenPanelContentRefreshed = undefined;
    this._$wrapper = (0, i.default)("<div>").addClass("dx-drawer-wrapper");
    this._$viewContentWrapper = (0, i.default)("<div>").addClass("dx-drawer-content");
    this._$wrapper.append(this._$viewContentWrapper);
    this.$element().append(this._$wrapper);
  },
  _initStrategy: function () {
    switch (this.option("openedStateMode")) {
      case "push":
        this._strategy = new f.default(this);
        break;
      case "shrink":
        this._strategy = new p.default(this);
        break;
      case "overlap":
        this._strategy = new g.default(this);
        break;
      default:
        this._strategy = new f.default(this);
    }
  },
  _getAnonymousTemplateName: function () {
    return "content";
  },
  _initTemplates: function () {
    var e = {
      panel: new c.EmptyTemplate(),
      content: new c.EmptyTemplate()
    };
    this._templateManager.addDefaultTemplates(e);
    this.callBase();
  },
  _viewContentWrapperClickHandler: function (e) {
    var t = this.option("closeOnOutsideClick");
    if ((0, a.isFunction)(t)) {
      t = t(e);
    }
    if (t && this.option("opened")) {
      this.stopAnimations();
      if (this.option("shading")) {
        e.preventDefault();
      }
      this.hide();
    }
  },
  _initMarkup: function () {
    this.callBase();
    this._toggleOpenedStateClass(this.option("opened"));
    this._renderPanelContentWrapper();
    this._refreshOpenedStateModeClass();
    this._refreshRevealModeClass();
    this._renderShader();
    this._refreshPositionClass();
    this._whenPanelContentRendered = new y.Deferred();
    this._strategy.renderPanelContent(this._whenPanelContentRendered);
    this._strategy.onPanelContentRendered();
    this._renderViewContent();
    o.default.off(this._$viewContentWrapper, _.name);
    o.default.on(this._$viewContentWrapper, _.name, this._viewContentWrapperClickHandler.bind(this));
    this._refreshWrapperChildrenOrder();
  },
  _render: function () {
    var e = this;
    this._initMinMaxSize();
    this.callBase();
    this._whenPanelContentRendered.always(function () {
      e._initMinMaxSize();
      e._strategy.refreshPanelElementSize(e.option("revealMode") === "slide" || !e.isHorizontalDirection());
      e._renderPosition(e.option("opened"), true);
      e._removePanelManualPosition();
    });
  },
  _removePanelManualPosition: function () {
    if (this._$panelContentWrapper.attr("manualposition")) {
      this._$panelContentWrapper.removeAttr("manualPosition");
      this._$panelContentWrapper.css({
        position: "",
        top: "",
        left: "",
        right: "",
        bottom: ""
      });
    }
  },
  _renderPanelContentWrapper: function () {
    this._$panelContentWrapper = (0, i.default)("<div>").addClass("dx-drawer-panel-content");
    var e = this.calcTargetPosition();
    if (this.option("openedStateMode") === "push" && ["top", "bottom"].indexOf(e) > -1) {
      this._$panelContentWrapper.addClass("dx-drawer-panel-content-push-top-or-bottom");
    }
    if (this.option("openedStateMode") !== "overlap" && !this.option("opened") && !this.option("minSize")) {
      this._$panelContentWrapper.attr("manualposition", true);
      this._$panelContentWrapper.css({
        position: "absolute",
        top: "-10000px",
        left: "-10000px",
        right: "auto",
        bottom: "auto"
      });
    }
    this._$wrapper.append(this._$panelContentWrapper);
  },
  _refreshOpenedStateModeClass: function (e) {
    if (e) {
      this.$element().removeClass("dx-drawer-" + e);
    }
    this.$element().addClass("dx-drawer-" + this.option("openedStateMode"));
  },
  _refreshPositionClass: function (e) {
    if (e) {
      this.$element().removeClass("dx-drawer-" + e);
    }
    this.$element().addClass("dx-drawer-" + this.calcTargetPosition());
  },
  _refreshWrapperChildrenOrder: function () {
    var e = this.calcTargetPosition();
    if (this._strategy.isViewContentFirst(e, this.option("rtlEnabled"))) {
      this._$wrapper.prepend(this._$viewContentWrapper);
    } else {
      this._$wrapper.prepend(this._$panelContentWrapper);
    }
  },
  _refreshRevealModeClass: function (e) {
    if (e) {
      this.$element().removeClass("dx-drawer-" + e);
    }
    this.$element().addClass("dx-drawer-" + this.option("revealMode"));
  },
  _renderViewContent: function () {
    var e = this.option("contentTemplate");
    var t = this._getTemplate(e);
    if (t) {
      var n = t.render({
        container: this.viewContent(),
        noModel: true,
        transclude: this._templateManager.anonymousTemplateName === e
      });
      if (n.hasClass("ng-scope")) {
        (0, i.default)(this._$viewContentWrapper).children().not(`.dx-drawer-shader`).replaceWith(n);
      }
    }
  },
  _renderShader: function () {
    this._$shader = this._$shader || (0, i.default)("<div>").addClass("dx-drawer-shader");
    this._$shader.appendTo(this.viewContent());
    this._toggleShaderVisibility(this.option("opened"));
  },
  _initSize: function () {
    this._initMinMaxSize();
  },
  _initMinMaxSize: function () {
    var e = this.isHorizontalDirection() ? this.getRealPanelWidth() : this.getRealPanelHeight();
    this._maxSize = this.option("maxSize") || e;
    this._minSize = this.option("minSize") || 0;
  },
  calcTargetPosition: function () {
    var e = this.option("position");
    var t = this.option("rtlEnabled");
    var n = e;
    if (e === "before") {
      n = t ? "right" : "left";
    } else if (e === "after") {
      n = t ? "left" : "right";
    }
    return n;
  },
  getOverlayTarget: function () {
    return this._$wrapper;
  },
  getOverlay: function () {
    return this._overlay;
  },
  getMaxSize: function () {
    return this._maxSize;
  },
  getMinSize: function () {
    return this._minSize;
  },
  getRealPanelWidth: function () {
    if ((0, h.hasWindow)()) {
      if ((0, a.isDefined)(this.option("templateSize"))) {
        return this.option("templateSize");
      } else {
        return (0, u.getBoundingRect)(this._getPanelTemplateElement()).width;
      }
    } else {
      return 0;
    }
  },
  getRealPanelHeight: function () {
    if ((0, h.hasWindow)()) {
      if ((0, a.isDefined)(this.option("templateSize"))) {
        return this.option("templateSize");
      } else {
        return (0, u.getBoundingRect)(this._getPanelTemplateElement()).height;
      }
    } else {
      return 0;
    }
  },
  _getPanelTemplateElement: function () {
    var e = this._strategy.getPanelContent();
    var t = e;
    if (e.children().length) {
      t = e.children().eq(0);
      if (e.hasClass("dx-overlay-content") && t.hasClass("dx-template-wrapper") && t.children().length) {
        t = t.children().eq(0);
      }
    }
    return t.get(0);
  },
  getElementHeight: function (e) {
    var t = e.children();
    if (t.length) {
      return (0, u.getBoundingRect)(t.eq(0).get(0)).height;
    } else {
      return (0, u.getBoundingRect)(e.get(0)).height;
    }
  },
  isHorizontalDirection: function () {
    var e = this.calcTargetPosition();
    return e === "left" || e === "right";
  },
  stopAnimations: function (e) {
    v.default.stop(this._$shader, e);
    v.default.stop((0, i.default)(this.content()), e);
    v.default.stop((0, i.default)(this.viewContent()), e);
    var t = this.getOverlay();
    if (t) {
      v.default.stop((0, i.default)(t.$content()), e);
    }
  },
  setZIndex: function (e) {
    this._$shader.css("zIndex", e - 1);
    this._$panelContentWrapper.css("zIndex", e);
  },
  resizeContent: function () {
    this.resizeViewContent;
  },
  resizeViewContent: function () {
    (0, b.triggerResizeEvent)(this.viewContent());
  },
  _isInvertedPosition: function () {
    var e = this.calcTargetPosition();
    return e === "right" || e === "bottom";
  },
  _renderPosition: function (e, t, n) {
    this.stopAnimations(n);
    if ((0, h.hasWindow)()) {
      (0, i.default)(this.viewContent()).css("paddingLeft", 0);
      (0, i.default)(this.viewContent()).css("paddingRight", 0);
      (0, i.default)(this.viewContent()).css("paddingTop", 0);
      (0, i.default)(this.viewContent()).css("paddingBottom", 0);
      var o = this.option("animationEnabled");
      if (t === true) {
        o = false;
      }
      if (e) {
        this._toggleShaderVisibility(e);
      }
      this._strategy.renderPosition(o, this.option("animationDuration"));
    }
  },
  _animationCompleteHandler: function () {
    this.resizeViewContent();
    if (this._whenAnimationCompleted) {
      this._whenAnimationCompleted.resolve();
    }
  },
  _getPositionCorrection: function () {
    if (this._isInvertedPosition()) {
      return -1;
    } else {
      return 1;
    }
  },
  _dispose: function () {
    m.animation.complete((0, i.default)(this.viewContent()));
    this.callBase();
  },
  _visibilityChanged: function (e) {
    if (e) {
      this._dimensionChanged();
    }
  },
  _dimensionChanged: function () {
    this._initMinMaxSize();
    this._strategy.refreshPanelElementSize(this.option("revealMode") === "slide");
    this._renderPosition(this.option("opened"), true);
  },
  _toggleShaderVisibility: function (e) {
    if (this.option("shading")) {
      this._$shader.toggleClass("dx-state-invisible", !e);
      this._$shader.css("visibility", e ? "visible" : "hidden");
    } else {
      this._$shader.toggleClass("dx-state-invisible", true);
    }
  },
  _toggleOpenedStateClass: function (e) {
    this.$element().toggleClass("dx-drawer-opened", e);
  },
  _refreshPanel: function () {
    var e = this;
    (0, i.default)(this.viewContent()).css("left", 0);
    (0, i.default)(this.viewContent()).css("transform", "translate(0px, 0px)");
    (0, i.default)(this.viewContent()).removeClass("dx-theme-background-color");
    this._removePanelContentWrapper();
    this._removeOverlay();
    this._renderPanelContentWrapper();
    this._refreshWrapperChildrenOrder();
    this._whenPanelContentRefreshed = new y.Deferred();
    this._strategy.renderPanelContent(this._whenPanelContentRefreshed);
    this._strategy.onPanelContentRendered();
    if ((0, h.hasWindow)()) {
      this._whenPanelContentRefreshed.always(function () {
        e._strategy.refreshPanelElementSize(e.option("revealMode") === "slide");
        e._renderPosition(e.option("opened"), true, true);
        e._removePanelManualPosition();
      });
    }
  },
  _clean: function () {
    this._cleanFocusState();
    this._removePanelContentWrapper();
    this._removeOverlay();
  },
  _removePanelContentWrapper: function () {
    if (this._$panelContentWrapper) {
      this._$panelContentWrapper.remove();
    }
  },
  _removeOverlay: function () {
    if (this._overlay) {
      this._overlay.dispose();
      delete this._overlay;
      delete this._$panelContentWrapper;
    }
  },
  _optionChanged: function (e) {
    switch (e.name) {
      case "width":
        this.callBase(e);
        this._dimensionChanged();
        break;
      case "opened":
        this._renderPosition(this.option("opened"));
        this._toggleOpenedStateClass(e.value);
        break;
      case "position":
        this._refreshPositionClass(e.previousValue);
        this._refreshWrapperChildrenOrder();
        this._invalidate();
        break;
      case "contentTemplate":
      case "template":
        this._invalidate();
        break;
      case "openedStateMode":
        this._initStrategy();
        this._refreshOpenedStateModeClass(e.previousValue);
        this._refreshPanel();
        break;
      case "minSize":
      case "maxSize":
        this._initMinMaxSize();
        this._renderPosition(this.option("opened"), true);
        break;
      case "revealMode":
        this._refreshRevealModeClass(e.previousValue);
        this._refreshPanel();
        break;
      case "shading":
        this._toggleShaderVisibility(this.option("opened"));
        break;
      case "animationEnabled":
      case "animationDuration":
      case "closeOnOutsideClick":
        break;
      default:
        this.callBase(e);
    }
  },
  content: function () {
    return (0, r.getPublicElement)(this._$panelContentWrapper);
  },
  viewContent: function () {
    return (0, r.getPublicElement)(this._$viewContentWrapper);
  },
  show: function () {
    return this.toggle(true);
  },
  hide: function () {
    return this.toggle(false);
  },
  toggle: function (e) {
    var t = e === undefined ? !this.option("opened") : e;
    this._whenAnimationCompleted = new y.Deferred();
    this.option("opened", t);
    return this._whenAnimationCompleted.promise();
  }
});
(0, s.default)("dxDrawer", w);
var C = w;
exports.default = C;
module.exports = exports.default;
module.exports.default = exports.default;