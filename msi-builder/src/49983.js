exports.default = undefined;
var i = require("./77707.js");
var o = h(require("./21168.js"));
var a = require("./60642.js");
var r = require("./19910.js");
var s = require("./19157.js");
var l = require("./20576.js");
var u = h(require("./59063.js"));
require("./46576.js");
require("./66831.js");
var d = h(require("./99393.js"));
var c = require("./1539.js");
function h(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
var f = Math.max;
var p = {
  lefttoprightbottom: [1, 1],
  leftbottomrighttop: [1, -1],
  righttopleftbottom: [-1, 1],
  rightbottomlefttop: [-1, -1]
};
function g(e) {
  if (e > 0) {
    return Math.round(e);
  } else {
    return 0;
  }
}
(0, a.setDefaultAlgorithm)("squarified");
(0, r.setDefaultColorizer)("discrete");
var m = u.default.inherit({
  _handlers: {
    beginBuildNodes: l.noop,
    buildNode: l.noop,
    endBuildNodes: l.noop,
    setTrackerData: l.noop,
    calculateState: function (e) {
      return (0, i.buildRectAppearance)(e);
    }
  },
  _rootClass: "dxtm-tree-map",
  _rootClassPrefix: "dxtm",
  _getDefaultSize: function () {
    return {
      width: 400,
      height: 400
    };
  },
  _themeSection: "treeMap",
  _fontFields: ["tile.label.font", "group.label.font"],
  _init: function () {
    var e = this;
    e._rectOffsets = {};
    e._handlers = Object.create(e._handlers);
    e._context = {
      suspend: function () {
        if (!e._applyingChanges) {
          e._suspendChanges();
        }
      },
      resume: function () {
        if (!e._applyingChanges) {
          e._resumeChanges();
        }
      },
      change: function (t) {
        e._change(t);
      },
      settings: [{}, {}],
      calculateState: e._handlers.calculateState,
      calculateLabelState: i.buildTextAppearance
    };
    e._root = e._topNode = {
      nodes: []
    };
    e.callBase.apply(e, arguments);
  },
  _initialChanges: ["DATA_SOURCE"],
  _initCore: function () {
    var e = this._renderer;
    this._createProxyType();
    this._tilesGroup = e.g().linkOn(e.root, "tiles").linkAppend();
    this._labelsGroup = e.g().linkOn(e.root, "labels").linkAppend();
  },
  _createProxyType: l.noop,
  _disposeCore: function () {
    if (this._filter) {
      this._filter.dispose();
    }
    this._labelsGroup.linkOff();
    this._tilesGroup.linkOff();
  },
  _applySize: function (e) {
    this._tilingRect = e.slice();
    this._change(["TILING"]);
  },
  _optionChangesMap: {
    dataSource: "DATA_SOURCE",
    valueField: "NODES_CREATE",
    childrenField: "NODES_CREATE",
    colorField: "TILES",
    colorizer: "TILES",
    labelField: "LABELS",
    tile: "TILE_SETTINGS",
    group: "GROUP_SETTINGS",
    maxDepth: "MAX_DEPTH",
    layoutAlgorithm: "TILING",
    layoutDirection: "TILING"
  },
  _themeDependentChanges: ["TILE_SETTINGS", "GROUP_SETTINGS", "MAX_DEPTH"],
  _changeDataSource: function () {
    this._isDataExpected = this._isSyncData = true;
    this._updateDataSource();
    this._isSyncData = false;
    if (this._isDataExpected) {
      this._suspendChanges();
    }
  },
  _dataSourceChangedHandler: function () {
    if (this._isDataExpected) {
      this._isDataExpected = false;
      this._change(["NODES_CREATE"]);
      if (!this._isSyncData) {
        this._resumeChanges();
      }
    } else {
      this._requestChange(["NODES_CREATE"]);
    }
  },
  _optionChangesOrder: ["DATA_SOURCE", "TILE_SETTINGS", "GROUP_SETTINGS", "MAX_DEPTH"],
  _change_DATA_SOURCE: function () {
    this._changeDataSource();
  },
  _change_TILE_SETTINGS: function () {
    this._changeTileSettings();
  },
  _change_GROUP_SETTINGS: function () {
    this._changeGroupSettings();
  },
  _change_MAX_DEPTH: function () {
    this._changeMaxDepth();
  },
  _customChangesOrder: ["NODES_CREATE", "NODES_RESET", "TILES", "LABELS", "TILING", "LABELS_LAYOUT"],
  _change_NODES_CREATE: function () {
    this._buildNodes();
  },
  _change_NODES_RESET: function () {
    this._resetNodes();
  },
  _change_TILES: function () {
    this._applyTilesAppearance();
  },
  _change_LABELS: function () {
    this._applyLabelsAppearance();
  },
  _change_TILING: function () {
    this._performTiling();
  },
  _change_LABELS_LAYOUT: function () {
    this._performLabelsLayout();
  },
  _applyChanges: function () {
    var e = this;
    e.callBase.apply(e, arguments);
    if (!e._isDataExpected) {
      e._drawn();
    }
    e._context.forceReset = false;
  },
  _buildNodes: function () {
    var e = this._root = this._topNode = new o.default();
    e._id = 0;
    e.parent = {};
    e.data = {};
    e.level = e.index = -1;
    e.ctx = this._context;
    e.label = null;
    this._nodes = [e];
    this._handlers.beginBuildNodes();
    var t = this._processDataSourceItems(this._dataSourceItems() || []);
    (function e(t, n, i, a) {
      var r;
      var s;
      var l;
      var u;
      var d = [];
      var c = a.nodes;
      var h = n.length;
      var f = 0;
      for (s = 0; s < h; ++s) {
        var p;
        l = n[s];
        (r = new o.default())._id = c.length;
        r.ctx = a.ctx;
        r.parent = t;
        r.level = i;
        r.index = d.length;
        r.data = l;
        a.buildNode(r);
        c.push(r);
        d.push(r);
        u = l[a.itemsField];
        if ((p = u) !== null && p !== undefined && p.length) {
          e(r, u, i + 1, a);
        }
        if (l[a.valueField] > 0) {
          r.value = Number(l[a.valueField]);
        }
        f += r.value;
      }
      t.nodes = d;
      t.value = f;
    })(e, t.items, 0, {
      itemsField: !t.isPlain && this._getOption("childrenField", true) || "items",
      valueField: this._getOption("valueField", true) || "value",
      buildNode: this._handlers.buildNode,
      ctx: this._context,
      nodes: this._nodes
    });
    this._onNodesCreated();
    this._handlers.endBuildNodes();
    this._change(["NODES_RESET"]);
  },
  _onNodesCreated: l.noop,
  _processDataSourceItems: function (e) {
    return {
      items: e,
      isPlain: false
    };
  },
  _changeTileSettings: function () {
    var e = this._getOption("tile");
    var t = this._rectOffsets;
    var n = g(e.border.width);
    var i = n / 2;
    var o = n & 1 ? 0.5 : 0;
    var a = e.label;
    var r = this._context.settings[0];
    this._change(["TILES", "LABELS"]);
    r.state = this._handlers.calculateState(e);
    this._filter = this._filter || this._renderer.shadowFilter("-50%", "-50%", "200%", "200%");
    this._filter.attr(a.shadow);
    this._calculateLabelSettings(r, a, this._filter.id);
    if (t.tileEdge !== i || t.tileInner !== o) {
      t.tileEdge = i;
      t.tileInner = o;
      this._change(["TILING"]);
    }
  },
  _changeGroupSettings: function () {
    var e = this._getOption("group");
    var t = e.label;
    var n = this._rectOffsets;
    var i = g(e.border.width);
    var o = i / 2;
    var a = i & 1 ? 0.5 : 0;
    var r = 0;
    var s = g(e.padding);
    var l = this._context.settings[1];
    this._change(["TILES", "LABELS"]);
    l.state = this._handlers.calculateState(e);
    this._calculateLabelSettings(l, t);
    r = e.headerHeight >= 0 ? g(e.headerHeight) : l.labelParams.height + g(t.paddingTopBottom) * 2;
    if (this._headerHeight !== r) {
      this._headerHeight = r;
      this._change(["TILING"]);
    }
    if (this._groupPadding !== s) {
      this._groupPadding = s;
      this._change(["TILING"]);
    }
    if (n.headerEdge !== o || n.headerInner !== a) {
      n.headerEdge = o;
      n.headerInner = a;
      this._change(["TILING"]);
    }
  },
  _calculateLabelSettings: function (e, t, n) {
    var o = this._getTextBBox(t.font);
    var a = g(t.paddingLeftRight);
    var r = g(t.paddingTopBottom);
    var s = this._getOption("tile.label");
    var l = this._getOption("group.label");
    e.labelState = (0, i.buildTextAppearance)(t, n);
    e.labelState.visible = !("visible" in t) || !!t.visible;
    e.labelParams = {
      height: o.height,
      rtlEnabled: this._getOption("rtlEnabled", true),
      paddingTopBottom: r,
      paddingLeftRight: a,
      tileLabelWordWrap: s.wordWrap,
      tileLabelOverflow: s.textOverflow,
      groupLabelOverflow: l.textOverflow
    };
  },
  _changeMaxDepth: function () {
    var e = this._getOption("maxDepth", true);
    e = e >= 1 ? Math.round(e) : Infinity;
    if (this._maxDepth !== e) {
      this._maxDepth = e;
      this._change(["NODES_RESET"]);
    }
  },
  _resetNodes: function () {
    this._tilesGroup.clear();
    this._renderer.initDefsElements();
    this._context.forceReset = true;
    this._context.minLevel = this._topNode.level + 1;
    this._context.maxLevel = this._context.minLevel + this._maxDepth - 1;
    this._change(["TILES", "LABELS", "TILING"]);
  },
  _processNodes: function (e, t) {
    (function e(t, n, i) {
      var o;
      var a;
      var r = n.nodes;
      var s = r.length;
      for (a = 0; a < s; ++a) {
        o = r[a];
        i(t, o);
        if (o.isNode()) {
          e(t, o, i);
        }
      }
    })(e, this._topNode, t);
  },
  _applyTilesAppearance: function () {
    var e = (0, r.getColorizer)(this._getOption("colorizer"), this._themeManager, this._topNode);
    this._processNodes({
      renderer: this._renderer,
      group: this._tilesGroup,
      setTrackerData: this._handlers.setTrackerData,
      colorField: this._getOption("colorField", true) || "color",
      getColor: e
    }, v);
  },
  _applyLabelsAppearance: function () {
    this._labelsGroup.clear();
    this._processNodes({
      renderer: this._renderer,
      group: this._labelsGroup,
      setTrackerData: this._handlers.setTrackerData,
      labelField: this._getOption("labelField", true) || "name"
    }, y);
    this._change(["LABELS_LAYOUT"]);
  },
  _performTiling: function () {
    var e = {
      algorithm: (0, a.getAlgorithm)(this._getOption("layoutAlgorithm", true)),
      directions: p[String(this._getOption("layoutDirection", true)).toLowerCase()] || p.lefttoprightbottom,
      headerHeight: this._headerHeight,
      groupPadding: this._groupPadding,
      rectOffsets: this._rectOffsets
    };
    this._topNode.innerRect = this._tilingRect;
    x(e, this._topNode);
    this._processNodes(e, w);
    this._change(["LABELS_LAYOUT"]);
    this._onTilingPerformed();
  },
  _onTilingPerformed: l.noop,
  _performLabelsLayout: function () {
    this._processNodes(null, D);
  },
  _getTextBBox: function (e) {
    var t = this._renderer;
    var n = this._textForCalculations || t.text("0", 0, 0);
    this._textForCalculations = n;
    n.css((0, s.patchFontOptions)(e)).append(t.root);
    var i = n.getBBox();
    n.remove();
    return i;
  }
});
var _ = [function (e, t) {
  var n = e.renderer.simpleRect().append(e.group);
  e.setTrackerData(t, n);
  return n;
}, function (e, t) {
  var n = e.renderer.simpleRect().append(e.group);
  var i = e.renderer.simpleRect().append(e.group);
  e.setTrackerData(t, i);
  return {
    outer: n,
    inner: i
  };
}];
function v(e, t) {
  t.color = t.data[e.colorField] || e.getColor(t) || t.parent.color;
  t.updateStyles();
  t.tile = !t.ctx.forceReset && t.tile || _[Number(t.isNode())](e, t);
  t.applyState();
}
function y(e, t) {
  t.updateLabelStyle();
  if (t.labelState.visible) {
    (function (e, t, n, i) {
      var o = t.data[e.labelField];
      t.label = o ? String(o) : null;
      if (o = t.customLabel || t.label) {
        t.text = e.renderer.text(o).attr(n.attr).css(n.css).append(e.group);
        e.setTrackerData(t, t.text);
      }
    })(e, t, t.labelState, t.labelParams);
  }
}
var b = [0, 0, 0, 0];
function x(e, t) {
  var n;
  var i = t.nodes;
  var o = [];
  var a = [];
  var r = 0;
  var s = o.length = a.length = i.length;
  for (n = 0; n < s; ++n) {
    r += i[n].value;
    o[n] = {
      value: i[n].value,
      i: n
    };
  }
  if (r > 0) {
    e.algorithm({
      items: o.slice(),
      sum: r,
      rect: t.innerRect.slice(),
      isRotated: i[0].level & 1,
      directions: e.directions
    });
  }
  n = 0;
  for (; n < s; ++n) {
    a[n] = o[n].rect || b;
  }
  t.rects = a;
}
function w(e, t) {
  var n;
  var i = t.parent.rects[t.index];
  var o = e.rectOffsets;
  if (t.isNode()) {
    k(t.tile.outer, S(i, t.parent.innerRect, o.headerEdge, o.headerInner));
    i = C(i, e.groupPadding);
    n = Math.min(e.headerHeight, i[3] - i[1]);
    t.rect = [i[0], i[1], i[2], i[1] + n];
    k(t.tile.inner, C(t.rect, o.headerEdge));
    i[1] += n;
    t.innerRect = i;
    x(e, t);
  } else {
    t.rect = i;
    k(t.tile, S(i, t.parent.innerRect, o.tileEdge, o.tileInner));
  }
}
function C(e, t) {
  return [e[0] + t, e[1] + t, e[2] - t, e[3] - t];
}
function S(e, t, n, i) {
  return [e[0] + (e[0] === t[0] ? n : +i), e[1] + (e[1] === t[1] ? n : +i), e[2] - (e[2] === t[2] ? n : -i), e[3] - (e[3] === t[3] ? n : -i)];
}
function k(e, t) {
  e.attr({
    x: t[0],
    y: t[1],
    width: f(t[2] - t[0], 0),
    height: f(t[3] - t[1], 0)
  });
}
function D(e, t) {
  if (t.text && t.labelState.visible) {
    (function (e, t) {
      var n = e.rect;
      var i = e.text;
      var o = i.getBBox();
      var a = t.paddingLeftRight;
      var r = t.paddingTopBottom;
      var s = n[2] - n[0] - a * 2;
      i.setMaxSize(s, n[3] - n[1] - r, e.isNode() ? {
        textOverflow: t.groupLabelOverflow,
        wordWrap: "none"
      } : {
        textOverflow: t.tileLabelOverflow,
        wordWrap: t.tileLabelWordWrap,
        hideOverflowEllipsis: true
      });
      i.move(t.rtlEnabled ? n[2] - a - o.x - o.width : n[0] + a - o.x, n[1] + r - o.y);
    })(t, t.labelParams);
  }
}
(0, d.default)("dxTreeMap", m);
var I = m;
exports.default = I;
m.addPlugin(c.plugin);
module.exports = exports.default;
module.exports.default = exports.default;