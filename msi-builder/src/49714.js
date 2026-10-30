exports.default = undefined;
var i = u(require("./68374.js"));
var o = u(require("./55994.js"));
var a = u(require("./11483.js"));
var r = require("./39611.js");
var s = u(require("./93786.js"));
var l = require("./95429.js");
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
var c = s.default.down;
var h = function (e) {
  var t;
  var n;
  function a() {
    return e.apply(this, arguments) || this;
  }
  n = e;
  (t = a).prototype = Object.create(n.prototype);
  t.prototype.constructor = t;
  d(t, n);
  var s = a.prototype;
  s._create = function () {
    var e = (0, i.default)("<span>").addClass("dx-clear-button-area").append((0, i.default)("<span>").addClass("dx-icon").addClass("dx-icon-clear"));
    this._addToContainer(e);
    this.update(true);
    return {
      instance: e,
      $element: e
    };
  };
  s._isVisible = function () {
    return this.editor._isClearButtonVisible();
  };
  s._attachEvents = function (e, t) {
    var n = this.editor;
    var i = n.NAME;
    o.default.on(t, (0, r.addNamespace)(c, i), function (e) {
      e.preventDefault();
      if (e.pointerType !== "mouse") {
        n._clearValueHandler(e);
      }
    });
    o.default.on(t, (0, r.addNamespace)(l.name, i), function (e) {
      return n._clearValueHandler(e);
    });
  };
  s._legacyRender = function (e, t) {
    e.toggleClass("dx-show-clear-button", t);
  };
  s.update = function (t = false) {
    if (!t) {
      e.prototype.update.call(this);
    }
    var n = this.editor;
    var i = this.instance;
    var o = n.$element();
    var a = this._isVisible();
    if (i) {
      i.toggleClass("dx-state-invisible", !a);
    }
    this._legacyRender(o, a);
  };
  return a;
}(a.default);
exports.default = h;
module.exports = exports.default;
module.exports.default = exports.default;