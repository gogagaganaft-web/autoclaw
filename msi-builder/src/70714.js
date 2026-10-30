exports.default = undefined;
var i = require("./23174.js");
var o = i.start + ".shutter-zoom";
var a = i.move + ".shutter-zoom";
var r = i.end + ".shutter-zoom";
function s(e, t, n, i) {
  var o = Math.floor(n ? i.pageY - e.top : i.pageX - e.left);
  var a = n ? t.y1 : t.x1;
  var r = n ? t.y2 : t.x2;
  if (o < a) {
    o = a;
  } else if (o > r) {
    o = r;
  }
  return o;
}
function l(e) {
  var t;
  var n = e.chart;
  var i = e.renderer;
  var l = e.rotated;
  var u = i.rect(0, 0, 0, 0).attr(e.shutterOptions);
  var d = {
    rect: u,
    root: i.root,
    rotated: l,
    triggerStart: function () {
      n._eventTrigger("zoomStart");
    },
    triggerEnd: function () {
      var e = n._argumentAxes[0].getTranslator();
      var t = Math.min(this.startCoord, this.curCoord);
      var i = Math.max(this.startCoord, this.curCoord);
      n._eventTrigger("zoomEnd", {
        rangeStart: e.from(t),
        rangeEnd: e.from(i)
      });
    },
    dispose: function () {
      i.root.off(".shutter-zoom");
      u.dispose();
    },
    getRootOffset: function () {
      return i.getRootOffset();
    },
    getCanvas: function () {
      var e = n._canvas;
      var t = n.panes;
      var i = t[0].canvas;
      var o = t[t.length - 1].canvas;
      return {
        x1: i.left,
        y1: i.top,
        x2: e.width - o.right,
        y2: e.height - o.bottom,
        width: e.width - i.left - o.right,
        height: e.height - i.top - o.bottom
      };
    }
  };
  i.root.off(".shutter-zoom").on(o, {
    direction: l ? "vertical" : "horizontal",
    immediate: true
  }, (t = d, function (e) {
    var n = t.getRootOffset();
    var i = t.getCanvas();
    if (!function (e, t, n) {
      var i = n.pageX - e.left;
      var o = n.pageY - e.top;
      return i >= t.x1 && i <= t.x2 && o >= t.y1 && o <= t.y2;
    }(n, i, e)) {
      e.cancel = true;
    } else {
      t.rootOffset = n;
      t.canvas = i;
      t.startCoord = s(n, i, t.rotated, e);
      t.triggerStart();
      t.rect.attr({
        x: i.x1,
        y: i.y1,
        width: i.width,
        height: i.height
      }).append(t.root);
    }
  })).on(a, function (e) {
    return function (t) {
      var n = s(e.rootOffset, e.canvas, e.rotated, t);
      var i = {};
      e.curCoord = n;
      i[e.rotated ? "y" : "x"] = Math.min(e.startCoord, n);
      i[e.rotated ? "height" : "width"] = Math.abs(e.startCoord - n);
      e.rect.attr(i);
    };
  }(d)).on(r, function (e) {
    return function (t) {
      e.triggerEnd();
      e.rect.remove();
    };
  }(d));
  return d;
}
var u = {
  name: "shutter_zoom",
  init: function () {
    var e = this.option("shutterZoom") || {};
    if (e.enabled) {
      this._shutterZoom = l({
        chart: this,
        renderer: this._renderer,
        rotated: this.option("rotated"),
        shutterOptions: e
      });
    }
  },
  dispose: function () {
    if (this._shutterZoom) {
      this._shutterZoom.dispose();
    }
  }
};
exports.default = u;
module.exports = exports.default;
module.exports.default = exports.default;