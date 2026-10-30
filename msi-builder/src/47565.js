exports.default = undefined;
var i = s(require("./68374.js"));
var o = require("./13306.js");
var a = s(require("./14390.js"));
var r = s(require("./2616.js"));
function s(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
function l(e, t) {
  return (l = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (e, t) {
    e.__proto__ = t;
    return e;
  })(e, t);
}
var u = function (e) {
  var t;
  var n;
  function a() {
    return e.apply(this, arguments) || this;
  }
  n = e;
  (t = a).prototype = Object.create(n.prototype);
  t.prototype.constructor = t;
  l(t, n);
  var s = a.prototype;
  s._init = function () {
    e.prototype._init.call(this);
    this._currentDirectory = null;
  };
  s._initMarkup = function () {
    e.prototype._initMarkup.call(this);
    this._initActions();
    if (this._currentDirectory) {
      this._renderMenu();
    }
    this.$element().addClass("dx-filemanager-breadcrumbs");
  };
  s.setCurrentDirectory = function (e) {
    if (!this._areDirsEqual(this._currentDirectory, e)) {
      this._currentDirectory = e;
      this.repaint();
    }
  };
  s._renderMenu = function () {
    var e = (0, i.default)("<div>").appendTo(this.$element());
    this._menu = this._createComponent(e, r.default, {
      dataSource: this._getMenuItems(),
      onItemClick: this._onItemClick.bind(this),
      onItemRendered: this._onItemRendered.bind(this)
    });
  };
  s._getMenuItems = function () {
    var e = this._getParentDirsLine();
    var t = [{
      icon: "arrowup",
      directory: this._currentDirectory.parentDirectory,
      isPathItem: true,
      cssClass: "dx-filemanager-breadcrumbs-parent-folder-item"
    }, {
      text: "\xA0",
      cssClass: "dx-filemanager-breadcrumbs-separator-item"
    }];
    e.forEach(function (n, i) {
      t.push({
        text: n.getDisplayName(),
        directory: n,
        isPathItem: true
      });
      if (i !== e.length - 1) {
        t.push({
          icon: "spinnext",
          cssClass: "dx-filemanager-breadcrumbs-path-separator-item"
        });
      }
    });
    return t;
  };
  s._onItemClick = function (e) {
    var t = e.itemData;
    if (t.isPathItem) {
      var n = t.directory;
      if (!this._areDirsEqual(n, this._currentDirectory)) {
        this._raiseCurrentDirectoryChanged(n);
      }
    }
  };
  s._onItemRendered = function (e) {
    var t = e.itemElement;
    var n = e.itemData;
    if (n.cssClass) {
      (0, i.default)(t).addClass(n.cssClass);
    }
  };
  s._getParentDirsLine = function () {
    for (var e = this._currentDirectory, t = []; e;) {
      t.unshift(e);
      e = e.parentDirectory;
    }
    return t;
  };
  s._areDirsEqual = function (e, t) {
    return e && t && e === t && e.fileItem.key === t.fileItem.key;
  };
  s._initActions = function () {
    this._actions = {
      onCurrentDirectoryChanging: this._createActionByOption("onCurrentDirectoryChanging")
    };
  };
  s._raiseCurrentDirectoryChanged = function (e) {
    this._actions.onCurrentDirectoryChanging({
      currentDirectory: e
    });
  };
  s._getDefaultOptions = function () {
    return (0, o.extend)(e.prototype._getDefaultOptions.call(this), {
      rootFolderDisplayName: "Files",
      onCurrentDirectoryChanging: null
    });
  };
  s._optionChanged = function (t) {
    var n = t.name;
    switch (n) {
      case "rootFolderDisplayName":
        this.repaint();
        break;
      case "onCurrentDirectoryChanging":
        this._actions[n] = this._createActionByOption(n);
        break;
      default:
        e.prototype._optionChanged.call(this, t);
    }
  };
  return a;
}(a.default);
exports.default = u;
module.exports = exports.default;
module.exports.default = exports.default;