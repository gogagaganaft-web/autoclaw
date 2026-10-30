exports.default = undefined;
var i = require("./58664.js");
var o = require("./58201.js");
var a = p(require("./56757.js"));
require("./20551.js");
var r = p(require("./38129.js"));
var s = require("./20576.js");
var l = require("./35922.js");
var u = require("./13306.js");
var d = p(require("./72309.js"));
var c = p(require("./91500.js"));
var h = p(require("./69434.js"));
var f = require("./61902.js");
function p(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
var g = (0, o.getWindow)();
var m = {
  min: new Date(0, 0, 0, 0, 0),
  max: new Date(0, 0, 0, 23, 59)
};
var _ = r.default.inherit({
  NAME: "List",
  supportedKeys: function () {
    return {
      tab: function () {
        var e = this.option();
        var t = e.opened;
        var n = e.applyValueMode;
        if (t && n === "instantly") {
          this.close();
        }
      },
      space: s.noop,
      home: s.noop,
      end: s.noop
    };
  },
  getDefaultOptions: function () {
    return (0, u.extend)(this.callBase(), {
      applyValueMode: "instantly"
    });
  },
  getDisplayFormat: function (e) {
    return e || "shorttime";
  },
  popupConfig: function (e) {
    return e;
  },
  getValue: function () {
    var e = this._widget.option("selectedIndex");
    if (e === -1) {
      return this.dateBox.option("value");
    }
    var t = this._widgetItems[e];
    return this._getDateByItemData(t);
  },
  useCurrentDateByDefault: function () {
    return true;
  },
  getDefaultDate: function () {
    return new Date(null);
  },
  popupShowingHandler: function () {
    this.dateBox._dimensionChanged();
  },
  _renderWidget: function () {
    this.callBase();
    this._refreshItems();
  },
  _getWidgetName: function () {
    return a.default;
  },
  _getWidgetOptions: function () {
    return {
      itemTemplate: this._timeListItemTemplate.bind(this),
      onItemClick: this._listItemClickHandler.bind(this),
      tabIndex: -1,
      onFocusedItemChanged: this._refreshActiveDescendant.bind(this),
      selectionMode: "single"
    };
  },
  _refreshActiveDescendant: function (e) {
    this.dateBox.setAria("activedescendant", "");
    this.dateBox.setAria("activedescendant", e.actionValue);
  },
  _refreshItems: function () {
    this._widgetItems = this._getTimeListItems();
    this._widget.option("items", this._widgetItems);
  },
  renderOpenedState: function () {
    if (this._widget) {
      this._widget.option("focusedElement", null);
      this._setSelectedItemsByValue();
      if (this._widget.option("templatesRenderAsynchronously")) {
        this._asyncScrollTimeout = setTimeout(this._scrollToSelectedItem.bind(this));
      } else {
        this._scrollToSelectedItem();
      }
    }
  },
  dispose: function () {
    this.callBase();
    clearTimeout(this._asyncScrollTimeout);
  },
  _updateValue: function () {
    if (this._widget) {
      this._refreshItems();
      this._setSelectedItemsByValue();
      this._scrollToSelectedItem();
    }
  },
  _setSelectedItemsByValue: function () {
    var e = this.dateBoxValue();
    var t = this._getDateIndex(e);
    if (t === -1) {
      this._widget.option("selectedItems", []);
    } else {
      this._widget.option("selectedIndex", t);
    }
  },
  _scrollToSelectedItem: function () {
    this._widget.scrollToItem(this._widget.option("selectedIndex"));
  },
  _getDateIndex: function (e) {
    var t = -1;
    for (var n = 0, i = this._widgetItems.length; n < i; n++) {
      if (this._areDatesEqual(e, this._widgetItems[n])) {
        t = n;
        break;
      }
    }
    return t;
  },
  _areDatesEqual: function (e, t) {
    return (0, l.isDate)(e) && (0, l.isDate)(t) && e.getHours() === t.getHours() && e.getMinutes() === t.getMinutes();
  },
  _getTimeListItems: function () {
    var e = this.dateBox.dateOption("min") || this._getBoundaryDate("min");
    var t = this.dateBox.dateOption("max") || this._getBoundaryDate("max");
    var n = this.dateBox.dateOption("value") || null;
    var i = t - e;
    var o = e.getMinutes() % this.dateBox.option("interval");
    if (i < 0) {
      return [];
    } else {
      if (i > d.default.ONE_DAY) {
        i = d.default.ONE_DAY;
      }
      if (!(n - e < d.default.ONE_DAY)) {
        (e = this._getBoundaryDate("min")).setMinutes(o);
        if (n && Math.abs(n - t) < d.default.ONE_DAY) {
          i = (t.getHours() * 60 + Math.abs(t.getMinutes() - o)) * d.default.ONE_MINUTE;
        }
      }
      return this._getRangeItems(e, new Date(e), i);
    }
  },
  _getRangeItems: function (e, t, n) {
    var i = [];
    var o = this.dateBox.option("interval");
    while (t - e <= n) {
      i.push(new Date(t));
      t.setMinutes(t.getMinutes() + o);
    }
    return i;
  },
  _getBoundaryDate: function (e) {
    var t = m[e];
    var n = new Date((0, s.ensureDefined)(this.dateBox.dateOption("value"), 0));
    return new Date(n.getFullYear(), n.getMonth(), n.getDate(), t.getHours(), t.getMinutes());
  },
  _timeListItemTemplate: function (e) {
    var t = this.dateBox.option("displayFormat");
    return c.default.format(e, this.getDisplayFormat(t));
  },
  _listItemClickHandler: function (e) {
    if (this.dateBox.option("applyValueMode") !== "useButtons") {
      var t = this._getDateByItemData(e.itemData);
      this.dateBox.option("opened", false);
      this.dateBoxValue(t, e.event);
    }
  },
  _getDateByItemData: function (e) {
    var t = this.dateBox.option("value");
    var n = e.getHours();
    var i = e.getMinutes();
    var o = e.getSeconds();
    var a = e.getFullYear();
    var r = e.getMonth();
    var s = e.getDate();
    if (t) {
      (t = this.dateBox.option("dateSerializationFormat") ? h.default.deserializeDate(t) : new Date(t)).setHours(n);
      t.setMinutes(i);
      t.setSeconds(o);
      t.setFullYear(a);
      t.setMonth(r);
      t.setDate(s);
    } else {
      t = new Date(a, r, s, n, i, 0, 0);
    }
    return t;
  },
  getKeyboardListener: function () {
    return this._widget;
  },
  _updatePopupHeight: function () {
    var e = (0, f.getSizeValue)(this.dateBox.option("dropDownOptions.height"));
    if (e === undefined || e === "auto") {
      this.dateBox._setPopupOption("height", "auto");
      var t = (0, i.getOuterHeight)(this._widget.$element());
      var n = (0, i.getHeight)(g) * 0.45;
      this.dateBox._setPopupOption("height", Math.min(t, n));
    }
    if (this.dateBox._timeList) {
      this.dateBox._timeList.updateDimensions();
    }
  },
  getParsedText: function (e, t) {
    var n = this.callBase(e, t);
    n &&= d.default.mergeDates(n, new Date(null), "date");
    return n;
  }
});
exports.default = _;
module.exports = exports.default;
module.exports.default = exports.default;