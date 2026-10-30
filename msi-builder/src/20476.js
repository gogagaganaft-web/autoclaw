exports.default = function (e) {
  var t = s.default.inherit(e);
  var n = t;
  var i = new n(e);
  var l = {};
  function u(t, n) {
    (0, r.each)(t, function (t) {
      if ((0, a.isFunction)(i[t])) {
        if (!!n || !e[t]) {
          e[t] = function () {
            return i[t].apply(e, arguments);
          };
        }
      } else {
        if (n) {
          l[t] = e[t];
        }
        e[t] = i[t];
      }
    });
  }
  u(e, true);
  e.inject = function (e) {
    n = n.inherit(e);
    i = new n();
    u(e);
  };
  e.resetInjection = function () {
    (0, o.extend)(e, l);
    n = t;
    i = new t();
  };
  return e;
};
var i;
var o = require("./13306.js");
var a = require("./35922.js");
var r = require("./95479.js");
var s = (i = require("./38377.js")) && i.__esModule ? i : {
  default: i
};
module.exports = exports.default;
module.exports.default = exports.default;