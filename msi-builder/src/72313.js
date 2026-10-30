Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VIEWPORT_TOP_NEW_ROW_POSITION = exports.VIEWPORT_BOTTOM_NEW_ROW_POSITION = exports.TARGET_COMPONENT_NAME = exports.ROW_SELECTED_CLASS = exports.ROW_SELECTED = exports.ROW_REMOVED = exports.ROW_MODIFIED = exports.ROW_INSERTED = exports.ROW_CLASS = exports.ROW_BASED_MODES = exports.READONLY_CLASS = exports.PAGE_TOP_NEW_ROW_POSITION = exports.PAGE_BOTTOM_NEW_ROW_POSITION = exports.MODES_WITH_DELAYED_FOCUS = exports.METHOD_NAMES = exports.LINK_CLASS = exports.LAST_NEW_ROW_POSITION = exports.INSERT_INDEX = exports.FORM_BUTTONS_CONTAINER_CLASS = exports.FOCUS_OVERLAY_CLASS = exports.FOCUSABLE_ELEMENT_SELECTOR = exports.FOCUSABLE_ELEMENT_CLASS = exports.FIRST_NEW_ROW_POSITION = exports.EDIT_ROW = exports.EDIT_POPUP_FORM_CLASS = exports.EDIT_POPUP_CLASS = exports.EDIT_MODE_ROW = exports.EDIT_MODE_POPUP = exports.EDIT_MODE_FORM = exports.EDIT_MODE_CELL = exports.EDIT_MODE_BATCH = exports.EDIT_MODES = exports.EDIT_LINK_CLASS = exports.EDIT_ICON_CLASS = exports.EDIT_FORM_ITEM_CLASS = exports.EDIT_FORM_CLASS = exports.EDIT_BUTTON_CLASS = exports.EDITOR_CELL_CLASS = exports.EDITORS_INPUT_SELECTOR = exports.EDITING_POPUP_OPTION_NAME = exports.EDITING_NAMESPACE = exports.EDITING_FORM_OPTION_NAME = exports.EDITING_EDITROWKEY_OPTION_NAME = exports.EDITING_EDITCOLUMNNAME_OPTION_NAME = exports.EDITING_CHANGES_OPTION_NAME = exports.DROPDOWN_EDITOR_OVERLAY_CLASS = exports.DEFAULT_START_EDIT_ACTION = exports.DATA_ROW_CLASS = exports.DATA_EDIT_DATA_UPDATE_TYPE = exports.DATA_EDIT_DATA_REMOVE_TYPE = exports.DATA_EDIT_DATA_INSERT_TYPE = exports.COMMAND_EDIT_WITH_ICONS_CLASS = exports.COMMAND_EDIT_CLASS = exports.CELL_MODIFIED_CLASS = exports.CELL_MODIFIED = exports.CELL_FOCUS_DISABLED_CLASS = exports.BUTTON_NAMES = exports.BUTTON_CLASS = exports.ADD_ROW_BUTTON_CLASS = exports.ACTION_OPTION_NAMES = undefined;
var i;
var o = (i = require("./41183.js")) && i.__esModule ? i : {
  default: i
};
exports.EDITOR_CELL_CLASS = "dx-editor-cell";
exports.ROW_CLASS = "dx-row";
exports.CELL_MODIFIED_CLASS = "dx-cell-modified";
exports.ROW_SELECTED_CLASS = "dx-selection";
exports.EDIT_FORM_CLASS = "edit-form";
exports.DATA_EDIT_DATA_INSERT_TYPE = "insert";
exports.DATA_EDIT_DATA_REMOVE_TYPE = "remove";
exports.EDITING_POPUP_OPTION_NAME = "editing.popup";
exports.EDITING_FORM_OPTION_NAME = "editing.form";
exports.EDITING_EDITROWKEY_OPTION_NAME = "editing.editRowKey";
exports.EDITING_EDITCOLUMNNAME_OPTION_NAME = "editing.editColumnName";
exports.TARGET_COMPONENT_NAME = "targetComponent";
exports.EDITORS_INPUT_SELECTOR = "input:not([type='hidden'])";
var a = `[tabindex], input:not([type='hidden'])`;
exports.FOCUSABLE_ELEMENT_SELECTOR = a;
exports.EDIT_MODE_BATCH = "batch";
exports.EDIT_MODE_ROW = "row";
exports.EDIT_MODE_CELL = "cell";
exports.EDIT_MODE_FORM = "form";
exports.EDIT_MODE_POPUP = "popup";
exports.FIRST_NEW_ROW_POSITION = "first";
exports.LAST_NEW_ROW_POSITION = "last";
exports.PAGE_BOTTOM_NEW_ROW_POSITION = "pageBottom";
exports.PAGE_TOP_NEW_ROW_POSITION = "pageTop";
exports.VIEWPORT_BOTTOM_NEW_ROW_POSITION = "viewportBottom";
exports.VIEWPORT_TOP_NEW_ROW_POSITION = "viewportTop";
var r = ["batch", "row", "cell", "form", "popup"];
exports.EDIT_MODES = r;
var s = ["row", "form", "popup"];
exports.ROW_BASED_MODES = s;
var l = ["row", "form"];
exports.MODES_WITH_DELAYED_FOCUS = l;
exports.READONLY_CLASS = "readonly";
exports.LINK_CLASS = "dx-link";
exports.ROW_SELECTED = "dx-selection";
exports.EDIT_BUTTON_CLASS = "dx-edit-button";
exports.COMMAND_EDIT_CLASS = "dx-command-edit";
var u = `dx-command-edit-with-icons`;
exports.COMMAND_EDIT_WITH_ICONS_CLASS = u;
exports.INSERT_INDEX = "__DX_INSERT_INDEX__";
exports.ROW_INSERTED = "dx-row-inserted";
exports.ROW_MODIFIED = "dx-row-modified";
exports.CELL_MODIFIED = "dx-cell-modified";
exports.EDITING_NAMESPACE = "dxDataGridEditing";
exports.CELL_FOCUS_DISABLED_CLASS = "dx-cell-focus-disabled";
exports.DATA_EDIT_DATA_UPDATE_TYPE = "update";
exports.DEFAULT_START_EDIT_ACTION = "click";
exports.EDIT_LINK_CLASS = {
  save: "dx-link-save",
  cancel: "dx-link-cancel",
  edit: "dx-link-edit",
  undelete: "dx-link-undelete",
  delete: "dx-link-delete",
  add: "dx-link-add"
};
exports.EDIT_ICON_CLASS = {
  save: "save",
  cancel: "revert",
  edit: "edit",
  undelete: "revert",
  delete: "trash",
  add: "add"
};
exports.METHOD_NAMES = {
  edit: "editRow",
  delete: "deleteRow",
  undelete: "undeleteRow",
  save: "saveEditData",
  cancel: "cancelEditData",
  add: "addRowByRowIndex"
};
exports.ACTION_OPTION_NAMES = {
  add: "allowAdding",
  edit: "allowUpdating",
  delete: "allowDeleting"
};
exports.BUTTON_NAMES = ["edit", "save", "cancel", "delete", "undelete"];
exports.EDITING_CHANGES_OPTION_NAME = "editing.changes";
exports.FOCUS_OVERLAY_CLASS = "focus-overlay";
exports.ADD_ROW_BUTTON_CLASS = "addrow-button";
exports.DROPDOWN_EDITOR_OVERLAY_CLASS = "dx-dropdowneditor-overlay";
exports.DATA_ROW_CLASS = "dx-data-row";
exports.ROW_REMOVED = "dx-row-removed";
var d = !!o.default.IS_RENOVATED_WIDGET;
exports.EDIT_FORM_ITEM_CLASS = "edit-form-item";
exports.EDIT_POPUP_CLASS = "edit-popup";
exports.EDIT_POPUP_FORM_CLASS = "edit-popup-form";
var c = d ? "dx-scrollable" : "dx-scrollable-container";
exports.FOCUSABLE_ELEMENT_CLASS = c;
exports.BUTTON_CLASS = "dx-button";
exports.FORM_BUTTONS_CONTAINER_CLASS = "form-buttons-container";
exports.EDIT_ROW = "dx-edit-row";