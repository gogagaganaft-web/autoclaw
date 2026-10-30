exports.exportDataGrid = function (e) {
  return o.Export.export(function (e) {
    if (!(0, i.isDefined)(e) || !(0, i.isObject)(e)) {
      throw Error("The \"exportDataGrid\" method requires a configuration object.");
    }
    if (!(0, i.isDefined)(e.component) || !(0, i.isObject)(e.component) || e.component.NAME !== "dxDataGrid") {
      throw Error("The \"component\" field must contain a DataGrid instance.");
    }
    if (!(0, i.isDefined)(e.selectedRowsOnly)) {
      e.selectedRowsOnly = false;
    }
    return o.Export.getFullOptions(e);
  }(e));
};
var i = require("./35922.js");
var o = require("./18577.js");