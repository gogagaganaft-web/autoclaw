exports.name = undefined;
var i = c(require("./68374.js"));
var o = c(require("./55994.js"));
var a = require("./60137.js");
var r = c(require("./20530.js"));
var s = c(require("./38377.js"));
var l = c(require("./85788.js"));
var u = require("./39611.js");
var d = c(require("./11699.js"));
function c(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
var h = (0, u.addNamespace)("contextmenu", "dxContexMenu");
var f = (0, u.addNamespace)(d.default.name, "dxContexMenu");
var p = s.default.inherit({
  setup: function (e) {
    var t = (0, i.default)(e);
    o.default.on(t, h, this._contextMenuHandler.bind(this));
    if (a.touch || r.default.isSimulator()) {
      o.default.on(t, f, this._holdHandler.bind(this));
    }
  },
  _holdHandler: function (e) {
    if (!(0, u.isMouseEvent)(e) || !!r.default.isSimulator()) {
      this._fireContextMenu(e);
    }
  },
  _contextMenuHandler: function (e) {
    this._fireContextMenu(e);
  },
  _fireContextMenu: function (e) {
    return (0, u.fireEvent)({
      type: "dxcontextmenu",
      originalEvent: e
    });
  },
  teardown: function (e) {
    o.default.off(e, ".dxContexMenu");
  }
});
(0, l.default)("dxcontextmenu", new p());
exports.name = "dxcontextmenu";