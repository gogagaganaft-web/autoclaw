exports.getFormat = undefined;
var i;
var o = (i = require("./18016.js")) && i.__esModule ? i : {
  default: i
};
var a = " .,:;/\\<>()-[]،";
function r(e) {
  var t = e && o.default.convertDigits(e, false).charCodeAt(0);
  var n = o.default.convertDigits("0", false).charCodeAt(0);
  return n <= t && t < n + 10;
}
function s(e, t, n, i) {
  var o = e[n];
  var s = e[n + 1];
  if (!i) {
    if (o === "." || o === " " && e.slice(n - 1, n + 3) === ". m.") {
      return true;
    }
    if (o === "-" && !r(s)) {
      return true;
    }
  }
  var l = i && t.some(function (t) {
    return e[n] !== t[n];
  });
  return a.indexOf(o) < 0 && i === r(o) && (!i || l);
}
function l(e, t) {
  if (!r(e[t])) {
    while (t > 0 && !r(e[t - 1]) && (e[t - 1] === "." || a.indexOf(e[t - 1]) < 0)) {
      t--;
    }
  }
  return t;
}
function u(e, t) {
  if (Array.isArray(e)) {
    return e.map(function (e) {
      return (t(e) || "").toString();
    });
  } else {
    return (t(e) || "").toString();
  }
}
var d = /[a-zA-Z]/g;
exports.getFormat = function (e) {
  var t = [];
  var n = u(new Date(2009, 8, 8, 6, 5, 4), e);
  var i = n.split("").map(function (e, t) {
    return t;
  });
  var o = n;
  var a = {};
  var c = [{
    date: new Date(2009, 8, 8, 6, 5, 4, 111),
    pattern: "S"
  }, {
    date: new Date(2009, 8, 8, 6, 5, 2),
    pattern: "s"
  }, {
    date: new Date(2009, 8, 8, 6, 2, 4),
    pattern: "m"
  }, {
    date: new Date(2009, 8, 8, 18, 5, 4),
    pattern: "H",
    isDigit: true
  }, {
    date: new Date(2009, 8, 8, 2, 5, 4),
    pattern: "h",
    isDigit: true
  }, {
    date: new Date(2009, 8, 8, 18, 5, 4),
    pattern: "a",
    isDigit: false
  }, {
    date: new Date(2009, 8, 1, 6, 5, 4),
    pattern: "d"
  }, {
    date: [new Date(2009, 8, 2, 6, 5, 4), new Date(2009, 8, 3, 6, 5, 4), new Date(2009, 8, 4, 6, 5, 4)],
    pattern: "E"
  }, {
    date: new Date(2009, 9, 6, 6, 5, 4),
    pattern: "M"
  }, {
    date: new Date(1998, 8, 8, 6, 5, 4),
    pattern: "y"
  }];
  if (o) {
    c.forEach(function (d) {
      var c = function (e, t, n, i) {
        var o = 0;
        var a = [];
        function u(t) {
          return e[o] !== t[o] && (i === undefined || r(e[o]) === i);
        }
        if (!Array.isArray(t)) {
          t = [t];
        }
        o = 0;
        for (; o < e.length; o++) {
          if (n.indexOf(o) < 0 && t.filter(u).length) {
            o = l(e, o);
            do {
              i = r(e[o]);
              if (!a.length && !i && r(t[0][o])) {
                break;
              }
              a.push(o);
              n.unshift(o);
              o++;
            } while (e[o] && s(e, t, o, i));
            break;
          }
        }
        if (a.length === 1 && (e[n[0] - 1] === "0" || e[n[0] - 1] === "٠")) {
          n.unshift(n[0] - 1);
        }
        return a;
      }(n, u(d.date, e), t, d.isDigit);
      var h = d.pattern !== "M" || a.d ? d.pattern : "L";
      o = function (e, t, n, i) {
        var o;
        var a;
        var s;
        if (!r(e[t[0]] || "0")) {
          for (var l = Math.max(t.length <= 3 ? 3 : 4, n.length); t.length > l;) {
            s = i[a = t.pop()];
            i[a] = -1;
            o = a + 1;
            for (; o < i.length; o++) {
              i[o]--;
            }
            e = e.substr(0, s) + e.substr(s + 1);
          }
          for (s = (a = t[t.length - 1] + 1) < i.length ? i[a] : a; t.length < l;) {
            t.push(t[t.length - 1] + 1);
            o = a;
            for (; o < i.length; o++) {
              i[o]++;
            }
            e = e.substr(0, s) + " " + e.substr(s);
          }
        }
        return e = function (e, t, n, i) {
          var o = t[0];
          var a = o < i.length ? i[o] : o;
          t.forEach(function (t, i) {
            e = e.substr(0, a + i) + (n.length > 1 ? n[i] : n) + e.substr(a + i + 1);
          });
          if (t.length === 1) {
            e = (e = e.replace("0" + n, n + n)).replace("٠" + n, n + n);
          }
          return e;
        }(e, t, n, i);
      }(o, c, h, i);
      a[h] = c.length;
    });
    o = function (e, t, n, i) {
      var o = t.split("").map(function (e, t) {
        if (n.indexOf(t) < 0 && (e.match(d) || e === "'")) {
          return i[t];
        } else {
          return -1;
        }
      });
      return e = e.split("").map(function (e, t) {
        var n = e;
        var i = o.indexOf(t) >= 0;
        var a = t > 0 && o.indexOf(t - 1) >= 0;
        var r = o.indexOf(t + 1) >= 0;
        if (i) {
          if (!a) {
            n = "'" + n;
          }
          if (!r) {
            n += "'";
          }
        }
        return n;
      }).join("");
    }(o, n, t, i);
    if (t.length) {
      return o;
    } else {
      return undefined;
    }
  }
};