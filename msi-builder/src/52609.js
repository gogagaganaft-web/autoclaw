exports.default = undefined;
var i;
var o = require("./44297.js");
var a = (i = require("./53305.js")) && i.__esModule ? i : {
  default: i
};
function r(e, t) {
  return (r = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (e, t) {
    e.__proto__ = t;
    return e;
  })(e, t);
}
var s = function (e) {
  var t;
  var n;
  function i(t, n, i) {
    var o;
    (o = e.call(this) || this)._optionName = t;
    o._getLoadPanel = n;
    o._dataSourceChangedCallback = i;
    return o;
  }
  n = e;
  (t = i).prototype = Object.create(n.prototype);
  t.prototype.constructor = t;
  r(t, n);
  var o = i.prototype;
  o.insert = function (e, t, n) {
    var i = this;
    this._showLoadPanel();
    this._getStore().insert(e).done(function (e) {
      if (t) {
        t(e);
      }
      i._hideLoadPanel();
    }).fail(function (e) {
      if (n) {
        n(e);
      }
      i._hideLoadPanel();
    });
  };
  o.update = function (e, t, n, i) {
    var o = this;
    this._showLoadPanel();
    this._getStore().update(e, t).done(function (e, t) {
      if (n) {
        n(e, t);
      }
      o._hideLoadPanel();
    }).fail(function (e) {
      if (i) {
        i(e);
      }
      o._hideLoadPanel();
    });
  };
  o.remove = function (e, t, n) {
    var i = this;
    this._showLoadPanel();
    this._getStore().remove(e).done(function (e) {
      if (t) {
        t(e);
      }
      i._hideLoadPanel();
    }).fail(function (e) {
      if (n) {
        n(e);
      }
      i._hideLoadPanel();
    });
  };
  o._dataSourceChangedHandler = function (e, t) {
    this._dataSourceChangedCallback(this._optionName, e);
  };
  o._dataSourceOptions = function () {
    return {
      paginate: false
    };
  };
  o._dataSourceLoadingChangedHandler = function (e) {
    if (e && !this._dataSource.isLoaded()) {
      this._showLoadPanel();
    } else {
      this._hideLoadPanel();
    }
  };
  o._showLoadPanel = function () {
    var e;
    if ((e = this._getLoadPanel()) !== null && e !== undefined) {
      e.show();
    }
  };
  o._hideLoadPanel = function () {
    var e;
    if ((e = this._getLoadPanel()) !== null && e !== undefined) {
      e.hide();
    }
  };
  o._getStore = function () {
    return this._dataSource.store();
  };
  o._getItems = function () {
    return this._getStore()._array || this._dataSource.items();
  };
  o._reloadDataSource = function () {
    return this._dataSource.load();
  };
  o.dispose = function () {
    this._disposeDataSource();
  };
  o._optionChanged = function (e) {
    e.name;
  };
  return i;
}(o.Component);
s.include(a.default);
var l = s;
exports.default = l;
module.exports = exports.default;
module.exports.default = exports.default;