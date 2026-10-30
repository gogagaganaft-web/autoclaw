exports.default = undefined;
var i = a(require("./68374.js"));
var o = a(require("./54778.js"));
function a(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
var r = o.default.inherit({
  _renderWatchers: function () {
    this.callBase();
    this._startWatcher("badge", this._renderBadge.bind(this));
    this._startWatcher("showChevron", this._renderShowChevron.bind(this));
  },
  _renderBadge: function (e) {
    this._$element.children(".dx-list-item-badge-container").remove();
    if (e) {
      var t = (0, i.default)("<div>").addClass("dx-list-item-badge-container").append((0, i.default)("<div>").addClass("dx-list-item-badge").addClass("dx-badge").text(e));
      var n = this._$element.children(".dx-list-item-chevron-container").first();
      if (n.length > 0) {
        t.insertBefore(n);
      } else {
        t.appendTo(this._$element);
      }
    }
  },
  _renderShowChevron: function (e) {
    this._$element.children(".dx-list-item-chevron-container").remove();
    if (e) {
      var t = (0, i.default)("<div>").addClass("dx-list-item-chevron-container");
      var n = (0, i.default)("<div>").addClass("dx-list-item-chevron");
      t.append(n).appendTo(this._$element);
    }
  }
});
exports.default = r;
module.exports = exports.default;
module.exports.default = exports.default;