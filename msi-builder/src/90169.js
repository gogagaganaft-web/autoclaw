exports.default = undefined;
var i;
var o = (i = require("./38377.js")) && i.__esModule ? i : {
  default: i
};
var a = require("./95479.js");
var r = require("./35922.js");
var s = require("./39611.js");
var l = o.default.abstract;
var u = o.default.inherit({
  _defaultRouteWeight: function () {
    return 5;
  },
  _defaultRouteOpacity: function () {
    return 0.5;
  },
  _defaultRouteColor: function () {
    return "#0000FF";
  },
  ctor: function (e, t) {
    this._mapWidget = e;
    this._$container = t;
  },
  render: function (e, t) {
    return this._renderImpl().then(function () {
      return Promise.all([this._applyFunctionIfNeeded("addMarkers", e), this._applyFunctionIfNeeded("addRoutes", t)]).then(function () {
        return true;
      });
    }.bind(this));
  },
  _renderImpl: l,
  updateDimensions: l,
  updateMapType: l,
  updateBounds: l,
  updateCenter: l,
  updateZoom: l,
  updateControls: l,
  updateMarkers: function (e, t) {
    return new Promise(function (n) {
      return this._applyFunctionIfNeeded("removeMarkers", e).then(function (e) {
        this._applyFunctionIfNeeded("addMarkers", t).then(function (t) {
          n(t || e);
        });
      }.bind(this));
    }.bind(this));
  },
  addMarkers: l,
  removeMarkers: l,
  adjustViewport: l,
  updateRoutes: function (e, t) {
    return new Promise(function (n) {
      return this._applyFunctionIfNeeded("removeRoutes", e).then(function (e) {
        this._applyFunctionIfNeeded("addRoutes", t).then(function (t) {
          n(t || e);
        });
      }.bind(this));
    }.bind(this));
  },
  addRoutes: l,
  removeRoutes: l,
  clean: l,
  map: function () {
    return this._map;
  },
  isEventsCanceled: function () {
    return false;
  },
  _option: function (e, t) {
    if (t === undefined) {
      return this._mapWidget.option(e);
    }
    this._mapWidget.setOptionSilent(e, t);
  },
  _keyOption: function (e) {
    var t = this._option("apiKey");
    if (t[e] === undefined) {
      return t;
    } else {
      return t[e];
    }
  },
  _parseTooltipOptions: function (e) {
    return {
      text: e.text || e,
      visible: e.isShown || false
    };
  },
  _getLatLng: function (e) {
    if (typeof e == "string") {
      var t = (0, a.map)(e.split(","), function (e) {
        return e.trim();
      });
      var n = /^[-+]?[0-9]*\.?[0-9]*$/;
      if (t.length === 2 && t[0].match(n) && t[1].match(n)) {
        return {
          lat: parseFloat(t[0]),
          lng: parseFloat(t[1])
        };
      }
    } else {
      if (Array.isArray(e) && e.length === 2) {
        return {
          lat: e[0],
          lng: e[1]
        };
      }
      if ((0, r.isPlainObject)(e) && (0, r.isNumeric)(e.lat) && (0, r.isNumeric)(e.lng)) {
        return e;
      }
    }
    return null;
  },
  _areBoundsSet: function () {
    return this._option("bounds.northEast") && this._option("bounds.southWest");
  },
  _addEventNamespace: function (e) {
    return (0, s.addNamespace)(e, this._mapWidget.NAME);
  },
  _applyFunctionIfNeeded: function (e, t) {
    if (t.length) {
      return this[e](t);
    } else {
      return Promise.resolve();
    }
  },
  _fireAction: function (e, t) {
    this._mapWidget._createActionByOption(e)(t);
  },
  _fireClickAction: function (e) {
    this._fireAction("onClick", e);
  },
  _fireMarkerAddedAction: function (e) {
    this._fireAction("onMarkerAdded", e);
  },
  _fireMarkerRemovedAction: function (e) {
    this._fireAction("onMarkerRemoved", e);
  },
  _fireRouteAddedAction: function (e) {
    this._fireAction("onRouteAdded", e);
  },
  _fireRouteRemovedAction: function (e) {
    this._fireAction("onRouteRemoved", e);
  }
});
exports.default = u;
module.exports = exports.default;
module.exports.default = exports.default;