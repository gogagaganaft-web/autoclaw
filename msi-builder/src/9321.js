exports.attachInstanceToElement = function (e, t, n) {
  var i = (0, o.data)(e.get(0));
  var r = d(t.constructor);
  i[r] = t;
  if (n) {
    a.default.one(e, s.removeEvent, function () {
      n.call(t);
    });
  }
  i.dxComponents ||= [];
  i.dxComponents.push(r);
};
exports.getInstanceByElement = function (e, t) {
  var n = d(t);
  return (0, o.data)(e.get(0), n);
};
exports.name = undefined;
var i;
var o = require("./97906.js");
var a = (i = require("./55994.js")) && i.__esModule ? i : {
  default: i
};
var r = require("./35922.js");
var s = require("./29007.js");
var l = new WeakMap();
var u = 0;
function d(e, t) {
  if (!(0, r.isDefined)(t)) {
    if (!l.has(e)) {
      var n = "dxPrivateComponent" + u++;
      l.set(e, n);
      return n;
    }
    return l.get(e);
  }
  l.set(e, t);
}
exports.name = d;