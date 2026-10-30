exports.default = undefined;
var i = require("./35922.js");
var o = c(require("./80209.js"));
var a = require("./77869.js");
var r = require("./18438.js");
var s = c(require("./96687.js"));
var l = c(require("./67403.js"));
var u = c(require("./63081.js"));
var d = require("./62754.js");
function c(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
function h(e) {
  return (h = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function (e) {
    return typeof e;
  } : function (e) {
    if (e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype) {
      return "symbol";
    } else {
      return typeof e;
    }
  })(e);
}
function f(e, t, n) {
  if ((t = function (e) {
    var t = function (e, t) {
      if (h(e) !== "object" || e === null) {
        return e;
      }
      var n = e[Symbol.toPrimitive];
      if (n !== undefined) {
        var i = n.call(e, t || "default");
        if (h(i) !== "object") {
          return i;
        }
        throw new TypeError("@@toPrimitive must return a primitive value.");
      }
      return (t === "string" ? String : Number)(e);
    }(e, "string");
    if (h(t) === "symbol") {
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
require("./54263.js");
var p = l.default.inherit({
  ctor: function (e) {
    this.callBase(e);
    this._requestDispatcher = new u.default(e);
    var t = this.key();
    var n = e.fieldTypes;
    var i = e.keyType;
    if (i) {
      var o = typeof i == "string";
      if (!t) {
        t = o ? "5d46402c-7899-4ea9-bd81-8b73c47c7683" : Object.keys(i);
        this._legacyAnonymousKey = t;
      }
      if (o) {
        i = function (e, t) {
          return f({}, e, t);
        }(t, i);
      }
      n = function (e, t) {
        var n = {};
        for (var i in e) {
          n[i] = e[i];
        }
        for (var o in t) {
          if (o in n) {
            if (n[o] !== t[o]) {
              r.errors.log("W4001", o);
            }
          } else {
            n[o] = t[o];
          }
        }
        return n;
      }(n, i);
    }
    this._fieldTypes = n || {};
    if (this.version() === 2) {
      this._updateMethod = "MERGE";
    } else {
      this._updateMethod = "PATCH";
    }
  },
  _customLoadOptions: function () {
    return ["expand", "customQueryParams"];
  },
  _byKeyImpl: function (e, t) {
    var n = {};
    if (t) {
      n.$expand = (0, a.generateExpand)(this.version(), t.expand, t.select) || undefined;
      n.$select = (0, a.generateSelect)(this.version(), t.select) || undefined;
    }
    return this._requestDispatcher.sendRequest(this._byKeyUrl(e), "GET", n);
  },
  createQuery: function (e) {
    var n;
    var o = {
      adapter: "odata",
      beforeSend: this._requestDispatcher.beforeSend,
      errorHandler: this._errorHandler,
      jsonp: this._requestDispatcher.jsonp,
      version: this._requestDispatcher.version,
      withCredentials: this._requestDispatcher._withCredentials,
      expand: e == null ? undefined : e.expand,
      requireTotalCount: e == null ? undefined : e.requireTotalCount,
      deserializeDates: this._requestDispatcher._deserializeDates,
      fieldTypes: this._fieldTypes
    };
    n = (e == null ? undefined : e.urlOverride) ?? this._requestDispatcher.url;
    if ((0, i.isDefined)(this._requestDispatcher.filterToLower)) {
      o.filterToLower = this._requestDispatcher.filterToLower;
    }
    if (e != null && e.customQueryParams) {
      var r = (0, a.escapeServiceOperationParams)(e == null ? undefined : e.customQueryParams, this.version());
      if (this.version() === 4) {
        n = (0, a.formatFunctionInvocationUrl)(n, r);
      } else {
        o.params = r;
      }
    }
    return (0, s.default)(n, o);
  },
  _insertImpl: function (e) {
    var t = this;
    this._requireKey();
    var n = new d.Deferred();
    (0, d.when)(this._requestDispatcher.sendRequest(this._requestDispatcher.url, "POST", null, e)).done(function (i) {
      return n.resolve(i && !(0, o.default)().useLegacyStoreResult ? i : e, t.keyOf(i));
    }).fail(n.reject);
    return n.promise();
  },
  _updateImpl: function (e, t) {
    var n = new d.Deferred();
    (0, d.when)(this._requestDispatcher.sendRequest(this._byKeyUrl(e), this._updateMethod, null, t)).done(function (i) {
      if ((0, o.default)().useLegacyStoreResult) {
        return n.resolve(e, t);
      } else {
        return n.resolve(i || t, e);
      }
    }).fail(n.reject);
    return n.promise();
  },
  _removeImpl: function (e) {
    var t = new d.Deferred();
    (0, d.when)(this._requestDispatcher.sendRequest(this._byKeyUrl(e), "DELETE")).done(function () {
      return t.resolve(e);
    }).fail(t.reject);
    return t.promise();
  },
  _convertKey: function (e) {
    var t = e;
    var n = this._fieldTypes;
    var i = this.key() || this._legacyAnonymousKey;
    if (Array.isArray(i)) {
      t = {};
      for (var o = 0; o < i.length; o++) {
        var r = i[o];
        t[r] = (0, a.convertPrimitiveValue)(n[r], e[r]);
      }
    } else if (n[i]) {
      t = (0, a.convertPrimitiveValue)(n[i], e);
    }
    return t;
  },
  _byKeyUrl: function (e) {
    var t = this._requestDispatcher.url;
    var n = this._convertKey(e);
    return `${t}(${encodeURIComponent((0, a.serializeKey)(n, this.version()))})`;
  },
  version: function () {
    return this._requestDispatcher.version;
  }
}, "odata");
exports.default = p;
module.exports = exports.default;
module.exports.default = exports.default;