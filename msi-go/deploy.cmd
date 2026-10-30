@echo off
setlocal
cd /d C:\PROJECT\GOREPORT

net session >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Please run as Administrator!
    echo Right-click this file - "Run as administrator"
    pause
    exit /b 1
)

echo ============================================
echo  DEPLOY: stop/remove services, build, install
echo ============================================

echo.
echo --- [1/4] Stopping and removing services (errors are OK if not installed)...
net stop GOREPORT_7501 >nul 2>&1
server-7501.exe -remove >nul 2>&1
net stop GOREPORT_7502 >nul 2>&1
server-7502.exe -remove >nul 2>&1
net stop GOREPORT_7503 >nul 2>&1
server-7503.exe -remove >nul 2>&1
net stop GOREPORT_7504 >nul 2>&1
server-7504.exe -remove >nul 2>&1

echo.
echo --- [2/4] Building 4 servers ---
if exist server-7501.exe del /F server-7501.exe 2>nul
go build -o server-7501.exe -ldflags="-s -w" ./cmd/execute/
if %errorlevel% neq 0 ( echo BUILD FAILED 7501 & goto :failed )

if exist server-7502.exe del /F server-7502.exe 2>nul
go build -o server-7502.exe -ldflags="-s -w" ./cmd/report/
if %errorlevel% neq 0 ( echo BUILD FAILED 7502 & goto :failed )

if exist server-7503.exe del /F server-7503.exe 2>nul
go build -o server-7503.exe -ldflags="-s -w" ./cmd/preload/
if %errorlevel% neq 0 ( echo BUILD FAILED 7503 & goto :failed )

if exist server-7504.exe del /F server-7504.exe 2>nul
go build -o server-7504.exe -ldflags="-s -w" ./cmd/multi/
if %errorlevel% neq 0 ( echo BUILD FAILED 7504 & goto :failed )

echo.
echo --- [3/4] Installing services ---
server-7501.exe -install
if %errorlevel% neq 0 ( echo INSTALL FAILED 7501 & goto :failed )
server-7502.exe -install
if %errorlevel% neq 0 ( echo INSTALL FAILED 7502 & goto :failed )
server-7503.exe -install
if %errorlevel% neq 0 ( echo INSTALL FAILED 7503 & goto :failed )
server-7504.exe -install
if %errorlevel% neq 0 ( echo INSTALL FAILED 7504 & goto :failed )

echo.
echo --- [4/4] Starting services ---
net start GOREPORT_7501
net start GOREPORT_7502
net start GOREPORT_7503
net start GOREPORT_7504

echo.
echo ============================================
echo  Deploy complete. All services running.
echo  Check: net start GOREPORT_75xx / net stop
echo  Remove: remove_services.cmd
echo ============================================
pause
exit /b 0

:failed
echo.
echo ============================================
echo  DEPLOY FAILED - see errors above
echo ============================================
pause
exit /b 1