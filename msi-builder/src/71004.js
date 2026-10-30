exports.default = undefined;
var i = p(require("./38377.js"));
var o = require("./20576.js");
var a = require("./95479.js");
var r = require("./35922.js");
var s = require("./13306.js");
var l = p(require("./96688.js"));
var u = p(require("./2630.js"));
var d = p(require("./29837.js"));
var c = p(require("./96687.js"));
var h = p(require("./99236.js"));
var f = p(require("./92449.js"));
function p(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
u.default.setEditorClass(d.default);
var g = i.default.inherit({
  ctor: function (e) {
    this.options = {};
    (0, s.extend)(this.options, this._defaultOptions(), e);
    this.options.dataConverter.setDataAccessors(this.options.dataAccessors);
    this._selectedNodesKeys = [];
    this._expandedNodesKeys = [];
    this._dataStructure = [];
    this._createInternalDataStructure();
    this.getTreeNodes();
  },
  setOption: function (e, t) {
    this.options[e] = t;
    if (e === "recursiveSelection") {
      this._updateSelection();
    }
  },
  _defaultOptions: function () {
    return {
      dataAccessors: undefined,
      items: [],
      multipleSelection: true,
      recursiveSelection: false,
      recursiveExpansion: false,
      rootValue: 0,
      searchValue: "",
      dataType: "tree",
      searchMode: "contains",
      dataConverter: new f.default(),
      onNodeChanged: o.noop,
      sort: null
    };
  },
  _createInternalDataStructure: function () {
    this._initialDataStructure = this.options.dataConverter.createPlainStructure(this.options.items, this.options.rootValue, this.options.dataType);
    this._dataStructure = this.options.searchValue.length ? this.search(this.options.searchValue) : this._initialDataStructure;
    this.options.dataConverter._dataStructure = this._dataStructure;
    this._updateSelection();
    this._updateExpansion();
  },
  _updateSelection: function () {
    if (this.options.recursiveSelection) {
      this._setChildrenSelection();
      this._setParentSelection();
    }
    this._selectedNodesKeys = this._updateNodesKeysArray("selected");
  },
  _updateExpansion: function (e) {
    if (this.options.recursiveExpansion) {
      if (e) {
        this._updateOneBranch(e);
      } else {
        this._setParentExpansion();
      }
    }
    this._expandedNodesKeys = this._updateNodesKeysArray("expanded");
  },
  _updateNodesKeysArray: function (e) {
    var t = this;
    var n = [];
    (0, a.each)(t._getDataBySelectionMode(), function (i, o) {
      if (t._isNodeVisible(o) && o.internalFields[e]) {
        if (e === "expanded" || t.options.multipleSelection) {
          n.push(o.internalFields.key);
        } else {
          if (n.length) {
            t.toggleSelection(n[0], false, true);
          }
          n = [o.internalFields.key];
        }
      }
    });
    return n;
  },
  _getDataBySelectionMode: function () {
    if (this.options.multipleSelection) {
      return this.getData();
    } else {
      return this.getFullData();
    }
  },
  _isNodeVisible: function (e) {
    return e.internalFields.item.visible !== false;
  },
  _getByKey: function (e, t) {
    if (e === this._dataStructure) {
      return this.options.dataConverter._getByKey(t);
    } else {
      return this.options.dataConverter.getByKey(e, t);
    }
  },
  _setChildrenSelection: function () {
    var e = this;
    (0, a.each)(this._dataStructure, function (t, n) {
      if (n.internalFields.childrenKeys.length) {
        var i = n.internalFields.selected;
        if (i === true) {
          e._toggleChildrenSelection(n, i);
        }
      }
    });
  },
  _setParentSelection: function () {
    var e = this;
    (0, a.each)(this._dataStructure, function (t, n) {
      if (e.options.dataConverter.getParentNode(n) && n.internalFields.parentKey !== e.options.rootValue) {
        e._iterateParents(n, function (t) {
          var n = e._calculateSelectedState(t);
          e._setFieldState(t, "selected", n);
        });
      }
    });
  },
  _setParentExpansion: function () {
    var e = this;
    (0, a.each)(this._dataStructure, function (t, n) {
      if (n.internalFields.expanded) {
        e._updateOneBranch(n.internalFields.key);
      }
    });
  },
  _updateOneBranch: function (e) {
    var t = this;
    var n = this.getNodeByKey(e);
    t._iterateParents(n, function (e) {
      t._setFieldState(e, "expanded", true);
    });
  },
  _iterateChildren: function (e, t, n, i) {
    if ((0, r.isFunction)(n)) {
      var o = this;
      var s = e.internalFields.key;
      if ((i = i || []).indexOf(s) === -1) {
        i.push(s);
        (0, a.each)(e.internalFields.childrenKeys, function (e, a) {
          var r = o.getNodeByKey(a);
          n(r);
          if (r.internalFields.childrenKeys.length && t) {
            o._iterateChildren(r, t, n, i);
          }
        });
      }
    }
  },
  _iterateParents: function (e, t, n) {
    if (e.internalFields.parentKey !== this.options.rootValue && (0, r.isFunction)(t)) {
      n = n || [];
      var i = e.internalFields.key;
      if (n.indexOf(i) === -1) {
        n.push(i);
        var o = this.options.dataConverter.getParentNode(e);
        if (o) {
          t(o);
          if (o.internalFields.parentKey !== this.options.rootValue) {
            this._iterateParents(o, t, n);
          }
        }
      }
    }
  },
  _calculateSelectedState: function (e) {
    for (var t = e.internalFields.childrenKeys.length, n = 0, i = 0, o = false, a = 0; a <= t - 1; a++) {
      var r = this.getNodeByKey(e.internalFields.childrenKeys[a]);
      var s = r.internalFields.item.visible === false;
      var l = r.internalFields.selected;
      if (s) {
        i++;
      } else if (l) {
        n++;
      } else if (l === undefined) {
        n += 0.5;
      }
    }
    if (n) {
      o = n === t - i || undefined;
    }
    return o;
  },
  _toggleChildrenSelection: function (e, t) {
    var n = this;
    this._iterateChildren(e, true, function (e) {
      if (n._isNodeVisible(e)) {
        n._setFieldState(e, "selected", t);
      }
    });
  },
  _setFieldState: function (e, t, n) {
    if (e.internalFields[t] !== n) {
      e.internalFields[t] = n;
      if (e.internalFields.publicNode) {
        e.internalFields.publicNode[t] = n;
      }
      this.options.dataAccessors.setters[t](e.internalFields.item, n);
      this.options.onNodeChanged(e);
    }
  },
  _markChildren: function (e) {
    var t = this;
    (0, a.each)(e, function (e, n) {
      var i = t.getIndexByKey(n);
      var o = t.getNodeByKey(n);
      t._dataStructure[i] = 0;
      if (o.internalFields.childrenKeys.length) {
        t._markChildren(o.internalFields.childrenKeys);
      }
    });
  },
  _removeNode: function (e) {
    var t = this.getNodeByKey(e);
    this._dataStructure[this.getIndexByKey(e)] = 0;
    this._markChildren(t.internalFields.childrenKeys);
    var n = this;
    var i = 0;
    var o = (0, s.extend)([], this._dataStructure);
    (0, a.each)(o, function (e, t) {
      if (!t) {
        n._dataStructure.splice(e - i, 1);
        i++;
      }
    });
  },
  _addNode: function (e) {
    var t = this.options.dataConverter;
    var n = t._convertItemToNode(e, this.options.dataAccessors.getters.parentKey(e));
    this._dataStructure = this._dataStructure.concat(n);
    this._initialDataStructure = this._initialDataStructure.concat(n);
    t._dataStructure = t._dataStructure.concat(n);
  },
  _updateFields: function () {
    this.options.dataConverter.updateChildrenKeys();
    this._updateSelection();
    this._updateExpansion();
  },
  getSelectedNodesKeys: function () {
    return this._selectedNodesKeys;
  },
  getExpandedNodesKeys: function () {
    return this._expandedNodesKeys;
  },
  getData: function () {
    return this._dataStructure;
  },
  getFullData: function () {
    return this._initialDataStructure;
  },
  getNodeByItem: function (e) {
    var t = null;
    (0, a.each)(this._dataStructure, function (n, i) {
      if (i.internalFields.item === e) {
        t = i;
        return false;
      }
    });
    return t;
  },
  getNodesByItems: function (e) {
    var t = this;
    var n = [];
    (0, a.each)(e, function (e, i) {
      var o = t.getNodeByItem(i);
      if (o) {
        n.push(o);
      }
    });
    return n;
  },
  getNodeByKey: function (e, t) {
    return this._getByKey(t || this._getDataBySelectionMode(), e);
  },
  getTreeNodes: function () {
    return this.options.dataConverter.convertToPublicNodes(this.getRootNodes());
  },
  getItemsCount: function () {
    return this.options.dataConverter.getItemsCount();
  },
  getVisibleItemsCount: function () {
    return this.options.dataConverter.getVisibleItemsCount();
  },
  getPublicNode: function (e) {
    return e.internalFields.publicNode;
  },
  getRootNodes: function () {
    return this.getChildrenNodes(this.options.rootValue);
  },
  getChildrenNodes: function (e) {
    return (0, c.default)(this._dataStructure, {
      langParams: this.options.langParams
    }).filter(["internalFields.parentKey", e]).toArray();
  },
  getIndexByKey: function (e) {
    return this.options.dataConverter.getIndexByKey(e);
  },
  addItem: function (e) {
    this._addNode(e);
    this._updateFields();
  },
  removeItem: function (e) {
    this._removeNode(e);
    this._updateFields();
  },
  toggleSelection: function (e, t, n) {
    var i = this._isSingleModeUnselect(t);
    var o = this._getByKey(n || i ? this._initialDataStructure : this._dataStructure, e);
    this._setFieldState(o, "selected", t);
    if (this.options.recursiveSelection && !n) {
      if (t) {
        this._setChildrenSelection();
      } else {
        this._toggleChildrenSelection(o, t);
      }
      this._setParentSelection();
    }
    this._selectedNodesKeys = this._updateNodesKeysArray("selected");
  },
  _isSingleModeUnselect: function (e) {
    return !this.options.multipleSelection && !e;
  },
  toggleNodeDisabledState: function (e, t) {
    var n = this.getNodeByKey(e);
    this._setFieldState(n, "disabled", t);
  },
  toggleSelectAll: function (e) {
    if ((0, r.isDefined)(e)) {
      var t = this;
      var n = t._selectedNodesKeys[t._selectedNodesKeys.length - 1];
      var i = t._isSingleModeUnselect(e) ? this._initialDataStructure : this._dataStructure;
      (0, a.each)(i, function (n, i) {
        if (t._isNodeVisible(i)) {
          t._setFieldState(i, "selected", e);
        }
      });
      t._selectedNodesKeys = t._updateNodesKeysArray("selected");
      if (!e && t.options.selectionRequired) {
        t.toggleSelection(n, true);
      }
    }
  },
  isAllSelected: function () {
    return !!this.getSelectedNodesKeys().length && (this.getSelectedNodesKeys().length === this.getVisibleItemsCount() || undefined);
  },
  toggleExpansion: function (e, t) {
    var n = this.getNodeByKey(e);
    this._setFieldState(n, "expanded", t);
    if (t) {
      this._updateExpansion(e);
    }
    this._expandedNodesKeys = this._updateNodesKeysArray("expanded");
  },
  isFiltered: function (e) {
    return !this.options.searchValue.length || !!this._filterDataStructure(this.options.searchValue, [e]).length;
  },
  _createCriteria: function (e, t, n) {
    var i = [];
    if (Array.isArray(e)) {
      (0, a.each)(e, function (e, o) {
        i.push([o, n, t], "or");
      });
      i.pop();
      return i;
    } else {
      return [e, n, t];
    }
  },
  _filterDataStructure: function (e, t) {
    var n = this.options.searchExpr || this.options.dataAccessors.getters.display;
    var i = u.default.getOperationBySearchMode(this.options.searchMode);
    var o = this._createCriteria(n, e, i);
    t = t || this._initialDataStructure;
    return (0, c.default)(t, {
      langParams: this.options.langParams
    }).filter(o).toArray();
  },
  search: function (e) {
    var t = this;
    var n = this._filterDataStructure(e);
    var i = this.options.dataConverter;
    (function e(n, o) {
      for (var a = n.length; o < a;) {
        var r = n[o];
        if (r.internalFields.parentKey !== t.options.rootValue) {
          var s = i.getParentNode(r);
          if (s) {
            if (!s.internalFields.expanded) {
              t._setFieldState(s, "expanded", true);
            }
            if (n.includes(s)) {
              o++;
            } else {
              n.splice(o, 0, s);
              e(n, o);
            }
          } else {
            l.default.log("W1007", r.internalFields.parentKey, r.internalFields.key);
            o++;
          }
        } else {
          o++;
        }
      }
    })(n, 0);
    if (this.options.sort) {
      n = h.default.queryByOptions((0, c.default)(n), {
        sort: this.options.sort,
        langParams: this.options.langParams
      }).toArray();
    }
    i._indexByKey = {};
    (0, a.each)(n, function (e, t) {
      t.internalFields.childrenKeys = [];
      i._indexByKey[t.internalFields.key] = e;
    });
    i._dataStructure = n;
    i.setChildrenKeys();
    return i._dataStructure;
  }
});
exports.default = g;
module.exports = exports.default;
module.exports.default = exports.default;