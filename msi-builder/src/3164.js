exports.default = undefined;
var i = v(require("./68374.js"));
var o = v(require("./20530.js"));
var a = require("./58201.js");
var r = v(require("./28109.js"));
var s = v(require("./99393.js"));
var l = require("./6415.js");
var u = require("./13306.js");
var d = require("./20576.js");
var c = v(require("./27765.js"));
var h = v(require("./90778.js"));
var f = v(require("./91616.js"));
var p = v(require("./41183.js"));
var g = v(require("./2492.js"));
var m = require("./75811.js");
var _ = v(require("./97218.js"));
function v(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
var y = {
  pullDown: c.default,
  swipeDown: h.default,
  simulated: f.default
};
var b = !(0, a.hasWindow)();
var x = {
  finishLoading: d.noop,
  release: d.noop,
  refresh: d.noop,
  scrollOffset: function () {
    return {
      top: 0,
      left: 0
    };
  },
  _optionChanged: function (e) {
    if (e.name !== "onUpdated") {
      return this.callBase.apply(this, arguments);
    }
  }
};
var w = p.default.inherit(b ? x : {
  _getDefaultOptions: function () {
    return (0, u.extend)(this.callBase(), {
      pullingDownText: r.default.format("dxScrollView-pullingDownText"),
      pulledDownText: r.default.format("dxScrollView-pulledDownText"),
      refreshingText: r.default.format("dxScrollView-refreshingText"),
      reachBottomText: r.default.format("dxScrollView-reachBottomText"),
      onPullDown: null,
      onReachBottom: null,
      refreshStrategy: "pullDown"
    });
  },
  _defaultOptionsRules: function () {
    return this.callBase().concat([{
      device: function () {
        return o.default.real().platform === "android";
      },
      options: {
        refreshStrategy: "swipeDown"
      }
    }, {
      device: function () {
        return (0, m.isMaterial)();
      },
      options: {
        pullingDownText: "",
        pulledDownText: "",
        refreshingText: "",
        reachBottomText: ""
      }
    }]);
  },
  _init: function () {
    this.callBase();
    this._loadingIndicatorEnabled = true;
  },
  _initScrollableMarkup: function () {
    this.callBase();
    this.$element().addClass("dx-scrollview");
    this._initContent();
    this._initTopPocket();
    this._initBottomPocket();
    this._initLoadPanel();
  },
  _initContent: function () {
    var e = (0, i.default)("<div>").addClass("dx-scrollview-content");
    this._$content.wrapInner(e);
  },
  _initTopPocket: function () {
    var e = this._$topPocket = (0, i.default)("<div>").addClass("dx-scrollview-top-pocket");
    var t = this._$pullDown = (0, i.default)("<div>").addClass("dx-scrollview-pull-down");
    e.append(t);
    this._$content.prepend(e);
  },
  _initBottomPocket: function () {
    var e = this._$bottomPocket = (0, i.default)("<div>").addClass("dx-scrollview-bottom-pocket");
    var t = this._$reachBottom = (0, i.default)("<div>").addClass("dx-scrollview-scrollbottom");
    var n = (0, i.default)("<div>").addClass("dx-scrollview-scrollbottom-indicator");
    var o = new g.default((0, i.default)("<div>")).$element();
    var a = this._$reachBottomText = (0, i.default)("<div>").addClass("dx-scrollview-scrollbottom-text");
    this._updateReachBottomText();
    t.append(n.append(o)).append(a);
    e.append(t);
    this._$content.append(e);
  },
  _initLoadPanel: function () {
    var e = (0, i.default)("<div>").addClass("dx-scrollview-loadpanel").appendTo(this.$element());
    var t = {
      shading: false,
      delay: 400,
      message: this.option("refreshingText"),
      position: {
        of: this.$element()
      }
    };
    this._loadPanel = this._createComponent(e, _.default, t);
  },
  _updateReachBottomText: function () {
    this._$reachBottomText.text(this.option("reachBottomText"));
  },
  _createStrategy: function () {
    var e = this.option("useNative") ? this.option("refreshStrategy") : "simulated";
    var t = y[e];
    this._strategy = new t(this);
    this._strategy.pullDownCallbacks.add(this._pullDownHandler.bind(this));
    this._strategy.releaseCallbacks.add(this._releaseHandler.bind(this));
    this._strategy.reachBottomCallbacks.add(this._reachBottomHandler.bind(this));
  },
  _createActions: function () {
    this.callBase();
    this._pullDownAction = this._createActionByOption("onPullDown");
    this._reachBottomAction = this._createActionByOption("onReachBottom");
    this._tryRefreshPocketState();
  },
  _tryRefreshPocketState: function () {
    this._pullDownEnable(this.hasActionSubscription("onPullDown"));
    this._reachBottomEnable(this.hasActionSubscription("onReachBottom"));
  },
  on: function (e) {
    var t = this.callBase.apply(this, arguments);
    if (e === "pullDown" || e === "reachBottom") {
      this._tryRefreshPocketState();
    }
    return t;
  },
  _pullDownEnable: function (e) {
    if (arguments.length === 0) {
      return this._pullDownEnabled;
    }
    if (this._$pullDown && this._strategy) {
      this._$pullDown.toggle(e);
      this._strategy.pullDownEnable(e);
      this._pullDownEnabled = e;
    }
  },
  _reachBottomEnable: function (e) {
    if (arguments.length === 0) {
      return this._reachBottomEnabled;
    }
    if (this._$reachBottom && this._strategy) {
      this._$reachBottom.toggle(e);
      this._strategy.reachBottomEnable(e);
      this._reachBottomEnabled = e;
    }
  },
  _pullDownHandler: function () {
    this._loadingIndicator(false);
    this._pullDownLoading();
  },
  _loadingIndicator: function (e) {
    if (arguments.length < 1) {
      return this._loadingIndicatorEnabled;
    }
    this._loadingIndicatorEnabled = e;
  },
  _pullDownLoading: function () {
    this.startLoading();
    this._pullDownAction();
  },
  _reachBottomHandler: function () {
    this._loadingIndicator(false);
    this._reachBottomLoading();
  },
  _reachBottomLoading: function () {
    this.startLoading();
    this._reachBottomAction();
  },
  _releaseHandler: function () {
    this.finishLoading();
    this._loadingIndicator(true);
  },
  _optionChanged: function (e) {
    switch (e.name) {
      case "onPullDown":
      case "onReachBottom":
        this._createActions();
        break;
      case "pullingDownText":
      case "pulledDownText":
      case "refreshingText":
      case "refreshStrategy":
        this._invalidate();
        break;
      case "reachBottomText":
        this._updateReachBottomText();
        break;
      default:
        this.callBase(e);
    }
  },
  content: function () {
    return (0, l.getPublicElement)(this._$content.children().eq(1));
  },
  release: function (e) {
    if (e !== undefined) {
      this.toggleLoading(!e);
    }
    return this._strategy.release();
  },
  toggleLoading: function (e) {
    this._reachBottomEnable(e);
  },
  refresh: function () {
    if (this.hasActionSubscription("onPullDown")) {
      this._strategy.pendingRelease();
      this._pullDownLoading();
    }
  },
  startLoading: function () {
    if (this._loadingIndicator() && this.$element().is(":visible")) {
      this._loadPanel.show();
    }
    this._lock();
  },
  finishLoading: function () {
    this._loadPanel.hide();
    this._unlock();
  },
  _dispose: function () {
    this._strategy.dispose();
    this.callBase();
    if (this._loadPanel) {
      this._loadPanel.$element().remove();
    }
  }
});
(0, s.default)("dxScrollView", w);
var C = w;
exports.default = C;
module.exports = exports.default;
module.exports.default = exports.default;