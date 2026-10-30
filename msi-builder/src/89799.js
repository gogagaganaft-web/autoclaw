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
var o = require("./58664.js");
var a = L(require("./87209.js"));
var r = L(require("./99393.js"));
var s = L(require("./20530.js"));
var l = L(require("./73349.js"));
var u = require("./6415.js");
var d = L(require("./68374.js"));
var c = require("./10688.js");
var h = require("./20576.js");
var f = require("./62754.js");
var p = require("./3532.js");
var g = require("./13306.js");
var m = require("./95479.js");
var _ = L(require("./24311.js"));
var v = require("./35922.js");
var y = require("./77695.js");
var b = require("./58201.js");
var x = L(require("./17381.js"));
var w = L(require("./96688.js"));
var C = L(require("./55994.js"));
var S = require("./23174.js");
var k = L(require("./93786.js"));
var D = require("./72918.js");
var I = require("./39611.js");
var T = require("./80506.js");
var E = require("./4928.js");
var O = require("./31421.js");
var A = L(require("./14390.js"));
var P = L(require("./47810.js"));
var M = function (e, t) {
  if (!t && e && e.__esModule) {
    return e;
  }
  if (e === null || i(e) !== "object" && typeof e != "function") {
    return {
      default: e
    };
  }
  var n = B(t);
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
var R = require("./49314.js");
function B(e) {
  if (typeof WeakMap != "function") {
    return null;
  }
  var t = new WeakMap();
  var n = new WeakMap();
  return (B = function (e) {
    if (e) {
      return n;
    } else {
      return t;
    }
  })(e);
}
function L(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
var V = _.default.add;
var F = (0, b.getWindow)();
var H = y.changeCallback;
var N = [];
V(function () {
  C.default.subscribeGlobal(l.default.getDocument(), k.default.down, function (e) {
    for (var t = N.length - 1; t >= 0; t--) {
      if (!N[t]._proxiedDocumentDownHandler(e)) {
        return;
      }
    }
  });
});
var z = A.default.inherit({
  _supportedKeys: function () {
    return (0, g.extend)(this.callBase(), {
      escape: function () {
        this.hide();
      }
    });
  },
  _getDefaultOptions: function () {
    var e = this;
    return (0, g.extend)(this.callBase(), {
      activeStateEnabled: false,
      visible: false,
      deferRendering: true,
      shading: true,
      shadingColor: "",
      wrapperAttr: {},
      position: (0, g.extend)({}, R.OVERLAY_POSITION_ALIASES.center),
      width: "80vw",
      minWidth: null,
      maxWidth: null,
      height: "80vh",
      minHeight: null,
      maxHeight: null,
      animation: {
        show: {
          type: "pop",
          duration: 300,
          from: {
            scale: 0.55
          }
        },
        hide: {
          type: "pop",
          duration: 300,
          from: {
            opacity: 1,
            scale: 1
          },
          to: {
            opacity: 0,
            scale: 0.55
          }
        }
      },
      closeOnOutsideClick: false,
      hideOnOutsideClick: false,
      copyRootClassesToWrapper: false,
      _ignoreCopyRootClassesToWrapperDeprecation: false,
      _ignoreElementAttrDeprecation: false,
      _ignorePreventScrollEventsDeprecation: false,
      onShowing: null,
      onShown: null,
      onHiding: null,
      onHidden: null,
      contentTemplate: "content",
      innerOverlay: false,
      restorePosition: true,
      container: undefined,
      visualContainer: undefined,
      hideTopOverlayHandler: function () {
        e.hide();
      },
      hideOnParentScroll: false,
      preventScrollEvents: true,
      onPositioned: null,
      propagateOutsideClick: false,
      ignoreChildEvents: true,
      _checkParentVisibility: true,
      _fixWrapperPosition: false
    });
  },
  _defaultOptionsRules: function () {
    return this.callBase().concat([{
      device: function () {
        return !(0, b.hasWindow)();
      },
      options: {
        width: null,
        height: null,
        animation: null,
        _checkParentVisibility: false
      }
    }]);
  },
  _setOptionsByReference: function () {
    this.callBase();
    (0, g.extend)(this._optionsByReference, {
      animation: true
    });
  },
  $wrapper: function () {
    return this._$wrapper;
  },
  _eventBindingTarget: function () {
    return this._$content;
  },
  _setDeprecatedOptions: function () {
    this.callBase();
    (0, g.extend)(this._deprecatedOptions, {
      closeOnOutsideClick: {
        since: "22.1",
        alias: "hideOnOutsideClick"
      }
    });
  },
  ctor: function (e, t) {
    this.callBase(e, t);
    if (t) {
      if (t.copyRootClassesToWrapper && !t._ignoreCopyRootClassesToWrapperDeprecation) {
        this._logDeprecatedOptionWarning("copyRootClassesToWrapper", {
          since: "21.2",
          message: "Use the \"wrapperAttr\" option instead"
        });
      }
      if (t.elementAttr && !t._ignoreElementAttrDeprecation) {
        this._logDeprecatedOptionWarning("elementAttr", {
          since: "21.2",
          message: "Use the \"wrapperAttr\" option instead"
        });
      }
      if ("preventScrollEvents" in t && !t._ignorePreventScrollEventsDeprecation) {
        this._logDeprecatedPreventScrollEventsInfo();
      }
    }
  },
  _logDeprecatedPreventScrollEventsInfo: function () {
    this._logDeprecatedOptionWarning("preventScrollEvents", {
      since: "23.1",
      message: "If you enable this option, end-users may experience scrolling issues."
    });
  },
  _init: function () {
    var e = this;
    this.callBase();
    this._initActions();
    this._initHideOnOutsideClickHandler();
    this._initTabTerminatorHandler();
    this._customWrapperClass = null;
    this._$wrapper = (0, d.default)("<div>").addClass("dx-overlay-wrapper");
    this._$content = (0, d.default)("<div>").addClass("dx-overlay-content");
    this._initInnerOverlayClass();
    var t = this.$element();
    if (this.option("copyRootClassesToWrapper")) {
      this._$wrapper.addClass(t.attr("class"));
    }
    t.addClass("dx-overlay");
    this._$wrapper.attr("data-bind", "dxControlsDescendantBindings: true");
    this._toggleViewPortSubscription(true);
    this._initHideTopOverlayHandler(this.option("hideTopOverlayHandler"));
    this._parentsScrollSubscriptionInfo = {
      handler: function (t) {
        e._hideOnParentsScrollHandler(t);
      }
    };
    this.warnPositionAsFunction();
  },
  warnPositionAsFunction: function () {
    if ((0, v.isFunction)(this.option("position"))) {
      x.default.log("W0018");
    }
  },
  _initInnerOverlayClass: function () {
    this._$content.toggleClass("dx-inner-overlay", this.option("innerOverlay"));
  },
  _initHideTopOverlayHandler: function (e) {
    this._hideTopOverlayHandler = e;
  },
  _getActionsList: function () {
    return ["onShowing", "onShown", "onHiding", "onHidden", "onPositioned", "onVisualPositionChanged"];
  },
  _initActions: function () {
    var e = this;
    this._actions = {};
    var t = this._getActionsList();
    (0, m.each)(t, function (t, n) {
      e._actions[n] = e._createActionByOption(n, {
        excludeValidators: ["disabled", "readOnly"]
      }) || h.noop;
    });
  },
  _initHideOnOutsideClickHandler: function () {
    var e = this;
    this._proxiedDocumentDownHandler = function () {
      return e._documentDownHandler.apply(e, arguments);
    };
  },
  _initMarkup: function () {
    this.callBase();
    this._renderWrapperAttributes();
    this._initPositionController();
  },
  _documentDownHandler: function (e) {
    if (this._showAnimationProcessing) {
      this._stopAnimation();
    }
    var t = (0, d.default)(F.document).is(e.target) || (0, p.contains)(F.document, e.target);
    var n = (0, d.default)(e.target).closest(`.dx-inner-overlay`).length;
    if (t && !n && !this._$content.is(e.target) && !(0, p.contains)(this._$content.get(0), e.target) && this._shouldHideOnOutsideClick(e)) {
      this._outsideClickHandler(e);
    }
    return this.option("propagateOutsideClick");
  },
  _shouldHideOnOutsideClick: function (e) {
    var t = this.option().hideOnOutsideClick;
    if ((0, v.isFunction)(t)) {
      return t(e);
    } else {
      return t;
    }
  },
  _outsideClickHandler: function (e) {
    if (this.option("shading")) {
      e.preventDefault();
    }
    this.hide();
  },
  _getAnonymousTemplateName: function () {
    return "content";
  },
  _initTemplates: function () {
    this._templateManager.addDefaultTemplates({
      content: new c.EmptyTemplate()
    });
    this.callBase();
  },
  _isTopOverlay: function () {
    var e = this._overlayStack();
    for (var t = e.length - 1; t >= 0; t--) {
      var n = e[t]._findTabbableBounds();
      if (n.first || n.last) {
        return e[t] === this;
      }
    }
    return false;
  },
  _overlayStack: function () {
    return N;
  },
  _zIndexInitValue: function () {
    return z.baseZIndex();
  },
  _toggleViewPortSubscription: function (e) {
    var t = this;
    H.remove(this._viewPortChangeHandle);
    if (e) {
      this._viewPortChangeHandle = function () {
        t._viewPortChangeHandler.apply(t, arguments);
      };
      H.add(this._viewPortChangeHandle);
    }
  },
  _viewPortChangeHandler: function () {
    this._positionController.updateContainer(this.option("container"));
    this._refresh();
  },
  _renderWrapperAttributes: function () {
    var e = this.option().wrapperAttr;
    var t = (0, g.extend)({}, e);
    var n = t.class;
    delete t.class;
    this.$wrapper().attr(t).removeClass(this._customWrapperClass).addClass(n);
    this._customWrapperClass = n;
  },
  _renderVisibilityAnimate: function (e) {
    this._stopAnimation();
    if (e) {
      return this._show();
    } else {
      return this._hide();
    }
  },
  _getAnimationConfig: function () {
    return this._getOptionValue("animation", this);
  },
  _toggleBodyScroll: h.noop,
  _animateShowing: function () {
    var i = this;
    var o = this._getAnimationConfig() ?? {};
    var a = this._normalizeAnimation(o.show, "to");
    var r = (a == null ? undefined : a.start) ?? h.noop;
    var s = (a == null ? undefined : a.complete) ?? h.noop;
    this._animate(a, function () {
      if (!i._isAnimationPaused) {
        if (i.option("focusStateEnabled")) {
          C.default.trigger(i._focusTarget(), "focus");
        }
        for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) {
          t[n] = arguments[n];
        }
        s.call.apply(s, [i].concat(t));
        i._showAnimationProcessing = false;
        i._isHidden = false;
        i._actions.onShown();
        i._toggleSafariScrolling();
        i._showingDeferred.resolve();
      }
    }, function () {
      if (!i._isAnimationPaused) {
        for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) {
          t[n] = arguments[n];
        }
        r.call.apply(r, [i].concat(t));
        i._showAnimationProcessing = true;
      }
    });
  },
  _processShowingHidingCancel: function (e, t, n) {
    if ((0, v.isPromise)(e)) {
      e.then(function (e) {
        if (e) {
          n();
        } else {
          t();
        }
      }).catch(function () {
        return t();
      });
    } else if (e) {
      n();
    } else {
      t();
    }
  },
  _show: function () {
    var e = this;
    this._showingDeferred = new f.Deferred();
    this._parentHidden = this._isParentHidden();
    this._showingDeferred.done(function () {
      delete e._parentHidden;
    });
    if (this._parentHidden) {
      this._isHidden = true;
      return this._showingDeferred.resolve();
    }
    if (this._currentVisible) {
      return new f.Deferred().resolve().promise();
    }
    this._currentVisible = true;
    if (this._isHidingActionCanceled) {
      delete this._isHidingActionCanceled;
      this._showingDeferred.reject();
    } else {
      function t() {
        e._toggleBodyScroll(e.option("enableBodyScroll"));
        e._stopAnimation();
        e._toggleVisibility(true);
        e._$content.css("visibility", "hidden");
        e._$content.toggleClass("dx-state-invisible", false);
        e._updateZIndexStackPosition(true);
        e._positionController.openingHandled();
        e._renderContent();
        var t = {
          cancel: false
        };
        e._actions.onShowing(t);
        e._processShowingHidingCancel(t.cancel, function () {
          e._$content.css("visibility", "");
          e._renderVisibility(true);
          e._animateShowing();
        }, function () {
          e._toggleVisibility(false);
          e._$content.css("visibility", "");
          e._$content.toggleClass("dx-state-invisible", true);
          e._isShowingActionCanceled = true;
          e._moveFromContainer();
          e.option("visible", false);
          e._showingDeferred.resolve();
        });
      }
      if (this.option("templatesRenderAsynchronously")) {
        this._stopShowTimer();
        this._asyncShowTimeout = setTimeout(t);
      } else {
        t();
      }
    }
    return this._showingDeferred.promise();
  },
  _normalizeAnimation: function (e, t) {
    if (e) {
      e = (0, g.extend)({
        type: "slide",
        skipElementInitialStyles: true
      }, e);
      if ((0, v.isObject)(e[t])) {
        (0, g.extend)(e[t], {
          position: this._positionController.position
        });
      }
    }
    return e;
  },
  _animateHiding: function () {
    var i = this;
    var o = this._getAnimationConfig() ?? {};
    var a = this._normalizeAnimation(o.hide, "from");
    var r = (a == null ? undefined : a.start) ?? h.noop;
    var s = (a == null ? undefined : a.complete) ?? h.noop;
    this._animate(a, function () {
      var e;
      i._$content.css("pointerEvents", "");
      i._renderVisibility(false);
      for (var t = arguments.length, n = new Array(t), o = 0; o < t; o++) {
        n[o] = arguments[o];
      }
      s.call.apply(s, [i].concat(n));
      i._hideAnimationProcessing = false;
      if ((e = i._actions) !== null && e !== undefined) {
        e.onHidden();
      }
      i._hidingDeferred.resolve();
    }, function () {
      i._$content.css("pointerEvents", "none");
      for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) {
        t[n] = arguments[n];
      }
      r.call.apply(r, [i].concat(t));
      i._hideAnimationProcessing = true;
    });
  },
  _hide: function () {
    var e = this;
    if (!this._currentVisible) {
      return new f.Deferred().resolve().promise();
    }
    this._currentVisible = false;
    this._hidingDeferred = new f.Deferred();
    var t = {
      cancel: false
    };
    if (this._isShowingActionCanceled) {
      delete this._isShowingActionCanceled;
      this._hidingDeferred.reject();
    } else {
      this._actions.onHiding(t);
      this._toggleSafariScrolling();
      this._toggleBodyScroll(true);
      this._processShowingHidingCancel(t.cancel, function () {
        e._forceFocusLost();
        e._toggleShading(false);
        e._toggleSubscriptions(false);
        e._stopShowTimer();
        e._animateHiding();
      }, function () {
        e._isHidingActionCanceled = true;
        e.option("visible", true);
        e._hidingDeferred.resolve();
      });
    }
    return this._hidingDeferred.promise();
  },
  _forceFocusLost: function () {
    var e = l.default.getActiveElement();
    if (this._$content.find(e).length) {
      (0, p.resetActiveElement)();
    }
  },
  _animate: function (e, t, n) {
    if (e) {
      n = n || e.start || h.noop;
      a.default.animate(this._$content, (0, g.extend)({}, e, {
        start: n,
        complete: t
      }));
    } else {
      t();
    }
  },
  _stopAnimation: function () {
    a.default.stop(this._$content, true);
  },
  _renderVisibility: function (e) {
    if (!e || !this._isParentHidden()) {
      this._currentVisible = e;
      this._stopAnimation();
      if (!e) {
        (0, T.triggerHidingEvent)(this._$content);
      }
      if (e) {
        this._checkContainerExists();
        this._moveToContainer();
        this._renderGeometry();
        (0, T.triggerShownEvent)(this._$content);
        (0, T.triggerResizeEvent)(this._$content);
      } else {
        this._toggleVisibility(e);
        this._$content.toggleClass("dx-state-invisible", !e);
        this._updateZIndexStackPosition(e);
        this._moveFromContainer();
      }
      this._toggleShading(e);
      this._toggleSubscriptions(e);
    }
  },
  _updateZIndexStackPosition: function (e) {
    var t = this._overlayStack();
    var n = t.indexOf(this);
    if (e) {
      if (n === -1) {
        this._zIndex = M.create(this._zIndexInitValue());
        t.push(this);
      }
      this._$wrapper.css("zIndex", this._zIndex);
      this._$content.css("zIndex", this._zIndex);
    } else if (n !== -1) {
      t.splice(n, 1);
      M.remove(this._zIndex);
    }
  },
  _toggleShading: function (e) {
    this._$wrapper.toggleClass("dx-overlay-shader", e && this.option("shading"));
    this._$wrapper.css("backgroundColor", this.option("shading") ? this.option("shadingColor") : "");
    this._toggleTabTerminator(e && this.option("shading"));
  },
  _initTabTerminatorHandler: function () {
    var e = this;
    this._proxiedTabTerminatorHandler = function () {
      e._tabKeyHandler.apply(e, arguments);
    };
  },
  _toggleTabTerminator: function (e) {
    var t = (0, I.addNamespace)("keydown", this.NAME);
    if (e) {
      C.default.on(l.default.getDocument(), t, this._proxiedTabTerminatorHandler);
    } else {
      C.default.off(l.default.getDocument(), t, this._proxiedTabTerminatorHandler);
    }
  },
  _findTabbableBounds: function () {
    for (var e = this._$wrapper.find("*"), t = e.length - 1, n = {
        first: null,
        last: null
      }, i = 0; i <= t && (!n.first && e.eq(i).is(O.tabbable) && (n.first = e.eq(i)), !n.last && e.eq(t - i).is(O.tabbable) && (n.last = e.eq(t - i)), !n.first || !n.last); i++);
    return n;
  },
  _tabKeyHandler: function (e) {
    if ((0, I.normalizeKeyName)(e) === "tab" && this._isTopOverlay()) {
      var t = this._findTabbableBounds();
      var n = t.first;
      var i = t.last;
      var o = !e.shiftKey && e.target === i.get(0);
      var a = e.shiftKey && e.target === n.get(0);
      var r = t.length === 0;
      var s = !(0, p.contains)(this._$wrapper.get(0), e.target);
      if (o || a || r || s) {
        e.preventDefault();
        var l = e.shiftKey ? i : n;
        C.default.trigger(l, "focusin");
        C.default.trigger(l, "focus");
      }
    }
  },
  _toggleSubscriptions: function (e) {
    if ((0, b.hasWindow)()) {
      this._toggleHideTopOverlayCallback(e);
      this._toggleHideOnParentsScrollSubscription(e);
    }
  },
  _toggleHideTopOverlayCallback: function (e) {
    if (this._hideTopOverlayHandler) {
      if (e) {
        E.hideCallback.add(this._hideTopOverlayHandler);
      } else {
        E.hideCallback.remove(this._hideTopOverlayHandler);
      }
    }
  },
  _toggleHideOnParentsScrollSubscription: function (e) {
    var n = (0, I.addNamespace)("scroll", this.NAME);
    var i = this._parentsScrollSubscriptionInfo ?? {};
    var o = i.prevTargets;
    var a = i.handler;
    C.default.off(o, n, a);
    var r = this.option("hideOnParentScroll");
    if (e && r) {
      var l = this._hideOnParentScrollTarget().parents();
      if (s.default.real().deviceType === "desktop") {
        l = l.add(F);
      }
      C.default.on(l, n, a);
      this._parentsScrollSubscriptionInfo.prevTargets = l;
    }
  },
  _hideOnParentsScrollHandler: function (e) {
    var t = false;
    var n = this.option("hideOnParentScroll");
    if ((0, v.isFunction)(n)) {
      t = n(e);
    }
    if (!t && !this._showAnimationProcessing) {
      this.hide();
    }
  },
  _hideOnParentScrollTarget: function () {
    return this._$wrapper;
  },
  _render: function () {
    this.callBase();
    this._appendContentToElement();
    this._renderVisibilityAnimate(this.option("visible"));
  },
  _appendContentToElement: function () {
    if (!this._$content.parent().is(this.$element())) {
      this._$content.appendTo(this.$element());
    }
  },
  _renderContent: function () {
    var e = !this._currentVisible && this.option("deferRendering");
    if (this.option("visible") && this._isParentHidden()) {
      this._isHidden = true;
    } else if (!this._contentAlreadyRendered && !e) {
      this._contentAlreadyRendered = true;
      this._appendContentToElement();
      this.callBase();
    }
  },
  _isParentHidden: function () {
    if (!this.option("_checkParentVisibility")) {
      return false;
    }
    if (this._parentHidden !== undefined) {
      return this._parentHidden;
    }
    var e = this.$element().parent();
    if (e.is(":visible")) {
      return false;
    }
    var t = false;
    e.add(e.parents()).each(function () {
      if ((0, d.default)(this).css("display") === "none") {
        t = true;
        return false;
      }
    });
    return t || !l.default.getBody().contains(e.get(0));
  },
  _renderContentImpl: function () {
    var e = this;
    var t = new f.Deferred();
    var n = this.option("contentTemplate");
    var i = this._getTemplate(n);
    var o = this._templateManager.anonymousTemplateName === n;
    if (i) {
      i.render({
        container: (0, u.getPublicElement)(this.$content()),
        noModel: true,
        transclude: o,
        onRendered: function () {
          t.resolve();
          if (e.option("templatesRenderAsynchronously")) {
            e._dimensionChanged();
          }
        }
      });
    }
    this._toggleWrapperScrollEventsSubscription(this.option("preventScrollEvents"));
    t.done(function () {
      if (e.option("visible")) {
        e._moveToContainer();
      }
    });
    return t.promise();
  },
  _getPositionControllerConfig: function () {
    var e = this.option();
    var t = e.container;
    var n = e.visualContainer;
    var i = e._fixWrapperPosition;
    var o = e.restorePosition;
    return {
      container: t,
      visualContainer: n,
      $root: this.$element(),
      $content: this._$content,
      $wrapper: this._$wrapper,
      onPositioned: this._actions.onPositioned,
      onVisualPositionChanged: this._actions.onVisualPositionChanged,
      restorePosition: o,
      _fixWrapperPosition: i
    };
  },
  _initPositionController: function () {
    this._positionController = new R.OverlayPositionController(this._getPositionControllerConfig());
  },
  _toggleWrapperScrollEventsSubscription: function (e) {
    var t = (0, I.addNamespace)(S.move, this.NAME);
    C.default.off(this._$wrapper, t);
    if (e) {
      C.default.on(this._$wrapper, t, {
        validate: function () {
          return true;
        },
        getDirection: function () {
          return "both";
        },
        _toggleGestureCover: function (e) {
          if (!e) {
            this._toggleGestureCoverImpl(e);
          }
        },
        _clearSelection: h.noop,
        isNative: true
      }, function (e) {
        var t = e.originalEvent.originalEvent;
        var n = (t || {}).type;
        var i = n === "wheel";
        var o = n === "mousemove";
        var a = i && !(0, I.isCommandKeyPressed)(e);
        e._cancelPreventDefault = true;
        if (t && e.cancelable !== false && (!o && !i || a)) {
          e.preventDefault();
        }
      });
    }
  },
  _moveFromContainer: function () {
    this._$content.appendTo(this.$element());
    this._$wrapper.detach();
  },
  _checkContainerExists: function () {
    var e = this._positionController.$container;
    if (e !== undefined) {
      if (!(e.length > 0)) {
        w.default.log("W1021", this.NAME);
      }
    }
  },
  _moveToContainer: function () {
    var e = this._positionController.$container;
    this._$wrapper.appendTo(e);
    this._$content.appendTo(this._$wrapper);
  },
  _renderGeometry: function (e) {
    if (this.option().visible && (0, b.hasWindow)()) {
      this._stopAnimation();
      this._renderGeometryImpl();
    }
  },
  _renderGeometryImpl: function () {
    this._positionController.updatePosition(this._getOptionValue("position"));
    this._renderWrapper();
    this._renderDimensions();
    this._renderPosition();
  },
  _renderPosition: function () {
    this._positionController.positionContent();
  },
  _isAllWindowCovered: function () {
    return (0, v.isWindow)(this._positionController.$visualContainer.get(0)) && this.option("shading");
  },
  _toggleSafariScrolling: function () {
    var e = this.option("visible");
    var t = (0, d.default)(l.default.getBody());
    var n = s.default.real().platform === "ios" && P.default.safari;
    var i = this._isAllWindowCovered();
    var o = t.hasClass("dx-prevent-safari-scrolling");
    var a = !o && e && i;
    var r = o && (!e || !i || this._disposed);
    if (n) {
      if (r) {
        t.removeClass("dx-prevent-safari-scrolling");
        F.scrollTo(0, this._cachedBodyScrollTop);
        this._cachedBodyScrollTop = undefined;
      } else if (a) {
        this._cachedBodyScrollTop = F.pageYOffset;
        t.addClass("dx-prevent-safari-scrolling");
      }
    }
  },
  _renderWrapper: function () {
    this._positionController.styleWrapperPosition();
    this._renderWrapperDimensions();
    this._positionController.positionWrapper();
  },
  _renderWrapperDimensions: function () {
    var e = this._positionController.$visualContainer;
    var t = l.default.getDocumentElement();
    var n = (0, v.isWindow)(e.get(0));
    var i = n ? t.clientWidth : (0, o.getOuterWidth)(e);
    var a = n ? F.innerHeight : (0, o.getOuterHeight)(e);
    this._$wrapper.css({
      width: i,
      height: a
    });
  },
  _renderDimensions: function () {
    var e = this._$content.get(0);
    this._$content.css({
      minWidth: this._getOptionValue("minWidth", e),
      maxWidth: this._getOptionValue("maxWidth", e),
      minHeight: this._getOptionValue("minHeight", e),
      maxHeight: this._getOptionValue("maxHeight", e),
      width: this._getOptionValue("width", e),
      height: this._getOptionValue("height", e)
    });
  },
  _focusTarget: function () {
    return this._$content;
  },
  _attachKeyboardEvents: function () {
    var e = this;
    this._keyboardListenerId = D.keyboard.on(this._$content, null, function (t) {
      return e._keyboardHandler(t);
    });
  },
  _keyboardHandler: function (e) {
    var t = e.originalEvent;
    var n = (0, d.default)(t.target);
    if (!!n.is(this._$content) || !this.option("ignoreChildEvents")) {
      this.callBase.apply(this, arguments);
    }
  },
  _isVisible: function () {
    return this.option("visible");
  },
  _visibilityChanged: function (e) {
    if (e) {
      if (this.option("visible")) {
        this._renderVisibilityAnimate(e);
      }
    } else {
      this._renderVisibilityAnimate(e);
    }
  },
  _dimensionChanged: function () {
    this._renderGeometry();
  },
  _clean: function () {
    var e = this.option();
    if (!this._contentAlreadyRendered && !e.isRenovated) {
      this.$content().empty();
    }
    this._renderVisibility(false);
    this._stopShowTimer();
    this._cleanFocusState();
  },
  _stopShowTimer: function () {
    if (this._asyncShowTimeout) {
      clearTimeout(this._asyncShowTimeout);
    }
    this._asyncShowTimeout = null;
  },
  _dispose: function () {
    a.default.stop(this._$content, false);
    clearTimeout(this._deferShowTimer);
    this._toggleViewPortSubscription(false);
    this._toggleSubscriptions(false);
    this._updateZIndexStackPosition(false);
    this._toggleTabTerminator(false);
    this._actions = null;
    this._parentsScrollSubscriptionInfo = null;
    this.callBase();
    this._toggleSafariScrolling();
    if (this.option("visible")) {
      M.remove(this._zIndex);
    }
    this._$wrapper.remove();
    this._$content.remove();
  },
  _toggleRTLDirection: function (e) {
    this._$content.toggleClass("dx-rtl", e);
  },
  _optionChanged: function (e) {
    var t = this;
    var n = e.value;
    var i = e.name;
    if (this._getActionsList().includes(i)) {
      this._initActions();
    } else {
      switch (i) {
        case "animation":
          break;
        case "shading":
          this._toggleShading(this.option("visible"));
          this._toggleSafariScrolling();
          break;
        case "shadingColor":
          this._toggleShading(this.option("visible"));
          break;
        case "width":
        case "height":
          this._renderGeometry();
          break;
        case "minWidth":
        case "maxWidth":
        case "minHeight":
        case "maxHeight":
          this._renderGeometry();
          break;
        case "position":
          this._positionController.updatePosition(this.option("position"));
          this._positionController.restorePositionOnNextRender(true);
          this._renderGeometry();
          this._toggleSafariScrolling();
          break;
        case "visible":
          this._renderVisibilityAnimate(n).done(function () {
            var e;
            if ((e = t._animateDeferred) === null || e === undefined) {
              return undefined;
            } else {
              return e.resolveWith(t);
            }
          }).fail(function () {
            var e;
            if ((e = t._animateDeferred) === null || e === undefined) {
              return undefined;
            } else {
              return e.reject();
            }
          });
          break;
        case "container":
          this._positionController.updateContainer(n);
          this._invalidate();
          this._toggleSafariScrolling();
          break;
        case "visualContainer":
          this._positionController.updateVisualContainer(n);
          this._renderWrapper();
          this._toggleSafariScrolling();
          break;
        case "innerOverlay":
          this._initInnerOverlayClass();
          break;
        case "deferRendering":
        case "contentTemplate":
          this._contentAlreadyRendered = false;
          this._clean();
          this._invalidate();
          break;
        case "hideTopOverlayHandler":
          this._toggleHideTopOverlayCallback(false);
          this._initHideTopOverlayHandler(n);
          this._toggleHideTopOverlayCallback(this.option("visible"));
          break;
        case "hideOnParentScroll":
          this._toggleHideOnParentsScrollSubscription(this.option("visible"));
          break;
        case "closeOnOutsideClick":
        case "hideOnOutsideClick":
        case "propagateOutsideClick":
          break;
        case "rtlEnabled":
          this._contentAlreadyRendered = false;
          this.callBase(e);
          break;
        case "_fixWrapperPosition":
          this._positionController.fixWrapperPosition = n;
          break;
        case "wrapperAttr":
          this._renderWrapperAttributes();
          break;
        case "restorePosition":
          this._positionController.restorePosition = n;
          break;
        case "preventScrollEvents":
          this._logDeprecatedPreventScrollEventsInfo();
          this._toggleWrapperScrollEventsSubscription(n);
          break;
        default:
          this.callBase(e);
      }
    }
  },
  toggle: function (e) {
    var t = this;
    e = e === undefined ? !this.option("visible") : e;
    var n = new f.Deferred();
    if (e === this.option("visible")) {
      return n.resolveWith(this, [e]).promise();
    }
    var i = new f.Deferred();
    this._animateDeferred = i;
    this.option("visible", e);
    i.promise().done(function () {
      delete t._animateDeferred;
      n.resolveWith(t, [t.option("visible")]);
    }).fail(function () {
      delete t._animateDeferred;
      n.reject();
    });
    return n.promise();
  },
  $content: function () {
    return this._$content;
  },
  show: function () {
    return this.toggle(true);
  },
  hide: function () {
    return this.toggle(false);
  },
  content: function () {
    return (0, u.getPublicElement)(this._$content);
  },
  repaint: function () {
    if (this._contentAlreadyRendered) {
      this._positionController.restorePositionOnNextRender(true);
      this._renderGeometry({
        forceStopAnimation: true
      });
      (0, T.triggerResizeEvent)(this._$content);
    } else {
      this.callBase();
    }
  }
});
z.baseZIndex = function (e) {
  return M.base(e);
};
(0, r.default)("dxOverlay", z);
var j = z;
exports.default = j;
module.exports = exports.default;
module.exports.default = exports.default;