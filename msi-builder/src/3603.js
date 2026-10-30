exports.changes = function () {
  return new s();
};
exports.expand = f;
exports.replaceInherit = undefined;
var i = require("./13306.js");
var o = require("./58201.js");
var a = require("./20576.js");
var r = !(0, o.hasWindow)();
function s() {
  this.reset();
}
function l(e, t) {
  if (e !== t) {
    return (0, i.extend)({}, e, t);
  } else {
    return (0, i.extend)({}, e);
  }
}
function u(e, t) {
  if (e !== t) {
    return e.concat(t);
  } else {
    return e.slice();
  }
}
function d(e) {
  e._totalChangesOrder = e._optionChangesOrder.concat(e._layoutChangesOrder, e._customChangesOrder);
}
function c(e) {
  var t = this.prototype;
  var n = e.code;
  t["_change_" + n] = e.handler;
  if (e.isThemeDependent) {
    t._themeDependentChanges.push(n);
  }
  if (e.option) {
    t._optionChangesMap[e.option] = n;
  }
  (e.isOptionChange ? t._optionChangesOrder : t._customChangesOrder).push(n);
  d(t);
}
function h() {
  var e = function e() {
    var t;
    var n;
    var i = e._chain.length;
    for (t = 0; t < i; ++t) {
      n = e._chain[t].apply(this, arguments);
    }
    return n;
  };
  e._chain = [];
  e.add = function (t) {
    e._chain.push(t);
  };
  e.copy = function (t) {
    e._chain = t._chain.slice();
  };
  return e;
}
function f(e, t, n) {
  var i = e[t];
  if (i) {
    if (i.add) {
      if (Object.prototype.hasOwnProperty.call(e, t) === false) {
        (i = h()).copy(e[t]);
      }
      i.add(n);
    } else {
      (i = h()).add(e[t]);
      i.add(n);
    }
  } else {
    i = n;
  }
  e[t] = i;
}
function p(e) {
  var t = this.prototype;
  t._plugins.push(e);
  if (e.fontFields) {
    t._fontFields.push.apply(t._fontFields, e.fontFields);
  }
  if (e.members) {
    (0, i.extend)(this.prototype, e.members);
  }
  if (e.customize) {
    e.customize(this);
  }
  if (e.extenders) {
    Object.keys(e.extenders).forEach(function (n) {
      var i = e.extenders[n];
      f(t, n, i);
    }, this);
  }
}
s.prototype = {
  constructor: s,
  add: function (e) {
    var t;
    var n = e.length;
    var i = this._flags;
    for (t = 0; t < n; ++t) {
      i[e[t]] = 1;
    }
  },
  has: function (e) {
    return this._flags[e] > 0;
  },
  count: function () {
    return Object.keys(this._flags).length;
  },
  reset: function () {
    this._flags = {};
  }
};
var g = r ? function (e) {
  var t = e.inherit;
  e.inherit = function () {
    var e = t.apply(this, arguments);
    var n = e.prototype;
    ["_plugins", "_eventsMap", "_initialChanges", "_themeDependentChanges", "_optionChangesMap", "_optionChangesOrder", "_layoutChangesOrder", "_customChangesOrder", "_totalChangesOrder"].forEach(function (e) {
      n[e] = {};
    });
    e.addPlugin = a.noop;
    return e;
  };
  e.addChange = a.noop;
  e.addPlugin = a.noop;
} : function (e) {
  var t = e.inherit;
  e.inherit = function () {
    var e = this.prototype;
    var n = e._plugins;
    var i = e._fontFields;
    var o = e._eventsMap;
    var a = e._initialChanges;
    var r = e._themeDependentChanges;
    var s = e._optionChangesMap;
    var c = e._partialOptionChangesMap;
    var h = e._partialOptionChangesPath;
    var f = e._optionChangesOrder;
    var g = e._layoutChangesOrder;
    var m = e._customChangesOrder;
    var _ = t.apply(this, arguments);
    (e = _.prototype)._plugins = u(n, e._plugins);
    e._fontFields = u(i, e._fontFields);
    e._eventsMap = l(o, e._eventsMap);
    e._initialChanges = u(a, e._initialChanges);
    e._themeDependentChanges = u(r, e._themeDependentChanges);
    e._optionChangesMap = l(s, e._optionChangesMap);
    e._partialOptionChangesMap = l(c, e._partialOptionChangesMap);
    e._partialOptionChangesPath = l(h, e._partialOptionChangesPath);
    e._optionChangesOrder = u(f, e._optionChangesOrder);
    e._layoutChangesOrder = u(g, e._layoutChangesOrder);
    e._customChangesOrder = u(m, e._customChangesOrder);
    d(e);
    _.addPlugin = p;
    return _;
  };
  e.prototype._plugins = [];
  e.prototype._fontFields = [];
  e.addChange = c;
  e.addPlugin = p;
};
exports.replaceInherit = g;