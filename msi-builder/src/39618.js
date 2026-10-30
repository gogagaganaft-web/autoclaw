exports.default = undefined;
function n(e) {
  var t;
  function n() {
    t = e.apply(this, arguments);
    n = function () {
      return t;
    };
    return t;
  }
  return function () {
    return n.apply(this, arguments);
  };
}
exports.default = n;
module.exports = exports.default;
module.exports.default = exports.default;