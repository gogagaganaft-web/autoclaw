exports.processDisplayFormat = function (e, t) {
  var n = e;
  var i = true;
  while (i) {
    var a = n.indexOf("{");
    var r = n.indexOf("}");
    if (a >= 0 && r > 0) {
      var s = o(n.substring(a + 1, r), t);
      n = n.substr(0, a) + s + n.substr(r + 1);
    } else {
      i = false;
    }
  }
  return n;
};
var i = require("./94484.js");
function o(e, t) {
  var n = "";
  var o = e.indexOf(":");
  if (o > 0) {
    n = e.substr(o + 1);
    e = e.substr(0, o);
  }
  return function (e, t) {
    if (t) {
      if (e instanceof Date) {
        return (0, i.formatDate)(e, t);
      }
      if (typeof e == "number") {
        return (0, i.formatNumber)(e, t);
      }
    }
    return e;
  }(t[e], n);
}