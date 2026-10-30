exports.LayoutElement = l;
exports.WrapperLayoutElement = u;
var i = require("./20576.js");
var o = require("./48013.js");
var a = Math.round;
var r = {
  horizontal: 0,
  vertical: 0
};
var s = {
  center: 0.5,
  right: 1,
  bottom: 1,
  left: 0,
  top: 0
};
function l(e) {
  this._options = e;
}
function u(e, t) {
  this._renderElement = e;
  this._cacheBBox = t;
}
l.prototype = {
  constructor: l,
  position: function (e) {
    var t = e.of.getLayoutOptions();
    var n = this.getLayoutOptions();
    var i = e.at;
    var o = e.my;
    var l = e.offset || r;
    var u = -s[o.horizontal] * n.width + t.x + s[i.horizontal] * t.width + parseInt(l.horizontal);
    var d = -s[o.vertical] * n.height + t.y + s[i.vertical] * t.height + parseInt(l.vertical);
    this.shift(a(u), a(d));
  },
  getLayoutOptions: i.noop
};
var d = u.prototype = (0, o.clone)(l.prototype);
d.constructor = u;
d.getLayoutOptions = function () {
  return this._cacheBBox || this._renderElement.getBBox();
};
d.shift = function (e, t) {
  var n = this.getLayoutOptions();
  this._renderElement.move(a(e - n.x), a(t - n.y));
};