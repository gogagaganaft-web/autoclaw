exports.OverlayPositionController = exports.OVERLAY_POSITION_ALIASES = undefined;
var i = d(require("./68374.js"));
var o = require("./35922.js");
var a = require("./13306.js");
var r = d(require("./49387.js"));
var s = require("./31648.js");
var l = require("./58201.js");
var u = d(require("./92591.js"));
function d(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
function c(e) {
  return (c = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function (e) {
    return typeof e;
  } : function (e) {
    if (e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype) {
      return "symbol";
    } else {
      return typeof e;
    }
  })(e);
}
function h(e, t) {
  for (var n = 0; n < t.length; n++) {
    var i = t[n];
    i.enumerable = i.enumerable || false;
    i.configurable = true;
    if ("value" in i) {
      i.writable = true;
    }
    Object.defineProperty(e, (o = i.key, a = undefined, a = function (e, t) {
      if (c(e) !== "object" || e === null) {
        return e;
      }
      var n = e[Symbol.toPrimitive];
      if (n !== undefined) {
        var i = n.call(e, t || "default");
        if (c(i) !== "object") {
          return i;
        }
        throw new TypeError("@@toPrimitive must return a primitive value.");
      }
      return (t === "string" ? String : Number)(e);
    }(o, "string"), c(a) === "symbol" ? a : String(a)), i);
  }
  var o;
  var a;
}
var f = (0, l.getWindow)();
var p = {
  top: {
    my: "top center",
    at: "top center"
  },
  bottom: {
    my: "bottom center",
    at: "bottom center"
  },
  right: {
    my: "right center",
    at: "right center"
  },
  left: {
    my: "left center",
    at: "left center"
  },
  center: {
    my: "center",
    at: "center"
  },
  "right bottom": {
    my: "right bottom",
    at: "right bottom"
  },
  "right top": {
    my: "right top",
    at: "right top"
  },
  "left bottom": {
    my: "left bottom",
    at: "left bottom"
  },
  "left top": {
    my: "left top",
    at: "left top"
  }
};
exports.OVERLAY_POSITION_ALIASES = p;
var g = {
  h: 0,
  v: 0
};
var m = function () {
  function e(e) {
    var t = e.position;
    var n = e.container;
    var i = e.visualContainer;
    var o = e.$root;
    var a = e.$content;
    var r = e.$wrapper;
    var s = e.onPositioned;
    var l = e.onVisualPositionChanged;
    var u = e.restorePosition;
    var d = e._fixWrapperPosition;
    this._props = {
      position: t,
      container: n,
      visualContainer: i,
      restorePosition: u,
      onPositioned: s,
      onVisualPositionChanged: l,
      _fixWrapperPosition: d
    };
    this._$root = o;
    this._$content = a;
    this._$wrapper = r;
    this._$markupContainer = undefined;
    this._$visualContainer = undefined;
    this._shouldRenderContentInitialPosition = true;
    this._visualPosition = undefined;
    this._initialPosition = undefined;
    this._previousVisualPosition = undefined;
    this.updateContainer(n);
    this.updatePosition(t);
    this.updateVisualContainer(i);
  }
  var t;
  var n;
  var l;
  var d = e.prototype;
  d.restorePositionOnNextRender = function (e) {
    this._shouldRenderContentInitialPosition = e || !this._visualPosition;
  };
  d.openingHandled = function () {
    var e = this._props.restorePosition;
    this.restorePositionOnNextRender(e);
  };
  d.updatePosition = function (e) {
    this._props.position = e;
    this._position = this._normalizePosition(e);
    this.updateVisualContainer();
  };
  d.updateContainer = function (e = this._props.container) {
    this._props.container = e;
    this._$markupContainer = e ? (0, i.default)(e) : u.default.getSwatchContainer(this._$root);
    this.updateVisualContainer(this._props.visualContainer);
  };
  d.updateVisualContainer = function (e = this._props.visualContainer) {
    this._props.visualContainer = e;
    this._$visualContainer = this._getVisualContainer();
  };
  d.detectVisualPositionChange = function (e) {
    this._updateVisualPositionValue();
    this._raisePositionedEvents(e);
  };
  d.positionContent = function () {
    if (this._shouldRenderContentInitialPosition) {
      this._renderContentInitialPosition();
    } else {
      (0, s.move)(this._$content, this._visualPosition);
      this.detectVisualPositionChange();
    }
  };
  d.positionWrapper = function () {
    if (this._$visualContainer) {
      r.default.setup(this._$wrapper, {
        my: "top left",
        at: "top left",
        of: this._$visualContainer
      });
    }
  };
  d.styleWrapperPosition = function () {
    var e = (0, o.isWindow)(this.$visualContainer.get(0)) || this._props._fixWrapperPosition ? "fixed" : "absolute";
    this._$wrapper.css("position", e);
  };
  d._updateVisualPositionValue = function () {
    this._previousVisualPosition = this._visualPosition;
    this._visualPosition = (0, s.locate)(this._$content);
  };
  d._renderContentInitialPosition = function () {
    this._renderBoundaryOffset();
    (0, s.resetPosition)(this._$content);
    var e = this._$wrapper.css("overflow");
    this._$wrapper.css("overflow", "hidden");
    var t = r.default.setup(this._$content, this._position);
    this._$wrapper.css("overflow", e);
    this._initialPosition = t;
    this.detectVisualPositionChange();
  };
  d._raisePositionedEvents = function (e) {
    var t = this._previousVisualPosition;
    var n = this._visualPosition;
    if ((t == null ? undefined : t.top) !== n.top || (t == null ? undefined : t.left) !== n.left) {
      this._props.onVisualPositionChanged({
        previousPosition: t,
        position: n,
        event: e
      });
    }
    this._props.onPositioned({
      position: this._initialPosition
    });
  };
  d._renderBoundaryOffset = function () {
    var t = this._position ?? {
      boundaryOffset: g
    };
    this._$content.css("margin", `${t.v}px ${t.h}px`);
  };
  d._getVisualContainer = function () {
    var n = this._props.container;
    var a = this._props.visualContainer;
    var r = (0, o.isEvent)(this._props.position?.of) ? this._props.position.of.target : this._props.position?.of;
    if (a) {
      return (0, i.default)(a);
    } else if (n) {
      return (0, i.default)(n);
    } else if (r) {
      return (0, i.default)(r);
    } else {
      return (0, i.default)(f);
    }
  };
  d._normalizePosition = function (e) {
    var t = {
      boundaryOffset: g
    };
    if ((0, o.isDefined)(e)) {
      return (0, a.extend)(true, {}, t, this._positionToObject(e));
    } else {
      return t;
    }
  };
  d._positionToObject = function (e) {
    if ((0, o.isString)(e)) {
      return (0, a.extend)({}, p[e]);
    } else {
      return e;
    }
  };
  t = e;
  if (n = [{
    key: "$container",
    get: function () {
      this.updateContainer();
      return this._$markupContainer;
    }
  }, {
    key: "$visualContainer",
    get: function () {
      return this._$visualContainer;
    }
  }, {
    key: "position",
    get: function () {
      return this._position;
    }
  }, {
    key: "fixWrapperPosition",
    set: function (e) {
      this._props._fixWrapperPosition = e;
      this.styleWrapperPosition();
    }
  }, {
    key: "restorePosition",
    set: function (e) {
      this._props.restorePosition = e;
    }
  }]) {
    h(t.prototype, n);
  }
  if (l) {
    h(t, l);
  }
  Object.defineProperty(t, "prototype", {
    writable: false
  });
  return e;
}();
exports.OverlayPositionController = m;