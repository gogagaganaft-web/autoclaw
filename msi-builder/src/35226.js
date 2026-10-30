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
exports.NotificationManagerStub = exports.NotificationManager = exports.MANAGER_ID_NAME = undefined;
var o = u(require("./73176.js"));
var a = u(require("./68374.js"));
var r = require("./13306.js");
var s = require("./44899.js");
var l = u(require("./55817.js"));
function u(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
function d(e, t) {
  for (var n = 0; n < t.length; n++) {
    var i = t[n];
    i.enumerable = i.enumerable || false;
    i.configurable = true;
    if ("value" in i) {
      i.writable = true;
    }
    Object.defineProperty(e, h(i.key), i);
  }
}
function c(e, t, n) {
  if (t) {
    d(e.prototype, t);
  }
  if (n) {
    d(e, n);
  }
  Object.defineProperty(e, "prototype", {
    writable: false
  });
  return e;
}
function h(e) {
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
}
function f(e, t) {
  e.prototype = Object.create(t.prototype);
  e.prototype.constructor = e;
  p(e, t);
}
function p(e, t) {
  return (p = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (e, t) {
    e.__proto__ = t;
    return e;
  })(e, t);
}
var g = `dx-filemanager-progress-box-error`;
var m = `dx-filemanager-progress-box-image`;
var _ = `dx-filemanager-progress-box-wrapper`;
var v = `dx-filemanager-progress-box-common`;
exports.MANAGER_ID_NAME = "__operationInfoManager";
var y = "default";
var b = "progress";
var x = "error";
var w = "success";
var C = function () {
  function e(e) {
    var t = e.onActionProgressStatusChanged;
    var n = e.isActual;
    this._id = new o.default().toString();
    this._isActual = n || false;
    this._actionProgressStatus = y;
    this._raiseActionProgress = t;
  }
  var t = e.prototype;
  t.getId = function () {
    return this._id;
  };
  t.isActual = function () {
    return this._isActual;
  };
  t.createErrorDetailsProgressBox = function (e, t, n) {
    var i = this._createDetailsItem(e, t);
    this.renderError(i.$wrapper, n);
  };
  t.renderError = function (e, t) {
    (0, a.default)("<div>").text(t).addClass(g).appendTo(e);
  };
  t.isActionProgressStatusDefault = function () {
    return this._actionProgressStatus === y;
  };
  t._createDetailsItem = function (e, t) {
    var n = (0, a.default)("<div>").appendTo(e);
    return this._createProgressBox(n, {
      commonText: t.commonText,
      imageUrl: t.imageUrl
    });
  };
  t._createProgressBox = function (e, t) {
    e.addClass("dx-filemanager-progress-box");
    if (t.imageUrl) {
      (0, s.getImageContainer)(t.imageUrl).addClass(m).appendTo(e);
    }
    var n = (0, a.default)("<div>").addClass(_).appendTo(e);
    return {
      $commonText: (0, a.default)("<div>").addClass(v).text(t.commonText).appendTo(n),
      $element: e,
      $wrapper: n
    };
  };
  return e;
}();
var S = function (e) {
  function t() {
    return e.apply(this, arguments) || this;
  }
  f(t, e);
  var n = t.prototype;
  n.addOperation = function () {
    e = {};
    t = "__operationInfoManager";
    n = this._id;
    if ((t = h(t)) in e) {
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
    var e;
    var t;
    var n;
  };
  n.addOperationDetails = function () {};
  n.updateOperationItemProgress = function () {};
  n.completeOperationItem = function () {};
  n.finishOperation = function () {};
  n.completeOperation = function () {};
  n.completeSingleOperationWithError = function () {};
  n.addOperationDetailsError = function () {};
  n.handleDimensionChanged = function () {
    return false;
  };
  n.ensureProgressPanelCreated = function () {};
  n.tryHideActionProgress = function () {
    this._updateActionProgress("", y);
  };
  n.updateActionProgressStatus = function () {
    this._updateActionProgress("", y);
  };
  n._updateActionProgress = function (e, t) {
    if (t === y || t === b) {
      this._actionProgressStatus = t;
      this._raiseActionProgress(e, t);
    }
  };
  n.hasNoOperations = function () {
    return true;
  };
  c(t, [{
    key: "_operationInProgressCount",
    get: function () {
      return 0;
    },
    set: function (e) {}
  }, {
    key: "_failedOperationCount",
    get: function () {
      return 0;
    },
    set: function (e) {}
  }]);
  return t;
}(C);
exports.NotificationManagerStub = S;
var k = function (e) {
  function t(t) {
    var n;
    (n = e.call(this, t) || this)._failedOperationCount = 0;
    n._operationInProgressCount = 0;
    return n;
  }
  f(t, e);
  var n = t.prototype;
  n.addOperation = function (e, t, n) {
    this._operationInProgressCount++;
    var i = this._progressPanel.addOperation(e, t, n);
    i.__operationInfoManager = this._id;
    this._updateActionProgress(e, b);
    return i;
  };
  n.addOperationDetails = function (e, t, n) {
    this._progressPanel.addOperationDetails(e, t, n);
  };
  n.updateOperationItemProgress = function (e, t, n, i) {
    this._progressPanel.updateOperationItemProgress(e, t, n, i);
  };
  n.completeOperationItem = function (e, t, n) {
    this._progressPanel.completeOperationItem(e, t, n);
  };
  n.finishOperation = function (e, t) {
    this._progressPanel.updateOperationCommonProgress(e, t);
  };
  n.completeOperation = function (e, t, n, i) {
    this._operationInProgressCount--;
    if (n) {
      this._failedOperationCount++;
    }
    this._progressPanel.completeOperation(e, t, n, i);
  };
  n.completeSingleOperationWithError = function (e, t) {
    this._progressPanel.completeSingleOperationWithError(e, t.detailErrorText);
    this._notifyError(t);
  };
  n.addOperationDetailsError = function (e, t) {
    this._progressPanel.addOperationDetailsError(e, t.itemIndex, t.detailErrorText);
    this._notifyError(t);
  };
  n.handleDimensionChanged = function () {
    if (this._progressPanel) {
      this._progressPanel.$element().detach();
    }
    return true;
  };
  n.ensureProgressPanelCreated = function (e, t) {
    var n = this;
    if (this._progressPanel) {
      this._progressPanel.$element().appendTo(e);
    } else {
      var i = (0, a.default)("<div>").appendTo(e);
      var o = this._getProgressPanelComponent();
      this._progressPanel = new o(i, (0, r.extend)({}, t, {
        onOperationClosed: function (e) {
          var t = e.info;
          return n._onProgressPanelOperationClosed(t);
        }
      }));
    }
  };
  n._getProgressPanelComponent = function () {
    return l.default;
  };
  n._onProgressPanelOperationClosed = function (e) {
    if (e.hasError) {
      this._failedOperationCount--;
      this.tryHideActionProgress();
    }
  };
  n.tryHideActionProgress = function () {
    if (this.hasNoOperations()) {
      this._updateActionProgress("", y);
    }
  };
  n.updateActionProgressStatus = function (e) {
    if (e) {
      var t = this._failedOperationCount === 0 ? w : x;
      this._updateActionProgress("", t);
    }
  };
  n._notifyError = function (e) {
    var t = this.hasNoOperations() ? y : x;
    this._updateActionProgress(e.commonErrorText, t);
  };
  n._updateActionProgress = function (e, t) {
    this._actionProgressStatus = t;
    this._raiseActionProgress(e, t);
  };
  n.hasNoOperations = function () {
    return this._operationInProgressCount === 0 && this._failedOperationCount === 0;
  };
  c(t, [{
    key: "_operationInProgressCount",
    get: function () {
      return this._operationInProgressCountInternal;
    },
    set: function (e) {
      this._operationInProgressCountInternal = e;
    }
  }, {
    key: "_failedOperationCount",
    get: function () {
      return this._failedOperationCountInternal;
    },
    set: function (e) {
      this._failedOperationCountInternal = e;
    }
  }]);
  return t;
}(C);
exports.NotificationManager = k;