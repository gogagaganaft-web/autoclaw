-- ============================================================================
--  Наполнение dbo.app_user (БД report)
--
--  Зачем: user_report_state и user_report_view ссылаются на app_user по логину.
--  Если логина нет в таблице, сохранение состояния вида упадёт на внешнем ключе.
--
--  Идемпотентно: существующие логины не дублируются, имя и роль обновляются.
--  Запуск: sqlcmd -S <сервер> -U <логин> -P <пароль> -C -b -f 65001 -i 03_app_users.sql
-- ============================================================================
USE report;
GO
SET NOCOUNT ON;
GO

-- ---------------------------------------------------------------------------
-- 1. Список для заливки. Замените строки на реальные логины (как в Битриксе).
--    role_code допустим только 'admin' или 'user' — это CHECK в таблице.
-- ---------------------------------------------------------------------------
DECLARE @users TABLE (
    login        NVARCHAR(128) NOT NULL PRIMARY KEY,
    display_name NVARCHAR(200) NOT NULL,
    role_code    NVARCHAR(32)  NOT NULL
);

INSERT INTO @users (login, display_name, role_code) VALUES
    (N'Windows.User', N'Технический пользователь (dev)', N'admin'),
    (N'ivanov',       N'Иванов Иван',                     N'user'),
    (N'petrova',      N'Петрова Анна',                    N'user');
-- Добавьте свои строки в том же виде:
--  (N'login', N'Фамилия Имя', N'user'),

-- ---------------------------------------------------------------------------
-- 2. Заливка: есть — обновляем имя и роль, нет — добавляем активным.
-- ---------------------------------------------------------------------------
MERGE dbo.app_user AS target
USING @users AS src
   ON target.login = src.login
WHEN MATCHED THEN
    UPDATE SET display_name = src.display_name,
               role_code    = src.role_code
WHEN NOT MATCHED THEN
    INSERT (login, display_name, role_code, is_active)
    VALUES (src.login, src.display_name, src.role_code, 1);
GO

-- ---------------------------------------------------------------------------
-- 3. Проверка
-- ---------------------------------------------------------------------------
SELECT login, display_name, role_code, is_active, created_at
FROM dbo.app_user
ORDER BY login;
GO

-- ---------------------------------------------------------------------------
-- 4. Вариант «залить сразу всех из справочника kand».
--    Раскомментируйте и сверьте имена колонок с вашей базой:
--    у stack.[Пользователи] они зависят от конфигурации.
-- ---------------------------------------------------------------------------
/*
INSERT INTO dbo.app_user (login, display_name, role_code, is_active)
SELECT DISTINCT
       LTRIM(RTRIM(p.[Имя]))                    AS login,
       LTRIM(RTRIM(p.[Наименование]))           AS display_name,
       N'user'                                  AS role_code,
       1                                        AS is_active
FROM [kand].[stack].[Пользователи] AS p
WHERE p.[Имя] IS NOT NULL
  AND LTRIM(RTRIM(p.[Имя])) <> N''
  AND NOT EXISTS (
      SELECT 1 FROM dbo.app_user AS u
      WHERE u.login = LTRIM(RTRIM(p.[Имя]))
  );

SELECT COUNT(*) AS added FROM dbo.app_user;
*/
