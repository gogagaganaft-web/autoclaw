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
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.XmlaStore = undefined;
var o = _(require("./38377.js"));
var a = _(require("./68374.js"));
var r = require("./20576.js");
var s = require("./62754.js");
var l = require("./13306.js");
var u = require("./95479.js");
var d = require("./68752.js");
var c = require("./35922.js");
var h = require("./58201.js");
var f = require("./18438.js");
var p = require("./9821.js");
var g = function (e, t) {
  if (!t && e && e.__esModule) {
    return e;
  }
  if (e === null || i(e) !== "object" && typeof e != "function") {
    return {
      default: e
    };
  }
  var n = m(t);
  if (n && n.has(e)) {
    return n.get(e);
  }
  var o = {};
  var a = Object.defineProperty && Object.getOwnPropertyDescriptor;
  for (var r in e) {
    if (r !== "default" && Object.prototype.hasOwnProperty.call(e, r)) {
      var s = a ? Object.getOwnPropertyDescriptor(e, r) : null;
      if (s && (s.get || s.set)) {
        Object.defineProperty(o, r, s);
      } else {
        o[r] = e[r];
      }
    }
  }
  o.default = e;
  if (n) {
    n.set(e, o);
  }
  return o;
}(require("./28580.js"));
function m(e) {
  if (typeof WeakMap != "function") {
    return null;
  }
  var t = new WeakMap();
  var n = new WeakMap();
  return (m = function (e) {
    if (e) {
      return n;
    } else {
      return t;
    }
  })(e);
}
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
  return function (e) {
    if (Array.isArray(e)) {
      return y(e);
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
      return y(e, t);
    }
    var n = Object.prototype.toString.call(e).slice(8, -1);
    if (n === "Object" && e.constructor) {
      n = e.constructor.name;
    }
    if (n === "Map" || n === "Set") {
      return Array.from(e);
    }
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) {
      return y(e, t);
    }
  }(e) || function () {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }();
}
function y(e, t) {
  if (t == null || t > e.length) {
    t = e.length;
  }
  for (var n = 0, i = new Array(t); n < t; n++) {
    i[n] = e[n];
  }
  return i;
}
var b = (0, h.getWindow)();
var x = o.default.inherit(function () {
  var e = "<Envelope xmlns=\"http://schemas.xmlsoap.org/soap/envelope/\"><Body><Discover xmlns=\"urn:schemas-microsoft-com:xml-analysis\"><RequestType>{2}</RequestType><Restrictions><RestrictionList><CATALOG_NAME>{0}</CATALOG_NAME><CUBE_NAME>{1}</CUBE_NAME></RestrictionList></Restrictions><Properties><PropertyList><Catalog>{0}</Catalog>{3}</PropertyList></Properties></Discover></Body></Envelope>";
  var t = "SELECT {2} FROM {0} {1} CELL PROPERTIES VALUE, FORMAT_STRING, LANGUAGE, BACK_COLOR, FORE_COLOR, FONT_FLAGS";
  function n(e, t) {
    var n = new s.Deferred();
    var i = e.beforeSend;
    var o = {
      url: e.url,
      dataType: "text",
      data: t,
      headers: {
        "Content-Type": "text/xml"
      },
      xhrFields: {},
      method: "POST"
    };
    if ((0, c.isFunction)(i)) {
      i(o);
    }
    g.default.sendRequest(o).fail(function () {
      n.reject(arguments);
    }).done(function (e) {
      var t;
      var i = new b.DOMParser();
      try {
        try {
          t = i.parseFromString(e, "text/xml");
        } catch (e) {
          t = undefined;
        }
        if (!t || t.getElementsByTagName("parsererror").length || t.childNodes.length === 0) {
          throw new f.errors.Error("E4023", e);
        }
      } catch (t) {
        n.reject({
          statusText: t.message,
          stack: t.stack,
          responseText: e
        });
      }
      n.resolve(t);
    });
    return n;
  }
  function i() {
    var e = (0, p.getLanguageId)();
    if (e !== undefined) {
      return (0, d.format)("<LocaleIdentifier>{0}</LocaleIdentifier>", e);
    } else {
      return "";
    }
  }
  function o(e) {
    return `${e.hierarchyName || e.dataField}.[All]`;
  }
  function h(e) {
    var t = `${e.dataField}.allMembers`;
    var n = e.searchValue;
    if (n) {
      n = n.replace(/'/g, "''");
      t = `Filter(${t}, instr(${e.dataField}.currentmember.member_caption,'${n}') > 0)`;
    }
    return t;
  }
  function m(e) {
    var t = e.join(",");
    if (e.length > 1) {
      return (0, d.format)("CrossJoin({0})", t);
    } else {
      return t;
    }
  }
  function _(e, t, n, i, a, r, s, l) {
    var u;
    var c;
    var f;
    var p;
    var g;
    var _ = [];
    var v = r[s];
    var y = [];
    for (var b = i; b <= t; b += 1) {
      var x = v[b];
      var w = x.dataField;
      var C = v[b - 1] && v[b - 1].hierarchyName;
      var S = x.hierarchyName;
      var k = !S || !v[b + 1] || v[b + 1].hierarchyName !== S;
      var D = e.length + n + i;
      u = null;
      y.push(x);
      if (b < e.length) {
        if (k) {
          u = `(${w}.${R(e[b], w)})`;
        }
      } else if (b <= D) {
        if (b === 0 && n === 0) {
          var I = o(v[i]);
          u = S ? `${I},${v[i].dataField}` : h(v[i]);
        } else if (S) {
          f = R(a[a.length - 1]);
          if (k || b === D) {
            if (C === S) {
              if (a.length) {
                c = v[a.length - 1];
              }
              if (!c || c.hierarchyName !== S) {
                c = v[b - 1];
                f = "";
              }
              p = c.dataField;
              g = w;
              u = `Descendants({${f || p}}, ${g}, SELF_AND_BEFORE)`;
            } else {
              u = h(x);
            }
          }
        } else {
          u = h(x);
        }
      } else if (!S || C !== S) {
        u = `(${o(x)})`;
      }
      if (u) {
        u = (0, d.format)("{{0}}", u);
        if (l) {
          var T = (x.hierarchyName || x.dataField) + (x.sortBy === "displayText" ? ".MEMBER_CAPTION" : ".MEMBER_VALUE");
          u = (0, d.format)("Order({0}, {1}, {2})", u, T, x.sortOrder === "desc" ? "DESC" : "ASC");
        }
        _.push(u);
      }
    }
    return m(_);
  }
  function y(e, t, n, i, o, a, r, s, l, u) {
    var c;
    var h = -1;
    var f = a[r];
    do {
      h += 1;
      c = t.length + h + i;
      var p = _(t, n, h, i, o, a, r, l);
      if (!l && !u) {
        p = (0, d.format)("NonEmpty({0}, {1})", p, s);
      }
      e.push(p);
    } while (f[c] && f[c + 1] && f[c].expanded);
  }
  function x(e, t, n, i) {
    n = n || `[DX_Set_${t.length}]`;
    i = i || "set";
    t.push((0, d.format)("{0} {1} as {2}", i, n, e));
    return n;
  }
  function w(e, t, n, i, o) {
    var a;
    var r;
    var s = e[t];
    var l = [];
    var c = [];
    var h = [];
    var f = 0;
    var p = 0;
    var _ = [];
    var v = (0, d.format)("{{0}}", n.join(","));
    if (s && s.length) {
      if (e.headerName === t) {
        c = e.path;
        f = c.length;
      } else if (e.headerName && e.oppositePath) {
        c = e.oppositePath;
        f = c.length;
      } else {
        h = (t === "columns" ? e.columnExpandedPaths : e.rowExpandedPaths) || h;
      }
      p = (0, g.getExpandedLevel)(e, t);
      y(l, [], p, f, c, e, t, v, t === "rows" ? e.rowTake : e.columnTake, e.totalsOnly);
      (0, u.each)(h, function (n, i) {
        y(l, i, p, f, i, e, t, v);
      });
      for (var b = p; b >= c.length; b -= 1) {
        if (s[b].hierarchyName) {
          o.visibleLevels[s[b].hierarchyName] = o.visibleLevels[s[b].hierarchyName] || [];
          o.visibleLevels[s[b].hierarchyName].push(s[b].dataField);
        }
      }
    }
    if (l.length) {
      r = (a = l).join(",");
      var w = a.length > 1 ? `Union(${r})` : r;
      if (t === "rows" && e.rowTake) {
        w = (0, d.format)("Subset({0}, {1}, {2})", w, e.rowSkip > 0 ? e.rowSkip + 1 : 0, e.rowSkip > 0 ? e.rowTake : e.rowTake + 1);
      }
      if (t === "columns" && e.columnTake) {
        w = (0, d.format)("Subset({0}, {1}, {2})", w, e.columnSkip > 0 ? e.columnSkip + 1 : 0, e.columnSkip > 0 ? e.columnTake : e.columnTake + 1);
      }
      var C = `[DX_${t}]`;
      _.push(x(w, i, C));
      if (e.totalsOnly) {
        _.push(x(`COUNT(${C})`, i, `[DX_${t}_count]`, "member"));
      }
    }
    if (t === "columns" && n.length && !e.skipValues) {
      _.push(v);
    }
    return (0, d.format)("{0} DIMENSION PROPERTIES PARENT_UNIQUE_NAME,HIERARCHY_UNIQUE_NAME, MEMBER_VALUE ON {1}", m(_), t);
  }
  function C(e) {
    var t = [];
    (0, u.each)(e, function (e, n) {
      var i;
      var o = n.dataField;
      var a = [];
      var r = n.filterValues || [];
      if (!n.hierarchyName || !(0, c.isNumeric)(n.groupIndex)) {
        (0, u.each)(r, function (e, t) {
          var i = `${o}.${R(Array.isArray(t) ? t[t.length - 1] : t, o)}`;
          if (n.filterType === "exclude") {
            a.push(`${i}.parent`);
            i = `Descendants(${i})`;
          }
          a.push(i);
        });
        if (r.length) {
          i = (0, d.format)("{{0}}", a.join(","));
          if (n.filterType === "exclude") {
            i = `Except(${h(n)},${i})`;
          }
          t.push(i);
        }
      }
    });
    if (t.length) {
      return m(t);
    } else {
      return "";
    }
  }
  function S(e, t, n, i) {
    var o = `[${i}]`;
    (0, u.each)([e, t, n], function (e, t) {
      if (t) {
        o = (0, d.format)("(SELECT {0} FROM {1})", `${t}on 0`, o);
      }
    });
    return o;
  }
  function k(e, n, i, o, a, r, s, l = {}) {
    var u = "";
    var c = `${n.length ? `with ${n.join(" ")}` : ""} `;
    if (e.length) {
      var h;
      if (l.totalsOnly) {
        var f = [];
        if (o.length) {
          f.push("[DX_rows_count]");
        }
        if (i.length) {
          f.push("[DX_columns_count]");
        }
        h = `{${f.join(",")}} on columns`;
      } else {
        h = e.join(",");
      }
      u = c + (0, d.format)(t, S(C(i), C(o), C(a || []), s), r.length ? (0, d.format)("WHERE ({0})", r.join(",")) : "", h);
    }
    return u;
  }
  function D(e, t) {
    return (0, u.map)(t, function (t) {
      if ((0, c.isString)(t.expression)) {
        x(t.expression, e, t.dataField, "member");
      }
      return t.dataField;
    });
  }
  function I(e, t, n, i) {
    (0, u.each)(i, function (i, o) {
      var a = t[n][i];
      if (!a.hierarchyName || a.hierarchyName !== t[n][i + 1].hierarchyName) {
        e.push(`${a.dataField}.${R(o, a.dataField)}`);
      }
    });
  }
  function T(e, t, n) {
    var i = e.columns || [];
    var o = e.rows || [];
    var a = e.values && e.values.length ? e.values : [{
      dataField: "[Measures]"
    }];
    var r = [];
    var s = [];
    var l = [];
    var u = D(s, a);
    n.measureCount = e.skipValues ? 1 : a.length;
    n.visibleLevels = {};
    if (e.headerName && e.path) {
      I(r, e, e.headerName, e.path);
    }
    if (e.headerName && e.oppositePath) {
      I(r, e, e.headerName === "rows" ? "columns" : "rows", e.oppositePath);
    }
    if (i.length || u.length) {
      l.push(w(e, "columns", u, s, n));
    }
    if (o.length) {
      l.push(w(e, "rows", u, s, n));
    }
    return k(l, s, i, o, e.filters, r, t, e);
  }
  function E(e, t, n) {
    (0, u.each)(n, function (n, i) {
      var o = t[n];
      if (!o.hierarchyName || (t[n + 1] || {}).hierarchyName !== o.hierarchyName) {
        e.push(`${o.dataField}.${R(i, o.dataField)}`);
      }
    });
  }
  function O(e) {
    return parseInt(e, 10);
  }
  function A(e, t) {
    return P(function (e, t) {
      return (e.getElementsByTagName(t) || [])[0];
    }(e, t));
  }
  function P(e) {
    return e && (e.textContent || e.text || e.innerHTML) || "";
  }
  function M(e, t, n) {
    var i = [];
    var o = [];
    var a = 0;
    var r = [];
    for (var s = e.getElementsByTagName("Cell"), l = {}, d = 0; d < s.length; d += 1) {
      var c = s[d];
      var h = c.getElementsByTagName("Value")[0];
      var p = h && h.getElementsByTagName("Error") || [];
      var g = p.length === 0 ? P(h) : "#N/A";
      var m = parseFloat(g);
      var _ = g - m + 1 > 0;
      var v = O(c.getAttribute("CellOrdinal"));
      if (p.length) {
        l[P(p[0].getElementsByTagName("ErrorCode")[0])] = P(p[0].getElementsByTagName("Description")[0]);
      }
      r[v] = {
        value: _ ? m : g || null
      };
    }
    (0, u.each)(t[1], function () {
      var e = [];
      i.push(e);
      (0, u.each)(t[0], function () {
        if (a % n === 0) {
          o = [];
          e.push(o);
        }
        o.push(r[a] ? r[a].value : null);
        a += 1;
      });
    });
    Object.keys(l).forEach(function (e) {
      f.errors.log("W4002", l[e]);
    });
    return i;
  }
  function R(e, t) {
    if (e) {
      e = (0, c.isString)(e) && e.includes("&") ? e : `[${e}]`;
      if (t && e.indexOf(`${t}.`) === 0) {
        e = e.slice(t.length + 1, e.length);
      }
    }
    return e;
  }
  function B(e, t, n, i) {
    var o = e[t];
    if (!o) {
      o = {};
      e[t] = o;
    }
    if (!(0, c.isDefined)(o.value) && n) {
      o.text = n.caption;
      o.value = n.value;
      o.key = t || "";
      o.levelName = n.levelName;
      o.hierarchyName = n.hierarchyName;
      o.parentName = n.parentName;
      o.index = i;
      o.level = n.level;
    }
    return o;
  }
  function L(e, t) {
    var n = [];
    var i = e.children && (e.children.length ? e.children : Object.keys(e.children.grandTotalHash || {}).reduce(function (t, n) {
      return t.concat(e.children.grandTotalHash[n].children);
    }, []));
    var o = i && i[0];
    if (o && (t[o.hierarchyName] && t[o.hierarchyName].includes(o.levelName) || !t[o.hierarchyName] || o.level === 0)) {
      var a = i.filter(function (e) {
        return e.hierarchyName === o.hierarchyName;
      });
      a.grandTotalHash = i.grandTotalHash;
      return a;
    }
    if (o) {
      for (var r = 0; r < i.length; r += 1) {
        if (i[r].hierarchyName === o.hierarchyName) {
          n.push.apply(n, L(i[r], t));
        }
      }
    }
    return n;
  }
  function V(e, t, n, i) {
    var o = [];
    (0, u.each)(t, function (e, t) {
      var i = {
        children: o
      };
      var a = (0, c.isDefined)(n) ? Math.floor(e / n) : e;
      (0, u.each)(t, function (e, t) {
        i = function (e, t, n) {
          var i = n.children = n.children || [];
          var o = i.hash = i.hash || {};
          var a = i.grandTotalHash = i.grandTotalHash || {};
          if (t.parentName) {
            i = (n = B(o, t.parentName)).children = n.children || [];
          }
          var r = B(o, t.name, t, e);
          if (t.hasValue && !r.added) {
            r.index = e;
            r.added = true;
            i.push(r);
          }
          if (n.value && n.parentName || !t.parentName) {
            if (a[n.name]) {
              delete a[t.parentName];
            }
          } else {
            a[t.parentName] = n;
          }
          return r;
        }(a, t, i);
      });
    });
    var a = {
      children: o
    };
    a.children = L(a, i);
    var r = function (e, t) {
      var n;
      if (e.children.length === 1 && e.children[0].parentName === "") {
        n = e.children[0].index;
        var i = e.children.grandTotalHash;
        e.children = e.children[0].children || [];
        e.children.grandTotalHash = i;
        e.children = L(e, t);
      } else if (e.children.length === 0) {
        n = 0;
      }
      return n;
    }(a, i);
    (0, g.foreachTree)(a.children, function (e) {
      var t = e[0];
      var n = L(t, i);
      if (n.length) {
        t.children = n;
      } else {
        delete t.children;
      }
      delete t.levelName;
      delete t.hierarchyName;
      delete t.added;
      delete t.parentName;
      delete t.level;
    }, true);
    (0, u.each)(a.children || [], function (t, n) {
      e.push(n);
    });
    return r;
  }
  function F(e) {
    var t = e.getElementsByTagName("soap:Fault");
    var n = e.getElementsByTagName("Fault");
    var i = (0, a.default)([].slice.call(n.length ? n : t)).find("Error");
    if (i.length) {
      var o = i.attr("Description");
      var r = new f.errors.Error("E4000", o);
      f.errors.log("E4000", o);
      return r;
    }
    return null;
  }
  function H(e, t) {
    var n = {
      columns: [],
      rows: []
    };
    var i = t.measureCount;
    var o = function (e, t) {
      var n = [];
      for ((0, u.each)(e.getElementsByTagName("Axis"), function (e, i) {
        var o = i.getAttribute("name");
        var a = [];
        var r = 0;
        if (o.indexOf("Axis") === 0 && (0, c.isNumeric)(O(o.substr(4)))) {
          n.push(a);
          (0, u.each)(i.getElementsByTagName("Tuple"), function (e, i) {
            var o;
            var s = i.childNodes;
            var l = 0;
            var u = [];
            var d = t ? s.length : s.length - 1;
            if (n.length === 1) {
              d -= 1;
            }
            a.push(u);
            for (var h = d; h >= 0; h -= 1) {
              var f = s[h];
              var p = O(A(f, "LNum"));
              u[h] = {
                caption: A(f, "Caption"),
                value: (o = A(f, "MEMBER_VALUE"), (0, c.isNumeric)(o) ? parseFloat(o) : o),
                level: p,
                index: r++,
                hasValue: !l && (!!p || h === 0),
                name: A(f, "UName"),
                hierarchyName: s[h].getAttribute("Hierarchy"),
                parentName: A(f, "PARENT_UNIQUE_NAME"),
                levelName: A(f, "LName")
              };
              l += p;
            }
          });
        }
      }); n.length < 2;) {
        n.push([[{
          level: 0
        }]]);
      }
      return n;
    }(e, t.skipValues);
    n.grandTotalColumnIndex = V(n.columns, o[0], i, t.visibleLevels);
    n.grandTotalRowIndex = V(n.rows, o[1], undefined, t.visibleLevels);
    n.values = M(e, o, i);
    return n;
  }
  function N(e, t, n, i) {
    var o = [];
    var a = t === "MEASURE";
    var r = a ? "MEASUREGROUP_NAME" : `${t}_DISPLAY_FOLDER`;
    (0, u.each)(e.getElementsByTagName("row"), function (e, s) {
      var l = t === "LEVEL" ? A(s, "HIERARCHY_UNIQUE_NAME") : undefined;
      var u = A(s, "LEVEL_NUMBER");
      var d = A(s, r);
      if (a) {
        d = i[d] || d;
      }
      if ((u !== "0" || A(s, `${t}_IS_VISIBLE`) !== "true") && A(s, "DIMENSION_TYPE") !== "2") {
        var c = a ? "DX_MEASURES" : A(s, "DIMENSION_UNIQUE_NAME");
        var h = A(s, `${t}_UNIQUE_NAME`);
        o.push({
          dimension: n.names[c] || c,
          groupIndex: u ? O(u) - 1 : undefined,
          dataField: h,
          caption: A(s, `${t}_CAPTION`),
          hierarchyName: l,
          groupName: l,
          displayFolder: d,
          isMeasure: a,
          isDefault: !!n.defaultHierarchies[h]
        });
      }
    });
    return o;
  }
  function z(e, t) {
    t = (0, a.default)("<div>").text(t).html();
    return n(e, (0, d.format)("<Envelope xmlns=\"http://schemas.xmlsoap.org/soap/envelope/\"><Body><Execute xmlns=\"urn:schemas-microsoft-com:xml-analysis\"><Command><Statement>{0}</Statement></Command><Properties><PropertyList><Catalog>{1}</Catalog><ShowHiddenCubes>True</ShowHiddenCubes><SspropInitAppName>Microsoft SQL Server Management Studio</SspropInitAppName><Timeout>3600</Timeout>{2}</PropertyList></Properties></Execute></Body></Envelope>", t, e.catalog, i()));
  }
  return {
    ctor: function (e) {
      this._options = e;
    },
    getFields: function () {
      var t = this._options;
      var o = t.catalog;
      var r = t.cube;
      var l = i();
      var c = n(t, (0, d.format)(e, o, r, "MDSCHEMA_DIMENSIONS", l));
      var h = n(t, (0, d.format)(e, o, r, "MDSCHEMA_MEASURES", l));
      var f = n(t, (0, d.format)(e, o, r, "MDSCHEMA_HIERARCHIES", l));
      var p = n(t, (0, d.format)(e, o, r, "MDSCHEMA_LEVELS", l));
      var g = new s.Deferred();
      (0, s.when)(c, h, f, p).then(function (i, s, c, h) {
        n(t, (0, d.format)(e, o, r, "MDSCHEMA_MEASUREGROUPS", l)).done(function (e) {
          var t = function (e) {
            var t = {
              names: {},
              defaultHierarchies: {}
            };
            (0, u.each)((0, a.default)(e).find("row"), function () {
              var e = (0, a.default)(this);
              var n = e.children("DIMENSION_TYPE").text() === "2" ? "DX_MEASURES" : e.children("DIMENSION_UNIQUE_NAME").text();
              t.names[n] = e.children("DIMENSION_CAPTION").text();
              t.defaultHierarchies[e.children("DEFAULT_HIERARCHY").text()] = true;
            });
            return t;
          }(i);
          var n = N(c, "HIERARCHY", t);
          var o = N(h, "LEVEL", t);
          var r = function (e) {
            var t = {};
            (0, u.each)(e.getElementsByTagName("row"), function (e, n) {
              t[A(n, "MEASUREGROUP_NAME")] = A(n, "MEASUREGROUP_CAPTION");
            });
            return t;
          }(e);
          var l = N(s, "MEASURE", t, r).concat(n);
          var d = {};
          (0, u.each)(o, function (e, t) {
            d[t.hierarchyName] = d[t.hierarchyName] || [];
            d[t.hierarchyName].push(t);
          });
          (0, u.each)(n, function (e, t) {
            if (d[t.dataField] && d[t.dataField].length > 1) {
              t.groupName = t.hierarchyName = t.dataField;
              l.push.apply(l, d[t.hierarchyName]);
            }
          });
          g.resolve(l);
        }).fail(g.reject);
      }).fail(g.reject);
      return g;
    },
    load: function (e) {
      var t;
      var n = new s.Deferred();
      var i = this._options;
      var o = {
        skipValues: e.skipValues
      };
      var a = T(e, i.cube, o);
      if (e.rowSkip || e.rowTake || e.columnTake || e.columnSkip) {
        t = T((0, l.extend)({}, e, {
          totalsOnly: true,
          rowSkip: null,
          rowTake: null,
          columnSkip: null,
          columnTake: null
        }), i.cube, {});
      }
      function r() {
        if (a) {
          (0, s.when)(z(i, a), t && z(i, t)).done(function (t, i) {
            var a = F(t) || i && F(i);
            if (a) {
              n.reject(a);
            } else {
              var r = H(t, o);
              if (i) {
                (function (e, t, n) {
                  var i = [];
                  var o = t.columns || [];
                  var a = t.rows || [];
                  if (o.length) {
                    i.push({});
                  }
                  if (a.length) {
                    i.push({});
                  }
                  var r = M(n, [[{}], [{}, {}]], 1);
                  if (!o.length && a.length) {
                    e.rowCount = Math.max(r[0][0][0] - 1, 0);
                  }
                  if (!a.length && o.length) {
                    e.columnCount = Math.max(r[0][0][0] - 1, 0);
                  }
                  if (a.length && o.length) {
                    e.rowCount = Math.max(r[0][0][0] - 1, 0);
                    e.columnCount = Math.max(r[1][0][0] - 1, 0);
                  }
                  if (e.rowCount !== undefined && t.rowTake) {
                    e.rows = v(Array(t.rowSkip)).concat(e.rows);
                    e.rows.length = e.rowCount;
                    for (var s = 0; s < e.rows.length; s += 1) {
                      e.rows[s] = e.rows[s] || {};
                    }
                  }
                  if (e.columnCount !== undefined && t.columnTake) {
                    e.columns = v(Array(t.columnSkip)).concat(e.columns);
                    e.columns.length = e.columnCount;
                    for (var l = 0; l < e.columns.length; l += 1) {
                      e.columns[l] = e.columns[l] || {};
                    }
                  }
                })(r, e, i);
              }
              n.resolve(r);
            }
          }).fail(n.reject);
        } else {
          n.resolve({
            columns: [],
            rows: [],
            values: [],
            grandTotalColumnIndex: 0,
            grandTotalRowIndex: 0
          });
        }
      }
      if (e.delay) {
        setTimeout(r, e.delay);
      } else {
        r();
      }
      return n;
    },
    supportPaging: function () {
      return true;
    },
    getDrillDownItems: function (e, t) {
      var n = new s.Deferred();
      var i = this._options;
      var o = function (e, t, n) {
        var i = e.columns || [];
        var o = e.rows || [];
        var a = [];
        var r = [];
        var s = [];
        var l = D(r, e.values && e.values.length ? e.values : [{
          dataField: "[Measures]"
        }]);
        var u = n.maxRowCount;
        var d = n.customColumns || [];
        var c = d.length > 0 ? ` return ${d.join(",")}` : "";
        E(a, i, n.columnPath || []);
        E(a, o, n.rowPath || []);
        if (i.length || l.length) {
          s.push([`${l[n.dataIndex] || l[0]} on 0`]);
        }
        var h = k(s, r, i, o, e.filters, a, t);
        if (h) {
          return `drillthrough${u > 0 ? ` maxrows ${u}` : ""}${h}${c}`;
        } else {
          return h;
        }
      }(e, i.cube, t);
      if (o) {
        (0, s.when)(z(i, o)).done(function (e) {
          var t = F(e);
          if (t) {
            n.reject(t);
          } else {
            n.resolve(function (e) {
              var t;
              var n;
              for (var i = e.getElementsByTagName("row"), o = [], a = {}, r = 0; r < i.length; r += 1) {
                for (var s = i[r].childNodes, l = {}, u = 0; u < s.length; u += 1) {
                  var d = s[u].tagName;
                  l[a[d] = a[d] || (n = undefined, (n = (t = (t = d).replace(/_x(....)_/g, function (e, t) {
                    return String.fromCharCode(parseInt(t, 16));
                  })).match(/\[.+?\]/gi)) && n.length && (t = n[n.length - 1]), t.replace(/\[/gi, "").replace(/\]/gi, "").replace(/\$/gi, "").replace(/\./gi, " "))] = P(s[u]);
                }
                o.push(l);
              }
              return o;
            }(e));
          }
        }).fail(n.reject);
      } else {
        n.resolve([]);
      }
      return n;
    },
    key: r.noop,
    filter: r.noop
  };
}()).include(g.storeDrillDownMixin);
exports.XmlaStore = x;
var w = {
  XmlaStore: x
};
exports.default = w;