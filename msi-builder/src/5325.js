Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.focusModule = undefined;
var i = c(require("./68374.js"));
var o = require("./20576.js");
var a = require("./62754.js");
var r = require("./95479.js");
var s = require("./35922.js");
var l = c(require("./15943.js"));
var u = c(require("./60082.js"));
var d = require("./32710.js");
function c(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
var h = `.dx-row.dx-row-focused`;
var f = {
  defaultOptions: function () {
    return {
      focusedRowEnabled: false,
      autoNavigateToFocusedRow: true,
      focusedRowKey: null,
      focusedRowIndex: -1,
      focusedColumnIndex: -1
    };
  },
  controllers: {
    focus: l.default.ViewController.inherit({
      init: function () {
        this._dataController = this.getController("data");
        this._keyboardController = this.getController("keyboardNavigation");
        this.component._optionsByReference.focusedRowKey = true;
      },
      optionChanged: function (e) {
        var t = e.name;
        var n = e.value;
        var i = e.previousValue;
        switch (t) {
          case "focusedRowIndex":
            this._focusRowByIndex(n);
            this._keyboardController._fireFocusedRowChanged();
            e.handled = true;
            break;
          case "focusedRowKey":
            if (Array.isArray(n) && JSON.stringify(n) === JSON.stringify(i)) {
              return;
            }
            this._focusRowByKey(n);
            this._keyboardController._fireFocusedRowChanged();
            e.handled = true;
            break;
          case "focusedColumnIndex":
          case "focusedRowEnabled":
          case "autoNavigateToFocusedRow":
            e.handled = true;
            break;
          default:
            this.callBase(e);
        }
      },
      isAutoNavigateToFocusedRow: function () {
        return this.option("scrolling.mode") !== "infinite" && this.option("autoNavigateToFocusedRow");
      },
      _focusRowByIndex: function (e, t) {
        if (this.option("focusedRowEnabled")) {
          if ((e = e !== undefined ? e : this.option("focusedRowIndex")) < 0) {
            if (this.isAutoNavigateToFocusedRow()) {
              this._resetFocusedRow();
            }
          } else {
            this._focusRowByIndexCore(e, t);
          }
        }
      },
      _focusRowByIndexCore: function (e, t) {
        var n = this;
        var i = this.getController("data");
        var o = i.pageSize();
        function r() {
          if (n._isValidFocusedRowIndex(e)) {
            var o = e - i.getRowIndexOffset(true);
            if (!t || t.paging && !t.filtering) {
              var a = i._getLastItemIndex();
              o = Math.min(o, a);
            }
            var r = i.getKeyByRowIndex(o, true);
            if ((0, s.isDefined)(r) && !n.isRowFocused(r)) {
              n.option("focusedRowKey", r);
            }
          }
        }
        if (o >= 0) {
          if (this._isLocalRowIndex(e)) {
            r();
          } else {
            var l = Math.floor(e / i.pageSize());
            (0, a.when)(i.pageIndex(l), i.waitReady()).done(function () {
              r();
            });
          }
        }
      },
      _isLocalRowIndex: function (e) {
        var t = this.getController("data");
        if (this.getController("keyboardNavigation")._isVirtualScrolling()) {
          var n = Math.floor(e / t.pageSize());
          var i = t.virtualItemsCount();
          var o = i ? i.begin : -1;
          var a = t.getVisibleRows().length + t.getRowIndexOffset();
          var r = Math.ceil(a / t.pageSize());
          return o <= e && r > n;
        }
        return true;
      },
      _setFocusedRowKeyByIndex: function (e) {
        var t = this.getController("data");
        if (this._isValidFocusedRowIndex(e)) {
          var n = Math.min(e - t.getRowIndexOffset(), t.items().length - 1);
          var i = t.getKeyByRowIndex(n);
          if ((0, s.isDefined)(i) && !this.isRowFocused(i)) {
            this.option("focusedRowKey", i);
          }
        }
      },
      _focusRowByKey: function (e) {
        if ((0, s.isDefined)(e)) {
          this._navigateToRow(e, true);
        } else {
          this._resetFocusedRow();
        }
      },
      _resetFocusedRow: function () {
        var e = this.option("focusedRowKey");
        var t = (0, s.isDefined)(e);
        if (t || !(this.option("focusedRowIndex") < 0)) {
          var n = this.getController("keyboardNavigation");
          if (t) {
            this.option("focusedRowKey", null);
          }
          n.setFocusedRowIndex(-1);
          this.option("focusedRowIndex", -1);
          this.getController("data").updateItems({
            changeType: "updateFocusedRow",
            focusedRowKey: null
          });
          n._fireFocusedRowChanged(undefined, -1);
        }
      },
      _isValidFocusedRowIndex: function (e) {
        var t = this.getController("data").getVisibleRows()[e];
        return !t || t.rowType === "data" || t.rowType === "group";
      },
      publicMethods: function () {
        return ["navigateToRow", "isRowFocused"];
      },
      navigateToRow: function (e) {
        if (!this.isAutoNavigateToFocusedRow()) {
          this.option("focusedRowIndex", -1);
        }
        return this._navigateToRow(e);
      },
      _navigateToRow: function (e, t) {
        var n = this;
        var i = n.getController("data");
        var o = n.isAutoNavigateToFocusedRow();
        var r = new a.Deferred();
        if (e === undefined || !i.dataSource()) {
          return r.reject().promise();
        }
        var s = n.getFocusedRowIndexByKey(e);
        if (!o && t || s >= 0) {
          n._navigateTo(e, r, t);
        } else {
          i.getPageIndexByKey(e).done(function (o) {
            if (o < 0) {
              r.resolve(-1);
            } else if (o === i.pageIndex()) {
              i.reload().done(function () {
                if (n.isRowFocused(e) && i.getRowIndexByKey(e) >= 0) {
                  r.resolve(n.getFocusedRowIndexByKey(e));
                } else {
                  n._navigateTo(e, r, t);
                }
              }).fail(r.reject);
            } else {
              i.pageIndex(o).done(function () {
                n._navigateTo(e, r, t);
              }).fail(r.reject);
            }
          }).fail(r.reject);
        }
        return r.promise();
      },
      _navigateTo: function (e, t, n) {
        var i = this.getController("data").getRowIndexByKey(e);
        var o = u.default.isVirtualRowRendering(this);
        if (this.isAutoNavigateToFocusedRow() && o && i < 0) {
          this._navigateToVirtualRow(e, t, n);
        } else {
          this._navigateToVisibleRow(e, t, n);
        }
      },
      _navigateToVisibleRow: function (e, t, n) {
        if (n) {
          this._triggerUpdateFocusedRow(e, t);
        } else {
          var i = this.getFocusedRowIndexByKey(e);
          this.getView("rowsView").scrollToRowElement(e, t).done(function () {
            t.resolve(i);
          });
        }
      },
      _navigateToVirtualRow: function (e, t, n) {
        var i = this;
        var o = this.getController("data");
        var a = o._rowsScrollController;
        var r = u.default.getIndexByKey(e, o.items(true));
        var s = this.getView("rowsView").getScrollable();
        if (a && s && r >= 0) {
          var l = r + o.getRowIndexOffset(true);
          var d = a.getItemOffset(l);
          this.component.on("contentReady", function a() {
            if (!o.totalCount() || !!o.items().length) {
              i.component.off("contentReady", a);
              if (n) {
                i._triggerUpdateFocusedRow(e, t);
              } else {
                t.resolve(l);
              }
            }
          });
          this.getView("rowsView").scrollTopPosition(d);
        } else {
          t.resolve(-1);
        }
      },
      _triggerUpdateFocusedRow: function (e, t) {
        var n;
        var i = this;
        var o = this.getController("data");
        var r = this.getFocusedRowIndexByKey(e);
        if (this._isValidFocusedRowIndex(r)) {
          if (this.option("focusedRowEnabled")) {
            o.updateItems({
              changeType: "updateFocusedRow",
              focusedRowKey: e
            });
          } else {
            n = this.getView("rowsView").scrollToRowElement(e);
          }
          (0, a.when)(n).done(function () {
            i.getController("keyboardNavigation").setFocusedRowIndex(r);
            if (t) {
              t.resolve(r);
            }
          });
        } else if (t) {
          t.resolve(-1);
        }
      },
      getFocusedRowIndexByKey: function (e) {
        var t = this.getController("data");
        var n = t.getRowIndexByKey(e, true);
        if (n >= 0) {
          return n + t.getRowIndexOffset(true);
        } else {
          return -1;
        }
      },
      _focusRowByKeyOrIndex: function () {
        var e = this;
        var t = this.option("focusedRowKey");
        var n = this.option("focusedRowIndex");
        var i = this.getController("keyboardNavigation");
        var o = this.getController("data");
        if ((0, s.isDefined)(t)) {
          var a = o.getRowIndexByKey(t);
          if (a >= 0) {
            if (i._isVirtualScrolling()) {
              n = a + o.getRowIndexOffset();
            }
            i.setFocusedRowIndex(n);
            this._triggerUpdateFocusedRow(t);
          } else {
            this._navigateToRow(t, true).done(function (t) {
              if (n >= 0 && t < 0) {
                e._focusRowByIndex();
              } else if (n < 0 && t >= 0) {
                i.setFocusedRowIndex(t);
              }
            });
          }
        } else if (n >= 0) {
          this.getController("focus")._focusRowByIndex(n);
        }
      },
      isRowFocused: function (e) {
        var t = this.option("focusedRowKey");
        if ((0, s.isDefined)(t)) {
          return (0, o.equalByValue)(e, this.option("focusedRowKey"));
        }
      },
      updateFocusedRow: function (e) {
        var t;
        var n;
        var o = e.focusedRowKey;
        var a = this;
        var s = a._dataController.getRowIndexByKey(o);
        var l = a.getView("rowsView");
        (0, r.each)(l.getTableElements(), function (e, o) {
          var r = e === 0;
          t = (0, i.default)(o);
          a._clearPreviousFocusedRow(t, s);
          var l = a._prepareFocusedRow({
            changedItem: a._dataController.getVisibleRows()[s],
            $tableElement: t,
            focusedRowIndex: s
          });
          if (r) {
            n = l;
          }
        });
        if (n) {
          l.scrollToElementVertically(n);
        }
      },
      _clearPreviousFocusedRow: function (e, t) {
        var n = this;
        var o = e.find(h).filter(function (t, o) {
          var a = (0, i.default)(o).closest(`.${n.addWidgetPrefix("table")}`);
          return e.is(a);
        });
        o.removeClass("dx-row-focused").removeClass("dx-cell-focus-disabled").removeAttr("tabindex");
        o.children("td").removeAttr("tabindex");
        if (t !== 0) {
          (0, i.default)(this.getView("rowsView").getRowElement(0)).removeClass("dx-cell-focus-disabled").removeAttr("tabIndex");
        }
      },
      _prepareFocusedRow: function (e) {
        var t;
        var n = e.changedItem;
        if (n && (n.rowType === "data" || n.rowType === "group")) {
          var o = e.focusedRowIndex;
          var a = e.$tableElement;
          var r = this.option("tabindex") || 0;
          var s = this.getView("rowsView");
          (t = (0, i.default)(s._getRowElements(a).eq(o))).addClass("dx-row-focused").attr("tabindex", r);
        }
        return t;
      }
    })
  },
  extenders: {
    controllers: {
      keyboardNavigation: {
        init: function () {
          var e = this.option("focusedRowIndex");
          var t = this.option("focusedColumnIndex");
          this.createAction("onFocusedRowChanging", {
            excludeValidators: ["disabled", "readOnly"]
          });
          this.createAction("onFocusedRowChanged", {
            excludeValidators: ["disabled", "readOnly"]
          });
          this.createAction("onFocusedCellChanging", {
            excludeValidators: ["disabled", "readOnly"]
          });
          this.createAction("onFocusedCellChanged", {
            excludeValidators: ["disabled", "readOnly"]
          });
          this.callBase();
          this.setRowFocusType();
          this._focusedCellPosition = {};
          if ((0, s.isDefined)(e) && e >= 0) {
            this._focusedCellPosition.rowIndex = e;
          }
          if ((0, s.isDefined)(t) && t >= 0) {
            this._focusedCellPosition.columnIndex = t;
          }
        },
        setFocusedRowIndex: function (e) {
          this.callBase(e);
          this.option("focusedRowIndex", e);
        },
        setFocusedColumnIndex: function (e) {
          this.callBase(e);
          this.option("focusedColumnIndex", e);
        },
        _escapeKeyHandler: function (e, t) {
          if (!t && this.option("focusedRowEnabled")) {
            if (this.isCellFocusType()) {
              this.setRowFocusType();
              this._focus(this._getCellElementFromTarget(e.originalEvent.target), true);
            }
          } else {
            this.callBase(e, t);
          }
        },
        _updateFocusedCellPosition: function (e, t) {
          var n = this.callBase(e, t);
          if (n && n.columnIndex >= 0) {
            this._fireFocusedCellChanged(e);
          }
        }
      },
      editorFactory: {
        renderFocusOverlay: function (e, t) {
          var n;
          var i = this.getController("keyboardNavigation");
          var o = this.option("focusedRowEnabled");
          var a = this.getController("editing");
          if (o && (i == null ? undefined : i.isRowFocusType()) && !a.isEditing()) {
            if (o) {
              if (i._getElementType(e) === "row" && !e.hasClass("dx-row-focused")) {
                n = i.getFirstValidCellInRow(e);
                i.focus(n);
              }
            }
          } else {
            this.callBase(e, t);
          }
        }
      },
      columns: {
        getSortDataSourceParameters: function (e, t) {
          var n = this;
          var i = this.callBase.apply(this, arguments);
          var o = this.getController("data");
          var a = o._dataSource;
          var r = o.store();
          var s = r && r.key();
          var l = a && a.remoteOperations() || {};
          var u = Object.keys(l).every(function (e) {
            return !l[e];
          });
          if (s && (this.option("focusedRowEnabled") && this.getController("focus").isAutoNavigateToFocusedRow() !== false || t)) {
            var d = (s = Array.isArray(s) ? s : [s]).filter(function (e) {
              return !n.columnOption(e, "sortOrder");
            });
            if (d.length) {
              i = i || [];
              if (u) {
                i.push({
                  selector: a.getDataIndexGetter(),
                  desc: false
                });
              } else {
                d.forEach(function (e) {
                  return i.push({
                    selector: e,
                    desc: false
                  });
                });
              }
            }
          }
          return i;
        }
      },
      data: {
        _applyChange: function (e) {
          if (!e || e.changeType !== "updateFocusedRow") {
            return this.callBase.apply(this, arguments);
          }
        },
        _fireChanged: function (e) {
          this.callBase(e);
          if (this.option("focusedRowEnabled") && this._dataSource) {
            var t = e.changeType === "update" && e.repaintChangesOnly && e.changeTypes && e.changeTypes.indexOf("remove") >= 0;
            if (e.changeType === "refresh" && e.items.length || t) {
              this._updatePageIndexes();
              this._updateFocusedRow(e);
            } else if (e.changeType === "append" || e.changeType === "prepend") {
              this._updatePageIndexes();
            } else if (e.changeType === "update" && e.repaintChangesOnly) {
              this._updateFocusedRow(e);
            }
          }
        },
        _updatePageIndexes: function () {
          var e = this._lastRenderingPageIndex || 0;
          var t = this._rowsScrollController ? this._rowsScrollController.pageIndex() : 0;
          this._lastRenderingPageIndex = t;
          this._isPagingByRendering = t !== e;
        },
        isPagingByRendering: function () {
          return this._isPagingByRendering;
        },
        _updateFocusedRow: function (e) {
          var t = e.operationTypes || {};
          var n = this.getController("focus");
          var i = t.reload;
          var o = t.fullReload;
          var a = t.pageIndex;
          var r = t.paging;
          var l = this.getController("keyboardNavigation")._isVirtualScrolling();
          var u = r && !l;
          var d = this.option("focusedRowKey");
          var c = n.isAutoNavigateToFocusedRow();
          if (i && a === false && !o && (0, s.isDefined)(d)) {
            n._navigateToRow(d, true).done(function (e) {
              if (e < 0) {
                n._focusRowByIndex(undefined, t);
              }
            });
          } else if (u && c) {
            var h = this.getRowIndexByKey(d);
            var f = this.option("focusedRowIndex");
            if (!!(f >= 0) && (f === h || !(h >= 0))) {
              n._focusRowByIndex(f, t);
            }
          } else if (u && !c && this.getRowIndexByKey(d) < 0) {
            this.option("focusedRowIndex", -1);
          } else if (t.fullReload) {
            n._focusRowByKeyOrIndex();
          }
        },
        getPageIndexByKey: function (e) {
          var t = this;
          var n = new a.Deferred();
          t.getGlobalRowIndexByKey(e).done(function (e) {
            n.resolve(e >= 0 ? Math.floor(e / t.pageSize()) : -1);
          }).fail(n.reject);
          return n.promise();
        },
        getGlobalRowIndexByKey: function (e) {
          if (this._dataSource.group()) {
            return this._calculateGlobalRowIndexByGroupedData(e);
          } else {
            return this._calculateGlobalRowIndexByFlatData(e);
          }
        },
        _calculateGlobalRowIndexByFlatData: function (e, t, n) {
          var i = this;
          var o = new a.Deferred();
          var r = i._dataSource;
          if (Array.isArray(e)) {
            return o.resolve(-1).promise();
          }
          var s = i._generateFilterByKey(e);
          r.load({
            filter: i._concatWithCombinedFilter(s),
            skip: 0,
            take: 1
          }).done(function (a) {
            if (a.length > 0) {
              s = i._generateOperationFilterByKey(e, a[0], n);
              r.load({
                filter: i._concatWithCombinedFilter(s, t),
                skip: 0,
                take: 1,
                requireTotalCount: true
              }).done(function (e, t) {
                o.resolve(t.totalCount);
              });
            } else {
              o.resolve(-1);
            }
          });
          return o.promise();
        },
        _concatWithCombinedFilter: function (e, t) {
          var n = this.getCombinedFilter();
          return u.default.combineFilters([e, n, t]);
        },
        _generateBooleanFilter: function (e, t, n) {
          var i = n.desc;
          switch (true) {
            case t === false && i:
              return [e, "=", true];
            case t === false && !i:
              return [e, "=", null];
            case t === true && !i:
            case !(0, s.isBoolean)(t) && i:
              return [e, "<>", t];
            default:
              return;
          }
        },
        _generateOperationFilterByKey: function (e, t, n) {
          var i = this;
          var o = i.option("dateSerializationFormat");
          var a = i._dataSource.remoteOperations().filtering;
          var r = i._generateFilterByKey(e, "<");
          var l = i._columnsController.getSortDataSourceParameters(!a, true);
          if (n) {
            var u = i._columnsController.getGroupDataSourceParameters(!a);
            if (u) {
              l = l ? u.concat(l) : u;
            }
          }
          if (l) {
            l.slice().reverse().forEach(function (e) {
              var n = e.selector;
              var l = e.desc;
              var u = e.compare;
              var c = d.UiGridCoreFocusUtils.getSortFilterValue(e, t, {
                isRemoteFiltering: a,
                dateSerializationFormat: o,
                getSelector: function (e) {
                  return i._columnsController.columnOption(e, "selector");
                }
              });
              var h = c.getter;
              var f = c.rawValue;
              var p = c.safeValue;
              r = [[n, "=", p], "and", r];
              if (f === null || (0, s.isBoolean)(f)) {
                var g = i._generateBooleanFilter(n, p, l);
                if (g) {
                  r = [g, "or", r];
                }
              } else {
                var m;
                var _ = l ? ">" : "<";
                if (u) {
                  m = function (e) {
                    if (_ === "<") {
                      return u(f, h(e)) >= 1;
                    } else {
                      return u(f, h(e)) <= -1;
                    }
                  };
                } else {
                  m = [n, _, p];
                  if (!l) {
                    m = [m, "or", [n, "=", null]];
                  }
                }
                r = [m, "or", r];
              }
            });
          }
          return r;
        },
        _generateFilterByKey: function (e, t) {
          var n = this._dataSource.key();
          var i = [];
          t ||= "=";
          if (Array.isArray(n)) {
            for (var o = 0; o < n.length; ++o) {
              var a = e[n[o]];
              if (a) {
                if (i.length > 0) {
                  i.push("and");
                }
                i.push([n[o], t, a]);
              }
            }
          } else {
            i = [n, t, e];
          }
          return i;
        },
        _getLastItemIndex: function () {
          return this.items(true).length - 1;
        }
      },
      editing: {
        _deleteRowCore: function (e) {
          var t = this;
          var n = this.callBase.apply(this, arguments);
          var i = this.getController("data");
          var o = i.getKeyByRowIndex(e);
          n.done(function () {
            var e = i.getRowIndexByKey(o);
            var n = i.getVisibleRows();
            if (e === -1 && !n.length) {
              t.getController("focus")._resetFocusedRow();
            }
          });
        }
      }
    },
    views: {
      rowsView: {
        _createRow: function (e) {
          var t = this.callBase.apply(this, arguments);
          if (this.option("focusedRowEnabled") && e && this.getController("focus").isRowFocused(e.key)) {
            t.addClass("dx-row-focused");
          }
          return t;
        },
        _checkRowKeys: function (e) {
          this.callBase.apply(this, arguments);
          if (this.option("focusedRowEnabled") && this.option("dataSource")) {
            var t = this._dataController.store();
            if (t && !t.key()) {
              this._dataController.fireError("E1042", "Row focusing");
            }
          }
        },
        _update: function (e) {
          if (e.changeType === "updateFocusedRow") {
            if (this.option("focusedRowEnabled")) {
              this.getController("focus").updateFocusedRow(e);
            }
          } else {
            this.callBase(e);
          }
        },
        updateFocusElementTabIndex: function (e, t) {
          if (this.option("focusedRowEnabled")) {
            this._setFocusedRowElementTabIndex(t);
          } else {
            this.callBase(e);
          }
        },
        _setFocusedRowElementTabIndex: function (e) {
          var t = this;
          var n = this.option("focusedRowKey");
          var i = this.option("tabIndex") || 0;
          var o = this._dataController;
          var a = this._columnsController;
          var r = o.getRowIndexByKey(n);
          var l = this.option("focusedColumnIndex");
          var u = this._findRowElementForTabIndex();
          if (!(0, s.isDefined)(this._scrollToFocusOnResize)) {
            this._scrollToFocusOnResize = function () {
              t.scrollToElementVertically(t._findRowElementForTabIndex());
              t.resizeCompleted.remove(t._scrollToFocusOnResize);
            };
          }
          u.attr("tabIndex", i);
          if (r >= 0 && !e && (l < 0 && (l = 0), r += o.getRowIndexOffset(), l += a.getColumnIndexOffset(), this.getController("keyboardNavigation").setFocusedCellPosition(r, l), this.getController("focus").isAutoNavigateToFocusedRow())) {
            var d = o.dataSource();
            var c = d && d.operationTypes();
            if (!!c && !c.paging && !o.isPagingByRendering()) {
              this.resizeCompleted.remove(this._scrollToFocusOnResize);
              this.resizeCompleted.add(this._scrollToFocusOnResize);
            }
          }
        },
        _findRowElementForTabIndex: function () {
          var e = this.option("focusedRowKey");
          var t = this._dataController.getRowIndexByKey(e);
          return (0, i.default)(this.getRowElement(t >= 0 ? t : 0));
        },
        scrollToRowElement: function (e) {
          var t = this.getController("data").getRowIndexByKey(e);
          var n = (0, i.default)(this.getRow(t));
          return this.scrollToElementVertically(n);
        },
        scrollToElementVertically: function (e) {
          var t = this.getScrollable();
          if (t && e.length) {
            var n = t.getScrollElementPosition(e, "vertical");
            return this.scrollTopPosition(n);
          }
          return new a.Deferred().resolve();
        },
        scrollTopPosition: function (e) {
          var t = new a.Deferred();
          var n = this.getScrollable();
          if (n) {
            if (e !== n.scrollTop()) {
              n.on("scroll", function e() {
                n.off("scroll", e);
                t.resolve();
              });
              this._dataController.resetFilterApplying();
              n.scrollTo({
                top: e
              });
              return t.promise();
            }
          }
          return t.resolve();
        }
      }
    }
  }
};
exports.focusModule = f;