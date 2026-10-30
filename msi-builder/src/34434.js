exports.prepareSegmentRectPoints = undefined;
Object.defineProperty(exports, "refreshPaths", {
  enumerable: true,
  get: function () {
    return i.refreshPaths;
  }
});
var i = require("./56453.js");
var o = require("./95479.js");
exports.prepareSegmentRectPoints = function (e, t, n, i, a) {
  var r;
  var s = ~~((n < i ? n : i) / 2);
  var l = a.width || 0;
  var u = l < s ? l : s;
  var d = (e += u / 2) + (n -= u);
  var c = (t += u / 2) + (i -= u);
  var h = [];
  var f = [];
  var p = 0;
  var g = 0;
  var m = {
    top: [[e, t], [d, t]],
    right: [[d, t], [d, c]],
    bottom: [[d, c], [e, c]],
    left: [[e, c], [e, t]]
  };
  (0, o.each)(m, function (e) {
    var t = !!a[e];
    p = p * 2 + ~~t;
  });
  switch (p) {
    case 13:
    case 9:
      r = ["left", "top", "right", "bottom"];
      break;
    case 11:
      r = ["bottom", "left", "top", "right"];
      break;
    default:
      r = ["top", "right", "bottom", "left"];
  }
  (0, o.each)(r, function (e, t) {
    var n = !!a[t];
    if (!g && f.length) {
      h.push(f);
      f = [];
    }
    if (n) {
      (0, o.each)(m[t].slice(g), function (e, t) {
        f = f.concat(t);
      });
    }
    g = ~~n;
  });
  if (f.length) {
    h.push(f);
  }
  if (h.length === 1) {
    h = h[0];
  }
  return {
    points: h,
    pathType: p === 15 ? "area" : "line"
  };
};