var i = require("./58664.js");
var o = c(require("./68374.js"));
var a = c(require("./55994.js"));
var r = require("./13306.js");
var s = require("./39611.js");
var l = require("./40245.js");
var u = c(require("./61225.js"));
var d = c(require("./66843.js"));
function c(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
(0, l.register)("reorder", "default", u.default.inherit({
  _init: function () {
    var e = this._list;
    this._groupedEnabled = this._list.option("grouped");
    this._lockedDrag = false;
    var t = this._groupedEnabled ? "> .dx-list-group > .dx-list-group-body > .dx-list-item" : "> .dx-list-item";
    this._sortable = e._createComponent(e._scrollView.content(), d.default, (0, r.extend)({
      component: e,
      contentTemplate: null,
      allowReordering: false,
      filter: t,
      container: e.$element(),
      dragDirection: e.option("itemDragging.group") ? "both" : "vertical",
      handle: `.dx-list-reorder-handle`,
      dragTemplate: this._dragTemplate,
      onDragStart: this._dragStartHandler.bind(this),
      onDragChange: this._dragChangeHandler.bind(this),
      onReorder: this._reorderHandler.bind(this)
    }, e.option("itemDragging")));
  },
  afterRender: function () {
    this._sortable.update();
  },
  _dragTemplate: function (e) {
    var t = (0, o.default)(e.itemElement).clone().addClass("dx-list-item-ghost-reordering").addClass("dx-state-hover");
    (0, i.setWidth)(t, (0, i.getWidth)(e.itemElement));
    return t;
  },
  _dragStartHandler: function (e) {
    if (this._lockedDrag) {
      e.cancel = true;
    }
  },
  _dragChangeHandler: function (e) {
    if (!!this._groupedEnabled && !this._sameParent(e.fromIndex, e.toIndex)) {
      e.cancel = true;
    }
  },
  _sameParent: function (e, t) {
    var n = this._list.getItemElementByFlatIndex(e);
    return this._list.getItemElementByFlatIndex(t).parent().get(0) === n.parent().get(0);
  },
  _reorderHandler: function (e) {
    var t = this._list.getItemElementByFlatIndex(e.toIndex);
    this._list.reorderItem((0, o.default)(e.itemElement), t);
  },
  afterBag: function (e) {
    var t = this;
    var n = (0, o.default)("<div>").addClass("dx-list-reorder-handle");
    a.default.on(n, "dxpointerdown", function (e) {
      t._lockedDrag = !(0, s.isMouseEvent)(e);
    });
    a.default.on(n, "dxhold", {
      timeout: 30
    }, function (e) {
      e.cancel = true;
      t._lockedDrag = false;
    });
    e.$container.addClass("dx-list-reorder-handle-container").append(n);
  }
}));