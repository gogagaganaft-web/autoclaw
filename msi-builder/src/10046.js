exports.ImageUploader = undefined;
exports.correctSlashesInUrl = E;
exports.getFileUploaderBaseOptions = O;
exports.serverUpload = P;
exports.urlUpload = A;
var i = p(require("./68374.js"));
var o = p(require("./28109.js"));
var a = require("./95479.js");
var r = require("./13306.js");
var s = require("./58664.js");
var l = p(require("./20530.js"));
var u = require("./35922.js");
var d = p(require("./28236.js"));
var c = p(require("./53749.js"));
var h = p(require("./29837.js"));
var f = ["imageSrc", "src"];
function p(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
function g(e, t) {
  e.prototype = Object.create(t.prototype);
  e.prototype.constructor = e;
  m(e, t);
}
function m(e, t) {
  return (m = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (e, t) {
    e.__proto__ = t;
    return e;
  })(e, t);
}
function _(e) {
  return (_ = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function (e) {
    return typeof e;
  } : function (e) {
    if (e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype) {
      return "symbol";
    } else {
      return typeof e;
    }
  })(e);
}
function v() {
  return (v = Object.assign ? Object.assign.bind() : function (e) {
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
function y(e, t) {
  if (e == null) {
    return {};
  }
  var n;
  var i;
  var o = function (e, t) {
    if (e == null) {
      return {};
    }
    var n;
    var i;
    var o = {};
    var a = Object.keys(e);
    for (i = 0; i < a.length; i++) {
      n = a[i];
      if (!(t.indexOf(n) >= 0)) {
        o[n] = e[n];
      }
    }
    return o;
  }(e, t);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (i = 0; i < a.length; i++) {
      n = a[i];
      if (!(t.indexOf(n) >= 0)) {
        if (Object.prototype.propertyIsEnumerable.call(e, n)) {
          o[n] = e[n];
        }
      }
    }
  }
  return o;
}
var b = l.default.current().deviceType === "phone";
var x = function () {
  function e(e, t) {
    this.module = e;
    this.config = t ?? {};
    this.quill = this.module.quill;
    this.editorInstance = this.module.editorInstance;
  }
  var t = e.prototype;
  t.render = function () {
    var e = this;
    if (this.editorInstance._formDialog) {
      this.editorInstance._formDialog.beforeAddButtonAction = function () {
        return e.getCurrentTab().upload();
      };
    }
    this.tabPanelIndex = 0;
    this.formData = this.getFormData();
    this.isUpdating = this.isImageUpdating();
    this.tabsModel = this.createTabsModel(this.config.tabs);
    this.tabs = this.createTabs(this.formData);
    var t = this.getFormConfig();
    this.updatePopupConfig();
    this.updateAddButtonState();
    this.editorInstance.showFormDialog(t).done(function (t, n) {
      e.tabs[e.getActiveTabIndex()].strategy.pasteImage(t, n);
    }).always(function () {
      e.resetDialogPopupOptions();
      e.quill.focus();
    });
  };
  t.getCurrentTab = function () {
    return this.tabs[this.tabPanelIndex];
  };
  t.updateAddButtonState = function () {
    var e = this.getCurrentTab().isDisableButton();
    this.setAddButtonDisabled(e);
  };
  t.setAddButtonDisabled = function (e) {
    this.editorInstance.formDialogOption({
      "toolbarItems[0].options.disabled": e
    });
  };
  t.getActiveTabIndex = function () {
    if (this.isUpdating) {
      return 0;
    } else {
      return this.tabPanelIndex;
    }
  };
  t.getFormData = function () {
    return this.getUpdateDialogFormData(this.quill.getFormat());
  };
  t.getUpdateDialogFormData = function (e) {
    var t = e.imageSrc;
    var n = e.src;
    return v({
      src: t ?? n
    }, y(e, f));
  };
  t.createUrlTab = function (e) {
    var t = this;
    return new C(this.module, {
      config: this.config,
      formData: e,
      isUpdating: this.isUpdating
    }, function () {
      return t.updateAddButtonState();
    });
  };
  t.createFileTab = function () {
    var e = this;
    return new S(this.module, {
      config: this.config
    }, function () {
      return e.updateAddButtonState();
    });
  };
  t.createTabsModel = function (e = []) {
    if (e.length === 0 || this.isUpdating) {
      return ["url"];
    } else {
      return e.map(function (e) {
        if (_(e) === "object") {
          return e.name;
        } else {
          return e;
        }
      });
    }
  };
  t.createTabs = function (e) {
    var t = this;
    return this.tabsModel.map(function (n) {
      if (n === "url") {
        return t.createUrlTab(e);
      } else {
        return t.createFileTab();
      }
    });
  };
  t.isImageUpdating = function () {
    return Object.prototype.hasOwnProperty.call(this.module.quill.getFormat() ?? {}, "imageSrc");
  };
  t.updatePopupConfig = function () {
    var e = `dx-htmleditor-add-image-popup dx-formdialog`;
    if (this.useTabbedItems()) {
      e += ` dx-htmleditor-add-image-popup-with-tabs`;
    }
    var t = this.isUpdating ? "dxHtmlEditor-dialogUpdateImageCaption" : "dxHtmlEditor-dialogImageCaption";
    var n = this.isUpdating ? "dxHtmlEditor-dialogImageUpdateButton" : "dxHtmlEditor-dialogImageAddButton";
    this.editorInstance.formDialogOption({
      title: o.default.format(t),
      "toolbarItems[0].options.text": o.default.format(n),
      wrapperAttr: {
        class: e
      }
    });
  };
  t.resetDialogPopupOptions = function () {
    this.editorInstance.formDialogOption({
      "toolbarItems[0].options.text": o.default.format("OK"),
      "toolbarItems[0].options.visible": true,
      "toolbarItems[0].options.disabled": false,
      wrapperAttr: {
        class: "dx-formdialog"
      }
    });
  };
  t.useTabbedItems = function () {
    return this.tabsModel.length > 1;
  };
  t.getFormWidth = function () {
    if (b) {
      return "100%";
    } else {
      return 493;
    }
  };
  t.getFormConfig = function () {
    return {
      formData: this.formData,
      width: this.getFormWidth(),
      labelLocation: "top",
      colCount: this.useTabbedItems() ? 1 : 11,
      items: this.getItemsConfig()
    };
  };
  t.getItemsConfig = function () {
    var e = this;
    if (this.useTabbedItems()) {
      return [{
        itemType: "tabbed",
        tabPanelOptions: {
          onSelectionChanged: function (t) {
            e.tabPanelIndex = t.component.option("selectedIndex");
            e.updateAddButtonState();
          }
        },
        tabs: (0, a.map)(this.tabs, function (e) {
          return {
            title: e.getTabName(),
            colCount: 11,
            items: e.getItemsConfig()
          };
        })
      }];
    } else {
      return this.tabs[0].getItemsConfig();
    }
  };
  return e;
}();
exports.ImageUploader = x;
var w = function () {
  function e(e, t, n) {
    var i = t.config;
    var o = t.formData;
    var a = t.isUpdating;
    this.module = e;
    this.config = i;
    this.formData = o;
    this.isUpdating = a;
    this.onFileSelected = n;
    this.strategy = this.createStrategy();
  }
  var t = e.prototype;
  t.getItemsConfig = function () {
    return this.strategy.getItemsConfig();
  };
  t.createStrategy = function () {
    if (this.isUpdating) {
      return new I(this.module, this.config, this.formData);
    } else {
      return new D(this.module, this.config, this.onFileSelected);
    }
  };
  t.isDisableButton = function () {
    return false;
  };
  t.upload = function () {
    return this.strategy.upload();
  };
  return e;
}();
var C = function (e) {
  function t() {
    return e.apply(this, arguments) || this;
  }
  g(t, e);
  t.prototype.getTabName = function () {
    return o.default.format("dxHtmlEditor-dialogImageSpecifyUrl");
  };
  return t;
}(w);
var S = function (e) {
  function t() {
    return e.apply(this, arguments) || this;
  }
  g(t, e);
  var n = t.prototype;
  n.getTabName = function () {
    return o.default.format("dxHtmlEditor-dialogImageSelectFile");
  };
  n.createStrategy = function () {
    return new T(this.module, this.config, this.onFileSelected);
  };
  n.isDisableButton = function () {
    return !this.strategy.isValid();
  };
  return t;
}(w);
var k = function () {
  function e(e, t) {
    this.module = e;
    this.config = t;
    this.editorInstance = e.editorInstance;
    this.quill = e.quill;
    this.selection = this.getQuillSelection();
  }
  var t = e.prototype;
  t.getQuillSelection = function () {
    var e = this.quill.getSelection();
    return e ?? {
      index: this.quill.getLength(),
      length: 0
    };
  };
  t.pasteImage = function () {};
  t.isValid = function () {
    return true;
  };
  t.upload = function () {};
  return e;
}();
var D = function (e) {
  function t(t, n, i) {
    var o;
    (o = e.call(this, t, n, i) || this).shouldKeepAspectRatio = true;
    return o;
  }
  g(t, e);
  var n = t.prototype;
  n.pasteImage = function (e, t) {
    this.module.saveValueChangeEvent(t);
    A(this.quill, this.selection.index, e);
  };
  n.keepAspectRatio = function (e, t) {
    var n = t.dependentEditor;
    var i = t.e;
    var o = parseInt(i.value);
    var a = parseInt(i.previousValue);
    var r = parseInt(n.option("value"));
    e.component.updateData(e.dataField, o);
    if (this.shouldKeepAspectRatio && r && a && !this.preventRecalculating) {
      this.preventRecalculating = true;
      n.option("value", Math.round(o * r / parseInt(a)).toString());
    }
    this.preventRecalculating = false;
  };
  n.createKeepAspectRatioEditor = function (e, t, n) {
    var i = this;
    return this.editorInstance._createComponent(e, h.default, (0, r.extend)(true, t.editorOptions, {
      value: t.component.option("formData")[t.dataField],
      onEnterKey: t.component.option("onEditorEnterKey").bind(this.editorInstance._formDialog, t),
      onValueChanged: function (e) {
        i.keepAspectRatio(t, {
          dependentEditor: i[n + "Editor"],
          e: e
        });
      }
    }));
  };
  n.upload = function () {
    return this.editorInstance._formDialog._form.validate().isValid;
  };
  n.getItemsConfig = function () {
    var e = this;
    return [{
      dataField: "src",
      colSpan: 11,
      label: {
        text: o.default.format("dxHtmlEditor-dialogImageUrlField")
      },
      validationRules: [{
        type: "required"
      }, {
        type: "stringLength",
        min: 1
      }]
    }, {
      dataField: "width",
      colSpan: 6,
      label: {
        text: o.default.format("dxHtmlEditor-dialogImageWidthField")
      },
      template: function (t) {
        var n = (0, i.default)("<div>").addClass("dx-fix-ratio-container");
        var a = (0, i.default)("<div>").appendTo(n);
        e.widthEditor = e.createKeepAspectRatioEditor(a, t, "height");
        var r = (0, i.default)("<div>").appendTo(n);
        e.editorInstance._createComponent(r, d.default, {
          items: [{
            icon: "imgarlock",
            value: "keepRatio"
          }],
          hint: o.default.format("dxHtmlEditor-dialogImageKeepAspectRatio"),
          focusStateEnabled: false,
          keyExpr: "value",
          stylingMode: "outlined",
          selectionMode: "multiple",
          selectedItemKeys: ["keepRatio"],
          onSelectionChanged: function (t) {
            e.shouldKeepAspectRatio = !!t.component.option("selectedItems").length;
          }
        });
        return n;
      }
    }, {
      dataField: "height",
      colSpan: 5,
      label: {
        text: o.default.format("dxHtmlEditor-dialogImageHeightField")
      },
      template: function (t) {
        var n = (0, i.default)("<div>");
        e.heightEditor = e.createKeepAspectRatioEditor(n, t, "width");
        return n;
      }
    }, {
      dataField: "alt",
      colSpan: 11,
      label: {
        text: o.default.format("dxHtmlEditor-dialogImageAltField")
      }
    }];
  };
  return t;
}(k);
var I = function (e) {
  function t(t, n, i, o) {
    var a;
    (a = e.call(this, t, n, o) || this).formData = i;
    a.modifyFormData();
    return a;
  }
  g(t, e);
  var n = t.prototype;
  n.modifyFormData = function () {
    if (!this.quill.getFormat(this.selection.index - 1, 1).imageSrc || this.selection.index === 0) {
      this.selection = {
        index: this.selection.index + 1,
        length: 0
      };
      this.quill.setSelection(this.selection.index, this.selection.length, "silent");
    }
    var n = this.quill.getLeaf(this.selection.index)[0].domNode;
    if (n) {
      this.formData.width = this.formData.width ?? (0, s.getWidth)((0, i.default)(n));
      this.formData.height = this.formData.height ?? (0, s.getHeight)((0, i.default)(n));
    }
  };
  n.pasteImage = function (t, n) {
    this.quill.deleteText(this.embedFormatIndex(), 1, "silent");
    this.selection.index -= 1;
    e.prototype.pasteImage.call(this, t, n);
  };
  n.embedFormatIndex = function () {
    var t = this.selection ?? this.quill.getSelection();
    if (t) {
      if (t.length) {
        return t.index;
      } else {
        return t.index - 1;
      }
    } else {
      return this.quill.getLength();
    }
  };
  return t;
}(D);
var T = function (e) {
  function t(t, n, i) {
    var o;
    (o = e.call(this, t, n, i) || this).useBase64 = !(0, u.isDefined)(o.config.fileUploadMode) || o.config.fileUploadMode === "base64";
    o.isValidInternal = false;
    o.onFileSelected = i;
    o.data = null;
    return o;
  }
  g(t, e);
  var n = t.prototype;
  n.upload = function () {
    if (this.useBase64) {
      this.base64Upload(this.data);
    } else if (this.data.value.length) {
      this.data.component.upload();
    }
    return true;
  };
  n.isValid = function () {
    return this.isValidInternal;
  };
  n.onUploaded = function (e) {
    P(this.config.uploadDirectory, e.file.name, this.quill, this.selection.index);
  };
  n.base64Upload = function (e) {
    this.quill.getModule("uploader").upload(this.selection, e.value, true);
  };
  n.pasteImage = function (t, n) {
    if (this.useBase64) {
      e.prototype.pasteImage.call(this, t, n);
    }
  };
  n.isBase64Editable = function () {
    return this.config.fileUploadMode === "both";
  };
  n.validate = function (e) {
    var t = e.component;
    this.isValidInternal = !t._files.some(function (e) {
      return !e.isValid();
    });
    if (t._files.length === 0) {
      this.isValidInternal = false;
    }
  };
  n.getFileUploaderOptions = function () {
    var e = this;
    var t = {
      uploadUrl: this.config.uploadUrl,
      onValueChanged: function (t) {
        e.validate(t);
        e.data = t;
        e.onFileSelected();
      },
      onUploaded: function (t) {
        return e.onUploaded(t);
      }
    };
    return (0, r.extend)({}, O(), t, this.config.fileUploaderOptions);
  };
  n.getItemsConfig = function () {
    var e = this;
    return [{
      itemType: "simple",
      dataField: "files",
      colSpan: 11,
      label: {
        visible: false
      },
      template: function () {
        var t = (0, i.default)("<div>");
        e.module.editorInstance._createComponent(t, c.default, e.getFileUploaderOptions());
        return t;
      }
    }, {
      itemType: "simple",
      colSpan: 11,
      label: {
        visible: false
      },
      editorType: "dxCheckBox",
      editorOptions: {
        value: this.useBase64,
        visible: this.isBase64Editable(),
        text: o.default.format("dxHtmlEditor-dialogImageEncodeToBase64"),
        onValueChanged: function (t) {
          if (e.isBase64Editable()) {
            e.useBase64 = t.value;
          }
        }
      }
    }];
  };
  return t;
}(k);
function E(e) {
  if (e[e.length - 1] !== "/") {
    return e + "/";
  } else {
    return e;
  }
}
function O() {
  return {
    value: [],
    name: "dx-htmleditor-image",
    accept: "image/*",
    uploadMode: "useButtons"
  };
}
function A(e, t, n) {
  e.insertEmbed(t, "extendedImage", n, "user");
  e.setSelection(t + 1, 0, "user");
}
function P(e, t, n, i) {
  if (e) {
    A(n, i, {
      src: E(e) + t
    });
  }
}