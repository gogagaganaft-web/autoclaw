exports.getUpdatedOptions = function (e, t, n = s) {
  return p(e, t, "", n);
};
var i = require("./35922.js");
function o() {
  return (o = Object.assign ? Object.assign.bind() : function (e) {
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
function a(e) {
  return function (e) {
    if (Array.isArray(e)) {
      return r(e);
    }
  }(e) || function (e) {
    if (typeof Symbol != "undefined" && e[Symbol.iterator] != null || e["@@iterator"] != null) {
      return Array.from(e);
    }
  }(e) || function (e, t) {
    if (!e) {
      return;
    }
    if (typeof e == "string") {
      return r(e, t);
    }
    var n = Object.prototype.toString.call(e).slice(8, -1);
    if (n === "Object" && e.constructor) {
      n = e.constructor.name;
    }
    if (n === "Map" || n === "Set") {
      return Array.from(e);
    }
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) {
      return r(e, t);
    }
  }(e) || function () {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }();
}
function r(e, t) {
  if (t == null || t > e.length) {
    t = e.length;
  }
  for (var n = 0, i = new Array(t); n < t; n++) {
    i[n] = e[n];
  }
  return i;
}
var s = ["dataSource", "selectedRowKeys"];
var l = {
  integrationOptions: true
};
function u(e, t, n) {
  return {
    path: e,
    value: t,
    previousValue: n
  };
}
function d(e, t, n, r, s, d) {
  if (!l[r]) {
    var c = (0, i.type)(t);
    var f = (0, i.type)(n);
    if (t !== n) {
      if (c !== f) {
        e.push(u(r, n, t));
      } else if (c === "object") {
        if ((0, i.isPlainObject)(n)) {
          var p = h(t, n, s, d);
          e.push.apply(e, a(p.map(function (e) {
            return o({}, e, {
              path: `${r}.${e.path}`
            });
          })));
        } else {
          e.push(u(r, n, t));
        }
      } else if (c === "array") {
        if (d.some(function (e) {
          return s.includes(e);
        }) && t !== n) {
          e.push(u(r, n, t));
        } else if (t.length !== n.length) {
          e.push(u(r, n, t));
        } else {
          var g = h(t, n, s, d);
          [].push.apply(e, g.map(function (e) {
            return o({}, e, {
              path: `${r}${e.path}`
            });
          }));
        }
      } else {
        e.push(u(r, n, t));
      }
    }
  }
}
function c(e) {
  return function (t, n, i, o) {
    var a = [];
    var r = Array.isArray(t) ? function (e) {
      d(a, t[e], n[e], `[${e}]`, `${i}.${e}`, o);
    } : function (e) {
      d(a, t[e], n[e], e, `${i}.${e}`, o);
    };
    e(t).forEach(r);
    Object.keys(n).filter(function (e) {
      return !Object.prototype.hasOwnProperty.call(t, e) && t[e] !== n[e];
    }).forEach(function (e) {
      a.push({
        path: e,
        value: n[e],
        previousValue: t[e]
      });
    });
    return a;
  };
}
var h = c(function (e) {
  return Object.keys(e);
});
var f = {
  key: true,
  ref: true,
  children: true,
  style: true
};
var p = c(function (e) {
  return Object.keys(e).filter(function (e) {
    return !f[e];
  });
});