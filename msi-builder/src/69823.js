Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.contextMenuModule = undefined;
var i = require("./6415.js");
var o = u(require("./68374.js"));
var a = require("./20576.js");
var r = require("./95479.js");
var s = u(require("./10042.js"));
var l = u(require("./15943.js"));
function u(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
var d = {
  columnHeadersView: "header",
  rowsView: "content",
  footerView: "footer",
  headerPanel: "headerPanel"
};
var c = ["columnHeadersView", "rowsView", "footerView", "headerPanel"];
var h = {
  defaultOptions: function () {
    return {
      onContextMenuPreparing: null
    };
  },
  controllers: {
    contextMenu: l.default.ViewController.inherit({
      init: function () {
        this.createAction("onContextMenuPreparing");
      },
      getContextMenuItems: function (e) {
        if (!e) {
          return false;
        }
        var t;
        var n;
        var a;
        var s;
        var l = this;
        var u = (0, o.default)(e.target);
        (0, r.each)(c, function () {
          var c = l.getView(this);
          if ((t = c && c.element()) && (t.is(u) || t.find(u).length)) {
            a = u.closest(".dx-row > td, .dx-row > tr");
            n = a.parent();
            var h = c.getRowIndex(n);
            var f = a[0] && a[0].cellIndex;
            var p = n.data("options");
            var g = {
              event: e,
              targetElement: (0, i.getPublicElement)(u),
              target: d[this],
              rowIndex: h,
              row: c._getRows()[h],
              columnIndex: f,
              column: (p == null ? undefined : p.cells)?.[f]?.column
            };
            g.items = c.getContextMenuItems && c.getContextMenuItems(g);
            l.executeAction("onContextMenuPreparing", g);
            l._contextMenuPrepared(g);
            if (s = g.items) {
              return false;
            }
          }
        });
        return s;
      },
      _contextMenuPrepared: a.noop
    })
  },
  views: {
    contextMenuView: l.default.View.inherit({
      _renderCore: function () {
        var e = this;
        var t = e.element().addClass("dx-context-menu");
        this.setAria("role", "presentation", t);
        this._createComponent(t, s.default, {
          onPositioning: function (t) {
            var n = t.event;
            var i = t.component;
            var o = e.getController("contextMenu").getContextMenuItems(n);
            if (o) {
              i.option("items", o);
              n.stopPropagation();
            } else {
              t.cancel = true;
            }
          },
          onItemClick: function (e) {
            if (e.itemData.onItemClick) {
              e.itemData.onItemClick(e);
            }
          },
          cssClass: e.getWidgetContainerClass(),
          target: e.component.$element()
        });
      }
    })
  }
};
exports.contextMenuModule = h;