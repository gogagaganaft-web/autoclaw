exports.convertToLocation = function (e, t) {
  if ((0, i.isPlainObject)(e)) {
    var n = (0, o.ensureDefined)(e.left, e.x);
    var r = (0, o.ensureDefined)(e.top, e.y);
    return {
      left: (0, i.isDefined)(n) ? n : undefined,
      top: (0, i.isDefined)(r) ? r : undefined
    };
  }
  var s = new a.ScrollDirection(t);
  var l = s.isHorizontal;
  var u = s.isVertical;
  return {
    left: l && (0, i.isDefined)(e) ? e : undefined,
    top: u && (0, i.isDefined)(e) ? e : undefined
  };
};
var i = require("./35922.js");
var o = require("./20576.js");
var a = require("./60440.js");