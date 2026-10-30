export function formatDate(value, format) {
  if (window.MSI?.localization?.formatDate) return window.MSI.localization.formatDate(value, format);
  if (!value) return '';
  const date = value instanceof Date ? value : new Date(value);
  if (isNaN(date.getTime())) return String(value);
  if (format === 'longDate') return new Intl.DateTimeFormat('ru-RU', { dateStyle: 'long' }).format(date);
  if (format === 'shortDate') return new Intl.DateTimeFormat('ru-RU', { dateStyle: 'short' }).format(date);
  if (format === 'shortTime') return new Intl.DateTimeFormat('ru-RU', { timeStyle: 'short' }).format(date);
  return date.toLocaleString('ru-RU');
}
export function formatNumber(value, format) {
  if (window.MSI?.localization?.formatNumber) return window.MSI.localization.formatNumber(value, format);
  if (value === null || value === undefined) return '';
  const num = Number(value);
  if (isNaN(num)) return String(value);
  if (format === 'currency') return new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB' }).format(num);
  if (format === 'percent') return new Intl.NumberFormat('ru-RU', { style: 'percent' }).format(num);
  if (format === 'fixedPoint') return new Intl.NumberFormat('ru-RU', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(num);
  return new Intl.NumberFormat('ru-RU').format(num);
}
export function formatMessage(message) {
  if (window.MSI?.localization?.formatMessage) return window.MSI.localization.formatMessage(message);
  return message;
}
export default { formatDate, formatNumber, formatMessage };