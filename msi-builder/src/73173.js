exports.pathCombine = exports.getPathParts = exports.getParentPath = exports.getName = exports.getFileExtension = exports.getEscapedFileName = exports.PATH_SEPARATOR = undefined;
var i = require("./95479.js");
exports.PATH_SEPARATOR = "/";
exports.getFileExtension = function (e) {
  var t = e.lastIndexOf(".");
  if (t !== -1) {
    return e.substr(t);
  } else {
    return "";
  }
};
exports.getName = function (e) {
  var t = e.lastIndexOf("/");
  if (t !== -1) {
    return e.substr(t + "/".length);
  } else {
    return e;
  }
};
exports.getParentPath = function (e) {
  var t = e.lastIndexOf("/");
  if (t !== -1) {
    return e.substr(0, t);
  } else {
    return "";
  }
};
exports.getPathParts = function (e, t) {
  if (!e || e === "/") {
    return [];
  }
  var n = [];
  var i = "";
  for (var r = 0; r < e.length; r++) {
    var s = e.charAt(r);
    if (s === "/") {
      var l = e.charAt(r + 1);
      if (l !== "/") {
        if (i) {
          n.push(i);
          i = "";
        }
        s = l;
      }
      r++;
    }
    i += s;
  }
  if (i) {
    n.push(i);
  }
  if (t) {
    for (var u = 0; u < n.length; u++) {
      n[u] = a(u === 0 ? "" : n[u - 1], o(n[u]));
    }
  }
  return n;
};
function o(e) {
  return e.replace(/\/{1,1}/g, "//");
}
exports.getEscapedFileName = o;
function a() {
  var e = "";
  (0, i.each)(arguments, function (t, n) {
    if (n) {
      if (e) {
        e += "/";
      }
      e += n;
    }
  });
  return e;
}
exports.pathCombine = a;