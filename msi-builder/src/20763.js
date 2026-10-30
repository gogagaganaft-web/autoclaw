exports.default = undefined;
var i = A(require("./68374.js"));
var o = A(require("./55994.js"));
var a = A(require("./99393.js"));
var r = A(require("./73176.js"));
var s = require("./20576.js");
var l = A(require("./80209.js"));
var u = require("./35922.js");
var d = require("./95479.js");
var c = require("./13306.js");
var h = require("./80506.js");
var f = require("./6415.js");
var p = A(require("./28109.js"));
var g = A(require("./14390.js"));
var m = A(require("./96452.js"));
var _ = require("./58201.js");
var v = A(require("./90964.js"));
var y = A(require("./10291.js"));
var b = A(require("./21807.js"));
var x = A(require("./41183.js"));
var w = require("./62754.js");
var C = require("./75811.js");
var S = A(require("./83702.js"));
var k = A(require("./91784.js"));
require("./85532.js");
var D = require("./35459.js");
var I = require("./61961.js");
var T = require("./11042.js");
require("./97289.js");
require("./4401.js");
var E = require("./31093.js");
var O = require("./10329.js");
function A(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
function P(e) {
  return function (e) {
    if (Array.isArray(e)) {
      return M(e);
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
      return M(e, t);
    }
    var n = Object.prototype.toString.call(e).slice(8, -1);
    if (n === "Object" && e.constructor) {
      n = e.constructor.name;
    }
    if (n === "Map" || n === "Set") {
      return Array.from(e);
    }
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) {
      return M(e, t);
    }
  }(e) || function () {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }();
}
function M(e, t) {
  if (t == null || t > e.length) {
    t = e.length;
  }
  for (var n = 0, i = new Array(t); n < t; n++) {
    i[n] = e[n];
  }
  return i;
}
function R() {
  return (R = Object.assign ? Object.assign.bind() : function (e) {
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
var B = ["items", "isRequired", "validationRules", "visible"];
var L = g.default.inherit({
  _init: function () {
    this.callBase();
    this._cachedColCountOptions = [];
    this._itemsRunTimeInfo = new y.default();
    this._groupsColCount = [];
    this._attachSyncSubscriptions();
  },
  _getDefaultOptions: function () {
    return (0, c.extend)(this.callBase(), {
      formID: "dx-" + new r.default(),
      formData: {},
      colCount: 1,
      screenByWidth: _.defaultScreenFactorFunc,
      colCountByScreen: undefined,
      labelLocation: "left",
      readOnly: false,
      onFieldDataChanged: null,
      customizeItem: null,
      onEditorEnterKey: null,
      minColWidth: 200,
      alignItemLabels: true,
      alignItemLabelsInAllGroups: true,
      alignRootItemLabels: true,
      showColonAfterLabel: true,
      showRequiredMark: true,
      showOptionalMark: false,
      requiredMark: "*",
      optionalMark: p.default.format("dxForm-optionalMark"),
      requiredMessage: p.default.getFormatter("dxForm-requiredMessage"),
      showValidationSummary: false,
      items: undefined,
      scrollingEnabled: false,
      validationGroup: undefined,
      stylingMode: (0, l.default)().editorStylingMode,
      labelMode: "outside"
    });
  },
  _defaultOptionsRules: function () {
    return this.callBase().concat([{
      device: function () {
        return (0, C.isMaterial)();
      },
      options: {
        showColonAfterLabel: false,
        labelLocation: "top"
      }
    }]);
  },
  _setOptionsByReference: function () {
    this.callBase();
    (0, c.extend)(this._optionsByReference, {
      formData: true,
      validationGroup: true
    });
  },
  _getGroupColCount: function (e) {
    return parseInt(e.attr(E.GROUP_COL_COUNT_ATTR));
  },
  _applyLabelsWidthByCol: function (e, t, n = {}, i) {
    var o = n.inOneColumn ? E.FIELD_ITEM_CLASS : E.FORM_FIELD_ITEM_COL_CLASS + t;
    var a = n.excludeTabbed ? `:not(.${E.FIELD_ITEM_TAB_CLASS})` : "";
    (0, T.setLabelWidthByMaxLabelWidth)(e, `.${o}${a}`, i);
  },
  _applyLabelsWidth: function (e, t, n, i, o) {
    i = n ? 1 : i || this._getGroupColCount(e);
    var a;
    var r = {
      excludeTabbed: t,
      inOneColumn: n
    };
    for (a = 0; a < i; a++) {
      this._applyLabelsWidthByCol(e, a, r, o);
    }
  },
  _getGroupElementsInColumn: function (e, t, n) {
    var i = (0, u.isDefined)(n) ? "." + E.GROUP_COL_COUNT_CLASS + n : "";
    var o = "." + E.FORM_FIELD_ITEM_COL_CLASS + t + " > ." + E.FIELD_ITEM_CONTENT_CLASS + " > ." + E.FORM_GROUP_CLASS + i;
    return e.find(o);
  },
  _applyLabelsWidthWithGroups: function (e, t, n, i) {
    if (this.option("alignRootItemLabels") === true) {
      var o = e.find(`.${E.ROOT_SIMPLE_ITEM_CLASS}`);
      for (var a = 0; a < t; a++) {
        this._applyLabelsWidthByCol(o, a, n, i);
      }
    }
    if (this.option("alignItemLabelsInAllGroups")) {
      this._applyLabelsWidthWithNestedGroups(e, t, n, i);
    } else {
      var r;
      var s = this.$element().find("." + E.FORM_GROUP_CLASS);
      for (r = 0; r < s.length; r++) {
        this._applyLabelsWidth(s.eq(r), n, undefined, undefined, i);
      }
    }
  },
  _applyLabelsWidthWithNestedGroups: function (e, t, n, i) {
    var o;
    var a;
    var r;
    var s;
    var l = {
      excludeTabbed: n
    };
    for (o = 0; o < t; o++) {
      s = this._getGroupElementsInColumn(e, o);
      this._applyLabelsWidthByCol(s, 0, l, i);
      a = 0;
      for (; a < this._groupsColCount.length; a++) {
        s = this._getGroupElementsInColumn(e, o, this._groupsColCount[a]);
        var u = this._getGroupColCount(s);
        for (r = 1; r < u; r++) {
          this._applyLabelsWidthByCol(s, r, l, i);
        }
      }
    }
  },
  _labelLocation: function () {
    return this.option("labelLocation");
  },
  _alignLabelsInColumn: function (e) {
    var t = e.layoutManager;
    var n = e.inOneColumn;
    var i = e.$container;
    var o = e.excludeTabbed;
    var a = e.items;
    if ((0, _.hasWindow)() && this._labelLocation() !== "top") {
      var r = (0, I.convertToLabelMarkOptions)(t._getMarkOptions());
      if (n) {
        this._applyLabelsWidth(i, o, true, undefined, r);
      } else if (this._checkGrouping(a)) {
        this._applyLabelsWidthWithGroups(i, t._getColCount(), o, r);
      } else {
        this._applyLabelsWidth(i, o, false, t._getColCount(), r);
      }
    }
  },
  _prepareFormData: function () {
    if (!(0, u.isDefined)(this.option("formData"))) {
      this.option("formData", {});
    }
  },
  _setStylingModeClass: function () {
    if (this.option("stylingMode") === "underlined") {
      this.$element().addClass(E.FORM_UNDERLINED_CLASS);
    }
  },
  _initMarkup: function () {
    v.default.addGroup(this._getValidationGroup());
    this._clearCachedInstances();
    this._prepareFormData();
    this.$element().addClass(E.FORM_CLASS);
    this._setStylingModeClass();
    this.callBase();
    this.setAria("role", "form", this.$element());
    if (this.option("scrollingEnabled")) {
      this._renderScrollable();
    }
    this._renderLayout();
    this._renderValidationSummary();
    this._lastMarkupScreenFactor = this._targetScreenFactor || this._getCurrentScreenFactor();
    this._attachResizeObserverSubscription();
  },
  _attachResizeObserverSubscription: function () {
    var e = this;
    if ((0, _.hasWindow)()) {
      var t = this.$element().get(0);
      k.default.unobserve(t);
      k.default.observe(t, function () {
        e._resizeHandler();
      });
    }
  },
  _resizeHandler: function () {
    if (this._cachedLayoutManagers.length) {
      (0, d.each)(this._cachedLayoutManagers, function (e, t) {
        var n;
        if ((n = t.option("onLayoutChanged")) !== null && n !== undefined) {
          n(t.isSingleColumnMode());
        }
      });
    }
  },
  _getCurrentScreenFactor: function () {
    if ((0, _.hasWindow)()) {
      return (0, _.getCurrentScreenFactor)(this.option("screenByWidth"));
    } else {
      return "lg";
    }
  },
  _clearCachedInstances: function () {
    this._itemsRunTimeInfo.clear();
    this._cachedLayoutManagers = [];
  },
  _alignLabels: function (e, t) {
    this._alignLabelsInColumn({
      $container: this.$element(),
      layoutManager: e,
      excludeTabbed: true,
      items: this.option("items"),
      inOneColumn: t
    });
    (0, h.triggerResizeEvent)(this.$element().find(`.${O.TOOLBAR_CLASS}`));
  },
  _clean: function () {
    this._clearValidationSummary();
    this.callBase();
    this._groupsColCount = [];
    this._cachedColCountOptions = [];
    this._lastMarkupScreenFactor = undefined;
    k.default.unobserve(this.$element().get(0));
  },
  _renderScrollable: function () {
    var e = this.option("useNativeScrolling");
    this._scrollable = new x.default(this.$element(), {
      useNative: !!e,
      useSimulatedScrollbar: !e,
      useKeyboard: false,
      direction: "both",
      bounceEnabled: false
    });
  },
  _getContent: function () {
    if (this.option("scrollingEnabled")) {
      return (0, i.default)(this._scrollable.content());
    } else {
      return this.$element();
    }
  },
  _clearValidationSummary: function () {
    var e;
    if ((e = this._$validationSummary) !== null && e !== undefined) {
      e.remove();
    }
    this._$validationSummary = undefined;
    this._validationSummary = undefined;
  },
  _renderValidationSummary: function () {
    this._clearValidationSummary();
    if (this.option("showValidationSummary")) {
      this._$validationSummary = (0, i.default)("<div>").addClass(E.FORM_VALIDATION_SUMMARY).appendTo(this._getContent());
      this._validationSummary = this._$validationSummary.dxValidationSummary({
        validationGroup: this._getValidationGroup()
      }).dxValidationSummary("instance");
    }
  },
  _prepareItems: function (e, t, n, i) {
    if (e) {
      var o = [];
      for (var a = 0; a < e.length; a++) {
        var r = e[a];
        var s = (0, D.concatPaths)(n, (0, D.createItemPathByIndex)(a, i));
        var l = {
          item: r,
          itemIndex: a,
          path: s
        };
        var d = this._itemsRunTimeInfo.add(l);
        if ((0, u.isString)(r)) {
          r = {
            dataField: r
          };
        }
        if ((0, u.isObject)(r)) {
          var c = R({}, r);
          l.preparedItem = c;
          c.guid = d;
          this._tryPrepareGroupItem(c);
          this._tryPrepareTabbedItem(c, s);
          this._tryPrepareItemTemplate(c);
          if (t) {
            c.cssItemClass = E.FIELD_ITEM_TAB_CLASS;
          }
          c.items &&= this._prepareItems(c.items, t, s);
          o.push(c);
        } else {
          o.push(r);
        }
      }
      return o;
    }
  },
  _tryPrepareGroupItem: function (e) {
    var t = this;
    if (e.itemType === "group") {
      e.alignItemLabels = (0, s.ensureDefined)(e.alignItemLabels, true);
      e._prepareGroupItemTemplate = function (n) {
        if (e.template) {
          e.groupContentTemplate = t._getTemplate(n);
        }
        e.template = t._itemGroupTemplate.bind(t, e);
      };
      e._prepareGroupItemTemplate(e.template);
    }
  },
  _tryPrepareTabbedItem: function (e, t) {
    if (e.itemType === "tabbed") {
      e.template = this._itemTabbedTemplate.bind(this, e);
      e.tabs = this._prepareItems(e.tabs, true, t, true);
    }
  },
  _tryPrepareItemTemplate: function (e) {
    e.template &&= this._getTemplate(e.template);
  },
  _checkGrouping: function (e) {
    if (e) {
      for (var t = 0; t < e.length; t++) {
        if (e[t].itemType === "group") {
          return true;
        }
      }
    }
  },
  _renderLayout: function () {
    var e = this;
    var t = e.option("items");
    var n = e._getContent();
    t = e._prepareItems(t);
    e._rootLayoutManager = e._renderLayoutManager(n, this._createLayoutManagerOptions(t, {
      isRoot: true,
      colCount: e.option("colCount"),
      alignItemLabels: e.option("alignItemLabels"),
      screenByWidth: this.option("screenByWidth"),
      colCountByScreen: this.option("colCountByScreen"),
      onLayoutChanged: function (t) {
        e._alignLabels.bind(e)(e._rootLayoutManager, t);
      },
      onContentReady: function (t) {
        e._alignLabels(t.component, t.component.isSingleColumnMode());
      }
    }));
  },
  _tryGetItemsForTemplate: function (e) {
    return e.items || [];
  },
  _itemTabbedTemplate: function (e, t, n) {
    var a = this;
    var r = (0, i.default)("<div>").appendTo(n);
    var l = (0, c.extend)({}, e.tabPanelOptions, {
      dataSource: e.tabs,
      onItemRendered: function (t) {
        var n;
        var i;
        if ((n = e.tabPanelOptions) !== null && n !== undefined && (i = n.onItemRendered) !== null && i !== undefined) {
          i.call(n, t);
        }
        (0, h.triggerShownEvent)(t.itemElement);
      },
      itemTemplate: function (e, t, n) {
        var o = (0, i.default)(n);
        var r = (0, s.ensureDefined)(e.alignItemLabels, true);
        var l = a._renderLayoutManager(o, a._createLayoutManagerOptions(a._tryGetItemsForTemplate(e), {
          colCount: e.colCount,
          alignItemLabels: r,
          screenByWidth: a.option("screenByWidth"),
          colCountByScreen: e.colCountByScreen,
          cssItemClass: e.cssItemClass,
          onLayoutChanged: function (t) {
            a._alignLabelsInColumn({
              $container: o,
              layoutManager: l,
              items: e.items,
              inOneColumn: t
            });
          }
        }));
        if (a._itemsRunTimeInfo) {
          a._itemsRunTimeInfo.extendRunTimeItemInfoByKey(e.guid, {
            layoutManager: l
          });
        }
        if (r) {
          a._alignLabelsInColumn({
            $container: o,
            layoutManager: l,
            items: e.items,
            inOneColumn: l.isSingleColumnMode()
          });
        }
      }
    });
    function u(e, t) {
      if (Array.isArray(e)) {
        e.forEach(function (e) {
          return a._itemsRunTimeInfo.extendRunTimeItemInfoByKey(e.guid, {
            widgetInstance: t
          });
        });
      }
    }
    var d = this._createComponent(r, b.default, l);
    (0, i.default)(n).parent().addClass(E.FIELD_ITEM_CONTENT_HAS_TABS_CLASS);
    d.on("optionChanged", function (e) {
      if (e.fullName === "dataSource") {
        u(e.value, e.component);
      }
    });
    u([{
      guid: e.guid
    }].concat(P(e.tabs ?? [])), d);
  },
  _itemGroupTemplate: function (e, t, n) {
    var o = this;
    var a = t.editorOptions.inputAttr.id;
    var r = (0, i.default)("<div>").toggleClass(E.FORM_GROUP_WITH_CAPTION_CLASS, (0, u.isDefined)(e.caption) && e.caption.length).addClass(E.FORM_GROUP_CLASS).appendTo(n);
    var s = {
      role: "group",
      labelledby: a
    };
    this.setAria(s, r);
    (0, i.default)(n).parent().addClass(E.FIELD_ITEM_CONTENT_HAS_GROUP_CLASS);
    if (e.caption) {
      (0, i.default)("<span>").addClass(E.FORM_GROUP_CAPTION_CLASS).text(e.caption).attr("id", a).appendTo(r);
    }
    var l = (0, i.default)("<div>").addClass(E.FORM_GROUP_CONTENT_CLASS).appendTo(r);
    if (e.groupContentTemplate) {
      e._renderGroupContentTemplate = function () {
        l.empty();
        var t = {
          formData: o.option("formData"),
          component: o
        };
        e.groupContentTemplate.render({
          model: t,
          container: (0, f.getPublicElement)(l)
        });
      };
      e._renderGroupContentTemplate();
    } else {
      var d = this._renderLayoutManager(l, this._createLayoutManagerOptions(this._tryGetItemsForTemplate(e), {
        colCount: e.colCount,
        colCountByScreen: e.colCountByScreen,
        alignItemLabels: e.alignItemLabels,
        cssItemClass: e.cssItemClass
      }));
      if (this._itemsRunTimeInfo) {
        this._itemsRunTimeInfo.extendRunTimeItemInfoByKey(e.guid, {
          layoutManager: d
        });
      }
      var c = d._getColCount();
      if (!this._groupsColCount.includes(c)) {
        this._groupsColCount.push(c);
      }
      r.addClass(E.GROUP_COL_COUNT_CLASS + c);
      r.attr(E.GROUP_COL_COUNT_ATTR, c);
    }
  },
  _createLayoutManagerOptions: function (e, t) {
    var n = this;
    return (0, D.convertToLayoutManagerOptions)({
      form: this,
      formOptions: this.option(),
      $formElement: this.$element(),
      items: e,
      validationGroup: this._getValidationGroup(),
      extendedLayoutManagerOptions: t,
      onFieldDataChanged: function (e) {
        if (!n._isDataUpdating) {
          n._triggerOnFieldDataChanged(e);
        }
      },
      onContentReady: function (e) {
        n._itemsRunTimeInfo.addItemsOrExtendFrom(e.component._itemsRunTimeInfo);
        if (t.onContentReady) {
          t.onContentReady(e);
        }
      },
      onDisposing: function (e) {
        var t = e.component.getItemsRunTimeInfo();
        n._itemsRunTimeInfo.removeItemsByItems(t);
      },
      onFieldItemRendered: function () {
        var e;
        if ((e = n._validationSummary) !== null && e !== undefined) {
          e.refreshValidationGroup();
        }
      }
    });
  },
  _renderLayoutManager: function (e, t) {
    var n = this;
    var o = {
      lg: t.colCount,
      md: t.colCount,
      sm: t.colCount,
      xs: 1
    };
    this._cachedColCountOptions.push({
      colCountByScreen: (0, c.extend)(o, t.colCountByScreen)
    });
    var a = (0, i.default)("<div>");
    a.appendTo(e);
    var r = this._createComponent(a, "dxLayoutManager", t);
    r.on("autoColCountChanged", function () {
      n._clearAutoColCountChangedTimeout();
      n.autoColCountChangedTimeoutId = setTimeout(function () {
        return !n._disposed && n._refresh();
      }, 0);
    });
    this._cachedLayoutManagers.push(r);
    return r;
  },
  _getValidationGroup: function () {
    return this.option("validationGroup") || this;
  },
  _createComponent: function (e, t, n) {
    n = n || {};
    this._extendConfig(n, {
      readOnly: this.option("readOnly")
    });
    return this.callBase(e, t, n);
  },
  _attachSyncSubscriptions: function () {
    var e = this;
    e.on("optionChanged", function (t) {
      var n = t.fullName;
      if (n === "formData") {
        if (!(0, u.isDefined)(t.value)) {
          e._options.silent("formData", t.value = {});
        }
        e._triggerOnFieldDataChangedByDataSet(t.value);
      }
      if (e._cachedLayoutManagers.length) {
        (0, d.each)(e._cachedLayoutManagers, function (i, o) {
          if (n === "formData") {
            e._isDataUpdating = true;
            o.option("layoutData", t.value);
            e._isDataUpdating = false;
          }
          if (t.name === "readOnly" || t.name === "disabled") {
            o.option(n, t.value);
          }
        });
      }
    });
  },
  _optionChanged: function (e) {
    var t = e.fullName.split(".");
    if ((!(t.length > 1) || t[0].search("items") === -1 || !this._itemsOptionChangedHandler(e)) && (!(t.length > 1) || t[0].search("formData") === -1 || !this._formDataOptionChangedHandler(e))) {
      this._defaultOptionChangedHandler(e);
    }
  },
  _defaultOptionChangedHandler: function (e) {
    switch (e.name) {
      case "formData":
        if (this.option("items")) {
          if ((0, u.isEmptyObject)(e.value)) {
            this._resetValues();
          }
        } else {
          this._invalidate();
        }
        break;
      case "onFieldDataChanged":
        break;
      case "items":
      case "colCount":
      case "onEditorEnterKey":
      case "labelLocation":
      case "labelMode":
      case "alignItemLabels":
      case "showColonAfterLabel":
      case "customizeItem":
      case "alignItemLabelsInAllGroups":
      case "showRequiredMark":
      case "showOptionalMark":
      case "requiredMark":
      case "optionalMark":
      case "requiredMessage":
      case "scrollingEnabled":
      case "formID":
      case "colCountByScreen":
      case "screenByWidth":
      case "stylingMode":
        this._invalidate();
        break;
      case "showValidationSummary":
        this._renderValidationSummary();
        break;
      case "minColWidth":
        if (this.option("colCount") === "auto") {
          this._invalidate();
        }
        break;
      case "alignRootItemLabels":
      case "readOnly":
        break;
      case "width":
        this.callBase(e);
        this._rootLayoutManager.option(e.name, e.value);
        this._alignLabels(this._rootLayoutManager, this._rootLayoutManager.isSingleColumnMode());
        break;
      case "validationGroup":
        v.default.removeGroup(e.previousValue || this);
        this._invalidate();
        break;
      default:
        this.callBase(e);
    }
  },
  _itemsOptionChangedHandler: function (e) {
    var t = e.fullName.split(".");
    var n = e.value;
    var i = this._getItemPath(t);
    var o = this.option(i);
    var a = e.fullName.replace(i + ".", "");
    var r = a.split(".")[0].replace(/\[\d+]/, "");
    var s = this._tryCreateItemOptionAction(r, o, o[r], e.previousValue, i);
    var l = this._tryExecuteItemOptionAction(s) || this._tryChangeLayoutManagerItemOption(e.fullName, n);
    if (!l && o) {
      this._changeItemOption(o, a, n);
      var u = this._generateItemsFromData(this.option("items"));
      this.option("items", u);
      l = true;
    }
    return l;
  },
  _formDataOptionChangedHandler: function (e) {
    var t = e.fullName.split(".");
    var n = e.value;
    var i = t.slice(1).join(".");
    var o = this.getEditor(i);
    if (o) {
      o.option("value", n);
    } else {
      this._triggerOnFieldDataChanged({
        dataField: i,
        value: n
      });
    }
    return true;
  },
  _tryCreateItemOptionAction: function (e, t, n, i, o) {
    if (e === "tabs") {
      this._itemsRunTimeInfo.removeItemsByPathStartWith(`${o}.tabs`);
      n = this._prepareItems(n, true, o, true);
    }
    return (0, S.default)(e, {
      item: t,
      value: n,
      previousValue: i,
      itemsRunTimeInfo: this._itemsRunTimeInfo
    });
  },
  _tryExecuteItemOptionAction: function (e) {
    return e && e.tryExecute();
  },
  _updateValidationGroupAndSummaryIfNeeded: function (e) {
    var t;
    var n = (0, D.getOptionNameFromFullName)(e);
    if (B.indexOf(n) > -1) {
      v.default.addGroup(this._getValidationGroup());
      if (this.option("showValidationSummary")) {
        if ((t = this._validationSummary) !== null && t !== undefined) {
          t.refreshValidationGroup();
        }
      }
    }
  },
  _setLayoutManagerItemOption: function (e, t, n, i) {
    var o = this;
    if (this._updateLockCount > 0) {
      if (!e._updateLockCount) {
        e.beginUpdate();
      }
      var a = this._itemsRunTimeInfo.findKeyByPath(i);
      this.postponedOperations.add(a, function () {
        if (!e._disposed) {
          e.endUpdate();
        }
        return new w.Deferred().resolve();
      });
    }
    e.on("contentReady", function e(t) {
      t.component.off("contentReady", e);
      if ((0, D.isFullPathContainsTabs)(i)) {
        var n = (0, D.tryGetTabPath)(i);
        var a = o._itemsRunTimeInfo.findGroupOrTabLayoutManagerByPath(n);
        if (a) {
          o._alignLabelsInColumn({
            items: a.option("items"),
            layoutManager: a,
            $container: a.$element(),
            inOneColumn: a.isSingleColumnMode()
          });
        }
      } else {
        o._alignLabels(o._rootLayoutManager, o._rootLayoutManager.isSingleColumnMode());
      }
    });
    e.option(t, n);
    this._updateValidationGroupAndSummaryIfNeeded(t);
  },
  _tryChangeLayoutManagerItemOption: function (e, t) {
    var n = e.split(".");
    var i = (0, D.getOptionNameFromFullName)(e);
    if (i === "items" && n.length > 1) {
      var o = this._getItemPath(n);
      var a = this._itemsRunTimeInfo.findGroupOrTabLayoutManagerByPath(o);
      if (a) {
        this._itemsRunTimeInfo.removeItemsByItems(a.getItemsRunTimeInfo());
        var r = this._prepareItems(t, false, o);
        this._setLayoutManagerItemOption(a, i, r, o);
        return true;
      }
    } else if (n.length > 2) {
      var s = n.length - 2;
      var l = this._getItemPath(n.slice(0, s));
      var u = this._itemsRunTimeInfo.findGroupOrTabLayoutManagerByPath(l);
      if (u) {
        var d = (0, D.getFullOptionName)(n[s], i);
        if (i === "editorType" && u.option(d) !== t) {
          return false;
        }
        if (i === "visible") {
          var c = this.option((0, D.getFullOptionName)(l, "items"));
          if (c && c.length) {
            var h = u.option("items");
            c.forEach(function (e, t) {
              h[t].visibleIndex = e.visibleIndex;
            });
          }
        }
        this._setLayoutManagerItemOption(u, d, t, l);
        return true;
      }
    }
    return false;
  },
  _tryChangeLayoutManagerItemOptions: function (e, t) {
    var n;
    var i = this;
    this.beginUpdate();
    (0, d.each)(t, function (t, o) {
      if (!(n = i._tryChangeLayoutManagerItemOption((0, D.getFullOptionName)(e, t), o))) {
        return false;
      }
    });
    this.endUpdate();
    return n;
  },
  _getItemPath: function (e) {
    var t;
    var n = e[0];
    for (t = 1; t < e.length && e[t].search(/items\[\d+]|tabs\[\d+]/) !== -1; t++) {
      n += "." + e[t];
    }
    return n;
  },
  _triggerOnFieldDataChanged: function (e) {
    this._createActionByOption("onFieldDataChanged")(e);
  },
  _triggerOnFieldDataChangedByDataSet: function (e) {
    var t = this;
    if (e && (0, u.isObject)(e)) {
      (0, d.each)(e, function (e, n) {
        t._triggerOnFieldDataChanged({
          dataField: e,
          value: n
        });
      });
    }
  },
  _updateFieldValue: function (e, t) {
    if ((0, u.isDefined)(this.option("formData"))) {
      var n = this.getEditor(e);
      this.option("formData." + e, t);
      if (n) {
        if (n.option("value") !== t) {
          n.option("value", t);
        }
      }
    }
  },
  _generateItemsFromData: function (e) {
    var t = this.option("formData");
    var n = [];
    if (!e && (0, u.isDefined)(t)) {
      (0, d.each)(t, function (e) {
        n.push({
          dataField: e
        });
      });
    }
    if (e) {
      (0, d.each)(e, function (e, t) {
        if ((0, u.isObject)(t)) {
          n.push(t);
        } else {
          n.push({
            dataField: t
          });
        }
      });
    }
    return n;
  },
  _getItemByField: function (e, t) {
    var n;
    var i = this;
    var o = (0, u.isObject)(e) ? e : i._getFieldParts(e);
    var a = o.fieldName;
    var r = o.fieldPath;
    if (t.length) {
      (0, d.each)(t, function (e, t) {
        var o = t.itemType;
        if (r.length) {
          var s = r.slice();
          t = i._getItemByFieldPath(s, a, t);
        } else if (o === "group" && !t.caption && !t.name || o === "tabbed" && !t.name) {
          var l = i._getSubItemField(o);
          t.items = i._generateItemsFromData(t.items);
          t = i._getItemByField({
            fieldName: a,
            fieldPath: r
          }, t[l]);
        }
        if ((0, D.isEqualToDataFieldOrNameOrTitleOrCaption)(t, a)) {
          n = t;
          return false;
        }
      });
    }
    return n;
  },
  _getFieldParts: function (e) {
    var t = e;
    for (var n = t.indexOf("."), i = []; n !== -1;) {
      i.push(t.substr(0, n));
      n = (t = t.substr(n + 1)).indexOf(".");
    }
    return {
      fieldName: t,
      fieldPath: i.reverse()
    };
  },
  _getItemByFieldPath: function (e, t, n) {
    var i;
    var o = n.itemType;
    var a = this._getSubItemField(o);
    var r = o === "group" || o === "tabbed" || n.title;
    do {
      if (!r) {
        break;
      }
      var s = n.name || n.caption || n.title;
      var l = (0, u.isDefined)(s);
      var d = (0, D.getTextWithoutSpaces)(s);
      var c = undefined;
      n[a] = this._generateItemsFromData(n[a]);
      if (l) {
        c = e.pop();
      }
      if (!e.length && (i = this._getItemByField(t, n[a]))) {
        break;
      }
      if ((!l || l && d === c) && e.length) {
        i = this._searchItemInEverySubItem(e, t, n[a]);
      }
    } while (e.length && !(0, u.isDefined)(i));
    return i;
  },
  _getSubItemField: function (e) {
    if (e === "tabbed") {
      return "tabs";
    } else {
      return "items";
    }
  },
  _searchItemInEverySubItem: function (e, t, n) {
    var i;
    var o = this;
    (0, d.each)(n, function (n, a) {
      if (i = o._getItemByFieldPath(e.slice(), t, a)) {
        return false;
      }
    });
    i ||= false;
    return i;
  },
  _changeItemOption: function (e, t, n) {
    if ((0, u.isObject)(e)) {
      e[t] = n;
    }
  },
  _dimensionChanged: function () {
    var e = this._getCurrentScreenFactor();
    if (this._lastMarkupScreenFactor !== e) {
      if (this._isColCountChanged(this._lastMarkupScreenFactor, e)) {
        this._targetScreenFactor = e;
        this._refresh();
        this._targetScreenFactor = undefined;
      }
      this._lastMarkupScreenFactor = e;
    }
  },
  _isColCountChanged: function (e, t) {
    var n = false;
    (0, d.each)(this._cachedColCountOptions, function (i, o) {
      if (o.colCountByScreen[e] !== o.colCountByScreen[t]) {
        n = true;
        return false;
      }
    });
    return n;
  },
  _refresh: function () {
    o.default.trigger(this.$element().find(".dx-state-focused input, .dx-state-focused textarea"), "change");
    this.callBase();
  },
  _resetValues: function () {
    this._itemsRunTimeInfo.each(function (e, t) {
      if ((0, u.isDefined)(t.widgetInstance) && m.default.isEditor(t.widgetInstance)) {
        t.widgetInstance.reset();
        t.widgetInstance.option("isValid", true);
      }
    });
    v.default.resetGroup(this._getValidationGroup());
  },
  _updateData: function (e, t, n) {
    var i = this;
    var o = n ? t : e;
    if ((0, u.isObject)(o)) {
      (0, d.each)(o, function (t, o) {
        i._updateData(n ? e + "." + t : t, o, (0, u.isObject)(o));
      });
    } else if ((0, u.isString)(e)) {
      i._updateFieldValue(e, t);
    }
  },
  registerKeyHandler: function (e, t) {
    this.callBase(e, t);
    this._itemsRunTimeInfo.each(function (n, i) {
      if ((0, u.isDefined)(i.widgetInstance)) {
        i.widgetInstance.registerKeyHandler(e, t);
      }
    });
  },
  _focusTarget: function () {
    return this.$element().find("." + E.FIELD_ITEM_CONTENT_CLASS + " [tabindex]").first();
  },
  _visibilityChanged: function () {
    this._alignLabels(this._rootLayoutManager, this._rootLayoutManager.isSingleColumnMode());
  },
  _clearAutoColCountChangedTimeout: function () {
    if (this.autoColCountChangedTimeoutId) {
      clearTimeout(this.autoColCountChangedTimeoutId);
      this.autoColCountChangedTimeoutId = undefined;
    }
  },
  _dispose: function () {
    this._clearAutoColCountChangedTimeout();
    v.default.removeGroup(this._getValidationGroup());
    this.callBase();
  },
  resetValues: function () {
    this._resetValues();
  },
  updateData: function (e, t) {
    this._updateData(e, t);
  },
  getEditor: function (e) {
    return this._itemsRunTimeInfo.findWidgetInstanceByDataField(e) || this._itemsRunTimeInfo.findWidgetInstanceByName(e);
  },
  getButton: function (e) {
    return this._itemsRunTimeInfo.findWidgetInstanceByName(e);
  },
  updateDimensions: function () {
    var e = this;
    var t = new w.Deferred();
    if (e._scrollable) {
      e._scrollable.update().done(function () {
        t.resolveWith(e);
      });
    } else {
      t.resolveWith(e);
    }
    return t.promise();
  },
  itemOption: function (e, t, n) {
    var i = this;
    var o = this._generateItemsFromData(this.option("items"));
    var a = this._getItemByField(e, o);
    var r = (0, D.getItemPath)(o, a);
    if (a) {
      switch (arguments.length) {
        case 1:
          return a;
        case 3:
          var s = this._tryCreateItemOptionAction(t, a, n, a[t], r);
          this._changeItemOption(a, t, n);
          var l = (0, D.getFullOptionName)(r, t);
          if (!this._tryExecuteItemOptionAction(s) && !this._tryChangeLayoutManagerItemOption(l, n)) {
            this.option("items", o);
          }
          break;
        default:
          var c;
          if ((0, u.isObject)(t)) {
            if (!this._tryChangeLayoutManagerItemOptions(r, t)) {
              (0, d.each)(t, function (e, t) {
                var n = i._tryCreateItemOptionAction(e, a, t, a[e], r);
                i._changeItemOption(a, e, t);
                if (!c && !i._tryExecuteItemOptionAction(n)) {
                  c = true;
                }
              });
              if (c) {
                this.option("items", o);
              }
            }
          }
      }
    }
  },
  validate: function () {
    return v.default.validateGroup(this._getValidationGroup());
  },
  getItemID: function (e) {
    return "dx_" + this.option("formID") + "_" + (e || new r.default());
  },
  getTargetScreenFactor: function () {
    return this._targetScreenFactor;
  }
});
(0, a.default)("dxForm", L);
var V = L;
exports.default = V;
module.exports = exports.default;
module.exports.default = exports.default;