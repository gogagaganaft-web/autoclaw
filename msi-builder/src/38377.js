exports.default = undefined;
var i;
var o = (i = require("./17381.js")) && i.__esModule ? i : {
  default: i
};
var a = require("./35922.js");
var r;
function s(e, t, n) {
  return function () {
    var i = this.callBase;
    this.callBase = e[t];
    try {
      return n.apply(this, arguments);
    } finally {
      this.callBase = i;
    }
  };
}
function l(e) {
  var t;
  var n;
  var i;
  if (!e) {
    return this;
  }
  for (n in e) {
    i = e[n];
    t = typeof this.prototype[n] == "function" && typeof i == "function";
    this.prototype[n] = t ? s(this.parent.prototype, n, i) : i;
  }
  return this;
}
function u() {
  var e;
  var t;
  var n;
  var i = this;
  var o = Object.prototype.hasOwnProperty.bind(i);
  var a = !o("_includedCtors") && !o("_includedPostCtors");
  if (a) {
    i._includedCtors = i._includedCtors.slice(0);
    i._includedPostCtors = i._includedPostCtors.slice(0);
  }
  n = 0;
  for (; n < arguments.length; n++) {
    if ((e = arguments[n]).ctor) {
      i._includedCtors.push(e.ctor);
    }
    if (e.postCtor) {
      i._includedPostCtors.push(e.postCtor);
    }
    for (t in e) {
      if (t !== "ctor" && t !== "postCtor" && t !== "default") {
        i.prototype[t] = e[t];
      }
    }
  }
  return i;
}
function d(e) {
  if (!Object.prototype.hasOwnProperty.bind(this)("parent") && this.parent) {
    var t = Object.getPrototypeOf(this);
    return t === e || t.subclassOf(e);
  }
  return this.parent === e || !!this.parent && !!this.parent.subclassOf && this.parent.subclassOf(e);
}
function c() {
  throw o.default.Error("E0001");
}
r = Object.prototype.hasOwnProperty;
function h(e, t) {
  for (var n in e) {
    if (!r.call(e, n)) {
      return;
    }
    t[n] = e[n];
  }
}
function f() {}
f.inherit = function (e) {
  function t() {
    if (!this || (0, a.isWindow)(this) || typeof this.constructor != "function") {
      throw o.default.Error("E0003");
    }
    var e;
    var t = this;
    var n = t.ctor;
    var i = t.constructor._includedCtors;
    var r = t.constructor._includedPostCtors;
    for (e = 0; e < i.length; e++) {
      i[e].call(t);
    }
    if (n) {
      n.apply(t, arguments);
    }
    e = 0;
    for (; e < r.length; e++) {
      r[e].call(t);
    }
  }
  t.prototype = function (e) {
    function t() {}
    t.prototype = e.prototype;
    return new t();
  }(this);
  h(this, t);
  t.inherit = this.inherit;
  t.abstract = c;
  t.redefine = l;
  t.include = u;
  t.subclassOf = d;
  t.parent = this;
  t._includedCtors = this._includedCtors ? this._includedCtors.slice(0) : [];
  t._includedPostCtors = this._includedPostCtors ? this._includedPostCtors.slice(0) : [];
  t.prototype.constructor = t;
  t.redefine(e);
  return t;
};
f.abstract = c;
var p = f;
exports.default = p;
module.exports = exports.default;
module.exports.default = exports.default;