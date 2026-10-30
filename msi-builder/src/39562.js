exports.default = undefined;
var i = require("./97906.js");
var o = p(require("./44504.js"));
var a = p(require("./96688.js"));
var r = p(require("./13046.js"));
var s = require("./13306.js");
var l = require("./95479.js");
var u = p(require("./90964.js"));
var d = p(require("./76299.js"));
var c = p(require("./99393.js"));
var h = require("./62754.js");
var f = p(require("./73176.js"));
function p(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
var g = r.default.inherit({
  _initOptions: function (e) {
    this.callBase.apply(this, arguments);
    this.option(u.default.initValidationOptions(e));
  },
  _getDefaultOptions: function () {
    return (0, s.extend)(this.callBase(), {
      validationRules: []
    });
  },
  _init: function () {
    this.callBase();
    this._initGroupRegistration();
    this.focused = (0, o.default)();
    this._initAdapter();
    this._validationInfo = {
      result: null,
      deferred: null,
      skipValidation: false
    };
  },
  _initGroupRegistration: function () {
    var e = this._findGroup();
    if (!this._groupWasInit) {
      this.on("disposing", function (e) {
        u.default.removeRegisteredValidator(e.component._validationGroup, e.component);
      });
    }
    if (!this._groupWasInit || this._validationGroup !== e) {
      u.default.removeRegisteredValidator(this._validationGroup, this);
      this._groupWasInit = true;
      this._validationGroup = e;
      u.default.registerValidatorInGroup(e, this);
    }
  },
  _setOptionsByReference: function () {
    this.callBase();
    (0, s.extend)(this._optionsByReference, {
      validationGroup: true
    });
  },
  _getEditor: function () {
    var e = this.$element()[0];
    return (0, i.data)(e, "dx-validation-target");
  },
  _initAdapter: function () {
    var e = this;
    var t = this._getEditor();
    var n = this.option("adapter");
    if (!n) {
      if (t) {
        (n = new d.default(t, this)).validationRequestsCallbacks.push(function (t) {
          if (!e._validationInfo.skipValidation) {
            e.validate(t);
          }
        });
        this.option("adapter", n);
        return;
      }
      throw a.default.Error("E0120");
    }
    var i = n.validationRequestsCallbacks;
    if (i) {
      i.push(function (t) {
        e.validate(t);
      });
    }
  },
  _toggleRTLDirection: function (e) {
    var n;
    var i;
    var o = ((n = this.option("adapter")) === null || n === undefined || (i = n.editor) === null || i === undefined ? undefined : i.option("rtlEnabled")) ?? e;
    this.callBase(o);
  },
  _initMarkup: function () {
    this.$element().addClass("dx-validator");
    this.callBase();
  },
  _render: function () {
    this.callBase();
    this._toggleAccessibilityAttributes();
  },
  _toggleAccessibilityAttributes: function () {
    var e = this._getEditor();
    if (e) {
      var t = (this.option("validationRules") || []).some(function (e) {
        return e.type === "required";
      }) || null;
      if (e.isInitialized()) {
        e.setAria("required", t);
      }
      e.option("_onMarkupRendered", function () {
        e.setAria("required", t);
      });
    }
  },
  _visibilityChanged: function (e) {
    if (e) {
      this._initGroupRegistration();
    }
  },
  _optionChanged: function (e) {
    switch (e.name) {
      case "validationGroup":
        this._initGroupRegistration();
        return;
      case "validationRules":
        this._resetValidationRules();
        this._toggleAccessibilityAttributes();
        if (this.option("isValid") !== undefined) {
          this.validate();
        }
        return;
      case "adapter":
        this._initAdapter();
        break;
      case "isValid":
      case "validationStatus":
        this.option(u.default.synchronizeValidationOptions(e, this.option()));
        break;
      default:
        this.callBase(e);
    }
  },
  _getValidationRules: function () {
    var e = this;
    this._validationRules ||= (0, l.map)(this.option("validationRules"), function (t, n) {
      return (0, s.extend)({}, t, {
        validator: e,
        index: n
      });
    });
    return this._validationRules;
  },
  _findGroup: function () {
    var e = this.$element();
    return this.option("validationGroup") || u.default.findGroup(e, this._modelByElement(e));
  },
  _resetValidationRules: function () {
    delete this._validationRules;
  },
  validate: function (e) {
    var t;
    var n = this;
    var i = this.option("adapter");
    var o = this.option("name");
    var a = i.bypass && i.bypass();
    var r = e && e.value !== undefined ? e.value : i.getValue();
    var l = i.getCurrentValidationError && i.getCurrentValidationError();
    var d = this._getValidationRules();
    var c = this._validationInfo && this._validationInfo.result;
    if (c && c.status === "pending" && c.value === r) {
      return (0, s.extend)({}, c);
    } else {
      if (a) {
        t = {
          isValid: true,
          status: "valid"
        };
      } else if (l && l.editorSpecific) {
        l.validator = this;
        t = {
          isValid: false,
          status: "invalid",
          brokenRule: l,
          brokenRules: [l]
        };
      } else {
        t = u.default.validate(r, d, o);
      }
      t.id = new f.default().toString();
      this._applyValidationResult(t, i);
      if (t.complete) {
        t.complete.then(function (e) {
          if (e.id === n._validationInfo.result.id) {
            n._applyValidationResult(e, i);
          }
        });
      }
      return (0, s.extend)({}, this._validationInfo.result);
    }
  },
  reset: function () {
    var e = this.option("adapter");
    var t = {
      id: null,
      isValid: true,
      brokenRule: null,
      brokenRules: null,
      pendingRules: null,
      status: "valid",
      complete: null
    };
    this._validationInfo.skipValidation = true;
    e.reset();
    this._validationInfo.skipValidation = false;
    this._resetValidationRules();
    this._applyValidationResult(t, e);
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
      this._validationInfo.result = (0, s.extend)({}, e, {
        complete: n
      });
    }
  },
  _applyValidationResult: function (e, t) {
    var n = this._createActionByOption("onValidated", {
      excludeValidators: ["readOnly"]
    });
    e.validator = this;
    this._updateValidationResult(e);
    if (t.applyValidationResults) {
      t.applyValidationResults(this._validationInfo.result);
    }
    this.option({
      validationStatus: this._validationInfo.result.status
    });
    if (this._validationInfo.result.status === "pending") {
      if (!this._validationInfo.deferred) {
        this._validationInfo.deferred = new h.Deferred();
        this._validationInfo.result.complete = this._validationInfo.deferred.promise();
      }
      this._eventsStrategy.fireEvent("validating", [this._validationInfo.result]);
      return;
    }
    if (this._validationInfo.result.status !== "pending") {
      n(e);
      if (this._validationInfo.deferred) {
        this._validationInfo.deferred.resolve(e);
        this._validationInfo.deferred = null;
      }
    }
  },
  focus: function () {
    var e = this.option("adapter");
    if (e && e.focus) {
      e.focus();
    }
  },
  _useTemplates: function () {
    return false;
  }
});
(0, c.default)("dxValidator", g);
var m = g;
exports.default = m;
module.exports = exports.default;
module.exports.default = exports.default;