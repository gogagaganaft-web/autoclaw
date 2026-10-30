exports.default = undefined;
var i = require("./13306.js");
var o = (0, require("./58201.js").getNavigator)();
var a = /(webkit)[ /]([\w.]+)/;
var r = /(mozilla)(?:.*? rv:([\w.]+))/;
function s(e) {
  e = e.toLowerCase();
  var t = {};
  var n = a.exec(e) || e.indexOf("compatible") < 0 && r.exec(e) || [];
  var i = n[1];
  var o = n[2];
  if (i === "webkit") {
    t.webkit = true;
    if (e.indexOf("chrome") >= 0 || e.indexOf("crios") >= 0) {
      i = "chrome";
      o = (o = /(?:chrome|crios)\/(\d+\.\d+)/.exec(e)) && o[1];
    } else if (e.indexOf("fxios") >= 0) {
      i = "mozilla";
      o = (o = /fxios\/(\d+\.\d+)/.exec(e)) && o[1];
    } else if (e.indexOf("safari") >= 0 && /version|phantomjs/.test(e)) {
      i = "safari";
      o = (o = /(?:version|phantomjs)\/([0-9.]+)/.exec(e)) && o[1];
    } else {
      i = "unknown";
      o = (o = /applewebkit\/([0-9.]+)/.exec(e)) && o[1];
    }
  }
  if (i) {
    t[i] = true;
    t.version = o;
  }
  return t;
}
var l = (0, i.extend)({
  _fromUA: s
}, s(o.userAgent));
exports.default = l;
module.exports = exports.default;
module.exports.default = exports.default;