exports.getPublicElement = function (e) {
  return n(e);
};
exports.setPublicElementWrapper = function (e) {
  n = e;
};
function n(e) {
  return e && e.get(0);
}