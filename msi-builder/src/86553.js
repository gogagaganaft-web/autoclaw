exports.getOverflowIndicatorStyles = exports.getOverflowIndicatorColor = exports.getIndicatorColor = undefined;
var i = require("./97205.js");
var o = require("./43450.js");
exports.getOverflowIndicatorStyles = function (e) {
  var t = e.geometry;
  var n = t.height;
  var o = t.left;
  var a = t.top;
  var r = t.width;
  return (0, i.addToStyles)([{
    attr: "left",
    value: `${o}px`
  }, {
    attr: "top",
    value: `${a}px`
  }, {
    attr: "width",
    value: `${r}px`
  }, {
    attr: "height",
    value: `${n}px`
  }, {
    attr: "boxShadow",
    value: `inset ${r}px 0 0 0 rgba(0, 0, 0, 0.3)`
  }]);
};
exports.getOverflowIndicatorColor = function (e, t) {
  if (t.length && t.filter(function (t) {
    return t !== e;
  }).length !== 0) {
    return undefined;
  } else {
    return e;
  }
};
exports.getIndicatorColor = function (e, t, n) {
  var a = t.groupIndex ?? 0;
  var r = t.items.settings[0].appointment;
  return (0, o.getAppointmentColor)({
    resources: e.resources,
    resourceLoaderMap: e.resourceLoaderMap,
    resourcesDataAccessors: e.dataAccessors.resources,
    loadedResources: e.loadedResources
  }, {
    itemData: r,
    groupIndex: a,
    groups: n
  });
};