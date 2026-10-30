exports.default = undefined;
var i;
var o = require("./13306.js");
var a = (i = require("./17381.js")) && i.__esModule ? i : {
  default: i
};
var r = {
  rtlEnabled: false,
  defaultCurrency: "USD",
  defaultUseCurrencyAccountingStyle: true,
  oDataFilterToLower: true,
  serverDecimalSeparator: ".",
  decimalSeparator: ".",
  thousandsSeparator: ",",
  forceIsoDateParsing: true,
  wrapActionsBeforeExecute: true,
  useLegacyStoreResult: false,
  useJQuery: undefined,
  editorStylingMode: undefined,
  useLegacyVisibleIndex: false,
  floatingActionButtonConfig: {
    icon: "add",
    closeIcon: "close",
    label: "",
    position: {
      at: "right bottom",
      my: "right bottom",
      offset: {
        x: -16,
        y: -16
      }
    },
    maxSpeedDialActionCount: 5,
    shading: false,
    direction: "auto"
  },
  optionsParser: function (e) {
    if (e.trim().charAt(0) !== "{") {
      e = "{" + e + "}";
    }
    try {
      return JSON.parse(e);
    } catch (t) {
      try {
        return JSON.parse(s(e));
      } catch (n) {
        throw a.default.Error("E3018", t, e);
      }
    }
  }
};
function s(e) {
  return e.replace(/'/g, "\"").replace(/,\s*([\]}])/g, "$1").replace(/([{,])\s*([^":\s]+)\s*:/g, "$1\"$2\":");
}
var l = ["decimalSeparator", "thousandsSeparator"];
function u() {
  if (!arguments.length) {
    return r;
  }
  var e = arguments.length <= 0 ? undefined : arguments[0];
  l.forEach(function (t) {
    if (e[t]) {
      var n = `Now, the ${t} is selected based on the specified locale.`;
      a.default.log("W0003", "config", t, "19.2", n);
    }
  });
  (0, o.extend)(r, e);
}
if (typeof MSI != "undefined" && MSI.config) {
  u(MSI.config);
}
var d = u;
exports.default = d;
module.exports = exports.default;
module.exports.default = exports.default;