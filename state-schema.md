# Схема хранения состояний: JSON-файлы → таблицы MS SQL

Дата: 2026-10-23. Основание — фактическое содержимое `msi-js/data/*.json` и код
`cmd/execute/main.go` (save/load-file, queries).

---

## 1. Что хранится сейчас (факты)

### 1.1 `<login>_views.json` — состояние отображения (v2)

```jsonc
{
  "version": 2,
  "login": "user",
  "updatedAt": "2026-10-16T09:37:37.524Z",
  "reports": {
    "1005": {                      // ключ = id отчёта
      "current": {
        "mode": "pivot",           // null | "grid" | "pivot" | "dashboard"
        "filters": { "Период": {"start":"2026-08-01","end":"2026-10-01"},
                     "БД_ЮЛ": ["DB1UL","DB2UL"] },
        "pivot":   { "fields": [ {"dataField":"Сумма","area":"data","summaryType":"sum"} ],
                     "columnExpandedPaths": [], "rowExpandedPaths": [["1.Курск ЮЛ"]] },
        "dashboard": { "selectedChartIndex": 3, "selectedPalette": "material" },
        "updatedAt": "2026-10-16T08:04:41.828Z"
      },
      "variants": {                // ИМЯ РЕЖИМА → массив сохранённых вариантов
        "pivot":     [ {"name":"СВОД1","createdAt":"…","updatedAt":"…","state":{…}} ],
        "dashboard": [ … ],
        "grid":      [ … ]
      },
      "activeVariant": { "pivot": "СВОД21", "dashboard": "ИНФОГРАФИКА1", "grid": null }
    }
  }
}
```

Особенности, которые ломают наивную схему:
- `variants` встречается и как объект с массивами, и как пустой `{}`; `activeVariant` — то объект, то `{}`.
- `filters` — словарь с произвольными ключами (русские названия полей), значения разного типа
  (строка, объект `{start,end}`, массив кодов БД, массив `{id,name}`).
- `pivot.fields` — массив до 56 элементов с разным набором свойств (`area`, `areaIndex`,
  `summaryType`, `filterValues`, `sortOrder`, `expanded`).

### 1.2 `<login>_rpt.json` — пользовательские отчёты

```jsonc
[
  {
    "id": 2017, "parent": 3000, "text": "MES", "icon": "chart", "description": "",
    "filters": { "УК": [], "РасчетныеМесяцы": [] },
    "processing": "client",
    "views": ["grid","dashboard"],
    "fields": { "grid": [ {"dataField":"Отчет", …} ], "pivot": [], "dashboard": [] }
  }
]
```

### 1.3 `queries.json` — справочник сохранённых SQL-запросов

`{"queries":[{"name":"…", …}]}`. Пишется сервисом 7501 в **текущий каталог процесса**.
Полный набор полей структуры `Query` требует чтения `types.go` — уточняется на этапе 1.

---

## 2. Принцип разбиения

Нормализуем **сущности и связи** (кто, какой отчёт, какой вариант, какой запрос, версия,
время, автор). Оставляем JSON **там, где схема задаётся UI и меняется вместе с виджетами**:
`filters`, `pivot`, `dashboard`. Нормализовать 56 полей сводной таблицы в отдельные строки —
это три таблицы и ноль выгоды: по ним не ищут и не строят отчёты, они целиком уходят в виджет.

Это не отказ от решения «нормализованные таблицы»: сущности нормализованы, документом остаётся
только лист конфигурации. Правило зафиксировано, чтобы дальше не спорить по каждому полю.

---

## 3. DDL

