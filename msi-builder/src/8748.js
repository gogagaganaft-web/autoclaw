Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GroupingHelper = undefined;
exports.createOffsetFilter = function (e, t, n) {
  var i = (0, r.normalizeSortingInfo)(t.group);
  var o = [];
  for (var a = n ? e.length - 1 : 0; a < e.length; a++) {
    var l = [];
    for (var u = 0; u <= a; u++) {
      var d = i[u].selector;
      if (a !== u || e[u] !== null && e[u] !== false && e[u] !== true) {
        var c = [d, a === u ? i[u].desc ? ">" : "<" : "=", e[u]];
        if (c[1] === "<") {
          l.push([c, "or", [d, "=", null]]);
        } else {
          l.push(c);
        }
      } else if (e[u] === false) {
        l.push([d, "=", !!i[u].desc || null]);
      } else if (e[u] ? !i[u].desc : i[u].desc) {
        l.push([d, "<>", e[u]]);
      } else {
        l.push([d, "<>", null]);
        l.push([d, "=", null]);
      }
    }
    o.push(s.default.combineFilters(l));
  }
  o = s.default.combineFilters(o, "or");
  return s.default.combineFilters([o, t.filter]);
};
var i = l(require("./38377.js"));
var o = l(require("./68374.js"));
var a = require("./62754.js");
var r = require("./16454.js");
var s = l(require("./74938.js"));
function l(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
var u;
var d;
var c = i.default.inherit((u = function (e, t) {
  var n = e.hash;
  return n && n[JSON.stringify(t)];
}, d = function (e, t) {
  var n;
  var i = 0;
  var o = e.length - 1;
  if (!e.length) {
    return 0;
  }
  do {
    var a = o + i >> 1;
    if (e[a].offset > t) {
      o = a;
    } else {
      i = a;
    }
  } while (o - i > 1);
  for (n = i; n <= o && !(e[n].offset > t); n++);
  return n;
}, {
  ctor: function (e) {
    this._dataSource = e;
    this.reset();
  },
  reset: function () {
    this._groupsInfo = [];
    this._totalCountCorrection = 0;
  },
  totalCountCorrection: function () {
    return this._totalCountCorrection;
  },
  updateTotalItemsCount: function (e) {
    this._totalCountCorrection = e || 0;
  },
  isGroupItemCountable: function (e) {
    return !this._isVirtualPaging() || !e.isContinuation;
  },
  _isVirtualPaging: function () {
    var e = this._dataSource.option("scrolling.mode");
    return e === "virtual" || e === "infinite";
  },
  itemsCount: function () {
    var e = this._dataSource._dataSource;
    var t = s.default.normalizeSortingInfo(e.group() || []).length;
    var n = function e(t, n, i) {
      var o = 0;
      if (n) {
        if (i) {
          for (var a = 0; a < n.length; a++) {
            if (t.isGroupItemCountable(n[a])) {
              o++;
            }
            o += e(t, n[a].items, i - 1);
          }
        } else {
          o = n.length;
        }
      }
      return o;
    }(this, e.items(), t);
    return n;
  },
  foreachGroups: function (e, t, n, i, r) {
    var s = this;
    return function e(t, l, u, d) {
      var c = [];
      function h(e, t, n, i) {
        var o = t && e(t, n);
        if (o) {
          i.push(o);
        }
        return o;
      }
      for (var f = 0; f < t.length; f++) {
        d.push(t[f].data);
        if (!u && h(l, t[f].data, d, c) === false) {
          return false;
        }
        if (!t[f].data || t[f].data.isExpanded || n) {
          var p = t[f].children;
          var g = p.length && e(p, l, u, d);
          if (g) {
            c.push(g);
          }
          if (g === false) {
            return false;
          }
        }
        if (u && h(l, t[f].data, d, c) === false) {
          return false;
        }
        if (!t[f].data || t[f].data.offset !== t[f].offset) {
          i = true;
        }
        d.pop();
      }
      var m = r && d.slice(0);
      return i && a.when.apply(o.default, c).always(function () {
        s._updateGroupInfoOffsets(t, m);
      });
    }(s._groupsInfo, e, t, []);
  },
  _updateGroupInfoOffsets: function (e, t) {
    t = t || [];
    for (var n = 0; n < e.length; n++) {
      var i = e[n];
      if (i.data && i.data.offset !== i.offset) {
        i.offset = i.data.offset;
        for (var o = 0; o < t.length; o++) {
          t[o].offset = i.offset;
        }
      }
    }
    e.sort(function (e, t) {
      return e.offset - t.offset;
    });
  },
  findGroupInfo: function (e) {
    var t;
    for (var n = this._groupsInfo, i = 0; n && i < e.length; i++) {
      n = (t = u(n, e[i])) && t.children;
    }
    return t && t.data;
  },
  addGroupInfo: function (e) {
    var t;
    for (var n = e.path, i = this._groupsInfo, o = 0; o < n.length; o++) {
      if (!(t = u(i, n[o]))) {
        t = {
          key: n[o],
          offset: e.offset,
          data: {
            offset: e.offset,
            isExpanded: true,
            path: n.slice(0, o + 1)
          },
          children: []
        };
        var a = d(i, e.offset);
        i.splice(a, 0, t);
        i.hash = i.hash || {};
        i.hash[JSON.stringify(t.key)] = t;
      }
      if (o === n.length - 1) {
        t.data = e;
        if (t.offset !== e.offset) {
          this._updateGroupInfoOffsets(i);
        }
      }
      i = t.children;
    }
  },
  allowCollapseAll: function () {
    return true;
  },
  refresh: function (e) {
    var t = e.storeLoadOptions;
    var n = (0, r.normalizeSortingInfo)(t.group || []);
    var i = "_group" in this ? (0, r.normalizeSortingInfo)(this._group || []) : n;
    var o = Math.min(i.length, n.length);
    this._group = t.group;
    for (var a = 0; a < o; a++) {
      if (i[a].selector !== n[a].selector) {
        o = a;
        break;
      }
    }
    if (o) {
      (function e(t, n, i) {
        for (var o = 0; o < t.length; o++) {
          if (n + 1 >= i) {
            t[o].children = [];
          } else {
            e(t[o].children, n + 1, i);
          }
        }
      })(this._groupsInfo, 0, o);
    } else {
      this.reset();
    }
  },
  handleDataLoading: function () {},
  handleDataLoaded: function (e, t) {
    t(e);
  },
  handleDataLoadedCore: function (e, t) {
    t(e);
  }
}));
exports.GroupingHelper = c;