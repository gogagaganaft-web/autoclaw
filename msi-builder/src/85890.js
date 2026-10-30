exports.getDateNavigator = undefined;
var i;
var o = require("./75811.js");
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
var r = ((i = require("./91198.js")) && i.__esModule ? i : {
  default: i
}).default.trimTime;
exports.getDateNavigator = function (e, t) {
  return a({
    widget: "dxButtonGroup",
    cssClass: "dx-scheduler-navigator",
    options: {
      items: [s(e), l(e), u(e)],
      stylingMode: (0, o.isMaterial)() ? "text" : "contained",
      selectionMode: "none",
      onItemClick: function (e) {
        e.itemData.clickHandler(e);
      }
    }
  }, t);
};
function s(e) {
  return {
    key: "previous",
    icon: "chevronprev",
    elementAttr: {
      class: "dx-scheduler-navigator-previous"
    },
    clickHandler: function () {
      return e._updateDateByDirection(-1);
    },
    onContentReady: function (t) {
      var n = t.component;
      n.option("disabled", d(e));
      e._addEvent("min", function () {
        n.option("disabled", d(e));
      });
      e._addEvent("currentDate", function () {
        n.option("disabled", d(e));
      });
      e._addEvent("startViewDate", function () {
        n.option("disabled", d(e));
      });
    }
  };
}
function l(e) {
  return {
    key: "calendar",
    text: e.captionText,
    elementAttr: {
      class: "dx-scheduler-navigator-caption"
    },
    clickHandler: function (t) {
      return e._showCalendar(t);
    },
    onContentReady: function (t) {
      var n = t.component;
      e._addEvent("currentView", function () {
        n.option("text", e.captionText);
      });
      e._addEvent("currentDate", function () {
        n.option("text", e.captionText);
      });
      e._addEvent("startViewDate", function () {
        n.option("text", e.captionText);
      });
      e._addEvent("views", function () {
        n.option("text", e.captionText);
      });
      e._addEvent("firstDayOfWeek", function () {
        n.option("text", e.captionText);
      });
    }
  };
}
function u(e) {
  return {
    key: "next",
    icon: "chevronnext",
    elementAttr: {
      class: "dx-scheduler-navigator-next"
    },
    clickHandler: function () {
      return e._updateDateByDirection(1);
    },
    onContentReady: function (t) {
      var n = t.component;
      n.option("disabled", c(e));
      e._addEvent("min", function () {
        n.option("disabled", c(e));
      });
      e._addEvent("currentDate", function () {
        n.option("disabled", c(e));
      });
      e._addEvent("startViewDate", function () {
        n.option("disabled", c(e));
      });
    }
  };
}
function d(e) {
  var t = e.option("min");
  if (!t) {
    return false;
  }
  t = new Date(t);
  var n = e._getCaption();
  t = r(t);
  return e._getNextDate(-1, n.endDate) < t;
}
function c(e) {
  var t = e.option("max");
  if (!t) {
    return false;
  }
  t = new Date(t);
  var n = e._getCaption();
  t = t.setHours(23, 59, 59);
  return e._getNextDate(1, n.startDate) > t;
}