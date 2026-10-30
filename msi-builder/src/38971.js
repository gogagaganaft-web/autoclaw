var i = x(require("./68374.js"));
var o = x(require("./62387.js"));
var a = x(require("./55994.js"));
var r = x(require("./80209.js"));
var s = x(require("./5554.js"));
var l = x(require("./38377.js"));
var u = x(require("./44504.js"));
var d = require("./35922.js");
var c = require("./95479.js");
var h = x(require("./88933.js"));
var f = x(require("./96452.js"));
var p = require("./76165.js");
var g = x(require("./69155.js"));
var m = x(require("./11050.js"));
var _ = require("./47617.js");
var v = require("./13306.js");
var y = require("./49036.js");
var b = require("./78008.js");
function x(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
function w(e) {
  return (w = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function (e) {
    return typeof e;
  } : function (e) {
    if (e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype) {
      return "symbol";
    } else {
      return typeof e;
    }
  })(e);
}
if (o.default) {
  function C(e, t) {
    if (t.$root.$$phase) {
      return e(t);
    } else {
      return t.$apply(function () {
        return e(t);
      });
    }
  }
  var S = l.default.inherit({
    ctor: function (e) {
      this._componentDisposing = (0, u.default)();
      this._optionChangedCallbacks = (0, u.default)();
      this._ngLocker = new h.default();
      this._scope = e.scope;
      this._$element = e.$element;
      this._$templates = e.$templates;
      this._componentClass = e.componentClass;
      this._parse = e.parse;
      this._compile = e.compile;
      this._itemAlias = e.itemAlias;
      this._transcludeFn = e.transcludeFn;
      this._digestCallbacks = e.dxDigestCallbacks;
      this._normalizeOptions(e.ngOptions);
      this._initComponentBindings();
      this._initComponent(this._scope);
      if (!e.ngOptions) {
        this._addOptionsStringWatcher(e.ngOptionsString);
      }
    },
    _addOptionsStringWatcher: function (e) {
      var t = this;
      var n = this._scope.$watch(e, function (e) {
        if (e) {
          n();
          t._normalizeOptions(e);
          t._initComponentBindings();
          t._component.option(t._evalOptions(t._scope));
        }
      });
      this._componentDisposing.add(n);
    },
    _normalizeOptions: function (e) {
      var t = this;
      this._ngOptions = (0, v.extendFromObject)({}, e);
      if (e) {
        if (!Object.prototype.hasOwnProperty.call(e, "bindingOptions") && e.bindingOptions) {
          this._ngOptions.bindingOptions = e.bindingOptions;
        }
        if (e.bindingOptions) {
          (0, c.each)(e.bindingOptions, function (e, n) {
            if ((0, d.type)(n) === "string") {
              t._ngOptions.bindingOptions[e] = {
                dataPath: n
              };
            }
          });
        }
      }
    },
    _initComponent: function (e) {
      this._component = new this._componentClass(this._$element, this._evalOptions(e));
      this._component._isHidden = true;
      this._handleDigestPhase();
    },
    _handleDigestPhase: function () {
      var e = this;
      function t() {
        e._component.beginUpdate();
      }
      function n() {
        e._component.endUpdate();
      }
      this._digestCallbacks.begin.add(t);
      this._digestCallbacks.end.add(n);
      this._componentDisposing.add(function () {
        e._digestCallbacks.begin.remove(t);
        e._digestCallbacks.end.remove(n);
      });
    },
    _initComponentBindings: function () {
      var e = this;
      var t = {};
      if (this._ngOptions.bindingOptions) {
        (0, c.each)(this._ngOptions.bindingOptions, function (n, i) {
          var o;
          var a;
          var r = n.search(/\[|\./);
          var s = r > -1 ? n.substring(0, r) : n;
          var l = i.dataPath;
          var u = true;
          var d = false;
          if (i.deep !== undefined) {
            d = u = !!i.deep;
          }
          t[s] ||= {};
          t[s][n] = l;
          (function t() {
            var i = Array.isArray(e._scope.$eval(l)) && !d ? "$watchCollection" : "$watch";
            if (o !== i) {
              if (a) {
                a();
              }
              a = e._scope[i](l, function (i, o) {
                if (!e._ngLocker.locked(n)) {
                  e._ngLocker.obtain(n);
                  e._component.option(n, i);
                  t();
                  if ((0, y.equals)(o, i) && e._ngLocker.locked(n)) {
                    e._ngLocker.release(n);
                  }
                }
              }, u);
              o = i;
            }
          })();
          e._componentDisposing.add(a);
        });
        this._optionChangedCallbacks.add(function (n) {
          var i = n.name;
          var o = n.fullName;
          var a = n.component;
          if (e._ngLocker.locked(o)) {
            e._ngLocker.release(o);
          } else if (t && t[i]) {
            var r = e._scope.$root.$$phase;
            function s() {
              e._ngLocker.obtain(o);
            }
            if (r) {
              e._digestCallbacks.begin.add(s);
            } else {
              s();
            }
            C(function () {
              (0, c.each)(t[i], function (t, i) {
                if (e._optionsAreLinked(o, t)) {
                  var r = a.option(t);
                  e._parse(i).assign(e._scope, r);
                  var s = e._parse(i)(e._scope);
                  if (s !== r) {
                    n.component.option(t, s);
                  }
                }
              });
            }, e._scope);
            var l = function t() {
              if (e._ngLocker.locked(o)) {
                e._ngLocker.release(o);
              }
              e._digestCallbacks.begin.remove(s);
              e._digestCallbacks.end.remove(t);
            };
            if (r) {
              e._digestCallbacks.end.addPrioritized(l);
            } else {
              l();
            }
          }
        });
      }
    },
    _optionsAreNested: function (e, t) {
      var n = e[t.length];
      return e.indexOf(t) === 0 && (n === "." || n === "[");
    },
    _optionsAreLinked: function (e, t) {
      return e === t || (e.length > t.length ? this._optionsAreNested(e, t) : this._optionsAreNested(t, e));
    },
    _compilerByTemplate: function (e) {
      var t = this;
      var n = this._getScopeItemsPath();
      return function (o) {
        var r = (0, i.default)(e).clone();
        var s = o.model && o.model.constructor === t._scope.$root.constructor ? o.model : o.noModel ? t._scope : t._createScopeWithData(o);
        if (n) {
          t._synchronizeScopes(s, n, o.index);
        }
        r.appendTo(o.container);
        if (!o.noModel) {
          a.default.on(r, "$destroy", function () {
            if (s.$parent) {
              s.$destroy();
            }
          });
        }
        var l = t._compile(r, t._transcludeFn);
        t._applyAsync(function (e) {
          l(e, null, {
            parentBoundTranscludeFn: t._transcludeFn
          });
        }, s);
        return r;
      };
    },
    _applyAsync: function (e, t) {
      var n = this;
      e(t);
      if (!t.$root.$$phase && !this._renderingTimer) {
        function i() {
          clearTimeout(n._renderingTimer);
        }
        this._renderingTimer = setTimeout(function () {
          t.$apply();
          n._renderingTimer = null;
          n._componentDisposing.remove(i);
        });
        this._componentDisposing.add(i);
      }
    },
    _getScopeItemsPath: function () {
      if (this._componentClass.subclassOf(m.default) && this._ngOptions.bindingOptions && this._ngOptions.bindingOptions.items) {
        return this._ngOptions.bindingOptions.items.dataPath;
      }
    },
    _createScopeWithData: function (e) {
      var t = this._scope.$new();
      if (this._itemAlias) {
        t[this._itemAlias] = e.model;
      }
      if ((0, d.isDefined)(e.index)) {
        t.$index = e.index;
      }
      return t;
    },
    _synchronizeScopes: function (e, t, n) {
      if (this._itemAlias && w(e[this._itemAlias]) !== "object") {
        this._synchronizeScopeField({
          parentScope: this._scope,
          childScope: e,
          fieldPath: this._itemAlias,
          parentPrefix: t,
          itemIndex: n
        });
      }
    },
    _synchronizeScopeField: function (e) {
      var t = e.parentScope;
      var n = e.childScope;
      var i = e.fieldPath;
      var o = e.parentPrefix;
      var a = e.itemIndex;
      var r = i === this._itemAlias ? "" : "." + i;
      var s = a !== undefined;
      var l = [o];
      if (s) {
        if (!(0, d.isNumeric)(a)) {
          return;
        }
        l.push("[", a, "]");
      }
      l.push(r);
      var u = l.join("");
      var c = t.$watch(u, function (e, t) {
        if (e !== t) {
          (0, _.compileSetter)(i)(n, e);
        }
      });
      var h = n.$watch(i, function (e, n) {
        if (e !== n) {
          if (s && !(0, _.compileGetter)(o)(t)[a]) {
            h();
            return;
          }
          (0, _.compileSetter)(u)(t, e);
        }
      });
      this._componentDisposing.add([c, h]);
    },
    _evalOptions: function (e) {
      var t = this;
      var n = (0, v.extendFromObject)({}, this._ngOptions);
      delete n.bindingOptions;
      if (this._ngOptions.bindingOptions) {
        (0, c.each)(this._ngOptions.bindingOptions, function (t, i) {
          n[t] = e.$eval(i.dataPath);
        });
      }
      n._optionChangedCallbacks = this._optionChangedCallbacks;
      n._disposingCallbacks = this._componentDisposing;
      n.onActionCreated = function (t, n, i) {
        if (i && i.category === "rendering") {
          return n;
        }
        return function () {
          var t = this;
          var i = arguments;
          if (e && e.$root && !e.$root.$$phase) {
            return C(function () {
              return n.apply(t, i);
            }, e);
          } else {
            return n.apply(this, i);
          }
        };
      };
      n.beforeActionExecute = n.onActionCreated;
      n.nestedComponentOptions = function (e) {
        return {
          templatesRenderAsynchronously: e.option("templatesRenderAsynchronously"),
          forceApplyBindings: e.option("forceApplyBindings"),
          modelByElement: e.option("modelByElement"),
          onActionCreated: e.option("onActionCreated"),
          beforeActionExecute: e.option("beforeActionExecute"),
          nestedComponentOptions: e.option("nestedComponentOptions")
        };
      };
      n.templatesRenderAsynchronously = true;
      if ((0, r.default)().wrapActionsBeforeExecute) {
        n.forceApplyBindings = function () {
          C(function () {}, e);
        };
      }
      n.integrationOptions = {
        createTemplate: function (e) {
          return new p.NgTemplate(e, t._compilerByTemplate.bind(t));
        },
        watchMethod: function (n, i, o) {
          var a;
          var s = (o = o || {}).skipImmediate;
          var l = e.$watch(function () {
            var e = n();
            if (e instanceof Date) {
              e = e.valueOf();
            }
            return e;
          }, function (e) {
            var t = a === e;
            if (!s && (!t || t && o.deep)) {
              i(e);
            }
            s = false;
          }, o.deep);
          if (!s) {
            a = n();
            i(a);
          }
          if ((0, r.default)().wrapActionsBeforeExecute) {
            t._applyAsync(function () {}, e);
          }
          return l;
        },
        templates: {
          "dx-polymorph-widget": {
            render: function (e) {
              var n = e.model.widget;
              if (n) {
                var o = (0, i.default)("<div>").attr((0, b.dasherize)(n), "options").get(0);
                var a = t._scope.$new();
                a.options = e.model.options;
                e.container.append(o);
                t._compile(o)(a);
              }
            }
          }
        }
      };
      n.modelByElement = function () {
        return e;
      };
      return n;
    }
  });
  S = S.inherit({
    ctor: function (e) {
      this._componentName = e.componentName;
      this._ngModel = e.ngModel;
      this._ngModelController = e.ngModelController;
      this.callBase.apply(this, arguments);
    },
    _isNgModelRequired: function () {
      return f.default.isEditor(this._componentClass.prototype) && this._ngModel;
    },
    _initComponentBindings: function () {
      this.callBase.apply(this, arguments);
      this._initNgModelBinding();
    },
    _initNgModelBinding: function () {
      var e = this;
      if (this._isNgModelRequired()) {
        var t = this._scope.$watch(this._ngModel, function (t, n) {
          if (!e._ngLocker.locked("value")) {
            if (t !== n) {
              e._component.option("value", t);
            }
          }
        });
        this._optionChangedCallbacks.add(function (t) {
          e._ngLocker.obtain("value");
          try {
            if (t.name !== "value") {
              return;
            }
            e._ngModelController.$setViewValue(t.value);
          } finally {
            if (e._ngLocker.locked("value")) {
              e._ngLocker.release("value");
            }
          }
        });
        this._componentDisposing.add(t);
      }
    },
    _evalOptions: function () {
      if (!this._isNgModelRequired()) {
        return this.callBase.apply(this, arguments);
      }
      var e = this.callBase.apply(this, arguments);
      e.value = this._parse(this._ngModel)(this._scope);
      return e;
    }
  });
  var k = {};
  function D(e) {
    var t = e !== "dxValidator" ? 1 : 10;
    g.default.directive(e, ["$compile", "$parse", "dxDigestCallbacks", function (n, i, o) {
      return {
        restrict: "A",
        require: "^?ngModel",
        priority: t,
        compile: function (t) {
          var a = k[e];
          var r = (a.prototype._useTemplates ? a.prototype._useTemplates() : function e(t, n) {
            if (!Object.prototype.hasOwnProperty.bind(t)("parent") && t.parent) {
              var i = Object.getPrototypeOf(t);
              if (i.prototype[n]) {
                return function () {
                  return i.prototype[n]();
                };
              } else {
                return e(i, n);
              }
            }
            var o = t.parent.prototype[n];
            if (o) {
              return function () {
                return o();
              };
            } else if (o && t.parent.subclassOf) {
              return e(t.parent, n);
            } else {
              return function () {};
            }
          }(a, "_useTemplates")()) ? t.contents().detach() : null;
          return function (t, s, l, u, d) {
            s.append(r);
            C(function () {
              new S({
                componentClass: a,
                componentName: e,
                compile: n,
                parse: i,
                $element: s,
                scope: t,
                ngOptionsString: l[e],
                ngOptions: l[e] ? t.$eval(l[e]) : {},
                ngModel: l.ngModel,
                ngModelController: u,
                transcludeFn: d,
                itemAlias: l.dxItemAlias,
                dxDigestCallbacks: o
              });
            }, t);
          };
        }
      };
    }]);
  }
  s.default.add(function (e, t) {
    if (!k[e]) {
      D(e);
    }
    k[e] = t;
  });
}