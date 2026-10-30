# План DEV-этапа: Vue на MSI, порт 5050, хранилище в MS SQL `report`

Версия 1.0 от 2026-10-23. На согласование. Код не пишу до вашего «ок» по схеме БД.

---

## 1. Цель и границы

**Цель:** рабочий dev-контур, в котором Vue-приложение на MSI открывается на `:5050`,
показывает два отчёта (ОРН-ОСВ и ОРН-Платежи), а **определения отчётов, панель фильтров
и пользовательские состояния (фильтры + сохранённые виды) лежат в MS SQL** в новой БД `report`.

**В границах:** фронт `msi-vue`, бэкенд `gr-backend`, новая БД `report`, миграция данных.

**Вне границ:** прод (Debian, порты 7501–7504), Bitrix/Keycloak, `state-svc` из большого плана,
остальные 10 отчётов из Postgres, история изменений.

**Что не трогаем:** контейнер `gr-postgres` остаётся как источник для сверки и как путь отката.

---

## 2. Что уже есть (проверено)

| Компонент | Факт |
|---|---|
| `msi-vue` | TypeScript, Vue 3.5, Vite 8; `public/msi/msi.js` (сборка atom.js) грузится в `index.html`; алиасы Vite подменяют `devextreme-vue` → `src/msi-vue`, `devextreme/*` → `src/msi-vue/core/*` |
| Страницы | `reports-home` (13.6 КБ), `report-view` (96.7 КБ), `reports-admin` (50.9 КБ), профиль, вход |
| API-клиент | `src/services/reports-api.ts`: `/api/reports`, `/api/reports/:key`, `/api/reports/:key/data`, `/api/meta/databases`, `/api/toolbar`, `/api/execute`, `/api/export-excel` |
| `gr-backend` | Go 1.24, Gin 1.11, `go-mssqldb` 1.9.6 (данные из `kand`) + `lib/pq` (хранение отчётов в Postgres) |
| Postgres `report_states` | 6 таблиц; реально используются только `reports` (12 строк) и служебная запись `__toolbar_config__`. `report_filters`, `user_filter_states`, `report_access`, `users`, `roles` — **не читаются кодом** |
| Фильтры и виды | `src/utils/report-view-state.ts` — **localStorage** `gr.reportView.<key>`, `version: 1`, `modes[mode][]`, `selected`, `updatedAt` |
| Отчёты | `ОРН_5` = «ОСВ», `ОРН_9` = «Платежи», раздел `SEC_ОРН` (id 24); рядом `ОРН_6/7/8` и `КТР_1…4` |
| Порт dev | в `vite.config.js` не задан → 5173, конфликтует с `gr-frontend` |

Вывод: переносим **не из Postgres в MS SQL**, а закрываем два разрыва: (а) отчёты и панель
фильтров из Postgres → MS SQL, (б) состояния пользователя из localStorage → MS SQL.

---

## 3. Фронт на 5050

```js
// vite.config.js
server: {
  port: 5050,
  strictPort: true,          // падать, а не уезжать на 5174
  proxy: { '/api': { target: 'http://localhost:7070', changeOrigin: true } },
}
```

Больше во фронте ничего не меняется: MSI уже подключён через алиасы, `public/msi/msi.js` на месте.

---

## 4. Схема БД `report` (на согласование)

Сервер: тот же экземпляр MS SQL, что и `kand`. Collation БД — `Cyrillic_General_CI_AS`
(как у `kand`; иначе сравнение кириллических ключей и `title` поедет).

