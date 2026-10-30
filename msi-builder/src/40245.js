exports.register = function (e, t, n) {
  var a = o;
  var r = {
    [e]: a[e] ? a[e] : {}
  };
  r[e][t] = n;
  (0, i.extend)(a, r);
};
exports.registry = undefined;
var i = require("./13306.js");
var o = {};
exports.registry = o;