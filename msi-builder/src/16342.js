exports.plugin = exports.Legend = undefined;
var i = require("./19157.js");
var o = require("./13306.js");
var a = require("./73711.js");
var r = require("./35922.js");
var s = require("./17384.js");
var l = require("./48013.js");
var u = require("./20576.js");
var d = require("./56453.js");
var c = require("./62754.js");
var h = Number;
var f = Math;
var p = f.round;
var g = f.max;
var m = f.min;
var _ = f.ceil;
var v = r.isDefined;
var y = r.isFunction;
var b = i.enumParser;
var x = i.normalizeEnum;
var w = o.extend;
var C = "center";
var S = "right";
var k = "left";
var D = "top";
var I = "bottom";
var T = b([k, C, S]);
var E = b([D, I]);
var O = b(["vertical", "horizontal"]);
var A = b([k, S, D, I]);
var P = b(["outside", "inside"]);
var M = b([k, C, S]);
function R(e, t, n) {
  if (e) {
    var i = e.fill;
    return (0, o.extend)({}, {
      state: n,
      fill: i === "none" ? t : i,
      opacity: e.opacity,
      filter: e.filter,
      hatching: w({}, e.hatching, {
        step: 5,
        width: 2
      })
    });
  }
}
function B(e, t, n) {
  var i = (0, d.processHatchingAttrs)(e, t);
  if (i.fill && i.fill.indexOf("MSI") === 0) {
    i.fill = (0, d.getFuncIri)(i.fill);
  }
  i.opacity = i.opacity >= 0 ? i.opacity : 1;
  return (0, o.extend)({}, i, {
    size: n
  });
}
function L(e, t, n, i) {
  var o = t && n[t[e]];
  if (o) {
    o.renderMarker(o.states[i]);
  }
}
function V(e, t, n) {
  if (e) {
    (function (e) {
      var t = e.margin;
      t = t >= 0 ? {
        top: t = h(e.margin),
        bottom: t,
        left: t,
        right: t
      } : {
        top: t.top >= 0 ? h(t.top) : 10,
        bottom: t.bottom >= 0 ? h(t.bottom) : 10,
        left: t.left >= 0 ? h(t.left) : 10,
        right: t.right >= 0 ? h(t.right) : 10
      };
      e.margin = t;
    })(e);
    e.horizontalAlignment = T(e.horizontalAlignment, S);
    e.verticalAlignment = E(e.verticalAlignment, e.horizontalAlignment === C ? I : D);
    e.orientation = O(e.orientation, e.horizontalAlignment === C ? "horizontal" : "vertical");
    e.itemTextPosition = A(e.itemTextPosition, e.orientation === "horizontal" ? I : S);
    e.position = n ? P(e.position, "outside") : "outside";
    e.itemsAlignment = M(e.itemsAlignment, null);
    e.hoverMode = x(e.hoverMode);
    e.customizeText = y(e.customizeText) ? e.customizeText : function () {
      return this[t];
    };
    e.customizeHint = y(e.customizeHint) ? e.customizeHint : u.noop;
    e._incidentOccurred = e._incidentOccurred || u.noop;
    return e;
  } else {
    return null;
  }
}
function F(e, t) {
  return e.rect(0, 0, t, t);
}
function H(e, t) {
  return e.circle(t / 2, t / 2, t / 2);
}
function N(e, t, n) {
  return t >= e.left && t <= e.right && n >= e.top && n <= e.bottom;
}
function z(e, t, n, i) {
  var o = {
    x: 0,
    y: 0
  };
  var a = 0;
  var r = 0;
  var s = 0;
  s = t.direction === "y" ? i.top + i.bottom : i.left + i.right;
  e.forEach(function (e, n) {
    var i = e[0];
    var s = e.length;
    e.forEach(function (e, n) {
      var i = e.offset || t.spacing;
      o[t.direction] += e[t.measure] + (n !== s - 1 ? i : 0);
      a = g(a, o[t.direction]);
    });
    o[t.direction] = 0;
    o[t.altDirection] += i[t.altMeasure] + i.altOffset || t.altSpacing;
    r = g(r, o[t.altDirection]);
  });
  if (a + s > t.length) {
    t.countItem = function (e, t) {
      e.altCountItem++;
      return _(t / e.altCountItem);
    }(t, n);
    return true;
  }
}
function j(e, t) {
  return e.reduce(function (e, n) {
    var i = n.offset || t.spacing;
    return e + n[t.measure] + i;
  }, 0);
}
function W(e) {
  switch (e.itemTextPosition) {
    case I:
      return {
        horizontal: C,
        vertical: D
      };
    case D:
      return {
        horizontal: C,
        vertical: I
      };
    case k:
      return {
        horizontal: S,
        vertical: C
      };
    case S:
      return {
        horizontal: k,
        vertical: C
      };
  }
}
function G(e, t) {
  var n = e.reduce(function (e, n) {
    var i = n ? n[t] : e;
    return g(e, i);
  }, 0);
  e.forEach(function (e) {
    if (e) {
      e[t] = n;
    }
  });
}
function q(e) {
  var t;
  var n;
  var i = e.length;
  var o = e[0].length;
  var a = [];
  for (t = 0; t < o; t++) {
    a[t] = [];
    n = 0;
    for (; n < i; n++) {
      a[t][n] = e[n][t];
    }
  }
  return a;
}
function $(e) {
  if (function (e) {
    return x(e) === "circle";
  }(e)) {
    return H;
  } else {
    return F;
  }
}
function U(e) {
  if (e.horizontalAlignment === C) {
    return C;
  } else if (e.itemTextPosition === S) {
    return k;
  } else if (e.itemTextPosition === k) {
    return S;
  } else {
    return C;
  }
}
function K(e) {
  this._renderer = e.renderer;
  this._legendGroup = e.group;
  this._backgroundClass = e.backgroundClass;
  this._itemGroupClass = e.itemGroupClass;
  this._textField = e.textField;
  this._getCustomizeObject = e.getFormatObject;
  this._titleGroupClass = e.titleGroupClass;
  this._allowInsidePosition = e.allowInsidePosition;
  this._widget = e.widget;
  this._updated = false;
}
exports.Legend = K;
var Z = K;
var Y = Z.prototype = (0, l.clone)(a.LayoutElement.prototype);
(0, o.extend)(Y, {
  constructor: Z,
  getOptions: function () {
    return this._options;
  },
  update: function (e = [], t, n = {}) {
    var i = this;
    var o = (t = i._options = V(t, i._textField, i._allowInsidePosition) || {}).markerSize;
    this._updated = true;
    this._data = e.map(function (e) {
      e.size = h(e.size > 0 ? e.size : o);
      e.marker = B(e, e.states.normal);
      Object.defineProperty(e.marker, "size", {
        get: function () {
          return e.size;
        },
        set: function (t) {
          e.size = t;
        }
      });
      Object.defineProperty(e.marker, "opacity", {
        get: function () {
          return e.states.normal.opacity;
        },
        set: function (t) {
          e.states.normal.opacity = e.states.hover.opacity = e.states.selection.opacity = t;
        }
      });
      return e;
    });
    if (t.customizeItems) {
      i._data = t.customizeItems(e.slice()) || e;
    }
    i._boundingRect = {
      width: 0,
      height: 0,
      x: 0,
      y: 0
    };
    if (i.isVisible() && !i._title) {
      i._title = new s.Title({
        renderer: i._renderer,
        cssClass: i._titleGroupClass,
        root: i._legendGroup
      });
    }
    if (i._title) {
      var a = t.title;
      n.horizontalAlignment = U(t);
      i._title.update(n, a);
    }
    this.erase();
    return i;
  },
  isVisible: function () {
    return this._options && this._options.visible;
  },
  draw: function (e, t) {
    var n = this._getItemData();
    this.erase();
    if (!this.isVisible() || !n || !n.length) {
      return this;
    }
    this._insideLegendGroup = this._renderer.g().enableLinks().append(this._legendGroup);
    this._title.changeLink(this._insideLegendGroup);
    this._createBackground();
    if (this._title.hasText()) {
      var i = this._background ? this._options.paddingLeftRight * 2 : 0;
      this._title.draw(e - i, t);
    }
    this._markersGroup = this._renderer.g().attr({
      class: this._itemGroupClass
    }).append(this._insideLegendGroup);
    this._createItems(n);
    this._updateElementsPosition(e, t);
    return this;
  },
  _measureElements: function () {
    var e = this._options;
    var t = 0;
    this._items.forEach(function (n) {
      var i = n.label.getBBox();
      var o = n.marker.getBBox();
      n.markerBBox = o;
      n.markerSize = Math.max(o.width, o.height);
      var a = function (e, t, n) {
        var i;
        var o;
        switch (e.itemTextPosition) {
          case k:
          case S:
            i = t.width + 7 + n.width;
            o = g(t.height, n.height);
            break;
          case D:
          case I:
            i = g(t.width, n.width);
            o = t.height + 4 + n.height;
        }
        return {
          width: i,
          height: o
        };
      }(e, o, i);
      n.labelBBox = i;
      n.bBox = a;
      t = g(t, a.height);
    });
    if (e.equalRowHeight) {
      this._items.forEach(function (e) {
        return e.bBox.height = t;
      });
    }
  },
  _updateElementsPosition: function (e, t) {
    var n = this._options;
    this._size = {
      width: e,
      height: t
    };
    this._measureElements();
    this._locateElements(n);
    this._finalUpdate(n);
    var i = this.getLayoutOptions();
    if (i.width > e || i.height > t) {
      this.freeSpace();
    }
  },
  _createItems: function (e) {
    var t = this;
    var n = t._options;
    var a = t._renderer;
    var r = $(n.markerShape);
    t._markersId = {};
    var s = n.markerTemplate ? n.markerTemplate : function (e, t) {
      var n = e.marker;
      r(a, n.size).attr({
        fill: n.fill,
        opacity: n.opacity,
        filter: n.filter
      }).append({
        element: t
      });
    };
    var l = t._widget._getTemplate(s);
    var u = t._markersGroup;
    u.css((0, i.patchFontOptions)(n.font));
    t._deferredItems = [];
    t._templatesGroups = [];
    t._items = (e || []).map(function (e, i) {
      var r = e.states;
      var s = r.normal;
      var d = s.fill;
      e.size = e.marker.size;
      var h = {
        normal: (0, o.extend)(s, {
          fill: d || n.markerColor || n.defaultColor,
          state: "normal"
        }),
        hover: R(r.hover, d, "hovered"),
        selection: R(r.selection, d, "selected")
      };
      e.states = h;
      var f = a.g().append(u);
      var p = a.g().attr({
        class: "dxl-marker"
      }).append(f);
      t._deferredItems[i] = new c.Deferred();
      t._templatesGroups.push(p);
      var g = {
        label: t._createLabel(e, f),
        marker: p,
        renderer: a,
        group: f,
        tracker: {
          id: e.id,
          argument: e.argument,
          argumentIndex: e.argumentIndex
        },
        states: h,
        itemTextPosition: n.itemTextPosition,
        markerOffset: 0,
        bBoxes: [],
        renderMarker: function (n) {
          e.marker = B(g, n, e.size);
          p.clear();
          l.render({
            model: e,
            container: p.element,
            onRendered: t._deferredItems[i].resolve
          });
        }
      };
      g.renderMarker(h.normal);
      t._createHint(e, f);
      if (e.id !== undefined) {
        t._markersId[e.id] = i;
      }
      return g;
    });
  },
  getTemplatesGroups: function () {
    return this._templatesGroups || [];
  },
  getTemplatesDef: function () {
    return this._deferredItems || [];
  },
  _getItemData: function () {
    var e = this._data || [];
    if ((this._options || {}).inverted) {
      e = e.slice().reverse();
    }
    return e.filter(function (e) {
      return e.visible;
    });
  },
  _finalUpdate: function (e) {
    this._adjustBackgroundSettings(e);
    this._setBoundingRect(e.margin);
  },
  erase: function () {
    var e = this._insideLegendGroup;
    if (e) {
      e.dispose();
    }
    this._insideLegendGroup = this._markersGroup = this._x1 = this._x2 = this._y2 = this._y2 = null;
    return this;
  },
  _locateElements: function (e) {
    this._moveInInitialValues();
    this._locateRowsColumns(e);
  },
  _moveInInitialValues: function () {
    if (this._title.hasText()) {
      this._title.move([0, 0]);
    }
    if (this._legendGroup) {
      this._legendGroup.move(0, 0);
    }
    if (this._background) {
      this._background.attr({
        x: 0,
        y: 0,
        width: 0,
        height: 0
      });
    }
  },
  applySelected: function (e) {
    L(e, this._markersId, this._items, "selection");
    return this;
  },
  applyHover: function (e) {
    L(e, this._markersId, this._items, "hover");
    return this;
  },
  resetItem: function (e) {
    L(e, this._markersId, this._items, "normal");
    return this;
  },
  _createLabel: function (e, t) {
    var n = this._getCustomizeObject(e);
    var o = this._options;
    var a = function (e) {
      switch (e) {
        case D:
        case I:
          return C;
        case k:
          return S;
        case S:
          return k;
      }
    }(o.itemTextPosition);
    var r = o.customizeText.call(n, n);
    var s = v(e.textOpacity) ? {
      color: o.font.color,
      opacity: e.textOpacity
    } : {};
    return this._renderer.text(r, 0, 0).css((0, i.patchFontOptions)(s)).attr({
      align: a,
      class: o.cssClass
    }).append(t);
  },
  _createHint: function (e, t) {
    var n = this._getCustomizeObject(e);
    var i = this._options.customizeHint.call(n, n);
    if (v(i) && i !== "") {
      t.setTitle(i);
    }
  },
  _createBackground: function () {
    var e = this._options.position === "inside";
    var t = this._options.backgroundColor;
    var n = t || (e ? this._options.containerBackgroundColor : "none");
    if (this._options.border.visible || (e || t) && t !== "none") {
      this._background = this._renderer.rect(0, 0, 0, 0).attr({
        fill: n,
        class: this._backgroundClass
      }).append(this._insideLegendGroup);
    }
  },
  _locateRowsColumns: function (e) {
    var t;
    var n = 0;
    var i = this._getItemsLayoutOptions();
    var o = this._items.length;
    do {
      t = [];
      this._createLines(t, i);
      this._alignLines(t, i);
      n++;
    } while (z(t, i, o, e.margin) && n < o);
    this._applyItemPosition(t, i);
  },
  _createLines: function (e, t) {
    this._items.forEach(function (n, i) {
      var o;
      var a;
      var r = function (e, t, n) {
        var i = {};
        if (n % t.countItem == 0) {
          if (t.markerOffset) {
            e.push([], []);
          } else {
            e.push([]);
          }
        }
        if (t.markerOffset) {
          i.firstLine = e[e.length - 1];
          i.secondLine = e[e.length - 2];
        } else {
          i.firstLine = i.secondLine = e[e.length - 1];
        }
        return i;
      }(e, t, i);
      var s = {
        width: n.labelBBox.width,
        height: n.labelBBox.height,
        element: n.label,
        bBox: n.labelBBox,
        pos: W(t),
        itemIndex: i
      };
      var l = {
        width: n.markerBBox.width,
        height: n.markerBBox.height,
        element: n.marker,
        pos: {
          horizontal: C,
          vertical: C
        },
        bBox: {
          width: n.markerBBox.width,
          height: n.markerBBox.height,
          x: n.markerBBox.x,
          y: n.markerBBox.y
        },
        itemIndex: i
      };
      var u = t.markerOffset ? "altOffset" : "offset";
      if (t.inverseLabelPosition) {
        o = s;
        a = l;
      } else {
        o = l;
        a = s;
      }
      o[u] = t.labelOffset;
      r.secondLine.push(o);
      r.firstLine.push(a);
    });
  },
  _alignLines: function (e, t) {
    var n;
    var i = t.altMeasure;
    e.forEach(function (e) {
      return G(e, i);
    });
    i = t.measure;
    if (t.itemsAlignment) {
      if (t.markerOffset) {
        for (n = 0; n < e.length;) {
          q([e[n++], e[n++]]).forEach(o);
        }
      }
    } else {
      q(e).forEach(o);
    }
    function o(e) {
      G(e, i);
    }
  },
  _applyItemPosition: function (e, t) {
    var n = this;
    var i = {
      x: 0,
      y: 0
    };
    var o = function (e, t) {
      return e.reduce(function (e, n) {
        return g(e, j(n, t));
      }, 0);
    }(e, t);
    e.forEach(function (e) {
      var r = e[0];
      var s = r.altOffset || t.altSpacing;
      i[t.direction] = function (e, t, n) {
        var i;
        var o = j(e, t);
        switch (t.itemsAlignment) {
          case S:
            i = n - o;
            break;
          case C:
            i = (n - o) / 2;
            break;
          default:
            i = 0;
        }
        return i;
      }(e, t, o);
      e.forEach(function (e) {
        var o = e.offset || t.spacing;
        var r = new a.WrapperLayoutElement(e.element, e.bBox);
        var s = {
          x: i.x,
          y: i.y,
          width: e.width,
          height: e.height
        };
        var l = new a.WrapperLayoutElement(null, s);
        var u = n._items[e.itemIndex];
        r.position({
          of: l,
          my: e.pos,
          at: e.pos
        });
        u.bBoxes.push(l);
        i[t.direction] += e[t.measure] + o;
      });
      i[t.altDirection] += r[t.altMeasure] + s;
    });
    this._items.forEach(function (e) {
      var t;
      var i;
      var o;
      t = e.bBoxes[0].getLayoutOptions();
      i = e.bBoxes[1].getLayoutOptions();
      (o = {}).left = m(t.x, i.x);
      o.top = m(t.y, i.y);
      o.right = g(t.x + t.width, i.x + i.width);
      o.bottom = g(t.y + t.height, i.y + i.height);
      var a = o;
      var r = n._options.columnItemSpacing / 2;
      var s = n._options.rowItemSpacing / 2;
      e.tracker.left = a.left - r;
      e.tracker.right = a.right + r;
      e.tracker.top = a.top - s;
      e.tracker.bottom = a.bottom + s;
    });
  },
  _getItemsLayoutOptions: function () {
    var e = this._options;
    var t = e.orientation;
    var n = {
      itemsAlignment: e.itemsAlignment,
      orientation: e.orientation
    };
    var i = this._size.width - (this._background ? e.paddingLeftRight * 2 : 0);
    var o = this._size.height - (this._background ? e.paddingTopBottom * 2 : 0);
    if (t === "horizontal") {
      n.length = i;
      n.spacing = e.columnItemSpacing;
      n.direction = "x";
      n.measure = "width";
      n.altMeasure = "height";
      n.altDirection = "y";
      n.altSpacing = e.rowItemSpacing;
      n.countItem = e.columnCount;
      n.altCountItem = e.rowCount;
      n.marginTextLabel = 4;
      n.labelOffset = 7;
      if (e.itemTextPosition === I || e.itemTextPosition === D) {
        n.labelOffset = 4;
        n.markerOffset = true;
      }
    } else {
      n.length = o;
      n.spacing = e.rowItemSpacing;
      n.direction = "y";
      n.measure = "height";
      n.altMeasure = "width";
      n.altDirection = "x";
      n.altSpacing = e.columnItemSpacing;
      n.countItem = e.rowCount;
      n.altCountItem = e.columnCount;
      n.marginTextLabel = 7;
      n.labelOffset = 4;
      if (e.itemTextPosition === S || e.itemTextPosition === k) {
        n.labelOffset = 7;
        n.markerOffset = true;
      }
    }
    if (!n.countItem) {
      if (n.altCountItem) {
        n.countItem = _(this._items.length / n.altCountItem);
      } else {
        n.countItem = this._items.length;
      }
    }
    if (e.itemTextPosition === D || e.itemTextPosition === k) {
      n.inverseLabelPosition = true;
    }
    n.itemTextPosition = e.itemTextPosition;
    n.altCountItem = n.altCountItem || _(this._items.length / n.countItem);
    return n;
  },
  _adjustBackgroundSettings: function (e) {
    if (this._background) {
      var t = e.border;
      var n = this._calculateTotalBox();
      var i = {
        x: p(n.x - e.paddingLeftRight),
        y: p(n.y - e.paddingTopBottom),
        width: p(n.width) + e.paddingLeftRight * 2,
        height: p(n.height),
        opacity: e.backgroundOpacity
      };
      if (t.visible && t.width && t.color && t.color !== "none") {
        i["stroke-width"] = t.width;
        i.stroke = t.color;
        i["stroke-opacity"] = t.opacity;
        i.dashStyle = t.dashStyle;
        i.rx = t.cornerRadius || 0;
        i.ry = t.cornerRadius || 0;
      }
      this._background.attr(i);
    }
  },
  _setBoundingRect: function (e) {
    if (this._insideLegendGroup) {
      var t = this._calculateTotalBox();
      t.height += e.top + e.bottom;
      t.widthWithoutMargins = t.width;
      t.width += e.left + e.right;
      t.x -= e.left;
      t.y -= e.top;
      this._boundingRect = t;
    }
  },
  _calculateTotalBox: function () {
    var e = this._markersGroup.getBBox();
    var t = this._title.getCorrectedLayoutOptions();
    var n = this._insideLegendGroup.getBBox();
    var i = this._background ? this._options.paddingTopBottom * 2 : 0;
    n.height = e.height + t.height + i;
    if (t.width > n.width) {
      n.width = t.width;
    }
    return n;
  },
  getActionCallback: function (e) {
    var t = this;
    if (t._options.visible) {
      return function (n) {
        t[n](e.index);
      };
    } else {
      return u.noop;
    }
  },
  getLayoutOptions: function () {
    var e = this._options;
    var t = this._insideLegendGroup ? this._boundingRect : {
      width: 0,
      height: 0,
      x: 0,
      y: 0
    };
    if (e) {
      t.verticalAlignment = e.verticalAlignment;
      t.horizontalAlignment = e.horizontalAlignment;
      if (e.orientation === "horizontal" || e.horizontalAlignment === C) {
        t.cutLayoutSide = e.verticalAlignment;
        t.cutSide = "vertical";
      } else {
        t.cutLayoutSide = e.horizontalAlignment;
        t.cutSide = "horizontal";
      }
      t.position = {
        horizontal: e.horizontalAlignment,
        vertical: e.verticalAlignment
      };
      return t;
    } else {
      return null;
    }
  },
  shift: function (e, t) {
    var n = {};
    if (this._insideLegendGroup) {
      this._insideLegendGroup.attr({
        translateX: e - this._boundingRect.x,
        translateY: t - this._boundingRect.y
      });
    }
    if (this._title) {
      this._shiftTitle(this._boundingRect.widthWithoutMargins);
    }
    if (this._markersGroup) {
      this._shiftMarkers();
    }
    if (this._insideLegendGroup) {
      n = this._legendGroup.getBBox();
    }
    this._x1 = n.x;
    this._y1 = n.y;
    this._x2 = n.x + n.width;
    this._y2 = n.y + n.height;
    return this;
  },
  _shiftTitle: function (e) {
    var t = this._title;
    var n = t.getCorrectedLayoutOptions();
    if (n && t.hasText()) {
      var i = e - (this._background ? this._options.paddingLeftRight * 2 : 0);
      var o = t.getOptions();
      var a = n.y + o.margin.top;
      var r = 0;
      if (o.verticalAlignment === I && this._markersGroup) {
        a += this._markersGroup.getBBox().height;
      }
      if (o.horizontalAlignment === S) {
        r = i - n.width;
      } else if (o.horizontalAlignment === C) {
        r = (i - n.width) / 2;
      }
      t.shift(r, a);
    }
  },
  _shiftMarkers: function () {
    var e = this._title.getLayoutOptions();
    var t = this._markersGroup.getBBox();
    var n = this._title.getOptions() || {};
    var i = 0;
    var o = 0;
    if (e.width > t.width && this._options.horizontalAlignment === C) {
      i = e.width / 2 - t.width / 2;
    }
    if (n.verticalAlignment === D) {
      o = e.height;
    }
    if (i !== 0 || o !== 0) {
      this._markersGroup.attr({
        translateX: i,
        translateY: o
      });
      this._items.forEach(function (e) {
        e.tracker.left += i;
        e.tracker.right += i;
        e.tracker.top += o;
        e.tracker.bottom += o;
      });
    }
  },
  getPosition: function () {
    return this._options.position;
  },
  coordsIn: function (e, t) {
    return e >= this._x1 && e <= this._x2 && t >= this._y1 && t <= this._y2;
  },
  getItemByCoord: function (e, t) {
    var n = this._items;
    var i = this._insideLegendGroup;
    e -= i.attr("translateX");
    t -= i.attr("translateY");
    for (var o = 0; o < n.length; o++) {
      if (N(n[o].tracker, e, t)) {
        return n[o].tracker;
      }
    }
    return null;
  },
  dispose: function () {
    if (this._title) {
      this._title.dispose();
    }
    this._legendGroup = this._insideLegendGroup = this._title = this._renderer = this._options = this._data = this._items = null;
    return this;
  },
  layoutOptions: function () {
    if (!this.isVisible()) {
      return null;
    }
    var e = this.getLayoutOptions();
    return {
      horizontalAlignment: this._options.horizontalAlignment,
      verticalAlignment: this._options.verticalAlignment,
      side: e.cutSide,
      priority: 1,
      position: this.getPosition()
    };
  },
  measure: function (e) {
    if (this._updated || !this._insideLegendGroup) {
      this.draw(e[0], e[1]);
      this._updated = false;
    } else {
      this._items.forEach(function (e) {
        e.bBoxes = [];
      });
      this._updateElementsPosition(e[0], e[1]);
    }
    var t = this.getLayoutOptions();
    return [t.width, t.height];
  },
  move: function (e) {
    this.shift(e[0], e[1]);
  },
  freeSpace: function () {
    this._options._incidentOccurred("W2104");
    this.erase();
  }
});
var X = {
  name: "legend",
  init: function () {
    var e = this._renderer.g().attr({
      class: this._rootClassPrefix + "-legend"
    }).enableLinks().append(this._renderer.root);
    this._legend = new K({
      renderer: this._renderer,
      group: e,
      widget: this,
      itemGroupClass: this._rootClassPrefix + "-item",
      titleGroupClass: this._rootClassPrefix + "-title",
      textField: "text",
      getFormatObject: function (e) {
        return {
          item: e.item,
          text: e.text
        };
      }
    });
    this._layout.add(this._legend);
  },
  extenders: {
    _applyTilesAppearance: function () {
      var e = this;
      this._items.forEach(function (t) {
        e._applyLegendItemStyle(t.id, t.getState());
      });
    },
    _buildNodes: function () {
      this._createLegendItems();
    }
  },
  members: {
    _applyLegendItemStyle: function (e, t) {
      var n = this._legend;
      switch (t) {
        case "hover":
          n.applyHover(e);
          break;
        case "selection":
          n.applySelected(e);
          break;
        default:
          n.resetItem(e);
      }
    },
    _createLegendItems: function () {
      if (this._legend.update(this._getLegendData(), this._getOption("legend"), this._themeManager.theme("legend").title)) {
        this._requestChange(["LAYOUT"]);
      }
    }
  },
  dispose: function () {
    this._legend.dispose();
  },
  customize: function (e) {
    e.prototype._proxyData.push(function (e, t) {
      if (this._legend.coordsIn(e, t)) {
        var n = this._legend.getItemByCoord(e, t);
        if (n) {
          return {
            id: n.id,
            type: "legend"
          };
        }
      }
    });
    e.addChange({
      code: "LEGEND",
      handler: function () {
        this._createLegendItems();
      },
      isThemeDependent: true,
      option: "legend",
      isOptionChange: true
    });
  }
};
exports.plugin = X;