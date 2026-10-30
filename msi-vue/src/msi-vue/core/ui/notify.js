export default function notify(message, type, options) {
  if (window.MSI?.ui?.notify) return window.MSI.ui.notify(message, type, options);
  console.warn('[msi-vue] MSI.ui.notify not found:', message);
}