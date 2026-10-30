Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.memoize = undefined;
var i = require("./20576.js");
function o(e) {
  return function (e) {
    if (Array.isArray(e)) {
      return a(e);
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
      return a(e, t);
    }
    var n = Object.prototype.toString.call(e).slice(8, -1);
    if (n === "Object" && e.constructor) {
      n = e.constructor.name;
    }
    if (n === "Map" || n === "Set") {
      return Array.from(e);
    }
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) {
      return a(e, t);
    }
  }(e) || function () {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }();
}
function a(e, t) {
  if (t == null || t > e.length) {
    t = e.length;
  }
  for (var n = 0, i = new Array(t); n < t; n++) {
    i[n] = e[n];
  }
  return i;
}
function r(e, t) {
  return e.length === t.length && !Object.keys(e).some(function (n) {
    return e[n] !== t[n];
  });
}
function s(e, t) {
  return (0, i.equalByValue)(e, t, {
    maxDepth: 4
  });
}
function l(e, t, n, i) {
  var a = e;
  var r = t;
  return function () {
    for (var e = arguments.length, t = new Array(e), s = 0; s < e; s++) {
      t[s] = arguments[s];
    }
    var l = i(t, a);
    if (l) {
      return r;
    } else {
      a = t;
      return r = n.apply(undefined, o(a));
    }
  };
}
var u = {
  compareType: "reference"
};
exports.memoize = function (e, t = u) {
  var n = t.compareType;
  var i = null;
  return function () {
    for (var t = arguments.length, o = new Array(t), a = 0; a < t; a++) {
      o[a] = arguments[a];
    }
    if (!i) {
      var u = e.apply(undefined, o);
      i = l(o, u, e, n === "reference" ? r : s);
      return u;
    }
    return i.apply(undefined, o);
  };
};