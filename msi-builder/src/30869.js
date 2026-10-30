exports.logger = exports.debug = undefined;
var i = require("./35922.js");
function o() {}
function a(e) {
  if (typeof console != "undefined" && (0, i.isFunction)(console[e])) {
    return console[e].bind(console);
  } else {
    return o;
  }
}
var r = {
  log: a("log"),
  info: a("info"),
  warn: a("warn"),
  error: a("error")
};
exports.logger = r;
var s = function () {
  function e(e, t) {
    if (!e) {
      throw new Error(t);
    }
  }
  return {
    assert: e,
    assertParam: function (t, n) {
      e(t != null, n);
    }
  };
}();
exports.debug = s;