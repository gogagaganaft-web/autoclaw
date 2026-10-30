exports.defaultPermissions = exports.FileManagerCommandManager = undefined;
var i;
var o = require("./13306.js");
var a = require("./95479.js");
var r = require("./35922.js");
var s = (i = require("./28109.js")) && i.__esModule ? i : {
  default: i
};
var l = {
  create: false,
  copy: false,
  move: false,
  delete: false,
  rename: false,
  upload: false,
  download: false
};
exports.defaultPermissions = l;
var u = function () {
  function e(e) {
    this._actions = {};
    this._permissions = e || {};
    this._initCommands();
  }
  var t = e.prototype;
  t._initCommands = function () {
    var e = this;
    this._commands = [{
      name: "create",
      text: s.default.format("dxFileManager-commandCreate"),
      icon: "newfolder",
      enabled: this._permissions.create,
      noFileItemRequired: true
    }, {
      name: "rename",
      text: s.default.format("dxFileManager-commandRename"),
      icon: "rename",
      enabled: this._permissions.rename,
      isSingleFileItemCommand: true
    }, {
      name: "move",
      text: s.default.format("dxFileManager-commandMove"),
      icon: "movetofolder",
      enabled: this._permissions.move
    }, {
      name: "copy",
      text: s.default.format("dxFileManager-commandCopy"),
      icon: "copy",
      enabled: this._permissions.copy
    }, {
      name: "delete",
      text: s.default.format("dxFileManager-commandDelete"),
      icon: "trash",
      enabled: this._permissions.delete
    }, {
      name: "download",
      text: s.default.format("dxFileManager-commandDownload"),
      icon: "download",
      enabled: this._permissions.download
    }, {
      name: "upload",
      text: s.default.format("dxFileManager-commandUpload"),
      icon: "upload",
      enabled: this._permissions.upload,
      noFileItemRequired: true
    }, {
      name: "refresh",
      text: s.default.format("dxFileManager-commandRefresh"),
      icon: "dx-filemanager-i dx-filemanager-i-refresh",
      enabled: true,
      noFileItemRequired: true
    }, {
      name: "thumbnails",
      text: s.default.format("dxFileManager-commandThumbnails"),
      icon: "mediumiconslayout",
      enabled: true,
      noFileItemRequired: true
    }, {
      name: "details",
      text: s.default.format("dxFileManager-commandDetails"),
      icon: "detailslayout",
      enabled: true,
      noFileItemRequired: true
    }, {
      name: "clearSelection",
      text: s.default.format("dxFileManager-commandClearSelection"),
      icon: "remove",
      enabled: true
    }, {
      name: "showNavPane",
      hint: s.default.format("dxFileManager-commandShowNavPane"),
      icon: "menu",
      enabled: false,
      noFileItemRequired: true
    }];
    this._commandMap = {};
    this._commands.forEach(function (t) {
      e._commandMap[t.name] = t;
    });
  };
  t.registerActions = function (e) {
    this._actions = (0, o.extend)(this._actions, e);
  };
  t.executeCommand = function (e, t) {
    var n = (0, r.isString)(e) ? e : e.name;
    var i = this._actions[n];
    if (i) {
      return i(t);
    }
  };
  t.updatePermissions = function (e) {
    var t = this;
    var n = (0, o.extend)({}, l, e);
    this._permissions = n;
    (0, a.each)(this._permissions, function (e) {
      t._commandMap[e].enabled = t._permissions[e];
    });
  };
  t.setCommandEnabled = function (e, t) {
    var n = this.getCommandByName(e);
    if (n) {
      n.enabled = t;
    }
  };
  t.getCommandByName = function (e) {
    return this._commandMap[e];
  };
  t.isCommandAvailable = function (e, t) {
    var n = this.getCommandByName(e);
    if (!n || !n.enabled) {
      return false;
    }
    if (n.noFileItemRequired) {
      return true;
    }
    var i = t && t.length || 0;
    return i !== 0 && !t.some(function (e) {
      return e.fileItem.isRoot() || e.fileItem.isParentFolder;
    }) && (e === "download" ? t.every(function (e) {
      return !e.fileItem.isDirectory;
    }) : !n.isSingleFileItemCommand || i === 1);
  };
  return e;
}();
exports.FileManagerCommandManager = u;