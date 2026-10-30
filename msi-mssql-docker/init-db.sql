USE master;
GO

IF EXISTS (SELECT * FROM sys.databases WHERE name = 'TestDB')
BEGIN
    ALTER DATABASE TestDB SET SINGLE_USER WITH ROLLBACK IMMEDIATE;
    DROP DATABASE TestDB;
END
GO

CREATE DATABASE TestDB
COLLATE Cyrillic_General_CI_AS;
GO

USE TestDB;
GO

-- Создание таблицы Departments
CREATE TABLE Departments (
    DepartmentID INT PRIMARY KEY IDENTITY(1,1),
    DepartmentName NVARCHAR(100) NOT NULL
);
GO

-- Создание таблицы Employees
CREATE TABLE Employees (
    ID INT IDENTITY(1,1) PRIMARY KEY,
    FirstName NVARCHAR(50),
    LastName NVARCHAR(50),
    Position NVARCHAR(100),
    Department NVARCHAR(100),
    Salary DECIMAL(10,2),
    HireDate DATE
);
GO

-- Создание таблицы Projects
CREATE TABLE Projects (
    ProjectID INT PRIMARY KEY IDENTITY(1,1),
    ProjectName NVARCHAR(100) NOT NULL,
    StartDate DATE NOT NULL,
    EndDate DATE
);
GO

-- Создание таблицы EmployeeProjects
CREATE TABLE EmployeeProjects (
    EmployeeID INT FOREIGN KEY REFERENCES Employees(ID),
    ProjectID INT FOREIGN KEY REFERENCES Projects(ProjectID),
    HoursWorked INT NOT NULL,
    PRIMARY KEY (EmployeeID, ProjectID)
);
GO

-- Создание таблицы SavedQueries
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'SavedQueries')
BEGIN
    CREATE TABLE SavedQueries (
        Id INT IDENTITY(1,1) PRIMARY KEY,
        QueryText NVARCHAR(MAX) NOT NULL,
        Description NVARCHAR(255),
        CreatedAt DATETIME DEFAULT GETDATE()
    );
END
GO

-- Вставка тестовых данных
INSERT INTO Departments (DepartmentName) VALUES
(N'Отдел разработки'),
(N'Отдел тестирования'),
(N'Отдел маркетинга');
GO

INSERT INTO Employees (FirstName, LastName, Position, Department, Salary, HireDate)
VALUES 
    ('Иван', 'Иванов', 'Менеджер', 'Продажи', 50000.00, '2020-01-15'),
    ('Петр', 'Петров', 'Разработчик', 'IT', 60000.00, '2019-05-20'),
    ('Анна', 'Сидорова', 'Аналитик', 'Финансы', 55000.00, '2021-03-10'),
    ('Мария', 'Козлова', 'Дизайнер', 'Маркетинг', 45000.00, '2022-01-05'),
    ('Алексей', 'Смирнов', 'Тестировщик', 'IT', 48000.00, '2021-11-15');
GO

INSERT INTO Projects (ProjectName, StartDate, EndDate) VALUES
(N'Веб-приложение', '2024-01-01', '2024-06-30'),
(N'Мобильное приложение', '2024-02-01', '2024-08-31');
GO

INSERT INTO EmployeeProjects (EmployeeID, ProjectID, HoursWorked) VALUES
(1, 1, 160),
(2, 1, 120),
(1, 2, 80),
(3, 2, 100);
GO 