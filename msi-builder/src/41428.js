exports.default = undefined;
var i = u(require("./16135.js"));
var o = require("./18438.js");
var a = require("./95479.js");
var r = require("./35922.js");
var s = require("./62754.js");
var l = u(require("./35042.js"));
function u(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
var d = function e(t, n, u) {
  u = u || [];
  n = n || {};
  function d(e, t) {
    return {
      name: e,
      args: t
    };
  }
  function c(e) {
    var c;
    var h;
    var f;
    var p;
    var g;
    var m;
    var _;
    var v = new s.Deferred();
    function y(e) {
      var t = n.errorHandler;
      if (t) {
        t(e);
      }
      (0, o.handleError)(e);
      v.reject(e);
    }
    function b(e) {
      switch (e.name) {
        case "sortBy":
          g = [e.args];
          return true;
        case "thenBy":
          if (!g) {
            throw o.errors.Error("E4004");
          }
          g.push(e.args);
          return true;
      }
      return false;
    }
    try {
      c = n.adapter;
      if (!(0, r.isFunction)(c)) {
        c = i.default[c];
      }
      h = c(n);
      f = [].concat(u).concat(e);
      var x = h.optimize;
      for (x && x(f); f.length;) {
        if (!b(p = f[0])) {
          if (g) {
            f.unshift(d("multiSort", [g]));
            g = null;
            continue;
          }
          if (String(p.name) !== "enumerate" && (!h[p.name] || h[p.name].apply(h, p.args) === false)) {
            break;
          }
        }
        f.shift();
      }
      m = f[0];
      _ = [];
      if (m && m.name === "multiSort") {
        f.shift();
        (0, a.each)(m.args[0], function () {
          _.push(d(_.length ? "thenBy" : "sortBy", this));
        });
      }
      f = _.concat(f);
      h.exec(t).done(function (e, t) {
        if (f.length) {
          var i = (0, l.default)(e, {
            errorHandler: n.errorHandler
          });
          (0, a.each)(f, function () {
            i = i[this.name].apply(i, this.args);
          });
          i.done(v.resolve).fail(v.reject);
        } else {
          v.resolve(e, t);
        }
      }).fail(y);
    } catch (e) {
      y(e);
    }
    return v.promise();
  }
  var h = {};
  (0, a.each)(["sortBy", "thenBy", "filter", "slice", "select", "groupBy"], function () {
    var i = String(this);
    h[i] = function () {
      return e(t, n, u.concat(d(i, arguments)));
    };
  });
  (0, a.each)(["count", "min", "max", "sum", "avg", "aggregate", "enumerate"], function () {
    var e = String(this);
    h[e] = function () {
      return c.call(this, d(e, arguments));
    };
  });
  return h;
};
exports.default = d;
module.exports = exports.default;
module.exports.default = exports.default;