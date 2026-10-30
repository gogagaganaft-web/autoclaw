exports.Tracker = c;
var i = require("./39611.js");
var o = l(require("./73349.js"));
var a = require("./95429.js");
var r = l(require("./93786.js"));
var s = l(require("./55994.js"));
function l(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
var u = r.default.down;
var d = r.default.move;
function c(e) {
  this._initHandlers(e);
}
c.prototype = {
  constructor: c,
  _initHandlers: function (e) {
    var t = o.default.getDocument();
    function n(t) {
      (function (e, t) {
        var n = t.getData(e);
        if (n >= 0) {
          t.click({
            node: t.getNode(n),
            coords: t.getCoords(e),
            event: e
          });
        }
      })(t, e);
    }
    e.getCoords = function (t) {
      var n = (0, i.eventData)(t);
      var o = e.widget._renderer.getRootOffset();
      return [n.x - o.left, n.y - o.top];
    };
    e.root.on(a.name, n);
    e.root.on(u, l);
    s.default.on(t, u, l);
    s.default.on(t, d, c);
    this._disposeHandlers = function () {
      e.root.off(a.name, n);
      e.root.off(u, l);
      s.default.off(t, u, l);
      s.default.off(t, d, c);
    };
    var r = false;
    function l(t) {
      if (r) {
        r = false;
      } else {
        if (e.getData(t) !== undefined) {
          r = true;
        }
        c(t);
      }
    }
    function c(t) {
      (function (e, t) {
        var n = t.getData(e);
        if (n >= 0) {
          t.getNode(n).setHover();
        } else {
          t.widget.clearHover();
        }
      })(t, e);
      if (e.widget._getOption("tooltip").enabled) {
        (function (e, t) {
          var n;
          var o = t.getData(e, true);
          if (o >= 0) {
            n = (0, i.eventData)(e);
            t.getNode(o).showTooltip([n.x, n.y]);
          } else {
            t.widget.hideTooltip();
          }
        })(t, e);
      }
    }
  },
  dispose: function () {
    this._disposeHandlers();
  }
};