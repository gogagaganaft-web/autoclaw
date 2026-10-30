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
var o = require("./13306.js");
var a = require("./62754.js");
var r = require("./58201.js");
var s = require("./85272.js");
var l = require("./39611.js");
var u = p(require("./55994.js"));
var d = require("./44899.js");
var c = p(require("./20530.js"));
var h = p(require("./88036.js"));
var f = p(require("./14390.js"));
function p(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
function g(e) {
  return function (e) {
    if (Array.isArray(e)) {
      return m(e);
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
      return m(e, t);
    }
    var n = Object.prototype.toString.call(e).slice(8, -1);
    if (n === "Object" && e.constructor) {
      n = e.constructor.name;
    }
    if (n === "Map" || n === "Set") {
      return Array.from(e);
    }
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) {
      return m(e, t);
    }
  }(e) || function () {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }();
}
function m(e, t) {
  if (t == null || t > e.length) {
    t = e.length;
  }
  for (var n = 0, i = new Array(t); n < t; n++) {
    i[n] = e[n];
  }
  return i;
}
function _(e, t) {
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
function v(e, t) {
  return (v = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (e, t) {
    e.__proto__ = t;
    return e;
  })(e, t);
}
var y = function (e) {
  var t;
  var n;
  function i() {
    return e.apply(this, arguments) || this;
  }
  n = e;
  (t = i).prototype = Object.create(n.prototype);
  t.prototype.constructor = t;
  v(t, n);
  var f;
  var p;
  var m;
  var y = i.prototype;
  y._init = function () {
    this._initActions();
    this._lockFocusedItemProcessing = false;
    this._focusedItemKey = this.option("focusedItemKey");
    e.prototype._init.call(this);
  };
  y._initMarkup = function () {
    this._needResetScrollPosition = false;
    this.$element().addClass("dx-filemanager-files-view");
    var t = (0, l.addNamespace)(s.name, "dxFileManager_open");
    u.default.on(this.$element(), t, this._getItemSelector(), this._onItemDblClick.bind(this));
    e.prototype._initMarkup.call(this);
  };
  y._initActions = function () {
    this._actions = {
      onError: this._createActionByOption("onError"),
      onSelectionChanged: this._createActionByOption("onSelectionChanged"),
      onFocusedItemChanged: this._createActionByOption("onFocusedItemChanged"),
      onSelectedItemOpened: this._createActionByOption("onSelectedItemOpened"),
      onContextMenuShowing: this._createActionByOption("onContextMenuShowing"),
      onItemListDataLoaded: this._createActionByOption("onItemListDataLoaded")
    };
  };
  y._getDefaultOptions = function () {
    return (0, o.extend)(e.prototype._getDefaultOptions.call(this), {
      selectionMode: "single",
      selectedItemKeys: [],
      focusedItemKey: undefined,
      contextMenu: null,
      getItems: null,
      getItemThumbnail: null,
      onError: null,
      onSelectionChanged: null,
      onFocusedItemChanged: null,
      onSelectedItemOpened: null,
      onContextMenuShowing: null
    });
  };
  y._optionChanged = function (t) {
    var n = t.name;
    switch (n) {
      case "selectionMode":
      case "contextMenu":
      case "getItems":
      case "getItemThumbnail":
        this.repaint();
        break;
      case "selectedItemKeys":
        this._setSelectedItemKeys(t.value);
        break;
      case "focusedItemKey":
        if (!this._lockFocusedItemProcessing) {
          this._setFocusedItemKey(t.value);
        }
        break;
      case "onError":
      case "onSelectedItemOpened":
      case "onSelectionChanged":
      case "onFocusedItemChanged":
      case "onContextMenuShowing":
      case "onItemListDataLoaded":
        this._actions[n] = this._createActionByOption(n);
        break;
      default:
        e.prototype._optionChanged.call(this, t);
    }
  };
  y._getItems = function () {
    var e = this;
    return this._getItemsInternal().done(function (t) {
      e._itemCount = t.length;
      if (e._itemCount === 0) {
        e._resetFocus();
      }
      var n = e._findParentDirectoryItem(t);
      e._hasParentDirectoryItem = !!n;
      e._parentDirectoryItemKey = n ? n.fileItem.key : null;
    }).always(function () {
      e._onDataLoaded();
    });
  };
  y._getItemsInternal = function () {
    var e = this.option("getItems");
    var t = e ? e() : [];
    return (0, a.when)(t);
  };
  y._raiseOnError = function (e) {
    this._actions.onError({
      error: e
    });
  };
  y._raiseSelectionChanged = function (e) {
    this._actions.onSelectionChanged(e);
  };
  y._raiseFocusedItemChanged = function (e) {
    this._actions.onFocusedItemChanged(e);
  };
  y._raiseSelectedItemOpened = function (e) {
    this._actions.onSelectedItemOpened({
      fileItemInfo: e
    });
  };
  y._raiseContextMenuShowing = function (e) {
    this._actions.onContextMenuShowing(e);
  };
  y._raiseItemListDataLoaded = function () {
    this._actions.onItemListDataLoaded();
  };
  y._onDataLoaded = function () {
    var e;
    this._raiseItemListDataLoaded();
    if ((e = this._refreshDeferred) !== null && e !== undefined) {
      e.resolve();
    }
  };
  y._onContentReady = function () {
    if (this._needResetScrollPosition) {
      this._resetScrollTopPosition();
      this._needResetScrollPosition = false;
    }
  };
  y._tryRaiseSelectionChanged = function (e) {
    var t = this;
    var n = e.selectedItemInfos;
    var i = e.selectedItems;
    var o = e.selectedItemKeys;
    var a = e.currentSelectedItemKeys;
    var r = e.currentDeselectedItemKeys;
    var s = this._findParentDirectoryItem(this.getSelectedItems());
    if (s) {
      this._deselectItem(s);
    }
    var l = !this._hasParentDirectoryItem;
    if (l = l || this._hasValidKeys(a) || this._hasValidKeys(r)) {
      n = this._filterOutItemByPredicate(n, function (e) {
        return e.fileItem.key === t._parentDirectoryItemKey;
      });
      i = this._filterOutParentDirectory(i);
      o = this._filterOutParentDirectoryKey(o, true);
      a = this._filterOutParentDirectoryKey(a, true);
      r = this._filterOutParentDirectoryKey(r, true);
      this._raiseSelectionChanged({
        selectedItemInfos: n,
        selectedItems: i,
        selectedItemKeys: o,
        currentSelectedItemKeys: a,
        currentDeselectedItemKeys: r
      });
    }
  };
  y._onFocusedItemChanged = function (e) {
    if (this._focusedItemKey !== e.itemKey) {
      this._focusedItemKey = e.itemKey;
      this._lockFocusedItemProcessing = true;
      this.option("focusedItemKey", e.itemKey);
      this._lockFocusedItemProcessing = false;
      this._raiseFocusedItemChanged(e);
    }
  };
  y._resetFocus = function () {};
  y._resetScrollTopPosition = function () {
    var e = this;
    if ((0, r.hasWindow)()) {
      setTimeout(function () {
        var t;
        if ((t = e._getScrollable()) === null || t === undefined) {
          return undefined;
        } else {
          return t.scrollTo(0);
        }
      });
    }
  };
  y._getScrollable = function () {};
  y._getItemThumbnail = function (e) {
    var t = this.option("getItemThumbnail");
    if (t) {
      return t(e);
    } else {
      return {
        thumbnail: ""
      };
    }
  };
  y._getItemThumbnailContainer = function (e) {
    var t = this._getItemThumbnail(e);
    var n = t.thumbnail;
    var i = t.cssClass;
    var o = (0, d.getImageContainer)(n).addClass(this._getItemThumbnailCssClass());
    if (i) {
      o.addClass(i);
    }
    return o;
  };
  y._getItemThumbnailCssClass = function () {
    return "";
  };
  y._getItemSelector = function () {};
  y._onItemDblClick = function (e) {};
  y._isDesktop = function () {
    return c.default.real().deviceType === "desktop";
  };
  y._showContextMenu = function (e, t, n, i) {
    this._contextMenu.showAt(e, t, n, i);
  };
  y._findParentDirectoryItem = function (e) {
    for (var t = 0; t < e.length; t++) {
      var n = e[t];
      if (this._isParentDirectoryItem(n)) {
        return n;
      }
    }
    return null;
  };
  y._getFileItemsForContextMenu = function (e) {
    var t = this.getSelectedItems();
    if (this._isParentDirectoryItem(e)) {
      t.push(e);
    }
    return t;
  };
  y._isParentDirectoryItem = function (e) {
    return e.fileItem.isParentFolder;
  };
  y._hasValidKeys = function (e) {
    return e.length > 1 || e.length === 1 && e[0] !== this._parentDirectoryItemKey;
  };
  y._filterOutParentDirectory = function (e, t) {
    var n = this;
    return this._filterOutItemByPredicate(e, function (e) {
      return e.key === n._parentDirectoryItemKey;
    }, t);
  };
  y._filterOutParentDirectoryKey = function (e, t) {
    var n = this;
    return this._filterOutItemByPredicate(e, function (e) {
      return e === n._parentDirectoryItemKey;
    }, t);
  };
  y._filterOutItemByPredicate = function (e, t, n) {
    var i = e;
    var o = -1;
    for (var a = 0; a < e.length; a++) {
      if (t(e[a])) {
        o = a;
        break;
      }
    }
    if (o !== -1) {
      if (n) {
        i = g(e);
      }
      i.splice(o, 1);
    }
    return i;
  };
  y._isMultipleSelectionMode = function () {
    return this.option("selectionMode") === "multiple";
  };
  y._deselectItem = function (e) {};
  y._setSelectedItemKeys = function (e) {};
  y._setFocusedItemKey = function (e) {};
  y._createDataSource = function () {
    return {
      store: new h.default({
        key: "fileItem.key",
        load: this._getItems.bind(this)
      })
    };
  };
  y.getSelectedItems = function () {};
  y.clearSelection = function () {};
  y.selectItem = function () {};
  y.refresh = function (e, t) {};
  f = i;
  if (p = [{
    key: "_contextMenu",
    get: function () {
      return this.option("contextMenu");
    }
  }]) {
    _(f.prototype, p);
  }
  if (m) {
    _(f, m);
  }
  Object.defineProperty(f, "prototype", {
    writable: false
  });
  return i;
}(f.default);
exports.default = y;
module.exports = exports.default;
module.exports.default = exports.default;