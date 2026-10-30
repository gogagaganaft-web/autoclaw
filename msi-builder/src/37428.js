exports.default = undefined;
var i = l(require("./68374.js"));
var o = l(require("./73349.js"));
var a = require("./97906.js");
var r = require("./35922.js");
var s = require("./6415.js");
function l(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
function u() {
  return (u = Object.assign ? Object.assign.bind() : function (e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var i in n) {
        if (Object.prototype.hasOwnProperty.call(n, i)) {
          e[i] = n[i];
        }
      }
    }
    return e;
  }).apply(this, arguments);
}
var d = {
  tableCreator: new (function () {
    function e() {
      this.VERTICAL = "vertical";
      this.HORIZONTAL = "horizontal";
    }
    var t = e.prototype;
    t.insertAllDayRow = function (e, t, n) {
      if (e[n]) {
        var a = e[n].find("tr");
        if (!a.length) {
          (a = (0, i.default)(o.default.createElement("tr"))).append(e[n].get(0));
        }
        t.appendChild(a.get ? a.get(0) : a);
      }
    };
    t.makeTable = function (e) {
      var t;
      var n = o.default.createElement("tbody");
      var l = [];
      var d = e.groupCount ? e.rowCount / e.groupCount : e.rowCount;
      var c = 0;
      var h = e.allDayElements;
      var f = e.groupIndex;
      var p = e.rowCount;
      (0, i.default)(e.container).append(n);
      if (h) {
        this.insertAllDayRow(h, n, 0);
        c++;
      }
      for (var g = 0; g < p; g++) {
        t = o.default.createElement("tr");
        n.appendChild(t);
        var m = (g + 1) % d == 0;
        if (e.rowClass) {
          t.className = e.rowClass;
        }
        for (var _ = 0; _ < e.cellCount; _++) {
          var v;
          var y = o.default.createElement("td");
          t.appendChild(y);
          if (e.cellClass) {
            if ((0, r.isFunction)(e.cellClass)) {
              y.className = e.cellClass(g, _);
            } else {
              y.className = e.cellClass;
            }
          }
          var b = undefined;
          var x = undefined;
          var w = undefined;
          if (e.getCellData) {
            x = (b = e.getCellData(y, g, _, f)).key;
            w = b.value;
            if (x) {
              (0, a.data)(y, x, w);
            }
          }
          if ((v = e.setAdditionalClasses) !== null && v !== undefined) {
            v.call(e, (0, i.default)(y), w);
          }
          if (e.cellTemplate && e.cellTemplate.render) {
            var C = e.getTemplateData ? e.getTemplateData(g) : {};
            var S = {
              model: u({
                text: e.getCellText ? e.getCellText(g, _) : "",
                date: e.getCellDate ? e.getCellDate(g) : undefined
              }, C),
              container: (0, s.getPublicElement)((0, i.default)(y)),
              index: g * e.cellCount + _
            };
            if (w) {
              if (w.startDate) {
                S.model.startDate = w.startDate;
              }
              if (w.endDate) {
                S.model.endDate = w.endDate;
              }
              if (w.groups) {
                S.model.groups = w.groups;
              }
              if (w.allDay) {
                S.model.allDay = w.allDay;
              }
            }
            l.push(e.cellTemplate.render.bind(e.cellTemplate, S));
          } else if (e.getCellText) {
            (0, i.default)("<div>").text(e.getCellText(g, _)).addClass(e.getCellTextClass).appendTo((0, i.default)(y));
          }
        }
        if (h && m) {
          this.insertAllDayRow(h, n, c);
          c++;
        }
      }
      return l;
    };
    t.makeGroupedTable = function (e, t, n, i, o, a, r) {
      if (e === this.VERTICAL) {
        return this._makeVerticalGroupedRows(t, n, o, a);
      } else {
        return this._makeHorizontalGroupedRows(t, n, i, o, r);
      }
    };
    t.makeGroupedTableFromJSON = function (e, t, n) {
      var i;
      var a = [];
      var r = 0;
      var s = (n = n || {}).cellTag || "td";
      var l = n.childrenField || "children";
      var u = n.titleField || "title";
      var d = n.groupTableClass;
      var c = n.groupRowClass;
      var h = n.groupCellClass;
      var f = n.groupCellCustomContent;
      function p(e, t, n, i) {
        var a = {
          element: o.default.createElement(s),
          childCount: t
        };
        if (h) {
          a.element.className = h;
        }
        var r = o.default.createTextNode(e);
        if (typeof f == "function") {
          f(a.element, r, n, i);
        } else {
          a.element.appendChild(r);
        }
        return a;
      }
      i = o.default.createElement("table");
      if (d) {
        i.className = d;
      }
      (function e(t) {
        for (var n = 0; n < t.length; n++) {
          var i = (s = t[n])[l] ? s[l].length : 0;
          var o = p(t[n][u], i, n, t[n]);
          a[r] ||= [];
          a[r].push(o);
          if (i) {
            e(t[n][l]);
          } else {
            r++;
          }
        }
        var s;
      })(t);
      a.forEach(function (e) {
        var t = o.default.createElement("tr");
        if (c) {
          t.className = c;
        }
        var n = [];
        for (var a = e.length - 1; a >= 0; a--) {
          var r = e[a + 1];
          var s = e[a].childCount;
          if (r && r.childCount) {
            s *= r.childCount;
          }
          n.push(s);
        }
        n.reverse();
        e.forEach(function (e, i) {
          if (n[i]) {
            e.element.setAttribute("rowSpan", n[i]);
          }
          t.appendChild(e.element);
        });
        i.appendChild(t);
      });
      return i;
    };
    t._makeFlexGroupedRowCells = function (e, t, n, o) {
      for (var a = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 1, l = [], u = e.items, d = u.length, c = 0; c < t * a; c++) {
        for (var h = 0; h < d; h++) {
          var f = (0, i.default)("<div>");
          var p = {};
          if (o && o.render) {
            var g = {
              model: u[h],
              container: (0, s.getPublicElement)(f),
              index: c * d + h
            };
            if (e.data) {
              g.model.data = e.data[h];
            }
            p.template = o.render.bind(o, g);
          } else {
            f.text(u[h].text).attr("title", u[h].text).addClass("dx-scheduler-group-header-content");
            f = (0, i.default)("<div>").append(f);
          }
          var m = (0, r.isFunction)(n.groupHeaderClass) ? n.groupHeaderClass(h) : n.groupHeaderClass;
          p.element = f.addClass(m);
          l.push(p);
        }
      }
      return l;
    };
    t._makeVerticalGroupedRows = function (e, t, n) {
      var o = [];
      var a = 1;
      var r = [];
      var s = function (e) {
        if (e.template) {
          o.push(e.template);
        }
      };
      for (var l = 0; l < e.length; l++) {
        if (l > 0) {
          a = e[l - 1].items.length * a;
        }
        var u = this._makeFlexGroupedRowCells(e[l], a, t, n);
        u.forEach(s);
        r.push(u);
      }
      var d = [];
      for (var c = r.length, h = 0; h < c; h++) {
        d.push((0, i.default)("<div>").addClass(t.groupHeaderRowClass));
      }
      for (var f = c - 1; f >= 0; f--) {
        for (var p = r[f].length, g = 0; g < p; g++) {
          d[f].append(r[f][g].element);
        }
      }
      return {
        elements: (0, i.default)("<div>").addClass("dx-scheduler-group-flex-container").append(d),
        cellTemplates: o
      };
    };
    t._makeHorizontalGroupedRows = function (e, t, n, o, a) {
      var r = 1;
      for (var s = e.length, l = [], u = [], d = a ? n : 1, c = function (e) {
          if (e.template) {
            u.push(e.template);
          }
          return e.element;
        }, h = 0; h < s; h++) {
        if (h > 0) {
          r = e[h - 1].items.length * r;
        }
        var f = this._makeGroupedRowCells(e[h], r, t, o, d);
        l.push((0, i.default)("<tr>").addClass(t.groupRowClass).append(f.map(c)));
      }
      var p = l[s - 1].find("th").length;
      for (var g = 0; g < s; g++) {
        var m = l[g].find("th");
        var _ = p / m.length;
        if (!a) {
          _ *= n;
        }
        if (_ > 1 && d === 1 || a && s > 1) {
          m.attr("colSpan", _);
        }
      }
      return {
        elements: l,
        cellTemplates: u
      };
    };
    t._makeGroupedRowCells = function (e, t, n, o, a) {
      t *= a = a || 1;
      var l = [];
      var u = e.items;
      var d = u.length;
      for (var c = 0; c < t; c++) {
        for (var h = 0; h < d; h++) {
          var f = (0, i.default)("<div>");
          var p = {};
          if (o && o.render) {
            var g = {
              model: u[h],
              container: (0, s.getPublicElement)(f),
              index: c * d + h
            };
            if (e.data) {
              g.model.data = e.data[h];
            }
            p.template = o.render.bind(o, g);
          } else {
            f.text(u[h].text);
            f = (0, i.default)("<div>").append(f);
          }
          f.addClass(n.groupHeaderContentClass);
          var m = undefined;
          m = (0, r.isFunction)(n.groupHeaderClass) ? n.groupHeaderClass(h) : n.groupHeaderClass;
          p.element = (0, i.default)("<th>").addClass(m).append(f);
          l.push(p);
        }
      }
      return l;
    };
    return e;
  }())()
};
exports.default = d;
module.exports = exports.default;
module.exports.default = exports.default;