```sql
-- ============ Идентичность и роли ============
CREATE TABLE app_role (
  code        NVARCHAR(32)  NOT NULL PRIMARY KEY,   -- viewer | operator | admin
  title       NVARCHAR(100) NOT NULL,
  is_active   BIT           NOT NULL DEFAULT 1
);

CREATE TABLE app_user_role (
  login       NVARCHAR(128) NOT NULL,
  role_code   NVARCHAR(32)  NOT NULL REFERENCES app_role(code),
  source      NVARCHAR(16)  NOT NULL,   -- dev | bitrix24 | keycloak
  granted_at  DATETIME2(3)  NOT NULL DEFAULT SYSUTCDATETIME(),
  CONSTRAINT pk_app_user_role PRIMARY KEY (login, role_code)
);

-- ============ Отчёты пользователя (было <login>_rpt.json) ============
CREATE TABLE app_user_report (
  id            INT            NOT NULL PRIMARY KEY,   -- сохраняем исходный id
  login         NVARCHAR(128)  NOT NULL,               -- владелец
  parent_id     INT            NULL,                   -- было parent: 3000
  title         NVARCHAR(200)  NOT NULL,               -- было text
  icon          NVARCHAR(64)   NULL,
  description   NVARCHAR(1000) NULL,
  processing    NVARCHAR(32)   NOT NULL DEFAULT 'client',
  filters_json  NVARCHAR(MAX)  NULL,                   -- документ
  fields_json   NVARCHAR(MAX)  NULL,                   -- grid/pivot/dashboard поля
  version       INT            NOT NULL DEFAULT 1,
  is_deleted    BIT            NOT NULL DEFAULT 0,
  created_by    NVARCHAR(128)  NOT NULL,
  created_at    DATETIME2(3)   NOT NULL DEFAULT SYSUTCDATETIME(),
  updated_by    NVARCHAR(128)  NOT NULL,
  updated_at    DATETIME2(3)   NOT NULL DEFAULT SYSUTCDATETIME()
);
CREATE INDEX ix_app_user_report_owner ON app_user_report(login, is_deleted);

-- было views: ["grid","dashboard"]
CREATE TABLE app_user_report_view (
  report_id   INT          NOT NULL REFERENCES app_user_report(id) ON DELETE CASCADE,
  view_code   NVARCHAR(16) NOT NULL,        -- grid | pivot | dashboard
  CONSTRAINT pk_app_user_report_view PRIMARY KEY (report_id, view_code)
);

-- ============ Текущее состояние отображения (было reports[key].current) ============
CREATE TABLE app_report_view (
  login          NVARCHAR(128) NOT NULL,
  report_key     NVARCHAR(32)  NOT NULL,     -- строка: id отчёта как в UI
  mode           NVARCHAR(16)  NULL,         -- null | grid | pivot | dashboard
  filters_json   NVARCHAR(MAX) NULL,
  pivot_json     NVARCHAR(MAX) NULL,
  dashboard_json NVARCHAR(MAX) NULL,
  version        INT           NOT NULL DEFAULT 1,
  updated_by     NVARCHAR(128) NOT NULL,
  updated_at     DATETIME2(3)  NOT NULL DEFAULT SYSUTCDATETIME(),
  CONSTRAINT pk_app_report_view PRIMARY KEY (login, report_key)
);

-- ============ Сохранённые варианты (было variants[mode][]) ============
CREATE TABLE app_report_variant (
  id          UNIQUEIDENTIFIER NOT NULL PRIMARY KEY DEFAULT NEWSEQUENTIALID(),
  login       NVARCHAR(128) NOT NULL,
  report_key  NVARCHAR(32)  NOT NULL,
  mode        NVARCHAR(16)  NOT NULL,        -- grid | pivot | dashboard
  name        NVARCHAR(200) NOT NULL,
  state_json  NVARCHAR(MAX) NOT NULL,        -- было state
  is_active   BIT           NOT NULL DEFAULT 0,
  version     INT           NOT NULL DEFAULT 1,
  created_at  DATETIME2(3)  NOT NULL DEFAULT SYSUTCDATETIME(),
  updated_at  DATETIME2(3)  NOT NULL DEFAULT SYSUTCDATETIME(),
  CONSTRAINT uq_app_report_variant UNIQUE (login, report_key, mode, name)
);
CREATE INDEX ix_app_report_variant_owner ON app_report_variant(login, report_key, mode);

-- ============ Справочник запросов (было queries.json) ============
CREATE TABLE app_query (
  id          UNIQUEIDENTIFIER NOT NULL PRIMARY KEY DEFAULT NEWSEQUENTIALID(),
  name        NVARCHAR(200) NOT NULL,
  sql_text    NVARCHAR(MAX) NOT NULL,
  description NVARCHAR(500) NULL,
  owner_login NVARCHAR(128) NOT NULL,
  is_shared   BIT           NOT NULL DEFAULT 0,
  version     INT           NOT NULL DEFAULT 1,
  is_deleted  BIT           NOT NULL DEFAULT 0,
  created_at  DATETIME2(3)  NOT NULL DEFAULT SYSUTCDATETIME(),
  updated_at  DATETIME2(3)  NOT NULL DEFAULT SYSUTCDATETIME(),
  CONSTRAINT uq_app_query UNIQUE (owner_login, name)
);

-- ============ История: снимок на каждое изменение ============
CREATE TABLE app_state_history (
  id         BIGINT IDENTITY PRIMARY KEY,
  type_code  NVARCHAR(32)      NOT NULL,   -- user_report | report_view | variant | query
  entity_key NVARCHAR(300)     NOT NULL,   -- login|report_key|mode|name
  version    INT               NOT NULL,
  operation  NVARCHAR(16)      NOT NULL,   -- insert | update | delete
  snapshot   NVARCHAR(MAX)     NOT NULL,   -- JSON-снимок строки
  changed_by NVARCHAR(128)     NOT NULL,
  changed_at DATETIME2(3)      NOT NULL DEFAULT SYSUTCDATETIME()
);
CREATE INDEX ix_app_state_history_entity ON app_state_history(type_code, entity_key, version);
```

