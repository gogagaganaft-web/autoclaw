exports.create = r;
exports.enqueue = undefined;
var i;
var o = (i = require("./17381.js")) && i.__esModule ? i : {
  default: i
};
var a = require("./62754.js");
function r(e) {
  var t = [];
  var n = false;
  function i() {
    while (t.length) {
      n = true;
      var e = t.shift()();
      if (e !== undefined) {
        if (e.then) {
          (0, a.when)(e).always(i);
          return;
        }
        throw o.default.Error("E0015");
      }
    }
    n = false;
  }
  return {
    add: function (o, a) {
      if (e) {
        if (t[0] && a) {
          a(t[0]);
        }
        t = [o];
      } else {
        t.push(o);
      }
      if (!n) {
        i();
      }
    },
    busy: function () {
      return n;
    }
  };
}
var s = r().add;
exports.enqueue = s;