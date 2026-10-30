Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.editorFactoryModule = exports.EditorFactory = undefined;
var i = _(require("./49387.js"));
var o = _(require("./73349.js"));
var a = _(require("./68374.js"));
var r = _(require("./47810.js"));
var s = require("./13306.js");
var l = require("./37518.js");
var u = require("./58664.js");
var d = require("./95429.js");
var c = _(require("./55994.js"));
var h = _(require("./93786.js"));
var f = require("./39611.js");
var p = _(require("./15653.js"));
var g = _(require("./15943.js"));
var m = _(require("./60082.js"));
function _(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
function v(e, t) {
  return (v = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (e, t) {
    e.__proto__ = t;
    return e;
  })(e, t);
}
var y = (0, f.addNamespace)([h.default.down, "focusin", d.name].join(" "), "dxDataGridEditorFactory");
var b = function (e) {
  var t;
  var n;
  function d() {
    return e.apply(this, arguments) || this;
  }
  n = e;
  (t = d).prototype = Object.create(n.prototype);
  t.prototype.constructor = t;
  v(t, n);
  var h = d.prototype;
  h._getFocusedElement = function (e) {
    var t = this.option("focusedRowEnabled") ? "tr[tabindex]:focus" : "tr[tabindex]:not(.dx-data-row):focus";
    var n = `td[tabindex]:focus, ${t}, input:focus, textarea:focus, .dx-lookup-field:focus, .dx-checkbox:focus, .dx-switch:focus, .dx-dropdownbutton .dx-buttongroup:focus, .dx-adaptive-item-text:focus`;
    var i = e.find(n);
    return this.elementIsInsideGrid(i) && i;
  };
  h._getFocusCellSelector = function () {
    return ".dx-row > td";
  };
  h._updateFocusCore = function () {
    var e = this.component && this.component.$element();
    if (e) {
      var t = this._getFocusedElement(e);
      if (t && t.length) {
        var n;
        if (!t.hasClass("dx-cell-focus-disabled") && !t.hasClass("dx-row")) {
          var i = t.closest(`${this._getFocusCellSelector()}, .dx-cell-focus-disabled`);
          if (i.get(0) !== t.get(0)) {
            n = this._needHideBorder(i);
            t = i;
          }
        }
        if (t.length && !t.hasClass("dx-cell-focus-disabled")) {
          this.focus(t, n);
          return;
        }
      }
    }
    this.loseFocus();
  };
  h._needHideBorder = function (e) {
    return e.hasClass("dx-editor-inline-block");
  };
  h._updateFocus = function (e) {
    var t = this;
    var n = e && e.event && (0, a.default)(e.event.target).hasClass(t.addWidgetPrefix("focus-overlay"));
    t._isFocusOverlay = t._isFocusOverlay || n;
    clearTimeout(t._updateFocusTimeoutID);
    t._updateFocusTimeoutID = setTimeout(function () {
      delete t._updateFocusTimeoutID;
      if (!t._isFocusOverlay) {
        t._updateFocusCore();
      }
      t._isFocusOverlay = false;
    });
  };
  h._updateFocusOverlaySize = function (e, t) {
    e.hide();
    var n = i.default.calculate(e, (0, s.extend)({
      collision: "fit"
    }, t));
    if (n.h.oversize > 0) {
      (0, u.setOuterWidth)(e, (0, u.getOuterWidth)(e) - n.h.oversize);
    }
    if (n.v.oversize > 0) {
      (0, u.setOuterHeight)(e, (0, u.getOuterHeight)(e) - n.v.oversize);
    }
    e.show();
  };
  h.callbackNames = function () {
    return ["focused"];
  };
  h.focus = function (e, t) {
    var n = this;
    if (e === undefined) {
      return n._$focusedElement;
    }
    if (e) {
      if (!e.is(n._$focusedElement)) {
        if (n._$focusedElement) {
          n._$focusedElement.removeClass("dx-focused");
        }
      }
      n._$focusedElement = e;
      clearTimeout(n._focusTimeoutID);
      n._focusTimeoutID = setTimeout(function () {
        delete n._focusTimeoutID;
        n.renderFocusOverlay(e, t);
        e.addClass("dx-focused");
        n.focused.fire(e);
      });
    }
  };
  h.refocus = function () {
    var e = this.focus();
    this.focus(e);
  };
  h.renderFocusOverlay = function (e, t) {
    if (m.default.isElementInCurrentGrid(this, e)) {
      this._$focusOverlay ||= (0, a.default)("<div>").addClass(this.addWidgetPrefix("focus-overlay"));
      if (t) {
        this._$focusOverlay.addClass("dx-hidden");
      } else if (e.length) {
        var n = r.default.mozilla ? "right bottom" : "left top";
        var o = e.closest(`.${this.addWidgetPrefix("content")}`);
        var s = (0, l.getBoundingRect)(e.get(0));
        this._$focusOverlay.removeClass("dx-hidden").appendTo(o);
        (0, u.setOuterHeight)(this._$focusOverlay, s.bottom - s.top + 1);
        (0, u.setOuterWidth)(this._$focusOverlay, s.right - s.left + 1);
        var d = {
          precise: true,
          my: n,
          at: n,
          of: e,
          boundary: o.length && o
        };
        this._updateFocusOverlaySize(this._$focusOverlay, d);
        i.default.setup(this._$focusOverlay, d);
        this._$focusOverlay.css("visibility", "visible");
      }
    }
  };
  h.resize = function () {
    var e = this._$focusedElement;
    if (e) {
      this.focus(e);
    }
  };
  h.loseFocus = function () {
    if (this._$focusedElement) {
      this._$focusedElement.removeClass("dx-focused");
    }
    this._$focusedElement = null;
    if (this._$focusOverlay) {
      this._$focusOverlay.addClass("dx-hidden");
    }
  };
  h.init = function () {
    this.createAction("onEditorPreparing", {
      excludeValidators: ["disabled", "readOnly"],
      category: "rendering"
    });
    this.createAction("onEditorPrepared", {
      excludeValidators: ["disabled", "readOnly"],
      category: "rendering"
    });
    this._updateFocusHandler = this._updateFocusHandler || this.createAction(this._updateFocus.bind(this));
    this._subscribedContainerRoot = this._getContainerRoot();
    c.default.on(this._subscribedContainerRoot, y, this._updateFocusHandler);
    this._attachContainerEventHandlers();
  };
  h._getContainerRoot = function () {
    var e;
    var t = (e = this.component) === null || e === undefined ? undefined : e.$element();
    var n = o.default.getRootNode(t == null ? undefined : t.get(0));
    if (n.nodeType !== Node.DOCUMENT_FRAGMENT_NODE || n.host) {
      return n;
    } else {
      return o.default.getDocument();
    }
  };
  h._attachContainerEventHandlers = function () {
    var e = this;
    var t = e.component && e.component.$element();
    if (t) {
      c.default.on(t, (0, f.addNamespace)("keydown", "dxDataGridEditorFactory"), function (t) {
        if ((0, f.normalizeKeyName)(t) === "tab") {
          e._updateFocusHandler(t);
        }
      });
    }
  };
  h.dispose = function () {
    clearTimeout(this._focusTimeoutID);
    clearTimeout(this._updateFocusTimeoutID);
    c.default.off(this._subscribedContainerRoot, y, this._updateFocusHandler);
  };
  return d;
}(g.default.ViewController.inherit(p.default));
exports.EditorFactory = b;
var x = {
  defaultOptions: function () {
    return {};
  },
  controllers: {
    editorFactory: b
  }
};
exports.editorFactoryModule = x;