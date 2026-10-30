var i = l(require("./49983.js"));
var o = l(require("./21168.js"));
var a = require("./3603.js");
var r = require("./77707.js");
var s = require("./19157.js");
function l(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
require("./4815.js");
require("./83469.js");
var u = i.default.prototype;
var d = o.default.prototype;
u._eventsMap.onSelectionChanged = {
  name: "selectionChanged"
};
(0, a.expand)(u._handlers, "calculateAdditionalStates", function (e, t) {
  e[2] = t.selectionStyle ? (0, r.buildRectAppearance)(t.selectionStyle) : {};
});
d.statesMap[2] = d.statesMap[3] = 2;
d.additionalStates.push(2);
(0, a.expand)(u, "_onNodesCreated", function () {
  this._selectionList.length = 0;
});
(0, a.expand)(u, "_extendProxyType", function (e) {
  var t = this;
  e.select = function (e) {
    t._selectNode(this._id, !!e);
  };
  e.isSelected = function () {
    return t._selectionList.includes(this._id);
  };
  t._selectionList = [];
});
i.default.addChange({
  code: "SELECTION_MODE",
  handler: function () {
    var e;
    var t = (0, s.normalizeEnum)(this._getOption("selectionMode", true));
    var n = this._selectionList;
    var i = t === "none" ? 0 : t === "multiple" ? 2 : 1;
    if (i === 1 && n.length > 1) {
      e = n.pop();
      this.clearSelection();
      n.push(e);
    } else if (i === 0) {
      this.clearSelection();
    }
    this._selectionMode = i;
  },
  isThemeDependent: true,
  isOptionChange: true,
  option: "selectionMode"
});
(0, a.expand)(u, "_applyTilesAppearance", function () {
  if (this._selectionList.length) {
    (function (e, t) {
      var n;
      var i;
      var o = t.length;
      for (n = 0; n < o; ++n) {
        i = e[t[n]];
        c[Number(i.isNode())](i.tile);
      }
    })(this._nodes, this._selectionList);
  }
});
var c = [function (e) {
  e.toForeground();
}, function (e) {
  e.outer.toForeground();
  e.inner.toForeground();
}];
u._applySelectionState = function (e, t) {
  var n = this._nodes[e];
  n.setState(2, t);
  this._eventTrigger("selectionChanged", {
    node: n.proxy
  });
};
u._selectNode = function (e, t) {
  var n;
  var i;
  var o;
  if (this._selectionMode !== 0) {
    this._context.suspend();
    i = (n = this._selectionList).indexOf(e);
    if (t && i === -1) {
      if (this._selectionMode === 1 && n.length) {
        o = n.pop();
        this._applySelectionState(o, false);
      }
      n.push(e);
      this._applySelectionState(e, true);
    } else if (!t && i >= 0) {
      n.splice(i, 1);
      this._applySelectionState(e, false);
    }
    this._context.resume();
  }
};
u.clearSelection = function () {
  var e;
  var t = this._selectionList;
  var n = t.length;
  if (this._selectionMode !== 0) {
    this._context.suspend();
    e = 0;
    for (; e < n; ++e) {
      this._applySelectionState(t[e], false);
    }
    t.length = 0;
    this._context.resume();
  }
};