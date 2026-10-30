Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.filterRowModule = undefined;
var i = v(require("./68374.js"));
var o = require("./20576.js");
var a = require("./13306.js");
var r = require("./95479.js");
var s = require("./58664.js");
var l = require("./35922.js");
var u = v(require("./55994.js"));
var d = require("./39611.js");
var c = v(require("./28109.js"));
var h = v(require("./96452.js"));
var f = v(require("./76995.js"));
var p = v(require("./89799.js"));
var g = require("./56756.js");
var m = v(require("./15943.js"));
var _ = v(require("./60082.js"));
function v(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
function y() {
  return (y = Object.assign ? Object.assign.bind() : function (e) {
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
var b = {
  "=": "filter-operation-equals",
  "<>": "filter-operation-not-equals",
  "<": "filter-operation-less",
  "<=": "filter-operation-less-equal",
  ">": "filter-operation-greater",
  ">=": "filter-operation-greater-equal",
  default: "filter-operation-default",
  notcontains: "filter-operation-not-contains",
  contains: "filter-operation-contains",
  startswith: "filter-operation-starts-with",
  endswith: "filter-operation-ends-with",
  between: "filter-operation-between"
};
var x = {
  "=": "equal",
  "<>": "notEqual",
  "<": "lessThan",
  "<=": "lessThanOrEqual",
  ">": "greaterThan",
  ">=": "greaterThanOrEqual",
  startswith: "startsWith",
  contains: "contains",
  notcontains: "notContains",
  endswith: "endsWith",
  between: "between"
};
var w = ["date", "datetime", "number"];
var C = c.default.format("dxDataGrid-ariaSearchBox");
function S(e) {
  return e.option("filterRow.applyFilter") === "onClick";
}
function k(e) {
  var t = e && e.children();
  var n = t && t.data("dxComponents");
  var i = n && n.length && t.data(n[0]);
  if (i instanceof h.default) {
    return i;
  } else {
    return null;
  }
}
var D = function () {
  function e(e, n) {
    var i = "";
    var o = "";
    var a = t(e, n);
    var r = _.default.getFormatOptionsByColumn(n, "filterRow");
    if (Array.isArray(a)) {
      i = _.default.formatValue(a[0], r);
      if ((o = _.default.formatValue(a[1], r)) !== "") {
        i += ` - ${o}`;
      }
    } else if ((0, l.isDefined)(a)) {
      i = _.default.formatValue(a, r);
    }
    return i;
  }
  function t(e, t) {
    if (t) {
      if (S(e) && t.bufferedFilterValue !== undefined) {
        return t.bufferedFilterValue;
      } else {
        return t.filterValue;
      }
    }
  }
  function n(e, t) {
    if (t) {
      if (S(e) && t.bufferedSelectedFilterOperation !== undefined) {
        return t.bufferedSelectedFilterOperation;
      } else {
        return t.selectedFilterOperation;
      }
    }
  }
  function h(e, i, o) {
    var a = e._columnsController.columnOption(i);
    var r = t(e, a);
    var s = o.closest(`.${e.addWidgetPrefix("filter-range-overlay")}`).length;
    var l = o.hasClass(e.addWidgetPrefix("filter-range-start"));
    if (r && Array.isArray(r) && n(e, a) === "between") {
      if (l) {
        return r[0];
      } else {
        return r[1];
      }
    } else if (!s && function (e, t) {
      return (!t || !w.includes(t.dataType) || !Array.isArray(e)) && e !== undefined;
    }(r, a)) {
      return r;
    } else {
      return null;
    }
  }
  function m(e, i) {
    var o = i.value === "" ? null : i.value;
    var a = i.container;
    var r = e._columnsController.columnOption(i.column.index);
    var s = h(e, r.index, a);
    if ((0, l.isDefined)(s) || (0, l.isDefined)(o)) {
      e._applyFilterViewController.setHighLight(a, s !== o);
      var u = S(e) ? "bufferedFilterValue" : "filterValue";
      var d = function (e, i, o, a) {
        if (n(e, o) === "between") {
          var r = t(e, o);
          if (a.hasClass(e.addWidgetPrefix("filter-range-start"))) {
            return [i, Array.isArray(r) ? r[1] : undefined];
          } else {
            return [Array.isArray(r) ? r[0] : r, i];
          }
        }
        return i;
      }(e, o, r, a);
      var c = n(e, r) === "between";
      var f = i.notFireEvent || c && Array.isArray(d) && d.includes(undefined);
      e._columnsController.columnOption(r.index, u, d, f);
    }
  }
  return {
    _updateEditorValue: function (e, t) {
      var n = k(t);
      if (n) {
        n.option("value", h(this, e.index, t));
      }
    },
    _columnOptionChanged: function (t) {
      var o;
      var a;
      var r;
      var s;
      var l = t.optionNames;
      if (_.default.checkChanges(l, ["filterValue", "bufferedFilterValue", "selectedFilterOperation", "bufferedSelectedFilterOperation", "filterValues", "filterType"]) && t.columnIndex !== undefined) {
        var u = this._columnsController.getVisibleIndex(t.columnIndex);
        var d = this._columnsController.columnOption(t.columnIndex);
        a = (o = this._getCellElement(this.element().find(`.${this.addWidgetPrefix("filter-row")}`).index(), u) || (0, i.default)()).find(`.dx-editor-container`).first();
        if (l.filterValue || l.bufferedFilterValue) {
          this._updateEditorValue(d, a);
          var c = o.find(`.${this.addWidgetPrefix("filter-range-overlay")}`).data("dxOverlay");
          if (c) {
            r = c.$content().find(`.dx-editor-container`);
            this._updateEditorValue(d, r.first());
            this._updateEditorValue(d, r.last());
          }
          if (!c || !c.option("visible")) {
            this._updateFilterRangeContent(o, e(this, d));
          }
        }
        if ((l.selectedFilterOperation || l.bufferedSelectedFilterOperation) && u >= 0 && d && (s = o.find(`.dx-menu`)).length) {
          this._updateFilterOperationChooser(s, d, a);
          if (n(this, d) === "between") {
            this._renderFilterRangeContent(o, d);
          } else if (a.find(`.dx-filter-range-content`).length) {
            this._renderEditor(a, this._getEditorOptions(a, d));
            this._hideFilterRange();
          }
        }
      } else {
        this.callBase(t);
      }
    },
    _renderCore: function () {
      this._filterRangeOverlayInstance = null;
      return this.callBase.apply(this, arguments);
    },
    _resizeCore: function () {
      this.callBase.apply(this, arguments);
      if (this._filterRangeOverlayInstance) {
        this._filterRangeOverlayInstance.repaint();
      }
    },
    isFilterRowVisible: function () {
      return this._isElementVisible(this.option("filterRow"));
    },
    isVisible: function () {
      return this.callBase() || this.isFilterRowVisible();
    },
    init: function () {
      this.callBase();
      this._applyFilterViewController = this.getController("applyFilter");
    },
    _initFilterRangeOverlay: function (t, o) {
      var a = this;
      var r = {};
      var s = t.find(".dx-editor-container");
      var l = a.addWidgetPrefix("filter-range-overlay");
      var c = (0, i.default)("<div>").addClass(l).appendTo(t);
      return a._createComponent(c, p.default, {
        height: "auto",
        shading: false,
        showTitle: false,
        focusStateEnabled: false,
        hideOnOutsideClick: true,
        wrapperAttr: {
          class: l
        },
        animation: false,
        position: {
          my: "top",
          at: "top",
          of: s.length && s || t,
          offset: "0 -1"
        },
        contentTemplate: function (e) {
          var n;
          var s = (0, i.default)("<div>").addClass(`dx-editor-container ${a.addWidgetPrefix("filter-range-start")}`).appendTo(e);
          o = a._columnsController.columnOption(o.index);
          (n = a._getEditorOptions(s, o)).sharedData = r;
          a._renderEditor(s, n);
          u.default.on(s.find("input:not([type='hidden'])"), "keydown", function (e) {
            var n = t.find("[tabindex]").not(e.target).first();
            if ((0, d.normalizeKeyName)(e) === "tab" && e.shiftKey) {
              e.preventDefault();
              a._hideFilterRange();
              if (!n.length) {
                n = t.prev().find("[tabindex]").last();
              }
              u.default.trigger(n, "focus");
            }
          });
          s = (0, i.default)("<div>").addClass(`dx-editor-container ${a.addWidgetPrefix("filter-range-end")}`).appendTo(e);
          (n = a._getEditorOptions(s, o)).sharedData = r;
          a._renderEditor(s, n);
          u.default.on(s.find("input:not([type='hidden'])"), "keydown", function (e) {
            if ((0, d.normalizeKeyName)(e) === "tab" && !e.shiftKey) {
              e.preventDefault();
              a._hideFilterRange();
              u.default.trigger(t.next().find("[tabindex]").first(), "focus");
            }
          });
          return (0, i.default)(e).addClass(a.getWidgetContainerClass());
        },
        onShown: function (e) {
          var t = e.component.$content().find(`.dx-editor-container`).first();
          u.default.trigger(t.find("input:not([type='hidden'])"), "focus");
        },
        onHidden: function () {
          o = a._columnsController.columnOption(o.index);
          t.find(`.dx-menu`).parent().addClass("dx-editor-with-menu");
          if (n(a, o) === "between") {
            a._updateFilterRangeContent(t, e(a, o));
            a.component.updateDimensions();
          }
        }
      });
    },
    _updateFilterRangeOverlay: function (e) {
      var t = this._filterRangeOverlayInstance;
      if (t) {
        t.option(e);
      }
    },
    _showFilterRange: function (e, t) {
      var n = e.children(`.${this.addWidgetPrefix("filter-range-overlay")}`);
      var i = n.length && n.data("dxOverlay");
      if (!i && t) {
        i = this._initFilterRangeOverlay(e, t);
      }
      if (!i.option("visible")) {
        if (this._filterRangeOverlayInstance) {
          this._filterRangeOverlayInstance.hide();
        }
        this._filterRangeOverlayInstance = i;
        this._updateFilterRangeOverlay({
          width: (0, s.getOuterWidth)(e, true) + 1
        });
        if (this._filterRangeOverlayInstance) {
          this._filterRangeOverlayInstance.show();
        }
      }
    },
    _hideFilterRange: function () {
      var e = this._filterRangeOverlayInstance;
      if (e) {
        e.hide();
      }
    },
    getFilterRangeOverlayInstance: function () {
      return this._filterRangeOverlayInstance;
    },
    _createRow: function (e) {
      var t = this;
      var n = this.callBase(e);
      if (e.rowType === "filter") {
        n.addClass(this.addWidgetPrefix("filter-row"));
        if (!this.option("useLegacyKeyboardNavigation")) {
          u.default.on(n, "keydown", function (e) {
            return (0, g.selectView)("filterRow", t, e);
          });
        }
      }
      return n;
    },
    _getRows: function () {
      var e = this.callBase();
      if (this.isFilterRowVisible()) {
        e.push({
          rowType: "filter"
        });
      }
      return e;
    },
    _renderFilterCell: function (e, t) {
      var o = t.column;
      var a = (0, i.default)(e);
      if (this.component.option("showColumnHeaders")) {
        this.setAria("describedby", o.headerId, a);
      }
      this.setAria("label", c.default.format("dxDataGrid-ariaFilterCell"), a);
      a.addClass("dx-editor-cell");
      var r = (0, i.default)("<div>").appendTo(a);
      var s = (0, i.default)("<div>").addClass("dx-editor-container").appendTo(r);
      if (n(this, o) === "between") {
        this._renderFilterRangeContent(a, o);
      } else {
        var l = this._getEditorOptions(s, o);
        this._renderEditor(s, l);
      }
      var u = o.alignment;
      if (u && u !== "center") {
        a.find("input:not([type='hidden'])").first().css("textAlign", o.alignment);
      }
      if (o.filterOperations && o.filterOperations.length) {
        this._renderFilterOperationChooser(r, o, s);
      }
    },
    _renderCellContent: function (e, t) {
      var n = this;
      var i = t.column;
      if (t.rowType === "filter") {
        if (i.command) {
          e.html("&nbsp;");
        } else if (i.allowFiltering) {
          n.renderTemplate(e, n._renderFilterCell.bind(n), t).done(function () {
            n._updateCell(e, t);
          });
          return;
        }
      }
      this.callBase.apply(this, arguments);
    },
    _getEditorOptions: function (e, t) {
      var i = this;
      var o = {
        editorOptions: {
          inputAttr: i._getFilterInputAccessibilityAttributes(t)
        }
      };
      var r = (0, a.extend)(o, t, {
        value: h(i, t.index, e),
        parentType: "filterRow",
        showAllText: i.option("filterRow.showAllText"),
        updateValueTimeout: i.option("filterRow.applyFilter") === "onClick" ? 0 : 700,
        width: null,
        setValue: function (n, o) {
          m(i, {
            column: t,
            value: n,
            container: e,
            notFireEvent: o
          });
        }
      });
      if (n(i, t) === "between") {
        if (e.hasClass(i.addWidgetPrefix("filter-range-start"))) {
          r.placeholder = i.option("filterRow.betweenStartText");
        } else {
          r.placeholder = i.option("filterRow.betweenEndText");
        }
      }
      return r;
    },
    _getFilterInputAccessibilityAttributes: function (e) {
      var t = c.default.format("dxDataGrid-ariaFilterCell");
      if (this.component.option("showColumnHeaders")) {
        return {
          "aria-label": t,
          "aria-describedby": e.headerId
        };
      } else {
        return {
          "aria-label": t
        };
      }
    },
    _renderEditor: function (e, t) {
      e.empty();
      var n = (0, i.default)("<div>").appendTo(e);
      var o = this.getController("editorFactory");
      var a = this.getController("data").dataSource();
      var r = this.getController("applyFilter");
      if (t.lookup && this.option("syncLookupFilterValues")) {
        r.setCurrentColumnForFiltering(t);
        var s = this.getController("data").getCombinedFilter();
        r.setCurrentColumnForFiltering(null);
        var l = _.default.getWrappedLookupDataSource(t, a, s);
        var u = y(y({}, t), {
          lookup: y(y({}, t.lookup), {
            dataSource: l
          })
        });
        return o.createEditor(n, u);
      }
      return o.createEditor(n, t);
    },
    _renderFilterRangeContent: function (t, n) {
      var o = this;
      var a = t.find(`.dx-editor-container`).first();
      a.empty();
      var r = (0, i.default)("<div>").addClass("dx-filter-range-content").attr("tabindex", this.option("tabIndex"));
      u.default.on(r, "focusin", function () {
        o._showFilterRange(t, n);
      });
      r.appendTo(a);
      o._updateFilterRangeContent(t, e(o, n));
    },
    _updateFilterRangeContent: function (e, t) {
      var n = e.find(`.dx-filter-range-content`);
      if (n.length) {
        if (t === "") {
          n.html("&nbsp;");
        } else {
          n.text(t);
        }
      }
    },
    _updateFilterOperationChooser: function (e, t, i) {
      var o;
      var a = this;
      function r() {
        var t = f.default.getInstance(e);
        if (t) {
          t.option("focusedElement", null);
        }
        if (o) {
          a._focusEditor(i);
        }
      }
      a._createComponent(e, f.default, {
        integrationOptions: {},
        activeStateEnabled: false,
        selectionMode: "single",
        cssClass: `${a.getWidgetContainerClass()} dx-cell-focus-disabled dx-filter-menu`,
        showFirstSubmenuMode: "onHover",
        hideSubmenuOnMouseLeave: true,
        elementAttr: {
          "aria-label": C
        },
        items: [{
          disabled: !t.filterOperations || !t.filterOperations.length,
          icon: b[n(a, t) || "default"],
          selectable: false,
          items: a._getFilterOperationMenuItems(t)
        }],
        onItemClick: function (e) {
          var o = e.itemData.name;
          var r = n(a, t);
          var s = false;
          var l = S(a);
          var u = {};
          if (!e.itemData.items && (!o || o !== r)) {
            if (o) {
              u[l ? "bufferedSelectedFilterOperation" : "selectedFilterOperation"] = o;
              if (o === "between" || r === "between") {
                s = o === "between";
                u[l ? "bufferedFilterValue" : "filterValue"] = null;
              }
            } else {
              u[l ? "bufferedFilterValue" : "filterValue"] = null;
              u[l ? "bufferedSelectedFilterOperation" : "selectedFilterOperation"] = t.defaultSelectedFilterOperation || null;
            }
            a._columnsController.columnOption(t.index, u);
            a._applyFilterViewController.setHighLight(i, true);
            if (!o) {
              var d = k(i);
              if (d && d.NAME === "dxDateBox" && !d.option("isValid")) {
                d.reset();
                d.option("isValid", true);
              }
            }
            if (s) {
              a._showFilterRange(i.closest(`.dx-editor-cell`), t);
            } else {
              a._focusEditor(i);
            }
          }
        },
        onSubmenuShowing: function () {
          o = a._isEditorFocused(i);
          a.getController("editorFactory").loseFocus();
        },
        onSubmenuHiding: function () {
          u.default.trigger(e, "blur");
          r();
        },
        onContentReady: function (t) {
          u.default.on(e, "blur", function () {
            t.component._hideSubmenuAfterTimeout();
            r();
          });
        },
        rtlEnabled: a.option("rtlEnabled")
      });
    },
    _isEditorFocused: function (e) {
      return e.hasClass("dx-focused") || e.parents(`.dx-focused`).length;
    },
    _focusEditor: function (e) {
      this.getController("editorFactory").focus(e);
      u.default.trigger(e.find("input:not([type='hidden'])"), "focus");
    },
    _renderFilterOperationChooser: function (e, t, n) {
      var o;
      if (this.option("filterRow.showOperationChooser")) {
        e.addClass("dx-editor-with-menu");
        o = (0, i.default)("<div>").prependTo(e);
        this._updateFilterOperationChooser(o, t, n);
      }
    },
    _getFilterOperationMenuItems: function (e) {
      var t = this;
      var i = [{}];
      var o = t.option("filterRow");
      var a = o && o.operationDescriptions || {};
      if (e.filterOperations && e.filterOperations.length) {
        var s = e.filterOperations.filter(function (e) {
          return (0, l.isDefined)(x[e]);
        });
        (i = (0, r.map)(s, function (i) {
          var o = x[i];
          return {
            name: i,
            selected: (n(t, e) || e.defaultFilterOperation) === i,
            text: a[o],
            icon: b[i]
          };
        })).push({
          name: null,
          text: o && o.resetOperationText,
          icon: b.default
        });
      }
      return i;
    },
    _handleDataChanged: function (e) {
      this.callBase.apply(this, arguments);
      if (e.operationTypes?.filtering || e.operationTypes?.fullReload) {
        this.updateLookupDataSource(e.operationTypes?.filtering);
      }
    },
    updateLookupDataSource: function (e) {
      var t = this;
      if (this.option("syncLookupFilterValues") && this.element()) {
        var n = this._columnsController.getVisibleColumns();
        var i = this._dataController.dataSource();
        var a = this._applyFilterViewController;
        var r = this.element().find(`.${this.addWidgetPrefix("filter-row")}`).index();
        if (r !== -1) {
          n.forEach(function (n, s) {
            if (n.lookup && n.calculateCellValue === n.defaultCalculateCellValue) {
              var l = t._getCellElement(r, s);
              var u = k(l == null ? undefined : l.find(".dx-editor-container"));
              if (u) {
                a.setCurrentColumnForFiltering(n);
                var d = t._dataController.getCombinedFilter() || null;
                a.setCurrentColumnForFiltering(null);
                var c = u.option("dataSource");
                if (!e || !(0, o.equalByValue)(c.__dataGridSourceFilter, d)) {
                  var h = _.default.getWrappedLookupDataSource(n, i, d);
                  u.option("dataSource", h);
                }
              }
            }
          });
        }
      }
    },
    optionChanged: function (e) {
      switch (e.name) {
        case "filterRow":
        case "showColumnLines":
          this._invalidate(true, true);
          e.handled = true;
          break;
        case "syncLookupFilterValues":
          if (e.value) {
            this.updateLookupDataSource();
          } else {
            this.render();
          }
          e.handled = true;
          break;
        default:
          this.callBase(e);
      }
    }
  };
}();
var I = {
  skipCalculateColumnFilters: function () {
    return false;
  },
  _calculateAdditionalFilter: function () {
    if (this.skipCalculateColumnFilters()) {
      return this.callBase();
    }
    var e = [this.callBase()];
    var t = this._columnsController.getVisibleColumns(null, true);
    var n = this.getController("applyFilter");
    (0, r.each)(t, function () {
      var i = n.getCurrentColumnForFiltering()?.index === this.index;
      if (this.allowFiltering && this.calculateFilterExpression && (0, l.isDefined)(this.filterValue) && !i) {
        var o = this.createFilterExpression(this.filterValue, this.selectedFilterOperation || this.defaultFilterOperation, "filterRow");
        e.push(o);
      }
    });
    return _.default.combineFilters(e);
  }
};
var T = {
  defaultOptions: function () {
    return {
      syncLookupFilterValues: true,
      filterRow: {
        visible: false,
        showOperationChooser: true,
        showAllText: c.default.format("dxDataGrid-filterRowShowAllText"),
        resetOperationText: c.default.format("dxDataGrid-filterRowResetOperationText"),
        applyFilter: "auto",
        applyFilterText: c.default.format("dxDataGrid-applyFilterText"),
        operationDescriptions: {
          equal: c.default.format("dxDataGrid-filterRowOperationEquals"),
          notEqual: c.default.format("dxDataGrid-filterRowOperationNotEquals"),
          lessThan: c.default.format("dxDataGrid-filterRowOperationLess"),
          lessThanOrEqual: c.default.format("dxDataGrid-filterRowOperationLessOrEquals"),
          greaterThan: c.default.format("dxDataGrid-filterRowOperationGreater"),
          greaterThanOrEqual: c.default.format("dxDataGrid-filterRowOperationGreaterOrEquals"),
          startsWith: c.default.format("dxDataGrid-filterRowOperationStartsWith"),
          contains: c.default.format("dxDataGrid-filterRowOperationContains"),
          notContains: c.default.format("dxDataGrid-filterRowOperationNotContains"),
          endsWith: c.default.format("dxDataGrid-filterRowOperationEndsWith"),
          between: c.default.format("dxDataGrid-filterRowOperationBetween"),
          isBlank: c.default.format("dxFilterBuilder-filterOperationIsBlank"),
          isNotBlank: c.default.format("dxFilterBuilder-filterOperationIsNotBlank")
        },
        betweenStartText: c.default.format("dxDataGrid-filterRowOperationBetweenStartText"),
        betweenEndText: c.default.format("dxDataGrid-filterRowOperationBetweenEndText")
      }
    };
  },
  controllers: {
    applyFilter: m.default.ViewController.inherit({
      _getHeaderPanel: function () {
        this._headerPanel ||= this.getView("headerPanel");
        return this._headerPanel;
      },
      setHighLight: function (e, t) {
        if (S(this)) {
          if (e && e.toggleClass("dx-highlight-outline", t)) {
            e.closest(`.dx-editor-cell`).toggleClass("dx-filter-modified", t);
          }
          this._getHeaderPanel().enableApplyButton(t);
        }
      },
      applyFilter: function () {
        var e = this.getController("columns");
        var t = e.getColumns();
        e.beginUpdate();
        for (var n = 0; n < t.length; n++) {
          var i = t[n];
          if (i.bufferedFilterValue !== undefined) {
            e.columnOption(n, "filterValue", i.bufferedFilterValue);
            i.bufferedFilterValue = undefined;
          }
          if (i.bufferedSelectedFilterOperation !== undefined) {
            e.columnOption(n, "selectedFilterOperation", i.bufferedSelectedFilterOperation);
            i.bufferedSelectedFilterOperation = undefined;
          }
        }
        e.endUpdate();
        this.removeHighLights();
      },
      removeHighLights: function () {
        if (S(this)) {
          var e = this.getView("columnHeadersView").element();
          e.find(`.${this.addWidgetPrefix("filter-row")} .dx-highlight-outline`).removeClass("dx-highlight-outline");
          e.find(`.${this.addWidgetPrefix("filter-row")} .dx-filter-modified`).removeClass("dx-filter-modified");
          this._getHeaderPanel().enableApplyButton(false);
        }
      },
      setCurrentColumnForFiltering: function (e) {
        this._currentColumn = e;
      },
      getCurrentColumnForFiltering: function () {
        return this._currentColumn;
      }
    })
  },
  extenders: {
    controllers: {
      data: I,
      columnsResizer: {
        _startResizing: function () {
          var e = this;
          e.callBase.apply(e, arguments);
          if (e.isResizing()) {
            var t = e._columnHeadersView.getFilterRangeOverlayInstance();
            if (t) {
              var n = t.$element().closest("td").index();
              if (n === e._targetPoint.columnIndex || n === e._targetPoint.columnIndex + 1) {
                t.$content().hide();
              }
            }
          }
        },
        _endResizing: function () {
          var e;
          var t = this;
          if (t.isResizing()) {
            var n = t._columnHeadersView.getFilterRangeOverlayInstance();
            if (n) {
              e = n.$element().closest("td");
              t._columnHeadersView._updateFilterRangeOverlay({
                width: (0, s.getOuterWidth)(e, true) + 1
              });
              n.$content().show();
            }
          }
          t.callBase.apply(t, arguments);
        }
      },
      editing: {
        updateFieldValue: function (e) {
          if (e.column.lookup) {
            this._needUpdateLookupDataSource = true;
          }
          return this.callBase.apply(this, arguments);
        },
        _afterSaveEditData: function (e) {
          var t;
          if (this._needUpdateLookupDataSource && !e) {
            if ((t = this.getView("columnHeadersView")) !== null && t !== undefined) {
              t.updateLookupDataSource();
            }
          }
          this._needUpdateLookupDataSource = false;
          return this.callBase.apply(this, arguments);
        },
        _afterCancelEditData: function () {
          this._needUpdateLookupDataSource = false;
          return this.callBase.apply(this, arguments);
        }
      }
    },
    views: {
      columnHeadersView: D,
      headerPanel: {
        _getToolbarItems: function () {
          var e = this.callBase();
          return this._prepareFilterItem(e).concat(e);
        },
        _prepareFilterItem: function () {
          var e = this;
          var t = [];
          if (e._isShowApplyFilterButton()) {
            var n = e.option("filterRow.applyFilterText");
            var o = {
              widget: "dxButton",
              options: {
                icon: "apply-filter",
                disabled: !e._columnsController.getColumns().filter(function (e) {
                  return e.bufferedFilterValue !== undefined;
                }).length,
                onClick: function () {
                  e._applyFilterViewController.applyFilter();
                },
                hint: n,
                text: n,
                onInitialized: function (t) {
                  (0, i.default)(t.element).addClass(e._getToolbarButtonClass("dx-apply-button"));
                }
              },
              showText: "inMenu",
              name: "applyFilterButton",
              location: "after",
              locateInMenu: "auto",
              sortIndex: 10
            };
            t.push(o);
          }
          return t;
        },
        _isShowApplyFilterButton: function () {
          var e = this.option("filterRow");
          return e && e.visible && e.applyFilter === "onClick";
        },
        init: function () {
          this.callBase();
          this._dataController = this.getController("data");
          this._applyFilterViewController = this.getController("applyFilter");
        },
        enableApplyButton: function (e) {
          this.setToolbarItemDisabled("applyFilterButton", !e);
        },
        isVisible: function () {
          return this.callBase() || this._isShowApplyFilterButton();
        },
        optionChanged: function (e) {
          if (e.name === "filterRow") {
            this._invalidate();
            e.handled = true;
          } else {
            this.callBase(e);
          }
        }
      }
    }
  }
};
exports.filterRowModule = T;