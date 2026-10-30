var i;
var o = require("./13306.js");
var a = require("./10279.js");
((i = require("./74938.js")) && i.__esModule ? i : {
  default: i
}).default.registerModule("columns", {
  defaultOptions: function () {
    return (0, o.extend)(true, {}, a.columnsControllerModule.defaultOptions(), {
      commonColumnSettings: {
        allowExporting: true
      }
    });
  },
  controllers: a.columnsControllerModule.controllers
});