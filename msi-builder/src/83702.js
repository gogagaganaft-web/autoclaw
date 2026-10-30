exports.default = undefined;
var i;
var o = (i = require("./58887.js")) && i.__esModule ? i : {
  default: i
};
var a = require("./97906.js");
var r = require("./13306.js");
var s = require("./35459.js");
function l(e, t) {
  e.prototype = Object.create(t.prototype);
  e.prototype.constructor = e;
  u(e, t);
}
function u(e, t) {
  return (u = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (e, t) {
    e.__proto__ = t;
    return e;
  })(e, t);
}
var d = function (e) {
  function t() {
    return e.apply(this, arguments) || this;
  }
  l(t, e);
  t.prototype.tryExecute = function () {
    var e = this._options.value;
    var t = this.findInstance();
    return !!t && (t.option(e), true);
  };
  return t;
}(o.default);
var c = function (e) {
  function t() {
    return e.apply(this, arguments) || this;
  }
  l(t, e);
  t.prototype.tryExecute = function () {
    var e = this.findInstance();
    if (e) {
      var t = this._options;
      var n = t.optionName;
      var i = t.item;
      var o = t.value;
      var a = this._itemsRunTimeInfo.findItemIndexByItem(i);
      if (a >= 0) {
        e.option((0, s.getFullOptionName)(`items[${a}]`, n), o);
        return true;
      }
    }
    return false;
  };
  return t;
}(o.default);
var h = function (e) {
  function t() {
    return e.apply(this, arguments) || this;
  }
  l(t, e);
  t.prototype.tryExecute = function () {
    return false;
  };
  return t;
}(o.default);
var f = function (e) {
  function t() {
    return e.apply(this, arguments) || this;
  }
  l(t, e);
  t.prototype.tryExecute = function () {
    var e = this.findPreparedItem();
    return e != null && !!e._prepareGroupItemTemplate && !!e._renderGroupContentTemplate && (e._prepareGroupItemTemplate(this._options.item.template), e._renderGroupContentTemplate(), true);
  };
  return t;
}(o.default);
var p = function (e) {
  function t() {
    return e.apply(this, arguments) || this;
  }
  l(t, e);
  t.prototype.tryExecute = function () {
    var e = this.findInstance();
    if (e) {
      var t = this._options.value;
      e.option("dataSource", t);
      return true;
    }
    return false;
  };
  return t;
}(o.default);
var g = function (e) {
  function t() {
    return e.apply(this, arguments) || this;
  }
  l(t, e);
  t.prototype.tryExecute = function () {
    var e = this._options.item;
    var t = this.findInstance();
    var n = t && (0, a.data)(t.$element()[0], "dxValidator");
    if (n && e) {
      function i(e) {
        return e.type === "required";
      }
      var o = (n.option("validationRules") || []).some(i);
      var r = (e.validationRules || []).some(i);
      if (!o && !r || o && r) {
        n.option("validationRules", e.validationRules);
        return true;
      }
    }
    return false;
  };
  return t;
}(o.default);
var m = function (e) {
  function t() {
    return e.apply(this, arguments) || this;
  }
  l(t, e);
  t.prototype.tryExecute = function () {
    var e = this.findItemContainer();
    var t = this._options;
    var n = t.previousValue;
    var i = t.value;
    return !!e && (e.removeClass(n).addClass(i), true);
  };
  return t;
}(o.default);
function _(e, t) {
  switch (e) {
    case "editorOptions":
    case "buttonOptions":
      return new d(t);
    case "validationRules":
      return new g(t);
    case "cssClass":
      return new m(t);
    case "badge":
    case "disabled":
    case "icon":
    case "tabTemplate":
    case "title":
      return new c((0, r.extend)(t, {
        optionName: e
      }));
    case "tabs":
      return new p(t);
    case "template":
      var i;
      var a = (t == null || (i = t.item) === null || i === undefined ? undefined : i.itemType) ?? t.itemsRunTimeInfo.findPreparedItemByItem(t == null ? undefined : t.item)?.itemType;
      if (a === "simple") {
        return new h(t);
      } else if (a === "group") {
        return new f(t);
      } else {
        return new c((0, r.extend)(t, {
          optionName: e
        }));
      }
    default:
      return null;
  }
}
exports.default = _;
module.exports = exports.default;
module.exports.default = exports.default;