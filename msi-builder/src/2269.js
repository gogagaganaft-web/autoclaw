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
var a = p(require("./9549.js"));
var r = p(require("./68374.js"));
var s = require("./13306.js");
var l = require("./58201.js");
var u = p(require("./55994.js"));
var d = require("./39611.js");
var c = p(require("./30963.js"));
var h = p(require("./39114.js"));
var f = p(require("./56757.js"));
function p(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
function g(e, t) {
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
function m(e, t) {
  return (m = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (e, t) {
    e.__proto__ = t;
    return e;
  })(e, t);
}
var _ = c.default;
if (a.default) {
  _ = function (e) {
    var t;
    var n;
    n = e;
    (t = _).prototype = Object.create(n.prototype);
    t.prototype.constructor = t;
    m(t, n);
    var i;
    var a;
    var c;
    var p = _.prototype;
    function _(t, n) {
      var i;
      (i = e.call(this, t, n) || this).options = (0, s.extend)({}, i._getDefaultOptions(), n);
      i._popup = i.renderPopup();
      i._popup.$wrapper().addClass("dx-suggestion-list-wrapper");
      i._renderPreventFocusOut();
      return i;
    }
    p._getDefaultOptions = function () {
      return {
        dataSource: null
      };
    };
    p.renderList = function (e, t) {
      var n = (0, r.default)("<div>").addClass("dx-suggestion-list").appendTo(e);
      this._list = this.options.editorInstance._createComponent(n, f.default, t);
    };
    p.renderPopup = function () {
      var e = this.options.editorInstance;
      var t = (0, r.default)("<div>").appendTo(e.$element());
      var n = this._getPopupConfig();
      return e._createComponent(t, h.default, n);
    };
    p._getPopupConfig = function () {
      var e = this;
      return {
        contentTemplate: function (t) {
          var n = e._getListConfig(e.options);
          e.renderList((0, r.default)(t), n);
        },
        deferRendering: false,
        onShown: function () {
          e._list.focus();
        },
        onHidden: function () {
          e._list.unselectAll();
          e._list.option("focusedElement", null);
        },
        showTitle: false,
        width: "auto",
        height: "auto",
        shading: false,
        hideOnParentScroll: true,
        hideOnOutsideClick: true,
        animation: {
          show: {
            type: "fade",
            duration: 0,
            from: 0,
            to: 1
          },
          hide: {
            type: "fade",
            duration: 400,
            from: 1,
            to: 0
          }
        },
        fullScreen: false,
        maxHeight: this.maxHeight
      };
    };
    p._getListConfig = function (e) {
      return {
        dataSource: e.dataSource,
        onSelectionChanged: this.selectionChangedHandler.bind(this),
        selectionMode: "single",
        pageLoadMode: "scrollBottom"
      };
    };
    p.selectionChangedHandler = function (e) {
      if (this._popup.option("visible")) {
        this._popup.hide();
        this.insertEmbedContent(e);
      }
    };
    p._renderPreventFocusOut = function () {
      var e = (0, d.addNamespace)("mousedown", "dxHtmlEditorPopupModule");
      u.default.on(this._popup.$wrapper(), e, function (e) {
        e.preventDefault();
      });
    };
    p.insertEmbedContent = function (e) {};
    p.showPopup = function () {
      if (this._popup) {
        this._popup.show();
      }
    };
    p.savePosition = function (e) {
      this.caretPosition = e;
    };
    p.getPosition = function () {
      return this.caretPosition;
    };
    i = _;
    if (a = [{
      key: "maxHeight",
      get: function () {
        var e = (0, l.getWindow)();
        var t = e && (0, o.getHeight)(e) || 0;
        return Math.max(100, t * 0.5);
      }
    }]) {
      g(i.prototype, a);
    }
    if (c) {
      g(i, c);
    }
    Object.defineProperty(i, "prototype", {
      writable: false
    });
    return _;
  }(c.default);
}
var v = _;
exports.default = v;
module.exports = exports.default;
module.exports.default = exports.default;