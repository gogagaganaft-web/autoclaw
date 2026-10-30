exports.plugin = undefined;
var i;
var o = (i = require("./44697.js")) && i.__esModule ? i : {
  default: i
};
var a = require("./88997.js");
var r = require("./35922.js");
var s = 0;
var l = o.default.prototype;
l._eventsMap.onItemClick = {
  name: "itemClick"
};
l._eventsMap.onLegendClick = {
  name: "legendClick"
};
var u = {
  name: "tracker",
  init: function () {
    var e = this;
    var t = "__funnel_data_" + s++;
    function n(t) {
      var n = e._renderer.getRootOffset();
      var i = Math.floor(t.pageX - n.left);
      var o = Math.floor(t.pageY - n.top);
      return e._hitTestTargets(i, o);
    }
    e._tracker = new a.Tracker({
      widget: e,
      root: e._renderer.root,
      getData: function (e, i) {
        var o = e.target[t];
        if ((0, r.isDefined)(o)) {
          return o;
        }
        var a = n(e);
        if (i && a && a.type !== "inside-label") {
          return undefined;
        } else {
          return a && a.id;
        }
      },
      getNode: function (t) {
        return e._items[t];
      },
      click: function (t) {
        var i = n(t.event);
        var o = (i && i.type) === "legend" ? "legendClick" : "itemClick";
        e._eventTrigger(o, {
          item: t.node,
          event: t.event
        });
      }
    });
    this._dataKey = t;
  },
  dispose: function () {
    this._tracker.dispose();
  },
  extenders: {
    _change_TILING: function () {
      var e = this._dataKey;
      this._items.forEach(function (t, n) {
        t.element.data(e, n);
      });
    }
  }
};
exports.plugin = u;