#!/bin/bash
set -e
cd /opt/goreport

echo "=== 1. Build ==="
./build.sh

echo "=== 2. Restarting services ==="
sudo systemctl restart goreport-7501 goreport-7502 goreport-7503 goreport-7504
echo "Restart OK"

echo "=== 3. Status ==="
for svc in goreport-7501 goreport-7502 goreport-7503 goreport-7504; do
  if systemctl is-active --quiet "$svc"; then
    echo "$svc OK"
  else
    echo "$svc FAIL"
    systemctl status "$svc" --no-pager | head -n 15
  fi
done

echo "=== Done ==="
