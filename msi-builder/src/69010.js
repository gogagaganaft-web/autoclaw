exports.default = undefined;
var i = f(require("./68374.js"));
var o = f(require("./11050.js"));
var a = require("./13306.js");
var r = require("./95479.js");
var s = require("./60637.js");
var l = require("./16454.js");
var u = require("./62754.js");
var d = require("./34671.js");
var c = f(require("./73349.js"));
var h = require("./20576.js");
function f(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
function p(e) {
  return (p = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function (e) {
    return typeof e;
  } : function (e) {
    if (e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype) {
      return "symbol";
    } else {
      return typeof e;
    }
  })(e);
}
function g(e, t, n) {
  if ((t = function (e) {
    var t = function (e, t) {
      if (p(e) !== "object" || e === null) {
        return e;
      }
      var n = e[Symbol.toPrimitive];
      if (n !== undefined) {
        var i = n.call(e, t || "default");
        if (p(i) !== "object") {
          return i;
        }
        throw new TypeError("@@toPrimitive must return a primitive value.");
      }
      return (t === "string" ? String : Number)(e);
    }(e, "string");
    if (p(t) === "symbol") {
      return t;
    } else {
      return String(t);
    }
  }(t)) in e) {
    Object.defineProperty(e, t, {
      value: n,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    e[t] = n;
  }
  return e;
}
var m = o.default.inherit({
  _getDefaultOptions: function () {
    return (0, a.extend)(this.callBase(), {
      repaintChangesOnly: false
    });
  },
  ctor: function () {
    var e;
    var t = this;
    this.callBase.apply(this, arguments);
    this._customizeStoreLoadOptions = function (e) {
      if (t._dataController.getDataSource() && !t._dataController.isLoaded()) {
        t._correctionIndex = 0;
      }
      if (t._correctionIndex && e.storeLoadOptions) {
        e.storeLoadOptions.skip += t._correctionIndex;
      }
    };
    if ((e = this._dataController) !== null && e !== undefined) {
      e.on("customizeStoreLoadOptions", this._customizeStoreLoadOptions);
    }
  },
  reload: function () {
    this._correctionIndex = 0;
  },
  _init: function () {
    this.callBase();
    this._refreshItemsCache();
    this._correctionIndex = 0;
  },
  _findItemElementByKey: function (e) {
    var t = this;
    var n = (0, i.default)();
    var o = this.key();
    this.itemElements().each(function (a, r) {
      var s = (0, i.default)(r);
      var u = t._getItemData(s);
      if (o ? (0, l.keysEqual)(o, t.keyOf(u), e) : t._isItemEquals(u, e)) {
        n = s;
        return false;
      }
    });
    return n;
  },
  _dataSourceChangedHandler: function (e, t) {
    if (t != null && t.changes) {
      this._modifyByChanges(t.changes);
    } else {
      this.callBase(e, t);
      this._refreshItemsCache();
    }
  },
  _isItemEquals: function (e, t) {
    if (e && e.__dx_key__) {
      e = e.data;
    }
    try {
      return JSON.stringify(e) === JSON.stringify(t);
    } catch (n) {
      return e === t;
    }
  },
  _isItemStrictEquals: function (e, t) {
    return this._isItemEquals(e, t);
  },
  _shouldAddNewGroup: function (e, t) {
    var n = false;
    if (this.option("grouped")) {
      if (!e.length) {
        n = true;
      }
      (0, r.each)(e, function (e, i) {
        if (i.type === "insert") {
          n = true;
          (0, r.each)(t, function (e, t) {
            if (i.data.key !== undefined && i.data.key === t.key) {
              n = false;
              return false;
            }
          });
        }
      });
    }
    return n;
  },
  _partialRefresh: function () {
    var e = this;
    if (this.option("repaintChangesOnly")) {
      var t = (0, d.findChanges)(this._itemsCache, this._editStrategy.itemsGetter(), function (t) {
        if (t && t.__dx_key__ !== undefined) {
          return t.__dx_key__;
        } else {
          return e.keyOf(t);
        }
      }, this._isItemStrictEquals.bind(this));
      if (t && this._itemsCache.length && !this._shouldAddNewGroup(t, this._itemsCache)) {
        this._modifyByChanges(t, true);
        this._renderEmptyMessage();
        return true;
      }
      this._refreshItemsCache();
    }
    return false;
  },
  _refreshItemsCache: function () {
    if (this.option("repaintChangesOnly")) {
      var e = this._editStrategy.itemsGetter();
      try {
        this._itemsCache = (0, a.extend)(true, [], e);
        if (!this.key()) {
          this._itemsCache = this._itemsCache.map(function (t, n) {
            var i;
            g(i = {}, "__dx_key__", e[n]);
            g(i, "data", t);
            return i;
          });
        }
      } catch (t) {
        this._itemsCache = (0, a.extend)([], e);
      }
    }
  },
  _dispose: function () {
    this._dataController.off("customizeStoreLoadOptions", this._customizeStoreLoadOptions);
    this.callBase();
  },
  _updateByChange: function (e, t, n, i) {
    var o = this;
    if (i) {
      this._renderItem(n.index, n.data, null, this._findItemElementByKey(n.key));
    } else {
      var a = t[(0, s.indexByKey)(e, t, n.key)];
      if (a) {
        (0, s.update)(e, t, n.key, n.data).done(function () {
          o._renderItem(t.indexOf(a), a, null, o._findItemElementByKey(n.key));
        });
      }
    }
  },
  _insertByChange: function (e, t, n, i) {
    var o = this;
    (0, u.when)(i || (0, s.insert)(e, t, n.data, n.index)).done(function () {
      o._beforeItemElementInserted(n);
      var i = o._getItemContainer(n.data);
      o._renderItem(n.index ?? t.length, n.data, i);
      o._afterItemElementInserted();
      o._correctionIndex++;
    });
  },
  _getItemContainer: function (e) {
    return this._itemContainer();
  },
  _updateSelectionAfterRemoveByChange: function (e) {
    var t = this.option("selectedIndex");
    if (t > e) {
      this.option("selectedIndex", t - 1);
    } else if (t === e && this.option("selectedItems").length === 1) {
      this.option("selectedItems", []);
    } else {
      this._normalizeSelectedItems();
    }
  },
  _beforeItemElementInserted: function (e) {
    var t = this.option("selectedIndex");
    if (e.index <= t) {
      this.option("selectedIndex", t + 1);
    }
  },
  _afterItemElementInserted: h.noop,
  _removeByChange: function (e, t, n, i) {
    var o = this;
    var a = i ? n.index : (0, s.indexByKey)(e, t, n.key);
    if (i ? n.oldItem : t[a]) {
      var r = this._findItemElementByKey(n.key);
      var l = this._extendActionArgs(r);
      this._waitDeletingPrepare(r).done(function () {
        if (i) {
          o._updateIndicesAfterIndex(a - 1);
          o._afterItemElementDeleted(r, l);
          o._updateSelectionAfterRemoveByChange(a);
        } else {
          o._deleteItemElementByIndex(a);
          o._afterItemElementDeleted(r, l);
        }
      });
      this._correctionIndex--;
    }
  },
  _modifyByChanges: function (e, t) {
    var n = this;
    var i = this._editStrategy.itemsGetter();
    var o = {
      key: this.key.bind(this),
      keyOf: this.keyOf.bind(this)
    };
    var a = this._dataController;
    var r = a.paginate();
    var s = a.group();
    if (r || s) {
      e = e.filter(function (e) {
        return e.type !== "insert" || e.index !== undefined;
      });
    }
    e.forEach(function (e) {
      return n[`_${e.type}ByChange`](o, i, e, t);
    });
    this._renderedItemsCount = i.length;
    this._refreshItemsCache();
    this._fireContentReadyAction();
  },
  _appendItemToContainer: function (e, t, n) {
    var i = e.children(this._itemSelector()).get(n);
    c.default.insertElement(e.get(0), t.get(0), i);
  },
  _optionChanged: function (e) {
    switch (e.name) {
      case "items":
        if (!this._partialRefresh(e.value)) {
          this.callBase(e);
        }
        break;
      case "dataSource":
        if (!this.option("repaintChangesOnly") || !e.value) {
          this.option("items", []);
        }
        this.callBase(e);
        break;
      case "repaintChangesOnly":
        break;
      default:
        this.callBase(e);
    }
  }
});
exports.default = m;
module.exports = exports.default;
module.exports.default = exports.default;