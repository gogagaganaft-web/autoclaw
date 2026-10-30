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
var o = p(require("./68374.js"));
var a = p(require("./9549.js"));
var r = require("./47617.js");
var s = require("./35922.js");
var l = require("./13306.js");
var u = require("./6415.js");
var d = p(require("./55994.js"));
var c = p(require("./30963.js"));
var h = p(require("./2269.js"));
var f = p(require("./72410.js"));
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
function m(e) {
  if (e === undefined) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return e;
}
function _(e, t) {
  return (_ = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (e, t) {
    e.__proto__ = t;
    return e;
  })(e, t);
}
var v = c.default;
if (a.default) {
  var y = {
    ARROW_UP: "upArrow",
    ARROW_DOWN: "downArrow",
    ARROW_LEFT: "leftArrow",
    ARROW_RIGHT: "rightArrow",
    ENTER: "enter",
    ESCAPE: "escape",
    SPACE: "space",
    PAGE_UP: "pageUp",
    PAGE_DOWN: "pageDown",
    END: "end",
    HOME: "home"
  };
  var b = [y.ARROW_LEFT, y.ARROW_RIGHT, y.PAGE_UP, y.PAGE_DOWN, y.END, y.HOME];
  var x = [" ", "\n"];
  a.default.register({
    "formats/mention": f.default
  }, true);
  v = function (e) {
    var t;
    var n;
    n = e;
    (t = v).prototype = Object.create(n.prototype);
    t.prototype.constructor = t;
    _(t, n);
    var i;
    var c;
    var h;
    var p = v.prototype;
    function v(t, n) {
      var i;
      (i = e.call(this, t, n) || this)._mentions = {};
      n.mentions.forEach(function (e) {
        var t = e.marker;
        if (!t) {
          e.marker = t = "@";
        }
        var n = e.template;
        if (n) {
          var o = i.editorInstance._getTemplate(n);
          if (o) {
            f.default.addTemplate({
              marker: t,
              editorKey: i.editorInstance.getMentionKeyInTemplateStorage()
            }, o);
          }
        }
        i._mentions[t] = (0, l.extend)({}, i._getDefaultOptions(), e);
      });
      i._attachKeyboardHandlers();
      i.addCleanCallback(i.clean.bind(m(i)));
      i.quill.on("text-change", i.onTextChange.bind(m(i)));
      return i;
    }
    p._getDefaultOptions = function () {
      var t = e.prototype._getDefaultOptions.call(this);
      return (0, l.extend)(t, {
        itemTemplate: "item",
        valueExpr: "this",
        displayExpr: "this",
        template: null,
        searchExpr: null,
        searchTimeout: 500,
        minSearchLength: 0
      });
    };
    p._attachKeyboardHandlers = function () {
      this.quill.keyboard.addBinding({
        key: y.ARROW_UP
      }, this._moveToItem.bind(this, "prev"));
      this.quill.keyboard.addBinding({
        key: y.ARROW_DOWN
      }, this._moveToItem.bind(this, "next"));
      this.quill.keyboard.addBinding({
        key: [y.ENTER, y.SPACE]
      }, this._selectItemHandler.bind(this));
      var e = this.quill.keyboard.bindings[y.ENTER];
      e.unshift(e.pop());
      this.quill.keyboard.addBinding({
        key: y.ESCAPE
      }, this._escapeKeyHandler.bind(this));
      this.quill.keyboard.addBinding({
        key: [y.ARROW_LEFT, y.ARROW_RIGHT],
        shiftKey: true
      }, this._ignoreKeyHandler.bind(this));
      this.quill.keyboard.addBinding({
        key: b
      }, this._ignoreKeyHandler.bind(this));
    };
    p._moveToItem = function (e) {
      var t = this._list.getDataSource();
      if (this._isMentionActive && !t.isLoading()) {
        var n = e === "next" ? "first" : "last";
        var i = (0, o.default)(this._list.option("focusedElement"))[e]();
        i = i.length ? i : this._activeListItems[n]();
        this._list.option("focusedElement", (0, u.getPublicElement)(i));
        this._list.scrollToItem(i);
      }
      return !this._isMentionActive;
    };
    p._ignoreKeyHandler = function () {
      return !this._isMentionActive;
    };
    p._fitIntoRange = function (e, t, n) {
      if (e > n) {
        return t;
      } else if (e < t) {
        return n;
      } else {
        return e;
      }
    };
    p._selectItemHandler = function () {
      if (this._isMentionActive) {
        if (this._list.option("items").length) {
          this._list.selectItem(this._list.option("focusedElement"));
        } else {
          this._popup.hide();
        }
      }
      return !this._isMentionActive;
    };
    p._escapeKeyHandler = function () {
      if (this._isMentionActive) {
        this._popup.hide();
      }
      return !this._isMentionActive;
    };
    p.renderList = function (t, n) {
      this.compileGetters(this.options);
      e.prototype.renderList.call(this, t, n);
    };
    p.compileGetters = function (e) {
      var t = e.displayExpr;
      var n = e.valueExpr;
      this._valueGetter = (0, r.compileGetter)(t);
      this._idGetter = (0, r.compileGetter)(n);
    };
    p._getListConfig = function (t) {
      var n = this;
      var i = e.prototype._getListConfig.call(this, t);
      return (0, l.extend)(i, {
        itemTemplate: this.options.itemTemplate,
        onContentReady: function () {
          if (n._hasSearch) {
            n._popup.repaint();
            n._focusFirstElement();
            n._hasSearch = false;
          }
        }
      });
    };
    p.insertEmbedContent = function () {
      var e = this._activeMentionConfig.marker.length;
      var t = e + this._searchValue.length;
      var n = this.getPosition();
      var i = this._list.option("selectedItem");
      var o = {
        value: this._valueGetter(i),
        id: this._idGetter(i),
        marker: this._activeMentionConfig.marker,
        keyInTemplateStorage: this.editorInstance.getMentionKeyInTemplateStorage()
      };
      var r = a.default.import("delta");
      var s = Math.max(0, n - e);
      var l = new r().retain(s).delete(t).insert({
        mention: o
      }).insert(" ");
      this.quill.updateContents(l);
      this.quill.setSelection(s + 2);
    };
    p._getLastInsertOperation = function (e) {
      var t = e[e.length - 1];
      if ("insert" in t) {
        return t;
      }
      var n = "delete" in t;
      if (n && e.length >= 2) {
        var i = e[e.length - 2];
        if (n && "insert" in i) {
          return i;
        }
      }
      return null;
    };
    p.onTextChange = function (e, t, n) {
      if (n === "user") {
        var i = e.ops[e.ops.length - 1];
        if (this._isMentionActive && this._isPopupVisible) {
          if (this._processSearchValue(i)) {
            this._filterList(this._searchValue);
          }
        } else {
          var o = e.ops;
          var a = this._getLastInsertOperation(o);
          if (a) {
            this.checkMentionRequest(a, o);
          }
        }
      }
    };
    p._processSearchValue = function (e) {
      if ("insert" in e) {
        this._searchValue += e.insert;
      } else {
        if (!this._searchValue.length || e.delete > 1) {
          this._popup.hide();
          return false;
        }
        this._searchValue = this._searchValue.slice(0, -1);
      }
      return true;
    };
    p.checkMentionRequest = function (e, t) {
      var n = e.insert;
      var i = this.quill.getSelection();
      if (n && (0, s.isString)(n) && i && !this._isMarkerPartOfText(t[0].retain) && (this._activeMentionConfig = this._mentions[n], this._activeMentionConfig)) {
        this._updateList(this._activeMentionConfig);
        var o = i.index && this._getCharByIndex(i.index - 1) === "\n";
        this.savePosition(i.index + o);
        this._popup.option("position", this._popupPosition);
        this._searchValue = "";
        this._popup.show();
      }
    };
    p._isMarkerPartOfText = function (e) {
      return !!e && x.indexOf(this._getCharByIndex(e - 1)) === -1;
    };
    p._getCharByIndex = function (e) {
      return this.quill.getContents(e, 1).ops[0].insert;
    };
    p._updateList = function (e) {
      var t = e.dataSource;
      var n = e.displayExpr;
      var i = e.valueExpr;
      var o = e.itemTemplate;
      var a = e.searchExpr;
      this.compileGetters({
        displayExpr: n,
        valueExpr: i
      });
      this._list.unselectAll();
      this._list.option({
        dataSource: t,
        displayExpr: n,
        itemTemplate: o,
        searchExpr: a
      });
    };
    p._filterList = function (e) {
      var t = this;
      if (this._isMinSearchLengthExceeded(e)) {
        var n = this._activeMentionConfig.searchTimeout;
        if (n) {
          clearTimeout(this._searchTimer);
          this._searchTimer = setTimeout(function () {
            t._search(e);
          }, n);
        } else {
          this._search(e);
        }
      } else {
        this._resetFilter();
      }
    };
    p._isMinSearchLengthExceeded = function (e) {
      return e.length >= this._activeMentionConfig.minSearchLength;
    };
    p._resetFilter = function () {
      clearTimeout(this._searchTimer);
      this._search(null);
    };
    p._search = function (e) {
      this._hasSearch = true;
      this._list.option("searchValue", e);
    };
    p._focusFirstElement = function () {
      if (this._list) {
        var e = this._activeListItems.first();
        this._list.option("focusedElement", (0, u.getPublicElement)(e));
        this._list.scrollToItem(e);
      }
    };
    p._getPopupConfig = function () {
      var t = this;
      return (0, l.extend)(e.prototype._getPopupConfig.call(this), {
        hideOnParentScroll: false,
        onShown: function () {
          t._isMentionActive = true;
          t._hasSearch = false;
          t._focusFirstElement();
        },
        onHidden: function () {
          t._list.unselectAll();
          t._list.option("focusedElement", null);
          t._isMentionActive = false;
          t._search(null);
        },
        focusStateEnabled: false
      });
    };
    p.clean = function () {
      var e = this;
      Object.keys(this._mentions).forEach(function (t) {
        if (e._mentions[t].template) {
          f.default.removeTemplate({
            marker: t,
            editorKey: e.editorInstance.getMentionKeyInTemplateStorage()
          });
        }
      });
    };
    i = v;
    if (c = [{
      key: "_isPopupVisible",
      get: function () {
        var e;
        if ((e = this._popup) === null || e === undefined) {
          return undefined;
        } else {
          return e.option("visible");
        }
      }
    }, {
      key: "_popupPosition",
      get: function () {
        var e = this.getPosition();
        var t = this.quill.getBounds(e ? e - 1 : e);
        var n = t.left;
        var i = t.top;
        var a = t.height;
        var r = (0, o.default)(this.quill.root).offset();
        var s = r.left;
        var l = r.top;
        return {
          of: d.default.Event("positionEvent", {
            pageX: s + n,
            pageY: l + i
          }),
          offset: {
            v: a
          },
          my: "top left",
          at: "top left",
          collision: {
            y: "flip",
            x: "flipfit"
          }
        };
      }
    }, {
      key: "_activeListItems",
      get: function () {
        return this._list.itemElements().filter(`:not(.dx-state-disabled)`);
      }
    }]) {
      g(i.prototype, c);
    }
    if (h) {
      g(i, h);
    }
    Object.defineProperty(i, "prototype", {
      writable: false
    });
    return v;
  }(h.default);
}
var w = v;
exports.default = w;
module.exports = exports.default;
module.exports.default = exports.default;