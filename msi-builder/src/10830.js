function n() {
  return (n = Object.assign ? Object.assign.bind() : function (e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var i in n) {
        if (Object.prototype.hasOwnProperty.call(n, i)) {
          e[i] = n[i];
        }
      }
    }
    return e;
  }).apply(this, arguments);
}
function i(e, t) {
  return function (e) {
    if (Array.isArray(e)) {
      return e;
    }
  }(e) || function (e, t) {
    var n = e == null ? null : typeof Symbol != "undefined" && e[Symbol.iterator] || e["@@iterator"];
    if (n != null) {
      var i;
      var o;
      var a;
      var r;
      var s = [];
      var l = true;
      var u = false;
      try {
        a = (n = n.call(e)).next;
        if (t === 0) {
          if (Object(n) !== n) {
            return;
          }
          l = false;
        } else {
          for (; !(l = (i = a.call(n)).done) && (s.push(i.value), s.length !== t); l = true);
        }
      } catch (e) {
        u = true;
        o = e;
      } finally {
        try {
          if (!l && n.return != null && (r = n.return(), Object(r) !== r)) {
            return;
          }
        } finally {
          if (u) {
            throw o;
          }
        }
      }
      return s;
    }
  }(e, t) || function (e, t) {
    if (!e) {
      return;
    }
    if (typeof e == "string") {
      return o(e, t);
    }
    var n = Object.prototype.toString.call(e).slice(8, -1);
    if (n === "Object" && e.constructor) {
      n = e.constructor.name;
    }
    if (n === "Map" || n === "Set") {
      return Array.from(e);
    }
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) {
      return o(e, t);
    }
  }(e, t) || function () {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }();
}
function o(e, t) {
  if (t == null || t > e.length) {
    t = e.length;
  }
  for (var n = 0, i = new Array(t); n < t; n++) {
    i[n] = e[n];
  }
  return i;
}
exports.getMultiPageRowPages = exports.checkPageContainsOnlyHeader = undefined;
function a(e) {
  return (e == null ? undefined : e.sourceCellInfo.gridCell.rowType) === "header";
}
exports.checkPageContainsOnlyHeader = function (e, t) {
  return t && a(e[e.length - 1]);
};
exports.getMultiPageRowPages = function (e, t, o, r, s) {
  if (!r) {
    return [];
  }
  var l = e[e.length - 1];
  var u = t[e.length];
  if (!u || a(u)) {
    return [];
  }
  if (s(o, u.h) && !o) {
    return [];
  }
  var d = t.filter(function (e) {
    return e.y === u.y;
  });
  var c = function (e, t, o, a, r) {
    var s = i(a(t, e), 2);
    var l = s[0];
    for (var u = s[1], d = [t ? l.map(function (e) {
        return n({}, e, {
          y: o
        });
      }) : l]; !r(false, u[0].h);) {
      var c = i(a(false, u), 2);
      l = c[0];
      u = c[1];
      d.push(l);
    }
    return [d, u];
  }(d, o, l.y + l.h, r, s);
  var h = i(c, 2);
  var f = h[0];
  (function (e, t, n) {
    t.forEach(function (e, t) {
      e.sourceCellInfo.text = n[t].sourceCellInfo.text;
      e.h = n[t].h;
    });
    var i = e.indexOf(t[t.length - 1]) + 1;
    if (!(i >= e.length)) {
      var o = e[i].y - (t[0].y + n[0].h);
      for (var a = i; a < e.length; a++) {
        e[a].y = e[a].y - o;
      }
    }
  })(t, d, h[1]);
  return f;
};