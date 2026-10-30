exports.default = undefined;
var i = f(require("./94553.js"));
var o = require("./13306.js");
var a = f(require("./73349.js"));
var r = require("./58201.js");
var s = f(require("./20476.js"));
var l = require("./35922.js");
var u = f(require("./44504.js"));
var d = f(require("./17381.js"));
var c = f(require("./2418.js"));
var h = f(require("./39618.js"));
function f(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
function p(e) {
  return (p = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function (e) {
    return typeof e;
  } : function (e) {
    if (e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype) {
      return "symbol";
    } else {
      return typeof e;
    }
  })(e);
}
function g() {
  return (g = Object.assign ? Object.assign.bind() : function (e) {
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
var m = (0, r.getWindow)();
var _ = {
  mouseenter: "mouseover",
  mouseleave: "mouseout",
  pointerenter: "pointerover",
  pointerleave: "pointerout"
};
var v = {
  focusin: "focus",
  focusout: "blur"
};
var y = ["blur", "focus", "load"];
var b = ["touchmove", "wheel", "mousewheel", "touchstart"];
function x(e, t) {
  return !(0, l.isWindow)(e) && e.nodeName !== "#document" && a.default.elementMatches(e, t);
}
var w;
var C;
var S;
var k = new WeakMap();
var D = 0;
C = {};
i.default.add(function (e, t) {
  C[e] = t;
});
var I = {
  getField: function (e, t) {
    return C[e] && C[e][t];
  },
  callMethod: function (e, t, n, i) {
    return C[e] && C[e][t] && C[e][t].apply(n, i);
  }
};
var T = (0, s.default)({
  on: O(R(L(function (e, t, n, i, o) {
    P(e, t).addHandler(o, n, i);
  }))),
  one: O(R(function (e, t, n, i, o) {
    T.on(e, t, n, i, function i() {
      T.off(e, t, n, i);
      o.apply(this, arguments);
    });
  })),
  off: O((S = L(function (e, t, n, i) {
    P(e, t).removeHandler(i, n);
  }), function (e, t, n, i) {
    if (typeof n == "function") {
      i = n;
      n = undefined;
    }
    S(e, t, n, i);
  })),
  trigger: O(B(function (e, t, n) {
    var i = t.type;
    var a = P(e, t.type);
    I.callMethod(i, "trigger", e, [t, n]);
    a.callHandlers(t, n);
    if (!I.getField(i, "noBubble") && !t.isPropagationStopped() && y.indexOf(i) === -1) {
      var r = [];
      (function e(t) {
        var i = t.parentNode ?? t.host;
        if (i) {
          r.push(i);
          e(i);
        }
      })(e);
      r.push(m);
      for (var s = 0; r[s] && !t.isPropagationStopped();) {
        P(r[s], t.type).callHandlers((0, o.extend)(t, {
          currentTarget: r[s]
        }), n);
        s++;
      }
    }
    if (e.nodeType || (0, l.isWindow)(e)) {
      I.callMethod(i, "_default", e, [t, n]);
      (function (e, t) {
        var n = v[e] || e;
        if (function (e, t) {
          return e === "click" && t.localName === "a";
        }(e, t)) {
          return;
        }
        if ((0, l.isFunction)(t[n])) {
          w = e;
          t[n]();
          w = undefined;
        }
      })(i, e);
    }
  })),
  triggerHandler: O(B(function (e, t, n) {
    P(e, t.type).callHandlers(t, n);
  }))
});
function E(e, t) {
  var n = e[0];
  if (n) {
    if (a.default.isNode(n) || (0, l.isWindow)(n)) {
      t.apply(T, e);
    } else {
      if ((0, l.isString)(n) || !("length" in n)) {
        throw d.default.Error("E0025");
      }
      var i = Array.prototype.slice.call(e, 0);
      Array.prototype.forEach.call(n, function (e) {
        i[0] = e;
        E(i, t);
      });
    }
  }
}
function O(e) {
  return function () {
    E(arguments, e);
  };
}
var A = (0, h.default)(function () {
  var e = false;
  try {
    var t = Object.defineProperty({}, "passive", {
      get: function () {
        e = true;
        return true;
      }
    });
    m.addEventListener("test", null, t);
  } catch (e) {}
  return e;
});
function P(e, t) {
  var n = k.get(e);
  var i = (t = t || "").split(".");
  var o = i.slice(1);
  var r = !!i[0];
  t = i[0] || "dxEmptyEventType";
  if (!n) {
    n = {};
    k.set(e, n);
  }
  n[t] ||= {
    handleObjects: [],
    nativeHandler: null
  };
  var s = n[t];
  return {
    addHandler: function (n, i, u) {
      function d(i, o) {
        var a;
        var r;
        var s = [i];
        var d = i.currentTarget;
        var c = i.relatedTarget;
        if (t in _) {
          a = c && d && (c === d || function e(t, n) {
            if ((0, l.isWindow)(t)) {
              return e(t.document, n);
            } else if (t.contains) {
              return t.contains(n);
            } else {
              return !!(n.compareDocumentPosition(t) & n.DOCUMENT_POSITION_CONTAINS);
            }
          }(d, c));
        }
        if (o !== undefined) {
          s.push(o);
        }
        I.callMethod(t, "handle", e, [i, u]);
        if (!a) {
          r = n.apply(d, s);
        }
        if (r === false) {
          i.preventDefault();
          i.stopPropagation();
        }
      }
      var c = {
        handler: n,
        wrappedHandler: function (t, n) {
          if (!w || t.type !== w) {
            t.data = u;
            t.delegateTarget = e;
            if (i) {
              for (var o = t.target; o && o !== e;) {
                if (x(o, i)) {
                  t.currentTarget = o;
                  d(t, n);
                }
                o = o.parentNode;
              }
            } else {
              t.currentTarget = t.delegateTarget || t.target;
              d(t, n);
            }
          }
        },
        selector: i,
        type: t,
        data: u,
        namespace: o.join("."),
        namespaces: o,
        guid: ++D
      };
      s.handleObjects.push(c);
      var h;
      var f;
      var p = s.handleObjects.length === 1 && r;
      p &&= !I.callMethod(t, "setup", e, [u, o, n]);
      if (p) {
        f = t;
        s.nativeHandler = function (e, t) {
          var n = P(this, f);
          e = T.Event(e);
          n.callHandlers(e, t);
        };
        if (A() && b.indexOf(t) > -1) {
          h = {
            passive: false
          };
        }
        s.removeListener = a.default.listen(e, _[t] || t, s.nativeHandler, h);
      }
      I.callMethod(t, "add", e, [c]);
    },
    removeHandler: function (i, a) {
      function s(t) {
        var r;
        var s = n[t];
        if (s.handleObjects.length) {
          s.handleObjects = s.handleObjects.filter(function (n) {
            var s = o.length && !M(n.namespaces, o) || i && n.handler !== i || a && n.selector !== a;
            if (!s) {
              r = n.handler;
              I.callMethod(t, "remove", e, [n]);
            }
            return s;
          });
          if (!s.handleObjects.length && t !== "dxEmptyEventType") {
            I.callMethod(t, "teardown", e, [o, r]);
            if (s.nativeHandler) {
              s.removeListener();
            }
            delete n[t];
          }
        } else {
          delete n[t];
        }
      }
      if (r) {
        s(t);
      } else {
        for (var l in n) {
          s(l);
        }
      }
      if (Object.keys(n).length === 0) {
        k.delete(e);
      }
    },
    callHandlers: function (e, t) {
      var i = false;
      function a(n) {
        if (!i && (!o.length || !!M(n.namespaces, o))) {
          n.wrappedHandler(e, t);
          i = e.isImmediatePropagationStopped();
        }
      }
      s.handleObjects.forEach(a);
      if (o.length && n.dxEmptyEventType) {
        n.dxEmptyEventType.handleObjects.forEach(a);
      }
    }
  };
}
function M(e, t) {
  for (var n = 0; n < t.length; n++) {
    if (e.indexOf(t[n]) < 0) {
      return false;
    }
  }
  return true;
}
function R(e) {
  return function (t, n, i, o, a) {
    if (!a) {
      a = o;
      o = undefined;
    }
    if (typeof i != "string") {
      o = i;
      i = undefined;
    }
    if (!a && typeof n == "string") {
      a = o || i;
      i = undefined;
      o = undefined;
    }
    e(t, n, i, o, a);
  };
}
function B(e) {
  return function (t, n, i) {
    if (typeof n == "string") {
      n = {
        type: n
      };
    }
    n.target ||= t;
    n.currentTarget = t;
    n.delegateTarget ||= t;
    if (!n.type && n.originalEvent) {
      n.type = n.originalEvent.type;
    }
    e(t, n instanceof T.Event ? n : T.Event(n), i);
  };
}
function L(e) {
  function t(t, n) {
    if (n && n.indexOf(" ") > -1) {
      var i = Array.prototype.slice.call(arguments, 0);
      n.split(" ").forEach(function (t) {
        i[1] = t;
        e.apply(this, i);
      });
    } else {
      e.apply(this, arguments);
    }
  }
  return function (e, n) {
    if (p(n) === "object") {
      var i = Array.prototype.slice.call(arguments, 0);
      for (var o in n) {
        i[1] = o;
        i[i.length - 1] = n[o];
        t.apply(this, i);
      }
    } else {
      t.apply(this, arguments);
    }
  };
}
function V(e) {
  if (function (e) {
    return e.which == null && e.type.indexOf("key") === 0;
  }(e)) {
    return e.charCode ?? e.keyCode;
  }
  if (function (e) {
    return !e.which && e.button !== undefined && /^(?:mouse|pointer|contextmenu|drag|drop)|click/.test(e.type);
  }(e)) {
    return {
      1: 1,
      2: 3,
      3: 1,
      4: 2
    }[e.button];
  }
  return e.which;
}
function F(e) {
  if (e) {
    T.Event = e;
    T.Event.prototype = e.prototype;
  }
}
function H(e, t, n) {
  Object.defineProperty(n || T.Event.prototype, e, {
    enumerable: true,
    configurable: true,
    get: function () {
      return this.originalEvent && t(this.originalEvent);
    },
    set: function (t) {
      Object.defineProperty(this, e, {
        enumerable: true,
        configurable: true,
        writable: true,
        value: t
      });
    }
  });
}
F(function (e) {
  T.Event = function (t, n) {
    if (!(this instanceof T.Event)) {
      return new T.Event(t, n);
    }
    t ||= {};
    if (typeof t == "string") {
      t = {
        type: t
      };
    }
    n ||= {};
    e.call(this, t, n);
  };
  g(T.Event.prototype, {
    _propagationStopped: false,
    _immediatePropagationStopped: false,
    _defaultPrevented: false,
    isPropagationStopped: function () {
      return !!this._propagationStopped || !!this.originalEvent && !!this.originalEvent.propagationStopped;
    },
    stopPropagation: function () {
      this._propagationStopped = true;
      if (this.originalEvent) {
        this.originalEvent.stopPropagation();
      }
    },
    isImmediatePropagationStopped: function () {
      return this._immediatePropagationStopped;
    },
    stopImmediatePropagation: function () {
      this.stopPropagation();
      this._immediatePropagationStopped = true;
      if (this.originalEvent) {
        this.originalEvent.stopImmediatePropagation();
      }
    },
    isDefaultPrevented: function () {
      return !!this._defaultPrevented || !!this.originalEvent && !!this.originalEvent.defaultPrevented;
    },
    preventDefault: function () {
      this._defaultPrevented = true;
      if (this.originalEvent) {
        this.originalEvent.preventDefault();
      }
    }
  });
  return T.Event;
}(function (e, t) {
  if (e instanceof T.Event || (0, r.hasWindow)() && e instanceof m.Event || e.view?.Event && e instanceof e.view.Event) {
    this.originalEvent = e;
    this.type = e.type;
    this.currentTarget = undefined;
    if (Object.prototype.hasOwnProperty.call(e, "isTrusted")) {
      this.isTrusted = e.isTrusted;
    }
    this.timeStamp = e.timeStamp || Date.now();
  } else {
    g(this, e);
  }
  H("which", V, this);
  if (e.type.indexOf("touch") === 0) {
    delete t.pageX;
    delete t.pageY;
  }
  g(this, t);
  this.guid = ++D;
}));
["target", "relatedTarget", "delegateTarget", "altKey", "bubbles", "cancelable", "changedTouches", "ctrlKey", "detail", "eventPhase", "metaKey", "shiftKey", "view", "char", "code", "charCode", "key", "keyCode", "button", "buttons", "offsetX", "offsetY", "pointerId", "pointerType", "targetTouches", "toElement", "touches"].forEach(function (e) {
  return H(e, function (t) {
    return t[e];
  });
});
(0, c.default)(H);
var N = (0, u.default)();
var z = (0, u.default)();
T.set = function (e) {
  N.fire();
  T.inject(e);
  F(e.Event);
  z.fire();
};
T.subscribeGlobal = function () {
  E(arguments, R(function () {
    var e = arguments;
    T.on.apply(this, e);
    N.add(function () {
      var t = Array.prototype.slice.call(e, 0);
      t.splice(3, 1);
      T.off.apply(this, t);
    });
    z.add(function () {
      T.on.apply(this, e);
    });
  }));
};
T.forcePassiveFalseEventNames = b;
T.passiveEventHandlersSupported = A;
var j = T;
exports.default = j;
module.exports = exports.default;
module.exports.default = exports.default;