var i;
var o = ((i = require("./49983.js")) && i.__esModule ? i : {
  default: i
}).default.prototype;
o._optionChangesMap.idField = o._optionChangesMap.parentField = "NODES_CREATE";
o._processDataSourceItems = function (e) {
  var t;
  var n;
  var i;
  var o;
  var a;
  var r = {};
  var s = this._getOption("idField", true);
  var l = this._getOption("parentField", true);
  var u = [];
  if (!s || !l || e.length === 0) {
    return {
      items: e,
      isPlain: false
    };
  }
  for (t = 0; t < e.length; t++) {
    if (i = (n = e[t])[l]) {
      r[i] = r[i] || {
        items: []
      };
      o = r[i].items;
    } else {
      o = u;
    }
    o.push(n);
  }
  (function e(t, n) {
    var i;
    var o;
    var a;
    var r = t.struct;
    for (o = 0; o < n.length; o++) {
      i = n[o];
      a = i[t.idField];
      if (r[a]) {
        i.items = r[a].items;
        r[a] = null;
        e(t, i.items);
      }
    }
  })({
    struct: r,
    idField: s
  }, u);
  for (a in r) {
    if (r[a]) {
      u.push(r[a]);
    }
  }
  return {
    items: u,
    isPlain: true
  };
};