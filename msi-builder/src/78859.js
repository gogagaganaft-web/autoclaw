exports.default = undefined;
var i = d(require("./9549.js"));
var o = d(require("./55994.js"));
var a = require("./39611.js");
var r = require("./95479.js");
var s = d(require("./47810.js"));
var l = require("./58201.js");
var u = d(require("./30963.js"));
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
var f = u.default;
if (i.default) {
  f = function (e) {
    var t;
    var n;
    function i(t, n) {
      var i;
      var r = (i = e.call(this, t, n) || this).editorInstance.NAME;
      o.default.on(i.quill.root, (0, a.addNamespace)("drop", r), i._dropHandler.bind(c(i)));
      o.default.on(i.quill.root, (0, a.addNamespace)("paste", r), i._pasteHandler.bind(c(i)));
      return i;
    }
    n = e;
    (t = i).prototype = Object.create(n.prototype);
    t.prototype.constructor = t;
    h(t, n);
    var u = i.prototype;
    u._dropHandler = function (e) {
      var t;
      var n = e.originalEvent.dataTransfer;
      var i = n == null || (t = n.files) === null || t === undefined ? undefined : t.length;
      this.saveValueChangeEvent(e);
      e.preventDefault();
      if (i) {
        this._getImage(n.files, this._addImage.bind(this));
      }
    };
    u._pasteHandler = function (e) {
      var n = this;
      var i = e.originalEvent.clipboardData;
      this.saveValueChangeEvent(e);
      if (i) {
        var o = i.items?.length;
        if (!i.getData("text/html") && o) {
          this._getImage(i.items, function (e) {
            if (!n._isBrowserSupportImagePaste(s.default)) {
              n._addImage(e);
            }
          });
        }
      }
    };
    u._isBrowserSupportImagePaste = function (e) {
      var t = e.mozilla;
      var n = e.chrome;
      var i = e.version;
      return t || n && i > 82;
    };
    u._isImage = function (e) {
      return !!e.type.match(/^image\/(a?png|bmp|gif|p?jpe?g|svg|vnd\.microsoft\.icon|webp)/i);
    };
    u._getImage = function (e, t) {
      var n = this;
      var i = (0, l.getWindow)();
      (0, r.each)(e, function (e, o) {
        if (n._isImage(o)) {
          var a = new i.FileReader();
          a.onload = function (e) {
            var n = e.target;
            t(n.result);
          };
          var r = o.getAsFile ? o.getAsFile() : o;
          if (r instanceof i.Blob) {
            a.readAsDataURL(r);
          }
        }
      });
    };
    u._addImage = function (e) {
      var t = this.quill.getSelection();
      var n = t ? t.index : this.quill.getLength();
      this.quill.insertEmbed(n, "extendedImage", e, "user");
    };
    return i;
  }(u.default);
}
var p = f;
exports.default = p;
module.exports = exports.default;
module.exports.default = exports.default;