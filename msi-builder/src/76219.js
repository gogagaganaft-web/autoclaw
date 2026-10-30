function i(e) {
  return (i = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function (e) {
    return typeof e;
  } : function (e) {
    if (e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype) {
      return "symbol";
    } else {
      return typeof e;
    }
  })(e);
}
exports.default = undefined;
var o = require("./58664.js");
var a = S(require("./68374.js"));
var r = S(require("./55994.js"));
var s = S(require("./87209.js"));
var l = require("./95429.js");
var u = S(require("./20530.js"));
var d = S(require("./73349.js"));
var c = require("./13306.js");
var h = require("./20576.js");
var f = require("./6415.js");
var p = function (e, t) {
  if (!t && e && e.__esModule) {
    return e;
  }
  if (e === null || i(e) !== "object" && typeof e != "function") {
    return {
      default: e
    };
  }
  var n = C(t);
  if (n && n.has(e)) {
    return n.get(e);
  }
  var o = {};
  var a = Object.defineProperty && Object.getOwnPropertyDescriptor;
  for (var r in e) {
    if (r !== "default" && Object.prototype.hasOwnProperty.call(e, r)) {
      var s = a ? Object.getOwnPropertyDescriptor(e, r) : null;
      if (s && (s.get || s.set)) {
        Object.defineProperty(o, r, s);
      } else {
        o[r] = e[r];
      }
    }
  }
  o.default = e;
  if (n) {
    n.set(e, o);
  }
  return o;
}(require("./95479.js"));
var g = require("./35922.js");
var m = S(require("./99393.js"));
var _ = require("./39611.js");
var v = S(require("./69010.js"));
var y = require("./62754.js");
var b = require("./93280.js");
var x = require("./44899.js");
var w = require("./75811.js");
function C(e) {
  if (typeof WeakMap != "function") {
    return null;
  }
  var t = new WeakMap();
  var n = new WeakMap();
  return (C = function (e) {
    if (e) {
      return n;
    } else {
      return t;
    }
  })(e);
}
function S(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
var k = v.default.inherit({
  _activeStateUnit: ".dx-accordion-item",
  _getDefaultOptions: function () {
    return (0, c.extend)(this.callBase(), {
      hoverStateEnabled: true,
      height: undefined,
      itemTitleTemplate: "title",
      onItemTitleClick: null,
      selectedIndex: 0,
      collapsible: false,
      multiple: false,
      animationDuration: 300,
      deferRendering: true,
      selectByClick: true,
      activeStateEnabled: true,
      _itemAttributes: {
        role: "tab"
      },
      _animationEasing: "ease"
    });
  },
  _defaultOptionsRules: function () {
    return this.callBase().concat([{
      device: function () {
        return u.default.real().deviceType === "desktop" && !u.default.isSimulator();
      },
      options: {
        focusStateEnabled: true
      }
    }, {
      device: function () {
        return (0, w.isMaterial)();
      },
      options: {
        animationDuration: 200,
        _animationEasing: "cubic-bezier(0.4, 0, 0.2, 1)"
      }
    }]);
  },
  _itemElements: function () {
    return this._itemContainer().children(this._itemSelector());
  },
  _init: function () {
    this.callBase();
    this.option("selectionRequired", !this.option("collapsible"));
    this.option("selectionMode", this.option("multiple") ? "multiple" : "single");
    var e = this.$element();
    e.addClass("dx-accordion");
    this._$container = (0, a.default)("<div>").addClass("dx-accordion-wrapper");
    e.append(this._$container);
  },
  _initTemplates: function () {
    this.callBase();
    this._templateManager.addDefaultTemplates({
      title: new b.BindableTemplate(function (e, t) {
        if ((0, g.isPlainObject)(t)) {
          var n = (0, x.getImageContainer)(t.icon);
          if (n) {
            e.append(n);
          }
          if ((0, g.isDefined)(t.title) && !(0, g.isPlainObject)(t.title)) {
            e.append(d.default.createTextNode(t.title));
          }
        } else if ((0, g.isDefined)(t)) {
          e.text(String(t));
        }
        e.wrapInner((0, a.default)("<div>").addClass("dx-accordion-item-title-caption"));
      }, ["title", "icon"], this.option("integrationOptions.watchMethod"))
    });
  },
  _initMarkup: function () {
    var e = this;
    this._deferredItems = [];
    this._deferredTemplateItems = [];
    this.callBase();
    this.setAria({
      role: "tablist",
      multiselectable: this.option("multiple")
    });
    (0, h.deferRender)(function () {
      var t = e._getSelectedItemIndices();
      e._renderSelection(t, []);
    });
  },
  _render: function () {
    var e = this;
    this.callBase();
    y.when.apply(this, this._deferredTemplateItems).done(function () {
      e._updateItemHeights(true);
    });
  },
  _itemDataKey: function () {
    return "dxAccordionItemData";
  },
  _itemClass: function () {
    return "dx-accordion-item";
  },
  _itemContainer: function () {
    return this._$container;
  },
  _itemTitles: function () {
    return this._itemElements().find(".dx-accordion-item-title");
  },
  _itemContents: function () {
    return this._itemElements().find(".dx-accordion-item-body");
  },
  _getItemData: function (e) {
    return (0, a.default)(e).parent().data(this._itemDataKey()) || this.callBase.apply(this, arguments);
  },
  _executeItemRenderAction: function (e) {
    if (!e.type) {
      this.callBase.apply(this, arguments);
    }
  },
  _itemSelectHandler: function (e) {
    if (!(0, a.default)(e.target).closest(this._itemContents()).length) {
      this.callBase.apply(this, arguments);
    }
  },
  _afterItemElementDeleted: function (e, t) {
    this._deferredItems.splice(t.itemIndex, 1);
    this.callBase.apply(this, arguments);
  },
  _renderItemContent: function (e) {
    this._deferredTemplateItems[e.index] = new y.Deferred();
    var t = this.callBase((0, c.extend)({}, e, {
      contentClass: "dx-accordion-item-title",
      templateProperty: "titleTemplate",
      defaultTemplateName: this.option("itemTitleTemplate")
    }));
    this._attachItemTitleClickAction(t);
    var n = new y.Deferred();
    if ((0, g.isDefined)(this._deferredItems[e.index])) {
      this._deferredItems[e.index] = n;
    } else {
      this._deferredItems.push(n);
    }
    if (!this.option("deferRendering") || this._getSelectedItemIndices().indexOf(e.index) >= 0) {
      n.resolve();
    }
    n.done(this.callBase.bind(this, (0, c.extend)({}, e, {
      contentClass: "dx-accordion-item-body",
      container: (0, f.getPublicElement)((0, a.default)("<div>").appendTo((0, a.default)(t).parent()))
    })));
  },
  _onItemTemplateRendered: function (e, t) {
    var n = this;
    return function () {
      var e = n._deferredTemplateItems[t.index];
      if (e) {
        e.resolve();
      }
    };
  },
  _attachItemTitleClickAction: function (e) {
    var t = (0, _.addNamespace)(l.name, this.NAME);
    r.default.off(e, t);
    r.default.on(e, t, this._itemTitleClickHandler.bind(this));
  },
  _itemTitleClickHandler: function (e) {
    this._itemDXEventHandler(e, "onItemTitleClick");
  },
  _renderSelection: function (e, t) {
    this._itemElements().addClass("dx-accordion-item-closed");
    this.setAria("hidden", true, this._itemContents());
    this._updateItems(e, t);
  },
  _updateSelection: function (e, t) {
    this._updateItems(e, t);
    this._updateItemHeightsWrapper(false);
  },
  _updateItems: function (e, t) {
    var n = this;
    var i = this._itemElements();
    p.each(e, function (e, t) {
      n._deferredItems[t].resolve();
      var o = i.eq(t).addClass("dx-accordion-item-opened").removeClass("dx-accordion-item-closed");
      n.setAria("hidden", false, o.find(".dx-accordion-item-body"));
    });
    p.each(t, function (e, t) {
      var o = i.eq(t).removeClass("dx-accordion-item-opened");
      n.setAria("hidden", true, o.find(".dx-accordion-item-body"));
    });
  },
  _updateItemHeightsWrapper: function (e) {
    if (this.option("templatesRenderAsynchronously")) {
      this._animationTimer = setTimeout(function () {
        this._updateItemHeights(e);
      }.bind(this));
    } else {
      this._updateItemHeights(e);
    }
  },
  _updateItemHeights: function (e) {
    var t = this;
    var n = t._deferredAnimate;
    var i = this._splitFreeSpace(this._calculateFreeSpace());
    clearTimeout(this._animationTimer);
    return y.when.apply(a.default, [].slice.call(this._itemElements()).map(function (n) {
      return t._updateItemHeight((0, a.default)(n), i, e);
    })).done(function () {
      if (n) {
        n.resolveWith(t);
      }
    });
  },
  _updateItemHeight: function (e, t, n) {
    var i = e.children(".dx-accordion-item-title");
    if (s.default.isAnimating(e)) {
      s.default.stop(e);
    }
    var a;
    var r = (0, o.getOuterHeight)(e);
    if (e.hasClass("dx-accordion-item-opened")) {
      if (!(a = t + (0, o.getOuterHeight)(i))) {
        (0, o.setHeight)(e, "auto");
        a = (0, o.getOuterHeight)(e);
      }
    } else {
      a = (0, o.getOuterHeight)(i);
    }
    return this._animateItem(e, r, a, n, !!t);
  },
  _animateItem: function (e, t, n, i, o) {
    var a;
    if (i || t === n) {
      e.css("height", n);
      a = new y.Deferred().resolve();
    } else {
      a = s.default.animate(e, {
        type: "custom",
        from: {
          height: t
        },
        to: {
          height: n
        },
        duration: this.option("animationDuration"),
        easing: this.option("_animationEasing")
      });
    }
    return a.done(function () {
      if (e.hasClass("dx-accordion-item-opened") && !o) {
        e.css("height", "");
      }
      e.not(".dx-accordion-item-opened").addClass("dx-accordion-item-closed");
    });
  },
  _splitFreeSpace: function (e) {
    if (e) {
      return e / this.option("selectedItems").length;
    } else {
      return e;
    }
  },
  _calculateFreeSpace: function () {
    var e = this.option("height");
    if (e !== undefined && e !== "auto") {
      var t = this._itemTitles();
      var n = 0;
      p.each(t, function (e, t) {
        n += (0, o.getOuterHeight)(t);
      });
      return (0, o.getHeight)(this.$element()) - n;
    }
  },
  _visibilityChanged: function (e) {
    if (e) {
      this._dimensionChanged();
    }
  },
  _dimensionChanged: function () {
    this._updateItemHeights(true);
  },
  _clean: function () {
    this._deferredTemplateItems.forEach(function (e) {
      e.reject();
    });
    this._deferredTemplateItems = [];
    clearTimeout(this._animationTimer);
    this.callBase();
  },
  _tryParseItemPropertyName: function (e) {
    var t = e.match(/.*\.(.*)/);
    if ((0, g.isDefined)(t) && t.length >= 1) {
      return t[1];
    }
  },
  _optionChanged: function (e) {
    switch (e.name) {
      case "items":
        this.callBase(e);
        if (this._tryParseItemPropertyName(e.fullName) === "title") {
          this._renderSelection(this._getSelectedItemIndices(), []);
        }
        if (this._tryParseItemPropertyName(e.fullName) === "visible") {
          this._updateItemHeightsWrapper(true);
        }
        if (this.option("repaintChangesOnly") === true && e.fullName === "items") {
          this._updateItemHeightsWrapper(true);
          this._renderSelection(this._getSelectedItemIndices(), []);
        }
        break;
      case "animationDuration":
      case "onItemTitleClick":
      case "_animationEasing":
        break;
      case "collapsible":
        this.option("selectionRequired", !this.option("collapsible"));
        break;
      case "itemTitleTemplate":
      case "height":
      case "deferRendering":
        this._invalidate();
        break;
      case "multiple":
        this.option("selectionMode", e.value ? "multiple" : "single");
        break;
      default:
        this.callBase(e);
    }
  },
  expandItem: function (e) {
    this._deferredAnimate = new y.Deferred();
    this.selectItem(e);
    return this._deferredAnimate.promise();
  },
  collapseItem: function (e) {
    this._deferredAnimate = new y.Deferred();
    this.unselectItem(e);
    return this._deferredAnimate.promise();
  },
  updateDimensions: function () {
    return this._updateItemHeights(false);
  }
});
(0, m.default)("dxAccordion", k);
var D = k;
exports.default = D;
module.exports = exports.default;
module.exports.default = exports.default;