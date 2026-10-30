exports.serializeValue = exports.serializePropName = exports.serializeKey = exports.sendRequest = exports.keyConverters = exports.generateSelect = exports.generateExpand = exports.formatFunctionInvocationUrl = exports.escapeServiceOperationParams = exports.convertPrimitiveValue = exports.EdmLiteral = undefined;
var i = p(require("./38377.js"));
var o = require("./13306.js");
var a = require("./35922.js");
var r = require("./95479.js");
var s = p(require("./37208.js"));
var l = p(require("./73176.js"));
var u = require("./20576.js");
var d = require("./62754.js");
var c = require("./18438.js");
var h = require("./16454.js");
var f = require("./68752.js");
function p(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
function g(e) {
  return (g = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function (e) {
    return typeof e;
  } : function (e) {
    if (e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype) {
      return "symbol";
    } else {
      return typeof e;
    }
  })(e);
}
var m = /^(\{{0,1}([0-9a-fA-F]){8}-([0-9a-fA-F]){4}-([0-9a-fA-F]){4}-([0-9a-fA-F]){4}-([0-9a-fA-F]){12}\}{0,1})$/;
var _ = /^\/Date\((-?\d+)((\+|-)?(\d+)?)\)\/$/;
var v = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?(Z|[-+]{1}\d{2}(:?)(\d{2})?)?$/;
var y = "application/json;odata=verbose";
function b(e) {
  if ((0, a.type)(e) === "string") {
    return e.split();
  } else {
    return e;
  }
}
function x(e) {
  return /\./.test(e);
}
function w(e, t, n) {
  for (e = String(e); e.length < t;) {
    e = n ? `${e}0` : `0${e}`;
  }
  return e;
}
function C(e, t, n) {
  var i = [];
  function o(e) {
    return w(e, 2);
  }
  i.push(e.getFullYear());
  i.push("-");
  i.push(o(e.getMonth() + 1));
  i.push("-");
  i.push(o(e.getDate()));
  if (!t || !(e.getHours() + e.getMinutes() + e.getSeconds() + e.getMilliseconds() < 1)) {
    i.push("T");
    i.push(o(e.getHours()));
    i.push(":");
    i.push(o(e.getMinutes()));
    i.push(":");
    i.push(o(e.getSeconds()));
    if (e.getMilliseconds()) {
      i.push(".");
      i.push(w(e.getMilliseconds(), 3));
    }
    if (!n) {
      i.push("Z");
    }
  }
  return i.join("");
}
function S(e) {
  var t = new Date(new Date(0).getTimezoneOffset() * 60 * 1000);
  var n = e.replace("Z", "").split("T");
  var i = /(\d{4})-(\d{2})-(\d{2})/.exec(n[0]);
  var o = /(\d{2}):(\d{2}):(\d{2})\.?(\d{0,7})?/.exec(n[1]);
  t.setFullYear(Number(i[1]));
  t.setMonth(Number(i[2]) - 1);
  t.setDate(Number(i[3]));
  if (Array.isArray(o) && o.length) {
    t.setHours(Number(o[1]));
    t.setMinutes(Number(o[2]));
    t.setSeconds(Number(o[3]));
    var a = (o[4] || "").slice(0, 3);
    a = w(a, 3, true);
    t.setMilliseconds(Number(a));
  }
  return t;
}
function k(e) {
  var t = [];
  for (var n in e) {
    t.push(n + "=" + e[n]);
  }
  return t.join("&");
}
exports.sendRequest = function e(t, n, i) {
  var a = i.deserializeDates;
  var r = i.fieldTypes;
  var l = i.countOnly;
  var u = i.isPaged;
  var f = new d.Deferred();
  var p = function (e, t) {
    var n;
    var i = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    function a(t) {
      return JSON.stringify(t, function (t, n) {
        if (!(this[t] instanceof Date)) {
          return n;
        }
        n = C(this[t]);
        switch (e) {
          case 2:
            return n.substr(0, n.length - 1);
          case 3:
          case 4:
            return n;
          default:
            throw c.errors.Error("E4002");
        }
      });
    }
    t = (0, o.extend)({
      async: true,
      method: "get",
      url: "",
      params: {},
      payload: null,
      headers: {},
      timeout: 30000
    }, t);
    if ((n = i.beforeSend) !== null && n !== undefined) {
      n.call(i, t);
    }
    var r = t;
    var s = r.async;
    var l = r.timeout;
    var u = r.headers;
    var d = t;
    var h = d.url;
    var f = d.method;
    var p = i.jsonp;
    var g = i.withCredentials;
    var m = (f = (f || "get").toLowerCase()) === "get";
    var _ = m && p;
    var v = (0, o.extend)({}, t.params);
    var b = m ? v : a(t.payload);
    var x = !m && k(v);
    var w = !m && y;
    if (x) {
      h += (h.indexOf("?") > -1 ? "&" : "?") + x;
    }
    if (_) {
      b.$format = "json";
    }
    return {
      url: h,
      data: b,
      dataType: _ ? "jsonp" : "json",
      jsonp: _ && "$callback",
      method: f,
      async: s,
      timeout: l,
      headers: u,
      contentType: w,
      accepts: {
        json: [y, "text/plain"].join()
      },
      xhrFields: {
        withCredentials: g
      }
    };
  }(t, n, i);
  s.default.sendRequest(p).always(function (n, o) {
    var s = D(n, o, {
      deserializeDates: a,
      fieldTypes: r
    }, p);
    var d = s.error;
    var g = s.data;
    var m = s.count;
    var _ = s.nextUrl;
    if (d) {
      if (d.message !== h.XHR_ERROR_UNLOAD) {
        f.reject(d);
      }
    } else if (l) {
      if (isFinite(m)) {
        f.resolve(m);
      } else {
        f.reject(new c.errors.Error("E4018"));
      }
    } else if (_ && !u) {
      if (!/^(?:[a-z]+:)?\/{2,2}/i.test(_)) {
        _ = function (e, t) {
          var n;
          var i;
          var o;
          var a = (i = e, o = i.indexOf("?"), o > -1 ? i.substr(0, o) : i).split("/");
          var r = t.split("/");
          for (a.pop(); r.length;) {
            if ((n = r.shift()) === "..") {
              a.pop();
            } else {
              a.push(n);
            }
          }
          return a.join("/");
        }(p.url, _);
      }
      e(t, {
        url: _
      }, i).fail(f.reject).done(function (e) {
        return f.resolve(g.concat(e));
      });
    } else {
      var v = isFinite(m) ? {
        totalCount: m
      } : undefined;
      f.resolve(g, v);
    }
  });
  return f.promise();
};
function D(e, t, n, i) {
  var r = function (e, t, n) {
    if (t === "nocontent") {
      return null;
    }
    var l = "Unknown error";
    var u = e;
    var d = 200;
    var c = {
      requestOptions: n
    };
    if (t !== "success") {
      var f = e.status;
      var p = e.responseText;
      d = f;
      l = (0, h.errorMessageFromXhr)(e, t);
      try {
        u = JSON.parse(p);
      } catch (e) {}
    }
    var g = u?.then || u?.error || u?.["odata.error"] || u?.["@odata.error"];
    if (g) {
      l = function (e) {
        var t;
        var i = e;
        if ("message" in e) {
          t = e.message?.value || e.message;
        }
        while (i = i.innererror || i.internalexception) {
          t = i.message ?? t;
          if (i.internalexception && t.indexOf("inner exception") === -1) {
            break;
          }
        }
        return t;
      }(g) || l;
      c.errorDetails = g;
      if (d === 200) {
        d = 500;
      }
      var m = Number(g.code);
      if (isFinite(m) && m >= 400) {
        d = m;
      }
    }
    if (d >= 400 || d === 0) {
      c.httpStatus = d;
      return (0, o.extend)(Error(l), c);
    } else {
      return null;
    }
  }(e, t, i);
  if (r) {
    return {
      error: r
    };
  }
  if (!(0, a.isPlainObject)(e)) {
    return {
      data: e
    };
  }
  var s = "d" in e && (Array.isArray(e.d) || (0, a.isObject)(e.d)) ? I(e) : T(e);
  O(s, n);
  return s;
}
function I(e) {
  var n = e.d;
  if ((0, a.isDefined)(n)) {
    return {
      data: n.results ?? n,
      nextUrl: n.__next,
      count: parseInt(n.__count, 10)
    };
  } else {
    return {
      error: Error("Malformed or unsupported JSON response received")
    };
  }
}
function T(e) {
  return {
    data: e.value ?? e,
    nextUrl: e["@odata.nextLink"],
    count: parseInt(e["@odata.count"], 10)
  };
}
var E = i.default.inherit({
  ctor: function (e) {
    this._value = e;
  },
  valueOf: function () {
    return this._value;
  }
});
exports.EdmLiteral = E;
var O = function e(t, n = {}) {
  (0, r.each)(t, function (i, o) {
    if (o !== null && g(o) === "object") {
      if ("results" in o) {
        t[i] = o.results;
      }
      e(t[i], n);
    } else if (typeof o == "string") {
      var a = n.fieldTypes;
      var r = n.deserializeDates;
      if ((!a || a[i] !== "String") && m.test(o)) {
        t[i] = new l.default(o);
      }
      if (r !== false) {
        if (o.match(_)) {
          var s = new Date(Number(RegExp.$1) + RegExp.$2 * 60 * 1000);
          t[i] = new Date(s.valueOf() + s.getTimezoneOffset() * 60 * 1000);
        } else if (v.test(o)) {
          t[i] = new Date(S(t[i]).valueOf());
        }
      }
    }
  });
};
function A(e) {
  if (e instanceof E) {
    return e.valueOf();
  } else {
    return e.replace(/\./g, "/");
  }
}
exports.serializePropName = A;
function P(e) {
  if (e instanceof Date) {
    return `datetime'${C(e, true, true)}'`;
  } else if (e instanceof l.default) {
    return `guid'${e}'`;
  } else if (e instanceof E) {
    return e.valueOf();
  } else if (typeof e == "string") {
    return function (e) {
      return `'${e.replace(/'/g, "''")}'`;
    }(e);
  } else {
    return String(e);
  }
}
function M(e, t) {
  switch (t) {
    case 2:
    case 3:
      return P(e);
    case 4:
      return function e(t) {
        if (t instanceof Date) {
          return C(t, false, false);
        } else if (t instanceof l.default) {
          return t.valueOf();
        } else if (Array.isArray(t)) {
          return `[${t.map(function (t) {
            return e(t);
          }).join(",")}]`;
        } else {
          return P(t);
        }
      }(e);
    default:
      throw c.errors.Error("E4002");
  }
}
exports.serializeValue = M;
exports.serializeKey = function (e, t) {
  if ((0, a.isPlainObject)(e)) {
    var n = [];
    (0, r.each)(e, function (e, i) {
      return n.push(`${A(e)}=${M(i, t)}`);
    });
    return n.join();
  }
  return M(e, t);
};
var R = {
  String: function (e) {
    return `${e}`;
  },
  Int32: function (e) {
    return Math.floor(e);
  },
  Int64: function (e) {
    if (e instanceof E) {
      return e;
    } else {
      return new E(`${e}L`);
    }
  },
  Guid: function (e) {
    if (e instanceof l.default) {
      return e;
    } else {
      return new l.default(e);
    }
  },
  Boolean: function (e) {
    return !!e;
  },
  Single: function (e) {
    if (e instanceof E) {
      return e;
    } else {
      return new E(e + "f");
    }
  },
  Decimal: function (e) {
    if (e instanceof E) {
      return e;
    } else {
      return new E(e + "m");
    }
  }
};
exports.keyConverters = R;
exports.convertPrimitiveValue = function (e, t) {
  if (t === null) {
    return null;
  }
  var n = R[e];
  if (!n) {
    throw c.errors.Error("E4014", e);
  }
  return n(t);
};
exports.generateSelect = function (e, t) {
  if (t) {
    if (e < 4) {
      return A(t.join());
    } else {
      return (0, u.grep)(t, x, true).join();
    }
  }
};
function B(e) {
  var t = [];
  (0, r.each)(e, function (e, n) {
    return t.push(`${e}${function e(t) {
      var n = "";
      var i = [];
      var o = [];
      (0, r.each)(t, function (t, n) {
        if (Array.isArray(n)) {
          [].push.apply(i, n);
        }
        if ((0, a.isPlainObject)(n)) {
          o.push(`${t}${e(n)}`);
        }
      });
      if (i.length || o.length) {
        n += "(";
        if (i.length) {
          n += `\$select=${(0, r.map)(i, A).join()}`;
        }
        if (o.length) {
          if (i.length) {
            n += ";";
          }
          n += `\$expand=${(0, r.map)(o, A).join()}`;
        }
        n += ")";
      }
      return n;
    }(n)}`);
  });
  return t.join();
}
function L(e, t, n) {
  return (0, r.each)(e, function (e, i) {
    return function e(t, n, i) {
      var o = i(n, t.shift(), t);
      if (o !== false) {
        e(t, o, i);
      }
    }(i.split("."), t, n);
  });
}
exports.generateExpand = function (e, t, n) {
  if (e < 4) {
    return function (e, t) {
      var n = {};
      if (e) {
        (0, r.each)(b(e), function () {
          n[A(this)] = 1;
        });
      }
      if (t) {
        (0, r.each)(b(t), function () {
          var e = this.split(".");
          if (!(e.length < 2)) {
            e.pop();
            n[A(e.join("."))] = 1;
          }
        });
      }
      return (0, r.map)(n, function (e, t) {
        return t;
      }).join();
    }(t, n);
  } else {
    return function (e, t) {
      var n = {};
      if (e || t) {
        if (e) {
          L(b(e), n, function (e, t, n) {
            e[t] = e[t] || {};
            return !!n.length && e[t];
          });
        }
        if (t) {
          L((0, u.grep)(b(t), x), n, function (e, t, n) {
            if (n.length) {
              return e[t] = e[t] || {};
            } else {
              e[t] = e[t] || [];
              e[t].push(t);
              return false;
            }
          });
        }
        return B(n);
      }
    }(t, n);
  }
};
exports.formatFunctionInvocationUrl = function (e, t) {
  return (0, f.format)("{0}({1})", e, (0, r.map)(t || {}, function (e, t) {
    return (0, f.format)("{0}={1}", t, e);
  }).join(","));
};
exports.escapeServiceOperationParams = function (e, t) {
  if (!e) {
    return e;
  }
  var n = {};
  (0, r.each)(e, function (e, i) {
    n[e] = M(i, t);
  });
  return n;
};