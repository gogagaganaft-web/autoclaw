exports.validateTemplateSource = exports.templateKey = exports.suitableTemplatesByName = exports.getNormalizedTemplateArgs = exports.findTemplates = exports.defaultCreateElement = exports.addOneRenderedCall = exports.acquireTemplate = exports.acquireIntegrationTemplate = undefined;
var i = m(require("./80209.js"));
var o = m(require("./20530.js"));
var a = m(require("./17381.js"));
var r = m(require("./68374.js"));
var s = require("./91627.js");
var l = require("./10688.js");
var u = require("./9545.js");
var d = require("./81033.js");
var c = require("./89386.js");
var h = require("./20576.js");
var f = require("./3532.js");
var p = require("./13306.js");
var g = require("./35922.js");
function m(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
exports.findTemplates = function (e, t) {
  var n = (0, r.default)(e).contents().filter(`[data-options*="${t}"]`);
  return [].slice.call(n).map(function (e) {
    var n = (0, r.default)(e).attr("data-options") || "";
    return {
      element: e,
      options: (0, i.default)().optionsParser(n)[t]
    };
  }).filter(function (e) {
    return !!e.options;
  });
};
exports.suitableTemplatesByName = function (e) {
  var t = (0, c.groupBy)(e, function (e) {
    return e.options.name;
  });
  if (t[undefined]) {
    throw a.default.Error("E0023");
  }
  var n = {};
  Object.keys(t).forEach(function (e) {
    var a = (0, h.findBestMatches)(o.default.current(), t[e], function (e) {
      return e.options;
    })[0]?.element;
    if (a) {
      n[e] = a;
    }
  });
  return n;
};
function _(e) {
  var t = e.render.bind(e);
  return (0, p.extend)({}, e, {
    render: function (e) {
      var n = t(e);
      if (e && e.onRendered) {
        e.onRendered();
      }
      return n;
    }
  });
}
exports.addOneRenderedCall = _;
exports.getNormalizedTemplateArgs = function (e) {
  var t = [];
  if ("model" in e) {
    t.push(e.model);
  }
  if ("index" in e) {
    t.push(e.index);
  }
  t.push(e.container);
  return t;
};
exports.validateTemplateSource = function (e) {
  if (typeof e == "string") {
    return (0, f.normalizeTemplateElement)(e);
  } else {
    return e;
  }
};
exports.templateKey = function (e) {
  return (0, g.isRenderer)(e) && e[0] || e;
};
exports.defaultCreateElement = function (e) {
  return new u.Template(e);
};
function v(e, t, n, i) {
  var o = null;
  if ((!i || i.indexOf(e) === -1) && !!(o = t[e]) && !(o instanceof d.TemplateBase) && !n) {
    o = _(o);
  }
  return o;
}
exports.acquireIntegrationTemplate = v;
exports.acquireTemplate = function (e, t, n, i, o, a) {
  if (e == null) {
    return new l.EmptyTemplate();
  } else if (e instanceof s.ChildDefaultTemplate) {
    return a[e.name];
  } else if (e instanceof d.TemplateBase) {
    return e;
  } else if ((0, g.isFunction)(e.render) && !(0, g.isRenderer)(e)) {
    if (i) {
      return e;
    } else {
      return _(e);
    }
  } else if (e.nodeType || (0, g.isRenderer)(e)) {
    return t((0, r.default)(e));
  } else {
    return v(e, n, i, o) || a[e] || t(e);
  }
};