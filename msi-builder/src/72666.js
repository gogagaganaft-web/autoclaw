exports.createOnSplitMultiPageRow = undefined;
var i = require("./79262.js");
function o() {
  return (o = Object.assign ? Object.assign.bind() : function (e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var i in n) {
        if (Object.prototype.hasOwnProperty.call(n, i)) {
          e[i] = n[i];
        }
      }
    }
    return e;
  }).apply(this, arguments);
}
function a(e, t, n) {
  return o({}, e, {
    sourceCellInfo: o({}, e.sourceCellInfo, {
      text: t
    }),
    y: n
  });
}
exports.createOnSplitMultiPageRow = function (e, t, n, o) {
  return function (r, s) {
    var l = [];
    var u = [];
    var d = 0;
    var c = 0;
    s.forEach(function (s) {
      var h = s.w;
      var f = s.sourceCellInfo;
      var p = !r && t.repeatHeaders ? n : n + t.topLeft.y;
      var g = (0, i.getTextDimensions)(e, f.text, f.font).h;
      var m = f.padding.top + f.padding.bottom;
      var _ = o.y - p - m - t.margin.top;
      var v = Math.floor(_ / (g * e.getLineHeightFactor()));
      var y = (0, i.getTextLines)(e, f.text, f.font, {
        wordWrapEnabled: f.wordWrapEnabled,
        targetRectWidth: h
      });
      if (v < y.length) {
        var b = y.slice(0, v).join("\n");
        var x = (0, i.calculateTextHeight)(e, b, f.font, {
          wordWrapEnabled: f.wordWrapEnabled,
          targetRectWidth: h
        });
        d = Math.max(d, x + m);
        c = s.h - x;
        l.push(a(s, b, t.margin.top));
        u.push(a(s, y.slice(v).join("\n"), t.margin.top));
      } else {
        var w = (0, i.calculateTextHeight)(e, f.text, f.font, {
          wordWrapEnabled: f.wordWrapEnabled,
          targetRectWidth: h
        });
        d = Math.max(d, w + m);
        c = Math.max(c, w + m);
        l.push(a(s, f.text, t.margin.top));
        u.push(a(s, "", t.margin.top));
      }
    });
    l.forEach(function (e) {
      return e.h = d;
    });
    u.forEach(function (e) {
      return e.h = c;
    });
    return [l, u];
  };
};