exports.getValidGroups = exports.getCurrentViewProps = exports.getCurrentViewConfig = exports.getCurrentView = undefined;
exports.getViewConfigProp = c;
var i = require("./35922.js");
var o = ["height", "scrolling", "width"];
function a() {
  return (a = Object.assign ? Object.assign.bind() : function (e) {
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
function r(e, t) {
  if (e == null) {
    return {};
  }
  var n;
  var i;
  var o = function (e, t) {
    if (e == null) {
      return {};
    }
    var n;
    var i;
    var o = {};
    var a = Object.keys(e);
    for (i = 0; i < a.length; i++) {
      n = a[i];
      if (!(t.indexOf(n) >= 0)) {
        o[n] = e[n];
      }
    }
    return o;
  }(e, t);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (i = 0; i < a.length; i++) {
      n = a[i];
      if (!(t.indexOf(n) >= 0)) {
        if (Object.prototype.propertyIsEnumerable.call(e, n)) {
          o[n] = e[n];
        }
      }
    }
  }
  return o;
}
function s(e, t) {
  return function (e) {
    if (Array.isArray(e)) {
      return e;
    }
  }(e) || function (e, t) {
    var n = e == null ? null : typeof Symbol != "undefined" && e[Symbol.iterator] || e["@@iterator"];
    if (n != null) {
      var i;
      var o;
      var a;
      var r;
      var s = [];
      var l = true;
      var u = false;
      try {
        a = (n = n.call(e)).next;
        if (t === 0) {
          if (Object(n) !== n) {
            return;
          }
          l = false;
        } else {
          for (; !(l = (i = a.call(n)).done) && (s.push(i.value), s.length !== t); l = true);
        }
      } catch (e) {
        u = true;
        o = e;
      } finally {
        try {
          if (!l && n.return != null && (r = n.return(), Object(r) !== r)) {
            return;
          }
        } finally {
          if (u) {
            throw o;
          }
        }
      }
      return s;
    }
  }(e, t) || function (e, t) {
    if (!e) {
      return;
    }
    if (typeof e == "string") {
      return l(e, t);
    }
    var n = Object.prototype.toString.call(e).slice(8, -1);
    if (n === "Object" && e.constructor) {
      n = e.constructor.name;
    }
    if (n === "Map" || n === "Set") {
      return Array.from(e);
    }
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) {
      return l(e, t);
    }
  }(e, t) || function () {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }();
}
function l(e, t) {
  if (t == null || t > e.length) {
    t = e.length;
  }
  for (var n = 0, i = new Array(t); n < t; n++) {
    i[n] = e[n];
  }
  return i;
}
var u = ["day", "week", "workWeek", "month", "timelineDay", "timelineWeek", "timelineWorkWeek", "timelineMonth", "agenda"];
function d(e, t) {
  var n = t.find(function (t) {
    return !!((0, i.isObject)(t) ? [t.name, t.type] : [t]).includes(e);
  });
  if (n === undefined) {
    n = u.includes(e) ? e : s(t, 1)[0];
  }
  return n;
}
exports.getCurrentView = d;
function c(e, t) {
  if (t !== undefined) {
    return t;
  } else {
    return e;
  }
}
exports.getCurrentViewProps = function (e, t) {
  var n = d(e, t);
  if ((0, i.isString)(n)) {
    return {
      type: n
    };
  } else {
    return n;
  }
};
exports.getCurrentViewConfig = function (e, t, n) {
  t.height;
  var i = t.scrolling;
  t.width;
  var s = r(t, o);
  var l = e.scrolling;
  var u = i.mode === "virtual" || (l == null ? undefined : l.mode) === "virtual";
  var d = t.crossScrollingEnabled || u;
  var c = a({
    scrolling: i
  }, s, e, {
    schedulerHeight: t.height,
    schedulerWidth: t.width,
    crossScrollingEnabled: d,
    appointmentTemplate: e.appointmentTemplate || s.appointmentTemplate,
    dataCellTemplate: e.dataCellTemplate || s.dataCellTemplate,
    dateCellTemplate: e.dateCellTemplate || s.dateCellTemplate,
    timeCellTemplate: e.timeCellTemplate || s.timeCellTemplate,
    resourceCellTemplate: e.resourceCellTemplate || s.resourceCellTemplate,
    appointmentCollectorTemplate: e.appointmentCollectorTemplate || s.appointmentCollectorTemplate,
    appointmentTooltipTemplate: e.appointmentTooltipTemplate || s.appointmentTooltipTemplate,
    allDayPanelMode: e.allDayPanelMode || s.allDayPanelMode
  });
  return a({}, c, {
    hoursInterval: c.cellDuration / 60,
    allDayPanelExpanded: true,
    allowMultipleCellSelection: true,
    currentDate: n
  });
};
exports.getValidGroups = function (e, t) {
  return c(e, t);
};