-- ============================================================================
--  БД report — хранилище отчётов, панели фильтров и пользовательских состояний
--  Dev-этап. Схема на согласование; НЕ применена.
--  Сервер: тот же экземпляр MS SQL, что и kand (контейнер mssql:1433).
--  Collation: Cyrillic_General_CI_AS — как у kand, иначе сравнение кириллицы
--  в report_key/title будет расходиться с источником.
-- ============================================================================

IF DB_ID('report') IS NULL
    CREATE DATABASE report COLLATE Cyrillic_General_CI_AS;
GO
USE report;
GO

-- ---------------------------------------------------------------------------
-- 1. Пользователи. Сейчас один (dev-константа), но FK ставим сразу,
--    чтобы Bitrix/Keycloak подключить позже без переделки ссылок.
-- ---------------------------------------------------------------------------
IF OBJECT_ID('dbo.app_user', 'U') IS NULL
CREATE TABLE dbo.app_user (
    login        NVARCHAR(128) NOT NULL CONSTRAINT pk_app_user PRIMARY KEY,
    display_name NVARCHAR(200) NOT NULL,
    role_code    NVARCHAR(32)  NOT NULL CONSTRAINT df_app_user_role DEFAULT ('admin'),
    is_active    BIT           NOT NULL CONSTRAINT df_app_user_active DEFAULT (1),
    created_at   DATETIME2(3)  NOT NULL CONSTRAINT df_app_user_created DEFAULT (SYSUTCDATETIME()),
    CONSTRAINT ck_app_user_role CHECK (role_code IN ('admin', 'user'))
);
GO

-- ---------------------------------------------------------------------------
-- 2. Отчёты: определение, SQL и конфиг вида (filters/views из rpt.js).
--    key — ключевое слово T-SQL, поэтому колонка report_key.
--    В JSON API поле остаётся "key".
-- ---------------------------------------------------------------------------
IF OBJECT_ID('dbo.reports', 'U') IS NULL
CREATE TABLE dbo.reports (
    id          INT           IDENTITY(1,1) NOT NULL CONSTRAINT pk_reports PRIMARY KEY,
    report_key  NVARCHAR(64)  NOT NULL,
    title       NVARCHAR(200) NOT NULL,
    icon        NVARCHAR(64)  NULL,
    image       NVARCHAR(400) NULL,
    query_text  NVARCHAR(MAX) NULL,
    config      NVARCHAR(MAX) NOT NULL CONSTRAINT df_reports_config DEFAULT ('{}'),
    parent_id   INT           NULL,
    is_section  BIT           NOT NULL CONSTRAINT df_reports_section DEFAULT (0),
    sort_order  INT           NOT NULL CONSTRAINT df_reports_sort DEFAULT (0),
    is_deleted  BIT           NOT NULL CONSTRAINT df_reports_deleted DEFAULT (0),
    created_at  DATETIME2(3)  NOT NULL CONSTRAINT df_reports_created DEFAULT (SYSUTCDATETIME()),
    updated_at  DATETIME2(3)  NOT NULL CONSTRAINT df_reports_updated DEFAULT (SYSUTCDATETIME()),
    row_version ROWVERSION,
    CONSTRAINT uq_reports_key UNIQUE (report_key),
    CONSTRAINT fk_reports_parent FOREIGN KEY (parent_id) REFERENCES dbo.reports(id),
    CONSTRAINT ck_reports_config  CHECK (ISJSON(config) = 1),
    CONSTRAINT ck_reports_section CHECK (is_section = 0 OR parent_id IS NULL)
);
GO
IF NOT EXISTS (SELECT 1 FROM sys.indexes WHERE name = 'ix_reports_parent' AND object_id = OBJECT_ID('dbo.reports'))
    CREATE INDEX ix_reports_parent ON dbo.reports(parent_id, sort_order);
GO

-- ---------------------------------------------------------------------------
-- 3. Панель фильтров (было: поддельная запись __toolbar_config__ в reports).
-- ---------------------------------------------------------------------------
IF OBJECT_ID('dbo.ui_config', 'U') IS NULL
CREATE TABLE dbo.ui_config (
    setting_key NVARCHAR(64)  NOT NULL CONSTRAINT pk_ui_config PRIMARY KEY,
    config      NVARCHAR(MAX) NOT NULL,
    updated_at  DATETIME2(3)  NOT NULL CONSTRAINT df_ui_config_updated DEFAULT (SYSUTCDATETIME()),
    CONSTRAINT ck_ui_config_json CHECK (ISJSON(config) = 1)
);
GO

