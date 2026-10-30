var i;
var o = (i = require("./76130.js")) && i.__esModule ? i : {
  default: i
};
var a = require("./44899.js");
if (o.default) {
  o.default.bindingHandlers.dxControlsDescendantBindings = {
    init: function (e, t) {
      return {
        controlsDescendantBindings: o.default.unwrap(t())
      };
    }
  };
  o.default.bindingHandlers.dxIcon = {
    init: function (e, t) {
      var n = o.default.utils.unwrapObservable(t()) || {};
      var i = (0, a.getImageContainer)(n);
      o.default.virtualElements.emptyNode(e);
      if (i) {
        o.default.virtualElements.prepend(e, i.get(0));
      }
    },
    update: function (e, t) {
      var n = o.default.utils.unwrapObservable(t()) || {};
      var i = (0, a.getImageContainer)(n);
      o.default.virtualElements.emptyNode(e);
      if (i) {
        o.default.virtualElements.prepend(e, i.get(0));
      }
    }
  };
  o.default.virtualElements.allowedBindings.dxIcon = true;
}