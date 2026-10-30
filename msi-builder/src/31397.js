Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RowsView = undefined;
var i = r(require("./68374.js"));
var o = require("./35095.js");
var a = r(require("./12500.js"));
function r(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
var s = o.rowsModule.views.rowsView.inherit({
  _renderIconContainer: function (e, t) {
    var n = this;
    var o = (0, i.default)("<div>").addClass("dx-treelist-icon-container").appendTo(e);
    if (t.watch) {
      t.watch(function () {
        return [t.row.level, t.row.isExpanded, t.row.node.hasChildren];
      }, function () {
        o.empty();
        n._renderIcons(o, t);
      });
    }
    e.addClass("dx-treelist-cell-expandable");
    return this._renderIcons(o, t);
  },
  _renderIcons: function (e, t) {
    var n;
    var o;
    var a;
    var r = t.row;
    for (var s = r.level, l = 0; l <= s; l++) {
      e.append((n = l === s && r.node.hasChildren, o = r.isExpanded, a = undefined, a = (0, i.default)("<div>").addClass("dx-treelist-empty-space"), n && a.toggleClass("dx-treelist-expanded", o).toggleClass("dx-treelist-collapsed", !o).append((0, i.default)("<span>")), a));
    }
    return e;
  },
  _renderCellCommandContent: function (e, t) {
    this._renderIconContainer(e, t);
    return true;
  },
  _processTemplate: function (e, t) {
    var o = this;
    var a = this.callBase(e);
    var r = o._columnsController.getFirstDataColumnIndex();
    if (a && t.column?.index === r) {
      return {
        render: function (e) {
          var t = e.container;
          if (o._renderCellCommandContent(t, e.model)) {
            e.container = function (e) {
              return (0, i.default)("<div>").addClass("dx-treelist-text-content").appendTo(e);
            }(t);
          }
          a.render(e);
        }
      };
    } else {
      return a;
    }
  },
  _updateCell: function (e, t) {
    e = e.hasClass("dx-treelist-text-content") ? e.parent() : e;
    this.callBase(e, t);
  },
  _rowClick: function (e) {
    var t = this._dataController;
    var n = (0, i.default)(e.event.target);
    var o = this.isExpandIcon(n);
    var a = t && t.items()[e.rowIndex];
    if (o && a) {
      t.changeRowExpand(a.key);
    }
    this.callBase(e);
  },
  _createRow: function (e) {
    var t = e && e.node;
    var n = this.callBase.apply(this, arguments);
    if (t) {
      this.setAria("level", e.level + 1, n);
      if (t.hasChildren) {
        this.setAria("expanded", e.isExpanded, n);
      }
    }
    return n;
  },
  isExpandIcon: function (e) {
    return !!e.closest(`.dx-treelist-expanded, .dx-treelist-collapsed`).length;
  }
});
exports.RowsView = s;
a.default.registerModule("rows", {
  defaultOptions: o.rowsModule.defaultOptions,
  views: {
    rowsView: s
  }
});