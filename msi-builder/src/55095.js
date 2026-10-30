var i;
function o() {
  return (o = Object.assign ? Object.assign.bind() : function (e) {
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
function a(e, t) {
  return (a = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (e, t) {
    e.__proto__ = t;
    return e;
  })(e, t);
}
exports.GroupPanelWrapper = undefined;
var r = function (e) {
  var t;
  var n;
  function i() {
    return e.apply(this, arguments) || this;
  }
  n = e;
  (t = i).prototype = Object.create(n.prototype);
  t.prototype.constructor = t;
  a(t, n);
  i.prototype._setOptionsByReference = function () {
    e.prototype._setOptionsByReference.call(this);
    this._optionsByReference = o({}, this._optionsByReference, {
      resourceCellTemplate: true
    });
  };
  return i;
}(((i = require("./27135.js")) && i.__esModule ? i : {
  default: i
}).default);
exports.GroupPanelWrapper = r;