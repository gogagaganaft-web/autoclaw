exports.renderDateParts = exports.getDatePartIndexByPosition = undefined;
var i = require("./2892.js");
var o = require("./13306.js");
var a = require("./60810.js");
var r = require("./20576.js");
function s(e) {
  return e.getMonth() + 1;
}
function l(e, t) {
  var n = e.getDate();
  var i = c("M", e);
  var o = (0, a.fitIntoRange)(parseInt(t), i.min, i.max);
  e.setMonth(o - 1, 1);
  var r = c("dM", e);
  var s = r.min;
  var l = r.max;
  var u = (0, a.fitIntoRange)(n, s, l);
  e.setDate(u);
}
var u = {
  a: function (e) {
    if (e.getHours() < 12) {
      return 0;
    } else {
      return 1;
    }
  },
  E: "getDay",
  y: "getFullYear",
  M: s,
  L: s,
  d: "getDate",
  H: "getHours",
  h: "getHours",
  m: "getMinutes",
  s: "getSeconds",
  S: "getMilliseconds"
};
var d = (0, o.extend)({}, (0, i.getPatternSetters)(), {
  a: function (e, t) {
    var n = e.getHours();
    if (n >= 12 !== !!parseInt(t)) {
      e.setHours((n + 12) % 24);
    }
  },
  d: function (e, t) {
    if (t > c("dM", e).max) {
      e.setMonth(e.getMonth() + 1);
    }
    e.setDate(t);
  },
  h: function (e, t) {
    var n = e.getHours() >= 12;
    e.setHours(+t % 12 + (n ? 12 : 0));
  },
  M: l,
  L: l,
  E: function (e, t) {
    if (!(t < 0)) {
      e.setDate(e.getDate() - e.getDay() + parseInt(t));
    }
  },
  y: function (e, t) {
    var n = e.getFullYear();
    var i = String(t).length;
    var o = String(c("y", e).max).length;
    var a = parseInt(String(n).substr(0, o - i) + t);
    e.setFullYear(a);
  }
});
exports.renderDateParts = function (e, t) {
  for (var n = t.regexp.exec(e), i = 0, o = 0, a = [], s = function () {
      o = (i = o) + n[l].length;
      var e;
      var s = t.patterns[l - 1].replace(/^'|'$/g, "");
      e = s[0];
      var h = u[e] || function () {
        return e;
      };
      a.push({
        index: l - 1,
        isStub: s === n[l],
        caret: {
          start: i,
          end: o
        },
        pattern: s,
        text: n[l],
        limits: function () {
          for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) {
            t[n] = arguments[n];
          }
          return c.apply(undefined, [s[0]].concat(t));
        },
        setter: d[s[0]] || r.noop,
        getter: h
      });
    }, l = 1; l < n.length; l++) {
    s();
  }
  return a;
};
function c(e, t, n) {
  var i = {
    y: {
      min: 0,
      max: 9999
    },
    M: {
      min: 1,
      max: 12
    },
    L: {
      min: 1,
      max: 12
    },
    d: {
      min: 1,
      max: 31
    },
    dM: {
      min: 1,
      max: new Date(t.getFullYear(), t.getMonth() + 1, 0).getDate()
    },
    E: {
      min: 0,
      max: 6
    },
    H: {
      min: 0,
      max: 23
    },
    h: {
      min: 0,
      max: 12
    },
    m: {
      min: 0,
      max: 59
    },
    s: {
      min: 0,
      max: 59
    },
    S: {
      min: 0,
      max: 999
    },
    a: {
      min: 0,
      max: 1
    }
  };
  return i[n || e] || i.getAmPm;
}
exports.getDatePartIndexByPosition = function (e, t) {
  for (var n = 0; n < e.length; n++) {
    var i = e[n].caret.end >= t;
    if (!e[n].isStub && i) {
      return n;
    }
  }
  return null;
};