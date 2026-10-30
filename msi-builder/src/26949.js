require("./98125.js");
var i;
var o = require("./13306.js");
var a = require("./22324.js");
((i = require("./74938.js")) && i.__esModule ? i : {
  default: i
}).default.registerModule("editing", (0, o.extend)(true, {}, a.editingModule, {
  extenders: {
    controllers: {
      data: {
        _changeRowExpandCore: function (e) {
          var t = this._editingController;
          if (Array.isArray(e) && t) {
            t.refresh();
          }
          return this.callBase.apply(this, arguments);
        }
      }
    }
  }
}));