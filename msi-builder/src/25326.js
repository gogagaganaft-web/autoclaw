Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ERROR_MSG = "a runtime error occured! Use Inferno in development environment to find the error.";
exports.isNullOrUndef = function (e) {
  return e == null;
};
exports.isInvalid = function (e) {
  return e === null || e === false || e === true || e === undefined;
};
exports.isFunction = function (e) {
  return typeof e == "function";
};
exports.isNull = function (e) {
  return e === null;
};
exports.throwError = function (e) {
  e ||= exports.ERROR_MSG;
  throw new Error("Inferno Error: " + e);
};