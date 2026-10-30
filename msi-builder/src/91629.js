Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;
exports.sort = r;
var i = require("./95479.js");
var o = require("./35922.js");
var a = require("./28580.js");
function r(e, t, n) {
  s(t, e, "rows", n);
  s(t, e, "columns", n);
}
function s(e, t, n, r) {
  var s = t[n] || [];
  var l = t.headerName === n ? t.path.length : 0;
  var u = [];
  (0, a.foreachDataLevel)(e[n], function (l, d) {
    var c = s[d] || {};
    var h = u[d] = u[d] || function (e, t, n, r, s) {
      var l = s ? "asc" : e.sortOrder;
      var u = function (e, t) {
        var n = "text";
        if (e === "none") {
          n = "index";
        } else if (t || e !== "displayText") {
          n = "value";
        }
        return n;
      }(e.sortBy, s);
      var d = e.sortingMethod ? function (t, n) {
        return e.sortingMethod(t, n);
      } : (0, a.getCompareFunction)(function (e) {
        return e[u];
      });
      var c = !s && function (e, t, n, r) {
        var s = t.values;
        var l = (0, a.findField)(n.values, e.sortBySummaryField);
        var u = r === "rows";
        var d = u ? t.columns : t.rows;
        var c = u ? t.grandTotalRowIndex : t.grandTotalColumnIndex;
        var h = e.sortBySummaryPath || [];
        var f = h.length ? function (e, t) {
          var n = null;
          var o = (t || []).join(".");
          if (o.length) {
            (0, a.foreachTree)(e, function (e) {
              var t = e[0];
              var r = (0, a.createPath)(e).join(".");
              var s = (0, i.map)(e, function (e) {
                return e.text;
              }).reverse().join(".");
              if (o === r || t.key && s === o) {
                n = e[0].index;
                return false;
              }
            });
          }
          return n;
        }(d, h) : c;
        if (s && s.length && l >= 0 && (0, o.isDefined)(f)) {
          return function (e) {
            var t = u ? e.index : f;
            var n = u ? f : e.index;
            var i = ((s[t] || [[]])[n] || [])[l];
            if ((0, o.isDefined)(i)) {
              return i;
            } else {
              return null;
            }
          };
        }
        return;
      }(e, t, n, r);
      var h = c && (0, a.getCompareFunction)(c);
      return function (e, t) {
        var n = h && h(e, t) || d(e, t);
        if (l === "desc") {
          return -n;
        } else {
          return n;
        }
      };
    }(c, e, t, n, r);
    l.sort(h);
  }, l);
}
var l = {
  sort: r
};
exports.default = l;