Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.VerticalHeadersArea = exports.HorizontalHeadersArea = undefined;
var i = d(require("./73349.js"));
var o = d(require("./68374.js"));
var a = require("./95479.js");
var r = require("./58664.js");
var s = require("./35922.js");
var l = d(require("./41183.js"));
var u = require("./74305.js");
function d(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
var c = !!l.default.IS_RENOVATED_WIDGET;
function h(e, t) {
  if (t) {
    var n = e.data().data;
    var i = t.parentNode.rowIndex;
    var o = t.cellIndex;
    return n[i] && n[i][o] && n[i][o].path;
  }
}
var f = u.AreaItem.inherit({
  ctor: function (e) {
    this.callBase(e);
    this._scrollBarWidth = 0;
  },
  _getAreaName: function () {
    return "column";
  },
  _getAreaClassName: function () {
    return "dx-pivotgrid-horizontal-headers";
  },
  _createGroupElement: function () {
    return (0, o.default)("<div>").addClass(this._getAreaClassName()).addClass("dx-pivotgrid-area");
  },
  _applyCustomStyles: function (e) {
    var t = e.cssArray;
    var n = e.cell;
    var i = e.rowsCount;
    var o = e.classArray;
    if (e.cellIndex === e.cellsCount - 1) {
      t.push(`${e.rtlEnabled ? "border-left:" : "border-right:"}0px`);
    }
    if (n.rowspan === i - e.rowIndex || e.rowIndex + 1 === i) {
      t.push("border-bottom-width:0px");
    }
    if (n.type === "T" || n.type === "GT") {
      o.push("dx-row-total");
    }
    if (e.cell.type === "T") {
      o.push("dx-total");
    }
    if (e.cell.type === "GT") {
      o.push("dx-grandtotal");
    }
    if ((0, s.isDefined)(n.expanded)) {
      o.push(n.expanded ? "dx-pivotgrid-expanded" : "dx-pivotgrid-collapsed");
    }
    this.callBase(e);
  },
  _getMainElementMarkup: function () {
    var e = i.default.createElement("thead");
    e.setAttribute("class", this._getAreaClassName());
    return e;
  },
  _getCloseMainElementMarkup: function () {
    return "</thead>";
  },
  setVirtualContentParams: function (e) {
    this.callBase(e);
    this._setTableCss({
      left: e.left,
      top: 0
    });
    this._virtualContentWidth = e.width;
  },
  hasScroll: function () {
    var e = this._virtualContent ? this._virtualContentWidth : this._tableWidth;
    var t = this.getGroupWidth();
    return !!t && !!e && e - t >= 1;
  },
  renderScrollable: function () {
    this._groupElement.dxScrollable({
      useNative: false,
      useSimulatedScrollbar: false,
      showScrollbar: "never",
      bounceEnabled: false,
      direction: "horizontal",
      rtlEnabled: !!c && this.component.option("rtlEnabled"),
      updateManually: true
    });
  },
  updateScrollableOptions: function (e) {
    var t = e.rtlEnabled;
    var n = this._getScrollable();
    if (c) {
      n.option({
        rtlEnabled: t
      });
    }
  },
  processScrollBarSpacing: function (e) {
    var t = this.option("rtlEnabled") ? "right" : "left";
    var n = this.getGroupWidth();
    if (n) {
      this.setGroupWidth(n - e);
    }
    if (this._scrollBarWidth) {
      this._groupElement.next().remove();
    }
    this._groupElement.toggleClass("dx-vertical-scroll", e > 0);
    (0, r.setWidth)(this._groupElement.css("float", t), this.getGroupHeight());
    this._scrollBarWidth = e;
  },
  getScrollPath: function (e) {
    var t;
    var n = this.tableElement();
    e -= parseInt(n[0].style.left, 10) || 0;
    (0, a.each)(n.find("td"), function (n, i) {
      if (i.colSpan === 1 && i.offsetLeft <= e && i.offsetWidth + i.offsetLeft > e) {
        t = i;
        return false;
      }
    });
    return h(n, t);
  },
  _moveFakeTable: function (e) {
    this._moveFakeTableHorizontally(e);
    this.callBase();
  }
});
exports.HorizontalHeadersArea = f;
var p = f.inherit({
  _getAreaClassName: function () {
    return "dx-pivotgrid-vertical-headers";
  },
  _applyCustomStyles: function (e) {
    this.callBase(e);
    if (e.cellIndex === e.cellsCount - 1) {
      e.classArray.push("dx-last-cell");
    }
    if (e.rowIndex === e.rowsCount - 1) {
      e.cssArray.push("border-bottom: 0px");
    }
    if (e.cell.isWhiteSpace) {
      e.classArray.push("dx-white-space-column");
    }
  },
  _getAreaName: function () {
    return "row";
  },
  setVirtualContentParams: function (e) {
    this.callBase(e);
    this._setTableCss({
      top: e.top,
      left: 0
    });
    this._virtualContentHeight = e.height;
  },
  hasScroll: function () {
    var e = this._virtualContent ? this._virtualContentHeight : this._tableHeight;
    var t = this.getGroupHeight();
    return !!t && !!e && e - t >= 1;
  },
  renderScrollable: function () {
    this._groupElement.dxScrollable({
      useNative: false,
      useSimulatedScrollbar: false,
      showScrollbar: "never",
      bounceEnabled: false,
      direction: "vertical",
      updateManually: true
    });
  },
  processScrollBarSpacing: function (e) {
    var t = this.getGroupHeight();
    if (t) {
      this.setGroupHeight(t - e);
    }
    if (this._scrollBarWidth) {
      this._groupElement.next().remove();
    }
    if (e) {
      var n = (0, o.default)("<div>");
      (0, r.setWidth)(n, "100%");
      (0, r.setHeight)(n, e - 1);
      this._groupElement.after(n);
    }
    this._scrollBarWidth = e;
  },
  getScrollPath: function (e) {
    var t;
    var n = this.tableElement();
    e -= parseInt(n[0].style.top, 10) || 0;
    (0, a.each)(n.find("tr"), function (n, i) {
      var o = i.childNodes[i.childNodes.length - 1];
      if (o && o.rowSpan === 1 && o.offsetTop <= e && o.offsetHeight + o.offsetTop > e) {
        t = o;
        return false;
      }
    });
    return h(n, t);
  },
  _moveFakeTable: function (e) {
    this._moveFakeTableTop(e);
    this.callBase();
  },
  _getRowClassNames: function (e, t, n) {
    if (e !== 0 & t.expanded && !n.includes("dx-expand-border")) {
      n.push("dx-expand-border");
    }
  },
  _getMainElementMarkup: function () {
    var e = i.default.createElement("tbody");
    e.classList.add(this._getAreaClassName());
    return e;
  },
  _getCloseMainElementMarkup: function () {
    return "</tbody>";
  },
  updateColspans: function (e) {
    var t = this.tableElement()[0].rows;
    var n = 0;
    var i = [];
    if (!(this.getColumnsCount() - e > 0)) {
      for (var o = 0; o < t.length; o += 1) {
        for (var a = 0; a < t[o].cells.length; a += 1) {
          var r = t[o].cells[a];
          var s = r.rowSpan;
          if (i[o]) {
            n -= i[o];
            i[o] = 0;
          }
          var l = e - (n + r.colSpan);
          if (a === t[o].cells.length - 1 && l > 0) {
            r.colSpan += l;
          }
          i[o + s] = (i[o + s] || 0) + r.colSpan;
          n += r.colSpan;
        }
      }
    }
  }
});
exports.VerticalHeadersArea = p;
var g = {
  HorizontalHeadersArea: f,
  VerticalHeadersArea: p
};
exports.default = g;