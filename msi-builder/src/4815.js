var i = s(require("./49983.js"));
var o = s(require("./21168.js"));
var a = require("./13306.js");
var r = require("./20576.js");
function s(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
var l = i.default.prototype;
var u = o.default.prototype;
function d(e, t) {
  var n = e.ctx;
  n.suspend();
  n.change(t);
  n.resume();
}
l._eventsMap.onNodesInitialized = {
  name: "nodesInitialized"
};
l._eventsMap.onNodesRendering = {
  name: "nodesRendering"
};
l._createProxyType = function () {
  var e;
  var t = this;
  function n(e) {
    e.proxy = this;
    this._id = e._id;
    this.level = e.level;
    this.index = e.index;
    this.data = e.data;
  }
  n.prototype = {
    constructor: n,
    getParent: function () {
      return e[this._id].parent.proxy || null;
    },
    getChild: function (t) {
      var n = e[this._id].nodes;
      if (n) {
        return n[t].proxy;
      } else {
        return null;
      }
    },
    getChildrenCount: function () {
      var t = e[this._id].nodes;
      if (t) {
        return t.length;
      } else {
        return 0;
      }
    },
    getAllChildren: function () {
      var t;
      var n = e[this._id].nodes;
      var i = n && n.length;
      var o = [];
      for (t = 0; t < i; ++t) {
        o.push(n[t].proxy);
      }
      return o;
    },
    getAllNodes: function () {
      var t = [];
      (function e(t, n) {
        var i;
        var o = t.nodes;
        var a = o && o.length;
        for (i = 0; i < a; ++i) {
          n.push(o[i].proxy);
          e(o[i], n);
        }
      })(e[this._id], t);
      return t;
    },
    isLeaf: function () {
      return !e[this._id].isNode();
    },
    isActive: function () {
      return e[this._id].isActive();
    },
    value: function (t) {
      var n;
      var i = e[this._id];
      if (t !== undefined) {
        (function (e, t) {
          var n = t - e.value;
          while (e) {
            e.value += n;
            e = e.parent;
          }
        })(i, t > 0 ? Number(t) : 0);
        d(i, ["TILING"]);
        n = this;
      } else {
        n = i.value;
      }
      return n;
    },
    label: function (t) {
      var n;
      var i = e[this._id];
      if (t !== undefined) {
        i.customLabel = t ? String(t) : null;
        d(i, ["LABELS"]);
        n = this;
      } else {
        n = i.customLabel || i.label;
      }
      return n;
    },
    customize: function (t) {
      var n = e[this._id];
      if (t) {
        n._custom = n._custom || {};
        (0, a.extend)(true, n._custom, t);
        n._partialState = n._partialLabelState = null;
      }
      d(n, ["TILES", "LABELS"]);
      return this;
    },
    resetCustomization: function () {
      var t = e[this._id];
      t._custom = t._partialState = t._partialLabelState = null;
      d(t, ["TILES", "LABELS"]);
      return this;
    }
  };
  t._extendProxyType(n.prototype);
  t._handlers.beginBuildNodes = function () {
    e = t._nodes;
    new n(t._root);
  };
  t._handlers.buildNode = function (e) {
    new n(e);
  };
  t._handlers.endBuildNodes = function () {
    t._eventTrigger("nodesInitialized", {
      root: t._root.proxy
    });
  };
};
l._extendProxyType = r.noop;
var c = l._resetNodes;
l._resetNodes = function () {
  c.call(this);
  this._eventTrigger("nodesRendering", {
    node: this._topNode.proxy
  });
};
var h = u.updateStyles;
u.updateStyles = function () {
  h.call(this);
  if (this._custom) {
    this._partialState = !this.ctx.forceReset && this._partialState || this.ctx.calculateState(this._custom);
    (0, a.extend)(true, this.state, this._partialState);
  }
};
var f = u.updateLabelStyle;
u.updateLabelStyle = function () {
  var e = this._custom;
  f.call(this);
  if (e && e.label) {
    this._partialLabelState = !this.ctx.forceReset && this._partialLabelState || function (e, t) {
      var n = e.ctx.calculateLabelState(t);
      if ("visible" in t) {
        n.visible = !!t.visible;
      }
      return n;
    }(this, e.label);
    this.labelState = (0, a.extend)(true, {}, this.labelState, this._partialLabelState);
  }
};
l.getRootNode = function () {
  return this._root.proxy;
};
l.resetNodes = function () {
  var e = this._context;
  e.suspend();
  e.change(["NODES_CREATE"]);
  e.resume();
  return this;
};