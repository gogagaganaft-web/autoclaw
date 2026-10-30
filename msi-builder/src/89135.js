var i = v(require("./68374.js"));
var o = v(require("./76130.js"));
var a = v(require("./44504.js"));
var r = require("./35922.js");
var s = v(require("./5554.js"));
var l = v(require("./14390.js"));
var u = v(require("./59063.js"));
var d = v(require("./27135.js"));
var c = v(require("./42160.js"));
var h = v(require("./4741.js"));
var f = require("./1129.js");
var p = v(require("./96452.js"));
var g = v(require("./88933.js"));
var m = require("./45994.js");
var _ = v(require("./80209.js"));
function v(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
if (o.default) {
  var y = [];
  s.default.add(function (e, t) {
    (function (e, t) {
      if (p.default.isEditor(t.prototype)) {
        y.push(e);
      }
      o.default.bindingHandlers[e] = {
        init: function (e, n) {
          var s;
          var p;
          var v = (0, i.default)(e);
          var y = (0, a.default)();
          var b = {};
          var x = (0, _.default)().knockout;
          var w = x && x.isBindingPropertyPredicateName;
          var C = {
            onInitializing: function (t) {
              var i = this;
              b = this._getOptionsByReference();
              o.default.computed(function () {
                var e;
                var a = o.default.unwrap(n());
                if (s) {
                  s.beginUpdate();
                }
                p = w && a && a[w];
                T(a);
                if (s) {
                  s.endUpdate();
                } else if (a != null && (e = a.onInitializing) !== null && e !== undefined) {
                  e.call(i, t);
                }
              }, null, {
                disposeWhenNodeIsRemoved: e
              });
              s = this;
            },
            modelByElement: function (e) {
              if (e.length) {
                var t = (0, m.getClosestNodeWithContext)(e.get(0));
                return o.default.dataFor(t);
              }
            },
            nestedComponentOptions: function (e) {
              return {
                modelByElement: e.option("modelByElement"),
                nestedComponentOptions: e.option("nestedComponentOptions")
              };
            },
            _optionChangedCallbacks: y,
            integrationOptions: {
              watchMethod: function (e, t, n) {
                var i = (n = n || {}).skipImmediate;
                var a = o.default.computed(function () {
                  var n = o.default.unwrap(e());
                  if (!i) {
                    t(n);
                  }
                  i = false;
                });
                return function () {
                  a.dispose();
                };
              },
              templates: {
                "dx-polymorph-widget": {
                  render: function (e) {
                    var t = o.default.utils.unwrapObservable(e.model.widget);
                    if (t) {
                      var n = (0, i.default)("<div>").attr("data-bind", t + ": options").get(0);
                      (0, i.default)(e.container).append(n);
                      o.default.applyBindings(e.model, n);
                    }
                  }
                }
              },
              createTemplate: function (e) {
                return new f.KoTemplate(e);
              }
            }
          };
          var S = {};
          function k(e, t, n) {
            var i = v.data("dxKoLocks");
            var a = n ? o.default.unwrap(t) : t;
            if (o.default.isWriteableObservable(t)) {
              S[e] = t;
            }
            if (s) {
              if (i.locked(e)) {
                return;
              }
              i.obtain(e);
              try {
                if (o.default.ignoreDependencies) {
                  o.default.ignoreDependencies(s.option, s, [e, a]);
                } else {
                  s.option(e, a);
                }
              } finally {
                i.release(e);
              }
            } else {
              C[e] = a;
            }
          }
          function D(e) {
            var t = e.fullName;
            var n = e.value;
            if (t in S) {
              var i = this._$element.data("dxKoLocks");
              if (!i.locked(t)) {
                i.obtain(t);
                try {
                  S[t](n);
                } finally {
                  i.release(t);
                }
              }
            }
          }
          function I(t, n, i) {
            var a;
            if (i !== w) {
              if (!p || p(i, n, t)) {
                o.default.computed(function () {
                  var e = t[n];
                  k(i, e, true);
                  a = o.default.unwrap(e);
                }, null, {
                  disposeWhenNodeIsRemoved: e
                });
                if ((0, r.isPlainObject)(a)) {
                  if (!b[i]) {
                    T(a, i);
                  }
                }
              } else {
                k(i, t[n], false);
              }
            }
          }
          function T(e, t) {
            for (var n in e) {
              if (Object.prototype.hasOwnProperty.call(e, n)) {
                I(e, n, t ? [t, n].join(".") : n);
              }
            }
          }
          y.add(D);
          v.data("dxKoCreation", true).data("dxKoLocks", new g.default());
          new t(v, C);
          C = null;
          return {
            controlsDescendantBindings: t.subclassOf(l.default) || t.subclassOf(u.default) || t.subclassOf(d.default) && !(s instanceof h.default) || s instanceof c.default
          };
        }
      };
      if (e === "dxValidator") {
        o.default.bindingHandlers.dxValidator.after = y;
      }
    })(e, t);
  });
}