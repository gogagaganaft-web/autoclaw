exports.default = undefined;
var i = h(require("./68374.js"));
var o = h(require("./96452.js"));
var a = h(require("./95251.js"));
var r = h(require("./91198.js"));
var s = require("./95479.js");
var l = require("./13306.js");
var u = h(require("./72309.js"));
var d = h(require("./99393.js"));
var c = h(require("./91500.js"));
function h(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
var f = "date";
var p = "year";
var g = "month";
var m = "day";
var _ = "hours";
var v = o.default.inherit({
  _valueOption: function () {
    var e = this.option("value");
    var t = new Date(e);
    if (!e || isNaN(t)) {
      return this._getDefaultDate();
    } else {
      return t;
    }
  },
  _getDefaultDate: function () {
    var e = new Date();
    if (this.option("type") === f) {
      return new Date(e.getFullYear(), e.getMonth(), e.getDate());
    } else {
      return e;
    }
  },
  _getDefaultOptions: function () {
    return (0, l.extend)(this.callBase(), {
      minDate: u.default.MIN_DATEVIEW_DEFAULT_DATE,
      maxDate: u.default.MAX_DATEVIEW_DEFAULT_DATE,
      type: f,
      value: new Date(),
      applyCompactClass: false
    });
  },
  _defaultOptionsRules: function () {
    return this.callBase().concat([{
      device: function (e) {
        return e.deviceType !== "desktop";
      },
      options: {
        applyCompactClass: true
      }
    }]);
  },
  _render: function () {
    this.callBase();
    this.$element().addClass("dx-dateview");
    this._toggleFormatClasses(this.option("type"));
    this._toggleCompactClass();
  },
  _toggleFormatClasses: function (e, t) {
    this.$element().addClass("dx-dateview-" + e);
    if (t) {
      this.$element().removeClass("dx-dateview-" + t);
    }
  },
  _toggleCompactClass: function () {
    this.$element().toggleClass("dx-dateview-compact", this.option("applyCompactClass"));
  },
  _wrapper: function () {
    return this._$wrapper;
  },
  _renderContentImpl: function () {
    this._$wrapper = (0, i.default)("<div>").addClass("dx-dateview-wrapper");
    this._renderRollers();
    this._$wrapper.appendTo(this.$element());
  },
  _renderRollers: function () {
    this._$rollersContainer ||= (0, i.default)("<div>").addClass("dx-dateview-rollers");
    this._$rollersContainer.empty();
    this._createRollerConfigs();
    this._rollers = {};
    var e = this;
    (0, s.each)(e._rollerConfigs, function (t) {
      var n = (0, i.default)("<div>").appendTo(e._$rollersContainer).addClass("dx-dateviewroller-" + e._rollerConfigs[t].type);
      e._rollers[e._rollerConfigs[t].type] = e._createComponent(n, a.default, {
        items: e._rollerConfigs[t].displayItems,
        selectedIndex: e._rollerConfigs[t].selectedIndex,
        showScrollbar: "never",
        scrollByContent: true,
        onStart: function (n) {
          var i = n.component;
          i._toggleActive(true);
          e._setActiveRoller(e._rollerConfigs[t], i.option("selectedIndex"));
        },
        onEnd: function (e) {
          e.component._toggleActive(false);
        },
        onClick: function (n) {
          var i = n.component;
          i._toggleActive(true);
          e._setActiveRoller(e._rollerConfigs[t], i.option("selectedIndex"));
          e._setRollerState(e._rollerConfigs[t], i.option("selectedIndex"));
          i._toggleActive(false);
        },
        onSelectedIndexChanged: function (n) {
          var i = n.component;
          e._setRollerState(e._rollerConfigs[t], i.option("selectedIndex"));
        }
      });
    });
    e._$rollersContainer.appendTo(e._wrapper());
  },
  _createRollerConfigs: function (e) {
    var t = this;
    e = e || t.option("type");
    t._rollerConfigs = {};
    c.default.getFormatParts(u.default.FORMATS_MAP[e]).forEach(function (e) {
      t._createRollerConfig(e);
    });
  },
  _createRollerConfig: function (e) {
    var t = u.default.DATE_COMPONENTS_INFO[e];
    var n = this._calculateRollerConfigValueRange(e);
    var i = n.startValue;
    for (var o = n.endValue, a = t.formatter, r = this._getCurrentDate(), s = {
        type: e,
        setValue: t.setter,
        valueItems: [],
        displayItems: [],
        getIndex: function (e) {
          return e[t.getter]() - i;
        }
      }, l = i; l <= o; l++) {
      s.valueItems.push(l);
      s.displayItems.push(a(l, r));
    }
    s.selectedIndex = s.getIndex(r);
    this._rollerConfigs[e] = s;
  },
  _setActiveRoller: function (e) {
    var t = e && this._rollers[e.type];
    (0, s.each)(this._rollers, function () {
      this.toggleActiveState(this === t);
    });
  },
  _updateRollersPosition: function () {
    var e = this;
    (0, s.each)(this._rollers, function (t) {
      var n = e._rollerConfigs[t].getIndex(e._getCurrentDate());
      this.option("selectedIndex", n);
    });
  },
  _setRollerState: function (e, t) {
    if (t !== e.selectedIndex) {
      var n = e.valueItems[t];
      var i = e.setValue;
      var o = new Date(this._getCurrentDate());
      var a = o.getDate();
      var s = this.option("minDate");
      var l = this.option("maxDate");
      if (e.type === g) {
        a = Math.min(a, u.default.getMaxMonthDay(o.getFullYear(), n));
      } else if (e.type === p) {
        a = Math.min(a, u.default.getMaxMonthDay(n, o.getMonth()));
      }
      o.setDate(a);
      o[i](n);
      var d = r.default.normalizeDate(o, s, l);
      o = u.default.mergeDates(d, o, "time");
      o = r.default.normalizeDate(o, s, l);
      this.option("value", o);
      e.selectedIndex = t;
    }
    if (e.type === p) {
      this._refreshRollers();
    }
    if (e.type === g) {
      this._refreshRoller(m);
      this._refreshRoller(_);
    }
  },
  _refreshRoller: function (e) {
    var t = this._rollers[e];
    if (t) {
      this._createRollerConfig(e);
      var n = this._rollerConfigs[e];
      if (e === m || n.displayItems.toString() !== t.option("items").toString()) {
        t.option({
          items: n.displayItems,
          selectedIndex: n.selectedIndex
        });
      }
    }
  },
  _getCurrentDate: function () {
    var e = this._valueOption();
    var t = this.option("minDate");
    var n = this.option("maxDate");
    return r.default.normalizeDate(e, t, n);
  },
  _calculateRollerConfigValueRange: function (e) {
    var t = this._getCurrentDate();
    var n = this.option("minDate");
    var i = this.option("maxDate");
    var o = r.default.sameYear(t, n);
    var a = o && t.getMonth() === n.getMonth();
    var s = r.default.sameYear(t, i);
    var l = s && t.getMonth() === i.getMonth();
    var d = a && t.getDate() === n.getDate();
    var c = l && t.getDate() === i.getDate();
    var h = u.default.DATE_COMPONENTS_INFO[e];
    var f = h.startValue;
    var v = h.endValue;
    if (e === p) {
      f = n.getFullYear();
      v = i.getFullYear();
    }
    if (e === g) {
      if (o) {
        f = n.getMonth();
      }
      if (s) {
        v = i.getMonth();
      }
    }
    if (e === m) {
      v = u.default.getMaxMonthDay(t.getFullYear(), t.getMonth());
      if (o && a) {
        f = n.getDate();
      }
      if (s && l) {
        v = i.getDate();
      }
    }
    if (e === _) {
      f = d ? n.getHours() : f;
      v = c ? i.getHours() : v;
    }
    return {
      startValue: f,
      endValue: v
    };
  },
  _refreshRollers: function () {
    this._refreshRoller(g);
    this._refreshRoller(m);
    this._refreshRoller(_);
  },
  _optionChanged: function (e) {
    switch (e.name) {
      case "minDate":
      case "maxDate":
      case "type":
        this._renderRollers();
        this._toggleFormatClasses(e.value, e.previousValue);
        break;
      case "visible":
        this.callBase(e);
        if (e.value) {
          this._renderRollers();
        }
        break;
      case "value":
        this.option("value", this._valueOption());
        this._refreshRollers();
        this._updateRollersPosition();
        break;
      default:
        this.callBase(e);
    }
  },
  _clean: function () {
    this.callBase();
    delete this._$rollersContainer;
  }
});
(0, d.default)("dxDateView", v);
var y = v;
exports.default = y;
module.exports = exports.default;
module.exports.default = exports.default;