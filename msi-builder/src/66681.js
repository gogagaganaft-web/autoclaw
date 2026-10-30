var i;
var o = (i = require("./49983.js")) && i.__esModule ? i : {
  default: i
};
var a = require("./88997.js");
var r = require("./3603.js");
var s = require("./19157.js");
require("./4815.js");
require("./9888.js");
require("./2322.js");
var l = 0;
var u = o.default.prototype;
u._eventsMap.onClick = {
  name: "click"
};
(0, r.expand)(u, "_initCore", function () {
  var e = this;
  var t = "__treemap_data_" + l++;
  function n(t) {
    return e._nodes[t].proxy;
  }
  e._tracker = new a.Tracker({
    widget: e,
    root: e._renderer.root,
    getNode: function (t) {
      var i = n(t);
      if ((0, s.parseScalar)(e._getOption("interactWithGroup", true)) && i.isLeaf() && i.getParent().isActive()) {
        return i.getParent();
      } else {
        return i;
      }
    },
    getData: function (e) {
      var n = e.target;
      return (n.tagName === "tspan" ? n.parentNode : n)[t];
    },
    getProxy: n,
    click: function (t) {
      e._eventTrigger("click", t);
    }
  });
  e._handlers.setTrackerData = function (e, n) {
    n.data(t, e._id);
  };
});
(0, r.expand)(u, "_disposeCore", function () {
  this._tracker.dispose();
});