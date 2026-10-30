function n(e) {
  return function (e) {
    if (Array.isArray(e)) {
      return i(e);
    }
  }(e) || function (e) {
    if (typeof Symbol != "undefined" && e[Symbol.iterator] != null || e["@@iterator"] != null) {
      return Array.from(e);
    }
  }(e) || function (e, t) {
    if (!e) {
      return;
    }
    if (typeof e == "string") {
      return i(e, t);
    }
    var n = Object.prototype.toString.call(e).slice(8, -1);
    if (n === "Object" && e.constructor) {
      n = e.constructor.name;
    }
    if (n === "Map" || n === "Set") {
      return Array.from(e);
    }
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) {
      return i(e, t);
    }
  }(e) || function () {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }();
}
function i(e, t) {
  if (t == null || t > e.length) {
    t = e.length;
  }
  for (var n = 0, i = new Array(t); n < t; n++) {
    i[n] = e[n];
  }
  return i;
}
exports.default = undefined;
var o = function () {
  function e(e) {
    this.calendar = e;
  }
  var t = e.prototype;
  t.dateOption = function (e) {
    return this.calendar._dateOption(e);
  };
  t.dateValue = function (e, t) {
    this.calendar._dateValue(e, t);
  };
  t.skipNavigate = function () {
    this.calendar._skipNavigate = true;
  };
  t.updateAriaSelected = function (e, t) {
    this.calendar._updateAriaSelected(e, t);
    if (e[0] && this.calendar.option("currentDate").getTime() === e[0].getTime()) {
      this.calendar._updateAriaId(e[0]);
    }
  };
  t.processValueChanged = function (e, t) {
    var n;
    var i;
    var o = this;
    e = ((n = e) === null || n === undefined ? undefined : n.map(function (e) {
      return o._convertToDate(e);
    })) || [];
    t = ((i = t) === null || i === undefined ? undefined : i.map(function (e) {
      return o._convertToDate(e);
    })) || [];
    this._updateViewsValue(e);
    this.updateAriaSelected(e, t);
    if (!this._currentDateChanged) {
      this.calendar._initCurrentDate();
    }
    this._currentDateChanged = false;
  };
  t._getLowestDateInArray = function (e) {
    if (e.length) {
      return new Date(Math.min.apply(Math, n(e)));
    }
  };
  t._convertToDate = function (e) {
    return this.calendar._convertToDate(e);
  };
  t._isMaxZoomLevel = function () {
    return this.calendar._isMaxZoomLevel();
  };
  t._updateViewsOption = function (e, t) {
    this.calendar._updateViewsOption(e, t);
  };
  t._updateViewsValue = function (e) {
    this._updateViewsOption("value", e);
  };
  t._updateCurrentDate = function (e) {
    this.calendar.option("currentDate", e ?? new Date());
  };
  return e;
}();
exports.default = o;
module.exports = exports.default;
module.exports.default = exports.default;