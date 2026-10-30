exports.default = undefined;
var i = m(require("./68374.js"));
var o = m(require("./55994.js"));
var a = require("./20576.js");
var r = require("./58201.js");
var s = m(require("./99393.js"));
var l = require("./13306.js");
var u = require("./35922.js");
var d = require("./39611.js");
var c = m(require("./93786.js"));
var h = m(require("./37334.js"));
var f = require("./58664.js");
var p = require("./51203.js");
var g = m(require("./29837.js"));
function m(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
var _ = g.default.inherit({
  _getDefaultOptions: function () {
    return (0, l.extend)(this.callBase(), {
      spellcheck: true,
      minHeight: undefined,
      maxHeight: undefined,
      autoResizeEnabled: false
    });
  },
  _initMarkup: function () {
    this.$element().addClass("dx-textarea");
    this.callBase();
    this.setAria("multiline", "true");
  },
  _renderContentImpl: function () {
    this._updateInputHeight();
    this.callBase();
  },
  _renderInput: function () {
    this.callBase();
    this._renderScrollHandler();
  },
  _createInput: function () {
    var e = (0, i.default)("<textarea>");
    this._applyInputAttributes(e, this.option("inputAttr"));
    this._updateInputAutoResizeAppearance(e);
    return e;
  },
  _applyInputAttributes: function (e, t) {
    e.attr(t).addClass("dx-texteditor-input");
  },
  _renderScrollHandler: function () {
    this._eventY = 0;
    var e = this._input();
    var t = (0, p.prepareScrollData)(e, true);
    o.default.on(e, (0, d.addNamespace)(h.default.init, this.NAME), t, a.noop);
    o.default.on(e, (0, d.addNamespace)(c.default.down, this.NAME), this._pointerDownHandler.bind(this));
    o.default.on(e, (0, d.addNamespace)(c.default.move, this.NAME), this._pointerMoveHandler.bind(this));
  },
  _pointerDownHandler: function (e) {
    this._eventY = (0, d.eventData)(e).y;
  },
  _pointerMoveHandler: function (e) {
    var t = (0, d.eventData)(e).y;
    var n = this._eventY - t;
    if ((0, p.allowScroll)(this._input(), n)) {
      e.isScrollingEvent = true;
      e.stopPropagation();
    }
    this._eventY = t;
  },
  _renderDimensions: function () {
    var e = this.$element();
    var t = e.get(0);
    var n = this._getOptionValue("width", t);
    var i = this._getOptionValue("height", t);
    var o = this.option("minHeight");
    var a = this.option("maxHeight");
    e.css({
      minHeight: o !== undefined ? o : "",
      maxHeight: a !== undefined ? a : "",
      width: n,
      height: i
    });
  },
  _resetDimensions: function () {
    this.$element().css({
      height: "",
      minHeight: "",
      maxHeight: ""
    });
  },
  _renderEvents: function () {
    if (this.option("autoResizeEnabled")) {
      o.default.on(this._input(), (0, d.addNamespace)("input paste", this.NAME), this._updateInputHeight.bind(this));
    }
    this.callBase();
  },
  _refreshEvents: function () {
    o.default.off(this._input(), (0, d.addNamespace)("input paste", this.NAME));
    this.callBase();
  },
  _getHeightDifference: function (e) {
    return (0, f.getVerticalOffsets)(this._$element.get(0), false) + (0, f.getVerticalOffsets)(this._$textEditorContainer.get(0), false) + (0, f.getVerticalOffsets)(this._$textEditorInputContainer.get(0), false) + (0, f.getElementBoxParams)("height", (0, r.getWindow)().getComputedStyle(e.get(0))).margin;
  },
  _updateInputHeight: function () {
    if ((0, r.hasWindow)()) {
      var e = this._input();
      var t = this.option("height");
      var n = t === undefined && this.option("autoResizeEnabled");
      if (n || t === undefined && this.option("minHeight")) {
        this._resetDimensions();
        this._$element.css("height", (0, f.getOuterHeight)(this._$element));
        e.css("height", 0);
        var i = this._getHeightDifference(e);
        this._renderDimensions();
        var o = this._getBoundaryHeight("minHeight");
        var a = this._getBoundaryHeight("maxHeight");
        var s = e[0].scrollHeight;
        if (o !== undefined) {
          s = Math.max(s, o - i);
        }
        if (a !== undefined) {
          var l = a - i;
          var u = s > l;
          s = Math.min(s, l);
          this._updateInputAutoResizeAppearance(e, !u);
        }
        e.css("height", s);
        if (n) {
          this._$element.css("height", "auto");
        }
      } else {
        e.css("height", "");
      }
    }
  },
  _getBoundaryHeight: function (e) {
    var t = this.option(e);
    if ((0, u.isDefined)(t)) {
      if (typeof t == "number") {
        return t;
      } else {
        return (0, f.parseHeight)(t, this.$element().get(0).parentElement, this._$element.get(0));
      }
    }
  },
  _renderInputType: a.noop,
  _visibilityChanged: function (e) {
    if (e) {
      this._updateInputHeight();
    }
  },
  _updateInputAutoResizeAppearance: function (e, t) {
    if (e) {
      var n = (0, a.ensureDefined)(t, this.option("autoResizeEnabled"));
      e.toggleClass("dx-texteditor-input-auto-resize", n);
    }
  },
  _dimensionChanged: function () {
    if (this.option("visible")) {
      this._updateInputHeight();
    }
  },
  _optionChanged: function (e) {
    switch (e.name) {
      case "autoResizeEnabled":
        this._updateInputAutoResizeAppearance(this._input(), e.value);
        this._refreshEvents();
        this._updateInputHeight();
        break;
      case "value":
      case "height":
        this.callBase(e);
        this._updateInputHeight();
        break;
      case "minHeight":
      case "maxHeight":
        this._renderDimensions();
        this._updateInputHeight();
        break;
      case "visible":
        this.callBase(e);
        if (e.value) {
          this._updateInputHeight();
        }
        break;
      default:
        this.callBase(e);
    }
  }
});
(0, s.default)("dxTextArea", _);
var v = _;
exports.default = v;
module.exports = exports.default;
module.exports.default = exports.default;