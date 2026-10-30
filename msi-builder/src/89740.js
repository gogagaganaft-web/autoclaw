exports.default = undefined;
var i = require("./13306.js");
var o = {
  _formatNumberCore: function (e, t, n) {
    if (t === "currency") {
      n.precision = n.precision || 0;
      var o = this.format(e, (0, i.extend)({}, n, {
        type: "fixedpoint"
      }));
      var a = this.getCurrencySymbol().symbol.replace(/\$/g, "$$$$");
      return o = o.replace(/^(\D*)(\d.*)/, "$1" + a + "$2");
    }
    return this.callBase.apply(this, arguments);
  },
  getCurrencySymbol: function () {
    return {
      symbol: "$"
    };
  },
  getOpenXmlCurrencyFormat: function () {
    return "$#,##0{0}_);\\($#,##0{0}\\)";
  }
};
exports.default = o;
module.exports = exports.default;
module.exports.default = exports.default;