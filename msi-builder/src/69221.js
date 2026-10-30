exports.default = undefined;
var i = l(require("./68374.js"));
var o = require("./13306.js");
var a = l(require("./14390.js"));
var r = l(require("./63008.js"));
var s = require("./75811.js");
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
  function a() {
    return e.apply(this, arguments) || this;
  }
  n = e;
  (t = a).prototype = Object.create(n.prototype);
  t.prototype.constructor = t;
  u(t, n);
  var l = a.prototype;
  l._getDefaultOptions = function () {
    return (0, o.extend)(e.prototype._getDefaultOptions.call(this), {
      onClick: null,
      onCaptionClick: null,
      type: "normal",
      stylingMode: "outlined",
      text: ""
    });
  };
  l._defaultOptionsRules = function () {
    return e.prototype._defaultOptionsRules.call(this).concat([{
      device: function () {
        return (0, s.isMaterial)();
      },
      options: {
        type: "default",
        stylingMode: "text"
      }
    }]);
  };
  l._init = function () {
    e.prototype._init.call(this);
    this._initActions();
  };
  l._initActions = function () {
    this._clickAction = this._createActionByOption("onClick");
    this._captionClickAction = this._createActionByOption("onCaptionClick");
  };
  l._initMarkup = function () {
    e.prototype._initMarkup.call(this);
    this.$element().addClass("dx-calendar-navigator");
    this._renderButtons();
    this._renderCaption();
  };
  l._renderButtons = function () {
    var e = this;
    var t = this.option();
    var n = t.rtlEnabled;
    var o = t.type;
    var a = t.stylingMode;
    this._prevButton = this._createComponent((0, i.default)("<div>"), r.default, {
      focusStateEnabled: false,
      icon: n ? "chevronright" : "chevronleft",
      onClick: function (t) {
        e._clickAction({
          direction: -1,
          event: t
        });
      },
      type: o,
      stylingMode: a,
      integrationOptions: {}
    });
    var s = this._prevButton.$element().addClass("dx-calendar-navigator-previous-view").addClass("dx-calendar-navigator-previous-month");
    this._nextButton = this._createComponent((0, i.default)("<div>"), r.default, {
      focusStateEnabled: false,
      icon: n ? "chevronleft" : "chevronright",
      onClick: function (t) {
        e._clickAction({
          direction: 1,
          event: t
        });
      },
      type: o,
      stylingMode: a,
      integrationOptions: {}
    });
    var l = this._nextButton.$element().addClass("dx-calendar-navigator-next-view").addClass("dx-calendar-navigator-next-month");
    this._caption = this._createComponent((0, i.default)("<div>").addClass("dx-calendar-caption-button"), r.default, {
      focusStateEnabled: false,
      onClick: function (t) {
        e._captionClickAction({
          event: t
        });
      },
      type: o,
      stylingMode: a,
      template: function (t, n) {
        e.option().text.split(" - ").forEach(function (e) {
          (0, i.default)(n).append((0, i.default)("<span>").addClass("dx-button-text").text(e));
        });
      },
      integrationOptions: {}
    });
    var u = this._caption.$element();
    this.$element().append(s, u, l);
  };
  l._renderCaption = function () {
    this._caption.option("text", this.option("text"));
  };
  l.toggleButton = function (e, t) {
    var n = this["_" + e + "Button"];
    if (n) {
      n.option("disabled", t);
      n.$element().toggleClass("dx-calendar-disabled-navigator-link", t);
    }
  };
  l._optionChanged = function (t) {
    switch (t.name) {
      case "text":
        this._renderCaption();
        break;
      default:
        e.prototype._optionChanged.call(this, t);
    }
  };
  return a;
}(a.default);
exports.default = d;
module.exports = exports.default;
module.exports.default = exports.default;