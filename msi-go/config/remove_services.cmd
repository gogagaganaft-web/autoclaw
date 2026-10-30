@echo off
cd /d C:\PROJECT\GOREPORT
echo Stopping and removing services (requires Administrator rights)...
echo.

net stop GOREPORT_7501
server-7501.exe -remove

net stop GOREPORT_7502
server-7502.exe -remove

net stop GOREPORT_7503
server-7503.exe -remove

net stop GOREPORT_7504
server-7504.exe -remove

echo.
echo Done.
pause
