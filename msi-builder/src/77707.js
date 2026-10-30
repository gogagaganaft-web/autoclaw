exports.buildRectAppearance = function (e) {
  var t = e.border || {};
  return {
    fill: e.color,
    opacity: e.opacity,
    stroke: t.color,
    "stroke-width": t.width,
    "stroke-opacity": t.opacity,
    hatching: e.hatching
  };
};
exports.buildTextAppearance = function (e, t) {
  return {
    attr: {
      filter: t
    },
    css: (0, i.patchFontOptions)(e.font)
  };
};
var i = require("./19157.js");