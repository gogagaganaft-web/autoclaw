exports.default = undefined;
var i = d(require("./68374.js"));
var o = require("./20576.js");
var a = d(require("./99393.js"));
var r = require("./13306.js");
var s = d(require("./32468.js"));
var l = require("./62754.js");
var u = require("./39611.js");
function d(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
var c = s.default.inherit({
  _supportedKeys: function () {
    var e = this._list ? this._list.option("focusedElement") : null;
    var t = this.callBase();
    e = e && (0, i.default)(e);
    return (0, r.extend)({}, t, {
      upArrow: function (n) {
        return !t.upArrow.apply(this, arguments) || !!(0, u.isCommandKeyPressed)(n) || !(n.preventDefault(), n.stopPropagation(), e && !this._calcNextItem(-1)) || (this._clearFocusedItem(), false);
      },
      downArrow: function (n) {
        return !t.downArrow.apply(this, arguments) || !!(0, u.isCommandKeyPressed)(n) || !(n.preventDefault(), n.stopPropagation(), e && !this._calcNextItem(1)) || (this._clearFocusedItem(), false);
      },
      enter: function (t) {
        if (!e) {
          this.close();
        }
        var n = this.option("opened");
        if (n) {
          t.preventDefault();
        }
        return n;
      }
    });
  },
  _getDefaultOptions: function () {
    return (0, r.extend)(this.callBase(), {
      minSearchLength: 1,
      maxItemCount: 10,
      noDataText: "",
      showDropDownButton: false,
      searchEnabled: true
    });
  },
  _initMarkup: function () {
    this.callBase();
    this.$element().addClass("dx-autocomplete");
    this.setAria("autocomplete", "inline");
  },
  _displayGetterExpr: function () {
    return this.option("valueExpr");
  },
  _closeOutsideDropDownHandler: function (e) {
    var t = e.target;
    return !(0, i.default)(t).closest(this.$element()).length;
  },
  _renderDimensions: function () {
    this.callBase();
    this._updatePopupWidth();
    this._updateListDimensions();
  },
  _popupWrapperClass: function () {
    return this.callBase() + " dx-autocomplete-popup-wrapper";
  },
  _listConfig: function () {
    var e = this;
    return (0, r.extend)(this.callBase(), {
      pageLoadMode: "none",
      onSelectionChanged: function (t) {
        e._setSelectedItem(t.addedItems[0]);
      }
    });
  },
  _listItemClickHandler: function (e) {
    this._saveValueChangeEvent(e.event);
    var t = this._displayGetter(e.itemData);
    this.option("value", t);
    this.close();
  },
  _setListDataSource: function () {
    if (this._list) {
      this._list.option("selectedItems", []);
      this.callBase();
    }
  },
  _refreshSelected: o.noop,
  _searchCanceled: function () {
    this.callBase();
    this.close();
  },
  _loadItem: function (e, t) {
    var n = this._getItemFromPlain(e, t);
    return new l.Deferred().resolve(n).promise();
  },
  _dataSourceOptions: function () {
    return {
      paginate: true,
      pageSize: this.option("maxItemCount")
    };
  },
  _searchDataSource: function (e) {
    this._dataSource.pageSize(this.option("maxItemCount"));
    this.callBase(e);
    this._clearFocusedItem();
  },
  _clearFocusedItem: function () {
    if (this._list) {
      this._list.option("focusedElement", null);
      this._list.option("selectedIndex", -1);
    }
  },
  _renderValueEventName: function () {
    return "input keyup";
  },
  _valueChangeEventHandler: function (e) {
    var t = this._input().val() || null;
    return this.callBase(e, t);
  },
  _optionChanged: function (e) {
    switch (e.name) {
      case "maxItemCount":
        this._searchDataSource();
        break;
      case "valueExpr":
        this._compileDisplayGetter();
        this._setListOption("displayExpr", this._displayGetterExpr());
        this.callBase(e);
        break;
      default:
        this.callBase(e);
    }
  },
  reset: function () {
    this.callBase();
    this.close();
  }
});
(0, a.default)("dxAutocomplete", c);
var h = c;
exports.default = h;
module.exports = exports.default;
module.exports.default = exports.default;