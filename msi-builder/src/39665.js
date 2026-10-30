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
exports.PopupPositionController = undefined;
var o;
var a = (o = require("./68374.js")) && o.__esModule ? o : {
  default: o
};
var r = require("./31648.js");
var s = require("./58201.js");
var l = require("./77695.js");
var u = require("./49314.js");
var d = ["fullScreen", "forceApplyBindings", "dragOutsideBoundary", "dragAndResizeArea", "outsideDragFactor"];
function c() {
  return (c = Object.assign ? Object.assign.bind() : function (e) {
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
function h(e, t) {
  if (e == null) {
    return {};
  }
  var n;
  var i;
  var o = function (e, t) {
    if (e == null) {
      return {};
    }
    var n;
    var i;
    var o = {};
    var a = Object.keys(e);
    for (i = 0; i < a.length; i++) {
      n = a[i];
      if (!(t.indexOf(n) >= 0)) {
        o[n] = e[n];
      }
    }
    return o;
  }(e, t);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (i = 0; i < a.length; i++) {
      n = a[i];
      if (!(t.indexOf(n) >= 0)) {
        if (Object.prototype.propertyIsEnumerable.call(e, n)) {
          o[n] = e[n];
        }
      }
    }
  }
  return o;
}
function f(e, t) {
  for (var n = 0; n < t.length; n++) {
    var o = t[n];
    o.enumerable = o.enumerable || false;
    o.configurable = true;
    if ("value" in o) {
      o.writable = true;
    }
    Object.defineProperty(e, (a = o.key, r = undefined, r = function (e, t) {
      if (i(e) !== "object" || e === null) {
        return e;
      }
      var n = e[Symbol.toPrimitive];
      if (n !== undefined) {
        var o = n.call(e, t || "default");
        if (i(o) !== "object") {
          return o;
        }
        throw new TypeError("@@toPrimitive must return a primitive value.");
      }
      return (t === "string" ? String : Number)(e);
    }(a, "string"), i(r) === "symbol" ? r : String(r)), o);
  }
  var a;
  var r;
}
function p(e, t) {
  return (p = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (e, t) {
    e.__proto__ = t;
    return e;
  })(e, t);
}
var g = (0, s.getWindow)();
var m = function (e) {
  var t;
  var n;
  function i(t) {
    var n;
    var i = t.fullScreen;
    var o = t.forceApplyBindings;
    var a = t.dragOutsideBoundary;
    var r = t.dragAndResizeArea;
    var s = t.outsideDragFactor;
    var l = h(t, d);
    (n = e.call(this, l) || this)._props = c({}, n._props, {
      fullScreen: i,
      forceApplyBindings: o,
      dragOutsideBoundary: a,
      dragAndResizeArea: r,
      outsideDragFactor: s
    });
    n._$dragResizeContainer = undefined;
    n._updateDragResizeContainer();
    return n;
  }
  n = e;
  (t = i).prototype = Object.create(n.prototype);
  t.prototype.constructor = t;
  p(t, n);
  var o;
  var s;
  var u;
  var m = i.prototype;
  m.updateContainer = function (t) {
    e.prototype.updateContainer.call(this, t);
    this._updateDragResizeContainer();
  };
  m.dragHandled = function () {
    this.restorePositionOnNextRender(false);
  };
  m.resizeHandled = function () {
    this.restorePositionOnNextRender(false);
  };
  m.positionContent = function () {
    var t;
    var n;
    if (this._props.fullScreen) {
      (0, r.move)(this._$content, {
        top: 0,
        left: 0
      });
      this.detectVisualPositionChange();
    } else {
      if ((t = (n = this._props).forceApplyBindings) !== null && t !== undefined) {
        t.call(n);
      }
      e.prototype.positionContent.call(this);
    }
  };
  m._updateDragResizeContainer = function () {
    this._$dragResizeContainer = this._getDragResizeContainer();
  };
  m._getDragResizeContainer = function () {
    if (this._props.dragOutsideBoundary) {
      return (0, a.default)(g);
    } else if (this._props.dragAndResizeArea) {
      return (0, a.default)(this._props.dragAndResizeArea);
    } else if ((0, l.originalViewPort)().get(0) || this._props.container) {
      return this._$markupContainer;
    } else {
      return (0, a.default)(g);
    }
  };
  m._getVisualContainer = function () {
    if (this._props.fullScreen) {
      return (0, a.default)(g);
    } else {
      return e.prototype._getVisualContainer.call(this);
    }
  };
  m._fullScreenEnabled = function () {
    this.restorePositionOnNextRender(false);
  };
  m._fullScreenDisabled = function () {
    this.restorePositionOnNextRender(true);
  };
  o = i;
  if (s = [{
    key: "fullScreen",
    set: function (e) {
      this._props.fullScreen = e;
      if (e) {
        this._fullScreenEnabled();
      } else {
        this._fullScreenDisabled();
      }
    }
  }, {
    key: "$dragResizeContainer",
    get: function () {
      return this._$dragResizeContainer;
    }
  }, {
    key: "outsideDragFactor",
    get: function () {
      if (this._props.dragOutsideBoundary) {
        return 1;
      } else {
        return this._props.outsideDragFactor;
      }
    },
    set: function (e) {
      this._props.outsideDragFactor = e;
    }
  }, {
    key: "dragAndResizeArea",
    set: function (e) {
      this._props.dragAndResizeArea = e;
      this._updateDragResizeContainer();
    }
  }, {
    key: "dragOutsideBoundary",
    set: function (e) {
      this._props.dragOutsideBoundary = e;
      this._updateDragResizeContainer();
    }
  }]) {
    f(o.prototype, s);
  }
  if (u) {
    f(o, u);
  }
  Object.defineProperty(o, "prototype", {
    writable: false
  });
  return i;
}(u.OverlayPositionController);
exports.PopupPositionController = m;