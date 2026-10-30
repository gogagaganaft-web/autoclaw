Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.PivotGrid = undefined;
var i = A(require("./99393.js"));
var o = require("./6415.js");
var a = A(require("./68374.js"));
var r = require("./20576.js");
var s = require("./62754.js");
var l = require("./13306.js");
var u = require("./95479.js");
var d = require("./58664.js");
var c = require("./68752.js");
var h = require("./35922.js");
var f = require("./58201.js");
var p = require("./95429.js");
var g = A(require("./55994.js"));
var m = require("./39611.js");
var _ = A(require("./28109.js"));
var v = A(require("./10042.js"));
var y = A(require("./51495.js"));
var b = A(require("./14390.js"));
var x = A(require("./60082.js"));
var w = require("./85654.js");
var C = A(require("./64318.js"));
var S = A(require("./9517.js"));
var k = require("./75705.js");
var D = require("./63857.js");
var I = require("./16491.js");
var T = require("./70513.js");
var E = A(require("./95578.js"));
var O = require("./28580.js");
function A(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
var P = (0, f.getWindow)();
var M = "<tr>";
var R = "<td>";
var B = "<div>";
var L = ["allowSorting", "allowSortingBySummary", "allowFiltering", "allowExpandAll"];
function V(e) {
  var t = 0;
  (0, u.each)(e, function (e, n) {
    t += n || 0;
  });
  return t;
}
function F(e, t) {
  var n = t / e.length;
  for (var i = 0; i < e.length; i += 1) {
    e[i] -= n;
  }
}
function H(e) {
  e.off("scroll").off("stop");
}
function N(e, t) {
  var n = t === "width" ? ["borderLeftWidth", "borderRightWidth"] : ["borderTopWidth", "borderBottomWidth"];
  var i = 0;
  (0, u.each)(e, function (e, t) {
    var o = P.getComputedStyle(t.get(0));
    n.forEach(function (e) {
      i += parseFloat(o[e]) || 0;
    });
  });
  return i;
}
var z = b.default.inherit({
  _getDefaultOptions: function () {
    return (0, l.extend)(this.callBase(), {
      scrolling: {
        timeout: 300,
        renderingThreshold: 150,
        minTimeout: 10,
        mode: "standard",
        useNative: "auto",
        removeInvisiblePages: true,
        virtualRowHeight: 50,
        virtualColumnWidth: 100,
        loadTwoPagesOnStart: true
      },
      encodeHtml: true,
      dataSource: null,
      activeStateEnabled: false,
      fieldChooser: {
        minWidth: 250,
        minHeight: 250,
        enabled: true,
        allowSearch: false,
        searchTimeout: 500,
        layout: 0,
        title: _.default.format("dxPivotGrid-fieldChooserTitle"),
        width: 600,
        height: 600,
        applyChangesMode: "instantly"
      },
      onContextMenuPreparing: null,
      allowSorting: false,
      allowSortingBySummary: false,
      allowFiltering: false,
      allowExpandAll: false,
      wordWrapEnabled: true,
      fieldPanel: {
        showColumnFields: true,
        showFilterFields: true,
        showDataFields: true,
        showRowFields: true,
        allowFieldDragging: true,
        visible: false,
        texts: {
          columnFieldArea: _.default.format("dxPivotGrid-columnFieldArea"),
          rowFieldArea: _.default.format("dxPivotGrid-rowFieldArea"),
          filterFieldArea: _.default.format("dxPivotGrid-filterFieldArea"),
          dataFieldArea: _.default.format("dxPivotGrid-dataFieldArea")
        }
      },
      dataFieldArea: "column",
      export: {
        enabled: false,
        fileName: "PivotGrid"
      },
      showRowTotals: true,
      showRowGrandTotals: true,
      showColumnTotals: true,
      showColumnGrandTotals: true,
      hideEmptySummaryCells: true,
      showTotalsPrior: "none",
      rowHeaderLayout: "standard",
      loadPanel: {
        enabled: true,
        text: _.default.format("Loading"),
        width: 200,
        height: 70,
        showIndicator: true,
        indicatorSrc: "",
        showPane: true
      },
      texts: {
        grandTotal: _.default.format("dxPivotGrid-grandTotal"),
        total: _.default.getFormatter("dxPivotGrid-total"),
        noData: _.default.format("dxDataGrid-noDataText"),
        showFieldChooser: _.default.format("dxPivotGrid-showFieldChooser"),
        expandAll: _.default.format("dxPivotGrid-expandAll"),
        collapseAll: _.default.format("dxPivotGrid-collapseAll"),
        sortColumnBySummary: _.default.getFormatter("dxPivotGrid-sortColumnBySummary"),
        sortRowBySummary: _.default.getFormatter("dxPivotGrid-sortRowBySummary"),
        removeAllSorting: _.default.format("dxPivotGrid-removeAllSorting"),
        exportToExcel: _.default.format("dxDataGrid-exportToExcel"),
        dataNotAvailable: _.default.format("dxPivotGrid-dataNotAvailable")
      },
      onCellClick: null,
      onCellPrepared: null,
      showBorders: false,
      stateStoring: {
        enabled: false,
        storageKey: null,
        type: "localStorage",
        customLoad: null,
        customSave: null,
        savingTimeout: 2000
      },
      onExpandValueChanging: null,
      renderCellCountLimit: 20000,
      onExporting: null,
      headerFilter: {
        width: 252,
        height: 325,
        allowSelectAll: true,
        showRelevantValues: false,
        search: {
          enabled: false,
          timeout: 500,
          editorOptions: {},
          mode: "contains"
        },
        texts: {
          emptyValue: _.default.format("dxDataGrid-headerFilterEmptyValue"),
          ok: _.default.format("dxDataGrid-headerFilterOK"),
          cancel: _.default.format("dxDataGrid-headerFilterCancel")
        }
      }
    });
  },
  _updateCalculatedOptions: function (e) {
    var t = this;
    (0, u.each)(e, function (e, n) {
      (0, u.each)(L, function (e, i) {
        var o = n._initProperties && i in n._initProperties && n._initProperties[i] === undefined;
        if (n[i] === undefined || o) {
          (0, O.setFieldProperty)(n, i, t.option(i));
        }
      });
    });
  },
  _getDataControllerOptions: function () {
    var e = this;
    return {
      component: e,
      dataSource: e.option("dataSource"),
      texts: e.option("texts"),
      showRowTotals: e.option("showRowTotals"),
      showRowGrandTotals: e.option("showRowGrandTotals"),
      showColumnTotals: e.option("showColumnTotals"),
      showTotalsPrior: e.option("showTotalsPrior"),
      showColumnGrandTotals: e.option("showColumnGrandTotals"),
      dataFieldArea: e.option("dataFieldArea"),
      rowHeaderLayout: e.option("rowHeaderLayout"),
      hideEmptySummaryCells: e.option("hideEmptySummaryCells"),
      onFieldsPrepared: function (t) {
        e._updateCalculatedOptions(t);
      }
    };
  },
  _initDataController: function () {
    var e = this;
    if (e._dataController) {
      e._dataController.dispose();
    }
    e._dataController = new S.default.DataController(e._getDataControllerOptions());
    if ((0, f.hasWindow)()) {
      e._dataController.changed.add(function () {
        e._render();
      });
    }
    e._dataController.scrollChanged.add(function (t) {
      e._scrollLeft = t.left;
      e._scrollTop = t.top;
    });
    e._dataController.loadingChanged.add(function () {
      e._updateLoading();
    });
    e._dataController.progressChanged.add(e._updateLoading.bind(e));
    e._dataController.dataSourceChanged.add(function () {
      e._trigger("onChanged");
    });
    var t = e.option("onExpandValueChanging");
    if (t) {
      e._dataController.expandValueChanging.add(function (e) {
        t(e);
      });
    }
  },
  _init: function () {
    this.callBase();
    this._initDataController();
    x.default.logHeaderFilterDeprecatedWarningIfNeed(this);
    this._scrollLeft = this._scrollTop = null;
    this._initActions();
  },
  _initActions: function () {
    this._actions = {
      onChanged: this._createActionByOption("onChanged"),
      onContextMenuPreparing: this._createActionByOption("onContextMenuPreparing"),
      onCellClick: this._createActionByOption("onCellClick"),
      onExporting: this._createActionByOption("onExporting"),
      onCellPrepared: this._createActionByOption("onCellPrepared")
    };
  },
  _trigger: function (e, t) {
    this._actions[e](t);
  },
  _optionChanged: function (e) {
    if (L.includes(e.name)) {
      var t = this.getDataSource().fields();
      this._updateCalculatedOptions(t);
    }
    switch (e.name) {
      case "dataSource":
      case "allowSorting":
      case "allowFiltering":
      case "allowExpandAll":
      case "allowSortingBySummary":
      case "scrolling":
      case "stateStoring":
        this._initDataController();
        this._fieldChooserPopup.hide();
        this._renderFieldChooser();
        this._invalidate();
        break;
      case "texts":
      case "showTotalsPrior":
      case "showRowTotals":
      case "showRowGrandTotals":
      case "showColumnTotals":
      case "showColumnGrandTotals":
      case "hideEmptySummaryCells":
      case "dataFieldArea":
        this._dataController.updateViewOptions(this._getDataControllerOptions());
        break;
      case "useNativeScrolling":
      case "encodeHtml":
      case "renderCellCountLimit":
        break;
      case "rtlEnabled":
        this.callBase(e);
        this._renderFieldChooser();
        this._renderContextMenu();
        if ((0, f.hasWindow)()) {
          this._renderLoadPanel(this._dataArea.groupElement(), this.$element());
        }
        this._invalidate();
        break;
      case "export":
        this._renderDescriptionArea();
        break;
      case "onExpandValueChanging":
        break;
      case "onCellClick":
      case "onContextMenuPreparing":
      case "onExporting":
      case "onExported":
      case "onFileSaving":
      case "onCellPrepared":
        this._actions[e.name] = this._createActionByOption(e.name);
        break;
      case "fieldChooser":
        this._renderFieldChooser();
        this._renderDescriptionArea();
        break;
      case "loadPanel":
        if ((0, f.hasWindow)()) {
          if (e.fullName === "loadPanel.enabled") {
            clearTimeout(this._hideLoadingTimeoutID);
            this._renderLoadPanel(this._dataArea.groupElement(), this.$element());
          } else {
            this._renderLoadPanel(this._dataArea.groupElement(), this.$element());
            this._invalidate();
          }
        }
        break;
      case "fieldPanel":
        this._renderDescriptionArea();
        this._invalidate();
        break;
      case "headerFilter":
        this._renderFieldChooser();
        this._invalidate();
        break;
      case "showBorders":
        this._tableElement().toggleClass("dx-pivotgrid-border", !!e.value);
        this.updateDimensions();
        break;
      case "wordWrapEnabled":
        this._tableElement().toggleClass("dx-word-wrap", !!e.value);
        this.updateDimensions();
        break;
      case "rowHeaderLayout":
        this._tableElement().find(`.dx-area-row-cell`).toggleClass("dx-area-tree-view", e.value === "tree");
        this._dataController.updateViewOptions(this._getDataControllerOptions());
        break;
      case "height":
      case "width":
        this._hasHeight = null;
        this.callBase(e);
        this.resize();
        break;
      default:
        this.callBase(e);
    }
  },
  _updateScrollPosition: function (e, t, n) {
    var i;
    var o;
    var a = arguments.length > 3 && arguments[3] !== undefined && arguments[3];
    var r = this;
    var s = r._scrollTop || r._scrollLeft;
    if (!r._scrollUpdating) {
      r._scrollUpdating = true;
      if (t && !t.hasScroll() && r._hasHeight) {
        r._scrollTop = null;
      }
      if (e && !e.hasScroll()) {
        r._scrollLeft = null;
      }
      if (r._scrollTop !== null || r._scrollLeft !== null || s || r.option("rtlEnabled")) {
        i = r._scrollTop || 0;
        o = r._scrollLeft || 0;
        n.scrollTo({
          left: o,
          top: i
        }, a);
        e.scrollTo({
          left: o
        }, a);
        t.scrollTo({
          top: i
        }, a);
        r._dataController.updateWindowScrollPosition(r._scrollTop);
      }
      r._scrollUpdating = false;
    }
  },
  _subscribeToEvents: function (e, t, n) {
    var i = this;
    (0, u.each)([e, t, n], function (o, a) {
      (function (e, t) {
        H(e);
        e.on("scroll", t).on("stop", t);
      })(a, function (o) {
        return function (o, a) {
          var r = o.scrollOffset;
          var s = a._getScrollable();
          var l = s.option("direction") !== "vertical" ? r.left : i._scrollLeft;
          var u = s.option("direction") !== "horizontal" && i._hasHeight ? r.top : i._scrollTop;
          if ((i._scrollLeft || 0) !== (l || 0) || (i._scrollTop || 0) !== (u || 0)) {
            i._scrollLeft = l;
            i._scrollTop = u;
            i._updateScrollPosition(e, t, n);
            if (i.option("scrolling.mode") === "virtual") {
              i._dataController.setViewportPosition(i._scrollLeft, i._scrollTop);
            }
          }
        }(o, a);
      });
    });
    if (!i._hasHeight) {
      i._dataController.subscribeToWindowScrollEvents(n.groupElement());
    }
  },
  _clean: r.noop,
  _needDelayResizing: function (e) {
    return e.length * (e.length ? e[0].length : 0) > this.option("renderCellCountLimit");
  },
  _renderFieldChooser: function () {
    var t = this;
    var n = t._pivotGridContainer;
    var i = t.option("fieldChooser") || {};
    var o = i.applyChangesMode === "onDemand" ? [{
      toolbar: "bottom",
      location: "after",
      widget: "dxButton",
      options: {
        text: _.default.format("OK"),
        onClick: function () {
          t._fieldChooserPopup.$content().dxPivotGridFieldChooser("applyChanges");
          t._fieldChooserPopup.hide();
        }
      }
    }, {
      toolbar: "bottom",
      location: "after",
      widget: "dxButton",
      options: {
        text: _.default.format("Cancel"),
        onClick: function () {
          t._fieldChooserPopup.hide();
        }
      }
    }] : [];
    var r = {
      layout: i.layout,
      texts: i.texts || {},
      dataSource: t.getDataSource(),
      allowSearch: i.allowSearch,
      searchTimeout: i.searchTimeout,
      width: undefined,
      height: undefined,
      headerFilter: t.option("headerFilter"),
      encodeHtml: t.option("fieldChooser.encodeHtml") ?? t.option("encodeHtml"),
      applyChangesMode: i.applyChangesMode,
      onContextMenuPreparing: function (e) {
        t._trigger("onContextMenuPreparing", e);
      }
    };
    var s = {
      shading: false,
      title: i.title,
      width: i.width,
      height: i.height,
      showCloseButton: true,
      resizeEnabled: true,
      minWidth: i.minWidth,
      minHeight: i.minHeight,
      toolbarItems: o,
      onResize: function (e) {
        e.component.$content().dxPivotGridFieldChooser("updateDimensions");
      },
      onShown: function (e) {
        t._createComponent(e.component.content(), D.FieldChooser, r);
      },
      onHidden: function (e) {
        var t = e.component.$content().dxPivotGridFieldChooser("instance");
        t.resetTreeView();
        t.cancelChanges();
      }
    };
    if (t._fieldChooserPopup) {
      t._fieldChooserPopup.option(s);
      t._fieldChooserPopup.$content().dxPivotGridFieldChooser(r);
    } else {
      t._fieldChooserPopup = t._createComponent((0, a.default)(B).addClass("dx-fieldchooser-popup").appendTo(n), y.default, s);
    }
  },
  _renderContextMenu: function () {
    var e = this;
    var t = e._pivotGridContainer;
    if (e._contextMenu) {
      e._contextMenu.$element().remove();
    }
    e._contextMenu = e._createComponent((0, a.default)(B).appendTo(t), v.default, {
      onPositioning: function (t) {
        var n = t.event;
        t.cancel = true;
        if (n) {
          var i = n.target.cellIndex >= 0 ? n.target : (0, a.default)(n.target).closest("td").get(0);
          if (i) {
            var o = e._createEventArgs(i, n);
            var r = e._getContextMenuItems(o);
            if (r) {
              t.component.option("items", r);
              t.cancel = false;
            }
          }
        }
      },
      onItemClick: function (e) {
        if (e.itemData.onItemClick) {
          e.itemData.onItemClick(e);
        }
      },
      cssClass: "dx-pivotgrid",
      target: e.$element()
    });
  },
  _getContextMenuItems: function (e) {
    var t = this;
    var n = [];
    var i = t.option("texts");
    if (e.area === "row" || e.area === "column") {
      var o = e[`${e.area}Fields`];
      var a = e[e.area === "column" ? "rowFields" : "columnFields"];
      var r = e.cell.path && o[e.cell.path.length - 1];
      var s = t.getDataSource();
      if (r && r.allowExpandAll && e.cell.path.length < e[`${e.area}Fields`].length && !s.paginate()) {
        n.push({
          beginGroup: true,
          icon: "none",
          text: i.expandAll,
          onItemClick: function () {
            s.expandAll(r.index);
          }
        });
        n.push({
          text: i.collapseAll,
          icon: "none",
          onItemClick: function () {
            s.collapseAll(r.index);
          }
        });
      }
      if (e.cell.isLast && !s.paginate()) {
        var l = 0;
        (0, u.each)(a, function (t, o) {
          if (o.allowSortingBySummary) {
            (0, u.each)(e.dataFields, function (t, a) {
              if (!(0, h.isDefined)(e.cell.dataIndex) || e.cell.dataIndex === t) {
                var r = !(0, h.isDefined)(e.cell.dataIndex) && e.dataFields.length > 1;
                var u = e.area === "column" ? i.sortColumnBySummary : i.sortRowBySummary;
                var d = (0, O.findField)(e.dataFields, o.sortBySummaryField) === t && (e.cell.path || []).join("/") === (o.sortBySummaryPath || []).join("/");
                var f = (0, c.format)(u, r ? `${o.caption} - ${a.caption}` : o.caption);
                n.push({
                  beginGroup: l === 0,
                  icon: d ? o.sortOrder === "desc" ? "sortdowntext" : "sortuptext" : "none",
                  text: f,
                  onItemClick: function () {
                    s.field(o.index, {
                      sortBySummaryField: a.name || a.caption || a.dataField,
                      sortBySummaryPath: e.cell.path,
                      sortOrder: o.sortOrder === "desc" ? "asc" : "desc"
                    });
                    s.load();
                  }
                });
                l += 1;
              }
            });
          }
        });
        (0, u.each)(a, function (e, t) {
          if (t.allowSortingBySummary && (0, h.isDefined)(t.sortBySummaryField)) {
            n.push({
              beginGroup: l === 0,
              icon: "none",
              text: i.removeAllSorting,
              onItemClick: function () {
                (0, u.each)(a, function (e, t) {
                  s.field(t.index, {
                    sortBySummaryField: undefined,
                    sortBySummaryPath: undefined,
                    sortOrder: undefined
                  });
                });
                s.load();
              }
            });
            return false;
          }
        });
      }
    }
    if (t.option("fieldChooser.enabled")) {
      n.push({
        beginGroup: true,
        icon: "columnchooser",
        text: i.showFieldChooser,
        onItemClick: function () {
          t._fieldChooserPopup.show();
        }
      });
    }
    if (t.option("export.enabled")) {
      n.push({
        beginGroup: true,
        icon: "xlsxfile",
        text: i.exportToExcel,
        onItemClick: function () {
          t.exportTo();
        }
      });
    }
    e.items = n;
    t._trigger("onContextMenuPreparing", e);
    if ((n = e.items) && n.length) {
      return n;
    }
  },
  _createEventArgs: function (e, t) {
    var n;
    var i = this.getDataSource();
    var o = {
      rowFields: i.getAreaFields("row"),
      columnFields: i.getAreaFields("column"),
      dataFields: i.getAreaFields("data"),
      event: t
    };
    if ((n = (0, a.default)(e)).closest(`.dx-area-fields`).length || n.find(`.dx-area-fields`).length) {
      return (0, l.extend)(this._createFieldArgs(e), o);
    } else {
      return (0, l.extend)(this._createCellArgs(e), o);
    }
  },
  _createFieldArgs: function (e) {
    var t = (0, a.default)(e).children().data("field");
    var n = {
      field: t
    };
    if ((0, h.isDefined)(t)) {
      return n;
    } else {
      return {};
    }
  },
  _createCellArgs: function (e) {
    var t = (0, a.default)(e);
    var n = e.cellIndex;
    var i = e.parentElement.rowIndex;
    var r = t.closest("table");
    var s = r.data("data");
    var l = s && s[i] && s[i][n];
    return {
      area: r.data("area"),
      rowIndex: i,
      columnIndex: n,
      cellElement: (0, o.getPublicElement)(t),
      cell: l
    };
  },
  _handleCellClick: function (e) {
    var t = this;
    var n = t._createEventArgs(e.currentTarget, e);
    var i = n.cell;
    if (i && (n.area || !n.rowIndex && !n.columnIndex)) {
      t._trigger("onCellClick", n);
      if (i && !n.cancel && (0, h.isDefined)(i.expanded)) {
        setTimeout(function () {
          t._dataController[i.expanded ? "collapseHeaderItem" : "expandHeaderItem"](n.area, i.path);
        });
      }
    }
  },
  _getNoDataText: function () {
    return this.option("texts.noData");
  },
  _renderNoDataText: x.default.renderNoDataText,
  _renderLoadPanel: x.default.renderLoadPanel,
  _updateLoading: function (e) {
    var t = this;
    var n = t._dataController.isLoading();
    if (t._loadPanel) {
      var i = t._loadPanel.option("visible");
      if (!i) {
        t._startLoadingTime = new Date();
      }
      if (n) {
        if (e) {
          if (new Date() - t._startLoadingTime >= 1000) {
            t._loadPanel.option("message", `${Math.floor(e * 100)}%`);
          }
        } else {
          t._loadPanel.option("message", t.option("loadPanel.text"));
        }
      }
      clearTimeout(t._hideLoadingTimeoutID);
      if (i && !n) {
        t._hideLoadingTimeoutID = setTimeout(function () {
          t._loadPanel.option("visible", false);
          t.$element().removeClass("dx-overflow-hidden");
        });
      } else {
        var o = {
          visible: n
        };
        if (n) {
          o.position = x.default.calculateLoadPanelPosition(t._dataArea.groupElement());
        }
        t._loadPanel.option(o);
        t.$element().toggleClass("dx-overflow-hidden", !n);
      }
    }
  },
  _renderDescriptionArea: function () {
    var e;
    var t = this;
    var n = this.$element();
    var i = n.find(`.dx-area-description-cell`);
    var o = (0, a.default)(B).addClass("dx-pivotgrid-toolbar");
    var r = this.option("fieldPanel");
    var s = n.find(".dx-filter-header");
    var l = n.find(".dx-column-header");
    e = r.visible && r.showFilterFields ? s : r.visible && (r.showDataFields || r.showColumnFields) ? l : i;
    l.toggleClass("dx-bottom-border", !!r.visible && (!!r.showDataFields || !!r.showColumnFields));
    s.toggleClass("dx-bottom-border", !!r.visible && !!r.showFilterFields);
    i.toggleClass("dx-pivotgrid-background", r.visible && (r.showDataFields || r.showColumnFields || r.showRowFields));
    this.$element().find(".dx-pivotgrid-toolbar").remove();
    o.prependTo(e);
    if (this.option("fieldChooser.enabled")) {
      var u = (0, a.default)(B).appendTo(o).addClass("dx-pivotgrid-field-chooser-button");
      var d = {
        icon: "columnchooser",
        hint: this.option("texts.showFieldChooser"),
        onClick: function () {
          t.getFieldChooserPopup().show();
        }
      };
      this._createComponent(u, "dxButton", d);
    }
    if (this.option("export.enabled")) {
      var c = (0, a.default)(B).appendTo(o).addClass("dx-pivotgrid-export-button");
      var h = {
        icon: "xlsxfile",
        hint: this.option("texts.exportToExcel"),
        onClick: function () {
          t.exportTo();
        }
      };
      this._createComponent(c, "dxButton", h);
    }
  },
  _detectHasContainerHeight: function () {
    var e = this.$element();
    if ((0, h.isDefined)(this._hasHeight)) {
      var t = this.option("height") || this.$element().get(0).style.height;
      if (t && this._hasHeight ^ t !== "auto") {
        this._hasHeight = null;
      }
    }
    if (!(0, h.isDefined)(this._hasHeight) && !e.is(":hidden")) {
      this._pivotGridContainer.addClass("dx-hidden");
      var n = (0, a.default)(B);
      (0, d.setHeight)(n, 66666);
      e.append(n);
      this._hasHeight = (0, d.getHeight)(e) !== 66666;
      this._pivotGridContainer.removeClass("dx-hidden");
      n.remove();
    }
  },
  _renderHeaders: function (e, t, n, i) {
    var o = this.getDataSource();
    this._rowFields = this._rowFields || new T.FieldsArea(this, "row");
    this._rowFields.render(e, o.getAreaFields("row"));
    this._columnFields = this._columnFields || new T.FieldsArea(this, "column");
    this._columnFields.render(t, o.getAreaFields("column"));
    this._filterFields = this._filterFields || new T.FieldsArea(this, "filter");
    this._filterFields.render(n, o.getAreaFields("filter"));
    this._dataFields = this._dataFields || new T.FieldsArea(this, "data");
    this._dataFields.render(i, o.getAreaFields("data"));
    this.$element().dxPivotGridFieldChooserBase("instance").renderSortable();
  },
  _createTableElement: function () {
    var e = (0, a.default)("<table>").css({
      width: "100%"
    }).toggleClass("dx-pivotgrid-border", !!this.option("showBorders")).toggleClass("dx-word-wrap", !!this.option("wordWrapEnabled"));
    g.default.on(e, (0, m.addNamespace)(p.name, "dxPivotGrid"), "td", this._handleCellClick.bind(this));
    return e;
  },
  _renderDataArea: function (e) {
    var t = this._dataArea || new C.default.DataArea(this);
    this._dataArea = t;
    t.render(e, this._dataController.getCellsInfo());
    return t;
  },
  _renderRowsArea: function (e) {
    var t = this._rowsArea || new E.default.VerticalHeadersArea(this);
    this._rowsArea = t;
    t.render(e, this._dataController.getRowsInfo());
    return t;
  },
  _renderColumnsArea: function (e) {
    var t = this._columnsArea || new E.default.HorizontalHeadersArea(this);
    this._columnsArea = t;
    t.render(e, this._dataController.getColumnsInfo());
    return t;
  },
  _initMarkup: function () {
    var e = this;
    e.callBase.apply(this, arguments);
    e.$element().addClass("dx-pivotgrid");
  },
  _renderContentImpl: function () {
    var e;
    var t;
    var n;
    var i;
    var o;
    var r;
    var s;
    var l;
    var u = !this._pivotGridContainer;
    if (!(i = !u && this._tableElement())) {
      this.$element().addClass("dx-row-lines").addClass("dx-pivotgrid-fields-container");
      this._pivotGridContainer = (0, a.default)(B).addClass("dx-pivotgrid-container");
      this._renderFieldChooser();
      this._renderContextMenu();
      e = (0, a.default)(R).addClass("dx-area-column-cell");
      t = (0, a.default)(R).addClass("dx-area-row-cell");
      n = (0, a.default)(R).addClass("dx-area-data-cell");
      i = this._createTableElement();
      l = (0, a.default)(R).addClass("dx-data-header");
      s = (0, a.default)("<td>").attr("colspan", "2").addClass("dx-filter-header");
      r = (0, a.default)(R).addClass("dx-column-header");
      o = (0, a.default)(R).addClass("dx-area-description-cell");
      (0, a.default)(M).append(s).appendTo(i);
      (0, a.default)(M).append(l).append(r).appendTo(i);
      (0, a.default)(M).append(o).append(e).appendTo(i);
      (0, a.default)(M).addClass("dx-bottom-row").append(t).append(n).appendTo(i);
      this._pivotGridContainer.append(i);
      this.$element().append(this._pivotGridContainer);
      if (this.option("rowHeaderLayout") === "tree") {
        t.addClass("dx-area-tree-view");
      }
    }
    this.$element().addClass("dx-overflow-hidden");
    this._createComponent(this.$element(), I.FieldChooserBase, {
      dataSource: this.getDataSource(),
      encodeHtml: this.option("encodeHtml"),
      allowFieldDragging: this.option("fieldPanel.allowFieldDragging"),
      headerFilter: this.option("headerFilter"),
      visible: this.option("visible"),
      remoteSort: this.option("scrolling.mode") === "virtual"
    });
    var d = this._renderDataArea(n);
    var c = this._renderRowsArea(t);
    var h = this._renderColumnsArea(e);
    d.tableElement().prepend(h.headElement());
    if (u) {
      this._renderLoadPanel(d.groupElement().parent(), this.$element());
      this._renderDescriptionArea();
      c.renderScrollable();
      h.renderScrollable();
      d.renderScrollable();
    }
    [d, c, h].forEach(function (e) {
      H(e);
    });
    this._renderHeaders(o, r, s, l);
    this._update(u);
  },
  _update: function (e) {
    var t = this;
    function n() {
      t.updateDimensions();
    }
    if (t._needDelayResizing(t._dataArea.getData()) && e) {
      setTimeout(n);
    } else {
      n();
    }
  },
  _fireContentReadyAction: function () {
    if (!this._dataController.isLoading()) {
      this.callBase();
    }
  },
  getScrollPath: function (e) {
    if (e === "column") {
      return this._columnsArea.getScrollPath(this._scrollLeft);
    } else {
      return this._rowsArea.getScrollPath(this._scrollTop);
    }
  },
  getDataSource: function () {
    return this._dataController.getDataSource();
  },
  getFieldChooserPopup: function () {
    return this._fieldChooserPopup;
  },
  hasScroll: function (e) {
    if (e === "column") {
      return this._columnsArea.hasScroll();
    } else {
      return this._rowsArea.hasScroll();
    }
  },
  _dimensionChanged: function () {
    this.updateDimensions();
  },
  _visibilityChanged: function (e) {
    if (e) {
      this.updateDimensions();
    }
  },
  _dispose: function () {
    var e = this;
    clearTimeout(e._hideLoadingTimeoutID);
    e.callBase.apply(e, arguments);
    if (e._dataController) {
      e._dataController.dispose();
    }
  },
  _tableElement: function () {
    return this.$element().find("table").first();
  },
  addWidgetPrefix: function (e) {
    return `dx-pivotgrid-${e}`;
  },
  resize: function () {
    this.updateDimensions();
  },
  isReady: function () {
    return this.callBase() && !this._dataController.isLoading();
  },
  updateDimensions: function () {
    var e;
    var t;
    var n;
    var i;
    var o = this;
    var l = o._tableElement();
    var c = 0;
    var h = 0;
    var p = 0;
    var g = l.find(`.dx-area-data-cell`);
    var m = l.find(`.dx-area-row-cell`);
    var _ = l.find(`.dx-area-column-cell`);
    var v = l.find(`.dx-area-description-cell`);
    var y = l.find(".dx-filter-header");
    var b = l.find(".dx-column-header");
    var x = o._rowFields;
    var w = new s.Deferred();
    if ((0, f.hasWindow)()) {
      var C = x.isVisible() && o.option("rowHeaderLayout") !== "tree";
      o._detectHasContainerHeight();
      if (!o._dataArea.headElement().length) {
        o._dataArea.tableElement().prepend(o._columnsArea.headElement());
      }
      if (C) {
        o._rowsArea.updateColspans(x.getColumnsCount());
        o._rowsArea.tableElement().prepend(x.headElement());
      }
      l.addClass("dx-incompressible-fields");
      o._dataArea.reset();
      o._rowsArea.reset();
      o._columnsArea.reset();
      x.reset();
      function S(e, t) {
        return t - e >= 1;
      }
      function k(e, t, n, i, o) {
        if (n) {
          return e;
        } else {
          return t + (i ? o : 0);
        }
      }
      (0, r.deferUpdate)(function () {
        var f = o._rowsArea.getRowsHeight();
        var D = (0, d.getOuterHeight)(v[0], true) + (C ? f[0] : 0);
        var I = 0;
        var T = 0;
        if (o._hasHeight) {
          I = (0, d.getHeight)(y);
          var E = l.find(".dx-data-header");
          var A = (0, d.getHeight)(E);
          t = N([_, g, l, b, y], "height");
          T = (0, d.getHeight)(o.$element()) - I - A - (Math.max((0, d.getHeight)(o._dataArea.headElement()), (0, d.getHeight)(_), D) + t);
        }
        var P = o._dataArea.getScrollbarWidth();
        var M = S(T, (0, d.getHeight)(o._dataArea.tableElement()));
        o._dataArea.tableElement().css({
          width: o._hasHeight && M && P ? `calc(100% - ${P}px)` : "100%"
        });
        var R = o._dataArea.getColumnsWidth();
        var B = C ? f.slice(1) : f;
        var L = o._dataArea.getRowsHeight();
        var H = o._dataController.getColumnsInfo().length;
        var z = (0, O.mergeArraysByMaxValue)(B, L.slice(H));
        var j = L.slice(0, H);
        var W = V(j);
        var G = o._rowsArea.getColumnsWidth();
        c = (0, d.getWidth)(o._dataArea.tableElement());
        h = V(z);
        if (c && h) {
          p = V(G);
          var q = (0, d.getWidth)(o.$element());
          t = N([m, g, l], "width");
          var $ = c - (e = (e = q - p - t) > 0 ? e : c);
          if ($ >= 0 && $ <= 2) {
            F(R, $);
            c = e;
          }
          n = o._hasHeight && S(T, h);
          i = S(e, c);
          var U = k(T, h, n, i, P);
          (0, r.deferRender)(function () {
            o._columnsArea.tableElement().append(o._dataArea.headElement());
            x.tableElement().append(o._rowsArea.headElement());
            if (D > W) {
              F(j, W - D);
              o._columnsArea.setRowsHeight(j);
            }
            l.removeClass("dx-incompressible-fields");
            b.children().css("maxWidth", e);
            o._columnsArea.setGroupWidth(e);
            o._columnsArea.processScrollBarSpacing(n ? P : 0);
            o._columnsArea.setColumnsWidth(R);
            o._rowsArea.setGroupHeight(o._hasHeight ? U : "auto");
            o._rowsArea.processScrollBarSpacing(i ? P : 0);
            o._rowsArea.setColumnsWidth(G);
            o._rowsArea.setRowsHeight(z);
            o._dataArea.setColumnsWidth(R);
            o._dataArea.setRowsHeight(z);
            o._dataArea.setGroupWidth(e);
            o._dataArea.setGroupHeight(o._hasHeight ? U : "auto");
            if (C) {
              x.setColumnsWidth(G);
            }
            g.toggleClass("dx-bottom-border", !n);
            m.toggleClass("dx-bottom-border", !n);
            if (!o._hasHeight && q !== (0, d.getWidth)(o.$element())) {
              var t = q - (0, d.getWidth)(o.$element());
              if (!i) {
                F(R, t);
                o._columnsArea.setColumnsWidth(R);
                o._dataArea.setColumnsWidth(R);
              }
              o._dataArea.setGroupWidth(e - t);
              o._columnsArea.setGroupWidth(e - t);
            }
            if (o._hasHeight && o._filterFields.isVisible() && (0, d.getHeight)(y) !== I) {
              var r = (0, d.getHeight)(y) - I;
              if (r > 0) {
                n = S(T - r, h);
                var c = k(T - r, h, n, i, P);
                o._dataArea.setGroupHeight(c);
                o._rowsArea.setGroupHeight(c);
              }
            }
            var f = o.option("scrolling");
            if (f.mode === "virtual") {
              o._setVirtualContentParams(f, R, z, e, U, o._hasHeight, p);
            }
            var _ = [];
            o._dataArea.updateScrollableOptions({
              direction: o._dataArea.getScrollableDirection(i, n),
              rtlEnabled: o.option("rtlEnabled")
            });
            o._columnsArea.updateScrollableOptions({
              rtlEnabled: o.option("rtlEnabled")
            });
            (0, u.each)([o._columnsArea, o._rowsArea, o._dataArea], function (e, t) {
              _.push(t && t.updateScrollable());
            });
            o._updateLoading();
            o._renderNoDataText(g);
            s.when.apply(a.default, _).done(function () {
              o._updateScrollPosition(o._columnsArea, o._rowsArea, o._dataArea, true);
              o._subscribeToEvents(o._columnsArea, o._rowsArea, o._dataArea);
              w.resolve();
            });
          });
        } else {
          w.resolve();
        }
      });
      return w;
    }
  },
  _setVirtualContentParams: function (e, t, n, i, o, a, r) {
    var s = this._dataController.calculateVirtualContentParams({
      virtualRowHeight: e.virtualRowHeight,
      virtualColumnWidth: e.virtualColumnWidth,
      itemWidths: t,
      itemHeights: n,
      rowCount: n.length,
      columnCount: t.length,
      viewportWidth: i,
      viewportHeight: a ? o : (0, d.getOuterHeight)(P)
    });
    this._dataArea.setVirtualContentParams({
      top: s.contentTop,
      left: s.contentLeft,
      width: s.width,
      height: s.height
    });
    this._rowsArea.setVirtualContentParams({
      top: s.contentTop,
      width: r,
      height: s.height
    });
    this._columnsArea.setVirtualContentParams({
      left: s.contentLeft,
      width: s.width,
      height: (0, d.getHeight)(this._columnsArea.groupElement())
    });
  },
  applyPartialDataSource: function (e, t, n) {
    this._dataController.applyPartialDataSource(e, t, n);
  }
}).inherit(k.ExportController).include(w.ChartIntegrationMixin);
exports.PivotGrid = z;
(0, i.default)("dxPivotGrid", z);
var j = {
  PivotGrid: z
};
exports.default = j;