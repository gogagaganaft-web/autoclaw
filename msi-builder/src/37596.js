exports.getData = function (e, t) {
  return h.getData(e, t);
};
exports.svgCreator = undefined;
var i = d(require("./68374.js"));
var o = d(require("./37208.js"));
var a = require("./58201.js");
var r = require("./35922.js");
var s = require("./95479.js");
var l = require("./19155.js");
var u = require("./62754.js");
function d(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
var c = (0, a.getWindow)();
var h = {
  _markup: "",
  _imageArray: {},
  _imageDeferreds: [],
  _getBinaryFile: function (e, t) {
    o.default.sendRequest({
      url: e,
      method: "GET",
      responseType: "arraybuffer"
    }).done(t).fail(function () {
      t(false);
    });
  },
  _loadImages: function () {
    var e = this;
    (0, s.each)(e._imageArray, function (t) {
      var n = new u.Deferred();
      e._imageDeferreds.push(n);
      e._getBinaryFile(t, function (i) {
        if (!i) {
          delete e._imageArray[t];
          n.resolve();
          return;
        }
        var o;
        var a = "";
        var r = new Uint8Array(i);
        var s = r.byteLength;
        for (o = 0; o < s; o++) {
          a += String.fromCharCode(r[o]);
        }
        e._imageArray[t] = "data:image/png;base64," + c.btoa(a);
        n.resolve();
      });
    });
  },
  _parseImages: function (e) {
    var t;
    var n = this;
    if (e.tagName === "image") {
      t = (0, i.default)(e).attr("href") || (0, i.default)(e).attr("xlink:href");
      n._imageArray[t] ||= "";
    }
    (0, s.each)(e.childNodes, function (e, t) {
      n._parseImages(t);
    });
  },
  _prepareImages: function (e) {
    this._parseImages(e);
    this._loadImages();
    return u.when.apply(i.default, this._imageDeferreds);
  },
  getData: function (e, t) {
    var n;
    var o = this;
    var a = (0, l.getSvgElement)(e);
    var u = (0, i.default)(a);
    u.find(`[${l.HIDDEN_FOR_EXPORT}]`).remove();
    n = "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\" ?>" + (0, l.getSvgMarkup)(u.get(0), t.backgroundColor);
    return o._prepareImages(a).then(function () {
      (0, s.each)(o._imageArray, function (e, t) {
        var i = `href=['|"]${e}['|"]`;
        n = n.replace(new RegExp(i, "gi"), `href="${t}"`);
      });
      if ((0, r.isFunction)(c.Blob)) {
        return o._getBlob(n);
      } else {
        return o._getBase64(n);
      }
    });
  },
  _getBlob: function (e) {
    return new c.Blob([e], {
      type: "image/svg+xml"
    });
  },
  _getBase64: function (e) {
    return c.btoa(e);
  }
};
exports.svgCreator = h;