Object.defineProperty(exports, "ErrorCode", {
  enumerable: true,
  get: function () {
    return o.default;
  }
});
exports.FileManagerMessages = undefined;
var i = a(require("./28109.js"));
var o = a(require("./41011.js"));
function a(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
var r = {
  get: function (e, t) {
    switch (e) {
      case o.default.NoAccess:
        return i.default.format("dxFileManager-errorNoAccess");
      case o.default.FileExists:
        return i.default.format("dxFileManager-errorFileExistsFormat", t);
      case o.default.FileNotFound:
        return i.default.format("dxFileManager-errorFileNotFoundFormat", t);
      case o.default.DirectoryExists:
        return i.default.format("dxFileManager-errorDirectoryExistsFormat", t);
      case o.default.DirectoryNotFound:
        return i.default.format("dxFileManager-errorDirectoryNotFoundFormat", t);
      case o.default.WrongFileExtension:
        return i.default.format("dxFileManager-errorWrongFileExtension");
      case o.default.MaxFileSizeExceeded:
        return i.default.format("dxFileManager-errorMaxFileSizeExceeded");
      case o.default.InvalidSymbols:
        return i.default.format("dxFileManager-errorInvalidSymbols");
    }
    return i.default.format("dxFileManager-errorDefault");
  }
};
exports.FileManagerMessages = r;