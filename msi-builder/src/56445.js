var i;
var o = require("./20576.js");
var a = require("./47617.js");
var r = require("./62754.js");
var s = require("./13306.js");
var l = require("./35922.js");
var u = require("./5325.js");
var d = (i = require("./74938.js")) && i.__esModule ? i : {
  default: i
};
var c = require("./10087.js");
function h(e, t) {
  return (h = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (e, t) {
    e.__proto__ = t;
    return e;
  })(e, t);
}
var f = Number.MAX_SAFE_INTEGER || 9007199254740991;
d.default.registerModule("focus", (0, s.extend)(true, {}, u.focusModule, {
  extenders: {
    controllers: {
      data: function (e) {
        return function (e) {
          var t;
          var n;
          function i() {
            return e.apply(this, arguments) || this;
          }
          n = e;
          (t = i).prototype = Object.create(n.prototype);
          t.prototype.constructor = t;
          h(t, n);
          var s = i.prototype;
          s.changeRowExpand = function (t, n) {
            if (this.option("focusedRowEnabled") && Array.isArray(t) && this.isRowExpanded(t)) {
              var i = this.getController("keyboardNavigation");
              if ((!n || !i.isKeyboardEnabled()) && !!this._isFocusedRowInsideGroup(t)) {
                this.option("focusedRowKey", t);
              }
            }
            return e.prototype.changeRowExpand.call(this, t, n);
          };
          s._isFocusedRowInsideGroup = function (e) {
            var t = this.getController("columns");
            var n = this.option("focusedRowKey");
            var i = this.getRowIndexByKey(n);
            var o = i >= 0 && this.getVisibleRows()[i];
            var r = t.getGroupDataSourceParameters(true);
            if (o) {
              for (var s = 0; s < e.length; ++s) {
                if ((0, a.compileGetter)(r[s] && r[s].selector)(o.data) !== e[s]) {
                  return false;
                }
              }
            }
            return true;
          };
          s._getGroupPath = function (e, t) {
            var n = [];
            for (var i = [e]; i && i[0] && t;) {
              var o = i[0];
              if (o.key !== undefined) {
                n.push(o.key);
              }
              i = o.items;
              t--;
            }
            return n;
          };
          s._expandGroupByPath = function (e, t, n) {
            var i = new r.Deferred();
            n++;
            e.expandRow(t.slice(0, n)).done(function () {
              if (n === t.length) {
                i.resolve();
              } else {
                e._expandGroupByPath(e, t, n).done(i.resolve).fail(i.reject);
              }
            }).fail(i.reject);
            return i.promise();
          };
          s._calculateGlobalRowIndexByGroupedData = function (e) {
            var t = this;
            var n = t._dataSource;
            var i = t._generateFilterByKey(e);
            var o = new r.Deferred();
            var a = Array.isArray(e);
            var s = n.group();
            if (a) {
              return o.resolve(-1).promise();
            } else if (n._grouping._updatePagingOptions) {
              n.load({
                filter: t._concatWithCombinedFilter(i),
                group: s
              }).done(function (n) {
                if (!n || n.length === 0 || !(0, l.isDefined)(n[0].key) || n[0].key === -1) {
                  return o.resolve(-1).promise();
                }
                var i = t._getGroupPath(n[0], s.length);
                t._expandGroupByPath(t, i, 0).done(function () {
                  t._calculateExpandedRowGlobalIndex(o, e, i, s);
                }).fail(o.reject);
              }).fail(o.reject);
              return o.promise();
            } else {
              t._calculateGlobalRowIndexByFlatData(e, null, true).done(o.resolve).fail(o.reject);
              return o;
            }
          };
          s._calculateExpandedRowGlobalIndex = function (e, t, n, i) {
            var a;
            var r = (0, c.createGroupFilter)(n, {
              group: i
            });
            var s = this._dataSource;
            var l = this.option("scrolling.mode");
            var u = l === "virtual" || l === "infinite";
            var d = s.pageSize();
            s._grouping._updatePagingOptions({
              skip: 0,
              take: f
            }, function (e, t) {
              if ((0, o.equalByValue)(e.path, n)) {
                a = t;
              }
            });
            this._calculateGlobalRowIndexByFlatData(t, r).done(function (t) {
              var i;
              var o;
              if (t < 0) {
                e.resolve(-1);
              } else {
                i = (a % d || d) + t - n.length;
                o = u ? 0 : Math.floor(i / (d - n.length)) * n.length;
                i = a + t + o;
                e.resolve(i);
              }
            }).fail(e.reject);
          };
          return i;
        }(e.inherit(u.focusModule.extenders.controllers.data));
      }
    }
  }
}));