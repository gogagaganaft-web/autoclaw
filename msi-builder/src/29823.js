exports.plugin = undefined;
var i;
var o = (i = require("./66422.js")) && i.__esModule ? i : {
  default: i
};
var a = require("./88997.js");
var r = o.default.prototype;
var s = 0;
r._eventsMap.onNodeClick = {
  name: "nodeClick"
};
r._eventsMap.onLinkClick = {
  name: "linkClick"
};
var l = {
  name: "tracker",
  init: function () {
    var e = this;
    var t = "__sankey_data_" + s++;
    e._tracker = new a.Tracker({
      widget: e,
      root: e._renderer.root,
      getData: function (e) {
        return e.target[t];
      },
      getNode: function (t) {
        if (t < e._nodes.length) {
          return e._nodes[t];
        } else {
          return e._links[t - e._nodes.length];
        }
      },
      click: function (t) {
        var n = this.getData(t.event) < e._nodes.length ? "nodeClick" : "linkClick";
        e._eventTrigger(n, {
          target: t.node,
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
    _change_LINKS_DRAW: function () {
      var e = this._dataKey;
      this._nodes.concat(this._links).forEach(function (t, n) {
        t.element.data(e, n);
      });
    }
  }
};
exports.plugin = l;