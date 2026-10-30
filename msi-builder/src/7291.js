exports.LegendsControl = c;
var i = require("./13306.js");
var o = require("./95479.js");
var a = require("./48013.js");
var r = require("./16342.js");
var s = i.extend;
var l = o.each;
var u = {
  category: "UNKNOWN",
  name: "UNKNOWN"
};
function d(e) {
  var t = this;
  t._params = e;
  t._root = e.renderer.g().attr({
    class: "dxm-legend"
  }).linkOn(e.container, {
    name: "legend",
    after: "legend-base"
  }).enableLinks().linkAppend();
  e.layoutControl.addItem(t);
  r.Legend.call(t, {
    renderer: e.renderer,
    widget: e.widget,
    group: t._root,
    backgroundClass: null,
    itemsGroupClass: null,
    textField: "text",
    getFormatObject: function (e) {
      return e;
    }
  });
  t._onDataChanged = function (e) {
    t._updateData(e);
  };
}
function c(e) {
  this._params = e;
  this._items = [];
  e.container.virtualLink("legend-base");
}
d.prototype = s((0, a.clone)(r.Legend.prototype), {
  constructor: d,
  dispose: function () {
    var e = this;
    e._params.layoutControl.removeItem(e);
    e._unbindData();
    e._root.linkRemove().linkOff();
    e._params = e._root = e._onDataChanged = null;
    return r.Legend.prototype.dispose.apply(e, arguments);
  },
  resize: function (e) {
    this._params.notifyDirty();
    if (e === null) {
      this.erase();
    } else {
      this.draw(e.width, e.height);
    }
    this._params.notifyReady();
  },
  locate: r.Legend.prototype.shift,
  _updateData: function (e) {
    this._options.defaultColor = e && e.defaultColor;
    this.update(e ? function (e, t, n) {
      var i;
      var o;
      var a = t.length;
      var r = [];
      for (i = 0; i < a; ++i) {
        r[i] = o = {
          start: e[i],
          end: e[i + 1],
          index: i
        };
        o[n] = t[i];
        o.states = {
          normal: {
            fill: o.color
          }
        };
        o.visible = true;
      }
      return r;
    }(e.partition, e.values, this._dataName) : [], this._options, this._params.themeManager.theme("legend").title);
    this.updateLayout();
  },
  _unbindData: function () {
    if (this._dataCategory) {
      this._params.dataExchanger.unbind(this._dataCategory, this._dataName, this._onDataChanged);
    }
  },
  _bindData: function (e) {
    this._params.dataExchanger.bind(this._dataCategory = e.category, this._dataName = e.name, this._onDataChanged);
  },
  setOptions: function (e) {
    this.update(this._data, e, this._params.themeManager.theme("legend").title);
    this._unbindData();
    var t = e.source;
    this._bindData(t ? {
      category: t.layer,
      name: t.grouping
    } : u);
    this.updateLayout();
    return this;
  }
});
c.prototype = {
  constructor: c,
  dispose: function () {
    l(this._items, function (e, t) {
      t.dispose();
    });
    this._params = this._items = null;
  },
  setOptions: function (e) {
    var t;
    var n = e && e.length ? e : [];
    var i = this._items;
    var o = n.length;
    var a = this._params;
    var r = a.themeManager.theme("legend");
    for (t = i.length; t < o; ++t) {
      i[t] = new d(a);
    }
    for (t = i.length - 1; t >= o; --t) {
      i[t].dispose();
      i.splice(t, 1);
    }
    a.layoutControl.suspend();
    t = 0;
    for (; t < o; ++t) {
      i[t].setOptions(s(true, {}, r, n[t]));
    }
    a.layoutControl.resume();
  }
};