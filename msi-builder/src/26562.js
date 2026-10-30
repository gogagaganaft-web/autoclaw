exports.default = undefined;
var i = require("./16454.js");
var o = l(require("./96687.js"));
var a = require("./18438.js");
var r = l(require("./67403.js"));
var s = require("./60637.js");
function l(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
var u = r.default.inherit({
  ctor: function (e) {
    e = Array.isArray(e) ? {
      data: e
    } : e || {};
    this.callBase(e);
    var t = e.data;
    if (t && !Array.isArray(t)) {
      throw a.errors.Error("E4006");
    }
    this._array = t || [];
  },
  createQuery: function () {
    return (0, o.default)(this._array, {
      errorHandler: this._errorHandler
    });
  },
  _byKeyImpl: function (e) {
    var t = (0, s.indexByKey)(this, this._array, e);
    if (t === -1) {
      return (0, i.rejectedPromise)(a.errors.Error("E4009"));
    } else {
      return (0, i.trivialPromise)(this._array[t]);
    }
  },
  _insertImpl: function (e) {
    return (0, s.insert)(this, this._array, e);
  },
  _pushImpl: function (e) {
    (0, s.applyBatch)({
      keyInfo: this,
      data: this._array,
      changes: e
    });
  },
  _updateImpl: function (e, t) {
    return (0, s.update)(this, this._array, e, t);
  },
  _removeImpl: function (e) {
    return (0, s.remove)(this, this._array, e);
  },
  clear: function () {
    this._eventsStrategy.fireEvent("modifying");
    this._array = [];
    this._eventsStrategy.fireEvent("modified");
  }
}, "array");
exports.default = u;
module.exports = exports.default;
module.exports.default = exports.default;