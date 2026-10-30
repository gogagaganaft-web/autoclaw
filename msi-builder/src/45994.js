exports.getClosestNodeWithKoCreation = exports.getClosestNodeWithContext = undefined;
var i = a(require("./76130.js"));
var o = a(require("./68374.js"));
function a(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
exports.getClosestNodeWithContext = function e(t) {
  if (!i.default.contextFor(t) && t.parentNode) {
    return e(t.parentNode);
  } else {
    return t;
  }
};
exports.getClosestNodeWithKoCreation = function e(t) {
  var n = (0, o.default)(t).data();
  if (n && n.dxKoCreation) {
    return t;
  } else if (t.parentNode) {
    return e(t.parentNode);
  } else {
    return null;
  }
};