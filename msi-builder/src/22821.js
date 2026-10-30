Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;
var i = require("./20576.js");
var o = require("./47617.js");
var a = require("./62754.js");
var r = require("./13306.js");
var s = require("./95479.js");
var l = require("./35922.js");
var u = _(require("./26562.js"));
var d = require("./60637.js");
var c = _(require("./96687.js"));
var h = _(require("./99236.js"));
var f = _(require("./96688.js"));
var p = _(require("./30945.js"));
var g = _(require("./60082.js"));
var m = _(require("./12500.js"));
function _(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
var v = h.default.queryByOptions;
function y(e) {
  return e.option("filterMode") === "fullBranch";
}
var b = p.default.inherit({
  _createKeyGetter: function () {
    var e = this.getKeyExpr();
    return (0, o.compileGetter)(e);
  },
  _createKeySetter: function () {
    var e = this.getKeyExpr();
    if ((0, l.isFunction)(e)) {
      return e;
    } else {
      return (0, o.compileSetter)(e);
    }
  },
  createParentIdGetter: function () {
    return (0, o.compileGetter)(this.option("parentIdExpr"));
  },
  createParentIdSetter: function () {
    var e = this.option("parentIdExpr");
    if ((0, l.isFunction)(e)) {
      return e;
    } else {
      return (0, o.compileSetter)(e);
    }
  },
  _createItemsGetter: function () {
    return (0, o.compileGetter)(this.option("itemsExpr"));
  },
  _createHasItemsGetter: function () {
    var e = this.option("hasItemsExpr");
    return e && (0, o.compileGetter)(e);
  },
  _createHasItemsSetter: function () {
    var e = this.option("hasItemsExpr");
    if ((0, l.isFunction)(e)) {
      return e;
    } else {
      return e && (0, o.compileSetter)(e);
    }
  },
  _updateIndexByKeyObject: function (e) {
    var t = this;
    t._indexByKey = {};
    (0, s.each)(e, function (e, n) {
      t._indexByKey[n.key] = e;
    });
  },
  _calculateHasItems: function (e, t) {
    var n;
    var i = t.storeLoadOptions.parentIds;
    var o = y(this);
    if (this._hasItemsGetter && (i || !t.storeLoadOptions.filter || o)) {
      n = this._hasItemsGetter(e.data);
    }
    if (n === undefined) {
      n = !this._isChildrenLoaded[e.key] && !!t.remoteOperations.filtering && (!!i || !!o) || (t.loadOptions.filter && !t.remoteOperations.filtering && o ? e.children.length : e.hasChildren);
    }
    return !!n;
  },
  _fillVisibleItemsByNodes: function (e, t, n) {
    for (var i = 0; i < e.length; i++) {
      if (e[i].visible) {
        n.push(e[i]);
      }
      if ((this.isRowExpanded(e[i].key, t) || !e[i].visible) && e[i].hasChildren && e[i].children.length) {
        this._fillVisibleItemsByNodes(e[i].children, t, n);
      }
    }
  },
  _convertItemToNode: function (e, t, n) {
    var i = this._keyGetter(e);
    var o = this._parentIdGetter(e);
    var a = n[o = (0, l.isDefined)(o) ? o : t] = n[o] || {
      key: o,
      children: []
    };
    var r = n[i] = n[i] || {
      key: i,
      children: []
    };
    r.data = e;
    r.parent = a;
    return r;
  },
  _createNodesByItems: function (e, t) {
    var n;
    var i = this.option("rootValue");
    var o = {};
    var a = this._nodeByKey = {};
    if (t) {
      for (n = 0; n < t.length; n++) {
        o[this._keyGetter(t[n])] = true;
      }
    }
    for (n = 0; n < e.length; n++) {
      var r = this._convertItemToNode(e[n], i, a);
      if (r.key === undefined) {
        return;
      }
      r.visible = !t || !!o[r.key];
      if (r.parent) {
        r.parent.children.push(r);
      }
    }
    var s = a[i] || {
      key: i,
      children: []
    };
    s.level = -1;
    return s;
  },
  _convertDataToPlainStructure: function (e, t, n) {
    var i;
    if (this._itemsGetter && !e.isConverted) {
      n = n || [];
      for (var o = 0; o < e.length; o++) {
        var a = (0, d.createObjectWithChanges)(e[o]);
        if ((i = this._keyGetter(a)) === undefined) {
          i = n.length + 1;
          this._keySetter(a, i);
        }
        this._parentIdSetter(a, t === undefined ? this.option("rootValue") : t);
        n.push(a);
        var r = this._itemsGetter(a);
        if (r && r.length) {
          this._convertDataToPlainStructure(r, i, n);
          var s = this.option("itemsExpr");
          if (!(0, l.isFunction)(s)) {
            delete a[s];
          }
        }
      }
      n.isConverted = true;
      return n;
    }
    return e;
  },
  _createIdFilter: function (e, t) {
    var n = [];
    for (var i = 0; i < t.length; i++) {
      n.push([e, "=", t[i]]);
    }
    return g.default.combineFilters(n, "or");
  },
  _customizeRemoteOperations: function (e, t) {
    this.callBase.apply(this, arguments);
    e.remoteOperations.paging = false;
    var n = false;
    if (this.option("autoExpandAll")) {
      e.remoteOperations.sorting = false;
      e.remoteOperations.filtering = false;
      if ((!this._lastLoadOptions || !!t.filtering && !e.storeLoadOptions.filter) && !e.isCustomLoading) {
        n = true;
      }
    }
    if (!e.isCustomLoading) {
      this._isReload = this._isReload || t.reload;
      if (!e.cachedStoreData) {
        this._isChildrenLoaded = {};
        if (this._isReload) {
          this._nodeByKey = {};
        }
      }
      if (this.option("expandNodesOnFiltering") && (t.filtering || this._isReload && e.storeLoadOptions.filter)) {
        if (e.storeLoadOptions.filter) {
          n = true;
        } else {
          e.collapseVisibleNodes = true;
        }
      }
    }
    e.expandVisibleNodes = n;
  },
  _getParentIdsToLoad: function (e) {
    var t = [];
    for (var n = 0; n < e.length; n++) {
      var i = this.getNodeByKey(e[n]);
      if (!i || i.hasChildren && !i.children.length) {
        t.push(e[n]);
      }
    }
    return t;
  },
  _handleCustomizeStoreLoadOptions: function (e) {
    var t = this.option("rootValue");
    var n = this.option("parentIdExpr");
    var i = e.storeLoadOptions.parentIds;
    if (i) {
      e.isCustomLoading = false;
    }
    this.callBase.apply(this, arguments);
    if (e.remoteOperations.filtering && !e.isCustomLoading && (y(this) && e.cachedStoreData || !e.storeLoadOptions.filter)) {
      var o = e.collapseVisibleNodes ? [] : this.option("expandedRowKeys");
      i = [t].concat(o).concat(i || []);
      var a = e.data ? this._getParentIdsToLoad(i) : i;
      if (a.length) {
        e.cachedPagingData = undefined;
        e.data = undefined;
        e.mergeStoreLoadData = true;
        e.delay = this.option("loadingTimeout");
      }
      e.storeLoadOptions.parentIds = a;
      e.storeLoadOptions.filter = this._createIdFilter(n, a);
    }
  },
  _generateInfoToLoad: function (e, t) {
    var n;
    var i;
    var o = {};
    var a = {};
    var r = [];
    var s = this.option("rootValue");
    for (i = 0; i < e.length; i++) {
      o[n = t ? this._parentIdGetter(e[i]) : this._keyGetter(e[i])] = true;
    }
    for (i = 0; i < e.length; i++) {
      n = t ? this._keyGetter(e[i]) : this._parentIdGetter(e[i]);
      var l = t ? this.isRowExpanded(n) : n !== s;
      if (!o[n] && !a[n] && !!l) {
        a[n] = true;
        r.push(n);
      }
    }
    return {
      keyMap: a,
      keys: r
    };
  },
  _loadParentsOrChildren: function (e, t, n) {
    var i;
    var o;
    var s = this;
    var l = this;
    var d = l._generateInfoToLoad(e, n);
    var h = d.keys;
    var f = d.keyMap;
    var p = new a.Deferred();
    var g = t.remoteOperations.filtering;
    var m = l.option("maxFilterLengthInRequest");
    var _ = g ? t.storeLoadOptions : t.loadOptions;
    function v(t) {
      if (g) {
        l._cachedStoreData = l._cachedStoreData.concat(t);
      }
      return e.concat(t);
    }
    if (!h.length) {
      return p.resolve(e);
    }
    var y = h.map(function (e) {
      return s.getNodeByKey(e);
    }).filter(function (e) {
      return e && e.data;
    });
    if (y.length === h.length && (n && (y = y.reduce(function (e, t) {
      return e.concat(t.children);
    }, [])), y.length)) {
      return l._loadParentsOrChildren(v(y.map(function (e) {
        return e.data;
      })), t, n);
    }
    var b = n ? l.option("parentIdExpr") : l.getKeyExpr();
    i = l._createIdFilter(b, h);
    if (encodeURI(JSON.stringify(i)).length > m) {
      i = function (e) {
        return f[n ? l._parentIdGetter(e) : l._keyGetter(e)];
      };
      o = g;
    }
    _ = (0, r.extend)({}, _, {
      filter: o ? null : i
    });
    var x = t.fullData ? new u.default(t.fullData) : l._dataSource.store();
    l.loadFromStore(_, x).done(function (a) {
      if (a.length) {
        if (o) {
          a = (0, c.default)(a).filter(i).toArray();
        }
        l._loadParentsOrChildren(v(a), t, n).done(p.resolve).fail(p.reject);
      } else {
        p.resolve(e);
      }
    }).fail(p.reject);
    return p;
  },
  _loadParents: function (e, t) {
    return this._loadParentsOrChildren(e, t);
  },
  _loadChildrenIfNeed: function (e, t) {
    if (y(this)) {
      return this._loadParentsOrChildren(e, t, true);
    } else {
      return (0, a.when)(e);
    }
  },
  _updateHasItemsMap: function (e) {
    var t = e.storeLoadOptions.parentIds;
    if (t) {
      for (var n = 0; n < t.length; n++) {
        this._isChildrenLoaded[t[n]] = true;
      }
    }
  },
  _getKeyInfo: function () {
    return {
      key: function () {
        return "key";
      },
      keyOf: function (e) {
        return e.key;
      }
    };
  },
  _processChanges: function (e) {
    var t = this;
    var n = [];
    e.forEach(function (e) {
      if (e.type === "insert") {
        n = n.concat(t._applyInsert(e));
      } else if (e.type === "remove") {
        n = n.concat(t._applyRemove(e));
      } else if (e.type === "update") {
        n.push({
          type: e.type,
          key: e.key,
          data: {
            data: e.data
          }
        });
      }
    });
    return n;
  },
  _handleChanging: function (e) {
    var t = this;
    this.callBase.apply(this, arguments);
    function n(e) {
      var n = e.filter(function (e) {
        return e.type === "update";
      });
      return t._processChanges(n);
    }
    e.postProcessChanges = n;
  },
  _applyBatch: function (e) {
    var t = this._processChanges(e);
    this.callBase(t);
  },
  _setHasItems: function (e, t) {
    var n = this._hasItemsSetter;
    e.hasChildren = t;
    if (n && e.data) {
      n(e.data, t);
    }
  },
  _applyInsert: function (e) {
    var t = [];
    var n = this.parentKeyOf(e.data);
    var i = this.getNodeByKey(n);
    if (i) {
      var o = this.option("rootValue");
      var a = this._convertItemToNode(e.data, o, this._nodeByKey);
      a.hasChildren = false;
      a.level = i.level + 1;
      a.visible = true;
      i.children.push(a);
      this._isChildrenLoaded[a.key] = true;
      this._setHasItems(i, true);
      if ((!i.parent || this.isRowExpanded(i.key)) && e.index !== undefined) {
        var r = this.items().indexOf(i) + 1;
        r += e.index >= 0 ? Math.min(e.index, i.children.length) : i.children.length;
        t.push({
          type: e.type,
          data: a,
          index: r
        });
      }
    }
    return t;
  },
  _needToCopyDataObject: function () {
    return false;
  },
  _applyRemove: function (e) {
    var t = [];
    var n = this.getNodeByKey(e.key);
    var i = n && n.parent;
    if (i) {
      var o = i.children.indexOf(n);
      if (o >= 0) {
        i.children.splice(o, 1);
        if (!i.children.length) {
          this._setHasItems(i, false);
        }
        t.push(e);
        t = t.concat(this.getChildNodeKeys(e.key).map(function (t) {
          return {
            type: e.type,
            key: t
          };
        }));
      }
    }
    return t;
  },
  _handleDataLoaded: function (e) {
    var t = e.data = this._convertDataToPlainStructure(e.data);
    if (!e.remoteOperations.filtering && e.loadOptions.filter) {
      e.fullData = v((0, c.default)(e.data), {
        sort: e.loadOptions && e.loadOptions.sort
      }).toArray();
    }
    this._updateHasItemsMap(e);
    this.callBase(e);
    if (t.isConverted && this._cachedStoreData) {
      this._cachedStoreData.isConverted = true;
    }
  },
  _fillNodes: function (e, t, n, i) {
    var o = y(this);
    i = i || 0;
    for (var a = 0; a < e.length; a++) {
      var r = e[a];
      var s = false;
      this._fillNodes(e[a].children, t, n, i + 1);
      r.level = i;
      r.hasChildren = this._calculateHasItems(r, t);
      if (r.visible && r.hasChildren) {
        if (o) {
          if (r.children.filter(function (e) {
            return e.visible;
          }).length) {
            s = true;
          } else if (r.children.length) {
            m.default.foreachNodes(r.children, function (e) {
              e.visible = true;
            });
          }
        } else {
          s = true;
        }
        if (t.expandVisibleNodes && s) {
          n.push(r.key);
        }
      }
      if (r.visible || r.hasChildren) {
        r.parent.hasChildren = true;
      }
    }
  },
  _processTreeStructure: function (e, t) {
    var n = e.data;
    var i = e.storeLoadOptions.parentIds;
    var o = [];
    if (i && i.length || this._isReload) {
      if (e.fullData && e.fullData.length > e.data.length) {
        n = e.fullData;
        t = t || e.data;
      }
      this._rootNode = this._createNodesByItems(n, t);
      if (!this._rootNode) {
        e.data = new a.Deferred().reject(f.default.Error("E1046", this.getKeyExpr()));
        return;
      }
      this._fillNodes(this._rootNode.children, e, o);
      this._isNodesInitializing = true;
      if (e.collapseVisibleNodes || o.length) {
        this.option("expandedRowKeys", o);
      }
      this._isReload = false;
      this.executeAction("onNodesInitialized", {
        root: this._rootNode
      });
      this._isNodesInitializing = false;
    }
    var r = [];
    this._fillVisibleItemsByNodes(this._rootNode.children, e, r);
    e.data = r;
    this._totalItemsCount = r.length;
  },
  _handleDataLoadedCore: function (e) {
    var t;
    var n = this;
    var i = e.data;
    var o = n.callBase;
    var r = e.storeLoadOptions.filter || e.loadOptions.filter;
    var s = n.option("filterMode");
    var l = e.storeLoadOptions.parentIds;
    var u = r && (!l || !l.length) && s !== "standard";
    if (!e.isCustomLoading) {
      if (u) {
        var d = e.data = new a.Deferred();
        if (s === "matchOnly") {
          t = i;
        }
        return n._loadParents(i, e).done(function (i) {
          n._loadChildrenIfNeed(i, e).done(function (i) {
            e.data = i;
            n._processTreeStructure(e, t);
            o.call(n, e);
            d.resolve(e.data);
          });
        }).fail(d.reject);
      }
      n._processTreeStructure(e);
    }
    n.callBase(e);
  },
  _handlePush: function (e) {
    var t = e.changes;
    var n = this._dataSource._reshapeOnPush;
    var i = n && !!t.length;
    if (i) {
      this._isReload = true;
    }
    t.forEach(function (e) {
      var t;
      if ((t = e.index) === null || t === undefined) {
        e.index = -1;
      }
    });
    this.callBase.apply(this, arguments);
  },
  init: function (e, t) {
    this.callBase.apply(this, arguments);
    var n = this.option("dataStructure");
    this._keyGetter = this._createKeyGetter();
    this._parentIdGetter = this.createParentIdGetter();
    this._hasItemsGetter = this._createHasItemsGetter();
    this._hasItemsSetter = this._createHasItemsSetter();
    if (n === "tree") {
      this._itemsGetter = this._createItemsGetter();
      this._keySetter = this._createKeySetter();
      this._parentIdSetter = this.createParentIdSetter();
    }
    this._nodeByKey = {};
    this._isChildrenLoaded = {};
    this._totalItemsCount = 0;
    this.createAction("onNodesInitialized");
  },
  getKeyExpr: function () {
    var e = this.store();
    var t = e && e.key();
    var n = this.option("keyExpr");
    if ((0, l.isDefined)(t) && (0, l.isDefined)(n) && !(0, i.equalByValue)(t, n)) {
      throw f.default.Error("E1044");
    }
    return t || n || "id";
  },
  keyOf: function (e) {
    return this._keyGetter && this._keyGetter(e);
  },
  parentKeyOf: function (e) {
    return this._parentIdGetter && this._parentIdGetter(e);
  },
  getRootNode: function () {
    return this._rootNode;
  },
  totalItemsCount: function () {
    return this._totalItemsCount + this._totalCountCorrection;
  },
  isRowExpanded: function (e, t) {
    if (t) {
      var n = t.isExpandedByKey;
      if (!n) {
        n = t.isExpandedByKey = {};
        this.option("expandedRowKeys").forEach(function (e) {
          n[e] = true;
        });
      }
      return !!n[e];
    }
    return g.default.getIndexByKey(e, this.option("expandedRowKeys"), null) >= 0;
  },
  _changeRowExpandCore: function (e) {
    var t = this.option("expandedRowKeys").slice();
    var n = g.default.getIndexByKey(e, t, null);
    if (n < 0) {
      t.push(e);
    } else {
      t.splice(n, 1);
    }
    this.option("expandedRowKeys", t);
  },
  changeRowExpand: function (e) {
    this._changeRowExpandCore(e);
    if (this._isNodesInitializing) {
      return new a.Deferred().resolve();
    } else {
      return this.load();
    }
  },
  getNodeByKey: function (e) {
    if (this._nodeByKey) {
      return this._nodeByKey[e];
    }
  },
  getNodeLeafKeys: function () {
    var e = this;
    var t = [];
    (e._rootNode ? [e._rootNode.key] : []).forEach(function (n) {
      var i = e.getNodeByKey(n);
      if (i) {
        m.default.foreachNodes([i], function (e) {
          if (!e.children.length) {
            t.push(e.key);
          }
        });
      }
    });
    return t;
  },
  getChildNodeKeys: function (e) {
    var t = this.getNodeByKey(e);
    var n = [];
    if (t) {
      m.default.foreachNodes(t.children, function (e) {
        n.push(e.key);
      });
    }
    return n;
  },
  loadDescendants: function (e, t) {
    var n = this;
    var i = new a.Deferred();
    var o = n.remoteOperations();
    e = (0, l.isDefined)(e) ? Array.isArray(e) ? e : [e] : n.getNodeLeafKeys();
    if (!o.filtering || !e.length) {
      return i.resolve();
    }
    var r = n._dataSource._createStoreLoadOptions();
    r.parentIds = e;
    n.load(r).done(function () {
      if (!t) {
        var o = function (e, t) {
          var n = [];
          t.forEach(function (t) {
            var i = e.getNodeByKey(t);
            if (i) {
              i.children.forEach(function (e) {
                n.push(e.key);
              });
            }
          });
          return n;
        }(n, e);
        if (o.length) {
          n.loadDescendants(o, t).done(i.resolve).fail(i.reject);
          return;
        }
      }
      i.resolve();
    }).fail(i.reject);
    return i.promise();
  },
  forEachNode: function () {
    var e;
    var t = [];
    if (arguments.length === 1) {
      e = arguments[0];
      var n = this.getRootNode();
      t = n && n.children || [];
    } else if (arguments.length === 2) {
      e = arguments[1];
      t = arguments[0];
      t = Array.isArray(t) ? t : [t];
    }
    m.default.foreachNodes(t, e);
  }
});
var x = {
  extend: function (e) {
    b = b.inherit(e);
  },
  create: function (e) {
    return new b(e);
  }
};
exports.default = x;