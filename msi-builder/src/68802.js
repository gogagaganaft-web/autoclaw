Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.editingCellBasedModule = undefined;
var i = _(require("./73349.js"));
var o = _(require("./68374.js"));
var a = require("./20576.js");
var r = require("./62754.js");
var s = require("./3532.js");
var l = require("./35922.js");
var u = require("./60637.js");
var d = require("./95429.js");
var c = _(require("./55994.js"));
var h = _(require("./11699.js"));
var f = _(require("./93786.js"));
var p = require("./39611.js");
var g = require("./72313.js");
var m = require("./89237.js");
function _(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
function v(e, t) {
  return (v = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (e, t) {
    e.__proto__ = t;
    return e;
  })(e, t);
}
var y = {
  extenders: {
    controllers: {
      editing: function (e) {
        return function (e) {
          var t;
          var n;
          function h() {
            return e.apply(this, arguments) || this;
          }
          n = e;
          (t = h).prototype = Object.create(n.prototype);
          t.prototype.constructor = t;
          v(t, n);
          var p = h.prototype;
          p.init = function () {
            var t;
            var n;
            var a = this;
            var r = !this._saveEditorHandler;
            e.prototype.init.call(this);
            if (r) {
              this._pointerUpEditorHandler = function () {
                var e;
                n = (e = a.getController("columnsResizer")) === null || e === undefined ? undefined : e.isResizing();
              };
              this._pointerDownEditorHandler = function (e) {
                return t = (0, o.default)(e.target);
              };
              this._saveEditorHandler = this.createAction(function (e) {
                var i = e.event;
                var a = (0, o.default)(i.target);
                var r = i[g.TARGET_COMPONENT_NAME];
                var l = this.component;
                if ((!(0, m.isEditable)(t) || t.is(a)) && this.isCellOrBatchEditMode() && !this._editCellInProgress) {
                  var u = p(a) || p(r == null ? undefined : r.$element());
                  var d = r && !r._disposed && r !== this.component;
                  var c = !!a.closest(`.${this.addWidgetPrefix(g.ADD_ROW_BUTTON_CLASS)}`).length;
                  var h = a.hasClass(this.addWidgetPrefix(g.FOCUS_OVERLAY_CLASS));
                  var f = this.isCellEditMode();
                  if (!n && !u && !h && (!c || !f || !this.isEditing()) && (!!(0, s.isElementInDom)(a) || !!d)) {
                    this._closeEditItem.bind(this)(a);
                  }
                }
                function p(e) {
                  if (!e) {
                    return false;
                  }
                  var t = e.closest(`.${g.DROPDOWN_EDITOR_OVERLAY_CLASS}`);
                  var n = l.$element();
                  return t.length > 0 && n.closest(t).length === 0;
                }
              });
              c.default.on(i.default.getDocument(), f.default.up, this._pointerUpEditorHandler);
              c.default.on(i.default.getDocument(), f.default.down, this._pointerDownEditorHandler);
              c.default.on(i.default.getDocument(), d.name, this._saveEditorHandler);
            }
          };
          p.isCellEditMode = function () {
            return this.option("editing.mode") === g.EDIT_MODE_CELL;
          };
          p.isBatchEditMode = function () {
            return this.option("editing.mode") === g.EDIT_MODE_BATCH;
          };
          p.isCellOrBatchEditMode = function () {
            return this.isCellEditMode() || this.isBatchEditMode();
          };
          p._needToCloseEditableCell = function (t) {
            var i = this.component.$element();
            var o = this.isEditing();
            if ((!i || !!t.closest(i).length) && t.closest(`.${g.DATA_ROW_CLASS}`).length) {
              var a = this.getView("rowsView");
              var r = t.closest(`.${g.ROW_CLASS}> td`);
              var s = a.getRowIndex(r.parent());
              var l = a.getCellElements(s);
              if (l == null ? undefined : l.length) {
                var u = l.index(r);
                var d = this._columnsController.getVisibleColumns()[u]?.allowEditing;
                var c = this.isEditCell(s, u);
                o = o && !d && !c;
              }
            }
            return o || e.prototype._needToCloseEditableCell.call(this, t);
          };
          p._closeEditItem = function (e) {
            if (this._needToCloseEditableCell(e)) {
              this.closeEditCell();
            }
          };
          p._focusEditorIfNeed = function () {
            var t;
            var n = this;
            if (this._needFocusEditor && this.isCellOrBatchEditMode()) {
              var i = this._getVisibleEditColumnIndex();
              var o = (t = this._rowsView) === null || t === undefined ? undefined : t._getCellElement(this._getVisibleEditRowIndex(), i);
              if (o && !o.find(":focus").length) {
                this._focusEditingCell(function () {
                  n._editCellInProgress = false;
                }, o, true);
              } else {
                this._editCellInProgress = false;
              }
              this._needFocusEditor = false;
            } else {
              e.prototype._focusEditorIfNeed.call(this);
            }
          };
          p.isEditing = function () {
            if (this.isCellOrBatchEditMode()) {
              var t = (0, l.isDefined)(this.option(g.EDITING_EDITROWKEY_OPTION_NAME));
              var n = (0, l.isDefined)(this.option(g.EDITING_EDITCOLUMNNAME_OPTION_NAME));
              return t && n;
            }
            return e.prototype.isEditing.call(this);
          };
          p._handleEditColumnNameChange = function (e) {
            var t = this._getVisibleEditRowIndex(e.previousValue);
            if (this.isCellOrBatchEditMode() && t !== -1 && (0, l.isDefined)(e.value) && e.value !== e.previousValue) {
              var n = this._columnsController.getVisibleColumnIndex(e.value);
              var i = this._columnsController.getVisibleColumnIndex(e.previousValue);
              this._editCellFromOptionChanged(n, i, t);
            }
          };
          p._addRow = function (t) {
            var n = this;
            if (this.isCellEditMode() && this.hasChanges()) {
              var i = new r.Deferred();
              this.saveEditData().done(function () {
                if (n.hasChanges()) {
                  i.reject("cancel");
                } else {
                  n.addRow(t).done(i.resolve).fail(i.reject);
                }
              });
              return i.promise();
            }
            return e.prototype._addRow.call(this, t);
          };
          p.editCell = function (e, t) {
            return this._editCell({
              rowIndex: e,
              columnIndex: t
            });
          };
          p._editCell = function (e) {
            var t;
            var n = this;
            var i = new r.Deferred();
            this.executeOperation(i, function () {
              t = n._editCellCore(e);
              (0, r.when)(t).done(i.resolve).fail(i.reject);
            });
            if (t !== undefined) {
              return t;
            } else {
              return i.promise();
            }
          };
          p._editCellCore = function (e) {
            var t = this;
            var n = this._dataController;
            var i = (0, l.isDefined)(e.oldColumnIndex) || (0, l.isDefined)(e.oldRowIndex);
            var o = this._getNormalizedEditCellOptions(e);
            var a = o.columnIndex;
            var s = o.rowIndex;
            var u = o.column;
            var d = o.item;
            var c = {
              data: d == null ? undefined : d.data,
              cancel: false,
              column: u
            };
            if (d.key !== undefined) {
              if (u && (d.rowType === "data" || d.rowType === "detailAdaptive") && !d.removed && this.isCellOrBatchEditMode()) {
                if (!i && this.isEditCell(s, a)) {
                  return true;
                }
                var h = s + n.getRowIndexOffset();
                return (0, r.when)(this._beforeEditCell(s, a, d)).done(function (e) {
                  if (!e && !t._prepareEditCell(c, d, a, h)) {
                    t._processCanceledEditingCell();
                  }
                });
              }
              return false;
            }
            this._dataController.fireError("E1043");
          };
          p._beforeEditCell = function (e, t, n) {
            var i = this;
            if (this.isCellEditMode() && !n.isNewRow && this.hasChanges()) {
              var o = new r.Deferred();
              this.saveEditData().always(function () {
                o.resolve(i.hasChanges());
              });
              return o;
            }
          };
          p.publicMethods = function () {
            var t = e.prototype.publicMethods.call(this);
            return t.concat(["editCell", "closeEditCell"]);
          };
          p._getNormalizedEditCellOptions = function (e) {
            var t;
            var n = e.oldColumnIndex;
            var i = e.oldRowIndex;
            var o = e.columnIndex;
            var a = e.rowIndex;
            var r = this._columnsController;
            var s = r.getVisibleColumns();
            var u = this._dataController.items()[a];
            t = (0, l.isDefined)(n) ? s[n] : this._getEditColumn();
            if (!(0, l.isDefined)(i)) {
              i = this._getVisibleEditRowIndex();
            }
            if ((0, l.isString)(o)) {
              o = r.columnOption(o, "index");
              o = r.getVisibleIndex(o);
            }
            return {
              oldColumn: t,
              columnIndex: o,
              oldRowIndex: i,
              rowIndex: a,
              column: s[o],
              item: u
            };
          };
          p._prepareEditCell = function (e, t, n, i) {
            if (!t.isNewRow) {
              e.key = t.key;
            }
            return !this._isEditingStart(e) && (this._pageIndex = this._dataController.pageIndex(), this._setEditRowKey(t.key), this._setEditColumnNameByIndex(n), e.column.showEditorAlways || this._addInternalData({
              key: t.key,
              oldData: t.oldData ?? t.data
            }), true);
          };
          p.closeEditCell = function (e, t) {
            var n = this;
            var i = (0, r.when)();
            var o = this._getVisibleEditRowIndex();
            if (this.isCellOrBatchEditMode()) {
              var a = new r.Deferred();
              i = new r.Deferred();
              this.executeOperation(a, function () {
                n._closeEditCellCore(e, o, t).always(i.resolve);
              });
            }
            return i.promise();
          };
          p._closeEditCellCore = function (e, t, n) {
            var i = this;
            var o = this._dataController;
            var a = new r.Deferred();
            var s = a.promise();
            if (this.isCellEditMode() && this.hasChanges()) {
              if (!n) {
                this.saveEditData().done(function (e) {
                  if (i.hasChanges()) {
                    a.resolve();
                  } else {
                    i.closeEditCell(!!e).always(a.resolve);
                  }
                });
                return s;
              }
            } else {
              this._resetEditRowKey();
              this._resetEditColumnName();
              if (t >= 0) {
                var l = [t];
                this._beforeCloseEditCellInBatchMode(l);
                if (!e) {
                  o.updateItems({
                    changeType: "update",
                    rowIndices: l
                  });
                }
              }
            }
            a.resolve();
            return s;
          };
          p._resetModifiedClassCells = function (e) {
            var t = this;
            if (this.isBatchEditMode()) {
              var n = this._columnsController.getVisibleColumns().length;
              e.forEach(function (e) {
                var i = e.key;
                var o = t._dataController.getRowIndexByKey(i);
                for (var a = 0; a < n; a++) {
                  var r = t._rowsView._getCellElement(o, a);
                  if (r != null) {
                    r.removeClass(g.CELL_MODIFIED_CLASS);
                  }
                }
              });
            }
          };
          p._prepareChange = function (t, n, i) {
            var a = (0, o.default)(t.cellElement);
            if (this.isBatchEditMode() && t.key !== undefined) {
              this._applyModified(a, t);
            }
            return e.prototype._prepareChange.call(this, t, n, i);
          };
          p._cancelSaving = function (t) {
            var n = this._dataController;
            if (this.isCellOrBatchEditMode()) {
              if (this.isBatchEditMode()) {
                this._resetEditIndices();
              }
              n.updateItems();
            }
            e.prototype._cancelSaving.call(this, t);
          };
          p.optionChanged = function (t) {
            var n = t.fullName;
            if (t.name === "editing" && n === g.EDITING_EDITCOLUMNNAME_OPTION_NAME) {
              this._handleEditColumnNameChange(t);
              t.handled = true;
            } else {
              e.prototype.optionChanged.call(this, t);
            }
          };
          p._editCellFromOptionChanged = function (e, t, n) {
            var i = this;
            var o = this._columnsController.getVisibleColumns();
            if (e > -1) {
              (0, a.deferRender)(function () {
                i._repaintEditCell(o[e], o[t], n);
              });
            }
          };
          p._handleEditRowKeyChange = function (t) {
            var n;
            if (this.isCellOrBatchEditMode()) {
              var i = this._getVisibleEditColumnIndex();
              var o = this._getEditRowIndexCorrection();
              var a = this._dataController.getRowIndexByKey(t.previousValue) + o;
              if ((0, l.isDefined)(t.value) && t.value !== t.previousValue) {
                if ((n = this._editCellFromOptionChanged) !== null && n !== undefined) {
                  n.call(this, i, i, a);
                }
              }
            } else {
              e.prototype._handleEditRowKeyChange.call(this, t);
            }
          };
          p.deleteRow = function (t) {
            var n = this;
            if (this.isCellEditMode() && this.isEditing()) {
              var i = this._dataController.items()[t].isNewRow;
              var o = this._dataController.getKeyByRowIndex(t);
              this.closeEditCell(null, i).always(function () {
                t = n._dataController.getRowIndexByKey(o);
                n._checkAndDeleteRow(t);
              });
            } else {
              e.prototype.deleteRow.call(this, t);
            }
          };
          p._checkAndDeleteRow = function (t) {
            if (this.isBatchEditMode()) {
              this._deleteRowCore(t);
            } else {
              e.prototype._checkAndDeleteRow.call(this, t);
            }
          };
          p._refreshCore = function (t) {
            var n = (t ?? {}).isPageChanged;
            var i = this.isBatchEditMode() || n && this.option("scrolling.mode") !== "virtual";
            if (this.isCellOrBatchEditMode()) {
              if (i) {
                this._resetEditColumnName();
                this._resetEditRowKey();
              }
            } else {
              e.prototype._refreshCore.call(this, t);
            }
          };
          p._allowRowAdding = function (t) {
            return !!this.isBatchEditMode() || e.prototype._allowRowAdding.call(this, t);
          };
          p._afterDeleteRow = function (t, n) {
            var i = this._dataController;
            if (this.isBatchEditMode()) {
              i.updateItems({
                changeType: "update",
                rowIndices: [n, t]
              });
              return new r.Deferred().resolve();
            } else {
              return e.prototype._afterDeleteRow.call(this, t, n);
            }
          };
          p._updateEditRow = function (t, n, i) {
            if (this.isCellOrBatchEditMode()) {
              this._updateRowImmediately(t, n, i);
            } else {
              e.prototype._updateEditRow.call(this, t, n, i);
            }
          };
          p._isDefaultButtonVisible = function (t, n) {
            if (this.isCellOrBatchEditMode()) {
              var i = this.isBatchEditMode();
              switch (t.name) {
                case "save":
                case "cancel":
                case "edit":
                  return false;
                case "delete":
                  return e.prototype._isDefaultButtonVisible.call(this, t, n) && (!i || !n.row.removed);
                case "undelete":
                  return i && this.allowDeleting(n) && n.row.removed;
                default:
                  return e.prototype._isDefaultButtonVisible.call(this, t, n);
              }
            }
            return e.prototype._isDefaultButtonVisible.call(this, t, n);
          };
          p._isRowDeleteAllowed = function () {
            return e.prototype._isRowDeleteAllowed.call(this) || this.isBatchEditMode();
          };
          p._beforeEndSaving = function (t) {
            if (this.isCellEditMode()) {
              if (t[0]?.type !== "update") {
                e.prototype._beforeEndSaving.call(this, t);
              }
            } else {
              if (this.isBatchEditMode()) {
                this._resetModifiedClassCells(t);
              }
              e.prototype._beforeEndSaving.call(this, t);
            }
          };
          p.prepareEditButtons = function (t) {
            var i = this.option("editing") ?? {};
            var o = e.prototype.prepareEditButtons.call(this, t);
            if ((i.allowUpdating || i.allowAdding || i.allowDeleting) && this.isBatchEditMode()) {
              o.push(this.prepareButtonItem(t, "save", "saveEditData", 21));
              o.push(this.prepareButtonItem(t, "revert", "cancelEditData", 22));
            }
            return o;
          };
          p._saveEditDataInner = function () {
            var t;
            var n = this._dataController.getVisibleRows()[this.getEditRowIndex()];
            var i = this._getEditColumn();
            var o = i == null ? undefined : i.showEditorAlways;
            if (this.isCellEditMode() && !(n == null ? undefined : n.isNewRow) && o) {
              t = new r.Deferred();
              this.addDeferred(t);
            }
            return e.prototype._saveEditDataInner.call(this).always(t == null ? undefined : t.resolve);
          };
          p._applyChange = function (t, n, i) {
            var o = this.isCellEditMode() && t.row && !t.row.isNewRow;
            var a = t.column.showEditorAlways;
            var r = t.column.setCellValue !== t.column.defaultSetCellValue;
            if (a && !i && o && this.hasEditData() && !this.isEditCell(t.rowIndex, t.columnIndex)) {
              this._focusEditingCell();
              this._updateEditRow(t.row, true, r);
              return;
            } else {
              return e.prototype._applyChange.call(this, t, n, i);
            }
          };
          p._applyChangeCore = function (t, n) {
            var i = t.column.showEditorAlways;
            var o = this.isCellEditMode() && t.row && !t.row.isNewRow;
            if (i && !n) {
              if (o) {
                this._setEditRowKey(t.row.key, true);
                this._setEditColumnNameByIndex(t.columnIndex, true);
                return this.saveEditData();
              }
              if (this.isBatchEditMode()) {
                n = this._needUpdateRow(t.column);
                return e.prototype._applyChangeCore.call(this, t, n);
              }
            }
            return e.prototype._applyChangeCore.call(this, t, n);
          };
          p._processDataItemCore = function (t, n, i, o, a) {
            var r = n.data;
            var s = n.type;
            if (this.isBatchEditMode() && s === g.DATA_EDIT_DATA_REMOVE_TYPE) {
              t.data = (0, u.createObjectWithChanges)(t.data, r);
            }
            e.prototype._processDataItemCore.call(this, t, n, i, o, a);
          };
          p._processRemoveCore = function (t, n, i) {
            if (!this.isBatchEditMode() || i) {
              return e.prototype._processRemoveCore.call(this, t, n, i);
            }
          };
          p._processRemoveIfError = function (t, n) {
            if (!this.isBatchEditMode()) {
              return e.prototype._processRemoveIfError.call(this, t, n);
            }
          };
          p._beforeFocusElementInRow = function (t) {
            e.prototype._beforeFocusElementInRow.call(this, t);
            var n = t >= 0 ? t : 0;
            var i = this.getFirstEditableColumnIndex();
            if (i >= 0) {
              this.editCell(n, i);
            }
          };
          return h;
        }(e);
      }
    },
    views: {
      rowsView: {
        _createTable: function () {
          var e = this.callBase.apply(this, arguments);
          var t = this._editingController;
          if (t.isCellOrBatchEditMode() && this.option("editing.allowUpdating")) {
            c.default.on(e, (0, p.addNamespace)(h.default.name, "dxDataGridRowsView"), `td:not(.${g.EDITOR_CELL_CLASS})`, this.createAction(function () {
              if (t.isEditing()) {
                t.closeEditCell();
              }
            }));
          }
          return e;
        },
        _createRow: function (e) {
          var t = this.callBase.apply(this, arguments);
          if (e) {
            var n = this._editingController;
            var i = !!e.removed;
            if (n.isBatchEditMode() && i) {
              t.addClass(g.ROW_REMOVED);
            }
          }
          return t;
        }
      },
      headerPanel: {
        isVisible: function () {
          var e = this.getController("editing").option("editing");
          return this.callBase() || e && (e.allowUpdating || e.allowDeleting) && e.mode === g.EDIT_MODE_BATCH;
        }
      }
    }
  }
};
exports.editingCellBasedModule = y;