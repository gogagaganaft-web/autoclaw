exports.default = undefined;
var i = require("./19157.js");
var o = Math.min;
var a = Math.max;
var r = Math.round;
var s = {
  left: 0,
  center: 1,
  right: 2
};
var l = {
  top: 0,
  center: 1,
  bottom: 2
};
var u = {
  horizontal: 0,
  vertical: 1
};
var d = {};
function c(e, t, n) {
  var o = (0, i.normalizeEnum)(e);
  if (o in t) {
    return t[o];
  } else {
    return n;
  }
}
function h(e, t) {
  return (e > 0 ? -1 : 1) * t;
}
function f(e, t, n) {
  var i = e.side;
  var o = e.element.measure([t[2] - t[0], t[3] - t[1]]);
  var a = e.position === "indside" ? 0 : n[i];
  var r = o[i] < t[2 + i] - t[i] - a;
  if (r) {
    if (e.position !== "inside") {
      t[e.primary + i] += h(e.primary, o[i]);
    }
    e.size = o;
  }
  return r;
}
function p(e, t, n) {
  var i;
  var o;
  var a;
  var s;
  var l = e.side;
  var u = 1 - l;
  var c = [];
  i = e.secondary;
  o = n[u];
  a = n[2 + u];
  s = e.size[u];
  var f = d[i](o, a, s);
  c[l] = r(c[2 + l] = t[e.primary + l] + (e.position === "inside" ? h(e.primary, e.size[l]) : 0));
  c[e.primary + l] = r(t[e.primary + l] - h(e.primary, e.size[l]));
  if (e.position !== "inside") {
    t[e.primary + l] = c[e.primary + l];
  }
  c[u] = r(f[0]);
  c[2 + u] = r(f[1]);
  return c;
}
function g(e, t, n, i, o, a) {
  var r = p(e, t, n);
  var s = p(e, i, i);
  if (o[e.side] > 0) {
    o[e.side] -= e.size[e.side];
    a[e.primary + e.side] = r[e.primary + e.side];
    e.element.freeSpace();
  } else {
    e.element.move(r, s);
  }
}
function m() {
  this._targets = [];
}
function _(e, t) {
  var n = t.slice();
  var i = p(e, n, n);
  i[e.side] = t[e.side];
  i[2 + e.side] = t[2 + e.side];
  return i;
}
d[0] = function (e, t, n) {
  return [e, o(t, e + n)];
};
d[1] = function (e, t, n) {
  return [a(e, (e + t - n) / 2), o(t, (e + t + n) / 2)];
};
d[2] = function (e, t, n) {
  return [a(e, t - n), t];
};
m.prototype = {
  constructor: m,
  dispose: function () {
    this._targets = null;
  },
  add: function (e) {
    this._targets.push(e);
  },
  forward: function (e, t) {
    var n;
    var i = e.slice();
    var o = function (e) {
      var t;
      var n;
      var i = e.length;
      var o = [];
      for (t = 0; t < i; ++t) {
        if (n = e[t].layoutOptions()) {
          r = undefined;
          d = undefined;
          h = undefined;
          d = c((a = n).side, u, 1);
          h = [c(a.horizontalAlignment, s, 1), c(a.verticalAlignment, l, 0)];
          (n = {
            side: d,
            primary: (r = h[d], r < 2 ? 0 : 2),
            secondary: h[1 - d],
            weak: a.weak,
            priority: a.priority || 0,
            header: a.header,
            position: a.position
          }).element = e[t];
          o.push(n);
        }
      }
      var a;
      var r;
      var d;
      var h;
      o.sort(function (e, t) {
        return t.side - e.side || e.priority - t.priority;
      });
      return o = function (e) {
        var t;
        var n = e.filter(function (e) {
          return e.weak === true;
        })[0];
        if (n) {
          t = e.filter(function (e) {
            return n.primary === e.primary && e.side === n.side && e !== n;
          })[0];
        }
        if (n && t) {
          return [(i = t, o = n, a = i.side, r = i.primary, s = i.secondary, {
            side: a,
            primary: r,
            secondary: s,
            priority: 0,
            element: {
              measure: function (e) {
                var t = e.slice();
                var n = o.element.measure(e.slice());
                e[r] -= n[r];
                var s = i.element.measure(e.slice());
                t[a] = n[a] = s[a] = Math.max(s[a], n[a]);
                o.size = n;
                i.size = s;
                return t;
              },
              move: function (e, t) {
                if (t[2] - t[0] < i.size[0] + o.size[0] - 2) {
                  this.freeSpace();
                } else {
                  var n = _(o, t);
                  t[2 + o.primary] = n[o.primary];
                  var a = _(i, t);
                  if (t[2 + o.primary] < e[2 + o.primary] && i.size[i.primary] > e[2 + i.primary] - e[i.primary]) {
                    e[2 + o.primary] = t[2 + o.primary];
                  }
                  var r = _(i, e);
                  if (r[2 + o.primary] > t[2 + o.primary]) {
                    e[2 + o.primary] = t[2 + o.primary];
                    r = _(i, e);
                  }
                  o.element.move(n);
                  i.element.move(r, a);
                }
              },
              freeSpace: function () {
                i.element.freeSpace();
                o.element.freeSpace();
              }
            }
          })].concat(e.filter(function (e) {
            return e !== t && e !== n;
          }));
        }
        var i;
        var o;
        var a;
        var r;
        var s;
        return e;
      }(o);
    }(this._targets);
    var a = o.length;
    var r = [];
    for (n = 0; n < a; ++n) {
      if (f(o[n], i, t)) {
        r.push(o[n]);
      } else {
        o[n].element.freeSpace();
      }
    }
    this._cache = r.reverse();
    return i;
  },
  backward: function (e, t) {
    var n;
    var i;
    var o = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [0, 0];
    var a = e.slice();
    var r = e.slice();
    var s = this._cache;
    var l = 0;
    var u = s.length;
    for (i = 0; i < u; ++i) {
      if ((n = s[i]).side !== l) {
        a = e.slice();
      }
      g(n, a, t, r, o, e);
      l = n.side;
    }
    return o;
  }
};
var v = m;
exports.default = v;
module.exports = exports.default;
module.exports.default = exports.default;