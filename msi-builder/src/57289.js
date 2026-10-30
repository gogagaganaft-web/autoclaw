exports.OPERATIONS = exports.FileItemsController = undefined;
var i = _(require("./19073.js"));
var o = _(require("./45765.js"));
var a = _(require("./4323.js"));
var r = _(require("./41332.js"));
var s = _(require("./98831.js"));
var l = _(require("./49816.js"));
var u = _(require("./41011.js"));
var d = require("./73173.js");
var c = require("./75084.js");
var h = require("./62754.js");
var f = require("./13306.js");
var p = require("./20576.js");
var g = require("./35922.js");
var m = _(require("./73176.js"));
function _(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
function v(e) {
  return (v = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function (e) {
    return typeof e;
  } : function (e) {
    if (e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype) {
      return "symbol";
    } else {
      return typeof e;
    }
  })(e);
}
function y(e) {
  return function (e) {
    if (Array.isArray(e)) {
      return b(e);
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
      return b(e, t);
    }
    var n = Object.prototype.toString.call(e).slice(8, -1);
    if (n === "Object" && e.constructor) {
      n = e.constructor.name;
    }
    if (n === "Map" || n === "Set") {
      return Array.from(e);
    }
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) {
      return b(e, t);
    }
  }(e) || function () {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }();
}
function b(e, t) {
  if (t == null || t > e.length) {
    t = e.length;
  }
  for (var n = 0, i = new Array(t); n < t; n++) {
    i[n] = e[n];
  }
  return i;
}
function x(e, t) {
  for (var n = 0; n < t.length; n++) {
    var i = t[n];
    i.enumerable = i.enumerable || false;
    i.configurable = true;
    if ("value" in i) {
      i.writable = true;
    }
    Object.defineProperty(e, (o = i.key, a = undefined, a = function (e, t) {
      if (v(e) !== "object" || e === null) {
        return e;
      }
      var n = e[Symbol.toPrimitive];
      if (n !== undefined) {
        var i = n.call(e, t || "default");
        if (v(i) !== "object") {
          return i;
        }
        throw new TypeError("@@toPrimitive must return a primitive value.");
      }
      return (t === "string" ? String : Number)(e);
    }(o, "string"), v(a) === "symbol" ? a : String(a)), i);
  }
  var o;
  var a;
}
function w(e, t, n) {
  if (t) {
    x(e.prototype, t);
  }
  if (n) {
    x(e, n);
  }
  Object.defineProperty(e, "prototype", {
    writable: false
  });
  return e;
}
var C = {
  NAVIGATION: "navigation",
  REFRESH: "refresh"
};
exports.OPERATIONS = C;
var S = function () {
  function e(e) {
    e = e || {};
    this._options = (0, f.extend)({}, e);
    this._isInitialized = false;
    this._dataLoading = false;
    this._dataLoadingDeferred = null;
    this._rootDirectoryInfo = this._createRootDirectoryInfo(e.rootText);
    this._currentDirectoryInfo = this._rootDirectoryInfo;
    this._defaultIconMap = this._createDefaultIconMap();
    this.startSingleLoad();
    this._setSecurityController();
    this._setProvider(e.fileProvider);
    this._initialize();
  }
  var t = e.prototype;
  t._initialize = function () {
    var e = this;
    var t = this._options.currentPathKeys && this._options.currentPathKeys.length ? this.setCurrentPathByKeys(this._options.currentPathKeys) : this.setCurrentPath(this._options.currentPath);
    function n() {
      e._isInitialized = true;
      e._raiseInitialized();
    }
    if (t) {
      (0, h.when)(t).always(n);
    } else {
      n();
    }
  };
  t._setSecurityController = function () {
    this._securityController = new k({
      allowedFileExtensions: this._options.allowedFileExtensions,
      maxFileSize: this._options.uploadMaxFileSize
    });
    this._resetState();
  };
  t.setAllowedFileExtensions = function (e) {
    if ((0, g.isDefined)(e)) {
      this._options.allowedFileExtensions = e;
    }
    this._setSecurityController();
    this.refresh();
  };
  t.setUploadOptions = function (e) {
    var t = e.maxFileSize;
    var n = e.chunkSize;
    if ((0, g.isDefined)(n)) {
      this._options.uploadChunkSize = n;
    }
    if ((0, g.isDefined)(t)) {
      this._options.uploadMaxFileSize = t;
      this._setSecurityController();
      this.refresh();
    }
  };
  t._setProvider = function (e) {
    this._fileProvider = this._createFileProvider(e);
    this._resetState();
  };
  t.updateProvider = function (e, t) {
    var n = this;
    if ((0, g.isDefined)(t)) {
      return (0, h.when)(this._getDirectoryByPathParts(this._rootDirectoryInfo, t, true)).then(function (t) {
        if (t !== n._rootDirectoryInfo) {
          n._resetCurrentDirectory();
        }
        n._setProvider(e);
      }).then(function () {
        return n.setCurrentPathByKeys(t);
      });
    } else {
      return this._updateProviderOnly(e);
    }
  };
  t._updateProviderOnly = function (e) {
    this._resetCurrentDirectory();
    this._setProvider(e);
    return (0, h.when)(this.refresh());
  };
  t._createFileProvider = function (e) {
    e ||= [];
    if (Array.isArray(e)) {
      return new a.default({
        data: e
      });
    }
    if (e instanceof i.default) {
      return e;
    }
    switch (e.type) {
      case "remote":
        return new r.default(e);
      case "custom":
        return new s.default(e);
    }
    return new a.default(e);
  };
  t.setCurrentPath = function (e) {
    var t = (0, d.getPathParts)(e);
    var n = d.pathCombine.apply(undefined, y(t));
    if (this.getCurrentDirectory().fileItem.relativeName === n) {
      return new h.Deferred().resolve().promise();
    } else {
      return this._setCurrentDirectoryByPathParts(t);
    }
  };
  t.setCurrentPathByKeys = function (e) {
    if ((0, p.equalByValue)(this.getCurrentDirectory().fileItem.pathKeys, e)) {
      return new h.Deferred().resolve().promise();
    } else {
      return this._setCurrentDirectoryByPathParts(e, true);
    }
  };
  t.getCurrentPath = function () {
    var e = "";
    for (var t = this.getCurrentDirectory(); t && !t.fileItem.isRoot();) {
      var n = (0, d.getEscapedFileName)(t.fileItem.name);
      e = (0, d.pathCombine)(n, e);
      t = t.parentDirectory;
    }
    return e;
  };
  t.getCurrentPathKeys = function () {
    return this.getCurrentDirectory().fileItem.pathKeys;
  };
  t.getCurrentDirectory = function () {
    return this._currentDirectoryInfo;
  };
  t.setCurrentDirectory = function (e, t) {
    if (e) {
      if (t) {
        e = this._getActualDirectoryInfo(e);
      }
      if (this._currentDirectoryInfo && this._currentDirectoryInfo === e) {
        this._raisePathPotentiallyChanged();
      } else {
        var n = this._currentDirectoryInfo.fileItem.key !== e.fileItem.key;
        this._currentDirectoryInfo = e;
        if (n && this._isInitialized) {
          if (!this._dataLoading) {
            this._raiseDataLoading(C.NAVIGATION);
          }
          this._raiseSelectedDirectoryChanged(e);
        }
      }
    }
  };
  t._resetCurrentDirectory = function () {
    this._currentDirectoryInfo = this._rootDirectoryInfo;
  };
  t.getCurrentItems = function (e) {
    var t = this;
    if (this._dataLoadingDeferred) {
      return this._dataLoadingDeferred.then(function () {
        return t._getCurrentItemsInternal(e);
      });
    } else {
      return this._getCurrentItemsInternal(e);
    }
  };
  t._getCurrentItemsInternal = function (e) {
    var t = this;
    var n = this.getCurrentDirectory();
    return this.getDirectoryContents(n).then(function (i) {
      var o = t._separateItemsByType(i);
      n.fileItem.hasSubDirectories = !!o.folders.length;
      if (e) {
        return o.files;
      } else {
        return i;
      }
    });
  };
  t.getDirectories = function (e, t) {
    return this.getDirectoryContents(e, t).then(function (e) {
      return e.filter(function (e) {
        return e.fileItem.isDirectory;
      });
    });
  };
  t._separateItemsByType = function (e) {
    var t = [];
    var n = [];
    e.forEach(function (e) {
      if (e.fileItem.isDirectory) {
        return t.push(e);
      } else {
        return n.push(e);
      }
    });
    return {
      folders: t,
      files: n
    };
  };
  t.getDirectoryContents = function (e, t) {
    var n = this;
    if (!e) {
      return new h.Deferred().resolve([this._rootDirectoryInfo]).promise();
    }
    if (e.itemsLoaded) {
      return new h.Deferred().resolve(e.items).promise();
    }
    if (this._singleOperationLockId && e.itemsSingleLoadErrorId === this._singleOperationLockId) {
      this._changeDirectoryOnError(e, t, true);
      return new h.Deferred().reject().promise();
    }
    var i = e.getInternalKey();
    var o = this._loadedItems[i];
    return o || (o = this._getFileItems(e, t).then(function (t) {
      t = t || [];
      e.items = t.map(function (t) {
        return t.isDirectory && n._createDirectoryInfo(t, e) || n._createFileInfo(t, e);
      });
      e.itemsLoaded = true;
      return e.items;
    }, function () {
      if (n._singleOperationLockId && e.itemsSingleLoadErrorId !== n._singleOperationLockId) {
        e.itemsSingleLoadErrorId = n._singleOperationLockId;
      }
      return [];
    }), this._loadedItems[i] = o, o.always(function () {
      delete n._loadedItems[i];
    }), o);
  };
  t._getFileItems = function (e, t) {
    var n = this;
    var i = null;
    try {
      i = this._fileProvider.getItems(e.fileItem);
    } catch (n) {
      return this._handleItemLoadError(e, n, t);
    }
    return (0, h.when)(i).then(function (e) {
      return n._securityController.getAllowedItems(e);
    }, function (i) {
      return n._handleItemLoadError(e, i, t);
    });
  };
  t.createDirectory = function (e, t) {
    var n = this;
    var i = e.fileItem;
    var o = this._createDirInfoByName(t, e);
    var a = this._createEditActionInfo("create", o, e);
    return this._processEditAction(a, function (e) {
      e.parentDirectory = i;
      e.name = t;
      n._editingEvents.onDirectoryCreating(e);
    }, function () {
      return n._fileProvider.createDirectory(i, t).done(function (e) {
        if (!i.isRoot()) {
          i.hasSubDirectories = true;
        }
        return e;
      });
    }, function () {
      var e = {
        parentDirectory: i,
        name: t
      };
      n._editingEvents.onDirectoryCreated(e);
    }, function () {
      return n._resetDirectoryState(e, true);
    });
  };
  t.renameItem = function (e, t) {
    var n = this;
    var i = e.fileItem.createClone();
    var o = this._createEditActionInfo("rename", e, e.parentDirectory, {
      itemNewName: t
    });
    return this._processEditAction(o, function (e, o) {
      if (!o.fileItem.isDirectory) {
        n._securityController.validateExtension(t);
      }
      e.item = i;
      e.newName = t;
      n._editingEvents.onItemRenaming(e);
    }, function (e) {
      return n._fileProvider.renameItem(e, t);
    }, function () {
      var e = {
        sourceItem: i,
        itemName: t
      };
      n._editingEvents.onItemRenamed(e);
    }, function () {
      var t = n._getActualDirectoryInfo(e.parentDirectory);
      n._resetDirectoryState(t);
      n.setCurrentDirectory(t);
    });
  };
  t.moveItems = function (e, t) {
    var n = this;
    var i = this._createEditActionInfo("move", e, t);
    return this._processEditAction(i, function (e, i) {
      e.item = i.fileItem;
      e.destinationDirectory = t.fileItem;
      n._editingEvents.onItemMoving(e);
    }, function (e) {
      return n._fileProvider.moveItems([e], t.fileItem);
    }, function (e) {
      var i = {
        sourceItem: e.fileItem,
        parentDirectory: t.fileItem,
        itemName: e.fileItem.name,
        itemPath: (0, d.pathCombine)(t.fileItem.path, e.fileItem.name)
      };
      n._editingEvents.onItemMoved(i);
    }, function (i) {
      e.forEach(function (e) {
        return n._resetDirectoryState(e.parentDirectory, true);
      });
      if (i) {
        n._resetDirectoryState(t);
        n.setCurrentPathByKeys(t.fileItem.pathKeys);
        t.expanded = true;
      }
    });
  };
  t.copyItems = function (e, t) {
    var n = this;
    var i = this._createEditActionInfo("copy", e, t);
    return this._processEditAction(i, function (e, i) {
      e.item = i.fileItem;
      e.destinationDirectory = t.fileItem;
      n._editingEvents.onItemCopying(e);
    }, function (e) {
      return n._fileProvider.copyItems([e], t.fileItem);
    }, function (e) {
      var i = {
        sourceItem: e.fileItem,
        parentDirectory: t.fileItem,
        itemName: e.fileItem.name,
        itemPath: (0, d.pathCombine)(t.fileItem.path, e.fileItem.name)
      };
      n._editingEvents.onItemCopied(i);
    }, function (e) {
      if (e) {
        t = n._getActualDirectoryInfo(t);
        n._resetDirectoryState(t);
        n.setCurrentDirectory(t);
        t.expanded = true;
      }
    });
  };
  t.deleteItems = function (e) {
    var t = this;
    var n = e.length > 0 ? e[0].parentDirectory : null;
    var i = this._createEditActionInfo("delete", e, n);
    return this._processEditAction(i, function (e, n) {
      e.item = n.fileItem;
      t._editingEvents.onItemDeleting(e);
    }, function (e) {
      return t._fileProvider.deleteItems([e]);
    }, function (e) {
      return t._editingEvents.onItemDeleted({
        item: e.fileItem
      });
    }, function () {
      e.forEach(function (e) {
        var n = t._getActualDirectoryInfo(e.parentDirectory);
        t._resetDirectoryState(n);
        t.setCurrentDirectory(n);
      });
    });
  };
  t.processUploadSession = function (e, t) {
    var n = this;
    var i = this._getItemInfosForUploaderFiles(e.files, t);
    var o = this._createEditActionInfo("upload", i, t, {
      sessionInfo: e
    });
    return this._processEditAction(o, function () {}, function (t, n) {
      return e.deferreds[n];
    }, function () {}, function () {
      return n._resetDirectoryState(t, true);
    });
  };
  t.uploadFileChunk = function (e, t, n) {
    var i = this;
    var o = null;
    if (t.chunkIndex === 0) {
      this._securityController.validateMaxFileSize(e.size);
      this._securityController.validateExtension(e.name);
      o = this._processBeforeItemEditAction(function (t) {
        t.fileData = e;
        t.destinationDirectory = n;
        i._editingEvents.onFileUploading(t);
      });
    } else {
      o = new h.Deferred().resolve().promise();
    }
    var a = o.then(function () {
      return i._fileProvider.uploadFileChunk(e, t, n);
    });
    if (t.chunkIndex === t.chunkCount - 1) {
      a = a.done(function () {
        var t = {
          fileData: e,
          parentDirectory: n
        };
        i._editingEvents.onFileUploaded(t);
      });
    }
    return a;
  };
  t.abortFileUpload = function (e, t, n) {
    return (0, h.when)(this._fileProvider.abortFileUpload(e, t, n));
  };
  t.getFileUploadChunkSize = function () {
    var e = this._options.uploadChunkSize;
    if (e && e > 0) {
      return e;
    } else {
      return this._fileProvider.getFileUploadChunkSize();
    }
  };
  t.downloadItems = function (e) {
    var t = this;
    var n = e.map(function (e) {
      return t._processBeforeItemEditAction(function (n) {
        n.item = e.fileItem;
        t._editingEvents.onItemDownloading(n);
      }, e);
    });
    return h.when.apply(undefined, y(n)).then(function () {
      var n = e.map(function (e) {
        return e.fileItem;
      });
      return (0, h.when)(t._getItemActionResult(t._fileProvider.downloadItems(n))).then(function () {}, function (n) {
        t._raiseDownloadItemsError(e, e[0].parentDirectory, n);
      });
    }, function (n) {
      t._raiseDownloadItemsError(e, e[0].parentDirectory, n);
    });
  };
  t.getItemContent = function (e) {
    var t = e.map(function (e) {
      return e.fileItem;
    });
    return (0, h.when)(this._fileProvider.getItemsContent(t));
  };
  t._handleItemLoadError = function (e, t, n) {
    e = this._getActualDirectoryInfo(e);
    this._raiseGetItemsError(e, t);
    this._changeDirectoryOnError(e, n);
    return new h.Deferred().reject().promise();
  };
  t._raiseGetItemsError = function (e, t) {
    var n = this._createEditActionInfo("getItems", e, e);
    this._raiseEditActionStarting(n);
    this._raiseEditActionResultAcquired(n);
    this._raiseEditActionError(n, {
      errorCode: t.errorCode,
      errorText: t.errorText,
      fileItem: e.fileItem,
      index: 0
    });
  };
  t._raiseDownloadItemsError = function (e, t, n) {
    var i = this._createEditActionInfo("download", e, t);
    var o = e.length;
    i.singleRequest = o === 1;
    this._raiseEditActionStarting(i);
    this._raiseEditActionResultAcquired(i);
    for (var a = 0; a < o - 1; a++) {
      this._raiseEditActionItemError(i, {
        errorCode: n.errorCode,
        errorText: n.errorText,
        fileItem: e[a].fileItem,
        index: a
      });
    }
    this._raiseEditActionError(i, {
      errorCode: n.errorCode,
      errorText: n.errorText,
      fileItem: e[o - 1].fileItem,
      index: o - 1
    });
  };
  t._changeDirectoryOnError = function (e, t, n) {
    if (n) {
      e = this._getActualDirectoryInfo(e);
    }
    this._resetDirectoryState(e);
    e.expanded = false;
    if (!t) {
      this.setCurrentDirectory(e.parentDirectory);
    }
  };
  t._getItemActionResult = function (e) {
    if (Array.isArray(e)) {
      return e[0];
    } else {
      return e;
    }
  };
  t._processEditAction = function (e, t, n, i, o) {
    var a = this;
    var r = false;
    this._raiseEditActionStarting(e);
    var s = e.itemInfos.map(function (e, o) {
      return a._processBeforeItemEditAction(t, e).then(function () {
        return a._getItemActionResult(n(e.fileItem, o)).done(function () {
          return i(e);
        });
      });
    });
    e.singleRequest = s.length === 1;
    this._raiseEditActionResultAcquired(e);
    return (0, c.whenSome)(s, function (t) {
      r = true;
      a._raiseCompleteEditActionItem(e, t);
    }, function (t) {
      return a._raiseEditActionItemError(e, t);
    }).then(function () {
      o(r);
      a._raiseCompleteEditAction(e);
    });
  };
  t._createEditActionInfo = function (e, t, n, i) {
    i = i || {};
    var o = (t = Array.isArray(t) ? t : [t]).map(function (e) {
      return e.fileItem;
    });
    return {
      name: e,
      itemInfos: t,
      items: o,
      directory: n,
      customData: i,
      singleRequest: true
    };
  };
  t._processBeforeItemEditAction = function (e, t) {
    var n = new h.Deferred();
    var i = this._createBeforeActionArgs();
    try {
      e(i, t);
    } catch (e) {
      return n.reject(e).promise();
    }
    if (i.cancel) {
      if (i.cancel === true) {
        return n.reject({
          errorText: i.errorText,
          errorCode: i.errorCode
        });
      }
      if ((0, g.isPromise)(i.cancel)) {
        (0, h.when)(i.cancel).then(function (e) {
          if (e === true) {
            n.reject();
          } else if ((0, g.isObject)(e) && e.cancel === true) {
            n.reject({
              errorText: e.errorText,
              errorCode: e.errorCode
            });
          }
          n.resolve();
        }, n.resolve);
      }
    } else {
      n.resolve();
    }
    return n.promise();
  };
  t._createBeforeActionArgs = function () {
    return {
      errorCode: undefined,
      errorText: "",
      cancel: false
    };
  };
  t._getItemInfosForUploaderFiles = function (e, t) {
    var n = this._getPathInfo(t);
    var i = [];
    for (var a = 0; a < e.length; a++) {
      var r = e[a];
      var s = new o.default(n, r.name, false);
      var l = this._createFileInfo(s, t);
      i.push(l);
    }
    return i;
  };
  t.refresh = function () {
    var e = this;
    if (this._lockRefresh) {
      return this._refreshDeferred;
    } else {
      this._lockRefresh = true;
      return this._executeDataLoad(function () {
        return e._refreshDeferred = e._refreshInternal();
      }, C.REFRESH);
    }
  };
  t.startSingleLoad = function () {
    this._singleOperationLockId = new m.default().toString();
  };
  t.endSingleLoad = function () {
    delete this._singleOperationLockId;
  };
  t._refreshInternal = function () {
    var e = this;
    var t = {
      items: this._rootDirectoryInfo.items
    };
    var n = this._getDirectoryPathKeyParts(this.getCurrentDirectory());
    this._resetDirectoryState(this._rootDirectoryInfo);
    return this._loadItemsRecursive(this._rootDirectoryInfo, t).then(function () {
      var t = e._findDirectoryByPathKeyParts(n);
      e.setCurrentDirectory(t);
      delete e._lockRefresh;
    });
  };
  t._loadItemsRecursive = function (e, t) {
    var n = this;
    return this.getDirectories(e).then(function (e) {
      var i = [];
      var o = function (o) {
        var a = t.items.find(function (t) {
          return e[o].fileItem.key === t.fileItem.key;
        });
        if (!a) {
          return "continue";
        }
        e[o].expanded = a.expanded;
        if (e[o].expanded) {
          i.push(n._loadItemsRecursive(e[o], a));
        }
      };
      for (var a = 0; a < e.length; a++) {
        o(a);
      }
      return (0, c.whenSome)(i);
    }, function () {
      return null;
    });
  };
  t._setCurrentDirectoryByPathParts = function (e, t) {
    var n = this;
    return this._executeDataLoad(function () {
      return n._setCurrentDirectoryByPathPartsInternal(e, t);
    }, C.NAVIGATION);
  };
  t._setCurrentDirectoryByPathPartsInternal = function (e, t) {
    var n = this;
    return this._getDirectoryByPathParts(this._rootDirectoryInfo, e, t).then(function (e) {
      for (var t = e.parentDirectory; t; t = t.parentDirectory) {
        t.expanded = true;
      }
      n.setCurrentDirectory(e);
    }, function () {
      n._raisePathPotentiallyChanged();
    });
  };
  t._executeDataLoad = function (e, t) {
    var n = this;
    if (this._dataLoadingDeferred) {
      return this._dataLoadingDeferred.then(function () {
        return n._executeDataLoad(e, t);
      });
    } else {
      this._dataLoading = true;
      this._dataLoadingDeferred = new h.Deferred();
      if (this._isInitialized) {
        this._raiseDataLoading(t);
      }
      return e().always(function () {
        var e = n._dataLoadingDeferred;
        n._dataLoadingDeferred = null;
        n._dataLoading = false;
        e.resolve();
      });
    }
  };
  t._getDirectoryByPathParts = function (e, t, n) {
    var i = this;
    if (t.length < 1) {
      return new h.Deferred().resolve(e).promise();
    }
    var o = n ? "key" : "name";
    return this.getDirectories(e).then(function (e) {
      var a = e.find(function (e) {
        return e.fileItem[o] === t[0];
      });
      if (!a) {
        return new h.Deferred().reject().promise();
      }
      var r = y(t).splice(1);
      return i._getDirectoryByPathParts(a, r, n);
    });
  };
  t._getDirectoryPathKeyParts = function (e) {
    var t = [];
    while (e && e.parentDirectory) {
      t.unshift(e.fileItem.key);
      e = e.parentDirectory;
    }
    return t;
  };
  t._findDirectoryByPathKeyParts = function (e) {
    var t = this._rootDirectoryInfo;
    if (e.length === 0) {
      return t;
    }
    for (var n = 0, i = t; i && n < e.length;) {
      if (i = t.items.find(function (t) {
        return t.fileItem.key === e[n];
      })) {
        t = i;
      }
      n++;
    }
    return t;
  };
  t._getActualDirectoryInfo = function (e) {
    var t = this._getDirectoryPathKeyParts(e);
    return this._findDirectoryByPathKeyParts(t);
  };
  t._createDirInfoByName = function (e, t) {
    var n = this._getPathInfo(t);
    var i = new o.default(n, e, true);
    return this._createDirectoryInfo(i, t);
  };
  t._createDirectoryInfo = function (e, t) {
    return (0, f.extend)(this._createFileInfo(e, t), {
      icon: "folder",
      expanded: e.isRoot(),
      items: []
    });
  };
  t._createFileInfo = function (e, t) {
    return {
      fileItem: e,
      parentDirectory: t,
      icon: this._getFileItemDefaultIcon(e),
      getInternalKey: function () {
        return `FIK_${this.fileItem.key}`;
      },
      getDisplayName: function () {
        return this.displayName || this.fileItem.name;
      }
    };
  };
  t._resetDirectoryState = function (e, t) {
    if (t) {
      e = this._getActualDirectoryInfo(e);
    }
    e.itemsLoaded = false;
    e.items = [];
  };
  t._getFileItemDefaultIcon = function (e) {
    if (e.isDirectory) {
      return "folder";
    }
    var t = e.getFileExtension();
    return this._defaultIconMap[t] || "doc";
  };
  t._createDefaultIconMap = function () {
    var e = {
      ".txt": "txtfile",
      ".rtf": "rtffile",
      ".doc": "docfile",
      ".docx": "docxfile",
      ".xls": "xlsfile",
      ".xlsx": "xlsxfile",
      ".ppt": "pptfile",
      ".pptx": "pptxfile",
      ".pdf": "pdffile"
    };
    [".png", ".gif", ".jpg", ".jpeg", ".ico", ".bmp"].forEach(function (t) {
      e[t] = "image";
    });
    return e;
  };
  t._createRootDirectoryInfo = function (e) {
    var t = new o.default(null, "", true);
    var n = this._createDirectoryInfo(t, null);
    n.displayName = e || "Files";
    return n;
  };
  t.setRootText = function (e) {
    this._rootDirectoryInfo.displayName = e || "Files";
  };
  t._raiseInitialized = function () {
    this._tryCallAction("onInitialized", {
      controller: this
    });
  };
  t._raiseDataLoading = function (e) {
    this._tryCallAction("onDataLoading", {
      operation: e
    });
  };
  t._raiseSelectedDirectoryChanged = function (e) {
    this._tryCallAction("onSelectedDirectoryChanged", {
      selectedDirectoryInfo: e
    });
  };
  t._raiseEditActionStarting = function (e) {
    this._tryCallAction("onEditActionStarting", e);
  };
  t._raiseEditActionResultAcquired = function (e) {
    this._tryCallAction("onEditActionResultAcquired", e);
  };
  t._raiseEditActionError = function (e, t) {
    this._tryCallAction("onEditActionError", e, t);
  };
  t._raiseEditActionItemError = function (e, t) {
    this._tryCallAction("onEditActionItemError", e, t);
  };
  t._raiseCompleteEditActionItem = function (e, t) {
    this._tryCallAction("onCompleteEditActionItem", e, t);
  };
  t._raiseCompleteEditAction = function (e) {
    this._tryCallAction("onCompleteEditAction", e);
  };
  t._raisePathPotentiallyChanged = function () {
    this._tryCallAction("onPathPotentiallyChanged");
  };
  t._tryCallAction = function (e) {
    var t;
    var n = Array.prototype.slice.call(arguments, 1);
    if (this._isInitialized && this._options[e]) {
      (t = this._options)[e].apply(t, y(n));
    }
  };
  t._resetState = function () {
    this._selectedDirectory = null;
    this._rootDirectoryInfo.items = [];
    this._rootDirectoryInfo.itemsLoaded = false;
    this._loadedItems = {};
  };
  t._getPathInfo = function (e) {
    var t = [];
    for (var n = e; n && !n.fileItem.isRoot(); n = n.parentDirectory) {
      t.unshift({
        key: n.fileItem.key,
        name: n.fileItem.name
      });
    }
    return t;
  };
  t.on = function (e, t) {
    var n = `on${e}`;
    this._options[n] = t;
  };
  w(e, [{
    key: "_editingEvents",
    get: function () {
      return this._options.editingEvents;
    }
  }]);
  return e;
}();
exports.FileItemsController = S;
var k = function () {
  function e(e) {
    var t = this;
    this._options = (0, f.extend)({
      allowedFileExtensions: [],
      maxFileSize: 0
    }, e);
    this._extensionsMap = {};
    this._allowedFileExtensions.forEach(function (e) {
      t._extensionsMap[e.toUpperCase()] = true;
    });
  }
  var t = e.prototype;
  t.getAllowedItems = function (e) {
    var t = this;
    if (this._allowedFileExtensions.length === 0) {
      return e;
    } else {
      return e.filter(function (e) {
        return e.isDirectory || t._isValidExtension(e.name);
      });
    }
  };
  t.validateExtension = function (e) {
    if (!this._isValidExtension(e)) {
      throw new l.default(u.default.WrongFileExtension, null);
    }
  };
  t.validateMaxFileSize = function (e) {
    if (this._maxFileSize && e > this._maxFileSize) {
      throw new l.default(u.default.MaxFileSizeExceeded, null);
    }
  };
  t._isValidExtension = function (e) {
    if (this._allowedFileExtensions.length === 0) {
      return true;
    }
    var t = (0, d.getFileExtension)(e).toUpperCase();
    return this._extensionsMap[t];
  };
  w(e, [{
    key: "_allowedFileExtensions",
    get: function () {
      return this._options.allowedFileExtensions;
    }
  }, {
    key: "_maxFileSize",
    get: function () {
      return this._options.maxFileSize;
    }
  }]);
  return e;
}();