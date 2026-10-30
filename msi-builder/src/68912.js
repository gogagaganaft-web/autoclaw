exports.default = undefined;
var i = s(require("./68374.js"));
var o = require("./13306.js");
var a = s(require("./14390.js"));
var r = s(require("./63008.js"));
function s(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
function l(e, t) {
  return (l = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (e, t) {
    e.__proto__ = t;
    return e;
  })(e, t);
}
var u = function (e) {
  var t;
  var n;
  function a() {
    return e.apply(this, arguments) || this;
  }
  n = e;
  (t = a).prototype = Object.create(n.prototype);
  t.prototype.constructor = t;
  l(t, n);
  var s = a.prototype;
  s._initMarkup = function () {
    var t = this;
    this._createClickAction();
    var n = (0, i.default)("<div>");
    this.$element().append(n).addClass("dx-filemanager-file-actions-button");
    this._button = this._createComponent(n, r.default, {
      icon: "overflow",
      stylingMode: "text",
      onClick: function (e) {
        return t._raiseClick(e);
      }
    });
    e.prototype._initMarkup.call(this);
  };
  s._createClickAction = function () {
    this._clickAction = this._createActionByOption("onClick");
  };
  s._raiseClick = function (e) {
    this._clickAction(e);
  };
  s._getDefaultOptions = function () {
    return (0, o.extend)(e.prototype._getDefaultOptions.call(this), {
      cssClass: "",
      onClick: null
    });
  };
  s._optionChanged = function (t) {
    switch (t.name) {
      case "cssClass":
        this.repaint();
        break;
      case "onClick":
        this._createClickAction();
        break;
      default:
        e.prototype._optionChanged.call(this, t);
    }
  };
  s.setActive = function (e) {
    var t = this;
    this.$element().toggleClass("dx-filemanager-file-actions-button-activated", e);
    setTimeout(function () {
      return t._button.$element().toggleClass("dx-state-active", e);
    });
  };
  return a;
}(a.default);
exports.default = u;
module.exports = exports.default;
module.exports.default = exports.default;