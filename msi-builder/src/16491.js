Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.FieldChooserBase = undefined;
var i = S(require("./99393.js"));
var o = S(require("./68374.js"));
var a = require("./20576.js");
var r = require("./62754.js");
var s = require("./13306.js");
var l = require("./95479.js");
var u = require("./35922.js");
var d = S(require("./26562.js"));
var c = require("./95429.js");
var h = S(require("./55994.js"));
var f = S(require("./28109.js"));
var p = S(require("./14390.js"));
var g = S(require("./51255.js"));
var m = require("./37565.js");
var _ = S(require("./60082.js"));
var v = S(require("./62930.js"));
var y = require("./28580.js");
var b = require("./71442.js");
var x = require("./98591.js");
var w = require("./72182.js");
var C = require("./95670.js");
function S(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
var k = m.HeaderFilterView.inherit({
  _getSearchExpr: function (e, t) {
    e.useDefaultSearchExpr = true;
    return this.callBase(e, t);
  }
});
function D(e, t) {
  var n = t;
  if ((0, u.isDefined)(t.groupIndex)) {
    n = e.getAreaFields(t.area, true)[t.areaIndex];
  }
  return n;
}
function I(e) {
  e = e || {};
  return JSON.stringify([e.fields, e.columnExpandedPaths, e.rowExpandedPaths]);
}
var T = p.default.inherit(g.default).inherit(v.default).inherit(m.headerFilterMixin).inherit({
  _getDefaultOptions: function () {
    return (0, s.extend)(this.callBase(), {
      allowFieldDragging: true,
      applyChangesMode: "instantly",
      state: null,
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
          emptyValue: f.default.format("dxDataGrid-headerFilterEmptyValue"),
          ok: f.default.format("dxDataGrid-headerFilterOK"),
          cancel: f.default.format("dxDataGrid-headerFilterCancel")
        }
      },
      remoteSort: false
    });
  },
  _init: function () {
    this.callBase();
    this._headerFilterView = new k(this);
    this._refreshDataSource();
    this.subscribeToEvents();
    _.default.logHeaderFilterDeprecatedWarningIfNeed(this);
  },
  _refreshDataSource: function () {
    var e = this.option("dataSource");
    if (e && e.fields && e.load) {
      this._dataSource = e;
    }
  },
  _optionChanged: function (e) {
    switch (e.name) {
      case "dataSource":
        this._refreshDataSource();
        break;
      case "applyChangesMode":
      case "remoteSort":
        break;
      case "state":
        if (this._skipStateChange || !this._dataSource) {
          break;
        }
        if (this.option("applyChangesMode") === "instantly" && I(this._dataSource.state()) !== I(e.value)) {
          this._dataSource.state(e.value);
        } else {
          this._clean(true);
          this._renderComponent();
        }
        break;
      case "headerFilter":
      case "allowFieldDragging":
        this._invalidate();
        break;
      default:
        this.callBase(e);
    }
  },
  renderField: function (e, t) {
    var n = (0, o.default)("<div>").addClass(x.CLASSES.area.fieldContent).text(e.caption || e.dataField);
    var i = (0, o.default)("<div>").addClass(x.CLASSES.area.field).addClass(x.CLASSES.area.box).data("field", e).append(n);
    var a = D(this._dataSource, e);
    if (e.area !== "data") {
      if (e.allowSorting) {
        this._applyColumnState({
          name: "sort",
          rootElement: i,
          column: {
            alignment: this.option("rtlEnabled") ? "right" : "left",
            sortOrder: e.sortOrder === "desc" ? "desc" : "asc",
            allowSorting: e.allowSorting
          },
          showColumnLines: t
        });
      }
      this._applyColumnState({
        name: "headerFilter",
        rootElement: i,
        column: {
          alignment: this.option("rtlEnabled") ? "right" : "left",
          filterValues: a.filterValues,
          allowFiltering: a.allowFiltering && !e.groupIndex,
          allowSorting: e.allowSorting
        },
        showColumnLines: t
      });
    }
    if (e.groupName) {
      i.attr(x.ATTRIBUTES.itemGroup, e.groupName);
    }
    return i;
  },
  _clean: function () {},
  _render: function () {
    this.callBase();
    this._headerFilterView.render(this.$element());
  },
  renderSortable: function () {
    var e = this;
    e._createComponent(e.$element(), b.Sortable, (0, s.extend)({
      allowDragging: e.option("allowFieldDragging"),
      itemSelector: `.${x.CLASSES.area.field}`,
      itemContainerSelector: `.${x.CLASSES.area.fieldContainer}`,
      groupSelector: `.${x.CLASSES.area.fieldList}`,
      groupFilter: function () {
        var t = e._dataSource;
        var n = (0, o.default)(this).closest(".dx-sortable-old");
        var i = n.data("dxPivotGrid");
        var a = n.data("dxPivotGridFieldChooser");
        if (i) {
          return i.getDataSource() === t;
        } else {
          return !!a && a.option("dataSource") === t;
        }
      },
      itemRender: w.dragAndDropItemRender,
      onDragging: function (e) {
        var t = e.sourceElement.data("field");
        var n = e.targetGroup;
        e.cancel = false;
        if (t.isMeasure === true) {
          if (n === "column" || n === "row" || n === "filter") {
            e.cancel = true;
          }
        } else if (t.isMeasure === false && n === "data") {
          e.cancel = true;
        }
      },
      useIndicator: true,
      onChanged: function (t) {
        var n = t.sourceElement.data("field");
        t.removeSourceElement = !!t.sourceGroup;
        e._adjustSortableOnChangedArgs(t);
        if (n) {
          var i;
          var o = t.targetIndex;
          var a = 0;
          e._processDemandState(function (e) {
            var t = e.getAreaFields(n.area, true);
            i = D(e, n);
            var r = t.filter(function (e) {
              return e.visible !== false;
            })[o - 1];
            if (r) {
              a = t.filter(function (e) {
                return e.visible === false && e.areaIndex <= r.areaIndex;
              }).length;
            }
          });
          e._applyChanges([i], {
            area: t.targetGroup,
            areaIndex: o + a
          });
        }
      }
    }, e._getSortableOptions()));
  },
  _processDemandState: function (e) {
    var t = this.option("applyChangesMode") === "instantly";
    var n = this._dataSource;
    if (t) {
      e(n, t);
    } else {
      var i = n.state();
      var o = this.option("state");
      if (o) {
        n.state(o, true);
      }
      e(n, t);
      n.state(i, true);
    }
  },
  _applyChanges: function (e, t) {
    var n = this;
    n._processDemandState(function (i, o) {
      e.forEach(function (e) {
        var n = e.index;
        i.field(n, t);
      });
      if (o) {
        i.load();
      } else {
        n._changedHandler();
      }
    });
  },
  _applyLocalSortChanges: function (e, t) {
    this._processDemandState(function (n) {
      n.field(e, {
        sortOrder: t
      });
      n.sortLocal();
    });
  },
  _adjustSortableOnChangedArgs: function (e) {
    e.removeSourceElement = false;
    e.removeTargetElement = true;
    e.removeSourceClass = false;
  },
  _getSortableOptions: function () {
    return {
      direction: "auto"
    };
  },
  subscribeToEvents: function (e) {
    var t = this;
    function n(e) {
      var n = (0, o.default)(e.currentTarget).data("field");
      var i = (0, s.extend)(true, {}, D(t._dataSource, n));
      var a = (0, o.default)(e.target).hasClass(x.CLASSES.headerFilter);
      var u = t._dataSource;
      var c = i.groupName ? "tree" : "list";
      var h = u.paginate() && c === "list";
      if (a) {
        t._headerFilterView.showHeaderFilterMenu((0, o.default)(e.currentTarget), (0, s.extend)(i, {
          type: c,
          encodeHtml: t.option("encodeHtml"),
          dataSource: {
            useDefaultSearch: !h,
            load: function (e) {
              var n = e.userData;
              if (n.store) {
                return n.store.load(e);
              }
              var o = new r.Deferred();
              u.getFieldValues(i.index, t.option("headerFilter.showRelevantValues"), h ? e : undefined).done(function (i) {
                var a = t.option("headerFilter.texts.emptyValue");
                i.forEach(function (e) {
                  e.text ||= a;
                });
                if (h) {
                  o.resolve(i);
                } else {
                  n.store = new d.default(i);
                  n.store.load(e).done(o.resolve).fail(o.reject);
                }
              }).fail(o.reject);
              return o;
            },
            postProcess: function (e) {
              (function (e, t) {
                var n = [];
                var i = !!t.groupName;
                var o = t.filterType === "exclude";
                if (t.filterValues) {
                  (0, l.each)(t.filterValues, function (e, t) {
                    n.push(Array.isArray(t) ? t.join("/") : t && t.valueOf());
                  });
                }
                (0, y.foreachTree)(e, function (e) {
                  var t = e[0];
                  var a = (0, y.createPath)(e);
                  var r = i ? (0, l.map)(e, function (e) {
                    return e.text;
                  }).reverse().join("/") : t.text;
                  t.value = i ? a.slice(0) : t.key || t.value;
                  var s = i ? a.join("/") : t.value && t.value.valueOf();
                  if (t.children) {
                    t.items = t.children;
                    t.children = null;
                  }
                  (0, m.updateHeaderFilterItemSelectionState)(t, t.key && n.includes(r) || n.includes(s), o);
                });
              })(e, i);
              return e;
            }
          },
          apply: function () {
            t._applyChanges([i], {
              filterValues: this.filterValues,
              filterType: this.filterType
            });
          }
        }));
      } else if (n.allowSorting && n.area !== "data") {
        var f = t.option("remoteSort");
        var p = (0, C.reverseSortOrder)(n.sortOrder);
        if (f) {
          t._applyChanges([n], {
            sortOrder: p
          });
        } else {
          t._applyLocalSortChanges(n.index, p);
        }
      }
    }
    if (e) {
      h.default.on(e, c.name, `.${x.CLASSES.area.field}.${x.CLASSES.area.box}`, n);
    } else {
      h.default.on(t.$element(), c.name, `.${x.CLASSES.area.field}.${x.CLASSES.area.box}`, n);
    }
  },
  _initTemplates: a.noop,
  addWidgetPrefix: function (e) {
    return `dx-pivotgrid-${e}`;
  }
});
exports.FieldChooserBase = T;
(0, i.default)("dxPivotGridFieldChooserBase", T);
var E = {
  FieldChooserBase: T
};
exports.default = E;