exports.default = undefined;
var i = l(require("./68374.js"));
var o = l(require("./14390.js"));
var a = l(require("./28109.js"));
var r = l(require("./51495.js"));
var s = require("./13306.js");
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
  function o() {
    return e.apply(this, arguments) || this;
  }
  n = e;
  (t = o).prototype = Object.create(n.prototype);
  t.prototype.constructor = t;
  u(t, n);
  var l = o.prototype;
  l._init = function () {
    e.prototype._init.call(this);
    this._command = undefined;
    this._isShown = false;
    this._createOnGetContentOption();
    this._createOnHiddenOption();
  };
  l._initMarkup = function () {
    e.prototype._initMarkup.call(this);
    this._command = this.option("command");
    this._$popupElement = (0, i.default)("<div>").appendTo(this.$element());
    this._popup = this._createComponent(this._$popupElement, r.default, {
      title: this.option("title"),
      maxWidth: this.option("maxWidth"),
      height: this.option("height"),
      toolbarItems: this.option("toolbarItems"),
      onHidden: this._onHiddenAction
    });
  };
  l._clean = function () {
    delete this._popup;
    if (this._$popupElement) {
      this._$popupElement.remove();
    }
  };
  l._getDefaultOptions = function () {
    return (0, s.extend)(e.prototype._getDefaultOptions.call(this), {
      title: "",
      maxWidth: 500,
      height: "auto",
      toolbarItems: this._getToolbarItems()
    });
  };
  l._getToolbarItems = function () {
    return [this._getOkToolbarItem(), this._getCancelToolbarItem()];
  };
  l._getOkToolbarItem = function () {
    return {
      widget: "dxButton",
      location: "after",
      toolbar: "bottom",
      options: {
        text: a.default.format("dxDiagram-dialogButtonOK"),
        onClick: function () {
          this._command.execute(this._commandParameter);
          this._hide();
        }.bind(this)
      }
    };
  };
  l._getCancelToolbarItem = function () {
    return {
      widget: "dxButton",
      location: "after",
      toolbar: "bottom",
      options: {
        text: a.default.format("dxDiagram-dialogButtonCancel"),
        onClick: this._hide.bind(this)
      }
    };
  };
  l._optionChanged = function (t) {
    switch (t.name) {
      case "title":
      case "maxWidth":
      case "height":
      case "toolbarItems":
        this._popup.option(t.name, t.value);
        break;
      case "command":
        this._command = t.value;
        break;
      case "onGetContent":
        this._createOnGetContentOption();
        break;
      case "onHidden":
        this._createOnHiddenOption();
        break;
      default:
        e.prototype._optionChanged.call(this, t);
    }
  };
  l._createOnGetContentOption = function () {
    this._onGetContentAction = this._createActionByOption("onGetContent");
  };
  l._createOnHiddenOption = function () {
    this._onHiddenAction = this._createActionByOption("onHidden");
  };
  l._hide = function () {
    this._popup.hide();
    this._isShown = false;
  };
  l._show = function () {
    this._popup.$content().empty().append(this._onGetContentAction());
    this._popup.show();
    this._isShown = true;
  };
  l.isVisible = function () {
    return this._isShown;
  };
  return o;
}(o.default);
exports.default = d;
module.exports = exports.default;
module.exports.default = exports.default;