exports.default = undefined;
var i = l(require("./68374.js"));
var o = require("./13306.js");
var a = l(require("./28109.js"));
var r = l(require("./96688.js"));
var s = require("./62754.js");
function l(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
var u = (0, require("./2146.js").stubComponent)("TextBox");
var d = {
  _getDefaultOptions: function () {
    return (0, o.extend)(this.callBase(), {
      searchMode: "",
      searchExpr: null,
      searchValue: "",
      searchEnabled: false,
      searchEditorOptions: {}
    });
  },
  _initMarkup: function () {
    this._renderSearch();
    this.callBase();
  },
  _renderSearch: function () {
    var e = this.$element();
    var t = this.option("searchEnabled");
    var n = this._addWidgetPrefix("search");
    var o = this._addWidgetPrefix("with-search");
    if (!t) {
      e.removeClass(o);
      this._removeSearchBox();
      return;
    }
    var a = this._getSearchEditorOptions();
    if (this._searchEditor) {
      this._searchEditor.option(a);
    } else {
      e.addClass(o);
      this._$searchEditorElement = (0, i.default)("<div>").addClass(n).prependTo(e);
      this._searchEditor = this._createComponent(this._$searchEditorElement, u, a);
    }
  },
  _removeSearchBox: function () {
    if (this._$searchEditorElement) {
      this._$searchEditorElement.remove();
    }
    delete this._$searchEditorElement;
    delete this._searchEditor;
  },
  _getSearchEditorOptions: function () {
    var e = this;
    var t = e.option("searchEditorOptions");
    var n = a.default.format("Search");
    return (0, o.extend)({
      mode: "search",
      placeholder: n,
      tabIndex: e.option("tabIndex"),
      value: e.option("searchValue"),
      valueChangeEvent: "input",
      inputAttr: {
        "aria-label": n
      },
      onValueChanged: function (t) {
        var n = e.option("searchTimeout");
        e._valueChangeDeferred = new s.Deferred();
        clearTimeout(e._valueChangeTimeout);
        e._valueChangeDeferred.done(function () {
          this.option("searchValue", t.value);
        }.bind(e));
        if (t.event && t.event.type === "input" && n) {
          e._valueChangeTimeout = setTimeout(function () {
            e._valueChangeDeferred.resolve();
          }, n);
        } else {
          e._valueChangeDeferred.resolve();
        }
      }
    }, t);
  },
  _getAriaTarget: function () {
    if (this.option("searchEnabled")) {
      return this._itemContainer(true);
    } else {
      return this.callBase();
    }
  },
  _focusTarget: function () {
    if (this.option("searchEnabled")) {
      return this._itemContainer(true);
    } else {
      return this.callBase();
    }
  },
  _updateFocusState: function (e, t) {
    if (this.option("searchEnabled")) {
      this._toggleFocusClass(t, this.$element());
    }
    this.callBase(e, t);
  },
  getOperationBySearchMode: function (e) {
    if (e === "equals") {
      return "=";
    } else {
      return e;
    }
  },
  _optionChanged: function (e) {
    switch (e.name) {
      case "searchEnabled":
      case "searchEditorOptions":
        this._invalidate();
        break;
      case "searchExpr":
      case "searchMode":
      case "searchValue":
        if (!this._dataSource) {
          r.default.log("W1009");
          return;
        }
        if (e.name === "searchMode") {
          this._dataSource.searchOperation(this.getOperationBySearchMode(e.value));
        } else {
          this._dataSource[e.name](e.value);
        }
        this._dataSource.load();
        break;
      case "searchTimeout":
        break;
      default:
        this.callBase(e);
    }
  },
  focus: function () {
    if (this.option("focusedElement") || !this.option("searchEnabled")) {
      this.callBase();
    } else if (this._searchEditor) {
      this._searchEditor.focus();
    }
  },
  _cleanAria: function () {
    var e = this.$element();
    this.setAria({
      role: null,
      activedescendant: null
    }, e);
    e.attr("tabIndex", null);
  },
  _clean: function () {
    this.callBase();
    this._cleanAria();
  },
  _refresh: function () {
    if (this._valueChangeDeferred) {
      this._valueChangeDeferred.resolve();
    }
    this.callBase();
  },
  setEditorClass: function (e) {
    u = e;
  }
};
exports.default = d;
module.exports = exports.default;
module.exports.default = exports.default;