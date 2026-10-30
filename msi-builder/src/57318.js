function i(e) {
  return (i = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function (e) {
    return typeof e;
  } : function (e) {
    if (e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype) {
      return "symbol";
    } else {
      return typeof e;
    }
  })(e);
}
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ColumnsView = undefined;
var o = T(require("./73349.js"));
var a = require("./6415.js");
var r = require("./97906.js");
var s = T(require("./68374.js"));
var l = T(require("./47810.js"));
var u = require("./20576.js");
var d = require("./62754.js");
var c = require("./13306.js");
var h = function (e, t) {
  if (!t && e && e.__esModule) {
    return e;
  }
  if (e === null || i(e) !== "object" && typeof e != "function") {
    return {
      default: e
    };
  }
  var n = I(t);
  if (n && n.has(e)) {
    return n.get(e);
  }
  var o = {};
  var a = Object.defineProperty && Object.getOwnPropertyDescriptor;
  for (var r in e) {
    if (r !== "default" && Object.prototype.hasOwnProperty.call(e, r)) {
      var s = a ? Object.getOwnPropertyDescriptor(e, r) : null;
      if (s && (s.get || s.set)) {
        Object.defineProperty(o, r, s);
      } else {
        o[r] = e[r];
      }
    }
  }
  o.default = e;
  if (n) {
    n.set(e, o);
  }
  return o;
}(require("./95479.js"));
var f = require("./37518.js");
var p = require("./58664.js");
var g = require("./80968.js");
var m = require("./60137.js");
var _ = require("./35922.js");
var v = require("./58201.js");
var y = require("./95429.js");
var b = T(require("./55994.js"));
var x = require("./85272.js");
var w = T(require("./93786.js"));
var C = require("./29007.js");
var S = T(require("./51255.js"));
var k = T(require("./15943.js"));
var D = T(require("./60082.js"));
function I(e) {
  if (typeof WeakMap != "function") {
    return null;
  }
  var t = new WeakMap();
  var n = new WeakMap();
  return (I = function (e) {
    if (e) {
      return n;
    } else {
      return t;
    }
  })(e);
}
function T(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
function E(e, t) {
  return (E = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (e, t) {
    e.__proto__ = t;
    return e;
  })(e, t);
}
var O = {
  render: function (e) {
    e.container.append(e.content);
  }
};
function A(e) {
  if (e === "auto") {
    return "";
  } else if ((0, _.isNumeric)(e)) {
    return `${e}px`;
  } else {
    return e;
  }
}
function P(e, t, n) {
  e.style.width = e.style.maxWidth = t.width === "auto" ? "" : n;
}
function M(e) {
  e.resolve();
}
var R = function (e) {
  var t;
  var n;
  function i() {
    return e.apply(this, arguments) || this;
  }
  n = e;
  (t = i).prototype = Object.create(n.prototype);
  t.prototype.constructor = t;
  E(t, n);
  var S = i.prototype;
  S._createScrollableOptions = function () {
    var e = this.option("scrolling");
    var t = this.option("scrolling.useNative");
    var n = (0, c.extend)({}, e, {
      direction: "both",
      bounceEnabled: false,
      useKeyboard: false
    });
    if (t === undefined) {
      t = true;
    }
    if (t === "auto") {
      delete n.useNative;
      delete n.useSimulatedScrollbar;
    } else {
      n.useNative = !!t;
      n.useSimulatedScrollbar = !t;
    }
    return n;
  };
  S._updateCell = function (e, t) {
    if (t.rowType) {
      this._cellPrepared(e, t);
    }
  };
  S._createCell = function (e) {
    var t = e.column;
    var n = t.alignment || (0, f.getDefaultAlignment)(this.option("rtlEnabled"));
    var i = o.default.createElement("td");
    i.style.textAlign = n;
    var a = (0, s.default)(i);
    if (e.rowType === "data" && t.headerId && !t.type && this.component.option("showColumnHeaders")) {
      this.setAria("describedby", t.headerId, a);
    }
    if (t.cssClass) {
      a.addClass(t.cssClass);
    }
    if (t.command === "expand") {
      a.addClass(t.cssClass);
      a.addClass(this.addWidgetPrefix("group-space"));
    }
    if (t.colspan > 1) {
      a.attr("colSpan", t.colspan);
    } else if (!t.isBand && t.visibleWidth !== "auto" && this.option("columnAutoWidth")) {
      if (t.width || t.minWidth) {
        i.style.minWidth = A(t.minWidth || t.width);
      }
      if (t.width) {
        P(i, t, A(t.width));
      }
    }
    return a;
  };
  S._createRow = function (e, t) {
    t = t || "tr";
    var n = (0, s.default)(`<${t}>`).addClass("dx-row");
    this.setAria("role", "row", n);
    return n;
  };
  S._isAltRow = function (e) {
    return e && e.dataIndex % 2 == 1;
  };
  S._createTable = function (e, t) {
    var n = this;
    var i = (0, s.default)("<table>").addClass(n.addWidgetPrefix("table")).addClass(n.addWidgetPrefix("table-fixed"));
    if (e && !t) {
      i.append(n._createColGroup(e));
      if (l.default.safari) {
        i.append((0, s.default)("<thead>").append("<tr>"));
      }
    } else {
      n.setAria("hidden", true, i);
    }
    this.setAria("role", "presentation", (0, s.default)("<tbody>").appendTo(i));
    if (t) {
      return i;
    }
    if (l.default.mozilla) {
      b.default.on(i, "mousedown", "td", function (e) {
        if (e.ctrlKey) {
          e.preventDefault();
        }
      });
    }
    if (n.option("cellHintEnabled")) {
      b.default.on(i, "mousemove", ".dx-row > td", this.createAction(function (e) {
        var t = e.event;
        var i = (0, s.default)(t.target);
        var o = (0, s.default)(t.currentTarget);
        var a = o.parent();
        var r = n._columnsController.getVisibleColumns();
        var l = a.data("options");
        var u = o.index();
        var d = l && l.cells && l.cells[u];
        var c = d ? d.column : r[u];
        var h = a.hasClass("dx-header-row");
        var f = a.hasClass("dx-data-row");
        var p = a.hasClass("dx-master-detail-row");
        var g = a.hasClass("dx-group-row");
        var m = a.hasClass(n.addWidgetPrefix("filter-row"));
        var v = f && (!c || c.cellTemplate);
        var y = f && d && (l.isEditing || d.isEditing || (c == null ? undefined : c.showEditorAlways));
        var b = h && (!c || c.headerCellTemplate);
        var x = g && (!c || c.groupIndex && c.groupCellTemplate);
        if (!p && !m && !y && !v && !b && !x) {
          if (i.data("dxCellHintVisible")) {
            i.removeAttr("title");
            i.data("dxCellHintVisible", false);
          }
          if (i[0].scrollWidth - i[0].clientWidth > 0 && !(0, _.isDefined)(i.attr("title"))) {
            i.attr("title", i.text());
            i.data("dxCellHintVisible", true);
          }
        }
      }));
    }
    function o(e) {
      var t = (0, s.default)(e.currentTarget);
      var i = (0, s.default)(e.target).closest(`.dx-field-item-content`);
      var o = t.parent();
      var r = o.data("options");
      var l = r && r.cells && r.cells[t.index()];
      if (t.closest("table").is(e.delegateTarget)) {
        var u = (0, c.extend)({}, l, {
          cellElement: (0, a.getPublicElement)(t),
          event: e,
          eventType: e.type
        });
        u.rowIndex = n.getRowIndex(o);
        if (i.length) {
          var d = i.data("dx-form-item");
          if (d.column) {
            u.column = d.column;
            u.columnIndex = n._columnsController.getVisibleIndex(u.column.index);
          }
        }
        return u;
      }
    }
    b.default.on(i, "mouseover", ".dx-row > td", function (e) {
      var t = o(e);
      if (t) {
        n.executeAction("onCellHoverChanged", t);
      }
    });
    b.default.on(i, "mouseout", ".dx-row > td", function (e) {
      var t = o(e);
      if (t) {
        n.executeAction("onCellHoverChanged", t);
      }
    });
    b.default.on(i, y.name, ".dx-row > td", function (e) {
      var t = o(e);
      if (t) {
        n.executeAction("onCellClick", t);
      }
    });
    b.default.on(i, x.name, ".dx-row > td", function (e) {
      var t = o(e);
      if (t) {
        n.executeAction("onCellDblClick", t);
      }
    });
    (function (e, t) {
      var n;
      var i;
      var o;
      function r(e) {
        return setTimeout(function () {
          n = i = null;
        }, e);
      }
      b.default.on(t, "touchstart touchend", ".dx-row", function (e) {
        clearTimeout(o);
        if (e.type === "touchstart") {
          n = e.target;
          i = e.currentTarget;
          o = r(1000);
        } else {
          o = r();
        }
      });
      b.default.on(t, [y.name, x.name, w.default.down].join(" "), ".dx-row", e.createAction(function (t) {
        var o = t.event;
        if (n) {
          o.target = n;
          o.currentTarget = i;
        }
        if (!(0, s.default)(o.target).closest("a").length) {
          t.rowIndex = e.getRowIndex(o.currentTarget);
          if (t.rowIndex >= 0) {
            t.rowElement = (0, a.getPublicElement)((0, s.default)(o.currentTarget));
            t.columns = e.getColumns();
            if (o.type === w.default.down) {
              e._rowPointerDown(t);
            } else if (o.type === y.name) {
              e._rowClick(t);
            } else {
              e._rowDblClick(t);
            }
          }
        }
      }));
    })(n, i);
    return i;
  };
  S._rowPointerDown = function () {};
  S._rowClick = function () {};
  S._rowDblClick = function () {};
  S._createColGroup = function (e) {
    var t = (0, s.default)("<colgroup>");
    for (var n = 0; n < e.length; n++) {
      for (var i = e[n].colspan || 1, o = 0; o < i; o++) {
        t.append(this._createCol(e[n]));
      }
    }
    return t;
  };
  S._createCol = function (e) {
    var t = e.visibleWidth || e.width;
    if (t === "adaptiveHidden") {
      t = "0.0001px";
    }
    var n = (0, s.default)("<col>");
    (0, g.setWidth)(n, t);
    return n;
  };
  S.renderDelayedTemplates = function (e) {
    var t = this._delayedTemplates;
    var n = t.filter(function (e) {
      return !e.async;
    });
    var i = t.filter(function (e) {
      return e.async;
    });
    this._delayedTemplates = [];
    this._renderDelayedTemplatesCore(n, false, e);
    this._renderDelayedTemplatesCoreAsync(i);
  };
  S._renderDelayedTemplatesCoreAsync = function (e) {
    var t = this;
    if (e.length) {
      var n = (0, v.getWindow)().setTimeout(function () {
        t._templateTimeouts.delete(n);
        t._renderDelayedTemplatesCore(e, true);
      });
      this._templateTimeouts.add(n);
    }
  };
  S._renderDelayedTemplatesCore = function (e, t, n) {
    var i = new Date();
    while (e.length) {
      var a = e.shift();
      var r = a.options;
      var l = o.default.getRootNode((0, s.default)(r.container).get(0));
      var u = this.needWaitAsyncTemplates();
      if (!t || (0, s.default)(r.container).closest(l).length || u) {
        if (n) {
          r.change = n;
        }
        a.template.render(r);
      }
      if (t && new Date() - i > 30) {
        this._renderDelayedTemplatesCoreAsync(e);
        break;
      }
    }
    if (!e.length && this._delayedTemplates.length) {
      this.renderDelayedTemplates();
    }
  };
  S._processTemplate = function (e, t) {
    var n;
    if (e && e.render && !(0, _.isRenderer)(e)) {
      n = {
        allowRenderToDetachedContainer: e.allowRenderToDetachedContainer,
        render: function (t) {
          e.render(t.container, t.model, t.change);
          if (t.deferred) {
            t.deferred.resolve();
          }
        }
      };
    } else if ((0, _.isFunction)(e)) {
      n = {
        render: function (t) {
          var n = e((0, a.getPublicElement)(t.container), t.model, t.change);
          if (n && (n.nodeType || (0, _.isRenderer)(n))) {
            t.container.append(n);
          }
          if (t.deferred) {
            t.deferred.resolve();
          }
        }
      };
    } else {
      var i = (0, _.isString)(e) ? e : (0, s.default)(e).attr("id");
      if (i) {
        this._templatesCache[i] ||= this.getTemplate(e);
        n = this._templatesCache[i];
      } else {
        n = this.getTemplate(e);
      }
    }
    return n;
  };
  S.renderTemplate = function (e, t, n, i, o) {
    var r = this;
    var s = this._processTemplate(t, n);
    var l = n.column;
    var u = n.rowType === "data";
    var c = new d.Deferred();
    var h = {
      container: e,
      model: n,
      deferred: c,
      onRendered: function () {
        if (r.isDisposed()) {
          c.reject();
        } else {
          c.resolve();
        }
      }
    };
    if (s) {
      n.component = this.component;
      var f = l && (l.renderAsync && u || this.option("renderAsync") && (l.renderAsync !== false && (l.command || l.showEditorAlways) && u || n.rowType === "filter"));
      var p = n.renderAsync ?? f;
      if (!s.allowRenderToDetachedContainer && !i || p) {
        this._delayedTemplates.push({
          template: s,
          options: h,
          async: p
        });
      } else {
        s.render(h);
      }
      this._templateDeferreds.add(c);
      b.default.on(e, C.removeEvent, M.bind(null, c));
    } else {
      c.reject();
    }
    return c.promise().always(function () {
      r._templateDeferreds.delete(c);
    });
  };
  S._getBodies = function (e) {
    return (0, s.default)(e).children("tbody").not(".dx-header").not(".dx-footer");
  };
  S._needWrapRow = function (e) {
    var t;
    return !!this.option().rowTemplate && !!((t = this._getBodies(e)) === null || t === undefined ? undefined : t.filter(`.dx-row`).length);
  };
  S._wrapRowIfNeed = function (e, t, n) {
    var i = n ? e || this._tableElement : this._tableElement || e;
    if (this._needWrapRow(i)) {
      var o = (0, s.default)("<tbody>").addClass(t.attr("class"));
      this.setAria("role", "presentation", o);
      return o.append(t);
    }
    return t;
  };
  S._appendRow = function (e, t, n) {
    (n = n || O).render({
      content: t,
      container: e
    });
  };
  S._resizeCore = function () {
    var e = this._scrollLeft;
    if (e >= 0) {
      this._scrollLeft = 0;
      this.scrollTo({
        left: e
      });
    }
  };
  S._renderCore = function (e) {
    var t = this.element().parent();
    if (!t || !!t.parent().length) {
      this.renderDelayedTemplates(e);
    }
  };
  S._renderTable = function (e) {
    (e = e || {}).columns = this._columnsController.getVisibleColumns();
    var t = e.change && e.change.changeType;
    var n = this._createTable(e.columns, t === "append" || t === "prepend" || t === "update");
    this._renderRows(n, e);
    return n;
  };
  S._renderRows = function (e, t) {
    for (var n = this._getRows(t.change), i = t.change && t.change.columnIndices || [], o = t.change && t.change.changeTypes || [], a = 0; a < n.length; a++) {
      this._renderRow(e, (0, c.extend)({
        row: n[a],
        columnIndices: i[a],
        changeType: o[a]
      }, t));
    }
  };
  S._renderRow = function (e, t) {
    if (!t.columnIndices) {
      t.row.cells = [];
    }
    var n = this._createRow(t.row);
    var i = this._wrapRowIfNeed(e, n);
    if (t.changeType !== "remove") {
      this._renderCells(n, t);
    }
    this._appendRow(e, i);
    var o = (0, c.extend)({
      columns: t.columns
    }, t.row);
    this._addWatchMethod(o, t.row);
    this._rowPrepared(i, o, t.row);
  };
  S._needRenderCell = function (e, t) {
    return !t || t.indexOf(e) >= 0;
  };
  S._renderCells = function (e, t) {
    var n = 0;
    var i = t.row;
    for (var o = t.columns, a = 0; a < o.length; a++) {
      if (this._needRenderCell(a, t.columnIndices)) {
        this._renderCell(e, (0, c.extend)({
          column: o[a],
          columnIndex: n,
          value: i.values && i.values[n],
          oldValue: i.oldValues && i.oldValues[n]
        }, t));
      }
      if (o[a].colspan > 1) {
        n += o[a].colspan;
      } else {
        n++;
      }
    }
  };
  S._updateCells = function (e, t, n) {
    var i = e.children();
    var o = t.children();
    var a = this.option("highlightChanges");
    var r = this.addWidgetPrefix("cell-updated-animation");
    n.forEach(function (e, t) {
      var n = i.eq(e);
      var s = o.eq(t);
      n.replaceWith(s);
      if (a && !s.hasClass("dx-command-expand")) {
        s.addClass(r);
      }
    });
    (function (e, t) {
      if (e && t) {
        var n;
        var i = e.attributes;
        var o = t.attributes;
        for (n = 0; n < i.length; n++) {
          var a = i[n].nodeName;
          if (!t.hasAttribute(a)) {
            e.removeAttribute(a);
          }
        }
        for (n = 0; n < o.length; n++) {
          e.setAttribute(o[n].nodeName, o[n].nodeValue);
        }
      }
    })(e.get(0), t.get(0));
  };
  S._setCellAriaAttributes = function (e, t) {
    if (t.rowType !== "freeSpace") {
      this.setAria("role", "gridcell", e);
      var n = this._columnsController.getColumnIndexOffset();
      var i = t.columnIndex + n + 1;
      this.setAria("colindex", i, e);
    }
  };
  S._renderCell = function (e, t) {
    var n = this._getCellOptions(t);
    if (t.columnIndices) {
      if (t.row.cells) {
        var i = t.row.cells.findIndex(function (e) {
          return e.columnIndex === n.columnIndex;
        });
        t.row.cells[i] = n;
      }
    } else {
      t.row.cells.push(n);
    }
    var o = this._createCell(n);
    this._setCellAriaAttributes(o, n);
    this._renderCellContent(o, n, t);
    e.get(0).appendChild(o.get(0));
    return o;
  };
  S._renderCellContent = function (e, t, n) {
    var i = this;
    var o = this._getCellTemplate(t);
    (0, d.when)(!o || this.renderTemplate(e, o, t, undefined, n.change)).done(function () {
      i._updateCell(e, t);
    });
  };
  S._getCellTemplate = function (e) {};
  S._getRows = function (e) {
    return [];
  };
  S._getCellOptions = function (e) {
    var t = {
      column: e.column,
      columnIndex: e.columnIndex,
      rowType: e.row.rowType,
      isAltRow: this._isAltRow(e.row)
    };
    this._addWatchMethod(t);
    return t;
  };
  S._addWatchMethod = function (e, t) {
    if (this.option("repaintChangesOnly")) {
      var n = [];
      (t = t || e).watch = t.watch || function (e, i, o) {
        var a = e(t.data);
        function r(n) {
          if (n && o) {
            o(n);
          }
          var r = e(t.data);
          if (JSON.stringify(a) !== JSON.stringify(r)) {
            if (n) {
              i(r);
            }
            a = r;
          }
        }
        n.push(r);
        return function () {
          var e = n.indexOf(r);
          if (e >= 0) {
            n.splice(e, 1);
          }
        };
      };
      t.update = t.update || function (t, i) {
        if (t) {
          this.data = e.data = t.data;
          this.rowIndex = e.rowIndex = t.rowIndex;
          this.dataIndex = e.dataIndex = t.dataIndex;
          this.isExpanded = e.isExpanded = t.isExpanded;
          if (e.row && !i) {
            e.row = t;
          }
        }
        n.forEach(function (e) {
          e(t);
        });
      };
      if (t !== e) {
        e.watch = t.watch.bind(t);
      }
      return e;
    }
  };
  S._cellPrepared = function (e, t) {
    t.cellElement = (0, a.getPublicElement)((0, s.default)(e));
    this.executeAction("onCellPrepared", t);
  };
  S._rowPrepared = function (e, t, n) {
    (0, r.data)(e.get(0), "options", t);
    t.rowElement = (0, a.getPublicElement)(e);
    this.executeAction("onRowPrepared", t);
  };
  S._columnOptionChanged = function (e) {
    var t = e.optionNames;
    if (D.default.checkChanges(t, ["width", "visibleWidth"])) {
      var n = this._columnsController.getVisibleColumns();
      var i = h.map(n, function (e) {
        var t = e.visibleWidth || e.width;
        if ((0, _.isDefined)(t)) {
          return t;
        } else {
          return "auto";
        }
      });
      this.setColumnWidths({
        widths: i,
        optionNames: t
      });
    } else if (!this._requireReady) {
      this.render();
    }
  };
  S.getCellIndex = function (e) {
    if (e.length) {
      return e[0].cellIndex;
    } else {
      return -1;
    }
  };
  S.getTableElements = function () {
    return this._tableElement || (0, s.default)();
  };
  S.getTableElement = function (e) {
    return this._tableElement;
  };
  S.setTableElement = function (e, t) {
    this._tableElement = e;
  };
  S.optionChanged = function (t) {
    e.prototype.optionChanged.call(this, t);
    switch (t.name) {
      case "cellHintEnabled":
      case "onCellPrepared":
      case "onRowPrepared":
      case "onCellHoverChanged":
        this._invalidate(true, true);
        t.handled = true;
    }
  };
  S.init = function () {
    var e = this;
    this._scrollLeft = -1;
    this._columnsController = this.getController("columns");
    this._dataController = this.getController("data");
    this._delayedTemplates = [];
    this._templateDeferreds = new Set();
    this._templatesCache = {};
    this._templateTimeouts = new Set();
    this.createAction("onCellClick");
    this.createAction("onRowClick");
    this.createAction("onCellDblClick");
    this.createAction("onRowDblClick");
    this.createAction("onCellHoverChanged", {
      excludeValidators: ["disabled", "readOnly"]
    });
    this.createAction("onCellPrepared", {
      excludeValidators: ["disabled", "readOnly"],
      category: "rendering"
    });
    this.createAction("onRowPrepared", {
      excludeValidators: ["disabled", "readOnly"],
      category: "rendering",
      afterExecute: function (t) {
        e._afterRowPrepared(t);
      }
    });
    this._columnsController.columnsChanged.add(this._columnOptionChanged.bind(this));
    if (this._dataController) {
      this._dataController.changed.add(this._handleDataChanged.bind(this));
    }
  };
  S._afterRowPrepared = function (e) {};
  S._handleDataChanged = function () {};
  S.callbackNames = function () {
    return ["scrollChanged"];
  };
  S._updateScrollLeftPosition = function () {
    var e = this._scrollLeft;
    if (e >= 0) {
      this._scrollLeft = 0;
      this.scrollTo({
        left: e
      });
    }
  };
  S.scrollTo = function (e) {
    var t = this.element();
    var n = t && t.children(`.${this.addWidgetPrefix("scroll-container")}`).not(`.${this.addWidgetPrefix("content-fixed")}`);
    if ((0, _.isDefined)(e) && (0, _.isDefined)(e.left) && this._scrollLeft !== e.left) {
      this._scrollLeft = e.left;
      if (n) {
        n.scrollLeft(e.left);
      }
    }
  };
  S._getContent = function (e) {
    var t;
    if ((t = this._tableElement) === null || t === undefined) {
      return undefined;
    } else {
      return t.parent();
    }
  };
  S._removeContent = function (e) {
    var t = this._getContent(e);
    if (t == null ? undefined : t.length) {
      t.remove();
    }
  };
  S._wrapTableInScrollContainer = function (e, t) {
    var n = this;
    var i = (0, s.default)("<div>");
    var o = this.option("scrolling.useNative");
    if (o === false || o === "auto" && !m.nativeScrolling) {
      i.addClass(this.addWidgetPrefix("scrollable-simulated"));
    }
    b.default.on(i, "scroll", function () {
      var e = i.scrollLeft();
      if (e !== n._scrollLeft) {
        n.scrollChanged.fire({
          left: e
        }, n.name);
      }
    });
    i.addClass(this.addWidgetPrefix("content")).addClass(this.addWidgetPrefix("scroll-container")).append(e).appendTo(this.element());
    this.setAria("role", "presentation", i);
    return i;
  };
  S.needWaitAsyncTemplates = function () {
    return this.option("templatesRenderAsynchronously") && this.option("renderAsync") === false;
  };
  S.waitAsyncTemplates = function () {
    var e = this;
    var t = arguments.length > 0 && arguments[0] !== undefined && arguments[0];
    var n = new d.Deferred();
    var i = t || this.needWaitAsyncTemplates();
    if (!i) {
      return n.resolve();
    }
    var o = function t() {
      return d.when.apply(e, Array.from(e._templateDeferreds)).done(function () {
        if (e.isDisposed()) {
          n.reject();
        } else if (e._templateDeferreds.size > 0) {
          t();
        } else {
          n.resolve();
        }
      }).fail(n.reject);
    };
    o();
    return n.promise();
  };
  S._updateContent = function (e, t, n) {
    var i = this;
    return this.waitAsyncTemplates().done(function () {
      i._removeContent(n);
      i.setTableElement(e, n);
      i._wrapTableInScrollContainer(e, n);
    });
  };
  S._findContentElement = function () {};
  S._getWidths = function (e) {
    var t;
    var n = [];
    if (e) {
      h.each(e, function (e, i) {
        t = i.offsetWidth;
        if (i.getBoundingClientRect) {
          var o = (0, f.getBoundingRect)(i);
          if (o.width > t - 1) {
            t = o.width;
          }
        }
        n.push(t);
      });
    }
    return n;
  };
  S.getColumnWidths = function (e) {
    var t;
    var n;
    var i = [];
    (this.option("forceApplyBindings") || u.noop)();
    if (e = e || this.getTableElement()) {
      t = e.children("tbody:not(.dx-header)").children();
      for (var o = 0; o < t.length; o++) {
        var a = t.eq(o);
        var r = a.get(0).style.display !== "none" && !a.hasClass("dx-state-invisible");
        if (!a.is(`.dx-group-row`) && !a.is(`.dx-master-detail-row`) && !a.is(`.dx-error-row`) && r) {
          n = a.children("td");
          break;
        }
      }
      i = this._getWidths(n);
    }
    return i;
  };
  S.getVisibleColumnIndex = function (e, t) {
    return e;
  };
  S.setColumnWidths = function (e) {
    var t;
    var n;
    var i;
    var o;
    var a = e.widths;
    var r = e.$tableElement;
    var s = e.columns;
    var l = e.fixed;
    var u = this.option("columnAutoWidth");
    if ((r = r || this.getTableElement()) && r.length && a) {
      o = 0;
      t = r.children("colgroup").children("col");
      (0, g.setWidth)(t, "auto");
      s = s || this.getColumns(null, r);
      for (var d = 0; d < s.length; d++) {
        if (u && !l && (n = s[d].width) && !s[d].command) {
          n = s[d].visibleWidth || n;
          n = A(n);
          i = A(s[d].minWidth || n);
          for (var c = c || r.children().children(".dx-row").not(`.dx-master-detail-row`), h = 0; h < c.length; h++) {
            var f = c[h];
            var p = undefined;
            var m = this.getVisibleColumnIndex(d, h);
            if (p = f.classList.contains("dx-group-row") ? f.querySelector(`td[aria-colindex='${m + 1}']:not(.dx-group-cell)`) : f.cells[m]) {
              P(p, s[d], n);
              p.style.minWidth = i;
            }
          }
        }
        if (s[d].colspan) {
          o += s[d].colspan;
        } else {
          if ((n = a[o]) === "adaptiveHidden") {
            n = "0.0001px";
          }
          if (typeof n == "number") {
            n = `${n.toFixed(3)}px`;
          }
          (0, g.setWidth)(t.eq(o), (0, _.isDefined)(n) ? n : "auto");
          o++;
        }
      }
    }
  };
  S.getCellElements = function (e) {
    return this._getCellElementsCore(e);
  };
  S._getCellElementsCore = function (e) {
    if (!(e < 0)) {
      return this._getRowElements().eq(e).children();
    }
  };
  S._getCellElement = function (e, t) {
    var n = this.getCellElements(e);
    var i = this._getVisibleColumnIndex(n, e, t);
    if ((n == null ? undefined : n.length) && !(i < 0)) {
      var o = n.eq(i);
      if (o.length > 0) {
        return o;
      } else {
        return undefined;
      }
    }
  };
  S._getRowElement = function (e) {
    var t = this;
    var n = (0, s.default)();
    var i = t.getTableElements();
    h.each(i, function (i, o) {
      n = n.add(t._getRowElements((0, s.default)(o)).eq(e));
    });
    if (n.length) {
      return n;
    }
  };
  S.getCellElement = function (e, t) {
    var n = this._getCellElement(e, t);
    if (n) {
      return (0, a.getPublicElement)(n);
    }
  };
  S.getRowElement = function (e) {
    var t = this._getRowElement(e);
    var n = [];
    if (t && !(0, a.getPublicElement)(t).get) {
      for (var i = 0; i < t.length; i++) {
        n.push(t[i]);
      }
    } else {
      n = t;
    }
    return n;
  };
  S._getVisibleColumnIndex = function (e, t, n) {
    if ((0, _.isString)(n)) {
      var i = this._columnsController.columnOption(n, "index");
      return this._columnsController.getVisibleIndex(i);
    }
    return n;
  };
  S.getColumnElements = function () {};
  S.getColumns = function (e, t) {
    return this._columnsController.getVisibleColumns(e);
  };
  S.getCell = function (e, t, n) {
    var i;
    var o = t || this._getRowElements();
    if (o.length > 0 && e.rowIndex >= 0 && (this.option("scrolling.mode") !== "virtual" && this.option("scrolling.rowRenderingMode") !== "virtual" && (e.rowIndex = e.rowIndex < o.length ? e.rowIndex : o.length - 1), ((i = n || this.getCellElements(e.rowIndex)) == null ? undefined : i.length) > 0)) {
      return i.eq(i.length > e.columnIndex ? e.columnIndex : i.length - 1);
    }
  };
  S.getRowsCount = function () {
    var e = this.getTableElement();
    if (e && e.length === 1) {
      return e[0].rows.length;
    } else {
      return 0;
    }
  };
  S._getRowElementsCore = function (e) {
    if (e = e || this.getTableElement()) {
      var t = (this.option().rowTemplate || this.option("dataRowTemplate")) && e.find(`> tbody.dx-row`);
      if (t && t.length) {
        return t;
      } else {
        return e.find(`> tbody > .dx-row, > .dx-row`);
      }
    }
    return (0, s.default)();
  };
  S._getRowElements = function (e) {
    return this._getRowElementsCore(e);
  };
  S.getRowIndex = function (e) {
    return this._getRowElements().index(e);
  };
  S.getBoundingRect = function () {};
  S.getName = function () {};
  S.setScrollerSpacing = function (e) {
    var t = this.element();
    var n = this.option("rtlEnabled");
    if (t) {
      t.css({
        paddingLeft: n ? e : "",
        paddingRight: n ? "" : e
      });
    }
  };
  S.isScrollbarVisible = function (e) {
    var t = this.element();
    var n = this._tableElement;
    return !!t && !!n && (e ? (0, p.getOuterWidth)(n) - (0, p.getWidth)(t) > 0 : (0, p.getOuterHeight)(n) - (0, p.getHeight)(t) > 0);
  };
  S.isDisposed = function () {
    return this.component?._disposed;
  };
  S.dispose = function () {
    var e;
    var t;
    if ((0, v.hasWindow)()) {
      var n = (0, v.getWindow)();
      if ((e = this._templateTimeouts) !== null && e !== undefined) {
        e.forEach(function (e) {
          return n.clearTimeout(e);
        });
      }
      if ((t = this._templateTimeouts) !== null && t !== undefined) {
        t.clear();
      }
    }
  };
  return i;
}(k.default.View.inherit(S.default));
exports.ColumnsView = R;