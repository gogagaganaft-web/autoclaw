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
  },
  _renderBadge: function (e) {
    this._$element.children(".dx-badge").remove();
    if (e) {
      var t = (0, i.default)("<div>").addClass("dx-tabs-item-badge").addClass("dx-badge").text(e);
      this._$element.append(t);
    }
  }
});
exports.default = r;
module.exports = exports.default;
module.exports.default = exports.default;