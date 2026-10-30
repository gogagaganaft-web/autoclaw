exports.sessionStorage = undefined;
var i = (0, require("./58201.js").getWindow)();
exports.sessionStorage = function () {
  var e;
  try {
    e = i.sessionStorage;
  } catch (e) {}
  return e;
};