exports.getImageSourceType = exports.getImageContainer = undefined;
var i;
var o = (i = require("./68374.js")) && i.__esModule ? i : {
  default: i
};
function a(e) {
  return !!e && typeof e == "string" && (/^\s*<svg[^>]*>(.|\r?\n)*?<\/svg>\s*$/i.test(e) ? "svg" : /data:.*base64|\.|[^<\s]\/{1,1}/.test(e) ? "image" : /^[\w-_]+$/.test(e) ? "dxIcon" : !!/^\s?([\w-_]\s?)+$/.test(e) && "fontIcon");
}
exports.getImageSourceType = a;
exports.getImageContainer = function (e) {
  switch (a(e)) {
    case "image":
      return (0, o.default)("<img>").attr("src", e).addClass("dx-icon");
    case "fontIcon":
      return (0, o.default)("<i>").addClass(`dx-icon ${e}`);
    case "dxIcon":
      return (0, o.default)("<i>").addClass(`dx-icon dx-icon-${e}`);
    case "svg":
      return (0, o.default)("<i>").addClass(`dx-icon dx-svg-icon`).append(e);
    default:
      return null;
  }
};