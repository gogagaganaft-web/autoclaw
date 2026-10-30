exports.TemplateWrapper = undefined;
exports.buildTemplateArgs = function (e, t) {
  var i = {
    template: t,
    model: _({}, e)
  };
  var o = e.data ?? {};
  var a = o.isEqual;
  var r = function (e, t) {
    if (e == null) {
      return {};
    }
    var n;
    var i;
    var o = function (e, t) {
      if (e == null) {
        return {};
      }
      var n;
      var i;
      var o = {};
      var a = Object.keys(e);
      for (i = 0; i < a.length; i++) {
        n = a[i];
        if (!(t.indexOf(n) >= 0)) {
          o[n] = e[n];
        }
      }
      return o;
    }(e, t);
    if (Object.getOwnPropertySymbols) {
      var a = Object.getOwnPropertySymbols(e);
      for (i = 0; i < a.length; i++) {
        n = a[i];
        if (!(t.indexOf(n) >= 0)) {
          if (Object.prototype.propertyIsEnumerable.call(e, n)) {
            o[n] = e[n];
          }
        }
      }
    }
    return o;
  }(o, h);
  if (a) {
    i.model.data = r;
    i.isEqual = a;
  }
  return i;
};
var i = require("./44105.js");
var o = require("./55285.js");
var a = require("./33502.js");
var r = f(require("./68374.js"));
var s = f(require("./73349.js"));
var l = require("./6415.js");
var u = require("./35922.js");
var d = require("./20576.js");
var c = require("./48384.js");
var h = ["isEqual"];
function f(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
function p(e) {
  return function (e) {
    if (Array.isArray(e)) {
      return g(e);
    }
  }(e) || function (e) {
    if (typeof Symbol != "undefined" && e[Symbol.iterator] != null || e["@@iterator"] != null) {
      return Array.from(e);
    }
  }(e) || function (e, t) {
    if (!e) {
      return;
    }
    if (typeof e == "string") {
      return g(e, t);
    }
    var n = Object.prototype.toString.call(e).slice(8, -1);
    if (n === "Object" && e.constructor) {
      n = e.constructor.name;
    }
    if (n === "Map" || n === "Set") {
      return Array.from(e);
    }
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) {
      return g(e, t);
    }
  }(e) || function () {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }();
}
function g(e, t) {
  if (t == null || t > e.length) {
    t = e.length;
  }
  for (var n = 0, i = new Array(t); n < t; n++) {
    i[n] = e[n];
  }
  return i;
}
function m(e, t) {
  return (m = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (e, t) {
    e.__proto__ = t;
    return e;
  })(e, t);
}
function _() {
  return (_ = Object.assign ? Object.assign.bind() : function (e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var i in n) {
        if (Object.prototype.hasOwnProperty.call(n, i)) {
          e[i] = n[i];
        }
      }
    }
    return e;
  }).apply(this, arguments);
}
var v = function (e) {
  var t;
  var n;
  function h(t) {
    var n;
    (n = e.call(this, t) || this).cleanParent = d.noop;
    n.renderTemplate = n.renderTemplate.bind(function (e) {
      if (e === undefined) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      }
      return e;
    }(n));
    return n;
  }
  n = e;
  (t = h).prototype = Object.create(n.prototype);
  t.prototype.constructor = t;
  m(t, n);
  var f = h.prototype;
  f.renderTemplate = function () {
    var e = this;
    var t = (0, o.findDOMfromVNode)(this.$LI, true);
    var n = t.parentElement;
    this.cleanParent();
    this.cleanParent = (0, c.recordMutations)(n, function () {
      var i = function (e, t) {
        var i = e.model ?? {
          data: {}
        };
        var o = i.data;
        var a = i.index;
        if (o) {
          Object.keys(o).forEach(function (e) {
            if (o[e] && s.default.isNode(o[e])) {
              o[e] = (0, l.getPublicElement)((0, r.default)(o[e]));
            }
          });
        }
        var u = e.template.render(_({
          container: t,
          transclude: e.transclude
        }, {
          renovated: e.renovated
        }, e.transclude ? {} : {
          model: o
        }, !e.transclude && Number.isFinite(a) ? {
          index: a
        } : {}));
        if (u === undefined) {
          return [];
        } else if (u.toArray) {
          return u.toArray();
        } else {
          return [(0, r.default)(u).get(0)];
        }
      }(e.props, (0, l.getPublicElement)((0, r.default)(n)));
      if (i.length !== 0 && (i.length !== 1 || i[0] !== n)) {
        t.after.apply(t, p(i));
      }
    });
  };
  f.shouldComponentUpdate = function (e) {
    var t = this.props;
    var n = t.model;
    var i = t.template;
    var o = e.isEqual;
    var r = e.model;
    var s = e.template;
    var l = o ?? a.shallowEquals;
    if (i !== s) {
      return true;
    }
    if (!(0, u.isDefined)(n) || !(0, u.isDefined)(r)) {
      return n !== r;
    }
    var d = n.data;
    var c = n.index;
    var h = r.data;
    return c !== r.index || !l(d, h);
  };
  f.createEffects = function () {
    return [new i.InfernoEffect(this.renderTemplate, [this.props.template, this.props.model])];
  };
  f.updateEffects = function () {
    this._effects[0].update([this.props.template, this.props.model]);
  };
  f.componentWillUnmount = function () {
    this.cleanParent();
  };
  f.render = function () {
    return null;
  };
  return h;
}(i.InfernoComponent);
exports.TemplateWrapper = v;