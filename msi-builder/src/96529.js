exports.PagerProps = exports.InternalPagerProps = undefined;
var i = require("./21450.js");
function o() {
  return (o = Object.assign ? Object.assign.bind() : function (e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var i in n) {
        if (Object.prototype.hasOwnProperty.call(n, i)) {
          e[i] = n[i];
        }
      }
    }
    return e;
  }).apply(this, arguments);
}
var a = Object.create(Object.prototype, o(Object.getOwnPropertyDescriptors(i.BasePagerProps), Object.getOwnPropertyDescriptors({
  defaultPageSize: 5,
  pageSizeChange: function () {},
  defaultPageIndex: 1,
  pageIndexChange: function () {}
})));
exports.PagerProps = a;
var r = Object.create(Object.prototype, o(Object.getOwnPropertyDescriptors(i.BasePagerProps), Object.getOwnPropertyDescriptors({
  pageSize: 5,
  pageIndex: 1
})));
exports.InternalPagerProps = r;