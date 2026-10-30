exports.default = undefined;
var i = s(require("./68374.js"));
var o = require("./35922.js");
var a = s(require("./20530.js"));
var r = s(require("./73349.js"));
function s(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
var l = a.default.real();
var u = l.ios;
var d = l.mac;
var c = u || d;
function h(e) {
  var t;
  try {
    t = {
      start: e.selectionStart,
      end: e.selectionEnd
    };
  } catch (e) {
    t = {
      start: 0,
      end: 0
    };
  }
  return t;
}
function f(e, t) {
  var n = r.default.getBody();
  if (n.contains(e) || n.contains(e.getRootNode().host)) {
    try {
      e.selectionStart = t.start;
      e.selectionEnd = t.end;
    } catch (e) {}
  }
}
function p(e, t, n = false) {
  e = (0, i.default)(e).get(0);
  if (!(0, o.isDefined)(t)) {
    return h(e);
  }
  if (!!n || !c || r.default.getActiveElement(e) === e) {
    f(e, t);
  }
}
exports.default = p;
module.exports = exports.default;
module.exports.default = exports.default;