Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.FieldChooser = undefined;
require("./16710.js");
var i = m(require("./99393.js"));
var o = m(require("./68374.js"));
var a = require("./13306.js");
var r = require("./44899.js");
var s = require("./95479.js");
var l = require("./35922.js");
var u = require("./58201.js");
var d = m(require("./28109.js"));
var c = m(require("./10042.js"));
var h = m(require("./30254.js"));
var f = require("./28580.js");
var p = require("./98591.js");
var g = require("./16491.js");
function m(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
var _ = "<div>";
var v = (0, u.hasWindow)();
function y(e, t) {
  if (e.items) {
    for (var n = 0; n < e.items.length; n += 1) {
      var i = y(e.items[n], t);
      if (i) {
        return i;
      }
    }
  }
  if (t(e)) {
    return e;
  }
}
var b = [function (e, t) {
  return -!!e.isMeasure + +!!t.isMeasure;
}, function (e, t) {
  return -(!!e.items && !!e.items.length) + +(!!t.items && !!t.items.length);
}, function (e, t) {
  return +(e.isMeasure === false && !!e.field && !!e.field.levels && !!e.field.levels.length) + -(t.isMeasure === false && !!t.field && !!t.field.levels && !!t.field.levels.length);
}, (0, f.getCompareFunction)(function (e) {
  return e.text;
})];
function x(e, t) {
  for (var n = 0, i = 0; !n && b[i];) {
    n = b[i++](e, t);
  }
  return n;
}
function w(e) {
  return e.find(`.${p.CLASSES.scrollable.self}`).dxScrollable("instance");
}
var C = g.FieldChooserBase.inherit({
  _getDefaultOptions: function () {
    return (0, a.extend)(this.callBase(), {
      height: 400,
      layout: 0,
      dataSource: null,
      encodeHtml: true,
      onContextMenuPreparing: null,
      allowSearch: false,
      searchTimeout: 500,
      texts: {
        columnFields: d.default.format("dxPivotGrid-columnFields"),
        rowFields: d.default.format("dxPivotGrid-rowFields"),
        dataFields: d.default.format("dxPivotGrid-dataFields"),
        filterFields: d.default.format("dxPivotGrid-filterFields"),
        allFields: d.default.format("dxPivotGrid-allFields")
      }
    });
  },
  _refreshDataSource: function () {
    var e = this;
    e._expandedPaths = [];
    e._changedHandler = e._changedHandler || function () {
      (0, s.each)(e._dataChangedHandlers, function (e, t) {
        t();
      });
      e._fireContentReadyAction();
      e._skipStateChange = true;
      e.option("state", e._dataSource.state());
      e._skipStateChange = false;
    };
    e._disposeDataSource();
    e.callBase();
    if (e._dataSource) {
      e._dataSource.on("changed", e._changedHandler);
    }
  },
  _disposeDataSource: function () {
    var e = this._dataSource;
    if (e) {
      e.off("changed", this._changedHandler);
      this._dataSource = undefined;
    }
  },
  _dispose: function () {
    this._disposeDataSource();
    this.callBase.apply(this, arguments);
  },
  _init: function () {
    this.callBase();
    this._refreshDataSource();
    this._dataChangedHandlers = [];
    this._initActions();
  },
  _initActions: function () {
    this._actions = {
      onContextMenuPreparing: this._createActionByOption("onContextMenuPreparing")
    };
  },
  _trigger: function (e, t) {
    this._actions[e](t);
  },
  _setOptionsByReference: function () {
    this.callBase();
    (0, a.extend)(this._optionsByReference, {
      dataSource: true
    });
  },
  _optionChanged: function (e) {
    switch (e.name) {
      case "dataSource":
        this._refreshDataSource();
        this._invalidate();
        break;
      case "layout":
      case "texts":
      case "allowSearch":
      case "searchTimeout":
      case "encodeHtml":
        this._invalidate();
        break;
      case "onContextMenuPreparing":
        this._actions[e.name] = this._createActionByOption(e.name);
        break;
      default:
        this.callBase(e);
    }
  },
  _clean: function (e) {
    if (!e && this._dataSource) {
      this.option("state", this._dataSource.state());
    }
    this.$element().children(`.${p.CLASSES.fieldChooser.container}`).remove();
  },
  _renderLayout0: function (e) {
    e.addClass(p.CLASSES.layout.zero);
    var t = (0, o.default)(_).addClass(p.CLASSES.row).appendTo(e);
    var n = (0, o.default)(_).addClass(p.CLASSES.row).appendTo(e);
    var i = (0, o.default)(_).addClass(p.CLASSES.col).appendTo(t);
    var a = (0, o.default)(_).addClass(p.CLASSES.col).appendTo(t);
    var r = (0, o.default)(_).addClass(p.CLASSES.col).appendTo(n);
    var s = (0, o.default)(_).addClass(p.CLASSES.col).appendTo(n);
    this._renderArea(i, "all");
    this._renderArea(a, "row");
    this._renderArea(a, "column");
    this._renderArea(r, "filter");
    this._renderArea(s, "data");
  },
  _renderLayout1: function (e) {
    var t = (0, o.default)(_).addClass(p.CLASSES.col).appendTo(e);
    var n = (0, o.default)(_).addClass(p.CLASSES.col).appendTo(e);
    this._renderArea(t, "all");
    this._renderArea(n, "filter");
    this._renderArea(n, "row");
    this._renderArea(n, "column");
    this._renderArea(n, "data");
  },
  _renderLayout2: function (e) {
    e.addClass(p.CLASSES.layout.second);
    var t = (0, o.default)(_).addClass(p.CLASSES.row).appendTo(e);
    this._renderArea(t, "all");
    var n = (0, o.default)(_).addClass(p.CLASSES.row).appendTo(e);
    var i = (0, o.default)(_).addClass(p.CLASSES.col).appendTo(n);
    var a = (0, o.default)(_).addClass(p.CLASSES.col).appendTo(n);
    this._renderArea(i, "filter");
    this._renderArea(i, "row");
    this._renderArea(a, "column");
    this._renderArea(a, "data");
  },
  _initMarkup: function () {
    var e = this.$element();
    var t = (0, o.default)(_).addClass(p.CLASSES.fieldChooser.container).appendTo(e);
    var n = this.option("layout");
    this.callBase();
    e.addClass(p.CLASSES.fieldChooser.self).addClass(p.CLASSES.pivotGrid.fieldsContainer);
    this._dataChangedHandlers = [];
    var i = this._dataSource;
    var a = this.option("applyChangesMode") !== "instantly" && i && i.state();
    if (a && this.option("state")) {
      i.state(this.option("state"), true);
    }
    if (n === 0) {
      this._renderLayout0(t);
    } else if (n === 1) {
      this._renderLayout1(t);
    } else {
      this._renderLayout2(t);
    }
    if (a) {
      i.state(a, true);
    }
  },
  _renderContentImpl: function () {
    this.callBase();
    this.renderSortable();
    this._renderContextMenu();
    this.updateDimensions();
  },
  _fireContentReadyAction: function () {
    if (!this._dataSource || !this._dataSource.isLoading()) {
      this.callBase();
    }
  },
  _getContextMenuArgs: function (e) {
    var t;
    var n;
    var i = (0, o.default)(e.target).closest(`.${p.CLASSES.area.field}`);
    var a = (0, o.default)(e.target).closest(`.${p.CLASSES.area.fieldList}`);
    if (i.length) {
      var r = i.data("field");
      if (r) {
        t = this.getDataSource().field(r.index) || r;
      }
    }
    if (a.length) {
      n = a.attr("group");
    }
    return {
      event: e,
      field: t,
      area: n,
      items: []
    };
  },
  _renderContextMenu: function () {
    var e = this;
    var t = e.$element();
    if (e._contextMenu) {
      e._contextMenu.$element().remove();
    }
    e._contextMenu = e._createComponent((0, o.default)(_).appendTo(t), c.default, {
      onPositioning: function (t) {
        var n = t.event;
        if (n) {
          var i = e._getContextMenuArgs(n);
          e._trigger("onContextMenuPreparing", i);
          if (i.items && i.items.length) {
            t.component.option("items", i.items);
          } else {
            t.cancel = true;
          }
        }
      },
      target: t,
      onItemClick: function (e) {
        if (e.itemData.onItemClick) {
          e.itemData.onItemClick(e);
        }
      },
      cssClass: p.CLASSES.fieldChooser.contextMenu
    });
  },
  _createTreeItems: function (e, t, n) {
    var i;
    var o = this;
    var a = [];
    var r = [];
    var u = t[0];
    var d = {};
    if (u) {
      (0, s.each)(e, function (e, t) {
        var n = t[u] || "";
        d[n] = d[n] || [];
        d[n].push(t);
        if (i === undefined) {
          i = true;
        }
        i = i && t.isMeasure === true;
      });
      (0, s.each)(d, function (e, i) {
        var s = n ? `${n}.${e}` : e;
        var l = o._createTreeItems(i, t.slice(1), s);
        if (e) {
          r.push({
            key: e,
            text: e,
            path: s,
            isMeasure: l.isMeasure,
            expanded: o._expandedPaths.includes(s),
            items: l
          });
        } else {
          a = l;
        }
      });
      (a = r.concat(a)).isMeasure = i;
    } else {
      (0, s.each)(e, function (e, t) {
        var n;
        if (t.isMeasure === true) {
          n = p.ICONS.measure;
        }
        if (t.isMeasure === false) {
          n = t.groupName ? p.ICONS.hierarchy : p.ICONS.dimension;
        }
        a.push({
          index: t.index,
          field: t,
          key: t.dataField,
          selected: (0, l.isDefined)(t.area),
          text: t.caption || t.dataField,
          icon: n,
          isMeasure: t.isMeasure,
          isDefault: t.isDefault
        });
      });
    }
    return a;
  },
  _createFieldsDataSource: function (e) {
    var t = e && e.fields() || [];
    t = t.filter(function (e) {
      return e.visible !== false && !(0, l.isDefined)(e.groupIndex);
    });
    var n = this._createTreeItems(t, ["dimension", "displayFolder"]);
    (0, f.foreachDataLevel)(n, function (e) {
      e.sort(x);
    }, 0, "items");
    return n;
  },
  _renderFieldsTreeView: function (e) {
    var t = this;
    var n = t._dataSource;
    var i = t._createComponent(e, h.default, {
      dataSource: t._createFieldsDataSource(n),
      showCheckBoxesMode: "normal",
      expandNodesRecursive: false,
      searchEnabled: t.option("allowSearch"),
      searchTimeout: t.option("searchTimeout"),
      useNativeScrolling: false,
      itemTemplate: function (e, t, n) {
        var i;
        var a = (0, o.default)("<div>").toggleClass(p.CLASSES.area.field, !e.items).attr(p.ATTRIBUTES.treeViewItem, true).data("field", e.field).appendTo(n);
        if (e.icon) {
          if ((i = (0, r.getImageContainer)(e.icon)) !== null && i !== undefined) {
            i.appendTo(a);
          }
        }
        (0, o.default)("<span>").text(e.text).appendTo(a);
      },
      onItemCollapsed: function (e) {
        var n = t._expandedPaths.indexOf(e.itemData.path);
        if (n >= 0) {
          t._expandedPaths.splice(n, 1);
        }
      },
      onItemExpanded: function (e) {
        if (t._expandedPaths.indexOf(e.itemData.path) < 0) {
          t._expandedPaths.push(e.itemData.path);
        }
      },
      onItemSelectionChanged: function (e) {
        var o;
        var a;
        var r;
        var s = e.itemData;
        var u = true;
        if (s.items) {
          if (s.selected) {
            i.unselectItem(s);
            return;
          }
          t._processDemandState(function () {
            a = function e(t, n) {
              var i = [];
              if (t.items) {
                for (var o = 0; o < t.items.length; o += 1) {
                  i.push.apply(i, e(t.items[o], n));
                }
              } else if ((0, l.isDefined)(t.index)) {
                i.push(n[t.index]);
              }
              return i;
            }(s, n.fields());
            for (var e = 0; e < a.length; e += 1) {
              if (a[e].area) {
                u = false;
                break;
              }
            }
          });
          if (u) {
            var d = y(s, function (e) {
              return e.isDefault;
            }) || y(s, function (e) {
              return (0, l.isDefined)(e.index);
            });
            if (d) {
              i.selectItem(d);
            }
            return;
          }
        } else {
          o = n.fields()[s.index];
          if (s.selected) {
            r = o.isMeasure ? "data" : "column";
          }
          if (o) {
            a = [o];
          }
        }
        t._applyChanges(a, {
          area: r,
          areaIndex: undefined
        });
      }
    });
    t._dataChangedHandlers.push(function () {
      var o = w(e);
      var a = o ? o.scrollTop() : 0;
      i.option({
        dataSource: t._createFieldsDataSource(n)
      });
      if (o = w(e)) {
        o.scrollTo({
          y: a
        });
        o.update();
      }
    });
  },
  _renderAreaFields: function (e, t) {
    var n = this;
    var i = n._dataSource;
    var o = i ? (0, a.extend)(true, [], i.getAreaFields(t, true)) : [];
    e.empty();
    (0, s.each)(o, function (t, i) {
      if (i.visible !== false) {
        n.renderField(i, true).appendTo(e);
      }
    });
  },
  _renderArea: function (e, t) {
    var n;
    var i;
    var a = this;
    var r = (0, o.default)(_).addClass(p.CLASSES.area.self).appendTo(e);
    var s = (0, o.default)(_).addClass(p.CLASSES.area.fieldListHeader).appendTo(r);
    var l = a.option(`texts.${t}Fields`);
    (0, o.default)("<span>").addClass(p.CLASSES.area.icon).addClass(`dx-area-icon-${t}`).appendTo(s);
    (0, o.default)("<span>").html("&nbsp;").appendTo(s);
    (0, o.default)("<span>").addClass(p.CLASSES.area.caption).text(l).appendTo(s);
    var u = (0, o.default)(_).addClass(p.CLASSES.area.fieldList).addClass(p.CLASSES.pivotGrid.dragAction).appendTo(r);
    if (t !== "all") {
      u.attr("group", t).attr(p.ATTRIBUTES.allowScrolling, true);
      n = (0, o.default)(_).addClass(p.CLASSES.area.fieldContainer).appendTo(u);
      i = function () {
        a._renderAreaFields(n, t);
      };
      a._dataChangedHandlers.push(i);
      i();
      u.dxScrollable({
        useNative: false
      });
    } else {
      r.addClass(p.CLASSES.allFields);
      u.addClass(p.CLASSES.treeView.borderVisible);
      a._renderFieldsTreeView(u);
    }
  },
  _getSortableOptions: function () {
    return {};
  },
  _adjustSortableOnChangedArgs: function () {},
  resetTreeView: function () {
    var e = this.$element().find(`.${p.CLASSES.treeView.self}`).dxTreeView("instance");
    if (e) {
      e.option("searchValue", "");
      e.collapseAll();
    }
  },
  applyChanges: function () {
    var e = this.option("state");
    if ((0, l.isDefined)(e)) {
      this._dataSource.state(e);
    }
  },
  cancelChanges: function () {
    var e = this._dataSource;
    return !e.isLoading() && (this.option("state", e.state()), true);
  },
  getDataSource: function () {
    return this._dataSource;
  },
  updateDimensions: function () {
    this.$element().find(`.${p.CLASSES.area.self} .${p.CLASSES.scrollable.self}`).dxScrollable("update");
  },
  _visibilityChanged: function (e) {
    if (e && v) {
      this.updateDimensions();
    }
  }
});
exports.FieldChooser = C;
(0, i.default)("dxPivotGridFieldChooser", C);
var S = {
  FieldChooser: C
};
exports.default = S;