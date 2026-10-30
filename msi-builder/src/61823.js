var i;
var o = (i = require("./76130.js")) && i.__esModule ? i : {
  default: i
};
var a = require("./58020.js");
var r = require("./97906.js");
if (o.default) {
  r.strategyChanging.add(function (e) {
    if (!!e.fn && (0, a.compare)(e.fn.jquery, [2, 0]) < 0) {
      (function (e) {
        function t(e, t) {
          function n() {
            o.default.cleanNode(this);
          }
          if (t) {
            e.each(n);
          } else {
            e.find("*").each(n);
          }
        }
        var n = e.fn.empty;
        e.fn.empty = function () {
          t(this, false);
          return n.apply(this, arguments);
        };
        var i = e.fn.remove;
        e.fn.remove = function (e, n) {
          if (!n) {
            var o = this;
            if (e) {
              o = o.filter(e);
            }
            t(o, true);
          }
          return i.call(this, e, n);
        };
        var a = e.fn.html;
        e.fn.html = function (e) {
          if (typeof e == "string") {
            t(this, false);
          }
          return a.apply(this, arguments);
        };
        var r = e.fn.replaceWith;
        e.fn.replaceWith = function () {
          var e = r.apply(this, arguments);
          if (!this.parent().length) {
            t(this, true);
          }
          return e;
        };
      })(e);
    }
  });
}