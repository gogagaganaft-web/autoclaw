exports.isPopupFullScreenNeeded = exports.getPopupToolbarItems = exports.getPopupSize = exports.getMaxWidth = exports.defaultAnimation = exports.POPUP_WIDTH = undefined;
var i = s(require("./28109.js"));
var o = s(require("./20530.js"));
var a = require("./58664.js");
var r = require("./58201.js");
function s(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
function l() {
  return (l = Object.assign ? Object.assign.bind() : function (e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var i in n) {
        if (Object.prototype.hasOwnProperty.call(n, i)) {
          e[i] = n[i];
        }
      }
    }
    return e;
  }).apply(this, arguments);
}
var u = {
  DEFAULT: 485,
  RECURRENCE: 970,
  FULLSCREEN: 1000,
  MOBILE: {
    DEFAULT: 350,
    FULLSCREEN: 500
  }
};
exports.POPUP_WIDTH = u;
exports.defaultAnimation = {
  show: {
    type: "pop",
    duration: 300,
    from: {
      scale: 0.55
    }
  },
  hide: {
    type: "pop",
    duration: 300,
    to: {
      opacity: 0,
      scale: 0.55
    },
    from: {
      opacity: 1,
      scale: 1
    }
  }
};
function d() {
  return o.default.current().deviceType !== "desktop";
}
var c = "after";
var h = "before";
exports.getPopupToolbarItems = function (e, t) {
  var n = [];
  var a = {
    doneButton: {
      shortcut: "done",
      options: {
        text: i.default.format("Done")
      },
      location: c
    },
    cancelButton: {
      shortcut: "cancel",
      location: o.default.current().platform === "ios" ? h : c
    }
  };
  if (e) {
    n.push(l({}, a.doneButton, {
      onClick: t
    }));
  }
  n.push(a.cancelButton);
  return n;
};
function f() {
  var e = (0, r.getWindow)();
  var t = e && (0, a.getWidth)(e);
  return !!t && (d() ? t < u.MOBILE.FULLSCREEN : t < u.FULLSCREEN);
}
exports.isPopupFullScreenNeeded = f;
function p(e) {
  if (d()) {
    return u.MOBILE.DEFAULT;
  } else if (e) {
    return u.RECURRENCE;
  } else {
    return u.DEFAULT;
  }
}
exports.getMaxWidth = p;
exports.getPopupSize = function (e) {
  return {
    fullScreen: f(),
    maxWidth: p(e)
  };
};