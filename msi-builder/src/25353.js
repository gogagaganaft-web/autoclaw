exports.default = undefined;
var i = d(require("./68374.js"));
var o = d(require("./55994.js"));
var a = d(require("./11483.js"));
var r = d(require("./30306.js"));
var s = require("./39611.js");
var l = d(require("./93786.js"));
var u = require("./13306.js");
function d(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
function c(e, t) {
  return (c = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (e, t) {
    e.__proto__ = t;
    return e;
  })(e, t);
}
var h = function (e) {
  var t;
  var n;
  function a() {
    return e.apply(this, arguments) || this;
  }
  n = e;
  (t = a).prototype = Object.create(n.prototype);
  t.prototype.constructor = t;
  c(t, n);
  var d = a.prototype;
  d._attachEvents = function (e, t) {
    var n = this.editor;
    var i = (0, s.addNamespace)(l.default.down, n.NAME);
    var a = t.children();
    var u = n._createAction(function (e) {
      return n._spinButtonsPointerDownHandler(e);
    });
    o.default.off(t, i);
    o.default.on(t, i, function (e) {
      return u({
        event: e
      });
    });
    r.default.getInstance(a.eq(0)).option("onChange", function (e) {
      return n._spinUpChangeHandler(e);
    });
    r.default.getInstance(a.eq(1)).option("onChange", function (e) {
      return n._spinDownChangeHandler(e);
    });
  };
  d._create = function () {
    var e = this.editor;
    var t = (0, i.default)("<div>").addClass("dx-numberbox-spin-container");
    var n = (0, i.default)("<div>").appendTo(t);
    var o = (0, i.default)("<div>").appendTo(t);
    var a = this._getOptions();
    this._addToContainer(t);
    e._createComponent(n, r.default, (0, u.extend)({
      direction: "up"
    }, a));
    e._createComponent(o, r.default, (0, u.extend)({
      direction: "down"
    }, a));
    this._legacyRender(e.$element(), this._isTouchFriendly(), a.visible);
    return {
      instance: t,
      $element: t
    };
  };
  d._getOptions = function () {
    var e = this.editor;
    return {
      visible: this._isVisible(),
      disabled: e.option("disabled")
    };
  };
  d._isVisible = function () {
    var t = this.editor;
    return e.prototype._isVisible.call(this) && t.option("showSpinButtons");
  };
  d._isTouchFriendly = function () {
    var e = this.editor;
    return e.option("showSpinButtons") && e.option("useLargeSpinButtons");
  };
  d._legacyRender = function (e, t, n) {
    e.toggleClass("dx-numberbox-spin-touch-friendly", t);
    e.toggleClass("dx-numberbox-spin", n);
  };
  d.update = function () {
    if (e.prototype.update.call(this)) {
      var t = this.editor;
      var n = this.instance;
      var i = t.$element();
      var o = this._isVisible();
      var a = this._isTouchFriendly();
      var s = n.children();
      var l = r.default.getInstance(s.eq(0));
      var u = r.default.getInstance(s.eq(1));
      var d = this._getOptions();
      l.option(d);
      u.option(d);
      this._legacyRender(i, a, o);
    }
  };
  return a;
}(a.default);
exports.default = h;
module.exports = exports.default;
module.exports.default = exports.default;