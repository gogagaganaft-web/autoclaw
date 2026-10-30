@echo off
echo ============================================
echo  Starting all 3 servers
echo ============================================
echo [1/3] Starting server-7501.exe (execute)...
start "GOREPORT 7501 (execute)" cmd /c "cd /d C:\PROJECT\GOREPORT && server-7501.exe"

timeout /t 3 /nobreak >nul

echo [2/3] Starting server-7502.exe (report)...
start "GOREPORT 7502 (report)" cmd /c "cd /d C:\PROJECT\GOREPORT && server-7502.exe"

timeout /t 3 /nobreak >nul

echo [3/3] Starting server-7503.exe (preload)...
start "GOREPORT 7503 (preload)" cmd /c "cd /d C:\PROJECT\GOREPORT && server-7503.exe"

echo.
echo ============================================
echo  All 3 servers started. Close windows to stop.
echo ============================================
pause
