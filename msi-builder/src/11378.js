exports.utils = exports.formatValue = exports.consts = exports.HEIGHT_COMPACT_MODE = undefined;
var i = require("./41583.js");
var o = require("./35922.js");
exports.HEIGHT_COMPACT_MODE = 24;
exports.utils = {
  trackerSettings: {
    fill: "grey",
    stroke: "grey",
    opacity: 0.0001
  },
  animationSettings: {
    duration: 250
  }
};
var a = {
  emptySliderMarkerText: ". . .",
  pointerSize: 4
};
exports.consts = a;
exports.formatValue = function (e, t, n, a, r, s) {
  var l = {
    value: e,
    valueText: (0, i.smartFormatter)(e, {
      labelOptions: t,
      ticks: n ? n.ticks : [],
      tickInterval: n ? n.tickInterval : undefined,
      dataType: a,
      type: r,
      logarithmBase: s
    })
  };
  return String((0, o.isFunction)(t.customizeText) ? t.customizeText.call(l, l) : l.valueText);
};