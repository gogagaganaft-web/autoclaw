exports.unsubscribeNodesDisposing = exports.subscribeNodesDisposing = undefined;
var i;
var o = (i = require("./55994.js")) && i.__esModule ? i : {
  default: i
};
var a = require("./29007.js");
function r(e) {
  return e && [e.target, e.delegateTarget, e.relatedTarget, e.currentTarget].filter(function (e) {
    return !!e;
  });
}
exports.subscribeNodesDisposing = function (e, t) {
  o.default.one(r(e), a.removeEvent, t);
};
exports.unsubscribeNodesDisposing = function (e, t) {
  o.default.off(r(e), a.removeEvent, t);
};