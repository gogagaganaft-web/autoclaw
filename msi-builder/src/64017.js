exports.default = undefined;
var i;
var o = (i = require("./68374.js")) && i.__esModule ? i : {
  default: i
};
var a = require("./95479.js");
var r = require("./31583.js");
function s(e, t) {
  return (s = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (e, t) {
    e.__proto__ = t;
    return e;
  })(e, t);
}
var l = function (e) {
  var t;
  var n;
  function i() {
    return e.apply(this, arguments) || this;
  }
  n = e;
  (t = i).prototype = Object.create(n.prototype);
  t.prototype.constructor = t;
  s(t, n);
  var r = i.prototype;
  r._init = function () {
    e.prototype._init.call(this);
    this._activeStateUnit = `.dx-toolbar-menu-action:not(.dx-toolbar-hidden-button-group)`;
  };
  r._initMarkup = function () {
    this._renderSections();
    e.prototype._initMarkup.call(this);
    this._setMenuRole();
  };
  r._getSections = function () {
    return this._itemContainer().children();
  };
  r._itemElements = function () {
    return this._getSections().children(this._itemSelector());
  };
  r._renderSections = function () {
    var e = this;
    var t = this._itemContainer();
    (0, a.each)(["before", "center", "after", "menu"], function (n, i) {
      var a = `_\$${i}Section`;
      e[a] ||= (0, o.default)("<div>").addClass("dx-toolbar-menu-section");
      e[a].appendTo(t);
    });
  };
  r._renderItems = function () {
    e.prototype._renderItems.apply(this, arguments);
    this._updateSections();
  };
  r._setMenuRole = function () {
    this.$element().find(`.dx-scrollview-content`).attr("role", "menu");
  };
  r._updateSections = function () {
    var e = this.$element().find(`.dx-toolbar-menu-section`);
    e.removeClass("dx-toolbar-menu-last-section");
    e.not(":empty").eq(-1).addClass("dx-toolbar-menu-last-section");
  };
  r._renderItem = function (t, n, i, o) {
    var r = n.location ?? "menu";
    var s = this[`_\$${r}Section`];
    var l = e.prototype._renderItem.call(this, t, n, s, o);
    if (this._getItemTemplateName({
      itemData: n
    })) {
      l.addClass("dx-toolbar-menu-custom");
    }
    if (r === "menu" || n.widget === "dxButton" || n.widget === "dxButtonGroup" || n.isAction) {
      l.addClass("dx-toolbar-menu-action");
    }
    if (n.widget === "dxButton") {
      l.addClass("dx-toolbar-hidden-button");
    }
    if (n.widget === "dxButtonGroup") {
      l.addClass("dx-toolbar-hidden-button-group");
    }
    l.addClass(n.cssClass);
    return l;
  };
  r._getItemTemplateName = function (t) {
    var n = e.prototype._getItemTemplateName.call(this, t);
    var i = t.itemData;
    return i && i.menuItemTemplate || n;
  };
  r._dataSourceOptions = function () {
    return {
      paginate: false
    };
  };
  r._itemClickHandler = function (t, n, i) {
    if ((0, o.default)(t.target).closest(`.dx-toolbar-menu-action`).length) {
      e.prototype._itemClickHandler.call(this, t, n, i);
    }
  };
  r._clean = function () {
    this._getSections().empty();
    e.prototype._clean.call(this);
  };
  return i;
}(r.ListBase);
exports.default = l;
module.exports = exports.default;
module.exports.default = exports.default;