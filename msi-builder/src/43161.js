exports.default = undefined;
var i = u(require("./99393.js"));
var o = require("./13306.js");
var a = u(require("./73176.js"));
var r = u(require("./24311.js"));
var s = u(require("./14390.js"));
var l = require("./18058.js");
function u(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
function d(e, t) {
  return (d = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (e, t) {
    e.__proto__ = t;
    return e;
  })(e, t);
}
var c = u(require("./92591.js")).default.getSwatchContainer;
var h = r.default.add;
var f = function (e) {
  var t;
  var n;
  function i() {
    return e.apply(this, arguments) || this;
  }
  n = e;
  (t = i).prototype = Object.create(n.prototype);
  t.prototype.constructor = t;
  d(t, n);
  var r = i.prototype;
  r._getDefaultOptions = function () {
    return (0, o.extend)(e.prototype._getDefaultOptions.call(this), {
      icon: "",
      onClick: null,
      label: "",
      visible: true,
      index: 0,
      onContentReady: null,
      activeStateEnabled: true,
      hoverStateEnabled: true,
      animation: {
        show: {
          type: "pop",
          duration: 200,
          easing: "cubic-bezier(0.4, 0, 0.2, 1)",
          from: {
            scale: 0,
            opacity: 0
          },
          to: {
            scale: 1,
            opacity: 1
          }
        },
        hide: {
          type: "pop",
          duration: 200,
          easing: "cubic-bezier(0.4, 0, 0.2, 1)",
          from: {
            scale: 1,
            opacity: 1
          },
          to: {
            scale: 0,
            opacity: 0
          }
        }
      },
      id: new a.default()
    });
  };
  r._optionChanged = function (t) {
    switch (t.name) {
      case "onClick":
      case "icon":
      case "label":
      case "visible":
      case "index":
      case "onInitializing":
        (0, l.initAction)(this);
        break;
      case "animation":
      case "id":
        break;
      default:
        e.prototype._optionChanged.call(this, t);
    }
  };
  r._render = function () {
    var e = this;
    this._toggleVisibility(false);
    if (c(this.$element())) {
      (0, l.initAction)(this);
    } else {
      h(function () {
        return (0, l.initAction)(e);
      });
    }
  };
  r._dispose = function () {
    (0, l.disposeAction)(this._options.silent("id"));
    e.prototype._dispose.call(this);
  };
  return i;
}(s.default);
(0, i.default)("dxSpeedDialAction", f);
var p = f;
exports.default = p;
module.exports = exports.default;
module.exports.default = exports.default;