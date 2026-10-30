exports.default = undefined;
var i = d(require("./68374.js"));
var o = d(require("./11483.js"));
var a = d(require("./63008.js"));
var r = require("./13306.js");
var s = d(require("./55994.js"));
var l = require("./24028.js");
var u = require("./95429.js");
function d(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
function c(e, t) {
  return (c = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (e, t) {
    e.__proto__ = t;
    return e;
  })(e, t);
}
var h = function (e) {
  var t;
  var n;
  function o() {
    return e.apply(this, arguments) || this;
  }
  n = e;
  (t = o).prototype = Object.create(n.prototype);
  t.prototype.constructor = t;
  c(t, n);
  var d = o.prototype;
  d._attachEvents = function (e, t) {
    var n = this.editor;
    s.default.on(t, l.start, function () {
      n.$element().addClass("dx-custom-button-hovered");
    });
    s.default.on(t, l.end, function () {
      n.$element().removeClass("dx-custom-button-hovered");
    });
    s.default.on(t, u.name, function (e) {
      e.stopPropagation();
    });
  };
  d._create = function () {
    var e = this.editor;
    var t = (0, i.default)("<div>");
    this._addToContainer(t);
    return {
      $element: t,
      instance: e._createComponent(t, a.default, (0, r.extend)({}, this.options, {
        ignoreParentReadOnly: true,
        disabled: this._isDisabled(),
        integrationOptions: this._prepareIntegrationOptions(e)
      }))
    };
  };
  d._prepareIntegrationOptions = function (e) {
    return (0, r.extend)({}, e.option("integrationOptions"), {
      skipTemplates: ["content"]
    });
  };
  d.update = function () {
    var t = e.prototype.update.call(this);
    if (this.instance) {
      this.instance.option("disabled", this._isDisabled());
    }
    return t;
  };
  d._isVisible = function () {
    return this.editor.option("visible");
  };
  d._isDisabled = function () {
    if (this.options.disabled !== undefined) {
      if (this.instance) {
        return this.instance.option("disabled");
      } else {
        return this.options.disabled;
      }
    } else {
      return this.editor.option("readOnly");
    }
  };
  return o;
}(o.default);
exports.default = h;
module.exports = exports.default;
module.exports.default = exports.default;