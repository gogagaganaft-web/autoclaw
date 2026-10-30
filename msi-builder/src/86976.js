exports.default = undefined;
var n = {
  _menuEnabled: function () {
    return !!this._menuItems().length;
  },
  _menuItems: function () {
    return this._list.option("menuItems");
  },
  _deleteEnabled: function () {
    return this._list.option("allowItemDeleting");
  },
  _fireMenuAction: function (e, t) {
    this._list._itemEventHandlerByHandler(e, t, {}, {
      excludeValidators: ["disabled", "readOnly"]
    });
  }
};
exports.default = n;
module.exports = exports.default;
module.exports.default = exports.default;