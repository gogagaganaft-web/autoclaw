Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GridCoreKeyboardNavigationDom = undefined;
var i = require("./67004.js");
var o = {
  isDragCell: function (e) {
    return e.attr(i.ATTRIBUTES.dragCell) !== undefined;
  },
  getCellToFocus: function (e, t) {
    return e.filter(`[${i.ATTRIBUTES.ariaColIndex}="${t + 1}"]:not([${i.ATTRIBUTES.dragCell}])`).first();
  }
};
exports.GridCoreKeyboardNavigationDom = o;