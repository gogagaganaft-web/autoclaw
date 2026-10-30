exports.default = undefined;
var i;
var o = (i = require("./73176.js")) && i.__esModule ? i : {
  default: i
};
var a = require("./95479.js");
var r = require("./13306.js");
var s = require("./35922.js");
var l = function () {
  function e() {
    this._map = {};
  }
  var t = e.prototype;
  t._findWidgetInstance = function (e) {
    var t;
    (0, a.each)(this._map, function (n, i) {
      var o = i.widgetInstance;
      var a = i.item;
      if (e(a)) {
        t = o;
        return false;
      }
    });
    return t;
  };
  t._findFieldByCondition = function (e, t) {
    var n;
    (0, a.each)(this._map, function (i, o) {
      if (e(o)) {
        n = t === "guid" ? i : o[t];
        return false;
      }
    });
    return n;
  };
  t.clear = function () {
    this._map = {};
  };
  t.removeItemsByItems = function (e) {
    var t = this;
    (0, a.each)(e.getItems(), function (e) {
      return t.removeItemByKey(e);
    });
  };
  t.removeItemByKey = function (e) {
    delete this._map[e];
  };
  t.add = function (e) {
    var t = e.guid || new o.default();
    this._map[t] = e;
    return t;
  };
  t.addItemsOrExtendFrom = function (e) {
    var t = this;
    e.each(function (e, n) {
      if (t._map[e]) {
        if (n.widgetInstance) {
          t._map[e].widgetInstance = n.widgetInstance;
        }
        t._map[e].$itemContainer = n.$itemContainer;
      } else {
        t.add({
          item: n.item,
          widgetInstance: n.widgetInstance,
          guid: e,
          $itemContainer: n.$itemContainer
        });
      }
    });
  };
  t.extendRunTimeItemInfoByKey = function (e, t) {
    this._map[e] &&= (0, r.extend)(this._map[e], t);
  };
  t.findWidgetInstanceByItem = function (e) {
    return this._findWidgetInstance(function (t) {
      return t === e;
    });
  };
  t.findGroupOrTabLayoutManagerByPath = function (e) {
    return this._findFieldByCondition(function (t) {
      return t.path === e;
    }, "layoutManager");
  };
  t.findKeyByPath = function (e) {
    return this._findFieldByCondition(function (t) {
      return t.path === e;
    }, "guid");
  };
  t.findWidgetInstanceByName = function (e) {
    return this._findWidgetInstance(function (t) {
      return e === t.name;
    });
  };
  t.findWidgetInstanceByDataField = function (e) {
    return this._findWidgetInstance(function (t) {
      return e === ((0, s.isString)(t) ? t : t.dataField);
    });
  };
  t.findItemContainerByItem = function (e) {
    for (var t in this._map) {
      if (this._map[t].item === e) {
        return this._map[t].$itemContainer;
      }
    }
    return null;
  };
  t.findItemIndexByItem = function (e) {
    return this._findFieldByCondition(function (t) {
      return t.item === e;
    }, "itemIndex");
  };
  t.findPreparedItemByItem = function (e) {
    return this._findFieldByCondition(function (t) {
      return t.item === e;
    }, "preparedItem");
  };
  t.getItems = function () {
    return this._map;
  };
  t.each = function (e) {
    (0, a.each)(this._map, function (t, n) {
      e(t, n);
    });
  };
  t.removeItemsByPathStartWith = function (e) {
    var t = this;
    Object.keys(this._map).filter(function (n) {
      return !!t._map[n].path && t._map[n].path.indexOf(e, 0) > -1;
    }).forEach(function (e) {
      return t.removeItemByKey(e);
    });
  };
  return e;
}();
exports.default = l;
module.exports = exports.default;
module.exports.default = exports.default;