```sql
CREATE DATABASE report COLLATE Cyrillic_General_CI_AS;
GO
USE report;
GO

-- 1. Пользователи. Сейчас нужен один (dev-константа), но FK на него ставим сразу,
--    чтобы позже прикрутить Bitrix/Keycloak без переделки ссылок.
CREATE TABLE dbo.app_user (
  login        NVARCHAR(128) NOT NULL PRIMARY KEY,
  display_name NVARCHAR(200) NOT NULL,
  role_code    NVARCHAR(32)  NOT NULL DEFAULT 'admin',  -- admin | user
  is_active    BIT           NOT NULL DEFAULT 1,
  created_at   DATETIME2(3)  NOT NULL DEFAULT SYSUTCDATETIME()
);

-- 2. Отчёты: определение + SQL + конфиг вида (filters/views из rpt.js).
--    key в T-SQL — ключевое слово, поэтому колонка report_key; в API поле остаётся "key".
CREATE TABLE dbo.reports (
  id          INT           IDENTITY(1,1) PRIMARY KEY,
  report_key  NVARCHAR(64)  NOT NULL,
  title       NVARCHAR(200) NOT NULL,
  icon        NVARCHAR(64)  NULL,
  image       NVARCHAR(400) NULL,
  query_text  NVARCHAR(MAX) NULL,
  config      NVARCHAR(MAX) NOT NULL CONSTRAINT df_reports_config DEFAULT ('{}'),
  parent_id   INT           NULL,
  is_section  BIT           NOT NULL DEFAULT 0,
  sort_order  INT           NOT NULL DEFAULT 0,
  is_deleted  BIT           NOT NULL DEFAULT 0,
  created_at  DATETIME2(3)  NOT NULL DEFAULT SYSUTCDATETIME(),
  updated_at  DATETIME2(3)  NOT NULL DEFAULT SYSUTCDATETIME(),
  row_version ROWVERSION,
  CONSTRAINT uq_reports_key  UNIQUE (report_key),
  CONSTRAINT fk_reports_parent FOREIGN KEY (parent_id) REFERENCES dbo.reports(id),
  CONSTRAINT ck_reports_config CHECK (ISJSON(config) = 1),
  CONSTRAINT ck_reports_section CHECK (is_section = 0 OR parent_id IS NULL)
);
CREATE INDEX ix_reports_parent ON dbo.reports(parent_id, sort_order);

-- 3. Панель фильтров (было: поддельная запись __toolbar_config__ в reports).
--    Отдельная таблица — служебные данные не должны притворяться отчётом.
CREATE TABLE dbo.ui_config (
  setting_key NVARCHAR(64)  NOT NULL PRIMARY KEY,   -- 'toolbar'
  config      NVARCHAR(MAX) NOT NULL,
  updated_at  DATETIME2(3)  NOT NULL DEFAULT SYSUTCDATETIME(),
  CONSTRAINT ck_ui_config_json CHECK (ISJSON(config) = 1)
);

-- 4. Значения фильтров по умолчанию (было report_filters, не использовалось — оставляем
--    как осмысленную сущность: пресеты отчёта, видимые всем).
CREATE TABLE dbo.report_filter_default (
  report_id    INT           NOT NULL,
  filter_name  NVARCHAR(64)  NOT NULL,
  filter_value NVARCHAR(MAX) NOT NULL,
  is_default   BIT           NOT NULL DEFAULT 1,
  updated_at   DATETIME2(3)  NOT NULL DEFAULT SYSUTCDATETIME(),
  CONSTRAINT pk_report_filter_default PRIMARY KEY (report_id, filter_name),
  CONSTRAINT fk_rfd_report FOREIGN KEY (report_id) REFERENCES dbo.reports(id) ON DELETE CASCADE,
  CONSTRAINT ck_rfd_json CHECK (ISJSON(filter_value) = 1)
);

-- 5. Сохранённые виды пользователя (было: localStorage gr.reportView.<key>.modes[mode][])
--    Состояние виджета — непрозрачный документ, храним как JSON; сущность нормализована.
CREATE TABLE dbo.user_report_view (
  view_uid     UNIQUEIDENTIFIER NOT NULL DEFAULT NEWSEQUENTIALID() PRIMARY KEY,
  user_login   NVARCHAR(128) NOT NULL,
  report_key   NVARCHAR(64)  NOT NULL,
  view_id      NVARCHAR(64)  NOT NULL,   -- клиентский id вида ("s1x2y3")
  mode         NVARCHAR(16)  NOT NULL,   -- grid | pivot | map | dashboard
  name         NVARCHAR(200) NOT NULL,
  widget_state NVARCHAR(MAX) NULL,       -- DataGrid.state() / pivot datasource state
  ui_state     NVARCHAR(MAX) NULL,       -- тип графика, палитра, зум карты
  filters      NVARCHAR(MAX) NULL,       -- снимок фильтров на момент сохранения
  saved_at     DATETIME2(3)  NOT NULL,
  updated_at   DATETIME2(3)  NOT NULL DEFAULT SYSUTCDATETIME(),
  CONSTRAINT uq_user_report_view UNIQUE (user_login, report_key, view_id),
  CONSTRAINT fk_urv_user   FOREIGN KEY (user_login) REFERENCES dbo.app_user(login),
  CONSTRAINT fk_urv_report FOREIGN KEY (report_key) REFERENCES dbo.reports(report_key),
  CONSTRAINT ck_urv_mode   CHECK (mode IN ('grid','pivot','map','dashboard')),
  CONSTRAINT ck_urv_json   CHECK (
       (widget_state IS NULL OR ISJSON(widget_state) = 1)
   AND (ui_state     IS NULL OR ISJSON(ui_state) = 1)
   AND (filters      IS NULL OR ISJSON(filters) = 1))
);
CREATE INDEX ix_urv_owner ON dbo.user_report_view(user_login, report_key, mode);

-- 6. Текущее состояние пользователя по отчёту (было: filters + selected + updatedAt)
CREATE TABLE dbo.user_report_state (
  user_login   NVARCHAR(128) NOT NULL,
  report_key   NVARCHAR(64)  NOT NULL,
  filters      NVARCHAR(MAX) NULL,   -- последние введённые значения фильтров
  selected     NVARCHAR(MAX) NULL,   -- { "grid": "view_id", "pivot": "view_id" }
  active_mode  NVARCHAR(16)  NULL,
  version      INT           NOT NULL DEFAULT 1,   -- оптимистичная блокировка
  updated_at   DATETIME2(3)  NOT NULL DEFAULT SYSUTCDATETIME(),
  CONSTRAINT pk_user_report_state PRIMARY KEY (user_login, report_key),
  CONSTRAINT fk_urs_user   FOREIGN KEY (user_login) REFERENCES dbo.app_user(login),
  CONSTRAINT fk_urs_report FOREIGN KEY (report_key) REFERENCES dbo.reports(report_key),
  CONSTRAINT ck_urs_json CHECK (
       (filters  IS NULL OR ISJSON(filters) = 1)
   AND (selected IS NULL OR ISJSON(selected) = 1))
);
```

