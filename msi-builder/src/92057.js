exports.polar = exports.chart = undefined;
var i = require("./20576.js");
var o = require("./13306.js");
var a = require("./95479.js");
var r = require("./90048.js");
var s = require("./58821.js");
var l = require("./7222.js");
var u = require("./19157.js");
var d = require("./48013.js");
var c = r.chart.area;
var h = s.chart.bar;
var f = {
  _calculateErrorBars: i.noop,
  _updateOptions: function (e) {
    this._stackName = "axis_" + (e.axis || "default");
  }
};
var p = {};
exports.chart = p;
var g = {};
exports.polar = g;
p.stackedline = (0, o.extend)({}, l.chart.line, f, {});
p.stackedspline = (0, o.extend)({}, l.chart.spline, f, {});
p.fullstackedline = (0, o.extend)({}, l.chart.line, f, {
  getValueRangeInitialValue: r.chart.area.getValueRangeInitialValue
});
p.fullstackedspline = (0, o.extend)({}, l.chart.spline, f, {
  getValueRangeInitialValue: r.chart.area.getValueRangeInitialValue
});
var m = p.stackedbar = (0, o.extend)({}, h, f, {
  _updateOptions: function (e) {
    f._updateOptions.call(this, e);
    this._stackName = this._stackName + "_stack_" + (e.stack || "default");
  }
});
function _(e, t, n, i) {
  (e = (0, d.clone)(e)).value = t;
  e.minValue = n;
  e.translate();
  e.argument = e.argument + i;
  return e;
}
function v(e) {
  var t;
  var n;
  for (var i = 0, o = [], a = e.length; i < a;) {
    n = [t = e[i]];
    if (t.leftHole) {
      n = [_(t, t.leftHole, t.minLeftHole, "left"), t];
    }
    if (t.rightHole) {
      n.push(_(t, t.rightHole, t.minRightHole, "right"));
    }
    o.push(n);
    i++;
  }
  return [].concat.apply([], o);
}
p.fullstackedbar = (0, o.extend)({}, h, f, {
  _updateOptions: m._updateOptions
});
p.stackedarea = (0, o.extend)({}, c, f, {
  _prepareSegment: function (e, t) {
    return c._prepareSegment.call(this, v(e), t);
  },
  _appendInGroup: function () {
    this._group.append(this._extGroups.seriesGroup).toBackground();
  }
});
p.stackedsplinearea = (0, o.extend)({}, r.chart.splinearea, f, {
  _prepareSegment: function (e, t) {
    var n;
    var i = this;
    e = v(e);
    if (this._prevSeries && e.length !== 1) {
      var o = l.chart.spline._calculateBezierPoints(e, t);
      var s = (0, u.map)(e, function (e) {
        var t = e.getCoords(true);
        t.argument = e.argument;
        return t;
      });
      var d = [];
      var c = {};
      for (var h = 0, f = i._prevSeries._segments.length; h < f;) {
        d = d.concat(i._prevSeries._segments[h].line);
        h++;
      }
      (0, a.each)(d, function (e, t) {
        if (t.argument !== null) {
          var n = t.argument.valueOf();
          if (c[n]) {
            c[n].push(t);
          } else {
            c[n] = [t];
          }
        }
      });
      i._prevSeries._segmentByArg = c;
      s = l.chart.spline._calculateBezierPoints(s, t);
      (0, a.each)(s, function (e, t) {
        var n;
        var o = t.argument.valueOf();
        if (e % 3 == 0 && (n = c[o] || function (e, t) {
          for (var n; !n && e;) {
            n = e._segmentByArg && e._segmentByArg[t];
            e = e._prevSeries;
          }
          return n;
        }(i._prevSeries, o))) {
          if (s[e - 1] && n[0]) {
            s[e - 1] = n[0];
          }
          s[e + 1] &&= n[2] || t;
        }
      });
      n = {
        line: o,
        area: o.concat(s.reverse())
      };
      i._areaPointsToSplineAreaPoints(n.area);
    } else {
      n = r.chart.splinearea._prepareSegment.call(this, e, t);
    }
    return n;
  },
  _appendInGroup: p.stackedarea._appendInGroup
});
p.fullstackedarea = (0, o.extend)({}, c, f, {
  _prepareSegment: p.stackedarea._prepareSegment,
  _appendInGroup: p.stackedarea._appendInGroup
});
p.fullstackedsplinearea = (0, o.extend)({}, r.chart.splinearea, f, {
  _prepareSegment: p.stackedsplinearea._prepareSegment,
  _appendInGroup: p.stackedarea._appendInGroup
});
g.stackedbar = (0, o.extend)({}, s.polar.bar, f, {});