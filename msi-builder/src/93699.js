exports.DataExchanger = a;
var i;
var o = (i = require("./44504.js")) && i.__esModule ? i : {
  default: i
};
function a() {
  this._store = {};
}
a.prototype = {
  constructor: a,
  dispose: function () {
    this._store = null;
    return this;
  },
  _get: function (e, t) {
    var n = this._store[e] ||= {};
    return n[t] ||= {
      callbacks: (0, o.default)()
    };
  },
  set: function (e, t, n) {
    var i = this._get(e, t);
    i.data = n;
    i.callbacks.fire(n);
    return this;
  },
  bind: function (e, t, n) {
    var i = this._get(e, t);
    i.callbacks.add(n);
    if (i.data) {
      n(i.data);
    }
    return this;
  },
  unbind: function (e, t, n) {
    this._get(e, t).callbacks.remove(n);
    return this;
  }
};