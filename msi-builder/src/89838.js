exports.default = undefined;
var i = require("./58664.js");
var o = y(require("./68374.js"));
var a = y(require("./55994.js"));
var r = require("./31648.js");
var s = require("./13306.js");
var l = y(require("./52752.js"));
var u = y(require("./28109.js"));
var d = y(require("./20530.js"));
var c = y(require("./99393.js"));
var h = y(require("./96452.js"));
var f = y(require("./34171.js"));
var p = y(require("./29837.js"));
var g = y(require("./42160.js"));
var m = require("./39611.js");
var _ = require("./95429.js");
var v = y(require("./73176.js"));
function y(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
var b = "dx-colorview-palette-gradient";
var x = "dx-colorview-palette-gradient-white";
var w = "dx-colorview-palette-gradient-black";
var C = "dx-colorview-color-preview";
var S = "dx-colorview-color-preview-color-current";
var k = "dx-colorview-color-preview-color-new";
var D = h.default.inherit({
  _supportedKeys: function () {
    var e = this.option("rtlEnabled");
    var t = this;
    function n(e) {
      var n = 100 / t._paletteWidth;
      if (e.shiftKey) {
        n *= t.option("keyStep");
      }
      n = n > 1 ? n : 1;
      return Math.round(n);
    }
    function i(e) {
      var n = t._currentColor.hsv.s + e;
      if (n > 100) {
        n = 100;
      } else if (n < 0) {
        n = 0;
      }
      t._currentColor.hsv.s = n;
      l();
    }
    function o(e) {
      var n = 100 / t._paletteHeight;
      if (e.shiftKey) {
        n *= t.option("keyStep");
      }
      n = n > 1 ? n : 1;
      return Math.round(n);
    }
    function a(e) {
      var n = t._currentColor.hsv.v + e;
      if (n > 100) {
        n = 100;
      } else if (n < 0) {
        n = 0;
      }
      t._currentColor.hsv.v = n;
      l();
    }
    function l() {
      t._placePaletteHandle();
      t._updateColorFromHsv(t._currentColor.hsv.h, t._currentColor.hsv.s, t._currentColor.hsv.v);
    }
    function u(e) {
      var n = 360 / (t._hueScaleWrapperHeight - t._hueScaleHandleHeight);
      if (e.shiftKey) {
        n *= t.option("keyStep");
      }
      return n = n > 1 ? n : 1;
    }
    function d(e) {
      t._currentColor.hsv.h += e;
      t._placeHueScaleHandle();
      var n = (0, r.locate)(t._$hueScaleHandle);
      t._updateColorHue(n.top + t._hueScaleHandleHeight / 2);
    }
    function c(n) {
      var i = 1 / t._alphaChannelScaleWorkWidth;
      if (n.shiftKey) {
        i *= t.option("keyStep");
      }
      i = i > 0.01 ? i : 0.01;
      return i = e ? -i : i;
    }
    function h(e) {
      t._currentColor.a += e;
      t._placeAlphaChannelHandle();
      var n = (0, r.locate)(t._$alphaChannelHandle);
      t._calculateColorTransparencyByScaleWidth(n.left + t._alphaChannelHandleWidth / 2);
    }
    return (0, s.extend)(this.callBase(), {
      upArrow: function (e) {
        e.preventDefault();
        e.stopPropagation();
        if ((0, m.isCommandKeyPressed)(e)) {
          if (this._currentColor.hsv.h <= 360 && !this._isTopColorHue) {
            this._saveValueChangeEvent(e);
            d(u(e));
          }
        } else if (this._currentColor.hsv.v < 100) {
          this._saveValueChangeEvent(e);
          a(o(e));
        }
      },
      downArrow: function (e) {
        e.preventDefault();
        e.stopPropagation();
        if ((0, m.isCommandKeyPressed)(e)) {
          if (this._currentColor.hsv.h >= 0) {
            if (this._isTopColorHue) {
              this._currentColor.hsv.h = 360;
            }
            this._saveValueChangeEvent(e);
            d(-u(e));
          }
        } else if (this._currentColor.hsv.v > 0) {
          this._saveValueChangeEvent(e);
          a(-o(e));
        }
      },
      rightArrow: function (t) {
        t.preventDefault();
        t.stopPropagation();
        if ((0, m.isCommandKeyPressed)(t)) {
          if (e ? this._currentColor.a < 1 : this._currentColor.a > 0 && this.option("editAlphaChannel")) {
            this._saveValueChangeEvent(t);
            h(-c(t));
          }
        } else if (this._currentColor.hsv.s < 100) {
          this._saveValueChangeEvent(t);
          i(n(t));
        }
      },
      leftArrow: function (t) {
        t.preventDefault();
        t.stopPropagation();
        if ((0, m.isCommandKeyPressed)(t)) {
          if (e ? this._currentColor.a > 0 : this._currentColor.a < 1 && this.option("editAlphaChannel")) {
            this._saveValueChangeEvent(t);
            h(c(t));
          }
        } else if (this._currentColor.hsv.s > 0) {
          this._saveValueChangeEvent(t);
          i(-n(t));
        }
      },
      enter: function (e) {
        this._fireEnterKeyPressed(e);
      }
    });
  },
  _getDefaultOptions: function () {
    return (0, s.extend)(this.callBase(), {
      value: null,
      matchValue: null,
      onEnterKeyPressed: undefined,
      editAlphaChannel: false,
      keyStep: 1,
      stylingMode: undefined
    });
  },
  _defaultOptionsRules: function () {
    return this.callBase().concat([{
      device: function () {
        return d.default.real().deviceType === "desktop" && !d.default.isSimulator();
      },
      options: {
        focusStateEnabled: true
      }
    }]);
  },
  _init: function () {
    this.callBase();
    this._initColorAndOpacity();
    this._initEnterKeyPressedAction();
  },
  _initEnterKeyPressedAction: function () {
    this._onEnterKeyPressedAction = this._createActionByOption("onEnterKeyPressed");
  },
  _fireEnterKeyPressed: function (e) {
    if (this._onEnterKeyPressedAction) {
      this._onEnterKeyPressedAction({
        event: e
      });
    }
  },
  _initColorAndOpacity: function () {
    this._setCurrentColor(this.option("value"));
  },
  _setCurrentColor: function (e) {
    e = e || "#000000";
    var t = new l.default(e);
    if (t.colorIsInvalid) {
      this._currentColor ||= new l.default("#000000");
      this.option("value", this._currentColor.baseColor);
    } else if (!this._currentColor || this._makeRgba(this._currentColor) !== this._makeRgba(t)) {
      this._currentColor = t;
      if (this._$currentColor) {
        this._makeTransparentBackground(this._$currentColor, t);
      }
    }
  },
  _setBaseColor: function (e) {
    var t = e || "#000000";
    var n = new l.default(t);
    if (!n.colorIsInvalid) {
      if (this._makeRgba(this.option("matchValue") !== this._makeRgba(n)) && this._$baseColor) {
        this._makeTransparentBackground(this._$baseColor, n);
      }
    }
  },
  _initMarkup: function () {
    this.callBase();
    this.$element().addClass("dx-colorview");
    this._renderColorPickerContainer();
  },
  _render: function () {
    this.callBase();
    this._renderPalette();
    this._renderHueScale();
    this._renderControlsContainer();
    this._renderControls();
    this._renderAlphaChannelElements();
  },
  _makeTransparentBackground: function (e, t) {
    if (!(t instanceof l.default)) {
      t = new l.default(t);
    }
    e.css("backgroundColor", this._makeRgba(t));
  },
  _makeRgba: function (e) {
    if (!(e instanceof l.default)) {
      e = new l.default(e);
    }
    return "rgba(" + [e.r, e.g, e.b, e.a].join(", ") + ")";
  },
  _renderValue: function () {
    this.callBase(this.option("editAlphaChannel") ? this._makeRgba(this._currentColor) : this.option("value"));
  },
  _renderColorPickerContainer: function () {
    var e = this.$element();
    this._$colorPickerContainer = (0, o.default)("<div>").addClass("dx-colorview-container").appendTo(e);
    this._renderHtmlRows();
  },
  _renderHtmlRows: function (e) {
    var t = this._$colorPickerContainer.find(".dx-colorview-container-row");
    var n = t.length;
    var i = n - (this.option("editAlphaChannel") ? 2 : 1);
    if (i > 0) {
      t.eq(-1).remove();
    }
    if (i < 0) {
      i = Math.abs(i);
      var a;
      var r = [];
      for (a = 0; a < i; a++) {
        r.push((0, o.default)("<div>").addClass("dx-colorview-container-row"));
      }
      if (n) {
        for (a = 0; a < r.length; a++) {
          t.eq(0).after(r[a]);
        }
      } else {
        this._$colorPickerContainer.append(r);
      }
    }
  },
  _renderHtmlCellInsideRow: function (e, t, n) {
    return (0, o.default)("<div>").addClass("dx-colorview-container-cell").addClass(n).appendTo(t.find(".dx-colorview-container-row").eq(e));
  },
  _renderPalette: function () {
    var e = this._renderHtmlCellInsideRow(0, this._$colorPickerContainer, "dx-colorview-palette-cell");
    var t = (0, o.default)("<div>").addClass([b, x].join(" "));
    var n = (0, o.default)("<div>").addClass([b, w].join(" "));
    this._$palette = (0, o.default)("<div>").addClass("dx-colorview-palette").css("backgroundColor", this._currentColor.getPureColor().toHex()).appendTo(e);
    this._paletteHeight = (0, i.getHeight)(this._$palette);
    this._paletteWidth = (0, i.getWidth)(this._$palette);
    this._renderPaletteHandle();
    this._$palette.append([t, n]);
  },
  _renderPaletteHandle: function () {
    var e = this;
    this._$paletteHandle = (0, o.default)("<div>").addClass("dx-colorview-palette-handle").appendTo(this._$palette);
    var t = {
      id: this.option("ariaId"),
      role: "application"
    };
    this.setAria(t, this._$paletteHandle);
    this._createComponent(this._$paletteHandle, g.default, {
      contentTemplate: null,
      boundary: this._$palette,
      allowMoveByClick: true,
      boundOffset: function () {
        return -this._paletteHandleHeight / 2;
      }.bind(this),
      onDragMove: function (t) {
        var n = t.event;
        var i = (0, r.locate)(e._$paletteHandle);
        e._updateByDrag = true;
        e._saveValueChangeEvent(n);
        e._updateColorFromHsv(e._currentColor.hsv.h, e._calculateColorSaturation(i), e._calculateColorValue(i));
      }
    });
    this._paletteHandleWidth = (0, i.getWidth)(this._$paletteHandle);
    this._paletteHandleHeight = (0, i.getHeight)(this._$paletteHandle);
    this._placePaletteHandle();
  },
  _placePaletteHandle: function () {
    (0, r.move)(this._$paletteHandle, {
      left: Math.round(this._paletteWidth * this._currentColor.hsv.s / 100 - this._paletteHandleWidth / 2),
      top: Math.round(this._paletteHeight - this._paletteHeight * this._currentColor.hsv.v / 100 - this._paletteHandleHeight / 2)
    });
  },
  _calculateColorValue: function (e) {
    var t = Math.floor(e.top + this._paletteHandleHeight / 2);
    return 100 - Math.round(t * 100 / this._paletteHeight);
  },
  _calculateColorSaturation: function (e) {
    var t = Math.floor(e.left + this._paletteHandleWidth / 2);
    return Math.round(t * 100 / this._paletteWidth);
  },
  _updateColorFromHsv: function (e, t, n) {
    var i = this._currentColor.a;
    this._currentColor = new l.default("hsv(" + [e, t, n].join(",") + ")");
    this._currentColor.a = i;
    this._updateColorParamsAndColorPreview();
    this.applyColor();
  },
  _renderHueScale: function () {
    var e = this._renderHtmlCellInsideRow(0, this._$colorPickerContainer, "dx-colorview-hue-scale-cell");
    this._$hueScaleWrapper = (0, o.default)("<div>").addClass("dx-colorview-hue-scale-wrapper").appendTo(e);
    this._$hueScale = (0, o.default)("<div>").addClass("dx-colorview-hue-scale").appendTo(this._$hueScaleWrapper);
    this._hueScaleHeight = (0, i.getHeight)(this._$hueScale);
    this._hueScaleWrapperHeight = (0, i.getOuterHeight)(this._$hueScaleWrapper);
    this._renderHueScaleHandle();
  },
  _renderHueScaleHandle: function () {
    var e = this;
    this._$hueScaleHandle = (0, o.default)("<div>").addClass("dx-colorview-hue-scale-handle").appendTo(this._$hueScaleWrapper);
    this._createComponent(this._$hueScaleHandle, g.default, {
      contentTemplate: null,
      boundary: this._$hueScaleWrapper,
      allowMoveByClick: true,
      dragDirection: "vertical",
      onDragMove: function (t) {
        var n = t.event;
        e._updateByDrag = true;
        e._saveValueChangeEvent(n);
        e._updateColorHue((0, r.locate)(e._$hueScaleHandle).top + e._hueScaleHandleHeight / 2);
      }
    });
    this._hueScaleHandleHeight = (0, i.getHeight)(this._$hueScaleHandle);
    this._placeHueScaleHandle();
  },
  _placeHueScaleHandle: function () {
    var e = this._hueScaleWrapperHeight;
    var t = this._hueScaleHandleHeight;
    var n = (e - t) * (360 - this._currentColor.hsv.h) / 360;
    if (e < n + t) {
      n = e - t;
    }
    if (n < 0) {
      n = 0;
    }
    (0, r.move)(this._$hueScaleHandle, {
      top: Math.round(n)
    });
  },
  _updateColorHue: function (e) {
    var t = 360 - Math.round((e - this._hueScaleHandleHeight / 2) * 360 / (this._hueScaleWrapperHeight - this._hueScaleHandleHeight));
    var n = this._currentColor.hsv.s;
    var i = this._currentColor.hsv.v;
    this._isTopColorHue = false;
    if ((t = t < 0 ? 0 : t) >= 360) {
      this._isTopColorHue = true;
      t = 0;
    }
    this._updateColorFromHsv(t, n, i);
    this._$palette.css("backgroundColor", this._currentColor.getPureColor().toHex());
  },
  _renderControlsContainer: function () {
    var e = this._renderHtmlCellInsideRow(0, this._$colorPickerContainer);
    this._$controlsContainer = (0, o.default)("<div>").addClass("dx-colorview-controls-container").appendTo(e);
  },
  _renderControls: function () {
    this._renderColorsPreview();
    this._renderRgbInputs();
    this._renderHexInput();
  },
  _renderColorsPreview: function () {
    var e = (0, o.default)("<div>").addClass("dx-colorview-color-preview-container").appendTo(this._$controlsContainer);
    var t = (0, o.default)("<div>").addClass("dx-colorview-color-preview-container-inner").appendTo(e);
    this._$currentColor = (0, o.default)("<div>").addClass([C, k].join(" "));
    this._$baseColor = (0, o.default)("<div>").addClass([C, S].join(" "));
    this._makeTransparentBackground(this._$baseColor, this.option("matchValue"));
    this._makeTransparentBackground(this._$currentColor, this._currentColor);
    t.append([this._$baseColor, this._$currentColor]);
  },
  _renderAlphaChannelElements: function () {
    if (this.option("editAlphaChannel")) {
      this._$colorPickerContainer.find(".dx-colorview-container-row").eq(1).addClass("dx-colorview-alpha-channel-row");
      this._renderAlphaChannelScale();
      this._renderAlphaChannelInput();
    }
  },
  _renderRgbInputs: function () {
    this._rgbInputsWithLabels = [this._renderEditorWithLabel({
      editorType: f.default,
      value: this._currentColor.r,
      onValueChanged: this._updateColor.bind(this, false),
      labelText: "R",
      labelAriaText: u.default.format("dxColorView-ariaRed"),
      labelClass: "dx-colorview-label-red"
    }), this._renderEditorWithLabel({
      editorType: f.default,
      value: this._currentColor.g,
      onValueChanged: this._updateColor.bind(this, false),
      labelText: "G",
      labelAriaText: u.default.format("dxColorView-ariaGreen"),
      labelClass: "dx-colorview-label-green"
    }), this._renderEditorWithLabel({
      editorType: f.default,
      value: this._currentColor.b,
      onValueChanged: this._updateColor.bind(this, false),
      labelText: "B",
      labelAriaText: u.default.format("dxColorView-ariaBlue"),
      labelClass: "dx-colorview-label-blue"
    })];
    this._$controlsContainer.append(this._rgbInputsWithLabels);
    this._rgbInputs = [this._rgbInputsWithLabels[0].find(".dx-numberbox").dxNumberBox("instance"), this._rgbInputsWithLabels[1].find(".dx-numberbox").dxNumberBox("instance"), this._rgbInputsWithLabels[2].find(".dx-numberbox").dxNumberBox("instance")];
  },
  _renderEditorWithLabel: function (e) {
    var t = this;
    var n = (0, o.default)("<div>");
    var i = (0, o.default)("<label>").addClass(e.labelClass).text(e.labelText + ":").append(n);
    a.default.off(i, _.name);
    a.default.on(i, _.name, function (e) {
      e.preventDefault();
    });
    var r = e.editorType;
    var l = (0, s.extend)({
      value: e.value,
      onValueChanged: e.onValueChanged,
      onKeyboardHandled: function (e) {
        return t._keyboardHandler(e);
      }
    }, {
      stylingMode: this.option("stylingMode")
    });
    if (r === f.default) {
      l.min = e.min || 0;
      l.max = e.max || 255;
      l.step = e.step || 1;
    }
    new r(n, l).registerKeyHandler("enter", function (e) {
      this._fireEnterKeyPressed(e);
    }.bind(this));
    this.setAria("label", e.labelAriaText, n);
    return i;
  },
  hexInputOptions: function () {
    return {
      editorType: p.default,
      value: this._currentColor.toHex().replace("#", ""),
      onValueChanged: this._updateColor.bind(this, true),
      labelClass: "dx-colorview-label-hex",
      labelText: "#",
      labelAriaText: u.default.format("dxColorView-ariaHex")
    };
  },
  _renderHexInput: function () {
    this._hexInput = p.default.getInstance(this._renderEditorWithLabel(this.hexInputOptions()).appendTo(this._$controlsContainer).find(".dx-textbox"));
    var e = `dx-${new v.default()}`;
    var t = this._$controlsContainer.find(`.dx-colorview-label-hex`).find(`.dx-texteditor-input`);
    this.setAria("id", e, t);
    this.setAria("labelledby", e, this._$paletteHandle);
  },
  _renderAlphaChannelScale: function () {
    var e = this._renderHtmlCellInsideRow(1, this._$colorPickerContainer, "dx-colorview-alpha-channel-cell");
    var t = (0, o.default)("<div>").addClass("dx-colorview-alpha-channel-border").appendTo(e);
    var n = (0, o.default)("<div>").addClass("dx-colorview-alpha-channel-wrapper").appendTo(t);
    this._$alphaChannelScale = (0, o.default)("<div>").addClass("dx-colorview-alpha-channel-scale").appendTo(n);
    this._makeCSSLinearGradient(this._$alphaChannelScale);
    this._renderAlphaChannelHandle(e);
  },
  _makeCSSLinearGradient: function (e) {
    var t = this._currentColor;
    var n = `${t.r},${t.g},${t.b}`;
    var i = this.option("rtlEnabled");
    var o = `rgba(${n}, ${i ? "1" : "0"})`;
    var a = `rgba(${n}, ${i ? "0" : "1"})`;
    var r = `linear-gradient(-90deg, ${o}, ${a})`;
    e.css("backgroundImage", r);
  },
  _renderAlphaChannelInput: function () {
    var e = this;
    var t = this._renderHtmlCellInsideRow(1, this._$colorPickerContainer);
    e._alphaChannelInput = this._renderEditorWithLabel({
      editorType: f.default,
      value: this._currentColor.a,
      max: 1,
      step: 0.1,
      onValueChanged: function (t) {
        var n = t.value;
        n = e._currentColor.isValidAlpha(n) ? n : e._currentColor.a;
        if (t.event) {
          e._saveValueChangeEvent(t.event);
        }
        e._updateColorTransparency(n);
        e._placeAlphaChannelHandle();
      },
      labelClass: "dx-colorview-alpha-channel-label",
      labelText: "Alpha",
      labelAriaText: u.default.format("dxColorView-ariaAlpha")
    }).appendTo(t).find(".dx-numberbox").dxNumberBox("instance");
  },
  _updateColorTransparency: function (e) {
    this._currentColor.a = e;
    this.applyColor();
  },
  _renderAlphaChannelHandle: function (e) {
    var t = this;
    this._$alphaChannelHandle = (0, o.default)("<div>").addClass("dx-colorview-alpha-channel-handle").appendTo(e);
    this._createComponent(this._$alphaChannelHandle, g.default, {
      contentTemplate: null,
      boundary: e,
      allowMoveByClick: true,
      dragDirection: "horizontal",
      onDragMove: function (e) {
        var n = e.event;
        t._updateByDrag = true;
        var i = t._$alphaChannelHandle;
        var o = (0, r.locate)(i).left + t._alphaChannelHandleWidth / 2;
        t._saveValueChangeEvent(n);
        t._calculateColorTransparencyByScaleWidth(o);
      }
    });
    this._alphaChannelHandleWidth = (0, i.getWidth)(this._$alphaChannelHandle);
    this._alphaChannelScaleWorkWidth = (0, i.getWidth)(e) - this._alphaChannelHandleWidth;
    this._placeAlphaChannelHandle();
  },
  _calculateColorTransparencyByScaleWidth: function (e) {
    var t = (e - this._alphaChannelHandleWidth / 2) / this._alphaChannelScaleWorkWidth;
    var n = this.option("rtlEnabled");
    t = n ? t : 1 - t;
    if (e >= this._alphaChannelScaleWorkWidth + this._alphaChannelHandleWidth / 2) {
      t = n ? 1 : 0;
    } else if (t < 1) {
      t = t.toFixed(2);
    }
    var i = this._alphaChannelInput.option("value");
    t = Math.max(t, 0);
    if ((t = Math.min(t, 1)) === i) {
      this._updateByDrag = false;
    } else {
      this._alphaChannelInput.option("value", t);
    }
  },
  _placeAlphaChannelHandle: function () {
    var e = this._alphaChannelScaleWorkWidth * (1 - this._currentColor.a);
    if (e < 0) {
      e = 0;
    }
    if (this._alphaChannelScaleWorkWidth < e) {
      e = this._alphaChannelScaleWorkWidth;
    }
    (0, r.move)(this._$alphaChannelHandle, {
      left: this.option("rtlEnabled") ? this._alphaChannelScaleWorkWidth - e : e
    });
  },
  applyColor: function () {
    var e = this.option("value");
    var t = this.option("editAlphaChannel") ? this._makeRgba(this._currentColor) : this._currentColor.toHex();
    this._makeTransparentBackground(this._$currentColor, this._currentColor);
    if (t === e) {
      this._updateByDrag = false;
    } else {
      this.option("value", t);
    }
  },
  cancelColor: function () {
    this._initColorAndOpacity();
    this._refreshMarkup();
  },
  _updateColor: function (e, t) {
    var n;
    var i;
    if (e) {
      i = this._validateHex("#" + this._hexInput.option("value"));
    } else {
      n = this._validateRgb();
      if (this._alphaChannelInput) {
        n.push(this._alphaChannelInput.option("value"));
        i = "rgba(" + n.join(", ") + ")";
      } else {
        i = "rgb(" + n.join(", ") + ")";
      }
    }
    if (!this._suppressEditorsValueUpdating) {
      this._currentColor = new l.default(i);
      this._saveValueChangeEvent(t.event);
      this.applyColor();
      this._refreshMarkup();
    }
  },
  _validateHex: function (e) {
    if (this._currentColor.isValidHex(e)) {
      return e;
    } else {
      return this._currentColor.toHex();
    }
  },
  _validateRgb: function () {
    var e = this._rgbInputs[0].option("value");
    var t = this._rgbInputs[1].option("value");
    var n = this._rgbInputs[2].option("value");
    if (!this._currentColor.isValidRGB(e, t, n)) {
      e = this._currentColor.r;
      t = this._currentColor.g;
      n = this._currentColor.b;
    }
    return [e, t, n];
  },
  _refreshMarkup: function () {
    this._placeHueScaleHandle();
    this._placePaletteHandle();
    this._updateColorParamsAndColorPreview();
    this._$palette.css("backgroundColor", this._currentColor.getPureColor().toHex());
    if (this._$alphaChannelHandle) {
      this._updateColorTransparency(this._currentColor.a);
      this._placeAlphaChannelHandle();
    }
  },
  _updateColorParamsAndColorPreview: function () {
    this._suppressEditorsValueUpdating = true;
    this._hexInput.option("value", this._currentColor.toHex().replace("#", ""));
    this._rgbInputs[0].option("value", this._currentColor.r);
    this._rgbInputs[1].option("value", this._currentColor.g);
    this._rgbInputs[2].option("value", this._currentColor.b);
    this._suppressEditorsValueUpdating = false;
    if (this.option("editAlphaChannel")) {
      this._makeCSSLinearGradient.call(this, this._$alphaChannelScale);
      this._alphaChannelInput.option("value", this._currentColor.a);
    }
  },
  _optionChanged: function (e) {
    var t = e.value;
    switch (e.name) {
      case "value":
        this._setCurrentColor(t);
        if (!this._updateByDrag) {
          this._refreshMarkup();
        }
        this._updateByDrag = false;
        this.callBase(e);
        break;
      case "matchValue":
        this._setBaseColor(t);
        break;
      case "onEnterKeyPressed":
        this._initEnterKeyPressedAction();
        break;
      case "editAlphaChannel":
        if (this._$colorPickerContainer) {
          this._renderHtmlRows("editAlphaChannel");
          this._renderAlphaChannelElements();
        }
        break;
      case "keyStep":
        break;
      case "stylingMode":
        this._renderControls();
        break;
      default:
        this.callBase(e);
    }
  }
});
(0, c.default)("dxColorView", D);
var I = D;
exports.default = I;
module.exports = exports.default;
module.exports.default = exports.default;