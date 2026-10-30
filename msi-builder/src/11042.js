exports.GET_LABEL_WIDTH_BY_TEXT_CLASS = exports.FIELD_ITEM_REQUIRED_MARK_CLASS = exports.FIELD_ITEM_OPTIONAL_MARK_CLASS = exports.FIELD_ITEM_LABEL_TEXT_CLASS = exports.FIELD_ITEM_LABEL_LOCATION_CLASS = undefined;
exports.renderLabel = function (e) {
  var t = e.text;
  var n = e.id;
  var i = e.location;
  var u = e.alignment;
  var d = e.labelID;
  var c = d === undefined ? null : d;
  var h = e.markOptions;
  var f = h === undefined ? {} : h;
  var p = e.labelTemplate;
  var g = e.labelTemplateData;
  var m = e.onLabelTemplateRendered;
  if ((!(0, a.isDefined)(t) || t.length <= 0) && !(0, a.isDefined)(p)) {
    return null;
  }
  var _ = (0, o.default)("<label>").addClass(l.FIELD_ITEM_LABEL_CLASS + " dx-field-item-label-location-" + i).attr("for", n).attr("id", c).css("textAlign", u);
  var v = (0, o.default)("<span>").addClass(l.FIELD_ITEM_LABEL_CONTENT_CLASS);
  var y = (0, o.default)("<span>").addClass("dx-field-item-label-text").text(t);
  if (p) {
    y = (0, o.default)("<div>").addClass("dx-field-item-custom-label-content");
    g.text = t;
    p.render({
      container: (0, r.getPublicElement)(y),
      model: g,
      onRendered: function () {
        if (m != null) {
          m();
        }
      }
    });
  }
  return _.append(v.append(y, function (e) {
    var t = (0, s.getLabelMarkText)(e);
    if (t === "") {
      return null;
    }
    return (0, o.default)("<span>").addClass(e.showRequiredMark ? "dx-field-item-required-mark" : "dx-field-item-optional-mark").text(t);
  }(f)));
};
exports.setLabelWidthByMaxLabelWidth = function (e, t, n) {
  var i;
  var o;
  var a = `${t} > .${l.FIELD_ITEM_LABEL_CLASS}:not(.dx-field-item-label-location-top) > .${l.FIELD_ITEM_LABEL_CONTENT_CLASS}`;
  var r = e.find(a);
  var s = r.length;
  var d = 0;
  for (o = 0; o < s; o++) {
    if ((i = u(r[o])) > d) {
      d = i;
    }
  }
  for (o = 0; o < s; o++) {
    r[o].style.width = d + "px";
  }
};
var i;
var o = (i = require("./68374.js")) && i.__esModule ? i : {
  default: i
};
var a = require("./35922.js");
var r = require("./6415.js");
var s = require("./61961.js");
var l = require("./31093.js");
exports.GET_LABEL_WIDTH_BY_TEXT_CLASS = "dx-layout-manager-hidden-label";
exports.FIELD_ITEM_REQUIRED_MARK_CLASS = "dx-field-item-required-mark";
exports.FIELD_ITEM_LABEL_LOCATION_CLASS = "dx-field-item-label-location-";
exports.FIELD_ITEM_OPTIONAL_MARK_CLASS = "dx-field-item-optional-mark";
function u(e) {
  var t = 0;
  for (var n = e.children.length, i = 0; i < n; i++) {
    t += e.children[i].offsetWidth;
  }
  return t;
}
exports.FIELD_ITEM_LABEL_TEXT_CLASS = "dx-field-item-label-text";