exports.default = undefined;
exports.default = function (e, t) {
  var n = e[t];
  if (n) {
    return n !== "root" && n;
  } else {
    return t.substr(0, t.lastIndexOf("-"));
  }
};
module.exports = exports.default;
module.exports.default = exports.default;