---

## 4. Соответствие «файл → таблица»

| Источник | Таблица | Кардинальность | Преобразование |
|---|---|---|---|
| `reports[reportKey].current` | `app_report_view` | 1 строка на (login, report) | `mode/filters/pivot/dashboard` + `version=1` |
| `reports[reportKey].variants[mode][]` | `app_report_variant` | N строк | имя, `state`, `createdAt`, `updatedAt` |
| `reports[reportKey].activeVariant[mode]` | флаг `is_active` | — | сравнение по имени |
| `<login>_rpt.json[]` | `app_user_report` + `app_user_report_view` | 1 + N | `text→title`, `parent→parent_id`, `views[]→строки` |
| `queries.json[].queries[]` | `app_query` | N | `owner_login` = владелец файла |
| — | `app_state_history` | на каждое изменение | снимок целиком |

Импорт: одна команда `migrate import-json --dir <data> --dry-run`, затем без `--dry-run`.
Идемпотентность — по естественным ключам; повторный запуск обновляет, не плодит дубли.

---

## 5. Правила API (закрывают текущие дефекты)

1. **Владелец только из токена.** `login` берётся из JWT; поле `login` в теле запроса игнорируется.
   Сейчас через `/api/save-file` можно записать файл любого пользователя.
2. **Нет пути — нет файла.** Эндпоинты `/api/save-file` и `/api/load-file` в новом сервисе
   не воспроизводятся. Состояние адресуется `(report_key, mode, name)`, а не путём в ФС.
3. **Версионность.** `PUT` с `If-Match: <version>`; при расхождении — `409` + актуальная версия.
   Закрывает «две вкладки затирают друг друга».
4. **История в той же транзакции**, автор — из токена.
5. **`409` вместо последней записи побеждает** — осознанная смена поведения; фронт должен
   уметь показать конфликт.
6. **Удаление — `is_deleted`**, физическое удаление только регламентом.

---

## 6. Что остаётся вне БД

| Объект | Почему |
|---|---|
| `data/rpt.js` (каталог системных отчётов, 321 КБ) | часть кода, деплоится вместе со сборкой |
| `data/env.js` (конфиг фронта) | конфигурация окружения, не пользовательские данные |
| Сессии отчётов в памяти 7502/7504 | кэш вычислений; восстанавливается повторным `init` |

---

## 7. Объём

**[проверено]** Дев-файлы: `user_views.json` — 58 КБ на одного пользователя с 6 отчётами,
`user_rpt.json` — 10 КБ. На 100 пользователей — порядка 6 МБ; таблицы малые,
основной вес — `state_json`/`fields_json`. Отдельных индексов по JSON не требуется;
если понадобится поиск по фильтрам — computed column + `JSON_VALUE`, отдельной миграцией.
