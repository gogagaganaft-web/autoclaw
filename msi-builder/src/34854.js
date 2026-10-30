function n() {
  return (n = Object.assign ? Object.assign.bind() : function (e) {
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
function i(e) {
  return function (e) {
    if (Array.isArray(e)) {
      return o(e);
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
      return o(e, t);
    }
    var n = Object.prototype.toString.call(e).slice(8, -1);
    if (n === "Object" && e.constructor) {
      n = e.constructor.name;
    }
    if (n === "Map" || n === "Set") {
      return Array.from(e);
    }
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) {
      return o(e, t);
    }
  }(e) || function () {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }();
}
function o(e, t) {
  if (t == null || t > e.length) {
    t = e.length;
  }
  for (var n = 0, i = new Array(t); n < t; n++) {
    i[n] = e[n];
  }
  return i;
}
exports.getGroupPanelData = undefined;
exports.getGroupPanelData = function (e, t, o, a) {
  var r = 1;
  var s = e.map(function (e) {
    var t = [];
    var n = e.data;
    var o = e.items;
    var a = e.name;
    var s = function (e) {
      t.push.apply(t, i(o.map(function (t, i) {
        var o = t.color;
        var r = t.id;
        return {
          id: r,
          text: t.text,
          color: o,
          key: `${e}_${a}_${r}`,
          resourceName: a,
          data: n == null ? undefined : n[i]
        };
      })));
    };
    for (var l = 0; l < r; l += 1) {
      s(l);
    }
    r *= o.length;
    return t;
  });
  if (o) {
    s = function (e, t) {
      return i(new Array(t)).reduce(function (t, o, a) {
        return e.map(function (e, o) {
          var r = t[o] || [];
          return [].concat(i(r), i(e.map(function (t, i) {
            return n({}, t, {
              key: `${t.key}_group_by_date_${a}`,
              isFirstGroupCell: i === 0,
              isLastGroupCell: i === e.length - 1
            });
          })));
        });
      }, []);
    }(s, t);
  }
  return {
    groupPanelItems: s,
    baseColSpan: a
  };
};