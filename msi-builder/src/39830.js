Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validatingModule = undefined;
var i = k(require("./68374.js"));
var o = k(require("./47810.js"));
var a = require("./20576.js");
var r = require("./62754.js");
var s = require("./13306.js");
var l = require("./95479.js");
var u = require("./58664.js");
var d = require("./68752.js");
var c = require("./35922.js");
var h = require("./60637.js");
var f = k(require("./55994.js"));
var p = k(require("./93786.js"));
var g = k(require("./28109.js"));
var m = k(require("./63008.js"));
var _ = k(require("./2492.js"));
var v = k(require("./89799.js"));
var y = k(require("./90964.js"));
var b = k(require("./39562.js"));
var x = require("./31421.js");
var w = k(require("./96688.js"));
var C = k(require("./15943.js"));
var S = k(require("./60082.js"));
function k(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
function D(e) {
  return function (e) {
    if (Array.isArray(e)) {
      return I(e);
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
      return I(e, t);
    }
    var n = Object.prototype.toString.call(e).slice(8, -1);
    if (n === "Object" && e.constructor) {
      n = e.constructor.name;
    }
    if (n === "Map" || n === "Set") {
      return Array.from(e);
    }
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) {
      return I(e, t);
    }
  }(e) || function () {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }();
}
function I(e, t) {
  if (t == null || t > e.length) {
    t = e.length;
  }
  for (var n = 0, i = new Array(t); n < t; n++) {
    i[n] = e[n];
  }
  return i;
}
var T = ["popup", "form"];
var E = "valid";
var O = "invalid";
var A = "pending";
function P(e) {
  return (0, c.isDefined)(e) && e !== "cancel";
}
function M(e, t) {
  return e !== undefined || e === undefined && t && !t.isNewRow;
}
var R = {
  defaultOptions: function () {
    return {
      editing: {
        texts: {
          validationCancelChanges: g.default.format("dxDataGrid-validationCancelChanges")
        }
      }
    };
  },
  controllers: {
    validating: C.default.Controller.inherit({
      init: function () {
        this._editingController = this.getController("editing");
        this.createAction("onRowValidating");
        if (!this._validationState) {
          this.initValidationState();
        }
      },
      initValidationState: function () {
        this._validationState = [];
        this._validationStateCache = {};
      },
      _rowIsValidated: function (e) {
        var t = this._getValidationData(e == null ? undefined : e.key);
        return !!t && !!t.validated;
      },
      _getValidationData: function (e, t) {
        var n;
        var i = (0, a.getKeyHash)(e);
        var o = (0, c.isObject)(i);
        if (!(n = o ? this._validationState.filter(function (t) {
          return (0, a.equalByValue)(t.key, e);
        })[0] : this._validationStateCache[i]) && t) {
          n = {
            key: e,
            isValid: true
          };
          this._validationState.push(n);
          if (!o) {
            this._validationStateCache[i] = n;
          }
        }
        return n;
      },
      _getBrokenRules: function (e, t) {
        if (t) {
          return t.brokenRules || t.brokenRule && [t.brokenRule];
        } else {
          return e.brokenRules || [];
        }
      },
      _rowValidating: function (e, t) {
        var n = new r.Deferred();
        var i = this._editingController.getChangeByKey(e == null ? undefined : e.key);
        var o = this._getBrokenRules(e, t);
        var a = {
          brokenRules: o,
          isValid: t ? t.isValid : e.isValid,
          key: i.key,
          newData: i.data,
          oldData: this._editingController._getOldData(i.key),
          promise: null,
          errorText: this.getHiddenValidatorsErrorText(o)
        };
        this.executeAction("onRowValidating", a);
        (0, r.when)((0, r.fromPromise)(a.promise)).always(function () {
          e.isValid = a.isValid;
          e.errorText = a.errorText;
          n.resolve(a);
        });
        return n.promise();
      },
      getHiddenValidatorsErrorText: function (e) {
        var t = [];
        (0, l.each)(e, function (e, n) {
          var i = n.column;
          var o = i && i.groupIndex !== undefined && !i.showWhenGrouped;
          var a = i && i.visible;
          if (!n.validator.$element().parent().length && (!a || !!o)) {
            t.push(n.message);
          }
        });
        return t.join(", ");
      },
      validate: function (e) {
        var t = this;
        var n = true;
        var i = this._editingController;
        var o = new r.Deferred();
        var a = [];
        var s = i.getEditMode();
        e = e || s === "row";
        if (this._isValidationInProgress) {
          return o.resolve(false).promise();
        }
        this._isValidationInProgress = true;
        if (e) {
          i.addDeferred(o);
          var u = i.getChanges();
          (0, l.each)(u, function (e, i) {
            var o = i.type;
            var r = i.key;
            if (o !== "remove") {
              var s = t._getValidationData(r, true);
              var l = t.validateGroup(s);
              a.push(l);
              l.done(function (e) {
                s.validated = true;
                n = n && e.isValid;
              });
            }
          });
        } else if (this._currentCellValidator) {
          var d = this.validateGroup(this._currentCellValidator._findGroup());
          a.push(d);
          d.done(function (e) {
            n = e.isValid;
          });
        }
        r.when.apply(undefined, a).done(function () {
          t._isValidationInProgress = false;
          o.resolve(n);
        });
        return o.promise();
      },
      validateGroup: function (e) {
        var t;
        var n = this;
        var i = new r.Deferred();
        var o = e && y.default.getGroupConfig(e);
        if (o == null ? undefined : o.validators.length) {
          this.resetRowValidationResults(e);
          t = y.default.validateGroup(e);
        }
        (0, r.when)((t == null ? undefined : t.complete) || t).done(function (t) {
          (0, r.when)(n._rowValidating(e, t)).done(i.resolve);
        });
        return i.promise();
      },
      isRowDataModified: function (e) {
        return !(0, c.isEmptyObject)(e.data);
      },
      updateValidationState: function (e) {
        var t = this._editingController.getEditMode();
        var n = e.key;
        var i = this._getValidationData(n, true);
        if (T.includes(t)) {
          i.isValid = true;
        } else {
          if (e.type === "insert" && !this.isRowDataModified(e)) {
            i.isValid = true;
            return;
          }
          this.setDisableApplyValidationResults(true);
          if (y.default.getGroupConfig(i)) {
            var o = y.default.validateGroup(i);
            (0, r.when)(o.complete || o).done(function (e) {
              i.isValid = e.isValid;
              i.brokenRules = e.brokenRules;
            });
          } else if (!i.brokenRules || !i.brokenRules.length) {
            i.isValid = true;
          }
          this.setDisableApplyValidationResults(false);
        }
      },
      setValidator: function (e) {
        this._currentCellValidator = e;
      },
      renderCellPendingIndicator: function (e) {
        var t = e.find(`.dx-pending-indicator`);
        if (!t.length) {
          var n = e;
          t = (0, i.default)("<div>").appendTo(n).addClass("dx-pending-indicator");
          this._createComponent(t, _.default);
          e.addClass("dx-validation-pending");
        }
      },
      disposeCellPendingIndicator: function (e) {
        var t = e.find(`.dx-pending-indicator`);
        if (t.length) {
          var n = _.default.getInstance(t);
          if (n) {
            n.dispose();
            n.$element().remove();
          }
          e.removeClass("dx-validation-pending");
        }
      },
      validationStatusChanged: function (e) {
        var t = e.validator;
        var n = t.option("validationGroup");
        var i = t.option("dataGetter")().column;
        this.updateCellValidationResult({
          rowKey: n.key,
          columnIndex: i.index,
          validationResult: e
        });
      },
      validatorInitialized: function (e) {
        e.component.on("validating", this.validationStatusChanged.bind(this));
        e.component.on("validated", this.validationStatusChanged.bind(this));
      },
      validatorDisposing: function (e) {
        var t = e.component;
        var n = t.option("validationGroup");
        var i = t.option("dataGetter")().column;
        var o = this.getCellValidationResult({
          rowKey: n == null ? undefined : n.key,
          columnIndex: i.index
        });
        if (P(o) && o.status === A) {
          this.cancelCellValidationResult({
            change: n,
            columnIndex: i.index
          });
        }
      },
      applyValidationResult: function (e, t) {
        var n = t.validator;
        var i = n.option("validationGroup");
        var o = n.option("dataGetter")().column;
        if (t.brokenRules) {
          t.brokenRules.forEach(function (e) {
            e.columnIndex = o.index;
            e.column = o;
          });
        }
        if (e) {
          var a = this.getCellValidationResult({
            rowKey: i.key,
            columnIndex: o.index
          });
          var r = P(a) && a.disabledPendingId === t.id;
          if (this._disableApplyValidationResults || r) {
            return;
          }
          if (t.status === O) {
            var s = e.find(":focus");
            if (!(0, x.focused)(s)) {
              f.default.trigger(s, "focus");
              f.default.trigger(s, p.default.down);
            }
          }
          var l = !o.editCellTemplate && this.getController("editorFactory").getEditorInstance(e);
          if (t.status === A) {
            if (l) {
              l.option("validationStatus", A);
            } else {
              this.renderCellPendingIndicator(e);
            }
          } else if (l) {
            l.option("validationStatus", E);
          } else {
            this.disposeCellPendingIndicator(e);
          }
          e.toggleClass(this.addWidgetPrefix("invalid"), t.status === O);
        }
      },
      _syncInternalEditingData: function (e) {
        var n = this._editingController;
        var i = n.getChangeByKey(e.key);
        var o = n._getOldData(e.key);
        var a = e.row?.oldData;
        if (i && a && !o) {
          n._addInternalData({
            key: e.key,
            oldData: a
          });
        }
      },
      createValidator: function (e, t) {
        var r = this;
        var l = this._editingController;
        var u = e.column;
        var d = u.showEditorAlways;
        if (!(0, c.isDefined)(u.command) && u.validationRules && Array.isArray(u.validationRules) && u.validationRules.length) {
          var f = l.getIndexByKey(e.key, l.getChanges()) > -1;
          if (!f) {
            if (!d) {
              var p = this.getController("columns");
              d = ((p == null ? undefined : p.getVisibleColumns()) || []).some(function (e) {
                return e.showEditorAlways;
              });
            }
            var g = (0, a.equalByValue)(this.option("editing.editRowKey"), e.key);
            var m = l.isCellOrBatchEditMode() && l.allowUpdating({
              row: e.row
            });
            f = g || m && d;
            if (m && d) {
              l._addInternalData({
                key: e.key,
                oldData: e.row?.oldData ?? e.data
              });
            }
          }
          if (f) {
            if (t && !t.length) {
              w.default.log("E1050");
              return;
            }
            this._syncInternalEditingData(e);
            var _ = this._getValidationData(e.key, true);
            function v() {
              var t = l.getChangeByKey(_ == null ? undefined : _.key);
              var n = u.calculateCellValue((t == null ? undefined : t.data) || {});
              if (n !== undefined) {
                return n;
              } else {
                return e.value;
              }
            }
            var y = t && t.hasClass("dx-widget");
            if (t) {
              t.addClass(this.addWidgetPrefix("validator"));
            }
            var x = new b.default(t || (0, i.default)("<div>"), {
              name: u.caption,
              validationRules: (0, s.extend)(true, [], u.validationRules),
              validationGroup: _,
              adapter: y ? null : {
                getValue: v,
                applyValidationResults: function (e) {
                  r.applyValidationResult(t, e);
                }
              },
              dataGetter: function () {
                var e = _ == null ? undefined : _.key;
                var t = l.getChangeByKey(e);
                var n = l._getOldData(e);
                return {
                  data: (0, h.createObjectWithChanges)(n, t == null ? undefined : t.data),
                  column: u
                };
              },
              onInitialized: this.validatorInitialized.bind(this),
              onDisposing: this.validatorDisposing.bind(this)
            });
            if (y) {
              var C = x.option("adapter");
              if (C) {
                var S = C.bypass;
                C.getValue = v;
                C.validationRequestsCallbacks = [];
                C.bypass = function () {
                  return S.call(C) || e.row.isNewRow && !r._isValidationInProgress && !l.isCellModified(e);
                };
              }
            }
            return x;
          }
        }
      },
      setDisableApplyValidationResults: function (e) {
        this._disableApplyValidationResults = e;
      },
      getDisableApplyValidationResults: function () {
        return this._disableApplyValidationResults;
      },
      isCurrentValidatorProcessing: function (e) {
        var t = e.rowKey;
        var n = e.columnIndex;
        return this._currentCellValidator && (0, a.equalByValue)(this._currentCellValidator.option("validationGroup").key, t) && this._currentCellValidator.option("dataGetter")().column.index === n;
      },
      validateCell: function (e) {
        var t = {
          rowKey: e.option("validationGroup").key,
          columnIndex: e.option("dataGetter")().column.index
        };
        var n = this.getCellValidationResult(t);
        var i = P(n);
        var o = e.option("adapter");
        if (i) {
          var s = o.getValue();
          if (!(0, a.equalByValue)(s, n.value)) {
            n = e.validate();
          }
        } else {
          n = e.validate();
        }
        var l = new r.Deferred();
        if (i && n.status === A) {
          this.updateCellValidationResult(t);
          o.applyValidationResults(n);
        }
        (0, r.when)(n.complete || n).done(function (e) {
          if (i) {
            o.applyValidationResults(e);
          }
          l.resolve(e);
        });
        return l.promise();
      },
      updateCellValidationResult: function (e) {
        var t = e.rowKey;
        var n = e.columnIndex;
        var i = e.validationResult;
        var o = this._getValidationData(t);
        if (o) {
          var a;
          o.validationResults ||= {};
          if (i) {
            a = (0, s.extend)({}, i);
            o.validationResults[n] = a;
            if (i.status === A && (this._editingController.getEditMode() === "cell" && (a.deferred = new r.Deferred(), a.complete.always(function () {
              a.deferred.resolve();
            }), this._editingController.addDeferred(a.deferred)), this._disableApplyValidationResults)) {
              a.disabledPendingId = i.id;
              return;
            }
          } else {
            a = o.validationResults[n];
          }
          if (a && a.disabledPendingId) {
            delete a.disabledPendingId;
          }
        }
      },
      getCellValidationResult: function (e) {
        var n = e.rowKey;
        var i = e.columnIndex;
        var o = this._getValidationData(n, true);
        return (o == null ? undefined : o.validationResults)?.[i];
      },
      removeCellValidationResult: function (e) {
        var t = e.change;
        var n = e.columnIndex;
        var i = this._getValidationData(t == null ? undefined : t.key);
        if (i && i.validationResults) {
          this.cancelCellValidationResult({
            change: t,
            columnIndex: n
          });
          delete i.validationResults[n];
        }
      },
      cancelCellValidationResult: function (e) {
        var t = e.change;
        var n = e.columnIndex;
        var i = this._getValidationData(t.key);
        if (t && i.validationResults) {
          var o = i.validationResults[n];
          if (o) {
            if (o.deferred) {
              o.deferred.reject("cancel");
            }
            i.validationResults[n] = "cancel";
          }
        }
      },
      resetRowValidationResults: function (e) {
        if (e) {
          if (e.validationResults) {
            delete e.validationResults;
          }
          delete e.validated;
        }
      },
      isInvalidCell: function (e) {
        var t = e.rowKey;
        var n = e.columnIndex;
        var i = this.getCellValidationResult({
          rowKey: t,
          columnIndex: n
        });
        return P(i) && i.status === O;
      },
      getCellValidator: function (e) {
        var t = e.rowKey;
        var n = e.columnIndex;
        var i = this._getValidationData(t);
        var o = i && y.default.getGroupConfig(i);
        var a = o && o.validators;
        return a && a.filter(function (e) {
          var t = e.option("dataGetter")().column;
          return !!t && t.index === n;
        })[0];
      },
      setCellValidationStatus: function (e) {
        var t = this.getCellValidationResult({
          rowKey: e.key,
          columnIndex: e.column.index
        });
        if ((0, c.isDefined)(t)) {
          e.validationStatus = t !== "cancel" ? t.status : "cancel";
        } else {
          delete e.validationStatus;
        }
      }
    })
  },
  extenders: {
    controllers: {
      editing: {
        _addChange: function (e) {
          var t = this.callBase.apply(this, arguments);
          var n = this.getController("validating");
          if (t && e.type !== "remove") {
            n.updateValidationState(t);
          }
          return t;
        },
        _handleChangesChange: function (e) {
          this.callBase.apply(this, arguments);
          var t = this.getController("validating");
          e.value.forEach(function (e) {
            if (t._getValidationData(e.key) === undefined) {
              t.updateValidationState(e);
            }
          });
        },
        _updateRowAndPageIndices: function () {
          var e = this;
          var t = this;
          var n = t.getView("rowsView").getTopVisibleItemIndex();
          var i = n;
          (0, l.each)(t.getChanges(), function (o, a) {
            var r = a.key;
            var s = a.type;
            var l = e.getController("validating")._getValidationData(r);
            if (l && !l.isValid && l.pageIndex !== t._pageIndex) {
              l.pageIndex = t._pageIndex;
              l.rowIndex = s === "insert" ? n : i;
              i++;
            }
          });
        },
        _getValidationGroupsInForm: function (e) {
          return {
            validationGroup: this.getController("validating")._getValidationData(e.key, true)
          };
        },
        _validateEditFormAfterUpdate: function (e, t) {
          if (t && this._editForm) {
            this._editForm.validate();
          }
          this.callBase.apply(this, arguments);
        },
        _prepareEditCell: function (e) {
          var t = this.callBase.apply(this, arguments);
          var n = this.getController("validating");
          if (t && e.column.showEditorAlways) {
            n.updateValidationState({
              key: e.key
            });
          }
          return t;
        },
        processItems: function (e, t) {
          var n = this;
          var i = this.getChanges();
          var o = this.getController("data");
          var r = this.getController("validating");
          var s = (e = this.callBase(e, t)).length;
          function u(t, n) {
            var i = {
              key: t.key
            };
            if (!(function (e, t) {
              var n = -1;
              var i = e.type === "insert";
              var r = e.key;
              (0, l.each)(t, function (e, t) {
                if ((0, a.equalByValue)(r, i ? t.key : o.keyOf(t))) {
                  n = e;
                  return false;
                }
              });
              return n;
            }(t, e) >= 0)) {
              n.rowIndex = n.rowIndex > s ? n.rowIndex % s : n.rowIndex;
              var r = n.rowIndex;
              i.__DX_INSERT_INDEX__ = 1;
              e.splice(r, 0, i);
            }
          }
          if (this.getEditMode() === "batch" && t !== "prepend" && t !== "append") {
            i.forEach(function (e) {
              var t = e.key;
              var i = r._getValidationData(t);
              if (i && e.type && i.pageIndex === n._pageIndex && (e == null ? undefined : e.pageIndex) !== n._pageIndex) {
                u(e, i);
              }
            });
          }
          return e;
        },
        processDataItem: function (e) {
          var t = e.data.__DX_INSERT_INDEX__;
          var n = t ? e.data.key : e.key;
          var i = this.getEditMode();
          if (i === "batch" && t && n) {
            var o = this.getChanges();
            var a = S.default.getIndexByKey(n, o);
            if (a >= 0) {
              var r = o[a];
              if (r.type !== "insert") {
                var l = this._getOldData(r.key);
                e.data = (0, s.extend)(true, {}, l, r.data);
                e.key = n;
              }
            }
          }
          this.callBase.apply(this, arguments);
        },
        _createInvisibleColumnValidators: function (e) {
          var t = this;
          var n = this;
          var i = this.getController("validating");
          var o = this.getController("columns");
          var a = o.getColumns();
          var r = o.getInvisibleColumns().filter(function (e) {
            return !e.isBand;
          });
          var s = o.getGroupColumns().filter(function (e) {
            return !e.showWhenGrouped && r.indexOf(e) === -1;
          });
          var u = [];
          r.push.apply(r, D(s));
          if (!T.includes(this.getEditMode())) {
            (0, l.each)(a, function (o, a) {
              e.forEach(function (e) {
                var o;
                if (!function (e, n) {
                  return t._dataController.getRowIndexByKey(n) >= 0 && r.indexOf(e) < 0;
                }(a, e.key)) {
                  if (e.type === "insert") {
                    o = e.data;
                  } else if (e.type === "update") {
                    var s = n._getOldData(e.key);
                    if (!(0, c.isDefined)(s)) {
                      return;
                    }
                    o = (0, h.createObjectWithChanges)(s, e.data);
                  }
                  if (o) {
                    var l = i.createValidator({
                      column: a,
                      key: e.key,
                      value: a.calculateCellValue(o)
                    });
                    if (l) {
                      u.push(l);
                    }
                  }
                }
              });
            });
          }
          return function () {
            u.forEach(function (e) {
              e.dispose();
            });
          };
        },
        _beforeSaveEditData: function (e, t) {
          var n = this;
          var i = this.callBase.apply(this, arguments);
          var o = this.getController("validating");
          var a = o._getValidationData(e == null ? undefined : e.key);
          if (e) {
            var s = e.type === "remove" || a.isValid;
            i = i || !s;
          } else {
            var l = this._createInvisibleColumnValidators(this.getChanges());
            i = new r.Deferred();
            this.executeOperation(i, function () {
              o.validate(true).done(function (e) {
                l();
                n._updateRowAndPageIndices();
                switch (n.getEditMode()) {
                  case "cell":
                    if (!e) {
                      n._focusEditingCell();
                    }
                    break;
                  case "batch":
                    if (!e) {
                      n._resetEditRowKey();
                      n._resetEditColumnName();
                      n.getController("data").updateItems();
                    }
                }
                i.resolve(!e);
              });
            });
          }
          if (i.promise) {
            return i.promise();
          } else {
            return i;
          }
        },
        _beforeEditCell: function (e, t, n) {
          var i = this.callBase(e, t, n);
          if (this.getEditMode() === "cell") {
            var o = this._rowsView._getCellElement(e, t);
            var a = o && o.data("dxValidator");
            var s = o && o.closest(".dx-row").data("options");
            var l = a && a.option("adapter").getValue();
            if (a && M(l, s)) {
              var u = this.getController("validating");
              var d = new r.Deferred();
              (0, r.when)(u.validateCell(a), i).done(function (e, t) {
                d.resolve(e.status === E && t);
              });
              return d.promise();
            }
            if (!a) {
              return i;
            }
          }
        },
        _afterSaveEditData: function (e) {
          var t;
          var n = this;
          var i = this.getEditMode() === "cell";
          (0, l.each)(this.getChanges(), function (e, i) {
            var o = n._showErrorRow(i);
            t = t || o;
          });
          if (t) {
            var o = this._rowsView.getScrollable();
            if (o) {
              o.update();
              o.scrollToElement(t);
            }
          }
          if (e && i && this._needUpdateRow()) {
            var a = this.getEditRowIndex();
            this._dataController.updateItems({
              changeType: "update",
              rowIndices: [a]
            });
            this._focusEditingCell();
          } else if (!e) {
            var r = true;
            if (i) {
              r = !(this.getController("columns").getColumns().filter(function (e) {
                return e.showEditorAlways && e.validationRules?.length > 0;
              }).length > 0);
            }
            if (r) {
              this.getController("validating").initValidationState();
            }
          }
        },
        _handleDataChanged: function (e) {
          var t = this.getController("validating")._validationState;
          if (this.option("scrolling.mode") === "standard") {
            this.resetRowAndPageIndices();
          }
          if (e.changeType === "prepend") {
            (0, l.each)(t, function (t, n) {
              n.rowIndex += e.items.length;
            });
          }
          this.callBase(e);
        },
        resetRowAndPageIndices: function () {
          var e = this;
          var t = this.getController("validating")._validationState;
          (0, l.each)(t, function (t, n) {
            if (n.pageIndex !== e._pageIndex) {
              delete n.pageIndex;
              delete n.rowIndex;
            }
          });
        },
        _beforeCancelEditData: function () {
          this.getController("validating").initValidationState();
          this.callBase();
        },
        _showErrorRow: function (e) {
          var t;
          var n = this.getController("errorHandling");
          var i = this.getController("data").items();
          var o = this.getIndexByKey(e.key, i);
          var a = this.getController("validating")._getValidationData(e.key);
          if (!(a == null ? undefined : a.isValid) && (a == null ? undefined : a.errorText) && o >= 0) {
            t = this.getPopupContent();
            return n && n.renderErrorRow(a == null ? undefined : a.errorText, o, t);
          }
        },
        updateFieldValue: function (e) {
          var t = this;
          var n = this.getController("validating");
          var i = new r.Deferred();
          n.removeCellValidationResult({
            change: this.getChangeByKey(e.key),
            columnIndex: e.column.index
          });
          this.callBase.apply(this, arguments).done(function () {
            var o = n.getCellValidator({
              rowKey: e.key,
              columnIndex: e.column.index
            });
            (0, r.when)(o && n.validateCell(o)).done(function (e) {
              t.getController("editorFactory").refocus();
              i.resolve(e);
            });
          });
          return i.promise();
        },
        highlightDataCell: function (e, t) {
          this.callBase.apply(this, arguments);
          var n = this.getController("validating");
          n.setCellValidationStatus(t);
          var i = !!t.setValue;
          var o = this.isCellModified(t);
          var a = (0, c.isDefined)(t.validationStatus);
          var s = o && t.column.setCellValue || i && !o && !t.row.isNewRow && !!a;
          if (s) {
            var l = e.data("dxValidator");
            if (l) {
              (0, r.when)(this.getController("validating").validateCell(l)).done(function () {
                n.setCellValidationStatus(t);
              });
            }
          }
        },
        getChangeByKey: function (e) {
          var t = this.getChanges();
          return t[S.default.getIndexByKey(e, t)];
        },
        isCellModified: function (e) {
          var t = this.callBase(e);
          var n = this.getChangeByKey(e.key);
          var i = !!e.row && this.getController("validating").isInvalidCell({
            rowKey: e.key,
            columnIndex: e.column.index
          });
          return t || this.getController("validating")._rowIsValidated(n) && i;
        }
      },
      editorFactory: {
        _showRevertButton: function (e) {
          var t;
          var n = this;
          var o = (t = this._revertTooltip) === null || t === undefined ? undefined : t.$element();
          if (!e || !e.length) {
            if (o != null) {
              o.remove();
            }
            this._revertTooltip = undefined;
            return;
          }
          if (!e.find(o).length) {
            var a = e.closest(`.${this.addWidgetPrefix("content")}`);
            var r = this.addWidgetPrefix("revert-tooltip");
            if (o != null) {
              o.remove();
            }
            o = (0, i.default)("<div>").addClass(r).appendTo(e);
            var s = {
              animation: null,
              visible: true,
              width: "auto",
              height: "auto",
              shading: false,
              container: a,
              propagateOutsideClick: true,
              hideOnOutsideClick: false,
              wrapperAttr: {
                class: r
              },
              contentTemplate: function () {
                var e = (0, i.default)("<div>").addClass("dx-revert-button");
                var t = {
                  icon: "revert",
                  hint: n.option("editing.texts.validationCancelChanges"),
                  onClick: function () {
                    n._editingController.cancelEditData();
                  }
                };
                return new m.default(e, t).$element();
              },
              position: {
                my: "left top",
                at: "right top",
                offset: "1 0",
                collision: "flip",
                boundaryOffset: "0 0",
                boundary: this._rowsView.element(),
                of: e
              },
              onPositioned: this._positionedHandler.bind(this)
            };
            this._revertTooltip = new v.default(o, s);
          }
        },
        _hideFixedGroupCell: function (e, t) {
          var n;
          var o;
          var a = this._rowsView.isFixedColumns();
          var r = this._editingController.isFormOrPopupEditMode();
          if (a && !r) {
            var s = e.closest(".dx-row").next().data("options");
            if (s && s.rowType === "group") {
              n = (0, i.default)(this._rowsView.getRowElement(s.rowIndex)).last();
              if ((o = n.find(`.dx-group-cell`)).length && o.get(0).style.visibility !== "hidden") {
                o.css("visibility", "hidden");
                t.onDisposing = function () {
                  o.css("visibility", "");
                };
              }
            }
          }
        },
        _positionedHandler: function (e, t) {
          if (!e.component.__skipPositionProcessing) {
            var n = (0, i.default)(e.element).hasClass(this.addWidgetPrefix("revert-tooltip"));
            var o = !n && this._rowsView.updateFreeSpaceRowHeight();
            var a = this._normalizeValidationMessagePositionAndMaxWidth(e, n, t);
            e.component.__skipPositionProcessing = !!o || !!a;
            if (a) {
              e.component.option(a);
            } else if (o) {
              e.component.repaint();
            }
          }
        },
        _showValidationMessage: function (e, t, n) {
          var r = this;
          var s = e.find(".dx-dropdowneditor-overlay").data("dxPopup");
          var l = s && s.option("visible");
          var u = l ? "top right" : `top ${n}`;
          var c = l ? "top left" : `bottom ${n}`;
          var h = this._columnsController.getFixedColumns()?.length > 0 ? this.getView("rowsView").element() : e.closest(`.${this.addWidgetPrefix("content")}`);
          var f = "";
          if (t) {
            t.forEach(function (e) {
              f += (f.length ? "<br/>" : "") + (0, d.encodeHtml)(e);
            });
          }
          var p = this.addWidgetPrefix("invalid-message");
          this._rowsView.element().find(`.${p}`).remove();
          var g = (0, i.default)("<div>").addClass("dx-invalid-message").addClass("dx-invalid-message-always").addClass(p).html(f).appendTo(e);
          var m = {
            container: h,
            shading: false,
            width: "auto",
            height: "auto",
            visible: true,
            animation: false,
            propagateOutsideClick: true,
            hideOnOutsideClick: false,
            wrapperAttr: {
              class: `dx-invalid-message dx-invalid-message-always ${p}`
            },
            position: {
              collision: "flip",
              boundary: this._rowsView.element(),
              boundaryOffset: "0 0",
              offset: {
                x: 0,
                y: !l && o.default.mozilla ? -1 : 0
              },
              my: u,
              at: c,
              of: e
            },
            onPositioned: function (t) {
              r._positionedHandler(t, l);
              r._shiftValidationMessageIfNeed(t.component.$content(), e);
            }
          };
          this._hideFixedGroupCell(e, m);
          new v.default(g, m);
        },
        _hideValidationMessage: function () {
          var e;
          var t = (e = this._rowsView.element()) === null || e === undefined ? undefined : e.find(this._getValidationMessagesSelector());
          if (t != null) {
            t.remove();
          }
        },
        _normalizeValidationMessagePositionAndMaxWidth: function (e, t, n) {
          var o = this._columnsController.getFixedColumns();
          if (o && o.length) {
            var a;
            var r;
            var s;
            var l;
            var d;
            var c = !t && (r = this, s = e.element, l = (0, i.default)(s).closest("tr").index(), d = (0, i.default)(r._rowsView.getRowElement(l)).first().children().filter(":not(.dx-hidden-cell)"), r._rowsView._getWidths(d).reduce(function (e, t) {
              return e + t;
            }, 0));
            var h = e.component.$content();
            var f = (0, u.getOuterWidth)(h, true);
            var p = !t && f > c;
            var g = this._rowsView.getCellIndex((0, i.default)(e.element).closest("td"));
            var m = function (e) {
              var t;
              var n;
              e.some(function (i, o) {
                if (i.command === "transparent") {
                  t = o === 0 ? -1 : o;
                  n = o === e.length - 1 ? -1 : o + i.colspan - 1;
                  return true;
                }
              });
              return {
                startColumnIndex: t,
                endColumnIndex: n
              };
            }(o);
            if (t || g !== m.startColumnIndex && !p) {
              if (g === m.endColumnIndex) {
                a = {
                  collision: "none flip",
                  my: "top right",
                  at: t || n ? "top left" : "bottom right"
                };
                if (t) {
                  a.offset = "-1 0";
                }
              }
            } else {
              a = {
                collision: "none flip",
                my: "top left",
                at: n ? "top right" : "bottom left"
              };
            }
            return a && {
              position: a,
              maxWidth: p ? c - 2 : undefined
            };
          }
        },
        _shiftValidationMessageIfNeed: function (e, t) {
          var n = this._revertTooltip && this._revertTooltip.$content();
          if (n) {
            var i = e.offset();
            var o = n.offset();
            if (i.top === o.top && i.left + (0, u.getWidth)(e) > o.left) {
              var a = (0, u.getWidth)(n) + 2;
              e.css("left", o.left < t.offset().left ? -a : a);
            }
          }
        },
        _getRevertTooltipsSelector: function () {
          var e = this.addWidgetPrefix("revert-tooltip");
          return `.dx-editor-cell .${e}`;
        },
        _getValidationMessagesSelector: function () {
          var e = this.addWidgetPrefix("invalid-message");
          return `.dx-editor-cell .${e}, .dx-cell-modified .${e}`;
        },
        init: function () {
          this.callBase();
          this._editingController = this.getController("editing");
          this._columnsController = this.getController("columns");
          this._rowsView = this.getView("rowsView");
        },
        loseFocus: function (e) {
          if (!e) {
            this.getController("validating").setValidator(null);
          }
          this.callBase();
        },
        updateCellState: function (e, t, n) {
          var o = e == null ? undefined : e.closest(this._getFocusCellSelector());
          var a = (o == null ? undefined : o.is("td")) ? o : null;
          var r = o == null ? undefined : o.closest(".dx-row").data("options");
          var s = r ? this.getController("editing").getChangeByKey(r.key) : null;
          var l = a && this.getController("columns").getVisibleColumns()[a.index()];
          var u = (s == null ? undefined : s.data)?.[l == null ? undefined : l.name] !== undefined && !this._editingController.isSaving();
          if (this._editingController.getEditMode() === "cell") {
            if ((t == null ? undefined : t.status) === O || u) {
              this._showRevertButton(o);
            } else if (this._revertTooltip) {
              this._revertTooltip.$element().remove();
            }
          }
          if (t && t.status === O && a && l && t && t.brokenRules) {
            var d = [];
            t.brokenRules.forEach(function (e) {
              if (e.message) {
                d.push(e.message);
              }
            });
            if (d.length) {
              this._showValidationMessage(o, d, l.alignment || "left");
            }
          }
          if (!n && this._rowsView.element()) {
            this._rowsView.updateFreeSpaceRowHeight();
          }
        },
        focus: function (e, t) {
          var n = this;
          if (!arguments.length) {
            return this.callBase();
          }
          this._hideValidationMessage();
          if ((e == null ? undefined : e.hasClass("dx-row")) || (e == null ? undefined : e.hasClass("dx-master-detail-cell"))) {
            return this.callBase(e, t);
          }
          var i;
          var o = e == null ? undefined : e.closest(this._getFocusCellSelector());
          var a = this.callBase;
          var s = o && (o.data("dxValidator") || e.find(`.${this.addWidgetPrefix("validator")}`).eq(0).data("dxValidator"));
          var l = o && o.closest(".dx-row").data("options");
          var u = this.getController("editing");
          var d = l ? u.getChangeByKey(l.key) : null;
          var c = this.getController("validating");
          if (s) {
            c.setValidator(s);
            var h = s.option("adapter").getValue();
            if (M(h, l) || c._rowIsValidated(d)) {
              u.waitForDeferredOperations().done(function () {
                (0, r.when)(c.validateCell(s)).done(function (o) {
                  var r = (i = o).validator.option("dataGetter")().column;
                  if (!d || !r || !!c.isCurrentValidatorProcessing({
                    rowKey: d.key,
                    columnIndex: r.index
                  })) {
                    if (i.status === O) {
                      t = true;
                    }
                    n.updateCellState(e, i, t);
                    a.call(n, e, t);
                  }
                });
              });
              return this.callBase(e, t);
            }
          }
          this.updateCellState(e, i, t);
          return this.callBase(e, t);
        },
        getEditorInstance: function (e) {
          var t = e.find(".dx-texteditor").eq(0);
          return S.default.getWidgetInstance(t);
        }
      },
      data: {
        _getValidationStatus: function (e) {
          return (P(e) ? e.status : e) || E;
        },
        _isCellChanged: function (e, t, n, o, a) {
          var l = e.cells?.[o];
          var u = this._getValidationStatus({
            status: l == null ? undefined : l.validationStatus
          });
          var d = this.getController("validating");
          var c = d.getCellValidationResult({
            rowKey: e.key,
            columnIndex: o
          });
          var h = d._getValidationData(e.key);
          var f = this._getValidationStatus(c);
          var p = JSON.stringify(t.modifiedValues) !== JSON.stringify(e.modifiedValues);
          var g = u !== f && p;
          var m = (0, i.default)(l == null ? undefined : l.cellElement).hasClass(this.addWidgetPrefix("invalid"));
          var _ = (l == null ? undefined : l.column.validationRules)?.length;
          var v = e.isEditing !== t.isEditing && _;
          var y = g || h.isValid && m;
          return !!v || !!y || this.callBase.apply(this, arguments);
        }
      }
    },
    views: {
      rowsView: {
        updateFreeSpaceRowHeight: function (e) {
          var t;
          var n;
          var i;
          var o = this.element();
          var a = o && o.find(`.${this.addWidgetPrefix("invalid-message")} .dx-overlay-content`);
          this.callBase(e);
          if (a && a.length && (t = this._getRowElements(), (n = (i = this._getFreeSpaceRowElements(e)).first()) && t.length === 1 && (!n.is(":visible") || (0, u.getOuterHeight)(a) > (0, u.getOuterHeight)(n)))) {
            i.show();
            (0, u.setHeight)(i, (0, u.getOuterHeight)(a));
            return true;
          }
        },
        _formItemPrepared: function (e, t) {
          var n = this;
          this.callBase.apply(this, arguments);
          (0, a.deferUpdate)(function () {
            var i = t.find(".dx-widget").first();
            if (!i.length || !!i.children().length) {
              n.getController("validating").createValidator(e, i);
            }
          });
        },
        _cellPrepared: function (e, t) {
          if (!this.getController("editing").isFormOrPopupEditMode()) {
            this.getController("validating").createValidator(t, e);
          }
          this.callBase.apply(this, arguments);
        },
        _restoreErrorRow: function (e) {
          var t = this.getController("editing");
          if (t && t.hasChanges()) {
            this._getRowElements(e).each(function (e, n) {
              var o = (0, i.default)(n).data("options");
              if (o) {
                var a = t.getChangeByKey(o.key);
                if (a) {
                  t._showErrorRow(a);
                }
              }
            });
          }
        }
      }
    }
  }
};
exports.validatingModule = R;