exports.KoTemplate = undefined;
var i = d(require("./68374.js"));
var o = d(require("./73349.js"));
var a = d(require("./76130.js"));
var r = require("./35922.js");
var s = require("./81033.js");
var l = require("./3532.js");
var u = require("./45994.js");
function d(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
function c(e, t) {
  return (c = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (e, t) {
    e.__proto__ = t;
    return e;
  })(e, t);
}
var h = function (e) {
  var t;
  var n;
  function s(t) {
    var n;
    (n = e.call(this) || this)._element = t;
    n._template = (0, i.default)("<div>").append((0, l.normalizeTemplateElement)(t));
    n._registerKoTemplate();
    return n;
  }
  n = e;
  (t = s).prototype = Object.create(n.prototype);
  t.prototype.constructor = t;
  c(t, n);
  var d = s.prototype;
  d._registerKoTemplate = function () {
    var e = this._template.get(0);
    new a.default.templateSources.anonymousTemplate(e).nodes(e);
  };
  d._prepareDataForContainer = function (e, t) {
    if (t && t.length) {
      var n = (0, u.getClosestNodeWithContext)(t.get(0));
      var i = a.default.contextFor(n);
      e = e !== undefined ? e : a.default.dataFor(n) || {};
      if (i) {
        if (e === i.$data) {
          return i;
        } else {
          return i.createChildContext(e);
        }
      }
    }
    return function (e) {
      var t = o.default.createElement("div");
      a.default.applyBindingsToNode(t, null, e);
      var n = a.default.contextFor(t);
      a.default.cleanNode(t);
      return n;
    }(e).createChildContext(e);
  };
  d._renderCore = function (e) {
    var t = this._prepareDataForContainer(e.model, (0, i.default)(e.container));
    if ((0, r.isDefined)(e.index)) {
      t.$index = e.index;
    }
    var n;
    var o = (0, i.default)("<div>").appendTo(e.container);
    a.default.renderTemplate(this._template.get(0), t, {
      afterRender: function (e) {
        n = (0, i.default)(e);
      }
    }, o.get(0), "replaceNode");
    return n;
  };
  d.source = function () {
    return (0, i.default)(this._element).clone();
  };
  d.dispose = function () {
    this._template.remove();
  };
  return s;
}(s.TemplateBase);
exports.KoTemplate = h;