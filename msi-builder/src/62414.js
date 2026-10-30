exports.default = undefined;
var i;
var o = (i = require("./68374.js")) && i.__esModule ? i : {
  default: i
};
var a = require("./58201.js");
var r = require("./35922.js");
var s = require("./95479.js");
var l = function () {
  function e(e, t) {
    t = t || {};
    this._action = e;
    this._context = t.context || (0, a.getWindow)();
    this._beforeExecute = t.beforeExecute;
    this._afterExecute = t.afterExecute;
    this._component = t.component;
    this._validatingTargetName = t.validatingTargetName;
    var n = this._excludeValidators = {};
    if (t.excludeValidators) {
      for (var i = 0; i < t.excludeValidators.length; i++) {
        n[t.excludeValidators[i]] = true;
      }
    }
  }
  var t = e.prototype;
  t.execute = function () {
    var e = {
      action: this._action,
      args: Array.prototype.slice.call(arguments),
      context: this._context,
      component: this._component,
      validatingTargetName: this._validatingTargetName,
      cancel: false,
      handled: false
    };
    var t = this._beforeExecute;
    var n = this._afterExecute;
    var i = e.args[0] || {};
    if (this._validateAction(e) && (t == null || t.call(this._context, e), !e.cancel)) {
      var o = this._executeAction(e);
      if (!i.cancel) {
        if (n != null) {
          n.call(this._context, e);
        }
        return o;
      }
    }
  };
  t._validateAction = function (t) {
    var n = this._excludeValidators;
    var i = e.executors;
    for (var o in i) {
      if (!n[o]) {
        var a;
        var r = i[o];
        if ((a = r.validate) !== null && a !== undefined) {
          a.call(r, t);
        }
        if (t.cancel) {
          return false;
        }
      }
    }
    return true;
  };
  t._executeAction = function (t) {
    var n;
    var i = e.executors;
    for (var o in i) {
      var a;
      var r = i[o];
      if ((a = r.execute) !== null && a !== undefined) {
        a.call(r, t);
      }
      if (t.handled) {
        n = t.result;
        break;
      }
    }
    return n;
  };
  e.registerExecutor = function (t, n) {
    if ((0, r.isPlainObject)(t)) {
      (0, s.each)(t, e.registerExecutor);
    } else {
      e.executors[t] = n;
    }
  };
  e.unregisterExecutor = function () {
    for (var t = arguments.length, n = new Array(t), i = 0; i < t; i++) {
      n[i] = arguments[i];
    }
    (0, s.each)(n, function () {
      delete e.executors[this];
    });
  };
  return e;
}();
exports.default = l;
l.executors = {};
function u(e) {
  return function (t) {
    if (t.args.length) {
      var n = t.args[0];
      var i = n[t.validatingTargetName] || n.element;
      if (i && e((0, o.default)(i))) {
        t.cancel = true;
      }
    }
  };
}
l.registerExecutor({
  disabled: {
    validate: u(function (e) {
      return e.is(".dx-state-disabled, .dx-state-disabled *");
    })
  },
  readOnly: {
    validate: u(function (e) {
      return e.is(".dx-state-readonly, .dx-state-readonly *:not(.dx-state-independent)");
    })
  },
  undefined: {
    execute: function (e) {
      if (!e.action) {
        e.result = undefined;
        e.handled = true;
      }
    }
  },
  func: {
    execute: function (e) {
      if ((0, r.isFunction)(e.action)) {
        e.result = e.action.call(e.context, e.args[0]);
        e.handled = true;
      }
    }
  }
});
module.exports = exports.default;
module.exports.default = exports.default;