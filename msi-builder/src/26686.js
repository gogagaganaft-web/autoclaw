Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DataController = undefined;
var i = require("./20576.js");
var o = require("./62754.js");
var a = require("./13306.js");
var r = require("./72119.js");
var s = u(require("./22821.js"));
var l = u(require("./12500.js"));
function u(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
var d = r.dataControllerModule.controllers.data.inherit({
  _getDataSourceAdapter: function () {
    return s.default;
  },
  _getNodeLevel: function (e) {
    var t = -1;
    while (e.parent) {
      if (e.visible) {
        t++;
      }
      e = e.parent;
    }
    return t;
  },
  _generateDataItem: function (e, t) {
    return {
      rowType: "data",
      node: e,
      key: e.key,
      data: e.data,
      isExpanded: this.isRowExpanded(e.key, t),
      level: this._getNodeLevel(e)
    };
  },
  _loadOnOptionChange: function () {
    this._dataSource.load();
  },
  _isItemEquals: function (e, t) {
    return !!this.callBase.apply(this, arguments) && (!e.node || !t.node || e.node.hasChildren === t.node.hasChildren) && e.level === t.level && e.isExpanded === t.isExpanded;
  },
  init: function () {
    this.createAction("onRowExpanding");
    this.createAction("onRowExpanded");
    this.createAction("onRowCollapsing");
    this.createAction("onRowCollapsed");
    this.callBase.apply(this, arguments);
  },
  keyOf: function (e) {
    var t = this._dataSource;
    if (t) {
      return t.keyOf(e);
    }
  },
  key: function () {
    var e = this._dataSource;
    if (e) {
      return e.getKeyExpr();
    }
  },
  publicMethods: function () {
    return this.callBase().concat(["expandRow", "collapseRow", "isRowExpanded", "getRootNode", "getNodeByKey", "loadDescendants", "forEachNode"]);
  },
  changeRowExpand: function (e) {
    var t = this;
    if (this._dataSource) {
      var n = {
        key: e
      };
      var i = this.isRowExpanded(e);
      this.executeAction(i ? "onRowCollapsing" : "onRowExpanding", n);
      if (!n.cancel) {
        return this._dataSource.changeRowExpand(e).done(function () {
          t.executeAction(i ? "onRowCollapsed" : "onRowExpanded", n);
        });
      }
    }
    return new o.Deferred().resolve();
  },
  isRowExpanded: function (e, t) {
    return this._dataSource && this._dataSource.isRowExpanded(e, t);
  },
  expandRow: function (e) {
    if (this.isRowExpanded(e)) {
      return new o.Deferred().resolve();
    } else {
      return this.changeRowExpand(e);
    }
  },
  collapseRow: function (e) {
    if (this.isRowExpanded(e)) {
      return this.changeRowExpand(e);
    } else {
      return new o.Deferred().resolve();
    }
  },
  getRootNode: function () {
    return this._dataSource && this._dataSource.getRootNode();
  },
  optionChanged: function (e) {
    switch (e.name) {
      case "rootValue":
      case "parentIdExpr":
      case "itemsExpr":
      case "filterMode":
      case "expandNodesOnFiltering":
      case "autoExpandAll":
      case "hasItemsExpr":
      case "dataStructure":
        this._columnsController.reset();
        this._items = [];
        this._refreshDataSource();
        e.handled = true;
        break;
      case "expandedRowKeys":
      case "onNodesInitialized":
        if (!!this._dataSource && !this._dataSource._isNodesInitializing && !(0, i.equalByValue)(e.value, e.previousValue)) {
          this._loadOnOptionChange();
        }
        e.handled = true;
        break;
      case "maxFilterLengthInRequest":
        e.handled = true;
        break;
      default:
        this.callBase(e);
    }
  },
  getNodeByKey: function (e) {
    if (this._dataSource) {
      return this._dataSource.getNodeByKey(e);
    }
  },
  getChildNodeKeys: function (e) {
    if (this._dataSource) {
      return this._dataSource.getChildNodeKeys(e);
    }
  },
  loadDescendants: function (e, t) {
    if (this._dataSource) {
      return this._dataSource.loadDescendants(e, t);
    }
  },
  forEachNode: function () {
    this._dataSource.forEachNode.apply(this, arguments);
  }
});
exports.DataController = d;
l.default.registerModule("data", {
  defaultOptions: function () {
    return (0, a.extend)({}, r.dataControllerModule.defaultOptions(), {
      itemsExpr: "items",
      parentIdExpr: "parentId",
      rootValue: 0,
      dataStructure: "plain",
      expandedRowKeys: [],
      filterMode: "withAncestors",
      expandNodesOnFiltering: true,
      autoExpandAll: false,
      onNodesInitialized: null,
      maxFilterLengthInRequest: 1500,
      paging: {
        enabled: false
      }
    });
  },
  controllers: {
    data: d
  }
});