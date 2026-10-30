@echo off
echo Stopping all GoReport servers...
taskkill /F /IM server-7501.exe /T 2>nul
taskkill /F /IM server-7502.exe /T 2>nul
taskkill /F /IM server-7503.exe /T 2>nul
echo Done.
