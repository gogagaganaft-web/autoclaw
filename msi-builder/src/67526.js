exports.default = undefined;
var i;
var o = require("./13306.js");
var a = require("./95479.js");
var r = (i = require("./90169.js")) && i.__esModule ? i : {
  default: i
};
var s = r.default.abstract;
var l = r.default.inherit({
  _geocodeLocation: function (e) {
    return new Promise(function (t) {
      var n = this._geocodedLocations;
      var i = n[e];
      if (i) {
        t(i);
      } else {
        this._geocodeLocationImpl(e).then(function (i) {
          n[e] = i;
          t(i);
        });
      }
    }.bind(this));
  },
  _renderImpl: function () {
    return this._load().then(function () {
      return this._init();
    }.bind(this)).then(function () {
      return Promise.all([this.updateMapType(), this._areBoundsSet() ? this.updateBounds() : this.updateCenter()]);
    }.bind(this)).then(function () {
      this._attachHandlers();
      return new Promise(function (e) {
        var t = setTimeout(function () {
          clearTimeout(t);
          e();
        });
      });
    }.bind(this));
  },
  _load: function () {
    this._mapsLoader ||= this._loadImpl();
    this._markers = [];
    this._routes = [];
    return this._mapsLoader;
  },
  _loadImpl: s,
  _init: s,
  _attachHandlers: s,
  addMarkers: function (e) {
    return Promise.all((0, a.map)(e, function (e) {
      return this._addMarker(e);
    }.bind(this))).then(function (e) {
      this._fitBounds();
      return [false, (0, a.map)(e, function (e) {
        return e.marker;
      })];
    }.bind(this));
  },
  _addMarker: function (e) {
    return this._renderMarker(e).then(function (t) {
      this._markers.push((0, o.extend)({
        options: e
      }, t));
      this._fireMarkerAddedAction({
        options: e,
        originalMarker: t.marker
      });
      return t;
    }.bind(this));
  },
  _renderMarker: s,
  removeMarkers: function (e) {
    var t = this;
    (0, a.each)(e, function (e, n) {
      t._removeMarker(n);
    });
    return Promise.resolve();
  },
  _removeMarker: function (e) {
    var t = this;
    (0, a.each)(this._markers, function (n, i) {
      return i.options !== e || (t._destroyMarker(i), t._markers.splice(n, 1), t._fireMarkerRemovedAction({
        options: i.options
      }), false);
    });
  },
  _destroyMarker: s,
  _clearMarkers: function () {
    while (this._markers.length > 0) {
      this._removeMarker(this._markers[0].options);
    }
  },
  addRoutes: function (e) {
    return Promise.all((0, a.map)(e, function (e) {
      return this._addRoute(e);
    }.bind(this))).then(function (e) {
      this._fitBounds();
      return [false, (0, a.map)(e, function (e) {
        return e.instance;
      })];
    }.bind(this));
  },
  _addRoute: function (e) {
    return this._renderRoute(e).then(function (t) {
      this._routes.push((0, o.extend)({
        options: e
      }, t));
      this._fireRouteAddedAction({
        options: e,
        originalRoute: t.instance
      });
      return t;
    }.bind(this));
  },
  _renderRoute: s,
  removeRoutes: function (e) {
    var t = this;
    (0, a.each)(e, function (e, n) {
      t._removeRoute(n);
    });
    return Promise.resolve();
  },
  _removeRoute: function (e) {
    var t = this;
    (0, a.each)(this._routes, function (n, i) {
      return i.options !== e || (t._destroyRoute(i), t._routes.splice(n, 1), t._fireRouteRemovedAction({
        options: e
      }), false);
    });
  },
  _destroyRoute: s,
  _clearRoutes: function () {
    while (this._routes.length > 0) {
      this._removeRoute(this._routes[0].options);
    }
  },
  adjustViewport: function () {
    return this._fitBounds();
  },
  isEventsCanceled: function () {
    return true;
  },
  _fitBounds: s,
  _updateBounds: function () {
    var e = this;
    this._clearBounds();
    if (this._option("autoAdjust")) {
      (0, a.each)(this._markers, function (t, n) {
        e._extendBounds(n.location);
      });
      (0, a.each)(this._routes, function (t, n) {
        if (n.northEast) {
          e._extendBounds(n.northEast);
        }
        if (n.southWest) {
          e._extendBounds(n.southWest);
        }
      });
    }
  },
  _clearBounds: function () {
    this._bounds = null;
  },
  _extendBounds: s
});
exports.default = l;
module.exports = exports.default;
module.exports.default = exports.default;