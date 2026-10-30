exports.default = undefined;
var i = require("./35922.js");
var o = h(require("./27135.js"));
var a = h(require("./90964.js"));
var r = require("./13306.js");
var s = h(require("./68374.js"));
var l = require("./97906.js");
var u = h(require("./44504.js"));
var d = h(require("./96452.js"));
var c = require("./46299.js");
function h(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
function f(e, t) {
  return (f = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (e, t) {
    e.__proto__ = t;
    return e;
  })(e, t);
}
var p = function (e) {
  var t;
  var n;
  function o() {
    return e.apply(this, arguments) || this;
  }
  n = e;
  (t = o).prototype = Object.create(n.prototype);
  t.prototype.constructor = t;
  f(t, n);
  var d = o.prototype;
  d.getProps = function () {
    var t = this;
    var n = e.prototype.getProps.call(this);
    n.onFocusIn = function () {
      if (t.option("validationMessageMode") === "auto") {
        var e = (0, s.default)((0, c.querySelectorInSameDocument)(t.element(), ".dx-invalid-message.dx-overlay-wrapper"));
        if (e != null) {
          e.removeClass("dx-invalid-message-auto");
        }
        if (t.showValidationMessageTimeout) {
          clearTimeout(t.showValidationMessageTimeout);
        }
        t.showValidationMessageTimeout = setTimeout(function () {
          if (e != null) {
            e.addClass("dx-invalid-message-auto");
          }
        }, 150);
      }
    };
    n.saveValueChangeEvent = function (e) {
      t._valueChangeEventInstance = e;
    };
    return n;
  };
  d._createElement = function (t) {
    e.prototype._createElement.call(this, t);
    this.showValidationMessageTimeout = undefined;
    this.validationRequest = (0, u.default)();
    (0, l.data)(this.$element()[0], "dx-validation-target", this);
  };
  d._render = function () {
    var e;
    if ((e = this.option("_onMarkupRendered")) !== null && e !== undefined) {
      e();
    }
  };
  d._initializeComponent = function () {
    e.prototype._initializeComponent.call(this);
    this._valueChangeAction = this._createActionByOption("onValueChanged", {
      excludeValidators: ["disabled", "readOnly"]
    });
  };
  d._initOptions = function (t) {
    e.prototype._initOptions.call(this, t);
    this.option(a.default.initValidationOptions(t));
  };
  d._getDefaultOptions = function () {
    return (0, r.extend)(e.prototype._getDefaultOptions.call(this), {
      validationMessageOffset: {
        h: 0,
        v: 0
      },
      validationTooltipOptions: {}
    });
  };
  d._bindInnerWidgetOptions = function (e, t) {
    var n = this;
    var i = (0, r.extend)({}, e.option());
    function o() {
      return n._silent(t, i);
    }
    o();
    e.on("optionChanged", o);
  };
  d._raiseValidation = function (e, t) {
    var n = !(0, i.isDefined)(e) && !(0, i.isDefined)(t);
    if (e !== t && !n) {
      this.validationRequest.fire({
        value: e,
        editor: this
      });
    }
  };
  d._raiseValueChangeAction = function (e, t) {
    var n;
    if ((n = this._valueChangeAction) !== null && n !== undefined) {
      n.call(this, {
        element: this.$element(),
        previousValue: t,
        value: e,
        event: this._valueChangeEventInstance
      });
    }
    this._valueChangeEventInstance = undefined;
  };
  d._optionChanged = function (t) {
    var n = t.name;
    var i = t.previousValue;
    var o = t.value;
    if (n && this._getActionConfigs()[n] !== undefined) {
      this._addAction(n);
    }
    switch (n) {
      case "value":
        this._raiseValidation(o, i);
        this._raiseValueChangeAction(o, i);
        break;
      case "onValueChanged":
        this._valueChangeAction = this._createActionByOption("onValueChanged", {
          excludeValidators: ["disabled", "readOnly"]
        });
        break;
      case "isValid":
      case "validationError":
      case "validationErrors":
      case "validationStatus":
        this.option(a.default.synchronizeValidationOptions(t, this.option()));
    }
    e.prototype._optionChanged.call(this, t);
  };
  d.reset = function () {
    var e = this._getDefaultOptions().value;
    this.option({
      value: e
    });
  };
  d._dispose = function () {
    e.prototype._dispose.call(this);
    (0, l.data)(this.element(), "dx-validation-target", null);
    if (this.showValidationMessageTimeout) {
      clearTimeout(this.showValidationMessageTimeout);
    }
  };
  return o;
}(o.default);
exports.default = p;
var g = d.default.isEditor;
function m(e) {
  return g(e) || e instanceof p;
}
p.isEditor = m;
d.default.isEditor = m;
module.exports = exports.default;
module.exports.default = exports.default;