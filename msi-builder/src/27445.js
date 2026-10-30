var i = require("./58664.js");
var o = c(require("./68374.js"));
var a = c(require("./86976.js"));
var r = c(require("./28109.js"));
var s = require("./40245.js");
var l = c(require("./61225.js"));
var u = c(require("./89799.js"));
var d = require("./31583.js");
function c(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
(0, s.register)("menu", "context", l.default.inherit({
  _init: function () {
    var e = (0, o.default)("<div>").addClass("dx-list-context-menu");
    this._list.$element().append(e);
    this._menu = this._renderOverlay(e);
  },
  _renderOverlay: function (e) {
    return this._list._createComponent(e, u.default, {
      shading: false,
      deferRendering: true,
      hideOnParentScroll: true,
      hideOnOutsideClick: function (e) {
        return !(0, o.default)(e.target).closest(".dx-list-context-menu").length;
      },
      animation: {
        show: {
          type: "slide",
          duration: 300,
          from: {
            height: 0,
            opacity: 1
          },
          to: {
            height: function () {
              return (0, i.getOuterHeight)(this._$menuList);
            }.bind(this),
            opacity: 1
          }
        },
        hide: {
          type: "slide",
          duration: 0,
          from: {
            opacity: 1
          },
          to: {
            opacity: 0
          }
        }
      },
      _ignoreFunctionValueDeprecation: true,
      height: function () {
        if (this._$menuList) {
          return (0, i.getOuterHeight)(this._$menuList);
        } else {
          return 0;
        }
      }.bind(this),
      width: function () {
        return (0, i.getOuterWidth)(this._list.$element());
      }.bind(this),
      onContentReady: this._renderMenuContent.bind(this)
    });
  },
  _renderMenuContent: function (e) {
    var t = e.component.$content();
    var n = this._menuItems().slice();
    if (this._deleteEnabled()) {
      n.push({
        text: r.default.format("dxListEditDecorator-delete"),
        action: this._deleteItem.bind(this)
      });
    }
    this._$menuList = (0, o.default)("<div>");
    this._list._createComponent(this._$menuList, d.ListBase, {
      items: n,
      onItemClick: this._menuItemClickHandler.bind(this),
      height: "auto",
      integrationOptions: {}
    });
    t.addClass("dx-list-context-menucontent");
    t.append(this._$menuList);
  },
  _menuItemClickHandler: function (e) {
    this._menu.hide();
    this._fireMenuAction(this._$itemWithMenu, e.itemData.action);
  },
  _deleteItem: function () {
    this._list.deleteItem(this._$itemWithMenu);
  },
  handleContextMenu: function (e) {
    this._$itemWithMenu = e;
    this._menu.option({
      position: {
        my: "top",
        at: "bottom",
        of: e,
        collision: "flip"
      }
    });
    this._menu.show();
    return true;
  },
  dispose: function () {
    if (this._menu) {
      this._menu.$element().remove();
    }
    this.callBase.apply(this, arguments);
  }
}).include(a.default));