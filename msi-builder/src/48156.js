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
var o = p(require("./68374.js"));
var a = require("./13306.js");
var r = require("./44899.js");
var s = require("./20576.js");
var l = p(require("./14390.js"));
var u = p(require("./76986.js"));
var d = p(require("./68912.js"));
var c = require("./62754.js");
var h = require("./58201.js");
var f = require("./35922.js");
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
  var l;
  var p;
  var m;
  var y = i.prototype;
  y._initMarkup = function () {
    var e = this;
    this._initActions();
    this._getCurrentDirectory = this.option("getCurrentDirectory");
    this._createFileActionsButton = s.noop;
    this._storeExpandedState = this.option("storeExpandedState") || false;
    var t = (0, o.default)("<div>").addClass("dx-filemanager-dirs-tree").appendTo(this.$element());
    var n = {
      dataStructure: "plain",
      rootValue: "",
      createChildren: this._onFilesTreeViewCreateSubDirectories.bind(this),
      itemTemplate: this._createFilesTreeViewItemTemplate.bind(this),
      keyExpr: "getInternalKey",
      parentIdExpr: "parentDirectory.getInternalKey",
      displayExpr: function (e) {
        return e.getDisplayName();
      },
      hasItemsExpr: "fileItem.hasSubDirectories",
      onItemClick: function (t) {
        return e._actions.onDirectoryClick(t);
      },
      onItemExpanded: function (t) {
        return e._onFilesTreeViewItemExpanded(t);
      },
      onItemCollapsed: function (t) {
        return e._onFilesTreeViewItemCollapsed(t);
      },
      onItemRendered: function (t) {
        return e._onFilesTreeViewItemRendered(t);
      },
      onContentReady: function () {
        return e._actions.onFilesTreeViewContentReady();
      }
    };
    if (this._contextMenu) {
      this._contextMenu.option("onContextMenuHidden", function () {
        return e._onContextMenuHidden();
      });
      n.onItemContextMenu = function (t) {
        return e._onFilesTreeViewItemContextMenu(t);
      };
      this._createFileActionsButton = function (t, n) {
        return e._createComponent(t, d.default, n);
      };
    }
    this._filesTreeView = this._createComponent(t, u.default, n);
  };
  y._initActions = function () {
    this._actions = {
      onDirectoryClick: this._createActionByOption("onDirectoryClick"),
      onFilesTreeViewContentReady: this._createActionByOption("onFilesTreeViewContentReady")
    };
  };
  y._render = function () {
    e.prototype._render.call(this);
    var t = this;
    setTimeout(function () {
      t._updateFocusedElement();
    });
  };
  y._onFilesTreeViewCreateSubDirectories = function (e) {
    var t = this.option("getDirectories");
    var n = e && e.itemData || null;
    return t && t(n, true);
  };
  y._onFilesTreeViewItemRendered = function (e) {
    var t = e.itemData;
    var n = this._getCurrentDirectory();
    if (n && n.fileItem.equals(t.fileItem)) {
      this._updateFocusedElement();
      this._restoreScrollTopPosition();
    }
  };
  y._onFilesTreeViewItemExpanded = function (e) {
    var t = e.itemData;
    if (this._storeExpandedState) {
      t.expanded = true;
    }
  };
  y._onFilesTreeViewItemCollapsed = function (e) {
    var t = e.itemData;
    if (this._storeExpandedState) {
      t.expanded = false;
    }
  };
  y._createFilesTreeViewItemTemplate = function (e, t, n) {
    var i = this;
    var a = (0, o.default)(n);
    a.closest(this._filesTreeViewItemSelector).data("item", e);
    var s = (0, r.getImageContainer)(e.icon);
    var l = (0, o.default)("<span>").text(e.getDisplayName()).addClass("dx-filemanager-dirs-tree-item-text");
    var u = (0, o.default)("<div>");
    a.append(s, l, u);
    this._createFileActionsButton(u, {
      onClick: function (e) {
        return i._onFileItemActionButtonClick(e);
      }
    });
  };
  y._onFilesTreeViewItemContextMenu = function (e) {
    var t = e.itemElement;
    var n = e.event;
    n.preventDefault();
    n.stopPropagation();
    var i = (0, o.default)(t).data("item");
    this._contextMenu.showAt([i], t, n, {
      itemData: i,
      itemElement: t
    });
  };
  y._onFileItemActionButtonClick = function (e) {
    var t = e.component;
    var n = e.element;
    var i = e.event;
    i.stopPropagation();
    var o = t.$element().closest(this._filesTreeViewItemSelector);
    var a = o.data("item");
    var r = {
      itemData: a,
      itemElement: o,
      isActionButton: true
    };
    this._contextMenu.showAt([a], n, i, r);
    this._activeFileActionsButton = t;
    this._activeFileActionsButton.setActive(true);
  };
  y._onContextMenuHidden = function () {
    if (this._activeFileActionsButton) {
      this._activeFileActionsButton.setActive(false);
    }
  };
  y.toggleNodeDisabledState = function (e, t) {
    var n = this._getNodeByKey(e);
    if (n) {
      var i = this._filesTreeView.option("items").map(function (e) {
        return e.getInternalKey();
      }).indexOf(n.getInternalKey());
      if (i !== -1) {
        this._filesTreeView.option(`items[${i}].disabled`, t);
      }
    }
  };
  y._saveScrollTopPosition = function () {
    if ((0, h.hasWindow)()) {
      this._scrollTopPosition = this._filesTreeView.getScrollable().scrollTop();
    }
  };
  y._restoreScrollTopPosition = function () {
    var e = this;
    if ((0, h.hasWindow)() && (0, f.isNumeric)(this._scrollTopPosition)) {
      setTimeout(function () {
        return e._filesTreeView.getScrollable().scrollTo(e._scrollTopPosition);
      });
    }
  };
  y._updateFocusedElement = function () {
    var e = this._getCurrentDirectory();
    var t = this._getItemElementByKey(e == null ? undefined : e.getInternalKey());
    if (this._$focusedElement) {
      this._$focusedElement.toggleClass("dx-filemanager-focused-item", false);
    }
    this._$focusedElement = t || (0, o.default)();
    this._$focusedElement.toggleClass("dx-filemanager-focused-item", true);
  };
  y._getNodeByKey = function (e) {
    var t;
    if ((t = this._filesTreeView) === null || t === undefined) {
      return undefined;
    } else {
      return t._getNode(e);
    }
  };
  y._getPublicNode = function (e) {
    var t;
    for (var n = g((t = this._filesTreeView) === null || t === undefined ? undefined : t.getNodes()); n.length;) {
      var i = n.shift();
      if (i.itemData.getInternalKey() === e) {
        return i;
      }
      if (i.children.length) {
        n.push.apply(n, g(i.children));
      }
    }
  };
  y._getItemElementByKey = function (e) {
    var t = this._getNodeByKey(e);
    if (t) {
      var n = this._filesTreeView._getNodeElement(t);
      if (n) {
        return n.children(this._filesTreeViewItemSelector);
      }
    }
    return null;
  };
  y._getDefaultOptions = function () {
    return (0, a.extend)(e.prototype._getDefaultOptions.call(this), {
      storeExpandedState: false,
      initialFolder: null,
      contextMenu: null,
      getItems: null,
      getCurrentDirectory: null,
      onDirectoryClick: null
    });
  };
  y._optionChanged = function (t) {
    var n = t.name;
    switch (n) {
      case "storeExpandedState":
        this._storeExpandedState = this.option(n);
        break;
      case "getItems":
      case "rootFolderDisplayName":
      case "initialFolder":
      case "contextMenu":
        this.repaint();
        break;
      case "getCurrentDirectory":
        this.getCurrentDirectory = this.option(n);
        break;
      case "onDirectoryClick":
      case "onFilesTreeViewContentReady":
        this._actions[n] = this._createActionByOption(n);
        break;
      default:
        e.prototype._optionChanged.call(this, t);
    }
  };
  y.toggleDirectoryExpandedState = function (e, t) {
    var n = new c.Deferred();
    var i = this._getPublicNode(e == null ? undefined : e.getInternalKey());
    if (!i) {
      return n.reject().promise();
    }
    if (i.expanded === t || i.itemsLoaded && !i.itemData.fileItem.hasSubDirectories) {
      return n.resolve().promise();
    }
    var o = t ? "expandItem" : "collapseItem";
    return this._filesTreeView[o](e.getInternalKey());
  };
  y.refresh = function () {
    this._$focusedElement = null;
    this._saveScrollTopPosition();
    this._filesTreeView.option("dataSource", []);
  };
  y.updateCurrentDirectory = function () {
    if (!this._disposed) {
      this._updateFocusedElement();
      if (this._storeExpandedState) {
        this._updateExpandedStateToCurrentDirectory();
      }
    }
  };
  y._updateExpandedStateToCurrentDirectory = function () {
    return this.toggleDirectoryExpandedStateRecursive(this._getCurrentDirectory().parentDirectory, true);
  };
  y.toggleDirectoryExpandedStateRecursive = function (e, t) {
    var n = [];
    for (var i = e; i; i = i.parentDirectory) {
      n.unshift(i);
    }
    return this.toggleDirectoryLineExpandedState(n, t);
  };
  y.toggleDirectoryLineExpandedState = function (e, t) {
    var n = this;
    if (e.length) {
      return this.toggleDirectoryExpandedState(e.shift(), t).then(function () {
        return n.toggleDirectoryLineExpandedState(e, t);
      });
    } else {
      return new c.Deferred().resolve().promise();
    }
  };
  l = i;
  if (p = [{
    key: "_filesTreeViewItemSelector",
    get: function () {
      return `.dx-treeview-item`;
    }
  }, {
    key: "_contextMenu",
    get: function () {
      return this.option("contextMenu");
    }
  }]) {
    _(l.prototype, p);
  }
  if (m) {
    _(l, m);
  }
  Object.defineProperty(l, "prototype", {
    writable: false
  });
  return i;
}(l.default);
exports.default = y;
module.exports = exports.default;
module.exports.default = exports.default;