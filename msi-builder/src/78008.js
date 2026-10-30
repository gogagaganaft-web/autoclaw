exports.underscore = exports.titleize = exports.humanize = exports.dasherize = exports.captionize = exports.camelize = undefined;
var i = require("./95479.js");
function o(e) {
  if (e == null) {
    return "";
  } else {
    return String(e);
  }
}
function a(e) {
  return o(e).charAt(0).toUpperCase() + e.substr(1);
}
function r(e) {
  return o(e).replace(/([a-z\d])([A-Z])/g, "$1 $2").split(/[\s_-]+/);
}
function s(e) {
  return (0, i.map)(r(e), function (e) {
    return e.toLowerCase();
  }).join("-");
}
exports.dasherize = s;
exports.underscore = function (e) {
  return s(e).replace(/-/g, "_");
};
exports.camelize = function (e, t) {
  return (0, i.map)(r(e), function (e, n) {
    e = e.toLowerCase();
    if (t || n > 0) {
      e = a(e);
    }
    return e;
  }).join("");
};
exports.humanize = function (e) {
  return a(s(e).replace(/-/g, " "));
};
exports.titleize = function (e) {
  return (0, i.map)(r(e), function (e) {
    return a(e.toLowerCase());
  }).join(" ");
};
var l = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
exports.captionize = function (e) {
  var t;
  var n;
  var i = [];
  var o = false;
  var a = false;
  for (t = 0; t < e.length; t++) {
    a = (n = e.charAt(t)) === n.toUpperCase() && n !== "-" && n !== ")" && n !== "/" || n in l;
    if (n === "_" || n === ".") {
      n = " ";
      a = true;
    } else if (t === 0) {
      n = n.toUpperCase();
      a = true;
    } else if (!o && a && i.length > 0) {
      i.push(" ");
    }
    i.push(n);
    o = a;
  }
  return i.join("");
};