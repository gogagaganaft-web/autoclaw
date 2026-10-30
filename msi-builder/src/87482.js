Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.virtualColumnsModule = undefined;
var i;
var o = require("./58664.js");
var a = require("./35922.js");
var r = require("./58201.js");
var s = require("./44980.js");
var l = {
  defaultOptions: function () {
    return {
      scrolling: {
        columnRenderingMode: "standard",
        columnPageSize: 5,
        columnRenderingThreshold: 300
      }
    };
  },
  extenders: {
    controllers: {
      columns: (i = function (e) {
        return e.map(function (e) {
          return e.visibleWidth || parseFloat(e.width) || 50;
        });
      }, {
        init: function () {
          var e = this;
          e.callBase.apply(this, arguments);
          e._beginPageIndex = null;
          e._endPageIndex = null;
          e._position = 0;
          e._virtualVisibleColumns = {};
        },
        resetColumnsCache: function () {
          this.callBase();
          this._virtualVisibleColumns = {};
        },
        getBeginPageIndex: function (e) {
          var t = this.getVisibleColumns(undefined, true);
          for (var n = i(t), o = 0, a = 0; a < n.length; a++) {
            if (o >= e) {
              return Math.floor(a / this.getColumnPageSize());
            }
            o += n[a];
          }
          return 0;
        },
        getTotalWidth: function () {
          var e = this.option("width");
          if (typeof e == "number") {
            return e;
          } else {
            return this.getController("resizing")._lastWidth || (0, o.getOuterWidth)(this.component.$element());
          }
        },
        getEndPageIndex: function (e) {
          var t = this.getVisibleColumns(undefined, true);
          var n = i(t);
          var o = 0;
          e += this.getTotalWidth();
          for (var a = 0; a < n.length; a++) {
            if (o >= e) {
              return Math.ceil(a / this.getColumnPageSize());
            }
            o += n[a];
          }
          return Math.ceil(n.length / this.getColumnPageSize());
        },
        getColumnPageSize: function () {
          return this.option("scrolling.columnPageSize");
        },
        _fireColumnsChanged: function () {
          var e = new Date();
          this.columnsChanged.fire({
            optionNames: {
              all: true,
              length: 1
            },
            changeTypes: {
              columns: true,
              virtualColumnsScrolling: true,
              length: 2
            }
          });
          this._renderTime = new Date() - e;
        },
        getScrollingTimeout: function () {
          var e = this.option("scrolling.columnRenderingThreshold");
          var t = this.option("scrolling.renderAsync");
          var n = 0;
          if (!(0, a.isDefined)(t) && this._renderTime > e || t) {
            n = this.option("scrolling.timeout");
          }
          return n;
        },
        setScrollPosition: function (e) {
          var t = this;
          var n = this.getScrollingTimeout();
          if (n > 0) {
            clearTimeout(this._changedTimeout);
            this._changedTimeout = setTimeout(function () {
              t._setScrollPositionCore(e);
            }, n);
          } else {
            this._setScrollPositionCore(e);
          }
        },
        isVirtualMode: function () {
          return (0, r.hasWindow)() && this.option("scrolling.columnRenderingMode") === "virtual";
        },
        resize: function () {
          this._setScrollPositionCore(this._position);
        },
        _setScrollPositionCore: function (e) {
          if (this.isVirtualMode()) {
            var t = this.getBeginPageIndex(e);
            var n = this.getEndPageIndex(e);
            var i = e < this._position ? this._beginPageIndex > t : this._endPageIndex < n;
            this._position = e;
            if (i) {
              this._beginPageIndex = t;
              this._endPageIndex = n;
              this._fireColumnsChanged();
            }
          }
        },
        getFixedColumns: function (e, t) {
          var n = this.callBase(e);
          if (this.isVirtualMode() && !t && n.length) {
            var i = n.map(function (e) {
              return e.command;
            }).indexOf("transparent");
            n[i].colspan = this.getVisibleColumns().length - this.callBase().length + 1;
            return n;
          }
          return n;
        },
        _compileVisibleColumns: function (e, t) {
          if (t || !this.isVirtualMode() || !this._shouldReturnVisibleColumns()) {
            return this.callBase(e);
          }
          if (!!this._columns?.length && !(0, a.isDefined)(this._beginPageIndex) && !(0, a.isDefined)(this._endPageIndex)) {
            this._beginPageIndex = this.getBeginPageIndex(this._position);
            this._endPageIndex = this.getEndPageIndex(this._position);
          }
          var o = this._beginPageIndex;
          var r = this._endPageIndex;
          var l = `${e}-${o}-${r}`;
          if (this._virtualVisibleColumns[l]) {
            return this._virtualVisibleColumns[l];
          }
          var u = this.callBase();
          var d = this.getRowCount();
          var c = this.getColumnPageSize();
          var h = o * c;
          var f = r * c;
          var p = this.getFixedColumns(undefined, true);
          var g = p.map(function (e) {
            return e.command;
          }).indexOf("transparent");
          var m = p.length ? g : 0;
          var _ = u.slice(0, m);
          var v = u.slice(m, h);
          var y = i(v).reduce(function (e, t) {
            return e + t;
          }, 0);
          if (!y) {
            h = 0;
          }
          var b = p.length ? p.length - g - 1 : 0;
          var x = u.slice(u.length - b);
          var w = u.slice(f, u.length - b);
          var C = i(w).reduce(function (e, t) {
            return e + t;
          }, 0);
          if (!C) {
            f = u.length;
          }
          if (d > 1 && typeof e == "number") {
            var S = [];
            for (var k = 0; k <= d; k++) {
              S.push(this.callBase(k));
            }
            _ = (0, s.createColumnsInfo)(S, 0, _.length)[e] || [];
            x = (0, s.createColumnsInfo)(S, u.length - x.length, u.length)[e] || [];
            u = (0, s.createColumnsInfo)(S, h, f)[e] || [];
          } else {
            u = u.slice(h, f);
          }
          if (y) {
            u.unshift({
              command: "virtual",
              width: y
            });
            u = _.concat(u);
          }
          if (C) {
            u.push({
              command: "virtual",
              width: C
            });
            u = u.concat(x);
          }
          this._virtualVisibleColumns[l] = u;
          return u;
        },
        getColumnIndexOffset: function () {
          var e = 0;
          if (this._beginPageIndex > 0) {
            var t = this.getFixedColumns().map(function (e) {
              return e.command;
            }).indexOf("transparent");
            var n = t >= 0 ? t : 0;
            e = this._beginPageIndex * this.getColumnPageSize() - n - 1;
          }
          if (e > 0) {
            return e;
          } else {
            return 0;
          }
        },
        dispose: function () {
          clearTimeout(this._changedTimeout);
          this.callBase.apply(this, arguments);
        }
      })
    },
    views: {
      columnHeadersView: {
        _renderCore: function () {
          var e = this.callBase.apply(this, arguments);
          if (this._columnsController.isVirtualMode()) {
            this._updateScrollLeftPosition();
          }
          return e;
        }
      },
      rowsView: {
        _resizeCore: function () {
          this.callBase.apply(this, arguments);
          this._columnsController.resize();
        },
        _handleScroll: function (e) {
          var t = this;
          var n = this.getScrollable();
          var i = e.scrollOffset.left;
          t.callBase.apply(t, arguments);
          if (t.option("rtlEnabled") && n) {
            i = (0, o.getWidth)(n.$content()) - (0, o.getWidth)(n.$element()) - i;
          }
          t._columnsController.setScrollPosition(i);
        },
        _restoreScrollTop: function () {
          var e = this.getScrollable();
          var t = e == null ? undefined : e.scrollTop();
          if (this._scrollTop > 0 && t !== this._scrollTop) {
            e.scrollTo({
              y: this._scrollTop
            });
          }
        },
        _renderCore: function (e) {
          var t = this;
          if (e == null ? undefined : e.virtualColumnsScrolling) {
            var n = function e() {
              t.resizeCompleted.remove(e);
              t._restoreScrollTop();
            };
            this.resizeCompleted.add(n);
          }
          return this.callBase.apply(this, arguments);
        }
      }
    }
  }
};
exports.virtualColumnsModule = l;