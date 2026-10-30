exports.default = undefined;
var i = require("./60148.js");
var o = y(require("./80560.js"));
var a = y(require("./72446.js"));
var r = y(require("./8980.js"));
var s = y(require("./73360.js"));
var l = y(require("./2909.js"));
var u = y(require("./90223.js"));
var d = y(require("./77616.js"));
var c = y(require("./78859.js"));
var h = y(require("./55179.js"));
var f = y(require("./91787.js"));
var p = y(require("./56459.js"));
var g = y(require("./31700.js"));
var m = y(require("./75990.js"));
var _ = y(require("./80900.js"));
var v = y(require("./12542.js"));
function y(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
var b = function () {
  function e() {
    if (!e.initialized) {
      var t = this.getQuill();
      var n = t.import("attributors/style/direction");
      t.register({
        "formats/align": u.default,
        "formats/direction": n,
        "formats/font": s.default,
        "formats/size": l.default,
        "formats/extendedImage": a.default,
        "formats/link": r.default,
        "modules/toolbar": d.default,
        "modules/dropImage": c.default,
        "modules/variables": h.default,
        "modules/resizing": f.default,
        "modules/tableResizing": p.default,
        "modules/tableContextMenu": g.default,
        "modules/imageUpload": m.default,
        "modules/imageCursor": _.default,
        "modules/mentions": v.default,
        "themes/basic": o.default
      }, true);
      this._customModules = [];
      e._initialized = true;
    }
  }
  var t = e.prototype;
  t.createEditor = function (e, t) {
    return new (this.getQuill())(e, t);
  };
  t.registerModules = function (e) {
    var t = RegExp("modules/*");
    var n = this.getQuill();
    function i(e) {
      return !!n.imports[e];
    }
    for (var o in e) {
      if (t.test(o) && !i(o)) {
        this._customModules.push(o.slice(8));
      }
    }
    n.register(e, true);
  };
  t.getRegisteredModuleNames = function () {
    return this._customModules;
  };
  t.getQuill = function () {
    return (0, i.getQuill)();
  };
  return e;
}();
exports.default = b;
module.exports = exports.default;
module.exports.default = exports.default;