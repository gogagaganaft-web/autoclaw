exports.default = undefined;
var i;
var o = (i = require("./68374.js")) && i.__esModule ? i : {
  default: i
};
var a = require("./44899.js");
function r(e) {
  return (r = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function (e) {
    return typeof e;
  } : function (e) {
    if (e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype) {
      return "symbol";
    } else {
      return typeof e;
    }
  })(e);
}
var s = {
  getContextMenuItemTemplate: function (e, t, n, i) {
    var r = (0, o.default)(i);
    r.empty();
    var s = t.rootCommand !== undefined ? t.rootCommand : -1;
    if (t.icon && !t.checked) {
      var l = (0, a.getImageContainer)(t.icon);
      r.append(l);
    } else if (e._menuHasCheckedItems && e._menuHasCheckedItems[s] === true) {
      var u = (0, a.getImageContainer)("check");
      u.css("visibility", t.checked ? "visible" : "hidden");
      r.append(u);
    }
    r.append("<span class=\"dx-menu-item-text\">" + t.text + "</span>");
    if (Array.isArray(t.items) && t.items.length > 0) {
      r.append("<span class=\"dx-menu-item-popout-container\"><div class=\"dx-menu-item-popout\"></div></span>");
    }
  },
  getContextMenuCssClass: function () {
    return "dx-diagram-contextmenu";
  },
  onContextMenuItemClick: function (e, t, n) {
    if (t.command === undefined && t.name === undefined || Array.isArray(t.items) && t.items.length) {
      if (t.rootCommand !== undefined && t.value !== undefined) {
        var i = s.getItemCommandParameter(e, t, t.value);
        n.call(this, t.rootCommand, undefined, i);
      }
    } else {
      var o = s.getItemCommandParameter(e, t);
      n.call(this, t.command, t.name, o);
    }
  },
  getItemValue: function (e) {
    if (r(e.value) === "object") {
      return JSON.stringify(e.value);
    } else {
      return e.value;
    }
  },
  getItemOptionText: function (e, t) {
    if (e) {
      t = t.slice();
      var n = this._getParentItemOptionText(t);
      if (e._originalItemsInfo && e._originalItemsInfo[n]) {
        t[t.length - 1] += e._originalItemsInfo[n].indexPathCorrection;
      }
    }
    return this._getItemOptionTextCore(t);
  },
  _getParentItemOptionText: function (e) {
    var t = e.slice(0, e.length - 1);
    return this._getItemOptionTextCore(t);
  },
  _getItemOptionTextCore: function (e) {
    return e.reduce(function (e, t) {
      return `${e}items[${t}].`;
    }, "");
  },
  getItemCommandParameter: function (e, t, n) {
    if (t.getParameter) {
      return t.getParameter(e);
    } else {
      return n;
    }
  },
  updateContextMenuItems: function (e, t, n, i) {
    var o = this;
    e._originalItemsInfo ||= {};
    e._originalItemsInfo[t] ||= {
      items: e.option(t + "items") || []
    };
    i = i.map(function (t) {
      return {
        value: o.getItemValue(t),
        text: t.text,
        checked: t.checked,
        widget: e,
        rootCommand: n
      };
    });
    var a = e._originalItemsInfo[t].items;
    e.option(t + "items", i.concat(a));
    if (e._originalItemsInfo[t] && a.length) {
      e._originalItemsInfo[t].indexPathCorrection = i.length;
    }
  },
  updateContextMenuItemVisible: function (e, t, n) {
    e.option(t + "visible", n);
  },
  updateContextMenuItemValue: function (e, t, n, i) {
    var o = e.option(t + "items");
    if (typeof i != "boolean" || o && o.length) {
      if (i !== undefined) {
        this._setContextMenuHasCheckedItems(e, n);
        if (Array.isArray(o)) {
          o.forEach(function (e, t) {
            e.checked = e.value === i;
          });
        }
      }
    } else {
      this._setContextMenuHasCheckedItems(e, -1);
      e.option(t + "checked", i);
    }
  },
  _setContextMenuHasCheckedItems: function (e, t) {
    e._menuHasCheckedItems ||= {};
    e._menuHasCheckedItems[t] = true;
  }
};
var l = s;
exports.default = l;
module.exports = exports.default;
module.exports.default = exports.default;