exports.default = undefined;
var i = require("./58664.js");
var o = u(require("./68374.js"));
var a = u(require("./14390.js"));
var r = u(require("./4741.js"));
var s = require("./28580.js");
var l = require("./348.js");
function u(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
function d(e, t) {
  return (d = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (e, t) {
    e.__proto__ = t;
    return e;
  })(e, t);
}
var c = function (e) {
  var t;
  var n;
  function a() {
    return e.apply(this, arguments) || this;
  }
  n = e;
  (t = a).prototype = Object.create(n.prototype);
  t.prototype.constructor = t;
  d(t, n);
  var u = a.prototype;
  u._init = function () {
    e.prototype._init.call(this);
    var t = (0, l.getDiagram)().EventDispatcher;
    this.onScroll = new t();
    this._createOnCreateDiagramAction();
  };
  u._initMarkup = function () {
    var t = this;
    e.prototype._initMarkup.call(this);
    var n = (0, o.default)("<div>").appendTo(this.$element());
    var i = {
      direction: "both",
      bounceEnabled: false,
      scrollByContent: false,
      onScroll: function (e) {
        var n = e.scrollOffset;
        t._raiseOnScroll(n.left, n.top);
      }
    };
    var a = this.option("useNativeScrolling");
    if (a !== undefined) {
      i.useNative = a;
    }
    this._scrollView = this._createComponent(n, r.default, i);
    this._onCreateDiagramAction({
      $parent: (0, o.default)(this._scrollView.content()),
      scrollView: this
    });
  };
  u.setScroll = function (e, t) {
    this._scrollView.scrollTo({
      left: e,
      top: t
    });
    this._raiseOnScrollWithoutPoint();
  };
  u.offsetScroll = function (e, t) {
    this._scrollView.scrollBy({
      left: e,
      top: t
    });
    this._raiseOnScrollWithoutPoint();
  };
  u.getSize = function () {
    var e = (0, l.getDiagram)().Size;
    var t = this._scrollView.$element();
    return new e(Math.floor((0, i.getWidth)(t)), Math.floor((0, i.getHeight)(t)));
  };
  u.getScrollContainer = function () {
    return this._scrollView.$element()[0];
  };
  u.getScrollBarWidth = function () {
    if (this.option("useNativeScrolling")) {
      return (0, s.calculateScrollbarWidth)();
    } else {
      return 0;
    }
  };
  u.detachEvents = function () {};
  u._raiseOnScroll = function (e, t) {
    var n = (0, l.getDiagram)().Point;
    this.onScroll.raise("notifyScrollChanged", function () {
      return new n(e, t);
    });
  };
  u._raiseOnScrollWithoutPoint = function () {
    var e = this;
    var t = (0, l.getDiagram)().Point;
    this.onScroll.raise("notifyScrollChanged", function () {
      return new t(e._scrollView.scrollLeft(), e._scrollView.scrollTop());
    });
  };
  u._createOnCreateDiagramAction = function () {
    this._onCreateDiagramAction = this._createActionByOption("onCreateDiagram");
  };
  u._optionChanged = function (t) {
    switch (t.name) {
      case "onCreateDiagram":
        this._createOnCreateDiagramAction();
        break;
      case "useNativeScrolling":
        break;
      default:
        e.prototype._optionChanged.call(this, t);
    }
  };
  return a;
}(a.default);
exports.default = c;
module.exports = exports.default;
module.exports.default = exports.default;