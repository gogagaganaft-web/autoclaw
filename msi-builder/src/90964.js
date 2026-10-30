exports.default = undefined;
var i = f(require("./38377.js"));
var o = require("./13306.js");
var a = require("./95479.js");
var r = require("./80566.js");
var s = f(require("./17381.js"));
var l = require("./20576.js");
var u = require("./35922.js");
var d = f(require("./18016.js"));
var c = f(require("./28109.js"));
var h = require("./62754.js");
function f(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
function p(e, t) {
  e.prototype = Object.create(t.prototype);
  e.prototype.constructor = e;
  g(e, t);
}
function g(e, t) {
  return (g = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (e, t) {
    e.__proto__ = t;
    return e;
  })(e, t);
}
var m = "valid";
var _ = "invalid";
var v = "pending";
var y = function () {
  function e() {
    this.NAME = "base";
  }
  var t = e.prototype;
  t.defaultMessage = function (e) {
    return c.default.getFormatter(`validation-${this.NAME}`)(e);
  };
  t.defaultFormattedMessage = function (e) {
    return c.default.getFormatter(`validation-${this.NAME}-formatted`)(e);
  };
  t._isValueEmpty = function (e) {
    return !E.required.validate(e, {});
  };
  t.validate = function (e, t) {
    var n = this;
    var i = Array.isArray(e) ? e : [e];
    var o = true;
    if (i.length) {
      i.every(function (e) {
        return o = n._validate(e, t);
      });
    } else {
      o = this._validate(null, t);
    }
    return o;
  };
  return e;
}();
var b = function (e) {
  function t() {
    var t;
    (t = e.call(this) || this).NAME = "required";
    return t;
  }
  p(t, e);
  t.prototype._validate = function (e, t) {
    return !!(0, u.isDefined)(e) && e !== false && (e = String(e), !t.trim && (0, u.isDefined)(t.trim) || (e = e.trim()), e !== "");
  };
  return t;
}(y);
var x = function (e) {
  function t() {
    var t;
    (t = e.call(this) || this).NAME = "numeric";
    return t;
  }
  p(t, e);
  t.prototype._validate = function (e, t) {
    return t.ignoreEmptyValue !== false && !!this._isValueEmpty(e) || (t.useCultureSettings && (0, u.isString)(e) ? !isNaN(d.default.parse(e)) : (0, u.isNumeric)(e));
  };
  return t;
}(y);
var w = function (e) {
  function t() {
    var t;
    (t = e.call(this) || this).NAME = "range";
    return t;
  }
  p(t, e);
  t.prototype._validate = function (e, t) {
    if (t.ignoreEmptyValue !== false && this._isValueEmpty(e)) {
      return true;
    }
    var n = E.numeric.validate(e, t);
    var i = (0, u.isDefined)(e) && e !== "";
    var o = n ? parseFloat(e) : i && e.valueOf();
    var a = t.min;
    var r = t.max;
    if (!n && !(0, u.isDate)(e) && !i) {
      return false;
    }
    if ((0, u.isDefined)(a)) {
      if ((0, u.isDefined)(r)) {
        return o >= a && o <= r;
      } else {
        return o >= a;
      }
    }
    if ((0, u.isDefined)(r)) {
      return o <= r;
    }
    throw s.default.Error("E0101");
  };
  return t;
}(y);
var C = function (e) {
  function t() {
    var t;
    (t = e.call(this) || this).NAME = "stringLength";
    return t;
  }
  p(t, e);
  t.prototype._validate = function (e, t) {
    e = String(e ?? "");
    if (!!t.trim || !(0, u.isDefined)(t.trim)) {
      e = e.trim();
    }
    return !!t.ignoreEmptyValue && !!this._isValueEmpty(e) || E.range.validate(e.length, (0, o.extend)({}, t));
  };
  return t;
}(y);
var S = function (e) {
  function t() {
    var t;
    (t = e.call(this) || this).NAME = "custom";
    return t;
  }
  p(t, e);
  t.prototype.validate = function (e, t) {
    if (t.ignoreEmptyValue && this._isValueEmpty(e)) {
      return true;
    }
    var n = t.validator;
    var i = n && (0, u.isFunction)(n.option) && n.option("dataGetter");
    var a = (0, u.isFunction)(i) && i();
    var r = {
      value: e,
      validator: n,
      rule: t
    };
    if (a) {
      (0, o.extend)(r, a);
    }
    return t.validationCallback(r);
  };
  return t;
}(y);
var k = function (e) {
  function t() {
    var t;
    (t = e.call(this) || this).NAME = "async";
    return t;
  }
  p(t, e);
  var n = t.prototype;
  n.validate = function (e, t) {
    if (!(0, u.isDefined)(t.reevaluate)) {
      (0, o.extend)(t, {
        reevaluate: true
      });
    }
    if (t.ignoreEmptyValue && this._isValueEmpty(e)) {
      return true;
    }
    var n = t.validator;
    var i = n && (0, u.isFunction)(n.option) && n.option("dataGetter");
    var a = (0, u.isFunction)(i) && i();
    var r = {
      value: e,
      validator: n,
      rule: t
    };
    if (a) {
      (0, o.extend)(r, a);
    }
    var l = t.validationCallback(r);
    if (!(0, u.isPromise)(l)) {
      throw s.default.Error("E0103");
    }
    return this._getWrappedPromise((0, h.fromPromise)(l).promise());
  };
  n._getWrappedPromise = function (e) {
    var t = new h.Deferred();
    e.then(function (e) {
      t.resolve(e);
    }, function (e) {
      var n = {
        isValid: false
      };
      if ((0, u.isDefined)(e)) {
        if ((0, u.isString)(e)) {
          n.message = e;
        } else if ((0, u.isObject)(e) && (0, u.isDefined)(e.message) && (0, u.isString)(e.message)) {
          n.message = e.message;
        }
      }
      t.resolve(n);
    });
    return t.promise();
  };
  return t;
}(S);
var D = function (e) {
  function t() {
    var t;
    (t = e.call(this) || this).NAME = "compare";
    return t;
  }
  p(t, e);
  t.prototype._validate = function (e, t) {
    if (!t.comparisonTarget) {
      throw s.default.Error("E0102");
    }
    if (t.ignoreEmptyValue && this._isValueEmpty(e)) {
      return true;
    }
    (0, o.extend)(t, {
      reevaluate: true
    });
    var n = t.comparisonTarget();
    switch (t.comparisonType || "==") {
      case "==":
        return e == n;
      case "!=":
        return e != n;
      case "===":
        return e === n;
      case "!==":
        return e !== n;
      case ">":
        return e > n;
      case ">=":
        return e >= n;
      case "<":
        return e < n;
      case "<=":
        return e <= n;
    }
  };
  return t;
}(y);
var I = function (e) {
  function t() {
    var t;
    (t = e.call(this) || this).NAME = "pattern";
    return t;
  }
  p(t, e);
  t.prototype._validate = function (e, t) {
    if (t.ignoreEmptyValue !== false && this._isValueEmpty(e)) {
      return true;
    }
    var n = t.pattern;
    if ((0, u.isString)(n)) {
      n = new RegExp(n);
    }
    return n.test(e);
  };
  return t;
}(y);
var T = function (e) {
  function t() {
    var t;
    (t = e.call(this) || this).NAME = "email";
    return t;
  }
  p(t, e);
  t.prototype._validate = function (e, t) {
    return t.ignoreEmptyValue !== false && !!this._isValueEmpty(e) || E.pattern.validate(e, (0, o.extend)({}, t, {
      pattern: /^[\d\w._-]+@[\d\w._-]+\.[\w]+$/i
    }));
  };
  return t;
}(y);
var E = {
  required: new b(),
  numeric: new x(),
  range: new w(),
  stringLength: new C(),
  custom: new S(),
  async: new k(),
  compare: new D(),
  pattern: new I(),
  email: new T()
};
var O = i.default.inherit({
  ctor: function (e) {
    this.group = e;
    this.validators = [];
    this._pendingValidators = [];
    this._onValidatorStatusChanged = this._onValidatorStatusChanged.bind(this);
    this._resetValidationInfo();
    this._eventsStrategy = new r.EventsStrategy(this);
  },
  validate: function () {
    var e = this;
    var t = {
      isValid: true,
      brokenRules: [],
      validators: [],
      status: m,
      complete: null
    };
    this._unsubscribeFromAllChangeEvents();
    this._pendingValidators = [];
    this._resetValidationInfo();
    (0, a.each)(this.validators, function (n, i) {
      var o = i.validate();
      t.isValid = t.isValid && o.isValid;
      if (o.brokenRules) {
        t.brokenRules = t.brokenRules.concat(o.brokenRules);
      }
      t.validators.push(i);
      if (o.status === v) {
        e._addPendingValidator(i);
      }
      e._subscribeToChangeEvents(i);
    });
    if (this._pendingValidators.length) {
      t.status = v;
    } else {
      t.status = t.isValid ? m : _;
      this._unsubscribeFromAllChangeEvents();
      this._raiseValidatedEvent(t);
    }
    this._updateValidationInfo(t);
    return (0, o.extend)({}, this._validationInfo.result);
  },
  _subscribeToChangeEvents: function (e) {
    e.on("validating", this._onValidatorStatusChanged);
    e.on("validated", this._onValidatorStatusChanged);
  },
  _unsubscribeFromChangeEvents: function (e) {
    e.off("validating", this._onValidatorStatusChanged);
    e.off("validated", this._onValidatorStatusChanged);
  },
  _unsubscribeFromAllChangeEvents: function () {
    var e = this;
    (0, a.each)(this.validators, function (t, n) {
      e._unsubscribeFromChangeEvents(n);
    });
  },
  _updateValidationInfo: function (e) {
    this._validationInfo.result = e;
    if (e.status === v) {
      if (!this._validationInfo.deferred) {
        this._validationInfo.deferred = new h.Deferred();
        this._validationInfo.result.complete = this._validationInfo.deferred.promise();
      }
    }
  },
  _addPendingValidator: function (e) {
    if (!(0, l.grep)(this._pendingValidators, function (t) {
      return t === e;
    })[0]) {
      this._pendingValidators.push(e);
    }
  },
  _removePendingValidator: function (e) {
    var t = this._pendingValidators.indexOf(e);
    if (t >= 0) {
      this._pendingValidators.splice(t, 1);
    }
  },
  _orderBrokenRules: function (e) {
    var t = [];
    (0, a.each)(this.validators, function (n, i) {
      var o = (0, l.grep)(e, function (e) {
        return e.validator === i;
      });
      if (o.length) {
        t = t.concat(o);
      }
    });
    return t;
  },
  _updateBrokenRules: function (e) {
    if (this._validationInfo.result) {
      var t = this._validationInfo.result.brokenRules;
      var n = (0, l.grep)(t, function (t) {
        return t.validator !== e.validator;
      });
      if (e.brokenRules) {
        t = n.concat(e.brokenRules);
      }
      this._validationInfo.result.brokenRules = this._orderBrokenRules(t);
    }
  },
  _onValidatorStatusChanged: function (e) {
    if (e.status !== v) {
      this._resolveIfComplete(e);
    } else {
      this._addPendingValidator(e.validator);
    }
  },
  _resolveIfComplete: function (e) {
    this._removePendingValidator(e.validator);
    this._updateBrokenRules(e);
    if (!this._pendingValidators.length) {
      this._unsubscribeFromAllChangeEvents();
      if (!this._validationInfo.result) {
        return;
      }
      this._validationInfo.result.status = this._validationInfo.result.brokenRules.length === 0 ? m : _;
      this._validationInfo.result.isValid = this._validationInfo.result.status === m;
      var t = (0, o.extend)({}, this._validationInfo.result, {
        complete: null
      });
      var n = this._validationInfo.deferred;
      this._validationInfo.deferred = null;
      this._raiseValidatedEvent(t);
      if (n) {
        setTimeout(function () {
          n.resolve(t);
        });
      }
    }
  },
  _raiseValidatedEvent: function (e) {
    this._eventsStrategy.fireEvent("validated", [e]);
  },
  _resetValidationInfo: function () {
    this._validationInfo = {
      result: null,
      deferred: null
    };
  },
  _synchronizeValidationInfo: function () {
    if (this._validationInfo.result) {
      this._validationInfo.result.validators = this.validators;
    }
  },
  removeRegisteredValidator: function (e) {
    var t = this.validators.indexOf(e);
    if (t > -1) {
      this.validators.splice(t, 1);
      this._synchronizeValidationInfo();
      this._resolveIfComplete({
        validator: e
      });
    }
  },
  registerValidator: function (e) {
    if (!this.validators.includes(e)) {
      this.validators.push(e);
      this._synchronizeValidationInfo();
    }
  },
  reset: function () {
    (0, a.each)(this.validators, function (e, t) {
      t.reset();
    });
    this._pendingValidators = [];
    this._resetValidationInfo();
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
var A = {
  groups: [],
  getGroupConfig: function (e) {
    var t = (0, l.grep)(this.groups, function (t) {
      return t.group === e;
    });
    if (t.length) {
      return t[0];
    }
  },
  findGroup: function (e, t) {
    var n;
    var i;
    var o = ((n = e.data()) === null || n === undefined || (i = n.dxComponents) === null || i === undefined ? undefined : i.includes("dxValidationGroup")) && e.dxValidationGroup("instance");
    if (o) {
      return o;
    }
    var a = e.parents(".dx-validationgroup").first();
    if (a.length) {
      return a.dxValidationGroup("instance");
    } else {
      return t;
    }
  },
  initGroups: function () {
    this.groups = [];
    this.addGroup();
  },
  addGroup: function (e) {
    var t = this.getGroupConfig(e);
    if (!t) {
      t = new O(e);
      this.groups.push(t);
    }
    return t;
  },
  removeGroup: function (e) {
    var t = this.getGroupConfig(e);
    var n = this.groups.indexOf(t);
    if (n > -1) {
      this.groups.splice(n, 1);
    }
    return t;
  },
  _setDefaultMessage: function (e) {
    var t = e.rule;
    var n = e.validator;
    var i = e.name;
    if (!(0, u.isDefined)(t.message)) {
      if (n.defaultFormattedMessage && (0, u.isDefined)(i)) {
        t.message = n.defaultFormattedMessage(i);
      } else {
        t.message = n.defaultMessage();
      }
    }
  },
  _addBrokenRule: function (e) {
    var t = e.result;
    var n = e.rule;
    t.brokenRule ||= n;
    t.brokenRules ||= [];
    t.brokenRules.push(n);
  },
  validate: function (e, t, n) {
    var i;
    var o = this;
    var r = {
      name: n,
      value: e,
      brokenRule: null,
      brokenRules: null,
      isValid: true,
      validationRules: t,
      pendingRules: null,
      status: m,
      complete: null
    };
    var l = t == null || (i = t[0]) === null || i === undefined ? undefined : i.validator;
    var d = [];
    (0, a.each)(t || [], function (t, i) {
      var a;
      var l = E[i.type];
      if (!l) {
        throw s.default.Error("E0100");
      }
      if ((0, u.isDefined)(i.isValid) && i.value === e && !i.reevaluate) {
        return !!i.isValid || (r.isValid = false, o._addBrokenRule({
          result: r,
          rule: i
        }), false);
      } else {
        i.value = e;
        if (i.type === "async") {
          d.push({
            rule: i,
            ruleValidator: l
          });
          return true;
        } else {
          a = l.validate(e, i);
          i.isValid = a;
          if (!a) {
            r.isValid = false;
            o._setDefaultMessage({
              rule: i,
              validator: l,
              name: n
            });
            o._addBrokenRule({
              result: r,
              rule: i
            });
          }
          return !!i.isValid && undefined;
        }
      }
    });
    if (r.isValid && !r.brokenRules && d.length) {
      r = this._validateAsyncRules({
        value: e,
        items: d,
        result: r,
        name: n
      });
    }
    this._synchronizeGroupValidationInfo(l, r);
    r.status = r.pendingRules ? v : r.isValid ? m : _;
    return r;
  },
  _synchronizeGroupValidationInfo: function (e, t) {
    if (e) {
      var i = A.getGroupConfig(e._validationGroup);
      i._updateBrokenRules.call(i, {
        validator: e,
        brokenRules: t.brokenRules ?? []
      });
    }
  },
  _validateAsyncRules: function (e) {
    var t = this;
    var n = e.result;
    var i = e.value;
    var o = e.items;
    var r = e.name;
    var s = [];
    (0, a.each)(o, function (e, o) {
      var a = o.ruleValidator.validate(i, o.rule);
      if ((0, u.isPromise)(a)) {
        n.pendingRules ||= [];
        n.pendingRules.push(o.rule);
        var l = a.then(function (e) {
          var n = t._getPatchedRuleResult(e);
          t._updateRuleConfig({
            rule: o.rule,
            ruleResult: n,
            validator: o.ruleValidator,
            name: r
          });
          return n;
        });
        s.push(l);
      } else {
        t._updateRuleConfig({
          rule: o.rule,
          ruleResult: t._getPatchedRuleResult(a),
          validator: o.ruleValidator,
          name: r
        });
      }
    });
    if (s.length) {
      n.complete = Promise.all(s).then(function (e) {
        return t._getAsyncRulesResult({
          result: n,
          values: e
        });
      });
    }
    return n;
  },
  _updateRuleConfig: function (e) {
    var t = e.rule;
    var n = e.ruleResult;
    var i = e.validator;
    var o = e.name;
    t.isValid = n.isValid;
    if (!n.isValid) {
      if ((0, u.isDefined)(n.message) && (0, u.isString)(n.message) && n.message.length) {
        t.message = n.message;
      } else {
        this._setDefaultMessage({
          rule: t,
          validator: i,
          name: o
        });
      }
    }
  },
  _getPatchedRuleResult: function (e) {
    var t;
    if ((0, u.isObject)(e)) {
      t = (0, o.extend)({}, e);
      if (!(0, u.isDefined)(t.isValid)) {
        t.isValid = true;
      }
    } else {
      t = {
        isValid: !(0, u.isBoolean)(e) || e
      };
    }
    return t;
  },
  _getAsyncRulesResult: function (e) {
    var t = this;
    var n = e.values;
    var i = e.result;
    (0, a.each)(n, function (e, n) {
      if (n.isValid === false) {
        i.isValid = n.isValid;
        var o = i.pendingRules[e];
        t._addBrokenRule({
          result: i,
          rule: o
        });
      }
    });
    i.pendingRules = null;
    i.complete = null;
    i.status = i.isValid ? m : _;
    return i;
  },
  registerValidatorInGroup: function (e, t) {
    var n = A.addGroup(e);
    n.registerValidator.call(n, t);
  },
  _shouldRemoveGroup: function (e, t) {
    var n = e === undefined;
    var i = e && e.NAME === "dxValidationGroup";
    return !n && !i && !t.length;
  },
  removeRegisteredValidator: function (e, t) {
    var n = A.getGroupConfig(e);
    if (n) {
      n.removeRegisteredValidator.call(n, t);
      var i = n.validators;
      if (this._shouldRemoveGroup(e, i)) {
        this.removeGroup(e);
      }
    }
  },
  initValidationOptions: function (e) {
    var t = this;
    var n = {};
    if (e) {
      ["isValid", "validationStatus", "validationError", "validationErrors"].forEach(function (i) {
        if (i in e) {
          (0, o.extend)(n, t.synchronizeValidationOptions({
            name: i,
            value: e[i]
          }, e));
        }
      });
    }
    return n;
  },
  synchronizeValidationOptions: function (e, t) {
    var n = e.name;
    var i = e.value;
    switch (n) {
      case "validationStatus":
        var o = i === m || i === v;
        if (t.isValid !== o) {
          return {
            isValid: o
          };
        } else {
          return {};
        }
      case "isValid":
        var a = t.validationStatus;
        var r = a;
        if (i && a === _) {
          r = m;
        } else if (!i && a !== _) {
          r = _;
        }
        if (r !== a) {
          return {
            validationStatus: r
          };
        } else {
          return {};
        }
      case "validationErrors":
        var s = i && i.length ? i[0] : null;
        if (t.validationError !== s) {
          return {
            validationError: s
          };
        } else {
          return {};
        }
      case "validationError":
        var l = t.validationErrors;
        if (!i && l) {
          return {
            validationErrors: null
          };
        }
        if (i && !l) {
          return {
            validationErrors: [i]
          };
        }
        if (i && l && i !== l[0]) {
          l[0] = i;
          return {
            validationErrors: l.slice()
          };
        }
    }
    return {};
  },
  validateGroup: function (e) {
    var t = A.getGroupConfig(e);
    if (!t) {
      throw s.default.Error("E0110");
    }
    return t.validate();
  },
  resetGroup: function (e) {
    var t = A.getGroupConfig(e);
    if (!t) {
      throw s.default.Error("E0110");
    }
    return t.reset();
  }
};
A.initGroups();
var P = A;
exports.default = P;
module.exports = exports.default;
module.exports.default = exports.default;