exports.default = undefined;
var i = u(require("./55994.js"));
var o = u(require("./73349.js"));
var a = require("./58201.js");
var r = u(require("./38377.js"));
var s = require("./18438.js");
var l = u(require("./26562.js"));
function u(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
var d = (0, a.getWindow)();
var c = r.default.abstract;
var h = {
  dom: r.default.inherit({
    ctor: function (e, t) {
      this._store = e;
      this._dirty = !!t.data;
      this.save();
      var n = this._immediate = t.immediate;
      var a = Math.max(100, t.flushInterval || 10000);
      if (!n) {
        var r = this.save.bind(this);
        setInterval(r, a);
        i.default.on(d, "beforeunload", r);
        if (d.cordova) {
          o.default.listen(o.default.getDocument(), "pause", r, false);
        }
      }
    },
    notifyChanged: function () {
      this._dirty = true;
      if (this._immediate) {
        this.save();
      }
    },
    load: function () {
      this._store._array = this._loadImpl();
      this._dirty = false;
    },
    save: function () {
      if (this._dirty) {
        this._saveImpl(this._store._array);
        this._dirty = false;
      }
    },
    _loadImpl: c,
    _saveImpl: c
  }).inherit({
    ctor: function (e, t) {
      var n = t.name;
      if (!n) {
        throw s.errors.Error("E4013");
      }
      this._key = "dx-data-localStore-" + n;
      this.callBase(e, t);
    },
    _loadImpl: function () {
      var e = d.localStorage.getItem(this._key);
      if (e) {
        return JSON.parse(e);
      } else {
        return [];
      }
    },
    _saveImpl: function (e) {
      if (e.length) {
        d.localStorage.setItem(this._key, JSON.stringify(e));
      } else {
        d.localStorage.removeItem(this._key);
      }
    }
  })
};
var f = l.default.inherit({
  ctor: function (e) {
    e = typeof e == "string" ? {
      name: e
    } : e || {};
    this.callBase(e);
    this._backend = new h[e.backend || "dom"](this, e);
    this._backend.load();
  },
  _clearCache: function () {
    this._backend.load();
  },
  clear: function () {
    this.callBase();
    this._backend.notifyChanged();
  },
  _insertImpl: function (e) {
    var t = this._backend;
    return this.callBase(e).done(t.notifyChanged.bind(t));
  },
  _updateImpl: function (e, t) {
    var n = this._backend;
    return this.callBase(e, t).done(n.notifyChanged.bind(n));
  },
  _removeImpl: function (e) {
    var t = this._backend;
    return this.callBase(e).done(t.notifyChanged.bind(t));
  }
}, "local");
exports.default = f;
module.exports = exports.default;
module.exports.default = exports.default;