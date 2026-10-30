Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.headerFilterMixin = exports.allowHeaderFiltering = exports.HeaderFilterView = undefined;
exports.updateHeaderFilterItemSelectionState = function (e, t, n) {
  if (t ^ n) {
    e.selected = true;
    if (n && e.items) {
      for (var i = 0; i < e.items.length; i++) {
        if (!e.items[i].selected) {
          e.selected = undefined;
          break;
        }
      }
    }
  } else if (n || e.selected) {
    e.selected = false;
    (function e(t) {
      t = t || [];
      for (var n = 0; n < t.length; n++) {
        t[n].selected = false;
        e(t[n].items);
      }
    })(e.items);
  }
};
require("./68724.js");
require("./20551.js");
var i = f(require("./68374.js"));
var o = require("./13306.js");
var a = require("./95479.js");
var r = require("./35922.js");
var s = f(require("./28109.js"));
var l = f(require("./56757.js"));
var u = f(require("./51495.js"));
var d = f(require("./30254.js"));
var c = f(require("./15943.js"));
var h = f(require("./60082.js"));
function f(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
function p(e) {
  var t = e.NAME === "dxTreeView" ? ".dx-treeview-select-all-item" : ".dx-list-select-all-checkbox";
  return e.$element().find(t).dxCheckBox("instance");
}
function g(e, t) {
  if (!e.component.option("searchValue")) {
    var n = p(e.component);
    if (n && t && t.length) {
      n.option("value", undefined);
    }
  }
}
var m = c.default.View.inherit({
  getPopupContainer: function () {
    return this._popupContainer;
  },
  getListComponent: function () {
    return this._listComponent;
  },
  applyHeaderFilter: function (e) {
    var t = this.getListComponent();
    var n = t.option("searchValue");
    var i = p(t);
    var o = [];
    if (!n && !e.isFilterBuilder && (i == null ? undefined : i.option("value"))) {
      if (e.type === "tree") {
        e.filterType = "exclude";
      }
      if (Array.isArray(e.filterValues)) {
        e.filterValues = [];
      }
    } else if (e.type === "tree") {
      e.filterType &&= "include";
      (function e(i, o, r) {
        (0, a.each)(o, function (o, a) {
          if (a.selected !== undefined && !!a.selected ^ r) {
            var s = t._getNode(a);
            var l = t._hasChildren(s) && a.items && a.items.some(function (e) {
              return e.selected;
            });
            if (!n || !l) {
              i.push(a.value);
              return;
            }
          }
          if (a.items && a.items.length) {
            e(i, a.items, r);
          }
        });
      })(o, t.option("items"), false);
      e.filterValues = o;
    }
    if (e.filterValues && !e.filterValues.length) {
      e.filterValues = null;
    }
    e.apply();
    this.hideHeaderFilterMenu();
  },
  showHeaderFilterMenu: function (e, t) {
    if (t) {
      this._initializePopupContainer(t);
      var n = this.getPopupContainer();
      this.hideHeaderFilterMenu();
      this.updatePopup(e, t);
      n.show();
    }
  },
  hideHeaderFilterMenu: function () {
    var e = this.getPopupContainer();
    if (e) {
      e.hide();
    }
  },
  updatePopup: function (e, t) {
    var n = this.option("showColumnLines");
    var i = t.alignment === "right" ^ !n ? "left" : "right";
    this._popupContainer.setAria({
      role: "dialog",
      label: s.default.format("dxDataGrid-headerFilterLabel")
    });
    if (this._popupContainer) {
      this._cleanPopupContent();
      this._popupContainer.option("position", {
        my: `${i} top`,
        at: `${i} bottom`,
        of: e,
        collision: "fit fit"
      });
    }
  },
  _getSearchExpr: function (e, t) {
    var n = e.lookup;
    var i = e.useDefaultSearchExpr;
    var o = t.dataSource;
    var a = t.search.searchExpr;
    if (a) {
      return a;
    }
    if (i || (0, r.isDefined)(o) && !(0, r.isFunction)(o)) {
      return "text";
    }
    if (n) {
      return n.displayExpr || "this";
    }
    if (e.dataSource) {
      var s = e.dataSource.group;
      if (Array.isArray(s) && s.length > 0) {
        return s[0].selector;
      }
      if ((0, r.isFunction)(s) && !e.remoteFiltering) {
        return s;
      }
    }
    return e.dataField || e.selector;
  },
  _cleanPopupContent: function () {
    if (this._popupContainer) {
      this._popupContainer.$content().empty();
    }
  },
  _initializePopupContainer: function (e) {
    var t = this;
    var n = t.element();
    var i = this._normalizeHeaderFilterOptions(e);
    var o = i.height;
    var a = {
      width: i.width,
      height: o,
      visible: false,
      shading: false,
      showTitle: false,
      showCloseButton: false,
      hideOnParentScroll: false,
      dragEnabled: false,
      hideOnOutsideClick: true,
      wrapperAttr: {
        class: "dx-header-filter-menu"
      },
      focusStateEnabled: false,
      toolbarItems: [{
        toolbar: "bottom",
        location: "after",
        widget: "dxButton",
        options: {
          text: i.texts.ok,
          onClick: function () {
            t.applyHeaderFilter(e);
          }
        }
      }, {
        toolbar: "bottom",
        location: "after",
        widget: "dxButton",
        options: {
          text: i.texts.cancel,
          onClick: function () {
            t.hideHeaderFilterMenu();
          }
        }
      }],
      resizeEnabled: true,
      onShowing: function (n) {
        n.component.$content().parent().addClass("dx-dropdowneditor-overlay");
        t._initializeListContainer(e, i);
        if (e.onShowing) {
          e.onShowing(n);
        }
      },
      onShown: function () {
        t.getListComponent().focus();
      },
      onHidden: e.onHidden,
      onInitialized: function (e) {
        var t = e.component;
        t.option("animation", t._getDefaultOptions().animation);
      }
    };
    if ((0, r.isDefined)(t._popupContainer)) {
      t._popupContainer.option(a);
    } else {
      t._popupContainer = t._createComponent(n, u.default, a);
    }
  },
  _initializeListContainer: function (e, t) {
    var n = this;
    var r = n._popupContainer.$content();
    var s = !e.isFilterBuilder && t.allowSelectAll;
    var u = {
      searchEnabled: t.search.enabled,
      searchTimeout: t.search.timeout,
      searchEditorOptions: t.search.editorOptions,
      searchMode: t.search.mode || "",
      dataSource: e.dataSource,
      onContentReady: function () {
        n.renderCompleted.fire();
      },
      itemTemplate: function (t, n, o) {
        var a = (0, i.default)(o);
        if (e.encodeHtml) {
          return a.text(t.text);
        } else {
          return a.html(t.text);
        }
      }
    };
    function c(t) {
      if (t.fullName === "searchValue" && s && n.option("headerFilter.hideSelectAllOnSearch") !== false) {
        if (e.type === "tree") {
          t.component.option("showCheckBoxesMode", t.value ? "normal" : "selectAll");
        } else {
          t.component.option("selectionMode", t.value ? "multiple" : "all");
        }
      }
    }
    if (e.type === "tree") {
      n._listComponent = n._createComponent((0, i.default)("<div>").appendTo(r), d.default, (0, o.extend)(u, {
        showCheckBoxesMode: s ? "selectAll" : "normal",
        onOptionChanged: c,
        keyExpr: "id"
      }));
    } else {
      n._listComponent = n._createComponent((0, i.default)("<div>").appendTo(r), l.default, (0, o.extend)(u, {
        searchExpr: n._getSearchExpr(e, t),
        pageLoadMode: "scrollBottom",
        showSelectionControls: true,
        selectionMode: s ? "all" : "multiple",
        onOptionChanged: c,
        onSelectionChanged: function (t) {
          var n = t.component.option("items");
          var i = t.component.option("selectedItems");
          if (!t.component._selectedItemsUpdating && !t.component.option("searchValue") && !e.isFilterBuilder) {
            var o = e.filterValues || [];
            var r = e.filterType === "exclude";
            if (i.length === 0 && n.length && (o.length <= 1 || r && o.length === n.length - 1)) {
              e.filterType = "include";
              e.filterValues = [];
            } else if (i.length === n.length) {
              e.filterType = "exclude";
              e.filterValues = [];
            }
          }
          (0, a.each)(n, function (t, n) {
            var o = h.default.getIndexByKey(n, i, null) >= 0;
            if (!!n.selected !== o) {
              n.selected = o;
              e.filterValues = e.filterValues || [];
              var a = h.default.getIndexByKey(n.value, e.filterValues, null);
              if (a >= 0) {
                e.filterValues.splice(a, 1);
              }
              if (o ^ e.filterType === "exclude") {
                e.filterValues.push(n.value);
              }
            }
          });
          g(t, e.filterValues);
        },
        onContentReady: function (t) {
          var n = t.component;
          var i = n.option("items");
          var o = [];
          (0, a.each)(i, function () {
            if (this.selected) {
              o.push(this);
            }
          });
          n._selectedItemsUpdating = true;
          n.option("selectedItems", o);
          n._selectedItemsUpdating = false;
          g(t, e.filterValues);
        }
      }));
    }
  },
  _normalizeHeaderFilterOptions: function (e) {
    var t = this.option("headerFilter") || {};
    var n = e.headerFilter || {};
    var i = {
      search: {
        enabled: t.allowSearch,
        timeout: t.searchTimeout
      }
    };
    var a = {
      search: {
        enabled: n.allowSearch,
        mode: n.searchMode,
        timeout: n.searchTimeout
      }
    };
    return (0, o.extend)(true, {}, t, i, n, a);
  },
  _renderCore: function () {
    this.element().addClass("dx-header-filter-menu");
  }
});
exports.HeaderFilterView = m;
function _(e) {
  if ((0, r.isDefined)(e.allowHeaderFiltering)) {
    return e.allowHeaderFiltering;
  } else {
    return e.allowFiltering;
  }
}
exports.allowHeaderFiltering = _;
var v = {
  _applyColumnState: function (e) {
    var t;
    var n = e.rootElement;
    var i = e.column;
    if (e.name === "headerFilter") {
      n.find(`.dx-header-filter`).remove();
      if (_(i)) {
        t = this.callBase(e).toggleClass("dx-header-filter-empty", this._isHeaderFilterEmpty(i));
        if (!this.option("useLegacyKeyboardNavigation")) {
          t.attr("tabindex", this.option("tabindex") || 0);
        }
        var o = s.default.format("dxDataGrid-headerFilterIndicatorLabel", i.caption);
        t.attr("aria-label", o);
        t.attr("aria-haspopup", "dialog");
        t.attr("role", "button");
      }
      return t;
    }
    return this.callBase(e);
  },
  _isHeaderFilterEmpty: function (e) {
    return !e.filterValues || !e.filterValues.length;
  },
  _getIndicatorClassName: function (e) {
    if (e === "headerFilter") {
      return "dx-header-filter";
    } else {
      return this.callBase(e);
    }
  },
  _renderIndicator: function (e) {
    var t = e.container;
    var n = e.indicator;
    if (e.name === "headerFilter") {
      var i = this.option("rtlEnabled");
      if (t.children().length && (!i && e.columnAlignment === "right" || i && e.columnAlignment === "left")) {
        t.prepend(n);
        return;
      }
    }
    this.callBase(e);
  },
  optionChanged: function (e) {
    if (e.name === "headerFilter") {
      var t = this.name === "columnHeadersView";
      this._invalidate(t, t);
      e.handled = true;
    } else {
      this.callBase(e);
    }
  }
};
exports.headerFilterMixin = v;