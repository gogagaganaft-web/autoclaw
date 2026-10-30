exports.BindableTemplate = undefined;
var i = l(require("./68374.js"));
var o = require("./81033.js");
var a = l(require("./55994.js"));
var r = require("./29007.js");
var s = require("./35922.js");
function l(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
function u(e, t) {
  return (u = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (e, t) {
    e.__proto__ = t;
    return e;
  })(e, t);
}
function d(e, t, n, i, o) {
  var a;
  var r = function (e, t, n) {
    return t(function () {
      return e;
    }, n);
  }(e, t, function (e) {
    if (a) {
      a();
    }
    if ((0, s.isPrimitive)(e)) {
      o(e);
    } else {
      a = function (e, t, n, i, o) {
        var a = {};
        var r = n.slice();
        var s = n.map(function (n) {
          var s = i[n];
          return t(s ? function () {
            return s(e);
          } : function () {
            return e[n];
          }, function (e) {
            a[n] = e;
            if (r.length) {
              var t = r.indexOf(n);
              if (t >= 0) {
                r.splice(t, 1);
              }
            }
            if (!r.length) {
              o(a);
            }
          });
        });
        return function () {
          s.forEach(function (e) {
            return e();
          });
        };
      }(e, t, n, i, o);
    }
  });
  return function () {
    if (a) {
      a();
    }
    if (r) {
      r();
    }
  };
}
var c = function (e) {
  var t;
  var n;
  function o(t, n, i, o) {
    var a;
    (a = e.call(this) || this)._render = t;
    a._fields = n;
    a._fieldsMap = o || {};
    a._watchMethod = i;
    return a;
  }
  n = e;
  (t = o).prototype = Object.create(n.prototype);
  t.prototype.constructor = t;
  u(t, n);
  o.prototype._renderCore = function (e) {
    var t = this;
    var n = (0, i.default)(e.container);
    var o = d(e.model, this._watchMethod, this._fields, this._fieldsMap, function (i) {
      n.empty();
      t._render(n, i, e.model);
    });
    a.default.on(n, r.removeEvent, o);
    return n.contents();
  };
  return o;
}(o.TemplateBase);
exports.BindableTemplate = c;