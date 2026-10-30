exports.default = undefined;
var i = h(require("./68374.js"));
var o = h(require("./96452.js"));
var a = h(require("./34171.js"));
var r = h(require("./78665.js"));
var s = h(require("./55551.js"));
var l = require("./13306.js");
var u = h(require("./99393.js"));
var d = h(require("./91500.js"));
var c = h(require("./72309.js"));
function h(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
function f(e, t, n) {
  p(e, t, n);
}
function p(e, t, n) {
  e.css("transform", "rotate(" + t + "deg) translate(0," + n + "px)");
}
var g = o.default.inherit({
  _getDefaultOptions: function () {
    return (0, l.extend)(this.callBase(), {
      value: new Date(Date.now()),
      use24HourFormat: true,
      _showClock: true,
      _arrowOffset: 5,
      stylingMode: undefined
    });
  },
  _getValue: function () {
    return this.option("value") || new Date();
  },
  _init: function () {
    this.callBase();
    this.$element().addClass("dx-timeview");
  },
  _render: function () {
    this.callBase();
    this._renderBox();
    this._updateTime();
  },
  _renderBox: function () {
    var e = (0, i.default)("<div>").appendTo(this.$element());
    var t = [];
    if (this.option("_showClock")) {
      t.push({
        ratio: 1,
        shrink: 0,
        baseSize: "auto",
        template: this._renderClock.bind(this)
      });
    }
    t.push({
      ratio: 0,
      shrink: 0,
      baseSize: "auto",
      template: this._renderField.bind(this)
    });
    this._createComponent(e, s.default, {
      height: "100%",
      width: "100%",
      direction: "col",
      items: t
    });
  },
  _renderClock: function (e, t, n) {
    this._$hourArrow = (0, i.default)("<div>").addClass("dx-timeview-hourarrow");
    this._$minuteArrow = (0, i.default)("<div>").addClass("dx-timeview-minutearrow");
    var o = (0, i.default)(n);
    o.addClass("dx-timeview-clock").append(this._$hourArrow).append(this._$minuteArrow);
    this.setAria("role", "presentation", o);
  },
  _updateClock: function () {
    var e = this._getValue();
    var t = e.getHours() / 12 * 360 + e.getMinutes() / 60 * 30;
    var n = e.getMinutes() / 60 * 360;
    f(this._$hourArrow, t, this.option("_arrowOffset"));
    f(this._$minuteArrow, n, this.option("_arrowOffset"));
  },
  _getBoxItems: function (e) {
    var t = this;
    var n = [{
      ratio: 0,
      shrink: 0,
      baseSize: "auto",
      template: function () {
        return t._hourBox.$element();
      }
    }, {
      ratio: 0,
      shrink: 0,
      baseSize: "auto",
      template: (0, i.default)("<div>").addClass("dx-timeview-time-separator").text(d.default.getTimeSeparator())
    }, {
      ratio: 0,
      shrink: 0,
      baseSize: "auto",
      template: function () {
        return t._minuteBox.$element();
      }
    }];
    if (e) {
      n.push({
        ratio: 0,
        shrink: 0,
        baseSize: "auto",
        template: function () {
          return t._format12.$element();
        }
      });
    }
    return n;
  },
  _renderField: function () {
    var e = !this.option("use24HourFormat");
    this._createHourBox(e);
    this._createMinuteBox();
    if (e) {
      this._createFormat12Box();
    }
    return this._createComponent((0, i.default)("<div>").addClass("dx-timeview-field"), s.default, {
      direction: "row",
      align: "center",
      crossAlign: "center",
      items: this._getBoxItems(e)
    }).$element();
  },
  _createHourBox: function (e) {
    var t = this;
    (this._hourBox = this._createComponent((0, i.default)("<div>"), a.default, (0, l.extend)({
      min: -1,
      max: e ? 13 : 24,
      value: this._getValue().getHours(),
      onValueChanged: this._onHourBoxValueChanged.bind(this),
      onKeyboardHandled: function (e) {
        return t._keyboardHandler(e);
      }
    }, this._getNumberBoxConfig()))).setAria("label", "hours");
  },
  _isPM: function () {
    return !this.option("use24HourFormat") && this._format12.option("value") === 1;
  },
  _onHourBoxValueChanged: function (e) {
    var t = e.value;
    var n = e.component;
    var i = this._getValue();
    var o = new Date(i);
    var a = this._convertMaxHourToMin(t);
    n.option("value", a);
    if (this._isPM()) {
      a += 12;
    }
    o.setHours(a);
    c.default.normalizeTime(o);
    this.option("value", o);
  },
  _convertMaxHourToMin: function (e) {
    var t = this.option("use24HourFormat") ? 24 : 12;
    return (t + e) % t;
  },
  _createMinuteBox: function () {
    var e = this;
    (this._minuteBox = this._createComponent((0, i.default)("<div>"), a.default, (0, l.extend)({
      min: -1,
      max: 60,
      value: this._getValue().getMinutes(),
      onKeyboardHandled: function (t) {
        return e._keyboardHandler(t);
      },
      onValueChanged: function (t) {
        var n = (60 + t.value) % 60;
        t.component.option("value", n);
        var i = new Date(e._getValue());
        i.setMinutes(n);
        c.default.normalizeTime(i);
        e.option("value", i);
      }
    }, this._getNumberBoxConfig()))).setAria("label", "minutes");
  },
  _createFormat12Box: function () {
    var e = this;
    var t = d.default.getPeriodNames();
    (this._format12 = this._createComponent((0, i.default)("<div>").addClass("dx-timeview-format12"), r.default, {
      items: [{
        value: -1,
        text: t[0]
      }, {
        value: 1,
        text: t[1]
      }],
      valueExpr: "value",
      displayExpr: "text",
      onKeyboardHandled: function (t) {
        return e._keyboardHandler(t);
      },
      onValueChanged: function (t) {
        var n = t.value;
        var i = e._getValue().getHours();
        var o = new Date(e._getValue());
        var a = (i + n * 12) % 24;
        o.setHours(a);
        e.option("value", o);
      },
      value: this._getValue().getHours() >= 12 ? 1 : -1,
      stylingMode: this.option("stylingMode")
    })).setAria("label", "type");
  },
  _refreshFormat12: function () {
    if (!this.option("use24HourFormat")) {
      var e = this._getValue().getHours() >= 12 ? 1 : -1;
      this._silentEditorValueUpdate(this._format12, e);
    }
  },
  _silentEditorValueUpdate: function (e, t) {
    if (e) {
      e._suppressValueChangeAction();
      e.option("value", t);
      e._resumeValueChangeAction();
    }
  },
  _getNumberBoxConfig: function () {
    return {
      showSpinButtons: true,
      displayValueFormatter: function (e) {
        return (e < 10 ? "0" : "") + e;
      },
      stylingMode: this.option("stylingMode")
    };
  },
  _normalizeHours: function (e) {
    if (this.option("use24HourFormat")) {
      return e;
    } else {
      return e % 12 || 12;
    }
  },
  _updateField: function () {
    var e = this._normalizeHours(this._getValue().getHours());
    this._silentEditorValueUpdate(this._hourBox, e);
    this._silentEditorValueUpdate(this._minuteBox, this._getValue().getMinutes());
    this._refreshFormat12();
  },
  _updateTime: function () {
    if (this.option("_showClock")) {
      this._updateClock();
    }
    this._updateField();
  },
  _visibilityChanged: function (e) {
    if (e) {
      this._updateTime();
    }
  },
  _optionChanged: function (e) {
    switch (e.name) {
      case "value":
        this._updateTime();
        this.callBase(e);
        break;
      case "_arrowOffset":
        break;
      case "use24HourFormat":
      case "_showClock":
      case "stylingMode":
        this._invalidate();
        break;
      default:
        this.callBase(e);
    }
  }
});
(0, u.default)("dxTimeView", g);
var m = g;
exports.default = m;
module.exports = exports.default;
module.exports.default = exports.default;