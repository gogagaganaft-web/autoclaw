#!/bin/bash
set -e

echo "Waiting for SQL Server to be ready..."
MAX_RETRIES=60
RETRY_COUNT=0

while [ $RETRY_COUNT -lt $MAX_RETRIES ]; do
  if /opt/mssql-tools18/bin/sqlcmd -S mssql -U sa -P YourStrong@Passw0rd -C -Q "SELECT 1" -b -o /dev/null 2>/dev/null; then
    echo "SQL Server is ready!"
    break
  fi
  RETRY_COUNT=$((RETRY_COUNT + 1))
  echo "SQL Server is unavailable - sleeping (attempt $RETRY_COUNT/$MAX_RETRIES)"
  sleep 3
done

if [ $RETRY_COUNT -ge $MAX_RETRIES ]; then
  echo "ERROR: SQL Server did not become ready in time"
  exit 1
fi

# Дополнительная пауза для полной инициализации SQL Server
echo "Waiting additional 5 seconds for SQL Server to fully initialize..."
sleep 5

echo "SQL Server is up - checking if database exists..."
set +e
DB_CHECK=$(/opt/mssql-tools18/bin/sqlcmd -S mssql -U sa -P YourStrong@Passw0rd -C -Q "IF DB_ID('TestDB') IS NOT NULL SELECT 1 ELSE SELECT 0" -h -1 -W 2>/dev/null | tr -d '[:space:]')
DB_CHECK=${DB_CHECK:-"0"}
set -e

if [ "$DB_CHECK" = "0" ] || [ -z "$DB_CHECK" ]; then
  echo "Database does not exist - executing init script"
  /opt/mssql-tools18/bin/sqlcmd -S mssql -U sa -P YourStrong@Passw0rd -C -i /init-db.sql
  if [ $? -eq 0 ]; then
    echo "Database initialization completed successfully"
  else
    echo "ERROR: Database initialization failed"
    exit 1
  fi
else
  echo "Database already exists - skipping initialization"
fi

