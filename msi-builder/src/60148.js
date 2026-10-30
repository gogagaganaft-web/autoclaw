exports.getQuill = function () {
  if (!o.default) {
    throw i.default.Error("E1041", "Quill");
  }
  return o.default;
};
var i = a(require("./96688.js"));
var o = a(require("./9549.js"));
function a(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}