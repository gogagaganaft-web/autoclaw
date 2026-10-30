exports.fileSaver = exports.MIME_TYPES = undefined;
var i = l(require("./73349.js"));
var o = require("./58201.js");
var a = l(require("./96688.js"));
var r = require("./35922.js");
var s = require("./30869.js");
function l(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
var u = (0, o.getWindow)();
var d = (0, o.getNavigator)();
var c = {
  EXCEL: "xlsx",
  CSS: "css",
  PNG: "png",
  JPEG: "jpeg",
  GIF: "gif",
  SVG: "svg",
  PDF: "pdf"
};
var h = {
  CSS: "text/css",
  EXCEL: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  PNG: "image/png",
  JPEG: "image/jpeg",
  GIF: "image/gif",
  SVG: "image/svg+xml",
  PDF: "application/pdf"
};
exports.MIME_TYPES = h;
var f = {
  _revokeObjectURLTimeout: 30000,
  _getDataUri: function (e, t) {
    var n = this._getMimeType(e);
    return `data:${n};base64,${t}`;
  },
  _getMimeType: function (e) {
    return h[e] || "application/octet-stream";
  },
  _linkDownloader: function (e, t) {
    var n = i.default.createElement("a");
    n.download = e;
    n.href = t;
    n.target = "_blank";
    return n;
  },
  _winJSBlobSave: function (e, t, n) {
    var i = new Windows.Storage.Pickers.FileSavePicker();
    i.suggestedStartLocation = Windows.Storage.Pickers.PickerLocationId.documentsLibrary;
    var o = c[n];
    if (o) {
      var a = this._getMimeType(n);
      i.fileTypeChoices.insert(a, ["." + o]);
    }
    i.suggestedFileName = t;
    i.pickSaveFileAsync().then(function (t) {
      if (t) {
        t.openAsync(Windows.Storage.FileAccessMode.readWrite).then(function (t) {
          var n = e.msDetachStream();
          Windows.Storage.Streams.RandomAccessStream.copyAsync(n, t).then(function () {
            t.flushAsync().done(function () {
              n.close();
              t.close();
            });
          });
        });
      }
    });
  },
  _click: function (e) {
    try {
      e.dispatchEvent(new MouseEvent("click", {
        cancelable: true
      }));
    } catch (n) {
      var t = i.default.getDocument().createEvent("MouseEvents");
      t.initMouseEvent("click", true, true, u, 0, 0, 0, 80, 20, false, false, false, false, 0, null);
      e.dispatchEvent(t);
    }
  },
  _saveBlobAs: function (e, t, n) {
    var i = this;
    this._blobSaved = false;
    if ((0, r.isDefined)(d.msSaveOrOpenBlob)) {
      d.msSaveOrOpenBlob(n, e);
      this._blobSaved = true;
    } else if ((0, r.isDefined)(u.WinJS)) {
      this._winJSBlobSave(n, e, t);
      this._blobSaved = true;
    } else {
      var o = u.URL || u.webkitURL || u.mozURL || u.msURL || u.oURL;
      if ((0, r.isDefined)(o)) {
        var a = o.createObjectURL(n);
        var l = this._linkDownloader(e, a);
        setTimeout(function () {
          o.revokeObjectURL(a);
          i._objectUrlRevoked = true;
        }, this._revokeObjectURLTimeout);
        this._click(l);
      } else {
        s.logger.warn("window.URL || window.webkitURL || window.mozURL || window.msURL || window.oURL is not defined");
      }
    }
  },
  saveAs: function (e, t, n) {
    var i = c[t];
    if (i) {
      e += "." + i;
    }
    if ((0, r.isFunction)(u.Blob)) {
      this._saveBlobAs(e, t, n);
    } else {
      if (!(0, r.isDefined)(d.userAgent.match(/iPad/i))) {
        a.default.log("E1034");
      }
      var o = this._linkDownloader(e, this._getDataUri(t, n));
      this._click(o);
    }
  }
};
exports.fileSaver = f;