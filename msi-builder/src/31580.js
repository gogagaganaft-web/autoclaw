var i;
var o = require("./13306.js");
var a = require("./82802.js");
((i = require("./12500.js")) && i.__esModule ? i : {
  default: i
}).default.registerModule("masterDetail", (0, o.extend)(true, {}, a.masterDetailModule, {
  extenders: {
    controllers: {
      data: {
        isRowExpanded: function () {
          return this.callBase.apply(this, arguments);
        },
        _processItems: function () {
          return this.callBase.apply(this, arguments);
        },
        _processDataItem: function () {
          return this.callBase.apply(this, arguments);
        }
      }
    }
  }
}));