#!/usr/bin/env bash
# Установка служб GOREPORT на Debian.
#   ./deploy/install-debian.sh [dist/linux] [PREFIX=/opt/goreport]
set -euo pipefail

SRC="${1:-dist/linux}"
PREFIX="${PREFIX:-/opt/goreport}"
PORTS="7501 7502 7503 7504 7505"

if [[ ! -d "$SRC" ]]; then
  echo "нет каталога $SRC — сначала соберите бинарники (build-all.ps1 или go build)" >&2
  exit 1
fi

install -d "$PREFIX"
for p in $PORTS; do
  if [[ ! -f "$SRC/server-$p" ]]; then echo "нет $SRC/server-$p" >&2; exit 1; fi
  install -m 0755 "$SRC/server-$p" "$PREFIX/server-$p"
done

# Юниты: берём из корня репозитория (goreport-750N.service) и deploy/
for p in $PORTS; do
  unit="goreport-$p.service"
  if [[ -f "deploy/$unit" ]]; then
    install -m 0644 "deploy/$unit" "/etc/systemd/system/$unit"
  elif [[ -f "$unit" ]]; then
    install -m 0644 "$unit" "/etc/systemd/system/$unit"
  else
    echo "нет юнита $unit" >&2; exit 1
  fi
done

systemctl daemon-reload
for p in $PORTS; do systemctl enable "goreport-$p.service"; done
systemctl restart "goreport-7501.service" "goreport-7502.service" "goreport-7503.service" "goreport-7504.service" "goreport-7505.service"

echo "готово. Проверка: systemctl status goreport-7505"
echo "конфиг: $PREFIX/.env (EnvironmentFile)"