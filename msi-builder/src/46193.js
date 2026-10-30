exports.FIELD_EMPTY_ITEM_CLASS = undefined;
exports.renderEmptyItem = function (e) {
  var t = e.$parent;
  var n = e.rootElementCssClassList;
  return (0, o.default)("<div>").addClass("dx-field-empty-item").html("&nbsp;").addClass(n.join(" ")).appendTo(t);
};
var i;
var o = (i = require("./68374.js")) && i.__esModule ? i : {
  default: i
};
exports.FIELD_EMPTY_ITEM_CLASS = "dx-field-empty-item";