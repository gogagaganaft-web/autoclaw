exports.setWidth = exports.setOuterWidth = exports.setOuterHeight = exports.setInnerWidth = exports.setInnerHeight = exports.setHeight = exports.parseHeight = exports.implementationsMap = exports.getWindowByElement = exports.getWidth = exports.getVisibleHeight = exports.getVerticalOffsets = exports.getSize = exports.getOuterWidth = exports.getOuterHeight = exports.getOffset = exports.getInnerWidth = exports.getInnerHeight = exports.getHeight = exports.getElementBoxParams = exports.addOffsetToMinHeight = exports.addOffsetToMaxHeight = undefined;
var i;
var o = require("./58201.js");
var a = (i = require("./73349.js")) && i.__esModule ? i : {
  default: i
};
var r = require("./35922.js");
var s = (0, o.getWindow)();
var l = ["auto", "none", "inherit", "initial"];
function u(e, t) {
  var n = 0;
  t.forEach(function (t) {
    n += parseFloat(e[t]) || 0;
  });
  return n;
}
function d(e, t) {
  var n = e === "width" ? "Left" : "Top";
  var i = e === "width" ? "Right" : "Bottom";
  return {
    padding: u(t, ["padding" + n, "padding" + i]),
    border: u(t, ["border" + n + "Width", "border" + i + "Width"]),
    margin: u(t, ["margin" + n, "margin" + i])
  };
}
exports.getElementBoxParams = d;
function c(e) {
  var t;
  var n = (e == null || (t = e.ownerDocument) === null || t === undefined ? undefined : t.defaultView) || s;
  return n.getComputedStyle && n.getComputedStyle(e);
}
function h(e, t, n, i) {
  return (t == null ? undefined : t[n]) || e.style?.[n] || i;
}
var f = {
  content: 0,
  padding: 1,
  border: 2,
  margin: 3,
  "content-box": 0,
  "border-box": 2
};
var p = {
  width: ["left", "right"],
  height: ["top", "bottom"]
};
function g(e, t, n, i) {
  function o(e, t, n) {
    return parseFloat(h(e, t, n, "0")) || 0;
  }
  var a = n === "border" ? "-width" : "";
  return o(e, i, `${n}-${p[t][0]}${a}`) + o(e, i, `${n}-${p[t][1]}${a}`);
}
function m(e, t, n) {
  var i = t === "width" ? "offsetWidth" : "offsetHeight";
  var o = c(e);
  var a = h(e, o, t);
  if (a === "" || a === "auto") {
    a = e[i];
  }
  a = parseFloat(a) || 0;
  var r = h(e, o, "boxSizing", "content-box");
  var s = f[n || r];
  var l = f[r];
  if (s === undefined || l === undefined) {
    throw new Error();
  }
  if (l === s) {
    return a;
  }
  var u = Math.sign(s - l);
  var d = false;
  var p = false;
  var m = false;
  var _ = false;
  if (u === 1) {
    s += 1;
    l += 1;
  }
  for (var v = l; v !== s; v += u) {
    switch (v) {
      case f.content:
        break;
      case f.padding:
        d = u * g(e, t, "padding", o);
        break;
      case f.border:
        p = u * g(e, t, "border", o);
        break;
      case f.margin:
        m = u * g(e, t, "margin", o);
    }
  }
  if (d || p) {
    var y = (d === false ? u * g(e, t, "padding", o) : d) + (p === false ? u * g(e, t, "border", o) : p);
    _ = u * Math.max(0, Math.floor(e[i] - a - u * y)) || 0;
  }
  return a + m + d + p + _;
}
exports.getSize = m;
function _(e, t, n) {
  if (e.indexOf("px") > 0) {
    e = parseInt(e.replace("px", ""));
  } else if (e.indexOf("%") > 0) {
    e = parseInt(e.replace("%", "")) * function (e) {
      if ((0, r.isWindow)(e)) {
        return e.innerHeight;
      } else {
        return e.offsetHeight;
      }
    }(t) / 100;
  } else if (isNaN(e)) {
    if (e.indexOf("vh") > 0) {
      e = s.innerHeight / 100 * parseInt(e.replace("vh", ""));
    } else if (n && e.indexOf("em") > 0) {
      e = parseFloat(e.replace("em", "")) * parseFloat(s.getComputedStyle(n).fontSize);
    }
  } else {
    e = parseInt(e);
  }
  return e;
}
exports.parseHeight = _;
function v(e, t, n) {
  if (e) {
    if (l.indexOf(e) > -1) {
      if (t) {
        return null;
      } else {
        return e;
      }
    } else {
      if ((0, r.isString)(e)) {
        e = _(e, n);
      }
      if ((0, r.isNumeric)(e)) {
        return Math.max(0, e + t);
      } else {
        return "calc(" + e + (t < 0 ? " - " : " ") + Math.abs(t) + "px)";
      }
    }
  } else {
    return null;
  }
}
exports.addOffsetToMaxHeight = function (e, t, n) {
  var i = v(e, t, n);
  if (i !== null) {
    return i;
  } else {
    return "none";
  }
};
exports.addOffsetToMinHeight = function (e, t, n) {
  var i = v(e, t, n);
  if (i !== null) {
    return i;
  } else {
    return 0;
  }
};
exports.getVerticalOffsets = function (e, t) {
  if (!e) {
    return 0;
  }
  var n = d("height", s.getComputedStyle(e));
  return n.padding + n.border + (t ? n.margin : 0);
};
exports.getVisibleHeight = function (e) {
  if (e) {
    var t = e.getBoundingClientRect();
    if (t.height) {
      return t.height;
    }
  }
  return 0;
};
var y = {
  getWidth: function () {
    for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) {
      t[n] = arguments[n];
    }
    return b.apply(undefined, ["width"].concat(t));
  },
  setWidth: function () {
    for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) {
      t[n] = arguments[n];
    }
    return b.apply(undefined, ["width"].concat(t));
  },
  getHeight: function () {
    for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) {
      t[n] = arguments[n];
    }
    return b.apply(undefined, ["height"].concat(t));
  },
  setHeight: function () {
    for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) {
      t[n] = arguments[n];
    }
    return b.apply(undefined, ["height"].concat(t));
  },
  getOuterWidth: function () {
    for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) {
      t[n] = arguments[n];
    }
    return b.apply(undefined, ["outerWidth"].concat(t));
  },
  setOuterWidth: function () {
    for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) {
      t[n] = arguments[n];
    }
    return b.apply(undefined, ["outerWidth"].concat(t));
  },
  getOuterHeight: function () {
    for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) {
      t[n] = arguments[n];
    }
    return b.apply(undefined, ["outerHeight"].concat(t));
  },
  setOuterHeight: function () {
    for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) {
      t[n] = arguments[n];
    }
    return b.apply(undefined, ["outerHeight"].concat(t));
  },
  getInnerWidth: function () {
    for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) {
      t[n] = arguments[n];
    }
    return b.apply(undefined, ["innerWidth"].concat(t));
  },
  setInnerWidth: function () {
    for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) {
      t[n] = arguments[n];
    }
    return b.apply(undefined, ["innerWidth"].concat(t));
  },
  getInnerHeight: function () {
    for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) {
      t[n] = arguments[n];
    }
    return b.apply(undefined, ["innerHeight"].concat(t));
  },
  setInnerHeight: function () {
    for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) {
      t[n] = arguments[n];
    }
    return b.apply(undefined, ["innerHeight"].concat(t));
  }
};
function b(e, t, n) {
  if (arguments.length === 2) {
    return x(t, e);
  } else {
    return x(t, e, n);
  }
}
exports.implementationsMap = y;
exports.getWidth = function (e) {
  return y.getWidth(e);
};
exports.setWidth = function (e, t) {
  return y.setWidth(e, t);
};
exports.getHeight = function (e) {
  return y.getHeight(e);
};
exports.setHeight = function (e, t) {
  return y.setHeight(e, t);
};
exports.getOuterWidth = function (e, t) {
  return y.getOuterWidth(e, t || false);
};
exports.setOuterWidth = function (e, t) {
  return y.setOuterWidth(e, t);
};
exports.getOuterHeight = function (e, t) {
  return y.getOuterHeight(e, t || false);
};
exports.setOuterHeight = function (e, t) {
  return y.setOuterHeight(e, t);
};
exports.getInnerWidth = function (e) {
  return y.getInnerWidth(e);
};
exports.setInnerWidth = function (e, t) {
  return y.setInnerWidth(e, t);
};
exports.getInnerHeight = function (e) {
  return y.getInnerHeight(e);
};
exports.setInnerHeight = function (e, t) {
  return y.setInnerHeight(e, t);
};
var x = function e(t, n, i) {
  var o = n.toLowerCase().indexOf("width") >= 0 ? "Width" : "Height";
  var s = o.toLowerCase();
  var l = n.indexOf("outer") === 0;
  var u = n.indexOf("inner") === 0;
  var h = arguments.length === 2 || typeof i == "boolean";
  if ((0, r.isRenderer)(t)) {
    if (t.length > 1 && !h) {
      for (var f = 0; f < t.length; f++) {
        e(t[f], n, i);
      }
      return;
    }
    t = t[0];
  }
  if (t) {
    if ((0, r.isWindow)(t)) {
      if (l) {
        return t["inner" + o];
      } else {
        return a.default.getDocumentElement()["client" + o];
      }
    }
    if (a.default.isDocument(t)) {
      var p = a.default.getDocumentElement();
      var g = a.default.getBody();
      return Math.max(g["scroll" + o], g["offset" + o], p["scroll" + o], p["offset" + o], p["client" + o]);
    }
    if (h) {
      var _ = "content";
      if (l) {
        _ = i ? "margin" : "border";
      }
      if (u) {
        _ = "padding";
      }
      return m(t, s, _);
    }
    if ((0, r.isNumeric)(i)) {
      var v = c(t);
      var y = d(s, v);
      var b = v.boxSizing === "border-box";
      i = Number(i);
      if (l) {
        i -= b ? 0 : y.border + y.padding;
      } else if (u) {
        i += b ? y.border : -y.padding;
      } else if (b) {
        i += y.border + y.padding;
      }
    }
    i += (0, r.isNumeric)(i) ? "px" : "";
    a.default.setStyle(t, s, i);
    return null;
  }
};
function w(e) {
  if ((0, r.isWindow)(e)) {
    return e;
  } else {
    return e.defaultView;
  }
}
exports.getWindowByElement = w;
exports.getOffset = function (e) {
  if (!e.getClientRects().length) {
    return {
      top: 0,
      left: 0
    };
  }
  var t = e.getBoundingClientRect();
  var n = w(e.ownerDocument);
  var i = e.ownerDocument.documentElement;
  return {
    top: t.top + n.pageYOffset - i.clientTop,
    left: t.left + n.pageXOffset - i.clientLeft
  };
};