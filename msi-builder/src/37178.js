exports.default = undefined;
var i = require("./35922.js");
var o = {
  _getSpecificDataSourceOption: function () {
    var e = this.option("dataSource");
    var t = false;
    var n = {};
    if (this._getGroupedOption() && function (e) {
      return Array.isArray(e) && e.every(function (e) {
        return Object.keys(e).length === 2 && "key" in e && "items" in e && Array.isArray(e.items);
      });
    }(e)) {
      n = e.reduce(function (e, n) {
        var o = n.items.map(function (e) {
          if (!(0, i.isObject)(e)) {
            e = {
              text: e
            };
            t = true;
          }
          if (!("key" in e)) {
            e.key = n.key;
          }
          return e;
        });
        return e.concat(o);
      }, []);
      e = {
        store: {
          type: "array",
          data: n
        },
        group: {
          selector: "key",
          keepInitialKeyOrder: true
        }
      };
      if (t) {
        e.searchExpr = "text";
      }
    }
    return e;
  }
};
exports.default = o;
module.exports = exports.default;
module.exports.default = exports.default;