exports.default = undefined;
var i = require("./20576.js");
var o = require("./47617.js");
var a = _(require("./73176.js"));
var r = require("./35922.js");
var s = require("./18438.js");
var l = require("./62754.js");
var u = require("./58201.js");
var d = require("./48351.js");
var c = _(require("./96688.js"));
var h = _(require("./97405.js"));
var f = _(require("./19073.js"));
var p = _(require("./49816.js"));
var g = _(require("./41011.js"));
var m = require("./73173.js");
function _(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
function v(e, t) {
  return (v = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (e, t) {
    e.__proto__ = t;
    return e;
  })(e, t);
}
var y = (0, u.getWindow)();
var b = function (e) {
  var t;
  var n;
  function u(t) {
    var n;
    t = (0, i.ensureDefined)(t, {});
    n = e.call(this, t) || this;
    var a = t.data;
    if (a && !Array.isArray(a)) {
      throw s.errors.Error("E4006");
    }
    var r = t.itemsExpr || "items";
    n._subFileItemsGetter = (0, o.compileGetter)(r);
    n._subFileItemsSetter = n._getSetter(r);
    var l = t.contentExpr || "content";
    n._contentGetter = (0, o.compileGetter)(l);
    n._contentSetter = n._getSetter(l);
    var u = n._getNameExpr(t);
    n._nameSetter = n._getSetter(u);
    var d = n._getIsDirExpr(t);
    n._getIsDirSetter = n._getSetter(d);
    var c = n._getKeyExpr(t);
    n._keySetter = n._getSetter(c);
    var h = n._getSizeExpr(t);
    n._sizeSetter = n._getSetter(h);
    var f = n._getDateModifiedExpr(t);
    n._dateModifiedSetter = n._getSetter(f);
    n._data = a || [];
    return n;
  }
  n = e;
  (t = u).prototype = Object.create(n.prototype);
  t.prototype.constructor = t;
  v(t, n);
  var f = u.prototype;
  f.getItems = function (e) {
    var t = this;
    return this._executeActionAsDeferred(function () {
      return t._getItems(e);
    }, true);
  };
  f.renameItem = function (e, t) {
    var n = this;
    return this._executeActionAsDeferred(function () {
      return n._renameItemCore(e, t);
    });
  };
  f._renameItemCore = function (e, t) {
    if (e) {
      var n = this._findDataObject(e);
      this._nameSetter(n, t);
      e.name = t;
      e.key = this._ensureDataObjectKey(n);
    }
  };
  f.createDirectory = function (e, t) {
    var n = this;
    return this._executeActionAsDeferred(function () {
      n._validateDirectoryExists(e);
      n._createDataObject(e, t, true);
    });
  };
  f.deleteItems = function (e) {
    var t = this;
    return e.map(function (e) {
      return t._executeActionAsDeferred(function () {
        return t._deleteItem(e);
      });
    });
  };
  f.moveItems = function (e, t) {
    var n = this;
    var i = this._findDataObject(t);
    var o = this._getDirectoryDataItems(i);
    return e.map(function (e) {
      return n._executeActionAsDeferred(function () {
        n._checkAbilityToMoveOrCopyItem(e, t);
        var i = n._findDataObject(e);
        n._deleteItem(e);
        o.push(i);
      });
    });
  };
  f.copyItems = function (e, t) {
    var n = this;
    var i = this._findDataObject(t);
    var o = this._getDirectoryDataItems(i);
    return e.map(function (e) {
      return n._executeActionAsDeferred(function () {
        n._checkAbilityToMoveOrCopyItem(e, t);
        var i = n._findDataObject(e);
        var a = n._createCopy(i);
        o.push(a);
      });
    });
  };
  f.uploadFileChunk = function (e, t, n) {
    var i = this;
    if (t.chunkIndex > 0) {
      return t.customData.deferred;
    }
    this._validateDirectoryExists(n);
    var o = t.customData.deferred = new l.Deferred();
    var a = this._createFileReader();
    a.readAsDataURL(e);
    a.onload = function () {
      var t = a.result.split(",")[1];
      var r = i._createDataObject(n, e.name, false);
      i._sizeSetter(r, e.size);
      i._dateModifiedSetter(r, e.lastModifiedDate);
      i._contentSetter(r, t);
      o.resolve();
    };
    a.onerror = function (e) {
      return o.reject(e);
    };
    return o;
  };
  f.downloadItems = function (e) {
    if (e.length === 1) {
      this._downloadSingleFile(e[0]);
    } else {
      this._downloadMultipleFiles(e);
    }
  };
  f._downloadSingleFile = function (e) {
    var t = this._getFileContent(e);
    for (var n = y.atob(t), i = new ArrayBuffer(n.length), o = new Uint8Array(i), a = 0; a < n.length; a++) {
      o[a] = n.charCodeAt(a);
    }
    var r = new y.Blob([i], {
      type: "application/octet-stream"
    });
    d.fileSaver.saveAs(e.name, null, r);
  };
  f._downloadMultipleFiles = function (e) {
    var t = this;
    var n = new (function () {
      if (!h.default) {
        throw c.default.Error("E1041", "JSZip");
      }
      return h.default;
    }())();
    e.forEach(function (e) {
      return n.file(e.name, t._getFileContent(e), {
        base64: true
      });
    });
    var i = {
      type: "blob",
      compression: "DEFLATE",
      mimeType: "application/zip"
    };
    var o = new l.Deferred();
    if (n.generateAsync) {
      n.generateAsync(i).then(o.resolve);
    } else {
      o.resolve(n.generate(i));
    }
    o.done(function (e) {
      return d.fileSaver.saveAs("files.zip", null, e);
    });
  };
  f._getFileContent = function (e) {
    var t = this._findDataObject(e);
    return this._contentGetter(t) || "";
  };
  f._validateDirectoryExists = function (e) {
    if (!this._isFileItemExists(e) || this._isDirGetter(e.fileItem)) {
      throw new p.default(g.default.DirectoryNotFound, e);
    }
  };
  f._checkAbilityToMoveOrCopyItem = function (e, t) {
    var n = this;
    var i = this._findDataObject(e);
    var o = this._getKeyFromDataObject(i, e.parentPath);
    var a = t.getFullPathInfo();
    var r = "";
    a.forEach(function (t) {
      r = (0, m.pathCombine)(r, t.name);
      if (n._getDataObjectKey(t.key, r) === o) {
        throw new p.default(g.default.Other, e);
      }
    });
  };
  f._createDataObject = function (e, t, n) {
    var i = {};
    this._nameSetter(i, t);
    this._getIsDirSetter(i, n);
    this._keySetter(i, String(new a.default()));
    var o = this._findDataObject(e);
    this._getDirectoryDataItems(o).push(i);
    return i;
  };
  f._createCopy = function (e) {
    var t = this;
    var n = {};
    this._nameSetter(n, this._nameGetter(e));
    this._getIsDirSetter(n, this._isDirGetter(e));
    var i = this._subFileItemsGetter(e);
    if (Array.isArray(i)) {
      var o = [];
      i.forEach(function (e) {
        var n = t._createCopy(e);
        o.push(n);
      });
      this._subFileItemsSetter(n, o);
    }
    return n;
  };
  f._deleteItem = function (e) {
    var t = this._findDataObject(e);
    var n = this._findFileItemObj(e.pathInfo);
    var i = this._getDirectoryDataItems(n);
    var o = i.indexOf(t);
    i.splice(o, 1);
  };
  f._getDirectoryDataItems = function (e) {
    if (!e) {
      return this._data;
    }
    var t = this._subFileItemsGetter(e);
    if (!Array.isArray(t)) {
      t = [];
      this._subFileItemsSetter(e, t);
    }
    return t;
  };
  f._getItems = function (e) {
    this._validateDirectoryExists(e);
    var t = e.getFullPathInfo();
    var n = t && t.length > 0 ? t[t.length - 1].key : null;
    var i = this._data;
    if (n) {
      var o = this._findFileItemObj(t);
      i = o && this._subFileItemsGetter(o) || [];
    }
    this._ensureKeysForDuplicateNameItems(i);
    return this._convertDataObjectsToFileItems(i, t);
  };
  f._ensureKeysForDuplicateNameItems = function (e) {
    var t = this;
    var n = {};
    e.forEach(function (e) {
      var i = t._nameGetter(e);
      if (n[i]) {
        t._ensureDataObjectKey(e);
      } else {
        n[i] = true;
      }
    });
  };
  f._findDataObject = function (e) {
    if (e.isRoot()) {
      return null;
    }
    var t = this._findFileItemObj(e.getFullPathInfo());
    if (!t) {
      var n = e.isDirectory ? g.default.DirectoryNotFound : g.default.FileNotFound;
      throw new p.default(n, e);
    }
    return t;
  };
  f._findFileItemObj = function (e) {
    var t = this;
    if (!Array.isArray(e)) {
      e = [];
    }
    var n = "";
    for (var i = null, o = this._data, a = function (a) {
        if (i = o.find(function (i) {
          var o = t._isDirGetter(i) || a === e.length - 1;
          return t._getKeyFromDataObject(i, n) === e[a].key && t._nameGetter(i) === e[a].name && o;
        })) {
          n = (0, m.pathCombine)(n, t._nameGetter(i));
          o = t._subFileItemsGetter(i);
        }
      }, r = 0; r < e.length && (r === 0 || i); r++) {
      a(r);
    }
    return i;
  };
  f._getKeyFromDataObject = function (e, t) {
    var n = this._keyGetter(e);
    var i = (0, m.pathCombine)(t, this._nameGetter(e));
    return this._getDataObjectKey(n, i);
  };
  f._getDataObjectKey = function (e, t) {
    return e || t;
  };
  f._ensureDataObjectKey = function (e) {
    var t = this._keyGetter(e);
    if (!t) {
      t = String(new a.default());
      this._keySetter(e, t);
    }
    return t;
  };
  f._hasSubDirs = function (e) {
    var t = (0, i.ensureDefined)(this._subFileItemsGetter(e), []);
    if (!Array.isArray(t)) {
      return true;
    }
    for (var n = 0; n < t.length; n++) {
      if (this._isDirGetter(t[n]) === true) {
        return true;
      }
    }
    return false;
  };
  f._getSetter = function (e) {
    if ((0, r.isFunction)(e)) {
      return e;
    } else {
      return (0, o.compileSetter)(e);
    }
  };
  f._isFileItemExists = function (e) {
    return e.isDirectory && e.isRoot() || !!this._findFileItemObj(e.getFullPathInfo());
  };
  f._createFileReader = function () {
    return new y.FileReader();
  };
  return u;
}(f.default);
exports.default = b;
module.exports = exports.default;
module.exports.default = exports.default;