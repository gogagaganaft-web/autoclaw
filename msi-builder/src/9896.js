exports.default = undefined;
var i = c(require("./68374.js"));
var o = c(require("./20530.js"));
var a = c(require("./99393.js"));
var r = c(require("./14390.js"));
var s = c(require("./17287.js"));
var l = c(require("./51495.js"));
var u = c(require("./26559.js"));
var d = c(require("./41183.js"));
function c(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
function h(e, t) {
  return (h = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (e, t) {
    e.__proto__ = t;
    return e;
  })(e, t);
}
var f = function (e) {
  var t;
  var n;
  function a() {
    return e.apply(this, arguments) || this;
  }
  n = e;
  (t = a).prototype = Object.create(n.prototype);
  t.prototype.constructor = t;
  h(t, n);
  var r = a.prototype;
  r.show = function (e) {
    if (!this._isMobileLayout()) {
      this._overlay.option("target", e);
    }
    this._overlay.show();
  };
  r.hide = function () {
    this._overlay.hide();
  };
  r._keyboardHandler = function (e) {
    var t;
    if ((t = this._calendar) !== null && t !== undefined) {
      t._keyboardHandler(e);
    }
  };
  r._init = function () {
    e.prototype._init.call(this);
    this.$element();
  };
  r._render = function () {
    e.prototype._render.call(this);
    this._renderOverlay();
  };
  r._renderOverlay = function () {
    var e = this;
    this.$element().addClass("dx-scheduler-navigator-calendar-popover");
    var t = this._isMobileLayout();
    var n = t ? l.default : s.default;
    this._overlay = this._createComponent(this.$element(), n, {
      contentTemplate: function () {
        return e._createOverlayContent();
      },
      onShown: function () {
        return e._calendar.focus();
      },
      defaultOptionsRules: [{
        device: function () {
          return t;
        },
        options: {
          fullScreen: true,
          showCloseButton: false,
          toolbarItems: [{
            shortcut: "cancel"
          }]
        }
      }]
    });
  };
  r._createOverlayContent = function () {
    var e = (0, i.default)("<div>").addClass("dx-scheduler-navigator-calendar");
    this._calendar = this._createComponent(e, u.default, this._getCalendarOptions());
    if (this._isMobileLayout()) {
      return this._createScrollable(e).$element();
    } else {
      return e;
    }
  };
  r._createScrollable = function (e) {
    var t = this._createComponent("<div>", d.default, {
      direction: "vertical"
    });
    t.$content().append(e);
    return t;
  };
  r._optionChanged = function (e) {
    var t;
    var n = e.name;
    var i = e.value;
    switch (n) {
      case "value":
        if ((t = this._calendar) !== null && t !== undefined) {
          t.option("value", i);
        }
    }
  };
  r._getCalendarOptions = function () {
    return {
      value: this.option("value"),
      min: this.option("min"),
      max: this.option("max"),
      firstDayOfWeek: this.option("firstDayOfWeek"),
      focusStateEnabled: this.option("focusStateEnabled"),
      onValueChanged: this.option("onValueChanged"),
      skipFocusCheck: true,
      tabIndex: this.option("tabIndex")
    };
  };
  r._isMobileLayout = function () {
    return !o.default.current().generic;
  };
  return a;
}(r.default);
exports.default = f;
(0, a.default)("dxSchedulerCalendarPopup", f);
module.exports = exports.default;
module.exports.default = exports.default;