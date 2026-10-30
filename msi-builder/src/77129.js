exports.plugins = exports.createAnnotations = undefined;
var i = f(require("./73349.js"));
var o = require("./35922.js");
var a = require("./14371.js");
var r = require("./13306.js");
var s = require("./19157.js");
var l = require("./64509.js");
var u = f(require("./93786.js"));
var d = require("./23174.js");
var c = require("./39611.js");
var h = f(require("./55994.js"));
function f(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
var p = i.default.getDocument;
var g = (0, c.addNamespace)([u.default.down, u.default.move], "annotations");
var m = (0, c.addNamespace)(u.default.up, "annotations");
var _ = d.start + ".annotations";
var v = d.move + ".annotations";
var y = d.end + ".annotations";
function b(e, t) {
  return {
    draw: function (n, i) {
      var o = this;
      var a = n._renderer.g().append(i).css((0, s.patchFontOptions)(e.font));
      if (this.plaque) {
        this.plaque.clear();
      }
      this.plaque = new l.Plaque((0, r.extend)(true, {}, e, {
        cornerRadius: (e.border || {}).cornerRadius
      }), n, a, t, n._isAnnotationBounded(e));
      this.plaque.draw(n._getAnnotationCoords(this));
      if (e.allowDragging) {
        a.on(_, {
          immediate: true
        }, function (e) {
          o._dragOffsetX = o.plaque.x - e.pageX;
          o._dragOffsetY = o.plaque.y - e.pageY;
        }).on(v, function (e) {
          o.plaque.move(e.pageX + o._dragOffsetX, e.pageY + o._dragOffsetY);
        }).on(y, function (e) {
          o.offsetX = (o.offsetX || 0) + e.offset.x;
          o.offsetY = (o.offsetY || 0) + e.offset.y;
        });
      }
    },
    hitTest: function (e, t) {
      return this.plaque.hitTest(e, t);
    },
    showTooltip: function (e, t) {
      var n = t.x;
      var i = t.y;
      var o = this;
      var a = o.options;
      if (e.annotation !== o) {
        e.setTemplate(a.tooltipTemplate);
        function r(t) {
          if (t) {
            e.annotation = o;
          }
        }
        r(e.show(a, {
          x: n,
          y: i
        }, {
          target: a
        }, a.customizeTooltip, r));
      } else if (!e.isCursorOnTooltip(n, i)) {
        e.move(n, i);
      }
    }
  };
}
function x(e, t) {
  var n;
  if (e.type === "text") {
    n = function (e, n) {
      var i = t._renderer.text(e.text).attr({
        class: e.cssClass
      }).append({
        element: n
      });
      if (e.width > 0 || e.height > 0) {
        i.setMaxSize(e.width, e.height, {
          wordWrap: e.wordWrap,
          textOverflow: e.textOverflow
        });
      }
    };
  } else if (e.type === "image") {
    n = function (e, n) {
      var i = e.image || {};
      var o = i.width;
      var a = i.height;
      var r = i.url;
      var s = i.location;
      var l = e.width;
      var u = e.height;
      var d = l > 0 ? Math.min(o, l) : o;
      var c = u > 0 ? Math.min(a, u) : a;
      t._renderer.image(0, 0, d, c, r, s || "center").append({
        element: n
      });
    };
  } else if (e.type === "custom") {
    n = e.template;
  }
  return n;
}
function w(e) {
  if (typeof e == "string") {
    return {
      url: e
    };
  } else {
    return e;
  }
}
function C(e, t, n = {}, i, a) {
  var s = w(n.image);
  return t.reduce(function (t, l) {
    var u = w(l.image);
    var d = (0, o.isFunction)(i) ? i(l) : {};
    if (d) {
      d.image = w(d.image);
    }
    var c = (0, r.extend)(true, {}, n, l, {
      image: s
    }, {
      image: u
    }, d);
    var h = x(c, e);
    var f = h && (0, r.extend)(true, a(c), b(c, e._getTemplate(h)));
    if (f) {
      t.push(f);
    }
    return t;
  }, []);
}
exports.createAnnotations = C;
var S = {
  name: "annotations_chart",
  init: function () {},
  dispose: function () {},
  members: {
    _getAnnotationCoords: function (e) {
      var n;
      var i;
      var a;
      var r = {
        offsetX: e.offsetX,
        offsetY: e.offsetY
      };
      var s = this._options.silent("rotated") ? "y" : "x";
      var l = this._options.silent("rotated") ? "x" : "y";
      var u = this.getArgumentAxis();
      var d = u.validateUnit(e.argument);
      var c = this.getValueAxis(e.axis);
      var h = c?.pane;
      if (e.series) {
        i = this.series.filter(function (t) {
          return t.name === e.series;
        })[0];
        c = (a = i) === null || a === undefined ? undefined : a.getValueAxis();
        if ((0, o.isDefined)(c)) {
          h = c.pane;
        }
      }
      if ((0, o.isDefined)(d)) {
        if (i) {
          var f = i.getPointCenterByArg(d);
          if (f) {
            r[s] = f[s];
          }
        } else {
          r[s] = u.getTranslator().translate(d);
        }
        if (!(0, o.isDefined)(h)) {
          h = u.pane;
        }
      }
      var p;
      var g;
      var m = (n = c) === null || n === undefined ? undefined : n.validateUnit(e.value);
      if ((0, o.isDefined)(m)) {
        r[l] = (p = c) === null || p === undefined ? undefined : p.getTranslator().translate(m);
        if (!(0, o.isDefined)(h) && (0, o.isDefined)(c)) {
          h = c.pane;
        }
      }
      r.canvas = this._getCanvasForPane(h);
      if ((0, o.isDefined)(r[s]) && !(0, o.isDefined)(m)) {
        if ((0, o.isDefined)(c) || (0, o.isDefined)(i)) {
          if ((0, o.isDefined)(c) && !(0, o.isDefined)(i)) {
            r[l] = this._argumentAxes.filter(function (e) {
              return e.pane === c.pane;
            })[0].getAxisPosition();
          } else if ((g = i) !== null && g !== undefined && g.checkSeriesViewportCoord(u, r[s])) {
            r[l] = i.getSeriesPairCoord(r[s], true);
          }
        } else {
          r[l] = u.getAxisPosition();
        }
      }
      if (!(0, o.isDefined)(d) && (0, o.isDefined)(r[l])) {
        if ((0, o.isDefined)(c) && !(0, o.isDefined)(i)) {
          r[s] = c.getAxisPosition();
        } else if ((0, o.isDefined)(i) && i.checkSeriesViewportCoord(c, r[l])) {
          r[s] = i.getSeriesPairCoord(r[l], false);
        }
      }
      return r;
    },
    _annotationsPointerEventHandler: function (e) {
      if (!this._disposed) {
        var t = e.originalEvent || {};
        var n = t.touches && t.touches[0] || {};
        var i = this._renderer.getRootOffset();
        var o = {
          x: n.pageX || t.pageX || e.pageX,
          y: n.pageY || t.pageY || e.pageY
        };
        var a = this._annotations.items.filter(function (e) {
          return e.hitTest(o.x - i.left, o.y - i.top);
        })[0];
        if (a && a.options.tooltipEnabled) {
          this._clear();
          if (a.options.allowDragging && e.type === u.default.down) {
            this._annotations._hideToolTipForDrag = true;
          }
          if (!this._annotations._hideToolTipForDrag) {
            a.showTooltip(this._annotations.tooltip, o);
            e.stopPropagation();
          }
        } else {
          this._annotations.hideTooltip();
        }
      }
    },
    _isAnnotationBounded: function (e) {
      return (0, o.isDefined)(e.value) || (0, o.isDefined)(e.argument);
    },
    _pullOptions: function (e) {
      return {
        type: e.type,
        name: e.name,
        x: e.x,
        y: e.y,
        value: e.value,
        argument: e.argument,
        axis: e.axis,
        series: e.series,
        options: e,
        offsetX: e.offsetX,
        offsetY: e.offsetY
      };
    },
    _forceAnnotationRender: function () {
      this._change(["FORCE_RENDER"]);
    },
    _clear: function () {
      this.hideTooltip();
      this.clearHover();
    }
  }
};
var k = {
  name: "annotations_polar_chart",
  init: function () {},
  dispose: function () {},
  members: {
    _getAnnotationCoords: function (e) {
      var t;
      var n;
      var i = {
        offsetX: e.offsetX,
        offsetY: e.offsetY,
        canvas: this._calcCanvas()
      };
      var a = this.getArgumentAxis();
      var s = a.validateUnit(e.argument);
      var l = this.getValueAxis().validateUnit(e.value);
      var u = e.radius;
      var d = e.angle;
      if (e.series) {
        n = this.series.filter(function (t) {
          return t.name === e.series;
        })[0];
      }
      (0, r.extend)(true, i, this.getXYFromPolar(d, u, s, l));
      if ((0, o.isDefined)(n)) {
        if (!(0, o.isDefined)(i.angle) || (0, o.isDefined)(l) || (0, o.isDefined)(u)) {
          if (!!(0, o.isDefined)(i.radius) && !(0, o.isDefined)(s) && !(0, o.isDefined)(d)) {
            t = n.getSeriesPairCoord({
              radius: i.radius
            }, false);
          }
        } else {
          if (!(0, o.isDefined)(s)) {
            s = a.getTranslator().from(isFinite(d) ? this.getActualAngle(d) : i.angle);
          }
          t = n.getSeriesPairCoord({
            argument: s,
            angle: -i.angle
          }, true);
        }
        if ((0, o.isDefined)(t)) {
          i.x = t.x;
          i.y = t.y;
        }
      }
      if (e.series && !(0, o.isDefined)(t)) {
        i.x = i.y = undefined;
      }
      return i;
    },
    _annotationsPointerEventHandler: S.members._annotationsPointerEventHandler,
    _isAnnotationBounded: S.members._isAnnotationBounded,
    _pullOptions: function (e) {
      var t = (0, r.extend)({}, {
        radius: e.radius,
        angle: e.angle
      }, S.members._pullOptions(e));
      delete t.axis;
      return t;
    },
    _forceAnnotationRender: S.members._forceAnnotationRender,
    _clear: S.members._clear
  }
};
var D = {
  name: "annotations_vector_map",
  init: function () {},
  dispose: function () {
    this._annotations._offTracker();
    this._annotations._offTracker = null;
  },
  members: {
    _getAnnotationCoords: function (e) {
      var t = {
        offsetX: e.offsetX,
        offsetY: e.offsetY
      };
      t.canvas = this._projection.getCanvas();
      if (e.coordinates) {
        var n = this._projection.toScreenPoint(e.coordinates);
        t.x = n[0];
        t.y = n[1];
      }
      return t;
    },
    _annotationsPointerEventHandler: S.members._annotationsPointerEventHandler,
    _isAnnotationBounded: function (e) {
      return (0, o.isDefined)(e.coordinates);
    },
    _pullOptions: function (e) {
      var t = (0, r.extend)({}, {
        coordinates: e.coordinates
      }, S.members._pullOptions(e));
      delete t.axis;
      delete t.series;
      delete t.argument;
      delete t.value;
      return t;
    },
    _forceAnnotationRender: function () {
      this._change(["EXTRA_ELEMENTS"]);
    },
    _getAnnotationStyles: function () {
      return {
        "text-anchor": "start"
      };
    },
    _clear: function () {}
  },
  extenders: {
    _prepareExtraElements: function () {
      var e = this;
      function t() {
        e._renderExtraElements();
      }
      e._annotations._offTracker = e._tracker.on({
        move: t,
        zoom: t,
        end: t
      });
    }
  }
};
var I = {
  name: "annotations_pie_chart",
  init: function () {},
  dispose: function () {},
  members: {
    _getAnnotationCoords: function (e) {
      var t = {
        offsetX: e.offsetX,
        offsetY: e.offsetY,
        canvas: this._canvas
      };
      if (e.argument) {
        var n = (e.series ? this.getSeriesByName(e.series) : this.series[0]).getPointsByArg(e.argument)[0].getAnnotationCoords(e.location);
        var i = n.x;
        var o = n.y;
        t.x = i;
        t.y = o;
      }
      return t;
    },
    _isAnnotationBounded: function (e) {
      return e.argument;
    },
    _annotationsPointerEventHandler: S.members._annotationsPointerEventHandler,
    _pullOptions: function (e) {
      var t = (0, r.extend)({}, {
        location: e.location
      }, S.members._pullOptions(e));
      delete t.axis;
      return t;
    },
    _clear: S.members._clear,
    _forceAnnotationRender: S.members._forceAnnotationRender
  }
};
var T = {
  core: {
    name: "annotations_core",
    init: function () {
      this._annotations = {
        items: [],
        _hideToolTipForDrag: false,
        tooltip: new a.Tooltip({
          cssClass: `${this._rootClassPrefix}-annotation-tooltip`,
          eventTrigger: this._eventTrigger,
          widgetRoot: this.element(),
          widget: this
        }),
        hideTooltip: function () {
          this.tooltip.annotation = null;
          this.tooltip.hide();
        },
        clearItems: function () {
          this.items.forEach(function (e) {
            return e.plaque.clear();
          });
          this.items = [];
        }
      };
      this._annotations.tooltip.setRendererOptions(this._getRendererOptions());
    },
    dispose: function () {
      this._annotationsGroup.linkRemove().linkOff();
      h.default.off(p(), ".annotations");
      this._annotationsGroup.off(".annotations");
      if (this._annotations.tooltip) {
        this._annotations.tooltip.dispose();
      }
    },
    extenders: {
      _createHtmlStructure: function () {
        var e = this;
        this._annotationsGroup = this._renderer.g().attr({
          class: `${this._rootClassPrefix}-annotations`
        }).css(this._getAnnotationStyles()).linkOn(this._renderer.root, "annotations").linkAppend();
        h.default.on(p(), g, function (t) {
          if (!e._disposed && !e._annotations.tooltip.isCursorOnTooltip(t.pageX, t.pageY)) {
            e._annotations.hideTooltip();
          }
        });
        h.default.on(p(), m, function (t) {
          e._annotations._hideToolTipForDrag = false;
          e._annotationsPointerEventHandler(t);
        });
        this._annotationsGroup.on(g, this._annotationsPointerEventHandler.bind(this));
      },
      _renderExtraElements: function () {
        var e = this;
        this._annotationsGroup.clear();
        this._annotations.items.forEach(function (t) {
          return t.draw(e, e._annotationsGroup);
        });
      },
      _stopCurrentHandling: function () {
        this._annotations.hideTooltip();
      }
    },
    members: {
      _buildAnnotations: function () {
        this._annotations.clearItems();
        var e = this._getOption("annotations", true);
        if (e != null && e.length) {
          this._annotations.items = C(this, e, this._getOption("commonAnnotationSettings"), this._getOption("customizeAnnotation", true), this._pullOptions);
        }
      },
      _setAnnotationTooltipOptions: function () {
        var e = (0, r.extend)({}, this._getOption("tooltip"));
        e.contentTemplate = e.customizeTooltip = undefined;
        this._annotations.tooltip.update(e);
      },
      _getAnnotationCoords: function () {
        return {};
      },
      _pullOptions: function () {
        return {};
      },
      _getAnnotationStyles: function () {
        return {};
      }
    },
    customize: function (e) {
      e.addChange({
        code: "ANNOTATIONITEMS",
        handler: function () {
          this._requestChange(["ANNOTATIONS"]);
        },
        isOptionChange: true,
        option: "annotations"
      });
      e.addChange({
        code: "ANNOTATIONSSETTINGS",
        handler: function () {
          this._requestChange(["ANNOTATIONS"]);
        },
        isOptionChange: true,
        option: "commonAnnotationSettings"
      });
      e.addChange({
        code: "ANNOTATIONS",
        handler: function () {
          this._buildAnnotations();
          this._setAnnotationTooltipOptions();
          this._forceAnnotationRender();
        },
        isThemeDependent: true,
        isOptionChange: true
      });
    },
    fontFields: ["commonAnnotationSettings.font"]
  },
  chart: S,
  polarChart: k,
  vectorMap: D,
  pieChart: I
};
exports.plugins = T;