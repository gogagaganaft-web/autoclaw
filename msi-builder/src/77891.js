exports.toggleDisplay = exports.createVisibilityGroup = exports.createTracker = undefined;
exports.createTracker = function (e, t) {
  return e.g().attr({
    stroke: "none",
    "stroke-width": 0,
    fill: "#000000",
    opacity: 0.0001
  }).css({
    cursor: "pointer"
  }).append(t);
};
exports.createVisibilityGroup = function (e, t, n = "") {
  return e.g().attr({
    class: n
  }).append(t);
};
exports.toggleDisplay = function (e, t) {
  var n = t ? {
    display: "block"
  } : {
    display: "none"
  };
  e.map(function (e) {
    return e.css(n);
  });
};