exports.splitByIndex = exports.getRealSeparatorIndex = exports.getNthOccurrence = exports.adjustPercentValue = undefined;
var i = require("./60810.js");
exports.getRealSeparatorIndex = function (e) {
  var t = 0;
  var n = 0;
  for (var i = 0; i < e.length; ++i) {
    if (e[i] === "'") {
      t++;
    }
    if (e[i] === "." && (++n, t % 2 == 0)) {
      return {
        occurrence: n,
        index: i
      };
    }
  }
  return {
    occurrence: 1,
    index: -1
  };
};
exports.getNthOccurrence = function (e, t, n) {
  for (var i = -1; n-- && i++ < e.length;) {
    i = e.indexOf(t, i);
  }
  return i;
};
exports.splitByIndex = function (e, t) {
  if (t === -1) {
    return [e];
  } else {
    return [e.slice(0, t), e.slice(t + 1)];
  }
};
exports.adjustPercentValue = function (e, t) {
  return e && (0, i.adjust)(e / 100, t);
};