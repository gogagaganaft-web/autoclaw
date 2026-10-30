Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;
var i;
var o = (i = require("./68374.js")) && i.__esModule ? i : {
  default: i
};
var a = require("./35922.js");
var r = {
  _applyColumnState: function (e) {
    var t;
    var n;
    var i = this.option("sorting.mode");
    var r = e.rootElement;
    var s = e.column;
    var l = this._getIndicatorContainer(r);
    if (e.name === "sort") {
      r.find(`.dx-sort`).remove();
      if (!l.children().length) {
        l.remove();
      }
      var u = i !== "none" && s.allowSorting;
      if (!(0, a.isDefined)(s.groupIndex) && (u || (0, a.isDefined)(s.sortOrder))) {
        t = s.sortOrder === "asc" ? "ascending" : "descending";
        n = this.callBase(e).toggleClass("dx-sort-up", s.sortOrder === "asc").toggleClass("dx-sort-down", s.sortOrder === "desc");
        if (this.getController && !!this.getController("columns").columnOption("sortIndex:1") && this.option("sorting.showSortIndexes") && s.sortIndex >= 0) {
          (0, o.default)("<span>").addClass("dx-sort-index-icon").text(s.sortIndex + 1).appendTo(n);
          n.addClass("dx-sort-index");
        }
        if (u) {
          e.rootElement.addClass(this.addWidgetPrefix("action"));
        }
      }
      if ((0, a.isDefined)(s.sortOrder)) {
        this.setAria("sort", t, r);
      } else {
        this.setAria("sort", "none", r);
      }
      return n;
    }
    return this.callBase(e);
  },
  _getIndicatorClassName: function (e) {
    if (e === "sort") {
      return "dx-sort";
    } else if (e === "sortIndex") {
      return "dx-sort-index-icon";
    } else {
      return this.callBase(e);
    }
  },
  _renderIndicator: function (e) {
    var t = e.column;
    var n = e.container;
    var i = e.indicator;
    if (e.name === "sort") {
      var o = this.option("rtlEnabled");
      if (!(0, a.isDefined)(t.sortOrder)) {
        if (i) {
          i.addClass("dx-sort-none");
        }
      }
      if (n.children().length && (!o && e.columnAlignment === "left" || o && e.columnAlignment === "right")) {
        n.prepend(i);
        return;
      }
    }
    this.callBase(e);
  },
  _updateIndicator: function (e, t, n) {
    if (n !== "sort" || !(0, a.isDefined)(t.groupIndex)) {
      return this.callBase.apply(this, arguments);
    }
  },
  _getIndicatorElements: function (e, t) {
    var n = this.callBase(e);
    if (t) {
      return n;
    } else {
      return n && n.not(`.dx-sort-none`);
    }
  }
};
exports.default = r;