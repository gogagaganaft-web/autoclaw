exports.default = undefined;
var i = h(require("./9549.js"));
var o = h(require("./30963.js"));
var a = h(require("./55994.js"));
var r = h(require("./68374.js"));
var s = require("./35922.js");
var l = require("./13306.js");
var u = require("./10046.js");
var d = require("./39611.js");
var c = h(require("./53749.js"));
function h(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
function f(e, t) {
  return (f = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (e, t) {
    e.__proto__ = t;
    return e;
  })(e, t);
}
var p = o.default;
if (i.default) {
  p = function (e) {
    var t;
    var n;
    function i(t, n) {
      var i;
      (i = e.call(this, t, n) || this).options = n;
      i._quillContainer = i.editorInstance._getQuillContainer();
      i.addCleanCallback(i.prepareCleanCallback());
      i._handleServerUpload();
      return i;
    }
    n = e;
    (t = i).prototype = Object.create(n.prototype);
    t.prototype.constructor = t;
    f(t, n);
    var o = i.prototype;
    o._handleServerUpload = function () {
      if ((0, s.isDefined)(this.options.fileUploadMode) && this.options.fileUploadMode !== "base64") {
        this._enableDragAndDropUploading();
      } else {
        this._disableDragAndDropUploading();
      }
    };
    o._getUploaderModule = function () {
      this._uploaderModule ||= this.quill.getModule("uploader");
      return this._uploaderModule;
    };
    o._disableDragAndDropUploading = function () {
      var e;
      this._getUploaderModule().preventImageUploading(false);
      this._detachEvents();
      if ((e = this._fileUploader) !== null && e !== undefined) {
        e.dispose();
      }
    };
    o._enableDragAndDropUploading = function () {
      this._initFileUploader();
      this._getUploaderModule().preventImageUploading(true);
      this._attachEvents();
    };
    o._initFileUploader = function () {
      var e = (0, r.default)("<div>").addClass("dx-htmleditor-hidden-content").appendTo(this._quillContainer);
      var t = (0, l.extend)({}, (0, u.getFileUploaderBaseOptions)(), {
        uploadUrl: this.options.uploadUrl,
        onUploaded: this._onUploaded.bind(this)
      }, this.options.fileUploaderOptions);
      this._fileUploader = this.editorInstance._createComponent(e, c.default, t);
      return e;
    };
    o._onUploaded = function (e) {
      var n = (this.quill.getSelection() ?? {
        index: this.quill.getLength()
      }).index;
      (0, u.serverUpload)(this.options.uploadDirectory, e.file.name, this.quill, n);
    };
    o._attachEvents = function () {
      a.default.on(this.quill.root, (0, d.addNamespace)("drop", "dxHtmlEditorImageUpload"), this._dropHandler.bind(this));
      a.default.on(this.quill.root, (0, d.addNamespace)("paste", "dxHtmlEditorImageUpload"), this._pasteHandler.bind(this));
    };
    o._detachEvents = function () {
      a.default.off(this.quill.root, "dxHtmlEditorImageUpload");
    };
    o._dropHandler = function (e) {
      this._handleInsertImages(e, "dataTransfer");
    };
    o._pasteHandler = function (e) {
      this._handleInsertImages(e, "clipboardData");
    };
    o._handleInsertImages = function (e, t) {
      this.saveValueChangeEvent(e);
      var n = Array.from(e.originalEvent[t].files || []);
      if (n.length) {
        e.preventDefault();
        e.stopPropagation();
        this._fileUploader.option("value", n);
        this._fileUploader.upload();
      }
    };
    o.clean = function () {
      this._disableDragAndDropUploading();
    };
    o.prepareCleanCallback = function () {
      var e = this;
      return function () {
        e.clean();
      };
    };
    o.option = function (e, t) {
      switch (e) {
        case "imageUpload":
          this.handleOptionChangeValue(t);
          break;
        case "fileUploadMode":
          this.options.fileUploadMode = t;
          this._handleServerUpload();
          break;
        case "fileUploaderOptions":
          this._fileUploader.option(t);
      }
    };
    return i;
  }(o.default);
}
var g = p;
exports.default = g;
module.exports = exports.default;
module.exports.default = exports.default;