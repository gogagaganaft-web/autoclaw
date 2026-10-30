exports.generateDateBreaks = function (e, t, n, i, u) {
  var d = function (e) {
    n = e;
    var t = a.filter(function (e) {
      return !n.some(function (t) {
        return t === e;
      });
    });
    var n;
    if (t.length < 7) {
      while (r(t[t.length - 1]) === t[0]) {
        t.unshift(t.pop());
      }
    }
    return t;
  }(n);
  var c = function (e, t, n) {
    var i = e.getDate();
    var a = [];
    n.reduce(function (e, t) {
      var n = e[1];
      if (n.start === undefined) {
        n = {
          start: t,
          end: r(t)
        };
        e[0].push(n);
        return [e[0], n];
      } else if (n.end === t) {
        n.end = r(t);
        return e;
      }
      n = {
        start: t,
        end: r(t)
      };
      e[0].push(n);
      return [e[0], n];
    }, [[], {}])[0].forEach(function (n) {
      var r = new Date(e);
      for (r = o.default.trimTime(r); r < t;) {
        i = r.getDay();
        var u = r.getDate();
        if (s(n, i)) {
          var d = new Date(r);
          r.setDate(u + l(i, n.end));
          var c = new Date(r);
          a.push({
            from: d,
            to: c
          });
        }
        r.setDate(r.getDate() + 1);
      }
    });
    return a;
  }(e, t, d);
  c.push.apply(c, function (e, t, n, i) {
    var a;
    function r(e) {
      return e === a;
    }
    var s = o.default.trimTime(e);
    var l = o.default.trimTime(t);
    l.setDate(t.getDate() + 1);
    return n.reduce(function (e, t) {
      var n;
      var u;
      t = new Date(t);
      a = t.getDay();
      if (!i.some(r) && t >= s && t <= l) {
        n = o.default.trimTime(t);
        (u = new Date(n)).setDate(n.getDate() + 1);
        e.push({
          from: n,
          to: u
        });
      }
      return e;
    }, []);
  }(e, t, u || [], d));
  return function (e) {
    return e.map(function (e) {
      return {
        from: e.from,
        to: e.to,
        gapSize: o.default.convertMillisecondsToDateUnits(e.to - e.from)
      };
    });
  }(function (e, t) {
    var n;
    var i = e.slice();
    function a(e) {
      e = o.default.trimTime(new Date(e));
      if (i[n].from <= e && i[n].to > e) {
        var t = function (e, t) {
          var n = [];
          var i = new Date(t);
          i.setDate(t.getDate() + 1);
          if (t > e.from) {
            n.push({
              from: e.from,
              to: t
            });
          }
          if (i < e.to) {
            n.push({
              from: i,
              to: e.to
            });
          }
          return n;
        }(i[n], e);
        if (t.length === 2) {
          i.splice(n, 1, t[0], t[1]);
        } else if (t.length === 1) {
          i.splice(n, 1, t[0]);
        } else {
          i.splice(n, 1);
        }
      }
    }
    for (n = 0; n < i.length; n++) {
      t.forEach(a);
    }
    return i;
  }(c, i || []));
};
var i;
var o = (i = require("./91198.js")) && i.__esModule ? i : {
  default: i
};
var a = [0, 1, 2, 3, 4, 5, 6];
function r(e) {
  return (e + 1) % 7;
}
function s(e, t) {
  for (var n = e.start, i = e.end; n !== i;) {
    if (n === t) {
      return true;
    }
    n = r(n);
  }
  return false;
}
function l(e, t) {
  var n = 0;
  while (e !== t) {
    e = r(e);
    n++;
  }
  return n;
}