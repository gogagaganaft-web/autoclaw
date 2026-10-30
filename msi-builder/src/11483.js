exports.default = undefined;
var i;
var o = (i = require("./68374.js")) && i.__esModule ? i : {
  default: i
};
var a = function () {
  function e(e, t, n) {
    this.instance = null;
    this.$container = null;
    this.$placeMarker = null;
    this.editor = t;
    this.name = e;
    this.options = n || {};
  }
  var t = e.prototype;
  t._addPlaceMarker = function (e) {
    this.$placeMarker = (0, o.default)("<div>").appendTo(e);
  };
  t._addToContainer = function (e) {
    var t = this.$placeMarker;
    var n = this.$container;
    if (t) {
      t.replaceWith(e);
    } else {
      e.appendTo(n);
    }
  };
  t._attachEvents = function () {
    throw "Not implemented";
  };
  t._create = function () {
    throw "Not implemented";
  };
  t._isRendered = function () {
    return !!this.instance;
  };
  t._isVisible = function () {
    var e = this.editor;
    return this.options.visible || !e.option("readOnly");
  };
  t._isDisabled = function () {
    throw "Not implemented";
  };
  t._shouldRender = function () {
    return this._isVisible() && !this._isRendered();
  };
  t.dispose = function () {
    var e = this.instance;
    var t = this.$placeMarker;
    if (e) {
      if (e.dispose) {
        e.dispose();
      } else {
        e.remove();
      }
      this.instance = null;
    }
    if (t) {
      t.remove();
    }
  };
  t.render = function (e = this.$container) {
    this.$container = e;
    if (this._isVisible()) {
      var t = this._create();
      var n = t.instance;
      var i = t.$element;
      this.instance = n;
      this._attachEvents(n, i);
    } else {
      this._addPlaceMarker(e);
    }
  };
  t.update = function () {
    if (this._shouldRender()) {
      this.render();
    }
    return !!this.instance;
  };
  return e;
}();
exports.default = a;
module.exports = exports.default;
module.exports.default = exports.default;