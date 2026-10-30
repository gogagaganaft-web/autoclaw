Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UiGridCoreFocusUtils = undefined;
var i;
var o = (i = require("./69434.js")) && i.__esModule ? i : {
  default: i
};
var a = require("./35922.js");
var r = {
  getSortFilterValue: function (e, t, n) {
    var i = n.isRemoteFiltering;
    var r = n.dateSerializationFormat;
    var s = n.getSelector;
    var l = e.selector;
    var u = (0, a.isFunction)(l) ? l : s(l);
    var d = u ? u(t) : t[l];
    return {
      getter: u,
      rawValue: d,
      safeValue: i && (0, a.isDate)(d) ? o.default.serializeDate(d, r) : d
    };
  }
};
exports.UiGridCoreFocusUtils = r;