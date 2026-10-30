exports.BaseThemeManager = undefined;
var i;
var o = (i = require("./38377.js")) && i.__esModule ? i : {
  default: i
};
var a = require("./13306.js");
var r = require("./35922.js");
var s = require("./95479.js");
var l = require("./23696.js");
var u = require("./19157.js");
var d = require("./86231.js");
var c = d.getTheme;
var h = d.addCacheItem;
var f = d.removeCacheItem;
var p = a.extend;
var g = s.each;
function m(e, t) {
  var n = e;
  if (t) {
    g(t.split("."), function (e, t) {
      return n = n[t];
    });
  }
  return n;
}
var _ = o.default.inherit({
  ctor: function (e) {
    this._themeSection = e.themeSection;
    this._fontFields = e.fontFields || [];
    h(this);
  },
  dispose: function () {
    f(this);
    this._callback = this._theme = this._font = null;
    return this;
  },
  setCallback: function (e) {
    this._callback = e;
    return this;
  },
  setTheme: function (e, t) {
    this._current = e;
    this._rtl = t;
    return this.refresh();
  },
  refresh: function () {
    var e = this._current || {};
    var t = c(e.name || e);
    this._themeName = t.name;
    this._defaultPalette = t.defaultPalette;
    this._font = p({}, t.font, e.font);
    if (this._themeSection) {
      g(this._themeSection.split("."), function (e, n) {
        t = p(true, {}, t[n]);
      });
    }
    this._theme = p(true, {}, t, (0, r.isString)(e) ? {} : e);
    this._initializeTheme();
    if ((0, u.parseScalar)(this._rtl, this._theme.rtlEnabled)) {
      p(true, this._theme, this._theme._rtl);
    }
    this._callback();
    return this;
  },
  theme: function (e) {
    return m(this._theme, e);
  },
  themeName: function () {
    return this._themeName;
  },
  createPalette: function (e, t) {
    return (0, l.createPalette)(e, t, this._defaultPalette);
  },
  createDiscretePalette: function (e, t) {
    return (0, l.getDiscretePalette)(e, t, this._defaultPalette);
  },
  createGradientPalette: function (e) {
    return (0, l.getGradientPalette)(e, this._defaultPalette);
  },
  getAccentColor: function (e) {
    return (0, l.getAccentColor)(e, this._defaultPalette);
  },
  _initializeTheme: function () {
    var e = this;
    g(e._fontFields || [], function (t, n) {
      e._initializeFont(m(e._theme, n));
    });
  },
  _initializeFont: function (e) {
    p(e, this._font, p({}, e));
  }
});
exports.BaseThemeManager = _;