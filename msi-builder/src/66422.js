exports.default = undefined;
var i = require("./74878.js");
var o = require("./20576.js");
var a = h(require("./47248.js"));
var r = h(require("./18170.js"));
var s = require("./68856.js");
var l = require("./35922.js");
var u = h(require("./59063.js"));
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
function f(e, t, n) {
  var i = [];
  var o = n === "in" ? "_to" : "_from";
  var a = n === "in" ? "_from" : "_to";
  e.links.map(function (e) {
    return e[o]._name === t;
  }).forEach(function (t, n) {
    if (t) {
      i.push({
        index: n,
        weight: e.links[n]._weight,
        node: e.links[n][a]._name
      });
    }
  });
  return i;
}
var p = u.default.inherit({
  _rootClass: "dxs-sankey",
  _rootClassPrefix: "dxs",
  _proxyData: [],
  _optionChangesMap: {
    dataSource: "DATA_SOURCE",
    sortData: "DATA_SOURCE",
    alignment: "DATA_SOURCE",
    node: "BUILD_LAYOUT",
    link: "BUILD_LAYOUT",
    palette: "BUILD_LAYOUT",
    paletteExtensionMode: "BUILD_LAYOUT"
  },
  _themeDependentChanges: ["BUILD_LAYOUT"],
  _getDefaultSize: function () {
    return {
      width: 400,
      height: 400
    };
  },
  _themeSection: "sankey",
  _fontFields: ["label.font"],
  _optionChangesOrder: ["DATA_SOURCE"],
  _initialChanges: ["DATA_SOURCE"],
  _initCore: function () {
    this._groupLinks = this._renderer.g().append(this._renderer.root);
    this._groupNodes = this._renderer.g().append(this._renderer.root);
    this._groupLabels = this._renderer.g().attr({
      class: this._rootClassPrefix + "-labels"
    }).append(this._renderer.root);
    this._drawLabels = true;
    this._nodes = [];
    this._links = [];
    this._gradients = [];
  },
  _disposeCore: o.noop,
  _applySize: function (e) {
    this._rect = e.slice();
    var t = this._getOption("adaptiveLayout");
    if (t.keepLabels || this._rect[2] - this._rect[0] > t.width) {
      this._drawLabels = true;
    } else {
      this._drawLabels = false;
    }
    this._change(["BUILD_LAYOUT"]);
    return this._rect;
  },
  _eventsMap: {
    onNodeHoverChanged: {
      name: "nodeHoverChanged"
    },
    onLinkHoverChanged: {
      name: "linkHoverChanged"
    }
  },
  _customChangesOrder: ["BUILD_LAYOUT", "NODES_DRAW", "LINKS_DRAW", "LABELS", "DRAWN"],
  _dataSourceChangedHandler: function () {
    this._requestChange(["BUILD_LAYOUT"]);
  },
  _change_DRAWN: function () {
    this._drawn();
  },
  _change_DATA_SOURCE: function () {
    this._change(["DRAWN"]);
    this._updateDataSource();
  },
  _change_LABELS: function () {
    this._applyLabelsAppearance();
  },
  _change_BUILD_LAYOUT: function () {
    this._groupNodes.clear();
    this._groupLinks.clear();
    this._groupLabels.clear();
    this._buildLayout();
  },
  _change_NODES_DRAW: function () {
    var e = this;
    e._nodes.forEach(function (t, n) {
      var i = e._renderer.rect().attr(t.rect).append(e._groupNodes);
      t.element = i;
    });
    this._applyNodesAppearance();
  },
  _change_LINKS_DRAW: function () {
    var e = this;
    e._links.forEach(function (t, n) {
      var i = e._renderer.g().attr({
        class: "link",
        "data-link-idx": n
      }).append(e._groupLinks);
      t.overlayElement = e._renderer.path([], "area").attr({
        d: t.d
      }).append(i);
      t.element = e._renderer.path([], "area").attr({
        d: t.d
      }).append(i);
    });
    this._applyLinksAppearance();
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
  _showTooltip: o.noop,
  hideTooltip: o.noop,
  clearHover: function () {
    this._suspend();
    this._nodes.forEach(function (e) {
      if (e.isHovered()) {
        e.hover(false);
      }
    });
    this._links.forEach(function (e) {
      if (e.isHovered()) {
        e.hover(false);
      }
      if (e.isAdjacentNodeHovered()) {
        e.adjacentNodeHover(false);
      }
    });
    this._resume();
  },
  _applyNodesAppearance: function () {
    this._nodes.forEach(function (e) {
      var t = e.getState();
      e.element.smartAttr(e.states[t]);
    });
  },
  _applyLinksAppearance: function () {
    this._links.forEach(function (e) {
      var t = e.getState();
      e.element.smartAttr(e.states[t]);
      e.overlayElement.smartAttr(e.overlayStates[t]);
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
  _getData: function () {
    var e = this;
    var t = e._dataSourceItems() || [];
    var n = e._getOption("sourceField", true);
    var i = e._getOption("targetField", true);
    var o = e._getOption("weightField", true);
    var a = [];
    t.forEach(function (t) {
      var r = Object.prototype.hasOwnProperty.bind(t);
      if (r(n)) {
        if (r(i)) {
          if (r(o)) {
            if ((0, l.isString)(t[n])) {
              if ((0, l.isString)(t[i])) {
                if (!(0, l.isNumeric)(t[o]) || t[o] <= 0) {
                  e._incidentOccurred("E2009", o);
                } else {
                  a.push([t[n], t[i], t[o]]);
                }
              } else {
                e._incidentOccurred("E2008", i);
              }
            } else {
              e._incidentOccurred("E2008", n);
            }
          } else {
            e._incidentOccurred("E2007", o);
          }
        } else {
          e._incidentOccurred("E2007", i);
        }
      } else {
        e._incidentOccurred("E2007", n);
      }
    });
    return a;
  },
  _buildLayout: function () {
    var e = this;
    var t = this;
    var n = t._getData();
    var o = this._rect;
    var l = t._getOption("node");
    var u = t._getOption("sortData");
    var d = t._getOption("layoutBuilder", true) || s.layout;
    var c = {
      x: o[0],
      y: o[1],
      width: o[2] - o[0],
      height: o[3] - o[1]
    };
    var h = d.computeLayout(n, u, {
      availableRect: c,
      nodePadding: l.padding,
      nodeWidth: l.width,
      nodeAlign: t._getOption("alignment", true)
    }, t._incidentOccurred);
    t._layoutMap = h;
    if (!Object.prototype.hasOwnProperty.call(h, "error")) {
      var p = {};
      var g = 0;
      var m = t._getOption("link");
      var _ = h.nodes.map(function (e) {
        return e.length;
      }).reduce(function (e, t) {
        return e + t;
      }, 0);
      var v = t._themeManager.createPalette(t._getOption("palette", true), {
        useHighlight: true,
        extensionMode: t._getOption("paletteExtensionMode", true),
        count: _
      });
      t._nodes = [];
      t._links = [];
      t._gradients.forEach(function (e) {
        e.dispose();
      });
      t._gradients = [];
      if (t._shadowFilter) {
        t._shadowFilter.dispose();
      }
      h.nodes.forEach(function (e) {
        e.forEach(function (e) {
          var n = l.color || v.getNextColor();
          var i = new a.default(t, {
            id: g,
            color: n,
            rect: e,
            options: l,
            linksIn: f(h, e._name, "in"),
            linksOut: f(h, e._name, "out")
          });
          t._nodes.push(i);
          g++;
          p[e._name] = n;
        });
      });
      h.links.forEach(function (n) {
        var o = null;
        if (m.colorMode === i.COLOR_MODE_GRADIENT) {
          o = t._renderer.linearGradient([{
            offset: "0%",
            "stop-color": p[n._from._name]
          }, {
            offset: "100%",
            "stop-color": p[n._to._name]
          }]);
          e._gradients.push(o);
        }
        var a = m.color;
        if (m.colorMode === i.COLOR_MODE_SOURCE) {
          a = p[n._from._name];
        } else if (m.colorMode === i.COLOR_MODE_TARGET) {
          a = p[n._to._name];
        }
        var s = new r.default(t, {
          d: n.d,
          boundingRect: n._boundingRect,
          color: a,
          options: m,
          connection: {
            source: n._from._name,
            target: n._to._name,
            weight: n._weight
          },
          gradient: o
        });
        t._links.push(s);
      });
      t._renderer.initDefsElements();
      t._change(["NODES_DRAW", "LINKS_DRAW", "LABELS"]);
    }
    t._change(["DRAWN"]);
  },
  _applyLabelsAppearance: function () {
    var e = this;
    var t = e._getOption("label");
    var n = e._rect[2] - e._rect[0];
    var i = e._getOption("node");
    e._shadowFilter = e._renderer.shadowFilter("-50%", "-50%", "200%", "200%").attr(t.shadow);
    e._groupLabels.clear();
    if (e._drawLabels && t.visible) {
      var o = (n - (i.width + t.horizontalOffset) - e._layoutMap.cascades.length * i.width) / (e._layoutMap.cascades.length - 1) - t.horizontalOffset;
      e._nodes.forEach(function (n) {
        e._createLabel(n, t, e._shadowFilter.id);
        (function (e, t, n, i) {
          if (e._label.getBBox().width > n) {
            e.labelText.applyEllipsis(n);
          }
          var o = e._label.getBBox();
          var a = t.verticalOffset;
          var r = t.horizontalOffset;
          var s = Math.round(e.rect.y + e.rect.height / 2 - o.y - o.height / 2) + a;
          var l = e.rect.x + r + e.rect.width - o.x;
          if (l + o.width >= i[2] - i[0]) {
            l = e.rect.x - r - o.x - o.width;
          }
          if (s >= i[3]) {
            s = i[3];
          }
          if (s - o.height < i[1]) {
            s = e.rect.y - o.y + a;
          }
          e.labelText.attr({
            translateX: l,
            translateY: s
          });
        })(n, t, o, e._rect);
      });
      if (t.overlappingBehavior !== "none") {
        e._nodes.forEach(function (n) {
          var i = n._label.getBBox();
          e._nodes.forEach(function (e) {
            var o = e._label.getBBox();
            if (n.id !== e.id && s.layout.overlap(i, o)) {
              if (t.overlappingBehavior === "ellipsis") {
                n.labelText.applyEllipsis(o.x - i.x);
              } else if (t.overlappingBehavior === "hide") {
                n.labelText.remove();
              }
            }
          });
        });
      }
    }
  },
  _createLabel: function (e, t, n) {
    var i = t.customizeText(e);
    var o = e.getLabelAttributes(t, n);
    if (i) {
      e._label = this._renderer.g().append(this._groupLabels);
      e.labelText = this._renderer.text(i).attr(o.attr).css(o.css);
      e.labelText.append(e._label);
    }
  },
  _getMinSize: function () {
    var e = this._getOption("adaptiveLayout");
    return [e.width, e.height];
  },
  getAllNodes: function () {
    return this._nodes.slice();
  },
  getAllLinks: function () {
    return this._links.slice();
  }
});
(0, d.default)("dxSankey", p);
var g = p;
exports.default = g;
p.addPlugin(c.plugin);
module.exports = exports.default;
module.exports.default = exports.default;