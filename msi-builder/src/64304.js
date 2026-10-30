exports.default = undefined;
var i = b(require("./68374.js"));
var o = b(require("./55994.js"));
var a = require("./62754.js");
var r = b(require("./99393.js"));
var s = b(require("./96688.js"));
var l = b(require("./20530.js"));
var u = b(require("./14390.js"));
var d = require("./78008.js");
var c = require("./95479.js");
var h = require("./13306.js");
var f = require("./89386.js");
var p = require("./35922.js");
var g = require("./39611.js");
var m = b(require("./93786.js"));
var _ = b(require("./48112.js"));
var v = b(require("./71430.js"));
var y = b(require("./253.js"));
function b(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
var x = {
  googleStatic: _.default,
  google: v.default,
  bing: y.default
};
var w = u.default.inherit({
  _getDefaultOptions: function () {
    return (0, h.extend)(this.callBase(), {
      bounds: {
        northEast: null,
        southWest: null
      },
      center: {
        lat: 0,
        lng: 0
      },
      zoom: 1,
      width: 300,
      height: 300,
      type: "roadmap",
      provider: "google",
      autoAdjust: true,
      markers: [],
      markerIconSrc: null,
      onMarkerAdded: null,
      onMarkerRemoved: null,
      routes: [],
      onRouteAdded: null,
      onRouteRemoved: null,
      apiKey: {
        bing: "",
        google: "",
        googleStatic: ""
      },
      controls: false,
      onReady: null,
      onUpdated: null,
      onClick: null
    });
  },
  _defaultOptionsRules: function () {
    return this.callBase().concat([{
      device: function () {
        return l.default.real().deviceType === "desktop" && !l.default.isSimulator();
      },
      options: {
        focusStateEnabled: true
      }
    }]);
  },
  _init: function () {
    this.callBase();
    this.$element().addClass("dx-map");
    this._lastAsyncAction = Promise.resolve();
    this._checkOption("provider");
    this._checkOption("markers");
    this._checkOption("routes");
    this._initContainer();
    this._grabEvents();
    this._rendered = {};
  },
  _useTemplates: function () {
    return false;
  },
  _checkOption: function (e) {
    var t = this.option(e);
    if (e === "markers" && !Array.isArray(t)) {
      throw s.default.Error("E1022");
    }
    if (e === "routes" && !Array.isArray(t)) {
      throw s.default.Error("E1023");
    }
  },
  _initContainer: function () {
    this._$container = (0, i.default)("<div>").addClass("dx-map-container");
    this.$element().append(this._$container);
  },
  _grabEvents: function () {
    var e = (0, g.addNamespace)(m.default.down, this.NAME);
    o.default.on(this.$element(), e, this._cancelEvent.bind(this));
  },
  _cancelEvent: function (e) {
    if (this._provider && this._provider.isEventsCanceled(e) && !this.option("disabled")) {
      e.stopPropagation();
    }
  },
  _saveRendered: function (e) {
    var t = this.option(e);
    this._rendered[e] = t.slice();
  },
  _render: function () {
    this.callBase();
    this._renderShield();
    this._saveRendered("markers");
    this._saveRendered("routes");
    this._provider = new x[this.option("provider")](this, this._$container);
    this._queueAsyncAction("render", this._rendered.markers, this._rendered.routes);
  },
  _renderShield: function () {
    var e;
    if (this.option("disabled")) {
      e = (0, i.default)("<div>").addClass("dx-map-shield");
      this.$element().append(e);
    } else {
      (e = this.$element().find(".dx-map-shield")).remove();
    }
  },
  _clean: function () {
    this._cleanFocusState();
    if (this._provider) {
      this._provider.clean();
    }
    this._provider = null;
    this._lastAsyncAction = Promise.resolve();
    this.setOptionSilent("bounds", {
      northEast: null,
      southWest: null
    });
    delete this._suppressAsyncAction;
  },
  _optionChanged: function (e) {
    var t = e.name;
    var n = this._optionChangeBag;
    this._optionChangeBag = null;
    switch (t) {
      case "disabled":
        this._renderShield();
        this.callBase(e);
        break;
      case "width":
      case "height":
        this.callBase(e);
        this._dimensionChanged();
        break;
      case "provider":
        this._suppressAsyncAction = true;
        this._invalidate();
        break;
      case "apiKey":
        s.default.log("W1001");
        break;
      case "bounds":
        this._queueAsyncAction("updateBounds");
        break;
      case "center":
        this._queueAsyncAction("updateCenter");
        break;
      case "zoom":
        this._queueAsyncAction("updateZoom");
        break;
      case "type":
        this._queueAsyncAction("updateMapType");
        break;
      case "controls":
        this._queueAsyncAction("updateControls", this._rendered.markers, this._rendered.routes);
        break;
      case "autoAdjust":
        this._queueAsyncAction("adjustViewport");
        break;
      case "markers":
      case "routes":
        this._checkOption(t);
        var i = this._rendered[t];
        this._saveRendered(t);
        this._queueAsyncAction("update" + (0, d.titleize)(t), n ? n.removed : i, n ? n.added : this._rendered[t]).then(function (e) {
          if (n) {
            n.resolve(e);
          }
        });
        break;
      case "markerIconSrc":
        this._queueAsyncAction("updateMarkers", this._rendered.markers, this._rendered.markers);
        break;
      case "onReady":
      case "onUpdated":
      case "onMarkerAdded":
      case "onMarkerRemoved":
      case "onRouteAdded":
      case "onRouteRemoved":
      case "onClick":
        break;
      default:
        this.callBase.apply(this, arguments);
    }
  },
  _visibilityChanged: function (e) {
    if (e) {
      this._dimensionChanged();
    }
  },
  _dimensionChanged: function () {
    this._queueAsyncAction("updateDimensions");
  },
  _queueAsyncAction: function (e) {
    var t = [].slice.call(arguments).slice(1);
    var n = this._suppressAsyncAction;
    this._lastAsyncAction = this._lastAsyncAction.then(function () {
      if (!this._provider || n) {
        return Promise.resolve();
      } else {
        return this._provider[e].apply(this._provider, t).then(function (e) {
          if ((e = (0, f.wrapToArray)(e))[0] && !this._disposed) {
            this._triggerReadyAction();
          }
          return e[1];
        }.bind(this));
      }
    }.bind(this));
    return this._lastAsyncAction;
  },
  _triggerReadyAction: function () {
    this._createActionByOption("onReady")({
      originalMap: this._provider.map()
    });
  },
  _triggerUpdateAction: function () {
    this._createActionByOption("onUpdated")();
  },
  setOptionSilent: function (e, t) {
    this._setOptionWithoutOptionChange(e, t);
  },
  addMarker: function (e) {
    return this._addFunction("markers", e);
  },
  removeMarker: function (e) {
    return this._removeFunction("markers", e);
  },
  addRoute: function (e) {
    return this._addFunction("routes", e);
  },
  removeRoute: function (e) {
    return this._removeFunction("routes", e);
  },
  _addFunction: function (e, t) {
    var n = this.option(e);
    var i = (0, f.wrapToArray)(t);
    n.push.apply(n, i);
    return this._partialArrayOptionChange(e, n, i, []);
  },
  _removeFunction: function (e, t) {
    var n = this.option(e);
    var i = (0, f.wrapToArray)(t);
    (0, c.each)(i, function (t, o) {
      var a = (0, p.isNumeric)(o) ? o : n == null ? undefined : n.indexOf(o);
      if (a === -1) {
        throw s.default.log("E1021", (0, d.titleize)(e.substring(0, e.length - 1)), o);
      }
      var r = n.splice(a, 1)[0];
      i.splice(t, 1, r);
    });
    return this._partialArrayOptionChange(e, n, [], i);
  },
  _partialArrayOptionChange: function (e, t, n, i) {
    return (0, a.fromPromise)(new Promise(function (o) {
      this._optionChangeBag = {
        resolve: o,
        added: n,
        removed: i
      };
      this.option(e, t);
    }.bind(this)).then(function (e) {
      if (e && e.length === 1) {
        return e[0];
      } else {
        return e;
      }
    }), this);
  }
});
(0, r.default)("dxMap", w);
var C = w;
exports.default = C;
module.exports = exports.default;
module.exports.default = exports.default;