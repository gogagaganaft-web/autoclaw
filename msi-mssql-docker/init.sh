#!/bin/bash

# Ждем, пока SQL Server запустится
sleep 30

# Запускаем скрипт инициализации
/opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P YourStrong@Passw0rd -i /init-db.sql

# Держим контейнер запущенным
tail -f /dev/null 