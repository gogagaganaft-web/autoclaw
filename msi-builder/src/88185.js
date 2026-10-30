exports.p = undefined;
var i = require("./58664.js");
var o = f(require("./68374.js"));
var a = f(require("./73349.js"));
var r = require("./58201.js");
var s = f(require("./55994.js"));
var l = require("./13306.js");
var u = f(require("./55814.js"));
var d = require("./60137.js");
var c = require("./80968.js");
var h = f(require("./20530.js"));
function f(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
var p = (0, r.getWindow)();
exports.p = function (e) {
  e = (0, l.extend)({}, e);
  var t = h.default.real();
  var n = e.allowZoom;
  var r = e.allowPan;
  var f = "allowSelection" in e ? e.allowSelection : t.platform === "generic";
  if (!(0, o.default)("meta[name=viewport]").length) {
    (0, o.default)("<meta>").attr("name", "viewport").appendTo("head");
  }
  var g = ["width=device-width"];
  var m = [];
  if (n) {
    m.push("pinch-zoom");
  } else {
    g.push("initial-scale=1.0", "maximum-scale=1.0, user-scalable=no");
  }
  if (r) {
    m.push("pan-x", "pan-y");
  }
  if (r || n) {
    (0, o.default)("html").css("msOverflowStyle", "-ms-autohiding-scrollbar");
  } else {
    (0, o.default)("html, body").css({
      msContentZooming: "none",
      msUserSelect: "none",
      overflow: "hidden"
    });
  }
  if (!f && (0, d.supportProp)("userSelect")) {
    (0, o.default)(".dx-viewport").css((0, c.styleProp)("userSelect"), "none");
  }
  (0, o.default)("meta[name=viewport]").attr("content", g.join());
  (0, o.default)("html").css("msTouchAction", m.join(" ") || "none");
  t = h.default.real();
  if (d.touch) {
    s.default.off(a.default.getDocument(), ".dxInitMobileViewport");
    s.default.on(a.default.getDocument(), "dxpointermove.dxInitMobileViewport", function (e) {
      var t = e.pointers.length;
      var i = e.pointerType === "touch";
      var o = !n && t > 1;
      var a = !r && t === 1 && !e.isScrollingEvent;
      if (i && (o || a)) {
        e.preventDefault();
      }
    });
  }
  if (t.ios) {
    if (a.default.getLocation().protocol !== "file:") {
      u.default.add(function () {
        var e = (0, i.getWidth)(p);
        (0, i.setWidth)((0, o.default)("body"), e);
      });
    }
  }
  if (t.android) {
    u.default.add(function () {
      setTimeout(function () {
        var e = a.default.getActiveElement();
        if (e.scrollIntoViewIfNeeded) {
          e.scrollIntoViewIfNeeded();
        } else {
          e.scrollIntoView(false);
        }
      });
    });
  }
};