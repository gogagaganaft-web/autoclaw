import { createApp } from 'vue';
import { appInfoInjectKey } from '@/types/app-info';
import { themeService } from '@/theme/theme-service';
import App from './App.vue';
import { router } from './router';
import { setWidgetAppContext } from './msi-vue/create-widget.js';

import './styles.scss';

// index.html loads Globalize and Russian CLDR messages (js/new_ru.js) before the app module.
// The locale must be set before widgets are created, otherwise they format dates/numbers in English.
window.Globalize?.locale('ru');

// Same default as the original MSI app: currency formats (e.g. the chart value axis) show rubles.
const msi = (window as unknown as { MSI?: { config?: (options: { defaultCurrency?: string }) => void } }).MSI;
try {
  msi?.config?.({ defaultCurrency: 'RUB' });
} catch (e) {
  console.warn('[main] MSI.config(defaultCurrency) failed', e);
}

themeService.setAppTheme().then(() => {
  const app = createApp(App);
  // Шаблоны MSI рендерятся вне дерева приложения: без контекста inject
  // (router и др.) в них не работает — см. create-widget.js renderVNodes.
  setWidgetAppContext((app as unknown as { _context: object })._context);

  app.use(router);
  app.provide(appInfoInjectKey, {
    title: 'Генератор отчетов',
  });

  app.mount('#app');
});