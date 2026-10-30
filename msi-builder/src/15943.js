Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;
exports.processModules = x;
var i = h(require("./38377.js"));
var o = h(require("./68374.js"));
var a = h(require("./44504.js"));
var r = require("./20576.js");
var s = require("./95479.js");
var l = require("./35922.js");
var u = require("./58201.js");
var d = h(require("./28109.js"));
var c = h(require("./96688.js"));
function h(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
function f() {
  return (f = Object.assign ? Object.assign.bind() : function (e) {
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
function p(e, t) {
  return function (e) {
    if (Array.isArray(e)) {
      return e;
    }
  }(e) || function (e, t) {
    var n = e == null ? null : typeof Symbol != "undefined" && e[Symbol.iterator] || e["@@iterator"];
    if (n != null) {
      var i;
      var o;
      var a;
      var r;
      var s = [];
      var l = true;
      var u = false;
      try {
        a = (n = n.call(e)).next;
        if (t === 0) {
          if (Object(n) !== n) {
            return;
          }
          l = false;
        } else {
          for (; !(l = (i = a.call(n)).done) && (s.push(i.value), s.length !== t); l = true);
        }
      } catch (e) {
        u = true;
        o = e;
      } finally {
        try {
          if (!l && n.return != null && (r = n.return(), Object(r) !== r)) {
            return;
          }
        } finally {
          if (u) {
            throw o;
          }
        }
      }
      return s;
    }
  }(e, t) || function (e, t) {
    if (!e) {
      return;
    }
    if (typeof e == "string") {
      return g(e, t);
    }
    var n = Object.prototype.toString.call(e).slice(8, -1);
    if (n === "Object" && e.constructor) {
      n = e.constructor.name;
    }
    if (n === "Map" || n === "Set") {
      return Array.from(e);
    }
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) {
      return g(e, t);
    }
  }(e, t) || function () {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }();
}
function g(e, t) {
  if (t == null || t > e.length) {
    t = e.length;
  }
  for (var n = 0, i = new Array(t); n < t; n++) {
    i[n] = e[n];
  }
  return i;
}
var m = i.default.inherit({
  _endUpdateCore: function () {},
  ctor: function (e) {
    var t = this;
    t._updateLockCount = 0;
    t.component = e;
    t._actions = {};
    t._actionConfigs = {};
    (0, s.each)(this.callbackNames() || [], function (e, n) {
      var i = t.callbackFlags(n) || {};
      i.unique = true;
      i.syncStrategy = true;
      t[this] = (0, a.default)(i);
    });
  },
  init: function () {},
  callbackNames: function () {},
  callbackFlags: function () {},
  publicMethods: function () {},
  beginUpdate: function () {
    this._updateLockCount++;
  },
  endUpdate: function () {
    if (this._updateLockCount > 0) {
      this._updateLockCount--;
      if (!this._updateLockCount) {
        this._endUpdateCore();
      }
    }
  },
  option: function (e) {
    var t = this.component;
    var n = t._optionCache;
    if (arguments.length === 1 && n) {
      if (!(e in n)) {
        n[e] = t.option(e);
      }
      return n[e];
    } else {
      return t.option.apply(t, arguments);
    }
  },
  _silentOption: function (e, t) {
    var n = this.component;
    var i = n._optionCache;
    if (i) {
      i[e] = t;
    }
    return n._setOptionWithoutOptionChange(e, t);
  },
  localize: function (e) {
    var t = this.component._optionCache;
    if (t) {
      if (!(e in t)) {
        t[e] = d.default.format(e);
      }
      return t[e];
    } else {
      return d.default.format(e);
    }
  },
  on: function () {
    return this.component.on.apply(this.component, arguments);
  },
  off: function () {
    return this.component.off.apply(this.component, arguments);
  },
  optionChanged: function (e) {
    if (e.name in this._actions) {
      this.createAction(e.name, this._actionConfigs[e.name]);
      e.handled = true;
    }
  },
  getAction: function (e) {
    return this._actions[e];
  },
  setAria: function (e, t, n) {
    var i = n.get(0);
    var o = e !== "role" && e !== "id" ? "aria-" : "";
    if (i.setAttribute) {
      i.setAttribute(o + e, t);
    } else {
      n.attr(o + e, t);
    }
  },
  _createComponent: function () {
    return this.component._createComponent.apply(this.component, arguments);
  },
  getController: function (e) {
    return this.component._controllers[e];
  },
  createAction: function (e, t) {
    if ((0, l.isFunction)(e)) {
      var n = this.component._createAction(e.bind(this), t);
      return function (e) {
        n({
          event: e
        });
      };
    }
    this._actions[e] = this.component._createActionByOption(e, t);
    this._actionConfigs[e] = t;
  },
  executeAction: function (e, t) {
    var n = this._actions[e];
    return n && n(t);
  },
  dispose: function () {
    var e = this;
    (0, s.each)(e.callbackNames() || [], function () {
      e[this].empty();
    });
  },
  addWidgetPrefix: function (e) {
    var t = this.component.NAME;
    return `dx-${t.slice(2).toLowerCase()}${e ? `-${e}` : ""}`;
  },
  getWidgetContainerClass: function () {
    var e = this.component.NAME === "dxDataGrid" ? null : "container";
    return this.addWidgetPrefix(e);
  },
  elementIsInsideGrid: function (e) {
    return e.closest(`.${this.getWidgetContainerClass()}`).parent().is(this.component.$element());
  }
});
var _ = m;
var v = _.inherit({
  getView: function (e) {
    return this.component._views[e];
  },
  getViews: function () {
    return this.component._views;
  }
});
var y = m.inherit({
  _isReady: function () {
    return this.component.isReady();
  },
  _endUpdateCore: function () {
    this.callBase();
    if (!this._isReady() && this._requireReady) {
      this._requireRender = false;
      this.component._requireResize = false;
    }
    if (this._requireRender) {
      this._requireRender = false;
      this.render(this._$parent);
    }
  },
  _invalidate: function (e, t) {
    this._requireRender = true;
    this.component._requireResize = (0, u.hasWindow)() && (this.component._requireResize || e);
    this._requireReady = this._requireReady || t;
  },
  _renderCore: function () {},
  _resizeCore: function () {},
  _parentElement: function () {
    return this._$parent;
  },
  ctor: function (e) {
    this.callBase(e);
    this.renderCompleted = (0, a.default)();
    this.resizeCompleted = (0, a.default)();
  },
  element: function () {
    return this._$element;
  },
  getElementHeight: function () {
    var e = this.element();
    if (!e) {
      return 0;
    }
    var t = parseFloat(e.css("marginTop")) || 0;
    var n = parseFloat(e.css("marginBottom")) || 0;
    return e.get(0).offsetHeight + t + n;
  },
  isVisible: function () {
    return true;
  },
  getTemplate: function (e) {
    return this.component._getTemplate(e);
  },
  render: function (e, t) {
    var n = this;
    var i = this._$element;
    var a = this.isVisible();
    if ((i || e) && (this._requireReady = false, i || (i = this._$element = (0, o.default)("<div>").appendTo(e), this._$parent = e), i.toggleClass("dx-hidden", !a), a)) {
      this.component._optionCache = {};
      var r = this._renderCore(t);
      this.component._optionCache = undefined;
      if (r) {
        r.done(function () {
          n.renderCompleted.fire(t);
        });
      } else {
        this.renderCompleted.fire(t);
      }
    }
  },
  resize: function () {
    this.isResizing = true;
    this._resizeCore();
    this.resizeCompleted.fire();
    this.isResizing = false;
  },
  focus: function (e) {
    this.element().get(0).focus({
      preventScroll: e
    });
  }
});
function b(e, t = {}) {
  var n = {};
  Object.entries(t).forEach(function (t) {
    var i = p(t, 2);
    var o = i[0];
    var a = i[1];
    var r = e[o];
    if (r) {
      if ((0, l.isFunction)(a)) {
        n[o] = a(r);
      } else {
        var s = r;
        n[o] = s.inherit(a);
      }
    }
  });
  return n;
}
function x(e, t) {
  var n = t.modules;
  var i = t.modulesOrder;
  function o(t) {
    var n = {};
    (0, s.each)(t, function (t, i) {
      var o = new i(e);
      o.name = t;
      (function (e, t, n) {
        var i = n.publicMethods();
        if (i) {
          (0, s.each)(i, function (i, o) {
            if (!n[o]) {
              throw c.default.Error("E1006", t, o);
            }
            if (e[o]) {
              throw c.default.Error("E1005", o);
            }
            e[o] = function () {
              return n[o].apply(n, arguments);
            };
          });
        }
      })(e, t, o);
      n[t] = o;
    });
    return n;
  }
  if (i) {
    n.sort(function (e, t) {
      var n = i.indexOf(e.name);
      var o = i.indexOf(t.name);
      if (n < 0) {
        n = 1000000;
      }
      if (o < 0) {
        o = 1000000;
      }
      return n - o;
    });
  }
  var a = {};
  var r = {};
  n.forEach(function (e) {
    var t = e.name;
    var n = e.controllers;
    var i = n === undefined ? {} : n;
    var o = e.views;
    var s = o === undefined ? {} : o;
    Object.entries(i).forEach(function (e) {
      var n;
      var i = p(e, 2);
      var o = i[0];
      var r = i[1];
      if (a[o]) {
        throw c.default.Error("E1001", t, o);
      }
      if (!((n = r == null ? undefined : r.subclassOf) === null || n === undefined ? undefined : n.call(r, _))) {
        throw c.default.Error("E1002", t, o);
      }
      a[o] = r;
    });
    Object.entries(s).forEach(function (e) {
      var n;
      var i = p(e, 2);
      var o = i[0];
      var a = i[1];
      if (r[o]) {
        throw c.default.Error("E1003", t, o);
      }
      if (!((n = a == null ? undefined : a.subclassOf) === null || n === undefined ? undefined : n.call(a, y))) {
        throw c.default.Error("E1004", t, o);
      }
      r[o] = a;
    });
  });
  var l = n.filter(function (e) {
    return !!e.extenders;
  });
  var u = l.reduce(function (e, t) {
    var n = t.extenders;
    return f(f({}, e), b(e, n == null ? undefined : n.controllers));
  }, a);
  var d = l.reduce(function (e, t) {
    var n = t.extenders;
    return f(f({}, e), b(e, n == null ? undefined : n.views));
  }, r);
  e._controllers = o(u);
  e._views = o(d);
}
var w = {
  modules: [],
  View: y,
  ViewController: v,
  Controller: _,
  registerModule: function (e, t) {
    for (var n = this.modules, i = 0; i < n.length; i++) {
      if (n[i].name === e) {
        return;
      }
    }
    t.name = e;
    n.push(t);
  },
  registerModulesOrder: function (e) {
    this.modulesOrder = e;
  },
  unregisterModule: function (e) {
    this.modules = (0, r.grep)(this.modules, function (t) {
      return t.name !== e;
    });
  },
  processModules: x,
  callModuleItemsMethod: function (e, t, n) {
    n = n || [];
    if (e._controllers) {
      (0, s.each)(e._controllers, function () {
        if (this[t]) {
          this[t].apply(this, n);
        }
      });
    }
    if (e._views) {
      (0, s.each)(e._views, function () {
        if (this[t]) {
          this[t].apply(this, n);
        }
      });
    }
  }
};
exports.default = w;