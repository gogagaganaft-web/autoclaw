exports.default = undefined;
var i = C(require("./68374.js"));
var o = require("./20576.js");
var a = require("./58201.js");
var r = C(require("./73349.js"));
var s = require("./35922.js");
var l = require("./95479.js");
var u = require("./13306.js");
var d = require("./43637.js");
var c = C(require("./13046.js"));
var h = require("./3603.js");
var f = require("./19157.js");
var p = C(require("./80726.js"));
var g = require("./56453.js");
var m = require("./58664.js");
var _ = C(require("./94551.js"));
var v = C(require("./20530.js"));
var y = C(require("./55994.js"));
var b = require("./62754.js");
var x = require("./29932.js");
var w = require("./98469.js");
function C(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
function S() {
  return (S = Object.assign ? Object.assign.bind() : function (e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var i in n) {
        if (Object.prototype.hasOwnProperty.call(n, i)) {
          e[i] = n[i];
        }
      }
    }
    return e;
  }).apply(this, arguments);
}
var k = Math.floor;
var D = p.default.log;
var I = c.default.prototype.option;
function T() {
  return true;
}
function E() {
  return false;
}
function O(e) {
  if (!e.component._eventsStrategy.hasEvent("incidentOccurred")) {
    D.apply(null, [e.target.id].concat(e.target.args || []));
  }
}
function A(e) {
  return e.reduce(function (e, t) {
    if (t > 0 && !e) {
      return t;
    } else {
      return e;
    }
  }, 0);
}
function P(e) {
  e.forEach(function (e) {
    return e();
  });
}
function M(e) {
  return S({}, e, {
    height: k(e.height),
    width: k(e.width)
  });
}
var R;
var B;
var L;
var V = !(0, a.hasWindow)() ? (R = {
  _initTemplates: function () {},
  ctor: function (e, t) {
    this.callBase(e, t);
    var n = r.default.createElement("div");
    var i = t && (0, s.isNumeric)(t.width) ? t.width + "px" : "100%";
    var o = t && (0, s.isNumeric)(t.height) ? t.height + "px" : this._getDefaultSize().height + "px";
    r.default.setStyle(n, "width", i);
    r.default.setStyle(n, "height", o);
    r.default.setClass(n, "dx-sized-element");
    r.default.insertElement(e, n);
  }
}, B = c.default.inherit(R), L = B.inherit, B.inherit = function (e) {
  for (var t in e) {
    if ((0, s.isFunction)(e[t]) && t.substr(0, 1) !== "_" && t !== "option" || t === "_dispose" || t === "_optionChanged") {
      e[t] = o.noop;
    }
  }
  return L.call(this, e);
}, B) : c.default.inherit({
  _eventsMap: {
    onIncidentOccurred: {
      name: "incidentOccurred",
      actionSettings: {
        excludeValidators: ["disabled"]
      }
    },
    onDrawn: {
      name: "drawn",
      actionSettings: {
        excludeValidators: ["disabled"]
      }
    }
  },
  _getDefaultOptions: function () {
    return (0, u.extend)(this.callBase(), {
      onIncidentOccurred: O
    });
  },
  _useLinks: true,
  _init: function () {
    var e = this;
    e._$element.children(".dx-sized-element").remove();
    e._graphicObjects = {};
    e.callBase.apply(e, arguments);
    e._changesLocker = 0;
    e._optionChangedLocker = 0;
    e._asyncFirstDrawing = true;
    e._changes = (0, h.changes)();
    e._suspendChanges();
    e._themeManager = e._createThemeManager();
    e._themeManager.setCallback(function () {
      e._requestChange(e._themeDependentChanges);
    });
    e._renderElementAttributes();
    e._initRenderer();
    var t = e._useLinks && e._renderer.root;
    if (t) {
      t.enableLinks().virtualLink("core").virtualLink("peripheral");
    }
    e._renderVisibilityChange();
    e._attachVisibilityChangeHandlers();
    e._toggleParentsScrollSubscription(this._isVisible());
    e._initEventTrigger();
    e._incidentOccurred = (0, w.createIncidentOccurred)(e.NAME, e._eventTrigger);
    e._layout = new _.default();
    if (t) {
      t.linkAfter("core");
    }
    e._initPlugins();
    e._initCore();
    if (t) {
      t.linkAfter();
    }
    e._change(e._initialChanges);
  },
  _createThemeManager: function () {
    return new d.BaseThemeManager(this._getThemeManagerOptions());
  },
  _getThemeManagerOptions: function () {
    return {
      themeSection: this._themeSection,
      fontFields: this._fontFields
    };
  },
  _initialChanges: ["LAYOUT", "RESIZE_HANDLER", "THEME", "DISABLED"],
  _initPlugins: function () {
    var e = this;
    (0, l.each)(e._plugins, function (t, n) {
      n.init.call(e);
    });
  },
  _disposePlugins: function () {
    var e = this;
    (0, l.each)(e._plugins.slice().reverse(), function (t, n) {
      n.dispose.call(e);
    });
  },
  _change: function (e) {
    this._changes.add(e);
  },
  _suspendChanges: function () {
    ++this._changesLocker;
  },
  _resumeChanges: function () {
    if (--this._changesLocker == 0 && this._changes.count() > 0 && !this._applyingChanges) {
      this._renderer.lock();
      this._applyingChanges = true;
      this._applyChanges();
      this._changes.reset();
      this._applyingChanges = false;
      this._changesApplied();
      this._renderer.unlock();
      if (this._optionsQueue) {
        this._applyQueuedOptions();
      }
      this.resolveItemsDeferred(this._legend ? [this._legend] : []);
      this._optionChangedLocker++;
      this._notify();
      this._optionChangedLocker--;
    }
  },
  resolveItemsDeferred: function (e) {
    this._resolveDeferred(this._getTemplatesItems(e));
  },
  _collectTemplatesFromItems: function (e) {
    return e.reduce(function (e, t) {
      return {
        items: e.items.concat(t.getTemplatesDef()),
        groups: e.groups.concat(t.getTemplatesGroups())
      };
    }, {
      items: [],
      groups: []
    });
  },
  _getTemplatesItems: function (e) {
    var t = this._collectTemplatesFromItems(e);
    var n = this._getExtraTemplatesItems();
    return {
      items: n.items.concat(t.items),
      groups: n.groups.concat(t.groups),
      launchRequest: [n.launchRequest],
      doneRequest: [n.doneRequest]
    };
  },
  _getExtraTemplatesItems: function () {
    return {
      items: [],
      groups: [],
      launchRequest: function () {},
      doneRequest: function () {}
    };
  },
  _resolveDeferred: function (e) {
    var t = e.items;
    var n = e.launchRequest;
    var i = e.doneRequest;
    var o = e.groups;
    var a = this;
    a._setGroupsVisibility(o, "hidden");
    if (a._changesApplying) {
      a._changesApplying = false;
      P(i);
      return;
    }
    var r = true;
    b.when.apply(a, t).done(function () {
      if (r) {
        a._setGroupsVisibility(o, "visible");
      } else {
        P(n);
        a._changesApplying = true;
        var e = ["LAYOUT", "FULL_RENDER"];
        if (a._asyncFirstDrawing) {
          e.push("FORCE_FIRST_DRAWING");
          a._asyncFirstDrawing = false;
        } else {
          e.push("FORCE_DRAWING");
        }
        a._requestChange(e);
        a._setGroupsVisibility(o, "visible");
      }
    });
    r = false;
  },
  _setGroupsVisibility: function (e, t) {
    e.forEach(function (e) {
      return e.attr({
        visibility: t
      });
    });
  },
  _applyQueuedOptions: function () {
    var e = this._optionsQueue;
    this._optionsQueue = null;
    this.beginUpdate();
    (0, l.each)(e, function (e, t) {
      t();
    });
    this.endUpdate();
  },
  _requestChange: function (e) {
    this._suspendChanges();
    this._change(e);
    this._resumeChanges();
  },
  _applyChanges: function () {
    var e;
    var t = this._changes;
    var n = this._totalChangesOrder;
    var i = n.length;
    for (e = 0; e < i; ++e) {
      if (t.has(n[e])) {
        this["_change_" + n[e]]();
      }
    }
  },
  _optionChangesOrder: ["EVENTS", "THEME", "RENDERER", "RESIZE_HANDLER"],
  _layoutChangesOrder: ["ELEMENT_ATTR", "CONTAINER_SIZE", "LAYOUT"],
  _customChangesOrder: ["DISABLED"],
  _change_EVENTS: function () {
    this._eventTrigger.applyChanges();
  },
  _change_THEME: function () {
    this._setThemeAndRtl();
  },
  _change_RENDERER: function () {
    this._setRendererOptions();
  },
  _change_RESIZE_HANDLER: function () {
    this._setupResizeHandler();
  },
  _change_ELEMENT_ATTR: function () {
    this._renderElementAttributes();
    this._change(["CONTAINER_SIZE"]);
  },
  _change_CONTAINER_SIZE: function () {
    this._updateSize();
  },
  _change_LAYOUT: function () {
    this._setContentSize();
  },
  _change_DISABLED: function () {
    var e = this._renderer;
    var t = e.root;
    if (this.option("disabled")) {
      this._initDisabledState = t.attr("pointer-events");
      t.attr({
        "pointer-events": "none",
        filter: e.getGrayScaleFilter().id
      });
    } else if (t.attr("pointer-events") === "none") {
      t.attr({
        "pointer-events": (0, s.isDefined)(this._initDisabledState) ? this._initDisabledState : null,
        filter: null
      });
    }
  },
  _themeDependentChanges: ["RENDERER"],
  _initRenderer: function () {
    var e = this._calculateRawCanvas();
    this._canvas = M(e);
    this._renderer = new g.Renderer({
      cssClass: this._rootClassPrefix + " " + this._rootClass,
      pathModified: this.option("pathModified"),
      container: this._$element[0]
    });
    this._renderer.resize(this._canvas.width, this._canvas.height);
  },
  _disposeRenderer: function () {
    this._renderer.dispose();
  },
  _disposeGraphicObjects: function () {
    for (var e in this._graphicObjects) {
      this._graphicObjects[e].dispose();
    }
    this._graphicObjects = null;
  },
  _getAnimationOptions: o.noop,
  render: function () {
    this._requestChange(["CONTAINER_SIZE"]);
    var e = this._isVisible();
    this._toggleParentsScrollSubscription(e);
    if (!e) {
      this._stopCurrentHandling();
    }
  },
  _toggleParentsScrollSubscription: function (e) {
    var t = (0, i.default)(this._renderer.root.element).parents();
    if (v.default.real().platform === "generic") {
      t = t.add((0, a.getWindow)());
    }
    this._proxiedTargetParentsScrollHandler = this._proxiedTargetParentsScrollHandler || function () {
      this._stopCurrentHandling();
    }.bind(this);
    y.default.off((0, i.default)().add(this._$prevRootParents), "scroll.viz_widgets", this._proxiedTargetParentsScrollHandler);
    if (e) {
      y.default.on(t, "scroll.viz_widgets", this._proxiedTargetParentsScrollHandler);
      this._$prevRootParents = t;
    }
  },
  _stopCurrentHandling: o.noop,
  _dispose: function () {
    var e = this;
    if (!this._disposed) {
      e.callBase.apply(e, arguments);
      e._toggleParentsScrollSubscription(false);
      e._removeResizeHandler();
      e._layout.dispose();
      e._eventTrigger.dispose();
      e._disposeCore();
      e._disposePlugins();
      e._disposeGraphicObjects();
      e._disposeRenderer();
      e._themeManager.dispose();
      e._themeManager = e._renderer = e._eventTrigger = null;
    }
  },
  _initEventTrigger: function () {
    var e = this;
    e._eventTrigger = (0, w.createEventTrigger)(e._eventsMap, function (t, n) {
      return e._createActionByOption(t, n);
    });
  },
  _calculateRawCanvas: function () {
    var e = this;
    var t = e.option("size") || {};
    var n = e.option("margin") || {};
    var i = e._getDefaultSize() || {};
    function o(t, n, i) {
      o = t[n];
      if ((0, s.isDefined)(o) && o > 0 || !(0, a.hasWindow)()) {
        return 0;
      }
      var o;
      var r = i(e._$element);
      if (r <= 1) {
        return 0;
      } else {
        return r;
      }
    }
    var r = o(t, "width", function (e) {
      return (0, m.getWidth)(e);
    });
    var l = o(t, "height", function (e) {
      return (0, m.getHeight)(e);
    });
    var u = {
      width: t.width <= 0 ? 0 : A([t.width, r, i.width]),
      height: t.height <= 0 ? 0 : A([t.height, l, i.height]),
      left: A([n.left, i.left]),
      top: A([n.top, i.top]),
      right: A([n.right, i.right]),
      bottom: A([n.bottom, i.bottom])
    };
    if (u.width - u.left - u.right <= 0 || u.height - u.top - u.bottom <= 0) {
      u = {
        width: 0,
        height: 0
      };
    }
    return u;
  },
  _updateSize: function () {
    var e;
    var t;
    var n = this._calculateRawCanvas();
    e = this._canvas;
    t = n;
    if (!(Math.abs(e.width - t.width) < 1) || !(Math.abs(e.height - t.height) < 1) || e.left !== t.left || e.top !== t.top || e.right !== t.right || e.bottom !== t.bottom || !!this.__forceRender) {
      this._canvas = M(n);
      this._recreateSizeDependentObjects(true);
      this._renderer.resize(this._canvas.width, this._canvas.height);
      this._change(["LAYOUT"]);
    }
  },
  _recreateSizeDependentObjects: o.noop,
  _getMinSize: function () {
    return [0, 0];
  },
  _getAlignmentRect: o.noop,
  _setContentSize: function () {
    var e = this._canvas;
    var t = this._layout;
    var n = e.width > 0 && e.height > 0 ? [e.left, e.top, e.width - e.right, e.height - e.bottom] : [0, 0, 0, 0];
    n = t.forward(n, this._getMinSize());
    var i = this._applySize(n) || n;
    t.backward(i, this._getAlignmentRect() || i);
  },
  _getOption: function (e, t) {
    var n = this._themeManager.theme(e);
    var i = this.option(e);
    if (t) {
      if (i !== undefined) {
        return i;
      } else {
        return n;
      }
    } else {
      return (0, u.extend)(true, {}, n, i);
    }
  },
  _setupResizeHandler: function () {
    var e = this;
    var t = (0, f.parseScalar)(e._getOption("redrawOnResize", true), true);
    if (e._disposeResizeHandler) {
      e._removeResizeHandler();
    }
    e._disposeResizeHandler = (0, w.createResizeHandler)(e._$element[0], t, function () {
      return e._requestChange(["CONTAINER_SIZE"]);
    });
  },
  _removeResizeHandler: function () {
    if (this._disposeResizeHandler) {
      this._disposeResizeHandler();
      this._disposeResizeHandler = null;
    }
  },
  _onBeginUpdate: o.noop,
  beginUpdate: function () {
    var e = this;
    if (e._initialized && e._isUpdateAllowed()) {
      e._onBeginUpdate();
      e._suspendChanges();
    }
    e.callBase.apply(e, arguments);
    return e;
  },
  endUpdate: function () {
    this.callBase();
    if (this._isUpdateAllowed()) {
      this._resumeChanges();
    }
    return this;
  },
  option: function (e) {
    var t = this;
    if (!t._initialized || !t._applyingChanges || !(arguments.length > 1) && !(0, s.isObject)(e)) {
      return I.apply(t, arguments);
    }
    t._optionsQueue = t._optionsQueue || [];
    t._optionsQueue.push(t._getActionForUpdating(arguments));
  },
  _getActionForUpdating: function (e) {
    var t = this;
    return function () {
      I.apply(t, e);
    };
  },
  _clean: o.noop,
  _render: o.noop,
  _optionChanged: function (e) {
    var t = this;
    if (!t._optionChangedLocker) {
      var n = t.getPartialChangeOptionsName(e);
      var i = [];
      if (n.length > 0) {
        n.forEach(function (e) {
          return i.push(t._partialOptionChangesMap[e]);
        });
      } else {
        i.push(t._optionChangesMap[e.name]);
      }
      i = i.filter(function (e) {
        return !!e;
      });
      if (t._eventTrigger.change(e.name)) {
        t._change(["EVENTS"]);
      } else if (i.length > 0) {
        t._change(i);
      } else {
        t.callBase.apply(t, arguments);
      }
    }
  },
  _notify: o.noop,
  _changesApplied: o.noop,
  _optionChangesMap: {
    size: "CONTAINER_SIZE",
    margin: "CONTAINER_SIZE",
    redrawOnResize: "RESIZE_HANDLER",
    theme: "THEME",
    rtlEnabled: "THEME",
    encodeHtml: "THEME",
    elementAttr: "ELEMENT_ATTR",
    disabled: "DISABLED"
  },
  _partialOptionChangesMap: {},
  _partialOptionChangesPath: {},
  getPartialChangeOptionsName: function (e) {
    var t = this;
    var n = e.fullName;
    var i = n.split(/[.]/);
    var o = e.name;
    var a = e.value;
    var r = this._partialOptionChangesPath[o];
    var l = [];
    if (r) {
      if (r === true) {
        l.push(o);
      } else {
        r.forEach(function (e) {
          if (n.indexOf(e) >= 0) {
            l.push(e);
          }
        });
        if (i.length === 1) {
          if ((0, s.type)(a) === "object") {
            t._addOptionsNameForPartialUpdate(a, r, l);
          } else if ((0, s.type)(a) === "array" && a.length > 0 && a.every(function (e) {
            return t._checkOptionsForPartialUpdate(e, r);
          })) {
            a.forEach(function (e) {
              return t._addOptionsNameForPartialUpdate(e, r, l);
            });
          }
        }
      }
    }
    return l.filter(function (e, t, n) {
      return n.indexOf(e) === t;
    });
  },
  _checkOptionsForPartialUpdate: function (e, t) {
    return !Object.keys(e).some(function (e) {
      return t.indexOf(e) === -1;
    });
  },
  _addOptionsNameForPartialUpdate: function (e, t, n) {
    var i = Object.keys(e);
    if (this._checkOptionsForPartialUpdate(e, t)) {
      i.forEach(function (e) {
        return t.indexOf(e) > -1 && n.push(e);
      });
    }
  },
  _visibilityChanged: function () {
    this.render();
  },
  _setThemeAndRtl: function () {
    this._themeManager.setTheme(this.option("theme"), this.option("rtlEnabled"));
  },
  _getRendererOptions: function () {
    return {
      rtl: this.option("rtlEnabled"),
      encodeHtml: this.option("encodeHtml"),
      animation: this._getAnimationOptions()
    };
  },
  _setRendererOptions: function () {
    this._renderer.setOptions(this._getRendererOptions());
  },
  svg: function () {
    return this._renderer.svg();
  },
  getSize: function () {
    var e = this._canvas || {};
    return {
      width: e.width,
      height: e.height
    };
  },
  isReady: E,
  _dataIsReady: T,
  _resetIsReady: function () {
    this.isReady = E;
  },
  _renderGraphicObjects: function () {
    var e = this._renderer;
    var t = (0, x.getGraphicObjects)();
    for (var n in t) {
      if (!this._graphicObjects[n]) {
        var i = t[n];
        var o = i.type;
        var a = i.colors;
        var r = i.rotationAngle;
        var s = i.template;
        var l = i.width;
        var u = i.height;
        switch (o) {
          case "linear":
            this._graphicObjects[n] = e.linearGradient(a, n, r);
            break;
          case "radial":
            this._graphicObjects[n] = e.radialGradient(a, n);
            break;
          case "pattern":
            this._graphicObjects[n] = e.customPattern(n, this._getTemplate(s), l, u);
        }
      }
    }
  },
  _drawn: function () {
    var e = this;
    e.isReady = E;
    if (e._dataIsReady()) {
      e._renderer.onEndAnimation(function () {
        e.isReady = T;
      });
    }
    e._eventTrigger("drawn", {});
  }
});
var F = V;
exports.default = F;
(0, h.replaceInherit)(V);
module.exports = exports.default;
module.exports.default = exports.default;