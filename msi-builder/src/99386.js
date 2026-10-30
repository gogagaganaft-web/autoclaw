exports.default = undefined;
var i = f(require("./68374.js"));
var o = require("./13306.js");
var a = require("./75084.js");
var r = require("./35922.js");
var s = f(require("./28109.js"));
var l = f(require("./88221.js"));
var u = f(require("./43785.js"));
var d = f(require("./68912.js"));
var c = require("./62754.js");
var h = require("./57289.js");
function f(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
function p(e, t) {
  return (p = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (e, t) {
    e.__proto__ = t;
    return e;
  })(e, t);
}
var g = {
  thumbnail: {
    caption: "",
    calculateSortValue: "isDirectory",
    width: 36,
    alignment: "center",
    cssClass: "dx-filemanager-details-item-is-directory"
  },
  name: {
    caption: s.default.format("dxFileManager-listDetailsColumnCaptionName")
  },
  dateModified: {
    caption: s.default.format("dxFileManager-listDetailsColumnCaptionDateModified"),
    width: 110,
    hidingPriority: 1
  },
  size: {
    caption: s.default.format("dxFileManager-listDetailsColumnCaptionFileSize"),
    width: 90,
    alignment: "right",
    hidingPriority: 0
  },
  isParentFolder: {
    caption: "isParentFolder",
    visible: false,
    sortIndex: 0,
    sortOrder: "asc"
  }
};
var m = function (e) {
  var t;
  var n;
  function u() {
    return e.apply(this, arguments) || this;
  }
  n = e;
  (t = u).prototype = Object.create(n.prototype);
  t.prototype.constructor = t;
  p(t, n);
  var f = u.prototype;
  f._initMarkup = function () {
    var t = this;
    this._itemCount = 0;
    this._focusedItem = null;
    this._hasParentDirectoryItem = false;
    this._parentDirectoryItemKey = null;
    this._selectAllCheckBox = null;
    this._selectAllCheckBoxUpdating = false;
    this.$element().addClass("dx-filemanager-details");
    this._createFilesView();
    this._contextMenu.option("onContextMenuHidden", function () {
      return t._onContextMenuHidden();
    });
    e.prototype._initMarkup.call(this);
  };
  f._createFilesView = function () {
    var e = (0, i.default)("<div>").appendTo(this.$element());
    var t = this._isMultipleSelectionMode() ? "multiple" : "none";
    this._filesView = this._createComponent(e, l.default, {
      dataSource: this._createDataSource(),
      hoverStateEnabled: true,
      selection: {
        mode: t,
        showCheckBoxesMode: this._isDesktop() ? "onClick" : "none"
      },
      selectedRowKeys: this.option("selectedItemKeys"),
      focusedRowKey: this.option("focusedItemKey"),
      focusedRowEnabled: true,
      allowColumnResizing: true,
      scrolling: {
        mode: "virtual"
      },
      sorting: {
        mode: "single",
        showSortIndexes: false
      },
      loadPanel: {
        shading: true
      },
      showColumnLines: false,
      showRowLines: false,
      columnHidingEnabled: false,
      columns: this._createColumns(),
      onEditorPreparing: this._onEditorPreparing.bind(this),
      onRowPrepared: this._onRowPrepared.bind(this),
      onContextMenuPreparing: this._onContextMenuPreparing.bind(this),
      onSelectionChanged: this._onFilesViewSelectionChanged.bind(this),
      onFocusedRowChanged: this._onFilesViewFocusedRowChanged.bind(this),
      onOptionChanged: this._onFilesViewOptionChanged.bind(this),
      onContentReady: this._onContentReady.bind(this)
    });
  };
  f._createColumns = function () {
    var e = this;
    var t = this.option("detailColumns");
    t = (t = t.slice(0)).map(function (t) {
      var n = t;
      if ((0, r.isString)(t)) {
        n = {
          dataField: t
        };
      }
      return e._getPreparedColumn(n);
    });
    var n = this.option("customizeDetailColumns");
    if ((0, r.isFunction)(n)) {
      t = n(t);
    }
    t.push(this._getPreparedColumn({
      dataField: "isParentFolder"
    }));
    t.forEach(function (t) {
      return e._updateColumnDataField(t);
    });
    return t;
  };
  f._getPreparedColumn = function (e) {
    var t = {};
    var n = "";
    if (this._isDefaultColumn(e.dataField)) {
      var i = (0, o.extend)(true, {}, g[e.dataField]);
      n = i.cssClass || "";
      switch (e.dataField) {
        case "thumbnail":
          i.cellTemplate = this._createThumbnailColumnCell.bind(this);
          i.calculateSortValue = `fileItem.${i.calculateSortValue}`;
          break;
        case "name":
          i.cellTemplate = this._createNameColumnCell.bind(this);
          i.caption = s.default.format("dxFileManager-listDetailsColumnCaptionName");
          break;
        case "size":
          i.calculateCellValue = this._calculateSizeColumnCellValue.bind(this);
          i.caption = s.default.format("dxFileManager-listDetailsColumnCaptionFileSize");
          i.calculateSortValue = function (e) {
            if (e.fileItem.isDirectory) {
              return -1;
            } else {
              return e.fileItem.size;
            }
          };
          break;
        case "dateModified":
          i.caption = s.default.format("dxFileManager-listDetailsColumnCaptionDateModified");
      }
      (0, o.extend)(true, t, i);
    }
    (0, a.extendAttributes)(t, e, ["alignment", "caption", "dataField", "dataType", "hidingPriority", "sortIndex", "sortOrder", "visible", "visibleIndex", "width"]);
    if (e.cssClass) {
      n = `${n} ${e.cssClass}`;
    }
    if (n) {
      t.cssClass = n;
    }
    return t;
  };
  f._updateColumnDataField = function (e) {
    var t = this._isDefaultColumn(e.dataField) ? "" : "dataItem.";
    e.dataField = "fileItem." + t + e.dataField;
    return e;
  };
  f._isDefaultColumn = function (e) {
    return !!g[e];
  };
  f._onFileItemActionButtonClick = function (e) {
    var t = e.component;
    var n = e.element;
    var i = e.event;
    i.stopPropagation();
    var o = t.$element().closest(this._getItemSelector());
    var a = o.data("item");
    this._selectItem(a);
    var r = {
      itemData: a,
      itemElement: o,
      isActionButton: true
    };
    var s = this._getFileItemsForContextMenu(a);
    this._showContextMenu(s, n, i, r);
    this._activeFileActionsButton = t;
    this._activeFileActionsButton.setActive(true);
  };
  f._onContextMenuHidden = function () {
    if (this._activeFileActionsButton) {
      this._activeFileActionsButton.setActive(false);
    }
  };
  f._getItemThumbnailCssClass = function () {
    return "dx-filemanager-details-item-thumbnail";
  };
  f._getItemSelector = function () {
    return `.dx-data-row`;
  };
  f._onItemDblClick = function (e) {
    var t = (0, i.default)(e.currentTarget).data("item");
    this._raiseSelectedItemOpened(t);
  };
  f._isAllItemsSelected = function () {
    var e = this._hasParentDirectoryItem ? this._itemCount - 1 : this._itemCount;
    var t = this._filesView.option("selectedRowKeys");
    return !!t.length && (t.length >= e || undefined);
  };
  f._onEditorPreparing = function (e) {
    var t = this;
    var n = e.component;
    var i = e.command;
    var o = e.row;
    var a = e.parentType;
    var r = e.editorOptions;
    this._filesView ||= n;
    if (i === "select" && o) {
      if (this._isParentDirectoryItem(o.data)) {
        r.disabled = true;
      }
    } else if (a === "headerRow") {
      r.onInitialized = function (e) {
        var n = e.component;
        t._selectAllCheckBox = n;
      };
      r.value = this._isAllItemsSelected();
      r.onValueChanged = function (e) {
        return t._onSelectAllCheckBoxValueChanged(e);
      };
    }
  };
  f._onSelectAllCheckBoxValueChanged = function (e) {
    var t = e.event;
    var n = e.previousValue;
    var i = e.value;
    if (t) {
      if (this._isAllItemsSelected() !== i) {
        if (i) {
          this._filesView.selectAll();
        } else {
          this._filesView.deselectAll();
        }
        t.preventDefault();
      }
    } else if (n && !this._selectAllCheckBoxUpdating && this._selectAllCheckBox) {
      this._selectAllCheckBox.option("value", n);
    }
  };
  f._onRowPrepared = function (e) {
    var t = e.rowType;
    var n = e.rowElement;
    var o = e.data;
    if (t === "data") {
      var a = (0, i.default)(n);
      a.data("item", o);
      if (this._isParentDirectoryItem(o)) {
        a.addClass("dx-filemanager-parent-directory-item");
      }
    }
  };
  f._onContextMenuPreparing = function (e) {
    if (this._isDesktop()) {
      var t = null;
      var n = {};
      if (e.row && e.row.rowType === "data") {
        n = e.row.data;
        this._selectItem(n);
        t = this._getFileItemsForContextMenu(n);
      }
      var i = (0, o.extend)({}, {
        targetElement: e.target === "content" && (0, r.isDefined)(e.row) ? this._filesView.getRowElement(e.rowIndex) : undefined,
        itemData: n,
        options: this._contextMenu.option(),
        event: e.event,
        isActionButton: false,
        cancel: false
      });
      this._raiseContextMenuShowing(i);
      e.items = i.cancel ? [] : this._contextMenu.createContextMenuItems(t, null, n);
    }
  };
  f._onFilesViewSelectionChanged = function (e) {
    var t = e.component;
    var n = e.selectedRowsData;
    var i = e.selectedRowKeys;
    var o = e.currentSelectedRowKeys;
    var a = e.currentDeselectedRowKeys;
    this._filesView = this._filesView || t;
    if (this._selectAllCheckBox) {
      this._selectAllCheckBoxUpdating = true;
      this._selectAllCheckBox.option("value", this._isAllItemsSelected());
      this._selectAllCheckBoxUpdating = false;
    }
    var r = n.map(function (e) {
      return e.fileItem;
    });
    this._tryRaiseSelectionChanged({
      selectedItemInfos: n,
      selectedItems: r,
      selectedItemKeys: i,
      currentSelectedItemKeys: o,
      currentDeselectedItemKeys: a
    });
  };
  f._onFilesViewFocusedRowChanged = function (e) {
    var t;
    if (!this._isMultipleSelectionMode()) {
      this._selectItemSingleSelection(e.row?.data);
    }
    var i = ((t = e.row) === null || t === undefined ? undefined : t.data.fileItem) || null;
    this._onFocusedItemChanged({
      item: i,
      itemKey: i == null ? undefined : i.key,
      itemElement: e.rowElement
    });
  };
  f._onFilesViewOptionChanged = function (e) {
    if (e.fullName.indexOf("sortOrder") > -1) {
      this._filesView.columnOption("isParentFolder", {
        sortOrder: "asc",
        sortIndex: 0
      });
    }
  };
  f._resetFocus = function () {
    this._setFocusedItemKey(undefined);
  };
  f._createThumbnailColumnCell = function (e, t) {
    this._getItemThumbnailContainer(t.data).appendTo(e);
  };
  f._createNameColumnCell = function (e, t) {
    var n = this;
    var o = (0, i.default)("<div>");
    var a = (0, i.default)("<span>").text(t.data.fileItem.name).addClass("dx-filemanager-details-item-name");
    var r = (0, i.default)("<div>").append(a, o).addClass("dx-filemanager-details-item-name-wrapper");
    (0, i.default)(e).append(r);
    this._createComponent(o, d.default, {
      onClick: function (e) {
        return n._onFileItemActionButtonClick(e);
      }
    });
  };
  f._calculateSizeColumnCellValue = function (e) {
    if (e.fileItem.isDirectory) {
      return "";
    } else {
      return (0, a.getDisplayFileSize)(e.fileItem.size);
    }
  };
  f._selectItem = function (e) {
    (this._isMultipleSelectionMode() ? this._selectItemMultipleSelection : this._selectItemSingleSelection).call(this, e);
  };
  f._deselectItem = function (e) {
    this._filesView.deselectRows([e.fileItem.key]);
  };
  f._selectItemSingleSelection = function (e) {
    if (!this._focusedItem || !e || this._focusedItem.fileItem.key !== e.fileItem.key) {
      var t = this._focusedItem;
      this._focusedItem = e;
      var n = [];
      if (t) {
        n.push(t.fileItem.key);
      }
      var i = [];
      var o = [];
      if (e && !this._isParentDirectoryItem(e)) {
        i.push(e.fileItem);
        o.push(e.fileItem.key);
      }
      this._raiseSelectionChanged({
        selectedItems: i,
        selectedItemKeys: o,
        currentSelectedItemKeys: [].concat(o),
        currentDeselectedItemKeys: n
      });
    }
  };
  f._selectItemMultipleSelection = function (e) {
    var t = e.fileItem;
    if (!this._filesView.isRowSelected(t.key)) {
      var n = this._filesView.getController("selection").isSelectionWithCheckboxes();
      this._filesView.selectRows([t.key], n);
    }
  };
  f._setSelectedItemKeys = function (e) {
    this._filesView.option("selectedRowKeys", e);
  };
  f._setFocusedItemKey = function (e) {
    var t;
    if ((t = this._filesView) !== null && t !== undefined) {
      t.option("focusedRowKey", e);
    }
  };
  f.clearSelection = function () {
    if (this._isMultipleSelectionMode()) {
      this._filesView.clearSelection();
    } else {
      this._filesView.option("focusedRowIndex", -1);
    }
  };
  f.refresh = function (e, t) {
    var n = {
      dataSource: this._createDataSource()
    };
    if (e && Object.prototype.hasOwnProperty.call(e, "focusedItemKey")) {
      if ((0, r.isDefined)(e.focusedItemKey)) {
        n.focusedRowKey = e.focusedItemKey;
      } else {
        n.focusedRowIndex = -1;
      }
    }
    if (!(0, r.isDefined)(n.focusedRowKey) && n.focusedRowIndex === -1 && t === h.OPERATIONS.NAVIGATION) {
      n.paging = {
        pageIndex: 0
      };
      this._needResetScrollPosition = true;
    }
    this._filesView.option(n);
    this._refreshDeferred = new c.Deferred();
    return this._refreshDeferred.promise();
  };
  f._getScrollable = function () {
    return this._filesView.getScrollable();
  };
  f.getSelectedItems = function () {
    if (this._isMultipleSelectionMode()) {
      return this._filesView.getSelectedRowsData();
    } else if (this._focusedItem && !this._isParentDirectoryItem(this._focusedItem)) {
      return [this._focusedItem];
    } else {
      return [];
    }
  };
  return u;
}(u.default);
exports.default = m;
module.exports = exports.default;
module.exports.default = exports.default;