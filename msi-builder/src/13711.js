exports.default = undefined;
var i = require("./19157.js");
var o = require("./14316.js");
var a = require("./17323.js");
var r = require("./3797.js");
var s = require("./49497.js");
var l = require("./93699.js");
var u = require("./7291.js");
var d = require("./39378.js");
var c = require("./15151.js");
var h = require("./8068.js");
var f = require("./56145.js");
require("./102.js");
var p = x(require("./59063.js"));
var g = x(require("./99393.js"));
var m = require("./82454.js");
var _ = require("./17384.js");
var v = require("./14371.js");
var y = require("./64758.js");
var b = require("./77129.js");
function x(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
var w = /^layers/;
var C = /\.dataSource$/;
function S(e, t) {
  if (t) {
    return [Math.min(t[0], t[2], e[0]), Math.min(t[1], t[3], e[3]), Math.max(t[0], t[2], e[2]), Math.max(t[1], t[3], e[1])];
  } else {
    return e;
  }
}
var k = p.default.inherit({
  _eventsMap: {
    onClick: {
      name: "click"
    },
    onCenterChanged: {
      name: "centerChanged"
    },
    onZoomFactorChanged: {
      name: "zoomFactorChanged"
    },
    onHoverChanged: {
      name: "hoverChanged"
    },
    onSelectionChanged: {
      name: "selectionChanged"
    }
  },
  _rootClassPrefix: "dxm",
  _rootClass: "dxm-vector-map",
  _themeSection: "map",
  _fontFields: ["layer:area.label.font", "layer:marker:dot.label.font", "layer:marker:bubble.label.font", "layer:marker:pie.label.font", "layer:marker:image.label.font", "legend.font", "legend.title.font", "legend.title.subtitle.font"],
  _initLayerCollection: function (e) {
    var t = this;
    t._layerCollection = new c.MapLayerCollection({
      renderer: t._renderer,
      projection: t._projection,
      themeManager: t._themeManager,
      tracker: t._tracker,
      dataKey: e,
      eventTrigger: t._eventTrigger,
      dataExchanger: t._dataExchanger,
      tooltip: t._tooltip,
      notifyDirty: t._notifyDirty,
      notifyReady: t._notifyReady,
      dataReady: function () {
        var e;
        if (t.option("getBoundsFromData") && !t.option("bounds")) {
          t._preventProjectionEvents();
          e = t._getBoundsFromData();
          t._projection.setBounds(e);
          t._allowProjectionEvents();
        }
        if (!t.option("projection") && (e = e || t._getBoundsFromData(), Math.ceil(e[0]) < -180 || Math.ceil(e[3]) < -90 || Math.floor(e[2]) > 180 || Math.floor(e[1]) > 90)) {
          var n = e[2] - e[0];
          var i = e[1] - e[3];
          t._projection.setEngine({
            to: function (t) {
              return [(t[0] - e[0]) * 2 / n - 1, (t[1] - e[3]) * 2 / i - 1];
            },
            from: function (t) {
              return [(t[0] + 1) * n / 2 + e[0], (t[1] + 1) * i / 2 + e[3]];
            }
          });
        }
      }
    });
  },
  _getBoundsFromData: function () {
    var e = this._getBoundingBoxFromDataSource();
    if (!e) {
      var t = (0, c.getMaxBound)(this.getLayers().map(function (e) {
        return e.getBounds();
      }));
      if (t) {
        e = t;
      }
    }
    return e = [(e = e || [])[0], e[3], e[2], e[1]];
  },
  _initLegendsControl: function () {
    this._legendsControl = new u.LegendsControl({
      renderer: this._renderer,
      container: this._root,
      widget: this,
      layoutControl: this._layoutControl,
      themeManager: this._themeManager,
      dataExchanger: this._dataExchanger,
      notifyDirty: this._notifyDirty,
      notifyReady: this._notifyReady
    });
  },
  _initControlBar: function (e) {
    this._controlBar = new a.ControlBar({
      renderer: this._renderer,
      container: this._root,
      layoutControl: this._layoutControl,
      projection: this._projection,
      tracker: this._tracker,
      dataKey: e
    });
  },
  _initElements: function () {
    var e;
    var t = this;
    var n = (0, f.generateDataKey)();
    var i = 0;
    t._preventProjectionEvents = function () {
      e = true;
    };
    t._allowProjectionEvents = function () {
      e = false;
    };
    t._notifyDirty = function () {
      t._resetIsReady();
      ++i;
    };
    t._notifyReady = function () {
      t._allowProjectionEvents();
      if (--i == 0) {
        t._drawn();
      }
    };
    t._preventProjectionEvents();
    t._dataExchanger = new l.DataExchanger();
    t._projection = new o.Projection({
      centerChanged: function (n) {
        if (!e) {
          t._eventTrigger("centerChanged", {
            center: n
          });
        }
      },
      zoomChanged: function (n) {
        if (!e) {
          t._eventTrigger("zoomFactorChanged", {
            zoomFactor: n
          });
        }
      }
    });
    t._tracker = new s.Tracker({
      root: t._root,
      projection: t._projection,
      dataKey: n
    });
    t._gestureHandler = new r.GestureHandler({
      projection: t._projection,
      renderer: t._renderer,
      tracker: t._tracker
    });
    t._layoutControl = new d.LayoutControl(t);
    t._layoutControl.suspend();
    t._initLayerCollection(n);
    t._createHtmlStructure();
    t._initControlBar(n);
    t._initLegendsControl();
    t._prepareExtraElements();
    t._tooltipViewer = new h.TooltipViewer({
      tracker: t._tracker,
      tooltip: t._tooltip,
      layerCollection: t._layerCollection
    });
  },
  _change_RESUME_LAYOUT: function () {
    this._layoutControl.resume();
  },
  _initialChanges: ["PROJECTION", "RESUME_LAYOUT", "LAYOUT_INIT", "BOUNDS", "MAX_ZOOM_FACTOR", "ZOOM_FACTOR", "CENTER"],
  _layoutChangesOrder: ["RESUME_LAYOUT", "LAYERS"],
  _customChangesOrder: ["EXTRA_ELEMENTS"],
  _initCore: function () {
    this._root = this._renderer.root.attr({
      align: "center",
      cursor: "default"
    });
    this._initElements();
  },
  _disposeCore: function () {
    this._controlBar.dispose();
    this._gestureHandler.dispose();
    this._tracker.dispose();
    this._legendsControl.dispose();
    this._layerCollection.dispose();
    this._layoutControl.dispose();
    this._tooltipViewer.dispose();
    this._dataExchanger.dispose();
    this._projection.dispose();
    this._dataExchanger = this._gestureHandler = this._projection = this._tracker = this._layoutControl = this._root = this._layerCollection = this._controlBar = this._legendsControl = null;
  },
  _setupInteraction: function () {
    var e = {
      centeringEnabled: !!(0, i.parseScalar)(this._getOption("panningEnabled", true), true),
      zoomingEnabled: !!(0, i.parseScalar)(this._getOption("zoomingEnabled", true), true)
    };
    this._gestureHandler.setInteraction(e);
    this._controlBar.setInteraction(e);
  },
  _getDefaultSize: function () {
    return {
      width: 800,
      height: 400
    };
  },
  _applySize: function (e) {
    var t = {
      left: e[0],
      top: e[1],
      width: e[2] - e[0],
      height: e[3] - e[1],
      right: 0,
      bottom: 0
    };
    this._projection.setSize(t);
    this._layoutControl.setSize(t);
    this._layerCollection.setRect([t.left, t.top, t.width, t.height]);
    this._requestChange(["EXTRA_ELEMENTS"]);
  },
  _optionChanging: function (e, t, n) {
    if (t && n && w.test(e)) {
      if (t.dataSource && n.dataSource && t !== n) {
        t.dataSource = null;
      } else if (C.test(e)) {
        this.option(e, null);
      }
    }
  },
  _applyChanges: function () {
    this._notifyDirty();
    this.callBase.apply(this, arguments);
    this._notifyReady();
  },
  _optionChangesMap: {
    background: "BACKGROUND",
    layers: "LAYERS",
    extraElements: "EXTRA_ELEMENTS",
    controlBar: "CONTROL_BAR",
    legends: "LEGENDS",
    touchEnabled: "TRACKER",
    wheelEnabled: "TRACKER",
    panningEnabled: "INTERACTION",
    zoomingEnabled: "INTERACTION",
    projection: "PROJECTION",
    bounds: "BOUNDS",
    maxZoomFactor: "MAX_ZOOM_FACTOR",
    zoomFactor: "ZOOM_FACTOR",
    center: "CENTER"
  },
  _optionChangesOrder: ["PROJECTION", "BOUNDS", "MAX_ZOOM_FACTOR", "ZOOM_FACTOR", "CENTER", "BACKGROUND", "CONTROL_BAR", "LEGENDS", "TRACKER", "INTERACTION"],
  _change_PROJECTION: function () {
    this._setProjection();
  },
  _change_BOUNDS: function () {
    this._setBounds();
  },
  _change_MAX_ZOOM_FACTOR: function () {
    this._setMaxZoom();
  },
  _change_ZOOM_FACTOR: function () {
    this._setZoom();
  },
  _change_CENTER: function () {
    this._setCenter();
  },
  _change_BACKGROUND: function () {
    this._setBackgroundOptions();
  },
  _change_LAYERS: function () {
    this._setLayerCollectionOptions();
  },
  _change_CONTROL_BAR: function () {
    this._setControlBarOptions();
  },
  _change_EXTRA_ELEMENTS: function () {
    this._renderExtraElements();
  },
  _change_LEGENDS: function () {
    this._setLegendsOptions();
  },
  _change_TRACKER: function () {
    this._setTrackerOptions();
  },
  _change_INTERACTION: function () {
    this._setupInteraction();
  },
  _themeDependentChanges: ["BACKGROUND", "LAYERS", "CONTROL_BAR", "LEGENDS", "TRACKER", "INTERACTION"],
  _setProjection: function () {
    this._projection.setEngine(this.option("projection"));
  },
  _setBounds: function () {
    this._projection.setBounds(this.option("bounds"));
  },
  _setMaxZoom: function () {
    this._projection.setMaxZoom(this.option("maxZoomFactor"));
  },
  _setZoom: function () {
    this._projection.setZoom(this.option("zoomFactor"));
  },
  _setCenter: function () {
    this._projection.setCenter(this.option("center"));
  },
  _setBackgroundOptions: function () {
    this._layerCollection.setBackgroundOptions(this._getOption("background"));
  },
  _setLayerCollectionOptions: function () {
    this._layerCollection.setOptions(this.option("layers"));
  },
  _getBoundingBoxFromDataSource: function () {
    var e = this._layerCollection.items();
    var t = [Infinity, -Infinity, -Infinity, Infinity];
    var n = e && e.length ? e.reduce(function (e, t) {
      var n = t.getData();
      var i = n.count();
      if (i > 0) {
        var o = n.getBBox();
        if (o) {
          e = S(e, o);
        } else {
          for (var a = 0; a < i; a++) {
            e = S(e, n.getBBox(a));
          }
        }
      }
      return e;
    }, t) : undefined;
    if (n === t) {
      return undefined;
    } else {
      return n;
    }
  },
  _setControlBarOptions: function () {
    this._controlBar.setOptions(this._getOption("controlBar"));
  },
  _setLegendsOptions: function () {
    this._legendsControl.setOptions(this.option("legends"));
  },
  _setTrackerOptions: function () {
    this._tracker.setOptions({
      touchEnabled: this._getOption("touchEnabled", true),
      wheelEnabled: this._getOption("wheelEnabled", true)
    });
  },
  getLayers: function () {
    return this._layerCollection.items().map(function (e) {
      return e.proxy;
    });
  },
  getLayerByIndex: function (e) {
    var t = this._layerCollection.byIndex(e);
    if (t) {
      return t.proxy;
    } else {
      return null;
    }
  },
  getLayerByName: function (e) {
    var t = this._layerCollection.byName(e);
    if (t) {
      return t.proxy;
    } else {
      return null;
    }
  },
  clearSelection: function (e) {
    var t;
    var n = this._layerCollection.items();
    var i = n.length;
    for (t = 0; t < i; ++t) {
      n[t].clearSelection(e);
    }
    return this;
  },
  center: function (e) {
    if (e === undefined) {
      return this._projection.getCenter();
    } else {
      this._projection.setCenter(e);
      return this;
    }
  },
  zoomFactor: function (e) {
    if (e === undefined) {
      return this._projection.getZoom();
    } else {
      this._projection.setZoom(e);
      return this;
    }
  },
  viewport: function (e) {
    if (e === undefined) {
      return this._projection.getViewport();
    } else {
      this._projection.setViewport(e);
      return this;
    }
  },
  convertCoordinates: function (e) {
    e = e && e.length ? e : [arguments[0], arguments[1]];
    return this.convertToGeo(e[0], e[1]);
  },
  convertToGeo: function (e, t) {
    return this._projection.fromScreenPoint([e, t]);
  },
  convertToXY: function (e, t) {
    return this._projection.toScreenPoint([e, t]);
  }
});
(0, g.default)("dxVectorMap", k);
var D = k;
exports.default = D;
k.addPlugin(m.plugin);
k.addPlugin(_.plugin);
k.addPlugin(v.plugin);
k.addPlugin(y.plugin);
k.addPlugin(b.plugins.core);
k.addPlugin(b.plugins.vectorMap);
module.exports = exports.default;
module.exports.default = exports.default;