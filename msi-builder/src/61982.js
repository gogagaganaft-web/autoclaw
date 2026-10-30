exports.default = undefined;
var i;
var o = (i = require("./50984.js")) && i.__esModule ? i : {
  default: i
};
var a = require("./348.js");
function r(e) {
  return (r = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function (e) {
    return typeof e;
  } : function (e) {
    if (e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype) {
      return "symbol";
    } else {
      return typeof e;
    }
  })(e);
}
function s(e, t) {
  return (s = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (e, t) {
    e.__proto__ = t;
    return e;
  })(e, t);
}
var l = function (e) {
  var t;
  var n;
  function i(t) {
    var n;
    n = e.call(this, t) || this;
    var i = (0, a.getDiagram)().DiagramCommand;
    n.commandOptions = {};
    n.commandOptions[i.Fullscreen] = "fullScreen";
    n.commandOptions[i.ZoomLevel] = function (e) {
      if (r(this._getOption("zoomLevel")) === "object") {
        this._setOption("zoomLevel.value", e);
      } else {
        this._setOption("zoomLevel", e);
      }
    };
    n.commandOptions[i.SwitchAutoZoom] = function (e) {
      var t = (0, a.getDiagram)().AutoZoomMode;
      switch (e) {
        case t.FitContent:
          this._setOption("autoZoomMode", "fitContent");
          break;
        case t.FitToWidth:
          this._setOption("autoZoomMode", "fitWidth");
          break;
        case t.Disabled:
          this._setOption("autoZoomMode", "disabled");
      }
    };
    n.commandOptions[i.ToggleSimpleView] = "simpleView";
    n.commandOptions[i.ShowGrid] = "showGrid";
    n.commandOptions[i.SnapToGrid] = "snapToGrid";
    n.commandOptions[i.GridSize] = function (e) {
      if (r(this._getOption("gridSize")) === "object") {
        this._setOption("gridSize.value", e);
      } else {
        this._setOption("gridSize", e);
      }
    };
    n.commandOptions[i.ViewUnits] = "viewUnits";
    n.commandOptions[i.PageSize] = function (e) {
      var t = this._getOption("pageSize");
      if (t === undefined || t.width !== e.width || t.height !== e.height) {
        this._setOption("pageSize", e);
      }
    };
    n.commandOptions[i.PageLandscape] = function (e) {
      this._setOption("pageOrientation", e ? "landscape" : "portrait");
    };
    n.commandOptions[i.ViewUnits] = function (e) {
      var t = (0, a.getDiagram)().DiagramUnit;
      switch (e) {
        case t.In:
          this._setOption("viewUnits", "in");
          break;
        case t.Cm:
          this._setOption("viewUnits", "cm");
          break;
        case t.Px:
          this._setOption("viewUnits", "px");
      }
    };
    n.commandOptions[i.PageColor] = "pageColor";
    n._updateLock = 0;
    return n;
  }
  n = e;
  (t = i).prototype = Object.create(n.prototype);
  t.prototype.constructor = t;
  s(t, n);
  var o = i.prototype;
  o.getCommandKeys = function () {
    return Object.keys(this.commandOptions).map(function (e) {
      return parseInt(e);
    });
  };
  o.setItemValue = function (e, t) {
    if (!this.isUpdateLocked()) {
      this.beginUpdate();
      try {
        if (typeof this.commandOptions[e] == "function") {
          this.commandOptions[e].call(this, t);
        } else {
          this._setOption(this.commandOptions[e], t);
        }
      } finally {
        this.endUpdate();
      }
    }
  };
  o.beginUpdate = function () {
    this._updateLock++;
  };
  o.endUpdate = function () {
    this._updateLock--;
  };
  o.isUpdateLocked = function () {
    return this._updateLock > 0;
  };
  o._getOption = function (e) {
    return this._owner.option(e);
  };
  o._setOption = function (e, t) {
    this._owner.option(e, t);
  };
  return i;
}(o.default);
exports.default = l;
module.exports = exports.default;
module.exports.default = exports.default;