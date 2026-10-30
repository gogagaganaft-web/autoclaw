var i = s(require("./68374.js"));
var o = s(require("./63008.js"));
var a = require("./40245.js");
var r = s(require("./61225.js"));
function s(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
(0, a.register)("delete", "static", r.default.inherit({
  afterBag: function (e) {
    var t = e.$itemElement;
    var n = e.$container;
    var a = (0, i.default)("<div>").addClass("dx-list-static-delete-button");
    this._list._createComponent(a, o.default, {
      icon: "remove",
      onClick: function (e) {
        e.event.stopPropagation();
        this._deleteItem(t);
      }.bind(this),
      integrationOptions: {}
    });
    n.addClass("dx-list-static-delete-button-container").append(a);
  },
  _deleteItem: function (e) {
    if (!e.is(".dx-state-disabled, .dx-state-disabled *")) {
      this._list.deleteItem(e);
    }
  }
}));