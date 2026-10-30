exports.AdvancedChart = undefined;
var i;
var o = require("./13306.js");
var a = require("./95479.js");
var r = require("./21177.js");
var s = require("./41278.js");
var l = require("./1939.js");
var u = require("./33224.js");
var d = (i = require("./63407.js")) && i.__esModule ? i : {
  default: i
};
var c = require("./35922.js");
var h = require("./20576.js");
var f = require("./19157.js");
function p(e) {
  return (p = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function (e) {
    return typeof e;
  } : function (e) {
    if (e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype) {
      return "symbol";
    } else {
      return typeof e;
    }
  })(e);
}
function g() {
  return (g = Object.assign ? Object.assign.bind() : function (e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var i in n) {
        if (Object.prototype.hasOwnProperty.call(n, i)) {
          e[i] = n[i];
        }
      }
    }
    return e;
  }).apply(this, arguments);
}
function m(e, t, n) {
  if ((t = function (e) {
    var t = function (e, t) {
      if (p(e) !== "object" || e === null) {
        return e;
      }
      var n = e[Symbol.toPrimitive];
      if (n !== undefined) {
        var i = n.call(e, t || "default");
        if (p(i) !== "object") {
          return i;
        }
        throw new TypeError("@@toPrimitive must return a primitive value.");
      }
      return (t === "string" ? String : Number)(e);
    }(e, "string");
    if (p(t) === "symbol") {
      return t;
    } else {
      return String(t);
    }
  }(t)) in e) {
    Object.defineProperty(e, t, {
      value: n,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    e[t] = n;
  }
  return e;
}
var _ = Array.isArray;
function v(e) {
  if (_(e)) {
    if (e.length === 0) {
      return [{}];
    } else {
      return e;
    }
  } else {
    return [e];
  }
}
function y(e, t, n, i) {
  var o;
  var a;
  if (n) {
    a = e.value;
    o = {
      skipEventRising: true
    };
    var r = b(e.fullName, a);
    if (r) {
      o = {
        allowPartialUpdate: true
      };
      a = r;
    }
  } else {
    a = ((0, c.isDefined)(i) ? e.value[i] : e.value).visualRange;
  }
  t.visualRange(a, o);
}
function b(e, t) {
  var n = e.split(".");
  var i = n[n.length - 1];
  if (i === "endValue" || i === "startValue") {
    return m({}, i, t);
  }
}
var x = u.BaseChart.inherit({
  _fontFields: ["commonAxisSettings.label.font", "commonAxisSettings.title.font"],
  _partialOptionChangesMap: {
    visualRange: "VISUAL_RANGE",
    _customVisualRange: "VISUAL_RANGE",
    strips: "REFRESH_AXES",
    constantLines: "REFRESH_AXES"
  },
  _partialOptionChangesPath: {
    argumentAxis: ["strips", "constantLines", "visualRange", "_customVisualRange"],
    valueAxis: ["strips", "constantLines", "visualRange", "_customVisualRange"]
  },
  _initCore: function () {
    this._panesClipRects = {};
    this.callBase();
  },
  _disposeCore: function () {
    var e = this._disposeObjectsInArray;
    var t = this._panesClipRects;
    this.callBase();
    e.call(t, "fixed");
    e.call(t, "base");
    e.call(t, "wide");
    this._panesClipRects = null;
    this._labelsAxesGroup.linkOff();
    this._labelsAxesGroup.dispose();
    this._labelsAxesGroup = null;
  },
  _dispose: function () {
    var e = this._disposeObjectsInArray;
    this.callBase();
    this.panes = null;
    if (this._legend) {
      this._legend.dispose();
      this._legend = null;
    }
    e.call(this, "panesBackground");
    e.call(this, "seriesFamilies");
    this._disposeAxes();
  },
  _createPanes: function () {
    this._cleanPanesClipRects("fixed");
    this._cleanPanesClipRects("base");
    this._cleanPanesClipRects("wide");
  },
  _cleanPanesClipRects: function (e) {
    (this._panesClipRects[e] || []).forEach(function (e) {
      return e && e.dispose();
    });
    this._panesClipRects[e] = [];
  },
  _getElementsClipRectID: function (e) {
    var t = this._panesClipRects.fixed[this._getPaneIndex(e)];
    return t && t.id;
  },
  _getPaneIndex: function (e) {
    var t;
    var n = e || "default";
    (0, a.each)(this.panes, function (e, i) {
      if (i.name === n) {
        t = e;
        return false;
      }
    });
    return t;
  },
  _updateSize: function () {
    this.callBase();
    (0, f.setCanvasValues)(this._canvas);
  },
  _reinitAxes: function () {
    this.panes = this._createPanes();
    this._populateAxes();
    this._axesReinitialized = true;
  },
  _populateAxes: function () {
    var e;
    var t;
    var n = this;
    var i = n.panes;
    var o = n._isRotated();
    var r = v(n.option("argumentAxis") || {})[0];
    var s = n.option("valueAxis");
    var l = v(s || {});
    var u = [];
    var d = [];
    var c = 0;
    var h = n._getCrosshairMargins();
    t = o ? r.position === "right" ? i[i.length - 1].name : i[0].name : r.position === "top" ? i[0].name : i[i.length - 1].name;
    e = (0, f.map)(i, function (e) {
      var i = e.name !== t;
      return n._populateAxesOptions("argumentAxis", r, {
        pane: e.name,
        name: null,
        optionPath: "argumentAxis",
        crosshairMargin: o ? h.x : h.y
      }, o, i);
    });
    (0, a.each)(l, function (e, t) {
      var i;
      var r = [];
      var l = t.name;
      if (l && d.includes(l)) {
        n._incidentOccurred("E2102");
      } else {
        if (l) {
          d.push(l);
        }
        if (t.pane) {
          r.push(t.pane);
        }
        if ((i = t.panes) !== null && i !== undefined && i.length) {
          r = r.concat(t.panes.slice(0));
        }
        if (!(r = (0, f.unique)(r)).length) {
          r.push(undefined);
        }
        (0, a.each)(r, function (i, a) {
          var r = _(s) ? `valueAxis[${e}]` : "valueAxis";
          u.push(n._populateAxesOptions("valueAxis", t, {
            name: l || "defaultAxisName" + c++,
            pane: a,
            priority: e,
            optionPath: r,
            crosshairMargin: o ? h.y : h.x
          }, o));
        });
      }
    });
    n._redesignAxes(e, true, t);
    n._redesignAxes(u, false);
  },
  _redesignAxes: function (e, t, n) {
    var i = this;
    var o = [];
    var r = t ? i._argumentAxes : i._valueAxes;
    (0, a.each)(e, function (e, n) {
      var s = r && r.filter(function (e) {
        return e.name === n.name && (!(0, c.isDefined)(n.pane) && i.panes.some(function (t) {
          return t.name === e.pane;
        }) || e.pane === n.pane);
      });
      if (s && s.length > 0) {
        (0, a.each)(s, function (e, a) {
          var r = function (e, t, n) {
            if (n) {
              return {
                argumentAxisType: e.argumentAxisType,
                argumentType: e.argumentType
              };
            }
            var i = e.groups.filter(function (e) {
              return e.valueAxis === t;
            })[0];
            return {
              valueAxisType: i.valueAxisType,
              valueType: i.valueType
            };
          }(i._groupsData, a, t);
          a.updateOptions(n);
          if (t) {
            a.setTypes(r.argumentAxisType, r.argumentType, "argumentType");
          } else {
            a.setTypes(r.valueAxisType, r.valueType, "valueType");
          }
          a.validate();
          o.push({
            axis: a
          });
        });
      } else {
        o.push({
          options: n
        });
      }
    });
    if (r) {
      (0, a.reverseEach)(r, function (e, n) {
        if (!o.some(function (e) {
          return e.axis && e.axis === n;
        })) {
          i._disposeAxis(e, t);
        }
      });
    } else {
      r = t ? i._argumentAxes = [] : i._valueAxes = [];
    }
    (0, a.each)(o, function (e, o) {
      var a = o.axis;
      if (o.axis && t) {
        o.axis.isVirtual = o.axis.pane !== n;
      } else if (o.options) {
        a = i._createAxis(t, o.options, t ? o.options.pane !== n : undefined);
        r.push(a);
      }
      a.applyVisualRangeSetter(i._getVisualRangeSetter());
    });
  },
  _disposeAxis: function (e, t) {
    var n = t ? this._argumentAxes : this._valueAxes;
    var i = n[e];
    if (i) {
      i.dispose();
      n.splice(e, 1);
    }
  },
  _disposeAxes: function () {
    var e = this._disposeObjectsInArray;
    e.call(this, "_argumentAxes");
    e.call(this, "_valueAxes");
  },
  _appendAdditionalSeriesGroups: function () {
    this._crosshairCursorGroup.linkAppend();
    if (this._scrollBar) {
      this._scrollBarGroup.linkAppend();
    }
  },
  _getLegendTargets: function () {
    var e = this;
    return (this.series || []).map(function (t) {
      var n = e._getLegendOptions(t);
      n.legendData.series = t;
      if (!t.getOptions().showInLegend) {
        n.legendData.visible = false;
      }
      return n;
    });
  },
  _legendItemTextField: "name",
  _seriesPopulatedHandlerCore: function () {
    this._processSeriesFamilies();
    this._processValueAxisFormat();
  },
  _renderTrackers: function () {
    var e;
    for (e = 0; e < this.series.length; ++e) {
      this.series[e].drawTrackers();
    }
  },
  _specialProcessSeries: function () {
    this._processSeriesFamilies();
  },
  _processSeriesFamilies: function () {
    var e;
    var t;
    var n = this;
    var i = [];
    var o = [];
    var r = n._themeManager;
    var s = r.getOptions("negativesAsZeroes");
    var u = r.getOptions("negativesAsZeros");
    var d = {
      minBubbleSize: r.getOptions("minBubbleSize"),
      maxBubbleSize: r.getOptions("maxBubbleSize"),
      barGroupPadding: r.getOptions("barGroupPadding"),
      barGroupWidth: r.getOptions("barGroupWidth"),
      negativesAsZeroes: (0, c.isDefined)(s) ? s : u
    };
    if ((e = n.seriesFamilies) !== null && e !== undefined && e.length) {
      (0, a.each)(n.seriesFamilies, function (e, t) {
        t.updateOptions(d);
        t.adjustSeriesValues();
      });
    } else {
      (0, a.each)(n.series, function (e, t) {
        if (!i.includes(t.type)) {
          i.push(t.type);
        }
      });
      (0, a.each)(n._getLayoutTargets(), function (e, r) {
        t = n._getSeriesForPane(r.name);
        (0, a.each)(i, function (e, i) {
          var a = new l.SeriesFamily({
            type: i,
            pane: r.name,
            minBubbleSize: d.minBubbleSize,
            maxBubbleSize: d.maxBubbleSize,
            barGroupPadding: d.barGroupPadding,
            barGroupWidth: d.barGroupWidth,
            negativesAsZeroes: d.negativesAsZeroes,
            rotated: n._isRotated()
          });
          a.add(t);
          a.adjustSeriesValues();
          o.push(a);
        });
      });
      n.seriesFamilies = o;
    }
  },
  _updateSeriesDimensions: function () {
    var e;
    var t = this.seriesFamilies || [];
    for (e = 0; e < t.length; e++) {
      var n = t[e];
      n.updateSeriesValues();
      n.adjustSeriesDimensions();
    }
  },
  _getLegendCallBack: function (e) {
    return this._legend && this._legend.getActionCallback(e);
  },
  _appendAxesGroups: function () {
    this._stripsGroup.linkAppend();
    this._gridGroup.linkAppend();
    this._axesGroup.linkAppend();
    this._labelsAxesGroup.linkAppend();
    this._constantLinesGroup.linkAppend();
    this._stripLabelAxesGroup.linkAppend();
    this._scaleBreaksGroup.linkAppend();
  },
  _populateMarginOptions: function () {
    var e;
    var t;
    var n;
    var i;
    var o;
    var a;
    var r = this;
    e = r.getSize();
    t = r.panes.length;
    n = r._themeManager.getOptions("maxBubbleSize");
    i = r._isRotated();
    o = i ? e.width / t : e.width;
    a = i ? e.height : e.height / t;
    var s = Math.min(o, a) * n;
    var l = {};
    r._valueAxes.forEach(function (e) {
      var t = r.series.filter(function (t) {
        return t.getValueAxis() === e;
      });
      var n = {};
      t.forEach(function (e) {
        if (e.isVisible()) {
          var t = function (e, t) {
            if (e.processBubbleSize) {
              e.size = t;
            }
            return e;
          }(e.getMarginOptions(), s);
          n = (0, f.mergeMarginOptions)(n, t);
          l = (0, f.mergeMarginOptions)(l, t);
        }
      });
      e.setMarginOptions(n);
    });
    r._argumentAxes.forEach(function (e) {
      return e.setMarginOptions(l);
    });
  },
  _populateBusinessRange: function (e, t) {
    var n = this;
    var i = n._isRotated();
    var o = n._getVisibleSeries();
    var a = {};
    var s = new r.Range({
      rotated: !!i
    });
    function l(e) {
      return e.pane || "default";
    }
    n.panes.forEach(function (e) {
      return a[e.name] = new r.Range({
        rotated: !!i
      });
    });
    n._valueAxes.forEach(function (s) {
      var u = new r.Range({
        rotated: !!i,
        pane: s.pane,
        axis: s.name
      });
      var d = o.filter(function (e) {
        return e.getValueAxis() === s;
      });
      d.forEach(function (e) {
        var t = e.getRangeData();
        u.addRange(t.val);
        a[l(s)].addRange(t.arg);
      });
      if (!e || e && d.length && s === e) {
        s.setGroupSeries(d);
        s.setBusinessRange(u, n._axesReinitialized || t, n._argumentAxes[0]._lastVisualRangeUpdateMode);
      }
    });
    if (!e || e && o.length) {
      Object.keys(a).forEach(function (e) {
        return s.addRange(a[e]);
      });
      var u = s.interval;
      n._argumentAxes.forEach(function (e) {
        var i = a[l(e)].interval ?? u;
        e.setBusinessRange(new r.Range(g({}, s, {
          interval: i
        })), n._axesReinitialized, undefined, n._groupsData.categories);
      });
    }
    n._populateMarginOptions();
  },
  getArgumentAxis: function () {
    return (this._argumentAxes || []).filter(function (e) {
      return !e.isVirtual;
    })[0];
  },
  getValueAxis: function (e) {
    var t = this;
    return (this._valueAxes || []).filter((0, c.isDefined)(e) ? function (t) {
      return t.name === e;
    } : function (e) {
      return e.pane === t.defaultPane;
    })[0];
  },
  _getGroupsData: function () {
    var e = this;
    var t = [];
    e._valueAxes.forEach(function (n) {
      t.push({
        series: e.series.filter(function (e) {
          return e.getValueAxis() === n;
        }),
        valueAxis: n,
        valueOptions: n.getOptions()
      });
    });
    return {
      groups: t,
      argumentAxes: e._argumentAxes,
      argumentOptions: e._argumentAxes[0].getOptions()
    };
  },
  _groupSeries: function () {
    this._correctValueAxes(false);
    this._groupsData = this._getGroupsData();
  },
  _processValueAxisFormat: function () {
    var e = [];
    this.series.forEach(function (t) {
      var n = t.getValueAxis();
      if (t.isFullStackedSeries()) {
        n.setPercentLabelFormat();
        e.push(n);
      }
    });
    this._valueAxes.forEach(function (t) {
      if (e.indexOf(t) === -1) {
        t.resetAutoLabelFormat();
      }
    });
  },
  _populateAxesOptions: function (e, t, n, i, a) {
    var r = this._prepareStripsAndConstantLines(e, t, i);
    var s = (0, o.extend)(true, {}, r, n, this._prepareAxisOptions(e, r, i));
    if (a) {
      s.visible = s.tick.visible = s.minorTick.visible = s.label.visible = false;
      s.title = {};
    }
    return s;
  },
  _getValFilter: function (e) {
    return d.default.getViewPortFilter(e.getValueAxis().visualRange() || {});
  },
  _createAxis: function (e, t, n) {
    var i = this;
    var a = e ? "argumentAxis" : "valueAxis";
    var r = (0, o.extend)({
      renderer: i._renderer,
      incidentOccurred: i._incidentOccurred,
      eventTrigger: i._eventTrigger,
      axisClass: e ? "arg" : "val",
      widgetClass: "dxc",
      stripsGroup: i._stripsGroup,
      stripLabelAxesGroup: i._stripLabelAxesGroup,
      constantLinesGroup: i._constantLinesGroup,
      scaleBreaksGroup: i._scaleBreaksGroup,
      axesContainerGroup: i._axesGroup,
      labelsAxesGroup: i._labelsAxesGroup,
      gridGroup: i._gridGroup,
      isArgumentAxis: e,
      getTemplate: function (e) {
        return i._getTemplate(e);
      }
    }, i._getAxisRenderingOptions(a));
    var l = new s.Axis(r);
    l.updateOptions(t);
    l.isVirtual = n;
    return l;
  },
  _applyVisualRangeByVirtualAxes: function (e, t) {
    return false;
  },
  _applyCustomVisualRangeOption: function (e, t) {
    if (e.getOptions().optionPath) {
      this._parseVisualRangeOption(`${e.getOptions().optionPath}.visualRange`, t);
    }
  },
  _getVisualRangeSetter: function () {
    var e = this;
    return function (t, n) {
      var i = n.skipEventRising;
      var o = n.range;
      e._applyCustomVisualRangeOption(t, o);
      t.setCustomVisualRange(o);
      t.skipEventRising = i;
      if (!e._applyVisualRangeByVirtualAxes(t, o)) {
        if (e._applyingChanges) {
          e._change_VISUAL_RANGE();
        } else {
          e._requestChange(["VISUAL_RANGE"]);
        }
      }
    };
  },
  _getTrackerSettings: function () {
    return (0, o.extend)(this.callBase(), {
      argumentAxis: this.getArgumentAxis()
    });
  },
  _prepareStripsAndConstantLines: function (e, t, n) {
    if ((t = this._themeManager.getOptions(e, t, n)).strips) {
      (0, a.each)(t.strips, function (e) {
        t.strips[e] = (0, o.extend)(true, {}, t.stripStyle, t.strips[e]);
      });
    }
    if (t.constantLines) {
      (0, a.each)(t.constantLines, function (e, n) {
        t.constantLines[e] = (0, o.extend)(true, {}, t.constantLineStyle, n);
      });
    }
    return t;
  },
  refresh: function () {
    this._disposeAxes();
    this.callBase();
  },
  _layoutAxes: function (e) {
    e();
    var t = this.checkForMoreSpaceForPanesCanvas();
    if (t) {
      var n = this._rect.slice();
      var i = this._layout.backward(n, n, [t.width, t.height]);
      t.width = Math.max(0, i[0]);
      t.height = Math.max(0, i[1]);
      this._canvas = this._createCanvasFromRect(n);
      e(t);
    }
  },
  checkForMoreSpaceForPanesCanvas: function () {
    return this.layoutManager.needMoreSpaceForPanesCanvas(this._getLayoutTargets(), this._isRotated());
  },
  _parseVisualRangeOption: function (e, t) {
    var n = this;
    var i = e.split(/[.[]/)[0];
    var o = e.match(/\d+/g);
    o = (0, c.isDefined)(o) ? parseInt(o[0]) : o;
    if (e.indexOf("visualRange") > 0) {
      if ((0, c.type)(t) !== "object") {
        t = b(e, t) || t;
      }
      n._setCustomVisualRange(i, o, t);
    } else if (((0, c.type)(t) === "object" || _(t)) && i.indexOf("Axis") > 0 && JSON.stringify(t).indexOf("visualRange") > 0) {
      if ((0, c.isDefined)(t.visualRange)) {
        n._setCustomVisualRange(i, o, t.visualRange);
      } else if (_(t)) {
        t.forEach(function (e, t) {
          return (0, c.isDefined)(e.visualRange) && n._setCustomVisualRange(i, t, e.visualRange);
        });
      }
    }
  },
  _setCustomVisualRange: function (e, t, n) {
    var i = this._options.silent(e);
    if (i) {
      if ((0, c.isDefined)(t)) {
        i[t]._customVisualRange = n;
      } else {
        i._customVisualRange = n;
      }
      this._axesReinitialized = true;
    }
  },
  _raiseZoomEndHandlers: function () {
    this._valueAxes.forEach(function (e) {
      return e.handleZoomEnd();
    });
  },
  _setOptionsByReference: function () {
    this.callBase();
    (0, o.extend)(this._optionsByReference, {
      "valueAxis.visualRange": true
    });
  },
  _notifyOptionChanged: function (e, t, n) {
    this.callBase.apply(this, arguments);
    if (!this._optionChangedLocker) {
      this._parseVisualRangeOption(e, t);
    }
  },
  _notifyVisualRange: function () {
    var e = this;
    e._valueAxes.forEach(function (t) {
      var n = t.getOptions().optionPath;
      if (n) {
        var i = `${n}.visualRange`;
        var o = (0, f.convertVisualRangeObject)(t.visualRange(), !_(e.option(i)));
        if (t.skipEventRising && (0, f.rangesAreEqual)(o, e.option(i))) {
          t.skipEventRising = null;
        } else if (e.option(n) || n === "valueAxis") {
          e.option(i, o);
        } else {
          e.option(n, {
            name: t.name,
            visualRange: o
          });
        }
      }
    });
  },
  _notify: function () {
    this.callBase();
    this._axesReinitialized = false;
    if (this.option("disableTwoWayBinding") !== true) {
      this.skipOptionsRollBack = true;
      this._notifyVisualRange();
      this.skipOptionsRollBack = false;
    }
  },
  _getAxesForScaling: function () {
    return this._valueAxes;
  },
  _getAxesByOptionPath: function (e, t, n) {
    var i;
    var o = this._getAxesForScaling();
    var a = [];
    if (t) {
      if (e.fullName) {
        i = e.fullName.slice(0, e.fullName.indexOf("."));
      }
      a = o.filter(function (e) {
        return e.getOptions().optionPath === i;
      });
    } else if ((0, c.type)(e.value) === "object") {
      a = o.filter(function (t) {
        return t.getOptions().optionPath === e.name;
      });
    } else if (_(e.value)) {
      e.value.forEach(function (t, i) {
        var r = o.filter(function (t) {
          return t.getOptions().optionPath === `${e.name}[${i}]`;
        })[0];
        if ((0, c.isDefined)(t[n]) && (0, c.isDefined)(r)) {
          a[i] = r;
        }
      });
    }
    return a;
  },
  _optionChanged: function (e) {
    if (!this._optionChangedLocker) {
      var t;
      var n = e.fullName.indexOf("visualRange") > 0 || !(this.getPartialChangeOptionsName(e).indexOf("visualRange") > -1) && undefined;
      if ((0, c.isDefined)(n) && (t = this._getAxesByOptionPath(e, n, "visualRange"))) {
        if (t.length > 1 || _(e.value)) {
          t.forEach(function (t, i) {
            return y(e, t, n, i);
          });
        } else if (t.length === 1) {
          y(e, t[0], n);
        }
      }
    }
    this.callBase(e);
  },
  _change_VISUAL_RANGE: function () {
    this._recreateSizeDependentObjects(false);
    if (!this._changes.has("FULL_RENDER")) {
      var e = this.option("resizePanesOnZoom");
      this._doRender({
        force: true,
        drawTitle: false,
        drawLegend: false,
        adjustAxes: e ?? (this.option("adjustAxesOnZoom") || false),
        animate: false
      });
      this._raiseZoomEndHandlers();
    }
  },
  resetVisualRange: function () {
    var e = this;
    e._valueAxes.forEach(function (t) {
      t.resetVisualRange(false);
      e._applyCustomVisualRangeOption(t);
    });
    e._requestChange(["VISUAL_RANGE"]);
  },
  _getCrosshairMargins: function () {
    return {
      x: 0,
      y: 0
    };
  },
  _legendDataField: "series",
  _adjustSeriesLabels: h.noop,
  _correctValueAxes: h.noop
});
exports.AdvancedChart = x;