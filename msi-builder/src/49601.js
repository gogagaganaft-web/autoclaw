exports.SelectionFilterCreator = undefined;
var i = require("./20576.js");
var o = require("./35922.js");
exports.SelectionFilterCreator = function (e, t) {
  var n;
  this.getLocalFilter = function (e, t, n, o) {
    t = t === undefined ? i.equalByValue : t;
    return r.bind(this, t, e, n, o);
  };
  this.getExpr = function (n) {
    var i;
    if (n) {
      e.forEach(function (e, a) {
        var r;
        i = i || [];
        if (a > 0) {
          i.push(t ? "and" : "or");
        }
        r = (0, o.isString)(n) ? s(n, e) : function (e, n) {
          var i = [];
          for (var o = 0, a = e.length; o < a; o++) {
            var r = e[o];
            var l = n && n[r];
            var u = s(r, l);
            if (!u) {
              break;
            }
            if (o > 0) {
              i.push(t ? "or" : "and");
            }
            i.push(u);
          }
          return i;
        }(n, e);
        i.push(r);
      });
      if (i && i.length === 1) {
        i = i[0];
      }
      return i;
    }
  };
  this.getCombinedFilter = function (e, n, i = false) {
    var o = this.getExpr(e);
    var a = o;
    if ((i || t) && n) {
      if (o) {
        (a = []).push(o);
        a.push(n);
      } else {
        a = n;
      }
    }
    return a;
  };
  function a(e, t, n) {
    if (Array.isArray(n)) {
      return e.map(function (e) {
        return t(e);
      });
    } else {
      return e;
    }
  }
  function r(r, s, l, u, d) {
    var c;
    var h;
    var f = s(d);
    if (!l && (c = (0, i.getKeyHash)(f), !(0, o.isObject)(c))) {
      if (function (t, o) {
        if (!n) {
          n = {};
          for (var r = a(e, t, o), s = 0; s < r.length; s++) {
            n[(0, i.getKeyHash)(r[s])] = true;
          }
        }
        return n;
      }(s, u)[c]) {
        return !t;
      } else {
        return !!t;
      }
    }
    for (h = 0; h < e.length; h++) {
      if (r(e[h], f)) {
        return !t;
      }
    }
    return !!t;
  }
  function s(e, n) {
    if (n !== undefined) {
      return [e, t ? "<>" : "=", n];
    }
  }
};