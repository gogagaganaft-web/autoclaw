exports.default = undefined;
var i = f(require("./38377.js"));
var o = require("./80566.js");
var a = require("./95479.js");
var r = require("./18438.js");
var s = require("./16454.js");
var l = require("./47617.js");
var u = f(require("./99236.js"));
var d = require("./62754.js");
var c = require("./20576.js");
var h = require("./35922.js");
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
  return function (e) {
    if (Array.isArray(e)) {
      return g(e);
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
      return g(e, t);
    }
    var n = Object.prototype.toString.call(e).slice(8, -1);
    if (n === "Object" && e.constructor) {
      n = e.constructor.name;
    }
    if (n === "Map" || n === "Set") {
      return Array.from(e);
    }
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) {
      return g(e, t);
    }
  }(e) || function () {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }();
}
function g(e, t) {
  if (t == null || t > e.length) {
    t = e.length;
  }
  for (var n = 0, i = new Array(t); n < t; n++) {
    i[n] = e[n];
  }
  return i;
}
function m() {
  return (m = Object.assign ? Object.assign.bind() : function (e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var i in n) {
        if (Object.prototype.hasOwnProperty.call(n, i)) {
          e[i] = n[i];
        }
      }
    }
    return e;
  }).apply(this, arguments);
}
var _;
var v = i.default.abstract;
var y = u.default.queryByOptions;
var b = {};
var x = i.default.inherit({
  _langParams: {},
  ctor: function (e) {
    var t = this;
    e = e || {};
    this._eventsStrategy = new o.EventsStrategy(this);
    (0, a.each)(["onLoaded", "onLoading", "onInserted", "onInserting", "onUpdated", "onUpdating", "onPush", "onRemoved", "onRemoving", "onModified", "onModifying"], function (n, i) {
      if (i in e) {
        t.on(i.slice(2).toLowerCase(), e[i]);
      }
    });
    this._key = e.key;
    this._errorHandler = e.errorHandler;
    this._useDefaultSearch = true;
  },
  _clearCache: c.noop,
  _customLoadOptions: function () {
    return null;
  },
  key: function () {
    return this._key;
  },
  keyOf: function (e) {
    this._keyGetter ||= (0, l.compileGetter)(this.key());
    return this._keyGetter(e);
  },
  _requireKey: function () {
    if (!this.key()) {
      throw r.errors.Error("E4005");
    }
  },
  load: function (e) {
    var t = this;
    e = e || {};
    this._eventsStrategy.fireEvent("loading", [e]);
    return this._withLock(this._loadImpl(e)).done(function (n) {
      t._eventsStrategy.fireEvent("loaded", [n, e]);
    });
  },
  _loadImpl: function (e) {
    if (!(0, h.isEmptyObject)(this._langParams)) {
      (e = e || {})._langParams = m({}, this._langParams, e._langParams);
    }
    return y(this.createQuery(e), e).enumerate();
  },
  _withLock: function (e) {
    var t = new d.Deferred();
    e.done(function () {
      var e = this;
      var n = arguments;
      s.processRequestResultLock.promise().done(function () {
        t.resolveWith(e, n);
      });
    }).fail(function () {
      t.rejectWith(this, arguments);
    });
    return t;
  },
  createQuery: v,
  totalCount: function (e) {
    return this._totalCountImpl(e);
  },
  _totalCountImpl: function (e) {
    return y(this.createQuery(e), e, true).count();
  },
  byKey: function (e, t) {
    return this._addFailHandlers(this._withLock(this._byKeyImpl(e, t)));
  },
  _byKeyImpl: v,
  insert: function (e) {
    var t = this;
    t._eventsStrategy.fireEvent("modifying");
    t._eventsStrategy.fireEvent("inserting", [e]);
    return t._addFailHandlers(t._insertImpl(e).done(function (e, n) {
      t._eventsStrategy.fireEvent("inserted", [e, n]);
      t._eventsStrategy.fireEvent("modified");
    }));
  },
  _insertImpl: v,
  update: function (e, t) {
    var n = this;
    n._eventsStrategy.fireEvent("modifying");
    n._eventsStrategy.fireEvent("updating", [e, t]);
    return n._addFailHandlers(n._updateImpl(e, t).done(function () {
      n._eventsStrategy.fireEvent("updated", [e, t]);
      n._eventsStrategy.fireEvent("modified");
    }));
  },
  _updateImpl: v,
  push: function (e) {
    var t = this;
    var n = {
      changes: e,
      waitFor: []
    };
    this._eventsStrategy.fireEvent("beforePush", [n]);
    d.when.apply(undefined, p(n.waitFor)).done(function () {
      t._pushImpl(e);
      t._eventsStrategy.fireEvent("push", [e]);
    });
  },
  _pushImpl: c.noop,
  remove: function (e) {
    var t = this;
    t._eventsStrategy.fireEvent("modifying");
    t._eventsStrategy.fireEvent("removing", [e]);
    return t._addFailHandlers(t._removeImpl(e).done(function (e) {
      t._eventsStrategy.fireEvent("removed", [e]);
      t._eventsStrategy.fireEvent("modified");
    }));
  },
  _removeImpl: v,
  _addFailHandlers: function (e) {
    return e.fail(this._errorHandler).fail(r.handleError);
  },
  on: function (e, t) {
    this._eventsStrategy.on(e, t);
    return this;
  },
  off: function (e, t) {
    this._eventsStrategy.off(e, t);
    return this;
  }
});
x.create = function (e, t) {
  if (!(e in b)) {
    throw r.errors.Error("E4020", e);
  }
  return new b[e](t);
};
x.registerClass = function (e, t) {
  if (t) {
    b[t] = e;
  }
  return e;
};
_ = x.inherit;
x.inherit = function (e, t) {
  var n = _.apply(this, [e]);
  x.registerClass(n, t);
  return n;
};
var w = x;
exports.default = w;
module.exports = exports.default;
module.exports.default = exports.default;