var i;
var o = this && this.__extends || (i = function (e, t) {
  return (i = Object.setPrototypeOf || {
    __proto__: []
  } instanceof Array && function (e, t) {
    e.__proto__ = t;
  } || function (e, t) {
    for (var n in t) {
      if (t.hasOwnProperty(n)) {
        e[n] = t[n];
      }
    }
  })(e, t);
}, function (e, t) {
  function n() {
    this.constructor = e;
  }
  i(e, t);
  e.prototype = t === null ? Object.create(t) : (n.prototype = t.prototype, new n());
});
Object.defineProperty(exports, "__esModule", {
  value: true
});
var a = require("./55285.js");
var r = require("./46275.js");
function s(e, t) {
  if (!(e instanceof Object) || !(t instanceof Object)) {
    return e === t;
  }
  var n = Object.keys(e);
  var i = Object.keys(t);
  return n.length === i.length && !n.some(function (n) {
    return e[n] !== t[n];
  });
}
var l = function (e) {
  function t() {
    var t = e !== null && e.apply(this, arguments) || this;
    t._pendingContext = t.context;
    return t;
  }
  o(t, e);
  t.prototype.componentWillReceiveProps = function (e, t) {
    this._pendingContext = t ?? {};
  };
  t.prototype.shouldComponentUpdate = function (e, t) {
    return !s(this.props, e) || !s(this.state, t) || !s(this.context, this._pendingContext);
  };
  return t;
}(a.Component);
exports.BaseInfernoComponent = l;
var u = function (e) {
  function t() {
    var t = e !== null && e.apply(this, arguments) || this;
    t._effects = [];
    return t;
  }
  o(t, e);
  t.prototype.createEffects = function () {
    return [];
  };
  t.prototype.updateEffects = function () {};
  t.prototype.componentWillMount = function () {
    r.InfernoEffectHost.lock();
  };
  t.prototype.componentWillUpdate = function (e, t, n) {
    r.InfernoEffectHost.lock();
  };
  t.prototype.componentDidMount = function () {
    var e = this;
    r.InfernoEffectHost.callbacks.push(function () {
      e._effects = e.createEffects();
    });
    r.InfernoEffectHost.callEffects();
  };
  t.prototype.componentDidUpdate = function () {
    var e = this;
    r.InfernoEffectHost.callbacks.push(function () {
      return e.updateEffects();
    });
    r.InfernoEffectHost.callEffects();
  };
  t.prototype.destroyEffects = function () {
    this._effects.forEach(function (e) {
      return e.dispose();
    });
  };
  t.prototype.componentWillUnmount = function () {
    this.destroyEffects();
  };
  return t;
}(l);
exports.InfernoComponent = u;
var d = function (e) {
  function t() {
    var t = e !== null && e.apply(this, arguments) || this;
    t.vDomElement = null;
    return t;
  }
  o(t, e);
  t.prototype.vDomUpdateClasses = function () {
    var e = this.vDomElement;
    var t = e.className.length ? e.className.split(" ") : [];
    var n = t.filter(function (t) {
      return e.dxClasses.previous.indexOf(t) < 0;
    });
    var i = e.dxClasses.previous.filter(function (e) {
      return t.indexOf(e) < 0;
    });
    n.forEach(function (t) {
      var n = e.dxClasses.removed.indexOf(t);
      if (n > -1) {
        e.dxClasses.removed.splice(n, 1);
      } else {
        e.dxClasses.added.push(t);
      }
    });
    i.forEach(function (t) {
      var n = e.dxClasses.added.indexOf(t);
      if (n > -1) {
        e.dxClasses.added.splice(n, 1);
      } else {
        e.dxClasses.removed.push(t);
      }
    });
  };
  t.prototype.componentDidMount = function () {
    var t = a.findDOMfromVNode(this.$LI, true);
    this.vDomElement = t;
    e.prototype.componentDidMount.call(this);
    t.dxClasses = t.dxClasses || {
      removed: [],
      added: [],
      previous: []
    };
    t.dxClasses.previous = (t == null ? undefined : t.className.length) ? t.className.split(" ") : [];
  };
  t.prototype.componentDidUpdate = function () {
    e.prototype.componentDidUpdate.call(this);
    var t = this.vDomElement;
    if (t !== null) {
      t.dxClasses.added.forEach(function (e) {
        return t.classList.add(e);
      });
      t.dxClasses.removed.forEach(function (e) {
        return t.classList.remove(e);
      });
      t.dxClasses.previous = t.className.length ? t.className.split(" ") : [];
    }
  };
  t.prototype.shouldComponentUpdate = function (t, n) {
    var i = e.prototype.shouldComponentUpdate.call(this, t, n);
    if (i) {
      this.vDomUpdateClasses();
    }
    return i;
  };
  return t;
}(u);
exports.InfernoWrapperComponent = d;