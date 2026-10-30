require.d(exports, {
  createElement: function () {
    return l;
  }
});
import * as i from "./55285.js";
function o(e) {
  return e == null;
}
function a(e) {
  return typeof e == "string";
}
function r(e) {
  return e === undefined;
}
var s = {
  onComponentDidMount: 1,
  onComponentDidUpdate: 1,
  onComponentShouldUpdate: 1,
  onComponentWillMount: 1,
  onComponentWillUnmount: 1,
  onComponentWillUpdate: 1
};
function l(e, t, n) {
  var l;
  var u;
  var d = arguments;
  var c = null;
  var h = null;
  var f = null;
  var p = 0;
  var g = arguments.length - 2;
  if (g === 1) {
    l = n;
  } else if (g > 1) {
    for (l = []; g-- > 0;) {
      l[g] = d[g + 2];
    }
  }
  if (!a(e)) {
    p = 2;
    if (!r(l)) {
      t ||= {};
      t.children = l;
    }
    if (!o(t)) {
      u = {};
      for (var m in t) {
        if (m === "key") {
          h = t.key;
        } else if (m === "ref") {
          c = t.ref;
        } else if (s[m] === 1) {
          c ||= {};
          c[m] = t[m];
        } else {
          u[m] = t[m];
        }
      }
    }
    return (0, i.createComponentVNode)(p, e, u, h, c);
  }
  p = (0, i.getFlagsForElementVnode)(e);
  if (!o(t)) {
    u = {};
    for (var _ in t) {
      if (_ === "className" || _ === "class") {
        f = t[_];
      } else if (_ === "key") {
        h = t.key;
      } else if (_ === "children" && r(l)) {
        l = t.children;
      } else if (_ === "ref") {
        c = t.ref;
      } else {
        if (_ === "contenteditable") {
          p |= 4096;
        }
        u[_] = t[_];
      }
    }
  }
  if (p & 8192) {
    return (0, i.createFragment)(g === 1 ? [l] : l, 0, h);
  } else {
    return (0, i.createVNode)(p, e, f, l, 0, u, h, c);
  }
}