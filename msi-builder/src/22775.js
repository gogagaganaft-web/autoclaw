exports.splitByPages = function (e, t, n, i, r) {
  if (t.length === 0) {
    return [[]];
  }
  var l = {
    x: (0, o.getPageWidth)(e) - n.margin.right,
    y: (0, o.getPageHeight)(e) - n.margin.bottom
  };
  var d = t.filter(function (e) {
    return e.rowType === "header";
  });
  var c = d.reduce(function (e, t) {
    return e + t.height;
  }, 0);
  var h = g(p(t), n.margin.top, "y", "h", function (e, t) {
    var i = !e && n.repeatHeaders ? c : 0;
    return (0, a.roundToThreeDecimals)(t + i) <= (0, a.roundToThreeDecimals)(l.y);
  }, function (e, t, n, i) {
    var o = {
      sourceRect: e,
      topRect: {
        x: e.x,
        y: e.y,
        w: e.w,
        h: t - e.y
      },
      bottomRect: {
        x: e.x,
        y: t,
        w: e.w,
        h: e.h - (t - e.y)
      }
    };
    r(o);
    n.push(o.topRect);
    i.push(o.bottomRect);
  }, (0, s.createOnSplitMultiPageRow)(e, n, c, l));
  if (n.repeatHeaders) {
    for (var m = 1; m < h.length; m++) {
      h[m].forEach(function (e) {
        return e.y += c;
      });
      var _ = p(d);
      _.forEach(function (e) {
        e.y -= n.topLeft.y;
      });
      h[m] = [].concat(u(_), u(h[m]));
    }
  }
  var v = 0;
  while (v < h.length) {
    var y = g(h[v], n.margin.left, "x", "w", function (e, t) {
      return (0, a.roundToThreeDecimals)(t) <= (0, a.roundToThreeDecimals)(l.x);
    }, function (e, t, n, o) {
      var a = {
        sourceRect: e,
        leftRect: {
          x: e.x,
          y: e.y,
          w: t - e.x,
          h: e.h
        },
        rightRect: {
          x: t,
          y: e.y,
          w: e.w - (t - e.x),
          h: e.h
        }
      };
      i(a);
      n.push(a.leftRect);
      o.push(a.rightRect);
    });
    if (y.length > 1) {
      h.splice.apply(h, [v, 1].concat(u(y)));
      v += y.length;
    } else {
      v += 1;
    }
  }
  return h.map(function (e) {
    return e.map(function (e) {
      return f({}, e.sourceCellInfo, {
        _rect: e
      });
    });
  });
};
var i = require("./35922.js");
var o = require("./79262.js");
var a = require("./66867.js");
var r = require("./10830.js");
var s = require("./72666.js");
function l(e) {
  return function (e) {
    if (Array.isArray(e)) {
      return e;
    }
  }(e) || c(e) || d(e) || function () {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }();
}
function u(e) {
  return function (e) {
    if (Array.isArray(e)) {
      return h(e);
    }
  }(e) || c(e) || d(e) || function () {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }();
}
function d(e, t) {
  if (e) {
    if (typeof e == "string") {
      return h(e, t);
    }
    var n = Object.prototype.toString.call(e).slice(8, -1);
    if (n === "Object" && e.constructor) {
      n = e.constructor.name;
    }
    if (n === "Map" || n === "Set") {
      return Array.from(e);
    } else if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) {
      return h(e, t);
    } else {
      return undefined;
    }
  }
}
function c(e) {
  if (typeof Symbol != "undefined" && e[Symbol.iterator] != null || e["@@iterator"] != null) {
    return Array.from(e);
  }
}
function h(e, t) {
  if (t == null || t > e.length) {
    t = e.length;
  }
  for (var n = 0, i = new Array(t); n < t; n++) {
    i[n] = e[n];
  }
  return i;
}
function f() {
  return (f = Object.assign ? Object.assign.bind() : function (e) {
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
function p(e) {
  return [].concat.apply([], e.map(function (e) {
    return e.cells.filter(function (e) {
      return !(0, i.isDefined)(e.pdfCell.isMerged);
    }).map(function (e) {
      return f({}, e.pdfCell._rect, {
        sourceCellInfo: f({}, e.pdfCell, {
          gridCell: e.gridCell
        })
      });
    });
  }));
}
function g(e, t, n, o, a, s, d) {
  var c = [];
  for (var h = u(e), f = function (e, n) {
      return a(e, n + t);
    }, p = function () {
      var e = 0;
      var p = h.filter(function (t) {
        var i = t[n] + t[o];
        return !!a(c.length === 0, i) && (e <= i && (e = i), true);
      });
      var g = (0, r.checkPageContainsOnlyHeader)(p, c.length === 0);
      var m = (0, r.getMultiPageRowPages)(p, h, g, d, f);
      h.filter(function (t) {
        var i = t[n];
        var a = t[n] + t[o];
        return e - i > 0.001 && a - e > 0.001;
      }).forEach(function (t) {
        s(t, e, p, h);
        var n = h.indexOf(t);
        if (n !== -1) {
          h.splice(n, 1);
        }
      });
      p.forEach(function (e) {
        var t = h.indexOf(e);
        if (t !== -1) {
          h.splice(t, 1);
        }
      });
      h.forEach(function (o) {
        o[n] = (0, i.isDefined)(e) ? o[n] - e + t : o[n];
      });
      if (g && m.length > 0) {
        var _ = l(m);
        var v = _[0];
        var y = _.slice(1);
        c.push([].concat(u(p), u(v)));
        c.push.apply(c, u(y));
      } else if (p.length > 0) {
        c.push(p);
        c.push.apply(c, u(m));
      } else {
        if (!(m.length > 0)) {
          c.push(h);
          return "break";
        }
        c.push.apply(c, u(m));
        c.push(h);
      }
    }; h.length > 0;) {
    if (p() === "break") {
      break;
    }
  }
  return c;
}