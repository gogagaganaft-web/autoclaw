exports.resolveRtlEnabled = function (e, t) {
  if (e !== undefined) {
    return e;
  }
  if ((t == null ? undefined : t.rtlEnabled) !== undefined) {
    return t.rtlEnabled;
  }
  return (0, a.default)().rtlEnabled;
};
exports.resolveRtlEnabledDefinition = function (e, t) {
  var n = (0, o.isDefined)(e);
  var i = (0, o.isDefined)((0, a.default)().rtlEnabled) && !n && !(0, o.isDefined)(t == null ? undefined : t.rtlEnabled);
  return n && e !== (t == null ? undefined : t.rtlEnabled) || i;
};
var i;
var o = require("./35922.js");
var a = (i = require("./80209.js")) && i.__esModule ? i : {
  default: i
};