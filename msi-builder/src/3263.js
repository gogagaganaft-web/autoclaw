Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DataController = undefined;
var o;
var a = u(require("./96688.js"));
var r = require("./72119.js");
var s = u(require("./74938.js"));
var l = u(require("./49975.js"));
function u(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
var d = (o = r.dataControllerModule.controllers?.data) === null || o === undefined ? undefined : o.inherit({
  _getDataSourceAdapter: function () {
    return l.default;
  },
  _getSpecificDataSourceOption: function () {
    var e = this.option("dataSource");
    if (e && !Array.isArray(e) && this.option("keyExpr")) {
      a.default.log("W1011");
    }
    return this.callBase();
  }
});
exports.DataController = d;
s.default.registerModule("data", {
  defaultOptions: r.dataControllerModule.defaultOptions,
  controllers: {
    data: d
  }
});