exports.default = undefined;
var i = require("./58664.js");
var o = S(require("./68374.js"));
var a = S(require("./55994.js"));
var r = S(require("./10291.js"));
var s = S(require("./99393.js"));
var l = require("./35922.js");
var u = S(require("./26974.js"));
var d = require("./58201.js");
var c = require("./95479.js");
var h = require("./13306.js");
var f = require("./89386.js");
var p = require("./47617.js");
var g = require("./29007.js");
var m = S(require("./28109.js"));
var _ = S(require("./14390.js"));
var v = S(require("./21643.js"));
var y = require("./31093.js");
require("./29837.js");
require("./34171.js");
require("./18859.js");
require("./29589.js");
require("./63008.js");
var b = require("./21014.js");
var x = require("./77509.js");
var w = require("./46193.js");
var C = require("./61961.js");
function S(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
function k() {
  return (k = Object.assign ? Object.assign.bind() : function (e) {
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
function D(e) {
  return (D = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function (e) {
    return typeof e;
  } : function (e) {
    if (e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype) {
      return "symbol";
    } else {
      return typeof e;
    }
  })(e);
}
function I(e) {
  return function (e) {
    if (Array.isArray(e)) {
      return T(e);
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
      return T(e, t);
    }
    var n = Object.prototype.toString.call(e).slice(8, -1);
    if (n === "Object" && e.constructor) {
      n = e.constructor.name;
    }
    if (n === "Map" || n === "Set") {
      return Array.from(e);
    }
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) {
      return T(e, t);
    }
  }(e) || function () {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }();
}
function T(e, t) {
  if (t == null || t > e.length) {
    t = e.length;
  }
  for (var n = 0, i = new Array(t); n < t; n++) {
    i[n] = e[n];
  }
  return i;
}
var E = _.default.inherit({
  _getDefaultOptions: function () {
    return (0, h.extend)(this.callBase(), {
      layoutData: {},
      readOnly: false,
      colCount: 1,
      colCountByScreen: undefined,
      labelLocation: "left",
      onFieldDataChanged: null,
      onEditorEnterKey: null,
      customizeItem: null,
      alignItemLabels: true,
      minColWidth: 200,
      showRequiredMark: true,
      screenByWidth: null,
      showOptionalMark: false,
      requiredMark: "*",
      labelMode: "outside",
      optionalMark: m.default.format("dxForm-optionalMark"),
      requiredMessage: m.default.getFormatter("dxForm-requiredMessage")
    });
  },
  _setOptionsByReference: function () {
    this.callBase();
    (0, h.extend)(this._optionsByReference, {
      layoutData: true,
      validationGroup: true
    });
  },
  _init: function () {
    var e = this.option("layoutData");
    this.callBase();
    this._itemWatchers = [];
    this._itemsRunTimeInfo = new r.default();
    this._updateReferencedOptions(e);
    this._initDataAndItems(e);
  },
  _dispose: function () {
    this.callBase();
    this._cleanItemWatchers();
  },
  _initDataAndItems: function (e) {
    this._syncDataWithItems();
    this._updateItems(e);
  },
  _syncDataWithItems: function () {
    var e = this;
    var t = this.option("layoutData");
    var n = this.option("items");
    if ((0, l.isDefined)(n)) {
      n.forEach(function (n) {
        var i;
        if (n.dataField && e._getDataByField(n.dataField) === undefined) {
          if (n.editorOptions) {
            i = n.editorOptions.value;
          }
          if ((0, l.isDefined)(i) || n.dataField in t) {
            e._updateFieldValue(n.dataField, i);
          }
        }
      });
    }
  },
  _getDataByField: function (e) {
    if (e) {
      return this.option("layoutData." + e);
    } else {
      return null;
    }
  },
  _isCheckboxUndefinedStateEnabled: function (e) {
    var t = e.allowIndeterminateState;
    var n = e.editorType;
    var i = e.dataField;
    if (t === true && n === "dxCheckBox") {
      var o = ["layoutData"].concat(I(i.split(".")));
      var a = o.pop();
      var r = this.option(o.join("."));
      return r && a in r;
    }
    return false;
  },
  _updateFieldValue: function (e, t) {
    var n = this.option("layoutData");
    var i = t;
    if (!u.default.isWrapped(n[e]) && (0, l.isDefined)(e)) {
      this.option("layoutData." + e, i);
    } else if (u.default.isWritableWrapped(n[e])) {
      i = (0, l.isFunction)(i) ? i() : i;
      n[e](i);
    }
    this._triggerOnFieldDataChanged({
      dataField: e,
      value: i
    });
  },
  _triggerOnFieldDataChanged: function (e) {
    this._createActionByOption("onFieldDataChanged")(e);
  },
  _updateItems: function (e) {
    var t = this;
    var n = this.option("items");
    var i = (0, l.isDefined)(n);
    var o = t.option("customizeItem");
    var a = i ? n : this._generateItemsByData(e);
    if ((0, l.isDefined)(a)) {
      var r = [];
      (0, c.each)(a, function (e, n) {
        if (t._isAcceptableItem(n)) {
          n = t._processItem(n);
          if (o) {
            o(n);
          }
          if ((0, l.isObject)(n) && u.default.unwrap(n.visible) !== false) {
            r.push(n);
          }
        }
      });
      if (!t._itemWatchers.length || !i) {
        t._updateItemWatchers(a);
      }
      this._setItems(r);
      this._sortItems();
    }
  },
  _cleanItemWatchers: function () {
    this._itemWatchers.forEach(function (e) {
      e();
    });
    this._itemWatchers = [];
  },
  _updateItemWatchers: function (e) {
    var t = this;
    var n = t._getWatch();
    e.forEach(function (e) {
      if ((0, l.isObject)(e) && (0, l.isDefined)(e.visible) && (0, l.isFunction)(n)) {
        t._itemWatchers.push(n(function () {
          return u.default.unwrap(e.visible);
        }, function () {
          t._updateItems(t.option("layoutData"));
          t.repaint();
        }, {
          skipImmediate: true
        }));
      }
    });
  },
  _generateItemsByData: function (e) {
    var t = [];
    if ((0, l.isDefined)(e)) {
      (0, c.each)(e, function (e) {
        t.push({
          dataField: e
        });
      });
    }
    return t;
  },
  _isAcceptableItem: function (e) {
    var t = e.dataField || e;
    var n = this._getDataByField(t);
    return !(0, l.isFunction)(n) || !!u.default.isWrapped(n);
  },
  _processItem: function (e) {
    if (typeof e == "string") {
      e = {
        dataField: e
      };
    }
    if (D(e) === "object" && !e.itemType) {
      e.itemType = y.SIMPLE_ITEM_TYPE;
    }
    if (!(0, l.isDefined)(e.editorType) && (0, l.isDefined)(e.dataField)) {
      var t = this._getDataByField(e.dataField);
      e.editorType = (0, l.isDefined)(t) ? this._getEditorTypeByDataType((0, l.type)(t)) : "dxTextBox";
    }
    var n;
    if (e.editorType === "dxCheckBox") {
      e.allowIndeterminateState = (n = e.allowIndeterminateState) === null || n === undefined || n;
    }
    return e;
  },
  _getEditorTypeByDataType: function (e) {
    switch (e) {
      case "number":
        return "dxNumberBox";
      case "date":
        return "dxDateBox";
      case "boolean":
        return "dxCheckBox";
      default:
        return "dxTextBox";
    }
  },
  _sortItems: function () {
    (0, f.normalizeIndexes)(this._items, "visibleIndex");
    this._sortIndexes();
  },
  _sortIndexes: function () {
    this._items.sort(function (e, t) {
      var n = e.visibleIndex;
      var i = t.visibleIndex;
      if (n > i) {
        return 1;
      } else if (n < i) {
        return -1;
      } else {
        return 0;
      }
    });
  },
  _initMarkup: function () {
    this._itemsRunTimeInfo.clear();
    this.$element().addClass(y.FORM_LAYOUT_MANAGER_CLASS);
    this.callBase();
    this._renderResponsiveBox();
  },
  _renderResponsiveBox: function () {
    var e = [];
    if (this._items && this._items.length) {
      var t = this._getColCount();
      var n = (0, o.default)("<div>").appendTo(this.$element());
      this._prepareItemsWithMerging(t);
      var i = this._generateLayoutItems();
      this._responsiveBox = this._createComponent(n, v.default, this._getResponsiveBoxConfig(i, t, e));
      if (!(0, d.hasWindow)()) {
        this._renderTemplates(e);
      }
    }
  },
  _itemStateChangedHandler: function (e) {
    this._refresh();
  },
  _renderTemplates: function (e) {
    var t = this;
    var n = 0;
    e.forEach(function (e) {
      var t;
      var i = e.item;
      if (i != null && (t = i.label) !== null && t !== undefined && t.template) {
        n++;
      }
    });
    (0, c.each)(e, function (e, i) {
      switch (i.itemType) {
        case "empty":
          (0, w.renderEmptyItem)(i);
          break;
        case "button":
          t._renderButtonItem(i);
          break;
        default:
          t._renderFieldItem(i, n);
      }
    });
  },
  _getResponsiveBoxConfig: function (e, t, n) {
    var i = this;
    var a = i.option("colCountByScreen");
    var r = a && a.xs;
    return {
      onItemStateChanged: this._itemStateChangedHandler.bind(this),
      onLayoutChanged: function () {
        var e = i.option("onLayoutChanged");
        var t = i.isSingleColumnMode();
        if (e) {
          i.$element().toggleClass(y.LAYOUT_MANAGER_ONE_COLUMN, t);
          e(t);
        }
      },
      onContentReady: function (e) {
        if ((0, d.hasWindow)()) {
          i._renderTemplates(n);
        }
        if (i.option("onLayoutChanged")) {
          i.$element().toggleClass(y.LAYOUT_MANAGER_ONE_COLUMN, i.isSingleColumnMode(e.component));
        }
      },
      itemTemplate: function (e, a, r) {
        if (e.location) {
          var s = (0, o.default)(r);
          var u = e.location.row * t;
          var d = i._items[e.location.col + u];
          if (d) {
            var c = [d.cssClass];
            s.toggleClass(y.SINGLE_COLUMN_ITEM_CONTENT, i.isSingleColumnMode(this));
            if (e.location.row === 0) {
              c.push("dx-first-row");
            }
            if (e.location.col === 0) {
              c.push("dx-first-col");
            }
            if (d.itemType === y.SIMPLE_ITEM_TYPE && i.option("isRoot")) {
              s.addClass(y.ROOT_SIMPLE_ITEM_CLASS);
            }
            var h = e.location.col === t - 1 || e.location.col + e.location.colspan === t;
            var f = i._getRowsCount();
            var p = e.location.row === f - 1;
            if (h) {
              c.push("dx-last-col");
            }
            if (p) {
              c.push("dx-last-row");
            }
            if (d.itemType !== "empty") {
              c.push(y.FIELD_ITEM_CLASS);
              c.push(i.option("cssItemClass"));
              if ((0, l.isDefined)(d.col)) {
                c.push("dx-col-" + d.col);
              }
            }
            n.push({
              itemType: d.itemType,
              item: d,
              $parent: s,
              rootElementCssClassList: c
            });
          }
        }
      },
      cols: i._generateRatio(t),
      rows: i._generateRatio(i._getRowsCount(), true),
      dataSource: e,
      screenByWidth: i.option("screenByWidth"),
      singleColumnScreen: !r && "xs"
    };
  },
  _getColCount: function () {
    var e = this.option("colCount");
    var t = this.option("colCountByScreen");
    if (t) {
      var n = this.option("form").getTargetScreenFactor();
      n ||= (0, d.hasWindow)() ? (0, d.getCurrentScreenFactor)(this.option("screenByWidth")) : "lg";
      e = t[n] || e;
    }
    if (e === "auto") {
      if (this._cashedColCount) {
        return this._cashedColCount;
      }
      this._cashedColCount = e = this._getMaxColCount();
    }
    if (e < 1) {
      return 1;
    } else {
      return e;
    }
  },
  _getMaxColCount: function () {
    if (!(0, d.hasWindow)()) {
      return 1;
    }
    var e = this.option("minColWidth");
    var t = (0, i.getWidth)(this.$element());
    var n = this._items.length;
    var o = Math.floor(t / e) || 1;
    if (n < o) {
      return n;
    } else {
      return o;
    }
  },
  isCachedColCountObsolete: function () {
    return this._cashedColCount && this._getMaxColCount() !== this._cashedColCount;
  },
  _prepareItemsWithMerging: function (e) {
    var t;
    var n;
    var i;
    var o;
    var a = this._items.slice(0);
    var r = [];
    for (o = 0; o < a.length; o++) {
      t = a[o];
      r.push(t);
      if (this.option("alignItemLabels") || t.alignItemLabels || t.colSpan) {
        t.col = this._getColByIndex(r.length - 1, e);
      }
      if (t.colSpan > 1 && t.col + t.colSpan <= e) {
        n = [];
        i = 0;
        for (; i < t.colSpan - 1; i++) {
          n.push({
            merged: true
          });
        }
        r = r.concat(n);
      } else {
        delete t.colSpan;
      }
    }
    this._setItems(r);
  },
  _getColByIndex: function (e, t) {
    return e % t;
  },
  _setItems: function (e) {
    this._items = e;
    this._cashedColCount = null;
  },
  _generateLayoutItems: function () {
    var e;
    var t;
    var n = this._items;
    var i = this._getColCount();
    var o = [];
    for (t = 0; t < n.length; t++) {
      if (!(e = n[t]).merged) {
        var a = {
          location: {
            row: parseInt(t / i),
            col: this._getColByIndex(t, i)
          }
        };
        if ((0, l.isDefined)(e.disabled)) {
          a.disabled = e.disabled;
        }
        if ((0, l.isDefined)(e.visible)) {
          a.visible = e.visible;
        }
        if ((0, l.isDefined)(e.colSpan)) {
          a.location.colspan = e.colSpan;
        }
        if ((0, l.isDefined)(e.rowSpan)) {
          a.location.rowspan = e.rowSpan;
        }
        o.push(a);
      }
    }
    return o;
  },
  _renderEmptyItem: function (e) {
    (0, w.renderEmptyItem)({
      $container: e
    });
  },
  _renderButtonItem: function (e) {
    var t = e.item;
    var n = e.$parent;
    var i = e.rootElementCssClassList;
    var o = (0, x.renderButtonItem)({
      item: t,
      $parent: n,
      rootElementCssClassList: i,
      validationGroup: this.option("validationGroup"),
      createComponentCallback: this._createComponent.bind(this)
    });
    var a = o.$rootElement;
    var r = o.buttonInstance;
    this._itemsRunTimeInfo.add({
      item: t,
      widgetInstance: r,
      guid: t.guid,
      $itemContainer: a
    });
  },
  _renderFieldItem: function (e, t) {
    var n;
    var i;
    var o = this;
    var a = e.item;
    var r = e.$parent;
    var s = e.rootElementCssClassList;
    var l = this._getDataByField(a.dataField);
    var u = false;
    if (l === undefined) {
      var d = a.allowIndeterminateState;
      var c = a.editorType;
      var h = a.dataField;
      u = this._isCheckboxUndefinedStateEnabled({
        allowIndeterminateState: d,
        editorType: c,
        dataField: h
      });
    }
    var f = a.dataField || a.name;
    var p = this._getFormOrThis();
    var g = (0, b.renderFieldItem)((0, C.convertToRenderFieldItemOptions)({
      $parent: r,
      rootElementCssClassList: s,
      item: a,
      name: f,
      editorValue: l,
      canAssignUndefinedValueToEditor: u,
      formOrLayoutManager: this._getFormOrThis(),
      createComponentCallback: this._createComponent.bind(this),
      formLabelLocation: this.option("labelLocation"),
      requiredMessageTemplate: this.option("requiredMessage"),
      validationGroup: this.option("validationGroup"),
      editorValidationBoundary: this.option("validationBoundary"),
      editorStylingMode: this.option("form") && this.option("form").option("stylingMode"),
      showColonAfterLabel: this.option("showColonAfterLabel"),
      managerLabelLocation: this.option("labelLocation"),
      template: a.template ? this._getTemplate(a.template) : null,
      labelTemplate: (n = a.label) !== null && n !== undefined && n.template ? this._getTemplate(a.label.template) : null,
      itemId: this.option("form") && this.option("form").getItemID(f),
      managerMarkOptions: this._getMarkOptions(),
      labelMode: this.option("labelMode"),
      onLabelTemplateRendered: function () {
        o._incTemplateRenderedCallCount();
        if (o._shouldAlignLabelsOnTemplateRendered(p, t)) {
          p._alignLabels(o, o.isSingleColumnMode(p));
        }
      }
    }));
    var m = g.$fieldEditorContainer;
    var _ = g.widgetInstance;
    var v = g.$rootElement;
    if ((i = this.option("onFieldItemRendered")) !== null && i !== undefined) {
      i();
    }
    if (_ && a.dataField) {
      this._bindDataField(_, a.dataField, a.editorType, m);
    }
    this._itemsRunTimeInfo.add({
      item: a,
      widgetInstance: _,
      guid: a.guid,
      $itemContainer: v
    });
  },
  _incTemplateRenderedCallCount: function () {
    this._labelTemplateRenderedCallCount = (this._labelTemplateRenderedCallCount ?? 0) + 1;
  },
  _shouldAlignLabelsOnTemplateRendered: function (e, t) {
    return e.option("templatesRenderAsynchronously") && this._labelTemplateRenderedCallCount === t;
  },
  _getMarkOptions: function () {
    return {
      showRequiredMark: this.option("showRequiredMark"),
      requiredMark: this.option("requiredMark"),
      showOptionalMark: this.option("showOptionalMark"),
      optionalMark: this.option("optionalMark")
    };
  },
  _getFormOrThis: function () {
    return this.option("form") || this;
  },
  _bindDataField: function (e, t, n, i) {
    var o = this._getFormOrThis();
    e.on("enterKey", function (e) {
      o._createActionByOption("onEditorEnterKey")((0, h.extend)(e, {
        dataField: t
      }));
    });
    this._createWatcher(e, i, t);
    this.linkEditorToDataField(e, t, n);
  },
  _createWatcher: function (e, t, n) {
    var i = this;
    var o = i._getWatch();
    if ((0, l.isFunction)(o)) {
      var r = o(function () {
        return i._getDataByField(n);
      }, function () {
        var t = i._getDataByField(n);
        if (e.NAME === "dxTagBox") {
          var o = e.option("value");
          if (t !== o && function (e, t) {
            if (!Array.isArray(e) || !Array.isArray(t) || e.length !== t.length) {
              return false;
            }
            for (var n = 0; n < e.length; n++) {
              if (e[n] !== t[n]) {
                return false;
              }
            }
            return true;
          }(t, o)) {
            return;
          }
        }
        e.option("value", t);
      }, {
        deep: true,
        skipImmediate: true
      });
      a.default.on(t, g.removeEvent, r);
    }
  },
  _getWatch: function () {
    if (!(0, l.isDefined)(this._watch)) {
      var e = this.option("form");
      this._watch = e && e.option("integrationOptions.watchMethod");
    }
    return this._watch;
  },
  _createComponent: function (e, t, n) {
    var i = this.option("readOnly");
    var o = Object.hasOwn(n, "readOnly");
    var a = this.callBase(e, t, k({}, n, {
      readOnly: o ? n.readOnly : i
    }));
    var r = false;
    a.on("optionChanged", function (e) {
      if (e.name === "readOnly" && !r) {
        o = true;
      }
    });
    this.on("optionChanged", function (e) {
      if (e.name === "readOnly" && !o) {
        r = true;
        a.option(e.name, e.value);
        r = false;
      }
    });
    return a;
  },
  _generateRatio: function (e, t) {
    var n;
    var i;
    var o = [];
    for (i = 0; i < e; i++) {
      n = {
        ratio: 1
      };
      if (t) {
        n.baseSize = "auto";
      }
      o.push(n);
    }
    return o;
  },
  _getRowsCount: function () {
    return Math.ceil(this._items.length / this._getColCount());
  },
  _updateReferencedOptions: function (e) {
    var t = this;
    var n = this.option("layoutData");
    if ((0, l.isObject)(n)) {
      Object.getOwnPropertyNames(n).forEach(function (e) {
        return delete t._optionsByReference["layoutData." + e];
      });
    }
    if ((0, l.isObject)(e)) {
      Object.getOwnPropertyNames(e).forEach(function (e) {
        return t._optionsByReference["layoutData." + e] = true;
      });
    }
  },
  _resetWidget: function (e) {
    this._disableEditorValueChangedHandler = true;
    e.reset();
    this._disableEditorValueChangedHandler = false;
    e.option("isValid", true);
  },
  _optionChanged: function (e) {
    var t = this;
    if (e.fullName.search("layoutData.") !== 0) {
      switch (e.name) {
        case "showRequiredMark":
        case "showOptionalMark":
        case "requiredMark":
        case "optionalMark":
          this._cashedRequiredConfig = null;
          this._invalidate();
          break;
        case "layoutData":
          this._updateReferencedOptions(e.value);
          if (this.option("items")) {
            if (!(0, l.isEmptyObject)(e.value)) {
              this._itemsRunTimeInfo.each(function (n, i) {
                if ((0, l.isDefined)(i.item)) {
                  var o = i.item.dataField;
                  if (o && (0, l.isDefined)(i.widgetInstance)) {
                    var a = (0, p.compileGetter)(o)(e.value);
                    var r = i.item;
                    var s = r.allowIndeterminateState;
                    var u = r.editorType;
                    if (a !== undefined || t._isCheckboxUndefinedStateEnabled({
                      allowIndeterminateState: s,
                      editorType: u,
                      dataField: o
                    })) {
                      i.widgetInstance.option("value", a);
                    } else {
                      t._resetWidget(i.widgetInstance);
                    }
                  }
                }
              });
            }
          } else {
            this._initDataAndItems(e.value);
            this._invalidate();
          }
          break;
        case "items":
          this._cleanItemWatchers();
          this._initDataAndItems(e.value);
          this._invalidate();
          break;
        case "alignItemLabels":
        case "labelLocation":
        case "labelMode":
        case "requiredMessage":
          this._invalidate();
          break;
        case "customizeItem":
          this._updateItems(this.option("layoutData"));
          this._invalidate();
          break;
        case "colCount":
        case "colCountByScreen":
          this._resetColCount();
          break;
        case "minColWidth":
          if (this.option("colCount") === "auto") {
            this._resetColCount();
          }
          break;
        case "readOnly":
          break;
        case "width":
          this.callBase(e);
          if (this.option("colCount") === "auto") {
            this._resetColCount();
          }
          break;
        case "onFieldDataChanged":
          break;
        default:
          this.callBase(e);
      }
    }
  },
  _resetColCount: function () {
    this._cashedColCount = null;
    this._invalidate();
  },
  linkEditorToDataField: function (e, t) {
    var n = this;
    this.on("optionChanged", function (n) {
      if (n.fullName === `layoutData.${t}`) {
        e._setOptionWithoutOptionChange("value", n.value);
      }
    });
    e.on("valueChanged", function (e) {
      var i = (0, l.isObject)(e.value) || Array.isArray(e.value);
      if (!n._disableEditorValueChangedHandler && (!i || e.value !== e.previousValue)) {
        n._updateFieldValue(t, e.value);
      }
    });
  },
  _dimensionChanged: function () {
    if (this.option("colCount") === "auto" && this.isCachedColCountObsolete()) {
      this._eventsStrategy.fireEvent("autoColCountChanged");
    }
  },
  updateData: function (e, t) {
    var n = this;
    if ((0, l.isObject)(e)) {
      (0, c.each)(e, function (e, t) {
        n._updateFieldValue(e, t);
      });
    } else if (typeof e == "string") {
      n._updateFieldValue(e, t);
    }
  },
  getEditor: function (e) {
    return this._itemsRunTimeInfo.findWidgetInstanceByDataField(e) || this._itemsRunTimeInfo.findWidgetInstanceByName(e);
  },
  isSingleColumnMode: function (e) {
    var t = this._responsiveBox || e;
    if (t) {
      return t.option("currentScreenFactor") === t.option("singleColumnScreen");
    }
  },
  getItemsRunTimeInfo: function () {
    return this._itemsRunTimeInfo;
  }
});
(0, s.default)("dxLayoutManager", E);
var O = E;
exports.default = O;
module.exports = exports.default;
module.exports.default = exports.default;