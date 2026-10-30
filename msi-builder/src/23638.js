exports.GanttTemplatesManager = undefined;
var i;
var o = (i = require("./68374.js")) && i.__esModule ? i : {
  default: i
};
var a = require("./6415.js");
var r = function () {
  function e(e) {
    this._gantt = e;
  }
  var t = e.prototype;
  t.getTaskTooltipContentTemplateFunc = function (e) {
    var t = this;
    var n = e && this._gantt._getTemplate(e);
    return n && function (e, i, r) {
      n.render({
        model: t._gantt.getTaskDataByCoreData(i),
        container: (0, a.getPublicElement)((0, o.default)(e)),
        onRendered: function () {
          r();
        }
      });
      return true;
    };
  };
  t.getTaskProgressTooltipContentTemplateFunc = function (e) {
    var t = e && this._gantt._getTemplate(e);
    return t && function (e, n, i) {
      t.render({
        model: n,
        container: (0, a.getPublicElement)((0, o.default)(e)),
        onRendered: function () {
          i();
        }
      });
      return true;
    };
  };
  t.getTaskTimeTooltipContentTemplateFunc = function (e) {
    var t = e && this._gantt._getTemplate(e);
    return t && function (e, n, i) {
      t.render({
        model: n,
        container: (0, a.getPublicElement)((0, o.default)(e)),
        onRendered: function () {
          i();
        }
      });
      return true;
    };
  };
  t.getTaskContentTemplateFunc = function (e) {
    var t = this;
    var n = e && this._gantt._getTemplate(e);
    return n && function (e, i, r, s) {
      i.taskData = t._gantt.getTaskDataByCoreData(i.taskData);
      n.render({
        model: i,
        container: (0, a.getPublicElement)((0, o.default)(e)),
        onRendered: function () {
          r(e, s);
        }
      });
      return true;
    };
  };
  return e;
}();
exports.GanttTemplatesManager = r;