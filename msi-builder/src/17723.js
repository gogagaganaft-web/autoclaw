function i(e) {
  return (i = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function (e) {
    return typeof e;
  } : function (e) {
    if (e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype) {
      return "symbol";
    } else {
      return typeof e;
    }
  })(e);
}
exports.default = undefined;
var o = require("./58664.js");
var a = p(require("./68374.js"));
var r = require("./13306.js");
var s = require("./35922.js");
var l = require("./62754.js");
var u = require("./58201.js");
var d = p(require("./14390.js"));
var c = p(require("./51495.js"));
var h = p(require("./32089.js"));
var f = require("./35226.js");
function p(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
function g(e, t, n) {
  if ((t = function (e) {
    var t = function (e, t) {
      if (i(e) !== "object" || e === null) {
        return e;
      }
      var n = e[Symbol.toPrimitive];
      if (n !== undefined) {
        var o = n.call(e, t || "default");
        if (i(o) !== "object") {
          return o;
        }
        throw new TypeError("@@toPrimitive must return a primitive value.");
      }
      return (t === "string" ? String : Number)(e);
    }(e, "string");
    if (i(t) === "symbol") {
      return t;
    } else {
      return String(t);
    }
  }(t)) in e) {
    Object.defineProperty(e, t, {
      value: n,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    e[t] = n;
  }
  return e;
}
function m(e, t) {
  return (m = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (e, t) {
    e.__proto__ = t;
    return e;
  })(e, t);
}
var _ = (0, u.getWindow)();
var v = `dx-filemanager-notification-drawer`;
var y = `${v}-panel`;
var b = `dx-filemanager-notification-popup`;
var x = `dx-filemanager-notification-popup-error`;
var w = `dx-filemanager-notification-common`;
var C = `dx-filemanager-notification-separator`;
var S = `dx-filemanager-notification-details`;
var k = `dx-filemanager-notification-common-no-item`;
var D = function (e) {
  var t;
  var n;
  function i() {
    return e.apply(this, arguments) || this;
  }
  n = e;
  (t = i).prototype = Object.create(n.prototype);
  t.prototype.constructor = t;
  m(t, n);
  var d = i.prototype;
  d._initMarkup = function () {
    var t = this;
    e.prototype._initMarkup.call(this);
    this._initActions();
    this._isInAdaptiveState = this._isSmallScreen();
    this._managerMap = {};
    this._notificationManagerStubId = null;
    this._setNotificationManager();
    var n = this.option("progressPanelContainer");
    var i = (0, a.default)("<div>").addClass(v).appendTo(n);
    (0, a.default)("<div>").addClass(y).appendTo(i);
    var o = (0, r.extend)({
      opened: false,
      position: "right",
      template: function (e) {
        return t._ensureProgressPanelCreated(e);
      }
    }, this._getProgressDrawerAdaptiveOptions());
    this._progressDrawer = this._createComponent(i, h.default, o);
    var l = i.find(`.${y}`).first();
    var u = this.option("contentTemplate");
    if ((0, s.isFunction)(u)) {
      u(l, this);
    }
  };
  d._setNotificationManager = function (e) {
    e = (0, r.extend)({
      onActionProgressStatusChanged: this._raiseActionProgress.bind(this)
    }, e);
    if (!this._notificationManagerStubId) {
      var t = new f.NotificationManagerStub(e);
      this._notificationManagerStubId = t.getId();
      this._managerMap[this._notificationManagerStubId] = t;
    }
    if (!this._isProgressDrawerDisabled()) {
      var n = this._getProgressManagerComponent();
      e.isActual = true;
      var i = new n(e);
      this._managerMap[i.getId()] = i;
    }
  };
  d._getNotificationManager = function (e) {
    var t = (e == null ? undefined : e[f.MANAGER_ID_NAME]) || this._getActualNotificationManagerId();
    return this._managerMap[t] || this._managerMap[this._notificationManagerStubId];
  };
  d._clearManagerMap = function () {
    var e = this._managerMap[this._notificationManagerStubId];
    delete this._managerMap;
    this._managerMap = g({}, this._notificationManagerStubId, e);
  };
  d._getActualNotificationManagerId = function () {
    var e = this;
    return Object.keys(this._managerMap).filter(function (t) {
      return e._managerMap[t].isActual();
    })[0];
  };
  d.tryShowProgressPanel = function () {
    var e = this;
    var t = new l.Deferred();
    var n = this._getNotificationManager();
    if (n.isActionProgressStatusDefault() || this._isProgressDrawerOpened() || this._isProgressDrawerDisabled()) {
      return t.resolve().promise();
    } else {
      setTimeout(function () {
        e._progressDrawer.show().done(t.resolve);
        e._hidePopup();
        n.tryHideActionProgress();
      });
      return t.promise();
    }
  };
  d.addOperation = function (e, t, n) {
    return this._getNotificationManager().addOperation(e, t, n);
  };
  d.addOperationDetails = function (e, t, n) {
    this._getNotificationManager(e).addOperationDetails(e, t, n);
  };
  d.updateOperationItemProgress = function (e, t, n, i) {
    this._getNotificationManager(e).updateOperationItemProgress(e, t, n, i);
  };
  d.completeOperationItem = function (e, t, n) {
    this._getNotificationManager(e).completeOperationItem(e, t, n);
  };
  d.finishOperation = function (e, t) {
    this._getNotificationManager(e).finishOperation(e, t);
  };
  d.completeOperation = function (e, t, n, i) {
    var o = this._getNotificationManager(e);
    if (!n) {
      this._showPopup(t);
    }
    o.completeOperation(e, t, n, i);
    if (this._isProgressDrawerOpened() && o.hasNoOperations()) {
      o.tryHideActionProgress();
    } else {
      o.updateActionProgressStatus(e);
    }
  };
  d.completeSingleOperationWithError = function (e, t) {
    this._getNotificationManager(e).completeSingleOperationWithError(e, t);
    this._showPopupError(t);
  };
  d.addOperationDetailsError = function (e, t) {
    this._getNotificationManager(e).addOperationDetailsError(e, t);
    this._showPopupError(t);
  };
  d._hideProgressPanel = function () {
    var e = this;
    setTimeout(function () {
      return e._progressDrawer.hide();
    });
  };
  d._isSmallScreen = function () {
    return !!(0, u.hasWindow)() && (0, o.getWidth)(_) <= 1000;
  };
  d._dimensionChanged = function (e) {
    if (!e || e !== "height") {
      this._checkAdaptiveState();
    }
  };
  d._checkAdaptiveState = function () {
    var e = this._isInAdaptiveState;
    if ((this._isInAdaptiveState = this._isSmallScreen(), e !== this._isInAdaptiveState && this._progressDrawer) && this._getNotificationManager().handleDimensionChanged()) {
      var t = this._getProgressDrawerAdaptiveOptions();
      this._progressDrawer.option(t);
    }
  };
  d._getProgressDrawerAdaptiveOptions = function () {
    if (this._isInAdaptiveState) {
      return {
        openedStateMode: "overlap",
        shading: true,
        hideOnOutsideClick: true
      };
    } else {
      return {
        openedStateMode: "shrink",
        shading: false,
        hideOnOutsideClick: false
      };
    }
  };
  d._ensureProgressPanelCreated = function (e) {
    var t = this;
    this._getNotificationManager().ensureProgressPanelCreated(e, {
      onOperationCanceled: function (e) {
        var n = e.info;
        return t._raiseOperationCanceled(n);
      },
      onOperationItemCanceled: function (e) {
        var n = e.item;
        var i = e.itemIndex;
        return t._raiseOperationItemCanceled(n, i);
      },
      onPanelClosed: function () {
        return t._hideProgressPanel();
      }
    });
  };
  d._getProgressManagerComponent = function () {
    return f.NotificationManager;
  };
  d._isProgressDrawerDisabled = function () {
    return !this.option("showProgressPanel");
  };
  d._isProgressDrawerOpened = function () {
    return this._progressDrawer.option("opened");
  };
  d._hidePopup = function (e) {
    if (this.option("showNotificationPopup") || e) {
      this._getNotificationPopup().hide();
    }
  };
  d._showPopup = function (e, t) {
    if (!this._isProgressDrawerOpened() && this.option("showNotificationPopup")) {
      this._getNotificationPopup().$wrapper().toggleClass(x, !!t);
      this._getNotificationPopup().option("contentTemplate", e);
      if (!this._getNotificationPopup().option("visible")) {
        this._getNotificationPopup().show();
      }
    }
  };
  d._showPopupError = function (e) {
    if (this.option("showNotificationPopup")) {
      var t = this._getNotificationManager();
      var n = (0, a.default)("<div>");
      var i = (0, a.default)("<div>").addClass(w).text(e.commonErrorText);
      var o = (0, a.default)("<div>").addClass(C);
      (0, a.default)("<div>").appendTo(o);
      var r = (0, a.default)("<div>").addClass(S);
      if (e.item) {
        t.createErrorDetailsProgressBox(r, e.item, e.detailErrorText);
      } else {
        i.addClass(k);
        t.renderError(r, e.detailErrorText);
      }
      n.append(i, o, r);
      this._showPopup(n, true);
    }
  };
  d._getNotificationPopup = function () {
    if (!this._notificationPopup) {
      var e = (0, a.default)("<div>").appendTo(this.$element());
      this._notificationPopup = this._createComponent(e, c.default, {
        container: this.$element(),
        width: "auto",
        height: "auto",
        showTitle: false,
        dragEnabled: false,
        shading: false,
        visible: false,
        hideOnOutsideClick: true,
        animation: {
          duration: 0
        },
        position: {
          my: "right top",
          at: "right top",
          of: this.option("positionTarget"),
          offset: "-10 -5"
        },
        _wrapperClassExternal: b
      });
    }
    return this._notificationPopup;
  };
  d._raiseActionProgress = function (e, t) {
    this._actions.onActionProgress({
      message: e,
      status: t
    });
  };
  d._raiseOperationCanceled = function (e) {
    this._actions.onOperationCanceled({
      info: e
    });
  };
  d._raiseOperationItemCanceled = function (e, t) {
    this._actions.onOperationItemCanceled({
      item: e,
      itemIndex: t
    });
  };
  d._initActions = function () {
    this._actions = {
      onActionProgress: this._createActionByOption("onActionProgress"),
      onOperationCanceled: this._createActionByOption("onOperationCanceled"),
      onOperationItemCanceled: this._createActionByOption("onOperationItemCanceled")
    };
  };
  d._getDefaultOptions = function () {
    return (0, r.extend)(e.prototype._getDefaultOptions.call(this), {
      progressPanelContainer: null,
      contentTemplate: null,
      onActionProgress: null,
      onOperationCanceled: null,
      onOperationItemCanceled: null,
      showProgressPanel: true,
      showNotificationPopup: true
    });
  };
  d._optionChanged = function (t) {
    var n = t.name;
    switch (n) {
      case "progressPanelContainer":
      case "contentTemplate":
        break;
      case "showProgressPanel":
        this._setNotificationManager();
        this._getNotificationManager().updateActionProgressStatus();
        if (!t.value) {
          this._hideProgressPanel();
          this._clearManagerMap();
        }
        this._progressDrawer.repaint();
        break;
      case "showNotificationPopup":
        if (!t.value) {
          this._hidePopup(true);
        }
        break;
      case "onActionProgress":
      case "onOperationCanceled":
      case "onOperationItemCanceled":
        this._actions[n] = this._createActionByOption(n);
        break;
      default:
        e.prototype._optionChanged.call(this, t);
    }
  };
  return i;
}(d.default);
exports.default = D;
module.exports = exports.default;
module.exports.default = exports.default;