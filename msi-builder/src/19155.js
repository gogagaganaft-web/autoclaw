exports.HIDDEN_FOR_EXPORT = undefined;
exports.getSvgElement = function (e) {
  if (i.default.isNode(e)) {
    return e;
  } else {
    return new s.DOMParser().parseFromString(e, "image/svg+xml").childNodes[0];
  }
};
exports.getSvgMarkup = function (e, t) {
  return function (e) {
    var t = true;
    if (e.indexOf("xmlns:xlink") === -1) {
      e = e.replace("<svg", "<svg xmlns:xlink=\"http://www.w3.org/1999/xlink\"");
    }
    return (e = e.replace(/xmlns="[\s\S]*?"/gi, function (e) {
      if (t) {
        t = false;
        return e;
      } else {
        return "";
      }
    })).replace(/xmlns:NS1="[\s\S]*?"/gi, "").replace(/NS1:xmlns:xlink="([\s\S]*?)"/gi, "xmlns:xlink=\"$1\"");
  }((n = function (e, t) {
    var n = i.default.createElement("div");
    var o = e.cloneNode(true);
    if (t) {
      (0, a.default)(o).css("backgroundColor", t);
    }
    n.appendChild(o);
    return n.innerHTML;
  }(e, t), n.replace(/&quot;/gi, "&#34;").replace(/&amp;/gi, "&#38;").replace(/&apos;/gi, "&#39;").replace(/&lt;/gi, "&#60;").replace(/&gt;/gi, "&#62;").replace(/&nbsp;/gi, "&#160;").replace(/&shy;/gi, "&#173;")));
  var n;
};
var i = r(require("./73349.js"));
var o = require("./58201.js");
var a = r(require("./68374.js"));
function r(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
var s = (0, o.getWindow)();
exports.HIDDEN_FOR_EXPORT = "hidden-for-export";