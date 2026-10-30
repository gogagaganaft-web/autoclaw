exports.default = undefined;
var i;
var o = require("./13306.js");
var a = require("./44297.js");
var r = (i = require("./53305.js")) && i.__esModule ? i : {
  default: i
};
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
function l(e, t) {
  return (l = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (e, t) {
    e.__proto__ = t;
    return e;
  })(e, t);
}
var u = function (e) {
  var t;
  var n;
  function i(t) {
    var n;
    (n = e.call(this) || this)._diagramWidget = t;
    n._resetCache();
    return n;
  }
  n = e;
  (t = i).prototype = Object.create(n.prototype);
  t.prototype.constructor = t;
  l(t, n);
  var a = i.prototype;
  a._dataSourceChangedHandler = function (e, t) {
    this._resetCache();
    this._items = e.map(function (e) {
      return (0, o.extend)(true, {}, e);
    });
    this._dataSourceItems = e.slice();
    if (t && t.changes) {
      var n = t.changes.filter(function (e) {
        return e.internalChange;
      });
      var i = t.changes.filter(function (e) {
        return !e.internalChange;
      });
      if (n.length) {
        this._reloadContentByChanges(n, false);
      }
      if (i.length) {
        this._reloadContentByChanges(i, true);
      }
    } else {
      this._diagramWidget._onDataSourceChanged();
    }
  };
  a._dataSourceLoadingChangedHandler = function (e) {
    if (e && !this._dataSource.isLoaded()) {
      this._diagramWidget._showLoadingIndicator();
    } else {
      this._diagramWidget._hideLoadingIndicator();
    }
  };
  a._prepareData = function (e) {
    for (var t in e) {
      if (Object.prototype.hasOwnProperty.call(e, t) && e[t] === undefined) {
        e[t] = null;
      }
    }
    return e;
  };
  a.insert = function (e, t, n) {
    var i = this;
    this._resetCache();
    var o = this._getStore();
    o.insert(this._prepareData(e)).done(function (e, n) {
      o.push([{
        type: "insert",
        key: n,
        data: e,
        internalChange: true
      }]);
      if (t) {
        t(e);
      }
      i._resetCache();
    }).fail(function (e) {
      if (n) {
        n(e);
      }
      i._resetCache();
    });
  };
  a.update = function (e, t, n, i) {
    var o = this._getStore();
    var a = this._getStoreKey(o, e, t);
    o.update(a, this._prepareData(t)).done(function (e, t) {
      o.push([{
        type: "update",
        key: t,
        data: e,
        internalChange: true
      }]);
      if (n) {
        n(t, e);
      }
    }).fail(function (e) {
      if (i) {
        i(e);
      }
    });
  };
  a.remove = function (e, t, n, i) {
    var o = this;
    this._resetCache();
    var a = this._getStore();
    var r = this._getStoreKey(a, e, t);
    a.remove(r).done(function (e) {
      a.push([{
        type: "remove",
        key: e,
        internalChange: true
      }]);
      if (n) {
        n(e);
      }
      o._resetCache();
    }).fail(function (e) {
      if (i) {
        i(e);
      }
      o._resetCache();
    });
  };
  a.findItem = function (e) {
    if (this._items) {
      return this._getItemByKey(e);
    } else {
      return null;
    }
  };
  a.getItems = function () {
    return this._items;
  };
  a.hasItems = function () {
    return !!this._items;
  };
  a._reloadContentByChanges = function (e, t) {
    var n = this;
    e = e.map(function (e) {
      return (0, o.extend)(e, {
        internalKey: n._getInternalKey(e.key)
      });
    });
    this._diagramWidget._reloadContentByChanges(e, t);
  };
  a._getItemByKey = function (e) {
    this._ensureCache();
    var t = this._cache;
    var n = this._getIndexByKey(e);
    return t.items[n];
  };
  a._getIndexByKey = function (e) {
    this._ensureCache();
    var t = this._cache;
    if (s(e) !== "object") {
      var n = t.keySet || t.keys.reduce(function (e, t, n) {
        e[t] = n;
        return e;
      }, {});
      t.keySet ||= n;
      return n[e];
    }
    for (var i = 0, o = t.keys.length; i < o; i++) {
      if (t.keys[i] === e) {
        return i;
      }
    }
    return -1;
  };
  a._ensureCache = function () {
    var e = this._cache;
    if (!e.keys) {
      e.keys = [];
      e.items = [];
      this._fillCache(e, this._items);
    }
  };
  a._fillCache = function (e, t) {
    var n = this;
    if (t && t.length) {
      var i = this._getKeyExpr();
      if (i) {
        t.forEach(function (t) {
          e.keys.push(i(t));
          e.items.push(t);
        });
      }
      var o = this._getItemsExpr();
      if (o) {
        t.forEach(function (t) {
          return n._fillCache(e, o(t));
        });
      }
      var a = this._getContainerChildrenExpr();
      if (a) {
        t.forEach(function (t) {
          return n._fillCache(e, a(t));
        });
      }
    }
  };
  a._getKeyExpr = function () {
    throw "Not Implemented";
  };
  a._getItemsExpr = function () {};
  a._getContainerChildrenExpr = function () {};
  a._initDataSource = function () {
    e.prototype._initDataSource.call(this);
    if (this._dataSource) {
      this._dataSource.paginate(false);
    }
  };
  a._dataSourceOptions = function () {
    return {
      paginate: false
    };
  };
  a._getStore = function () {
    return this._dataSource && this._dataSource.store();
  };
  a._getStoreKey = function (e, t, n) {
    var i = e.keyOf(n);
    if (i === n) {
      var o = this._getKeyExpr();
      this._dataSourceItems.forEach(function (e) {
        if (o(e) === t) {
          i = e;
        }
      });
    }
    return i;
  };
  a._getInternalKey = function (e) {
    if (s(e) === "object") {
      return this._getKeyExpr()(e);
    } else {
      return e;
    }
  };
  a._resetCache = function () {
    this._cache = {};
  };
  return i;
}(a.Component.inherit({}).include(r.default));
exports.default = u;
module.exports = exports.default;
module.exports.default = exports.default;