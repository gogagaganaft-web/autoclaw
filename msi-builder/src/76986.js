exports.default = undefined;
var i = u(require("./68374.js"));
var o = u(require("./99393.js"));
var a = u(require("./2630.js"));
var r = u(require("./29837.js"));
var s = require("./13306.js");
var l = u(require("./60903.js"));
function u(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
a.default.setEditorClass(r.default);
var d = `dx-treeview-node-container`;
var c = l.default.inherit(a.default).inherit({
  _addWidgetPrefix: function (e) {
    return `dx-treeview-${e}`;
  },
  _optionChanged: function (e) {
    switch (e.name) {
      case "searchValue":
        if (this._showCheckboxes() && this._isRecursiveSelection()) {
          this._removeSelection();
        }
        this._initDataAdapter();
        this._updateSearch();
        this._repaintContainer();
        this.option("focusedElement", null);
        break;
      case "searchExpr":
        this._initDataAdapter();
        this.repaint();
        break;
      case "searchMode":
        if (this.option("expandNodesRecursive")) {
          this._updateDataAdapter();
        } else {
          this._initDataAdapter();
        }
        this.repaint();
        break;
      default:
        this.callBase(e);
    }
  },
  _updateDataAdapter: function () {
    this._setOptionWithoutOptionChange("expandNodesRecursive", false);
    this._initDataAdapter();
    this._setOptionWithoutOptionChange("expandNodesRecursive", true);
  },
  _getDataAdapterOptions: function () {
    return (0, s.extend)(this.callBase(), {
      searchValue: this.option("searchValue"),
      searchMode: this.option("searchMode") || "contains",
      searchExpr: this.option("searchExpr")
    });
  },
  _getNodeContainer: function () {
    return this.$element().find(`.${d}`).first();
  },
  _updateSearch: function () {
    if (this._searchEditor) {
      var e = this._getSearchEditorOptions();
      this._searchEditor.option(e);
    }
  },
  _repaintContainer: function () {
    var e;
    var t = this._getNodeContainer();
    if (t.length) {
      t.empty();
      e = this._dataAdapter.getRootNodes();
      this._renderEmptyMessage(e);
      this._renderItems(t, e);
      this._fireContentReadyAction();
    }
  },
  _focusTarget: function () {
    return this._itemContainer(this.option("searchEnabled"));
  },
  _cleanItemContainer: function () {
    this.$element().empty();
  },
  _itemContainer: function (e) {
    if (this._selectAllEnabled()) {
      return this._getNodeContainer();
    } else if (this._scrollable && e) {
      return (0, i.default)(this._scrollable.content());
    } else {
      return this.callBase();
    }
  },
  _addWidgetClass: function () {
    this.$element().addClass(this._widgetClass());
  },
  _clean: function () {
    this.callBase();
    this._removeSearchBox();
  }
});
(0, o.default)("dxTreeView", c);
var h = c;
exports.default = h;
module.exports = exports.default;
module.exports.default = exports.default;