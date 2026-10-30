exports.default = undefined;
var i = a(require("./68374.js"));
var o = require("./95479.js");
function a(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
function r(e) {
  return (r = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function (e) {
    return typeof e;
  } : function (e) {
    if (e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype) {
      return "symbol";
    } else {
      return typeof e;
    }
  })(e);
}
function s(e, t) {
  return (s = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (e, t) {
    e.__proto__ = t;
    return e;
  })(e, t);
}
var l = function (e) {
  var t;
  var n;
  function a() {
    return e.apply(this, arguments) || this;
  }
  n = e;
  (t = a).prototype = Object.create(n.prototype);
  t.prototype.constructor = t;
  s(t, n);
  var l = a.prototype;
  l._getPlainItems = function () {
    return (0, o.map)(this._collectionWidget.option("items"), function e(t) {
      if (t.items) {
        return [t].concat((0, o.map)(t.items, e));
      } else {
        return t;
      }
    });
  };
  l._stringifyItem = function (e) {
    var t = this;
    return JSON.stringify(e, function (e, n) {
      if (e === "template") {
        return t._getTemplateString(n);
      } else {
        return n;
      }
    });
  };
  l._getTemplateString = function (e) {
    if (r(e) === "object") {
      return (0, i.default)(e).text();
    } else {
      return e.toString();
    }
  };
  return a;
}(a(require("./14174.js")).default);
exports.default = l;
module.exports = exports.default;
module.exports.default = exports.default;