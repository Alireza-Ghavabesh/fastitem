#!/bin/sh
# nginx-reload.sh
# Runs forever, reloading Nginx every 12 hours

while true; do
  echo "[nginx-reload] Reloading Nginx to pick up renewed certificates..."
  nginx -s reload
  sleep 12h
done
