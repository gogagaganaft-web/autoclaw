exports.createBodyOverflowManager = undefined;
var i = require("./58201.js");
var o = require("./35922.js");
var a = l(require("./73349.js"));
var r = l(require("./20530.js"));
var s = require("./20576.js");
function l(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
var u = {
  setOverflow: s.noop,
  restoreOverflow: s.noop
};
exports.createBodyOverflowManager = function () {
  if (!(0, i.hasWindow)()) {
    return u;
  }
  var e = (0, i.getWindow)();
  var t = a.default.getDocument().documentElement;
  var n = a.default.getBody();
  var s = r.default.real().platform === "ios";
  var l = {
    overflow: null,
    overflowX: null,
    overflowY: null,
    paddingRight: null,
    position: null,
    top: null,
    left: null
  };
  function d() {
    var i = e.innerWidth - t.clientWidth;
    if (!l.paddingRight && !(i <= 0)) {
      var o = e.getComputedStyle(n).getPropertyValue("padding-right");
      var a = parseInt(o, 10);
      l.paddingRight = a;
      n.style.setProperty("padding-right", `${a + i}px`);
    }
  }
  function c() {
    if ((0, o.isDefined)(l.paddingRight)) {
      if (l.paddingRight) {
        n.style.setProperty("padding-right", `${l.paddingRight}px`);
      } else {
        n.style.removeProperty("padding-right");
      }
      l.paddingRight = null;
    }
  }
  return {
    setOverflow: s ? function () {
      if (!(0, o.isDefined)(l.position) && n.style.position !== "fixed") {
        var t = e.scrollY;
        var i = e.scrollX;
        l.position = n.style.position;
        l.top = n.style.top;
        l.left = n.style.left;
        n.style.setProperty("position", "fixed");
        n.style.setProperty("top", `${-t}px`);
        n.style.setProperty("left", `${-i}px`);
      }
    } : function () {
      d();
      if (!l.overflow && n.style.overflow !== "hidden") {
        l.overflow = n.style.overflow;
        l.overflowX = n.style.overflowX;
        l.overflowY = n.style.overflowY;
        n.style.setProperty("overflow", "hidden");
      }
    },
    restoreOverflow: s ? function () {
      if ((0, o.isDefined)(l.position)) {
        var t = -parseInt(n.style.top, 10);
        var i = -parseInt(n.style.left, 10);
        ["position", "top", "left"].forEach(function (e) {
          if (l[e]) {
            n.style.setProperty(e, l[e]);
          } else {
            n.style.removeProperty(e);
          }
        });
        e.scrollTo(i, t);
        l.position = null;
      }
    } : function () {
      c();
      ["overflow", "overflowX", "overflowY"].forEach(function (e) {
        if ((0, o.isDefined)(l[e])) {
          var t = e.replace(/(X)|(Y)/, function (e) {
            return `-${e.toLowerCase()}`;
          });
          if (l[e]) {
            n.style.setProperty(t, l[e]);
          } else {
            n.style.removeProperty(t);
          }
          l[e] = null;
        }
      });
    }
  };
};