exports.default = undefined;
var i = u(require("./68374.js"));
var o = require("./13306.js");
var a = u(require("./28109.js"));
var r = require("./75084.js");
var s = u(require("./62567.js"));
var l = u(require("./48156.js"));
function u(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
function d(e) {
  return function (e) {
    if (Array.isArray(e)) {
      return c(e);
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
      return c(e, t);
    }
    var n = Object.prototype.toString.call(e).slice(8, -1);
    if (n === "Object" && e.constructor) {
      n = e.constructor.name;
    }
    if (n === "Map" || n === "Set") {
      return Array.from(e);
    }
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) {
      return c(e, t);
    }
  }(e) || function () {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }();
}
function c(e, t) {
  if (t == null || t > e.length) {
    t = e.length;
  }
  for (var n = 0, i = new Array(t); n < t; n++) {
    i[n] = e[n];
  }
  return i;
}
function h(e, t) {
  return (h = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (e, t) {
    e.__proto__ = t;
    return e;
  })(e, t);
}
var f = function (e) {
  var t;
  var n;
  function s() {
    return e.apply(this, arguments) || this;
  }
  n = e;
  (t = s).prototype = Object.create(n.prototype);
  t.prototype.constructor = t;
  h(t, n);
  var u = s.prototype;
  u.show = function () {
    var t;
    this._setSelectedDirInfo(null);
    if ((t = this._filesTreeView) !== null && t !== undefined) {
      t.refresh();
    }
    e.prototype.show.call(this);
  };
  u.switchToCopyDialog = function (e) {
    this._targetItemInfos = e;
    this._setTitle(a.default.format("dxFileManager-dialogDirectoryChooserCopyTitle"));
    this._setApplyButtonOptions({
      text: a.default.format("dxFileManager-dialogDirectoryChooserCopyButtonText"),
      disabled: true
    });
  };
  u.switchToMoveDialog = function (e) {
    this._targetItemInfos = e;
    this._setTitle(a.default.format("dxFileManager-dialogDirectoryChooserMoveTitle"));
    this._setApplyButtonOptions({
      text: a.default.format("dxFileManager-dialogDirectoryChooserMoveButtonText"),
      disabled: true
    });
  };
  u._getDialogOptions = function () {
    return (0, o.extend)(e.prototype._getDialogOptions.call(this), {
      contentCssClass: "dx-filemanager-dialog-folder-chooser",
      popupCssClass: "dx-filemanager-dialog-folder-chooser-popup"
    });
  };
  u._createContentTemplate = function (t) {
    var n = this;
    e.prototype._createContentTemplate.call(this, t);
    this._filesTreeView = this._createComponent((0, i.default)("<div>"), l.default, {
      getDirectories: this.option("getDirectories"),
      getCurrentDirectory: function () {
        return n._getDialogSelectedDirectory();
      },
      onDirectoryClick: function (e) {
        return n._onFilesTreeViewDirectoryClick(e);
      },
      onFilesTreeViewContentReady: function () {
        return n._toggleUnavailableLocationsDisabled(true);
      }
    });
    this._$contentElement.append(this._filesTreeView.$element());
  };
  u._getDialogResult = function () {
    var e = this._getDialogSelectedDirectory();
    if (e) {
      return {
        folder: e
      };
    } else {
      return e;
    }
  };
  u._getDefaultOptions = function () {
    return (0, o.extend)(e.prototype._getDefaultOptions.call(this), {
      getItems: null
    });
  };
  u._getDialogSelectedDirectory = function () {
    return this._selectedDirectoryInfo;
  };
  u._onFilesTreeViewDirectoryClick = function (e) {
    var t = e.itemData;
    this._setSelectedDirInfo(t);
    this._filesTreeView.updateCurrentDirectory();
  };
  u._setSelectedDirInfo = function (e) {
    this._selectedDirectoryInfo = e;
    this._setApplyButtonOptions({
      disabled: !e
    });
  };
  u._onPopupShown = function () {
    this._toggleUnavailableLocationsDisabled(true);
    e.prototype._onPopupShown.call(this);
  };
  u._onPopupHidden = function () {
    this._toggleUnavailableLocationsDisabled(false);
    e.prototype._onPopupHidden.call(this);
  };
  u._toggleUnavailableLocationsDisabled = function (e) {
    var t = this;
    if (this._filesTreeView) {
      var n = this._getLocationsToProcess(e);
      this._filesTreeView.toggleDirectoryExpandedStateRecursive(n.locationsToExpand[0], e).then(function () {
        return t._filesTreeView.toggleDirectoryLineExpandedState(n.locationsToCollapse, !e).then(function () {
          return n.locationKeysToDisable.forEach(function (n) {
            return t._filesTreeView.toggleNodeDisabledState(n, e);
          });
        });
      });
    }
  };
  u._getLocationsToProcess = function (e) {
    var t;
    var n = {};
    var i = {};
    this._targetItemInfos.forEach(function (e) {
      if (e.parentDirectory) {
        n[e.parentDirectory.getInternalKey()] = e.parentDirectory;
      }
      if (e.fileItem.isDirectory) {
        i[e.getInternalKey()] = e;
      }
    });
    var o = (0, r.getMapFromObject)(n);
    var a = (0, r.getMapFromObject)(i);
    return {
      locationsToExpand: e ? o.values : [],
      locationsToCollapse: e ? a.values : [],
      locationKeysToDisable: (t = o.keys).concat.apply(t, d(a.keys))
    };
  };
  return s;
}(s.default);
exports.default = f;
module.exports = exports.default;
module.exports.default = exports.default;