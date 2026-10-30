exports.removeEvent = undefined;
var i = s(require("./68374.js"));
var o = require("./97906.js");
var a = s(require("./55994.js"));
var r = s(require("./85788.js"));
function s(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
exports.removeEvent = "dxremove";
(0, o.beforeCleanData)(function (e) {
  e = [].slice.call(e);
  for (var t = 0; t < e.length; t++) {
    var n = (0, i.default)(e[t]);
    if (n.prop("dxRemoveEvent")) {
      n[0].dxRemoveEvent = null;
      a.default.triggerHandler(n, "dxremove");
    }
  }
});
(0, r.default)("dxremove", {
  noBubble: true,
  setup: function (e) {
    (0, i.default)(e).prop("dxRemoveEvent", true);
  }
});