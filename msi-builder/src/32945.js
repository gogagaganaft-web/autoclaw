exports.measureLabels = exports.calculateCanvasMargins = undefined;
var n = Math.max;
exports.calculateCanvasMargins = function (e, t) {
  var i = t.left;
  var o = t.top;
  var a = t.width - t.right;
  var r = t.height - t.bottom;
  return e.reduce(function (e, t) {
    if (!t || t.isEmpty) {
      return e;
    } else {
      return {
        left: n(e.left, i - t.x),
        top: n(e.top, o - t.y),
        right: n(e.right, t.x + t.width - a),
        bottom: n(e.bottom, t.y + t.height - r)
      };
    }
  }, {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0
  });
};
exports.measureLabels = function (e) {
  e.forEach(function (e) {
    var t = e.getContentContainer();
    e.labelBBox = t ? t.getBBox() : {
      x: 0,
      y: 0,
      width: 0,
      height: 0
    };
  });
};