Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GroupingHelper = undefined;
var i = require("./62754.js");
var o = require("./13306.js");
var a = require("./95479.js");
var r = require("./18438.js");
var s = c(require("./96688.js"));
var l = c(require("./74938.js"));
var u = require("./10087.js");
var d = require("./8748.js");
function c(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
function h(e, t, n, i) {
  i = i || 0;
  if (t > 1 && n > 0) {
    var o = e - Math.floor(e / t) * t || t;
    if ((o += n - i - 2) < 0) {
      o += t;
    }
    return Math.floor(o / (t - i - 1));
  }
  return 0;
}
var f = d.GroupingHelper.inherit(function () {
  function e(e, t, n) {
    return e.foreachGroups(function (e, n) {
      if (e.isExpanded) {
        return t(e, n);
      }
    }, true, false, n, n);
  }
  var t = function e(t, n, i, o, a, r, s) {
    var l;
    o.items = o.items || [];
    o.paths = o.paths || [];
    o.count = o.count || 0;
    o.lastCount = o.lastCount || 0;
    if (i) {
      for (var u = 0; u < n.length; u++) {
        var d = n[u];
        if (d.items !== undefined) {
          a.push(d.key);
          if (r) {
            l = true;
          } else {
            var c = t.findGroupInfo(a);
            l = c && c.isExpanded;
          }
          if (l) {
            if (d.items) {
              e(t, d.items, i - 1, o, a, r, s);
            } else if (i === 1 && !!d.count && (!r || !!s)) {
              o.items.push(d);
              o.paths.push(a.slice(0));
              o.count += o.lastCount;
              o.lastCount = d.count;
            }
          } else {
            d.collapsedItems = d.items;
            d.items = null;
          }
          a.pop();
        }
      }
    }
  };
  function n(e, t, n, i, o) {
    var a;
    var r = e.findGroupInfo(i);
    if (r) {
      if (n) {
        r.count = t.count > 0 ? t.count : t.items && t.items.length || 0;
      } else {
        t.count = r.count || t.count;
      }
      r.offset = o;
    } else {
      if (n) {
        a = t.count > 0 ? t.count : t.items.length;
      }
      e.addGroupInfo({
        isExpanded: e._isGroupExpanded(i.length - 1),
        path: i.slice(0),
        offset: o,
        count: a || 0
      });
    }
  }
  var c = function e(t, i, o, a, r, s, l) {
    var u;
    var d = (i.group ? i.group.length : 0) === a;
    var c = 0;
    var h = 0;
    r = r || 0;
    s = s || [];
    if (i.remoteOperations.paging && !l) {
      c = r === 0 ? i.skip || 0 : i.skips[r - 1] || 0;
    }
    if (r >= a) {
      return o.length;
    }
    for (var f = 0; f < o.length; f++) {
      var p = o[f];
      if (p) {
        s.push(p.key);
        if (!p.count && !p.items || p.items === undefined) {
          return -1;
        }
        n(t, p, d, s, c + f);
        if ((u = p.items ? e(t, i, p.items, a, r + 1, s, f) : p.count || -1) < 0) {
          return -1;
        }
        h += u;
        s.pop();
      }
    }
    return h;
  };
  function f(e, t) {
    return e && e.length && e[t] && !!e[t].isExpanded;
  }
  function p(e, t, n) {
    var i;
    var o = n;
    for (var a = 0; a < e.length; a++) {
      i = e[a].offset + 1;
      if (a > 0) {
        i += e[a - 1].childrenTotalCount;
        if (t) {
          i += h(o, t, i, a - 1) * a;
        }
      }
      o += i;
    }
    return o;
  }
  function g(e, t, n, i) {
    var o = t.items[i];
    var a = e.skips && e.skips[n];
    var r = e.takes && e.takes[n];
    var s = i === t.items.length - 1;
    var l = i === 0;
    var u = l && a || 0;
    var d = o.count > r + u;
    if (l && a !== undefined) {
      o.isContinuation = true;
    }
    if (s && r !== undefined && d) {
      o.isContinuationOnNextPage = true;
    }
  }
  function m(e) {
    return !Array.isArray(e);
  }
  function _(e) {
    if (!m(e.data)) {
      e.data = new i.Deferred();
    }
  }
  function v(e, n, r, s, d, h) {
    if (!n.isCustomLoading) {
      t(e, h, r, s = {}, []);
      (function (e, t, n) {
        var i = n - 1;
        var o = e.group ? e.group.length : 0;
        t.skip = e.skips && e.skips[i];
        if (e.takes && e.takes[i] !== undefined) {
          t.take = o === n && t.count ? t.count - (t.skip || 0) : 0;
          t.take += e.takes[i];
        }
      })(n, s, r);
    }
    var f = n.group ? n.group.length : 0;
    if (s.paths.length && f - r > 0) {
      _(n);
      (function (e, t, n, o, r, s) {
        var l = t.group || [];
        var d = l[r + 1];
        var h = [];
        (0, a.each)(n.paths, function (o) {
          var s = {
            requireTotalCount: false,
            requireGroupCount: true,
            group: [d],
            groupSummary: t.storeLoadOptions.groupSummary,
            filter: (0, u.createGroupFilter)(n.paths[o], {
              filter: t.storeLoadOptions.filter,
              group: l
            }),
            select: t.storeLoadOptions.select,
            langParams: t.storeLoadOptions?.langParams
          };
          if (o === 0) {
            s.skip = n.skip || 0;
          }
          if (o === n.paths.length - 1) {
            s.take = n.take;
          }
          var c = s.take === 0 ? [] : e._dataSource.loadFromStore(s);
          (0, i.when)(c).done(function (e) {
            var i = n.items[o];
            g(t, n, r, o);
            i.items = e;
          });
          h.push(c);
        });
        i.when.apply(null, h).done(function () {
          c(e, t, s, o + 1);
          v(e, t, o + 1, n, r + 1, s);
        });
      })(e, n, s, r, d, h);
    } else if (s.paths.length && n.storeLoadOptions.group) {
      _(n);
      (function (e, t, n, r) {
        var s = [];
        var d = t.group || [];
        (0, a.each)(n.paths, function (e, n) {
          s.push((0, u.createGroupFilter)(n, {
            group: t.isCustomLoading ? t.storeLoadOptions.group : d
          }));
        });
        var c = t.storeLoadOptions.filter;
        if (!t.storeLoadOptions.isLoadingAll) {
          c = l.default.combineFilters([c, l.default.combineFilters(s, "or")]);
        }
        var h = (0, o.extend)({}, t.storeLoadOptions, {
          requireTotalCount: false,
          requireGroupCount: false,
          group: null,
          sort: d.concat(l.default.normalizeSortingInfo(t.storeLoadOptions.sort || [])),
          filter: c
        });
        var f = e._dataSource.isLastLevelGroupItemsPagingLocal();
        if (!f) {
          h.skip = n.skip;
          h.take = n.take;
        }
        (0, i.when)(n.take === 0 ? [] : e._dataSource.loadFromStore(h)).done(function (i) {
          if (f) {
            i = e._dataSource.sortLastLevelGroupItems(i, d, n.paths);
            i = n.skip ? i.slice(n.skip) : i;
            i = n.take ? i.slice(0, n.take) : i;
          }
          (0, a.each)(n.items, function (e, o) {
            var a = o.count - (e === 0 && n.skip || 0);
            var r = i.splice(0, a);
            g(t, n, d.length - 1, e);
            o.items = r;
          });
          t.data.resolve(r);
        }).fail(t.data.reject);
      })(e, n, s, h);
    } else if (m(n.data)) {
      n.data.resolve(h);
    }
  }
  function y(e, t) {
    var n = new i.Deferred();
    var a = !!t.group && !!t.group.length;
    var s = (0, o.extend)({
      skip: 0,
      take: 1,
      requireGroupCount: a,
      requireTotalCount: !a
    }, t, {
      group: a ? t.group : null
    });
    e.load(s).done(function (e, t) {
      var i = t && (a ? t.groupCount : t.totalCount);
      if (isFinite(i)) {
        n.resolve(i);
      } else {
        n.reject(r.errors.Error(a ? "E4022" : "E4021"));
      }
    }).fail(n.reject.bind(n));
    return n;
  }
  return {
    updateTotalItemsCount: function (t) {
      var n = 0;
      var i = t.extra && t.extra.totalCount || 0;
      var o = t.extra && t.extra.groupCount || 0;
      var a = this._dataSource.pageSize();
      var r = this._isVirtualPaging();
      e(this, function (e) {
        e.childrenTotalCount = 0;
      });
      e(this, function (e, t) {
        var i = p(t, r ? 0 : a, n);
        var o = e.count + e.childrenTotalCount;
        if (!r) {
          o += h(i, a, o, t.length - 1);
        }
        if (t[t.length - 2]) {
          t[t.length - 2].childrenTotalCount += o;
        } else {
          n += o;
        }
      });
      this.callBase(n - i + o);
    },
    _isGroupExpanded: function (e) {
      var t = this._dataSource.group();
      return f(t, e);
    },
    _updatePagingOptions: function (t, n) {
      var i = this._isVirtualPaging();
      var o = this._dataSource.pageSize();
      var a = [];
      var r = [];
      var s = 0;
      var l = 0;
      if (t.take) {
        e(this, function (e) {
          e.childrenTotalCount = 0;
          e.skipChildrenTotalCount = 0;
        });
        e(this, function (e, u) {
          var d;
          var c = 0;
          var f = 0;
          var g = p(u, i ? 0 : o, l);
          var m = 0;
          var _ = 0;
          var v = e.count + e.childrenTotalCount;
          var y = v;
          if (n) {
            n(e, g);
          }
          var b = t.skip - g;
          if (g <= t.skip + t.take && v) {
            d = t.take;
            if (!i) {
              v += (m = h(g, o, v, u.length - 1)) * u.length;
              y += m;
              if (o && b >= 0) {
                c = u.length;
                f = u.length - 1;
                _ = Math.floor(b / o);
              }
            }
            if (b >= 0) {
              if (g + v > t.skip) {
                a.unshift(b - _ * c - e.skipChildrenTotalCount);
              }
              if (g + v >= t.skip + d) {
                r.unshift(d - c - e.childrenTotalCount + e.skipChildrenTotalCount);
              }
            } else if (g + v >= t.skip + d) {
              r.unshift(d + b - e.childrenTotalCount);
            }
          }
          if (g <= t.skip) {
            if (u[u.length - 2]) {
              u[u.length - 2].skipChildrenTotalCount += Math.min(y, b + 1 - _ * f);
            } else {
              s += Math.min(y, b + 1);
            }
          }
          if (g <= t.skip + d) {
            v = Math.min(y, b + d - (_ + 1) * f);
            if (u[u.length - 2]) {
              u[u.length - 2].childrenTotalCount += v;
            } else {
              l += v;
            }
          }
        });
        t.skip -= s;
        t.take -= l - s;
      }
      t.skips = a;
      t.takes = r;
    },
    changeRowExpand: function (e) {
      var t = this.findGroupInfo(e);
      var n = this._dataSource;
      var o = n.remoteOperations().groupPaging;
      var a = l.default.normalizeSortingInfo(n.group());
      if (t) {
        t.isExpanded = !t.isExpanded;
        if (o && t.isExpanded && e.length < a.length) {
          return y(n, {
            filter: (0, u.createGroupFilter)(e, {
              filter: n.lastLoadOptions().filter,
              group: n.group()
            }),
            group: [a[e.length]],
            select: n.select()
          }).done(function (e) {
            t.count = e;
          });
        } else {
          return new i.Deferred().resolve();
        }
      } else {
        return new i.Deferred().reject();
      }
    },
    handleDataLoading: function (e) {
      var t = e.storeLoadOptions;
      var n = l.default.normalizeSortingInfo(t.group || e.loadOptions.group);
      if (!e.isCustomLoading && n.length) {
        if (e.remoteOperations.grouping) {
          var i = this._dataSource.remoteOperations().paging;
          t.group = l.default.normalizeSortingInfo(t.group);
          t.group.forEach(function (e, n) {
            var o = n === t.group.length - 1;
            e.isExpanded = !i || !o;
          });
        }
        e.group = e.group || n;
        if (e.remoteOperations.paging) {
          e.skip = t.skip;
          e.take = t.take;
          t.requireGroupCount = true;
          t.group = n.slice(0, 1);
          this._updatePagingOptions(e);
          t.skip = e.skip;
          t.take = e.take;
        } else {
          e.skip = e.loadOptions.skip;
          e.take = e.loadOptions.take;
          this._updatePagingOptions(e);
        }
      }
    },
    handleDataLoadedCore: function (e, n) {
      var o;
      var a = l.default.normalizeSortingInfo(e.storeLoadOptions.group || e.loadOptions.group).length;
      var u = e.group ? e.group.length : 0;
      var d = {};
      if (e.isCustomLoading) {
        n(e);
        t(this, e.data, a, d, [], e.isCustomLoading, e.storeLoadOptions.isLoadingAll);
      } else {
        if (!e.remoteOperations.paging) {
          this.foreachGroups(function (e) {
            e.count = 0;
          });
        }
        if ((o = c(this, e, e.data, a)) < 0) {
          e.data = new i.Deferred().reject(s.default.Error("E1037"));
          return;
        }
        if (!e.remoteOperations.paging) {
          if (a && e.extra && e.loadOptions.requireTotalCount) {
            e.extra.totalCount = o;
            e.extra.groupCount = e.data.length;
          }
        }
        if (u && e.storeLoadOptions.requireGroupCount && !isFinite(e.extra.groupCount)) {
          e.data = new i.Deferred().reject(r.errors.Error("E4022"));
          return;
        }
        this.updateTotalItemsCount(e);
        if (!e.remoteOperations.paging) {
          this._updatePagingOptions(e);
        }
        n(e);
        if (!e.remoteOperations.paging) {
          this._processPaging(e, a);
        }
      }
      v(this, e, a, d, 0, e.data);
    },
    _processSkips: function (e, t, n) {
      if (n) {
        var i = e[0];
        var o = t[0];
        var a = i && i.items;
        if (o !== undefined) {
          i.isContinuation = true;
          if (a) {
            i.items = a.slice(o);
            this._processSkips(i.items, t.slice(1), n - 1);
          }
        }
      }
    },
    _processTakes: function (e, t, n, i, o) {
      if (i && e) {
        o = o || [];
        var a = e[e.length - 1];
        var r = a && a.items;
        var s = n[0];
        var l = t[0];
        if (a) {
          var u = a.count - (a.isContinuation && l || 0) || r.length;
          if (s !== undefined && u > s) {
            a.isContinuationOnNextPage = true;
            o.forEach(function (e) {
              e.isContinuationOnNextPage = true;
            });
            if (r) {
              r = r.slice(0, s);
              a.items = r;
            }
          }
          o.push(a);
          this._processTakes(r, t.slice(1), n.slice(1), i - 1, o);
        }
      }
    },
    _processPaging: function (e, t) {
      this._processSkips(e.data, e.skips, t);
      this._processTakes(e.data, e.skips, e.takes, t);
    },
    isLastLevelGroupItemsPagingLocal: function () {
      return false;
    },
    sortLastLevelGroupItems: function (e) {
      return e;
    },
    refresh: function (t, n) {
      var o;
      var a;
      var r = this;
      var s = r._dataSource;
      var c = t.storeLoadOptions;
      var h = t.group || t.storeLoadOptions.group;
      var p = l.default.normalizeSortingInfo(r._group);
      function g(e, t) {
        if (t.length === a + 1) {
          e.isExpanded = o;
        }
      }
      for (a = 0; a < p.length; a++) {
        o = f(h, a);
        if (f(r._group, a) !== o) {
          r.foreachGroups(g);
        }
      }
      r.callBase.apply(this, arguments);
      if (h && t.remoteOperations.paging && n.reload) {
        return e(r, function (e) {
          var n = y(s, {
            filter: (0, u.createGroupFilter)(e.path, {
              filter: c.filter,
              group: h
            }),
            group: h.slice(e.path.length),
            select: c.select
          });
          var o = y(s, {
            filter: (0, d.createOffsetFilter)(e.path, {
              filter: c.filter,
              group: h
            }, true),
            group: h.slice(e.path.length - 1, e.path.length),
            select: c.select
          });
          return (0, i.when)(o, n).done(function (n, i) {
            n = parseInt(n.length ? n[0] : n);
            i = parseInt(i.length ? i[0] : i);
            e.offset = n;
            if (e.count !== i) {
              e.count = i;
              r.updateTotalItemsCount(t);
            }
          });
        }, true);
      }
    }
  };
}());
exports.GroupingHelper = f;