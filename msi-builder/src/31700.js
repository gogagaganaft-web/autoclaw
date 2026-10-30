exports.default = undefined;
var i = m(require("./9549.js"));
var o = m(require("./68374.js"));
var a = m(require("./30963.js"));
var r = m(require("./55994.js"));
var s = require("./39611.js");
var l = m(require("./10042.js"));
var u = m(require("./28109.js"));
var d = require("./28822.js");
var c = require("./92077.js");
var h = require("./95479.js");
var f = require("./35922.js");
var p = require("./78008.js");
var g = require("./13306.js");
function m(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
function _(e, t) {
  return (_ = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (e, t) {
    e.__proto__ = t;
    return e;
  })(e, t);
}
var v = (0, s.addNamespace)("dxcontextmenu", "dxHtmlEditorTableContextMenu");
var y = a.default;
function b(e) {
  return u.default.format(`dxHtmlEditor-${(0, p.camelize)(e)}`);
}
if (i.default) {
  y = function (e) {
    var t;
    var n;
    function i(t, n) {
      var i;
      (i = e.call(this, t, n) || this).enabled = !!n.enabled;
      i._quillContainer = i.editorInstance._getQuillContainer();
      i.addCleanCallback(i.prepareCleanCallback());
      i._formatHandlers = (0, c.getFormatHandlers)(function (e) {
        if (e === undefined) {
          throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }
        return e;
      }(i));
      i._tableFormats = (0, d.getTableFormats)(t);
      if (i.enabled) {
        i._enableContextMenu(n.items);
      }
      return i;
    }
    n = e;
    (t = i).prototype = Object.create(n.prototype);
    t.prototype.constructor = t;
    _(t, n);
    var a = i.prototype;
    a._enableContextMenu = function (e) {
      var t;
      if ((t = this._contextMenu) !== null && t !== undefined) {
        t.dispose();
      }
      this._contextMenu = this._createContextMenu(e);
      this._attachEvents();
    };
    a._attachEvents = function () {
      r.default.on(this.editorInstance._getContent(), v, this._prepareContextMenuHandler());
    };
    a._detachEvents = function () {
      r.default.off(this.editorInstance._getContent(), v);
    };
    a._createContextMenu = function (e) {
      var t = (0, o.default)("<div>").appendTo(this.editorInstance.$element());
      var n = this._getMenuConfig(e);
      return this.editorInstance._createComponent(t, l.default, n);
    };
    a.showPropertiesForm = function (e = "cell") {
      var t = (0, o.default)(this._targetElement).closest(e === "cell" ? "th, td" : "table");
      this._contextMenu.hide();
      this._formatHandlers[`${e}Properties`](t);
      this._targetElement = null;
    };
    a._isAcceptableItem = function (e, t) {
      return !e || e === t;
    };
    a._handleObjectItem = function (e) {
      if (e.name && this._isAcceptableItem(e.widget, "dxButton")) {
        var t = this._prepareMenuItemConfig(e.name);
        return (0, g.extend)(true, t, e);
      }
      if (e.items) {
        e.items = this._prepareMenuItems(e.items);
        return e;
      } else {
        return e;
      }
    };
    a._prepareMenuItemConfig = function (e) {
      var i = c.ICON_MAP[e] ?? e;
      var o = (0, p.titleize)(e);
      return {
        text: b(o),
        icon: i.toLowerCase(),
        onClick: this._formatHandlers[e] ?? (0, c.getDefaultClickHandler)(this, e)
      };
    };
    a._prepareMenuItems = function (e) {
      var t = this;
      var n = [];
      (0, h.each)(e, function (e, i) {
        var o;
        if ((0, f.isObject)(i)) {
          o = t._handleObjectItem(i);
        } else if ((0, f.isString)(i)) {
          o = t._prepareMenuItemConfig(i);
        }
        if (o) {
          n.push(o);
        }
      });
      return n;
    };
    a._getMenuConfig = function (e) {
      var t = this;
      var n = [{
        text: b("insert"),
        items: ["insertHeaderRow", "insertRowAbove", "insertRowBelow", (0, g.extend)(this._prepareMenuItemConfig("insertColumnLeft"), {
          beginGroup: true
        }), "insertColumnRight"]
      }, {
        text: b("delete"),
        items: ["deleteColumn", "deleteRow", "deleteTable"]
      }, (0, g.extend)(this._prepareMenuItemConfig("cellProperties"), {
        onClick: function (e) {
          t.showPropertiesForm("cell");
        }
      }), (0, g.extend)(this._prepareMenuItemConfig("tableProperties"), {
        onClick: function (e) {
          t.showPropertiesForm("table");
        }
      })];
      var i = this._prepareMenuItems(e != null && e.length ? e : n);
      return {
        target: this._quillContainer,
        showEvent: null,
        hideOnParentScroll: false,
        items: i
      };
    };
    a._prepareContextMenuHandler = function () {
      var e = this;
      return function (t) {
        if (e._isTableTarget(t.target)) {
          e._targetElement = t.target;
          e._setContextMenuPosition(t);
          e._contextMenu.show();
          t.preventDefault();
        }
      };
    };
    a._setContextMenuPosition = function (e) {
      var t = this._quillContainer.get(0).getBoundingClientRect();
      this._contextMenu.option({
        position: {
          my: "left top",
          at: "left top",
          collision: "fit fit",
          offset: {
            x: e.clientX - t.left,
            y: e.clientY - t.top
          }
        }
      });
    };
    a._isTableTarget = function (e) {
      return !!(0, o.default)(e).closest(".dx-htmleditor-content td, .dx-htmleditor-content th").length;
    };
    a.clean = function () {
      this._detachEvents();
    };
    a.option = function (e, t) {
      if (e !== "tableContextMenu") {
        if (e === "enabled") {
          this.enabled = t;
          if (t) {
            this._enableContextMenu();
          } else {
            this.clean();
          }
        } else if (e === "items") {
          var n;
          if ((n = this._contextMenu) !== null && n !== undefined) {
            n.dispose();
          }
          this._contextMenu = this._createContextMenu(t);
        }
      } else {
        this.handleOptionChangeValue(t);
      }
    };
    a.prepareCleanCallback = function () {
      var e = this;
      return function () {
        e.clean();
      };
    };
    return i;
  }(a.default);
}
var x = y;
exports.default = x;
module.exports = exports.default;
module.exports.default = exports.default;