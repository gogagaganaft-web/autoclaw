exports.normalizeStartDate = exports.normalizeEndDate = undefined;
function n(e, t, n, i) {
  if (!e.considerTime) {
    return t;
  }
  var o = new Date(t);
  o.setHours(n.getHours(), n.getMinutes(), n.getSeconds());
  var a = e.startDayHour;
  var r = e.endDayHour;
  var s = e.appointmentSettings.allDay;
  var l = new Date(t);
  var u = new Date(t);
  l.setHours(a, 0, 0, 0);
  u.setHours(r, 0, 0, 0);
  if (i ? o < l.getTime() || o >= u.getTime() : o <= l.getTime() || o > u.getTime()) {
    o = s ? l : u;
  }
  return o;
}
exports.normalizeStartDate = function (e, t, i) {
  return n(e, t, i, true);
};
exports.normalizeEndDate = function (e, t, i) {
  return n(e, t, i, false);
};