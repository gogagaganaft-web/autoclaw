@echo off
cd /d C:\PROJECT\GOREPORT
net session >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Please run as Administrator!
    echo Щелкните правой кнопкой - "Запуск от имени администратора"
    pause
    exit /b 1
)

echo Installing services...
echo.

echo [1/4] Installing GOREPORT_7501 (execute)...
server-7501.exe -install

echo [2/4] Installing GOREPORT_7502 (report)...
server-7502.exe -install

echo [3/4] Installing GOREPORT_7503 (preload)...
server-7503.exe -install

echo [4/4] Installing GOREPORT_7504 (multi)...
server-7504.exe -install

echo.
echo Starting services...
net start GOREPORT_7501
net start GOREPORT_7502
net start GOREPORT_7503
net start GOREPORT_7504

echo.
echo ============================================
echo  Services installed and started.
echo  Manage:  net start/stop GOREPORT_75xx
echo  Remove:  remove_services.cmd
echo ============================================
pause
