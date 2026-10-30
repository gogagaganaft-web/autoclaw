exports.default = undefined;
var i = require("./19157.js");
var o = {
  logarithmic: "logarithmic",
  discrete: "discrete",
  numeric: "numeric",
  left: "left",
  right: "right",
  top: "top",
  bottom: "bottom",
  center: "center",
  horizontal: "horizontal",
  vertical: "vertical",
  convertTicksToValues: function (e) {
    return (0, i.map)(e || [], function (e) {
      return e.value;
    });
  },
  validateOverlappingMode: function (e) {
    if (e === "ignore" || e === "none") {
      return e;
    } else {
      return "hide";
    }
  },
  getTicksCountInRange: function (e, t, n) {
    var i = 1;
    if (e.length > 1) {
      for (; i < e.length && !(Math.abs(e[i].coords[t] - e[0].coords[t]) >= n); i++);
    }
    return i;
  },
  areLabelsOverlap: function (e, t, n, i) {
    var o = e.x > t.x;
    var a = e.y > t.y;
    var r = e.x;
    var s = t.x;
    var l = e.width;
    var u = t.width;
    if (i === "left") {
      r += l / 2;
      s += u / 2;
    } else if (i === "right") {
      r -= l / 2;
      s -= u / 2;
    }
    var d = o ? s + u + n > r : r + l + n > s;
    var c = a ? t.y + t.height > e.y : e.y + e.height > t.y;
    return d && c;
  }
};
exports.default = o;
module.exports = exports.default;
module.exports.default = exports.default;