exports.export = function (e, t, n) {
  if (!e) {
    return new s.Deferred().resolve();
  }
  var o = t.exportingAction;
  var a = t.exportedAction;
  var l = t.fileSavingAction;
  var u = {
    fileName: t.fileName,
    format: t.format,
    cancel: false
  };
  if ((0, r.isBoolean)(t.selectedRowsOnly)) {
    u.selectedRowsOnly = t.selectedRowsOnly;
  }
  if ((0, r.isFunction)(o)) {
    o(u);
  }
  if (!u.cancel) {
    return n(e, t).then(function (e) {
      if ((0, r.isFunction)(a)) {
        a();
      }
      if ((0, r.isFunction)(l)) {
        u.data = e;
        l(u);
      }
      if (!u.cancel) {
        var n = t.format === "xlsx" ? "EXCEL" : t.format;
        i.fileSaver.saveAs(u.fileName, n, e);
      }
    });
  }
  return new s.Deferred().resolve();
};
Object.defineProperty(exports, "fileSaver", {
  enumerable: true,
  get: function () {
    return i.fileSaver;
  }
});
exports.svg = exports.pdf = exports.image = undefined;
var i = require("./48351.js");
var o = require("./12173.js");
var a = require("./37596.js");
var r = require("./35922.js");
var s = require("./62754.js");
var l = require("./30855.js");
var u = {
  creator: o.imageCreator,
  getData: o.getData,
  testFormats: o.testFormats
};
exports.image = u;
var d = {
  getData: l.getData
};
exports.pdf = d;
var c = {
  creator: a.svgCreator,
  getData: a.getData
};
exports.svg = c;