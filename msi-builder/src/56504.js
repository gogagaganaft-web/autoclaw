exports.default = undefined;
var i = u(require("./68374.js"));
var o = u(require("./42160.js"));
var a = require("./13306.js");
var r = require("./27728.js");
var s = require("./27047.js");
var l = require("./62754.js");
function u(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
var d = function () {
  function e(e) {
    this.scheduler = e;
    this.workspace = e._workSpace;
    this.appointments = e._appointments;
    this.initialPosition = {
      left: 0,
      top: 0
    };
    this.appointmentInfo = null;
    this.dragBetweenComponentsPromise = null;
  }
  var t = e.prototype;
  t.isAllDay = function (e) {
    return e.data("dxAppointmentSettings").allDay;
  };
  t.onDragStart = function (e) {
    var t = e.itemSettings;
    var n = e.itemData;
    var i = e.initialPosition;
    this.initialPosition = i;
    this.appointmentInfo = {
      appointment: n,
      settings: t
    };
    this.appointments.notifyObserver("hideAppointmentTooltip");
  };
  t.onDragMove = function (e) {
    if (e.fromComponent !== e.toComponent) {
      this.appointments.notifyObserver("removeDroppableCellClass");
    }
  };
  t.getAppointmentElement = function (e) {
    var t = e.event.data && e.event.data.itemElement || e.itemElement;
    return (0, i.default)(t);
  };
  t.onDragEnd = function (e) {
    var t = this.getAppointmentElement(e);
    var n = this.appointments._getItemData(t);
    this.appointments._getAppointmentContainer(this.isAllDay(t)).append(t);
    var i = this.workspace.getDroppableCellIndex();
    var o = this.workspace.getCellIndexByCoordinates(this.initialPosition);
    this.appointments.notifyObserver("updateAppointmentAfterDrag", {
      event: e,
      element: t,
      rawAppointment: n,
      newCellIndex: i,
      oldCellIndex: o
    });
  };
  t.onDragCancel = function () {
    this.removeDroppableClasses();
  };
  t.getItemData = function (e) {
    var t = (0, i.default)(e).data(r.LIST_ITEM_DATA_KEY);
    var n = t == null ? undefined : t.appointment;
    var o = this.appointments._getItemData(e);
    return n || o;
  };
  t.getItemSettings = function (e) {
    var t = (0, i.default)(e).data(r.LIST_ITEM_DATA_KEY);
    return t && t.settings || [];
  };
  t.createDragStartHandler = function (e, t) {
    var n = this;
    return function (i) {
      i.itemData = n.getItemData(i.itemElement);
      i.itemSettings = n.getItemSettings(i.itemElement);
      if (t.onDragStart) {
        t.onDragStart(i);
      }
      if (!i.cancel) {
        e.onDragStart(i);
      }
    };
  };
  t.createDragMoveHandler = function (e, t) {
    return function (n) {
      if (t.onDragMove) {
        t.onDragMove(n);
      }
      if (!n.cancel) {
        e.onDragMove(n);
      }
    };
  };
  t.createDragEndHandler = function (e, t) {
    var n = this;
    return function (i) {
      var o = n.appointments.invoke("getUpdatedData", i.itemData);
      n.appointmentInfo = null;
      i.toItemData = (0, a.extend)({}, i.itemData, o);
      if (t.onDragEnd) {
        t.onDragEnd(i);
      }
      if (!i.cancel) {
        e.onDragEnd(i);
        if (i.fromComponent !== i.toComponent && t.onRemove) {
          t.onRemove(i);
        }
      }
      if (i.cancel === true) {
        n.removeDroppableClasses();
      }
      if (i.cancel !== true && (0, s.isSchedulerComponent)(i.toComponent)) {
        i.toComponent._getDragBehavior().dragBetweenComponentsPromise = new l.Deferred();
      }
    };
  };
  t.createDropHandler = function (e) {
    var t = this;
    return function (n) {
      var i = t.appointments.invoke("getUpdatedData", n.itemData);
      n.itemData = (0, a.extend)({}, n.itemData, i);
      if (n.fromComponent !== n.toComponent && e.onAdd) {
        e.onAdd(n);
      }
      if (t.dragBetweenComponentsPromise) {
        t.dragBetweenComponentsPromise.resolve();
      }
    };
  };
  t.addTo = function (e, t) {
    var n = this.scheduler.option("appointmentDragging") || {};
    var i = (0, a.extend)({
      component: this.scheduler,
      contentTemplate: null,
      filter: `.dx-scheduler-appointment`,
      immediate: false,
      onDragStart: this.onDragStart.bind(this),
      onDragMove: this.onDragMove.bind(this),
      onDragEnd: this.onDragEnd.bind(this),
      onDragCancel: this.onDragCancel.bind(this)
    }, t);
    this.appointments._createComponent(e, o.default, (0, a.extend)({}, i, n, {
      onDragStart: this.createDragStartHandler(i, n),
      onDragMove: this.createDragMoveHandler(i, n),
      onDragEnd: this.createDragEndHandler(i, n),
      onDrop: this.createDropHandler(n),
      onCancelByEsc: true
    }));
  };
  t.updateDragSource = function (e, t) {
    var n = this.appointmentInfo;
    if (n || e) {
      var i = e || n.appointment;
      var o = t || n.settings;
      this.appointments._setDragSourceAppointment(i, o);
    }
  };
  t.removeDroppableClasses = function () {
    this.appointments._removeDragSourceClassFromDraggedAppointment();
    this.workspace.removeDroppableCellClass();
  };
  return e;
}();
exports.default = d;
module.exports = exports.default;
module.exports.default = exports.default;