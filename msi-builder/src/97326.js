exports.default = undefined;
var i = require("./20576.js");
var o = require("./62754.js");
var a = {
  load: function () {
    return (0, o.Deferred)().reject();
  },
  loadSingle: function () {
    return (0, o.Deferred)().reject();
  },
  loadFromStore: function () {
    return (0, o.Deferred)().reject();
  },
  loadNextPage: function () {
    return (0, o.Deferred)().reject();
  },
  loadOptions: i.noop,
  userData: i.noop,
  cancel: i.noop,
  cancelAll: i.noop,
  filter: i.noop,
  addSearchFilter: i.noop,
  group: i.noop,
  paginate: i.noop,
  pageSize: i.noop,
  pageIndex: i.noop,
  resetDataSourcePageIndex: i.noop,
  totalCount: i.noop,
  isLastPage: i.noop,
  isLoading: i.noop,
  isLoaded: i.noop,
  searchValue: i.noop,
  searchOperation: i.noop,
  searchExpr: i.noop,
  select: i.noop,
  key: i.noop,
  keyOf: i.noop,
  store: i.noop,
  items: i.noop,
  applyMapFunction: i.noop,
  getDataSource: i.noop,
  reload: i.noop,
  on: i.noop,
  off: i.noop
};
var r = function () {
  function e(e) {
    if (!e) {
      return a;
    }
    this._dataSource = e;
  }
  var t = e.prototype;
  t.load = function () {
    return this._dataSource.load();
  };
  t.loadSingle = function (e, t) {
    if (arguments.length < 2) {
      t = e;
      e = this.key();
    }
    return this._dataSource.loadSingle(e, t);
  };
  t.loadFromStore = function (e) {
    return this.store().load(e);
  };
  t.loadNextPage = function () {
    this.pageIndex(1 + this.pageIndex());
    return this.load();
  };
  t.loadOptions = function () {
    return this._dataSource.loadOptions();
  };
  t.userData = function () {
    return this._dataSource._userData;
  };
  t.cancel = function (e) {
    this._dataSource.cancel(e);
  };
  t.cancelAll = function () {
    this._dataSource.cancelAll();
  };
  t.filter = function (e) {
    return this._dataSource.filter(e);
  };
  t.addSearchFilter = function (e) {
    this._dataSource._addSearchFilter(e);
  };
  t.group = function (e) {
    return this._dataSource.group(e);
  };
  t.paginate = function () {
    return this._dataSource.paginate();
  };
  t.pageSize = function () {
    return this._dataSource._pageSize;
  };
  t.pageIndex = function (e) {
    return this._dataSource.pageIndex(e);
  };
  t.resetDataSourcePageIndex = function () {
    if (this.pageIndex()) {
      this.pageIndex(0);
      this.load();
    }
  };
  t.totalCount = function () {
    return this._dataSource.totalCount();
  };
  t.isLastPage = function () {
    return this._dataSource.isLastPage() || !this._dataSource._pageSize;
  };
  t.isLoading = function () {
    return this._dataSource.isLoading();
  };
  t.isLoaded = function () {
    return this._dataSource.isLoaded();
  };
  t.searchValue = function (e) {
    if (arguments.length) {
      return this._dataSource.searchValue(e);
    } else {
      return this._dataSource.searchValue();
    }
  };
  t.searchOperation = function (e) {
    return this._dataSource.searchOperation(e);
  };
  t.searchExpr = function (e) {
    if (arguments.length) {
      return this._dataSource.searchExpr(e);
    } else {
      return this._dataSource.searchExpr();
    }
  };
  t.select = function () {
    var e;
    return (e = this._dataSource).select.apply(e, arguments);
  };
  t.key = function () {
    return this._dataSource.key();
  };
  t.keyOf = function (e) {
    return this.store().keyOf(e);
  };
  t.store = function () {
    return this._dataSource.store();
  };
  t.items = function () {
    return this._dataSource.items();
  };
  t.applyMapFunction = function (e) {
    return this._dataSource._applyMapFunction(e);
  };
  t.getDataSource = function () {
    return this._dataSource || null;
  };
  t.reload = function () {
    return this._dataSource.reload();
  };
  t.on = function (e, t) {
    this._dataSource.on(e, t);
  };
  t.off = function (e, t) {
    this._dataSource.off(e, t);
  };
  return e;
}();
exports.default = r;
module.exports = exports.default;
module.exports.default = exports.default;