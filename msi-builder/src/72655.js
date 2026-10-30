exports.default = undefined;
var i;
var o = (i = require("./22955.js")) && i.__esModule ? i : {
  default: i
};
var a = require("./45985.js");
function r() {
  return (r = Object.assign ? Object.assign.bind() : function (e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var i in n) {
        if (Object.prototype.hasOwnProperty.call(n, i)) {
          e[i] = n[i];
        }
      }
    }
    return e;
  }).apply(this, arguments);
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
  function i() {
    return e.apply(this, arguments) || this;
  }
  n = e;
  (t = i).prototype = Object.create(n.prototype);
  t.prototype.constructor = t;
  s(t, n);
  var o = i.prototype;
  o._getFormat = function () {
    return a.formatWeekdayAndDay;
  };
  o.generateRenderOptions = function () {
    return r({}, e.prototype.generateRenderOptions.call(this), {
      isGenerateTimePanelData: true
    });
  };
  o._isRenderHeaderPanelEmptyCell = function () {
    return true;
  };
  return i;
}(o.default);
exports.default = l;
module.exports = exports.default;
module.exports.default = exports.default;