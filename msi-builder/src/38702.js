exports.default = undefined;
var i = s(require("./80209.js"));
var o = s(require("./91331.js"));
var a = s(require("./44592.js"));
var r = s(require("./71868.js"));
function s(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
var l = ["standard", "accounting"];
var u = /([^\s0]+)?(\s*)0*[.,]*0*(\s*)([^\s0]+)?/;
var d = {};
function c(e) {
  var t = o.default.locale() + "/" + JSON.stringify(e);
  d[t] ||= new Intl.NumberFormat(o.default.locale(), e).format;
  return d[t];
}
var h = {
  engine: function () {
    return "intl";
  },
  _formatNumberCore: function (e, t, n) {
    if (t === "exponential") {
      return this.callBase.apply(this, arguments);
    } else {
      return c(this._normalizeFormatConfig(t, n, e))(e);
    }
  },
  _normalizeFormatConfig: function (e, t, n) {
    var o;
    if (e === "decimal") {
      var a = String(n).split(".")[1];
      o = {
        minimumIntegerDigits: t.precision || undefined,
        useGrouping: false,
        maximumFractionDigits: a && a.length,
        round: n < 0 ? "ceil" : "floor"
      };
    } else {
      o = this._getPrecisionConfig(t.precision);
    }
    if (e === "percent") {
      o.style = "percent";
    } else if (e === "currency") {
      var s = t.useCurrencyAccountingStyle ?? (0, i.default)().defaultUseCurrencyAccountingStyle;
      o.style = "currency";
      o.currency = t.currency || (0, i.default)().defaultCurrency;
      o.currencySign = l[+s];
    }
    return o;
  },
  _getPrecisionConfig: function (e) {
    if (e === null) {
      return {
        minimumFractionDigits: 0,
        maximumFractionDigits: 20
      };
    } else {
      return {
        minimumFractionDigits: e || 0,
        maximumFractionDigits: e || 0
      };
    }
  },
  format: function (e, t) {
    if (typeof e != "number") {
      return e;
    } else {
      if ((t = this._normalizeFormat(t)).currency === "default") {
        t.currency = (0, i.default)().defaultCurrency;
      }
      if (t && (typeof t == "function" || t.type || t.formatter)) {
        return this.callBase.apply(this, arguments);
      } else {
        return c(t)(e);
      }
    }
  },
  _getCurrencySymbolInfo: function (e) {
    var t = function (e) {
      return new Intl.NumberFormat(o.default.locale(), {
        style: "currency",
        currency: e
      });
    }(e);
    return this._extractCurrencySymbolInfo(t.format(0));
  },
  _extractCurrencySymbolInfo: function (e) {
    var t = u.exec(e) || [];
    return {
      position: t[1] ? "before" : "after",
      symbol: t[1] || t[4] || "",
      delimiter: t[2] || t[3] || ""
    };
  },
  getCurrencySymbol: function (e) {
    e ||= (0, i.default)().defaultCurrency;
    return {
      symbol: this._getCurrencySymbolInfo(e).symbol
    };
  },
  getOpenXmlCurrencyFormat: function (e) {
    var t = e || (0, i.default)().defaultCurrency;
    var n = this._getCurrencySymbolInfo(t).symbol;
    var s = o.default.getValueByClosestLocale(function (e) {
      return r.default[e];
    });
    return (0, a.default)(n, s);
  }
};
exports.default = h;
module.exports = exports.default;
module.exports.default = exports.default;