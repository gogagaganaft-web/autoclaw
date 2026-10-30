exports.getCaretBoundaries = exports.getCaretAfterFormat = undefined;
exports.getCaretInBoundaries = f;
exports.isCaretInBoundaries = exports.getCaretWithOffset = exports.getCaretOffset = undefined;
var i;
var o = require("./60810.js");
var a = require("./20576.js");
var r = (i = require("./18016.js")) && i.__esModule ? i : {
  default: i
};
var s = require("./7206.js");
function l(e, t) {
  if (typeof t == "string") {
    var n = t.split(";");
    var i = r.default.getSign(e, t);
    n[1] = n[1] || "-" + n[0];
    t = n[i < 0 ? 1 : 0];
    t = t.replace(/'([^']*)'/g, function (e) {
      return e.split("").map(function () {
        return " ";
      }).join("").substr(2);
    });
    var o = /^[^#0.,]*/.exec(t)[0].length;
    var a = /[^#0.,]*$/.exec(t)[0].length;
    return {
      start: o,
      end: e.length - a
    };
  }
  return {
    start: 0,
    end: e.length
  };
}
exports.getCaretBoundaries = l;
function u(e, t) {
  var n = r.default.getDecimalSeparator();
  var i = new RegExp("[^0-9" + (0, a.escapeRegExp)(n) + "]", "g");
  return t.slice(0, e).replace(i, "").length;
}
function d(e) {
  return e.split("").reverse().join("");
}
function c(e, t) {
  if (!e) {
    return -1;
  }
  var n = /[0-9]/g;
  var i = 1;
  var o = null;
  for (var a = n.exec(t); a;) {
    o = a.index;
    if (i >= e) {
      return o;
    }
    i++;
    a = n.exec(t);
  }
  if (o === null) {
    return t.length;
  } else {
    return o;
  }
}
function h(e, t) {
  if (e.start === undefined) {
    e = {
      start: e,
      end: e
    };
  }
  return {
    start: e.start + t,
    end: e.end + t
  };
}
exports.getCaretWithOffset = h;
exports.getCaretAfterFormat = function (e, t, n, i) {
  n = h(n, 0);
  var o = r.default.getDecimalSeparator();
  var a = function (e) {
    return e.length === 1 && !!e.match(/^[,.][0-9]*$/g);
  }(e);
  var l = (0, s.getRealSeparatorIndex)(i).occurrence;
  var p = a ? 0 : (0, s.getNthOccurrence)(e, o, l);
  var g = (0, s.getNthOccurrence)(t, o, l);
  var m = (0, s.splitByIndex)(e, p);
  var _ = (0, s.splitByIndex)(t, g);
  if (p !== -1 && n.start > p) {
    var v = n.start - p - 1;
    var y = u(v, m[1]);
    return f(_[1] ? g + 1 + c(y, _[1]) + 1 : t.length, t, i);
  }
  var b = function (e) {
    return e.replace(/[^0-9e]+$/, "");
  }(_[0]);
  var x = m[0].length - n.start;
  var w = u(x, d(m[0]));
  var C = c(w, d(b));
  return f(b.length - (C + 1), t, i);
};
function f(e, t, n) {
  e = h(e, 0);
  var i = l(t, n);
  return {
    start: (0, o.fitIntoRange)(e.start, i.start, i.end),
    end: (0, o.fitIntoRange)(e.end, i.start, i.end)
  };
}
exports.isCaretInBoundaries = function (e, t, n) {
  var i = f(e = h(e, 0), t, n);
  return e.start >= i.start && e.end <= i.end;
};
exports.getCaretOffset = function (e, t, n) {
  var i = l(e, n);
  return l(t, n).start - i.start;
};