Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.selectionModule = exports.SelectionController = undefined;
var i = b(require("./68374.js"));
var o = require("./20576.js");
var a = require("./62754.js");
var r = require("./13306.js");
var s = require("./95479.js");
var l = require("./60137.js");
var u = require("./35922.js");
var d = require("./60637.js");
var c = require("./95429.js");
var h = b(require("./55994.js"));
var f = b(require("./11699.js"));
var p = require("./39611.js");
var g = b(require("./28109.js"));
var m = b(require("./68198.js"));
var _ = b(require("./96688.js"));
var v = b(require("./15943.js"));
var y = b(require("./60082.js"));
function b(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
function x(e, t) {
  return (x = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (e, t) {
    e.__proto__ = t;
    return e;
  })(e, t);
}
var w = "selection.showCheckBoxesMode";
function C(e, t) {
  var n = e.getController("selection");
  var o = e.getView("rowsView");
  var a = (0, i.default)(t.target).closest(`.dx-data-row`);
  var r = o.getRowIndex(a);
  if (!(r < 0)) {
    if (e.option(w) === "onLongTap") {
      if (n.isSelectionWithCheckboxes()) {
        n.stopSelectionWithCheckboxes();
      } else {
        n.startSelectionWithCheckboxes();
      }
    } else {
      if (e.option(w) === "onClick") {
        n.startSelectionWithCheckboxes();
      }
      if (e.option(w) !== "always") {
        n.changeItemSelection(r, {
          control: true
        });
      }
    }
  }
}
function S(e, t) {
  var n = t.component;
  var o = n.getView("rowsView");
  if (n.option("renderAsync") && !n.option("selection.deferred")) {
    t.value = n.isRowSelected(t.row.key);
  }
  o.renderSelectCheckBoxContainer((0, i.default)(e), t);
}
function k(e, t) {
  var n = t.column;
  var o = (0, i.default)(e);
  var a = t.component.getView("columnHeadersView");
  o.addClass("dx-editor-cell");
  a._renderSelectAllCheckBox(o, n);
  a._attachSelectAllCheckBoxClickEvent(o);
}
var D = function (e) {
  var t;
  var n;
  function i() {
    return e.apply(this, arguments) || this;
  }
  n = e;
  (t = i).prototype = Object.create(n.prototype);
  t.prototype.constructor = t;
  x(t, n);
  var r = i.prototype;
  r.init = function () {
    var t = this.option("selection") ?? {};
    var n = t.deferred;
    var i = t.selectAllMode;
    var o = t.mode;
    if (this.option("scrolling.mode") === "infinite" && !n && o === "multiple" && i === "allPages") {
      _.default.log("W1018");
    }
    this._dataController = this.getController("data");
    this._selectionMode = o;
    this._isSelectionWithCheckboxes = false;
    this._selection = this._createSelection();
    this._updateSelectColumn();
    this.createAction("onSelectionChanged", {
      excludeValidators: ["disabled", "readOnly"]
    });
    if (!this._dataPushedHandler) {
      this._dataPushedHandler = this._handleDataPushed.bind(this);
      this._dataController.pushed.add(this._dataPushedHandler);
    }
  };
  r._handleDataPushed = function (e) {
    this._deselectRemovedOnPush(e);
    this._updateSelectedOnPush(e);
  };
  r._deselectRemovedOnPush = function (e) {
    var t = this.option("selection.deferred");
    var n = e.filter(function (e) {
      return e.type === "remove";
    }).map(function (e) {
      return e.key;
    });
    if (t) {
      var i = this._dataController.items().filter(function (e) {
        return e.isSelected;
      }).map(function (e) {
        return e.key;
      });
      n = n.filter(function (e) {
        return i.find(function (t) {
          return (0, o.equalByValue)(t, e);
        });
      });
    }
    if (n.length) {
      this.deselectRows(n);
    }
  };
  r._updateSelectedOnPush = function (e) {
    if (!this.option("selection.deferred")) {
      var t = e.filter(function (e) {
        return e.type === "update";
      });
      var n = this.getSelectedRowsData();
      (0, d.applyBatch)({
        keyInfo: this._selection.options,
        data: n,
        changes: t
      });
    }
  };
  r._getSelectionConfig = function () {
    var t = this._dataController;
    var n = this.getController("columns");
    var i = this.option("selection") ?? {};
    var o = i.deferred;
    var r = this.option("scrolling.mode");
    var s = r === "virtual" || r === "infinite";
    var l = this.option("selection.allowSelectAll");
    var d = this.option("scrolling.legacyMode");
    return {
      selectedKeys: this.option("selectedRowKeys"),
      mode: this._selectionMode,
      deferred: o,
      maxFilterLengthInRequest: i.maxFilterLengthInRequest,
      selectionFilter: this.option("selectionFilter"),
      ignoreDisabledItems: true,
      allowLoadByRange: function () {
        var e = n.getGroupColumns().length > 0;
        return s && !d && !e && l && !o;
      },
      key: function () {
        if (t == null) {
          return undefined;
        } else {
          return t.key();
        }
      },
      keyOf: function (e) {
        if (t == null) {
          return undefined;
        } else {
          return t.keyOf(e);
        }
      },
      dataFields: function () {
        var e;
        if ((e = t.dataSource()) === null || e === undefined) {
          return undefined;
        } else {
          return e.select();
        }
      },
      load: function (e) {
        var n;
        return ((n = t.dataSource()) === null || n === undefined ? undefined : n.load(e)) || new a.Deferred().resolve([]);
      },
      plainItems: function () {
        return t.items(true);
      },
      isItemSelected: function (e) {
        return e.selected;
      },
      isSelectableItem: function (e) {
        return (e == null ? undefined : e.rowType) === "data" && !e.isNewRow;
      },
      getItemData: function (e) {
        if ((0, u.isDefined)(e == null ? undefined : e.rowType)) {
          return (e == null ? undefined : e.oldData) || (e == null ? undefined : e.data);
        } else {
          return e;
        }
      },
      filter: function () {
        return t.getCombinedFilter(o);
      },
      totalCount: function () {
        return t.totalCount();
      },
      getLoadOptions: function (e, n, i) {
        var o;
        var r = ((o = t.dataSource()) === null || o === undefined ? undefined : o.lastLoadOptions()) ?? {};
        var s = r.sort;
        var l = r.filter;
        var d = Math.min(e, n);
        var c = Math.max(e, n);
        if ((0, u.isDefined)(i)) {
          d = Math.min(i, d);
          c = Math.max(i, c);
        }
        return {
          skip: d,
          take: c - d + 1,
          filter: l,
          sort: s
        };
      },
      onSelectionChanged: this._updateSelectedItems.bind(this)
    };
  };
  r._updateSelectColumn = function () {
    var e = this.getController("columns");
    var t = this.isSelectColumnVisible();
    e.addCommandColumn({
      type: "selection",
      command: "select",
      visible: t,
      visibleIndex: -1,
      dataType: "boolean",
      alignment: "center",
      cssClass: "dx-command-select",
      width: "auto",
      cellTemplate: S,
      headerCellTemplate: k
    });
    e.columnOption("command:select", "visible", t);
  };
  r._createSelection = function () {
    var e = this._getSelectionConfig();
    return new m.default(e);
  };
  r._fireSelectionChanged = function (e) {
    var t = this.option("selection.deferred") ? {
      selectionFilter: this.option("selectionFilter")
    } : {
      selectedRowKeys: this.option("selectedRowKeys")
    };
    this.selectionChanged.fire(t);
    if (e) {
      this.executeAction("onSelectionChanged", e);
    }
  };
  r._updateCheckboxesState = function (e) {
    var t = e.isDeferredMode;
    var n = e.selectionFilter;
    var i = e.selectedItemKeys;
    var o = e.removedItemKeys;
    if (this.option(w) === "onClick") {
      if (t ? n && function (e, t) {
        var n = 0;
        var i = e._dataController.store();
        var o = i && i.key();
        var a = Array.isArray(o);
        if (!t.length) {
          return false;
        }
        if (a && Array.isArray(t[0]) && t[1] === "and") {
          for (var r = 0; r < t.length; r++) {
            if (Array.isArray(t[r])) {
              if (t[r][0] !== o[n] || t[r][1] !== "=") {
                return true;
              }
              n++;
            }
          }
          return false;
        }
        return o !== t[0];
      }(this, n) : i.length > 1) {
        this.startSelectionWithCheckboxes();
      } else if (t ? n && !n.length : i.length === 0 && o.length) {
        this.stopSelectionWithCheckboxes();
      }
    }
  };
  r._updateSelectedItems = function (e) {
    var t;
    var n = this.option("selection.deferred");
    var i = this._selection.selectionFilter();
    var o = this._dataController;
    var a = o.items(true);
    var r = o.items();
    if (a) {
      var s = this.isSelectionWithCheckboxes();
      var l = this.getChangedItemIndexes(a);
      var u = this.getChangedItemIndexes(r);
      this._updateCheckboxesState({
        selectedItemKeys: e.selectedItemKeys,
        removedItemKeys: e.removedItemKeys,
        selectionFilter: i,
        isDeferredMode: n
      });
      if (l.length || s !== this.isSelectionWithCheckboxes()) {
        o.updateItems({
          changeType: "updateSelection",
          itemIndexes: u
        });
      }
      if (n) {
        this.option("selectionFilter", i);
        t = {};
      } else if (e.addedItemKeys.length || e.removedItemKeys.length) {
        this._selectedItemsInternalChange = true;
        this.option("selectedRowKeys", e.selectedItemKeys.slice(0));
        this._selectedItemsInternalChange = false;
        t = {
          selectedRowsData: e.selectedItems.slice(0),
          selectedRowKeys: e.selectedItemKeys.slice(0),
          currentSelectedRowKeys: e.addedItemKeys.slice(0),
          currentDeselectedRowKeys: e.removedItemKeys.slice(0)
        };
      }
      this._fireSelectionChanged(t);
    }
  };
  r.getChangedItemIndexes = function (e) {
    var t = [];
    var n = this.option("selection.deferred");
    for (var i = 0, o = e.length; i < o; i++) {
      var a = e[i];
      var r = this.isRowSelected(n ? a.data : a.key);
      if (this._selection.isDataItem(a) && a.isSelected !== r) {
        t.push(i);
      }
    }
    return t;
  };
  r.callbackNames = function () {
    return ["selectionChanged"];
  };
  r.optionChanged = function (t) {
    var n = this;
    e.prototype.optionChanged.call(this, t);
    switch (t.name) {
      case "selection":
        var i = this._selectionMode;
        this.init();
        if (t.fullName !== "selection.showCheckBoxesMode") {
          var o = this._selectionMode;
          var a = this.option("selectedRowKeys");
          if (i !== o) {
            if (o === "single") {
              if (a.length > 1) {
                a = [a[0]];
              }
            } else if (o !== "multiple") {
              a = [];
            }
          }
          this.selectRows(a).always(function () {
            n._fireSelectionChanged();
          });
        }
        this.getController("columns").updateColumns();
        t.handled = true;
        break;
      case "selectionFilter":
        this._selection.selectionFilter(t.value);
        t.handled = true;
        break;
      case "selectedRowKeys":
        var r = t.value || [];
        if (!!Array.isArray(r) && !this._selectedItemsInternalChange && (!!this.component.getDataSource() || !r.length)) {
          this.selectRows(r);
        }
        t.handled = true;
    }
  };
  r.publicMethods = function () {
    return ["selectRows", "deselectRows", "selectRowsByIndexes", "getSelectedRowKeys", "getSelectedRowsData", "clearSelection", "selectAll", "deselectAll", "startSelectionWithCheckboxes", "stopSelectionWithCheckboxes", "isRowSelected"];
  };
  r.isRowSelected = function (e) {
    return this._selection.isItemSelected(e);
  };
  r.isSelectColumnVisible = function () {
    return this.option("selection.mode") === "multiple" && (this.option(w) === "always" || this.option(w) === "onClick" || this._isSelectionWithCheckboxes);
  };
  r._isOnePageSelectAll = function () {
    return this.option("selection.selectAllMode") === "page";
  };
  r.isSelectAll = function () {
    return this._selection.getSelectAllState(this._isOnePageSelectAll());
  };
  r.selectAll = function () {
    if (this.option(w) === "onClick") {
      this.startSelectionWithCheckboxes();
    }
    return this._selection.selectAll(this._isOnePageSelectAll());
  };
  r.deselectAll = function () {
    return this._selection.deselectAll(this._isOnePageSelectAll());
  };
  r.clearSelection = function () {
    return this.selectedItemKeys([]);
  };
  r.refresh = function () {
    var t = this.option("selectedRowKeys") ?? [];
    if (!this.option("selection.deferred") && t.length) {
      return this.selectedItemKeys(t);
    } else {
      return new a.Deferred().resolve().promise();
    }
  };
  r.selectedItemKeys = function (e, t, n, i) {
    return this._selection.selectedItemKeys(e, t, n, i);
  };
  r.getSelectedRowKeys = function () {
    return this._selection.getSelectedItemKeys();
  };
  r.selectRows = function (e, t) {
    return this.selectedItemKeys(e, t);
  };
  r.deselectRows = function (e) {
    return this.selectedItemKeys(e, true, true);
  };
  r.selectRowsByIndexes = function (e) {
    var t = this._dataController.items();
    var n = [];
    if (!Array.isArray(e)) {
      e = Array.prototype.slice.call(arguments, 0);
    }
    (0, s.each)(e, function () {
      var e = t[this];
      if (e && e.rowType === "data") {
        n.push(e.key);
      }
    });
    return this.selectRows(n);
  };
  r.getSelectedRowsData = function () {
    return this._selection.getSelectedItems();
  };
  r.loadSelectedItemsWithFilter = function () {
    return this._selection.loadSelectedItemsWithFilter();
  };
  r.changeItemSelection = function (e, t, n) {
    t = t || {};
    if (this.isSelectionWithCheckboxes()) {
      t.control = true;
    }
    var i = e + this._dataController.getRowIndexOffset() - this._dataController.getRowIndexOffset(true);
    return this._selection.changeItemSelection(i, t, n);
  };
  r.focusedItemIndex = function (e) {
    if (!(0, u.isDefined)(e)) {
      return this._selection._focusedItemIndex;
    }
    this._selection._focusedItemIndex = e;
  };
  r.isSelectionWithCheckboxes = function () {
    return this.option("selection.mode") === "multiple" && (this.option(w) === "always" || this._isSelectionWithCheckboxes);
  };
  r.startSelectionWithCheckboxes = function () {
    return this.option("selection.mode") === "multiple" && !this.isSelectionWithCheckboxes() && (this._isSelectionWithCheckboxes = true, this._updateSelectColumn(), true);
  };
  r.stopSelectionWithCheckboxes = function () {
    return !!this._isSelectionWithCheckboxes && (this._isSelectionWithCheckboxes = false, this._updateSelectColumn(), true);
  };
  return i;
}(v.default.Controller);
exports.SelectionController = D;
var I = {
  defaultOptions: function () {
    return {
      selection: {
        mode: "none",
        showCheckBoxesMode: "onClick",
        allowSelectAll: true,
        selectAllMode: "allPages",
        maxFilterLengthInRequest: 1500,
        deferred: false
      },
      selectionFilter: [],
      selectedRowKeys: []
    };
  },
  controllers: {
    selection: D
  },
  extenders: {
    controllers: {
      data: {
        init: function () {
          var e = this.getController("selection");
          var t = this.option("selection.deferred");
          this.callBase.apply(this, arguments);
          if (t) {
            e._updateCheckboxesState({
              isDeferredMode: true,
              selectionFilter: this.option("selectionFilter")
            });
          }
        },
        _loadDataSource: function () {
          var e = this;
          return e.callBase().always(function () {
            e.getController("selection").refresh();
          });
        },
        _processDataItem: function (e, t) {
          var n = this;
          var i = n.getController("selection");
          var o = i.isSelectColumnVisible();
          var a = t.isDeferredSelection = t.isDeferredSelection === undefined ? this.option("selection.deferred") : t.isDeferredSelection;
          var r = this.callBase.apply(this, arguments);
          r.isSelected = i.isRowSelected(a ? r.data : r.key);
          if (o && r.values) {
            for (var s = 0; s < t.visibleColumns.length; s++) {
              if (t.visibleColumns[s].command === "select") {
                r.values[s] = r.isSelected;
                break;
              }
            }
          }
          return r;
        },
        refresh: function (e) {
          var t = this;
          var n = new a.Deferred();
          this.callBase.apply(this, arguments).done(function () {
            if (!e || e.selection) {
              t.getController("selection").refresh().done(n.resolve).fail(n.reject);
            } else {
              n.resolve();
            }
          }).fail(n.reject);
          return n.promise();
        },
        _handleDataChanged: function (e) {
          this.callBase.apply(this, arguments);
          if ((!e || e.changeType === "refresh") && !this._repaintChangesOnly) {
            this.getController("selection").focusedItemIndex(-1);
          }
        },
        _applyChange: function (e) {
          var t = this;
          if (!e || e.changeType !== "updateSelection") {
            return this.callBase.apply(this, arguments);
          }
          e.items.forEach(function (e, n) {
            var i = t._items[n];
            if (i) {
              i.isSelected = e.isSelected;
              i.values = e.values;
            }
          });
        },
        _endUpdateCore: function () {
          var e = this._changes;
          var t = e.length > 1 && e.every(function (e) {
            return e.changeType === "updateSelection";
          });
          if (t) {
            var n = e.map(function (e) {
              return e.itemIndexes || [];
            }).reduce(function (e, t) {
              return e.concat(t);
            });
            this._changes = [{
              changeType: "updateSelection",
              itemIndexes: n
            }];
          }
          this.callBase.apply(this, arguments);
        }
      },
      contextMenu: {
        _contextMenuPrepared: function (e) {
          var t = e.event;
          if ((!t.originalEvent || t.originalEvent.type === "dxhold") && (!e.items || !(e.items.length > 0))) {
            C(this, t);
          }
        }
      }
    },
    views: {
      columnHeadersView: {
        init: function () {
          this.callBase();
          this.getController("selection").selectionChanged.add(this._updateSelectAllValue.bind(this));
        },
        _updateSelectAllValue: function () {
          var e = this.element();
          var t = e && e.find(`.dx-select-checkbox`);
          if (e && t.length && this.option("selection.mode") === "multiple") {
            var n = this.getController("selection").isSelectAll();
            var i = n !== false;
            var o = this.option("selection.allowSelectAll") ? !this.getController("data").isEmpty() : i;
            t.dxCheckBox("instance").option({
              visible: o,
              value: n
            });
          }
        },
        _handleDataChanged: function (e) {
          var t = this;
          this.callBase(e);
          if (!e || e.changeType === "refresh" || e.repaintChangesOnly && e.changeType === "update") {
            this.waitAsyncTemplates().done(function () {
              t._updateSelectAllValue();
            });
          }
        },
        _renderSelectAllCheckBox: function (e, t) {
          var n = this;
          var o = n.getController("selection");
          var a = n.getController("data").isEmpty();
          var s = (0, i.default)("<div>").appendTo(e).addClass("dx-select-checkbox");
          n.setAria("label", g.default.format("dxDataGrid-ariaSelectAll"), s);
          n.getController("editorFactory").createEditor(s, (0, r.extend)({}, t, {
            parentType: "headerRow",
            dataType: "boolean",
            value: o.isSelectAll(),
            editorOptions: {
              visible: !a && (n.option("selection.allowSelectAll") || o.isSelectAll() !== false)
            },
            tabIndex: n.option("useLegacyKeyboardNavigation") ? -1 : n.option("tabIndex") || 0,
            setValue: function (e, t) {
              var i = n.option("selection.allowSelectAll");
              t.component.option("visible", i || t.component.option("value") !== false);
              if (t.event && o.isSelectAll() !== e) {
                if (t.value && !i) {
                  t.component.option("value", false);
                } else if (t.value) {
                  o.selectAll();
                } else {
                  o.deselectAll();
                }
                t.event.preventDefault();
              }
            }
          }));
          return s;
        },
        _attachSelectAllCheckBoxClickEvent: function (e) {
          h.default.on(e, c.name, this.createAction(function (e) {
            var t = e.event;
            if (!(0, i.default)(t.target).closest(`.dx-select-checkbox`).length) {
              h.default.trigger((0, i.default)(t.currentTarget).children(`.dx-select-checkbox`), c.name);
            }
            t.preventDefault();
          }));
        }
      },
      rowsView: {
        renderSelectCheckBoxContainer: function (e, t) {
          if (t.rowType !== "data" || t.row.isNewRow) {
            y.default.setEmptyText(e);
          } else {
            e.addClass("dx-editor-cell");
            this._attachCheckBoxClickEvent(e);
            this._renderSelectCheckBox(e, t);
          }
        },
        _renderSelectCheckBox: function (e, t) {
          var n = (0, i.default)("<div>").addClass("dx-select-checkbox").appendTo(e);
          this.setAria("label", g.default.format("dxDataGrid-ariaSelectRow"), n);
          this.getController("editorFactory").createEditor(n, (0, r.extend)({}, t.column, {
            parentType: "dataRow",
            dataType: "boolean",
            lookup: null,
            value: t.value,
            setValue: function (e, t) {
              if ((t == null ? undefined : t.event)?.type === "keydown") {
                h.default.trigger(t.element, c.name, t);
              }
            },
            row: t.row
          }));
          return n;
        },
        _attachCheckBoxClickEvent: function (e) {
          h.default.on(e, c.name, this.createAction(function (e) {
            var t = this.getController("selection");
            var n = e.event;
            var o = this.getRowIndex((0, i.default)(n.currentTarget).closest(`.dx-row`));
            if (o >= 0) {
              t.startSelectionWithCheckboxes();
              t.changeItemSelection(o, {
                shift: n.shiftKey
              });
              if ((0, i.default)(n.target).closest(`.dx-select-checkbox`).length) {
                this.getController("data").updateItems({
                  changeType: "updateSelection",
                  itemIndexes: [o]
                });
              }
            }
          }));
        },
        _update: function (e) {
          var t = this;
          var n = t.getTableElements();
          if (e.changeType === "updateSelection") {
            if (n.length > 0) {
              (0, s.each)(n, function (n, o) {
                (0, s.each)(e.itemIndexes || [], function (n, a) {
                  var r;
                  if (e.items[a] && (r = t._getRowElements((0, i.default)(o)).eq(a)).length) {
                    var s = e.items[a].isSelected;
                    r.toggleClass("dx-selection", s !== undefined && s).find(`.dx-select-checkbox`).dxCheckBox("option", "value", s);
                    t.setAria("selected", s, r);
                  }
                });
              });
              t._updateCheckboxesClass();
            }
          } else {
            t.callBase(e);
          }
        },
        _createTable: function () {
          var e = this;
          var t = e.option("selection.mode");
          var n = e.callBase.apply(e, arguments);
          if (t !== "none") {
            if (e.option(w) === "onLongTap" || !l.touch) {
              h.default.on(n, (0, p.addNamespace)(f.default.name, "dxDataGridRowsView"), `.dx-data-row`, e.createAction(function (t) {
                C(e.component, t.event);
                t.event.stopPropagation();
              }));
            }
            h.default.on(n, "mousedown selectstart", e.createAction(function (e) {
              var t = e.event;
              if (t.shiftKey) {
                t.preventDefault();
              }
            }));
          }
          return n;
        },
        _createRow: function (e) {
          var t = this.callBase.apply(this, arguments);
          if (e) {
            var n = e.isSelected;
            if (n) {
              t.addClass("dx-selection");
            }
            var i = this.option("selection.mode");
            if (i !== "none") {
              this.setAria("selected", n, t);
            }
          }
          return t;
        },
        _rowClick: function (e) {
          var t = e.event;
          var n = (0, i.default)(t.target).closest(`.dx-selection-disabled`).length;
          if (!this.isClickableElement((0, i.default)(t.target))) {
            if (!n && (this.option("selection.mode") !== "multiple" || this.option(w) !== "always")) {
              if (this.getController("selection").changeItemSelection(e.rowIndex, {
                control: (0, p.isCommandKeyPressed)(t),
                shift: t.shiftKey
              })) {
                t.preventDefault();
                e.handled = true;
              }
            }
            this.callBase(e);
          }
        },
        isClickableElement: function (e) {
          return !!e.closest(`.dx-command-select`).length;
        },
        _renderCore: function (e) {
          var t = this.callBase(e);
          this._updateCheckboxesClass();
          return t;
        },
        _updateCheckboxesClass: function () {
          var e = this.getTableElements();
          var t = this.getController("selection");
          var n = t.isSelectColumnVisible() && !t.isSelectionWithCheckboxes();
          (0, s.each)(e, function (e, t) {
            (0, i.default)(t).toggleClass("dx-select-checkboxes-hidden", n);
          });
        }
      }
    }
  }
};
exports.selectionModule = I;