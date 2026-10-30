exports.TemplateManager = undefined;
var i;
var o = (i = require("./68374.js")) && i.__esModule ? i : {
  default: i
};
var a = require("./35922.js");
var r = require("./20576.js");
var s = require("./13306.js");
var l = require("./68494.js");
var u = require("./10688.js");
var d = require("./69697.js");
function c(e) {
  return (c = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function (e) {
    return typeof e;
  } : function (e) {
    if (e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype) {
      return "symbol";
    } else {
      return typeof e;
    }
  })(e);
}
function h(e, t) {
  for (var n = 0; n < t.length; n++) {
    var i = t[n];
    i.enumerable = i.enumerable || false;
    i.configurable = true;
    if ("value" in i) {
      i.writable = true;
    }
    Object.defineProperty(e, (o = i.key, a = undefined, a = function (e, t) {
      if (c(e) !== "object" || e === null) {
        return e;
      }
      var n = e[Symbol.toPrimitive];
      if (n !== undefined) {
        var i = n.call(e, t || "default");
        if (c(i) !== "object") {
          return i;
        }
        throw new TypeError("@@toPrimitive must return a primitive value.");
      }
      return (t === "string" ? String : Number)(e);
    }(o, "string"), c(a) === "symbol" ? a : String(a)), i);
  }
  var o;
  var a;
}
var f = new l.FunctionTemplate(function (e) {
  var t = e.model;
  var n = e.parent;
  var i = t.widget;
  if (!i) {
    return (0, o.default)();
  }
  var a = (0, o.default)("<div>");
  var r = t.options || {};
  if (n) {
    n._createComponent(a, i, r);
  } else {
    a[i](r);
  }
  return a;
});
var p = function () {
  function e(e, t) {
    this._tempTemplates = [];
    this._defaultTemplates = {};
    this._anonymousTemplateName = t || "template";
    this._createElement = e || d.defaultCreateElement;
    this._createTemplateIfNeeded = this._createTemplateIfNeeded.bind(this);
  }
  e.createDefaultOptions = function () {
    return {
      integrationOptions: {
        watchMethod: function (e, t, n = {}) {
          if (!n.skipImmediate) {
            t(e());
          }
          return r.noop;
        },
        templates: {
          "dx-polymorph-widget": f
        },
        useDeferUpdateForTemplates: true
      }
    };
  };
  var t;
  var n;
  var i;
  var c = e.prototype;
  c.addDefaultTemplates = function (e) {
    this._defaultTemplates = (0, s.extend)({}, this._defaultTemplates, e);
  };
  c.dispose = function () {
    this._tempTemplates.forEach(function (e) {
      if (e.template.dispose) {
        e.template.dispose();
      }
    });
    this._tempTemplates = [];
  };
  c.extractTemplates = function (e) {
    return {
      templates: this._extractTemplates(e),
      anonymousTemplateMeta: this._extractAnonymousTemplate(e)
    };
  };
  c._extractTemplates = function (e) {
    var t = this;
    var n = (0, d.findTemplates)(e, "dxTemplate");
    var i = (0, d.suitableTemplatesByName)(n);
    n.forEach(function (e) {
      var t = e.element;
      var n = e.options.name;
      if (t === i[n]) {
        (0, o.default)(t).addClass("dx-template-wrapper").detach();
      } else {
        (0, o.default)(t).remove();
      }
    });
    return Object.keys(i).map(function (e) {
      return {
        name: e,
        template: t._createTemplate(i[e])
      };
    });
  };
  c._extractAnonymousTemplate = function (e) {
    var t = e.contents().detach();
    if (t.filter(function (e, t) {
      var n = t.nodeType === 3;
      var i = (0, o.default)(t).text().trim().length < 1;
      return !n || !i;
    }).length > 0) {
      return {
        template: this._createTemplate(t),
        name: this._anonymousTemplateName
      };
    } else {
      return {};
    }
  };
  c._createTemplateIfNeeded = function (e) {
    var t = this._tempTemplates.filter(function (t) {
      return t.source === (0, d.templateKey)(e);
    })[0];
    if (t) {
      return t.template;
    }
    var n = this._createTemplate(e);
    this._tempTemplates.push({
      template: n,
      source: (0, d.templateKey)(e)
    });
    return n;
  };
  c._createTemplate = function (e) {
    return this._createElement((0, d.validateTemplateSource)(e));
  };
  c.getTemplate = function (e, t, n, i) {
    var r = this;
    var s = n.isAsyncTemplate;
    var c = n.skipTemplates;
    if ((0, a.isFunction)(e)) {
      return new l.FunctionTemplate(function (n) {
        var h = e.apply(i, (0, d.getNormalizedTemplateArgs)(n));
        if (!(0, a.isDefined)(h)) {
          return new u.EmptyTemplate();
        }
        var f = false;
        var p = (0, d.acquireTemplate)(h, function (e) {
          if (e.nodeType || (0, a.isRenderer)(e) && !(0, o.default)(e).is("script")) {
            return new l.FunctionTemplate(function () {
              return e;
            });
          } else {
            f = true;
            return r._createTemplate(e);
          }
        }, t, s, c, r._defaultTemplates);
        var g = p.render(n);
        if (f && p.dispose) {
          p.dispose();
        }
        return g;
      });
    } else {
      return (0, d.acquireTemplate)(e, this._createTemplateIfNeeded, t, s, c, this._defaultTemplates);
    }
  };
  t = e;
  if (n = [{
    key: "anonymousTemplateName",
    get: function () {
      return this._anonymousTemplateName;
    }
  }]) {
    h(t.prototype, n);
  }
  if (i) {
    h(t, i);
  }
  Object.defineProperty(t, "prototype", {
    writable: false
  });
  return e;
}();
exports.TemplateManager = p;