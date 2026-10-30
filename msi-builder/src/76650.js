exports.default = undefined;
var i = l(require("./68374.js"));
var o = require("./13306.js");
var a = l(require("./28109.js"));
var r = l(require("./4741.js"));
var s = l(require("./62567.js"));
function l(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
function u(e, t) {
  return (u = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (e, t) {
    e.__proto__ = t;
    return e;
  })(e, t);
}
var d = function (e) {
  var t;
  var n;
  function s() {
    return e.apply(this, arguments) || this;
  }
  n = e;
  (t = s).prototype = Object.create(n.prototype);
  t.prototype.constructor = t;
  u(t, n);
  var l = s.prototype;
  l.show = function (t) {
    var n = t.itemName;
    var i = t.itemCount;
    var o = i === 1 ? a.default.format("dxFileManager-dialogDeleteItemSingleItemConfirmation", n) : a.default.format("dxFileManager-dialogDeleteItemMultipleItemsConfirmation", i);
    if (this._$text) {
      this._$text.text(o);
    } else {
      this._initialText = o;
    }
    e.prototype.show.call(this);
  };
  l._getDialogOptions = function () {
    return (0, o.extend)(e.prototype._getDialogOptions.call(this), {
      title: a.default.format("dxFileManager-dialogDeleteItemTitle"),
      buttonText: a.default.format("dxFileManager-dialogDeleteItemButtonText"),
      contentCssClass: "dx-filemanager-dialog-delete-item",
      popupCssClass: "dx-filemanager-dialog-delete-item-popup",
      height: "auto",
      maxHeight: "80vh"
    });
  };
  l._createContentTemplate = function (t) {
    e.prototype._createContentTemplate.call(this, t);
    this._$text = (0, i.default)("<div>").text(this._initialText).appendTo(this._$contentElement);
    this._createComponent(this._$contentElement, r.default, {
      width: "100%",
      height: "100%"
    });
  };
  l._getDialogResult = function () {
    return {};
  };
  return s;
}(s.default);
exports.default = d;
module.exports = exports.default;
module.exports.default = exports.default;