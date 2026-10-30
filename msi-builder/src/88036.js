exports.default = undefined;
var i = f(require("./68374.js"));
var o = require("./16454.js");
var a = require("./60637.js");
var r = require("./35922.js");
var s = f(require("./80209.js"));
var l = require("./18438.js");
var u = f(require("./67403.js"));
var d = f(require("./35042.js"));
var c = f(require("./99236.js"));
var h = require("./62754.js");
function f(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
function p(e) {
  return e && (0, r.isFunction)(e.then);
}
function g(e) {
  return new h.Deferred().resolve(e).promise();
}
function m(e, t) {
  if (!(0, r.isFunction)(t)) {
    throw l.errors.Error("E4011", e);
  }
}
function _(e) {
  throw l.errors.Error("E4012", e);
}
function v(e) {
  function t(e) {
    var t = e[0];
    var n = e[1];
    if (t && t.getResponseHeader) {
      return (0, o.errorMessageFromXhr)(t, n);
    } else {
      return null;
    }
  }
  return function (n) {
    var i;
    if ((i = n instanceof Error ? n : new Error(t(arguments) || n && String(n) || "Unknown error")).message !== o.XHR_ERROR_UNLOAD) {
      e.reject(i);
    }
  };
}
function y(e, t) {
  var n;
  var i = e._loadFunc;
  m("load", i);
  n = i.apply(e, [t]);
  if (Array.isArray(n)) {
    n = g(n);
  } else if (n == null) {
    n = g([]);
  } else if (!p(n)) {
    _("load");
  }
  return (0, h.fromPromise)(n);
}
function b(e, t, n, i) {
  if (t.__rawData) {
    i(t.__rawData);
  } else {
    var o = t.__rawDataPromise || y(t, n);
    if (t._cacheRawData) {
      t.__rawDataPromise = o;
    }
    o.always(function () {
      delete t.__rawDataPromise;
    }).done(function (e) {
      if (t._cacheRawData) {
        t.__rawData = e;
      }
      i(e);
    }).fail(v(e));
  }
}
function x(e, t, n, o) {
  var a = {};
  if ("userData" in (n = n || {})) {
    a.userData = n.userData;
  }
  b(e, t, a, function (a) {
    var r;
    var s;
    var l;
    var u;
    var f = (0, d.default)(a, {
      errorHandler: t._errorHandler
    });
    var p = [];
    if (!o) {
      if ((r = c.default.queryByOptions(f, n)) === f) {
        l = a.slice(0);
      } else {
        p.push(r.enumerate().done(function (e) {
          l = e;
        }));
      }
    }
    if (n.requireTotalCount || o) {
      if ((s = c.default.queryByOptions(f, n, true)) === f) {
        u = a.length;
      } else {
        p.push(s.count().done(function (e) {
          u = e;
        }));
      }
    }
    h.when.apply(i.default, p).done(function () {
      if (o) {
        e.resolve(u);
      } else if (n.requireTotalCount) {
        e.resolve(l, {
          totalCount: u
        });
      } else {
        e.resolve(l);
      }
    }).fail(function (t) {
      e.reject(t);
    });
  });
}
var w = u.default.inherit({
  ctor: function (e) {
    e = e || {};
    this.callBase(e);
    this._useDefaultSearch = !!e.useDefaultSearch || e.loadMode === "raw";
    this._loadMode = e.loadMode;
    this._cacheRawData = e.cacheRawData !== false;
    this._loadFunc = e.load;
    this._totalCountFunc = e.totalCount;
    this._byKeyFunc = e.byKey;
    this._insertFunc = e.insert;
    this._updateFunc = e.update;
    this._removeFunc = e.remove;
  },
  _clearCache: function () {
    delete this.__rawData;
  },
  createQuery: function () {
    throw l.errors.Error("E4010");
  },
  clearRawDataCache: function () {
    this._clearCache();
  },
  _totalCountImpl: function (e) {
    var t = new h.Deferred();
    if (this._loadMode !== "raw" || this._totalCountFunc) {
      (function (e, t) {
        var n;
        var i = e._totalCountFunc;
        if (!(0, r.isFunction)(i)) {
          throw l.errors.Error("E4021");
        }
        if (!p(n = i.apply(e, [t]))) {
          n = Number(n);
          if (!isFinite(n)) {
            _("totalCount");
          }
          n = g(n);
        }
        return (0, h.fromPromise)(n);
      })(this, e).done(function (e) {
        t.resolve(Number(e));
      }).fail(v(t));
      t = this._addFailHandlers(t);
    } else {
      x(t, this, e, true);
    }
    return t.promise();
  },
  _pushImpl: function (e) {
    if (this.__rawData) {
      (0, a.applyBatch)({
        keyInfo: this,
        data: this.__rawData,
        changes: e
      });
    }
  },
  _loadImpl: function (e) {
    var t = new h.Deferred();
    if (this._loadMode === "raw") {
      x(t, this, e, false);
    } else {
      y(this, e).done(function (e, n) {
        t.resolve(e, n);
      }).fail(v(t));
      t = this._addFailHandlers(t);
    }
    return t.promise();
  },
  _byKeyImpl: function (e, t) {
    var n = new h.Deferred();
    if (this._byKeyViaLoad()) {
      this._requireKey();
      (function (e, t, n) {
        b(e, t, {}, function (i) {
          var a;
          var r = t.key();
          for (var s = 0, u = i.length; s < u; s++) {
            a = i[s];
            if ((0, o.keysEqual)(r, t.keyOf(i[s]), n)) {
              e.resolve(a);
              return;
            }
          }
          e.reject(l.errors.Error("E4009"));
        });
      })(n, this, e);
    } else {
      (function (e, t, n) {
        var i;
        var o = e._byKeyFunc;
        m("byKey", o);
        if (!p(i = o.apply(e, [t, n]))) {
          i = g(i);
        }
        return (0, h.fromPromise)(i);
      })(this, e, t).done(function (e) {
        n.resolve(e);
      }).fail(v(n));
    }
    return n.promise();
  },
  _byKeyViaLoad: function () {
    return this._loadMode === "raw" && !this._byKeyFunc;
  },
  _insertImpl: function (e) {
    var t;
    var n = this;
    var i = n._insertFunc;
    var o = new h.Deferred();
    m("insert", i);
    if (!p(t = i.apply(n, [e]))) {
      t = g(t);
    }
    (0, h.fromPromise)(t).done(function (t) {
      if ((0, s.default)().useLegacyStoreResult) {
        o.resolve(e, t);
      } else {
        o.resolve(t || e, n.keyOf(t));
      }
    }).fail(v(o));
    return o.promise();
  },
  _updateImpl: function (e, t) {
    var n;
    var i = this._updateFunc;
    var o = new h.Deferred();
    m("update", i);
    if (!p(n = i.apply(this, [e, t]))) {
      n = g(n);
    }
    (0, h.fromPromise)(n).done(function (n) {
      if ((0, s.default)().useLegacyStoreResult) {
        o.resolve(e, t);
      } else {
        o.resolve(n || t, e);
      }
    }).fail(v(o));
    return o.promise();
  },
  _removeImpl: function (e) {
    var t;
    var n = this._removeFunc;
    var i = new h.Deferred();
    m("remove", n);
    if (!p(t = n.apply(this, [e]))) {
      t = g();
    }
    (0, h.fromPromise)(t).done(function () {
      i.resolve(e);
    }).fail(v(i));
    return i.promise();
  }
});
exports.default = w;
module.exports = exports.default;
module.exports.default = exports.default;