exports.default = undefined;
var i = require("./47617.js");
var o = require("./20576.js");
var a = d(require("./69434.js"));
var r = require("./95479.js");
var s = require("./35922.js");
var l = require("./62754.js");
var u = d(require("./45765.js"));
function d(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
var c = function () {
  function e(e) {
    e = (0, o.ensureDefined)(e, {});
    this._keyGetter = (0, i.compileGetter)(this._getKeyExpr(e));
    this._nameGetter = (0, i.compileGetter)(this._getNameExpr(e));
    this._isDirGetter = (0, i.compileGetter)(this._getIsDirExpr(e));
    this._sizeGetter = (0, i.compileGetter)(this._getSizeExpr(e));
    this._dateModifiedGetter = (0, i.compileGetter)(this._getDateModifiedExpr(e));
    this._thumbnailGetter = (0, i.compileGetter)(e.thumbnailExpr || "thumbnail");
  }
  var t = e.prototype;
  t.getItems = function (e) {
    return [];
  };
  t.renameItem = function (e, t) {};
  t.createDirectory = function (e, t) {};
  t.deleteItems = function (e) {};
  t.moveItems = function (e, t) {};
  t.copyItems = function (e, t) {};
  t.uploadFileChunk = function (e, t, n) {};
  t.abortFileUpload = function (e, t, n) {};
  t.downloadItems = function (e) {};
  t.getItemsContent = function (e) {};
  t.getFileUploadChunkSize = function () {
    return 200000;
  };
  t._convertDataObjectsToFileItems = function (e, t) {
    var n = this;
    var i = [];
    (0, r.each)(e, function (e, o) {
      var a = n._createFileItem(o, t);
      i.push(a);
    });
    return i;
  };
  t._createFileItem = function (e, t) {
    var n = this._keyGetter(e);
    var i = new u.default(t, this._nameGetter(e), !!this._isDirGetter(e), n);
    i.size = this._sizeGetter(e);
    if (i.size === undefined) {
      i.size = 0;
    }
    i.dateModified = a.default.deserializeDate(this._dateModifiedGetter(e));
    if (i.dateModified === undefined) {
      i.dateModified = new Date();
    }
    if (i.isDirectory) {
      i.hasSubDirectories = this._hasSubDirs(e);
    }
    if (!n) {
      i.key = i.relativeName;
    }
    i.thumbnail = this._thumbnailGetter(e) || "";
    i.dataItem = e;
    return i;
  };
  t._hasSubDirs = function (e) {
    return true;
  };
  t._getKeyExpr = function (e) {
    return e.keyExpr || this._defaultKeyExpr;
  };
  t._defaultKeyExpr = function (e) {
    if (arguments.length !== 2) {
      if (Object.prototype.hasOwnProperty.call(e, "__KEY__")) {
        return e.__KEY__;
      } else {
        return null;
      }
    }
    e.__KEY__ = arguments[1];
  };
  t._getNameExpr = function (e) {
    return e.nameExpr || "name";
  };
  t._getIsDirExpr = function (e) {
    return e.isDirectoryExpr || "isDirectory";
  };
  t._getSizeExpr = function (e) {
    return e.sizeExpr || "size";
  };
  t._getDateModifiedExpr = function (e) {
    return e.dateModifiedExpr || "dateModified";
  };
  t._executeActionAsDeferred = function (e, t) {
    var n = new l.Deferred();
    try {
      var i = e();
      if ((0, s.isPromise)(i)) {
        (0, l.fromPromise)(i).done(function (e) {
          return n.resolve(t && e || undefined);
        }).fail(function (e) {
          return n.reject(e);
        });
      } else {
        n.resolve(t && i || undefined);
      }
    } catch (e) {
      return n.reject(e);
    }
    return n.promise();
  };
  return e;
}();
exports.default = c;
module.exports = exports.default;
module.exports.default = exports.default;