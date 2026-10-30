exports.default = undefined;
var i = require("./58664.js");
var o = c(require("./68374.js"));
var a = c(require("./44504.js"));
var r = require("./31648.js");
var s = require("./39611.js");
var l = c(require("./78831.js"));
var u = c(require("./2492.js"));
var d = require("./62754.js");
function c(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
var h = l.default.inherit({
  _init: function (e) {
    this.callBase(e);
    this._$topPocket = e._$topPocket;
    this._$pullDown = e._$pullDown;
    this._$scrollViewContent = (0, o.default)(e.content());
    this._$container = (0, o.default)(e.container());
    this._initCallbacks();
    this._location = 0;
  },
  _initCallbacks: function () {
    this.pullDownCallbacks = (0, a.default)();
    this.releaseCallbacks = (0, a.default)();
    this.reachBottomCallbacks = (0, a.default)();
  },
  render: function () {
    this.callBase();
    this._renderPullDown();
    this._releaseState();
  },
  _renderPullDown: function () {
    var e = (0, o.default)("<div>").addClass("dx-scrollview-pull-down-indicator");
    var t = new u.default((0, o.default)("<div>")).$element();
    this._$icon = (0, o.default)("<div>").addClass("dx-icon-pulldown");
    this._$pullDown.empty().append(this._$icon).append(e.append(t));
  },
  _releaseState: function () {
    this._state = 0;
    this._releasePullDown();
    this._updateDimensions();
  },
  _releasePullDown: function () {
    this._$pullDown.css({
      opacity: 0
    });
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
  handleInit: function (e) {
    this.callBase(e);
    if (this._state === 0 && this._location === 0) {
      this._startClientY = (0, s.eventData)(e.originalEvent).y;
      this._state = 4;
    }
  },
  handleMove: function (e) {
    this.callBase(e);
    this._deltaY = (0, s.eventData)(e.originalEvent).y - this._startClientY;
    if (this._state === 4) {
      if (this._pullDownEnabled && this._deltaY > 0) {
        this._state = 5;
      } else {
        this._complete();
      }
    }
    if (this._state === 5) {
      e.preventDefault();
      this._movePullDown();
    }
  },
  _movePullDown: function () {
    var e = this._getPullDownHeight();
    var t = Math.min(e * 3, this._deltaY + this._getPullDownStartPosition());
    var n = t * 180 / e / 3;
    this._$pullDown.css({
      opacity: 1
    }).toggleClass("dx-scrollview-pull-down-refreshing", t < e);
    (0, r.move)(this._$pullDown, {
      top: t
    });
    this._$icon.css({
      transform: "rotate(" + n + "deg)"
    });
  },
  _isPullDown: function () {
    return this._pullDownEnabled && this._state === 5 && this._deltaY >= this._getPullDownHeight() - this._getPullDownStartPosition();
  },
  _getPullDownHeight: function () {
    return Math.round((0, i.getOuterHeight)(this._$element) * 0.05);
  },
  _getPullDownStartPosition: function () {
    return -Math.round((0, i.getOuterHeight)(this._$pullDown) * 1.5);
  },
  handleEnd: function () {
    if (this._isPullDown()) {
      this._pullDownRefreshing();
    }
    this._complete();
  },
  handleStop: function () {
    this._complete();
  },
  _complete: function () {
    if (this._state === 4 || this._state === 5) {
      this._releaseState();
    }
  },
  handleScroll: function (e) {
    this.callBase(e);
    if (this._state !== 2) {
      var t = this.location().top;
      var n = this._location - t;
      this._location = t;
      if (n > 0 && this._isReachBottom()) {
        this._reachBottom();
      } else {
        this._stateReleased();
      }
    }
  },
  _isReachBottom: function () {
    return this._reachBottomEnabled && Math.round(this._bottomBoundary + Math.floor(this._location)) <= 1;
  },
  _reachBottom: function () {
    this.reachBottomCallbacks.fire();
  },
  _stateReleased: function () {
    if (this._state !== 0) {
      this._$pullDown.removeClass("dx-scrollview-pull-down-loading");
      this._releaseState();
    }
  },
  _pullDownRefreshing: function () {
    this._state = 2;
    this._pullDownRefreshHandler();
  },
  _pullDownRefreshHandler: function () {
    this._refreshPullDown();
    this.pullDownCallbacks.fire();
  },
  _refreshPullDown: function () {
    this._$pullDown.addClass("dx-scrollview-pull-down-loading");
    (0, r.move)(this._$pullDown, {
      top: this._getPullDownHeight()
    });
  },
  pullDownEnable: function (e) {
    this._$topPocket.toggle(e);
    this._pullDownEnabled = e;
  },
  reachBottomEnable: function (e) {
    this._reachBottomEnabled = e;
  },
  pendingRelease: function () {
    this._state = 1;
  },
  release: function () {
    var e = new d.Deferred();
    this._updateDimensions();
    clearTimeout(this._releaseTimeout);
    this._releaseTimeout = setTimeout(function () {
      this._stateReleased();
      this.releaseCallbacks.fire();
      this._updateAction();
      e.resolve();
    }.bind(this), 800);
    return e.promise();
  },
  dispose: function () {
    clearTimeout(this._pullDownRefreshTimeout);
    clearTimeout(this._releaseTimeout);
    this.callBase();
  }
});
exports.default = h;
module.exports = exports.default;
module.exports.default = exports.default;