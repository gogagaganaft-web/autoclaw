exports.default = undefined;
var i = a(require("./77834.js"));
var o = a(require("./2630.js"));
function a(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
var r = i.default.inherit(o.default).inherit({
  _addWidgetPrefix: function (e) {
    return "dx-list-" + e;
  },
  _getCombinedFilter: function () {
    var e = this._dataController;
    var t = {
      filter: e.filter()
    };
    e.addSearchFilter(t);
    return t.filter;
  },
  _initDataSource: function () {
    var e = this.option("searchValue");
    var t = this.option("searchExpr");
    var n = this.option("searchMode");
    this.callBase();
    var i = this._dataController;
    if (e && e.length) {
      i.searchValue(e);
    }
    if (n.length) {
      i.searchOperation(o.default.getOperationBySearchMode(n));
    }
    if (t) {
      i.searchExpr(t);
    }
  }
});
exports.default = r;
module.exports = exports.default;
module.exports.default = exports.default;