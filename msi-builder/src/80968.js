exports.stylePropPrefix = exports.styleProp = exports.setWidth = exports.setStyle = exports.setHeight = exports.parsePixelValue = exports.normalizeStyleProp = undefined;
var i = require("./78008.js");
var o = s(require("./39618.js"));
var a = require("./35922.js");
var r = s(require("./73349.js"));
function s(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
function l(e, t) {
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
      return u(e, t);
    }
    var n = Object.prototype.toString.call(e).slice(8, -1);
    if (n === "Object" && e.constructor) {
      n = e.constructor.name;
    }
    if (n === "Map" || n === "Set") {
      return Array.from(e);
    }
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) {
      return u(e, t);
    }
  }(e, t) || function () {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }();
}
function u(e, t) {
  if (t == null || t > e.length) {
    t = e.length;
  }
  for (var n = 0, i = new Array(t); n < t; n++) {
    i[n] = e[n];
  }
  return i;
}
var d = ["", "Webkit", "Moz", "O", "Ms"];
var c = {
  "": "",
  Webkit: "-webkit-",
  Moz: "-moz-",
  O: "-o-",
  ms: "-ms-"
};
var h = (0, o.default)(function () {
  return r.default.createElement("dx").style;
});
exports.styleProp = function (e) {
  if (e in h()) {
    return e;
  }
  var t = e;
  e = e.charAt(0).toUpperCase() + e.substr(1);
  for (var n = 1; n < d.length; n++) {
    var i = d[n].toLowerCase() + e;
    if (i in h()) {
      return i;
    }
  }
  return t;
};
exports.stylePropPrefix = function (e) {
  return function (e, t) {
    var n;
    e = (0, i.camelize)(e, true);
    for (var o = 0, a = d.length; o < a; o++) {
      var r = d[o];
      var s = r + e;
      if ((n = t((0, i.camelize)(s), r)) === undefined) {
        n = t(s, r);
      }
      if (n !== undefined) {
        break;
      }
    }
    return n || "";
  }(e, function (e, t) {
    if (e in h()) {
      return c[t];
    }
  });
};
var f = ["fillOpacity", "columnCount", "flexGrow", "flexShrink", "fontWeight", "lineHeight", "opacity", "zIndex", "zoom"];
exports.parsePixelValue = function (e) {
  if ((0, a.isNumeric)(e)) {
    return e;
  } else if ((0, a.isString)(e)) {
    return Number(e.replace("px", ""));
  } else {
    return NaN;
  }
};
exports.normalizeStyleProp = function (e, t) {
  if ((0, a.isNumeric)(t) && f.indexOf(e) === -1) {
    t += "px";
  }
  return t;
};
function p(e, t, n) {
  if (e) {
    n = (0, a.isNumeric)(n) ? n += "px" : n;
    for (var i = 0; i < e.length; ++i) {
      e[i].style[t] = n;
    }
  }
}
exports.setWidth = function (e, t) {
  p(e, "width", t);
};
exports.setHeight = function (e, t) {
  p(e, "height", t);
};
exports.setStyle = function (e, t) {
  var n = !(arguments.length > 2) || arguments[2] === undefined || arguments[2];
  if (n) {
    var i = [].slice.call(e.style);
    i.forEach(function (t) {
      e.style.removeProperty(t);
    });
  }
  t.split(";").forEach(function (t) {
    var n = t.split(":").map(function (e) {
      return e.trim();
    });
    if (n.length === 2) {
      var i = l(n, 2);
      var o = i[0];
      var a = i[1];
      e.style[o] = a;
    }
  });
};