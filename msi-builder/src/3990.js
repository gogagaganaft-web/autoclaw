Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pagerModule = undefined;
var i = require("./35922.js");
var o = require("./58201.js");
var a = l(require("./28109.js"));
var r = l(require("./79383.js"));
var s = l(require("./15943.js"));
function l(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
function u(e) {
  return 1 + (parseInt(e.pageIndex()) || 0);
}
var d = {
  defaultOptions: function () {
    return {
      pager: {
        visible: "auto",
        showPageSizeSelector: false,
        allowedPageSizes: "auto",
        label: a.default.format("dxPager-ariaLabel")
      }
    };
  },
  views: {
    pagerView: s.default.View.inherit({
      init: function () {
        var e = this;
        var t = this.getController("data");
        t.changed.add(function (n) {
          if (n && n.repaintChangesOnly) {
            var i = e._pager;
            if (i) {
              i.option({
                pageIndex: u(t),
                pageSize: t.pageSize(),
                pageCount: t.pageCount(),
                totalCount: t.totalCount(),
                hasKnownLastPage: t.hasKnownLastPage()
              });
            } else {
              e.render();
            }
          } else if (!n || n.changeType !== "update" && n.changeType !== "updateSelection" && n.changeType !== "updateFocusedRow") {
            e._pager = null;
            e.render();
          }
        });
      },
      _renderCore: function () {
        var e = this.element().addClass(this.addWidgetPrefix("pager"));
        var t = this.option("pager") || {};
        var n = this.getController("data");
        var a = this.getController("keyboardNavigation");
        var s = {
          maxPagesCount: 10,
          pageIndex: u(n),
          pageCount: n.pageCount(),
          pageSize: n.pageSize(),
          showPageSizes: t.showPageSizeSelector,
          showInfo: t.showInfo,
          displayMode: t.displayMode,
          pagesNavigatorVisible: t.visible,
          showNavigationButtons: t.showNavigationButtons,
          label: t.label,
          pageSizes: this.getPageSizes(),
          totalCount: n.totalCount(),
          hasKnownLastPage: n.hasKnownLastPage(),
          pageIndexChanged: function (e) {
            if (n.pageIndex() !== e - 1) {
              n.pageIndex(e - 1);
            }
          },
          pageSizeChanged: function (e) {
            n.pageSize(e);
          },
          onKeyDown: function (e) {
            return a && a.executeAction("onKeyDown", e);
          },
          useLegacyKeyboardNavigation: this.option("useLegacyKeyboardNavigation"),
          useKeyboard: this.option("keyboardNavigation.enabled")
        };
        if ((0, i.isDefined)(t.infoText)) {
          s.infoText = t.infoText;
        }
        if (this._pager) {
          this._pager.repaint();
        } else if ((0, o.hasWindow)()) {
          this._pager = this._createComponent(e, r.default, s);
        } else {
          e.addClass("dx-pager").html("<div class=\"dx-pages\"><div class=\"dx-page\"></div></div>");
        }
      },
      getPager: function () {
        return this._pager;
      },
      getPageSizes: function () {
        var e = this.getController("data");
        var t = this.option("pager");
        var n = t && t.allowedPageSizes;
        var o = e.pageSize();
        if (!(0, i.isDefined)(this._pageSizes) || !this._pageSizes.includes(o)) {
          this._pageSizes = [];
          if (t) {
            if (Array.isArray(n)) {
              this._pageSizes = n;
            } else if (n && o > 1) {
              this._pageSizes = [Math.floor(o / 2), o, o * 2];
            }
          }
        }
        return this._pageSizes;
      },
      isVisible: function () {
        var e = this.getController("data");
        var t = this.option("pager");
        var n = t && t.visible;
        var i = this.option("scrolling");
        if (n === "auto") {
          n = (!i || i.mode !== "virtual" && i.mode !== "infinite") && (e.pageCount() > 1 || e.isLoaded() && !e.hasKnownLastPage());
        }
        return n;
      },
      getHeight: function () {
        return this.getElementHeight();
      },
      optionChanged: function (e) {
        var t = e.name;
        var n = t === "pager";
        var i = t === "paging";
        var a = t === "dataSource";
        var r = t === "scrolling";
        var s = this.getController("data");
        if (n || i || r || a) {
          e.handled = true;
          if (s.skipProcessingPagingChange(e.fullName)) {
            return;
          }
          if (n || i) {
            this._pageSizes = null;
          }
          if (!a) {
            this._pager = null;
            this._invalidate();
            if ((0, o.hasWindow)() && n && this.component) {
              this.component.resize();
            }
          }
        }
      },
      dispose: function () {
        this._pager = null;
      }
    })
  }
};
exports.pagerModule = d;