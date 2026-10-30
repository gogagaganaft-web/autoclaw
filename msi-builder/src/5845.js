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
var a = this && this.__assign || function () {
  return (a = Object.assign || function (e) {
    var t;
    for (var n = 1, i = arguments.length; n < i; n++) {
      for (var o in t = arguments[n]) {
        if (Object.prototype.hasOwnProperty.call(t, o)) {
          e[o] = t[o];
        }
      }
    }
    return e;
  }).apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r = require("./55285.js");
var s = 0;
exports.createContext = function (e) {
  var t = s++;
  return {
    id: t,
    defaultValue: e,
    Provider: function (n) {
      function i() {
        return n !== null && n.apply(this, arguments) || this;
      }
      o(i, n);
      i.prototype.getChildContext = function () {
        var n;
        return a(a({}, this.context), ((n = {})[t] = this.props.value || e, n));
      };
      i.prototype.render = function () {
        return this.props.children;
      };
      return i;
    }(r.Component)
  };
};