Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.ChartIntegrationMixin = undefined;
var i;
var o = (i = require("./68374.js")) && i.__esModule ? i : {
  default: i
};
var a = require("./13306.js");
var r = require("./95479.js");
var s = require("./28580.js");
var l = {
  number: "numeric",
  date: "datetime"
};
var u = "dxPivotGridUnbinding";
function d(e, t) {
  var n = [];
  var i = t.length - 1;
  (0, r.each)(e, function (e, o) {
    n.push(o.text || (0, s.formatValue)(o.value, t[i - e]));
  });
  return n.reverse();
}
function c(e) {
  var t = 0;
  (0, s.foreachTree)(e, function (e) {
    t = Math.max(t, e.length - 1);
  });
  return t;
}
function h(e, t, n) {
  var i;
  var o;
  var l;
  var u;
  var h;
  var f;
  var p;
  var g;
  var m;
  var _;
  var v = e.getData();
  var y = [];
  var b = e.getAreaFields("data");
  var x = e.getAreaFields("row");
  var w = e.getAreaFields("column");
  var C = [{
    index: v.grandTotalColumnIndex,
    children: v.columns
  }];
  var S = [{
    index: v.grandTotalRowIndex,
    children: v.rows
  }];
  var k = c(S);
  var D = c(C);
  function I() {
    var e;
    var r = (v.values[l] || [])[p] || [];
    var s = r[i];
    var d = {
      rowPath: f,
      maxRowLevel: k,
      rowPathFormatted: h,
      rowFields: x,
      columnPathFormatted: _,
      maxColumnLevel: D,
      columnPath: m,
      columnFields: w,
      dataFields: b,
      dataIndex: i,
      dataValues: r,
      visible: g && u
    };
    var c = (t.inverted ? _ : h).join(" - ");
    var C = (t.inverted ? h : _).join("/");
    if (b.length > 1) {
      if (t.putDataFieldsInto === "args" || t.putDataFieldsInto === "both") {
        C += ` | ${o.caption}`;
      }
      if (t.putDataFieldsInto !== "args") {
        c += ` | ${o.caption}`;
        if (t.dataFieldsDisplayMode !== "singleAxis") {
          e = o.caption;
        }
      }
    }
    d.chartDataItem = {
      val: s === undefined ? null : s,
      series: c,
      arg: C
    };
    if ((d = function (e, t) {
      var n = e.chartDataItem;
      var i = t && t(e);
      if (i) {
        n = (0, a.extend)({}, n, i.chartDataItem);
        return i = (0, a.extend)({}, e, i, {
          chartDataItem: n
        });
      } else {
        return e;
      }
    }(d, t.processCell)).visible) {
      n[d.chartDataItem.series] = n[d.chartDataItem.series] || e;
      y.push(d.chartDataItem);
    }
  }
  function T(e) {
    (0, s.foreachTree)(S, function (n) {
      l = n[0].index;
      n = n.slice(0, n.length - 1);
      u = k === n.length;
      f = (0, s.createPath)(n);
      h = d(n, x);
      if (f.length === 0) {
        h = [t.grandTotalText];
      }
      (0, s.foreachTree)(C, function (n) {
        p = n[0].index;
        n = n.slice(0, n.length - 1);
        g = D === n.length;
        m = (0, s.createPath)(n);
        _ = d(n, w);
        if (m.length === 0) {
          _ = [t.grandTotalText];
        }
        e();
      });
    });
  }
  function E(e) {
    (0, r.each)(b, function (t, n) {
      o = n;
      i = t;
      e();
    });
  }
  if (t.alternateDataFields === false) {
    E(function () {
      T(I);
    });
  } else {
    T(function () {
      E(I);
    });
  }
  return y;
}
function f(e, t) {
  var n = e.getAreaFields("data");
  if (t.putDataFieldsInto !== "args" && t.dataFieldsDisplayMode !== "singleAxis" || n.length === 1) {
    var i = [];
    (0, r.each)(n, function (e, n) {
      var o = {
        name: n.caption,
        title: n.caption,
        valueType: l[n.dataType] || n.dataType,
        label: {
          format: n.format
        }
      };
      if (n.customizeText) {
        o.label.customizeText = function (e) {
          return n.customizeText.call(n, e);
        };
      }
      if (t.dataFieldsDisplayMode === "splitPanes") {
        o.pane = n.caption;
      }
      i.push(o);
    });
    return i;
  }
  return [{}];
}
function p(e, t) {
  var n = [];
  var i = e.getAreaFields("data");
  if (i.length > 1 && t.dataFieldsDisplayMode === "splitPanes" && t.putDataFieldsInto !== "args") {
    (0, r.each)(i, function (e, t) {
      n.push({
        name: t.caption
      });
    });
  }
  if (!n.length) {
    n.push({});
  }
  return n;
}
var g = {
  bindChart: function (e, t) {
    t = (0, a.extend)({}, t);
    var n = this;
    function i() {
      t.grandTotalText = n.option("texts.grandTotal");
      var i = function (e, t) {
        var n = t.customizeSeries;
        var i = t.customizeChart;
        var o = {
          valueAxis: f(e, t),
          panes: p(e, t)
        };
        var r = {};
        if (i) {
          o = (0, a.extend)(true, {}, o, i(o));
        }
        o.dataSource = h(e, t, r);
        o.seriesTemplate = {
          nameField: "series",
          customizeSeries: function (e) {
            var i = {};
            if (t.dataFieldsDisplayMode === "splitPanes") {
              i.pane = r[e];
            } else if (t.dataFieldsDisplayMode !== "singleAxis") {
              i.axis = r[e];
            }
            if (n) {
              i = (0, a.extend)(i, n(e, i));
            }
            return i;
          }
        };
        return o;
      }(n.getDataSource(), t);
      e.option(i);
    }
    if (!(e = function (e) {
      if (!e) {
        return false;
      }
      if (e.NAME) {
        return e.NAME === "dxChart" && e;
      }
      var t = (0, o.default)(e);
      return t.data("dxChart") && t.dxChart("instance");
    }(e))) {
      return null;
    }
    (function (e) {
      var t = e.$element().data(u);
      if (t) {
        t();
      }
    })(e);
    n.on("changed", i);
    i();
    function r() {
      e.$element().removeData(u);
      n.off("changed", i);
    }
    e.on("disposing", r);
    this.on("disposing", r);
    e.$element().data(u, r);
    return r;
  }
};
exports.ChartIntegrationMixin = g;
var m = {
  ChartIntegrationMixin: g
};
exports.default = m;