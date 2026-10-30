Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.DataArea = undefined;
var i;
var o = (i = require("./68374.js")) && i.__esModule ? i : {
  default: i
};
var a = require("./60137.js");
var r = require("./74305.js");
var s = require("./28580.js");
var l = r.AreaItem.inherit({
  _getAreaName: function () {
    return "data";
  },
  _createGroupElement: function () {
    return (0, o.default)("<div>").addClass("dx-pivotgrid-area").addClass("dx-pivotgrid-area-data").css("borderTopWidth", 0);
  },
  _applyCustomStyles: function (e) {
    var t = e.cell;
    var n = e.classArray;
    if (t.rowType === "T" || t.columnType === "T") {
      n.push("dx-total");
    }
    if (t.rowType === "GT" || t.columnType === "GT") {
      n.push("dx-grandtotal");
    }
    if (t.rowType === "T" || t.rowType === "GT") {
      n.push("dx-row-total");
    }
    if (e.rowIndex === e.rowsCount - 1) {
      e.cssArray.push("border-bottom: 0px");
    }
    this.callBase(e);
  },
  _moveFakeTable: function (e) {
    this._moveFakeTableHorizontally(e.x);
    this._moveFakeTableTop(e.y);
    this.callBase();
  },
  renderScrollable: function () {
    this._groupElement.dxScrollable({
      useNative: this.getUseNativeValue(),
      useSimulatedScrollbar: false,
      rtlEnabled: this.component.option("rtlEnabled"),
      bounceEnabled: false,
      updateManually: true
    });
  },
  getUseNativeValue: function () {
    var e = this.component.option("scrolling").useNative;
    if (e === "auto") {
      return !!a.nativeScrolling;
    } else {
      return !!e;
    }
  },
  getScrollbarWidth: function () {
    if (this.getUseNativeValue()) {
      return (0, s.calculateScrollbarWidth)();
    } else {
      return 0;
    }
  },
  updateScrollableOptions: function (e) {
    var t = e.direction;
    var n = e.rtlEnabled;
    var i = this._getScrollable();
    i.option("useNative", this.getUseNativeValue());
    i.option({
      direction: t,
      rtlEnabled: n
    });
  },
  getScrollableDirection: function (e, t) {
    if (e && !t) {
      return "horizontal";
    } else if (!e && t) {
      return "vertical";
    } else {
      return "both";
    }
  },
  reset: function () {
    this.callBase();
    if (this._virtualContent) {
      this._virtualContent.parent().css("height", "auto");
    }
  },
  setVirtualContentParams: function (e) {
    this.callBase(e);
    this._virtualContent.parent().css("height", e.height);
    this._setTableCss({
      top: e.top,
      left: e.left
    });
  }
});
exports.DataArea = l;
var u = {
  DataArea: l
};
exports.default = u;