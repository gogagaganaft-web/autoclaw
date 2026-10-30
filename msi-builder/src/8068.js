exports.TooltipViewer = n;
function n(e) {
  this._subscribeToTracker(e.tracker, e.tooltip, e.layerCollection);
}
n.prototype = {
  constructor: n,
  dispose: function () {
    this._offTracker();
    this._offTracker = null;
  },
  _subscribeToTracker: function (e, t, n) {
    this._offTracker = e.on({
      "focus-on": function (e) {
        var i;
        var o;
        if (t.isEnabled()) {
          function a(t) {
            if (t) {
              e.done(t);
            }
          }
          if (o = (i = n.byName(e.data.name)) && i.getProxy(e.data.index)) {
            a(t.show(o, {
              x: e.x,
              y: e.y,
              offset: 12
            }, {
              target: o
            }, undefined, a));
          }
        }
      },
      "focus-move": function (e) {
        t.move(e.x, e.y, 12);
      },
      "focus-off": function () {
        t.hide();
      }
    });
  }
};