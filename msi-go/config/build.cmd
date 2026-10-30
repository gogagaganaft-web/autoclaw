@echo off
cd /d C:\PROJECT\GOREPORT

echo ============================================
echo  Building 4 servers
echo ============================================

echo [1/4] Building server-7501.exe (execute)...
if exist server-7501.exe del /F server-7501.exe 2>nul
go build -o server-7501.exe -ldflags="-s -w" ./cmd/execute/
if %errorlevel% neq 0 (
    echo FAILED!
    pause
    exit /b 1
)

echo [2/4] Building server-7502.exe (report)...
if exist server-7502.exe del /F server-7502.exe 2>nul
go build -o server-7502.exe -ldflags="-s -w" ./cmd/report/
if %errorlevel% neq 0 (
    echo FAILED!
    pause
    exit /b 1
)

echo [3/4] Building server-7503.exe (preload)...
if exist server-7503.exe del /F server-7503.exe 2>nul
go build -o server-7503.exe -ldflags="-s -w" ./cmd/preload/
if %errorlevel% neq 0 (
    echo FAILED!
    pause
    exit /b 1
)

echo [4/4] Building server-7504.exe (multi)...
if exist server-7504.exe del /F server-7504.exe 2>nul
go build -o server-7504.exe -ldflags="-s -w" ./cmd/multi/
if %errorlevel% neq 0 (
    echo FAILED!
    pause
    exit /b 1
)

echo.
echo ============================================
echo  All 4 servers built successfully!
echo  Output: C:\PROJECT\GOREPORT\
echo ============================================
echo.
pause
