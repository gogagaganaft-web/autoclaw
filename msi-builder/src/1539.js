exports.plugin = undefined;
var i;
var o = require("./20576.js");
var a = (i = require("./53305.js")) && i.__esModule ? i : {
  default: i
};
var r;
var s = a.default.postCtor;
var l = {
  _dataSourceLoadErrorHandler: function () {
    this._dataSourceChangedHandler();
  },
  _dataSourceOptions: function () {
    return {
      paginate: false
    };
  },
  _updateDataSource: function () {
    this._refreshDataSource();
    if (!this.option("dataSource")) {
      this._dataSourceChangedHandler();
    }
  },
  _dataIsLoaded: function () {
    return !this._dataSource || this._dataSource.isLoaded();
  },
  _dataSourceItems: function () {
    return this._dataSource && this._dataSource.items();
  }
};
for (r in a.default) {
  if (r !== "postCtor") {
    l[r] = a.default[r];
  }
}
var u = {
  name: "data_source",
  init: function () {
    s.call(this);
  },
  dispose: o.noop,
  members: l
};
exports.plugin = u;