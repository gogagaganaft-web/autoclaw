Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.filterSyncModule = undefined;
var i = require("./35922.js");
var o = require("./59423.js");
var a = d(require("./18740.js"));
var r = d(require("./96688.js"));
var s = d(require("./15943.js"));
var l = d(require("./60082.js"));
var u = require("./9622.js");
function d(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
var c = ["=", "<>", "<", "<=", ">", ">=", "notcontains", "contains", "startswith", "endswith", "between"];
function h(e) {
  return e.name || e.dataField;
}
var f;
var p;
var g;
var m;
var _;
var v = {
  defaultOptions: function () {
    return {
      filterValue: null,
      filterSyncEnabled: "auto"
    };
  },
  controllers: {
    filterSync: s.default.Controller.inherit((f = function (e) {
      var t = e.filterValues || [];
      return !a.default.getGroupInterval(e) && (!e.headerFilter || !e.headerFilter.dataSource) || t.length === 1 && t[0] === null;
    }, p = function (e) {
      var t = e.filterValue;
      if ((0, i.isDefined)(t)) {
        var n = e.selectedFilterOperation || e.defaultFilterOperation || (0, o.getDefaultOperation)(e);
        return [h(e), n, e.filterValue];
      }
      return null;
    }, g = function (e) {
      var t;
      var n;
      var i = e.filterValues;
      if (i) {
        if (i.length === 1 && f(e) && !Array.isArray(i[0])) {
          t = e.filterType === "exclude" ? "<>" : "=";
          n = i[0];
        } else {
          t = e.filterType === "exclude" ? "noneof" : "anyof";
          n = i;
        }
        return [h(e), t, n];
      } else {
        return null;
      }
    }, m = function (e, t, n) {
      var i = function (e, t) {
        if (!e) {
          return {
            filterType: "include",
            filterValues: undefined
          };
        }
        var n;
        var i = e[1];
        var o = e[2];
        var a = Array.isArray(o);
        if (!a && !f(t)) {
          return {
            filterType: "include",
            filterValues: undefined
          };
        }
        switch (i) {
          case "anyof":
          case "=":
            n = "include";
            break;
          case "noneof":
          case "<>":
            n = "exclude";
            break;
          default:
            return {
              filterType: "include",
              filterValues: undefined
            };
        }
        return {
          filterType: n,
          filterValues: a ? o : [o]
        };
      }(n, t);
      e.columnOption(h(t), i);
    }, _ = function (e, t, n) {
      var o;
      var a = n == null ? undefined : n[1];
      var r = n == null ? undefined : n[2];
      var s = t.filterOperations || t.defaultFilterOperations;
      if ((!s || s.indexOf(a) >= 0 || a === t.defaultFilterOperation) && c.includes(a) && r !== null) {
        if (a === t.defaultFilterOperation && !(0, i.isDefined)(t.selectedFilterOperation)) {
          a = t.selectedFilterOperation;
        }
        o = {
          filterValue: r,
          selectedFilterOperation: a
        };
      } else {
        o = {
          filterValue: undefined,
          selectedFilterOperation: undefined
        };
      }
      e.columnOption(h(t), o);
    }, {
      syncFilterValue: function () {
        var e = this;
        var t = e.getController("columns");
        var n = t.getFilteringColumns();
        this._skipSyncColumnOptions = true;
        n.forEach(function (n) {
          var a = (0, o.getMatchedConditions)(e.option("filterValue"), h(n));
          if (a.length === 1) {
            var r = a[0];
            m(t, n, r);
            _(t, n, r);
          } else {
            if ((0, i.isDefined)(n.filterValues)) {
              m(t, n, null);
            }
            if ((0, i.isDefined)(n.filterValue)) {
              _(t, n, null);
            }
          }
        });
        this._skipSyncColumnOptions = false;
      },
      _initSync: function () {
        var e = this.getController("columns").getColumns();
        var t = this.getController("data");
        var n = t.pageIndex();
        (function (e) {
          e.forEach(function (e) {
            var t = h(e);
            if (!(0, i.isDefined)(t) && e.allowFiltering) {
              throw new r.default.Error("E1049", e.caption);
            }
          });
        })(e);
        if (!this.option("filterValue")) {
          var o = this.getController("columns").getFilteringColumns();
          var a = this.getFilterValueFromColumns(o);
          this.option("filterValue", a);
        }
        this.syncFilterValue();
        t.pageIndex(n);
      },
      init: function () {
        var e = this;
        var t = this.getController("data");
        if (t.isFilterSyncActive()) {
          if (this.getController("columns").isAllDataTypesDefined()) {
            this._initSync();
          } else {
            t.dataSourceChanged.add(function () {
              return e._initSync();
            });
          }
        }
      },
      _getSyncFilterRow: function (e, t) {
        var n = p(t);
        if ((0, i.isDefined)(n)) {
          return (0, o.syncFilters)(e, n);
        } else {
          return (0, o.removeFieldConditionsFromFilter)(e, h(t));
        }
      },
      _getSyncHeaderFilter: function (e, t) {
        var n = g(t);
        if (n) {
          return (0, o.syncFilters)(e, n);
        } else {
          return (0, o.removeFieldConditionsFromFilter)(e, h(t));
        }
      },
      getFilterValueFromColumns: function (e) {
        if (!this.getController("data").isFilterSyncActive()) {
          return null;
        }
        var t = ["and"];
        if (e) {
          e.forEach(function (e) {
            var n = g(e);
            var i = p(e);
            if (n) {
              (0, o.addItem)(n, t);
            }
            if (i) {
              (0, o.addItem)(i, t);
            }
          });
        }
        return (0, o.getNormalizedFilter)(t);
      },
      syncFilterRow: function (e) {
        this.option("filterValue", this._getSyncFilterRow(this.option("filterValue"), e));
      },
      syncHeaderFilter: function (e) {
        this.option("filterValue", this._getSyncHeaderFilter(this.option("filterValue"), e));
      },
      getCustomFilterOperations: function () {
        var e = this.option("filterBuilder.customOperations") || [];
        return [(0, u.anyOf)(this.component), (0, u.noneOf)(this.component)].concat(e);
      },
      publicMethods: function () {
        return ["getCustomFilterOperations"];
      }
    }))
  },
  extenders: {
    controllers: {
      data: {
        isFilterSyncActive: function () {
          var e = this.option("filterSyncEnabled");
          if (e === "auto") {
            return this.option("filterPanel.visible");
          } else {
            return e;
          }
        },
        skipCalculateColumnFilters: function () {
          var e = this.getController("filterSync");
          return ((0, i.isDefined)(this.option("filterValue")) || e._skipSyncColumnOptions) && this.isFilterSyncActive();
        },
        _calculateAdditionalFilter: function () {
          if (this.option("filterPanel.filterEnabled") === false) {
            return this.callBase();
          }
          var e = [this.callBase()];
          var t = this.getController("columns").getFilteringColumns();
          var n = this.option("filterValue");
          if (this.isFilterSyncActive()) {
            var i = this.getController("headerFilter").getCurrentColumn();
            if (i && n) {
              n = (0, o.removeFieldConditionsFromFilter)(n, h(i));
            }
          }
          var a = this.getController("filterSync").getCustomFilterOperations();
          var r = (0, o.getFilterExpression)(n, t, a, "filterBuilder");
          if (r) {
            e.push(r);
          }
          return l.default.combineFilters(e);
        },
        _parseColumnPropertyName: function (e) {
          var t = e.match(/.*\.(.*)/);
          if (t) {
            return t[1];
          } else {
            return null;
          }
        },
        clearFilter: function (e) {
          this.component.beginUpdate();
          if (arguments.length > 0) {
            if (e === "filterValue") {
              this.option("filterValue", null);
            }
            this.callBase(e);
          } else {
            this.option("filterValue", null);
            this.callBase();
          }
          this.component.endUpdate();
        },
        optionChanged: function (e) {
          switch (e.name) {
            case "filterValue":
              this._applyFilter();
              if (this.isFilterSyncActive()) {
                this.getController("filterSync").syncFilterValue();
              }
              e.handled = true;
              break;
            case "filterSyncEnabled":
              e.handled = true;
              break;
            case "columns":
              if (this.isFilterSyncActive()) {
                var t = this.getController("columns").getColumnByPath(e.fullName);
                var n = this.getController("filterSync");
                if (t && !n._skipSyncColumnOptions) {
                  var i = this._parseColumnPropertyName(e.fullName);
                  n._skipSyncColumnOptions = true;
                  if (i === "filterType") {
                    if (e.value === "exclude" || e.previousValue === "exclude") {
                      n.syncHeaderFilter(t);
                    }
                  } else if (i === "filterValues") {
                    n.syncHeaderFilter(t);
                  } else if (["filterValue", "selectedFilterOperation"].includes(i)) {
                    n.syncFilterRow(t, t.filterValue);
                  }
                  n._skipSyncColumnOptions = false;
                }
              }
              this.callBase(e);
              break;
            default:
              this.callBase(e);
          }
        }
      }
    },
    views: {
      columnHeadersView: {
        _isHeaderFilterEmpty: function (e) {
          if (this.getController("data").isFilterSyncActive()) {
            return !(0, o.filterHasField)(this.option("filterValue"), h(e));
          } else {
            return this.callBase(e);
          }
        },
        _needUpdateFilterIndicators: function () {
          return !this.getController("data").isFilterSyncActive();
        },
        optionChanged: function (e) {
          if (e.name === "filterValue") {
            this._updateHeaderFilterIndicators();
          } else {
            this.callBase(e);
          }
        }
      }
    }
  }
};
exports.filterSyncModule = v;