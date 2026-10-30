exports.SingleLineStrategy = undefined;
var i = require("./58664.js");
var o = d(require("./68374.js"));
var a = require("./95479.js");
var r = require("./20576.js");
var s = require("./13306.js");
var l = d(require("./49150.js"));
var u = require("./47617.js");
function d(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
function c(e) {
  return function (e) {
    if (Array.isArray(e)) {
      return h(e);
    }
  }(e) || function (e) {
    if (typeof Symbol != "undefined" && e[Symbol.iterator] != null || e["@@iterator"] != null) {
      return Array.from(e);
    }
  }(e) || function (e, t) {
    if (!e) {
      return;
    }
    if (typeof e == "string") {
      return h(e, t);
    }
    var n = Object.prototype.toString.call(e).slice(8, -1);
    if (n === "Object" && e.constructor) {
      n = e.constructor.name;
    }
    if (n === "Map" || n === "Set") {
      return Array.from(e);
    }
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) {
      return h(e, t);
    }
  }(e) || function () {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }();
}
function h(e, t) {
  if (t == null || t > e.length) {
    t = e.length;
  }
  for (var n = 0, i = new Array(t); n < t; n++) {
    i[n] = e[n];
  }
  return i;
}
var f = function () {
  function e(e) {
    this._toolbar = e;
  }
  var t = e.prototype;
  t._initMarkup = function () {
    var e = this;
    (0, r.deferRender)(function () {
      e._renderOverflowMenu();
      e._renderMenuItems();
    });
  };
  t._renderOverflowMenu = function () {
    var e = this;
    if (this._hasVisibleMenuItems()) {
      this._renderMenuButtonContainer();
      var t = (0, o.default)("<div>").appendTo(this._overflowMenuContainer());
      var n = this._toolbar._createActionByOption("onItemClick");
      var i = this._toolbar._getTemplateByOption("menuItemTemplate");
      this._menu = this._toolbar._createComponent(t, l.default, {
        disabled: this._toolbar.option("disabled"),
        itemTemplate: function () {
          return i;
        },
        onItemClick: function (e) {
          n(e);
        },
        container: this._toolbar.option("menuContainer"),
        onOptionChanged: function (t) {
          var n = t.name;
          var i = t.value;
          if (n === "opened") {
            e._toolbar.option("overflowMenuVisible", i);
          }
          if (n === "items") {
            e._updateMenuVisibility(i);
          }
        }
      });
    }
  };
  t.renderMenuItems = function () {
    if (!this._menu) {
      this._renderOverflowMenu();
    }
    if (this._menu) {
      this._menu.option("items", this._getMenuItems());
    }
    if (this._menu && !this._menu.option("items").length) {
      this._menu.option("opened", false);
    }
  };
  t._renderMenuButtonContainer = function () {
    this._$overflowMenuContainer = (0, o.default)("<div>").appendTo(this._toolbar._$afterSection).addClass("dx-toolbar-button").addClass("dx-toolbar-menu-container");
  };
  t._overflowMenuContainer = function () {
    return this._$overflowMenuContainer;
  };
  t._updateMenuVisibility = function (e) {
    var t = e ?? this._getMenuItems();
    var n = t.length && this._hasVisibleMenuItems(t);
    this._toggleMenuVisibility(n);
  };
  t._toggleMenuVisibility = function (e) {
    if (this._overflowMenuContainer()) {
      this._overflowMenuContainer().toggleClass("dx-state-invisible", !e);
    }
  };
  t._renderMenuItems = function () {
    var e = this;
    (0, r.deferRender)(function () {
      e.renderMenuItems();
    });
  };
  t._dimensionChanged = function () {
    this.renderMenuItems();
  };
  t._getToolbarItems = function () {
    var t = this;
    return (0, r.grep)(this._toolbar.option("items") ?? [], function (e) {
      return !t._toolbar._isMenuItem(e);
    });
  };
  t._getMenuItems = function () {
    var n = this;
    var i = (0, r.grep)(this._toolbar.option("items") ?? [], function (e) {
      return n._toolbar._isMenuItem(e);
    });
    var a = this._toolbar._itemContainer().children(`.dx-toolbar-item-auto-hide.dx-toolbar-item-invisible`).not(`.dx-state-invisible`);
    this._restoreItems = this._restoreItems ?? [];
    var l = [].slice.call(a).map(function (e) {
      var t = n._toolbar._getItemData(e);
      var i = (0, o.default)(e);
      var a = i.children();
      return (0, s.extend)({
        menuItemTemplate: function () {
          n._restoreItems.push({
            container: i,
            item: a
          });
          return (0, o.default)("<div>").addClass("dx-toolbar-item-auto-hide").append(a);
        }
      }, t);
    });
    return [].concat(c(l), c(i));
  };
  t._hasVisibleMenuItems = function (e) {
    var t = e ?? this._toolbar.option("items");
    var n = false;
    var i = (0, u.compileGetter)("visible");
    var o = (0, u.compileGetter)("locateInMenu");
    (0, a.each)(t, function (e, t) {
      var a = i(t, {
        functionsAsIs: true
      });
      var r = o(t, {
        functionsAsIs: true
      });
      if (a !== false && (r === "auto" || r === "always") || t.location === "menu") {
        n = true;
      }
    });
    return n;
  };
  t._arrangeItems = function () {
    this._toolbar._$centerSection.css({
      margin: "0 auto",
      float: "none"
    });
    (0, a.each)(this._restoreItems ?? [], function (e, t) {
      (0, o.default)(t.container).append(t.item);
    });
    this._restoreItems = [];
    var t = (0, i.getWidth)(this._toolbar.$element());
    this._hideOverflowItems(t);
    return t;
  };
  t._hideOverflowItems = function (e) {
    var n = this._toolbar.$element().find(`.dx-toolbar-item-auto-hide`);
    if (n.length) {
      e = e ?? (0, i.getWidth)(this._toolbar.$element());
      (0, o.default)(n).removeClass("dx-toolbar-item-invisible");
      for (var a = this._getItemsWidth(); n.length && e < a;) {
        var r = n.eq(-1);
        a -= (0, i.getOuterWidth)(r);
        r.addClass("dx-toolbar-item-invisible");
        n.splice(-1, 1);
      }
    }
  };
  t._getItemsWidth = function () {
    return this._toolbar._getSummaryItemsWidth([this._toolbar._$beforeSection, this._toolbar._$centerSection, this._toolbar._$afterSection]);
  };
  t._itemOptionChanged = function (e, t, n) {
    var i;
    if (this._toolbar._isMenuItem(e) && (t === "disabled" || t === "options.disabled")) {
      if ((i = this._menu) !== null && i !== undefined) {
        i._itemOptionChanged(e, t, n);
      }
      return;
    }
    this.renderMenuItems();
  };
  t._renderItem = function (e, t) {
    if (e.locateInMenu === "auto") {
      t.addClass("dx-toolbar-item-auto-hide");
    }
  };
  t._optionChanged = function (e, t) {
    var n;
    var i;
    var o;
    var a;
    var r;
    switch (e) {
      case "disabled":
        if ((n = this._menu) !== null && n !== undefined) {
          n.option(e, t);
        }
        break;
      case "overflowMenuVisible":
        if ((i = this._menu) !== null && i !== undefined) {
          i.option("opened", t);
        }
        break;
      case "onItemClick":
        if ((o = this._menu) !== null && o !== undefined) {
          o.option(e, t);
        }
        break;
      case "menuContainer":
        if ((a = this._menu) !== null && a !== undefined) {
          a.option("container", t);
        }
        break;
      case "menuItemTemplate":
        if ((r = this._menu) !== null && r !== undefined) {
          r.option("itemTemplate", t);
        }
    }
  };
  return e;
}();
exports.SingleLineStrategy = f;