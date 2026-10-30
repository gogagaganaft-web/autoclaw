exports.visibility = exports.resize = exports.keyboard = exports.hover = exports.focus = exports.dxClick = exports.click = exports.active = undefined;
var i = r(require("./55994.js"));
var o = r(require("./51661.js"));
var a = require("./39611.js");
function r(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
function s(e, t) {
  if (t) {
    return (0, a.addNamespace)(e, t);
  } else {
    return e;
  }
}
function l(e, t) {
  if (typeof e == "function") {
    return e(t);
  } else {
    return e.execute(t);
  }
}
var u = {
  on: function (e, t, n, o) {
    var a = o.selector;
    var r = o.showTimeout;
    var u = o.hideTimeout;
    var d = o.namespace;
    i.default.on(e, s("dxactive", d), a, {
      timeout: r
    }, function (e) {
      return l(t, {
        event: e,
        element: e.currentTarget
      });
    });
    i.default.on(e, s("dxinactive", d), a, {
      timeout: u
    }, function (e) {
      return l(n, {
        event: e,
        element: e.currentTarget
      });
    });
  },
  off: function (e, t) {
    var n = t.namespace;
    var o = t.selector;
    i.default.off(e, s("dxactive", n), o);
    i.default.off(e, s("dxinactive", n), o);
  }
};
exports.active = u;
var d = {
  on: function (e, t, n = {}) {
    var o = n.namespace;
    i.default.on(e, s("dxresize", o), t);
  },
  off: function (e, t = {}) {
    var n = t.namespace;
    i.default.off(e, s("dxresize", n));
  }
};
exports.resize = d;
var c = {
  on: function (e, t, n, o) {
    var a = o.selector;
    var r = o.namespace;
    i.default.on(e, s("dxhoverend", r), a, function (e) {
      return n(e);
    });
    i.default.on(e, s("dxhoverstart", r), a, function (e) {
      return l(t, {
        element: e.target,
        event: e
      });
    });
  },
  off: function (e, t) {
    var n = t.selector;
    var o = t.namespace;
    i.default.off(e, s("dxhoverstart", o), n);
    i.default.off(e, s("dxhoverend", o), n);
  }
};
exports.hover = c;
var h = {
  on: function (e, t, n, o) {
    var a = o.namespace;
    i.default.on(e, s("dxhiding", a), n);
    i.default.on(e, s("dxshown", a), t);
  },
  off: function (e, t) {
    var n = t.namespace;
    i.default.off(e, s("dxhiding", n));
    i.default.off(e, s("dxshown", n));
  }
};
exports.visibility = h;
var f = {
  on: function (e, t, n, o) {
    var a = o.namespace;
    i.default.on(e, s("focusin", a), t);
    i.default.on(e, s("focusout", a), n);
  },
  off: function (e, t) {
    var n = t.namespace;
    i.default.off(e, s("focusin", n));
    i.default.off(e, s("focusout", n));
  },
  trigger: function (e) {
    return i.default.trigger(e, "focus");
  }
};
exports.focus = f;
var p = {
  on: function (e, t, n = {}) {
    var o = n.namespace;
    i.default.on(e, s("dxclick", o), t);
  },
  off: function (e, t = {}) {
    var n = t.namespace;
    i.default.off(e, s("dxclick", n));
  }
};
exports.dxClick = p;
var g = {
  on: function (e, t, n = {}) {
    var o = n.namespace;
    i.default.on(e, s("click", o), t);
  },
  off: function (e, t = {}) {
    var n = t.namespace;
    i.default.off(e, s("click", n));
  }
};
exports.click = g;
var m = 0;
var _ = {};
var v = {
  on: function (e, t, n) {
    var i = `keyboardProcessorId${m++}`;
    _[i] = new o.default({
      element: e,
      focusTarget: t,
      handler: n
    });
    return i;
  },
  off: function (e) {
    if (e && _[e]) {
      _[e].dispose();
      delete _[e];
    }
  },
  _getProcessor: function (e) {
    return _[e];
  }
};
exports.keyboard = v;