exports.makeEventEmitter = function (e) {
  var t;
  var n = e.prototype;
  for (t in a) {
    n[t] = a[t];
  }
};
var i;
var o = (i = require("./44504.js")) && i.__esModule ? i : {
  default: i
};
var a = {
  _initEvents: function () {
    var e;
    var t = this._eventNames;
    var n = t.length;
    var i = this._events = {};
    for (e = 0; e < n; ++e) {
      i[t[e]] = (0, o.default)();
    }
  },
  _disposeEvents: function () {
    var e;
    var t = this._events;
    for (e in t) {
      t[e].empty();
    }
    this._events = null;
  },
  on: function (e) {
    var t;
    var n = this._events;
    for (t in e) {
      n[t].add(e[t]);
    }
    return function () {
      for (t in e) {
        n[t].remove(e[t]);
      }
    };
  },
  _fire: function (e, t) {
    this._events[e].fire(t);
  }
};