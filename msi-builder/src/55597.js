Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.editingRowBasedModule = undefined;
var i = require("./20576.js");
var o = require("./72313.js");
function a(e, t) {
  return (a = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (e, t) {
    e.__proto__ = t;
    return e;
  })(e, t);
}
var r = {
  extenders: {
    controllers: {
      editing: function (e) {
        return function (e) {
          var t;
          var n;
          function r() {
            return e.apply(this, arguments) || this;
          }
          n = e;
          (t = r).prototype = Object.create(n.prototype);
          t.prototype.constructor = t;
          a(t, n);
          var s = r.prototype;
          s.isRowEditMode = function () {
            return this.getEditMode() === o.EDIT_MODE_ROW;
          };
          s._afterCancelEditData = function (t) {
            var n = this._dataController;
            if (this.isRowBasedEditMode() && t >= 0) {
              n.updateItems({
                changeType: "update",
                rowIndices: [t, t + 1]
              });
            } else {
              e.prototype._afterCancelEditData.call(this, t);
            }
          };
          s._isDefaultButtonVisible = function (t, n) {
            var a = this.isRowBasedEditMode();
            var r = n.row && (0, i.equalByValue)(n.row.key, this.option(o.EDITING_EDITROWKEY_OPTION_NAME));
            if (a) {
              switch (t.name) {
                case "edit":
                  return !r && this.allowUpdating(n);
                case "delete":
                  return e.prototype._isDefaultButtonVisible.call(this, t, n) && !r;
                case "save":
                case "cancel":
                  return r;
                default:
                  return e.prototype._isDefaultButtonVisible.call(this, t, n);
              }
            }
            return e.prototype._isDefaultButtonVisible.call(this, t, n);
          };
          s.isEditRow = function (e) {
            return this.isRowBasedEditMode() && this.isEditRowByIndex(e);
          };
          s._cancelSaving = function (t) {
            if (this.isRowBasedEditMode()) {
              if (!this.hasChanges()) {
                this._cancelEditDataCore();
              }
            }
            e.prototype._cancelSaving.call(this, t);
          };
          s._refreshCore = function (t) {
            var n = (t ?? {}).allowCancelEditing;
            if (this.isRowBasedEditMode()) {
              var i = this.getChanges().filter(function (e) {
                return e.type === "update";
              }).length > 0;
              this.init();
              if (n && i) {
                this._cancelEditDataCore();
              }
            }
            e.prototype._refreshCore.call(this, t);
          };
          s._isEditColumnVisible = function () {
            var t = e.prototype._isEditColumnVisible.call(this);
            var n = this.option("editing");
            var i = this.isRowEditMode();
            var o = n.allowUpdating || n.allowAdding;
            return t || i && o;
          };
          s._focusEditorIfNeed = function () {
            var e = this;
            var t = this.getEditMode();
            if (this._needFocusEditor) {
              if (o.MODES_WITH_DELAYED_FOCUS.includes(t)) {
                var n = this.getFocusedCellInRow(this._getVisibleEditRowIndex());
                this._delayedInputFocus(n, function () {
                  if (n) {
                    e.component.focus(n);
                  }
                });
              }
              this._needFocusEditor = false;
            }
          };
          return r;
        }(e);
      },
      data: {
        _getChangedColumnIndices: function (e, t, n, i) {
          var o = this.getController("editing");
          if (!o.isRowBasedEditMode() || e.isEditing === t.isEditing) {
            return this.callBase.apply(this, arguments);
          }
        }
      }
    },
    views: {
      rowsView: {
        _createRow: function (e) {
          var t = this.callBase.apply(this, arguments);
          if (e) {
            var n = this._editingController;
            var i = n.isEditRow(e.rowIndex);
            if (i) {
              t.addClass(o.EDIT_ROW);
              t.removeClass(o.ROW_SELECTED_CLASS);
              if (e.rowType === "detail") {
                t.addClass(this.addWidgetPrefix(o.EDIT_FORM_CLASS));
              }
            }
          }
          return t;
        },
        _update: function (e) {
          this.callBase(e);
          if (e.changeType === "updateSelection") {
            this.getTableElements().children("tbody").children(`.${o.EDIT_ROW}`).removeClass(o.ROW_SELECTED_CLASS);
          }
        }
      }
    }
  }
};
exports.editingRowBasedModule = r;