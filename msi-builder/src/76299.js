var i;
exports.default = undefined;
var o = ((i = require("./38377.js")) && i.__esModule ? i : {
  default: i
}).default.inherit({
  ctor: function (e, t) {
    var n = this;
    this.editor = e;
    this.validator = t;
    this.validationRequestsCallbacks = [];
    function i(e) {
      n.validationRequestsCallbacks.forEach(function (t) {
        return t(e);
      });
    }
    e.validationRequest.add(i);
    e.on("disposing", function () {
      e.validationRequest.remove(i);
    });
  },
  getValue: function () {
    return this.editor.option("value");
  },
  getCurrentValidationError: function () {
    return this.editor.option("validationError");
  },
  bypass: function () {
    return this.editor.option("disabled");
  },
  applyValidationResults: function (e) {
    this.editor.option({
      validationErrors: e.brokenRules,
      validationStatus: e.status
    });
  },
  reset: function () {
    this.editor.reset();
  },
  focus: function () {
    this.editor.focus();
  }
});
exports.default = o;
module.exports = exports.default;
module.exports.default = exports.default;