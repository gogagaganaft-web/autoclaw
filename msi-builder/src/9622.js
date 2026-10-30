Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.anyOf = function (e) {
  return (0, a.extend)(c(e), {
    name: "anyof",
    icon: "selectall",
    caption: s.default.format("dxFilterBuilder-filterOperationAnyOf")
  });
};
exports.noneOf = function (e) {
  var t = c(e);
  return (0, a.extend)({}, t, {
    calculateFilterExpression: function (e, n, i) {
      var o = t.calculateFilterExpression(e, n, i);
      if (o && o.length !== 0) {
        if (o[0] === "!") {
          return o;
        } else {
          return ["!", o];
        }
      } else {
        return null;
      }
    },
    name: "noneof",
    icon: "unselectall",
    caption: s.default.format("dxFilterBuilder-filterOperationNoneOf")
  });
};
var i = d(require("./68374.js"));
var o = require("./62754.js");
var a = require("./13306.js");
var r = require("./85273.js");
var s = d(require("./28109.js"));
var l = require("./59423.js");
var u = d(require("./96688.js"));
function d(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
function c(e) {
  function t(e, t) {
    if (t) {
      return `${t}/${e}`;
    } else {
      return e;
    }
  }
  var n = e && e.getController("headerFilter");
  return {
    dataTypes: ["string", "date", "datetime", "number", "boolean", "object"],
    calculateFilterExpression: function (e, t, n) {
      var i = [];
      var o = e.length - 1;
      if (e) {
        e.forEach(function (e, a) {
          if ((0, l.isCondition)(e) || (0, l.isGroup)(e)) {
            var r = (0, l.getFilterExpression)(e, n, [], "headerFilter");
            i.push(r);
          } else {
            var s = (0, l.getFilterExpression)([t.dataField, "=", e], n, [], "headerFilter");
            i.push(s);
          }
          if (a !== o) {
            i.push("or");
          }
        });
      }
      if (i.length === 1) {
        return i[0];
      } else {
        return i;
      }
    },
    editorTemplate: function (t, o) {
      var r = (0, i.default)("<div>").addClass("dx-filterbuilder-item-value-text").appendTo(o);
      var s = (0, a.extend)(true, {}, e.columnOption(t.field.dataField));
      (0, l.renderValueText)(r, t.text && t.text.split("|"));
      s.filterType = "include";
      s.filterValues = t.value ? t.value.slice() : [];
      n.showHeaderFilterMenuBase({
        columnElement: r,
        column: s,
        apply: function () {
          var e;
          e = this.filterValues;
          t.setValue(e);
          n.hideHeaderFilterMenu();
          t.closeEditor();
        },
        onHidden: function () {
          t.closeEditor();
        },
        isFilterBuilder: true
      });
      return o;
    },
    customizeText: function (i, s) {
      s = s || {};
      var l = i.value;
      var d = e.columnOption(i.field.dataField);
      var c = d && d.headerFilter;
      var h = d && d.lookup;
      var f = s.values || [l];
      if (c && c.dataSource || h && h.dataSource) {
        var p = new o.Deferred();
        var g = s.items || new o.Deferred();
        if (!s.items) {
          d = (0, a.extend)({}, d, {
            filterType: "include",
            filterValues: f
          });
          var m = n.getDataSource(d);
          m.paginate = false;
          var _ = new r.DataSource(m);
          var v = _.store().key();
          if (v) {
            var y = s.values;
            if (y && y.length > 1) {
              var b = y.reduce(function (e, t) {
                if (e.length) {
                  e.push("or");
                }
                e.push([v, "=", t]);
                return e;
              }, []);
              _.filter(b);
            } else {
              _.filter([v, "=", i.value]);
            }
          } else if (i.field.calculateDisplayValue) {
            u.default.log("W1017");
          }
          s.items = g;
          _.load().done(g.resolve);
        }
        g.done(function (e) {
          var n = f.indexOf(i.value);
          p.resolve(function e(n, i) {
            var o = [];
            n.forEach(function (n) {
              if (n.items) {
                var a = e(n.items, t(n.text, i));
                o = o.concat(a);
              }
              if (n.selected) {
                o.push(t(n.text, i));
              }
            });
            return o;
          }(e, null)[n]);
        });
        return p;
      }
      return n.getHeaderItemText(l, d, 0, e.option("headerFilter"));
    }
  };
}