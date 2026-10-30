exports.default = undefined;
var i = s(require("./68374.js"));
var o = s(require("./44470.js"));
var a = require("./13306.js");
var r = s(require("./96688.js"));
function s(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
function l(e) {
  return (l = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function (e) {
    return typeof e;
  } : function (e) {
    if (e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype) {
      return "symbol";
    } else {
      return typeof e;
    }
  })(e);
}
function u(e, t) {
  if (e.indexOf(t) !== -1) {
    throw r.default.Error("E1055", t);
  }
  e.push(t);
}
var d = function () {
  function e(e, t) {
    this.buttons = [];
    this.defaultButtonsInfo = t;
    this.editor = e;
  }
  var t = e.prototype;
  t._compileButtonInfo = function (e) {
    var t = this;
    var n = [];
    return e.map(function (e) {
      var i;
      var s;
      var d = typeof e == "string";
      if (!d) {
        i = e;
        (function () {
          if (!i || l(i) !== "object" || Array.isArray(i)) {
            throw r.default.Error("E1053");
          }
        })();
        (function () {
          if (!("name" in i)) {
            throw r.default.Error("E1054");
          }
        })();
        (function () {
          if (typeof i.name != "string") {
            throw r.default.Error("E1055");
          }
        })();
        s = i.location;
        if ("location" in i && s !== "after" && s !== "before") {
          i.location = "after";
        }
      }
      if (d || function (e, t) {
        return !!t.find(function (t) {
          return t.name === e;
        });
      }(e.name, t.defaultButtonsInfo)) {
        var c = t.defaultButtonsInfo.find(function (t) {
          var n = t.name;
          return n === e || n === e.name;
        });
        if (!c) {
          throw r.default.Error("E1056", t.editor.NAME, e);
        }
        u(n, e);
        return c;
      }
      var h = e.name;
      u(n, h);
      return (0, a.extend)(e, {
        Ctor: o.default
      });
    });
  };
  t._createButton = function (e) {
    var t = e.Ctor;
    var n = e.options;
    var i = new t(e.name, this.editor, n);
    this.buttons.push(i);
    return i;
  };
  t._renderButtons = function (e, t, n) {
    var o = this;
    var a = null;
    var r = e ? this._compileButtonInfo(e) : this.defaultButtonsInfo;
    r.forEach(function (e) {
      var r = e.location;
      if ((r === undefined ? "after" : r) === n) {
        o._createButton(e).render((a = a || (0, i.default)("<div>").addClass("dx-texteditor-buttons-container"), n === "before" ? t.prepend(a) : t.append(a), a));
      }
    });
    return a;
  };
  t.clean = function () {
    this.buttons.forEach(function (e) {
      return e.dispose();
    });
    this.buttons = [];
  };
  t.getButton = function (e) {
    var t = this.buttons.find(function (t) {
      return t.name === e;
    });
    return t && t.instance;
  };
  t.renderAfterButtons = function (e, t) {
    return this._renderButtons(e, t, "after");
  };
  t.renderBeforeButtons = function (e, t) {
    return this._renderButtons(e, t, "before");
  };
  t.updateButtons = function (e) {
    this.buttons.forEach(function (t) {
      if (!e || e.indexOf(t.name) !== -1) {
        t.update();
      }
    });
  };
  return e;
}();
exports.default = d;
module.exports = exports.default;
module.exports.default = exports.default;