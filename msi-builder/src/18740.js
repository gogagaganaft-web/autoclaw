exports.default = undefined;
var i;
var o;
var a;
var r;
var s = require("./35922.js");
var l = require("./95479.js");
var u = ["year", "month", "day"];
var d = ["year", "month", "day", "hour", "minute"];
function c(e) {
  return e === "date" || e === "datetime";
}
function h(e) {
  var t;
  var n = [];
  var i = ["year", "month", "day", "hour", "minute", "second"];
  var o = e.headerFilter && e.headerFilter.groupInterval;
  var a = o === "quarter" ? "month" : o;
  if (c(e.dataType) && o !== null) {
    n = e.dataType === "datetime" ? d : u;
    if ((t = i.indexOf(a)) >= 0) {
      (n = i.slice(0, t)).push(o);
      return n;
    } else {
      return n;
    }
  } else if ((0, s.isDefined)(o)) {
    if (Array.isArray(o)) {
      return o;
    } else {
      return [o];
    }
  } else {
    return undefined;
  }
}
i = function (e, t) {
  var n = e.dataField || e.selector;
  if (t === "search") {
    n = e.displayField || e.calculateDisplayValue || n;
  }
  return n;
};
o = function (e, t) {
  var n;
  var o;
  var a;
  var r;
  var l = i(this, t);
  if (Array.isArray(e) && (0, s.isDefined)(e[0]) && (0, s.isDefined)(e[1])) {
    o = [l, ">=", e[0]];
    a = [l, "<=", e[1]];
    if (c(this.dataType) && (r = e[1]).getHours() + r.getMinutes() + r.getSeconds() + r.getMilliseconds() < 1) {
      n = new Date(e[1].getTime());
      if (this.dataType === "date") {
        n.setDate(e[1].getDate() + 1);
      }
      a = [l, "<", n];
    }
    return [o, "and", a];
  }
};
a = function (e, t, n) {
  var o;
  var a;
  var r;
  var u;
  u = e;
  var d = (0, s.isDate)(u) ? [u.getFullYear(), u.getMonth(), u.getDate(), u.getHours(), u.getMinutes(), u.getSeconds()] : (0, l.map)(("" + u).split("/"), function (e, t) {
    if (t === 1) {
      return Number(e) - 1;
    } else {
      return Number(e);
    }
  });
  var c = i(this, n);
  if (n === "headerFilter") {
    r = h(this)[d.length - 1];
  } else if (this.dataType === "datetime") {
    r = "minute";
  }
  switch (r) {
    case "year":
      o = new Date(d[0], 0, 1);
      a = new Date(d[0] + 1, 0, 1);
      break;
    case "month":
      o = new Date(d[0], d[1], 1);
      a = new Date(d[0], d[1] + 1, 1);
      break;
    case "quarter":
      o = new Date(d[0], d[1] * 3, 1);
      a = new Date(d[0], d[1] * 3 + 3, 1);
      break;
    case "hour":
      o = new Date(d[0], d[1], d[2], d[3]);
      a = new Date(d[0], d[1], d[2], d[3] + 1);
      break;
    case "minute":
      o = new Date(d[0], d[1], d[2], d[3], d[4]);
      a = new Date(d[0], d[1], d[2], d[3], d[4] + 1);
      break;
    case "second":
      o = new Date(d[0], d[1], d[2], d[3], d[4], d[5]);
      a = new Date(d[0], d[1], d[2], d[3], d[4], d[5] + 1);
      break;
    default:
      o = new Date(d[0], d[1], d[2]);
      a = new Date(d[0], d[1], d[2] + 1);
  }
  switch (t) {
    case "<":
      return [c, "<", o];
    case "<=":
      return [c, "<", a];
    case ">":
      return [c, ">=", a];
    case ">=":
      return [c, ">=", o];
    case "<>":
      return [[c, "<", o], "or", [c, ">=", a]];
    default:
      return [[c, ">=", o], "and", [c, "<", a]];
  }
};
r = function (e, t, n) {
  var o = i(this, n);
  var a = h(this);
  if (n === "headerFilter" && a && (0, s.isDefined)(e)) {
    var r = ("" + e).split("/");
    var l = Number(r[r.length - 1]);
    return [[o, ">=", l], "and", [o, "<", l + a[r.length - 1]]];
  }
  return [o, t || "=", e];
};
var f = {
  defaultCalculateFilterExpression: function (e, t, n) {
    var l = this;
    var u = i(l, n);
    var d = l.calculateDisplayValue && n === "search";
    var h = d && l.lookup && l.lookup.dataType || l.dataType;
    var f = null;
    if (n !== "headerFilter" && n !== "filterBuilder" || e !== null) {
      if (h !== "string" || l.lookup && !d) {
        if (t === "between") {
          return o.apply(l, [e, n]);
        }
        if (c(h) && (0, s.isDefined)(e)) {
          return a.apply(l, arguments);
        }
        if (h === "number") {
          return r.apply(l, arguments);
        }
        f = [u, t || "=", e];
      } else {
        f = [u, t || "contains", e];
      }
    } else {
      f = [u, t || "=", null];
      if (h === "string") {
        f = [f, t === "=" ? "or" : "and", [u, t || "=", ""]];
      }
    }
    return f;
  },
  getGroupInterval: h
};
exports.default = f;
module.exports = exports.default;
module.exports.default = exports.default;