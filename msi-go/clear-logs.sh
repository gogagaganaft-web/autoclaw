#!/bin/bash
set -e
cd /opt/goreport

SERVICES="goreport-7501 goreport-7502 goreport-7503 goreport-7504"
LOGS="server-7501.log server-7502.log server-7503.log server-7504.log"

echo "=== Clearing GOREPORT logs ==="

echo "--- Stopping services ---"
sudo systemctl stop $SERVICES || true

echo "--- Truncating log files ---"
for f in $LOGS; do
  if [ -f "/opt/goreport/$f" ]; then
    sudo truncate -s 0 "/opt/goreport/$f"
    echo "  $f cleared"
  else
    echo "  $f not found (skipped)"
  fi
done

echo "--- Starting services ---"
sudo systemctl start $SERVICES

echo "=== Done ==="
