var i;
var o = require("./13306.js");
var a = require("./39830.js");
var r = (i = require("./12500.js")) && i.__esModule ? i : {
  default: i
};
var s = (0, o.extend)({}, a.validatingModule.extenders.controllers.editing);
delete s.processItems;
delete s.processDataItem;
r.default.registerModule("validating", {
  defaultOptions: a.validatingModule.defaultOptions,
  controllers: a.validatingModule.controllers,
  extenders: {
    controllers: {
      editing: s,
      editorFactory: a.validatingModule.extenders.controllers.editorFactory
    },
    views: a.validatingModule.extenders.views
  }
});