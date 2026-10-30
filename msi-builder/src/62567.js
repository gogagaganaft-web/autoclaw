exports.default = undefined;
var i = u(require("./68374.js"));
var o = require("./13306.js");
var a = require("./35922.js");
var r = u(require("./28109.js"));
var s = u(require("./14390.js"));
var l = u(require("./51495.js"));
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
  function s() {
    return e.apply(this, arguments) || this;
  }
  n = e;
  (t = s).prototype = Object.create(n.prototype);
  t.prototype.constructor = t;
  d(t, n);
  var u = s.prototype;
  u._initMarkup = function () {
    var n = this;
    e.prototype._initMarkup.call(this);
    this._createOnClosedAction();
    var o = this._getDialogOptions();
    var s = (0, i.default)("<div>").appendTo(this.$element());
    var u = {
      showTitle: true,
      title: o.title,
      visible: false,
      hideOnOutsideClick: true,
      contentTemplate: this._createContentTemplate.bind(this),
      toolbarItems: [{
        widget: "dxButton",
        toolbar: "bottom",
        location: "after",
        options: {
          text: o.buttonText,
          onClick: this._applyDialogChanges.bind(this)
        }
      }, {
        widget: "dxButton",
        toolbar: "bottom",
        location: "after",
        options: {
          text: r.default.format("dxFileManager-dialogButtonCancel"),
          onClick: this._closeDialog.bind(this)
        }
      }],
      onInitialized: function (e) {
        e.component.registerKeyHandler("enter", n._applyDialogChanges.bind(n));
      },
      onHidden: this._onPopupHidden.bind(this),
      onShown: this._onPopupShown.bind(this),
      _wrapperClassExternal: `dx-filemanager-dialog-popup ${o.popupCssClass ?? ""}`
    };
    if ((0, a.isDefined)(o.height)) {
      u.height = o.height;
    }
    if ((0, a.isDefined)(o.maxHeight)) {
      u.maxHeight = o.maxHeight;
    }
    this._popup = this._createComponent(s, l.default, u);
  };
  u.show = function () {
    this._dialogResult = null;
    this._popup.show();
  };
  u._getDialogOptions = function () {
    return {
      title: "Title",
      buttonText: "ButtonText",
      contentCssClass: "",
      popupCssClass: ""
    };
  };
  u._createContentTemplate = function (e) {
    this._$contentElement = (0, i.default)("<div>").appendTo(e).addClass("dx-filemanager-dialog");
    var t = this._getDialogOptions().contentCssClass;
    if (t) {
      this._$contentElement.addClass(t);
    }
  };
  u._getDialogResult = function () {
    return null;
  };
  u._applyDialogChanges = function () {
    var e = this._getDialogResult();
    if (e) {
      this._dialogResult = e;
      this._closeDialog();
    }
  };
  u._closeDialog = function () {
    this._popup.hide();
  };
  u._onPopupHidden = function () {
    this._onClosedAction({
      dialogResult: this._dialogResult
    });
  };
  u._onPopupShown = function () {};
  u._createOnClosedAction = function () {
    this._onClosedAction = this._createActionByOption("onClosed");
  };
  u._setTitle = function (e) {
    this._popup.option("title", e);
  };
  u._setApplyButtonOptions = function (e) {
    this._popup.option("toolbarItems[0].options", e);
  };
  u._getDefaultOptions = function () {
    return (0, o.extend)(e.prototype._getDefaultOptions.call(this), {
      onClosed: null
    });
  };
  u._optionChanged = function (t) {
    switch (t.name) {
      case "onClosed":
        this._createOnPathChangedAction();
        break;
      default:
        e.prototype._optionChanged.call(this, t);
    }
  };
  return s;
}(s.default);
exports.default = c;
module.exports = exports.default;
module.exports.default = exports.default;