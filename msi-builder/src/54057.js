Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.USER_STATE_FIELD_NAMES_15_1 = exports.USER_STATE_FIELD_NAMES = exports.MAX_SAFE_INTEGER = exports.IGNORE_COLUMN_OPTION_NAMES = exports.GROUP_LOCATION = exports.GROUP_COMMAND_COLUMN_NAME = exports.DETAIL_COMMAND_COLUMN_NAME = exports.DEFAULT_COLUMN_OPTIONS = exports.DATATYPE_OPERATIONS = exports.COMMAND_EXPAND_CLASS = exports.COLUMN_OPTION_REGEXP = exports.COLUMN_INDEX_OPTIONS = exports.COLUMN_CHOOSER_LOCATION = undefined;
var n = ["filterValues", "filterType", "fixed", "fixedPosition"];
exports.USER_STATE_FIELD_NAMES_15_1 = n;
var i = ["visibleIndex", "dataField", "name", "dataType", "width", "visible", "sortOrder", "lastSortOrder", "sortIndex", "groupIndex", "filterValue", "bufferedFilterValue", "selectedFilterOperation", "bufferedSelectedFilterOperation", "added"].concat(n);
exports.USER_STATE_FIELD_NAMES = i;
exports.IGNORE_COLUMN_OPTION_NAMES = {
  visibleWidth: true,
  bestFitWidth: true,
  bufferedFilterValue: true
};
exports.COMMAND_EXPAND_CLASS = "dx-command-expand";
var o = Number.MAX_SAFE_INTEGER || 9007199254740991;
exports.MAX_SAFE_INTEGER = o;
exports.GROUP_COMMAND_COLUMN_NAME = "groupExpand";
exports.DETAIL_COMMAND_COLUMN_NAME = "detailExpand";
exports.COLUMN_OPTION_REGEXP = /columns\[(\d+)\]\.?/gi;
exports.DEFAULT_COLUMN_OPTIONS = {
  visible: true,
  showInColumnChooser: true
};
exports.DATATYPE_OPERATIONS = {
  number: ["=", "<>", "<", ">", "<=", ">=", "between"],
  string: ["contains", "notcontains", "startswith", "endswith", "=", "<>"],
  date: ["=", "<>", "<", ">", "<=", ">=", "between"],
  datetime: ["=", "<>", "<", ">", "<=", ">=", "between"]
};
exports.COLUMN_INDEX_OPTIONS = {
  visibleIndex: true,
  groupIndex: true,
  grouped: true,
  sortIndex: true,
  sortOrder: true
};
exports.GROUP_LOCATION = "group";
exports.COLUMN_CHOOSER_LOCATION = "columnChooser";