exports.default = undefined;
var i = p(require("./68374.js"));
var o = p(require("./55994.js"));
var a = require("./95429.js");
var r = require("./39611.js");
var s = require("./31648.js");
var l = p(require("./20530.js"));
var u = p(require("./46743.js"));
var d = require("./37518.js");
var c = p(require("./9549.js"));
var h = p(require("./30963.js"));
var f = require("./58664.js");
function p(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
function g(e, t) {
  return (g = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (e, t) {
    e.__proto__ = t;
    return e;
  })(e, t);
}
var m = (0, r.addNamespace)("keydown", "dxHtmlResizingModule");
var _ = (0, r.addNamespace)("scroll", "dxHtmlResizingModule");
var v = (0, r.addNamespace)("mousedown", "dxHtmlResizingModule");
var y = function (e) {
  var t;
  var n;
  function h(t, n) {
    var i;
    (i = e.call(this, t, n) || this).allowedTargets = n.allowedTargets || ["image"];
    i.enabled = !!n.enabled;
    i._hideFrameWithContext = i.hideFrame.bind(function (e) {
      if (e === undefined) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      }
      return e;
    }(i));
    i._framePositionChangedHandler = i._prepareFramePositionChangedHandler();
    if (i.enabled) {
      i._attachEvents();
      i._createResizeFrame();
    }
    return i;
  }
  n = e;
  (t = h).prototype = Object.create(n.prototype);
  t.prototype.constructor = t;
  g(t, n);
  var p = h.prototype;
  p._attachEvents = function () {
    o.default.on(this.quill.root, (0, r.addNamespace)(a.name, "dxHtmlResizingModule"), this._clickHandler.bind(this));
    o.default.on(this.quill.root, _, this._framePositionChangedHandler);
    this.editorInstance.on("focusOut", this._hideFrameWithContext);
    this.quill.on("text-change", this._framePositionChangedHandler);
  };
  p._detachEvents = function () {
    o.default.off(this.quill.root, "dxHtmlResizingModule");
    this.editorInstance.off("focusOut", this._hideFrameWithContext);
    this.quill.off("text-change", this._framePositionChangedHandler);
  };
  p._clickHandler = function (e) {
    if (this._isAllowedTarget(e.target)) {
      if (this._$target === e.target) {
        return;
      }
      this._$target = e.target;
      var t = (0, i.default)(this._$target);
      var n = Math.max((0, f.getOuterWidth)(t) - (0, f.getWidth)(t), this.resizable.option("minWidth"));
      var o = Math.max((0, f.getOuterHeight)(t) - (0, f.getHeight)(t), this.resizable.option("minHeight"));
      this.resizable.option({
        minWidth: n,
        minHeight: o
      });
      this.updateFramePosition();
      this.showFrame();
      this._adjustSelection();
    } else if (this._$target) {
      this.hideFrame();
    }
  };
  p._prepareFramePositionChangedHandler = function (e) {
    var t = this;
    return function () {
      if (t._$target) {
        t.updateFramePosition();
      }
    };
  };
  p._adjustSelection = function () {
    if (!this.quill.getSelection()) {
      this.quill.setSelection(0, 0);
    }
  };
  p._isAllowedTarget = function (e) {
    return this._isImage(e);
  };
  p._isImage = function (e) {
    return this.allowedTargets.indexOf("image") !== -1 && e.tagName.toUpperCase() === "IMG";
  };
  p.showFrame = function () {
    this._$resizeFrame.show();
    o.default.on(this.quill.root, m, this._handleFrameKeyDown.bind(this));
  };
  p._handleFrameKeyDown = function (e) {
    var t = (0, r.normalizeKeyName)(e);
    if (t === "del" || t === "backspace") {
      this._deleteImage();
    }
    this.hideFrame();
  };
  p.hideFrame = function () {
    this._$target = null;
    this._$resizeFrame.hide();
    o.default.off(this.quill.root, m);
  };
  p.updateFramePosition = function () {
    var e = (0, d.getBoundingRect)(this._$target);
    var t = e.height;
    var n = e.width;
    var i = e.top;
    var o = e.left;
    var a = (0, d.getBoundingRect)(this.quill.root);
    var r = a.top;
    var l = a.left;
    var u = this._getBorderWidth();
    this._$resizeFrame.css({
      height: t,
      width: n,
      padding: 1,
      top: i - r - u - 1,
      left: o - l - u - 1
    });
    (0, s.move)(this._$resizeFrame, {
      left: 0,
      top: 0
    });
  };
  p._getBorderWidth = function () {
    return parseInt(this._$resizeFrame.css("borderTopWidth"));
  };
  p._createResizeFrame = function () {
    var e = this;
    if (!this._$resizeFrame) {
      var t = l.default.current().deviceType;
      this._$resizeFrame = (0, i.default)("<div>").addClass("dx-resize-frame").toggleClass("dx-touch-device", t !== "desktop").appendTo(this.editorInstance._getQuillContainer()).hide();
      o.default.on(this._$resizeFrame, v, function (e) {
        e.preventDefault();
      });
      this.resizable = this.editorInstance._createComponent(this._$resizeFrame, u.default, {
        onResize: function (t) {
          if (e._$target) {
            (0, i.default)(e._$target).attr({
              height: t.height,
              width: t.width
            });
            e.updateFramePosition();
          }
        }
      });
    }
  };
  p._deleteImage = function () {
    var e;
    if (this._isAllowedTarget(this._$target)) {
      if ((e = c.default.find(this._$target)) !== null && e !== undefined) {
        e.deleteAt(0);
      }
    }
  };
  p.option = function (e, t) {
    if (e !== "mediaResizing") {
      if (e === "enabled") {
        this.enabled = t;
        if (t) {
          this._attachEvents();
        } else {
          this._detachEvents();
        }
      } else if (e === "allowedTargets" && Array.isArray(t)) {
        this.allowedTargets = t;
      }
    } else {
      this.handleOptionChangeValue(t);
    }
  };
  p.clean = function () {
    this._detachEvents();
    this._$resizeFrame.remove();
    this._$resizeFrame = undefined;
  };
  return h;
}(h.default);
exports.default = y;
module.exports = exports.default;
module.exports.default = exports.default;