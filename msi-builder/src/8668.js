function i(e) {
  return (i = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function (e) {
    return typeof e;
  } : function (e) {
    if (e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype) {
      return "symbol";
    } else {
      return typeof e;
    }
  })(e);
}
exports.default = undefined;
var o = s(require("./90964.js"));
var a = s(require("./27135.js"));
var r = require("./44899.js");
function s(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
function l() {
  return (l = Object.assign ? Object.assign.bind() : function (e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var i in n) {
        if (Object.prototype.hasOwnProperty.call(n, i)) {
          e[i] = n[i];
        }
      }
    }
    return e;
  }).apply(this, arguments);
}
function u(e, t) {
  for (var n = 0; n < t.length; n++) {
    var o = t[n];
    o.enumerable = o.enumerable || false;
    o.configurable = true;
    if ("value" in o) {
      o.writable = true;
    }
    Object.defineProperty(e, (a = o.key, r = undefined, r = function (e, t) {
      if (i(e) !== "object" || e === null) {
        return e;
      }
      var n = e[Symbol.toPrimitive];
      if (n !== undefined) {
        var o = n.call(e, t || "default");
        if (i(o) !== "object") {
          return o;
        }
        throw new TypeError("@@toPrimitive must return a primitive value.");
      }
      return (t === "string" ? String : Number)(e);
    }(a, "string"), i(r) === "symbol" ? r : String(r)), o);
  }
  var a;
  var r;
}
function d(e, t) {
  return (d = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (e, t) {
    e.__proto__ = t;
    return e;
  })(e, t);
}
var c = function (e) {
  var t;
  var n;
  function i() {
    return e.apply(this, arguments) || this;
  }
  n = e;
  (t = i).prototype = Object.create(n.prototype);
  t.prototype.constructor = t;
  d(t, n);
  var a;
  var s;
  var c;
  var h = i.prototype;
  h.getDefaultTemplateNames = function () {
    return ["content"];
  };
  h.getSupportedKeyNames = function () {
    return ["space", "enter"];
  };
  h.getProps = function () {
    var t = this;
    var n = e.prototype.getProps.call(this);
    n.onClick = function (e) {
      var n = e.event;
      t._clickAction({
        event: n,
        validationGroup: t._validationGroupConfig
      });
    };
    if ((0, r.getImageSourceType)(n.icon) === "svg") {
      n.iconTemplate = this._createTemplateComponent(function () {
        return n.icon;
      });
    }
    return n;
  };
  h._toggleActiveState = function (e, t) {
    var n = this.viewRef;
    if (t) {
      n.activate();
    } else {
      n.deactivate();
    }
  };
  h._getSubmitAction = function () {
    var e = this;
    var t = true;
    var n = "valid";
    return this._createAction(function (i) {
      var o = i.event;
      var a = i.submitInput;
      if (t) {
        var r = e._validationGroupConfig;
        if (r !== undefined && r !== "") {
          var s = r.validate();
          n = s.status;
          if (s.status === "pending") {
            t = false;
            e.option("disabled", true);
            s.complete.then(function (i) {
              var o = i.status;
              e.option("disabled", false);
              if ((n = o) === "valid") {
                a.click();
              }
              t = true;
            });
          }
        }
      }
      if (n !== "valid") {
        o.preventDefault();
      }
      o.stopPropagation();
    });
  };
  h._initializeComponent = function () {
    e.prototype._initializeComponent.call(this);
    this._addAction("onSubmit", this._getSubmitAction());
    this._clickAction = this._createClickAction();
  };
  h._initMarkup = function () {
    e.prototype._initMarkup.call(this);
    var t = this.$element().find(".dx-button-content");
    var n = t.children().filter(".dx-template-wrapper");
    var i = t.children().filter(".dx-button-submit-input");
    if (n.length) {
      n.addClass("dx-button-content");
      n.append(i);
      t.replaceWith(n);
    }
  };
  h._patchOptionValues = function (t) {
    return e.prototype._patchOptionValues.call(this, l({}, t, {
      templateData: t._templateData
    }));
  };
  h._findGroup = function () {
    var e = this.$element();
    var t = this.option("validationGroup");
    if (t !== undefined && t !== "") {
      return t;
    } else {
      return o.default.findGroup(e, this._modelByElement(e));
    }
  };
  h._createClickAction = function () {
    return this._createActionByOption("onClick", {
      excludeValidators: ["readOnly"]
    });
  };
  h._optionChanged = function (t) {
    switch (t.name) {
      case "onClick":
        this._clickAction = this._createClickAction();
    }
    e.prototype._optionChanged.call(this, t);
  };
  a = i;
  if (s = [{
    key: "_validationGroupConfig",
    get: function () {
      return o.default.getGroupConfig(this._findGroup());
    }
  }, {
    key: "_templatesInfo",
    get: function () {
      return {
        template: "content"
      };
    }
  }]) {
    u(a.prototype, s);
  }
  if (c) {
    u(a, c);
  }
  Object.defineProperty(a, "prototype", {
    writable: false
  });
  return i;
}(a.default);
exports.default = c;
module.exports = exports.default;
module.exports.default = exports.default;