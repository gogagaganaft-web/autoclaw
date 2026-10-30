exports.default = undefined;
var i = require("./58664.js");
var o = require("./20576.js");
var a = require("./58201.js");
var r = require("./13306.js");
var s = f(require("./96688.js"));
var l = require("./95479.js");
var u = f(require("./67526.js"));
var d = f(require("./52752.js"));
var c = f(require("./37208.js"));
var h = require("./35922.js");
function f(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
var p;
var g = (0, a.getWindow)();
function m() {
  return g.Microsoft && g.Microsoft.Maps;
}
var _ = u.default.inherit({
  _mapType: function (e) {
    var t = {
      roadmap: Microsoft.Maps.MapTypeId.road,
      hybrid: Microsoft.Maps.MapTypeId.aerial,
      satellite: Microsoft.Maps.MapTypeId.aerial
    };
    return t[e] || t.road;
  },
  _movementMode: function (e) {
    var t = {
      driving: Microsoft.Maps.Directions.RouteMode.driving,
      walking: Microsoft.Maps.Directions.RouteMode.walking
    };
    return t[e] || t.driving;
  },
  _resolveLocation: function (e) {
    return new Promise(function (t) {
      var n = this._getLatLng(e);
      if (n) {
        t(new Microsoft.Maps.Location(n.lat, n.lng));
      } else {
        this._geocodeLocation(e).then(function (e) {
          t(e);
        });
      }
    }.bind(this));
  },
  _geocodedLocations: {},
  _geocodeLocationImpl: function (e) {
    return new Promise(function (t) {
      if ((0, h.isDefined)(e)) {
        var n = new Microsoft.Maps.Search.SearchManager(this._map);
        var i = {
          where: e,
          count: 1,
          callback: function (e) {
            if (e.results[0]) {
              var n = e.results[0].location;
              t(new Microsoft.Maps.Location(n.latitude, n.longitude));
            } else {
              t(new Microsoft.Maps.Location(0, 0));
            }
          }
        };
        n.geocode(i);
      } else {
        t(new Microsoft.Maps.Location(0, 0));
      }
    }.bind(this));
  },
  _normalizeLocation: function (e) {
    return {
      lat: e.latitude,
      lng: e.longitude
    };
  },
  _normalizeLocationRect: function (e) {
    var t = this._normalizeLocation(e.getNorthwest());
    var n = this._normalizeLocation(e.getSoutheast());
    return {
      northEast: {
        lat: t.lat,
        lng: n.lng
      },
      southWest: {
        lat: n.lat,
        lng: t.lng
      }
    };
  },
  _loadImpl: function () {
    return new Promise(function (e) {
      if (m()) {
        e();
      } else {
        p ||= this._loadMapScript();
        p.then(function () {
          if (m()) {
            e();
          } else {
            this._loadMapScript().then(e);
          }
        }.bind(this));
      }
    }.bind(this)).then(function () {
      return Promise.all([new Promise(function (e) {
        Microsoft.Maps.loadModule("Microsoft.Maps.Search", {
          callback: e
        });
      }), new Promise(function (e) {
        Microsoft.Maps.loadModule("Microsoft.Maps.Directions", {
          callback: e
        });
      })]);
    });
  },
  _loadMapScript: function () {
    return new Promise(function (e) {
      g._bingScriptReady = e;
      c.default.sendRequest({
        url: "https://www.bing.com/api/maps/mapcontrol?callback=_bingScriptReady",
        dataType: "script"
      });
    }).then(function () {
      try {
        delete g._bingScriptReady;
      } catch (e) {
        g._bingScriptReady = undefined;
      }
    });
  },
  _init: function () {
    this._createMap();
    return Promise.resolve();
  },
  _createMap: function () {
    var e = this._option("controls");
    this._map = new Microsoft.Maps.Map(this._$container[0], {
      credentials: this._keyOption("bing"),
      zoom: this._option("zoom"),
      showDashboard: e,
      showMapTypeSelector: e,
      showScalebar: e
    });
  },
  _attachHandlers: function () {
    this._providerViewChangeHandler = Microsoft.Maps.Events.addHandler(this._map, "viewchange", this._viewChangeHandler.bind(this));
    this._providerClickHandler = Microsoft.Maps.Events.addHandler(this._map, "click", this._clickActionHandler.bind(this));
  },
  _viewChangeHandler: function () {
    var e = this._map.getBounds();
    this._option("bounds", this._normalizeLocationRect(e));
    var t = this._map.getCenter();
    this._option("center", this._normalizeLocation(t));
    if (!this._preventZoomChangeEvent) {
      this._option("zoom", this._map.getZoom());
    }
  },
  _clickActionHandler: function (e) {
    if (e.targetType === "map") {
      this._fireClickAction({
        location: this._normalizeLocation(e.location)
      });
    }
  },
  updateDimensions: function () {
    var e = this._$container;
    this._map.setOptions({
      width: (0, i.getWidth)(e),
      height: (0, i.getHeight)(e)
    });
    return Promise.resolve();
  },
  updateMapType: function () {
    var e = this._option("type");
    var t = Microsoft.Maps.LabelOverlay;
    this._map.setView({
      animate: false,
      mapTypeId: this._mapType(e),
      labelOverlay: e === "satellite" ? t.hidden : t.visible
    });
    return Promise.resolve();
  },
  updateBounds: function () {
    return Promise.all([this._resolveLocation(this._option("bounds.northEast")), this._resolveLocation(this._option("bounds.southWest"))]).then(function (e) {
      var t = new Microsoft.Maps.LocationRect.fromLocations(e[0], e[1]);
      this._map.setView({
        animate: false,
        bounds: t
      });
    }.bind(this));
  },
  updateCenter: function () {
    return this._resolveLocation(this._option("center")).then(function (e) {
      this._map.setView({
        animate: false,
        center: e
      });
    }.bind(this));
  },
  updateZoom: function () {
    this._map.setView({
      animate: false,
      zoom: this._option("zoom")
    });
    return Promise.resolve();
  },
  updateControls: function () {
    this.clean();
    return this.render.apply(this, arguments);
  },
  _renderMarker: function (e) {
    return this._resolveLocation(e.location).then(function (t) {
      var n = {
        icon: e.iconSrc || this._option("markerIconSrc")
      };
      if (e.html) {
        (0, r.extend)(n, {
          htmlContent: e.html,
          width: null,
          height: null
        });
        var i = e.htmlOffset;
        if (i) {
          n.anchor = new Microsoft.Maps.Point(-i.left, -i.top);
        }
      }
      var a = new Microsoft.Maps.Pushpin(t, n);
      this._map.entities.push(a);
      var s;
      var l = this._renderTooltip(t, e.tooltip);
      if (e.onClick || e.tooltip) {
        var u = this._mapWidget._createAction(e.onClick || o.noop);
        var d = this._normalizeLocation(t);
        s = Microsoft.Maps.Events.addHandler(a, "click", function () {
          u({
            location: d
          });
          if (l) {
            l.setOptions({
              visible: true
            });
          }
        });
      }
      return {
        location: t,
        marker: a,
        infobox: l,
        handler: s
      };
    }.bind(this));
  },
  _renderTooltip: function (e, t) {
    if (t) {
      t = this._parseTooltipOptions(t);
      var n = new Microsoft.Maps.Infobox(e, {
        description: t.text,
        offset: new Microsoft.Maps.Point(0, 13),
        visible: t.visible
      });
      n.setMap(this._map);
      return n;
    }
  },
  _destroyMarker: function (e) {
    this._map.entities.remove(e.marker);
    if (e.infobox) {
      e.infobox.setMap(null);
    }
    if (e.handler) {
      Microsoft.Maps.Events.removeHandler(e.handler);
    }
  },
  _renderRoute: function (e) {
    return Promise.all((0, l.map)(e.locations, function (e) {
      return this._resolveLocation(e);
    }.bind(this))).then(function (t) {
      return new Promise(function (n) {
        var i = new Microsoft.Maps.Directions.DirectionsManager(this._map);
        var o = new d.default(e.color || this._defaultRouteColor()).toHex();
        var a = new Microsoft.Maps.Color.fromHex(o);
        a.a = (e.opacity || this._defaultRouteOpacity()) * 255;
        i.setRenderOptions({
          autoUpdateMapView: false,
          displayRouteSelector: false,
          waypointPushpinOptions: {
            visible: false
          },
          drivingPolylineOptions: {
            strokeColor: a,
            strokeThickness: e.weight || this._defaultRouteWeight()
          },
          walkingPolylineOptions: {
            strokeColor: a,
            strokeThickness: e.weight || this._defaultRouteWeight()
          }
        });
        i.setRequestOptions({
          routeMode: this._movementMode(e.mode),
          routeDraggable: false
        });
        (0, l.each)(t, function (e, t) {
          var n = new Microsoft.Maps.Directions.Waypoint({
            location: t
          });
          i.addWaypoint(n);
        });
        var r = [];
        r.push(Microsoft.Maps.Events.addHandler(i, "directionsUpdated", function (e) {
          while (r.length) {
            Microsoft.Maps.Events.removeHandler(r.pop());
          }
          var t = e.routeSummary[0];
          n({
            instance: i,
            northEast: t.northEast,
            southWest: t.southWest
          });
        }));
        r.push(Microsoft.Maps.Events.addHandler(i, "directionsError", function (e) {
          while (r.length) {
            Microsoft.Maps.Events.removeHandler(r.pop());
          }
          var t = "RouteResponseCode: " + e.responseCode + " - " + e.message;
          s.default.log("W1006", t);
          n({
            instance: i
          });
        }));
        i.calculateDirections();
      }.bind(this));
    }.bind(this));
  },
  _destroyRoute: function (e) {
    e.instance.dispose();
  },
  _fitBounds: function () {
    this._updateBounds();
    if (this._bounds && this._option("autoAdjust")) {
      var e = this._map.getZoom();
      this._preventZoomChangeEvent = true;
      var t = this._bounds.clone();
      t.height = t.height * 1.1;
      t.width = t.width * 1.1;
      this._map.setView({
        animate: false,
        bounds: t,
        zoom: e
      });
      var n = this._map.getZoom();
      if (e < n) {
        this._map.setView({
          animate: false,
          zoom: e
        });
      } else {
        this._option("zoom", n);
      }
      delete this._preventZoomChangeEvent;
    }
    return Promise.resolve();
  },
  _extendBounds: function (e) {
    if (this._bounds) {
      this._bounds = new Microsoft.Maps.LocationRect.fromLocations(this._bounds.getNorthwest(), this._bounds.getSoutheast(), e);
    } else {
      this._bounds = new Microsoft.Maps.LocationRect(e, 1e-16, 1e-16);
    }
  },
  clean: function () {
    if (this._map) {
      Microsoft.Maps.Events.removeHandler(this._providerViewChangeHandler);
      Microsoft.Maps.Events.removeHandler(this._providerClickHandler);
      this._clearMarkers();
      this._clearRoutes();
      this._map.dispose();
    }
    return Promise.resolve();
  }
});
exports.default = _;
module.exports = exports.default;
module.exports.default = exports.default;