exports.default = undefined;
var i = d(require("./9549.js"));
var o = d(require("./68374.js"));
var a = require("./37518.js");
var r = d(require("./2269.js"));
var s = d(require("./30963.js"));
var l = d(require("./76195.js"));
var u = require("./13306.js");
function d(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
function c(e) {
  if (e === undefined) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return e;
}
function h(e, t) {
  return (h = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (e, t) {
    e.__proto__ = t;
    return e;
  })(e, t);
}
var f = s.default;
if (i.default) {
  i.default.register({
    "formats/variable": l.default
  }, true);
  f = function (e) {
    var t;
    var n;
    n = e;
    (t = r).prototype = Object.create(n.prototype);
    t.prototype.constructor = t;
    h(t, n);
    var i = r.prototype;
    function r(t, n) {
      var i;
      i = e.call(this, t, n) || this;
      var a = t.getModule("toolbar");
      if (a) {
        a.addClickHandler("variable", i.showPopup.bind(c(i)));
      }
      t.keyboard.addBinding({
        key: "P",
        altKey: true
      }, i.showPopup.bind(c(i)));
      i._popup.on("shown", function (e) {
        var t = (0, o.default)(e.component.option("position").of);
        if (t.hasClass("dx-variable-format")) {
          t.addClass("dx-format-active");
        }
      });
      return i;
    }
    i._getDefaultOptions = function () {
      var t = e.prototype._getDefaultOptions.call(this);
      return (0, u.extend)(t, {
        escapeChar: ""
      });
    };
    i.showPopup = function (t) {
      var n = this.quill.getSelection(true);
      var i = n ? n.index : this.quill.getLength();
      this.savePosition(i);
      this._resetPopupPosition(t, i);
      e.prototype.showPopup.call(this);
    };
    i._resetPopupPosition = function (e, t) {
      if (e && e.element) {
        this._popup.option("position", {
          of: e.element,
          offset: {
            h: 0,
            v: 0
          },
          my: "top center",
          at: "bottom center",
          collision: "fit"
        });
      } else {
        var n = this.quill.getBounds(t);
        var i = (0, a.getBoundingRect)(this.quill.root);
        this._popup.option("position", {
          of: this.quill.root,
          offset: {
            h: n.left,
            v: n.bottom - i.height
          },
          my: "top center",
          at: "bottom left",
          collision: "fit flip"
        });
      }
    };
    i.insertEmbedContent = function (e) {
      var t = this.getPosition();
      var n = e.component.option("selectedItem");
      var i = (0, u.extend)({}, {
        value: n,
        escapeChar: this.options.escapeChar
      });
      setTimeout(function () {
        this.quill.insertEmbed(t, "variable", i);
        this.quill.setSelection(t + 1);
      }.bind(this));
    };
    return r;
  }(r.default);
}
var p = f;
exports.default = p;
module.exports = exports.default;
module.exports.default = exports.default;