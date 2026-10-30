exports.default = function (e) {
  n.forEach(function (t) {
    e(t, function (e) {
      return function (e, t) {
        if (t[e] && !t.touches || !t.touches) {
          return t[e];
        }
        var n = t.touches.length ? t.touches : t.changedTouches;
        if (!n.length) {
          return;
        }
        return n[0][e];
      }(t, e);
    });
  }, this);
};
var n = ["pageX", "pageY", "screenX", "screenY", "clientX", "clientY"];
module.exports = exports.default;
module.exports.default = exports.default;