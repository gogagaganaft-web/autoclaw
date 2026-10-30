exports.default = undefined;
var i = require("./58664.js");
var o = S(require("./68374.js"));
var a = S(require("./73176.js"));
var r = require("./58201.js");
var s = S(require("./55994.js"));
var l = S(require("./99393.js"));
var u = S(require("./44504.js"));
var d = require("./35922.js");
var c = require("./95479.js");
var h = require("./13306.js");
var f = require("./62754.js");
var p = S(require("./37208.js"));
var g = S(require("./96452.js"));
var m = S(require("./63008.js"));
var _ = S(require("./28080.js"));
var v = S(require("./20530.js"));
var y = require("./39611.js");
var b = require("./95429.js");
var x = S(require("./28109.js"));
var w = require("./75811.js");
var C = S(require("./73349.js"));
function S(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
function k(e, t) {
  e.prototype = Object.create(t.prototype);
  e.prototype.constructor = e;
  D(e, t);
}
function D(e, t) {
  return (D = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (e, t) {
    e.__proto__ = t;
    return e;
  })(e, t);
}
var I = (0, r.getWindow)();
function T() {
  return !!I.FormData;
}
var E = function (e) {
  function t() {
    return e.apply(this, arguments) || this;
  }
  k(t, e);
  var n = t.prototype;
  n._supportedKeys = function () {
    var t = this;
    function n(e) {
      e.preventDefault();
      var n = t._selectButton.$element();
      s.default.trigger(n, b.name);
    }
    return (0, h.extend)(e.prototype._supportedKeys.call(this), {
      space: n,
      enter: n
    });
  };
  n._setOptionsByReference = function () {
    e.prototype._setOptionsByReference.call(this);
    (0, h.extend)(this._optionsByReference, {
      value: true
    });
  };
  n._getDefaultOptions = function () {
    return (0, h.extend)(e.prototype._getDefaultOptions.call(this), {
      chunkSize: 0,
      value: [],
      selectButtonText: x.default.format("dxFileUploader-selectFile"),
      uploadButtonText: x.default.format("dxFileUploader-upload"),
      labelText: x.default.format("dxFileUploader-dropFile"),
      name: "files[]",
      multiple: false,
      accept: "",
      uploadUrl: "/",
      allowCanceling: true,
      showFileList: true,
      progress: 0,
      dialogTrigger: undefined,
      dropZone: undefined,
      readyToUploadMessage: x.default.format("dxFileUploader-readyToUpload"),
      uploadedMessage: x.default.format("dxFileUploader-uploaded"),
      uploadFailedMessage: x.default.format("dxFileUploader-uploadFailedMessage"),
      uploadAbortedMessage: x.default.format("dxFileUploader-uploadAbortedMessage"),
      uploadMode: "instantly",
      uploadMethod: "POST",
      uploadHeaders: {},
      uploadCustomData: {},
      onBeforeSend: null,
      onUploadStarted: null,
      onUploaded: null,
      onFilesUploaded: null,
      onProgress: null,
      onUploadError: null,
      onUploadAborted: null,
      onDropZoneEnter: null,
      onDropZoneLeave: null,
      allowedFileExtensions: [],
      maxFileSize: 0,
      minFileSize: 0,
      inputAttr: {},
      invalidFileExtensionMessage: x.default.format("dxFileUploader-invalidFileExtension"),
      invalidMaxFileSizeMessage: x.default.format("dxFileUploader-invalidMaxFileSize"),
      invalidMinFileSizeMessage: x.default.format("dxFileUploader-invalidMinFileSize"),
      extendSelection: true,
      validationMessageMode: "always",
      uploadFile: null,
      uploadChunk: null,
      abortUpload: null,
      validationMessageOffset: {
        h: 0,
        v: 0
      },
      hoverStateEnabled: true,
      useNativeInputClick: false,
      useDragOver: true,
      nativeDropSupported: true,
      _uploadButtonType: "normal"
    });
  };
  n._defaultOptionsRules = function () {
    return e.prototype._defaultOptionsRules.call(this).concat([{
      device: function () {
        return v.default.real().deviceType === "desktop" && !v.default.isSimulator();
      },
      options: {
        focusStateEnabled: true
      }
    }, {
      device: [{
        platform: "android"
      }],
      options: {
        validationMessageOffset: {
          v: 0
        }
      }
    }, {
      device: function () {
        return v.default.real().deviceType !== "desktop";
      },
      options: {
        useDragOver: false
      }
    }, {
      device: function () {
        return !T();
      },
      options: {
        uploadMode: "useForm"
      }
    }, {
      device: function () {
        return v.default.real().deviceType !== "desktop";
      },
      options: {
        nativeDropSupported: false
      }
    }, {
      device: function () {
        return (0, w.isMaterial)();
      },
      options: {
        _uploadButtonType: "default"
      }
    }]);
  };
  n._initOptions = function (t) {
    var n = "labelText" in t;
    e.prototype._initOptions.call(this, t);
    if (!n && !this._shouldDragOverBeRendered()) {
      this.option("labelText", "");
    }
  };
  n._init = function () {
    e.prototype._init.call(this);
    this._initFileInput();
    this._initLabel();
    this._setUploadStrategy();
    this._createFiles();
    this._createBeforeSendAction();
    this._createUploadStartedAction();
    this._createUploadedAction();
    this._createFilesUploadedAction();
    this._createProgressAction();
    this._createUploadErrorAction();
    this._createUploadAbortedAction();
    this._createDropZoneEnterAction();
    this._createDropZoneLeaveAction();
  };
  n._setUploadStrategy = function () {
    var e = null;
    if (this.option("chunkSize") > 0) {
      var t = this.option("uploadChunk");
      e = t && (0, d.isFunction)(t) ? new R(this) : new M(this);
    } else {
      var n = this.option("uploadFile");
      e = n && (0, d.isFunction)(n) ? new V(this) : new L(this);
    }
    this._uploadStrategy = e;
  };
  n._initFileInput = function () {
    var e = this;
    this._isCustomClickEvent = false;
    if (!this._$fileInput) {
      this._$fileInput = (0, o.default)("<input>").attr("type", "file");
      s.default.on(this._$fileInput, "change", this._inputChangeHandler.bind(this));
      s.default.on(this._$fileInput, "click", function (t) {
        t.stopPropagation();
        e._resetInputValue();
        return e.option("useNativeInputClick") || e._isCustomClickEvent;
      });
    }
    this._$fileInput.prop({
      multiple: this.option("multiple"),
      accept: this.option("accept"),
      tabIndex: -1
    });
  };
  n._inputChangeHandler = function () {
    if (!this._doPreventInputChange) {
      var e = this._$fileInput.val().replace(/^.*\\/, "");
      var t = this._$fileInput.prop("files");
      if (!t || t.length || this.option("uploadMode") === "useForm") {
        var n = t ? this._getFiles(t) : [{
          name: e
        }];
        this._changeValue(n);
        if (this.option("uploadMode") === "instantly") {
          this._uploadFiles();
        }
      }
    }
  };
  n._shouldFileListBeExtended = function () {
    return this.option("uploadMode") !== "useForm" && this.option("extendSelection") && this.option("multiple");
  };
  n._changeValue = function (e) {
    var t = this._shouldFileListBeExtended() ? this.option("value").slice() : [];
    this.option("value", t.concat(e));
  };
  n._getFiles = function (e) {
    var t = [];
    (0, c.each)(e, function (e, n) {
      return t.push(n);
    });
    return t;
  };
  n._getFile = function (e) {
    var t = (0, d.isNumeric)(e) ? this.option("value")[e] : e;
    return this._files.filter(function (e) {
      return e.value === t;
    })[0];
  };
  n._initLabel = function () {
    this._$inputLabel ||= (0, o.default)("<div>");
    this._updateInputLabelText();
  };
  n._updateInputLabelText = function () {
    var e = this._isInteractionDisabled() ? "" : this.option("labelText");
    this._$inputLabel.text(e);
  };
  n._focusTarget = function () {
    return this.$element().find(".dx-fileuploader-button");
  };
  n._getSubmitElement = function () {
    return this._$fileInput;
  };
  n._initMarkup = function () {
    e.prototype._initMarkup.call(this);
    this.$element().addClass("dx-fileuploader");
    this._renderWrapper();
    this._renderInputWrapper();
    this._renderSelectButton();
    this._renderInputContainer();
    this._renderUploadButton();
    this._preventRecreatingFiles = true;
    this._activeDropZone = null;
  };
  n._render = function () {
    this._preventRecreatingFiles = false;
    this._attachDragEventHandlers(this._$inputWrapper);
    this._attachDragEventHandlers(this.option("dropZone"));
    this._renderFiles();
    e.prototype._render.call(this);
  };
  n._createFileProgressBar = function (e) {
    e.progressBar = this._createProgressBar(e.value.size);
    e.progressBar.$element().appendTo(e.$file);
    this._initStatusMessage(e);
    this._ensureCancelButtonInitialized(e);
  };
  n._setStatusMessage = function (e, t) {
    var n = this;
    setTimeout(function () {
      if (n.option("showFileList") && e.$statusMessage) {
        e.$statusMessage.text(t);
        e.$statusMessage.css("display", "");
        e.progressBar.$element().remove();
      }
    }, 400);
  };
  n._getUploadAbortedStatusMessage = function () {
    if (this.option("uploadMode") === "instantly") {
      return this.option("uploadAbortedMessage");
    } else {
      return this.option("readyToUploadMessage");
    }
  };
  n._createFiles = function () {
    var e = this;
    var t = this.option("value");
    if (!!this._files && (t.length === 0 || !this._shouldFileListBeExtended())) {
      this._preventFilesUploading(this._files);
      this._files = null;
    }
    this._files ||= [];
    (0, c.each)(t.slice(this._files.length), function (t, n) {
      var i = e._createFile(n);
      e._validateFile(i);
      e._files.push(i);
    });
  };
  n._preventFilesUploading = function (e) {
    var t = this;
    e.forEach(function (e) {
      return t._uploadStrategy.abortUpload(e);
    });
  };
  n._validateFile = function (e) {
    e.isValidFileExtension = this._validateFileExtension(e);
    e.isValidMinSize = this._validateMinFileSize(e);
    e.isValidMaxSize = this._validateMaxFileSize(e);
  };
  n._validateFileExtension = function (e) {
    var t = this.option("allowedFileExtensions");
    var n = this.option("accept");
    var i = this._getAllowedFileTypes(n);
    var o = e.value.name.substring(e.value.name.lastIndexOf(".")).toLowerCase();
    if (n.length !== 0 && !this._isFileTypeAllowed(e.value, i)) {
      return false;
    }
    if (t.length === 0) {
      return true;
    }
    for (var a = 0; a < t.length; a++) {
      if (o === t[a].toLowerCase()) {
        return true;
      }
    }
    return false;
  };
  n._validateMaxFileSize = function (e) {
    var t = e.value.size;
    var n = this.option("maxFileSize");
    return !(n > 0) || t <= n;
  };
  n._validateMinFileSize = function (e) {
    var t = e.value.size;
    var n = this.option("minFileSize");
    return !(n > 0) || t >= n;
  };
  n._createBeforeSendAction = function () {
    this._beforeSendAction = this._createActionByOption("onBeforeSend", {
      excludeValidators: ["readOnly"]
    });
  };
  n._createUploadStartedAction = function () {
    this._uploadStartedAction = this._createActionByOption("onUploadStarted", {
      excludeValidators: ["readOnly"]
    });
  };
  n._createUploadedAction = function () {
    this._uploadedAction = this._createActionByOption("onUploaded", {
      excludeValidators: ["readOnly"]
    });
  };
  n._createFilesUploadedAction = function () {
    this._filesUploadedAction = this._createActionByOption("onFilesUploaded", {
      excludeValidators: ["readOnly"]
    });
  };
  n._createProgressAction = function () {
    this._progressAction = this._createActionByOption("onProgress", {
      excludeValidators: ["readOnly"]
    });
  };
  n._createUploadAbortedAction = function () {
    this._uploadAbortedAction = this._createActionByOption("onUploadAborted", {
      excludeValidators: ["readOnly"]
    });
  };
  n._createUploadErrorAction = function () {
    this._uploadErrorAction = this._createActionByOption("onUploadError", {
      excludeValidators: ["readOnly"]
    });
  };
  n._createDropZoneEnterAction = function () {
    this._dropZoneEnterAction = this._createActionByOption("onDropZoneEnter");
  };
  n._createDropZoneLeaveAction = function () {
    this._dropZoneLeaveAction = this._createActionByOption("onDropZoneLeave");
  };
  n._createFile = function (e) {
    return {
      value: e,
      loadedSize: 0,
      onProgress: (0, u.default)(),
      onAbort: (0, u.default)(),
      onLoad: (0, u.default)(),
      onError: (0, u.default)(),
      onLoadStart: (0, u.default)(),
      isValidFileExtension: true,
      isValidMaxSize: true,
      isValidMinSize: true,
      isValid: function () {
        return this.isValidFileExtension && this.isValidMaxSize && this.isValidMinSize;
      },
      isInitialized: false
    };
  };
  n._resetFileState = function (e) {
    e.isAborted = false;
    e.uploadStarted = false;
    e.isStartLoad = false;
    e.loadedSize = 0;
    e.chunksData = undefined;
    e.request = undefined;
  };
  n._renderFiles = function () {
    var e;
    var t = this;
    var n = this.option("value");
    if (this._$filesContainer) {
      if (!this._shouldFileListBeExtended() || n.length === 0) {
        this._$filesContainer.empty();
      }
    } else {
      this._$filesContainer = (0, o.default)("<div>").addClass("dx-fileuploader-files-container").appendTo(this._$content);
    }
    var i = this.option("showFileList");
    if (i) {
      (0, c.each)(this._files, function (e, n) {
        if (!n.$file) {
          t._renderFile(n);
        }
      });
    }
    this.$element().toggleClass("dx-fileuploader-show-file-list", i);
    this._toggleFileUploaderEmptyClassName();
    this._updateFileNameMaxWidth();
    if ((e = this._validationMessage) !== null && e !== undefined) {
      e.repaint();
    }
  };
  n._renderFile = function (e) {
    var t = e.value;
    var n = (0, o.default)("<div>").addClass("dx-fileuploader-file-container").appendTo(this._$filesContainer);
    this._renderFileButtons(e, n);
    e.$file = (0, o.default)("<div>").addClass("dx-fileuploader-file").appendTo(n);
    var i = (0, o.default)("<div>").addClass("dx-fileuploader-file-info").appendTo(e.$file);
    e.$statusMessage = (0, o.default)("<div>").addClass("dx-fileuploader-file-status-message").appendTo(e.$file);
    (0, o.default)("<div>").addClass("dx-fileuploader-file-name").text(t.name).appendTo(i);
    if ((0, d.isDefined)(t.size)) {
      (0, o.default)("<div>").addClass("dx-fileuploader-file-size").text(this._getFileSize(t.size)).appendTo(i);
    }
    if (e.isValid()) {
      e.$statusMessage.text(this.option("readyToUploadMessage"));
    } else {
      if (!e.isValidFileExtension) {
        e.$statusMessage.append(this._createValidationElement("invalidFileExtensionMessage"));
      }
      if (!e.isValidMaxSize) {
        e.$statusMessage.append(this._createValidationElement("invalidMaxFileSizeMessage"));
      }
      if (!e.isValidMinSize) {
        e.$statusMessage.append(this._createValidationElement("invalidMinFileSizeMessage"));
      }
      n.addClass("dx-fileuploader-invalid");
    }
  };
  n._createValidationElement = function (e) {
    return (0, o.default)("<span>").text(this.option(e));
  };
  n._updateFileNameMaxWidth = function () {
    var e = this.option("allowCanceling") && this.option("uploadMode") !== "useForm" ? 1 : 0;
    var t = this.option("uploadMode") === "useButtons" ? 1 : 0;
    var n = (0, i.getWidth)(this._$filesContainer.find(".dx-fileuploader-file-container").first()) || (0, i.getWidth)(this._$filesContainer);
    var o = this._$filesContainer.find(".dx-fileuploader-button-container").eq(0);
    var a = (0, i.getWidth)(o) * (e + t);
    var r = this._$filesContainer.find(".dx-fileuploader-file-size").eq(0);
    var s = r.text();
    r.text("1000 Mb");
    var l = (0, i.getWidth)(r);
    r.text(s);
    this._$filesContainer.find(".dx-fileuploader-file-name").css("maxWidth", n - a - l);
  };
  n._renderFileButtons = function (e, t) {
    var n = this._getCancelButton(e);
    if (n) {
      t.append(n);
    }
    var i = this._getUploadButton(e);
    if (i) {
      t.append(i);
    }
  };
  n._getCancelButton = function (e) {
    var t = this;
    if (this.option("uploadMode") === "useForm") {
      return null;
    } else {
      e.cancelButton = this._createComponent((0, o.default)("<div>").addClass("dx-fileuploader-button dx-fileuploader-cancel-button"), m.default, {
        onClick: function () {
          return t._removeFile(e);
        },
        icon: "close",
        visible: this.option("allowCanceling"),
        disabled: this.option("readOnly"),
        integrationOptions: {},
        hoverStateEnabled: this.option("hoverStateEnabled")
      });
      return (0, o.default)("<div>").addClass("dx-fileuploader-button-container").append(e.cancelButton.$element());
    }
  };
  n._getUploadButton = function (e) {
    var t = this;
    if (e.isValid() && this.option("uploadMode") === "useButtons") {
      e.uploadButton = this._createComponent((0, o.default)("<div>").addClass("dx-fileuploader-button dx-fileuploader-upload-button"), m.default, {
        onClick: function () {
          return t._uploadFile(e);
        },
        icon: "upload",
        hoverStateEnabled: this.option("hoverStateEnabled")
      });
      e.onLoadStart.add(function () {
        return e.uploadButton.option({
          visible: false,
          disabled: true
        });
      });
      e.onAbort.add(function () {
        return e.uploadButton.option({
          visible: true,
          disabled: false
        });
      });
      return (0, o.default)("<div>").addClass("dx-fileuploader-button-container").append(e.uploadButton.$element());
    } else {
      return null;
    }
  };
  n._removeFile = function (e) {
    var t;
    if ((t = e.$file) !== null && t !== undefined) {
      t.parent().remove();
    }
    this._files.splice(this._files.indexOf(e), 1);
    var n = this.option("value").slice();
    n.splice(n.indexOf(e.value), 1);
    this._preventRecreatingFiles = true;
    this.option("value", n);
    this._preventRecreatingFiles = false;
    this._toggleFileUploaderEmptyClassName();
    this._resetInputValue(true);
  };
  n.removeFile = function (e) {
    if (this.option("uploadMode") !== "useForm" && (0, d.isDefined)(e)) {
      var t = this._getFile(e);
      if (t) {
        if (t.uploadStarted) {
          this._preventFilesUploading([t]);
        }
        this._removeFile(t);
      }
    }
  };
  n._toggleFileUploaderEmptyClassName = function () {
    this.$element().toggleClass("dx-fileuploader-empty", !this._files.length || this._hasInvalidFile(this._files));
  };
  n._hasInvalidFile = function (e) {
    for (var t = 0; t < e.length; t++) {
      if (!e[t].isValid()) {
        return true;
      }
    }
    return false;
  };
  n._getFileSize = function (e) {
    for (var t = 0, n = [x.default.format("dxFileUploader-bytes"), x.default.format("dxFileUploader-kb"), x.default.format("dxFileUploader-Mb"), x.default.format("dxFileUploader-Gb")], i = n.length - 1; t < i && e >= 1024;) {
      e /= 1024;
      t++;
    }
    return Math.round(e) + " " + n[t];
  };
  n._renderSelectButton = function () {
    var e = (0, o.default)("<div>").addClass("dx-fileuploader-button").appendTo(this._$inputWrapper);
    this._selectButton = this._createComponent(e, m.default, {
      text: this.option("selectButtonText"),
      focusStateEnabled: false,
      integrationOptions: {},
      disabled: this.option("readOnly"),
      hoverStateEnabled: this.option("hoverStateEnabled")
    });
    this._selectFileDialogHandler = this._selectButtonClickHandler.bind(this);
    if (v.default.real().deviceType === "desktop") {
      this._selectButton.option("onClick", this._selectFileDialogHandler);
    } else {
      this._attachSelectFileDialogHandler(this._selectButton.$element());
    }
    this._attachSelectFileDialogHandler(this.option("dialogTrigger"));
  };
  n._selectButtonClickHandler = function () {
    if (!this.option("useNativeInputClick")) {
      if (this._isInteractionDisabled()) {
        return false;
      }
      this._isCustomClickEvent = true;
      s.default.trigger(this._$fileInput, "click");
      this._isCustomClickEvent = false;
    }
  };
  n._attachSelectFileDialogHandler = function (e) {
    if ((0, d.isDefined)(e)) {
      this._detachSelectFileDialogHandler(e);
      s.default.on((0, o.default)(e), "click", this._selectFileDialogHandler);
    }
  };
  n._detachSelectFileDialogHandler = function (e) {
    if ((0, d.isDefined)(e)) {
      s.default.off((0, o.default)(e), "click", this._selectFileDialogHandler);
    }
  };
  n._renderUploadButton = function () {
    if (this.option("uploadMode") === "useButtons") {
      var e = (0, o.default)("<div>").addClass("dx-fileuploader-button").addClass("dx-fileuploader-upload-button").appendTo(this._$content);
      this._uploadButton = this._createComponent(e, m.default, {
        text: this.option("uploadButtonText"),
        onClick: this._uploadButtonClickHandler.bind(this),
        type: this.option("_uploadButtonType"),
        integrationOptions: {},
        hoverStateEnabled: this.option("hoverStateEnabled")
      });
    }
  };
  n._uploadButtonClickHandler = function () {
    this._uploadFiles();
  };
  n._shouldDragOverBeRendered = function () {
    return !this.option("readOnly") && (this.option("uploadMode") !== "useForm" || this.option("nativeDropSupported"));
  };
  n._isInteractionDisabled = function () {
    return this.option("readOnly") || this.option("disabled");
  };
  n._renderInputContainer = function () {
    this._$inputContainer = (0, o.default)("<div>").addClass("dx-fileuploader-input-container").appendTo(this._$inputWrapper);
    this._$fileInput.addClass("dx-fileuploader-input");
    this._renderInput();
    var e = `dx-fileuploader-input-label-${new a.default()}`;
    this._$inputLabel.attr("id", e).addClass("dx-fileuploader-input-label").appendTo(this._$inputContainer);
    this.setAria("labelledby", e, this._$fileInput);
  };
  n._renderInput = function () {
    if (this.option("useNativeInputClick")) {
      this._selectButton.option("template", this._selectButtonInputTemplate.bind(this));
    } else {
      this._$fileInput.appendTo(this._$inputContainer);
      this._selectButton.option("template", "content");
    }
    this._applyInputAttributes(this.option("inputAttr"));
  };
  n._selectButtonInputTemplate = function (e, t) {
    var n = (0, o.default)(t);
    var i = (0, o.default)("<span>").addClass("dx-button-text").text(e.text);
    n.append(i).append(this._$fileInput);
    return n;
  };
  n._renderInputWrapper = function () {
    this._$inputWrapper = (0, o.default)("<div>").addClass("dx-fileuploader-input-wrapper").appendTo(this._$content);
  };
  n._detachDragEventHandlers = function (e) {
    if ((0, d.isDefined)(e)) {
      s.default.off((0, o.default)(e), (0, y.addNamespace)("", this.NAME));
    }
  };
  n._attachDragEventHandlers = function (e) {
    var t = e !== this._$inputWrapper;
    if ((0, d.isDefined)(e) && this._shouldDragOverBeRendered()) {
      this._detachDragEventHandlers(e);
      e = (0, o.default)(e);
      s.default.on(e, (0, y.addNamespace)("dragenter", this.NAME), this._dragEnterHandler.bind(this, t));
      s.default.on(e, (0, y.addNamespace)("dragover", this.NAME), this._dragOverHandler.bind(this, t));
      s.default.on(e, (0, y.addNamespace)("dragleave", this.NAME), this._dragLeaveHandler.bind(this, t));
      s.default.on(e, (0, y.addNamespace)("drop", this.NAME), this._dropHandler.bind(this, t));
    }
  };
  n._applyInputAttributes = function (e) {
    this._$fileInput.attr(e);
  };
  n._useInputForDrop = function () {
    return this.option("nativeDropSupported") && this.option("uploadMode") === "useForm";
  };
  n._getDropZoneElement = function (e, t) {
    var n = e ? Array.from((0, o.default)(this.option("dropZone"))) : [this._$inputWrapper];
    return (n = n.map(function (e) {
      return (0, o.default)(e).get(0);
    }))[n.indexOf(t.currentTarget)];
  };
  n._dragEnterHandler = function (e, t) {
    if (this.option("disabled")) {
      return false;
    }
    if (!this._useInputForDrop()) {
      t.preventDefault();
    }
    var n = this._getDropZoneElement(e, t);
    if ((0, d.isDefined)(n) && this._shouldRaiseDragOver(t, n)) {
      this._activeDropZone = n;
      this._tryToggleDropZoneActive(true, e, t);
    }
  };
  n._shouldRaiseDragOver = function (e, t) {
    return this._activeDropZone === null && this.isMouseOverElement(e, t, false) && e.originalEvent.dataTransfer.types[0] === "Files";
  };
  n._dragOverHandler = function (e, t) {
    if (!this._useInputForDrop()) {
      t.preventDefault();
    }
    t.originalEvent.dataTransfer.dropEffect = "copy";
    if (!e) {
      var n = this._getDropZoneElement(false, t);
      if (this._shouldRaiseDragOver(t, n)) {
        this._dragEnterHandler(false, t);
      }
      if (this._shouldRaiseDragLeave(t, false)) {
        this._dragLeaveHandler(false, t);
      }
    }
  };
  n._dragLeaveHandler = function (e, t) {
    if (!this._useInputForDrop()) {
      t.preventDefault();
    }
    if (this._shouldRaiseDragLeave(t, e)) {
      this._tryToggleDropZoneActive(false, e, t);
      this._activeDropZone = null;
    }
  };
  n._shouldRaiseDragLeave = function (e, t) {
    return this._activeDropZone !== null && !this.isMouseOverElement(e, this._activeDropZone, !t);
  };
  n._tryToggleDropZoneActive = function (e, t, n) {
    var i = e ? "addClass" : "removeClass";
    this[e ? "_dropZoneEnterAction" : "_dropZoneLeaveAction"]({
      event: n,
      dropZoneElement: this._activeDropZone
    });
    if (!t) {
      this.$element()[i]("dx-fileuploader-dragover");
    }
  };
  n._dropHandler = function (e, t) {
    this._activeDropZone = null;
    if (!e) {
      this.$element().removeClass("dx-fileuploader-dragover");
    }
    if (!this._useInputForDrop() && (!e || !this._isInteractionDisabled())) {
      t.preventDefault();
      var n = t.originalEvent.dataTransfer.files;
      var i = this._getFiles(n);
      if ((!!this.option("multiple") || !(i.length > 1)) && i.length !== 0) {
        this._changeValue(i);
        if (this.option("uploadMode") === "instantly") {
          this._uploadFiles();
        }
      }
    }
  };
  n._areAllFilesLoaded = function () {
    return this._files.every(function (e) {
      return !e.isValid() || e._isError || e._isLoaded || e.isAborted;
    });
  };
  n._handleAllFilesUploaded = function () {
    this._recalculateProgress();
    if (this._areAllFilesLoaded()) {
      this._filesUploadedAction();
    }
  };
  n._getAllowedFileTypes = function (e) {
    if (e.length) {
      return e.split(",").map(function (e) {
        return e.trim();
      });
    } else {
      return [];
    }
  };
  n._isFileTypeAllowed = function (e, t) {
    for (var n = 0, i = t.length; n < i; n++) {
      var o = t[n];
      if (o[0] === ".") {
        o = o.replace(".", "\\.");
        if (e.name.match(new RegExp(o + "$", "i"))) {
          return true;
        }
      } else {
        o = o.replace(new RegExp("\\*", "g"), "");
        if (e.type.match(new RegExp(o, "i"))) {
          return true;
        }
      }
    }
    return false;
  };
  n._renderWrapper = function () {
    var e = (0, o.default)("<div>").addClass("dx-fileuploader-wrapper").appendTo(this.$element());
    var t = (0, o.default)("<div>").addClass("dx-fileuploader-container").appendTo(e);
    this._$content = (0, o.default)("<div>").addClass("dx-fileuploader-content").appendTo(t);
  };
  n._clean = function () {
    this._$fileInput.detach();
    delete this._$filesContainer;
    this._detachSelectFileDialogHandler(this.option("dialogTrigger"));
    this._detachDragEventHandlers(this.option("dropZone"));
    if (this._files) {
      this._files.forEach(function (e) {
        e.$file = null;
        e.$statusMessage = null;
      });
    }
    e.prototype._clean.call(this);
  };
  n.abortUpload = function (e) {
    if (this.option("uploadMode") !== "useForm") {
      if ((0, d.isDefined)(e)) {
        var t = this._getFile(e);
        if (t) {
          this._preventFilesUploading([t]);
        }
      } else {
        this._preventFilesUploading(this._files);
      }
    }
  };
  n.upload = function (e) {
    if (this.option("uploadMode") !== "useForm") {
      if ((0, d.isDefined)(e)) {
        var t = this._getFile(e);
        if (t && T()) {
          this._uploadFile(t);
        }
      } else {
        this._uploadFiles();
      }
    }
  };
  n._uploadFiles = function () {
    var e = this;
    if (T()) {
      (0, c.each)(this._files, function (t, n) {
        return e._uploadFile(n);
      });
    }
  };
  n._uploadFile = function (e) {
    this._uploadStrategy.upload(e);
  };
  n._updateProgressBar = function (e, t) {
    if (e.progressBar) {
      e.progressBar.option({
        value: t.loaded,
        showStatus: true
      });
    }
    this._progressAction({
      file: e.value,
      segmentSize: t.currentSegmentSize,
      bytesLoaded: t.loaded,
      bytesTotal: t.total,
      event: t.event,
      request: e.request
    });
  };
  n._updateTotalProgress = function (e, t) {
    var n = 0;
    if ((0, d.isDefined)(e)) {
      if (this._files.length > 0 && this._areAllFilesLoaded() && e === 0 && t === 0) {
        n = this._getProgressValue(1);
      } else if (e) {
        n = this._getProgressValue(t / e);
      }
    }
    this.option("progress", n);
    this._setLoadedSize(t);
  };
  n._getProgressValue = function (e) {
    return Math.floor(e * 100);
  };
  n._initStatusMessage = function (e) {
    e.$statusMessage.css("display", "none");
  };
  n._ensureCancelButtonInitialized = function (e) {
    var t = this;
    if (!e.isInitialized) {
      e.cancelButton.option("onClick", function () {
        t._preventFilesUploading([e]);
        t._removeFile(e);
      });
      function n() {
        setTimeout(function () {
          e.cancelButton.option({
            visible: false
          });
        }, 400);
      }
      e.onLoad.add(n);
      e.onError.add(n);
    }
  };
  n._createProgressBar = function (e) {
    var t = this;
    return this._createComponent((0, o.default)("<div>"), _.default, {
      value: undefined,
      min: 0,
      max: e,
      statusFormat: function (e) {
        return t._getProgressValue(e) + "%";
      },
      showStatus: false,
      statusPosition: "right"
    });
  };
  n._getTotalFilesSize = function () {
    var e = this;
    if (!this._totalFilesSize) {
      this._totalFilesSize = 0;
      (0, c.each)(this._files, function (t, n) {
        e._totalFilesSize += n.value.size;
      });
    }
    return this._totalFilesSize;
  };
  n._getTotalLoadedFilesSize = function () {
    var e = this;
    if (!this._totalLoadedFilesSize) {
      this._totalLoadedFilesSize = 0;
      (0, c.each)(this._files, function (t, n) {
        e._totalLoadedFilesSize += n.loadedSize;
      });
    }
    return this._totalLoadedFilesSize;
  };
  n._setLoadedSize = function (e) {
    this._totalLoadedFilesSize = e;
  };
  n._recalculateProgress = function () {
    this._totalFilesSize = 0;
    this._totalLoadedFilesSize = 0;
    this._updateTotalProgress(this._getTotalFilesSize(), this._getTotalLoadedFilesSize());
  };
  n.isMouseOverElement = function (e, t, n) {
    if (!t) {
      return false;
    }
    var o = n ? parseFloat(I.getComputedStyle(t, ":before").height) : 0;
    var a = n ? parseFloat(I.getComputedStyle(t, ":after").height) : 0;
    var r = (0, i.getOffset)(t).left;
    var s = (0, i.getOffset)(t).top + o;
    var l = t.offsetWidth;
    var u = t.offsetHeight - o - a;
    var d = this._getEventX(e);
    var c = this._getEventY(e);
    return d >= r && d < r + l && c >= s && c < s + u;
  };
  n._getEventX = function (e) {
    if ((0, y.isTouchEvent)(e)) {
      return this._getTouchEventX(e);
    } else {
      return e.clientX + this._getDocumentScrollLeft();
    }
  };
  n._getEventY = function (e) {
    if ((0, y.isTouchEvent)(e)) {
      return this._getTouchEventY(e);
    } else {
      return e.clientY + this._getDocumentScrollTop();
    }
  };
  n._getTouchEventX = function (e) {
    var t = null;
    if (e.changedTouches.length > 0) {
      t = e.changedTouches;
    } else if (e.targetTouches.length > 0) {
      t = e.targetTouches;
    }
    if (t) {
      return t[0].pageX;
    } else {
      return 0;
    }
  };
  n._getTouchEventY = function (e) {
    var t = null;
    if (e.changedTouches.length > 0) {
      t = e.changedTouches;
    } else if (e.targetTouches.length > 0) {
      t = e.targetTouches;
    }
    if (t) {
      return t[0].pageY;
    } else {
      return 0;
    }
  };
  n._getDocumentScrollTop = function () {
    var e = C.default.getDocument();
    return e.documentElement.scrollTop || e.body.scrollTop;
  };
  n._getDocumentScrollLeft = function () {
    var e = C.default.getDocument();
    return e.documentElement.scrollLeft || e.body.scrollLeft;
  };
  n._updateReadOnlyState = function () {
    var e = this.option("readOnly");
    this._selectButton.option("disabled", e);
    this._files.forEach(function (t) {
      var n;
      if ((n = t.cancelButton) === null || n === undefined) {
        return undefined;
      } else {
        return n.option("disabled", e);
      }
    });
    this._updateInputLabelText();
    this._attachDragEventHandlers(this._$inputWrapper);
  };
  n._updateHoverState = function () {
    var e;
    var t;
    var n = this.option("hoverStateEnabled");
    if ((e = this._selectButton) !== null && e !== undefined) {
      e.option("hoverStateEnabled", n);
    }
    if ((t = this._uploadButton) !== null && t !== undefined) {
      t.option("hoverStateEnabled", n);
    }
    this._files.forEach(function (e) {
      var t;
      var i;
      if ((t = e.uploadButton) !== null && t !== undefined) {
        t.option("hoverStateEnabled", n);
      }
      if ((i = e.cancelButton) !== null && i !== undefined) {
        i.option("hoverStateEnabled", n);
      }
    });
  };
  n._optionChanged = function (t) {
    var n = t.name;
    var i = t.value;
    var o = t.previousValue;
    switch (n) {
      case "height":
      case "width":
        this._updateFileNameMaxWidth();
        e.prototype._optionChanged.call(this, t);
        break;
      case "value":
        if (!i.length) {
          this._$fileInput.val("");
        }
        if (!this._preventRecreatingFiles) {
          this._createFiles();
          this._renderFiles();
        }
        this._recalculateProgress();
        e.prototype._optionChanged.call(this, t);
        break;
      case "name":
        this._initFileInput();
        e.prototype._optionChanged.call(this, t);
        break;
      case "accept":
        this._initFileInput();
        break;
      case "multiple":
        this._initFileInput();
        if (!t.value) {
          this.reset();
        }
        break;
      case "readOnly":
        this._updateReadOnlyState();
        e.prototype._optionChanged.call(this, t);
        break;
      case "disabled":
        this._updateInputLabelText();
        e.prototype._optionChanged.call(this, t);
        break;
      case "selectButtonText":
        this._selectButton.option("text", i);
        break;
      case "uploadButtonText":
        if (this._uploadButton) {
          this._uploadButton.option("text", i);
        }
        break;
      case "_uploadButtonType":
        if (this._uploadButton) {
          this._uploadButton.option("type", i);
        }
        break;
      case "dialogTrigger":
        this._detachSelectFileDialogHandler(o);
        this._attachSelectFileDialogHandler(i);
        break;
      case "dropZone":
        this._detachDragEventHandlers(o);
        this._attachDragEventHandlers(i);
        break;
      case "maxFileSize":
      case "minFileSize":
      case "allowedFileExtensions":
      case "invalidFileExtensionMessage":
      case "invalidMaxFileSizeMessage":
      case "invalidMinFileSizeMessage":
      case "readyToUploadMessage":
      case "uploadedMessage":
      case "uploadFailedMessage":
      case "uploadAbortedMessage":
        this._invalidate();
        break;
      case "labelText":
        this._updateInputLabelText();
        break;
      case "showFileList":
        if (!this._preventRecreatingFiles) {
          this._renderFiles();
        }
        break;
      case "uploadFile":
      case "uploadChunk":
      case "chunkSize":
        this._setUploadStrategy();
        break;
      case "abortUpload":
      case "uploadUrl":
      case "progress":
      case "uploadMethod":
      case "uploadHeaders":
      case "uploadCustomData":
      case "extendSelection":
        break;
      case "hoverStateEnabled":
        this._updateHoverState();
        e.prototype._optionChanged.call(this, t);
        break;
      case "allowCanceling":
      case "uploadMode":
        this.reset();
        this._invalidate();
        break;
      case "onBeforeSend":
        this._createBeforeSendAction();
        break;
      case "onUploadStarted":
        this._createUploadStartedAction();
        break;
      case "onUploaded":
        this._createUploadedAction();
        break;
      case "onFilesUploaded":
        this._createFilesUploadedAction();
        break;
      case "onProgress":
        this._createProgressAction();
        break;
      case "onUploadError":
        this._createUploadErrorAction();
        break;
      case "onUploadAborted":
        this._createUploadAbortedAction();
        break;
      case "onDropZoneEnter":
        this._createDropZoneEnterAction();
        break;
      case "onDropZoneLeave":
        this._createDropZoneLeaveAction();
        break;
      case "useNativeInputClick":
        this._renderInput();
        break;
      case "useDragOver":
        this._attachDragEventHandlers(this._$inputWrapper);
        break;
      case "nativeDropSupported":
        this._invalidate();
        break;
      case "inputAttr":
        this._applyInputAttributes(this.option(n));
        break;
      default:
        e.prototype._optionChanged.call(this, t);
    }
  };
  n._resetInputValue = function (e) {
    if (this.option("uploadMode") !== "useForm" || e) {
      this._doPreventInputChange = true;
      this._$fileInput.val("");
      this._doPreventInputChange = false;
    }
  };
  n.reset = function () {
    this.option("value", []);
  };
  return t;
}(g.default);
var O = function () {
  function e(e, t) {
    this.file = e;
    this.chunkSize = t;
    this.index = 0;
  }
  var t = e.prototype;
  t.read = function () {
    if (!this.file) {
      return null;
    }
    var e = this.createBlobResult(this.file, this.index, this.chunkSize);
    if (e.isCompleted) {
      this.file = null;
    }
    this.index++;
    return e;
  };
  t.createBlobResult = function (e, t, n) {
    var i = t * n;
    return {
      blob: this.sliceFile(e, i, n),
      index: t,
      isCompleted: i + n >= e.size
    };
  };
  t.sliceFile = function (e, t, n) {
    if (e.slice) {
      return e.slice(t, t + n);
    } else if (e.webkitSlice) {
      return e.webkitSlice(t, t + n);
    } else {
      return null;
    }
  };
  return e;
}();
var A = function () {
  function e(e) {
    this.fileUploader = e;
  }
  var t = e.prototype;
  t.upload = function (e) {
    if (e.isInitialized && e.isAborted) {
      this.fileUploader._resetFileState(e);
    }
    if (e.isValid() && !e.uploadStarted) {
      this._prepareFileBeforeUpload(e);
      this._uploadCore(e);
    }
  };
  t.abortUpload = function (e) {
    var t = this;
    if (!e._isError && !e._isLoaded && !e.isAborted && e.uploadStarted && (e.isAborted = true, e.request && e.request.abort(), this._isCustomCallback("abortUpload"))) {
      var n = this.fileUploader.option("abortUpload");
      var i = this._createUploadArgument(e);
      var o = null;
      try {
        var a = n(e.value, i);
        o = (0, f.fromPromise)(a);
      } catch (e) {
        o = new f.Deferred().reject(e).promise();
      }
      o.done(function () {
        return e.onAbort.fire();
      }).fail(function (n) {
        return t._handleFileError(e, n);
      });
    }
  };
  t._beforeSend = function (e, t) {
    var n = this._createUploadArgument(t);
    this.fileUploader._beforeSendAction({
      request: e,
      file: t.value,
      uploadInfo: n
    });
    t.request = e;
  };
  t._createUploadArgument = function (e) {};
  t._uploadCore = function (e) {};
  t._isCustomCallback = function (e) {
    var t = this.fileUploader.option(e);
    return t && (0, d.isFunction)(t);
  };
  t._handleProgress = function (e, t) {
    if (!e._isError) {
      e._isProgressStarted = true;
      this._handleProgressCore(e, t);
    }
  };
  t._handleProgressCore = function (e, t) {};
  t._handleFileError = function (e, t) {
    e._isError = true;
    e.onError.fire(t);
  };
  t._prepareFileBeforeUpload = function (e) {
    var t;
    if (e.$file) {
      if ((t = e.progressBar) !== null && t !== undefined) {
        t.dispose();
      }
      this.fileUploader._createFileProgressBar(e);
    }
    if (!e.isInitialized) {
      e.onLoadStart.add(this._onUploadStarted.bind(this, e));
      e.onLoad.add(this._onLoadedHandler.bind(this, e));
      e.onError.add(this._onErrorHandler.bind(this, e));
      e.onAbort.add(this._onAbortHandler.bind(this, e));
      e.onProgress.add(this._onProgressHandler.bind(this, e));
      e.isInitialized = true;
    }
  };
  t._shouldHandleError = function (e, t) {
    return (this._isStatusError(t.status) || !e._isProgressStarted) && !e.isAborted;
  };
  t._isStatusError = function (e) {
    return e >= 400 && e < 500 || e >= 500 && e < 600;
  };
  t._onUploadStarted = function (e, t) {
    e.uploadStarted = true;
    this.fileUploader._uploadStartedAction({
      file: e.value,
      event: t,
      request: e.request
    });
  };
  t._onAbortHandler = function (e, t) {
    var n = {
      file: e.value,
      event: t,
      request: e.request,
      message: this.fileUploader._getUploadAbortedStatusMessage()
    };
    this.fileUploader._uploadAbortedAction(n);
    this.fileUploader._setStatusMessage(e, n.message);
    this.fileUploader._handleAllFilesUploaded();
  };
  t._onErrorHandler = function (e, t) {
    var n = {
      file: e.value,
      event: undefined,
      request: e.request,
      error: t,
      message: this.fileUploader.option("uploadFailedMessage")
    };
    this.fileUploader._uploadErrorAction(n);
    this.fileUploader._setStatusMessage(e, n.message);
    this.fileUploader._handleAllFilesUploaded();
  };
  t._onLoadedHandler = function (e, t) {
    var n = {
      file: e.value,
      event: t,
      request: e.request,
      message: this.fileUploader.option("uploadedMessage")
    };
    e._isLoaded = true;
    this.fileUploader._uploadedAction(n);
    this.fileUploader._setStatusMessage(e, n.message);
    this.fileUploader._handleAllFilesUploaded();
  };
  t._onProgressHandler = function (e, t) {
    if (e) {
      var n = this.fileUploader._getTotalFilesSize();
      var i = this.fileUploader._getTotalLoadedFilesSize();
      var o = Math.min(t.loaded, e.value.size);
      var a = o - e.loadedSize;
      e.loadedSize = o;
      this.fileUploader._updateTotalProgress(n, i + a);
      this.fileUploader._updateProgressBar(e, this._getLoadedData(o, t.total, a, t));
    }
  };
  t._getLoadedData = function (e, t, n, i) {
    return {
      loaded: e,
      total: t,
      currentSegmentSize: n
    };
  };
  t._extendFormData = function (e) {
    var t = this.fileUploader.option("uploadCustomData");
    for (var n in t) {
      if (Object.prototype.hasOwnProperty.call(t, n) && (0, d.isDefined)(t[n])) {
        e.append(n, t[n]);
      }
    }
  };
  return e;
}();
var P = function (e) {
  function t(t) {
    var n;
    (n = e.call(this, t) || this).chunkSize = n.fileUploader.option("chunkSize");
    return n;
  }
  k(t, e);
  var n = t.prototype;
  n._uploadCore = function (e) {
    var t = e.value;
    var n = {
      name: t.name,
      loadedBytes: 0,
      type: t.type,
      blobReader: new O(t, this.chunkSize),
      guid: new a.default(),
      fileSize: t.size,
      count: this._getFileChunksCount(t),
      customData: {}
    };
    e.chunksData = n;
    this._sendChunk(e, n);
  };
  n._getFileChunksCount = function (e) {
    if (e.size === 0) {
      return 1;
    } else {
      return Math.ceil(e.size / this.chunkSize);
    }
  };
  n._sendChunk = function (e, t) {
    var n = this;
    var i = t.blobReader.read();
    t.currentChunk = i;
    if (i) {
      this._sendChunkCore(e, t, i).done(function () {
        if (!e.isAborted) {
          t.loadedBytes += i.blob.size;
          e.onProgress.fire({
            loaded: t.loadedBytes,
            total: e.value.size
          });
          if (i.isCompleted) {
            e.onLoad.fire();
          }
          setTimeout(function () {
            return n._sendChunk(e, t);
          });
        }
      }).fail(function (t) {
        if (n._shouldHandleError(e, t)) {
          n._handleFileError(e, t);
        }
      });
    }
  };
  n._sendChunkCore = function (e, t, n) {};
  n._tryRaiseStartLoad = function (e) {
    if (!e.isStartLoad) {
      e.isStartLoad = true;
      e.onLoadStart.fire();
    }
  };
  n._getEvent = function (e) {
    return null;
  };
  n._createUploadArgument = function (e) {
    return this._createChunksInfo(e.chunksData);
  };
  n._createChunksInfo = function (e) {
    return {
      bytesUploaded: e.loadedBytes,
      chunkCount: e.count,
      customData: e.customData,
      chunkBlob: e.currentChunk.blob,
      chunkIndex: e.currentChunk.index
    };
  };
  return t;
}(A);
var M = function (e) {
  function t() {
    return e.apply(this, arguments) || this;
  }
  k(t, e);
  var n = t.prototype;
  n._sendChunkCore = function (e, t, n) {
    var i = this;
    return p.default.sendRequest({
      url: this.fileUploader.option("uploadUrl"),
      method: this.fileUploader.option("uploadMethod"),
      headers: this.fileUploader.option("uploadHeaders"),
      beforeSend: function (t) {
        return i._beforeSend(t, e);
      },
      upload: {
        onprogress: function (t) {
          return i._handleProgress(e, t);
        },
        onloadstart: function () {
          return i._tryRaiseStartLoad(e);
        },
        onabort: function () {
          return e.onAbort.fire();
        }
      },
      data: this._createFormData({
        fileName: t.name,
        blobName: this.fileUploader.option("name"),
        blob: n.blob,
        index: n.index,
        count: t.count,
        type: t.type,
        guid: t.guid,
        size: t.fileSize
      })
    });
  };
  n._createFormData = function (e) {
    var t = new I.FormData();
    t.append(e.blobName, e.blob);
    t.append("chunkMetadata", JSON.stringify({
      FileName: e.fileName,
      Index: e.index,
      TotalCount: e.count,
      FileSize: e.size,
      FileType: e.type,
      FileGuid: e.guid
    }));
    this._extendFormData(t);
    return t;
  };
  return t;
}(P);
var R = function (e) {
  function t() {
    return e.apply(this, arguments) || this;
  }
  k(t, e);
  var n = t.prototype;
  n._sendChunkCore = function (e, t) {
    this._tryRaiseStartLoad(e);
    var n = this._createChunksInfo(t);
    var i = this.fileUploader.option("uploadChunk");
    try {
      var o = i(e.value, n);
      return (0, f.fromPromise)(o);
    } catch (e) {
      return new f.Deferred().reject(e).promise();
    }
  };
  n._shouldHandleError = function (e, t) {
    return true;
  };
  return t;
}(P);
var B = function (e) {
  function t() {
    return e.apply(this, arguments) || this;
  }
  k(t, e);
  var n = t.prototype;
  n._uploadCore = function (e) {
    var t = this;
    e.loadedSize = 0;
    this._uploadFile(e).done(function () {
      if (!e.isAborted) {
        e.onLoad.fire();
      }
    }).fail(function (n) {
      if (t._shouldHandleError(e, n)) {
        t._handleFileError(e, n);
      }
    });
  };
  n._uploadFile = function (e) {};
  n._handleProgressCore = function (e, t) {
    e.onProgress.fire(t);
  };
  n._getLoadedData = function (t, n, i, o) {
    var a = e.prototype._getLoadedData.call(this, t, n, i, o);
    a.event = o;
    return a;
  };
  return t;
}(A);
var L = function (e) {
  function t() {
    return e.apply(this, arguments) || this;
  }
  k(t, e);
  var n = t.prototype;
  n._uploadFile = function (e) {
    var t = this;
    return p.default.sendRequest({
      url: this.fileUploader.option("uploadUrl"),
      method: this.fileUploader.option("uploadMethod"),
      headers: this.fileUploader.option("uploadHeaders"),
      beforeSend: function (n) {
        return t._beforeSend(n, e);
      },
      upload: {
        onprogress: function (n) {
          return t._handleProgress(e, n);
        },
        onloadstart: function () {
          return e.onLoadStart.fire();
        },
        onabort: function () {
          return e.onAbort.fire();
        }
      },
      data: this._createFormData(this.fileUploader.option("name"), e.value)
    });
  };
  n._createFormData = function (e, t) {
    var n = new I.FormData();
    n.append(e, t, t.name);
    this._extendFormData(n);
    return n;
  };
  return t;
}(B);
var V = function (e) {
  function t() {
    return e.apply(this, arguments) || this;
  }
  k(t, e);
  var n = t.prototype;
  n._uploadFile = function (e) {
    var t = this;
    e.onLoadStart.fire();
    var n = this.fileUploader.option("uploadFile");
    try {
      var i = n(e.value, function (n) {
        var i = {
          loaded: n,
          total: e.value.size
        };
        t._handleProgress(e, i);
      });
      return (0, f.fromPromise)(i);
    } catch (e) {
      return new f.Deferred().reject(e).promise();
    }
  };
  n._shouldHandleError = function (e, t) {
    return true;
  };
  return t;
}(B);
(0, l.default)("dxFileUploader", E);
var F = E;
exports.default = F;
module.exports = exports.default;
module.exports.default = exports.default;