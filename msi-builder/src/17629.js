require("./29900.js");
var i = h(require("./68374.js"));
var o = require("./62754.js");
var a = require("./13306.js");
var r = require("./35922.js");
var s = h(require("./28109.js"));
var l = h(require("./96688.js"));
var u = require("./22324.js");
var d = h(require("./60082.js"));
var c = h(require("./12500.js"));
function h(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
var f = u.editingModule.controllers.editing.inherit({
  _generateNewItem: function (e) {
    var t = this.callBase(e);
    t.data = {
      key: e
    };
    t.children = [];
    t.level = 0;
    t.parentKey = this.option("rootValue");
    return t;
  },
  _isProcessedItem: function () {
    return true;
  },
  _setInsertAfterOrBeforeKey: function (e, t) {
    if (t !== undefined && t !== this.option("rootValue")) {
      e.insertAfterKey = t;
    } else {
      this.callBase.apply(this, arguments);
    }
  },
  _getLoadedRowIndex: function (e, t) {
    var n = this.getController("data");
    var i = n.dataSource();
    var o = i == null ? undefined : i.parentKeyOf(t.data);
    if (o !== undefined && o !== this.option("rootValue")) {
      var a = d.default.getIndexByKey(o, e);
      if (a >= 0 && this._dataController.isRowExpanded(o)) {
        return a + 1;
      } else {
        return -1;
      }
    }
    return this.callBase.apply(this, arguments);
  },
  _isEditColumnVisible: function () {
    var e = this.callBase.apply(this, arguments);
    var t = this.option("editing");
    return e || t.allowAdding;
  },
  _isDefaultButtonVisible: function (e, t) {
    var n = this.callBase.apply(this, arguments);
    var i = t.row;
    if (e.name === "add") {
      return this.allowAdding(t) && i.rowIndex !== this._getVisibleEditRowIndex() && !i.removed && !i.isNewRow;
    } else {
      return n;
    }
  },
  _getEditingButtons: function (e) {
    var t = this.callBase.apply(this, arguments);
    if (!e.column.buttons) {
      t.unshift(this._getButtonConfig("add", e));
    }
    return t;
  },
  _beforeSaveEditData: function (e) {
    var t = this._dataController;
    var n = this.callBase.apply(this, arguments);
    if (e && e.type !== "insert") {
      var i = t == null ? undefined : t.store();
      var o = i == null ? undefined : i.key();
      if (!(0, r.isDefined)(o)) {
        throw l.default.Error("E1045");
      }
    }
    return n;
  },
  addRowByRowIndex: function (e) {
    var t = this.getController("data").getVisibleRows()[e];
    return this.addRow(t ? t.key : undefined);
  },
  addRow: function (e = this.option("rootValue")) {
    return this.callBase.call(this, e);
  },
  _addRowCore: function (e, t, n) {
    var i = this;
    var a = this.callBase;
    var r = this.option("rootValue");
    var s = this.getController("data");
    var l = s.dataSource().createParentIdGetter();
    if ((t = l(e)) !== undefined && t !== r && !s.isRowExpanded(t)) {
      var u = new o.Deferred();
      s.expandRow(t).done(function () {
        setTimeout(function () {
          a.call(i, e, t, n).done(u.resolve).fail(u.reject);
        });
      }).fail(u.reject);
      return u.promise();
    }
    return a.call(this, e, t, n);
  },
  _initNewRow: function (e, t) {
    var n = this.getController("data");
    var i = n.dataSource();
    var o = i.createParentIdSetter();
    o(e.data, t);
    return this.callBase.apply(this, arguments);
  },
  allowAdding: function (e) {
    return this._allowEditAction("allowAdding", e);
  },
  _needToCloseEditableCell: function (e) {
    return this.callBase.apply(this, arguments) || e.closest(`.dx-treelist-icon-container`).length && this.isEditing();
  },
  getButtonLocalizationNames: function () {
    var e = this.callBase.apply(this);
    e.add = "dxTreeList-editingAddRowToNode";
    return e;
  }
});
var p = u.editingModule.extenders.views.rowsView._rowClick;
var g = u.editingModule.extenders.views.rowsView._rowDblClick;
function m(e) {
  var t = (0, i.default)(e.event.target);
  var n = e.event.type === "dxdblclick" ? g : p;
  return !t.closest(`.dx-select-checkbox`).length && !_.call(this, e, n);
}
function _(e, t) {
  return !(0, i.default)(e.event.target).closest(`.dx-treelist-icon-container`).length && (t.call(this, e), true);
}
var v = (0, a.extend)({}, u.editingModule.extenders.views.rowsView, {
  _renderCellCommandContent: function (e, t) {
    var n = this._editingController;
    var i = t.row && n.isEditRow(t.row.rowIndex);
    var o = t.isEditing || i;
    return !o && this.callBase.apply(this, arguments);
  },
  _rowClick: function (e) {
    if (m.call(this, e)) {
      this.callBase.apply(this, arguments);
    }
  },
  _rowDblClick: function (e) {
    if (m.call(this, e)) {
      this.callBase.apply(this, arguments);
    }
  }
});
c.default.registerModule("editing", {
  defaultOptions: function () {
    return (0, a.extend)(true, u.editingModule.defaultOptions(), {
      editing: {
        texts: {
          addRowToNode: s.default.format("dxTreeList-editingAddRowToNode")
        }
      }
    });
  },
  controllers: {
    editing: f
  },
  extenders: {
    controllers: (0, a.extend)(true, {}, u.editingModule.extenders.controllers, {
      data: {
        changeRowExpand: function () {
          this._editingController.refresh();
          return this.callBase.apply(this, arguments);
        }
      }
    }),
    views: {
      rowsView: v,
      headerPanel: u.editingModule.extenders.views.headerPanel
    }
  }
});