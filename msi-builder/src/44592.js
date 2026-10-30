exports.default = undefined;
exports.default = function (e, t) {
  if (t) {
    var n = e;
    if (typeof e == "string") {
      n = "";
      for (var i = 0; i < e.length; i++) {
        if (e[i] !== "$") {
          n += "\\";
        }
        n += e[i];
      }
    }
    var o = {
      ".00": "{0}",
      "'": "\\'",
      "\\(": "\\(",
      "\\)": "\\)",
      " ": "\\ ",
      "\"": "&quot;",
      "\\¤": n
    };
    for (var a = t.split(";"), r = 0; r < a.length; r++) {
      for (var s in o) {
        if (Object.prototype.hasOwnProperty.call(o, s)) {
          a[r] = a[r].replace(new RegExp(s, "g"), o[s]);
        }
      }
    }
    if (a.length === 2) {
      return a[0] + "_);" + a[1];
    } else {
      return a[0];
    }
  }
};
module.exports = exports.default;
module.exports.default = exports.default;