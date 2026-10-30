function i(e) {
  return (i = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function (e) {
    return typeof e;
  } : function (e) {
    if (e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype) {
      return "symbol";
    } else {
      return typeof e;
    }
  })(e);
}
exports.default = undefined;
var o = g(require("./68374.js"));
var a = require("./13306.js");
var r = require("./62754.js");
var s = require("./95479.js");
var l = require("./68752.js");
var u = require("./35922.js");
var d = g(require("./28109.js"));
var c = g(require("./14390.js"));
var h = g(require("./87444.js"));
var f = g(require("./21089.js"));
var p = require("./17053.js");
function g(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
function m(e) {
  return function (e) {
    if (Array.isArray(e)) {
      return _(e);
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
      return _(e, t);
    }
    var n = Object.prototype.toString.call(e).slice(8, -1);
    if (n === "Object" && e.constructor) {
      n = e.constructor.name;
    }
    if (n === "Map" || n === "Set") {
      return Array.from(e);
    }
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) {
      return _(e, t);
    }
  }(e) || function () {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }();
}
function _(e, t) {
  if (t == null || t > e.length) {
    t = e.length;
  }
  for (var n = 0, i = new Array(t); n < t; n++) {
    i[n] = e[n];
  }
  return i;
}
function v(e, t) {
  for (var n = 0; n < t.length; n++) {
    var o = t[n];
    o.enumerable = o.enumerable || false;
    o.configurable = true;
    if ("value" in o) {
      o.writable = true;
    }
    Object.defineProperty(e, (a = o.key, r = undefined, r = function (e, t) {
      if (i(e) !== "object" || e === null) {
        return e;
      }
      var n = e[Symbol.toPrimitive];
      if (n !== undefined) {
        var o = n.call(e, t || "default");
        if (i(o) !== "object") {
          return o;
        }
        throw new TypeError("@@toPrimitive must return a primitive value.");
      }
      return (t === "string" ? String : Number)(e);
    }(a, "string"), i(r) === "symbol" ? r : String(r)), o);
  }
  var a;
  var r;
}
function y(e, t, n) {
  if (t) {
    v(e.prototype, t);
  }
  if (n) {
    v(e, n);
  }
  Object.defineProperty(e, "prototype", {
    writable: false
  });
  return e;
}
function b(e, t) {
  return (b = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (e, t) {
    e.__proto__ = t;
    return e;
  })(e, t);
}
var x = function (e) {
  var t;
  var n;
  function i() {
    return e.apply(this, arguments) || this;
  }
  n = e;
  (t = i).prototype = Object.create(n.prototype);
  t.prototype.constructor = t;
  b(t, n);
  var l = i.prototype;
  l._initMarkup = function () {
    e.prototype._initMarkup.call(this);
    this._initActions();
    this._controller = this.option("controller");
    this._controller.on("EditActionStarting", this._onEditActionStarting.bind(this));
    this._controller.on("EditActionResultAcquired", this._onEditActionResultAcquired.bind(this));
    this._controller.on("EditActionItemError", this._onEditActionItemError.bind(this));
    this._controller.on("EditActionError", this._onEditActionError.bind(this));
    this._controller.on("CompleteEditActionItem", this._onCompleteEditActionItem.bind(this));
    this._controller.on("CompleteEditAction", this._onCompleteEditAction.bind(this));
    this._model = this.option("model");
    this._uploadOperationInfoMap = {};
    this._dialogManager = new h.default(this.$element(), {
      chooseDirectoryDialog: {
        provider: this._controller._fileProvider,
        getDirectories: this._controller.getDirectories.bind(this._controller),
        getCurrentDirectory: this._controller.getCurrentDirectory.bind(this._controller)
      },
      rtlEnabled: this.option("rtlEnabled"),
      onDialogClosed: this._onDialogClosed.bind(this)
    });
    this._fileUploader = this._createFileUploader();
    var t = this.option("notificationControl");
    if (t) {
      this._initNotificationControl(t);
    }
    this._createMetadataMap();
  };
  l._initNotificationControl = function (e) {
    var t = this;
    this._notificationControl = e;
    this._notificationControl.option({
      onOperationCanceled: function (e) {
        var n = e.info;
        return t._onCancelUploadSession(n);
      },
      onOperationItemCanceled: function (e) {
        var n = e.item;
        var i = e.itemIndex;
        return t._onCancelFileUpload(n, i);
      }
    });
  };
  l._getFileUploaderComponent = function () {
    return f.default;
  };
  l._createFileUploader = function () {
    var e = this;
    var t = (0, o.default)("<div>").appendTo(this.$element());
    return this._createComponent(t, this._getFileUploaderComponent(), {
      getController: this._getFileUploaderController.bind(this),
      dropZonePlaceholderContainer: this.option("uploadDropZonePlaceholderContainer"),
      onUploadSessionStarted: function (t) {
        return e._onUploadSessionStarted(t);
      },
      onUploadProgress: function (t) {
        return e._onUploadProgress(t);
      },
      onUploadFinished: function (t) {
        return e._onUploadFinished(t);
      }
    });
  };
  l.setUploaderDropZone = function (e) {
    this._fileUploader.option("dropZone", e);
  };
  l.setUploaderSplitterElement = function (e) {
    this._fileUploader.option("splitterElement", e);
  };
  l._getFileUploaderController = function () {
    var e = this;
    var t = this.uploadDirectoryInfo.fileItem;
    return {
      chunkSize: this._controller.getFileUploadChunkSize(),
      uploadFileChunk: function (n, i) {
        return e._controller.uploadFileChunk(n, i, t);
      },
      abortFileUpload: function (n, i) {
        return e._controller.abortFileUpload(n, i, t);
      }
    };
  };
  l._createMetadataMap = function () {
    var e = this;
    this._metadataMap = {
      create: {
        action: function (t) {
          return e._tryCreate(t);
        },
        affectsAllItems: true,
        singleItemProcessingMessage: d.default.format("dxFileManager-editingCreateSingleItemProcessingMessage"),
        singleItemSuccessMessage: d.default.format("dxFileManager-editingCreateSingleItemSuccessMessage"),
        singleItemErrorMessage: d.default.format("dxFileManager-editingCreateSingleItemErrorMessage"),
        commonErrorMessage: d.default.format("dxFileManager-editingCreateCommonErrorMessage")
      },
      rename: {
        action: function (t) {
          return e._tryRename(t);
        },
        singleItemProcessingMessage: d.default.format("dxFileManager-editingRenameSingleItemProcessingMessage"),
        singleItemSuccessMessage: d.default.format("dxFileManager-editingRenameSingleItemSuccessMessage"),
        singleItemErrorMessage: d.default.format("dxFileManager-editingRenameSingleItemErrorMessage"),
        commonErrorMessage: d.default.format("dxFileManager-editingRenameCommonErrorMessage")
      },
      delete: {
        action: function (t) {
          return e._tryDelete(t);
        },
        singleItemProcessingMessage: d.default.format("dxFileManager-editingDeleteSingleItemProcessingMessage"),
        multipleItemsProcessingMessage: d.default.format("dxFileManager-editingDeleteMultipleItemsProcessingMessage"),
        singleItemSuccessMessage: d.default.format("dxFileManager-editingDeleteSingleItemSuccessMessage"),
        multipleItemsSuccessMessage: d.default.format("dxFileManager-editingDeleteMultipleItemsSuccessMessage"),
        singleItemErrorMessage: d.default.format("dxFileManager-editingDeleteSingleItemErrorMessage"),
        multipleItemsErrorMessage: d.default.format("dxFileManager-editingDeleteMultipleItemsErrorMessage"),
        commonErrorMessage: d.default.format("dxFileManager-editingDeleteCommonErrorMessage")
      },
      move: {
        action: function (t) {
          return e._tryMove(t);
        },
        singleItemProcessingMessage: d.default.format("dxFileManager-editingMoveSingleItemProcessingMessage"),
        multipleItemsProcessingMessage: d.default.format("dxFileManager-editingMoveMultipleItemsProcessingMessage"),
        singleItemSuccessMessage: d.default.format("dxFileManager-editingMoveSingleItemSuccessMessage"),
        multipleItemsSuccessMessage: d.default.format("dxFileManager-editingMoveMultipleItemsSuccessMessage"),
        singleItemErrorMessage: d.default.format("dxFileManager-editingMoveSingleItemErrorMessage"),
        multipleItemsErrorMessage: d.default.format("dxFileManager-editingMoveMultipleItemsErrorMessage"),
        commonErrorMessage: d.default.format("dxFileManager-editingMoveCommonErrorMessage")
      },
      copy: {
        action: function (t) {
          return e._tryCopy(t);
        },
        singleItemProcessingMessage: d.default.format("dxFileManager-editingCopySingleItemProcessingMessage"),
        multipleItemsProcessingMessage: d.default.format("dxFileManager-editingCopyMultipleItemsProcessingMessage"),
        singleItemSuccessMessage: d.default.format("dxFileManager-editingCopySingleItemSuccessMessage"),
        multipleItemsSuccessMessage: d.default.format("dxFileManager-editingCopyMultipleItemsSuccessMessage"),
        singleItemErrorMessage: d.default.format("dxFileManager-editingCopySingleItemErrorMessage"),
        multipleItemsErrorMessage: d.default.format("dxFileManager-editingCopyMultipleItemsErrorMessage"),
        commonErrorMessage: d.default.format("dxFileManager-editingCopyCommonErrorMessage")
      },
      upload: {
        action: function (t) {
          return e._tryUpload(t);
        },
        allowCancel: true,
        allowItemProgress: true,
        singleItemProcessingMessage: d.default.format("dxFileManager-editingUploadSingleItemProcessingMessage"),
        multipleItemsProcessingMessage: d.default.format("dxFileManager-editingUploadMultipleItemsProcessingMessage"),
        singleItemSuccessMessage: d.default.format("dxFileManager-editingUploadSingleItemSuccessMessage"),
        multipleItemsSuccessMessage: d.default.format("dxFileManager-editingUploadMultipleItemsSuccessMessage"),
        singleItemErrorMessage: d.default.format("dxFileManager-editingUploadSingleItemErrorMessage"),
        multipleItemsErrorMessage: d.default.format("dxFileManager-editingUploadMultipleItemsErrorMessage"),
        canceledMessage: d.default.format("dxFileManager-editingUploadCanceledMessage")
      },
      download: {
        action: function (t) {
          return e._download(t);
        },
        singleItemProcessingMessage: "",
        multipleItemsProcessingMessage: "",
        singleItemErrorMessage: d.default.format("dxFileManager-editingDownloadSingleItemErrorMessage"),
        multipleItemsErrorMessage: d.default.format("dxFileManager-editingDownloadMultipleItemsErrorMessage")
      },
      getItemContent: {
        action: function (t) {
          return e._getItemContent(t);
        }
      },
      getItems: {
        singleItemProcessingMessage: "",
        singleItemErrorMessage: d.default.format("dxFileManager-errorDirectoryOpenFailed"),
        commonErrorMessage: d.default.format("dxFileManager-errorDirectoryOpenFailed")
      }
    };
  };
  l.getCommandActions = function () {
    var e = this;
    var t = {};
    (0, s.each)(this._metadataMap, function (n) {
      if (Object.prototype.hasOwnProperty.call(e._metadataMap, n)) {
        t[n] = function (t) {
          return e._executeAction(n, t);
        };
      }
    });
    return t;
  };
  l._executeAction = function (e, t) {
    var n = this._metadataMap[e];
    if (n) {
      return n.action(t);
    } else {
      return null;
    }
  };
  l._onCancelUploadSession = function (e) {
    this._fileUploader.cancelUpload(e.uploadSessionId);
  };
  l._onCancelFileUpload = function (e, t) {
    this._fileUploader.cancelFileUpload(e.info.uploadSessionId, t);
  };
  l._onUploadProgress = function (e) {
    var t = e.sessionId;
    var n = e.fileIndex;
    var i = e.commonValue;
    var o = e.fileValue;
    var a = this._uploadOperationInfoMap[t].operationInfo;
    this._notificationControl.updateOperationItemProgress(a, n, o * 100, i * 100);
  };
  l._onUploadFinished = function (e) {
    var t = e.sessionId;
    var n = e.commonValue;
    var i = this._uploadOperationInfoMap[t].operationInfo;
    this._notificationControl.finishOperation(i, n * 100);
    this._scheduleUploadSessionDisposal(t, "uploader");
  };
  l._onUploadSessionStarted = function (e) {
    var t = e.sessionInfo;
    this._controller.processUploadSession(t, this.uploadDirectoryInfo);
  };
  l._onEditActionStarting = function (e) {
    var t = this._metadataMap[e.name];
    var n = new w(t, e.itemInfos, e.directory);
    var i = this._notificationControl.addOperation(n.processingMessage, t.allowCancel, !t.allowItemProgress);
    (0, a.extend)(e.customData, {
      context: n,
      operationInfo: i
    });
    switch (e.name) {
      case "upload":
        var o = e.customData.sessionInfo.sessionId;
        i.uploadSessionId = o;
        this._uploadOperationInfoMap[o] = {
          operationInfo: i
        };
        break;
      case "rename":
        e.customData.context.itemNewName = e.customData.itemNewName;
    }
  };
  l._onEditActionResultAcquired = function (e) {
    var t = this;
    var n = e.customData;
    var i = n.context;
    var o = n.operationInfo;
    i.singleRequest = e.singleRequest;
    var a = i.itemInfos.map(function (e) {
      return t._getItemProgressDisplayInfo(e);
    });
    this._notificationControl.addOperationDetails(o, a, i.actionMetadata.allowCancel);
  };
  l._onEditActionError = function (e, t) {
    var n = e.customData;
    var i = n.context;
    var o = n.operationInfo;
    i.singleRequest = e.singleRequest;
    this._handleActionError(o, i, t);
    this._completeAction(o, i);
  };
  l._onEditActionItemError = function (e, t) {
    var n = e.customData;
    var i = n.context;
    var o = n.operationInfo;
    this._handleActionError(o, i, t);
  };
  l._onCompleteEditActionItem = function (e, t) {
    var n = e.customData;
    var i = n.context;
    var o = n.operationInfo;
    if (!t.result || !t.result.canceled) {
      i.completeOperationItem(t.index);
      this._notificationControl.completeOperationItem(o, t.index, i.commonProgress);
    }
  };
  l._onCompleteEditAction = function (e) {
    var t = e.customData;
    var n = t.context;
    var i = t.operationInfo;
    this._completeAction(i, n);
    if (e.name === "upload") {
      this._scheduleUploadSessionDisposal(e.customData.sessionInfo.sessionId, "controller");
    }
  };
  l._scheduleUploadSessionDisposal = function (e, t) {
    if ((0, u.isDefined)(this._uploadOperationInfoMap[e].requester) && this._uploadOperationInfoMap[e].requester !== t) {
      delete this._uploadOperationInfoMap[e];
    } else {
      this._uploadOperationInfoMap[e].requester = t;
    }
  };
  l._tryCreate = function (e) {
    var t = this;
    var n = e && e[0] || this._getCurrentDirectory();
    var i = d.default.format("dxFileManager-newDirectoryName");
    return this._showDialog(this._dialogManager.getCreateItemDialog(), i).then(function (e) {
      var i = e.name;
      return t._controller.createDirectory(n, i);
    });
  };
  l._tryRename = function (e) {
    var t = this;
    var n = e && e[0] || this._model.getMultipleSelectedItems()[0];
    if (n) {
      return this._showDialog(this._dialogManager.getRenameItemDialog(), n.fileItem.name).then(function (e) {
        var i = e.name;
        return t._controller.renameItem(n, i);
      });
    } else {
      return new r.Deferred().reject().promise();
    }
  };
  l._tryDelete = function (e) {
    var t = this;
    if ((e = e || this._model.getMultipleSelectedItems()).length === 0) {
      return new r.Deferred().reject().promise();
    }
    var n = e[0].fileItem.name;
    var i = e.length;
    return this._showDialog(this._dialogManager.getDeleteItemDialog(), {
      itemName: n,
      itemCount: i
    }).then(function () {
      return t._controller.deleteItems(e);
    });
  };
  l._tryMove = function (e) {
    var t = this;
    if ((e = e || this._model.getMultipleSelectedItems()).length === 0) {
      return new r.Deferred().reject().promise();
    } else {
      return this._showDialog(this._dialogManager.getMoveDialog(e)).then(function (n) {
        var i = n.folder;
        return t._controller.moveItems(e, i);
      });
    }
  };
  l._tryCopy = function (e) {
    var t = this;
    if ((e = e || this._model.getMultipleSelectedItems()).length === 0) {
      return new r.Deferred().reject().promise();
    } else {
      return this._showDialog(this._dialogManager.getCopyDialog(e)).then(function (n) {
        var i = n.folder;
        return t._controller.copyItems(e, i);
      });
    }
  };
  l._tryUpload = function (e) {
    this._uploadDirectoryInfo = e == null ? undefined : e[0];
    this._fileUploader.tryUpload();
  };
  l._download = function (e) {
    if ((e = e || this._model.getMultipleSelectedItems()).length === 0) {
      return new r.Deferred().reject().promise();
    } else {
      return this._controller.downloadItems(e);
    }
  };
  l._getItemContent = function (e) {
    e = e || this._model.getMultipleSelectedItems();
    return this._controller.getItemContent(e);
  };
  l._completeAction = function (e, t) {
    this._notificationControl.completeOperation(e, t.completionMessage, !t.success, t.statusText);
    if (t.hasModifiedItems()) {
      this._raiseOnSuccess(t.onlyFiles);
    }
  };
  l._handleActionError = function (e, t, n) {
    e.hasError = true;
    if (t.singleRequest) {
      this._handleSingleRequestActionError(e, t, n);
    } else {
      this._handleMultipleRequestActionError(e, t, n);
    }
  };
  l._handleSingleRequestActionError = function (e, t, n) {
    var i = t.getItemForSingleRequestError();
    var o = t.getItemName(n.errorCode);
    var a = this._getErrorText(n, i, o);
    t.processSingleRequestError(a);
    var r = this._getOperationErrorInfo(t);
    this._notificationControl.completeSingleOperationWithError(e, r);
    if (t.multipleItems) {
      this._raiseOnSuccess(t.onlyFiles);
    }
  };
  l._handleMultipleRequestActionError = function (e, t, n) {
    var i = t.getItemForMultipleRequestError(n.index);
    var o = t.getItemName(n.errorCode, n.index);
    var a = this._getErrorText(n, i, o);
    t.processMultipleRequestError(n.index, a);
    var r = this._getOperationErrorInfo(t);
    this._notificationControl.addOperationDetailsError(e, r);
  };
  l._getOperationErrorInfo = function (e) {
    var t = e.errorState.currentDetailError;
    return {
      commonErrorText: e.errorState.commonErrorText,
      item: t.itemInfo ? this._getItemProgressDisplayInfo(t.itemInfo) : null,
      itemIndex: t.itemIndex,
      detailErrorText: t.errorText
    };
  };
  l._getErrorText = function (e, t, n) {
    var i = e.errorText || p.FileManagerMessages.get(e.errorCode, n);
    var o = {
      fileSystemItem: t == null ? undefined : t.fileItem,
      errorCode: e.errorCode,
      errorText: i
    };
    this._raiseOnError(o);
    return o.errorText;
  };
  l._getItemProgressDisplayInfo = function (e) {
    return {
      commonText: e.fileItem.name,
      imageUrl: this._getItemThumbnail(e)
    };
  };
  l._showDialog = function (e, t) {
    this._dialogDeferred = new r.Deferred();
    e.show(t);
    return this._dialogDeferred.promise();
  };
  l._onDialogClosed = function (e) {
    var t = e.dialogResult;
    if (t) {
      this._dialogDeferred.resolve(t);
    } else {
      this._dialogDeferred.reject();
    }
  };
  l.updateDialogRtl = function (e) {
    this._dialogManager.updateDialogRtl(e);
  };
  l._getItemThumbnail = function (e) {
    var t = this.option("getItemThumbnail");
    if (!t) {
      return null;
    }
    var n = t(e);
    if (n) {
      return n.thumbnail;
    } else {
      return null;
    }
  };
  l._initActions = function () {
    this._actions = {
      onSuccess: this._createActionByOption("onSuccess"),
      onError: this._createActionByOption("onError")
    };
  };
  l._getDefaultOptions = function () {
    return (0, a.extend)(e.prototype._getDefaultOptions.call(this), {
      model: {
        getMultipleSelectedItems: null
      },
      notificationControl: null,
      getItemThumbnail: null,
      onSuccess: null,
      onError: null
    });
  };
  l._optionChanged = function (t) {
    var n = t.name;
    switch (n) {
      case "model":
        this.repaint();
        break;
      case "notificationControl":
        this._initNotificationControl(t.value);
        break;
      case "getItemThumbnail":
        break;
      case "uploadDropZonePlaceholderContainer":
        this._fileUploader.option("dropZonePlaceholderContainer", t.value);
        break;
      case "onSuccess":
      case "onError":
        this._actions[n] = this._createActionByOption(n);
        break;
      default:
        e.prototype._optionChanged.call(this, t);
    }
  };
  l._raiseOnSuccess = function (e) {
    this._actions.onSuccess({
      updatedOnlyFiles: e
    });
  };
  l._raiseOnError = function (e) {
    this._actions.onError(e);
  };
  l._getCurrentDirectory = function () {
    return this._controller.getCurrentDirectory();
  };
  y(i, [{
    key: "uploadDirectoryInfo",
    get: function () {
      return this._uploadDirectoryInfo || this._getCurrentDirectory();
    }
  }]);
  return i;
}(c.default);
var w = function () {
  function e(e, t, n) {
    this._actionMetadata = e;
    this._itemInfos = t;
    this._onlyFiles = !this._actionMetadata.affectsAllItems && this._itemInfos.every(function (e) {
      return !e.fileItem.isDirectory;
    });
    this._items = this._itemInfos.map(function (e) {
      return e.fileItem;
    });
    this._multipleItems = this._items.length > 1;
    this._location = n.getDisplayName();
    this._singleRequest = true;
    this._completedItems = [];
    this._commonProgress = 0;
    this._errorState = {
      failedCount: 0
    };
    this._itemNewName = "";
  }
  var t = e.prototype;
  t.completeOperationItem = function (e) {
    if (this._singleRequest) {
      this._completedItems = m(this._items);
    } else {
      var t = this._items[e];
      this._completedItems.push(t);
    }
    if (!this._actionMetadata.allowItemProgress) {
      this._commonProgress = this._completedItems.length / this._items.length * 100;
    }
  };
  t.processSingleRequestError = function (e) {
    this._errorState.failedCount = 1;
    this._errorState.commonErrorText = this._multipleItems ? this._actionMetadata.commonErrorMessage : this._actionMetadata.singleItemErrorMessage;
    var t = this._multipleItems ? -1 : 1;
    var n = this.getItemForSingleRequestError();
    this._setCurrentDetailError(t, n, e);
  };
  t.processMultipleRequestError = function (e, t) {
    this._errorState.failedCount++;
    this._errorState.commonErrorText = this._errorState.failedCount > 1 ? (0, l.format)(this._actionMetadata.multipleItemsErrorMessage, this._errorState.failedCount) : this._actionMetadata.singleItemErrorMessage;
    var n = this.getItemForMultipleRequestError(e);
    this._setCurrentDetailError(e, n, t);
  };
  t.hasModifiedItems = function () {
    return this._hasCompletedItems() || this._singleRequest && !this.success && this._multipleItems;
  };
  t.getItemForSingleRequestError = function () {
    if (this._multipleItems) {
      return null;
    } else {
      return this._itemInfos[0];
    }
  };
  t.getItemForMultipleRequestError = function (e) {
    return this._itemInfos[e];
  };
  t.getItemName = function (e, t) {
    var n = this.singleRequest ? this.getItemForSingleRequestError() : this.getItemForMultipleRequestError(t);
    var i = n == null ? undefined : n.fileItem.name;
    if (this.itemNewName && this._isItemExistsErrorCode(e)) {
      i = this.itemNewName;
    }
    return i;
  };
  t._isItemExistsErrorCode = function (e) {
    return e === p.ErrorCode.DirectoryExists || e === p.ErrorCode.FileExists;
  };
  t._setCurrentDetailError = function (e, t, n) {
    this._errorState.currentDetailError = {
      itemIndex: e,
      itemInfo: t,
      errorText: n
    };
  };
  t._hasCompletedItems = function () {
    return this._completedItems.length > 0;
  };
  y(e, [{
    key: "actionMetadata",
    get: function () {
      return this._actionMetadata;
    }
  }, {
    key: "itemInfos",
    get: function () {
      return this._itemInfos;
    }
  }, {
    key: "itemNewName",
    get: function () {
      return this._itemNewName;
    },
    set: function (e) {
      this._itemNewName = e;
    }
  }, {
    key: "errorState",
    get: function () {
      return this._errorState;
    }
  }, {
    key: "singleRequest",
    get: function () {
      return this._singleRequest;
    },
    set: function (e) {
      this._singleRequest = e;
    }
  }, {
    key: "multipleItems",
    get: function () {
      return this._multipleItems;
    }
  }, {
    key: "onlyFiles",
    get: function () {
      return this._onlyFiles;
    }
  }, {
    key: "processingMessage",
    get: function () {
      if (this._multipleItems) {
        return (0, l.format)(this._actionMetadata.multipleItemsProcessingMessage, this._items.length, this._location);
      } else {
        return (0, l.format)(this._actionMetadata.singleItemProcessingMessage, this._location);
      }
    }
  }, {
    key: "successMessage",
    get: function () {
      if (this._hasCompletedItems()) {
        if (this._multipleItems) {
          return (0, l.format)(this._actionMetadata.multipleItemsSuccessMessage, this._completedItems.length, this._location);
        } else {
          return (0, l.format)(this._actionMetadata.singleItemSuccessMessage, this._location);
        }
      } else if (this._multipleItems) {
        return (0, l.format)(this._actionMetadata.multipleItemsErrorMessage, this._items.length);
      } else {
        return this._actionMetadata.singleItemErrorMessage;
      }
    }
  }, {
    key: "completionMessage",
    get: function () {
      if (this.success) {
        return this.successMessage;
      } else {
        return this.errorState.commonErrorText;
      }
    }
  }, {
    key: "statusText",
    get: function () {
      if (this.success && !this._hasCompletedItems()) {
        return this._actionMetadata.canceledMessage;
      } else {
        return undefined;
      }
    }
  }, {
    key: "commonProgress",
    get: function () {
      return this._commonProgress;
    }
  }, {
    key: "success",
    get: function () {
      return !this._errorState.failedCount;
    }
  }]);
  return e;
}();
var C = x;
exports.default = C;
module.exports = exports.default;
module.exports.default = exports.default;