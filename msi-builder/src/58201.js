exports.setWindow = exports.hasWindow = exports.hasProperty = exports.getWindow = exports.getNavigator = exports.getCurrentScreenFactor = exports.defaultScreenFactorFunc = undefined;
var i;
var o = (i = require("./73349.js")) && i.__esModule ? i : {
  default: i
};
var a = typeof window != "undefined";
function r() {
  return a;
}
exports.hasWindow = r;
var s = r() ? window : undefined;
if (!s) {
  (s = {}).window = s;
}
exports.getWindow = function () {
  return s;
};
exports.setWindow = function (e, t) {
  a = t === undefined ? typeof window != "undefined" && window === e : t;
  s = e;
};
exports.hasProperty = function (e) {
  return r() && e in s;
};
function l(e) {
  if (e < 768) {
    return "xs";
  } else if (e < 992) {
    return "sm";
  } else if (e < 1200) {
    return "md";
  } else {
    return "lg";
  }
}
exports.defaultScreenFactorFunc = l;
exports.getCurrentScreenFactor = function (e) {
  return (e || l)(o.default.getDocumentElement().clientWidth);
};
exports.getNavigator = function () {
  if (r()) {
    return s.navigator;
  } else {
    return {
      userAgent: ""
    };
  }
};