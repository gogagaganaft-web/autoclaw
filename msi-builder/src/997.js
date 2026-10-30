exports.default = undefined;
var i = require("./58664.js");
var o = g(require("./68374.js"));
var a = require("./75811.js");
var r = require("./35922.js");
var s = g(require("./99393.js"));
var l = require("./13306.js");
var u = require("./95479.js");
var d = require("./37518.js");
var c = g(require("./25970.js"));
var h = require("./93280.js");
var f = g(require("./87209.js"));
var p = require("./10329.js");
function g(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
function m(e, t) {
  return (m = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (e, t) {
    e.__proto__ = t;
    return e;
  })(e, t);
}
var _ = function (e) {
  var t;
  var n;
  function s() {
    return e.apply(this, arguments) || this;
  }
  n = e;
  (t = s).prototype = Object.create(n.prototype);
  t.prototype.constructor = t;
  m(t, n);
  var c = s.prototype;
  c._getSynchronizableOptionsForCreateComponent = function () {
    return e.prototype._getSynchronizableOptionsForCreateComponent.call(this).filter(function (e) {
      return e !== "disabled";
    });
  };
  c._initTemplates = function () {
    e.prototype._initTemplates.call(this);
    var t = new h.BindableTemplate(function (e, t, n) {
      if ((0, r.isPlainObject)(t)) {
        var o = t.text;
        var a = t.html;
        var s = t.widget;
        if (o) {
          e.text(o).wrapInner("<div>");
        }
        if (a) {
          e.html(a);
        }
        if (s === "dxDropDownButton") {
          t.options = t.options ?? {};
          if (!(0, r.isDefined)(t.options.stylingMode)) {
            t.options.stylingMode = this.option("useFlatButtons") ? "text" : "contained";
          }
        }
        if (s === "dxButton") {
          if (this.option("useFlatButtons")) {
            t.options = t.options ?? {};
            t.options.stylingMode = t.options.stylingMode ?? "text";
          }
          if (this.option("useDefaultButtons")) {
            t.options = t.options ?? {};
            t.options.type = t.options.type ?? "default";
          }
        }
      } else {
        e.text(String(t));
      }
      this._getTemplate("dx-polymorph-widget").render({
        container: e,
        model: n,
        parent: this
      });
    }.bind(this), ["text", "html", "widget", "options"], this.option("integrationOptions.watchMethod"));
    this._templateManager.addDefaultTemplates({
      item: t,
      menuItem: t
    });
  };
  c._getDefaultOptions = function () {
    return (0, l.extend)(e.prototype._getDefaultOptions.call(this), {
      renderAs: "topToolbar",
      grouped: false,
      useFlatButtons: false,
      useDefaultButtons: false
    });
  };
  c._defaultOptionsRules = function () {
    return e.prototype._defaultOptionsRules.call(this).concat([{
      device: function () {
        return (0, a.isMaterial)();
      },
      options: {
        useFlatButtons: true
      }
    }]);
  };
  c._itemContainer = function () {
    return this._$toolbarItemsContainer.find([`.dx-toolbar-before`, `.dx-toolbar-center`, `.dx-toolbar-after`].join(","));
  };
  c._itemClass = function () {
    return "dx-toolbar-item";
  };
  c._itemDataKey = function () {
    return "dxToolbarItemDataKey";
  };
  c._dimensionChanged = function () {
    if (!this._disposed) {
      this._arrangeItems();
      this._applyCompactMode();
    }
  };
  c._initMarkup = function () {
    this._renderToolbar();
    this._renderSections();
    e.prototype._initMarkup.call(this);
  };
  c._render = function () {
    e.prototype._render.call(this);
    this._renderItemsAsync();
    this._updateDimensionsInMaterial();
  };
  c._postProcessRenderItems = function () {
    this._arrangeItems();
  };
  c._renderToolbar = function () {
    this.$element().addClass(p.TOOLBAR_CLASS);
    this._$toolbarItemsContainer = (0, o.default)("<div>").addClass("dx-toolbar-items-container").appendTo(this.$element());
    this.setAria("role", "toolbar");
  };
  c._renderSections = function () {
    var e = this;
    var t = this._$toolbarItemsContainer;
    (0, u.each)(["before", "center", "after"], function (n, i) {
      var a = `dx-toolbar-${i}`;
      if (!t.find(`.${a}`).length) {
        e[`_\$${i}Section`] = (0, o.default)("<div>").addClass(a).appendTo(t);
      }
    });
  };
  c._arrangeItems = function (e) {
    e = e ?? (0, i.getWidth)(this.$element());
    this._$centerSection.css({
      margin: "0 auto",
      float: "none"
    });
    var n = (0, d.getBoundingRect)(this._$beforeSection.get(0));
    var o = (0, d.getBoundingRect)(this._$afterSection.get(0));
    this._alignCenterSection(n, o, e);
    var a = this._$toolbarItemsContainer.find(`.dx-toolbar-label`).eq(0);
    var r = a.parent();
    if (a.length) {
      var s = n.width ? n.width : a.position().left;
      var l = r.hasClass("dx-toolbar-before") ? 0 : s;
      var u = r.hasClass("dx-toolbar-after") ? 0 : o.width;
      var c = 0;
      r.children().not(`.dx-toolbar-label`).each(function () {
        c += (0, i.getOuterWidth)(this);
      });
      var h = e - c;
      var f = Math.max(h - l - u, 0);
      if (r.hasClass("dx-toolbar-before")) {
        this._alignSection(this._$beforeSection, f);
      } else {
        var p = (0, i.getOuterWidth)(a) - (0, i.getWidth)(a);
        a.css("maxWidth", f - p);
      }
    }
  };
  c._alignCenterSection = function (e, t, n) {
    this._alignSection(this._$centerSection, n - e.width - t.width);
    var i = this.option("rtlEnabled");
    var o = i ? t : e;
    var a = i ? e : t;
    var r = (0, d.getBoundingRect)(this._$centerSection.get(0));
    if (o.right > r.left || r.right > a.left) {
      this._$centerSection.css({
        marginLeft: o.width,
        marginRight: a.width,
        float: o.width > a.width ? "none" : "right"
      });
    }
  };
  c._alignSection = function (e, t) {
    var n = e.find(`.dx-toolbar-label`).toArray();
    t -= this._getCurrentLabelsPaddings(n);
    var i = this._getCurrentLabelsWidth(n);
    var o = Math.abs(i - t);
    if (t < i) {
      n = n.reverse();
      this._alignSectionLabels(n, o, false);
    } else {
      this._alignSectionLabels(n, o, true);
    }
  };
  c._alignSectionLabels = function (e, t, n) {
    var i = function (e) {
      return (0, d.getBoundingRect)(e).width;
    };
    for (var a = 0; a < e.length; a++) {
      var r = (0, o.default)(e[a]);
      var s = Math.ceil(i(e[a]));
      var l = undefined;
      if (n) {
        r.css("maxWidth", "inherit");
      }
      var u = Math.ceil(n ? i(e[a]) : s);
      if (!(u < t)) {
        l = n ? s + t : s - t;
        r.css("maxWidth", l);
        break;
      }
      l = n ? u : 0;
      t -= u;
      r.css("maxWidth", l);
    }
  };
  c._applyCompactMode = function () {
    var e = this.$element();
    e.removeClass("dx-toolbar-compact");
    if (this.option("compactMode") && this._getSummaryItemsWidth(this.itemElements(), true) > (0, i.getWidth)(e)) {
      e.addClass("dx-toolbar-compact");
    }
  };
  c._getCurrentLabelsWidth = function (e) {
    var t = 0;
    e.forEach(function (e, n) {
      t += (0, i.getOuterWidth)(e);
    });
    return t;
  };
  c._getCurrentLabelsPaddings = function (e) {
    var t = 0;
    e.forEach(function (e, n) {
      t += (0, i.getOuterWidth)(e) - (0, i.getWidth)(e);
    });
    return t;
  };
  c._renderItem = function (t, n, i, o) {
    var s = n.location ?? "center";
    var l = i ?? this[`_\$${s}Section`];
    var u = !!(n.text ?? n.html);
    var d = e.prototype._renderItem.call(this, t, n, l, o);
    d.toggleClass("dx-toolbar-button", !u).toggleClass("dx-toolbar-label", u).addClass(n.cssClass);
    return d;
  };
  c._renderGroupedItems = function () {
    var e = this;
    (0, u.each)(this.option("items"), function (t, n) {
      var a = n.items;
      var r = (0, o.default)("<div>").addClass("dx-toolbar-group");
      var s = n.location ?? "center";
      if (a && a.length) {
        (0, u.each)(a, function (t, n) {
          e._renderItem(t, n, r, null);
        });
        e._$toolbarItemsContainer.find(`.dx-toolbar-${s}`).append(r);
      }
    });
  };
  c._renderItems = function (t) {
    if (this.option("grouped") && t.length && t[0].items) {
      this._renderGroupedItems();
    } else {
      e.prototype._renderItems.call(this, t);
    }
  };
  c._getToolbarItems = function () {
    return this.option("items") ?? [];
  };
  c._renderContentImpl = function () {
    var e = this._getToolbarItems();
    this.$element().toggleClass("dx-toolbar-mini", e.length === 0);
    if (this._renderedItemsCount) {
      this._renderItems(e.slice(this._renderedItemsCount));
    } else {
      this._renderItems(e);
    }
    this._applyCompactMode();
  };
  c._renderEmptyMessage = function () {};
  c._clean = function () {
    this._$toolbarItemsContainer.children().empty();
    this.$element().empty();
    delete this._$beforeSection;
    delete this._$centerSection;
    delete this._$afterSection;
  };
  c._visibilityChanged = function (e) {
    if (e) {
      this._arrangeItems();
    }
  };
  c._isVisible = function () {
    return (0, i.getWidth)(this.$element()) > 0 && (0, i.getHeight)(this.$element()) > 0;
  };
  c._getIndexByItem = function (e) {
    return this._getToolbarItems().indexOf(e);
  };
  c._itemOptionChanged = function (t, n, i) {
    e.prototype._itemOptionChanged.apply(this, [t, n, i]);
    this._arrangeItems();
  };
  c._optionChanged = function (t) {
    var n = t.name;
    t.value;
    switch (n) {
      case "width":
        e.prototype._optionChanged.apply(this, arguments);
        this._dimensionChanged();
        break;
      case "renderAs":
      case "useFlatButtons":
      case "useDefaultButtons":
        this._invalidate();
        break;
      case "compactMode":
        this._applyCompactMode();
        break;
      case "grouped":
        break;
      default:
        e.prototype._optionChanged.apply(this, arguments);
    }
  };
  c._dispose = function () {
    e.prototype._dispose.call(this);
    clearTimeout(this._waitParentAnimationTimeout);
  };
  c._updateDimensionsInMaterial = function () {
    var e;
    var t;
    var n = this;
    if ((0, a.isMaterial)()) {
      Promise.all([new Promise(function (e) {
        (function t() {
          clearTimeout(n._waitParentAnimationTimeout);
          n._waitParentAnimationTimeout = setTimeout(function () {
            i = true;
            n.$element().parents().each(function (e, t) {
              if (f.default.isAnimating((0, o.default)(t))) {
                i = false;
                return false;
              }
            });
            if (i) {
              e();
            }
            return i || t();
            var i;
          }, 15);
        })();
      }), (e = n.$element().find(`.dx-toolbar-label`), t = [], e.each(function (e, n) {
        var i = (0, o.default)(n).text();
        var r = (0, o.default)(n).css("fontWeight");
        t.push((0, a.waitWebFont)(i, r));
      }), Promise.all(t))]).then(function () {
        n._dimensionChanged();
      });
    }
  };
  return s;
}(c.default);
(0, s.default)("dxToolbarBase", _);
var v = _;
exports.default = v;
module.exports = exports.default;
module.exports.default = exports.default;