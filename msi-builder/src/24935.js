var i = require("./95479.js");
var o = require("./13306.js");
var a = c(require("./38377.js"));
var r = require("./80566.js");
var s = c(require("./90964.js"));
var l = require("./62754.js");
var u = c(require("./73176.js"));
var d = c(require("./76130.js"));
function c(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
if (d.default) {
  var h = a.default.inherit({
    ctor: function (e, t) {
      var n = this;
      var a = t.name;
      var s = t.validationRules;
      this.target = e;
      this.name = a;
      this.isValid = d.default.observable(true);
      this.validationError = d.default.observable();
      this.validationErrors = d.default.observable();
      this.validationStatus = d.default.observable("valid");
      this._eventsStrategy = new r.EventsStrategy(this);
      this.validationRules = (0, i.map)(s, function (e, t) {
        return (0, o.extend)({}, e, {
          validator: n,
          index: t
        });
      });
      this._validationInfo = {
        result: null,
        deferred: null
      };
    },
    _updateValidationResult: function (e) {
      if (this._validationInfo.result && this._validationInfo.result.id === e.id) {
        for (var t in e) {
          if (t !== "id" && t !== "complete") {
            this._validationInfo.result[t] = e[t];
          }
        }
      } else {
        var n = this._validationInfo.deferred && this._validationInfo.result.complete;
        this._validationInfo.result = (0, o.extend)({}, e, {
          complete: n
        });
      }
    },
    validate: function () {
      var e = this;
      var t = this._validationInfo && this._validationInfo.result;
      var n = this.target();
      if (t && t.status === "pending" && t.value === n) {
        return (0, o.extend)({}, t);
      }
      var i = s.default.validate(n, this.validationRules, this.name);
      i.id = new u.default().toString();
      this._applyValidationResult(i);
      if (i.complete) {
        i.complete.then(function (t) {
          if (t.id === e._validationInfo.result.id) {
            e._applyValidationResult(t);
          }
        });
      }
      return (0, o.extend)({}, this._validationInfo.result);
    },
    reset: function () {
      this.target(null);
      var e = {
        id: null,
        isValid: true,
        brokenRule: null,
        pendingRules: null,
        status: "valid",
        complete: null
      };
      this._applyValidationResult(e);
      return e;
    },
    _applyValidationResult: function (e) {
      e.validator = this;
      this._updateValidationResult(e);
      this.target.dxValidator.isValid(this._validationInfo.result.isValid);
      this.target.dxValidator.validationError(this._validationInfo.result.brokenRule);
      this.target.dxValidator.validationErrors(this._validationInfo.result.brokenRules);
      this.target.dxValidator.validationStatus(this._validationInfo.result.status);
      if (e.status === "pending") {
        if (!this._validationInfo.deferred) {
          this._validationInfo.deferred = new l.Deferred();
          this._validationInfo.result.complete = this._validationInfo.deferred.promise();
        }
        this._eventsStrategy.fireEvent("validating", [this._validationInfo.result]);
        return;
      }
      if (e.status !== "pending") {
        this._eventsStrategy.fireEvent("validated", [e]);
        if (this._validationInfo.deferred) {
          this._validationInfo.deferred.resolve(e);
          this._validationInfo.deferred = null;
        }
      }
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
  d.default.extenders.dxValidator = function (e, t) {
    e.dxValidator = new h(e, t);
    e.subscribe(e.dxValidator.validate.bind(e.dxValidator));
    return e;
  };
  s.default.registerModelForValidation = function (e) {
    (0, i.each)(e, function (t, n) {
      if (d.default.isObservable(n) && n.dxValidator) {
        s.default.registerValidatorInGroup(e, n.dxValidator);
      }
    });
  };
  s.default.unregisterModelForValidation = function (e) {
    (0, i.each)(e, function (t, n) {
      if (d.default.isObservable(n) && n.dxValidator) {
        s.default.removeRegisteredValidator(e, n.dxValidator);
      }
    });
  };
  s.default.validateModel = s.default.validateGroup;
}