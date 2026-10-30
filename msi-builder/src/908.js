require("./74872.js");
var i = r(require("./71272.js"));
var o = r(require("./18016.js"));
var a = r(require("./17381.js"));
function r(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
function s(e) {
  return (s = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function (e) {
    return typeof e;
  } : function (e) {
    if (e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype) {
      return "symbol";
    } else {
      return typeof e;
    }
  })(e);
}
require("./71272.js");
if (i.default && i.default.formatNumber) {
  if (i.default.locale().locale === "en") {
    i.default.locale("en");
  }
  var l = {};
  function u(e) {
    var t;
    var n;
    n = s(e) === "object" ? i.default.locale().locale + ":" + JSON.stringify(e) : i.default.locale().locale + ":" + e;
    if (!(t = l[n])) {
      t = l[n] = i.default.numberFormatter(e);
    }
    return t;
  }
  var d = {
    engine: function () {
      return "globalize";
    },
    _formatNumberCore: function (e, t, n) {
      if (t === "exponential") {
        return this.callBase.apply(this, arguments);
      } else {
        return u(this._normalizeFormatConfig(t, n, e))(e);
      }
    },
    _normalizeFormatConfig: function (e, t, n) {
      var i;
      i = e === "decimal" ? {
        minimumIntegerDigits: t.precision || 1,
        useGrouping: false,
        minimumFractionDigits: 0,
        maximumFractionDigits: 20,
        round: n < 0 ? "ceil" : "floor"
      } : this._getPrecisionConfig(t.precision);
      if (e === "percent") {
        i.style = "percent";
      }
      return i;
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
      } else if ((t = this._normalizeFormat(t)) && (typeof t == "function" || t.type || t.formatter)) {
        return this.callBase.apply(this, arguments);
      } else {
        return u(t)(e);
      }
    },
    parse: function (e, t) {
      if (e) {
        if (t && (t.parser || typeof t == "string")) {
          return this.callBase.apply(this, arguments);
        }
        if (t) {
          a.default.log("W0011");
        }
        var n = i.default.parseNumber(e);
        if (isNaN(n)) {
          n = this.callBase.apply(this, arguments);
        }
        return n;
      }
    }
  };
  o.default.resetInjection();
  o.default.inject(d);
}