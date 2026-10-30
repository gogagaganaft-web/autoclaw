exports.default = undefined;
var i = u(require("./68374.js"));
var o = require("./35922.js");
var a = require("./95479.js");
var r = u(require("./99236.js"));
var s = u(require("./96687.js"));
var l = u(require("./14174.js"));
function u(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
function d(e) {
  return (e.group << 20) + e.item;
}
function c(e) {
  return {
    group: e >> 20,
    item: e & 1048575
  };
}
var h = l.default.inherit({
  _groupElements: function () {
    return this._collectionWidget._itemContainer().find(".dx-list-group");
  },
  _groupItemElements: function (e) {
    return e.find(".dx-list-item");
  },
  getIndexByItemData: function (e) {
    var t = this._collectionWidget.option("items");
    var n = false;
    return !!e && (e.items && e.items.length && (e = e.items[0]), (0, a.each)(t, function (t, i) {
      return !!i.items && ((0, a.each)(i.items, function (i, o) {
        return o !== e || (n = {
          group: t,
          item: i
        }, false);
      }), !n && undefined);
    }), n);
  },
  getItemDataByIndex: function (e) {
    var t = this._collectionWidget.option("items");
    if ((0, o.isNumeric)(e)) {
      return this.itemsGetter()[e];
    } else {
      return e && t[e.group] && t[e.group].items[e.item] || null;
    }
  },
  itemsGetter: function () {
    var e = [];
    for (var t = this._collectionWidget.option("items"), n = 0; n < t.length; n++) {
      if (t[n] && t[n].items) {
        e = e.concat(t[n].items);
      } else {
        e.push(t[n]);
      }
    }
    return e;
  },
  deleteItemAtIndex: function (e) {
    var t = c(e);
    this._collectionWidget.option("items")[t.group].items.splice(t.item, 1);
  },
  getKeysByItems: function (e) {
    var t;
    var n = [];
    for (t = 0; t < e.length; t++) {
      if (e[t] && e[t].items) {
        n = n.concat(e[t].items);
      } else {
        n.push(e[t]);
      }
    }
    var i = [];
    for (t = 0; t < n.length; t++) {
      i.push(this._collectionWidget.keyOf(n[t]));
    }
    return i;
  },
  getIndexByKey: function (e, t) {
    var n = t || this._collectionWidget.option("items");
    var i = -1;
    var o = this;
    (0, a.each)(n, function (t, n) {
      if (n.items) {
        (0, a.each)(n.items, function (n, a) {
          var r = o._collectionWidget.keyOf(a);
          if (o._equalKeys(r, e)) {
            i = {
              group: t,
              item: n
            };
            return false;
          }
        });
        return i === -1 && undefined;
      }
    });
    return i;
  },
  _getGroups: function (e) {
    var t = this._collectionWidget._dataController.group();
    if (t) {
      return r.default.queryByOptions((0, s.default)(e), {
        group: t
      }).toArray();
    } else {
      return this._collectionWidget.option("items");
    }
  },
  getItemsByKeys: function (e, t) {
    var n = this;
    var i = [];
    var o = this._getGroups(t);
    var r = {};
    (0, a.each)(e, function (e, t) {
      var a = function (e) {
        var t = n.getIndexByKey(e, o);
        var i = t && o[t.group];
        if (i) {
          return {
            groupKey: i.key,
            item: i.items[t.item]
          };
        }
      }(t);
      if (a) {
        var s = a.groupKey;
        var l = a.item;
        var u = r[s];
        if (!u) {
          u = {
            key: s,
            items: []
          };
          r[s] = u;
          i.push(u);
        }
        u.items.push(l);
      }
    });
    return i;
  },
  moveItemAtIndexToIndex: function (e, t) {
    var n = this._collectionWidget.option("items");
    var i = c(e);
    var o = c(t);
    var a = n[i.group].items;
    var r = n[o.group].items;
    var s = a[i.item];
    a.splice(i.item, 1);
    r.splice(o.item, 0, s);
  },
  _isItemIndex: function (e) {
    return e && (0, o.isNumeric)(e.group) && (0, o.isNumeric)(e.item);
  },
  _getNormalizedItemIndex: function (e) {
    var t = (0, i.default)(e);
    var n = t.closest(".dx-list-group");
    if (n.length) {
      return d({
        group: this._groupElements().index(n),
        item: this._groupItemElements(n).index(t)
      });
    } else {
      return -1;
    }
  },
  _normalizeItemIndex: function (e) {
    return d(e);
  },
  _denormalizeItemIndex: function (e) {
    return c(e);
  },
  _getItemByNormalizedIndex: function (e) {
    var t = c(e);
    var n = this._groupElements().eq(t.group);
    return this._groupItemElements(n).eq(t.item);
  },
  _itemsFromSameParent: function (e, t) {
    return c(e).group === c(t).group;
  }
});
exports.default = h;
module.exports = exports.default;
module.exports.default = exports.default;