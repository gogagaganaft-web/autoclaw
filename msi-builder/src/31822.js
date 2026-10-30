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
exports.keyboardNavigationModule = exports.KeyboardNavigationController = undefined;
var o = require("./20576.js");
var a = I(require("./73349.js"));
var r = require("./6415.js");
var s = I(require("./68374.js"));
var l = I(require("./47810.js"));
var u = require("./62754.js");
var d = require("./58664.js");
var c = require("./35922.js");
var h = require("./95429.js");
var f = I(require("./55994.js"));
var p = I(require("./93786.js"));
var g = require("./72918.js");
var m = require("./39611.js");
var _ = function (e, t) {
  if (!t && e && e.__esModule) {
    return e;
  }
  if (e === null || i(e) !== "object" && typeof e != "function") {
    return {
      default: e
    };
  }
  var n = D(t);
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
}(require("./56756.js"));
var v = require("./31421.js");
var y = require("./18945.js");
var b = require("./72313.js");
var x = I(require("./15943.js"));
var w = I(require("./60082.js"));
var C = require("./67004.js");
var S = require("./83066.js");
var k = require("./67250.js");
function D(e) {
  if (typeof WeakMap != "function") {
    return null;
  }
  var t = new WeakMap();
  var n = new WeakMap();
  return (D = function (e) {
    if (e) {
      return n;
    } else {
      return t;
    }
  })(e);
}
function I(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
function T(e, t) {
  return (T = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (e, t) {
    e.__proto__ = t;
    return e;
  })(e, t);
}
var E = function (e) {
  var t;
  var n;
  function i() {
    return e.apply(this, arguments) || this;
  }
  n = e;
  (t = i).prototype = Object.create(n.prototype);
  t.prototype.constructor = t;
  T(t, n);
  var o = i.prototype;
  o.init = function () {
    var e = this;
    this._dataController = this.getController("data");
    this._selectionController = this.getController("selection");
    this._editingController = this.getController("editing");
    this._headerPanel = this.getView("headerPanel");
    this._rowsView = this.getView("rowsView");
    this._columnsController = this.getController("columns");
    this._editorFactory = this.getController("editorFactory");
    this._focusController = this.getController("focus");
    this._memoFireFocusedCellChanged = (0, y.memoize)(this._memoFireFocusedCellChanged.bind(this), {
      compareType: "value"
    });
    this._memoFireFocusedRowChanged = (0, y.memoize)(this._memoFireFocusedRowChanged.bind(this), {
      compareType: "value"
    });
    if (this.isKeyboardEnabled()) {
      _.subscribeVisibilityChange();
      this._updateFocusTimeout = null;
      this._fastEditingStarted = false;
      this._focusedCellPosition = {};
      this._canceledCellPosition = null;
      this._editorFactory.focused.add(function (t) {
        e.setupFocusedView();
        if (e._isNeedScroll && t.is(":visible") && e._focusedView && e._focusedView.getScrollable) {
          e._focusedView._scrollToElement(t);
          e._isNeedScroll = false;
        }
      });
      this._initViewHandlers();
      this._initDocumentHandlers();
      this.createAction("onKeyDown");
    }
  };
  o._initViewHandlers = function () {
    var e = this;
    function t(t) {
      var i = (0, s.default)(t.target);
      var o = (0, s.default)(t.relatedTarget).closest(e._rowsView.element()).length;
      var a = i.is("a");
      if (t.relatedTarget && a && !o && e._isEventInCurrentGrid(t)) {
        var r = e._getFocusedCell();
        r = (0, k.isElementDefined)(r) ? r : e._rowsView.getCellElements(0).filter("[tabindex]").eq(0);
        if (!i.closest(r).length) {
          t.preventDefault();
          f.default.trigger(r, "focus");
        }
      }
      var l = i.is("td");
      var u = (e.option("focusedRowIndex") ?? -1) < 0;
      if (l && u) {
        e._updateFocusedCellPosition(i);
      }
    }
    this._rowsView.renderCompleted.add(function (n) {
      var i = e._rowsView.element();
      var o = !n || n.changeType === "refresh";
      var r = e._focusedView && e._focusedView.name === e._rowsView.name;
      var l = n && (n.changeType === "append" || n.changeType === "prepend");
      var u = (0, s.default)(a.default.getRootNode(i.get && i.get(0))).find(":focus");
      var d = !u.length || u.closest(i).length;
      f.default.off(i, "focusin", t);
      f.default.on(i, "focusin", t);
      e._initPointerEventHandler();
      e._initKeyDownHandler();
      e._setRowsViewAttributes();
      if (r && d && (e._isNeedFocus ? !l : e._isHiddenFocus && o && !(n == null ? undefined : n.virtualColumnsScrolling))) {
        e._updateFocus(true);
      }
    });
  };
  o._initDocumentHandlers = function () {
    var e = this;
    var t = a.default.getDocument();
    this._documentClickHandler = this.createAction(function (t) {
      var n = (0, s.default)(t.event.target);
      var i = e._isEventInCurrentGrid(t.event) && n.closest(`.${e.addWidgetPrefix(C.ROWS_VIEW_CLASS)}`).length;
      var o = n.closest(`.${C.DROPDOWN_EDITOR_OVERLAY_CLASS}`).length;
      var a = e.getController("columnsResizer");
      var r = !!a && a.isResizing();
      if (!i && !o && !r) {
        if (!e._focusedView || !(n.parents().filter(e._focusedView.element()).length > 0)) {
          e._resetFocusedCell(true);
        }
        e._resetFocusedView();
      }
    });
    f.default.on(t, (0, m.addNamespace)(p.default.down, "dxDataGridKeyboardNavigation"), this._documentClickHandler);
  };
  o._setRowsViewAttributes = function () {
    var e = this._getRowsViewElement();
    if (!this._dataController.getVisibleRows().length) {
      this._applyTabIndexToElement(e);
    }
  };
  o._initPointerEventHandler = function () {
    var e = (0, k.isMobile)() ? h.name : p.default.down;
    var t = `.${b.ROW_CLASS} > td, .${b.ROW_CLASS}`;
    var n = this._getRowsViewElement();
    if (!(0, c.isDefined)(this._pointerEventAction)) {
      this._pointerEventAction = this.createAction(this._pointerEventHandler);
    }
    f.default.off(n, (0, m.addNamespace)(e, "dxDataGridKeyboardNavigation"), this._pointerEventAction);
    f.default.on(n, (0, m.addNamespace)(e, "dxDataGridKeyboardNavigation"), t, this._pointerEventAction);
  };
  o._initKeyDownHandler = function () {
    var e = this;
    var t = this._getRowsViewElement();
    g.keyboard.off(this._keyDownListener);
    this._keyDownListener = g.keyboard.on(t, null, function (t) {
      return e._keyDownHandler(t);
    });
  };
  o.dispose = function () {
    e.prototype.dispose.call(this);
    this._resetFocusedView();
    g.keyboard.off(this._keyDownListener);
    f.default.off(a.default.getDocument(), (0, m.addNamespace)(p.default.down, "dxDataGridKeyboardNavigation"), this._documentClickHandler);
    clearTimeout(this._updateFocusTimeout);
    _.unsubscribeVisibilityChange();
  };
  o.optionChanged = function (t) {
    switch (t.name) {
      case "keyboardNavigation":
      case "useLegacyKeyboardNavigation":
        t.handled = true;
        break;
      default:
        e.prototype.optionChanged.call(this, t);
    }
  };
  o.isRowFocusType = function () {
    return this.focusType === C.FOCUS_TYPE_ROW;
  };
  o.isCellFocusType = function () {
    return this.focusType === C.FOCUS_TYPE_CELL;
  };
  o.setRowFocusType = function () {
    if (this.option("focusedRowEnabled")) {
      this.focusType = C.FOCUS_TYPE_ROW;
    }
  };
  o.setCellFocusType = function () {
    this.focusType = C.FOCUS_TYPE_CELL;
  };
  o._keyDownHandler = function (e) {
    var t;
    var n = true;
    this._isNeedFocus = true;
    this._isNeedScroll = true;
    var i = this._processOnKeyDown(e);
    var o = (t = this._editingController) === null || t === undefined ? undefined : t.isEditing();
    var a = e.originalEvent;
    if (a.isDefaultPrevented()) {
      this._isNeedFocus = false;
      this._isNeedScroll = false;
      return;
    }
    if (!C.FUNCTIONAL_KEYS.includes(e.keyName)) {
      this._updateFocusedCellPositionByTarget(a.target);
    }
    if (!i) {
      switch (e.keyName) {
        case "leftArrow":
        case "rightArrow":
          this._leftRightKeysHandler(e, o);
          i = true;
          break;
        case "upArrow":
        case "downArrow":
          if (e.ctrl) {
            _.selectView("rowsView", this, a);
          } else {
            this._upDownKeysHandler(e, o);
          }
          i = true;
          break;
        case "pageUp":
        case "pageDown":
          this._pageUpDownKeyHandler(e);
          i = true;
          break;
        case "space":
          i = this._spaceKeyHandler(e, o);
          break;
        case "A":
          if ((0, m.isCommandKeyPressed)(e.originalEvent)) {
            this._ctrlAKeyHandler(e, o);
            i = true;
          } else {
            i = this._beginFastEditing(e.originalEvent);
          }
          break;
        case "tab":
          this._tabKeyHandler(e, o);
          i = true;
          break;
        case "enter":
          this._enterKeyHandler(e, o);
          i = true;
          break;
        case "escape":
          this._escapeKeyHandler(e, o);
          i = true;
          break;
        case "F":
          if ((0, m.isCommandKeyPressed)(e.originalEvent)) {
            this._ctrlFKeyHandler(e);
            i = true;
          } else {
            i = this._beginFastEditing(e.originalEvent);
          }
          break;
        case "F2":
          this._f2KeyHandler();
          i = true;
          break;
        case "del":
        case "backspace":
          if (this._isFastEditingAllowed() && !this._isFastEditingStarted()) {
            i = this._beginFastEditing(a, true);
          }
      }
      if (!i && !this._beginFastEditing(a)) {
        this._isNeedFocus = false;
        this._isNeedScroll = false;
        n = false;
      }
      if (n) {
        a.stopPropagation();
      }
    }
  };
  o._processOnKeyDown = function (e) {
    var t = e.originalEvent;
    var n = {
      handled: false,
      event: t
    };
    this.executeAction("onKeyDown", n);
    e.ctrl = t.ctrlKey;
    e.alt = t.altKey;
    e.shift = t.shiftKey;
    return !!n.handled;
  };
  o._closeEditCell = function () {
    var e = this;
    setTimeout(function () {
      e._editingController.closeEditCell();
    });
  };
  o._leftRightKeysHandler = function (e, t) {
    var n = this.getVisibleRowIndex();
    var i = e.originalEvent;
    var o = this._focusedView && this._focusedView.getRow(n);
    var a = this._getDirectionCodeByKey(e.keyName);
    var r = this._isFastEditingStarted();
    if ((!t || r) && (0, k.isDataRow)(o)) {
      this.setCellFocusType();
      if (r) {
        this._closeEditCell();
      }
      if (this._isVirtualColumnRender()) {
        this._processVirtualHorizontalPosition(a);
      }
      var s = this._getNextCell(a);
      if ((0, k.isElementDefined)(s)) {
        this._arrowKeysHandlerFocusCell(i, s, a);
      }
      if (i) {
        i.preventDefault();
      }
    }
  };
  o._upDownKeysHandler = function (e, t) {
    var n;
    var i;
    var o = this.getVisibleRowIndex();
    var a = this._focusedView && this._focusedView.getRow(o);
    var r = e.originalEvent;
    var s = e.keyName === "upArrow";
    var l = this._dataController.dataSource();
    var u = (i = (n = this._editingController) === null || n === undefined ? undefined : n.isEditRowByIndex) === null || i === undefined ? undefined : i.call(n, o);
    var c = this._isFastEditingStarted();
    if ((!u || !t || c) && a && !(0, k.isDetailRow)(a)) {
      if (c) {
        this._closeEditCell();
      }
      if (!this._navigateNextCell(r, e.keyName) && this._isVirtualRowRender() && s && l && !l.isLoading()) {
        var h = (0, d.getOuterHeight)(a);
        var f = this._focusedCellPosition.rowIndex - 1;
        this._scrollBy(0, -h, f, r);
      }
      if (r) {
        r.preventDefault();
      }
    }
  };
  o._pageUpDownKeyHandler = function (e) {
    var t = this._dataController.pageIndex();
    var n = this._dataController.pageCount();
    var i = this.option("paging.enabled");
    var o = e.keyName === "pageUp";
    var a = o ? -1 : 1;
    var r = this._rowsView.getScrollable();
    if (i && !this._isVirtualScrolling()) {
      if ((o ? t > 0 : t < n - 1) && !this._isVirtualScrolling()) {
        this._dataController.pageIndex(t + a);
        e.originalEvent.preventDefault();
      }
    } else if (r && (0, d.getHeight)(r.container()) < (0, d.getHeight)(r.$content())) {
      this._scrollBy(0, (0, d.getHeight)(r.container()) * a);
      e.originalEvent.preventDefault();
    }
  };
  o._spaceKeyHandler = function (e, t) {
    var n = this.getVisibleRowIndex();
    var i = (0, s.default)(e.originalEvent && e.originalEvent.target);
    if (this.option("selection") && this.option("selection").mode !== "none" && !t) {
      var o = this._getElementType(i) === "row" && this.isRowFocusType() && (0, k.isDataRow)(i);
      if (i.hasClass(C.COMMAND_SELECT_CLASS) && this.option("selection.showCheckBoxesMode") === "onClick") {
        this._selectionController.startSelectionWithCheckboxes();
      }
      return (!!o || !!i.parent().hasClass(C.DATA_ROW_CLASS) || !!i.hasClass(this.addWidgetPrefix(C.ROWS_VIEW_CLASS))) && (this._selectionController.changeItemSelection(n, {
        shift: e.shift,
        control: e.ctrl
      }), e.originalEvent.preventDefault(), true);
    }
    return this._beginFastEditing(e.originalEvent);
  };
  o._ctrlAKeyHandler = function (e, t) {
    if (!t && !e.alt && this.option("selection.mode") === "multiple" && !!this.option("selection.allowSelectAll")) {
      this._selectionController.selectAll();
      e.originalEvent.preventDefault();
    }
  };
  o._tabKeyHandler = function (e, t) {
    var n = this.option("editing");
    var i = e.shift ? "previous" : "next";
    var o = !(0, c.isDefined)(this._focusedCellPosition) || !!(0, c.isEmptyObject)(this._focusedCellPosition) || !e.shift && this._isLastValidCell(this._focusedCellPosition) || e.shift && this._isFirstValidCell(this._focusedCellPosition);
    var a = e.originalEvent.target;
    var r = this._focusedView && this._focusedView.element();
    if (!this._handleTabKeyOnMasterDetailCell(a, i)) {
      (0, s.default)(r).addClass(C.FOCUS_STATE_CLASS);
      if (n && a && !o) {
        if ((0, s.default)(a).hasClass(this.addWidgetPrefix(C.ROWS_VIEW_CLASS))) {
          this._resetFocusedCell();
        }
        if (this._isVirtualColumnRender()) {
          this._processVirtualHorizontalPosition(i);
        }
        if (t) {
          if (!this._editingCellTabHandler(e, i)) {
            return;
          }
        } else if (this._targetCellTabHandler(e, i)) {
          o = true;
        }
      }
      if (o) {
        this._editorFactory.loseFocus();
        if (this._editingController.isEditing() && !this._isRowEditMode()) {
          this._resetFocusedCell(true);
          this._resetFocusedView();
          this._closeEditCell();
        }
      } else {
        e.originalEvent.preventDefault();
      }
    }
  };
  o._getMaxHorizontalOffset = function () {
    var e = this.component.getScrollable();
    if (e) {
      return e.scrollWidth() - (0, d.getWidth)(this._rowsView.element());
    } else {
      return 0;
    }
  };
  o._isColumnRendered = function (e) {
    var t = this._columnsController.getVisibleColumns(null, true);
    var n = this._columnsController.getVisibleColumns();
    var i = t[e];
    var o = false;
    if (i) {
      o = n.indexOf(i) >= 0;
    }
    return o;
  };
  o._isFixedColumn = function (e) {
    var t = this._columnsController.getVisibleColumns(null, true)[e];
    return !!t && !!t.fixed;
  };
  o._isColumnVirtual = function (e) {
    var t = e - this._columnsController.getColumnIndexOffset();
    var n = this._columnsController.getVisibleColumns()[t];
    return !!n && n.command === "virtual";
  };
  o._processVirtualHorizontalPosition = function (e) {
    var t;
    var n = this.component.getScrollable();
    var i = this.getColumnIndex();
    var o = 0;
    var a = false;
    switch (e) {
      case "next":
      case "nextInRow":
        var r = this._getVisibleColumnCount();
        t = i + 1;
        o = this.option("rtlEnabled") ? this._getMaxHorizontalOffset() : 0;
        a = e === "next" ? r === t || this._isFixedColumn(i) && !this._isColumnRendered(t) : r > t && this._isFixedColumn(i) && !this._isColumnRendered(t);
        break;
      case "previous":
      case "previousInRow":
        t = i - 1;
        o = this.option("rtlEnabled") ? 0 : this._getMaxHorizontalOffset();
        if (e === "previous") {
          var s = this._columnsController.getColumnIndexOffset();
          a = t < 0 && s === 0 || this._isFixedColumn(i) && !this._isColumnRendered(t);
        } else {
          a = t >= 0 && this._isFixedColumn(i) && !this._isColumnRendered(t);
        }
    }
    if (a) {
      n.scrollTo({
        left: o
      });
    } else if ((0, c.isDefined)(t) && (0, c.isDefined)(e) && this._isColumnVirtual(t) && (o = this._getHorizontalScrollPositionOffset(e)) !== 0) {
      n.scrollBy({
        left: o,
        top: 0
      });
    }
  };
  o._getHorizontalScrollPositionOffset = function (e) {
    var t = 0;
    var n = this._getCell(this._focusedCellPosition);
    var i = n && (0, d.getOuterWidth)(n);
    if (i > 0) {
      var o = this.option("rtlEnabled") ? -1 : 1;
      t = e === "nextInRow" || e === "next" ? i * o : i * o * -1;
    }
    return t;
  };
  o._editingCellTabHandler = function (e, t) {
    var n;
    var i = e.originalEvent.target;
    var o = this._getCellElementFromTarget(i);
    var a = e.originalEvent;
    var r = this._getElementType(i);
    if (o.is(C.COMMAND_CELL_SELECTOR)) {
      return !this._targetCellTabHandler(e, t);
    }
    this._updateFocusedCellPosition(o);
    var s = this._getNextCellByTabKey(a, t, r);
    if (!(o = s.$cell) || this._handleTabKeyOnMasterDetailCell(o, t)) {
      return false;
    }
    var l = this._columnsController;
    var u = this._rowsView.getCellIndex(o) + l.getColumnIndexOffset();
    var d = l.getVisibleColumns(null, true)[u];
    var c = o.parent();
    var h = this._getRowIndex(c);
    var f = this._dataController.items()[h];
    var p = this._editingController;
    if (d && d.allowEditing) {
      var g = !f || f.rowType === "data";
      n = p.allowUpdating({
        row: f
      }) ? g : f && f.isNewRow;
    }
    if (!n) {
      this._closeEditCell();
    }
    if (this._focusCell(o, !s.isHighlighted)) {
      if (!this._isRowEditMode() && n) {
        this._editFocusedCell();
      } else {
        this._focusInteractiveElement(o, e.shift);
      }
    }
    return true;
  };
  o._targetCellTabHandler = function (e, t) {
    var n;
    var i = e.originalEvent;
    var o = i.target;
    var a = this._getCellElementFromTarget(o);
    var r = this._getInteractiveElement(a, !e.shift);
    var l = false;
    if (!(0, k.isEditorCell)(this, a) && r.length && o !== r.get(0)) {
      l = true;
    } else {
      if (this._focusedCellPosition.rowIndex === undefined && (0, s.default)(o).hasClass(b.ROW_CLASS)) {
        this._updateFocusedCellPosition(a);
      }
      n = this._getElementType(o);
      if (this.isRowFocusType()) {
        this.setCellFocusType();
        if (n === "row" && (0, k.isDataRow)((0, s.default)(o))) {
          o = this.getFirstValidCellInRow((0, s.default)(o));
          n = this._getElementType(o);
        }
      }
      var u = this._getNextCellByTabKey(i, t, n);
      if (!(a = u.$cell)) {
        return false;
      }
      if (!(a = this._checkNewLineTransition(i, a))) {
        return false;
      }
      this._focusCell(a, !u.isHighlighted);
      if (!(0, k.isEditorCell)(this, a)) {
        this._focusInteractiveElement(a, e.shift);
      }
    }
    return l;
  };
  o._getNextCellByTabKey = function (e, t, n) {
    var i = this._getNextCell(t, n);
    var o = i && this._fireFocusedCellChanging(e, i, true);
    if (!o || o.cancel) {
      return {};
    } else {
      if (o.$newCellElement) {
        i = o.$newCellElement;
      }
      return {
        $cell: i,
        isHighlighted: o.isHighlighted
      };
    }
  };
  o._checkNewLineTransition = function (e, t) {
    var n = this.getVisibleRowIndex();
    var i = t.parent();
    if (n !== this._getRowIndex(i)) {
      var o = this._getCellPosition(t);
      var a = this._fireFocusedRowChanging(e, i);
      if (a.cancel) {
        return;
      }
      if (a.rowIndexChanged && o) {
        this.setFocusedColumnIndex(o.columnIndex);
        t = this._getFocusedCell();
      }
    }
    return t;
  };
  o._enterKeyHandler = function (e, t) {
    var n = this._getFocusedCell();
    var i = this.getVisibleRowIndex();
    var o = this._focusedView && this._focusedView.getRow(i);
    if (this.option("grouping.allowCollapsing") && (0, k.isGroupRow)(o) || this.option("masterDetail.enabled") && n && n.hasClass(C.COMMAND_EXPAND_CLASS)) {
      var a = this._dataController.getKeyByRowIndex(i);
      var r = this._dataController.items()[i];
      if (a !== undefined && r && r.data && !r.data.isContinuation) {
        this._dataController.changeRowExpand(a);
      }
    } else {
      this._processEnterKeyForDataCell(e, t);
    }
  };
  o._processEnterKeyForDataCell = function (e, t) {
    var n = this._getEnterKeyDirection(e);
    var i = this._allowEditingOnEnterKey();
    if (t || !i && n) {
      this._handleEnterKeyEditingCell(e.originalEvent);
      if (n === "next" || n === "previous") {
        this._targetCellTabHandler(e, n);
      } else if (n === "upArrow" || n === "downArrow") {
        this._navigateNextCell(e.originalEvent, n);
      }
    } else if (i) {
      this._startEditing(e);
    }
  };
  o._getEnterKeyDirection = function (e) {
    var t = this.option("keyboardNavigation.enterKeyDirection");
    var n = e.shift;
    if (t === "column") {
      if (n) {
        return "upArrow";
      } else {
        return "downArrow";
      }
    } else if (t === "row") {
      if (n) {
        return "previous";
      } else {
        return "next";
      }
    } else {
      return undefined;
    }
  };
  o._handleEnterKeyEditingCell = function (e) {
    var t = e.target;
    var n = this._getCellElementFromTarget(t);
    var i = this._isRowEditMode();
    this._updateFocusedCellPosition(n);
    if (i) {
      this._focusEditFormCell(n);
      setTimeout(this._editingController.saveEditData.bind(this._editingController));
    } else {
      f.default.trigger((0, s.default)(t), "change");
      this._closeEditCell();
      e.preventDefault();
    }
  };
  o._escapeKeyHandler = function (e, t) {
    var n = this._getCellElementFromTarget(e.originalEvent.target);
    if (t) {
      this._updateFocusedCellPosition(n);
      if (this._isRowEditMode()) {
        this._focusEditFormCell(n);
        this._editingController.cancelEditData();
        if (this._dataController.items().length === 0) {
          this._resetFocusedCell();
          this._editorFactory.loseFocus();
        }
      } else if (this._editingController.getEditMode() === "cell") {
        this._editingController.cancelEditData();
      } else {
        this._closeEditCell();
      }
      e.originalEvent.preventDefault();
    }
  };
  o._ctrlFKeyHandler = function (e) {
    if (this.option("searchPanel.visible")) {
      var t = this._headerPanel.getSearchTextEditor();
      if (t) {
        t.focus();
        e.originalEvent.preventDefault();
      }
    }
  };
  o._f2KeyHandler = function () {
    var e = this._editingController.isEditing();
    var t = this.getVisibleRowIndex();
    var n = this._focusedView && this._focusedView.getRow(t);
    if (!e && (0, k.isDataRow)(n)) {
      this._startEditing();
    }
  };
  o._navigateNextCell = function (e, t) {
    var n = this._getNextCell(t);
    var i = this._getDirectionCodeByKey(t);
    return !!n && !!this._isCellValid(n) && this._arrowKeysHandlerFocusCell(e, n, i);
  };
  o._arrowKeysHandlerFocusCell = function (e, t, n) {
    var i = n === "prevRow" || n === "nextRow";
    var o = this._fireFocusChangingEvents(e, t, i, true);
    t = o.$newCellElement;
    return !o.cancel && !!this._isCellValid(t) && (this._focus(t, !o.isHighlighted), true);
  };
  o._beginFastEditing = function (e, t) {
    if (!this._isFastEditingAllowed() || e.altKey || e.ctrlKey || this._editingController.isEditing()) {
      return false;
    }
    if (t) {
      this._startEditing(e, C.FAST_EDITING_DELETE_KEY);
    } else {
      var n = e.key;
      var i = e.keyCode || e.which;
      var o = n || i && String.fromCharCode(i);
      if (!!o && (o.length === 1 || o === C.FAST_EDITING_DELETE_KEY)) {
        this._startEditing(e, o);
      }
    }
    return true;
  };
  o._pointerEventHandler = function (e) {
    var t;
    var n = e.event || e;
    var i = (0, s.default)(n.currentTarget);
    var o = (t = this._rowsView) === null || t === undefined ? undefined : t.element();
    var a = i.parent();
    var r = (0, s.default)(n.target).is(C.INTERACTIVE_ELEMENTS_SELECTOR);
    var l = !!(0, s.default)(n.target).closest(`.${C.REVERT_BUTTON_CLASS}`).length;
    var u = i.hasClass(C.COMMAND_EXPAND_CLASS);
    if (this._isEventInCurrentGrid(n)) {
      if (l || !this._isCellValid(i, !r) && !u) {
        if (i.is("td")) {
          this._resetFocusedCell();
        }
      } else {
        i = this._isInsideEditForm(i) ? (0, s.default)(n.target) : i;
        this._focusView();
        (0, s.default)(o).removeClass(C.FOCUS_STATE_CLASS);
        if (a.hasClass(C.FREESPACE_ROW_CLASS)) {
          this._updateFocusedCellPosition(i);
          this._applyTabIndexToElement(this._focusedView.element());
          this._focusedView.focus(true);
        } else if (this._isMasterDetailCell(i)) {
          this._updateFocusedCellPosition(i);
        } else {
          this._clickTargetCellHandler(n, i);
        }
      }
    }
  };
  o._clickTargetCellHandler = function (e, t) {
    var n = this._rowsView.getCellIndex(t);
    var i = this._columnsController.getVisibleColumns()[n];
    var o = this._isCellEditMode();
    this.setCellFocusType();
    var a = this._fireFocusChangingEvents(e, t, true);
    t = a.$newCellElement;
    if (a.cancel) {
      this.setRowFocusType();
      this.setFocusedRowIndex(a.prevRowIndex);
      if (this._editingController.isEditing() && o) {
        this._closeEditCell();
      }
    } else {
      if (a.resetFocusedRow) {
        this.getController("focus")._resetFocusedRow();
        return;
      }
      if (a.rowIndexChanged) {
        t = this._getFocusedCell();
      }
      if (!a.isHighlighted && !o) {
        this.setRowFocusType();
      }
      this._updateFocusedCellPosition(t);
      if (this._allowRowUpdating() && o && i && i.allowEditing) {
        this._isNeedFocus = false;
        this._isHiddenFocus = false;
      } else {
        t = this._getFocusedCell();
        var r = e && (0, s.default)(e.target).closest(`${C.NON_FOCUSABLE_ELEMENTS_SELECTOR}, td`);
        var l = r && r.not(t).is(C.NON_FOCUSABLE_ELEMENTS_SELECTOR);
        var u = (!i || !!i.command || !t.hasClass(b.EDITOR_CELL_CLASS)) && (!a.isHighlighted || l);
        this._focus(t, u, l);
      }
    }
  };
  o._allowRowUpdating = function () {
    var e = this.getVisibleRowIndex();
    var t = this._dataController.items()[e];
    return this._editingController.allowUpdating({
      row: t
    }, "click");
  };
  o.focus = function (e) {
    var t;
    var n = this.option("focusedRowEnabled");
    var i = this._isCellElement((0, s.default)(e));
    if (!e) {
      t = ".dx-datagrid-rowsview .dx-row[tabindex]";
      if (!n) {
        t += ", .dx-datagrid-rowsview .dx-row > td[tabindex]";
      }
      e = this.component.$element().find(t).first();
    }
    if (e) {
      this._focusElement((0, s.default)(e), i);
    }
  };
  o.getFocusedView = function () {
    return this._focusedView;
  };
  o.setupFocusedView = function () {
    if (this.isKeyboardEnabled() && !(0, c.isDefined)(this._focusedView)) {
      this._focusView();
    }
  };
  o._focusElement = function (e, t) {
    var n = (0, s.default)(this._getRowsViewElement());
    var i = e.closest(n);
    var o = this.isRowFocusType();
    var a = {};
    if (!!i.length && (!this._isCellElement(e) || !!this._isCellValid(e))) {
      this._focusView();
      this._isNeedFocus = true;
      this._isNeedScroll = true;
      if (this._isCellElement(e) || (0, k.isGroupRow)(e)) {
        this.setCellFocusType();
        e = (a = this._fireFocusChangingEvents(null, e, true, t)).$newCellElement;
        if (o && !a.isHighlighted) {
          this.setRowFocusType();
        }
      }
      if (!a.cancel) {
        this._focus(e, !a.isHighlighted);
        this._focusInteractiveElement(e);
      }
    }
  };
  o._getFocusedViewByElement = function (e) {
    var t = this.getFocusedView();
    var n = t && (0, s.default)(t.element());
    return e && e.closest(n).length !== 0;
  };
  o._focusView = function () {
    this._focusedView = this._rowsView;
  };
  o._resetFocusedView = function () {
    this.setRowFocusType();
    this._focusedView = null;
  };
  o._focusInteractiveElement = function (e, t) {
    if (e) {
      var n = this._getInteractiveElement(e, t);
      w.default.focusAndSelectElement(this, n);
    }
  };
  o._focus = function (e, t, n) {
    var i = e && !e.hasClass(b.ROW_CLASS) ? e.closest(`.${b.ROW_CLASS}`) : e;
    if (!i || !(0, k.isNotFocusedRow)(i)) {
      var o;
      var a = this._focusedView;
      var r = a && a.element();
      this._isHiddenFocus = t;
      var s = (0, k.isGroupRow)(i) || (0, k.isGroupFooterRow)(i) || this.isRowFocusType();
      if (s) {
        o = i;
        if (a) {
          this.setFocusedRowIndex(this._getRowIndex(i));
        }
      } else if (this._isCellElement(e)) {
        o = e;
        this._updateFocusedCellPosition(e);
      }
      if (o) {
        if (r) {
          r.find(".dx-row[tabindex], .dx-row > td[tabindex]").not(o).removeClass(C.CELL_FOCUS_DISABLED_CLASS).removeClass(C.FOCUSED_CLASS).removeAttr("tabindex");
        }
        f.default.one(o, "blur", function (e) {
          if (e.relatedTarget) {
            o.removeClass(C.CELL_FOCUS_DISABLED_CLASS).removeClass(C.FOCUSED_CLASS);
          }
        });
        if (!n) {
          this._applyTabIndexToElement(o);
          f.default.trigger(o, "focus");
        }
        if (t) {
          o.addClass(C.CELL_FOCUS_DISABLED_CLASS);
          if (s) {
            e.addClass(C.CELL_FOCUS_DISABLED_CLASS);
          }
        } else {
          this._editorFactory.focus(o);
        }
      }
    }
  };
  o._updateFocus = function (e) {
    var t = this;
    this._updateFocusTimeout = setTimeout(function () {
      var n = t._editingController;
      var i = n.getEditMode() === b.EDIT_MODE_CELL;
      var o = n.getEditMode() === b.EDIT_MODE_BATCH;
      if (i && n.hasChanges() || o && n.isNewRowInEditMode()) {
        n._focusEditingCell();
      } else {
        var a = t._getFocusedCell();
        var r = n.isEditing();
        if (a && (!t._isMasterDetailCell(a) || t._isRowEditMode())) {
          if (t._hasSkipRow(a.parent())) {
            var s = t._focusedCellPosition && t._focusedCellPosition.rowIndex > 0 ? "upArrow" : "downArrow";
            a = t._getNextCell(s);
          }
          if ((0, k.isElementDefined)(a)) {
            if (a.is("td") || a.hasClass(t.addWidgetPrefix(C.EDIT_FORM_ITEM_CLASS))) {
              var l = a.is(C.COMMAND_CELL_SELECTOR);
              var u = a.find(":focus");
              var d = (0, k.isElementDefined)(u);
              if (!e && l || !t._editorFactory.focus()) {
                if (!d && (!!t._isNeedFocus || !!t._isHiddenFocus)) {
                  t._focus(a, t._isHiddenFocus);
                }
              } else {
                if (l && d) {
                  w.default.focusAndSelectElement(t, u);
                  return;
                }
                if (!d) {
                  t._focus(a);
                }
              }
              if (r) {
                t._focusInteractiveElement.bind(t)(a);
              }
            } else {
              f.default.trigger(a, "focus");
            }
          }
        }
      }
    });
  };
  o._getFocusedCell = function () {
    return (0, s.default)(this._getCell(this._focusedCellPosition));
  };
  o._updateFocusedCellPositionByTarget = function (e) {
    if (this._getElementType(e) === "row" && (0, c.isDefined)(this._focusedCellPosition?.columnIndex)) {
      var n = (0, s.default)(e);
      if (this._focusedView && (0, k.isGroupRow)(n)) {
        this.setFocusedRowIndex(this._getRowIndex(n));
      }
    } else {
      this._updateFocusedCellPosition(this._getCellElementFromTarget(e));
    }
  };
  o._updateFocusedCellPosition = function (e, t) {
    var n = this._getCellPosition(e, t);
    if (n && (!e.length || n.rowIndex >= 0 && n.columnIndex >= 0)) {
      this.setFocusedCellPosition(n.rowIndex, n.columnIndex);
    }
    return n;
  };
  o._getFocusedColumnIndexOffset = function (e) {
    var t = 0;
    var n = this._columnsController.getVisibleColumns()[e];
    if (n && n.fixed) {
      t = this._getFixedColumnIndexOffset(n);
    } else if (e >= 0) {
      t = this._columnsController.getColumnIndexOffset();
    }
    return t;
  };
  o._getFixedColumnIndexOffset = function (e) {
    if ((0, k.isFixedColumnIndexOffsetRequired)(this, e)) {
      return this._getVisibleColumnCount() - this._columnsController.getVisibleColumns().length;
    } else {
      return 0;
    }
  };
  o._getCellPosition = function (e, t) {
    var n;
    var i = (0, k.isElementDefined)(e) && e.closest("tr");
    if ((0, k.isElementDefined)(i)) {
      var o = this._getRowIndex(i);
      n = this._rowsView.getCellIndex(e, o);
      n += this._getFocusedColumnIndexOffset(n);
      if (t) {
        n = t === "previous" ? n - 1 : n + 1;
        n = this._applyColumnIndexBoundaries(n);
      }
      return {
        rowIndex: o,
        columnIndex: n
      };
    }
  };
  o._focusCell = function (e, t) {
    if (this._isCellValid(e)) {
      this._focus(e, t);
      return true;
    }
  };
  o._focusEditFormCell = function (e) {
    if (e.hasClass(C.MASTER_DETAIL_CELL_CLASS)) {
      this._editorFactory.focus(e, true);
    }
  };
  o._resetFocusedCell = function (e) {
    var t;
    var n = this._getFocusedCell();
    if ((0, k.isElementDefined)(n)) {
      n.removeAttr("tabindex");
    }
    this._isNeedFocus = false;
    this._isNeedScroll = false;
    this._focusedCellPosition = {};
    clearTimeout(this._updateFocusTimeout);
    if ((t = this._focusedView) !== null && t !== undefined) {
      t.renderFocusState({
        preventScroll: e
      });
    }
  };
  o.restoreFocusableElement = function (e, t) {
    var n;
    var i;
    var o = (0, c.isDefined)(e);
    var a = this._rowsView.element();
    var r = this._focusedCellPosition.columnIndex;
    var s = this._dataController.getRowIndexOffset();
    e = o ? e : this._rowsView.getTopVisibleItemIndex() + s;
    if (o) {
      i = this._rowsView.getRow(e - s);
      if (!(n = this._fireFocusedRowChanging(t, i)).cancel && n.rowIndexChanged) {
        e = n.newRowIndex;
      }
    } else {
      this._editorFactory.loseFocus();
      this._applyTabIndexToElement(a);
      f.default.trigger(a, "focus");
    }
    if (!o || !n.cancel) {
      this.setFocusedCellPosition(e, r);
    }
    if (o) {
      this._updateFocus();
    }
  };
  o._getNewPositionByCode = function (e, t, n) {
    var i = e.columnIndex;
    var o = e.rowIndex;
    if (e.rowIndex === undefined && n === "next") {
      return {
        columnIndex: 0,
        rowIndex: 0
      };
    }
    switch (n) {
      case "nextInRow":
      case "next":
        if (i < this._getVisibleColumnCount() - 1 && t !== "row" && this._hasValidCellAfterPosition({
          columnIndex: i,
          rowIndex: o
        })) {
          i++;
        } else if (!this._isLastRow(o) && n === "next") {
          i = 0;
          o++;
        }
        break;
      case "previousInRow":
      case "previous":
        if (i > 0 && t !== "row" && this._hasValidCellBeforePosition({
          columnIndex: i,
          rowIndex: o
        })) {
          i--;
        } else if (o > 0 && n === "previous") {
          o--;
          i = this._getVisibleColumnCount() - 1;
        }
        break;
      case "upArrow":
        o = o > 0 ? o - 1 : o;
        break;
      case "downArrow":
        o = this._isLastRow(o) ? o : o + 1;
    }
    return {
      columnIndex: i,
      rowIndex: o
    };
  };
  o.setFocusedCellPosition = function (e, t) {
    this.setFocusedRowIndex(e);
    this.setFocusedColumnIndex(t);
  };
  o.setFocusedRowIndex = function (e) {
    this._focusedCellPosition ||= {};
    this._focusedCellPosition.rowIndex = e;
  };
  o.setFocusedColumnIndex = function (e) {
    this._focusedCellPosition ||= {};
    this._focusedCellPosition.columnIndex = e;
  };
  o.getRowIndex = function () {
    if (this._focusedCellPosition) {
      return this._focusedCellPosition.rowIndex;
    } else {
      return -1;
    }
  };
  o.getColumnIndex = function () {
    if (this._focusedCellPosition) {
      return this._focusedCellPosition.columnIndex;
    } else {
      return -1;
    }
  };
  o.getVisibleRowIndex = function () {
    var t = this._focusedCellPosition?.rowIndex;
    if (!(0, c.isDefined)(t) || t < 0) {
      return -1;
    } else {
      return t - this._dataController.getRowIndexOffset();
    }
  };
  o.getVisibleColumnIndex = function () {
    var t = this._focusedCellPosition?.columnIndex;
    if ((0, c.isDefined)(t)) {
      return t - this._columnsController.getColumnIndexOffset();
    } else {
      return -1;
    }
  };
  o._applyColumnIndexBoundaries = function (e) {
    var t = this._getVisibleColumnCount();
    if (e < 0) {
      e = 0;
    } else if (e >= t) {
      e = t - 1;
    }
    return e;
  };
  o._isCellByPositionValid = function (e) {
    var t = (0, s.default)(this._getCell(e));
    return this._isCellValid(t);
  };
  o._isLastRow = function (e) {
    var t = this._dataController;
    var n = t.items().filter(function (e) {
      return e.visible !== false;
    });
    if (this._isVirtualRowRender()) {
      return e >= t.getMaxRowIndex();
    } else {
      return e === n.length - 1;
    }
  };
  o._isFirstValidCell = function (e) {
    var t = false;
    if (e.rowIndex === 0 && e.columnIndex >= 0) {
      t = t || !this._hasValidCellBeforePosition(e);
    }
    return t;
  };
  o._hasValidCellBeforePosition = function (e) {
    for (var t = e.columnIndex, n = false; t > 0 && !n;) {
      var i = {
        columnIndex: --t,
        rowIndex: e.rowIndex
      };
      n = this._isCellByPositionValid(i);
    }
    return n;
  };
  o._hasValidCellAfterPosition = function (e) {
    for (var t = e.columnIndex, n = false, i = this._getVisibleColumnCount(); t < i - 1 && !n;) {
      var o = {
        columnIndex: ++t,
        rowIndex: e.rowIndex
      };
      n = this._isCellByPositionValid(o);
    }
    return n;
  };
  o._isLastValidCell = function (e) {
    var t = e.columnIndex >= 0 ? e.columnIndex + 1 : 0;
    var n = e.rowIndex;
    var i = {
      columnIndex: t,
      rowIndex: n
    };
    var o = this._dataController.getVisibleRows();
    var a = o && o[n];
    return !!this._isLastRow(n) && (!!a && a.rowType === "group" && !!(e.columnIndex > 0) || e.columnIndex === this._getVisibleColumnCount() - 1 || !this._isCellByPositionValid(i) && this._isLastValidCell(i));
  };
  o._isCellValid = function (e, t) {
    if ((0, k.isElementDefined)(e)) {
      var n = e.parent();
      var i = this._columnsController;
      var o = this._rowsView.getCellIndex(e) + i.getColumnIndexOffset();
      var a = i.getVisibleColumns(null, true)[o];
      var r = this._getVisibleColumnCount();
      var s = this._editingController;
      var l = (0, k.isDetailRow)(n);
      var u = a && a.showWhenGrouped;
      var d = a && !e.hasClass(C.COMMAND_EXPAND_CLASS) && (0, k.isDataRow)(n);
      if (S.GridCoreKeyboardNavigationDom.isDragCell(e)) {
        return false;
      }
      if (this._isMasterDetailCell(e)) {
        return true;
      }
      if (r > o && (!l && a && (!(0, c.isDefined)(a.groupIndex) || u && d) || parseInt(e.attr("colspan"), 10) > 1)) {
        var h = this._dataController.items();
        var f = this._rowsView.getRowIndex(n);
        var p = h[f];
        var g = s && this._isCellEditMode() && s.isEditing();
        var m = s && s.isEditRow(f);
        var _ = m || g;
        if (a.command) {
          if (this._isLegacyNavigation()) {
            return !_ && a.command === "expand";
          } else {
            return !g && (m ? a.command !== "select" : !_);
          }
        } else {
          return (!g || !p || p.rowType === "data") && (!_ || a.allowEditing || t);
        }
      }
    }
  };
  o.getFirstValidCellInRow = function (e, t) {
    var n;
    var i;
    for (var o = e.find("> td"), a = t = t || 0; a < o.length; ++a) {
      n = o.eq(a);
      if (this._isCellValid(n)) {
        i = n;
        break;
      }
    }
    return i;
  };
  o._getNextCell = function (e, t, n) {
    var i;
    var o;
    var a = n || this._focusedCellPosition;
    var r = this.isRowFocusType();
    var l = r || ["next", "previous"].includes(e);
    if (this._focusedView && a) {
      var u = this._getNewPositionByCode(a, t, e);
      i = (0, s.default)(this._getCell(u));
      var d = e === "previous" ? this._isFirstValidCell(u) : this._isLastValidCell(u);
      if ((0, k.isElementDefined)(i) && !this._isCellValid(i) && this._isCellInRow(u, l) && !d) {
        i = r ? this.getFirstValidCellInRow(i.parent(), u.columnIndex) : this._getNextCell(e, "cell", u);
      }
      o = (0, k.isElementDefined)(i) && i.parent();
      if (this._hasSkipRow(o)) {
        var c = this._getRowIndex(o);
        if (this._isLastRow(c)) {
          return null;
        }
        i = this._getNextCell(e, "row", {
          columnIndex: a.columnIndex,
          rowIndex: c
        });
      }
      if ((0, k.isElementDefined)(i)) {
        return i;
      } else {
        return null;
      }
    }
    return null;
  };
  o._startEditing = function (e, t) {
    var n = this._focusedCellPosition;
    var i = this.getVisibleRowIndex();
    var o = this.getVisibleColumnIndex();
    var a = this._dataController.items()[i];
    var r = this._columnsController.getVisibleColumns()[o];
    if (this._isAllowEditing(a, r)) {
      if (this._isRowEditMode()) {
        this._editingController.editRow(i);
      } else if (n) {
        this._startEditCell(e, t);
      }
    }
  };
  o._isAllowEditing = function (e, t) {
    return this._editingController.allowUpdating({
      row: e
    }) && t && t.allowEditing;
  };
  o._editFocusedCell = function () {
    var e = this.getVisibleRowIndex();
    var t = this.getVisibleColumnIndex();
    return this._editingController.editCell(e, t);
  };
  o._startEditCell = function (e, t) {
    var n = this;
    this._fastEditingStarted = (0, c.isDefined)(t);
    var i = this._editFocusedCell();
    var o = (0, c.isDeferred)(i);
    if (this._isFastEditingStarted() && (o || i)) {
      var a = o && t === C.FAST_EDITING_DELETE_KEY ? "" : t;
      var r = o ? i : (0, u.Deferred)().resolve();
      var s = this._rowsView.waitAsyncTemplates(true);
      (0, u.when)(r, s).done(function () {
        n._editingCellHandler(e, a);
      });
    }
  };
  o._editingCellHandler = function (e, t) {
    var n;
    var i;
    var o = this._getFocusedCell().find(C.INTERACTIVE_ELEMENTS_SELECTOR).eq(0);
    var a = o.get(0);
    if (a) {
      var r = (0, m.createEvent)(e, {
        type: "keydown",
        target: a
      });
      var s = (0, m.createEvent)(e, {
        type: "keypress",
        target: a
      });
      var u = (0, m.createEvent)(e, {
        type: "input",
        target: a
      });
      u.originalEvent &&= (0, m.createEvent)(u.originalEvent, {
        data: t
      });
      if ((i = (n = a).select) !== null && i !== undefined) {
        i.call(n);
      }
      f.default.trigger(o, r);
      if (!r.isDefaultPrevented() && (f.default.trigger(o, s), !s.isDefaultPrevented())) {
        var d = l.default.mozilla ? 25 : 0;
        setTimeout(function () {
          o.val(t);
          var e = o.closest(`.${C.WIDGET_CLASS}`);
          f.default.off(e, "focusout");
          f.default.one(e, "focusout", function () {
            f.default.trigger(o, "change");
          });
          f.default.trigger(o, u);
        }, d);
      }
    }
  };
  o._fireFocusChangingEvents = function (e, t, n, i) {
    var a = {};
    var r = this._getCellPosition(t) ?? {};
    if (this.isCellFocusType()) {
      if (!(a = this._fireFocusedCellChanging(e, t, i)).cancel) {
        r.columnIndex = a.newColumnIndex;
        r.rowIndex = a.newRowIndex;
        i = a.isHighlighted;
        t = (0, s.default)(this._getCell(r));
      }
    }
    if (!a.cancel && n && t) {
      if (!(a = this._fireFocusedRowChanging(e, t.parent())).cancel) {
        r.rowIndex = a.newRowIndex;
        a.isHighlighted = i;
      }
    }
    a.$newCellElement = (0, s.default)(this._getCell(r));
    if (!a.$newCellElement.length) {
      a.$newCellElement = t;
    }
    return a;
  };
  o._fireFocusedCellChanging = function (e, t, n) {
    var i = this.option("focusedColumnIndex");
    var o = this.option("focusedRowIndex");
    var a = this._getCellPosition(t);
    var r = a ? a.columnIndex : -1;
    var l = a ? a.rowIndex : -1;
    var u = {
      cellElement: t,
      prevColumnIndex: i,
      prevRowIndex: o,
      newColumnIndex: r,
      newRowIndex: l,
      rows: this._dataController.getVisibleRows(),
      columns: this._columnsController.getVisibleColumns(),
      event: e,
      isHighlighted: n || false,
      cancel: false
    };
    this._canceledCellPosition = null;
    this.executeAction("onFocusedCellChanging", u);
    if (u.newColumnIndex !== r || u.newRowIndex !== l) {
      u.$newCellElement = (0, s.default)(this._getCell({
        columnIndex: u.newColumnIndex,
        rowIndex: u.newRowIndex
      }));
    }
    if (u.cancel) {
      this._canceledCellPosition = {
        rowIndex: l,
        columnIndex: r
      };
    }
    return u;
  };
  o._fireFocusedCellChanged = function (e) {
    var t = this._rowsView.getCellIndex(e);
    var n = e == null ? undefined : e.parent().data("options");
    var i = n == null ? undefined : n.key;
    this._memoFireFocusedCellChanged(i, t);
  };
  o._memoFireFocusedCellChanged = function (e, t) {
    var n = this._getFocusedCell();
    var i = this._getRowIndex(n == null ? undefined : n.parent());
    var o = Math.min(i - this._dataController.getRowIndexOffset(), this._dataController.items().length - 1);
    if (!this._editingController.isEditCell(o, t)) {
      var a = this._dataController.items()[o];
      var s = this._columnsController.getVisibleColumns()[t];
      this.executeAction("onFocusedCellChanged", {
        cellElement: n ? (0, r.getPublicElement)(n) : undefined,
        columnIndex: t,
        rowIndex: i,
        row: a,
        column: s
      });
    }
  };
  o._fireFocusedRowChanging = function (e, t) {
    var n = this._getRowIndex(t);
    var i = this.option("focusedRowIndex");
    var o = this._dataController.loadingOperationTypes();
    var a = {
      rowElement: t,
      prevRowIndex: i,
      newRowIndex: n,
      event: e,
      rows: this._dataController.getVisibleRows(),
      cancel: false
    };
    if (!this._dataController || this._dataController.isLoading() && (o.reload || o.paging)) {
      a.cancel = true;
      return a;
    } else {
      if (this.option("focusedRowEnabled")) {
        this.executeAction("onFocusedRowChanging", a);
        if (!a.cancel && a.newRowIndex !== n) {
          a.resetFocusedRow = a.newRowIndex < 0;
          if (!a.resetFocusedRow) {
            this.setFocusedRowIndex(a.newRowIndex);
          }
          a.rowIndexChanged = true;
        }
      }
      return a;
    }
  };
  o._fireFocusedRowChanged = function () {
    var e;
    var t = this.option("focusedRowEnabled");
    var n = this.option("focusedRowKey");
    var i = (e = this._focusController) === null || e === undefined ? undefined : e.getFocusedRowIndexByKey(n);
    if (!!t && (!(0, c.isDefined)(n) || !(i < 0))) {
      this._memoFireFocusedRowChanged(n, i);
    }
  };
  o._memoFireFocusedRowChanged = function (e, t) {
    var n = t - this._dataController.getRowIndexOffset();
    this.executeAction("onFocusedRowChanged", {
      rowElement: t < 0 ? undefined : this._rowsView.getRowElement(n),
      rowIndex: t,
      row: t < 0 ? undefined : this._dataController.getVisibleRows()[n]
    });
  };
  o._isEventInCurrentGrid = function (e) {
    return w.default.isElementInCurrentGrid(this, (0, s.default)(e.target));
  };
  o._isRowEditMode = function () {
    var e = this._editingController.getEditMode();
    return e === b.EDIT_MODE_ROW || e === b.EDIT_MODE_FORM;
  };
  o._isCellEditMode = function () {
    var e = this._editingController.getEditMode();
    return e === b.EDIT_MODE_CELL || e === b.EDIT_MODE_BATCH;
  };
  o._isFastEditingAllowed = function () {
    return this._isCellEditMode() && this.option("keyboardNavigation.editOnKeyPress");
  };
  o._getInteractiveElement = function (e, t) {
    var n = e.find(C.INTERACTIVE_ELEMENTS_SELECTOR).filter(":visible");
    if (t) {
      return n.last();
    } else {
      return n.first();
    }
  };
  o._applyTabIndexToElement = function (e) {
    var t = this.option("tabIndex") || 0;
    e.attr("tabindex", (0, c.isDefined)(t) ? t : 0);
  };
  o._getCell = function (e) {
    if (this._focusedView && e) {
      var t = this._dataController.getRowIndexOffset();
      var n = this._columnsController.getVisibleColumns(null, true)[e.columnIndex];
      var i = n && n.fixed ? this._getFixedColumnIndexOffset(n) : this._columnsController.getColumnIndexOffset();
      var o = e.rowIndex >= 0 ? e.rowIndex - t : -1;
      var a = e.columnIndex >= 0 ? e.columnIndex - i : -1;
      return this._focusedView.getCell({
        rowIndex: o,
        columnIndex: a
      });
    }
  };
  o._getRowIndex = function (e) {
    var t = this._rowsView.getRowIndex(e);
    if (t >= 0) {
      t += this._dataController.getRowIndexOffset();
    }
    return t;
  };
  o._hasSkipRow = function (e) {
    var t = e && e.get(0);
    return t && (t.style.display === "none" || (0, k.isDetailRow)(e) && !e.hasClass(this.addWidgetPrefix(b.EDIT_FORM_CLASS)));
  };
  o._allowEditingOnEnterKey = function () {
    return this.option("keyboardNavigation.enterKeyAction") === "startEdit";
  };
  o._isLegacyNavigation = function () {
    return this.option("useLegacyKeyboardNavigation");
  };
  o._getDirectionCodeByKey = function (e) {
    var t;
    switch (e) {
      case "upArrow":
        t = "prevRow";
        break;
      case "downArrow":
        t = "nextRow";
        break;
      case "leftArrow":
        t = this.option("rtlEnabled") ? "nextInRow" : "previousInRow";
        break;
      case "rightArrow":
        t = this.option("rtlEnabled") ? "previousInRow" : "nextInRow";
    }
    return t;
  };
  o._isVirtualScrolling = function () {
    var e = this.option("scrolling.mode");
    return e === "virtual" || e === "infinite";
  };
  o._isVirtualRowRender = function () {
    return this._isVirtualScrolling() || w.default.isVirtualRowRendering(this);
  };
  o._isVirtualColumnRender = function () {
    return this.option("scrolling.columnRenderingMode") === "virtual";
  };
  o._scrollBy = function (e, t, n, i) {
    var o = this;
    var a = this._rowsView.getScrollable();
    if (o._focusedCellPosition) {
      a.on("scroll", function e() {
        a.off("scroll", e);
        setTimeout(o.restoreFocusableElement.bind(o, n, i));
      });
    }
    return a.scrollBy({
      left: e,
      top: t
    });
  };
  o._isInsideEditForm = function (e) {
    var t = (0, s.default)(e).closest(`.${this.addWidgetPrefix(b.EDIT_FORM_CLASS)}`);
    return t.length && this.elementIsInsideGrid(t);
  };
  o._isMasterDetailCell = function (e) {
    var t = (0, s.default)(e).closest(`.${C.MASTER_DETAIL_CELL_CLASS}`);
    return t.length && this.elementIsInsideGrid(t);
  };
  o._processNextCellInMasterDetail = function (e, t) {
    if (!this._isInsideEditForm(e) && e) {
      this._applyTabIndexToElement(e);
    }
  };
  o._handleTabKeyOnMasterDetailCell = function (e, t) {
    if (this._isMasterDetailCell(e)) {
      this._updateFocusedCellPosition((0, s.default)(e), t);
      var n = this._getNextCell(t, "row");
      this._processNextCellInMasterDetail(n, (0, s.default)(e));
      return true;
    }
    return false;
  };
  o._getElementType = function (e) {
    if ((0, s.default)(e).is("tr")) {
      return "row";
    } else {
      return "cell";
    }
  };
  o._isFastEditingStarted = function () {
    return this._isFastEditingAllowed() && this._fastEditingStarted;
  };
  o._getVisibleColumnCount = function () {
    return this._columnsController.getVisibleColumns(null, true).length;
  };
  o._isCellInRow = function (e, t) {
    var n = e.columnIndex;
    var i = this._getVisibleColumnCount();
    if (t) {
      return n >= 0 && n <= i - 1;
    } else {
      return n > 0 && n < i - 1;
    }
  };
  o._isCellElement = function (e) {
    return e.length && e[0].tagName === "TD";
  };
  o._getCellElementFromTarget = function (e) {
    var t = this._getElementType(e);
    var n = (0, s.default)(e);
    if (t === "cell") {
      return n.closest(`.${b.ROW_CLASS} > td`);
    } else {
      return n.children().not(`.${C.COMMAND_EXPAND_CLASS}`).first();
    }
  };
  o._getRowsViewElement = function () {
    var e;
    if ((e = this._rowsView) === null || e === undefined) {
      return undefined;
    } else {
      return e.element();
    }
  };
  o.isKeyboardEnabled = function () {
    return this.option("keyboardNavigation.enabled");
  };
  o._processCanceledEditCellPosition = function (e, t) {
    if (this._canceledCellPosition) {
      var n = this._canceledCellPosition.rowIndex === e && this._canceledCellPosition.columnIndex === t;
      this._canceledCellPosition = null;
      return n;
    }
  };
  o.updateFocusedRowIndex = function () {
    var e = this._dataController;
    var t = this.getVisibleRowIndex();
    var n = e.items();
    var i = n.length ? n.length - 1 : -1;
    var o = e.getRowIndexOffset();
    if (i >= 0 && t > i) {
      this.setFocusedRowIndex(i + o);
    }
  };
  return i;
}(x.default.ViewController);
exports.KeyboardNavigationController = E;
var O = {
  defaultOptions: function () {
    return {
      useLegacyKeyboardNavigation: false,
      keyboardNavigation: {
        enabled: true,
        enterKeyAction: "startEdit",
        enterKeyDirection: "none",
        editOnKeyPress: false
      }
    };
  },
  controllers: {
    keyboardNavigation: E
  },
  extenders: {
    views: {
      rowsView: {
        _rowClick: function (e) {
          var t = this.getController("editing").getEditRowIndex();
          var n = this.getController("keyboardNavigation");
          var i = n.isKeyboardEnabled();
          if (t === e.rowIndex) {
            n.setCellFocusType();
          }
          var o = ((0, k.isMobile)() || !i) && this.option("focusedRowEnabled");
          if (o) {
            this._triggerPointerDownEventHandler(e, !i);
          }
          this.callBase.apply(this, arguments);
        },
        _triggerPointerDownEventHandler: function (e, t) {
          var n = e.event.originalEvent;
          if (n) {
            var i = this.getController("keyboardNavigation");
            var o = (0, s.default)(n.target);
            var a = this.getCellIndex(o);
            var r = this.getController("columns").getVisibleColumns()[a];
            var l = this.getController("data").items()[e.rowIndex];
            if (i._isAllowEditing(l, r) || t) {
              var u = (0, m.createEvent)(n, {
                currentTarget: n.target
              });
              i._pointerEventHandler(u);
            }
          }
        },
        renderFocusState: function (e) {
          var t = e ?? {};
          var n = t.preventScroll;
          var i = t.pageSizeChanged;
          var o = this.getController("keyboardNavigation");
          var a = this.element();
          if (a && !(0, v.focused)(a)) {
            a.attr("tabindex", null);
          }
          if (i) {
            o.updateFocusedRowIndex();
          }
          var r = o.getVisibleRowIndex();
          if (!(0, c.isDefined)(r) || r < 0) {
            r = 0;
          }
          var s = this.getCellElements(r);
          if (o.isKeyboardEnabled() && (s == null ? undefined : s.length)) {
            this.updateFocusElementTabIndex(s, n);
          }
        },
        updateFocusElementTabIndex: function (e) {
          var t = this.getController("keyboardNavigation");
          var n = e.eq(0).parent();
          if ((0, k.isGroupRow)(n)) {
            t._applyTabIndexToElement(n);
          } else {
            var i = t.getColumnIndex();
            if (!(0, c.isDefined)(i) || i < 0) {
              i = 0;
            }
            this._updateFocusedCellTabIndex(e, i);
          }
        },
        _updateFocusedCellTabIndex: function (e, t) {
          var n = this.getController("keyboardNavigation");
          var i = e ? e.length : -1;
          function o(e) {
            var t = n._isMasterDetailCell(e);
            var i = n._isCellValid(e);
            if (!t && i && n._isCellElement(e)) {
              n._applyTabIndexToElement(e);
              n.setCellFocusType();
              return true;
            }
          }
          var a = S.GridCoreKeyboardNavigationDom.getCellToFocus(e, t);
          if (a.length) {
            o(a);
          } else {
            if (i <= t) {
              t = i - 1;
            }
            for (var r = t; r < i && !o((0, s.default)(e[r])); ++r);
          }
        },
        renderDelayedTemplates: function (e) {
          this.callBase.apply(this, arguments);
          this._renderFocusByChange(e);
        },
        _renderFocusByChange: function (e) {
          var t = e ?? {};
          var n = t.operationTypes;
          var i = t.repaintChangesOnly;
          var o = n ?? {};
          var a = o.fullReload;
          var r = o.pageSize;
          if (!e || !i || a || r) {
            var s = (0, k.shouldPreventScroll)(this);
            this.renderFocusState({
              preventScroll: s,
              pageSizeChanged: r
            });
          }
        },
        _renderCore: function (e) {
          var t = this.callBase.apply(this, arguments);
          this._renderFocusByChange(e);
          return t;
        },
        _editCellPrepared: function (e) {
          var t = this._getEditorInstance(e);
          var n = this.getController("keyboardNavigation");
          var i = n && n._isFastEditingStarted();
          if (t && i) {
            this._handleEditingNavigationMode(t);
          }
          this.callBase.apply(this, arguments);
        },
        _handleEditingNavigationMode: function (e) {
          ["downArrow", "upArrow"].forEach(function (t) {
            var n = e._supportedKeys()[t];
            e.registerKeyHandler(t, function (t) {
              if (e._input().attr("aria-expanded") === "true") {
                return n && n.call(e, t);
              }
            });
          });
          e.registerKeyHandler("leftArrow", o.noop);
          e.registerKeyHandler("rightArrow", o.noop);
          if (e.NAME === C.DATEBOX_WIDGET_NAME && e.option("useMaskBehavior")) {
            e.registerKeyHandler("enter", o.noop);
          }
        },
        _getEditorInstance: function (e) {
          var t = e.find(".dx-texteditor").eq(0);
          return w.default.getWidgetInstance(t);
        }
      }
    },
    controllers: {
      editing: {
        editCell: function (e, t) {
          var n = this.getController("keyboardNavigation");
          if (n._processCanceledEditCellPosition(e, t)) {
            return false;
          }
          var i = this.callBase(e, t);
          if (i) {
            n.setupFocusedView();
          }
          return i;
        },
        editRow: function (e) {
          var t = this.getController("keyboardNavigation");
          var n = t.getVisibleColumnIndex();
          var i = this._columnsController.getVisibleColumns()[n];
          if (i && i.type || this.option("editing.mode") === b.EDIT_MODE_FORM) {
            t._resetFocusedCell();
          }
          this.callBase(e);
        },
        addRow: function (e) {
          var t = this.getController("keyboardNavigation");
          t.setupFocusedView();
          t.setCellFocusType();
          return this.callBase.apply(this, arguments);
        },
        getFocusedCellInRow: function (e) {
          var t = this.getController("keyboardNavigation");
          var n = this.callBase(e);
          if (t.isKeyboardEnabled() && t._focusedCellPosition.rowIndex === e) {
            var i = t._getFocusedCell();
            if ((0, k.isElementDefined)(i) && !i.hasClass(C.COMMAND_EDIT_CLASS)) {
              n = i;
            }
          }
          return n;
        },
        _processCanceledEditingCell: function () {
          var e = this;
          this.closeEditCell().done(function () {
            e.getController("keyboardNavigation")._updateFocus();
          });
        },
        init: function () {
          this.callBase();
          this._keyboardNavigationController = this.getController("keyboardNavigation");
        },
        closeEditCell: function () {
          var e = this._keyboardNavigationController;
          e._fastEditingStarted = false;
          var t = this.callBase.apply(this, arguments);
          e._updateFocus();
          return t;
        },
        _delayedInputFocus: function () {
          this._keyboardNavigationController._isNeedScroll = true;
          this.callBase.apply(this, arguments);
        },
        _isEditingStart: function () {
          var e = this.getController("keyboardNavigation");
          var t = this.callBase.apply(this, arguments);
          if (t && !e._isNeedFocus) {
            var n = e._getFocusedCell();
            e._focus(n, true);
          }
          return t;
        }
      },
      data: {
        _correctRowIndices: function (e) {
          var t = this;
          var n = t.getController("keyboardNavigation");
          var i = t.getController("editorFactory");
          var o = n._focusedCellPosition;
          t.callBase.apply(t, arguments);
          if (o && o.rowIndex >= 0) {
            var a = e(o.rowIndex);
            if (a) {
              o.rowIndex += a;
              i.refocus();
            }
          }
        },
        getMaxRowIndex: function () {
          var e = this.items().length - 1;
          var t = this.virtualItemsCount();
          if (t) {
            e += this.getRowIndexOffset() + t.end;
          }
          return e;
        }
      },
      adaptiveColumns: {
        _showHiddenCellsInView: function (e) {
          var t = e.viewName;
          var n = e.$cells;
          var i = e.isCommandColumn;
          this.callBase.apply(this, arguments);
          if (t === C.COLUMN_HEADERS_VIEW && !i) {
            n.each(function (e, t) {
              var n = (0, s.default)(t);
              if ((0, k.isCellInHeaderRow)(n)) {
                n.attr("tabindex", 0);
              }
            });
          }
        },
        _hideVisibleCellInView: function (e) {
          var t = e.viewName;
          var n = e.$cell;
          var i = e.isCommandColumn;
          this.callBase.apply(this, arguments);
          if (t === C.COLUMN_HEADERS_VIEW && !i && (0, k.isCellInHeaderRow)(n)) {
            n.removeAttr("tabindex");
          }
        }
      }
    }
  }
};
exports.keyboardNavigationModule = O;