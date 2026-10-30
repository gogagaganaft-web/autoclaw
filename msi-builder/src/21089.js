exports.default = undefined;
var i = require("./58664.js");
var o = h(require("./68374.js"));
var a = require("./13306.js");
var r = require("./62754.js");
var s = require("./58201.js");
var l = h(require("./73176.js"));
var u = h(require("./14390.js"));
var d = h(require("./53749.js"));
var c = require("./75084.js");
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
var p = function (e) {
  var t;
  var n;
  function u() {
    return e.apply(this, arguments) || this;
  }
  n = e;
  (t = u).prototype = Object.create(n.prototype);
  t.prototype.constructor = t;
  f(t, n);
  var h = u.prototype;
  h._initMarkup = function () {
    this._initActions();
    this.$element().addClass("dx-filemanager-fileuploader");
    this._uploaderInfos = [];
    this._createInternalFileUploader();
    this._createDropZonePlaceholder();
    this._setDropZonePlaceholderVisible(false);
    e.prototype._initMarkup.call(this);
  };
  h._createInternalFileUploader = function () {
    var e = this;
    var t = this._getController().chunkSize;
    var n = (0, o.default)("<div>").appendTo(this.$element());
    var i = this._createComponent(n, d.default, {
      name: "file",
      multiple: true,
      showFileList: false,
      activeStateEnabled: false,
      focusStateEnabled: false,
      hoverStateEnabled: false,
      labelText: "",
      readyToUploadMessage: "",
      accept: "*",
      chunkSize: t,
      dropZone: this.option("dropZone"),
      onValueChanged: function (t) {
        return e._onFileUploaderValueChanged(t);
      },
      onProgress: function (t) {
        return e._onFileUploaderProgress(t);
      },
      onUploaded: function (t) {
        return e._onFileUploaderUploaded(t);
      },
      onFilesUploaded: function (t) {
        return e._onFileUploaderAllFilesUploaded(t);
      },
      onUploadAborted: function (t) {
        return e._onFileUploaderUploadAborted(t);
      },
      onUploadError: function (t) {
        return e._onFileUploaderUploadError(t);
      },
      onDropZoneEnter: function () {
        return e._setDropZonePlaceholderVisible(true);
      },
      onDropZoneLeave: function () {
        return e._setDropZonePlaceholderVisible(false);
      }
    });
    i.option({
      uploadChunk: function (t, n) {
        return e._fileUploaderUploadChunk(i, t, n);
      },
      abortUpload: function (t, n) {
        return e._fileUploaderAbortUpload(i, t, n);
      }
    });
    i._shouldRaiseDragLeaveBase = i._shouldRaiseDragLeave;
    i._shouldRaiseDragLeave = function (t) {
      return e._shouldRaiseDragLeave(t, i);
    };
    var a = {
      fileUploader: i
    };
    this._uploaderInfos.push(a);
  };
  h.tryUpload = function () {
    var e = this._findAndUpdateAvailableUploaderInfo();
    if (e) {
      e.fileUploader._selectButtonClickHandler();
    }
  };
  h.cancelUpload = function (e) {
    this._cancelUpload(e);
  };
  h.cancelFileUpload = function (e, t) {
    this._cancelUpload(e, t);
  };
  h._cancelUpload = function (e, t) {
    this._findUploaderInfoBySessionId(e).fileUploader.abortUpload(t);
  };
  h._fileUploaderUploadChunk = function (e, t, n) {
    var i = this._findSessionByFile(e, t);
    var o = i.session;
    var a = i.fileIndex;
    var r = o.controller;
    n.fileIndex = a;
    return r.uploadFileChunk(t, n);
  };
  h._fileUploaderAbortUpload = function (e, t, n) {
    var i = this._findSessionByFile(e, t);
    var o = i.session;
    var a = i.fileIndex;
    var r = o.controller;
    n.fileIndex = a;
    return r.abortFileUpload(t, n);
  };
  h._onFileUploaderValueChanged = function (e) {
    var t = this;
    var n = e.component;
    var i = e.value;
    if (i.length !== 0) {
      var o = i.slice();
      var a = this._findUploaderInfo(n);
      this._uploadFiles(a, o);
      setTimeout(function () {
        if (!t._findAndUpdateAvailableUploaderInfo()) {
          t._createInternalFileUploader();
        }
      });
    }
  };
  h._onFileUploaderProgress = function (e) {
    var t = e.component;
    var n = e.file;
    var i = e.bytesLoaded;
    var o = e.bytesTotal;
    var a = this._findSessionByFile(t, n);
    var r = a.session;
    var s = a.fileIndex;
    var l = o !== 0 ? i / o : 1;
    var u = t.option("progress") / 100;
    var d = {
      sessionId: r.id,
      fileIndex: s,
      commonValue: u,
      fileValue: l
    };
    this._raiseUploadProgress(d);
  };
  h._onFileUploaderAllFilesUploaded = function (e) {
    var t = e.component;
    var n = this._findSessionByFile(t, t._files[0].value).session;
    this._raiseUploadFinished({
      sessionId: n.id,
      commonValue: t.option("progress") / 100
    });
  };
  h._onFileUploaderUploaded = function (e) {
    var t = e.component;
    var n = e.file;
    this._getDeferredForFile(t, n).resolve();
  };
  h._onFileUploaderUploadAborted = function (e) {
    var t = e.component;
    var n = e.file;
    this._getDeferredForFile(t, n).resolve({
      canceled: true
    });
  };
  h._onFileUploaderUploadError = function (e) {
    var t = e.component;
    var n = e.file;
    var i = e.error;
    this._getDeferredForFile(t, n).reject(i);
  };
  h._createDropZonePlaceholder = function () {
    this._$dropZonePlaceholder = (0, o.default)("<div>").addClass("dx-filemanager-fileuploader-dropzone-placeholder").appendTo(this.option("dropZonePlaceholderContainer"));
  };
  h._adjustDropZonePlaceholder = function () {
    var e = this.option("dropZone");
    if ((0, s.hasWindow)() && e.length !== 0) {
      var t = parseFloat(this._$dropZonePlaceholder.css("borderTopWidth"));
      var n = parseFloat(this._$dropZonePlaceholder.css("borderLeftWidth"));
      var o = this.option("dropZonePlaceholderContainer");
      var a = parseFloat(o.css("borderBottomWidth"));
      var r = parseFloat(o.css("borderLeftWidth"));
      var l = (0, i.getInnerHeight)(o);
      var u = o.offset();
      var d = e.offset();
      this._$dropZonePlaceholder.css({
        top: d.top - u.top - l - a,
        left: d.left - u.left - r
      });
      (0, i.setHeight)(this._$dropZonePlaceholder, e.get(0).offsetHeight - t * 2);
      (0, i.setWidth)(this._$dropZonePlaceholder, e.get(0).offsetWidth - n * 2);
    }
  };
  h._setDropZonePlaceholderVisible = function (e) {
    if (e) {
      this._adjustDropZonePlaceholder();
      this._$dropZonePlaceholder.css("display", "");
    } else {
      this._$dropZonePlaceholder.css("display", "none");
    }
  };
  h._shouldRaiseDragLeave = function (e, t) {
    return t.isMouseOverElement(e, this.option("splitterElement")) || t._shouldRaiseDragLeaveBase(e, true);
  };
  h._uploadFiles = function (e, t) {
    this._setDropZonePlaceholderVisible(false);
    var n = new l.default().toString();
    var i = this._getController();
    var o = t.map(function () {
      return new r.Deferred();
    });
    var a = {
      id: n,
      controller: i,
      files: t,
      deferreds: o
    };
    e.session = a;
    var s = {
      sessionId: n,
      deferreds: o,
      files: t
    };
    this._raiseUploadSessionStarted(s);
    return (0, c.whenSome)(o).always(function () {
      return setTimeout(function () {
        e.fileUploader.reset();
        e.session = null;
      });
    });
  };
  h._getDeferredForFile = function (e, t) {
    var n = this._findSessionByFile(e, t);
    var i = n.session;
    var o = n.fileIndex;
    return i.deferreds[o];
  };
  h._findSessionByFile = function (e, t) {
    var n = this._findUploaderInfo(e).session;
    var i = n.files.indexOf(t);
    return {
      session: n,
      fileIndex: i
    };
  };
  h._findUploaderInfoBySessionId = function (e) {
    for (var t = 0; t < this._uploaderInfos.length; t++) {
      var n = this._uploaderInfos[t];
      var i = n.session;
      if (i && i.id === e) {
        return n;
      }
    }
    return null;
  };
  h._findAndUpdateAvailableUploaderInfo = function () {
    var e;
    var t = null;
    for (var n = 0; n < this._uploaderInfos.length; n++) {
      var i = this._uploaderInfos[n];
      i.fileUploader.option("dropZone", "");
      if (!t && !i.session) {
        t = i;
      }
    }
    if ((e = t) !== null && e !== undefined) {
      e.fileUploader.option("dropZone", this.option("dropZone"));
    }
    return t;
  };
  h._findUploaderInfo = function (e) {
    for (var t = 0; t < this._uploaderInfos.length; t++) {
      var n = this._uploaderInfos[t];
      if (n.fileUploader === e) {
        return n;
      }
    }
    return null;
  };
  h._getController = function () {
    return this.option("getController")();
  };
  h._raiseUploadSessionStarted = function (e) {
    this._actions.onUploadSessionStarted({
      sessionInfo: e
    });
  };
  h._raiseUploadProgress = function (e) {
    this._actions.onUploadProgress(e);
  };
  h._raiseUploadFinished = function (e) {
    this._actions.onUploadFinished(e);
  };
  h._initActions = function () {
    this._actions = {
      onUploadSessionStarted: this._createActionByOption("onUploadSessionStarted"),
      onUploadProgress: this._createActionByOption("onUploadProgress"),
      onUploadFinished: this._createActionByOption("onUploadFinished")
    };
  };
  h._getDefaultOptions = function () {
    return (0, a.extend)(e.prototype._getDefaultOptions.call(this), {
      getController: null,
      onUploadSessionStarted: null,
      onUploadProgress: null,
      onUploadFinished: null,
      splitterElement: null
    });
  };
  h._optionChanged = function (t) {
    var n = t.name;
    switch (n) {
      case "getController":
        this.repaint();
        break;
      case "onUploadSessionStarted":
      case "onUploadProgress":
      case "onUploadFinished":
        this._actions[n] = this._createActionByOption(n);
        break;
      case "dropZone":
        this._findAndUpdateAvailableUploaderInfo();
        this._adjustDropZonePlaceholder();
        break;
      case "dropZonePlaceholderContainer":
        this._$dropZonePlaceholder.detach();
        this._$dropZonePlaceholder.appendTo(t.value);
        break;
      case "splitterElement":
        break;
      default:
        e.prototype._optionChanged.call(this, t);
    }
  };
  return u;
}(u.default);
exports.default = p;
module.exports = exports.default;
module.exports.default = exports.default;