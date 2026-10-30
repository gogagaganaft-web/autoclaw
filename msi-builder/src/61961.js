exports.EDITORS_WITHOUT_LABELS = undefined;
exports.convertToLabelMarkOptions = h;
exports.convertToRenderFieldItemOptions = function (e) {
  var t = e.$parent;
  var n = e.rootElementCssClassList;
  var i = e.formOrLayoutManager;
  var f = e.createComponentCallback;
  var p = e.item;
  var g = e.template;
  var m = e.labelTemplate;
  var _ = e.name;
  var v = e.formLabelLocation;
  var y = e.requiredMessageTemplate;
  var b = e.validationGroup;
  var x = e.editorValue;
  var w = e.canAssignUndefinedValueToEditor;
  var C = e.editorValidationBoundary;
  var S = e.editorStylingMode;
  var k = e.showColonAfterLabel;
  var D = e.managerLabelLocation;
  var I = e.itemId;
  var T = e.managerMarkOptions;
  var E = e.labelMode;
  var O = e.onLabelTemplateRendered;
  var A = (0, a.isDefined)(p.isRequired) ? p.isRequired : !!function (e) {
    var t;
    if (e && e.length) {
      (0, r.each)(e, function (e, n) {
        if (n.type === "required") {
          t = true;
          return false;
        }
      });
    }
    return t;
  }(p.validationRules);
  var P = p.itemType === u.SIMPLE_ITEM_TYPE;
  var M = p.helpText ? "dx-" + new l.default() : null;
  var R = function (e) {
    var t = e.item;
    var n = e.id;
    var i = e.isRequired;
    var a = e.managerMarkOptions;
    var r = e.showColonAfterLabel;
    var u = e.labelLocation;
    var d = e.labelTemplate;
    var f = e.formLabelMode;
    var p = e.onLabelTemplateRendered;
    var g = c.includes(t.editorType);
    var m = (0, o.extend)({
      showColon: r,
      location: u,
      id: n,
      visible: f === "outside" || g && f !== "hidden",
      isRequired: i
    }, t ? t.label : {}, {
      markOptions: h(a, i),
      labelTemplate: d,
      onLabelTemplateRendered: p
    });
    if (["dxRadioGroup", "dxCheckBox", "dxLookup", "dxSlider", "dxRangeSlider", "dxSwitch", "dxHtmlEditor", "dxDateRangeBox"].includes(t.editorType)) {
      m.labelID = `dx-label-${new l.default()}`;
    }
    if (!m.text && t.dataField) {
      m.text = (0, s.captionize)(t.dataField);
    }
    if (m.text) {
      m.textWithoutColon = m.text;
      m.text += m.showColon ? ":" : "";
    }
    return m;
  }({
    item: p,
    id: I,
    isRequired: A,
    managerMarkOptions: T,
    showColonAfterLabel: k,
    labelLocation: D,
    formLabelMode: E,
    labelTemplate: m,
    onLabelTemplateRendered: O
  });
  var B = R.visible && (R.text || R.labelTemplate && P);
  var L = R.location;
  var V = R.labelID;
  var F = L !== "top" && ["dxTextArea", "dxRadioGroup", "dxCalendar", "dxHtmlEditor"].includes(p.editorType);
  var H = function (e) {
    var t = e.editorType;
    var n = e.defaultEditorName;
    var i = e.editorValue;
    var r = e.canAssignUndefinedValueToEditor;
    var s = e.externalEditorOptions;
    var l = e.editorInputId;
    var u = e.editorValidationBoundary;
    var c = e.editorStylingMode;
    var h = e.formLabelMode;
    var f = e.labelText;
    var p = e.labelMark;
    var g = {};
    if (i !== undefined || r) {
      g.value = i;
    }
    if (d.indexOf(t) !== -1) {
      g.value = g.value || [];
    }
    var m = s == null ? undefined : s.labelMode;
    if (!(0, a.isDefined)(m)) {
      m = h === "outside" ? "hidden" : h;
    }
    var _ = (s == null ? undefined : s.stylingMode) || c;
    var v = (0, o.extend)(true, g, s, {
      inputAttr: {
        id: l
      },
      validationBoundary: u,
      stylingMode: _,
      label: f,
      labelMode: m,
      labelMark: p
    });
    if (s) {
      v.dataSource &&= s.dataSource;
      v.items &&= s.items;
    }
    if (n && !v.name) {
      v.name = n;
    }
    return v;
  }({
    editorType: p.editorType,
    editorValue: x,
    defaultEditorName: p.dataField,
    canAssignUndefinedValueToEditor: w,
    externalEditorOptions: p.editorOptions,
    editorInputId: I,
    editorValidationBoundary: C,
    editorStylingMode: S,
    formLabelMode: E,
    labelText: R.textWithoutColon,
    labelMark: R.markOptions.showRequiredMark ? String.fromCharCode(160) + R.markOptions.requiredMark : ""
  });
  var N = !R.markOptions.showOptionalMark || R.visible || H.labelMode === "hidden" || (0, a.isDefined)(p.helpText) ? p.helpText : R.markOptions.optionalMark;
  return {
    $parent: t,
    rootElementCssClassList: n,
    formOrLayoutManager: i,
    createComponentCallback: f,
    labelOptions: R,
    labelNeedBaselineAlign: F,
    labelLocation: L,
    needRenderLabel: B,
    item: p,
    isSimpleItem: P,
    isRequired: A,
    template: g,
    helpID: M,
    labelID: V,
    name: _,
    helpText: N,
    formLabelLocation: v,
    requiredMessageTemplate: y,
    validationGroup: b,
    editorOptions: H
  };
};
exports.getLabelMarkText = function (e) {
  var t = e.showRequiredMark;
  var n = e.requiredMark;
  var i = e.showOptionalMark;
  var o = e.optionalMark;
  if (!t && !i) {
    return "";
  }
  return String.fromCharCode(160) + (t ? n : o);
};
var i;
var o = require("./13306.js");
var a = require("./35922.js");
var r = require("./95479.js");
var s = require("./78008.js");
var l = (i = require("./73176.js")) && i.__esModule ? i : {
  default: i
};
var u = require("./31093.js");
var d = ["dxTagBox", "dxRangeSlider", "dxDateRangeBox"];
var c = ["dxCalendar", "dxCheckBox", "dxHtmlEditor", "dxRadioGroup", "dxRangeSlider", "dxSlider", "dxSwitch"];
function h(e, t) {
  return {
    showRequiredMark: e.showRequiredMark && t,
    requiredMark: e.requiredMark,
    showOptionalMark: e.showOptionalMark && !t,
    optionalMark: e.optionalMark
  };
}
exports.EDITORS_WITHOUT_LABELS = c;