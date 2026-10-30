exports.animation = undefined;
var i;
var o = (i = require("./87209.js")) && i.__esModule ? i : {
  default: i
};
var a = require("./78008.js");
var r = {
  moveTo: function (e) {
    var t;
    var n = e.$element;
    var i = e.position;
    var a = {};
    switch (e.direction || "left") {
      case "right":
        a.transform = "translate(" + i + "px, 0px)";
        t = "custom";
        break;
      case "left":
        a.left = i;
        t = "slide";
        break;
      case "top":
      case "bottom":
        a.top = i;
        t = "slide";
    }
    o.default.animate(n, {
      type: t,
      to: a,
      duration: e.duration,
      complete: e.complete
    });
  },
  margin: function (e) {
    var t = e.$element;
    var n = e.margin;
    var i = e.direction || "left";
    var r = {
      ["margin" + (0, a.camelize)(i, true)]: n
    };
    o.default.animate(t, {
      to: r,
      duration: e.duration,
      complete: e.complete
    });
  },
  fade: function (e, t, n, i) {
    o.default.animate(e, {
      type: "fade",
      to: t.to,
      from: t.from,
      duration: n,
      complete: i
    });
  },
  size: function (e) {
    var t = e.$element;
    var n = e.size;
    var i = e.direction || "left";
    var a = e.marginTop || 0;
    var r = e.duration;
    var s = {};
    if (i === "right" || i === "left") {
      s.width = n;
    } else {
      s.height = n;
    }
    if (i === "bottom") {
      s.marginTop = a;
    }
    o.default.animate(t, {
      to: s,
      duration: r,
      complete: e.complete
    });
  },
  complete: function (e) {
    o.default.stop(e, true);
  }
};
exports.animation = r;