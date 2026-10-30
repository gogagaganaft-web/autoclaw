exports.addShadowDomStyles = function (e) {
  var t;
  var a = e.get(0);
  var r = (t = a.getRootNode) === null || t === undefined ? undefined : t.call(a);
  if (r == null || !r.host) {
    return;
  }
  if (!n) {
    o(n = i(r), a.ownerDocument.styleSheets, false);
  }
  var s = i(r);
  o(s, r.styleSheets, true);
  r.adoptedStyleSheets = [n, s];
};
exports.getShadowElementsFromPoint = function (e, t, n) {
  var i = (o = 0, a = [], Object.defineProperties({
    push: function (e) {
      a.push(e);
      return this;
    },
    shift: function () {
      o++;
      return a[o - 1];
    }
  }, {
    length: {
      get: function () {
        return a.length - o;
      },
      configurable: true,
      enumerable: true
    },
    items: {
      get: function () {
        return a;
      },
      configurable: true,
      enumerable: true
    }
  })).push(n);
  var o;
  var a;
  while (i.length) {
    for (var s = i.shift(), l = 0; l < s.childNodes.length; l++) {
      var u = s.childNodes[l];
      if (u.nodeType === Node.ELEMENT_NODE && r(u, e, t) && getComputedStyle(u).pointerEvents !== "none") {
        i.push(u);
      }
    }
  }
  var d = i.items.reverse();
  d.pop();
  return d;
};
var n = null;
function i(e) {
  try {
    return new CSSStyleSheet();
  } catch (n) {
    var t = e.ownerDocument.createElement("style");
    e.appendChild(t);
    return t.sheet;
  }
}
function o(e, t, n) {
  for (var i = 0; i < t.length; i++) {
    var o = t[i];
    try {
      for (var r = 0; r < o.cssRules.length; r++) {
        a(e, o.cssRules[r], n);
      }
    } catch (e) {}
  }
}
function a(e, t, n) {
  var i;
  var o;
  var a;
  var r;
  var s;
  if (n || ((i = t.selectorText) === null || i === undefined ? undefined : i.includes("dx-")) || ((o = t.cssRules) === null || o === undefined || (a = o[0]) === null || a === undefined || (r = a.selectorText) === null || r === undefined ? undefined : r.includes("dx-")) || ((s = t.name) === null || s === undefined ? undefined : s.startsWith("dx-")) || t.style?.fontFamily === "DXIcons") {
    e.insertRule(t.cssText, e.cssRules.length);
  }
}
function r(e, t, n) {
  var i = e.getBoundingClientRect();
  return i && t >= i.left && t < i.right && n >= i.top && n < i.bottom;
}