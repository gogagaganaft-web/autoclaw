Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.filterBuilderModule = undefined;
var i = d(require("./68374.js"));
var o = require("./13306.js");
var a = d(require("./28109.js"));
var r = d(require("./20301.js"));
var s = d(require("./51495.js"));
var l = d(require("./4741.js"));
var u = require("./56756.js");
function d(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
var c = {
  defaultOptions: function () {
    return {
      filterBuilder: {
        groupOperationDescriptions: {
          and: a.default.format("dxFilterBuilder-and"),
          or: a.default.format("dxFilterBuilder-or"),
          notAnd: a.default.format("dxFilterBuilder-notAnd"),
          notOr: a.default.format("dxFilterBuilder-notOr")
        },
        filterOperationDescriptions: {
          between: a.default.format("dxFilterBuilder-filterOperationBetween"),
          equal: a.default.format("dxFilterBuilder-filterOperationEquals"),
          notEqual: a.default.format("dxFilterBuilder-filterOperationNotEquals"),
          lessThan: a.default.format("dxFilterBuilder-filterOperationLess"),
          lessThanOrEqual: a.default.format("dxFilterBuilder-filterOperationLessOrEquals"),
          greaterThan: a.default.format("dxFilterBuilder-filterOperationGreater"),
          greaterThanOrEqual: a.default.format("dxFilterBuilder-filterOperationGreaterOrEquals"),
          startsWith: a.default.format("dxFilterBuilder-filterOperationStartsWith"),
          contains: a.default.format("dxFilterBuilder-filterOperationContains"),
          notContains: a.default.format("dxFilterBuilder-filterOperationNotContains"),
          endsWith: a.default.format("dxFilterBuilder-filterOperationEndsWith"),
          isBlank: a.default.format("dxFilterBuilder-filterOperationIsBlank"),
          isNotBlank: a.default.format("dxFilterBuilder-filterOperationIsNotBlank")
        }
      },
      filterBuilderPopup: {}
    };
  },
  views: {
    filterBuilderView: d(require("./15943.js")).default.View.inherit({
      _renderCore: function () {
        this._updatePopupOptions();
      },
      _updatePopupOptions: function () {
        if (this.option("filterBuilderPopup.visible")) {
          this._initPopup();
        } else if (this._filterBuilderPopup) {
          this._filterBuilderPopup.hide();
        }
      },
      _disposePopup: function () {
        if (this._filterBuilderPopup) {
          this._filterBuilderPopup.dispose();
          this._filterBuilderPopup = undefined;
        }
        if (this._filterBuilder) {
          this._filterBuilder.dispose();
          this._filterBuilder = undefined;
        }
      },
      _initPopup: function () {
        var e = this;
        e._disposePopup();
        e._filterBuilderPopup = e._createComponent(e.element(), s.default, (0, o.extend)({
          title: a.default.format("dxDataGrid-filterBuilderPopupTitle"),
          contentTemplate: function (t) {
            return e._getPopupContentTemplate(t);
          },
          onOptionChanged: function (t) {
            if (t.name === "visible") {
              e.option("filterBuilderPopup.visible", t.value);
            }
          },
          toolbarItems: e._getPopupToolbarItems()
        }, e.option("filterBuilderPopup"), {
          onHidden: function () {
            (0, u.restoreFocus)(e);
            e._disposePopup();
          }
        }));
      },
      _getPopupContentTemplate: function (e) {
        var t = (0, i.default)(e);
        var n = (0, i.default)("<div>").appendTo((0, i.default)(e));
        this._filterBuilder = this._createComponent(n, r.default, (0, o.extend)({
          value: this.option("filterValue"),
          fields: this.getController("columns").getFilteringColumns()
        }, this.option("filterBuilder"), {
          customOperations: this.getController("filterSync").getCustomFilterOperations()
        }));
        this._createComponent(t, l.default, {
          direction: "both"
        });
      },
      _getPopupToolbarItems: function () {
        var e = this;
        return [{
          toolbar: "bottom",
          location: "after",
          widget: "dxButton",
          options: {
            text: a.default.format("OK"),
            onClick: function () {
              var t = e._filterBuilder.option("value");
              e.option("filterValue", t);
              e._filterBuilderPopup.hide();
            }
          }
        }, {
          toolbar: "bottom",
          location: "after",
          widget: "dxButton",
          options: {
            text: a.default.format("Cancel"),
            onClick: function () {
              e._filterBuilderPopup.hide();
            }
          }
        }];
      },
      optionChanged: function (e) {
        switch (e.name) {
          case "filterBuilder":
          case "filterBuilderPopup":
            this._invalidate();
            e.handled = true;
            break;
          default:
            this.callBase(e);
        }
      }
    })
  }
};
exports.filterBuilderModule = c;