var i;
var o = require("./28016.js");
var a = (i = require("./12500.js")) && i.__esModule ? i : {
  default: i
};
var r = o.gridViewModule.views.gridView.inherit({
  _getWidgetAriaLabel: function () {
    return "dxTreeList-ariaTreeList";
  },
  _getTableRoleName: function () {
    return "treegrid";
  }
});
a.default.registerModule("gridView", {
  defaultOptions: o.gridViewModule.defaultOptions,
  controllers: o.gridViewModule.controllers,
  views: {
    gridView: r
  },
  extenders: {
    controllers: {
      resizing: {
        _toggleBestFitMode: function (e) {
          this.callBase(e);
          this._rowsView.getTableElement().find(".dx-treelist-cell-expandable").toggleClass(this.addWidgetPrefix("best-fit"), e);
        }
      }
    }
  }
});