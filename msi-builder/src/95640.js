exports.default = function (e, t) {
  var n = {
    ERROR_MESSAGES: (0, i.extend)(t, e),
    Error: function () {
      return d([].slice.call(arguments));
    },
    log: function (e) {
      var t = "log";
      if (/^E\d+$/.test(e)) {
        t = "error";
      } else if (/^W\d+$/.test(e)) {
        t = "warn";
      }
      o.logger[t](t === "log" ? e : s([].slice.call(arguments)));
    }
  };
  function s(e) {
    var t = e[0];
    return u(t, l(t, e = e.slice(1)));
  }
  function l(e, t) {
    t = [n.ERROR_MESSAGES[e]].concat(t);
    return a.format.apply(this, t).replace(/\.*\s*?$/, "");
  }
  function u(e, t) {
    return a.format.apply(this, ["{0} - {1}. See:\n{2}", e, t, c(e)]);
  }
  function d(e) {
    var t = e[0];
    var n = l(t, e = e.slice(1));
    var o = c(t);
    var a = u(t, n);
    return (0, i.extend)(new Error(a), {
      __id: t,
      __details: n,
      url: o
    });
  }
  function c(e) {
    return r + e;
  }
  return n;
};
var i = require("./13306.js");
var o = require("./30869.js");
var a = require("./68752.js");
var r = "http://sp.kaesbt.ru/error/" + require("./36739.js").version.split(".").slice(0, 2).join("_") + "/";
module.exports = exports.default;
module.exports.default = exports.default;