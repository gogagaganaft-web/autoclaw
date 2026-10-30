exports.default = undefined;
var i = l(require("./68374.js"));
var o = l(require("./38377.js"));
var a = require("./20576.js");
var r = l(require("./73349.js"));
var s = require("./35922.js");
function l(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
var u = o.default.abstract;
var d = o.default.inherit({
  ctor: function (e) {
    this._collectionWidget = e;
  },
  getIndexByItemData: u,
  getItemDataByIndex: u,
  getKeysByItems: u,
  getItemsByKeys: u,
  itemsGetter: u,
  getKeyByIndex: function (e) {
    var t = this._denormalizeItemIndex(e);
    return this.getKeysByItems([this.getItemDataByIndex(t)])[0];
  },
  _equalKeys: function (e, t) {
    if (this._collectionWidget._isKeySpecified()) {
      return (0, a.equalByValue)(e, t);
    } else {
      return e === t;
    }
  },
  beginCache: function () {
    this._cache = {};
  },
  endCache: function () {
    this._cache = null;
  },
  getIndexByKey: u,
  getNormalizedIndex: function (e) {
    if (this._isNormalizedItemIndex(e)) {
      return e;
    } else if (this._isItemIndex(e)) {
      return this._normalizeItemIndex(e);
    } else if (this._isNode(e)) {
      return this._getNormalizedItemIndex(e);
    } else {
      return this._normalizeItemIndex(this.getIndexByItemData(e));
    }
  },
  getIndex: function (e) {
    if (this._isNormalizedItemIndex(e)) {
      return this._denormalizeItemIndex(e);
    } else if (this._isItemIndex(e)) {
      return e;
    } else if (this._isNode(e)) {
      return this._denormalizeItemIndex(this._getNormalizedItemIndex(e));
    } else {
      return this.getIndexByItemData(e);
    }
  },
  getItemElement: function (e) {
    if (this._isNormalizedItemIndex(e)) {
      return this._getItemByNormalizedIndex(e);
    }
    if (this._isItemIndex(e)) {
      return this._getItemByNormalizedIndex(this._normalizeItemIndex(e));
    }
    if (this._isNode(e)) {
      return (0, i.default)(e);
    }
    var t = this._normalizeItemIndex(this.getIndexByItemData(e));
    return this._getItemByNormalizedIndex(t);
  },
  _isNode: function (e) {
    return r.default.isNode(e && (0, s.isRenderer)(e) ? e.get(0) : e);
  },
  deleteItemAtIndex: u,
  itemPlacementFunc: function (e, t) {
    if (this._itemsFromSameParent(e, t) && e < t) {
      return "after";
    } else {
      return "before";
    }
  },
  moveItemAtIndexToIndex: u,
  _isNormalizedItemIndex: function (e) {
    return typeof e == "number" && Math.round(e) === e;
  },
  _isItemIndex: u,
  _getNormalizedItemIndex: u,
  _normalizeItemIndex: u,
  _denormalizeItemIndex: u,
  _getItemByNormalizedIndex: u,
  _itemsFromSameParent: u
});
exports.default = d;
module.exports = exports.default;
module.exports.default = exports.default;