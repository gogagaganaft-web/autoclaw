exports.default = undefined;
var i = s(require("./68374.js"));
var o = s(require("./5554.js"));
var a = s(require("./17381.js"));
var r = require("./9321.js");
function s(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
o.default.add(function (e, t) {
  i.default.fn[e] = function (n) {
    var i;
    var o = typeof n == "string";
    if (o) {
      var r = n;
      var s = [].slice.call(arguments).slice(1);
      this.each(function () {
        var n = t.getInstance(this);
        if (!n) {
          throw a.default.Error("E0009", e);
        }
        var o = n[r].apply(n, s);
        if (i === undefined) {
          i = o;
        }
      });
    } else {
      this.each(function () {
        var e = t.getInstance(this);
        if (e) {
          e.option(n);
        } else {
          new t(this, n);
        }
      });
      i = this;
    }
    return i;
  };
});
function l(e, t, n) {
  if (n) {
    t[e] = n;
  } else {
    n = t;
  }
  (0, r.name)(n, e);
  o.default.fire(e, n);
}
exports.default = l;
module.exports = exports.default;
module.exports.default = exports.default;