### Что сознательно не переносим

| Из Postgres | Почему |
|---|---|
| `report_access` | прав в приложении нет; появится вместе с ролями Bitrix/Keycloak |
| `users.password_hash` | вход не парольный: dev-константа → потом Bitrix/Keycloak |
| `roles` | хватает `app_user.role_code`; справочник ролей появится с реальными правами |

### Почему так, а не «одна таблица с JSON»

- `reports` — сущность, которую админ редактирует в `reports-admin`: нужны `UNIQUE(report_key)`,
  FK на родителя, сортировка, `ROWVERSION` от гонок при сохранении.
- `user_report_view` — по одному виду = строке: нужны выборки «мои виды по отчёту и режиму»,
  переименование, удаление. Внутри — JSON, потому что формат состояния задаёт виджет.
- `user_report_state` — ровно одна строка на (пользователь, отчёт), с `version` для `409`.
- Служебный конфиг вынесен из `reports` — иначе любой `SELECT * FROM reports` тащит панель
  фильтров и требует фильтра `key <> '__toolbar_config__'` в каждом запросе.

---

## 5. Изменения в `gr-backend`

1. **Слой хранения за интерфейсом.** `ReportStore`, `ConfigStore`, `UserStateStore` —
   две реализации: `store_mssql.go` (новая) и существующая Postgres (остаётся).
   Переключение — `STORE_BACKEND=mssql|postgres` в `.env`, по умолчанию `mssql`.
2. **Конфиг БД хранилища:**
   `REPORT_DB_SERVER`, `REPORT_DB_PORT`, `REPORT_DB_USER`, `REPORT_DB_PASSWORD`,
   `REPORT_DB_DATABASE=report`. Драйвер уже в проекте (`go-mssqldb`).
3. **Новые эндпоинты** (контракт существующих не меняется):
   - `GET  /api/me` → `{ login, roles }` (пока константа из `DEV_USER`)
   - `GET  /api/user-state/:reportKey` → `{ filters, selected, activeMode, views: [...], version, updatedAt }`
   - `PUT  /api/user-state/:reportKey` (заголовок `If-Match: <version>`) → `200` или `409`
   - `DELETE /api/user-state/:reportKey/views/:viewId`
4. **Совместимость ответов.** Поле `key` в JSON остаётся `key` (переименование только в БД).
   `config` отдаётся как JSON-объект, не строкой — как сейчас.
5. **Валидация.** `ISJSON` в БД + проверка в Go; `parent_id` только на раздел (логика уже есть);
   запрет `is_section=1` с непустым `query_text`.

---

## 6. Изменения во фронте

1. `vite.config.js` — порт 5050 (см. §3).
2. `src/services/reports-api.ts` — добавить `getMe`, `getUserState`, `putUserState`,
   `deleteView`; типы `UserReportState`, `SavedView` перенести из `report-view-state.ts`.
