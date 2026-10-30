exports.GanttSizeHelper = undefined;
var i = require("./58664.js");
var o = require("./58201.js");
var a = function () {
  function e(e) {
    this._gantt = e;
  }
  var t = e.prototype;
  t._setTreeListDimension = function (e, t) {
    var n;
    var o = e === "width" ? i.setWidth : i.setHeight;
    var a = e === "width" ? i.getWidth : i.getHeight;
    o(this._gantt._$treeListWrapper, t);
    if ((n = this._gantt._ganttTreeList) !== null && n !== undefined) {
      n.setOption(e, a(this._gantt._$treeListWrapper));
    }
  };
  t._setGanttViewDimension = function (e, t) {
    var n = e === "width" ? i.setWidth : i.setHeight;
    var o = e === "width" ? i.getWidth : i.getHeight;
    n(this._gantt._$ganttView, t);
    this._gantt._setGanttViewOption(e, o(this._gantt._$ganttView));
  };
  t._getPanelsWidthByOption = function () {
    var e;
    var t;
    var n;
    var o = (0, i.getWidth)(this._gantt._$element);
    var a = this._gantt.option("taskListWidth");
    if (isNaN(a)) {
      if (((e = a.indexOf) === null || e === undefined ? undefined : e.call(a, "px")) > 0) {
        n = o - parseInt(a.replace("px", "")) + "px";
      } else if (((t = a.indexOf) === null || t === undefined ? undefined : t.call(a, "%")) > 0) {
        n = 100 - parseInt(a.replace("%", "")) + "%";
      }
    } else {
      n = o - parseInt(a);
    }
    return {
      leftPanelWidth: a,
      rightPanelWidth: n
    };
  };
  t.onAdjustControl = function () {
    var e = (0, i.getHeight)(this._gantt._$element);
    this.updateGanttWidth();
    this.setGanttHeight(e);
  };
  t.onApplyPanelSize = function (e) {
    this.setInnerElementsWidth(e);
    this.updateGanttRowHeights();
  };
  t.updateGanttRowHeights = function () {
    var e;
    var t = this._gantt._ganttTreeList.getRowHeight();
    if (this._gantt._getGanttViewOption("rowHeight") !== t) {
      this._gantt._setGanttViewOption("rowHeight", t);
      if ((e = this._gantt._ganttView) !== null && e !== undefined) {
        e._ganttViewCore.updateRowHeights(t);
      }
    }
  };
  t.adjustHeight = function () {
    if (!this._gantt._hasHeight) {
      this._gantt._setGanttViewOption("height", 0);
      this._gantt._setGanttViewOption("height", this._gantt._ganttTreeList.getOffsetHeight());
    }
  };
  t.setInnerElementsWidth = function (e) {
    if ((0, o.hasWindow)()) {
      var t = !e;
      if (t) {
        e = this._getPanelsWidthByOption();
        this._setTreeListDimension("width", 0);
        this._setGanttViewDimension("width", 0);
      }
      this._setTreeListDimension("width", e.leftPanelWidth);
      this._setGanttViewDimension("width", e.rightPanelWidth);
      if (t) {
        this._gantt._splitter._setSplitterPositionLeft();
      }
    }
  };
  t.updateGanttWidth = function () {
    this._gantt._splitter._dimensionChanged();
  };
  t.setGanttHeight = function (e) {
    var t;
    var n = e - this._gantt._$toolbarWrapper.get(0).offsetHeight;
    this._setTreeListDimension("height", n);
    this._setGanttViewDimension("height", n);
    if ((t = this._gantt._ganttView) !== null && t !== undefined) {
      t._ganttViewCore.resetAndUpdate();
    }
  };
  return e;
}();
exports.GanttSizeHelper = a;