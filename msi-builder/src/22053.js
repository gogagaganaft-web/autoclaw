exports.animation = exports._translator = undefined;
var i;
var o = (i = require("./87209.js")) && i.__esModule ? i : {
  default: i
};
var a = require("./31648.js");
var r = {
  move: function (e, t) {
    (0, a.move)(e, {
      left: t
    });
  }
};
exports._translator = r;
var s = {
  moveTo: function (e, t, n, i) {
    o.default.animate(e, {
      type: "slide",
      to: {
        left: t
      },
      duration: n,
      complete: i
    });
  },
  complete: function (e) {
    o.default.stop(e, true);
  }
};
exports.animation = s;