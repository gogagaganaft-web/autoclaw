exports.default = undefined;
var i = u(require("./20476.js"));
var o = require("./13306.js");
var a = require("./68752.js");
var r = require("./78008.js");
var s = u(require("./91331.js"));
var l = require("./18121.js");
function u(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
var d = (0, o.extend)(true, {}, l.defaultMessages);
var c = {};
var h = (0, i.default)({
  engine: function () {
    return "base";
  },
  _dictionary: d,
  load: function (e) {
    (0, o.extend)(true, this._dictionary, e);
  },
  _localizablePrefix: "@",
  setup: function (e) {
    this._localizablePrefix = e;
  },
  localizeString: function (e) {
    var t = this;
    var n = new RegExp("(^|[^a-zA-Z_0-9" + t._localizablePrefix + "-]+)(" + t._localizablePrefix + "{1,2})([a-zA-Z_0-9-]+)", "g");
    var i = t._localizablePrefix + t._localizablePrefix;
    return e.replace(n, function (e, n, o, a) {
      var s;
      var l = t._localizablePrefix + a;
      if (o !== i) {
        s = t.format(a);
      }
      if (!s) {
        c[a] = (0, r.humanize)(a);
      }
      return n + (s || l);
    });
  },
  getMessagesByLocales: function () {
    return this._dictionary;
  },
  getDictionary: function (e) {
    if (e) {
      return c;
    } else {
      return (0, o.extend)({}, c, this.getMessagesByLocales()[s.default.locale()]);
    }
  },
  getFormatter: function (e) {
    return this._getFormatterBase(e) || this._getFormatterBase(e, "en");
  },
  _getFormatterBase: function (e, t) {
    var n = this;
    var i = s.default.getValueByClosestLocale(function (t) {
      return function (e, t) {
        return e[t] || {};
      }(n._dictionary, t)[e];
    });
    if (i) {
      return function () {
        var e = arguments.length === 1 && Array.isArray(arguments[0]) ? arguments[0].slice(0) : Array.prototype.slice.call(arguments, 0);
        e.unshift(i);
        return a.format.apply(this, e);
      };
    }
  },
  format: function (e) {
    var t = this.getFormatter(e);
    var n = Array.prototype.slice.call(arguments, 1);
    return t && t.apply(this, n) || "";
  }
});
exports.default = h;
module.exports = exports.default;
module.exports.default = exports.default;