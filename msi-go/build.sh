#!/bin/bash
set -e
cd /opt/goreport

echo "=== Building GOREPORT ==="

echo "[1/4] server-7501 (execute)..."
go build -o server-7501 ./cmd/execute/

echo "[2/4] server-7502 (report)..."
go build -o server-7502 ./cmd/report/

echo "[3/4] server-7503 (preload)..."
go build -o server-7503 ./cmd/preload/

echo "[4/4] server-7504 (multi)..."
go build -o server-7504 ./cmd/multi/

echo "=== All built ==="
ls -la server-7501 server-7502 server-7503 server-7504