-- ---------------------------------------------------------------------------
-- 4. Значения фильтров по умолчанию — пресеты отчёта, видимые всем.
-- ---------------------------------------------------------------------------
IF OBJECT_ID('dbo.report_filter_default', 'U') IS NULL
CREATE TABLE dbo.report_filter_default (
    report_id    INT           NOT NULL,
    filter_name  NVARCHAR(64)  NOT NULL,
    filter_value NVARCHAR(MAX) NOT NULL,
    is_default   BIT           NOT NULL CONSTRAINT df_rfd_default DEFAULT (1),
    updated_at   DATETIME2(3)  NOT NULL CONSTRAINT df_rfd_updated DEFAULT (SYSUTCDATETIME()),
    CONSTRAINT pk_report_filter_default PRIMARY KEY (report_id, filter_name),
    CONSTRAINT fk_rfd_report FOREIGN KEY (report_id) REFERENCES dbo.reports(id) ON DELETE CASCADE,
    CONSTRAINT ck_rfd_json CHECK (ISJSON(filter_value) = 1)
);
GO

-- ---------------------------------------------------------------------------
-- 5. Сохранённые виды пользователя (было: localStorage gr.reportView.<key>.modes)
--    Сущность нормализована; состояние виджета — непрозрачный документ.
-- ---------------------------------------------------------------------------
IF OBJECT_ID('dbo.user_report_view', 'U') IS NULL
CREATE TABLE dbo.user_report_view (
    view_uid     UNIQUEIDENTIFIER NOT NULL CONSTRAINT df_urv_uid DEFAULT (NEWSEQUENTIALID()) CONSTRAINT pk_user_report_view PRIMARY KEY,
    user_login   NVARCHAR(128) NOT NULL,
    report_key   NVARCHAR(64)  NOT NULL,
    view_id      NVARCHAR(64)  NOT NULL,   -- клиентский id ("s1x2y3")
    mode         NVARCHAR(16)  NOT NULL,   -- grid | pivot | map | dashboard
    name         NVARCHAR(200) NOT NULL,
    widget_state NVARCHAR(MAX) NULL,       -- DataGrid.state() / pivot datasource state
    ui_state     NVARCHAR(MAX) NULL,       -- тип графика, палитра, зум карты
    filters      NVARCHAR(MAX) NULL,       -- снимок фильтров на момент сохранения
    saved_at     DATETIME2(3)  NOT NULL,
    updated_at   DATETIME2(3)  NOT NULL CONSTRAINT df_urv_updated DEFAULT (SYSUTCDATETIME()),
    CONSTRAINT uq_user_report_view UNIQUE (user_login, report_key, view_id),
    CONSTRAINT fk_urv_user   FOREIGN KEY (user_login) REFERENCES dbo.app_user(login),
    CONSTRAINT fk_urv_report FOREIGN KEY (report_key) REFERENCES dbo.reports(report_key),
    CONSTRAINT ck_urv_mode   CHECK (mode IN ('grid', 'pivot', 'map', 'dashboard')),
    CONSTRAINT ck_urv_json   CHECK (
           (widget_state IS NULL OR ISJSON(widget_state) = 1)
       AND (ui_state     IS NULL OR ISJSON(ui_state) = 1)
       AND (filters      IS NULL OR ISJSON(filters) = 1))
);
GO
IF NOT EXISTS (SELECT 1 FROM sys.indexes WHERE name = 'ix_urv_owner' AND object_id = OBJECT_ID('dbo.user_report_view'))
    CREATE INDEX ix_urv_owner ON dbo.user_report_view(user_login, report_key, mode);
GO

-- ---------------------------------------------------------------------------
-- 6. Текущее состояние пользователя по отчёту. version — оптимистичная
--    блокировка: PUT с If-Match, при расхождении 409.
-- ---------------------------------------------------------------------------
IF OBJECT_ID('dbo.user_report_state', 'U') IS NULL
CREATE TABLE dbo.user_report_state (
    user_login  NVARCHAR(128) NOT NULL,
    report_key  NVARCHAR(64)  NOT NULL,
    filters     NVARCHAR(MAX) NULL,
    selected    NVARCHAR(MAX) NULL,   -- {"grid":"view_id","pivot":"view_id"}
    active_mode NVARCHAR(16)  NULL,
    version     INT           NOT NULL CONSTRAINT df_urs_version DEFAULT (1),
    updated_at  DATETIME2(3)  NOT NULL CONSTRAINT df_urs_updated DEFAULT (SYSUTCDATETIME()),
    CONSTRAINT pk_user_report_state PRIMARY KEY (user_login, report_key),
    CONSTRAINT fk_urs_user   FOREIGN KEY (user_login) REFERENCES dbo.app_user(login),
    CONSTRAINT fk_urs_report FOREIGN KEY (report_key) REFERENCES dbo.reports(report_key),
    CONSTRAINT ck_urs_json CHECK (
           (filters  IS NULL OR ISJSON(filters) = 1)
       AND (selected IS NULL OR ISJSON(selected) = 1))
);
GO

-- ---------------------------------------------------------------------------
-- 7. Dev-пользователь. Логин подтверждается отдельно; по умолчанию константа.
-- ---------------------------------------------------------------------------
IF NOT EXISTS (SELECT 1 FROM dbo.app_user WHERE login = N'Windows.User')
    INSERT INTO dbo.app_user (login, display_name, role_code)
    VALUES (N'Windows.User', N'Windows User (dev)', 'admin');
GO

PRINT 'report: schema ready';
GO
