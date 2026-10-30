exports.GanttDataCache = undefined;
var i = require("./13306.js");
var o = function () {
  function e() {
    this._cache = {};
    this._timers = {};
  }
  var t = e.prototype;
  t.saveData = function (e, t, n) {
    if (t) {
      this._clearTimer(e);
      var o = this._getCache(e, true);
      (0, i.extendFromObject)(o, t, true);
      if (n) {
        this._setExpireTimer(e, n);
      }
    }
  };
  t.pullDataFromCache = function (e, t) {
    var n = this._getCache(e);
    if (n) {
      (0, i.extendFromObject)(t, n);
    }
    this._onKeyExpired(e);
  };
  t.hasData = function (e) {
    return !!this._cache[e];
  };
  t.resetCache = function (e) {
    this._onKeyExpired(e);
  };
  t._getCache = function (e, t) {
    if (!this._cache[e] && t) {
      this._cache[e] = {};
    }
    return this._cache[e];
  };
  t._setExpireTimer = function (e, t) {
    var n = this;
    this._timers[e] = setTimeout(function () {
      t(e, n._getCache(e));
      n._onKeyExpired(e);
    }, 200);
  };
  t._onKeyExpired = function (e) {
    this._clearCache(e);
    this._clearTimer(e);
  };
  t._clearCache = function (e) {
    delete this._cache[e];
  };
  t._clearTimer = function (e) {
    var t = this._timers;
    if (t && t[e]) {
      clearTimeout(t[e]);
      delete t[e];
    }
  };
  return e;
}();
exports.GanttDataCache = o;