exports.default = undefined;
var i = require("./68074.js");
var o = c(require("./89482.js"));
var a = c(require("./2356.js"));
var r = require("./20576.js");
var s = c(require("./59063.js"));
var l = c(require("./99393.js"));
var u = c(require("./65700.js"));
var d = require("./1539.js");
function c(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
function h(e) {
  return {
    fill: e.fill,
    hatching: e.hatching
  };
}
(0, i.addAlgorithm)("dynamicslope", o.default, true);
(0, i.addAlgorithm)("dynamicheight", a.default);
var f = s.default.inherit({
  _rootClass: "dxf-funnel",
  _rootClassPrefix: "dxf",
  _proxyData: [],
  _optionChangesMap: {
    dataSource: "DATA_SOURCE",
    neckWidth: "NODES_CREATE",
    neckHeight: "NODES_CREATE",
    inverted: "NODES_CREATE",
    algorithm: "NODES_CREATE",
    item: "NODES_CREATE",
    valueField: "NODES_CREATE",
    argumentField: "NODES_CREATE",
    colorField: "NODES_CREATE",
    palette: "NODES_CREATE",
    paletteExtensionMode: "NODES_CREATE",
    sortData: "NODES_CREATE"
  },
  _themeDependentChanges: ["NODES_CREATE"],
  _getDefaultSize: function () {
    return {
      width: 400,
      height: 400
    };
  },
  _themeSection: "funnel",
  _fontFields: ["legend.title.font", "legend.title.subtitle.font", "legend.font"],
  _optionChangesOrder: ["DATA_SOURCE"],
  _initialChanges: ["DATA_SOURCE"],
  _initCore: function () {
    this._group = this._renderer.g().append(this._renderer.root);
    this._items = [];
  },
  _eventsMap: {
    onHoverChanged: {
      name: "hoverChanged"
    },
    onSelectionChanged: {
      name: "selectionChanged"
    }
  },
  _disposeCore: r.noop,
  _applySize: function (e) {
    this._rect = e.slice();
    this._change(["TILING"]);
    return this._rect;
  },
  _getAlignmentRect: function () {
    return this._rect;
  },
  _change_TILING: function () {
    var e = this;
    var t = e._items;
    var n = e._rect;
    function i(e, t) {
      var i = t % 2;
      return n[0 + i] + (n[2 + i] - n[0 + i]) * e;
    }
    this._group.clear();
    t.forEach(function (t, n) {
      var o = t.figure.map(i);
      var a = e._renderer.path([], "area").attr({
        points: o
      }).append(e._group);
      t.coords = o;
      t.element = a;
    });
    this._requestChange(["TILES"]);
  },
  _customChangesOrder: ["NODES_CREATE", "LAYOUT", "TILING", "TILES", "DRAWN"],
  _dataSourceChangedHandler: function () {
    this._requestChange(["NODES_CREATE"]);
  },
  _change_DRAWN: function () {
    this._drawn();
  },
  _change_DATA_SOURCE: function () {
    this._change(["DRAWN"]);
    this._updateDataSource();
  },
  _change_NODES_CREATE: function () {
    this._buildNodes();
  },
  _change_TILES: function () {
    this._applyTilesAppearance();
  },
  _suspend: function () {
    if (!this._applyingChanges) {
      this._suspendChanges();
    }
  },
  _resume: function () {
    if (!this._applyingChanges) {
      this._resumeChanges();
    }
  },
  _applyTilesAppearance: function () {
    this._items.forEach(function (e) {
      var t = e.getState();
      e.element.smartAttr(e.states[t]);
    });
  },
  _hitTestTargets: function (e, t) {
    var n;
    var i = this;
    this._proxyData.some(function (o) {
      if (n = o.call(i, e, t)) {
        return true;
      }
    });
    return n;
  },
  clearHover: function () {
    this._suspend();
    this._items.forEach(function (e) {
      if (e.isHovered()) {
        e.hover(false);
      }
    });
    this._resume();
  },
  clearSelection: function () {
    this._suspend();
    this._items.forEach(function (e) {
      if (e.isSelected()) {
        e.select(false);
      }
    });
    this._resume();
  },
  _getData: function () {
    var e = this._dataSourceItems() || [];
    var t = this._getOption("valueField", true);
    var n = this._getOption("argumentField", true);
    var i = this._getOption("colorField", true);
    var o = e.reduce(function (e, o) {
      var a = Number(o[t]);
      if (a >= 0) {
        e[0].push({
          value: a,
          color: o[i],
          argument: o[n],
          dataItem: o
        });
        e[1] += a;
      }
      return e;
    }, [[], 0]);
    var a = o[0];
    if (e.length > 0 && a.length === 0) {
      this._incidentOccurred("E2005", t);
    }
    if (o[1]) {
      if (this._getOption("sortData", true)) {
        a.sort(function (e, t) {
          return t.value - e.value;
        });
      }
      return a;
    } else {
      return [];
    }
  },
  _buildNodes: function () {
    var e = this;
    var t = e._getData();
    var n = (0, i.getAlgorithm)(e._getOption("algorithm", true));
    var o = n.normalizeValues(t);
    var a = e._getOption("item");
    var r = n.getFigures(o, e._getOption("neckWidth", true), e._getOption("neckHeight", true));
    var s = e._themeManager.createPalette(e._getOption("palette", true), {
      useHighlight: true,
      extensionMode: e._getOption("paletteExtensionMode", true),
      count: r.length
    });
    e._items = r.map(function (n, i) {
      var r = t[i];
      return new u.default(e, {
        figure: n,
        data: r,
        percent: o[i],
        id: i,
        color: r.color || s.getNextColor(),
        itemOptions: a
      });
    });
    if (e._getOption("inverted", true)) {
      e._items.forEach(function (e) {
        e.figure = e.figure.map(function (e, t) {
          if (t % 2) {
            return 1 - e;
          } else {
            return e;
          }
        });
      });
    }
    e._renderer.initDefsElements();
    e._change(["TILING", "DRAWN"]);
  },
  _showTooltip: r.noop,
  hideTooltip: r.noop,
  getAllItems: function () {
    return this._items.slice();
  },
  _getLegendData: function () {
    return this._items.map(function (e) {
      var t = e.states;
      return {
        id: e.id,
        visible: true,
        text: e.argument,
        item: e,
        states: {
          normal: h(t.normal),
          hover: h(t.hover),
          selection: h(t.selection)
        }
      };
    });
  },
  _getMinSize: function () {
    var e = this._getOption("adaptiveLayout");
    return [e.width, e.height];
  }
});
(0, l.default)("dxFunnel", f);
var p = f;
exports.default = p;
f.addPlugin(d.plugin);
module.exports = exports.default;
module.exports.default = exports.default;