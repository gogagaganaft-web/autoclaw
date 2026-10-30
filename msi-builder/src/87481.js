var i = r(require("./96073.js"));
var o = r(require("./5554.js"));
var a = r(require("./17381.js"));
function r(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
if (i.default) {
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
}