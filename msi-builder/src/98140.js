function i(e) {
  return (i = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function (e) {
    return typeof e;
  } : function (e) {
    if (e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype) {
      return "symbol";
    } else {
      return typeof e;
    }
  })(e);
}
exports.setResourceToAppointment = exports.reduceResourcesTree = exports.loadResources = exports.isResourceMultiple = exports.groupAppointmentsByResourcesCore = exports.groupAppointmentsByResources = exports.getWrappedDataSource = exports.getValueExpr = exports.getResourcesDataByGroups = exports.getResourceTreeLeaves = exports.getResourceColor = exports.getResourceByField = exports.getPathToLeaf = exports.getPaintedResources = exports.getOrLoadResourceItem = exports.getNormalizedResources = exports.getGroupsObjectFromGroupsArray = exports.getGroupCount = exports.getFieldExpr = exports.getDisplayExpr = exports.getDataAccessors = exports.getCellGroups = exports.getAppointmentColor = exports.getAllGroups = exports.filterResources = exports.createResourcesTree = exports.createResourceEditorModel = exports.createReducedResourcesTree = exports.createExpressions = undefined;
var o = require("./9234.js");
var a = require("./85273.js");
var r = require("./62754.js");
var s = require("./47617.js");
var l = require("./95479.js");
var u = require("./13306.js");
var d = require("./35922.js");
var c = require("./89386.js");
var h = require("./48013.js");
var f = require("./20576.js");
var p = require("./31486.js");
function g(e) {
  return function (e) {
    if (Array.isArray(e)) {
      return m(e);
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
      return m(e, t);
    }
    var n = Object.prototype.toString.call(e).slice(8, -1);
    if (n === "Object" && e.constructor) {
      n = e.constructor.name;
    }
    if (n === "Map" || n === "Set") {
      return Array.from(e);
    }
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) {
      return m(e, t);
    }
  }(e) || function () {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }();
}
function m(e, t) {
  if (t == null || t > e.length) {
    t = e.length;
  }
  for (var n = 0, i = new Array(t); n < t; n++) {
    i[n] = e[n];
  }
  return i;
}
function _(e, t, n) {
  if ((t = function (e) {
    var t = function (e, t) {
      if (i(e) !== "object" || e === null) {
        return e;
      }
      var n = e[Symbol.toPrimitive];
      if (n !== undefined) {
        var o = n.call(e, t || "default");
        if (i(o) !== "object") {
          return o;
        }
        throw new TypeError("@@toPrimitive must return a primitive value.");
      }
      return (t === "string" ? String : Number)(e);
    }(e, "string");
    if (i(t) === "symbol") {
      return t;
    } else {
      return String(t);
    }
  }(t)) in e) {
    Object.defineProperty(e, t, {
      value: n,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    e[t] = n;
  }
  return e;
}
function v() {
  return (v = Object.assign ? Object.assign.bind() : function (e) {
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
function y(e) {
  return e.valueExpr || "id";
}
exports.getValueExpr = y;
function b(e) {
  return e.displayExpr || "text";
}
exports.getDisplayExpr = b;
function x(e) {
  return e.fieldExpr || e.field;
}
exports.getFieldExpr = x;
function w(e) {
  if (e instanceof a.DataSource) {
    return e;
  }
  var t = v({}, (0, o.normalizeDataSourceOptions)(e), {
    pageSize: 0
  });
  if (!Array.isArray(e)) {
    t.filter = e.filter;
  }
  return new a.DataSource(t);
}
exports.getWrappedDataSource = w;
function C(e) {
  var t = 0;
  return function n(i, o, a, r) {
    a = a || [];
    for (var s = 0; s < i.items.length; s++) {
      var u = i.items[s];
      var d = {
        name: i.name,
        value: u.id,
        title: u.text,
        data: i.data?.[s],
        children: [],
        parent: r || null
      };
      var c = o + 1;
      if (e[c]) {
        n(e[c], c, d.children, d);
      }
      if (!d.children.length) {
        d.leafIndex = t;
        t++;
      }
      a.push(d);
    }
    return a;
  }(e[0], 0);
}
exports.createResourcesTree = C;
function S(e, t) {
  return function e(t, n) {
    (n = n || []).push(t.value);
    if (t.parent) {
      e(t.parent, n);
    }
    return n;
  }(function e(t, n) {
    for (var i = 0; i < t.length; i++) {
      if (t[i].leafIndex === n) {
        return t[i];
      }
      var o = e(t[i].children, n);
      if (o) {
        return o;
      }
    }
  }(C(t), e)).reverse();
}
exports.getPathToLeaf = S;
function k(e, t) {
  var n = [];
  if (D(t)) {
    if (e < 0) {
      return;
    }
    var i = S(e, t);
    for (var o = 0; o < t.length; o++) {
      n.push({
        name: t[o].name,
        id: i[o]
      });
    }
  }
  return n;
}
exports.getCellGroups = k;
function D(e) {
  var t = 0;
  for (var n = 0, i = e.length; n < i; n++) {
    if (n) {
      t *= e[n].items.length;
    } else {
      t = e[n].items.length;
    }
  }
  return t;
}
exports.getGroupCount = D;
function I(e) {
  return e.reduce(function (e, t) {
    return v({}, e, _({}, t.name, t.id));
  }, {});
}
exports.getGroupsObjectFromGroupsArray = I;
exports.getAllGroups = function (e) {
  var t = D(e);
  return g(new Array(t)).map(function (t, n) {
    var i = k(n, e);
    return I(i);
  });
};
function T(e, t) {
  for (var n = 0; n < t.length; n++) {
    var i = t[n];
    if (i.name === e) {
      return i.data;
    }
  }
  return [];
}
exports.getResourceByField = T;
exports.createResourceEditorModel = function (e, t) {
  return e.map(function (e) {
    var n = x(e);
    var i = T(n, t);
    return {
      editorOptions: {
        dataSource: i.length ? i : w(e.dataSource),
        displayExpr: b(e),
        valueExpr: y(e)
      },
      dataField: n,
      editorType: e.allowMultiple ? "dxTagBox" : "dxSelectBox",
      label: {
        text: e.label || n
      }
    };
  });
};
function E(e, t) {
  var n = e.find(function (e) {
    return x(e) === t;
  });
  return n != null && !!n.allowMultiple;
}
exports.isResourceMultiple = E;
function O(e, t) {
  return e.filter(function (e) {
    var n = x(e);
    return t.indexOf(n) > -1;
  });
}
exports.filterResources = O;
function A(e, t) {
  var n = t || [];
  var i = e.find(function (e) {
    return e.useColorAsDefault;
  });
  if (i) {
    return i;
  }
  var o = n.length ? O(e, n) : e;
  return o[o.length - 1];
}
exports.getPaintedResources = A;
function P(e, t, n, i) {
  var o = new r.Deferred();
  e.filter(function (e) {
    return x(e) === n && (0, d.isDefined)(e.dataSource);
  }).forEach(function (e) {
    var a = w(e.dataSource);
    var r = y(e);
    if (!t.has(n)) {
      t.set(n, a.load());
    }
    t.get(n).done(function (e) {
      var t = (0, s.compileGetter)(r);
      var n = e.filter(function (e) {
        return (0, f.equalByValue)(t(e), i);
      });
      o.resolve(n[0]);
    }).fail(function () {
      t.delete(n);
      o.reject();
    });
  });
  return o.promise();
}
exports.getOrLoadResourceItem = P;
function M(e, t, n) {
  return e[n][t];
}
exports.getDataAccessors = M;
exports.groupAppointmentsByResources = function (e, t, n = []) {
  var i = {
    0: t
  };
  if (n.length && e.loadedResources.length) {
    i = R(e, t, e.loadedResources);
  }
  var o = 0;
  e.loadedResources.forEach(function (e, t) {
    if (t) {
      o *= e.items.length;
    } else {
      o = e.items.length;
    }
  });
  for (var a = 0; a < o; a++) {
    var r = a.toString();
    i[r] ||= [];
  }
  return i;
};
function R(e, t, n) {
  var i = C(n);
  var o = {};
  t.forEach(function (t) {
    for (var n = B(function (t, n) {
        return M(e.dataAccessors, t, n);
      }, i, t), a = 0; a < n.length; a++) {
      o[n[a]] ||= [];
      o[n[a]].push((0, h.deepExtendArraySafe)({}, t, true));
    }
  });
  return o;
}
exports.groupAppointmentsByResourcesCore = R;
var B = function e(t, n, i, o) {
  o = o || [];
  for (var a = 0; a < n.length; a++) {
    if (L(t, i, n[a].name, n[a].value)) {
      if ((0, d.isDefined)(n[a].leafIndex)) {
        o.push(n[a].leafIndex);
      }
      if (n[a].children) {
        e(t, n[a].children, i, o);
      }
    }
  }
  return o;
};
exports.getResourceTreeLeaves = B;
function L(e, t, n, i) {
  var o = e(n, "getter")(t);
  return (0, p.hasResourceValue)((0, c.wrapToArray)(o), i);
}
exports.createReducedResourcesTree = function (e, t, n) {
  var i = C(e);
  return V(t, i, n);
};
var V = function e(t, n, i, o) {
  o = o ? o.children : [];
  n.forEach(function (n, a) {
    var r = false;
    var s = n.name;
    var l = n.value;
    var u = n.title;
    var d = n.data;
    var c = t(s, "getter");
    i.forEach(function (e) {
      if (!r) {
        var t = c(e);
        if (Array.isArray(t)) {
          if (t.indexOf(l) > -1) {
            o.push({
              name: s,
              value: l,
              title: u,
              data: d,
              children: []
            });
            r = true;
          }
        } else if (t === l) {
          o.push({
            name: s,
            value: l,
            title: u,
            data: d,
            children: []
          });
          r = true;
        }
      }
    });
    if (r && n.children && n.children.length) {
      e(t, n.children, i, o[a]);
    }
  });
  return o;
};
exports.reduceResourcesTree = V;
exports.getResourcesDataByGroups = function (e, t, n) {
  if (!n || !n.length) {
    return e;
  }
  var i = {};
  var o = [];
  n.forEach(function (e) {
    (0, l.each)(e, function (e, t) {
      return i[e] = t;
    });
  });
  e.filter(function (e) {
    var t = e.name;
    return (0, d.isDefined)(i[t]);
  }).forEach(function (e) {
    return o.push((0, u.extend)({}, e));
  });
  o.forEach(function (e) {
    var i = e.items;
    var o = e.data;
    var a = e.name;
    var r = O(t, [a])[0] || {};
    var s = y(r);
    var u = [];
    var c = [];
    n.filter(function (e) {
      return (0, d.isDefined)(e[a]);
    }).forEach(function (e) {
      (0, l.each)(e, function (e, t) {
        if (!u.filter(function (n) {
          return n.id === t && n[s] === e;
        }).length) {
          var n = i.filter(function (e) {
            return e.id === t;
          });
          var a = o.filter(function (e) {
            return e[s] === t;
          });
          u.push.apply(u, g(n));
          c.push.apply(c, g(a));
        }
      });
    });
    e.items = u;
    e.data = c;
  });
  return o;
};
exports.setResourceToAppointment = function (e, t, n, i) {
  var o = t.setter;
  for (var a in i) {
    var r = i[a];
    var s = E(e, a) ? (0, c.wrapToArray)(r) : r;
    o[a](n, s);
  }
};
function F(e, t, n, i) {
  var o = new r.Deferred();
  var a = (O(e, [n])[0] || {}).colorExpr || "color";
  var l = (0, s.compileGetter)(a);
  P(e, t, n, i).done(function (e) {
    return o.resolve(l(e));
  }).fail(function () {
    return o.reject();
  });
  return o.promise();
}
exports.getResourceColor = F;
exports.getAppointmentColor = function (e, t) {
  var n = e.resources;
  var i = e.dataAccessors;
  var o = e.loadedResources;
  var a = e.resourceLoaderMap;
  var s = t.groupIndex;
  var l = t.groups;
  var u = t.itemData;
  var d = A(n || [], l);
  if (d) {
    var h = x(d);
    for (var f = k(s, o), p = M(i, h, "getter"), g = (0, c.wrapToArray)(p(u))[0], m = 0; m < f.length; m++) {
      if (f[m].name === h) {
        g = f[m].id;
        break;
      }
    }
    return F(n, a, h, g);
  }
  return new r.Deferred().resolve().promise();
};
exports.createExpressions = function (e = []) {
  var t = {
    getter: {},
    setter: {}
  };
  e.forEach(function (e) {
    var n = x(e);
    t.getter[n] = (0, s.compileGetter)(n);
    t.setter[n] = (0, s.compileSetter)(n);
  });
  return t;
};
exports.loadResources = function (e, t, n) {
  var i = new r.Deferred();
  var o = [];
  var a = [];
  O(t || [], e || []).forEach(function (e) {
    var t = new r.Deferred();
    var i = x(e);
    o.push(t);
    var a = w(e.dataSource).load();
    n.set(i, a);
    a.done(function (n) {
      var o = function (e, t) {
        var n = (0, s.compileGetter)(y(e));
        var i = (0, s.compileGetter)(b(e));
        return t.map(function (e) {
          var t = {
            id: n(e),
            text: i(e)
          };
          if (e.color) {
            t.color = e.color;
          }
          return t;
        });
      }(e, n);
      t.resolve({
        name: i,
        items: o,
        data: n
      });
    }).fail(function () {
      return t.reject();
    });
  });
  if (o.length) {
    r.when.apply(null, o).done(function () {
      for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) {
        t[n] = arguments[n];
      }
      var o = t.some(function (e) {
        return e.items.length === 0;
      });
      a = o ? [] : t;
      i.resolve(a);
    }).fail(function () {
      return i.reject();
    });
    return i.promise();
  } else {
    return i.resolve(a);
  }
};
exports.getNormalizedResources = function (e, t, n) {
  var i = {};
  (0, l.each)(t.resources.getter, function (o) {
    var a = t.resources.getter[o](e);
    if ((0, d.isDefined)(a)) {
      var r = E(n, o) ? (0, c.wrapToArray)(a) : a;
      i[o] = r;
    }
  });
  return i;
};