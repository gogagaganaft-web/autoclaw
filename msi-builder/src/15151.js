exports.MapLayerCollection = le;
exports.getMaxBound = k;
var i;
var o = require("./20576.js");
var a = require("./13306.js");
var r = require("./95479.js");
var s = (i = require("./53305.js")) && i.__esModule ? i : {
  default: i
};
var l = require("./35922.js");
var u = require("./62754.js");
var d = require("./19157.js");
var c = o.noop;
var h = a.extend;
var f = r.each;
var p = Array.prototype.concat;
var g = [0, 1, 2, 2];
var m = {
  none: null,
  single: -1,
  multiple: NaN
};
var _ = Array.isArray;
var v = Number;
var y = String;
var b = Math.abs;
var x = Math.round;
var w = Math.min;
var C = Math.max;
var S = Math.sqrt;
function k(e) {
  return e.reduce(function (e, t) {
    if (t) {
      return [w(e[0], t[0]), w(e[1], t[1]), C(e[2], t[2]), C(e[3], t[3])];
    } else {
      return e;
    }
  }, e[0]);
}
function D(e, t) {
  return (e[t] || {}).name;
}
function I() {}
function T(e) {
  this.raw = e;
}
function E(e) {
  this.raw = e;
}
function O(e) {
  return _(e.features);
}
function A(e) {
  e.text.attr({
    visibility: e.size[0] / e.spaceSize[0] < 1 && e.size[1] / e.spaceSize[1] < 1 ? null : "hidden"
  });
}
function P(e) {
  e.text.attr({
    visibility: e.size[0] / e.spaceSize[0] < 1 || e.size[1] / e.spaceSize[1] < 1 ? null : "hidden"
  });
}
function M(e, t) {
  return e.attribute(t);
}
I.prototype.count = function () {
  return 0;
};
T.prototype = {
  constructor: T,
  count: function () {
    return this.raw.length;
  },
  item: function (e) {
    return this.raw[e];
  },
  geometry: function (e) {
    return {
      coordinates: e.coordinates
    };
  },
  attributes: function (e) {
    return e.attributes;
  },
  getBBox: function (e) {
    if (arguments.length === 0) {
      return undefined;
    } else {
      return this.raw[e].bbox;
    }
  }
};
E.prototype = {
  constructor: E,
  count: function () {
    return this.raw.features.length;
  },
  item: function (e) {
    return this.raw.features[e];
  },
  geometry: function (e) {
    return e.geometry;
  },
  attributes: function (e) {
    return e.properties;
  },
  getBBox: function (e) {
    if (arguments.length === 0) {
      return this.raw.bbox;
    } else {
      return this.raw.features[e].bbox;
    }
  }
};
var R = {
  Point: "marker",
  MultiPoint: "line",
  LineString: "line",
  MultiLineString: "line",
  Polygon: "area",
  MultiPolygon: "area"
};
function B(e, t) {
  if (e !== undefined) {
    return e;
  } else {
    return t;
  }
}
var L;
var V;
var F = {
  setup: c,
  reset: c,
  arrange: c,
  updateGrouping: c,
  getDefaultColor: c
};
var H = {};
var N = {};
var z = {};
function j(e, t) {
  var n;
  var i = (0, d.normalizeEnum)(e.type);
  var o = (0, d.normalizeEnum)(e.elementType);
  var a = h({}, F);
  if (t.count() > 0) {
    n = t.geometry(t.item(0));
    i = H[i] ? i : function (e) {
      var t = R[e.type];
      var n = e.coordinates;
      t ||= typeof n[0] == "number" ? "marker" : typeof n[0][0] == "number" ? "line" : "area";
      return t;
    }(n);
    h(a, H[i]);
    a.fullType = a.type = i;
    if (N[i]) {
      h(a, N[i](n));
    }
    if (z[i]) {
      o = z[i][o] ? o : z[i]._default;
      h(a, z[i][o]);
      a.elementType = o;
      a.fullType += ":" + o;
    }
  }
  return a;
}
function W(e, t, n, i) {
  e[i].attr(t[i][n]);
}
function G(e, t) {
  var n;
  var i = [];
  var o = i.length = t.length;
  for (n = 0; n < o; ++n) {
    i[n] = e.project(t[n]);
  }
  return i;
}
function q(e, t) {
  return [G(e, t)];
}
function $(e, t) {
  var n;
  var i = [];
  var o = i.length = t.length;
  for (n = 0; n < o; ++n) {
    i[n] = G(e, t[n]);
  }
  return i;
}
function U(e, t) {
  var n;
  var i;
  var o = [];
  var a = t.length;
  var r = 0;
  o.length = a * 2;
  n = 0;
  for (; n < a; ++n) {
    i = e.transform(t[n]);
    o[r++] = i[0];
    o[r++] = i[1];
  }
  return o;
}
function K(e, t, n) {
  var i;
  var o = [];
  var a = o.length = n.length;
  for (i = 0; i < a; ++i) {
    o[i] = U(t, n[i]);
  }
  e.root.attr({
    points: o
  });
}
function Z(e, t, n) {
  var i = Q(e.settings, n);
  (function (e, t, n) {
    f(e, function (e, i) {
      var o = Y(i.callback(t, i.field), i.partition);
      if (o >= 0) {
        n[e] = i.values[o];
      }
    });
  })(e.grouping, t, i);
  if (n.color === undefined && n.paletteIndex >= 0) {
    i.color = i._colors[n.paletteIndex];
  }
  return i;
}
function Y(e, t) {
  var n;
  var i = 0;
  var o = t.length - 1;
  var a = -1;
  if (t[i] <= e && e <= t[o]) {
    if (e === t[o]) {
      a = o - 1;
    } else {
      while (o - i > 1) {
        if (e < t[n = i + o >> 1]) {
          o = n;
        } else {
          i = n;
        }
      }
      a = i;
    }
  }
  return a;
}
function X(e, t, n, i) {
  e.params.eventTrigger(i, {
    target: t.proxy,
    state: n
  });
}
function Q(e, t) {
  var n = h({}, e, t);
  n.label = h({}, e.label, n.label);
  n.label.font = h({}, e.label.font, n.label.font);
  return n;
}
function J(e, t) {
  return e.attribute(t);
}
H.area = {
  projectLabel: function (e) {
    var t;
    var n;
    var i;
    var o = e.length;
    var a = 0;
    for (t = 0; t < o; ++t) {
      if ((n = re(e[t])).area > a) {
        a = n.area;
        i = n;
      }
    }
    if (i) {
      return [i.center, [S(i.area), S(i.area)]];
    } else {
      return [[], []];
    }
  },
  transform: K,
  transformLabel: function (e, t, n) {
    var i = t.transform(n[0]);
    e.spaceSize = t.getSquareSize(n[1]);
    e.text.attr({
      translateX: i[0],
      translateY: i[1]
    });
    A(e);
  },
  draw: function (e, t, n) {
    t.root = e.renderer.path([], "area").data(e.dataKey, n);
  },
  refresh: c,
  getLabelOffset: function (e) {
    A(e);
    return [0, 0];
  },
  getStyles: function (e) {
    var t = e.color || null;
    var n = e.borderColor || null;
    var i = B(e.borderWidth, null);
    var o = B(e.opacity, null);
    return {
      root: [{
        class: "dxm-area",
        stroke: n,
        "stroke-width": i,
        fill: t,
        opacity: o
      }, {
        class: "dxm-area dxm-area-hovered",
        stroke: e.hoveredBorderColor || n,
        "stroke-width": B(e.hoveredBorderWidth, i),
        fill: e.hoveredColor || t,
        opacity: B(e.hoveredOpacity, o)
      }, {
        class: "dxm-area dxm-area-selected",
        stroke: e.selectedBorderColor || n,
        "stroke-width": B(e.selectedBorderWidth, i),
        fill: e.selectedColor || t,
        opacity: B(e.selectedOpacity, o)
      }]
    };
  },
  setState: function (e, t, n) {
    W(e, t, n, "root");
  },
  hasLabelsGroup: true,
  updateGrouping: function (e) {
    L(e);
  },
  getDefaultColor: c
};
H.line = {
  projectLabel: function (e) {
    var t;
    var n;
    var i;
    var o = e.length;
    var a = 0;
    for (t = 0; t < o; ++t) {
      if ((n = se(e[t]))[2] > a) {
        a = n[2];
        i = n;
      }
    }
    return i || [[], []];
  },
  transform: K,
  transformLabel: function (e, t, n) {
    var i = t.transform(n[0]);
    e.spaceSize = t.getSquareSize(n[1]);
    e.text.attr({
      translateX: i[0],
      translateY: i[1]
    });
    P(e);
  },
  draw: function (e, t, n) {
    t.root = e.renderer.path([], "line").data(e.dataKey, n);
  },
  refresh: c,
  getLabelOffset: function (e) {
    P(e);
    return [0, 0];
  },
  getStyles: function (e) {
    var t = e.color || e.borderColor || null;
    var n = B(e.borderWidth, null);
    var i = B(e.opacity, null);
    return {
      root: [{
        class: "dxm-line",
        stroke: t,
        "stroke-width": n,
        opacity: i
      }, {
        class: "dxm-line dxm-line-hovered",
        stroke: e.hoveredColor || e.hoveredBorderColor || t,
        "stroke-width": B(e.hoveredBorderWidth, n),
        opacity: B(e.hoveredOpacity, i)
      }, {
        class: "dxm-line dxm-line-selected",
        stroke: e.selectedColor || e.selectedBorderColor || t,
        "stroke-width": B(e.selectedBorderWidth, n),
        opacity: B(e.selectedOpacity, i)
      }]
    };
  },
  setState: function (e, t, n) {
    W(e, t, n, "root");
  },
  hasLabelsGroup: true,
  updateGrouping: function (e) {
    L(e);
  },
  getDefaultColor: c
};
H.marker = {
  project: function (e, t) {
    return e.project(t);
  },
  transform: function (e, t, n) {
    var i = t.transform(n);
    e.root.attr({
      translateX: i[0],
      translateY: i[1]
    });
  },
  draw: function (e, t, n) {
    t.root = e.renderer.g();
    this._draw(e, t, n);
  },
  refresh: c,
  hasLabelsGroup: false,
  getLabelOffset: function (e, t) {
    return [x((e.size[0] + C(t.size || 0, 0)) / 2) + 2, 0];
  },
  getStyles: function (e) {
    var t = {
      root: [{
        class: "dxm-marker"
      }, {
        class: "dxm-marker dxm-marker-hovered"
      }, {
        class: "dxm-marker dxm-marker-selected"
      }]
    };
    this._getStyles(t, e);
    return t;
  },
  setState: function (e, t, n) {
    W(e, t, n, "root");
    this._setState(e, t, n);
  },
  updateGrouping: function (e) {
    L(e);
    V(e);
  },
  getDefaultColor: function (e, t) {
    return e.params.themeManager.getAccentColor(t);
  }
};
N.area = function (e) {
  return {
    project: function (e, t) {
      if (t[0] && t[0][0] && t[0][0][0] && typeof t[0][0][0][0] == "number") {
        return function (e, t) {
          var n;
          var i = [];
          var o = i.length = t.length;
          for (n = 0; n < o; ++n) {
            i[n] = $(e, t[n]);
          }
          return p.apply([], i);
        }(e, t);
      } else {
        return $(e, t);
      }
    }
  };
};
N.line = function (e) {
  var t = e.coordinates;
  return {
    project: t[0] && t[0][0] && typeof t[0][0][0] == "number" ? $ : q
  };
};
z.marker = {
  _default: "dot",
  dot: {
    setup: function (e) {
      e.filter = e.renderer.shadowFilter("-40%", "-40%", "180%", "200%", 0, 1, 1, "#000000", 0.2);
    },
    reset: function (e) {
      e.filter.dispose();
      e.filter = null;
    },
    _draw: function (e, t, n) {
      t.back = e.renderer.circle().sharp().data(e.dataKey, n).append(t.root);
      t.dot = e.renderer.circle().sharp().data(e.dataKey, n).append(t.root);
    },
    refresh: function (e, t, n, i, o) {
      t.dot.attr({
        filter: o.shadow ? e.filter.id : null
      });
    },
    _getStyles: function (e, t) {
      var n = t.size > 0 ? v(t.size) : 0;
      var i = n;
      var o = n + (t.selectedStep > 0 ? v(t.selectedStep) : 0);
      var a = i + (t.backStep > 0 ? v(t.backStep) : 0);
      var r = o + (t.backStep > 0 ? v(t.backStep) : 0);
      var s = t.color || null;
      var l = t.borderColor || null;
      var u = B(t.borderWidth, null);
      var d = B(t.opacity, null);
      var c = t.backColor || null;
      var h = B(t.backOpacity, null);
      e.dot = [{
        r: n / 2,
        stroke: l,
        "stroke-width": u,
        fill: s,
        opacity: d
      }, {
        r: i / 2,
        stroke: t.hoveredBorderColor || l,
        "stroke-width": B(t.hoveredBorderWidth, u),
        fill: t.hoveredColor || s,
        opacity: B(t.hoveredOpacity, d)
      }, {
        r: o / 2,
        stroke: t.selectedBorderColor || l,
        "stroke-width": B(t.selectedBorderWidth, u),
        fill: t.selectedColor || s,
        opacity: B(t.selectedOpacity, d)
      }];
      e.back = [{
        r: n / 2,
        stroke: "none",
        "stroke-width": 0,
        fill: c,
        opacity: h
      }, {
        r: a / 2,
        stroke: "none",
        "stroke-width": 0,
        fill: c,
        opacity: h
      }, {
        r: r / 2,
        stroke: "none",
        "stroke-width": 0,
        fill: c,
        opacity: h
      }];
    },
    _setState: function (e, t, n) {
      W(e, t, n, "dot");
      W(e, t, n, "back");
    }
  },
  bubble: {
    _draw: function (e, t, n) {
      t.bubble = e.renderer.circle().sharp().data(e.dataKey, n).append(t.root);
    },
    refresh: function (e, t, n, i, o) {
      t.bubble.attr({
        r: o.size / 2
      });
    },
    _getStyles: function (e, t) {
      var n = t.color || null;
      var i = t.borderColor || null;
      var o = B(t.borderWidth, null);
      var a = B(t.opacity, null);
      e.bubble = [{
        stroke: i,
        "stroke-width": o,
        fill: n,
        opacity: a
      }, {
        stroke: t.hoveredBorderColor || i,
        "stroke-width": B(t.hoveredBorderWidth, o),
        fill: t.hoveredColor || t.color,
        opacity: B(t.hoveredOpacity, a)
      }, {
        stroke: t.selectedBorderColor || i,
        "stroke-width": B(t.selectedBorderWidth, o),
        fill: t.selectedColor || t.color,
        opacity: B(t.selectedOpacity, a)
      }];
    },
    _setState: function (e, t, n) {
      W(e, t, n, "bubble");
    },
    arrange: function (e, t) {
      var n;
      var i = [];
      var o = i.length = t.length;
      var a = e.settings;
      var r = a.dataField;
      var s = a.minSize > 0 ? v(a.minSize) : 0;
      var l = a.maxSize > s ? v(a.maxSize) : s;
      if (!a.sizeGroups) {
        for (n = 0; n < o; ++n) {
          i[n] = C(M(t[n].proxy, r) || 0, 0);
        }
        var u = w.apply(null, i);
        var d = C.apply(null, i) - u || 1;
        var c = l - s;
        for (n = 0; n < o; ++n) {
          t[n]._settings.size = s + c * (i[n] - u) / d;
        }
      }
    },
    updateGrouping: function (e) {
      var t = e.settings.dataField;
      H.marker.updateGrouping(e);
      V(e, function (e) {
        return M(e, t);
      });
    }
  },
  pie: {
    _draw: function (e, t, n) {
      t.pie = e.renderer.g().append(t.root);
      t.border = e.renderer.circle().sharp().data(e.dataKey, n).append(t.root);
    },
    refresh: function (e, t, n, i, o) {
      var a = M(i, e.settings.dataField) || [];
      var r = o._colors;
      var s = 0;
      var l = t.pie;
      var u = e.renderer;
      var d = e.dataKey;
      var c = (o.size > 0 ? v(o.size) : 0) / 2;
      var h = 90;
      var f = h;
      var p = false;
      if ((s = a.reduce(function (e, t) {
        return e + (t || 0);
      }, 0)) === 0) {
        p = true;
        s = 360 / a.length;
      }
      a.forEach(function (e, t) {
        h = f;
        f += p ? s : (e || 0) / s * 360;
        u.arc(0, 0, 0, c, h, f).attr({
          "stroke-linejoin": "round",
          fill: r[t]
        }).data(d, n).append(l);
      });
      t.border.attr({
        r: c
      });
    },
    _getStyles: function (e, t) {
      var n = B(t.opacity, null);
      var i = t.borderColor || null;
      var o = B(t.borderWidth, null);
      e.pie = [{
        opacity: n
      }, {
        opacity: B(t.hoveredOpacity, n)
      }, {
        opacity: B(t.selectedOpacity, n)
      }];
      e.border = [{
        stroke: i,
        "stroke-width": o
      }, {
        stroke: t.hoveredBorderColor || i,
        "stroke-width": B(t.hoveredBorderWidth, o)
      }, {
        stroke: t.selectedBorderColor || i,
        "stroke-width": B(t.selectedBorderWidth, o)
      }];
    },
    _setState: function (e, t, n) {
      W(e, t, n, "pie");
      W(e, t, n, "border");
    },
    arrange: function (e, t) {
      var n;
      var i;
      var o = t.length;
      var a = e.settings.dataField;
      var r = 0;
      for (n = 0; n < o; ++n) {
        if ((i = M(t[n].proxy, a)) && i.length > r) {
          r = i.length;
        }
      }
      if (r > 0) {
        i = e.params.themeManager.createPalette(e.settings.palette, {
          useHighlight: true,
          extensionMode: "alternate"
        }).generateColors(r);
        e.settings._colors = i;
        e.grouping.color = {
          callback: c,
          field: "",
          partition: [],
          values: []
        };
        e.params.dataExchanger.set(e.name, "color", {
          partition: [],
          values: i
        });
      }
    }
  },
  image: {
    _draw: function (e, t, n) {
      t.image = e.renderer.image(null, null, null, null, null, "center").attr({
        "pointer-events": "visible"
      }).data(e.dataKey, n).append(t.root);
    },
    refresh: function (e, t, n, i) {
      t.image.attr({
        href: M(i, e.settings.dataField)
      });
    },
    _getStyles: function (e, t) {
      var n = t.size > 0 ? v(t.size) : 0;
      var i = n + (t.hoveredStep > 0 ? v(t.hoveredStep) : 0);
      var o = n + (t.selectedStep > 0 ? v(t.selectedStep) : 0);
      var a = B(t.opacity, null);
      e.image = [{
        x: -n / 2,
        y: -n / 2,
        width: n,
        height: n,
        opacity: a
      }, {
        x: -i / 2,
        y: -i / 2,
        width: i,
        height: i,
        opacity: B(t.hoveredOpacity, a)
      }, {
        x: -o / 2,
        y: -o / 2,
        width: o,
        height: o,
        opacity: B(t.selectedOpacity, a)
      }];
    },
    _setState: function (e, t, n) {
      W(e, t, n, "image");
    }
  }
};
var ee;
function te(e, t, n, i, o) {
  var a;
  if (i && t && t.length > 1) {
    a = o(t.length - 1);
    e.grouping[n] = {
      callback: (0, l.isFunction)(i) ? i : J,
      field: i,
      partition: t,
      values: a
    };
    e.params.dataExchanger.set(e.name, n, {
      partition: t,
      values: a,
      defaultColor: e.settings.color
    });
  }
}
function ne(e) {
  var t = e.name;
  var n = e.params.dataExchanger;
  f(e.grouping, function (e) {
    n.set(t, e, null);
  });
  e.grouping = {};
}
function ie(e, t, n) {
  if (n) {
    e |= t;
  } else {
    e &= ~t;
  }
  return e;
}
function oe(e, t) {
  return !!(e & t);
}
L = function (e) {
  te(e, e.settings.colorGroups, "color", e.settings.colorGroupingField, function (t) {
    var n;
    var i = e.params.themeManager.createDiscretePalette(e.settings.palette, t);
    var o = [];
    for (n = 0; n < t; ++n) {
      o.push(i.getColor(n));
    }
    return o;
  });
};
V = function (e, t) {
  var n = e.settings;
  te(e, n.sizeGroups, "size", t || n.sizeGroupingField, function (e) {
    var t = n.minSize > 0 ? v(n.minSize) : 0;
    var i = n.maxSize >= t ? v(n.maxSize) : 0;
    var o = 0;
    var a = [];
    if (e > 1) {
      for (o = 0; o < e; ++o) {
        a.push((t * (e - o - 1) + i * o) / (e - 1));
      }
    } else if (e === 1) {
      a.push((t + i) / 2);
    }
    return a;
  });
};
function ae(e, t, n, i) {
  this._params = e;
  this._onProjection();
  this.proxy = function (e, t, n) {
    var i = {
      index: n,
      name: t,
      getElements: function () {
        return e.getProxies();
      },
      clearSelection: function (t) {
        e.clearSelection(t);
        return i;
      },
      getDataSource: function () {
        return e.getDataSource();
      },
      getBounds: function () {
        return e.getBounds();
      }
    };
    return i;
  }(this, n, i);
  this._context = {
    name: n,
    layer: this.proxy,
    renderer: e.renderer,
    projection: e.projection,
    params: e,
    dataKey: e.dataKey,
    str: F,
    hover: false,
    selection: null,
    grouping: {},
    root: e.renderer.g().attr({
      class: "dxm-layer"
    }).linkOn(t, n).linkAppend()
  };
  this._container = t;
  this._options = {};
  this._handles = [];
  this._data = new I();
  this._dataSourceLoaded = null;
}
function re(e) {
  var t;
  var n;
  var i;
  var o = e.length;
  var a = e[o - 1];
  var r = 0;
  var s = 0;
  var l = 0;
  var u = Infinity;
  var d = -Infinity;
  var c = Infinity;
  var h = -Infinity;
  for (t = 0; t < o; ++t) {
    n = a;
    a = e[t];
    l += i = n[0] * a[1] - a[0] * n[1];
    r += (n[0] + a[0]) * i;
    s += (n[1] + a[1]) * i;
    u = w(u, a[0]);
    d = C(d, a[0]);
    c = w(c, a[1]);
    h = C(h, a[1]);
  }
  return {
    area: b(l) / 2,
    center: [r * 2 / 3 / l - (u + d) / 2, s * 2 / 3 / l - (c + h) / 2]
  };
}
function se(e) {
  var t;
  var n;
  var i = e.length;
  var o = e[0] || [];
  var a = 0;
  var r = [0];
  var s = o[0];
  var l = o[0];
  var u = o[1];
  var d = o[1];
  for (t = 1; t < i; ++t) {
    n = o;
    o = e[t];
    a += S((n[0] - o[0]) * (n[0] - o[0]) + (n[1] - o[1]) * (n[1] - o[1]));
    r[t] = a;
    s = w(s, o[0]);
    l = C(l, o[0]);
    u = w(u, o[1]);
    d = C(d, o[1]);
  }
  n = e[t = Y(a / 2, r)];
  o = e[t + 1];
  var c = (a / 2 - r[t]) / (r[t + 1] - r[t]);
  if (i) {
    return [[n[0] * (1 - c) + o[0] * c, n[1] * (1 - c) + o[1] * c], [l - s, d - u], a];
  } else {
    return [];
  }
}
function le(e) {
  var t = e.renderer;
  this._params = e;
  this._layers = [];
  this._layerByName = {};
  this._rect = [0, 0, 0, 0];
  this._clip = t.clipRect();
  this._background = t.rect().attr({
    class: "dxm-background"
  }).data(e.dataKey, {
    name: "background"
  }).append(t.root);
  this._container = t.g().attr({
    class: "dxm-layers",
    "clip-path": this._clip.id
  }).append(t.root).enableLinks();
  this._subscribeToTracker(e.tracker, t, e.eventTrigger);
  this._dataReady = e.dataReady;
}
ae.prototype = h({
  constructor: ae,
  getDataReadyCallback: function () {
    return this._dataSourceLoaded;
  },
  _onProjection: function () {
    var e = this;
    e._removeHandlers = e._params.projection.on({
      engine: function () {
        e._project();
      },
      screen: function () {
        e._transform();
      },
      center: function () {
        e._transformCore();
      },
      zoom: function () {
        e._transform();
      }
    });
  },
  getData: function () {
    return this._data;
  },
  _dataSourceLoadErrorHandler: function () {
    this._dataSourceChangedHandler();
  },
  _dataSourceChangedHandler: function () {
    var e;
    var t;
    this._data = ((e = this._dataSource && this._dataSource.items()) && (O(e) ? t = E : e.length === 1 && e[0] && O(e[0]) ? (t = E, e = e[0]) : _(e) && (t = T)), new (t = t || I)(e));
    this._update(true);
  },
  _dataSourceOptions: function () {
    return {
      paginate: false
    };
  },
  _getSpecificDataSourceOption: function () {
    return this._specificDataSourceOption;
  },
  _normalizeDataSource: function (e) {
    var t = e.store();
    if (t._loadMode === "raw") {
      t._loadMode = undefined;
    }
    return e;
  },
  _offProjection: function () {
    this._removeHandlers();
    this._removeHandlers = null;
  },
  dispose: function () {
    this._disposeDataSource();
    this._destroyHandles();
    ne(this._context);
    this._context.root.linkRemove().linkOff();
    if (this._context.labelRoot) {
      this._context.labelRoot.linkRemove().linkOff();
    }
    this._context.str.reset(this._context);
    this._offProjection();
    this._params = this._container = this._context = this.proxy = null;
    return this;
  },
  setOptions: function (e) {
    var t;
    e = this._options = e || {};
    this._dataSourceLoaded = new u.Deferred();
    if ("dataSource" in e && e.dataSource !== this._options_dataSource) {
      this._options_dataSource = e.dataSource;
      this._params.notifyDirty();
      this._specificDataSourceOption = (t = e.dataSource) ? O(t) ? [t] : t : [];
      this._refreshDataSource();
    } else if (this._data.count() > 0) {
      this._params.notifyDirty();
      this._update(e.type !== undefined && e.type !== this._context.str.type || e.elementType !== undefined && e.elementType !== this._context.str.elementType);
    }
    this._transformCore();
  },
  _update: function (e) {
    var t;
    var n;
    var i = this._context;
    if (e) {
      i.str.reset(i);
      i.root.clear();
      if (i.labelRoot) {
        i.labelRoot.clear();
      }
      this._params.tracker.reset();
      this._destroyHandles();
      i.str = j(this._options, this._data);
      i.str.setup(i);
      this.proxy.type = i.str.type;
      this.proxy.elementType = i.str.elementType;
    }
    i.settings = function (e, t) {
      var n;
      var i;
      var o;
      var a = e.params.themeManager;
      var r = e.str;
      var s = Q(h({
        label: {},
        color: r.getDefaultColor(e, t.palette)
      }, a.theme("layer:" + r.fullType)), t);
      if (s.paletteSize > 0) {
        o = a.createDiscretePalette(s.palette, s.paletteSize);
        i = 0;
        n = [];
        for (; i < s.paletteSize; ++i) {
          n.push(o.getColor(i));
        }
        s._colors = n;
      }
      return s;
    }(i, this._options);
    i.hasSeparateLabel = !!i.settings.label.enabled && !!i.str.hasLabelsGroup;
    i.hover = !!(0, d.parseScalar)(i.settings.hoverEnabled, true);
    if (i.selection) {
      f(i.selection.state, function (e, t) {
        if (t) {
          t.resetSelected();
        }
      });
    }
    t = i.settings.selectionMode;
    if ((n = (n = (0, d.normalizeEnum)(t)) in m ? m[n] : m.single) !== null) {
      n = {
        state: {},
        single: n
      };
    }
    i.selection = n;
    if (i.hasSeparateLabel) {
      if (!i.labelRoot) {
        i.labelRoot = i.renderer.g().attr({
          class: "dxm-layer-labels"
        }).linkOn(this._container, {
          name: i.name + "-labels",
          after: i.name
        }).linkAppend();
        this._transformCore();
      }
    } else if (i.labelRoot) {
      i.labelRoot.linkRemove().linkOff();
      i.labelRoot = null;
    }
    if (e) {
      this._createHandles();
    }
    ne(i);
    i.str.arrange(i, this._handles);
    i.str.updateGrouping(i);
    this._updateHandles();
    this._params.notifyReady();
    if (this._dataSourceLoaded) {
      this._dataSourceLoaded.resolve();
      this._dataSourceLoaded = null;
    } else {
      this._params.dataReady();
    }
  },
  getBounds: function () {
    return k(this._handles.map(function (e) {
      return e.proxy.coordinates().map(function (e) {
        if (_(e)) {
          var t = _(e[0][0]) ? e.reduce(function (e, t) {
            return e.concat(t);
          }, []) : e;
          var n = t[0];
          return t.reduce(function (e, t) {
            return [w(e[0], t[0]), w(e[1], t[1]), C(e[2], t[0]), C(e[3], t[1])];
          }, [n[0], n[1], n[0], n[1]]);
        }
      });
    }).map(k));
  },
  _destroyHandles: function () {
    this._handles.forEach(function (e) {
      return e.dispose();
    });
    if (this._context.selection) {
      this._context.selection.state = {};
    }
    this._handles = [];
  },
  _createHandles: function () {
    var e;
    var t;
    var n;
    var i;
    var o;
    var a;
    var r = this._handles = [];
    var s = this._data;
    var u = r.length = s.count();
    var d = this._context;
    var c = s.geometry;
    var h = s.attributes;
    for (e = 0; e < u; ++e) {
      n = s.item(e);
      r[e] = new ee(d, e, c(n), h(n));
    }
    if ((0, l.isFunction)(this._options.customize)) {
      i = this.getProxies();
      o = this._options.customize;
      a = this._params.widget;
      o.call(a, i);
    }
    e = 0;
    for (; e < u; ++e) {
      (t = r[e]).project();
      t.draw();
      t.transform();
    }
    if (d.selection) {
      f(d.selection.state, function (e, t) {
        if (t) {
          t.restoreSelected();
        }
      });
    }
  },
  _updateHandles: function () {
    var e;
    var t = this._handles;
    var n = t.length;
    for (e = 0; e < n; ++e) {
      t[e].refresh();
    }
    if (this._context.settings.label.enabled) {
      for (e = 0; e < n; ++e) {
        t[e].measureLabel();
      }
      for (e = 0; e < n; ++e) {
        t[e].adjustLabel();
      }
    }
  },
  _transformCore: function () {
    var e = this._params.projection.getTransform();
    this._context.root.attr(e);
    if (this._context.labelRoot) {
      this._context.labelRoot.attr(e);
    }
  },
  _project: function () {
    var e;
    var t = this._handles;
    var n = t.length;
    for (e = 0; e < n; ++e) {
      t[e].project();
    }
  },
  _transform: function () {
    var e;
    var t = this._handles;
    var n = t.length;
    this._transformCore();
    e = 0;
    for (; e < n; ++e) {
      t[e].transform();
    }
  },
  getProxies: function () {
    return this._handles.map(function (e) {
      return e.proxy;
    });
  },
  getProxy: function (e) {
    return this._handles[e].proxy;
  },
  raiseClick: function (e, t) {
    this._params.eventTrigger("click", {
      target: this._handles[e].proxy,
      event: t
    });
  },
  hoverItem: function (e, t) {
    this._handles[e].setHovered(t);
  },
  selectItem: function (e, t, n) {
    this._handles[e].setSelected(t, n);
  },
  clearSelection: function () {
    var e = this._context.selection;
    if (e) {
      f(e.state, function (e, t) {
        if (t) {
          t.setSelected(false);
        }
      });
      e.state = {};
    }
  }
}, s.default);
(ee = function (e, t, n, i) {
  var o = this.proxy = function (e, t, n) {
    var i = {
      coordinates: function () {
        return t;
      },
      attribute: function (e, t) {
        if (arguments.length > 1) {
          n[e] = t;
          return i;
        } else if (arguments.length > 0) {
          return n[e];
        } else {
          return n;
        }
      },
      selected: function (t, n) {
        if (arguments.length > 0) {
          e.setSelected(t, n);
          return i;
        } else {
          return e.isSelected();
        }
      },
      applySettings: function (t) {
        e.update(t);
        return i;
      }
    };
    return i;
  }(this, n.coordinates, h({}, i));
  this._ctx = e;
  this._index = t;
  this._fig = this._label = null;
  this._state = 0;
  this._coordinates = n.coordinates;
  this._settings = {
    label: {}
  };
  o.index = t;
  o.layer = e.layer;
  this._data = {
    name: e.name,
    index: t
  };
}).prototype = {
  constructor: ee,
  dispose: function () {
    this._ctx = this.proxy = this._settings = this._fig = this._label = this.data = null;
    return this;
  },
  project: function () {
    var e = this._ctx;
    this._projection = e.str.project(e.projection, this._coordinates);
    if (e.hasSeparateLabel && this._label) {
      this._projectLabel();
    }
  },
  _projectLabel: function () {
    this._labelProjection = this._ctx.str.projectLabel(this._projection);
  },
  draw: function () {
    var e = this._ctx;
    e.str.draw(e, this._fig = {}, this._data);
    this._fig.root.append(e.root);
  },
  transform: function () {
    var e = this._ctx;
    e.str.transform(this._fig, e.projection, this._projection);
    if (e.hasSeparateLabel && this._label) {
      this._transformLabel();
    }
  },
  _transformLabel: function () {
    this._ctx.str.transformLabel(this._label, this._ctx.projection, this._labelProjection);
  },
  refresh: function () {
    var e = this._ctx.str;
    var t = Z(this._ctx, this.proxy, this._settings);
    this._styles = e.getStyles(t);
    e.refresh(this._ctx, this._fig, this._data, this.proxy, t);
    this._refreshLabel(t);
    this._setState();
  },
  _refreshLabel: function (e) {
    var t = this._ctx;
    var n = e.label;
    var i = this._label;
    if (t.settings.label.enabled) {
      if (!i) {
        i = this._label = {
          root: t.labelRoot || this._fig.root,
          text: t.renderer.text().attr({
            class: "dxm-label"
          }),
          size: [0, 0]
        };
        if (t.hasSeparateLabel) {
          this._projectLabel();
          this._transformLabel();
        }
      }
      i.value = y(this.proxy.text || this.proxy.attribute(n.dataField) || "");
      if (i.value) {
        i.text.attr({
          text: i.value,
          x: 0,
          y: 0
        }).css((0, d.patchFontOptions)(n.font)).attr({
          align: "center",
          stroke: n.stroke,
          "stroke-width": n["stroke-width"],
          "stroke-opacity": n["stroke-opacity"]
        }).data(t.dataKey, this._data).append(i.root);
        i.settings = e;
      }
    } else if (i) {
      i.text.remove();
      this._label = null;
    }
  },
  measureLabel: function () {
    var e;
    var t = this._label;
    if (t.value) {
      e = t.text.getBBox();
      t.size = [e.width, e.height, -e.y - e.height / 2];
    }
  },
  adjustLabel: function () {
    var e;
    var t = this._label;
    if (t.value) {
      e = this._ctx.str.getLabelOffset(t, t.settings);
      t.settings = null;
      t.text.attr({
        x: e[0],
        y: e[1] + t.size[2]
      });
    }
  },
  update: function (e) {
    this._settings = Q(this._settings, e);
    if (this._fig) {
      this.refresh();
      if (this._label && this._label.value) {
        this.measureLabel();
        this.adjustLabel();
      }
    }
  },
  _setState: function () {
    this._ctx.str.setState(this._fig, this._styles, g[this._state]);
  },
  _setForeground: function () {
    var e = this._fig.root;
    if (this._state) {
      e.toForeground();
    } else {
      e.toBackground();
    }
  },
  setHovered: function (e) {
    var t = oe(this._state, 1);
    var n = !!e;
    if (this._ctx.hover && t !== n) {
      this._state = ie(this._state, 1, n);
      this._setState();
      this._setForeground();
      X(this._ctx, this, n, "hoverChanged");
    }
    return this;
  },
  setSelected: function (e, t) {
    var n;
    var i = oe(this._state, 2);
    var o = !!e;
    var a = this._ctx.selection;
    if (a && i !== o) {
      this._state = ie(this._state, 2, o);
      n = a.state[a.single];
      a.state[a.single] = null;
      if (n) {
        n.setSelected(false);
      }
      a.state[a.single || this._index] = e ? this : null;
      if (this._fig) {
        this._setState();
        this._setForeground();
        if (!t) {
          X(this._ctx, this, o, "selectionChanged");
        }
      }
    }
  },
  isSelected: function () {
    return oe(this._state, 2);
  },
  resetSelected: function () {
    this._state = ie(this._state, 2, false);
  },
  restoreSelected: function () {
    this._fig.root.toForeground();
  }
};
le.prototype = {
  constructor: le,
  dispose: function () {
    this._clip.dispose();
    this._layers.forEach(function (e) {
      return e.dispose();
    });
    this._offTracker();
    this._params = this._offTracker = this._layers = this._layerByName = this._clip = this._background = this._container = null;
  },
  _subscribeToTracker: function (e, t, n) {
    var i = this;
    i._offTracker = e.on({
      click: function (e) {
        var o = t.getRootOffset();
        var a = i.byName(e.data.name);
        e.$event.x = e.x - o.left;
        e.$event.y = e.y - o.top;
        if (a) {
          a.raiseClick(e.data.index, e.$event);
        } else if (e.data.name === "background") {
          n("click", {
            event: e.$event
          });
        }
      },
      "hover-on": function (e) {
        var t = i.byName(e.data.name);
        if (t) {
          t.hoverItem(e.data.index, true);
        }
      },
      "hover-off": function (e) {
        var t = i.byName(e.data.name);
        if (t) {
          t.hoverItem(e.data.index, false);
        }
      }
    });
  },
  setOptions: function (e) {
    var t;
    var n = e ? _(e) ? e : [e] : [];
    var i = this._layers;
    if (n.length !== i.length || i.some(function (e, t) {
      var i = D(n, t);
      return (0, l.isDefined)(i) && i !== e.proxy.name;
    })) {
      this._params.tracker.reset();
      this._layers.forEach(function (e) {
        return e.dispose();
      });
      var o = this._layerByName = {};
      this._layers = i = [];
      for (var a = 0, r = n.length; a < r; ++a) {
        var s = D(n, a) || "map-layer-" + a;
        var d = i[a] = new ae(this._params, this._container, s, a);
        o[s] = d;
      }
    }
    i.forEach(function (e, t) {
      e.setOptions(n[t]);
    });
    if ((t = i.map(function (e) {
      return e.getDataReadyCallback();
    })).length) {
      u.when.apply(undefined, t).done(this._dataReady);
    }
  },
  _updateClip: function () {
    var e = this._rect;
    var t = this._borderWidth;
    this._clip.attr({
      x: e[0] + t,
      y: e[1] + t,
      width: C(e[2] - t * 2, 0),
      height: C(e[3] - t * 2, 0)
    });
  },
  setBackgroundOptions: function (e) {
    this._background.attr({
      stroke: e.borderColor,
      "stroke-width": e.borderWidth,
      fill: e.color
    });
    this._borderWidth = C(e.borderWidth, 0);
    this._updateClip();
  },
  setRect: function (e) {
    this._rect = e;
    this._background.attr({
      x: e[0],
      y: e[1],
      width: e[2],
      height: e[3]
    });
    this._updateClip();
  },
  byIndex: function (e) {
    return this._layers[e];
  },
  byName: function (e) {
    return this._layerByName[e];
  },
  items: function () {
    return this._layers;
  }
};