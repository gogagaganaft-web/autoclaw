var i;
function o(e) {
  return function (e) {
    if (Array.isArray(e)) {
      return a(e);
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
      return a(e, t);
    }
    var n = Object.prototype.toString.call(e).slice(8, -1);
    if (n === "Object" && e.constructor) {
      n = e.constructor.name;
    }
    if (n === "Map" || n === "Set") {
      return Array.from(e);
    }
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) {
      return a(e, t);
    }
  }(e) || function () {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }();
}
function a(e, t) {
  if (t == null || t > e.length) {
    t = e.length;
  }
  for (var n = 0, i = new Array(t); n < t; n++) {
    i[n] = e[n];
  }
  return i;
}
function r(e, t) {
  return (r = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (e, t) {
    e.__proto__ = t;
    return e;
  })(e, t);
}
exports.default = undefined;
var s = function (e) {
  var t;
  var n;
  function i(t) {
    var n;
    (n = e.call(this, t) || this).NAME = "MultiSelection";
    return n;
  }
  n = e;
  (t = i).prototype = Object.create(n.prototype);
  t.prototype.constructor = t;
  r(t, n);
  var a = i.prototype;
  a.getViewOptions = function () {
    return {
      value: this.dateOption("values"),
      range: [],
      selectionMode: "multi"
    };
  };
  a.selectValue = function (e, t) {
    var n = o(this.dateOption("values"));
    var i = n.findIndex(function (t) {
      return (t == null ? undefined : t.toDateString()) === e.toDateString();
    });
    if (i > -1) {
      n.splice(i, 1);
    } else {
      n.push(e);
    }
    this.skipNavigate();
    this._updateCurrentDate(e);
    this._currentDateChanged = true;
    this.dateValue(n, t);
  };
  a.updateAriaSelected = function (t, n) {
    var i;
    var o;
    if ((i = t) === null || i === undefined) {
      t = this.dateOption("values");
    }
    if ((o = n) === null || o === undefined) {
      n = [];
    }
    e.prototype.updateAriaSelected.call(this, t, n);
  };
  a.getDefaultCurrentDate = function () {
    var e = this.dateOption("values").filter(function (e) {
      return e;
    });
    return this._getLowestDateInArray(e);
  };
  return i;
}(((i = require("./48452.js")) && i.__esModule ? i : {
  default: i
}).default);
exports.default = s;
module.exports = exports.default;
module.exports.default = exports.default;