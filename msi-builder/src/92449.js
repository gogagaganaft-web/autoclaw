exports.default = undefined;
var i = l(require("./38377.js"));
var o = require("./13306.js");
var a = l(require("./96688.js"));
var r = require("./95479.js");
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
var u = i.default.inherit({
  ctor: function () {
    this._dataStructure = [];
    this._itemsCount = 0;
    this._visibleItemsCount = 0;
  },
  _indexByKey: {},
  _convertItemsToNodes: function (e, t) {
    var n = this;
    (0, r.each)(e, function (e, i) {
      var o = (0, s.isDefined)(t) ? t : n._getParentId(i);
      var a = n._convertItemToNode(i, o);
      n._dataStructure.push(a);
      n._checkForDuplicateId(a.internalFields.key);
      n._indexByKey[a.internalFields.key] = n._dataStructure.length - 1;
      if (n._itemHasChildren(i)) {
        n._convertItemsToNodes(n._dataAccessors.getters.items(i), a.internalFields.key);
      }
    });
  },
  _checkForDuplicateId: function (e) {
    if ((0, s.isDefined)(this._indexByKey[e])) {
      throw a.default.Error("E1040", e);
    }
  },
  _getParentId: function (e) {
    if (this._dataType === "plain") {
      return this._dataAccessors.getters.parentKey(e);
    } else {
      return undefined;
    }
  },
  _itemHasChildren: function (e) {
    if (this._dataType !== "plain") {
      var t = this._dataAccessors.getters.items(e);
      return t && t.length;
    }
  },
  _getUniqueKey: function (e) {
    var t = this._dataAccessors.getters.key;
    var n = t(e);
    if (t && (n || n === 0) && (0, s.isPrimitive)(n)) {
      return n;
    } else {
      return this.getItemsCount();
    }
  },
  _convertItemToNode: function (e, t) {
    this._itemsCount++;
    if (e.visible !== false) {
      this._visibleItemsCount++;
    }
    var n = {
      internalFields: {
        disabled: this._dataAccessors.getters.disabled(e, {
          defaultValue: false
        }),
        expanded: this._dataAccessors.getters.expanded(e, {
          defaultValue: false
        }),
        selected: this._dataAccessors.getters.selected(e, {
          defaultValue: false
        }),
        key: this._getUniqueKey(e),
        parentKey: (0, s.isDefined)(t) ? t : this._rootValue,
        item: this._makeObjectFromPrimitive(e),
        childrenKeys: []
      }
    };
    (0, o.extend)(n, e);
    delete n.items;
    return n;
  },
  setChildrenKeys: function () {
    var e = this;
    (0, r.each)(this._dataStructure, function (t, n) {
      if (n.internalFields.parentKey !== e._rootValue) {
        var i = e.getParentNode(n);
        if (i) {
          i.internalFields.childrenKeys.push(n.internalFields.key);
        }
      }
    });
  },
  _makeObjectFromPrimitive: function (e) {
    if ((0, s.isPrimitive)(e)) {
      var t = e;
      e = {};
      this._dataAccessors.setters.key(e, t);
    }
    return e;
  },
  _convertToPublicNode: function (e, t) {
    if (!e) {
      return null;
    }
    var n = {
      text: this._dataAccessors.getters.display(e),
      key: e.internalFields.key,
      selected: e.internalFields.selected,
      expanded: e.internalFields.expanded,
      disabled: e.internalFields.disabled,
      parent: t || null,
      itemData: e.internalFields.item,
      children: [],
      items: []
    };
    if (n.parent) {
      n.parent.children.push(n);
      n.parent.items.push(n);
    }
    return n;
  },
  convertToPublicNodes: function (e, t) {
    if (!e.length) {
      return [];
    }
    var n = this;
    var i = [];
    (0, r.each)(e, function (e, o) {
      o = (0, s.isPrimitive)(o) ? n._getByKey(o) : o;
      var a = n._convertToPublicNode(o, t);
      a.children = n.convertToPublicNodes(o.internalFields.childrenKeys, a);
      i.push(a);
      o.internalFields.publicNode = a;
    });
    return i;
  },
  setDataAccessors: function (e) {
    this._dataAccessors = e;
  },
  _getByKey: function (e) {
    return this._dataStructure[this.getIndexByKey(e)] || null;
  },
  getParentNode: function (e) {
    return this._getByKey(e.internalFields.parentKey);
  },
  getByKey: function (e, t) {
    if (t == null) {
      return null;
    }
    var n = null;
    var i = this;
    function o(e, t) {
      (0, r.each)(e, function (e, o) {
        if ((o.internalFields && o.internalFields.key || i._dataAccessors.getters.key(o)).toString() === t.toString()) {
          n = o;
          return false;
        }
      });
      return n;
    }
    return o(e, t);
  },
  getItemsCount: function () {
    return this._itemsCount;
  },
  getVisibleItemsCount: function () {
    return this._visibleItemsCount;
  },
  updateIndexByKey: function () {
    var e = this;
    this._indexByKey = {};
    (0, r.each)(this._dataStructure, function (t, n) {
      e._checkForDuplicateId(n.internalFields.key);
      e._indexByKey[n.internalFields.key] = t;
    });
  },
  updateChildrenKeys: function () {
    this._indexByKey = {};
    this.removeChildrenKeys();
    this.updateIndexByKey();
    this.setChildrenKeys();
  },
  removeChildrenKeys: function () {
    this._indexByKey = {};
    (0, r.each)(this._dataStructure, function (e, t) {
      t.internalFields.childrenKeys = [];
    });
  },
  getIndexByKey: function (e) {
    return this._indexByKey[e];
  },
  createPlainStructure: function (e, t, n) {
    this._itemsCount = 0;
    this._visibleItemsCount = 0;
    this._rootValue = t;
    this._dataType = n;
    this._indexByKey = {};
    this._convertItemsToNodes(e);
    this.setChildrenKeys();
    return this._dataStructure;
  }
});
exports.default = u;
module.exports = exports.default;
module.exports.default = exports.default;