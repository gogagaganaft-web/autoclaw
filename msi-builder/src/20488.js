Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VirtualDataLoader = undefined;
var i = require("./62754.js");
var o = require("./35922.js");
function a(e) {
  return e.option("scrolling.loadTwoPagesOnStart") || e._controller.isVirtual() || e._controller.getViewportItemIndex() > 0;
}
function r(e) {
  if (e._cache.length) {
    return e._cache[0].pageIndex;
  } else {
    return -1;
  }
}
function s(e) {
  if (e._cache.length) {
    return e._cache[e._cache.length - 1].pageIndex;
  } else {
    return -1;
  }
}
function l(e, t, n) {
  e._isChangedFiring = true;
  t(n);
  e._isChangedFiring = false;
}
function u(e, t, n) {
  if (e._isDelayChanged) {
    e._isDelayChanged = false;
    l(e, t, n);
    return true;
  }
}
function d(e, t) {
  var n = e.option("scrolling.preloadEnabled");
  var i = function (e) {
    var t = e._dataOptions.pageSize();
    if (e.option("scrolling.preventPreload")) {
      return 0;
    }
    var n = e._controller.viewportSize();
    if (e._controller.isVirtualMode() && e.option("scrolling.removeInvisiblePages")) {
      n = 0;
      for (var i = e._controller.viewportSize() * e._controller.viewportItemSize(), o = e._controller.getContentOffset(), a = e._controller.getViewportPosition(), r = e._controller.virtualItemsCount(), s = e._dataOptions.totalItemsCount(), l = r.begin; l < s && !(o >= a + i); l++) {
        if ((o += e._controller.getItemSizes()[l] || e._controller.viewportItemSize()) >= a) {
          n++;
        }
      }
    }
    if (t && n > 0) {
      return Math.ceil(n / t);
    } else {
      return 1;
    }
  }(e);
  var o = e._controller.isAppendMode();
  if (i) {
    if (t) {
      i = n ? 1 : 0;
    } else {
      if (n) {
        i++;
      }
      if (!!o || !a(e)) {
        i--;
      }
    }
  }
  return i;
}
function c(e, t, n, i, a) {
  var r = e._dataOptions;
  var s = r.items().slice();
  var u = (0, o.isObject)(n) ? n : undefined;
  var d = n === "prepend";
  var c = r.viewportItems();
  if (n && (0, o.isString)(n) && !e._isDelayChanged) {
    u = {
      changeType: n,
      items: s
    };
    if (a) {
      u.removeCount = a.itemsCount;
      if (u.removeCount && r.correctCount) {
        u.removeCount = r.correctCount(c, u.removeCount, d);
      }
    }
  }
  var h = a ? a.itemsLength : 0;
  if (h && r.correctCount) {
    h = r.correctCount(c, h, d);
  }
  if (n === "append") {
    c.push.apply(c, s);
    if (a) {
      c.splice(0, h);
    }
  } else if (d) {
    c.unshift.apply(c, s);
    if (a) {
      c.splice(-h);
    }
  } else {
    e._dataOptions.viewportItems(s);
  }
  r.updateLoading();
  e._lastPageIndex = e.pageIndex();
  e._isDelayChanged = i;
  if (!i) {
    l(e, t, u);
  }
}
var h = function () {
  function e(e, t) {
    this._dataOptions = t;
    this._controller = e;
    this._pageIndex = this._lastPageIndex = t.pageIndex();
    this._cache = [];
    this._loadingPageIndexes = {};
  }
  var t = e.prototype;
  t.option = function () {
    return this._controller.option.apply(this._controller, arguments);
  };
  t.viewportItemIndexChanged = function (e) {
    var t;
    var n = this._dataOptions.pageSize();
    var i = this._dataOptions.pageCount();
    var o = this._controller.isVirtualMode();
    var a = this._controller.isAppendMode();
    var r = this._dataOptions.totalItemsCount();
    if (n && (o || a) && r >= 0) {
      var s = this._controller.viewportSize();
      if (s && e + s >= r && !this._controller.isVirtual()) {
        if (this._dataOptions.hasKnownLastPage()) {
          var l = r % n;
          if ((t = i - 1) > 0 && l > 0 && l < s) {
            t--;
          }
        } else {
          t = i;
        }
      } else {
        t = Math.floor(e / n);
        var u = i - 1;
        t = Math.max(t, 0);
        t = Math.min(t, u);
      }
      this.pageIndex(t);
      return this.load();
    }
  };
  t.pageIndex = function (e) {
    var t = this._controller.isVirtualMode();
    var n = this._controller.isAppendMode();
    if (this.option("scrolling.legacyMode") !== false && (t || n)) {
      if (e !== undefined) {
        this._pageIndex = e;
      }
      return this._pageIndex;
    } else {
      return this._dataOptions.pageIndex(e);
    }
  };
  t.beginPageIndex = function (e) {
    var t = r(this);
    if (t < 0) {
      t = e !== undefined ? e : this.pageIndex();
    }
    return t;
  };
  t.endPageIndex = function () {
    var e = s(this);
    if (e > 0) {
      return e;
    } else {
      return this._lastPageIndex;
    }
  };
  t.pageSize = function () {
    return this._dataOptions.pageSize();
  };
  t.load = function () {
    var e;
    var t = this;
    var n = this._dataOptions;
    var o = this._controller.isVirtualMode();
    var a = this._controller.isAppendMode();
    if (this.option("scrolling.legacyMode") !== false && (o || a)) {
      var l = function (e) {
        var t = -1;
        var n = r(e);
        var i = e._dataOptions;
        if (n < 0) {
          t = e._pageIndex;
        } else if (e._cache[e._pageIndex - n]) {
          if (n >= 0 && e._controller.viewportSize() >= 0) {
            if (n > 0) {
              if (s(e) + 1 === i.pageCount() && e._cache.length < d(e) + 1 || e._pageIndex === n && d(e, true)) {
                t = n - 1;
              }
            }
            if (t < 0) {
              if (n + e._cache.length <= e._pageIndex + d(e)) {
                t = n + e._cache.length;
              }
            }
          }
        } else {
          t = e._pageIndex;
        }
        if (e._loadingPageIndexes[t]) {
          t = -1;
        }
        return t;
      }(this);
      if (l >= 0) {
        var u = function (e, t) {
          var n = e._dataOptions;
          if (t === e.pageIndex() || !n.isLoading() && t < n.pageCount() || !n.hasKnownLastPage() && t === n.pageCount()) {
            n.pageIndex(t);
            e._loadingPageIndexes[t] = true;
            return (0, i.when)(n.load()).always(function () {
              e._loadingPageIndexes[t] = false;
            });
          }
        }(this, l);
        if (u) {
          e = new i.Deferred();
          u.done(function () {
            var n = t._delayDeferred;
            if (n) {
              n.done(e.resolve).fail(e.reject);
            } else {
              e.resolve();
            }
          }).fail(e.reject);
          n.updateLoading();
        }
      }
    } else {
      e = n.load();
    }
    if (!e && this._lastPageIndex !== this.pageIndex()) {
      this._dataOptions.onChanged({
        changeType: "pageIndex"
      });
    }
    return e || new i.Deferred().resolve();
  };
  t.loadIfNeed = function () {
    var e = this._controller.isVirtualMode();
    var t = this._controller.isAppendMode();
    if ((e || t) && !this._dataOptions.isLoading() && (!this._isChangedFiring || this._controller.isVirtual())) {
      var n = this._controller.getViewportPosition();
      if (n > 0) {
        this._controller._setViewportPositionCore(n);
      } else {
        this.load();
      }
    }
  };
  t.handleDataChanged = function (e, t) {
    var n;
    var i;
    var o = this;
    var h = this._dataOptions;
    var f = this._cache.length;
    var p = this._controller.isVirtualMode();
    var g = this._controller.isAppendMode();
    if (t && t.changes) {
      l(this, e, t);
    } else if (this.option("scrolling.legacyMode") !== false && (p || g)) {
      var m = r(this);
      if (m >= 0 && (p && m + this._cache.length !== h.pageIndex() && m - 1 !== h.pageIndex() && (f = 0, this._cache = []), g)) {
        if (h.pageIndex() === 0) {
          this._cache = [];
        } else if (h.pageIndex() < s(this)) {
          l(this, e, {
            changeType: "append",
            items: []
          });
          return;
        }
      }
      var _;
      var v = {
        pageIndex: h.pageIndex(),
        itemsLength: h.items(true).length,
        itemsCount: this.itemsCount(true)
      };
      if (this.option("scrolling.removeInvisiblePages") && p) {
        i = this._cache.length > Math.max(d(this) + (this.option("scrolling.preloadEnabled") ? 1 : 0), 2);
      } else {
        u(this, e, {
          isDelayed: true
        });
      }
      if (m === h.pageIndex() + 1) {
        if (i) {
          _ = this._cache.pop();
        }
        n = "prepend";
        this._cache.unshift(v);
      } else {
        if (i) {
          _ = this._cache.shift();
        }
        n = "append";
        this._cache.push(v);
      }
      var y = p && f === 0 && a(this);
      c(this, e, this._cache.length > 1 ? n : undefined, y, _);
      this._delayDeferred = this.load().done(function () {
        if (u(o, e)) {
          o.load();
        }
      });
    } else {
      c(this, e, t);
    }
  };
  t.getDelayDeferred = function () {
    return this._delayDeferred;
  };
  t.itemsCount = function (e) {
    var t = 0;
    var n = this._controller.isVirtualMode();
    if (!e && n) {
      this._cache.forEach(function (e) {
        t += e.itemsCount;
      });
    } else {
      t = this._dataOptions.itemsCount();
    }
    return t;
  };
  t.virtualItemsCount = function () {
    var e = r(this);
    if (e < 0) {
      e = this._dataOptions.pageIndex();
    }
    var t = e * this._dataOptions.pageSize();
    var n = this._cache.length * this._dataOptions.pageSize();
    return {
      begin: t,
      end: Math.max(0, this._dataOptions.totalItemsCount() - n - t)
    };
  };
  t.reset = function () {
    this._loadingPageIndexes = {};
    this._cache = [];
  };
  return e;
}();
exports.VirtualDataLoader = h;