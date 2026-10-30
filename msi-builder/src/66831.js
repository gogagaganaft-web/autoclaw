function i(e, t, n) {
  var i = t.createPalette(e.palette, {
    useHighlight: true,
    extensionMode: e.paletteExtensionMode,
    count: e.colorizeGroups ? r(n) : o(n)
  });
  return (e.colorizeGroups ? s : a)(i, n);
}
function o(e) {
  var t;
  var n;
  var i = e.nodes.slice();
  var a = i.length;
  var r = 0;
  for (t = 0; t < a; ++t) {
    if ((n = i[t]).isNode()) {
      r = Math.max(r, o(n));
    } else {
      r += 1;
    }
  }
  return r;
}
function a(e) {
  var t = e.generateColors();
  return function (e) {
    return t[e.index];
  };
}
function r(e) {
  var t;
  var n;
  var i = e.nodes.slice();
  var o = i.length;
  var a = 0;
  for (t = 0; t < o; ++t) {
    if ((n = i[t]).isNode()) {
      a += r(n) + 1;
    }
  }
  return a;
}
function s(e, t) {
  var n = function (e, t) {
    var n;
    var i;
    var o = {};
    var a = t.nodes.slice();
    var r = a.length;
    for (n = 0; n < r; ++n) {
      if ((i = a[n]).isNode()) {
        r = (a = a.concat(i.nodes)).length;
      } else {
        o[i.parent._id] ||= e.getNextColor();
      }
    }
    return o;
  }(e, t);
  return function (e) {
    return n[e._id];
  };
}
exports.default = undefined;
(0, require("./19910.js").addColorizer)("discrete", i);
var l = i;
exports.default = l;
module.exports = exports.default;
module.exports.default = exports.default;