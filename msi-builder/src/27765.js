exports.default = undefined;
var i = d(require("./68374.js"));
var o = d(require("./44504.js"));
var a = require("./31648.js");
var r = d(require("./78831.js"));
var s = d(require("./2492.js"));
var l = require("./95479.js");
var u = require("./62754.js");
function d(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
var c = r.default.inherit({
  _init: function (e) {
    this.callBase(e);
    this._$topPocket = e._$topPocket;
    this._$pullDown = e._$pullDown;
    this._$refreshingText = e._$refreshingText;
    this._$scrollViewContent = (0, i.default)(e.content());
    this._$container = (0, i.default)(e.container());
    this._initCallbacks();
  },
  _initCallbacks: function () {
    this.pullDownCallbacks = (0, o.default)();
    this.releaseCallbacks = (0, o.default)();
    this.reachBottomCallbacks = (0, o.default)();
  },
  render: function () {
    this.callBase();
    this._renderPullDown();
    this._releaseState();
  },
  _renderPullDown: function () {
    var e = (0, i.default)("<div>").addClass("dx-scrollview-pull-down-image");
    var t = (0, i.default)("<div>").addClass("dx-scrollview-pull-down-indicator");
    var n = new s.default((0, i.default)("<div>")).$element();
    var o = this._$pullDownText = (0, i.default)("<div>").addClass("dx-scrollview-pull-down-text");
    this._$pullingDownText = (0, i.default)("<div>").text(this.option("pullingDownText")).appendTo(o);
    this._$pulledDownText = (0, i.default)("<div>").text(this.option("pulledDownText")).appendTo(o);
    this._$refreshingText = (0, i.default)("<div>").text(this.option("refreshingText")).appendTo(o);
    this._$pullDown.empty().append(e).append(t.append(n)).append(o);
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
    (0, l.each)(t, function (t, n) {
      var i = e._state === n.visibleState ? "addClass" : "removeClass";
      n.element[i]("dx-scrollview-pull-down-text-visible");
    });
  },
  update: function () {
    this.callBase();
    this._setTopPocketOffset();
  },
  _updateDimensions: function () {
    this.callBase();
    this._topPocketSize = this._$topPocket.get(0).clientHeight;
    var e = this._$scrollViewContent.get(0);
    var t = this._$container.get(0);
    this._bottomBoundary = Math.max(e.clientHeight - t.clientHeight, 0);
  },
  _allowedDirections: function () {
    var e = this.callBase();
    e.vertical = e.vertical || this._pullDownEnabled;
    return e;
  },
  _setTopPocketOffset: function () {
    this._$topPocket.css({
      top: -this._topPocketSize
    });
  },
  handleEnd: function () {
    this.callBase();
    this._complete();
  },
  handleStop: function () {
    this.callBase();
    this._complete();
  },
  _complete: function () {
    if (this._state === 1) {
      this._setPullDownOffset(this._topPocketSize);
      clearTimeout(this._pullDownRefreshTimeout);
      this._pullDownRefreshTimeout = setTimeout(function () {
        this._pullDownRefreshing();
      }.bind(this), 400);
    }
  },
  _setPullDownOffset: function (e) {
    (0, a.move)(this._$topPocket, {
      top: e
    });
    (0, a.move)(this._$scrollViewContent, {
      top: e
    });
  },
  handleScroll: function (e) {
    this.callBase(e);
    if (this._state !== 2) {
      var t = this.location().top;
      var n = (this._location || 0) - t;
      this._location = t;
      if (this._isPullDown()) {
        this._pullDownReady();
      } else if (n > 0 && this._isReachBottom()) {
        this._reachBottom();
      } else {
        this._stateReleased();
      }
    }
  },
  _isPullDown: function () {
    return this._pullDownEnabled && this._location >= this._topPocketSize;
  },
  _isReachBottom: function () {
    return this._reachBottomEnabled && Math.round(this._bottomBoundary + Math.floor(this._location)) <= 1;
  },
  _reachBottom: function () {
    if (this._state !== 3) {
      this._state = 3;
      this.reachBottomCallbacks.fire();
    }
  },
  _pullDownReady: function () {
    if (this._state !== 1) {
      this._state = 1;
      this._$pullDown.addClass("dx-scrollview-pull-down-ready");
      this._refreshPullDownText();
    }
  },
  _stateReleased: function () {
    if (this._state !== 0) {
      this._$pullDown.removeClass("dx-scrollview-pull-down-loading").removeClass("dx-scrollview-pull-down-ready");
      this._releaseState();
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
  pullDownEnable: function (e) {
    if (e) {
      this._updateDimensions();
      this._setTopPocketOffset();
    }
    this._pullDownEnabled = e;
  },
  reachBottomEnable: function (e) {
    this._reachBottomEnabled = e;
  },
  pendingRelease: function () {
    this._state = 1;
  },
  release: function () {
    var e = new u.Deferred();
    this._updateDimensions();
    clearTimeout(this._releaseTimeout);
    if (this._state === 3) {
      this._state = 0;
    }
    this._releaseTimeout = setTimeout(function () {
      this._setPullDownOffset(0);
      this._stateReleased();
      this.releaseCallbacks.fire();
      this._updateAction();
      e.resolve();
    }.bind(this), 400);
    return e.promise();
  },
  dispose: function () {
    clearTimeout(this._pullDownRefreshTimeout);
    clearTimeout(this._releaseTimeout);
    this.callBase();
  }
});
exports.default = c;
module.exports = exports.default;
module.exports.default = exports.default;