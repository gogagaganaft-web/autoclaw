Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dragAndDropItemRender = function (e, t) {
  var n = function (e, t) {
    var n = e.hasClass(r.CLASSES.area.box);
    var i = e.attr(r.ATTRIBUTES.treeViewItem);
    if (n) {
      return function (e, t) {
        var n = e.clone();
        if (t === r.SORTABLE_CONST.targets.drag) {
          e.each(function (e, t) {
            var i = parseFloat((0, a.getOuterWidth)(t));
            n.eq(e).css("width", i);
            return true;
          });
        }
        return n;
      }(e, t);
    }
    if (i) {
      return function (e) {
        return e.clone().addClass(r.CLASSES.area.box).css("width", parseFloat((0, a.getOuterWidth)(e)));
      }(e);
    }
    return function (e) {
      return (0, o.default)("<div>").addClass(r.CLASSES.area.field).addClass(r.CLASSES.area.box).text(e.text());
    }(e);
  }(e, t);
  if (t === r.SORTABLE_CONST.targets.drag) {
    return function (e) {
      var t = (0, o.default)("<div>");
      e.each(function (e, n) {
        var i = (0, o.default)("<div>").addClass(r.CLASSES.pivotGrid.fieldsContainer).addClass(r.CLASSES.widget).append((0, o.default)(n));
        t.append(i);
        return true;
      });
      return t.children();
    }(n);
  }
  return n;
};
var i;
var o = (i = require("./68374.js")) && i.__esModule ? i : {
  default: i
};
var a = require("./58664.js");
var r = require("./98591.js");