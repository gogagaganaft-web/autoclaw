Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.filterPanelModule = undefined;
var i = p(require("./68374.js"));
var o = require("./62754.js");
var a = require("./78008.js");
var r = require("./35922.js");
var s = p(require("./55994.js"));
var l = p(require("./28109.js"));
var u = p(require("./18859.js"));
var d = require("./59423.js");
var c = require("./9130.js");
var h = p(require("./15943.js"));
var f = p(require("./60082.js"));
function p(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
var g = `filter-panel-text`;
var m = `filter-panel-checkbox`;
var _ = `filter-panel-clear-filter`;
var v = `filter-panel-left`;
var y = {
  defaultOptions: function () {
    return {
      filterPanel: {
        visible: false,
        filterEnabled: true,
        texts: {
          createFilter: l.default.format("dxDataGrid-filterPanelCreateFilter"),
          clearFilter: l.default.format("dxDataGrid-filterPanelClearFilter"),
          filterEnabledHint: l.default.format("dxDataGrid-filterPanelFilterEnabledHint")
        }
      }
    };
  },
  views: {
    filterPanelView: h.default.View.inherit({
      isVisible: function () {
        return this.option("filterPanel.visible") && this.getController("data").dataSource();
      },
      init: function () {
        var e = this;
        this.getController("data").dataSourceChanged.add(function () {
          return e.render();
        });
        this._columnsController = this.getController("columns");
      },
      _renderCore: function () {
        var e = this.element();
        e.empty();
        if (this._columnsController.getColumns().length) {
          e.addClass(this.addWidgetPrefix("filter-panel"));
          var t = (0, i.default)("<div>").addClass(this.addWidgetPrefix(v)).appendTo(e);
          this._renderFilterBuilderText(e, t);
        }
      },
      _renderFilterBuilderText: function (e, t) {
        var n = this._getFilterElement();
        var i = this._getTextElement();
        if (this.option("filterValue") || this._filterValueBuffer) {
          var o = this._getCheckElement();
          var a = this._getRemoveButtonElement();
          t.append(o).append(n).append(i);
          e.append(a);
          return;
        }
        t.append(n).append(i);
      },
      _getCheckElement: function () {
        var e = this;
        var t = (0, i.default)("<div>").addClass(this.addWidgetPrefix(m));
        e._createComponent(t, u.default, {
          value: e.option("filterPanel.filterEnabled"),
          onValueChanged: function (t) {
            e.option("filterPanel.filterEnabled", t.value);
          }
        });
        t.attr("title", this.option("filterPanel.texts.filterEnabledHint"));
        return t;
      },
      _getFilterElement: function () {
        var e = this;
        var t = (0, i.default)("<div>").addClass("dx-icon-filter");
        s.default.on(t, "click", function () {
          return e._showFilterBuilder();
        });
        (0, c.registerKeyboardAction)("filterPanel", e, t, undefined, function () {
          return e._showFilterBuilder();
        });
        e._addTabIndexToElement(t);
        return t;
      },
      _getTextElement: function () {
        var e;
        var t = this;
        var n = (0, i.default)("<div>").addClass(t.addWidgetPrefix(g));
        var a = t.option("filterValue");
        if (a) {
          (0, o.when)(t.getFilterText(a, t.getController("filterSync").getCustomFilterOperations())).done(function (e) {
            var i = t.option("filterPanel.customizeText");
            if (i) {
              var o = i({
                component: t.component,
                filterValue: a,
                text: e
              });
              if (typeof o == "string") {
                e = o;
              }
            }
            n.text(e);
          });
        } else {
          e = t.option("filterPanel.texts.createFilter");
          n.text(e);
        }
        s.default.on(n, "click", function () {
          return t._showFilterBuilder();
        });
        (0, c.registerKeyboardAction)("filterPanel", t, n, undefined, function () {
          return t._showFilterBuilder();
        });
        t._addTabIndexToElement(n);
        return n;
      },
      _showFilterBuilder: function () {
        this.option("filterBuilderPopup.visible", true);
      },
      _getRemoveButtonElement: function () {
        var e = this;
        function t() {
          return e.option("filterValue", null);
        }
        var n = (0, i.default)("<div>").addClass(e.addWidgetPrefix(_)).text(e.option("filterPanel.texts.clearFilter"));
        s.default.on(n, "click", t);
        (0, c.registerKeyboardAction)("filterPanel", this, n, undefined, t);
        e._addTabIndexToElement(n);
        return n;
      },
      _addTabIndexToElement: function (e) {
        if (!this.option("useLegacyKeyboardNavigation")) {
          var t = this.option("tabindex") || 0;
          e.attr("tabindex", t);
        }
      },
      optionChanged: function (e) {
        switch (e.name) {
          case "filterValue":
            this._invalidate();
            this.option("filterPanel.filterEnabled", true);
            e.handled = true;
            break;
          case "filterPanel":
            this._invalidate();
            e.handled = true;
            break;
          default:
            this.callBase(e);
        }
      },
      _getConditionText: function (e, t, n) {
        var i = `[${e}] ${t}`;
        if ((0, r.isDefined)(n)) {
          i += n;
        }
        return i;
      },
      _getValueMaskedText: function (e) {
        if (Array.isArray(e)) {
          return `('${e.join("', '")}')`;
        } else {
          return ` '${e}'`;
        }
      },
      _getValueText: function (e, t, n) {
        var i = this;
        var a = new o.Deferred();
        var s = t && t.customizeText;
        if ((0, r.isDefined)(n) || s) {
          if (!s && e.lookup) {
            (0, d.getCurrentLookupValueText)(e, n, function (e) {
              a.resolve(i._getValueMaskedText(e));
            });
          } else {
            var l = Array.isArray(n) ? n : f.default.getDisplayValue(e, n, null);
            (0, o.when)((0, d.getCurrentValueText)(e, l, t, "filterPanel")).done(function (e) {
              a.resolve(i._getValueMaskedText(e));
            });
          }
        } else {
          a.resolve("");
        }
        return a.promise();
      },
      getConditionText: function (e, t) {
        var n;
        var i = this;
        var r = e[1];
        var s = new o.Deferred();
        var l = (0, d.getCustomOperation)(t.customOperations, r);
        var u = (0, d.getField)(e[0], t.columns);
        var c = u.caption || "";
        var h = e[2];
        n = l ? l.caption || (0, a.captionize)(l.name) : h === null ? (0, d.getCaptionByOperation)(r === "=" ? "isblank" : "isnotblank", t.filterOperationDescriptions) : (0, d.getCaptionByOperation)(r, t.filterOperationDescriptions);
        this._getValueText(u, l, h).done(function (e) {
          s.resolve(i._getConditionText(c, n, e));
        });
        return s;
      },
      getGroupText: function (e, t, n) {
        var i = this;
        var a = new o.Deferred();
        var r = [];
        var s = (0, d.getGroupValue)(e);
        e.forEach(function (e) {
          if ((0, d.isCondition)(e)) {
            r.push(i.getConditionText(e, t));
          } else if ((0, d.isGroup)(e)) {
            r.push(i.getGroupText(e, t, true));
          }
        });
        o.when.apply(this, r).done(function () {
          var e;
          for (var i = arguments.length, o = new Array(i), r = 0; r < i; r++) {
            o[r] = arguments[r];
          }
          if (s.startsWith("!")) {
            var l = t.groupOperationDescriptions[`not${s.substring(1, 2).toUpperCase()}${s.substring(2)}`].split(" ");
            e = `${l[0]} ${o[0]}`;
          } else {
            e = o.join(` ${t.groupOperationDescriptions[s]} `);
          }
          if (n) {
            e = `(${e})`;
          }
          a.resolve(e);
        });
        return a;
      },
      getFilterText: function (e, t) {
        var n = {
          customOperations: t,
          columns: this.getController("columns").getFilteringColumns(),
          filterOperationDescriptions: this.option("filterBuilder.filterOperationDescriptions"),
          groupOperationDescriptions: this.option("filterBuilder.groupOperationDescriptions")
        };
        if ((0, d.isCondition)(e)) {
          return this.getConditionText(e, n);
        } else {
          return this.getGroupText(e, n);
        }
      }
    })
  },
  extenders: {
    controllers: {
      data: {
        optionChanged: function (e) {
          switch (e.name) {
            case "filterPanel":
              this._applyFilter();
              e.handled = true;
              break;
            default:
              this.callBase(e);
          }
        }
      }
    }
  }
};
exports.filterPanelModule = y;