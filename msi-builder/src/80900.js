exports.default = undefined;
var i = r(require("./9549.js"));
var o = r(require("./30963.js"));
var a = r(require("./55994.js"));
function r(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
function s(e, t) {
  return (s = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (e, t) {
    e.__proto__ = t;
    return e;
  })(e, t);
}
var l = (0, require("./39611.js").addNamespace)("dxclick", "dxHtmlEditorImageCursor");
var u = o.default;
if (i.default) {
  u = function (e) {
    var t;
    var n;
    function i(t, n) {
      var i;
      (i = e.call(this, t, n) || this).addCleanCallback(i.clean.bind(function (e) {
        if (e === undefined) {
          throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }
        return e;
      }(i)));
      i._attachEvents();
      return i;
    }
    n = e;
    (t = i).prototype = Object.create(n.prototype);
    t.prototype.constructor = t;
    s(t, n);
    var o = i.prototype;
    o._attachEvents = function () {
      a.default.on(this.quill.root, l, this._clickHandler.bind(this));
    };
    o._detachEvents = function () {
      a.default.off(this.quill.root, l);
    };
    o._clickHandler = function (e) {
      if (this._isAllowedTarget(e.target)) {
        this._adjustSelection(e);
      }
    };
    o._isAllowedTarget = function (e) {
      return this._isImage(e);
    };
    o._isImage = function (e) {
      return e.tagName.toUpperCase() === "IMG";
    };
    o._adjustSelection = function (e) {
      var t = this.quill.scroll.find(e.target);
      if (t) {
        var n = t.offset(this.quill.scroll);
        this.quill.setSelection(n + 1, 0);
      } else {
        this.quill.setSelection(0, 0);
      }
    };
    o.clean = function () {
      this._detachEvents();
    };
    return i;
  }(o.default);
}
var d = u;
exports.default = d;
module.exports = exports.default;
module.exports.default = exports.default;