exports.default = undefined;
function n(e) {
  var t = e.import("delta");
  return function (e, n) {
    var i = n.ops.slice();
    var o = i[0];
    o.insert = o.insert.replace(/^\s+/, "");
    var a;
    var r;
    var s;
    var l = o.insert.match(/^(\S+)\s+/);
    var u = l && function (e) {
      var t = e.getAttribute("style");
      if (t) {
        var n = t.replace(/\n+/g, "").match(/level(\d+)/);
        if (n) {
          return n[1] - 1;
        } else {
          return 0;
        }
      }
      return false;
    }(e);
    if (l && u !== false) {
      o.insert = o.insert.substring(l[0].length, o.insert.length);
      (r = (a = i)[a.length - 1]).insert = r.insert.trim();
      i.push({
        insert: "\n",
        attributes: {
          list: (s = l, s[1].match(/\S+\./) ? "ordered" : "bullet"),
          indent: u
        }
      });
      return new t(i);
    } else {
      return n;
    }
  };
}
exports.default = n;
module.exports = exports.default;
module.exports.default = exports.default;