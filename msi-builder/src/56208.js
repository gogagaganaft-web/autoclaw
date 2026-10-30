var i = u(require("./36991.js"));
var o = u(require("./49816.js"));
var a = u(require("./45765.js"));
var r = u(require("./4323.js"));
var s = u(require("./41332.js"));
var l = u(require("./98831.js"));
function u(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
module.exports = i.default.fileManagement = i.default.fileManagement || {};
i.default.fileManagement.FileSystemError = o.default;
i.default.fileManagement.FileSystemItem = a.default;
i.default.fileManagement.ObjectFileSystemProvider = r.default;
i.default.fileManagement.RemoteFileSystemProvider = s.default;
i.default.fileManagement.CustomFileSystemProvider = l.default;