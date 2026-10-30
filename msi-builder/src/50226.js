var i;
var o = require("./62754.js");
var a = require("./13306.js");
var r = require("./5325.js");
((i = require("./12500.js")) && i.__esModule ? i : {
  default: i
}).default.registerModule("focus", (0, a.extend)(true, {}, r.focusModule, {
  extenders: {
    controllers: {
      data: {
        changeRowExpand: function (e) {
          if (this.option("focusedRowEnabled") && this.isRowExpanded(e) && this._isFocusedRowInside(e)) {
            this.option("focusedRowKey", e);
          }
          return this.callBase.apply(this, arguments);
        },
        _isFocusedRowInside: function (e) {
          var t = this.option("focusedRowKey");
          var n = this.getRowIndexByKey(t);
          var i = n >= 0 && this.getVisibleRows()[n];
          for (var o = i && i.node.parent; o;) {
            if (o.key === e) {
              return true;
            }
            o = o.parent;
          }
          return false;
        },
        getParentKey: function (e) {
          var t = this._dataSource;
          var n = this.getNodeByKey(e);
          var i = new o.Deferred();
          if (n) {
            i.resolve(n.parent ? n.parent.key : undefined);
          } else {
            t.load({
              filter: [t.getKeyExpr(), "=", e]
            }).done(function (e) {
              var n = e[0];
              if (n) {
                i.resolve(t.parentKeyOf(n));
              } else {
                i.reject();
              }
            }).fail(i.reject);
          }
          return i.promise();
        },
        expandAscendants: function (e) {
          var t = this;
          var n = t._dataSource;
          var i = new o.Deferred();
          t.getParentKey(e).done(function (e) {
            if (n && e !== undefined && e !== t.option("rootValue")) {
              n._isNodesInitializing = true;
              t.expandRow(e);
              n._isNodesInitializing = false;
              t.expandAscendants(e).done(i.resolve).fail(i.reject);
            } else {
              i.resolve();
            }
          }).fail(i.reject);
          return i.promise();
        },
        getPageIndexByKey: function (e) {
          var t = this;
          var n = t._dataSource;
          var i = new o.Deferred();
          t.expandAscendants(e).done(function () {
            n.load({
              parentIds: []
            }).done(function (n) {
              var o;
              var a;
              o = function (n) {
                return t.keyOf(n.data) === e;
              };
              a = -1;
              n.forEach(function (e, t) {
                if (o(e)) {
                  a = t;
                }
              });
              var r = a;
              var s = -1;
              if (r >= 0) {
                s = Math.floor(r / t.pageSize());
              }
              i.resolve(s);
            }).fail(i.reject);
          }).fail(i.reject);
          return i.promise();
        }
      }
    }
  }
}));