exports.default = undefined;
var i = u(require("./68374.js"));
var o = require("./13306.js");
var a = u(require("./28109.js"));
var r = u(require("./83044.js"));
var s = u(require("./5760.js"));
var l = u(require("./76650.js"));
function u(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
var d = function () {
  function e(e, t) {
    this._$element = e;
    this._options = t;
    var n = {
      onClosed: this._options.onDialogClosed,
      rtlEnabled: this._options.rtlEnabled
    };
    var u = (0, i.default)("<div>").appendTo(this._$element);
    this._chooseDirectoryDialog = new s.default(u, (0, o.extend)(n, this._options.chooseDirectoryDialog));
    var d = (0, i.default)("<div>").appendTo(this._$element);
    this._renameItemDialog = new r.default(d, (0, o.extend)(n, {
      title: a.default.format("dxFileManager-dialogRenameItemTitle"),
      buttonText: a.default.format("dxFileManager-dialogRenameItemButtonText")
    }));
    var c = (0, i.default)("<div>").appendTo(this._$element);
    this._createItemDialog = new r.default(c, (0, o.extend)(n, {
      title: a.default.format("dxFileManager-dialogCreateDirectoryTitle"),
      buttonText: a.default.format("dxFileManager-dialogCreateDirectoryButtonText")
    }));
    var h = (0, i.default)("<div>").appendTo(this._$element);
    this._deleteItemDialog = new l.default(h, n);
  }
  var t = e.prototype;
  t.getCopyDialog = function (e) {
    this._chooseDirectoryDialog.switchToCopyDialog(e);
    return this._chooseDirectoryDialog;
  };
  t.getMoveDialog = function (e) {
    this._chooseDirectoryDialog.switchToMoveDialog(e);
    return this._chooseDirectoryDialog;
  };
  t.getRenameItemDialog = function () {
    return this._renameItemDialog;
  };
  t.getCreateItemDialog = function () {
    return this._createItemDialog;
  };
  t.getDeleteItemDialog = function () {
    return this._deleteItemDialog;
  };
  t.updateDialogRtl = function (e) {
    [this._chooseDirectoryDialog, this._renameItemDialog, this._createItemDialog, this._deleteItemDialog].forEach(function (t) {
      t.option("rtlEnabled", e);
    });
  };
  return e;
}();
exports.default = d;
module.exports = exports.default;
module.exports.default = exports.default;