exports.default = undefined;
var i = require("./95479.js");
var o = require("./3446.js");
var a = require("./35922.js");
var r = require("./19157.js");
var s = Number;
var l = Array.isArray;
var u = isFinite;
function d(e, t, n, i) {
  var o;
  if (n > e && i < t) {
    o = [{
      start: e,
      end: n
    }, {
      start: i,
      end: t
    }];
  } else if (n >= t || i <= e) {
    o = [{
      start: e,
      end: t
    }];
  } else if (n <= e && i >= t) {
    o = [];
  } else if (n > e) {
    o = [{
      start: e,
      end: n
    }];
  } else if (i < t) {
    o = [{
      start: i,
      end: t
    }];
  }
  return o;
}
function c(e, t, n, i) {
  var o;
  if (n < e && i > t) {
    o = [{
      start: e,
      end: n
    }, {
      start: i,
      end: t
    }];
  } else if (n <= t || i >= e) {
    o = [{
      start: e,
      end: t
    }];
  } else if (n >= e && i <= t) {
    o = [];
  } else if (n < e) {
    o = [{
      start: e,
      end: n
    }];
  } else if (i > t) {
    o = [{
      start: i,
      end: t
    }];
  }
  return o;
}
function h(e, t, n) {
  var i = n.startValue;
  return n.endValue === i && i === e && t === e;
}
function f(e, t, n) {
  return t - e > 0 || h(e, t, n);
}
function p(e, t, n) {
  return e - t > 0 || h(e, t, n);
}
var g = o.BaseElement.inherit({
  _init: function () {
    this._root = this._renderer.g().attr({
      class: "dxg-range-container"
    }).linkOn(this._container, "range-container");
  },
  _dispose: function () {
    this._root.linkOff();
  },
  clean: function () {
    this._root.linkRemove().clear();
    this._options = this.enabled = null;
    return this;
  },
  _getRanges: function () {
    var e;
    var t = this._options;
    var n = this._translator;
    var o = n.getDomain()[0];
    var h = n.getDomain()[1];
    var g = h - o;
    var m = g >= 0 ? f : p;
    var _ = g >= 0 ? d : c;
    var v = [];
    var y = [{
      start: o,
      end: h
    }];
    var b = (0, r.extractColor)(t.backgroundColor) || "none";
    var x = t.width || {};
    var w = s(x > 0 ? x : x.start);
    var C = s(x > 0 ? x : x.end);
    var S = C - w;
    if (t.ranges !== undefined && !l(t.ranges)) {
      return null;
    }
    if (!(w >= 0) || !(C >= 0) || !(w + C > 0)) {
      return null;
    }
    e = (l(t.ranges) ? t.ranges : []).reduce(function (e, t, i) {
      t = t || {};
      var o = n.adjust(t.startValue);
      var a = n.adjust(t.endValue);
      if (u(o) && u(a) && m(o, a, t)) {
        e.push({
          start: o,
          end: a,
          color: (0, r.extractColor)(t.color),
          classIndex: i
        });
      }
      return e;
    }, []);
    var k = this._themeManager.createPalette(t.palette, {
      type: "indicatingSet",
      extensionMode: t.paletteExtensionMode,
      keepLastColorInEnd: true,
      count: e.length
    });
    (0, i.each)(e, function (e, t) {
      var n = k.getNextColor();
      t.color = (0, a.isString)(t.color) && t.color || n || "none";
      t.className = "dxg-range dxg-range-" + t.classIndex;
      delete t.classIndex;
    });
    (0, i.each)(e, function (e, t) {
      var n;
      var i;
      var o;
      var a;
      var r;
      var s = [];
      var l = [];
      n = 0;
      i = v.length;
      for (; n < i; ++n) {
        r = v[n];
        if ((o = (a = _(r.start, r.end, t.start, t.end))[0]) && (o.color = r.color) && (o.className = r.className)) {
          s.push(o);
        }
        if ((o = a[1]) && (o.color = r.color) && (o.className = r.className)) {
          s.push(o);
        }
      }
      s.push(t);
      v = s;
      n = 0;
      i = y.length;
      for (; n < i; ++n) {
        r = y[n];
        if (o = (a = _(r.start, r.end, t.start, t.end))[0]) {
          l.push(o);
        }
        if (o = a[1]) {
          l.push(o);
        }
      }
      y = l;
    });
    (0, i.each)(y, function (e, t) {
      t.color = b;
      t.className = "dxg-range dxg-background-range";
      v.push(t);
    });
    (0, i.each)(v, function (e, t) {
      t.startWidth = (t.start - o) / g * S + w;
      t.endWidth = (t.end - o) / g * S + w;
    });
    return v;
  },
  render: function (e) {
    this._options = e;
    this._processOptions();
    this._ranges = this._getRanges();
    if (this._ranges) {
      this.enabled = true;
      this._root.linkAppend();
    }
    return this;
  },
  resize: function (e) {
    var t = this;
    t._root.clear();
    if (t._isVisible(e)) {
      (0, i.each)(t._ranges, function (n, i) {
        t._createRange(i, e).attr({
          fill: i.color,
          class: i.className
        }).append(t._root);
      });
    }
    return t;
  },
  _processOptions: null,
  _isVisible: null,
  _createRange: null,
  getColorForValue: function (e) {
    var t = null;
    (0, i.each)(this._ranges, function (n, i) {
      if (i.start <= e && e <= i.end || i.start >= e && e >= i.end) {
        t = i.color;
        return false;
      }
    });
    return t;
  }
});
exports.default = g;
module.exports = exports.default;
module.exports.default = exports.default;