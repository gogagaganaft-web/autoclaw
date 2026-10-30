Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GroupingHelper = undefined;
var i = require("./47617.js");
var o = require("./62754.js");
var a = require("./13306.js");
var r = require("./95479.js");
var s = f(require("./96687.js"));
var l = f(require("./99236.js"));
var u = require("./16454.js");
var d = f(require("./74938.js"));
var c = require("./10087.js");
var h = require("./8748.js");
function f(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
var p;
var g;
var m;
var _;
var v;
function y(e, t) {
  var n = new o.Deferred();
  var i = (0, a.extend)({
    skip: 0,
    take: 1,
    requireTotalCount: true
  }, t);
  e.load(i).done(function (e, t) {
    n.resolve(t && t.totalCount);
  }).fail(n.reject.bind(n));
  return n;
}
var b = h.GroupingHelper.inherit((p = function (e, t, n) {
  return e.foreachGroups(function (e) {
    if (!e.isExpanded) {
      return t(e);
    }
  }, false, false, n, true);
}, g = function (e, t) {
  var n = 0;
  var i = t || 0;
  if (t) {
    p(e, function (e) {
      if (e.offset - n >= t) {
        return false;
      }
      n += e.count - 1;
    });
    i += n;
  }
  return i;
}, m = function (e, t) {
  if (e.length !== t.length) {
    return false;
  }
  for (var n = 0; n < e.length; n++) {
    if (!(0, u.keysEqual)(null, e[n], t[n])) {
      return false;
    }
  }
  return true;
}, _ = function e(t, n, i, o, a) {
  if (n) {
    for (var r = 0; r < n.length; r++) {
      var s = n[r];
      if ("key" in s && s.items !== undefined) {
        i.push(s.key);
        if (a && m(a.path, i) && !s.isContinuation) {
          a.offset = o;
        }
        var l = t.findGroupInfo(i);
        if (l && !s.isContinuation) {
          l.offset = o;
        }
        if (l && !l.isExpanded) {
          o += l.count;
        } else {
          o = e(t, s.items, i, o, a);
        }
        i.pop();
      } else {
        o++;
      }
    }
    return o;
  }
}, v = function e(t, n) {
  var i = t.count || t.items.length;
  if (!t.count && n > 1) {
    i = 0;
    for (var o = 0; o < t.items.length; o++) {
      i += e(t.items[o], n - 1);
    }
  }
  return i;
}, {
  handleDataLoading: function (e) {
    var t;
    var n = e.storeLoadOptions;
    var i = [];
    var o = 0;
    var s = false;
    var u = e.loadOptions.group;
    var c = 0;
    (function (e, t) {
      if (t.group) {
        var n = d.default.normalizeSortingInfo(t.group);
        var i = d.default.normalizeSortingInfo(e.sort);
        e.sort = l.default.arrangeSortingInfo(n, i);
        delete t.group;
      }
    })(n, e.loadOptions);
    e.group = e.group || u;
    if (!e.isCustomLoading) {
      var h = (0, a.extend)({}, n);
      h.skip = g(this, n.skip);
      if (h.skip && h.take && u) {
        h.skip--;
        h.take++;
        s = true;
      }
      if (h.take && u) {
        t = h.take;
        h.take++;
      }
      p(this, function (e) {
        if (e.offset >= h.skip + h.take + c) {
          return false;
        }
        if (e.offset >= h.skip + c && e.count) {
          c += e.count - 1;
          i.push(e);
          o += e.count;
        }
      });
      (0, r.each)(i, function () {
        h.filter = function (e, t, n) {
          var i = d.default.normalizeSortingInfo(n || t.group);
          var o = [];
          for (var a = 0; a < e.length; a++) {
            var r = [];
            for (var s = 0; s <= a; s++) {
              r.push([i[s].selector, a === s ? "<>" : "=", e[s]]);
            }
            o.push(d.default.combineFilters(r));
          }
          o = d.default.combineFilters(o, "or");
          return d.default.combineFilters([o, t.filter]);
        }(this.path, h, u);
      });
      e.storeLoadOptions = h;
      e.collapsedGroups = i;
      e.collapsedItemsCount = o;
      e.skip = h.skip || 0;
      e.skipFirstItem = s;
      e.take = t;
    }
  },
  handleDataLoaded: function (e, t) {
    var n = e.collapsedGroups;
    var o = d.default.normalizeSortingInfo(e.group);
    var a = o.length;
    function r(e, t, n, o, a) {
      if (e && t.length && n.length) {
        var s;
        var l;
        var u = (0, i.toComparable)(t[0], true);
        for (l = 0; l < e.length && (s = (0, i.toComparable)(e[l].key, true), !(a >= o.offset) && u !== s); l++) {
          a += v(e[l], n.length);
        }
        if (!e.length || u !== s) {
          e.splice(l, 0, {
            key: t[0],
            items: [],
            count: t.length === 1 ? o.count : undefined
          });
        }
        r(e[l].items, t.slice(1), n.slice(1), o, a);
      }
    }
    if (e.collapsedItemsCount && e.extra && e.extra.totalCount >= 0) {
      if (!e.extra._totalCountWasIncreasedByCollapsedItems) {
        e.extra.totalCount += e.collapsedItemsCount;
        e.extra._totalCountWasIncreasedByCollapsedItems = true;
      }
    }
    t(e);
    if (a) {
      var u = e.data;
      var c = (0, s.default)(u);
      l.default.multiLevelGroup(c, o).enumerate().done(function (e) {
        u = e;
      });
      if (n) {
        for (var h = 0; h < n.length; h++) {
          r(u, n[h].path, o, n[h], e.skip);
        }
      }
      if (!e.isCustomLoading) {
        (function e(t, n, i, o, a, r) {
          var s = 0;
          var l = false;
          for (var u = 0; u < n.length; u++) {
            var d = n[u];
            if (d.items !== undefined) {
              i.push(d.key);
              var c = t.findGroupInfo(i);
              if (c && !c.isExpanded) {
                d.collapsedItems = d.items;
                d.items = null;
                o += c.count;
                if (--r < 0) {
                  s++;
                }
                if (a) {
                  l = true;
                }
              } else if (d.items) {
                var h = e(t, d.items, i, o, a, r);
                if (a) {
                  if (h.offset - o > 1) {
                    d.isContinuation = true;
                  } else {
                    l = true;
                  }
                }
                o = h.offset;
                if ((r = h.take) < 0) {
                  if (d.items.length) {
                    d.isContinuationOnNextPage = true;
                  } else {
                    s++;
                  }
                }
              }
              i.pop();
            } else {
              if (a) {
                l = true;
              }
              o++;
              if (--r < 0) {
                s++;
              }
            }
            a = false;
          }
          if (l) {
            n.splice(0, 1);
          }
          if (s) {
            n.splice(-s, s);
          }
          return {
            offset: o,
            take: r
          };
        })(this, u, [], e.skip, e.skipFirstItem, e.take);
      }
      e.data = u;
    }
  },
  isGroupItemCountable: function (e) {
    return e.items === null;
  },
  updateTotalItemsCount: function () {
    var e = 0;
    p(this, function (t) {
      if (t.count) {
        e -= t.count - 1;
      }
    });
    this.callBase(e);
  },
  changeRowExpand: function (e) {
    var t;
    var n = this;
    var i = n._dataSource;
    var a = i.beginPageIndex ? i.beginPageIndex() : i.pageIndex();
    var r = i.items();
    var s = g(n, a * i.pageSize());
    var l = n.findGroupInfo(e);
    t = l && !l.isExpanded ? new o.Deferred().resolve(l.count) : y(i, {
      filter: (0, c.createGroupFilter)(e, {
        filter: i.filter(),
        group: i.group()
      })
    });
    return (0, o.when)(t).done(function (t) {
      t = parseInt(t.length ? t[0] : t);
      if (l) {
        _(n, r, [], s);
        l.isExpanded = !l.isExpanded;
        l.count = t;
      } else {
        _(n, r, [], s, l = {
          offset: -1,
          count: t,
          path: e,
          isExpanded: false
        });
        if (l.offset >= 0) {
          n.addGroupInfo(l);
        }
      }
      n.updateTotalItemsCount();
    }).fail(function () {
      i._eventsStrategy.fireEvent("loadError", arguments);
    });
  },
  allowCollapseAll: function () {
    return false;
  },
  refresh: function (e, t) {
    var n = this;
    var i = e.storeLoadOptions;
    var a = n._dataSource;
    this.callBase.apply(this, arguments);
    if (t.reload) {
      return p(n, function (e) {
        var t = y(a, {
          filter: (0, c.createGroupFilter)(e.path, i)
        });
        var r = y(a, {
          filter: (0, h.createOffsetFilter)(e.path, i)
        });
        return (0, o.when)(r, t).done(function (t, i) {
          t = parseInt(t.length ? t[0] : t);
          i = parseInt(i.length ? i[0] : i);
          e.offset = t;
          if (e.count !== i) {
            e.count = i;
            n.updateTotalItemsCount();
          }
        });
      }, true);
    }
  }
}));
exports.GroupingHelper = b;