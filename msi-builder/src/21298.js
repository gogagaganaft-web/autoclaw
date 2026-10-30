var i = o(require("./62414.js"));
function o(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
if (o(require("./62387.js")).default) {
  i.default.registerExecutor({
    ngExpression: {
      execute: function (e) {
        if (typeof e.action == "string") {
          e.context.$eval(e.action);
        }
      }
    }
  });
}