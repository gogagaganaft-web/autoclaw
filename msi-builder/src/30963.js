exports.default = undefined;
var i = r(require("./9549.js"));
var o = r(require("./56764.js"));
var a = require("./35922.js");
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
      return l(e, t);
    }
    var n = Object.prototype.toString.call(e).slice(8, -1);
    if (n === "Object" && e.constructor) {
      n = e.constructor.name;
    }
    if (n === "Map" || n === "Set") {
      return Array.from(e);
    }
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) {
      return l(e, t);
    }
  }(e, t) || function () {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }();
}
function l(e, t) {
  if (t == null || t > e.length) {
    t = e.length;
  }
  for (var n = 0, i = new Array(t); n < t; n++) {
    i[n] = e[n];
  }
  return i;
}
function u(e, t) {
  return (u = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (e, t) {
    e.__proto__ = t;
    return e;
  })(e, t);
}
var d = o.default;
if (i.default) {
  d = function (e) {
    var t;
    var n;
    function i(t, n) {
      var i;
      (i = e.call(this, t, n) || this).editorInstance = n.editorInstance;
      return i;
    }
    n = e;
    (t = i).prototype = Object.create(n.prototype);
    t.prototype.constructor = t;
    u(t, n);
    var o = i.prototype;
    o.saveValueChangeEvent = function (e) {
      this.editorInstance._saveValueChangeEvent(e);
    };
    o.addCleanCallback = function (e) {
      this.editorInstance.addCleanCallback(e);
    };
    o.handleOptionChangeValue = function (e) {
      var t = this;
      if ((0, a.isObject)(e)) {
        Object.entries(e).forEach(function (e) {
          var n = s(e, 2);
          var i = n[0];
          var o = n[1];
          return t.option(i, o);
        });
      } else if (!(0, a.isDefined)(e) && this != null) {
        this.clean();
      }
    };
    return i;
  }(i.default.import("core/module"));
}
var c = d;
exports.default = c;
module.exports = exports.default;
module.exports.default = exports.default;