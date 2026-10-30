exports.LayoutControl = h;
var i = require("./95479.js");
var o = Math.round;
var a = Math.min;
var r = Math.max;
var s = i.each;
var l = {
  left: 0,
  center: 1,
  right: 2
};
var u = {
  top: 0,
  bottom: 1
};
function d(e, t) {
  var n = (e.right - e.left) / 3;
  var i = (e.bottom - e.top) / 2;
  var a = e.left;
  var r = o(a + n);
  var d = o(a + n + n);
  var c = e.right;
  var h = e.top;
  var f = o(h + i);
  var p = e.bottom;
  var g = [{
    rect: [a, h, r, f]
  }, {
    rect: [r, h, d, f],
    center: true
  }, {
    rect: [d, h, c, f],
    horInversion: true
  }, {
    rect: [a, f, r, p],
    verInversion: true
  }, {
    rect: [r, f, d, p],
    center: true,
    verInversion: true
  }, {
    rect: [d, f, c, p],
    horInversion: true,
    verInversion: true
  }];
  var m = [[], [], [], [], [], []];
  s(t, function (e, t) {
    var n = t.getLayoutOptions();
    if (n) {
      m[function (e) {
        return u[e.verticalAlignment] * 3 + l[e.horizontalAlignment];
      }(n)].push({
        item: t,
        width: n.width,
        height: n.height
      });
    }
  });
  s(g, function (e, t) {
    if (m[e].length) {
      t.items = m[e];
    } else {
      if (t.center) {
        t.rect[0] = t.rect[2] = (t.rect[0] + t.rect[2]) / 2;
      } else {
        t.rect[t.horInversion ? 0 : 2] = t.rect[t.horInversion ? 2 : 0];
      }
      t.rect[t.verInversion ? 1 : 3] = t.rect[t.verInversion ? 3 : 1];
    }
  });
  return g;
}
function c(e, t) {
  var n = false;
  (function (e) {
    s([0, 1, 2, 3, 4, 5], function (t, n) {
      var i = e[n];
      var o = e[(n + 3) % 6];
      if (i.items) {
        if (!o.items) {
          i.rect[1] = a(i.rect[1], o.rect[3]);
          i.rect[3] = r(i.rect[3], o.rect[1]);
        }
      }
    });
    s([1, 4], function (t, n) {
      var i;
      var o;
      var a = e[n];
      var r = e[n - 1];
      var s = e[n + 1];
      if (a.items) {
        if (!r.items && !s.items) {
          if ((i = a.rect[0] - r.rect[2]) > (o = s.rect[0] - a.rect[2])) {
            if (i / o >= 2) {
              a.rect[0] -= i;
              a.right = true;
            } else {
              a.rect[0] -= o;
              a.rect[2] += o;
            }
          } else if (o / i >= 2) {
            a.rect[2] += o;
            a.center = null;
          } else {
            a.rect[0] -= i;
            a.rect[2] += i;
          }
        }
      } else {
        if (r.items) {
          r.rect[2] = (a.rect[0] + a.rect[2]) / 2;
        }
        if (s.items) {
          s.rect[0] = (a.rect[0] + a.rect[2]) / 2;
        }
      }
    });
  })(e);
  s(e, function (e, i) {
    if (i.items) {
      n = function (e, t) {
        var n = e.rect;
        var i = n[2] - n[0];
        var l = n[3] - n[1];
        var u = 0;
        var d = 0;
        var c = 0;
        var h = n[2];
        var f = n[3];
        var p = n[0];
        var g = n[1];
        var m = [];
        var _ = false;
        s(e.items, function (o, s) {
          if (s.width > i || s.height > l) {
            m.push(null);
            _ = true;
            return t || false;
          }
          if (u + s.width > i) {
            d += c;
            u = c = 0;
          }
          if (d + s.height > l) {
            m.push(null);
            _ = true;
            return t || false;
          }
          c = r(c, s.height);
          var v = e.horInversion ? n[2] - s.width - u : n[0] + u;
          var y = e.verInversion ? n[3] - s.height - d : n[1] + d;
          u += s.width;
          h = a(h, v);
          f = a(f, y);
          p = r(p, v + s.width);
          g = r(g, y + s.height);
          m.push([v, y]);
        });
        if (t || !_) {
          u = 0;
          if (e.right) {
            u = n[2] - n[0] - p + h;
          } else if (e.center) {
            u = o((n[2] - n[0] - p + h) / 2);
          }
          s(e.items, function (e, t) {
            var n = m[e];
            if (n) {
              t.item.locate(n[0] + u, n[1]);
            } else {
              t.item.resize(null);
            }
          });
          e.rect = [h, f, p, g];
          e.items = null;
        }
        return _;
      }(i, t) || n;
    }
  });
  return n;
}
function h(e) {
  var t = this;
  t._items = [];
  t._suspended = 0;
  t._widget = e;
  t._updateLayout = function () {
    t._update();
  };
}
h.prototype = {
  constructor: h,
  dispose: function () {
    this._items = this._updateLayout = null;
  },
  setSize: function (e) {
    this._canvas = e;
    this._update();
  },
  suspend: function () {
    ++this._suspended;
  },
  resume: function () {
    if (--this._suspended == 0) {
      this._update();
    }
  },
  addItem: function (e) {
    this._items.push(e);
    e.updateLayout = this._updateLayout;
  },
  removeItem: function (e) {
    var t = this._items.indexOf(e);
    this._items.splice(t, 1);
    e.updateLayout = null;
  },
  _update: function () {
    var e;
    if (this._suspended === 0) {
      e = this._canvas;
      s(this._items, function (t, n) {
        n.resize(e);
      });
      this._widget.resolveItemsDeferred(this._items.filter(function (e) {
        return e.getTemplatesGroups && e.getTemplatesDef;
      }));
      (function (e, t) {
        var n = d(e, t);
        if (c(n)) {
          c(n, true);
        }
      })({
        left: e.left,
        top: e.top,
        right: e.width + e.left,
        bottom: e.height + e.top
      }, this._items);
    }
  }
};