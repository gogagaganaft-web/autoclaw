exports.default = undefined;
var i;
var o = require("./20576.js");
var a = require("./13306.js");
var r = require("./95479.js");
var s = (i = require("./35042.js")) && i.__esModule ? i : {
  default: i
};
var l = require("./16454.js");
function u(e, t) {
  e = e.groupBy(t[0].selector);
  if (t.length > 1) {
    e = e.select(function (e) {
      return (0, a.extend)({}, e, {
        items: u((0, s.default)(e.items), t.slice(1)).toArray()
      });
    });
  }
  return e;
}
function d(e, t) {
  var n = [];
  (0, r.each)(e, function (e, i) {
    if ((0, o.grep)(t, function (e) {
      return i.selector === e.selector;
    }).length < 1) {
      n.push(i);
    }
  });
  return n.concat(t);
}
var c = {
  multiLevelGroup: u,
  arrangeSortingInfo: d,
  queryByOptions: function (e, t, n) {
    var i;
    var o;
    var a;
    var s = (t = t || {}).filter;
    if ((i = t) !== null && i !== undefined && i.langParams) {
      if ((o = (a = e).setLangParams) !== null && o !== undefined) {
        o.call(a, t.langParams);
      }
    }
    if (s) {
      e = e.filter(s);
    }
    if (n) {
      return e;
    }
    var c = t.sort;
    var h = t.select;
    var f = t.group;
    var p = t.skip;
    var g = t.take;
    if (f) {
      (f = (0, l.normalizeSortingInfo)(f)).keepInitialKeyOrder = !!t.group.keepInitialKeyOrder;
    }
    if (c || f) {
      c = (0, l.normalizeSortingInfo)(c || []);
      if (f && !f.keepInitialKeyOrder) {
        c = d(f, c);
      }
      (0, r.each)(c, function (t) {
        e = e[t ? "thenBy" : "sortBy"](this.selector, this.desc, this.compare);
      });
    }
    if (h) {
      e = e.select(h);
    }
    if (f) {
      e = u(e, f);
    }
    if (g || p) {
      e = e.slice(p || 0, g);
    }
    return e;
  }
};
exports.default = c;
module.exports = exports.default;
module.exports.default = exports.default;