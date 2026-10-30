var i;
function o(e, t) {
  return (o = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (e, t) {
    e.__proto__ = t;
    return e;
  })(e, t);
}
exports.default = undefined;
var a = function (e) {
  var t;
  var n;
  function i(t) {
    var n;
    (n = e.call(this, t) || this).NAME = "SingleSelection";
    return n;
  }
  n = e;
  (t = i).prototype = Object.create(n.prototype);
  t.prototype.constructor = t;
  o(t, n);
  var a = i.prototype;
  a.getViewOptions = function () {
    return {
      value: this.dateOption("value"),
      range: [],
      selectionMode: "single"
    };
  };
  a.selectValue = function (e, t) {
    this.skipNavigate();
    this.dateValue(e, t);
  };
  a.updateAriaSelected = function (t, n) {
    var i;
    var o;
    if ((i = t) === null || i === undefined) {
      t = [this.dateOption("value")];
    }
    if ((o = n) === null || o === undefined) {
      n = [];
    }
    e.prototype.updateAriaSelected.call(this, t, n);
  };
  a.getDefaultCurrentDate = function () {
    return this.dateOption("value");
  };
  a._updateViewsValue = function (e) {
    this._updateViewsOption("value", e[0]);
  };
  return i;
}(((i = require("./48452.js")) && i.__esModule ? i : {
  default: i
}).default);
exports.default = a;
module.exports = exports.default;
module.exports.default = exports.default;