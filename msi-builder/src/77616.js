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
var o = y(require("./9549.js"));
var a = y(require("./68374.js"));
var r = y(require("./30963.js"));
var s = y(require("./71042.js"));
require("./78665.js");
require("./89838.js");
require("./34171.js");
var l = y(require("./96688.js"));
var u = y(require("./38110.js"));
var d = require("./95479.js");
var c = require("./35922.js");
var h = require("./13306.js");
var f = y(require("./28109.js"));
var p = require("./78008.js");
var g = y(require("./55994.js"));
var m = require("./39611.js");
var _ = require("./28822.js");
var v = require("./92077.js");
function y(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
function b(e, t) {
  for (var n = 0; n < t.length; n++) {
    var o = t[n];
    o.enumerable = o.enumerable || false;
    o.configurable = true;
    if ("value" in o) {
      o.writable = true;
    }
    Object.defineProperty(e, (a = o.key, r = undefined, r = function (e, t) {
      if (i(e) !== "object" || e === null) {
        return e;
      }
      var n = e[Symbol.toPrimitive];
      if (n !== undefined) {
        var o = n.call(e, t || "default");
        if (i(o) !== "object") {
          return o;
        }
        throw new TypeError("@@toPrimitive must return a primitive value.");
      }
      return (t === "string" ? String : Number)(e);
    }(a, "string"), i(r) === "symbol" ? r : String(r)), o);
  }
  var a;
  var r;
}
function x(e, t) {
  return (x = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (e, t) {
    e.__proto__ = t;
    return e;
  })(e, t);
}
var w = r.default;
if (o.default) {
  var C = {
    66: "bold",
    73: "italic",
    85: "underline"
  };
  var S = {
    b: 66,
    i: 73,
    u: 85
  };
  function k(e) {
    return f.default.format(`dxHtmlEditor-${(0, p.camelize)(e)}`);
  }
  w = function (e) {
    var t;
    var n;
    function i(t, n) {
      var i;
      (i = e.call(this, t, n) || this)._toolbarWidgets = new u.default();
      i._formatHandlers = (0, v.getFormatHandlers)(function (e) {
        if (e === undefined) {
          throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }
        return e;
      }(i));
      i._tableFormats = (0, _.getTableFormats)(t);
      if ((0, c.isDefined)(n.items)) {
        i._addCallbacks();
        i._renderToolbar();
        var o = i.toolbarInstance._layoutStrategy._menu;
        if (o) {
          var a = o._renderPopup;
          o._renderPopup = function () {
            for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) {
              t[n] = arguments[n];
            }
            a.apply.apply(a, [o].concat(t));
            o._popup.on("showing", function () {
              i._updateToolbar(true);
            });
          };
        }
        i.quill.on("editor-change", function (e, t, n, o) {
          if (o !== "silent" || !(0, c.isEmptyObject)(i.quill.getFormat())) {
            var a = e === "selection-change";
            i._updateToolbar(a);
          }
        });
      }
      return i;
    }
    n = e;
    (t = i).prototype = Object.create(n.prototype);
    t.prototype.constructor = t;
    x(t, n);
    var o;
    var r;
    var f;
    var y = i.prototype;
    y._addCallbacks = function () {
      this.addCleanCallback(this.clean.bind(this));
      this.editorInstance.addContentInitializedCallback(this.updateHistoryWidgets.bind(this));
    };
    y._updateToolbar = function (e) {
      this.updateFormatWidgets(e);
      this.updateHistoryWidgets();
      this.updateTableWidgets();
    };
    y._updateFormatWidget = function (e, t, n) {
      var i = this._toolbarWidgets.getByName(e);
      if (i) {
        if (t) {
          this._markActiveFormatWidget(e, i, n);
        } else {
          this._resetFormatWidget(e, i);
          if (Object.prototype.hasOwnProperty.call(e)) {
            delete n[e];
          }
        }
        this._toggleClearFormatting(t || !(0, c.isEmptyObject)(n));
      }
    };
    y._renderToolbar = function () {
      var e = this;
      var t = this.options.container || this._getContainer();
      this._$toolbar = (0, a.default)("<div>").addClass("dx-htmleditor-toolbar").appendTo(t);
      this._$toolbarContainer = (0, a.default)(t).addClass("dx-htmleditor-toolbar-wrapper");
      g.default.on(this._$toolbarContainer, (0, m.addNamespace)("mousedown", this.editorInstance.NAME), function (e) {
        e.preventDefault();
      });
      this._subscribeFormatHotKeys();
      this.toolbarInstance = this.editorInstance._createComponent(this._$toolbar, s.default, this.toolbarConfig);
      this.editorInstance.on("optionChanged", function (t) {
        var n = t.name;
        if (n === "readOnly" || n === "disabled") {
          e.toolbarInstance.option("disabled", e.isInteractionDisabled);
        }
      });
    };
    y.isMultilineMode = function () {
      var e;
      return (e = this.options.multiline) === null || e === undefined || e;
    };
    y.clean = function () {
      this._toolbarWidgets.clear();
      if (this._$toolbarContainer) {
        this._$toolbarContainer.empty().removeClass("dx-htmleditor-toolbar-wrapper");
      }
    };
    y.repaint = function () {
      if (this.toolbarInstance) {
        this.toolbarInstance.repaint();
      }
    };
    y._getContainer = function () {
      var e = (0, a.default)("<div>");
      this.editorInstance.$element().prepend(e);
      return e;
    };
    y._detectRenamedOptions = function (e) {
      if ((0, c.isObject)(e)) {
        (0, d.each)([{
          newName: "name",
          oldName: "formatName"
        }, {
          newName: "acceptedValues",
          oldName: "formatValues"
        }], function (t, n) {
          if (Object.prototype.hasOwnProperty.call(e, n.oldName)) {
            l.default.log("W1016", n.oldName, n.newName);
          }
        });
      }
    };
    y._subscribeFormatHotKeys = function () {
      this.quill.keyboard.addBinding({
        which: S.b,
        shortKey: true
      }, this._handleFormatHotKey.bind(this));
      this.quill.keyboard.addBinding({
        which: S.i,
        shortKey: true
      }, this._handleFormatHotKey.bind(this));
      this.quill.keyboard.addBinding({
        which: S.u,
        shortKey: true
      }, this._handleFormatHotKey.bind(this));
    };
    y._handleFormatHotKey = function (e, t, n) {
      var i = n.which;
      var o = C[i];
      this._updateButtonState(o);
    };
    y._updateButtonState = function (e) {
      var t = this._toolbarWidgets.getByName(e);
      var n = this.quill.getFormat();
      if (n[e]) {
        this._markActiveFormatWidget(e, t, n);
      } else {
        this._resetFormatWidget(e, t);
      }
    };
    y._prepareToolbarItems = function () {
      var e = this;
      var t = [];
      (0, d.each)(this.options.items, function (n, i) {
        var o;
        e._detectRenamedOptions(i);
        if ((0, c.isObject)(i)) {
          o = e._handleObjectItem(i);
        } else if ((0, c.isString)(i)) {
          var a = e._prepareButtonItemConfig(i);
          o = e._getToolbarItem(a);
        }
        if (o) {
          t.push(o);
        }
      });
      return t;
    };
    y._handleObjectItem = function (e) {
      if (e.name && e.acceptedValues && this._isAcceptableItem(e.widget, "dxSelectBox")) {
        var t = this._prepareSelectItemConfig(e);
        return this._getToolbarItem(t);
      }
      if (e.name && this._isAcceptableItem(e.widget, "dxButton")) {
        var n = this._prepareButtonItemConfig(e.name);
        var i = (0, h.extend)(true, n, e);
        return this._getToolbarItem(i);
      }
      return this._getToolbarItem(e);
    };
    y._isAcceptableItem = function (e, t) {
      return !e || e === t;
    };
    y._prepareButtonItemConfig = function (e) {
      var n = v.ICON_MAP[e] ?? e;
      var i = (0, p.titleize)(e);
      return {
        widget: "dxButton",
        name: e,
        options: {
          hint: k(i),
          text: k(i),
          icon: n.toLowerCase(),
          onClick: this._formatHandlers[e] || (0, v.getDefaultClickHandler)(this, e),
          stylingMode: "text"
        },
        showText: "inMenu"
      };
    };
    y._prepareSelectItemConfig = function (e) {
      var t = this;
      var n = e.name;
      var i = e.acceptedValues;
      return (0, h.extend)(true, {
        widget: "dxSelectBox",
        name: n,
        options: {
          stylingMode: "filled",
          dataSource: i,
          displayExpr: function (e) {
            return function (e, t) {
              if (t === "header") {
                if ((0, c.isDefined)(e) && e !== false) {
                  return `${k("heading")} ${e}`;
                } else {
                  return k("normalText");
                }
              } else {
                return k(e) || e;
              }
            }(e, n);
          },
          placeholder: k(n),
          onValueChanged: function (e) {
            if (!t._isReset) {
              t._hideAdaptiveMenu();
              (0, v.applyFormat)(t, [n, e.value, "user"], e.event);
              t._setValueSilent(e.component, e.value);
            }
          }
        }
      }, e);
    };
    y._hideAdaptiveMenu = function () {
      if (this.toolbarInstance.option("overflowMenuVisible")) {
        this.toolbarInstance.option("overflowMenuVisible", false);
      }
    };
    y._getToolbarItem = function (e) {
      var t = this;
      var n = {
        options: {
          onInitialized: function (n) {
            if (e.name) {
              n.component.$element().addClass("dx-htmleditor-toolbar-format");
              n.component.$element().toggleClass(`dx-${e.name.toLowerCase()}-format`, !!e.name);
              t._toolbarWidgets.add(e.name, n.component);
            }
          },
          onDisposing: function () {
            t._toolbarWidgets.remove(e.name);
          }
        }
      };
      return (0, h.extend)(true, {
        location: "before",
        locateInMenu: "auto"
      }, this._getDefaultConfig(e.name), e, n);
    };
    y._getDefaultItemsConfig = function () {
      return {
        clear: {
          options: {
            disabled: true
          }
        },
        undo: {
          options: {
            disabled: true
          }
        },
        redo: {
          options: {
            disabled: true
          }
        },
        insertRowAbove: {
          options: {
            disabled: true
          }
        },
        insertRowBelow: {
          options: {
            disabled: true
          }
        },
        insertHeaderRow: {
          options: {
            disabled: true
          }
        },
        insertColumnLeft: {
          options: {
            disabled: true
          }
        },
        insertColumnRight: {
          options: {
            disabled: true
          }
        },
        deleteRow: {
          options: {
            disabled: true
          }
        },
        deleteColumn: {
          options: {
            disabled: true
          }
        },
        deleteTable: {
          options: {
            disabled: true
          }
        },
        cellProperties: {
          options: {
            disabled: true
          }
        },
        tableProperties: {
          options: {
            disabled: true
          }
        },
        separator: {
          template: function (e, t, n) {
            (0, a.default)(n).addClass("dx-htmleditor-toolbar-separator");
          },
          menuItemTemplate: function (e, t, n) {
            (0, a.default)(n).addClass("dx-htmleditor-toolbar-menu-separator");
          }
        }
      };
    };
    y._getDefaultConfig = function (e) {
      return this._getDefaultItemsConfig()[e];
    };
    y.updateHistoryWidgets = function () {
      var e = this.quill.history;
      if (e) {
        var t = e.stack;
        var n = t.undo;
        var i = t.redo;
        this._updateManipulationWidget(this._toolbarWidgets.getByName("undo"), Boolean(n.length));
        this._updateManipulationWidget(this._toolbarWidgets.getByName("redo"), Boolean(i.length));
      }
    };
    y.updateTableWidgets = function () {
      var e = this;
      if (this.quill.getModule("table")) {
        var t = this.quill.getSelection();
        var n = t && this.quill.getFormat(t) || {};
        var i = this._tableFormats.some(function (e) {
          return Boolean(n[e]);
        });
        _.TABLE_OPERATIONS.forEach(function (t) {
          var n = t === "insertTable";
          var o = e._toolbarWidgets.getByName(t);
          e._updateManipulationWidget(o, n ? !i : i);
        });
      }
    };
    y._updateManipulationWidget = function (e, t) {
      if (e) {
        e.option("disabled", !t);
      }
    };
    y.updateFormatWidgets = function (e) {
      var t = this.quill.getSelection();
      if (t) {
        var n = this.quill.getFormat(t);
        var i = !(0, c.isEmptyObject)(n);
        if (!i || !!e) {
          this._resetFormatWidgets();
        }
        for (var o in n) {
          var a = this._getFormatWidgetName(o, n);
          var r = this._toolbarWidgets.getByName(a) || this._toolbarWidgets.getByName(o);
          if (r) {
            this._markActiveFormatWidget(o, r, n);
          }
        }
        this._toggleClearFormatting(i || t.length > 1);
      }
    };
    y._markActiveFormatWidget = function (e, t, n) {
      if (this._isColorFormat(e)) {
        this._updateColorWidget(e, n[e]);
      }
      if ("value" in t.option()) {
        this._setValueSilent(t, n[e]);
      } else {
        t.$element().addClass("dx-format-active");
      }
    };
    y._toggleClearFormatting = function (e) {
      var t = this._toolbarWidgets.getByName("clear");
      if (t) {
        t.option("disabled", !e);
      }
    };
    y._isColorFormat = function (e) {
      return e === "color" || e === "background";
    };
    y._updateColorWidget = function (e, t) {
      var n = this._toolbarWidgets.getByName(e);
      if (n) {
        n.$element().find(`.dx-icon`).css("borderBottomColor", t || "transparent");
      }
    };
    y._getFormatWidgetName = function (e, t) {
      var n;
      switch (e) {
        case "align":
          n = e + (0, p.titleize)(t[e]);
          break;
        case "list":
          n = t[e] + (0, p.titleize)(e);
          break;
        case "code-block":
          n = "codeBlock";
          break;
        case "script":
          n = t[e] + e;
          break;
        case "imageSrc":
          n = "image";
          break;
        default:
          n = e;
      }
      return n;
    };
    y._setValueSilent = function (e, t) {
      this._isReset = true;
      e.option("value", t);
      this._isReset = false;
    };
    y._resetFormatWidgets = function () {
      var e = this;
      this._toolbarWidgets.each(function (t, n) {
        e._resetFormatWidget(t, n);
      });
    };
    y._resetFormatWidget = function (e, t) {
      t.$element().removeClass("dx-format-active");
      if (this._isColorFormat(e)) {
        this._updateColorWidget(e);
      }
      if (e === "clear") {
        t.option("disabled", true);
      }
      if (t.NAME === "dxSelectBox") {
        this._setValueSilent(t, null);
      }
    };
    y.addClickHandler = function (e, t) {
      this._formatHandlers[e] = t;
      var n = this._toolbarWidgets.getByName(e);
      if (n && n.NAME === "dxButton") {
        n.option("onClick", t);
      }
    };
    o = i;
    if (r = [{
      key: "toolbarConfig",
      get: function () {
        return {
          dataSource: this._prepareToolbarItems(),
          disabled: this.isInteractionDisabled,
          menuContainer: this._$toolbarContainer,
          multiline: this.isMultilineMode()
        };
      }
    }, {
      key: "isInteractionDisabled",
      get: function () {
        return this.editorInstance.option("readOnly") || this.editorInstance.option("disabled");
      }
    }]) {
      b(o.prototype, r);
    }
    if (f) {
      b(o, f);
    }
    Object.defineProperty(o, "prototype", {
      writable: false
    });
    return i;
  }(r.default);
}
var D = w;
exports.default = D;
module.exports = exports.default;
module.exports.default = exports.default;