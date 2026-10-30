exports.exportDataGrid = function (e) {
  return r.Export.export(function (e) {
    if (!(0, o.isDefined)(e) || !(0, o.isObject)(e)) {
      throw Error("The \"exportDataGrid\" method requires a configuration object.");
    }
    if (!(0, o.isDefined)(e.component) || !(0, o.isObject)(e.component) || e.component.NAME !== "dxDataGrid") {
      throw Error("The \"component\" field must contain a DataGrid instance.");
    }
    if (!(0, o.isDefined)(e.jsPDFDocument) || !(0, o.isObject)(e.jsPDFDocument)) {
      throw Error("The \"jsPDFDocument\" field must contain a jsPDF instance.");
    }
    if ((0, o.isDefined)(e.autoTableOptions)) {
      a.default.log("W0001", "Export", "autoTableOptions", "22.1", `You can migrate from exporting to PDF with the AutoTable plugin to a new export system. See the following topic for more information: https://supportcenter.kaesbt.ru/ticket/details/t1077554`);
    }
    return r.Export.getFullOptions(e);
  }(e));
};
var i;
var o = require("./35922.js");
var a = (i = require("./17381.js")) && i.__esModule ? i : {
  default: i
};
var r = require("./17195.js");