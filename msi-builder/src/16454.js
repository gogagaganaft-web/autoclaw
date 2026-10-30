exports.errorMessageFromXhr = exports.base64_encode = exports.aggregators = exports.XHR_ERROR_UNLOAD = undefined;
exports.isConjunctiveOperator = function (e) {
  return /^(and|&&|&)$/i.test(e);
};
exports.isDisjunctiveOperator = function (e) {
  return /^(or|\|\||\|)$/i.test(e);
};
exports.rejectedPromise = exports.processRequestResultLock = exports.normalizeSortingInfo = exports.normalizeBinaryCriterion = exports.keysEqual = exports.isUnaryOperation = exports.isGroupCriterion = undefined;
exports.throttleChanges = function (e, t) {
  var n = [];
  var o = function (e, t) {
    var n;
    return function () {
      var o = this;
      n ||= setTimeout(function () {
        n = undefined;
        e.call(o);
      }, (0, i.isFunction)(t) ? t() : t);
      return n;
    };
  }(function () {
    e.call(this, n);
    n = [];
  }, t);
  return function (e) {
    var t;
    var i;
    if (Array.isArray(e)) {
      (t = n).push.apply(t, function (e) {
        if (Array.isArray(e)) {
          return c(e);
        }
      }(i = e) || function (e) {
        if (typeof Symbol != "undefined" && e[Symbol.iterator] != null || e["@@iterator"] != null) {
          return Array.from(e);
        }
      }(i) || function (e, t) {
        if (e) {
          if (typeof e == "string") {
            return c(e, t);
          }
          var n = Object.prototype.toString.call(e).slice(8, -1);
          if (n === "Object" && e.constructor) {
            n = e.constructor.name;
          }
          if (n === "Map" || n === "Set") {
            return Array.from(e);
          } else if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) {
            return c(e, t);
          } else {
            return undefined;
          }
        }
      }(i) || function () {
        throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
      }());
    }
    return o.call(this, n);
  };
};
exports.trivialPromise = undefined;
var i = require("./35922.js");
var o = d(require("./73349.js"));
var a = d(require("./24311.js"));
var r = require("./58201.js");
var s = require("./95479.js");
var l = require("./62754.js");
var u = require("./20576.js");
function d(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
function c(e, t) {
  if (t == null || t > e.length) {
    t = e.length;
  }
  for (var n = 0, i = new Array(t); n < t; n++) {
    i[n] = e[n];
  }
  return i;
}
var h = a.default.add;
exports.XHR_ERROR_UNLOAD = "MSI_XHR_ERROR_UNLOAD";
exports.normalizeBinaryCriterion = function (e) {
  return [e[0], e.length < 3 ? "=" : String(e[1]).toLowerCase(), e.length < 2 || e[e.length - 1]];
};
exports.normalizeSortingInfo = function (e) {
  if (!Array.isArray(e)) {
    e = [e];
  }
  return (0, s.map)(e, function (e) {
    var t = {
      selector: (0, i.isFunction)(e) || typeof e == "string" ? e : e.getter || e.field || e.selector,
      desc: !!e.desc || String(e.dir).charAt(0).toLowerCase() === "d"
    };
    if (e.compare) {
      t.compare = e.compare;
    }
    return t;
  });
};
var f;
var p;
p = {
  timeout: "Network connection timeout",
  error: "Unspecified network error",
  parsererror: "Unexpected server response"
};
h(function () {
  var e = (0, r.getWindow)();
  o.default.listen(e, "beforeunload", function () {
    f = true;
  });
});
function g(e, t) {
  if (f) {
    return "MSI_XHR_ERROR_UNLOAD";
  } else if (e.status < 400) {
    return function (e) {
      var t = p[e];
      return t || e;
    }(t);
  } else {
    return e.statusText;
  }
}
exports.errorMessageFromXhr = g;
var m = {
  count: {
    seed: 0,
    step: function (e) {
      return 1 + e;
    }
  },
  sum: {
    seed: 0,
    step: function (e, t) {
      return e + t;
    }
  },
  min: {
    step: function (e, t) {
      if (t < e) {
        return t;
      } else {
        return e;
      }
    }
  },
  max: {
    step: function (e, t) {
      if (t > e) {
        return t;
      } else {
        return e;
      }
    }
  },
  avg: {
    seed: [0, 0],
    step: function (e, t) {
      return [e[0] + t, e[1] + 1];
    },
    finalize: function (e) {
      if (e[1]) {
        return e[0] / e[1];
      } else {
        return NaN;
      }
    }
  }
};
exports.aggregators = m;
var _;
var v;
v = 0;
var y = {
  obtain: function () {
    if (v === 0) {
      _ = new l.Deferred();
    }
    v++;
  },
  release: function () {
    if (--v < 1) {
      _.resolve();
    }
  },
  promise: function () {
    return (v === 0 ? new l.Deferred().resolve() : _).promise();
  },
  reset: function () {
    v = 0;
    if (_) {
      _.resolve();
    }
  }
};
exports.processRequestResultLock = y;
exports.keysEqual = function (e, t, n) {
  if (Array.isArray(e)) {
    var i;
    for (var o = (0, s.map)(t, function (e, t) {
        return t;
      }), a = 0; a < o.length; a++) {
      i = o[a];
      if (!(0, u.equalByValue)(t[i], n[i], {
        strict: false
      })) {
        return false;
      }
    }
    return true;
  }
  return (0, u.equalByValue)(t, n, {
    strict: false
  });
};
exports.base64_encode = function (e) {
  if (!Array.isArray(e)) {
    e = function (e) {
      var t;
      var n;
      var i = [];
      for (n = 0; n < e.length; n++) {
        if ((t = e.charCodeAt(n)) < 128) {
          i.push(t);
        } else if (t < 2048) {
          i.push(192 + (t >> 6), 128 + (t & 63));
        } else if (t < 65536) {
          i.push(224 + (t >> 12), 128 + (t >> 6 & 63), 128 + (t & 63));
        } else if (t < 2097152) {
          i.push(240 + (t >> 18), 128 + (t >> 12 & 63), 128 + (t >> 6 & 63), 128 + (t & 63));
        }
      }
      return i;
    }(String(e));
  }
  var t = "";
  function n(e) {
    return "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(e);
  }
  for (var i = 0; i < e.length; i += 3) {
    var o = e[i];
    var a = e[i + 1];
    var r = e[i + 2];
    t += (0, s.map)([o >> 2, (o & 3) << 4 | a >> 4, isNaN(a) ? 64 : (a & 15) << 2 | r >> 6, isNaN(r) ? 64 : r & 63], n).join("");
  }
  return t;
};
exports.isUnaryOperation = function (e) {
  return e[0] === "!" && Array.isArray(e[1]);
};
exports.isGroupCriterion = function (e) {
  var t;
  var n = e[0];
  var o = e[1];
  return !!Array.isArray(n) || !!(0, i.isFunction)(n) && (!!Array.isArray(o) || !!(0, i.isFunction)(o) || (t = o) === "and" || t === "or");
};
exports.trivialPromise = function () {
  var e = new l.Deferred();
  return e.resolve.apply(e, arguments).promise();
};
exports.rejectedPromise = function () {
  var e = new l.Deferred();
  return e.reject.apply(e, arguments).promise();
};