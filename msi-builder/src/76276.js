exports.default = undefined;
var i = a(require("./91198.js"));
var o = a(require("./48452.js"));
function a(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
function r(e) {
  return function (e) {
    if (Array.isArray(e)) {
      return u(e);
    }
  }(e) || function (e) {
    if (typeof Symbol != "undefined" && e[Symbol.iterator] != null || e["@@iterator"] != null) {
      return Array.from(e);
    }
  }(e) || l(e) || function () {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }();
}
function s(e, t) {
  return function (e) {
    if (Array.isArray(e)) {
      return e;
    }
  }(e) || function (e, t) {
    var n = e == null ? null : typeof Symbol != "undefined" && e[Symbol.iterator] || e["@@iterator"];
    if (n != null) {
      var i;
      var o;
      var a;
      var r;
      var s = [];
      var l = true;
      var u = false;
      try {
        a = (n = n.call(e)).next;
        if (t === 0) {
          if (Object(n) !== n) {
            return;
          }
          l = false;
        } else {
          for (; !(l = (i = a.call(n)).done) && (s.push(i.value), s.length !== t); l = true);
        }
      } catch (e) {
        u = true;
        o = e;
      } finally {
        try {
          if (!l && n.return != null && (r = n.return(), Object(r) !== r)) {
            return;
          }
        } finally {
          if (u) {
            throw o;
          }
        }
      }
      return s;
    }
  }(e, t) || l(e, t) || function () {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }();
}
function l(e, t) {
  if (e) {
    if (typeof e == "string") {
      return u(e, t);
    }
    var n = Object.prototype.toString.call(e).slice(8, -1);
    if (n === "Object" && e.constructor) {
      n = e.constructor.name;
    }
    if (n === "Map" || n === "Set") {
      return Array.from(e);
    } else if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) {
      return u(e, t);
    } else {
      return undefined;
    }
  }
}
function u(e, t) {
  if (t == null || t > e.length) {
    t = e.length;
  }
  for (var n = 0, i = new Array(t); n < t; n++) {
    i[n] = e[n];
  }
  return i;
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
  function o(t) {
    var n;
    (n = e.call(this, t) || this).NAME = "RangeSelection";
    return n;
  }
  n = e;
  (t = o).prototype = Object.create(n.prototype);
  t.prototype.constructor = t;
  d(t, n);
  var a = o.prototype;
  a.getViewOptions = function () {
    var e = this._getValues();
    return {
      value: e,
      range: this._getDaysInRange(e[0], e[1]),
      selectionMode: "range",
      onCellHover: this._cellHoverHandler.bind(this)
    };
  };
  a.selectValue = function (e, t) {
    var n = s(this._getValues(), 2);
    var i = n[0];
    var o = n[1];
    this.skipNavigate();
    this._updateCurrentDate(e);
    this._currentDateChanged = true;
    if (this.calendar.option("_allowChangeSelectionOrder") === true) {
      this.calendar._valueSelected = true;
      if (this.calendar.option("_currentSelection") === "startDate") {
        if (this.calendar._convertToDate(e) > this.calendar._convertToDate(o)) {
          this.dateValue([e, null], t);
        } else {
          this.dateValue([e, o], t);
        }
      } else if (this.calendar._convertToDate(e) >= this.calendar._convertToDate(i)) {
        this.dateValue([i, e], t);
      } else {
        this.dateValue([e, null], t);
      }
    } else if (!i || o) {
      this.dateValue([e, null], t);
    } else {
      this.dateValue(i < e ? [i, e] : [e, i], t);
    }
  };
  a.updateAriaSelected = function (t, n) {
    var i;
    var o;
    if ((i = t) === null || i === undefined) {
      t = this._getValues();
    }
    if ((o = n) === null || o === undefined) {
      n = [];
    }
    e.prototype.updateAriaSelected.call(this, t, n);
  };
  a.processValueChanged = function (t, n) {
    e.prototype.processValueChanged.call(this, t, n);
    var i = this._getRange();
    this._updateViewsOption("range", i);
  };
  a.getDefaultCurrentDate = function () {
    var e = this.calendar.option();
    var t = e._allowChangeSelectionOrder;
    var n = e._currentSelection;
    var i = this.dateOption("values");
    if (t) {
      if (n === "startDate" && i[0]) {
        return i[0];
      }
      if (n === "endDate" && i[1]) {
        return i[1];
      }
    }
    var o = i.filter(function (e) {
      return e;
    });
    return this._getLowestDateInArray(o);
  };
  a._getValues = function () {
    var e = this.dateOption("values");
    if (!e.length) {
      return e;
    }
    var t = s(e, 2);
    var n = t[0];
    var i = t[1];
    if (n && i && n > i) {
      var o = [i, n];
      n = o[0];
      i = o[1];
    }
    return [n, i];
  };
  a._getRange = function () {
    var e = s(this._getValues(), 2);
    var t = e[0];
    var n = e[1];
    return this._getDaysInRange(t, n);
  };
  a._getDaysInRange = function (e, t) {
    if (!e || !t) {
      return [];
    }
    var n = this.calendar.option("currentDate").getTime();
    var o = new Date(Math.max(n - 10368000000, e));
    var a = new Date(Math.min(n + 10368000000, t));
    return [].concat(r(i.default.getDatesOfInterval(o, a, 86400000)), [a]);
  };
  a._cellHoverHandler = function (e) {
    var t = this._isMaxZoomLevel();
    var n = s(this._getValues(), 2);
    var i = n[0];
    var o = n[1];
    var a = this.calendar.option();
    var r = a._allowChangeSelectionOrder;
    var l = a._currentSelection;
    if (t) {
      if (!i || o || r && l === "startDate") {
        if (i || !o || r && l === "endDate") {
          if (i && o) {
            if (l === "startDate" && e.value < i) {
              this._updateViewsOption("hoveredRange", this._getDaysInRange(e.value, i));
              return;
            }
            if (l === "endDate" && e.value > o) {
              this._updateViewsOption("hoveredRange", this._getDaysInRange(o, e.value));
              return;
            }
          }
        } else if (e.value < o) {
          this._updateViewsOption("hoveredRange", this._getDaysInRange(e.value, o));
          return;
        }
      } else if (e.value > i) {
        this._updateViewsOption("hoveredRange", this._getDaysInRange(i, e.value));
        return;
      }
      this._updateViewsOption("hoveredRange", []);
    }
  };
  return o;
}(o.default);
exports.default = c;
module.exports = exports.default;
module.exports.default = exports.default;