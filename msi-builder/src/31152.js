Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.errorHandlingModule = undefined;
var i = l(require("./68374.js"));
var o = require("./95479.js");
var a = require("./95429.js");
var r = l(require("./55994.js"));
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
var u = {
  defaultOptions: function () {
    return {
      errorRowEnabled: true
    };
  },
  controllers: {
    errorHandling: s.default.ViewController.inherit({
      init: function () {
        this._columnHeadersView = this.getView("columnHeadersView");
        this._rowsView = this.getView("rowsView");
      },
      _createErrorRow: function (e, t) {
        var n;
        var s;
        var l = this;
        var u = this._renderErrorMessage(e);
        if (t) {
          n = (0, i.default)("<tr>").addClass("dx-error-row");
          s = (0, i.default)("<div>").addClass("dx-closebutton").addClass(l.addWidgetPrefix("action"));
          r.default.on(s, a.name, l.createAction(function (e) {
            var n;
            var a = e.event;
            var r = (0, i.default)(a.currentTarget).closest(`.dx-error-row`).index();
            a.stopPropagation();
            (0, o.each)(t, function (e, t) {
              n = (0, i.default)(t).children("tbody").children("tr").eq(r);
              l.removeErrorRow(n);
            });
            if (l.getController("resizing")) {
              l.getController("resizing").fireContentReadyAction();
            }
          }));
          (0, i.default)("<td>").attr({
            colSpan: l.getController("columns").getVisibleColumns().length,
            role: "presentation"
          }).prepend(s).append(u).appendTo(n);
          return n;
        } else {
          return u;
        }
      },
      _renderErrorMessage: function (e) {
        var t = e.url ? e.message.replace(e.url, "") : e.message || e;
        var n = (0, i.default)("<div>").addClass("dx-error-message").text(t);
        if (e.url) {
          (0, i.default)("<a>").attr("href", e.url).text(e.url).appendTo(n);
        }
        return n;
      },
      renderErrorRow: function (e, t, n) {
        var a;
        var r;
        var s = this;
        if (n) {
          n.find(`.dx-error-message`).remove();
          a = s._createErrorRow(e);
          n.prepend(a);
          return a;
        }
        var l = t >= 0 || !s._columnHeadersView.isVisible() ? s._rowsView : s._columnHeadersView;
        var u = l.getTableElements();
        (0, o.each)(u, function (n, o) {
          a = s._createErrorRow(e, u);
          r = r || a;
          if (t >= 0) {
            var d = l._getRowElements((0, i.default)(o)).eq(t);
            s.removeErrorRow(d.next());
            a.insertAfter(d);
          } else {
            var c = (0, i.default)(o).children("tbody");
            var h = c.children("tr");
            if (s._columnHeadersView.isVisible()) {
              s.removeErrorRow(h.last());
              (0, i.default)(o).append(a);
            } else {
              s.removeErrorRow(h.first());
              c.first().prepend(a);
            }
          }
        });
        var d = s.getController("resizing");
        if (d) {
          d.fireContentReadyAction();
        }
        return r;
      },
      removeErrorRow: function (e) {
        if (!e) {
          var t = this._columnHeadersView && this._columnHeadersView.element();
          if (!(e = t && t.find(`.dx-error-row`)) || !e.length) {
            var n = this._rowsView.element();
            e = n && n.find(`.dx-error-row`);
          }
        }
        if (e && e.hasClass("dx-error-row")) {
          e.remove();
        }
      },
      optionChanged: function (e) {
        switch (e.name) {
          case "errorRowEnabled":
            e.handled = true;
            break;
          default:
            this.callBase(e);
        }
      }
    })
  },
  extenders: {
    controllers: {
      data: {
        init: function () {
          var e = this;
          var t = e.getController("errorHandling");
          e.callBase();
          e.dataErrorOccurred.add(function (n, i) {
            if (e.option("errorRowEnabled")) {
              t.renderErrorRow(n, undefined, i);
            }
          });
          e.changed.add(function (t) {
            if (!t || t.changeType !== "loadError") {
              var n = e.getController("errorHandling");
              var i = e.getController("editing");
              if (i && !i.hasChanges() && n) {
                n.removeErrorRow();
              }
            }
          });
        }
      }
    }
  }
};
exports.errorHandlingModule = u;