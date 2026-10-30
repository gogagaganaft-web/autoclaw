exports.default = undefined;
var i = p(require("./68374.js"));
var o = require("./47617.js");
var a = require("./13306.js");
var r = require("./95479.js");
var s = p(require("./20530.js"));
var l = require("./44899.js");
var u = p(require("./71004.js"));
var d = p(require("./11050.js"));
var c = require("./93280.js");
var h = require("./35922.js");
var f = require("./20576.js");
function p(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
var g = d.default.inherit({
  _getDefaultOptions: function () {
    return (0, a.extend)(this.callBase(), {
      keyExpr: "id",
      displayExpr: "text",
      selectedExpr: "selected",
      disabledExpr: "disabled",
      itemsExpr: "items",
      hoverStateEnabled: true,
      parentIdExpr: "parentId",
      expandedExpr: "expanded"
    });
  },
  _defaultOptionsRules: function () {
    return this.callBase().concat([{
      device: function () {
        return s.default.real().deviceType === "desktop" && !s.default.isSimulator();
      },
      options: {
        focusStateEnabled: true
      }
    }]);
  },
  _init: function () {
    this.callBase();
    this._initAccessors();
    this._initDataAdapter();
    this._initDynamicTemplates();
  },
  _initDataSource: function () {
    this.callBase();
    if (this._dataSource) {
      this._dataSource.paginate(false);
    }
  },
  _initDataAdapter: function () {
    var e = this._createDataAdapterAccessors();
    this._dataAdapter = new u.default((0, a.extend)({
      dataAccessors: {
        getters: e.getters,
        setters: e.setters
      },
      items: this.option("items")
    }, this._getDataAdapterOptions()));
  },
  _getDataAdapterOptions: f.noop,
  _getItemExtraPropNames: f.noop,
  _initDynamicTemplates: function () {
    var e = ["text", "html", "items", "icon"].concat(this._getItemExtraPropNames());
    this._templateManager.addDefaultTemplates({
      item: new c.BindableTemplate(this._addContent.bind(this), e, this.option("integrationOptions.watchMethod"), {
        text: this._displayGetter,
        items: this._itemsGetter
      })
    });
  },
  _addContent: function (e, t) {
    e.html(t.html).append(this._getIconContainer(t)).append(this._getTextContainer(t));
  },
  _getIconContainer: function (e) {
    if (e.icon) {
      return (0, l.getImageContainer)(e.icon);
    } else {
      return undefined;
    }
  },
  _getTextContainer: function (e) {
    return (0, i.default)("<span>").text(e.text);
  },
  _initAccessors: function () {
    var e = this;
    (0, r.each)(this._getAccessors(), function (t, n) {
      e._compileAccessor(n);
    });
    this._compileDisplayGetter();
  },
  _getAccessors: function () {
    return ["key", "selected", "items", "disabled", "parentId", "expanded"];
  },
  _getChildNodes: function (e) {
    var t = this;
    var n = [];
    (0, r.each)(e.internalFields.childrenKeys, function (e, i) {
      var o = t._dataAdapter.getNodeByKey(i);
      n.push(o);
    });
    return n;
  },
  _hasChildren: function (e) {
    return e && e.internalFields.childrenKeys.length;
  },
  _compileAccessor: function (e) {
    var t = "_" + e + "Getter";
    var n = "_" + e + "Setter";
    var i = this.option(e + "Expr");
    if (i) {
      if ((0, h.isFunction)(i)) {
        this[n] = function (e, t) {
          e[i()] = t;
        };
        this[t] = function (e) {
          return e[i()];
        };
        return;
      } else {
        this[t] = (0, o.compileGetter)(i);
        this[n] = (0, o.compileSetter)(i);
        return;
      }
    } else {
      this[t] = f.noop;
      this[n] = f.noop;
      return;
    }
  },
  _createDataAdapterAccessors: function () {
    var e = this;
    var t = {
      getters: {},
      setters: {}
    };
    (0, r.each)(this._getAccessors(), function (n, i) {
      var o = "_" + i + "Getter";
      var a = "_" + i + "Setter";
      var r = i === "parentId" ? "parentKey" : i;
      t.getters[r] = e[o];
      t.setters[r] = e[a];
    });
    t.getters.display = this._displayGetter ? this._displayGetter : function (e) {
      return e.text;
    };
    return t;
  },
  _initMarkup: function () {
    this.callBase();
    this._addWidgetClass();
  },
  _addWidgetClass: function () {
    this._focusTarget().addClass(this._widgetClass());
  },
  _widgetClass: f.noop,
  _renderItemFrame: function (e, t) {
    var n = this.callBase.apply(this, arguments);
    n.toggleClass("dx-state-disabled", !!this._disabledGetter(t));
    return n;
  },
  _optionChanged: function (e) {
    switch (e.name) {
      case "displayExpr":
      case "keyExpr":
        this._initAccessors();
        this._initDynamicTemplates();
        this.repaint();
        break;
      case "itemsExpr":
      case "selectedExpr":
      case "disabledExpr":
      case "expandedExpr":
      case "parentIdExpr":
        this._initAccessors();
        this._initDataAdapter();
        this.repaint();
        break;
      case "items":
        this._initDataAdapter();
        this.callBase(e);
        break;
      default:
        this.callBase(e);
    }
  }
});
exports.default = g;
module.exports = exports.default;
module.exports.default = exports.default;