exports.PostponedOperations = undefined;
var i = require("./62754.js");
var o = require("./35922.js");
function a(e) {
  return function (e) {
    if (Array.isArray(e)) {
      return r(e);
    }
  }(e) || function (e) {
    if (typeof Symbol != "undefined" && e[Symbol.iterator] != null || e["@@iterator"] != null) {
      return Array.from(e);
    }
  }(e) || function (e, t) {
    if (!e) {
      return;
    }
    if (typeof e == "string") {
      return r(e, t);
    }
    var n = Object.prototype.toString.call(e).slice(8, -1);
    if (n === "Object" && e.constructor) {
      n = e.constructor.name;
    }
    if (n === "Map" || n === "Set") {
      return Array.from(e);
    }
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) {
      return r(e, t);
    }
  }(e) || function () {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }();
}
function r(e, t) {
  if (t == null || t > e.length) {
    t = e.length;
  }
  for (var n = 0, i = new Array(t); n < t; n++) {
    i[n] = e[n];
  }
  return i;
}
var s = function () {
  function e() {
    this._postponedOperations = {};
  }
  var t = e.prototype;
  t.add = function (e, t, n) {
    if (e in this._postponedOperations) {
      if (n) {
        this._postponedOperations[e].promises.push(n);
      }
    } else {
      var o = new i.Deferred();
      this._postponedOperations[e] = {
        fn: t,
        completePromise: o,
        promises: n ? [n] : []
      };
    }
    return this._postponedOperations[e].completePromise.promise();
  };
  t.callPostponedOperations = function () {
    for (var e in this._postponedOperations) {
      var t = this._postponedOperations[e];
      if ((0, o.isDefined)(t)) {
        if (t.promises && t.promises.length) {
          i.when.apply(undefined, a(t.promises)).done(t.fn).then(t.completePromise.resolve);
        } else {
          t.fn().done(t.completePromise.resolve);
        }
      }
    }
    this._postponedOperations = {};
  };
  return e;
}();
exports.PostponedOperations = s;