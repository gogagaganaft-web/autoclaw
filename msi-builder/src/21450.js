exports.BasePagerProps = undefined;
var i;
var o = (i = require("./28109.js")) && i.__esModule ? i : {
  default: i
};
var a = Object.defineProperties({
  gridCompatibility: true,
  showInfo: false,
  displayMode: "adaptive",
  maxPagesCount: 10,
  pageCount: 10,
  visible: true,
  hasKnownLastPage: true,
  pagesNavigatorVisible: "auto",
  showPageSizes: true,
  pageSizes: Object.freeze([5, 10]),
  showNavigationButtons: false,
  totalCount: 0
}, {
  label: {
    get: function () {
      return o.default.format("dxPager-ariaLabel");
    },
    configurable: true,
    enumerable: true
  }
});
exports.BasePagerProps = a;