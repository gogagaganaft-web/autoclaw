Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderSummaryCell = exports.FooterView = undefined;
var i = v(require("./68374.js"));
var o = require("./20576.js");
var a = require("./47617.js");
var r = require("./13306.js");
var s = require("./95479.js");
var l = require("./35922.js");
var u = v(require("./96687.js"));
var d = v(require("./99236.js"));
var c = require("./16454.js");
var h = v(require("./28109.js"));
var f = v(require("./96688.js"));
var p = require("./57318.js");
var g = v(require("./29593.js"));
var m = v(require("./74938.js"));
var _ = v(require("./49975.js"));
function v(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
function y(e, t) {
  var n = (0, i.default)(e);
  var o = t.column;
  var a = t.summaryItems;
  var r = [];
  if (!o.command && a) {
    for (var s = 0; s < a.length; s++) {
      var l = a[s];
      r.push((0, i.default)("<div>").css("textAlign", l.alignment || o.alignment).addClass("dx-datagrid-summary-item").addClass("dx-datagrid-text-content").addClass(l.cssClass).toggleClass("dx-datagrid-group-text-content", t.rowType === "group").text(m.default.getSummaryText(l, t.summaryTexts)));
    }
    n.append(r);
  }
}
exports.renderSummaryCell = y;
function b(e, t) {
  var n = e.option("summary.texts") || {};
  return {
    totalItem: t.row,
    summaryItems: t.row.summaryCells[t.columnIndex],
    summaryTexts: n
  };
}
function x(e) {
  return e.summary || e.aggregates || [];
}
function w(e) {
  return e.option("summary.recalculateWhileEditing");
}
var C = p.ColumnsView.inherit({
  _getRows: function () {
    return this._dataController.footerItems();
  },
  _getCellOptions: function (e) {
    return (0, r.extend)(this.callBase(e), b(this, e));
  },
  _renderCellContent: function (e, t) {
    y(e, t);
    this.callBase.apply(this, arguments);
  },
  _renderCore: function (e) {
    var t = false;
    var n = this._dataController.footerItems()[0];
    if (!e || !e.columnIndices) {
      this.element().empty().addClass("dx-datagrid-total-footer").toggleClass("dx-datagrid-nowrap", !this.option("wordWrapEnabled"));
      t = true;
    }
    if (n && n.summaryCells && n.summaryCells.length) {
      this._updateContent(this._renderTable({
        change: e
      }), e);
      if (t) {
        this._updateScrollLeftPosition();
      }
    }
  },
  _updateContent: function (e, t) {
    var n = this;
    if (t && t.changeType === "update" && t.columnIndices) {
      return this.waitAsyncTemplates().done(function () {
        var i = n.getTableElement().find(".dx-row");
        var o = e.find(".dx-row");
        n._updateCells(i, o, t.columnIndices[0]);
      });
    } else {
      return this.callBase.apply(this, arguments);
    }
  },
  _rowClick: function (e) {
    var t = this._dataController.footerItems()[e.rowIndex] || {};
    this.executeAction("onRowClick", (0, r.extend)({}, e, t));
  },
  _columnOptionChanged: function (e) {
    var t = e.optionNames;
    if (!e.changeTypes.grouping) {
      if (t.width || t.visibleWidth) {
        this.callBase(e);
      }
    }
  },
  _handleDataChanged: function (e) {
    var t = e.changeType;
    if (e.changeType === "update" && e.repaintChangesOnly) {
      if (e.totalColumnIndices) {
        if (e.totalColumnIndices.length) {
          this.render(null, {
            changeType: "update",
            columnIndices: [e.totalColumnIndices]
          });
        }
      } else {
        this.render();
      }
    } else if (t === "refresh" || t === "append" || t === "prepend") {
      this.render();
    }
  },
  _createRow: function (e) {
    var t = this.callBase.apply(this, arguments);
    if (e.rowType === "totalFooter") {
      t.addClass("dx-footer-row");
    }
    return t;
  },
  getHeight: function () {
    return this.getElementHeight();
  },
  isVisible: function () {
    return !!this._dataController.footerItems().length;
  }
});
exports.FooterView = C;
var S;
var k;
var D = {
  init: function () {
    this.callBase.apply(this, arguments);
    this._totalAggregates = [];
    this._summaryGetter = o.noop;
  },
  summaryGetter: function (e) {
    if (!arguments.length) {
      return this._summaryGetter;
    }
    if ((0, l.isFunction)(e)) {
      this._summaryGetter = e;
    }
  },
  summary: function (e) {
    if (!arguments.length) {
      return this._summaryGetter();
    }
    this._summaryGetter = function () {
      return e;
    };
  },
  totalAggregates: function () {
    return this._totalAggregates;
  },
  isLastLevelGroupItemsPagingLocal: function () {
    var e = this.summary();
    var t = e && e.sortByGroups();
    return t && t.length;
  },
  sortLastLevelGroupItems: function (e, t, n) {
    var i = d.default.multiLevelGroup((0, u.default)(e), t).toArray();
    var o = [];
    n.forEach(function (e) {
      (function e(t, n, i, o) {
        o = o || [];
        for (var a = 0; a < t.length; a++) {
          o.push(t[a].key);
          if (n === 1) {
            i(o, t[a].items);
          } else {
            e(t[a].items, n - 1, i, o);
          }
          o.pop();
        }
      })(i, t.length, function (t, n) {
        if (e.toString() === t.toString()) {
          o = o.concat(n);
        }
      });
    });
    return o;
  }
};
S = function (e, t, n, i) {
  var o;
  if (w(e)) {
    var a = e.getController("editing");
    if (a) {
      var s = a.getInsertedData();
      if (s.length) {
        n = function e(t, n, i) {
          if (i) {
            return e(t, n.map(function (e) {
              return {
                items: [e]
              };
            }, i - 1));
          } else {
            return t.concat(n);
          }
        }(n, s, i);
      }
      var l = a.getRemovedData();
      if (l.length) {
        n = function e(t, n, i) {
          if (i) {
            return t.map(function (t) {
              var o = {};
              var a = e(t.items || [], n, i - 1);
              Object.defineProperty(o, "aggregates", {
                get: function () {
                  return t.aggregates;
                },
                set: function (e) {
                  t.aggregates = e;
                }
              });
              return (0, r.extend)(o, t, {
                items: a
              });
            });
          } else {
            return t.filter(function (e) {
              return n.indexOf(e) < 0;
            });
          }
        }(n, l, i);
      }
    }
  }
  if (t) {
    (o = new g.default({
      totalAggregates: t.totalAggregates,
      groupAggregates: t.groupAggregates,
      data: n,
      groupLevel: i
    })).calculate();
  }
  if (o) {
    return o.totalAggregates();
  } else {
    return [];
  }
};
k = function (e, t, n) {
  var i = n && n.sortByGroups && n.sortByGroups();
  if (i && i.length) {
    return function e(t, n, i) {
      if (!t || !n.length) {
        return t;
      }
      var o;
      var a = n[0];
      var r = i[0];
      if (a && r && r.length) {
        o = (0, u.default)(t);
        (0, s.each)(r, function (e) {
          o = e === 0 ? o.sortBy(this.selector, this.desc) : o.thenBy(this.selector, this.desc);
        });
        o.enumerate().done(function (e) {
          t = e;
        });
      }
      n = n.slice(1);
      i = i.slice(1);
      if (n.length && i.length) {
        (0, s.each)(t, function () {
          this.items = e(this.items, n, i);
        });
      }
      return t;
    }(e, t, i);
  } else {
    return e;
  }
};
var I = {
  _customizeRemoteOperations: function (e) {
    var t = this.summary();
    if (t) {
      if (e.remoteOperations.summary) {
        if (!e.isCustomLoading || !!e.storeLoadOptions.isLoadingAll) {
          if (e.storeLoadOptions.group) {
            if (e.remoteOperations.grouping) {
              e.storeLoadOptions.groupSummary = t.groupAggregates;
            } else if (t.groupAggregates.length) {
              e.remoteOperations.paging = false;
            }
          }
          e.storeLoadOptions.totalSummary = t.totalAggregates;
        }
      } else if (t.totalAggregates.length || t.groupAggregates.length && e.storeLoadOptions.group) {
        e.remoteOperations.paging = false;
      }
    }
    this.callBase.apply(this, arguments);
    var n = e.cachedData.extra;
    if (n && n.summary && !e.isCustomLoading) {
      e.storeLoadOptions.totalSummary = undefined;
    }
  },
  _handleDataLoadedCore: function (e) {
    var i = (0, c.normalizeSortingInfo)(e.storeLoadOptions.group || e.loadOptions.group || []);
    var o = e.remoteOperations || {};
    var a = this.summaryGetter()(o);
    if (!e.isCustomLoading || e.storeLoadOptions.isLoadingAll) {
      if (o.summary) {
        if (!o.paging && i.length && a) {
          if (!o.grouping) {
            S(this, {
              groupAggregates: a.groupAggregates
            }, e.data, i.length);
          }
          e.data = k(e.data, i, a);
        }
      } else if (!o.paging && a) {
        var r = e.operationTypes || {};
        if (!Object.keys(r).some(function (e) {
          return r[e];
        }) || !e.cachedData?.extra?.summary || i.length && a.groupAggregates.length) {
          var s = S(this, a, e.data, i.length);
          e.extra = (0, l.isPlainObject)(e.extra) ? e.extra : {};
          e.extra.summary = s;
          if (e.cachedData) {
            e.cachedData.extra = e.extra;
          }
        }
        e.data = k(e.data, i, a);
      }
    }
    if (!e.isCustomLoading) {
      this._totalAggregates = e.extra && e.extra.summary || this._totalAggregates;
    }
    this.callBase(e);
  }
};
_.default.extend(D);
_.default.extend(I);
m.default.registerModule("summary", {
  defaultOptions: function () {
    return {
      summary: {
        groupItems: undefined,
        totalItems: undefined,
        calculateCustomSummary: undefined,
        skipEmptyValues: true,
        recalculateWhileEditing: false,
        texts: {
          sum: h.default.format("dxDataGrid-summarySum"),
          sumOtherColumn: h.default.format("dxDataGrid-summarySumOtherColumn"),
          min: h.default.format("dxDataGrid-summaryMin"),
          minOtherColumn: h.default.format("dxDataGrid-summaryMinOtherColumn"),
          max: h.default.format("dxDataGrid-summaryMax"),
          maxOtherColumn: h.default.format("dxDataGrid-summaryMaxOtherColumn"),
          avg: h.default.format("dxDataGrid-summaryAvg"),
          avgOtherColumn: h.default.format("dxDataGrid-summaryAvgOtherColumn"),
          count: h.default.format("dxDataGrid-summaryCount")
        }
      },
      sortByGroupSummaryInfo: undefined
    };
  },
  views: {
    footerView: C
  },
  extenders: {
    controllers: {
      data: {
        _isDataColumn: function (e) {
          return e && (!(0, l.isDefined)(e.groupIndex) || e.showWhenGrouped);
        },
        _isGroupFooterVisible: function () {
          for (var e = this.option("summary.groupItems") || [], t = 0; t < e.length; t++) {
            var n = e[t];
            var i = this._columnsController.columnOption(n.showInColumn || n.column);
            if (n.showInGroupFooter && this._isDataColumn(i)) {
              return true;
            }
          }
          return false;
        },
        _processGroupItems: function (e, t, n) {
          var i = n && n.data;
          var o = this.callBase.apply(this, arguments);
          if (n) {
            if (n.isGroupFooterVisible === undefined) {
              n.isGroupFooterVisible = this._isGroupFooterVisible();
            }
            if (i && i.items && n.isGroupFooterVisible && (n.collectContinuationItems || !i.isContinuationOnNextPage)) {
              o.push({
                rowType: "groupFooter",
                key: n.path.slice(),
                data: i,
                groupIndex: n.path.length - 1,
                values: []
              });
            }
          }
          return o;
        },
        _processGroupItem: function (e, t) {
          var n = this;
          t.summaryGroupItems ||= n.option("summary.groupItems") || [];
          if (e.rowType === "group") {
            var i = -1;
            var o = -1;
            (0, s.each)(t.visibleColumns, function (n) {
              var a = t.visibleColumns[n - 1];
              if (e.groupIndex === this.groupIndex) {
                i = this.index;
              }
              if (n > 0 && a.command === "expand" && this.command !== "expand") {
                o = this.index;
              }
            });
            e.summaryCells = this._calculateSummaryCells(t.summaryGroupItems, x(e.data), t.visibleColumns, function (e, t) {
              if (e.showInGroupFooter) {
                return -1;
              } else if (e.alignByColumn && t && !(0, l.isDefined)(t.groupIndex) && t.index !== o) {
                return t.index;
              } else {
                return i;
              }
            }, true);
          }
          if (e.rowType === "groupFooter") {
            e.summaryCells = this._calculateSummaryCells(t.summaryGroupItems, x(e.data), t.visibleColumns, function (e, t) {
              if (e.showInGroupFooter && n._isDataColumn(t)) {
                return t.index;
              } else {
                return -1;
              }
            });
          }
          return e;
        },
        _calculateSummaryCells: function (e, t, n, i, o) {
          var a = this;
          var u = [];
          var d = {};
          (0, s.each)(e, function (e, n) {
            var o = a._columnsController.columnOption(n.column);
            var s = n.showInColumn && a._columnsController.columnOption(n.showInColumn) || o;
            var u = i(n, s);
            if (u >= 0) {
              d[u] ||= [];
              var c;
              var h = t[e];
              if (h == h) {
                if ((0, l.isDefined)(n.valueFormat)) {
                  c = n.valueFormat;
                } else if (n.summaryType !== "count") {
                  c = m.default.getFormatByDataType(o && o.dataType);
                }
                d[u].push((0, r.extend)({}, n, {
                  value: (0, l.isString)(h) && o && o.deserializeValue ? o.deserializeValue(h) : h,
                  valueFormat: c,
                  columnCaption: o && o.index !== u ? o.caption : undefined
                }));
              }
            }
          });
          if (!(0, l.isEmptyObject)(d)) {
            n.forEach(function (e, t) {
              var i = n[t - 1];
              var a = !o || (i == null ? undefined : i.command) !== "expand" && e.command !== "expand" ? e.index : i == null ? undefined : i.index;
              u.push(d[a] || []);
            });
          }
          return u;
        },
        _getSummaryCells: function (e, t) {
          var n = this;
          var i = n._columnsController;
          return n._calculateSummaryCells(e, t, i.getVisibleColumns(), function (e, t) {
            if (n._isDataColumn(t)) {
              return t.index;
            } else {
              return -1;
            }
          });
        },
        _updateItemsCore: function (e) {
          var t;
          var n = this._dataSource;
          var i = this._footerItems;
          var o = i && i[0] && i[0].summaryCells;
          var a = this.option("summary.totalItems");
          this._footerItems = [];
          if (n && a && a.length) {
            var r = n.totalAggregates();
            t = this._getSummaryCells(a, r);
            if (e && e.repaintChangesOnly && o) {
              e.totalColumnIndices = t.map(function (e, t) {
                if (JSON.stringify(e) !== JSON.stringify(o[t])) {
                  return t;
                } else {
                  return -1;
                }
              }).filter(function (e) {
                return e >= 0;
              });
            }
            if (t.length) {
              this._footerItems.push({
                rowType: "totalFooter",
                summaryCells: t
              });
            }
          }
          this.callBase(e);
        },
        _prepareUnsavedDataSelector: function (e) {
          if (w(this)) {
            var t = this.getController("editing");
            if (t) {
              return function (n) {
                n = t.getUpdatedData(n);
                return e(n);
              };
            }
          }
          return e;
        },
        _prepareAggregateSelector: function (e, t) {
          e = this._prepareUnsavedDataSelector(e);
          if (t === "avg" || t === "sum") {
            return function (t) {
              var n = e(t);
              if ((0, l.isDefined)(n)) {
                return Number(n);
              } else {
                return n;
              }
            };
          } else {
            return e;
          }
        },
        _getAggregates: function (e, t) {
          var n = this;
          var i = n.getController("columns");
          var o = n.option("summary.calculateCustomSummary");
          var r = n.option("summary.skipEmptyValues");
          return (0, s.map)(e || [], function (e) {
            var s = i.columnOption(e.column);
            var u = s && s.calculateCellValue ? s.calculateCellValue.bind(s) : (0, a.compileGetter)(s ? s.dataField : e.column);
            var d = e.summaryType || "count";
            var c = (0, l.isDefined)(e.skipEmptyValues) ? e.skipEmptyValues : r;
            if (t) {
              return {
                selector: e.column,
                summaryType: d
              };
            }
            var h = n._prepareAggregateSelector(u, d);
            if (d === "custom") {
              if (!o) {
                f.default.log("E1026");
                o = function () {};
              }
              var p = {
                component: n.component,
                name: e.name
              };
              o(p);
              p.summaryProcess = "calculate";
              d = {
                seed: function (e) {
                  p.summaryProcess = "start";
                  p.totalValue = undefined;
                  p.groupIndex = e;
                  delete p.value;
                  o(p);
                  return p.totalValue;
                },
                step: function (e, t) {
                  p.summaryProcess = "calculate";
                  p.totalValue = e;
                  p.value = t;
                  o(p);
                  return p.totalValue;
                },
                finalize: function (e) {
                  p.summaryProcess = "finalize";
                  p.totalValue = e;
                  delete p.value;
                  o(p);
                  return p.totalValue;
                }
              };
            }
            return {
              selector: h,
              aggregator: d,
              skipEmptyValues: c
            };
          });
        },
        _addSortInfo: function (e, t, n, i) {
          if (t) {
            var o = t.groupIndex;
            i = i || t.sortOrder;
            if ((0, l.isDefined)(o)) {
              e[o] = e[o] || [];
              e[o].push({
                selector: n,
                desc: i === "desc"
              });
            }
          }
        },
        _findSummaryItem: function (e, t) {
          var n = -1;
          if ((0, l.isDefined)(t)) {
            (0, s.each)(e || [], function (e) {
              if (this.name === t || e === t || this.summaryType === t || this.column === t || (o = (i = this).summaryType, a = i.column, (o && a && `${o}_${a}`) === t)) {
                n = e;
                return false;
              }
              var i;
              var o;
              var a;
            });
          }
          return n;
        },
        _getSummarySortByGroups: function (e, t) {
          var n = this;
          var i = n._columnsController;
          var o = i.getGroupColumns();
          var a = [];
          if (t && t.length) {
            (0, s.each)(e || [], function () {
              var e = this.sortOrder;
              var r = this.groupColumn;
              var u = n._findSummaryItem(t, this.summaryItem);
              if (!(u < 0)) {
                function d(e) {
                  return x(e)[u];
                }
                if ((0, l.isDefined)(r)) {
                  r = i.columnOption(r);
                  n._addSortInfo(a, r, d, e);
                } else {
                  (0, s.each)(o, function (t, i) {
                    n._addSortInfo(a, i, d, e);
                  });
                }
              }
            });
            return a;
          }
        },
        _createDataSourceAdapterCore: function (e, t) {
          var n = this;
          var i = this.callBase(e, t);
          i.summaryGetter(function (e) {
            return n._getSummaryOptions(e || t);
          });
          return i;
        },
        _getSummaryOptions: function (e) {
          var t = this;
          var n = t.option("summary.groupItems");
          var i = t.option("summary.totalItems");
          var o = t.option("sortByGroupSummaryInfo");
          var a = t._getAggregates(n, e && e.grouping && e.summary);
          var r = t._getAggregates(i, e && e.summary);
          if (a.length || r.length) {
            return {
              groupAggregates: a,
              totalAggregates: r,
              sortByGroups: function () {
                return t._getSummarySortByGroups(o, n);
              }
            };
          }
        },
        publicMethods: function () {
          var e = this.callBase();
          e.push("getTotalSummaryValue");
          return e;
        },
        getTotalSummaryValue: function (e) {
          var t = this._findSummaryItem(this.option("summary.totalItems"), e);
          var n = this._dataSource.totalAggregates();
          if (n.length && t > -1) {
            return n[t];
          }
        },
        optionChanged: function (e) {
          if (e.name === "summary" || e.name === "sortByGroupSummaryInfo") {
            e.name = "dataSource";
          }
          this.callBase(e);
        },
        init: function () {
          this._footerItems = [];
          this.callBase();
        },
        footerItems: function () {
          return this._footerItems;
        }
      },
      editing: {
        _refreshSummary: function () {
          if (w(this) && !this.isSaving()) {
            this._dataController.refresh({
              load: true,
              changesOnly: true
            });
          }
        },
        _addChange: function (e) {
          var t = this.callBase.apply(this, arguments);
          if (e.type) {
            this._refreshSummary();
          }
          return t;
        },
        _removeChange: function () {
          var e = this.callBase.apply(this, arguments);
          this._refreshSummary();
          return e;
        },
        cancelEditData: function () {
          var e = this.callBase.apply(this, arguments);
          this._refreshSummary();
          return e;
        }
      }
    },
    views: {
      rowsView: {
        _createRow: function (e) {
          var t = this.callBase.apply(this, arguments);
          if (e) {
            t.addClass(e.rowType === "groupFooter" ? "dx-datagrid-group-footer" : "");
          }
          return t;
        },
        _renderCells: function (e, t) {
          this.callBase.apply(this, arguments);
          if (t.row.rowType === "group" && t.row.summaryCells && t.row.summaryCells.length) {
            this._renderGroupSummaryCells(e, t);
          }
        },
        _hasAlignByColumnSummaryItems: function (e, t) {
          return !(0, l.isDefined)(t.columns[e].groupIndex) && t.row.summaryCells[e].length;
        },
        _getAlignByColumnCellCount: function (e, t) {
          var n = 0;
          for (var i = 1; i < e; i++) {
            var o = t.row.summaryCells.length - i;
            n = this._hasAlignByColumnSummaryItems(o, t) ? i : n;
          }
          return n;
        },
        _renderGroupSummaryCells: function (e, t) {
          var n = e.children().last();
          var i = Number(n.attr("colSpan")) || 1;
          var o = this._getAlignByColumnCellCount(i, t);
          this._renderGroupSummaryCellsCore(n, t, i, o);
        },
        _renderGroupSummaryCellsCore: function (e, t, n, i) {
          if (i > 0) {
            e.attr("colSpan", n - i);
            for (var o = 0; o < i; o++) {
              var a = t.columns.length - i + o;
              this._renderCell(e.parent(), (0, r.extend)({
                column: t.columns[a],
                columnIndex: this._getSummaryCellIndex(a, t.columns)
              }, t));
            }
          }
        },
        _getSummaryCellIndex: function (e) {
          return e;
        },
        _getCellTemplate: function (e) {
          if (!e.column.command && !(0, l.isDefined)(e.column.groupIndex) && e.summaryItems && e.summaryItems.length) {
            return y;
          } else {
            return this.callBase(e);
          }
        },
        _getCellOptions: function (e) {
          var t = this.callBase(e);
          if (e.row.summaryCells) {
            return (0, r.extend)(t, b(this, e));
          } else {
            return t;
          }
        }
      }
    }
  }
});