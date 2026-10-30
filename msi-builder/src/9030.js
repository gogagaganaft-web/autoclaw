exports.OptionManager = undefined;
var i = require("./47617.js");
var o = require("./20576.js");
var a = require("./49036.js");
var r = require("./13306.js");
var s = require("./35922.js");
var l = require("./45434.js");
var u = {};
var d = {};
var c = function () {
  function e(e, t) {
    this._options = e;
    this._optionsByReference = t;
    this._changingCallback;
    this._changedCallback;
    this._namePreparedCallbacks;
  }
  var t = e.prototype;
  t._setByReference = function (e, t) {
    (0, r.extend)(true, e, t);
    for (var n in this._optionsByReference) {
      if (Object.prototype.hasOwnProperty.call(t, n)) {
        e[n] = t[n];
      }
    }
  };
  t._setPreparedValue = function (e, t, n, o) {
    var r = this.get(this._options, e, false);
    if (!(0, a.equals)(r, t)) {
      var l = (0, i.getPathParts)(e);
      if (!o) {
        this._changingCallback(e, r, t);
      }
      d[e] = d[e] || (0, i.compileSetter)(e);
      d[e](this._options, t, {
        functionsAsIs: true,
        merge: (0, s.isDefined)(n) ? n : !this._optionsByReference[e],
        unwrapObservables: l.length > 1 && !!this._optionsByReference[l[0]]
      });
      if (!o) {
        this._changedCallback(e, t, r);
      }
    }
  };
  t._prepareRelevantNames = function (e, t, n, i) {
    if ((0, s.isPlainObject)(n)) {
      for (var o in n) {
        this._prepareRelevantNames(e, `${t}.${o}`, n[o]);
      }
    }
    this._namePreparedCallbacks(e, t, n, i);
  };
  t.get = function (e = this._options, t, n) {
    u[t] = u[t] || (0, i.compileGetter)(t);
    return u[t](e, {
      functionsAsIs: true,
      unwrapObservables: n
    });
  };
  t.set = function (e, t, n, i) {
    for (var o in e = (0, l.normalizeOptions)(e, t)) {
      this._prepareRelevantNames(e, o, e[o], i);
    }
    for (var a in e) {
      this._setPreparedValue(a, e[a], n, i);
    }
  };
  t.onRelevantNamesPrepared = function (e) {
    this._namePreparedCallbacks = e;
  };
  t.onChanging = function (e) {
    this._changingCallback = e;
  };
  t.onChanged = function (e) {
    this._changedCallback = e;
  };
  t.dispose = function () {
    this._changingCallback = o.noop;
    this._changedCallback = o.noop;
  };
  return e;
}();
exports.OptionManager = c;