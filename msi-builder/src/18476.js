exports.default = undefined;
var i = y(require("./68374.js"));
var o = y(require("./73349.js"));
var a = y(require("./38377.js"));
var r = y(require("./55994.js"));
var s = y(require("./14390.js"));
var l = y(require("./99393.js"));
var u = require("./13306.js");
var d = y(require("./28109.js"));
var c = require("./62754.js");
var h = require("./35922.js");
var f = y(require("./30254.js"));
var p = y(require("./51495.js"));
var g = require("./13660.js");
var m = y(require("./15653.js"));
var _ = require("./39611.js");
var v = require("./59423.js");
function y(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
var b = [{
  name: "onEditorPreparing",
  config: {
    excludeValidators: ["disabled", "readOnly"],
    category: "rendering"
  }
}, {
  name: "onEditorPrepared",
  config: {
    excludeValidators: ["disabled", "readOnly"],
    category: "rendering"
  }
}, {
  name: "onValueChanged",
  config: {
    excludeValidators: ["disabled", "readOnly"]
  }
}];
var x = {
  and: "and",
  or: "or",
  notAnd: "!and",
  notOr: "!or"
};
var w = a.default.inherit(m.default);
var C = s.default.inherit({
  _getDefaultOptions: function () {
    return (0, u.extend)(this.callBase(), {
      onEditorPreparing: null,
      onEditorPrepared: null,
      onValueChanged: null,
      fields: [],
      groupOperations: ["and", "or", "notAnd", "notOr"],
      maxGroupLevel: undefined,
      value: null,
      allowHierarchicalFields: false,
      groupOperationDescriptions: {
        and: d.default.format("dxFilterBuilder-and"),
        or: d.default.format("dxFilterBuilder-or"),
        notAnd: d.default.format("dxFilterBuilder-notAnd"),
        notOr: d.default.format("dxFilterBuilder-notOr")
      },
      customOperations: [],
      closePopupOnTargetScroll: true,
      filterOperationDescriptions: {
        between: d.default.format("dxFilterBuilder-filterOperationBetween"),
        equal: d.default.format("dxFilterBuilder-filterOperationEquals"),
        notEqual: d.default.format("dxFilterBuilder-filterOperationNotEquals"),
        lessThan: d.default.format("dxFilterBuilder-filterOperationLess"),
        lessThanOrEqual: d.default.format("dxFilterBuilder-filterOperationLessOrEquals"),
        greaterThan: d.default.format("dxFilterBuilder-filterOperationGreater"),
        greaterThanOrEqual: d.default.format("dxFilterBuilder-filterOperationGreaterOrEquals"),
        startsWith: d.default.format("dxFilterBuilder-filterOperationStartsWith"),
        contains: d.default.format("dxFilterBuilder-filterOperationContains"),
        notContains: d.default.format("dxFilterBuilder-filterOperationNotContains"),
        endsWith: d.default.format("dxFilterBuilder-filterOperationEndsWith"),
        isBlank: d.default.format("dxFilterBuilder-filterOperationIsBlank"),
        isNotBlank: d.default.format("dxFilterBuilder-filterOperationIsNotBlank")
      }
    });
  },
  _optionChanged: function (e) {
    switch (e.name) {
      case "closePopupOnTargetScroll":
        break;
      case "onEditorPreparing":
      case "onEditorPrepared":
      case "onValueChanged":
        this._initActions();
        break;
      case "customOperations":
        this._initCustomOperations();
        this._invalidate();
        break;
      case "fields":
      case "maxGroupLevel":
      case "groupOperations":
      case "allowHierarchicalFields":
      case "groupOperationDescriptions":
      case "filterOperationDescriptions":
        this._invalidate();
        break;
      case "value":
        if (e.value !== e.previousValue) {
          var t = this._disableInvalidateForValue;
          if (!t) {
            this._initModel();
            this._invalidate();
          }
          this._disableInvalidateForValue = false;
          this.executeAction("onValueChanged", {
            value: e.value,
            previousValue: e.previousValue
          });
          this._disableInvalidateForValue = t;
        }
        break;
      default:
        this.callBase(e);
    }
  },
  getFilterExpression: function () {
    var e = this._getNormalizedFields();
    var t = (0, u.extend)(true, [], this._model);
    return (0, v.getFilterExpression)((0, v.getNormalizedFilter)(t), e, this._customOperations, "filterBuilder");
  },
  _getNormalizedFields: function () {
    return (0, v.getNormalizedFields)(this.option("fields"));
  },
  _updateFilter: function () {
    this._disableInvalidateForValue = true;
    var e = (0, u.extend)(true, [], this._model);
    var t = (0, v.getNormalizedFilter)(e);
    var n = (0, v.getNormalizedFilter)(this._getModel(this.option("value")));
    if (JSON.stringify(n) !== JSON.stringify(t)) {
      this.option("value", t);
    }
    this._disableInvalidateForValue = false;
    this._fireContentReadyAction();
  },
  _init: function () {
    this._initCustomOperations();
    this._initModel();
    this._initEditorFactory();
    this._initActions();
    this.callBase();
  },
  _initEditorFactory: function () {
    this._editorFactory = new w();
  },
  _initCustomOperations: function () {
    this._customOperations = (0, v.getMergedOperations)(this.option("customOperations"), this.option("filterOperationDescriptions.between"), this);
  },
  _getDefaultGroupOperation: function () {
    return this.option("groupOperations")?.[0] ?? x.and;
  },
  _getModel: function (e) {
    return (0, v.convertToInnerStructure)(e, this._customOperations, this._getDefaultGroupOperation());
  },
  _initModel: function () {
    this._model = this._getModel(this.option("value"));
  },
  _initActions: function () {
    var e = this;
    e._actions = {};
    b.forEach(function (t) {
      var n = (0, u.extend)({}, t.config);
      e._actions[t.name] = e._createActionByOption(t.name, n);
    });
  },
  executeAction: function (e, t) {
    var n = this._actions[e];
    return n && n(t);
  },
  _initMarkup: function () {
    this.$element().addClass("dx-filterbuilder");
    this.callBase();
    this._createGroupElementByCriteria(this._model).appendTo(this.$element());
  },
  _createConditionElement: function (e, t) {
    return (0, i.default)("<div>").addClass("dx-filterbuilder-group").append(this._createConditionItem(e, t));
  },
  _createGroupElementByCriteria: function (e, t, n = 0) {
    var i = this._createGroupElement(e, t, n);
    var o = i.find(".dx-filterbuilder-group-content");
    for (var a = (0, v.getGroupCriteria)(e), r = 0; r < a.length; r++) {
      var s = a[r];
      if ((0, v.isGroup)(s)) {
        this._createGroupElementByCriteria(s, e, n + 1).appendTo(o);
      } else if ((0, v.isCondition)(s)) {
        this._createConditionElement(s, e).appendTo(o);
      }
    }
    return i;
  },
  _createGroupElement: function (e, t, n) {
    var o = this;
    var a = (0, i.default)("<div>").addClass("dx-filterbuilder-group-item");
    var r = (0, i.default)("<div>").addClass("dx-filterbuilder-group-content");
    var s = (0, i.default)("<div>").addClass("dx-filterbuilder-group").append(a).append(r);
    if (t != null) {
      this._createRemoveButton(function () {
        (0, v.removeItem)(t, e);
        s.remove();
        o._updateFilter();
      }).appendTo(a);
    }
    this._createGroupOperationButton(e).appendTo(a);
    this._createAddButton(function () {
      var t = (0, v.createEmptyGroup)(o._getDefaultGroupOperation());
      (0, v.addItem)(t, e);
      o._createGroupElement(t, e, n + 1).appendTo(r);
      o._updateFilter();
    }, function () {
      var t = o.option("fields")[0];
      var n = (0, v.createCondition)(t, o._customOperations);
      (0, v.addItem)(n, e);
      o._createConditionElement(n, e).appendTo(r);
      o._updateFilter();
    }, n).appendTo(a);
    return s;
  },
  _createButton: function (e) {
    return (0, i.default)("<div>").text(e);
  },
  _createGroupOperationButton: function (e) {
    var t = this;
    var n = this._getGroupOperations(e);
    var i = (0, v.getGroupMenuItem)(e, n);
    var o = i.text;
    var a = n && n.length < 2 ? this._createButton(o).addClass("dx-state-disabled") : this._createButtonWithMenu({
      caption: o,
      menu: {
        items: n,
        displayExpr: "text",
        keyExpr: "value",
        onItemClick: function (n) {
          if (i !== n.itemData) {
            (0, v.setGroupValue)(e, n.itemData.value);
            a.text(n.itemData.text);
            i = n.itemData;
            t._updateFilter();
          }
        },
        onContentReady: function (e) {
          e.component.selectItem(i);
        },
        cssClass: "dx-filterbuilder-group-operations"
      }
    });
    return a.addClass("dx-filterbuilder-text").addClass("dx-filterbuilder-group-operation").attr("tabindex", 0);
  },
  _createButtonWithMenu: function (e) {
    var t;
    var n = this;
    function o() {
      n.$element().find(".dx-state-active").removeClass("dx-state-active");
      n.$element().find(".dx-overlay .dx-treeview").remove();
      n.$element().find(".dx-overlay").remove();
    }
    var a = this.option("rtlEnabled");
    var s = a ? "right" : "left";
    var l = this._createButton(e.caption);
    (0, u.extend)(e.menu, {
      focusStateEnabled: true,
      selectionMode: "single",
      onItemClick: (t = e.menu.onItemClick, function (e) {
        t(e);
        if (e.event.type === "dxclick") {
          o();
        }
      }),
      onHiding: function (e) {
        l.removeClass("dx-state-active");
      },
      position: {
        my: s + " top",
        at: s + " bottom",
        offset: "0 1",
        of: l,
        collision: "flip"
      },
      animation: null,
      onHidden: function () {
        o();
      },
      cssClass: "dx-filterbuilder-overlay " + e.menu.cssClass,
      rtlEnabled: a
    });
    e.popup = {
      onShown: function (t) {
        var n = (0, i.default)(t.component.content()).find(".dx-treeview");
        var o = n.dxTreeView("instance");
        r.default.on(n, "keyup keydown", function (n) {
          var i = (0, _.normalizeKeyName)(n);
          if (n.type === "keydown" && i === "tab" || n.type === "keyup" && (i === "escape" || i === "enter")) {
            t.component.hide();
            r.default.trigger(e.menu.position.of, "focus");
          }
        });
        o.focus();
        o.option("focusedElement", null);
      }
    };
    this._subscribeOnClickAndEnterKey(l, function () {
      o();
      n._createPopupWithTreeView(e, n.$element());
      l.addClass("dx-state-active");
    });
    return l;
  },
  _hasValueButton: function (e) {
    var t = (0, v.getCustomOperation)(this._customOperations, e[1]);
    if (t) {
      return t.hasValue !== false;
    } else {
      return e[2] !== null;
    }
  },
  _createOperationButtonWithMenu: function (e, t) {
    var n = this;
    var o = this;
    var a = (0, v.getAvailableOperations)(t, this.option("filterOperationDescriptions"), this._customOperations);
    var r = (0, v.getOperationFromAvailable)((0, v.getOperationValue)(e), a);
    var s = this._createButtonWithMenu({
      caption: r.text,
      menu: {
        items: a,
        displayExpr: "text",
        onItemRendered: function (e) {
          if (e.itemData.isCustom) {
            (0, i.default)(e.itemElement).addClass("dx-filterbuilder-menu-custom-operation");
          }
        },
        onContentReady: function (e) {
          e.component.selectItem(r);
        },
        onItemClick: function (i) {
          if (r !== i.itemData) {
            r = i.itemData;
            (0, v.updateConditionByOperation)(e, r.value, o._customOperations);
            var a = s.siblings().filter(".dx-filterbuilder-item-value");
            if (o._hasValueButton(e)) {
              if (a.length !== 0) {
                a.remove();
              }
              o._createValueButton(e, t).appendTo(s.parent());
            } else {
              a.remove();
            }
            s.html(r.text);
            n._updateFilter();
          }
        },
        cssClass: "dx-filterbuilder-operations"
      }
    }).addClass("dx-filterbuilder-text").addClass("dx-filterbuilder-item-operation").attr("tabindex", 0);
    return s;
  },
  _createOperationAndValueButtons: function (e, t, n) {
    this._createOperationButtonWithMenu(e, t).appendTo(n);
    if (this._hasValueButton(e)) {
      this._createValueButton(e, t).appendTo(n);
    }
  },
  _createFieldButtonWithMenu: function (e, t, n) {
    var i = this;
    var o = this;
    var a = this.option("allowHierarchicalFields");
    var r = (0, v.getItems)(e, a);
    var s = (0, v.getField)(n.name || n.dataField, r);
    function l(e, t) {
      if (a) {
        return (0, v.getCaptionWithParents)(e, t);
      } else {
        return e.caption;
      }
    }
    var u = this._createButtonWithMenu({
      caption: l(s, r),
      menu: {
        items: r,
        dataStructure: "plain",
        keyExpr: "id",
        parentId: "parentId",
        displayExpr: "caption",
        onItemClick: function (e) {
          if (s !== e.itemData) {
            s = e.itemData;
            t[0] = s.name || s.dataField;
            t[2] = s.dataType === "object" ? null : "";
            (0, v.updateConditionByOperation)(t, (0, v.getDefaultOperation)(s), o._customOperations);
            u.siblings().filter(".dx-filterbuilder-text").remove();
            o._createOperationAndValueButtons(t, s, u.parent());
            var n = l(s, e.component.option("items"));
            u.html(n);
            i._updateFilter();
          }
        },
        onContentReady: function (e) {
          e.component.selectItem(s);
        },
        cssClass: "dx-filterbuilder-fields"
      }
    }).addClass("dx-filterbuilder-text").addClass("dx-filterbuilder-item-field").attr("tabindex", 0);
    return u;
  },
  _createConditionItem: function (e, t) {
    var n = this;
    var o = (0, i.default)("<div>").addClass("dx-filterbuilder-group-item");
    var a = this._getNormalizedFields();
    var r = (0, v.getField)(e[0], a);
    this._createRemoveButton(function () {
      (0, v.removeItem)(t, e);
      if (o.parent().children().length === 1) {
        o.parent().remove();
      } else {
        o.remove();
      }
      n._updateFilter();
    }).appendTo(o);
    this._createFieldButtonWithMenu(a, e, r).appendTo(o);
    this._createOperationAndValueButtons(e, r, o);
    return o;
  },
  _getGroupOperations: function (e) {
    var t = this.option("groupOperations");
    var n = this.option("groupOperationDescriptions");
    if (!t || !t.length) {
      t = [(0, v.getGroupValue)(e).replace("!", "not")];
    }
    return t.map(function (e) {
      return {
        text: n[e],
        value: x[e]
      };
    });
  },
  _createRemoveButton: function (e) {
    var t = (0, i.default)("<div>").addClass("dx-filterbuilder-action-icon").addClass("dx-icon-remove").addClass("dx-filterbuilder-action").attr("tabindex", 0);
    this._subscribeOnClickAndEnterKey(t, e);
    return t;
  },
  _createAddButton: function (e, t, n) {
    var i;
    var o = this.option("maxGroupLevel");
    if ((0, h.isDefined)(o) && n >= o) {
      i = this._createButton();
      this._subscribeOnClickAndEnterKey(i, t);
    } else {
      i = this._createButtonWithMenu({
        menu: {
          items: [{
            caption: d.default.format("dxFilterBuilder-addCondition"),
            click: t
          }, {
            caption: d.default.format("dxFilterBuilder-addGroup"),
            click: e
          }],
          displayExpr: "caption",
          onItemClick: function (e) {
            e.itemData.click();
          },
          cssClass: "dx-filterbuilder-add-condition"
        }
      });
    }
    return i.addClass("dx-filterbuilder-action-icon").addClass("dx-icon-plus").addClass("dx-filterbuilder-action").attr("tabindex", 0);
  },
  _createValueText: function (e, t, n) {
    var o = this;
    var a = (0, i.default)("<div>").html("&nbsp;").addClass("dx-filterbuilder-item-value-text").attr("tabindex", 0).appendTo(n);
    var r = e[2];
    var s = (0, v.getCustomOperation)(o._customOperations, e[1]);
    if (!s && t.lookup) {
      (0, v.getCurrentLookupValueText)(t, r, function (e) {
        (0, v.renderValueText)(a, e);
      });
    } else {
      (0, c.when)((0, v.getCurrentValueText)(t, r, s)).done(function (e) {
        (0, v.renderValueText)(a, e, s);
      });
    }
    o._subscribeOnClickAndEnterKey(a, function (i) {
      if (i.type === "keyup") {
        i.stopPropagation();
      }
      o._createValueEditorWithEvents(e, t, n);
    });
    return a;
  },
  _updateConditionValue: function (e, t, n) {
    if (e[2] !== t) {
      e[2] = t;
    }
    n();
    this._updateFilter();
  },
  _addDocumentKeyUp: function (e, t) {
    var n = false;
    var i = false;
    var a = o.default.getDocument();
    function s(e) {
      if (n || i) {
        i = false;
      } else {
        t(e);
      }
    }
    r.default.on(a, "keyup", s);
    var l = e.find("input");
    r.default.on(l, "compositionstart", function () {
      n = true;
    });
    r.default.on(l, "compositionend", function () {
      n = false;
      i = true;
    });
    r.default.on(l, "keydown", function (e) {
      if (e.which !== 229) {
        i = false;
      }
    });
    this._documentKeyUpHandler = s;
  },
  _addDocumentClick: function (e, t) {
    var n = this;
    var i = o.default.getDocument();
    function a(i) {
      if (!n._isFocusOnEditorParts(e, i.target)) {
        r.default.trigger(e.find("input"), "change");
        t();
      }
    }
    r.default.on(i, "dxpointerdown", a);
    this._documentClickHandler = a;
  },
  _isFocusOnEditorParts: function (e, t) {
    var n = t || o.default.getActiveElement();
    return (0, i.default)(n).closest(e.children()).length || (0, i.default)(n).closest(".dx-dropdowneditor-overlay").length;
  },
  _removeEvents: function () {
    var e = o.default.getDocument();
    if ((0, h.isDefined)(this._documentKeyUpHandler)) {
      r.default.off(e, "keyup", this._documentKeyUpHandler);
    }
    if ((0, h.isDefined)(this._documentClickHandler)) {
      r.default.off(e, "dxpointerdown", this._documentClickHandler);
    }
  },
  _dispose: function () {
    this._removeEvents();
    this.callBase();
  },
  _createValueEditorWithEvents: function (e, t, n) {
    var i = this;
    var o = e[2];
    function a() {
      n.empty();
      i._removeEvents();
      return i._createValueText(e, t, n);
    }
    function s() {
      i._updateConditionValue(e, o, function () {
        a();
      });
    }
    var l = {
      value: o === "" ? null : o,
      filterOperation: (0, v.getOperationValue)(e),
      setValue: function (e) {
        o = e === null ? "" : e;
      },
      closeEditor: s,
      text: n.text()
    };
    n.empty();
    var u = this._createValueEditor(n, t, l);
    r.default.trigger(u.find("input").not(":hidden").eq(0), "focus");
    this._removeEvents();
    this._addDocumentClick(u, s);
    this._addDocumentKeyUp(u, function (t) {
      var s = (0, _.normalizeKeyName)(t);
      if (s === "tab") {
        if (i._isFocusOnEditorParts(u)) {
          return;
        }
        i._updateConditionValue(e, o, function () {
          a();
          if (t.shiftKey) {
            r.default.trigger(n.prev(), "focus");
          }
        });
      }
      if (s === "escape") {
        r.default.trigger(a(), "focus");
      }
      if (s === "enter") {
        i._updateConditionValue(e, o, function () {
          r.default.trigger(a(), "focus");
        });
      }
    });
    this._fireContentReadyAction();
  },
  _createValueButton: function (e, t) {
    var n = (0, i.default)("<div>").addClass("dx-filterbuilder-text").addClass("dx-filterbuilder-item-value");
    this._createValueText(e, t, n);
    return n;
  },
  _createValueEditor: function (e, t, n) {
    var o = (0, i.default)("<div>").attr("tabindex", 0).appendTo(e);
    var a = (0, v.getCustomOperation)(this._customOperations, n.filterOperation);
    var r = a && a.editorTemplate ? a.editorTemplate : t.editorTemplate;
    if (r) {
      this._getTemplate(r).render({
        model: (0, u.extend)({
          field: t
        }, n),
        container: o
      });
    } else {
      this._editorFactory.createEditor.call(this, o, (0, u.extend)({}, t, n, {
        parentType: "filterBuilder"
      }));
    }
    return o;
  },
  _createPopupWithTreeView: function (e, t) {
    var n = this;
    var o = (0, i.default)("<div>").addClass(e.menu.cssClass).appendTo(t);
    this._createComponent(o, p.default, {
      onHiding: e.menu.onHiding,
      onHidden: e.menu.onHidden,
      rtlEnabled: e.menu.rtlEnabled,
      position: e.menu.position,
      animation: e.menu.animation,
      contentTemplate: function (t) {
        var o = (0, i.default)("<div>").appendTo(t);
        n._createComponent(o, f.default, e.menu);
        this.repaint();
      },
      _ignoreFunctionValueDeprecation: true,
      maxHeight: function () {
        return (0, g.getElementMaxHeightByWindow)(e.menu.position.of);
      },
      visible: true,
      focusStateEnabled: false,
      hideOnParentScroll: this.option("closePopupOnTargetScroll"),
      hideOnOutsideClick: true,
      onShown: e.popup.onShown,
      shading: false,
      width: "auto",
      height: "auto",
      showTitle: false,
      _wrapperClassExternal: e.menu.cssClass
    });
  },
  _subscribeOnClickAndEnterKey: function (e, t) {
    r.default.on(e, "dxclick", t);
    r.default.on(e, "keyup", function (e) {
      if ((0, _.normalizeKeyName)(e) === "enter") {
        t(e);
      }
    });
  }
});
(0, l.default)("dxFilterBuilder", C);
var S = C;
exports.default = S;
module.exports = exports.default;
module.exports.default = exports.default;