var i = s(require("./44592.js"));
require("./74872.js");
require("./908.js");
require("./89740.js");
require("./71272.js");
var o = s(require("./71272.js"));
var a = s(require("./80209.js"));
var r = s(require("./18016.js"));
function s(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
function l(e) {
  return (l = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function (e) {
    return typeof e;
  } : function (e) {
    if (e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype) {
      return "symbol";
    } else {
      return typeof e;
    }
  })(e);
}
var u = ["symbol", "accounting"];
if (o.default && o.default.formatCurrency) {
  if (o.default.locale().locale === "en") {
    o.default.locale("en");
  }
  var d = {};
  function c(e, t) {
    var n;
    var i;
    i = l(t) === "object" ? o.default.locale().locale + ":" + e + ":" + JSON.stringify(t) : o.default.locale().locale + ":" + e + ":" + t;
    if (!(n = d[i])) {
      n = d[i] = o.default.currencyFormatter(e, t);
    }
    return n;
  }
  var h = {
    _formatNumberCore: function (e, t, n) {
      if (t === "currency") {
        var i = n && n.currency || (0, a.default)().defaultCurrency;
        return c(i, this._normalizeFormatConfig(t, n, e))(e);
      }
      return this.callBase.apply(this, arguments);
    },
    _normalizeFormatConfig: function (e, t, n) {
      var i = this.callBase(e, t, n);
      if (e === "currency") {
        var r = t.useCurrencyAccountingStyle ?? (0, a.default)().defaultUseCurrencyAccountingStyle;
        i.style = u[+r];
      }
      return i;
    },
    format: function (e, t) {
      if (typeof e != "number") {
        return e;
      }
      if (t = this._normalizeFormat(t)) {
        if (t.currency === "default") {
          t.currency = (0, a.default)().defaultCurrency;
        }
        if (t.type === "currency") {
          return this._formatNumber(e, this._parseNumberFormatString("currency"), t);
        }
        if (!t.type && t.currency) {
          return c(t.currency, t)(e);
        }
      }
      return this.callBase.apply(this, arguments);
    },
    getCurrencySymbol: function (e) {
      e ||= (0, a.default)().defaultCurrency;
      return o.default.cldr.main("numbers/currencies/" + e);
    },
    getOpenXmlCurrencyFormat: function (e) {
      var t = this.getCurrencySymbol(e).symbol;
      var n = o.default.cldr.main("numbers/currencyFormats-numberSystem-latn").accounting;
      return (0, i.default)(t, n);
    }
  };
  r.default.inject(h);
}