exports.default = undefined;
var i = s(require("./68374.js"));
var o = require("./13306.js");
var a = s(require("./29837.js"));
var r = s(require("./62567.js"));
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
  function r() {
    return e.apply(this, arguments) || this;
  }
  n = e;
  (t = r).prototype = Object.create(n.prototype);
  t.prototype.constructor = t;
  l(t, n);
  var s = r.prototype;
  s.show = function (t) {
    t = t || "";
    if (this._nameTextBox) {
      this._nameTextBox.option("value", t);
    } else {
      this._initialNameValue = t;
    }
    e.prototype.show.call(this);
  };
  s._onPopupShown = function () {
    if (this._nameTextBox) {
      var e = this._nameTextBox._input();
      if (e.length) {
        e[0].select();
      }
      this._nameTextBox.focus();
    }
  };
  s._getDialogOptions = function () {
    return (0, o.extend)(e.prototype._getDialogOptions.call(this), {
      title: this.option("title"),
      buttonText: this.option("buttonText"),
      contentCssClass: "dx-filemanager-dialog-name-editor",
      popupCssClass: "dx-filemanager-dialog-name-editor-popup"
    });
  };
  s._createContentTemplate = function (t) {
    var n = this;
    e.prototype._createContentTemplate.call(this, t);
    this._nameTextBox = this._createComponent((0, i.default)("<div>"), a.default, {
      value: this._initialNameValue,
      onEnterKey: function () {
        return n._hasCompositionJustEnded && n._applyDialogChanges();
      },
      onKeyDown: function (e) {
        return n._checkCompositionEnded(e);
      }
    });
    this._$contentElement.append(this._nameTextBox.$element());
  };
  s._checkCompositionEnded = function (e) {
    var t = e.event;
    this._hasCompositionJustEnded = t.which !== 229;
  };
  s._getDialogResult = function () {
    var e = this._nameTextBox.option("value");
    if (e) {
      return {
        name: e
      };
    } else {
      return null;
    }
  };
  s._getDefaultOptions = function () {
    return (0, o.extend)(e.prototype._getDefaultOptions.call(this), {
      title: "",
      buttonText: ""
    });
  };
  return r;
}(r.default);
exports.default = u;
module.exports = exports.default;
module.exports.default = exports.default;