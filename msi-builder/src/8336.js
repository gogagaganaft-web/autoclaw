exports.default = undefined;
var i = require("./58664.js");
var o = d(require("./68374.js"));
var a = d(require("./99393.js"));
var r = d(require("./89799.js"));
var s = require("./13306.js");
var l = require("./68752.js");
var u = require("./37518.js");
function d(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
function c() {
  return (c = Object.assign ? Object.assign.bind() : function (e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var i in n) {
        if (Object.prototype.hasOwnProperty.call(n, i)) {
          e[i] = n[i];
        }
      }
    }
    return e;
  }).apply(this, arguments);
}
var h = r.default.inherit({
  _getDefaultOptions: function () {
    return (0, s.extend)(this.callBase(), {
      integrationOptions: {},
      templatesRenderAsynchronously: false,
      shading: false,
      width: "auto",
      height: "auto",
      hideOnOutsideClick: false,
      animation: null,
      visible: true,
      propagateOutsideClick: true,
      _checkParentVisibility: false,
      rtlEnabled: false,
      contentTemplate: this._renderInnerHtml,
      maxWidth: "100%",
      container: this.$element(),
      target: undefined,
      mode: "auto",
      validationErrors: undefined,
      preventScrollEvents: false,
      positionSide: "top",
      boundary: undefined,
      offset: {
        h: 0,
        v: 0
      },
      contentId: undefined
    });
  },
  _init: function () {
    this.callBase();
    this.updateMaxWidth();
    this._updatePosition();
  },
  _initMarkup: function () {
    this.callBase();
    this._ensureMessageNotEmpty();
    this._updatePositionByTarget();
    this._toggleModeClass();
    this._updateContentId();
  },
  _updatePositionByTarget: function () {
    var e = this.option().target;
    this.option("position.of", e);
  },
  _ensureMessageNotEmpty: function () {
    this._textMarkup = this._getTextMarkup();
    var e = this.option("visible") && this._textMarkup;
    this._toggleVisibilityClasses(e);
  },
  _toggleVisibilityClasses: function (e) {
    if (e) {
      this.$element().addClass("dx-invalid-message");
      this.$wrapper().addClass("dx-invalid-message");
    } else {
      this.$element().removeClass("dx-invalid-message");
      this.$wrapper().removeClass("dx-invalid-message");
    }
  },
  _updateContentId: function () {
    var e = this.option();
    var t = e.container;
    var n = e.contentId;
    var i = n ?? (0, o.default)(t).attr("aria-describedby");
    this.$content().addClass("dx-invalid-message-content").attr("id", i);
  },
  _renderInnerHtml: function (e) {
    var t = e && (0, o.default)(e);
    if (t != null) {
      t.html(this._textMarkup);
    }
  },
  _getTextMarkup: function () {
    var t = this.option("validationErrors") ?? [];
    var n = "";
    t.forEach(function (e) {
      n += (n ? "<br />" : "") + (0, l.encodeHtml)((e == null ? undefined : e.message) ?? "");
    });
    return n;
  },
  _toggleModeClass: function () {
    var e = this.option("mode");
    this.$wrapper().toggleClass("dx-invalid-message-auto", e === "auto").toggleClass("dx-invalid-message-always", e === "always");
  },
  updateMaxWidth: function () {
    var e = this.option("target");
    var t = (0, i.getOuterWidth)(e);
    var n = "100%";
    if (t) {
      n = Math.max(t, 100);
    }
    this.option({
      maxWidth: n
    });
  },
  _getPositionsArray: function (e, t) {
    switch (e) {
      case "top":
        return [`${t} bottom`, `${t} top`];
      case "left":
        return ["right", "left"];
      case "right":
        return ["left", "right"];
      default:
        return [`${t} top`, `${t} bottom`];
    }
  },
  _updatePosition: function () {
    var e = this.option();
    var t = e.positionSide;
    var n = e.rtlEnabled;
    var i = e.offset;
    var o = e.boundary;
    var a = (0, u.getDefaultAlignment)(n);
    var r = this._getPositionsArray(t, a);
    var s = c({}, i);
    this.$element().addClass(`dx-invalid-message-${t}`);
    if (n && t !== "left" && t !== "right") {
      s.h = -s.h;
    }
    if (t === "top") {
      s.v = -s.v;
    }
    if (t === "left") {
      s.h = -s.h;
    }
    this.option("position", {
      offset: s,
      boundary: o,
      my: r[0],
      at: r[1],
      collision: "none flip"
    });
  },
  _optionChanged: function (e) {
    var t = e.name;
    var n = e.value;
    var i = e.previousValue;
    switch (t) {
      case "target":
        this._updatePositionByTarget();
        this.updateMaxWidth();
        this.callBase(e);
        break;
      case "boundary":
        this.option("position.boundary", n);
        break;
      case "mode":
        this._toggleModeClass(n);
        break;
      case "rtlEnabled":
      case "offset":
      case "positionSide":
        this.$element().removeClass(`dx-invalid-message-${i}`);
        this._updatePosition();
        break;
      case "container":
        this._updateContentId();
        this.callBase(e);
        break;
      case "contentId":
        this._updateContentId();
        break;
      case "validationErrors":
        this._ensureMessageNotEmpty();
        this._renderInnerHtml(this.$content());
        break;
      default:
        this.callBase(e);
    }
  }
});
(0, a.default)("dxValidationMessage", h);
var f = h;
exports.default = f;
module.exports = exports.default;
module.exports.default = exports.default;