exports.default = undefined;
var i = d(require("./68374.js"));
var o = require("./20576.js");
var a = d(require("./38377.js"));
var r = require("./13306.js");
var s = require("./95479.js");
var l = d(require("./96688.js"));
var u = require("./40245.js");
function d(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
var c = [];
function h(e, t, n) {
  c.push({
    enabled: e,
    decoratorType: t,
    decoratorSubType: n
  });
}
h(function () {
  return this.option("menuItems").length;
}, function () {
  return "menu";
}, function () {
  return this.option("menuMode");
});
h(function () {
  return !this.option("menuItems").length && this.option("allowItemDeleting");
}, function () {
  var e = this.option("itemDeleteMode");
  if (e === "toggle" || e === "slideButton" || e === "swipe" || e === "static") {
    return "delete";
  } else {
    return "menu";
  }
}, function () {
  var e = this.option("itemDeleteMode");
  if (e === "slideItem") {
    e = "slide";
  }
  return e;
});
h(function () {
  return this.option("selectionMode") !== "none" && this.option("showSelectionControls");
}, function () {
  return "selection";
}, function () {
  return "default";
});
h(function () {
  return this.option("itemDragging.allowReordering") || this.option("itemDragging.allowDropInsideItem") || this.option("itemDragging.group");
}, function () {
  return "reorder";
}, function () {
  return "default";
});
var f = a.default.inherit({
  ctor: function (e) {
    this._list = e;
    this._fetchRequiredDecorators();
  },
  dispose: function () {
    if (this._decorators && this._decorators.length) {
      (0, s.each)(this._decorators, function (e, t) {
        t.dispose();
      });
    }
  },
  _fetchRequiredDecorators: function () {
    this._decorators = [];
    (0, s.each)(c, function (e, t) {
      if (t.enabled.call(this._list)) {
        var n = t.decoratorType.call(this._list);
        var i = t.decoratorSubType.call(this._list);
        var o = this._createDecorator(n, i);
        this._decorators.push(o);
      }
    }.bind(this));
  },
  _createDecorator: function (e, t) {
    return new (this._findDecorator(e, t))(this._list);
  },
  _findDecorator: function (e, t) {
    var i = u.registry[e]?.[t];
    if (!i) {
      throw l.default.Error("E1012", e, t);
    }
    return i;
  },
  modifyItemElement: function (e) {
    var t = (0, i.default)(e.itemElement);
    var n = {
      $itemElement: t
    };
    this._prependBeforeBags(t, n);
    this._appendAfterBags(t, n);
    this._applyDecorators("modifyElement", n);
  },
  afterItemsRendered: function () {
    this._applyDecorators("afterRender");
  },
  _prependBeforeBags: function (e, t) {
    var n = this._collectDecoratorsMarkup("beforeBag", t, "dx-list-item-before-bag");
    e.prepend(n);
  },
  _appendAfterBags: function (e, t) {
    var n = this._collectDecoratorsMarkup("afterBag", t, "dx-list-item-after-bag");
    e.append(n);
  },
  _collectDecoratorsMarkup: function (e, t, n) {
    var o = (0, i.default)("<div>");
    (0, s.each)(this._decorators, function () {
      var a = (0, i.default)("<div>").addClass(n);
      this[e]((0, r.extend)({
        $container: a
      }, t));
      if (a.children().length) {
        o.append(a);
      }
    });
    return o.children();
  },
  _applyDecorators: function (e, t) {
    (0, s.each)(this._decorators, function () {
      this[e](t);
    });
  },
  _handlerExists: function (e) {
    if (!this._decorators) {
      return false;
    }
    var t = this._decorators;
    for (var n = t.length, i = 0; i < n; i++) {
      if (t[i][e] !== o.noop) {
        return true;
      }
    }
    return false;
  },
  _eventHandler: function (e, t, n) {
    if (!this._decorators) {
      return false;
    }
    for (var i = false, o = this._decorators, a = o.length, r = 0; r < a && !(i = o[r][e](t, n)); r++);
    return i;
  },
  handleClick: function (e, t) {
    return this._eventHandler("handleClick", e, t);
  },
  handleKeyboardEvents: function (e, t) {
    return this._eventHandler("handleKeyboardEvents", e, t);
  },
  handleEnterPressing: function (e) {
    return this._eventHandler("handleEnterPressing", e);
  },
  contextMenuHandlerExists: function () {
    return this._handlerExists("handleContextMenu");
  },
  handleContextMenu: function (e, t) {
    return this._eventHandler("handleContextMenu", e, t);
  },
  getExcludedItemSelectors: function () {
    var e = [];
    this._applyDecorators("getExcludedSelectors", e);
    return e.join(",");
  }
});
exports.default = f;
module.exports = exports.default;
module.exports.default = exports.default;