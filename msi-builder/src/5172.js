Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GridCoreRowDraggingDom = undefined;
var i = r(require("./68374.js"));
var o = r(require("./60082.js"));
var a = require("./92794.js");
function r(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
var s = {
  createHandleTemplateFunc: function (e) {
    return function (t, n) {
      var r = (0, i.default)(t);
      r.attr(a.ATTRIBUTES.dragCell, "");
      if (n.rowType === "data") {
        r.addClass(a.CLASSES.cellFocusDisabled);
        return (0, i.default)("<span>").addClass(e(a.CLASSES.handleIcon));
      }
      o.default.setEmptyText(r);
    };
  }
};
exports.GridCoreRowDraggingDom = s;