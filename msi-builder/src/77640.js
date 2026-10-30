exports.AgendaResourceProcessor = undefined;
var i = require("./89386.js");
var o = require("./62754.js");
var a = require("./98140.js");
function r(e) {
  return (r = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function (e) {
    return typeof e;
  } : function (e) {
    if (e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype) {
      return "symbol";
    } else {
      return typeof e;
    }
  })(e);
}
function s(e, t) {
  for (var n = 0; n < t.length; n++) {
    var i = t[n];
    i.enumerable = i.enumerable || false;
    i.configurable = true;
    if ("value" in i) {
      i.writable = true;
    }
    Object.defineProperty(e, (o = i.key, a = undefined, a = function (e, t) {
      if (r(e) !== "object" || e === null) {
        return e;
      }
      var n = e[Symbol.toPrimitive];
      if (n !== undefined) {
        var i = n.call(e, t || "default");
        if (r(i) !== "object") {
          return i;
        }
        throw new TypeError("@@toPrimitive must return a primitive value.");
      }
      return (t === "string" ? String : Number)(e);
    }(o, "string"), r(a) === "symbol" ? a : String(a)), i);
  }
  var o;
  var a;
}
function l(e, t) {
  this.rawAppointment = e;
  this.promise = t;
}
var u = function () {
  function e(e = []) {
    this._resourceDeclarations = e;
    this.isLoaded = false;
    this.isLoading = false;
    this.resourceMap = new Map();
    this.appointmentPromiseQueue = [];
  }
  var t;
  var n;
  var r;
  var u = e.prototype;
  u._pushAllResources = function () {
    var e = this;
    this.appointmentPromiseQueue.forEach(function (t) {
      var n = t.promise;
      var o = t.rawAppointment;
      var a = [];
      e.resourceMap.forEach(function (e, t) {
        var n = {
          label: e.label,
          values: []
        };
        if (t in o) {
          (0, i.wrapToArray)(o[t]).forEach(function (t) {
            return n.values.push(e.map.get(t));
          });
        }
        if (n.values.length) {
          a.push(n);
        }
      });
      n.resolve(a);
    });
    this.appointmentPromiseQueue = [];
  };
  u._onPullResource = function (e, t, n, i, o) {
    var a = new Map();
    o.forEach(function (e) {
      return a.set(e[t], e[n]);
    });
    this.resourceMap.set(e, {
      label: i,
      map: a
    });
  };
  u._hasResourceDeclarations = function (e) {
    return e.length !== 0 || (this.appointmentPromiseQueue.forEach(function (e) {
      return e.promise.resolve([]);
    }), this.appointmentPromiseQueue = [], false);
  };
  u._tryPullResources = function (e, t) {
    var n = this;
    if (!this.isLoading) {
      this.isLoading = true;
      var i = [];
      e.forEach(function (e) {
        var t = new o.Deferred().done(function (t) {
          return n._onPullResource((0, a.getFieldExpr)(e), (0, a.getValueExpr)(e), (0, a.getDisplayExpr)(e), e.label, t);
        });
        i.push(t);
        var r = (0, a.getWrappedDataSource)(e.dataSource);
        if (r.isLoaded()) {
          t.resolve(r.items());
        } else {
          r.load().done(function (e) {
            return t.resolve(e);
          }).fail(function () {
            return t.reject();
          });
        }
      });
      o.when.apply(null, i).done(function () {
        n.isLoaded = true;
        n.isLoading = false;
        n._pushAllResources();
      }).fail(function () {
        return t.reject();
      });
    }
  };
  u.initializeState = function (e = []) {
    this.resourceDeclarations = e;
  };
  u.createListAsync = function (e) {
    var t = new o.Deferred();
    this.appointmentPromiseQueue.push(new l(e, t));
    if (this._hasResourceDeclarations(this.resourceDeclarations)) {
      if (this.isLoaded) {
        this._pushAllResources();
      } else {
        this._tryPullResources(this.resourceDeclarations, t);
      }
    }
    return t.promise();
  };
  t = e;
  if (n = [{
    key: "resourceDeclarations",
    get: function () {
      return this._resourceDeclarations;
    },
    set: function (e) {
      this._resourceDeclarations = e;
      this.isLoaded = false;
      this.isLoading = false;
      this.resourceMap.clear();
      this.appointmentPromiseQueue = [];
    }
  }]) {
    s(t.prototype, n);
  }
  if (r) {
    s(t, r);
  }
  Object.defineProperty(t, "prototype", {
    writable: false
  });
  return e;
}();
exports.AgendaResourceProcessor = u;