#!/bin/bash
set -e
cd /opt/goreport

echo "=== 1. Building ==="
go build -o server-7501 ./cmd/execute/
go build -o server-7502 ./cmd/report/
go build -o server-7503 ./cmd/preload/
go build -o server-7504 ./cmd/multi/
echo "Build OK"

echo "=== 2. Copying systemd files ==="
sudo cp goreport-7501.service /etc/systemd/system/
sudo cp goreport-7502.service /etc/systemd/system/
sudo cp goreport-7503.service /etc/systemd/system/
sudo cp goreport-7504.service /etc/systemd/system/

echo "=== 3. Enabling & restarting services ==="
sudo systemctl daemon-reload
sudo systemctl enable goreport-7501 goreport-7502 goreport-7503 goreport-7504
sudo systemctl restart goreport-7501 goreport-7502 goreport-7503 goreport-7504

echo "=== 4. Status ==="
systemctl is-active --quiet goreport-7501 && echo "7501 OK" || echo "7501 FAIL"
systemctl is-active --quiet goreport-7502 && echo "7502 OK" || echo "7502 FAIL"
systemctl is-active --quiet goreport-7503 && echo "7503 OK" || echo "7503 FAIL"
systemctl is-active --quiet goreport-7504 && echo "7504 OK" || echo "7504 FAIL"

echo "=== Done ==="
