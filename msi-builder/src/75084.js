exports.whenSome = exports.getMapFromObject = exports.getDisplayFileSize = exports.findItemsByKeys = exports.extendAttributes = undefined;
var i = require("./62754.js");
var o = require("./13306.js");
var a = require("./20576.js");
var r = require("./35922.js");
function s(e) {
  return (s = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function (e) {
    return typeof e;
  } : function (e) {
    if (e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype) {
      return "symbol";
    } else {
      return typeof e;
    }
  })(e);
}
function l(e, t, n) {
  if ((t = function (e) {
    var t = function (e, t) {
      if (s(e) !== "object" || e === null) {
        return e;
      }
      var n = e[Symbol.toPrimitive];
      if (n !== undefined) {
        var i = n.call(e, t || "default");
        if (s(i) !== "object") {
          return i;
        }
        throw new TypeError("@@toPrimitive must return a primitive value.");
      }
      return (t === "string" ? String : Number)(e);
    }(e, "string");
    if (s(t) === "symbol") {
      return t;
    } else {
      return String(t);
    }
  }(t)) in e) {
    Object.defineProperty(e, t, {
      value: n,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    e[t] = n;
  }
  return e;
}
exports.whenSome = function (e, t, n) {
  t = t || a.noop;
  n = n || a.noop;
  if (!Array.isArray(e)) {
    e = [e];
  }
  var o = e.map(function (e, o) {
    return (0, i.when)(e).then(function (n) {
      if ((0, r.isFunction)(t)) {
        t({
          item: e,
          index: o,
          result: n
        });
      }
      return n;
    }, function (e) {
      e ||= {};
      e.index = o;
      if ((0, r.isFunction)(n)) {
        n(e);
      }
      return new i.Deferred().resolve().promise();
    });
  });
  return i.when.apply(null, o);
};
exports.getDisplayFileSize = function (e) {
  for (var t = ["B", "KB", "MB", "GB", "TB"], n = 0, i = e; i >= 1024 && n <= t.length - 1;) {
    i /= 1024;
    n++;
  }
  i = Math.round(i * 10) / 10;
  return `${i} ${t[n]}`;
};
exports.extendAttributes = function (e, t, n) {
  n.forEach(function (n) {
    (0, o.extend)(true, e, (0, r.isDefined)(t[n]) ? l({}, n, t[n]) : {});
  });
  return e;
};
exports.findItemsByKeys = function (e, t) {
  var n = {};
  t.forEach(function (e) {
    n[e] = null;
  });
  e.forEach(function (e) {
    var t = e.fileItem.key;
    if (Object.prototype.hasOwnProperty.call(n, t)) {
      n[t] = e;
    }
  });
  var i = [];
  t.forEach(function (e) {
    var t = n[e];
    if (t) {
      i.push(t);
    }
  });
  return i;
};
exports.getMapFromObject = function (e) {
  var t = Object.keys(e);
  var n = [];
  t.forEach(function (t) {
    return n.push(e[t]);
  });
  return {
    keys: t,
    values: n
  };
};