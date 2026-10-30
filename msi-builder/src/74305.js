Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getRealElementWidth = exports.default = exports.AreaItem = undefined;
var i = f(require("./38377.js"));
var o = f(require("./73349.js"));
var a = require("./6415.js");
var r = f(require("./68374.js"));
var s = require("./13306.js");
var l = require("./37518.js");
var u = require("./58664.js");
var d = require("./80968.js");
var c = require("./35922.js");
var h = require("./41672.js");
function f(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
function p() {
  return (p = Object.assign ? Object.assign.bind() : function (e) {
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
function g(e) {
  var t = 0;
  var n = e.offsetWidth;
  if (e.getBoundingClientRect) {
    var i = (0, l.getBoundingRect)(e);
    if (!(t = i.width)) {
      t = i.right - i.left;
    }
    if (t <= n - 1) {
      t = n;
    }
  }
  if (t > 0) {
    return t;
  } else {
    return n;
  }
}
function m(e, t, n, i) {
  var o = 0;
  var a = 0;
  var r = n / 2;
  if (e + i - (t + n) > 1) {
    if (e >= t + n + r) {
      a = parseInt((e - (t + n)) / r, 10);
    }
    o = t + n + r * a;
  } else if (e < t) {
    if (e <= t - r) {
      a = parseInt((e - (t - r)) / r, 10);
    }
    o = t - (n - r * a);
  } else {
    o = t;
  }
  return o;
}
exports.getRealElementWidth = g;
var _ = i.default.inherit({
  ctor: function (e) {
    this.component = e;
  },
  option: function () {
    return this.component.option.apply(this.component, arguments);
  },
  _getRowElement: function (e) {
    if (this._tableElement && this._tableElement.length > 0) {
      return this._tableElement[0].rows[e];
    } else {
      return null;
    }
  },
  _createGroupElement: function () {
    return (0, r.default)("<div>");
  },
  _createTableElement: function () {
    return (0, r.default)("<table>");
  },
  _getCellText: function (e, t) {
    var n = e.isWhiteSpace ? "&nbsp" : e.text || "&nbsp";
    if (!!t && (n.indexOf("<") !== -1 || n.indexOf(">") !== -1)) {
      n = (0, r.default)("<div>").text(n).html();
    }
    return n;
  },
  _getRowClassNames: function () {},
  _applyCustomStyles: function (e) {
    if (e.cell.width) {
      e.cssArray.push(`min-width:${e.cell.width}px`);
    }
    if (e.cell.sorted) {
      e.classArray.push("dx-pivotgrid-sorted");
    }
  },
  _getMainElementMarkup: function () {
    return o.default.createElement("tbody");
  },
  _getCloseMainElementMarkup: function () {
    return "</tbody>";
  },
  _renderTableContent: function (e, t) {
    var n;
    var i;
    var a;
    var r;
    var s;
    var l;
    var u = t.length;
    var h = this.option("rtlEnabled");
    var f = this.option("encodeHtml");
    e.data("area", this._getAreaName());
    e.data("data", t);
    e.css("width", "");
    var p = this._getMainElementMarkup();
    for (a = 0; a < u; a += 1) {
      n = t[a];
      l = [];
      var g = o.default.createElement("tr");
      for (r = 0; r < n.length; r += 1) {
        i = n[r];
        this._getRowClassNames(a, i, l);
        var m = o.default.createElement("td");
        if (i) {
          if (i.rowspan) {
            m.setAttribute("rowspan", i.rowspan || 1);
          }
          if (i.colspan) {
            m.setAttribute("colspan", i.colspan || 1);
          }
          var _ = {
            cellElement: undefined,
            cell: i,
            cellsCount: n.length,
            cellIndex: r,
            rowElement: undefined,
            rowIndex: a,
            rowsCount: u,
            rtlEnabled: h,
            classArray: [],
            cssArray: []
          };
          this._applyCustomStyles(_);
          if (_.cssArray.length) {
            (0, d.setStyle)(m, _.cssArray.join(";"));
          }
          if (_.classArray.length) {
            m.setAttribute("class", _.classArray.join(" "));
          }
          if ((0, c.isDefined)(i.expanded)) {
            var v = o.default.createElement("div");
            v.classList.add("dx-expand-icon-container");
            var y = o.default.createElement("span");
            y.classList.add("dx-expand");
            v.appendChild(y);
            m.appendChild(v);
          }
          s = this._getCellText(i, f);
        } else {
          s = "";
        }
        var b = o.default.createElement("span");
        if ((0, c.isDefined)(i.wordWrapEnabled)) {
          b.style.whiteSpace = i.wordWrapEnabled ? "normal" : "nowrap";
        }
        b.innerHTML = s;
        m.appendChild(b);
        if (i.sorted) {
          var x = o.default.createElement("span");
          x.classList.add("dx-icon-sorted");
          m.appendChild(x);
        }
        g.appendChild(m);
      }
      if (l.length) {
        g.setAttribute("class", l.join(" "));
      }
      p.appendChild(g);
    }
    e.append(p);
    this._triggerOnCellPrepared(e, t);
  },
  _triggerOnCellPrepared: function (e, t) {
    var n;
    var i;
    var o;
    var r;
    var l;
    var u;
    var d;
    var c = e.find("tr");
    var h = this._getAreaName();
    var f = this.option("onCellPrepared");
    var p = this.component._eventsStrategy.hasEvent("cellPrepared");
    var g = this.component._defaultActionArgs();
    if (f || p) {
      for (u = 0; u < t.length; u += 1) {
        r = t[u];
        n = c.eq(u);
        d = 0;
        for (; d < r.length; d += 1) {
          l = r[d];
          i = n.children().eq(d);
          o = {
            area: h,
            rowIndex: u,
            columnIndex: d,
            cellElement: (0, a.getPublicElement)(i),
            cell: l
          };
          if (p) {
            this.component._trigger("onCellPrepared", o);
          } else {
            f((0, s.extend)(o, g));
          }
        }
      }
    }
  },
  _getRowHeight: function (e) {
    var t = this._getRowElement(e);
    var n = 0;
    var i = t.offsetHeight;
    if (t && t.lastChild) {
      if (t.getBoundingClientRect) {
        if ((n = (0, l.getBoundingRect)(t).height) <= i - 1) {
          n = i;
        }
      }
      if (n > 0) {
        return n;
      } else {
        return i;
      }
    }
    return 0;
  },
  _setRowHeight: function (e, t) {
    var n = this._getRowElement(e);
    if (n) {
      n.style.height = `${t}px`;
    }
  },
  getRowsLength: function () {
    if (this._tableElement && this._tableElement.length > 0) {
      return this._tableElement[0].rows.length;
    } else {
      return 0;
    }
  },
  getRowsHeight: function () {
    var e = [];
    for (var t = this.getRowsLength(), n = 0; n < t; n += 1) {
      e.push(this._getRowHeight(n));
    }
    return e;
  },
  setRowsHeight: function (e) {
    var t = 0;
    for (var n = e.length, i = 0; i < n; i += 1) {
      t += e[i];
      this._setRowHeight(i, e[i]);
    }
    this._tableHeight = t;
    this._tableElement[0].style.height = `${t}px`;
  },
  getColumnsWidth: function () {
    var e;
    var t;
    var n;
    var i;
    var o = this.getRowsLength();
    var a = [];
    var r = [];
    function s(e, t, n, i, o) {
      var a;
      var r;
      for (a = 0; a < i; a += 1) {
        for (r = 0; r < o; r += 1) {
          e[t + a] = e[t + a] || [];
          e[t + a][n + r] = true;
        }
      }
    }
    if (o) {
      for (e = 0; e < o; e += 1) {
        a[e] = a[e] || [];
        t = this._getRowElement(e);
        n = 0;
        for (; n < t.cells.length; n += 1) {
          for (i = 0; a[e][i]; i += 1);
          s(a, e, i, t.cells[n].rowSpan, t.cells[n].colSpan);
          if (t.cells[n].colSpan === 1) {
            r[i] = r[i] || g(t.cells[n]);
          }
        }
      }
    }
    return r;
  },
  setColumnsWidth: function (e) {
    var t;
    var n = this._tableElement[0];
    this._colgroupElement.html("");
    var i = this.getColumnsCount();
    var a = [];
    for (t = 0; t < i; t += 1) {
      a.push(e[t] || 0);
    }
    for (t = i; t < e.length && e; t += 1) {
      a[i - 1] += e[t];
    }
    for (t = 0; t < i; t += 1) {
      var r = o.default.createElement("col");
      r.style.width = `${a[t]}px`;
      this._colgroupElement.append(r);
    }
    this._tableWidth = a.reduce(function (e, t) {
      return e + t;
    }, 0);
    n.style.width = `${this._tableWidth}px`;
    n.style.tableLayout = "fixed";
  },
  resetColumnsWidth: function () {
    (0, u.setWidth)(this._colgroupElement.find("col"), "auto");
    this._tableElement.css({
      width: "",
      tableLayout: ""
    });
  },
  setGroupWidth: function (e) {
    this._getScrollable().option("width", e);
  },
  setGroupHeight: function (e) {
    this._getScrollable().option("height", e);
  },
  getGroupHeight: function () {
    return this._getGroupElementSize("height");
  },
  getGroupWidth: function () {
    return this._getGroupElementSize("width");
  },
  _getGroupElementSize: function (e) {
    var t = this.groupElement()[0].style[e];
    if (t.indexOf("px") > 0) {
      return parseFloat(t);
    } else {
      return null;
    }
  },
  groupElement: function () {
    return this._groupElement;
  },
  tableElement: function () {
    return this._tableElement;
  },
  element: function () {
    return this._rootElement;
  },
  headElement: function () {
    return this._tableElement.find("thead");
  },
  _setTableCss: function (e) {
    if (this.option("rtlEnabled")) {
      e.right = e.left;
      delete e.left;
    }
    this.tableElement().css(e);
  },
  setVirtualContentParams: function (e) {
    this._virtualContent.css({
      width: e.width,
      height: e.height
    });
    var t = this._getScrollable();
    if (t == null ? undefined : t.isRenovated()) {
      this._getScrollable().option("classes", "dx-virtual-mode");
    } else {
      this.groupElement().addClass("dx-virtual-mode");
    }
  },
  disableVirtualMode: function () {
    var e = this._getScrollable();
    if (e == null ? undefined : e.isRenovated()) {
      this._getScrollable().option("classes", "");
    } else {
      this.groupElement().removeClass("dx-virtual-mode");
    }
  },
  _renderVirtualContent: function () {
    if (!this._virtualContent && this.option("scrolling.mode") === "virtual") {
      this._virtualContent = (0, r.default)("<div>").addClass("dx-virtual-content").insertBefore(this._tableElement);
    }
  },
  reset: function () {
    var e = this._tableElement[0];
    if (this._fakeTable) {
      this._fakeTable.detach();
    }
    this._fakeTable = null;
    this.disableVirtualMode();
    this.setGroupWidth("100%");
    this.setGroupHeight("auto");
    this.resetColumnsWidth();
    if (e) {
      for (var t = 0; t < e.rows.length; t += 1) {
        e.rows[t].style.height = "";
      }
      e.style.height = "";
      e.style.width = "100%";
    }
  },
  _updateFakeTableVisibility: function () {
    var e = this.tableElement()[0];
    var t = this.option("rtlEnabled") ? "right" : "left";
    var n = this._fakeTable[0];
    if (e.style.top === n.style.top && n.style[t] === e.style[t]) {
      this._fakeTable.addClass("dx-hidden");
    } else {
      this._fakeTable.removeClass("dx-hidden");
    }
  },
  _moveFakeTableHorizontally: function (e) {
    var t = this.option("rtlEnabled") ? "right" : "left";
    var n = m(e, parseFloat(this.tableElement()[0].style[t]), this._tableWidth, this.getGroupWidth());
    if (parseFloat(this._fakeTable[0].style[t]) !== n) {
      this._fakeTable[0].style[t] = `${n}px`;
    }
  },
  _moveFakeTableTop: function (e) {
    var t = m(e, parseFloat(this.tableElement()[0].style.top), this._tableHeight, this.getGroupHeight());
    if (parseFloat(this._fakeTable[0].style.top) !== t) {
      this._fakeTable[0].style.top = `${t}px`;
    }
  },
  _moveFakeTable: function () {
    this._updateFakeTableVisibility();
  },
  _createFakeTable: function () {
    this._fakeTable ||= this.tableElement().clone().addClass("dx-pivot-grid-fake-table").appendTo(this._virtualContent);
  },
  render: function (e, t) {
    if (this._tableElement) {
      try {
        this._tableElement[0].innerHTML = "";
      } catch (e) {
        this._tableElement.empty();
      }
      this._tableElement.attr("style", "");
    } else {
      this._groupElement = this._createGroupElement();
      this._tableElement = this._createTableElement();
      this._tableElement.appendTo(this._groupElement);
      this._groupElement.appendTo(e);
      this._rootElement = e;
    }
    this._colgroupElement = (0, r.default)("<colgroup>").appendTo(this._tableElement);
    this._renderTableContent(this._tableElement, t);
    this._renderVirtualContent();
  },
  _getScrollable: function () {
    return this.groupElement().data("dxScrollable");
  },
  _getMemoizeScrollTo: function () {
    var t = this;
    this._memoizeScrollTo = this._memoizeScrollTo ?? (0, h.getMemoizeScrollTo)(function () {
      return t._getScrollable();
    });
    return this._memoizeScrollTo;
  },
  _getMaxLeftOffset: function (e) {
    var t = (0, r.default)(e.container()).get(0);
    return t.scrollWidth - t.clientWidth;
  },
  on: function (e, t) {
    var n = this;
    var i = n._getScrollable();
    if (i) {
      i.on(e, function (e) {
        if (n.option("rtlEnabled") && (0, c.isDefined)(e.scrollOffset.left)) {
          e.scrollOffset.left = n._getMaxLeftOffset(i) - e.scrollOffset.left;
        }
        t(e);
      });
    }
    return this;
  },
  off: function (e) {
    var t = this._getScrollable();
    if (t) {
      t.off(e);
    }
    return this;
  },
  scrollTo: function (e, t = false) {
    var n = this._getScrollable();
    if (n) {
      var i = this.option("rtlEnabled");
      var o = this._getAreaName();
      var a = p(p({}, e), {
        left: !i || o !== "column" && o !== "data" ? e.left : this._getMaxLeftOffset(n) - e.left
      });
      var r = this._getMemoizeScrollTo();
      r(a, t);
      if (this._virtualContent) {
        this._createFakeTable();
        this._moveFakeTable(e);
      }
    }
  },
  updateScrollable: function () {
    var e = this._getScrollable();
    if (e) {
      return e.update();
    }
  },
  getColumnsCount: function () {
    var e;
    var t = 0;
    var n = this._getRowElement(0);
    if (n) {
      for (var i = 0, o = (e = n.cells).length; i < o; ++i) {
        t += e[i].colSpan;
      }
    }
    return t;
  },
  getData: function () {
    var e = this._tableElement;
    if (e) {
      return e.data("data");
    } else {
      return [];
    }
  }
});
exports.AreaItem = _;
var v = {
  AreaItem: _,
  getRealElementWidth: g
};
exports.default = v;