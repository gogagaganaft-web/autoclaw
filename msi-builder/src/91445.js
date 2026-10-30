var i = u(require("./68374.js"));
var o = require("./20576.js");
var a = require("./13306.js");
var r = require("./35922.js");
var s = require("./17969.js");
var l = u(require("./12500.js"));
function u(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
var d = s.selectionModule.extenders.views.rowsView._rowClick;
var c = s.selectionModule.extenders.controllers.data._handleDataChanged;
function h(e, t) {
  return !!e.filter(function (e) {
    return e === t;
  }).length;
}
l.default.registerModule("selection", (0, a.extend)(true, {}, s.selectionModule, {
  defaultOptions: function () {
    return (0, a.extend)(true, s.selectionModule.defaultOptions(), {
      selection: {
        showCheckBoxesMode: "always",
        recursive: false
      }
    });
  },
  extenders: {
    controllers: {
      data: {
        _handleDataChanged: function (e) {
          var t = this.getController("selection");
          var n = t.isRecursiveSelection();
          if (!!n && (!e || e.changeType !== "updateSelectionState")) {
            t.updateSelectionState({
              selectedItemKeys: this.option("selectedRowKeys")
            });
          }
          c.apply(this, arguments);
        },
        loadDescendants: function () {
          var e = this;
          var t = e.callBase.apply(e, arguments);
          var n = e.getController("selection");
          var i = n.isRecursiveSelection();
          if (i) {
            t.done(function () {
              n.updateSelectionState({
                selectedItemKeys: e.option("selectedRowKeys")
              });
            });
          }
          return t;
        }
      },
      selection: {
        init: function () {
          this.callBase.apply(this, arguments);
          this._selectionStateByKey = {};
        },
        _getSelectionConfig: function () {
          var e = arguments;
          var t = this;
          var n = this.callBase.apply(this, arguments);
          var i = n.plainItems;
          n.plainItems = function (n) {
            var o;
            if (n) {
              o = t._dataController.getCachedStoreData();
            }
            o ||= i.apply(t, e).map(function (e) {
              return e.data;
            });
            return o || [];
          };
          n.isItemSelected = function (e) {
            var n = t._dataController.keyOf(e);
            return t.isRowSelected(n);
          };
          n.isSelectableItem = function (e) {
            return !!e;
          };
          n.getItemData = function (e) {
            return e;
          };
          n.allowLoadByRange = function () {
            return false;
          };
          return n;
        },
        renderSelectCheckBoxContainer: function (e, t) {
          var n = this.component.getView("rowsView");
          e.addClass("dx-cell-focus-disabled");
          var i = n._renderSelectCheckBox(e, {
            value: t.row.isSelected,
            row: t.row,
            column: t.column
          });
          n._attachCheckBoxClickEvent(i);
        },
        _updateSelectColumn: o.noop,
        _getSelectAllNodeKeys: function () {
          var e = this.component;
          var t = e.getRootNode();
          var n = {};
          var i = [];
          var o = this.isRecursiveSelection();
          if (t) {
            l.default.foreachNodes(t.children, function (t) {
              if (t.key !== undefined && (t.visible || o)) {
                i.push(t.key);
              }
              return !t.visible || !o && e.isRowExpanded(t.key, n);
            });
          }
          return i;
        },
        isSelectAll: function () {
          if ((this.option("selectedRowKeys") || []).length === 0) {
            return false;
          }
          var e = this.component;
          var t = this._getSelectAllNodeKeys();
          var n = this.isRecursiveSelection();
          var i = false;
          var o = t.filter(function (t) {
            var o = e.isRowSelected(t, n);
            if (o === undefined) {
              i = true;
            }
            return o;
          });
          if (o.length) {
            return o.length === t.length || undefined;
          } else {
            return !!i && undefined;
          }
        },
        selectAll: function () {
          var e = this;
          var t = this._getSelectAllNodeKeys().filter(function (t) {
            return !e.isRowSelected(t);
          });
          this.focusedItemIndex(-1);
          return this.selectRows(t, true);
        },
        deselectAll: function () {
          var e = this._getSelectAllNodeKeys();
          this.focusedItemIndex(-1);
          return this.deselectRows(e);
        },
        selectedItemKeys: function (e, t, n, i) {
          var a = this;
          var s = a.option("selectedRowKeys");
          var l = this.isRecursiveSelection() && a._normalizeSelectionArgs({
            keys: (0, r.isDefined)(e) ? e : []
          }, t, !n);
          if (l && !(0, o.equalByValue)(l.selectedRowKeys, s)) {
            a._isSelectionNormalizing = true;
            return this.callBase(l.selectedRowKeys, false, false, false).always(function () {
              a._isSelectionNormalizing = false;
            }).done(function (e) {
              l.selectedRowsData = e;
              a._fireSelectionChanged(l);
            });
          } else {
            return this.callBase(e, t, n, i);
          }
        },
        changeItemSelection: function (e, t) {
          var n = this;
          var i = this.isRecursiveSelection();
          if (i && !t.shift) {
            var o = this._dataController.getKeyByRowIndex(e);
            return this.selectedItemKeys(o, true, this.isRowSelected(o)).done(function () {
              if (n.isRowSelected(o)) {
                n.callBase(e, t, true);
              }
            });
          }
          return this.callBase.apply(this, arguments);
        },
        _updateParentSelectionState: function (e, t) {
          var n = this;
          var i = t;
          var o = e.parent;
          if (o) {
            if (o.children.length > 1) {
              if (t === false) {
                i = !!o.children.some(function (e) {
                  return n._selectionStateByKey[e.key];
                }) && undefined;
              } else if (t === true) {
                i = !o.children.some(function (e) {
                  return !n._selectionStateByKey[e.key];
                }) || undefined;
              }
            }
            this._selectionStateByKey[o.key] = i;
            if (o.parent && o.parent.level >= 0) {
              this._updateParentSelectionState(o, i);
            }
          }
        },
        _updateChildrenSelectionState: function (e, t) {
          var n = this;
          var i = e.children;
          if (i) {
            i.forEach(function (e) {
              n._selectionStateByKey[e.key] = t;
              if (e.children.length > 0) {
                n._updateChildrenSelectionState(e, t);
              }
            });
          }
        },
        _updateSelectionStateCore: function (e, t) {
          var n = this._dataController;
          for (var i = 0; i < e.length; i++) {
            this._selectionStateByKey[e[i]] = t;
            var o = n.getNodeByKey(e[i]);
            if (o) {
              this._updateParentSelectionState(o, t);
              this._updateChildrenSelectionState(o, t);
            }
          }
        },
        _getSelectedParentKeys: function (e, t, n) {
          var i;
          var o = this._dataController.getNodeByKey(e);
          for (var a = o && o.parent, r = []; a && a.level >= 0;) {
            r.unshift(a.key);
            if (n ? !h(t, a.key) && this.isRowSelected(a.key) : t.indexOf(a.key) >= 0) {
              i = a;
              r = this._getSelectedParentKeys(i.key, t, n).concat(r);
              break;
            }
            if (n) {
              break;
            }
            a = a.parent;
          }
          return i && r || [];
        },
        _getSelectedChildKeys: function (e, t) {
          var n = this;
          var i = [];
          var o = this._dataController.getNodeByKey(e);
          if (o) {
            l.default.foreachNodes(o.children, function (e) {
              var o = t.indexOf(e.key);
              if (o < 0) {
                i.push(e.key);
              }
              return o > 0 || o < 0 && n._selectionStateByKey[e.key] === undefined;
            });
          }
          return i;
        },
        _normalizeParentKeys: function (e, t) {
          var n = [e];
          var i = this._getSelectedParentKeys(e, t.selectedRowKeys);
          if (i.length) {
            (n = n.concat(i)).forEach(function (e) {
              var n = t.selectedRowKeys.indexOf(e);
              if (n >= 0) {
                t.selectedRowKeys.splice(n, 1);
              }
            });
            var o = this._getSelectedChildKeys(i[0], n);
            t.selectedRowKeys = t.selectedRowKeys.concat(o);
          }
        },
        _normalizeChildrenKeys: function (e, t) {
          var n = this;
          var i = this._dataController.getNodeByKey(e);
          if (i) {
            i.children.forEach(function (e) {
              var i = t.selectedRowKeys.indexOf(e.key);
              if (i >= 0) {
                t.selectedRowKeys.splice(i, 1);
              }
              n._normalizeChildrenKeys(e.key, t);
            });
          }
        },
        _normalizeSelectedRowKeysCore: function (e, t, n, i) {
          var o = this;
          e.forEach(function (e) {
            if (!n || o.isRowSelected(e) !== i) {
              o._normalizeChildrenKeys(e, t);
              var a = t.selectedRowKeys.indexOf(e);
              if (i) {
                if (a < 0) {
                  t.selectedRowKeys.push(e);
                }
                t.currentSelectedRowKeys.push(e);
              } else {
                if (a >= 0) {
                  t.selectedRowKeys.splice(a, 1);
                }
                t.currentDeselectedRowKeys.push(e);
                o._normalizeParentKeys(e, t);
              }
            }
          });
        },
        _normalizeSelectionArgs: function (e, t, n) {
          var i;
          var o = Array.isArray(e.keys) ? e.keys : [e.keys];
          var a = this.option("selectedRowKeys") || [];
          if (o.length) {
            i = {
              currentSelectedRowKeys: [],
              currentDeselectedRowKeys: [],
              selectedRowKeys: t ? a.slice(0) : []
            };
            this._normalizeSelectedRowKeysCore(o, i, t, n);
          }
          return i;
        },
        _updateSelectedItems: function (e) {
          this.updateSelectionState(e);
          this.callBase(e);
        },
        _fireSelectionChanged: function () {
          if (!this._isSelectionNormalizing) {
            this.callBase.apply(this, arguments);
          }
        },
        _isModeLeavesOnly: function (e) {
          return e === "leavesOnly";
        },
        _removeDuplicatedKeys: function (e) {
          var t = [];
          var n = {};
          e.forEach(function (e) {
            if (!n[e]) {
              n[e] = true;
              t.push(e);
            }
          });
          return t;
        },
        _getAllChildKeys: function (e) {
          var t = [];
          var n = this._dataController.getNodeByKey(e);
          if (n) {
            l.default.foreachNodes(n.children, function (e) {
              t.push(e.key);
            }, true);
          }
          return t;
        },
        _getAllSelectedRowKeys: function (e) {
          var t = this;
          var n = [];
          e.forEach(function (e) {
            var i = t._getSelectedParentKeys(e, [], true);
            var o = t._getAllChildKeys(e);
            n.push.apply(n, i.concat([e], o));
          });
          return n = this._removeDuplicatedKeys(n);
        },
        _getParentSelectedRowKeys: function (e) {
          var t = this;
          var n = [];
          e.forEach(function (i) {
            if (!t._getSelectedParentKeys(i, e).length) {
              n.push(i);
            }
          });
          return n;
        },
        _getLeafSelectedRowKeys: function (e) {
          var t = [];
          var n = this._dataController;
          e.forEach(function (e) {
            var i = n.getNodeByKey(e);
            if (i && !i.hasChildren) {
              t.push(e);
            }
          });
          return t;
        },
        isRecursiveSelection: function () {
          var e = this.option("selection.mode");
          var t = this.option("selection.recursive");
          return e === "multiple" && t;
        },
        updateSelectionState: function (e) {
          var t = e.removedItemKeys || [];
          var n = e.selectedItemKeys || [];
          if (this.isRecursiveSelection()) {
            this._updateSelectionStateCore(t, false);
            this._updateSelectionStateCore(n, true);
          }
        },
        isRowSelected: function (e, t) {
          var n = this.callBase.apply(this, arguments);
          t = t ?? this.isRecursiveSelection();
          if (!n && t) {
            return e in this._selectionStateByKey && this._selectionStateByKey[e];
          } else {
            return n;
          }
        },
        getSelectedRowKeys: function (e) {
          var t = this;
          if (!t._dataController) {
            return [];
          }
          var n = t.callBase.apply(t, arguments);
          if (e) {
            if (this.isRecursiveSelection()) {
              n = this._getAllSelectedRowKeys(n);
            }
            if (e !== "all") {
              if (e === "excludeRecursive") {
                n = t._getParentSelectedRowKeys(n);
              } else if (t._isModeLeavesOnly(e)) {
                n = t._getLeafSelectedRowKeys(n);
              }
            }
          }
          return n;
        },
        getSelectedRowsData: function (e) {
          var t = this._dataController;
          var n = this.getSelectedRowKeys(e) || [];
          var i = [];
          n.forEach(function (e) {
            var n = t.getNodeByKey(e);
            if (n) {
              i.push(n.data);
            }
          });
          return i;
        },
        refresh: function () {
          this._selectionStateByKey = {};
          return this.callBase.apply(this, arguments);
        }
      }
    },
    views: {
      columnHeadersView: {
        _processTemplate: function (e, t) {
          var n = this;
          var i = this.callBase(e, t);
          var o = n._columnsController.getFirstDataColumnIndex();
          if (i && t.rowType === "header" && t.column.index === o) {
            return {
              render: function (e) {
                if (n.option("selection.mode") === "multiple") {
                  n.renderSelectAll(e.container, e.model);
                }
                i.render(e);
              }
            };
          } else {
            return i;
          }
        },
        renderSelectAll: function (e, t) {
          e.addClass("dx-treelist-select-all");
          this._renderSelectAllCheckBox(e);
        },
        _isSortableElement: function (e) {
          return this.callBase(e) && !e.closest(`.dx-select-checkbox`).length;
        }
      },
      rowsView: {
        _renderIcons: function (e, t) {
          this.callBase.apply(this, arguments);
          if (!t.row.isNewRow && this.option("selection.mode") === "multiple") {
            this.getController("selection").renderSelectCheckBoxContainer(e, t);
          }
          return e;
        },
        _rowClick: function (e) {
          var t = (0, i.default)(e.event.target);
          if (this.isExpandIcon(t)) {
            this.callBase.apply(this, arguments);
          } else {
            d.apply(this, arguments);
          }
        }
      }
    }
  }
}));