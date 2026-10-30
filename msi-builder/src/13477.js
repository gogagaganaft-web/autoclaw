var i;
var o = require("./13306.js");
var a = require("./12440.js");
var r = (i = require("./12500.js")) && i.__esModule ? i : {
  default: i
};
var s = a.stateStoringModule.extenders.controllers.stateStoring.applyState;
r.default.registerModule("stateStoring", (0, o.extend)(true, {}, a.stateStoringModule, {
  extenders: {
    controllers: {
      stateStoring: {
        applyState: function (e) {
          s.apply(this, arguments);
          this.option("expandedRowKeys", e.expandedRowKeys ? e.expandedRowKeys.slice() : []);
        }
      },
      data: {
        getUserState: function () {
          var e = this.callBase.apply(this, arguments);
          if (!this.option("autoExpandAll")) {
            e.expandedRowKeys = this.option("expandedRowKeys");
          }
          return e;
        }
      }
    }
  }
}));