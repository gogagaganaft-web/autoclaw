function n(e) {
  var t = e.addedNodes;
  switch (e.type) {
    case "childList":
      t.forEach(function (e) {
        return typeof e.remove == "function" && e.remove();
      });
  }
}
exports.recordMutations = function (e, t) {
  var i = new MutationObserver(function () {});
  i.observe(e, {
    childList: true,
    subtree: false
  });
  t();
  var o = i.takeRecords();
  i.disconnect();
  return function () {
    return o.forEach(n);
  };
};