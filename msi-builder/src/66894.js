exports.default = undefined;
var i = require("./34309.js");
var o = d(require("./55994.js"));
var a = d(require("./13046.js"));
var r = require("./95479.js");
var s = require("./39611.js");
var l = require("./13306.js");
var u = require("./9321.js");
function d(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
var c = {
  onStart: i.start,
  onUpdated: i.swipe,
  onEnd: i.end,
  onCancel: "dxswipecancel"
};
var h = a.default.inherit({
  _getDefaultOptions: function () {
    return (0, l.extend)(this.callBase(), {
      elastic: true,
      immediate: false,
      immediateTimeout: 180,
      direction: "horizontal",
      itemSizeFunc: null,
      onStart: null,
      onUpdated: null,
      onEnd: null,
      onCancel: null
    });
  },
  _render: function () {
    this.callBase();
    this.$element().addClass("dx-swipeable");
    this._attachEventHandlers();
  },
  _attachEventHandlers: function () {
    this._detachEventHandlers();
    if (!this.option("disabled")) {
      var e = this.NAME;
      this._createEventData();
      (0, r.each)(c, function (t, n) {
        var i = this._createActionByOption(t, {
          context: this
        });
        n = (0, s.addNamespace)(n, e);
        o.default.on(this.$element(), n, this._eventData, function (e) {
          return i({
            event: e
          });
        });
      }.bind(this));
    }
  },
  _createEventData: function () {
    this._eventData = {
      elastic: this.option("elastic"),
      itemSizeFunc: this.option("itemSizeFunc"),
      direction: this.option("direction"),
      immediate: this.option("immediate"),
      immediateTimeout: this.option("immediateTimeout")
    };
  },
  _detachEventHandlers: function () {
    o.default.off(this.$element(), ".dxSwipeable");
  },
  _optionChanged: function (e) {
    switch (e.name) {
      case "disabled":
      case "onStart":
      case "onUpdated":
      case "onEnd":
      case "onCancel":
      case "elastic":
      case "immediate":
      case "itemSizeFunc":
      case "direction":
        this._detachEventHandlers();
        this._attachEventHandlers();
        break;
      case "rtlEnabled":
        break;
      default:
        this.callBase(e);
    }
  },
  _useTemplates: function () {
    return false;
  }
});
(0, u.name)(h, "dxSwipeable");
var f = h;
exports.default = f;
module.exports = exports.default;
module.exports.default = exports.default;