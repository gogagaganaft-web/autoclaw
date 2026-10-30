exports.GanttMappingHelper = undefined;
var i = require("./35922.js");
var o = require("./47617.js");
var a = /(\w*)Expr/;
var r = function () {
  function e(e) {
    this._gantt = e;
  }
  var t = e.prototype;
  t._getMappedFieldName = function (e, t) {
    var n = t;
    if (t === "id") {
      n = "key";
    }
    return this._gantt.option(`${e}.${n}Expr`);
  };
  t.getTaskMappedFieldNames = function () {
    var e = [];
    var t = this._gantt.option("tasks");
    for (var n in t) {
      var i = n.match(a);
      var o = i && t[i[0]];
      if (o) {
        e.push(o);
      }
    }
    return e;
  };
  t.convertCoreToMappedData = function (e, t) {
    var n = this;
    return Object.keys(t).reduce(function (a, r) {
      var s = n._getMappedFieldName(e, r);
      if (s && !(0, i.isFunction)(s)) {
        (0, o.compileSetter)(s)(a, t[r]);
      }
      return a;
    }, {});
  };
  t.convertMappedToCoreData = function (e, t) {
    var n = {};
    if (t) {
      var i = this._gantt.option(e);
      for (var r in i) {
        var s = r.match(a);
        var l = s && i[s[0]];
        if (l && t[l] !== undefined) {
          var u = (0, o.compileGetter)(l);
          n[s[1]] = u(t);
        }
      }
    }
    return n;
  };
  t.convertCoreToMappedFields = function (e, t) {
    var n = this;
    return t.reduce(function (t, i) {
      var o = n._getMappedFieldName(e, i);
      if (o) {
        t.push(o);
      }
      return t;
    }, []);
  };
  t.convertMappedToCoreFields = function (e, t) {
    var n = [];
    var i = this._gantt.option(e);
    for (var o in i) {
      var r = o.match(a);
      var s = r && i[r[0]];
      if (s && t.indexOf(s) > -1) {
        var l = r[1];
        n.push(l);
      }
    }
    return n;
  };
  return e;
}();
exports.GanttMappingHelper = r;