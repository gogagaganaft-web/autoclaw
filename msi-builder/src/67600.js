exports.default = undefined;
var i = h(require("./68374.js"));
var o = require("./13306.js");
var a = h(require("./39114.js"));
var r = h(require("./17737.js"));
var s = require("./62754.js");
var l = h(require("./28109.js"));
var u = require("./58201.js");
var d = h(require("./20530.js"));
var c = require("./75811.js");
function h(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
var f = function () {
  function e(e, t) {
    this._editorInstance = e;
    this._popupUserConfig = t;
    this._renderPopup();
    this._attachOptionChangedHandler();
  }
  var t = e.prototype;
  t._renderPopup = function () {
    var e = this._editorInstance;
    var t = (0, i.default)("<div>").addClass("dx-formdialog").appendTo(e.$element());
    var n = this._getPopupConfig();
    return e._createComponent(t, a.default, n);
  };
  t._attachOptionChangedHandler = function () {
    var e;
    var t = this;
    if ((e = this._popup) !== null && e !== undefined) {
      e.on("optionChanged", function (e) {
        var n = e.name;
        var i = e.value;
        if (n === "title") {
          t._updateFormLabel(i);
        }
      });
    }
  };
  t._escKeyHandler = function () {
    this._popup.hide();
  };
  t._addEscapeHandler = function (e) {
    e.component.registerKeyHandler("escape", this._escKeyHandler.bind(this));
  };
  t._isSmallScreen = function () {
    var e = (0, u.hasWindow)() ? (0, u.getCurrentScreenFactor)() : null;
    return d.default.real().deviceType === "phone" || e === "xs";
  };
  t._getPopupConfig = function () {
    var e = this;
    return (0, o.extend)({
      onInitialized: function (t) {
        e._popup = t.component;
        e._popup.on("hiding", function () {
          return e.onHiding();
        });
        e._popup.on("shown", function () {
          e._form.focus();
        });
      },
      deferRendering: false,
      focusStateEnabled: false,
      showCloseButton: false,
      fullScreen: this._isSmallScreen(),
      contentTemplate: function (t) {
        var n = (0, i.default)("<div>").appendTo(t);
        e._renderForm(n, {
          onEditorEnterKey: function (t) {
            return e.callAddButtonAction(t.event);
          },
          customizeItem: function (t) {
            if (t.itemType === "simple") {
              t.editorOptions = (0, o.extend)(true, {}, t.editorOptions, {
                onInitialized: e._addEscapeHandler.bind(e)
              });
            }
          }
        });
      },
      toolbarItems: [{
        toolbar: "bottom",
        location: "after",
        widget: "dxButton",
        options: {
          onInitialized: this._addEscapeHandler.bind(this),
          text: l.default.format("OK"),
          onClick: function (t) {
            return e.callAddButtonAction(t.event);
          }
        }
      }, {
        toolbar: "bottom",
        location: "after",
        widget: "dxButton",
        options: {
          onInitialized: this._addEscapeHandler.bind(this),
          text: l.default.format("Cancel"),
          onClick: function () {
            e._popup.hide();
          }
        }
      }],
      _wrapperClassExternal: "dx-formdialog"
    }, this._popupUserConfig);
  };
  t.onHiding = function () {
    this.beforeAddButtonAction = undefined;
    this.deferred.reject();
  };
  t.callAddButtonAction = function (e) {
    if (!this.beforeAddButtonAction || !!this.beforeAddButtonAction()) {
      this.hide(this._form.option("formData"), e);
    }
  };
  t._renderForm = function (e, t) {
    e.addClass("dx-formdialog-form");
    this._form = this._editorInstance._createComponent(e, r.default, t);
    this._updateFormLabel();
  };
  t._updateFormLabel = function (e) {
    var t;
    var n = e ?? this.popupOption("title");
    if ((t = this._form) !== null && t !== undefined) {
      t.$element().attr("aria-label", n);
    }
  };
  t._getDefaultFormOptions = function () {
    return {
      colCount: 1,
      width: "auto",
      labelLocation: (0, c.isMaterial)() ? "top" : "left"
    };
  };
  t.formOption = function (e, t) {
    return this._form.option.apply(this._form, arguments);
  };
  t.show = function (e) {
    if (!this._popup.option("visible")) {
      this.deferred = new s.Deferred();
      var t = (0, o.extend)(this._getDefaultFormOptions(), e);
      this._form.option(t);
      this._popup.show();
      return this.deferred.promise();
    }
  };
  t.hide = function (e, t) {
    this.deferred.resolve(e, t);
    this._popup.hide();
  };
  t.popupOption = function (e, t) {
    return this._popup.option.apply(this._popup, arguments);
  };
  return e;
}();
exports.default = f;
module.exports = exports.default;
module.exports.default = exports.default;