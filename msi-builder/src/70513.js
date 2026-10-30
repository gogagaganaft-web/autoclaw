Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.FieldsArea = undefined;
require("./16491.js");
var i = c(require("./68374.js"));
var o = require("./20576.js");
var a = require("./95479.js");
var r = require("./80968.js");
var s = c(require("./63008.js"));
var l = c(require("./51495.js"));
var u = require("./74305.js");
var d = require("./28580.js");
function c(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
var h = "<div>";
var f = u.AreaItem.inherit({
  ctor: function (e, t) {
    this.callBase(e);
    this._area = t;
  },
  _getAreaName: function () {
    return "fields";
  },
  _createGroupElement: function () {
    return (0, i.default)(h).addClass("dx-pivotgrid-fields-area").addClass("dx-area-fields").addClass("dx-pivotgrid-drag-action").attr("group", this._area);
  },
  isVisible: function () {
    return !!this.option("fieldPanel.visible") && this.option(`fieldPanel.show${(0, d.capitalizeFirstLetter)(this._area)}Fields`);
  },
  _renderButton: function (e) {
    var t = this;
    var n = (0, i.default)("<td>").appendTo((0, i.default)("<tr>").appendTo(e));
    t.component._createComponent((0, i.default)(h).appendTo(n), s.default, {
      text: "Fields",
      icon: "menu",
      width: "auto",
      onClick: function () {
        var e = t.tableElement().find(".dx-fields-area-popup").dxPopup("instance");
        if (!e.option("visible")) {
          e.show();
        }
      }
    }).$element().addClass("dx-pivotgrid-fields-area-hamburger");
  },
  _getPopupOptions: function (e, t) {
    return {
      contentTemplate: function () {
        return (0, i.default)("<table>").addClass("dx-area-field-container").append((0, i.default)("<thead>").addClass("dx-pivotgrid-fields-area-head").append(e));
      },
      height: "auto",
      width: "auto",
      position: {
        at: "left",
        my: "left",
        of: t
      },
      dragEnabled: false,
      animation: {
        show: {
          type: "pop",
          duration: 200
        }
      },
      shading: false,
      showTitle: false,
      hideOnOutsideClick: true,
      container: t.parent()
    };
  },
  _renderPopup: function (e, t) {
    var n = e.find(".dx-button");
    var o = this._getPopupOptions(t, n);
    var a = this.component.$element().dxPivotGridFieldChooserBase("instance");
    if (this._rowPopup) {
      this._rowPopup.$element().remove();
    }
    this._rowPopup = this.component._createComponent((0, i.default)(h).appendTo(e), l.default, o);
    this._rowPopup.$element().addClass("dx-fields-area-popup");
    this._rowPopup.content().addClass("dx-pivotgrid-fields-container");
    this._rowPopup.content().parent().attr("group", "row");
    a.subscribeToEvents(this._rowPopup.content());
    a.renderSortable(this._rowPopup.content());
  },
  _shouldCreateButton: function () {
    return false;
  },
  _renderTableContent: function (e, t) {
    var n = this;
    var o = this.groupElement();
    var r = this.isVisible();
    var s = n.component.$element().dxPivotGridFieldChooserBase("instance");
    var l = (0, i.default)("<thead>").addClass("dx-pivotgrid-fields-area-head").appendTo(e);
    var u = n._area;
    var d = (0, i.default)("<tr>");
    o.toggleClass("dx-hidden", !r);
    e.addClass("dx-area-field-container");
    if (r) {
      (0, a.each)(t, function (e, o) {
        if (o.area === u && o.visible !== false) {
          var a = (0, i.default)("<td>").append(s.renderField(o, o.area === "row"));
          var r = a.find(".dx-column-indicators");
          if (r.length && n._shouldCreateButton()) {
            r.insertAfter(r.next());
          }
          a.appendTo(d);
          (function (e, t, n, o) {
            if (n && n.groupName && n.groupName === e.groupName) {
              (0, i.default)(h).addClass("dx-group-connector").addClass("dx-group-connector-prev").appendTo(o);
            }
            if (t && t.groupName && t.groupName === e.groupName) {
              (0, i.default)(h).addClass("dx-group-connector").addClass("dx-group-connector-next").appendTo(o);
            }
          })(o, t[e + 1], t[e - 1], a);
        }
      });
      if (!d.children().length) {
        (0, i.default)("<td>").append((0, i.default)(h).addClass("dx-empty-area-text").text(this.option(`fieldPanel.texts.${u}FieldArea`))).appendTo(d);
      }
      if (n._shouldCreateButton()) {
        n._renderButton(l);
        n._renderPopup(e, d);
      } else {
        l.append(d);
      }
    }
  },
  setGroupWidth: function (e) {
    (0, r.setWidth)(this.groupElement(), e);
  },
  setGroupHeight: function (e) {
    (0, r.setHeight)(this.groupElement(), e);
  },
  reset: function () {
    this.callBase();
    this.groupElement().css("marginTop", 0);
  },
  _renderVirtualContent: o.noop
});
exports.FieldsArea = f;
var p = {
  FieldsArea: f
};
exports.default = p;