var i;
var o = require("./13306.js");
var a = require("./31822.js");
((i = require("./12500.js")) && i.__esModule ? i : {
  default: i
}).default.registerModule("keyboardNavigation", (0, o.extend)(true, {}, a.keyboardNavigationModule, {
  extenders: {
    controllers: {
      keyboardNavigation: {
        _leftRightKeysHandler: function (e, t) {
          var n = this.getVisibleRowIndex();
          var i = this._dataController;
          if (!e.ctrl) {
            return this.callBase.apply(this, arguments);
          }
          var o = this._getDirectionCodeByKey(e.keyName);
          var a = i.getKeyByRowIndex(n);
          if (o === "nextInRow") {
            i.expandRow(a);
          } else {
            i.collapseRow(a);
          }
        }
      }
    }
  }
}));