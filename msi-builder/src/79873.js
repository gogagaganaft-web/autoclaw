Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ColumnsController = undefined;
var i;
var o = require("./35922.js");
var a = require("./10279.js");
var r = (i = require("./12500.js")) && i.__esModule ? i : {
  default: i
};
var s = a.columnsControllerModule.controllers.columns.inherit({
  _getFirstItems: function (e) {
    return this.callBase(e).map(function (e) {
      return e.data;
    });
  },
  getFirstDataColumnIndex: function () {
    var e = this.getVisibleColumns();
    for (var t = e.length, n = 0, i = 0; i <= t - 1; i++) {
      if (!(0, o.isDefined)(e[i].command)) {
        n = e[i].index;
        break;
      }
    }
    return n;
  }
});
exports.ColumnsController = s;
r.default.registerModule("columns", {
  defaultOptions: a.columnsControllerModule.defaultOptions,
  controllers: {
    columns: s
  }
});