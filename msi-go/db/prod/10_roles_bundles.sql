/* ==========================================================================
 * 10_roles_bundles.sql — роли, филиалы и именованные наборы каталога.
 *
 * Роли: superadmin (все филиалы, сводные, наборы), admin (свой филиал,
 * правка общих фильтров/запросов и отчётов своей ветки), user (просмотр
 * своего филиала). Прод-аутентификация — синхронизация с Bitrix24
 * (поля-заделы provider/bitrix_user_id/password_hash).
 *
 * Видимость отчётов: раздел дерева (is_section=1) получает branch_code;
 * отчёты наследуют филиал раздела. NULL = общий (виден всем).
 *
 * Наборы (bundle) — снимок каталога «фильтры+запросы+отчёты» целиком:
 * применение к филиалам, экспорт/импорт JSON между контурами.
 *
 * Идемпотентно: повторный прогон не меняет результат.
 * ========================================================================== */
SET NOCOUNT ON;
SET XACT_ABORT ON;

-- ─── app_user: superadmin, филиал, заделы под Bitrix24 ──────────────────────
IF COL_LENGTH('dbo.app_user', 'branch_code') IS NULL
    ALTER TABLE dbo.app_user ADD branch_code NVARCHAR(8) NULL;
GO
IF COL_LENGTH('dbo.app_user', 'provider') IS NULL
    ALTER TABLE dbo.app_user ADD provider NVARCHAR(16) NOT NULL
        CONSTRAINT df_app_user_provider DEFAULT ('local');
GO
IF COL_LENGTH('dbo.app_user', 'bitrix_user_id') IS NULL
    ALTER TABLE dbo.app_user ADD bitrix_user_id NVARCHAR(32) NULL;
GO
IF COL_LENGTH('dbo.app_user', 'password_hash') IS NULL
    ALTER TABLE dbo.app_user ADD password_hash NVARCHAR(255) NULL;
GO

-- Расширяем CHECK роли: старое ограничение заменяем на трёхуровневое.
IF EXISTS (SELECT 1 FROM sys.check_constraints
           WHERE name = 'ck_app_user_role' AND parent_object_id = OBJECT_ID('dbo.app_user'))
    ALTER TABLE dbo.app_user DROP CONSTRAINT ck_app_user_role;
GO
IF NOT EXISTS (SELECT 1 FROM sys.check_constraints
               WHERE name = 'ck_app_user_role' AND parent_object_id = OBJECT_ID('dbo.app_user'))
    ALTER TABLE dbo.app_user ADD CONSTRAINT ck_app_user_role
        CHECK (role_code IN ('superadmin', 'admin', 'user'));
GO
IF NOT EXISTS (SELECT 1 FROM sys.check_constraints
               WHERE name = 'ck_app_user_branch' AND parent_object_id = OBJECT_ID('dbo.app_user'))
    ALTER TABLE dbo.app_user ADD CONSTRAINT ck_app_user_branch
        CHECK (branch_code IS NULL OR branch_code LIKE '[1-9]');
GO

-- Dev-пользователь контура — SuperAdmin без филиала.
UPDATE dbo.app_user
   SET role_code = 'superadmin', branch_code = NULL, is_active = 1
 WHERE login = N'Windows.User';
IF NOT EXISTS (SELECT 1 FROM dbo.app_user WHERE login = N'Windows.User')
    INSERT INTO dbo.app_user (login, display_name, role_code, branch_code)
    VALUES (N'Windows.User', N'Dev SuperAdmin', 'superadmin', NULL);
GO

-- ─── reports: филиал раздела (отчёты наследуют по дереву) ───────────────────
IF COL_LENGTH('dbo.reports', 'branch_code') IS NULL
    ALTER TABLE dbo.reports ADD branch_code NVARCHAR(8) NULL;
GO
IF NOT EXISTS (SELECT 1 FROM sys.check_constraints
               WHERE name = 'ck_reports_branch' AND parent_object_id = OBJECT_ID('dbo.reports'))
    ALTER TABLE dbo.reports ADD CONSTRAINT ck_reports_branch
        CHECK (branch_code IS NULL OR branch_code LIKE '[1-9]');
GO

-- ─── Наборы каталога ─────────────────────────────────────────────────────────
IF OBJECT_ID('dbo.bundle', 'U') IS NULL
CREATE TABLE dbo.bundle (
    id           INT            IDENTITY(1,1) NOT NULL CONSTRAINT pk_bundle PRIMARY KEY,
    name         NVARCHAR(128)  NOT NULL CONSTRAINT uq_bundle_name UNIQUE,
    description  NVARCHAR(512)  NOT NULL CONSTRAINT df_bundle_descr DEFAULT (''),
    version      INT            NOT NULL CONSTRAINT df_bundle_version DEFAULT (1),
    payload      NVARCHAR(MAX)  NOT NULL,
    item_counts  NVARCHAR(200)  NOT NULL CONSTRAINT df_bundle_counts DEFAULT (''),
    created_by   NVARCHAR(128)  NOT NULL,
    created_at   DATETIME2(3)   NOT NULL CONSTRAINT df_bundle_created DEFAULT (SYSUTCDATETIME()),
    updated_at   DATETIME2(3)   NOT NULL CONSTRAINT df_bundle_updated DEFAULT (SYSUTCDATETIME())
);
GO

IF OBJECT_ID('dbo.bundle_log', 'U') IS NULL
CREATE TABLE dbo.bundle_log (
    id          INT            IDENTITY(1,1) NOT NULL CONSTRAINT pk_bundle_log PRIMARY KEY,
    bundle_id   INT            NOT NULL
        CONSTRAINT fk_bundle_log_bundle REFERENCES dbo.bundle(id) ON DELETE CASCADE,
    action      NVARCHAR(16)   NOT NULL
        CONSTRAINT ck_bundle_log_action CHECK (action IN ('create', 'apply', 'import', 'export')),
    branches    NVARCHAR(64)   NOT NULL CONSTRAINT df_bundle_log_branches DEFAULT (''),
    applied_by  NVARCHAR(128)  NOT NULL,
    applied_at  DATETIME2(3)   NOT NULL CONSTRAINT df_bundle_log_at DEFAULT (SYSUTCDATETIME()),
    details     NVARCHAR(512)  NOT NULL CONSTRAINT df_bundle_log_details DEFAULT ('')
);
GO

PRINT '10: роли/филиалы/наборы готовы';
