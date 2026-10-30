Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.VirtualScrollController = undefined;
exports.subscribeToExternalScrollers = _;
var i = g(require("./49387.js"));
var o = g(require("./38377.js"));
var a = g(require("./68374.js"));
var r = g(require("./47810.js"));
var s = g(require("./44504.js"));
var l = require("./62754.js");
var u = require("./95479.js");
var d = require("./35922.js");
var c = require("./58201.js");
var h = g(require("./55994.js"));
var f = g(require("./60082.js"));
var p = require("./20488.js");
function g(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
function m(e) {
  return e.option("scrolling.mode") === "virtual" || e._isVirtual;
}
function _(e, t, n) {
  var o;
  var r = [];
  var s = [];
  var l = [];
  function d(t) {
    var n = t.element ? t.$element() : t;
    var o = i.default.offset(n);
    if (o) {
      return t.scrollTop() - (o.top - e.offset().top);
    } else {
      return e.offset().top;
    }
  }
  var f = {
    on: function (e, t, n) {
      e.on("scroll", n);
    },
    off: function (e, t, n) {
      e.off("scroll", n);
    }
  };
  function p(e) {
    var n = e.get(0).nodeName === "#document";
    var i = e.get(0).nodeType === (0, c.getWindow)().Node.ELEMENT_NODE;
    var o = e.data("dxScrollable");
    var u = f;
    if (o || (o = n && (0, a.default)((0, c.getWindow)()) || i && e.css("overflowY") === "auto" && e, u = h.default, o)) {
      var p = function (e) {
        return function () {
          var n = e.scrollTop() - d(e);
          t(n = n > 0 ? n : 0);
        };
      }(o);
      u.on(o, "scroll", p);
      s.push(function (e) {
        var t = d(o);
        var n = o.scrollTo ? "scrollTo" : "scrollTop";
        if (e - t >= 0) {
          o[n](e + t);
        }
      });
      r.push(o);
      l.push(function () {
        u.off(o, "scroll", p);
      });
    }
  }
  function g(e) {
    return (0, a.default)(e.get(0).parentNode ?? e.get(0).host);
  }
  for (o = (n = n || e).parent(); o.length; o = g(o)) {
    p(o);
  }
  return {
    scrollTo: function (e) {
      (0, u.each)(s, function (t, n) {
        n(e);
      });
    },
    dispose: function () {
      (0, u.each)(l, function (e, t) {
        t();
      });
    }
  };
}
var v;
var y = o.default.inherit((v = {
  ctor: function (e, t, n) {
    this._dataOptions = t;
    this.component = e;
    this._viewportSize = e.option("scrolling.legacyMode") === false ? 15 : 0;
    this._viewportItemSize = 20;
    this._viewportItemIndex = 0;
    this._position = 0;
    this._isScrollingBack = false;
    this._contentSize = 0;
    this._itemSizes = {};
    this._sizeRatio = 1;
    this._isVirtual = n;
    this.positionChanged = (0, s.default)();
    this._dataLoader = new p.VirtualDataLoader(this, this._dataOptions);
  },
  getItemSizes: function () {
    return this._itemSizes;
  },
  option: function () {
    return this.component.option.apply(this.component, arguments);
  },
  isVirtual: function () {
    return this._isVirtual;
  },
  virtualItemsCount: function () {
    if (m(this)) {
      var e = this._dataOptions;
      var t = e.totalItemsCount();
      if (this.option("scrolling.legacyMode") === false && t !== -1) {
        var n = this.getViewportParams();
        var i = e.loadedOffset();
        var o = e.loadedItemCount();
        var a = Math.max(n.skip, i);
        var r = Math.min(n.take, o);
        var s = Math.max(t - (a + r), 0);
        return {
          begin: a,
          end: s
        };
      }
      return this._dataLoader.virtualItemsCount.apply(this._dataLoader, arguments);
    }
  },
  getScrollingTimeout: function () {
    var t = this.option("scrolling.renderAsync");
    var n = 0;
    if ((0, d.isDefined)(t)) {
      if (t) {
        n = this.option("scrolling.timeout") ?? 0;
      }
    } else if ((n = Math.min(this.option("scrolling.timeout") || 0, this._dataOptions.changingDuration())) < this.option("scrolling.renderingThreshold")) {
      n = this.option("scrolling.minTimeout") || 0;
    }
    return n;
  },
  setViewportPosition: function (e) {
    var t = this;
    var n = new l.Deferred();
    var i = this.getScrollingTimeout();
    clearTimeout(this._scrollTimeoutID);
    if (i > 0) {
      this._scrollTimeoutID = setTimeout(function () {
        t._setViewportPositionCore(e);
        n.resolve();
      }, i);
    } else {
      this._setViewportPositionCore(e);
      n.resolve();
    }
    return n.promise();
  },
  getViewportPosition: function () {
    return this._position;
  },
  getItemIndexByPosition: function (e, t, n) {
    e = e ?? this._position;
    var i = this.getItemSize();
    for (var o = 0, a = 0, r = Object.keys(this._itemSizes).concat(-1), s = 0; s < r.length && o < e; s++) {
      var l = parseInt(r[s]);
      var u = (e - o) / i;
      if (l < 0 || a + u < l) {
        a += u;
        if (this._sizeRatio < 1 && (0, d.isDefined)(t)) {
          a = t + n / this._viewportItemSize;
        }
        break;
      }
      o += (u = l - a) * i;
      a += u;
      var c = this._itemSizes[l];
      a += (o += c) < e ? 1 : (e - o + c) / c;
    }
    return Math.round(a * 50) / 50;
  },
  isScrollingBack: function () {
    return this._isScrollingBack;
  },
  _setViewportPositionCore: function (e) {
    var t = this._position || 0;
    this._position = e;
    if (t !== this._position) {
      this._isScrollingBack = this._position < t;
    }
    var n = this.getItemIndexByPosition();
    var i = this.setViewportItemIndex(n);
    this.positionChanged.fire();
    return i;
  },
  setContentItemSizes: function (e) {
    var t = this;
    var n = this.virtualItemsCount();
    this._contentSize = e.reduce(function (e, t) {
      return e + t;
    }, 0);
    if (n) {
      e.forEach(function (e, i) {
        t._itemSizes[n.begin + i] = e;
      });
      var i = (n.begin + n.end + this.itemsCount()) * this._viewportItemSize;
      var o = f.default.getContentHeightLimit(r.default);
      this._sizeRatio = i > o ? o / i : 1;
    }
  },
  getItemSize: function () {
    return this._viewportItemSize * this._sizeRatio;
  },
  getItemOffset: function (e, t) {
    var n = this;
    var i = this.virtualItemsCount();
    var o = e;
    if (!i) {
      return 0;
    }
    var a = 0;
    var r = this._dataOptions.totalItemsCount();
    Object.keys(this._itemSizes).forEach(function (i) {
      if (o && (t ? i >= r - e : i < e)) {
        a += n._itemSizes[i];
        o--;
      }
    });
    return Math.floor(a + o * this._viewportItemSize * this._sizeRatio);
  },
  getContentOffset: function (e) {
    var t = e === "end";
    var n = this.virtualItemsCount();
    if (n) {
      return this.getItemOffset(t ? n.end : n.begin, t);
    } else {
      return 0;
    }
  },
  getVirtualContentSize: function () {
    if (this.virtualItemsCount()) {
      return this.getContentOffset("begin") + this.getContentOffset("end") + this._contentSize;
    } else {
      return 0;
    }
  },
  getViewportItemIndex: function () {
    return this._viewportItemIndex;
  },
  setViewportItemIndex: function (e) {
    this._viewportItemIndex = e;
    if (this.option("scrolling.legacyMode") !== false) {
      return this._dataLoader.viewportItemIndexChanged.apply(this._dataLoader, arguments);
    }
  },
  viewportItemSize: function (e) {
    if (e !== undefined) {
      this._viewportItemSize = e;
    }
    return this._viewportItemSize;
  },
  viewportSize: function (e) {
    if (e !== undefined) {
      this._viewportSize = e;
    }
    return this._viewportSize;
  },
  viewportHeight: function (e, t) {
    var n = t ?? this._position;
    var i = this.getItemIndexByPosition(n);
    var o = this.getItemIndexByPosition(n + e, i, e);
    this.viewportSize(Math.ceil(o - i));
    if (!(0, d.isDefined)(t) && this._viewportItemIndex !== i) {
      this._setViewportPositionCore(n);
    }
  },
  reset: function (e) {
    this._dataLoader.reset();
    if (!e) {
      this._itemSizes = {};
    }
  },
  subscribeToWindowScrollEvents: function (e) {
    var t = this;
    this._windowScroll = this._windowScroll || _(e, function (e) {
      if (t.viewportItemSize()) {
        t.setViewportPosition(e);
      }
    });
  },
  dispose: function () {
    clearTimeout(this._scrollTimeoutID);
    if (this._windowScroll) {
      this._windowScroll.dispose();
    }
    this._windowScroll = null;
  },
  scrollTo: function (e) {
    if (this._windowScroll) {
      this._windowScroll.scrollTo(e);
    }
  },
  isVirtualMode: function () {
    return m(this);
  },
  isAppendMode: function () {
    return (e = this).option("scrolling.mode") === "infinite" && !e._isVirtual;
    var e;
  },
  getViewportParams: function () {
    var t = this.option("scrolling.mode") === "virtual";
    var n = this._dataOptions.totalItemsCount();
    var i = this._dataOptions.hasKnownLastPage() && this._viewportItemIndex > n ? n : this._viewportItemIndex;
    var o = this._viewportSize + i;
    var a = this.option("scrolling.prerenderedRowChunkSize") || 1;
    var r = this.isScrollingBack();
    var s = this.option("scrolling.prerenderedRowCount") ?? 1;
    var l = r ? s : 0;
    var u = r ? 0 : s;
    var d = Math.floor(Math.max(0, i - l) / a) * a;
    var c = Math.ceil((o + u - d) / a) * a;
    if (t) {
      var h = Math.max(0, n - d);
      c = Math.min(c, h);
    }
    return {
      skip: d,
      take: c
    };
  },
  itemsCount: function () {
    if (this.option("scrolling.legacyMode")) {
      return this._dataLoader.itemsCount.apply(this._dataLoader, arguments);
    } else {
      return this._dataOptions.itemsCount();
    }
  }
}, ["pageIndex", "beginPageIndex", "endPageIndex", "pageSize", "load", "loadIfNeed", "handleDataChanged", "getDelayDeferred"].forEach(function (e) {
  v[e] = function () {
    return this._dataLoader[e].apply(this._dataLoader, arguments);
  };
}), v));
exports.VirtualScrollController = y;
var b = {
  VirtualScrollController: y
};
exports.default = b;