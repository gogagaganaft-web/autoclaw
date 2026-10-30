exports.default = undefined;
var i;
var o = require("./85273.js");
var a = require("./13306.js");
var r = require("./9234.js");
var s = (i = require("./97326.js")) && i.__esModule ? i : {
  default: i
};
var l = {
  postCtor: function () {
    this.on("disposing", function () {
      this._disposeDataSource();
    }.bind(this));
  },
  _refreshDataSource: function () {
    this._initDataSource();
    this._loadDataSource();
  },
  _initDataSource: function () {
    var e;
    var t;
    var n = "_getSpecificDataSourceOption" in this ? this._getSpecificDataSourceOption() : this.option("dataSource");
    this._disposeDataSource();
    if (n) {
      if (n instanceof o.DataSource) {
        this._isSharedDataSource = true;
        this._dataSource = n;
      } else {
        e = "_dataSourceOptions" in this ? this._dataSourceOptions() : {};
        t = this._dataSourceType ? this._dataSourceType() : o.DataSource;
        n = (0, r.normalizeDataSourceOptions)(n, {
          fromUrlLoadMode: "_dataSourceFromUrlLoadMode" in this && this._dataSourceFromUrlLoadMode()
        });
        this._dataSource = new t((0, a.extend)(true, {}, e, n));
      }
      if ("_normalizeDataSource" in this) {
        this._dataSource = this._normalizeDataSource(this._dataSource);
      }
      this._addDataSourceHandlers();
      this._initDataController();
    }
  },
  _initDataController: function () {
    var e;
    var t = (e = this.option) === null || e === undefined ? undefined : e.call(this, "_dataController");
    var n = this._dataSource;
    this._dataController = t || new s.default(n);
  },
  _addDataSourceHandlers: function () {
    if ("_dataSourceChangedHandler" in this) {
      this._addDataSourceChangeHandler();
    }
    if ("_dataSourceLoadErrorHandler" in this) {
      this._addDataSourceLoadErrorHandler();
    }
    if ("_dataSourceLoadingChangedHandler" in this) {
      this._addDataSourceLoadingChangedHandler();
    }
    this._addReadyWatcher();
  },
  _addReadyWatcher: function () {
    this._dataSource.on("loadingChanged", function (e) {
      if (this._ready) {
        this._ready(!e);
      }
    }.bind(this));
  },
  _addDataSourceChangeHandler: function () {
    var e = this._dataSource;
    this._proxiedDataSourceChangedHandler = function (t) {
      this._dataSourceChangedHandler(e.items(), t);
    }.bind(this);
    e.on("changed", this._proxiedDataSourceChangedHandler);
  },
  _addDataSourceLoadErrorHandler: function () {
    this._proxiedDataSourceLoadErrorHandler = this._dataSourceLoadErrorHandler.bind(this);
    this._dataSource.on("loadError", this._proxiedDataSourceLoadErrorHandler);
  },
  _addDataSourceLoadingChangedHandler: function () {
    this._proxiedDataSourceLoadingChangedHandler = this._dataSourceLoadingChangedHandler.bind(this);
    this._dataSource.on("loadingChanged", this._proxiedDataSourceLoadingChangedHandler);
  },
  _loadDataSource: function () {
    var e = this._dataSource;
    if (e) {
      if (e.isLoaded()) {
        if (this._proxiedDataSourceChangedHandler) {
          this._proxiedDataSourceChangedHandler();
        }
      } else {
        e.load();
      }
    }
  },
  _loadSingle: function (e, t) {
    e = e === "this" ? this._dataSource.key() || "this" : e;
    return this._dataSource.loadSingle(e, t);
  },
  _isLastPage: function () {
    return !this._dataSource || this._dataSource.isLastPage() || !this._dataSource._pageSize;
  },
  _isDataSourceLoading: function () {
    return this._dataSource && this._dataSource.isLoading();
  },
  _disposeDataSource: function () {
    if (this._dataSource) {
      if (this._isSharedDataSource) {
        delete this._isSharedDataSource;
        if (this._proxiedDataSourceChangedHandler) {
          this._dataSource.off("changed", this._proxiedDataSourceChangedHandler);
        }
        if (this._proxiedDataSourceLoadErrorHandler) {
          this._dataSource.off("loadError", this._proxiedDataSourceLoadErrorHandler);
        }
        if (this._proxiedDataSourceLoadingChangedHandler) {
          this._dataSource.off("loadingChanged", this._proxiedDataSourceLoadingChangedHandler);
        }
      } else {
        this._dataSource.dispose();
      }
      delete this._dataSource;
      delete this._proxiedDataSourceChangedHandler;
      delete this._proxiedDataSourceLoadErrorHandler;
      delete this._proxiedDataSourceLoadingChangedHandler;
    }
  },
  getDataSource: function () {
    return this._dataSource || null;
  }
};
exports.default = l;
module.exports = exports.default;
module.exports.default = exports.default;