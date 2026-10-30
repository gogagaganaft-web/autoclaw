exports.AppointmentViewModelGenerator = undefined;
var i = d(require("./27845.js"));
var o = d(require("./10142.js"));
var a = d(require("./52359.js"));
var r = d(require("./34794.js"));
var s = d(require("./71991.js"));
var l = d(require("./69219.js"));
var u = require("./84154.js");
function d(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
function c() {
  return (c = Object.assign ? Object.assign.bind() : function (e) {
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
var h = {
  horizontal: a.default,
  horizontalMonth: s.default,
  horizontalMonthLine: r.default,
  vertical: i.default,
  week: o.default,
  agenda: l.default
};
var f = function () {
  function e() {}
  var t = e.prototype;
  t.initRenderingStrategy = function (e) {
    var t = h[e.appointmentRenderingStrategyName];
    this.renderingStrategy = new t(e);
  };
  t.generate = function (e, t) {
    var n = t.isRenovatedAppointments;
    var i = e ? e.slice() : [];
    this.initRenderingStrategy(t);
    var o = this.getRenderingStrategy().createTaskPositionMap(i);
    var a = this.postProcess(i, o, n);
    if (n) {
      return this.makeRenovatedViewModels(a, t.supportAllDayRow, t.isVerticalGroupOrientation);
    } else {
      return {
        positionMap: o,
        viewModel: a
      };
    }
  };
  t.postProcess = function (e, t, n) {
    var i = this.getRenderingStrategy();
    return e.map(function (e, o) {
      if (!i.keepAppointmentSettings()) {
        delete e.settings;
      }
      var a = t[o];
      a.forEach(function (e) {
        e.direction = i.getDirection() !== "vertical" || e.allDay ? "horizontal" : "vertical";
      });
      var r = {
        itemData: e,
        settings: a
      };
      if (!n) {
        r.needRepaint = true;
        r.needRemove = false;
      }
      return r;
    });
  };
  t.makeRenovatedViewModels = function (e, t, n) {
    var i = this;
    var o = this.getRenderingStrategy();
    var a = [];
    var r = [];
    var s = [];
    var l = t && !n;
    e.forEach(function (e) {
      var t = e.itemData;
      e.settings.forEach(function (e) {
        var n = i.prepareViewModel(e, o, t);
        if (e.isCompact) {
          s.push({
            compactViewModel: e.virtual,
            appointmentViewModel: n
          });
        } else if (e.allDay && l) {
          r.push(n);
        } else {
          a.push(n);
        }
      });
    });
    var u = this.prepareCompactViewModels(s, t);
    return c({
      allDay: r,
      regular: a
    }, u);
  };
  t.prepareViewModel = function (e, t, n) {
    var i = t.getAppointmentGeometry(e);
    return {
      key: (0, u.getAppointmentKey)(i),
      appointment: n,
      geometry: c({}, i, {
        leftVirtualWidth: e.leftVirtualWidth,
        topVirtualHeight: e.topVirtualHeight
      }),
      info: c({}, e.info, {
        allDay: e.allDay,
        direction: e.direction,
        appointmentReduced: e.appointmentReduced,
        groupIndex: e.groupIndex
      })
    };
  };
  t.getCompactViewModelFrame = function (e) {
    return {
      isAllDay: !!e.isAllDay,
      isCompact: e.isCompact,
      groupIndex: e.groupIndex,
      geometry: {
        left: e.left,
        top: e.top,
        width: e.width,
        height: e.height
      },
      items: {
        colors: [],
        data: [],
        settings: []
      }
    };
  };
  t.prepareCompactViewModels = function (e, t) {
    var n = this;
    var i = {};
    var o = {};
    e.forEach(function (e) {
      var a = e.compactViewModel;
      var r = e.appointmentViewModel;
      var s = a.index;
      var l = a.isAllDay && t ? o : i;
      l[s] ||= n.getCompactViewModelFrame(a);
      var u = l[s].items;
      var d = u.settings;
      var c = u.data;
      var h = u.colors;
      d.push(r);
      c.push(r.appointment);
      h.push(r.info.resourceColor);
    });
    function a(e) {
      return Object.keys(e).map(function (t) {
        return c({
          key: t
        }, e[t]);
      });
    }
    return {
      allDayCompact: a(o),
      regularCompact: a(i)
    };
  };
  t.getRenderingStrategy = function () {
    return this.renderingStrategy;
  };
  return e;
}();
exports.AppointmentViewModelGenerator = f;