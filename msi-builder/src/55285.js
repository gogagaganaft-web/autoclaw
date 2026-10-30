require.d(exports, {
  Component: function () {
    return ot;
  },
  EMPTY_OBJ: function () {
    return f;
  },
  Fragment: function () {
    return p;
  },
  _CI: function () {
    return Le;
  },
  _HI: function () {
    return W;
  },
  _M: function () {
    return Fe;
  },
  _MCCC: function () {
    return je;
  },
  _ME: function () {
    return Ne;
  },
  _MFCC: function () {
    return We;
  },
  _MP: function () {
    return Re;
  },
  _MR: function () {
    return De;
  },
  _RFC: function () {
    return Ve;
  },
  __render: function () {
    return Ke;
  },
  createComponentVNode: function () {
    return M;
  },
  createFragment: function () {
    return B;
  },
  createPortal: function () {
    return H;
  },
  createRef: function () {
    return Ce;
  },
  createRenderer: function () {
    return Ye;
  },
  createTextVNode: function () {
    return R;
  },
  createVNode: function () {
    return P;
  },
  directClone: function () {
    return V;
  },
  findDOMfromVNode: function () {
    return x;
  },
  forwardRef: function () {
    return Se;
  },
  getFlagsForElementVnode: function () {
    return z;
  },
  linkEvent: function () {
    return c;
  },
  normalizeProps: function () {
    return L;
  },
  options: function () {
    return D;
  },
  render: function () {
    return Ze;
  },
  rerender: function () {
    return nt;
  },
  version: function () {
    return at;
  }
});
var i = Array.isArray;
function o(e) {
  var t = typeof e;
  return t === "string" || t === "number";
}
function a(e) {
  return e == null;
}
function r(e) {
  return e === null || e === false || e === true || e === undefined;
}
function s(e) {
  return typeof e == "function";
}
function l(e) {
  return typeof e == "string";
}
function u(e) {
  return e === null;
}
function d(e, t) {
  var n = {};
  if (e) {
    for (var i in e) {
      n[i] = e[i];
    }
  }
  if (t) {
    for (var o in t) {
      n[o] = t[o];
    }
  }
  return n;
}
function c(e, t) {
  if (s(t)) {
    return {
      data: e,
      event: t
    };
  } else {
    return null;
  }
}
function h(e) {
  return !u(e) && typeof e == "object";
}
var f = {};
var p = "$F";
function g(e) {
  return e.substr(2).toLowerCase();
}
function m(e, t) {
  e.appendChild(t);
}
function _(e, t, n) {
  if (u(n)) {
    m(e, t);
  } else {
    e.insertBefore(t, n);
  }
}
function v(e, t) {
  e.removeChild(t);
}
function y(e) {
  for (var t = 0; t < e.length; t++) {
    e[t]();
  }
}
function b(e, t, n) {
  var i = e.children;
  if (n & 4) {
    return i.$LI;
  } else if (n & 8192) {
    if (e.childFlags === 2) {
      return i;
    } else {
      return i[t ? 0 : i.length - 1];
    }
  } else {
    return i;
  }
}
function x(e, t) {
  var n;
  while (e) {
    if ((n = e.flags) & 2033) {
      return e.dom;
    }
    e = b(e, t, n);
  }
  return null;
}
function w(e, t) {
  do {
    var n = e.flags;
    if (n & 2033) {
      v(t, e.dom);
      return;
    }
    var i = e.children;
    if (n & 4) {
      e = i.$LI;
    }
    if (n & 8) {
      e = i;
    }
    if (n & 8192) {
      if (e.childFlags !== 2) {
        for (var o = 0, a = i.length; o < a; ++o) {
          w(i[o], t);
        }
        return;
      }
      e = i;
    }
  } while (e);
}
function C(e, t, n) {
  do {
    var i = e.flags;
    if (i & 2033) {
      _(t, e.dom, n);
      return;
    }
    var o = e.children;
    if (i & 4) {
      e = o.$LI;
    }
    if (i & 8) {
      e = o;
    }
    if (i & 8192) {
      if (e.childFlags !== 2) {
        for (var a = 0, r = o.length; a < r; ++a) {
          C(o[a], t, n);
        }
        return;
      }
      e = o;
    }
  } while (e);
}
function S(e, t, n) {
  if (e.constructor.getDerivedStateFromProps) {
    return d(n, e.constructor.getDerivedStateFromProps(t, n));
  } else {
    return n;
  }
}
var k = {
  v: false
};
var D = {
  componentComparator: null,
  createVNode: null,
  renderComplete: null
};
function I(e, t) {
  e.textContent = t;
}
function T(e, t) {
  return h(e) && e.event === t.event && e.data === t.data;
}
function E(e, t) {
  for (var n in t) {
    if (e[n] === undefined) {
      e[n] = t[n];
    }
  }
  return e;
}
function O(e, t) {
  return !!s(e) && (e(t), true);
}
function A(e, t, n, i, o, a, r, s) {
  this.childFlags = e;
  this.children = t;
  this.className = n;
  this.dom = null;
  this.flags = i;
  this.key = o === undefined ? null : o;
  this.props = a === undefined ? null : a;
  this.ref = r === undefined ? null : r;
  this.type = s;
}
function P(e, t, n, i, o, a, r, s) {
  var l = o === undefined ? 1 : o;
  var u = new A(l, i, n, e, r, a, s, t);
  if (D.createVNode) {
    D.createVNode(u);
  }
  if (l === 0) {
    j(u, u.children);
  }
  return u;
}
function M(e, t, n, i, o) {
  var r = new A(1, null, null, e = function (e, t) {
    if (e & 12) {
      return e;
    } else if (t.prototype && t.prototype.render) {
      return 4;
    } else if (t.render) {
      return 32776;
    } else {
      return 8;
    }
  }(e, t), i, function (e, t, n) {
    var i = (e & 32768 ? t.render : t).defaultProps;
    if (a(i)) {
      return n;
    } else if (a(n)) {
      return d(i, null);
    } else {
      return E(n, i);
    }
  }(e, t, n), function (e, t, n) {
    if (e & 4) {
      return n;
    }
    var i = (e & 32768 ? t.render : t).defaultHooks;
    if (a(i)) {
      return n;
    } else if (a(n)) {
      return i;
    } else {
      return E(n, i);
    }
  }(e, t, o), t);
  if (D.createVNode) {
    D.createVNode(r);
  }
  return r;
}
function R(e, t) {
  return new A(1, a(e) || e === true || e === false ? "" : e, null, 16, t, null, null, null);
}
function B(e, t, n) {
  var i = P(8192, 8192, null, e, t, null, n, null);
  switch (i.childFlags) {
    case 1:
      i.children = F();
      i.childFlags = 2;
      break;
    case 16:
      i.children = [R(e)];
      i.childFlags = 4;
  }
  return i;
}
function L(e) {
  var t = e.props;
  if (t) {
    var n = e.flags;
    if (n & 481) {
      if (t.children !== undefined && a(e.children)) {
        j(e, t.children);
      }
      if (t.className !== undefined) {
        if (a(e.className)) {
          e.className = t.className || null;
        }
        t.className = undefined;
      }
    }
    if (t.key !== undefined) {
      e.key = t.key;
      t.key = undefined;
    }
    if (t.ref !== undefined) {
      e.ref = n & 8 ? d(e.ref, t.ref) : t.ref;
      t.ref = undefined;
    }
  }
  return e;
}
function V(e) {
  var t = e.flags & -16385;
  var n = e.props;
  if (t & 14 && !u(n)) {
    var i = n;
    n = {};
    for (var o in i) {
      n[o] = i[o];
    }
  }
  if ((t & 8192) == 0) {
    return new A(e.childFlags, e.children, e.className, t, e.key, n, e.ref, e.type);
  } else {
    return function (e) {
      var t = e.children;
      var n = e.childFlags;
      return B(n === 2 ? V(t) : t.map(V), n, e.key);
    }(e);
  }
}
function F() {
  return R("", null);
}
function H(e, t) {
  var n = W(e);
  return P(1024, 1024, null, n, 0, null, n.key, t);
}
function N(e, t, n, a) {
  for (var s = e.length; n < s; n++) {
    var d = e[n];
    if (!r(d)) {
      var c = a + "$" + n;
      if (i(d)) {
        N(d, t, 0, c);
      } else {
        if (o(d)) {
          d = R(d, c);
        } else {
          var h = d.key;
          var f = l(h) && h[0] === "$";
          if (d.flags & 81920 || f) {
            d = V(d);
          }
          d.flags |= 65536;
          if (f) {
            if (h.substring(0, a.length) !== a) {
              d.key = a + h;
            }
          } else if (u(h)) {
            d.key = c;
          } else {
            d.key = a + h;
          }
        }
        t.push(d);
      }
    }
  }
}
function z(e) {
  switch (e) {
    case "svg":
      return 32;
    case "input":
      return 64;
    case "select":
      return 256;
    case "textarea":
      return 128;
    case p:
      return 8192;
    default:
      return 1;
  }
}
function j(e, t) {
  var n;
  var a = 1;
  if (r(t)) {
    n = t;
  } else if (o(t)) {
    a = 16;
    n = t;
  } else if (i(t)) {
    for (var s = t.length, d = 0; d < s; ++d) {
      var c = t[d];
      if (r(c) || i(c)) {
        n = n || t.slice(0, d);
        N(t, n, d, "");
        break;
      }
      if (o(c)) {
        (n = n || t.slice(0, d)).push(R(c, "$" + d));
      } else {
        var h = c.key;
        var f = (c.flags & 81920) > 0;
        var p = u(h);
        var g = l(h) && h[0] === "$";
        if (f || p || g) {
          n = n || t.slice(0, d);
          if (f || g) {
            c = V(c);
          }
          if (p || g) {
            c.key = "$" + d;
          }
          n.push(c);
        } else if (n) {
          n.push(c);
        }
        c.flags |= 65536;
      }
    }
    a = (n = n || t).length === 0 ? 1 : 8;
  } else {
    (n = t).flags |= 65536;
    if (t.flags & 81920) {
      n = V(t);
    }
    a = 2;
  }
  e.children = n;
  e.childFlags = a;
  return e;
}
function W(e) {
  if (r(e) || o(e)) {
    return R(e, null);
  } else if (i(e)) {
    return B(e, 0, null);
  } else if (e.flags & 16384) {
    return V(e);
  } else {
    return e;
  }
}
var G = "http://www.w3.org/1999/xlink";
var q = "http://www.w3.org/XML/1998/namespace";
var $ = {
  "xlink:actuate": G,
  "xlink:arcrole": G,
  "xlink:href": G,
  "xlink:role": G,
  "xlink:show": G,
  "xlink:title": G,
  "xlink:type": G,
  "xml:base": q,
  "xml:lang": q,
  "xml:space": q
};
function U(e) {
  return {
    onClick: e,
    onDblClick: e,
    onFocusIn: e,
    onFocusOut: e,
    onKeyDown: e,
    onKeyPress: e,
    onKeyUp: e,
    onMouseDown: e,
    onMouseMove: e,
    onMouseUp: e,
    onTouchEnd: e,
    onTouchMove: e,
    onTouchStart: e
  };
}
var K = U(0);
var Z = U(null);
var Y = U(true);
function X(e, t) {
  var n = t.$EV;
  n ||= t.$EV = U(null);
  if (!n[e]) {
    if (++K[e] == 1) {
      Z[e] = function (e) {
        var t = e === "onClick" || e === "onDblClick" ? function (e) {
          return function (t) {
            if (t.button === 0) {
              J(t, true, e, ie(t));
            } else {
              t.stopPropagation();
            }
          };
        }(e) : function (e) {
          return function (t) {
            J(t, false, e, ie(t));
          };
        }(e);
        document.addEventListener(g(e), t);
        return t;
      }(e);
    }
  }
  return n;
}
function Q(e, t) {
  var n = t.$EV;
  if (n && n[e]) {
    if (--K[e] == 0) {
      document.removeEventListener(g(e), Z[e]);
      Z[e] = null;
    }
    n[e] = null;
  }
}
function J(e, t, n, i) {
  var o = function (e) {
    if (s(e.composedPath)) {
      return e.composedPath()[0];
    } else {
      return e.target;
    }
  }(e);
  do {
    if (t && o.disabled) {
      return;
    }
    var a = o.$EV;
    if (a) {
      var r = a[n];
      if (r && (i.dom = o, r.event ? r.event(r.data, e) : r(e), e.cancelBubble)) {
        return;
      }
    }
    o = o.parentNode;
  } while (!u(o));
}
function ee() {
  this.cancelBubble = true;
  if (!this.immediatePropagationStopped) {
    this.stopImmediatePropagation();
  }
}
function te() {
  return this.defaultPrevented;
}
function ne() {
  return this.cancelBubble;
}
function ie(e) {
  var t = {
    dom: document
  };
  e.isDefaultPrevented = te;
  e.isPropagationStopped = ne;
  e.stopPropagation = ee;
  Object.defineProperty(e, "currentTarget", {
    configurable: true,
    get: function () {
      return t.dom;
    }
  });
  return t;
}
function oe(e, t, n) {
  if (e[t]) {
    var i = e[t];
    if (i.event) {
      i.event(i.data, n);
    } else {
      i(n);
    }
  } else {
    var o = t.toLowerCase();
    if (e[o]) {
      e[o](n);
    }
  }
}
function ae(e, t) {
  function n(n) {
    var i = this.$V;
    if (i) {
      var o = i.props || f;
      var a = i.dom;
      if (l(e)) {
        oe(o, e, n);
      } else {
        for (var r = 0; r < e.length; ++r) {
          oe(o, e[r], n);
        }
      }
      if (s(t)) {
        var u = this.$V;
        var d = u.props || f;
        t(d, a, false, u);
      }
    }
  }
  Object.defineProperty(n, "wrapped", {
    configurable: false,
    enumerable: false,
    value: true,
    writable: false
  });
  return n;
}
function re(e, t, n) {
  var i = "$" + t;
  var o = e[i];
  if (o) {
    if (o[1].wrapped) {
      return;
    }
    e.removeEventListener(o[0], o[1]);
    e[i] = null;
  }
  if (s(n)) {
    e.addEventListener(t, n);
    e[i] = [t, n];
  }
}
function se(e) {
  return e === "checkbox" || e === "radio";
}
var le = ae("onInput", ce);
var ue = ae(["onClick", "onChange"], ce);
function de(e) {
  e.stopPropagation();
}
function ce(e, t) {
  var n = e.type;
  var i = e.value;
  var o = e.checked;
  var r = e.multiple;
  var s = e.defaultValue;
  var l = !a(i);
  if (n && n !== t.type) {
    t.setAttribute("type", n);
  }
  if (!a(r) && r !== t.multiple) {
    t.multiple = r;
  }
  if (!a(s) && !l) {
    t.defaultValue = s + "";
  }
  if (se(n)) {
    if (l) {
      t.value = i;
    }
    if (!a(o)) {
      t.checked = o;
    }
  } else if (l && t.value !== i) {
    t.defaultValue = i;
    t.value = i;
  } else if (!a(o)) {
    t.checked = o;
  }
}
function he(e, t) {
  if (e.type === "option") {
    (function (e, t) {
      var n = e.props || f;
      var o = e.dom;
      o.value = n.value;
      if (n.value === t || i(t) && t.indexOf(n.value) !== -1) {
        o.selected = true;
      } else if (!a(t) || !a(n.selected)) {
        o.selected = n.selected || false;
      }
    })(e, t);
  } else {
    var n = e.children;
    var o = e.flags;
    if (o & 4) {
      he(n.$LI, t);
    } else if (o & 8) {
      he(n, t);
    } else if (e.childFlags === 2) {
      he(n, t);
    } else if (e.childFlags & 12) {
      for (var r = 0, s = n.length; r < s; ++r) {
        he(n[r], t);
      }
    }
  }
}
de.wrapped = true;
var fe = ae("onChange", pe);
function pe(e, t, n, i) {
  var o = Boolean(e.multiple);
  if (!a(e.multiple) && o !== t.multiple) {
    t.multiple = o;
  }
  var r = e.selectedIndex;
  if (r === -1) {
    t.selectedIndex = -1;
  }
  if (i.childFlags !== 1) {
    var s = e.value;
    if (typeof r == "number" && r > -1 && t.options[r]) {
      s = t.options[r].value;
    }
    if (n && a(s)) {
      s = e.defaultValue;
    }
    he(i, s);
  }
}
var ge;
var me;
var _e = ae("onInput", ye);
var ve = ae("onChange");
function ye(e, t, n) {
  var i = e.value;
  var o = t.value;
  if (a(i)) {
    if (n) {
      var r = e.defaultValue;
      if (!a(r) && r !== o) {
        t.defaultValue = r;
        t.value = r;
      }
    }
  } else if (o !== i) {
    t.defaultValue = i;
    t.value = i;
  }
}
function be(e, t, n, i, o, a) {
  if (e & 64) {
    ce(i, n);
  } else if (e & 256) {
    pe(i, n, o, t);
  } else if (e & 128) {
    ye(i, n, o);
  }
  if (a) {
    n.$V = t;
  }
}
function xe(e, t, n) {
  if (e & 64) {
    (function (e, t) {
      if (se(t.type)) {
        re(e, "change", ue);
        re(e, "click", de);
      } else {
        re(e, "input", le);
      }
    })(t, n);
  } else if (e & 256) {
    (function (e) {
      re(e, "change", fe);
    })(t);
  } else if (e & 128) {
    (function (e, t) {
      re(e, "input", _e);
      if (t.onChange) {
        re(e, "change", ve);
      }
    })(t, n);
  }
}
function we(e) {
  if (e.type && se(e.type)) {
    return !a(e.checked);
  } else {
    return !a(e.value);
  }
}
function Ce() {
  return {
    current: null
  };
}
function Se(e) {
  return {
    render: e
  };
}
function ke(e) {
  if (e && !O(e, null) && e.current) {
    e.current = null;
  }
}
function De(e, t, n) {
  if (e && (s(e) || e.current !== undefined)) {
    n.push(function () {
      if (!O(e, t) && e.current !== undefined) {
        e.current = t;
      }
    });
  }
}
function Ie(e, t) {
  Te(e);
  w(e, t);
}
function Te(e) {
  var t;
  var n = e.flags;
  var i = e.children;
  if (n & 481) {
    t = e.ref;
    var o = e.props;
    ke(t);
    var r = e.childFlags;
    if (!u(o)) {
      var l = Object.keys(o);
      for (var d = 0, c = l.length; d < c; d++) {
        var h = l[d];
        if (Y[h]) {
          Q(h, e.dom);
        }
      }
    }
    if (r & 12) {
      Ee(i);
    } else if (r === 2) {
      Te(i);
    }
  } else if (i) {
    if (n & 4) {
      if (s(i.componentWillUnmount)) {
        i.componentWillUnmount();
      }
      ke(e.ref);
      i.$UN = true;
      Te(i.$LI);
    } else if (n & 8) {
      if (!a(t = e.ref) && s(t.onComponentWillUnmount)) {
        t.onComponentWillUnmount(x(e, true), e.props || f);
      }
      Te(i);
    } else if (n & 1024) {
      Ie(i, e.ref);
    } else if (n & 8192 && e.childFlags & 12) {
      Ee(i);
    }
  }
}
function Ee(e) {
  for (var t = 0, n = e.length; t < n; ++t) {
    Te(e[t]);
  }
}
function Oe(e) {
  e.textContent = "";
}
function Ae(e, t, n) {
  Ee(n);
  if (t.flags & 8192) {
    w(t, e);
  } else {
    Oe(e);
  }
}
function Pe(e, t, n, i) {
  var o = e && e.__html || "";
  var r = t && t.__html || "";
  if (o !== r) {
    if (!a(r) && !function (e, t) {
      var n = document.createElement("i");
      n.innerHTML = t;
      return n.innerHTML === e.innerHTML;
    }(i, r)) {
      if (!u(n)) {
        if (n.childFlags & 12) {
          Ee(n.children);
        } else if (n.childFlags === 2) {
          Te(n.children);
        }
        n.children = null;
        n.childFlags = 1;
      }
      i.innerHTML = r;
    }
  }
}
function Me(e, t, n, i, o, r, u) {
  switch (e) {
    case "children":
    case "childrenType":
    case "className":
    case "defaultValue":
    case "key":
    case "multiple":
    case "ref":
    case "selectedIndex":
      break;
    case "autoFocus":
      i.autofocus = !!n;
      break;
    case "allowfullscreen":
    case "autoplay":
    case "capture":
    case "checked":
    case "controls":
    case "default":
    case "disabled":
    case "hidden":
    case "indeterminate":
    case "loop":
    case "muted":
    case "novalidate":
    case "open":
    case "readOnly":
    case "required":
    case "reversed":
    case "scoped":
    case "seamless":
    case "selected":
      i[e] = !!n;
      break;
    case "defaultChecked":
    case "value":
    case "volume":
      if (r && e === "value") {
        break;
      }
      var d = a(n) ? "" : n;
      if (i[e] !== d) {
        i[e] = d;
      }
      break;
    case "style":
      (function (e, t, n) {
        if (a(t)) {
          n.removeAttribute("style");
        } else {
          var i;
          var o;
          var r = n.style;
          if (l(t)) {
            r.cssText = t;
          } else if (a(e) || l(e)) {
            for (i in t) {
              o = t[i];
              r.setProperty(i, o);
            }
          } else {
            for (i in t) {
              if ((o = t[i]) !== e[i]) {
                r.setProperty(i, o);
              }
            }
            for (i in e) {
              if (a(t[i])) {
                r.removeProperty(i);
              }
            }
          }
        }
      })(t, n, i);
      break;
    case "dangerouslySetInnerHTML":
      Pe(t, n, u, i);
      break;
    default:
      if (Y[e]) {
        (function (e, t, n, i) {
          if (s(n)) {
            X(e, i)[e] = n;
          } else if (h(n)) {
            if (T(t, n)) {
              return;
            }
            X(e, i)[e] = n;
          } else {
            Q(e, i);
          }
        })(e, t, n, i);
      } else if (e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110) {
        (function (e, t, n, i) {
          if (h(n)) {
            if (T(t, n)) {
              return;
            }
            n = function (e) {
              var t = e.event;
              return function (n) {
                t(e.data, n);
              };
            }(n);
          }
          re(i, g(e), n);
        })(e, t, n, i);
      } else if (a(n)) {
        i.removeAttribute(e);
      } else if (o && $[e]) {
        i.setAttributeNS($[e], e, n);
      } else {
        i.setAttribute(e, n);
      }
  }
}
function Re(e, t, n, i, o) {
  var a = false;
  var r = (t & 448) > 0;
  if (r && (a = we(n))) {
    xe(t, i, n);
  }
  for (var s in n) {
    Me(s, null, n[s], i, o, a, null);
  }
  if (r) {
    be(t, e, i, n, true, a);
  }
}
function Be(e, t, n) {
  var i = W(e.render(t, e.state, n));
  var o = n;
  if (s(e.getChildContext)) {
    o = d(n, e.getChildContext());
  }
  e.$CX = o;
  return i;
}
function Le(e, t, n, i, o, a) {
  var r = new t(n, i);
  var l = r.$N = Boolean(t.getDerivedStateFromProps || r.getSnapshotBeforeUpdate);
  r.$SVG = o;
  r.$L = a;
  e.children = r;
  r.$BS = false;
  r.context = i;
  if (r.props === f) {
    r.props = n;
  }
  if (l) {
    r.state = S(r, n, r.state);
  } else if (s(r.componentWillMount)) {
    r.$BR = true;
    r.componentWillMount();
    var d = r.$PS;
    if (!u(d)) {
      var c = r.state;
      if (u(c)) {
        r.state = d;
      } else {
        for (var h in d) {
          c[h] = d[h];
        }
      }
      r.$PS = null;
    }
    r.$BR = false;
  }
  r.$LI = Be(r, n, i);
  return r;
}
function Ve(e, t) {
  var n = e.props || f;
  if (e.flags & 32768) {
    return e.type.render(n, e.ref, t);
  } else {
    return e.type(n, t);
  }
}
function Fe(e, t, n, i, o, a) {
  var r = e.flags |= 16384;
  if (r & 481) {
    Ne(e, t, n, i, o, a);
  } else if (r & 4) {
    (function (e, t, n, i, o, a) {
      var r = Le(e, e.type, e.props || f, n, i, a);
      Fe(r.$LI, t, r.$CX, i, o, a);
      je(e.ref, r, a);
    })(e, t, n, i, o, a);
  } else if (r & 8) {
    (function (e, t, n, i, o, a) {
      Fe(e.children = W(Ve(e, n)), t, n, i, o, a);
    })(e, t, n, i, o, a);
    We(e, a);
  } else if (r & 512 || r & 16) {
    He(e, t, o);
  } else if (r & 8192) {
    (function (e, t, n, i, o, a) {
      var r = e.children;
      var s = e.childFlags;
      if (s & 12 && r.length === 0) {
        s = e.childFlags = 2;
        r = e.children = F();
      }
      if (s === 2) {
        Fe(r, n, t, i, o, a);
      } else {
        ze(r, n, t, i, o, a);
      }
    })(e, n, t, i, o, a);
  } else if (r & 1024) {
    (function (e, t, n, i, o) {
      Fe(e.children, e.ref, t, false, null, o);
      var a = F();
      He(a, n, i);
      e.dom = a.dom;
    })(e, n, t, o, a);
  }
}
function He(e, t, n) {
  var i = e.dom = document.createTextNode(e.children);
  if (!u(t)) {
    _(t, i, n);
  }
}
function Ne(e, t, n, i, o, r) {
  var s = e.flags;
  var l = e.props;
  var d = e.className;
  var c = e.childFlags;
  var h = e.dom = function (e, t) {
    if (t) {
      return document.createElementNS("http://www.w3.org/2000/svg", e);
    } else {
      return document.createElement(e);
    }
  }(e.type, i = i || (s & 32) > 0);
  var f = e.children;
  if (!a(d) && d !== "") {
    if (i) {
      h.setAttribute("class", d);
    } else {
      h.className = d;
    }
  }
  if (c === 16) {
    I(h, f);
  } else if (c !== 1) {
    var p = i && e.type !== "foreignObject";
    if (c === 2) {
      if (f.flags & 16384) {
        e.children = f = V(f);
      }
      Fe(f, h, n, p, null, r);
    } else if (c === 8 || c === 4) {
      ze(f, h, n, p, null, r);
    }
  }
  if (!u(t)) {
    _(t, h, o);
  }
  if (!u(l)) {
    Re(e, s, l, h, i);
  }
  De(e.ref, h, r);
}
function ze(e, t, n, i, o, a) {
  for (var r = 0; r < e.length; ++r) {
    var s = e[r];
    if (s.flags & 16384) {
      e[r] = s = V(s);
    }
    Fe(s, t, n, i, o, a);
  }
}
function je(e, t, n) {
  De(e, t, n);
  if (s(t.componentDidMount)) {
    n.push(function (e) {
      return function () {
        e.componentDidMount();
      };
    }(t));
  }
}
function We(e, t) {
  var n = e.ref;
  if (!a(n)) {
    O(n.onComponentWillMount, e.props || f);
    if (s(n.onComponentDidMount)) {
      t.push(function (e, t) {
        return function () {
          e.onComponentDidMount(x(t, true), t.props || f);
        };
      }(n, e));
    }
  }
}
function Ge(e, t, n, i, o, l, c) {
  var h = t.flags |= 16384;
  if (e.flags !== h || e.type !== t.type || e.key !== t.key || h & 2048) {
    if (e.flags & 16384) {
      (function (e, t, n, i, o, a) {
        Te(e);
        if ((t.flags & e.flags & 2033) != 0) {
          Fe(t, null, i, o, null, a);
          (function (e, t, n) {
            e.replaceChild(t, n);
          })(n, t.dom, e.dom);
        } else {
          Fe(t, n, i, o, x(e, true), a);
          w(e, n);
        }
      })(e, t, n, i, o, c);
    } else {
      Fe(t, n, i, o, l, c);
    }
  } else if (h & 481) {
    (function (e, t, n, i, o, r) {
      var s;
      var l = t.dom = e.dom;
      var u = e.props;
      var d = t.props;
      var c = false;
      var h = false;
      i = i || (o & 32) > 0;
      if (u !== d) {
        var p = u || f;
        if ((s = d || f) !== f) {
          if (c = (o & 448) > 0) {
            h = we(s);
          }
          for (var g in s) {
            var m = p[g];
            var _ = s[g];
            if (m !== _) {
              Me(g, m, _, l, i, h, e);
            }
          }
        }
        if (p !== f) {
          for (var v in p) {
            if (a(s[v]) && !a(p[v])) {
              Me(v, p[v], null, l, i, h, e);
            }
          }
        }
      }
      var y = t.children;
      var b = t.className;
      if (e.className !== b) {
        if (a(b)) {
          l.removeAttribute("class");
        } else if (i) {
          l.setAttribute("class", b);
        } else {
          l.className = b;
        }
      }
      if (o & 4096) {
        (function (e, t) {
          if (e.textContent !== t) {
            e.textContent = t;
          }
        })(l, y);
      } else {
        qe(e.childFlags, t.childFlags, e.children, y, l, n, i && t.type !== "foreignObject", null, e, r);
      }
      if (c) {
        be(o, t, l, s, false, h);
      }
      var x = t.ref;
      var w = e.ref;
      if (w !== x) {
        ke(w);
        De(x, l, r);
      }
    })(e, t, i, o, h, c);
  } else if (h & 4) {
    (function (e, t, n, i, o, a, r) {
      var l = t.children = e.children;
      if (u(l)) {
        return;
      }
      l.$L = r;
      var c = t.props || f;
      var h = t.ref;
      var p = e.ref;
      var g = l.state;
      if (!l.$N) {
        if (s(l.componentWillReceiveProps)) {
          l.$BR = true;
          l.componentWillReceiveProps(c, i);
          if (l.$UN) {
            return;
          }
          l.$BR = false;
        }
        if (!u(l.$PS)) {
          g = d(g, l.$PS);
          l.$PS = null;
        }
      }
      $e(l, g, c, n, i, o, false, a, r);
      if (p !== h) {
        ke(p);
        De(h, l, r);
      }
    })(e, t, n, i, o, l, c);
  } else if (h & 8) {
    (function (e, t, n, i, o, r, l) {
      var u = true;
      var d = t.props || f;
      var c = t.ref;
      var h = e.props;
      var p = !a(c);
      var g = e.children;
      if (p && s(c.onComponentShouldUpdate)) {
        u = c.onComponentShouldUpdate(h, d);
      }
      if (u !== false) {
        if (p && s(c.onComponentWillUpdate)) {
          c.onComponentWillUpdate(h, d);
        }
        var m = W(Ve(t, i));
        Ge(g, m, n, i, o, r, l);
        t.children = m;
        if (p && s(c.onComponentDidUpdate)) {
          c.onComponentDidUpdate(h, d);
        }
      } else {
        t.children = g;
      }
    })(e, t, n, i, o, l, c);
  } else if (h & 16) {
    (function (e, t) {
      var n = t.children;
      var i = t.dom = e.dom;
      if (n !== e.children) {
        i.nodeValue = n;
      }
    })(e, t);
  } else if (h & 512) {
    t.dom = e.dom;
  } else if (h & 8192) {
    (function (e, t, n, i, o, a) {
      var r = e.children;
      var s = t.children;
      var l = e.childFlags;
      var u = t.childFlags;
      var d = null;
      if (u & 12 && s.length === 0) {
        u = t.childFlags = 2;
        s = t.children = F();
      }
      var c = (u & 2) != 0;
      if (l & 12) {
        var h = r.length;
        if (l & 8 && u & 8 || c || !c && s.length > h) {
          d = x(r[h - 1], false).nextSibling;
        }
      }
      qe(l, u, r, s, n, i, o, d, e, a);
    })(e, t, n, i, o, c);
  } else {
    (function (e, t, n, i) {
      var o = e.ref;
      var a = t.ref;
      var s = t.children;
      qe(e.childFlags, t.childFlags, e.children, s, o, n, false, null, e, i);
      t.dom = e.dom;
      if (o !== a && !r(s)) {
        var l = s.dom;
        v(o, l);
        m(a, l);
      }
    })(e, t, i, c);
  }
}
function qe(e, t, n, i, o, a, r, s, l, u) {
  switch (e) {
    case 2:
      switch (t) {
        case 2:
          Ge(n, i, o, a, r, s, u);
          break;
        case 1:
          Ie(n, o);
          break;
        case 16:
          Te(n);
          I(o, i);
          break;
        default:
          (function (e, t, n, i, o, a) {
            Te(e);
            ze(t, n, i, o, x(e, true), a);
            w(e, n);
          })(n, i, o, a, r, u);
      }
      break;
    case 1:
      switch (t) {
        case 2:
          Fe(i, o, a, r, s, u);
          break;
        case 1:
          break;
        case 16:
          I(o, i);
          break;
        default:
          ze(i, o, a, r, s, u);
      }
      break;
    case 16:
      switch (t) {
        case 16:
          (function (e, t, n) {
            if (e !== t) {
              if (e !== "") {
                n.firstChild.nodeValue = t;
              } else {
                I(n, t);
              }
            }
          })(n, i, o);
          break;
        case 2:
          Oe(o);
          Fe(i, o, a, r, s, u);
          break;
        case 1:
          Oe(o);
          break;
        default:
          Oe(o);
          ze(i, o, a, r, s, u);
      }
      break;
    default:
      switch (t) {
        case 16:
          Ee(n);
          I(o, i);
          break;
        case 2:
          Ae(o, l, n);
          Fe(i, o, a, r, s, u);
          break;
        case 1:
          Ae(o, l, n);
          break;
        default:
          var d = n.length | 0;
          var c = i.length | 0;
          if (d === 0) {
            if (c > 0) {
              ze(i, o, a, r, s, u);
            }
          } else if (c === 0) {
            Ae(o, l, n);
          } else if (t === 8 && e === 8) {
            (function (e, t, n, i, o, a, r, s, l, u) {
              var d;
              var c;
              var h = a - 1;
              var f = r - 1;
              var p = 0;
              var g = e[p];
              var m = t[p];
              e: {
                while (g.key === m.key) {
                  if (m.flags & 16384) {
                    t[p] = m = V(m);
                  }
                  Ge(g, m, n, i, o, s, u);
                  e[p] = m;
                  if (++p > h || p > f) {
                    break e;
                  }
                  g = e[p];
                  m = t[p];
                }
                g = e[h];
                m = t[f];
                while (g.key === m.key) {
                  if (m.flags & 16384) {
                    t[f] = m = V(m);
                  }
                  Ge(g, m, n, i, o, s, u);
                  e[h] = m;
                  h--;
                  f--;
                  if (p > h || p > f) {
                    break e;
                  }
                  g = e[h];
                  m = t[f];
                }
              }
              if (p > h) {
                if (p <= f) {
                  for (c = (d = f + 1) < r ? x(t[d], true) : s; p <= f;) {
                    if ((m = t[p]).flags & 16384) {
                      t[p] = m = V(m);
                    }
                    ++p;
                    Fe(m, n, i, o, c, u);
                  }
                }
              } else if (p > f) {
                while (p <= h) {
                  Ie(e[p++], n);
                }
              } else {
                (function (e, t, n, i, o, a, r, s, l, u, d, c, h) {
                  var f;
                  var p;
                  var g;
                  var m = 0;
                  var _ = s;
                  var v = s;
                  var y = a - s + 1;
                  var b = r - s + 1;
                  var w = new Int32Array(b + 1);
                  var S = y === i;
                  var k = false;
                  var D = 0;
                  var I = 0;
                  if (o < 4 || (y | b) < 32) {
                    for (m = _; m <= a; ++m) {
                      f = e[m];
                      if (I < b) {
                        for (s = v; s <= r; s++) {
                          p = t[s];
                          if (f.key === p.key) {
                            w[s - v] = m + 1;
                            if (S) {
                              for (S = false; _ < m;) {
                                Ie(e[_++], l);
                              }
                            }
                            if (D > s) {
                              k = true;
                            } else {
                              D = s;
                            }
                            if (p.flags & 16384) {
                              t[s] = p = V(p);
                            }
                            Ge(f, p, l, n, u, d, h);
                            ++I;
                            break;
                          }
                        }
                        if (!S && s > r) {
                          Ie(f, l);
                        }
                      } else if (!S) {
                        Ie(f, l);
                      }
                    }
                  } else {
                    var T = {};
                    for (m = v; m <= r; ++m) {
                      T[t[m].key] = m;
                    }
                    for (m = _; m <= a; ++m) {
                      f = e[m];
                      if (I < b) {
                        if ((s = T[f.key]) !== undefined) {
                          if (S) {
                            for (S = false; m > _;) {
                              Ie(e[_++], l);
                            }
                          }
                          w[s - v] = m + 1;
                          if (D > s) {
                            k = true;
                          } else {
                            D = s;
                          }
                          if ((p = t[s]).flags & 16384) {
                            t[s] = p = V(p);
                          }
                          Ge(f, p, l, n, u, d, h);
                          ++I;
                        } else if (!S) {
                          Ie(f, l);
                        }
                      } else if (!S) {
                        Ie(f, l);
                      }
                    }
                  }
                  if (S) {
                    Ae(l, c, e);
                    ze(t, l, n, u, d, h);
                  } else if (k) {
                    var E = function (e) {
                      var t = 0;
                      var n = 0;
                      var i = 0;
                      var o = 0;
                      var a = 0;
                      var r = 0;
                      var s = 0;
                      var l = e.length;
                      if (l > Ue) {
                        Ue = l;
                        ge = new Int32Array(l);
                        me = new Int32Array(l);
                      }
                      for (; n < l; ++n) {
                        if ((t = e[n]) !== 0) {
                          i = ge[o];
                          if (e[i] < t) {
                            me[n] = i;
                            ge[++o] = n;
                            continue;
                          }
                          a = 0;
                          r = o;
                          while (a < r) {
                            if (e[ge[s = a + r >> 1]] < t) {
                              a = s + 1;
                            } else {
                              r = s;
                            }
                          }
                          if (t < e[ge[a]]) {
                            if (a > 0) {
                              me[n] = ge[a - 1];
                            }
                            ge[a] = n;
                          }
                        }
                      }
                      a = o + 1;
                      var u = new Int32Array(a);
                      r = ge[a - 1];
                      while (a-- > 0) {
                        u[a] = r;
                        r = me[r];
                        ge[a] = 0;
                      }
                      return u;
                    }(w);
                    s = E.length - 1;
                    m = b - 1;
                    for (; m >= 0; m--) {
                      if (w[m] === 0) {
                        if ((p = t[D = m + v]).flags & 16384) {
                          t[D] = p = V(p);
                        }
                        Fe(p, l, n, u, (g = D + 1) < o ? x(t[g], true) : d, h);
                      } else if (s < 0 || m !== E[s]) {
                        C(p = t[D = m + v], l, (g = D + 1) < o ? x(t[g], true) : d);
                      } else {
                        s--;
                      }
                    }
                  } else if (I !== b) {
                    for (m = b - 1; m >= 0; m--) {
                      if (w[m] === 0) {
                        if ((p = t[D = m + v]).flags & 16384) {
                          t[D] = p = V(p);
                        }
                        Fe(p, l, n, u, (g = D + 1) < o ? x(t[g], true) : d, h);
                      }
                    }
                  }
                })(e, t, i, a, r, h, f, p, n, o, s, l, u);
              }
            })(n, i, o, a, r, d, c, s, l, u);
          } else {
            (function (e, t, n, i, o, a, r, s, l) {
              var u;
              var d;
              for (var c = a > r ? r : a, h = 0; h < c; ++h) {
                u = t[h];
                d = e[h];
                if (u.flags & 16384) {
                  u = t[h] = V(u);
                }
                Ge(d, u, n, i, o, s, l);
                e[h] = u;
              }
              if (a < r) {
                for (h = c; h < r; ++h) {
                  if ((u = t[h]).flags & 16384) {
                    u = t[h] = V(u);
                  }
                  Fe(u, n, i, o, s, l);
                }
              } else if (a > r) {
                for (h = c; h < a; ++h) {
                  Ie(e[h], n);
                }
              }
            })(n, i, o, a, r, d, c, s, u);
          }
      }
  }
}
function $e(e, t, n, i, o, a, r, l, u) {
  var c = e.state;
  var h = e.props;
  var f = Boolean(e.$N);
  var p = s(e.shouldComponentUpdate);
  if (f) {
    t = S(e, n, t !== c ? d(c, t) : t);
  }
  if (r || !p || p && e.shouldComponentUpdate(n, t, o)) {
    if (!f && s(e.componentWillUpdate)) {
      e.componentWillUpdate(n, t, o);
    }
    e.props = n;
    e.state = t;
    e.context = o;
    var g = null;
    var m = Be(e, n, o);
    if (f && s(e.getSnapshotBeforeUpdate)) {
      g = e.getSnapshotBeforeUpdate(h, c);
    }
    Ge(e.$LI, m, i, e.$CX, a, l, u);
    e.$LI = m;
    if (s(e.componentDidUpdate)) {
      (function (e, t, n, i, o) {
        o.push(function () {
          e.componentDidUpdate(t, n, i);
        });
      })(e, h, c, g, u);
    }
  } else {
    e.props = n;
    e.state = t;
    e.context = o;
  }
}
var Ue = 0;
function Ke(e, t, n, i) {
  var o = [];
  var r = t.$V;
  k.v = true;
  if (a(r)) {
    if (!a(e)) {
      if (e.flags & 16384) {
        e = V(e);
      }
      Fe(e, t, i, false, null, o);
      t.$V = e;
      r = e;
    }
  } else if (a(e)) {
    Ie(r, t);
    t.$V = null;
  } else {
    if (e.flags & 16384) {
      e = V(e);
    }
    Ge(r, e, t, i, false, null, o);
    r = t.$V = e;
  }
  y(o);
  k.v = false;
  if (s(n)) {
    n();
  }
  if (s(D.renderComplete)) {
    D.renderComplete(r, t);
  }
}
function Ze(e, t, n = null, i = f) {
  Ke(e, t, n, i);
}
function Ye(e) {
  return function (t, n, i, o) {
    e ||= t;
    Ze(n, e, i, o);
  };
}
if (typeof document != "undefined" && window.Node) {
  Node.prototype.$EV = null;
  Node.prototype.$V = null;
}
var Xe = [];
var Qe = typeof Promise != "undefined" ? Promise.resolve().then.bind(Promise.resolve()) : function (e) {
  window.setTimeout(e, 0);
};
var Je = false;
function et(e, t, n, i) {
  var o = e.$PS;
  if (s(t)) {
    t = t(o ? d(e.state, o) : e.state, e.props, e.context);
  }
  if (a(o)) {
    e.$PS = t;
  } else {
    for (var r in t) {
      o[r] = t[r];
    }
  }
  if (e.$BR) {
    if (s(n)) {
      e.$L.push(n.bind(e));
    }
  } else {
    if (!k.v && Xe.length === 0) {
      it(e, i);
      if (s(n)) {
        n.call(e);
      }
      return;
    }
    if (Xe.indexOf(e) === -1) {
      Xe.push(e);
    }
    if (i) {
      e.$F = true;
    }
    if (!Je) {
      Je = true;
      Qe(nt);
    }
    if (s(n)) {
      var l = e.$QU;
      l ||= e.$QU = [];
      l.push(n);
    }
  }
}
function tt(e) {
  for (var t = e.$QU, n = 0; n < t.length; ++n) {
    t[n].call(e);
  }
  e.$QU = null;
}
function nt() {
  var e;
  for (Je = false; e = Xe.shift();) {
    if (!e.$UN) {
      var t = e.$F;
      e.$F = false;
      it(e, t);
      if (e.$QU) {
        tt(e);
      }
    }
  }
}
function it(e, t) {
  if (t || !e.$BR) {
    var n = e.$PS;
    e.$PS = null;
    var i = [];
    k.v = true;
    $e(e, d(e.state, n), e.props, x(e.$LI, true).parentNode, e.context, e.$SVG, t, null, i);
    y(i);
    k.v = false;
  } else {
    e.state = e.$PS;
    e.$PS = null;
  }
}
function ot(e, t) {
  this.state = null;
  this.$BR = false;
  this.$BS = true;
  this.$PS = null;
  this.$LI = null;
  this.$UN = false;
  this.$CX = null;
  this.$QU = null;
  this.$N = false;
  this.$L = null;
  this.$SVG = false;
  this.$F = false;
  this.props = e || f;
  this.context = t || f;
}
ot.prototype.forceUpdate = function (e) {
  if (!this.$UN) {
    et(this, {}, e, true);
  }
};
ot.prototype.setState = function (e, t) {
  if (!this.$UN && !this.$BS) {
    et(this, e, t, false);
  }
};
ot.prototype.render = function (e, t, n) {
  return null;
};
var at = "7.4.11";