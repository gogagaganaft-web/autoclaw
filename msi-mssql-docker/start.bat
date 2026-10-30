@echo off
echo Starting Docker containers...
::docker-compose up -d --build
docker-compose up -d
echo.
echo Containers are running in the background.
echo To view logs: docker-compose logs -f
echo To stop containers: docker-compose down
echo.
pause

