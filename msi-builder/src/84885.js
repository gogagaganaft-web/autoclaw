Object.defineProperty(exports, "__esModule", {
  value: true
});
var i = require("./55285.js");
var o = require("./25326.js");
function a(e, t) {
  return Boolean(t && t.dangerouslySetInnerHTML && t.dangerouslySetInnerHTML.__html && function (e, t) {
    var n = document.createElement("i");
    n.innerHTML = t;
    return n.innerHTML === e.innerHTML;
  }(e, t.dangerouslySetInnerHTML.__html));
}
function r(e, t, n, r, s, u) {
  var d = e.childFlags;
  var c = e.children;
  var h = e.props;
  var f = e.flags;
  if (d !== 1) {
    if (d === 2) {
      if (o.isNull(n)) {
        i._M(c, t, r, s, null, u);
      } else {
        n = (n = l(c, t, n, r, s, u)) ? n.nextSibling : null;
      }
    } else if (d === 16) {
      if (o.isNull(n)) {
        t.appendChild(document.createTextNode(c));
      } else if (t.childNodes.length !== 1 || n.nodeType !== 3) {
        t.textContent = c;
      } else if (n.nodeValue !== c) {
        n.nodeValue = c;
      }
      n = null;
    } else if (d & 12) {
      var p = false;
      for (var g = 0, m = c.length; g < m; ++g) {
        var _ = c[g];
        if (o.isNull(n) || p && (_.flags & 16) > 0) {
          i._M(_, t, r, s, n, u);
        } else {
          n = (n = l(_, t, n, r, s, u)) ? n.nextSibling : null;
        }
        p = (_.flags & 16) > 0;
      }
    }
    if ((f & 8192) == 0) {
      var v = null;
      while (n) {
        v = n.nextSibling;
        t.removeChild(n);
        n = v;
      }
    }
  } else if (!o.isNull(t.firstChild) && !a(t, h)) {
    t.textContent = "";
    if (f & 448) {
      t.defaultValue = "";
    }
  }
}
function s(e, t, n) {
  if (n.nodeType !== 3) {
    t.replaceChild(e.dom = document.createTextNode(e.children), n);
  } else {
    var i = e.children;
    if (n.nodeValue !== i) {
      n.nodeValue = i;
    }
    e.dom = n;
  }
  return e.dom;
}
function l(e, t, n, a, u, d) {
  var c = e.flags |= 16384;
  if (c & 14) {
    return function (e, t, n, o, a, r, s) {
      var u;
      var d = e.type;
      var c = e.ref;
      var h = e.props || i.EMPTY_OBJ;
      if (r) {
        var f = i._CI(e, d, h, o, a, s);
        u = l(p = f.$LI, t, n, f.$CX, a, s);
        i._MCCC(c, f, s);
      } else {
        var p;
        u = l(p = i._HI(i._RFC(e, o)), t, n, o, a, s);
        e.children = p;
        i._MFCC(e, s);
      }
      return u;
    }(e, t, n, a, u, (c & 4) > 0, d);
  } else if (c & 481) {
    return function (e, t, n, a, s, l) {
      var u = e.props;
      var d = e.className;
      var c = e.flags;
      var h = e.ref;
      s = s || (c & 32) > 0;
      if (n.nodeType !== 1) {
        i._ME(e, null, a, s, null, l);
        t.replaceChild(e.dom, n);
      } else {
        e.dom = n;
        r(e, n, n.firstChild, a, s, l);
        if (!o.isNull(u)) {
          i._MP(e, c, u, n, s);
        }
        if (o.isNullOrUndef(d)) {
          if (n.className !== "") {
            n.removeAttribute("class");
          }
        } else if (s) {
          n.setAttribute("class", d);
        } else {
          n.className = d;
        }
        i._MR(h, n, l);
      }
      return e.dom;
    }(e, t, n, a, u, d);
  } else if (c & 16) {
    return s(e, t, n);
  } else if (c & 512) {
    return e.dom = n;
  } else if (c & 8192) {
    return function (e, t, n, i, o, a) {
      var l = e.children;
      if (e.childFlags === 2) {
        s(l, t, n);
        return l.dom;
      } else {
        r(e, t, n, i, o, a);
        return function (e) {
          var t;
          var n;
          while (e) {
            if ((t = e.flags) & 2033) {
              return e.dom;
            }
            n = e.children;
            e = t & 8192 ? e.childFlags === 2 ? n : n[n.length - 1] : t & 4 ? n.$LI : n;
          }
          return null;
        }(l[l.length - 1]);
      }
    }(e, t, n, a, u, d);
  } else {
    o.throwError();
    return null;
  }
}
exports.hydrate = function (e, t, n) {
  var a = t.firstChild;
  if (o.isNull(a)) {
    i.render(e, t, n);
  } else {
    var r = [];
    for (o.isInvalid(e) || (a = l(e, t, a, {}, false, r)); a &&= a.nextSibling;) {
      t.removeChild(a);
    }
    if (r.length > 0) {
      for (var s = undefined; (s = r.shift()) !== undefined;) {
        s();
      }
    }
  }
  t.$V = e;
  if (o.isFunction(n)) {
    n();
  }
};