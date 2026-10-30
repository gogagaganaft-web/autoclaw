var i;
function o(e) {
  return (o = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function (e) {
    return typeof e;
  } : function (e) {
    if (e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype) {
      return "symbol";
    } else {
      return typeof e;
    }
  })(e);
}
exports.default = undefined;
var a = ((i = require("./41042.js")) && i.__esModule ? i : {
  default: i
}).default.inherit({
  _getPlainItems: function () {
    return this._collectionWidget.option("items") || [];
  },
  getIndexByItemData: function (e) {
    var t = this._collectionWidget.keyOf.bind(this._collectionWidget);
    if (t) {
      return this.getIndexByKey(t(e));
    } else {
      return this._getPlainItems().indexOf(e);
    }
  },
  getItemDataByIndex: function (e) {
    return this._getPlainItems()[e];
  },
  deleteItemAtIndex: function (e) {
    this._getPlainItems().splice(e, 1);
  },
  itemsGetter: function () {
    return this._getPlainItems();
  },
  getKeysByItems: function (e) {
    var t = this._collectionWidget.keyOf.bind(this._collectionWidget);
    var n = e;
    if (t) {
      n = [];
      for (var i = 0; i < e.length; i++) {
        n.push(t(e[i]));
      }
    }
    return n;
  },
  getIndexByKey: function (e) {
    var t = this._cache;
    var n = t && t.keys || this.getKeysByItems(this._getPlainItems());
    if (t && !t.keys) {
      t.keys = n;
    }
    if (o(e) !== "object") {
      return n.indexOf(e);
    }
    for (var i = 0, a = n.length; i < a; i++) {
      if (this._equalKeys(e, n[i])) {
        return i;
      }
    }
    return -1;
  },
  getItemsByKeys: function (e, t) {
    return (t || e).slice();
  },
  moveItemAtIndexToIndex: function (e, t) {
    var n = this._getPlainItems();
    var i = n[e];
    n.splice(e, 1);
    n.splice(t, 0, i);
  },
  _isItemIndex: function (e) {
    return typeof e == "number" && Math.round(e) === e;
  },
  _getNormalizedItemIndex: function (e) {
    return this._collectionWidget._itemElements().index(e);
  },
  _normalizeItemIndex: function (e) {
    return e;
  },
  _denormalizeItemIndex: function (e) {
    return e;
  },
  _getItemByNormalizedIndex: function (e) {
    if (e > -1) {
      return this._collectionWidget._itemElements().eq(e);
    } else {
      return null;
    }
  },
  _itemsFromSameParent: function () {
    return true;
  }
});
exports.default = a;
module.exports = exports.default;
module.exports.default = exports.default;