exports.default = undefined;
var i = require("./58664.js");
var o = r(require("./68374.js"));
var a = r(require("./72963.js"));
function r(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
function s(e, t) {
  return (s = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (e, t) {
    e.__proto__ = t;
    return e;
  })(e, t);
}
var l = function (e) {
  var t;
  var n;
  function a() {
    return e.apply(this, arguments) || this;
  }
  n = e;
  (t = a).prototype = Object.create(n.prototype);
  t.prototype.constructor = t;
  s(t, n);
  var r = a.prototype;
  r.renderShader = function () {
    var e = this._getShaderHeight();
    var t = this._getShaderMaxHeight();
    var n = e > t;
    if (e > t) {
      e = t;
    }
    (0, i.setHeight)(this._$shader, e);
    var o = this._workSpace._getGroupCount() || 1;
    if (this._workSpace.isGroupedByDate()) {
      this._renderGroupedByDateShaderParts(o, e, t, n);
    } else {
      this._renderShaderParts(o, e, t, n);
    }
  };
  r._renderShaderParts = function (e, t, n, i) {
    for (var o = 0; o < e; o++) {
      var a = this._getShaderWidth(o);
      this._renderTopShader(this._$shader, t, a, o);
      if (!i) {
        this._renderBottomShader(this._$shader, n, t, a, o);
      }
      this._renderAllDayShader(a, o);
    }
  };
  r._renderGroupedByDateShaderParts = function (e, t, n, i) {
    var o = this._getShaderWidth(0);
    var a = o - this._workSpace.getCellWidth();
    if (t < 0) {
      t = 0;
      a = o;
    }
    this._renderTopShader(this._$shader, t, o * e, 0);
    if (!i) {
      this._renderBottomShader(this._$shader, n, t, a * e + this._workSpace.getCellWidth(), 0);
    }
    this._renderAllDayShader(o * e, 0);
  };
  r._renderTopShader = function (e, t, n, a) {
    this._$topShader = (0, o.default)("<div>").addClass("dx-scheduler-date-time-shader-top");
    if (n) {
      (0, i.setWidth)(this._$topShader, n);
    }
    if (t) {
      (0, i.setHeight)(this._$topShader, t);
    }
    this._$topShader.css("marginTop", this._getShaderTopOffset(a));
    this._$topShader.css("left", this._getShaderOffset(a, n));
    e.append(this._$topShader);
  };
  r._renderBottomShader = function (e, t, n, a, r) {
    this._$bottomShader = (0, o.default)("<div>").addClass("dx-scheduler-date-time-shader-bottom");
    var s = n < 0 ? a : a - this._workSpace.getCellWidth();
    var l = n < 0 ? t : t - n;
    (0, i.setWidth)(this._$bottomShader, s);
    (0, i.setHeight)(this._$bottomShader, l);
    this._$bottomShader.css("left", this._getShaderOffset(r, a - this._workSpace.getCellWidth()));
    e.append(this._$bottomShader);
  };
  r._renderAllDayShader = function (e, t) {
    if (this._workSpace.option("showAllDayPanel")) {
      this._$allDayIndicator = (0, o.default)("<div>").addClass("dx-scheduler-date-time-shader-all-day");
      (0, i.setHeight)(this._$allDayIndicator, this._workSpace.getAllDayHeight());
      (0, i.setWidth)(this._$allDayIndicator, e);
      this._$allDayIndicator.css("left", this._getShaderOffset(t, e));
      this._workSpace._$allDayPanel.prepend(this._$allDayIndicator);
    }
  };
  r._getShaderOffset = function (e, t) {
    return this._workSpace.getGroupedStrategy().getShaderOffset(e, t);
  };
  r._getShaderTopOffset = function (e) {
    return this._workSpace.getGroupedStrategy().getShaderTopOffset(e);
  };
  r._getShaderHeight = function (e, t) {
    return this._workSpace.getGroupedStrategy().getShaderHeight();
  };
  r._getShaderMaxHeight = function (e, t) {
    return this._workSpace.getGroupedStrategy().getShaderMaxHeight();
  };
  r._getShaderWidth = function (e) {
    return this._workSpace.getGroupedStrategy().getShaderWidth(e);
  };
  r.clean = function () {
    e.prototype.clean.call(this);
    if (this._workSpace && this._workSpace._$allDayPanel) {
      this._workSpace._$allDayPanel.find(".dx-scheduler-date-time-shader-all-day").remove();
    }
  };
  return a;
}(a.default);
exports.default = l;
module.exports = exports.default;
module.exports.default = exports.default;