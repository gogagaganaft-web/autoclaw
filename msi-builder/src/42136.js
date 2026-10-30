exports.getElementMargin = function (e, t) {
  var n = r(e);
  if (n) {
    return (0, a.toNumber)(n[`margin${(0, i.titleize)(t)}`]);
  } else {
    return 0;
  }
};
exports.getElementOverflowX = function (e) {
  var t = r(e);
  if (t) {
    return t.overflowX;
  } else {
    return "visible";
  }
};
exports.getElementOverflowY = function (e) {
  var t = r(e);
  if (t) {
    return t.overflowY;
  } else {
    return "visible";
  }
};
exports.getElementPadding = function (e, t) {
  var n = r(e);
  if (n) {
    return (0, a.toNumber)(n[`padding${(0, i.titleize)(t)}`]);
  } else {
    return 0;
  }
};
exports.getElementStyle = r;
exports.getElementTransform = function (e) {
  var t = r(e);
  if (t) {
    return t.transform;
  } else {
    return "";
  }
};
var i = require("./78008.js");
var o = require("./58201.js");
var a = require("./78461.js");
function r(e) {
  var t;
  var n;
  if (e && (0, o.hasWindow)()) {
    if ((t = (n = (0, o.getWindow)()).getComputedStyle) === null || t === undefined) {
      return undefined;
    } else {
      return t.call(n, e);
    }
  } else {
    return null;
  }
}