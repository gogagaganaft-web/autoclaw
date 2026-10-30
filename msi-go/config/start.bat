@echo off
cd /d C:\PROJECT\GOREPORT
echo Stopping old instances...
taskkill /F /IM server-7501.exe 2>nul
taskkill /F /IM server-7502.exe 2>nul
taskkill /F /IM server-7503.exe 2>nul
timeout /t 2 /nobreak >nul

echo Starting server-7501 (Execute)...
start "GOREPORT 7501" /B server-7501.exe

echo Starting server-7502 (Report)...
start "GOREPORT 7502" /B server-7502.exe

echo Starting server-7503 (Preload)...
start "GOREPORT 7503" /B server-7503.exe

echo.
timeout /t 3 /nobreak >nul
netstat -ano | findstr "7501 7502 7503" | findstr LISTEN
echo.
echo Done. Press any key to exit.
pause >nul
