exports.default = undefined;
var i = require("./60642.js");
function o(e) {
  var t = e.items;
  var n = (0, i.buildSidesData)(e.rect, e.directions, e.isRotated ? 1 : 0);
  (0, i.calculateRectangles)(t, 0, e.rect, n, {
    sum: e.sum,
    count: t.length,
    side: n.variedSide
  });
}
(0, i.addAlgorithm)("sliceanddice", o);
var a = o;
exports.default = a;
module.exports = exports.default;
module.exports.default = exports.default;