exports.Options = undefined;
var i = require("./35922.js");
var o = require("./20576.js");
var a = require("./9030.js");
var r = require("./47617.js");
var s = require("./45434.js");
var l = require("./13306.js");
function u(e) {
  return (u = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function (e) {
    return typeof e;
  } : function (e) {
    if (e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype) {
      return "symbol";
    } else {
      return typeof e;
    }
  })(e);
}
function d() {
  return (d = Object.assign ? Object.assign.bind() : function (e) {
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
function c(e, t) {
  for (var n = 0; n < t.length; n++) {
    var i = t[n];
    i.enumerable = i.enumerable || false;
    i.configurable = true;
    if ("value" in i) {
      i.writable = true;
    }
    Object.defineProperty(e, (o = i.key, a = undefined, a = function (e, t) {
      if (u(e) !== "object" || e === null) {
        return e;
      }
      var n = e[Symbol.toPrimitive];
      if (n !== undefined) {
        var i = n.call(e, t || "default");
        if (u(i) !== "object") {
          return i;
        }
        throw new TypeError("@@toPrimitive must return a primitive value.");
      }
      return (t === "string" ? String : Number)(e);
    }(o, "string"), u(a) === "symbol" ? a : String(a)), i);
  }
  var o;
  var a;
}
var h = function () {
  function e(e, t, n, i) {
    var o = this;
    this._deprecatedCallback;
    this._startChangeCallback;
    this._endChangeCallback;
    this._default = t;
    this._deprecated = i;
    this._deprecatedNames = [];
    this._initDeprecatedNames();
    this._optionManager = new a.OptionManager(e, n);
    this._optionManager.onRelevantNamesPrepared(function (e, t, n, i) {
      return o._setRelevantNames(e, t, n, i);
    });
    this._cachedOptions = {};
    this._rules = [];
  }
  var t;
  var n;
  var u;
  var h = e.prototype;
  h._initDeprecatedNames = function () {
    for (var e in this._deprecated) {
      this._deprecatedNames.push(e);
    }
  };
  h._getByRules = function (e) {
    e = Array.isArray(e) ? this._rules.concat(e) : this._rules;
    return (0, s.convertRulesToOptions)(e);
  };
  h._notifyDeprecated = function (e) {
    var t = this._deprecated[e];
    if (t) {
      this._deprecatedCallback(e, t);
    }
  };
  h._setRelevantNames = function (e, t, n, i) {
    if (t) {
      var o = this._normalizeName(t, i);
      if (o && o !== t) {
        this._setField(e, o, n);
        this._clearField(e, t);
      }
    }
  };
  h._setField = function (e, t, n) {
    var i = "";
    var o = null;
    do {
      i = i ? `.${i}` : "";
      i = (0, s.getFieldName)(t) + i;
      o = (t = (0, s.getParentName)(t)) ? this._optionManager.get(e, t, false) : e;
    } while (!o);
    o[i] = n;
  };
  h._clearField = function (e, t) {
    delete e[t];
    var n = (0, s.getParentName)(t);
    var i = n ? this._optionManager.get(e, n, false) : e;
    if (i) {
      delete i[(0, s.getFieldName)(t)];
    }
  };
  h._normalizeName = function (e, t) {
    if (this._deprecatedNames.length && e) {
      for (var n = 0; n < this._deprecatedNames.length; n++) {
        if (this._deprecatedNames[n] === e) {
          var i = this._deprecated[e];
          if (i) {
            if (!t) {
              this._notifyDeprecated(e);
            }
            return i.alias || e;
          }
        }
      }
    }
    return e;
  };
  h.addRules = function (e) {
    this._rules = e.concat(this._rules);
  };
  h.applyRules = function (e) {
    var t = this._getByRules(e);
    this.silent(t);
  };
  h.dispose = function () {
    this._deprecatedCallback = o.noop;
    this._startChangeCallback = o.noop;
    this._endChangeCallback = o.noop;
    this._optionManager.dispose();
  };
  h.onChanging = function (e) {
    this._optionManager.onChanging(e);
  };
  h.onChanged = function (e) {
    this._optionManager.onChanged(e);
  };
  h.onDeprecated = function (e) {
    this._deprecatedCallback = e;
  };
  h.onStartChange = function (e) {
    this._startChangeCallback = e;
  };
  h.onEndChange = function (e) {
    this._endChangeCallback = e;
  };
  h.isInitial = function (e) {
    var t = this.silent(e);
    var n = this.initial(e);
    if ((0, i.isFunction)(t) && (0, i.isFunction)(n)) {
      return t.toString() === n.toString();
    } else {
      return (0, o.equalByValue)(t, n);
    }
  };
  h.initial = function (e) {
    return (0, s.getNestedOptionValue)(this._initial, e);
  };
  h.option = function (e, t) {
    var n = arguments.length < 2 && (0, i.type)(e) !== "object";
    if (n) {
      return this._optionManager.get(undefined, this._normalizeName(e));
    }
    this._startChangeCallback();
    try {
      this._optionManager.set(e, t);
    } finally {
      this._endChangeCallback();
    }
  };
  h.silent = function (e, t) {
    var n = arguments.length < 2 && (0, i.type)(e) !== "object";
    if (n) {
      return this._optionManager.get(undefined, e, undefined, true);
    }
    this._optionManager.set(e, t, undefined, true);
  };
  h.reset = function (e) {
    var t = this;
    if (e) {
      var n = (0, r.getPathParts)(e).reduce(function (e, n) {
        if (e) {
          return e[n];
        } else {
          return t.initial(n);
        }
      }, null);
      var o = (0, i.isObject)(n) ? d({}, n) : n;
      this._optionManager.set(e, o, false);
    }
  };
  h.getAliasesByName = function (e) {
    var t = this;
    return Object.keys(this._deprecated).filter(function (n) {
      return e === t._deprecated[n].alias;
    });
  };
  h.isDeprecated = function (e) {
    return Object.prototype.hasOwnProperty.call(this._deprecated, e);
  };
  h.cache = function (e, t) {
    var n = arguments.length < 2;
    if (n) {
      return this._cachedOptions[e];
    }
    this._cachedOptions[e] = (0, l.extend)(this._cachedOptions[e], t);
  };
  t = e;
  if (n = [{
    key: "_initial",
    get: function () {
      if (!this._initialOptions) {
        var e = this._getByRules(this.silent("defaultOptionsRules"));
        this._initialOptions = this._default;
        this._optionManager._setByReference(this._initialOptions, e);
      }
      return this._initialOptions;
    },
    set: function (e) {
      this._initialOptions = e;
    }
  }]) {
    c(t.prototype, n);
  }
  if (u) {
    c(t, u);
  }
  Object.defineProperty(t, "prototype", {
    writable: false
  });
  return e;
}();
exports.Options = h;