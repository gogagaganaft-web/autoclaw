exports.default = undefined;
var i = require("./13306.js");
var o = require("./43637.js");
var a = i.extend;
var r = {
  ThemeManager: o.BaseThemeManager.inherit({
    ctor: function (e) {
      this.callBase.apply(this, arguments);
      this._subTheme = e.subTheme;
    },
    _initializeTheme: function () {
      var e;
      var t = this;
      if (t._subTheme) {
        e = a(true, {}, t._theme[t._subTheme], t._theme);
        a(true, t._theme, e);
      }
      t.callBase.apply(t, arguments);
    }
  })
};
exports.default = r;
module.exports = exports.default;
module.exports.default = exports.default;