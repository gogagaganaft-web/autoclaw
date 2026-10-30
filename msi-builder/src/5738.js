exports.default = undefined;
var i = require("./58664.js");
var o = require("./68890.js");
var a = c(require("./39725.js"));
var r = c(require("./68374.js"));
var s = require("./31648.js");
var l = c(require("./89799.js"));
var u = require("./20576.js");
var d = require("./78008.js");
function c(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
function h(e, t) {
  return (h = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (e, t) {
    e.__proto__ = t;
    return e;
  })(e, t);
}
var f = function (e) {
  var t;
  var n;
  function a() {
    return e.apply(this, arguments) || this;
  }
  n = e;
  (t = a).prototype = Object.create(n.prototype);
  t.prototype.constructor = t;
  h(t, n);
  var c = a.prototype;
  c.renderPanelContent = function (e) {
    var t = this;
    delete this._initialPosition;
    var n = this.getDrawerInstance();
    var i = n.option();
    var o = i.opened;
    var a = i.minSize;
    n._overlay = n._createComponent(n.content(), l.default, {
      shading: false,
      container: n.content(),
      visualContainer: n.getOverlayTarget(),
      position: this._getOverlayPosition(),
      width: o ? "auto" : a || 0,
      height: "100%",
      templatesRenderAsynchronously: n.option("templatesRenderAsynchronously"),
      animation: {
        show: {
          duration: 0
        }
      },
      onPositioned: function (e) {
        this._fixOverlayPosition(e.component.$content());
      }.bind(this),
      contentTemplate: n.option("template"),
      onContentReady: function (n) {
        e.resolve();
        t._processOverlayZIndex(n.component.content());
      },
      visible: true,
      propagateOutsideClick: true
    });
  };
  c._fixOverlayPosition = function (e) {
    var t = (0, u.ensureDefined)(this._initialPosition, {
      left: 0,
      top: 0
    });
    (0, s.move)(e, t);
    if (this.getDrawerInstance().calcTargetPosition() === "right") {
      e.css("left", "auto");
    }
    if (this.getDrawerInstance().calcTargetPosition() === "bottom") {
      e.css("top", "auto");
      e.css("bottom", "0px");
    }
  };
  c._getOverlayPosition = function () {
    var e = this.getDrawerInstance();
    var t = e.calcTargetPosition();
    var n = {};
    switch (t) {
      case "left":
        n = {
          my: "top left",
          at: "top left"
        };
        break;
      case "right":
        n = {
          my: e.option("rtlEnabled") ? "top left" : "top right",
          at: "top right"
        };
        break;
      case "top":
      case "bottom":
        n = {
          my: t,
          at: t
        };
    }
    n.of = e.getOverlayTarget();
    return n;
  };
  c.refreshPanelElementSize = function (e) {
    var t = this.getDrawerInstance();
    var n = t.getOverlay();
    if (t.isHorizontalDirection()) {
      n.option("height", "100%");
      n.option("width", e ? t.getRealPanelWidth() : this._getPanelSize(t.option("opened")));
    } else {
      n.option("width", (0, i.getWidth)(t.getOverlayTarget()));
      n.option("height", e ? t.getRealPanelHeight() : this._getPanelSize(t.option("opened")));
    }
  };
  c.onPanelContentRendered = function () {
    this._updateViewContentStyles();
  };
  c._updateViewContentStyles = function () {
    var e = this.getDrawerInstance();
    (0, r.default)(e.viewContent()).css("padding" + (0, d.camelize)(e.calcTargetPosition(), true), e.option("minSize"));
    (0, r.default)(e.viewContent()).css("transform", "inherit");
  };
  c._internalRenderPosition = function (e, t) {
    var n = this.getDrawerInstance();
    var i = (0, r.default)(n.content());
    var a = n.getOverlay().$content();
    var l = n.option("revealMode");
    var u = n.calcTargetPosition();
    var d = this._getPanelSize(n.option("opened"));
    var c = this._getPanelOffset(n.option("opened")) * n._getPositionCorrection();
    var h = n.getRealPanelHeight() - d;
    this._updateViewContentStyles();
    if (e) {
      if (l === "slide") {
        this._initialPosition = n.isHorizontalDirection() ? {
          left: c
        } : {
          top: c
        };
        o.animation.moveTo({
          complete: function () {
            t.resolve();
          },
          duration: n.option("animationDuration"),
          direction: u,
          $element: i,
          position: c
        });
      } else if (l === "expand") {
        this._initialPosition = {
          left: 0
        };
        (0, s.move)(a, this._initialPosition);
        o.animation.size({
          complete: function () {
            t.resolve();
          },
          duration: n.option("animationDuration"),
          direction: u,
          $element: a,
          size: d,
          marginTop: h
        });
      }
    } else if (l === "slide") {
      this._initialPosition = n.isHorizontalDirection() ? {
        left: c
      } : {
        top: c
      };
      (0, s.move)(i, this._initialPosition);
    } else if (l === "expand") {
      this._initialPosition = {
        left: 0
      };
      (0, s.move)(a, this._initialPosition);
      if (n.isHorizontalDirection()) {
        (0, r.default)(a).css("width", d);
      } else {
        (0, r.default)(a).css("height", d);
        if (u === "bottom") {
          (0, r.default)(a).css("marginTop", h);
        }
      }
    }
  };
  c.getPanelContent = function () {
    return (0, r.default)(this.getDrawerInstance().getOverlay().content());
  };
  c._processOverlayZIndex = function (e) {
    var t = (0, r.default)(e).get(0).style.zIndex || 1;
    this.getDrawerInstance().setZIndex(t);
  };
  c.isViewContentFirst = function (e) {
    return e === "right" || e === "bottom";
  };
  return a;
}(a.default);
exports.default = f;
module.exports = exports.default;
module.exports.default = exports.default;