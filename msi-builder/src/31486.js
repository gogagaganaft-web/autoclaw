exports.hasResourceValue = undefined;
var i = require("./35922.js");
var o = require("./20576.js");
exports.hasResourceValue = function (e, t) {
  return (0, i.isDefined)(e.find(function (e) {
    return (0, o.equalByValue)(e, t);
  }));
};