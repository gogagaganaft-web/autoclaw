exports.default = undefined;
var i;
var o = require("./20576.js");
var a = require("./35922.js");
var r = require("./47617.js");
function s(e, t) {
  return (s = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (e, t) {
    e.__proto__ = t;
    return e;
  })(e, t);
}
var l = function (e) {
  var t;
  var n;
  function i(t) {
    var n;
    t = (0, o.ensureDefined)(t, {});
    (n = e.call(this, t) || this)._hasSubDirsGetter = (0, r.compileGetter)(t.hasSubDirectoriesExpr || "hasSubDirectories");
    n._getItemsFunction = n._ensureFunction(t.getItems, function () {
      return [];
    });
    n._renameItemFunction = n._ensureFunction(t.renameItem);
    n._createDirectoryFunction = n._ensureFunction(t.createDirectory);
    n._deleteItemFunction = n._ensureFunction(t.deleteItem);
    n._moveItemFunction = n._ensureFunction(t.moveItem);
    n._copyItemFunction = n._ensureFunction(t.copyItem);
    n._uploadFileChunkFunction = n._ensureFunction(t.uploadFileChunk);
    n._abortFileUploadFunction = n._ensureFunction(t.abortFileUpload);
    n._downloadItemsFunction = n._ensureFunction(t.downloadItems);
    n._getItemsContentFunction = n._ensureFunction(t.getItemsContent);
    return n;
  }
  n = e;
  (t = i).prototype = Object.create(n.prototype);
  t.prototype.constructor = t;
  s(t, n);
  var l = i.prototype;
  l.getItems = function (e) {
    var t = this;
    var n = e.getFullPathInfo();
    return this._executeActionAsDeferred(function () {
      return t._getItemsFunction(e);
    }, true).then(function (e) {
      return t._convertDataObjectsToFileItems(e, n);
    });
  };
  l.renameItem = function (e, t) {
    var n = this;
    return this._executeActionAsDeferred(function () {
      return n._renameItemFunction(e, t);
    });
  };
  l.createDirectory = function (e, t) {
    var n = this;
    return this._executeActionAsDeferred(function () {
      return n._createDirectoryFunction(e, t);
    });
  };
  l.deleteItems = function (e) {
    var t = this;
    return e.map(function (e) {
      return t._executeActionAsDeferred(function () {
        return t._deleteItemFunction(e);
      });
    });
  };
  l.moveItems = function (e, t) {
    var n = this;
    return e.map(function (e) {
      return n._executeActionAsDeferred(function () {
        return n._moveItemFunction(e, t);
      });
    });
  };
  l.copyItems = function (e, t) {
    var n = this;
    return e.map(function (e) {
      return n._executeActionAsDeferred(function () {
        return n._copyItemFunction(e, t);
      });
    });
  };
  l.uploadFileChunk = function (e, t, n) {
    var i = this;
    return this._executeActionAsDeferred(function () {
      return i._uploadFileChunkFunction(e, t, n);
    });
  };
  l.abortFileUpload = function (e, t, n) {
    var i = this;
    return this._executeActionAsDeferred(function () {
      return i._abortFileUploadFunction(e, t, n);
    });
  };
  l.downloadItems = function (e) {
    var t = this;
    return this._executeActionAsDeferred(function () {
      return t._downloadItemsFunction(e);
    });
  };
  l.getItemsContent = function (e) {
    var t = this;
    return this._executeActionAsDeferred(function () {
      return t._getItemsContentFunction(e);
    });
  };
  l._hasSubDirs = function (e) {
    var t = this._hasSubDirsGetter(e);
    return typeof t != "boolean" || t;
  };
  l._getKeyExpr = function (e) {
    return e.keyExpr || "key";
  };
  l._ensureFunction = function (e, t) {
    t = t || o.noop;
    if ((0, a.isFunction)(e)) {
      return e;
    } else {
      return t;
    }
  };
  return i;
}(((i = require("./19073.js")) && i.__esModule ? i : {
  default: i
}).default);
exports.default = l;
module.exports = exports.default;
module.exports.default = exports.default;