var i = require("./58664.js");
var o = require("./31648.js");
var a = u(require("./87209.js"));
var r = require("./40245.js");
var s = u(require("./61225.js"));
var l = require("./62754.js");
function u(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
(0, r.register)("delete", "swipe", s.default.inherit({
  _shouldHandleSwipe: true,
  _renderItemPosition: function (e, t, n) {
    var i = new l.Deferred();
    var r = t * this._itemElementWidth;
    if (n) {
      a.default.animate(e, {
        to: {
          left: r
        },
        type: "slide",
        complete: function () {
          i.resolve(e, t);
        }
      });
    } else {
      (0, o.move)(e, {
        left: r
      });
      i.resolve();
    }
    return i.promise();
  },
  _swipeStartHandler: function (e) {
    this._itemElementWidth = (0, i.getWidth)(e);
    return true;
  },
  _swipeUpdateHandler: function (e, t) {
    this._renderItemPosition(e, t.offset);
    return true;
  },
  _swipeEndHandler: function (e, t) {
    var n = t.targetOffset;
    this._renderItemPosition(e, n, true).done(function (e, t) {
      if (Math.abs(t)) {
        this._list.deleteItem(e).fail(function () {
          this._renderItemPosition(e, 0, true);
        }.bind(this));
      }
    }.bind(this));
    return true;
  }
}));