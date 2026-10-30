exports.default = undefined;
var i = h(require("./26974.js"));
var o = require("./47617.js");
var a = require("./20576.js");
var r = require("./35922.js");
var s = require("./13306.js");
var l = h(require("./53305.js"));
var u = require("./85273.js");
var d = h(require("./26562.js"));
var c = require("./62754.js");
function h(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
function f(e) {
  return (f = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function (e) {
    return typeof e;
  } : function (e) {
    if (e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype) {
      return "symbol";
    } else {
      return typeof e;
    }
  })(e);
}
var p = (0, s.extend)({}, l.default, {
  _dataExpressionDefaultOptions: function () {
    return {
      items: [],
      dataSource: null,
      itemTemplate: "item",
      value: null,
      valueExpr: "this",
      displayExpr: undefined
    };
  },
  _initDataExpressions: function () {
    this._compileValueGetter();
    this._compileDisplayGetter();
    this._initDynamicTemplates();
    this._initDataSource();
    this._itemsToDataSource();
  },
  _itemsToDataSource: function () {
    if (!this.option("dataSource")) {
      this._dataSource = new u.DataSource({
        store: new d.default(this.option("items")),
        pageSize: 0
      });
      this._initDataController();
    }
  },
  _compileDisplayGetter: function () {
    this._displayGetter = (0, o.compileGetter)(this._displayGetterExpr());
  },
  _displayGetterExpr: function () {
    return this.option("displayExpr");
  },
  _compileValueGetter: function () {
    this._valueGetter = (0, o.compileGetter)(this._valueGetterExpr());
  },
  _valueGetterExpr: function () {
    return this.option("valueExpr") || "this";
  },
  _loadValue: function (e) {
    var t = new c.Deferred();
    e = this._unwrappedValue(e);
    if ((0, r.isDefined)(e)) {
      this._loadSingle(this._valueGetterExpr(), e).done(function (n) {
        if (this._isValueEquals(this._valueGetter(n), e)) {
          t.resolve(n);
        } else {
          t.reject();
        }
      }.bind(this)).fail(function () {
        t.reject();
      });
      this._loadValueDeferred = t;
      return t.promise();
    } else {
      return t.reject().promise();
    }
  },
  _rejectValueLoading: function () {
    var e;
    if ((e = this._loadValueDeferred) !== null && e !== undefined) {
      e.reject({
        shouldSkipCallback: true
      });
    }
  },
  _getCurrentValue: function () {
    return this.option("value");
  },
  _unwrappedValue: function (e) {
    if ((e = e ?? this._getCurrentValue()) && this._dataSource && this._valueGetterExpr() === "this") {
      e = this._getItemKey(e);
    }
    return i.default.unwrap(e);
  },
  _getItemKey: function (e) {
    var t = this._dataSource.key();
    if (Array.isArray(t)) {
      var n = {};
      for (var i = 0, o = t.length; i < o; i++) {
        n[t[i]] = e[t[i]];
      }
      return n;
    }
    if (t && f(e) === "object") {
      e = e[t];
    }
    return e;
  },
  _isValueEquals: function (e, t) {
    var n = this._dataSource && this._dataSource.key();
    var i = this._compareValues(e, t);
    if (!i && n && (0, r.isDefined)(e) && (0, r.isDefined)(t)) {
      i = Array.isArray(n) ? this._compareByCompositeKey(e, t, n) : this._compareByKey(e, t, n);
    }
    return i;
  },
  _compareByCompositeKey: function (e, t, n) {
    var i = r.isObject;
    if (!i(e) || !i(t)) {
      return false;
    }
    for (var o = 0, a = n.length; o < a; o++) {
      if (e[n[o]] !== t[n[o]]) {
        return false;
      }
    }
    return true;
  },
  _compareByKey: function (e, t, n) {
    var o = i.default.unwrap;
    var r = (0, a.ensureDefined)(o(e[n]), e);
    var s = (0, a.ensureDefined)(o(t[n]), t);
    return this._compareValues(r, s);
  },
  _compareValues: function (e, t) {
    return (0, o.toComparable)(e, true) === (0, o.toComparable)(t, true);
  },
  _initDynamicTemplates: a.noop,
  _setCollectionWidgetItemTemplate: function () {
    this._initDynamicTemplates();
    this._setCollectionWidgetOption("itemTemplate", this.option("itemTemplate"));
  },
  _getCollectionKeyExpr: function () {
    var e = this.option("valueExpr");
    if ((0, r.isString)(e) && e !== "this" || (0, r.isFunction)(e)) {
      return e;
    } else {
      return null;
    }
  },
  _dataExpressionOptionChanged: function (e) {
    switch (e.name) {
      case "items":
        this._itemsToDataSource();
        this._setCollectionWidgetOption("items");
        break;
      case "dataSource":
        this._initDataSource();
        break;
      case "itemTemplate":
        this._setCollectionWidgetItemTemplate();
        break;
      case "valueExpr":
        this._compileValueGetter();
        break;
      case "displayExpr":
        this._compileDisplayGetter();
        this._initDynamicTemplates();
        this._setCollectionWidgetOption("displayExpr");
    }
  }
});
exports.default = p;
module.exports = exports.default;
module.exports.default = exports.default;