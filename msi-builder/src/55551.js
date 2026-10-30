exports.default = undefined;
var i = f(require("./68374.js"));
var o = f(require("./99393.js"));
var a = require("./13306.js");
var r = require("./58201.js");
var s = require("./78008.js");
var l = require("./35922.js");
var u = require("./80968.js");
var d = require("./95479.js");
var c = f(require("./54778.js"));
var h = f(require("./11050.js"));
function f(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
function p(e, t) {
  e.prototype = Object.create(t.prototype);
  e.prototype.constructor = e;
  g(e, t);
}
function g(e, t) {
  return (g = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (e, t) {
    e.__proto__ = t;
    return e;
  })(e, t);
}
var m = {
  row: "minWidth",
  col: "minHeight"
};
var _ = {
  row: "maxWidth",
  col: "maxHeight"
};
var v = {
  start: "flex-start",
  end: "flex-end",
  center: "center",
  "space-between": "space-between",
  "space-around": "space-around"
};
var y = {
  start: "flex-start",
  end: "flex-end",
  center: "center",
  stretch: "stretch"
};
var b = {
  row: "row",
  col: "column"
};
function x(e, t, n) {
  n = (0, u.normalizeStyleProp)(t, n);
  e.style[(0, u.styleProp)(t)] = n;
  if (!(0, r.hasWindow)()) {
    if (n === "" || !(0, l.isDefined)(n)) {
      return;
    }
    var i = (0, s.dasherize)(t) + ": " + n + ";";
    (0, u.setStyle)(e, i, false);
  }
}
var w = function (e) {
  function t() {
    return e.apply(this, arguments) || this;
  }
  p(t, e);
  t.prototype._renderVisible = function (t, n) {
    e.prototype._renderVisible.call(this, t);
    if ((0, l.isDefined)(n)) {
      this._options.fireItemStateChangedAction({
        name: "visible",
        state: t,
        oldState: n
      });
    }
  };
  return t;
}(c.default);
var C = function () {
  function e(e, t) {
    this._$element = e;
    this._option = t;
  }
  var t = e.prototype;
  t.renderBox = function () {
    this._$element.css({
      display: (0, u.stylePropPrefix)("flexDirection") + "flex"
    });
    x(this._$element.get(0), "flexDirection", b[this._option("direction")]);
  };
  t.renderAlign = function () {
    this._$element.css({
      justifyContent: this._normalizedAlign()
    });
  };
  t._normalizedAlign = function () {
    var e = this._option("align");
    if (e in v) {
      return v[e];
    } else {
      return e;
    }
  };
  t.renderCrossAlign = function () {
    this._$element.css({
      alignItems: this._normalizedCrossAlign()
    });
  };
  t._normalizedCrossAlign = function () {
    var e = this._option("crossAlign");
    if (e in y) {
      return y[e];
    } else {
      return e;
    }
  };
  t.renderItems = function (e) {
    var t = (0, u.stylePropPrefix)("flexDirection");
    var n = this._option("direction");
    (0, d.each)(e, function () {
      var e = (0, i.default)(this);
      var o = e.data("dxBoxItemData");
      e.css({
        display: t + "flex"
      }).css(_[n], o.maxSize || "none").css(m[n], o.minSize || "0");
      x(e.get(0), "flexBasis", o.baseSize || 0);
      x(e.get(0), "flexGrow", o.ratio);
      x(e.get(0), "flexShrink", (0, l.isDefined)(o.shrink) ? o.shrink : 1);
      e.children().each(function (e, t) {
        (0, i.default)(t).css({
          width: "auto",
          height: "auto",
          display: (0, u.stylePropPrefix)("flexDirection") + "flex",
          flexBasis: 0
        });
        x(t, "flexGrow", 1);
        x(t, "flexDirection", (0, i.default)(t)[0].style.flexDirection || "column");
      });
    });
  };
  return e;
}();
var S = function (e) {
  function t() {
    return e.apply(this, arguments) || this;
  }
  p(t, e);
  var n = t.prototype;
  n._getDefaultOptions = function () {
    return (0, a.extend)(e.prototype._getDefaultOptions.call(this), {
      direction: "row",
      align: "start",
      crossAlign: "stretch",
      activeStateEnabled: false,
      focusStateEnabled: false,
      onItemStateChanged: undefined,
      _queue: undefined
    });
  };
  n._itemClass = function () {
    return "dx-box-item";
  };
  n._itemDataKey = function () {
    return "dxBoxItemData";
  };
  n._itemElements = function () {
    return this._itemContainer().children(this._itemSelector());
  };
  n._init = function () {
    e.prototype._init.call(this);
    this.$element().addClass("dx-box-flex");
    this._initLayout();
    this._initBoxQueue();
  };
  n._initLayout = function () {
    this._layout = new C(this.$element(), this.option.bind(this));
  };
  n._initBoxQueue = function () {
    this._queue = this.option("_queue") || [];
  };
  n._queueIsNotEmpty = function () {
    return !this.option("_queue") && !!this._queue.length;
  };
  n._pushItemToQueue = function (e, t) {
    this._queue.push({
      $item: e,
      config: t
    });
  };
  n._shiftItemFromQueue = function () {
    return this._queue.shift();
  };
  n._initMarkup = function () {
    this.$element().addClass("dx-box");
    this._layout.renderBox();
    e.prototype._initMarkup.call(this);
    this._renderAlign();
    this._renderActions();
  };
  n._renderActions = function () {
    this._onItemStateChanged = this._createActionByOption("onItemStateChanged");
  };
  n._renderAlign = function () {
    this._layout.renderAlign();
    this._layout.renderCrossAlign();
  };
  n._renderItems = function (n) {
    for (e.prototype._renderItems.call(this, n); this._queueIsNotEmpty();) {
      var i = this._shiftItemFromQueue();
      this._createComponent(i.$item, t, (0, a.extend)({
        itemTemplate: this.option("itemTemplate"),
        itemHoldTimeout: this.option("itemHoldTimeout"),
        onItemHold: this.option("onItemHold"),
        onItemClick: this.option("onItemClick"),
        onItemContextMenu: this.option("onItemContextMenu"),
        onItemRendered: this.option("onItemRendered"),
        _queue: this._queue
      }, i.config));
    }
    this._layout.renderItems(this._itemElements());
  };
  n._renderItemContent = function (t) {
    var n = t.itemData && t.itemData.node;
    if (n) {
      return this._renderItemContentByNode(t, n);
    } else {
      return e.prototype._renderItemContent.call(this, t);
    }
  };
  n._postprocessRenderItem = function (e) {
    var t = e.itemData.box;
    if (t) {
      this._pushItemToQueue(e.itemContent, t);
    }
  };
  n._createItemByTemplate = function (t, n) {
    if (n.itemData.box) {
      if (t.source) {
        return t.source();
      } else {
        return (0, i.default)();
      }
    } else {
      return e.prototype._createItemByTemplate.call(this, t, n);
    }
  };
  n._itemOptionChanged = function (t, n, i, o) {
    if (n === "visible") {
      this._onItemStateChanged({
        name: n,
        state: i,
        oldState: o !== false
      });
    }
    e.prototype._itemOptionChanged.call(this, t, n, i);
  };
  n._optionChanged = function (t) {
    switch (t.name) {
      case "_queue":
      case "direction":
        this._invalidate();
        break;
      case "align":
        this._layout.renderAlign();
        break;
      case "crossAlign":
        this._layout.renderCrossAlign();
        break;
      default:
        e.prototype._optionChanged.call(this, t);
    }
  };
  n._itemOptions = function () {
    var t = this;
    var n = e.prototype._itemOptions.call(this);
    n.fireItemStateChangedAction = function (e) {
      t._onItemStateChanged(e);
    };
    return n;
  };
  return t;
}(h.default);
S.ItemClass = w;
(0, o.default)("dxBox", S);
var k = S;
exports.default = k;
module.exports = exports.default;
module.exports.default = exports.default;