exports.default = undefined;
var i = D(require("./68374.js"));
var o = require("./13306.js");
var a = require("./35922.js");
var r = require("./62754.js");
var s = require("./20576.js");
var l = D(require("./28109.js"));
var u = D(require("./99393.js"));
var d = D(require("./14390.js"));
var c = D(require("./59958.js"));
var h = require("./75084.js");
var f = require("./57289.js");
var p = require("./77311.js");
var g = D(require("./2681.js"));
var m = D(require("./48156.js"));
var _ = D(require("./99386.js"));
var v = D(require("./6339.js"));
var y = D(require("./70166.js"));
var b = D(require("./17723.js"));
var x = D(require("./86471.js"));
var w = D(require("./47565.js"));
var C = D(require("./52666.js"));
var S = require("./45434.js");
var k = require("./49036.js");
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
  return function (e) {
    if (Array.isArray(e)) {
      return T(e);
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
      return T(e, t);
    }
    var n = Object.prototype.toString.call(e).slice(8, -1);
    if (n === "Object" && e.constructor) {
      n = e.constructor.name;
    }
    if (n === "Map" || n === "Set") {
      return Array.from(e);
    }
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) {
      return T(e, t);
    }
  }(e) || function () {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }();
}
function T(e, t) {
  if (t == null || t > e.length) {
    t = e.length;
  }
  for (var n = 0, i = new Array(t); n < t; n++) {
    i[n] = e[n];
  }
  return i;
}
function E(e, t) {
  return (E = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (e, t) {
    e.__proto__ = t;
    return e;
  })(e, t);
}
var O = "navPane";
var A = "itemView";
var P = function (e) {
  var t;
  var n;
  function u() {
    return e.apply(this, arguments) || this;
  }
  n = e;
  (t = u).prototype = Object.create(n.prototype);
  t.prototype.constructor = t;
  E(t, n);
  var d = u.prototype;
  d._initTemplates = function () {};
  d._init = function () {
    e.prototype._init.call(this);
    this._initActions();
    this._providerUpdateDeferred = null;
    this._lockCurrentPathProcessing = false;
    this._wasRendered = false;
    this._controller = new f.FileItemsController({
      currentPath: this.option("currentPath"),
      currentPathKeys: this.option("currentPathKeys"),
      rootText: this.option("rootFolderName"),
      fileProvider: this.option("fileSystemProvider"),
      allowedFileExtensions: this.option("allowedFileExtensions"),
      uploadMaxFileSize: this.option("upload").maxFileSize,
      uploadChunkSize: this.option("upload").chunkSize,
      onInitialized: this._onControllerInitialized.bind(this),
      onDataLoading: this._onDataLoading.bind(this),
      onSelectedDirectoryChanged: this._onSelectedDirectoryChanged.bind(this),
      onPathPotentiallyChanged: this._checkPathActuality.bind(this),
      editingEvents: this._actions.editing
    });
  };
  d._initMarkup = function () {
    e.prototype._initMarkup.call(this);
    this._firstItemViewLoad = true;
    this._lockSelectionProcessing = false;
    this._lockFocusedItemProcessing = false;
    this._itemKeyToFocus = undefined;
    this._loadedWidgets = [];
    this._commandManager = new p.FileManagerCommandManager(this.option("permissions"));
    this.$element().addClass("dx-filemanager");
    if (this._wasRendered) {
      this._prepareToLoad();
    } else {
      this._wasRendered = true;
    }
    this._createNotificationControl();
    this._initCommandManager();
  };
  d._createNotificationControl = function () {
    var e = this;
    var t = (0, i.default)("<div>").addClass("dx-filemanager-notification-container").appendTo(this.$element());
    this._notificationControl = this._createComponent(t, b.default, {
      progressPanelContainer: this.$element(),
      contentTemplate: function (t, n) {
        return e._createWrapper(t, n);
      },
      onActionProgress: function (t) {
        return e._onActionProgress(t);
      },
      positionTarget: `.dx-filemanager-container`,
      showProgressPanel: this.option("notifications.showPanel"),
      showNotificationPopup: this.option("notifications.showPopup")
    });
  };
  d._createWrapper = function (e, t) {
    var n = this;
    this._$wrapper = (0, i.default)("<div>").addClass("dx-filemanager-wrapper").appendTo(e);
    this._createEditing(t);
    var o = (0, i.default)("<div>").appendTo(this._$wrapper);
    this._toolbar = this._createComponent(o, y.default, {
      commandManager: this._commandManager,
      generalItems: this.option("toolbar.items"),
      fileItems: this.option("toolbar.fileSelectionItems"),
      itemViewMode: this.option("itemView").mode,
      onItemClick: function (e) {
        return n._actions.onToolbarItemClick(e);
      }
    });
    this._createAdaptivityControl();
  };
  d._createAdaptivityControl = function () {
    var e = this;
    var t = (0, i.default)("<div>").addClass("dx-filemanager-container").appendTo(this._$wrapper);
    this._adaptivityControl = this._createComponent(t, C.default, {
      drawerTemplate: function (t) {
        return e._createFilesTreeView(t);
      },
      contentTemplate: function (t) {
        return e._createItemsPanel(t);
      },
      onAdaptiveStateChanged: function (t) {
        return e._onAdaptiveStateChanged(t);
      }
    });
    this._editing.setUploaderSplitterElement(this._adaptivityControl.getSplitterElement());
  };
  d._createEditing = function (e) {
    var t = this;
    var n = (0, i.default)("<div>").addClass("dx-filemanager-editing-container").appendTo(this.$element());
    this._editing = this._createComponent(n, x.default, {
      controller: this._controller,
      model: {
        getMultipleSelectedItems: this._getSelectedItemInfos.bind(this)
      },
      getItemThumbnail: this._getItemThumbnailInfo.bind(this),
      notificationControl: e,
      uploadDropZonePlaceholderContainer: this.$element(),
      rtlEnabled: this.option("rtlEnabled"),
      onSuccess: function (e) {
        var n = e.updatedOnlyFiles;
        return t._redrawComponent(n);
      },
      onError: function (e) {
        return t._onEditingError(e);
      }
    });
  };
  d._createItemsPanel = function (e) {
    this._$itemsPanel = (0, i.default)("<div>").addClass("dx-filemanager-items-panel").appendTo(e);
    this._createBreadcrumbs(this._$itemsPanel);
    this._createItemView(this._$itemsPanel);
    this._updateUploadDropZone();
  };
  d._updateUploadDropZone = function () {
    var e = this._commandManager.isCommandAvailable("upload") ? this._$itemsPanel : (0, i.default)();
    this._editing.setUploaderDropZone(e);
  };
  d._createFilesTreeView = function (e) {
    var t = this;
    this._filesTreeViewContextMenu = this._createContextMenu(false, O);
    var n = (0, i.default)("<div>").addClass("dx-filemanager-dirs-panel").appendTo(e);
    this._filesTreeView = this._createComponent(n, m.default, {
      storeExpandedState: true,
      contextMenu: this._filesTreeViewContextMenu,
      getDirectories: this.getDirectories.bind(this),
      getCurrentDirectory: this._getCurrentDirectory.bind(this),
      onDirectoryClick: function (e) {
        var n = e.itemData;
        return t._setCurrentDirectory(n);
      },
      onItemListDataLoaded: function () {
        return t._tryEndLoading(O);
      }
    });
    this._filesTreeView.updateCurrentDirectory();
  };
  d._createItemView = function (e, t) {
    var n = this;
    this._itemViewContextMenu = this._createContextMenu(true, A);
    var o = this.option("itemView");
    var a = {
      selectionMode: this.option("selectionMode"),
      selectedItemKeys: this.option("selectedItemKeys"),
      focusedItemKey: this.option("focusedItemKey"),
      contextMenu: this._itemViewContextMenu,
      getItems: this._getItemViewItems.bind(this),
      onError: function (e) {
        var t = e.error;
        return n._showError(t);
      },
      onSelectionChanged: this._onItemViewSelectionChanged.bind(this),
      onFocusedItemChanged: this._onItemViewFocusedItemChanged.bind(this),
      onSelectedItemOpened: this._onSelectedItemOpened.bind(this),
      onContextMenuShowing: function (e) {
        return n._onContextMenuShowing(A, e);
      },
      onItemListItemsLoaded: function () {
        return n._tryEndLoading(A);
      },
      getItemThumbnail: this._getItemThumbnailInfo.bind(this),
      customizeDetailColumns: this.option("customizeDetailColumns"),
      detailColumns: this.option("itemView.details.columns")
    };
    var r = (0, i.default)("<div>").appendTo(e);
    var s = (t = t || o.mode) === "thumbnails" ? v.default : _.default;
    this._itemView = this._createComponent(r, s, a);
  };
  d._createBreadcrumbs = function (e) {
    var t = this;
    var n = (0, i.default)("<div>").appendTo(e);
    this._breadcrumbs = this._createComponent(n, w.default, {
      rootFolderDisplayName: this.option("rootFolderName"),
      onCurrentDirectoryChanging: function (e) {
        var n = e.currentDirectory;
        return t._setCurrentDirectory(n, true);
      }
    });
    this._breadcrumbs.setCurrentDirectory(this._getCurrentDirectory());
  };
  d._createContextMenu = function (e, t) {
    var n = this;
    var o = (0, i.default)("<div>").appendTo(this._$wrapper);
    return this._createComponent(o, g.default, {
      commandManager: this._commandManager,
      items: this.option("contextMenu.items"),
      onItemClick: function (e) {
        return n._actions.onContextMenuItemClick(e);
      },
      onContextMenuShowing: function (e) {
        return n._onContextMenuShowing(t, e);
      },
      isolateCreationItemCommands: e,
      viewArea: t
    });
  };
  d._initCommandManager = function () {
    var e = this;
    var t = (0, o.extend)(this._editing.getCommandActions(), {
      refresh: function () {
        return e._refreshAndShowProgress();
      },
      thumbnails: function () {
        return e.option("itemView.mode", "thumbnails");
      },
      details: function () {
        return e.option("itemView.mode", "details");
      },
      clearSelection: function () {
        return e._clearSelection();
      },
      showNavPane: function () {
        return e._adaptivityControl.toggleDrawer();
      }
    });
    this._commandManager.registerActions(t);
  };
  d._onItemViewSelectionChanged = function (e) {
    var t = e.selectedItemInfos;
    var n = e.selectedItems;
    var i = e.selectedItemKeys;
    var o = e.currentSelectedItemKeys;
    var a = e.currentDeselectedItemKeys;
    this._lockSelectionProcessing = true;
    this.option("selectedItemKeys", i);
    this._lockSelectionProcessing = false;
    this._actions.onSelectionChanged({
      selectedItems: n,
      selectedItemKeys: i,
      currentSelectedItemKeys: o,
      currentDeselectedItemKeys: a
    });
    this._updateToolbar(t);
  };
  d._onItemViewFocusedItemChanged = function (e) {
    this._lockFocusedItemProcessing = true;
    this.option("focusedItemKey", e.itemKey);
    this._lockFocusedItemProcessing = false;
    this._actions.onFocusedItemChanged({
      item: e.item,
      itemElement: e.itemElement
    });
  };
  d._onAdaptiveStateChanged = function (e) {
    var t = e.enabled;
    this._commandManager.setCommandEnabled("showNavPane", t);
    this._updateToolbar();
  };
  d._onActionProgress = function (e) {
    var t = e.message;
    var n = e.status;
    this._toolbar.updateRefreshItem(t, n);
    this._updateToolbar();
  };
  d._onEditingError = function (e) {
    var t = (0, h.extendAttributes)({}, e, ["errorCode", "errorText", "fileSystemItem"]);
    this._actions.onErrorOccurred(t);
    e.errorText = t.errorText;
  };
  d._refreshAndShowProgress = function () {
    var e = this;
    this._prepareToLoad();
    return (0, r.when)(this._notificationControl.tryShowProgressPanel(), this._controller.refresh()).then(function () {
      return e._filesTreeView.refresh();
    });
  };
  d._isAllWidgetsLoaded = function () {
    return this._loadedWidgets.length === 2 && this._loadedWidgets.indexOf(O) !== -1 && this._loadedWidgets.indexOf(A) !== -1;
  };
  d._tryEndLoading = function (e) {
    this._loadedWidgets.push(e);
    if (this._isAllWidgetsLoaded()) {
      this._controller.endSingleLoad();
    }
  };
  d._prepareToLoad = function () {
    this._loadedWidgets = [];
    this._controller.startSingleLoad();
  };
  d._updateToolbar = function (e) {
    var t = e || this._getSelectedItemInfos();
    this._toolbar.option("contextItems", (0, s.ensureDefined)(t, []));
  };
  d._switchView = function (e) {
    this._disposeWidget(this._itemView.option("contextMenu"));
    this._disposeWidget(this._itemView);
    this._createItemView(this._$itemsPanel, e);
    this._toolbar.option({
      itemViewMode: e
    });
  };
  d._disposeWidget = function (e) {
    e.dispose();
    e.$element().remove();
  };
  d._clearSelection = function () {
    this._itemView.clearSelection();
  };
  d._showError = function (e) {
    this._showNotification(e, false);
  };
  d._showNotification = function (e, t) {
    (0, c.default)({
      message: e,
      width: 450
    }, t ? "success" : "error", 5000);
  };
  d._redrawComponent = function (e) {
    var t = this;
    this._itemView.refresh().then(function () {
      return !e && t._filesTreeView.refresh();
    });
  };
  d._getItemViewItems = function () {
    var e = this;
    var t = this.option("itemView").showFolders;
    var n = this._controller.getCurrentItems(!t);
    this._updateToolbarWithSelectionOnFirstLoad(n);
    if (this.option("itemView.showParentFolder")) {
      n = (0, r.when)(n).then(function (t) {
        return e._getPreparedItemViewItems(t);
      });
    }
    return n;
  };
  d._updateToolbarWithSelectionOnFirstLoad = function (e) {
    var t = this;
    if (this._firstItemViewLoad) {
      this._firstItemViewLoad = false;
      var n = this.option("selectedItemKeys");
      if (n.length > 0) {
        (0, r.when)(e).done(function (e) {
          var i = (0, h.findItemsByKeys)(e, n);
          if (i.length > 0) {
            t._updateToolbar(i);
          }
        });
      }
    }
  };
  d._getPreparedItemViewItems = function (e) {
    var t = this._getCurrentDirectory();
    if (t.fileItem.isRoot()) {
      return e;
    }
    var n = t.fileItem.createClone();
    n.isParentFolder = true;
    n.name = "..";
    n.relativeName = "..";
    n.key = `[*DXPDK*]\$40F96F03-FBD8-43DF-91BE-F55F4B8BA871\$${t.fileItem.key}`;
    var i = I(e);
    i.unshift({
      fileItem: n,
      icon: "parentfolder"
    });
    return i;
  };
  d._onContextMenuShowing = function (e, t) {
    var i = (0, h.extendAttributes)({}, t, ["targetElement", "cancel", "event"]);
    i = (0, o.extend)(i, {
      viewArea: e,
      fileSystemItem: t.itemData?.fileItem,
      _isActionButton: t.isActionButton
    });
    this._actions.onContextMenuShowing(i);
    t.cancel = (0, s.ensureDefined)(i.cancel, false);
  };
  d._getItemThumbnailInfo = function (e) {
    var t = this.option("customizeThumbnail");
    var n = (0, a.isFunction)(t) ? t(e.fileItem) : e.fileItem.thumbnail;
    if (n) {
      return {
        thumbnail: n,
        cssClass: "dx-filemanager-item-custom-thumbnail"
      };
    } else {
      return {
        thumbnail: e.icon
      };
    }
  };
  d._getDefaultOptions = function () {
    return (0, o.extend)(e.prototype._getDefaultOptions.call(this), {
      fileSystemProvider: null,
      currentPath: "",
      currentPathKeys: [],
      rootFolderName: l.default.format("dxFileManager-rootDirectoryName"),
      selectionMode: "multiple",
      selectedItemKeys: [],
      focusedItemKey: undefined,
      toolbar: {
        items: ["showNavPane", "create", "upload", "switchView", {
          name: "separator",
          location: "after"
        }, "refresh"],
        fileSelectionItems: ["download", "separator", "move", "copy", "rename", "separator", "delete", "clearSelection", {
          name: "separator",
          location: "after"
        }, "refresh"]
      },
      contextMenu: {
        items: ["create", "upload", "rename", "move", "copy", "delete", "refresh", "download"]
      },
      itemView: {
        details: {
          columns: ["thumbnail", "name", "dateModified", "size"]
        },
        mode: "details",
        showFolders: true,
        showParentFolder: true
      },
      customizeThumbnail: null,
      customizeDetailColumns: null,
      onContextMenuItemClick: null,
      onContextMenuShowing: null,
      onCurrentDirectoryChanged: null,
      onSelectedFileOpened: null,
      onSelectionChanged: null,
      onFocusedItemChanged: null,
      onToolbarItemClick: null,
      onErrorOccurred: null,
      onDirectoryCreating: null,
      onDirectoryCreated: null,
      onItemRenaming: null,
      onItemRenamed: null,
      onItemDeleting: null,
      onItemDeleted: null,
      onItemCopying: null,
      onItemCopied: null,
      onItemMoving: null,
      onItemMoved: null,
      onFileUploading: null,
      onFileUploaded: null,
      onItemDownloading: null,
      allowedFileExtensions: [],
      upload: {
        maxFileSize: 0,
        chunkSize: 200000
      },
      permissions: (0, o.extend)({}, p.defaultPermissions),
      notifications: {
        showPanel: true,
        showPopup: true
      }
    });
  };
  d.option = function (t, n) {
    var i = this;
    var o = (0, S.normalizeOptions)(t, n);
    var s = arguments.length < 2 && (0, a.type)(t) !== "object";
    function l(e) {
      return (0, a.isDefined)(o[e]);
    }
    function u(e) {
      if (!l(e)) {
        return false;
      }
      var t = i.option(e);
      var n = o[e];
      return !(0, k.equals)(t, n);
    }
    if (!s && l("fileSystemProvider")) {
      this._providerUpdateDeferred = new r.Deferred();
      if (u("currentPath") || u("currentPathKeys")) {
        this._lockCurrentPathProcessing = true;
      }
    }
    return e.prototype.option.apply(this, arguments);
  };
  d._optionChanged = function (t) {
    var n = this;
    var i = t.name;
    switch (i) {
      case "currentPath":
        function o() {
          n._lockCurrentPathProcessing = false;
          return n._controller.setCurrentPath(t.value);
        }
        this._lockCurrentPathProcessing = true;
        if (this._providerUpdateDeferred) {
          this._providerUpdateDeferred.then(o);
        } else {
          o();
        }
        break;
      case "currentPathKeys":
        function a() {
          n._lockCurrentPathProcessing = false;
          return n._controller.setCurrentPathByKeys(t.value);
        }
        this._lockCurrentPathProcessing = true;
        if (this._providerUpdateDeferred) {
          this._providerUpdateDeferred.then(a);
        } else {
          a();
        }
        break;
      case "selectedItemKeys":
        if (!this._lockSelectionProcessing && this._itemView) {
          this._itemView.option("selectedItemKeys", t.value);
        }
        break;
      case "focusedItemKey":
        if (!this._lockFocusedItemProcessing && this._itemView) {
          this._itemView.option("focusedItemKey", t.value);
        }
        break;
      case "rootFolderName":
        this._controller.setRootText(t.value);
        this._invalidate();
        break;
      case "fileSystemProvider":
        if (!this._lockCurrentPathProcessing) {
          this._providerUpdateDeferred = new r.Deferred();
        }
        var s = this._lockCurrentPathProcessing ? undefined : this.option("currentPathKeys");
        this._controller.updateProvider(t.value, s).then(function () {
          return n._providerUpdateDeferred.resolve();
        }).always(function () {
          n._providerUpdateDeferred = null;
          n.repaint();
        });
        break;
      case "allowedFileExtensions":
        this._controller.setAllowedFileExtensions(t.value);
        this._invalidate();
        break;
      case "upload":
        this._controller.setUploadOptions(this.option("upload"));
        this._invalidate();
        break;
      case "permissions":
        this._commandManager.updatePermissions(this.option("permissions"));
        this._filesTreeViewContextMenu.tryUpdateVisibleContextMenu();
        this._itemViewContextMenu.tryUpdateVisibleContextMenu();
        this._toolbar.updateItemPermissions();
        this._updateUploadDropZone();
        break;
      case "selectionMode":
      case "customizeThumbnail":
      case "customizeDetailColumns":
        this._invalidate();
        break;
      case "itemView":
        if (t.fullName === "itemView.mode") {
          this._switchView(t.value);
        } else {
          this._invalidate();
        }
        break;
      case "toolbar":
        var l = {};
        if (t.fullName === "toolbar") {
          if (t.value.items) {
            l.generalItems = t.value.items;
          }
          if (t.value.fileSelectionItems) {
            l.fileItems = t.value.fileSelectionItems;
          }
        }
        if (t.fullName.indexOf("toolbar.items") === 0) {
          l.generalItems = this.option("toolbar.items");
        }
        if (t.fullName.indexOf("toolbar.fileSelectionItems") === 0) {
          l.fileItems = this.option("toolbar.fileSelectionItems");
        }
        this._toolbar.option(l);
        break;
      case "contextMenu":
        if (t.fullName === "contextMenu" && t.value.items || t.fullName.indexOf("contextMenu.items") === 0) {
          var u = this.option("contextMenu.items");
          this._filesTreeViewContextMenu.option("items", u);
          this._itemViewContextMenu.option("items", u);
        }
        break;
      case "notifications":
        this._notificationControl.option("showProgressPanel", this.option("notifications.showPanel"));
        this._notificationControl.option("showNotificationPopup", this.option("notifications.showPopup"));
        break;
      case "onContextMenuItemClick":
      case "onContextMenuShowing":
      case "onCurrentDirectoryChanged":
      case "onSelectedFileOpened":
      case "onSelectionChanged":
      case "onFocusedItemChanged":
      case "onToolbarItemClick":
      case "onErrorOccurred":
        this._actions[i] = this._createActionByOption(i);
        break;
      case "onDirectoryCreating":
      case "onDirectoryCreated":
      case "onItemRenaming":
      case "onItemRenamed":
      case "onItemDeleting":
      case "onItemDeleted":
      case "onItemCopying":
      case "onItemCopied":
      case "onItemMoving":
      case "onItemMoved":
      case "onFileUploading":
      case "onFileUploaded":
      case "onItemDownloading":
        this._actions.editing[i] = this._createActionByOption(i);
        break;
      case "rtlEnabled":
        this._editing.updateDialogRtl(t.value);
        e.prototype._optionChanged.call(this, t);
        break;
      default:
        e.prototype._optionChanged.call(this, t);
    }
  };
  d._initActions = function () {
    this._actions = {
      onContextMenuItemClick: this._createActionByOption("onContextMenuItemClick"),
      onContextMenuShowing: this._createActionByOption("onContextMenuShowing"),
      onCurrentDirectoryChanged: this._createActionByOption("onCurrentDirectoryChanged"),
      onSelectedFileOpened: this._createActionByOption("onSelectedFileOpened"),
      onSelectionChanged: this._createActionByOption("onSelectionChanged"),
      onFocusedItemChanged: this._createActionByOption("onFocusedItemChanged"),
      onToolbarItemClick: this._createActionByOption("onToolbarItemClick"),
      onErrorOccurred: this._createActionByOption("onErrorOccurred"),
      editing: {
        onDirectoryCreating: this._createActionByOption("onDirectoryCreating"),
        onDirectoryCreated: this._createActionByOption("onDirectoryCreated"),
        onItemRenaming: this._createActionByOption("onItemRenaming"),
        onItemRenamed: this._createActionByOption("onItemRenamed"),
        onItemDeleting: this._createActionByOption("onItemDeleting"),
        onItemDeleted: this._createActionByOption("onItemDeleted"),
        onItemCopying: this._createActionByOption("onItemCopying"),
        onItemCopied: this._createActionByOption("onItemCopied"),
        onItemMoving: this._createActionByOption("onItemMoving"),
        onItemMoved: this._createActionByOption("onItemMoved"),
        onFileUploading: this._createActionByOption("onFileUploading"),
        onFileUploaded: this._createActionByOption("onFileUploaded"),
        onItemDownloading: this._createActionByOption("onItemDownloading")
      }
    };
  };
  d.executeCommand = function (e) {
    return this._commandManager.executeCommand(e);
  };
  d._setCurrentDirectory = function (e, t) {
    this._controller.setCurrentDirectory(e, t);
  };
  d._getCurrentDirectory = function () {
    return this._controller.getCurrentDirectory();
  };
  d._onControllerInitialized = function (e) {
    var t = e.controller;
    this._controller = this._controller || t;
    this._syncToCurrentDirectory();
  };
  d._onDataLoading = function (e) {
    var t = e.operation;
    var n = null;
    if (t === f.OPERATIONS.NAVIGATION) {
      n = {
        focusedItemKey: this._itemKeyToFocus,
        selectedItemKeys: this.option("selectedItemKeys")
      };
      this._itemKeyToFocus = undefined;
    }
    this._itemView.refresh(n, t);
  };
  d._onSelectedDirectoryChanged = function () {
    var e = this._getCurrentDirectory();
    this._syncToCurrentDirectory();
    this._actions.onCurrentDirectoryChanged({
      directory: e.fileItem
    });
  };
  d._syncToCurrentDirectory = function () {
    var e = this._getCurrentDirectory();
    if (this._filesTreeView) {
      this._filesTreeView.updateCurrentDirectory();
    }
    if (this._breadcrumbs) {
      this._breadcrumbs.setCurrentDirectory(e);
    }
    this._checkPathActuality();
  };
  d._checkPathActuality = function () {
    if (!this._lockCurrentPathProcessing) {
      var e = this._controller.getCurrentPath();
      var t = this._controller.getCurrentPathKeys();
      var n = {};
      if (this.option("currentPath") !== e) {
        n.currentPath = e;
      }
      if (!(0, s.equalByValue)(this.option("currentPathKeys"), t)) {
        n.currentPathKeys = t;
      }
      if (!(0, a.isEmptyObject)(n)) {
        this.option(n);
      }
    }
  };
  d.getDirectories = function (e, t) {
    return this._controller.getDirectories(e, t);
  };
  d._getSelectedItemInfos = function () {
    if (this._itemView) {
      return this._itemView.getSelectedItems();
    } else {
      return [];
    }
  };
  d.refresh = function () {
    return this.executeCommand("refresh");
  };
  d.getCurrentDirectory = function () {
    var e = this._getCurrentDirectory();
    return e && e.fileItem || null;
  };
  d.getSelectedItems = function () {
    return this._getSelectedItemInfos().map(function (e) {
      return e.fileItem;
    });
  };
  d._onSelectedItemOpened = function (e) {
    var t = e.fileItemInfo;
    var n = t.fileItem;
    if (n.isDirectory) {
      if (n.isParentFolder) {
        this._itemKeyToFocus = this._getCurrentDirectory().fileItem.key;
      }
      var i = n.isParentFolder ? this._getCurrentDirectory().parentDirectory : t;
      this._setCurrentDirectory(i);
      if (i) {
        this._filesTreeView.toggleDirectoryExpandedState(i.parentDirectory, true);
      }
    } else {
      this._actions.onSelectedFileOpened({
        file: n
      });
    }
  };
  return u;
}(d.default);
(0, u.default)("dxFileManager", P);
var M = P;
exports.default = M;
module.exports = exports.default;
module.exports.default = exports.default;