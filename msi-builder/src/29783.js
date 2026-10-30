exports.default = undefined;
var i = u(require("./68374.js"));
var o = require("./13306.js");
var a = u(require("./55994.js"));
var r = u(require("./28109.js"));
var s = u(require("./11483.js"));
var l = u(require("./63008.js"));
function u(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
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
  function s(t, n, i) {
    var o;
    (o = e.call(this, t, n, i) || this).currentTemplate = null;
    return o;
  }
  n = e;
  (t = s).prototype = Object.create(n.prototype);
  t.prototype.constructor = t;
  d(t, n);
  var u = s.prototype;
  u._attachEvents = function (e) {
    var t = this.editor;
    e.option("onClick", function (e) {
      var n;
      if ((n = t._shouldCallOpenHandler) !== null && n !== undefined && n.call(t) || !t.option("openOnFieldClick")) {
        t._openHandler(e);
      }
    });
    a.default.on(e.$element(), "mousedown", function (e) {
      if (t.$element().is(".dx-state-focused")) {
        e.preventDefault();
      }
    });
  };
  u._create = function () {
    var e = this.editor;
    var t = (0, i.default)("<div>");
    var n = this._getOptions();
    this._addToContainer(t);
    var a = e._createComponent(t, l.default, (0, o.extend)({}, n, {
      elementAttr: {
        "aria-label": r.default.format("dxDropDownEditor-selectLabel")
      }
    }));
    this._legacyRender(e.$element(), t, n.visible);
    return {
      $element: t,
      instance: a
    };
  };
  u._getOptions = function () {
    var e = this.editor;
    var t = this._isVisible();
    var n = {
      focusStateEnabled: false,
      hoverStateEnabled: false,
      activeStateEnabled: false,
      useInkRipple: false,
      disabled: e.option("readOnly"),
      visible: t
    };
    this._addTemplate(n);
    return n;
  };
  u._isVisible = function () {
    var t = this.editor;
    return e.prototype._isVisible.call(this) && t.option("showDropDownButton");
  };
  u._legacyRender = function (e, t, n) {
    e.toggleClass("dx-dropdowneditor-button-visible", n);
    if (t) {
      t.removeClass("dx-button").addClass("dx-dropdowneditor-button");
    }
  };
  u._isSameTemplate = function () {
    return this.editor.option("dropDownButtonTemplate") === this.currentTemplate;
  };
  u._addTemplate = function (e) {
    if (!this._isSameTemplate()) {
      e.template = this.editor._getTemplateByOption("dropDownButtonTemplate");
      this.currentTemplate = this.editor.option("dropDownButtonTemplate");
    }
  };
  u.update = function () {
    if (e.prototype.update.call(this)) {
      var t = this.editor;
      var n = this.instance;
      var i = t.$element();
      var o = this._getOptions();
      if (n != null) {
        n.option(o);
      }
      this._legacyRender(i, n == null ? undefined : n.$element(), o.visible);
    }
  };
  return s;
}(s.default);
exports.default = c;
module.exports = exports.default;
module.exports.default = exports.default;