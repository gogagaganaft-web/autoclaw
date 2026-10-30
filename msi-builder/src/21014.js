exports.TOGGLE_CONTROLS_PADDING_CLASS = exports.LABEL_VERTICAL_ALIGNMENT_CLASS = exports.LABEL_HORIZONTAL_ALIGNMENT_CLASS = exports.FLEX_LAYOUT_CLASS = exports.FIELD_ITEM_REQUIRED_CLASS = exports.FIELD_ITEM_OPTIONAL_CLASS = exports.FIELD_ITEM_LABEL_ALIGN_CLASS = exports.FIELD_ITEM_HELP_TEXT_CLASS = exports.FIELD_ITEM_CONTENT_WRAPPER_CLASS = exports.FIELD_ITEM_CONTENT_LOCATION_CLASS = undefined;
exports.renderFieldItem = function (e) {
  var t = e.$parent;
  var n = e.rootElementCssClassList;
  var u = e.formOrLayoutManager;
  var p = e.createComponentCallback;
  var v = e.labelOptions;
  var y = e.labelNeedBaselineAlign;
  var b = e.labelLocation;
  var x = e.needRenderLabel;
  var w = e.formLabelLocation;
  var C = e.item;
  var S = e.editorOptions;
  var k = e.isSimpleItem;
  var D = e.isRequired;
  var I = e.template;
  var T = e.helpID;
  var E = e.labelID;
  var O = e.name;
  var A = e.helpText;
  var P = e.requiredMessageTemplate;
  var M = e.validationGroup;
  var R = (0, i.default)("<div>").addClass(n.join(" ")).appendTo(t);
  R.addClass(D ? "dx-field-item-required" : "dx-field-item-optional");
  if (k) {
    R.addClass("dx-flex-layout");
  }
  if (k && y) {
    R.addClass("dx-field-item-label-align");
  }
  var B = (0, i.default)("<div>");
  B.data("dx-form-item", C);
  B.addClass(h.FIELD_ITEM_CONTENT_CLASS).addClass("dx-field-item-content-location-" + {
    right: "left",
    left: "right",
    top: "bottom"
  }[w]);
  var L;
  var V = null;
  if (x) {
    if (v.labelTemplate) {
      v.labelTemplateData = _(C, S, u);
    }
    V = (0, f.renderLabel)(v);
  }
  if (V) {
    var F = C.editorType;
    R.append(V);
    if (b === "top" || b === "left") {
      R.append(B);
    }
    if (b === "right") {
      R.prepend(B);
    }
    if (b === "top") {
      R.addClass("dx-label-v-align");
    } else {
      R.addClass("dx-label-h-align");
    }
    if (F === "dxCheckBox" || F === "dxSwitch") {
      o.default.on(V, a.name, function () {
        o.default.trigger(B.children(), a.name);
      });
    }
    var H = ["dxCheckBox", "dxSwitch", "dxRadioGroup"].includes(F);
    var N = v.alignment;
    var z = N === "left" || !N;
    var j = b === "top";
    if (!I && H && j && z) {
      B.addClass("dx-toggle-controls-paddings");
    }
  } else {
    R.append(B);
  }
  if (I) {
    I.render({
      container: (0, r.getPublicElement)(B),
      model: _(C, S, u),
      onRendered: function () {
        m(function (e) {
          var t;
          var n;
          return (e == null ? undefined : e.data("dx-validation-target")) || (e == null || (t = e.parent) === null || t === undefined || (n = t.call(e)) === null || n === undefined ? undefined : n.data("dx-validation-target"));
        }(g(B)));
      }
    });
  } else {
    var W = (0, i.default)("<div>").appendTo(B);
    try {
      (L = p(W, C.editorType, S)).setAria("describedby", T);
      if (E) {
        L.setAria("labelledby", E);
      }
      L.setAria("required", D);
    } catch (e) {
      d.default.log("E1035", e.message);
    }
  }
  var G = g(B);
  var q = G && G.data("dx-validation-target");
  if (q) {
    var $;
    var U = C.label && C.label.text;
    var K = U ? null : O;
    var Z = U ? C.label.text : K && (0, s.captionize)(K);
    if (k) {
      if (C.validationRules) {
        $ = C.validationRules;
      } else {
        var Y = (0, l.format)(P, Z || "");
        $ = C.isRequired ? [{
          type: "required",
          message: Y
        }] : null;
      }
    }
    if (Array.isArray($) && $.length) {
      p(G, c.default, {
        validationRules: $,
        validationGroup: M,
        dataGetter: function () {
          return {
            formItem: C
          };
        }
      });
    }
    m(q);
  }
  if (A && k) {
    B.parent().append((0, i.default)("<div>").addClass("dx-field-item-content-wrapper").append(B).append((0, i.default)("<div>").addClass("dx-field-item-help-text").attr("id", T).text(A)));
  }
  return {
    $fieldEditorContainer: B,
    $rootElement: R,
    widgetInstance: L
  };
};
var i = p(require("./68374.js"));
var o = p(require("./55994.js"));
var a = require("./95429.js");
var r = require("./6415.js");
var s = require("./78008.js");
var l = require("./68752.js");
var u = require("./75811.js");
var d = p(require("./96688.js"));
var c = p(require("./39562.js"));
var h = require("./31093.js");
var f = require("./11042.js");
function p(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
exports.FLEX_LAYOUT_CLASS = "dx-flex-layout";
exports.FIELD_ITEM_OPTIONAL_CLASS = "dx-field-item-optional";
exports.FIELD_ITEM_REQUIRED_CLASS = "dx-field-item-required";
exports.FIELD_ITEM_CONTENT_WRAPPER_CLASS = "dx-field-item-content-wrapper";
exports.FIELD_ITEM_CONTENT_LOCATION_CLASS = "dx-field-item-content-location-";
exports.FIELD_ITEM_LABEL_ALIGN_CLASS = "dx-field-item-label-align";
exports.FIELD_ITEM_HELP_TEXT_CLASS = "dx-field-item-help-text";
exports.LABEL_VERTICAL_ALIGNMENT_CLASS = "dx-label-v-align";
exports.LABEL_HORIZONTAL_ALIGNMENT_CLASS = "dx-label-h-align";
exports.TOGGLE_CONTROLS_PADDING_CLASS = "dx-toggle-controls-paddings";
function g(e) {
  var t = e.children().first();
  if (t.hasClass("dx-template-wrapper")) {
    return t.children().first();
  } else {
    return t;
  }
}
function m(e) {
  if (e && (0, u.isMaterial)()) {
    var t = `.dx-field-item-content-wrapper`;
    function n(e) {
      var n = e.element;
      var o = e.component;
      var a = o.option();
      var r = a.isValid;
      var s = a.validationMessageMode;
      (0, i.default)(n).parents(t).toggleClass("dx-invalid", r === false && (o._isFocused() || s === "always"));
    }
    e.on("optionChanged", function (e) {
      if (e.name === "isValid") {
        n(e);
      }
    });
    e.on("focusIn", n).on("focusOut", n).on("enterKey", n);
  }
}
function _(e, t, n) {
  return {
    dataField: e.dataField,
    editorType: e.editorType,
    editorOptions: t,
    component: n,
    name: e.name
  };
}