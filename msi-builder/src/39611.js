exports.stopEventsSkipping = exports.setEventFixMethod = exports.normalizeKeyName = exports.needSkipEvent = exports.isTouchEvent = exports.isPointerEvent = exports.isMouseEvent = exports.isKeyboardEvent = exports.isFakeClickEvent = exports.isDxMouseWheelEvent = exports.isCommandKeyPressed = exports.hasTouches = exports.getChar = exports.forceSkipEvents = exports.fireEvent = exports.eventSource = exports.eventDelta = exports.eventData = exports.createEvent = exports.addNamespace = undefined;
var i = u(require("./68374.js"));
var o = u(require("./19141.js"));
var a = u(require("./55994.js"));
var r = require("./95479.js");
var s = require("./13306.js");
var l = require("./31421.js");
function u(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
var d = {
  backspace: "backspace",
  tab: "tab",
  enter: "enter",
  escape: "escape",
  pageup: "pageUp",
  pagedown: "pageDown",
  end: "end",
  home: "home",
  arrowleft: "leftArrow",
  arrowup: "upArrow",
  arrowright: "rightArrow",
  arrowdown: "downArrow",
  delete: "del",
  " ": "space",
  f: "F",
  a: "A",
  "*": "asterisk",
  "-": "minus",
  alt: "alt",
  control: "control",
  shift: "shift"
};
var c = {
  8: "backspace",
  9: "tab",
  13: "enter",
  27: "escape",
  33: "pageUp",
  34: "pageDown",
  35: "end",
  36: "home",
  37: "leftArrow",
  38: "upArrow",
  39: "rightArrow",
  40: "downArrow",
  46: "del",
  32: "space",
  70: "F",
  65: "A",
  106: "asterisk",
  109: "minus",
  189: "minus",
  173: "minus",
  16: "shift",
  17: "control",
  18: "alt"
};
var h = {
  dx: /^dx/i,
  mouse: /(mouse|wheel)/i,
  touch: /^touch/i,
  keyboard: /^key/i,
  pointer: /^(ms)?pointer/i
};
function f(e) {
  return e;
}
function p(e) {
  return m(e) === "dx";
}
function g(e) {
  return m(e) === "touch";
}
function m(e) {
  var t = e.type;
  var n = "other";
  (0, r.each)(h, function (e) {
    if (this.test(t)) {
      n = e;
      return false;
    }
  });
  return n;
}
exports.eventSource = m;
function _(e) {
  return m(e) === "pointer";
}
exports.isPointerEvent = _;
function v(e) {
  return function (e) {
    return m(e) === "mouse";
  }(e) || (_(e) || p(e)) && e.pointerType === "mouse";
}
exports.isMouseEvent = v;
function y(e) {
  return e && e.type === "dxmousewheel";
}
exports.isDxMouseWheelEvent = y;
function b(e) {
  return g(e) || (_(e) || p(e)) && e.pointerType === "touch";
}
exports.isTouchEvent = b;
exports.isKeyboardEvent = function (e) {
  return m(e) === "keyboard";
};
exports.isFakeClickEvent = function (e) {
  var t = e.screenX;
  var n = e.offsetX;
  var i = e.pageX;
  return t === 0 && !n && i === 0;
};
exports.eventData = function (e) {
  return {
    x: e.pageX,
    y: e.pageY,
    time: e.timeStamp
  };
};
exports.eventDelta = function (e, t) {
  return {
    x: t.x - e.x,
    y: t.y - e.y,
    time: t.time - e.time || 1
  };
};
exports.hasTouches = function (e) {
  var t = e.originalEvent;
  var n = e.pointers;
  if (g(e)) {
    return (t.touches || []).length;
  } else if (p(e)) {
    return (n || []).length;
  } else {
    return 0;
  }
};
var x = false;
exports.forceSkipEvents = function () {
  return x = true;
};
exports.stopEventsSkipping = function () {
  return x = false;
};
exports.needSkipEvent = function (e) {
  if (x) {
    return true;
  }
  var t = e.target;
  var n = (0, i.default)(t);
  var o = (t == null ? undefined : t.isContentEditable) || (t == null ? undefined : t.hasAttribute("contenteditable"));
  var a = n.is("input, textarea, select") || o;
  if (y(e)) {
    return (!n.is("textarea") || !n.hasClass("dx-texteditor-input")) && !o && n.is("input[type='number'], textarea, select") && n.is(":focus");
  } else if (v(e)) {
    return a || e.which > 1;
  } else if (b(e)) {
    return a && (0, l.focused)(n);
  } else {
    return undefined;
  }
};
exports.setEventFixMethod = function (e) {
  return f = e;
};
function w(e, t) {
  var n = function (e) {
    return f(a.default.Event(e, e), e);
  }(e);
  if (t) {
    (0, s.extend)(n, t);
  }
  return n;
}
exports.createEvent = w;
exports.fireEvent = function (e) {
  var t = e.originalEvent;
  var n = e.delegateTarget;
  var i = w(t, e);
  a.default.trigger(n || i.target, i);
  return i;
};
exports.normalizeKeyName = function (e) {
  var t = e.key;
  var n = e.which;
  var i = d[t == null ? undefined : t.toLowerCase()] || t;
  var o = c[n];
  if (o && i === t) {
    return o;
  } else if (!i && n) {
    return String.fromCharCode(n);
  } else {
    return i;
  }
};
exports.getChar = function (e) {
  var t = e.key;
  var n = e.which;
  return t || String.fromCharCode(n);
};
var C = o.default;
exports.addNamespace = C;
exports.isCommandKeyPressed = function (e) {
  var t = e.ctrlKey;
  var n = e.metaKey;
  return t || n;
};