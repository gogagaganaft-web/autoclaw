Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;
var i = w(require("./68374.js"));
var o = require("./20576.js");
var a = require("./47617.js");
var r = require("./62754.js");
var s = require("./13306.js");
var l = require("./95479.js");
var u = require("./37518.js");
var d = require("./58664.js");
var c = require("./68752.js");
var h = require("./35922.js");
var f = w(require("./26974.js"));
var p = require("./58201.js");
var g = require("./85273.js");
var m = require("./9234.js");
var _ = require("./16454.js");
var v = w(require("./55994.js"));
var y = w(require("./30343.js"));
var b = w(require("./97218.js"));
var x = w(require("./18740.js"));
function w(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
function C() {
  return (C = Object.assign ? Object.assign.bind() : function (e) {
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
var S = {
  year: function (e) {
    return e && e.getFullYear();
  },
  month: function (e) {
    return e && e.getMonth() + 1;
  },
  day: function (e) {
    return e && e.getDate();
  },
  quarter: function (e) {
    return e && Math.floor(e.getMonth() / 3) + 1;
  },
  hour: function (e) {
    return e && e.getHours();
  },
  minute: function (e) {
    return e && e.getMinutes();
  },
  second: function (e) {
    return e && e.getSeconds();
  }
};
function k() {
  var e = arguments[1];
  var t = this.calculateCellValue(e);
  if (!(0, h.isDefined)(t)) {
    return null;
  }
  if (D(this.dataType)) {
    var n = arguments[0];
    return S[n](t);
  }
  if (this.dataType === "number") {
    var i = arguments[0];
    return Math.floor(Number(t) / i) * i;
  }
}
function D(e) {
  return e === "date" || e === "datetime";
}
function I(e) {
  e.get(0).textContent = "\xA0";
}
function T(e) {
  e = e || [];
  var t = (0, _.normalizeSortingInfo)(e);
  for (var n = 0; n < e.length; n++) {
    if (e && e[n] && e[n].isExpanded !== undefined) {
      t[n].isExpanded = e[n].isExpanded;
    }
    if (e && e[n] && e[n].groupInterval !== undefined) {
      t[n].groupInterval = e[n].groupInterval;
    }
  }
  return t;
}
function E(e, t) {
  var n = y.default.format(e, t.format) || e && e.toString() || "";
  var i = {
    value: e,
    valueText: t.getDisplayFormat ? t.getDisplayFormat(n) : n,
    target: t.target || "row",
    groupInterval: t.groupInterval
  };
  if (t.customizeText) {
    return t.customizeText.call(t, i);
  } else {
    return i.valueText;
  }
}
function O(e, t) {
  var n = e.displayFormat || e.columnCaption && t[`${e.summaryType}OtherColumn`] || t[e.summaryType];
  return E(e.value, {
    format: e.valueFormat,
    getDisplayFormat: function (t) {
      if (n) {
        return (0, c.format)(n, t, e.columnCaption);
      } else {
        return t;
      }
    },
    customizeText: e.customizeText
  });
}
function A(e) {
  var t = e.data && e.data();
  var n = t && t.dxComponents;
  var i = n && n[0];
  return i && t[i];
}
var P = {
  renderNoDataText: function (e) {
    if (e = e || this.element()) {
      var t = this.addWidgetPrefix("nodata");
      var n = e.find(`.${t}`).last();
      var o = this._dataController.isEmpty();
      var a = this._dataController.isLoading();
      if (!n.length) {
        n = (0, i.default)("<span>").addClass(t).appendTo(e);
      }
      if (o && !a) {
        n.removeClass("dx-hidden").text(this._getNoDataText());
      } else {
        n.addClass("dx-hidden");
      }
    }
  },
  renderLoadPanel: function (e, t, n) {
    var o;
    if (this._loadPanel) {
      this._loadPanel.$element().remove();
    }
    if ((o = this.option("loadPanel")) && (o.enabled === "auto" ? !n : o.enabled)) {
      o = (0, s.extend)({
        shading: false,
        message: o.text,
        container: t
      }, o);
      this._loadPanel = this._createComponent((0, i.default)("<div>").appendTo(t), b.default, o);
    } else {
      this._loadPanel = null;
    }
  },
  calculateLoadPanelPosition: function (e) {
    var t = (0, i.default)((0, p.getWindow)());
    if ((0, d.getHeight)(e) > (0, d.getHeight)(t)) {
      return {
        of: t,
        boundary: e,
        collision: "fit"
      };
    } else {
      return {
        of: e
      };
    }
  },
  getIndexByKey: function (e, t, n) {
    var i = -1;
    if (e !== undefined && Array.isArray(t)) {
      n = arguments.length <= 2 ? "key" : n;
      for (var a = 0; a < t.length; a++) {
        var r = (0, h.isDefined)(n) ? t[a][n] : t[a];
        if ((0, o.equalByValue)(e, r)) {
          i = a;
          break;
        }
      }
    }
    return i;
  },
  combineFilters: function (e, t) {
    var i = [];
    t = t || "and";
    for (var o = 0; o < e.length; o++) {
      if (e[o]) {
        if (e[o]?.length === 1 && e[o][0] === "!") {
          if (t === "and") {
            return ["!"];
          }
          if (t === "or") {
            continue;
          }
        }
        if (i.length) {
          i.push(t);
        }
        i.push(e[o]);
      }
    }
    if (i.length === 1) {
      i = i[0];
    }
    if (i.length) {
      return i;
    }
  },
  checkChanges: function (e, t) {
    var n = 0;
    for (var i = 0; i < t.length; i++) {
      if (e[t[i]]) {
        n++;
      }
    }
    return e.length && e.length === n;
  },
  equalFilterParameters: function e(t, n) {
    if (Array.isArray(t) && Array.isArray(n)) {
      if (t.length !== n.length) {
        return false;
      }
      for (var i = 0; i < t.length; i++) {
        if (!e(t[i], n[i])) {
          return false;
        }
      }
      return true;
    }
    if ((0, h.isFunction)(t) && t.columnIndex >= 0 && (0, h.isFunction)(n) && n.columnIndex >= 0) {
      return t.columnIndex === n.columnIndex && (0, a.toComparable)(t.filterValue) === (0, a.toComparable)(n.filterValue) && (0, a.toComparable)(t.selectedFilterOperation) === (0, a.toComparable)(n.selectedFilterOperation);
    } else {
      return (0, a.toComparable)(t) == (0, a.toComparable)(n);
    }
  },
  proxyMethod: function (e, t, n) {
    e[t] ||= function () {
      var e = this._dataSource;
      if (e) {
        return e[t].apply(e, arguments);
      } else {
        return n;
      }
    };
  },
  formatValue: E,
  getFormatOptionsByColumn: function (e, t) {
    return {
      format: e.format,
      getDisplayFormat: e.getDisplayFormat,
      customizeText: e.customizeText,
      target: t,
      trueText: e.trueText,
      falseText: e.falseText
    };
  },
  getDisplayValue: function (e, t, n, i) {
    if (e.displayValueMap && e.displayValueMap[t] !== undefined) {
      return e.displayValueMap[t];
    } else if (e.calculateDisplayValue && n && i !== "group") {
      return e.calculateDisplayValue(n);
    } else if (!e.lookup || i === "group" && (e.calculateGroupValue || e.calculateDisplayValue)) {
      return t;
    } else {
      return e.lookup.calculateCellValue(t);
    }
  },
  getGroupRowSummaryText: function (e, t) {
    var n = "(";
    for (var i = 0; i < e.length; i++) {
      var o = e[i];
      n += (i > 0 ? ", " : "") + O(o, t);
    }
    return n + ")";
  },
  getSummaryText: O,
  normalizeSortingInfo: T,
  getFormatByDataType: function (e) {
    switch (e) {
      case "date":
        return "shortDate";
      case "datetime":
        return "shortDateShortTime";
      default:
        return;
    }
  },
  getHeaderFilterGroupParameters: function (e, t) {
    var n = [];
    var i = e.dataField || e.name;
    var o = x.default.getGroupInterval(e);
    if (o) {
      (0, l.each)(o, function (a, r) {
        n.push(t ? {
          selector: i,
          groupInterval: r,
          isExpanded: a < o.length - 1
        } : k.bind(e, r));
      });
      return n;
    } else {
      if (t) {
        n = [{
          selector: i,
          isExpanded: false
        }];
      } else {
        n = function (t) {
          var n = e.calculateCellValue(t);
          if (n === undefined || n === "") {
            n = null;
          }
          return n;
        };
        if (e.sortingMethod) {
          n = [{
            selector: n,
            compare: e.sortingMethod.bind(e)
          }];
        }
      }
      return n;
    }
  },
  equalSortParameters: function (e, t, n) {
    e = T(e);
    t = T(t);
    if (Array.isArray(e) && Array.isArray(t)) {
      if (e.length !== t.length) {
        return false;
      }
      for (var i = 0; i < e.length; i++) {
        o = e[i].selector;
        a = t[i].selector;
        if (!((0, h.isFunction)(o) && (0, h.isFunction)(a) && o.originalCallback && a.originalCallback ? o.originalCallback === a.originalCallback && o.columnIndex === a.columnIndex : o === a) || e[i].desc !== t[i].desc || e[i].groupInterval !== t[i].groupInterval || !n && Boolean(e[i].isExpanded) !== Boolean(t[i].isExpanded)) {
          return false;
        }
      }
      return true;
    }
    var o;
    var a;
    return (!e || !e.length) == (!t || !t.length);
  },
  getPointsByColumns: function (e, t, n, i) {
    var o;
    var a;
    var r;
    for (var s = e.length, l = false, d = i || 0, c = [], h = 0; h <= s; h++) {
      if (h < s) {
        a = (o = e.eq(h)).offset();
        r = o.css("direction") === "rtl";
      }
      var f = {
        index: d,
        x: a ? a.left + (!n && r ^ h === s ? (0, u.getBoundingRect)(o[0]).width : 0) : 0,
        y: a ? a.top + (n && h === s ? (0, u.getBoundingRect)(o[0]).height : 0) : 0,
        columnIndex: d
      };
      if (!n && h > 0) {
        var p = e.eq(h - 1).offset();
        if (p.top < f.y) {
          f.y = p.top;
        }
      }
      if (t) {
        l = t(f);
      }
      if (!l) {
        c.push(f);
      }
      d++;
    }
    return c;
  },
  getExpandCellTemplate: function () {
    return {
      allowRenderToDetachedContainer: true,
      render: function (e, t) {
        var n = (0, i.default)(e);
        if (!(0, h.isDefined)(t.value) || t.data && t.data.isContinuation || t.row.isNewRow) {
          I(n);
        } else {
          var o = t.component.getView("rowsView");
          n.addClass("dx-datagrid-expand").addClass("dx-selection-disabled");
          (0, i.default)("<div>").addClass(t.value ? "dx-datagrid-group-opened" : "dx-datagrid-group-closed").appendTo(n);
          o.setAria("label", t.value ? o.localize("dxDataGrid-ariaCollapse") : o.localize("dxDataGrid-ariaExpand"), n);
        }
      }
    };
  },
  setEmptyText: I,
  isDateType: D,
  getSelectionRange: function (e) {
    try {
      if (e) {
        return {
          selectionStart: e.selectionStart,
          selectionEnd: e.selectionEnd
        };
      }
    } catch (e) {}
    return {};
  },
  setSelectionRange: function (e, t) {
    try {
      if (e && e.setSelectionRange) {
        e.setSelectionRange(t.selectionStart, t.selectionEnd);
      }
    } catch (e) {}
  },
  focusAndSelectElement: function (e, t) {
    var n = t.is(":focus");
    v.default.trigger(t, "focus");
    var i = e.option("editing.selectTextOnEditStart");
    var o = t.get(0);
    if (!n && i && t.is(".dx-texteditor-input") && !t.is("[readonly]")) {
      var a = A(t.closest(".dx-texteditor"));
      (0, r.when)(a && a._loadItemDeferred).done(function () {
        o.select();
      });
    }
  },
  getWidgetInstance: A,
  getLastResizableColumnIndex: function (e, t) {
    var n;
    var i = e.some(function (e) {
      return e && !e.command && !e.fixed && e.allowResizing !== false;
    });
    for (n = e.length - 1; e[n]; n--) {
      var o = e[n];
      var a = t && t[n];
      var r = !i || o.allowResizing !== false;
      if (!o.command && !o.fixed && a !== "adaptiveHidden" && r) {
        break;
      }
    }
    return n;
  },
  isElementInCurrentGrid: function (e, t) {
    return !!t && !!t.length && t.closest(`.${e.getWidgetContainerClass()}`).parent().is(e.component.$element());
  },
  isVirtualRowRendering: function (e) {
    var t = e.option("scrolling.rowRenderingMode");
    var n = e.option("scrolling.mode") === "virtual";
    var i = e.option("scrolling.mode") === "infinite";
    return e.option("scrolling.legacyMode") === false && (!!n || !!i) || t === "virtual";
  },
  getPixelRatio: function (e) {
    return e.devicePixelRatio || 1;
  },
  getContentHeightLimit: function (e) {
    if (e.mozilla) {
      return 8000000;
    } else {
      return 15000000 / this.getPixelRatio((0, p.getWindow)());
    }
  },
  normalizeLookupDataSource: function (e) {
    var t;
    if (e.items) {
      t = e.items;
    } else {
      t = e.dataSource;
      if ((0, h.isFunction)(t) && !f.default.isWrapped(t)) {
        t = t({});
      }
    }
    return (0, m.normalizeDataSourceOptions)(t);
  },
  getWrappedLookupDataSource: function (e, t, n) {
    var i = this;
    if (!t) {
      return [];
    }
    var o = this.normalizeLookupDataSource(e.lookup);
    if (e.calculateCellValue !== e.defaultCalculateCellValue) {
      return o;
    }
    var a;
    var s;
    var l;
    var u = t.remoteOperations().groupPaging;
    var d = e.displayField && (0, h.isString)(e.displayField);
    function c(e, t) {
      var i = t.skip ?? 0;
      var o = t.take ? i + t.take : e.length;
      return e.slice(i, o);
    }
    function f(i) {
      var o = function (e) {
        if (!Array.isArray(e)) {
          e = [e];
        }
        return e.map(function (t, n) {
          if ((0, h.isString)(t)) {
            return {
              selector: t,
              isExpanded: n < e.length - 1
            };
          } else {
            return t;
          }
        });
      }(d ? [e.dataField, e.displayField] : e.dataField);
      var f = new r.Deferred();
      if (a && (!u || i.skip === l && i.take === s)) {
        f.resolve(c(a, i));
      } else {
        l = i.skip;
        s = i.take;
        t.load({
          filter: n,
          group: o,
          take: u ? i.take : undefined,
          skip: u ? i.skip : undefined
        }).done(function (e) {
          a = e;
          f.resolve(u ? e : c(e, i));
        }).fail(f.fail);
      }
      return f;
    }
    return C(C({}, o), {
      __dataGridSourceFilter: n,
      load: function (t) {
        var n = new r.Deferred();
        f(t).done(function (a) {
          if (a.length !== 0) {
            var r = i.combineFilters(a.flatMap(function (e) {
              return e.key;
            }).map(function (t) {
              return [e.lookup.valueExpr, t];
            }), "or");
            new g.DataSource(C(C(C({}, o), t), {
              filter: i.combineFilters([r, t.filter], "and"),
              paginate: false
            })).load().done(n.resolve).fail(n.fail);
          } else {
            n.resolve([]);
          }
        }).fail(n.fail);
        return n;
      },
      key: e.lookup.valueExpr,
      byKey: function (t) {
        var n = (0, r.Deferred)();
        this.load({
          filter: [e.lookup.valueExpr, "=", t]
        }).done(function (e) {
          n.resolve(e[0]);
        });
        return n.promise();
      }
    });
  },
  logHeaderFilterDeprecatedWarningIfNeed: function (e) {
    var t = e._logDeprecatedOptionWarning.bind(e);
    if ((0, h.isDefined)(e.option("headerFilter.allowSearch"))) {
      t("headerFilter.allowSearch", {
        since: "23.1",
        alias: "headerFilter.search.enabled"
      });
    }
    if ((0, h.isDefined)(e.option("headerFilter.searchTimeout"))) {
      t("headerFilter.searchTimeout", {
        since: "23.1",
        alias: "headerFilter.search.timeout"
      });
    }
    var n = e.NAME === "dxPivotGrid" ? "dataSource.fields" : "columns";
    var i = e.option(n);
    if (Array.isArray(i)) {
      (function e(i) {
        i.forEach(function (i) {
          var a = i.headerFilter || {};
          if ((0, h.isDefined)(a.allowSearch)) {
            t(`${n}[].headerFilter.allowSearch`, {
              since: "23.1",
              alias: `${n}[].headerFilter.search.enabled`
            });
          }
          if ((0, h.isDefined)(a.searchMode)) {
            t(`${n}[].headerFilter.searchMode`, {
              since: "23.1",
              alias: `${n}[].headerFilter.search.mode`
            });
          }
          if (i.columns?.length) {
            e(i.columns);
          }
        });
      })(i);
    }
  }
};
exports.default = P;