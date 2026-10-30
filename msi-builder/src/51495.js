function i(e) {
  return (i = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function (e) {
    return typeof e;
  } : function (e) {
    if (e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype) {
      return "symbol";
    } else {
      return typeof e;
    }
  })(e);
}
exports.default = undefined;
var o = A(require("./99393.js"));
var a = A(require("./20530.js"));
var r = require("./6415.js");
var s = A(require("./68374.js"));
var l = require("./10688.js");
var u = A(require("./47810.js"));
var d = require("./20576.js");
var c = require("./13306.js");
var h = require("./78008.js");
var f = require("./95479.js");
var p = require("./58664.js");
var g = require("./37518.js");
var m = require("./35922.js");
var _ = require("./58020.js");
var v = require("./58201.js");
var y = require("./80506.js");
var b = A(require("./28109.js"));
var x = A(require("./1351.js"));
var w = A(require("./46743.js"));
var C = A(require("./63008.js"));
var S = A(require("./89799.js"));
var k = require("./75811.js");
require("./997.js");
var D = A(require("./91784.js"));
var I = function (e, t) {
  if (!t && e && e.__esModule) {
    return e;
  }
  if (e === null || i(e) !== "object" && typeof e != "function") {
    return {
      default: e
    };
  }
  var n = O(t);
  if (n && n.has(e)) {
    return n.get(e);
  }
  var o = {};
  var a = Object.defineProperty && Object.getOwnPropertyDescriptor;
  for (var r in e) {
    if (r !== "default" && Object.prototype.hasOwnProperty.call(e, r)) {
      var s = a ? Object.getOwnPropertyDescriptor(e, r) : null;
      if (s && (s.get || s.set)) {
        Object.defineProperty(o, r, s);
      } else {
        o[r] = e[r];
      }
    }
  }
  o.default = e;
  if (n) {
    n.set(e, o);
  }
  return o;
}(require("./85421.js"));
var T = require("./39665.js");
var E = require("./62300.js");
function O(e) {
  if (typeof WeakMap != "function") {
    return null;
  }
  var t = new WeakMap();
  var n = new WeakMap();
  return (O = function (e) {
    if (e) {
      return n;
    } else {
      return t;
    }
  })(e);
}
function A(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
var P = (0, v.getWindow)();
var M = ["cancel", "clear", "done"];
var R = u.default.safari && (0, _.compare)(u.default.version, [11]) < 0;
var B = {
  static: "",
  inherit: "dx-popup-inherit-height",
  flex: "dx-popup-flex-height"
};
var L = S.default.inherit({
  _supportedKeys: function () {
    var e = this;
    return (0, c.extend)(this.callBase(), {
      upArrow: function (t) {
        var n;
        if ((n = e._drag) !== null && n !== undefined) {
          n.moveUp(t);
        }
      },
      downArrow: function (t) {
        var n;
        if ((n = e._drag) !== null && n !== undefined) {
          n.moveDown(t);
        }
      },
      leftArrow: function (t) {
        var n;
        if ((n = e._drag) !== null && n !== undefined) {
          n.moveLeft(t);
        }
      },
      rightArrow: function (t) {
        var n;
        if ((n = e._drag) !== null && n !== undefined) {
          n.moveRight(t);
        }
      }
    });
  },
  _getDefaultOptions: function () {
    return (0, c.extend)(this.callBase(), {
      fullScreen: false,
      title: "",
      showTitle: true,
      titleTemplate: "title",
      onTitleRendered: null,
      dragOutsideBoundary: false,
      dragEnabled: false,
      dragAndResizeArea: undefined,
      enableBodyScroll: true,
      outsideDragFactor: 0,
      onResizeStart: null,
      onResize: null,
      onResizeEnd: null,
      resizeEnabled: false,
      toolbarItems: [],
      showCloseButton: false,
      bottomTemplate: "bottom",
      useDefaultToolbarButtons: false,
      useFlatToolbarButtons: false,
      autoResizeEnabled: true
    });
  },
  _defaultOptionsRules: function () {
    var e = (0, k.current)();
    return this.callBase().concat([{
      device: {
        platform: "ios"
      },
      options: {
        animation: this._iosAnimation
      }
    }, {
      device: {
        platform: "android"
      },
      options: {
        animation: this._androidAnimation
      }
    }, {
      device: {
        platform: "generic"
      },
      options: {
        showCloseButton: true
      }
    }, {
      device: function (e) {
        return a.default.real().deviceType === "desktop" && e.platform === "generic";
      },
      options: {
        dragEnabled: true
      }
    }, {
      device: function () {
        return a.default.real().deviceType === "desktop" && !a.default.isSimulator();
      },
      options: {
        focusStateEnabled: true
      }
    }, {
      device: function () {
        return (0, k.isMaterial)(e);
      },
      options: {
        useDefaultToolbarButtons: true,
        useFlatToolbarButtons: true,
        showCloseButton: false
      }
    }]);
  },
  _iosAnimation: {
    show: {
      type: "slide",
      duration: 400,
      from: {
        position: {
          my: "top",
          at: "bottom"
        }
      },
      to: {
        position: {
          my: "center",
          at: "center"
        }
      }
    },
    hide: {
      type: "slide",
      duration: 400,
      from: {
        opacity: 1,
        position: {
          my: "center",
          at: "center"
        }
      },
      to: {
        opacity: 1,
        position: {
          my: "top",
          at: "bottom"
        }
      }
    }
  },
  _androidAnimation: function () {
    if (this.option("fullScreen")) {
      return {
        show: {
          type: "slide",
          duration: 300,
          from: {
            top: "30%",
            opacity: 0
          },
          to: {
            top: 0,
            opacity: 1
          }
        },
        hide: {
          type: "slide",
          duration: 300,
          from: {
            top: 0,
            opacity: 1
          },
          to: {
            top: "30%",
            opacity: 0
          }
        }
      };
    } else {
      return {
        show: {
          type: "fade",
          duration: 400,
          from: 0,
          to: 1
        },
        hide: {
          type: "fade",
          duration: 400,
          from: 1,
          to: 0
        }
      };
    }
  },
  _init: function () {
    var e = this.option("_wrapperClassExternal");
    var t = e ? `dx-popup-wrapper ${e}` : "dx-popup-wrapper";
    this.callBase();
    this._createBodyOverflowManager();
    this._updateResizeCallbackSkipCondition();
    this.$element().addClass("dx-popup");
    this.$wrapper().addClass(t);
    this._$popupContent = this._$content.wrapInner((0, s.default)("<div>").addClass("dx-popup-content")).children().eq(0);
    this._toggleContentScrollClass();
    this.$overlayContent().attr("role", "dialog");
  },
  _render: function () {
    var e = this.option("fullScreen");
    this._toggleFullScreenClass(e);
    this.callBase();
  },
  _createBodyOverflowManager: function () {
    this._bodyOverflowManager = (0, E.createBodyOverflowManager)();
  },
  _toggleFullScreenClass: function (e) {
    this.$overlayContent().toggleClass("dx-popup-fullscreen", e).toggleClass("dx-popup-normal", !e);
  },
  _initTemplates: function () {
    this.callBase();
    this._templateManager.addDefaultTemplates({
      title: new l.EmptyTemplate(),
      bottom: new l.EmptyTemplate()
    });
  },
  _getActionsList: function () {
    return this.callBase().concat(["onResizeStart", "onResize", "onResizeEnd"]);
  },
  _contentResizeHandler: function (e) {
    if (!this._shouldSkipContentResize(e)) {
      this._renderGeometry({
        shouldOnlyReposition: true
      });
    }
  },
  _doesShowAnimationChangeDimensions: function () {
    var e = this.option("animation");
    return ["to", "from"].some(function (t) {
      var n;
      var i = e == null || (n = e.show) === null || n === undefined ? undefined : n[t];
      return (0, m.isObject)(i) && ("width" in i || "height" in i);
    });
  },
  _updateResizeCallbackSkipCondition: function () {
    var e = this;
    var t = this._doesShowAnimationChangeDimensions();
    this._shouldSkipContentResize = function (n) {
      return t && e._showAnimationProcessing || e._areContentDimensionsRendered(n);
    };
  },
  _observeContentResize: function (e) {
    var t = this;
    if (this.option("useResizeObserver")) {
      var n = this._$content.get(0);
      if (e) {
        D.default.observe(n, function (e) {
          t._contentResizeHandler(e);
        });
      } else {
        D.default.unobserve(n);
      }
    }
  },
  _areContentDimensionsRendered: function (e) {
    var r = e.contentBoxSize?.[0];
    if (r) {
      return parseInt(r.inlineSize, 10) === this._renderedDimensions?.width && parseInt(r.blockSize, 10) === this._renderedDimensions?.height;
    }
    var s = e.contentRect;
    return parseInt(s.width, 10) === this._renderedDimensions?.width && parseInt(s.height, 10) === this._renderedDimensions?.height;
  },
  _renderContent: function () {
    this.callBase();
    this._observeContentResize(true);
  },
  _renderContentImpl: function () {
    this._renderTitle();
    this.callBase();
    this._renderResize();
    this._renderBottom();
  },
  _renderTitle: function () {
    var e = this._getToolbarItems("top");
    var t = this.option("title");
    var n = this.option("showTitle");
    if (n && t) {
      e.unshift({
        location: a.default.current().ios ? "center" : "before",
        text: t
      });
    }
    if (n || e.length > 0) {
      if (this._$title) {
        this._$title.remove();
      }
      var i = (0, s.default)("<div>").addClass("dx-popup-title").insertBefore(this.$content());
      this._$title = this._renderTemplateByType("titleTemplate", e, i).addClass("dx-popup-title");
      this._renderDrag();
      this._executeTitleRenderAction(this._$title);
      this._$title.toggleClass("dx-has-close-button", this._hasCloseButton());
    } else if (this._$title) {
      this._$title.detach();
    }
  },
  _renderTemplateByType: function (e, t, n, i) {
    var o = this.option();
    var a = o.rtlEnabled;
    var u = o.useDefaultToolbarButtons;
    var d = o.useFlatToolbarButtons;
    var h = o.disabled;
    var f = this._getTemplateByOption(e);
    if (f instanceof l.EmptyTemplate) {
      var p = (0, c.extend)({}, this.option("integrationOptions"), {
        skipTemplates: ["content", "title"]
      });
      var g = (0, c.extend)(i, {
        items: t,
        rtlEnabled: a,
        useDefaultButtons: u,
        useFlatButtons: d,
        disabled: h,
        integrationOptions: p
      });
      this._getTemplate("dx-polymorph-widget").render({
        container: n,
        model: {
          widget: this._getToolbarName(),
          options: g
        }
      });
      var m = n.children("div");
      n.replaceWith(m);
      return m;
    }
    var _ = (0, s.default)(f.render({
      container: (0, r.getPublicElement)(n)
    }));
    if (_.hasClass("dx-template-wrapper")) {
      n.replaceWith(_);
      n = _;
    }
    return n;
  },
  _getToolbarName: function () {
    return "dxToolbarBase";
  },
  _renderVisibilityAnimate: function (e) {
    return this.callBase(e);
  },
  _hide: function () {
    this._observeContentResize(false);
    return this.callBase();
  },
  _executeTitleRenderAction: function (e) {
    this._getTitleRenderAction()({
      titleElement: (0, r.getPublicElement)(e)
    });
  },
  _getTitleRenderAction: function () {
    return this._titleRenderAction || this._createTitleRenderAction();
  },
  _createTitleRenderAction: function () {
    return this._titleRenderAction = this._createActionByOption("onTitleRendered", {
      element: this.element(),
      excludeValidators: ["disabled", "readOnly"]
    });
  },
  _getCloseButton: function () {
    return {
      toolbar: "top",
      location: "after",
      template: this._getCloseButtonRenderer()
    };
  },
  _getCloseButtonRenderer: function () {
    var e = this;
    return function (t, n, i) {
      var o = (0, s.default)("<div>").addClass("dx-closebutton");
      e._createComponent(o, C.default, {
        icon: "close",
        onClick: e._createToolbarItemAction(undefined),
        stylingMode: "text",
        integrationOptions: {}
      });
      (0, s.default)(i).append(o);
    };
  },
  _getToolbarItems: function (e) {
    var t = this;
    var n = this.option("toolbarItems");
    var i = [];
    this._toolbarItemClasses = [];
    var o = a.default.current().platform;
    var r = 0;
    (0, f.each)(n, function (n, s) {
      var l = (0, m.isDefined)(s.shortcut);
      var u = l ? function (e) {
        var t = a.default.current().platform;
        var n = "bottom";
        var i = "before";
        if (t === "ios") {
          switch (e) {
            case "cancel":
              n = "top";
              break;
            case "clear":
              n = "top";
              i = "after";
              break;
            case "done":
              i = "after";
          }
        } else if (t === "android") {
          switch (e) {
            case "cancel":
            case "done":
              i = "after";
          }
        }
        return {
          toolbar: n,
          location: i
        };
      }(s.shortcut) : s;
      if (l && o === "ios" && r < 2) {
        u.toolbar = "top";
        r++;
      }
      u.toolbar = s.toolbar || u.toolbar || "top";
      if (u && u.toolbar === e) {
        if (l) {
          (0, c.extend)(u, {
            location: s.location
          }, t._getToolbarItemByAlias(s));
        }
        var d = o === "generic";
        if (s.shortcut === "done" && d || s.shortcut === "cancel" && !d) {
          i.unshift(u);
        } else {
          i.push(u);
        }
      }
    });
    if (e === "top" && this._hasCloseButton()) {
      i.push(this._getCloseButton());
    }
    return i;
  },
  _hasCloseButton: function () {
    return this.option("showCloseButton") && this.option("showTitle");
  },
  _getLocalizationKey: function (e) {
    if (e.toLowerCase() === "done") {
      return "OK";
    } else {
      return (0, h.camelize)(e, true);
    }
  },
  _getToolbarItemByAlias: function (e) {
    var t = this;
    var n = e.shortcut;
    if (!M.includes(n)) {
      return false;
    }
    var i = (0, c.extend)({
      text: b.default.format(this._getLocalizationKey(n)),
      onClick: this._createToolbarItemAction(e.onClick),
      integrationOptions: {},
      type: t.option("useDefaultToolbarButtons") ? "default" : "normal",
      stylingMode: t.option("useFlatToolbarButtons") ? "text" : "contained"
    }, e.options || {});
    var o = "dx-popup-" + n;
    this._toolbarItemClasses.push(o);
    return {
      template: function (e, n, a) {
        var r = (0, s.default)("<div>").addClass(o).appendTo(a);
        t._createComponent(r, C.default, i);
      }
    };
  },
  _createToolbarItemAction: function (e) {
    return this._createAction(e, {
      afterExecute: function (e) {
        e.component.hide();
      }
    });
  },
  _renderBottom: function () {
    var e = this._getToolbarItems("bottom");
    if (e.length) {
      if (this._$bottom) {
        this._$bottom.remove();
      }
      var t = (0, s.default)("<div>").addClass("dx-popup-bottom").insertAfter(this.$content());
      this._$bottom = this._renderTemplateByType("bottomTemplate", e, t, {
        compactMode: true
      }).addClass("dx-popup-bottom");
      this._toggleClasses();
    } else if (this._$bottom) {
      this._$bottom.detach();
    }
  },
  _toggleDisabledState: function (e) {
    this.callBase.apply(this, arguments);
    this.$content().toggleClass("dx-state-disabled", Boolean(e));
  },
  _toggleClasses: function () {
    var e = this;
    var t = M;
    (0, f.each)(t, function (t, n) {
      var i = "dx-popup-" + n;
      if (e._toolbarItemClasses.includes(i)) {
        e.$wrapper().addClass(i + "-visible");
        e._$bottom.addClass(i);
      } else {
        e.$wrapper().removeClass(i + "-visible");
        e._$bottom.removeClass(i);
      }
    });
  },
  _toggleFocusClass: function (e, t) {
    this.callBase(e, t);
    if (e && !I.isLastZIndexInStack(this._zIndex)) {
      var n = I.create(this._zIndexInitValue());
      I.remove(this._zIndex);
      this._zIndex = n;
      this._$wrapper.css("zIndex", n);
      this._$content.css("zIndex", n);
    }
  },
  _toggleContentScrollClass: function () {
    var e = !this.option("preventScrollEvents");
    this.$content().toggleClass("dx-popup-content-scrollable", e);
  },
  _getPositionControllerConfig: function () {
    var e = this.option();
    var t = e.fullScreen;
    var n = e.forceApplyBindings;
    var i = e.dragOutsideBoundary;
    var o = e.dragAndResizeArea;
    var a = e.outsideDragFactor;
    return (0, c.extend)({}, this.callBase(), {
      fullScreen: t,
      forceApplyBindings: n,
      dragOutsideBoundary: i,
      dragAndResizeArea: o,
      outsideDragFactor: a
    });
  },
  _initPositionController: function () {
    this._positionController = new T.PopupPositionController(this._getPositionControllerConfig());
  },
  _getDragTarget: function () {
    return this.topToolbar();
  },
  _renderGeometry: function (e) {
    var t = this.option();
    var n = t.visible;
    var i = t.useResizeObserver;
    if (n && (0, v.hasWindow)()) {
      var o = this._showAnimationProcessing && (e == null || !e.forceStopAnimation) && i;
      this._isAnimationPaused = o || undefined;
      this._stopAnimation();
      if (e != null && e.shouldOnlyReposition) {
        this._renderPosition(false);
      } else {
        this._renderGeometryImpl(e == null ? undefined : e.isDimensionChange);
      }
      if (o) {
        this._animateShowing();
        this._isAnimationPaused = undefined;
      }
    }
  },
  _cacheDimensions: function () {
    if (this.option("useResizeObserver")) {
      this._renderedDimensions = {
        width: parseInt((0, p.getWidth)(this._$content), 10),
        height: parseInt((0, p.getHeight)(this._$content), 10)
      };
    }
  },
  _renderGeometryImpl: function (e = false) {
    if (!e) {
      this._resetContentHeight();
    }
    this.callBase();
    this._cacheDimensions();
    this._setContentHeight();
  },
  _resetContentHeight: function () {
    if (this._getOptionValue("height") === "auto") {
      this.$content().css({
        height: "auto",
        maxHeight: "none"
      });
    }
  },
  _renderDrag: function () {
    var e = this._getDragTarget();
    var t = this.option("dragEnabled");
    if (e) {
      var n = {
        dragEnabled: t,
        handle: e.get(0),
        draggableElement: this._$content.get(0),
        positionController: this._positionController
      };
      if (this._drag) {
        this._drag.init(n);
      } else {
        this._drag = new x.default(n);
      }
      this.$overlayContent().toggleClass("dx-popup-draggable", t);
    }
  },
  _renderResize: function () {
    var e = this;
    this._resizable = this._createComponent(this._$content, w.default, {
      handles: this.option("resizeEnabled") ? "all" : "none",
      onResizeEnd: function (t) {
        e._resizeEndHandler(t);
        e._observeContentResize(true);
      },
      onResize: function (t) {
        e._setContentHeight();
        e._actions.onResize(t);
      },
      onResizeStart: function (t) {
        e._observeContentResize(false);
        e._actions.onResizeStart(t);
      },
      minHeight: 100,
      minWidth: 100,
      area: this._positionController.$dragResizeContainer,
      keepAspectRatio: false
    });
  },
  _resizeEndHandler: function (e) {
    var t = this._resizable.option("width");
    var n = this._resizable.option("height");
    if (t) {
      this._setOptionWithoutOptionChange("width", t);
    }
    if (n) {
      this._setOptionWithoutOptionChange("height", n);
    }
    this._cacheDimensions();
    this._positionController.resizeHandled();
    this._positionController.detectVisualPositionChange(e.event);
    this._actions.onResizeEnd(e);
  },
  _setContentHeight: function () {
    (this.option("forceApplyBindings") || d.noop)();
    var e = this.$overlayContent().get(0);
    var t = this._chooseHeightStrategy(e);
    this.$content().css(this._getHeightCssStyles(t, e));
    this._setHeightClasses(this.$overlayContent(), t);
  },
  _heightStrategyChangeOffset: function (e, t) {
    if (e === B.flex) {
      return -t;
    } else {
      return 0;
    }
  },
  _chooseHeightStrategy: function (e) {
    var t = e.style.width === "auto" || e.style.width === "";
    var n = B.static;
    if (this._isAutoHeight() && this.option("autoResizeEnabled")) {
      n = t || R ? B.inherit : B.flex;
    }
    return n;
  },
  _getHeightCssStyles: function (e, t) {
    var n = {};
    var i = this._getOptionValue("maxHeight", t);
    var o = this._getOptionValue("minHeight", t);
    var a = this._splitPopupHeight();
    var r = a.header + a.footer + a.contentVerticalOffsets + a.popupVerticalOffsets + this._heightStrategyChangeOffset(e, a.popupVerticalPaddings);
    if (e === B.static) {
      if (!this._isAutoHeight() || i || o) {
        var l = (this.option("fullScreen") ? Math.min((0, g.getBoundingRect)(t).height, (0, v.getWindow)().innerHeight) : (0, g.getBoundingRect)(t).height) - r;
        n = {
          height: Math.max(0, l),
          minHeight: "auto",
          maxHeight: "auto"
        };
      }
    } else {
      var u = (0, s.default)(this._positionController.$visualContainer).get(0);
      var d = (0, p.addOffsetToMaxHeight)(i, -r, u);
      n = {
        height: "auto",
        minHeight: (0, p.addOffsetToMinHeight)(o, -r, u),
        maxHeight: d
      };
    }
    return n;
  },
  _setHeightClasses: function (e, t) {
    var n = "";
    for (var i in B) {
      if (B[i] !== t) {
        n += " " + B[i];
      }
    }
    e.removeClass(n).addClass(t);
  },
  _isAutoHeight: function () {
    return this.$overlayContent().get(0).style.height === "auto";
  },
  _splitPopupHeight: function () {
    var e = this.topToolbar();
    var t = this.bottomToolbar();
    return {
      header: (0, p.getVisibleHeight)(e && e.get(0)),
      footer: (0, p.getVisibleHeight)(t && t.get(0)),
      contentVerticalOffsets: (0, p.getVerticalOffsets)(this.$overlayContent().get(0), true),
      popupVerticalOffsets: (0, p.getVerticalOffsets)(this.$content().get(0), true),
      popupVerticalPaddings: (0, p.getVerticalOffsets)(this.$content().get(0), false)
    };
  },
  _isAllWindowCovered: function () {
    return this.callBase() || this.option("fullScreen");
  },
  _renderDimensions: function () {
    if (this.option("fullScreen")) {
      this.$overlayContent().css({
        width: "100%",
        height: "100%",
        minWidth: "",
        maxWidth: "",
        minHeight: "",
        maxHeight: ""
      });
    } else {
      this.callBase();
    }
    if ((0, v.hasWindow)()) {
      this._renderFullscreenWidthClass();
    }
  },
  _dimensionChanged: function () {
    this._renderGeometry({
      isDimensionChange: true
    });
  },
  _clean: function () {
    this.callBase();
    this._observeContentResize(false);
  },
  _dispose: function () {
    this.callBase();
    this._toggleBodyScroll(true);
  },
  _renderFullscreenWidthClass: function () {
    this.$overlayContent().toggleClass("dx-popup-fullscreen-width", (0, p.getOuterWidth)(this.$overlayContent()) === (0, p.getWidth)(P));
  },
  _toggleSafariScrolling: function () {
    if (this.option("enableBodyScroll")) {
      this.callBase();
    }
  },
  _toggleBodyScroll: function (e) {
    if (this._bodyOverflowManager) {
      var t = this._bodyOverflowManager;
      var n = t.setOverflow;
      var i = t.restoreOverflow;
      if (e) {
        i();
      } else {
        n();
      }
    }
  },
  refreshPosition: function () {
    this._renderPosition();
  },
  _optionChanged: function (e) {
    var t;
    var n = e.value;
    var i = e.name;
    switch (i) {
      case "disabled":
        this.callBase(e);
        this._renderTitle();
        this._renderBottom();
        break;
      case "animation":
        this._updateResizeCallbackSkipCondition();
        break;
      case "enableBodyScroll":
        this._toggleBodyScroll(n);
        break;
      case "showTitle":
      case "title":
      case "titleTemplate":
        this._renderTitle();
        this._renderGeometry();
        (0, y.triggerResizeEvent)(this.$overlayContent());
        break;
      case "bottomTemplate":
        this._renderBottom();
        this._renderGeometry();
        (0, y.triggerResizeEvent)(this.$overlayContent());
        break;
      case "container":
        var o;
        this.callBase(e);
        if (this.option("resizeEnabled")) {
          if ((o = this._resizable) !== null && o !== undefined) {
            o.option("area", this._positionController.$dragResizeContainer);
          }
        }
        break;
      case "width":
      case "height":
        this.callBase(e);
        if ((t = this._resizable) !== null && t !== undefined) {
          t.option(i, n);
        }
        break;
      case "onTitleRendered":
        this._createTitleRenderAction(n);
        break;
      case "toolbarItems":
      case "useDefaultToolbarButtons":
      case "useFlatToolbarButtons":
        var a = !e.fullName.match(/^toolbarItems((\[\d+\])(\.(options|visible).*)?)?$/);
        this._renderTitle();
        this._renderBottom();
        if (a) {
          this._renderGeometry();
          (0, y.triggerResizeEvent)(this.$overlayContent());
        }
        break;
      case "dragEnabled":
        this._renderDrag();
        break;
      case "dragAndResizeArea":
        this._positionController.dragAndResizeArea = n;
        if (this.option("resizeEnabled")) {
          this._resizable.option("area", this._positionController.$dragResizeContainer);
        }
        this._positionController.positionContent();
        break;
      case "dragOutsideBoundary":
        this._positionController.dragOutsideBoundary = n;
        if (this.option("resizeEnabled")) {
          this._resizable.option("area", this._positionController.$dragResizeContainer);
        }
        break;
      case "outsideDragFactor":
        this._positionController.outsideDragFactor = n;
        break;
      case "resizeEnabled":
        this._renderResize();
        this._renderGeometry();
        break;
      case "autoResizeEnabled":
        this._renderGeometry();
        (0, y.triggerResizeEvent)(this.$overlayContent());
        break;
      case "fullScreen":
        this._positionController.fullScreen = n;
        this._toggleFullScreenClass(n);
        this._toggleSafariScrolling();
        this._renderGeometry();
        (0, y.triggerResizeEvent)(this.$overlayContent());
        break;
      case "showCloseButton":
        this._renderTitle();
        break;
      case "preventScrollEvents":
        this.callBase(e);
        this._toggleContentScrollClass();
        break;
      default:
        this.callBase(e);
    }
  },
  bottomToolbar: function () {
    return this._$bottom;
  },
  topToolbar: function () {
    return this._$title;
  },
  $content: function () {
    return this._$popupContent;
  },
  content: function () {
    return (0, r.getPublicElement)(this.$content());
  },
  $overlayContent: function () {
    return this._$content;
  }
});
(0, o.default)("dxPopup", L);
var V = L;
exports.default = V;
module.exports = exports.default;
module.exports.default = exports.default;