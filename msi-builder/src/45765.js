exports.default = undefined;
var i = require("./35922.js");
var o = require("./73173.js");
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
    var e = (0, i.isString)(arguments[0]) ? this._publicCtor : this._internalCtor;
    e.apply(this, arguments);
  }
  var t = e.prototype;
  t._internalCtor = function (e, t, n, i) {
    this.name = t || "";
    this.pathInfo = e && a(e) || [];
    this.parentPath = this._getPathByPathInfo(this.pathInfo);
    this.relativeName = (0, o.pathCombine)(this.parentPath, t);
    this.key = i || this._getPathByPathInfo(this.getFullPathInfo(), true);
    this.path = (0, o.pathCombine)(this.parentPath, t);
    this.pathKeys = this.pathInfo.map(function (e) {
      return e.key;
    });
    if (!this.isRoot()) {
      this.pathKeys.push(this.key);
    }
    this._initialize(n);
  };
  t._publicCtor = function (e, t, n) {
    this.path = e || "";
    this.pathKeys = n || [];
    var i = [];
    for (var a = (0, o.getPathParts)(e, true), r = 0; r < a.length - 1; r++) {
      var s = a[r];
      var l = {
        key: this.pathKeys[r] || s,
        name: (0, o.getName)(s)
      };
      i.push(l);
    }
    this.pathInfo = i;
    this.relativeName = e;
    this.name = (0, o.getName)(e);
    this.key = this.pathKeys.length ? this.pathKeys[this.pathKeys.length - 1] : e;
    this.parentPath = a.length > 1 ? a[a.length - 2] : "";
    this._initialize(t);
  };
  t._initialize = function (e) {
    this.isDirectory = !!e;
    this.size = 0;
    this.dateModified = new Date();
    this.thumbnail = "";
    this.tooltipText = "";
  };
  t.getFullPathInfo = function () {
    var e = a(this.pathInfo);
    if (!this.isRoot()) {
      e.push({
        key: this.key,
        name: this.name
      });
    }
    return e;
  };
  t.isRoot = function () {
    return this.path === "";
  };
  t.getFileExtension = function () {
    if (this.isDirectory) {
      return "";
    } else {
      return (0, o.getFileExtension)(this.name);
    }
  };
  t.equals = function (e) {
    return e && this.key === e.key;
  };
  t.createClone = function () {
    var t = new e(this.pathInfo, this.name, this.isDirectory, this.key);
    t.key = this.key;
    t.size = this.size;
    t.dateModified = this.dateModified;
    t.thumbnail = this.thumbnail;
    t.tooltipText = this.tooltipText;
    t.hasSubDirectories = this.hasSubDirectories;
    t.dataItem = this.dataItem;
    return t;
  };
  t._getPathByPathInfo = function (e, t) {
    return e.map(function (e) {
      if (t) {
        return (0, o.getEscapedFileName)(e.name);
      } else {
        return e.name;
      }
    }).join(o.PATH_SEPARATOR);
  };
  return e;
}();
exports.default = s;
module.exports = exports.default;
module.exports.default = exports.default;