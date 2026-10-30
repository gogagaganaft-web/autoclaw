exports.plugin = exports.Title = undefined;
var i = require("./35922.js");
var o = require("./13306.js");
var a = require("./19157.js");
var r = require("./73711.js");
var s = Number;
var l = (0, a.enumParser)(["left", "center", "right"]);
var u = (0, a.enumParser)(["top", "bottom"]);
function d(e) {
  return !!e && !!(String(e).length > 0);
}
function c(e, t, n, i, o) {
  if (e.attr({
    text: t
  }).setMaxSize(n, o, i).textChanged) {
    e.setTitle(t);
  }
}
function h(e) {
  if (e >= 0) {
    return s(e);
  } else {
    return 10;
  }
}
function f(e) {
  this._params = e;
  this._group = e.renderer.g().attr({
    class: e.cssClass
  }).linkOn(e.root || e.renderer.root, "title");
  this._hasText = false;
}
exports.Title = f;
(0, o.extend)(f.prototype, r.LayoutElement.prototype, {
  dispose: function () {
    this._group.linkRemove();
    this._group.linkOff();
    if (this._titleElement) {
      this._clipRect.dispose();
      this._titleElement = this._subtitleElement = this._clipRect = null;
    }
    this._params = this._group = this._options = null;
  },
  _updateOptions: function (e) {
    var t;
    this._options = e;
    this._options.horizontalAlignment = l(e.horizontalAlignment, "center");
    this._options.verticalAlignment = u(e.verticalAlignment, "top");
    this._options.margin = (t = e.margin) >= 0 ? {
      left: s(t),
      top: s(t),
      right: s(t),
      bottom: s(t)
    } : {
      left: h((t = t || {}).left),
      top: h(t.top),
      right: h(t.right),
      bottom: h(t.bottom)
    };
  },
  _updateStructure: function () {
    var e = this._params.renderer;
    var t = this._group;
    var n = this._options;
    var i = n.horizontalAlignment;
    if (!this._titleElement) {
      this._titleElement = e.text().append(t);
      this._subtitleElement = e.text();
      this._clipRect = e.clipRect();
      t.attr({
        "clip-path": this._clipRect.id
      });
    }
    this._titleElement.attr({
      align: i,
      class: n.cssClass
    });
    this._subtitleElement.attr({
      align: i,
      class: n.subtitle.cssClass
    });
    t.linkAppend();
    if (d(n.subtitle.text)) {
      this._subtitleElement.append(t);
    } else {
      this._subtitleElement.remove();
    }
  },
  _updateTexts: function () {
    var e;
    var t = this._options;
    var n = t.subtitle;
    var i = this._titleElement;
    var o = this._subtitleElement;
    i.attr({
      text: "A",
      y: 0
    }).css((0, a.patchFontOptions)(t.font));
    e = i.getBBox();
    this._baseLineCorrection = e.height + e.y;
    i.attr({
      text: t.text
    });
    var r = -(e = i.getBBox()).y;
    i.attr({
      y: r
    });
    if (d(n.text)) {
      o.attr({
        text: n.text,
        y: 0
      }).css((0, a.patchFontOptions)(n.font));
    }
  },
  _shiftSubtitle: function () {
    var e = this._titleElement.getBBox();
    var t = this._subtitleElement;
    var n = this._options.subtitle.offset;
    t.move(0, e.y + e.height - t.getBBox().y - n);
  },
  _updateBoundingRectAlignment: function () {
    var e = this._boundingRect;
    var t = this._options;
    e.verticalAlignment = t.verticalAlignment;
    e.horizontalAlignment = t.horizontalAlignment;
    e.cutLayoutSide = t.verticalAlignment;
    e.cutSide = "vertical";
    e.position = {
      horizontal: t.horizontalAlignment,
      vertical: t.verticalAlignment
    };
  },
  hasText: function () {
    return this._hasText;
  },
  update: function (e, t) {
    var n = (0, o.extend)(true, {}, e, function (e) {
      var t = (0, i.isString)(e) ? {
        text: e
      } : e || {};
      t.subtitle = (0, i.isString)(t.subtitle) ? {
        text: t.subtitle
      } : t.subtitle || {};
      return t;
    }(t));
    var a = d(n.text);
    var r = a || a !== this._hasText;
    this._baseLineCorrection = 0;
    this._updateOptions(n);
    this._boundingRect = {};
    if (a) {
      this._updateStructure();
      this._updateTexts();
    } else {
      this._group.linkRemove();
    }
    this._updateBoundingRect();
    this._updateBoundingRectAlignment();
    this._hasText = a;
    return r;
  },
  draw: function (e, t) {
    if (this._hasText) {
      this._group.linkAppend();
      this._correctTitleLength(e);
      if (this._group.getBBox().height > t) {
        this.freeSpace();
      }
    }
    return this;
  },
  _correctTitleLength: function (e) {
    var t = this._options;
    var n = t.margin;
    var i = e - n.left - n.right;
    var o = t.placeholderSize;
    c(this._titleElement, t.text, i, t, o);
    if (this._subtitleElement) {
      if (s(o) > 0) {
        o -= this._titleElement.getBBox().height;
      }
      c(this._subtitleElement, t.subtitle.text, i, t.subtitle, o);
      this._shiftSubtitle();
    }
    this._updateBoundingRect();
    var a = this.getCorrectedLayoutOptions();
    var r = a.x;
    var l = a.y;
    var u = a.height;
    this._clipRect.attr({
      x: r,
      y: l,
      width: e,
      height: u
    });
  },
  getLayoutOptions: function () {
    return this._boundingRect || null;
  },
  shift: function (e, t) {
    var n = this.getLayoutOptions();
    this._group.move(e - n.x, t - n.y);
    return this;
  },
  _updateBoundingRect: function () {
    var e = this._options;
    var t = e.margin;
    var n = this._boundingRect;
    var i = this._hasText ? this._group.getBBox() : {
      width: 0,
      height: 0,
      x: 0,
      y: 0,
      isEmpty: true
    };
    if (!i.isEmpty) {
      i.height += t.top + t.bottom - this._baseLineCorrection;
      i.width += t.left + t.right;
      i.x -= t.left;
      i.y += this._baseLineCorrection - t.top;
    }
    if (e.placeholderSize > 0) {
      i.height = e.placeholderSize;
    }
    n.height = i.height;
    n.width = i.width;
    n.x = i.x;
    n.y = i.y;
  },
  getCorrectedLayoutOptions: function () {
    var e = this.getLayoutOptions();
    var t = this._baseLineCorrection;
    return (0, o.extend)({}, e, {
      y: e.y - t,
      height: e.height + t
    });
  },
  layoutOptions: function () {
    if (this._hasText) {
      return {
        horizontalAlignment: this._boundingRect.horizontalAlignment,
        verticalAlignment: this._boundingRect.verticalAlignment,
        priority: 0
      };
    } else {
      return null;
    }
  },
  measure: function (e) {
    this.draw(e[0], e[1]);
    return [this._boundingRect.width, this._boundingRect.height];
  },
  move: function (e, t) {
    if (!function (e, t) {
      return e[2] - e[0] < t.width || e[3] - e[1] < t.height;
    }(e, this._boundingRect)) {
      this.shift(Math.round(e[0]), Math.round(e[1]));
    } else {
      this.shift(t[0], t[1]);
    }
  },
  freeSpace: function () {
    this._params.incidentOccurred("W2103");
    this._group.linkRemove();
    this._boundingRect.width = this._boundingRect.height = 0;
  },
  getOptions: function () {
    return this._options;
  },
  changeLink: function (e) {
    this._group.linkRemove();
    this._group.linkOn(e, "title");
  }
});
var p = {
  name: "title",
  init: function () {
    this._title = new f({
      renderer: this._renderer,
      cssClass: this._rootClassPrefix + "-title",
      incidentOccurred: this._incidentOccurred
    });
    this._layout.add(this._title);
  },
  dispose: function () {
    this._title.dispose();
    this._title = null;
  },
  customize: function (e) {
    e.addChange({
      code: "TITLE",
      handler: function () {
        if (this._title.update(this._themeManager.theme("title"), this.option("title"))) {
          this._change(["LAYOUT"]);
        }
      },
      isThemeDependent: true,
      option: "title",
      isOptionChange: true
    });
  },
  fontFields: ["title.font", "title.subtitle.font"]
};
exports.plugin = p;