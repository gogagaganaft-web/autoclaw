exports.getConfig = function (e, t) {
  return {
    name: "between",
    caption: e,
    icon: "range",
    valueSeparator: "–",
    dataTypes: ["number", "date", "datetime"],
    editorTemplate: r.bind(t),
    notForLookup: true
  };
};
var i;
var o = (i = require("./68374.js")) && i.__esModule ? i : {
  default: i
};
var a = require("./13306.js");
function r(e, t) {
  var n = (0, o.default)("<div>").addClass("dx-filterbuilder-range-start");
  var i = (0, o.default)("<div>").addClass("dx-filterbuilder-range-end");
  var r = e.value || [];
  function s(e) {
    if (e && e.length > 0) {
      return e[0];
    } else {
      return null;
    }
  }
  function l(e) {
    if (e && e.length === 2) {
      return e[1];
    } else {
      return null;
    }
  }
  t.append(n);
  t.append((0, o.default)("<span>").addClass("dx-filterbuilder-range-separator").text("–"));
  t.append(i);
  t.addClass("dx-filterbuilder-range");
  this._editorFactory.createEditor.call(this, n, (0, a.extend)({}, e.field, e, {
    value: s(r),
    parentType: "filterBuilder",
    setValue: function (t) {
      r = [t, l(r)];
      e.setValue(r);
    }
  }));
  this._editorFactory.createEditor.call(this, i, (0, a.extend)({}, e.field, e, {
    value: l(r),
    parentType: "filterBuilder",
    setValue: function (t) {
      r = [s(r), t];
      e.setValue(r);
    }
  }));
}