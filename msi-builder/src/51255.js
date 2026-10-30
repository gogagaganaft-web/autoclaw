Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;
var i;
var o = (i = require("./68374.js")) && i.__esModule ? i : {
  default: i
};
var a = require("./20576.js");
var r = require("./13306.js");
var s = require("./37518.js");
var l = {
  _applyColumnState: function (e) {
    var t;
    var n = this.option("rtlEnabled");
    var i = this._getColumnAlignment(e.column.alignment, n);
    var a = (0, r.extend)(true, {
      columnAlignment: i
    }, e);
    var s = a.rootElement.hasClass("dx-group-panel-item");
    var l = this._createIndicatorContainer(a, s);
    var u = (0, o.default)("<span>").addClass(this._getIndicatorClassName(e.name));
    var d = (t = this.component) === null || t === undefined ? undefined : t.getController("columns");
    var c = (d == null ? undefined : d.getHeaderContentAlignment(i)) || i;
    a.container = l;
    a.indicator = u;
    this._renderIndicator(a);
    l[!s && e.showColumnLines || c !== "left" ? "prependTo" : "appendTo"](e.rootElement);
    return u;
  },
  _getIndicatorClassName: a.noop,
  _getColumnAlignment: function (e, t) {
    t = t || this.option("rtlEnabled");
    if (e && e !== "center") {
      return e;
    } else {
      return (0, s.getDefaultAlignment)(t);
    }
  },
  _createIndicatorContainer: function (e, t) {
    var n = this._getIndicatorContainer(e.rootElement);
    var i = e.columnAlignment === "left" ? "right" : "left";
    if (!n.length) {
      n = (0, o.default)("<div>").addClass("dx-column-indicators");
    }
    this.setAria("role", "presentation", n);
    return n.css("float", e.showColumnLines && !t ? i : null);
  },
  _getIndicatorContainer: function (e) {
    return e && e.find(`.dx-column-indicators`);
  },
  _getIndicatorElements: function (e) {
    var t = this._getIndicatorContainer(e);
    return t && t.children();
  },
  _renderIndicator: function (e) {
    var t = e.container;
    var n = e.indicator;
    if (t && n) {
      t.append(n);
    }
  },
  _updateIndicators: function (e) {
    var t;
    var n = this.getColumns();
    var i = this.getColumnElements();
    if (i && n.length === i.length) {
      for (var o = 0; o < n.length; o++) {
        t = i.eq(o);
        this._updateIndicator(t, n[o], e);
        var a = t.parent().data("options");
        if (a && a.cells) {
          a.cells[t.index()].column = n[o];
        }
      }
    }
  },
  _updateIndicator: function (e, t, n) {
    if (!t.command) {
      return this._applyColumnState({
        name: n,
        rootElement: e,
        column: t,
        showColumnLines: this.option("showColumnLines")
      });
    }
  }
};
exports.default = l;