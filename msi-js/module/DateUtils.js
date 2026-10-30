// DateUtils.js
export class DateUtils {
  static startOfMonth(date) {
    if (!date) return null;
    return new Date(date.getFullYear(), date.getMonth(), 1);
  }

  static endOfMonth(date) {
    if (!date) return null;
    return new Date(date.getFullYear(), date.getMonth() + 1, 0);
  }

  static toISODate(date) {
    if (!date) return null;
    var y = date.getFullYear();
    var m = String(date.getMonth() + 1).padStart(2, "0");
    var d = String(date.getDate()).padStart(2, "0");
    return y + "-" + m + "-" + d;
  }

  static formatDate(date) {
    if (!date) return '';
    var options = { month: "short", year: "numeric" };
    return date.toLocaleDateString("ru-RU", options);
  }
}