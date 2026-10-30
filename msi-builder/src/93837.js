exports.default = undefined;
var i;
var o = require("./58664.js");
var a = require("./37518.js");
function r(e, t) {
  return (r = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (e, t) {
    e.__proto__ = t;
    return e;
  })(e, t);
}
var s = function (e) {
  var t;
  var n;
  function i() {
    return e.apply(this, arguments) || this;
  }
  n = e;
  (t = i).prototype = Object.create(n.prototype);
  t.prototype.constructor = t;
  r(t, n);
  var s = i.prototype;
  s.renderShader = function () {
    for (var e = this._workSpace._isHorizontalGroupedWorkSpace() ? this._workSpace._getGroupCount() : 1, t = 0; t < e; t++) {
      var n = t === 0;
      var i = n ? this._$shader : this.createShader();
      if (this._workSpace.isGroupedByDate()) {
        this._customizeGroupedByDateShader(i, t);
      } else {
        this._customizeShader(i, t);
      }
      if (!n) {
        this._shader.push(i);
      }
    }
  };
  s._customizeShader = function (e, t) {
    var n = this._workSpace.getIndicationWidth();
    this._applyShaderWidth(e, n);
    if (t >= 1) {
      var i = this._workSpace;
      var o = i._getCellCount() * i.getCellWidth();
      e.css("left", o);
    } else {
      e.css("left", 0);
    }
  };
  s._applyShaderWidth = function (e, t) {
    var n = (0, a.getBoundingRect)(this._$container.get(0)).width;
    if (t > n) {
      t = n;
    }
    if (t > 0) {
      (0, o.setWidth)(e, t);
    }
  };
  s._customizeGroupedByDateShader = function (e, t) {
    var n;
    var i = this._workSpace.getIndicationCellCount();
    var o = Math.floor(i);
    var a = i - o;
    var r = t === 0;
    var s = this._workSpace;
    var l = r ? s.getIndicationWidth() : a * s.getCellWidth();
    this._applyShaderWidth(e, l);
    n = r ? s._getCellCount() * s.getCellWidth() * t : s.getCellWidth() * o * s._getGroupCount() + t * s.getCellWidth();
    e.css("left", n);
  };
  return i;
}(((i = require("./72963.js")) && i.__esModule ? i : {
  default: i
}).default);
exports.default = s;
module.exports = exports.default;
module.exports.default = exports.default;