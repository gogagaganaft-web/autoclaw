exports.default = undefined;
var i = h(require("./68374.js"));
var o = require("./13306.js");
var a = require("./20576.js");
var r = require("./44899.js");
var s = h(require("./28109.js"));
var l = h(require("./14390.js"));
var u = h(require("./28080.js"));
var d = h(require("./63008.js"));
var c = h(require("./4741.js"));
function h(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
function f(e, t) {
  return (f = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (e, t) {
    e.__proto__ = t;
    return e;
  })(e, t);
}
var p = `dx-filemanager-progress-panel-container`;
var g = `dx-filemanager-progress-panel-title`;
var m = `dx-filemanager-progress-panel-title-text`;
var _ = `dx-filemanager-progress-panel-close-button`;
var v = `dx-filemanager-progress-panel-infos-container`;
var y = `dx-filemanager-progress-panel-separator`;
var b = `dx-filemanager-progress-panel-info`;
var x = `dx-filemanager-progress-panel-common`;
var w = `dx-filemanager-progress-panel-info-with-details`;
var C = `dx-filemanager-progress-panel-details`;
var S = `dx-filemanager-progress-box-error`;
var k = `dx-filemanager-progress-box-without-close-button`;
var D = `dx-filemanager-progress-box-image`;
var I = `dx-filemanager-progress-box-wrapper`;
var T = `dx-filemanager-progress-box-common`;
var E = `dx-filemanager-progress-box-progress-bar`;
var O = `dx-filemanager-progress-box-close-button`;
var A = function (e) {
  var t;
  var n;
  function l() {
    return e.apply(this, arguments) || this;
  }
  n = e;
  (t = l).prototype = Object.create(n.prototype);
  t.prototype.constructor = t;
  f(t, n);
  var h = l.prototype;
  h._initMarkup = function () {
    var t = this;
    e.prototype._initMarkup.call(this);
    this._initActions();
    this._operationCount = 0;
    this.$element().addClass("dx-filemanager-progress-panel");
    var n = (0, i.default)("<div>").appendTo(this.$element());
    var o = (0, i.default)("<div>").addClass(p).appendTo(n);
    this._scrollView = this._createComponent(n, c.default, {
      scrollByContent: true,
      scrollByThumb: true,
      showScrollbar: "onScroll"
    });
    var a = (0, i.default)("<div>").addClass(g).appendTo(o);
    (0, i.default)("<div>").text(s.default.format("dxFileManager-notificationProgressPanelTitle")).addClass(m).appendTo(a);
    var r = (0, i.default)("<div>").addClass(_).appendTo(a);
    this._createComponent(r, d.default, {
      icon: "close",
      stylingMode: "text",
      onClick: function () {
        return t._raisePanelClosed();
      }
    });
    this._$infosContainer = (0, i.default)("<div>").addClass(v).appendTo(o);
    this._renderEmptyListText();
  };
  h._getDefaultOptions = function () {
    return (0, o.extend)(e.prototype._getDefaultOptions.call(this), {
      onOperationClosed: null,
      onOperationCanceled: null,
      onOperationItemCanceled: null,
      onPanelClosed: null
    });
  };
  h._initActions = function () {
    this._actions = {
      onOperationClosed: this._createActionByOption("onOperationClosed"),
      onOperationCanceled: this._createActionByOption("onOperationCanceled"),
      onOperationItemCanceled: this._createActionByOption("onOperationItemCanceled"),
      onPanelClosed: this._createActionByOption("onPanelClosed")
    };
  };
  h._optionChanged = function (t) {
    var n = t.name;
    switch (n) {
      case "test":
        break;
      case "onOperationClosed":
      case "onOperationCanceled":
      case "onOperationItemCanceled":
        this._actions[n] = this._createActionByOption(n);
        break;
      default:
        e.prototype._optionChanged.call(this, t);
    }
  };
  h.addOperation = function (e, t, n) {
    var o = this;
    if (this._operationCount) {
      (0, i.default)("<div>").addClass(y).prependTo(this._$infosContainer);
    } else {
      this._$infosContainer.empty();
    }
    this._operationCount++;
    var r = {
      customCloseHandling: t,
      allowProgressAutoUpdate: (0, a.ensureDefined)(n, true)
    };
    var s = (0, i.default)("<div>").addClass(b).prependTo(this._$infosContainer);
    r.$info = s;
    var l = (0, i.default)("<div>").addClass(x).appendTo(s);
    r.common = this._createProgressBox(l, {
      commonText: e,
      showCloseButton: true,
      showCloseButtonAlways: t,
      onCloseButtonClick: function () {
        return o._closeOperation(r);
      }
    });
    return r;
  };
  h.addOperationDetails = function (e, t, n) {
    var o = this;
    e.$info.addClass(w);
    var a = (0, i.default)("<div>").addClass(C).appendTo(e.$info);
    e.details = t.map(function (t, i) {
      t.info = e;
      return o._createDetailsItem(a, t, i, false, n);
    });
  };
  h._createDetailsItem = function (e, t, n, o, a) {
    var r = this;
    var s = (0, i.default)("<div>").appendTo(e);
    if (n !== -1) {
      s.addClass("dx-card");
    }
    return this._createProgressBox(s, {
      commonText: t.commonText,
      imageUrl: t.imageUrl,
      skipProgressBox: o,
      showCloseButton: a,
      showCloseButtonAlways: a,
      onCloseButtonClick: function () {
        return r._cancelOperationItem(t, n);
      }
    });
  };
  h.completeOperationItem = function (e, t, n) {
    if (e.allowProgressAutoUpdate) {
      this.updateOperationItemProgress(e, t, 100, n);
    }
    this._setCloseButtonVisible(e.details[t], false);
  };
  h.updateOperationItemProgress = function (e, t, n, i) {
    this.updateOperationCommonProgress(e, i);
    if (e.details) {
      e.details[t].progressBar.option("value", n);
    }
  };
  h.updateOperationCommonProgress = function (e, t) {
    var n;
    if ((n = e.common.progressBar) !== null && n !== undefined) {
      n.option("value", t);
    }
  };
  h.completeOperation = function (e, t, n, i) {
    e.completed = true;
    e.common.$commonText.text(t);
    if (n) {
      this._removeProgressBar(e.common);
    } else if (e.allowProgressAutoUpdate) {
      this.updateOperationCommonProgress(e, 100);
    }
    if (i) {
      this._setProgressBarText(e.common, i);
    }
    this._setCloseButtonVisible(e.common, true);
  };
  h.completeSingleOperationWithError = function (e, t) {
    var i = e.details?.[0];
    e.completed = true;
    this._renderOperationError(i || e.common, t);
    this._setCloseButtonVisible(e.common, true);
    if (i) {
      this._setCloseButtonVisible(i, false);
    }
  };
  h.addOperationDetailsError = function (e, t, n) {
    var i = e.details[t];
    this._renderOperationError(i, n);
    this._setCloseButtonVisible(i, false);
  };
  h._renderError = function (e, t, n) {
    (0, i.default)("<div>").text(n).addClass(S).appendTo(e);
  };
  h._renderEmptyListText = function () {
    this._$infosContainer.text(s.default.format("dxFileManager-notificationProgressPanelEmptyListText"));
  };
  h._renderOperationError = function (e, t) {
    this._removeProgressBar(e);
    this._renderError(e.$wrapper, e.$commonText, t);
  };
  h._removeProgressBar = function (e) {
    if (e.progressBar) {
      e.progressBar.dispose();
      e.progressBar.$element().remove();
      e.progressBar = null;
    }
  };
  h._createProgressBox = function (e, t) {
    var n = this;
    e.addClass("dx-filemanager-progress-box");
    if (!t.showCloseButtonAlways) {
      e.addClass(k);
    }
    if (t.imageUrl) {
      (0, r.getImageContainer)(t.imageUrl).addClass(D).appendTo(e);
    }
    var o = (0, i.default)("<div>").addClass(I).appendTo(e);
    var a = (0, i.default)("<div>").addClass(T).text(t.commonText).appendTo(o);
    var s = null;
    if (!t.skipProgressBox) {
      var l = (0, i.default)("<div>").addClass(E).appendTo(o);
      s = this._createComponent(l, u.default, {
        min: 0,
        max: 100,
        width: "100%",
        validationMessageMode: "always",
        statusFormat: function (e, t) {
          return n._getStatusString(e, t);
        }
      });
    }
    var c = null;
    if (t.showCloseButton) {
      var h = (0, i.default)("<div>").addClass(O).appendTo(e);
      c = this._createComponent(h, d.default, {
        icon: "dx-filemanager-i dx-filemanager-i-cancel",
        stylingMode: "text",
        visible: t.showCloseButtonAlways,
        onClick: t.onCloseButtonClick
      });
    }
    return {
      $commonText: a,
      progressBar: s,
      $element: e,
      $wrapper: o,
      closeButton: c
    };
  };
  h._setCloseButtonVisible = function (e, t) {
    if (e.closeButton) {
      e.$element.toggleClass(k, !t);
      e.closeButton.option("visible", t);
    }
  };
  h._setProgressBarText = function (e, t) {
    e.progressBar.option("statusFormat", function () {
      return t;
    });
  };
  h._closeOperation = function (e) {
    var t = this;
    if (e.customCloseHandling && !e.completed) {
      this._raiseOperationCanceled(e);
      this._setCloseButtonVisible(e.common, false);
      e.details.forEach(function (e) {
        return t._displayClosedOperationItem(e);
      });
    } else {
      this._raiseOperationClosed(e);
      e.$info.next(`.${y}`).remove();
      e.$info.remove();
      this._operationCount--;
      if (!this._operationCount) {
        this._renderEmptyListText();
      }
    }
  };
  h._cancelOperationItem = function (e, t) {
    this._raiseOperationItemCanceled(e, t);
    var n = e.info.details[t];
    this._displayClosedOperationItem(n);
  };
  h._displayClosedOperationItem = function (e) {
    this._setProgressBarText(e, s.default.format("dxFileManager-notificationProgressPanelOperationCanceled"));
    this._setCloseButtonVisible(e, false);
  };
  h._getStatusString = function (e, t) {
    if (e === 1) {
      return s.default.format("Done");
    } else {
      return Math.round(e * 100) + "%";
    }
  };
  h._raiseOperationClosed = function (e) {
    this._actions.onOperationClosed({
      info: e
    });
  };
  h._raiseOperationCanceled = function (e) {
    this._actions.onOperationCanceled({
      info: e
    });
  };
  h._raiseOperationItemCanceled = function (e, t) {
    this._actions.onOperationItemCanceled({
      item: e,
      itemIndex: t
    });
  };
  h._raisePanelClosed = function () {
    this._actions.onPanelClosed();
  };
  return l;
}(l.default);
exports.default = A;
module.exports = exports.default;
module.exports.default = exports.default;