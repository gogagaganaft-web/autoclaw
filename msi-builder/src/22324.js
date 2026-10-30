function i(e) {
  return (i = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function (e) {
    return typeof e;
  } : function (e) {
    if (e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype) {
      return "symbol";
    } else {
      return typeof e;
    }
  })(e);
}
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.editingModule = undefined;
var o = T(require("./20530.js"));
var a = T(require("./73349.js"));
var r = T(require("./73176.js"));
var s = T(require("./68374.js"));
var l = require("./20576.js");
var u = require("./62754.js");
var d = require("./3532.js");
var c = require("./13306.js");
var h = function (e, t) {
  if (!t && e && e.__esModule) {
    return e;
  }
  if (e === null || i(e) !== "object" && typeof e != "function") {
    return {
      default: e
    };
  }
  var n = I(t);
  if (n && n.has(e)) {
    return n.get(e);
  }
  var o = {};
  var a = Object.defineProperty && Object.getOwnPropertyDescriptor;
  for (var r in e) {
    if (r !== "default" && Object.prototype.hasOwnProperty.call(e, r)) {
      var s = a ? Object.getOwnPropertyDescriptor(e, r) : null;
      if (s && (s.get || s.set)) {
        Object.defineProperty(o, r, s);
      } else {
        o[r] = e[r];
      }
    }
  }
  o.default = e;
  if (n) {
    n.set(e, o);
  }
  return o;
}(require("./44899.js"));
var f = require("./95479.js");
var p = require("./48013.js");
var g = require("./35922.js");
var m = require("./60637.js");
var _ = require("./95429.js");
var v = T(require("./55994.js"));
var y = T(require("./93786.js"));
var b = require("./39611.js");
var x = T(require("./28109.js"));
var w = require("./15029.js");
var C = T(require("./15943.js"));
var S = T(require("./60082.js"));
var k = require("./72313.js");
var D = require("./89237.js");
function I(e) {
  if (typeof WeakMap != "function") {
    return null;
  }
  var t = new WeakMap();
  var n = new WeakMap();
  return (I = function (e) {
    if (e) {
      return n;
    } else {
      return t;
    }
  })(e);
}
function T(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
function E() {
  return (E = Object.assign ? Object.assign.bind() : function (e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var i in n) {
        if (Object.prototype.hasOwnProperty.call(n, i)) {
          e[i] = n[i];
        }
      }
    }
    return e;
  }).apply(this, arguments);
}
function O(e) {
  return function (e) {
    if (Array.isArray(e)) {
      return A(e);
    }
  }(e) || function (e) {
    if (typeof Symbol != "undefined" && e[Symbol.iterator] != null || e["@@iterator"] != null) {
      return Array.from(e);
    }
  }(e) || function (e, t) {
    if (!e) {
      return;
    }
    if (typeof e == "string") {
      return A(e, t);
    }
    var n = Object.prototype.toString.call(e).slice(8, -1);
    if (n === "Object" && e.constructor) {
      n = e.constructor.name;
    }
    if (n === "Map" || n === "Set") {
      return Array.from(e);
    }
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) {
      return A(e, t);
    }
  }(e) || function () {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }();
}
function A(e, t) {
  if (t == null || t > e.length) {
    t = e.length;
  }
  for (var n = 0, i = new Array(t); n < t; n++) {
    i[n] = e[n];
  }
  return i;
}
function P(e, t) {
  return (P = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (e, t) {
    e.__proto__ = t;
    return e;
  })(e, t);
}
var M = {
  defaultOptions: function () {
    return {
      editing: {
        mode: "row",
        refreshMode: "full",
        newRowPosition: k.VIEWPORT_TOP_NEW_ROW_POSITION,
        allowAdding: false,
        allowUpdating: false,
        allowDeleting: false,
        useIcons: false,
        selectTextOnEditStart: false,
        confirmDelete: true,
        texts: {
          editRow: x.default.format("dxDataGrid-editingEditRow"),
          saveAllChanges: x.default.format("dxDataGrid-editingSaveAllChanges"),
          saveRowChanges: x.default.format("dxDataGrid-editingSaveRowChanges"),
          cancelAllChanges: x.default.format("dxDataGrid-editingCancelAllChanges"),
          cancelRowChanges: x.default.format("dxDataGrid-editingCancelRowChanges"),
          addRow: x.default.format("dxDataGrid-editingAddRow"),
          deleteRow: x.default.format("dxDataGrid-editingDeleteRow"),
          undeleteRow: x.default.format("dxDataGrid-editingUndeleteRow"),
          confirmDeleteMessage: x.default.format("dxDataGrid-editingConfirmDeleteMessage"),
          confirmDeleteTitle: ""
        },
        form: {
          colCount: 2
        },
        popup: {},
        startEditAction: "click",
        editRowKey: null,
        editColumnName: null,
        changes: []
      },
      useLegacyColumnButtonTemplate: false
    };
  },
  controllers: {
    editing: function (e) {
      var t;
      var n;
      function i() {
        return e.apply(this, arguments) || this;
      }
      n = e;
      (t = i).prototype = Object.create(n.prototype);
      t.prototype.constructor = t;
      P(t, n);
      var d = i.prototype;
      d.init = function () {
        this._columnsController = this.getController("columns");
        this._dataController = this.getController("data");
        this._rowsView = this.getView("rowsView");
        this._lastOperation = null;
        this._changes = [];
        if (this._deferreds) {
          this._deferreds.forEach(function (e) {
            return e.reject("cancel");
          });
        }
        this._deferreds = [];
        if (!this._dataChangedHandler) {
          this._dataChangedHandler = this._handleDataChanged.bind(this);
          this._dataController.changed.add(this._dataChangedHandler);
        }
        if (!this._saveEditorHandler) {
          this.createAction("onInitNewRow", {
            excludeValidators: ["disabled", "readOnly"]
          });
          this.createAction("onRowInserting", {
            excludeValidators: ["disabled", "readOnly"]
          });
          this.createAction("onRowInserted", {
            excludeValidators: ["disabled", "readOnly"]
          });
          this.createAction("onEditingStart", {
            excludeValidators: ["disabled", "readOnly"]
          });
          this.createAction("onRowUpdating", {
            excludeValidators: ["disabled", "readOnly"]
          });
          this.createAction("onRowUpdated", {
            excludeValidators: ["disabled", "readOnly"]
          });
          this.createAction("onRowRemoving", {
            excludeValidators: ["disabled", "readOnly"]
          });
          this.createAction("onRowRemoved", {
            excludeValidators: ["disabled", "readOnly"]
          });
          this.createAction("onSaved", {
            excludeValidators: ["disabled", "readOnly"]
          });
          this.createAction("onSaving", {
            excludeValidators: ["disabled", "readOnly"]
          });
          this.createAction("onEditCanceling", {
            excludeValidators: ["disabled", "readOnly"]
          });
          this.createAction("onEditCanceled", {
            excludeValidators: ["disabled", "readOnly"]
          });
        }
        this._updateEditColumn();
        this._updateEditButtons();
        this._internalState ||= [];
        this.component._optionsByReference[k.EDITING_EDITROWKEY_OPTION_NAME] = true;
        this.component._optionsByReference[k.EDITING_CHANGES_OPTION_NAME] = true;
      };
      d.getEditMode = function () {
        var e = this.option("editing.mode");
        if (k.EDIT_MODES.includes(e)) {
          return e;
        } else {
          return k.EDIT_MODE_ROW;
        }
      };
      d._getDefaultEditorTemplate = function () {
        var e = this;
        return function (t, n) {
          var i = (0, s.default)("<div>").appendTo(t);
          e.getController("editorFactory").createEditor(i, (0, c.extend)({}, n.column, {
            value: n.value,
            setValue: n.setValue,
            row: n.row,
            parentType: "dataRow",
            width: null,
            readOnly: !n.setValue,
            isOnForm: n.isOnForm,
            id: n.id
          }));
        };
      };
      d._getNewRowPosition = function () {
        var e = this.option("editing.newRowPosition");
        if (this.option("scrolling.mode") === "virtual") {
          switch (e) {
            case k.PAGE_TOP_NEW_ROW_POSITION:
              return k.VIEWPORT_TOP_NEW_ROW_POSITION;
            case k.PAGE_BOTTOM_NEW_ROW_POSITION:
              return k.VIEWPORT_BOTTOM_NEW_ROW_POSITION;
            default:
              return e;
          }
        }
        return e;
      };
      d.getChanges = function () {
        return this.option(k.EDITING_CHANGES_OPTION_NAME);
      };
      d.getInsertRowCount = function () {
        return this.option(k.EDITING_CHANGES_OPTION_NAME).filter(function (e) {
          return e.type === "insert";
        }).length;
      };
      d.resetChanges = function () {
        var e = this.getChanges();
        if (e == null ? undefined : e.length) {
          this._silentOption(k.EDITING_CHANGES_OPTION_NAME, []);
        }
      };
      d._getInternalData = function (e) {
        return this._internalState.filter(function (t) {
          return (0, l.equalByValue)(t.key, e);
        })[0];
      };
      d._addInternalData = function (e) {
        var t = this._getInternalData(e.key);
        if (t) {
          return (0, c.extend)(t, e);
        } else {
          this._internalState.push(e);
          return e;
        }
      };
      d._getOldData = function (e) {
        return this._getInternalData(e)?.oldData;
      };
      d.getUpdatedData = function (e) {
        var t = this._dataController.keyOf(e);
        var n = this.getChanges();
        var i = S.default.getIndexByKey(t, n);
        if (n[i]) {
          return (0, m.createObjectWithChanges)(e, n[i].data);
        } else {
          return e;
        }
      };
      d.getInsertedData = function () {
        return this.getChanges().filter(function (e) {
          return e.data && e.type === k.DATA_EDIT_DATA_INSERT_TYPE;
        }).map(function (e) {
          return e.data;
        });
      };
      d.getRemovedData = function () {
        var e = this;
        return this.getChanges().filter(function (t) {
          return e._getOldData(t.key) && t.type === k.DATA_EDIT_DATA_REMOVE_TYPE;
        }).map(function (t) {
          return e._getOldData(t.key);
        });
      };
      d._fireDataErrorOccurred = function (e) {
        if (e !== "cancel") {
          var t = this.getPopupContent();
          this._dataController.dataErrorOccurred.fire(e, t);
        }
      };
      d._needToCloseEditableCell = function (e) {};
      d._closeEditItem = function (e) {};
      d._handleDataChanged = function (e) {};
      d._isDefaultButtonVisible = function (e, t) {
        var n = true;
        switch (e.name) {
          case "delete":
            n = this.allowDeleting(t);
            break;
          case "undelete":
            n = false;
        }
        return n;
      };
      d._isButtonVisible = function (e, t) {
        var n = e.visible;
        if ((0, g.isDefined)(n)) {
          if ((0, g.isFunction)(n)) {
            return n.call(e, {
              component: t.component,
              row: t.row,
              column: t.column
            });
          } else {
            return n;
          }
        } else {
          return this._isDefaultButtonVisible(e, t);
        }
      };
      d._isButtonDisabled = function (e, t) {
        var n = e.disabled;
        if ((0, g.isFunction)(n)) {
          return n.call(e, {
            component: t.component,
            row: t.row,
            column: t.column
          });
        } else {
          return !!n;
        }
      };
      d._getButtonConfig = function (e, t) {
        var n = this;
        var i = (0, g.isObject)(e) ? e : {};
        var o = (0, D.getButtonName)(e);
        var a = (0, D.getEditingTexts)(t);
        var r = k.METHOD_NAMES[o];
        var s = this.option("editing");
        var l = k.ACTION_OPTION_NAMES[o];
        var u = !l || s[l];
        return (0, c.extend)({
          name: o,
          text: a[o],
          cssClass: k.EDIT_LINK_CLASS[o]
        }, {
          onClick: r && function (e) {
            var i = e.event;
            i.stopPropagation();
            i.preventDefault();
            setTimeout(function () {
              if (t.row && u && n[r]) {
                n[r](t.row.rowIndex);
              }
            });
          }
        }, i);
      };
      d._getEditingButtons = function (e) {
        var t;
        var n = this;
        var i = !!e.column.buttons;
        var o = (e.column.buttons || []).slice();
        if (i) {
          if ((t = (0, D.getButtonIndex)(o, "edit")) >= 0) {
            if ((0, D.getButtonIndex)(o, "save") < 0) {
              o.splice(t + 1, 0, "save");
            }
            if ((0, D.getButtonIndex)(o, "cancel") < 0) {
              o.splice((0, D.getButtonIndex)(o, "save") + 1, 0, "cancel");
            }
          }
          if ((t = (0, D.getButtonIndex)(o, "delete")) >= 0 && (0, D.getButtonIndex)(o, "undelete") < 0) {
            o.splice(t + 1, 0, "undelete");
          }
        } else {
          o = k.BUTTON_NAMES.slice();
        }
        return o.map(function (t) {
          return n._getButtonConfig(t, e);
        });
      };
      d._renderEditingButtons = function (e, t, n, i) {
        var o = this;
        t.forEach(function (t) {
          if (o._isButtonVisible(t, n)) {
            o._createButton(e, t, n, i);
          }
        });
      };
      d._getEditCommandCellTemplate = function () {
        var e = this;
        return function (t, n, i) {
          var o = (0, s.default)(t);
          if (n.rowType === "data") {
            var a = e._getEditingButtons(n);
            e._renderEditingButtons(o, a, n, i);
            if (n.watch) {
              n.watch(function () {
                return a.map(function (t) {
                  return {
                    visible: e._isButtonVisible(t, n),
                    disabled: e._isButtonDisabled(t, n)
                  };
                });
              }, function () {
                o.empty();
                e._renderEditingButtons(o, a, n);
              });
            }
          } else {
            S.default.setEmptyText(o);
          }
        };
      };
      d.isRowBasedEditMode = function () {
        var e = this.getEditMode();
        return k.ROW_BASED_MODES.includes(e);
      };
      d.getFirstEditableColumnIndex = function () {
        var e;
        var t = this.getController("columns").getVisibleColumns();
        (0, f.each)(t, function (t, n) {
          if (n.allowEditing) {
            e = t;
            return false;
          }
        });
        return e;
      };
      d.getFirstEditableCellInRow = function (e) {
        var t = this.getView("rowsView");
        var n = this.getFirstEditableColumnIndex();
        if (t == null) {
          return undefined;
        } else {
          return t._getCellElement(e || 0, n);
        }
      };
      d.getFocusedCellInRow = function (e) {
        return this.getFirstEditableCellInRow(e);
      };
      d.getIndexByKey = function (e, t) {
        return S.default.getIndexByKey(e, t);
      };
      d.hasChanges = function (e) {
        for (var t = this.getChanges(), n = false, i = 0; i < (t == null ? undefined : t.length); i++) {
          if (t[i].type && (!(0, g.isDefined)(e) || this._dataController.getRowIndexByKey(t[i].key) === e)) {
            n = true;
            break;
          }
        }
        return n;
      };
      d.dispose = function () {
        e.prototype.dispose.call(this);
        clearTimeout(this._inputFocusTimeoutID);
        v.default.off(a.default.getDocument(), y.default.up, this._pointerUpEditorHandler);
        v.default.off(a.default.getDocument(), y.default.down, this._pointerDownEditorHandler);
        v.default.off(a.default.getDocument(), _.name, this._saveEditorHandler);
      };
      d._silentOption = function (t, n) {
        if (t === "editing.changes") {
          this._changes = (0, p.deepExtendArraySafe)([], n);
        }
        e.prototype._silentOption.call(this, t, n);
      };
      d.optionChanged = function (t) {
        if (t.name === "editing") {
          var n = t.fullName;
          if (n === k.EDITING_EDITROWKEY_OPTION_NAME) {
            this._handleEditRowKeyChange(t);
          } else if (n === k.EDITING_CHANGES_OPTION_NAME) {
            if (!(0, l.equalByValue)(t.value, this._changes, {
              maxDepth: 4
            })) {
              this._changes = (0, p.deepExtendArraySafe)([], t.value);
              this._handleChangesChange(t);
            }
          } else if (!t.handled) {
            this._columnsController.reinit();
            this.init();
            this.resetChanges();
            this._resetEditColumnName();
            this._resetEditRowKey();
          }
          t.handled = true;
        } else {
          e.prototype.optionChanged.call(this, t);
        }
      };
      d._handleEditRowKeyChange = function (e) {
        var t = this._dataController.getRowIndexByKey(e.value);
        var n = this._getEditRowIndexCorrection();
        var i = this._dataController.getRowIndexByKey(e.previousValue) + n;
        if ((0, g.isDefined)(e.value)) {
          if (e.value !== e.previousValue) {
            this._editRowFromOptionChanged(t, i);
          }
        } else {
          this.cancelEditData();
        }
      };
      d._handleChangesChange = function (e) {
        var t = this;
        var n = this._dataController;
        var i = e.value;
        if (e.value.length || e.previousValue.length) {
          i.forEach(function (e) {
            var i;
            if (e.type === "insert") {
              t._addInsertInfo(e);
            } else {
              var o = n.getCachedStoreData() || ((i = n.items()) === null || i === undefined ? undefined : i.map(function (e) {
                return e.data;
              }));
              var a = S.default.getIndexByKey(e.key, o, n.key());
              t._addInternalData({
                key: e.key,
                oldData: o[a]
              });
            }
          });
          n.updateItems({
            repaintChangesOnly: true,
            isLiveUpdate: false,
            isOptionChanged: true
          });
        }
      };
      d.publicMethods = function () {
        return ["addRow", "deleteRow", "undeleteRow", "editRow", "saveEditData", "cancelEditData", "hasEditData"];
      };
      d.refresh = function () {
        if ((0, g.isDefined)(this._pageIndex)) {
          this._refreshCore.apply(this, arguments);
        }
      };
      d._refreshCore = function (e) {};
      d.isEditing = function () {
        return (0, g.isDefined)(this.option(k.EDITING_EDITROWKEY_OPTION_NAME));
      };
      d.isEditRow = function (e) {
        return false;
      };
      d._setEditRowKey = function (e, t) {
        if (t) {
          this._silentOption(k.EDITING_EDITROWKEY_OPTION_NAME, e);
        } else {
          this.option(k.EDITING_EDITROWKEY_OPTION_NAME, e);
        }
        if (this._refocusEditCell) {
          this._refocusEditCell = false;
          this._focusEditingCell();
        }
      };
      d._setEditRowKeyByIndex = function (e, t) {
        var n = this._dataController.getKeyByRowIndex(e);
        if (n !== undefined) {
          this._setEditRowKey(n, t);
        } else {
          this._dataController.fireError("E1043");
        }
      };
      d.getEditRowIndex = function () {
        return this._getVisibleEditRowIndex();
      };
      d.getEditFormRowIndex = function () {
        return -1;
      };
      d.isEditRowByIndex = function (e) {
        var t = this._dataController.getKeyByRowIndex(e);
        var n = (0, g.isDefined)(t) && (0, l.equalByValue)(this.option(k.EDITING_EDITROWKEY_OPTION_NAME), t);
        if (n) {
          return this._getVisibleEditRowIndex() === e;
        } else {
          return n;
        }
      };
      d.isEditCell = function (e, t) {
        return this.isEditRowByIndex(e) && this._getVisibleEditColumnIndex() === t;
      };
      d.getPopupContent = function () {};
      d._isProcessedItem = function (e) {
        return false;
      };
      d._getInsertRowIndex = function (e, t, n) {
        var i = this;
        var o = -1;
        var a = this._dataController;
        var r = this._getInsertAfterOrBeforeKey(t);
        if ((0, g.isDefined)(r) || e.length !== 0) {
          if ((0, g.isDefined)(r)) {
            e.some(function (s, u) {
              var d = n || i._isProcessedItem(s);
              if ((0, g.isObject)(s)) {
                if (d || (0, g.isDefined)(s[k.INSERT_INDEX])) {
                  if ((0, l.equalByValue)(s.key, r)) {
                    o = u;
                  }
                } else if ((0, l.equalByValue)(a.keyOf(s), r)) {
                  o = u;
                }
              }
              if (o >= 0) {
                var c = e[o + 1];
                if (c && (c.rowType === "detail" || c.rowType === "detailAdaptive") && (0, g.isDefined)(t.insertAfterKey)) {
                  return;
                }
                if ((0, g.isDefined)(t.insertAfterKey)) {
                  o += 1;
                }
                return true;
              }
            });
          }
        } else {
          o = 0;
        }
        return o;
      };
      d._generateNewItem = function (e) {
        var n = {
          key: e
        };
        var i = this._getInternalData(e)?.insertInfo;
        if (i == null ? undefined : i[k.INSERT_INDEX]) {
          n[k.INSERT_INDEX] = i[k.INSERT_INDEX];
        }
        return n;
      };
      d._getLoadedRowIndex = function (e, t, n) {
        var i = this._getInsertRowIndex(e, t, n);
        var o = this._dataController;
        if (i < 0) {
          var a = this._getNewRowPosition();
          var r = o.pageIndex();
          var s = this._getInsertAfterOrBeforeKey(t);
          if (a === k.LAST_NEW_ROW_POSITION || r !== 0 || (0, g.isDefined)(s)) {
            if (a === k.LAST_NEW_ROW_POSITION && o.isLastPageLoaded()) {
              i = e.length;
            }
          } else {
            i = 0;
          }
        }
        return i;
      };
      d.processItems = function (e, t) {
        var n = this;
        var i = t.changeType;
        this.update(i);
        this.getChanges().forEach(function (t) {
          if (t.type === k.DATA_EDIT_DATA_INSERT_TYPE) {
            var o = t.key;
            var a = n._getInternalData(o)?.insertInfo;
            if (!(0, g.isDefined)(o) || !(0, g.isDefined)(a)) {
              o = (a = n._addInsertInfo(t)).key;
            }
            var r = n._getLoadedRowIndex(e, t);
            var s = n._generateNewItem(o);
            if (r >= 0) {
              e.splice(r, 0, s);
            }
          }
        });
        return e;
      };
      d.processDataItem = function (e, t, n) {
        var i = t.visibleColumns;
        var o = e.data[k.INSERT_INDEX] ? e.data.key : e.key;
        var a = this.getChanges();
        var r = S.default.getIndexByKey(o, a);
        e.isEditing = false;
        if (r >= 0) {
          this._processDataItemCore(e, a[r], o, i, n);
        }
      };
      d._processDataItemCore = function (e, t, n, i, o) {
        var a = t.data;
        switch (t.type) {
          case k.DATA_EDIT_DATA_INSERT_TYPE:
            e.isNewRow = true;
            e.key = n;
            e.data = a;
            break;
          case k.DATA_EDIT_DATA_UPDATE_TYPE:
            e.modified = true;
            e.oldData = e.data;
            e.data = (0, m.createObjectWithChanges)(e.data, a);
            e.modifiedValues = o(a, i, true);
            break;
          case k.DATA_EDIT_DATA_REMOVE_TYPE:
            e.removed = true;
        }
      };
      d._initNewRow = function (e) {
        var t = this;
        this.executeAction("onInitNewRow", e);
        if (e.promise) {
          var n = new u.Deferred();
          (0, u.when)((0, u.fromPromise)(e.promise)).done(n.resolve).fail((0, D.createFailureHandler)(n)).fail(function (e) {
            return t._fireDataErrorOccurred(e);
          });
          return n;
        }
      };
      d._createInsertInfo = function () {
        var e = {};
        e[k.INSERT_INDEX] = this._getInsertIndex();
        return e;
      };
      d._addInsertInfo = function (e, t) {
        var i;
        var o = e.key;
        if (!(0, g.isDefined)(o)) {
          o = String(new r.default());
          e.key = o;
        }
        i = this._getInternalData(o)?.insertInfo;
        if (!(0, g.isDefined)(i)) {
          var a = this._getInsertAfterOrBeforeKey(e);
          i = this._createInsertInfo();
          if (!(0, g.isDefined)(a)) {
            this._setInsertAfterOrBeforeKey(e, t);
          }
        }
        this._addInternalData({
          insertInfo: i,
          key: o
        });
        return {
          insertInfo: i,
          key: o
        };
      };
      d._setInsertAfterOrBeforeKey = function (e, t) {
        var n = this._dataController;
        var i = n.items(true);
        var o = this.getView("rowsView");
        var a = this._getNewRowPosition();
        switch (a) {
          case k.FIRST_NEW_ROW_POSITION:
          case k.LAST_NEW_ROW_POSITION:
            break;
          case k.PAGE_TOP_NEW_ROW_POSITION:
          case k.PAGE_BOTTOM_NEW_ROW_POSITION:
            if (i.length) {
              var r = a === k.PAGE_TOP_NEW_ROW_POSITION ? 0 : i.length - 1;
              e[r === 0 ? "insertBeforeKey" : "insertAfterKey"] = i[r].key;
            }
            break;
          default:
            var s = a === k.VIEWPORT_BOTTOM_NEW_ROW_POSITION ? o == null ? undefined : o.getBottomVisibleItemIndex() : o == null ? undefined : o.getTopVisibleItemIndex();
            var l = n.getVisibleRows()[s];
            if (l && (!l.isEditing && l.rowType === "detail" || l.rowType === "detailAdaptive")) {
              s++;
            }
            var u = n.getKeyByRowIndex(s);
            if ((0, g.isDefined)(u)) {
              e.insertBeforeKey = u;
            }
        }
      };
      d._getInsertIndex = function () {
        var e = this;
        var t = 0;
        this.getChanges().forEach(function (n) {
          var o = e._getInternalData(n.key)?.insertInfo;
          if ((0, g.isDefined)(o) && n.type === k.DATA_EDIT_DATA_INSERT_TYPE && o[k.INSERT_INDEX] > t) {
            t = o[k.INSERT_INDEX];
          }
        });
        return t + 1;
      };
      d._getInsertAfterOrBeforeKey = function (e) {
        return e.insertAfterKey ?? e.insertBeforeKey;
      };
      d._getPageIndexToInsertRow = function () {
        var e = this._getNewRowPosition();
        var t = this._dataController;
        var n = t.pageIndex();
        var i = t.pageCount() - 1;
        if (e === k.FIRST_NEW_ROW_POSITION && n !== 0) {
          return 0;
        } else if (e === k.LAST_NEW_ROW_POSITION && n !== i) {
          return i;
        } else {
          return -1;
        }
      };
      d.addRow = function (e) {
        var t = this._dataController;
        if (t.store()) {
          return this._addRow(e);
        } else {
          t.fireError("E1052", this.component.NAME);
          return new u.Deferred().reject();
        }
      };
      d._addRow = function (e) {
        var t = this;
        var n = this._dataController.store();
        var i = n && n.key();
        var o = {
          data: {}
        };
        var a = this._getVisibleEditRowIndex();
        var s = new u.Deferred();
        this.refresh({
          allowCancelEditing: true
        });
        if (this._allowRowAdding()) {
          if (!i) {
            o.data.__KEY__ = String(new r.default());
          }
          (0, u.when)(this._initNewRow(o, e)).done(function () {
            if (t._allowRowAdding()) {
              (0, u.when)(t._addRowCore(o.data, e, a)).done(s.resolve).fail(s.reject);
            } else {
              s.reject("cancel");
            }
          }).fail(s.reject);
          return s.promise();
        } else {
          (0, u.when)(this._navigateToNewRow(a)).done(s.resolve).fail(s.reject);
          return s.promise();
        }
      };
      d._allowRowAdding = function (e) {
        return !(this._getInsertIndex() > 1);
      };
      d._addRowCore = function (e, t, n) {
        var i = {
          data: e,
          type: k.DATA_EDIT_DATA_INSERT_TYPE
        };
        var o = this._getVisibleEditRowIndex();
        var a = this._addInsertInfo(i, t).key;
        this._setEditRowKey(a, true);
        this._addChange(i);
        return this._navigateToNewRow(n, i, o);
      };
      d._navigateToNewRow = function (e, t, n) {
        var i = this;
        var o = new u.Deferred();
        var a = this._dataController;
        var r = this.getController("focus");
        n = n ?? -1;
        if (!(t = t ?? this.getChanges().filter(function (e) {
          return e.type === k.DATA_EDIT_DATA_INSERT_TYPE;
        })[0])) {
          return o.reject("cancel").promise();
        }
        var s = this._getPageIndexToInsertRow();
        var l = this._getLoadedRowIndex(a.items(), t, true);
        function d(e) {
          (0, u.when)(r == null ? undefined : r.navigateToRow(e)).done(function () {
            l = a.getRowIndexByKey(t.key);
            o.resolve();
          });
        }
        var c = this._getInsertAfterOrBeforeKey(t);
        if (s >= 0) {
          a.pageIndex(s).done(function () {
            d(t.key);
          }).fail(o.reject);
        } else if (l < 0 && (0, g.isDefined)(c)) {
          d(c);
        } else {
          a.updateItems({
            changeType: "update",
            rowIndices: [e, n, l]
          });
          if ((l = a.getRowIndexByKey(t.key)) < 0) {
            d(t.key);
          } else {
            o.resolve();
          }
        }
        o.done(function () {
          var e;
          if ((e = i._rowsView) !== null && e !== undefined) {
            e.waitAsyncTemplates(true).done(function () {
              i._showAddedRow(l);
              i._afterInsertRow(t.key);
            });
          }
        });
        return o.promise();
      };
      d._showAddedRow = function (e) {
        this._focusFirstEditableCellInRow(e);
      };
      d._beforeFocusElementInRow = function (e) {};
      d._focusFirstEditableCellInRow = function (e) {
        var t = this;
        var n = this._dataController;
        var i = this.getController("keyboardNavigation");
        var o = n.getKeyByRowIndex(e);
        var a = this.getFirstEditableCellInRow(e);
        if (i != null) {
          i.focus(a);
        }
        this.option("focusedRowKey", o);
        this._editCellInProgress = true;
        this._delayedInputFocus(a, function () {
          e = n.getRowIndexByKey(o);
          t._editCellInProgress = false;
          t._beforeFocusElementInRow(e);
        });
      };
      d._isEditingStart = function (e) {
        this.executeAction("onEditingStart", e);
        return e.cancel;
      };
      d._beforeUpdateItems = function () {};
      d._getVisibleEditColumnIndex = function () {
        var e = this.option(k.EDITING_EDITCOLUMNNAME_OPTION_NAME);
        if ((0, g.isDefined)(e)) {
          return this._columnsController.getVisibleColumnIndex(e);
        } else {
          return -1;
        }
      };
      d._setEditColumnNameByIndex = function (e, t) {
        var i = this._columnsController.getVisibleColumns();
        this._setEditColumnName(i[e]?.name, t);
      };
      d._setEditColumnName = function (e, t) {
        if (t) {
          this._silentOption(k.EDITING_EDITCOLUMNNAME_OPTION_NAME, e);
        } else {
          this.option(k.EDITING_EDITCOLUMNNAME_OPTION_NAME, e);
        }
      };
      d._resetEditColumnName = function () {
        this._setEditColumnName(null, true);
      };
      d._getEditColumn = function () {
        var e = this.option(k.EDITING_EDITCOLUMNNAME_OPTION_NAME);
        return this._getColumnByName(e);
      };
      d._getColumnByName = function (e) {
        var t;
        var n = this._columnsController.getVisibleColumns();
        if ((0, g.isDefined)(e)) {
          n.some(function (n) {
            if (n.name === e) {
              t = n;
              return true;
            }
          });
        }
        return t;
      };
      d._getVisibleEditRowIndex = function (e) {
        var t = this._dataController;
        var n = this.option(k.EDITING_EDITROWKEY_OPTION_NAME);
        var i = t.getRowIndexByKey(n);
        if (i === -1) {
          return i;
        } else {
          return i + this._getEditRowIndexCorrection(e);
        }
      };
      d._getEditRowIndexCorrection = function (e) {
        var t = e ? this._getColumnByName(e) : this._getEditColumn();
        if ((t == null ? undefined : t.visibleWidth) === "adaptiveHidden") {
          return 1;
        } else {
          return 0;
        }
      };
      d._resetEditRowKey = function () {
        this._refocusEditCell = false;
        this._setEditRowKey(null, true);
      };
      d._resetEditIndices = function () {
        this._resetEditColumnName();
        this._resetEditRowKey();
      };
      d.editRow = function (e) {
        var n = this._dataController;
        var i = n.items()[e];
        var o = {
          data: i && i.data,
          cancel: false
        };
        var a = this._getVisibleEditRowIndex();
        if (i) {
          return e === a || void (i.key !== undefined ? (i.isNewRow || (o.key = i.key), this._isEditingStart(o) || (this.resetChanges(), this.init(), this._resetEditColumnName(), this._pageIndex = n.pageIndex(), this._addInternalData({
            key: i.key,
            oldData: i.oldData ?? i.data
          }), this._setEditRowKey(i.key))) : this._dataController.fireError("E1043"));
        }
      };
      d._editRowFromOptionChanged = function (e, t) {
        var n = [t, e];
        this._beforeUpdateItems(n, e, t);
        this._editRowFromOptionChangedCore(n, e);
      };
      d._editRowFromOptionChangedCore = function (e, t, n) {
        this._needFocusEditor = true;
        this._dataController.updateItems({
          changeType: "update",
          rowIndices: e,
          cancel: n
        });
      };
      d._focusEditorIfNeed = function () {};
      d._showEditPopup = function (e, t) {};
      d._repaintEditPopup = function () {};
      d._getEditPopupHiddenHandler = function () {
        var e = this;
        return function (t) {
          if (e.isEditing()) {
            e.cancelEditData();
          }
        };
      };
      d._getPopupEditFormTemplate = function (e) {};
      d._getSaveButtonConfig = function () {
        return {
          text: this.option("editing.texts.saveRowChanges"),
          onClick: this.saveEditData.bind(this)
        };
      };
      d._getCancelButtonConfig = function () {
        return {
          text: this.option("editing.texts.cancelRowChanges"),
          onClick: this.cancelEditData.bind(this)
        };
      };
      d._removeInternalData = function (e) {
        var t = this._getInternalData(e);
        var n = this._internalState.indexOf(t);
        if (n > -1) {
          this._internalState.splice(n, 1);
        }
      };
      d._updateInsertAfterOrBeforeKeys = function (e, t) {
        var n = this;
        var i = e[t];
        e.forEach(function (e) {
          var t = n._getInsertAfterOrBeforeKey(e);
          if ((0, l.equalByValue)(t, i.key)) {
            e[(0, g.isDefined)(e.insertAfterKey) ? "insertAfterKey" : "insertBeforeKey"] = n._getInsertAfterOrBeforeKey(i);
          }
        });
      };
      d._removeChange = function (e) {
        if (e >= 0) {
          var t = O(this.getChanges());
          var n = t[e].key;
          this._removeInternalData(n);
          this._updateInsertAfterOrBeforeKeys(t, e);
          t.splice(e, 1);
          this._silentOption(k.EDITING_CHANGES_OPTION_NAME, t);
          if ((0, l.equalByValue)(this.option(k.EDITING_EDITROWKEY_OPTION_NAME), n)) {
            this._resetEditIndices();
          }
        }
      };
      d.executeOperation = function (e, t) {
        var n = this;
        if (this._lastOperation) {
          this._lastOperation.reject();
        }
        this._lastOperation = e;
        this.waitForDeferredOperations().done(function () {
          if (e.state() !== "rejected") {
            t();
            n._lastOperation = null;
          }
        }).fail(function () {
          e.reject();
          n._lastOperation = null;
        });
      };
      d.waitForDeferredOperations = function () {
        return u.when.apply(undefined, O(this._deferreds));
      };
      d._processCanceledEditingCell = function () {};
      d._repaintEditCell = function (e, t, n) {
        this._needFocusEditor = true;
        if (!e || !e.showEditorAlways || t && !t.showEditorAlways) {
          this._editCellInProgress = true;
          this.getController("editorFactory").loseFocus();
          this._dataController.updateItems({
            changeType: "update",
            rowIndices: [n, this._getVisibleEditRowIndex()]
          });
        } else if (e !== t) {
          this._dataController.updateItems({
            changeType: "update",
            rowIndices: []
          });
        }
      };
      d._delayedInputFocus = function (e, t, n) {
        var i = this;
        function a() {
          if (t) {
            t();
          }
          if (e) {
            var n = e.find(k.FOCUSABLE_ELEMENT_SELECTOR).first();
            S.default.focusAndSelectElement(i, n);
          }
          i._beforeFocusCallback = null;
        }
        if (o.default.real().ios || o.default.real().android) {
          a();
        } else {
          if (this._beforeFocusCallback) {
            this._beforeFocusCallback();
          }
          clearTimeout(this._inputFocusTimeoutID);
          if (n) {
            this._beforeFocusCallback = t;
          }
          this._inputFocusTimeoutID = setTimeout(a);
        }
      };
      d._focusEditingCell = function (e, t, n) {
        var i = this.getView("rowsView");
        var o = this._getVisibleEditColumnIndex();
        if (t = t || i && i._getCellElement(this._getVisibleEditRowIndex(), o)) {
          this._delayedInputFocus(t, e, n);
        }
      };
      d.deleteRow = function (e) {
        this._checkAndDeleteRow(e);
      };
      d._checkAndDeleteRow = function (e) {
        var t = this;
        var n = this.option("editing");
        var i = n == null ? undefined : n.texts;
        var o = n == null ? undefined : n.confirmDelete;
        var a = i == null ? undefined : i.confirmDeleteMessage;
        var r = this._dataController.items()[e];
        var s = !this.isEditing() || r.isNewRow;
        if (r && s) {
          if (o && a) {
            var l = i && i.confirmDeleteTitle;
            var u = (0, g.isDefined)(l) && l.length > 0;
            (0, w.confirm)(a, l, u).done(function (n) {
              if (n) {
                t._deleteRowCore(e);
              }
            });
          } else {
            this._deleteRowCore(e);
          }
        }
      };
      d._deleteRowCore = function (e) {
        var t = this._dataController.items()[e];
        var n = t && t.key;
        var i = this._getVisibleEditRowIndex();
        this.refresh();
        var o = this.getChanges();
        var a = S.default.getIndexByKey(n, o);
        if (a >= 0) {
          if (o[a].type === k.DATA_EDIT_DATA_INSERT_TYPE) {
            this._removeChange(a);
          } else {
            this._addChange({
              key: n,
              type: k.DATA_EDIT_DATA_REMOVE_TYPE
            });
          }
        } else {
          this._addChange({
            key: n,
            oldData: t.data,
            type: k.DATA_EDIT_DATA_REMOVE_TYPE
          });
        }
        return this._afterDeleteRow(e, i);
      };
      d._afterDeleteRow = function (e, t) {
        return this.saveEditData();
      };
      d.undeleteRow = function (e) {
        var t = this._dataController;
        var n = t.items()[e];
        var i = this._getVisibleEditRowIndex();
        var o = n && n.key;
        var a = this.getChanges();
        if (n) {
          var r = S.default.getIndexByKey(o, a);
          if (r >= 0) {
            var s = a[r].data;
            if ((0, g.isEmptyObject)(s)) {
              this._removeChange(r);
            } else {
              this._addChange({
                key: o,
                type: k.DATA_EDIT_DATA_UPDATE_TYPE
              });
            }
            t.updateItems({
              changeType: "update",
              rowIndices: [i, e]
            });
          }
        }
      };
      d._fireOnSaving = function () {
        var e = this;
        var t = {
          cancel: false,
          promise: null,
          changes: O(this.getChanges())
        };
        this.executeAction("onSaving", t);
        var n = new u.Deferred();
        (0, u.when)((0, u.fromPromise)(t.promise)).done(function () {
          n.resolve(t);
        }).fail(function (t) {
          (0, D.createFailureHandler)(n);
          e._fireDataErrorOccurred(t);
          n.resolve({
            cancel: true
          });
        });
        return n;
      };
      d._executeEditingAction = function (e, t, n) {
        if (this.component._disposed) {
          return null;
        }
        var i = new u.Deferred();
        this.executeAction(e, t);
        (0, u.when)((0, u.fromPromise)(t.cancel)).done(function (e) {
          if (e) {
            setTimeout(function () {
              i.resolve("cancel");
            });
          } else {
            n(t).done(i.resolve).fail((0, D.createFailureHandler)(i));
          }
        }).fail((0, D.createFailureHandler)(i));
        return i;
      };
      d._processChanges = function (e, t, n, i) {
        var o = this;
        var a = this._dataController.store();
        (0, f.each)(i, function (r, s) {
          var l;
          var d;
          var c = o._getOldData(s.key);
          var h = s.data;
          var f = s.type;
          var p = E({}, s);
          if (!o._beforeSaveEditData(s, r)) {
            switch (f) {
              case k.DATA_EDIT_DATA_REMOVE_TYPE:
                d = {
                  data: c,
                  key: s.key,
                  cancel: false
                };
                l = o._executeEditingAction("onRowRemoving", d, function () {
                  return a.remove(s.key).done(function (e) {
                    n.push({
                      type: "remove",
                      key: e
                    });
                  });
                });
                break;
              case k.DATA_EDIT_DATA_INSERT_TYPE:
                d = {
                  data: h,
                  cancel: false
                };
                l = o._executeEditingAction("onRowInserting", d, function () {
                  return a.insert(d.data).done(function (e, t) {
                    if ((0, g.isDefined)(t)) {
                      p.key = t;
                    }
                    if (e && (0, g.isObject)(e) && e !== d.data) {
                      p.data = e;
                    }
                    n.push({
                      type: "insert",
                      data: e,
                      index: 0
                    });
                  });
                });
                break;
              case k.DATA_EDIT_DATA_UPDATE_TYPE:
                d = {
                  newData: h,
                  oldData: c,
                  key: s.key,
                  cancel: false
                };
                l = o._executeEditingAction("onRowUpdating", d, function () {
                  return a.update(s.key, d.newData).done(function (e, t) {
                    if (e && (0, g.isObject)(e) && e !== d.newData) {
                      p.data = e;
                    }
                    n.push({
                      type: "update",
                      key: t,
                      data: e
                    });
                  });
                });
            }
            i[r] = p;
            if (l) {
              var m = new u.Deferred();
              l.always(function (e) {
                t.push({
                  key: s.key,
                  result: e
                });
              }).always(m.resolve);
              e.push(m.promise());
            }
          }
        });
      };
      d._processRemoveIfError = function (e, t) {
        var n = e[t];
        if ((n == null ? undefined : n.type) === k.DATA_EDIT_DATA_REMOVE_TYPE && t >= 0) {
          e.splice(t, 1);
        }
        return true;
      };
      d._processRemove = function (e, t, n) {
        var i = e[t];
        if (!n || !i || i.type === k.DATA_EDIT_DATA_REMOVE_TYPE) {
          return this._processRemoveCore(e, t, !n || !i);
        }
      };
      d._processRemoveCore = function (e, t, n) {
        if (t >= 0) {
          e.splice(t, 1);
        }
        return true;
      };
      d._processSaveEditDataResult = function (e) {
        var t = false;
        var n = O(this.getChanges());
        var i = n.length;
        for (var o = 0; o < e.length; o++) {
          var a = e[o].result;
          var r = a === "cancel";
          var s = S.default.getIndexByKey(e[o].key, n);
          var l = n[s];
          if (a && a instanceof Error) {
            if (l) {
              this._addInternalData({
                key: l.key,
                error: a
              });
            }
            this._fireDataErrorOccurred(a);
            if (this._processRemoveIfError(n, s)) {
              break;
            }
          } else if (this._processRemove(n, s, r)) {
            t = !r;
          }
        }
        if (n.length < i) {
          this._silentOption(k.EDITING_CHANGES_OPTION_NAME, n);
        }
        return t;
      };
      d._fireSaveEditDataEvents = function (e) {
        var t = this;
        (0, f.each)(e, function (e, n) {
          var i = n.data;
          var o = n.key;
          var a = n.type;
          var r = t._addInternalData({
            key: o
          });
          var s = {
            key: o,
            data: i
          };
          if (r.error) {
            s.error = r.error;
          }
          switch (a) {
            case k.DATA_EDIT_DATA_REMOVE_TYPE:
              t.executeAction("onRowRemoved", (0, c.extend)({}, s, {
                data: r.oldData
              }));
              break;
            case k.DATA_EDIT_DATA_INSERT_TYPE:
              t.executeAction("onRowInserted", s);
              break;
            case k.DATA_EDIT_DATA_UPDATE_TYPE:
              t.executeAction("onRowUpdated", s);
          }
        });
        this.executeAction("onSaved", {
          changes: e
        });
      };
      d.saveEditData = function () {
        var e = this;
        var t = new u.Deferred();
        this.waitForDeferredOperations().done(function () {
          if (e.isSaving()) {
            e._resolveAfterSave(t);
          } else {
            (0, u.when)(e._beforeSaveEditData()).done(function (n) {
              if (n) {
                e._resolveAfterSave(t, {
                  cancel: n
                });
              } else {
                e._saving = true;
                e._saveEditDataInner().always(function () {
                  e._saving = false;
                  if (e._refocusEditCell) {
                    e._focusEditingCell();
                  }
                }).done(t.resolve).fail(t.reject);
              }
            }).fail(t.reject);
          }
        }).fail(t.reject);
        return t.promise();
      };
      d._resolveAfterSave = function (e, t = {}) {
        var n = t.cancel;
        var i = t.error;
        (0, u.when)(this._afterSaveEditData(n)).done(function () {
          e.resolve(i);
        }).fail(e.reject);
      };
      d._saveEditDataInner = function () {
        var e = this;
        var t = new u.Deferred();
        var n = [];
        var i = [];
        var o = [];
        var a = this._dataController.dataSource();
        (0, u.when)(this._fireOnSaving()).done(function (r) {
          var s = r.cancel;
          var l = r.changes;
          if (s) {
            return t.resolve().promise();
          } else {
            e._processChanges(i, n, o, l);
            if (i.length) {
              e._refocusEditCell = true;
              if (a != null) {
                a.beginLoading();
              }
              u.when.apply(undefined, i).done(function () {
                if (e._processSaveEditDataResult(n)) {
                  e._endSaving(o, l, t);
                } else {
                  if (a != null) {
                    a.endLoading();
                  }
                  t.resolve();
                }
              }).fail(function (e) {
                if (a != null) {
                  a.endLoading();
                }
                t.resolve(e);
              });
              return t.always(function () {
                e._refocusEditCell = true;
              }).promise();
            } else {
              e._cancelSaving(t);
              return;
            }
          }
        }).fail(t.reject);
        return t.promise();
      };
      d._beforeEndSaving = function (e) {
        this._resetEditIndices();
      };
      d._endSaving = function (e, t, n) {
        var i = this._dataController.dataSource();
        this._beforeEndSaving(t);
        if (i != null) {
          i.endLoading();
        }
        this._refreshDataAfterSave(e, t, n);
      };
      d._cancelSaving = function (e) {
        this.executeAction("onSaved", {
          changes: []
        });
        this._resolveAfterSave(e);
      };
      d._refreshDataAfterSave = function (e, t, n) {
        var i = this;
        var o = this._dataController;
        var a = this.option("editing.refreshMode");
        var r = a !== "reshape" && a !== "repaint";
        if (!r) {
          o.push(e);
        }
        (0, u.when)(o.refresh({
          selection: r,
          reload: r,
          load: a === "reshape",
          changesOnly: this.option("repaintChangesOnly")
        })).always(function () {
          i._fireSaveEditDataEvents(t);
        }).done(function () {
          i._resolveAfterSave(n);
        }).fail(function (e) {
          i._resolveAfterSave(n, {
            error: e
          });
        });
      };
      d.isSaving = function () {
        return this._saving;
      };
      d._updateEditColumn = function () {
        var e = this._isEditColumnVisible();
        var t = this.option("editing.useIcons");
        var n = k.COMMAND_EDIT_CLASS + (t ? ` ${k.COMMAND_EDIT_WITH_ICONS_CLASS}` : "");
        this._columnsController.addCommandColumn({
          type: "buttons",
          command: "edit",
          visible: e,
          cssClass: n,
          width: "auto",
          alignment: "center",
          cellTemplate: this._getEditCommandCellTemplate(),
          fixedPosition: "right"
        });
        this._columnsController.columnOption("command:edit", {
          visible: e,
          cssClass: n
        });
      };
      d._isEditColumnVisible = function () {
        return this.option("editing").allowDeleting;
      };
      d._isEditButtonDisabled = function () {
        var e = this.hasChanges();
        return !(0, g.isDefined)(this.option("editing.editRowKey")) && !e;
      };
      d._updateEditButtons = function () {
        var e = this.getView("headerPanel");
        var t = this._isEditButtonDisabled();
        if (e) {
          e.setToolbarItemDisabled("saveButton", t);
          e.setToolbarItemDisabled("revertButton", t);
        }
      };
      d._applyModified = function (e, t) {
        if (e) {
          e.addClass(k.CELL_MODIFIED);
        }
      };
      d._beforeCloseEditCellInBatchMode = function (e) {};
      d.cancelEditData = function () {
        var e = this.getChanges();
        var t = {
          cancel: false,
          changes: e
        };
        this.executeAction("onEditCanceling", t);
        if (!t.cancel) {
          this._cancelEditDataCore();
          this.executeAction("onEditCanceled", {
            changes: e
          });
        }
      };
      d._cancelEditDataCore = function () {
        var e = this._getVisibleEditRowIndex();
        this._beforeCancelEditData();
        this.init();
        this.resetChanges();
        this._resetEditColumnName();
        this._resetEditRowKey();
        this._afterCancelEditData(e);
      };
      d._afterCancelEditData = function (e) {
        this._dataController.updateItems({
          repaintChangesOnly: this.option("repaintChangesOnly")
        });
      };
      d._hideEditPopup = function () {};
      d.hasEditData = function () {
        return this.hasChanges();
      };
      d.update = function (e) {
        var t = this._dataController;
        if (t && this._pageIndex !== t.pageIndex()) {
          if (e === "refresh") {
            this.refresh({
              isPageChanged: true
            });
          }
          this._pageIndex = t.pageIndex();
        }
        this._updateEditButtons();
      };
      d._getRowIndicesForCascadeUpdating = function (e, t) {
        if (t) {
          return [];
        } else {
          return [e.rowIndex];
        }
      };
      d.addDeferred = function (e) {
        var t = this;
        if (this._deferreds.indexOf(e) < 0) {
          this._deferreds.push(e);
          e.always(function () {
            var n = t._deferreds.indexOf(e);
            if (n >= 0) {
              t._deferreds.splice(n, 1);
            }
          });
        }
      };
      d._prepareChange = function (e, t, n) {
        var o = this;
        var a = {};
        var r = e.row?.data;
        var s = e.key;
        var l = new u.Deferred();
        if (s !== undefined) {
          e.value = t;
          (0, u.fromPromise)(e.column.setCellValue(a, t, (0, c.extend)(true, {}, r), n)).done(function () {
            l.resolve({
              data: a,
              key: s,
              oldData: r,
              type: k.DATA_EDIT_DATA_UPDATE_TYPE
            });
          }).fail((0, D.createFailureHandler)(l)).fail(function (e) {
            return o._fireDataErrorOccurred(e);
          });
          if ((0, g.isDefined)(n) && e.column.displayValueMap) {
            e.column.displayValueMap[t] = n;
          }
          this._updateRowValues(e);
          this.addDeferred(l);
        }
        return l;
      };
      d._updateRowValues = function (e) {
        if (e.values) {
          var t = this._dataController;
          var n = t.getRowIndexByKey(e.key);
          var i = t.getVisibleRows()[n];
          if (i) {
            e.row.values = i.values;
            e.values = i.values;
          }
          e.values[e.columnIndex] = e.value;
        }
      };
      d.updateFieldValue = function (e, t, n, i) {
        var o = this;
        var a = e.key;
        var r = new u.Deferred();
        if (a === undefined) {
          this._dataController.fireError("E1043");
        }
        if (e.column.setCellValue) {
          this._prepareChange(e, t, n).done(function (t) {
            (0, u.when)(o._applyChange(e, t, i)).always(function () {
              r.resolve();
            });
          });
        } else {
          r.resolve();
        }
        return r.promise();
      };
      d._focusPreviousEditingCellIfNeed = function (e) {
        if (this.hasEditData() && !this.isEditCell(e.rowIndex, e.columnIndex)) {
          this._focusEditingCell();
          this._updateEditRow(e.row, true);
          return true;
        }
      };
      d._needUpdateRow = function (e) {
        var t = this._columnsController.getVisibleColumns();
        e ||= this._getEditColumn();
        var n = e && e.setCellValue !== e.defaultSetCellValue;
        var i = t.some(function (e) {
          return e.calculateCellValue !== e.defaultCalculateCellValue;
        });
        return n || i;
      };
      d._applyChange = function (e, t, n) {
        var i = E(E({}, e), {
          forceUpdateRow: n
        });
        this._addChange(t, i);
        this._updateEditButtons();
        return this._applyChangeCore(e, i.forceUpdateRow);
      };
      d._applyChangeCore = function (e, t) {
        var n = e.column.setCellValue !== e.column.defaultSetCellValue;
        var i = e.row;
        if (i) {
          if (t || n) {
            this._updateEditRow(i, t, n);
          } else if (i.update) {
            i.update();
          }
        }
      };
      d._updateEditRowCore = function (e, t, n) {
        this._dataController.updateItems({
          changeType: "update",
          rowIndices: this._getRowIndicesForCascadeUpdating(e, t)
        });
      };
      d._updateEditRow = function (e, t, n) {
        if (t) {
          this._updateRowImmediately(e, t, n);
        } else {
          this._updateRowWithDelay(e, n);
        }
      };
      d._updateRowImmediately = function (e, t, n) {
        this._updateEditRowCore(e, !t, n);
        this._validateEditFormAfterUpdate(e, n);
        if (!t) {
          this._focusEditingCell();
        }
      };
      d._updateRowWithDelay = function (e, t) {
        var n = this;
        var i = new u.Deferred();
        this.addDeferred(i);
        setTimeout(function () {
          var o;
          var r = ((o = n._editForm) === null || o === undefined ? undefined : o.element()) || n.component.$element().get(0);
          var l = (0, s.default)(a.default.getActiveElement(r));
          var u = n._rowsView.getCellIndex(l, e.rowIndex);
          var d = l.get(0);
          var c = S.default.getSelectionRange(d);
          n._updateEditRowCore(e, false, t);
          n._validateEditFormAfterUpdate(e, t);
          if (u >= 0) {
            var h = n._rowsView._getCellElement(e.rowIndex, u);
            n._delayedInputFocus(h, function () {
              setTimeout(function () {
                var e;
                d = a.default.getActiveElement((e = n.component.$element()) === null || e === undefined ? undefined : e.get(0));
                if (c.selectionStart >= 0) {
                  S.default.setSelectionRange(d, c);
                }
              });
            });
          }
          i.resolve();
        });
      };
      d._validateEditFormAfterUpdate = function () {};
      d._addChange = function (e, t) {
        var i = t == null ? undefined : t.row;
        var o = O(this.getChanges());
        var a = S.default.getIndexByKey(e.key, o);
        if (a < 0) {
          a = o.length;
          this._addInternalData({
            key: e.key,
            oldData: e.oldData
          });
          delete e.oldData;
          o.push(e);
        }
        var r = E({}, o[a]);
        if (r) {
          if (e.data) {
            r.data = (0, m.createObjectWithChanges)(r.data, e.data);
          }
          if ((!r.type || !e.data) && !!e.type) {
            r.type = e.type;
          }
          if (i) {
            i.oldData = this._getOldData(i.key);
            i.data = (0, m.createObjectWithChanges)(i.data, e.data);
          }
        }
        o[a] = r;
        this._silentOption(k.EDITING_CHANGES_OPTION_NAME, o);
        if (t && r !== this.getChanges()?.[a]) {
          t.forceUpdateRow = true;
        }
        return r;
      };
      d._getFormEditItemTemplate = function (e, t) {
        return t.editCellTemplate || this._getDefaultEditorTemplate();
      };
      d.getColumnTemplate = function (e) {
        var t;
        var n;
        var i = this;
        var o = e.column;
        var a = e.row && e.row.rowIndex;
        var r = this.isRowBasedEditMode();
        var s = this.isEditRow(a);
        var l = this.isEditCell(a, e.columnIndex);
        if (!o.showEditorAlways && (!o.setCellValue || (!s || !o.allowEditing) && !l) || e.rowType !== "data" && e.rowType !== "detailAdaptive" || o.command) {
          if (o.command === "detail" && e.rowType === "detail" && s) {
            t = this === null || this === undefined ? undefined : this.getEditFormTemplate(e);
          }
        } else {
          if (((!!this.allowUpdating(e) || !!s) && !!o.allowEditing || !!l) && (!!s || !r)) {
            if (o.showEditorAlways && !r) {
              n = {
                cancel: false,
                key: e.row.isNewRow ? undefined : e.row.key,
                data: e.row.data,
                column: o
              };
              this._isEditingStart(n);
            }
            if (!n || !n.cancel) {
              e.setValue = function (t, n) {
                i.updateFieldValue(e, t, n);
              };
            }
          }
          t = o.editCellTemplate || this._getDefaultEditorTemplate();
        }
        return t;
      };
      d._createButton = function (e, t, n, i) {
        var o = k.EDIT_ICON_CLASS[t.name];
        var a = this.option("editing.useIcons");
        var r = this.option("useLegacyColumnButtonTemplate");
        var l = (0, s.default)("<a>").attr("href", "#").addClass(k.LINK_CLASS).addClass(t.cssClass);
        if (t.template && r) {
          this._rowsView.renderTemplate(e, t.template, n, true);
        } else {
          if (t.template) {
            l = (0, s.default)("<span>").addClass(t.cssClass);
          } else if (a && o || t.icon) {
            o = t.icon || o;
            var u = h.getImageSourceType(o);
            if (u === "image" || u === "svg") {
              l = h.getImageContainer(o).addClass(t.cssClass);
            } else {
              l.addClass(`dx-icon${u === "dxIcon" ? "-" : " "}${o}`).attr("title", t.text);
            }
            l.addClass("dx-link-icon");
            e.addClass(k.COMMAND_EDIT_WITH_ICONS_CLASS);
            var d = this.getButtonLocalizationNames()[t.name];
            if (d) {
              l.attr("aria-label", x.default.format(d));
            }
          } else {
            l.text(t.text);
          }
          if ((0, g.isDefined)(t.hint)) {
            l.attr("title", t.hint);
          }
          if (this._isButtonDisabled(t, n)) {
            l.addClass("dx-state-disabled");
          } else if (!t.template || !!t.onClick) {
            v.default.on(l, (0, b.addNamespace)("click", k.EDITING_NAMESPACE), this.createAction(function (e) {
              var i;
              if ((i = t.onClick) !== null && i !== undefined) {
                i.call(t, (0, c.extend)({}, e, {
                  row: n.row,
                  column: n.column
                }));
              }
              e.event.preventDefault();
              e.event.stopPropagation();
            }));
          }
          e.append(l, "&nbsp;");
          if (t.template) {
            n.renderAsync = false;
            this._rowsView.renderTemplate(l, t.template, n, true, i);
          }
        }
      };
      d.getButtonLocalizationNames = function () {
        return {
          edit: "dxDataGrid-editingEditRow",
          save: "dxDataGrid-editingSaveRowChanges",
          delete: "dxDataGrid-editingDeleteRow",
          undelete: "dxDataGrid-editingUndeleteRow",
          cancel: "dxDataGrid-editingCancelRowChanges"
        };
      };
      d.prepareButtonItem = function (e, t, n, i) {
        var a = this;
        var r = this.option("editing.texts") ?? {};
        var l = {
          revert: r.cancelAllChanges,
          save: r.saveAllChanges,
          addRow: r.addRow
        };
        var u = {
          revert: "cancel",
          save: "save",
          addRow: "addrow"
        }[t];
        var d = l[t];
        var c = (u === "save" || u === "cancel") && this._isEditButtonDisabled();
        return {
          widget: "dxButton",
          options: {
            onInitialized: function (t) {
              (0, s.default)(t.element).addClass(e._getToolbarButtonClass(`${k.EDIT_BUTTON_CLASS} ${a.addWidgetPrefix(u)}-button`));
            },
            icon: `edit-button-${u}`,
            disabled: c,
            onClick: function () {
              setTimeout(function () {
                a[n]();
              });
            },
            text: d,
            hint: d
          },
          showText: "inMenu",
          name: `${t}Button`,
          location: "after",
          locateInMenu: "auto",
          sortIndex: i
        };
      };
      d.prepareEditButtons = function (e) {
        var n = [];
        if ((this.option("editing") ?? {}).allowAdding) {
          n.push(this.prepareButtonItem(e, "addRow", "addRow", 20));
        }
        return n;
      };
      d.highlightDataCell = function (e, t) {
        if (this.shouldHighlightCell(t)) {
          e.addClass(k.CELL_MODIFIED);
        }
      };
      d._afterInsertRow = function () {};
      d._beforeSaveEditData = function (e) {
        if (e && !(0, g.isDefined)(e.key) && (0, g.isDefined)(e.type)) {
          return true;
        }
      };
      d._afterSaveEditData = function () {};
      d._beforeCancelEditData = function () {};
      d._allowEditAction = function (e, t) {
        var n = this.option(`editing.${e}`);
        if ((0, g.isFunction)(n)) {
          n = n({
            component: this.component,
            row: t.row
          });
        }
        return n;
      };
      d.allowUpdating = function (e, t) {
        var i = this.option("editing.startEditAction") ?? k.DEFAULT_START_EDIT_ACTION;
        var o = !(arguments.length > 1) || i === t || t === "down";
        return o && this._allowEditAction("allowUpdating", e);
      };
      d.allowDeleting = function (e) {
        return this._allowEditAction("allowDeleting", e);
      };
      d.isCellModified = function (e) {
        var t = e.columnIndex;
        var n = e.row && (e.row.isNewRow ? e.row.values : e.row.modifiedValues);
        return !!n && n[t] !== undefined;
      };
      d.isNewRowInEditMode = function () {
        var e = this._getVisibleEditRowIndex();
        var t = this._dataController.items();
        return e >= 0 && t[e].isNewRow;
      };
      d._isRowDeleteAllowed = function () {};
      d.shouldHighlightCell = function (e) {
        return this.isCellModified(e) && e.column.setCellValue && (this.getEditMode() !== k.EDIT_MODE_ROW || !e.row.isEditing);
      };
      return i;
    }(C.default.ViewController)
  },
  extenders: {
    controllers: {
      data: {
        init: function () {
          this._editingController = this.getController("editing");
          this.callBase();
        },
        reload: function (e, t) {
          if (!t) {
            this._editingController.refresh();
          }
          return this.callBase.apply(this, arguments);
        },
        repaintRows: function () {
          if (!this.getController("editing").isSaving()) {
            return this.callBase.apply(this, arguments);
          }
        },
        _updateEditRow: function (e) {
          var t;
          var n = this.option(k.EDITING_EDITROWKEY_OPTION_NAME);
          var i = e[S.default.getIndexByKey(n, e)];
          if (i) {
            i.isEditing = true;
            if ((t = this._updateEditItem) !== null && t !== undefined) {
              t.call(this, i);
            }
          }
        },
        _updateItemsCore: function (e) {
          this.callBase(e);
          this._updateEditRow(this.items(true));
        },
        _applyChangeUpdate: function (e) {
          this._updateEditRow(e.items);
          this.callBase(e);
        },
        _applyChangesOnly: function (e) {
          this._updateEditRow(e.items);
          this.callBase(e);
        },
        _processItems: function (e, t) {
          e = this._editingController.processItems(e, t);
          return this.callBase(e, t);
        },
        _processDataItem: function (e, t) {
          this._editingController.processDataItem(e, t, this.generateDataValues);
          return this.callBase(e, t);
        },
        _processItem: function (e, t) {
          if ((e = this.callBase(e, t)).isNewRow) {
            t.dataIndex--;
            delete e.dataIndex;
          }
          return e;
        },
        _getChangedColumnIndices: function (e, t, n, i) {
          if (e.isNewRow === t.isNewRow && e.removed === t.removed) {
            return this.callBase.apply(this, arguments);
          }
        },
        _isCellChanged: function (e, t, n, i, o) {
          var a = this.getController("editing");
          var r = e.cells && e.cells[i];
          var s = a && a.isEditCell(n, i);
          return (!o || !s) && (!!r && !!r.column && !r.column.showEditorAlways && r.isEditing !== s || this.callBase.apply(this, arguments));
        },
        needToRefreshOnDataSourceChange: function (e) {
          var t = this.getController("editing");
          return !Array.isArray(e.value) || e.value !== e.previousValue || !t.isSaving();
        },
        _handleDataSourceChange: function (e) {
          var t = this;
          var n = this.callBase(e);
          var i = this.option("editing.changes");
          var o = e.value;
          if (Array.isArray(o) && i.length) {
            var a = o.map(function (e) {
              return t.keyOf(e);
            });
            var r = i.filter(function (e) {
              return e.type === "insert" || a.some(function (t) {
                return (0, l.equalByValue)(e.key, t);
              });
            });
            if (r.length !== i.length) {
              this.option("editing.changes", r);
            }
            var s = this.option("editing.editRowKey");
            if (!r.some(function (e) {
              return e.type === "insert" && (0, l.equalByValue)(s, e.key);
            }) && a.every(function (e) {
              return !(0, l.equalByValue)(s, e);
            })) {
              this.option("editing.editRowKey", null);
            }
          }
          return n;
        }
      }
    },
    views: {
      rowsView: {
        init: function () {
          this.callBase();
          this._editingController = this.getController("editing");
        },
        getCellIndex: function (e, t) {
          if (!e.is("td") && t >= 0) {
            var n = this.getCellElements(t);
            var i = -1;
            (0, f.each)(n, function (t, n) {
              if ((0, s.default)(n).find(e).length) {
                i = t;
              }
            });
            return i;
          }
          return this.callBase.apply(this, arguments);
        },
        publicMethods: function () {
          return this.callBase().concat(["cellValue"]);
        },
        _getCellTemplate: function (e) {
          return this._editingController.getColumnTemplate(e) || this.callBase(e);
        },
        _createRow: function (e) {
          var t = this.callBase.apply(this, arguments);
          if (e) {
            var n = !!e.removed;
            var i = !!e.isNewRow;
            var o = !!e.modified;
            if (i) {
              t.addClass(k.ROW_INSERTED);
            }
            if (o) {
              t.addClass(k.ROW_MODIFIED);
            }
            if (i || n) {
              t.removeClass(k.ROW_SELECTED);
            }
          }
          return t;
        },
        _getColumnIndexByElement: function (e) {
          for (var t = e.closest("table"), n = this.getTableElements(); t.length && !n.filter(t).length;) {
            e = t.closest("td");
            t = e.closest("table");
          }
          return this._getColumnIndexByElementCore(e);
        },
        _getColumnIndexByElementCore: function (e) {
          var t = e.closest(`.${k.ROW_CLASS}> td:not(.dx-master-detail-cell)`);
          return this.getCellIndex(t);
        },
        _editCellByClick: function (e, t) {
          var n = this._editingController;
          var i = (0, s.default)(e.event.target);
          var a = this._getColumnIndexByElement(i);
          var r = this._dataController.items()[e.rowIndex];
          var l = n.allowUpdating({
            row: r
          }, t) || r && r.isNewRow;
          var u = this._columnsController.getVisibleColumns()[a];
          var c = n.isEditCell(e.rowIndex, a);
          var h = l && u && (u.allowEditing || c);
          var f = this.option("editing.startEditAction") || "click";
          var p = u && u.showEditorAlways;
          if (c) {
            return true;
          }
          if (t === "down") {
            if (o.default.real().ios || o.default.real().android) {
              (0, d.resetActiveElement)();
            }
            return p && h && n.editCell(e.rowIndex, a);
          }
          if (t === "click" && f === "dblClick") {
            var g = r == null ? undefined : r.isNewRow;
            n.closeEditCell(false, g);
          }
          if (h && t === f) {
            return n.editCell(e.rowIndex, a) || n.isEditRow(e.rowIndex);
          } else {
            return undefined;
          }
        },
        _rowPointerDown: function (e) {
          var t = this;
          this._pointerDownTimeout = setTimeout(function () {
            t._editCellByClick(e, "down");
          });
        },
        _rowClick: function (e) {
          var t = (0, s.default)(e.rowElement).hasClass(this.addWidgetPrefix(k.EDIT_FORM_CLASS));
          e.event[k.TARGET_COMPONENT_NAME] = this.component;
          if (!this._editCellByClick(e, "click") && !t) {
            this.callBase.apply(this, arguments);
          }
        },
        _rowDblClick: function (e) {
          if (!this._editCellByClick(e, "dblClick")) {
            this.callBase.apply(this, arguments);
          }
        },
        _cellPrepared: function (e, t) {
          var i = this._editingController;
          var o = !!t.column.command;
          var a = t.setValue;
          var r = i.isEditRow(t.rowIndex);
          var s = (0, D.isEditingCell)(r, t);
          if ((0, D.isEditingOrShowEditorAlwaysDataCell)(r, t)) {
            var l = t.column.alignment;
            e.toggleClass(this.addWidgetPrefix(k.READONLY_CLASS), !a).toggleClass(k.CELL_FOCUS_DISABLED_CLASS, !a);
            if (l) {
              e.find(k.EDITORS_INPUT_SELECTOR).first().css("textAlign", l);
            }
          }
          if (s) {
            this._editCellPrepared(e);
          }
          var u = !!t.column?.cellTemplate;
          if (!!t.column && !o && (!u || !!i.shouldHighlightCell(t))) {
            i.highlightDataCell(e, t);
          }
          this.callBase.apply(this, arguments);
        },
        _editCellPrepared: l.noop,
        _formItemPrepared: l.noop,
        _getCellOptions: function (e) {
          var t = this.callBase(e);
          t.isEditing = this._editingController.isEditCell(t.rowIndex, t.columnIndex);
          return t;
        },
        _createCell: function (e) {
          var t = this.callBase(e);
          var n = this._editingController.isEditRow(e.rowIndex);
          if ((0, D.isEditingOrShowEditorAlwaysDataCell)(n, e)) {
            t.addClass(k.EDITOR_CELL_CLASS);
          }
          return t;
        },
        cellValue: function (e, t, n, i) {
          var o = this.getCellOptions(e, t);
          if (o) {
            if (n === undefined) {
              return o.value;
            }
            this._editingController.updateFieldValue(o, n, i, true);
          }
        },
        dispose: function () {
          this.callBase.apply(this, arguments);
          clearTimeout(this._pointerDownTimeout);
        },
        _renderCore: function () {
          var e = this;
          this.callBase.apply(this, arguments);
          return this.waitAsyncTemplates(true).done(function () {
            e._editingController._focusEditorIfNeed();
          });
        }
      },
      headerPanel: {
        _getToolbarItems: function () {
          var e = this.callBase();
          return this.getController("editing").prepareEditButtons(this).concat(e);
        },
        optionChanged: function (e) {
          var t = e.fullName;
          switch (e.name) {
            case "editing":
              var n = [k.EDITING_POPUP_OPTION_NAME, k.EDITING_CHANGES_OPTION_NAME, k.EDITING_EDITCOLUMNNAME_OPTION_NAME, k.EDITING_EDITROWKEY_OPTION_NAME];
              if (t && !n.some(function (e) {
                return e === t;
              })) {
                this._invalidate();
              }
              this.callBase(e);
              break;
            case "useLegacyColumnButtonTemplate":
              e.handled = true;
              break;
            default:
              this.callBase(e);
          }
        },
        isVisible: function () {
          var e = this.getController("editing").option("editing");
          return this.callBase() || (e == null ? undefined : e.allowAdding);
        }
      }
    }
  }
};
exports.editingModule = M;