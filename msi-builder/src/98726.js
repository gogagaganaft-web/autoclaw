var i = require("./92018.js");
var o = r(require("./74938.js"));
var a = r(require("./49975.js"));
function r(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
o.default.registerModule("virtualScrolling", i.virtualScrollingModule);
a.default.extend(i.virtualScrollingModule.extenders.dataSourceAdapter);