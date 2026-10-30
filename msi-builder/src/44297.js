exports.Component = undefined;
var i = _(require("./80209.js"));
var o = require("./13306.js");
var a = require("./95683.js");
var r = require("./45434.js");
var s = _(require("./38377.js"));
var l = _(require("./62414.js"));
var u = _(require("./17381.js"));
var d = _(require("./44504.js"));
var c = require("./80566.js");
var h = require("./9321.js");
var f = require("./90889.js");
var p = require("./35922.js");
var g = require("./20576.js");
var m = require("./47617.js");
function _(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
function v(e) {
  return e.charAt(2).toLowerCase() + e.substr(3);
}
var y = s.default.inherit({
  _setDeprecatedOptions: function () {
    this._deprecatedOptions = {};
  },
  _getDeprecatedOptions: function () {
    return this._deprecatedOptions;
  },
  _getDefaultOptions: function () {
    return {
      onInitialized: null,
      onOptionChanged: null,
      onDisposing: null,
      defaultOptionsRules: null
    };
  },
  _defaultOptionsRules: function () {
    return [];
  },
  _setOptionsByDevice: function (e) {
    this._options.applyRules(e);
  },
  _convertRulesToOptions: function (e) {
    return (0, r.convertRulesToOptions)(e);
  },
  _isInitialOptionValue: function (e) {
    return this._options.isInitial(e);
  },
  _setOptionsByReference: function () {
    this._optionsByReference = {};
  },
  _getOptionsByReference: function () {
    return this._optionsByReference;
  },
  ctor: function (e = {}) {
    var t = e._optionChangedCallbacks;
    var n = e._disposingCallbacks;
    this.NAME = (0, h.name)(this.constructor);
    this._eventsStrategy = c.EventsStrategy.create(this, e.eventsStrategy);
    this._updateLockCount = 0;
    this._optionChangedCallbacks = t || (0, d.default)();
    this._disposingCallbacks = n || (0, d.default)();
    this.postponedOperations = new f.PostponedOperations();
    this._createOptions(e);
  },
  _createOptions: function (e) {
    var t = this;
    this.beginUpdate();
    try {
      this._setOptionsByReference();
      this._setDeprecatedOptions();
      this._options = new a.Options(this._getDefaultOptions(), this._getDefaultOptions(), this._getOptionsByReference(), this._getDeprecatedOptions());
      this._options.onChanging(function (e, n, i) {
        return t._initialized && t._optionChanging(e, n, i);
      });
      this._options.onDeprecated(function (e, n) {
        return t._logDeprecatedOptionWarning(e, n);
      });
      this._options.onChanged(function (e, n, i) {
        return t._notifyOptionChanged(e, n, i);
      });
      this._options.onStartChange(function () {
        return t.beginUpdate();
      });
      this._options.onEndChange(function () {
        return t.endUpdate();
      });
      this._options.addRules(this._defaultOptionsRules());
      if (e && e.onInitializing) {
        e.onInitializing.apply(this, [e]);
      }
      this._setOptionsByDevice(e.defaultOptionsRules);
      this._initOptions(e);
    } finally {
      this.endUpdate();
    }
  },
  _initOptions: function (e) {
    this.option(e);
  },
  _init: function () {
    var e = this;
    this._createOptionChangedAction();
    this.on("disposing", function (t) {
      e._disposingCallbacks.fireWith(e, [t]);
    });
  },
  _logDeprecatedOptionWarning: function (e, t) {
    var n = t.message || `Use the '${t.alias}' option instead`;
    u.default.log("W0001", this.NAME, e, t.since, n);
  },
  _logDeprecatedComponentWarning: function (e, t) {
    u.default.log("W0000", this.NAME, e, `Use the '${t}' widget instead`);
  },
  _createOptionChangedAction: function () {
    this._optionChangedAction = this._createActionByOption("onOptionChanged", {
      excludeValidators: ["disabled", "readOnly"]
    });
  },
  _createDisposingAction: function () {
    this._disposingAction = this._createActionByOption("onDisposing", {
      excludeValidators: ["disabled", "readOnly"]
    });
  },
  _optionChanged: function (e) {
    switch (e.name) {
      case "onDisposing":
      case "onInitialized":
        break;
      case "onOptionChanged":
        this._createOptionChangedAction();
    }
  },
  _dispose: function () {
    this._optionChangedCallbacks.empty();
    this._createDisposingAction();
    this._disposingAction();
    this._eventsStrategy.dispose();
    this._options.dispose();
    this._disposed = true;
  },
  _lockUpdate: function () {
    this._updateLockCount++;
  },
  _unlockUpdate: function () {
    this._updateLockCount = Math.max(this._updateLockCount - 1, 0);
  },
  _isUpdateAllowed: function () {
    return this._updateLockCount === 0;
  },
  _isInitializingRequired: function () {
    return !this._initializing && !this._initialized;
  },
  isInitialized: function () {
    return this._initialized;
  },
  _commitUpdate: function () {
    this.postponedOperations.callPostponedOperations();
    if (this._isInitializingRequired()) {
      this._initializeComponent();
    }
  },
  _initializeComponent: function () {
    this._initializing = true;
    try {
      this._init();
    } finally {
      this._initializing = false;
      this._lockUpdate();
      this._createActionByOption("onInitialized", {
        excludeValidators: ["disabled", "readOnly"]
      })();
      this._unlockUpdate();
      this._initialized = true;
    }
  },
  instance: function () {
    return this;
  },
  beginUpdate: function () {
    this._lockUpdate();
  },
  endUpdate: function () {
    this._unlockUpdate();
    if (this._isUpdateAllowed()) {
      this._commitUpdate();
    }
  },
  _optionChanging: g.noop,
  _notifyOptionChanged: function (e, t, n) {
    if (this._initialized) {
      for (var i = [e].concat(this._options.getAliasesByName(e)), a = 0; a < i.length; a++) {
        var r = i[a];
        var s = {
          name: (0, m.getPathParts)(r)[0],
          fullName: r,
          value: t,
          previousValue: n
        };
        if (r.indexOf("_", 0) !== 0) {
          this._optionChangedCallbacks.fireWith(this, [(0, o.extend)(this._defaultActionArgs(), s)]);
          this._optionChangedAction((0, o.extend)({}, s));
        }
        if (!this._disposed && this._cancelOptionChange !== r) {
          this._optionChanged(s);
        }
      }
    }
  },
  initialOption: function (e) {
    return this._options.initial(e);
  },
  _defaultActionConfig: function () {
    return {
      context: this,
      component: this
    };
  },
  _defaultActionArgs: function () {
    return {
      component: this
    };
  },
  _createAction: function (e, t) {
    var n;
    var i = this;
    return function (a) {
      if (!(0, p.isDefined)(a)) {
        a = {};
      }
      if (!(0, p.isPlainObject)(a)) {
        a = {
          actionValue: a
        };
      }
      return (n = n || new l.default(e, (0, o.extend)(t, i._defaultActionConfig()))).execute.call(n, (0, o.extend)(a, i._defaultActionArgs()));
    };
  },
  _createActionByOption: function (e, t) {
    var n;
    var o;
    var a;
    var r = this;
    function s() {
      if (!o) {
        t = t || {};
        if (typeof e != "string") {
          throw u.default.Error("E0008");
        }
        if (e.indexOf("on") === 0) {
          o = v(e);
        }
        a = r.option(e);
      }
      if (n || a || t.beforeExecute || t.afterExecute || r._eventsStrategy.hasEvent(o)) {
        if (!n) {
          var s = t.beforeExecute;
          t.beforeExecute = function () {
            for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) {
              t[n] = arguments[n];
            }
            if (s) {
              s.apply(r, t);
            }
            r._eventsStrategy.fireEvent(o, t[0].args);
          };
          n = r._createAction(a, t);
        }
        for (var l = arguments.length, d = new Array(l), c = 0; c < l; c++) {
          d[c] = arguments[c];
        }
        if ((0, i.default)().wrapActionsBeforeExecute) {
          var h = r.option("beforeActionExecute") || g.noop;
          var f = h(r, n, t) || n;
          return f.apply(r, d);
        }
        return n.apply(r, d);
      }
    }
    if ((0, i.default)().wrapActionsBeforeExecute) {
      return s;
    } else {
      return (this.option("onActionCreated") || g.noop)(this, s, t) || s;
    }
  },
  on: function (e, t) {
    this._eventsStrategy.on(e, t);
    return this;
  },
  off: function (e, t) {
    this._eventsStrategy.off(e, t);
    return this;
  },
  hasActionSubscription: function (e) {
    return !!this._options.silent(e) || this._eventsStrategy.hasEvent(v(e));
  },
  isOptionDeprecated: function (e) {
    return this._options.isDeprecated(e);
  },
  _setOptionWithoutOptionChange: function (e, t) {
    this._cancelOptionChange = e;
    this.option(e, t);
    this._cancelOptionChange = false;
  },
  _getOptionValue: function (e, t) {
    var n = this.option(e);
    if ((0, p.isFunction)(n)) {
      return n.bind(t)();
    } else {
      return n;
    }
  },
  option: function () {
    var e;
    return (e = this._options).option.apply(e, arguments);
  },
  resetOption: function (e) {
    this.beginUpdate();
    this._options.reset(e);
    this.endUpdate();
  }
});
exports.Component = y;