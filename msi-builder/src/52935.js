exports.default = undefined;
var i = l(require("./42552.js"));
var o = l(require("./4848.js"));
var a = require("./58201.js");
var r = l(require("./96688.js"));
var s = l(require("./56957.js"));
function l(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
var u = function () {
  function e() {
    var e;
    var t = (0, a.getWindow)();
    var n = t && t.TurndownService || i.default;
    var s = t && t.showdown || o.default;
    if (!n) {
      throw r.default.Error("E1041", "Turndown");
    }
    if (!s) {
      throw r.default.Error("E1041", "Showdown");
    }
    this._html2Markdown = new n();
    if ((e = this._html2Markdown) !== null && e !== undefined && e.addRule) {
      this._html2Markdown.addRule("emptyLine", {
        filter: function (e) {
          return e.nodeName.toLowerCase() === "p" && e.innerHTML === "<br>";
        },
        replacement: function () {
          return "<br>";
        }
      });
      this._html2Markdown.keep(["table"]);
    }
    this._markdown2Html = new s.Converter({
      simpleLineBreaks: true,
      strikethrough: true,
      tables: true
    });
  }
  var t = e.prototype;
  t.toMarkdown = function (e) {
    return this._html2Markdown.turndown(e || "");
  };
  t.toHtml = function (e) {
    var t = this._markdown2Html.makeHtml(e);
    t &&= t.replace(new RegExp("\\r?\\n", "g"), "");
    return t;
  };
  return e;
}();
s.default.addConverter("markdown", u);
var d = u;
exports.default = d;
module.exports = exports.default;
module.exports.default = exports.default;