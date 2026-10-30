Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.headerPanelModule = undefined;
var i = c(require("./68374.js"));
var o = require("./20576.js");
var a = require("./47617.js");
var r = require("./13306.js");
var s = require("./35922.js");
var l = c(require("./28109.js"));
var u = c(require("./71042.js"));
var d = require("./57318.js");
function c(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
function h() {
  return (h = Object.assign ? Object.assign.bind() : function (e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var i in n) {
        if (Object.prototype.hasOwnProperty.call(n, i)) {
          e[i] = n[i];
        }
      }
    }
    return e;
  }).apply(this, arguments);
}
var f = ["addRowButton", "applyFilterButton", "columnChooserButton", "exportButton", "groupPanel", "revertButton", "saveButton", "searchPanel"];
var p = {
  _getToolbarItems: function () {
    return [];
  },
  _getButtonContainer: function () {
    return (0, i.default)("<div>").addClass(this.addWidgetPrefix("toolbar-button"));
  },
  _getToolbarButtonClass: function (e) {
    var t = e ? ` ${e}` : "";
    return this.addWidgetPrefix("toolbar-button") + t;
  },
  _getToolbarOptions: function () {
    var e = this.option("toolbar");
    var t = {
      toolbarOptions: {
        items: this._getToolbarItems(),
        visible: e == null ? undefined : e.visible,
        disabled: e == null ? undefined : e.disabled,
        onItemRendered: function (e) {
          var t = e.itemData.onItemRendered;
          if (t) {
            t(e);
          }
        }
      }
    };
    var n = e == null ? undefined : e.items;
    t.toolbarOptions.items = this._normalizeToolbarItems(t.toolbarOptions.items, n);
    this.executeAction("onToolbarPreparing", t);
    if (t.toolbarOptions && !(0, s.isDefined)(t.toolbarOptions.visible)) {
      var i = t.toolbarOptions.items;
      t.toolbarOptions.visible = !!(i == null ? undefined : i.length);
    }
    return t.toolbarOptions;
  },
  _normalizeToolbarItems: function (e, t) {
    e.forEach(function (e) {
      if (!f.includes(e.name)) {
        throw new Error(`Default toolbar item '${e.name}' is not added to DEFAULT_TOOLBAR_ITEM_NAMES`);
      }
    });
    var n = {
      location: "after"
    };
    var i = Array.isArray(t);
    if (!(0, s.isDefined)(t)) {
      return e;
    }
    if (!i) {
      t = [t];
    }
    var o = {};
    e.forEach(function (e) {
      o[e.name] = e;
    });
    var a = t.map(function (e) {
      if ((0, s.isString)(e)) {
        e = {
          name: e
        };
      }
      if ((0, s.isDefined)(e.name)) {
        if ((0, s.isDefined)(o[e.name])) {
          e = (0, r.extend)(true, {}, o[e.name], e);
        } else if (f.includes(e.name)) {
          e = h(h({}, e), {
            visible: false
          });
        }
      }
      return (0, r.extend)(true, {}, n, e);
    });
    if (i) {
      return a;
    } else {
      return a[0];
    }
  },
  _renderCore: function () {
    if (this._toolbar) {
      this._toolbar.option(this._toolbarOptions);
    } else {
      var e = this.element();
      e.addClass(this.addWidgetPrefix("header-panel"));
      var t = l.default.format(this.component.NAME + "-ariaToolbar");
      var n = (0, i.default)("<div>").attr("aria-label", t).appendTo(e);
      this._toolbar = this._createComponent(n, u.default, this._toolbarOptions);
    }
  },
  _columnOptionChanged: o.noop,
  _handleDataChanged: function () {
    if (this._requireReady) {
      this.render();
    }
  },
  init: function () {
    this.callBase();
    this.createAction("onToolbarPreparing", {
      excludeValidators: ["disabled", "readOnly"]
    });
  },
  render: function () {
    this._toolbarOptions = this._getToolbarOptions();
    this.callBase.apply(this, arguments);
  },
  setToolbarItemDisabled: function (e, t) {
    var n = this._toolbar;
    if (n) {
      var i = (n.option("items") || []).findIndex(function (t) {
        return t.name === e;
      });
      if (!(i < 0)) {
        var o = n.option(`items[${i}]`);
        n.option(`items[${i}].disabled`, t);
        if (o.options) {
          n.option(`items[${i}].options.disabled`, t);
        }
      }
    }
  },
  updateToolbarDimensions: function () {
    var e;
    if ((e = this._toolbar) !== null && e !== undefined) {
      e.updateDimensions();
    }
  },
  getHeaderPanel: function () {
    return this.element();
  },
  getHeight: function () {
    return this.getElementHeight();
  },
  optionChanged: function (e) {
    if (e.name === "onToolbarPreparing") {
      this._invalidate();
      e.handled = true;
    }
    if (e.name === "toolbar" && (e.handled = true, this._toolbar)) {
      var t = (0, a.getPathParts)(e.fullName);
      var n = e.fullName.replace(/^toolbar\./, "");
      if (t.length === 1) {
        var i = this._getToolbarOptions();
        this._toolbar.option(i);
      } else if (t[1] === "items") {
        if (t.length === 2) {
          var o = this._getToolbarOptions();
          this._toolbar.option("items", o.items);
        } else if (t.length === 3) {
          var r = this._normalizeToolbarItems(this._getToolbarItems(), e.value);
          this._toolbar.option(n, r);
        } else if (t.length >= 4) {
          this._toolbar.option(n, e.value);
        }
      } else {
        this._toolbar.option(n, e.value);
      }
    }
    this.callBase(e);
  },
  isVisible: function () {
    return !!this._toolbarOptions && !!this._toolbarOptions.visible;
  },
  allowDragging: o.noop,
  hasGroupedColumns: o.noop
};
var g = {
  defaultOptions: function () {
    return {};
  },
  views: {
    headerPanel: d.ColumnsView.inherit(p)
  },
  extenders: {
    controllers: {
      resizing: {
        _updateDimensionsCore: function () {
          this.callBase.apply(this, arguments);
          this.getView("headerPanel").updateToolbarDimensions();
        }
      }
    }
  }
};
exports.headerPanelModule = g;