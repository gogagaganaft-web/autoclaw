exports.default = undefined;
var i = D(require("./68374.js"));
var o = require("./13306.js");
var a = require("./35922.js");
var r = require("./6415.js");
var s = require("./20576.js");
var l = D(require("./99393.js"));
var u = require("./10688.js");
var d = D(require("./96452.js"));
var c = D(require("./96688.js"));
var h = D(require("./44504.js"));
var f = require("./62754.js");
var p = D(require("./55994.js"));
var g = require("./39611.js");
var m = require("./66365.js");
var _ = D(require("./37334.js"));
var v = require("./51203.js");
var y = D(require("./93786.js"));
var b = D(require("./20530.js"));
var x = D(require("./1702.js"));
require("./44844.js");
var w = D(require("./56957.js"));
var C = D(require("./10803.js"));
var S = D(require("./67600.js"));
var k = D(require("./80209.js"));
function D(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
function I(e) {
  return (I = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function (e) {
    return typeof e;
  } : function (e) {
    if (e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype) {
      return "symbol";
    } else {
      return typeof e;
    }
  })(e);
}
function T() {
  return (T = Object.assign ? Object.assign.bind() : function (e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var i in n) {
        if (Object.prototype.hasOwnProperty.call(n, i)) {
          e[i] = n[i];
        }
      }
    }
    return e;
  }).apply(this, arguments);
}
function E(e) {
  return function (e) {
    if (Array.isArray(e)) {
      return O(e);
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
      return O(e, t);
    }
    var n = Object.prototype.toString.call(e).slice(8, -1);
    if (n === "Object" && e.constructor) {
      n = e.constructor.name;
    }
    if (n === "Map" || n === "Set") {
      return Array.from(e);
    }
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) {
      return O(e, t);
    }
  }(e) || function () {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }();
}
function O(e, t) {
  if (t == null || t > e.length) {
    t = e.length;
  }
  for (var n = 0, i = new Array(t); n < t; n++) {
    i[n] = e[n];
  }
  return i;
}
function A(e, t, n) {
  if ((t = function (e) {
    var t = function (e, t) {
      if (I(e) !== "object" || e === null) {
        return e;
      }
      var n = e[Symbol.toPrimitive];
      if (n !== undefined) {
        var i = n.call(e, t || "default");
        if (I(i) !== "object") {
          return i;
        }
        throw new TypeError("@@toPrimitive must return a primitive value.");
      }
      return (t === "string" ? String : Number)(e);
    }(e, "string");
    if (I(t) === "symbol") {
      return t;
    } else {
      return String(t);
    }
  }(t)) in e) {
    Object.defineProperty(e, t, {
      value: n,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    e[t] = n;
  }
  return e;
}
var P = b.default.current().platform === "ios";
var M = 0;
var R = d.default.inherit({
  _getDefaultOptions: function () {
    return (0, o.extend)(this.callBase(), {
      focusStateEnabled: true,
      valueType: "html",
      placeholder: "",
      toolbar: null,
      variables: null,
      mediaResizing: null,
      tableResizing: null,
      mentions: null,
      customizeModules: null,
      tableContextMenu: null,
      allowSoftLineBreak: false,
      formDialogOptions: null,
      imageUpload: null,
      stylingMode: (0, k.default)().editorStylingMode || "outlined"
    });
  },
  _init: function () {
    this._mentionKeyInTemplateStorage = M++;
    this.callBase();
    this._cleanCallback = (0, h.default)();
    this._contentInitializedCallback = (0, h.default)();
  },
  _getAnonymousTemplateName: function () {
    return "htmlContent";
  },
  _initTemplates: function () {
    this._templateManager.addDefaultTemplates(A({}, "htmlContent", new u.EmptyTemplate()));
    this.callBase();
  },
  _focusTarget: function () {
    return this._getContent();
  },
  _getContent: function () {
    return this.$element().find(`.dx-htmleditor-content`);
  },
  _focusInHandler: function (e) {
    var t = e.relatedTarget;
    if (!this._shouldSkipFocusEvent(t)) {
      this._toggleFocusClass(true, this.$element());
      this.callBase.apply(this, arguments);
    }
  },
  _focusOutHandler: function (e) {
    var t = e.relatedTarget;
    if (!this._shouldSkipFocusEvent(t)) {
      this._toggleFocusClass(false, this.$element());
      this.callBase.apply(this, arguments);
    }
  },
  _shouldSkipFocusEvent: function (e) {
    return (0, i.default)(e).hasClass("ql-clipboard");
  },
  _initMarkup: function () {
    this._$htmlContainer = (0, i.default)("<div>").addClass("dx-quill-container");
    this.$element().attr("role", "application").addClass("dx-htmleditor").wrapInner(this._$htmlContainer);
    this._renderStylingMode();
    var e = this._getTemplate("htmlContent");
    this._$templateResult = e && e.render({
      container: (0, r.getPublicElement)(this._$htmlContainer),
      noModel: true,
      transclude: true
    });
    this._renderSubmitElement();
    this.callBase();
    this._updateContainerMarkup();
  },
  _renderSubmitElement: function () {
    this._$submitElement = (0, i.default)("<textarea>").addClass("dx-htmleditor-submit-element").attr("hidden", true).appendTo(this.$element());
    this._setSubmitValue(this.option("value"));
  },
  _setSubmitValue: function (e) {
    this._getSubmitElement().val(e);
  },
  _getSubmitElement: function () {
    return this._$submitElement;
  },
  _createNoScriptFrame: function () {
    return (0, i.default)("<iframe>").css("display", "none").attr({
      srcdoc: "",
      id: "xss-frame",
      sandbox: "allow-same-origin"
    });
  },
  _removeXSSVulnerableHtml: function (e) {
    var t = this._createNoScriptFrame().appendTo("body");
    var n = t.get(0).contentWindow.document.body;
    n.innerHTML = e;
    (function e(t) {
      if (t.attributes) {
        for (var n = 0; n < t.attributes.length; n++) {
          var i = t.attributes[n].name;
          if (i.startsWith("on")) {
            t.removeAttribute(i);
          }
        }
      }
      if (t.childNodes) {
        for (var o = 0; o < t.childNodes.length; o++) {
          e(t.childNodes[o]);
        }
      }
    })(n);
    n.querySelectorAll("script").forEach(function (e) {
      e.remove();
    });
    var i = n.innerHTML;
    t.remove();
    return i;
  },
  _updateContainerMarkup: function () {
    var e = this.option("value");
    if (this._isMarkdownValue()) {
      this._prepareMarkdownConverter();
      e = this._markdownConverter.toHtml(e);
    }
    if (e) {
      var t = this._removeXSSVulnerableHtml(e);
      this._$htmlContainer.html(t);
    }
  },
  _prepareMarkdownConverter: function () {
    var e = w.default.getConverter("markdown");
    if (!e) {
      throw c.default.Error("E1051", "markdown");
    }
    this._markdownConverter = new e();
  },
  _render: function () {
    this._prepareConverters();
    this.callBase();
  },
  _prepareQuillRegistrator: function () {
    this._quillRegistrator ||= new x.default();
  },
  _getRegistrator: function () {
    this._prepareQuillRegistrator();
    return this._quillRegistrator;
  },
  _prepareConverters: function () {
    if (!this._deltaConverter) {
      var e = w.default.getConverter("delta");
      if (e) {
        this._deltaConverter = new e();
      }
    }
    if (this.option("valueType") === "markdown" && !this._markdownConverter) {
      this._prepareMarkdownConverter();
    }
  },
  _renderContentImpl: function () {
    this._contentRenderedDeferred = new f.Deferred();
    var e = this._contentRenderedDeferred.promise();
    this.callBase();
    this._renderHtmlEditor();
    this._renderFormDialog();
    this._addKeyPressHandler();
    return e;
  },
  _pointerMoveHandler: function (e) {
    if (P) {
      e.stopPropagation();
    }
  },
  _attachFocusEvents: function () {
    (0, s.deferRender)(this.callBase.bind(this));
  },
  _addKeyPressHandler: function () {
    var e = (0, g.addNamespace)("keydown", `${this.NAME}TextChange`);
    p.default.on(this._$htmlContainer, e, this._keyDownHandler.bind(this));
  },
  _keyDownHandler: function (e) {
    this._saveValueChangeEvent(e);
  },
  _renderHtmlEditor: function () {
    var e = this;
    var t = this.option("customizeModules");
    var n = this._getModulesConfig();
    if ((0, a.isFunction)(t)) {
      t(n);
    }
    this._quillInstance = this._getRegistrator().createEditor(this._$htmlContainer[0], {
      placeholder: this.option("placeholder"),
      readOnly: this.option("readOnly") || this.option("disabled"),
      modules: n,
      theme: "basic"
    });
    this._deltaConverter.setQuillInstance(this._quillInstance);
    this._textChangeHandlerWithContext = this._textChangeHandler.bind(this);
    this._quillInstance.on("text-change", this._textChangeHandlerWithContext);
    this._renderScrollHandler();
    if (this._hasTranscludedContent()) {
      this._updateContentTask = (0, s.executeAsync)(function () {
        e._applyTranscludedContent();
      });
    } else {
      this._finalizeContentRendering();
    }
  },
  _renderScrollHandler: function () {
    var e = this._getContent();
    var t = (0, v.prepareScrollData)(e);
    p.default.on(e, (0, g.addNamespace)(_.default.init, this.NAME), t, s.noop);
    p.default.on(e, (0, g.addNamespace)(y.default.move, this.NAME), this._pointerMoveHandler.bind(this));
  },
  _applyTranscludedContent: function () {
    var e = this.option("value");
    if (!(0, a.isDefined)(e)) {
      var t = this._deltaConverter.toHtml();
      var n = this._quillInstance.clipboard.convert({
        html: t
      });
      if (n.ops.length) {
        this._quillInstance.setContents(n);
        return;
      }
    }
    this._finalizeContentRendering();
  },
  _hasTranscludedContent: function () {
    return this._$templateResult && this._$templateResult.length;
  },
  _getModulesConfig: function () {
    var e = this;
    var t = this._getRegistrator().getQuill();
    var n = (0, C.default)(t);
    return (0, o.extend)({}, {
      table: true,
      toolbar: this._getModuleConfigByOption("toolbar"),
      variables: this._getModuleConfigByOption("variables"),
      resizing: this._getModuleConfigByOption("mediaResizing"),
      tableResizing: this._getModuleConfigByOption("tableResizing"),
      tableContextMenu: this._getModuleConfigByOption("tableContextMenu"),
      imageUpload: this._getModuleConfigByOption("imageUpload"),
      imageCursor: this._getBaseModuleConfig(),
      mentions: this._getModuleConfigByOption("mentions"),
      uploader: {
        onDrop: function (t) {
          return e._saveValueChangeEvent((0, m.Event)(t));
        },
        imageBlot: "extendedImage"
      },
      keyboard: {
        onKeydown: function (t) {
          return e._saveValueChangeEvent((0, m.Event)(t));
        }
      },
      clipboard: {
        onPaste: function (t) {
          return e._saveValueChangeEvent((0, m.Event)(t));
        },
        onCut: function (t) {
          return e._saveValueChangeEvent((0, m.Event)(t));
        },
        matchers: [["p.MsoListParagraphCxSpFirst", n], ["p.MsoListParagraphCxSpMiddle", n], ["p.MsoListParagraphCxSpLast", n]]
      },
      multiline: Boolean(this.option("allowSoftLineBreak"))
    }, this._getCustomModules());
  },
  _getModuleConfigByOption: function (e) {
    var t = this.option(e);
    var n = {};
    if ((0, a.isDefined)(t)) {
      if (Array.isArray(t)) {
        n[e] = t;
      } else {
        n = t;
      }
      return (0, o.extend)(this._getBaseModuleConfig(), n);
    }
  },
  _getBaseModuleConfig: function () {
    return {
      editorInstance: this
    };
  },
  _getCustomModules: function () {
    var e = this;
    var t = {};
    this._getRegistrator().getRegisteredModuleNames().forEach(function (n) {
      t[n] = e._getBaseModuleConfig();
    });
    return t;
  },
  _textChangeHandler: function (e, t, n) {
    var i = this._deltaConverter.toHtml();
    var o = this._isMarkdownValue() ? this._updateValueByType("markdown", i) : i;
    var a = this.option("value");
    if (a !== o && !this._isNullValueConverted(a, o)) {
      this._isEditorUpdating = true;
      this.option("value", o);
    }
    this._finalizeContentRendering();
  },
  _isNullValueConverted: function (e, t) {
    return e === null && t === "";
  },
  _finalizeContentRendering: function () {
    if (this._contentRenderedDeferred) {
      this.clearHistory();
      this._contentInitializedCallback.fire();
      this._contentRenderedDeferred.resolve();
      this._contentRenderedDeferred = undefined;
    }
  },
  _updateValueByType: function (e, t) {
    var n = this._markdownConverter;
    if ((0, a.isDefined)(n)) {
      var i = (0, s.ensureDefined)(t, this.option("value"));
      if (e === "markdown") {
        return n.toMarkdown(i);
      } else {
        return n.toHtml(i);
      }
    }
  },
  _isMarkdownValue: function () {
    return this.option("valueType") === "markdown";
  },
  _resetEnabledState: function () {
    if (this._quillInstance) {
      var e = !this.option("readOnly") && !this.option("disabled");
      this._quillInstance.enable(e);
    }
  },
  _renderFormDialog: function () {
    var e = (0, o.extend)(true, {
      width: "auto",
      height: "auto",
      hideOnOutsideClick: true
    }, this.option("formDialogOptions"));
    this._formDialog = new S.default(this, e);
  },
  _getStylingModePrefix: function () {
    return "dx-htmleditor-";
  },
  _getQuillContainer: function () {
    return this._$htmlContainer;
  },
  _prepareModuleOptions: function (e) {
    var t;
    var n = (t = e.fullName) === null || t === undefined ? undefined : t.split(".");
    var i = e.value;
    var o = n.length >= 2 ? n[1] : e.name;
    if (n.length === 3) {
      i = A({}, n[2], i);
    }
    return [o, i];
  },
  _moduleOptionChanged: function (e, t) {
    var n = this.getModule(e);
    if (Boolean(n)) {
      n.option.apply(n, E(this._prepareModuleOptions(t)));
    } else {
      this._invalidate();
    }
  },
  _optionChanged: function (e) {
    switch (e.name) {
      case "value":
        if (this._quillInstance) {
          if (this._isEditorUpdating) {
            this._isEditorUpdating = false;
          } else {
            var t = this._isMarkdownValue() ? this._updateValueByType("HTML", e.value) : e.value;
            this._suppressValueChangeAction();
            this._updateHtmlContent(t);
            this._resumeValueChangeAction();
          }
        } else {
          this._$htmlContainer.html(e.value);
        }
        var n = this.option("value");
        if (n !== e.previousValue) {
          this._setSubmitValue(n);
          this.callBase(T({}, e, {
            value: n
          }));
        }
        break;
      case "placeholder":
      case "variables":
      case "toolbar":
      case "mentions":
      case "customizeModules":
      case "allowSoftLineBreak":
        this._invalidate();
        break;
      case "tableResizing":
        this._moduleOptionChanged("tableResizing", e);
        break;
      case "valueType":
        this._prepareConverters();
        var i = this._updateValueByType(e.value);
        if (e.value === "html" && this._quillInstance) {
          this._updateHtmlContent(i);
        } else {
          this.option("value", i);
        }
        break;
      case "stylingMode":
        this._renderStylingMode();
        break;
      case "readOnly":
      case "disabled":
        this.callBase(e);
        this._resetEnabledState();
        break;
      case "formDialogOptions":
        this._renderFormDialog();
        break;
      case "tableContextMenu":
        this._moduleOptionChanged("tableContextMenu", e);
        break;
      case "mediaResizing":
        if (e.previousValue && e.value) {
          this.getModule("resizing").option(e.name, e.value);
        } else {
          this._invalidate();
        }
        break;
      case "width":
        this.callBase(e);
        this._repaintToolbar();
        break;
      case "imageUpload":
        this._moduleOptionChanged("imageUpload", e);
        break;
      default:
        this.callBase(e);
    }
  },
  _repaintToolbar: function () {
    this._applyToolbarMethod("repaint");
  },
  _updateHtmlContent: function (e) {
    var t = this._quillInstance.clipboard.convert({
      html: e
    });
    this._quillInstance.setContents(t);
  },
  _clean: function () {
    if (this._quillInstance) {
      p.default.off(this._getContent(), `.${this.NAME}`);
      this._quillInstance.off("text-change", this._textChangeHandlerWithContext);
      this._cleanCallback.fire();
    }
    this._abortUpdateContentTask();
    this._cleanCallback.empty();
    this._contentInitializedCallback.empty();
    this.callBase();
  },
  _abortUpdateContentTask: function () {
    if (this._updateContentTask) {
      this._updateContentTask.abort();
      this._updateContentTask = undefined;
    }
  },
  _applyQuillMethod: function (e, t) {
    if (this._quillInstance) {
      return this._quillInstance[e].apply(this._quillInstance, t);
    }
  },
  _applyQuillHistoryMethod: function (e) {
    if (this._quillInstance && this._quillInstance.history) {
      this._quillInstance.history[e]();
    }
  },
  _applyToolbarMethod: function (e) {
    var t;
    if ((t = this.getModule("toolbar")) !== null && t !== undefined) {
      t[e]();
    }
  },
  addCleanCallback: function (e) {
    this._cleanCallback.add(e);
  },
  addContentInitializedCallback: function (e) {
    this._contentInitializedCallback.add(e);
  },
  register: function (e) {
    this._getRegistrator().registerModules(e);
    if (this._quillInstance) {
      this.repaint();
    }
  },
  get: function (e) {
    return this._getRegistrator().getQuill().import(e);
  },
  getModule: function (e) {
    return this._applyQuillMethod("getModule", arguments);
  },
  getQuillInstance: function () {
    return this._quillInstance;
  },
  getSelection: function (e) {
    return this._applyQuillMethod("getSelection", arguments);
  },
  setSelection: function (e, t) {
    this._applyQuillMethod("setSelection", arguments);
  },
  getText: function (e, t) {
    return this._applyQuillMethod("getText", arguments);
  },
  format: function (e, t) {
    this._applyQuillMethod("format", arguments);
  },
  formatText: function (e, t, n, i) {
    this._applyQuillMethod("formatText", arguments);
  },
  formatLine: function (e, t, n, i) {
    this._applyQuillMethod("formatLine", arguments);
  },
  getFormat: function (e, t) {
    return this._applyQuillMethod("getFormat", arguments);
  },
  removeFormat: function (e, t) {
    return this._applyQuillMethod("removeFormat", arguments);
  },
  clearHistory: function () {
    this._applyQuillHistoryMethod("clear");
    this._applyToolbarMethod("updateHistoryWidgets");
  },
  undo: function () {
    this._applyQuillHistoryMethod("undo");
  },
  redo: function () {
    this._applyQuillHistoryMethod("redo");
  },
  getLength: function () {
    return this._applyQuillMethod("getLength");
  },
  getBounds: function (e, t) {
    return this._applyQuillMethod("getBounds", arguments);
  },
  delete: function (e, t) {
    this._applyQuillMethod("deleteText", arguments);
  },
  insertText: function (e, t, n) {
    this._applyQuillMethod("insertText", arguments);
  },
  insertEmbed: function (e, t, n) {
    this._applyQuillMethod("insertEmbed", arguments);
  },
  showFormDialog: function (e) {
    return this._formDialog.show(e);
  },
  formDialogOption: function (e, t) {
    return this._formDialog.popupOption.apply(this._formDialog, arguments);
  },
  focus: function () {
    this.callBase();
    this._applyQuillMethod("focus");
  },
  blur: function () {
    this._applyQuillMethod("blur");
  },
  getMentionKeyInTemplateStorage: function () {
    return this._mentionKeyInTemplateStorage;
  }
});
(0, l.default)("dxHtmlEditor", R);
var B = R;
exports.default = B;
module.exports = exports.default;
module.exports.default = exports.default;