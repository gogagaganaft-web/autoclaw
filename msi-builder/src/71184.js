Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.columnChooserModule = undefined;
var i = _(require("./20530.js"));
var o = _(require("./68374.js"));
var a = require("./20576.js");
var r = require("./13306.js");
var s = require("./95479.js");
var l = require("./58664.js");
var u = require("./35922.js");
var d = _(require("./28109.js"));
var c = _(require("./63008.js"));
var h = _(require("./51495.js"));
var f = require("./75811.js");
var p = _(require("./30254.js"));
var g = _(require("./15943.js"));
var m = require("./57318.js");
function _(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
var v = ["showInColumnChooser", "caption", "allowHiding", "visible", "cssClass", "ownerBand"];
var y = {
  renderShowColumnChooserButton: function (e) {
    var t;
    var n = this;
    var i = n.addWidgetPrefix("column-chooser-button");
    var a = n.option("columnChooser.enabled");
    var r = e.find(`.${i}`);
    if (a) {
      if (r.length) {
        r.show();
      } else {
        t = (0, o.default)("<div>").addClass(i).appendTo(e);
        n._createComponent(t, c.default, {
          icon: "column-chooser",
          onClick: function () {
            n.getView("columnChooserView").showColumnChooser();
          },
          hint: n.option("columnChooser.title"),
          integrationOptions: {}
        });
      }
    } else {
      r.hide();
    }
  },
  getPosition: function () {
    var e = this.getView("rowsView");
    var t = this.option("columnChooser.position");
    if ((0, u.isDefined)(t)) {
      return t;
    } else {
      return {
        my: "right bottom",
        at: "right bottom",
        of: e && e.element(),
        collision: "fit",
        offset: "-2 -2",
        boundaryOffset: "2 2"
      };
    }
  }
};
var b = g.default.ViewController.inherit(y);
var x = {
  _resizeCore: a.noop,
  _isWinDevice: function () {
    return !!i.default.real().win;
  },
  _initializePopupContainer: function () {
    var e = this;
    var t = e.addWidgetPrefix("column-chooser");
    var n = e.element().addClass(t);
    var i = e.option("columnChooser");
    var a = (0, f.current)();
    var s = (0, f.isGeneric)(a);
    var l = (0, f.isMaterial)(a);
    var d = {
      visible: false,
      shading: false,
      showCloseButton: false,
      dragEnabled: true,
      resizeEnabled: true,
      wrapperAttr: {
        class: t
      },
      toolbarItems: [{
        text: i.title,
        toolbar: "top",
        location: s || l ? "before" : "center"
      }],
      position: e.getController("columnChooser").getPosition(),
      width: i.width,
      height: i.height,
      rtlEnabled: e.option("rtlEnabled"),
      onHidden: function () {
        if (e._isWinDevice()) {
          (0, o.default)("body").removeClass(e.addWidgetPrefix("notouch-action"));
        }
      },
      container: i.container
    };
    if (s || l) {
      (0, r.extend)(d, {
        showCloseButton: true
      });
    } else {
      d.toolbarItems[d.toolbarItems.length] = {
        shortcut: "cancel"
      };
    }
    if ((0, u.isDefined)(this._popupContainer)) {
      this._popupContainer.option(d);
    } else {
      e._popupContainer = e._createComponent(n, h.default, d);
      e._popupContainer.on("optionChanged", function (t) {
        if (t.name === "visible") {
          e.renderCompleted.fire();
        }
      });
    }
    this.setPopupAttributes();
  },
  setPopupAttributes: function () {
    var e = this.isSelectMode();
    var t = this._columnsController.isBandColumnsUsed();
    this._popupContainer.setAria({
      role: "dialog",
      label: d.default.format("dxDataGrid-columnChooserTitle")
    });
    this._popupContainer.$wrapper().toggleClass(this.addWidgetPrefix("column-chooser-mode-drag"), !e).toggleClass(this.addWidgetPrefix("column-chooser-mode-select"), e);
    this._popupContainer.$content().addClass(this.addWidgetPrefix("column-chooser-list"));
    if (e && !t) {
      this._popupContainer.$content().addClass(this.addWidgetPrefix("column-chooser-plain"));
    }
  },
  _renderCore: function (e) {
    if (this._popupContainer) {
      var t = !this.isSelectMode();
      if (this._columnChooserList && e !== "full") {
        if (t) {
          this._updateItems();
        }
      } else {
        this._renderTreeView();
      }
    }
  },
  _renderTreeView: function () {
    var i = this;
    var o = this._popupContainer.$content();
    var s = this.option("columnChooser");
    var l = this.isSelectMode();
    var d = {
      dataStructure: "plain",
      activeStateEnabled: true,
      focusStateEnabled: true,
      hoverStateEnabled: true,
      itemTemplate: "item",
      showCheckBoxesMode: "none",
      rootValue: null,
      searchEnabled: (0, u.isDefined)(s.allowSearch) ? s.allowSearch : s.search?.enabled,
      searchTimeout: (0, u.isDefined)(s.searchTimeout) ? s.searchTimeout : s.search?.timeout,
      searchEditorOptions: s.search?.editorOptions
    };
    if (this._isWinDevice()) {
      d.useNativeScrolling = false;
    }
    (0, r.extend)(d, l ? this._prepareSelectModeConfig() : this._prepareDragModeConfig());
    if (this._columnChooserList) {
      if (!d.searchEnabled) {
        d.searchValue = "";
      }
      this._columnChooserList.option(d);
      this._updateItems();
    } else {
      this._columnChooserList = this._createComponent(o, p.default, d);
      this._updateItems();
      var c = 0;
      this._columnChooserList.on("optionChanged", function (e) {
        var t = e.component.getScrollable();
        c = t.scrollTop();
      });
      this._columnChooserList.on("contentReady", function (e) {
        (0, a.deferUpdate)(function () {
          e.component.getScrollable().scrollTo({
            y: c
          });
          i.renderCompleted.fire();
        });
      });
    }
  },
  _prepareDragModeConfig: function () {
    return {
      noDataText: this.option("columnChooser").emptyPanelText,
      activeStateEnabled: false,
      focusStateEnabled: false,
      hoverStateEnabled: false,
      itemTemplate: function (e, t, n) {
        (0, o.default)(n).text(e.text).parent().addClass(e.cssClass).addClass("dx-column-chooser-item");
      }
    };
  },
  _prepareSelectModeConfig: function () {
    var e = this;
    var t = this;
    var n = this.option("columnChooser.selection") || {};
    var i = false;
    return {
      selectByClick: n.selectByClick,
      selectNodesRecursive: n.recursive,
      showCheckBoxesMode: n.allowSelectAll ? "selectAll" : "normal",
      onSelectionChanged: function (n) {
        if (!i) {
          var o = function (e) {
            return function e(t, n) {
              return t.reduce(function (t, n) {
                t.push(n);
                if (n.children.length) {
                  e(n.children, t);
                }
                return t;
              }, n);
            }(e, []);
          }(n.component.getNodes());
          n.component.beginUpdate();
          i = true;
          (function (e, t) {
            t.filter(function (e) {
              return e.itemData.allowHiding === false;
            }).forEach(function (t) {
              return e.component.selectItem(t.key);
            });
          })(n, o);
          n.component.endUpdate();
          i = false;
          t.component.beginUpdate();
          e._isUpdatingColumnVisibility = true;
          (function (e) {
            e.forEach(function (e) {
              var n = e.itemData.id;
              var i = e.selected !== false;
              t._columnsController.columnOption(n, "visible", i);
            });
          })(o);
          t.component.endUpdate();
          e._isUpdatingColumnVisibility = false;
        }
      }
    };
  },
  _updateItems: function () {
    var e = this.isSelectMode();
    var t = function (e, t) {
      var n = [];
      var i = e.isSelectMode();
      var o = e.option("columnChooser.selection.recursive");
      if (t.length) {
        (0, s.each)(t, function (e, t) {
          var a = {
            text: t.caption,
            cssClass: t.cssClass,
            allowHiding: t.allowHiding,
            expanded: true,
            id: t.index,
            disabled: t.allowHiding === false,
            parentId: (0, u.isDefined)(t.ownerBand) ? t.ownerBand : null
          };
          var r = o && t.hasColumns;
          if (i && !r) {
            a.selected = t.visible;
          }
          n.push(a);
        });
      }
      return n;
    }(this, this._columnsController.getChooserColumns(e));
    this._columnChooserList.option("items", t);
  },
  _updateItemsSelection: function (e) {
    var t = this;
    var n = e == null ? undefined : e.map(function (e) {
      return t._columnsController.columnOption(e);
    });
    this._columnChooserList.beginUpdate();
    if (n != null) {
      n.forEach(function (e) {
        var n = e.visible;
        var i = e.index;
        if (n) {
          t._columnChooserList.selectItem(i);
        } else {
          t._columnChooserList.unselectItem(i);
        }
      });
    }
    this._columnChooserList.endUpdate();
  },
  _columnOptionChanged: function (e) {
    this.callBase(e);
    if (this.isSelectMode() && this._columnChooserList && this._isUpdatingColumnVisibility !== true) {
      var t = e.optionNames;
      var n = t.visible && t.length === 1;
      var i = (0, u.isDefined)(e.columnIndex) ? [e.columnIndex] : e.columnIndices;
      if (v.some(function (e) {
        return t[e];
      }) || e.changeTypes.columns && t.all) {
        this._updateItemsSelection(i);
        if (!n) {
          this._updateItems();
        }
      }
    }
  },
  optionChanged: function (e) {
    switch (e.name) {
      case "columnChooser":
        this._initializePopupContainer();
        this.render(null, "full");
        break;
      default:
        this.callBase(e);
    }
  },
  getColumnElements: function () {
    var e = [];
    var t = this.isSelectMode();
    var n = this._columnsController.getChooserColumns(t);
    var i = this._popupContainer && this._popupContainer.$content();
    var a = i && i.find(".dx-treeview-node");
    if (a) {
      n.forEach(function (t) {
        var n = a.filter(`[data-item-id = '${t.index}']`);
        var i = n.length ? n.children(`.dx-column-chooser-item`).get(0) : null;
        e.push(i);
      });
    }
    return (0, o.default)(e);
  },
  getName: function () {
    return "columnChooser";
  },
  getColumns: function () {
    return this._columnsController.getChooserColumns();
  },
  allowDragging: function (e) {
    var t = this._columnsController.isParentColumnVisible(e.index);
    var n = !e.visible && e.allowHiding;
    return this.isColumnChooserVisible() && t && n;
  },
  allowColumnHeaderDragging: function (e) {
    return !this.isSelectMode() && this.isColumnChooserVisible() && e.allowHiding;
  },
  getBoundingRect: function () {
    var e = this._popupContainer && this._popupContainer.$overlayContent();
    if (e && e.is(":visible")) {
      var t = e.offset();
      return {
        left: t.left,
        top: t.top,
        right: t.left + (0, l.getOuterWidth)(e),
        bottom: t.top + (0, l.getOuterHeight)(e)
      };
    }
    return null;
  },
  showColumnChooser: function () {
    if (!this._popupContainer) {
      this._initializePopupContainer();
      this.render();
    }
    this._popupContainer.show();
    if (this._isWinDevice()) {
      (0, o.default)("body").addClass(this.addWidgetPrefix("notouch-action"));
    }
  },
  hideColumnChooser: function () {
    if (this._popupContainer) {
      this._popupContainer.hide();
    }
  },
  isColumnChooserVisible: function () {
    var e = this._popupContainer;
    return e && e.option("visible");
  },
  isSelectMode: function () {
    return this.option("columnChooser.mode") === "select";
  },
  hasHiddenColumns: function () {
    var e = this.option("columnChooser.enabled");
    var t = this.getColumns().filter(function (e) {
      return !e.visible;
    });
    return e && t.length;
  },
  publicMethods: function () {
    return ["showColumnChooser", "hideColumnChooser"];
  }
};
var w = {
  defaultOptions: function () {
    return {
      columnChooser: {
        enabled: false,
        search: {
          enabled: false,
          timeout: 500,
          editorOptions: {}
        },
        selection: {
          allowSelectAll: false,
          selectByClick: false,
          recursive: false
        },
        position: undefined,
        mode: "dragAndDrop",
        width: 250,
        height: 260,
        title: d.default.format("dxDataGrid-columnChooserTitle"),
        emptyPanelText: d.default.format("dxDataGrid-columnChooserEmptyText"),
        container: undefined
      }
    };
  },
  controllers: {
    columnChooser: b
  },
  views: {
    columnChooserView: m.ColumnsView.inherit(x)
  },
  extenders: {
    views: {
      headerPanel: {
        _getToolbarItems: function () {
          var e = this.callBase();
          return this._appendColumnChooserItem(e);
        },
        _appendColumnChooserItem: function (e) {
          var t = this;
          if (t.option("columnChooser.enabled")) {
            var n = t.option("columnChooser.title");
            var i = {
              widget: "dxButton",
              options: {
                icon: "column-chooser",
                onClick: function () {
                  t.component.getView("columnChooserView").showColumnChooser();
                },
                hint: n,
                text: n,
                onInitialized: function (e) {
                  (0, o.default)(e.element).addClass(t._getToolbarButtonClass(t.addWidgetPrefix("column-chooser-button")));
                },
                elementAttr: {
                  "aria-haspopup": "dialog"
                }
              },
              showText: "inMenu",
              location: "after",
              name: "columnChooserButton",
              locateInMenu: "auto",
              sortIndex: 40
            };
            e.push(i);
          }
          return e;
        },
        optionChanged: function (e) {
          switch (e.name) {
            case "columnChooser":
              this._invalidate();
              e.handled = true;
              break;
            default:
              this.callBase(e);
          }
        },
        isVisible: function () {
          var e = this.option("columnChooser.enabled");
          return this.callBase() || e;
        }
      },
      columnHeadersView: {
        allowDragging: function (e) {
          var t = this.component.getView("columnChooserView");
          var n = !t.isSelectMode();
          var i = t.isColumnChooserVisible();
          return n && i && e.allowHiding || this.callBase(e);
        }
      }
    },
    controllers: {
      columns: {
        allowMoveColumn: function (e, t, n, i) {
          return (this.option("columnChooser.mode") !== "select" || i !== "columnChooser") && this.callBase(e, t, n, i);
        }
      }
    }
  }
};
exports.columnChooserModule = w;