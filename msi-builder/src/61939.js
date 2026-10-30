exports.toggleItemFocusableElementTabIndex = function (e, t) {
  var n;
  if (!e) {
    return;
  }
  var i = e._findItemElementByItem(t);
  if (!i.length) {
    return;
  }
  var r = e._getItemData(i);
  var s = (n = r.options) !== null && n !== undefined && !!n.disabled || !!r.disabled || !!e.option("disabled");
  var l = r.widget;
  if (l && a.indexOf(l) !== -1) {
    var u = i.find(l.toLowerCase().replace("dx", ".dx-"));
    if (u.length) {
      var d;
      var h = function (e) {
        var t = e.data && e.data();
        var n = t && t.dxComponents;
        var i = n && n[0];
        return i && t[i];
      }(u);
      if (!h) {
        return;
      }
      var p = (d = h._focusTarget) === null || d === undefined ? undefined : d.call(h);
      if (l === "dxDropDownButton") {
        p = p && p.find(`.dx-buttongroup`);
      } else {
        p = p ?? (0, o.default)(h.element());
      }
      var g = r.options?.tabIndex;
      if (s) {
        p.attr("tabIndex", -1);
      } else {
        p.attr("tabIndex", g ?? 0);
      }
    }
  }
};
var i;
var o = (i = require("./68374.js")) && i.__esModule ? i : {
  default: i
};
var a = ["dxAutocomplete", "dxButton", "dxCheckBox", "dxDateBox", "dxMenu", "dxSelectBox", "dxTabs", "dxTextBox", "dxButtonGroup", "dxDropDownButton"];