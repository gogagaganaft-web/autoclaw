# MSI + Vue

## апуск

```bash
pnpm install     # или npm install
pnpm dev         # dev-сервер Vite
pnpm build       # прод-сборка в dist/
pnpm preview     # предпросмотр прод-сборки
pnpm lint        # ESLint (flat config)
pnpm test:unit   # Vitest
```

## рхитектура

```
src/
├── msi-vue/                 # ост MSI <-> Vue: обёртки createWidget('dxXxx', props)
│   ├── index.js             # еэкспорт всех Dx* компонентов
│   ├── create-widget.js     # абрика: создаёт MSI-виджет в onMounted, синхронизирует опции
│   ├── <widget>/index.js    # о одному модулю на виджет (button, data-grid, chart, ...)
│   └── core/                # амена msi/*: localization, data_source, notify, themes, viz
├── pages/                   # аршрутизируемые страницы (crm-*, planning-*, analytics-*)
├── components/
│   ├── library/             # ереиспользуемые виджеты приложения (карточки, формы, панели)
│   └── utils/               # Служебные компоненты (тикер, попапы, формы)
├── layouts/                 # side-nav-outer-toolbar (основной), single-card (авторизация)
├── theme/
│   ├── theme-service.ts     # ереключение light/dark (localStorage + класс на <html>)
│   └── styles/app-variables.scss  # CSS-токены приложения поверх --dx-* переменных MSI
├── composables/             # use-chat-assistant, dashboard-ai-service (OpenAI demo)
├── shared/                  # бщие константы/конфиги форм
├── types/                   # TypeScript-типы домена
└── utils/                   # formatters, media-query
public/
└── msi/                     # Ядро MSI: msi.js, msi.css (light), orange.dark.css (dark), шрифты
packages/
└── dx-template-gallery-data # окальный пакет данных (mock-сервисы getContacts, getTasks, ...)
```

### ак заменить виджет

мпорты `msi-vue/...` в коде страниц менять не нужно — Vite-алиасы
(`vite.config.js`) и `paths` в `tsconfig.json` перенаправляют их в `src/msi-vue/`.

тобы добавить новый виджет:

1. Создайте `src/msi-vue/<widget>/index.js`:

   ```js
   import { createWidget } from '../create-widget.js';
   export const DxMyWidget = createWidget('dxMyWidget', ['prop1', 'prop2', 'onValueChanged']);
   ```

2. обавьте реэкспорт в `src/msi-vue/index.js`.
3. бедитесь, что `window.MSI.ui.dxMyWidget` (или `window.MSI.viz.dxMyWidget`) существует
   в `public/msi/msi.js`.

### Темы

- Светлая тема: `public/msi/msi.css` (подключена всегда).
- Тёмная тема: `public/msi/orange.dark.css` (тот же акцент `#ff5722`), подключается
  в `index.html` с `disabled` и включается `theme-service`.
- бе темы объявляют одинаковые `:root` `--dx-*` переменные, поэтому CSS-токены
  приложения (`src/theme/styles/app-variables.scss`) переключаются автоматически.
- `theme-service` дополнительно вешает классы `theme-light` / `theme-dark` на `<html>`
  для собственных правил приложения и хранит выбор в `localStorage['app-theme']`.

## собенности / известные ограничения

- **DxSortable** (`src/msi-vue/sortable/index.js`) — заглушка (обычный `<div>`):
  MSI Sortable конфликтует с Vue DOM. Kanban DnD не работает.
- MSI-виджеты создаются в `onMounted` и не имеют слотов/событий  —
  поддерживается синхронизация опций через `watch` и `template`-колбэки.
- утентификация моковая (`src/auth.ts`): любой вход успешен, пользователь — John Heart.

## обавление страницы

1. Создайте `src/pages/<name>.vue`.
2. арегистрируйте маршрут в `src/router.ts` (массив `...[...] .map(...)` с
   `meta.requiresAuth: true` и `layout: defaultLayout`).
3. обавьте пункт в `src/app-navigation.ts` для бокового меню.
