Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.searchModule = undefined;
var i = d(require("./73349.js"));
var o = d(require("./68374.js"));
var a = require("./47617.js");
var r = require("./35922.js");
var s = d(require("./96687.js"));
var l = d(require("./28109.js"));
var u = d(require("./60082.js"));
function d(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
function c(e) {
  if ((0, r.isDefined)(e.allowSearch)) {
    return e.allowSearch;
  } else {
    return e.allowFiltering;
  }
}
function h(e, t) {
  var n = e.lookup;
  if (e.parseValue) {
    if (n) {
      return e.parseValue.call(n, t);
    } else {
      return e.parseValue(t);
    }
  } else {
    return t;
  }
}
var f;
var p = {
  defaultOptions: function () {
    return {
      searchPanel: {
        visible: false,
        width: 160,
        placeholder: l.default.format("dxDataGrid-searchPanelPlaceholder"),
        highlightSearchText: true,
        highlightCaseSensitive: false,
        text: "",
        searchVisibleColumnsOnly: false
      }
    };
  },
  extenders: {
    controllers: {
      data: {
        publicMethods: function () {
          return this.callBase().concat(["searchByText"]);
        },
        _calculateAdditionalFilter: function () {
          var e = this.callBase();
          var t = function (e, t) {
            var n;
            var i;
            var o;
            var r = e._columnsController.getColumns();
            var l = e.option("searchPanel.searchVisibleColumnsOnly");
            var d = [];
            if (!t) {
              return null;
            }
            function f(e) {
              var t = (0, a.compileGetter)(o.valueExpr);
              for (var n = 0; n < e.length; n++) {
                var r = t(e[n]);
                d.push(i.createFilterExpression(r, null, "search"));
              }
            }
            for (n = 0; n < r.length; n++) {
              i = r[n];
              if ((!l || i.visible) && c(i) && i.calculateFilterExpression) {
                o = i.lookup;
                var p = h(i, t);
                if (o && o.items) {
                  (0, s.default)(o.items).filter(i.createFilterExpression.call({
                    dataField: o.displayExpr,
                    dataType: o.dataType,
                    calculateFilterExpression: i.calculateFilterExpression
                  }, p, null, "search")).enumerate().done(f);
                } else if (p !== undefined) {
                  d.push(i.createFilterExpression(p, null, "search"));
                }
              }
            }
            if (d.length === 0) {
              return ["!"];
            } else {
              return u.default.combineFilters(d, "or");
            }
          }(this, this.option("searchPanel.text"));
          return u.default.combineFilters([e, t]);
        },
        searchByText: function (e) {
          this.option("searchPanel.text", e);
        },
        optionChanged: function (e) {
          switch (e.fullName) {
            case "searchPanel.text":
            case "searchPanel":
              this._applyFilter();
              e.handled = true;
              break;
            default:
              this.callBase(e);
          }
        }
      }
    },
    views: {
      headerPanel: (f = function (e) {
        return e.option("searchPanel");
      }, {
        _getToolbarItems: function () {
          var e = this.callBase();
          return this._prepareSearchItem(e);
        },
        _prepareSearchItem: function (e) {
          var t = this;
          var n = t.getController("data");
          var i = f(t);
          if (i && i.visible) {
            var a = {
              template: function (e, a, r) {
                var s = (0, o.default)("<div>").addClass(t.addWidgetPrefix("search-panel")).appendTo(r);
                t.getController("editorFactory").createEditor(s, {
                  width: i.width,
                  placeholder: i.placeholder,
                  parentType: "searchPanel",
                  value: t.option("searchPanel.text"),
                  updateValueTimeout: 700,
                  setValue: function (e) {
                    n.searchByText(e);
                  },
                  editorOptions: {
                    inputAttr: {
                      "aria-label": l.default.format(`${t.component.NAME}-ariaSearchInGrid`)
                    }
                  }
                });
                t.resize();
              },
              name: "searchPanel",
              location: "after",
              locateInMenu: "never",
              sortIndex: 40
            };
            e.push(a);
          }
          return e;
        },
        getSearchTextEditor: function () {
          var e = this;
          var t = e.element();
          var n = t.find(`.${e.addWidgetPrefix("search-panel")}`).filter(function () {
            return (0, o.default)(this).closest(`.${e.addWidgetPrefix("header-panel")}`).is(t);
          });
          if (n.length) {
            return n.dxTextBox("instance");
          } else {
            return null;
          }
        },
        isVisible: function () {
          var e = f(this);
          return this.callBase() || e && e.visible;
        },
        optionChanged: function (e) {
          if (e.name === "searchPanel") {
            if (e.fullName === "searchPanel.text") {
              var t = this.getSearchTextEditor();
              if (t) {
                t.option("value", e.value);
              }
            } else {
              this._invalidate();
            }
            e.handled = true;
          } else {
            this.callBase(e);
          }
        }
      }),
      rowsView: {
        init: function () {
          this.callBase.apply(this, arguments);
          this._searchParams = [];
          this._dataController = this.getController("data");
        },
        _getFormattedSearchText: function (e, t) {
          var n = h(e, t);
          var i = u.default.getFormatOptionsByColumn(e, "search");
          return u.default.formatValue(n, i);
        },
        _getStringNormalizer: function () {
          var e;
          var t;
          var n;
          var o = this.option("searchPanel.highlightCaseSensitive");
          var r = (t = (e = this._dataController) === null || e === undefined ? undefined : e.getDataSource) === null || t === undefined ? undefined : t.call(e);
          var s = ((n = r == null ? undefined : r.loadOptions) === null || n === undefined ? undefined : n.call(r))?.langParams;
          return function (e) {
            return (0, a.toComparable)(e, o, s);
          };
        },
        _findHighlightingTextNodes: function (e, t, n) {
          var i;
          var a = t.parent();
          var r = this._getStringNormalizer();
          var s = r(n);
          var l = [];
          if (a.length) {
            if (e) {
              if (e.groupIndex >= 0 && !e.showWhenGrouped) {
                i = t;
              } else {
                var u = this._columnsController.getVisibleIndex(e.index);
                i = a.children("td").eq(u).find("*");
              }
            }
          } else {
            a = (0, o.default)("<div>").append(t);
          }
          (i = (i == null ? undefined : i.length) ? i : a.find("*")).each(function (e, t) {
            for (var n = (0, o.default)(t).contents(), i = 0; i < n.length; i++) {
              var a = n.get(i);
              if (a.nodeType === 3) {
                if (r(a.textContent || a.nodeValue).indexOf(s) > -1) {
                  l.push(a);
                }
              }
            }
          });
          return l;
        },
        _highlightSearchTextCore: function (e, t) {
          var n = (0, o.default)("<span>").addClass(this.addWidgetPrefix("search-text"));
          var a = e.text();
          var r = e[0];
          var s = this._getStringNormalizer();
          var l = s(a).indexOf(s(t));
          if (l >= 0) {
            if (r.textContent) {
              r.textContent = a.substr(0, l);
            } else {
              r.nodeValue = a.substr(0, l);
            }
            e.after(n.text(a.substr(l, t.length)));
            e = (0, o.default)(i.default.createTextNode(a.substr(l + t.length))).insertAfter(n);
            return this._highlightSearchTextCore(e, t);
          }
        },
        _highlightSearchText: function (e, t, n) {
          var i = this;
          var a = this._getStringNormalizer();
          var r = i.option("searchPanel.text");
          if (t && n) {
            r = r && i._getFormattedSearchText(n, r);
          }
          if (r && i.option("searchPanel.highlightSearchText")) {
            i._findHighlightingTextNodes(n, e, r).forEach(function (e) {
              if (t) {
                if (a((0, o.default)(e).text()) === a(r)) {
                  (0, o.default)(e).replaceWith((0, o.default)("<span>").addClass(i.addWidgetPrefix("search-text")).text((0, o.default)(e).text()));
                }
              } else {
                i._highlightSearchTextCore((0, o.default)(e), r);
              }
            });
          }
        },
        _renderCore: function () {
          var e = this;
          var t = this.callBase.apply(this, arguments);
          if (this.option().rowTemplate || this.option("dataRowTemplate")) {
            if (this.option("templatesRenderAsynchronously")) {
              clearTimeout(this._highlightTimer);
              this._highlightTimer = setTimeout(function () {
                e._highlightSearchText(e.getTableElement());
              });
            } else {
              this._highlightSearchText(this.getTableElement());
            }
          }
          return t;
        },
        _updateCell: function (e, t) {
          var n = this;
          var i = t.column;
          var o = (i.lookup && i.lookup.dataType || i.dataType) !== "string";
          if (c(i) && !t.isOnForm) {
            if (this.option("templatesRenderAsynchronously")) {
              if (!this._searchParams.length) {
                clearTimeout(this._highlightTimer);
                this._highlightTimer = setTimeout(function () {
                  n._searchParams.forEach(function (e) {
                    n._highlightSearchText.apply(n, e);
                  });
                  n._searchParams = [];
                });
              }
              this._searchParams.push([e, o, i]);
            } else {
              this._highlightSearchText(e, o, i);
            }
          }
          this.callBase(e, t);
        },
        dispose: function () {
          clearTimeout(this._highlightTimer);
          this.callBase();
        }
      }
    }
  }
};
exports.searchModule = p;