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
var o = g(require("./68374.js"));
var a = g(require("./37208.js"));
var r = require("./20576.js");
var s = g(require("./73176.js"));
var l = require("./58201.js");
var u = require("./95479.js");
var d = require("./62754.js");
var c = g(require("./55994.js"));
var h = g(require("./19073.js"));
var f = require("./47617.js");
var p = require("./35922.js");
function g(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
function m(e, t, n) {
  if ((t = function (e) {
    var t = function (e, t) {
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
    }(e, "string");
    if (i(t) === "symbol") {
      return t;
    } else {
      return String(t);
    }
  }(t)) in e) {
    Object.defineProperty(e, t, {
      value: n,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    e[t] = n;
  }
  return e;
}
function _(e, t) {
  return (_ = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (e, t) {
    e.__proto__ = t;
    return e;
  })(e, t);
}
var v = (0, l.getWindow)();
var y = "GetDirContents";
var b = "CreateDir";
var x = "Rename";
var w = "Move";
var C = "Copy";
var S = "Remove";
var k = "UploadChunk";
var D = "AbortUpload";
var I = "Download";
var T = "GET";
var E = "POST";
var O = function (e) {
  var t;
  var n;
  function i(t) {
    var n;
    t = (0, r.ensureDefined)(t, {});
    (n = e.call(this, t) || this)._endpointUrl = t.endpointUrl;
    n._beforeAjaxSend = t.beforeAjaxSend;
    n._beforeSubmit = t.beforeSubmit;
    n._requestHeaders = t.requestHeaders;
    n._hasSubDirsGetter = (0, f.compileGetter)(t.hasSubDirectoriesExpr || "hasSubDirectories");
    return n;
  }
  n = e;
  (t = i).prototype = Object.create(n.prototype);
  t.prototype.constructor = t;
  _(t, n);
  var l = i.prototype;
  l.getItems = function (e) {
    var t = this;
    var n = e.getFullPathInfo();
    return this._executeRequest(y, {
      pathInfo: n
    }).then(function (e) {
      return t._convertDataObjectsToFileItems(e.result, n);
    });
  };
  l.renameItem = function (e, t) {
    return this._executeRequest(x, {
      pathInfo: e.getFullPathInfo(),
      isDirectory: e.isDirectory,
      name: t
    });
  };
  l.createDirectory = function (e, t) {
    return this._executeRequest(b, {
      pathInfo: e.getFullPathInfo(),
      name: t
    });
  };
  l.deleteItems = function (e) {
    var t = this;
    return e.map(function (e) {
      return t._executeRequest(S, {
        pathInfo: e.getFullPathInfo(),
        isDirectory: e.isDirectory
      });
    });
  };
  l.moveItems = function (e, t) {
    var n = this;
    return e.map(function (e) {
      return n._executeRequest(w, {
        sourcePathInfo: e.getFullPathInfo(),
        sourceIsDirectory: e.isDirectory,
        destinationPathInfo: t.getFullPathInfo()
      });
    });
  };
  l.copyItems = function (e, t) {
    var n = this;
    return e.map(function (e) {
      return n._executeRequest(C, {
        sourcePathInfo: e.getFullPathInfo(),
        sourceIsDirectory: e.isDirectory,
        destinationPathInfo: t.getFullPathInfo()
      });
    });
  };
  l.uploadFileChunk = function (e, t, n) {
    var i;
    if (t.chunkIndex === 0) {
      t.customData.uploadId = new s.default();
    }
    var o = {
      destinationPathInfo: n.getFullPathInfo(),
      chunkMetadata: JSON.stringify({
        UploadId: t.customData.uploadId,
        FileName: e.name,
        Index: t.chunkIndex,
        TotalCount: t.chunkCount,
        FileSize: e.size
      })
    };
    var l = {
      url: this._endpointUrl,
      headers: this._requestHeaders || {},
      method: E,
      dataType: "json",
      data: (i = {}, m(i, "chunk", t.chunkBlob), m(i, "arguments", JSON.stringify(o)), m(i, "command", k), i),
      upload: {
        onprogress: r.noop,
        onloadstart: r.noop,
        onabort: r.noop
      },
      xhrFields: {},
      cache: false
    };
    var u = new d.Deferred();
    this._beforeSendInternal(l);
    a.default.sendRequest(l).done(function (e) {
      if (!!e.success || !u.reject(e)) {
        u.resolve();
      }
    }).fail(u.reject);
    return u.promise();
  };
  l.abortFileUpload = function (e, t, n) {
    return this._executeRequest(D, {
      uploadId: t.customData.uploadId
    });
  };
  l.downloadItems = function (e) {
    var t = this._getDownloadArgs(e);
    var n = (0, o.default)("<form>").css({
      display: "none"
    }).attr({
      method: E,
      action: t.url
    });
    var i = {
      command: t.command,
      arguments: t.arguments
    };
    this._beforeSubmitInternal(i);
    this._appendFormDataInputsToForm(i, n);
    n.appendTo("body");
    c.default.trigger(n, "submit");
    setTimeout(function () {
      return n.remove();
    });
  };
  l.getItemsContent = function (e) {
    var t = this._getDownloadArgs(e);
    var n = {
      url: t.url,
      headers: this._requestHeaders || {},
      method: E,
      responseType: "arraybuffer",
      data: {
        command: t.command,
        arguments: t.arguments
      },
      upload: {
        onprogress: r.noop,
        onloadstart: r.noop,
        onabort: r.noop
      },
      xhrFields: {},
      cache: false
    };
    this._beforeSendInternal(n);
    return a.default.sendRequest(n);
  };
  l._getDownloadArgs = function (e) {
    var t = {
      pathInfoList: e.map(function (e) {
        return e.getFullPathInfo();
      })
    };
    var n = JSON.stringify(t);
    return {
      url: this._endpointUrl,
      arguments: n,
      command: I
    };
  };
  l._getItemsIds = function (e) {
    return e.map(function (e) {
      return e.relativeName;
    });
  };
  l._executeRequest = function (e, t) {
    var n = e === y ? T : E;
    var i = new d.Deferred();
    var o = {
      url: this._getEndpointUrl(e, t),
      headers: this._requestHeaders || {},
      method: n,
      dataType: "json",
      data: {},
      xhrFields: {},
      cache: false
    };
    this._beforeSendInternal(o);
    a.default.sendRequest(o).then(function (e) {
      if (!!e.success || !i.reject(e)) {
        i.resolve(e);
      }
    }, function (e) {
      return i.reject(e);
    });
    return i.promise();
  };
  l._beforeSubmitInternal = function (e) {
    if ((0, p.isFunction)(this._beforeSubmit)) {
      this._beforeSubmit({
        formData: e
      });
    }
  };
  l._beforeSendInternal = function (e) {
    if ((0, p.isFunction)(this._beforeAjaxSend)) {
      var t = {
        headers: e.headers,
        formData: e.data,
        xhrFields: e.xhrFields
      };
      this._beforeAjaxSend(t);
      e.headers = t.headers;
      e.data = t.formData;
      e.xhrFields = t.xhrFields;
    }
    if ((0, p.isEmptyObject)(e.data)) {
      delete e.data;
    } else if (e.responseType || e.upload) {
      e.data = this._createFormData(e.data);
    }
  };
  l._createFormData = function (e) {
    var t = new v.FormData();
    for (var n in e) {
      if (Object.prototype.hasOwnProperty.call(e, n) && (0, p.isDefined)(e[n])) {
        t.append(n, e[n]);
      }
    }
    return t;
  };
  l._appendFormDataInputsToForm = function (e, t) {
    for (var n in e) {
      if (Object.prototype.hasOwnProperty.call(e, n) && (0, p.isDefined)(e[n])) {
        (0, o.default)("<input>").attr({
          type: "hidden",
          name: n,
          value: e[n]
        }).appendTo(t);
      }
    }
  };
  l._getEndpointUrl = function (e, t) {
    var n = this._getQueryString({
      command: e,
      arguments: JSON.stringify(t)
    });
    var i = this._endpointUrl && this._endpointUrl.indexOf("?") > 0 ? "&" : "?";
    return this._endpointUrl + i + n;
  };
  l._getQueryString = function (e) {
    var t = [];
    for (var n = Object.keys(e), i = 0; i < n.length; i++) {
      var o = n[i];
      var a = e[o];
      if (a !== undefined) {
        if (a === null) {
          a = "";
        }
        if (Array.isArray(a)) {
          this._processQueryStringArrayParam(o, a, t);
        } else {
          var r = this._getQueryStringPair(o, a);
          t.push(r);
        }
      }
    }
    return t.join("&");
  };
  l._processQueryStringArrayParam = function (e, t, n) {
    var i = this;
    (0, u.each)(t, function (t, o) {
      var a = i._getQueryStringPair(e, o);
      n.push(a);
    });
  };
  l._getQueryStringPair = function (e, t) {
    return encodeURIComponent(e) + "=" + encodeURIComponent(t);
  };
  l._hasSubDirs = function (e) {
    var t = this._hasSubDirsGetter(e);
    return typeof t != "boolean" || t;
  };
  l._getKeyExpr = function (e) {
    return e.keyExpr || "key";
  };
  return i;
}(h.default);
exports.default = O;
module.exports = exports.default;
module.exports.default = exports.default;