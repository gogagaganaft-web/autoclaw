exports.MultiLineStrategy = undefined;
var i = require("./58664.js");
var o = function () {
  function e(e) {
    this._toolbar = e;
  }
  var t = e.prototype;
  t._initMarkup = function () {};
  t._updateMenuVisibility = function () {};
  t._renderMenuItems = function () {};
  t._renderItem = function () {};
  t._getMenuItems = function () {};
  t._getToolbarItems = function () {
    return this._toolbar.option("items") ?? [];
  };
  t._getItemsWidth = function () {
    return this._toolbar._getSummaryItemsWidth(this._toolbar.itemElements(), true);
  };
  t._arrangeItems = function () {
    var e = this._toolbar._$toolbarItemsContainer.find(`.dx-toolbar-label`).eq(0);
    if (e.length) {
      var t = (0, i.getWidth)(this._toolbar.$element());
      var n = (0, i.getOuterWidth)(e) - (0, i.getWidth)(e);
      e.css("maxWidth", t - n);
    }
  };
  t._hideOverflowItems = function () {};
  t._dimensionChanged = function () {};
  t._itemOptionChanged = function () {};
  t._optionChanged = function () {};
  return e;
}();
exports.MultiLineStrategy = o;