exports.GanttDialog = undefined;
var i = s(require("./51495.js"));
var o = s(require("./17737.js"));
require("./31362.js");
require("./14305.js");
var a = s(require("./91500.js"));
var r = s(require("./28109.js"));
function s(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
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
require("./56757.js");
require("./15728.js");
var d = function () {
  function e(e, t) {
    this._popupInstance = e._createComponent(t, i.default);
    this.infoMap = {
      TaskEdit: h,
      Resources: f,
      Confirmation: p,
      ConstraintViolation: g
    };
  }
  var t = e.prototype;
  t._apply = function () {
    if (this._dialogInfo.isValidated()) {
      var e = this._dialogInfo.getResult();
      this._callback(e);
      this.hide();
    }
  };
  t.show = function (e, t, n, i, o) {
    this._callback = n;
    this._afterClosing = i;
    if (this.infoMap[e]) {
      var a = this._popupInstance._isVisible() && this._dialogInfo && this._dialogInfo instanceof this.infoMap[e];
      this._dialogInfo = new this.infoMap[e](t, this._apply.bind(this), this.hide.bind(this), o);
      this._popupInstance.option({
        showTitle: !!this._dialogInfo.getTitle(),
        title: this._dialogInfo.getTitle(),
        toolbarItems: this._dialogInfo.getToolbarItems(),
        maxWidth: this._dialogInfo.getMaxWidth(),
        height: this._dialogInfo.getHeight(),
        contentTemplate: this._dialogInfo.getContentTemplate()
      });
      if (this._afterClosing) {
        this._popupInstance.option("onHidden", this._afterClosing);
      }
      if (!a) {
        this._popupInstance.show();
      }
    }
  };
  t.hide = function () {
    this._popupInstance.hide();
    if (this._afterClosing) {
      this._afterClosing();
    }
  };
  return e;
}();
exports.GanttDialog = d;
var c = function () {
  function e(e, t, n, i) {
    this._parameters = e;
    this._applyAction = t;
    this._hideAction = n;
    this._editingOptions = i;
  }
  var t = e.prototype;
  t._getFormItems = function () {
    return {};
  };
  t._getFormCssClass = function () {
    return "";
  };
  t._getFormData = function () {
    return this._parameters;
  };
  t._updateParameters = function () {};
  t._getOkToolbarItem = function () {
    return this._getToolbarItem("OK", this._applyAction);
  };
  t._getCancelToolbarItem = function () {
    return this._getToolbarItem("Cancel", this._hideAction);
  };
  t._getYesToolbarItem = function () {
    return this._getToolbarItem("Yes", this._applyAction);
  };
  t._getNoToolbarItem = function () {
    return this._getToolbarItem("No", this._hideAction);
  };
  t._getToolbarItem = function (e, t) {
    return {
      widget: "dxButton",
      toolbar: "bottom",
      options: {
        text: r.default.format(e),
        onClick: t
      }
    };
  };
  t.getTitle = function () {
    return "";
  };
  t.getToolbarItems = function () {
    if (this._editingOptions.enabled) {
      return [this._getOkToolbarItem(), this._getCancelToolbarItem()];
    } else {
      return [this._getCancelToolbarItem()];
    }
  };
  t.getMaxWidth = function () {
    return 400;
  };
  t.getHeight = function () {
    return "auto";
  };
  t.getContentTemplate = function () {
    var e = this;
    return function (t) {
      e._form = new o.default(t, {
        formData: e._getFormData(),
        items: e._getFormItems(),
        elementAttr: {
          class: e._getFormCssClass()
        },
        rtlEnabled: false
      });
      return t;
    };
  };
  t.getResult = function () {
    var e = this.getFormData();
    this._updateParameters(e);
    return this._parameters;
  };
  t.getFormData = function () {
    return this._form && this._form.option("formData");
  };
  t.isValidated = function () {
    return true;
  };
  return e;
}();
var h = function (e) {
  function t() {
    return e.apply(this, arguments) || this;
  }
  l(t, e);
  var n = t.prototype;
  n.getTitle = function () {
    return r.default.format("dxGantt-dialogTaskDetailsTitle");
  };
  n._getFormItems = function () {
    var e = this;
    var t = !this._editingOptions.enabled || !this._editingOptions.allowTaskUpdating;
    var n = t || !this._parameters.enableRangeEdit;
    return [{
      dataField: "title",
      editorType: "dxTextBox",
      label: {
        text: r.default.format("dxGantt-dialogTitle")
      },
      editorOptions: {
        readOnly: t || this._isReadOnlyField("title")
      },
      visible: !this._isHiddenField("title")
    }, {
      dataField: "start",
      editorType: "dxDateBox",
      label: {
        text: r.default.format("dxGantt-dialogStartTitle")
      },
      editorOptions: {
        type: "datetime",
        width: "100%",
        readOnly: n || this._isReadOnlyField("start")
      },
      visible: !this._isHiddenField("start"),
      validationRules: [{
        type: "required",
        message: r.default.format("validation-required-formatted", r.default.format("dxGantt-dialogStartTitle"))
      }, {
        type: "custom",
        validationCallback: function (t) {
          if (e._parameters.isValidationRequired) {
            var n = e._parameters.getCorrectDateRange(e._parameters.id, t.value, e._parameters.end);
            if (n.start.getTime() !== t.value.getTime()) {
              t.rule.message = e._getValidationMessage(true, n.start);
              return false;
            }
          }
          return true;
        }
      }]
    }, {
      dataField: "end",
      editorType: "dxDateBox",
      label: {
        text: r.default.format("dxGantt-dialogEndTitle")
      },
      editorOptions: {
        type: "datetime",
        width: "100%",
        readOnly: n || this._isReadOnlyField("end")
      },
      visible: !this._isHiddenField("end"),
      validationRules: [{
        type: "required",
        message: r.default.format("validation-required-formatted", r.default.format("dxGantt-dialogEndTitle"))
      }, {
        type: "custom",
        validationCallback: function (t) {
          if (e._parameters.isValidationRequired) {
            var n = e._parameters.getCorrectDateRange(e._parameters.id, e._parameters.start, t.value);
            if (n.end.getTime() !== t.value.getTime()) {
              t.rule.message = e._getValidationMessage(false, n.end);
              return false;
            }
          }
          return true;
        }
      }]
    }, {
      dataField: "progress",
      editorType: "dxNumberBox",
      label: {
        text: r.default.format("dxGantt-dialogProgressTitle")
      },
      editorOptions: {
        showSpinButtons: true,
        min: 0,
        max: 1,
        format: "#0%",
        step: 0.01,
        readOnly: n || this._isReadOnlyField("progress")
      },
      visible: !this._isHiddenField("progress")
    }, {
      dataField: "assigned.items",
      editorType: "dxTagBox",
      label: {
        text: r.default.format("dxGantt-dialogResourcesTitle")
      },
      editorOptions: {
        readOnly: t || !this._editingOptions.allowTaskResourceUpdating,
        dataSource: this._parameters.resources.items,
        displayExpr: "text",
        buttons: [{
          name: "editResources",
          location: "after",
          options: {
            disabled: !this._editingOptions.allowResourceAdding && !this._editingOptions.allowResourceDeleting,
            text: "...",
            hint: r.default.format("dxGantt-dialogEditResourceListHint"),
            onClick: function () {
              e._parameters.showResourcesDialogCommand.execute(function () {
                e._parameters.showTaskEditDialogCommand.execute();
              });
            }
          }
        }]
      }
    }];
  };
  n._getValidationMessage = function (e, t) {
    if (e) {
      return r.default.format("dxGantt-dialogStartDateValidation", this._getFormattedDateText(t));
    } else {
      return r.default.format("dxGantt-dialogEndDateValidation", this._getFormattedDateText(t));
    }
  };
  n._getFormattedDateText = function (e) {
    if (e) {
      return a.default.format(e, "shortDateShortTime");
    } else {
      return "";
    }
  };
  n._isReadOnlyField = function (e) {
    return this._parameters.readOnlyFields.indexOf(e) > -1;
  };
  n._isHiddenField = function (e) {
    return this._parameters.hiddenFields.indexOf(e) > -1;
  };
  n._getFormData = function () {
    var e = {};
    for (var t in this._parameters) {
      e[t] = t === "progress" ? this._parameters[t] / 100 : this._parameters[t];
    }
    return e;
  };
  n._updateParameters = function (e) {
    this._parameters.title = e.title;
    this._parameters.start = e.start;
    this._parameters.end = e.end;
    this._parameters.progress = e.progress * 100;
    this._parameters.assigned = e.assigned;
  };
  n.isValidated = function () {
    var e;
    var t = (e = this._form) === null || e === undefined ? undefined : e.validate();
    if (t == null) {
      return undefined;
    } else {
      return t.isValid;
    }
  };
  return t;
}(c);
var f = function (e) {
  function t() {
    return e.apply(this, arguments) || this;
  }
  l(t, e);
  var n = t.prototype;
  n.getTitle = function () {
    return r.default.format("dxGantt-dialogResourceManagerTitle");
  };
  n._getFormItems = function () {
    var e = this;
    return [{
      label: {
        visible: false
      },
      dataField: "resources.items",
      editorType: "dxList",
      editorOptions: {
        allowItemDeleting: this._editingOptions.enabled && this._editingOptions.allowResourceDeleting,
        itemDeleteMode: "static",
        selectionMode: "none",
        items: this._parameters.resources.items,
        height: 250,
        noDataText: r.default.format("dxGantt-dialogEditNoResources"),
        onInitialized: function (t) {
          e.list = t.component;
        },
        onItemDeleted: function (t) {
          e._parameters.resources.remove(t.itemData);
        }
      }
    }, {
      label: {
        visible: false
      },
      editorType: "dxTextBox",
      editorOptions: {
        readOnly: !this._editingOptions.enabled || !this._editingOptions.allowResourceAdding,
        onInitialized: function (t) {
          e.textBox = t.component;
        },
        onInput: function (e) {
          var t = e.component.getButton("addResource");
          var n = e.component.option("text");
          t.option("disabled", n.length === 0);
        },
        buttons: [{
          name: "addResource",
          location: "after",
          options: {
            text: r.default.format("dxGantt-dialogButtonAdd"),
            disabled: true,
            onClick: function (t) {
              var n = e._parameters.resources.createItem();
              n.text = e.textBox.option("text");
              e._parameters.resources.add(n);
              e.list.option("items", e._parameters.resources.items);
              e.list.scrollToItem(n);
              e.textBox.reset();
              t.component.option("disabled", true);
            }
          }
        }]
      }
    }];
  };
  return t;
}(c);
var p = function (e) {
  function t() {
    return e.apply(this, arguments) || this;
  }
  l(t, e);
  var n = t.prototype;
  n.getContentTemplate = function () {
    var e = this;
    return function (t) {
      return e._getConfirmMessage();
    };
  };
  n._getConfirmMessage = function () {
    switch (this._parameters.type) {
      case 0:
        return r.default.format("dxGantt-dialogTaskDeleteConfirmation");
      case 1:
        return r.default.format("dxGantt-dialogDependencyDeleteConfirmation");
      case 2:
        return r.default.format("dxGantt-dialogResourcesDeleteConfirmation", this._parameters.message);
      default:
        return "";
    }
  };
  n.getToolbarItems = function () {
    return [this._getYesToolbarItem(), this._getNoToolbarItem()];
  };
  return t;
}(c);
var g = function (e) {
  function t() {
    return e.apply(this, arguments) || this;
  }
  l(t, e);
  var n = t.prototype;
  n._getFormItems = function () {
    var e;
    var t = this._parameters.hasCriticalErrors;
    var n = this._parameters.errorsCount > 1;
    var i = [];
    var o = n ? "dxGantt-dialogDeleteDependenciesMessage" : "dxGantt-dialogDeleteDependencyMessage";
    var a = n ? "dxGantt-dialogMoveTaskAndKeepDependenciesMessage" : "dxGantt-dialogMoveTaskAndKeepDependencyMessage";
    e = t ? n ? "dxGantt-dialogConstraintCriticalViolationSeveralTasksMessage" : "dxGantt-dialogConstraintCriticalViolationMessage" : n ? "dxGantt-dialogConstraintViolationSeveralTasksMessage" : "dxGantt-dialogConstraintViolationMessage";
    i.push({
      text: r.default.format("dxGantt-dialogCancelOperationMessage"),
      value: 0
    });
    i.push({
      text: r.default.format(o),
      value: 1
    });
    if (!t) {
      i.push({
        text: r.default.format(a),
        value: 2
      });
    }
    return [{
      template: r.default.format(e)
    }, {
      cssClass: "dx-cv-dialog-row",
      dataField: "option",
      label: {
        visible: false
      },
      editorType: "dxRadioGroup",
      editorOptions: {
        items: i,
        valueExpr: "value",
        value: 0
      }
    }];
  };
  n._getFormCssClass = function () {
    return "dx-cv-dialog";
  };
  n._updateParameters = function (e) {
    this._parameters.option = e.option;
  };
  return t;
}(c);