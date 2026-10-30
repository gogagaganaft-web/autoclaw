exports.toNumber = function (e) {
  if (e) {
    return Number(e.replace("px", ""));
  } else {
    return 0;
  }
};