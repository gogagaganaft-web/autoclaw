var i = require("./36991.js");
var o = require("./17381.js");
module.exports = i.data = i.data || {};
Object.defineProperty(i.data, "errorHandler", {
  get: function () {
    return require("./18438.js").errorHandler;
  },
  set: function (e) {
    o.log("W0003", "MSI.data", "errorHandler", "21.1", "Use the 'setErrorHandler' method instead");
    require("./18438.js").setErrorHandler(e);
  }
});
Object.defineProperty(i.data, "_errorHandler", {
  get: function () {
    return require("./18438.js").handleError;
  },
  set: function (e) {
    o.log("W0003", "MSI.data", "_errorHandler", "21.1", "Use the 'setErrorHandler' method instead");
    require("./18438.js").setErrorHandler(e);
  }
});
i.data.setErrorHandler = require("./18438.js").setErrorHandler;
i.data.DataSource = require("./33546.js");
i.data.query = require("./96687.js");
i.data.Store = require("./67403.js");
i.data.ArrayStore = require("./26562.js");
i.data.CustomStore = require("./88036.js");
i.data.LocalStore = require("./82837.js");
i.data.base64_encode = require("./16454.js").base64_encode;
i.data.applyChanges = require("./36893.js");
i.data.Guid = require("./73176.js");
i.data.utils = {};
i.data.utils.compileGetter = require("./47617.js").compileGetter;
i.data.utils.compileSetter = require("./47617.js").compileSetter;
i.EndpointSelector = require("./8162.js");
i.data.queryImpl = require("./77549.js").queryImpl;
i.data.queryAdapters = require("./16135.js");
var a = require("./16454.js");
i.data.utils.normalizeBinaryCriterion = a.normalizeBinaryCriterion;
i.data.utils.normalizeSortingInfo = a.normalizeSortingInfo;
i.data.utils.errorMessageFromXhr = a.errorMessageFromXhr;
i.data.utils.aggregators = a.aggregators;
i.data.utils.keysEqual = a.keysEqual;
i.data.utils.isDisjunctiveOperator = a.isDisjunctiveOperator;
i.data.utils.isConjunctiveOperator = a.isConjunctiveOperator;
i.data.utils.processRequestResultLock = a.processRequestResultLock;
i.data.utils.toComparable = require("./47617.js").toComparable;
i.data.utils.multiLevelGroup = require("./99236.js").multiLevelGroup;
i.data.utils.arrangeSortingInfo = require("./99236.js").arrangeSortingInfo;
i.data.utils.normalizeDataSourceOptions = require("./9234.js").normalizeDataSourceOptions;