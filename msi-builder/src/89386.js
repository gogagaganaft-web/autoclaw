exports.wrapToArray = exports.removeDuplicates = exports.normalizeIndexes = exports.groupBy = exports.getUniqueValues = exports.getIntersection = undefined;
var i;
var o = require("./35922.js");
var a = require("./48013.js");
var r = (i = require("./80209.js")) && i.__esModule ? i : {
  default: i
};
function s(e) {
  return function (e) {
    if (Array.isArray(e)) {
      return l(e);
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
      return l(e, t);
    }
    var n = Object.prototype.toString.call(e).slice(8, -1);
    if (n === "Object" && e.constructor) {
      n = e.constructor.name;
    }
    if (n === "Map" || n === "Set") {
      return Array.from(e);
    }
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) {
      return l(e, t);
    }
  }(e) || function () {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }();
}
function l(e, t) {
  if (t == null || t > e.length) {
    t = e.length;
  }
  for (var n = 0, i = new Array(t); n < t; n++) {
    i[n] = e[n];
  }
  return i;
}
function u(e) {
  return e.reduce(function (e, t) {
    var i = (e.get(t) ?? 0) + 1;
    e.set(t, i);
    return e;
  }, new Map());
}
exports.wrapToArray = function (e) {
  if (Array.isArray(e)) {
    return e;
  } else {
    return [e];
  }
};
exports.getUniqueValues = function (e) {
  return s(new Set(e));
};
exports.getIntersection = function (e, t) {
  var n = u(t);
  return e.filter(function (e) {
    var t = n.get(e);
    if (t) {
      n.set(e, t - 1);
    }
    return t;
  });
};
exports.removeDuplicates = function (e = [], t = []) {
  var n = u(t);
  return e.filter(function (e) {
    var t = n.get(e);
    if (t) {
      n.set(e, t - 1);
    }
    return !t;
  });
};
exports.normalizeIndexes = function (e, t, n, i) {
  var s = {};
  var l = (0, r.default)().useLegacyVisibleIndex;
  var u = 0;
  function d(e) {
    return !(0, o.isDefined)(e[t]) && (!i || i(e));
  }
  e.forEach(function (e) {
    var i = e[t];
    if (i >= 0) {
      s[i] = s[i] || [];
      if (e === n) {
        s[i].unshift(e);
      } else {
        s[i].push(e);
      }
    } else {
      e[t] = undefined;
    }
  });
  if (!l) {
    e.forEach(function (e) {
      if (d(e)) {
        while (s[u]) {
          u++;
        }
        s[u] = [e];
        u++;
      }
    });
  }
  u = 0;
  (0, a.orderEach)(s, function (e, n) {
    n.forEach(function (n) {
      if (e >= 0) {
        n[t] = u++;
      }
    });
  });
  if (l) {
    e.forEach(function (e) {
      if (d(e)) {
        e[t] = u++;
      }
    });
  }
};
exports.groupBy = function (e, t) {
  return e.reduce(function (e, n) {
    var o = t(n);
    e[o] = e[o] ?? [];
    e[o].push(n);
    return e;
  }, {});
};