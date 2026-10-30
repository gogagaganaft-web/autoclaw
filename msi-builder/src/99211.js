Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.editingFormBasedModule = undefined;
var i = y(require("./20530.js"));
var o = y(require("./73176.js"));
var a = y(require("./68374.js"));
var r = require("./20576.js");
var s = require("./62754.js");
var l = require("./3532.js");
var u = require("./13306.js");
var d = require("./95479.js");
var c = require("./35922.js");
var h = y(require("./55994.js"));
var f = y(require("./63008.js"));
var p = y(require("./17737.js"));
var g = y(require("./51495.js"));
var m = y(require("./41183.js"));
var _ = require("./72313.js");
var v = require("./89237.js");
function y(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
function b(e, t) {
  return (b = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (e, t) {
    e.__proto__ = t;
    return e;
  })(e, t);
}
var x = {
  extenders: {
    controllers: {
      editing: function (e) {
        return function (e) {
          var t;
          var n;
          function y() {
            return e.apply(this, arguments) || this;
          }
          n = e;
          (t = y).prototype = Object.create(n.prototype);
          t.prototype.constructor = t;
          b(t, n);
          var x = y.prototype;
          x.init = function () {
            this._editForm = null;
            this._updateEditFormDeferred = null;
            e.prototype.init.call(this);
          };
          x.isFormOrPopupEditMode = function () {
            return this.isPopupEditMode() || this.isFormEditMode();
          };
          x.isPopupEditMode = function () {
            return this.option("editing.mode") === _.EDIT_MODE_POPUP;
          };
          x.isFormEditMode = function () {
            return this.option("editing.mode") === _.EDIT_MODE_FORM;
          };
          x.getFirstEditableColumnIndex = function () {
            var t = this._firstFormItem;
            if (this.isFormEditMode() && t) {
              var n = this.option(_.EDITING_EDITROWKEY_OPTION_NAME);
              var i = this._dataController.getRowIndexByKey(n);
              var o = this._rowsView.getCellElements(i);
              return this._rowsView._getEditFormEditorVisibleIndex(o, t.column);
            }
            return e.prototype.getFirstEditableColumnIndex.call(this);
          };
          x.getEditFormRowIndex = function () {
            if (this.isFormOrPopupEditMode()) {
              return this._getVisibleEditRowIndex();
            } else {
              return e.prototype.getEditFormRowIndex.call(this);
            }
          };
          x._isEditColumnVisible = function () {
            var t = e.prototype._isEditColumnVisible.call(this);
            var n = this.option("editing");
            return this.isFormOrPopupEditMode() && n.allowUpdating || t;
          };
          x._handleDataChanged = function (t) {
            var n;
            if (this.isPopupEditMode()) {
              var o = this.option("editing.editRowKey");
              var a = (n = t == null ? undefined : t.items) === null || n === undefined ? undefined : n.some(function (e) {
                return (0, r.equalByValue)(e.key, o);
              });
              var s = t.changeTypes?.length && t.changeTypes.every(function (e) {
                return e === "insert";
              });
              if ((t.changeType === "refresh" || a && t.isOptionChanged) && !s) {
                this._repaintEditPopup();
              }
            }
            e.prototype._handleDataChanged.call(this, t);
          };
          x.getPopupContent = function () {
            var e;
            var t = (e = this._editPopup) === null || e === undefined ? undefined : e.option("visible");
            if (this.isPopupEditMode() && t) {
              return this._$popupContent;
            }
          };
          x._showAddedRow = function (t) {
            if (this.isPopupEditMode()) {
              this._showEditPopup(t);
            } else {
              e.prototype._showAddedRow.call(this, t);
            }
          };
          x._cancelEditDataCore = function () {
            e.prototype._cancelEditDataCore.call(this);
            if (this.isPopupEditMode()) {
              this._hideEditPopup();
            }
          };
          x._updateEditRowCore = function (t, n, i) {
            var o;
            var a = this._editForm;
            if (this.isPopupEditMode()) {
              if (this.option("repaintChangesOnly")) {
                if ((o = t.update) !== null && o !== undefined) {
                  o.call(t, t);
                }
                this._rowsView.renderDelayedTemplates();
              } else if (a) {
                this._updateEditFormDeferred = new s.Deferred().done(function () {
                  return a.repaint();
                });
                if (!this._updateLockCount) {
                  this._updateEditFormDeferred.resolve();
                }
              }
            } else {
              e.prototype._updateEditRowCore.call(this, t, n, i);
            }
          };
          x._showEditPopup = function (t, n) {
            var o = this;
            var r = i.default.current().deviceType !== "desktop";
            var s = this.addWidgetPrefix(_.EDIT_POPUP_CLASS);
            var l = (0, u.extend)({
              showTitle: false,
              fullScreen: r,
              wrapperAttr: {
                class: s
              },
              toolbarItems: [{
                toolbar: "bottom",
                location: "after",
                widget: "dxButton",
                options: this._getSaveButtonConfig()
              }, {
                toolbar: "bottom",
                location: "after",
                widget: "dxButton",
                options: this._getCancelButtonConfig()
              }],
              contentTemplate: this._getPopupEditFormTemplate(t)
            }, this.option(_.EDITING_POPUP_OPTION_NAME));
            if (!this._editPopup) {
              var d = (0, a.default)("<div>").appendTo(this.component.$element()).addClass(s);
              this._editPopup = this._createComponent(d, g.default);
              this._editPopup.on("hiding", this._getEditPopupHiddenHandler());
              this._editPopup.on("shown", function (e) {
                var t;
                h.default.trigger(e.component.$content().find(_.FOCUSABLE_ELEMENT_SELECTOR).not(`.${_.FOCUSABLE_ELEMENT_CLASS}`).first(), "focus");
                if (n) {
                  if ((t = o._editForm) !== null && t !== undefined) {
                    t.repaint();
                  }
                }
              });
            }
            this._editPopup.option(l);
            this._editPopup.show();
            e.prototype._showEditPopup.call(this, t, n);
          };
          x._getPopupEditFormTemplate = function (e) {
            var t = this;
            var n = this.component.getVisibleRows()[e];
            var i = {
              row: n,
              values: n.values,
              rowType: n.rowType,
              key: n.key,
              rowIndex: e
            };
            this._rowsView._addWatchMethod(i, n);
            return function (e) {
              var n = t.getEditFormTemplate();
              var o = t._createComponent((0, a.default)("<div>").appendTo(e), m.default);
              t._$popupContent = (0, a.default)(o.content());
              n(t._$popupContent, i, {
                isPopupForm: true
              });
              t._rowsView.renderDelayedTemplates();
            };
          };
          x._repaintEditPopup = function () {
            var e;
            var t;
            var n = this._getVisibleEditRowIndex();
            if (n >= 0) {
              var i = (e = this._editPopup) === null || e === undefined ? undefined : e.option("animation");
              if ((t = this._editPopup) !== null && t !== undefined) {
                t.option("animation", null);
              }
              this._showEditPopup(n, true);
              if (i !== undefined) {
                this._editPopup.option("animation", i);
              }
            }
          };
          x._hideEditPopup = function () {
            var e;
            if ((e = this._editPopup) !== null && e !== undefined) {
              e.option("visible", false);
            }
          };
          x.optionChanged = function (t) {
            if (t.name === "editing" && this.isFormOrPopupEditMode()) {
              var n = t.fullName;
              if (n.indexOf(_.EDITING_FORM_OPTION_NAME) === 0) {
                this._handleFormOptionChange(t);
                t.handled = true;
              } else if (n.indexOf(_.EDITING_POPUP_OPTION_NAME) === 0) {
                this._handlePopupOptionChange(t);
                t.handled = true;
              }
            }
            e.prototype.optionChanged.call(this, t);
          };
          x._handleFormOptionChange = function (e) {
            var t;
            if (this.isFormEditMode()) {
              var n = this._getVisibleEditRowIndex();
              if (n >= 0) {
                this._dataController.updateItems({
                  changeType: "update",
                  rowIndices: [n]
                });
              }
            } else if (((t = this._editPopup) === null || t === undefined ? undefined : t.option("visible")) && e.fullName.indexOf(_.EDITING_FORM_OPTION_NAME) === 0) {
              this._repaintEditPopup();
            }
          };
          x._handlePopupOptionChange = function (e) {
            var t = this._editPopup;
            if (t) {
              var n = e.fullName.slice(_.EDITING_POPUP_OPTION_NAME.length + 1);
              if (n) {
                t.option(n, e.value);
              } else {
                t.option(e.value);
              }
            }
          };
          x.renderFormEditorTemplate = function (e, t, n, i, o) {
            var r = this;
            var s = this;
            var d = (0, a.default)(i);
            var c = t.column;
            var h = (0, v.getEditorType)(t);
            var f = e == null ? undefined : e.row.data;
            var p = n.component;
            var g = n.editorOptions || {};
            var m = g.label;
            var _ = g.labelMark;
            var y = g.labelMode;
            var b = (0, u.extend)({}, e, {
              data: f,
              cellElement: null,
              isOnForm: true,
              item: t,
              id: p.getItemID(t.name || t.dataField),
              column: (0, u.extend)({}, c, {
                editorType: h,
                editorOptions: (0, u.extend)({
                  label: m,
                  labelMark: _,
                  labelMode: y
                }, c.editorOptions, t.editorOptions)
              }),
              columnIndex: c.index,
              setValue: !o && c.allowEditing && function (e, t) {
                s.updateFieldValue(b, e, t);
              }
            });
            b.value = c.calculateCellValue(f);
            var x = this._getFormEditItemTemplate.bind(this)(b, c);
            this._rowsView.renderTemplate(d, x, b, !!(0, l.isElementInDom)(d)).done(function () {
              r._rowsView._updateCell(d, b);
            });
            return b;
          };
          x.getFormEditorTemplate = function (e, t) {
            var n = this;
            var i = this.component.columnOption(t.dataField);
            return function (o, r) {
              var s;
              var l;
              var u = (0, a.default)(r);
              if ((l = (s = e.row).watch) !== null && l !== undefined) {
                l.call(s, function () {
                  return i.selector(e.row.data);
                }, function () {
                  var i = u.find(".dx-widget").first();
                  var a = i.data("dxValidator");
                  var r = a == null ? undefined : a.option();
                  u.contents().remove();
                  e = n.renderFormEditorTemplate.bind(n)(e, t, o, u);
                  a = (i = u.find(".dx-widget").first()).data("dxValidator");
                  if (r && !a) {
                    i.dxValidator({
                      validationRules: r.validationRules,
                      validationGroup: r.validationGroup,
                      dataGetter: r.dataGetter
                    });
                  }
                });
              }
              e = n.renderFormEditorTemplate.bind(n)(e, t, o, u);
            };
          };
          x.getEditFormOptions = function (e) {
            var t;
            var n = this;
            var i = (t = this._getValidationGroupsInForm) === null || t === undefined ? undefined : t.call(this, e);
            var a = this.option("editing.form.customizeItem");
            var r = this.addWidgetPrefix(_.EDIT_FORM_ITEM_CLASS);
            var s = this.option("editing.form.items");
            var l = {};
            if (s) {
              (0, v.forEachFormItems)(s, function (e) {
                var t = (e == null ? undefined : e.name) || (e == null ? undefined : e.dataField);
                if (t) {
                  l[t] = !!e.editorType;
                }
              });
            } else {
              var h = this.getController("columns").getColumns();
              s = [];
              (0, d.each)(h, function (e, t) {
                if (!t.isBand && !t.type) {
                  s.push({
                    column: t,
                    name: t.name,
                    dataField: t.dataField
                  });
                }
              });
            }
            return (0, u.extend)({}, i, {
              items: s,
              formID: `dx-${new o.default()}`,
              customizeItem: function (t) {
                var i;
                var o = t.name || t.dataField;
                if (t.column || o) {
                  i = t.column || n._columnsController.columnOption(t.name ? `name:${t.name}` : `dataField:${t.dataField}`);
                }
                if (i) {
                  t.label = t.label || {};
                  t.label.text = t.label.text || i.caption;
                  if (i.dataType === "boolean" && t.label.visible === undefined) {
                    var s = n.option("editing.form.labelMode");
                    if (s === "floating" || s === "static") {
                      t.label.visible = true;
                    }
                  }
                  t.template = t.template || n.getFormEditorTemplate(e, t);
                  t.column = i;
                  t.isCustomEditorType = l[o];
                  if (i.formItem) {
                    (0, u.extend)(t, i.formItem);
                  }
                  if (t.isRequired === undefined && i.validationRules) {
                    t.isRequired = i.validationRules.some(function (e) {
                      return e.type === "required";
                    });
                    t.validationRules = [];
                  }
                  var d = !(0, c.isDefined)(t.visible) || t.visible;
                  if (!n._firstFormItem && d) {
                    n._firstFormItem = t;
                  }
                }
                if (a != null) {
                  a.call(n, t);
                }
                t.cssClass = (0, c.isString)(t.cssClass) ? `${t.cssClass} ${r}` : r;
              }
            });
          };
          x.getEditFormTemplate = function () {
            var e = this;
            return function (t, n, i) {
              var o = e.option(_.EDITING_FORM_OPTION_NAME);
              var r = e.getEditFormOptions(n);
              var s = (0, a.default)("<div>").appendTo(t);
              var l = i == null ? undefined : i.isPopupForm;
              e._firstFormItem = undefined;
              if (l) {
                s.addClass(e.addWidgetPrefix(_.EDIT_POPUP_FORM_CLASS));
              }
              e._editForm = e._createComponent(s, p.default, (0, u.extend)({}, o, r));
              if (!l) {
                var d = (0, a.default)("<div>").addClass(e.addWidgetPrefix(_.FORM_BUTTONS_CONTAINER_CLASS)).appendTo(t);
                e._createComponent((0, a.default)("<div>").appendTo(d), f.default, e._getSaveButtonConfig());
                e._createComponent((0, a.default)("<div>").appendTo(d), f.default, e._getCancelButtonConfig());
              }
              e._editForm.on("contentReady", function () {
                var t;
                e._rowsView.renderDelayedTemplates();
                if ((t = e._editPopup) !== null && t !== undefined) {
                  t.repaint();
                }
              });
            };
          };
          x.getEditForm = function () {
            return this._editForm;
          };
          x._endUpdateCore = function () {
            var e;
            if ((e = this._updateEditFormDeferred) !== null && e !== undefined) {
              e.resolve();
            }
          };
          x._beforeEndSaving = function (t) {
            var n;
            e.prototype._beforeEndSaving.call(this, t);
            if (this.isPopupEditMode()) {
              if ((n = this._editPopup) !== null && n !== undefined) {
                n.hide();
              }
            }
          };
          x._processDataItemCore = function (t, n, i, o, a) {
            var r = n.type;
            if (this.isPopupEditMode() && r === _.DATA_EDIT_DATA_INSERT_TYPE) {
              t.visible = false;
            }
            e.prototype._processDataItemCore.call(this, t, n, i, o, a);
          };
          x._editRowFromOptionChangedCore = function (t, n) {
            var i = this.isPopupEditMode();
            e.prototype._editRowFromOptionChangedCore.call(this, t, n, i);
            if (i) {
              this._showEditPopup(n);
            }
          };
          return y;
        }(e);
      },
      data: {
        _updateEditItem: function (e) {
          if (this._editingController.isFormEditMode()) {
            e.rowType = "detail";
          }
        },
        _getChangedColumnIndices: function (e, t, n, i) {
          if (i !== false || !t.isEditing || !this._editingController.isFormEditMode()) {
            return this.callBase.apply(this, arguments);
          }
        }
      }
    },
    views: {
      rowsView: {
        _renderCellContent: function (e, t) {
          if (t.rowType !== "data" || !this._editingController.isPopupEditMode() || t.row.visible !== false) {
            this.callBase.apply(this, arguments);
          }
        },
        getCellElements: function (e) {
          var t = this.callBase(e);
          var n = this._editingController;
          var i = n.getEditForm();
          if (n.getEditFormRowIndex() === e && t && i) {
            return i.$element().find(`.${this.addWidgetPrefix(_.EDIT_FORM_ITEM_CLASS)}, .${_.BUTTON_CLASS}`);
          } else {
            return t;
          }
        },
        _getVisibleColumnIndex: function (e, t, n) {
          var i = this._editingController.getEditFormRowIndex();
          if (i === t && (0, c.isString)(n)) {
            var o = this._columnsController.columnOption(n);
            return this._getEditFormEditorVisibleIndex(e, o);
          }
          return this.callBase.apply(this, arguments);
        },
        _getEditFormEditorVisibleIndex: function (e, t) {
          var n = -1;
          (0, d.each)(e, function (e, i) {
            var o = (0, a.default)(i).find(".dx-field-item-content").data("dx-form-item");
            if ((o == null ? undefined : o.column) && t && o.column.index === t.index) {
              n = e;
              return false;
            }
          });
          return n;
        },
        _isFormItem: function (e) {
          var t = e.rowType === "detail" || e.rowType === "detailAdaptive";
          var n = e.rowType === "data" && this._editingController.isPopupEditMode();
          return (t || n) && e.item;
        },
        _updateCell: function (e, t) {
          if (this._isFormItem(t)) {
            this._formItemPrepared(t, e);
          } else {
            this.callBase(e, t);
          }
        }
      }
    }
  }
};
exports.editingFormBasedModule = x;