exports.default = undefined;
var i = require("./58664.js");
var o = require("./95479.js");
var a = u(require("./55994.js"));
var r = u(require("./90169.js"));
var s = u(require("./52752.js"));
var l = require("./95429.js");
function u(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
var d = r.default.inherit({
  _locationToString: function (e) {
    var t = this._getLatLng(e);
    if (t) {
      return t.lat + "," + t.lng;
    } else {
      return e.toString().replace(/ /g, "+");
    }
  },
  _renderImpl: function () {
    return this._updateMap();
  },
  updateDimensions: function () {
    return this._updateMap();
  },
  updateMapType: function () {
    return this._updateMap();
  },
  updateBounds: function () {
    return Promise.resolve();
  },
  updateCenter: function () {
    return this._updateMap();
  },
  updateZoom: function () {
    return this._updateMap();
  },
  updateControls: function () {
    return Promise.resolve();
  },
  addMarkers: function (e) {
    var t = this;
    return this._updateMap().then(function (n) {
      (0, o.each)(e, function (e, n) {
        t._fireMarkerAddedAction({
          options: n
        });
      });
      return n;
    });
  },
  removeMarkers: function (e) {
    var t = this;
    return this._updateMap().then(function (n) {
      (0, o.each)(e, function (e, n) {
        t._fireMarkerRemovedAction({
          options: n
        });
      });
      return n;
    });
  },
  adjustViewport: function () {
    return Promise.resolve();
  },
  addRoutes: function (e) {
    var t = this;
    return this._updateMap().then(function (n) {
      (0, o.each)(e, function (e, n) {
        t._fireRouteAddedAction({
          options: n
        });
      });
      return n;
    });
  },
  removeRoutes: function (e) {
    var t = this;
    return this._updateMap().then(function (n) {
      (0, o.each)(e, function (e, n) {
        t._fireRouteRemovedAction({
          options: n
        });
      });
      return n;
    });
  },
  clean: function () {
    this._$container.css("backgroundImage", "none");
    a.default.off(this._$container, this._addEventNamespace(l.name));
    return Promise.resolve();
  },
  mapRendered: function () {
    return true;
  },
  _updateMap: function () {
    var e = this._keyOption("googleStatic");
    var t = this._$container;
    var n = ["sensor=false", "size=" + Math.round((0, i.getWidth)(t)) + "x" + Math.round((0, i.getHeight)(t)), "maptype=" + this._option("type"), "center=" + this._locationToString(this._option("center")), "zoom=" + this._option("zoom"), this._markersSubstring()];
    n.push.apply(n, this._routeSubstrings());
    if (e) {
      n.push("key=" + e);
    }
    var o = "https://maps.google.com/maps/api/staticmap?" + n.join("&");
    this._$container.css("background", "url(\"" + o + "\") no-repeat 0 0");
    this._attachClickEvent();
    return Promise.resolve(true);
  },
  _markersSubstring: function () {
    var e = this;
    var t = [];
    var n = this._option("markerIconSrc");
    if (n) {
      t.push("icon:" + n);
    }
    (0, o.each)(this._option("markers"), function (n, i) {
      t.push(e._locationToString(i.location));
    });
    return "markers=" + t.join("|");
  },
  _routeSubstrings: function () {
    var e = this;
    var t = [];
    (0, o.each)(this._option("routes"), function (n, i) {
      var a = new s.default(i.color || e._defaultRouteColor()).toHex().replace("#", "0x");
      var r = Math.round((i.opacity || e._defaultRouteOpacity()) * 255).toString(16);
      var l = i.weight || e._defaultRouteWeight();
      var u = [];
      (0, o.each)(i.locations, function (t, n) {
        u.push(e._locationToString(n));
      });
      t.push("path=color:" + a + r + "|weight:" + l + "|" + u.join("|"));
    });
    return t;
  },
  _attachClickEvent: function () {
    var e = this;
    var t = this._addEventNamespace(l.name);
    a.default.off(this._$container, t);
    a.default.on(this._$container, t, function (t) {
      e._fireClickAction({
        event: t
      });
    });
  }
});
exports.default = d;
module.exports = exports.default;
module.exports.default = exports.default;