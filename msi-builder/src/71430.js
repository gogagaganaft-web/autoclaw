exports.default = undefined;
var i = p(require("./68374.js"));
var o = require("./58201.js");
var a = require("./20576.js");
var r = p(require("./20530.js"));
var s = require("./13306.js");
var l = require("./95479.js");
var u = p(require("./67526.js"));
var d = p(require("./96688.js"));
var c = p(require("./52752.js"));
var h = p(require("./37208.js"));
var f = require("./35922.js");
function p(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
var g;
var m;
var _ = (0, o.getWindow)();
function v() {
  return _.google && _.google.maps;
}
var y = u.default.inherit({
  _mapType: function (e) {
    var t = {
      hybrid: google.maps.MapTypeId.HYBRID,
      roadmap: google.maps.MapTypeId.ROADMAP,
      satellite: google.maps.MapTypeId.SATELLITE
    };
    return t[e] || t.hybrid;
  },
  _movementMode: function (e) {
    var t = {
      driving: google.maps.TravelMode.DRIVING,
      walking: google.maps.TravelMode.WALKING
    };
    return t[e] || t.driving;
  },
  _resolveLocation: function (e) {
    return new Promise(function (t) {
      var n = this._getLatLng(e);
      if (n) {
        t(new google.maps.LatLng(n.lat, n.lng));
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
      if ((0, f.isDefined)(e)) {
        new google.maps.Geocoder().geocode({
          address: e
        }, function (e, n) {
          if (n === google.maps.GeocoderStatus.OK) {
            t(e[0].geometry.location);
          } else {
            d.default.log("W1006", n);
            t(new google.maps.LatLng(0, 0));
          }
        });
      } else {
        t(new google.maps.LatLng(0, 0));
      }
    });
  },
  _normalizeLocation: function (e) {
    return {
      lat: e.lat(),
      lng: e.lng()
    };
  },
  _normalizeLocationRect: function (e) {
    return {
      northEast: this._normalizeLocation(e.getNorthEast()),
      southWest: this._normalizeLocation(e.getSouthWest())
    };
  },
  _loadImpl: function () {
    return new Promise(function (e) {
      if (v()) {
        e();
      } else {
        m ||= this._loadMapScript();
        m.then(function () {
          if (v()) {
            e();
          } else {
            this._loadMapScript().then(e);
          }
        }.bind(this));
      }
    }.bind(this)).then(function () {
      (g = function (e) {
        this._position = e.position;
        this._offset = e.offset;
        this._$overlayContainer = (0, i.default)("<div>").css({
          position: "absolute",
          display: "none",
          cursor: "pointer"
        }).append(e.html);
        this.setMap(e.map);
      }).prototype = new google.maps.OverlayView();
      g.prototype.onAdd = function () {
        (0, i.default)(this.getPanes().overlayMouseTarget).append(this._$overlayContainer);
        this._clickListener = google.maps.event.addDomListener(this._$overlayContainer.get(0), "click", function (e) {
          google.maps.event.trigger(this, "click");
          e.preventDefault();
        }.bind(this));
        this.draw();
      };
      g.prototype.onRemove = function () {
        google.maps.event.removeListener(this._clickListener);
        this._$overlayContainer.remove();
      };
      g.prototype.draw = function () {
        var e = this.getProjection().fromLatLngToDivPixel(this._position);
        this._$overlayContainer.css({
          left: e.x + this._offset.left,
          top: e.y + this._offset.top,
          display: "block"
        });
      };
    });
  },
  _loadMapScript: function () {
    return new Promise(function (e) {
      var t = this._keyOption("google");
      _._googleScriptReady = e;
      h.default.sendRequest({
        url: "https://maps.googleapis.com/maps/api/js?callback=_googleScriptReady" + (t ? "&key=" + t : ""),
        dataType: "script"
      });
    }.bind(this)).then(function () {
      try {
        delete _._googleScriptReady;
      } catch (e) {
        _._googleScriptReady = undefined;
      }
    });
  },
  _init: function () {
    return new Promise(function (e) {
      this._resolveLocation(this._option("center")).then(function (t) {
        var n = this._option("controls");
        this._map = new google.maps.Map(this._$container[0], {
          zoom: this._option("zoom"),
          center: t,
          disableDefaultUI: !n
        });
        var i = google.maps.event.addListener(this._map, "idle", function () {
          e(i);
        });
      }.bind(this));
    }.bind(this)).then(function (e) {
      google.maps.event.removeListener(e);
    });
  },
  _attachHandlers: function () {
    this._boundsChangeListener = google.maps.event.addListener(this._map, "bounds_changed", this._boundsChangeHandler.bind(this));
    this._clickListener = google.maps.event.addListener(this._map, "click", this._clickActionHandler.bind(this));
  },
  _boundsChangeHandler: function () {
    var e = this._map.getBounds();
    this._option("bounds", this._normalizeLocationRect(e));
    var t = this._map.getCenter();
    this._option("center", this._normalizeLocation(t));
    if (!this._preventZoomChangeEvent) {
      this._option("zoom", this._map.getZoom());
    }
  },
  _clickActionHandler: function (e) {
    this._fireClickAction({
      location: this._normalizeLocation(e.latLng)
    });
  },
  updateDimensions: function () {
    var e = this._option("center");
    google.maps.event.trigger(this._map, "resize");
    this._option("center", e);
    return this.updateCenter();
  },
  updateMapType: function () {
    this._map.setMapTypeId(this._mapType(this._option("type")));
    return Promise.resolve();
  },
  updateBounds: function () {
    return Promise.all([this._resolveLocation(this._option("bounds.northEast")), this._resolveLocation(this._option("bounds.southWest"))]).then(function (e) {
      var t = new google.maps.LatLngBounds();
      t.extend(e[0]);
      t.extend(e[1]);
      this._map.fitBounds(t);
    }.bind(this));
  },
  updateCenter: function () {
    return this._resolveLocation(this._option("center")).then(function (e) {
      this._map.setCenter(e);
      this._option("center", this._normalizeLocation(e));
    }.bind(this));
  },
  updateZoom: function () {
    this._map.setZoom(this._option("zoom"));
    return Promise.resolve();
  },
  updateControls: function () {
    var e = this._option("controls");
    this._map.setOptions({
      disableDefaultUI: !e
    });
    return Promise.resolve();
  },
  isEventsCanceled: function (e) {
    var t = this._map && this._map.get("gestureHandling");
    return !((0, i.default)(e.target).closest(`.gm-style-iw`).length > 0) && (r.default.real().deviceType === "desktop" || t !== "cooperative") && this.callBase();
  },
  _renderMarker: function (e) {
    return this._resolveLocation(e.location).then(function (t) {
      var n;
      n = e.html ? new g({
        map: this._map,
        position: t,
        html: e.html,
        offset: (0, s.extend)({
          top: 0,
          left: 0
        }, e.htmlOffset)
      }) : new google.maps.Marker({
        position: t,
        map: this._map,
        icon: e.iconSrc || this._option("markerIconSrc")
      });
      var i;
      var o = this._renderTooltip(n, e.tooltip);
      if (e.onClick || e.tooltip) {
        var r = this._mapWidget._createAction(e.onClick || a.noop);
        var l = this._normalizeLocation(t);
        i = google.maps.event.addListener(n, "click", function () {
          r({
            location: l
          });
          if (o) {
            o.open(this._map, n);
          }
        }.bind(this));
      }
      return {
        location: t,
        marker: n,
        listener: i
      };
    }.bind(this));
  },
  _renderTooltip: function (e, t) {
    if (t) {
      t = this._parseTooltipOptions(t);
      var n = new google.maps.InfoWindow({
        content: t.text
      });
      if (t.visible) {
        n.open(this._map, e);
      }
      return n;
    }
  },
  _destroyMarker: function (e) {
    e.marker.setMap(null);
    if (e.listener) {
      google.maps.event.removeListener(e.listener);
    }
  },
  _renderRoute: function (e) {
    return Promise.all((0, l.map)(e.locations, function (e) {
      return this._resolveLocation(e);
    }.bind(this))).then(function (t) {
      return new Promise(function (n) {
        var i = {
          origin: t.shift(),
          destination: t.pop(),
          waypoints: (0, l.map)(t, function (e) {
            return {
              location: e,
              stopover: true
            };
          }),
          optimizeWaypoints: true,
          travelMode: this._movementMode(e.mode)
        };
        new google.maps.DirectionsService().route(i, function (t, i) {
          if (i === google.maps.DirectionsStatus.OK) {
            var o = new c.default(e.color || this._defaultRouteColor()).toHex();
            var a = {
              directions: t,
              map: this._map,
              suppressMarkers: true,
              preserveViewport: true,
              polylineOptions: {
                strokeWeight: e.weight || this._defaultRouteWeight(),
                strokeOpacity: e.opacity || this._defaultRouteOpacity(),
                strokeColor: o
              }
            };
            var r = new google.maps.DirectionsRenderer(a);
            var s = t.routes[0].bounds;
            n({
              instance: r,
              northEast: s.getNorthEast(),
              southWest: s.getSouthWest()
            });
          } else {
            d.default.log("W1006", i);
            n({
              instance: new google.maps.DirectionsRenderer({})
            });
          }
        }.bind(this));
      }.bind(this));
    }.bind(this));
  },
  _destroyRoute: function (e) {
    e.instance.setMap(null);
  },
  _fitBounds: function () {
    this._updateBounds();
    if (this._bounds && this._option("autoAdjust")) {
      var e = this._map.getZoom();
      this._preventZoomChangeEvent = true;
      this._map.fitBounds(this._bounds);
      this._boundsChangeHandler();
      var t = this._map.getZoom();
      if (e < t) {
        this._map.setZoom(e);
      } else {
        this._option("zoom", t);
      }
      delete this._preventZoomChangeEvent;
    }
    return Promise.resolve();
  },
  _extendBounds: function (e) {
    this._bounds ||= new google.maps.LatLngBounds();
    this._bounds.extend(e);
  },
  clean: function () {
    if (this._map) {
      google.maps.event.removeListener(this._boundsChangeListener);
      google.maps.event.removeListener(this._clickListener);
      this._clearMarkers();
      this._clearRoutes();
      delete this._map;
      this._$container.empty();
    }
    return Promise.resolve();
  }
});
exports.default = y;
module.exports = exports.default;
module.exports.default = exports.default;