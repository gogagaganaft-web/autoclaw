exports.default = undefined;
var i = require("./58664.js");
var o = c(require("./68374.js"));
var a = c(require("./44504.js"));
var r = require("./95479.js");
var s = require("./20576.js");
var l = require("./13306.js");
var u = require("./54142.js");
var d = c(require("./2492.js"));
function c(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
var h = Math;
var f = u.Scroller.inherit({
  ctor: function () {
    this._topPocketSize = 0;
    this._bottomPocketSize = 0;
    this.callBase.apply(this, arguments);
    this._initCallbacks();
    this._releaseState();
  },
  _releaseState: function () {
    this._state = 0;
    this._refreshPullDownText();
  },
  _refreshPullDownText: function () {
    var e = this;
    var t = [{
      element: this._$pullingDownText,
      visibleState: 0
    }, {
      element: this._$pulledDownText,
      visibleState: 1
    }, {
      element: this._$refreshingText,
      visibleState: 2
    }];
    (0, r.each)(t, function (t, n) {
      var i = e._state === n.visibleState ? "addClass" : "removeClass";
      n.element[i]("dx-scrollview-pull-down-text-visible");
    });
  },
  _initCallbacks: function () {
    this.pullDownCallbacks = (0, a.default)();
    this.releaseCallbacks = (0, a.default)();
    this.reachBottomCallbacks = (0, a.default)();
  },
  _updateBounds: function () {
    if (this._direction !== "horizontal") {
      this._topPocketSize = this._$topPocket.get(0).clientHeight;
      this._bottomPocketSize = this._$bottomPocket.get(0).clientHeight;
      var e = this._$container.get(0);
      var t = this._$content.get(0);
      this._bottomBoundary = Math.max(t.clientHeight - this._bottomPocketSize - e.clientHeight, 0);
    }
    this.callBase();
  },
  _updateScrollbar: function () {
    this._scrollbar.option({
      containerSize: this._containerSize(),
      contentSize: this._contentSize() - this._topPocketSize - this._bottomPocketSize,
      scaleRatio: this._getScaleRatio()
    });
  },
  _moveContent: function () {
    this.callBase();
    if (this._isPullDown()) {
      this._pullDownReady();
    } else if (this._isReachBottom()) {
      this._reachBottomReady();
    } else if (this._state !== 0) {
      this._stateReleased();
    }
  },
  _moveScrollbar: function () {
    this._scrollbar.moveTo(this._topPocketSize + this._location);
  },
  _isPullDown: function () {
    return this._pullDownEnabled && this._location >= 0;
  },
  _isReachBottom: function () {
    var e = this._$container.get(0);
    return this._reachBottomEnabled && Math.round(this._bottomBoundary - Math.ceil(e.scrollTop)) <= 1;
  },
  _scrollComplete: function () {
    if (this._inBounds() && this._state === 1) {
      this._pullDownRefreshing();
    } else if (this._inBounds() && this._state === 3) {
      this._reachBottomLoading();
    } else {
      this.callBase();
    }
  },
  _reachBottomReady: function () {
    if (this._state !== 3) {
      this._state = 3;
      this._minOffset = this._getMinOffset();
    }
  },
  _getMaxOffset: function () {
    return -this._topPocketSize;
  },
  _getMinOffset: function () {
    return h.min(this.callBase(), -this._topPocketSize);
  },
  _reachBottomLoading: function () {
    this.reachBottomCallbacks.fire();
  },
  _pullDownReady: function () {
    if (this._state !== 1) {
      this._state = 1;
      this._maxOffset = 0;
      this._$pullDown.addClass("dx-scrollview-pull-down-ready");
      this._refreshPullDownText();
    }
  },
  _stateReleased: function () {
    if (this._state !== 0) {
      this._releaseState();
      this._updateBounds();
      this._$pullDown.removeClass("dx-scrollview-pull-down-loading").removeClass("dx-scrollview-pull-down-ready");
      this.releaseCallbacks.fire();
    }
  },
  _pullDownRefreshing: function () {
    if (this._state !== 2) {
      this._state = 2;
      this._$pullDown.addClass("dx-scrollview-pull-down-loading").removeClass("dx-scrollview-pull-down-ready");
      this._refreshPullDownText();
      this.pullDownCallbacks.fire();
    }
  },
  _releaseHandler: function () {
    if (this._state === 0) {
      this._moveToBounds();
    }
    this._update();
    if (this._releaseTask) {
      this._releaseTask.abort();
    }
    this._releaseTask = (0, s.executeAsync)(this._release.bind(this));
    return this._releaseTask.promise;
  },
  _release: function () {
    this._stateReleased();
    this._scrollComplete();
  },
  _reachBottomEnablingHandler: function (e) {
    if (this._reachBottomEnabled !== e) {
      this._reachBottomEnabled = e;
      this._updateBounds();
    }
  },
  _pullDownEnablingHandler: function (e) {
    if (this._pullDownEnabled !== e) {
      this._pullDownEnabled = e;
      this._considerTopPocketChange();
      this._updateHandler();
    }
  },
  _considerTopPocketChange: function () {
    this._location -= (0, i.getHeight)(this._$topPocket) || -this._topPocketSize;
    this._maxOffset = 0;
    this._move();
  },
  _pendingReleaseHandler: function () {
    this._state = 1;
  },
  dispose: function () {
    if (this._releaseTask) {
      this._releaseTask.abort();
    }
    this.callBase();
  }
});
var p = u.SimulatedStrategy.inherit({
  _init: function (e) {
    this.callBase(e);
    this._$pullDown = e._$pullDown;
    this._$topPocket = e._$topPocket;
    this._$bottomPocket = e._$bottomPocket;
    this._initCallbacks();
  },
  _initCallbacks: function () {
    this.pullDownCallbacks = (0, a.default)();
    this.releaseCallbacks = (0, a.default)();
    this.reachBottomCallbacks = (0, a.default)();
  },
  render: function () {
    this._renderPullDown();
    this.callBase();
  },
  _renderPullDown: function () {
    var e = (0, o.default)("<div>").addClass("dx-scrollview-pull-down-image");
    var t = (0, o.default)("<div>").addClass("dx-scrollview-pull-down-indicator");
    var n = new d.default((0, o.default)("<div>")).$element();
    var i = this._$pullDownText = (0, o.default)("<div>").addClass("dx-scrollview-pull-down-text");
    this._$pullingDownText = (0, o.default)("<div>").text(this.option("pullingDownText")).appendTo(i);
    this._$pulledDownText = (0, o.default)("<div>").text(this.option("pulledDownText")).appendTo(i);
    this._$refreshingText = (0, o.default)("<div>").text(this.option("refreshingText")).appendTo(i);
    this._$pullDown.empty().append(e).append(t.append(n)).append(i);
  },
  pullDownEnable: function (e) {
    this._eventHandler("pullDownEnabling", e);
  },
  reachBottomEnable: function (e) {
    this._eventHandler("reachBottomEnabling", e);
  },
  _createScroller: function (e) {
    var t = this;
    var n = t._scrollers[e] = new f(t._scrollerOptions(e));
    n.pullDownCallbacks.add(function () {
      t.pullDownCallbacks.fire();
    });
    n.releaseCallbacks.add(function () {
      t.releaseCallbacks.fire();
    });
    n.reachBottomCallbacks.add(function () {
      t.reachBottomCallbacks.fire();
    });
  },
  _scrollerOptions: function (e) {
    return (0, l.extend)(this.callBase(e), {
      $topPocket: this._$topPocket,
      $bottomPocket: this._$bottomPocket,
      $pullDown: this._$pullDown,
      $pullDownText: this._$pullDownText,
      $pullingDownText: this._$pullingDownText,
      $pulledDownText: this._$pulledDownText,
      $refreshingText: this._$refreshingText
    });
  },
  pendingRelease: function () {
    this._eventHandler("pendingRelease");
  },
  release: function () {
    return this._eventHandler("release").done(this._updateAction);
  },
  location: function () {
    var e = this.callBase();
    e.top += (0, i.getHeight)(this._$topPocket);
    return e;
  },
  dispose: function () {
    (0, r.each)(this._scrollers, function () {
      this.dispose();
    });
    this.callBase();
  }
});
exports.default = p;
module.exports = exports.default;
module.exports.default = exports.default;