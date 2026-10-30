exports.EventsStrategy = undefined;
var i;
var o = (i = require("./44504.js")) && i.__esModule ? i : {
  default: i
};
var a = require("./95479.js");
var r = require("./35922.js");
var s = function () {
  function e(e, t = {}) {
    this._events = {};
    this._owner = e;
    this._options = t;
  }
  e.create = function (t, n) {
    if (n) {
      if ((0, r.isFunction)(n)) {
        return n(t);
      } else {
        return n;
      }
    } else {
      return new e(t);
    }
  };
  var t = e.prototype;
  t.hasEvent = function (e) {
    var t = this._events[e];
    return !!t && t.has();
  };
  t.fireEvent = function (e, t) {
    var n = this._events[e];
    if (n) {
      n.fireWith(this._owner, t);
    }
    return this._owner;
  };
  t.on = function (e, t) {
    var n = this;
    if ((0, r.isPlainObject)(e)) {
      (0, a.each)(e, function (e, t) {
        n.on(e, t);
      });
    } else {
      var i = this._events[e];
      if (!i) {
        i = (0, o.default)({
          syncStrategy: this._options.syncStrategy
        });
        this._events[e] = i;
      }
      (i.originalAdd || i.add).call(i, t);
    }
  };
  t.off = function (e, t) {
    var n = this._events[e];
    if (n) {
      if ((0, r.isFunction)(t)) {
        n.remove(t);
      } else {
        n.empty();
      }
    }
  };
  t.dispose = function () {
    (0, a.each)(this._events, function (e, t) {
      t.empty();
    });
  };
  return e;
}();
exports.EventsStrategy = s;