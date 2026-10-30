var i = require("./60642.js");
var o = (0, i.getAlgorithm)("sliceanddice");
(0, i.addAlgorithm)("rotatedsliceanddice", function (e) {
  e.isRotated = !e.isRotated;
  return o.call(this, e);
});