3. `src/utils/report-view-state.ts` — **источник истины меняется на API**:
   - при открытии отчёта: `GET /api/user-state/:key`, при ошибке — откат на localStorage (dev без сети);
   - сохранение вида / смена фильтров: `PUT` с `If-Match`; `409` → перечитать и показать
     «состояние изменено в другой вкладке»;
   - localStorage остаётся только кэшем последнего успешного ответа.
4. Страницы `report-view` / `reports-admin` по структуре не переписываются — меняется слой данных.

---

## 7. Миграция данных

Одноразовый скрипт `tools/migrate_reports.py` (Python 3.13 есть):

1. Читает Postgres `report_states`: `reports` (11 отчётов + разделы), `__toolbar_config__`.
2. Генерирует `INSERT` для MS SQL с `SET IDENTITY_INSERT dbo.reports ON` — **id сохраняются**,
   иначе поедут `parent_id` (24/25) и ссылки в `user_report_state`.
3. Сидирует `app_user` dev-логином и `ui_config('toolbar')`.
4. Режимы: `--dry-run` (только отчёт о строках), затем запись.
5. Сверка: количество строк, `count(*)` по каждому отчёту, побайтовое сравнение `query_text`
   и `config` для ОРН_5 и ОРН_9.

Отбор для MVP: `SEC_ОРН` + `ОРН_5` + `ОРН_9`. Остальные переносятся тем же скриптом позже
(флаг `--all`).

---

## 8. Порядок работ

| Шаг | Что | Проверка |
|---|---|---|
| 1 | Согласование схемы (этот документ) | ваше «ок» |
| 2 | `report` в контейнере `mssql`, DDL, сид `app_user` | `sqlcmd` показывает 6 таблиц |
| 3 | `store_mssql.go` + `STORE_BACKEND` + `/api/me`, `/api/user-state` | `GET /api/reports` отдаёт те же 12 записей, что и Postgres |
| 4 | Миграция `tools/migrate_reports.py` | сверка по `query_text`/`config` для ОРН_5, ОРН_9 |
| 5 | Фронт: порт 5050, слой состояний на API | `pnpm dev` поднимается на 5050 |
| 6 | Сквозная проверка | оба отчёта открываются, фильтры и виды сохраняются после `F5` и в другом браузере |
| 7 | `pnpm lint`, `pnpm build`, `vitest` | без новых ошибок |

Оценка: **3–4 рабочих дня** после согласования схемы.

---

## 9. Критерии приёмки

1. `http://localhost:5050` открывает приложение; в меню раздел ОРН с двумя отчётами.
2. ОРН-ОСВ и ОРН-Платежи выполняются, данные приходят из `kand` через `gr-backend`.
3. `SELECT * FROM report.dbo.reports` содержит оба отчёта с непустым `query_text`.
4. Сохранённый вид и значения фильтров переживают очистку хранилища браузера — читаются из
   `dbo.user_report_view` / `dbo.user_report_state`.
5. `gr-postgres` можно остановить — приложение продолжает работать.
6. `STORE_BACKEND=postgres` возвращает старое поведение (проверка отката).

---

## 10. Риски

| Риск | Мера |
|---|---|
| Кириллица в `report_key`/`title` и collation | БД с `Cyrillic_General_CI_AS`, все параметры через `NVARCHAR`, проверка на `ОРН_5` в шаге 2 |
| `query_text` до 10 КБ с `{{фильтрами}}` | `NVARCHAR(MAX)`, сверка побайтово после миграции |
| Потеря пользовательских видов при переезде с localStorage | одноразовый импорт: фронт выгружает `gr.reportView.*` в JSON, скрипт заливает в БД (по желанию — можно отложить) |
| `409` ломает привычный сценарий «сохранил и забыл» | на первом шаге конфликт только при реальном расхождении версий; в dev один пользователь |
| Vite 8 + алиасы MSI | порт меняем только в `server`; алиасы не трогаем |

---

## 11. Что нужно подтвердить

1. Схема из §4 — целиком или с правками.
2. Отчёты: `ОРН_5` (ОСВ) и `ОРН_9` (Платежи) — верные ключи?
3. Dev-логин: `Windows.User` как константа, `os.Getenv("USERNAME")` или фиксированное `dev`?
4. БД `report` — в том же контейнере `mssql` (1433), что и `kand`?
