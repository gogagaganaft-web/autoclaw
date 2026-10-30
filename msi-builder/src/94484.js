Object.defineProperty(exports, "date", {
  enumerable: true,
  get: function () {
    return r.default;
  }
});
exports.disableIntl = function () {
  if (a.default.engine() === "intl") {
    a.default.resetInjection();
  }
  if (r.default.engine() === "intl") {
    r.default.resetInjection();
  }
};
exports.locale = exports.loadMessages = exports.formatNumber = exports.formatMessage = exports.formatDate = undefined;
Object.defineProperty(exports, "message", {
  enumerable: true,
  get: function () {
    return o.default;
  }
});
Object.defineProperty(exports, "number", {
  enumerable: true,
  get: function () {
    return a.default;
  }
});
exports.parseNumber = exports.parseDate = undefined;
var i = s(require("./91331.js"));
var o = s(require("./28109.js"));
var a = s(require("./18016.js"));
var r = s(require("./91500.js"));
function s(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
require("./89740.js");
var l = i.default.locale.bind(i.default);
exports.locale = l;
var u = o.default.load.bind(o.default);
exports.loadMessages = u;
var d = o.default.format.bind(o.default);
exports.formatMessage = d;
var c = a.default.format.bind(a.default);
exports.formatNumber = c;
var h = a.default.parse.bind(a.default);
exports.parseNumber = h;
var f = r.default.format.bind(r.default);
exports.formatDate = f;
var p = r.default.parse.bind(r.default);
exports.parseDate = p;