exports.AppointmentDataSource = undefined;
var i = require("./62754.js");
function o(e) {
  return (o = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function (e) {
    return typeof e;
  } : function (e) {
    if (e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype) {
      return "symbol";
    } else {
      return typeof e;
    }
  })(e);
}
function a(e, t) {
  for (var n = 0; n < t.length; n++) {
    var i = t[n];
    i.enumerable = i.enumerable || false;
    i.configurable = true;
    if ("value" in i) {
      i.writable = true;
    }
    Object.defineProperty(e, (a = i.key, r = undefined, r = function (e, t) {
      if (o(e) !== "object" || e === null) {
        return e;
      }
      var n = e[Symbol.toPrimitive];
      if (n !== undefined) {
        var i = n.call(e, t || "default");
        if (o(i) !== "object") {
          return i;
        }
        throw new TypeError("@@toPrimitive must return a primitive value.");
      }
      return (t === "string" ? String : Number)(e);
    }(a, "string"), o(r) === "symbol" ? r : String(r)), i);
  }
  var a;
  var r;
}
var r = "updating";
var s = "push";
var l = function () {
  function e(e) {
    this.setDataSource(e);
    this._updatedAppointmentKeys = [];
  }
  var t;
  var n;
  var o;
  var l = e.prototype;
  l._getStoreKey = function (e) {
    return this._dataSource.store().keyOf(e);
  };
  l.setDataSource = function (e) {
    this._dataSource = e;
    this.cleanState();
    this._initStoreChangeHandlers();
  };
  l._initStoreChangeHandlers = function () {
    var e = this;
    var t = this._dataSource;
    var n = t == null ? undefined : t.store();
    if (n) {
      n.on(r, function (t) {
        var i = n.key();
        if (i) {
          e._updatedAppointmentKeys.push({
            key: i,
            value: t
          });
        } else {
          e._updatedAppointment = t;
        }
      });
      n.on(s, function (i) {
        var o = t.items();
        var a = n.key();
        i.forEach(function (t) {
          if (o.filter(function (e) {
            return e[a] === t.key;
          }).length !== 0) {
            e._updatedAppointmentKeys.push({
              key: a,
              value: t.key
            });
          } else {
            var n = t.data;
            if (n) {
              o.push(n);
            }
          }
        });
        t.load();
      });
    }
  };
  l.getUpdatedAppointment = function () {
    return this._updatedAppointment;
  };
  l.getUpdatedAppointmentKeys = function () {
    return this._updatedAppointmentKeys;
  };
  l.cleanState = function () {
    this._updatedAppointment = null;
    this._updatedAppointmentKeys = [];
  };
  l.add = function (e) {
    var t = this;
    return this._dataSource.store().insert(e).done(function () {
      return t._dataSource.load();
    });
  };
  l.update = function (e, t) {
    var n = this;
    var o = this._getStoreKey(e);
    var a = new i.Deferred();
    this._dataSource.store().update(o, t).done(function (e) {
      return n._dataSource.load().done(function () {
        return a.resolve(e);
      }).fail(a.reject);
    }).fail(a.reject);
    return a.promise();
  };
  l.remove = function (e) {
    var t = this;
    var n = this._getStoreKey(e);
    return this._dataSource.store().remove(n).done(function () {
      return t._dataSource.load();
    });
  };
  l.destroy = function () {
    var e;
    var t = (e = this._dataSource) === null || e === undefined ? undefined : e.store();
    if (t) {
      t.off(r);
      t.off(s);
    }
  };
  t = e;
  if (n = [{
    key: "keyName",
    get: function () {
      return this._dataSource.store().key();
    }
  }, {
    key: "isDataSourceInit",
    get: function () {
      return !!this._dataSource;
    }
  }]) {
    a(t.prototype, n);
  }
  if (o) {
    a(t, o);
  }
  Object.defineProperty(t, "prototype", {
    writable: false
  });
  return e;
}();
exports.AppointmentDataSource = l;