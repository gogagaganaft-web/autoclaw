var i;
function o(e, t) {
  return (o = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (e, t) {
    e.__proto__ = t;
    return e;
  })(e, t);
}
exports.GridPagerWrapper = undefined;
var a = function (e) {
  var t;
  var n;
  function i() {
    return e.apply(this, arguments) || this;
  }
  n = e;
  (t = i).prototype = Object.create(n.prototype);
  t.prototype.constructor = t;
  o(t, n);
  i.prototype._optionChanged = function (t) {
    switch (t.name) {
      case "pageIndex":
        var n = this.option("pageIndexChanged");
        if (n) {
          n(t.value);
        }
        break;
      case "pageSize":
        var i = this.option("pageSizeChanged");
        if (i) {
          i(t.value);
        }
    }
    e.prototype._optionChanged.call(this, t);
  };
  return i;
}(((i = require("./27135.js")) && i.__esModule ? i : {
  default: i
}).default);
exports.GridPagerWrapper = a;